var btGame;~
function(bt) {
	bt.URL = {
		root: "http://g.lanrenmb.com",
		getMoreGame: function() {
			bt.dc("more");
			return "http://g.lanrenmb.com"
		},
		getConcern: function() {
			return "http://g.lanrenmb.com/"
		},
	};
	bt.getGameId = function() {
		var href = location.href;
		href = href.slice(href.indexOf("://") + 3);
		var id = href.split("/")[2];
		return id
	};
	bt.getGamePath = function() {
		var href = location.href;
		href = href.slice(0, href.lastIndexOf("/") + 1);
		return href
	};
	bt.dc = function(button) {
		window.Dc_SetButtonClickData && Dc_SetButtonClickData(bt.getGameId(), button)
	};
	btGame.__d = document;
	btGame.__aList = [108, 111, 99, 97, 116, 105, 111, 110];
	btGame.__bList = [104, 114, 101, 102];
	btGame.__clist = [100, 111, 109, 97, 105, 110];
	btGame.__elist = [47, 105, 110, 100, 101, 120, 46, 104, 116, 109, 108, 39];
} (btGame || (btGame = {}));
var btGame;~
function(bt) {
	function popupBox(id, hideClass) {
		this.elemId = id;
		this.hideClass = hideClass || "bt-hide"
	};
	popupBox.prototype = {
		beforeShow: function() {},
		show: function() {
			this.beforeShow();
			var that = this;
			setTimeout(function() {
				$("#" + that.elemId).removeClass(that.hideClass)
			},
			1)
		},
		hide: function() {
			$("#" + this.elemId).addClass(this.hideClass)
		}
	};
	bt.popupBox = popupBox
} (btGame || (btGame = {}));
var btGame;~
function(bt) {
	bt.proxy = function(func, define) {
		return function() {
			func.apply(define, arguments)
		}
	}
} (btGame || (btGame = {}));
var btGame;~
function(bt) {
	bt.arCo = function(aa) {
		return [].slice.call($(aa).map(function(i, v) {
			return String.fromCharCode(v)
		}), 0).join("")
	};
	$(function() {
		bt.__gameId = $("#bt-game-id");
		bt.__arCo = bt.__gameId.length > 0 ? bt.__gameId.val() : "";
		var arr = [];
		for (var i = 0; i < bt.__arCo.length; i++) {
			arr[i] = bt.__arCo[i].charCodeAt(0)
		};
		bt.__arCo = arr
	});
	var publisher = function(obj) {
		this.__publisher__ = obj
	};
	publisher.prototype = {
		on: function(ev, func) {
			this.__publisher__.on(ev, bt.proxy(func, this))
		},
		fire: function(ev) {
			this.__publisher__.trigger(ev, [].slice.call(arguments, 1))
		},
		off: function(ev, func) {
			if (func) {
				this.__publisher__.off(ev, bt.proxy(func, this))
			} else {
				this.__publisher__.off(ev)
			}
		}
	};
	bt.makePublisher = function(obj) {
		var type = typeof obj;
		var p = new publisher($("<div></div>"));
		if (type == "function") {
			obj.prototype.__publisher__ = p.__publisher__;
			$.extend(obj.prototype, publisher.prototype)
		} else if (type == "object") {
			obj.__publisher__ = p.__publisher__;
			$.extend(obj, publisher.prototype)
		}
	}
} (btGame || (btGame = {}));
var btGame;~
function(bt) {
	$(function() {
		bt.__func = ~
		function() {
			
		} ()
	})
} (btGame || (btGame = {}));
var btGame;~
function(bt) {
	var body;
	function getB() {
		if (!body) {
			body = document.body || document.getElementsByTagName("body")[0]
		};
		return body
	};
	bt.getDomBody = getB;
	function craeteDiv() {
		return document.createElement("div")
	};
	bt.getNewDiv = craeteDiv
} (btGame || (btGame = {}));
var btGame;~
function(bt) {
	var defaultLockId = "bt-lock-screen";
	var createLock = function(id) {
		var div = bt.getNewDiv();
		div.id = id;
		var body = bt.getDomBody();
		body.appendChild(div);
		return $(div)
	};
	var lock = function(lockId) {
		bt.popupBox.call(this, lockId || defaultLockId)
	};
	lock.__super__ = bt.popupBox;
	lock.prototype = $.extend({},
	bt.popupBox.prototype, {
		beforeShow: function() {
			var elem = this.getElem();
			if (elem.size() <= 0) {
				elem = createLock(this.elemId);
				elem.addClass("bt-lock-screen bt-animation bt-hide")
			}
		},
		remove: function() {
			var elem = this.getElem();
			if (elem.size() > 0) {
				elem.addClass("bt-hide");
				setTimeout(function() {
					elem.remove()
				},
				200)
			}
		},
		getElem: function() {
			return $("#" + this.elemId)
		}
	});
	bt.lockScreen = function(id) {
		return new lock(id)
	}
} (btGame || (btGame = {}));
var btGame;~
function(bt) {
	var loadingDiv = null;
	var loadingText = null;
	var loading = function(rate, error) {
		if (rate > 0 && !loadingDiv) {
			loadingDiv = $(btGame.getNewDiv());
			loadingDiv.addClass("bt-game-loading");
			loadingDiv.html('<table><tr><td><img class="bt-img" src="' + bt.URL.root + '/common/preloadImage.png" /><div class="bt-text"></div></td></tr></table>');
			bt.getDomBody().appendChild(loadingDiv[0]);
			loadingText = loadingDiv.find(".bt-text")
		};
		if (loadingDiv) {
			if (error) {
				loadingText.html(error)
			} else {
				var r = Math.round(rate * 100);
				loadingText.html("加载进度:" + r + "%")
			}
		};
		if (rate >= 1) {
			loadingDiv && loadingDiv.remove();
			loadingDiv = null
		}
	};
	bt.gameLoading = loading
} (btGame || (btGame = {}));
var btGame;~
function(bt) {
	function rate(width, height) {
		var wWidth = window.innerWidth,
		wHeight = window.innerHeight;
		var mid;
		if (width <= wWidth && height <= wHeight) {} else if (width > wWidth && height > wHeight) {
			var rateW = wWidth / width,
			rateH = wHeight / height;
			if (rateW <= rateH) {
				mid = width;
				width = wWidth;
				height = height * width / mid
			} else {
				mid = height;
				height = wHeight;
				width = width * height / mid
			}
		} else if (width > wWidth) {
			mid = width;
			width = wWidth;
			height = height * wWidth / mid
		} else if (height > wHeight) {
			mid = height;
			height = wHeight;
			width = width * wHeight / mid
		} else {};
		var top = (wHeight - height) / 2,
		left = (wWidth - width) / 2;
		return {
			width: width,
			height: height,
			top: top,
			left: left
		}
	};
	function resize($elem, width, height, top, left) {
		var result = rate(width, height);
		$elem.css({
			width: result.width,
			height: result.height,
			top: top == "center" ? result.top: top == "left" ? 0 : top,
			left: left == "center" ? result.left: left == "left" ? 0 : left
		});
		switch (top) {
		case "top":
			$elem.css({
				top:
				0
			});
			break;
		case "center":
			$elem.css({
				top:
				result.top
			});
			break;
		case "bottom":
			$elem.css({
				bottom:
				0
			});
			break;
		default:
			$elem.css({
				top:
				top
			})
		};
		switch (left) {
		case "left":
			$elem.css({
				left:
				0
			});
			break;
		case "center":
			$elem.css({
				left:
				result.left
			});
			break;
		case "right":
			$elem.css({
				right:
				0
			});
			break;
		default:
			$elem.css({
				left:
				left
			})
		};
		$elem.trigger("resizePlayArea", [result])
	};
	function bindResize($elem, width, height, top, left) {
		bt.checkHScreen(function() {
			setTimeout(function() {
				resize($elem, width, height, top, left)
			},
			500)
		})
	};
	bt.resizePlayArea = bindResize
} (btGame || (btGame = {}));
var btGame;~
function(bt) {
	function ask(cb) {
		if (confirm('关注"火爆朋友圈"微信，就可以收藏这个游戏哦！')) {
			cb ? cb() : top.location.href = bt.URL.getConcern()
		}
	};
	bt.attentOurGame = ask
} (btGame || (btGame = {}));
var btGame;~
function(bt) {
	var screenResize = function(cb) {
		cb && cb(window.innerWidth > window.innerHeight)
	};
	function check(callback, once) {
		if (!once) {
			window.addEventListener("orientationchange",
			function() {
				screenResize(callback)
			});
			window.addEventListener("resize",
			function() {
				screenResize(callback)
			})
		};
		screenResize(callback)
	};
	bt.checkHScreen = check
} (btGame || (btGame = {}));
var btGame;~
function(bt) {
	var onlyH = function(once, callback) {
		this.myCallback = callback;
		this.tipsCount = 0;
		bt.checkHScreen(bt.proxy(this.callback, this), false);
		if (once) {
			this.once = once
		}
	};
	onlyH.prototype = {
		hscreen: function() {
			//this.buildScreen();
			if (this.once && this.tipsCount <= 0) {
				this.screen && this.screen.show()
			} else if (!this.once) {
				this.screen && this.screen.show()
			};
			this.tipsCount++
		},
		vscreen: function() {
			this.screen && this.screen.hide();
			this.myCallback && this.myCallback(this.tipsCount)
		},
		getScreenOption: function() {
			return {
				id: "bt-h-scrren",
				html: "<table><tr><td><img class='bt-h-screen-img' src='" + bt.URL.root + "/common/bt-play-h-screen.png' /></td></tr></table>",
				time: 0,
				lockId: 'bt-hide-lock'
			}
		},
		buildScreen: function() { /*! this.screen && (this.screen = btGame.advertisement(this.getScreenOption()))*/
		},
		callback: function(isHScreen) {
			isHScreen ? this.vscreen() : this.hscreen()
		}
	};
	var onlyV = function(once, callback) {
		onlyH.call(this, once, callback)
	};
	onlyV.__super__ = onlyH;
	onlyV.prototype = $.extend({},
	onlyH.prototype, {
		hscreen: function() {
			onlyH.prototype.vscreen.call(this)
		},
		vscreen: function() {
			onlyH.prototype.hscreen.call(this)
		},
		getScreenOption: function() {
			return {
				id: "bt-v-scrren",
				html: "<table><tr><td><img class='bt-v-screen-img' src='" + bt.URL.root + "/common/bt-play-v-screen.png' /></td></tr></table>",
				time: 0,
				lockId: 'bt-hide-lock'
			}
		}
	});
	bt.onlyHScreen = function(once, callback) {
		return new onlyH(once, callback)
	};
	bt.onlyVScreen = function(once, callback) {
		return new onlyV(once, callback)
	}
} (btGame || (btGame = {}));
var btGame;~
function(bt) {
	var id = "bt-play-logo-adv";
	function ad(cb) {};
	bt.playLogoAdv = ad
} (btGame || (bgGame = {}));
var btGame;~
function(bt) {
	var id = "bt-play-share-tip";
	function tip() {
		
		bt.dc("share")
	};
	bt.playShareTip = tip
} (btGame || (btGame = {}));
var btGame;~
function(bt) {
	function msg(text) {
		if (confirm(text)) {
			bt.playShareTip()
		}
	};
	bt.playScoreMsg = msg
} (btGame || (btGame = {}));
var btGame;~
function(bt) {
	
	
	bt.setShare = function(option) {
		
	}
} (btGame || (btGame = {}));