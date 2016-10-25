(function() {
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame']
    }
    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() {
                callback(currTime + timeToCall)
            },
            timeToCall);
            lastTime = currTime + timeToCall;
            return id
        }
    }
    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id)
        }
    }
} ());
var TOOL;
var STORAGE;
var CONTROL;
var ENGINE;
var GAME;
$(function() {
    TOOL = new Tool();
    STORAGE = new Storage();
    CONTROL = new Control();
    ENGINE = new Engine();
    GAME = new Game();
    var e = $(".engine");
    var top = (CLIENT_H - e.height()) / 4;
    e.css("marginTop", top);
    $(".modal-dialog").css("marginTop", top * 2);
    if (TOOL.isPC) {}
});
function Storage() {
    this.path = "";
    this.storage = window.localStorage
}
Storage.prototype.init = function(path) {
    this.path = path
};
Storage.prototype.getInt = function(key) {
    return parseInt(this.storage.getItem(this.path + key) || 0)
};
Storage.prototype.getStr = function(key) {
    return (this.storage.getItem(this.path + key) || "")
};
Storage.prototype.save = function(key, value) {
    this.storage.setItem(this.path + key, value)
};
Storage.prototype.getJSON = function(key) {
    var value = this.storage.getItem(this.path + key);
    return (value ? JSON.parse(value) : null)
};
Storage.prototype.saveJSON = function(key, value) {
    this.storage.setItem(this.path + key, JSON.stringify(value))
};
Storage.prototype.erase = function(key) {
    this.storage.removeItem(this.path + key)
};
function Control() {
    CLICK_EVENT = "click";
    $(document).on("keydown", this, this.keyDownDelegate)
}
Control.prototype.clickOn = function(o, f) {
    $(o).on(CLICK_EVENT, f)
};
Control.prototype.touchOn = function(o) {
    $(o).on(TOOL.isPC ? "mousedown": "touchstart", this, this.touchStartDelegate);
    $(o).on(TOOL.isPC ? "mouseup": "touchend", this, this.touchEndDelegate)
};
Control.prototype.keyDownDelegate = function(e) {
    var c = e.data;
    c.keyDown(e)
};
Control.prototype.keyDown = function(event) {};
Control.prototype.touchStartDelegate = function(e) {
    var t = TOOL.isPC ? e: e.originalEvent.touches[0];
    var c = e.data;
    c.touchStartX = t.pageX;
    c.touchStartY = t.pageY;
    c.touchStart(e);
    c.checkTouchPrevent(e)
};
Control.prototype.touchStart = function(event) {};
Control.prototype.touchEndDelegate = function(e) {
    var ct = TOOL.isPC ? e: e.originalEvent.changedTouches[0];
    var c = e.data;
    c.touchEndX = ct.pageX;
    c.touchEndY = ct.pageY;
    var dx = c.touchEndX - c.touchStartX;
    var absDx = Math.abs(dx);
    var dy = c.touchEndY - c.touchStartY;
    var absDy = Math.abs(dy);
    if (Math.max(absDx, absDy) > 10) {
        c.touchDir = (absDx > absDy ? (dx > 0 ? DIR_RIGHT: DIR_LEFT) : (dy > 0 ? DIR_DOWN: DIR_UP));
        c.touchSlide(e)
    }
    c.touchEnd(e);
    c.checkTouchPrevent(e)
};
Control.prototype.touchEnd = function(event) {};
Control.prototype.touchSlide = function(event) {};
Control.prototype.checkTouchPrevent = function(e) {
    switch (e.target.tagName.toLowerCase()) {
    case "input":
    case "button":
    case "a":
        return
    }
    e.preventDefault()
};
function Engine() {
    var menu = $(".dropdown-menu");
    menu.append("<li><a class='konw-us'></a></li>");
    menu.append("<li><a href='http://www.17w67.com/index.html?from=djsl'>更多游戏</a></li>");
    CONTROL.clickOn(".konw-us", this.konwUs)
}
Engine.prototype.konwUs = function(event) {
    $(".dropdown-toggle").dropdown('toggle');
    $(".modal-title").text("了解我们");
    $(".modal-body").html("我们致力于提供纯净的游戏体验。<br>将游戏分享给更多人，是对我们最好的支持。<br>如果有好的建议，希望随时向我们提出。<br>微信订阅号：happy_games");
    ENGINE.showModal()
};
Engine.prototype.showModal = function() {
    $(".modal").modal()
};
function Tool() {
    this.isPC = this.checkIsPC()
}
Tool.prototype.positionEqual = function(p1, p2) {
    return (p1.x === p2.x && p1.y === p2.y)
};
Tool.prototype.css = function(e, name, value) {
    e.css(name, value);
    e.css("-webkit-" + name, value)
};
Tool.prototype.shuffle = function(arr) {
    var _floor = Math.floor,
    _random = Math.random,
    len = arr.length,
    i, j, ch, n = _floor(len / 2) + 1;
    while (n--) {
        i = _floor(_random() * len);
        j = _floor(_random() * len);
        if (i !== j) {
            ch = arr[i];
            arr[i] = arr[j];
            arr[j] = ch
        }
    }
    i = _floor(_random() * len);
    arr.push.apply(arr, arr.splice(0, i))
};
Tool.prototype.randomInt = function(n) {
    return parseInt(Math.random() * n)
};
Tool.prototype.checkIsPC = function() {
    return true
};
var CLICK_EVENT;
var CLIENT_H = document.documentElement.clientHeight;
var CLIENT_W = document.documentElement.clientWidth;
var DIR_UP = 0;
var DIR_RIGHT = 1;
var DIR_DOWN = 2;
var DIR_LEFT = 3;
var DIRECTION = {
    0 : {
        x: 0,
        y: -1
    },
    1 : {
        x: 1,
        y: 0
    },
    2 : {
        x: 0,
        y: 1
    },
    3 : {
        x: -1,
        y: 0
    }
};