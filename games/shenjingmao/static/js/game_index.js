/**
 * @author Suker
 */
//重写requestAnimationFrame
var  $j=jQuery.noConflict();
window.requestAnimationFrame = (function(){
    return  window.requestAnimationFrame       || 
            window.webkitRequestAnimationFrame || 
            window.mozRequestAnimationFrame    || 
            window.oRequestAnimationFrame      || 
            window.msRequestAnimationFrame     || 
			window.setTimeout;
})();
//重写cancelAnimationFrame
window.cancelAnimationFrame = (function() {
	return window.cancelAnimationFrame         ||
		   window.webkitCancelAnimationFrame   ||
		   window.mozCancelAnimationFrame      ||
		   window.oCancelAnimationFrame        ||
		   window.msCancelAnimationFrame       ||
		   window.clearTimeout;
})();
var _getvp = document.getElementById('viewport');
if (_getvp && _getvp.content.indexOf('width=960') >= 0) {
	var _ua = navigator.userAgent.toLowerCase(), _setW = window.innerWidth > window.innerHeight ? window.innerWidth : window.innerHeight;
	window.glsysw = _setW > 1136 ? 1136 : (_setW == 961 ? 1136 : (_ua.indexOf('ipad') >= 0 ? 1024 : _setW));
	_getvp.content = 'width=' + window.glsysw + ',user-scalable=yes';
	if (_ua.indexOf('webkit') < 0) {
		_getvp.content += ',uc-user-scalable=yes,target-densitydpi=high-dpi';
	}
	_ua = _setW = null;
}
_getvp = null;
//调出进度条
function callLoading (method) {
    return;
	var _getLoadingDiv = document.getElementById('loadingDiv');
	if (_getLoadingDiv) {
		if (method == 'close') {
			document.body.removeChild(_getLoadingDiv);
		}
		else {
			_getLoadingDiv.style.height = window.innerHeight + 'px';
		}
	}
	else if (method == 'open') {
		_getLoadingDiv = document.createElement('div');
		_getLoadingDiv.id = 'loadingDiv';
		_getLoadingDiv.style.position = 'absolute';
		_getLoadingDiv.style.width = '100%';
		_getLoadingDiv.style.height = window.innerHeight + 'px';
		_getLoadingDiv.style.textAlign = 'center';
		_getLoadingDiv.style.background = '#FFF';
		_getLoadingDiv.style.zIndex = 1000000;
		_getLoadingDiv.style.left = '0px';
		_getLoadingDiv.style.top = '0px';
		_getLoadingDiv.innerHTML = [
			'<img src="../resource/img/logo.png" style="margin-top:' + ((window.innerHeight - 269) >> 1) + 'px;" />'
		].join('');
		document.body.appendChild(_getLoadingDiv);
	}
	_getLoadingDiv = null;
};
var QueryString = {

    /**
     * 取得查询字符串参数
     * 例：假设查询字符串是?q=javascript&num=10
     * var args=getQueryStringArgs();
     * alert(args["q"]);
     * alert(args["num"]);
     */
    getQueryStringArgs: function () {
        //取得查询字符串并去掉开头的问号
        var qs = (location.search.length > 0 ? location.search.substring(1) : "");

        //保存数据的对象
        var args = {};

        //取得每一项
        var items = qs.split("&");
        var item = null,
            name = null,
            value = null;

        //逐个将每一项添加到args对象中
        for (var i = 0; i < items.length; i++) {
            item = items[i].split("=");
            name = decodeURIComponent(item[0]);
            value = decodeURIComponent(item[1]);
            args[name] = value;
        }

        return args;
    },

    /**
     * 对getQueryStringArgs()方法进行进一步封装，简化调用
     */
    getParameter: function (keyValue) {
        var args = this.getQueryStringArgs();
        if (args[keyValue] != undefined) {
            return args[keyValue];
        } else {
            return "";
        }
    }

};
var CookieUtil = {

    get: function (name){
        var cookieName = encodeURIComponent(name) + "=",
            cookieStart = document.cookie.indexOf(cookieName),
            cookieValue = null;

        if (cookieStart > -1){
            var cookieEnd = document.cookie.indexOf(";", cookieStart);
            if (cookieEnd == -1){
                cookieEnd = document.cookie.length;
            }
            cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd));
        }

        return cookieValue;
    },

    set: function (name, value, day, path, domain, secure) {
        var cookieText = encodeURIComponent(name) + "=" + encodeURIComponent(value);
        if(typeof day=="number"){
            var expires  = new Date();
            expires.setTime(expires.getTime() + day*24*60*60*1000);
            cookieText += "; expires=" + expires.toGMTString();
        }

        if (path) {
            cookieText += "; path=" + path;
        }

        if (domain) {
            cookieText += "; domain=" + domain;
        }

        if (secure) {
            cookieText += "; secure";
        }

        document.cookie = cookieText;
    },

    unset: function (name, path, domain, secure){
        this.set(name, "", new Date(0), path, domain, secure);
    }

};
var $iframe=null;
function crossAjax(config){
    document.domain='127.0.0.1'; //域名
    if(!$iframe){
        $iframe= $j('<iframe/>',{id:'crossDomain',style:'display:none;',src:server.DuopaoBlankURL}).appendTo('body').load(function(){
            $iframe.win=$j(this)[0].contentWindow;
            $iframe.loadReady=true;
        });
    }
    if($iframe.loadReady){
        $iframe.win.$.ajax(config);
    }else{
        $iframe.one('load',function(){
            $iframe.win.$.ajax(config);
        });
    }
}

//上传积分(每一关完成都会上传积分)
var loginCounter=0;
function dp_submitScore(vLevel,vScore){
    crossAjax({
        url:rootIndex+'uploadscore.php',
        data:{
            game_code:QueryString.getParameter('game_code'),
            game_level:vLevel,
            game_score:vScore,
			bs:QueryString.getParameter('bs')
        },
        type:'post',
        dataType:'json',
        success:function(res){
			//this added by JobsFan
			if (QueryString.getParameter('bs').indexOf('wx')!=-1){
				//dp_share(vScore);//不能写在这里，因为游戏分享的部分可能不一样
				$j(".nowrecord .num").html(vScore);
				$j(".bestrecord .num").html(res.bestscore);
				$j(".scoreinfo").show();
			}
            if(res.flag=='f0'){
                if(res.ulevel>0){
//                   if(confirm('你的分数为'+res.uscore+'，排名为第'+res.ulevel+'名，是否跳转到排行榜？')){
//                       location.href=rootIndex+'games/toplist?game_code='+QueryString.getParameter('game_code');
//                   }
                }
            }else if(res.flag=='f1'){
                if(loginCounter==1||confirm('您尚未登录，游戏积分无法上传到排行榜，是否登录？')){
                    location.href=server.PageLoginURL+'?service='+encodeURIComponent(location.href);
                }else{
                    loginCounter++;
                }
            }else{
                alert(res.msg);
            }
        }
    });
}
var rankLoading=false;
function dp_Ranking(show_type){
    if(rankLoading){
        return;
    }
    var game_code=QueryString.getParameter('game_code');
    if(show_type==-1||true){
        location.href=rootIndex+'toplist.php?game_code='+game_code;
        return;
    }
    rankLoading=true;
    crossAjax({
        url:rootIndex+server.GameTop,
        data:{
            game_code:game_code,
            pflag:true,
            perPageSize:3,
            pageIndex:1,
            flag:true
        },
        success:function(result){
            rankLoading=false;
            var data=JSON.parse(result);
            if(data.flag=='f0'||data.flag=='f1'){
                var tem;
                if(data.flag!='f0'){
                    tem='<div class="your_rank">您的成绩:<a id="login_check" href="javascript:"  style="text-decoration: underline;color: inherit;">登录后才能查看呦</a></div>';
                }else{
                    if(data.ulevel==-1){
                        tem='<div class="your_rank">您的成绩:'+data.uscore+'分 排名:千里之外</div>';
                    }else{
                        tem='<div class="your_rank">您的成绩:'+data.uscore+'分 排名:第'+data.ulevel+'名</div>';
                    }
                }
                tem+='<div class="rank_list">';
                if(data.count>0){
                    for(var i=0;i<data.items.length;i++){
                        var item=data.items[i];
                        tem+='<div class="list_item">' +
                            '<div class="icon"><img src="'+item.user.user_avatar+'" /></div>' +
                            '<div class="info">' +
                            '<div class="list_item_title">第'+item.ulevel+'名：<span><a class="'+item.user.user_sex+'_name" href="'+rootIndex+'ucinfo/'+item.user.user_id+'">'+item.user.user_nickname+'</a></span></div>' +
                            '<div class="list_item_content">分数：'+item.game_score+'</div>' +
                            '</div>' +
                            '</div>';
                    }
                }
                tem += '</div>';
                tem += '<a ontouchstart="" class="w_button w_button_small fl" id="gobackgame" href="u.ali213.net" style="width: 50px; margin-top: 10px;">继续游戏</a>';
                tem += '<a ontouchstart="" class="w_button w_button_small fr" href="'+rootIndex+'list.php" style="width: 50px; margin-top: 10px;">更多游戏</a>';
                tem += '<a ontouchstart="" class="w_button w_button_small fr" href="'+rootIndex+'toplist.php?game_code='+game_code+'" style="width: 50px; margin-top: 10px;margin-right:17px;">更多排名</a>';
                win=new DWindow({
                    width:300,
                    title:'排行榜',
                    content:tem
                });
                win.$panel.find('#login_check').click(function(){
                    location.href=server.PageLoginURL+'?service='+location.href;
                });
                win.$panel.find('#gobackgame').click(function(){
                    win.close();
                });
            }else{
                alert(data.msg);
            }
        }
    })

}
//window.onerror = function(errorMsg, url, lineNumber) {
//    alert(errorMsg+'\n'+url+'\n'+lineNumber);
//};
window.addEventListener('load',function(e) {
    callAdSceneInGame(QueryString.getParameter('game_code'));
    return;
	//重置框架
	function _resetFrame () {
		var _getScreenFrame = document.getElementById('screenFrame');
		if (_getScreenFrame) {
			_getScreenFrame.style.display = 'block';
			_getScreenFrame.style.width = window.glsysw + 'px';
			if (!_getScreenFrame.style.height) {
				_getScreenFrame.style.height = window.innerHeight + 'px';
			}
			if (_getScreenFrame.children[0]) {
				_getScreenFrame.children[0].style.height = _getScreenFrame.style.height;
			}
			else {
				callLoading('open');
				_getScreenFrame.innerHTML = '<iframe src="' + _getScreenFrame.lang + '" scrolling="no"></iframe>';
				//监听框架事件
				_getScreenFrame.children[0].addEventListener('load', function(e) {
					e.target.style.height = e.target.parentNode.style.height;
					callLoading('close');
				}, true);
			}
			_getScreenFrame.style.marginTop = ((window.innerHeight - parseInt(_getScreenFrame.style.height)) >> 1) + 'px';
		}
		_getScreenFrame = null;
	}
	//调出翻转提示
	function _callLandscape (desc) {
		var _getLandscapeDiv = document.getElementById('landscapeDiv');
		if (_getLandscapeDiv) {
			if (desc == 0) {
				document.body.removeChild(_getLandscapeDiv);
			}
			else {
				_getLandscapeDiv.style.height = window.innerHeight + 'px';
			}
		}
		else if (desc) {
			_getLandscapeDiv = document.createElement('div');
			_getLandscapeDiv.id = 'landscapeDiv';
			_getLandscapeDiv.style.position = 'absolute';
			_getLandscapeDiv.style.width = '100%';
			_getLandscapeDiv.style.height = window.innerHeight + 'px';
			_getLandscapeDiv.style.textAlign = 'center';
			_getLandscapeDiv.style.background = '#FFF';
			_getLandscapeDiv.style.zIndex = 1000001;
			_getLandscapeDiv.style.left = '0px';
			_getLandscapeDiv.style.top = '0px';
			_getLandscapeDiv.innerHTML = [
				'<img src="../resource/img/orientation-landscape-' + desc + '.png" style="margin-top:' + ((window.innerHeight - 500) >> 1) + 'px;" />'
			].join('');
			document.body.appendChild(_getLandscapeDiv);
		}
		_getLoadingDiv = null;
	}
	//创建顶部功能菜单
	function _createTopMenu () {
		var _getCallMenuBtn = document.getElementById('callMenuBtn'), _getTopMenu = document.getElementById('topMenu');
		if (!_getCallMenuBtn) {
			_getCallMenuBtn = document.createElement('a');
			_getCallMenuBtn.id = 'callMenuBtn';
			_getCallMenuBtn.style.position = 'absolute';
			_getCallMenuBtn.style.left = '45px';
			_getCallMenuBtn.style.top = '5px';
            _getCallMenuBtn.style.zIndex = 99;
			_getCallMenuBtn.className = 'menuBtn1 radius transition-ease';
			_getCallMenuBtn.innerHTML = '<span class="menuBtn1-icon"></span>';
			_getCallMenuBtn.onmousedown = function(e) {
				_getCallMenuBtn._canDo = true;
			};
			_getCallMenuBtn.onmouseup = function(e) {
				if (!_getCallMenuBtn._canDo) {
					return false;
				}
				_getCallMenuBtn._canDo = false;
				if (_getCallMenuBtn) {
					_getCallMenuBtn.style.top = '-40px';
				}
				if (_getTopMenu) {
					_getTopMenu.style.top = '0px';
				}
				if (e.preventDefault) {
					e.preventDefault();
				}
			};
			_getCallMenuBtn.ontouchstart = _getCallMenuBtn.onmousedown;
			_getCallMenuBtn.ontouchend = _getCallMenuBtn.onmouseup;
			document.body.appendChild(_getCallMenuBtn);
		}
		if (!_getTopMenu) {
			_getTopMenu = document.createElement('div');
			_getTopMenu.id = 'topMenu';
            _getTopMenu.style.zIndex = 99;
			_getTopMenu.className = 'transition-ease';
			_getTopMenu.innerHTML = [
				'<span style="position:relative;display:inline-block;width:20%;text-align:left;"><a id="directionMenuBtn_0" href="javascript:void(0);" class="menuBtn2 radius" style="top:-11px;margin-left:5px;"><span id="directionMenuBtn_1" class="menuBtn2-icon"></span><span id="directionMenuBtn_2" class="menuBtn2-desc">ali213.net</span></a></span>',
				'<span style="position:relative;display:inline-block;width:60%;text-align:center;"><a href="http://www.ali213.net"><img id="directionMenuBtnDuoPao" src="../resource/img/iconmap_topheader.png" /></a></span>',
				'<span style="position:relative;display:inline-block;width:20%;text-align:right;"><a id="closeMenuBtn_0" class="menuBtn3 radius" style="top:-11px;margin-right:5px;"><span id="closeMenuBtn_1" class="menuBtn3-icon"></span></a></span>'
			].join('');
			_getTopMenu.onmousedown = function(e) {
				_getTopMenu._canDo = true;
			};
			_getTopMenu.onmouseup = function(e) {
				if (!_getTopMenu._canDo) {
					return false;
				}
				_getTopMenu._canDo = false;
				if (e.target.id.indexOf('directionMenuBtn_') >= 0) {
					location.href = document.body.lang;
				}
				else if (e.target.id == 'directionMenuBtnDuoPao') {
					location.href = e.target.parentNode.href;
				}
				else if (e.target.id.indexOf('closeMenuBtn_') >= 0) {
					if (_getCallMenuBtn) {
						_getCallMenuBtn.style.top = '5px';
					}
					if (_getTopMenu) {
						_getTopMenu.style.top = '-40px';
					}
				}
				if (e.preventDefault) {
					e.preventDefault();
				}
			};
			_getTopMenu.ontouchstart = _getTopMenu.onmousedown;
			_getTopMenu.ontouchend = _getTopMenu.onmouseup;
			document.body.appendChild(_getTopMenu);
		}
	}
	window.onresize = function(e) {
		_resetFrame();
		callLoading();
		_callLandscape();
	};
	//初始化函数
	function _init () {
		_resetFrame();
		_createTopMenu();
	}
	_init();
	var _lastDate = Date.now(), _isPause = false, _playTimer, _rafRun, _state = 0, _bodyDesc = document.body.id;
	if (!_playTimer) {
		(_rafRun = function() { //UI界面requestAnimationFrame主循环逻辑
			var _newDate = Date.now();
			if ((_newDate - _lastDate) >= 100) {
				_lastDate = _newDate;
				if (!_isPause) {
					switch (_state) {
						case 0: //正常
							if (_bodyDesc == 1) {
								if (window.innerWidth > window.innerHeight) {
									_callLandscape(_state = 1);
								}
							}
							else if (_bodyDesc == 2) {
								if (window.innerWidth < window.innerHeight) {
									_callLandscape(_state = 2);
								}
							}
							break;
						case 1: //处于横屏状态下
							if (window.innerWidth <= window.innerHeight) {
								_callLandscape(_state = 0);
							}
							break;
						case 2: //处于竖屏状态下
							if (window.innerWidth > window.innerHeight) {
								_callLandscape(_state = 0);
							}
							break;
						default:
							break;
					}
				}
			}
			_newDate = null;
			if (_rafRun)
				_playTimer = requestAnimationFrame(_rafRun);
		})();
	}
});
var DWindow=(function($){
    function DWindow(config){
        $.extend(this,{
            width:200,
            title:'',
            content:'',
            showClose:false
        },config);
        this.$mask=$('<div class="w_mask"></div>');
        this.$panel=$('<div class="w_panel"><div class="w_title">'+this.title+(this.showClose?'<a class="menuBtn3-icon"></a>':'')+'</div><div class="w_content">'+this.content+'</div></div>').css({
            width:this.width,
            visibility:'hidden'
        });
        this.$closer= this.$panel.find('.w_title .menuBtn3-icon');
        $(document.body).append(this.$mask,this.$panel);
        this.$panel.css({
            visibility:'visible'
        }).hide().fadeIn();
        this._init();
    }
    DWindow.prototype={
        constructor:  DWindow,
        close:function(){
            this.$mask.fadeOut();
            this.$panel.fadeOut();
        },
        _init:function(){
            var that=this;
            this.$closer.on('click',function(){
                that.close();
            });
        },
        show:function(){
            this.$panel.show();
            this.$mask.show();
        },
        hide:function(){
            this.$panel.hide();
            this.$mask.hide();
        }
    };
    return DWindow;
}($j));

function onBridgeReady() {
    WeixinJSBridge.call('showOptionMenu');
	WeixinJSBridge.on('menu:share:appmessage', function(argv) {
	    WeixinJSBridge.invoke('sendAppMessage', {
	        "img_url": window.shareData.imgUrl,
	        "link": window.shareData.timeLineLink,
	        "desc": window.shareData.tContent,
	        "title": window.shareData.tTitle
	    }, function(res) {
	    	//document.location.href = mebtnopenurl;
	    })
	});
	WeixinJSBridge.on('menu:share:timeline', function(argv) {
	    WeixinJSBridge.invoke('shareTimeline', {
	        "img_url": window.shareData.imgUrl,
	        "img_width": "640",
	        "img_height": "640",
	        "link": window.shareData.timeLineLink,
	        "desc": window.shareData.tContent,
	        "title": window.shareData.tContent
	    }, function(res) {
	    	//document.location.href = mebtnopenurl;
	    });
	});
}

if (typeof WeixinJSBridge == "undefined") {
    if (document.addEventListener) {
        document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
    } else if (document.attachEvent) {
        document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
        document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
    }
} else {
    onBridgeReady();
}

//jobs add
$j(document).ready(function(){
	$j(".return").click(function(){
		$j(".scoreinfo").hide();
	});
	$j(".xuyao").click(function(){
		$j(".weixinshare").show();
	});
	$j(".weixinshare").click(function(){
		$j(this).hide();
	});
});