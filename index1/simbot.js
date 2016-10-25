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
function isIos() {
    return navigator.userAgent.match(/iphone|ipod|ios|ipad/i)
}
function pageInit() {
    checkInstallable();
    checkMobile()
}
function checkInstallable() {
    var e = "none";
    if (!isIos() && !isWeixin()) {
        e = "block";
        var t = document.styleSheets[0];
        var n = t.cssRules ? t.cssRules: t.rules;
        for (i = 0; i < n.length; i++) {
            if (n[i].selectorText == ".installable") {
                n[i].style["display"] = e;
                break
            }
        }
    }
}
function checkMobile() {
    if (isMobile()) {
        displayType = "none";
        var e = document.styleSheets[0];
        var t = e.cssRules ? e.cssRules: e.rules;
        for (i = 0; i < t.length; i++) {
            if (t[i].selectorText == ".hideMobile") {
                t[i].style["display"] = displayType;
                break
            }
        }
        document.getElementById("jiathisDiv").style.cssText = "font: 20px; width: 212px; margin: 10px auto;"
    }
}
function isMobile() {
    return navigator.userAgent.match(/android|iphone|ipod|blackberry|meego|symbianos|windowsphone|ucbrowser/i)
}
var HOME_PATH = HOME_PATH || "{morelink}/games/",
RESOURCE_IMG_PATH = RESOURCE_IMG_PATH || "resources/images/";
var imgUrl = HOME_PATH + "{morelink}/games/wxicon.png";
var lineLink = HOME_PATH;
var descContent = "快来跟我一起玩游戏吧！";
var shareTitle = "玩了{sitename}微信小游戏腰不酸腿不疼一口气上100楼不带喘气的你还在等什么呢一起上吧？！";
var appid = "";
window.addEventListener("load", pageInit, false);
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
    })
},
false);
console.log(getCookie("num"));
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
    if (getCookie("num") == 4){
        if (confirm("恭喜你获得一次大转盘抽奖机会,是否现在进入抽奖?\n选择确定 - 进入抽奖\n选择取消 - 留在本页")){
            window.location.href="{tuiguanglink}";
        }
    }
document.oncontextmenu = function() {
    return false
}