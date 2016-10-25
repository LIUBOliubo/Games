var BASE_RES_DIR = "../";
var RES_DIR = "";
var APP_DEPLOYMENT = "WEB";
var USE_NATIVE_SOUND = !1;
var USE_NATIVE_SHARE = !1;
var IS_IOS = navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? !0 : !1;
var IS_ANDROID = false;
var IS_NATIVE_ANDROID = false;
var IS_REFFER =true;
var SHOW_LLAMA = !0; 
var SHOW_COPYRIGHT = !1;
var IN_WEIXIN = !1;
var  IS_SUB = !1;
var  best = -10000;
score = 0; 
record_flag = !1; 
logFlag = !1;
keyStorage = "bestcjrst";
function initBest() {
	best = gjStorage.get(keyStorage) || 0;
}
function cacheBest(a) {
	a > best && (best = a, gjStorage.set(keyStorage, best));
}
function onNewScore(score) {
	cacheBest(score);
	dp_submitScore(score);
	
}
(function (a, b) {
	a.get = function (a) {
		try {
			a in localStorage && ($.cookie(a, localStorage[a], {expires:60}), localStorage.removeItem(a));
		}
		catch (b) {
		}
		return $.cookie(a);
	};
	a.set = function (a, b) {
		$.cookie(a, b, {expires:60});
		return !0;
	};
})(window.gjStorage = window.gjStorage || {});
$(function(){
	initBest();
})

