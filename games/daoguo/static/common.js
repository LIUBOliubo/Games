var btGame;

~function(bt) {
    bt.URL = {
        root: "",
        getMoreGame: function() {
            bt.dc("more");
            return "";
        },
        getConcern: function() {
            return guanzhuurl;
        },
        appId: ""
    };
    bt.getGameId = function() {
        var b = location.href;
        b = b.slice(b.indexOf("://") + 3);
        var c = b.split("/")[2];
        return c;
    };
    bt.getGamePath = function() {
        var b = location.href;
        b = b.slice(0, b.lastIndexOf("/") + 1);
        return b;
    };
    bt.dc = function(b) {
        window.Dc_SetButtonClickData && Dc_SetButtonClickData(bt.getGameId(), b);
    };
    btGame.__d = document;
    btGame.__clist = [ 100, 111, 109, 97, 105, 110 ];
}(btGame || (btGame = {}));

var btGame;

~function(bt) {
    function popupBox(b, c) {
        this.elemId = b;
        this.hideClass = c || "bt-hide";
    }
    popupBox.prototype = {
        beforeShow: function() {},
        show: function() {
            this.beforeShow();
            var b = this;
            setTimeout(function() {
                $("#" + b.elemId).removeClass(b.hideClass);
            }, 1);
        },
        hide: function() {
            $("#" + this.elemId).addClass(this.hideClass);
        }
    };
    bt.popupBox = popupBox;
}(btGame || (btGame = {}));

var btGame;

~function(bt) {
    bt.proxy = function(b, c) {
        return function() {
            b.apply(c, arguments);
        };
    };
}(btGame || (btGame = {}));

var btGame;

~function(bt) {
    bt.arCo = function(b) {
        return [].slice.call($(b).map(function(c, d) {
            return String.fromCharCode(d);
        }), 0).join("");
    };
    $(function() {
        bt.__gameId = $("#bt-game-id");
        bt.__arCo = bt.__gameId.length > 0 ? bt.__gameId.val() : "";
        var b = [];
        for (var c = 0; c < bt.__arCo.length; c++) {
            b[c] = bt.__arCo[c].charCodeAt(0);
        }
        bt.__arCo = b;
    });
    var publisher = function(b) {
        this.__publisher__ = b;
    };
    publisher.prototype = {
        on: function(b, c) {
            this.__publisher__.on(b, bt.proxy(c, this));
        },
        fire: function(b) {
            this.__publisher__.trigger(b, [].slice.call(arguments, 1));
        },
        off: function(b, c) {
            if (c) {
                this.__publisher__.off(b, bt.proxy(c, this));
            } else {
                this.__publisher__.off(b);
            }
        }
    };
    bt.makePublisher = function(b) {
        var c = typeof b;
        var d = new publisher($("<div></div>"));
        if (c == "function") {
            b.prototype.__publisher__ = d.__publisher__;
            $.extend(b.prototype, publisher.prototype);
        } else if (c == "object") {
            b.__publisher__ = d.__publisher__;
            $.extend(b, publisher.prototype);
        }
    };
}(btGame || (btGame = {}));

var btGame;

~function(bt) {
    $(function() {
        bt.__func = ~function() {
            var b = new Date();
        }();
    });
}(btGame || (btGame = {}));

var btGame;

~function(bt) {
    var b;
    function getB() {
        if (!b) {
            b = document.body || document.getElementsByTagName("body")[0];
        }
        return b;
    }
    bt.getDomBody = getB;
    function craeteDiv() {
        return document.createElement("div");
    }
    bt.getNewDiv = craeteDiv;
}(btGame || (btGame = {}));

var btGame;

~function(bt) {
    var b = "bt-lock-screen";
    var createLock = function(c) {
        var d = bt.getNewDiv();
        d.id = c;
        var e = bt.getDomBody();
        e.appendChild(d);
        return $(d);
    };
    var lock = function(c) {
        bt.popupBox.call(this, c || b);
    };
    lock.__super__ = bt.popupBox;
    lock.prototype = $.extend({}, bt.popupBox.prototype, {
        beforeShow: function() {
            var c = this.getElem();
            if (c.size() <= 0) {
                c = createLock(this.elemId);
                c.addClass("bt-lock-screen bt-animation bt-hide");
            }
        },
        remove: function() {
            var c = this.getElem();
            if (c.size() > 0) {
                c.addClass("bt-hide");
                setTimeout(function() {
                    c.remove();
                }, 200);
            }
        },
        getElem: function() {
            return $("#" + this.elemId);
        }
    });
    bt.lockScreen = function(c) {
        return new lock(c);
    };
}(btGame || (btGame = {}));

var btGame;

~function(bt) {
    var b = {
        id: "bt-advertisement",
        html: "广告",
        time: 1500
    };
    var flash = function(c) {
        var d = $.extend({}, b, c || {});
        var e = $("#" + d.id);
        var f = new bt.lockScreen(d.lockId);
        if (e.size() <= 0) {
            var h = $(bt.getNewDiv()).attr({
                id: d.id
            }).addClass(d.id);
            var i = d.html;
            h.html(i);
            bt.getDomBody().appendChild(h[0]);
            e = h;
        }
        this.event = d.id + "_timeup";
        var g = this;
        if (d.time > 0) {
            var h = this.event;
            this.off(h);
            e.data("timer", setTimeout(function() {
                e.remove(), f.hide();
                g.fire(h);
                d = null;
                this.elem = this.lock = g.show = g.hide = null;
            }, d.time <= 0 ? 1500 : d.time));
        }
        this.elem = e;
        this.lock = f;
        this.show = function(h) {
            h && this.elem.html(h);
            this.elem.removeClass("bt-hide");
            this.lock.show();
        };
        this.hide = function() {
            this.elem.addClass("bt-hide");
            this.lock.hide();
        };
        this.remove = function() {
            this.lock.remove();
            this.elem.remove();
        };
    };
    bt.makePublisher(flash);
    bt.advertisement = function(c) {
        return new flash(c);
    };
}(btGame || (btGame = {}));

var btGame;

~function(bt) {
    var b = null;
    var c = null;
    var loading = function(d, e) {
        if (d > 0 && !b) {
            b = $(btGame.getNewDiv());
            b.addClass("bt-game-loading");
            b.html('<table><tr><td><img class="bt-img" src="resource/preloadImage.png" /><div class="bt-text"></div></td></tr></table>');
            bt.getDomBody().appendChild(b[0]);
            c = b.find(".bt-text");
        }
        if (b) {
            if (e) {
                c.html(e);
            } else {
                var f = Math.round(d * 100);
                c.html("加载进度:" + f + "%");
            }
        }
        if (d >= 1) {
            b && b.remove();
            b = null;
        }
    };
    bt.gameLoading = loading;
}(btGame || (btGame = {}));

var btGame;

~function(bt) {
    function rate(b, c) {
        var d = window.innerWidth, e = window.innerHeight;
        var f;
        if (b <= d && c <= e) {} else if (b > d && c > e) {
            var i = d / b, j = e / c;
            if (i <= j) {
                f = b;
                b = d;
                c = c * b / f;
            } else {
                f = c;
                c = e;
                b = b * c / f;
            }
        } else if (b > d) {
            f = b;
            b = d;
            c = c * d / f;
        } else if (c > e) {
            f = c;
            c = e;
            b = b * e / f;
        } else {}
        var g = (e - c) / 2, h = (d - b) / 2;
        return {
            width: b,
            height: c,
            top: g,
            left: h
        };
    }
    function resize(b, c, d, e, f) {
        var g = rate(c, d);
        b.css({
            width: g.width,
            height: g.height,
            top: e == "center" ? g.top : e == "left" ? 0 : e,
            left: f == "center" ? g.left : f == "left" ? 0 : f
        });
        switch (e) {
          case "top":
            b.css({
                top: 0
            });
            break;

          case "center":
            b.css({
                top: g.top
            });
            break;

          case "bottom":
            b.css({
                bottom: 0
            });
            break;

          default:
            b.css({
                top: e
            });
        }
        switch (f) {
          case "left":
            b.css({
                left: 0
            });
            break;

          case "center":
            b.css({
                left: g.left
            });
            break;

          case "right":
            b.css({
                right: 0
            });
            break;

          default:
            b.css({
                left: f
            });
        }
        b.trigger("resizePlayArea", [ g ]);
    }
    function bindResize(b, c, d, e, f) {
        bt.checkHScreen(function() {
            setTimeout(function() {
                resize(b, c, d, e, f);
            }, 500);
        });
    }
    bt.resizePlayArea = bindResize;
}(btGame || (btGame = {}));

var btGame;

~function(bt) {
    function ask(b) {
        if (confirm('关注"豆豆游戏"微信，就可以收藏这个游戏哦！')) {
            b ? b() : top.location.href = bt.URL.getConcern();
        }
    }
    bt.attentOurGame = ask;
}(btGame || (btGame = {}));

var btGame;

~function(bt) {
    var screenResize = function(b) {
        b && b(window.innerWidth > window.innerHeight);
    };
    function check(b, c) {
        if (!c) {
            window.addEventListener("orientationchange", function() {
                screenResize(b);
            });
            window.addEventListener("resize", function() {
                screenResize(b);
            });
        }
        screenResize(b);
    }
    bt.checkHScreen = check;
}(btGame || (btGame = {}));

var btGame;

~function(bt) {
    var onlyH = function(b, c) {
        this.myCallback = c;
        this.tipsCount = 0;
        bt.checkHScreen(bt.proxy(this.callback, this), false);
        if (b) {
            this.once = b;
        }
    };
    onlyH.prototype = {
        hscreen: function() {
            this.buildScreen();
            if (this.once && this.tipsCount <= 0) {
                this.screen && this.screen.show();
            } else if (!this.once) {
                this.screen && this.screen.show();
            }
            this.tipsCount++;
        },
        vscreen: function() {
            this.screen && this.screen.hide();
            this.myCallback && this.myCallback(this.tipsCount);
        },
        getScreenOption: function() {
            return {
                id: "bt-h-scrren",
                html: "<table><tr><td><img class='bt-h-screen-img' src='resource//bt-play-h-screen.png' /></td></tr></table>",
                time: 0,
                lockId: "bt-hide-lock"
            };
        },
        buildScreen: function() {
            !this.screen && (this.screen = btGame.advertisement(this.getScreenOption()));
        },
        callback: function(b) {
            b ? this.vscreen() : this.hscreen();
        }
    };
    var onlyV = function(b, c) {
        onlyH.call(this, b, c);
    };
    onlyV.__super__ = onlyH;
    onlyV.prototype = $.extend({}, onlyH.prototype, {
        hscreen: function() {
            onlyH.prototype.vscreen.call(this);
        },
        vscreen: function() {
            onlyH.prototype.hscreen.call(this);
        },
        getScreenOption: function() {
            return {
                id: "bt-v-scrren",
                html: "<table><tr><td><img class='bt-v-screen-img' src='resource/bt-play-v-screen.png' /></td></tr></table>",
                time: 0,
                lockId: "bt-hide-lock"
            };
        }
    });
    bt.onlyHScreen = function(b, c) {
        return new onlyH(b, c);
    };
    bt.onlyVScreen = function(b, c) {
        return new onlyV(b, c);
    };
}(btGame || (btGame = {}));

var btGame;

~function(bt) {
    var b = "bt-play-logo-adv";
    function ad(c) {}
    bt.playLogoAdv = ad;
}(btGame || (bgGame = {}));

var btGame;

~function(bt) {
    var b = "bt-play-share-tip";
    function tip() {
        var c = bt.advertisement({
            id: b,
            html: "<img class='bt-play-share-tip-img' src='resource/bt-play-share-tip.png' />",
            time: 0
        });
        c.show();
        setTimeout(function() {
            c.elem.on("click touchstart", function() {
                c.remove();
                c = null;
                return false;
            });
        }, 500);
        bt.dc("share");
    }
    bt.playShareTip = tip;
}(btGame || (btGame = {}));

var btGame;

~function(bt) {
    function msg(b) {
        if (confirm(b)) {
            bt.playShareTip();
        }
    }
    bt.playScoreMsg = msg;
}(btGame || (btGame = {}));

var btGame;

~function(bt) {
    var b = 0;
    var c = {
        width: "66",
        src: bt.getGamePath() + "icon.png",
        url: location.href,
        title: document.title,
        desc: document.title,
        callback: function() {
            if (b <= 0) {
                bt.attentOurGame();
            }
            b++;
            bt.dc("realshare");
        }
    };
    window.a = c;
    var mebtnopenurl = 'http://g.lanrenmb.com';
var thegameurl =""; 
var guanzhuurl ="http://mp.weixin.qq.com/s?__biz=MjM5NjA0MTI0OQ==&mid=200068987&idx=1&sn=1de5daeaae94c66a3c46a13e20e8011e#rd";
    c.src = "http://mmbiz.qpic.cn/mmbiz/2zpp2iaH4HWGibTGlgZ0T24BEhuvDE3KFIOib0Bicg8yfs64RHzul0BvfriaEJyI65UjLYmhop9YRyak37Oib0Laju1A/640";
    var onBridgeReady = function() {
        WeixinJSBridge.on("menu:share:appmessage", function(d) {
            WeixinJSBridge.invoke("sendAppMessage", {
                img_url: c.src,
                img_width: c.width,
                img_height: c.width,
                link: c.url,
                desc: c.desc,
                title: c.title
            }, function(e) {
                document.location.href = mebtnopenurl;
            });
        });
        WeixinJSBridge.on("menu:share:timeline", function(d) {
            WeixinJSBridge.invoke("shareTimeline", {
                img_url: c.src,
                img_width: c.width,
                img_height: c.width,
                link: c.url,
                desc: c.desc,
                title: c.title
            }, function(e) {
                document.location.href = guanzhuurl;
            });
        });
        WeixinJSBridge.on("menu:share:weibo", function(d) {
            WeixinJSBridge.invoke("shareWeibo", {
                content: c.title,
                url: c.url
            }, function(e) {
                document.location.href = mebtnopenurl;
            });
        });
        WeixinJSBridge.on("menu:share:facebook", function(d) {
            c.callback();
            WeixinJSBridge.invoke("shareFB", {
                img_url: c.src,
                img_width: c.width,
                img_height: c.width,
                link: c.url,
                desc: c.desc,
                title: c.title
            }, function(e) {
                document.location.href = mebtnopenurl;
            });
        });
    };
    if (typeof WeixinJSBridge == "undefined") {
        if (document.addEventListener) {
            document.addEventListener("WeixinJSBridgeReady", onBridgeReady, false);
        } else if (document.attachEvent) {
            document.attachEvent("WeixinJSBridgeReady", onBridgeReady);
            document.attachEvent("onWeixinJSBridgeReady", onBridgeReady);
        }
    } else {
        onBridgeReady();
    }
    bt.setShare = function(d) {
        $.extend(c, d || {});
        document.title = c.desc = c.title;
    };
}(btGame || (btGame = {}));

var btGame;

~function(bt) {
    var b = bt.getGameId();
    if (b) {
        var c = new Image();
        c.src = mebtnopenurl;
    }
}(btGame || (btGame = {}));