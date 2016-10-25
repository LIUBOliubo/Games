// 全局链接的配置
var btGame;
;~function(bt){
	
	// 因考虑到，以后可能拿链接的时候，可能要区分游戏
	// 所以，统一通过函数返回链接吧~，能更加灵活的更改逻辑了~
	
	bt.URL = {
		root: "http://g.lanrenmb.com"
		,getMoreGame: function(){
			// 点击更多
			bt.dc("more");
			
			return "http://g.lanrenmb.com";
		}
		,getConcern: function(){
			return "http://mp.weixin.qq.com/s?__biz=MjM5NjA0MTI0OQ==&mid=200068987&idx=1&sn=1de5daeaae94c66a3c46a13e20e8011e#rd";
		}
		,appId: "" // gh_f1ed7b95f79e
	};
	
	// 先用着一个很搓，很有效的方式~
	bt.getGameId = function(){
		var href = location.href;
		href = href.slice(href.indexOf("://") + 3);
		var id = href.split("/")[2];
		return id;
	}
	
	// 先用着一个很搓，很有效的方式~
	bt.getGamePath = function(){
		var href = location.href;
		href = href.slice(0, href.lastIndexOf("/") + 1);
		return href;
	}
	
	// 调用dc的统计
	bt.dc = function(button){
		window.Dc_SetButtonClickData && Dc_SetButtonClickData(bt.getGameId(), button);
	}
	
}(btGame || (btGame = {}));

// 基础弹出窗口的定义
var btGame;
;~function(bt){
	
	function popupBox(id, hideClass){
		this.elemId = id;
		this.hideClass = hideClass || "bt-hide";
	};
	popupBox.prototype = {
		beforeShow: function(){
			// 给别人继承的，什么都不做
		}
		,show: function(){
			this.beforeShow();
			// 为了让动画生效，加了一个timer
			var that = this;
			setTimeout(function(){
				$("#" + that.elemId).removeClass(that.hideClass);
			}, 1);
		}
		,hide: function(){
			$("#" + this.elemId).addClass(this.hideClass);
		}
	};
	
	bt.popupBox = popupBox;
	
}(btGame || (btGame = {}));

// 代理函数
var btGame;
;~function(bt){
	
	bt.proxy = function(func, define){
		return function(){
			func.apply(define, arguments);
		}
	}
	
}(btGame || (btGame = {}));

// 发布者
var btGame;
;~function(bt){
	
	var publisher = function(obj){
		this.__publisher__ = obj;
	};
	publisher.prototype = {
		on: function(ev, func){
			this.__publisher__.on(ev, bt.proxy(func, this));
		},
		fire: function(ev){
			this.__publisher__.trigger(ev, [].slice.call(arguments, 1));
		},
		off: function(ev, func){
			if(func){
				this.__publisher__.off(ev, bt.proxy(func, this));
			}else{
				this.__publisher__.off(ev);
			}
		}
	};
	
	bt.makePublisher = function(obj){
		var type = typeof obj;
		var p = new publisher($("<div></div>"));
		if(type == "function"){
			obj.prototype.__publisher__ = p.__publisher__;
			$.extend(obj.prototype, publisher.prototype);
		}else if(type == "object"){
			obj.__publisher__ = p.__publisher__;
			$.extend(obj, publisher.prototype);
		}
	}
	
}(btGame || (btGame = {}));

// 获取 body 元素
var btGame;
;~function(bt){
	
	// 因为插入，大部分都是基于 body 元素的
	// 提供一个获取 body 对象的方法
	
	var body;
	function getB(){
		if(!body){
			body = document.body || document.getElementsByTagName("body")[0];
		}
		return body;
	}
	bt.getDomBody = getB;
	
	function craeteDiv(){
		return document.createElement("div");
	}
	bt.getNewDiv = craeteDiv;
	
}(btGame || (btGame = {}));

// 锁屏
var btGame;
;~function(bt){
	
	// 指定lock的id，如果没有，则调用默认的锁屏
	// 当调用show的时候，再检测锁屏是否存在，不存在锁屏，则创建
	// 通过添加、移除 class:bt-hide，进行显示和隐藏锁屏
	// 锁屏的动画，是通过 class:bt-animation 实现的
	
	var defaultLockId = "bt-lock-screen";
	var createLock = function(id){
		var div = bt.getNewDiv();
		div.id = id;
		
		var body = bt.getDomBody();
		body.appendChild(div);
		return $(div);
	};
	var lock = function(lockId){
		bt.popupBox.call(this, lockId || defaultLockId);
	};
	lock.__super__ = bt.popupBox;
	lock.prototype = $.extend({}, bt.popupBox.prototype, {
		beforeShow: function(){
			var elem = this.getElem();
			if(elem.size() <= 0){
				elem = createLock(this.elemId);
				elem.addClass("bt-lock-screen bt-animation bt-hide");
			}
		}
		,remove: function(){
			var elem = this.getElem();
			if(elem.size() > 0){
				elem.addClass("bt-hide");
				// 为了看到动画，延迟一下吧
				setTimeout(function(){
					elem.remove();
				}, 200);
			}
		}
		,getElem: function(){
			return $("#" + this.elemId);
		}
	});
	
	bt.lockScreen = function(id){
		return new lock(id);
	}
	
}(btGame || (btGame = {}));

// 闪屏
var btGame;
;~function(bt){
	
	// 百田广告
	// 参数：
	// id: 广告div的id和className
	// html: 广告的内容
	// time: 广告多少秒后消失，小于0，则不会自动移除元素
	
	var defaultOptions = {id: "bt-advertisement", html: "广告", time: 1500};
	var flash = function(options){
		
		var newOptions = $.extend({}, defaultOptions, options || {});
		var $elem = $("#" + newOptions.id);
		var lock = new bt.lockScreen(newOptions.lockId);
		
		if($elem.size() <= 0){
			var $div = $(bt.getNewDiv()).attr({id: newOptions.id}).addClass(newOptions.id);
			
			var html = newOptions.html;
			$div.html(html);
			bt.getDomBody().appendChild($div[0]);
			
			$elem = $div;
		}
		
		this.event = newOptions.id + "_timeup";
		var that = this;
		if(newOptions.time > 0){
			// 时间到了之后，会发布事件哦~
			// 相同事件，不会重复发布
			var event = this.event;
			this.off(event);
			$elem.data("timer", setTimeout(
				function(){
					$elem.remove(), lock.hide();
					that.fire(event);
					newOptions = null;
					this.elem = this.lock = that.show = that.hide = null;
				}, newOptions.time <= 0 ? 1500 : newOptions.time)
			);
		}
		
		// 外部方法
		this.elem = $elem;
		this.lock = lock;
		this.show = function(html){
			html && this.elem.html(html);
			this.elem.removeClass("bt-hide");
			this.lock.show();
		}
		this.hide = function(){
			this.elem.addClass("bt-hide");
			this.lock.hide();
		}
		this.remove = function(){
			this.lock.remove();
			this.elem.remove();
		}
	}
	bt.makePublisher(flash);
	
	bt.advertisement = function(options){
		return new flash(options);
	};

}(btGame || (btGame = {}));

// 加载中的loading
var btGame;
;~function(bt){
	
	var loadingDiv = null;
	var loadingText = null;
	var loading = function(rate, error){
		if(rate > 0 && !loadingDiv){
			loadingDiv = $(btGame.getNewDiv());
			loadingDiv.addClass("bt-game-loading");
			loadingDiv.html('<table><tr><td><img class="bt-img" src="img/preloadImage.png" /><div class="bt-text"></div></td></tr></table>');
			bt.getDomBody().appendChild(loadingDiv[0]);
			loadingText = loadingDiv.find(".bt-text");
		}
		if(loadingDiv){
			if(error){
				loadingText.html(error);
			}else{
				var r = Math.round(rate * 100);
				loadingText.html("加载进度:" + r + "%");
			}
		}
		if(rate >= 1){
			loadingDiv && loadingDiv.remove();
			loadingDiv = null;
		}
	}
	
	bt.gameLoading = loading;
	
}(btGame || (btGame = {}));

// 游戏区域大小设定
// btGame.resizePlayArea($elem, width, height, top, left)
// $elem: jQuery元素
// width: 画布期望宽度
// height: 画布期望高度
// top: "top", "center", "bottom" 或 px
// left: "left", "center", "right" 或 px
var btGame;
;~function(bt){
	// @width: canvas期望的宽度
	// @height: canvas期望的高度
	function rate(width, height){
		var wWidth = window.innerWidth,
			wHeight = window.innerHeight;
		var mid;
		if(width <= wWidth && height <= wHeight){
			// 如果在屏幕内，就不用改了
		}else if(width > wWidth && height > wHeight){
			// 如果都大于屏幕
			var rateW = wWidth / width, rateH = wHeight / height;
			// 看谁更小，就以谁作为标准
			if(rateW <= rateH){
				mid = width;
				width = wWidth;
				height = height * width / mid;
			}else{
				mid = height;
				height = wHeight;
				width = width * height / mid;
			}
		}else if(width > wWidth){
			// 只有宽度大于屏幕
			mid = width;
			width = wWidth;
			height = height * wWidth / mid;
		}else if(height > wHeight){
			// 只有高度大于屏幕
			mid = height;
			height = wHeight;
			width = width * wHeight / mid;
		}else{
			// 没救了
		}
		
		var top = (wHeight - height) / 2, left = (wWidth - width) / 2;
		return {
			width: width
			,height: height
			,top: top
			,left: left
		};
	}
	
	function resize($elem, width, height, top, left){
		var result = rate(width, height);
		$elem.css({
			width: result.width
			,height: result.height
			,top: top == "center" ? result.top : top == "left" ? 0 : top
			,left: left == "center" ? result.left : left == "left" ? 0 : left
		});
		
		
		switch(top){
			case "top":
				$elem.css({top: 0});
				break;
			case "center":
				$elem.css({top: result.top});
				break;
			case "bottom":
				$elem.css({bottom: 0});
				break;
			default:
				$elem.css({top: top});
		}
		
		
		switch(left){
			case "left":
				$elem.css({left: 0});
				break;
			case "center":
				$elem.css({left: result.left});
				break;
			case "right":
				$elem.css({right: 0});
				break;
			default:
				$elem.css({left: left});
		}
		
		
		$elem.trigger("resizePlayArea", [result]);
	}
	
	function bindResize($elem, width, height, top, left){
		bt.checkHScreen(function(){
			setTimeout(function(){
				resize($elem, width, height, top, left);
			}, 500);
		});
	}

	bt.resizePlayArea = bindResize;
}(btGame || (btGame = {}));

// 告诉用户收藏
var btGame;
;~function(bt){
	
	function ask(cb){
		if(confirm('关注"全球游戏排行榜"微信，就可以收藏这个游戏哦！')){
			cb ? cb() : top.location.href = bt.URL.getConcern();
		}
	}
	
	bt.attentOurGame = ask;
	
}(btGame || (btGame = {}));

// 横竖屏检测
var btGame;
;~function(bt){
	
	// 检测，如果是横屏:true，如果是竖屏:false
	// 主要看window的宽高大小，如果width > height，就是横屏，反之~
	// btGame.checkHScreen(callback, once);
	// @param callback 回调函数 callback(true) -> 横屏
	// @param once 是否只检测一次，默认false，一直检测
	
	var screenResize = function(cb) {
		// 横屏true，竖屏false
		cb && cb(window.innerWidth > window.innerHeight);
	};			
	function check(callback, once){
		if(!once){
			window.addEventListener("orientationchange", function() {
				screenResize(callback);
			});
			window.addEventListener("resize", function() {
				screenResize(callback);
			});
		}
		screenResize(callback);
	}
	
	bt.checkHScreen = check;
	
}(btGame || (btGame = {}));

// 横、竖屏的提醒
var btGame;
;~function(bt){
	
	var onlyH = function(once, callback){
		this.myCallback = callback;
		this.tipsCount = 0;
		bt.checkHScreen(bt.proxy(this.callback, this), false);
		if(once){
			this.once = once;	
		}
	};
	onlyH.prototype = {
		hscreen: function(){
			// 是横屏
			// 设置了提醒一次，就真的只提醒一次了
			this.buildScreen();
			if(this.once && this.tipsCount <= 0){
				this.screen && this.screen.show();
			}else if(!this.once){
				this.screen && this.screen.show();
			}
			this.tipsCount++;
		}
		,vscreen: function(){
			// 不是横屏，把提醒去掉
			this.screen && this.screen.hide();
			this.myCallback && this.myCallback(this.tipsCount);
		}
		,getScreenOption: function(){
			return {
				id: "bt-h-scrren"
				,html: "<table><tr><td><img class='bt-h-screen-img' src='img/bt-play-h-screen.png' /></td></tr></table>"
				,time: 0
				,lockId: 'bt-hide-lock'
			};
		}
		// 下面的两个，逻辑是不用重新更改的
		,buildScreen: function(){
			!this.screen && (
				this.screen = btGame.advertisement(this.getScreenOption())
			);
		}
		,callback: function(isHScreen){
			isHScreen ? this.vscreen() : this.hscreen();
		}
	};
	
	// 竖屏的检测，继承于横屏
	var onlyV = function(once, callback){
		onlyH.call(this, once, callback);
	}
	onlyV.__super__ = onlyH;
	onlyV.prototype = $.extend({}, onlyH.prototype, {
		hscreen: function(){
			onlyH.prototype.vscreen.call(this);
		}
		,vscreen: function(){
			onlyH.prototype.hscreen.call(this);
		}
		,getScreenOption: function(){
			return {
				id: "bt-v-scrren"
				,html: "<table><tr><td><img class='bt-v-screen-img' src='img/bt-play-v-screen.png' /></td></tr></table>"
				,time: 0
				,lockId: 'bt-hide-lock'
			};
		}
	});
	
	bt.onlyHScreen = function(once, callback){
		return new onlyH(once, callback);
	};
	
	bt.onlyVScreen = function(once, callback){
		return new onlyV(once, callback);
	}
	
}(btGame || (btGame = {}));

// 豆豆游戏的品牌闪屏
var btGame;
;~function(bt){
	
	// 闪屏应该处于最高层，9000
	var id = "bt-play-logo-adv";
	function ad(cb){
		/*
		var a = bt.advertisement({
			id: id
			,html: "就是那个logo闪屏"
			,time: 3000
			,lockId: "bt-play-logo-adv-lock"
		});
		a.show();
		a.off(id + "_timeup");
		a.on(id + "_timeup", function(){
			cb && cb();
			a.remove();
			a = null;
		});
		*/
	}

	bt.playLogoAdv = ad; 
	
}(btGame || (bgGame = {}));

// 豆豆游戏特有的分享提醒
var btGame;
;~function(bt){
	
	var id = "bt-play-share-tip";
	function tip(){
		var a = bt.advertisement({
			id: id
			,html: "<img class='bt-play-share-tip-img' src='img/bt-play-share-tip.png' />"
			,time: 0
		});
		a.show();
		
		setTimeout(function(){
			a.elem.on("click touchstart", function(){
				a.remove();
				a = null;
			});
		}, 500);
		
		// 点击分享
		bt.dc("share");
	}
	
	bt.playShareTip = tip;
	
}(btGame || (btGame = {}));

// 豆豆游戏的结束弹窗
var btGame;
;~function(bt){
	
	/*
	var id = "bt-play-score-msg";
	function msg(html){
		var popup = bt.advertisement({
			id: id
			,html: 
		});
	}
	*/
	// 产品同学暂时不怎么要求
	function msg(text){
		if(confirm(text)){
			bt.playShareTip();
		}
	}
	
	bt.playScoreMsg = msg;
	
}(btGame || (btGame = {}));

// 设置分享
var btGame;
;~function(bt){
	
	var clickTime = 0;
	var dataForWeixin={
	   // appId:bt.URL.appId,
	   width:"66",
	   src: "img/icon.png",
	   //src: "http://game.9g.com/sjm/icon.png",
	   url:"/",
	   title:document.title,
	   desc:document.title,
	  // fakeid:"",
	   callback:function(
		//这里是分享成功后的回调功能
	   ){	
			if(clickTime <= 0){
				bt.attentOurGame();
			}
			clickTime++;
			bt.dc("realshare");	// 真正点了分享
	   }
	};
	
	window.dataForWeixin = dataForWeixin;
	

   var onBridgeReady = function(){
	   //if(!isOurShare){return;}	// 没有调用过setShare，就不需要管了
	   //发送给朋友
	   WeixinJSBridge.on('menu:share:appmessage', function(argv){
		  WeixinJSBridge.invoke('sendAppMessage',{
			// "appid":dataForWeixin.appId,
			 "img_url":dataForWeixin.src,
			 "img_width":dataForWeixin.width,
			 "img_height":dataForWeixin.width,
			 "link":dataForWeixin.url,
			 "desc":dataForWeixin.desc,
			 "title":dataForWeixin.title
		  }, function(res){(dataForWeixin.callback)();});
	   });
	   //发送到朋友圈
	   WeixinJSBridge.on('menu:share:timeline', function(argv){
		  WeixinJSBridge.invoke('shareTimeline',{
			 "img_url":dataForWeixin.src,
			 "img_width":dataForWeixin.width,
			 "img_height":dataForWeixin.width,
			 "link":dataForWeixin.url,
			 "desc":dataForWeixin.desc,
			 "title":dataForWeixin.title
		  }, function(res){(dataForWeixin.callback)();});});
	   //分享到微博
	   WeixinJSBridge.on('menu:share:weibo', function(argv){
		  WeixinJSBridge.invoke('shareWeibo',{
			 "content":dataForWeixin.title,
			 "url":dataForWeixin.url
		  }, function(res){(dataForWeixin.callback)();});
	   });
	   //分享到facebook
	   WeixinJSBridge.on('menu:share:facebook', function(argv){
		  (dataForWeixin.callback)();
		  WeixinJSBridge.invoke('shareFB',{
			 "img_url":dataForWeixin.src,
			 "img_width":dataForWeixin.width,
			 "img_height":dataForWeixin.width,
			 "link":dataForWeixin.url,
			 "desc":dataForWeixin.desc,
			 "title":dataForWeixin.title
		  }, function(res){});
	   });
	};
	if (typeof WeixinJSBridge == "undefined"){
		if(document.addEventListener){
		   document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
		}else if(document.attachEvent){
		   document.attachEvent('WeixinJSBridgeReady'   , onBridgeReady);
		   document.attachEvent('onWeixinJSBridgeReady' , onBridgeReady);
		}
	}else{
		onBridgeReady();
	}
	
	//var isOurShare = false;	// 只有调用过btShare的时候，需要干涉之~
	// 暂时只有微信的分享
	bt.setShare = function(option){
		$.extend(dataForWeixin, option || {});
		document.title = dataForWeixin.desc = dataForWeixin.title;
		//isOurShare = true;
	}
	
}(btGame || (btGame = {}));