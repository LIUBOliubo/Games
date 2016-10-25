if (void 0 == APP_BASE_URL) var APP_BASE_URL = "http://g.lanrenmb.com/";
if (void 0 == GAME_LIST_URL) var GAME_LIST_URL = "http://g.lanrenmb.com/";
if (void 0 == FOLLOW_URL) var FOLLOW_URL = "http://g.lanrenmb.com/";
var BASE_RES_DIR = "../",
	RES_DIR = "",
	APP_DEPLOYMENT = "WEB",
	USE_NATIVE_SOUND = !1,
	USE_NATIVE_SHARE = !1,
	IS_IOS = navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? !0 : !1,
	IS_ANDROID = -1 < navigator.userAgent.indexOf("Android"),
	IS_NATIVE_ANDROID = IS_ANDROID && -1 < navigator.userAgent.indexOf("Version"),
	IS_REFFER = /referrer/.test(location.search) ? !0 : !1,
	SHOW_LLAMA = !0,
	SHOW_COPYRIGHT = !1,
	IN_WEIXIN = !1;
0 <= document.URL.indexOf("file://") && (IS_ANDROID || IS_IOS) && (APP_DEPLOYMENT = "APP", USE_NATIVE_SOUND = USE_NATIVE_SHARE = !0, APP_BASE_URL = "http://g.lanrenmb.com/");
document.addEventListener("WeixinJSBridgeReady", function () {
    IN_WEIXIN = !0;
    WeixinJSBridge.call("showOptionMenu");
    WeixinJSBridge.call("hideToolbar")
});
var PID = 0,
	USERNAME = "",
	IS_SUB = !1,
	GAME_URL = APP_BASE_URL + "game/" + GID,
	BEST_URL = APP_BASE_URL + "best/" + GID,
	UPLOAD_URL = APP_BASE_URL + "upload/" + GID,
	LB_URL = APP_BASE_URL + "lb/" + GID,
	ACTION_URL = APP_BASE_URL + "actionlog",
	best = -1E4,
	score = 0,
	record_flag = !1,
	logFlag = !1,
	keyStorage = "best:" + GID + ":" + PID;

var mebtnopenurl = "http://mp.weixin.qq.com/s?__biz=MjM5NjA0MTI0OQ==&mid=200068987&idx=1&sn=1de5daeaae94c66a3c46a13e20e8011e#rd";

window.shareData = {
    "imgUrl": "http://g.lanrenmb.com/icon/qbllk.png",
    "timeLineLink": "http://g.lanrenmb.com/games/qbllk/",
    "tTitle": "奇葩连连看-懒人模板",
    "tContent": "要你命的奇葩大合集，玩完这款游戏，我都快变成奇葩了。"
};

document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {

    WeixinJSBridge.on('menu:share:appmessage', function (argv) {
        WeixinJSBridge.invoke('sendAppMessage', {
            "img_url": window.shareData.imgUrl,
            "link": window.shareData.timeLineLink,
            "desc": window.shareData.tContent,
            "title": score == 0 ? window.shareData.tTitle : "奇葩连连看,连死了" + Math.abs(score) + "对奇葩,获得奇葩杀手称号,不服来挑一个!"
        }, function (res) {
            document.location.href = mebtnopenurl;
        })
    });

    WeixinJSBridge.on('menu:share:timeline', function (argv) {
        WeixinJSBridge.invoke('shareTimeline', {
            "img_url": window.shareData.imgUrl,
            "img_width": "640",
            "img_height": "640",
            "link": window.shareData.timeLineLink,
            "desc": window.shareData.tContent,
            "title": score == 0 ? window.shareData.tTitle : "奇葩连连看,连死了" + Math.abs(score) + "对奇葩,获得奇葩杀手称号,不服来挑一个!"
        }, function (res) {
            document.location.href = mebtnopenurl;
        });
    });
}, false);

function initBest() {
    best = gjStorage.get(keyStorage) || -1E4
}
function cacheBest(a) {
    a > best && (best = a, gjStorage.set(keyStorage, best))
}
function onNewScore() {
    return gjQipa.newscore_wxoauth(score)
}
function share(a) {
    IS_TOUCH && a.nativeEvent instanceof MouseEvent || share()
}
function share() {
    alert("请点击右上角按钮分享成绩到朋友圈哦！");
    //if (USE_NATIVE_SHARE) window.open("qipa://share/" + GID + "/" + score + "/" + best);
    //else {
    //    var a = "undefined" != typeof USERNAME ? "share.html?name=" + encodeURIComponent(USERNAME) + "&score=" + score + "&best=" + best + "&pid=" + PID : SHARE_URL.replace("/" + GID + "/0/0", "/" + GID + "/" + score + "/" + best);
    //    window.open(a, "share")
    //}
}
function showTop(a) {
    IS_TOUCH && a.nativeEvent instanceof MouseEvent || showTop()
}
function showTop() {
    //showPopup(LB_URL)
}
$(function () {
    $("#lbFrame").hide();
    $(".closeIframe").click(function () {
        hidePopup()
    })
});

function showPopup(a) {
    var b = document.body.scrollWidth,
		c = document.body.scrollHeight;
    $("#lbFrame").css({
        width: b,
        height: c
    }).attr("src", a).fadeIn();
    $(".closeIframe").show()
}
function hidePopup() {
    $("#lbFrame").fadeOut();
    $(".closeIframe").fadeOut();
    "function" == typeof onPopupClose && onPopupClose()
}
function parseSearchArgs() {
    for (var a = location.search, b = /(\w+)=([^&]*)/g, c, d = {}; c = b.exec(a) ;) d[c[1]] = c[2];
    return d
}
function sendSearchArgs() {
    "APP" != APP_DEPLOYMENT && "undefined" != typeof GAME_URL && $.getJSON(getLoadGameDataUrl(!0), function (a) {
        _loadGameData(a);
        initBest()
    })
}
function getLoadGameDataUrl(a) {
    var b = location.search;
    0 == b.length && (b = "?");
    var c = b.charAt(b.length - 1);
    "?" != c && "&" != c && (b += "&");
    return GAME_URL + (b + ("callback=" + (a ? "?" : "_loadGameData")))
}
function _loadGameData(a) {
    IS_SUB = a.sub;
    PID = a.pid;
    USERNAME = a.name
} (function (a, b) {
    a.get = function (a) {
        try {
            a in localStorage && ($.cookie(a, localStorage[a], {
                expires: 60
            }), localStorage.removeItem(a))
        } catch (b) { }
        return $.cookie(a)
    };
    a.set = function (a, b) {
        $.cookie(a, b, {
            expires: 60
        });
        return !0
    }
})(window.gjStorage = window.gjStorage || {});
(function (a, b) {
    a.newscore_wxoauth = function (a) {
        var b = APP_BASE_URL + "wxoauth/newscore/" + GID;
        a > best && (record_flag = !0, cacheBest(a));
        a <= SCORE_LIMIT || (b += "?" + $.param({
            score: a,
            return_url: location.origin + location.pathname
        }), console.log(b), $.getJSON(b + "&callback=?").done(function (a) {
            "wxoauth_needed" == a.error && !0 == window.confirm("需要名字才能上传高分，请授权微信读取您的名字和头像。") && window.open(b, "_parent")
        }))
    };
    a.onGameInit = function () { };
    a.onGameStarted = function () { };
    a.onGameOver = function () { }
})(window.gjQipa = window.gjQipa || {});