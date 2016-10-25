function shareFriend() {
	WeixinJSBridge.invoke("sendAppMessage", {
		appid: appid,
		img_url: imgUrl,
		img_width: "200",
		img_height: "200",
		link: lineLink,
		desc: descContent,
		title: shareTitle
	},
	function(e) {})
}
function shareTimeline() {
	WeixinJSBridge.invoke("shareTimeline", {
		img_url: imgUrl,
		img_width: "200",
		img_height: "200",
		link: lineLink,
		desc: descContent,
		title: shareTitle
	},
	function(e) {})
}
function shareWeibo() {
	WeixinJSBridge.invoke("shareWeibo", {
		img_url: imgUrl,
		content: shareTitle + " " + descContent,
		url: lineLink
	},
	function(e) {})
}
function isWeixin() {
	var e = navigator.userAgent.toLowerCase();
	if (e.match(/MicroMessenger/i) == "micromessenger") {
		return true
	} else {
		return false
	}
}
function toggle(e) {
	var t = document.getElementById(e);
	var n = document.getElementById("arrow");
	var r = t.getAttribute("class");
	if (r == "hide") {
		t.setAttribute("class", "show");
		delay(n, RESOURCE_IMG_PATH + "arrowright.png", 400)
	} else {
		t.setAttribute("class", "hide");
		delay(n, RESOURCE_IMG_PATH + "arrowleft.png", 400)
	}
}
function delay(e, t, n) {
	window.setTimeout(function() {
		e.setAttribute("src", t)
	},
	n)
}
function show_share() {

		document.getElementById("share-wx").style.display = "block"
	
}
function closeshare() {
	document.getElementById("share-wx").style.display = "none"
}
function closewx() {
	document.getElementById("wx-qr").style.display = "none"
}
function addShareWX() {
	var e = document.createElement("div");
	e.id = "share-wx";
	e.onclick = closeshare;
	document.body.appendChild(e);
	var t = document.createElement("p");
	t.style.cssText = "text-align:right;padding-left:10px;";
	e.appendChild(t);
	var n = document.createElement("img");
	n.src = "http://g.lanrenmb.com/games/xcw/py.png";
	n.id = "share-wx-img";
	n.style.cssText = "max-width:280px;padding-right:25px;";
	t.appendChild(n);
}

if (getCookie("num")) {
		var nn = parseInt(getCookie("num"));
		setCookie("num", ++nn);
	} else {
		setCookie("num", 1);
	}
	function getCookie(name) 
	{ 
		var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)"); 
		if(arr=document.cookie.match(reg)) return unescape(arr[2]); 
		else return null; 
	} 
	function setCookie(name, value) {
		var Days = 30;
		var exp = new Date();
		exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
		document.cookie = name + "=" + escape(value) + ";expires" + exp.toGMTString();
	}
	
	
function isMobile() {
	return navigator.userAgent.match(/android|iphone|ipod|blackberry|meego|symbianos|windowsphone|ucbrowser/i)
}
function isIOS() {
	return navigator.userAgent.match(/iphone|ipod|ios/i)
}
var HOME_PATH = HOME_PATH || "http://g.lanrenmb.com/",
RESOURCE_IMG_PATH = RESOURCE_IMG_PATH || "/images/",
HORIZONTAL = HORIZONTAL || false,
COVER_SHOW_TIME = COVER_SHOW_TIME || 2e3;
var imgUrl = HOME_PATH + "icons/wxicon.png";
var lineLink = HOME_PATH;
var descContent = "快来跟我一起玩！";
var shareTitle = "最好玩的小游戏就在46465.com！";
var appid = "";
document.addEventListener("WeixinJSBridgeReady",
function() {
	WeixinJSBridge.on("menu:share:appmessage",
	function(e) {
		shareFriend()
	});
	WeixinJSBridge.on("menu:share:timeline",
	function(e) {
		shareTimeline()
	});
	WeixinJSBridge.on("menu:share:weibo",
	function(e) {
		shareWeibo()
	});
	if (HORIZONTAL == true) {
		WeixinJSBridge.call("hideToolbar")
	}
},
false); (function() {
	function n() {
		window.scroll(0, 0);
		var e;
		if (window.orientation == 0 || window.orientation == 180) {
			e = false
		} else if (window.orientation == -90 || window.orientation == 90) {
			e = true
		}
		if (e == HORIZONTAL) {
			t.style.display = "none"
		} else {
			setTimeout(function() {
				r();
				t.style.width = window.innerWidth + "px";
				t.style.display = "block"
			},
			isIOS() ? 0 : 600)
		}
		if (HORIZONTAL == true && isWeixin() && !isIOS()) {
			WeixinJSBridge.call("hideToolbar")
		}
	}
	function r() {
		e.style.height = window.innerHeight + "px";
		e.style.width = window.innerWidth + "px";
		t.style.height = window.innerHeight + "px"
	}
	if (typeof play68_init == "function") {
		play68_init()
	}
	if (!isMobile()) return;
	var e = document.createElement("div");
	e.style.cssText = "position:absolute;z-index:1000000;left:0;top:0;background:#e9573f url(" + RESOURCE_IMG_PATH + "cover.png) no-repeat center center;background-size: 50%;width:" + window.innerWidth + "px;height:" + Math.max(window.innerHeight, window.document.documentElement.offsetHeight) + "px";
	e.className = "common_cover";
	document.body.appendChild(e);
	setTimeout(function() {
		e.parentNode.removeChild(e)
	},
	COVER_SHOW_TIME);
	document.addEventListener("touchmove",
	function(e) {
		e.preventDefault()
	},
	false);
	var t = document.createElement("div");
	t.className = "common_notice";
	t.style.cssText = "position:absolute;z-index:999999;left:0;top:0;background:#e9573f url(" + RESOURCE_IMG_PATH + "rotate_tip.png) no-repeat center center;background-size: 50%;";
	document.body.appendChild(t);
	window.addEventListener("orientationchange", n);
	window.addEventListener("load", n);
	window.addEventListener("scroll", r)
})();
document.oncontextmenu = function() {
	return false
};

if (isWeixin()) {
	addShareWX()
} else {
	addWXQR()
}
addSidebar();
if (getCookie("num") != 3){
	window.onbeforeunload=function(){return"离开此页面将会退出游戏哦"}
}