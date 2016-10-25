
/**
 * 首页初始化
 */
define(function(require, exports, module){
	var $ 			= require('lib/zepto'),
		//tip			= require('ui/widget/tip'),
		//giftflow	= require('ui/widget/giftflow'),
		slideview 	= require('ui/slideview'),
		scrollview  = require('ui/scrollview'),
		ai  = require('lib/ai'),
		//ajax 	= require('util/ajax'),
		//user    = require('module/user'),
		//userinfo = user.getInfo(),		
		ScrollSlide = require('/index3/js/ui/scrollslide');
	var slipjs;
	var scroll, tools = {};
		tools.hasTouch 		= 'ontouchstart' in window;
		tools.touchStart 	= tools.hasTouch ? 'touchstart' : 'mousedown';
		tools.touchMove 	= tools.hasTouch ? 'touchmove' : 'mousemove';
		
		var isInitedInfo = false;
	var config = {
		showBackTopOffset : 100,
		jumpDelay : 500
	};
	/*
	function onBodyTouchStart(evt){
		if(scroll.isShow){
			scroll.toggle();
			if(evt.target != $('#ptlogin-cancel')[0]){
				evt.preventDefault();
			}else{
				$('#ptlogin-cancel').trigger('click');
			}
		}
		$('body')[0].removeEventListener(tools.touchStart, onBodyTouchStart);
	}
	
	//阻止body滑动
	function stopBodySlide(){
		var $body = $('body');
		$body[0].addEventListener(tools.touchStart, onBodyTouchStart);
	}

	function wapgetQueryString(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) return unescape(r[2]); return null;
	}
	
	//侧边栏滑动
	function slideSideBar(){
		if($('#sidebar').length > 0){
			var $dom = $('#sidebar'), that = this, $slideDom = $('#slide_side_box')
				,parentHeight = $dom.height(), height = $slideDom.height();
			$dom[0].addEventListener(tools.touchStart, function(evt){
				evt.stopPropagation();
			}, false);
			$dom[0].addEventListener(tools.touchMove, function(evt){
				evt.stopPropagation();
			}, false);
			$dom.on('click', function(evt){
				return false;
			});
			//点击流，防止被上一层阻止事件冒泡
			$slideDom.delegate('[data-pvtag]', 'click', function(){
				var tag = $(this).attr('data-pvtag');
				tag && stat.click(tag);
				return false;
			});
		}
	}
	function initSlip(){
		if(slipjs){
			return;
		}
		var $slideDom = $('#slide_side_box');
		$('#siderbar_wrap').css('height', ai.wh());
		$slideDom.css('height', $slideDom[0].scrollHeight)
		slipjs = slip('px', $slideDom[0], {
			no_bar: true,
			direction : 'y',
			height: ai.wh()
		});
		
	}*/
	module.exports = function(){
		/*
		 * Banner图片
		 */
		if($('#slider').length){
			new slideview({
					dom : $('#slider')
			});
		}
		/**
		 * 礼包列表
		 */
		 if($('#giftlist-wrap').length){
			new scrollview({
				wrapSel : '#giftlist-wrap',
				listSel : '#giftlist',
				itemSel : 'li'
			});
		}
		
		$('.j_app_inc').each(function(i, ul){
			var $ul = $(ul);
			var $siblings = $ul.siblings('ul.mod-app-list');
			var map = {};
			var hideNum = 0;
			var num;
			
			$ul.find('li').each(function(i, li){
				var $li = $(li);
				var url = $li.attr('data-url');
				map[url] = 1;
			});
			
			$siblings.each(function(i, sibling){
				var $sibling = $(sibling);
				var isConfict = false;
				$sibling.find('li').each(function(i, li){
					if(isConfict){
						return;
					}
					var url = $(li).attr('data-url');
					if(map[url]){
						isConfict = true;
						hideNum++;
						$sibling.hide();
					}
				});
			});
			
			if(hideNum < 2){
				hideByNum($siblings, 2 - hideNum);
			}
			
			$ul.show();
		});
		if(ai.ovb.android()){
			var aurl = $('.ku_wapurl').attr('data-anurl');
			if(aurl)
			$('.ku_wapurl').attr('data-url',aurl);

			$('.ku_url').attr('data-url','http://m.18183.com/android.html');
		}else if(ai.ovb.iphone()){
			var aurl = $('.ku_wapurl').attr('data-iurl');
			if(aurl)
			$('.ku_wapurl').attr('data-url',aurl);
			
			$('.ku_url').attr('data-url','http://m.18183.com/iphone.html');
		}else if(ai.ovb.ipad()){
			var aurl = $('.ku_wapurl').attr('data-ipurl');
			if(aurl)
			$('.ku_wapurl').attr('data-url',aurl);
			
			$('.ku_url').attr('data-url','http://m.18183.com/ipad.html');
		}
		/*滑动
		var width = 210;
		scroll = new ScrollSlide({
			slideContent : '#sidebar',
			slideBody : ['.header', '.content','.mod_download_sup', '.footer'],
			width : width,
			direction : 'right',
			//afterShow和afterHide中移除data-url操作主要为了解决touchStart事件穿透问题
			afterShow : function(){
				setTimeout(function(){
					$('#j-slide-art').attr('data-url', '/art.shtml');
				}, 100);
				$('#j_head_nav li a').each(function(i, li){
					var $li = $(li);
					$li.attr('data-url-ori', $li.attr('data-url'));
					$li.removeAttr('data-url');
					$li.removeAttr('href');
				});
			},
			afterHide : function(){
				$('#j-slide-art').removeAttr('data-url');
				setTimeout(function(){
					$('#j_head_nav li a').each(function(i, li){
						var $li = $(li);
						$li.attr('data-url', $li.attr('data-url-ori'));
						$li.removeAttr('data-url-ori');
					});
				}, 500);
			}
		});
		slideSideBar();
		if($('#nav_forum').length > 0){
			$('#nav_forum')[0].addEventListener(tools.touchStart, function(evt){				
				$('#sidebar').show();
				scroll.toggle();
				setTimeout(initSlip, 100);
				stopBodySlide();
				evt.stopPropagation();
				evt.preventDefault();
				for(var p in evt){
					evt[p] = undefined;
				}
				return false;
			});
		}*/
		if($('#nav_forum').length > 0){
			$('#nav_forum').click(function(){
				if(document.getElementById('j_head_nav').style.display=="none"){
					$('#j_head_nav').show();
				}else{
					$('#j_head_nav').hide();
				}
			});
		}
		initGlobal();
		initBackTop();
		if($('#j_imglist').length>0)
		initScrollview();
		function hideByNum($siblings, num){
			var len = $siblings.size();
			var $sibling;
			for(var i = len; i > 0; i--){
				if(num <=0 ){
					break;
				}
				$sibling = $siblings.eq(i);
				if($sibling.height()){
					$sibling.hide();
					num--;
				}
			}
		}
	};
	function cookie(key, value, options) {
		var days, time, result, decode
		if (arguments.length > 1 && String(value) !== "[object Object]") {
			options = options || {};
			if (value === null || value === undefined) options.expires = -1
			if (typeof options.expires === 'number') {
				days = (options.expires * 24 * 60 * 60 * 1000)
				time = options.expires = new Date()

				time.setTime(time.getTime() + days)
			}
			value = String(value)
			return (document.cookie = [
				encodeURIComponent(key), '=',
				options.raw ? value : encodeURIComponent(value),
				options.expires ? '; expires=' + options.expires.toUTCString() : '',
				options.path ? '; path=' + options.path : '',
				options.domain ? '; domain=' + options.domain : '',
				options.secure ? '; secure' : ''
			].join(''))
		}
		options = value || {}
		decode = options.raw ? function (s) { return s } : decodeURIComponent
		return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? decode(result[1]) : null
	}
	function initBackTop(){
		
		var btn = $('#j_back_top');
		var wrap = btn.parent();
		var win = $(window);
		var doc = $(document);
		wrap.click(function(){
			window.scrollTo(0, 0);
		});
		
		function updateBackTopButton(){
			if(doc.height() > win.height()){
				wrap.show();
			}
			else{
				wrap.hide();
			}
			if(doc.height()-win.scrollTop()>1100){
				$(".mod_download_sup").show();
			}else{
				$(".mod_download_sup").hide();
			}
			setTimeout(updateBackTopButton, 1000);
		}
		if(cookie('srctype')=='android'){			
			$(".mod_download_sup").hide();
		}else{
			$(".header").show();			
			$(".j_hide_empty").show();
			$(".footer").show();
			updateBackTopButton();
		}
	}
	function initGlobal(){
		var doc = $(document)
		/*
		 * 跳转标签
		 * setTimeout 500 毫秒是为了发出统计请求
		 */
		function handleClick(){
			$('[data-url]').each(function(i, el){
				if(el.clickbined){
					return;
				}
				el.clickbined = true;
				var $el = $(el);
				var url = $el.attr('data-url');
				var tag = $el.attr('data-pvtag');
				var isLink = $el.is('a');
				var type = $el.attr('data-type');
				if(url!="Pro_download" && isLink){
					$el.attr('href', url)
				}
				if(url=="Pro_download" && isLink){
					url = $el.attr('href');
				}
				$el.on('click', function(evt){
					if(type=="download"){
						alert("down");
					}
					if(type=="download" && ai.ovb.weixn()){
						var Pro=document.getElementById("pro");
						var ProBg=Pro.children[0];
						var ProContent=Pro.children[1];
												
						if(ai.ovb.ios()){//iPhone
							ProContent.innerHTML="额~~你好像是用微信打开的！请点击右上角的按钮，选择“<span class='orange'>在Safari中打开</span>”，才能正常下载噢！";
						}else if(ai.ovb.android()){//android
							ProContent.innerHTML="<img style='float:right;' src='http://m.18183.com/images/pro.png'/>额~~你好像是用微信打开的！请点击右上角的按钮，选择“<span class='orange'>在浏览器中打开</span>”，才能正常下载噢！";
						}
						Pro.style.display='block';
						return false;
					}
					//延迟一段时间，发两个统计请求
					var delay = config.jumpDelay;
										
					setTimeout(function(){
						window.location.href = url;
					}, delay);
					/*
					 * 只响应最近的一个跳转地址
					 */
					if(url){
						evt.stopPropagation();
					}
					if(isLink){
						return false;
					}
				});
			})
			setTimeout(handleClick, 500);
		}
		handleClick();
		
		/*
		 * 阻止默认事件标签
		 */
		doc.delegate('[data-nogo]', 'click', function(evt){
			evt.preventDefault();
			evt.stopPropagation();
		});	
	}
	
	function initScrollview(){
		var $imglist 	= $('#j_imglist');
		var $img 		= $imglist.find('img')
		var size 		= $img.size();
		var queue 		= {};
		var counter		= 0;
		var listWidth	= 0;
		function complete(){
			/**
			 * 图片列表
			 */
			new scrollview({
				wrapSel : '#j_imglist_wrap',
				listSel : '#j_imglist',
				listWidth : listWidth + 30
			});
		}
		
		function check(){
			$img.each(function(i, img){
				if(!queue[img.src] && img.clientWidth){
					queue[img.src] = 1;
					counter++;
					listWidth += img.clientWidth;
				}
			});
			if(counter < size){
				setTimeout(check, 100);
			}
			else{
				complete();
			}
		}
		
		check();
	}
});

define("ui/scrollview",function(require, exports, module){
	var $ 		= require('lib/zepto'),
		ai		= require('lib/ai'),
		slip 	= require('lib/slip'),
		undefined;
	
	function ScrollView(_options){
		var options = $.extend({
			wrapSel : '#giftlist-wrap',
			listSel : '#giftlist',
			itemSel : 'li',
			listWidth : 0
		}, _options);
		
		var itemWidth, marginLeft, marginRight, listWidth,
			wrap 	= $(options.wrapSel),
			list 	= wrap.find(options.listSel),
			items 	= wrap.find(options.itemSel),
			firstItem = items.eq(0),
			itemNum = items.size();
			
		if(options.listWidth){
			listWidth = options.listWidth;
		}
		else{
			itemWidth = firstItem.width()
			marginLeft = parseInt(firstItem.css('margin-left'), 10);
			marginRight = parseInt(firstItem.css('margin-right'), 10);
			itemWidth = itemWidth + marginLeft + marginRight;
			listWidth = itemWidth * itemNum;
		}
		list.width(listWidth);
		
		function updateScrollBar(){
			var scrollbar = wrap.find('div').eq(1);

			if(ai.ww() > (listWidth)){
				scrollbar.hide();
			}
			else{
				scrollbar.show();
			}
		}
		var slipjs_dh = slip('px', list[0],{
			direction: "x",
			width: ai.ww() - 20,
			bar_no_hide : true
		});
		ai.resize(function() {
			slipjs_dh.refresh();
			updateScrollBar();
		}, false);
		
		updateScrollBar();
		return;
		
	}
	
	return ScrollView;
});