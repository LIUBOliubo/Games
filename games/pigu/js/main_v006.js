//封面动画
$('.cover').click(function(){
	$(this).hide();

	
	//$(this).find('.shouzhi').hide();
	//$(this).find('.tiger').addClass('in');
})


/*
*选择通道
*1：石油
*2：四川
*3：政法
*4：家族
*/

var turn_speed = 0.6; //扑克翻转速度
var selectedTd = 0, //默认通道：未选择
	gameNum = 0, //步数
	big = false; //是否摸到大老虎
function selectTd(){
	var td = $('.td');
	td.each(function(index){
		$(this).click(function(){
			if(selectedTd > 0){
				return;
			}else{
				selectedTd = $(this).attr('tdId');
			}
			$('.select_td').hide();
		})
	})
}

selectTd();

//打老虎
function hateTiger(){
	var item = $('.item');
	item.each(function(index){
		//选择正确
		function selectRight(_this){

			$(_this).parent().parent().find('.hd h2').html("赞！摸对了");
			
			TweenLite.to($(_this), turn_speed, {
				rotationY: 90,
				ease: Cubic.easeOut,
				onComplete: function() {
					$(_this).addClass('right');
					TweenLite.to($(_this), turn_speed, {
						rotationY: 0,
						ease: Cubic.easeOut
					});
				}
			});
			
			$(_this).parent().next('.ft').show();

			$(_this).siblings().each(function (i, elm) {
				setTimeout(function () {
					TweenLite.to($(elm), turn_speed, {
						opacity: 0,
						ease: Cubic.easeOut
					});
				}, 100 * i);
			});
			
			
		}
		
		$(this).click(function(){
			var self = this;
			if($(this).hasClass('right') || $(this).hasClass('caidan')){
				return;
			}
			gameNum++;
			$('.layout .hd strong').html(gameNum); //设置步数

			if($(this).attr('tdId') == selectedTd){
				selectRight(this);
			}else if($(this).attr('tdId') == 6){//彩蛋
				item.css({'z-index':1 });
				TweenLite.to($(self), turn_speed, {
					'z-index': 100,
					rotationY: 90,
					ease: Cubic.easeOut,
					onComplete: function() {
						$(self).addClass('caidan');
						TweenLite.to($(self), turn_speed, {
							rotationY: 0,
							ease: Cubic.easeOut
						});
					}
				});
			
				
			}else if(selectedTd == 4 && $(this).attr('tdId') == 100){//周滨直达大老虎
				big = true;
				TweenLite.to($(self), turn_speed, {
					'z-index': 100,
					rotationY: 90,
					ease: Cubic.easeOut,
					onComplete: function() {
						$(self).addClass('caidan');
						TweenLite.to($(self), turn_speed, {
							rotationY: 0,
							ease: Cubic.easeOut,
							onComplete: function () {
								setTimeout(function () {
									$('#layout_5 .hd strong').html(gameNum);
									$(".global").css({ "-webkit-transform": "translate3d(0px, -" + $(window).height() * 4 +"px, 0px)" });
								}, 2000);	
							}
						});
					}
				});
						
				
				
			}else if(selectedTd == 1 && $(this).attr('tdId') == 7){//郭永祥兼属于石油系和四川系
				selectRight(this);
				
			}else if(selectedTd == 2 && $(this).attr('tdId') == 7){//郭永祥兼属于石油系和四川系

				$(this).find('.item_inner').addClass('item_sichuan');
				selectRight(this);
			}else{
				$(this).addClass('wrong');
			}
		})
	})

	$('.btn_close').click(function(){
		$('.caidan').addClass('wrong');
		$('.item').removeClass('caidan').css({'z-index':1 });
		
		event.stopPropagation();
	})
}
hateTiger()

//摸大老虎屁股
$('.dawang_box').click(function(){
	big = true;
	var self = this;
	if(gameNum<5){
		$('#layout_5 .hd').html('<div class="level level1">你是超级打虎英雄</div>');
	}else if(gameNum>4 && gameNum<11){
		$('#layout_5 .hd').html('<div class="level level2">你是打虎英雄</div>');
	}else if(gameNum>10 && gameNum<16){
		$('#layout_5 .hd').html('<div class="level level3">你是打虎能手</div>');
	}else{
		$('#layout_5 .hd').html('<div class="level level4">你只是打苍蝇高手</div>');
	}

	//设置翻大老虎牌动画，请往下添加
	
	TweenLite.to($(self), turn_speed, {
		'z-index': 100,
		rotationY: 90,
		ease: Cubic.easeOut,
		onComplete: function() {
			$(self).addClass('clicked');
			TweenLite.to($(self), turn_speed, {
				rotationY: 0,
				ease: Cubic.easeOut
			});
		}
	});
	
})

//分享
$('.shareBtn').click(function(){
	share();
})

//再玩一次
$('#again').click(function(){
	var url = document.location.href;
	document.location.href = url;
})


function judgeStage(){
    var stage = 'other';
    if( typeof( TencentNews )!='undefined' ){
        if( typeof( TencentNews.showLoginWithType )!='undefined' ){
            stage = 'android';
        }else if( typeof(TencentNews.showNativeLogin)!='undefined' ){
            stage = 'ios';
        }
    }else if( navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == "micromessenger" ){
        stage = 'weixin';
    }
    return stage;
}

function showWeixinLayer(){
	$('#wixintip').css({display:'block'});
	$('#wixintip').click(function(){
		$('#wixintip').css({display:'none'});
	})
}

function share(){
	document.title = '我用了'+ gameNum +'步，摸到了大老虎的屁股，你也来摸摸！_小游戏网';
    var stage = judgeStage();
    var _title= document.title;
    var _des = "选择一种花色的老虎，谁先摸到大老虎，谁最厉害。";
    var _pic = "http://game.bkeke.com/lhpg/icon.jpg";
    var _url = document.location.href;

    if( stage == 'android' || stage == 'ios' ){
	     if(window.TencentNews && window.TencentNews.showShareMenu){
		    window.TencentNews.showShareMenu(_url,_title,_des,_pic,"news_news_wc");

	    }else{
        	window.TencentNews.shareFromWebView(_title, _des, _pic);    
	    }
    }else if( stage == 'weixin' ){
        showWeixinLayer();
    }else{	
	    window.location = "http://game.bkeke.com/index.html?c=share&a=index&url=_url&title=" + _title + "&pic=" + _pic + "&line1=";
    }
}        


var onBridgeReady = function() {
	
		// 分享到朋友圈;
		WeixinJSBridge.on('menu:share:timeline', function(argv) {
			var wxTitle = "",
				wxDesc = '选择一种花色的老虎，谁先摸到大老虎，谁最厉害。',
				_imgurl = 'http://game.bkeke.com/lhpg/icon.jpg',
				linkUrl = document.location.href;
			if (big && gameNum >= 3) {
				wxTitle = '我用了'+ gameNum +'步，摸到了大老虎的屁股，你也来摸摸！_小游戏网';
			} else {
				wxTitle = document.title;
			}
			
			WeixinJSBridge.invoke('shareTimeline', {
				"img_url": _imgurl,
				"img_width": "120",
				"img_height": "120",
				"link": linkUrl,
				"desc": wxDesc,
				"title": wxTitle
			}, function() {});
		})
		WeixinJSBridge.on('menu:share:appmessage', function(argv) {
			var wxTitle = "",
				wxDesc = '选择一种花色的老虎，谁先摸到大老虎，谁最厉害。',
				_imgurl = 'http://game.bkeke.com/lhpg/icon.jpg',
				linkUrl = document.location.href;
			if (big && gameNum >= 3) {
				wxTitle = '我用了'+ gameNum +'步，摸到了大老虎的屁股，你也来摸摸！_小游戏网';
			} else {
				wxTitle = document.title;
			}
			
			WeixinJSBridge.invoke('sendAppMessage', {
				"img_url": _imgurl,
				"link": linkUrl,
				"desc": wxDesc,
				"title": wxTitle
			}, function() {})
		})
		WeixinJSBridge.on('menu:share:weibo', function(argv) {
			var wxTitle = "",
				wxDesc = '选择一种花色的老虎，谁先摸到大老虎，谁最厉害。',
				_imgurl = 'http://game.bkeke.com/lhpg/icon.jpg',
				linkUrl = document.location.href;
			if (big && gameNum >= 3) {
				wxTitle = '我用了'+ gameNum +'步，摸到了大老虎的屁股，你也来摸摸！_小游戏网';
			} else {
				wxTitle = document.title;
			}
			
			WeixinJSBridge.invoke('shareWeibo', {
				"desc": wxDesc,
				"url": linkUrl,
			}, function(res) {});
		})
	}

$(function(){
    if (document.addEventListener) {
        document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
    } else if (document.attachEvent) {
        document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
        document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
    }
})	



/* ua */
var UA = function(){
    var userAgent = navigator.userAgent.toLowerCase();
    return {
        ipad: /ipad/.test(userAgent),
        iphone: /iphone/.test(userAgent),
        android: /android/.test(userAgent),
        qqnews: /qqnews/.test(userAgent),
        weixin: /micromessenger/.test(userAgent)
    };
}
/* page翻页*/
var Layout = {
    page: function (i, _h){
        $(".global").css({ "-webkit-transform": "translate3d(0px, -" + _h * i +"px, 0px)" });
        $(".layout").removeClass("animate");
        $("#layout_" + (i + 1)).addClass("animate");
    },
    swipe: function(_h, _len){
        var _this = this;
        $(".layout").each(function(index1, obj){
            $(obj).find('.ft').on("swipeUp", function(){
                index1 = index1 < (_len - 1) ? index1 : -1;
                _this.page(index1 + 1, _h);
            })
        });
    },
    init: function(){
        var _this = this,
            _w = $(window).width(),
            _h = $(window).height(),
            _len = $(".layout").length;
        var ua = UA();
        //console.log(ua);
        if(ua.iphone && ua.qqnews){
            _h = _h - 44;
        }
        $(".swipe_tip").addClass("fadeOutUp");
        $(".global").width( _w ).height( _h * _len ).addClass("ease");
        $(".screen").width( _w ).height( _h * _len );
        $(".layout").width( _w ).height( _h );
        //$(".iscrll").height( _h - 140);

        _this.page(0, _h);
        _this.swipe(_h, _len);

    }
}
Layout.init();/*  |xGv00|531c7b8e2059bc8b04fc838c3b70dd25 */