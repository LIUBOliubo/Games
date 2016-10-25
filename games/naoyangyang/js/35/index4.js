Zepto(function ($) {
    function m() {
        setTimeout(function () {
            var e = new Date * 1;
            if (e - a > u) {
                T();
                return
            }
            var t = w();
            c.css("left", i[t]), s = t, m()
        }, b())
    }

    function b() {
        var e = y[g++] || 1e3;
        return e
    }

    function w() {
        var e = Math.floor(Math.random() * 9 / 3);
        return e === s ? w() : e
    }

    function E() {
        g = 0, s = 1, f = 0, a = new Date * 1, o = !0, c.show().css("left", i[s]), m(), x()
    }

    function x() {
        v.show(), S = setInterval(function () {
            var e = ((1e4 - new Date * 1 + a) / 1e3).toFixed(1);
            if (e <= 0) {
                clearInterval(S), T(), v.html("0.0");
                return
            }
            v.html(e)
        }, 20)
    }

    function T() {
        if (!o)return;
        o = !1, c.hide(), v.hide(), $("#scoreScreen").show().find(".desc em").html(f), N(), setTimeout(function () {
            $(".baidu").show()
        }, 1e3)
    }

    function N() {
        dataForWeixin.title = "疯狂挠痒痒，我在10秒内挠了" + f + "次痒痒，你敢来挑战么？";
    }

    function k() {
        if (C)return;
        C = !0, c.addClass("animate"), c.on("webkitAnimationEnd", function () {
            c.removeClass("animate"), C = !1
        })
    }

    function A(e) {
        h.show().css("left", i[e]), clearTimeout(L), h.hasClass("animate") ? h.removeClass("animate") : h.addClass("animate"), L = setTimeout(function () {
            h.hide()
        }, 300)
    }

    function O(e) {
        e == s && (k(), M(e))
    }

    function M(e) {
        f++;
        var t = $('<div class="add1"></div>').appendTo(document.body);
        t.css("left", i[e] + (n - 56) / 2), t.addClass("animate"), t.on("webkitAnimationEnd", function () {
            t.remove()
        })
    }

    function _() {
        p.css("left", (e - 100) / 2), p.show().addClass("animate"), p.on("webkitAnimationEnd", function () {
            p.hide(), E()
        })
    }

    var e = $(window).width(), t = $(window).height(), n = Math.floor(e / 3), r = 105, i = [Math.max((n - r) / 2, -10), (e - r) / 2, n * 2 + (n - r) / 2], s = 1, o = !1, u = 1e4, a = 0, f = 0, l = "", c = $(".feet").css("top", (t - 275) / 2), h = $(".feather").css("top", (t - 180) / 2), p = $("#go").css("top", (t - 160) / 2), d = $(".intro").css("top", (t - 320) / 2), v = $("#time"), g = 0, y = [1e3, 2e3, 1500, 1500, 1e3, 1e3, 1e3], S = 0, C = !1, L = 0;
   $(".buttons .col").tap(function () {
        if (!o)return;
        var e = $(this).attr("data-index");
        O(e), A(e)
    }), $("#start").tap(function () {
        d.hide(), _()
    }), $(".retry").tap(function () {
        $("#scoreScreen, .baidu").hide(), _()
    })
});