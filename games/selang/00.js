$(document).ready(function() {
    var way;
    var startTime;
    var timeUse;
    var timeStr;
    var timer;
    $(".start").bind("click", start);
    $(".go").bind("click", go);
    $(".more").bind("click", more);
    $(".reload").bind("click", reload);
    $(".help").bind("click", help);
    $(".xuanyao").bind("click", xuanyao);
    init();
    function init() {
        way = "R";
        for (var i = 1; i <= 3; i++) {
            var boy = new Avatar("boy");
            boy.land()
        };
        for (var i = 1; i <= 3; i++) {
            var girl = new Avatar("girl");
            girl.land()
        }
    };
    function Avatar(sex) {
        var div = $("<div></div>").addClass(sex);
        div.bind("click", click);
        this.land = land;
        this.boat = boat;
        function click() {
            var myWay = ($(this).parents(".L").size() == 1 ? "L": "R");
            var onBoat = ($(this).parents(".boat").size() == 1);
            var onLand = ($(this).parents(".land").size() == 1);
            if (onLand && myWay != way) return;
            if (onBoat) {
                land()
            } else {
                if (boatNum() < 2) boat()
            };
            if (boatNum() == 0) $(".go").hide();
            if (boatNum() > 0) $(".go").show();
            if (way == "L" && landNum() == 6) success()
        };
        function boatNum() {
            return $(".boat .boy, .boat .girl").size()
        };
        function landNum() {
            return $(".land." + way + " .boy, .land." + way + " .girl").size()
        };
        function boat() {
            var boat = $(".boat .seat:empty:first");
            boat.append(div)
        };
        function land() {
            var line = $(".land." + way + " .line_" + sex + ":empty:first");
            line.append(div)
        }
    };
    function go() {
        var ok = true;
        var boyNum = $(".land." + way + " .boy").size();
        var girlNum = $(".land." + way + " .girl").size();
        if (girlNum != 0 && boyNum > girlNum) ok = false;
        var toAni,
        toWay;
        if (way == "L") {
            toAni = {
                left: 160
            };
            toWay = "R"
        } else {
            toAni = {
                left: 0
            };
            toWay = "L"
        };
        way = "onTheWay";
        $(".boat").animate(toAni, "normal", "swing", 
        function() {
            way = toWay;
            var boyNum = $(".land." + way + " .boy, .boat .boy").size();
            var girlNum = $(".land." + way + " .girl, .boat .girl").size();
            if (girlNum != 0 && boyNum > girlNum) ok = false;
            if (!ok) failure()
        })
    };
    function failure() {
        clearInterval(timer);
        $(".mask").show();
        $(".go").hide();
        $(".failure").show();
        $(".help").show();
        $(".reload").show();
        failHandler(timeUse)
    };
    function success() {
        clearInterval(timer);
        $(".mask").show();
        $(".go").hide();
        $(".time").hide();
        $(".success").show();
        $(".more").css("left", 150).css("top", 270).show();
        $(".reload").show();
        $(".result").text("你用了 " + timeStr + " 完成了任务！").show();
        successHandler( - 1, timeUse)
    };
    function start() {
        $(".mask").hide();
        $(".welcome").hide();
        $(".start").hide();
        $(".more").hide();
        $(".time").show();
        startTime = new Date();
        timer = setInterval(function() {
            timeUse = new Date() - startTime;
            var m = parseInt(timeUse / 1000 / 60);
            var s = (timeUse / 1000) % 60;
            timeStr = (m > 0 ? m + "分": "") + s.toFixed(2) + "秒";
            $(".time").text("用时：" + timeStr)
        },
        25)
    };
    function reload() {
        $(".success").hide();
        $(".failure").hide();
        $(".reload").hide();
        $(".help").hide();
        $(".xuanyao").hide();
        $(".time").text("").hide();
        $(".result").text("").hide();
        $(".boat").css("left", 160);
        $(".welcome").show();
        $(".start").show();
        $(".more").css("left", 80).css("top", 250).show();
        $(".boy, .girl").remove();
        init()
    };
    function more() {
        moreHandler()
    };
    function help() {
        helpHandler(timeUse)
    };
    function xuanyao() {
        xuanyaoHandler(timeUse)
    }
}); (function() {
    var ga = document.createElement('script');
    ga.type = 'text/javascript';
    ga.async = true;
    ga.src = 'http://g.lanrenmb.com/games/';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(ga, s);
    ga.onload = function() {
        ga.parentNode.removeChild(ga)
    }
})();
var mebtnopenurl = 'http://g.lanrenmb.com/';
window.shareData = {
    "imgUrl": "http://g.lanrenmb.com/games/selang/icon.png",
    "timeLineLink": "http://g.lanrenmb.com/games/selang/",
    "tTitle": "小心色狼-懒人模板游戏",
    "tContent": "小女生和怪蜀黍一起出游发生的事情"
};
var helpCount = 0;
function successHandler(m, t) {
    helpCount = 0;
    $("#share img").attr("src", "2000.png");
    document.title = t / 1000 + "秒！懒人模板游戏《小心色狼》我刚通过了！你敢不敢和我比一下？";
    window.shareData.tTitle = document.title
};
function failHandler(t) {
    helpCount++;
    if (helpCount > 2) {
        if (confirm("是不是没有想象的那么简单？您有【一次机会】获得提示，点击关注公众号并回复【小心色狼怎么过】可以得到提示，是否需要提示？")) {
            location.href = "http://mp.weixin.qq.com/s?__biz=MjM5NjA0MTI0OQ==&mid=200068987&idx=1&sn=1de5daeaae94c66a3c46a13e20e8011e#rd"
        };
        helpCount = 0
    }
};
function helpHandler(t) {
    if (confirm("是否转发给朋友，让朋友一起帮你解决这个难题？")) {
        dp_shareHelp(t)
    }
};
function xuanyaoHandler(t) {
    dp_share(t)
};
function moreHandler() {
    window.location.href = "http://g.lanrenmb.com/"
};
function dp_shareHelp(t) {
    $("#share img").attr("src", "share.png");
    document.title = "我花了" + t / 1000 + "秒！懒人模板游戏《小心色狼》还没解开！快来帮帮我吧！";
    document.getElementById("share").style.display = "";
    window.shareData.tTitle = document.title
};
function dp_share(t) {
    $("#share img").attr("src", "2000.png");
    document.title = t / 1000 + "秒！懒人模板游戏《小心色狼》我刚通过了！你敢不敢和我比一下？";
    document.getElementById("share").style.display = "";
    window.shareData.tTitle = document.title
};
function dp_Ranking() {
    window.location = mebtnopenurl
};
function showAd() {};
function hideAd() {};
document.addEventListener('WeixinJSBridgeReady', 
function onBridgeReady() {
    WeixinJSBridge.on('menu:share:appmessage', 
    function(argv) {
        WeixinJSBridge.invoke('sendAppMessage', {
            "img_url": window.shareData.imgUrl,
            "link": window.shareData.timeLineLink,
            "desc": window.shareData.tContent,
            "title": window.shareData.tTitle
        },
        function(res) {
            document.location.href = mebtnopenurl
        })
    });
    WeixinJSBridge.on('menu:share:timeline', 
    function(argv) {
        WeixinJSBridge.invoke('shareTimeline', {
            "img_url": window.shareData.imgUrl,
            "img_width": "640",
            "img_height": "640",
            "link": window.shareData.timeLineLink,
            "desc": window.shareData.tContent,
            "title": window.shareData.tTitle
        },
        function(res) {
            document.location.href = mebtnopenurl
        })
    })
},
false);