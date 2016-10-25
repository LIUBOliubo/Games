/*
 zlib.js 2012 - imaya [ https://github.com/imaya/zlib.js ] The MIT License */
var egret;
(function(c) {
    var e = function() {
        function c() {
            this._hashCode = c.hashCount++
        }
        Object.defineProperty(c.prototype, "hashCode", {
            get: function() {
                return this._hashCode
            },
            enumerable: !0,
            configurable: !0
        });
        c.hashCount = 1;
        return c
    }();
    c.HashObject = e
})(egret || (egret = {}));
var __extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(c) {
        function a(b) {
            "undefined" === typeof b && (b = 300);
            c.call(this);
            this.objectPool = [];
            this._length = 0;
            1 > b && (b = 1);
            this.autoDisposeTime = b;
            this.frameCount = 0
        }
        __extends(a, c);
        a.prototype._checkFrame = function() {
            this.frameCount--;
            0 >= this.frameCount && this.dispose()
        };
        Object.defineProperty(a.prototype, "length", {
            get: function() {
                return this._length
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype.push = function(b) {
            var h = this.objectPool; - 1 == h.indexOf(b) && (h.push(b), this._length++, 0 == this.frameCount &&
                (this.frameCount = this.autoDisposeTime, a._callBackList.push(this)))
        };
        a.prototype.pop = function() {
            if (0 == this._length) return null;
            this._length--;
            return this.objectPool.pop()
        };
        a.prototype.dispose = function() {
            0 < this._length && (this.objectPool = [], this._length = 0);
            this.frameCount = 0;
            var b = a._callBackList,
                h = b.indexOf(this); - 1 != h && b.splice(h, 1)
        };
        a._callBackList = [];
        return a
    }(c.HashObject);
    c.Recycler = e
})(egret || (egret = {}));
(function(c) {
    c.__START_TIME;
    c.getTimer = function() {
        return Date.now() - c.__START_TIME
    }
})(egret || (egret = {}));
(function(c) {
    c.__callLaterFunctionList = [];
    c.__callLaterThisList = [];
    c.__callLaterArgsList = [];
    c.callLater = function(e, d) {
        for (var a = [], b = 0; b < arguments.length - 2; b++) a[b] = arguments[b + 2];
        c.__callLaterFunctionList.push(e);
        c.__callLaterThisList.push(d);
        c.__callLaterArgsList.push(a)
    }
})(egret || (egret = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(d) {
        function a(b, a, c) {
            "undefined" === typeof a && (a = !1);
            "undefined" === typeof c && (c = !1);
            d.call(this);
            this._eventPhase = 2;
            this._isPropagationImmediateStopped = this._isPropagationStopped = this._isDefaultPrevented = !1;
            this.isNew = !0;
            this._type = b;
            this._bubbles = a;
            this._cancelable = c
        }
        __extends(a, d);
        Object.defineProperty(a.prototype, "type", {
            get: function() {
                return this._type
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "bubbles", {
            get: function() {
                return this._bubbles
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "cancelable", {
            get: function() {
                return this._cancelable
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "eventPhase", {
            get: function() {
                return this._eventPhase
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "currentTarget", {
            get: function() {
                return this._currentTarget
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype._setCurrentTarget = function(b) {
            this._currentTarget = b
        };
        Object.defineProperty(a.prototype, "target", {
            get: function() {
                return this._target
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype.isDefaultPrevented = function() {
            return this._isDefaultPrevented
        };
        a.prototype.preventDefault = function() {
            this._cancelable && (this._isDefaultPrevented = !0)
        };
        a.prototype.stopPropagation = function() {
            this._bubbles && (this._isPropagationStopped = !0)
        };
        a.prototype.stopImmediatePropagation = function() {
            this._bubbles && (this._isPropagationImmediateStopped = !0)
        };
        a.prototype._reset = function() {
            this.isNew ? this.isNew = !1 : (this._isPropagationImmediateStopped =
                this._isPropagationStopped = this._isDefaultPrevented = !1, this._currentTarget = this._target = null, this._eventPhase = 2)
        };
        a._dispatchByTarget = function(b, a, l, d, e, g) {
            "undefined" === typeof e && (e = !1);
            "undefined" === typeof g && (g = !1);
            var k = b.eventRecycler;
            k || (k = b.eventRecycler = new c.Recycler);
            var n = k.pop();
            n ? n._type = l : n = new b(l);
            n._bubbles = e;
            n._cancelable = g;
            if (d)
                for (var p in d) n[p] = d[p], null !== n[p] && (d[p] = null);
            b = a.dispatchEvent(n);
            k.push(n);
            return b
        };
        a._getPropertyData = function(b) {
            var a = b._props;
            a || (a = b._props = {});
            return a
        };
        a.dispatchEvent = function(b, h, c, d) {
            "undefined" === typeof c && (c = !1);
            var e = a._getPropertyData(a);
            d && (e.data = d);
            a._dispatchByTarget(a, b, h, e, c)
        };
        a.ADDED_TO_STAGE = "addedToStage";
        a.REMOVED_FROM_STAGE = "removedFromStage";
        a.ADDED = "added";
        a.REMOVED = "removed";
        a.COMPLETE = "complete";
        a.ENTER_FRAME = "enterFrame";
        a.RENDER = "render";
        a.FINISH_RENDER = "finishRender";
        a.FINISH_UPDATE_TRANSFORM = "finishUpdateTransform";
        a.LEAVE_STAGE = "leaveStage";
        a.RESIZE = "resize";
        a.CHANGE = "change";
        return a
    }(c.HashObject);
    c.Event =
        e
})(egret || (egret = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(d) {
        function a(b, a, c) {
            "undefined" === typeof a && (a = !1);
            "undefined" === typeof c && (c = !1);
            d.call(this, b, a, c)
        }
        __extends(a, d);
        a.dispatchIOErrorEvent = function(b) {
            c.Event._dispatchByTarget(a, b, a.IO_ERROR)
        };
        a.IO_ERROR = "ioError";
        return a
    }(c.Event);
    c.IOErrorEvent = e
})(egret || (egret = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(d) {
        function a(b, a, c, m, e, g, k, n, p, q) {
            "undefined" === typeof a && (a = !0);
            "undefined" === typeof c && (c = !0);
            "undefined" === typeof m && (m = 0);
            "undefined" === typeof e && (e = 0);
            "undefined" === typeof g && (g = 0);
            "undefined" === typeof k && (k = !1);
            "undefined" === typeof n && (n = !1);
            "undefined" === typeof q && (q = !1);
            d.call(this, b, a, c);
            this._localY = this._localX = this._stageY = this._stageX = 0;
            this.touchPointID = m;
            this._stageX = e;
            this._stageY = g;
            this.ctrlKey = k;
            this.altKey = n;
            this.touchDown = q
        }
        __extends(a, d);
        Object.defineProperty(a.prototype,
            "stageX", {
                get: function() {
                    return this._stageX
                },
                enumerable: !0,
                configurable: !0
            });
        Object.defineProperty(a.prototype, "stageY", {
            get: function() {
                return this._stageY
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "localX", {
            get: function() {
                return this._localX
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "localY", {
            get: function() {
                return this._localY
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype._setCurrentTarget = function(b) {
            d.prototype._setCurrentTarget.call(this, b);
            b instanceof
            c.DisplayObject && (b = b.globalToLocal(this._stageX, this._stageY, c.Point.identity), this._localX = b.x, this._localY = b.y)
        };
        a.dispatchTouchEvent = function(b, h, l, d, e, g, k, n, p) {
            "undefined" === typeof l && (l = 0);
            "undefined" === typeof d && (d = 0);
            "undefined" === typeof e && (e = 0);
            "undefined" === typeof g && (g = !1);
            "undefined" === typeof k && (k = !1);
            "undefined" === typeof n && (n = !1);
            "undefined" === typeof p && (p = !1);
            var q = c.Event._getPropertyData(a);
            q.touchPointID = l;
            q._stageX = d;
            q._stageY = e;
            q.ctrlKey = g;
            q.altKey = k;
            q.shiftKey = n;
            q.touchDown =
                p;
            c.Event._dispatchByTarget(a, b, h, q, !0, !0)
        };
        a.TOUCH_TAP = "touchTap";
        a.TOUCH_MOVE = "touchMove";
        a.TOUCH_BEGIN = "touchBegin";
        a.TOUCH_END = "touchEnd";
        a.TOUCH_RELEASE_OUTSIDE = "touchReleaseOutside";
        a.TOUCH_ROLL_OUT = "touchRollOut";
        a.TOUCH_ROLL_OVER = "touchRollOver";
        a.TOUCH_OUT = "touchOut";
        a.TOUCH_OVER = "touchOver";
        return a
    }(c.Event);
    c.TouchEvent = e
})(egret || (egret = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(d) {
        function a(b, a, c) {
            "undefined" === typeof a && (a = !1);
            "undefined" === typeof c && (c = !1);
            d.call(this, b, a, c)
        }
        __extends(a, d);
        a.dispatchTimerEvent = function(b, h) {
            c.Event._dispatchByTarget(a, b, h)
        };
        a.TIMER = "timer";
        a.TIMER_COMPLETE = "timerComplete";
        return a
    }(c.Event);
    c.TimerEvent = e
})(egret || (egret = {}));
(function(c) {
    var e = function() {
        function c() {}
        c.CAPTURING_PHASE = 1;
        c.AT_TARGET = 2;
        c.BUBBLING_PHASE = 3;
        return c
    }();
    c.EventPhase = e
})(egret || (egret = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(d) {
        function a(b) {
            "undefined" === typeof b && (b = null);
            d.call(this);
            this._eventTarget = b ? b : this
        }
        __extends(a, d);
        a.prototype.addEventListener = function(b, a, l, d, e) {
            "undefined" === typeof d && (d = !1);
            "undefined" === typeof e && (e = 0);
            "undefined" === typeof d && (d = !1);
            "undefined" === typeof e && (e = 0);
            a || c.Logger.fatal("addEventListener\u4fa6\u542c\u51fd\u6570\u4e0d\u80fd\u4e3a\u7a7a");
            d ? (this._captureEventsMap || (this._captureEventsMap = {}), d = this._captureEventsMap) : (this._eventsMap || (this._eventsMap = {}), d = this._eventsMap);
            var g = d[b];
            g || (g = d[b] = []);
            this._insertEventBin(g, a, l, e)
        };
        a.prototype._insertEventBin = function(b, a, c, d) {
            for (var e = -1, g = b.length, k = 0; k < g; k++) {
                var n = b[k];
                if (n.listener === a && n.thisObject === c) return !1; - 1 == e && n.priority < d && (e = k)
            }
            a = {
                listener: a,
                thisObject: c,
                priority: d
            }; - 1 != e ? b.splice(e, 0, a) : b.push(a);
            return !0
        };
        a.prototype.removeEventListener = function(b, a, c, d) {
            "undefined" === typeof d && (d = !1);
            if (d = d ? this._captureEventsMap : this._eventsMap) {
                var e = d[b];
                e && (this._removeEventBin(e, a, c), 0 ==
                    e.length && delete d[b])
            }
        };
        a.prototype._removeEventBin = function(b, a, c) {
            for (var d = b.length, e = 0; e < d; e++) {
                var g = b[e];
                if (g.listener === a && g.thisObject === c) return b.splice(e, 1), !0
            }
            return !1
        };
        a.prototype.hasEventListener = function(b) {
            return this._eventsMap && this._eventsMap[b] || this._captureEventsMap && this._captureEventsMap[b]
        };
        a.prototype.willTrigger = function(b) {
            return this.hasEventListener(b)
        };
        a.prototype.dispatchEvent = function(b) {
            b._reset();
            b._target = this._eventTarget;
            b._setCurrentTarget(this._eventTarget);
            return this._notifyListener(b)
        };
        a.prototype._notifyListener = function(b) {
            var a = 1 == b._eventPhase ? this._captureEventsMap : this._eventsMap;
            if (!a) return !0;
            a = a[b.type];
            if (!a) return !0;
            for (var a = a.concat(), c = a.length, d = 0; d < c; d++) {
                var e = a[d];
                e.listener.call(e.thisObject, b);
                if (b._isPropagationImmediateStopped) break
            }
            return !b.isDefaultPrevented()
        };
        a.prototype.dispatchEventWith = function(b, a, l) {
            "undefined" === typeof a && (a = !1);
            c.Event.dispatchEvent(this, b, a, l)
        };
        return a
    }(c.HashObject);
    c.EventDispatcher = e
})(egret ||
    (egret = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(d) {
        function a() {
            d.call(this);
            this.reuseEvent = new c.Event("")
        }
        __extends(a, d);
        a.prototype.run = function() {
            c.Ticker.getInstance().run();
            c.Ticker.getInstance().register(this.renderLoop, this, Number.NEGATIVE_INFINITY);
            c.Ticker.getInstance().register(this.broadcastEnterFrame, this, Number.POSITIVE_INFINITY);
            this.touchContext.run();
            c.__invalidateModuleFlag = !0
        };
        a.prototype.renderLoop = function(b) {
            b = this.rendererContext;
            b.clearScreen();
            if (0 < c.__callLaterFunctionList.length) {
                var a = c.__callLaterFunctionList;
                c.__callLaterFunctionList = [];
                var l = c.__callLaterThisList;
                c.__callLaterThisList = [];
                var d = c.__callLaterArgsList;
                c.__callLaterArgsList = []
            }
            this.dispatchEventWith(c.Event.RENDER);
            c.Stage._invalidateRenderFlag && (this.broadcastRender(), c.Stage._invalidateRenderFlag = !1);
            a && this.doCallLaterList(a, l, d);
            this.stage._updateTransform();
            this.dispatchEventWith(c.Event.FINISH_UPDATE_TRANSFORM);
            this.stage._draw(b);
            this.dispatchEventWith(c.Event.FINISH_RENDER)
        };
        a.prototype.broadcastEnterFrame = function(b) {
            b = this.reuseEvent;
            b._type = c.Event.ENTER_FRAME;
            this.dispatchEvent(b);
            for (var a = c.DisplayObject._enterFrameCallBackList.concat(), l = a.length, d = 0; d < l; d++) {
                var e = a[d];
                b._target = e.display;
                b._setCurrentTarget(e.display);
                e.listener.call(e.thisObject, b)
            }
            a = c.Recycler._callBackList;
            for (d = a.length - 1; 0 <= d; d--) a[d]._checkFrame()
        };
        a.prototype.broadcastRender = function() {
            var b = this.reuseEvent;
            b._type = c.Event.RENDER;
            for (var a = c.DisplayObject._renderCallBackList.concat(), l = a.length, d = 0; d < l; d++) {
                var e = a[d];
                b._target = e.display;
                b._setCurrentTarget(e.display);
                e.listener.call(e.thisObject, b)
            }
        };
        a.prototype.doCallLaterList = function(b, a, c) {
            for (var d = b.length, e = 0; e < d; e++) {
                var g = b[e];
                null != g && g.apply(a[e], c[e])
            }
        };
        return a
    }(c.EventDispatcher);
    c.MainContext = e
})(egret || (egret = {}));
egret.MainContext.instance = new egret.MainContext;
(function(c) {
    var e = function() {
        function d() {
            this._tick = this._preDrawCount = this._updateTransformPerformanceCost = this._renderPerformanceCost = this._logicPerformanceCost = this._lastTime = 0;
            this._maxDeltaTime = 500;
            this._totalDeltaTime = 0
        }
        d.getInstance = function() {
            null == d.instance && (d.instance = new d);
            return d.instance
        };
        d.prototype.run = function() {
            c.Ticker.getInstance().register(this.update, this);
            null == this._txt && (this._txt = new c.TextField, this._txt.size = 28, c.MainContext.instance.stage.addChild(this._txt));
            var a =
                c.MainContext.instance;
            a.addEventListener(c.Event.ENTER_FRAME, this.onEnterFrame, this);
            a.addEventListener(c.Event.RENDER, this.onStartRender, this);
            a.addEventListener(c.Event.FINISH_RENDER, this.onFinishRender, this);
            a.addEventListener(c.Event.FINISH_UPDATE_TRANSFORM, this.onFinishUpdateTransform, this)
        };
        d.prototype.onEnterFrame = function(a) {
            this._lastTime = c.getTimer()
        };
        d.prototype.onStartRender = function(a) {
            a = c.getTimer();
            this._logicPerformanceCost = a - this._lastTime;
            this._lastTime = a
        };
        d.prototype.onFinishUpdateTransform =
            function(a) {
                a = c.getTimer();
                this._updateTransformPerformanceCost = a - this._lastTime;
                this._lastTime = a
            };
        d.prototype.onFinishRender = function(a) {
            a = c.getTimer();
            this._renderPerformanceCost = a - this._lastTime;
            this._lastTime = a
        };
        d.prototype.update = function(a) {
            this._tick++;
            this._totalDeltaTime += a;
            if (this._totalDeltaTime >= this._maxDeltaTime) {
                a = (this._preDrawCount - 1).toString();
                var b = Math.ceil(this._logicPerformanceCost).toString() + "," + Math.ceil(this._updateTransformPerformanceCost).toString() + "," + Math.ceil(this._renderPerformanceCost).toString() +
                    "," + Math.ceil(c.MainContext.instance.rendererContext.renderCost).toString();
                this._txt.text = "draw:" + a + "\ncost:" + b + "\nFPS:" + Math.floor(1E3 * this._tick / this._totalDeltaTime).toString();
                this._tick = this._totalDeltaTime = 0
            }
            this._preDrawCount = 0
        };
        d.prototype.onDrawImage = function() {
            this._preDrawCount++
        };
        return d
    }();
    c.Profiler = e
})(egret || (egret = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(d) {
        function a() {
            d.apply(this, arguments);
            this._timeScale = 1;
            this._paused = !1;
            this.callBackList = []
        }
        __extends(a, d);
        a.prototype.run = function() {
            c.__START_TIME = (new Date).getTime();
            c.MainContext.instance.deviceContext.executeMainLoop(this.update, this)
        };
        a.prototype.update = function(b) {
            var a = this.callBackList.concat(),
                c = a.length;
            b *= this._timeScale;
            b *= this._timeScale;
            for (var d = 0; d < c; d++) {
                var e = a[d];
                e.listener.call(e.thisObject, b)
            }
        };
        a.prototype.register = function(b, a, c) {
            "undefined" ===
            typeof c && (c = 0);
            this._insertEventBin(this.callBackList, b, a, c)
        };
        a.prototype.unregister = function(b, a) {
            this._removeEventBin(this.callBackList, b, a)
        };
        a.prototype.setTimeout = function(b, a, c) {
            for (var d = [], e = 0; e < arguments.length - 3; e++) d[e] = arguments[e + 3];
            var g = this,
                k = 0;
            this.register(function(e) {
                0 == c ? (g.unregister(arguments.callee, a), b.apply(a, d)) : (k += e, k >= c && (g.unregister(arguments.callee, a), b.apply(a, d)))
            }, a)
        };
        a.prototype.setTimeScale = function(b) {
            this._timeScale = b
        };
        a.prototype.getTimeScale = function() {
            return this._timeScale
        };
        a.prototype.pause = function() {
            this._paused = !0
        };
        a.prototype.resume = function() {
            this._paused = !1
        };
        a.getInstance = function() {
            null == a.instance && (a.instance = new a);
            return a.instance
        };
        return a
    }(c.EventDispatcher);
    c.Ticker = e
})(egret || (egret = {}));
(function(c) {
    var e = function() {
        function c() {}
        c.LEFT = "left";
        c.RIGHT = "right";
        c.CENTER = "center";
        c.JUSTIFY = "justify";
        c.CONTENT_JUSTIFY = "contentJustify";
        return c
    }();
    c.HorizontalAlign = e
})(egret || (egret = {}));
(function(c) {
    var e = function() {
        function c() {}
        c.TOP = "top";
        c.BOTTOM = "bottom";
        c.MIDDLE = "middle";
        c.JUSTIFY = "justify";
        c.CONTENT_JUSTIFY = "contentJustify";
        return c
    }();
    c.VerticalAlign = e
})(egret || (egret = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(d) {
        function a(b, a) {
            "undefined" === typeof a && (a = 0);
            d.call(this);
            this._currentCount = 0;
            this.delay = b;
            this.repeatCount = a
        }
        __extends(a, d);
        a.prototype.currentCount = function() {
            return this._currentCount
        };
        Object.defineProperty(a.prototype, "running", {
            get: function() {
                return this._running
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype.reset = function() {
            this.stop();
            this._currentCount = 0
        };
        a.prototype.start = function() {
            this._running || (this.lastTime = c.getTimer(), 0 != this._currentCount && (this._currentCount =
                0), c.Ticker.getInstance().register(this.onEnterFrame, this), this._running = !0)
        };
        a.prototype.stop = function() {
            this._running && (c.Ticker.getInstance().unregister(this.onEnterFrame, this), this._running = !1)
        };
        a.prototype.onEnterFrame = function(b) {
            b = c.getTimer();
            b - this.lastTime > this.delay && (this.lastTime = b, this._currentCount++, c.TimerEvent.dispatchTimerEvent(this, c.TimerEvent.TIMER), 0 < this.repeatCount && this._currentCount >= this.repeatCount && (this.stop(), c.TimerEvent.dispatchTimerEvent(this, c.TimerEvent.TIMER_COMPLETE)))
        };
        return a
    }(c.EventDispatcher);
    c.Timer = e
})(egret || (egret = {}));
(function(c) {
    function e(b) {
        b = b.toString();
        var a = b.indexOf("(");
        return b.substring(9, a)
    }

    function d(b, h) {
        for (var c in b) {
            var m = b[c],
                f = typeof m;
            "function" == f ? m.prototype && (f = m.toString(), a[f] || (a[f] = h + "." + e(m))) : "object" != f || m instanceof Array || d(m, h + "." + c)
        }
    }
    c.__moduleNameList = ["egret", "RES", "dragonBones"];
    c.__invalidateModuleFlag = !0;
    var a = {};
    c.getQualifiedClassName = function(b) {
        b = b.prototype ? b.prototype.constructor : b.__proto__.constructor;
        var h = b.toString(),
            l = a[h];
        if (l) return l;
        if (c.__invalidateModuleFlag) {
            for (var l =
                c.__moduleNameList, m = l.length, f = 0; f < m; f++) {
                var g = l[f],
                    k = __global[g];
                k && "object" == typeof k && k.__proto__ && "Object" == e(k.__proto__.constructor) && d(k, g)
            }
            c.__invalidateModuleFlag = !1;
            if (l = a[h]) return l
        }
        return a[h] = l = e(b)
    }
})(egret || (egret = {}));
var __global = __global || this;
(function(c) {
    var e = {};
    c.getDefinitionByName = function(c) {
        if (!c) return null;
        var a = e[c];
        if (a) return a;
        for (var b = c.split("."), h = b.length, a = __global, l = 0; l < h; l++)
            if (a = a[b[l]], !a) return null;
        return e[c] = a
    }
})(egret || (egret = {}));
__global = __global || this;
(function(c) {
    c.hasDefinition = function(e) {
        return c.getDefinitionByName(e) ? !0 : !1
    }
})(egret || (egret = {}));
(function(c) {
    c.toColorString = function(c) {
        if (isNaN(c) || 0 > c) c = 0;
        16777215 < c && (c = 16777215);
        for (c = c.toString(16).toUpperCase(); 6 > c.length;) c = "0" + c;
        return "#" + c
    }
})(egret || (egret = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(d) {
        function a(b, a, c, e, f, g) {
            "undefined" === typeof b && (b = 1);
            "undefined" === typeof a && (a = 0);
            "undefined" === typeof c && (c = 0);
            "undefined" === typeof e && (e = 1);
            "undefined" === typeof f && (f = 0);
            "undefined" === typeof g && (g = 0);
            d.call(this);
            this.a = b;
            this.b = a;
            this.c = c;
            this.d = e;
            this.tx = f;
            this.ty = g
        }
        __extends(a, d);
        a.prototype.prepend = function(b, a, c, d, e, g) {
            var k = this.tx;
            if (1 != b || 0 != a || 0 != c || 1 != d) {
                var n = this.a,
                    p = this.c;
                this.a = n * b + this.b * c;
                this.b = n * a + this.b * d;
                this.c = p * b + this.d * c;
                this.d = p * a + this.d *
                    d
            }
            this.tx = k * b + this.ty * c + e;
            this.ty = k * a + this.ty * d + g;
            return this
        };
        a.prototype.append = function(b, a, c, d, e, g) {
            var k = this.a,
                n = this.b,
                p = this.c,
                q = this.d;
            this.a = b * k + a * p;
            this.b = b * n + a * q;
            this.c = c * k + d * p;
            this.d = c * n + d * q;
            this.tx = e * k + g * p + this.tx;
            this.ty = e * n + g * q + this.ty;
            return this
        };
        a.prototype.prependMatrix = function(b) {
            this.prepend(b.a, b.b, b.c, b.d, b.tx, b.ty);
            return this
        };
        a.prototype.appendMatrix = function(b) {
            this.append(b.a, b.b, b.c, b.d, b.tx, b.ty);
            return this
        };
        a.prototype.prependTransform = function(b, h, c, d, e, g, k, n, p) {
            if (e %
                360) {
                var q = e * a.DEG_TO_RAD;
                e = Math.cos(q);
                q = Math.sin(q)
            } else e = 1, q = 0; if (n || p) this.tx -= n, this.ty -= p;
            g || k ? (g *= a.DEG_TO_RAD, k *= a.DEG_TO_RAD, this.prepend(e * c, q * c, -q * d, e * d, 0, 0), this.prepend(Math.cos(k), Math.sin(k), -Math.sin(g), Math.cos(g), b, h)) : this.prepend(e * c, q * c, -q * d, e * d, b, h);
            return this
        };
        a.prototype.appendTransform = function(b, h, c, d, e, g, k, n, p) {
            if (e % 360) {
                var q = e * a.DEG_TO_RAD;
                e = Math.cos(q);
                q = Math.sin(q)
            } else e = 1, q = 0;
            g || k ? (g *= a.DEG_TO_RAD, k *= a.DEG_TO_RAD, this.append(Math.cos(k), Math.sin(k), -Math.sin(g),
                Math.cos(g), b, h), this.append(e * c, q * c, -q * d, e * d, 0, 0)) : this.append(e * c, q * c, -q * d, e * d, b, h);
            if (n || p) this.tx -= n * this.a + p * this.c, this.ty -= n * this.b + p * this.d;
            return this
        };
        a.prototype.rotate = function(b) {
            var a = Math.cos(b);
            b = Math.sin(b);
            var c = this.a,
                d = this.c,
                e = this.tx;
            this.a = c * a - this.b * b;
            this.b = c * b + this.b * a;
            this.c = d * a - this.d * b;
            this.d = d * b + this.d * a;
            this.tx = e * a - this.ty * b;
            this.ty = e * b + this.ty * a;
            return this
        };
        a.prototype.skew = function(b, h) {
            b *= a.DEG_TO_RAD;
            h *= a.DEG_TO_RAD;
            this.append(Math.cos(h), Math.sin(h), -Math.sin(b),
                Math.cos(b), 0, 0);
            return this
        };
        a.prototype.scale = function(b, a) {
            this.a *= b;
            this.d *= a;
            this.c *= b;
            this.b *= a;
            this.tx *= b;
            this.ty *= a;
            return this
        };
        a.prototype.translate = function(b, a) {
            this.tx += b;
            this.ty += a;
            return this
        };
        a.prototype.identity = function() {
            this.a = this.d = 1;
            this.b = this.c = this.tx = this.ty = 0;
            return this
        };
        a.prototype.invert = function() {
            var b = this.a,
                a = this.b,
                c = this.c,
                d = this.d,
                e = this.tx,
                g = b * d - a * c;
            this.a = d / g;
            this.b = -a / g;
            this.c = -c / g;
            this.d = b / g;
            this.tx = (c * this.ty - d * e) / g;
            this.ty = -(b * this.ty - a * e) / g;
            return this
        };
        a.transformCoords = function(b, a, l) {
            var d = c.Point.identity;
            d.x = b.a * a + b.c * l + b.tx;
            d.y = b.d * l + b.b * a + b.ty;
            return d
        };
        a.identity = new a;
        a.DEG_TO_RAD = Math.PI / 180;
        return a
    }(c.HashObject);
    c.Matrix = e
})(egret || (egret = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(c) {
        function a(b, a) {
            "undefined" === typeof b && (b = 0);
            "undefined" === typeof a && (a = 0);
            c.call(this);
            this.x = b;
            this.y = a
        }
        __extends(a, c);
        a.prototype.clone = function() {
            return new a(this.x, this.y)
        };
        a.prototype.equals = function(b) {
            return this.x == b.x && this.y == b.y
        };
        a.distance = function(b, a) {
            return Math.sqrt((b.x - a.x) * (b.x - a.x) + (b.y - a.y) * (b.y - a.y))
        };
        a.identity = new a(0, 0);
        return a
    }(c.HashObject);
    c.Point = e
})(egret || (egret = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(c) {
        function a(b, a, l, e) {
            "undefined" === typeof b && (b = 0);
            "undefined" === typeof a && (a = 0);
            "undefined" === typeof l && (l = 0);
            "undefined" === typeof e && (e = 0);
            c.call(this);
            this.x = b;
            this.y = a;
            this.width = l;
            this.height = e
        }
        __extends(a, c);
        Object.defineProperty(a.prototype, "right", {
            get: function() {
                return this.x + this.width
            },
            set: function(b) {
                this.width = b - this.x
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "bottom", {
            get: function() {
                return this.y + this.height
            },
            set: function(b) {
                this.height =
                    b - this.y
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype.initialize = function(b, a, c, d) {
            this.x = b;
            this.y = a;
            this.width = c;
            this.height = d;
            return this
        };
        a.prototype.contains = function(b, a) {
            return this.x <= b && this.x + this.width >= b && this.y <= a && this.y + this.height >= a
        };
        a.prototype.intersects = function(b) {
            return this.contains(b.x, b.y) || this.contains(b.x, b.bottom) || this.contains(b.right, b.y) || this.contains(b.right, b.bottom) ? !0 : !1
        };
        a.prototype.clone = function() {
            return new a(this.x, this.y, this.width, this.height)
        };
        a.prototype.containsPoint =
            function(b) {
                return this.x < b.x && this.x + this.width > b.x && this.y < b.y && this.y + this.height > b.y ? !0 : !1
            };
        a.identity = new a(0, 0, 0, 0);
        return a
    }(c.HashObject);
    c.Rectangle = e
})(egret || (egret = {}));
(function(c) {
    var e = function() {
        function d() {}
        d.fatal = function(a, b) {
            "undefined" === typeof b && (b = null);
            c.Logger.traceToConsole("Fatal", a, b);
            throw Error(c.Logger.getTraceCode("Fatal", a, b));
        };
        d.info = function(a, b) {
            "undefined" === typeof b && (b = null);
            c.Logger.traceToConsole("Info", a, b)
        };
        d.warning = function(a, b) {
            "undefined" === typeof b && (b = null);
            c.Logger.traceToConsole("Warning", a, b)
        };
        d.traceToConsole = function(a, b, h) {
            console.log(c.Logger.getTraceCode(a, b, h))
        };
        d.getTraceCode = function(a, b, h) {
            return "[" + a + "]" + b + ":" +
                (null == h ? "" : h)
        };
        return d
    }();
    c.Logger = e
})(egret || (egret = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(b) {
        function h() {
            b.call(this);
            this._designHeight = this._designWidth = 0;
            this._scaleY = this._scaleX = 1;
            var a = document.getElementById(h.canvas_name),
                c = a.height;
            this._designWidth = a.width;
            this._designHeight = c
        }
        __extends(h, b);
        h.getInstance = function() {
            null == h.instance && (a.initialize(), h.instance = new h);
            return h.instance
        };
        h.prototype.setDesignSize = function(b, a, h) {
            this.setResolutionPolicy(h);
            this._designWidth = b;
            this._designHeight = a;
            this._resolutionPolicy._apply(this, this._designWidth,
                this._designHeight)
        };
        h.prototype.setResolutionPolicy = function(b) {
            this._resolutionPolicy = b;
            b.init(this)
        };
        h.prototype.getScaleX = function() {
            return this._scaleX
        };
        h.prototype.getScaleY = function() {
            return this._scaleY
        };
        h.canvas_name = "gameCanvas";
        h.canvas_div_name = "gameDiv";
        return h
    }(c.HashObject);
    c.StageDelegate = e;
    var d = function() {
        function b(a, h) {
            this.setContainerStrategy(a);
            this.setContentStrategy(h)
        }
        b.prototype.init = function(b) {
            this._containerStrategy.init(b);
            this._contentStrategy.init(b)
        };
        b.prototype._apply =
            function(b, a, h) {
                this._containerStrategy._apply(b, a, h);
                this._contentStrategy._apply(b, a, h)
            };
        b.prototype.setContainerStrategy = function(b) {
            b instanceof a && (this._containerStrategy = b)
        };
        b.prototype.setContentStrategy = function(b) {
            b instanceof h && (this._contentStrategy = b)
        };
        return b
    }();
    c.ResolutionPolicy = d;
    var a = function() {
        function a() {}
        a.initialize = function() {
            a.EQUAL_TO_FRAME = new b
        };
        a.prototype.init = function(b) {};
        a.prototype._apply = function(b, a, h) {};
        a.prototype._setupContainer = function() {
            var b = document.body,
                a;
            b && (a = b.style) && (a.paddingTop = a.paddingTop || "0px", a.paddingRight = a.paddingRight || "0px", a.paddingBottom = a.paddingBottom || "0px", a.paddingLeft = a.paddingLeft || "0px", a.borderTop = a.borderTop || "0px", a.borderRight = a.borderRight || "0px", a.borderBottom = a.borderBottom || "0px", a.borderLeft = a.borderLeft || "0px", a.marginTop = a.marginTop || "0px", a.marginRight = a.marginRight || "0px", a.marginBottom = a.marginBottom || "0px", a.marginLeft = a.marginLeft || "0px")
        };
        return a
    }();
    c.ContainerStrategy = a;
    var b = function(b) {
        function a() {
            b.apply(this,
                arguments)
        }
        __extends(a, b);
        a.prototype._apply = function(b) {
            this._setupContainer()
        };
        return a
    }(a);
    c.EqualToFrame = b;
    var h = function() {
        function b() {}
        b.prototype.init = function(b) {};
        b.prototype._apply = function(b, a, h) {};
        return b
    }();
    c.ContentStrategy = h;
    d = function(b) {
        function a() {
            b.apply(this, arguments)
        }
        __extends(a, b);
        a.prototype._apply = function(b, a, h) {
            var c = document.getElementById(e.canvas_name),
                l = document.getElementById(e.canvas_div_name),
                d = c.height / h,
                m = window.innerHeight,
                d = m / h,
                s = a * d;
            c.width = a;
            c.height = h;
            c.style.width =
                s + "px";
            c.style.height = m + "px";
            l.style.width = s + "px";
            l.style.height = m + "px";
            b._scaleX = d;
            b._scaleY = d
        };
        return a
    }(h);
    c.FixedHeight = d;
    d = function(b) {
        function a() {
            b.apply(this, arguments)
        }
        __extends(a, b);
        a.prototype._apply = function(b, a, h) {
            h = document.getElementById(e.canvas_name);
            var c = document.getElementById(e.canvas_div_name),
                l = document.documentElement.clientWidth,
                d = document.documentElement.clientHeight,
                m = l / a;
            h.width = a;
            h.height = d / m;
            h.style.width = l + "px";
            h.style.height = d + "px";
            c.style.width = l + "px";
            c.style.height =
                d + "px";
            b._scaleX = m;
            b._scaleY = m
        };
        return a
    }(h);
    c.FixedWidth = d;
    d = function(b) {
        function a(h, c) {
            b.call(this);
            this.width = h;
            this.height = c
        }
        __extends(a, b);
        a.prototype._apply = function(b, a, h) {
            h = document.getElementById(e.canvas_name);
            var c = document.getElementById(e.canvas_div_name),
                l = this.width,
                d = this.height,
                m = l / a;
            h.width = a;
            h.height = d / m;
            h.style.width = l + "px";
            h.style.height = d + "px";
            c.style.width = l + "px";
            c.style.height = d + "px";
            b._scaleX = m;
            b._scaleY = m
        };
        return a
    }(h);
    c.FixedSize = d;
    d = function(b) {
        function a(h, c) {
            b.call(this);
            this.width = h;
            this.height = c
        }
        __extends(a, b);
        a.prototype._apply = function(b, a, h) {
            a = document.getElementById(e.canvas_name);
            a.style.width = a.width + "px";
            a.style.height = a.height + "px";
            b._scaleX = 1;
            b._scaleY = 1
        };
        return a
    }(h);
    c.NoScale = d
})(egret || (egret = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(d) {
        function a() {
            d.call(this);
            this._originalData = {};
            this._drawAreaList = []
        }
        __extends(a, d);
        a.getInstance = function() {
            null == a.instance && (a.instance = new a);
            return a.instance
        };
        a.prototype.addDrawArea = function(b) {
            this._drawAreaList.push(b)
        };
        a.prototype.clearDrawArea = function() {
            this._drawAreaList = []
        };
        a.prototype.drawImage = function(b, a, l, d, e, g, k, n, p, q) {
            k = k || 0;
            n = n || 0;
            var r = a._texture_to_render;
            if (null != r && 0 != g && 0 != e && 0 != p && 0 != q)
                if (a._worldBounds) {
                    var s = this._originalData;
                    s.sourceX =
                        l;
                    s.sourceY = d;
                    s.sourceWidth = e;
                    s.sourceHeight = g;
                    s.destX = k;
                    s.destY = n;
                    s.destWidth = p;
                    s.destHeight = q;
                    for (var z = this.getDrawAreaList(), A = 0; A < z.length; A++) {
                        var v = z[A];
                        if (!this.ignoreRender(a, v, s.destX, s.destY)) {
                            if (0 != this._drawAreaList.length)
                                if (0 != a._worldTransform.b || 0 != a._worldTransform.c) {
                                    if (a._worldBounds.x + s.destX < v.x || a._worldBounds.y + s.destY < v.y || a._worldBounds.x + a._worldBounds.width + s.destX > v.x + v.width || a._worldBounds.y + a._worldBounds.height + s.destY > v.y + v.height) {
                                        c.Logger.fatal("\u8bf7\u4e0d\u8981\u8ba9\u5e26\u6709\u65cb\u8f6c\u548c\u659c\u5207\u7684\u663e\u793a\u5bf9\u8c61\u8de8\u8fc7\u91cd\u7ed8\u533a\u57df");
                                        break
                                    }
                                } else {
                                    var B = a._worldTransform.a,
                                        C = a._worldTransform.d,
                                        t;
                                    a._worldBounds.x + s.destX < v.x && (t = (v.x - a._worldBounds.x) / B - s.destX, l += t / (p / e), e -= t / (p / e), p -= t, k += t);
                                    a._worldBounds.y + s.destY < v.y && (t = (v.y - a._worldBounds.y) / C - s.destY, d += t / (q / g), g -= t / (q / g), q -= t, n += t);
                                    a._worldBounds.x + a._worldBounds.width + s.destX > v.x + v.width && (t = (a._worldBounds.x + a._worldBounds.width - v.x - v.width) / B + s.destX, e -= t / (p / e), p -= t);
                                    a._worldBounds.y + a._worldBounds.height + s.destY > v.y + v.height && (t = (a._worldBounds.y + a._worldBounds.height -
                                        v.y - v.height) / C + s.destY, g -= t / (q / g), q -= t)
                                }
                            b.drawImage(r, l, d, e, g, k, n, p, q)
                        }
                    }
                } else b.drawImage(r, l, d, e, g, k, n, p, q)
        };
        a.prototype.ignoreRender = function(b, a, c, d) {
            var e = b._worldBounds;
            c *= b._worldTransform.a;
            d *= b._worldTransform.d;
            return e.x + e.width + c <= a.x || e.x + c >= a.x + a.width || e.y + e.height + d <= a.y || e.y + d >= a.y + a.height ? !0 : !1
        };
        a.prototype.getDrawAreaList = function() {
            var b;
            0 == this._drawAreaList.length ? (this._defaultDrawAreaList || (this._defaultDrawAreaList = [new c.Rectangle(0, 0, c.MainContext.instance.stage.stageWidth,
                c.MainContext.instance.stage.stageHeight)]), b = this._defaultDrawAreaList) : b = this._drawAreaList;
            return b
        };
        return a
    }(c.HashObject);
    c.RenderFilter = e
})(egret || (egret = {}));
(function(c) {
    var e = function() {
        function d() {}
        d.mapClass = function(a, b, h) {
            "undefined" === typeof h && (h = "");
            a = this.getKey(a) + "#" + h;
            this.mapClassDic[a] = b
        };
        d.getKey = function(a) {
            return "string" == typeof a ? a : c.getQualifiedClassName(a)
        };
        d.mapValue = function(a, b, h) {
            "undefined" === typeof h && (h = "");
            a = this.getKey(a) + "#" + h;
            this.mapValueDic[a] = b
        };
        d.hasMapRule = function(a, b) {
            "undefined" === typeof b && (b = "");
            var h = this.getKey(a) + "#" + b;
            return this.mapValueDic[h] || this.mapClassDic[h] ? !0 : !1
        };
        d.getInstance = function(a, b) {
            "undefined" ===
            typeof b && (b = "");
            var h = this.getKey(a) + "#" + b;
            if (this.mapValueDic[h]) return this.mapValueDic[h];
            var c = this.mapClassDic[h];
            if (c) return c = new c, this.mapValueDic[h] = c, delete this.mapClassDic[h], c;
            throw Error("\u8c03\u7528\u4e86\u672a\u914d\u7f6e\u7684\u6ce8\u5165\u89c4\u5219:" + h + "\u3002 \u8bf7\u5148\u5728\u9879\u76ee\u521d\u59cb\u5316\u91cc\u914d\u7f6e\u6307\u5b9a\u7684\u6ce8\u5165\u89c4\u5219\uff0c\u518d\u8c03\u7528\u5bf9\u5e94\u5355\u4f8b\u3002");
        };
        d.mapClassDic = {};
        d.mapValueDic = {};
        return d
    }();
    c.Injector =
        e
})(egret || (egret = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(d) {
        function a() {
            d.call(this);
            this._parent = null;
            this._cacheAsBitmap = !1;
            this._y = this._x = 0;
            this._scaleY = this._scaleX = 1;
            this._anchorY = this._anchorX = this._anchorOffsetY = this._anchorOffsetX = 0;
            this.visible = !0;
            this._rotation = 0;
            this._alpha = 1;
            this._skewY = this._skewX = 0;
            this._hasHeightSet = this._hasWidthSet = !1;
            this.worldAlpha = 1;
            this._worldTransform = new c.Matrix;
            this._cacheBounds = new c.Rectangle(0, 0, 0, 0)
        }
        __extends(a, d);
        Object.defineProperty(a.prototype, "parent", {
            get: function() {
                return this._parent
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype._parentChanged = function(b) {
            this._parent = b
        };
        Object.defineProperty(a.prototype, "x", {
            get: function() {
                return this._x
            },
            set: function(b) {
                c.NumberUtils.isNumber(b) && (this._x = b)
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "y", {
            get: function() {
                return this._y
            },
            set: function(b) {
                c.NumberUtils.isNumber(b) && (this._y = b)
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "scaleX", {
            get: function() {
                return this._scaleX
            },
            set: function(b) {
                c.NumberUtils.isNumber(b) &&
                    (this._scaleX = b)
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "scaleY", {
            get: function() {
                return this._scaleY
            },
            set: function(b) {
                c.NumberUtils.isNumber(b) && (this._scaleY = b)
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "anchorOffsetX", {
            get: function() {
                return this._anchorOffsetX
            },
            set: function(b) {
                c.NumberUtils.isNumber(b) && (this._anchorOffsetX = b)
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "anchorOffsetY", {
            get: function() {
                return this._anchorOffsetY
            },
            set: function(b) {
                c.NumberUtils.isNumber(b) && (this._anchorOffsetY = b)
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "anchorX", {
            get: function() {
                return this._anchorX
            },
            set: function(b) {
                c.NumberUtils.isNumber(b) && (this._anchorX = b)
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "anchorY", {
            get: function() {
                return this._anchorY
            },
            set: function(b) {
                c.NumberUtils.isNumber(b) && (this._anchorY = b)
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "rotation", {
            get: function() {
                return this._rotation
            },
            set: function(b) {
                c.NumberUtils.isNumber(b) && (this._rotation = b)
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "alpha", {
            get: function() {
                return this._alpha
            },
            set: function(b) {
                c.NumberUtils.isNumber(b) && (this._alpha = b)
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "skewX", {
            get: function() {
                return this._skewX
            },
            set: function(b) {
                c.NumberUtils.isNumber(b) && (this._skewX = b)
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "skewY", {
            get: function() {
                return this._skewY
            },
            set: function(b) {
                c.NumberUtils.isNumber(b) && (this._skewY = b)
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "touchEnabled", {
            get: function() {
                return this._touchEnabled
            },
            set: function(b) {
                this._touchEnabled = b
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "scrollRect", {
            get: function() {
                return this._scrollRect
            },
            set: function(b) {
                this._scrollRect = b
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "measuredWidth", {
            get: function() {
                return this._measureBounds().width
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "measuredHeight", {
            get: function() {
                return this._measureBounds().height
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "explicitWidth", {
            get: function() {
                return this._explicitWidth
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "explicitHeight", {
            get: function() {
                return this._explicitHeight
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "width", {
            get: function() {
                return this.getBounds(c.Rectangle.identity).width
            },
            set: function(b) {
                this._setWidth(b)
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "height", {
            get: function() {
                return this.getBounds(c.Rectangle.identity).height
            },
            set: function(b) {
                this._setHeight(b)
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype._setWidth = function(b) {
            this._explicitWidth = b;
            this._hasWidthSet = c.NumberUtils.isNumber(b)
        };
        a.prototype._setHeight = function(b) {
            this._explicitHeight = b;
            this._hasHeightSet = c.NumberUtils.isNumber(b)
        };
        a.prototype._draw = function(b) {
            if (this.visible && !this.drawCacheTexture(b)) {
                b.setAlpha(this.worldAlpha,
                    this.blendMode);
                b.setTransform(this._worldTransform);
                var a = this.mask || this._scrollRect;
                a && b.pushMask(a);
                this._render(b);
                a && b.popMask()
            }
            this.destroyCacheBounds()
        };
        a.prototype.drawCacheTexture = function(b) {
            if (this._cacheAsBitmap) {
                var a = this._texture_to_render,
                    l = a._offsetX,
                    d = a._offsetY,
                    e = a._textureWidth,
                    a = a._textureHeight;
                this._updateTransform();
                b.setAlpha(this.worldAlpha, this.blendMode);
                b.setTransform(this._worldTransform);
                var g = this.mask || this._scrollRect;
                g && b.pushMask(g);
                var k = c.MainContext.instance.rendererContext.texture_scale_factor;
                c.RenderFilter.getInstance().drawImage(b, this, 0, 0, e * k, a * k, l, d, e, a);
                g && b.popMask();
                return !0
            }
            return !1
        };
        a.prototype._updateTransform = function() {
            this._worldTransform.identity().appendMatrix(this._parent._worldTransform);
            var b = this._getOffsetPoint();
            this._worldTransform.appendTransform(this._x, this._y, this._scaleX, this._scaleY, this._rotation, this._skewX, this._skewY, b.x, b.y);
            this._scrollRect && this._worldTransform.append(1, 0, 0, 1, -this._scrollRect.x, -this._scrollRect.y);
            this.worldAlpha = this._parent.worldAlpha *
                this._alpha
        };
        a.prototype._render = function(b) {};
        a.prototype.getBounds = function(b) {
            if (0 == this._cacheBounds.x && 0 == this._cacheBounds.y && 0 == this._cacheBounds.width && 0 == this._cacheBounds.height) {
                var a = this._measureBounds(),
                    l = this._hasWidthSet ? this._explicitWidth : a.width,
                    d = this._hasHeightSet ? this._explicitHeight : a.height,
                    e = a.x,
                    a = a.y,
                    g, k;
                0 != this._anchorX || 0 != this._anchorY ? (g = l * this._anchorX, k = d * this._anchorY) : (g = this._anchorOffsetX, k = this._anchorOffsetY);
                this._cacheBounds.initialize(e - g, a - k, l, d)
            }
            l = this._cacheBounds;
            b || (b = new c.Rectangle);
            return b.initialize(l.x, l.y, l.width, l.height)
        };
        a.prototype.destroyCacheBounds = function() {
            this._cacheBounds.x = 0;
            this._cacheBounds.y = 0;
            this._cacheBounds.width = 0;
            this._cacheBounds.height = 0
        };
        a.prototype._getConcatenatedMatrix = function() {
            for (var b = a.identityMatrixForGetConcatenated.identity(), h = this; null != h;) {
                if (0 != h._anchorX || 0 != h._anchorY) {
                    var l = h._getSize(c.Rectangle.identity);
                    b.prependTransform(h._x, h._y, h._scaleX, h._scaleY, h._rotation, h._skewX, h._skewY, l.width * h._anchorX, l.height *
                        h._anchorY)
                } else b.prependTransform(h._x, h._y, h._scaleX, h._scaleY, h._rotation, h._skewX, h._skewY, h._anchorOffsetX, h._anchorOffsetY);
                h = h._parent
            }
            return b
        };
        a.prototype.localToGlobal = function(b, a, l) {
            "undefined" === typeof b && (b = 0);
            "undefined" === typeof a && (a = 0);
            var d = this._getConcatenatedMatrix();
            d.append(1, 0, 0, 1, b, a);
            l || (l = new c.Point);
            l.x = d.tx;
            l.y = d.ty;
            return l
        };
        a.prototype.globalToLocal = function(b, a, l) {
            "undefined" === typeof b && (b = 0);
            "undefined" === typeof a && (a = 0);
            var d = this._getConcatenatedMatrix();
            d.invert();
            d.append(1, 0, 0, 1, b, a);
            l || (l = new c.Point);
            l.x = d.tx;
            l.y = d.ty;
            return l
        };
        a.prototype.hitTest = function(b, a, l) {
            "undefined" === typeof l && (l = !1);
            if (!this.visible || !l && !this._touchEnabled) return null;
            l = this._getSize(c.Rectangle.identity);
            return 0 < b && b < l.width && 0 < a && a < l.height ? this.mask || this._scrollRect ? this._scrollRect && b < this._scrollRect.width && a < this._scrollRect.height || this.mask && this.mask.x < b && b < this.mask.x + this.mask.width && this.mask.y < a && a < this.mask.y + this.mask.height ? this : null : this : null
        };
        a.prototype.hitTestPoint =
            function(b, a, l) {
                b = this.globalToLocal(b, a);
                return l ? (this._hitTestPointTexture || (this._hitTestPointTexture = new c.RenderTexture), l = this._hitTestPointTexture, l.drawToTexture(this), 0 != l.getPixel32(b.x - this._hitTestPointTexture._offsetX, b.y - this._hitTestPointTexture._offsetY)[3] ? !0 : !1) : !!this.hitTest(b.x, b.y, !0)
            };
        a.prototype._getMatrix = function() {
            var b = c.Matrix.identity.identity(),
                a = this._getOffsetPoint();
            b.appendTransform(this._x, this._y, this._scaleX, this._scaleY, this._rotation, this._skewX, this._skewY,
                a.x, a.y);
            return b
        };
        a.prototype._getSize = function(b) {
            return this._hasHeightSet && this._hasWidthSet ? b.initialize(NaN, NaN, this._explicitWidth, this._explicitHeight) : this._measureSize(c.Rectangle.identity)
        };
        a.prototype._measureSize = function(b) {
            return this._measureBounds()
        };
        a.prototype._measureBounds = function() {
            return c.Rectangle.identity.initialize(0, 0, 0, 0)
        };
        a.prototype._getOffsetPoint = function() {
            var b = this._anchorOffsetX,
                a = this._anchorOffsetY;
            if (0 != this._anchorX || 0 != this._anchorY) a = this._getSize(c.Rectangle.identity),
                b = this._anchorX * a.width, a = this._anchorY * a.height;
            var l = c.Point.identity;
            l.x = b;
            l.y = a;
            return l
        };
        a.prototype._onAddToStage = function() {
            this._stage = c.MainContext.instance.stage;
            c.DisplayObjectContainer.__EVENT__ADD_TO_STAGE_LIST.push(this)
        };
        a.prototype._onRemoveFromStage = function() {
            this._stage = null;
            c.DisplayObjectContainer.__EVENT__REMOVE_FROM_STAGE_LIST.push(this)
        };
        Object.defineProperty(a.prototype, "stage", {
            get: function() {
                return this._stage
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype.addEventListener =
            function(b, h, l, e, f) {
                "undefined" === typeof e && (e = !1);
                "undefined" === typeof f && (f = 0);
                d.prototype.addEventListener.call(this, b, h, l, e, f);
                ((e = b == c.Event.ENTER_FRAME) || b == c.Event.RENDER) && this._insertEventBin(e ? a._enterFrameCallBackList : a._renderCallBackList, h, l, f)
            };
        a.prototype.removeEventListener = function(b, h, l, e) {
            "undefined" === typeof e && (e = !1);
            d.prototype.removeEventListener.call(this, b, h, l, e);
            ((e = b == c.Event.ENTER_FRAME) || b == c.Event.RENDER) && this._removeEventBin(e ? a._enterFrameCallBackList : a._renderCallBackList,
                h, l)
        };
        a.prototype.dispatchEvent = function(b) {
            if (!b._bubbles) return d.prototype.dispatchEvent.call(this, b);
            for (var a = [], c = this; c;) a.unshift(c), c = c.parent;
            for (var e = a.length, c = e - 1, e = e - 2; 0 <= e; e--) a.push(a[e]);
            b._reset();
            this._dispatchPropagationEvent(b, a, c);
            return !b.isDefaultPrevented()
        };
        a.prototype._dispatchPropagationEvent = function(b, a, c) {
            for (var d = a.length, e = 0; e < d; e++) {
                var g = a[e];
                b._setCurrentTarget(g);
                b._target = this;
                b._eventPhase = e < c ? 1 : e == c ? 2 : 3;
                g._notifyListener(b);
                if (b._isPropagationStopped || b._isPropagationImmediateStopped) break
            }
        };
        a.prototype.willTrigger = function(b) {
            for (var a = this; a;) {
                if (a.hasEventListener(b)) return !0;
                a = a._parent
            }
            return !1
        };
        Object.defineProperty(a.prototype, "cacheAsBitmap", {
            get: function() {
                return this._cacheAsBitmap
            },
            set: function(b) {
                (this._cacheAsBitmap = b) ? (this.renderTexture || (this.renderTexture = new c.RenderTexture), this.renderTexture.drawToTexture(this), this._texture_to_render = this.renderTexture) : this._texture_to_render = null
            },
            enumerable: !0,
            configurable: !0
        });
        a.getTransformBounds = function(b, a) {
            var c, d, e = b.width,
                g = b.height,
                k = e * a.a,
                e = e * a.b,
                n = g * a.c,
                g = g * a.d,
                p = a.tx,
                q = a.ty,
                r = p,
                s = p,
                z = q,
                A = q;
            (c = k + p) < r ? r = c : c > s && (s = c);
            (c = k + n + p) < r ? r = c : c > s && (s = c);
            (c = n + p) < r ? r = c : c > s && (s = c);
            (d = e + q) < z ? z = d : d > A && (A = d);
            (d = e + g + q) < z ? z = d : d > A && (A = d);
            (d = g + q) < z ? z = d : d > A && (A = d);
            return b.initialize(r, z, s - r, A - z)
        };
        a.identityMatrixForGetConcatenated = new c.Matrix;
        a._enterFrameCallBackList = [];
        a._renderCallBackList = [];
        return a
    }(c.EventDispatcher);
    c.DisplayObject = e
})(egret || (egret = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(d) {
        function a() {
            d.call(this);
            this._touchChildren = !0;
            this._children = []
        }
        __extends(a, d);
        Object.defineProperty(a.prototype, "touchChildren", {
            get: function() {
                return this._touchChildren
            },
            set: function(b) {
                this._touchChildren = b
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "numChildren", {
            get: function() {
                return this._children.length
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype.setChildIndex = function(b, a) {
            this.doSetChildIndex(b, a)
        };
        a.prototype.doSetChildIndex = function(b,
            a) {
            var d = this._children.indexOf(b);
            0 > d && c.Logger.fatal("child\u4e0d\u5728\u5f53\u524d\u5bb9\u5668\u5185");
            this._children.splice(d, 1);
            0 > a || this._children.length <= a ? this._children.push(b) : this._children.splice(a, 0, b)
        };
        a.prototype.addChild = function(b) {
            var a = this.numChildren;
            b._parent == this && a--;
            return this._doAddChild(b, a)
        };
        a.prototype.addChildAt = function(b, a) {
            return this._doAddChild(b, a)
        };
        a.prototype._doAddChild = function(b, h, d) {
            "undefined" === typeof d && (d = !0);
            if (b == this) return b;
            if (0 > h || h > this._children.length) return c.Logger.fatal("\u63d0\u4f9b\u7684\u7d22\u5f15\u8d85\u51fa\u8303\u56f4"),
                b;
            var e = b.parent;
            if (e == this) return this.doSetChildIndex(b, h), b;
            e && e.removeChild(b);
            this._children.splice(h, 0, b);
            b._parentChanged(this);
            d && b.dispatchEventWith(c.Event.ADDED, !0);
            if (this._stage)
                for (b._onAddToStage(), h = a.__EVENT__ADD_TO_STAGE_LIST; 0 < h.length;) h.shift().dispatchEventWith(c.Event.ADDED_TO_STAGE);
            return b
        };
        a.prototype.removeChild = function(b) {
            b = this._children.indexOf(b);
            if (0 <= b) return this._doRemoveChild(b);
            c.Logger.fatal("child\u672a\u88abaddChild\u5230\u8be5parent");
            return null
        };
        a.prototype.removeChildAt =
            function(b) {
                if (0 <= b && b < this._children.length) return this._doRemoveChild(b);
                c.Logger.fatal("\u63d0\u4f9b\u7684\u7d22\u5f15\u8d85\u51fa\u8303\u56f4");
                return null
            };
        a.prototype._doRemoveChild = function(b, h) {
            "undefined" === typeof h && (h = !0);
            var d = this._children,
                e = d[b];
            h && e.dispatchEventWith(c.Event.REMOVED, !0);
            if (this._stage) {
                e._onRemoveFromStage();
                for (var f = a.__EVENT__REMOVE_FROM_STAGE_LIST; 0 < f.length;) f.shift().dispatchEventWith(c.Event.REMOVED_FROM_STAGE)
            }
            e._parentChanged(null);
            d.splice(b, 1);
            return e
        };
        a.prototype.getChildAt = function(b) {
            if (0 <= b && b < this._children.length) return this._children[b];
            c.Logger.fatal("\u63d0\u4f9b\u7684\u7d22\u5f15\u8d85\u51fa\u8303\u56f4");
            return null
        };
        a.prototype.contains = function(b) {
            for (; b;) {
                if (b == this) return !0;
                b = b._parent
            }
            return !1
        };
        a.prototype.swapChildrenAt = function(b, a) {
            0 <= b && b < this._children.length && 0 <= a && a < this._children.length ? this._swapChildrenAt(b, a) : c.Logger.fatal("\u63d0\u4f9b\u7684\u7d22\u5f15\u8d85\u51fa\u8303\u56f4")
        };
        a.prototype.swapChildren = function(b,
            a) {
            var d = this._children.indexOf(b),
                e = this._children.indexOf(a); - 1 == d || -1 == e ? c.Logger.fatal("child\u672a\u88abaddChild\u5230\u8be5parent") : this._swapChildrenAt(d, e)
        };
        a.prototype._swapChildrenAt = function(b, a) {
            if (b != a) {
                var c = this._children,
                    d = c[b];
                c[b] = c[a];
                c[a] = d
            }
        };
        a.prototype.getChildIndex = function(b) {
            return this._children.indexOf(b)
        };
        a.prototype.removeChildren = function() {
            for (var b = this._children.length - 1; 0 <= b; b--) this._doRemoveChild(b)
        };
        a.prototype._updateTransform = function() {
            if (this.visible) {
                d.prototype._updateTransform.call(this);
                for (var b = 0, a = this._children.length; b < a; b++) this._children[b]._updateTransform()
            }
        };
        a.prototype._render = function(b) {
            for (var a = 0, c = this._children.length; a < c; a++) this._children[a]._draw(b)
        };
        a.prototype._measureBounds = function() {
            for (var b = 0, a = 0, d = 0, e = 0, f = this._children.length, g = 0; g < f; g++) {
                var k = this._children[g],
                    n;
                if (k.visible && (n = c.DisplayObject.getTransformBounds(k._getSize(c.Rectangle.identity), k._getMatrix()))) {
                    var k = n.x,
                        p = n.y,
                        q = n.width + n.x,
                        r = n.height + n.y;
                    if (k < b || 0 == g) b = k;
                    if (q > a || 0 == g) a = q;
                    if (p < d ||
                        0 == g) d = p;
                    if (r > e || 0 == g) e = r
                }
            }
            return c.Rectangle.identity.initialize(b, d, a - b, e - d)
        };
        a.prototype.hitTest = function(b, a, l) {
            "undefined" === typeof l && (l = !1);
            var e;
            if (!this.visible) return null;
            if (this._scrollRect) {
                if (b > this._scrollRect.width || a > this._scrollRect.height) return null
            } else if (this.mask && (this.mask.x > b || b > this.mask.x + this.mask.width || this.mask.y > a || a > this.mask.y + this.mask.height)) return null;
            for (var f = this._children, g = this._touchChildren, k = f.length - 1; 0 <= k; k--) {
                var n = f[k],
                    p = n,
                    q = p._getOffsetPoint(),
                    r = p._x,
                    s = p._y;
                this._scrollRect && (r -= this._scrollRect.x, s -= this._scrollRect.y);
                p = c.Matrix.identity.identity().prependTransform(r, s, p._scaleX, p._scaleY, p._rotation, 0, 0, q.x, q.y);
                p.invert();
                p = c.Matrix.transformCoords(p, b, a);
                if (n = n.hitTest(p.x, p.y, !0)) {
                    if (n._touchEnabled && g) return n;
                    if (this._touchEnabled) return this;
                    null == e && (e = n)
                }
            }
            return e || !this._texture_to_render && !this._graphics ? e : d.prototype.hitTest.call(this, b, a, l)
        };
        a.prototype._onAddToStage = function() {
            d.prototype._onAddToStage.call(this);
            for (var b =
                this.numChildren, a = 0; a < b; a++) this._children[a]._onAddToStage()
        };
        a.prototype._onRemoveFromStage = function() {
            d.prototype._onRemoveFromStage.call(this);
            for (var b = this.numChildren, a = 0; a < b; a++) this._children[a]._onRemoveFromStage()
        };
        a.prototype.getChildByName = function(b) {
            for (var a = this._children, c = this.numChildren, d, e = 0; e < c; e++)
                if (d = a[e], d.name == b) return d;
            return null
        };
        a.__EVENT__ADD_TO_STAGE_LIST = [];
        a.__EVENT__REMOVE_FROM_STAGE_LIST = [];
        return a
    }(c.DisplayObject);
    c.DisplayObjectContainer = e
})(egret || (egret = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(d) {
        function a(b, a) {
            d.call(this);
            this.touchEnabled = !0;
            this._stage = this;
            this._stageWidth = b;
            this._stageHeight = a
        }
        __extends(a, d);
        a.prototype.invalidate = function() {
            a._invalidateRenderFlag = !0
        };
        a.prototype._setStageSize = function(b, a) {
            if (this._stageWidth != b || this._stageHeight != a) this._stageWidth = b, this._stageHeight = a, this.dispatchEventWith(c.Event.RESIZE)
        };
        Object.defineProperty(a.prototype, "stageWidth", {
            get: function() {
                return this._stageWidth
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype,
            "stageHeight", {
                get: function() {
                    return this._stageHeight
                },
                enumerable: !0,
                configurable: !0
            });
        a.prototype.hitTest = function(b, a) {
            if (!this.touchEnabled) return null;
            var d;
            if (!this.visible) return this;
            for (var e = this._children, f = e.length - 1; 0 <= f; f--) {
                var g = d = e[f],
                    k = g._getOffsetPoint(),
                    g = c.Matrix.identity.identity().prependTransform(g.x, g.y, g.scaleX, g.scaleY, g.rotation, 0, 0, k.x, k.y);
                g.invert();
                g = c.Matrix.transformCoords(g, b, a);
                if ((d = d.hitTest(g.x, g.y, !0)) && d.touchEnabled) return d
            }
            return this
        };
        a.prototype.getBounds =
            function(b) {
                b || (b = new c.Rectangle);
                return b.initialize(0, 0, this._stageWidth, this._stageHeight)
            };
        a.prototype._updateTransform = function() {
            for (var b = 0, a = this._children.length; b < a; b++) this._children[b]._updateTransform()
        };
        a._invalidateRenderFlag = !1;
        return a
    }(c.DisplayObjectContainer);
    c.Stage = e
})(egret || (egret = {}));
(function(c) {
    var e = function() {
        function c() {}
        c.REPEAT = "repeat";
        c.SCALE = "scale";
        return c
    }();
    c.BitmapFillMode = e
})(egret || (egret = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(d) {
        function a(b) {
            d.call(this);
            this.debug = !1;
            this.debugColor = 16711680;
            this.fillMode = "scale";
            b && (this.texture = b)
        }
        __extends(a, d);
        a.prototype._render = function(b) {
            var c = this.texture;
            c ? (this._texture_to_render = c, a._drawBitmap(b, this._hasWidthSet ? this._explicitWidth : c._textureWidth, this._hasHeightSet ? this._explicitHeight : c._textureHeight, this)) : this._texture_to_render = null
        };
        a._drawBitmap = function(b, h, d, e) {
            var f = e._texture_to_render;
            if (f) {
                var g = f._textureWidth,
                    k = f._textureHeight;
                if ("scale" == e.fillMode) {
                    var n = e.scale9Grid;
                    if (n && g - n.width < h && k - n.height < d) a.drawScale9GridImage(b, e, e.scale9Grid, h, d);
                    else {
                        var n = f._offsetX,
                            p = f._offsetY,
                            q = f._bitmapWidth || g,
                            r = f._bitmapHeight || k;
                        e._hasWidthSet ? (h /= g, n = Math.round(n * h), h = Math.round(q * h)) : h = q;
                        e._hasHeightSet ? (d /= k, p = Math.round(p * d), d = Math.round(r * d)) : d = r;
                        c.RenderFilter.getInstance().drawImage(b, e, f._bitmapX, f._bitmapY, q, r, n, p, h, d)
                    }
                } else a.drawRepeatImage(b, e, h, d)
            }
        };
        a.drawRepeatImage = function(b, a, d, e) {
            var f = a._texture_to_render;
            if (f)
                for (var g =
                    f._textureWidth, k = f._textureHeight, n = f._bitmapX, p = f._bitmapY, q = f._bitmapWidth || g, r = f._bitmapHeight || k, s = f._offsetX, f = f._offsetY, z = c.RenderFilter.getInstance(); s < d; s += g)
                    for (var A = f; A < e; A += k) {
                        var v = Math.min(q, d - s),
                            B = Math.min(r, e - A);
                        z.drawImage(b, a, n, p, q, r, s, A, v, B)
                    }
        };
        a.drawScale9GridImage = function(b, a, d, e, f) {
            var g = a._texture_to_render;
            if (g && d) {
                var k = c.RenderFilter.getInstance(),
                    n = g._textureWidth,
                    p = g._textureHeight,
                    q = g._bitmapX,
                    r = g._bitmapY,
                    s = g._bitmapWidth || n,
                    z = g._bitmapHeight || p,
                    A = g._offsetX,
                    g = g._offsetY;
                d = c.Rectangle.identity.initialize(d.x - Math.round(A), d.y - Math.round(A), d.width, d.height);
                A = Math.round(A);
                g = Math.round(g);
                e -= n - s;
                f -= p - z;
                d.y == d.bottom && (d.bottom < z ? d.bottom++ : d.y--);
                d.x == d.right && (d.right < s ? d.right++ : d.x--);
                var n = q + d.x,
                    p = q + d.right,
                    v = s - d.right,
                    B = r + d.y,
                    C = r + d.bottom,
                    t = z - d.bottom,
                    u = A + d.x,
                    D = g + d.y,
                    z = f - (z - d.bottom),
                    s = e - (s - d.right);
                k.drawImage(b, a, q, r, d.x, d.y, A, g, d.x, d.y);
                k.drawImage(b, a, n, r, d.width, d.y, u, g, s - d.x, d.y);
                k.drawImage(b, a, p, r, v, d.y, A + s, g, e - s, d.y);
                k.drawImage(b, a, q, B, d.x, d.height,
                    A, D, d.x, z - d.y);
                k.drawImage(b, a, n, B, d.width, d.height, u, D, s - d.x, z - d.y);
                k.drawImage(b, a, p, B, v, d.height, A + s, D, e - s, z - d.y);
                k.drawImage(b, a, q, C, d.x, t, A, g + z, d.x, f - z);
                k.drawImage(b, a, n, C, d.width, t, u, g + z, s - d.x, f - z);
                k.drawImage(b, a, p, C, v, t, A + s, g + z, e - s, f - z)
            }
        };
        a.prototype._measureBounds = function() {
            var b = this.texture;
            return b ? c.Rectangle.identity.initialize(b._offsetX, b._offsetY, b._textureWidth, b._textureHeight) : d.prototype._measureBounds.call(this)
        };
        a.debug = !1;
        return a
    }(c.DisplayObject);
    c.Bitmap = e
})(egret || (egret = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(d) {
        function a() {
            d.call(this);
            this.text = "";
            this._bitmapPool = []
        }
        __extends(a, d);
        a.prototype._updateTransform = function() {
            this.visible && (this._renderText(), d.prototype._updateTransform.call(this))
        };
        a.prototype._renderText = function(b) {
            "undefined" === typeof b && (b = !1);
            var a = c.Rectangle.identity.initialize(0, 0, 0, 0);
            b || this.removeChildren();
            for (var d = 0, e = this.text.length; d < e; d++) {
                var f = this.text.charAt(d),
                    f = this.spriteSheet.getTexture(f),
                    g = f._offsetX,
                    k = f._offsetY,
                    n = f._textureWidth;
                if (!b) {
                    var p = this._bitmapPool[d];
                    p || (p = new c.Bitmap, this._bitmapPool.push(p));
                    p.texture = f;
                    this.addChild(p);
                    p.x = a.width
                }
                a.width += n + g;
                k + f._textureHeight > a.height && (a.height = k + f._textureHeight)
            }
            return a
        };
        a.prototype._measureBounds = function() {
            return this._renderText(!0)
        };
        return a
    }(c.DisplayObjectContainer);
    c.BitmapText = e
})(egret || (egret = {}));
(function(c) {
    var e = function() {
        function c() {
            this.commandQueue = []
        }
        c.prototype.beginFill = function(a, b) {};
        c.prototype._setStyle = function(a) {};
        c.prototype.drawRect = function(a, b, c, d) {};
        c.prototype.drawCircle = function(a, b, c) {};
        c.prototype.lineStyle = function(a, b, c, d, e, f, g, k) {};
        c.prototype.lineTo = function(a, b) {};
        c.prototype.curveTo = function(a, b, c, d) {};
        c.prototype.moveTo = function(a, b) {};
        c.prototype.clear = function() {};
        c.prototype.endFill = function() {};
        c.prototype._draw = function(a) {};
        return c
    }();
    c.Graphics = e;
    (function() {
        return function(c, a, b) {
            this.method = c;
            this.thisObject = a;
            this.args = b
        }
    })()
})(egret || (egret = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(d) {
        function a() {
            d.call(this)
        }
        __extends(a, d);
        Object.defineProperty(a.prototype, "graphics", {
            get: function() {
                this._graphics || (this._graphics = new c.Graphics);
                return this._graphics
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype._render = function(b) {
            this._graphics && this._graphics._draw(b)
        };
        return a
    }(c.DisplayObject);
    c.Shape = e
})(egret || (egret = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(d) {
        function a() {
            d.call(this)
        }
        __extends(a, d);
        Object.defineProperty(a.prototype, "graphics", {
            get: function() {
                this._graphics || (this._graphics = new c.Graphics);
                return this._graphics
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype._render = function(b) {
            this._graphics && this._graphics._draw(b);
            d.prototype._render.call(this, b)
        };
        return a
    }(c.DisplayObjectContainer);
    c.Sprite = e
})(egret || (egret = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(d) {
        function a() {
            d.call(this);
            this._textDirty = !0;
            this._fontFamily = "Arial";
            this._size = 30;
            this._textColorString = "#FFFFFF";
            this._textColor = 16777215;
            this._strokeColorString = "#000000";
            this._stroke = this._strokeColor = 0;
            this._textAlign = "left";
            this._verticalAlign = "top";
            this._numLines = this._lineSpacing = 0;
            this.measuredWidths = []
        }
        __extends(a, d);
        Object.defineProperty(a.prototype, "text", {
            get: function() {
                return this._text
            },
            set: function(b) {
                this._text != b && (this._textDirty = !0, this._text = b)
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "fontFamily", {
            get: function() {
                return this._fontFamily
            },
            set: function(b) {
                this._fontFamily != b && (this._textDirty = !0, this._fontFamily = b)
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "size", {
            get: function() {
                return this._size
            },
            set: function(b) {
                this._size != b && (this._textDirty = !0, this._size = b)
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "italic", {
            get: function() {
                return this._italic
            },
            set: function(b) {
                this._italic !=
                    b && (this._textDirty = !0, this._italic = b)
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "bold", {
            get: function() {
                return this._bold
            },
            set: function(b) {
                this._bold != b && (this._textDirty = !0, this._bold = b)
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "textColor", {
            get: function() {
                return this._textColor
            },
            set: function(b) {
                this._textColor != b && (this._textDirty = !0, this._textColor = b, this._textColorString = c.toColorString(b))
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype,
            "strokeColor", {
                get: function() {
                    return this._strokeColor
                },
                set: function(b) {
                    this._strokeColor != b && (this._textDirty = !0, this._strokeColor = b, this._strokeColorString = c.toColorString(b))
                },
                enumerable: !0,
                configurable: !0
            });
        Object.defineProperty(a.prototype, "stroke", {
            get: function() {
                return this._stroke
            },
            set: function(b) {
                this._stroke != b && (this._textDirty = !0, this._stroke = b)
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "textAlign", {
            get: function() {
                return this._textAlign
            },
            set: function(b) {
                this._textAlign !=
                    b && (this._textDirty = !0, this._textAlign = b)
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "verticalAlign", {
            get: function() {
                return this._verticalAlign
            },
            set: function(b) {
                this._verticalAlign != b && (this._textDirty = !0, this._verticalAlign = b)
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "lineSpacing", {
            get: function() {
                return this._lineSpacing
            },
            set: function(b) {
                this._lineSpacing != b && (this._textDirty = !0, this._lineSpacing = b)
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype,
            "numLines", {
                get: function() {
                    return this._numLines
                },
                enumerable: !0,
                configurable: !0
            });
        a.prototype._render = function(b) {
            this.drawText(b, !1);
            this._textDirty = !1
        };
        a.prototype._measureBounds = function() {
            return this.drawText(c.MainContext.instance.rendererContext, !0)
        };
        a.prototype.drawText = function(b, a) {
            var d = this.getTextLines(b);
            if (!d) return c.Rectangle.identity.initialize(0, 0, 0, 0);
            var e = d.length,
                f = 0.5 * this._size,
                g = this._size + this._lineSpacing,
                k = e * g - this._lineSpacing;
            this._textHeight = k;
            var n = this._explicitHeight;
            if (this._hasHeightSet && k < n) {
                var p = 0;
                this._verticalAlign == c.VerticalAlign.MIDDLE ? p = 0.5 : this._verticalAlign == c.VerticalAlign.BOTTOM && (p = 1);
                f += p * (n - k)
            } else n = Number.POSITIVE_INFINITY;
            var p = f = Math.round(f),
                q = 0;
            this._textAlign == c.HorizontalAlign.CENTER ? q = 0.5 : this._textAlign == c.HorizontalAlign.RIGHT && (q = 1);
            var r = this.measuredWidths,
                s;
            s = this._hasWidthSet ? this._explicitWidth : this._textWidth;
            for (var z = Number.POSITIVE_INFINITY, A = 0; A < e; A++) {
                var v = d[A],
                    B = Math.round((s - r[A]) * q);
                B < z && (z = B);
                !a && f < n && b.drawText(this,
                    v, B, f, s);
                f += g
            }
            return c.Rectangle.identity.initialize(z, p, s, k)
        };
        a.prototype.getTextLines = function(b) {
            var a = this.text ? this.text.toString() : "";
            if (!a) return null;
            var c = this.measuredWidths;
            c.length = 0;
            b.setupFont(this);
            var a = a.split(/(?:\r\n|\r|\n)/),
                d = a.length,
                e = 0;
            if (this._hasWidthSet)
                for (var g = this._explicitWidth, k = 0; k < d; k++) {
                    var n = a[k],
                        p = b.measureText(n);
                    if (p > g) {
                        for (var q = "", r = 0, s = n.length, z = 0; z < s; z++) {
                            var A = n.charAt(z),
                                p = b.measureText(A);
                            r + p > g && (0 == r ? (a.splice(k, 0, A), c[k] = p, e < p && (e = p), p = 0, A = "") : (a.splice(k,
                                0, q), c[k] = r, e < r && (e = r), q = "", r = 0), k++, d++);
                            r += p;
                            q += A
                        }
                        a[k] = q;
                        c[k] = r
                    } else c[k] = p, e < p && (e = p)
                } else
                    for (k = 0; k < d; k++) n = a[k], p = b.measureText(n), c[k] = p, e < p && (e = p);
            this._textWidth = e;
            return a
        };
        return a
    }(c.DisplayObject);
    c.TextField = e
})(egret || (egret = {}));
(function(c) {
    var e = function() {
        function c() {}
        c.DYNAMIC = "dynamic";
        c.INPUT = "input";
        return c
    }();
    c.TextFieldType = e
})(egret || (egret = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(d) {
        function a(b) {
            d.call(this);
            var a = b.bitmapData;
            this.bitmapData = a;
            this._textureMap = {};
            this._sourceWidth = a.width;
            this._sourceHeight = a.height;
            this._bitmapX = b._bitmapX;
            this._bitmapY = b._bitmapY
        }
        __extends(a, d);
        a.prototype.getTexture = function(b) {
            return this._textureMap[b]
        };
        a.prototype.createTexture = function(b, a, d, e, f, g, k, n, p) {
            "undefined" === typeof g && (g = 0);
            "undefined" === typeof k && (k = 0);
            "undefined" === typeof n && (n = g + e);
            "undefined" === typeof p && (p = k + f);
            var q = new c.Texture;
            q._bitmapData =
                this.bitmapData;
            q._bitmapX = this._bitmapX + a;
            q._bitmapY = this._bitmapY + d;
            q._bitmapWidth = e;
            q._bitmapHeight = f;
            q._offsetX = g;
            q._offsetY = k;
            q._textureWidth = n;
            q._textureHeight = p;
            q._sourceWidth = this._sourceWidth;
            q._sourceHeight = this._sourceHeight;
            return this._textureMap[b] = q
        };
        return a
    }(c.HashObject);
    c.SpriteSheet = e
})(egret || (egret = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(d) {
        function a() {
            d.apply(this, arguments);
            this._placeholderText = "";
            this._edFontSize = 14;
            this._textColor = 16711680;
            this._placeholderFontSize = 14;
            this._placeholderColor = 16776960;
            this._preY = this._preX = 0
        }
        __extends(a, d);
        a.prototype._onAddToStage = function() {
            d.prototype._onAddToStage.call(this);
            var b = this.localToGlobal(),
                a = new c.StageText;
            a._open(b.x, b.y, this._explicitWidth, this._explicitHeight);
            this.addEventListener(c.TouchEvent.TOUCH_BEGIN, this.onMouseDownHandler, this);
            this.stageText =
                a
        };
        a.prototype.setText = function(b) {
            this.stageText._setText(b)
        };
        a.prototype.getText = function() {
            return this.stageText._getText()
        };
        a.prototype.setTextType = function(b) {
            this.stageText._setTextType(b)
        };
        a.prototype.getTextType = function() {
            return this.stageText._getTextType()
        };
        a.prototype.onMouseDownHandler = function(b) {};
        a.prototype._onRemoveFromStage = function() {
            this.stageText._remove()
        };
        a.prototype._measureBounds = function() {
            return c.Rectangle.identity
        };
        a.prototype.hitTest = function(b, a, c) {
            return null
        };
        return a
    }(c.DisplayObject);
    c.TextInput = e;
    e = function() {
        function c() {}
        c.prototype.editBoxEditingDidBegin = function(a) {};
        c.prototype.editBoxEditingDidEnd = function(a) {};
        c.prototype.editBoxTextChanged = function(a, b) {};
        c.prototype.editBoxReturn = function(a) {};
        return c
    }();
    c.TextInputDegelete = e
})(egret || (egret = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(c) {
        function a(b, a) {
            c.call(this, b);
            this.charList = this.parseConfig(a)
        }
        __extends(a, c);
        a.prototype.getTexture = function(b) {
            var a = this._textureMap[b];
            if (!a) {
                a = this.charList[b];
                if (!a) return null;
                a = this.createTexture(b, a.x, a.y, a.width, a.height, a.offsetX, a.offsetY);
                this._textureMap[b] = a
            }
            return a
        };
        a.prototype.parseConfig = function(b) {
            b = b.split("\r\n").join("\n");
            b = b.split("\n");
            for (var a = this.getConfigByKey(b[3], "count"), c = {}, d = 4; d < 4 + a; d++) {
                var e = b[d],
                    g = String.fromCharCode(this.getConfigByKey(e,
                        "id")),
                    k = {};
                c[g] = k;
                k.x = this.getConfigByKey(e, "x");
                k.y = this.getConfigByKey(e, "y");
                k.width = this.getConfigByKey(e, "width");
                k.height = this.getConfigByKey(e, "height");
                k.offsetX = this.getConfigByKey(e, "xoffset");
                k.offsetY = this.getConfigByKey(e, "yoffset")
            }
            return c
        };
        a.prototype.getConfigByKey = function(b, a) {
            for (var c = b.split(" "), d = 0, e = c.length; d < e; d++) {
                var g = c[d];
                if (a == g.substring(0, a.length)) return c = g.substring(a.length + 1), parseInt(c)
            }
            return 0
        };
        return a
    }(c.SpriteSheet);
    c.BitmapTextSpriteSheet = e
})(egret ||
    (egret = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(a) {
        function b(b, l) {
            a.call(this);
            this.frameRate = 60;
            null != l && l instanceof c.Texture ? (c.Logger.warning("MovieClip#constructor\u63a5\u53e3\u53c2\u6570\u5df2\u7ecf\u53d8\u66f4\uff0c\u8bf7\u5c3d\u5feb\u8c03\u6574\u7528\u6cd5\u4e3a new MovieClip(new DefaultMovieClipDelegate(data,texture))"), this.delegate = new d(b, l)) : this.delegate = b;
            this.delegate.setMovieClip(this)
        }
        __extends(b, a);
        b.prototype.gotoAndPlay = function(b) {
            this.delegate.gotoAndPlay(b)
        };
        b.prototype.gotoAndStop = function(b) {
            this.delegate.gotoAndStop(b)
        };
        b.prototype.stop = function() {
            this.delegate.stop()
        };
        b.prototype.dispose = function() {
            this.delegate.dispose()
        };
        b.prototype.release = function() {
            c.Logger.warning("MovieClip#release\u65b9\u6cd5\u5373\u5c06\u5e9f\u5f03");
            this.dispose()
        };
        b.prototype.getCurrentFrameIndex = function() {
            c.Logger.warning("MovieClip#getCurrentFrameIndex\u65b9\u6cd5\u5373\u5c06\u5e9f\u5f03");
            return this.delegate._currentFrameIndex
        };
        b.prototype.getTotalFrame = function() {
            c.Logger.warning("MovieClip#getTotalFrame\u65b9\u6cd5\u5373\u5c06\u5e9f\u5f03");
            return this.delegate._totalFrame
        };
        b.prototype.setInterval = function(b) {
            c.Logger.warning("MovieClip#setInterval\u65b9\u6cd5\u5373\u5c06\u5e9f\u5f03,\u8bf7\u4f7f\u7528MovieClip#frameRate\u4ee3\u66ff");
            this.frameRate = 60 / b
        };
        b.prototype.getIsPlaying = function() {
            c.Logger.warning("MovieClip#getIsPlaying\u65b9\u6cd5\u5373\u5c06\u5e9f\u5f03");
            return this.delegate.isPlaying
        };
        return b
    }(c.DisplayObjectContainer);
    c.MovieClip = e;
    var d = function() {
        function a(b, a) {
            this.data = b;
            this._currentFrameIndex = this._passTime = this._totalFrame =
                0;
            this._isPlaying = !1;
            this._frameData = b;
            this._spriteSheet = new c.SpriteSheet(a)
        }
        a.prototype.setMovieClip = function(b) {
            this.movieClip = b;
            this.bitmap = new c.Bitmap;
            this.movieClip.addChild(this.bitmap)
        };
        a.prototype.gotoAndPlay = function(b) {
            this.checkHasFrame(b);
            this._isPlaying = !0;
            this._currentFrameIndex = 0;
            this._currentFrameName = b;
            this.playNextFrame();
            this._passTime = 0;
            c.Ticker.getInstance().register(this.update, this);
            this._totalFrame = this._frameData.frames[b].totalFrame
        };
        a.prototype.gotoAndStop = function(b) {
            this.checkHasFrame(b);
            this.stop();
            this._currentFrameIndex = this._passTime = 0;
            this._currentFrameName = b;
            this._totalFrame = this._frameData.frames[b].totalFrame;
            this.playNextFrame()
        };
        a.prototype.stop = function() {
            this._isPlaying = !1;
            c.Ticker.getInstance().unregister(this.update, this)
        };
        a.prototype.dispose = function() {};
        a.prototype.checkHasFrame = function(b) {
            void 0 == this._frameData.frames[b] && c.Logger.fatal("MovieClip\u6ca1\u6709\u5bf9\u5e94\u7684frame\uff1a", b)
        };
        a.prototype.update = function(b) {
            for (var a = 1E3 / this.movieClip.frameRate,
                a = Math.floor((this._passTime % a + b) / a); 1 <= a;) 1 == a ? this.playNextFrame() : this.playNextFrame(!1), a--;
            this._passTime += b
        };
        a.prototype.playNextFrame = function(b) {
            "undefined" === typeof b && (b = !0);
            var a = this._frameData.frames[this._currentFrameName].childrenFrame[this._currentFrameIndex];
            if (b) {
                b = this.getTexture(a.res);
                var c = this.bitmap;
                c.x = a.x;
                c.y = a.y;
                c.texture = b
            }
            null != a.action && this.movieClip.dispatchEventWith(a.action);
            this._currentFrameIndex++;
            this._currentFrameIndex == this._totalFrame && (this._currentFrameIndex =
                0)
        };
        a.prototype.getTexture = function(b) {
            var a = this._frameData.res[b],
                c = this._spriteSheet.getTexture(b);
            c || (c = this._spriteSheet.createTexture(b, a.x, a.y, a.w, a.h));
            return c
        };
        return a
    }();
    c.DefaultMovieClipDelegate = d
})(egret || (egret = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(d) {
        function a() {
            d.call(this)
        }
        __extends(a, d);
        a.prototype._getText = function() {
            return this.inputElement.value
        };
        a.prototype._setText = function(b) {
            this.inputElement.value = b
        };
        a.prototype._setTextType = function(b) {
            this.inputElement.type = b
        };
        a.prototype._getTextType = function() {
            return this.inputElement.type
        };
        a.prototype._open = function(b, a, d, e) {
            "undefined" === typeof d && (d = 160);
            "undefined" === typeof e && (e = 21);
            var f = c.StageDelegate.getInstance().getScaleX(),
                g = c.StageDelegate.getInstance().getScaleY(),
                k = document.createElement("input");
            k.type = "text";
            k.style.fontSize = "20px";
            k.style.color = "#FFFFFF";
            k.style.borderStyle = "none";
            k.style.background = "none";
            k.style.width = d * f + "px";
            k.style.height = e * g + "px";
            k.style.outline = "medium";
            var n = c.Browser.getInstance().$new("div");
            n.style.position = "absolute";
            n.position.x = b * f;
            n.style.width = d * f + "px";
            n.style.height = e * g + "px";
            n.position.y = a * g;
            n.transforms();
            n.appendChild(k);
            b = c.Browser.getInstance().$("#StageDelegateDiv");
            b || (d = document.getElementById(c.StageDelegate.canvas_div_name),
                e = d.clientHeight, d = d.clientWidth, b = c.Browser.getInstance().$new("div"), b.id = "StageDelegateDiv", b.style.position = "absolute", b.style.width = d + "px", b.style.maxHeight = e + "px", b.style.margin = "0px", document.getElementById(c.StageDelegate.canvas_div_name).appendChild(b), b.position.y = -e, b.transforms());
            b.appendChild(n);
            this.div = n;
            this.inputElement = k
        };
        a.prototype._remove = function() {
            var b = this.div;
            b && b.parentNode && b.parentNode.removeChild(b)
        };
        return a
    }(c.HashObject);
    c.StageText = e
})(egret || (egret = {}));
(function(c) {
    var e = function() {
        function c() {}
        c.GET = "GET";
        c.POST = "POST";
        return c
    }();
    c.URLRequestMethod = e
})(egret || (egret = {}));
(function(c) {
    var e = function() {
        function c() {}
        c.BINARY = "binary";
        c.TEXT = "text";
        c.VARIABLES = "variables";
        c.TEXTURE = "texture";
        c.SOUND = "sound";
        return c
    }();
    c.URLLoaderDataFormat = e
})(egret || (egret = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(c) {
        function a(b) {
            "undefined" === typeof b && (b = null);
            c.call(this);
            null !== b && this.decode(b)
        }
        __extends(a, c);
        a.prototype.decode = function(b) {
            this.variables || (this.variables = {});
            b = b.split("+").join(" ");
            for (var a, c = /[?&]?([^=]+)=([^&]*)/g; a = c.exec(b);) this.variables[decodeURIComponent(a[1])] = decodeURIComponent(a[2])
        };
        a.prototype.toString = function() {
            if (!this.variables) return "";
            var b = this.variables,
                a = "",
                c = !0,
                d;
            for (d in b) c ? c = !1 : a += "&", a += d + "=" + b[d];
            return a
        };
        return a
    }(c.HashObject);
    c.URLVariables = e
})(egret || (egret = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(d) {
        function a(b) {
            "undefined" === typeof b && (b = null);
            d.call(this);
            this.method = c.URLRequestMethod.GET;
            this.url = b
        }
        __extends(a, d);
        return a
    }(c.HashObject);
    c.URLRequest = e
})(egret || (egret = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(d) {
        function a(b) {
            "undefined" === typeof b && (b = null);
            d.call(this);
            this.dataFormat = c.URLLoaderDataFormat.TEXT;
            b && this.load(b)
        }
        __extends(a, d);
        a.prototype.load = function(b) {
            this._request = b;
            this.data = null;
            c.MainContext.instance.netContext.proceed(this)
        };
        return a
    }(c.EventDispatcher);
    c.URLLoader = e
})(egret || (egret = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(d) {
        function a() {
            d.call(this);
            this._textureHeight = this._textureWidth = this._offsetY = this._offsetX = this._bitmapHeight = this._bitmapWidth = this._bitmapY = this._bitmapX = 0
        }
        __extends(a, d);
        Object.defineProperty(a.prototype, "textureWidth", {
            get: function() {
                return this._textureWidth
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "textureHeight", {
            get: function() {
                return this._textureHeight
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "bitmapData", {
            get: function() {
                return this._bitmapData
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype._setBitmapData = function(b) {
            var a = c.MainContext.instance.rendererContext.texture_scale_factor;
            this._bitmapData = b;
            this._sourceWidth = b.width;
            this._sourceHeight = b.height;
            this._textureWidth = this._sourceWidth * a;
            this._textureHeight = this._sourceHeight * a;
            this._bitmapWidth = this._textureWidth;
            this._bitmapHeight = this._textureHeight;
            this._offsetX = this._offsetY = this._bitmapX = this._bitmapY = 0
        };
        a.prototype.getPixel32 = function(b, a) {
            return this._bitmapData.getContext("2d").getImageData(b,
                a, 1, 1).data
        };
        return a
    }(c.HashObject);
    c.Texture = e
})(egret || (egret = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(d) {
        function a() {
            d.call(this);
            this._bitmapData = document.createElement("canvas");
            this.renderContext = c.RendererContext.createRendererContext(this._bitmapData)
        }
        __extends(a, d);
        a.prototype.drawToTexture = function(b) {
            var a = this._bitmapData,
                d = b.getBounds(c.Rectangle.identity);
            a.width = d.width;
            a.height = d.height;
            b._worldTransform.identity();
            b.worldAlpha = 1;
            if (b instanceof c.DisplayObjectContainer) {
                this._offsetX = d.x;
                this._offsetY = d.y;
                b._worldTransform.append(1, 0, 0, 1, -d.x, -d.y);
                for (var a =
                    b._children, d = 0, e = a.length; d < e; d++) a[d]._updateTransform()
            }
            a = c.RenderFilter.getInstance();
            d = a._drawAreaList.concat();
            a._drawAreaList.length = 0;
            this.renderContext.clearScreen();
            b._render(this.renderContext);
            a._drawAreaList = d;
            this._textureWidth = this._bitmapData.width;
            this._textureHeight = this._bitmapData.height;
            this._sourceWidth = this._textureWidth;
            this._sourceHeight = this._textureHeight
        };
        return a
    }(c.Texture);
    c.RenderTexture = e
})(egret || (egret = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(d) {
        function a() {
            d.call(this);
            this.renderCost = 0;
            this.texture_scale_factor = 1
        }
        __extends(a, d);
        a.prototype.clearScreen = function() {};
        a.prototype.clearRect = function(b, a, c, d) {};
        a.prototype.drawImage = function(b, a, d, e, f, g, k, n, p) {
            c.Profiler.getInstance().onDrawImage()
        };
        a.prototype.setTransform = function(b) {};
        a.prototype.setAlpha = function(b, a) {};
        a.prototype.setupFont = function(b) {};
        a.prototype.measureText = function(b) {
            return 0
        };
        a.prototype.drawText = function(b, a, d, e, f) {
            c.Profiler.getInstance().onDrawImage()
        };
        a.prototype.strokeRect = function(b, a, c, d, e) {};
        a.prototype.pushMask = function(b) {};
        a.prototype.popMask = function() {};
        a.createRendererContext = function(b) {
            return null
        };
        return a
    }(c.HashObject);
    c.RendererContext = e;
    e = function() {
        function d(a) {
            this.type = a;
            switch (a) {
                case "add":
                case "layer":
                    this.value = "lighter";
                    break;
                default:
                    this.value = "source-over"
            }
        }
        d.getBlendMode = function(a) {
            return a ? c.BlendMode[a.toUpperCase()] : c.BlendMode.NORMAL
        };
        d.NORMAL = new d("normal");
        d.ADD = new d("add");
        d.LAYER = new d("layer");
        return d
    }();
    c.BlendMode = e
})(egret || (egret = {}));
(function(c) {
    var e = function() {
        function c() {}
        c.MOUSE = "mouse";
        c.TOUCH = "touch";
        c.mode = "touch";
        return c
    }();
    c.InteractionMode = e
})(egret || (egret = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(d) {
        function a() {
            d.call(this);
            this._currentTouchTarget = {};
            this.maxTouches = 2;
            this.touchDownTarget = {};
            this.lastTouchY = this.lastTouchX = -1
        }
        __extends(a, d);
        a.prototype.run = function() {};
        a.prototype.getTouchData = function(b, a, c) {
            var d = this._currentTouchTarget[b];
            null == d && (d = {}, this._currentTouchTarget[b] = d);
            d.stageX = a;
            d.stageY = c;
            d.identifier = b;
            return d
        };
        a.prototype.dispatchEvent = function(b, a) {
            c.TouchEvent.dispatchTouchEvent(a.target, b, a.identifier, a.stageX, a.stageY, !1, !1, !1, !0 ==
                this.touchDownTarget[a.identifier])
        };
        a.prototype.onTouchBegan = function(b, a, d) {
            var e = c.MainContext.instance.stage.hitTest(b, a);
            e && (b = this.getTouchData(d, b, a), this.touchDownTarget[d] = !0, b.target = e, b.beginTarget = e, this.dispatchEvent(c.TouchEvent.TOUCH_BEGIN, b))
        };
        a.prototype.onTouchMove = function(b, a, d) {
            if (b != this.lastTouchX || a != this.lastTouchY) {
                this.lastTouchX = b;
                this.lastTouchY = a;
                var e = c.MainContext.instance.stage.hitTest(b, a);
                e && (b = this.getTouchData(d, b, a), b.target = e, this.dispatchEvent(c.TouchEvent.TOUCH_MOVE,
                    b))
            }
        };
        a.prototype.onTouchEnd = function(b, a, d) {
            var e = c.MainContext.instance.stage.hitTest(b, a);
            e && (b = this.getTouchData(d, b, a), delete this.touchDownTarget[d], d = b.beginTarget, b.target = e, this.dispatchEvent(c.TouchEvent.TOUCH_END, b), d == e ? this.dispatchEvent(c.TouchEvent.TOUCH_TAP, b) : b.beginTarget && (b.target = b.beginTarget, this.dispatchEvent(c.TouchEvent.TOUCH_RELEASE_OUTSIDE, b)), delete this._currentTouchTarget[b.identifier])
        };
        return a
    }(c.HashObject);
    c.TouchContext = e
})(egret || (egret = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(c) {
        function a() {
            c.call(this)
        }
        __extends(a, c);
        a.prototype.proceed = function(b) {};
        return a
    }(c.HashObject);
    c.NetContext = e
})(egret || (egret = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(c) {
        function a() {
            c.call(this);
            this.frameRate = 60
        }
        __extends(a, c);
        a.prototype.executeMainLoop = function(b, a) {};
        return a
    }(c.HashObject);
    c.DeviceContext = e
})(egret || (egret = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(d) {
        function a() {
            d.call(this);
            this.translate = this.isHD ? function(b) {
                return "translate3d(" + b.x + "px, " + (b.y - c.MainContext.instance.stage.stageHeight) + "px, 0) "
            } : function(b) {
                console.log("translate(" + b.x + "px, " + b.y + "px) ");
                return "translate(" + b.x + "px, " + b.y + "px) "
            };
            this.rotate = this.isHD ? function(b) {
                return "rotateZ(" + b + "deg) "
            } : function(b) {
                return "rotate(" + b + "deg) "
            };
            this.ua = navigator.userAgent.toLowerCase();
            var b = this.ua.match(/micromessenger|qqbrowser|mqqbrowser|ucbrowser|360browser|baidubrowser|maxthon|ie|opera|firefox/) ||
                this.ua.match(/chrome|safari/);
            b && 0 < b.length && (b = b[0], "micromessenger" == b && (this.type = "wechat"), this.type = b);
            this.type = "unknow";
            switch (this.type) {
                case "firefox":
                    this.pfx = "Moz";
                    this.isHD = !0;
                    break;
                case "chrome":
                case "safari":
                    this.pfx = "webkit";
                    this.isHD = !0;
                    break;
                case "opera":
                    this.pfx = "O";
                    this.isHD = !1;
                    break;
                case "ie":
                    this.pfx = "ms";
                    this.isHD = !1;
                    break;
                default:
                    this.pfx = "webkit", this.isHD = !0
            }
            this.trans = this.pfx + "Transform";
            this.isMobile = -1 != this.ua.indexOf("mobile") || -1 != this.ua.indexOf("android")
        }
        __extends(a,
            d);
        a.getInstance = function() {
            null == a.instance && (a.instance = new a);
            return a.instance
        };
        a.prototype.$new = function(b) {
            return this.$(document.createElement(b))
        };
        a.prototype.$ = function(b) {
            var h = document;
            if (b = b instanceof HTMLElement ? b : h.querySelector(b)) b.find = b.find || this.$, b.hasClass = b.hasClass || function(b) {
                    return this.className.match(new RegExp("(\\s|^)" + b + "(\\s|$)"))
                }, b.addClass = b.addClass || function(b) {
                    this.hasClass(b) || (this.className && (this.className += " "), this.className += b);
                    return this
                }, b.removeClass =
                b.removeClass || function(b) {
                    this.hasClass(b) && (this.className = this.className.replace(b, ""));
                    return this
                }, b.remove = b.remove || function() {}, b.appendTo = b.appendTo || function(b) {
                    b.appendChild(this);
                    return this
                }, b.prependTo = b.prependTo || function(b) {
                    b.childNodes[0] ? b.insertBefore(this, b.childNodes[0]) : b.appendChild(this);
                    return this
                }, b.transforms = b.transforms || function() {
                    this.style[a.getInstance().trans] = a.getInstance().translate(this.position) + a.getInstance().rotate(this.rotation) + a.getInstance().scale(this.scale) +
                        a.getInstance().skew(this.skew);
                    return this
                }, b.position = b.position || {
                    x: 0,
                    y: 0
                }, b.rotation = b.rotation || 0, b.scale = b.scale || {
                    x: 1,
                    y: 1
                }, b.skew = b.skew || {
                    x: 0,
                    y: 0
                }, b.translates = function(b, a) {
                    this.position.x = b;
                    this.position.y = a - c.MainContext.instance.stage.stageHeight;
                    this.transforms();
                    return this
                }, b.rotate = function(b) {
                    this.rotation = b;
                    this.transforms();
                    return this
                }, b.resize = function(b, a) {
                    this.scale.x = b;
                    this.scale.y = a;
                    this.transforms();
                    return this
                }, b.setSkew = function(b, a) {
                    this.skew.x = b;
                    this.skew.y = a;
                    this.transforms();
                    return this
                };
            return b
        };
        a.prototype.scale = function(b) {
            return "scale(" + b.x + ", " + b.y + ") "
        };
        a.prototype.skew = function(b) {
            return "skewX(" + -b.x + "deg) skewY(" + b.y + "deg)"
        };
        return a
    }(c.HashObject);
    c.Browser = e
})(egret || (egret = {}));
egret.Codec = {
    name: "Jacob__Codec"
};
egret.Utils = {};
egret.Utils.unzip = function() {
    return egret.Codec.GZip.gunzip.apply(egret.Codec.GZip, arguments)
};
egret.Utils.unzipBase64 = function() {
    var c = egret.Codec.Base64.decode.apply(egret.Codec.Base64, arguments);
    return egret.Codec.GZip.gunzip.apply(egret.Codec.GZip, [c])
};
egret.Utils.unzipBase64AsArray = function(c, e) {
    e = e || 1;
    var d = this.unzipBase64(c),
        a = [],
        b, h, l;
    b = 0;
    for (l = d.length / e; b < l; b++)
        for (a[b] = 0, h = e - 1; 0 <= h; --h) a[b] += d.charCodeAt(b * e + h) << 8 * h;
    return a
};
egret.Utils.unzipAsArray = function(c, e) {
    e = e || 1;
    var d = this.unzip(c),
        a = [],
        b, h, l;
    b = 0;
    for (l = d.length / e; b < l; b++)
        for (a[b] = 0, h = e - 1; 0 <= h; --h) a[b] += d.charCodeAt(b * e + h) << 8 * h;
    return a
};
egret.Utils.StringToArray = function(c) {
    c = c.split(",");
    var e = [],
        d;
    for (d = 0; d < c.length; d++) e.push(parseInt(c[d]));
    return e
};
egret.Codec.Base64 = {
    name: "Jacob__Codec__Base64"
};
egret.Codec.Base64._keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
egret.Codec.Base64.decode = function(c) {
    var e = [],
        d, a, b, h, l, m = 0;
    for (c = c.replace(/[^A-Za-z0-9\+\/\=]/g, ""); m < c.length;) d = this._keyStr.indexOf(c.charAt(m++)), a = this._keyStr.indexOf(c.charAt(m++)), h = this._keyStr.indexOf(c.charAt(m++)), l = this._keyStr.indexOf(c.charAt(m++)), d = d << 2 | a >> 4, a = (a & 15) << 4 | h >> 2, b = (h & 3) << 6 | l, e.push(String.fromCharCode(d)), 64 != h && e.push(String.fromCharCode(a)), 64 != l && e.push(String.fromCharCode(b));
    return e = e.join("")
};
egret.Codec.Base64.decodeAsArray = function(c, e) {
    var d = this.decode(c),
        a = [],
        b, h, l;
    b = 0;
    for (l = d.length / e; b < l; b++)
        for (a[b] = 0, h = e - 1; 0 <= h; --h) a[b] += d.charCodeAt(b * e + h) << 8 * h;
    return a
};
egret.Utils.uint8ArrayToUint32Array = function(c) {
    if (0 != c.length % 4) return null;
    for (var e = c.length / 4, d = window.Uint32Array ? new Uint32Array(e) : [], a = 0; a < e; a++) {
        var b = 4 * a;
        d[a] = c[b] + 256 * c[b + 1] + 65536 * c[b + 2] + 16777216 * c[b + 3]
    }
    return d
};
egret.Codec.GZip = function(c) {
    this.data = c;
    this.debug = !1;
    this.gpflags = void 0;
    this.files = 0;
    this.unzipped = [];
    this.buf32k = Array(32768);
    this.bIdx = 0;
    this.modeZIP = !1;
    this.bytepos = 0;
    this.bb = 1;
    this.bits = 0;
    this.nameBuf = [];
    this.fileout = void 0;
    this.literalTree = Array(egret.Codec.GZip.LITERALS);
    this.distanceTree = Array(32);
    this.treepos = 0;
    this.Places = null;
    this.len = 0;
    this.fpos = Array(17);
    this.fpos[0] = 0;
    this.fmax = this.flens = void 0
};
egret.Codec.GZip.gunzip = function(c) {
    return (new egret.Codec.GZip(c)).gunzip()[0][0]
};
egret.Codec.GZip.HufNode = function() {
    this.b1 = this.b0 = 0;
    this.jump = null;
    this.jumppos = -1
};
egret.Codec.GZip.LITERALS = 288;
egret.Codec.GZip.NAMEMAX = 256;
egret.Codec.GZip.bitReverse = [0, 128, 64, 192, 32, 160, 96, 224, 16, 144, 80, 208, 48, 176, 112, 240, 8, 136, 72, 200, 40, 168, 104, 232, 24, 152, 88, 216, 56, 184, 120, 248, 4, 132, 68, 196, 36, 164, 100, 228, 20, 148, 84, 212, 52, 180, 116, 244, 12, 140, 76, 204, 44, 172, 108, 236, 28, 156, 92, 220, 60, 188, 124, 252, 2, 130, 66, 194, 34, 162, 98, 226, 18, 146, 82, 210, 50, 178, 114, 242, 10, 138, 74, 202, 42, 170, 106, 234, 26, 154, 90, 218, 58, 186, 122, 250, 6, 134, 70, 198, 38, 166, 102, 230, 22, 150, 86, 214, 54, 182, 118, 246, 14, 142, 78, 206, 46, 174, 110, 238, 30, 158, 94, 222, 62, 190, 126, 254, 1, 129, 65, 193, 33,
    161, 97, 225, 17, 145, 81, 209, 49, 177, 113, 241, 9, 137, 73, 201, 41, 169, 105, 233, 25, 153, 89, 217, 57, 185, 121, 249, 5, 133, 69, 197, 37, 165, 101, 229, 21, 149, 85, 213, 53, 181, 117, 245, 13, 141, 77, 205, 45, 173, 109, 237, 29, 157, 93, 221, 61, 189, 125, 253, 3, 131, 67, 195, 35, 163, 99, 227, 19, 147, 83, 211, 51, 179, 115, 243, 11, 139, 75, 203, 43, 171, 107, 235, 27, 155, 91, 219, 59, 187, 123, 251, 7, 135, 71, 199, 39, 167, 103, 231, 23, 151, 87, 215, 55, 183, 119, 247, 15, 143, 79, 207, 47, 175, 111, 239, 31, 159, 95, 223, 63, 191, 127, 255
];
egret.Codec.GZip.cplens = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0];
egret.Codec.GZip.cplext = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 99, 99];
egret.Codec.GZip.cpdist = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577];
egret.Codec.GZip.cpdext = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13];
egret.Codec.GZip.border = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
egret.Codec.GZip.prototype.gunzip = function() {
    this.outputArr = [];
    this.nextFile();
    return this.unzipped
};
egret.Codec.GZip.prototype.readByte = function() {
    this.bits += 8;
    return this.bytepos < this.data.length ? this.data.charCodeAt(this.bytepos++) : -1
};
egret.Codec.GZip.prototype.byteAlign = function() {
    this.bb = 1
};
egret.Codec.GZip.prototype.readBit = function() {
    var c;
    this.bits++;
    c = this.bb & 1;
    this.bb >>= 1;
    0 == this.bb && (this.bb = this.readByte(), c = this.bb & 1, this.bb = this.bb >> 1 | 128);
    return c
};
egret.Codec.GZip.prototype.readBits = function(c) {
    for (var e = 0, d = c; d--;) e = e << 1 | this.readBit();
    c && (e = egret.Codec.GZip.bitReverse[e] >> 8 - c);
    return e
};
egret.Codec.GZip.prototype.flushBuffer = function() {
    this.bIdx = 0
};
egret.Codec.GZip.prototype.addBuffer = function(c) {
    this.buf32k[this.bIdx++] = c;
    this.outputArr.push(String.fromCharCode(c));
    32768 == this.bIdx && (this.bIdx = 0)
};
egret.Codec.GZip.prototype.IsPat = function() {
    for (;;) {
        if (this.fpos[this.len] >= this.fmax) return -1;
        if (this.flens[this.fpos[this.len]] == this.len) return this.fpos[this.len]++;
        this.fpos[this.len]++
    }
};
egret.Codec.GZip.prototype.Rec = function() {
    var c = this.Places[this.treepos],
        e;
    if (17 == this.len) return -1;
    this.treepos++;
    this.len++;
    e = this.IsPat();
    if (0 <= e) c.b0 = e;
    else if (c.b0 = 32768, this.Rec()) return -1;
    e = this.IsPat();
    if (0 <= e) c.b1 = e, c.jump = null;
    else if (c.b1 = 32768, c.jump = this.Places[this.treepos], c.jumppos = this.treepos, this.Rec()) return -1;
    this.len--;
    return 0
};
egret.Codec.GZip.prototype.CreateTree = function(c, e, d, a) {
    this.Places = c;
    this.treepos = 0;
    this.flens = d;
    this.fmax = e;
    for (c = 0; 17 > c; c++) this.fpos[c] = 0;
    this.len = 0;
    return this.Rec() ? -1 : 0
};
egret.Codec.GZip.prototype.DecodeValue = function(c) {
    for (var e, d, a = 0, b = c[a];;)
        if (e = this.readBit()) {
            if (!(b.b1 & 32768)) return b.b1;
            b = b.jump;
            e = c.length;
            for (d = 0; d < e; d++)
                if (c[d] === b) {
                    a = d;
                    break
                }
        } else {
            if (!(b.b0 & 32768)) return b.b0;
            a++;
            b = c[a]
        }
    return -1
};
egret.Codec.GZip.prototype.DeflateLoop = function() {
    var c, e, d, a, b;
    do
        if (c = this.readBit(), d = this.readBits(2), 0 == d)
            for (this.byteAlign(), d = this.readByte(), d |= this.readByte() << 8, e = this.readByte(), e |= this.readByte() << 8, (d ^ ~e) & 65535 && document.write("BlockLen checksum mismatch\n"); d--;) e = this.readByte(), this.addBuffer(e);
        else if (1 == d)
        for (;;)
            if (d = egret.Codec.GZip.bitReverse[this.readBits(7)] >> 1, 23 < d ? (d = d << 1 | this.readBit(), 199 < d ? (d -= 128, d = d << 1 | this.readBit()) : (d -= 48, 143 < d && (d += 136))) : d += 256, 256 > d) this.addBuffer(d);
            else if (256 == d) break;
    else {
        var h;
        d -= 257;
        b = this.readBits(egret.Codec.GZip.cplext[d]) + egret.Codec.GZip.cplens[d];
        d = egret.Codec.GZip.bitReverse[this.readBits(5)] >> 3;
        8 < egret.Codec.GZip.cpdext[d] ? (h = this.readBits(8), h |= this.readBits(egret.Codec.GZip.cpdext[d] - 8) << 8) : h = this.readBits(egret.Codec.GZip.cpdext[d]);
        h += egret.Codec.GZip.cpdist[d];
        for (d = 0; d < b; d++) e = this.buf32k[this.bIdx - h & 32767], this.addBuffer(e)
    } else if (2 == d) {
        var l = Array(320);
        e = 257 + this.readBits(5);
        h = 1 + this.readBits(5);
        a = 4 + this.readBits(4);
        for (d =
            0; 19 > d; d++) l[d] = 0;
        for (d = 0; d < a; d++) l[egret.Codec.GZip.border[d]] = this.readBits(3);
        b = this.distanceTree.length;
        for (a = 0; a < b; a++) this.distanceTree[a] = new egret.Codec.GZip.HufNode;
        if (this.CreateTree(this.distanceTree, 19, l, 0)) return this.flushBuffer(), 1;
        b = e + h;
        a = 0;
        for (var m = -1; a < b;)
            if (m++, d = this.DecodeValue(this.distanceTree), 16 > d) l[a++] = d;
            else if (16 == d) {
            var f;
            d = 3 + this.readBits(2);
            if (a + d > b) return this.flushBuffer(), 1;
            for (f = a ? l[a - 1] : 0; d--;) l[a++] = f
        } else {
            d = 17 == d ? 3 + this.readBits(3) : 11 + this.readBits(7);
            if (a +
                d > b) return this.flushBuffer(), 1;
            for (; d--;) l[a++] = 0
        }
        b = this.literalTree.length;
        for (a = 0; a < b; a++) this.literalTree[a] = new egret.Codec.GZip.HufNode;
        if (this.CreateTree(this.literalTree, e, l, 0)) return this.flushBuffer(), 1;
        b = this.literalTree.length;
        for (a = 0; a < b; a++) this.distanceTree[a] = new egret.Codec.GZip.HufNode;
        d = [];
        for (a = e; a < l.length; a++) d[a - e] = l[a];
        if (this.CreateTree(this.distanceTree, h, d, 0)) return this.flushBuffer(), 1;
        for (;;)
            if (d = this.DecodeValue(this.literalTree), 256 <= d) {
                d -= 256;
                if (0 == d) break;
                d--;
                b = this.readBits(egret.Codec.GZip.cplext[d]) +
                    egret.Codec.GZip.cplens[d];
                d = this.DecodeValue(this.distanceTree);
                8 < egret.Codec.GZip.cpdext[d] ? (h = this.readBits(8), h |= this.readBits(egret.Codec.GZip.cpdext[d] - 8) << 8) : h = this.readBits(egret.Codec.GZip.cpdext[d]);
                for (h += egret.Codec.GZip.cpdist[d]; b--;) e = this.buf32k[this.bIdx - h & 32767], this.addBuffer(e)
            } else this.addBuffer(d)
    }
    while (!c);
    this.flushBuffer();
    this.byteAlign();
    return 0
};
egret.Codec.GZip.prototype.unzipFile = function(c) {
    var e;
    this.gunzip();
    for (e = 0; e < this.unzipped.length; e++)
        if (this.unzipped[e][1] == c) return this.unzipped[e][0]
};
egret.Codec.GZip.prototype.nextFile = function() {
    this.outputArr = [];
    this.modeZIP = !1;
    var c = [];
    c[0] = this.readByte();
    c[1] = this.readByte();
    120 == c[0] && 218 == c[1] && (this.DeflateLoop(), this.unzipped[this.files] = [this.outputArr.join(""), "geonext.gxt"], this.files++);
    31 == c[0] && 139 == c[1] && (this.skipdir(), this.unzipped[this.files] = [this.outputArr.join(""), "file"], this.files++);
    if (80 == c[0] && 75 == c[1] && (this.modeZIP = !0, c[2] = this.readByte(), c[3] = this.readByte(), 3 == c[2] && 4 == c[3])) {
        c[0] = this.readByte();
        c[1] = this.readByte();
        this.gpflags = this.readByte();
        this.gpflags |= this.readByte() << 8;
        c = this.readByte();
        c |= this.readByte() << 8;
        this.readByte();
        this.readByte();
        this.readByte();
        this.readByte();
        this.readByte();
        this.readByte();
        this.readByte();
        this.readByte();
        this.readByte();
        this.readByte();
        this.readByte();
        this.readByte();
        var e = this.readByte(),
            e = e | this.readByte() << 8,
            d = this.readByte(),
            d = d | this.readByte() << 8,
            a = 0;
        for (this.nameBuf = []; e--;) {
            var b = this.readByte();
            "/" == b | ":" == b ? a = 0 : a < egret.Codec.GZip.NAMEMAX - 1 && (this.nameBuf[a++] = String.fromCharCode(b))
        }
        this.fileout ||
            (this.fileout = this.nameBuf);
        for (var a = 0; a < d;) this.readByte(), a++;
        8 == c && (this.DeflateLoop(), this.unzipped[this.files] = [this.outputArr.join(""), this.nameBuf.join("")], this.files++);
        this.skipdir()
    }
};
egret.Codec.GZip.prototype.skipdir = function() {
    var c = [],
        e;
    this.gpflags & 8 && (c[0] = this.readByte(), c[1] = this.readByte(), c[2] = this.readByte(), c[3] = this.readByte(), this.readByte(), this.readByte(), this.readByte(), this.readByte(), this.readByte(), this.readByte(), this.readByte(), this.readByte());
    this.modeZIP && this.nextFile();
    c[0] = this.readByte();
    if (8 != c[0]) return 0;
    this.gpflags = this.readByte();
    this.readByte();
    this.readByte();
    this.readByte();
    this.readByte();
    this.readByte();
    this.readByte();
    if (this.gpflags & 4)
        for (c[0] =
            this.readByte(), c[2] = this.readByte(), this.len = c[0] + 256 * c[1], c = 0; c < this.len; c++) this.readByte();
    if (this.gpflags & 8)
        for (c = 0, this.nameBuf = []; e = this.readByte();) {
            if ("7" == e || ":" == e) c = 0;
            c < egret.Codec.GZip.NAMEMAX - 1 && (this.nameBuf[c++] = e)
        }
    if (this.gpflags & 16)
        for (; this.readByte(););
    this.gpflags & 2 && (this.readByte(), this.readByte());
    this.DeflateLoop();
    this.readByte();
    this.readByte();
    this.readByte();
    this.readByte();
    this.modeZIP && this.nextFile()
};
(function() {
    function c(b) {
        throw b;
    }

    function e(b, a) {
        var c = b.split("."),
            h = C;
        c[0] in h || !h.execScript || h.execScript("var " + c[0]);
        for (var d; c.length && (d = c.shift());) c.length || a === v ? h = h[d] ? h[d] : h[d] = {} : h[d] = a
    }

    function d(b) {
        if ("string" === typeof b) {
            b = b.split("");
            var a, c;
            a = 0;
            for (c = b.length; a < c; a++) b[a] = (b[a].charCodeAt(0) & 255) >>> 0
        }
        a = 1;
        c = 0;
        for (var h = b.length, d, l = 0; 0 < h;) {
            d = 1024 < h ? 1024 : h;
            h -= d;
            do a += b[l++], c += a; while (--d);
            a %= 65521;
            c %= 65521
        }
        return (c << 16 | a) >>> 0
    }

    function a(b, a) {
        this.index = "number" === typeof a ? a : 0;
        this.i = 0;
        this.buffer = b instanceof(t ? Uint8Array : Array) ? b : new(t ? Uint8Array : Array)(32768);
        2 * this.buffer.length <= this.index && c(Error("invalid index"));
        this.buffer.length <= this.index && this.f()
    }

    function b(b) {
        this.buffer = new(t ? Uint16Array : Array)(2 * b);
        this.length = 0
    }

    function h(b) {
        var a = b.length,
            c = 0,
            h = Number.POSITIVE_INFINITY,
            d, l, e, m, f, g, k, p, q;
        for (p = 0; p < a; ++p) b[p] > c && (c = b[p]), b[p] < h && (h = b[p]);
        d = 1 << c;
        l = new(t ? Uint32Array : Array)(d);
        e = 1;
        m = 0;
        for (f = 2; e <= c;) {
            for (p = 0; p < a; ++p)
                if (b[p] === e) {
                    g = 0;
                    k = m;
                    for (q = 0; q < e; ++q) g =
                        g << 1 | k & 1, k >>= 1;
                    for (q = g; q < d; q += f) l[q] = e << 16 | p;
                    ++m
                }++e;
            m <<= 1;
            f <<= 1
        }
        return [l, c, h]
    }

    function l(b, a) {
        this.h = H;
        this.w = 0;
        this.input = b;
        this.b = 0;
        a && (a.lazy && (this.w = a.lazy), "number" === typeof a.compressionType && (this.h = a.compressionType), a.outputBuffer && (this.a = t && a.outputBuffer instanceof Array ? new Uint8Array(a.outputBuffer) : a.outputBuffer), "number" === typeof a.outputIndex && (this.b = a.outputIndex));
        this.a || (this.a = new(t ? Uint8Array : Array)(32768))
    }

    function m(b, a) {
        this.length = b;
        this.G = a
    }

    function f() {
        var b = G;
        switch (B) {
            case 3 ===
            b:
                return [257, b - 3, 0];
            case 4 === b:
                return [258, b - 4, 0];
            case 5 === b:
                return [259, b - 5, 0];
            case 6 === b:
                return [260, b - 6, 0];
            case 7 === b:
                return [261, b - 7, 0];
            case 8 === b:
                return [262, b - 8, 0];
            case 9 === b:
                return [263, b - 9, 0];
            case 10 === b:
                return [264, b - 10, 0];
            case 12 >= b:
                return [265, b - 11, 1];
            case 14 >= b:
                return [266, b - 13, 1];
            case 16 >= b:
                return [267, b - 15, 1];
            case 18 >= b:
                return [268, b - 17, 1];
            case 22 >= b:
                return [269, b - 19, 2];
            case 26 >= b:
                return [270, b - 23, 2];
            case 30 >= b:
                return [271, b - 27, 2];
            case 34 >= b:
                return [272, b - 31, 2];
            case 42 >= b:
                return [273, b - 35, 3];
            case 50 >=
            b:
                return [274, b - 43, 3];
            case 58 >= b:
                return [275, b - 51, 3];
            case 66 >= b:
                return [276, b - 59, 3];
            case 82 >= b:
                return [277, b - 67, 4];
            case 98 >= b:
                return [278, b - 83, 4];
            case 114 >= b:
                return [279, b - 99, 4];
            case 130 >= b:
                return [280, b - 115, 4];
            case 162 >= b:
                return [281, b - 131, 5];
            case 194 >= b:
                return [282, b - 163, 5];
            case 226 >= b:
                return [283, b - 195, 5];
            case 257 >= b:
                return [284, b - 227, 5];
            case 258 === b:
                return [285, b - 258, 0];
            default:
                c("invalid length: " + b)
        }
    }

    function g(b, a) {
        function h(b, a) {
            var d = b.G,
                l = [],
                e = 0,
                m;
            m = M[b.length];
            l[e++] = m & 65535;
            l[e++] = m >> 16 & 255;
            l[e++] =
                m >> 24;
            var f;
            switch (B) {
                case 1 === d:
                    f = [0, d - 1, 0];
                    break;
                case 2 === d:
                    f = [1, d - 2, 0];
                    break;
                case 3 === d:
                    f = [2, d - 3, 0];
                    break;
                case 4 === d:
                    f = [3, d - 4, 0];
                    break;
                case 6 >= d:
                    f = [4, d - 5, 1];
                    break;
                case 8 >= d:
                    f = [5, d - 7, 1];
                    break;
                case 12 >= d:
                    f = [6, d - 9, 2];
                    break;
                case 16 >= d:
                    f = [7, d - 13, 2];
                    break;
                case 24 >= d:
                    f = [8, d - 17, 3];
                    break;
                case 32 >= d:
                    f = [9, d - 25, 3];
                    break;
                case 48 >= d:
                    f = [10, d - 33, 4];
                    break;
                case 64 >= d:
                    f = [11, d - 49, 4];
                    break;
                case 96 >= d:
                    f = [12, d - 65, 5];
                    break;
                case 128 >= d:
                    f = [13, d - 97, 5];
                    break;
                case 192 >= d:
                    f = [14, d - 129, 6];
                    break;
                case 256 >= d:
                    f = [15, d - 193, 6];
                    break;
                case 384 >= d:
                    f = [16, d - 257, 7];
                    break;
                case 512 >= d:
                    f = [17, d - 385, 7];
                    break;
                case 768 >= d:
                    f = [18, d - 513, 8];
                    break;
                case 1024 >= d:
                    f = [19, d - 769, 8];
                    break;
                case 1536 >= d:
                    f = [20, d - 1025, 9];
                    break;
                case 2048 >= d:
                    f = [21, d - 1537, 9];
                    break;
                case 3072 >= d:
                    f = [22, d - 2049, 10];
                    break;
                case 4096 >= d:
                    f = [23, d - 3073, 10];
                    break;
                case 6144 >= d:
                    f = [24, d - 4097, 11];
                    break;
                case 8192 >= d:
                    f = [25, d - 6145, 11];
                    break;
                case 12288 >= d:
                    f = [26, d - 8193, 12];
                    break;
                case 16384 >= d:
                    f = [27, d - 12289, 12];
                    break;
                case 24576 >= d:
                    f = [28, d - 16385, 13];
                    break;
                case 32768 >= d:
                    f = [29, d - 24577, 13];
                    break;
                default:
                    c("invalid distance")
            }
            m =
                f;
            l[e++] = m[0];
            l[e++] = m[1];
            l[e++] = m[2];
            d = 0;
            for (e = l.length; d < e; ++d) q[r++] = l[d];
            n[l[0]]++;
            w[l[3]]++;
            s = b.length + a - 1;
            p = null
        }
        var d, l, e, f, g, k = {},
            p, q = t ? new Uint16Array(2 * a.length) : [],
            r = 0,
            s = 0,
            n = new(t ? Uint32Array : Array)(286),
            w = new(t ? Uint32Array : Array)(30),
            z = b.w,
            A;
        if (!t) {
            for (e = 0; 285 >= e;) n[e++] = 0;
            for (e = 0; 29 >= e;) w[e++] = 0
        }
        n[256] = 1;
        d = 0;
        for (l = a.length; d < l; ++d) {
            e = g = 0;
            for (f = 3; e < f && d + e !== l; ++e) g = g << 8 | a[d + e];
            k[g] === v && (k[g] = []);
            e = k[g];
            if (!(0 < s--)) {
                for (; 0 < e.length && 32768 < d - e[0];) e.shift();
                if (d + 3 >= l) {
                    p && h(p, -1);
                    e = 0;
                    for (f = l - d; e < f; ++e) A = a[d + e], q[r++] = A, ++n[A];
                    break
                }
                if (0 < e.length) {
                    g = f = v;
                    var D = 0,
                        E = v,
                        x = v,
                        y = E = v,
                        u = a.length,
                        x = 0,
                        y = e.length;
                    a: for (; x < y; x++) {
                        f = e[y - x - 1];
                        E = 3;
                        if (3 < D) {
                            for (E = D; 3 < E; E--)
                                if (a[f + E - 1] !== a[d + E - 1]) continue a;
                            E = D
                        }
                        for (; 258 > E && d + E < u && a[f + E] === a[d + E];)++E;
                        E > D && (g = f, D = E);
                        if (258 === E) break
                    }
                    f = new m(D, d - g);
                    p ? p.length < f.length ? (A = a[d - 1], q[r++] = A, ++n[A], h(f, 0)) : h(p, -1) : f.length < z ? p = f : h(f, 0)
                } else p ? h(p, -1) : (A = a[d], q[r++] = A, ++n[A])
            }
            e.push(d)
        }
        q[r++] = 256;
        n[256]++;
        b.L = n;
        b.K = w;
        return t ? q.subarray(0, r) : q
    }

    function k(a,
        c) {
        function h(b) {
            var a = q[b][r[b]];
            a === k ? (h(b + 1), h(b + 1)) : --p[a];
            ++r[b]
        }
        var d = a.length,
            l = new b(572),
            e = new(t ? Uint8Array : Array)(d),
            m, f, g;
        if (!t)
            for (f = 0; f < d; f++) e[f] = 0;
        for (f = 0; f < d; ++f) 0 < a[f] && l.push(f, a[f]);
        d = Array(l.length / 2);
        m = new(t ? Uint32Array : Array)(l.length / 2);
        if (1 === d.length) return e[l.pop().index] = 1, e;
        f = 0;
        for (g = l.length / 2; f < g; ++f) d[f] = l.pop(), m[f] = d[f].value;
        var k = m.length;
        f = new(t ? Uint16Array : Array)(c);
        var l = new(t ? Uint8Array : Array)(c),
            p = new(t ? Uint8Array : Array)(k);
        g = Array(c);
        var q = Array(c),
            r =
            Array(c),
            s = (1 << c) - k,
            n = 1 << c - 1,
            w, z, v;
        f[c - 1] = k;
        for (w = 0; w < c; ++w) s < n ? l[w] = 0 : (l[w] = 1, s -= n), s <<= 1, f[c - 2 - w] = (f[c - 1 - w] / 2 | 0) + k;
        f[0] = l[0];
        g[0] = Array(f[0]);
        q[0] = Array(f[0]);
        for (w = 1; w < c; ++w) f[w] > 2 * f[w - 1] + l[w] && (f[w] = 2 * f[w - 1] + l[w]), g[w] = Array(f[w]), q[w] = Array(f[w]);
        for (s = 0; s < k; ++s) p[s] = c;
        for (n = 0; n < f[c - 1]; ++n) g[c - 1][n] = m[n], q[c - 1][n] = n;
        for (s = 0; s < c; ++s) r[s] = 0;
        1 === l[c - 1] && (--p[0], ++r[c - 1]);
        for (w = c - 2; 0 <= w; --w) {
            z = s = 0;
            v = r[w + 1];
            for (n = 0; n < f[w]; n++) z = g[w + 1][v] + g[w + 1][v + 1], z > m[s] ? (g[w][n] = z, q[w][n] = k, v += 2) : (g[w][n] = m[s],
                q[w][n] = s, ++s);
            r[w] = 0;
            1 === l[w] && h(w)
        }
        m = p;
        f = 0;
        for (g = d.length; f < g; ++f) e[d[f].index] = m[f];
        return e
    }

    function n(b) {
        var a = new(t ? Uint16Array : Array)(b.length),
            h = [],
            d = [],
            l = 0,
            e, m, f;
        e = 0;
        for (m = b.length; e < m; e++) h[b[e]] = (h[b[e]] | 0) + 1;
        e = 1;
        for (m = 16; e <= m; e++) d[e] = l, l += h[e] | 0, l > 1 << e && c("overcommitted"), l <<= 1;
        65536 > l && c("undercommitted");
        e = 0;
        for (m = b.length; e < m; e++)
            for (l = d[b[e]], d[b[e]] += 1, h = a[e] = 0, f = b[e]; h < f; h++) a[e] = a[e] << 1 | l & 1, l >>>= 1;
        return a
    }

    function p(b, a) {
        this.input = b;
        this.a = new(t ? Uint8Array : Array)(32768);
        this.h =
            J.j;
        var c = {},
            h;
        !a && (a = {}) || "number" !== typeof a.compressionType || (this.h = a.compressionType);
        for (h in a) c[h] = a[h];
        c.outputBuffer = this.a;
        this.z = new l(this.input, c)
    }

    function q(b, a) {
        this.k = [];
        this.l = 32768;
        this.e = this.g = this.c = this.q = 0;
        this.input = t ? new Uint8Array(b) : b;
        this.s = !1;
        this.m = F;
        this.B = !1;
        if (a || !(a = {})) a.index && (this.c = a.index), a.bufferSize && (this.l = a.bufferSize), a.bufferType && (this.m = a.bufferType), a.resize && (this.B = a.resize);
        switch (this.m) {
            case N:
                this.b = 32768;
                this.a = new(t ? Uint8Array : Array)(32768 +
                    this.l + 258);
                break;
            case F:
                this.b = 0;
                this.a = new(t ? Uint8Array : Array)(this.l);
                this.f = this.J;
                this.t = this.H;
                this.o = this.I;
                break;
            default:
                c(Error("invalid inflate mode"))
        }
    }

    function r(b, a) {
        for (var h = b.g, d = b.e, l = b.input, e = b.c, m; d < a;) m = l[e++], m === v && c(Error("input buffer is broken")), h |= m << d, d += 8;
        b.g = h >>> a;
        b.e = d - a;
        b.c = e;
        return h & (1 << a) - 1
    }

    function s(b, a) {
        for (var h = b.g, d = b.e, l = b.input, e = b.c, m = a[0], f = a[1], g; d < f;) g = l[e++], g === v && c(Error("input buffer is broken")), h |= g << d, d += 8;
        l = m[h & (1 << f) - 1];
        m = l >>> 16;
        b.g = h >> m;
        b.e =
            d - m;
        b.c = e;
        return l & 65535
    }

    function z(b) {
        function a(b, c, h) {
            var d, l, e, m;
            for (m = 0; m < b;) switch (d = s(this, c), d) {
                case 16:
                    for (e = 3 + r(this, 2); e--;) h[m++] = l;
                    break;
                case 17:
                    for (e = 3 + r(this, 3); e--;) h[m++] = 0;
                    l = 0;
                    break;
                case 18:
                    for (e = 11 + r(this, 7); e--;) h[m++] = 0;
                    l = 0;
                    break;
                default:
                    l = h[m++] = d
            }
            return h
        }
        var c = r(b, 5) + 257,
            d = r(b, 5) + 1,
            l = r(b, 4) + 4,
            e = new(t ? Uint8Array : Array)(K.length),
            m;
        for (m = 0; m < l; ++m) e[K[m]] = r(b, 3);
        l = h(e);
        e = new(t ? Uint8Array : Array)(c);
        m = new(t ? Uint8Array : Array)(d);
        b.o(h(a.call(b, c, l, e)), h(a.call(b, d, l, m)))
    }

    function A(b,
        a) {
        var h, d;
        this.input = b;
        this.c = 0;
        if (a || !(a = {})) a.index && (this.c = a.index), a.verify && (this.M = a.verify);
        h = b[this.c++];
        d = b[this.c++];
        switch (h & 15) {
            case O:
                this.method = O;
                break;
            default:
                c(Error("unsupported compression method"))
        }
        0 !== ((h << 8) + d) % 31 && c(Error("invalid fcheck flag:" + ((h << 8) + d) % 31));
        d & 32 && c(Error("fdict flag is not supported"));
        this.A = new q(b, {
            index: this.c,
            bufferSize: a.bufferSize,
            bufferType: a.bufferType,
            resize: a.resize
        })
    }
    var v = void 0,
        B = !0,
        C = this,
        t = "undefined" !== typeof Uint8Array && "undefined" !==
        typeof Uint16Array && "undefined" !== typeof Uint32Array;
    a.prototype.f = function() {
        var b = this.buffer,
            a, c = b.length,
            h = new(t ? Uint8Array : Array)(c << 1);
        if (t) h.set(b);
        else
            for (a = 0; a < c; ++a) h[a] = b[a];
        return this.buffer = h
    };
    a.prototype.d = function(b, a, c) {
        var h = this.buffer,
            d = this.index,
            l = this.i,
            e = h[d];
        c && 1 < a && (b = 8 < a ? (y[b & 255] << 24 | y[b >>> 8 & 255] << 16 | y[b >>> 16 & 255] << 8 | y[b >>> 24 & 255]) >> 32 - a : y[b] >> 8 - a);
        if (8 > a + l) e = e << a | b, l += a;
        else
            for (c = 0; c < a; ++c) e = e << 1 | b >> a - c - 1 & 1, 8 === ++l && (l = 0, h[d++] = y[e], e = 0, d === h.length && (h = this.f()));
        h[d] = e;
        this.buffer = h;
        this.i = l;
        this.index = d
    };
    a.prototype.finish = function() {
        var b = this.buffer,
            a = this.index,
            c;
        0 < this.i && (b[a] <<= 8 - this.i, b[a] = y[b[a]], a++);
        t ? c = b.subarray(0, a) : (b.length = a, c = b);
        return c
    };
    var u = new(t ? Uint8Array : Array)(256),
        D;
    for (D = 0; 256 > D; ++D) {
        for (var w = D, E = w, x = 7, w = w >>> 1; w; w >>>= 1) E <<= 1, E |= w & 1, --x;
        u[D] = (E << x & 255) >>> 0
    }
    var y = u,
        u = [0, 1996959894, 3993919788, 2567524794, 124634137, 1886057615, 3915621685, 2657392035, 249268274, 2044508324, 3772115230, 2547177864, 162941995, 2125561021, 3887607047, 2428444049,
            498536548, 1789927666, 4089016648, 2227061214, 450548861, 1843258603, 4107580753, 2211677639, 325883990, 1684777152, 4251122042, 2321926636, 335633487, 1661365465, 4195302755, 2366115317, 997073096, 1281953886, 3579855332, 2724688242, 1006888145, 1258607687, 3524101629, 2768942443, 901097722, 1119000684, 3686517206, 2898065728, 853044451, 1172266101, 3705015759, 2882616665, 651767980, 1373503546, 3369554304, 3218104598, 565507253, 1454621731, 3485111705, 3099436303, 671266974, 1594198024, 3322730930, 2970347812, 795835527, 1483230225, 3244367275,
            3060149565, 1994146192, 31158534, 2563907772, 4023717930, 1907459465, 112637215, 2680153253, 3904427059, 2013776290, 251722036, 2517215374, 3775830040, 2137656763, 141376813, 2439277719, 3865271297, 1802195444, 476864866, 2238001368, 4066508878, 1812370925, 453092731, 2181625025, 4111451223, 1706088902, 314042704, 2344532202, 4240017532, 1658658271, 366619977, 2362670323, 4224994405, 1303535960, 984961486, 2747007092, 3569037538, 1256170817, 1037604311, 2765210733, 3554079995, 1131014506, 879679996, 2909243462, 3663771856, 1141124467, 855842277,
            2852801631, 3708648649, 1342533948, 654459306, 3188396048, 3373015174, 1466479909, 544179635, 3110523913, 3462522015, 1591671054, 702138776, 2966460450, 3352799412, 1504918807, 783551873, 3082640443, 3233442989, 3988292384, 2596254646, 62317068, 1957810842, 3939845945, 2647816111, 81470997, 1943803523, 3814918930, 2489596804, 225274430, 2053790376, 3826175755, 2466906013, 167816743, 2097651377, 4027552580, 2265490386, 503444072, 1762050814, 4150417245, 2154129355, 426522225, 1852507879, 4275313526, 2312317920, 282753626, 1742555852, 4189708143,
            2394877945, 397917763, 1622183637, 3604390888, 2714866558, 953729732, 1340076626, 3518719985, 2797360999, 1068828381, 1219638859, 3624741850, 2936675148, 906185462, 1090812512, 3747672003, 2825379669, 829329135, 1181335161, 3412177804, 3160834842, 628085408, 1382605366, 3423369109, 3138078467, 570562233, 1426400815, 3317316542, 2998733608, 733239954, 1555261956, 3268935591, 3050360625, 752459403, 1541320221, 2607071920, 3965973030, 1969922972, 40735498, 2617837225, 3943577151, 1913087877, 83908371, 2512341634, 3803740692, 2075208622, 213261112,
            2463272603, 3855990285, 2094854071, 198958881, 2262029012, 4057260610, 1759359992, 534414190, 2176718541, 4139329115, 1873836001, 414664567, 2282248934, 4279200368, 1711684554, 285281116, 2405801727, 4167216745, 1634467795, 376229701, 2685067896, 3608007406, 1308918612, 956543938, 2808555105, 3495958263, 1231636301, 1047427035, 2932959818, 3654703836, 1088359270, 936918E3, 2847714899, 3736837829, 1202900863, 817233897, 3183342108, 3401237130, 1404277552, 615818150, 3134207493, 3453421203, 1423857449, 601450431, 3009837614, 3294710456, 1567103746,
            711928724, 3020668471, 3272380065, 1510334235, 755167117
        ];
    t && new Uint32Array(u);
    b.prototype.getParent = function(b) {
        return 2 * ((b - 2) / 4 | 0)
    };
    b.prototype.push = function(b, a) {
        var c, h, d = this.buffer,
            l;
        c = this.length;
        d[this.length++] = a;
        for (d[this.length++] = b; 0 < c;)
            if (h = this.getParent(c), d[c] > d[h]) l = d[c], d[c] = d[h], d[h] = l, l = d[c + 1], d[c + 1] = d[h + 1], d[h + 1] = l, c = h;
            else break;
        return this.length
    };
    b.prototype.pop = function() {
        var b, a, c = this.buffer,
            h, d, l;
        a = c[0];
        b = c[1];
        this.length -= 2;
        c[0] = c[this.length];
        c[1] = c[this.length + 1];
        for (l =
            0;;) {
            d = 2 * l + 2;
            if (d >= this.length) break;
            d + 2 < this.length && c[d + 2] > c[d] && (d += 2);
            if (c[d] > c[l]) h = c[l], c[l] = c[d], c[d] = h, h = c[l + 1], c[l + 1] = c[d + 1], c[d + 1] = h;
            else break;
            l = d
        }
        return {
            index: b,
            value: a,
            length: this.length
        }
    };
    var H = 2,
        u = {
            NONE: 0,
            r: 1,
            j: H,
            N: 3
        },
        L = [];
    for (D = 0; 288 > D; D++) switch (B) {
        case 143 >= D:
            L.push([D + 48, 8]);
            break;
        case 255 >= D:
            L.push([D - 144 + 400, 9]);
            break;
        case 279 >= D:
            L.push([D - 256 + 0, 7]);
            break;
        case 287 >= D:
            L.push([D - 280 + 192, 8]);
            break;
        default:
            c("invalid literal: " + D)
    }
    l.prototype.n = function() {
        var b, h, d, l, e = this.input;
        switch (this.h) {
            case 0:
                d = 0;
                for (l = e.length; d < l;) {
                    h = t ? e.subarray(d, d + 65535) : e.slice(d, d + 65535);
                    d += h.length;
                    var m = d === l,
                        f = v,
                        p = f = v,
                        p = f = v,
                        q = this.a,
                        r = this.b;
                    if (t) {
                        for (q = new Uint8Array(this.a.buffer); q.length <= r + h.length + 5;) q = new Uint8Array(q.length << 1);
                        q.set(this.a)
                    }
                    f = m ? 1 : 0;
                    q[r++] = f | 0;
                    f = h.length;
                    p = ~f + 65536 & 65535;
                    q[r++] = f & 255;
                    q[r++] = f >>> 8 & 255;
                    q[r++] = p & 255;
                    q[r++] = p >>> 8 & 255;
                    if (t) q.set(h, r), r += h.length, q = q.subarray(0, r);
                    else {
                        f = 0;
                        for (p = h.length; f < p; ++f) q[r++] = h[f];
                        q.length = r
                    }
                    this.b = r;
                    this.a = q
                }
                break;
            case 1:
                d =
                    new a(new Uint8Array(this.a.buffer), this.b);
                d.d(1, 1, B);
                d.d(1, 2, B);
                e = g(this, e);
                h = 0;
                for (m = e.length; h < m; h++)
                    if (l = e[h], a.prototype.d.apply(d, L[l]), 256 < l) d.d(e[++h], e[++h], B), d.d(e[++h], 5), d.d(e[++h], e[++h], B);
                    else if (256 === l) break;
                this.a = d.finish();
                this.b = this.a.length;
                break;
            case H:
                l = new a(new Uint8Array(this.a), this.b);
                var s, w, z, A = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15],
                    D, E, f = Array(19),
                    x, q = H;
                l.d(1, 1, B);
                l.d(q, 2, B);
                e = g(this, e);
                p = k(this.L, 15);
                D = n(p);
                q = k(this.K, 7);
                r = n(q);
                for (s = 286; 257 < s && 0 === p[s -
                    1]; s--);
                for (w = 30; 1 < w && 0 === q[w - 1]; w--);
                var y = s,
                    u = w;
                b = new(t ? Uint32Array : Array)(y + u);
                var C = new(t ? Uint32Array : Array)(316),
                    G, F;
                E = new(t ? Uint8Array : Array)(19);
                for (x = z = 0; x < y; x++) b[z++] = p[x];
                for (x = 0; x < u; x++) b[z++] = q[x];
                if (!t)
                    for (x = 0, u = E.length; x < u; ++x) E[x] = 0;
                x = G = 0;
                for (u = b.length; x < u; x += z) {
                    for (z = 1; x + z < u && b[x + z] === b[x]; ++z);
                    y = z;
                    if (0 === b[x])
                        if (3 > y)
                            for (; 0 < y--;) C[G++] = 0, E[0]++;
                        else
                            for (; 0 < y;) F = 138 > y ? y : 138, F > y - 3 && F < y && (F = y - 3), 10 >= F ? (C[G++] = 17, C[G++] = F - 3, E[17]++) : (C[G++] = 18, C[G++] = F - 11, E[18]++), y -= F;
                    else if (C[G++] =
                        b[x], E[b[x]]++, y--, 3 > y)
                        for (; 0 < y--;) C[G++] = b[x], E[b[x]]++;
                    else
                        for (; 0 < y;) F = 6 > y ? y : 6, F > y - 3 && F < y && (F = y - 3), C[G++] = 16, C[G++] = F - 3, E[16]++, y -= F
                }
                b = t ? C.subarray(0, G) : C.slice(0, G);
                E = k(E, 7);
                for (x = 0; 19 > x; x++) f[x] = E[A[x]];
                for (z = 19; 4 < z && 0 === f[z - 1]; z--);
                A = n(E);
                l.d(s - 257, 5, B);
                l.d(w - 1, 5, B);
                l.d(z - 4, 4, B);
                for (x = 0; x < z; x++) l.d(f[x], 3, B);
                x = 0;
                for (f = b.length; x < f; x++)
                    if (h = b[x], l.d(A[h], E[h], B), 16 <= h) {
                        x++;
                        switch (h) {
                            case 16:
                                m = 2;
                                break;
                            case 17:
                                m = 3;
                                break;
                            case 18:
                                m = 7;
                                break;
                            default:
                                c("invalid code: " + h)
                        }
                        l.d(b[x], m, B)
                    }
                m = [D, p];
                r = [r,
                    q
                ];
                h = m[0];
                m = m[1];
                q = r[0];
                D = r[1];
                r = 0;
                for (f = e.length; r < f; ++r)
                    if (d = e[r], l.d(h[d], m[d], B), 256 < d) l.d(e[++r], e[++r], B), p = e[++r], l.d(q[p], D[p], B), l.d(e[++r], e[++r], B);
                    else if (256 === d) break;
                this.a = l.finish();
                this.b = this.a.length;
                break;
            default:
                c("invalid compression type")
        }
        return this.a
    };
    D = [];
    var G;
    for (G = 3; 258 >= G; G++) w = f(), D[G] = w[2] << 24 | w[1] << 16 | w[0];
    var M = t ? new Uint32Array(D) : D,
        J = u;
    p.prototype.n = function() {
        var b, a, h, l, e = 0;
        l = this.a;
        b = O;
        switch (b) {
            case O:
                a = Math.LOG2E * Math.log(32768) - 8;
                break;
            default:
                c(Error("invalid compression method"))
        }
        a =
            a << 4 | b;
        l[e++] = a;
        switch (b) {
            case O:
                switch (this.h) {
                    case J.NONE:
                        h = 0;
                        break;
                    case J.r:
                        h = 1;
                        break;
                    case J.j:
                        h = 2;
                        break;
                    default:
                        c(Error("unsupported compression type"))
                }
                break;
            default:
                c(Error("invalid compression method"))
        }
        b = h << 6 | 0;
        l[e++] = b | 31 - (256 * a + b) % 31;
        b = d(this.input);
        this.z.b = e;
        l = this.z.n();
        e = l.length;
        t && (l = new Uint8Array(l.buffer), l.length <= e + 4 && (this.a = new Uint8Array(l.length + 4), this.a.set(l), l = this.a), l = l.subarray(0, e + 4));
        l[e++] = b >> 24 & 255;
        l[e++] = b >> 16 & 255;
        l[e++] = b >> 8 & 255;
        l[e++] = b & 255;
        return l
    };
    e("Zlib.Deflate",
        p);
    e("Zlib.Deflate.compress", function(b, a) {
        return (new p(b, a)).n()
    });
    e("Zlib.Deflate.CompressionType", J);
    e("Zlib.Deflate.CompressionType.NONE", J.NONE);
    e("Zlib.Deflate.CompressionType.FIXED", J.r);
    e("Zlib.Deflate.CompressionType.DYNAMIC", J.j);
    var N = 0,
        F = 1,
        u = {
            D: N,
            C: F
        };
    q.prototype.p = function() {
        for (; !this.s;) {
            var b = r(this, 3);
            b & 1 && (this.s = B);
            b >>>= 1;
            switch (b) {
                case 0:
                    var b = this.input,
                        a = this.c,
                        h = this.a,
                        d = this.b,
                        l = v,
                        e = v,
                        m = v,
                        f = h.length,
                        l = v;
                    this.e = this.g = 0;
                    l = b[a++];
                    l === v && c(Error("invalid uncompressed block header: LEN (first byte)"));
                    e = l;
                    l = b[a++];
                    l === v && c(Error("invalid uncompressed block header: LEN (second byte)"));
                    e |= l << 8;
                    l = b[a++];
                    l === v && c(Error("invalid uncompressed block header: NLEN (first byte)"));
                    m = l;
                    l = b[a++];
                    l === v && c(Error("invalid uncompressed block header: NLEN (second byte)"));
                    m |= l << 8;
                    e === ~m && c(Error("invalid uncompressed block header: length verify"));
                    a + e > b.length && c(Error("input buffer is broken"));
                    switch (this.m) {
                        case N:
                            for (; d + e > h.length;) {
                                l = f - d;
                                e -= l;
                                if (t) h.set(b.subarray(a, a + l), d), d += l, a += l;
                                else
                                    for (; l--;) h[d++] =
                                        b[a++];
                                this.b = d;
                                h = this.f();
                                d = this.b
                            }
                            break;
                        case F:
                            for (; d + e > h.length;) h = this.f({
                                v: 2
                            });
                            break;
                        default:
                            c(Error("invalid inflate mode"))
                    }
                    if (t) h.set(b.subarray(a, a + e), d), d += e, a += e;
                    else
                        for (; e--;) h[d++] = b[a++];
                    this.c = a;
                    this.b = d;
                    this.a = h;
                    break;
                case 1:
                    this.o(S, T);
                    break;
                case 2:
                    z(this);
                    break;
                default:
                    c(Error("unknown BTYPE: " + b))
            }
        }
        return this.t()
    };
    D = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
    var K = t ? new Uint16Array(D) : D;
    D = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227,
        258, 258, 258
    ];
    var I = t ? new Uint16Array(D) : D;
    D = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 0, 0];
    var P = t ? new Uint8Array(D) : D;
    D = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577];
    var R = t ? new Uint16Array(D) : D;
    D = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13];
    var Q = t ? new Uint8Array(D) : D;
    D = new(t ? Uint8Array : Array)(288);
    w = 0;
    for (E = D.length; w < E; ++w) D[w] = 143 >= w ? 8 : 255 >= w ? 9 : 279 >= w ? 7 : 8;
    var S = h(D);
    D = new(t ? Uint8Array :
        Array)(30);
    w = 0;
    for (E = D.length; w < E; ++w) D[w] = 5;
    var T = h(D);
    q.prototype.o = function(b, a) {
        var c = this.a,
            h = this.b;
        this.u = b;
        for (var d = c.length - 258, l, e, m; 256 !== (l = s(this, b));)
            if (256 > l) h >= d && (this.b = h, c = this.f(), h = this.b), c[h++] = l;
            else
                for (l -= 257, m = I[l], 0 < P[l] && (m += r(this, P[l])), l = s(this, a), e = R[l], 0 < Q[l] && (e += r(this, Q[l])), h >= d && (this.b = h, c = this.f(), h = this.b); m--;) c[h] = c[h++-e];
        for (; 8 <= this.e;) this.e -= 8, this.c--;
        this.b = h
    };
    q.prototype.I = function(b, a) {
        var c = this.a,
            h = this.b;
        this.u = b;
        for (var d = c.length, l, e, m; 256 !==
            (l = s(this, b));)
            if (256 > l) h >= d && (c = this.f(), d = c.length), c[h++] = l;
            else
                for (l -= 257, m = I[l], 0 < P[l] && (m += r(this, P[l])), l = s(this, a), e = R[l], 0 < Q[l] && (e += r(this, Q[l])), h + m > d && (c = this.f(), d = c.length); m--;) c[h] = c[h++-e];
        for (; 8 <= this.e;) this.e -= 8, this.c--;
        this.b = h
    };
    q.prototype.f = function() {
        var b = new(t ? Uint8Array : Array)(this.b - 32768),
            a = this.b - 32768,
            c, h, d = this.a;
        if (t) b.set(d.subarray(32768, b.length));
        else
            for (c = 0, h = b.length; c < h; ++c) b[c] = d[c + 32768];
        this.k.push(b);
        this.q += b.length;
        if (t) d.set(d.subarray(a, a + 32768));
        else
            for (c = 0; 32768 > c; ++c) d[c] = d[a + c];
        this.b = 32768;
        return d
    };
    q.prototype.J = function(b) {
        var a, c = this.input.length / this.c + 1 | 0,
            h, d, l, e = this.input,
            m = this.a;
        b && ("number" === typeof b.v && (c = b.v), "number" === typeof b.F && (c += b.F));
        2 > c ? (h = (e.length - this.c) / this.u[2], l = h / 2 * 258 | 0, d = l < m.length ? m.length + l : m.length << 1) : d = m.length * c;
        t ? (a = new Uint8Array(d), a.set(m)) : a = m;
        return this.a = a
    };
    q.prototype.t = function() {
        var b = 0,
            a = this.a,
            c = this.k,
            h, d = new(t ? Uint8Array : Array)(this.q + (this.b - 32768)),
            l, e, m, f;
        if (0 === c.length) return t ?
            this.a.subarray(32768, this.b) : this.a.slice(32768, this.b);
        l = 0;
        for (e = c.length; l < e; ++l)
            for (h = c[l], m = 0, f = h.length; m < f; ++m) d[b++] = h[m];
        l = 32768;
        for (e = this.b; l < e; ++l) d[b++] = a[l];
        this.k = [];
        return this.buffer = d
    };
    q.prototype.H = function() {
        var b, a = this.b;
        t ? this.B ? (b = new Uint8Array(a), b.set(this.a.subarray(0, a))) : b = this.a.subarray(0, a) : (this.a.length > a && (this.a.length = a), b = this.a);
        return this.buffer = b
    };
    A.prototype.p = function() {
        var b = this.input,
            a, h;
        a = this.A.p();
        this.c = this.A.c;
        this.M && (h = (b[this.c++] << 24 | b[this.c++] <<
            16 | b[this.c++] << 8 | b[this.c++]) >>> 0, h !== d(a) && c(Error("invalid adler-32 checksum")));
        return a
    };
    e("Zlib.Inflate", A);
    e("Zlib.Inflate.BufferType", u);
    u.ADAPTIVE = u.C;
    u.BLOCK = u.D;
    e("Zlib.Inflate.prototype.decompress", A.prototype.p);
    u = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
    t && new Uint16Array(u);
    u = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 258, 258];
    t && new Uint16Array(u);
    u = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 0, 0];
    t && new Uint8Array(u);
    u = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577];
    t && new Uint16Array(u);
    u = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13];
    t && new Uint8Array(u);
    u = new(t ? Uint8Array : Array)(288);
    D = 0;
    for (w = u.length; D < w; ++D) u[D] = 143 >= D ? 8 : 255 >= D ? 9 : 279 >= D ? 7 : 8;
    h(u);
    u = new(t ? Uint8Array : Array)(30);
    D = 0;
    for (w = u.length; D < w; ++D) u[D] = 5;
    h(u);
    var O = 8
}).call(this);
(function(c) {
    var e = function() {
        function d() {}
        d.parse = function(a) {
            a = c.SAXParser.getInstance().parserXML(a);
            if (!a || !a.childNodes) return null;
            for (var b = a.childNodes.length, h = !1, l = 0; l < b; l++) {
                var e = a.childNodes[l];
                if (1 == e.nodeType) {
                    h = !0;
                    break
                }
            }
            return h ? d.parseNode(e) : null
        };
        d.parseNode = function(a) {
            if (!a || 1 != a.nodeType) return null;
            var b = {};
            b.localName = a.localName;
            b.name = a.nodeName;
            a.namespaceURI && (b.namespace = a.namespaceURI);
            a.prefix && (b.prefix = a.prefix);
            for (var c = a.attributes, l = c.length, e = 0; e < l; e++) {
                var f =
                    c[e],
                    g = f.name;
                0 != g.indexOf("xmlns:") && (b["$" + g] = f.value)
            }
            c = a.childNodes;
            l = c.length;
            for (e = 0; e < l; e++)
                if (f = d.parseNode(c[e])) b.children || (b.children = []), f.parent = b, b.children.push(f);
                !b.children && (a = a.textContent.trim()) && (b.text = a);
            return b
        };
        d.findChildren = function(a, b, c) {
            c ? c.length = 0 : c = [];
            d.findByPath(a, b, c);
            return c
        };
        d.findByPath = function(a, b, c) {
            var l = b.indexOf("."),
                e; - 1 == l ? (e = b, l = !0) : (e = b.substring(0, l), b = b.substring(l + 1), l = !1);
            if (a = a.children)
                for (var f = a.length, g = 0; g < f; g++) {
                    var k = a[g];
                    k.localName ==
                        e && (l ? c.push(k) : d.findByPath(k, b, c))
                }
        };
        d.getAttributes = function(a, b) {
            b ? b.length = 0 : b = [];
            for (var c in a) "$" == c.charAt(0) && b.push(c.substring(1));
            return b
        };
        return d
    }();
    c.XML = e
})(egret || (egret = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(d) {
        function a(b, a, c) {
            d.call(this);
            this._target = null;
            this.loop = this.ignoreGlobalPause = this._useTicks = !1;
            this._actions = this._steps = this.pluginData = null;
            this.paused = !1;
            this.duration = 0;
            this._prevPos = -1;
            this.position = null;
            this._stepPosition = this._prevPosition = 0;
            this.passive = !1;
            this.initialize(b, a, c)
        }
        __extends(a, d);
        a.get = function(b, c, d, e) {
            "undefined" === typeof c && (c = null);
            "undefined" === typeof d && (d = null);
            "undefined" === typeof e && (e = !1);
            e && a.removeTweens(b);
            return new a(b, c, d)
        };
        a.removeTweens = function(b) {
            if (b.tween_count) {
                for (var c = a._tweens, d = c.length - 1; 0 <= d; d--) c[d]._target == b && (c[d].paused = !0, c.splice(d, 1));
                b.tween_count = 0
            }
        };
        a.tick = function(b, c) {
            "undefined" === typeof c && (c = !1);
            for (var d = a._tweens.concat(), e = d.length - 1; 0 <= e; e--) {
                var f = d[e];
                c && !f.ignoreGlobalPause || f.paused || f.tick(f._useTicks ? 1 : b)
            }
        };
        a._register = function(b, h) {
            var d = b._target,
                e = a._tweens;
            if (h) d && (d.tween_count = d.tween_count ? d.tween_count + 1 : 1), e.push(b), a._inited || (c.Ticker.getInstance().register(a.tick, null),
                a._inited = !0);
            else
                for (d && d.tween_count--, d = e.length; d--;)
                    if (e[d] == b) {
                        e.splice(d, 1);
                        break
                    }
        };
        a.removeAllTweens = function() {
            for (var b = a._tweens, c = 0, d = b.length; c < d; c++) {
                var e = b[c];
                e.paused = !0;
                e._target.tweenjs_count = 0
            }
            b.length = 0
        };
        a.prototype.initialize = function(b, c, d) {
            this._target = b;
            c && (this._useTicks = c.useTicks, this.ignoreGlobalPause = c.ignoreGlobalPause, this.loop = c.loop, c.onChange && this.addEventListener("change", c.onChange, c.onChangeObj), c.override && a.removeTweens(b));
            this.pluginData = d || {};
            this._curQueueProps = {};
            this._initQueueProps = {};
            this._steps = [];
            this._actions = [];
            c && c.paused ? this.paused = !0 : a._register(this, !0);
            c && null != c.position && this.setPosition(c.position, a.NONE)
        };
        a.prototype.setPosition = function(b, a) {
            "undefined" === typeof a && (a = 1);
            0 > b && (b = 0);
            var c = b,
                d = !1;
            c >= this.duration && (this.loop ? c %= this.duration : (c = this.duration, d = !0));
            if (c == this._prevPos) return d;
            var e = this._prevPos;
            this.position = this._prevPos = c;
            this._prevPosition = b;
            if (this._target)
                if (d) this._updateTargetProps(null, 1);
                else if (0 < this._steps.length) {
                for (var g =
                    0, k = this._steps.length; g < k && !(this._steps[g].t > c); g++);
                g = this._steps[g - 1];
                this._updateTargetProps(g, (this._stepPosition = c - g.t) / g.d)
            }
            0 != a && 0 < this._actions.length && (this._useTicks ? this._runActions(c, c) : 1 == a && c < e ? (e != this.duration && this._runActions(e, this.duration), this._runActions(0, c, !0)) : this._runActions(e, c));
            d && this.setPaused(!0);
            this.dispatchEventWith("change");
            return d
        };
        a.prototype._runActions = function(b, a, c) {
            "undefined" === typeof c && (c = !1);
            var d = b,
                e = a,
                g = -1,
                k = this._actions.length,
                n = 1;
            b > a && (d = a,
                e = b, g = k, k = n = -1);
            for (;
                (g += n) != k;) {
                a = this._actions[g];
                var p = a.t;
                (p == e || p > d && p < e || c && p == b) && a.f.apply(a.o, a.p)
            }
        };
        a.prototype._updateTargetProps = function(b, c) {
            var d, e, f, g;
            if (b || 1 != c) {
                if (this.passive = !!b.v) return;
                b.e && (c = b.e(c, 0, 1, 1));
                d = b.p0;
                e = b.p1
            } else this.passive = !1, d = e = this._curQueueProps;
            for (var k in this._initQueueProps) {
                null == (f = d[k]) && (d[k] = f = this._initQueueProps[k]);
                null == (g = e[k]) && (e[k] = g = f);
                f = f == g || 0 == c || 1 == c || "number" != typeof f ? 1 == c ? g : f : f + (g - f) * c;
                var n = !1;
                if (g = a._plugins[k])
                    for (var p = 0, q = g.length; p <
                        q; p++) {
                        var r = g[p].tween(this, k, f, d, e, c, !!b && d == e, !b);
                        r == a.IGNORE ? n = !0 : f = r
                    }
                n || (this._target[k] = f)
            }
        };
        a.prototype.setPaused = function(b) {
            this.paused = b;
            a._register(this, !b);
            return this
        };
        a.prototype._cloneProps = function(b) {
            var a = {},
                c;
            for (c in b) a[c] = b[c];
            return a
        };
        a.prototype._addStep = function(b) {
            0 < b.d && (this._steps.push(b), b.t = this.duration, this.duration += b.d);
            return this
        };
        a.prototype._appendQueueProps = function(b) {
            var c, d, e, f, g, k;
            for (k in b)
                if (void 0 === this._initQueueProps[k]) {
                    d = this._target[k];
                    if (c = a._plugins[k])
                        for (e =
                            0, f = c.length; e < f; e++) d = c[e].init(this, k, d);
                    this._initQueueProps[k] = this._curQueueProps[k] = void 0 === d ? null : d
                }
            for (k in b) {
                d = this._curQueueProps[k];
                if (c = a._plugins[k])
                    for (g = g || {}, e = 0, f = c.length; e < f; e++) c[e].step && c[e].step(this, k, d, b[k], g);
                this._curQueueProps[k] = b[k]
            }
            g && this._appendQueueProps(g);
            return this._curQueueProps
        };
        a.prototype._addAction = function(b) {
            b.t = this.duration;
            this._actions.push(b);
            return this
        };
        a.prototype._set = function(b, a) {
            for (var c in b) a[c] = b[c]
        };
        a.prototype.wait = function(b, a) {
            "undefined" ===
            typeof a && (a = !1);
            if (null == b || 0 >= b) return this;
            var c = this._cloneProps(this._curQueueProps);
            return this._addStep({
                d: b,
                p0: c,
                p1: c,
                v: a
            })
        };
        a.prototype.to = function(b, a, c) {
            "undefined" === typeof c && (c = void 0);
            if (isNaN(a) || 0 > a) a = 0;
            return this._addStep({
                d: a || 0,
                p0: this._cloneProps(this._curQueueProps),
                e: c,
                p1: this._cloneProps(this._appendQueueProps(b))
            })
        };
        a.prototype.call = function(b, a, c) {
            "undefined" === typeof a && (a = void 0);
            "undefined" === typeof c && (c = void 0);
            return this._addAction({
                f: b,
                p: c ? c : [this],
                o: a ? a : this._target
            })
        };
        a.prototype.set = function(b, a) {
            "undefined" === typeof a && (a = null);
            return this._addAction({
                f: this._set,
                o: this,
                p: [b, a ? a : this._target]
            })
        };
        a.prototype.play = function(b) {
            b || (b = this);
            return this.call(b.setPaused, [!1], b)
        };
        a.prototype.pause = function(b) {
            b || (b = this);
            return this.call(b.setPaused, [!0], b)
        };
        a.prototype.tick = function(b) {
            this.paused || this.setPosition(this._prevPosition + b)
        };
        a.NONE = 0;
        a.LOOP = 1;
        a.REVERSE = 2;
        a._tweens = [];
        a.IGNORE = {};
        a._plugins = {};
        a._inited = !1;
        return a
    }(c.EventDispatcher);
    c.Tween = e
})(egret ||
    (egret = {}));
(function(c) {
    var e = function() {
        function d() {
            c.Logger.fatal("Ease\u4e0d\u80fd\u88ab\u5b9e\u4f8b\u5316")
        }
        d.get = function(a) {
            -1 > a && (a = -1);
            1 < a && (a = 1);
            return function(b) {
                return 0 == a ? b : 0 > a ? b * (b * -a + 1 + a) : b * ((2 - b) * a + (1 - a))
            }
        };
        d.getPowIn = function(a) {
            return function(b) {
                return Math.pow(b, a)
            }
        };
        d.getPowOut = function(a) {
            return function(b) {
                return 1 - Math.pow(1 - b, a)
            }
        };
        d.getPowInOut = function(a) {
            return function(b) {
                return 1 > (b *= 2) ? 0.5 * Math.pow(b, a) : 1 - 0.5 * Math.abs(Math.pow(2 - b, a))
            }
        };
        d.sineIn = function(a) {
            return 1 - Math.cos(a *
                Math.PI / 2)
        };
        d.sineOut = function(a) {
            return Math.sin(a * Math.PI / 2)
        };
        d.sineInOut = function(a) {
            return -0.5 * (Math.cos(Math.PI * a) - 1)
        };
        d.getBackIn = function(a) {
            return function(b) {
                return b * b * ((a + 1) * b - a)
            }
        };
        d.getBackOut = function(a) {
            return function(b) {
                b -= 1;
                return b * b * ((a + 1) * b + a) + 1
            }
        };
        d.getBackInOut = function(a) {
            a *= 1.525;
            return function(b) {
                return 1 > (b *= 2) ? 0.5 * b * b * ((a + 1) * b - a) : 0.5 * ((b -= 2) * b * ((a + 1) * b + a) + 2)
            }
        };
        d.circIn = function(a) {
            return -(Math.sqrt(1 - a * a) - 1)
        };
        d.circOut = function(a) {
            return Math.sqrt(1 - a * a)
        };
        d.circInOut = function(a) {
            return 1 >
                (a *= 2) ? -0.5 * (Math.sqrt(1 - a * a) - 1) : 0.5 * (Math.sqrt(1 - (a -= 2) * a) + 1)
        };
        d.bounceIn = function(a) {
            return 1 - d.bounceOut(1 - a)
        };
        d.bounceOut = function(a) {
            return a < 1 / 2.75 ? 7.5625 * a * a : a < 2 / 2.75 ? 7.5625 * (a -= 1.5 / 2.75) * a + 0.75 : a < 2.5 / 2.75 ? 7.5625 * (a -= 2.25 / 2.75) * a + 0.9375 : 7.5625 * (a -= 2.625 / 2.75) * a + 0.984375
        };
        d.bounceInOut = function(a) {
            return 0.5 > a ? 0.5 * d.bounceIn(2 * a) : 0.5 * d.bounceOut(2 * a - 1) + 0.5
        };
        d.getElasticIn = function(a, b) {
            var c = 2 * Math.PI;
            return function(d) {
                if (0 == d || 1 == d) return d;
                var e = b / c * Math.asin(1 / a);
                return -(a * Math.pow(2, 10 *
                    (d -= 1)) * Math.sin((d - e) * c / b))
            }
        };
        d.getElasticOut = function(a, b) {
            var c = 2 * Math.PI;
            return function(d) {
                if (0 == d || 1 == d) return d;
                var e = b / c * Math.asin(1 / a);
                return a * Math.pow(2, -10 * d) * Math.sin((d - e) * c / b) + 1
            }
        };
        d.getElasticInOut = function(a, b) {
            var c = 2 * Math.PI;
            return function(d) {
                var e = b / c * Math.asin(1 / a);
                return 1 > (d *= 2) ? -0.5 * a * Math.pow(2, 10 * (d -= 1)) * Math.sin((d - e) * c / b) : a * Math.pow(2, -10 * (d -= 1)) * Math.sin((d - e) * c / b) * 0.5 + 1
            }
        };
        d.quadIn = d.getPowIn(2);
        d.quadOut = d.getPowOut(2);
        d.quadInOut = d.getPowInOut(2);
        d.cubicIn = d.getPowIn(3);
        d.cubicOut = d.getPowOut(3);
        d.cubicInOut = d.getPowInOut(3);
        d.quartIn = d.getPowIn(4);
        d.quartOut = d.getPowOut(4);
        d.quartInOut = d.getPowInOut(4);
        d.quintIn = d.getPowIn(5);
        d.quintOut = d.getPowOut(5);
        d.quintInOut = d.getPowInOut(5);
        d.backIn = d.getBackIn(1.7);
        d.backOut = d.getBackOut(1.7);
        d.backInOut = d.getBackInOut(1.7);
        d.elasticIn = d.getElasticIn(1, 0.3);
        d.elasticOut = d.getElasticOut(1, 0.3);
        d.elasticInOut = d.getElasticInOut(1, 0.3 * 1.5);
        return d
    }();
    c.Ease = e
})(egret || (egret = {}));
(function(c) {
    var e = function() {
        function c() {}
        c.prototype.play = function(a) {
            "undefined" === typeof a && (a = !1);
            var b = this.audio;
            b && (isNaN(b.duration) || (b.currentTime = 0), b.loop = a, b.play())
        };
        c.prototype.pause = function() {
            var a = this.audio;
            a && a.pause()
        };
        c.prototype.load = function() {
            var a = this.audio;
            a && a.load()
        };
        c.prototype.addEventListener = function(a, b) {
            this.audio && this.audio.addEventListener(a, b, !1)
        };
        c.prototype.removeEventListener = function(a, b) {
            this.audio && this.audio.removeEventListener(a, b, !1)
        };
        c.prototype.setVolume =
            function(a) {
                var b = this.audio;
                b && (b.volume = a)
            };
        c.prototype.getVolume = function() {
            return this.audio ? this.audio.volume : 0
        };
        return c
    }();
    c.Sound = e
})(egret || (egret = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(d) {
        function a(b) {
            "undefined" === typeof b && (b = null);
            d.call(this);
            this._source = b ? b : []
        }
        __extends(a, d);
        Object.defineProperty(a.prototype, "source", {
            get: function() {
                return this._source
            },
            set: function(b) {
                b || (b = []);
                this._source = b;
                this.dispatchCoEvent(c.CollectionEventKind.RESET)
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype.refresh = function() {
            this.dispatchCoEvent(c.CollectionEventKind.REFRESH)
        };
        a.prototype.contains = function(b) {
            return -1 != this.getItemIndex(b)
        };
        a.prototype.checkIndex =
            function(b) {
                if (0 > b || b >= this._source.length) throw new RangeError('\u7d22\u5f15:"' + b + '"\u8d85\u51fa\u96c6\u5408\u5143\u7d20\u7d22\u5f15\u8303\u56f4');
            };
        Object.defineProperty(a.prototype, "length", {
            get: function() {
                return this._source.length
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype.addItem = function(b) {
            this._source.push(b);
            this.dispatchCoEvent(c.CollectionEventKind.ADD, this._source.length - 1, -1, [b])
        };
        a.prototype.addItemAt = function(b, a) {
            if (0 > a || a > this._source.length) throw new RangeError('\u7d22\u5f15:"' +
                a + '"\u8d85\u51fa\u96c6\u5408\u5143\u7d20\u7d22\u5f15\u8303\u56f4');
            this._source.splice(a, 0, b);
            this.dispatchCoEvent(c.CollectionEventKind.ADD, a, -1, [b])
        };
        a.prototype.getItemAt = function(b) {
            return this._source[b]
        };
        a.prototype.getItemIndex = function(b) {
            for (var a = this._source.length, c = 0; c < a; c++)
                if (this._source[c] === b) return c;
            return -1
        };
        a.prototype.itemUpdated = function(b) {
            var a = this.getItemIndex(b); - 1 != a && this.dispatchCoEvent(c.CollectionEventKind.UPDATE, a, -1, [b])
        };
        a.prototype.removeAll = function() {
            var b =
                this._source.concat();
            this._source.length = 0;
            this.dispatchCoEvent(c.CollectionEventKind.REMOVE, 0, -1, b)
        };
        a.prototype.removeItemAt = function(b) {
            this.checkIndex(b);
            var a = this._source.splice(b, 1)[0];
            this.dispatchCoEvent(c.CollectionEventKind.REMOVE, b, -1, [a]);
            return a
        };
        a.prototype.replaceItemAt = function(b, a) {
            this.checkIndex(a);
            var d = this._source.splice(a, 1, b)[0];
            this.dispatchCoEvent(c.CollectionEventKind.REPLACE, a, -1, [b], [d]);
            return d
        };
        a.prototype.replaceAll = function(b) {
            b || (b = []);
            for (var a = b.length, c = this._source.length,
                d = a; d < c; d++) this.removeItemAt(a);
            for (d = 0; d < a; d++) d >= c ? this.addItemAt(b[d], d) : this.replaceItemAt(b[d], d);
            this._source = b
        };
        a.prototype.moveItemAt = function(b, a) {
            this.checkIndex(b);
            this.checkIndex(a);
            var d = this._source.splice(b, 1)[0];
            this._source.splice(a, 0, d);
            this.dispatchCoEvent(c.CollectionEventKind.MOVE, a, b, [d]);
            return d
        };
        a.prototype.dispatchCoEvent = function(b, a, d, e, f) {
            "undefined" === typeof b && (b = null);
            "undefined" === typeof a && (a = -1);
            "undefined" === typeof d && (d = -1);
            "undefined" === typeof e && (e = null);
            "undefined" ===
            typeof f && (f = null);
            c.CollectionEvent.dispatchCollectionEvent(this, c.CollectionEvent.COLLECTION_CHANGE, b, a, d, e, f)
        };
        return a
    }(c.EventDispatcher);
    c.ArrayCollection = e
})(egret || (egret = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(d) {
        function a(b, a) {
            "undefined" === typeof b && (b = "children");
            "undefined" === typeof a && (a = "parent");
            d.call(this);
            this.nodeList = [];
            this._openNodes = [];
            this._showRoot = !1;
            this.childrenKey = b;
            this.parentKey = a
        }
        __extends(a, d);
        Object.defineProperty(a.prototype, "source", {
            get: function() {
                return this._source
            },
            set: function(b) {
                this._source = b;
                this._openNodes = [];
                this.nodeList = [];
                this._source && (this._showRoot ? this.nodeList.push(this._source) : (this._openNodes = [this._source], this.addChildren(this._source,
                    this.nodeList)));
                this.dispatchCoEvent(c.CollectionEventKind.RESET)
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "openNodes", {
            get: function() {
                return this._openNodes.concat()
            },
            set: function(b) {
                this._openNodes = b ? b.concat() : [];
                this.refresh()
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "length", {
            get: function() {
                return this.nodeList.length
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype.getItemAt = function(b) {
            return this.nodeList[b]
        };
        a.prototype.getItemIndex = function(b) {
            for (var a =
                this.nodeList.length, c = 0; c < a; c++)
                if (this.nodeList[c] === b) return c;
            return -1
        };
        a.prototype.itemUpdated = function(b) {
            var a = this.getItemIndex(b); - 1 != a && this.dispatchCoEvent(c.CollectionEventKind.UPDATE, a, -1, [b])
        };
        a.prototype.removeItem = function(b) {
            this.isItemOpen(b) && this.closeNode(b);
            if (b) {
                var a = b[this.parentKey];
                if (a && (a = a[this.childrenKey])) {
                    var d = a.indexOf(b); - 1 != d && a.splice(d, 1);
                    b[this.parentKey] = null;
                    d = this.nodeList.indexOf(b); - 1 != d && (this.nodeList.splice(d, 1), this.dispatchCoEvent(c.CollectionEventKind.REMOVE,
                        d, -1, [b]))
                }
            }
        };
        Object.defineProperty(a.prototype, "showRoot", {
            get: function() {
                return this._showRoot
            },
            set: function(b) {
                this._showRoot != b && (this._showRoot = b, this._source && (this._showRoot ? this.nodeList.splice(0, 0, this._source) : (this.nodeList.shift(), -1 == this.openNodes.indexOf(this._source) && this.openNodes.push(this._source)), this.refresh()))
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype.addChildren = function(b, a) {
            if (b.hasOwnProperty(this.childrenKey) && -1 != this._openNodes.indexOf(b))
                for (var c = b[this.childrenKey],
                    d = c.length, e = 0; e < d; e++) {
                    var g = c[e];
                    a.push(g);
                    this.addChildren(g, a)
                }
        };
        a.prototype.hasChildren = function(b) {
            return b.hasOwnProperty(this.childrenKey) ? 0 < b[this.childrenKey].length : !1
        };
        a.prototype.isItemOpen = function(b) {
            return -1 != this._openNodes.indexOf(b)
        };
        a.prototype.expandItem = function(b, a) {
            "undefined" === typeof a && (a = !0);
            a ? this.openNode(b) : this.closeNode(b)
        };
        a.prototype.openNode = function(b) {
            if (-1 == this._openNodes.indexOf(b)) {
                this._openNodes.push(b);
                var a = this.nodeList.indexOf(b);
                if (-1 != a) {
                    var d = [];
                    this.addChildren(b, d);
                    for (var e = a; d.length;) {
                        e++;
                        var f = d.shift();
                        this.nodeList.splice(e, 0, f);
                        this.dispatchCoEvent(c.CollectionEventKind.ADD, e, -1, [f])
                    }
                    this.dispatchCoEvent("open", a, a, [b])
                }
            }
        };
        a.prototype.closeNode = function(b) {
            var a = this._openNodes.indexOf(b);
            if (-1 != a) {
                var d = [];
                this.addChildren(b, d);
                this._openNodes.splice(a, 1);
                a = this.nodeList.indexOf(b);
                if (-1 != a) {
                    for (a++; d.length;) {
                        var e = this.nodeList.splice(a, 1)[0];
                        this.dispatchCoEvent(c.CollectionEventKind.REMOVE, a, -1, [e]);
                        d.shift()
                    }
                    a--;
                    this.dispatchCoEvent(c.CollectionEventKind.CLOSE,
                        a, a, [b])
                }
            }
        };
        a.prototype.getDepth = function(b) {
            var a = 0;
            for (b = b[this.parentKey]; b;) a++, b = b[this.parentKey];
            0 < a && !this._showRoot && a--;
            return a
        };
        a.prototype.refresh = function() {
            this.nodeList = [];
            this._source && (this._showRoot && this.nodeList.push(this._source), this.addChildren(this._source, this.nodeList));
            this.dispatchCoEvent(c.CollectionEventKind.REFRESH)
        };
        a.prototype.dispatchCoEvent = function(b, a, d, e, f) {
            "undefined" === typeof b && (b = null);
            "undefined" === typeof a && (a = -1);
            "undefined" === typeof d && (d = -1);
            "undefined" ===
            typeof e && (e = null);
            "undefined" === typeof f && (f = null);
            c.CollectionEvent.dispatchCollectionEvent(this, c.CollectionEvent.COLLECTION_CHANGE, b, a, d, e, f)
        };
        a.assignParent = function(b, c, d) {
            "undefined" === typeof c && (c = "children");
            "undefined" === typeof d && (d = "parent");
            if (b.hasOwnProperty(c))
                for (var e = b[c], f = e.length, g = 0; g < f; g++) {
                    var k = e[g];
                    try {
                        k[d] = b
                    } catch (n) {}
                    a.assignParent(k, c, d)
                }
        };
        return a
    }(c.EventDispatcher);
    c.ObjectCollection = e
})(egret || (egret = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(d) {
        function a() {
            d.call(this);
            this.targetLevel = Number.MAX_VALUE;
            this.updateCompleteQueue = new c.DepthQueue;
            this.invalidateClientPropertiesFlag = this.invalidatePropertiesFlag = !1;
            this.invalidatePropertiesQueue = new c.DepthQueue;
            this.invalidateClientSizeFlag = this.invalidateSizeFlag = !1;
            this.invalidateSizeQueue = new c.DepthQueue;
            this.invalidateDisplayListFlag = !1;
            this.invalidateDisplayListQueue = new c.DepthQueue;
            this.listenersAttached = !1
        }
        __extends(a, d);
        a.prototype.invalidateProperties =
            function(b) {
                this.invalidatePropertiesFlag || (this.invalidatePropertiesFlag = !0, this.listenersAttached || this.attachListeners());
                this.targetLevel <= b.nestLevel && (this.invalidateClientPropertiesFlag = !0);
                this.invalidatePropertiesQueue.insert(b)
            };
        a.prototype.validateProperties = function() {
            for (var b = this.invalidatePropertiesQueue.shift(); b;) b.parent && (b.validateProperties(), b.updateCompletePendingFlag || (this.updateCompleteQueue.insert(b), b.updateCompletePendingFlag = !0)), b = this.invalidatePropertiesQueue.shift();
            this.invalidatePropertiesQueue.isEmpty() && (this.invalidatePropertiesFlag = !1)
        };
        a.prototype.invalidateSize = function(b) {
            this.invalidateSizeFlag || (this.invalidateSizeFlag = !0, this.listenersAttached || this.attachListeners());
            this.targetLevel <= b.nestLevel && (this.invalidateClientSizeFlag = !0);
            this.invalidateSizeQueue.insert(b)
        };
        a.prototype.validateSize = function() {
            for (var b = this.invalidateSizeQueue.pop(); b;) b.parent && (b.validateSize(), b.updateCompletePendingFlag || (this.updateCompleteQueue.insert(b), b.updateCompletePendingFlag = !0)), b = this.invalidateSizeQueue.pop();
            this.invalidateSizeQueue.isEmpty() && (this.invalidateSizeFlag = !1)
        };
        a.prototype.invalidateDisplayList = function(b) {
            this.invalidateDisplayListFlag || (this.invalidateDisplayListFlag = !0, this.listenersAttached || this.attachListeners());
            this.invalidateDisplayListQueue.insert(b)
        };
        a.prototype.validateDisplayList = function() {
            for (var b = this.invalidateDisplayListQueue.shift(); b;) b.parent && (b.validateDisplayList(), b.updateCompletePendingFlag || (this.updateCompleteQueue.insert(b),
                b.updateCompletePendingFlag = !0)), b = this.invalidateDisplayListQueue.shift();
            this.invalidateDisplayListQueue.isEmpty() && (this.invalidateDisplayListFlag = !1)
        };
        a.prototype.attachListeners = function() {
            c.UIGlobals.stage.addEventListener(c.Event.ENTER_FRAME, this.doPhasedInstantiationCallBack, this);
            c.UIGlobals.stage.addEventListener(c.Event.RENDER, this.doPhasedInstantiationCallBack, this);
            c.UIGlobals.stage.invalidate();
            this.listenersAttached = !0
        };
        a.prototype.doPhasedInstantiationCallBack = function(b) {
            c.UIGlobals.stage.removeEventListener(c.Event.ENTER_FRAME,
                this.doPhasedInstantiationCallBack, this);
            c.UIGlobals.stage.removeEventListener(c.Event.RENDER, this.doPhasedInstantiationCallBack, this);
            this.doPhasedInstantiation()
        };
        a.prototype.doPhasedInstantiation = function() {
            this.invalidatePropertiesFlag && this.validateProperties();
            this.invalidateSizeFlag && this.validateSize();
            this.invalidateDisplayListFlag && this.validateDisplayList();
            if (this.invalidatePropertiesFlag || this.invalidateSizeFlag || this.invalidateDisplayListFlag) this.attachListeners();
            else {
                this.listenersAttached = !1;
                for (var b = this.updateCompleteQueue.pop(); b;) b.initialized || (b.initialized = !0), b.hasEventListener(c.UIEvent.UPDATE_COMPLETE) && c.UIEvent.dispatchUIEvent(b, c.UIEvent.UPDATE_COMPLETE), b.updateCompletePendingFlag = !1, b = this.updateCompleteQueue.pop();
                c.UIEvent.dispatchUIEvent(this, c.UIEvent.UPDATE_COMPLETE)
            }
        };
        a.prototype.validateNow = function() {
            for (var b = 0; this.listenersAttached && 100 > b++;) this.doPhasedInstantiationCallBack()
        };
        a.prototype.validateClient = function(b, a) {
            "undefined" === typeof a && (a = !1);
            var d,
                e = !1,
                f = this.targetLevel;
            this.targetLevel == Number.MAX_VALUE && (this.targetLevel = b.nestLevel);
            for (; !e;) {
                e = !0;
                for (d = this.invalidatePropertiesQueue.removeSmallestChild(b); d;) d.parent && (d.validateProperties(), d.updateCompletePendingFlag || (this.updateCompleteQueue.insert(d), d.updateCompletePendingFlag = !0)), d = this.invalidatePropertiesQueue.removeSmallestChild(b);
                this.invalidatePropertiesQueue.isEmpty() && (this.invalidatePropertiesFlag = !1);
                this.invalidateClientPropertiesFlag = !1;
                for (d = this.invalidateSizeQueue.removeLargestChild(b); d;) {
                    d.parent &&
                        (d.validateSize(), d.updateCompletePendingFlag || (this.updateCompleteQueue.insert(d), d.updateCompletePendingFlag = !0));
                    if (this.invalidateClientPropertiesFlag && (d = this.invalidatePropertiesQueue.removeSmallestChild(b))) {
                        this.invalidatePropertiesQueue.insert(d);
                        e = !1;
                        break
                    }
                    d = this.invalidateSizeQueue.removeLargestChild(b)
                }
                this.invalidateSizeQueue.isEmpty() && (this.invalidateSizeFlag = !1);
                this.invalidateClientSizeFlag = this.invalidateClientPropertiesFlag = !1;
                if (!a) {
                    for (d = this.invalidateDisplayListQueue.removeSmallestChild(b); d;) {
                        d.parent &&
                            (d.validateDisplayList(), d.updateCompletePendingFlag || (this.updateCompleteQueue.insert(d), d.updateCompletePendingFlag = !0));
                        if (this.invalidateClientPropertiesFlag && (d = this.invalidatePropertiesQueue.removeSmallestChild(b))) {
                            this.invalidatePropertiesQueue.insert(d);
                            e = !1;
                            break
                        }
                        if (this.invalidateClientSizeFlag && (d = this.invalidateSizeQueue.removeLargestChild(b))) {
                            this.invalidateSizeQueue.insert(d);
                            e = !1;
                            break
                        }
                        d = this.invalidateDisplayListQueue.removeSmallestChild(b)
                    }
                    this.invalidateDisplayListQueue.isEmpty() &&
                        (this.invalidateDisplayListFlag = !1)
                }
            }
            if (f == Number.MAX_VALUE && (this.targetLevel = Number.MAX_VALUE, !a))
                for (d = this.updateCompleteQueue.removeLargestChild(b); d;) d.initialized || (d.initialized = !0), d.hasEventListener(c.UIEvent.UPDATE_COMPLETE) && c.UIEvent.dispatchUIEvent(d, c.UIEvent.UPDATE_COMPLETE), d.updateCompletePendingFlag = !1, d = this.updateCompleteQueue.removeLargestChild(b)
        };
        return a
    }(c.EventDispatcher);
    c.LayoutManager = e
})(egret || (egret = {}));
(function(c) {
    var e = function() {
        function a() {
            this.depthBins = [];
            this.minDepth = 0;
            this.maxDepth = -1
        }
        a.prototype.insert = function(b) {
            var a = b.nestLevel,
                c = b.hashCode;
            this.maxDepth < this.minDepth ? this.minDepth = this.maxDepth = a : (a < this.minDepth && (this.minDepth = a), a > this.maxDepth && (this.maxDepth = a));
            var e = this.depthBins[a];
            e ? null == e.items[c] && (e.items[c] = b, e.length++) : (e = new d, this.depthBins[a] = e, e.items[c] = b, e.length++)
        };
        a.prototype.pop = function() {
            var b = null;
            if (this.minDepth <= this.maxDepth) {
                for (var a = this.depthBins[this.maxDepth]; !a ||
                    0 == a.length;) {
                    this.maxDepth--;
                    if (this.maxDepth < this.minDepth) return null;
                    a = this.depthBins[this.maxDepth]
                }
                var c = a.items,
                    d;
                for (d in c) {
                    b = c[d];
                    this.remove(b, this.maxDepth);
                    break
                }
                for (; !a || 0 == a.length;) {
                    this.maxDepth--;
                    if (this.maxDepth < this.minDepth) break;
                    a = this.depthBins[this.maxDepth]
                }
            }
            return b
        };
        a.prototype.shift = function() {
            var b = null;
            if (this.minDepth <= this.maxDepth) {
                for (var a = this.depthBins[this.minDepth]; !a || 0 == a.length;) {
                    this.minDepth++;
                    if (this.minDepth > this.maxDepth) return null;
                    a = this.depthBins[this.minDepth]
                }
                var c =
                    a.items,
                    d;
                for (d in c) {
                    b = c[d];
                    this.remove(b, this.minDepth);
                    break
                }
                for (; !a || 0 == a.length;) {
                    this.minDepth++;
                    if (this.minDepth > this.maxDepth) break;
                    a = this.depthBins[this.minDepth]
                }
            }
            return b
        };
        a.prototype.removeLargestChild = function(b) {
            for (var a = this.maxDepth, d = b.nestLevel, e = b.hashCode; d <= a;) {
                var f = this.depthBins[a];
                if (f && 0 < f.length) {
                    if (a == b.nestLevel) {
                        if (f.items[e]) return this.remove(b, a), b
                    } else {
                        var f = f.items,
                            g;
                        for (g in f) {
                            var k = f[g];
                            if (k instanceof c.DisplayObject && b instanceof c.DisplayObjectContainer &&
                                b.contains(k)) return this.remove(k, a), k
                        }
                    }
                    a--
                } else if (a == this.maxDepth && this.maxDepth--, a--, a < d) break
            }
            return null
        };
        a.prototype.removeSmallestChild = function(b) {
            for (var a = b.nestLevel, d = b.hashCode; a <= this.maxDepth;) {
                var e = this.depthBins[a];
                if (e && 0 < e.length) {
                    if (a == b.nestLevel) {
                        if (e.items[d]) return this.remove(b, a), b
                    } else {
                        var e = e.items,
                            f;
                        for (f in e) {
                            var g = e[f];
                            if (g instanceof c.DisplayObject && b instanceof c.DisplayObjectContainer && b.contains(g)) return this.remove(g, a), g
                        }
                    }
                    a++
                } else if (a == this.minDepth && this.minDepth++,
                    a++, a > this.maxDepth) break
            }
            return null
        };
        a.prototype.remove = function(b, a) {
            "undefined" === typeof a && (a = -1);
            var c = b.hashCode,
                d = this.depthBins[0 <= a ? a : b.nestLevel];
            return d && null != d.items[c] ? (delete d.items[c], d.length--, b) : null
        };
        a.prototype.removeAll = function() {
            this.minDepth = this.depthBins.length = 0;
            this.maxDepth = -1
        };
        a.prototype.isEmpty = function() {
            return this.minDepth > this.maxDepth
        };
        return a
    }();
    c.DepthQueue = e;
    var d = function() {
        return function() {
            this.length = 0;
            this.items = []
        }
    }();
    c.DepthBin = d
})(egret || (egret = {}));
(function(c) {
    var e = function() {
        function d() {}
        Object.defineProperty(d, "stage", {
            get: function() {
                return d._stage
            },
            enumerable: !0,
            configurable: !0
        });
        d._initlize = function(a) {
            d.initlized || (d._stage = a, d._layoutManager = new c.LayoutManager, d.initlized = !0)
        };
        Object.defineProperty(d, "uiStage", {
            get: function() {
                return d._uiStage
            },
            enumerable: !0,
            configurable: !0
        });
        d.initlized = !1;
        return d
    }();
    c.UIGlobals = e
})(egret || (egret = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(d) {
        function a() {
            d.call(this);
            this.initializeCalled = this._initialized = this._updateCompletePendingFlag = !1;
            this._nestLevel = 0;
            this._enabled = !0;
            this._minWidth = this._height = this._width = 0;
            this._maxWidth = 1E4;
            this._minHeight = 0;
            this._maxHeight = 1E4;
            this._measuredHeight = this._measuredWidth = 0;
            this._validateNowFlag = this._invalidateDisplayListFlag = this._invalidateSizeFlag = this._invalidatePropertiesFlag = !1;
            this._includeInLayout = !0;
            this._layoutHeightExplicitlySet = this._layoutWidthExplicitlySet = !1;
            this.touchEnabled = !0;
            this.addEventListener(c.Event.ADDED_TO_STAGE, this.onAddedToStage, this);
            this.addEventListener(c.Event.ADDED_TO_STAGE, this.checkInvalidateFlag, this)
        }
        __extends(a, d);
        a.prototype.onAddedToStage = function(b) {
            this.removeEventListener(c.Event.ADDED_TO_STAGE, this.onAddedToStage, this);
            this._initialize();
            c.UIGlobals._initlize(this.stage);
            0 < this._nestLevel && this.checkInvalidateFlag()
        };
        Object.defineProperty(a.prototype, "id", {
            get: function() {
                return this._id
            },
            set: function(b) {
                this._id = b
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "isPopUp", {
            get: function() {
                return this._isPopUp
            },
            set: function(b) {
                this._isPopUp = b
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "owner", {
            get: function() {
                return this._owner ? this._owner : this.parent
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype.ownerChanged = function(b) {
            this._owner = b
        };
        Object.defineProperty(a.prototype, "updateCompletePendingFlag", {
            get: function() {
                return this._updateCompletePendingFlag
            },
            set: function(b) {
                this._updateCompletePendingFlag =
                    b
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "initialized", {
            get: function() {
                return this._initialized
            },
            set: function(b) {
                this._initialized != b && (this._initialized = b) && c.UIEvent.dispatchUIEvent(this, c.UIEvent.CREATION_COMPLETE)
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype._initialize = function() {
            this.initializeCalled || (c.UIGlobals.stage && this.removeEventListener(c.Event.ADDED_TO_STAGE, this.onAddedToStage, this), this.initializeCalled = !0, c.UIEvent.dispatchUIEvent(this, c.UIEvent.INITIALIZE),
                this.createChildren(), this.childrenCreated())
        };
        a.prototype.createChildren = function() {};
        a.prototype.childrenCreated = function() {
            this.invalidateProperties();
            this.invalidateSize();
            this.invalidateDisplayList()
        };
        Object.defineProperty(a.prototype, "nestLevel", {
            get: function() {
                return this._nestLevel
            },
            set: function(b) {
                if (this._nestLevel != b)
                    for (this._nestLevel = b, 0 == this._nestLevel ? this.addEventListener(c.Event.ADDED_TO_STAGE, this.checkInvalidateFlag, this) : this.removeEventListener(c.Event.ADDED_TO_STAGE, this.checkInvalidateFlag,
                        this), b = this.numChildren - 1; 0 <= b; b--) {
                        var a = this.getChildAt(b);
                        null != a && (a.nestLevel = this._nestLevel + 1)
                    }
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype._addToDisplayList = function(b, a) {
            "undefined" === typeof a && (a = !0);
            var c = this.numChildren;
            b.parent == this && c--;
            this._addingChild(b);
            this._doAddChild(b, c, a);
            this._childAdded(b);
            return b
        };
        a.prototype._addToDisplayListAt = function(b, a, c) {
            "undefined" === typeof c && (c = !0);
            this._addingChild(b);
            this._doAddChild(b, a, c);
            this._childAdded(b);
            return b
        };
        a.prototype._removeFromDisplayList =
            function(b, a) {
                "undefined" === typeof a && (a = !0);
                var d = this._children.indexOf(b);
                if (0 <= d) return this._doRemoveChild(d, a), this._childRemoved(b), b;
                c.Logger.fatal("child\u672a\u88abaddChild\u5230\u8be5parent");
                return null
            };
        a.prototype._removeFromDisplayListAt = function(b, a) {
            "undefined" === typeof a && (a = !0);
            if (0 <= b && b < this._children.length) {
                var d = this._doRemoveChild(b, a);
                this._childRemoved(d);
                return d
            }
            c.Logger.fatal("\u63d0\u4f9b\u7684\u7d22\u5f15\u8d85\u51fa\u8303\u56f4");
            return null
        };
        a.prototype.addChild =
            function(b) {
                this._addingChild(b);
                d.prototype.addChild.call(this, b);
                this._childAdded(b);
                return b
            };
        a.prototype.addChildAt = function(b, a) {
            this._addingChild(b);
            d.prototype.addChildAt.call(this, b, a);
            this._childAdded(b);
            return b
        };
        a.prototype._addingChild = function(b) {
            b && "nestLevel" in b && (b.nestLevel = this._nestLevel + 1)
        };
        a.prototype._childAdded = function(b) {
            b instanceof a && (b._initialize(), b.checkInvalidateFlag())
        };
        a.prototype.removeChild = function(b) {
            d.prototype.removeChild.call(this, b);
            this._childRemoved(b);
            return b
        };
        a.prototype.removeChildAt = function(b) {
            b = d.prototype.removeChildAt.call(this, b);
            this._childRemoved(b);
            return b
        };
        a.prototype._childRemoved = function(b) {
            b && "nestLevel" in b && (b.nestLevel = 0)
        };
        a.prototype.checkInvalidateFlag = function(b) {
            c.UIGlobals._layoutManager && (this._invalidatePropertiesFlag && c.UIGlobals._layoutManager.invalidateProperties(this), this._invalidateSizeFlag && c.UIGlobals._layoutManager.invalidateSize(this), this._invalidateDisplayListFlag && c.UIGlobals._layoutManager.invalidateDisplayList(this),
                this._validateNowFlag && (c.UIGlobals._layoutManager.validateClient(this), this._validateNowFlag = !1))
        };
        Object.defineProperty(a.prototype, "enabled", {
            get: function() {
                return this._enabled
            },
            set: function(b) {
                this._enabled = b
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype._setWidth = function(b) {
            if (this._width != b || this._explicitWidth != b) d.prototype._setWidth.call(this, b), isNaN(b) ? this.invalidateSize() : this._width = b, this.invalidateProperties(), this.invalidateDisplayList(), this.invalidateParentSizeAndDisplayList()
        };
        Object.defineProperty(a.prototype, "width", {
            get: function() {
                return this._width
            },
            set: function(b) {
                this._setWidth(b)
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype._setHeight = function(b) {
            if (this._height != b || this._explicitHeight != b) d.prototype._setHeight.call(this, b), isNaN(b) ? this.invalidateSize() : this._height = b, this.invalidateProperties(), this.invalidateDisplayList(), this.invalidateParentSizeAndDisplayList()
        };
        Object.defineProperty(a.prototype, "height", {
            get: function() {
                return this._height
            },
            set: function(b) {
                this._setHeight(b)
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "scaleX", {
            get: function() {
                return this._scaleX
            },
            set: function(b) {
                this._setScaleX(b)
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype._setScaleX = function(b) {
            this._scaleX != b && (this._scaleX = b, this.invalidateParentSizeAndDisplayList())
        };
        Object.defineProperty(a.prototype, "scaleY", {
            get: function() {
                return this._scaleY
            },
            set: function(b) {
                this._setScaleY(b)
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype._setScaleY = function(b) {
            this._scaleY != b && (this._scaleY =
                b, this.invalidateParentSizeAndDisplayList())
        };
        Object.defineProperty(a.prototype, "minWidth", {
            get: function() {
                return this._minWidth
            },
            set: function(b) {
                this._minWidth != b && (this._minWidth = b, this.invalidateSize())
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "maxWidth", {
            get: function() {
                return this._maxWidth
            },
            set: function(b) {
                this._maxWidth != b && (this._maxWidth = b, this.invalidateSize())
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "minHeight", {
            get: function() {
                return this._minHeight
            },
            set: function(b) {
                this._minHeight != b && (this._minHeight = b, this.invalidateSize())
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "maxHeight", {
            get: function() {
                return this._maxHeight
            },
            set: function(b) {
                this._maxHeight != b && (this._maxHeight = b, this.invalidateSize())
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "measuredWidth", {
            get: function() {
                return this._measuredWidth
            },
            set: function(b) {
                this._measuredWidth = b
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype,
            "measuredHeight", {
                get: function() {
                    return this._measuredHeight
                },
                set: function(b) {
                    this._measuredHeight = b
                },
                enumerable: !0,
                configurable: !0
            });
        a.prototype.setActualSize = function(b, a) {
            var c = !1;
            this._width != b && (this._width = b, c = !0);
            this._height != a && (this._height = a, c = !0);
            c && (this.invalidateDisplayList(), this.dispatchResizeEvent())
        };
        Object.defineProperty(a.prototype, "x", {
            get: function() {
                return this._x
            },
            set: function(b) {
                this._x != b && (this._x = b, this.invalidateProperties(), this._includeInLayout && this.parent && this.parent instanceof a && this.parent._childXYChanged())
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "y", {
            get: function() {
                return this._y
            },
            set: function(b) {
                this._y != b && (this._y = b, this.invalidateProperties(), this._includeInLayout && this.parent && this.parent instanceof a && this.parent._childXYChanged())
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype.invalidateProperties = function() {
            this._invalidatePropertiesFlag || (this._invalidatePropertiesFlag = !0, this.parent && c.UIGlobals._layoutManager && c.UIGlobals._layoutManager.invalidateProperties(this))
        };
        a.prototype.validateProperties = function() {
            this._invalidatePropertiesFlag && (this.commitProperties(), this._invalidatePropertiesFlag = !1)
        };
        a.prototype.invalidateSize = function() {
            this._invalidateSizeFlag || (this._invalidateSizeFlag = !0, this.parent && c.UIGlobals._layoutManager && c.UIGlobals._layoutManager.invalidateSize(this))
        };
        a.prototype.validateSize = function(b) {
            "undefined" === typeof b && (b = !1);
            if (b)
                for (b = 0; b < this.numChildren; b++) {
                    var a = this.getChildAt(b);
                    "validateSize" in a && a.validateSize(!0)
                }
            this._invalidateSizeFlag &&
                (this.measureSizes() && (this.invalidateDisplayList(), this.invalidateParentSizeAndDisplayList()), this._invalidateSizeFlag = !1)
        };
        a.prototype.measureSizes = function() {
            var b = !1;
            if (!this._invalidateSizeFlag) return b;
            this.canSkipMeasurement() || (this.measure(), this.measuredWidth < this.minWidth && (this.measuredWidth = this.minWidth), this.measuredWidth > this.maxWidth && (this.measuredWidth = this.maxWidth), this.measuredHeight < this.minHeight && (this.measuredHeight = this.minHeight), this.measuredHeight > this.maxHeight && (this.measuredHeight =
                this.maxHeight));
            if (isNaN(this._oldPreferWidth)) this._oldPreferWidth = this.preferredWidth, this._oldPreferHeight = this.preferredHeight, b = !0;
            else {
                if (this.preferredWidth != this._oldPreferWidth || this.preferredHeight != this._oldPreferHeight) b = !0;
                this._oldPreferWidth = this.preferredWidth;
                this._oldPreferHeight = this.preferredHeight
            }
            return b
        };
        a.prototype.invalidateDisplayList = function() {
            this._invalidateDisplayListFlag || (this._invalidateDisplayListFlag = !0, this.parent && c.UIGlobals._layoutManager && c.UIGlobals._layoutManager.invalidateDisplayList(this))
        };
        a.prototype.validateDisplayList = function() {
            if (this._invalidateDisplayListFlag) {
                var b = 0,
                    a = 0,
                    b = this._layoutWidthExplicitlySet ? this._width : isNaN(this.explicitWidth) ? this.measuredWidth : this._explicitWidth,
                    a = this._layoutHeightExplicitlySet ? this._height : isNaN(this.explicitHeight) ? this.measuredHeight : this._explicitHeight;
                isNaN(b) && (b = 0);
                isNaN(a) && (a = 0);
                this.setActualSize(b, a);
                this.updateDisplayList(b, a);
                this._invalidateDisplayListFlag = !1
            }
        };
        a.prototype.validateNow = function(b) {
            "undefined" === typeof b && (b = !1);
            this._validateNowFlag || null == c.UIGlobals._layoutManager ? this._validateNowFlag = !0 : c.UIGlobals._layoutManager.validateClient(this, b)
        };
        a.prototype.invalidateParentSizeAndDisplayList = function() {
            if (this.parent && this._includeInLayout && "invalidateSize" in this.parent) {
                var b = this.parent;
                b.invalidateSize();
                b.invalidateDisplayList()
            }
        };
        a.prototype.updateDisplayList = function(b, a) {};
        a.prototype.canSkipMeasurement = function() {
            return !isNaN(this._explicitWidth) && !isNaN(this._explicitHeight)
        };
        a.prototype.commitProperties =
            function() {
                this.oldWidth == this._width && this.oldHeight == this._height || this.dispatchResizeEvent();
                this.oldX == this.x && this.oldY == this.y || this.dispatchMoveEvent()
            };
        a.prototype.measure = function() {
            this._measuredWidth = this._measuredHeight = 0
        };
        a.prototype.dispatchMoveEvent = function() {
            this.hasEventListener(c.MoveEvent.MOVE) && c.MoveEvent.dispatchMoveEvent(this, this.oldX, this.oldY);
            this.oldX = this.x;
            this.oldY = this.y
        };
        a.prototype._childXYChanged = function() {};
        a.prototype.dispatchResizeEvent = function() {
            this.hasEventListener(c.ResizeEvent.RESIZE) &&
                c.ResizeEvent.dispatchResizeEvent(this, this.oldWidth, this.oldHeight);
            this.oldWidth = this._width;
            this.oldHeight = this._height
        };
        Object.defineProperty(a.prototype, "includeInLayout", {
            get: function() {
                return this._includeInLayout
            },
            set: function(b) {
                this._includeInLayout != b && (this._includeInLayout = !0, this.invalidateParentSizeAndDisplayList(), this._includeInLayout = b)
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "left", {
            get: function() {
                return this._left
            },
            set: function(b) {
                this._left != b && (this._left =
                    b, this.invalidateParentSizeAndDisplayList())
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "right", {
            get: function() {
                return this._right
            },
            set: function(b) {
                this._right != b && (this._right = b, this.invalidateParentSizeAndDisplayList())
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "top", {
            get: function() {
                return this._top
            },
            set: function(b) {
                this._top != b && (this._top = b, this.invalidateParentSizeAndDisplayList())
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype,
            "bottom", {
                get: function() {
                    return this._bottom
                },
                set: function(b) {
                    this._bottom != b && (this._bottom = b, this.invalidateParentSizeAndDisplayList())
                },
                enumerable: !0,
                configurable: !0
            });
        Object.defineProperty(a.prototype, "horizontalCenter", {
            get: function() {
                return this._horizontalCenter
            },
            set: function(b) {
                this._horizontalCenter != b && (this._horizontalCenter = b, this.invalidateParentSizeAndDisplayList())
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "verticalCenter", {
            get: function() {
                return this._verticalCenter
            },
            set: function(b) {
                this._verticalCenter != b && (this._verticalCenter = b, this.invalidateParentSizeAndDisplayList())
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "percentWidth", {
            get: function() {
                return this._percentWidth
            },
            set: function(b) {
                this._percentWidth != b && (this._percentWidth = b, this.invalidateParentSizeAndDisplayList())
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "percentHeight", {
            get: function() {
                return this._percentHeight
            },
            set: function(b) {
                this._percentHeight !=
                    b && (this._percentHeight = b, this.invalidateParentSizeAndDisplayList())
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype.setLayoutBoundsSize = function(b, a) {
            isNaN(b) ? (this._layoutWidthExplicitlySet = !1, b = this.preferredWidth) : this._layoutWidthExplicitlySet = !0;
            isNaN(a) ? (this._layoutHeightExplicitlySet = !1, a = this.preferredHeight) : this._layoutHeightExplicitlySet = !0;
            this.setActualSize(b / this._scaleX, a / this._scaleY)
        };
        a.prototype.setLayoutBoundsPosition = function(b, a) {
            0 > this._scaleX && (b += this.layoutBoundsWidth);
            0 > this._scaleY &&
                (a += this.layoutBoundsHeight);
            var c = !1;
            this._x != b && (this._x = b, c = !0);
            this._y != a && (this._y = a, c = !0);
            c && this.dispatchMoveEvent()
        };
        Object.defineProperty(a.prototype, "preferredWidth", {
            get: function() {
                var b = this._hasWidthSet ? this._explicitWidth : this._measuredWidth,
                    a = this._scaleX;
                0 > a && (a = -a);
                return b * a
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "preferredHeight", {
            get: function() {
                var b = this._hasHeightSet ? this._explicitHeight : this._measuredHeight,
                    a = this._scaleY;
                0 > a && (a = -a);
                return b * a
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "preferredX", {
            get: function() {
                return 0 <= this._scaleX ? this._x : this._x - this.preferredWidth
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "preferredY", {
            get: function() {
                return 0 <= this._scaleY ? this._y : this._y - this.preferredHeight
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "layoutBoundsX", {
            get: function() {
                return 0 <= this._scaleX ? this._x : this._x - this.layoutBoundsWidth
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "layoutBoundsY", {
            get: function() {
                return 0 <= this._scaleY ? this._y : this._y - this.layoutBoundsHeight
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "layoutBoundsWidth", {
            get: function() {
                var b = 0,
                    b = this._layoutWidthExplicitlySet ? this._width : this._hasWidthSet ? this._explicitWidth : this._measuredWidth,
                    a = this._scaleX;
                0 > a && (a = -a);
                return b * a
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "layoutBoundsHeight", {
            get: function() {
                var b = 0,
                    b = this._layoutHeightExplicitlySet ?
                    this._height : this._hasHeightSet ? this._explicitHeight : this._measuredHeight,
                    a = this.scaleY;
                0 > a && (a = -a);
                return b * a
            },
            enumerable: !0,
            configurable: !0
        });
        return a
    }(c.DisplayObjectContainer);
    c.UIComponent = e
})(egret || (egret = {}));
(function(c) {
    var e = function() {
        function c() {}
        c.ABOVE = "above";
        c.BELOW = "below";
        c.CENTER = "center";
        c.TOP_LEFT = "topLeft";
        c.LEFT = "left";
        c.RIGHT = "right";
        return c
    }();
    c.PopUpPosition = e
})(egret || (egret = {}));
(function(c) {
    var e = function() {
        function c() {}
        c.AUTO = "auto";
        c.OFF = "off";
        c.ON = "on";
        return c
    }();
    c.ScrollPolicy = e
})(egret || (egret = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(c) {
        function a(b) {
            "undefined" === typeof b && (b = null);
            c.call(this);
            this.generator = b
        }
        __extends(a, c);
        a.prototype.newInstance = function() {
            return new this.generator
        };
        return a
    }(c.HashObject);
    c.ClassFactory = e
})(egret || (egret = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(c) {
        function a() {
            c.call(this)
        }
        __extends(a, c);
        a.prototype.initialize = function(b) {};
        a.prototype.apply = function(b) {};
        a.prototype.remove = function(b) {};
        a.prototype.initializeFromObject = function(b) {
            for (var a in b) this[a] = b[a];
            return this
        };
        return a
    }(c.HashObject);
    c.OverrideBase = e
})(egret || (egret = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(d) {
        function a(b, c, e, m) {
            d.call(this);
            this.propertyName = "";
            this.position = a.LAST;
            this.target = b;
            this.propertyName = c;
            this.position = e;
            this.relativeTo = m
        }
        __extends(a, d);
        a.prototype.initialize = function(b) {
            if ((b = b[this.target]) && !(b instanceof c.SkinnableComponent) && "_initialize" in b) try {
                b._initialize()
            } catch (a) {}
        };
        a.prototype.apply = function(b) {
            var c, d;
            try {
                d = b[this.relativeTo]
            } catch (e) {}
            var f = b[this.target];
            b = this.propertyName ? b[this.propertyName] : b;
            if (f && b) {
                switch (this.position) {
                    case a.FIRST:
                        c =
                            0;
                        break;
                    case a.LAST:
                        c = -1;
                        break;
                    case a.BEFORE:
                        c = b.getElementIndex(d);
                        break;
                    case a.AFTER:
                        c = b.getElementIndex(d) + 1
                } - 1 == c && (c = b.numElements);
                b.addElementAt(f, c)
            }
        };
        a.prototype.remove = function(b) {
            var a = null == this.propertyName || "" == this.propertyName ? b : b[this.propertyName];
            (b = b[this.target]) && a && -1 != a.getElementIndex(b) && a.removeElement(b)
        };
        a.FIRST = "first";
        a.LAST = "last";
        a.BEFORE = "before";
        a.AFTER = "after";
        return a
    }(c.OverrideBase);
    c.AddItems = e
})(egret || (egret = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(c) {
        function a(b, a, e) {
            c.call(this);
            this.target = b;
            this.name = a;
            this.value = e
        }
        __extends(a, c);
        a.prototype.apply = function(b) {
            b = null == this.target || "" == this.target ? b : b[this.target];
            null != b && (this.oldValue = b[this.name], this.setPropertyValue(b, this.name, this.value, this.oldValue))
        };
        a.prototype.remove = function(b) {
            b = null == this.target || "" == this.target ? b : b[this.target];
            null != b && (this.setPropertyValue(b, this.name, this.oldValue, this.oldValue), this.oldValue = null)
        };
        a.prototype.setPropertyValue =
            function(b, a, c, d) {
                b[a] = void 0 === c || null === c ? c : "boolean" == typeof d ? this.toBoolean(c) : c
            };
        a.prototype.toBoolean = function(b) {
            return "string" == typeof b ? "true" == b.toLowerCase() : !1 != b
        };
        return a
    }(c.OverrideBase);
    c.SetProperty = e
})(egret || (egret = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(c) {
        function a(b, a) {
            c.call(this);
            this.initialized = !1;
            this.name = b;
            this.overrides = a
        }
        __extends(a, c);
        a.prototype.initialize = function(b) {
            if (!this.initialized) {
                this.initialized = !0;
                for (var a = 0; a < this.overrides.length; a++) this.overrides[a].initialize(b)
            }
        };
        return a
    }(c.HashObject);
    c.State = e
})(egret || (egret = {}));
(function(c) {
    var e = function() {
        function c() {}
        c.adjustRelativeByXY = function(a, b) {
            "undefined" === typeof b && (b = null);
            if (a && (b || (b = a.parent), b)) {
                var c = a.x,
                    d = a.y,
                    e = a.layoutBoundsHeight,
                    f = a.layoutBoundsWidth,
                    g = b.width,
                    k = b.height;
                isNaN(a.left) || (a.left = c);
                isNaN(a.right) || (a.right = g - c - f);
                isNaN(a.horizontalCenter) || (a.horizontalCenter = c + 0.5 * f - 0.5 * g);
                isNaN(a.top) || (a.top = d);
                isNaN(a.bottom) || (a.bottom = k - d - e);
                isNaN(a.verticalCenter) || (a.verticalCenter = 0.5 * e - 0.5 * k + d)
            }
        };
        return c
    }();
    c.LayoutUtil = e
})(egret || (egret = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(d) {
        function a(b, a) {
            "undefined" === typeof a && (a = !0);
            d.call(this);
            this.fillMode = "scale";
            this.contentReused = this.createChildrenCalled = this.sourceChanged = !1;
            this.autoScale = !0;
            this.touchChildren = !1;
            b && (this.source = b);
            this.autoScale = a
        }
        __extends(a, d);
        Object.defineProperty(a.prototype, "source", {
            get: function() {
                return this._source
            },
            set: function(b) {
                this._source != b && (this._source = b, this.createChildrenCalled ? this.parseSource() : this.sourceChanged = !0)
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "content", {
            get: function() {
                return this._content
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype.createChildren = function() {
            d.prototype.createChildren.call(this);
            this.sourceChanged && this.parseSource();
            this.createChildrenCalled = !0
        };
        a.prototype.parseSource = function() {
            this.sourceChanged = !1;
            var b = a.assetAdapter;
            b || (b = this.getAdapter());
            if (this._source) {
                var c = this.contentReused ? null : this._content;
                this.contentReused = !0;
                b.getAsset(this._source, this.contentChanged, this, c)
            } else this.contentChanged(null,
                null)
        };
        a.prototype.getAdapter = function() {
            var b;
            try {
                b = c.Injector.getInstance("egret.IAssetAdapter")
            } catch (d) {
                b = new c.DefaultAssetAdapter
            }
            return a.assetAdapter = b
        };
        a.prototype.contentChanged = function(b, a) {
            if (a === this._source) {
                var d = this._content;
                this._content = b;
                d !== b && (d instanceof c.DisplayObject && this._removeFromDisplayList(d), b instanceof c.DisplayObject && this._addToDisplayListAt(b, 0));
                b instanceof c.Texture && b.scale9Grid instanceof c.Rectangle && (this.scale9Grid = b.scale9Grid);
                this.invalidateSize();
                this.invalidateDisplayList();
                this.contentReused = !1;
                this.hasEventListener(c.UIEvent.CONTENT_CHANGED) && c.UIEvent.dispatchUIEvent(this, c.UIEvent.CONTENT_CHANGED)
            }
        };
        a.prototype.measure = function() {
            d.prototype.measure.call(this);
            var b = this._content;
            b instanceof c.DisplayObject ? "preferredWidth" in b ? (this.measuredWidth = b.preferredWidth, this.measuredHeight = b.preferredHeight) : (this.measuredWidth = b.width * b.scaleX, this.measuredHeight = b.height * b.scaleY) : b instanceof c.Texture && (this.measuredWidth = b._textureWidth,
                this.measuredHeight = b._textureHeight)
        };
        a.prototype.updateDisplayList = function(b, a) {
            d.prototype.updateDisplayList.call(this, b, a);
            var e = this._content;
            this.autoScale && e instanceof c.DisplayObject && ("setLayoutBoundsSize" in e ? e.setLayoutBoundsSize(b, a) : (e.width = b / e.scaleX, e.height = a / e.scaleY))
        };
        a.prototype._render = function(b) {
            if (this._content instanceof c.Texture) {
                var a = this._content;
                this._texture_to_render = a;
                var e;
                this.autoScale ? (e = this._width, a = this._height) : (e = a.textureWidth, a = a.textureHeight);
                c.Bitmap._drawBitmap(b,
                    e, a, this)
            } else this._texture_to_render = null;
            d.prototype._render.call(this, b)
        };
        a.prototype._measureBounds = function() {
            var b = d.prototype._measureBounds.call(this);
            if (this._content instanceof c.Texture) {
                var a = this._content,
                    e = this.width,
                    m = this.height,
                    f = Math.floor(a._offsetX * e / a._textureWidth),
                    a = Math.floor(a._offsetY * m / a._textureHeight);
                f < b.x && (b.x = f);
                a < b.y && (b.y = a);
                f + e > b.right && (b.right = f + e);
                a + m > b.bottom && (b.bottom = a + m)
            }
            return b
        };
        a.prototype.addChild = function(b) {
            throw Error("addChild()" + a.errorStr + "addElement()\u4ee3\u66ff");
        };
        a.prototype.addChildAt = function(b, c) {
            throw Error("addChildAt()" + a.errorStr + "addElementAt()\u4ee3\u66ff");
        };
        a.prototype.removeChild = function(b) {
            throw Error("removeChild()" + a.errorStr + "removeElement()\u4ee3\u66ff");
        };
        a.prototype.removeChildAt = function(b) {
            throw Error("removeChildAt()" + a.errorStr + "removeElementAt()\u4ee3\u66ff");
        };
        a.prototype.setChildIndex = function(b, c) {
            throw Error("setChildIndex()" + a.errorStr + "setElementIndex()\u4ee3\u66ff");
        };
        a.prototype.swapChildren = function(b, c) {
            throw Error("swapChildren()" +
                a.errorStr + "swapElements()\u4ee3\u66ff");
        };
        a.prototype.swapChildrenAt = function(b, c) {
            throw Error("swapChildrenAt()" + a.errorStr + "swapElementsAt()\u4ee3\u66ff");
        };
        a.errorStr = "\u5728\u6b64\u7ec4\u4ef6\u4e2d\u4e0d\u53ef\u7528\uff0c\u82e5\u6b64\u7ec4\u4ef6\u4e3a\u5bb9\u5668\u7c7b\uff0c\u8bf7\u4f7f\u7528";
        return a
    }(c.UIComponent);
    c.UIAsset = e
})(egret || (egret = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(d) {
        function a() {
            d.call(this);
            this.hostComponentKey = "egret.SkinnableComponent";
            this.stateIsDirty = this.createChildrenCalled = this._skinNameExplicitlySet = !1;
            this.explicitMouseEnabled = this.explicitMouseChildren = this._autoMouseEnabled = !0
        }
        __extends(a, d);
        Object.defineProperty(a.prototype, "skinName", {
            get: function() {
                return this._skinName
            },
            set: function(b) {
                this._skinName != b && (this._skinName = b, this._skinNameExplicitlySet = !0, this.createChildrenCalled && this.parseSkinName())
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "skin", {
            get: function() {
                return this._skin
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype.createChildren = function() {
            d.prototype.createChildren.call(this);
            this.parseSkinName();
            this.createChildrenCalled = !0
        };
        a.prototype.parseSkinName = function() {
            var b = a.skinAdapter;
            b || (b = this.getSkinAdapter());
            var b = b.getSkin(this._skinName, this.hostComponentKey),
                d = this._skin;
            this.detachSkin(d);
            d instanceof c.DisplayObject && this._removeFromDisplayList(d);
            this._skin = b;
            b instanceof
            c.DisplayObject && this._addToDisplayListAt(this._skin, 0);
            this.attachSkin(b);
            this.invalidateSkinState();
            this.invalidateSize();
            this.invalidateDisplayList();
            this.hasEventListener(c.UIEvent.SKIN_CHANGED) && c.UIEvent.dispatchUIEvent(this, c.UIEvent.SKIN_CHANGED)
        };
        a.prototype.getSkinAdapter = function() {
            var b;
            try {
                b = c.Injector.getInstance("egret.ISkinAdapter")
            } catch (d) {
                b = new c.DefaultSkinAdapter
            }
            return a.skinAdapter = b
        };
        a.prototype.attachSkin = function(b) {
            b && "hostComponent" in b && (b.hostComponent = this, this.findSkinParts());
            b && "hostComponent" in b && b instanceof c.DisplayObject ? this._setSkinLayoutEnabled(!1) : this._setSkinLayoutEnabled(!0)
        };
        a.prototype.findSkinParts = function() {
            var b = this._skin;
            if (b && "skinParts" in b)
                for (var a = b.skinParts, c = a.length, d = 0; d < c; d++) {
                    var e = a[d];
                    if (e in b) try {
                        this[e] = b[e], this.partAdded(e, b[e])
                    } catch (g) {}
                }
        };
        a.prototype.detachSkin = function(b) {
            if (b && "skinParts" in b) {
                for (var a = b.skinParts, c = a.length, d = 0; d < c; d++) {
                    var e = a[d];
                    e in this && (null != this[e] && this.partRemoved(e, this[e]), this[e] = null)
                }
                b.hostComponent =
                    null
            }
        };
        a.prototype.partAdded = function(b, a) {
            c.SkinPartEvent.dispatchSkinPartEvent(this, c.SkinPartEvent.PART_ADDED, b, a)
        };
        a.prototype.partRemoved = function(b, a) {
            c.SkinPartEvent.dispatchSkinPartEvent(this, c.SkinPartEvent.PART_REMOVED, b, a)
        };
        a.prototype.invalidateSkinState = function() {
            this.stateIsDirty || (this.stateIsDirty = !0, this.invalidateProperties())
        };
        a.prototype.validateSkinState = function() {
            var b = this.getCurrentSkinState(),
                a = this._skin;
            a && "currentState" in a && (a.currentState = b);
            this.hasEventListener("stateChanged") &&
                this.dispatchEventWith("stateChanged")
        };
        Object.defineProperty(a.prototype, "autoTouchEnabled", {
            get: function() {
                return this._autoMouseEnabled
            },
            set: function(b) {
                this._autoMouseEnabled != b && ((this._autoMouseEnabled = b) ? (this._touchChildren = this.enabled ? this.explicitMouseChildren : !1, this._touchEnabled = this.enabled ? this.explicitMouseEnabled : !1) : (this._touchChildren = this.explicitMouseChildren, this._touchEnabled = this.explicitMouseEnabled))
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "touchChildren", {
            get: function() {
                return this._touchChildren
            },
            set: function(b) {
                this.enabled && (this._touchChildren = b);
                this.explicitMouseChildren = b
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "touchEnabled", {
            get: function() {
                return this._touchEnabled
            },
            set: function(b) {
                this.enabled && (this._touchEnabled = b);
                this.explicitMouseEnabled = b
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "enabled", {
            get: function() {
                return this._enabled
            },
            set: function(b) {
                this._setEnabled(b)
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype._setEnabled = function(b) {
            this._enabled != b && (this._enabled = b, this._autoMouseEnabled && (this._touchChildren = b ? this.explicitMouseChildren : !1, this._touchEnabled = b ? this.explicitMouseEnabled : !1), this.invalidateSkinState())
        };
        a.prototype.getCurrentSkinState = function() {
            return this.enabled ? "normal" : "disabled"
        };
        a.prototype.commitProperties = function() {
            d.prototype.commitProperties.call(this);
            this.stateIsDirty && (this.stateIsDirty = !1, this.validateSkinState())
        };
        a.prototype._setSkinLayoutEnabled = function(b) {
            null !=
                this.skinLayout != b && (b ? (this.skinLayout = new c.SkinBasicLayout, this.skinLayout.target = this) : this.skinLayout = this.skinLayout.target = null, this.invalidateSize(), this.invalidateDisplayList())
        };
        a.prototype._childXYChanged = function() {
            this.skinLayout && (this.invalidateSize(), this.invalidateDisplayList())
        };
        a.prototype.measure = function() {
            d.prototype.measure.call(this);
            var b = this._skin;
            if (b) {
                var a = b instanceof c.DisplayObject;
                a && (b && "preferredWidth" in b ? (this.measuredWidth = b.preferredWidth, this.measuredHeight =
                    b.preferredHeight) : (this.measuredWidth = b.width, this.measuredHeight = b.height));
                this.skinLayout && this.skinLayout.measure();
                if (!a) {
                    var a = this.measuredWidth,
                        e = this.measuredHeight;
                    try {
                        isNaN(b.width) || (a = Math.ceil(b.width)), isNaN(b.height) || (e = Math.ceil(b.height)), b.hasOwnProperty("minWidth") && a < b.minWidth && (a = b.minWidth), b.hasOwnProperty("maxWidth") && a > b.maxWidth && (a = b.maxWidth), b.hasOwnProperty("minHeight") && e < b.minHeight && (e = b.minHeight), b.hasOwnProperty("maxHeight") && e > b.maxHeight && (e = b.maxHeight),
                            this.measuredWidth = a, this.measuredHeight = e
                    } catch (m) {}
                }
            }
        };
        a.prototype.updateDisplayList = function(b, a) {
            d.prototype.updateDisplayList.call(this, b, a);
            var e = this._skin;
            e && ("setLayoutBoundsSize" in e ? e.setLayoutBoundsSize(b, a) : e instanceof c.DisplayObject && (e.scaleX = 0 == e.width ? 1 : b / e.width, e.scaleY = 0 == e.height ? 1 : a / e.height));
            this.skinLayout && this.skinLayout.updateDisplayList(b, a)
        };
        a.prototype.addChild = function(b) {
            throw Error("addChild()" + a.errorStr + "addElement()\u4ee3\u66ff");
        };
        a.prototype.addChildAt = function(b,
            c) {
            throw Error("addChildAt()" + a.errorStr + "addElementAt()\u4ee3\u66ff");
        };
        a.prototype.removeChild = function(b) {
            throw Error("removeChild()" + a.errorStr + "removeElement()\u4ee3\u66ff");
        };
        a.prototype.removeChildAt = function(b) {
            throw Error("removeChildAt()" + a.errorStr + "removeElementAt()\u4ee3\u66ff");
        };
        a.prototype.setChildIndex = function(b, c) {
            throw Error("setChildIndex()" + a.errorStr + "setElementIndex()\u4ee3\u66ff");
        };
        a.prototype.swapChildren = function(b, c) {
            throw Error("swapChildren()" + a.errorStr + "swapElements()\u4ee3\u66ff");
        };
        a.prototype.swapChildrenAt = function(b, c) {
            throw Error("swapChildrenAt()" + a.errorStr + "swapElementsAt()\u4ee3\u66ff");
        };
        a.errorStr = "\u5728\u6b64\u7ec4\u4ef6\u4e2d\u4e0d\u53ef\u7528\uff0c\u82e5\u6b64\u7ec4\u4ef6\u4e3a\u5bb9\u5668\u7c7b\uff0c\u8bf7\u4f7f\u7528";
        return a
    }(c.UIComponent);
    c.SkinnableComponent = e
})(egret || (egret = {}));
(function(c) {
    var e = function() {
        function d() {}
        d.prototype.getSkin = function(a, b) {
            if (!a) return null;
            if (a.prototype) return new a;
            if ("string" == typeof a) {
                var d = c.getDefinitionByName(a);
                return d ? new d : null
            }
            return a
        };
        return d
    }();
    c.DefaultSkinAdapter = e
})(egret || (egret = {}));
(function(c) {
    var e = function() {
        function d() {}
        d.prototype.getAsset = function(a, b, d, e) {
            var m = a;
            a.prototype && (m = new a);
            if (m instanceof c.DisplayObject || m instanceof c.Texture) b.call(d, m, a);
            else if ("string" == typeof a) {
                var f = new c.URLLoader;
                f.dataFormat = c.URLLoaderDataFormat.TEXTURE;
                f.addEventListener(c.Event.COMPLETE, function(c) {
                    m = f.data;
                    b.call(d, m, a)
                }, this);
                f.load(new c.URLRequest(a))
            } else b.call(d, m, a)
        };
        return d
    }();
    c.DefaultAssetAdapter = e
})(egret || (egret = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(c) {
        function a() {
            c.call(this)
        }
        __extends(a, c);
        Object.defineProperty(a.prototype, "target", {
            get: function() {
                return this._target
            },
            set: function(b) {
                this._target = b
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype.measure = function() {
            if (null != this.target) {
                for (var b = 0, a = 0, c = this._target.skin, d = this.target.numChildren, e = 0; e < d; e++) {
                    var g = this.target.getChildAt(e);
                    if (g && g != c && g.includeInLayout) {
                        var k = g.horizontalCenter,
                            n = g.verticalCenter,
                            p = g.left,
                            q = g.right,
                            r = g.top,
                            s = g.bottom;
                        isNaN(p) || isNaN(q) ?
                            isNaN(k) ? isNaN(p) && isNaN(q) ? k = g.preferredX : (k = isNaN(p) ? 0 : p, k += isNaN(q) ? 0 : q) : k = 2 * Math.abs(k) : k = p + q;
                        isNaN(r) || isNaN(s) ? isNaN(n) ? isNaN(r) && isNaN(s) ? n = g.preferredY : (n = isNaN(r) ? 0 : r, n += isNaN(s) ? 0 : s) : n = 2 * Math.abs(n) : n = r + s;
                        s = g.preferredHeight;
                        b = Math.ceil(Math.max(b, k + g.preferredWidth));
                        a = Math.ceil(Math.max(a, n + s))
                    }
                }
                this.target.measuredWidth = Math.max(b, this.target.measuredWidth);
                this.target.measuredHeight = Math.max(a, this.target.measuredHeight)
            }
        };
        a.prototype.updateDisplayList = function(b, a) {
            if (null != this.target)
                for (var c =
                    this.target.numChildren, d = this._target.skin, e = 0; e < c; e++) {
                    var g = this.target.getChildAt(e);
                    if (null != g && g != d && g.includeInLayout) {
                        var k = g.horizontalCenter,
                            n = g.verticalCenter,
                            p = g.left,
                            q = g.right,
                            r = g.top,
                            s = g.bottom,
                            z = g.percentWidth,
                            A = g.percentHeight,
                            v = NaN,
                            B = NaN;
                        isNaN(p) || isNaN(q) ? isNaN(z) || (v = Math.round(b * Math.min(0.01 * z, 1))) : v = b - q - p;
                        isNaN(r) || isNaN(s) ? isNaN(A) || (B = Math.round(a * Math.min(0.01 * A, 1))) : B = a - s - r;
                        g.setLayoutBoundsSize(v, B);
                        z = g.layoutBoundsWidth;
                        A = g.layoutBoundsHeight;
                        B = v = NaN;
                        v = isNaN(k) ? isNaN(p) ?
                            isNaN(q) ? g.layoutBoundsX : b - z - q : p : Math.round((b - z) / 2 + k);
                        B = isNaN(n) ? isNaN(r) ? isNaN(s) ? g.layoutBoundsY : a - A - s : r : Math.round((a - A) / 2 + n);
                        g.setLayoutBoundsPosition(v, B)
                    }
                }
        };
        return a
    }(c.HashObject);
    c.SkinBasicLayout = e
})(egret || (egret = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(d) {
        function a() {
            d.call(this);
            this._autoRepeat = this._downEventFired = !1;
            this._repeatInterval = this._repeatDelay = 35;
            this._keepDown = this._hovered = !1;
            this._label = "";
            this.touchChildren = this._stickyHighlighting = this._mouseCaptured = !1;
            this.addHandlers()
        }
        __extends(a, d);
        Object.defineProperty(a.prototype, "autoRepeat", {
            get: function() {
                return this._autoRepeat
            },
            set: function(b) {
                b != this._autoRepeat && (this._autoRepeat = b, this.checkAutoRepeatTimerConditions(this.isDown()))
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "repeatDelay", {
            get: function() {
                return this._repeatDelay
            },
            set: function(b) {
                this._repeatDelay = b
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "repeatInterval", {
            get: function() {
                return this._repeatInterval
            },
            set: function(b) {
                this._repeatInterval = b
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "hovered", {
            get: function() {
                return this._hovered
            },
            set: function(b) {
                b != this._hovered && (this._hovered = b, this.invalidateSkinState(), this.checkButtonDownConditions())
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype._setKeepDown = function(b) {
            this._keepDown != b && (this._keepDown = b, this.invalidateSkinState())
        };
        Object.defineProperty(a.prototype, "label", {
            get: function() {
                return this._getLabel()
            },
            set: function(b) {
                this._setLabel(b)
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype._getLabel = function() {
            return this.labelDisplay ? this.labelDisplay.text : this._label
        };
        a.prototype._setLabel = function(b) {
            this._label = b;
            this.labelDisplay && (this.labelDisplay.text = b)
        };
        Object.defineProperty(a.prototype,
            "mouseCaptured", {
                get: function() {
                    return this._mouseCaptured
                },
                set: function(b) {
                    b != this._mouseCaptured && (this._mouseCaptured = b, this.invalidateSkinState(), b || this.removeStageMouseHandlers(), this.checkButtonDownConditions())
                },
                enumerable: !0,
                configurable: !0
            });
        Object.defineProperty(a.prototype, "stickyHighlighting", {
            get: function() {
                return this._stickyHighlighting
            },
            set: function(b) {
                b != this._stickyHighlighting && (this._stickyHighlighting = b, this.invalidateSkinState(), this.checkButtonDownConditions())
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype.checkButtonDownConditions = function() {
            var b = this.isDown();
            this._downEventFired != b && (b && c.UIEvent.dispatchUIEvent(this, c.UIEvent.BUTTON_DOWN), this._downEventFired = b, this.checkAutoRepeatTimerConditions(b))
        };
        a.prototype.addHandlers = function() {
            this.addEventListener(c.TouchEvent.TOUCH_ROLL_OVER, this.mouseEventHandler, this);
            this.addEventListener(c.TouchEvent.TOUCH_ROLL_OUT, this.mouseEventHandler, this);
            this.addEventListener(c.TouchEvent.TOUCH_BEGIN, this.mouseEventHandler, this);
            this.addEventListener(c.TouchEvent.TOUCH_END, this.mouseEventHandler, this);
            this.addEventListener(c.TouchEvent.TOUCH_TAP, this.mouseEventHandler, this)
        };
        a.prototype.addStageMouseHandlers = function() {
            c.UIGlobals.stage.addEventListener(c.TouchEvent.TOUCH_END, this.stage_mouseUpHandler, this);
            c.UIGlobals.stage.addEventListener(c.Event.LEAVE_STAGE, this.stage_mouseUpHandler, this)
        };
        a.prototype.removeStageMouseHandlers = function() {
            c.UIGlobals.stage.removeEventListener(c.TouchEvent.TOUCH_END, this.stage_mouseUpHandler,
                this);
            c.UIGlobals.stage.removeEventListener(c.Event.LEAVE_STAGE, this.stage_mouseUpHandler, this)
        };
        a.prototype.isDown = function() {
            return this.enabled ? this.mouseCaptured && (this.hovered || this.stickyHighlighting) ? !0 : !1 : !1
        };
        a.prototype.checkAutoRepeatTimerConditions = function(b) {
            b = this.autoRepeat && b;
            b != (null != this.autoRepeatTimer) && (b ? this.startTimer() : this.stopTimer())
        };
        a.prototype.startTimer = function() {
            this.autoRepeatTimer = new c.Timer(1);
            this.autoRepeatTimer.delay = this._repeatDelay;
            this.autoRepeatTimer.addEventListener(c.TimerEvent.TIMER,
                this.autoRepeat_timerDelayHandler, this);
            this.autoRepeatTimer.start()
        };
        a.prototype.stopTimer = function() {
            this.autoRepeatTimer.stop();
            this.autoRepeatTimer = null
        };
        a.prototype.mouseEventHandler = function(b) {
            switch (b.type) {
                case c.TouchEvent.TOUCH_ROLL_OVER:
                    if (b.touchDown && !this.mouseCaptured) break;
                    this.hovered = !0;
                    break;
                case c.TouchEvent.TOUCH_ROLL_OUT:
                    this.hovered = !1;
                    break;
                case c.TouchEvent.TOUCH_BEGIN:
                    this.addStageMouseHandlers();
                    c.InteractionMode.mode == c.InteractionMode.TOUCH && (this.hovered = !0);
                    this.mouseCaptured = !0;
                    break;
                case c.TouchEvent.TOUCH_END:
                    b.target == this && (this.hovered = !0, this.mouseCaptured && (this.buttonReleased(), this.mouseCaptured = !1));
                    break;
                case c.TouchEvent.TOUCH_TAP:
                    this.enabled ? this.clickHandler(b) : b.stopImmediatePropagation()
            }
        };
        a.prototype.buttonReleased = function() {};
        a.prototype.clickHandler = function(b) {};
        a.prototype.stage_mouseUpHandler = function(b) {
            b.target != this && (this.mouseCaptured = !1)
        };
        a.prototype.autoRepeat_timerDelayHandler = function(b) {
            this.autoRepeatTimer.reset();
            this.autoRepeatTimer.removeEventListener(c.TimerEvent.TIMER,
                this.autoRepeat_timerDelayHandler, this);
            this.autoRepeatTimer.delay = this._repeatInterval;
            this.autoRepeatTimer.addEventListener(c.TimerEvent.TIMER, this.autoRepeat_timerHandler, this);
            this.autoRepeatTimer.start()
        };
        a.prototype.autoRepeat_timerHandler = function(b) {
            c.UIEvent.dispatchUIEvent(this, c.UIEvent.BUTTON_DOWN)
        };
        a.prototype.getCurrentSkinState = function() {
            return this.enabled ? this.isDown() || this._keepDown ? "down" : c.InteractionMode.mode == c.InteractionMode.MOUSE && (this.hovered || this.mouseCaptured) ? "over" :
                "up" : d.prototype.getCurrentSkinState.call(this)
        };
        a.prototype.partAdded = function(b, a) {
            d.prototype.partAdded.call(this, b, a);
            a == this.labelDisplay && (this.labelDisplay.text = this._label)
        };
        return a
    }(c.SkinnableComponent);
    c.ButtonBase = e
})(egret || (egret = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(d) {
        function a() {
            d.call(this);
            this._autoSelected = !0
        }
        __extends(a, d);
        Object.defineProperty(a.prototype, "selected", {
            get: function() {
                return this._selected
            },
            set: function(b) {
                this._setSelected(b)
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype._setSelected = function(b) {
            b != this._selected && (this._selected = b, c.UIEvent.dispatchUIEvent(this, c.UIEvent.VALUE_COMMIT), this.invalidateSkinState())
        };
        a.prototype.getCurrentSkinState = function() {
            return this.selected ? d.prototype.getCurrentSkinState.call(this) +
                "AndSelected" : d.prototype.getCurrentSkinState.call(this)
        };
        a.prototype.buttonReleased = function() {
            d.prototype.buttonReleased.call(this);
            this._autoSelected && this.enabled && (this.selected = !this.selected, this.dispatchEventWith(c.Event.CHANGE))
        };
        return a
    }(c.ButtonBase);
    c.ToggleButtonBase = e
})(egret || (egret = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(d) {
        function a() {
            d.call(this);
            this._fontFamily = "SimSun";
            this._size = 30;
            this._textAlign = c.HorizontalAlign.LEFT;
            this._verticalAlign = c.VerticalAlign.TOP;
            this._lineSpacing = 0;
            this._textColor = 16777215;
            this._text = ""
        }
        __extends(a, d);
        Object.defineProperty(a.prototype, "fontFamily", {
            get: function() {
                return this._fontFamily
            },
            set: function(b) {
                this._fontFamily != b && (this._fontFamily = b, this.fontFamilyChanged = !0, this.invalidateProperties(), this.invalidateSize(), this.invalidateDisplayList())
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "size", {
            get: function() {
                return this._size
            },
            set: function(b) {
                this._size != b && (this._size = b, this.sizeChanged = !0, this.invalidateProperties(), this.invalidateSize(), this.invalidateDisplayList())
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "bold", {
            get: function() {
                return this._bold
            },
            set: function(b) {
                this._bold != b && (this._bold = b, this.boldChanged = !0, this.invalidateProperties(), this.invalidateSize(), this.invalidateDisplayList())
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "italic", {
            get: function() {
                return this._italic
            },
            set: function(b) {
                this._italic != b && (this._italic = b, this.italicChanged = !0, this.invalidateProperties(), this.invalidateSize(), this.invalidateDisplayList())
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "textAlign", {
            get: function() {
                return this._textAlign
            },
            set: function(b) {
                this._textAlign != b && (this._textAlign = b, this.textAlignChanged = !0, this.invalidateProperties(), this.invalidateSize(),
                    this.invalidateDisplayList())
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "verticalAlign", {
            get: function() {
                return this._verticalAlign
            },
            set: function(b) {
                this._verticalAlign != b && (this._verticalAlign = b, this.verticalAlignChanged = !0, this.invalidateProperties(), this.invalidateSize(), this.invalidateDisplayList())
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "lineSpacing", {
            get: function() {
                return this._lineSpacing
            },
            set: function(b) {
                this._lineSpacing != b && (this._lineSpacing =
                    b, this.lineSpacingChanged = !0, this.invalidateProperties(), this.invalidateSize(), this.invalidateDisplayList())
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "textColor", {
            get: function() {
                return this._textColor
            },
            set: function(b) {
                this._textColor != b && (this._textColor = b, this.textColorChanged = !0, this.invalidateProperties())
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "text", {
            get: function() {
                return this._text
            },
            set: function(b) {
                b != this._text && (this._text = b, this._textChanged = !0, this.invalidateProperties(), this.invalidateSize(), this.invalidateDisplayList())
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype.createChildren = function() {
            d.prototype.createChildren.call(this);
            this._textField || this.checkTextField()
        };
        a.prototype.commitProperties = function() {
            d.prototype.commitProperties.call(this);
            this._textField || this.checkTextField();
            this.fontFamilyChanged && (this._textField.fontFamily = this._fontFamily, this.fontFamilyChanged = !1);
            this.sizeChanged && (this._textField.size = this._size, this.sizeChanged = !1);
            this.boldChanged && (this._textField.bold = this._bold, this.boldChanged = !1);
            this.italic && (this._textField.italic = this._italic, this.italicChanged = !1);
            this.textAlignChanged && (this._textField.textAlign = this._textAlign, this.textAlignChanged = !1);
            this.verticalAlignChanged && (this._textField.verticalAlign = this._verticalAlign, this.verticalAlignChanged = !1);
            this.lineSpacingChanged && (this._textField.lineSpacing = this._lineSpacing, this.lineSpacingChanged = !1);
            this.textColorChanged && (this._textField.textColor = this._textColor,
                this.textColorChanged = !1);
            this._textChanged && (this._textField.text = this._text, this._textChanged = !1)
        };
        a.prototype.checkTextField = function() {
            this._textField || (this.createTextField(), this._textField.text = this._text, this._textChanged = !0, this.invalidateProperties())
        };
        a.prototype.createTextField = function() {
            this._textField = new c.TextField;
            this._textField.fontFamily = this._fontFamily;
            this._textField.size = this._size;
            this._textField.textAlign = this._textAlign;
            this._textField.verticalAlign = this._verticalAlign;
            this._textField.lineSpacing = this._lineSpacing;
            this._textField.textColor = this._textColor;
            this._addToDisplayList(this._textField)
        };
        a.prototype.measure = function() {
            d.prototype.measure.call(this);
            this.measuredWidth = a.DEFAULT_MEASURED_WIDTH;
            this.measuredHeight = a.DEFAULT_MEASURED_HEIGHT
        };
        a.prototype.$updateDisplayList = function(b, a) {
            d.prototype.updateDisplayList.call(this, b, a)
        };
        a.prototype.updateDisplayList = function(b, a) {
            d.prototype.updateDisplayList.call(this, b, a);
            this._textField.width = b;
            this._textField.height =
                a
        };
        a.DEFAULT_MEASURED_WIDTH = 160;
        a.DEFAULT_MEASURED_HEIGHT = 22;
        return a
    }(c.UIComponent);
    c.TextBase = e
})(egret || (egret = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(d) {
        function a() {
            d.call(this);
            this._contentHeight = this._contentWidth = 0;
            this._clipAndEnableScrolling = !1;
            this._verticalScrollPosition = this._horizontalScrollPosition = 0;
            this.touchEnabled = this._layoutInvalidateSizeFlag = this._layoutInvalidateDisplayListFlag = !1
        }
        __extends(a, d);
        a.prototype.createChildren = function() {
            d.prototype.createChildren.call(this);
            this._layout || (this.layout = new c.BasicLayout)
        };
        Object.defineProperty(a.prototype, "contentWidth", {
            get: function() {
                return this._contentWidth
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype.setContentWidth = function(b) {
            if (b != this._contentWidth) {
                var a = this._contentWidth;
                this._contentWidth = b;
                this.hasEventListener("propertyChange") && c.PropertyChangeEvent.dispatchPropertyChangeEvent(this, c.PropertyChangeEventKind.UPDATE, "contentWidth", a, b, this)
            }
        };
        Object.defineProperty(a.prototype, "contentHeight", {
            get: function() {
                return this._contentHeight
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype.setContentHeight = function(b) {
            if (b != this._contentHeight) {
                var a = this._contentHeight;
                this._contentHeight = b;
                this.hasEventListener("propertyChange") && c.PropertyChangeEvent.dispatchPropertyChangeEvent(this, c.PropertyChangeEventKind.UPDATE, "contentHeight", a, b, this)
            }
        };
        a.prototype.setContentSize = function(b, a) {
            if (b != this._contentWidth || a != this._contentHeight) this.setContentWidth(b), this.setContentHeight(a)
        };
        Object.defineProperty(a.prototype, "layout", {
            get: function() {
                return this._layout
            },
            set: function(b) {
                this._setLayout(b)
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype._setLayout = function(b) {
            if (this._layout !=
                b) {
                this._layout && (this._layout.target = null);
                if (this._layout = b) this._layout.target = this;
                this.invalidateSize();
                this.invalidateDisplayList();
                this.dispatchEventWith("layoutChanged")
            }
        };
        Object.defineProperty(a.prototype, "clipAndEnableScrolling", {
            get: function() {
                return this._clipAndEnableScrolling
            },
            set: function(b) {
                b != this._clipAndEnableScrolling && (this.scrollRect = (this._clipAndEnableScrolling = b) ? new c.Rectangle(this._horizontalScrollPosition, this._verticalScrollPosition, this.width, this.height) : null)
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "horizontalScrollPosition", {
            get: function() {
                return this._horizontalScrollPosition
            },
            set: function(b) {
                if (b != this._horizontalScrollPosition) {
                    var a = this._horizontalScrollPosition;
                    this._horizontalScrollPosition = b;
                    this.scrollPositionChanged();
                    c.PropertyChangeEvent.dispatchPropertyChangeEvent(this, c.PropertyChangeEventKind.UPDATE, "horizontalScrollPosition", a, b, this)
                }
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "verticalScrollPosition", {
            get: function() {
                return this._verticalScrollPosition
            },
            set: function(b) {
                if (b != this._verticalScrollPosition) {
                    var a = this._verticalScrollPosition;
                    this._verticalScrollPosition = b;
                    this.scrollPositionChanged();
                    c.PropertyChangeEvent.dispatchPropertyChangeEvent(this, c.PropertyChangeEventKind.UPDATE, "verticalScrollPosition", a, b, this)
                }
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype.scrollPositionChanged = function() {
            this._clipAndEnableScrolling && (this.updateScrollRect(this.width, this.height), this._invalidateDisplayListExceptLayout(),
                this._layout && this._layout.scrollPositionChanged())
        };
        a.prototype.updateScrollRect = function(b, a) {
            var d = this._scrollRect;
            this._clipAndEnableScrolling ? d ? (d.x = this._horizontalScrollPosition, d.y = this._verticalScrollPosition, d.width = b, d.height = a) : this._scrollRect = new c.Rectangle(this._horizontalScrollPosition, this._verticalScrollPosition, b, a) : d && (this._scrollRect = null)
        };
        a.prototype.measure = function() {
            this._layout && this._layoutInvalidateSizeFlag && (d.prototype.measure.call(this), this._layout.measure())
        };
        a.prototype._invalidateDisplayListExceptLayout = function() {
            d.prototype.invalidateDisplayList.call(this)
        };
        a.prototype.invalidateDisplayList = function() {
            d.prototype.invalidateDisplayList.call(this);
            this._layoutInvalidateDisplayListFlag = !0
        };
        a.prototype._childXYChanged = function() {
            this.invalidateSize();
            this.invalidateDisplayList()
        };
        a.prototype._invalidateSizeExceptLayout = function() {
            d.prototype.invalidateSize.call(this)
        };
        a.prototype.invalidateSize = function() {
            d.prototype.invalidateSize.call(this);
            this._layoutInvalidateSizeFlag = !0
        };
        a.prototype.updateDisplayList = function(b, a) {
            d.prototype.updateDisplayList.call(this, b, a);
            this._layoutInvalidateDisplayListFlag && this._layout && (this._layoutInvalidateDisplayListFlag = !1, this._layout.updateDisplayList(b, a), this.updateScrollRect(b, a))
        };
        Object.defineProperty(a.prototype, "numElements", {
            get: function() {
                return -1
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype.getElementAt = function(b) {
            return null
        };
        a.prototype.getElementIndex = function(b) {
            return -1
        };
        a.prototype.getElementIndicesInView = function() {
            var b = [],
                a;
            if (this.scrollRect)
                for (a = 0; a < this.numChildren; a++) {
                    var d = this.getChildAt(a);
                    if (d) {
                        var e = new c.Rectangle;
                        e.x = d.layoutBoundsX;
                        e.y = d.layoutBoundsY;
                        e.width = d.layoutBoundsWidth;
                        e.height = d.layoutBoundsHeight;
                        this.scrollRect.intersects(e) && b.push(a)
                    }
                } else
                    for (a = 0; a < this.numChildren; a++) b.push(a);
            return b
        };
        a.prototype.setVirtualElementIndicesInView = function(b, a) {};
        a.prototype.getVirtualElementAt = function(b) {
            return this.getElementAt(b)
        };
        return a
    }(c.UIComponent);
    c.GroupBase = e
})(egret || (egret = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(c) {
        function a() {
            c.call(this);
            this._selected = this.dataChangedFlag = !1;
            this._itemIndex = -1;
            this.touchChildren = !0
        }
        __extends(a, c);
        Object.defineProperty(a.prototype, "data", {
            get: function() {
                return this._data
            },
            set: function(b) {
                this._data = b;
                this.initialized || this.parent ? (this.dataChangedFlag = !1, this.dataChanged()) : (this.dataChangedFlag = !0, this.invalidateProperties())
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype.dataChanged = function() {};
        Object.defineProperty(a.prototype, "selected", {
            get: function() {
                return this._selected
            },
            set: function(b) {
                this._selected != b && (this._selected = b, this.invalidateSkinState())
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "itemIndex", {
            get: function() {
                return this._itemIndex
            },
            set: function(b) {
                this._itemIndex = b
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype.commitProperties = function() {
            c.prototype.commitProperties.call(this);
            this.dataChangedFlag && (this.dataChangedFlag = !1, this.dataChanged())
        };
        a.prototype.getCurrentSkinState = function() {
            return this._selected ?
                "down" : c.prototype.getCurrentSkinState.call(this)
        };
        return a
    }(c.ButtonBase);
    c.ItemRenderer = e
})(egret || (egret = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(d) {
        function a() {
            d.call(this);
            this._indentation = 17;
            this._depth = 0;
            this._isOpen = this._hasChildren = !1;
            this.addEventListener(c.TouchEvent.TOUCH_BEGIN, this.onItemMouseDown, this, !1, 1E3)
        }
        __extends(a, d);
        a.prototype.onItemMouseDown = function(b) {
            b.target == this.disclosureButton && b.stopImmediatePropagation()
        };
        Object.defineProperty(a.prototype, "indentation", {
            get: function() {
                return this._indentation
            },
            set: function(b) {
                this._indentation = b
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype,
            "iconSkinName", {
                get: function() {
                    return this._iconSkinName
                },
                set: function(b) {
                    this._iconSkinName != b && (this._iconSkinName = b, this.iconDisplay && (this.iconDisplay.source = this._iconSkinName))
                },
                enumerable: !0,
                configurable: !0
            });
        Object.defineProperty(a.prototype, "depth", {
            get: function() {
                return this._depth
            },
            set: function(b) {
                b != this._depth && (this._depth = b, this.contentGroup && (this.contentGroup.x = this._depth * this._indentation))
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "hasChildren", {
            get: function() {
                return this._hasChildren
            },
            set: function(b) {
                this._hasChildren != b && (this._hasChildren = b, this.disclosureButton && (this.disclosureButton.visible = this._hasChildren))
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "opened", {
            get: function() {
                return this._isOpen
            },
            set: function(b) {
                this._isOpen != b && (this._isOpen = b, this.disclosureButton && (this.disclosureButton.selected = this._isOpen))
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype.partAdded = function(b, a) {
            d.prototype.partAdded.call(this, b, a);
            a == this.iconDisplay ? this.iconDisplay.source =
                this._iconSkinName : a == this.disclosureButton ? (this.disclosureButton.visible = this._hasChildren, this.disclosureButton.selected = this._isOpen, this.disclosureButton._autoSelected = !1, this.disclosureButton.addEventListener(c.TouchEvent.TOUCH_BEGIN, this.disclosureButton_mouseDownHandler, this)) : a == this.contentGroup && (this.contentGroup.x = this._depth * this._indentation)
        };
        a.prototype.partRemoved = function(b, a) {
            d.prototype.partRemoved.call(this, b, a);
            a == this.iconDisplay ? this.iconDisplay.source = null : a == this.disclosureButton &&
                (this.disclosureButton.removeEventListener(c.TouchEvent.TOUCH_BEGIN, this.disclosureButton_mouseDownHandler, this), this.disclosureButton._autoSelected = !0, this.disclosureButton.visible = !0)
        };
        a.prototype.disclosureButton_mouseDownHandler = function(b) {
            c.TreeEvent.dispatchTreeEvent(this, c.TreeEvent.ITEM_OPENING, this.itemIndex, this.data, this, !this._isOpen)
        };
        return a
    }(c.ItemRenderer);
    c.TreeItemRenderer = e
})(egret || (egret = {}));
(function(c) {
    var e = function() {
        function d(a, b) {
            this.easerFunction = c.Ease.sineInOut;
            this._duration = 500;
            this._startDelay = 0;
            this._repeatCount = 1;
            this._repeatDelay = 0;
            this.motionPaths = [];
            this._currentValue = {};
            this.pauseTime = 0;
            this._isPaused = !1;
            this.startTime = 0;
            this._started = !1;
            this.playedTimes = 0;
            this.updateFunction = a;
            this.thisObject = b
        }
        Object.defineProperty(d.prototype, "isPlaying", {
            get: function() {
                return this._isPlaying
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(d.prototype, "duration", {
            get: function() {
                return this._duration
            },
            set: function(a) {
                this._duration = a
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(d.prototype, "startDelay", {
            get: function() {
                return this._startDelay
            },
            set: function(a) {
                this._startDelay = a
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(d.prototype, "repeatCount", {
            get: function() {
                return this._repeatCount
            },
            set: function(a) {
                this._repeatCount = a
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(d.prototype, "repeatDelay", {
            get: function() {
                return this._repeatDelay
            },
            set: function(a) {
                this._repeatDelay =
                    a
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(d.prototype, "currentValue", {
            get: function() {
                return this._currentValue
            },
            enumerable: !0,
            configurable: !0
        });
        d.prototype.play = function() {
            this.stopAnimation();
            this.start()
        };
        d.prototype.seek = function(a) {
            a = Math.min(a, this.duration);
            this.caculateCurrentValue(a / this.duration);
            this.startTime = c.getTimer() - a - this._startDelay;
            null != this.updateFunction && this.updateFunction.call(this.thisObject, this)
        };
        d.prototype.start = function() {
            this.playedTimes = 0;
            this._started = !0;
            this._isPlaying = !1;
            this._currentValue = {};
            this.caculateCurrentValue(0);
            this.startTime = c.getTimer();
            d.currentTime = this.startTime;
            this.doInterval();
            d.addAnimation(this)
        };
        d.prototype.end = function() {
            this._started || (this.caculateCurrentValue(0), null != this.startFunction && this.startFunction.call(this.thisObject, this), null != this.updateFunction && this.updateFunction.call(this.thisObject, this));
            this.caculateCurrentValue(1);
            null != this.updateFunction && this.updateFunction.call(this.thisObject, this);
            this.stopAnimation();
            null != this.endFunction && this.endFunction.call(this.thisObject, this)
        };
        d.prototype.stop = function() {
            this.stopAnimation();
            null != this.stopFunction && this.stopFunction.call(this.thisObject, this)
        };
        d.prototype.stopAnimation = function() {
            this.playedTimes = 0;
            this._isPlaying = !1;
            this.startTime = 0;
            this._started = !1;
            d.removeAnimation(this)
        };
        Object.defineProperty(d.prototype, "isPaused", {
            get: function() {
                return this._isPaused
            },
            enumerable: !0,
            configurable: !0
        });
        d.prototype.pause = function() {
            this._started && (this._isPaused = !0,
                this.pauseTime = c.getTimer(), this._isPlaying = !1, d.removeAnimation(this))
        };
        d.prototype.resume = function() {
            this._started && this._isPaused && (this._isPaused = !1, this.startTime += c.getTimer() - this.pauseTime, this.pauseTime = -1, d.addAnimation(this))
        };
        Object.defineProperty(d.prototype, "started", {
            get: function() {
                return this._started
            },
            enumerable: !0,
            configurable: !0
        });
        d.prototype.doInterval = function() {
            var a = d.currentTime - this.startTime - (0 < this.playedTimes ? this._repeatDelay : this._startDelay);
            if (0 > a) return !1;
            this._isPlaying ||
                (this._isPlaying = !0, 0 == this.playedTimes && null != this.startFunction && this.startFunction.call(this.thisObject, this));
            var b = 0 == this._duration ? 1 : Math.min(a, this._duration) / this._duration;
            this.caculateCurrentValue(b);
            null != this.updateFunction && this.updateFunction.call(this.thisObject, this);
            if (a = a >= this._duration) this.playedTimes++, this._isPlaying = !1, this.startTime = d.currentTime, 0 == this._repeatCount || this.playedTimes < this._repeatCount ? a = !1 : (d.removeAnimation(this), this._started = !1, this.playedTimes = 0);
            a &&
                null != this.endFunction && this.endFunction.call(this.thisObject, this);
            return a
        };
        d.prototype.caculateCurrentValue = function(a) {
            this.easerFunction && (a = this.easerFunction(a));
            for (var b = this.motionPaths, c = b.length, d = 0; d < c; d++) {
                var e = b[d];
                this.currentValue[e.prop] = e.from + (e.to - e.from) * a
            }
        };
        d.addAnimation = function(a) {
            -1 == d.activeAnimations.indexOf(a) && (d.activeAnimations.push(a), d.registered || (d.registered = !0, c.Ticker.getInstance().register(d.onEnterFrame, null)))
        };
        d.removeAnimation = function(a) {
            a = d.activeAnimations.indexOf(a); - 1 != a && (d.activeAnimations.splice(a, 1), a <= d.currentIntervalIndex && d.currentIntervalIndex--);
            0 == d.activeAnimations.length && d.registered && (d.registered = !1, c.Ticker.getInstance().unregister(d.onEnterFrame, null))
        };
        d.onEnterFrame = function(a, b) {
            d.currentTime = c.getTimer();
            for (d.currentIntervalIndex = 0; d.currentIntervalIndex < d.activeAnimations.length;) d.activeAnimations[d.currentIntervalIndex].doInterval(), d.currentIntervalIndex++;
            d.currentIntervalIndex = -1;
            0 == d.activeAnimations.length && d.registered && (d.registered = !1, c.Ticker.getInstance().unregister(d.onEnterFrame, null))
        };
        d.currentTime = 0;
        d.TIMER_RESOLUTION = 1E3 / 60;
        d.activeAnimations = [];
        d.currentIntervalIndex = -1;
        return d
    }();
    c.Animation = e
})(egret || (egret = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(c) {
        function a() {
            c.call(this);
            this._maximum = 100;
            this.maxChanged = !1;
            this._minimum = 0;
            this.minChanged = !1;
            this._stepSize = 1;
            this.stepSizeChanged = !1;
            this._changedValue = this._value = 0;
            this.valueChanged = !1;
            this._snapInterval = 1;
            this._explicitSnapInterval = this.snapIntervalChanged = !1
        }
        __extends(a, c);
        Object.defineProperty(a.prototype, "maximum", {
            get: function() {
                return this._maximum
            },
            set: function(b) {
                this._setMaximun(b)
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype._setMaximun = function(b) {
            b !=
                this._maximum && (this._maximum = b, this.maxChanged = !0, this.invalidateProperties())
        };
        Object.defineProperty(a.prototype, "minimum", {
            get: function() {
                return this._minimum
            },
            set: function(b) {
                this._setMinimun(b)
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype._setMinimun = function(b) {
            b != this._minimum && (this._minimum = b, this.minChanged = !0, this.invalidateProperties())
        };
        Object.defineProperty(a.prototype, "stepSize", {
            get: function() {
                return this._stepSize
            },
            set: function(b) {
                b != this._stepSize && (this._stepSize = b, this.stepSizeChanged = !0, this.invalidateProperties())
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "value", {
            get: function() {
                return this._getValue()
            },
            set: function(b) {
                this._setValue(b)
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype._setValue = function(b) {
            b != this.value && (this._changedValue = b, this.valueChanged = !0, this.invalidateProperties())
        };
        a.prototype._getValue = function() {
            return this.valueChanged ? this._changedValue : this._value
        };
        Object.defineProperty(a.prototype, "snapInterval", {
            get: function() {
                return this._snapInterval
            },
            set: function(b) {
                this._explicitSnapInterval = !0;
                b != this._snapInterval && (isNaN(b) ? (this._snapInterval = 1, this._explicitSnapInterval = !1) : this._snapInterval = b, this.stepSizeChanged = this.snapIntervalChanged = !0, this.invalidateProperties())
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype.commitProperties = function() {
            c.prototype.commitProperties.call(this);
            this.minimum > this.maximum && (this.maxChanged ? this._maximum = this._minimum : this._minimum = this._maximum);
            if (this.valueChanged || this.maxChanged || this.minChanged ||
                this.snapIntervalChanged) {
                var b = this.valueChanged ? this._changedValue : this._value;
                this.snapIntervalChanged = this.minChanged = this.maxChanged = this.valueChanged = !1;
                this.setValue(this.nearestValidValue(b, this.snapInterval))
            }
            this.stepSizeChanged && (this._explicitSnapInterval ? this._stepSize = this.nearestValidSize(this._stepSize) : (this._snapInterval = this._stepSize, this.setValue(this.nearestValidValue(this._value, this.snapInterval))), this.stepSizeChanged = !1)
        };
        a.prototype.nearestValidSize = function(b) {
            var a = this.snapInterval;
            if (0 == a) return b;
            b = Math.round(b / a) * a;
            return Math.abs(b) < a ? a : b
        };
        a.prototype.nearestValidValue = function(b, a) {
            if (0 == a) return Math.max(this.minimum, Math.min(this.maximum, b));
            var c = this.maximum - this.minimum,
                d = 1;
            b -= this.minimum;
            a != Math.round(a) && (d = (1 + a).toString().split("."), d = Math.pow(10, d[1].length), c *= d, b = Math.round(b * d), a = Math.round(a * d));
            var e = Math.max(0, Math.floor(b / a) * a),
                c = Math.min(c, Math.floor((b + a) / a) * a);
            return (b - e >= (c - e) / 2 ? c : e) / d + this.minimum
        };
        a.prototype.setValue = function(b) {
            this._value != b &&
                (isNaN(b) && (b = 0), !isNaN(this.maximum) && !isNaN(this.minimum) && this.maximum > this.minimum ? this._value = Math.min(this.maximum, Math.max(this.minimum, b)) : this._value = b, this.valueChanged = !1)
        };
        a.prototype.changeValueByStep = function(b) {
            "undefined" === typeof b && (b = !0);
            0 != this.stepSize && this.setValue(this.nearestValidValue(b ? this.value + this.stepSize : this.value - this.stepSize, this.snapInterval))
        };
        return a
    }(c.SkinnableComponent);
    c.Range = e
})(egret || (egret = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(d) {
        function a() {
            d.call(this);
            this._slideDuration = 300;
            this.needUpdateValue = !1;
            this.addEventListener(c.Event.ADDED_TO_STAGE, this.addedToStageHandler, this);
            this.addEventListener(c.TouchEvent.TOUCH_BEGIN, this.mouseDownHandler, this)
        }
        __extends(a, d);
        Object.defineProperty(a.prototype, "slideDuration", {
            get: function() {
                return this._slideDuration
            },
            set: function(b) {
                this._slideDuration = b
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "maximum", {
            get: function() {
                return this._maximum
            },
            set: function(b) {
                b != this._maximum && (this._setMaximun(b), this.invalidateDisplayList())
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "minimum", {
            get: function() {
                return this._minimum
            },
            set: function(b) {
                b != this._minimum && (this._setMinimun(b), this.invalidateDisplayList())
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "value", {
            get: function() {
                return this._getValue()
            },
            set: function(b) {
                b != this._getValue() && (this._setValue(b), this.invalidateDisplayList())
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype.setValue = function(b) {
            d.prototype.setValue.call(this, b);
            this.invalidateDisplayList()
        };
        a.prototype.pointToValue = function(b, a) {
            return this.minimum
        };
        a.prototype.changeValueByStep = function(b) {
            "undefined" === typeof b && (b = !0);
            var a = this.value;
            d.prototype.changeValueByStep.call(this, b);
            this.value != a && this.dispatchEventWith(c.Event.CHANGE)
        };
        a.prototype.partAdded = function(b, a) {
            d.prototype.partAdded.call(this, b, a);
            a == this.thumb ? (this.thumb.addEventListener(c.TouchEvent.TOUCH_BEGIN,
                this.thumb_mouseDownHandler, this), this.thumb.addEventListener(c.ResizeEvent.RESIZE, this.thumb_resizeHandler, this), this.thumb.addEventListener(c.UIEvent.UPDATE_COMPLETE, this.thumb_updateCompleteHandler, this), this.thumb.stickyHighlighting = !0) : a == this.track && (this.track.addEventListener(c.TouchEvent.TOUCH_BEGIN, this.track_mouseDownHandler, this), this.track.addEventListener(c.ResizeEvent.RESIZE, this.track_resizeHandler, this))
        };
        a.prototype.partRemoved = function(b, a) {
            d.prototype.partRemoved.call(this, b, a);
            a == this.thumb ? (this.thumb.removeEventListener(c.TouchEvent.TOUCH_BEGIN, this.thumb_mouseDownHandler, this), this.thumb.removeEventListener(c.ResizeEvent.RESIZE, this.thumb_resizeHandler, this), this.thumb.removeEventListener(c.UIEvent.UPDATE_COMPLETE, this.thumb_updateCompleteHandler, this)) : a == this.track && (this.track.removeEventListener(c.TouchEvent.TOUCH_BEGIN, this.track_mouseDownHandler, this), this.track.removeEventListener(c.ResizeEvent.RESIZE, this.track_resizeHandler, this))
        };
        a.prototype.updateDisplayList =
            function(b, a) {
                d.prototype.updateDisplayList.call(this, b, a);
                this.updateSkinDisplayList()
            };
        a.prototype.updateSkinDisplayList = function() {};
        a.prototype.addedToStageHandler = function(b) {
            this.updateSkinDisplayList()
        };
        a.prototype.track_resizeHandler = function(b) {
            this.updateSkinDisplayList()
        };
        a.prototype.thumb_resizeHandler = function(b) {
            this.updateSkinDisplayList()
        };
        a.prototype.thumb_updateCompleteHandler = function(b) {
            this.updateSkinDisplayList();
            this.thumb.removeEventListener(c.UIEvent.UPDATE_COMPLETE, this.thumb_updateCompleteHandler,
                this)
        };
        a.prototype.thumb_mouseDownHandler = function(b) {
            c.UIGlobals.stage.addEventListener(c.TouchEvent.TOUCH_MOVE, this.stage_mouseMoveHandler, this);
            c.UIGlobals.stage.addEventListener(c.TouchEvent.TOUCH_END, this.stage_mouseUpHandler, this);
            c.UIGlobals.stage.addEventListener(c.Event.LEAVE_STAGE, this.stage_mouseUpHandler, this);
            this.addEventListener(c.Event.ENTER_FRAME, this.onEnterFrame, this);
            b = this.thumb.globalToLocal(b.stageX, b.stageY, c.Point.identity);
            this._clickOffsetX = b.x;
            this._clickOffsetY = b.y;
            c.TrackBaseEvent.dispatchTrackBaseEvent(this,
                c.TrackBaseEvent.THUMB_PRESS);
            c.UIEvent.dispatchUIEvent(this, c.UIEvent.CHANGE_START)
        };
        a.prototype.onEnterFrame = function(b) {
            this.needUpdateValue && this.track && (this.updateWhenMouseMove(), this.needUpdateValue = !1)
        };
        a.prototype.updateWhenMouseMove = function() {
            if (this.track) {
                var b = this.track.globalToLocal(this._moveStageX, this._moveStageY, c.Point.identity),
                    b = this.pointToValue(b.x - this._clickOffsetX, b.y - this._clickOffsetY),
                    b = this.nearestValidValue(b, this.snapInterval);
                b != this.value && (this.setValue(b), this.validateDisplayList(),
                    c.TrackBaseEvent.dispatchTrackBaseEvent(this, c.TrackBaseEvent.THUMB_DRAG), this.dispatchEventWith(c.Event.CHANGE))
            }
        };
        a.prototype.stage_mouseMoveHandler = function(b) {
            this._moveStageX = b.stageX;
            this._moveStageY = b.stageY;
            this.needUpdateValue || (this.needUpdateValue = !0)
        };
        a.prototype.stage_mouseUpHandler = function(b) {
            c.UIGlobals.stage.removeEventListener(c.TouchEvent.TOUCH_MOVE, this.stage_mouseMoveHandler, this);
            c.UIGlobals.stage.removeEventListener(c.TouchEvent.TOUCH_END, this.stage_mouseUpHandler, this);
            c.UIGlobals.stage.removeEventListener(c.Event.LEAVE_STAGE,
                this.stage_mouseUpHandler, this);
            this.removeEventListener(c.Event.ENTER_FRAME, this.updateWhenMouseMove, this);
            this.needUpdateValue && (this.updateWhenMouseMove(), this.needUpdateValue = !1);
            c.TrackBaseEvent.dispatchTrackBaseEvent(this, c.TrackBaseEvent.THUMB_RELEASE);
            c.UIEvent.dispatchUIEvent(this, c.UIEvent.CHANGE_END)
        };
        a.prototype.track_mouseDownHandler = function(b) {};
        a.prototype.mouseDownHandler = function(b) {
            c.UIGlobals.stage.addEventListener(c.TouchEvent.TOUCH_END, this.stage_mouseUpSomewhereHandler, this);
            c.UIGlobals.stage.addEventListener(c.Event.LEAVE_STAGE, this.stage_mouseUpSomewhereHandler, this);
            this.mouseDownTarget = b.target
        };
        a.prototype.stage_mouseUpSomewhereHandler = function(b) {
            c.UIGlobals.stage.removeEventListener(c.TouchEvent.TOUCH_END, this.stage_mouseUpSomewhereHandler, this);
            c.UIGlobals.stage.removeEventListener(c.Event.LEAVE_STAGE, this.stage_mouseUpSomewhereHandler, this);
            if (this.mouseDownTarget != b.target && b instanceof c.TouchEvent && this.contains(b.target)) {
                var a = b.target.localToGlobal(b.localX,
                    b.localY);
                c.TouchEvent.dispatchTouchEvent(this, c.TouchEvent.TOUCH_TAP, b.touchPointID, a.x, a.y, b.ctrlKey, b.altKey, b.shiftKey, b.touchDown)
            }
            this.mouseDownTarget = null
        };
        return a
    }(c.Range);
    c.TrackBase = e
})(egret || (egret = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(d) {
        function a() {
            d.call(this);
            this._showTrackHighlight = !0;
            this._pendingValue = 0;
            this._liveDragging = !0;
            this.maximum = 10
        }
        __extends(a, d);
        Object.defineProperty(a.prototype, "showTrackHighlight", {
            get: function() {
                return this._showTrackHighlight
            },
            set: function(b) {
                this._showTrackHighlight != b && (this._showTrackHighlight = b, this.trackHighlight && (this.trackHighlight.visible = b), this.invalidateDisplayList())
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "pendingValue", {
            get: function() {
                return this._pendingValue
            },
            set: function(b) {
                b != this._pendingValue && (this._pendingValue = b, this.invalidateDisplayList())
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype.setValue = function(b) {
            this._pendingValue = b;
            d.prototype.setValue.call(this, b)
        };
        a.prototype.animationUpdateHandler = function(b) {
            this.pendingValue = b.currentValue.value
        };
        a.prototype.animationEndHandler = function(b) {
            this.setValue(this.slideToValue);
            this.dispatchEventWith(c.Event.CHANGE);
            c.UIEvent.dispatchUIEvent(this, c.UIEvent.CHANGE_END)
        };
        a.prototype.stopAnimation = function() {
            this.animator.stop();
            this.setValue(this.nearestValidValue(this.pendingValue, this.snapInterval));
            this.dispatchEventWith(c.Event.CHANGE);
            c.UIEvent.dispatchUIEvent(this, c.UIEvent.CHANGE_END)
        };
        a.prototype.thumb_mouseDownHandler = function(b) {
            this.animator && this.animator.isPlaying && this.stopAnimation();
            d.prototype.thumb_mouseDownHandler.call(this, b)
        };
        Object.defineProperty(a.prototype, "liveDragging", {
            get: function() {
                return this._liveDragging
            },
            set: function(b) {
                this._liveDragging =
                    b
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype.updateWhenMouseMove = function() {
            if (this.track) {
                var b = this.track.globalToLocal(this._moveStageX, this._moveStageY, c.Point.identity),
                    b = this.pointToValue(b.x - this._clickOffsetX, b.y - this._clickOffsetY),
                    b = this.nearestValidValue(b, this.snapInterval);
                b != this.pendingValue && (c.TrackBaseEvent.dispatchTrackBaseEvent(this, c.TrackBaseEvent.THUMB_DRAG), !0 == this.liveDragging ? (this.setValue(b), this.dispatchEventWith(c.Event.CHANGE)) : this.pendingValue = b)
            }
        };
        a.prototype.stage_mouseUpHandler =
            function(b) {
                d.prototype.stage_mouseUpHandler.call(this, b);
                !1 == this.liveDragging && this.value != this.pendingValue && (this.setValue(this.pendingValue), this.dispatchEventWith(c.Event.CHANGE))
            };
        a.prototype.track_mouseDownHandler = function(b) {
            this.enabled && (b = this.track.globalToLocal(b.stageX - (this.thumb ? this.thumb.width : 0) / 2, b.stageY - (this.thumb ? this.thumb.height : 0) / 2, c.Point.identity), b = this.pointToValue(b.x, b.y), b = this.nearestValidValue(b, this.snapInterval), b != this.pendingValue && (0 != this.slideDuration ?
                (this.animator || (this.animator = new c.Animation(this.animationUpdateHandler, this), this.animator.endFunction = this.animationEndHandler), this.animator.isPlaying && this.stopAnimation(), this.slideToValue = b, this.animator.duration = this.slideDuration * (Math.abs(this.pendingValue - this.slideToValue) / (this.maximum - this.minimum)), this.animator.motionPaths = [{
                    prop: "value",
                    from: this.pendingValue,
                    to: this.slideToValue
                }], c.UIEvent.dispatchUIEvent(this, c.UIEvent.CHANGE_START), this.animator.play()) : (this.setValue(b), this.dispatchEventWith(c.Event.CHANGE))))
        };
        a.prototype.partAdded = function(b, a) {
            d.prototype.partAdded.call(this, b, a);
            a == this.trackHighlight && (this.trackHighlight.touchEnabled = !1, this.trackHighlight instanceof c.DisplayObjectContainer && (this.trackHighlight.touchChildren = !1), this.trackHighlight.visible = this._showTrackHighlight)
        };
        return a
    }(c.TrackBase);
    c.SliderBase = e
})(egret || (egret = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(d) {
        function a() {
            d.call(this);
            this._maxDisplayedLines = 0;
            this.lastUnscaledWidth = NaN;
            this._padding = 0;
            this._paddingBottom = this._paddingTop = this._paddingRight = this._paddingLeft = NaN;
            this.addEventListener(c.UIEvent.UPDATE_COMPLETE, this.updateCompleteHandler, this)
        }
        __extends(a, d);
        a.prototype.updateCompleteHandler = function(b) {
            this.lastUnscaledWidth = NaN
        };
        Object.defineProperty(a.prototype, "maxDisplayedLines", {
            get: function() {
                return this._maxDisplayedLines
            },
            set: function(b) {
                this._maxDisplayedLines !=
                    b && (this._maxDisplayedLines = b, this.invalidateSize(), this.invalidateDisplayList())
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "padding", {
            get: function() {
                return this._padding
            },
            set: function(b) {
                this._padding != b && (this._padding = b, this.invalidateSize(), this.invalidateDisplayList())
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "paddingLeft", {
            get: function() {
                return this._paddingLeft
            },
            set: function(b) {
                this._paddingLeft != b && (this._paddingLeft = b, this.invalidateSize(),
                    this.invalidateDisplayList())
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "paddingRight", {
            get: function() {
                return this._paddingRight
            },
            set: function(b) {
                this._paddingRight != b && (this._paddingRight = b, this.invalidateSize(), this.invalidateDisplayList())
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "paddingTop", {
            get: function() {
                return this._paddingTop
            },
            set: function(b) {
                this._paddingTop != b && (this._paddingTop = b, this.invalidateSize(), this.invalidateDisplayList())
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "paddingBottom", {
            get: function() {
                return this._paddingBottom
            },
            set: function(b) {
                this._paddingBottom != b && (this._paddingBottom = b, this.invalidateSize(), this.invalidateDisplayList())
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype.measure = function() {
            this._invalidatePropertiesFlag && this.validateProperties();
            if (this.isSpecialCase())
                if (isNaN(this.lastUnscaledWidth)) this._oldPreferHeight = this._oldPreferWidth = NaN;
                else {
                    this.measureUsingWidth(this.lastUnscaledWidth);
                    return
                }
            var b;
            isNaN(this.explicitWidth) ? 1E4 != this.maxWidth && (b = this.maxWidth) : b = this.explicitWidth;
            this.measureUsingWidth(b)
        };
        a.prototype.isSpecialCase = function() {
            return 1 != this._maxDisplayedLines && (!isNaN(this.percentWidth) || !isNaN(this.left) && !isNaN(this.right)) && isNaN(this.explicitHeight) && isNaN(this.percentHeight)
        };
        a.prototype.measureUsingWidth = function(b) {
            var a = this._textField.text;
            this._textChanged && (this._textField.text = this._text);
            var c = isNaN(this._padding) ? 0 : this._padding,
                d = isNaN(this._paddingLeft) ?
                c : this._paddingLeft,
                e = isNaN(this._paddingRight) ? c : this._paddingRight,
                g = isNaN(this._paddingTop) ? c : this._paddingTop,
                c = isNaN(this._paddingBottom) ? c : this._paddingBottom;
            this._textField.width = NaN;
            this._textField.height = NaN;
            isNaN(b) || (this._textField.width = b - d - e);
            this.measuredWidth = Math.ceil(this._textField.measuredWidth);
            this.measuredHeight = Math.ceil(this._textField.measuredHeight);
            0 < this._maxDisplayedLines && this._textField.numLines > this._maxDisplayedLines && (b = this._textField.lineSpacing, this.measuredHeight =
                (this._textField.size + b) * this._maxDisplayedLines - b);
            this.measuredWidth += d + e;
            this.measuredHeight += g + c;
            this._textField.text = a
        };
        a.prototype.updateDisplayList = function(b, a) {
            this.$updateDisplayList(b, a);
            var c = isNaN(this._padding) ? 0 : this._padding,
                d = isNaN(this._paddingLeft) ? c : this._paddingLeft,
                e = isNaN(this._paddingRight) ? c : this._paddingRight,
                g = isNaN(this._paddingTop) ? c : this._paddingTop,
                c = isNaN(this._paddingBottom) ? c : this._paddingBottom;
            this._textField.x = d;
            this._textField.y = g;
            if (this.isSpecialCase()) {
                var k =
                    isNaN(this.lastUnscaledWidth) || this.lastUnscaledWidth != b;
                this.lastUnscaledWidth = b;
                if (k) {
                    this._oldPreferHeight = this._oldPreferWidth = NaN;
                    this.invalidateSize();
                    return
                }
            }
            this._invalidateSizeFlag && this.validateSize();
            this._textField.visible || (this._textField.visible = !0);
            this._textField.width = b - d - e;
            d = a - g - c;
            this._textField.height = d;
            0 < this._maxDisplayedLines && this._textField.numLines > this._maxDisplayedLines && (e = this._textField.lineSpacing, this._textField.height = Math.min(d, (this._textField.size + e) * this._maxDisplayedLines -
                e))
        };
        return a
    }(c.TextBase);
    c.Label = e
})(egret || (egret = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(d) {
        function a() {
            d.call(this);
            this._fillColor = 16777215;
            this._fillAlpha = 1;
            this._strokeColor = 4473924;
            this._strokeAlpha = 0;
            this._strokeWeight = 1;
            this.touchChildren = !1
        }
        __extends(a, d);
        Object.defineProperty(a.prototype, "graphics", {
            get: function() {
                this._graphics || (this._graphics = new c.Graphics);
                return this._graphics
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype._render = function(b) {
            this._graphics && this._graphics._draw(b);
            d.prototype._render.call(this, b)
        };
        Object.defineProperty(a.prototype,
            "fillColor", {
                get: function() {
                    return this._fillColor
                },
                set: function(b) {
                    this._fillColor != b && (this._fillColor = b, this.invalidateDisplayList())
                },
                enumerable: !0,
                configurable: !0
            });
        Object.defineProperty(a.prototype, "fillAlpha", {
            get: function() {
                return this._fillAlpha
            },
            set: function(b) {
                this._fillAlpha != b && (this._fillAlpha = b, this.invalidateDisplayList())
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "strokeColor", {
            get: function() {
                return this._strokeColor
            },
            set: function(b) {
                this._strokeColor != b &&
                    (this._strokeColor = b, this.invalidateDisplayList())
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "strokeAlpha", {
            get: function() {
                return this._strokeAlpha
            },
            set: function(b) {
                this._strokeAlpha != b && (this._strokeAlpha = b, this.invalidateDisplayList())
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "strokeWeight", {
            get: function() {
                return this._strokeWeight
            },
            set: function(b) {
                this._strokeWeight != b && (this._strokeWeight = b, this.invalidateDisplayList())
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype._measureBounds = function() {
            var b = d.prototype._measureBounds.call(this),
                a = this.width,
                c = this.height;
            0 < b.x && (b.x = 0);
            0 < b.y && (b.y = 0);
            0 + a > b.right && (b.right = 0 + a);
            0 + c > b.bottom && (b.bottom = 0 + c);
            return b
        };
        a.prototype.updateDisplayList = function(b, a) {
            d.prototype.updateDisplayList.call(this, b, b);
            var c = this.graphics;
            c.clear();
            c.beginFill(this._fillColor, this._fillAlpha);
            0 < this._strokeAlpha && c.lineStyle(this._strokeWeight, this._strokeColor, this._strokeAlpha, !0, "normal", "square", "miter");
            c.drawRect(0, 0,
                b, a);
            c.endFill()
        };
        return a
    }(c.UIComponent);
    c.Rect = e
})(egret || (egret = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(c) {
        function a() {
            c.call(this);
            this.hostComponentKey = "egret.Button"
        }
        __extends(a, c);
        return a
    }(c.ButtonBase);
    c.Button = e
})(egret || (egret = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(c) {
        function a() {
            c.call(this);
            this.hostComponentKey = "egret.ToggleButton"
        }
        __extends(a, c);
        return a
    }(c.ToggleButtonBase);
    c.ToggleButton = e
})(egret || (egret = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(c) {
        function a() {
            c.call(this);
            this.hostComponentKey = "egret.CheckBox"
        }
        __extends(a, c);
        return a
    }(c.ToggleButtonBase);
    c.CheckBox = e
})(egret || (egret = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(d) {
        function a() {
            d.call(this);
            this.radioButtons = [];
            this._enabled = !0;
            this._name = "_radioButtonGroup" + a.groupCount;
            a.groupCount++
        }
        __extends(a, d);
        Object.defineProperty(a.prototype, "enabled", {
            get: function() {
                return this._enabled
            },
            set: function(b) {
                if (this._enabled != b)
                    for (this._enabled = b, b = 0; b < this.numRadioButtons; b++) this.getRadioButtonAt(b).invalidateSkinState()
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "numRadioButtons", {
            get: function() {
                return this.radioButtons.length
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "selectedValue", {
            get: function() {
                return this.selection ? null != this.selection.value ? this.selection.value : this.selection.label : null
            },
            set: function(b) {
                this._selectedValue = b;
                if (null == b) this._setSelection(null, !1);
                else
                    for (var a = this.numRadioButtons, d = 0; d < a; d++) {
                        var e = this.getRadioButtonAt(d);
                        if (e.value == b || e.label == b) {
                            this.changeSelection(d, !1);
                            this._selectedValue = null;
                            c.UIEvent.dispatchUIEvent(this, c.UIEvent.VALUE_COMMIT);
                            break
                        }
                    }
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "selection", {
            get: function() {
                return this._selection
            },
            set: function(b) {
                this._selection != b && this._setSelection(b, !1)
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype.getRadioButtonAt = function(b) {
            return 0 <= b && b < this.numRadioButtons ? this.radioButtons[b] : null
        };
        a.prototype._addInstance = function(b) {
            function a(b, d) {
                var e = b.parent,
                    l = d.parent;
                if (!e || !l) return 0;
                var n = b instanceof c.UIComponent ? b.nestLevel : -1,
                    p = d instanceof c.UIComponent ? d.nestLevel : -1,
                    q = 0,
                    r = 0;
                e ==
                    l && (q = "getElementIndex" in e && "ownerChanged" in b ? e.getElementIndex(b) : e.getChildIndex(b), r = "getElementIndex" in l && "ownerChanged" in d ? l.getElementIndex(d) : l.getChildIndex(d));
                return n > p || q > r ? 1 : n < p || r > q ? -1 : b == d ? 0 : a(e, l)
            }
            b.addEventListener(c.Event.REMOVED, this.radioButton_removedHandler, this);
            this.radioButtons.push(b);
            this.radioButtons.sort(a);
            for (var d = 0; d < this.radioButtons.length; d++) this.radioButtons[d]._indexNumber = d;
            this._selectedValue && (this.selectedValue = this._selectedValue);
            !0 == b.selected && (this.selection =
                b);
            b._radioButtonGroup = this;
            b.invalidateSkinState();
            this.dispatchEventWith("numRadioButtonsChanged")
        };
        a.prototype._removeInstance = function(b) {
            this.doRemoveInstance(b, !1)
        };
        a.prototype.doRemoveInstance = function(b, a) {
            "undefined" === typeof a && (a = !0);
            if (b) {
                for (var d = !1, e = 0; e < this.numRadioButtons; e++) {
                    var f = this.getRadioButtonAt(e);
                    d ? f._indexNumber -= 1 : f == b && (a && b.addEventListener(c.Event.ADDED, this.radioButton_addedHandler, this), b == this._selection && (this._selection = null), b._radioButtonGroup = null, b.invalidateSkinState(),
                        this.radioButtons.splice(e, 1), d = !0, e--)
                }
                d && this.dispatchEventWith("numRadioButtonsChanged")
            }
        };
        a.prototype._setSelection = function(b, a) {
            "undefined" === typeof a && (a = !0);
            if (this._selection != b) {
                if (b)
                    for (var d = this.numRadioButtons, e = 0; e < d; e++) {
                        if (b == this.getRadioButtonAt(e)) {
                            this.changeSelection(e, a);
                            break
                        }
                    } else this.selection && (this._selection.selected = !1, this._selection = null, a && this.dispatchEventWith(c.Event.CHANGE));
                c.UIEvent.dispatchUIEvent(this, c.UIEvent.VALUE_COMMIT)
            }
        };
        a.prototype.changeSelection =
            function(b, a) {
                "undefined" === typeof a && (a = !0);
                var d = this.getRadioButtonAt(b);
                d && d != this._selection && (this._selection && (this._selection.selected = !1), this._selection = d, this._selection.selected = !0, a && this.dispatchEventWith(c.Event.CHANGE))
            };
        a.prototype.radioButton_addedHandler = function(b) {
            if (b = b.target) b.removeEventListener(c.Event.ADDED, this.radioButton_addedHandler, this), this._addInstance(b)
        };
        a.prototype.radioButton_removedHandler = function(b) {
            if (b = b.target) b.removeEventListener(c.Event.REMOVED, this.radioButton_removedHandler,
                this), this.doRemoveInstance(b)
        };
        a.groupCount = 0;
        return a
    }(c.EventDispatcher);
    c.RadioButtonGroup = e
})(egret || (egret = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(d) {
        function a() {
            d.call(this);
            this._indexNumber = 0;
            this._radioButtonGroup = null;
            this.groupChanged = !1;
            this._groupName = "radioGroup";
            this.hostComponentKey = "egret.RadioButton";
            this.groupName = "radioGroup"
        }
        __extends(a, d);
        Object.defineProperty(a.prototype, "enabled", {
            get: function() {
                return this._enabled ? !this._radioButtonGroup || this._radioButtonGroup.enabled : !1
            },
            set: function(b) {
                this._setEnabled(b)
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "group", {
            get: function() {
                if (!this._group &&
                    this._groupName) {
                    a.automaticRadioButtonGroups || (a.automaticRadioButtonGroups = {});
                    var b = a.automaticRadioButtonGroups[this._groupName];
                    b || (b = new c.RadioButtonGroup, b._name = this._groupName, a.automaticRadioButtonGroups[this._groupName] = b);
                    this._group = b
                }
                return this._group
            },
            set: function(b) {
                this._group != b && (this._radioButtonGroup && this._radioButtonGroup._removeInstance(this), this._groupName = (this._group = b) ? this.group._name : "radioGroup", this.groupChanged = !0, this.invalidateProperties(), this.invalidateDisplayList())
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "groupName", {
            get: function() {
                return this._groupName
            },
            set: function(b) {
                b && "" != b && (this._groupName = b, this._radioButtonGroup && this._radioButtonGroup._removeInstance(this), this._group = null, this.groupChanged = !0, this.invalidateProperties(), this.invalidateDisplayList())
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype._setSelected = function(b) {
            d.prototype._setSelected.call(this, b);
            this.invalidateDisplayList()
        };
        Object.defineProperty(a.prototype, "value", {
            get: function() {
                return this._value
            },
            set: function(b) {
                this._value != b && (this._value = b, this.selected && this.group && c.UIEvent.dispatchUIEvent(this.group, c.UIEvent.VALUE_COMMIT))
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype.commitProperties = function() {
            this.groupChanged && (this.addToGroup(), this.groupChanged = !1);
            d.prototype.commitProperties.call(this)
        };
        a.prototype.updateDisplayList = function(b, a) {
            d.prototype.updateDisplayList.call(this, b, a);
            this.group && (this.selected ? this._group.selection = this : this.group.selection ==
                this && (this._group.selection = null))
        };
        a.prototype.buttonReleased = function() {
            this.enabled && !this.selected && (this._radioButtonGroup || this.addToGroup(), d.prototype.buttonReleased.call(this), this.group._setSelection(this))
        };
        a.prototype.addToGroup = function() {
            var b = this.group;
            b && b._addInstance(this);
            return b
        };
        return a
    }(c.ToggleButtonBase);
    c.RadioButton = e
})(egret || (egret = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(d) {
        function a() {
            d.call(this);
            this.elementsContentChanged = this.createChildrenCalled = !1;
            this._elementsContent = []
        }
        __extends(a, d);
        a.prototype.createChildren = function() {
            d.prototype.createChildren.call(this);
            this.createChildrenCalled = !0;
            this.elementsContentChanged && (this.elementsContentChanged = !1, this.setElementsContent(this._elementsContent))
        };
        a.prototype._getElementsContent = function() {
            return this._elementsContent
        };
        Object.defineProperty(a.prototype, "elementsContent", {
            set: function(b) {
                null ==
                    b && (b = []);
                if (b != this._elementsContent)
                    if (this.createChildrenCalled) this.setElementsContent(b);
                    else {
                        this.elementsContentChanged = !0;
                        for (var a = this._elementsContent.length - 1; 0 <= a; a--) this._elementRemoved(this._elementsContent[a], a);
                        this._elementsContent = b
                    }
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype.setElementsContent = function(b) {
            var a;
            for (a = this._elementsContent.length - 1; 0 <= a; a--) this._elementRemoved(this._elementsContent[a], a);
            this._elementsContent = b.concat();
            b = this._elementsContent.length;
            for (a =
                0; a < b; a++) {
                var c = this._elementsContent[a];
                c.parent && "removeElement" in c.parent ? c.parent.removeElement(c) : c.owner && "removeElement" in c.owner && c.owner.removeElement(c);
                this._elementAdded(c, a)
            }
        };
        Object.defineProperty(a.prototype, "numElements", {
            get: function() {
                return this._elementsContent.length
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype.getElementAt = function(b) {
            this.checkForRangeError(b);
            return this._elementsContent[b]
        };
        a.prototype.checkForRangeError = function(b, a) {
            "undefined" === typeof a && (a = !1);
            var c =
                this._elementsContent.length - 1;
            a && c++;
            if (0 > b || b > c) throw new RangeError('\u7d22\u5f15:"' + b + '"\u8d85\u51fa\u53ef\u89c6\u5143\u7d20\u7d22\u5f15\u8303\u56f4');
        };
        a.prototype.addElement = function(b) {
            var a = this.numElements;
            b.parent == this && (a = this.numElements - 1);
            return this.addElementAt(b, a)
        };
        a.prototype.addElementAt = function(b, a) {
            if (b == this) return b;
            this.checkForRangeError(a, !0);
            var c = b.owner;
            if (c == this) return this.setElementIndex(b, a), b;
            c && "removeElement" in c && b.owner.removeElement(b);
            this._elementsContent.splice(a,
                0, b);
            this.elementsContentChanged || this._elementAdded(b, a);
            return b
        };
        a.prototype.removeElement = function(b) {
            return this.removeElementAt(this.getElementIndex(b))
        };
        a.prototype.removeElementAt = function(b) {
            this.checkForRangeError(b);
            var a = this._elementsContent[b];
            this.elementsContentChanged || this._elementRemoved(a, b);
            this._elementsContent.splice(b, 1);
            return a
        };
        a.prototype.removeAllElements = function() {
            for (var b = this.numElements - 1; 0 <= b; b--) this.removeElementAt(b)
        };
        a.prototype.getElementIndex = function(b) {
            return this._elementsContent.indexOf(b)
        };
        a.prototype.setElementIndex = function(b, a) {
            this.checkForRangeError(a);
            var c = this.getElementIndex(b); - 1 != c && c != a && (this.elementsContentChanged || this._elementRemoved(b, c, !1), this._elementsContent.splice(c, 1), this._elementsContent.splice(a, 0, b), this.elementsContentChanged || this._elementAdded(b, a, !1))
        };
        a.prototype.swapElements = function(b, a) {
            this.swapElementsAt(this.getElementIndex(b), this.getElementIndex(a))
        };
        a.prototype.swapElementsAt = function(b, a) {
            this.checkForRangeError(b);
            this.checkForRangeError(a);
            if (b > a) {
                var c = a;
                a = b;
                b = c
            } else if (b == a) return;
            var c = this._elementsContent,
                d = c[b],
                e = c[a];
            this.elementsContentChanged || (this._elementRemoved(d, b, !1), this._elementRemoved(e, a, !1));
            c[b] = e;
            c[a] = d;
            this.elementsContentChanged || (this._elementAdded(e, b, !1), this._elementAdded(d, a, !1))
        };
        a.prototype._elementAdded = function(b, a, d) {
            "undefined" === typeof d && (d = !0);
            b instanceof c.DisplayObject && this._addToDisplayListAt(b, a, d);
            d && this.hasEventListener(c.ElementExistenceEvent.ELEMENT_ADD) && c.ElementExistenceEvent.dispatchElementExistenceEvent(this,
                c.ElementExistenceEvent.ELEMENT_ADD, b, a);
            this.invalidateSize();
            this.invalidateDisplayList()
        };
        a.prototype._elementRemoved = function(b, a, d) {
            "undefined" === typeof d && (d = !0);
            d && this.hasEventListener(c.ElementExistenceEvent.ELEMENT_REMOVE) && c.ElementExistenceEvent.dispatchElementExistenceEvent(this, c.ElementExistenceEvent.ELEMENT_REMOVE, b, a);
            b instanceof c.DisplayObject && b.parent == this && this._removeFromDisplayList(b, d);
            this.invalidateSize();
            this.invalidateDisplayList()
        };
        a.prototype.addChild = function(b) {
            throw Error("addChild()" +
                a.errorStr + "addElement()\u4ee3\u66ff");
        };
        a.prototype.addChildAt = function(b, c) {
            throw Error("addChildAt()" + a.errorStr + "addElementAt()\u4ee3\u66ff");
        };
        a.prototype.removeChild = function(b) {
            throw Error("removeChild()" + a.errorStr + "removeElement()\u4ee3\u66ff");
        };
        a.prototype.removeChildAt = function(b) {
            throw Error("removeChildAt()" + a.errorStr + "removeElementAt()\u4ee3\u66ff");
        };
        a.prototype.setChildIndex = function(b, c) {
            throw Error("setChildIndex()" + a.errorStr + "setElementIndex()\u4ee3\u66ff");
        };
        a.prototype.swapChildren =
            function(b, c) {
                throw Error("swapChildren()" + a.errorStr + "swapElements()\u4ee3\u66ff");
            };
        a.prototype.swapChildrenAt = function(b, c) {
            throw Error("swapChildrenAt()" + a.errorStr + "swapElementsAt()\u4ee3\u66ff");
        };
        a.errorStr = "\u5728\u6b64\u7ec4\u4ef6\u4e2d\u4e0d\u53ef\u7528\uff0c\u82e5\u6b64\u7ec4\u4ef6\u4e3a\u5bb9\u5668\u7c7b\uff0c\u8bf7\u4f7f\u7528";
        return a
    }(c.GroupBase);
    c.Group = e
})(egret || (egret = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(d) {
        function a() {
            d.call(this);
            this._createAllChildren = !1;
            this.proposedSelectedIndex = a.NO_PROPOSED_SELECTION;
            this._selectedIndex = -1;
            this.childOrderingChanged = this.notifyTabBar = !1;
            this._setLayout(new c.BasicLayout)
        }
        __extends(a, d);
        Object.defineProperty(a.prototype, "layout", {
            get: function() {
                return this._layout
            },
            set: function(b) {},
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "createAllChildren", {
            get: function() {
                return this._createAllChildren
            },
            set: function(b) {
                if (this._createAllChildren !=
                    b && (this._createAllChildren = b)) {
                    b = this._getElementsContent();
                    for (var a = b.length, d = 0; d < a; d++) {
                        var e = b[d];
                        e instanceof c.DisplayObject && e.parent != this && (this.childOrderingChanged = !0, this._addToDisplayList(e))
                    }
                    this.childOrderingChanged && this.invalidateProperties()
                }
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "selectedChild", {
            get: function() {
                var b = this.selectedIndex;
                return 0 <= b && b < this.numElements ? this.getElementAt(b) : null
            },
            set: function(b) {
                b = this.getElementIndex(b);
                0 <= b && b < this.numElements &&
                    this._setSelectedIndex(b)
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "selectedIndex", {
            get: function() {
                return this.proposedSelectedIndex != a.NO_PROPOSED_SELECTION ? this.proposedSelectedIndex : this._selectedIndex
            },
            set: function(b) {
                this._setSelectedIndex(b)
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype._setSelectedIndex = function(b, a) {
            "undefined" === typeof a && (a = !0);
            b != this.selectedIndex && (this.proposedSelectedIndex = b, this.invalidateProperties(), c.UIEvent.dispatchUIEvent(this, c.UIEvent.VALUE_COMMIT),
                this.notifyTabBar = this.notifyTabBar || a)
        };
        a.prototype._elementAdded = function(b, a, d) {
            "undefined" === typeof d && (d = !0);
            this._createAllChildren && b instanceof c.DisplayObject && this._addToDisplayListAt(b, a, d);
            d && this.hasEventListener(c.ElementExistenceEvent.ELEMENT_ADD) && c.ElementExistenceEvent.dispatchElementExistenceEvent(this, c.ElementExistenceEvent.ELEMENT_ADD, b, a);
            b.visible = !1;
            b.includeInLayout = !1; - 1 == this.selectedIndex ? this._setSelectedIndex(a, !1) : a <= this.selectedIndex && this.initialized && this._setSelectedIndex(this.selectedIndex +
                1);
            this.dispatchCoEvent(c.CollectionEventKind.ADD, a, -1, [b.name])
        };
        a.prototype._elementRemoved = function(b, a, e) {
            "undefined" === typeof e && (e = !0);
            d.prototype._elementRemoved.call(this, b, a, e);
            b.visible = !0;
            b.includeInLayout = !0;
            a == this.selectedIndex ? 0 < this.numElements ? 0 == a ? (this.proposedSelectedIndex = 0, this.invalidateProperties()) : this._setSelectedIndex(0, !1) : this._setSelectedIndex(-1) : a < this.selectedIndex && this._setSelectedIndex(this.selectedIndex - 1);
            this.dispatchCoEvent(c.CollectionEventKind.REMOVE, a, -1, [b.name])
        };
        a.prototype.commitProperties = function() {
            d.prototype.commitProperties.call(this);
            this.proposedSelectedIndex != a.NO_PROPOSED_SELECTION && (this.commitSelection(this.proposedSelectedIndex), this.proposedSelectedIndex = a.NO_PROPOSED_SELECTION);
            if (this.childOrderingChanged) {
                this.childOrderingChanged = !1;
                for (var b = this._getElementsContent(), e = b.length, l = 0; l < e; l++) {
                    var m = b[l];
                    m instanceof c.DisplayObject && m.parent == this && this._addToDisplayList(m)
                }
            }
            this.notifyTabBar && (this.notifyTabBar = !0, this.dispatchEventWith("IndexChanged"))
        };
        a.prototype.commitSelection = function(b) {
            0 <= b && b < this.numElements ? (this._selectedIndex = b, this._selectedChild && this._selectedChild.parent == this && (this._selectedChild.visible = !1, this._selectedChild.includeInLayout = !1), this._selectedChild = this.getElementAt(this._selectedIndex), this._selectedChild.visible = !0, this._selectedChild.includeInLayout = !0, this._selectedChild.parent != this && this._selectedChild instanceof c.DisplayObject && (this._addToDisplayList(this._selectedChild), this.childOrderingChanged || (this.childOrderingChanged = !0))) : (this._selectedChild = null, this._selectedIndex = -1);
            this.invalidateSize();
            this.invalidateDisplayList()
        };
        Object.defineProperty(a.prototype, "length", {
            get: function() {
                return this.numElements
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype.getItemAt = function(b) {
            return (b = this.getElementAt(b)) ? b.name : ""
        };
        a.prototype.getItemIndex = function(b) {
            for (var a = this._getElementsContent(), c = a.length, d = 0; d < c; d++)
                if (a[d].name === b) return d;
            return -1
        };
        a.prototype.dispatchCoEvent = function(b, a, d, e, f) {
            "undefined" === typeof b &&
                (b = null);
            "undefined" === typeof a && (a = -1);
            "undefined" === typeof d && (d = -1);
            "undefined" === typeof e && (e = null);
            "undefined" === typeof f && (f = null);
            c.CollectionEvent.dispatchCollectionEvent(this, c.CollectionEvent.COLLECTION_CHANGE, b, a, d, e, f)
        };
        a.NO_PROPOSED_SELECTION = -2;
        return a
    }(c.Group);
    c.ViewStack = e
})(egret || (egret = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(d) {
        function a() {
            d.call(this);
            this.maxWidth = 1E4;
            this.minWidth = 0;
            this.maxHeight = 1E4;
            this.minHeight = 0;
            this.height = this.width = NaN;
            this._initialized = !1;
            this._elementsContent = [];
            this._states = [];
            this.initialized = !1
        }
        __extends(a, d);
        a.prototype.createChildren = function() {};
        Object.defineProperty(a.prototype, "hostComponent", {
            get: function() {
                return this._hostComponent
            },
            set: function(b) {
                this._setHostComponent(b)
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype._setHostComponent = function(b) {
            if (this._hostComponent !=
                b) {
                var a;
                if (this._hostComponent)
                    for (a = this._elementsContent.length - 1; 0 <= a; a--) this._elementRemoved(this._elementsContent[a], a);
                this._hostComponent = b;
                this._initialized || (this._initialized = !0, this.createChildren());
                if (this._hostComponent) {
                    b = this._elementsContent.length;
                    for (a = 0; a < b; a++) this._elementAdded(this._elementsContent[a], a);
                    this.initializeStates();
                    this.currentStateChanged && this.commitCurrentState()
                }
            }
        };
        a.prototype._getElementsContent = function() {
            return this._elementsContent
        };
        Object.defineProperty(a.prototype,
            "elementsContent", {
                set: function(b) {
                    null == b && (b = []);
                    if (b != this._elementsContent)
                        if (this._hostComponent) {
                            var a;
                            for (a = this._elementsContent.length - 1; 0 <= a; a--) this._elementRemoved(this._elementsContent[a], a);
                            this._elementsContent = b.concat();
                            b = this._elementsContent.length;
                            for (a = 0; a < b; a++) {
                                var c = this._elementsContent[a];
                                c.parent && "removeElement" in c.parent ? c.parent.removeElement(c) : c.owner && "removeElement" in c.owner && c.owner.removeElement(c);
                                this._elementAdded(c, a)
                            }
                        } else this._elementsContent = b.concat()
                },
                enumerable: !0,
                configurable: !0
            });
        Object.defineProperty(a.prototype, "numElements", {
            get: function() {
                return this._elementsContent.length
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype.getElementAt = function(b) {
            this.checkForRangeError(b);
            return this._elementsContent[b]
        };
        a.prototype.checkForRangeError = function(b, a) {
            "undefined" === typeof a && (a = !1);
            var c = this._elementsContent.length - 1;
            a && c++;
            if (0 > b || b > c) throw new RangeError('\u7d22\u5f15:"' + b + '"\u8d85\u51fa\u53ef\u89c6\u5143\u7d20\u7d22\u5f15\u8303\u56f4');
        };
        a.prototype.addElement = function(b) {
            var a = this.numElements;
            b.owner == this && (a = this.numElements - 1);
            return this.addElementAt(b, a)
        };
        a.prototype.addElementAt = function(b, a) {
            this.checkForRangeError(a, !0);
            var c = b.owner;
            if (c == this) return this.setElementIndex(b, a), b;
            c && "removeElement" in c && c.removeElement(b);
            this._elementsContent.splice(a, 0, b);
            this._hostComponent ? this._elementAdded(b, a) : b.ownerChanged(this);
            return b
        };
        a.prototype.removeElement = function(b) {
            return this.removeElementAt(this.getElementIndex(b))
        };
        a.prototype.removeElementAt = function(b) {
            this.checkForRangeError(b);
            var a = this._elementsContent[b];
            this._hostComponent ? this._elementRemoved(a, b) : a.ownerChanged(null);
            this._elementsContent.splice(b, 1);
            return a
        };
        a.prototype.getElementIndex = function(b) {
            return this._elementsContent.indexOf(b)
        };
        a.prototype.setElementIndex = function(b, a) {
            this.checkForRangeError(a);
            var c = this.getElementIndex(b); - 1 != c && c != a && (this._hostComponent && this._elementRemoved(b, c, !1), this._elementsContent.splice(c, 1), this._elementsContent.splice(a,
                0, b), this._hostComponent && this._elementAdded(b, a, !1))
        };
        a.prototype._elementAdded = function(b, a, d) {
            "undefined" === typeof d && (d = !0);
            b.ownerChanged(this);
            b instanceof c.DisplayObject && this._hostComponent._addToDisplayListAt(b, a, d);
            d && this.hasEventListener(c.ElementExistenceEvent.ELEMENT_ADD) && c.ElementExistenceEvent.dispatchElementExistenceEvent(this, c.ElementExistenceEvent.ELEMENT_ADD, b, a);
            this._hostComponent.invalidateSize();
            this._hostComponent.invalidateDisplayList()
        };
        a.prototype._elementRemoved = function(b,
            a, d) {
            "undefined" === typeof d && (d = !0);
            d && this.hasEventListener(c.ElementExistenceEvent.ELEMENT_REMOVE) && c.ElementExistenceEvent.dispatchElementExistenceEvent(this, c.ElementExistenceEvent.ELEMENT_REMOVE, b, a);
            b instanceof c.DisplayObject && b.parent == this._hostComponent && this._hostComponent._removeFromDisplayList(b, d);
            b.ownerChanged(null);
            this._hostComponent.invalidateSize();
            this._hostComponent.invalidateDisplayList()
        };
        Object.defineProperty(a.prototype, "states", {
            get: function() {
                return this._states
            },
            set: function(b) {
                this._setStates(b)
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype._setStates = function(b) {
            b || (b = []);
            if ("string" == typeof b[0])
                for (var a = b.length, d = 0; d < a; d++) {
                    var e = new c.State(b[d], []);
                    b[d] = e
                }
            this._states = b;
            this.currentStateChanged = !0;
            this.requestedCurrentState = this._currentState;
            this.hasState(this.requestedCurrentState) || (this.requestedCurrentState = this.getDefaultState())
        };
        Object.defineProperty(a.prototype, "currentState", {
            get: function() {
                return this.currentStateChanged ? this.requestedCurrentState : this._currentState ? this._currentState :
                    this.getDefaultState()
            },
            set: function(b) {
                b || (b = this.getDefaultState());
                b != this.currentState && b && this.currentState && (this.requestedCurrentState = b, this.currentStateChanged = !0, this._hostComponent && this.commitCurrentState())
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype.hasState = function(b) {
            return null != this.getState(b)
        };
        a.prototype.getDefaultState = function() {
            return 0 < this._states.length ? this._states[0].name : null
        };
        a.prototype.commitCurrentState = function() {
            if (this.currentStateChanged) {
                this.currentStateChanged = !1;
                this.getState(this.requestedCurrentState) || (this.requestedCurrentState = this.getDefaultState());
                var b = this._currentState ? this._currentState : "";
                this.hasEventListener(c.StateChangeEvent.CURRENT_STATE_CHANGING) && c.StateChangeEvent.dispatchStateChangeEvent(this, c.StateChangeEvent.CURRENT_STATE_CHANGING, b, this.requestedCurrentState ? this.requestedCurrentState : "");
                this.removeState(this._currentState);
                (this._currentState = this.requestedCurrentState) && this.applyState(this._currentState);
                this.hasEventListener(c.StateChangeEvent.CURRENT_STATE_CHANGE) &&
                    c.StateChangeEvent.dispatchStateChangeEvent(this, c.StateChangeEvent.CURRENT_STATE_CHANGE, b, this._currentState ? this._currentState : "")
            }
        };
        a.prototype.getState = function(b) {
            if (!b) return null;
            for (var a = this._states, c = a.length, d = 0; d < c; d++) {
                var e = a[d];
                if (e.name == b) return e
            }
            return null
        };
        a.prototype.removeState = function(b) {
            if (b = this.getState(b)) {
                b = b.overrides;
                for (var a = b.length - 1; 0 <= a; a--) b[a].remove(this)
            }
        };
        a.prototype.applyState = function(b) {
            if (b = this.getState(b)) {
                b = b.overrides;
                for (var a = b.length, c = 0; c < a; c++) b[c].apply(this)
            }
        };
        a.prototype.initializeStates = function() {
            if (!this.initialized) {
                this.initialized = !0;
                for (var b = this._states, a = b.length, c = 0; c < a; c++) b[c].initialize(this)
            }
        };
        return a
    }(c.EventDispatcher);
    c.Skin = e
})(egret || (egret = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(d) {
        function a() {
            d.call(this);
            this.useVirtualLayoutChanged = !1;
            this.rendererToClassMap = [];
            this.freeRenderers = [];
            this.dataProviderChanged = this.createNewRendererFlag = !1;
            this.recyclerDic = [];
            this.typicalItemChanged = this.virtualLayoutUnderway = this.itemRendererSkinNameChange = !1;
            this.indexToRenderer = [];
            this.renderersBeingUpdated = this.cleanFreeRenderer = !1
        }
        __extends(a, d);
        Object.defineProperty(a.prototype, "layout", {
            get: function() {
                return this._layout
            },
            set: function(b) {
                b != this.layout &&
                    (this.layout && (this.layout.typicalLayoutRect = null, this.layout.removeEventListener("useVirtualLayoutChanged", this.layout_useVirtualLayoutChangedHandler, this)), this.layout && b && this.layout.useVirtualLayout != b.useVirtualLayout && this.changeUseVirtualLayout(), this._setLayout(b), b && (b.typicalLayoutRect = this.typicalLayoutRect, b.addEventListener("useVirtualLayoutChanged", this.layout_useVirtualLayoutChangedHandler, this)))
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype.layout_useVirtualLayoutChangedHandler = function(b) {
            this.changeUseVirtualLayout()
        };
        a.prototype.setVirtualElementIndicesInView = function(b, a) {
            if (this.layout && this.layout.useVirtualLayout) {
                this.virtualRendererIndices = [];
                for (var c = b; c <= a; c++) this.virtualRendererIndices.push(c);
                for (var d in this.indexToRenderer) d = parseInt(d), -1 == this.virtualRendererIndices.indexOf(d) && this.freeRendererByIndex(d)
            }
        };
        a.prototype.getVirtualElementAt = function(b) {
            if (0 > b || b >= this.dataProvider.length) return null;
            var a = this.indexToRenderer[b];
            if (!a) {
                var a = this.dataProvider.getItemAt(b),
                    d = this.createVirtualRenderer(b);
                this.indexToRenderer[b] = d;
                this.updateRenderer(d, b, a);
                this.createNewRendererFlag && ("validateNow" in d && d.validateNow(), this.createNewRendererFlag = !1, c.RendererExistenceEvent.dispatchRendererExistenceEvent(this, c.RendererExistenceEvent.RENDERER_ADD, d, b, a));
                a = d
            }
            return a
        };
        a.prototype.freeRendererByIndex = function(b) {
            if (this.indexToRenderer[b]) {
                var a = this.indexToRenderer[b];
                delete this.indexToRenderer[b];
                a && a instanceof c.DisplayObject && this.doFreeRenderer(a)
            }
        };
        a.prototype.doFreeRenderer = function(b) {
            var a =
                this.rendererToClassMap[b.hashCode].hashCode;
            this.freeRenderers[a] || (this.freeRenderers[a] = []);
            this.freeRenderers[a].push(b);
            b.visible = !1
        };
        a.prototype.invalidateSize = function() {
            this.createNewRendererFlag || d.prototype.invalidateSize.call(this)
        };
        a.prototype.createVirtualRenderer = function(b) {
            b = this.dataProvider.getItemAt(b);
            b = this.itemToRendererClass(b);
            var a = b.hashCode,
                c = this.freeRenderers;
            if (c[a] && 0 < c[a].length) return b = c[a].pop(), b.visible = !0, b;
            this.createNewRendererFlag = !0;
            return this.createOneRenderer(b)
        };
        a.prototype.createOneRenderer = function(b) {
            var a, d = b.hashCode,
                e = this.recyclerDic[d];
            e && (a = e.pop(), 0 == e.length && delete this.recyclerDic[d]);
            a || (a = b.newInstance(), this.rendererToClassMap[a.hashCode] = b);
            if (!(a && a instanceof c.DisplayObject)) return null;
            this._itemRendererSkinName && this.setItemRenderSkinName(a);
            this._addToDisplayList(a);
            a.setLayoutBoundsSize(NaN, NaN);
            return a
        };
        a.prototype.setItemRenderSkinName = function(b) {
            b && (b ? b._skinNameExplicitlySet || (b.skinName = this._itemRendererSkinName) : b && !b.skinName &&
                (b.skinName = this._itemRendererSkinName))
        };
        a.prototype.finishVirtualLayout = function() {
            if (this.virtualLayoutUnderway) {
                var b = this.virtualLayoutUnderway = !1,
                    a;
                for (a in this.freeRenderers)
                    if (0 < this.freeRenderers[a].length) {
                        b = !0;
                        break
                    }
                b && (this.cleanTimer || (this.cleanTimer = new c.Timer(3E3, 1), this.cleanTimer.addEventListener(c.TimerEvent.TIMER, this.cleanAllFreeRenderer, this)), this.cleanTimer.reset(), this.cleanTimer.start())
            }
        };
        a.prototype.cleanAllFreeRenderer = function(b) {
            var a = this.freeRenderers,
                c;
            for (c in a)
                for (var d =
                    a[c], e = d.length, g = 0; g < e; g++) b = d[g], b.visible = !0, this.recycle(b);
            this.freeRenderers = [];
            this.cleanFreeRenderer = !1
        };
        a.prototype.getElementIndicesInView = function() {
            return this.layout && this.layout.useVirtualLayout ? this.virtualRendererIndices ? this.virtualRendererIndices : [] : d.prototype.getElementIndicesInView.call(this)
        };
        a.prototype.changeUseVirtualLayout = function() {
            this.cleanFreeRenderer = this.useVirtualLayoutChanged = !0;
            this.removeDataProviderListener();
            this.invalidateProperties()
        };
        Object.defineProperty(a.prototype,
            "dataProvider", {
                get: function() {
                    return this._dataProvider
                },
                set: function(b) {
                    this._dataProvider != b && (this.removeDataProviderListener(), this._dataProvider = b, this.cleanFreeRenderer = this.dataProviderChanged = !0, this.invalidateProperties(), this.invalidateSize(), this.invalidateDisplayList())
                },
                enumerable: !0,
                configurable: !0
            });
        a.prototype.removeDataProviderListener = function() {
            this._dataProvider && this._dataProvider.removeEventListener(c.CollectionEvent.COLLECTION_CHANGE, this.onCollectionChange, this)
        };
        a.prototype.onCollectionChange =
            function(b) {
                switch (b.kind) {
                    case c.CollectionEventKind.ADD:
                        this.itemAddedHandler(b.items, b.location);
                        break;
                    case c.CollectionEventKind.MOVE:
                        this.itemMovedHandler(b.items[0], b.location, b.oldLocation);
                        break;
                    case c.CollectionEventKind.REMOVE:
                        this.itemRemovedHandler(b.items, b.location);
                        break;
                    case c.CollectionEventKind.UPDATE:
                        this.itemUpdatedHandler(b.items[0], b.location);
                        break;
                    case c.CollectionEventKind.REPLACE:
                        this.itemRemoved(b.oldItems[0], b.location);
                        this.itemAdded(b.items[0], b.location);
                        break;
                    case c.CollectionEventKind.RESET:
                    case c.CollectionEventKind.REFRESH:
                        if (this.layout &&
                            this.layout.useVirtualLayout)
                            for (var a in this.indexToRenderer) a = parseInt(a), this.freeRendererByIndex(a);
                        this.dataProviderChanged = !0;
                        this.invalidateProperties()
                }
                this.invalidateSize();
                this.invalidateDisplayList()
            };
        a.prototype.itemAddedHandler = function(b, a) {
            for (var c = b.length, d = 0; d < c; d++) this.itemAdded(b[d], a + d);
            this.resetRenderersIndices()
        };
        a.prototype.itemMovedHandler = function(b, a, c) {
            this.itemRemoved(b, c);
            this.itemAdded(b, a);
            this.resetRenderersIndices()
        };
        a.prototype.itemRemovedHandler = function(b,
            a) {
            for (var c = b.length - 1; 0 <= c; c--) this.itemRemoved(b[c], a + c);
            this.resetRenderersIndices()
        };
        a.prototype.itemAdded = function(b, a) {
            this.layout && this.layout.elementAdded(a);
            if (this.layout && this.layout.useVirtualLayout) {
                var d = this.virtualRendererIndices;
                if (d) {
                    for (var e = d.length, f = 0; f < e; f++) {
                        var g = d[f];
                        g >= a && (d[f] = g + 1)
                    }
                    this.indexToRenderer.splice(a, 0, null)
                }
            } else d = this.itemToRendererClass(b), d = this.createOneRenderer(d), this.indexToRenderer.splice(a, 0, d), d && (this.updateRenderer(d, a, b), c.RendererExistenceEvent.dispatchRendererExistenceEvent(this,
                c.RendererExistenceEvent.RENDERER_ADD, d, a, b))
        };
        a.prototype.itemRemoved = function(b, a) {
            this.layout && this.layout.elementRemoved(a);
            var d = this.virtualRendererIndices;
            if (d && 0 < d.length) {
                for (var e = -1, f = d.length, g = 0; g < f; g++) {
                    var k = d[g];
                    k == a ? e = g : k > a && (d[g] = k - 1)
                } - 1 != e && d.splice(e, 1)
            }
            d = this.indexToRenderer[a];
            this.indexToRenderer.length > a && this.indexToRenderer.splice(a, 1);
            c.RendererExistenceEvent.dispatchRendererExistenceEvent(this, c.RendererExistenceEvent.RENDERER_REMOVE, d, a, b);
            d && d instanceof c.DisplayObject &&
                this.recycle(d)
        };
        a.prototype.recycle = function(b) {
            this._removeFromDisplayList(b);
            "ownerChanged" in b && b.ownerChanged(null);
            var a = this.rendererToClassMap[b.hashCode].hashCode;
            this.recyclerDic[a] || (this.recyclerDic[a] = new c.Recycler);
            this.recyclerDic[a].push(b)
        };
        a.prototype.resetRenderersIndices = function() {
            if (0 != this.indexToRenderer.length)
                if (this.layout && this.layout.useVirtualLayout)
                    for (var b = this.virtualRendererIndices, a = b.length, c = 0; c < a; c++) {
                        var d = b[c];
                        this.resetRendererItemIndex(d)
                    } else
                        for (b = this.indexToRenderer.length,
                            d = 0; d < b; d++) this.resetRendererItemIndex(d)
        };
        a.prototype.itemUpdatedHandler = function(b, a) {
            if (!this.renderersBeingUpdated) {
                var c = this.indexToRenderer[a];
                c && this.updateRenderer(c, a, b)
            }
        };
        a.prototype.resetRendererItemIndex = function(b) {
            var a = this.indexToRenderer[b];
            a && (a.itemIndex = b)
        };
        Object.defineProperty(a.prototype, "itemRenderer", {
            get: function() {
                return this._itemRenderer
            },
            set: function(b) {
                this._itemRenderer !== b && (this._itemRenderer = b, this.cleanFreeRenderer = this.typicalItemChanged = this.itemRendererChanged = !0, this.removeDataProviderListener(), this.invalidateProperties())
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "itemRendererSkinName", {
            get: function() {
                return this._itemRendererSkinName
            },
            set: function(b) {
                this._itemRendererSkinName != b && (this._itemRendererSkinName = b) && this.initialized && (this.itemRendererSkinNameChange = !0, this.invalidateProperties())
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "itemRendererFunction", {
            get: function() {
                return this._itemRendererFunction
            },
            set: function(b) {
                this._itemRendererFunction != b && (this._itemRendererFunction = b, this.typicalItemChanged = this.itemRendererChanged = !0, this.removeDataProviderListener(), this.invalidateProperties())
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype.itemToRendererClass = function(b) {
            null != this._itemRendererFunction ? (b = this._itemRendererFunction(b), b || (b = this._itemRenderer)) : b = this._itemRenderer;
            return b ? b : a.defaultRendererFactory
        };
        a.prototype.createChildren = function() {
            if (!this.layout) {
                var b = new c.VerticalLayout;
                b.gap = 0;
                b.horizontalAlign = c.HorizontalAlign.CONTENT_JUSTIFY;
                this.layout = b
            }
            d.prototype.createChildren.call(this)
        };
        a.prototype.commitProperties = function() {
            if (this.itemRendererChanged || this.dataProviderChanged || this.useVirtualLayoutChanged) this.removeAllRenderers(), this.layout && this.layout.clearVirtualLayoutCache(), this.setTypicalLayoutRect(null), this.itemRendererChanged = this.useVirtualLayoutChanged = !1, this._dataProvider && this._dataProvider.addEventListener(c.CollectionEvent.COLLECTION_CHANGE, this.onCollectionChange,
                this), this.layout && this.layout.useVirtualLayout ? (this.invalidateSize(), this.invalidateDisplayList()) : this.createRenderers(), this.dataProviderChanged && (this.dataProviderChanged = !1, this.verticalScrollPosition = this.horizontalScrollPosition = 0);
            d.prototype.commitProperties.call(this);
            this.typicalItemChanged && (this.typicalItemChanged = !1, this._dataProvider && 0 < this._dataProvider.length && (this.typicalItem = this._dataProvider.getItemAt(0), this.measureRendererSize()));
            if (this.itemRendererSkinNameChange) {
                this.itemRendererSkinNameChange = !1;
                for (var b = this.indexToRenderer.length, a = 0; a < b; a++) this.setItemRenderSkinName(this.indexToRenderer[a]);
                var e = this.freeRenderers,
                    m;
                for (m in e) {
                    var f = e[m];
                    if (f)
                        for (b = f.length, a = 0; a < b; a++) this.setItemRenderSkinName(f[a])
                }
            }
        };
        a.prototype.measure = function() {
            this.layout && this.layout.useVirtualLayout && this.ensureTypicalLayoutElement();
            d.prototype.measure.call(this)
        };
        a.prototype.updateDisplayList = function(b, a) {
            this._layoutInvalidateDisplayListFlag && this.layout && this.layout.useVirtualLayout && (this.virtualLayoutUnderway = !0, this.ensureTypicalLayoutElement());
            d.prototype.updateDisplayList.call(this, b, a);
            this.virtualLayoutUnderway && this.finishVirtualLayout()
        };
        a.prototype.ensureTypicalLayoutElement = function() {
            !this.layout.typicalLayoutRect && this._dataProvider && 0 < this._dataProvider.length && (this.typicalItem = this._dataProvider.getItemAt(0), this.measureRendererSize())
        };
        a.prototype.measureRendererSize = function() {
            if (this.typicalItem) {
                var b = this.itemToRendererClass(this.typicalItem);
                if (b = this.createOneRenderer(b)) {
                    this.createNewRendererFlag = !0;
                    this.updateRenderer(b, 0, this.typicalItem);
                    "validateNow" in b && b.validateNow();
                    var a = new c.Rectangle(0, 0, b.preferredWidth, b.preferredHeight);
                    this.recycle(b);
                    this.setTypicalLayoutRect(a);
                    this.createNewRendererFlag = !1
                } else this.setTypicalLayoutRect(null)
            } else this.setTypicalLayoutRect(null)
        };
        a.prototype.setTypicalLayoutRect = function(b) {
            this.typicalLayoutRect = b;
            this.layout && (this.layout.typicalLayoutRect = b)
        };
        a.prototype.removeAllRenderers = function() {
            for (var b = this.indexToRenderer.length, a, d = 0; d < b; d++)
                if (a =
                    this.indexToRenderer[d]) this.recycle(a), c.RendererExistenceEvent.dispatchRendererExistenceEvent(this, c.RendererExistenceEvent.RENDERER_REMOVE, a, a.itemIndex, a.data);
            this.indexToRenderer = [];
            this.virtualRendererIndices = null;
            this.cleanFreeRenderer && this.cleanAllFreeRenderer()
        };
        a.prototype.createRenderers = function() {
            if (this._dataProvider)
                for (var b = 0, a = this._dataProvider.length, d = 0; d < a; d++) {
                    var e = this._dataProvider.getItemAt(d),
                        f = this.itemToRendererClass(e);
                    if (f = this.createOneRenderer(f)) this.indexToRenderer[b] =
                        f, this.updateRenderer(f, b, e), c.RendererExistenceEvent.dispatchRendererExistenceEvent(this, c.RendererExistenceEvent.RENDERER_ADD, f, b, e), b++
                }
        };
        a.prototype.updateRenderer = function(b, a, c) {
            this.renderersBeingUpdated = !0;
            this._rendererOwner ? b = this._rendererOwner.updateRenderer(b, a, c) : ("ownerChanged" in b && b.ownerChanged(this), b.itemIndex = a, b.label = this.itemToLabel(c), b.data = c);
            this.renderersBeingUpdated = !1;
            return b
        };
        a.prototype.itemToLabel = function(b) {
            return b ? b.toString() : " "
        };
        a.prototype.getElementAt = function(b) {
            return this.indexToRenderer[b]
        };
        a.prototype.getElementIndex = function(b) {
            return b ? this.indexToRenderer.indexOf(b) : -1
        };
        Object.defineProperty(a.prototype, "numElements", {
            get: function() {
                return this._dataProvider ? this._dataProvider.length : 0
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype.addChild = function(b) {
            throw Error("addChild()" + a.errorStr + "addElement()\u4ee3\u66ff");
        };
        a.prototype.addChildAt = function(b, c) {
            throw Error("addChildAt()" + a.errorStr + "addElementAt()\u4ee3\u66ff");
        };
        a.prototype.removeChild = function(b) {
            throw Error("removeChild()" +
                a.errorStr + "removeElement()\u4ee3\u66ff");
        };
        a.prototype.removeChildAt = function(b) {
            throw Error("removeChildAt()" + a.errorStr + "removeElementAt()\u4ee3\u66ff");
        };
        a.prototype.setChildIndex = function(b, c) {
            throw Error("setChildIndex()" + a.errorStr + "setElementIndex()\u4ee3\u66ff");
        };
        a.prototype.swapChildren = function(b, c) {
            throw Error("swapChildren()" + a.errorStr + "swapElements()\u4ee3\u66ff");
        };
        a.prototype.swapChildrenAt = function(b, c) {
            throw Error("swapChildrenAt()" + a.errorStr + "swapElementsAt()\u4ee3\u66ff");
        };
        a.defaultRendererFactory = new c.ClassFactory(c.ItemRenderer);
        a.errorStr = "\u5728\u6b64\u7ec4\u4ef6\u4e2d\u4e0d\u53ef\u7528\uff0c\u82e5\u6b64\u7ec4\u4ef6\u4e3a\u5bb9\u5668\u7c7b\uff0c\u8bf7\u4f7f\u7528";
        return a
    }(c.GroupBase);
    c.DataGroup = e
})(egret || (egret = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(d) {
        function a() {
            d.call(this);
            this.contentGroupProperties = {};
            this.hostComponentKey = "egret.SkinnableContainer"
        }
        __extends(a, d);
        a.prototype._getCurrentContentGroup = function() {
            return null == this.contentGroup ? (null == this._placeHolderGroup && (this._placeHolderGroup = new c.Group, this._placeHolderGroup.visible = !1, this._addToDisplayList(this._placeHolderGroup)), this._placeHolderGroup.addEventListener(c.ElementExistenceEvent.ELEMENT_ADD, this._contentGroup_elementAddedHandler, this), this._placeHolderGroup.addEventListener(c.ElementExistenceEvent.ELEMENT_REMOVE,
                this._contentGroup_elementRemovedHandler, this), this._placeHolderGroup) : this.contentGroup
        };
        Object.defineProperty(a.prototype, "elementsContent", {
            set: function(b) {
                this._getCurrentContentGroup().elementsContent = b
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "numElements", {
            get: function() {
                return this._getCurrentContentGroup().numElements
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype.getElementAt = function(b) {
            return this._getCurrentContentGroup().getElementAt(b)
        };
        a.prototype.addElement =
            function(b) {
                return this._getCurrentContentGroup().addElement(b)
            };
        a.prototype.addElementAt = function(b, a) {
            return this._getCurrentContentGroup().addElementAt(b, a)
        };
        a.prototype.removeElement = function(b) {
            return this._getCurrentContentGroup().removeElement(b)
        };
        a.prototype.removeElementAt = function(b) {
            return this._getCurrentContentGroup().removeElementAt(b)
        };
        a.prototype.removeAllElements = function() {
            this._getCurrentContentGroup().removeAllElements()
        };
        a.prototype.getElementIndex = function(b) {
            return this._getCurrentContentGroup().getElementIndex(b)
        };
        a.prototype.setElementIndex = function(b, a) {
            this._getCurrentContentGroup().setElementIndex(b, a)
        };
        a.prototype.swapElements = function(b, a) {
            this._getCurrentContentGroup().swapElements(b, a)
        };
        a.prototype.swapElementsAt = function(b, a) {
            this._getCurrentContentGroup().swapElementsAt(b, a)
        };
        Object.defineProperty(a.prototype, "layout", {
            get: function() {
                return null != this.contentGroup ? this.contentGroup.layout : this.contentGroupProperties.layout
            },
            set: function(b) {
                null != this.contentGroup ? this.contentGroup.layout = b : this.contentGroupProperties.layout =
                    b
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype.partAdded = function(b, a) {
            d.prototype.partAdded.call(this, b, a);
            if (a == this.contentGroup) {
                void 0 !== this.contentGroupProperties.layout && (this.contentGroup.layout = this.contentGroupProperties.layout, this.contentGroupProperties = {});
                if (this._placeHolderGroup) {
                    this._placeHolderGroup.removeEventListener(c.ElementExistenceEvent.ELEMENT_ADD, this._contentGroup_elementAddedHandler, this);
                    this._placeHolderGroup.removeEventListener(c.ElementExistenceEvent.ELEMENT_REMOVE,
                        this._contentGroup_elementRemovedHandler, this);
                    for (var e = this._placeHolderGroup._getElementsContent().concat(), m = this._placeHolderGroup.numElements; 0 < m; m--) {
                        var f = this._placeHolderGroup.removeElementAt(0);
                        f.ownerChanged(null)
                    }
                    this._removeFromDisplayList(this._placeHolderGroup);
                    this.contentGroup.elementsContent = e;
                    for (m = e.length - 1; 0 <= m; m--) f = e[m], f.ownerChanged(this);
                    this._placeHolderGroup = null
                }
                this.contentGroup.addEventListener(c.ElementExistenceEvent.ELEMENT_ADD, this._contentGroup_elementAddedHandler,
                    this);
                this.contentGroup.addEventListener(c.ElementExistenceEvent.ELEMENT_REMOVE, this._contentGroup_elementRemovedHandler, this)
            }
        };
        a.prototype.partRemoved = function(b, a) {
            d.prototype.partRemoved.call(this, b, a);
            if (a == this.contentGroup && (this.contentGroup.removeEventListener(c.ElementExistenceEvent.ELEMENT_ADD, this._contentGroup_elementAddedHandler, this), this.contentGroup.removeEventListener(c.ElementExistenceEvent.ELEMENT_REMOVE, this._contentGroup_elementRemovedHandler, this), this.contentGroupProperties.layout =
                this.contentGroup.layout, this.contentGroup.layout = null, 0 < this.contentGroup.numElements)) {
                for (this._placeHolderGroup = new c.Group; 0 < this.contentGroup.numElements;) this._placeHolderGroup.addElement(this.contentGroup.getElementAt(0));
                this._placeHolderGroup.addEventListener(c.ElementExistenceEvent.ELEMENT_ADD, this._contentGroup_elementAddedHandler, this);
                this._placeHolderGroup.addEventListener(c.ElementExistenceEvent.ELEMENT_REMOVE, this._contentGroup_elementRemovedHandler, this)
            }
        };
        a.prototype._contentGroup_elementAddedHandler =
            function(b) {
                b.element.ownerChanged(this);
                this.dispatchEvent(b)
            };
        a.prototype._contentGroup_elementRemovedHandler = function(b) {
            b.element.ownerChanged(null);
            this.dispatchEvent(b)
        };
        return a
    }(c.SkinnableComponent);
    c.SkinnableContainer = e
})(egret || (egret = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(d) {
        function a() {
            d.call(this);
            this._dataGroupProperties = {};
            this.hostComponentKey = "egret.SkinnableDataContainer"
        }
        __extends(a, d);
        a.prototype.updateRenderer = function(b, a, c) {
            "ownerChanged" in b && b.ownerChanged(this);
            b.itemIndex = a;
            b.label = this.itemToLabel(c);
            b.data = c;
            return b
        };
        a.prototype.itemToLabel = function(b) {
            return null !== b ? b.toString() : " "
        };
        Object.defineProperty(a.prototype, "dataProvider", {
            get: function() {
                return this._getDataProvider()
            },
            set: function(b) {
                this._setDataProvider(b)
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype._getDataProvider = function() {
            return null != this.dataGroup ? this.dataGroup.dataProvider : this._dataGroupProperties.dataProvider
        };
        a.prototype._setDataProvider = function(b) {
            null == this.dataGroup ? this._dataGroupProperties.dataProvider = b : (this.dataGroup.dataProvider = b, this._dataGroupProperties.dataProvider = !0)
        };
        Object.defineProperty(a.prototype, "itemRenderer", {
            get: function() {
                return this.dataGroup ? this.dataGroup.itemRenderer : this._dataGroupProperties.itemRenderer
            },
            set: function(b) {
                null == this.dataGroup ? this._dataGroupProperties.itemRenderer = b : (this.dataGroup.itemRenderer = b, this._dataGroupProperties.itemRenderer = !0)
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "itemRendererSkinName", {
            get: function() {
                return this.dataGroup ? this.dataGroup.itemRendererSkinName : this._dataGroupProperties.itemRendererSkinName
            },
            set: function(b) {
                null == this.dataGroup ? this._dataGroupProperties.itemRendererSkinName = b : (this.dataGroup.itemRendererSkinName = b, this._dataGroupProperties.itemRendererSkinName = !0)
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "itemRendererFunction", {
            get: function() {
                return this.dataGroup ? this.dataGroup.itemRendererFunction : this._dataGroupProperties.itemRendererFunction
            },
            set: function(b) {
                null == this.dataGroup ? this._dataGroupProperties.itemRendererFunction = b : (this.dataGroup.itemRendererFunction = b, this._dataGroupProperties.itemRendererFunction = !0)
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "layout", {
            get: function() {
                return this.dataGroup ?
                    this.dataGroup.layout : this._dataGroupProperties.layout
            },
            set: function(b) {
                this._setLayout(b)
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype._setLayout = function(b) {
            null == this.dataGroup ? this._dataGroupProperties.layout = b : (this.dataGroup.layout = b, this._dataGroupProperties.layout = !0)
        };
        a.prototype.partAdded = function(b, a) {
            d.prototype.partAdded.call(this, b, a);
            if (a == this.dataGroup) {
                var e = {};
                void 0 !== this._dataGroupProperties.layout && (this.dataGroup.layout = this._dataGroupProperties.layout, e.layout = !0);
                void 0 !==
                    this._dataGroupProperties.dataProvider && (this.dataGroup.dataProvider = this._dataGroupProperties.dataProvider, e.dataProvider = !0);
                void 0 !== this._dataGroupProperties.itemRenderer && (this.dataGroup.itemRenderer = this._dataGroupProperties.itemRenderer, e.itemRenderer = !0);
                void 0 !== this._dataGroupProperties.itemRendererSkinName && (this.dataGroup.itemRendererSkinName = this._dataGroupProperties.itemRendererSkinName, e.itemRendererSkinName = !0);
                void 0 !== this._dataGroupProperties.itemRendererFunction && (this.dataGroup.itemRendererFunction =
                    this._dataGroupProperties.itemRendererFunction, e.itemRendererFunction = !0);
                this.dataGroup._rendererOwner = this;
                this._dataGroupProperties = e;
                this.hasEventListener(c.RendererExistenceEvent.RENDERER_ADD) && this.dataGroup.addEventListener(c.RendererExistenceEvent.RENDERER_ADD, this.dispatchEvent, this);
                this.hasEventListener(c.RendererExistenceEvent.RENDERER_REMOVE) && this.dataGroup.addEventListener(c.RendererExistenceEvent.RENDERER_REMOVE, this.dispatchEvent, this)
            }
        };
        a.prototype.partRemoved = function(b, a) {
            d.prototype.partRemoved.call(this,
                b, a);
            if (a == this.dataGroup) {
                this.dataGroup.removeEventListener(c.RendererExistenceEvent.RENDERER_ADD, this.dispatchEvent, this);
                this.dataGroup.removeEventListener(c.RendererExistenceEvent.RENDERER_REMOVE, this.dispatchEvent, this);
                var e = {};
                this._dataGroupProperties.layout && (e.layout = this.dataGroup.layout);
                this._dataGroupProperties.dataProvider && (e.dataProvider = this.dataGroup.dataProvider);
                this._dataGroupProperties.itemRenderer && (e.itemRenderer = this.dataGroup.itemRenderer);
                this._dataGroupProperties.itemRendererSkinName &&
                    (e.itemRendererSkinName = this.dataGroup.itemRendererSkinName);
                this._dataGroupProperties.itemRendererFunction && (e.itemRendererFunction = this.dataGroup.itemRendererFunction);
                this._dataGroupProperties = e;
                this.dataGroup._rendererOwner = null;
                this.dataGroup.dataProvider = null;
                this.dataGroup.layout = null
            }
        };
        a.prototype.addEventListener = function(b, a, e, m, f) {
            "undefined" === typeof m && (m = !1);
            "undefined" === typeof f && (f = 0);
            d.prototype.addEventListener.call(this, b, a, e, m, f);
            b == c.RendererExistenceEvent.RENDERER_ADD && this.dataGroup &&
                this.dataGroup.addEventListener(c.RendererExistenceEvent.RENDERER_ADD, this.dispatchEvent, this);
            b == c.RendererExistenceEvent.RENDERER_REMOVE && this.dataGroup && this.dataGroup.addEventListener(c.RendererExistenceEvent.RENDERER_REMOVE, this.dispatchEvent, this)
        };
        a.prototype.removeEventListener = function(b, a, e, m) {
            "undefined" === typeof m && (m = !1);
            d.prototype.removeEventListener.call(this, b, a, e, m);
            b == c.RendererExistenceEvent.RENDERER_ADD && this.dataGroup && (this.hasEventListener(c.RendererExistenceEvent.RENDERER_ADD) ||
                this.dataGroup.removeEventListener(c.RendererExistenceEvent.RENDERER_ADD, this.dispatchEvent, this));
            b == c.RendererExistenceEvent.RENDERER_REMOVE && this.dataGroup && (this.hasEventListener(c.RendererExistenceEvent.RENDERER_REMOVE) || this.dataGroup.removeEventListener(c.RendererExistenceEvent.RENDERER_REMOVE, this.dispatchEvent, this))
        };
        return a
    }(c.SkinnableComponent);
    c.SkinnableDataContainer = e
})(egret || (egret = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(d) {
        function a() {
            d.call(this);
            this._doingWholesaleChanges = !1;
            this._labelField = "label";
            this.requireSelectionChanged = this._requireSelection = !1;
            this._proposedSelectedIndex = a.NO_PROPOSED_SELECTION;
            this._selectedIndex = a.NO_SELECTION;
            this.selectedIndexAdjusted = this._useVirtualLayout = this._dispatchChangeAfterSelection = this._allowCustomSelectedItem = !1
        }
        __extends(a, d);
        a.prototype._setDataProvider = function(b) {
            this.dataProvider && this.dataProvider.removeEventListener(c.CollectionEvent.COLLECTION_CHANGE,
                this.dataProvider_collectionChangeHandler, this);
            this._doingWholesaleChanges = this.dataProviderChanged = !0;
            b && b.addEventListener(c.CollectionEvent.COLLECTION_CHANGE, this.dataProvider_collectionChangeHandler, this);
            d.prototype._setDataProvider.call(this, b);
            this.invalidateProperties()
        };
        Object.defineProperty(a.prototype, "layout", {
            get: function() {
                return this.dataGroup ? this.dataGroup.layout : this._dataGroupProperties.layout
            },
            set: function(b) {
                b && this.useVirtualLayout && (b.useVirtualLayout = !0);
                this._setLayout(b)
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "labelField", {
            get: function() {
                return this._labelField
            },
            set: function(b) {
                this._setLabelField(b)
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype._setLabelField = function(b) {
            b != this._labelField && (this._labelField = b, this.labelFieldOrFunctionChanged = !0, this.invalidateProperties())
        };
        Object.defineProperty(a.prototype, "labelFunction", {
            get: function() {
                return this._labelFunction
            },
            set: function(b) {
                this._setLabelFunction(b)
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype._setLabelFunction = function(b) {
            b != this._labelFunction && (this._labelFunction = b, this.labelFieldOrFunctionChanged = !0, this.invalidateProperties())
        };
        Object.defineProperty(a.prototype, "requireSelection", {
            get: function() {
                return this._requireSelection
            },
            set: function(b) {
                this._setRequireSelection(b)
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype._setRequireSelection = function(b) {
            b != this._requireSelection && (this._requireSelection = b) && (this.requireSelectionChanged = !0, this.invalidateProperties())
        };
        Object.defineProperty(a.prototype,
            "selectedIndex", {
                get: function() {
                    return this._getSelectedIndex()
                },
                set: function(b) {
                    this._setSelectedIndex(b, !1)
                },
                enumerable: !0,
                configurable: !0
            });
        a.prototype._getSelectedIndex = function() {
            return this._proposedSelectedIndex != a.NO_PROPOSED_SELECTION ? this._proposedSelectedIndex : this._selectedIndex
        };
        a.prototype._setSelectedIndex = function(b, a) {
            "undefined" === typeof a && (a = !1);
            b != this.selectedIndex && (a && (this._dispatchChangeAfterSelection = this._dispatchChangeAfterSelection || a), this._proposedSelectedIndex = b, this.invalidateProperties())
        };
        Object.defineProperty(a.prototype, "selectedItem", {
            get: function() {
                return void 0 !== this._pendingSelectedItem ? this._pendingSelectedItem : this._allowCustomSelectedItem && this.selectedIndex == a.CUSTOM_SELECTED_ITEM ? this._selectedItem : this.selectedIndex == a.NO_SELECTION || null == this.dataProvider ? void 0 : this.dataProvider.length > this.selectedIndex ? this.dataProvider.getItemAt(this.selectedIndex) : void 0
            },
            set: function(b) {
                this._setSelectedItem(b, !1)
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype._setSelectedItem = function(b,
            a) {
            "undefined" === typeof a && (a = !1);
            this.selectedItem !== b && (a && (this._dispatchChangeAfterSelection = this._dispatchChangeAfterSelection || a), this._pendingSelectedItem = b, this.invalidateProperties())
        };
        Object.defineProperty(a.prototype, "useVirtualLayout", {
            get: function() {
                return this._getUseVirtualLayout()
            },
            set: function(b) {
                this._setUseVirtualLayout(b)
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype._getUseVirtualLayout = function() {
            return this.layout ? this.layout.useVirtualLayout : this._useVirtualLayout
        };
        a.prototype._setUseVirtualLayout =
            function(b) {
                b != this.useVirtualLayout && (this._useVirtualLayout = b, this.layout && (this.layout.useVirtualLayout = b))
            };
        a.prototype.commitProperties = function() {
            d.prototype.commitProperties.call(this);
            this.dataProviderChanged && (this._doingWholesaleChanges = this.dataProviderChanged = !1, 0 <= this.selectedIndex && this.dataProvider && this.selectedIndex < this.dataProvider.length ? this.itemSelected(this.selectedIndex, !0) : this.requireSelection ? this._proposedSelectedIndex = 0 : this._setSelectedIndex(-1, !1));
            this.requireSelectionChanged &&
                (this.requireSelectionChanged = !1, this.requireSelection && this.selectedIndex == a.NO_SELECTION && this.dataProvider && 0 < this.dataProvider.length && (this._proposedSelectedIndex = 0));
            void 0 !== this._pendingSelectedItem && (this._proposedSelectedIndex = this.dataProvider ? this.dataProvider.getItemIndex(this._pendingSelectedItem) : a.NO_SELECTION, this._allowCustomSelectedItem && -1 == this._proposedSelectedIndex && (this._proposedSelectedIndex = a.CUSTOM_SELECTED_ITEM, this._selectedItem = this._pendingSelectedItem), this._pendingSelectedItem =
                void 0);
            var b = !1;
            this._proposedSelectedIndex != a.NO_PROPOSED_SELECTION && (b = this.commitSelection());
            this.selectedIndexAdjusted && (this.selectedIndexAdjusted = !1, b || c.UIEvent.dispatchUIEvent(this, c.UIEvent.VALUE_COMMIT));
            if (this.labelFieldOrFunctionChanged) {
                if (null != this.dataGroup)
                    if (this.layout && this.layout.useVirtualLayout)
                        for (var e = this.dataGroup.getElementIndicesInView(), l = e.length, m = 0; m < l; m++) b = e[m], this.updateRendererLabelProperty(b);
                    else
                        for (e = this.dataGroup.numElements, b = 0; b < e; b++) this.updateRendererLabelProperty(b);
                this.labelFieldOrFunctionChanged = !1
            }
        };
        a.prototype.updateRendererLabelProperty = function(b) {
            if (b = this.dataGroup.getElementAt(b)) b.label = this.itemToLabel(b.data)
        };
        a.prototype.partAdded = function(b, a) {
            d.prototype.partAdded.call(this, b, a);
            a == this.dataGroup && (this._useVirtualLayout && this.dataGroup.layout && (this.dataGroup.layout.useVirtualLayout = !0), this.dataGroup.addEventListener(c.RendererExistenceEvent.RENDERER_ADD, this.dataGroup_rendererAddHandler, this), this.dataGroup.addEventListener(c.RendererExistenceEvent.RENDERER_REMOVE,
                this.dataGroup_rendererRemoveHandler, this))
        };
        a.prototype.partRemoved = function(b, a) {
            d.prototype.partRemoved.call(this, b, a);
            a == this.dataGroup && (this.dataGroup.removeEventListener(c.RendererExistenceEvent.RENDERER_ADD, this.dataGroup_rendererAddHandler, this), this.dataGroup.removeEventListener(c.RendererExistenceEvent.RENDERER_REMOVE, this.dataGroup_rendererRemoveHandler, this))
        };
        a.prototype.updateRenderer = function(b, a, c) {
            this.itemSelected(a, this._isItemIndexSelected(a));
            return d.prototype.updateRenderer.call(this,
                b, a, c)
        };
        a.prototype.itemToLabel = function(b) {
            if (null != this._labelFunction) return this._labelFunction(b);
            if ("string" == typeof b) return b;
            if (b instanceof c.XML) try {
                    0 != b[this.labelField].length() && (b = b[this.labelField])
                } catch (a) {} else if (b instanceof Object) try {
                    null != b[this.labelField] && (b = b[this.labelField])
                } catch (d) {}
                if ("string" == typeof b) return b;
            try {
                if (null !== b) return b.toString()
            } catch (e) {}
            return " "
        };
        a.prototype.itemSelected = function(b, a) {
            if (this.dataGroup) {
                var c = this.dataGroup.getElementAt(b);
                null !=
                    c && (c.selected = a)
            }
        };
        a.prototype._isItemIndexSelected = function(b) {
            return b == this.selectedIndex
        };
        a.prototype.commitSelection = function(b) {
            "undefined" === typeof b && (b = !0);
            var d = this.dataProvider ? this.dataProvider.length - 1 : -1,
                e = this._selectedIndex;
            if (!this._allowCustomSelectedItem || this._proposedSelectedIndex != a.CUSTOM_SELECTED_ITEM)
                if (this._proposedSelectedIndex < a.NO_SELECTION && (this._proposedSelectedIndex = a.NO_SELECTION), this._proposedSelectedIndex > d && (this._proposedSelectedIndex = d), this.requireSelection &&
                    this._proposedSelectedIndex == a.NO_SELECTION && this.dataProvider && 0 < this.dataProvider.length) return this._proposedSelectedIndex = a.NO_PROPOSED_SELECTION, this._dispatchChangeAfterSelection = !1;
            d = this._proposedSelectedIndex;
            if (this._dispatchChangeAfterSelection && !c.IndexChangeEvent.dispatchIndexChangeEvent(this, c.IndexChangeEvent.CHANGING, this._selectedIndex, this._proposedSelectedIndex, !0)) return this.itemSelected(this._proposedSelectedIndex, !1), this._proposedSelectedIndex = a.NO_PROPOSED_SELECTION, this._dispatchChangeAfterSelection = !1;
            this._selectedIndex = d;
            this._proposedSelectedIndex = a.NO_PROPOSED_SELECTION;
            e != a.NO_SELECTION && this.itemSelected(e, !1);
            this._selectedIndex != a.NO_SELECTION && this.itemSelected(this._selectedIndex, !0);
            b && (this._dispatchChangeAfterSelection && (c.IndexChangeEvent.dispatchIndexChangeEvent(this, c.IndexChangeEvent.CHANGE, e, this._selectedIndex), this._dispatchChangeAfterSelection = !1), c.UIEvent.dispatchUIEvent(this, c.UIEvent.VALUE_COMMIT));
            return !0
        };
        a.prototype.adjustSelection = function(b, c) {
            this._proposedSelectedIndex !=
                a.NO_PROPOSED_SELECTION ? this._proposedSelectedIndex = b : this._selectedIndex = b;
            this.selectedIndexAdjusted = !0;
            this.invalidateProperties()
        };
        a.prototype.itemAdded = function(b) {
            this._doingWholesaleChanges || (this.selectedIndex == a.NO_SELECTION ? this.requireSelection && this.adjustSelection(b, !0) : b <= this.selectedIndex && this.adjustSelection(this.selectedIndex + 1, !0))
        };
        a.prototype.itemRemoved = function(b) {
            this.selectedIndex == a.NO_SELECTION || this._doingWholesaleChanges || (b == this.selectedIndex ? this.requireSelection &&
                this.dataProvider && 0 < this.dataProvider.length ? 0 == b ? (this._proposedSelectedIndex = 0, this.invalidateProperties()) : this._setSelectedIndex(0, !1) : this.adjustSelection(-1, !1) : b < this.selectedIndex && this.adjustSelection(this.selectedIndex - 1, !1))
        };
        a.prototype.dataGroup_rendererAddHandler = function(b) {
            b = b.renderer;
            null != b && (b.addEventListener(c.TouchEvent.TOUCH_ROLL_OVER, this.item_mouseEventHandler, this), b.addEventListener(c.TouchEvent.TOUCH_ROLL_OUT, this.item_mouseEventHandler, this))
        };
        a.prototype.dataGroup_rendererRemoveHandler =
            function(b) {
                b = b.renderer;
                null != b && (b.removeEventListener(c.TouchEvent.TOUCH_ROLL_OVER, this.item_mouseEventHandler, this), b.removeEventListener(c.TouchEvent.TOUCH_ROLL_OUT, this.item_mouseEventHandler, this))
            };
        a.prototype.item_mouseEventHandler = function(b) {
            var c = b.type,
                c = a.TYPE_MAP[c];
            this.hasEventListener(c) && this._dispatchListEvent(b, c, b.currentTarget)
        };
        a.prototype._dispatchListEvent = function(b, a, d) {
            var e = -1,
                e = d ? d.itemIndex : this.dataGroup.getElementIndex(b.currentTarget),
                f = this.dataProvider.getItemAt(e);
            c.ListEvent.dispatchListEvent(this, a, b, e, f, d)
        };
        a.prototype.dataProvider_collectionChangeHandler = function(b) {
            var d = b.items;
            if (b.kind == c.CollectionEventKind.ADD)
                for (var d = d.length, e = 0; e < d; e++) this.itemAdded(b.location + e);
            else if (b.kind == c.CollectionEventKind.REMOVE)
                for (d = d.length, e = d - 1; 0 <= e; e--) this.itemRemoved(b.location + e);
            else b.kind == c.CollectionEventKind.MOVE ? (this.itemRemoved(b.oldLocation), this.itemAdded(b.location)) : b.kind == c.CollectionEventKind.RESET ? 0 == this.dataProvider.length ? this._setSelectedIndex(a.NO_SELECTION, !1) : (this.dataProviderChanged = !0, this.invalidateProperties()) : b.kind == c.CollectionEventKind.REFRESH && this._setSelectedIndex(a.NO_SELECTION, !1)
        };
        a.NO_SELECTION = -1;
        a.NO_PROPOSED_SELECTION = -2;
        a.CUSTOM_SELECTED_ITEM = -3;
        a.TYPE_MAP = {
            rollOver: "itemRollOver",
            rollOut: "itemRollOut"
        };
        return a
    }(c.SkinnableDataContainer);
    c.ListBase = e
})(egret || (egret = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(c) {
        function a() {
            c.call(this);
            this._title = "";
            this.hostComponentKey = "egret.Panel";
            this.touchEnabled = !1
        }
        __extends(a, c);
        Object.defineProperty(a.prototype, "title", {
            get: function() {
                return this._title
            },
            set: function(b) {
                this._title = b;
                this.titleDisplay && (this.titleDisplay.text = this.title)
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype.partAdded = function(b, a) {
            c.prototype.partAdded.call(this, b, a);
            a == this.titleDisplay && (this.titleDisplay.text = this.title)
        };
        return a
    }(c.SkinnableContainer);
    c.Panel = e
})(egret || (egret = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(d) {
        function a() {
            d.call(this);
            this._autoBackToStage = this._showCloseButton = !0;
            this.hostComponentKey = "egret.TitleWindow";
            this.addEventListener(c.TouchEvent.TOUCH_BEGIN, this.onWindowMouseDown, this, !0, 100)
        }
        __extends(a, d);
        a.prototype.onWindowMouseDown = function(b) {
            this.enabled && this.isPopUp && b.target != this.closeButton && c.PopUpManager.bringToFront(this)
        };
        Object.defineProperty(a.prototype, "showCloseButton", {
            get: function() {
                return this._showCloseButton
            },
            set: function(b) {
                this._showCloseButton !=
                    b && (this._showCloseButton = b, this.closeButton && (this.closeButton.visible = this._showCloseButton))
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "autoBackToStage", {
            get: function() {
                return this._autoBackToStage
            },
            set: function(b) {
                this._autoBackToStage = b
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype.partAdded = function(b, a) {
            d.prototype.partAdded.call(this, b, a);
            a == this.moveArea ? this.moveArea.addEventListener(c.TouchEvent.TOUCH_BEGIN, this.moveArea_mouseDownHandler, this) : a == this.closeButton &&
                (this.closeButton.addEventListener(c.TouchEvent.TOUCH_TAP, this.closeButton_clickHandler, this), this.closeButton.visible = this._showCloseButton)
        };
        a.prototype.partRemoved = function(b, a) {
            d.prototype.partRemoved.call(this, b, a);
            a == this.moveArea ? this.moveArea.removeEventListener(c.TouchEvent.TOUCH_BEGIN, this.moveArea_mouseDownHandler, this) : a == this.closeButton && this.closeButton.removeEventListener(c.TouchEvent.TOUCH_TAP, this.closeButton_clickHandler, this)
        };
        a.prototype.closeButton_clickHandler = function(b) {
            c.CloseEvent.dispatchCloseEvent(this,
                c.CloseEvent.CLOSE)
        };
        a.prototype.moveArea_mouseDownHandler = function(b) {
            this.enabled && this.isPopUp && (b = this.globalToLocal(b.stageX, b.stageY, c.Point.identity), this._offsetPointX = b.x, this._offsetPointY = b.y, this._includeInLayout = !1, c.UIGlobals.stage.addEventListener(c.TouchEvent.TOUCH_MOVE, this.moveArea_mouseMoveHandler, this), c.UIGlobals.stage.addEventListener(c.TouchEvent.TOUCH_END, this.moveArea_mouseUpHandler, this), c.UIGlobals.stage.addEventListener(c.Event.LEAVE_STAGE, this.moveArea_mouseUpHandler,
                this))
        };
        a.prototype.moveArea_mouseMoveHandler = function(b) {
            b = this.globalToLocal(b.stageX, b.stageY, c.Point.identity);
            this.x += b.x - this._offsetPointX;
            this.y += b.y - this._offsetPointY
        };
        a.prototype.moveArea_mouseUpHandler = function(b) {
            c.UIGlobals.stage.removeEventListener(c.TouchEvent.TOUCH_MOVE, this.moveArea_mouseMoveHandler, this);
            c.UIGlobals.stage.removeEventListener(c.TouchEvent.TOUCH_END, this.moveArea_mouseUpHandler, this);
            c.UIGlobals.stage.removeEventListener(c.Event.LEAVE_STAGE, this.moveArea_mouseUpHandler,
                this);
            this._autoBackToStage && this.adjustPosForStage();
            c.LayoutUtil.adjustRelativeByXY(this);
            this.includeInLayout = !0
        };
        a.prototype.adjustPosForStage = function() {
            if (this.moveArea && this.stage) {
                var b = this.moveArea.localToGlobal(0, 0),
                    a = b.x,
                    c = b.y;
                35 > b.x + this.moveArea.width && (a = 35 - this.moveArea.width);
                b.x > this.stage.stageWidth - 20 && (a = this.stage.stageWidth - 20);
                20 > b.y + this.moveArea.height && (c = 20 - this.moveArea.height);
                b.y > this.stage.stageHeight - 20 && (c = this.stage.stageHeight - 20);
                this.x += a - b.x;
                this.y += c - b.y
            }
        };
        return a
    }(c.Panel);
    c.TitleWindow = e
})(egret || (egret = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(d) {
        function a() {
            d.call(this);
            this._contentText = this._secondButtonLabel = this._firstButtonLabel = "";
            this.hostComponentKey = "egret.Alert"
        }
        __extends(a, d);
        a.show = function(b, d, e, m, f, g, k) {
            "undefined" === typeof b && (b = "");
            "undefined" === typeof d && (d = "");
            "undefined" === typeof e && (e = null);
            "undefined" === typeof m && (m = "\u786e\u5b9a");
            "undefined" === typeof f && (f = "");
            "undefined" === typeof g && (g = !0);
            "undefined" === typeof k && (k = !0);
            var n = new a;
            n.contentText = b;
            n.title = d;
            n._firstButtonLabel = m;
            n._secondButtonLabel =
                f;
            n.closeHandler = e;
            c.PopUpManager.addPopUp(n, g, k);
            return n
        };
        Object.defineProperty(a.prototype, "firstButtonLabel", {
            get: function() {
                return this._firstButtonLabel
            },
            set: function(b) {
                this._firstButtonLabel != b && (this._firstButtonLabel = b, this.firstButton && (this.firstButton.label = b))
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "secondButtonLabel", {
            get: function() {
                return this._secondButtonLabel
            },
            set: function(b) {
                this._secondButtonLabel != b && (this._secondButtonLabel = b, !this.secondButton ||
                    null != b && "" != b || (this.secondButton.includeInLayout = this.secondButton.visible = "" != this._secondButtonLabel && null != this._secondButtonLabel))
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "contentText", {
            get: function() {
                return this._contentText
            },
            set: function(b) {
                this._contentText != b && (this._contentText = b, this.contentDisplay && (this.contentDisplay.text = b))
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype.onClose = function(b) {
            c.PopUpManager.removePopUp(this);
            if (null != this.closeHandler) {
                var d =
                    new c.CloseEvent(c.CloseEvent.CLOSE);
                switch (b.currentTarget) {
                    case this.firstButton:
                        d.detail = a.FIRST_BUTTON;
                        break;
                    case this.secondButton:
                        d.detail = a.SECOND_BUTTON
                }
                this.closeHandler(d)
            }
        };
        a.prototype.closeButton_clickHandler = function(b) {
            d.prototype.closeButton_clickHandler.call(this, b);
            c.PopUpManager.removePopUp(this);
            b = new c.CloseEvent(c.CloseEvent.CLOSE, !1, !1, a.CLOSE_BUTTON);
            null != this.closeHandler && this.closeHandler(b)
        };
        a.prototype.partAdded = function(b, a) {
            d.prototype.partAdded.call(this, b, a);
            a == this.contentDisplay ?
                this.contentDisplay.text = this._contentText : a == this.firstButton ? (this.firstButton.label = this._firstButtonLabel, this.firstButton.addEventListener(c.TouchEvent.TOUCH_TAP, this.onClose, this)) : a == this.secondButton && (this.secondButton.label = this._secondButtonLabel, this.secondButton.includeInLayout = this.secondButton.visible = "" != this._secondButtonLabel && null != this._secondButtonLabel, this.secondButton.addEventListener(c.TouchEvent.TOUCH_TAP, this.onClose, this))
        };
        a.prototype.partRemoved = function(b, a) {
            d.prototype.partRemoved.call(this,
                b, a);
            a == this.firstButton ? this.firstButton.removeEventListener(c.TouchEvent.TOUCH_TAP, this.onClose, this) : a == this.secondButton && this.secondButton.removeEventListener(c.TouchEvent.TOUCH_TAP, this.onClose, this)
        };
        a.FIRST_BUTTON = "firstButton";
        a.SECOND_BUTTON = "secondButton";
        a.CLOSE_BUTTON = "closeButton";
        return a
    }(c.TitleWindow);
    c.Alert = e
})(egret || (egret = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(d) {
        function a() {
            d.call(this);
            this._slideDuration = 500;
            this._direction = c.ProgressBarDirection.LEFT_TO_RIGHT;
            this.animationValue = 0;
            this.trackResizedOrMoved = !1;
            this.hostComponentKey = "egret.ProgressBar"
        }
        __extends(a, d);
        Object.defineProperty(a.prototype, "labelFunction", {
            get: function() {
                return this._labelFunction
            },
            set: function(b) {
                this._labelFunction != b && (this._labelFunction = b, this.invalidateDisplayList())
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype.valueToLabel = function(b, a) {
            return null !=
                this.labelFunction ? this._labelFunction(b, a) : b + " / " + a
        };
        Object.defineProperty(a.prototype, "slideDuration", {
            get: function() {
                return this._slideDuration
            },
            set: function(b) {
                this._slideDuration != b && (this._slideDuration = b, this.animator && this.animator.isPlaying && (this.animator.stop(), this._setValue(this.slideToValue)))
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "direction", {
            get: function() {
                return this._direction
            },
            set: function(b) {
                this._direction != b && (this._direction = b, this.invalidateDisplayList())
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "value", {
            get: function() {
                return this._getValue()
            },
            set: function(b) {
                this._getValue() != b && (this._setValue(b), 0 < this._slideDuration && this.stage ? (this.validateProperties(), this.animator || (this.animator = new c.Animation(this.animationUpdateHandler, this)), this.animator.isPlaying && (this.animationValue = this.slideToValue, this.invalidateDisplayList(), this.animator.stop()), this.slideToValue = this.nearestValidValue(b, this.snapInterval), this.slideToValue !=
                    this.animationValue && (b = this._slideDuration * (Math.abs(this.animationValue - this.slideToValue) / (this.maximum - this.minimum)), this.animator.duration = Infinity === b ? 0 : b, this.animator.motionPaths = [{
                        prop: "value",
                        from: this.animationValue,
                        to: this.slideToValue
                    }], this.animator.play())) : this.animationValue = this._getValue())
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype.animationUpdateHandler = function(b) {
            b = this.nearestValidValue(b.currentValue.value, this.snapInterval);
            this.animationValue = Math.min(this.maximum, Math.max(this.minimum,
                b));
            this.invalidateDisplayList()
        };
        a.prototype.setValue = function(b) {
            d.prototype.setValue.call(this, b);
            this.invalidateDisplayList()
        };
        a.prototype.updateDisplayList = function(b, a) {
            d.prototype.updateDisplayList.call(this, b, a);
            this.updateSkinDisplayList()
        };
        a.prototype.partAdded = function(b, a) {
            a == this.track && this.track instanceof c.UIComponent && (this.track.addEventListener(c.ResizeEvent.RESIZE, this.onTrackResizeOrMove, this), this.track.addEventListener(c.MoveEvent.MOVE, this.onTrackResizeOrMove, this))
        };
        a.prototype.partRemoved =
            function(b, a) {
                a == this.track && this.track instanceof c.UIComponent && (this.track.removeEventListener(c.ResizeEvent.RESIZE, this.onTrackResizeOrMove, this), this.track.removeEventListener(c.MoveEvent.MOVE, this.onTrackResizeOrMove, this))
            };
        a.prototype.onTrackResizeOrMove = function(b) {
            this.trackResizedOrMoved = !0;
            this.invalidateProperties()
        };
        a.prototype.commitProperties = function() {
            d.prototype.commitProperties.call(this);
            this.trackResizedOrMoved && (this.trackResizedOrMoved = !1, this.updateSkinDisplayList())
        };
        a.prototype.updateSkinDisplayList =
            function() {
                this.trackResizedOrMoved = !1;
                var b = this.value;
                this.animator && this.animator.isPlaying ? b = this.animationValue : (b = this.value, isNaN(b) && (b = 0));
                var a = isNaN(this.maximum) ? 0 : this.maximum;
                if (this.thumb && this.track) {
                    var d = isNaN(this.track.width) ? 0 : this.track.width,
                        d = d * this.track.scaleX,
                        e = isNaN(this.track.height) ? 0 : this.track.height,
                        e = e * this.track.scaleY,
                        f = Math.round(b / a * d);
                    if (isNaN(f) || 0 > f || Infinity === f) f = 0;
                    var g = Math.round(b / a * e);
                    if (isNaN(g) || 0 > g || Infinity === g) g = 0;
                    var k = this.track.localToGlobal(0,
                            0),
                        n = this.globalToLocal(k.x, k.y, c.Point.identity),
                        k = n.x,
                        n = n.y;
                    switch (this._direction) {
                        case c.ProgressBarDirection.LEFT_TO_RIGHT:
                            this.thumb.width = f;
                            this.thumb.height = e;
                            this.thumb.x = k;
                            break;
                        case c.ProgressBarDirection.RIGHT_TO_LEFT:
                            this.thumb.width = f;
                            this.thumb.height = e;
                            this.thumb.x = k + d - f;
                            break;
                        case c.ProgressBarDirection.TOP_TO_BOTTOM:
                            this.thumb.width = d;
                            this.thumb.height = g;
                            this.thumb.y = n;
                            break;
                        case c.ProgressBarDirection.BOTTOM_TO_TOP:
                            this.thumb.width = d, this.thumb.height = g, this.thumb.y = n + e - g
                    }
                }
                this.labelDisplay &&
                    (this.labelDisplay.text = this.valueToLabel(b, a))
            };
        return a
    }(c.Range);
    c.ProgressBar = e
})(egret || (egret = {}));
(function(c) {
    var e = function() {
        function c() {}
        c.LEFT_TO_RIGHT = "leftToRight";
        c.RIGHT_TO_LEFT = "rightToLeft";
        c.TOP_TO_BOTTOM = "topToBottom";
        c.BOTTOM_TO_TOP = "bottomToTop";
        return c
    }();
    c.ProgressBarDirection = e
})(egret || (egret = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(d) {
        function a() {
            d.call(this);
            this.hostComponentKey = "egret.HSlider"
        }
        __extends(a, d);
        a.prototype.pointToValue = function(b, a) {
            if (!this.thumb || !this.track) return 0;
            var c = this.maximum - this.minimum,
                d = this.track.layoutBoundsWidth - this.thumb.layoutBoundsWidth;
            return this.minimum + (0 != d ? b / d * c : 0)
        };
        a.prototype.updateSkinDisplayList = function() {
            if (this.thumb && this.track) {
                var b = this.track.layoutBoundsWidth - this.thumb.layoutBoundsWidth,
                    a = this.maximum - this.minimum,
                    b = 0 < a ? (this.pendingValue -
                        this.minimum) / a * b : 0,
                    d = this.track.localToGlobal(b, 0),
                    a = d.x,
                    d = d.y,
                    e = this.thumb.parent.globalToLocal(a, d, c.Point.identity).x;
                this.thumb.setLayoutBoundsPosition(Math.round(e), this.thumb.layoutBoundsY);
                this.showTrackHighlight && this.trackHighlight && this.trackHighlight.parent && (a = this.trackHighlight.parent.globalToLocal(a, d, c.Point.identity).x - b, this.trackHighlight.x = Math.round(a), this.trackHighlight.width = Math.round(b))
            }
        };
        return a
    }(c.SliderBase);
    c.HSlider = e
})(egret || (egret = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(d) {
        function a() {
            d.call(this);
            this.hostComponentKey = "egret.VSlider"
        }
        __extends(a, d);
        a.prototype.pointToValue = function(b, a) {
            if (!this.thumb || !this.track) return 0;
            var c = this.maximum - this.minimum,
                d = this.track.layoutBoundsHeight - this.thumb.layoutBoundsHeight;
            return this.minimum + (0 != d ? (d - a) / d * c : 0)
        };
        a.prototype.updateSkinDisplayList = function() {
            if (this.thumb && this.track) {
                var b = this.thumb.layoutBoundsHeight,
                    a = this.track.layoutBoundsHeight - b,
                    d = this.maximum - this.minimum,
                    e = this.track.localToGlobal(0,
                        0 < d ? a - (this.pendingValue - this.minimum) / d * a : 0),
                    d = e.x,
                    e = e.y,
                    f = this.thumb.parent.globalToLocal(d, e, c.Point.identity).y;
                this.thumb.setLayoutBoundsPosition(this.thumb.layoutBoundsX, Math.round(f));
                this.showTrackHighlight && this.trackHighlight && this.trackHighlight._parent && (d = this.trackHighlight._parent.globalToLocal(d, e, c.Point.identity).y, this.trackHighlight.y = Math.round(d + b), this.trackHighlight.height = Math.round(a - d))
            }
        };
        return a
    }(c.SliderBase);
    c.VSlider = e
})(egret || (egret = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(d) {
        function a() {
            d.call(this);
            this._allowMultipleSelection = !1;
            this._selectedIndices = [];
            this._captureItemRenderer = !0;
            this.hostComponentKey = "egret.List";
            this.useVirtualLayout = !0
        }
        __extends(a, d);
        a.prototype.createChildren = function() {
            this.itemRenderer || (this.itemRenderer = c.DataGroup.defaultRendererFactory);
            d.prototype.createChildren.call(this)
        };
        Object.defineProperty(a.prototype, "useVirtualLayout", {
            get: function() {
                return this._getUseVirtualLayout()
            },
            set: function(b) {
                this._setUseVirtualLayout(b)
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "allowMultipleSelection", {
            get: function() {
                return this._allowMultipleSelection
            },
            set: function(b) {
                this._allowMultipleSelection = b
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "selectedIndices", {
            get: function() {
                return this._proposedSelectedIndices ? this._proposedSelectedIndices : this._selectedIndices
            },
            set: function(b) {
                this._setSelectedIndices(b, !1)
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "selectedIndex", {
            get: function() {
                return this._proposedSelectedIndices ? 0 < this._proposedSelectedIndices.length ? this._proposedSelectedIndices[0] : -1 : this._getSelectedIndex()
            },
            set: function(b) {
                this._setSelectedIndex(b)
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "selectedItems", {
            get: function() {
                var b = [],
                    a = this.selectedIndices;
                if (a)
                    for (var c = a.length, d = 0; d < c; d++) b[d] = this.dataProvider.getItemAt(a[d]);
                return b
            },
            set: function(b) {
                var a = [];
                if (b)
                    for (var c = b.length, d = 0; d < c; d++) {
                        var e = this.dataProvider.getItemIndex(b[d]); - 1 != e && a.splice(0, 0, e);
                        if (-1 == e) {
                            a = [];
                            break
                        }
                    }
                this._setSelectedIndices(a, !1)
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype._setSelectedIndices = function(b, a) {
            "undefined" === typeof a && (a = !1);
            a && (this._dispatchChangeAfterSelection = this._dispatchChangeAfterSelection || a);
            this._proposedSelectedIndices = b ? b : [];
            this.invalidateProperties()
        };
        a.prototype.commitProperties = function() {
            d.prototype.commitProperties.call(this);
            this._proposedSelectedIndices && this.commitSelection()
        };
        a.prototype.commitSelection = function(b) {
            "undefined" ===
            typeof b && (b = !0);
            var a = this._selectedIndex;
            if (this._proposedSelectedIndices) {
                this._proposedSelectedIndices = this._proposedSelectedIndices.filter(this.isValidIndex);
                if (!this.allowMultipleSelection && 0 < this._proposedSelectedIndices.length) {
                    var e = [];
                    e.push(this._proposedSelectedIndices[0]);
                    this._proposedSelectedIndices = e
                }
                this._proposedSelectedIndex = 0 < this._proposedSelectedIndices.length ? this._proposedSelectedIndices[0] : -1
            }
            e = d.prototype.commitSelection.call(this, !1);
            if (!e) return this._proposedSelectedIndices =
                null, !1;
            this.selectedIndex > c.ListBase.NO_SELECTION && (this._proposedSelectedIndices ? -1 == this._proposedSelectedIndices.indexOf(this.selectedIndex) && this._proposedSelectedIndices.push(this.selectedIndex) : this._proposedSelectedIndices = [this.selectedIndex]);
            this._proposedSelectedIndices && (-1 != this._proposedSelectedIndices.indexOf(a) && this.itemSelected(a, !0), this.commitMultipleSelection());
            b && e && (this._dispatchChangeAfterSelection && (c.IndexChangeEvent.dispatchIndexChangeEvent(this, c.IndexChangeEvent.CHANGE,
                a, this._selectedIndex), this._dispatchChangeAfterSelection = !1), c.UIEvent.dispatchUIEvent(this, c.UIEvent.VALUE_COMMIT));
            return e
        };
        a.prototype.isValidIndex = function(b, a, c) {
            return this.dataProvider && 0 <= b && b < this.dataProvider.length
        };
        a.prototype.commitMultipleSelection = function() {
            var b = [],
                a = [],
                c, d;
            if (0 < this._selectedIndices.length && 0 < this._proposedSelectedIndices.length) {
                d = this._proposedSelectedIndices.length;
                for (c = 0; c < d; c++) - 1 == this._selectedIndices.indexOf(this._proposedSelectedIndices[c]) && a.push(this._proposedSelectedIndices[c]);
                d = this._selectedIndices.length;
                for (c = 0; c < d; c++) - 1 == this._proposedSelectedIndices.indexOf(this._selectedIndices[c]) && b.push(this._selectedIndices[c])
            } else 0 < this._selectedIndices.length ? b = this._selectedIndices : 0 < this._proposedSelectedIndices.length && (a = this._proposedSelectedIndices);
            this._selectedIndices = this._proposedSelectedIndices;
            if (0 < b.length)
                for (d = b.length, c = 0; c < d; c++) this.itemSelected(b[c], !1);
            if (0 < a.length)
                for (d = a.length, c = 0; c < d; c++) this.itemSelected(a[c], !0);
            this._proposedSelectedIndices =
                null
        };
        a.prototype._isItemIndexSelected = function(b) {
            return this._allowMultipleSelection ? -1 != this._selectedIndices.indexOf(b) : d.prototype._isItemIndexSelected.call(this, b)
        };
        a.prototype.dataGroup_rendererAddHandler = function(b) {
            d.prototype.dataGroup_rendererAddHandler.call(this, b);
            b = b.renderer;
            null != b && (b.addEventListener(c.TouchEvent.TOUCH_BEGIN, this.item_mouseDownHandler, this), b.addEventListener(c.TouchEvent.TOUCH_END, this.item_mouseUpHandler, this))
        };
        a.prototype.dataGroup_rendererRemoveHandler = function(b) {
            d.prototype.dataGroup_rendererRemoveHandler.call(this,
                b);
            b = b.renderer;
            null != b && (b.removeEventListener(c.TouchEvent.TOUCH_BEGIN, this.item_mouseDownHandler, this), b.removeEventListener(c.TouchEvent.TOUCH_END, this.item_mouseUpHandler, this))
        };
        a.prototype.item_mouseDownHandler = function(b) {
            if (!b.isDefaultPrevented()) {
                var a = b.currentTarget,
                    d;
                d = a ? a.itemIndex : this.dataGroup.getElementIndex(b.currentTarget);
                this._allowMultipleSelection ? this._setSelectedIndices(this.calculateSelectedIndices(d, b.shiftKey, b.ctrlKey), !0) : this._setSelectedIndex(d, !0);
                this._captureItemRenderer &&
                    (this.mouseDownItemRenderer = a, c.UIGlobals.stage.addEventListener(c.TouchEvent.TOUCH_END, this.stage_mouseUpHandler, this), c.UIGlobals.stage.addEventListener(c.Event.LEAVE_STAGE, this.stage_mouseUpHandler, this))
            }
        };
        a.prototype.calculateSelectedIndices = function(b, a, c) {
            var d = [];
            if (a)
                if (a = 0 < this._selectedIndices.length ? this._selectedIndices[this._selectedIndices.length - 1] : 0, a < b)
                    for (; a <= b; a++) d.splice(0, 0, a);
                else
                    for (; a >= b; a--) d.splice(0, 0, a);
            else if (c)
                if (0 < this._selectedIndices.length)
                    if (1 == this._selectedIndices.length &&
                        this._selectedIndices[0] == b) {
                        if (!this.requireSelection) return d;
                        d.splice(0, 0, this._selectedIndices[0])
                    } else {
                        c = !1;
                        for (a = 0; a < this._selectedIndices.length; a++) this._selectedIndices[a] == b ? c = !0 : this._selectedIndices[a] != b && d.splice(0, 0, this._selectedIndices[a]);
                        c || d.splice(0, 0, b)
                    } else d.splice(0, 0, b);
            else d.splice(0, 0, b);
            return d
        };
        a.prototype.item_mouseUpHandler = function(b) {
            var a = b.currentTarget;
            a == this.mouseDownItemRenderer && this._dispatchListEvent(b, c.ListEvent.ITEM_CLICK, a)
        };
        a.prototype.stage_mouseUpHandler =
            function(b) {
                c.UIGlobals.stage.removeEventListener(c.TouchEvent.TOUCH_END, this.stage_mouseUpHandler, this);
                c.UIGlobals.stage.removeEventListener(c.Event.LEAVE_STAGE, this.stage_mouseUpHandler, this);
                this.mouseDownItemRenderer = null
            };
        return a
    }(c.ListBase);
    c.List = e
})(egret || (egret = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(d) {
        function a() {
            d.call(this);
            this._displayPopUp = this._popUpWidthMatchesAnchorWidth = this._popUpHeightMatchesAnchorHeight = this.addedToStage = this.popUpIsDisplayed = !1;
            this._popUpPosition = c.PopUpPosition.TOP_LEFT;
            this.inAnimation = !1;
            this.animator = null;
            this._openDuration = 250;
            this._closeDuration = 150;
            this.valueRange = 1;
            this.addEventListener(c.Event.ADDED_TO_STAGE, this.addedToStageHandler, this);
            this.addEventListener(c.Event.REMOVED_FROM_STAGE, this.removedFromStageHandler, this)
        }
        __extends(a,
            d);
        Object.defineProperty(a.prototype, "popUpHeightMatchesAnchorHeight", {
            get: function() {
                return this._popUpHeightMatchesAnchorHeight
            },
            set: function(b) {
                this._popUpHeightMatchesAnchorHeight != b && (this._popUpHeightMatchesAnchorHeight = b, this.invalidateDisplayList())
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "popUpWidthMatchesAnchorWidth", {
            get: function() {
                return this._popUpWidthMatchesAnchorWidth
            },
            set: function(b) {
                this._popUpWidthMatchesAnchorWidth != b && (this._popUpWidthMatchesAnchorWidth =
                    b, this.invalidateDisplayList())
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "displayPopUp", {
            get: function() {
                return this._displayPopUp
            },
            set: function(b) {
                this._displayPopUp != b && (this._displayPopUp = b, this.addOrRemovePopUp())
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "popUp", {
            get: function() {
                return this._popUp
            },
            set: function(b) {
                this._popUp != b && (this._popUp = b, this.dispatchEventWith("popUpChanged"))
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype,
            "popUpPosition", {
                get: function() {
                    return this._popUpPosition
                },
                set: function(b) {
                    this._popUpPosition != b && (this._popUpPosition = b, this.invalidateDisplayList())
                },
                enumerable: !0,
                configurable: !0
            });
        a.prototype.updateDisplayList = function(b, a) {
            d.prototype.updateDisplayList.call(this, b, a);
            this.applyPopUpTransform(b, a)
        };
        a.prototype.updatePopUpTransform = function() {
            this.applyPopUpTransform(this.width, this.height)
        };
        a.prototype.calculatePopUpPosition = function() {
            var b = c.Point.identity;
            switch (this._popUpPosition) {
                case c.PopUpPosition.BELOW:
                    b.x =
                        0;
                    b.y = this.height;
                    break;
                case c.PopUpPosition.ABOVE:
                    b.x = 0;
                    b.y = -this.popUp.layoutBoundsHeight;
                    break;
                case c.PopUpPosition.LEFT:
                    b.x = -this.popUp.layoutBoundsWidth;
                    b.y = 0;
                    break;
                case c.PopUpPosition.RIGHT:
                    b.x = this.width;
                    b.y = 0;
                    break;
                case c.PopUpPosition.CENTER:
                    b.x = 0.5 * (this.width - this.popUp.layoutBoundsWidth), b.y = 0.5 * (this.height - this.popUp.layoutBoundsHeight)
            }
            b = this.localToGlobal(b.x, b.y, b);
            return b = this.popUp.parent.globalToLocal(b.x, b.y, b)
        };
        Object.defineProperty(a.prototype, "openDuration", {
            get: function() {
                return this._openDuration
            },
            set: function(b) {
                this._openDuration = b
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "closeDuration", {
            get: function() {
                return this._closeDuration
            },
            set: function(b) {
                this._closeDuration = b
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype.animationStartHandler = function(b) {
            this.inAnimation = !0;
            this.popUp && "enabled" in this.popUp && (this.popUp.enabled = !1)
        };
        a.prototype.animationUpdateHandler = function(b) {
            var a = this.popUp._scrollRect,
                d = Math.round(b.currentValue.x);
            b = Math.round(b.currentValue.y);
            a ?
                (a.x = d, a.y = b, a.width = this.popUp.width, a.height = this.popUp.height) : this.popUp._scrollRect = new c.Rectangle(d, b, this.popUp.width, this.popUp.height)
        };
        a.prototype.animationEndHandler = function(b) {
            this.inAnimation = !1;
            this.popUp && "enabled" in this.popUp && (this.popUp.enabled = !0);
            this.popUp.scrollRect = null;
            this.popUpIsDisplayed || (c.PopUpManager.removePopUp(this.popUp), this.popUp.ownerChanged(null))
        };
        a.prototype.addOrRemovePopUp = function() {
            this.addedToStage && this.popUp && (null == this.popUp.parent && this.displayPopUp ?
                (c.PopUpManager.addPopUp(this.popUp, !1, !1), this.popUp.ownerChanged(this), this.popUpIsDisplayed = !0, this.inAnimation && this.animator.end(), this.initialized ? (this.applyPopUpTransform(this.width, this.height), 0 < this._openDuration && this.startAnimation()) : c.callLater(function() {
                    0 < this.openDuration && this.startAnimation()
                }, this)) : null == this.popUp.parent || this.displayPopUp || this.removeAndResetPopUp())
        };
        a.prototype.removeAndResetPopUp = function() {
            this.inAnimation && this.animator.end();
            this.popUpIsDisplayed = !1;
            0 < this._closeDuration ? this.startAnimation() : (c.PopUpManager.removePopUp(this.popUp), this.popUp.ownerChanged(null))
        };
        a.prototype.applyPopUpTransform = function(b, a) {
            if (this.popUpIsDisplayed) {
                this.popUpWidthMatchesAnchorWidth && (this.popUp.width = b);
                this.popUpHeightMatchesAnchorHeight && (this.popUp.height = a);
                "validateNow" in this.popUp && this.popUp.validateNow();
                var c = this.calculatePopUpPosition();
                this.popUp.x = c.x;
                this.popUp.y = c.y
            }
        };
        a.prototype.startAnimation = function() {
            this.animator || (this.animator = new c.Animation(this.animationUpdateHandler,
                this), this.animator.endFunction = this.animationEndHandler, this.animator.startFunction = this.animationStartHandler);
            this.animator.motionPaths = this.createMotionPath();
            this.animator.duration = this.popUpIsDisplayed ? this._openDuration : this._closeDuration;
            this.animator.play()
        };
        a.prototype.createMotionPath = function() {
            var b = {
                    prop: "x"
                },
                a = {
                    prop: "y"
                },
                d = [b, a];
            switch (this._popUpPosition) {
                case c.PopUpPosition.TOP_LEFT:
                case c.PopUpPosition.CENTER:
                case c.PopUpPosition.BELOW:
                    b.from = b.to = 0;
                    a.from = this.popUp.height;
                    a.to =
                        0;
                    this.valueRange = this.popUp.height;
                    break;
                case c.PopUpPosition.ABOVE:
                    b.from = b.to = 0;
                    a.from = -this.popUp.height;
                    a.to = 0;
                    this.valueRange = this.popUp.height;
                    break;
                case c.PopUpPosition.LEFT:
                    a.from = a.to = 0;
                    b.from = -this.popUp.width;
                    b.to = 0;
                    this.valueRange = this.popUp.width;
                    break;
                case c.PopUpPosition.RIGHT:
                    a.from = a.to = 0;
                    b.from = this.popUp.width;
                    b.to = 0;
                    this.valueRange = this.popUp.width;
                    break;
                default:
                    this.valueRange = 1
            }
            this.valueRange = Math.abs(this.valueRange);
            if (!this.popUpIsDisplayed) {
                var e = b.from;
                b.from = b.to;
                b.to =
                    e;
                e = a.from;
                a.from = a.to;
                a.to = e
            }
            return d
        };
        a.prototype.addedToStageHandler = function(b) {
            this.addedToStage = !0;
            c.callLater(this.checkPopUpState, this)
        };
        a.prototype.checkPopUpState = function() {
            this.addedToStage ? this.addOrRemovePopUp() : null != this.popUp && null != this.popUp.parent && this.removeAndResetPopUp()
        };
        a.prototype.removedFromStageHandler = function(b) {
            this.addedToStage = !1;
            c.callLater(this.checkPopUpState, this)
        };
        return a
    }(c.UIComponent);
    c.PopUpAnchor = e
})(egret || (egret = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(d) {
        function a() {
            d.call(this);
            this._isOpen = !1;
            this._closeOnResize = !0;
            this._rollOverOpenDelay = NaN
        }
        __extends(a, d);
        Object.defineProperty(a.prototype, "openButton", {
            get: function() {
                return this._openButton
            },
            set: function(b) {
                this._openButton !== b && (this.removeOpenTriggers(), this._openButton = b, this.addOpenTriggers())
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "dropDown", {
            get: function() {
                return this._dropDown
            },
            set: function(b) {
                this._dropDown !== b && (this._dropDown =
                    b)
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "isOpen", {
            get: function() {
                return this._isOpen
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "closeOnResize", {
            get: function() {
                return this._closeOnResize
            },
            set: function(b) {
                this._closeOnResize != b && (this.isOpen && this.removeCloseOnResizeTrigger(), this._closeOnResize = b, this.addCloseOnResizeTrigger())
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "rollOverOpenDelay", {
            get: function() {
                return this._rollOverOpenDelay
            },
            set: function(b) {
                this._rollOverOpenDelay != b && (this.removeOpenTriggers(), this._rollOverOpenDelay = b, this.addOpenTriggers())
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype.addOpenTriggers = function() {
            this.openButton && (isNaN(this.rollOverOpenDelay) ? this.openButton.addEventListener(c.UIEvent.BUTTON_DOWN, this._openButton_buttonDownHandler, this) : this.openButton.addEventListener(c.TouchEvent.TOUCH_ROLL_OVER, this._openButton_rollOverHandler, this))
        };
        a.prototype.removeOpenTriggers = function() {
            this.openButton && (isNaN(this.rollOverOpenDelay) ?
                this.openButton.removeEventListener(c.UIEvent.BUTTON_DOWN, this._openButton_buttonDownHandler, this) : this.openButton.removeEventListener(c.TouchEvent.TOUCH_ROLL_OVER, this._openButton_rollOverHandler, this))
        };
        a.prototype.addCloseTriggers = function() {
            c.UIGlobals.stage && (isNaN(this.rollOverOpenDelay) ? (c.UIGlobals.stage.addEventListener(c.TouchEvent.TOUCH_BEGIN, this.stage_mouseDownHandler, this), c.UIGlobals.stage.addEventListener(c.TouchEvent.TOUCH_END, this.stage_mouseUpHandler_noRollOverOpenDelay, this)) :
                c.UIGlobals.stage.addEventListener(c.TouchEvent.TOUCH_MOVE, this.stage_mouseMoveHandler, this), this.addCloseOnResizeTrigger())
        };
        a.prototype.removeCloseTriggers = function() {
            c.UIGlobals.stage && (isNaN(this.rollOverOpenDelay) ? (c.UIGlobals.stage.removeEventListener(c.TouchEvent.TOUCH_BEGIN, this.stage_mouseDownHandler, this), c.UIGlobals.stage.removeEventListener(c.TouchEvent.TOUCH_END, this.stage_mouseUpHandler_noRollOverOpenDelay, this)) : (c.UIGlobals.stage.removeEventListener(c.TouchEvent.TOUCH_MOVE, this.stage_mouseMoveHandler,
                this), c.UIGlobals.stage.removeEventListener(c.TouchEvent.TOUCH_END, this.stage_mouseUpHandler, this), c.UIGlobals.stage.removeEventListener(c.Event.LEAVE_STAGE, this.stage_mouseUpHandler, this)), this.removeCloseOnResizeTrigger())
        };
        a.prototype.addCloseOnResizeTrigger = function() {
            this.closeOnResize && c.UIGlobals.stage.addEventListener(c.Event.RESIZE, this.stage_resizeHandler, this)
        };
        a.prototype.removeCloseOnResizeTrigger = function() {
            this.closeOnResize && c.UIGlobals.stage.removeEventListener(c.Event.RESIZE, this.stage_resizeHandler,
                this)
        };
        a.prototype.isTargetOverDropDownOrOpenButton = function(b) {
            if (b) {
                if (this.openButton && this.openButton.contains(b)) return !0;
                if (null != this.hitAreaAdditions)
                    for (var a = 0; a < this.hitAreaAdditions.length; a++)
                        if (this.hitAreaAdditions[a] == b || this.hitAreaAdditions[a] instanceof c.DisplayObjectContainer && this.hitAreaAdditions[a].contains(b)) return !0;
                if (this.dropDown instanceof c.DisplayObjectContainer) {
                    if (this.dropDown.contains(b)) return !0
                } else if (b == this.dropDown) return !0
            }
            return !1
        };
        a.prototype.openDropDown =
            function() {
                this.openDropDownHelper()
            };
        a.prototype.openDropDownHelper = function() {
            this.isOpen || (this.addCloseTriggers(), this._isOpen = !0, this.openButton && this.openButton._setKeepDown(!0), c.UIEvent.dispatchUIEvent(this, c.UIEvent.OPEN))
        };
        a.prototype.closeDropDown = function(b) {
            if (this.isOpen) {
                this._isOpen = !1;
                this.openButton && this.openButton._setKeepDown(!1);
                var a = new c.UIEvent(c.UIEvent.CLOSE, !1, !0);
                b || a.preventDefault();
                this.dispatchEvent(a);
                this.removeCloseTriggers()
            }
        };
        a.prototype._openButton_buttonDownHandler =
            function(b) {
                this.isOpen ? this.closeDropDown(!0) : (this.mouseIsDown = !0, this.openDropDownHelper())
            };
        a.prototype._openButton_rollOverHandler = function(b) {
            0 == this.rollOverOpenDelay ? this.openDropDownHelper() : (this.openButton.addEventListener(c.TouchEvent.TOUCH_ROLL_OUT, this.openButton_rollOutHandler, this), this.rollOverOpenDelayTimer = new c.Timer(this.rollOverOpenDelay, 1), this.rollOverOpenDelayTimer.addEventListener(c.TimerEvent.TIMER_COMPLETE, this.rollOverDelay_timerCompleteHandler, this), this.rollOverOpenDelayTimer.start())
        };
        a.prototype.openButton_rollOutHandler = function(b) {
            this.rollOverOpenDelayTimer && this.rollOverOpenDelayTimer.running && (this.rollOverOpenDelayTimer.stop(), this.rollOverOpenDelayTimer = null);
            this.openButton.removeEventListener(c.TouchEvent.TOUCH_ROLL_OUT, this.openButton_rollOutHandler, this)
        };
        a.prototype.rollOverDelay_timerCompleteHandler = function(b) {
            this.openButton.removeEventListener(c.TouchEvent.TOUCH_ROLL_OUT, this.openButton_rollOutHandler, this);
            this.rollOverOpenDelayTimer = null;
            this.openDropDownHelper()
        };
        a.prototype.stage_mouseDownHandler = function(b) {
            if (this.mouseIsDown) this.mouseIsDown = !1;
            else if (!this.dropDown || this.dropDown && (b.target == this.dropDown || this.dropDown instanceof c.DisplayObjectContainer && !this.dropDown.contains(b.target))) {
                var a = b.target;
                if (!(this.openButton && a && this.openButton.contains(a))) {
                    if (null != this.hitAreaAdditions)
                        for (a = 0; a < this.hitAreaAdditions.length; a++)
                            if (this.hitAreaAdditions[a] == b.target || this.hitAreaAdditions[a] instanceof c.DisplayObjectContainer && this.hitAreaAdditions[a].contains(b.target)) return;
                    this.closeDropDown(!0)
                }
            }
        };
        a.prototype.stage_mouseMoveHandler = function(b) {
            this.isTargetOverDropDownOrOpenButton(b.target) || (b instanceof c.TouchEvent && b.touchDown ? (c.UIGlobals.stage.addEventListener(c.TouchEvent.TOUCH_END, this.stage_mouseUpHandler, this), c.UIGlobals.stage.addEventListener(c.Event.LEAVE_STAGE, this.stage_mouseUpHandler, this)) : this.closeDropDown(!0))
        };
        a.prototype.stage_mouseUpHandler_noRollOverOpenDelay = function(b) {
            this.mouseIsDown && (this.mouseIsDown = !1)
        };
        a.prototype.stage_mouseUpHandler =
            function(b) {
                this.isTargetOverDropDownOrOpenButton(b.target) ? (c.UIGlobals.stage.removeEventListener(c.TouchEvent.TOUCH_END, this.stage_mouseUpHandler, this), c.UIGlobals.stage.removeEventListener(c.Event.LEAVE_STAGE, this.stage_mouseUpHandler, this)) : this.closeDropDown(!0)
            };
        a.prototype.stage_resizeHandler = function(b) {
            this.closeDropDown(!0)
        };
        a.prototype.stage_mouseWheelHandler = function(b) {
            !this.dropDown || this.dropDown.contains(b.target) && b.isDefaultPrevented() || this.closeDropDown(!1)
        };
        return a
    }(c.EventDispatcher);
    c.DropDownController = e
})(egret || (egret = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(d) {
        function a() {
            d.call(this);
            this._labelChanged = !1;
            this._userProposedSelectedIndex = c.ListBase.NO_SELECTION;
            this._captureItemRenderer = !1;
            this.dropDownController = new c.DropDownController
        }
        __extends(a, d);
        a.prototype._setDataProvider = function(b) {
            this.dataProvider !== b && (d.prototype._setDataProvider.call(this, b), this._labelChanged = !0, this.invalidateProperties())
        };
        a.prototype._setLabelField = function(b) {
            this.labelField != b && (d.prototype._setLabelField.call(this, b), this._labelChanged = !0, this.invalidateProperties())
        };
        a.prototype._setLabelFunction = function(b) {
            this.labelFunction != b && (d.prototype._setLabelFunction.call(this, b), this._labelChanged = !0, this.invalidateProperties())
        };
        Object.defineProperty(a.prototype, "dropDownController", {
            get: function() {
                return this._dropDownController
            },
            set: function(b) {
                this._dropDownController != b && (this._dropDownController = b, this._dropDownController.addEventListener(c.UIEvent.OPEN, this._dropDownController_openHandler, this), this._dropDownController.addEventListener(c.UIEvent.CLOSE,
                    this.dropDownController_closeHandler, this), this.openButton && (this._dropDownController.openButton = this.openButton), this.dropDown && (this._dropDownController.dropDown = this.dropDown))
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "isDropDownOpen", {
            get: function() {
                return this.dropDownController ? this.dropDownController.isOpen : !1
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype.commitProperties = function() {
            d.prototype.commitProperties.call(this);
            this._labelChanged && (this._labelChanged = !1,
                this.updateLabelDisplay())
        };
        a.prototype.partAdded = function(b, a) {
            d.prototype.partAdded.call(this, b, a);
            a == this.openButton ? this.dropDownController && (this.dropDownController.openButton = this.openButton) : a == this.dropDown && this.dropDownController && (this.dropDownController.dropDown = this.dropDown)
        };
        a.prototype.partRemoved = function(b, a) {
            this.dropDownController && (a == this.openButton && (this.dropDownController.openButton = null), a == this.dropDown && (this.dropDownController.dropDown = null));
            d.prototype.partRemoved.call(this,
                b, a)
        };
        a.prototype.getCurrentSkinState = function() {
            return this.enabled ? this.isDropDownOpen ? "open" : "normal" : "disabled"
        };
        a.prototype.commitSelection = function(b) {
            "undefined" === typeof b && (b = !0);
            b = d.prototype.commitSelection.call(this, b);
            this.updateLabelDisplay();
            return b
        };
        a.prototype._isItemIndexSelected = function(b) {
            return this._userProposedSelectedIndex == b
        };
        a.prototype.openDropDown = function() {
            this.dropDownController.openDropDown()
        };
        a.prototype.closeDropDown = function(b) {
            this.dropDownController.closeDropDown(b)
        };
        a.prototype.updateLabelDisplay = function(b) {};
        a.prototype._changeHighlightedSelection = function(b, a) {
            this.itemSelected(this._userProposedSelectedIndex, !1);
            this._userProposedSelectedIndex = b;
            this.itemSelected(this._userProposedSelectedIndex, !0)
        };
        a.prototype.dataProvider_collectionChangeHandler = function(b) {
            d.prototype.dataProvider_collectionChangeHandler.call(this, b);
            this._labelChanged = !0;
            this.invalidateProperties()
        };
        a.prototype.item_mouseDownHandler = function(b) {
            d.prototype.item_mouseDownHandler.call(this,
                b);
            this._dispatchListEvent(b, c.ListEvent.ITEM_CLICK, b.currentTarget);
            this._userProposedSelectedIndex = this.selectedIndex;
            this.closeDropDown(!0)
        };
        a.prototype._dropDownController_openHandler = function(b) {
            this.addEventListener(c.UIEvent.UPDATE_COMPLETE, this._open_updateCompleteHandler, this);
            this._userProposedSelectedIndex = this.selectedIndex;
            this.invalidateSkinState()
        };
        a.prototype._open_updateCompleteHandler = function(b) {
            this.removeEventListener(c.UIEvent.UPDATE_COMPLETE, this._open_updateCompleteHandler,
                this);
            c.UIEvent.dispatchUIEvent(this, c.UIEvent.OPEN)
        };
        a.prototype.dropDownController_closeHandler = function(b) {
            this.addEventListener(c.UIEvent.UPDATE_COMPLETE, this.close_updateCompleteHandler, this);
            this.invalidateSkinState();
            b.isDefaultPrevented() ? this._changeHighlightedSelection(this.selectedIndex) : this._setSelectedIndex(this._userProposedSelectedIndex, !0)
        };
        a.prototype.close_updateCompleteHandler = function(b) {
            this.removeEventListener(c.UIEvent.UPDATE_COMPLETE, this.close_updateCompleteHandler, this);
            c.UIEvent.dispatchUIEvent(this, c.UIEvent.CLOSE)
        };
        a.PAGE_SIZE = 5;
        return a
    }(c.List);
    c.DropDownListBase = e
})(egret || (egret = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(d) {
        function a() {
            d.call(this);
            this.iconFieldOrFunctionChanged = !1;
            this.hostComponentKey = "egret.Tree"
        }
        __extends(a, d);
        a.prototype.createChildren = function() {
            this.itemRenderer || (this.itemRenderer = a.defaultTreeRendererFactory);
            d.prototype.createChildren.call(this)
        };
        a.prototype.updateRenderer = function(b, a, c) {
            if ("hasChildren" in b && "hasChildren" in this.dataProvider) {
                var e = this.dataProvider;
                b.hasChildren = e.hasChildren(c);
                b.opened = e.isItemOpen(c);
                b.depth = e.getDepth(c);
                b.iconSkinName =
                    this.itemToIcon(c)
            }
            return d.prototype.updateRenderer.call(this, b, a, c)
        };
        a.prototype.itemToIcon = function(b) {
            if (!b) return null;
            if (null != this._iconFunction) return this._iconFunction(b);
            var a;
            if (b instanceof Object) try {
                b[this.iconField] && (a = b[this.iconField])
            } catch (c) {}
            return a
        };
        a.prototype.dataGroup_rendererAddHandler = function(b) {
            d.prototype.dataGroup_rendererAddHandler.call(this, b);
            b.renderer && "hasChildren" in b.renderer && b.renderer.addEventListener(c.TreeEvent.ITEM_OPENING, this.onItemOpening, this)
        };
        a.prototype.onItemOpening = function(b) {
            var a = b.itemRenderer,
                d = b.item,
                e = this._getDataProvider();
            a && e && "hasChildren" in e && this.dispatchEvent(b) && (b = !a.opened, e.expandItem(d, b), c.TreeEvent.dispatchTreeEvent(this, b ? c.TreeEvent.ITEM_OPEN : c.TreeEvent.ITEM_CLOSE, a.itemIndex, d, a))
        };
        a.prototype.dataGroup_rendererRemoveHandler = function(b) {
            d.prototype.dataGroup_rendererRemoveHandler.call(this, b);
            b.renderer && "hasChildren" in b.renderer && b.renderer.removeEventListener(c.TreeEvent.ITEM_OPENING, this.onItemOpening,
                this)
        };
        Object.defineProperty(a.prototype, "iconField", {
            get: function() {
                return this._iconField
            },
            set: function(b) {
                this._iconField != b && (this._iconField = b, this.iconFieldOrFunctionChanged = !0, this.invalidateProperties())
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "iconFunction", {
            get: function() {
                return this._iconFunction
            },
            set: function(b) {
                this._iconFunction != b && (this._iconFunction = b, this.iconFieldOrFunctionChanged = !0, this.invalidateProperties())
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype.expandItem =
            function(b, a) {
                "undefined" === typeof a && (a = !0);
                var c = this._getDataProvider();
                c && "hasChildren" in c && c.expandItem(b, a)
            };
        a.prototype.isItemOpen = function(b) {
            var a = this._getDataProvider();
            return a && "hasChildren" in a ? a.isItemOpen(b) : !1
        };
        a.prototype.dataProvider_collectionChangeHandler = function(b) {
            d.prototype.dataProvider_collectionChangeHandler.call(this, b);
            if (b.kind == c.CollectionEventKind.OPEN || b.kind == c.CollectionEventKind.CLOSE) {
                var a = this.dataGroup ? this.dataGroup.getElementAt(b.location) : null;
                a && (this.updateRenderer(a,
                    b.location, b.items[0]), b.kind == c.CollectionEventKind.CLOSE && this.layout && this.layout.useVirtualLayout && (this.layout.clearVirtualLayoutCache(), this.invalidateSize()))
            }
        };
        a.prototype.commitProperties = function() {
            d.prototype.commitProperties.call(this);
            if (this.iconFieldOrFunctionChanged) {
                if (null != this.dataGroup) {
                    var b;
                    if (this.layout && this.layout.useVirtualLayout)
                        for (var a = this.dataGroup.getElementIndicesInView(), c = a.length, e = 0; e < c; e++) b = a[e], this.updateRendererIconProperty(b);
                    else
                        for (a = this.dataGroup.numElements,
                            b = 0; b < a; b++) this.updateRendererIconProperty(b)
                }
                this.iconFieldOrFunctionChanged = !1
            }
        };
        a.prototype.updateRendererIconProperty = function(b) {
            if (b = this.dataGroup.getElementAt(b)) b.iconSkinName = this.itemToIcon(b.data)
        };
        a.defaultTreeRendererFactory = new c.ClassFactory(c.TreeItemRenderer);
        return a
    }(c.List);
    c.Tree = e
})(egret || (egret = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(c) {
        function a() {
            c.call(this);
            this._prompt = "";
            this.hostComponentKey = "egret.DropDownList"
        }
        __extends(a, c);
        Object.defineProperty(a.prototype, "prompt", {
            get: function() {
                return this._prompt
            },
            set: function(b) {
                this._prompt != b && (this._prompt = b, this._labelChanged = !0, this.invalidateProperties())
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype.partAdded = function(b, a) {
            c.prototype.partAdded.call(this, b, a);
            a == this.labelDisplay && (this._labelChanged = !0, this.invalidateProperties())
        };
        a.prototype.updateLabelDisplay =
            function(b) {
                "undefined" === typeof b && (b = void 0);
                this.labelDisplay && (void 0 == b && (b = this.selectedItem), this.labelDisplay.text = null != b && void 0 != b ? this.itemToLabel(b) : this._prompt)
            };
        return a
    }(c.DropDownListBase);
    c.DropDownList = e
})(egret || (egret = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(c) {
        function a() {
            c.call(this);
            this._allowDeselection = !0;
            this.hostComponentKey = "egret.TabBarButton"
        }
        __extends(a, c);
        Object.defineProperty(a.prototype, "allowDeselection", {
            get: function() {
                return this._allowDeselection
            },
            set: function(b) {
                this._allowDeselection = b
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "data", {
            get: function() {
                return this._data
            },
            set: function(b) {
                this._data = b;
                this.dispatchEventWith("dataChange")
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype,
            "itemIndex", {
                get: function() {
                    return this._itemIndex
                },
                set: function(b) {
                    this._itemIndex = b
                },
                enumerable: !0,
                configurable: !0
            });
        a.prototype._setLabel = function(b) {
            b != this._getLabel() && (c.prototype._setLabel.call(this, b), this.labelDisplay && (this.labelDisplay.text = this._getLabel()))
        };
        a.prototype.buttonReleased = function() {
            this.selected && !this.allowDeselection || c.prototype.buttonReleased.call(this)
        };
        return a
    }(c.ToggleButtonBase);
    c.TabBarButton = e
})(egret || (egret = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(d) {
        function a() {
            d.call(this);
            this.hostComponentKey = "egret.TabBar";
            this.requireSelection = !0
        }
        __extends(a, d);
        a.prototype.c = function(b) {
            b != this._requireSelection && (d.prototype._setRequireSelection.call(this, b), this.requireSelectionChanged_tabBar = !0, this.invalidateProperties())
        };
        a.prototype._setDataProvider = function(b) {
            this.dataProvider instanceof c.ViewStack && (this.dataProvider.removeEventListener("IndexChanged", this.onViewStackIndexChange, this), this.removeEventListener(c.IndexChangeEvent.CHANGE,
                this.onIndexChanged, this));
            b instanceof c.ViewStack && (b.addEventListener("IndexChanged", this.onViewStackIndexChange, this), this.addEventListener(c.IndexChangeEvent.CHANGE, this.onIndexChanged, this));
            d.prototype._setDataProvider.call(this, b)
        };
        a.prototype.onIndexChanged = function(b) {
            this.dataProvider._setSelectedIndex(b.newIndex, !1)
        };
        a.prototype.onViewStackIndexChange = function(b) {
            this._setSelectedIndex(this.dataProvider.selectedIndex, !1)
        };
        a.prototype.commitProperties = function() {
            d.prototype.commitProperties.call(this);
            if (this.requireSelectionChanged_tabBar && this.dataGroup) {
                this.requireSelectionChanged_tabBar = !1;
                for (var b = this.dataGroup.numElements, a = 0; a < b; a++) {
                    var c = this.dataGroup.getElementAt(a);
                    c && (c.allowDeselection = !this.requireSelection)
                }
            }
        };
        a.prototype.dataGroup_rendererAddHandler = function(b) {
            d.prototype.dataGroup_rendererAddHandler.call(this, b);
            if (b = b.renderer) b.addEventListener(c.TouchEvent.TOUCH_TAP, this.item_clickHandler, this), b instanceof c.TabBarButton && (b.allowDeselection = !this.requireSelection)
        };
        a.prototype.dataGroup_rendererRemoveHandler =
            function(b) {
                d.prototype.dataGroup_rendererRemoveHandler.call(this, b);
                (b = b.renderer) && b.removeEventListener(c.TouchEvent.TOUCH_TAP, this.item_clickHandler, this)
            };
        a.prototype.item_clickHandler = function(b) {
            var a = b.currentTarget,
                d;
            d = a ? a.itemIndex : this.dataGroup.getElementIndex(b.currentTarget);
            d == this.selectedIndex ? this.requireSelection || this._setSelectedIndex(c.ListBase.NO_SELECTION, !0) : this._setSelectedIndex(d, !0);
            this._dispatchListEvent(b, c.ListEvent.ITEM_CLICK, a)
        };
        return a
    }(c.ListBase);
    c.TabBar = e
})(egret ||
    (egret = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(d) {
        function a() {
            d.call(this);
            this._horizontalScrollPolicy = this._verticalScrollPolicy = "auto";
            this.ignoreTouchBegin = !1;
            this._velocityY = this._velocityX = 0;
            this._previousVelocityX = [];
            this._previousVelocityY = []
        }
        __extends(a, d);
        a.prototype.measure = function() {
            this._viewport && (this.measuredWidth = this._viewport.preferredWidth, this.measuredHeight = this._viewport.preferredHeight)
        };
        a.prototype.updateDisplayList = function(b, a) {
            this._viewport.setLayoutBoundsSize(b, a)
        };
        Object.defineProperty(a.prototype,
            "verticalScrollPolicy", {
                get: function() {
                    return this._verticalScrollPolicy
                },
                set: function(b) {
                    this._verticalScrollPolicy = b
                },
                enumerable: !0,
                configurable: !0
            });
        Object.defineProperty(a.prototype, "horizontalScrollPolicy", {
            get: function() {
                return this._horizontalScrollPolicy
            },
            set: function(b) {
                this._horizontalScrollPolicy = b
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "viewport", {
            get: function() {
                return this._viewport
            },
            set: function(b) {
                b != this._viewport && (this.uninstallViewport(), this._viewport =
                    b, this.installViewport(), this.dispatchEventWith("viewportChanged"))
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype.installViewport = function() {
            this.viewport && (this.viewport.clipAndEnableScrolling = !0, this.viewport.addEventListener(c.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this), this.viewport.addEventListener(c.TouchEvent.TOUCH_BEGIN, this.onTouchBeginCapture, this, !0), this.viewport.addEventListener(c.TouchEvent.TOUCH_END, this.onTouchEndCapture, this, !0), this._addToDisplayListAt(this.viewport, 0))
        };
        a.prototype.uninstallViewport =
            function() {
                this.viewport && (this.viewport.clipAndEnableScrolling = !1, this.viewport.removeEventListener(c.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this), this.viewport.removeEventListener(c.TouchEvent.TOUCH_BEGIN, this.onTouchBeginCapture, this, !0), this.viewport.removeEventListener(c.TouchEvent.TOUCH_END, this.onTouchEndCapture, this, !0), this._removeFromDisplayList(this.viewport))
            };
        a.prototype.onTouchEndCapture = function(b) {
            this.delayTouchBeginEvent && (b.stopPropagation(), this.delayTouchEndEvent = this.cloneTouchEvent(b),
                this.onTouchBeginTimer(), this.touchEndTimer || (this.touchEndTimer = new c.Timer(100, 1), this.touchEndTimer.addEventListener(c.TimerEvent.TIMER_COMPLETE, this.onTouchEndTimer, this)), this.touchEndTimer.start())
        };
        a.prototype.onTouchEndTimer = function(b) {
            this.touchEndTimer.stop();
            b = this.delayTouchEndEvent;
            this.delayTouchEndEvent = null;
            this.dispatchPropagationEvent(b)
        };
        a.prototype.dispatchPropagationEvent = function(b) {
            for (var a = [], c = b._target; c;) a.push(c), c = c.parent;
            for (var d = this._viewport, e = 1;; e += 2) {
                c = a[e];
                if (!c || c === d) break;
                a.unshift(c)
            }
            c = a.indexOf(b._target);
            this._dispatchPropagationEvent(b, a, c)
        };
        a.prototype.onTouchBeginCapture = function(b) {
            var d = this.checkScrollPolicy();
            if (d) {
                for (var e = b.target; e != this;) {
                    if (e instanceof a && (d = e.checkScrollPolicy())) return;
                    e = e.parent
                }
                this.delayTouchEndEvent && (this.delayTouchEndEvent = null, this.touchEndTimer.stop());
                b.stopPropagation();
                this.delayTouchBeginEvent = this.cloneTouchEvent(b);
                this.touchBeginTimer || (this.touchBeginTimer = new c.Timer(100, 1), this.touchBeginTimer.addEventListener(c.TimerEvent.TIMER_COMPLETE,
                    this.onTouchBeginTimer, this));
                this.touchBeginTimer.start();
                this.onTouchBegin(b)
            }
        };
        a.prototype.cloneTouchEvent = function(b) {
            var a = new c.TouchEvent(b._type, b._bubbles, b.cancelable);
            a.touchPointID = b.touchPointID;
            a._stageX = b._stageX;
            a._stageY = b._stageY;
            a.ctrlKey = b.ctrlKey;
            a.altKey = b.altKey;
            a.shiftKey = b.shiftKey;
            a.touchDown = b.touchDown;
            a._isDefaultPrevented = !1;
            a._target = b._target;
            return a
        };
        a.prototype.onTouchBeginTimer = function(b) {
            this.touchBeginTimer.stop();
            b = this.delayTouchBeginEvent;
            this.delayTouchBeginEvent =
                null;
            this.dispatchPropagationEvent(b)
        };
        a.prototype.checkScrollPolicy = function() {
            var b = this._viewport,
                a;
            switch (this._horizontalScrollPolicy) {
                case "auto":
                    a = b.contentWidth > b.width ? !0 : !1;
                    break;
                case "on":
                    a = !0;
                    break;
                case "off":
                    a = !1
            }
            this._horizontalCanScroll = a;
            var c;
            switch (this._verticalScrollPolicy) {
                case "auto":
                    c = b.contentHeight > b.height ? !0 : !1;
                    break;
                case "on":
                    c = !0;
                    break;
                case "off":
                    c = !1
            }
            this._verticalCanScroll = c;
            return a || c
        };
        a.prototype.onTouchBegin = function(b) {
            if (!b.isDefaultPrevented() && this.checkScrollPolicy()) {
                this.verticalAnimator &&
                    this.verticalAnimator.isPlaying && this.verticalAnimator.stop();
                this.horizontalAnimator && this.horizontalAnimator.isPlaying && this.horizontalAnimator.stop();
                var a = this._viewport,
                    d = a.horizontalScrollPosition,
                    a = a.verticalScrollPosition;
                this._offsetPointX = d + b.stageX;
                this._offsetPointY = a + b.stageY;
                this._velocityY = this._velocityX = 0;
                this._previousVelocityX.length = 0;
                this._previousVelocityY.length = 0;
                this._previousTouchTime = c.getTimer();
                this._previousTouchX = this._startTouchX = this._currentTouchX = b.stageX;
                this._previousTouchY =
                    this._startTouchY = this._currentTouchY = b.stageY;
                this._startHorizontalScrollPosition = d;
                this._startVerticalScrollPosition = a;
                c.UIGlobals.stage.addEventListener(c.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
                c.UIGlobals.stage.addEventListener(c.TouchEvent.TOUCH_END, this.onTouchEnd, this);
                c.UIGlobals.stage.addEventListener(c.Event.LEAVE_STAGE, this.onTouchEnd, this);
                this.addEventListener(c.Event.ENTER_FRAME, this.enterFrameHandler, this);
                b.preventDefault()
            }
        };
        a.prototype.onTouchMove = function(b) {
            this._currentTouchX =
                b.stageX;
            this._currentTouchY = b.stageY;
            this.delayTouchBeginEvent && (this.delayTouchBeginEvent = null, this.touchBeginTimer.stop());
            var a = this._viewport;
            if (this._horizontalCanScroll) {
                var c = this._offsetPointX - b.stageX;
                0 > c && (c *= 0.5);
                c > a.contentWidth - a.width && (c = 0.5 * (c + a.contentWidth - a.width));
                a.horizontalScrollPosition = c
            }
            this._verticalCanScroll && (b = this._offsetPointY - b.stageY, 0 > b && (b *= 0.5), b > a.contentHeight - a.height && (b = 0.5 * (b + a.contentHeight - a.height)), a.verticalScrollPosition = b)
        };
        a.prototype.onTouchEnd =
            function(a) {
                c.UIGlobals.stage.removeEventListener(c.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
                c.UIGlobals.stage.removeEventListener(c.TouchEvent.TOUCH_END, this.onTouchEnd, this);
                c.UIGlobals.stage.removeEventListener(c.Event.LEAVE_STAGE, this.onTouchEnd, this);
                this.removeEventListener(c.Event.ENTER_FRAME, this.enterFrameHandler, this);
                this._horizontalCanScroll && this.checkHorizontalScrollPosition();
                this._verticalCanScroll && this.checkVerticalScrollPosition()
            };
        a.easeOut = function(a) {
            a -= 1;
            return a * a * a + 1
        };
        a.prototype.enterFrameHandler = function(a) {
            a = c.getTimer();
            var d = a - this._previousTouchTime;
            0 < d && (this._previousVelocityX[this._previousVelocityX.length] = this._velocityX, 4 < this._previousVelocityX.length && this._previousVelocityX.shift(), this._previousVelocityY[this._previousVelocityY.length] = this._velocityY, 4 < this._previousVelocityY.length && this._previousVelocityY.shift(), this._velocityX = (this._currentTouchX - this._previousTouchX) / d, this._velocityY = (this._currentTouchY - this._previousTouchY) / d, this._previousTouchTime =
                a, this._previousTouchX = this._currentTouchX, this._previousTouchY = this._currentTouchY);
            a = Math.abs(this._currentTouchX - this._startTouchX);
            d = Math.abs(this._currentTouchY - this._startTouchY);
            this._horizontalCanScroll && 0.04 <= a && (this._startTouchX = this._currentTouchX, this._startHorizontalScrollPosition = this._viewport.horizontalScrollPosition);
            this._verticalCanScroll && 0.04 <= d && (this._startTouchY = this._currentTouchY, this._startVerticalScrollPosition = this._viewport.verticalScrollPosition)
        };
        a.prototype.checkHorizontalScrollPosition =
            function() {
                for (var b = this._viewport, c = b.horizontalScrollPosition, b = b.contentWidth - b.width, b = Math.max(0, b), d = 2.33 * this._velocityX, e = this._previousVelocityX.length, f = 2.33, g = 0; g < e; g++) var k = a.VELOCITY_WEIGHTS[g],
                    d = d + this._previousVelocityX.shift() * k,
                    f = f + k;
                d /= f;
                0.02 >= Math.abs(d) ? this.finishScrollingHorizontally() : (c = this.getAnimationDatas(d, c, b), this.throwHorizontally(c[0], c[1]))
            };
        a.prototype.checkVerticalScrollPosition = function() {
            for (var b = this._viewport, c = b.verticalScrollPosition, b = b.contentHeight -
                b.height, d = 2.33 * this._velocityY, e = this._previousVelocityY.length, f = 2.33, g = 0; g < e; g++) var k = a.VELOCITY_WEIGHTS[g],
                d = d + this._previousVelocityY.shift() * k,
                f = f + k;
            d /= f;
            0.02 >= Math.abs(d) ? this.finishScrollingVertically() : (c = this.getAnimationDatas(d, c, b), this.throwVertically(c[0], c[1]))
        };
        a.prototype.getAnimationDatas = function(b, c, d) {
            var e = Math.abs(b),
                f = 0,
                g = c + (b - 0.02) / Math.log(0.998);
            if (0 > g || g > d)
                for (g = c; 0.02 < Math.abs(b);) g -= b, b = 0 > g || g > d ? 0.998 * b * 0.95 : 0.998 * b, f++;
            else f = Math.log(0.02 / e) / Math.log(0.998);
            a.animationData ||
                (a.animationData = [0, 0]);
            b = a.animationData;
            b[0] = g;
            b[1] = f;
            return b
        };
        a.prototype.finishScrollingHorizontally = function(a) {
            var c = this._viewport;
            a = c.horizontalScrollPosition;
            var c = c.contentWidth - c.width,
                d = a;
            0 > a && (d = 0);
            a > c && (d = c);
            this.throwHorizontally(d, 300)
        };
        a.prototype.throwHorizontally = function(b, d) {
            "undefined" === typeof d && (d = 500);
            var e = this._viewport.horizontalScrollPosition;
            e != b && (this.horizontalAnimator || (this.horizontalAnimator = new c.Animation(this.horizontalUpdateHandler, this), this.horizontalAnimator.endFunction =
                this.finishScrollingHorizontally, this.horizontalAnimator.easerFunction = a.easeOut), this.horizontalAnimator.isPlaying && this.horizontalAnimator.stop(), this.horizontalAnimator.duration = d, this.horizontalAnimator.motionPaths = [{
                prop: "hsp",
                from: e,
                to: b
            }], this.horizontalAnimator.play())
        };
        a.prototype.horizontalUpdateHandler = function(a) {
            this._viewport.horizontalScrollPosition = a.currentValue.hsp
        };
        a.prototype.finishScrollingVertically = function(a) {
            var c = this._viewport;
            a = c.verticalScrollPosition;
            var c = c.contentHeight -
                c.height,
                c = Math.max(0, c),
                d = a;
            0 > a && (d = 0);
            a > c && (d = c);
            this.throwVertically(d, 300)
        };
        a.prototype.throwVertically = function(b, d) {
            "undefined" === typeof d && (d = 500);
            var e = this._viewport.verticalScrollPosition;
            e != b && (this.verticalAnimator || (this.verticalAnimator = new c.Animation(this.verticalUpdateHandler, this), this.verticalAnimator.endFunction = this.finishScrollingVertically, this.verticalAnimator.easerFunction = a.easeOut), this.verticalAnimator.isPlaying && this.verticalAnimator.stop(), this.verticalAnimator.duration =
                d, this.verticalAnimator.motionPaths = [{
                    prop: "vsp",
                    from: e,
                    to: b
                }], this.verticalAnimator.play())
        };
        a.prototype.verticalUpdateHandler = function(a) {
            this._viewport.verticalScrollPosition = a.currentValue.vsp
        };
        Object.defineProperty(a.prototype, "numElements", {
            get: function() {
                return this.viewport ? 1 : 0
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype.throwRangeError = function(a) {
            throw new RangeError('\u7d22\u5f15:"' + a + '"\u8d85\u51fa\u53ef\u89c6\u5143\u7d20\u7d22\u5f15\u8303\u56f4');
        };
        a.prototype.getElementAt = function(a) {
            if (this.viewport &&
                0 == a) return this.viewport;
            this.throwRangeError(a);
            return null
        };
        a.prototype.getElementIndex = function(a) {
            return null != a && a == this.viewport ? 0 : -1
        };
        a.prototype.containsElement = function(a) {
            return null != a && a == this.viewport ? !0 : !1
        };
        a.prototype.throwNotSupportedError = function() {
            throw Error("\u6b64\u65b9\u6cd5\u5728Scroller\u7ec4\u4ef6\u5185\u4e0d\u53ef\u7528!");
        };
        a.prototype.addElement = function(a) {
            this.throwNotSupportedError();
            return null
        };
        a.prototype.addElementAt = function(a, c) {
            this.throwNotSupportedError();
            return null
        };
        a.prototype.removeElement = function(a) {
            this.throwNotSupportedError();
            return null
        };
        a.prototype.removeElementAt = function(a) {
            this.throwNotSupportedError();
            return null
        };
        a.prototype.removeAllElements = function() {
            this.throwNotSupportedError()
        };
        a.prototype.setElementIndex = function(a, c) {
            this.throwNotSupportedError()
        };
        a.prototype.swapElements = function(a, c) {
            this.throwNotSupportedError()
        };
        a.prototype.swapElementsAt = function(a, c) {
            this.throwNotSupportedError()
        };
        a.prototype.addChild = function(a) {
            this.throwNotSupportedError();
            return null
        };
        a.prototype.addChildAt = function(a, c) {
            this.throwNotSupportedError();
            return null
        };
        a.prototype.removeChild = function(a) {
            this.throwNotSupportedError();
            return null
        };
        a.prototype.removeChildAt = function(a) {
            this.throwNotSupportedError();
            return null
        };
        a.prototype.setChildIndex = function(a, c) {
            this.throwNotSupportedError()
        };
        a.prototype.swapChildren = function(a, c) {
            this.throwNotSupportedError()
        };
        a.prototype.swapChildrenAt = function(a, c) {
            this.throwNotSupportedError()
        };
        a.VELOCITY_WEIGHTS = [1, 1.33, 1.66, 2];
        return a
    }(c.UIComponent);
    c.Scroller = e
})(egret || (egret = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(d) {
        function a(a, c, e) {
            "undefined" === typeof c && (c = !1);
            "undefined" === typeof e && (e = !1);
            d.call(this, a, c, e)
        }
        __extends(a, d);
        a.dispatchUIEvent = function(b, d) {
            c.Event._dispatchByTarget(a, b, d)
        };
        a.INITIALIZE = "initialize";
        a.CREATION_COMPLETE = "creationComplete";
        a.UPDATE_COMPLETE = "updateComplete";
        a.BUTTON_DOWN = "buttonDown";
        a.CHANGE_END = "changeEnd";
        a.CHANGE_START = "changeStart";
        a.CHANGING = "changing";
        a.VALUE_COMMIT = "valueCommit";
        a.SKIN_CHANGED = "skinChanged";
        a.CONTENT_CHANGED = "contentChanged";
        a.OPEN = "open";
        a.CLOSE = "close";
        a.PLAY_COMPLETE = "playComplete";
        return a
    }(c.Event);
    c.UIEvent = e
})(egret || (egret = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(d) {
        function a(a, c, e, m, f, g, k, n) {
            "undefined" === typeof c && (c = !1);
            "undefined" === typeof e && (e = !1);
            "undefined" === typeof m && (m = null);
            "undefined" === typeof f && (f = null);
            "undefined" === typeof g && (g = null);
            "undefined" === typeof k && (k = null);
            "undefined" === typeof n && (n = null);
            d.call(this, a, c, e);
            this.kind = m;
            this.property = f;
            this.oldValue = g;
            this.newValue = k;
            this.source = n
        }
        __extends(a, d);
        a.dispatchPropertyChangeEvent = function(b, d, e, m, f, g) {
            "undefined" === typeof d && (d = null);
            "undefined" === typeof e &&
                (e = null);
            "undefined" === typeof m && (m = null);
            "undefined" === typeof f && (f = null);
            "undefined" === typeof g && (g = null);
            var k = c.Event._getPropertyData(a);
            k.kind = d;
            k.property = e;
            k.oldValue = m;
            k.newValue = f;
            k.source = g;
            c.Event._dispatchByTarget(a, b, a.PROPERTY_CHANGE, k)
        };
        a.PROPERTY_CHANGE = "propertyChange";
        return a
    }(c.Event);
    c.PropertyChangeEvent = e
})(egret || (egret = {}));
(function(c) {
    var e = function() {
        function c() {}
        c.UPDATE = "update";
        c.DELETE = "delete";
        return c
    }();
    c.PropertyChangeEventKind = e
})(egret || (egret = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(d) {
        function a(a, c, e, m, f) {
            "undefined" === typeof c && (c = NaN);
            "undefined" === typeof e && (e = NaN);
            "undefined" === typeof m && (m = !1);
            "undefined" === typeof f && (f = !1);
            d.call(this, a, m, f);
            this.oldX = c;
            this.oldY = e
        }
        __extends(a, d);
        a.dispatchMoveEvent = function(b, d, e) {
            "undefined" === typeof d && (d = NaN);
            "undefined" === typeof e && (e = NaN);
            var m = c.Event._getPropertyData(a);
            m.oldX = d;
            m.oldY = e;
            c.Event._dispatchByTarget(a, b, a.MOVE, m)
        };
        a.MOVE = "move";
        return a
    }(c.Event);
    c.MoveEvent = e
})(egret || (egret = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(d) {
        function a(a, c, e, m, f) {
            "undefined" === typeof c && (c = NaN);
            "undefined" === typeof e && (e = NaN);
            "undefined" === typeof m && (m = !1);
            "undefined" === typeof f && (f = !1);
            d.call(this, a, m, f);
            this.oldWidth = c;
            this.oldHeight = e
        }
        __extends(a, d);
        a.dispatchResizeEvent = function(b, d, e) {
            "undefined" === typeof d && (d = NaN);
            "undefined" === typeof e && (e = NaN);
            var m = c.Event._getPropertyData(a);
            m.oldWidth = d;
            m.oldHeight = e;
            c.Event._dispatchByTarget(a, b, a.RESIZE, m)
        };
        a.RESIZE = "resize";
        return a
    }(c.Event);
    c.ResizeEvent =
        e
})(egret || (egret = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(d) {
        function a(a, c, e, m, f) {
            "undefined" === typeof c && (c = !1);
            "undefined" === typeof e && (e = !1);
            "undefined" === typeof m && (m = null);
            "undefined" === typeof f && (f = null);
            d.call(this, a, c, e);
            this.partName = m;
            this.instance = f
        }
        __extends(a, d);
        a.dispatchSkinPartEvent = function(b, d, e, m) {
            "undefined" === typeof e && (e = null);
            "undefined" === typeof m && (m = null);
            var f = c.Event._getPropertyData(a);
            f.partName = e;
            f.instance = m;
            c.Event._dispatchByTarget(a, b, d, f)
        };
        a.PART_ADDED = "partAdded";
        a.PART_REMOVED = "partRemoved";
        return a
    }(c.Event);
    c.SkinPartEvent = e
})(egret || (egret = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(d) {
        function a(a, c, e, m) {
            "undefined" === typeof c && (c = !1);
            "undefined" === typeof e && (e = !1);
            "undefined" === typeof m && (m = -1);
            d.call(this, a, c, e);
            this.detail = m
        }
        __extends(a, d);
        a.dispatchCloseEvent = function(b, d, e) {
            "undefined" === typeof e && (e = -1);
            var m = c.Event._getPropertyData(a);
            m.detail = e;
            c.Event._dispatchByTarget(a, b, d, m)
        };
        a.CLOSE = "close";
        return a
    }(c.Event);
    c.CloseEvent = e
})(egret || (egret = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(d) {
        function a(a, c, e, m, f, g, k, n) {
            "undefined" === typeof c && (c = !1);
            "undefined" === typeof e && (e = !1);
            "undefined" === typeof m && (m = null);
            "undefined" === typeof f && (f = -1);
            "undefined" === typeof g && (g = -1);
            "undefined" === typeof k && (k = null);
            "undefined" === typeof n && (n = null);
            d.call(this, a, c, e);
            this.kind = m;
            this.location = f;
            this.oldLocation = g;
            this.items = k ? k : [];
            this.oldItems = n ? n : []
        }
        __extends(a, d);
        a.dispatchCollectionEvent = function(b, d, e, m, f, g, k) {
            "undefined" === typeof e && (e = null);
            "undefined" === typeof m &&
                (m = -1);
            "undefined" === typeof f && (f = -1);
            "undefined" === typeof g && (g = null);
            "undefined" === typeof k && (k = null);
            var n = c.Event._getPropertyData(a);
            n.kind = e;
            n.location = m;
            n.oldLocation = f;
            n.items = g;
            n.oldItems = k;
            c.Event._dispatchByTarget(a, b, d, n)
        };
        a.COLLECTION_CHANGE = "collectionChange";
        return a
    }(c.Event);
    c.CollectionEvent = e
})(egret || (egret = {}));
(function(c) {
    var e = function() {
        function c() {}
        c.ADD = "add";
        c.MOVE = "move";
        c.REFRESH = "refresh";
        c.REMOVE = "remove";
        c.REPLACE = "replace";
        c.RESET = "reset";
        c.UPDATE = "update";
        c.OPEN = "open";
        c.CLOSE = "close";
        return c
    }();
    c.CollectionEventKind = e
})(egret || (egret = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(d) {
        function a(a, c, e, m, f) {
            "undefined" === typeof c && (c = !1);
            "undefined" === typeof e && (e = !1);
            "undefined" === typeof m && (m = null);
            "undefined" === typeof f && (f = -1);
            d.call(this, a, c, e);
            this.element = m;
            this.index = f
        }
        __extends(a, d);
        a.dispatchElementExistenceEvent = function(b, d, e, m) {
            "undefined" === typeof e && (e = null);
            "undefined" === typeof m && (m = -1);
            var f = c.Event._getPropertyData(a);
            f.element = e;
            f.index = m;
            c.Event._dispatchByTarget(a, b, d, f)
        };
        a.ELEMENT_ADD = "elementAdd";
        a.ELEMENT_REMOVE = "elementRemove";
        return a
    }(c.Event);
    c.ElementExistenceEvent = e
})(egret || (egret = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(d) {
        function a(a, c, e, m, f) {
            "undefined" === typeof c && (c = !1);
            "undefined" === typeof e && (e = !1);
            "undefined" === typeof m && (m = -1);
            "undefined" === typeof f && (f = -1);
            d.call(this, a, c, e);
            this.oldIndex = m;
            this.newIndex = f
        }
        __extends(a, d);
        a.dispatchIndexChangeEvent = function(b, d, e, m, f) {
            "undefined" === typeof e && (e = -1);
            "undefined" === typeof m && (m = -1);
            "undefined" === typeof f && (f = !1);
            var g = c.Event._getPropertyData(a);
            g.oldIndex = e;
            g.newIndex = m;
            return c.Event._dispatchByTarget(a, b, d, g, !1, f)
        };
        a.CHANGE = "change";
        a.CHANGING = "changing";
        return a
    }(c.Event);
    c.IndexChangeEvent = e
})(egret || (egret = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(d) {
        function a(a, c, e, m, f, g, k, n, p, q, r, s, z) {
            "undefined" === typeof c && (c = !0);
            "undefined" === typeof e && (e = !0);
            "undefined" === typeof m && (m = 0);
            "undefined" === typeof f && (f = 0);
            "undefined" === typeof g && (g = 0);
            "undefined" === typeof k && (k = !1);
            "undefined" === typeof n && (n = !1);
            "undefined" === typeof p && (p = !1);
            "undefined" === typeof q && (q = !1);
            "undefined" === typeof r && (r = -1);
            "undefined" === typeof s && (s = null);
            "undefined" === typeof z && (z = null);
            d.call(this, a, c, e, m, f, g, k, n, p, q);
            this.itemIndex = r;
            this.item =
                s;
            this.itemRenderer = z
        }
        __extends(a, d);
        a.dispatchListEvent = function(b, d, e, m, f, g) {
            "undefined" === typeof e && (e = null);
            "undefined" === typeof m && (m = -1);
            "undefined" === typeof f && (f = null);
            "undefined" === typeof g && (g = null);
            var k = c.Event._getPropertyData(a);
            k.touchPointID = e.touchPointID;
            k._stageX = e.stageX;
            k._stageY = e.stageY;
            k.ctrlKey = e.ctrlKey;
            k.altKey = e.altKey;
            k.shiftKey = e.shiftKey;
            k.touchDown = e.touchDown;
            k.itemIndex = m;
            k.item = f;
            k.itemRenderer = g;
            c.Event._dispatchByTarget(a, b, d, k)
        };
        a.ITEM_ROLL_OUT = "itemRollOut";
        a.ITEM_ROLL_OVER = "itemRollOver";
        a.ITEM_CLICK = "itemClick";
        return a
    }(c.TouchEvent);
    c.ListEvent = e
})(egret || (egret = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(d) {
        function a(a, c, e, m, f) {
            "undefined" === typeof c && (c = !1);
            "undefined" === typeof e && (e = !1);
            "undefined" === typeof m && (m = null);
            "undefined" === typeof f && (f = !1);
            d.call(this, a, c, e);
            this.popUp = m;
            this.modal = f
        }
        __extends(a, d);
        a.dispatchPopUpEvent = function(b, d, e, m) {
            "undefined" === typeof e && (e = null);
            "undefined" === typeof m && (m = !1);
            var f = c.Event._getPropertyData(a);
            f.popUp = e;
            f.modal = m;
            c.Event._dispatchByTarget(a, b, d, f)
        };
        a.ADD_POPUP = "addPopUp";
        a.REMOVE_POPUP = "removePopUp";
        a.BRING_TO_FRONT =
            "bringToFront";
        return a
    }(c.Event);
    c.PopUpEvent = e
})(egret || (egret = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(d) {
        function a(a, c, e, m, f, g) {
            "undefined" === typeof c && (c = !1);
            "undefined" === typeof e && (e = !1);
            "undefined" === typeof m && (m = null);
            "undefined" === typeof f && (f = -1);
            "undefined" === typeof g && (g = null);
            d.call(this, a, c, e);
            this.renderer = m;
            this.index = f;
            this.data = g
        }
        __extends(a, d);
        a.dispatchRendererExistenceEvent = function(b, d, e, m, f) {
            "undefined" === typeof e && (e = null);
            "undefined" === typeof m && (m = -1);
            "undefined" === typeof f && (f = null);
            var g = c.Event._getPropertyData(a);
            g.renderer = e;
            g.index = m;
            g.data =
                f;
            c.Event._dispatchByTarget(a, b, d, g)
        };
        a.RENDERER_ADD = "rendererAdd";
        a.RENDERER_REMOVE = "rendererRemove";
        return a
    }(c.Event);
    c.RendererExistenceEvent = e
})(egret || (egret = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(d) {
        function a(a, c, e, m, f) {
            "undefined" === typeof c && (c = !1);
            "undefined" === typeof e && (e = !1);
            "undefined" === typeof m && (m = null);
            "undefined" === typeof f && (f = null);
            d.call(this, a, c, e);
            this.oldState = m;
            this.newState = f
        }
        __extends(a, d);
        a.dispatchStateChangeEvent = function(b, d, e, m) {
            "undefined" === typeof e && (e = null);
            "undefined" === typeof m && (m = null);
            var f = c.Event._getPropertyData(a);
            f.oldState = e;
            f.newState = m;
            c.Event._dispatchByTarget(a, b, d, f)
        };
        a.CURRENT_STATE_CHANGE = "currentStateChange";
        a.CURRENT_STATE_CHANGING =
            "currentStateChanging";
        return a
    }(c.Event);
    c.StateChangeEvent = e
})(egret || (egret = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(d) {
        function a(a, c, e) {
            "undefined" === typeof c && (c = !1);
            "undefined" === typeof e && (e = !1);
            d.call(this, a, c, e)
        }
        __extends(a, d);
        a.dispatchTrackBaseEvent = function(b, d) {
            c.Event._dispatchByTarget(a, b, d)
        };
        a.THUMB_DRAG = "thumbDrag";
        a.THUMB_PRESS = "thumbPress";
        a.THUMB_RELEASE = "thumbRelease";
        return a
    }(c.Event);
    c.TrackBaseEvent = e
})(egret || (egret = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(d) {
        function a(a, c, e, m, f, g) {
            "undefined" === typeof c && (c = !1);
            "undefined" === typeof e && (e = !0);
            "undefined" === typeof m && (m = -1);
            "undefined" === typeof f && (f = null);
            "undefined" === typeof g && (g = null);
            d.call(this, a, c, e);
            this.item = f;
            this.itemRenderer = g;
            this.itemIndex = m
        }
        __extends(a, d);
        a.dispatchTreeEvent = function(b, d, e, m, f, g) {
            "undefined" === typeof e && (e = -1);
            "undefined" === typeof m && (m = null);
            "undefined" === typeof f && (f = null);
            "undefined" === typeof g && (g = !1);
            var k = c.Event._getPropertyData(a);
            k.itemIndex = e;
            k.item = m;
            k.itemRenderer = f;
            k.opening = g;
            c.Event._dispatchByTarget(a, b, d, k)
        };
        a.ITEM_CLOSE = "itemClose";
        a.ITEM_OPEN = "itemOpen";
        a.ITEM_OPENING = "itemOpening";
        return a
    }(c.Event);
    c.TreeEvent = e
})(egret || (egret = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(c) {
        function a() {
            c.call(this);
            this._useVirtualLayout = !1
        }
        __extends(a, c);
        Object.defineProperty(a.prototype, "target", {
            get: function() {
                return this._target
            },
            set: function(a) {
                this._target != a && (this._target = a, this.clearVirtualLayoutCache())
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "useVirtualLayout", {
            get: function() {
                return this._useVirtualLayout
            },
            set: function(a) {
                this._useVirtualLayout != a && (this._useVirtualLayout = a, this.dispatchEventWith("useVirtualLayoutChanged"),
                    this._useVirtualLayout && !a && this.clearVirtualLayoutCache(), this.target && this.target.invalidateDisplayList())
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "typicalLayoutRect", {
            get: function() {
                return this._typicalLayoutRect
            },
            set: function(a) {
                this._typicalLayoutRect != a && (this._typicalLayoutRect = a, this.target && this.target.invalidateSize())
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype.scrollPositionChanged = function() {};
        a.prototype.clearVirtualLayoutCache = function() {};
        a.prototype.elementAdded =
            function(a) {};
        a.prototype.elementRemoved = function(a) {};
        a.prototype.measure = function() {};
        a.prototype.updateDisplayList = function(a, c) {};
        return a
    }(c.EventDispatcher);
    c.LayoutBase = e
})(egret || (egret = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(d) {
        function a() {
            d.call(this);
            this._mouseWheelSpeed = 20
        }
        __extends(a, d);
        Object.defineProperty(a.prototype, "useVirtualLayout", {
            set: function(a) {},
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "mouseWheelSpeed", {
            get: function() {
                return this._mouseWheelSpeed
            },
            set: function(a) {
                0 == a && (a = 1);
                this._mouseWheelSpeed = a
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype.getElementBoundsLeftOfScrollRect = function(a) {
            var d = new c.Rectangle;
            d.x = a.x - this._mouseWheelSpeed;
            d.right =
                a.x;
            return d
        };
        a.prototype.getElementBoundsRightOfScrollRect = function(a) {
            var d = new c.Rectangle;
            d.x = a.right;
            d.right = a.right + this._mouseWheelSpeed;
            return d
        };
        a.prototype.getElementBoundsAboveScrollRect = function(a) {
            var d = new c.Rectangle;
            d.y = a.y - this._mouseWheelSpeed;
            d.bottom = a.y;
            return d
        };
        a.prototype.getElementBoundsBelowScrollRect = function(a) {
            var d = new c.Rectangle;
            d.y = a.bottom;
            d.bottom = a.bottom + this._mouseWheelSpeed;
            return d
        };
        a.prototype.measure = function() {
            d.prototype.measure.call(this);
            if (null != this.target) {
                for (var a =
                    0, c = 0, e = this.target.numElements, m = 0; m < e; m++) {
                    var f = this.target.getElementAt(m);
                    if (f && f.includeInLayout) {
                        var g = f.horizontalCenter,
                            k = f.verticalCenter,
                            n = f.left,
                            p = f.right,
                            q = f.top,
                            r = f.bottom;
                        isNaN(n) || isNaN(p) ? isNaN(g) ? isNaN(n) && isNaN(p) ? g = f.preferredX : (g = isNaN(n) ? 0 : n, g += isNaN(p) ? 0 : p) : g = 2 * Math.abs(g) : g = n + p;
                        isNaN(q) || isNaN(r) ? isNaN(k) ? isNaN(q) && isNaN(r) ? k = f.preferredY : (k = isNaN(q) ? 0 : q, k += isNaN(r) ? 0 : r) : k = 2 * Math.abs(k) : k = q + r;
                        r = f.preferredHeight;
                        a = Math.ceil(Math.max(a, g + f.preferredWidth));
                        c = Math.ceil(Math.max(c,
                            k + r))
                    }
                }
                this.target.measuredWidth = a;
                this.target.measuredHeight = c
            }
        };
        a.prototype.updateDisplayList = function(a, c) {
            d.prototype.updateDisplayList.call(this, a, c);
            if (null != this.target) {
                for (var e = this.target.numElements, m = 0, f = 0, g = 0; g < e; g++) {
                    var k = this.target.getElementAt(g);
                    if (null != k && k.includeInLayout) {
                        var n = k.horizontalCenter,
                            p = k.verticalCenter,
                            q = k.left,
                            r = k.right,
                            s = k.top,
                            z = k.bottom,
                            A = k.percentWidth,
                            v = k.percentHeight,
                            B = NaN,
                            C = NaN;
                        isNaN(q) || isNaN(r) ? isNaN(A) || (B = Math.round(a * Math.min(0.01 * A, 1))) : B = a - r - q;
                        isNaN(s) ||
                            isNaN(z) ? isNaN(v) || (C = Math.round(c * Math.min(0.01 * v, 1))) : C = c - z - s;
                        k.setLayoutBoundsSize(B, C);
                        A = k.layoutBoundsWidth;
                        v = k.layoutBoundsHeight;
                        C = B = NaN;
                        B = isNaN(n) ? isNaN(q) ? isNaN(r) ? k.layoutBoundsX : a - A - r : q : Math.round((a - A) / 2 + n);
                        C = isNaN(p) ? isNaN(s) ? isNaN(z) ? k.layoutBoundsY : c - v - z : s : Math.round((c - v) / 2 + p);
                        k.setLayoutBoundsPosition(B, C);
                        m = Math.max(m, B + A);
                        f = Math.max(f, C + v)
                    }
                }
                this.target.setContentSize(m, f)
            }
        };
        return a
    }(c.LayoutBase);
    c.BasicLayout = e
})(egret || (egret = {}));
(function(c) {
    var e = function() {
        function c() {}
        c.LEFT = "left";
        c.JUSTIFY_USING_GAP = "justifyUsingGap";
        c.JUSTIFY_USING_WIDTH = "justifyUsingWidth";
        return c
    }();
    c.ColumnAlign = e
})(egret || (egret = {}));
(function(c) {
    var e = function() {
        function c() {}
        c.TOP = "top";
        c.JUSTIFY_USING_GAP = "justifyUsingGap";
        c.JUSTIFY_USING_HEIGHT = "justifyUsingHeight";
        return c
    }();
    c.RowAlign = e
})(egret || (egret = {}));
(function(c) {
    var e = function() {
        function c() {}
        c.ROWS = "rows";
        c.COLUMNS = "columns";
        return c
    }();
    c.TileOrientation = e
})(egret || (egret = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(a) {
        function b() {
            a.call(this);
            this._horizontalAlign = c.HorizontalAlign.LEFT;
            this._verticalAlign = c.VerticalAlign.TOP;
            this._gap = 6;
            this._padding = 0;
            this._paddingBottom = this._paddingTop = this._paddingRight = this._paddingLeft = NaN;
            this.elementSizeTable = [];
            this.endIndex = this.startIndex = -1;
            this.indexInViewCalculated = !1;
            this.maxElementWidth = 0
        }
        __extends(b, a);
        Object.defineProperty(b.prototype, "horizontalAlign", {
            get: function() {
                return this._horizontalAlign
            },
            set: function(a) {
                this._horizontalAlign !=
                    a && (this._horizontalAlign = a, this.target && this.target.invalidateDisplayList())
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(b.prototype, "verticalAlign", {
            get: function() {
                return this._verticalAlign
            },
            set: function(a) {
                this._verticalAlign != a && (this._verticalAlign = a, this.target && this.target.invalidateDisplayList())
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(b.prototype, "gap", {
            get: function() {
                return this._gap
            },
            set: function(a) {
                this._gap != a && (this._gap = a, this.invalidateTargetSizeAndDisplayList(),
                    this.hasEventListener("gapChanged") && this.dispatchEventWith("gapChanged"))
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(b.prototype, "padding", {
            get: function() {
                return this._padding
            },
            set: function(a) {
                this._padding != a && (this._padding = a, this.invalidateTargetSizeAndDisplayList())
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(b.prototype, "paddingLeft", {
            get: function() {
                return this._paddingLeft
            },
            set: function(a) {
                this._paddingLeft != a && (this._paddingLeft = a, this.invalidateTargetSizeAndDisplayList())
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(b.prototype, "paddingRight", {
            get: function() {
                return this._paddingRight
            },
            set: function(a) {
                this._paddingRight != a && (this._paddingRight = a, this.invalidateTargetSizeAndDisplayList())
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(b.prototype, "paddingTop", {
            get: function() {
                return this._paddingTop
            },
            set: function(a) {
                this._paddingTop != a && (this._paddingTop = a, this.invalidateTargetSizeAndDisplayList())
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(b.prototype,
            "paddingBottom", {
                get: function() {
                    return this._paddingBottom
                },
                set: function(a) {
                    this._paddingBottom != a && (this._paddingBottom = a, this.invalidateTargetSizeAndDisplayList())
                },
                enumerable: !0,
                configurable: !0
            });
        b.prototype.invalidateTargetSizeAndDisplayList = function() {
            this.target && (this.target.invalidateSize(), this.target.invalidateDisplayList())
        };
        b.prototype.measure = function() {
            a.prototype.measure.call(this);
            this.target && (this.useVirtualLayout ? this.measureVirtual() : this.measureReal())
        };
        b.prototype.measureVirtual =
            function() {
                for (var a = this.typicalLayoutRect ? this.typicalLayoutRect.height : 22, b = Math.max(this.maxElementWidth, this.typicalLayoutRect ? this.typicalLayoutRect.width : 71), c = this.getElementTotalSize(), d = this.target.getElementIndicesInView(), e = d.length, k = 0; k < e; k++) {
                    var n = d[k],
                        p = this.target.getElementAt(n);
                    if (null != p && p.includeInLayout) var q = p.preferredWidth,
                        c = c + p.preferredHeight,
                        c = c - (isNaN(this.elementSizeTable[n]) ? a : this.elementSizeTable[n]),
                        b = Math.max(b, q)
                }
                k = isNaN(this._padding) ? 0 : this._padding;
                a = isNaN(this._paddingLeft) ?
                    k : this._paddingLeft;
                d = isNaN(this._paddingRight) ? k : this._paddingRight;
                e = isNaN(this._paddingTop) ? k : this._paddingTop;
                k = isNaN(this._paddingBottom) ? k : this._paddingBottom;
                e += k;
                this.target.measuredWidth = Math.ceil(b + (a + d));
                this.target.measuredHeight = Math.ceil(c + e)
            };
        b.prototype.measureReal = function() {
            for (var a = this.target.numElements, b = a, c = 0, d = 0, e = 0; e < a; e++) {
                var k = this.target.getElementAt(e);
                if (k && k.includeInLayout) var n = k.preferredWidth,
                    d = d + k.preferredHeight,
                    c = Math.max(c, n);
                else b--
            }
            a = isNaN(this._gap) ? 0 :
                this._gap;
            d += (b - 1) * a;
            k = isNaN(this._padding) ? 0 : this._padding;
            b = isNaN(this._paddingLeft) ? k : this._paddingLeft;
            a = isNaN(this._paddingRight) ? k : this._paddingRight;
            e = isNaN(this._paddingTop) ? k : this._paddingTop;
            k = isNaN(this._paddingBottom) ? k : this._paddingBottom;
            e += k;
            this.target.measuredWidth = Math.ceil(c + (b + a));
            this.target.measuredHeight = Math.ceil(d + e)
        };
        b.prototype.updateDisplayList = function(b, c) {
            a.prototype.updateDisplayList.call(this, b, c);
            this.target && (this.useVirtualLayout ? this.updateDisplayListVirtual(b,
                c) : this.updateDisplayListReal(b, c))
        };
        b.prototype.getStartPosition = function(a) {
            var b = isNaN(this._padding) ? 0 : this._padding,
                c = isNaN(this._paddingTop) ? b : this._paddingTop,
                b = isNaN(this._gap) ? 0 : this._gap;
            if (!this.useVirtualLayout) {
                var d;
                this.target && (d = this.target.getElementAt(a));
                return d ? d.y : c
            }
            d = this.typicalLayoutRect ? this.typicalLayoutRect.height : 22;
            for (var e = 0; e < a; e++) {
                var k = this.elementSizeTable[e];
                isNaN(k) && (k = d);
                c += k + b
            }
            return c
        };
        b.prototype.getElementSize = function(a) {
            return this.useVirtualLayout ?
                (a = this.elementSizeTable[a], isNaN(a) && (a = this.typicalLayoutRect ? this.typicalLayoutRect.height : 22), a) : this.target ? this.target.getElementAt(a).height : 0
        };
        b.prototype.getElementTotalSize = function() {
            for (var a = isNaN(this._gap) ? 0 : this._gap, b = this.typicalLayoutRect ? this.typicalLayoutRect.height : 22, c = 0, d = this.target.numElements, e = 0; e < d; e++) {
                var k = this.elementSizeTable[e];
                isNaN(k) && (k = b);
                c += k + a
            }
            return c - a
        };
        b.prototype.elementAdded = function(b) {
            a.prototype.elementAdded.call(this, b);
            this.elementSizeTable.splice(b,
                0, this.typicalLayoutRect ? this.typicalLayoutRect.height : 22)
        };
        b.prototype.elementRemoved = function(b) {
            a.prototype.elementRemoved.call(this, b);
            this.elementSizeTable.splice(b, 1)
        };
        b.prototype.clearVirtualLayoutCache = function() {
            a.prototype.clearVirtualLayoutCache.call(this);
            this.elementSizeTable = [];
            this.maxElementWidth = 0
        };
        b.prototype.findIndexAt = function(a, b, c) {
            var d = Math.floor(0.5 * (b + c)),
                e = this.getStartPosition(d),
                k = this.getElementSize(d),
                n = isNaN(this._gap) ? 0 : this._gap;
            return a >= e && a < e + k + n ? d : b == c ? -1 : a <
                e ? this.findIndexAt(a, b, Math.max(b, d - 1)) : this.findIndexAt(a, Math.min(d + 1, c), c)
        };
        b.prototype.scrollPositionChanged = function() {
            a.prototype.scrollPositionChanged.call(this);
            this.useVirtualLayout && this.getIndexInView() && (this.indexInViewCalculated = !0, this.target.invalidateDisplayList())
        };
        b.prototype.getIndexInView = function() {
            if (!this.target || 0 == this.target.numElements || isNaN(this.target.width) || 0 == this.target.width || isNaN(this.target.height) || 0 == this.target.height) return this.startIndex = this.endIndex = -1, !1;
            var a = isNaN(this._padding) ? 0 : this._padding,
                b = isNaN(this._paddingTop) ? a : this._paddingTop,
                c = isNaN(this._paddingBottom) ? a : this._paddingBottom,
                a = this.target.numElements,
                d = this.getStartPosition(a - 1) + this.elementSizeTable[a - 1] + c,
                e = this.target.verticalScrollPosition;
            if (e > d - c) return this.endIndex = this.startIndex = -1, !1;
            c = this.target.verticalScrollPosition + this.target.height;
            if (c < b) return this.endIndex = this.startIndex = -1, !1;
            b = this.startIndex;
            d = this.endIndex;
            this.startIndex = this.findIndexAt(e, 0, a - 1); - 1 ==
                this.startIndex && (this.startIndex = 0);
            this.endIndex = this.findIndexAt(c, 0, a - 1); - 1 == this.endIndex && (this.endIndex = a - 1);
            return b != this.startIndex || d != this.endIndex
        };
        b.prototype.updateDisplayListVirtual = function(a, b) {
            this.indexInViewCalculated ? this.indexInViewCalculated = !1 : this.getIndexInView();
            var d = isNaN(this._padding) ? 0 : this._padding,
                e = isNaN(this._paddingLeft) ? d : this._paddingLeft,
                g = isNaN(this._paddingRight) ? d : this._paddingRight,
                k = isNaN(this._paddingBottom) ? d : this._paddingBottom,
                n = isNaN(this._gap) ? 0 :
                this._gap,
                p = this.target.numElements;
            if (-1 == this.startIndex || -1 == this.endIndex) e = this.getStartPosition(p) - n + k, this.target.setContentSize(this.target.contentWidth, Math.ceil(e));
            else {
                this.target.setVirtualElementIndicesInView(this.startIndex, this.endIndex);
                var q = this._horizontalAlign == c.HorizontalAlign.JUSTIFY || this._horizontalAlign == c.HorizontalAlign.CONTENT_JUSTIFY,
                    r = this._horizontalAlign == c.HorizontalAlign.CONTENT_JUSTIFY,
                    s = 0;
                q || (this._horizontalAlign == c.HorizontalAlign.CENTER ? s = 0.5 : this._horizontalAlign ==
                    c.HorizontalAlign.RIGHT && (s = 1));
                var z = Math.max(0, a - e - g),
                    A = Math.ceil(z),
                    v, B = this.typicalLayoutRect ? this.typicalLayoutRect.height : 22,
                    d = Math.max(this.typicalLayoutRect ? this.typicalLayoutRect.width : 71, this.maxElementWidth);
                if (r) {
                    for (var C = this.startIndex; C <= this.endIndex; C++)(v = this.target.getVirtualElementAt(C)) && v.includeInLayout && (this.maxElementWidth = Math.max(this.maxElementWidth, v.preferredWidth));
                    A = Math.ceil(Math.max(z, this.maxElementWidth))
                }
                for (var t = 0, u = 0, C = 0, D = !1, w = this.startIndex; w <= this.endIndex; w++)
                    if (t =
                        0, v = this.target.getVirtualElementAt(w)) v.includeInLayout ? (q ? (t = e, v.setLayoutBoundsSize(A, NaN)) : (t = (z - v.layoutBoundsWidth) * s, t = 0 < t ? t : 0, t = e + t), r || (this.maxElementWidth = Math.max(this.maxElementWidth, v.preferredWidth)), C = Math.max(C, v.layoutBoundsWidth), D || (u = isNaN(this.elementSizeTable[w]) ? B : this.elementSizeTable[w], u != v.layoutBoundsHeight && (D = !0)), 0 == w && 0 < this.elementSizeTable.length && this.elementSizeTable[w] != v.layoutBoundsHeight && (this.typicalLayoutRect = null), this.elementSizeTable[w] = v.layoutBoundsHeight,
                        u = this.getStartPosition(w), v.setLayoutBoundsPosition(Math.round(t), Math.round(u))) : this.elementSizeTable[w] = 0;
                C += e + g;
                e = this.getStartPosition(p) - n + k;
                this.target.setContentSize(Math.ceil(C), Math.ceil(e));
                (D || d < this.maxElementWidth) && this.target.invalidateSize()
            }
        };
        b.prototype.updateDisplayListReal = function(a, e) {
            var m = isNaN(this._padding) ? 0 : this._padding,
                f = isNaN(this._paddingLeft) ? m : this._paddingLeft,
                g = isNaN(this._paddingRight) ? m : this._paddingRight,
                k = isNaN(this._paddingTop) ? m : this._paddingTop,
                m = isNaN(this._paddingBottom) ?
                m : this._paddingBottom,
                n = isNaN(this._gap) ? 0 : this._gap,
                p = Math.max(0, a - f - g),
                q = Math.max(0, e - k - m),
                r = this._verticalAlign == c.VerticalAlign.JUSTIFY,
                s = this._horizontalAlign == c.HorizontalAlign.JUSTIFY || this._horizontalAlign == c.HorizontalAlign.CONTENT_JUSTIFY,
                z = 0;
            s || (this._horizontalAlign == c.HorizontalAlign.CENTER ? z = 0.5 : this._horizontalAlign == c.HorizontalAlign.RIGHT && (z = 1));
            var A = this.target.numElements,
                v = A,
                B = f,
                C = k,
                t, u, D = 0,
                B = 0,
                w = [],
                E, x = q;
            for (t = 0; t < A; t++)(u = this.target.getElementAt(t)) && u.includeInLayout ? (this.maxElementWidth =
                Math.max(this.maxElementWidth, u.preferredWidth), r ? D += u.preferredHeight : isNaN(u.percentHeight) ? x -= u.preferredHeight : (B += u.percentHeight, E = new d, E.layoutElement = u, E.percent = u.percentHeight, E.min = u.minHeight, E.max = u.maxHeight, w.push(E))) : v--;
            var x = x - (v - 1) * n,
                x = 0 < x ? x : 0,
                y = q - D - n * (v - 1),
                H, L = v,
                G = [];
            if (r) {
                if (0 > y) {
                    H = x / v;
                    for (t = 0; t < A; t++)(u = this.target.getElementAt(t)) && u.includeInLayout && (u = u.preferredHeight, u <= H && (x -= u, L--));
                    x = 0 < x ? x : 0
                }
            } else if (0 < B) {
                b.flexChildrenProportionally(q, x, B, w);
                q = 0;
                u = w.length;
                for (t = 0; t <
                    u; t++) E = w[t], B = Math.round(E.size + q), q += E.size - B, G[E.layoutElement.hashCode] = B, x -= B;
                x = 0 < x ? x : 0
            }
            this._verticalAlign == c.VerticalAlign.MIDDLE ? C = k + 0.5 * x : this._verticalAlign == c.VerticalAlign.BOTTOM && (C = k + x);
            w = f;
            u = v = 0;
            E = Math.ceil(p);
            this._horizontalAlign == c.HorizontalAlign.CONTENT_JUSTIFY && (E = Math.ceil(Math.max(p, this.maxElementWidth)));
            q = 0;
            v = NaN;
            for (t = 0; t < A; t++) B = 0, (u = this.target.getElementAt(t)) && u.includeInLayout && (v = NaN, r ? (B = NaN, 0 < y ? B = x * u.preferredHeight / D : 0 > y && u.preferredHeight > H && (B = x / L), isNaN(B) ||
                (v = Math.round(B + q), q += B - v)) : v = G[u.hashCode], s ? (B = f, u.setLayoutBoundsSize(E, v)) : (B = NaN, isNaN(u.percentWidth) || (B = Math.min(100, u.percentWidth), B = Math.round(p * B * 0.01)), u.setLayoutBoundsSize(B, v), B = (p - u.layoutBoundsWidth) * z, B = 0 < B ? B : 0, B = f + B), u.setLayoutBoundsPosition(Math.round(B), Math.round(C)), v = Math.ceil(u.layoutBoundsWidth), u = Math.ceil(u.layoutBoundsHeight), w = Math.max(w, B + v), k = Math.max(k, C + u), C += u + n);
            this.target.setContentSize(Math.ceil(w + g), Math.ceil(k + m))
        };
        b.flexChildrenProportionally = function(a,
            b, c, d) {
            var e = d.length,
                k;
            do {
                k = !0;
                var n = b - a * c / 100;
                0 < n ? b -= n : n = 0;
                for (var p = b / c, q = 0; q < e; q++) {
                    var r = d[q],
                        s = r.percent * p;
                    if (s < r.min) {
                        k = r.min;
                        r.size = k;
                        d[q] = d[--e];
                        d[e] = r;
                        c -= r.percent;
                        n >= k || (b -= k - n);
                        k = !1;
                        break
                    } else if (s > r.max) {
                        k = r.max;
                        r.size = k;
                        d[q] = d[--e];
                        d[e] = r;
                        c -= r.percent;
                        n >= k || (b -= k - n);
                        k = !1;
                        break
                    } else r.size = s
                }
            } while (!k)
        };
        return b
    }(c.LayoutBase);
    c.VerticalLayout = e;
    var d = function() {
        return function() {
            this.size = 0
        }
    }()
})(egret || (egret = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(a) {
        function b() {
            a.call(this);
            this._horizontalAlign = c.HorizontalAlign.LEFT;
            this._verticalAlign = c.VerticalAlign.TOP;
            this._gap = 6;
            this._padding = 0;
            this._paddingBottom = this._paddingTop = this._paddingRight = this._paddingLeft = NaN;
            this.elementSizeTable = [];
            this.endIndex = this.startIndex = -1;
            this.indexInViewCalculated = !1;
            this.maxElementHeight = 0
        }
        __extends(b, a);
        Object.defineProperty(b.prototype, "horizontalAlign", {
            get: function() {
                return this._horizontalAlign
            },
            set: function(a) {
                this._horizontalAlign !=
                    a && (this._horizontalAlign = a, this.target && this.target.invalidateDisplayList())
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(b.prototype, "verticalAlign", {
            get: function() {
                return this._verticalAlign
            },
            set: function(a) {
                this._verticalAlign != a && (this._verticalAlign = a, this.target && this.target.invalidateDisplayList())
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(b.prototype, "gap", {
            get: function() {
                return this._gap
            },
            set: function(a) {
                this._gap != a && (this._gap = a, this.invalidateTargetSizeAndDisplayList(),
                    this.hasEventListener("gapChanged") && this.dispatchEventWith("gapChanged"))
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(b.prototype, "padding", {
            get: function() {
                return this._padding
            },
            set: function(a) {
                this._padding != a && (this._padding = a, this.invalidateTargetSizeAndDisplayList())
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(b.prototype, "paddingLeft", {
            get: function() {
                return this._paddingLeft
            },
            set: function(a) {
                this._paddingLeft != a && (this._paddingLeft = a, this.invalidateTargetSizeAndDisplayList())
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(b.prototype, "paddingRight", {
            get: function() {
                return this._paddingRight
            },
            set: function(a) {
                this._paddingRight != a && (this._paddingRight = a, this.invalidateTargetSizeAndDisplayList())
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(b.prototype, "paddingTop", {
            get: function() {
                return this._paddingTop
            },
            set: function(a) {
                this._paddingTop != a && (this._paddingTop = a, this.invalidateTargetSizeAndDisplayList())
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(b.prototype,
            "paddingBottom", {
                get: function() {
                    return this._paddingBottom
                },
                set: function(a) {
                    this._paddingBottom != a && (this._paddingBottom = a, this.invalidateTargetSizeAndDisplayList())
                },
                enumerable: !0,
                configurable: !0
            });
        b.prototype.invalidateTargetSizeAndDisplayList = function() {
            this.target && (this.target.invalidateSize(), this.target.invalidateDisplayList())
        };
        b.prototype.measure = function() {
            a.prototype.measure.call(this);
            this.target && (this.useVirtualLayout ? this.measureVirtual() : this.measureReal())
        };
        b.prototype.measureVirtual =
            function() {
                for (var a = this.typicalLayoutRect ? this.typicalLayoutRect.height : 22, b = this.typicalLayoutRect ? this.typicalLayoutRect.width : 71, c = this.getElementTotalSize(), a = Math.max(this.maxElementHeight, a), d = this.target.getElementIndicesInView(), e = d.length, k = 0; k < e; k++) {
                    var n = d[k],
                        p = this.target.getElementAt(n);
                    if (null != p && p.includeInLayout) var q = p.preferredHeight,
                        c = c + p.preferredWidth,
                        c = c - (isNaN(this.elementSizeTable[n]) ? b : this.elementSizeTable[n]),
                        a = Math.max(a, q)
                }
                k = isNaN(this._padding) ? 0 : this._padding;
                b =
                    isNaN(this._paddingLeft) ? k : this._paddingLeft;
                d = isNaN(this._paddingRight) ? k : this._paddingRight;
                e = isNaN(this._paddingTop) ? k : this._paddingTop;
                k = isNaN(this._paddingBottom) ? k : this._paddingBottom;
                e += k;
                this.target.measuredWidth = Math.ceil(c + (b + d));
                this.target.measuredHeight = Math.ceil(a + e)
            };
        b.prototype.measureReal = function() {
            for (var a = this.target.numElements, b = a, c = 0, d = 0, e = 0; e < a; e++) {
                var k = this.target.getElementAt(e);
                if (k && k.includeInLayout) var n = k.preferredHeight,
                    c = c + k.preferredWidth,
                    d = Math.max(d, n);
                else b--
            }
            a =
                isNaN(this._gap) ? 0 : this._gap;
            c += (b - 1) * a;
            k = isNaN(this._padding) ? 0 : this._padding;
            b = isNaN(this._paddingLeft) ? k : this._paddingLeft;
            a = isNaN(this._paddingRight) ? k : this._paddingRight;
            e = isNaN(this._paddingTop) ? k : this._paddingTop;
            k = isNaN(this._paddingBottom) ? k : this._paddingBottom;
            e += k;
            this.target.measuredWidth = Math.ceil(c + (b + a));
            this.target.measuredHeight = Math.ceil(d + e)
        };
        b.prototype.updateDisplayList = function(b, c) {
            a.prototype.updateDisplayList.call(this, b, c);
            this.target && (this.useVirtualLayout ? this.updateDisplayListVirtual(b,
                c) : this.updateDisplayListReal(b, c))
        };
        b.prototype.getStartPosition = function(a) {
            var b = isNaN(this._padding) ? 0 : this._padding,
                c = isNaN(this._paddingLeft) ? b : this._paddingLeft,
                b = isNaN(this._gap) ? 0 : this._gap;
            if (!this.useVirtualLayout) {
                var d;
                this.target && (d = this.target.getElementAt(a));
                return d ? d.x : c
            }
            d = this.typicalLayoutRect ? this.typicalLayoutRect.width : 71;
            for (var e = 0; e < a; e++) {
                var k = this.elementSizeTable[e];
                isNaN(k) && (k = d);
                c += k + b
            }
            return c
        };
        b.prototype.getElementSize = function(a) {
            return this.useVirtualLayout ?
                (a = this.elementSizeTable[a], isNaN(a) && (a = this.typicalLayoutRect ? this.typicalLayoutRect.width : 71), a) : this.target ? this.target.getElementAt(a).width : 0
        };
        b.prototype.getElementTotalSize = function() {
            for (var a = this.typicalLayoutRect ? this.typicalLayoutRect.width : 71, b = isNaN(this._gap) ? 0 : this._gap, c = 0, d = this.target.numElements, e = 0; e < d; e++) {
                var k = this.elementSizeTable[e];
                isNaN(k) && (k = a);
                c += k + b
            }
            return c - b
        };
        b.prototype.elementAdded = function(b) {
            this.useVirtualLayout && (a.prototype.elementAdded.call(this, b), this.elementSizeTable.splice(b,
                0, this.typicalLayoutRect ? this.typicalLayoutRect.width : 71))
        };
        b.prototype.elementRemoved = function(b) {
            this.useVirtualLayout && (a.prototype.elementRemoved.call(this, b), this.elementSizeTable.splice(b, 1))
        };
        b.prototype.clearVirtualLayoutCache = function() {
            this.useVirtualLayout && (a.prototype.clearVirtualLayoutCache.call(this), this.elementSizeTable = [], this.maxElementHeight = 0)
        };
        b.prototype.findIndexAt = function(a, b, c) {
            var d = Math.floor(0.5 * (b + c)),
                e = this.getStartPosition(d),
                k = this.getElementSize(d),
                n = isNaN(this._gap) ?
                0 : this._gap;
            return a >= e && a < e + k + n ? d : b == c ? -1 : a < e ? this.findIndexAt(a, b, Math.max(b, d - 1)) : this.findIndexAt(a, Math.min(d + 1, c), c)
        };
        b.prototype.scrollPositionChanged = function() {
            a.prototype.scrollPositionChanged.call(this);
            this.useVirtualLayout && this.getIndexInView() && (this.indexInViewCalculated = !0, this.target.invalidateDisplayList())
        };
        b.prototype.getIndexInView = function() {
            if (!this.target || 0 == this.target.numElements || isNaN(this.target.width) || 0 == this.target.width || isNaN(this.target.height) || 0 == this.target.height) return this.startIndex =
                this.endIndex = -1, !1;
            var a = isNaN(this._padding) ? 0 : this._padding,
                b = isNaN(this._paddingLeft) ? a : this._paddingLeft,
                c = isNaN(this._paddingRight) ? a : this._paddingRight;
            isNaN(this._paddingTop);
            isNaN(this._paddingBottom);
            var a = this.target.numElements,
                d = this.getStartPosition(a - 1) + this.elementSizeTable[a - 1] + c,
                e = this.target.horizontalScrollPosition;
            if (e > d - c) return this.endIndex = this.startIndex = -1, !1;
            c = this.target.horizontalScrollPosition + this.target.width;
            if (c < b) return this.endIndex = this.startIndex = -1, !1;
            b = this.startIndex;
            d = this.endIndex;
            this.startIndex = this.findIndexAt(e, 0, a - 1); - 1 == this.startIndex && (this.startIndex = 0);
            this.endIndex = this.findIndexAt(c, 0, a - 1); - 1 == this.endIndex && (this.endIndex = a - 1);
            return b != this.startIndex || d != this.endIndex
        };
        b.prototype.updateDisplayListVirtual = function(a, b) {
            this.indexInViewCalculated ? this.indexInViewCalculated = !1 : this.getIndexInView();
            var d = isNaN(this._padding) ? 0 : this._padding,
                e = isNaN(this._paddingRight) ? d : this._paddingRight,
                g = isNaN(this._paddingTop) ? d : this._paddingTop,
                k = isNaN(this._paddingBottom) ?
                d : this._paddingBottom,
                n = isNaN(this._gap) ? 0 : this._gap,
                p = this.target.numElements;
            if (-1 == this.startIndex || -1 == this.endIndex) e = this.getStartPosition(p) - n + e, this.target.setContentSize(Math.ceil(e), this.target.contentHeight);
            else {
                this.target.setVirtualElementIndicesInView(this.startIndex, this.endIndex);
                var q = this._verticalAlign == c.VerticalAlign.JUSTIFY || this._verticalAlign == c.VerticalAlign.CONTENT_JUSTIFY,
                    r = this._verticalAlign == c.VerticalAlign.CONTENT_JUSTIFY,
                    s = 0;
                q || (this._verticalAlign == c.VerticalAlign.MIDDLE ?
                    s = 0.5 : this._verticalAlign == c.VerticalAlign.BOTTOM && (s = 1));
                var z = Math.max(0, b - g - k),
                    A = Math.ceil(z),
                    v, B = this.typicalLayoutRect ? this.typicalLayoutRect.width : 71,
                    d = Math.max(this.typicalLayoutRect ? this.typicalLayoutRect.height : 22, this.maxElementHeight);
                if (r) {
                    for (var C = this.startIndex; C <= this.endIndex; C++)(v = this.target.getVirtualElementAt(C)) && v.includeInLayout && (this.maxElementHeight = Math.max(this.maxElementHeight, v.preferredHeight));
                    A = Math.ceil(Math.max(z, this.maxElementHeight))
                }
                for (var t = 0, u = 0, C = 0, D = !1, w = this.startIndex; w <= this.endIndex; w++)
                    if (u = 0, v = this.target.getVirtualElementAt(w)) v.includeInLayout ? (q ? (u = g, v.setLayoutBoundsSize(NaN, A)) : (u = (z - v.layoutBoundsHeight) * s, u = 0 < u ? u : 0, u = g + u), r || (this.maxElementHeight = Math.max(this.maxElementHeight, v.preferredHeight)), C = Math.max(C, v.layoutBoundsHeight), D || (t = isNaN(this.elementSizeTable[w]) ? B : this.elementSizeTable[w], t != v.layoutBoundsWidth && (D = !0)), 0 == w && 0 < this.elementSizeTable.length && this.elementSizeTable[w] != v.layoutBoundsWidth && (this.typicalLayoutRect =
                        null), this.elementSizeTable[w] = v.layoutBoundsWidth, t = this.getStartPosition(w), v.setLayoutBoundsPosition(Math.round(t), Math.round(u))) : this.elementSizeTable[w] = 0;
                C += g + k;
                e = this.getStartPosition(p) - n + e;
                this.target.setContentSize(Math.ceil(e), Math.ceil(C));
                (D || d < this.maxElementHeight) && this.target.invalidateSize()
            }
        };
        b.prototype.updateDisplayListReal = function(a, e) {
            var m = isNaN(this._padding) ? 0 : this._padding,
                f = isNaN(this._paddingLeft) ? m : this._paddingLeft,
                g = isNaN(this._paddingRight) ? m : this._paddingRight,
                k = isNaN(this._paddingTop) ? m : this._paddingTop,
                m = isNaN(this._paddingBottom) ? m : this._paddingBottom,
                n = isNaN(this._gap) ? 0 : this._gap,
                p = Math.max(0, a - f - g),
                q = Math.max(0, e - k - m),
                r = this._horizontalAlign == c.HorizontalAlign.JUSTIFY,
                s = this._verticalAlign == c.VerticalAlign.JUSTIFY || this._verticalAlign == c.VerticalAlign.CONTENT_JUSTIFY,
                z = 0;
            s || (this._verticalAlign == c.VerticalAlign.MIDDLE ? z = 0.5 : this._verticalAlign == c.VerticalAlign.BOTTOM && (z = 1));
            var A = this.target.numElements,
                v = A,
                B = f,
                C = k,
                t, u, D = 0,
                C = 0,
                w = [],
                E, x = p;
            for (t = 0; t <
                A; t++)(u = this.target.getElementAt(t)) && u.includeInLayout ? (this.maxElementHeight = Math.max(this.maxElementHeight, u.preferredHeight), r ? D += u.preferredWidth : isNaN(u.percentWidth) ? x -= u.preferredWidth : (C += u.percentWidth, E = new d, E.layoutElement = u, E.percent = u.percentWidth, E.min = u.minWidth, E.max = u.maxWidth, w.push(E))) : v--;
            var x = x - n * (v - 1),
                x = 0 < x ? x : 0,
                y = p - D - n * (v - 1),
                H, L = v,
                G = [];
            if (r) {
                if (0 > y) {
                    H = x / v;
                    for (t = 0; t < A; t++)(u = this.target.getElementAt(t)) && u.includeInLayout && (u = u.preferredWidth, u <= H && (x -= u, L--));
                    x = 0 < x ? x : 0
                }
            } else if (0 <
                C) {
                b.flexChildrenProportionally(p, x, C, w);
                p = 0;
                u = w.length;
                for (t = 0; t < u; t++) E = w[t], C = Math.round(E.size + p), p += E.size - C, G[E.layoutElement.hashCode] = C, x -= C;
                x = 0 < x ? x : 0
            }
            this._horizontalAlign == c.HorizontalAlign.CENTER ? B = f + 0.5 * x : this._horizontalAlign == c.HorizontalAlign.RIGHT && (B = f + x);
            w = k;
            u = v = 0;
            E = Math.ceil(q);
            this._verticalAlign == c.VerticalAlign.CONTENT_JUSTIFY && (E = Math.ceil(Math.max(q, this.maxElementHeight)));
            for (t = p = 0; t < A; t++) C = 0, (u = this.target.getElementAt(t)) && u.includeInLayout && (v = NaN, r ? (C = NaN, 0 < y ? C = x * u.preferredWidth /
                D : 0 > y && u.preferredWidth > H && (C = x / L), isNaN(C) || (v = Math.round(C + p), p += C - v)) : v = G[u.hashCode], s ? (C = k, u.setLayoutBoundsSize(v, E)) : (C = NaN, isNaN(u.percentHeight) || (C = Math.min(100, u.percentHeight), C = Math.round(q * C * 0.01)), u.setLayoutBoundsSize(v, C), C = (q - u.layoutBoundsHeight) * z, C = 0 < C ? C : 0, C = k + C), u.setLayoutBoundsPosition(Math.round(B), Math.round(C)), v = Math.ceil(u.layoutBoundsWidth), u = Math.ceil(u.layoutBoundsHeight), f = Math.max(f, B + v), w = Math.max(w, C + u), B += v + n);
            this.target.setContentSize(Math.ceil(f + g), Math.ceil(w +
                m))
        };
        b.flexChildrenProportionally = function(a, b, c, d) {
            var e = d.length,
                k;
            do {
                k = !0;
                var n = b - a * c / 100;
                0 < n ? b -= n : n = 0;
                for (var p = b / c, q = 0; q < e; q++) {
                    var r = d[q],
                        s = r.percent * p;
                    if (s < r.min) {
                        k = r.min;
                        r.size = k;
                        d[q] = d[--e];
                        d[e] = r;
                        c -= r.percent;
                        n >= k || (b -= k - n);
                        k = !1;
                        break
                    } else if (s > r.max) {
                        k = r.max;
                        r.size = k;
                        d[q] = d[--e];
                        d[e] = r;
                        c -= r.percent;
                        n >= k || (b -= k - n);
                        k = !1;
                        break
                    } else r.size = s
                }
            } while (!k)
        };
        return b
    }(c.LayoutBase);
    c.HorizontalLayout = e;
    var d = function() {
        return function() {
            this.size = 0
        }
    }()
})(egret || (egret = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(d) {
        function a() {
            d.call(this);
            this.explicitHorizontalGap = NaN;
            this._horizontalGap = 6;
            this.explicitVerticalGap = NaN;
            this._verticalGap = 6;
            this._columnCount = -1;
            this._requestedColumnCount = 0;
            this._rowCount = -1;
            this._requestedRowCount = 0;
            this._rowHeight = this.explicitRowHeight = this._columnWidth = this.explicitColumnWidth = NaN;
            this._padding = 0;
            this._paddingBottom = this._paddingTop = this._paddingRight = this._paddingLeft = NaN;
            this._horizontalAlign = c.HorizontalAlign.JUSTIFY;
            this._verticalAlign =
                c.VerticalAlign.JUSTIFY;
            this._columnAlign = c.ColumnAlign.LEFT;
            this._rowAlign = c.RowAlign.TOP;
            this._orientation = c.TileOrientation.ROWS;
            this.maxElementHeight = this.maxElementWidth = 0;
            this.endIndex = this.startIndex = -1;
            this.indexInViewCalculated = !1
        }
        __extends(a, d);
        Object.defineProperty(a.prototype, "horizontalGap", {
            get: function() {
                return this._horizontalGap
            },
            set: function(a) {
                a != this._horizontalGap && (this._horizontalGap = this.explicitHorizontalGap = a, this.invalidateTargetSizeAndDisplayList(), this.hasEventListener("gapChanged") &&
                    this.dispatchEventWith("gapChanged"))
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "verticalGap", {
            get: function() {
                return this._verticalGap
            },
            set: function(a) {
                a != this._verticalGap && (this._verticalGap = this.explicitVerticalGap = a, this.invalidateTargetSizeAndDisplayList(), this.hasEventListener("gapChanged") && this.dispatchEventWith("gapChanged"))
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "columnCount", {
            get: function() {
                return this._columnCount
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "requestedColumnCount", {
            get: function() {
                return this._requestedColumnCount
            },
            set: function(a) {
                this._requestedColumnCount != a && (this._columnCount = this._requestedColumnCount = a, this.invalidateTargetSizeAndDisplayList())
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "rowCount", {
            get: function() {
                return this._rowCount
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "requestedRowCount", {
            get: function() {
                return this._requestedRowCount
            },
            set: function(a) {
                this._requestedRowCount !=
                    a && (this._rowCount = this._requestedRowCount = a, this.invalidateTargetSizeAndDisplayList())
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "columnWidth", {
            get: function() {
                return this._columnWidth
            },
            set: function(a) {
                a != this._columnWidth && (this._columnWidth = this.explicitColumnWidth = a, this.invalidateTargetSizeAndDisplayList())
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "rowHeight", {
            get: function() {
                return this._rowHeight
            },
            set: function(a) {
                a != this._rowHeight && (this._rowHeight =
                    this.explicitRowHeight = a, this.invalidateTargetSizeAndDisplayList())
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "padding", {
            get: function() {
                return this._padding
            },
            set: function(a) {
                this._padding != a && (this._padding = a, this.invalidateTargetSizeAndDisplayList())
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "paddingLeft", {
            get: function() {
                return this._paddingLeft
            },
            set: function(a) {
                this._paddingLeft != a && (this._paddingLeft = a, this.invalidateTargetSizeAndDisplayList())
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "paddingRight", {
            get: function() {
                return this._paddingRight
            },
            set: function(a) {
                this._paddingRight != a && (this._paddingRight = a, this.invalidateTargetSizeAndDisplayList())
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "paddingTop", {
            get: function() {
                return this._paddingTop
            },
            set: function(a) {
                this._paddingTop != a && (this._paddingTop = a, this.invalidateTargetSizeAndDisplayList())
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype,
            "paddingBottom", {
                get: function() {
                    return this._paddingBottom
                },
                set: function(a) {
                    this._paddingBottom != a && (this._paddingBottom = a, this.invalidateTargetSizeAndDisplayList())
                },
                enumerable: !0,
                configurable: !0
            });
        Object.defineProperty(a.prototype, "horizontalAlign", {
            get: function() {
                return this._horizontalAlign
            },
            set: function(a) {
                this._horizontalAlign != a && (this._horizontalAlign = a, this.invalidateTargetSizeAndDisplayList())
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "verticalAlign", {
            get: function() {
                return this._verticalAlign
            },
            set: function(a) {
                this._verticalAlign != a && (this._verticalAlign = a, this.invalidateTargetSizeAndDisplayList())
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "columnAlign", {
            get: function() {
                return this._columnAlign
            },
            set: function(a) {
                this._columnAlign != a && (this._columnAlign = a, this.invalidateTargetSizeAndDisplayList())
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "rowAlign", {
            get: function() {
                return this._rowAlign
            },
            set: function(a) {
                this._rowAlign != a && (this._rowAlign = a,
                    this.invalidateTargetSizeAndDisplayList())
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "orientation", {
            get: function() {
                return this._orientation
            },
            set: function(a) {
                this._orientation != a && (this._orientation = a, this.invalidateTargetSizeAndDisplayList(), this.hasEventListener("orientationChanged") && this.dispatchEventWith("orientationChanged"))
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype.invalidateTargetSizeAndDisplayList = function() {
            this.target && (this.target.invalidateSize(), this.target.invalidateDisplayList())
        };
        a.prototype.measure = function() {
            if (this.target) {
                var a = this._columnCount,
                    c = this._rowCount,
                    d = this._columnWidth,
                    e = this._rowHeight,
                    f = 0,
                    g = 0;
                this.calculateRowAndColumn(this.target.explicitWidth, this.target.explicitHeight);
                var k = 0 < this._requestedColumnCount ? this._requestedColumnCount : this._columnCount,
                    n = 0 < this._requestedRowCount ? this._requestedRowCount : this._rowCount,
                    p = isNaN(this._horizontalGap) ? 0 : this._horizontalGap,
                    q = isNaN(this._verticalGap) ? 0 : this._verticalGap;
                0 < k && (f = k * (this._columnWidth + p) - p);
                0 < n && (g =
                    n * (this._rowHeight + q) - q);
                q = isNaN(this._padding) ? 0 : this._padding;
                k = isNaN(this._paddingLeft) ? q : this._paddingLeft;
                n = isNaN(this._paddingRight) ? q : this._paddingRight;
                p = isNaN(this._paddingTop) ? q : this._paddingTop;
                q = isNaN(this._paddingBottom) ? q : this._paddingBottom;
                p += q;
                this.target.measuredWidth = Math.ceil(f + (k + n));
                this.target.measuredHeight = Math.ceil(g + p);
                this._columnCount = a;
                this._rowCount = c;
                this._columnWidth = d;
                this._rowHeight = e
            }
        };
        a.prototype.calculateRowAndColumn = function(a, d) {
            var e = isNaN(this._horizontalGap) ?
                0 : this._horizontalGap,
                m = isNaN(this._verticalGap) ? 0 : this._verticalGap;
            this._rowCount = this._columnCount = -1;
            for (var f = this.target.numElements, g = f, k = 0; k < g; k++) {
                var n = this.target.getElementAt(k);
                n && !n.includeInLayout && f--
            }
            if (0 == f) this._rowCount = this._columnCount = 0;
            else {
                (isNaN(this.explicitColumnWidth) || isNaN(this.explicitRowHeight)) && this.updateMaxElementSize();
                isNaN(this.explicitColumnWidth) ? this._columnWidth = this.maxElementWidth : this._columnWidth = this.explicitColumnWidth;
                isNaN(this.explicitRowHeight) ?
                    this._rowHeight = this.maxElementHeight : this._rowHeight = this.explicitRowHeight;
                g = this._columnWidth + e;
                0 >= g && (g = 1);
                k = this._rowHeight + m;
                0 >= k && (k = 1);
                var n = this.orientation == c.TileOrientation.COLUMNS,
                    p = !isNaN(a),
                    q = !isNaN(d),
                    r = isNaN(this._padding) ? 0 : this._padding,
                    s = isNaN(this._paddingLeft) ? r : this._paddingLeft,
                    z = isNaN(this._paddingRight) ? r : this._paddingRight,
                    A = isNaN(this._paddingTop) ? r : this._paddingTop,
                    r = isNaN(this._paddingBottom) ? r : this._paddingBottom;
                0 < this._requestedColumnCount || 0 < this._requestedRowCount ?
                    (0 < this._requestedRowCount && (this._rowCount = Math.min(this._requestedRowCount, f)), 0 < this._requestedColumnCount && (this._columnCount = Math.min(this._requestedColumnCount, f))) : p || q ? !p || q && n ? (e = Math.max(0, d - A - r), this._rowCount = Math.floor((e + m) / k), this._rowCount = Math.max(1, Math.min(this._rowCount, f))) : (m = Math.max(0, a - s - z), this._columnCount = Math.floor((m + e) / g), this._columnCount = Math.max(1, Math.min(this._columnCount, f))) : (e = Math.sqrt(f * g * k), n ? this._rowCount = Math.max(1, Math.round(e / k)) : this._columnCount = Math.max(1,
                        Math.round(e / g))); - 1 == this._rowCount && (this._rowCount = Math.max(1, Math.ceil(f / this._columnCount))); - 1 == this._columnCount && (this._columnCount = Math.max(1, Math.ceil(f / this._rowCount)));
                0 < this._requestedColumnCount && 0 < this._requestedRowCount && (this.orientation == c.TileOrientation.ROWS ? this._rowCount = Math.max(1, Math.ceil(f / this._requestedColumnCount)) : this._columnCount = Math.max(1, Math.ceil(f / this._requestedRowCount)))
            }
        };
        a.prototype.updateMaxElementSize = function() {
            this.target && (this.useVirtualLayout ? this.updateMaxElementSizeVirtual() :
                this.updateMaxElementSizeReal())
        };
        a.prototype.updateMaxElementSizeVirtual = function() {
            var a = this.typicalLayoutRect ? this.typicalLayoutRect.height : 22;
            this.maxElementWidth = Math.max(this.maxElementWidth, this.typicalLayoutRect ? this.typicalLayoutRect.width : 22);
            this.maxElementHeight = Math.max(this.maxElementHeight, a);
            if (-1 != this.startIndex && -1 != this.endIndex)
                for (a = this.startIndex; a <= this.endIndex; a++) {
                    var c = this.target.getVirtualElementAt(a);
                    c && c.includeInLayout && (this.maxElementWidth = Math.max(this.maxElementWidth,
                        c.preferredWidth), this.maxElementHeight = Math.max(this.maxElementHeight, c.preferredHeight))
                }
        };
        a.prototype.updateMaxElementSizeReal = function() {
            for (var a = this.target.numElements, c = 0; c < a; c++) {
                var d = this.target.getElementAt(c);
                d && d.includeInLayout && (this.maxElementWidth = Math.max(this.maxElementWidth, d.preferredWidth), this.maxElementHeight = Math.max(this.maxElementHeight, d.preferredHeight))
            }
        };
        a.prototype.clearVirtualLayoutCache = function() {
            d.prototype.clearVirtualLayoutCache.call(this);
            this.maxElementHeight =
                this.maxElementWidth = 0
        };
        a.prototype.scrollPositionChanged = function() {
            d.prototype.scrollPositionChanged.call(this);
            this.useVirtualLayout && this.getIndexInView() && (this.indexInViewCalculated = !0, this.target.invalidateDisplayList())
        };
        a.prototype.getIndexInView = function() {
            if (!this.target || 0 == this.target.numElements) return this.startIndex = this.endIndex = -1, !1;
            var a = this.target.numElements;
            if (!this.useVirtualLayout) return this.startIndex = 0, this.endIndex = a - 1, !1;
            if (isNaN(this.target.width) || 0 == this.target.width ||
                isNaN(this.target.height) || 0 == this.target.height) return this.startIndex = this.endIndex = -1, !1;
            var d = this.startIndex,
                e = this.endIndex,
                m = isNaN(this._padding) ? 0 : this._padding,
                f = isNaN(this._paddingLeft) ? m : this._paddingLeft,
                m = isNaN(this._paddingTop) ? m : this._paddingTop,
                g = isNaN(this._horizontalGap) ? 0 : this._horizontalGap,
                k = isNaN(this._verticalGap) ? 0 : this._verticalGap;
            if (this.orientation == c.TileOrientation.COLUMNS) {
                g = this._columnWidth + g;
                if (0 >= g) return this.startIndex = 0, this.endIndex = a - 1, !1;
                k = this.target.horizontalScrollPosition +
                    this.target.width;
                m = Math.floor((this.target.horizontalScrollPosition - f) / g);
                0 > m && (m = 0);
                f = Math.ceil((k - f) / g);
                0 > f && (f = 0);
                this.startIndex = Math.min(a - 1, Math.max(0, m * this._rowCount));
                this.endIndex = Math.min(a - 1, Math.max(0, f * this._rowCount - 1))
            } else {
                g = this._rowHeight + k;
                if (0 >= g) return this.startIndex = 0, this.endIndex = a - 1, !1;
                k = this.target.verticalScrollPosition + this.target.height;
                f = Math.floor((this.target.verticalScrollPosition - m) / g);
                0 > f && (f = 0);
                m = Math.ceil((k - m) / g);
                0 > m && (m = 0);
                this.startIndex = Math.min(a - 1, Math.max(0,
                    f * this._columnCount));
                this.endIndex = Math.min(a - 1, Math.max(0, m * this._columnCount - 1))
            }
            return this.startIndex != d || this.endIndex != e
        };
        a.prototype.updateDisplayList = function(a, e) {
            d.prototype.updateDisplayList.call(this, a, e);
            if (this.target) {
                var l = isNaN(this._padding) ? 0 : this._padding,
                    m = isNaN(this._paddingLeft) ? l : this._paddingLeft,
                    f = isNaN(this._paddingRight) ? l : this._paddingRight,
                    g = isNaN(this._paddingTop) ? l : this._paddingTop,
                    k = isNaN(this._paddingBottom) ? l : this._paddingBottom,
                    l = isNaN(this._horizontalGap) ? 0 : this._horizontalGap,
                    n = isNaN(this._verticalGap) ? 0 : this._verticalGap;
                if (this.indexInViewCalculated) this.indexInViewCalculated = !1;
                else {
                    this.calculateRowAndColumn(a, e);
                    if (0 == this._rowCount || 0 == this._columnCount) {
                        this.target.setContentSize(m + f, g + k);
                        return
                    }
                    this.adjustForJustify(a, e);
                    this.getIndexInView()
                }
                this.useVirtualLayout && (this.calculateRowAndColumn(a, e), this.adjustForJustify(a, e));
                if (-1 == this.startIndex || -1 == this.endIndex) this.target.setContentSize(0, 0);
                else {
                    this.target.setVirtualElementIndicesInView(this.startIndex,
                        this.endIndex);
                    for (var p, q, r, s = this.orientation == c.TileOrientation.COLUMNS, z = this.startIndex, A = this.startIndex; A <= this.endIndex; A++) p = this.useVirtualLayout ? this.target.getVirtualElementAt(A) : this.target.getElementAt(A), null != p && p.includeInLayout && (s ? (q = Math.ceil((z + 1) / this._rowCount) - 1, r = Math.ceil((z + 1) % this._rowCount) - 1, -1 == r && (r = this._rowCount - 1)) : (q = Math.ceil((z + 1) % this._columnCount) - 1, -1 == q && (q = this._columnCount - 1), r = Math.ceil((z + 1) / this._columnCount) - 1), q = q * (this._columnWidth + l) + m, r = r * (this._rowHeight +
                        n) + g, this.sizeAndPositionElement(p, q, r, this._columnWidth, this.rowHeight), z++);
                    g += k;
                    n = (this._rowHeight + n) * this._rowCount - n;
                    this.target.setContentSize(Math.ceil((this._columnWidth + l) * this._columnCount - l + (m + f)), Math.ceil(n + g))
                }
            }
        };
        a.prototype.sizeAndPositionElement = function(a, d, e, m, f) {
            var g = NaN,
                k = NaN;
            this.horizontalAlign == c.HorizontalAlign.JUSTIFY ? g = m : isNaN(a.percentWidth) || (g = m * a.percentWidth * 0.01);
            this.verticalAlign == c.VerticalAlign.JUSTIFY ? k = f : isNaN(a.percentHeight) || (k = f * a.percentHeight * 0.01);
            a.setLayoutBoundsSize(Math.round(g),
                Math.round(k));
            g = d;
            switch (this.horizontalAlign) {
                case c.HorizontalAlign.RIGHT:
                    g += m - a.layoutBoundsWidth;
                    break;
                case c.HorizontalAlign.CENTER:
                    g = d + (m - a.layoutBoundsWidth) / 2
            }
            d = e;
            switch (this.verticalAlign) {
                case c.VerticalAlign.BOTTOM:
                    d += f - a.layoutBoundsHeight;
                    break;
                case c.VerticalAlign.MIDDLE:
                    d += (f - a.layoutBoundsHeight) / 2
            }
            a.setLayoutBoundsPosition(Math.round(g), Math.round(d))
        };
        a.prototype.adjustForJustify = function(a, d) {
            var e = isNaN(this._padding) ? 0 : this._padding,
                m = isNaN(this._paddingLeft) ? e : this._paddingLeft,
                f = isNaN(this._paddingRight) ? e : this._paddingRight,
                g = isNaN(this._paddingTop) ? e : this._paddingTop,
                e = isNaN(this._paddingBottom) ? e : this._paddingBottom,
                m = Math.max(0, a - m - f),
                g = Math.max(0, d - g - e);
            isNaN(this.explicitVerticalGap) || (this._verticalGap = this.explicitVerticalGap);
            isNaN(this.explicitHorizontalGap) || (this._horizontalGap = this.explicitHorizontalGap);
            this._verticalGap = isNaN(this._verticalGap) ? 0 : this._verticalGap;
            this._horizontalGap = isNaN(this._horizontalGap) ? 0 : this._horizontalGap;
            g -= this._rowHeight * this._rowCount;
            m -= this._columnWidth * this._columnCount;
            0 < g && (this.rowAlign == c.RowAlign.JUSTIFY_USING_GAP ? (f = Math.max(1, this._rowCount - 1), this._verticalGap = g / f) : this.rowAlign == c.RowAlign.JUSTIFY_USING_HEIGHT && 0 < this._rowCount && (this._rowHeight += (g - (this._rowCount - 1) * this._verticalGap) / this._rowCount));
            0 < m && (this.columnAlign == c.ColumnAlign.JUSTIFY_USING_GAP ? (f = Math.max(1, this._columnCount - 1), this._horizontalGap = m / f) : this.columnAlign == c.ColumnAlign.JUSTIFY_USING_WIDTH && 0 < this._columnCount && (this._columnWidth += (m - (this._columnCount -
                1) * this._horizontalGap) / this._columnCount))
        };
        return a
    }(c.LayoutBase);
    c.TileLayout = e
})(egret || (egret = {}));
(function(c) {
    var e = function() {
        function c(a, b, d) {
            this.raw_getElementAt = "raw_getElementAt";
            this.raw_addElementAt = "raw_addElementAt";
            this.raw_getElementIndex = "raw_getElementIndex";
            this.raw_removeElement = "raw_removeElement";
            this.raw_removeElementAt = "raw_removeElementAt";
            this.raw_setElementIndex = "raw_setElementIndex";
            this.owner = a;
            this.lowerBoundReference = b;
            this.upperBoundReference = d
        }
        Object.defineProperty(c.prototype, "numElements", {
            get: function() {
                return this.owner[this.upperBoundReference] - this.owner[this.lowerBoundReference]
            },
            enumerable: !0,
            configurable: !0
        });
        c.prototype.getElementAt = function(a) {
            return this.owner[this.raw_getElementAt](this.owner[this.lowerBoundReference] + a)
        };
        c.prototype.addElement = function(a) {
            var b = this.owner[this.upperBoundReference];
            a.parent === this.owner && b--;
            this.owner[this.upperBoundReference]++;
            this.owner[this.raw_addElementAt](a, b);
            a.ownerChanged(this);
            return a
        };
        c.prototype.addElementAt = function(a, b) {
            this.owner[this.upperBoundReference]++;
            this.owner[this.raw_addElementAt](a, this.owner[this.lowerBoundReference] +
                b);
            a.ownerChanged(this);
            return a
        };
        c.prototype.removeElement = function(a) {
            var b = this.owner[this.raw_getElementIndex](a);
            this.owner[this.lowerBoundReference] <= b && b < this.owner[this.upperBoundReference] && (this.owner[this.raw_removeElement](a), this.owner[this.upperBoundReference]--);
            a.ownerChanged(null);
            return a
        };
        c.prototype.removeElementAt = function(a) {
            a += this.owner[this.lowerBoundReference];
            var b;
            this.owner[this.lowerBoundReference] <= a && a < this.owner[this.upperBoundReference] && (b = this.owner[this.raw_removeElementAt](a),
                this.owner[this.upperBoundReference]--);
            b.ownerChanged(null);
            return b
        };
        c.prototype.getElementIndex = function(a) {
            a = this.owner[this.raw_getElementIndex](a);
            return a -= this.owner[this.lowerBoundReference]
        };
        c.prototype.setElementIndex = function(a, b) {
            this.owner[this.raw_setElementIndex](a, this.owner[this.lowerBoundReference] + b)
        };
        return c
    }();
    c.UILayer = e
})(egret || (egret = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(d) {
        function a() {
            d.call(this);
            this._autoResize = !0;
            this._cursorIndex = this._toolTipIndex = this._topMostIndex = this._noTopMostIndex = 0;
            this.addEventListener(c.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.addEventListener(c.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this)
        }
        __extends(a, d);
        a.prototype.onAddToStage = function(a) {
            if (c.UIGlobals._uiStage) throw Error("UIStage\u662fGUI\u6839\u5bb9\u5668\uff0c\u53ea\u80fd\u6709\u4e00\u4e2a\u6b64\u5b9e\u4f8b\u5728\u663e\u793a\u5217\u8868\u4e2d\uff01");
            c.UIGlobals._uiStage = this;
            this._autoResize && (this.stage.addEventListener(c.Event.RESIZE, this.onResize, this), this.onResize())
        };
        a.prototype.onRemoveFromStage = function(a) {
            c.UIGlobals._uiStage = null;
            this._autoResize && this.stage.removeEventListener(c.Event.RESIZE, this.onResize, this)
        };
        a.prototype.onResize = function(a) {
            this._setWidth(this.stage.stageWidth);
            this._setHeight(this.stage.stageHeight)
        };
        Object.defineProperty(a.prototype, "autoResize", {
            get: function() {
                return this._autoResize
            },
            set: function(a) {
                this._autoResize !=
                    a && (this._autoResize = a, this.stage && (this._autoResize ? (this.stage.addEventListener(c.Event.RESIZE, this.onResize, this), this.onResize()) : this.stage.removeEventListener(c.Event.RESIZE, this.onResize, this)))
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "x", {
            get: function() {
                return this._x
            },
            set: function(a) {
                this._autoResize || (this._x = a)
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "y", {
            get: function() {
                return this._y
            },
            set: function(a) {
                this._autoResize || (this._y = a)
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "width", {
            get: function() {
                return this._width
            },
            set: function(a) {
                this._autoResize || this._setWidth(a)
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "height", {
            get: function() {
                return this._height
            },
            set: function(a) {
                this._autoResize || this._setHeight(a)
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "scaleX", {
            get: function() {
                return this._scaleX
            },
            set: function(a) {
                this._autoResize || this._setScaleX(a)
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "scaleY", {
            get: function() {
                return this._scaleY
            },
            set: function(a) {
                this._autoResize || this._setScaleY(a)
            },
            enumerable: !0,
            configurable: !0
        });
        a.prototype.setActualSize = function(a, c) {
            this._autoResize || d.prototype.setActualSize.call(this, a, c)
        };
        a.prototype.setLayoutBoundsPosition = function(a, c) {
            this._autoResize || d.prototype.setLayoutBoundsPosition.call(this, a, c)
        };
        a.prototype.setLayoutBoundsSize = function(a, c) {
            this._autoResize || d.prototype.setLayoutBoundsSize.call(this,
                a, c)
        };
        Object.defineProperty(a.prototype, "layout", {
            get: function() {
                return this._layout
            },
            set: function(a) {
                a instanceof c.BasicLayout && this._setLayout(a)
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "popUpContainer", {
            get: function() {
                this._popUpContainer || (this._popUpContainer = new c.UILayer(this, "noTopMostIndex", "topMostIndex"));
                return this._popUpContainer
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "toolTipContainer", {
            get: function() {
                this._toolTipContainer || (this._toolTipContainer =
                    new c.UILayer(this, "topMostIndex", "toolTipIndex"));
                return this._toolTipContainer
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "cursorContainer", {
            get: function() {
                this._cursorContainer || (this._cursorContainer = new c.UILayer(this, "toolTipIndex", "cursorIndex"));
                return this._cursorContainer
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "noTopMostIndex", {
            get: function() {
                return this._noTopMostIndex
            },
            set: function(a) {
                var c = a - this._noTopMostIndex;
                this._noTopMostIndex =
                    a;
                this.topMostIndex += c
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "topMostIndex", {
            get: function() {
                return this._topMostIndex
            },
            set: function(a) {
                var c = a - this._topMostIndex;
                this._topMostIndex = a;
                this.toolTipIndex += c
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype, "toolTipIndex", {
            get: function() {
                return this._toolTipIndex
            },
            set: function(a) {
                var c = a - this._toolTipIndex;
                this._toolTipIndex = a;
                this.cursorIndex += c
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(a.prototype,
            "cursorIndex", {
                get: function() {
                    return this._cursorIndex
                },
                set: function(a) {
                    this._cursorIndex = a
                },
                enumerable: !0,
                configurable: !0
            });
        a.prototype.addElement = function(a) {
            var c = this._noTopMostIndex;
            a.parent == this && c--;
            return this.addElementAt(a, c)
        };
        a.prototype.addElementAt = function(a, c) {
            if (a.parent == this) {
                var e = this.getElementIndex(a);
                e < this._noTopMostIndex ? this.noTopMostIndex-- : e >= this._noTopMostIndex && e < this._topMostIndex ? this.topMostIndex-- : e >= this._topMostIndex && e < this._toolTipIndex ? this.toolTipIndex-- :
                    this.cursorIndex--
            }
            c <= this._noTopMostIndex ? this.noTopMostIndex++ : c > this._noTopMostIndex && c <= this._topMostIndex ? this.topMostIndex++ : c > this._topMostIndex && c <= this._toolTipIndex ? this.toolTipIndex++ : this.cursorIndex++;
            return d.prototype.addElementAt.call(this, a, c)
        };
        a.prototype.removeElement = function(a) {
            return this.removeElementAt(d.prototype.getElementIndex.call(this, a))
        };
        a.prototype.removeElementAt = function(a) {
            var c = d.prototype.removeElementAt.call(this, a);
            a < this._noTopMostIndex ? this.noTopMostIndex-- :
                a >= this._noTopMostIndex && a < this._topMostIndex ? this.topMostIndex-- : a >= this._topMostIndex && a < this._toolTipIndex ? this.toolTipIndex-- : this.cursorIndex--;
            return c
        };
        a.prototype.removeAllElements = function() {
            for (; 0 < this._noTopMostIndex;) d.prototype.removeElementAt.call(this, 0), this.noTopMostIndex--
        };
        a.prototype._elementRemoved = function(a, e, l) {
            "undefined" === typeof l && (l = !0);
            l && c.Event.dispatchEvent(a, "removeFromUIStage");
            d.prototype._elementRemoved.call(this, a, e, l)
        };
        a.prototype.raw_getElementAt = function(a) {
            return d.prototype.getElementAt.call(this,
                a)
        };
        a.prototype.raw_addElement = function(a) {
            var c = this.numElements;
            a.parent == this && c--;
            return this.raw_addElementAt(a, c)
        };
        a.prototype.raw_addElementAt = function(a, c) {
            if (a.parent == this) {
                var e = this.getElementIndex(a);
                e < this._noTopMostIndex ? this.noTopMostIndex-- : e >= this._noTopMostIndex && e < this._topMostIndex ? this.topMostIndex-- : e >= this._topMostIndex && e < this._toolTipIndex ? this.toolTipIndex-- : this.cursorIndex--
            }
            return d.prototype.addElementAt.call(this, a, c)
        };
        a.prototype.raw_removeElement = function(a) {
            return d.prototype.removeElementAt.call(this,
                d.prototype.getElementIndex.call(this, a))
        };
        a.prototype.raw_removeElementAt = function(a) {
            return d.prototype.removeElementAt.call(this, a)
        };
        a.prototype.raw_removeAllElements = function() {
            for (; 0 < this.numElements;) d.prototype.removeElementAt.call(this, 0)
        };
        a.prototype.raw_getElementIndex = function(a) {
            return d.prototype.getElementIndex.call(this, a)
        };
        a.prototype.raw_setElementIndex = function(a, c) {
            d.prototype.setElementIndex.call(this, a, c)
        };
        a.prototype.raw_swapElements = function(a, c) {
            d.prototype.swapElementsAt.call(this,
                d.prototype.getElementIndex.call(this, a), d.prototype.getElementIndex.call(this, c))
        };
        a.prototype.raw_swapElementsAt = function(a, c) {
            d.prototype.swapElementsAt.call(this, a, c)
        };
        return a
    }(c.Group);
    c.UIStage = e
})(egret || (egret = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(a) {
        function b() {
            a.call(this);
            this._popUpList = [];
            this.popUpDataList = [];
            this._modalColor = 0;
            this._modalAlpha = 0.5;
            this.invalidateModalFlag = !1
        }
        __extends(b, a);
        Object.defineProperty(b.prototype, "popUpList", {
            get: function() {
                return this._popUpList.concat()
            },
            enumerable: !0,
            configurable: !0
        });
        b.prototype.findPopUpData = function(a) {
            for (var b = this.popUpDataList, c = b.length, d = 0; d < c; d++) {
                var e = b[d];
                if (e.popUp == a) return e
            }
            return null
        };
        b.prototype.addPopUp = function(a, e, m) {
            "undefined" === typeof e &&
                (e = !1);
            "undefined" === typeof m && (m = !0);
            var f = c.UIGlobals.uiStage,
                g = this.findPopUpData(a);
            g ? (g.modal = e, a.removeEventListener(b.REMOVE_FROM_UISTAGE, this.onRemoved, this)) : (g = new d(a, e), this.popUpDataList.push(g), this._popUpList.push(a));
            f.popUpContainer.addElement(a);
            m && this.centerPopUp(a);
            "isPopUp" in a && (a.isPopUp = !0);
            e && this.invalidateModal();
            a.addEventListener(b.REMOVE_FROM_UISTAGE, this.onRemoved, this)
        };
        b.prototype.onRemoved = function(a) {
            for (var c = 0, d = this.popUpDataList, e = d.length, g = 0; g < e; g++) {
                var k =
                    d[g];
                if (k.popUp == a.target) {
                    "isPopUp" in k.popUp && (k.popUp.isPopUp = !1);
                    k.popUp.removeEventListener(b.REMOVE_FROM_UISTAGE, this.onRemoved, this);
                    this.popUpDataList.splice(c, 1);
                    this._popUpList.splice(c, 1);
                    this.invalidateModal();
                    break
                }
                c++
            }
        };
        Object.defineProperty(b.prototype, "modalColor", {
            get: function() {
                return this._modalColor
            },
            set: function(a) {
                this._modalColor != a && (this._modalColor = a, this.invalidateModal())
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(b.prototype, "modalAlpha", {
            get: function() {
                return this._modalAlpha
            },
            set: function(a) {
                this._modalAlpha != a && (this._modalAlpha = a, this.invalidateModal())
            },
            enumerable: !0,
            configurable: !0
        });
        b.prototype.invalidateModal = function() {
            this.invalidateModalFlag || (this.invalidateModalFlag = !0, c.UIGlobals.stage.addEventListener(c.Event.ENTER_FRAME, this.validateModal, this), c.UIGlobals.stage.addEventListener(c.Event.RENDER, this.validateModal, this), c.UIGlobals.stage.invalidate())
        };
        b.prototype.validateModal = function(a) {
            this.invalidateModalFlag = !1;
            c.UIGlobals.stage.removeEventListener(c.Event.ENTER_FRAME,
                this.validateModal, this);
            c.UIGlobals.stage.removeEventListener(c.Event.RENDER, this.validateModal, this);
            this.updateModal(c.UIGlobals.uiStage)
        };
        b.prototype.updateModal = function(a) {
            for (var b = a.popUpContainer, d = !1, e = b.numElements - 1; 0 <= e; e--) {
                var g = b.getElementAt(e);
                if ((g = this.findPopUpData(g)) && g.modal) {
                    d = !0;
                    break
                }
            }
            d ? (this.modalMask || (this.modalMask = new c.Rect, this.modalMask.touchEnabled = !0, this.modalMask.top = this.modalMask.left = this.modalMask.right = this.modalMask.bottom = 0), this.modalMask.fillColor = this._modalColor,
                this.modalMask.alpha = this._modalAlpha, this.modalMask.parent == a ? (b.getElementIndex(this.modalMask) < e && e--, b.setElementIndex(this.modalMask, e)) : b.addElementAt(this.modalMask, e)) : this.modalMask && this.modalMask.parent == a && b.removeElement(this.modalMask)
        };
        b.prototype.removePopUp = function(a) {
            a && a.parent && this.findPopUpData(a) && ("removeElement" in a.parent ? a.parent.removeElement(a) : a.parent instanceof c.UIComponent ? a.parent._removeFromDisplayList(a) : a instanceof c.DisplayObject && a.parent.removeChild(a))
        };
        b.prototype.centerPopUp = function(a) {
            a.top = a.bottom = a.left = a.right = NaN;
            a.verticalCenter = a.horizontalCenter = 0;
            var b = a.parent;
            b && ("validateNow" in a && a.validateNow(), a.x = 0.5 * (b.width - a.layoutBoundsWidth), a.y = 0.5 * (b.height - a.layoutBoundsHeight))
        };
        b.prototype.bringToFront = function(a) {
            if (this.findPopUpData(a) && a.parent && "popUpContainer" in a.parent) {
                var b = a.parent;
                b.popUpContainer.setElementIndex(a, b.popUpContainer.numElements - 1);
                this.invalidateModal()
            }
        };
        b.REMOVE_FROM_UISTAGE = "removeFromUIStage";
        return b
    }(c.EventDispatcher);
    c.PopUpManagerImpl = e;
    var d = function() {
        return function(a, b) {
            this.popUp = a;
            this.modal = b
        }
    }()
})(egret || (egret = {}));
(function(c) {
    var e = function() {
        function d() {}
        d.getImpl = function() {
            if (!d._impl) try {
                d._impl = c.Injector.getInstance("egret.IPopUpManager")
            } catch (a) {
                d._impl = new c.PopUpManagerImpl
            }
            return d._impl
        };
        Object.defineProperty(d.prototype, "modalColor", {
            get: function() {
                return d.getImpl().modalColor
            },
            set: function(a) {
                d.getImpl().modalColor = a
            },
            enumerable: !0,
            configurable: !0
        });
        Object.defineProperty(d.prototype, "modalAlpha", {
            get: function() {
                return d.getImpl().modalAlpha
            },
            set: function(a) {
                d.getImpl().modalAlpha = a
            },
            enumerable: !0,
            configurable: !0
        });
        d.addPopUp = function(a, b, e) {
            "undefined" === typeof b && (b = !1);
            "undefined" === typeof e && (e = !0);
            d.getImpl().addPopUp(a, b, e);
            c.PopUpEvent.dispatchPopUpEvent(d.getImpl(), c.PopUpEvent.ADD_POPUP, a, b)
        };
        d.removePopUp = function(a) {
            d.getImpl().removePopUp(a);
            c.PopUpEvent.dispatchPopUpEvent(d.getImpl(), c.PopUpEvent.REMOVE_POPUP, a)
        };
        d.centerPopUp = function(a) {
            d.getImpl().centerPopUp(a)
        };
        d.bringToFront = function(a) {
            d.getImpl().bringToFront(a);
            c.PopUpEvent.dispatchPopUpEvent(d.getImpl(), c.PopUpEvent.BRING_TO_FRONT,
                a)
        };
        Object.defineProperty(d, "popUpList", {
            get: function() {
                return d.getImpl().popUpList
            },
            enumerable: !0,
            configurable: !0
        });
        d.addEventListener = function(a, b, c, e, m) {
            "undefined" === typeof e && (e = !1);
            "undefined" === typeof m && (m = 0);
            d.getImpl().addEventListener(a, b, this, e, m)
        };
        d.removeEventListener = function(a, b, c, e) {
            "undefined" === typeof e && (e = !1);
            d.getImpl().removeEventListener(a, b, c, e)
        };
        return d
    }();
    c.PopUpManager = e
})(egret || (egret = {}));
var __extends = this.__extends || function(c, e) {
        function d() {
            this.constructor = c
        }
        for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
        d.prototype = e.prototype;
        c.prototype = new d
    },
    dragonBones;
(function(c) {
    (function(a) {
        var b = function() {
            function a(b, c) {
                "undefined" === typeof b && (b = 0);
                "undefined" === typeof c && (c = 0);
                this.x = b;
                this.y = c
            }
            a.prototype.toString = function() {
                return "[Point (x=" + this.x + " y=" + this.y + ")]"
            };
            return a
        }();
        a.Point = b;
        b = function() {
            return function(a, b, c, d) {
                "undefined" === typeof a && (a = 0);
                "undefined" === typeof b && (b = 0);
                "undefined" === typeof c && (c = 0);
                "undefined" === typeof d && (d = 0);
                this.x = a;
                this.y = b;
                this.width = c;
                this.height = d
            }
        }();
        a.Rectangle = b;
        b = function() {
            function a() {
                this.a = 1;
                this.c = this.b =
                    0;
                this.d = 1;
                this.ty = this.tx = 0
            }
            a.prototype.invert = function() {
                var a = this.a,
                    b = this.b,
                    c = this.c,
                    d = this.d,
                    e = this.tx,
                    h = a * d - b * c;
                this.a = d / h;
                this.b = -b / h;
                this.c = -c / h;
                this.d = a / h;
                this.tx = (c * this.ty - d * e) / h;
                this.ty = -(a * this.ty - b * e) / h
            };
            return a
        }();
        a.Matrix = b;
        b = function() {
            return function() {
                this.redOffset = this.redMultiplier = this.greenOffset = this.greenMultiplier = this.blueOffset = this.blueMultiplier = this.alphaOffset = this.alphaMultiplier = 0
            }
        }();
        a.ColorTransform = b
    })(c.geom || (c.geom = {}));
    var e = c.geom;
    (function(a) {
        var b = function() {
            return function(a) {
                this.type =
                    a
            }
        }();
        a.Event = b;
        var c = function(a) {
            function b(c) {
                a.call(this, c)
            }
            __extends(b, a);
            b.FADE_IN = "fadeIn";
            b.FADE_OUT = "fadeOut";
            b.START = "start";
            b.COMPLETE = "complete";
            b.LOOP_COMPLETE = "loopComplete";
            b.FADE_IN_COMPLETE = "fadeInComplete";
            b.FADE_OUT_COMPLETE = "fadeOutComplete";
            return b
        }(b);
        a.AnimationEvent = c;
        c = function(a) {
            function b(c) {
                a.call(this, c)
            }
            __extends(b, a);
            b.Z_ORDER_UPDATED = "zOrderUpdated";
            return b
        }(b);
        a.ArmatureEvent = c;
        c = function(a) {
            function b(c) {
                a.call(this, c)
            }
            __extends(b, a);
            b.ANIMATION_FRAME_EVENT = "animationFrameEvent";
            b.BONE_FRAME_EVENT = "boneFrameEvent";
            return b
        }(b);
        a.FrameEvent = c;
        b = function(a) {
            function b(c) {
                a.call(this, c)
            }
            __extends(b, a);
            b.SOUND = "sound";
            b.BONE_FRAME_EVENT = "boneFrameEvent";
            return b
        }(b);
        a.SoundEvent = b;
        b = function() {
            function a() {}
            a.prototype.hasEventListener = function(a) {
                return this._listenersMap && this._listenersMap[a] ? !0 : !1
            };
            a.prototype.addEventListener = function(a, b) {
                if (a && b) {
                    this._listenersMap || (this._listenersMap = {});
                    var c = this._listenersMap[a];
                    c && this.removeEventListener(a, b);
                    c ? c.push(b) : this._listenersMap[a] = [b]
                }
            };
            a.prototype.removeEventListener = function(a, b) {
                if (this._listenersMap && a && b) {
                    var c = this._listenersMap[a];
                    if (c)
                        for (var d = c.length, e = 0; e < d; e++) c[e] == b && (1 == d ? (c.length = 0, delete this._listenersMap[a]) : c.splice(e, 1))
                }
            };
            a.prototype.removeAllEventListeners = function(a) {
                a ? delete this._listenersMap[a] : this._listenersMap = null
            };
            a.prototype.dispatchEvent = function(a) {
                if (a) {
                    var b = this._listenersMap[a.type];
                    if (b) {
                        a.target = this;
                        for (var c = b.concat(), b = b.length, d = 0; d < b; d++) c[d](a)
                    }
                }
            };
            return a
        }();
        a.EventDispatcher =
            b;
        b = function(a) {
            function b() {
                a.call(this);
                if (b._instance) throw Error("Singleton already constructed!");
            }
            __extends(b, a);
            b.getInstance = function() {
                b._instance || (b._instance = new b);
                return b._instance
            };
            return b
        }(b);
        a.SoundEventManager = b
    })(c.events || (c.events = {}));
    var d = c.events;
    (function(a) {
        var c = function() {
            function a() {
                this.timeScale = 1;
                this.time = 0.001 * (new Date).getTime();
                this._animatableList = []
            }
            a.prototype.contains = function(a) {
                return 0 <= this._animatableList.indexOf(a)
            };
            a.prototype.add = function(a) {
                a &&
                    -1 == this._animatableList.indexOf(a) && this._animatableList.push(a)
            };
            a.prototype.remove = function(a) {
                a = this._animatableList.indexOf(a);
                0 <= a && (this._animatableList[a] = null)
            };
            a.prototype.clear = function() {
                this._animatableList.length = 0
            };
            a.prototype.advanceTime = function(a) {
                if (0 > a) {
                    var b = 0.001 * (new Date).getTime();
                    a = b - this.time;
                    this.time = b
                }
                a *= this.timeScale;
                b = this._animatableList.length;
                if (0 != b) {
                    for (var c = 0, d = 0; d < b; d++) {
                        var e = this._animatableList[d];
                        e && (c != d && (this._animatableList[c] = e, this._animatableList[d] =
                            null), e.advanceTime(a), c++)
                    }
                    if (c != d) {
                        for (b = this._animatableList.length; d < b;) this._animatableList[c++] = this._animatableList[d++];
                        this._animatableList.length = c
                    }
                }
            };
            a.clock = new a;
            return a
        }();
        a.WorldClock = c;
        var l = function() {
            function a() {
                this.transform = new b.DBTransform;
                this.pivot = new e.Point;
                this._durationTransform = new b.DBTransform;
                this._durationPivot = new e.Point;
                this._durationColor = new e.ColorTransform
            }
            a._borrowObject = function() {
                return 0 == a._pool.length ? new a : a._pool.pop()
            };
            a._returnObject = function(b) {
                0 >
                    a._pool.indexOf(b) && (a._pool[a._pool.length] = b);
                b.clear()
            };
            a._clear = function() {
                for (var b = a._pool.length; b--;) a._pool[b].clear();
                a._pool.length = 0
            };
            a.getEaseValue = function(b, c) {
                if (1 < c) {
                    var d = 0.5 * (1 - Math.cos(b * Math.PI)) - b;
                    c -= 1
                } else 0 < c ? d = Math.sin(b * a.HALF_PI) - b : 0 > c && (d = 1 - Math.cos(b * a.HALF_PI) - b, c *= -1);
                return d * c + b
            };
            a.prototype.fadeIn = function(a, b, c) {
                this._bone = a;
                this._animationState = b;
                this._timeline = c;
                this._originTransform = this._timeline.originTransform;
                this._originPivot = this._timeline.originPivot;
                this._tweenColor =
                    this._tweenTransform = !1;
                this._totalTime = this._animationState.totalTime;
                this.transform.x = 0;
                this.transform.y = 0;
                this.transform.scaleX = 0;
                this.transform.scaleY = 0;
                this.transform.skewX = 0;
                this.transform.skewY = 0;
                this.pivot.x = 0;
                this.pivot.y = 0;
                this._durationTransform.x = 0;
                this._durationTransform.y = 0;
                this._durationTransform.scaleX = 0;
                this._durationTransform.scaleY = 0;
                this._durationTransform.skewX = 0;
                this._durationTransform.skewY = 0;
                this._durationPivot.x = 0;
                this._durationPivot.y = 0;
                this._currentFrame = null;
                switch (this._timeline.getFrameList().length) {
                    case 0:
                        this._bone._arriveAtFrame(null,
                            this, this._animationState, !1);
                        this._updateState = 0;
                        break;
                    case 1:
                        this._updateState = -1;
                        break;
                    default:
                        this._updateState = 1
                }
            };
            a.prototype.fadeOut = function() {
                this.transform.skewX = h.TransformUtil.formatRadian(this.transform.skewX);
                this.transform.skewY = h.TransformUtil.formatRadian(this.transform.skewY)
            };
            a.prototype.update = function(b) {
                if (this._updateState)
                    if (0 < this._updateState) {
                        b = 0 == this._timeline.scale ? 1 : b / this._timeline.scale;
                        1 == b && (b = 0.99999999);
                        b += this._timeline.offset;
                        var c = Math.floor(b);
                        b -= c;
                        for (var d =
                            this._totalTime * b, e = !1, l; !this._currentFrame || d > this._currentFramePosition + this._currentFrameDuration || d < this._currentFramePosition;) e && this._bone._arriveAtFrame(this._currentFrame, this, this._animationState, !0), e = !0, this._currentFrame ? (l = this._timeline.getFrameList().indexOf(this._currentFrame) + 1, l >= this._timeline.getFrameList().length && (l = 0), this._currentFrame = this._timeline.getFrameList()[l]) : (l = 0, this._currentFrame = this._timeline.getFrameList()[0]), this._currentFrameDuration = this._currentFrame.duration,
                            this._currentFramePosition = this._currentFrame.position;
                        e && (this.tweenActive = 0 <= this._currentFrame.displayIndex, l++, l >= this._timeline.getFrameList().length && (l = 0), e = this._timeline.getFrameList()[l], 0 == l && this._animationState.loop && this._animationState.loopCount >= Math.abs(this._animationState.loop) - 1 && 0.99999999 < ((this._currentFramePosition + this._currentFrameDuration) / this._totalTime + c - this._timeline.offset) * this._timeline.scale ? (this._updateState = 0, this._tweenEasing = NaN) : 0 > this._currentFrame.displayIndex ||
                            0 > e.displayIndex || !this._animationState.tweenEnabled ? this._tweenEasing = NaN : isNaN(this._animationState.clip.tweenEasing) ? this._tweenEasing = this._currentFrame.tweenEasing : this._tweenEasing = this._animationState.clip.tweenEasing, isNaN(this._tweenEasing) ? this._tweenColor = this._tweenTransform = !1 : (this._durationTransform.x = e.transform.x - this._currentFrame.transform.x, this._durationTransform.y = e.transform.y - this._currentFrame.transform.y, this._durationTransform.skewX = e.transform.skewX - this._currentFrame.transform.skewX,
                                this._durationTransform.skewY = e.transform.skewY - this._currentFrame.transform.skewY, this._durationTransform.scaleX = e.transform.scaleX - this._currentFrame.transform.scaleX, this._durationTransform.scaleY = e.transform.scaleY - this._currentFrame.transform.scaleY, 0 == l && (this._durationTransform.skewX = h.TransformUtil.formatRadian(this._durationTransform.skewX), this._durationTransform.skewY = h.TransformUtil.formatRadian(this._durationTransform.skewY)), this._durationPivot.x = e.pivot.x - this._currentFrame.pivot.x,
                                this._durationPivot.y = e.pivot.y - this._currentFrame.pivot.y, this._tweenTransform = 0 != this._durationTransform.x || 0 != this._durationTransform.y || 0 != this._durationTransform.skewX || 0 != this._durationTransform.skewY || 0 != this._durationTransform.scaleX || 0 != this._durationTransform.scaleY || 0 != this._durationPivot.x || 0 != this._durationPivot.y ? !0 : !1, this._currentFrame.color && e.color ? (this._durationColor.alphaOffset = e.color.alphaOffset - this._currentFrame.color.alphaOffset, this._durationColor.redOffset = e.color.redOffset -
                                    this._currentFrame.color.redOffset, this._durationColor.greenOffset = e.color.greenOffset - this._currentFrame.color.greenOffset, this._durationColor.blueOffset = e.color.blueOffset - this._currentFrame.color.blueOffset, this._durationColor.alphaMultiplier = e.color.alphaMultiplier - this._currentFrame.color.alphaMultiplier, this._durationColor.redMultiplier = e.color.redMultiplier - this._currentFrame.color.redMultiplier, this._durationColor.greenMultiplier = e.color.greenMultiplier - this._currentFrame.color.greenMultiplier,
                                    this._durationColor.blueMultiplier = e.color.blueMultiplier - this._currentFrame.color.blueMultiplier, this._tweenColor = 0 != this._durationColor.alphaOffset || 0 != this._durationColor.redOffset || 0 != this._durationColor.greenOffset || 0 != this._durationColor.blueOffset || 0 != this._durationColor.alphaMultiplier || 0 != this._durationColor.redMultiplier || 0 != this._durationColor.greenMultiplier || 0 != this._durationColor.blueMultiplier ? !0 : !1) : this._currentFrame.color ? (this._tweenColor = !0, this._durationColor.alphaOffset = -this._currentFrame.color.alphaOffset,
                                    this._durationColor.redOffset = -this._currentFrame.color.redOffset, this._durationColor.greenOffset = -this._currentFrame.color.greenOffset, this._durationColor.blueOffset = -this._currentFrame.color.blueOffset, this._durationColor.alphaMultiplier = 1 - this._currentFrame.color.alphaMultiplier, this._durationColor.redMultiplier = 1 - this._currentFrame.color.redMultiplier, this._durationColor.greenMultiplier = 1 - this._currentFrame.color.greenMultiplier, this._durationColor.blueMultiplier = 1 - this._currentFrame.color.blueMultiplier) :
                                e.color ? (this._tweenColor = !0, this._durationColor.alphaOffset = e.color.alphaOffset, this._durationColor.redOffset = e.color.redOffset, this._durationColor.greenOffset = e.color.greenOffset, this._durationColor.blueOffset = e.color.blueOffset, this._durationColor.alphaMultiplier = e.color.alphaMultiplier - 1, this._durationColor.redMultiplier = e.color.redMultiplier - 1, this._durationColor.greenMultiplier = e.color.greenMultiplier - 1, this._durationColor.blueMultiplier = e.color.blueMultiplier - 1) : this._tweenColor = !1), this._tweenTransform ||
                            (this._animationState.blend ? (this.transform.x = this._originTransform.x + this._currentFrame.transform.x, this.transform.y = this._originTransform.y + this._currentFrame.transform.y, this.transform.skewX = this._originTransform.skewX + this._currentFrame.transform.skewX, this.transform.skewY = this._originTransform.skewY + this._currentFrame.transform.skewY, this.transform.scaleX = this._originTransform.scaleX + this._currentFrame.transform.scaleX, this.transform.scaleY = this._originTransform.scaleY + this._currentFrame.transform.scaleY,
                                this.pivot.x = this._originPivot.x + this._currentFrame.pivot.x, this.pivot.y = this._originPivot.y + this._currentFrame.pivot.y) : (this.transform.x = this._currentFrame.transform.x, this.transform.y = this._currentFrame.transform.y, this.transform.skewX = this._currentFrame.transform.skewX, this.transform.skewY = this._currentFrame.transform.skewY, this.transform.scaleX = this._currentFrame.transform.scaleX, this.transform.scaleY = this._currentFrame.transform.scaleY, this.pivot.x = this._currentFrame.pivot.x, this.pivot.y = this._currentFrame.pivot.y)),
                            this._tweenColor || (this._currentFrame.color ? this._bone._updateColor(this._currentFrame.color.alphaOffset, this._currentFrame.color.redOffset, this._currentFrame.color.greenOffset, this._currentFrame.color.blueOffset, this._currentFrame.color.alphaMultiplier, this._currentFrame.color.redMultiplier, this._currentFrame.color.greenMultiplier, this._currentFrame.color.blueMultiplier, !0) : this._bone._isColorChanged && this._bone._updateColor(0, 0, 0, 0, 1, 1, 1, 1, !1)), this._bone._arriveAtFrame(this._currentFrame, this,
                                this._animationState, !1));
                        if (this._tweenTransform || this._tweenColor) b = (d - this._currentFramePosition) / this._currentFrameDuration, this._tweenEasing && (b = a.getEaseValue(b, this._tweenEasing));
                        this._tweenTransform && (c = this._currentFrame.transform, d = this._currentFrame.pivot, this._animationState.blend ? (this.transform.x = this._originTransform.x + c.x + this._durationTransform.x * b, this.transform.y = this._originTransform.y + c.y + this._durationTransform.y * b, this.transform.skewX = this._originTransform.skewX + c.skewX + this._durationTransform.skewX *
                            b, this.transform.skewY = this._originTransform.skewY + c.skewY + this._durationTransform.skewY * b, this.transform.scaleX = this._originTransform.scaleX + c.scaleX + this._durationTransform.scaleX * b, this.transform.scaleY = this._originTransform.scaleY + c.scaleY + this._durationTransform.scaleY * b, this.pivot.x = this._originPivot.x + d.x + this._durationPivot.x * b, this.pivot.y = this._originPivot.y + d.y + this._durationPivot.y * b) : (this.transform.x = c.x + this._durationTransform.x * b, this.transform.y = c.y + this._durationTransform.y * b, this.transform.skewX =
                            c.skewX + this._durationTransform.skewX * b, this.transform.skewY = c.skewY + this._durationTransform.skewY * b, this.transform.scaleX = c.scaleX + this._durationTransform.scaleX * b, this.transform.scaleY = c.scaleY + this._durationTransform.scaleY * b, this.pivot.x = d.x + this._durationPivot.x * b, this.pivot.y = d.y + this._durationPivot.y * b));
                        this._tweenColor && (this._currentFrame.color ? this._bone._updateColor(this._currentFrame.color.alphaOffset + this._durationColor.alphaOffset * b, this._currentFrame.color.redOffset + this._durationColor.redOffset *
                            b, this._currentFrame.color.greenOffset + this._durationColor.greenOffset * b, this._currentFrame.color.blueOffset + this._durationColor.blueOffset * b, this._currentFrame.color.alphaMultiplier + this._durationColor.alphaMultiplier * b, this._currentFrame.color.redMultiplier + this._durationColor.redMultiplier * b, this._currentFrame.color.greenMultiplier + this._durationColor.greenMultiplier * b, this._currentFrame.color.blueMultiplier + this._durationColor.blueMultiplier * b, !0) : this._bone._updateColor(this._durationColor.alphaOffset *
                            b, this._durationColor.redOffset * b, this._durationColor.greenOffset * b, this._durationColor.blueOffset * b, 1 + this._durationColor.alphaMultiplier * b, 1 + this._durationColor.redMultiplier * b, 1 + this._durationColor.greenMultiplier * b, 1 + this._durationColor.blueMultiplier * b, !0))
                    } else this._updateState = 0, this._animationState.blend ? (this.transform.copy(this._originTransform), this.pivot.x = this._originPivot.x, this.pivot.y = this._originPivot.y) : (this.transform.x = this.transform.y = this.transform.skewX = this.transform.skewY =
                        this.transform.scaleX = this.transform.scaleY = 0, this.pivot.x = 0, this.pivot.y = 0), this._currentFrame = this._timeline.getFrameList()[0], this.tweenActive = 0 <= this._currentFrame.displayIndex, this._currentFrame.color ? this._bone._updateColor(this._currentFrame.color.alphaOffset, this._currentFrame.color.redOffset, this._currentFrame.color.greenOffset, this._currentFrame.color.blueOffset, this._currentFrame.color.alphaMultiplier, this._currentFrame.color.redMultiplier, this._currentFrame.color.greenMultiplier, this._currentFrame.color.blueMultiplier, !0) : this._bone._updateColor(0, 0, 0, 0, 1, 1, 1, 1, !1), this._bone._arriveAtFrame(this._currentFrame, this, this._animationState, !1)
            };
            a.prototype.clear = function() {
                this._updateState = 0;
                this._originPivot = this._originTransform = this._currentFrame = this._timeline = this._animationState = this._bone = null
            };
            a.HALF_PI = 0.5 * Math.PI;
            a._pool = [];
            return a
        }();
        a.TimelineState = l;
        var f = function() {
            function a() {
                this.layer = this.loop = 0;
                this._timelineStates = {}
            }
            a._borrowObject = function() {
                return 0 == a._pool.length ? new a : a._pool.pop()
            };
            a._returnObject =
                function(b) {
                    0 > a._pool.indexOf(b) && (a._pool[a._pool.length] = b);
                    b.clear()
                };
            a._clear = function() {
                for (var b = a._pool.length; b--;) a._pool[b].clear();
                a._pool.length = 0
            };
            a.prototype.fadeIn = function(a, b, c, d, e, h, l, f) {
                this.layer = h;
                this.clip = b;
                this.name = this.clip.name;
                this.totalTime = this.clip.duration;
                this._armature = a;
                2 > Math.round(this.clip.duration * this.clip.frameRate) || Infinity == d ? (this.timeScale = 1, this.currentTime = this.totalTime, this.loop = 0 <= this.loop ? 1 : -1) : (this.timeScale = d, this.currentTime = 0, this.loop = e);
                this._pauseBeforeFadeInComplete = f;
                this._fadeInTime = c * this.timeScale;
                this._fadeState = 1;
                this._fadeOutBeginTime = 0;
                this._fadeOutWeight = -1;
                this._fadeWeight = 0;
                this._fadeIn = !0;
                this._fadeOut = !1;
                this.loopCount = -1;
                this.displayControl = l;
                this.isPlaying = !0;
                this.isComplete = !1;
                this.weight = 1;
                this.tweenEnabled = this.enabled = this.blend = !0;
                this.updateTimelineStates()
            };
            a.prototype.fadeOut = function(a, b) {
                "undefined" === typeof b && (b = !1);
                if (this._armature && !(0 <= this._fadeOutWeight)) {
                    this._fadeState = -1;
                    this._fadeOutWeight =
                        this._fadeWeight;
                    this._fadeOutTime = a * this.timeScale;
                    this._fadeOutBeginTime = this.currentTime;
                    this._fadeOut = !0;
                    this.isPlaying = !b;
                    this.displayControl = !1;
                    for (var c in this._timelineStates) this._timelineStates[c].fadeOut();
                    this.enabled = !0
                }
            };
            a.prototype.play = function() {
                this.isPlaying = !0
            };
            a.prototype.stop = function() {
                this.isPlaying = !1
            };
            a.prototype.getMixingTransform = function(a) {
                return this._mixingTransforms ? Number(this._mixingTransforms[a]) : -1
            };
            a.prototype.addMixingTransform = function(a, b, c) {
                "undefined" ===
                typeof b && (b = 2);
                "undefined" === typeof c && (c = !0);
                if (this.clip && this.clip.getTimeline(a)) {
                    this._mixingTransforms || (this._mixingTransforms = {});
                    if (c) {
                        c = this._armature._boneList.length;
                        for (var d, e; c--;) d = this._armature._boneList[c], d.name == a && (e = d), e && (e == d || e.contains(d)) && (this._mixingTransforms[d.name] = b)
                    } else this._mixingTransforms[a] = b;
                    this.updateTimelineStates()
                } else throw Error();
            };
            a.prototype.removeMixingTransform = function(a, b) {
                "undefined" === typeof a && (a = null);
                "undefined" === typeof b && (b = !0);
                if (a) {
                    if (b)
                        for (var c =
                            this._armature._boneList.length, d, e; c--;) d = this._armature._boneList[c], d.name == a && (e = d), e && (e == d || e.contains(d)) && delete this._mixingTransforms[d.name];
                    else delete this._mixingTransforms[a];
                    for (var h in this._mixingTransforms) {
                        var l = !0;
                        break
                    }
                    l || (this._mixingTransforms = null)
                } else this._mixingTransforms = null;
                this.updateTimelineStates()
            };
            a.prototype.advanceTime = function(a) {
                if (!this.enabled) return !1;
                var b, c;
                this._fadeIn && (this._fadeIn = !1, this._armature.hasEventListener(d.AnimationEvent.FADE_IN) && (b = new d.AnimationEvent(d.AnimationEvent.FADE_IN),
                    b.animationState = this, this._armature._eventList.push(b)));
                this._fadeOut && (this._fadeOut = !1, this._armature.hasEventListener(d.AnimationEvent.FADE_OUT) && (b = new d.AnimationEvent(d.AnimationEvent.FADE_OUT), b.animationState = this, this._armature._eventList.push(b)));
                this.currentTime += a * this.timeScale;
                if (this.isPlaying && !this.isComplete) {
                    var e;
                    if (this._pauseBeforeFadeInComplete) this.isPlaying = this._pauseBeforeFadeInComplete = !1, a = 0, e = Math.floor(a);
                    else if (a = this.currentTime / this.totalTime, e = Math.floor(a),
                        e != this.loopCount && (-1 == this.loopCount && this._armature.hasEventListener(d.AnimationEvent.START) && (b = new d.AnimationEvent(d.AnimationEvent.START), b.animationState = this, this._armature._eventList.push(b)), this.loopCount = e)) this.loop && this.loopCount * this.loopCount >= this.loop * this.loop - 1 ? (c = !0, a = 1, e = 0, this._armature.hasEventListener(d.AnimationEvent.COMPLETE) && (b = new d.AnimationEvent(d.AnimationEvent.COMPLETE), b.animationState = this, this._armature._eventList.push(b))) : this._armature.hasEventListener(d.AnimationEvent.LOOP_COMPLETE) &&
                        (b = new d.AnimationEvent(d.AnimationEvent.LOOP_COMPLETE), b.animationState = this, this._armature._eventList.push(b));
                    for (var h in this._timelineStates) this._timelineStates[h].update(a);
                    b = this.clip.getFrameList();
                    if (0 < b.length) {
                        a = this.totalTime * (a - e);
                        for (e = !1; !this._currentFrame || a > this._currentFrame.position + this._currentFrame.duration || a < this._currentFrame.position;) e && this._armature._arriveAtFrame(this._currentFrame, null, this, !0), e = !0, this._currentFrame ? (h = b.indexOf(this._currentFrame), h++, h >= b.length &&
                            (h = 0), this._currentFrame = b[h]) : this._currentFrame = b[0];
                        e && this._armature._arriveAtFrame(this._currentFrame, null, this, !1)
                    }
                }
                if (0 < this._fadeState) 0 == this._fadeInTime ? (this._fadeWeight = 1, this._fadeState = 0, this.isPlaying = !0, this._armature.hasEventListener(d.AnimationEvent.FADE_IN_COMPLETE) && (b = new d.AnimationEvent(d.AnimationEvent.FADE_IN_COMPLETE), b.animationState = this, this._armature._eventList.push(b))) : (this._fadeWeight = this.currentTime / this._fadeInTime, 1 <= this._fadeWeight && (this._fadeWeight = 1, this._fadeState =
                    0, this.isPlaying || (this.currentTime -= this._fadeInTime), this.isPlaying = !0, this._armature.hasEventListener(d.AnimationEvent.FADE_IN_COMPLETE) && (b = new d.AnimationEvent(d.AnimationEvent.FADE_IN_COMPLETE), b.animationState = this, this._armature._eventList.push(b))));
                else if (0 > this._fadeState) {
                    if (0 == this._fadeOutTime) return this._fadeState = this._fadeWeight = 0, this._armature.hasEventListener(d.AnimationEvent.FADE_OUT_COMPLETE) && (b = new d.AnimationEvent(d.AnimationEvent.FADE_OUT_COMPLETE), b.animationState = this,
                        this._armature._eventList.push(b)), !0;
                    this._fadeWeight = (1 - (this.currentTime - this._fadeOutBeginTime) / this._fadeOutTime) * this._fadeOutWeight;
                    if (0 >= this._fadeWeight) return this._fadeState = this._fadeWeight = 0, this._armature.hasEventListener(d.AnimationEvent.FADE_OUT_COMPLETE) && (b = new d.AnimationEvent(d.AnimationEvent.FADE_OUT_COMPLETE), b.animationState = this, this._armature._eventList.push(b)), !0
                }
                c && (this.isComplete = !0, 0 > this.loop && this.fadeOut((this._fadeOutWeight || this._fadeInTime) / this.timeScale, !0));
                return !1
            };
            a.prototype.updateTimelineStates = function() {
                if (this._mixingTransforms) {
                    for (var a in this._timelineStates) null == this._mixingTransforms[a] && this.removeTimelineState(a);
                    for (a in this._mixingTransforms) this._timelineStates[a] || this.addTimelineState(a)
                } else
                    for (a in this.clip.getTimelines()) this._timelineStates[a] || this.addTimelineState(a)
            };
            a.prototype.addTimelineState = function(a) {
                var b = this._armature.getBone(a);
                if (b) {
                    var c = l._borrowObject(),
                        d = this.clip.getTimeline(a);
                    c.fadeIn(b, this, d);
                    this._timelineStates[a] =
                        c
                }
            };
            a.prototype.removeTimelineState = function(a) {
                l._returnObject(this._timelineStates[a]);
                delete this._timelineStates[a]
            };
            a.prototype.clear = function() {
                this.clip = null;
                this.enabled = !1;
                this._mixingTransforms = this._currentFrame = this._armature = null;
                for (var a in this._timelineStates) this.removeTimelineState(a)
            };
            a._pool = [];
            return a
        }();
        a.AnimationState = f;
        c = function() {
            function a(b) {
                this._armature = b;
                this._animationLayer = [];
                this._isPlaying = !1;
                this.animationNameList = [];
                this.tweenEnabled = !0;
                this.timeScale = 1
            }
            a.prototype.getLastAnimationName =
                function() {
                    return this._lastAnimationState ? this._lastAnimationState.name : null
                };
            a.prototype.getLastAnimationState = function() {
                return this._lastAnimationState
            };
            a.prototype.getAnimationDataList = function() {
                return this._animationDataList
            };
            a.prototype.setAnimationDataList = function(a) {
                this._animationDataList = a;
                this.animationNameList.length = 0;
                for (var b in this._animationDataList) this.animationNameList[this.animationNameList.length] = this._animationDataList[b].name
            };
            a.prototype.getIsPlaying = function() {
                return this._isPlaying &&
                    !this.getIsComplete()
            };
            a.prototype.getIsComplete = function() {
                if (this._lastAnimationState) {
                    if (!this._lastAnimationState.isComplete) return !1;
                    for (var a = this._animationLayer.length; a--;)
                        for (var b = this._animationLayer[a], c = b.length; c--;)
                            if (!b[c].isComplete) return !1;
                    return !0
                }
                return !1
            };
            a.prototype.dispose = function() {
                if (this._armature) {
                    this.stop();
                    for (var a = this._animationLayer.length; a--;) {
                        for (var b = this._animationLayer[a], c = b.length; c--;) f._returnObject(b[c]);
                        b.length = 0
                    }
                    this._animationLayer.length = 0;
                    this.animationNameList.length =
                        0;
                    this.animationNameList = this._animationDataList = this._animationLayer = this._armature = null
                }
            };
            a.prototype.gotoAndPlay = function(b, c, d, e, h, l, m, k, g, p) {
                "undefined" === typeof c && (c = -1);
                "undefined" === typeof d && (d = -1);
                "undefined" === typeof e && (e = NaN);
                "undefined" === typeof h && (h = 0);
                "undefined" === typeof l && (l = null);
                "undefined" === typeof m && (m = a.SAME_LAYER_AND_GROUP);
                "undefined" === typeof k && (k = !0);
                "undefined" === typeof g && (g = !0);
                "undefined" === typeof p && (p = !0);
                if (!this._animationDataList) return null;
                for (var n = this._animationDataList.length,
                    x; n--;)
                    if (this._animationDataList[n].name == b) {
                        x = this._animationDataList[n];
                        break
                    }
                if (!x) return null;
                this._isPlaying = !0;
                c = 0 > c ? 0 > x.fadeInTime ? 0.3 : x.fadeInTime : c;
                d = 0 > d ? 0 > x.scale ? 1 : x.scale : d / x.duration;
                e = isNaN(e) ? x.loop : e;
                h = this.addLayer(h);
                var y;
                switch (m) {
                    case a.NONE:
                        break;
                    case a.SAME_LAYER:
                        y = this._animationLayer[h];
                        for (n = y.length; n--;) m = y[n], m.fadeOut(c, g);
                        break;
                    case a.SAME_GROUP:
                        for (H = this._animationLayer.length; H--;)
                            for (y = this._animationLayer[H], n = y.length; n--;) m = y[n], m.group == l && m.fadeOut(c, g);
                        break;
                    case a.ALL:
                        for (var H = this._animationLayer.length; H--;)
                            for (y = this._animationLayer[H], n = y.length; n--;) m = y[n], m.fadeOut(c, g);
                        break;
                    default:
                        for (y = this._animationLayer[h], n = y.length; n--;) m = y[n], m.group == l && m.fadeOut(c, g)
                }
                this._lastAnimationState = f._borrowObject();
                this._lastAnimationState.group = l;
                this._lastAnimationState.tweenEnabled = this.tweenEnabled;
                this._lastAnimationState.fadeIn(this._armature, x, c, 1 / d, e, h, k, p);
                this.addState(this._lastAnimationState);
                e = this._armature._slotList;
                for (n = e.length; n--;) h =
                    e[n], (h = h.getChildArmature()) && h.animation.gotoAndPlay(b, c);
                return this._lastAnimationState
            };
            a.prototype.play = function() {
                this._animationDataList && 0 != this._animationDataList.length && (this._lastAnimationState ? this._isPlaying ? this.gotoAndPlay(this._lastAnimationState.name) : this._isPlaying = !0 : this.gotoAndPlay(this._animationDataList[0].name))
            };
            a.prototype.stop = function() {
                this._isPlaying = !1
            };
            a.prototype.getState = function(a, b) {
                "undefined" === typeof b && (b = 0);
                var c = this._animationLayer.length;
                if (0 == c) return null;
                b >= c && (b = c - 1);
                c = this._animationLayer[b];
                if (!c) return null;
                for (var d = c.length; d--;)
                    if (c[d].name == a) return c[d];
                return null
            };
            a.prototype.hasAnimation = function(a) {
                for (var b = this._animationDataList.length; b--;)
                    if (this._animationDataList[b].name == a) return !0;
                return !1
            };
            a.prototype.advanceTime = function(a) {
                if (this._isPlaying) {
                    a *= this.timeScale;
                    var b = this._armature._boneList.length,
                        c, d, e = b,
                        h, l, f, m, k, g, p, q, n, r, G, M, J, N, F, K, I;
                    for (b--; e--;) {
                        l = this._armature._boneList[e];
                        f = l.name;
                        m = 1;
                        M = G = r = n = q = p = g = k = 0;
                        for (c = this._animationLayer.length; c--;) {
                            J =
                                0;
                            N = this._animationLayer[c];
                            h = N.length;
                            for (d = 0; d < h; d++) F = N[d], e == b && F.advanceTime(a) ? (this.removeState(F), d--, h--) : (K = F._timelineStates[f]) && K.tweenActive && (F = F._fadeWeight * F.weight * m, I = K.transform, K = K.pivot, k += I.x * F, g += I.y * F, p += I.skewX * F, q += I.skewY * F, n += I.scaleX * F, r += I.scaleY * F, G += K.x * F, M += K.y * F, J += F);
                            if (J >= m) break;
                            else m -= J
                        }
                        I = l.tween;
                        K = l._tweenPivot;
                        I.x = k;
                        I.y = g;
                        I.skewX = p;
                        I.skewY = q;
                        I.scaleX = n;
                        I.scaleY = r;
                        K.x = G;
                        K.y = M
                    }
                }
            };
            a.prototype.addLayer = function(a) {
                a >= this._animationLayer.length && (a = this._animationLayer.length,
                    this._animationLayer[a] = []);
                return a
            };
            a.prototype.addState = function(a) {
                this._animationLayer[a.layer].push(a)
            };
            a.prototype.removeState = function(a) {
                var b = a.layer,
                    c = this._animationLayer[b];
                c.splice(c.indexOf(a), 1);
                f._returnObject(a);
                0 == c.length && b == this._animationLayer.length - 1 && this._animationLayer.length--
            };
            a.NONE = "none";
            a.SAME_LAYER = "sameLayer";
            a.SAME_GROUP = "sameGroup";
            a.SAME_LAYER_AND_GROUP = "sameLayerAndGroup";
            a.ALL = "all";
            return a
        }();
        a.Animation = c
    })(c.animation || (c.animation = {}));
    var a = c.animation;
    (function(a) {
        var b = function() {
            function a() {
                this.skewY = this.skewX = this.y = this.x = 0;
                this.scaleY = this.scaleX = 1
            }
            a.prototype.getRotation = function() {
                return this.skewX
            };
            a.prototype.setRotation = function(a) {
                this.skewX = this.skewY = a
            };
            a.prototype.copy = function(a) {
                this.x = a.x;
                this.y = a.y;
                this.skewX = a.skewX;
                this.skewY = a.skewY;
                this.scaleX = a.scaleX;
                this.scaleY = a.scaleY
            };
            a.prototype.toString = function() {
                return "[DBTransform (x=" + this.x + " y=" + this.y + " skewX=" + this.skewX + " skewY=" + this.skewY + " scaleX=" + this.scaleX + " scaleY=" +
                    this.scaleY + ")]"
            };
            return a
        }();
        a.DBTransform = b;
        var c = function() {
            function a() {
                this.duration = this.position = 0
            }
            a.prototype.dispose = function() {};
            return a
        }();
        a.Frame = c;
        var d = function(a) {
            function c() {
                a.call(this);
                this.displayIndex = this.tweenRotate = this.tweenEasing = 0;
                this.zOrder = NaN;
                this.visible = !0;
                this.global = new b;
                this.transform = new b;
                this.pivot = new e.Point
            }
            __extends(c, a);
            c.prototype.dispose = function() {
                a.prototype.dispose.call(this);
                this.color = this.pivot = this.transform = this.global = null
            };
            return c
        }(c);
        a.TransformFrame =
            d;
        var l = function() {
            function a() {
                this._frameList = [];
                this.duration = 0;
                this.scale = 1
            }
            a.prototype.getFrameList = function() {
                return this._frameList
            };
            a.prototype.dispose = function() {
                for (var a = this._frameList.length; a--;) this._frameList[a].dispose();
                this._frameList.length = 0;
                this._frameList = null
            };
            a.prototype.addFrame = function(a) {
                if (!a) throw Error();
                if (0 > this._frameList.indexOf(a)) this._frameList[this._frameList.length] = a;
                else throw Error();
            };
            return a
        }();
        a.Timeline = l;
        var f = function(a) {
            function c() {
                a.call(this);
                this.originTransform = new b;
                this.originPivot = new e.Point;
                this.offset = 0;
                this.transformed = !1
            }
            __extends(c, a);
            c.prototype.dispose = function() {
                this != c.HIDE_TIMELINE && (a.prototype.dispose.call(this), this.originPivot = this.originTransform = null)
            };
            c.HIDE_TIMELINE = new c;
            return c
        }(l);
        a.TransformTimeline = f;
        var m = function(a) {
            function b() {
                a.call(this);
                this.loop = this.frameRate = 0;
                this.tweenEasing = NaN;
                this.fadeInTime = 0;
                this._timelines = {}
            }
            __extends(b, a);
            b.prototype.getTimelines = function() {
                return this._timelines
            };
            b.prototype.dispose =
                function() {
                    a.prototype.dispose.call(this);
                    for (var b in this._timelines) this._timelines[b].dispose();
                    this._timelines = null
                };
            b.prototype.getTimeline = function(a) {
                return this._timelines[a]
            };
            b.prototype.addTimeline = function(a, b) {
                if (!a) throw Error();
                this._timelines[b] = a
            };
            return b
        }(l);
        a.AnimationData = m;
        var g = function() {
            function a() {
                this.transform = new b
            }
            a.prototype.dispose = function() {
                this.pivot = this.transform = null
            };
            a.ARMATURE = "armature";
            a.IMAGE = "image";
            return a
        }();
        a.DisplayData = g;
        var v = function() {
            function a() {
                this._displayDataList = [];
                this.zOrder = 0;
                this.blendMode = "normal"
            }
            a.prototype.getDisplayDataList = function() {
                return this._displayDataList
            };
            a.prototype.dispose = function() {
                for (var a = this._displayDataList.length; a--;) this._displayDataList[a].dispose();
                this._displayDataList.length = 0;
                this._displayDataList = null
            };
            a.prototype.addDisplayData = function(a) {
                if (!a) throw Error();
                if (0 > this._displayDataList.indexOf(a)) this._displayDataList[this._displayDataList.length] = a;
                else throw Error();
            };
            a.prototype.getDisplayData = function(a) {
                for (var b =
                    this._displayDataList.length; b--;)
                    if (this._displayDataList[b].name == a) return this._displayDataList[b];
                return null
            };
            return a
        }();
        a.SlotData = v;
        var B = function() {
            function a() {
                this.length = 0;
                this.global = new b;
                this.transform = new b;
                this.scaleMode = 1;
                this.fixedRotation = !1
            }
            a.prototype.dispose = function() {
                this.transform = this.global = null
            };
            return a
        }();
        a.BoneData = B;
        var C = function() {
            function a() {
                this._slotDataList = []
            }
            a.prototype.getSlotDataList = function() {
                return this._slotDataList
            };
            a.prototype.dispose = function() {
                for (var a =
                    this._slotDataList.length; a--;) this._slotDataList[a].dispose();
                this._slotDataList.length = 0;
                this._slotDataList = null
            };
            a.prototype.getSlotData = function(a) {
                for (var b = this._slotDataList.length; b--;)
                    if (this._slotDataList[b].name == a) return this._slotDataList[b];
                return null
            };
            a.prototype.addSlotData = function(a) {
                if (!a) throw Error();
                if (0 > this._slotDataList.indexOf(a)) this._slotDataList[this._slotDataList.length] = a;
                else throw Error();
            };
            return a
        }();
        a.SkinData = C;
        var t = function() {
            function a() {
                this._boneDataList = [];
                this._skinDataList = [];
                this._animationDataList = []
            }
            a.prototype.getBoneDataList = function() {
                return this._boneDataList
            };
            a.prototype.getSkinDataList = function() {
                return this._skinDataList
            };
            a.prototype.getAnimationDataList = function() {
                return this._animationDataList
            };
            a.prototype.dispose = function() {
                for (var a = this._boneDataList.length; a--;) this._boneDataList[a].dispose();
                for (a = this._skinDataList.length; a--;) this._skinDataList[a].dispose();
                for (a = this._animationDataList.length; a--;) this._animationDataList[a].dispose();
                this._boneDataList.length = 0;
                this._skinDataList.length = 0;
                this._animationDataList.length = 0;
                this._animationDataList = this._skinDataList = this._boneDataList = null
            };
            a.prototype.getBoneData = function(a) {
                for (var b = this._boneDataList.length; b--;)
                    if (this._boneDataList[b].name == a) return this._boneDataList[b];
                return null
            };
            a.prototype.getSkinData = function(a) {
                if (!a) return this._skinDataList[0];
                for (var b = this._skinDataList.length; b--;)
                    if (this._skinDataList[b].name == a) return this._skinDataList[b];
                return null
            };
            a.prototype.getAnimationData =
                function(a) {
                    for (var b = this._animationDataList.length; b--;)
                        if (this._animationDataList[b].name == a) return this._animationDataList[b];
                    return null
                };
            a.prototype.addBoneData = function(a) {
                if (!a) throw Error();
                if (0 > this._boneDataList.indexOf(a)) this._boneDataList[this._boneDataList.length] = a;
                else throw Error();
            };
            a.prototype.addSkinData = function(a) {
                if (!a) throw Error();
                if (0 > this._skinDataList.indexOf(a)) this._skinDataList[this._skinDataList.length] = a;
                else throw Error();
            };
            a.prototype.addAnimationData = function(a) {
                if (!a) throw Error();
                0 > this._animationDataList.indexOf(a) && (this._animationDataList[this._animationDataList.length] = a)
            };
            a.prototype.sortBoneDataList = function() {
                var a = this._boneDataList.length;
                if (0 != a) {
                    for (var b = []; a--;) {
                        for (var c = this._boneDataList[a], d = 0, e = c; e && e.parent;) d++, e = this.getBoneData(e.parent);
                        b[a] = {
                            level: d,
                            boneData: c
                        }
                    }
                    b.sort(this.sortBoneData);
                    for (a = b.length; a--;) this._boneDataList[a] = b[a].boneData
                }
            };
            a.prototype.sortBoneData = function(a, b) {
                return a.level > b.level ? 1 : -1
            };
            return a
        }();
        a.ArmatureData = t;
        var u = function() {
            function a() {
                this._armatureDataList = [];
                this._subTexturePivots = {}
            }
            a.prototype.getArmatureNames = function() {
                var a = [],
                    b;
                for (b in this._armatureDataList) a[a.length] = this._armatureDataList[b].name;
                return a
            };
            a.prototype.getArmatureDataList = function() {
                return this._armatureDataList
            };
            a.prototype.dispose = function() {
                for (var a in this._armatureDataList) this._armatureDataList[a].dispose();
                this._armatureDataList.length = 0;
                this._subTexturePivots = this._armatureDataList = null
            };
            a.prototype.getArmatureData = function(a) {
                for (var b = this._armatureDataList.length; b--;)
                    if (this._armatureDataList[b].name ==
                        a) return this._armatureDataList[b];
                return null
            };
            a.prototype.addArmatureData = function(a) {
                if (!a) throw Error();
                if (0 > this._armatureDataList.indexOf(a)) this._armatureDataList[this._armatureDataList.length] = a;
                else throw Error();
            };
            a.prototype.removeArmatureData = function(a) {
                a = this._armatureDataList.indexOf(a);
                0 <= a && this._armatureDataList.splice(a, 1)
            };
            a.prototype.removeArmatureDataByName = function(a) {
                for (var b = this._armatureDataList.length; b--;) this._armatureDataList[b].name == a && this._armatureDataList.splice(b,
                    1)
            };
            a.prototype.getSubTexturePivot = function(a) {
                return this._subTexturePivots[a]
            };
            a.prototype.addSubTexturePivot = function(a, b, c) {
                var d = this._subTexturePivots[c];
                d ? (d.x = a, d.y = b) : this._subTexturePivots[c] = d = new e.Point(a, b);
                return d
            };
            a.prototype.removeSubTexturePivot = function(a) {
                if (a) delete this._subTexturePivots[a];
                else
                    for (a in this._subTexturePivots) delete this._subTexturePivots[a]
            };
            return a
        }();
        a.SkeletonData = u;
        l = function() {
            function a() {}
            a.parseTextureAtlasData = function(a, b) {
                "undefined" === typeof b &&
                    (b = 1);
                if (!a) throw Error();
                var c = {};
                c.__name = a[h.ConstValues.A_NAME];
                var d = a[h.ConstValues.SUB_TEXTURE],
                    l;
                for (l in d) {
                    var f = d[l],
                        m = f[h.ConstValues.A_NAME],
                        f = new e.Rectangle(Number(f[h.ConstValues.A_X]) / b, Number(f[h.ConstValues.A_Y]) / b, Number(f[h.ConstValues.A_WIDTH]) / b, Number(f[h.ConstValues.A_HEIGHT]) / b);
                    c[m] = f
                }
                return c
            };
            a.parseSkeletonData = function(b) {
                if (!b) throw Error();
                var c = Number(b[h.ConstValues.A_FRAME_RATE]),
                    d = new u;
                d.name = b[h.ConstValues.A_NAME];
                b = b[h.ConstValues.ARMATURE];
                for (var e in b) d.addArmatureData(a.parseArmatureData(b[e],
                    d, c));
                return d
            };
            a.parseArmatureData = function(b, c, d) {
                var e = new t;
                e.name = b[h.ConstValues.A_NAME];
                var l = b[h.ConstValues.BONE],
                    f;
                for (f in l) e.addBoneData(a.parseBoneData(l[f]));
                l = b[h.ConstValues.SKIN];
                for (f in l) e.addSkinData(a.parseSkinData(l[f], c));
                h.DBDataUtil.transformArmatureData(e);
                e.sortBoneDataList();
                b = b[h.ConstValues.ANIMATION];
                for (f in b) e.addAnimationData(a.parseAnimationData(b[f], e, d));
                return e
            };
            a.parseBoneData = function(b) {
                var c = new B;
                c.name = b[h.ConstValues.A_NAME];
                c.parent = b[h.ConstValues.A_PARENT];
                c.length = Number(b[h.ConstValues.A_LENGTH]) || 0;
                var d = Number(b[h.ConstValues.A_SCALE_MODE]);
                !isNaN(d) && d && (c.scaleMode = d);
                if (d = b[h.ConstValues.A_FIXED_ROTATION]) c.fixedRotation = d;
                a.parseTransform(b[h.ConstValues.TRANSFORM], c.global);
                c.transform.copy(c.global);
                return c
            };
            a.parseSkinData = function(b, c) {
                var d = new C;
                d.name = b[h.ConstValues.A_NAME];
                var e = b[h.ConstValues.SLOT],
                    l;
                for (l in e) d.addSlotData(a.parseSlotData(e[l], c));
                return d
            };
            a.parseSlotData = function(b, c) {
                var d = new v;
                d.name = b[h.ConstValues.A_NAME];
                d.parent = b[h.ConstValues.A_PARENT];
                d.zOrder = Number(b[h.ConstValues.A_Z_ORDER]);
                d.blendMode = b[h.ConstValues.A_BLENDMODE];
                d.blendMode || (d.blendMode = "normal");
                var e = b[h.ConstValues.DISPLAY],
                    l;
                for (l in e) d.addDisplayData(a.parseDisplayData(e[l], c));
                return d
            };
            a.parseDisplayData = function(b, c) {
                var d = new g;
                d.name = b[h.ConstValues.A_NAME];
                d.type = b[h.ConstValues.A_TYPE];
                d.pivot = c.addSubTexturePivot(0, 0, d.name);
                a.parseTransform(b[h.ConstValues.TRANSFORM], d.transform, d.pivot);
                return d
            };
            a.parseAnimationData = function(b,
                c, d) {
                var e = new m;
                e.name = b[h.ConstValues.A_NAME];
                e.frameRate = d;
                e.loop = Number(b[h.ConstValues.A_LOOP]) || 0;
                e.fadeInTime = Number(b[h.ConstValues.A_FADE_IN_TIME]);
                e.duration = Number(b[h.ConstValues.A_DURATION]) / d;
                e.scale = Number(b[h.ConstValues.A_SCALE]);
                if (b.hasOwnProperty(h.ConstValues.A_TWEEN_EASING)) {
                    var l = b[h.ConstValues.A_TWEEN_EASING];
                    e.tweenEasing = void 0 == l || null == l ? NaN : Number(l)
                } else e.tweenEasing = NaN;
                a.parseTimeline(b, e, a.parseMainFrame, d);
                var f, l = b[h.ConstValues.TIMELINE],
                    k;
                for (k in l) f = l[k], b =
                    a.parseTransformTimeline(f, e.duration, d), f = f[h.ConstValues.A_NAME], e.addTimeline(b, f);
                h.DBDataUtil.addHideTimeline(e, c);
                h.DBDataUtil.transformAnimationData(e, c);
                return e
            };
            a.parseTimeline = function(a, b, c, d) {
                var e = 0,
                    l;
                a = a[h.ConstValues.FRAME];
                for (var f in a) l = c(a[f], d), l.position = e, b.addFrame(l), e += l.duration;
                l && (l.duration = b.duration - l.position)
            };
            a.parseTransformTimeline = function(b, c, d) {
                var e = new f;
                e.duration = c;
                a.parseTimeline(b, e, a.parseTransformFrame, d);
                e.scale = Number(b[h.ConstValues.A_SCALE]);
                e.offset =
                    Number(b[h.ConstValues.A_OFFSET]);
                return e
            };
            a.parseFrame = function(a, b, c) {
                b.duration = Number(a[h.ConstValues.A_DURATION]) / c;
                b.action = a[h.ConstValues.A_ACTION];
                b.event = a[h.ConstValues.A_EVENT];
                b.sound = a[h.ConstValues.A_SOUND]
            };
            a.parseMainFrame = function(b, d) {
                var e = new c;
                a.parseFrame(b, e, d);
                return e
            };
            a.parseTransformFrame = function(b, c) {
                var l = new d;
                a.parseFrame(b, l, c);
                l.visible = 1 != Number(b[h.ConstValues.A_HIDE]);
                if (b.hasOwnProperty(h.ConstValues.A_TWEEN_EASING)) {
                    var f = b[h.ConstValues.A_TWEEN_EASING];
                    l.tweenEasing =
                        void 0 == f || null == f ? NaN : Number(f)
                } else l.tweenEasing = 0;
                l.tweenRotate = Number(b[h.ConstValues.A_TWEEN_ROTATE]) || 0;
                l.displayIndex = Number(b[h.ConstValues.A_DISPLAY_INDEX]) || 0;
                l.zOrder = Number(b[h.ConstValues.A_Z_ORDER]) || 0;
                a.parseTransform(b[h.ConstValues.TRANSFORM], l.global, l.pivot);
                l.transform.copy(l.global);
                if (f = b[h.ConstValues.COLOR_TRANSFORM]) l.color = new e.ColorTransform, l.color.alphaOffset = Number(f[h.ConstValues.A_ALPHA_OFFSET]), l.color.redOffset = Number(f[h.ConstValues.A_RED_OFFSET]), l.color.greenOffset =
                    Number(f[h.ConstValues.A_GREEN_OFFSET]), l.color.blueOffset = Number(f[h.ConstValues.A_BLUE_OFFSET]), l.color.alphaMultiplier = 0.01 * Number(f[h.ConstValues.A_ALPHA_MULTIPLIER]), l.color.redMultiplier = 0.01 * Number(f[h.ConstValues.A_RED_MULTIPLIER]), l.color.greenMultiplier = 0.01 * Number(f[h.ConstValues.A_GREEN_MULTIPLIER]), l.color.blueMultiplier = 0.01 * Number(f[h.ConstValues.A_BLUE_MULTIPLIER]);
                return l
            };
            a.parseTransform = function(a, b, c) {
                "undefined" === typeof c && (c = null);
                a && (b && (b.x = Number(a[h.ConstValues.A_X]),
                    b.y = Number(a[h.ConstValues.A_Y]), b.skewX = Number(a[h.ConstValues.A_SKEW_X]) * h.ConstValues.ANGLE_TO_RADIAN, b.skewY = Number(a[h.ConstValues.A_SKEW_Y]) * h.ConstValues.ANGLE_TO_RADIAN, b.scaleX = Number(a[h.ConstValues.A_SCALE_X]), b.scaleY = Number(a[h.ConstValues.A_SCALE_Y])), c && (c.x = Number(a[h.ConstValues.A_PIVOT_X]), c.y = Number(a[h.ConstValues.A_PIVOT_Y])))
            };
            return a
        }();
        a.DataParser = l
    })(c.objects || (c.objects = {}));
    var b = c.objects;
    (function(a) {
        var c = function(a) {
            function c() {
                a.call(this);
                this._dataDic = {};
                this._textureAtlasDic = {};
                this._textureAtlasLoadingDic = {}
            }
            __extends(c, a);
            c.prototype.getSkeletonData = function(a) {
                return this._dataDic[a]
            };
            c.prototype.addSkeletonData = function(a, b) {
                "undefined" === typeof b && (b = null);
                if (!a) throw Error();
                b = b || a.name;
                if (!b) throw Error("Unnamed data!");
                this._dataDic[b] = a
            };
            c.prototype.removeSkeletonData = function(a) {
                delete this._dataDic[a]
            };
            c.prototype.getTextureAtlas = function(a) {
                return this._textureAtlasDic[a]
            };
            c.prototype.addTextureAtlas = function(a, b) {
                "undefined" === typeof b && (b = null);
                if (!a) throw Error();
                b = b || a.name;
                if (!b) throw Error("Unnamed data!");
                this._textureAtlasDic[b] = a
            };
            c.prototype.removeTextureAtlas = function(a) {
                delete this._textureAtlasDic[a]
            };
            c.prototype.dispose = function(a) {
                "undefined" === typeof a && (a = !0);
                if (a) {
                    for (var b in this._dataDic) this._dataDic[b].dispose();
                    for (b in this._textureAtlasDic) this._textureAtlasDic[b].dispose()
                }
                this._currentTextureAtlasName = this._currentDataName = this._textureAtlasLoadingDic = this._textureAtlasDic = this._dataDic = null
            };
            c.prototype.buildArmature = function(a, c,
                d, e, h) {
                if (d) {
                    var l = this._dataDic[d];
                    if (l) var m = l.getArmatureData(a)
                } else
                    for (d in this._dataDic)
                        if (l = this._dataDic[d], m = l.getArmatureData(a)) break; if (!m) return null;
                this._currentDataName = d;
                this._currentTextureAtlasName = e || d;
                e = this._generateArmature();
                e.name = a;
                var k, g, p = m.getBoneDataList(),
                    q;
                for (q in p) g = p[q], k = new f, k.name = g.name, k.fixedRotation = g.fixedRotation, k.scaleMode = g.scaleMode, k.origin.copy(g.transform), m.getBoneData(g.parent) ? e.addChild(k, g.parent) : e.addChild(k, null);
                if (c && c != a) {
                    var n = l.getArmatureData(c);
                    if (!n)
                        for (d in this._dataDic)
                            if (l = this._dataDic[d], n = l.getArmatureData(c)) break
                }
                n ? e.animation.setAnimationDataList(n.getAnimationDataList()) : e.animation.setAnimationDataList(m.getAnimationDataList());
                k = m.getSkinData(h);
                if (!k) throw Error();
                a = [];
                d = k.getSlotDataList();
                for (q in d)
                    if (l = d[q], k = e.getBone(l.parent)) {
                        h = l.getDisplayDataList();
                        c = this._generateSlot();
                        c.name = l.name;
                        c._blendMode = l.blendMode;
                        c._originZOrder = l.zOrder;
                        c._dislayDataList = h;
                        a.length = 0;
                        for (l = h.length; l--;) switch (m = h[l], m.type) {
                            case b.DisplayData.ARMATURE:
                                (m =
                                    this.buildArmature(m.name, null, this._currentDataName, this._currentTextureAtlasName, null)) && (a[l] = m);
                                break;
                            default:
                                a[l] = this._generateDisplay(this._textureAtlasDic[this._currentTextureAtlasName], m.name, m.pivot.x, m.pivot.y)
                        }
                        c.setDisplayList(a);
                        c._changeDisplay(0);
                        k.addChild(c)
                    }
                e._slotsZOrderChanged = !0;
                e.advanceTime(0);
                return e
            };
            c.prototype.getTextureDisplay = function(a, b, c, d) {
                if (b) var e = this._textureAtlasDic[b];
                if (!e && !b)
                    for (b in this._textureAtlasDic) {
                        e = this._textureAtlasDic[b];
                        if (e.getRegion(a)) break;
                        e = null
                    }
                if (e) {
                    if (isNaN(c) || isNaN(d))
                        if (b = this._dataDic[b])
                            if (b = b.getSubTexturePivot(a)) c = b.x, d = b.y;
                    return this._generateDisplay(e, a, c, d)
                }
                return null
            };
            c.prototype._generateArmature = function() {
                return null
            };
            c.prototype._generateSlot = function() {
                return null
            };
            c.prototype._generateDisplay = function(a, b, c, d) {
                return null
            };
            return c
        }(d.EventDispatcher);
        a.BaseFactory = c
    })(c.factorys || (c.factorys = {}));
    (function(c) {
        var d = function() {
            function a() {}
            a.ANGLE_TO_RADIAN = Math.PI / 180;
            a.DRAGON_BONES = "dragonBones";
            a.ARMATURE =
                "armature";
            a.SKIN = "skin";
            a.BONE = "bone";
            a.SLOT = "slot";
            a.DISPLAY = "display";
            a.ANIMATION = "animation";
            a.TIMELINE = "timeline";
            a.FRAME = "frame";
            a.TRANSFORM = "transform";
            a.COLOR_TRANSFORM = "colorTransform";
            a.TEXTURE_ATLAS = "TextureAtlas";
            a.SUB_TEXTURE = "SubTexture";
            a.A_VERSION = "version";
            a.A_IMAGE_PATH = "imagePath";
            a.A_FRAME_RATE = "frameRate";
            a.A_NAME = "name";
            a.A_PARENT = "parent";
            a.A_LENGTH = "length";
            a.A_TYPE = "type";
            a.A_FADE_IN_TIME = "fadeInTime";
            a.A_DURATION = "duration";
            a.A_SCALE = "scale";
            a.A_OFFSET = "offset";
            a.A_LOOP =
                "loop";
            a.A_EVENT = "event";
            a.A_SOUND = "sound";
            a.A_ACTION = "action";
            a.A_HIDE = "hide";
            a.A_TWEEN_EASING = "tweenEasing";
            a.A_TWEEN_ROTATE = "tweenRotate";
            a.A_DISPLAY_INDEX = "displayIndex";
            a.A_Z_ORDER = "z";
            a.A_BLENDMODE = "blendMode";
            a.A_WIDTH = "width";
            a.A_HEIGHT = "height";
            a.A_SCALE_MODE = "scaleMode";
            a.A_FIXED_ROTATION = "fixedRotation";
            a.A_X = "x";
            a.A_Y = "y";
            a.A_SKEW_X = "skX";
            a.A_SKEW_Y = "skY";
            a.A_SCALE_X = "scX";
            a.A_SCALE_Y = "scY";
            a.A_PIVOT_X = "pX";
            a.A_PIVOT_Y = "pY";
            a.A_ALPHA_OFFSET = "aO";
            a.A_RED_OFFSET = "rO";
            a.A_GREEN_OFFSET = "gO";
            a.A_BLUE_OFFSET = "bO";
            a.A_ALPHA_MULTIPLIER = "aM";
            a.A_RED_MULTIPLIER = "rM";
            a.A_GREEN_MULTIPLIER = "gM";
            a.A_BLUE_MULTIPLIER = "bM";
            return a
        }();
        c.ConstValues = d;
        var h = function() {
            function a() {}
            a.transformPointWithParent = function(b, c) {
                var d = a._helpMatrix;
                a.transformToMatrix(c, d);
                d.invert();
                var e = b.x,
                    h = b.y;
                b.x = d.a * e + d.c * h + d.tx;
                b.y = d.d * h + d.b * e + d.ty;
                b.skewX = a.formatRadian(b.skewX - c.skewX);
                b.skewY = a.formatRadian(b.skewY - c.skewY)
            };
            a.transformToMatrix = function(a, b) {
                b.a = a.scaleX * Math.cos(a.skewY);
                b.b = a.scaleX * Math.sin(a.skewY);
                b.c = -a.scaleY * Math.sin(a.skewX);
                b.d = a.scaleY * Math.cos(a.skewX);
                b.tx = a.x;
                b.ty = a.y
            };
            a.formatRadian = function(b) {
                b %= a.DOUBLE_PI;
                b > Math.PI && (b -= a.DOUBLE_PI);
                b < -Math.PI && (b += a.DOUBLE_PI);
                return b
            };
            a.DOUBLE_PI = 2 * Math.PI;
            a._helpMatrix = new e.Matrix;
            return a
        }();
        c.TransformUtil = h;
        d = function() {
            function c() {}
            c.transformArmatureData = function(a) {
                for (var b = a.getBoneDataList(), c = b.length, d, e; c--;)
                    if (d = b[c], d.parent && (e = a.getBoneData(d.parent))) d.transform.copy(d.global), h.transformPointWithParent(d.transform, e.global)
            };
            c.transformArmatureDataAnimations = function(a) {
                for (var b = a.getAnimationDataList(), d = b.length; d--;) c.transformAnimationData(b[d], a)
            };
            c.transformAnimationData = function(a, b) {
                for (var d = b.getSkinData(null), e = b.getBoneDataList(), d = d.getSlotDataList(), l = e.length, f, m, k, g, n, w, E, x, y, H; l--;)
                    if (f = e[l], m = a.getTimeline(f.name)) {
                        k = null;
                        for (var L in d)
                            if (k = d[L], k.parent == f.name) break;
                        g = f.parent ? a.getTimeline(f.parent) : null;
                        n = m.getFrameList();
                        x = E = w = null;
                        H = n.length;
                        for (var G = 0; G < H; G++) {
                            y = n[G];
                            g ? (c._helpTransform1.copy(y.global),
                                c.getTimelineTransform(g, y.position, c._helpTransform2), h.transformPointWithParent(c._helpTransform1, c._helpTransform2), y.transform.copy(c._helpTransform1)) : y.transform.copy(y.global);
                            y.transform.x -= f.transform.x;
                            y.transform.y -= f.transform.y;
                            y.transform.skewX -= f.transform.skewX;
                            y.transform.skewY -= f.transform.skewY;
                            y.transform.scaleX -= f.transform.scaleX;
                            y.transform.scaleY -= f.transform.scaleY;
                            !m.transformed && k && (y.zOrder -= k.zOrder);
                            w || (w = m.originTransform, w.copy(y.transform), w.skewX = h.formatRadian(w.skewX),
                                w.skewY = h.formatRadian(w.skewY), E = m.originPivot, E.x = y.pivot.x, E.y = y.pivot.y);
                            y.transform.x -= w.x;
                            y.transform.y -= w.y;
                            y.transform.skewX = h.formatRadian(y.transform.skewX - w.skewX);
                            y.transform.skewY = h.formatRadian(y.transform.skewY - w.skewY);
                            y.transform.scaleX -= w.scaleX;
                            y.transform.scaleY -= w.scaleY;
                            m.transformed || (y.pivot.x -= E.x, y.pivot.y -= E.y);
                            if (x) {
                                var M = y.transform.skewX - x.transform.skewX;
                                x.tweenRotate ? 0 < x.tweenRotate ? (0 > M && (y.transform.skewX += 2 * Math.PI, y.transform.skewY += 2 * Math.PI), 1 < x.tweenRotate &&
                                    (y.transform.skewX += 2 * Math.PI * (x.tweenRotate - 1), y.transform.skewY += 2 * Math.PI * (x.tweenRotate - 1))) : (0 < M && (y.transform.skewX -= 2 * Math.PI, y.transform.skewY -= 2 * Math.PI), 1 > x.tweenRotate && (y.transform.skewX += 2 * Math.PI * (x.tweenRotate + 1), y.transform.skewY += 2 * Math.PI * (x.tweenRotate + 1))) : (y.transform.skewX = x.transform.skewX + h.formatRadian(y.transform.skewX - x.transform.skewX), y.transform.skewY = x.transform.skewY + h.formatRadian(y.transform.skewY - x.transform.skewY))
                            }
                            x = y
                        }
                        m.transformed = !0
                    }
            };
            c.getTimelineTransform =
                function(b, c, d) {
                    for (var e = b.getFrameList(), l = e.length, f; l--;)
                        if (b = e[l], b.position <= c && b.position + b.duration > c) {
                            f = b.tweenEasing;
                            l == e.length - 1 || isNaN(f) || c == b.position ? d.copy(b.global) : (c = (c - b.position) / b.duration, f && (c = a.TimelineState.getEaseValue(c, f)), e = e[l + 1], d.x = b.global.x + (e.global.x - b.global.x) * c, d.y = b.global.y + (e.global.y - b.global.y) * c, d.skewX = h.formatRadian(b.global.skewX + (e.global.skewX - b.global.skewX) * c), d.skewY = h.formatRadian(b.global.skewY + (e.global.skewY - b.global.skewY) * c), d.scaleX = b.global.scaleX +
                                (e.global.scaleX - b.global.scaleX) * c, d.scaleY = b.global.scaleY + (e.global.scaleY - b.global.scaleY) * c);
                            break
                        }
                };
            c.addHideTimeline = function(a, c) {
                for (var d = c.getBoneDataList(), e = d.length, h; e--;) h = d[e], h = h.name, a.getTimeline(h) || a.addTimeline(b.TransformTimeline.HIDE_TIMELINE, h)
            };
            c._helpTransform1 = new b.DBTransform;
            c._helpTransform2 = new b.DBTransform;
            return c
        }();
        c.DBDataUtil = d
    })(c.utils || (c.utils = {}));
    var h = c.utils,
        l = function() {
            function a() {
                this.global = new b.DBTransform;
                this.origin = new b.DBTransform;
                this.offset =
                    new b.DBTransform;
                this.tween = new b.DBTransform;
                this.tween.scaleX = this.tween.scaleY = 0;
                this._globalTransformMatrix = new e.Matrix;
                this._visible = !0;
                this._isDisplayOnStage = this._isColorChanged = !1;
                this._scaleType = 0;
                this.fixedRotation = !1
            }
            a.prototype.getVisible = function() {
                return this._visible
            };
            a.prototype.setVisible = function(a) {
                this._visible = a
            };
            a.prototype._setParent = function(a) {
                this.parent = a
            };
            a.prototype._setArmature = function(a) {
                this.armature && this.armature._removeDBObject(this);
                (this.armature = a) && this.armature._addDBObject(this)
            };
            a.prototype.dispose = function() {
                this._globalTransformMatrix = this.tween = this.offset = this.origin = this.global = this.armature = this.parent = null
            };
            a.prototype._update = function() {
                this.global.scaleX = (this.origin.scaleX + this.tween.scaleX) * this.offset.scaleX;
                this.global.scaleY = (this.origin.scaleY + this.tween.scaleY) * this.offset.scaleY;
                if (this.parent) {
                    var a = this.origin.x + this.offset.x + this.tween.x,
                        b = this.origin.y + this.offset.y + this.tween.y,
                        c = this.parent._globalTransformMatrix;
                    this._globalTransformMatrix.tx = this.global.x =
                        c.a * a + c.c * b + c.tx;
                    this._globalTransformMatrix.ty = this.global.y = c.d * b + c.b * a + c.ty;
                    this.fixedRotation ? (this.global.skewX = this.origin.skewX + this.offset.skewX + this.tween.skewX, this.global.skewY = this.origin.skewY + this.offset.skewY + this.tween.skewY) : (this.global.skewX = this.origin.skewX + this.offset.skewX + this.tween.skewX + this.parent.global.skewX, this.global.skewY = this.origin.skewY + this.offset.skewY + this.tween.skewY + this.parent.global.skewY);
                    this.parent.scaleMode >= this._scaleType && (this.global.scaleX *= this.parent.global.scaleX,
                        this.global.scaleY *= this.parent.global.scaleY)
                } else this._globalTransformMatrix.tx = this.global.x = this.origin.x + this.offset.x + this.tween.x, this._globalTransformMatrix.ty = this.global.y = this.origin.y + this.offset.y + this.tween.y, this.global.skewX = this.origin.skewX + this.offset.skewX + this.tween.skewX, this.global.skewY = this.origin.skewY + this.offset.skewY + this.tween.skewY;
                this._globalTransformMatrix.a = this.global.scaleX * Math.cos(this.global.skewY);
                this._globalTransformMatrix.b = this.global.scaleX * Math.sin(this.global.skewY);
                this._globalTransformMatrix.c = -this.global.scaleY * Math.sin(this.global.skewX);
                this._globalTransformMatrix.d = this.global.scaleY * Math.cos(this.global.skewX)
            };
            return a
        }();
    c.DBObject = l;
    var m = function(a) {
        function b(c) {
            a.call(this);
            this._displayBridge = c;
            this._displayList = [];
            this._displayIndex = -1;
            this._scaleType = 1;
            this._offsetZOrder = this._tweenZorder = this._originZOrder = 0;
            this._isHideDisplay = this._isDisplayOnStage = !1;
            this._blendMode = "normal";
            this._displayBridge.updateBlendMode(this._blendMode)
        }
        __extends(b,
            a);
        b.prototype.getZOrder = function() {
            return this._originZOrder + this._tweenZorder + this._offsetZOrder
        };
        b.prototype.setZOrder = function(a) {
            this.getZOrder() != a && (this._offsetZOrder = a - this._originZOrder - this._tweenZorder, this.armature && (this.armature._slotsZOrderChanged = !0))
        };
        b.prototype.getDisplay = function() {
            var a = this._displayList[this._displayIndex];
            return a instanceof g ? a.getDisplay() : a
        };
        b.prototype.setDisplay = function(a) {
            this._displayList[this._displayIndex] = a;
            this._setDisplay(a)
        };
        b.prototype.getBlendMode =
            function() {
                return this._blendMode
            };
        b.prototype.setBlendMode = function(a) {
            this._blendMode != a && (this._blendMode = a, this._displayBridge.getDisplay() && this._displayBridge.updateBlendMode(this._blendMode))
        };
        b.prototype.getChildArmature = function() {
            var a = this._displayList[this._displayIndex];
            return a instanceof g ? a : null
        };
        b.prototype.setChildArmature = function(a) {
            (this._displayList[this._displayIndex] = a) && this._setDisplay(a.getDisplay())
        };
        b.prototype.getDisplayList = function() {
            return this._displayList
        };
        b.prototype.setDisplayList =
            function(a) {
                if (!a) throw Error();
                for (var b = this._displayList.length = a.length; b--;) this._displayList[b] = a[b];
                0 <= this._displayIndex && (a = this._displayIndex, this._displayIndex = -1, this._changeDisplay(a))
            };
        b.prototype._setDisplay = function(a) {
            this._displayBridge.getDisplay() ? this._displayBridge.setDisplay(a) : (this._displayBridge.setDisplay(a), this.armature && (this._displayBridge.addDisplay(this.armature.getDisplay(), -1), this.armature._slotsZOrderChanged = !0));
            this.updateChildArmatureAnimation();
            a && this._displayBridge.updateBlendMode(this._blendMode);
            !this._isHideDisplay && this._displayBridge.getDisplay() ? this._isDisplayOnStage = !0 : this._isDisplayOnStage = !1
        };
        b.prototype._changeDisplay = function(a) {
            if (0 > a) this._isHideDisplay || (this._isHideDisplay = !0, this._displayBridge.removeDisplay(), this.updateChildArmatureAnimation());
            else {
                if (this._isHideDisplay) {
                    this._isHideDisplay = !1;
                    var b = !0;
                    this.armature && (this._displayBridge.addDisplay(this.armature.getDisplay(), -1), this.armature._slotsZOrderChanged = !0)
                }
                var c = this._displayList.length;
                a >= c && 0 < c && (a = c - 1);
                this._displayIndex !=
                    a ? (this._displayIndex = a, a = this._displayList[this._displayIndex], a instanceof g ? this._setDisplay(a.getDisplay()) : this._setDisplay(a), this._dislayDataList && this._displayIndex <= this._dislayDataList.length && this.origin.copy(this._dislayDataList[this._displayIndex].transform)) : b && this.updateChildArmatureAnimation()
            }!this._isHideDisplay && this._displayBridge.getDisplay() ? this._isDisplayOnStage = !0 : this._isDisplayOnStage = !1
        };
        b.prototype.setVisible = function(a) {
            a != this._visible && (this._visible = a, this._updateVisible(this._visible))
        };
        b.prototype._setArmature = function(b) {
            a.prototype._setArmature.call(this, b);
            this.armature ? (this.armature._slotsZOrderChanged = !0, this._displayBridge.addDisplay(this.armature.getDisplay(), -1)) : this._displayBridge.removeDisplay()
        };
        b.prototype.dispose = function() {
            this._displayBridge && (a.prototype.dispose.call(this), this._displayBridge.dispose(), this._displayList.length = 0, this._dislayDataList = this._displayList = this._displayBridge = null)
        };
        b.prototype._update = function() {
            a.prototype._update.call(this);
            if (this._isDisplayOnStage) {
                var b =
                    this.parent._tweenPivot.x,
                    c = this.parent._tweenPivot.y;
                if (b || c) {
                    var d = this.parent._globalTransformMatrix;
                    this._globalTransformMatrix.tx += d.a * b + d.c * c;
                    this._globalTransformMatrix.ty += d.b * b + d.d * c
                }
                this._displayBridge.updateTransform(this._globalTransformMatrix, this.global)
            }
        };
        b.prototype._updateVisible = function(a) {
            this._displayBridge.setVisible(this.parent.getVisible() && this._visible && a)
        };
        b.prototype.updateChildArmatureAnimation = function() {
            var a = this.getChildArmature();
            if (a)
                if (this._isHideDisplay) a.animation.stop(),
                    a.animation._lastAnimationState = null;
                else {
                    var b = this.armature ? this.armature.animation.getLastAnimationName() : null;
                    b && a.animation.hasAnimation(b) ? a.animation.gotoAndPlay(b) : a.animation.play()
                }
        };
        return b
    }(l);
    c.Slot = m;
    var f = function(a) {
        function b() {
            a.call(this);
            this._children = [];
            this._scaleType = 2;
            this._tweenPivot = new e.Point;
            this.scaleMode = 1
        }
        __extends(b, a);
        b.prototype.setVisible = function(a) {
            if (this._visible != a)
                for (this._visible = a, a = this._children.length; a--;) {
                    var b = this._children[a];
                    b instanceof m &&
                        b._updateVisible(this._visible)
                }
        };
        b.prototype._setArmature = function(b) {
            a.prototype._setArmature.call(this, b);
            for (b = this._children.length; b--;) this._children[b]._setArmature(this.armature)
        };
        b.prototype.dispose = function() {
            if (this._children) {
                a.prototype.dispose.call(this);
                for (var b = this._children.length; b--;) this._children[b].dispose();
                this._children.length = 0;
                this.slot = this._tweenPivot = this._children = null
            }
        };
        b.prototype.contains = function(a) {
            if (!a) throw Error();
            if (a == this) return !1;
            for (; a != this && null !=
                a;) a = a.parent;
            return a == this
        };
        b.prototype.addChild = function(a) {
            if (!a) throw Error();
            if (a == this || a instanceof b && a.contains(this)) throw Error("An Bone cannot be added as a child to itself or one of its children (or children's children, etc.)");
            a.parent && a.parent.removeChild(a);
            this._children[this._children.length] = a;
            a._setParent(this);
            a._setArmature(this.armature);
            !this.slot && a instanceof m && (this.slot = a)
        };
        b.prototype.removeChild = function(a) {
            if (!a) throw Error();
            var b = this._children.indexOf(a);
            if (0 <=
                b) this._children.splice(b, 1), a._setParent(null), a._setArmature(null), a == this.slot && (this.slot = null);
            else throw Error();
        };
        b.prototype.getSlots = function() {
            for (var a = [], b = this._children.length; b--;) this._children[b] instanceof m && a.unshift(this._children[b]);
            return a
        };
        b.prototype._arriveAtFrame = function(a, c, e, h) {
            if (a) {
                if (c = e.getMixingTransform(this.name), !e.displayControl || 2 != c && -1 != c || this.displayController && this.displayController != e.name || !this.slot || (c = a.displayIndex, 0 <= c && !isNaN(a.zOrder) && a.zOrder !=
                    this.slot._tweenZorder && (this.slot._tweenZorder = a.zOrder, this.armature._slotsZOrderChanged = !0), this.slot._changeDisplay(c), this.slot._updateVisible(a.visible)), a.event && this.armature.hasEventListener(d.FrameEvent.BONE_FRAME_EVENT) && (c = new d.FrameEvent(d.FrameEvent.BONE_FRAME_EVENT), c.bone = this, c.animationState = e, c.frameLabel = a.event, this.armature._eventList.push(c)), a.sound && b._soundManager.hasEventListener(d.SoundEvent.SOUND) && (c = new d.SoundEvent(d.SoundEvent.SOUND), c.armature = this.armature, c.animationState =
                    e, c.sound = a.sound, b._soundManager.dispatchEvent(c)), a.action)
                    for (var l in this._children) this._children[l] instanceof m && (e = this._children[l].getChildArmature()) && e.animation.gotoAndPlay(a.action)
            } else this.slot && this.slot._changeDisplay(-1)
        };
        b.prototype._updateColor = function(a, b, c, d, e, h, l, f, m) {
            (m || this._isColorChanged) && this.slot._displayBridge.updateColor(a, b, c, d, e, h, l, f);
            this._isColorChanged = m
        };
        b._soundManager = d.SoundEventManager.getInstance();
        return b
    }(l);
    c.Bone = f;
    var g = function(b) {
        function c(d) {
            b.call(this);
            this.animation = new a.Animation(this);
            this._display = d;
            this._slotsZOrderChanged = !1;
            this._slotList = [];
            this._boneList = [];
            this._eventList = []
        }
        __extends(c, b);
        c.prototype.getDisplay = function() {
            return this._display
        };
        c.prototype.dispose = function() {
            if (this.animation) {
                this.animation.dispose();
                for (var a = this._slotList.length; a--;) this._slotList[a].dispose();
                for (a = this._boneList.length; a--;) this._boneList[a].dispose();
                this._slotList.length = 0;
                this._boneList.length = 0;
                this._eventList.length = 0;
                this.animation = this._display =
                    this._eventList = this._boneList = this._slotList = null
            }
        };
        c.prototype.advanceTime = function(a) {
            this.animation.advanceTime(a);
            a *= this.animation.timeScale;
            for (var b = this._boneList.length; b--;) this._boneList[b]._update();
            for (var b = this._slotList.length, c; b--;) c = this._slotList[b], c._update(), c._isDisplayOnStage && (c = c.getChildArmature()) && c.advanceTime(a);
            this._slotsZOrderChanged && (this.updateSlotsZOrder(), this.hasEventListener(d.ArmatureEvent.Z_ORDER_UPDATED) && this.dispatchEvent(new d.ArmatureEvent(d.ArmatureEvent.Z_ORDER_UPDATED)));
            if (this._eventList.length) {
                a = this._eventList.length;
                for (b = 0; b < a; b++) this.dispatchEvent(this._eventList[b]);
                this._eventList.length = 0
            }
        };
        c.prototype.getSlots = function(a) {
            "undefined" === typeof a && (a = !0);
            return a ? this._slotList.concat() : this._slotList
        };
        c.prototype.getBones = function(a) {
            "undefined" === typeof a && (a = !0);
            return a ? this._boneList.concat() : this._boneList
        };
        c.prototype.getSlot = function(a) {
            for (var b = this._slotList.length; b--;)
                if (this._slotList[b].name == a) return this._slotList[b];
            return null
        };
        c.prototype.getSlotByDisplay =
            function(a) {
                if (a)
                    for (var b = this._slotList.length; b--;)
                        if (this._slotList[b].getDisplay() == a) return this._slotList[b];
                return null
            };
        c.prototype.removeSlot = function(a) {
            if (!a) throw Error();
            if (0 <= this._slotList.indexOf(a)) a.parent.removeChild(a);
            else throw Error();
        };
        c.prototype.removeSlotByName = function(a) {
            a && (a = this.getSlot(a)) && this.removeSlot(a)
        };
        c.prototype.getBone = function(a) {
            for (var b = this._boneList.length; b--;)
                if (this._boneList[b].name == a) return this._boneList[b];
            return null
        };
        c.prototype.getBoneByDisplay =
            function(a) {
                return (a = this.getSlotByDisplay(a)) ? a.parent : null
            };
        c.prototype.removeBone = function(a) {
            if (!a) throw Error();
            if (0 <= this._boneList.indexOf(a)) a.parent ? a.parent.removeChild(a) : a._setArmature(null);
            else throw Error();
        };
        c.prototype.removeBoneByName = function(a) {
            a && (a = this.getBone(a)) && this.removeBone(a)
        };
        c.prototype.addChild = function(a, b) {
            if (!a) throw Error();
            if (b) {
                var c = this.getBone(b);
                if (c) c.addChild(a);
                else throw Error();
            } else a.parent && a.parent.removeChild(a), a._setArmature(this)
        };
        c.prototype.updateSlotsZOrder =
            function() {
                this._slotList.sort(this.sortSlot);
                for (var a = this._slotList.length, b; a--;) b = this._slotList[a], b._isDisplayOnStage && b._displayBridge.addDisplay(this._display, -1);
                this._slotsZOrderChanged = !1
            };
        c.prototype._addDBObject = function(a) {
            a instanceof m ? 0 > this._slotList.indexOf(a) && (this._slotList[this._slotList.length] = a) : a instanceof f && 0 > this._boneList.indexOf(a) && (this._boneList[this._boneList.length] = a, this._sortBoneList())
        };
        c.prototype._removeDBObject = function(a) {
            a instanceof m ? (a = this._slotList.indexOf(a),
                0 <= a && this._slotList.splice(a, 1)) : a instanceof f && (a = this._boneList.indexOf(a), 0 <= a && this._boneList.splice(a, 1))
        };
        c.prototype._sortBoneList = function() {
            var a = this._boneList.length;
            if (0 != a) {
                for (var b = [], c, d, e; a--;) {
                    c = 0;
                    for (e = d = this._boneList[a]; e;) c++, e = e.parent;
                    b[a] = {
                        level: c,
                        bone: d
                    }
                }
                b.sort(this.sortBone);
                for (a = b.length; a--;) this._boneList[a] = b[a].bone
            }
        };
        c.prototype._arriveAtFrame = function(a, b, e, h) {
            a.event && this.hasEventListener(d.FrameEvent.ANIMATION_FRAME_EVENT) && (b = new d.FrameEvent(d.FrameEvent.ANIMATION_FRAME_EVENT),
                b.animationState = e, b.frameLabel = a.event, this._eventList.push(b));
            a.sound && c._soundManager.hasEventListener(d.SoundEvent.SOUND) && (b = new d.SoundEvent(d.SoundEvent.SOUND), b.armature = this, b.animationState = e, b.sound = a.sound, c._soundManager.dispatchEvent(b));
            a.action && e.isPlaying && this.animation.gotoAndPlay(a.action)
        };
        c.prototype.sortSlot = function(a, b) {
            return a.getZOrder() < b.getZOrder() ? 1 : -1
        };
        c.prototype.sortBone = function(a, b) {
            return a.level < b.level ? 1 : -1
        };
        c._soundManager = d.SoundEventManager.getInstance();
        return c
    }(d.EventDispatcher);
    c.Armature = g
})(dragonBones || (dragonBones = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    (function(c) {
        var a = function() {
            function a() {}
            a.prototype.getVisible = function() {
                return this._display ? this._display.visible : !1
            };
            a.prototype.setVisible = function(a) {
                this._display && (this._display.visible = a)
            };
            a.prototype.getDisplay = function() {
                return this._display
            };
            a.prototype.setDisplay = function(a) {
                if (this._display != a) {
                    if (this._display) {
                        var b = this._display.parent;
                        if (b) var c = b.getChildIndex(this._display);
                        this.removeDisplay()
                    }
                    this._display = a;
                    this.addDisplay(b, c)
                }
            };
            a.prototype.dispose = function() {
                this._display =
                    null
            };
            a.prototype.updateTransform = function(c, d) {
                this._display._x = c.tx;
                this._display._y = c.ty;
                this._display._skewX = d.skewX * a.RADIAN_TO_ANGLE;
                this._display._skewY = d.skewY * a.RADIAN_TO_ANGLE;
                this._display._scaleX = d.scaleX;
                this._display._scaleY = d.scaleY
            };
            a.prototype.updateColor = function(a, b, c, d, e, k, n, p) {
                this._display && (this._display._alpha = e)
            };
            a.prototype.updateBlendMode = function(a) {
                this._display && a && (this._display.blendMode = egret.BlendMode.getBlendMode(a))
            };
            a.prototype.addDisplay = function(a, b) {
                a && this._display &&
                    (this._display._parent && this._display._parent.removeChild(this._display), 0 > b ? a.addChild(this._display) : a.addChildAt(this._display, Math.min(b, a.numChildren)))
            };
            a.prototype.removeDisplay = function() {
                this._display && this._display._parent && this._display._parent.removeChild(this._display)
            };
            a.RADIAN_TO_ANGLE = 180 / Math.PI;
            return a
        }();
        c.DragonBonesEgretBridge = a
    })(c.display || (c.display = {}));
    var e = c.display;
    (function(d) {
        var a = function() {
            function a(b, d, e) {
                "undefined" === typeof e && (e = 1);
                this.texture = b;
                this.textureAtlasRawData =
                    d;
                this._textureData = {};
                this.scale = e;
                this.name = d[c.utils.ConstValues.A_NAME];
                this.parseData(d);
                this.spriteSheet = new egret.SpriteSheet(b)
            }
            a.prototype.getTexture = function(a) {
                var b = this.spriteSheet.getTexture(a);
                b || (b = this._textureData[a], b = this.spriteSheet.createTexture(a, b.x, b.y, b.width, b.height));
                return b
            };
            a.prototype.dispose = function() {
                this.texture = null
            };
            a.prototype.getRegion = function(a) {
                throw Error("error");
            };
            a.prototype.parseData = function(a) {
                for (var b = a.SubTexture.length, c = 0; c < b; c++) {
                    var d = a.SubTexture[c];
                    this._textureData[d.name] = d
                }
            };
            return a
        }();
        d.EgretTextureAtlas = a
    })(c.textures || (c.textures = {}));
    (function(d) {
        var a = function(a) {
            function d() {
                a.call(this)
            }
            __extends(d, a);
            d.prototype._generateArmature = function() {
                return new c.Armature(new egret.DisplayObjectContainer)
            };
            d.prototype._generateSlot = function() {
                return new c.Slot(new e.DragonBonesEgretBridge)
            };
            d.prototype._generateDisplay = function(a, b, c, d) {
                var e = new egret.Bitmap;
                e.texture = a.getTexture(b);
                e.anchorOffsetX = c;
                e.anchorOffsetY = d;
                return e
            };
            return d
        }(d.BaseFactory);
        d.EgretFactory = a
    })(c.factorys || (c.factorys = {}))
})(dragonBones || (dragonBones = {}));
(function(c) {
    var e = function() {
        function d() {}
        d.TRACE_RENDER_LOOP = function(a) {
            "undefined" === typeof a && (a = 0);
            var b = c.Ticker.getInstance(),
                d = c.MainContext.instance;
            switch (a) {
                case 0:
                    b.unregister(d.renderLoop, d);
                    break;
                case 1:
                    d.renderLoop();
                    break;
                case 2:
                    b.register(d.renderLoop, d)
            }
        };
        d.DRAW_IMAGE = !0;
        d.ADD_EVENT_LISTENER = !0;
        d.SCALE_BITMAP_SET_SCALE_GRID = !0;
        return d
    }();
    c.DEBUG = e
})(egret || (egret = {}));
(function(c) {
    var e = function() {
        function c() {}
        c.isNumber = function(a) {
            return "number" === typeof a && !isNaN(a)
        };
        return c
    }();
    c.NumberUtils = e
})(egret || (egret = {}));
var __extends = this.__extends || function(c, e) {
        function d() {
            this.constructor = c
        }
        for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
        d.prototype = e.prototype;
        c.prototype = new d
    },
    RES;
(function(c) {
    var e = function(c) {
        function a(a, e, l) {
            "undefined" === typeof e && (e = !1);
            "undefined" === typeof l && (l = !1);
            c.call(this, a, e, l);
            this.itemsTotal = this.itemsLoaded = 0
        }
        __extends(a, c);
        a.dispatchResourceEvent = function(b, c, d, e, f, g) {
            "undefined" === typeof d && (d = "");
            "undefined" === typeof e && (e = null);
            "undefined" === typeof f && (f = 0);
            "undefined" === typeof g && (g = 0);
            var k = egret.Event._getPropertyData(a);
            k.groupName = d;
            k.resItem = e;
            k.itemsLoaded = f;
            k.itemsTotal = g;
            egret.Event._dispatchByTarget(a, b, c, k)
        };
        a.ITEM_LOAD_ERROR =
            "itemLoadError";
        a.CONFIG_COMPLETE = "configComplete";
        a.GROUP_PROGRESS = "groupProgress";
        a.GROUP_COMPLETE = "groupComplete";
        return a
    }(egret.Event);
    c.ResourceEvent = e
})(RES || (RES = {}));
(function(c) {
    var e = function() {
        function c(a, b, d) {
            this._loaded = !1;
            this.name = a;
            this.url = b;
            this.type = d
        }
        Object.defineProperty(c.prototype, "loaded", {
            get: function() {
                return this.data ? this.data.loaded : this._loaded
            },
            set: function(a) {
                this.data && (this.data.loaded = a);
                this._loaded = a
            },
            enumerable: !0,
            configurable: !0
        });
        c.prototype.toString = function() {
            return '[ResourceItem name="' + this.name + '" url="' + this.url + '" type="' + this.type + '"]'
        };
        c.TYPE_XML = "xml";
        c.TYPE_IMAGE = "image";
        c.TYPE_BIN = "bin";
        c.TYPE_TEXT = "text";
        c.TYPE_JSON =
            "json";
        c.TYPE_SHEET = "sheet";
        c.TYPE_FONT = "font";
        c.TYPE_SOUND = "sound";
        return c
    }();
    c.ResourceItem = e
})(RES || (RES = {}));
(function(c) {
    var e = function() {
        function d() {
            this.keyMap = {};
            this.groupDic = {}
        }
        d.prototype.getGroupByName = function(a) {
            var b = [];
            if (!this.groupDic[a]) return b;
            a = this.groupDic[a];
            for (var c = a.length, d = 0; d < c; d++) b.push(this.parseResourceItem(a[d]));
            return b
        };
        d.prototype.getRawGroupByName = function(a) {
            return this.groupDic[a] ? this.groupDic[a] : []
        };
        d.prototype.createGroup = function(a, b, c) {
            "undefined" === typeof c && (c = !1);
            if (!c && this.groupDic[a] || !b || 0 == b.length) return !1;
            c = this.groupDic;
            for (var d = [], e = b.length, f = 0; f <
                e; f++) {
                var g = b[f],
                    k = c[g];
                if (k)
                    for (var g = k.length, n = 0; n < g; n++) {
                        var p = k[n]; - 1 == d.indexOf(p) && d.push(p)
                    } else(p = this.keyMap[g]) && -1 == d.indexOf(p) && d.push(p)
            }
            if (0 == d.length) return !1;
            this.groupDic[a] = d;
            return !0
        };
        d.prototype.parseConfig = function(a, b) {
            if (a) {
                var c = a.resources;
                if (c)
                    for (var d = c.length, e = 0; e < d; e++) {
                        var f = c[e];
                        f.url = b + f.url;
                        this.keyMap[f.name] || (this.keyMap[f.name] = f)
                    }
                if (c = a.groups)
                    for (d = c.length, e = 0; e < d; e++) {
                        for (var g = c[e], k = [], n = g.keys.split(","), p = n.length, q = 0; q < p; q++) f = n[q].trim(), (f = this.keyMap[f]) &&
                            -1 == k.indexOf(f) && k.push(f);
                        this.groupDic[g.name] = k
                    }
            }
        };
        d.prototype.getType = function(a) {
            return (a = this.keyMap[a]) ? a.type : ""
        };
        d.prototype.getRawResourceItem = function(a) {
            return this.keyMap[a]
        };
        d.prototype.getResourceItem = function(a) {
            return (a = this.keyMap[a]) ? this.parseResourceItem(a) : null
        };
        d.prototype.parseResourceItem = function(a) {
            var b = new c.ResourceItem(a.name, a.url, a.type);
            b.data = a;
            return b
        };
        return d
    }();
    c.ResourceConfig = e
})(RES || (RES = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(d) {
        function a() {
            d.call(this);
            this.groupTotalDic = {};
            this.numLoadedDic = {};
            this.itemListDic = {};
            this.priorityQueue = {};
            this.lazyLoadList = [];
            this.analyzerDic = {};
            this.queueIndex = 0
        }
        __extends(a, d);
        a.prototype.isGroupInLoading = function(a) {
            return void 0 !== this.itemListDic[a]
        };
        a.prototype.loadGroup = function(a, d, e) {
            "undefined" === typeof e && (e = 0);
            if (!this.itemListDic[d] && d)
                if (a && 0 != a.length) {
                    this.priorityQueue[e] ? this.priorityQueue[e].push(d) : this.priorityQueue[e] = [d];
                    this.itemListDic[d] =
                        a;
                    e = a.length;
                    for (var m = 0; m < e; m++) a[m].groupName = d;
                    this.groupTotalDic[d] = a.length;
                    this.numLoadedDic[d] = 0;
                    this.next()
                } else a = new c.ResourceEvent(c.ResourceEvent.GROUP_COMPLETE), a.groupName = d, this.dispatchEvent(a)
        };
        a.prototype.loadItem = function(a) {
            this.lazyLoadList.push(a);
            a.groupName = "";
            this.next()
        };
        a.prototype.next = function() {
            var a = this.getOneResourceItem();
            if (a)
                if (a.loaded) this.onItemComplete(a);
                else {
                    var d = this.analyzerDic[a.type];
                    d || (d = this.analyzerDic[a.type] = egret.Injector.getInstance(c.AnalyzerBase,
                        a.type));
                    d.loadFile(a, this.onItemComplete, this)
                }
        };
        a.prototype.getOneResourceItem = function() {
            var a = Number.NEGATIVE_INFINITY,
                c;
            for (c in this.priorityQueue) a = Math.max(a, c);
            a = this.priorityQueue[a];
            if (!a || 0 == a.length) return 0 == this.lazyLoadList.length ? null : this.lazyLoadList.pop();
            c = a.length;
            for (var d, e = 0; e < c; e++) {
                this.queueIndex >= c && (this.queueIndex = 0);
                d = this.itemListDic[a[this.queueIndex]];
                if (0 < d.length) break;
                this.queueIndex++
            }
            return 0 == d.length ? null : d.shift()
        };
        a.prototype.onItemComplete = function(a) {
            var d =
                a.groupName;
            a.loaded || c.ResourceEvent.dispatchResourceEvent(this.resInstance, c.ResourceEvent.ITEM_LOAD_ERROR, d, a);
            if (d) {
                this.numLoadedDic[d]++;
                var e = this.numLoadedDic[d],
                    m = this.groupTotalDic[d];
                c.ResourceEvent.dispatchResourceEvent(this.resInstance, c.ResourceEvent.GROUP_PROGRESS, d, a, e, m);
                e == m && (this.removeGroupName(d), delete this.groupTotalDic[d], delete this.numLoadedDic[d], delete this.itemListDic[d], c.ResourceEvent.dispatchResourceEvent(this, c.ResourceEvent.GROUP_COMPLETE, d))
            } else this.callBack.call(this.resInstance,
                a);
            this.next()
        };
        a.prototype.removeGroupName = function(a) {
            for (var c in this.priorityQueue) {
                for (var d = this.priorityQueue[c], e = d.length, f = 0, g = !1, e = d.length, k = 0; k < e; k++) {
                    if (d[k] == a) {
                        d.splice(f, 1);
                        g = !0;
                        break
                    }
                    f++
                }
                if (g) {
                    0 == d.length && delete this.priorityQueue[c];
                    break
                }
            }
        };
        return a
    }(egret.EventDispatcher);
    c.ResourceLoader = e
})(RES || (RES = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(c) {
        function a() {
            c.call(this)
        }
        __extends(a, c);
        a.prototype.loadFile = function(a, c, d) {};
        a.prototype.getRes = function(a) {};
        a.prototype.destroyRes = function(a) {
            return !1
        };
        a.getStringPrefix = function(a) {
            if (!a) return "";
            var c = a.indexOf(".");
            return -1 != c ? a.substring(0, c) : ""
        };
        a.getStringTail = function(a) {
            if (!a) return "";
            var c = a.indexOf(".");
            return -1 != c ? a.substring(c + 1) : ""
        };
        return a
    }(egret.HashObject);
    c.AnalyzerBase = e
})(RES || (RES = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(c) {
        function a() {
            c.call(this);
            this.fileDic = {};
            this.resItemDic = [];
            this._dataFormat = egret.URLLoaderDataFormat.BINARY;
            this.recycler = new egret.Recycler
        }
        __extends(a, c);
        a.prototype.loadFile = function(a, c, d) {
            if (this.fileDic[a.name]) c.call(d, a);
            else {
                var e = this.getLoader();
                this.resItemDic[e.hashCode] = {
                    item: a,
                    func: c,
                    thisObject: d
                };
                e.load(new egret.URLRequest(a.url))
            }
        };
        a.prototype.getLoader = function() {
            var a = this.recycler.pop();
            a || (a = new egret.URLLoader, a.addEventListener(egret.Event.COMPLETE,
                this.onLoadFinish, this), a.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoadFinish, this));
            a.dataFormat = this._dataFormat;
            return a
        };
        a.prototype.onLoadFinish = function(a) {
            var c = a.target,
                d = this.resItemDic[c.hashCode];
            delete this.resItemDic[c.hashCode];
            this.recycler.push(c);
            var e = d.item,
                f = d.func;
            e.loaded = a.type == egret.Event.COMPLETE;
            e.loaded && this.analyzeData(e, c.data);
            f.call(d.thisObject, e)
        };
        a.prototype.analyzeData = function(a, c) {
            var d = a.name;
            !this.fileDic[d] && c && (this.fileDic[d] = c)
        };
        a.prototype.getRes =
            function(a) {
                return this.fileDic[a]
            };
        a.prototype.hasRes = function(a) {
            return null != this.getRes(a)
        };
        a.prototype.destroyRes = function(a) {
            return this.fileDic[a] ? (delete this.fileDic[a], !0) : !1
        };
        return a
    }(c.AnalyzerBase);
    c.BinAnalyzer = e
})(RES || (RES = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(c) {
        function a() {
            c.call(this);
            this._dataFormat = egret.URLLoaderDataFormat.TEXTURE
        }
        __extends(a, c);
        a.prototype.analyzeData = function(a, c) {
            var d = a.name;
            !this.fileDic[d] && c && (this.fileDic[d] = c, (d = a.data) && d.scale9grid && (d = d.scale9grid.split(","), c.scale9Grid = new egret.Rectangle(parseInt(d[0]), parseInt(d[1]), parseInt(d[2]), parseInt(d[3]))))
        };
        return a
    }(c.BinAnalyzer);
    c.ImageAnalyzer = e
})(RES || (RES = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(c) {
        function a() {
            c.call(this);
            this._dataFormat = egret.URLLoaderDataFormat.TEXT
        }
        __extends(a, c);
        a.prototype.analyzeData = function(a, c) {
            var d = a.name;
            if (!this.fileDic[d] && c) try {
                this.fileDic[d] = JSON.parse(c)
            } catch (e) {}
        };
        return a
    }(c.BinAnalyzer);
    c.JsonAnalyzer = e
})(RES || (RES = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(c) {
        function a() {
            c.call(this);
            this._dataFormat = egret.URLLoaderDataFormat.TEXT
        }
        __extends(a, c);
        return a
    }(c.BinAnalyzer);
    c.TextAnalyzer = e
})(RES || (RES = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(d) {
        function a() {
            d.call(this);
            this.sheetMap = {};
            this._dataFormat = egret.URLLoaderDataFormat.TEXT
        }
        __extends(a, d);
        a.prototype.getRes = function(a) {
            var d = this.fileDic[a];
            !d && (d = c.AnalyzerBase.getStringPrefix(a), d = this.fileDic[d]) && (a = c.AnalyzerBase.getStringTail(a), d = d.getTexture(a));
            return d
        };
        a.prototype.onLoadFinish = function(a) {
            var c = a.target,
                d = this.resItemDic[c.hashCode];
            delete this.resItemDic[c.hashCode];
            this.recycler.push(c);
            var e = d.item,
                f = d.func;
            e.loaded = a.type == egret.Event.COMPLETE;
            e.loaded && this.analyzeData(e, c.data);
            "string" == typeof c.data ? (this._dataFormat = egret.URLLoaderDataFormat.TEXTURE, this.loadFile(e, f, d.thisObject), this._dataFormat = egret.URLLoaderDataFormat.TEXT) : f.call(d.thisObject, e)
        };
        a.prototype.analyzeData = function(a, c) {
            var d = a.name;
            if (!this.fileDic[d] && c) {
                var e;
                if ("string" == typeof c) {
                    try {
                        e = JSON.parse(c)
                    } catch (f) {}
                    e && (this.sheetMap[d] = e, a.loaded = !1, a.url = this.getRelativePath(a.url, e.file))
                } else e = this.sheetMap[d], delete this.sheetMap[d], c && (e = this.parseSpriteSheet(c,
                    e), this.fileDic[d] = e)
            }
        };
        a.prototype.getRelativePath = function(a, c) {
            a = a.split("\\").join("/");
            var d = a.lastIndexOf("/");
            return a = -1 != d ? a.substring(0, d + 1) + c : c
        };
        a.prototype.parseSpriteSheet = function(a, c) {
            var d = c.frames;
            if (!d) return null;
            var e = new egret.SpriteSheet(a),
                f;
            for (f in d) {
                var g = d[f];
                e.createTexture(f, g.x, g.y, g.w, g.h)
            }
            return e
        };
        return a
    }(c.BinAnalyzer);
    c.SheetAnalyzer = e
})(RES || (RES = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(c) {
        function a() {
            c.call(this)
        }
        __extends(a, c);
        a.prototype.analyzeData = function(a, c) {
            var d = a.name;
            if (!this.fileDic[d] && c) {
                var e;
                "string" == typeof c ? (e = c, this.sheetMap[d] = e, a.loaded = !1, a.url = this.getTexturePath(a.url, e)) : (e = this.sheetMap[d], delete this.sheetMap[d], c && (e = new egret.BitmapTextSpriteSheet(c, e), this.fileDic[d] = e))
            }
        };
        a.prototype.getTexturePath = function(a, c) {
            var d = "",
                e = c.split("\n")[2],
                f = e.indexOf('file="'); - 1 != f && (e = e.substring(f + 6), f = e.indexOf('"'), d = e.substring(0,
                f));
            a = a.split("\\").join("/");
            f = a.lastIndexOf("/");
            return a = -1 != f ? a.substring(0, f + 1) + d : d
        };
        return a
    }(c.SheetAnalyzer);
    c.FontAnalyzer = e
})(RES || (RES = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(c) {
        function a() {
            c.call(this);
            this._dataFormat = egret.URLLoaderDataFormat.SOUND
        }
        __extends(a, c);
        return a
    }(c.BinAnalyzer);
    c.SoundAnalyzer = e
})(RES || (RES = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(c) {
        function a() {
            c.call(this);
            this._dataFormat = egret.URLLoaderDataFormat.TEXT
        }
        __extends(a, c);
        a.prototype.analyzeData = function(a, c) {
            var d = a.name;
            if (!this.fileDic[d] && c) try {
                var e = egret.XML.parse(c);
                this.fileDic[d] = e
            } catch (f) {}
        };
        return a
    }(c.BinAnalyzer);
    c.XMLAnalyzer = e
})(RES || (RES = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    c.loadConfig = function(c, a) {
        "undefined" === typeof a && (a = "");
        e.loadConfig(c, a)
    };
    c.loadGroup = function(c, a) {
        "undefined" === typeof a && (a = 0);
        e.loadGroup(c, a)
    };
    c.isGroupLoaded = function(c) {
        return e.isGroupLoaded(c)
    };
    c.getGroupByName = function(c) {
        return e.getGroupByName(c)
    };
    c.createGroup = function(c, a, b) {
        "undefined" === typeof b && (b = !1);
        return e.createGroup(c, a, b)
    };
    c.hasRes = function(c) {
        return e.hasRes(c)
    };
    c.getRes = function(c) {
        return e.getRes(c)
    };
    c.getResAsync = function(c, a, b) {
        e.getResAsync(c, a, b)
    };
    c.getResByUrl =
        function(c, a, b, h) {
            "undefined" === typeof h && (h = "");
            e.getResByUrl(c, a, b, h)
        };
    c.destroyRes = function(c) {
        return e.destroyRes(c)
    };
    c.addEventListener = function(c, a, b, h, l) {
        "undefined" === typeof h && (h = !1);
        "undefined" === typeof l && (l = 0);
        e.addEventListener(c, a, b, h, l)
    };
    c.removeEventListener = function(c, a, b, h) {
        "undefined" === typeof h && (h = !1);
        e.removeEventListener(c, a, b, h)
    };
    var e = new(function(d) {
        function a() {
            d.call(this);
            this.analyzerDic = {};
            this.configComplete = !1;
            this.loadedGroups = [];
            this.groupNameList = [];
            this.asyncDic = {};
            this.init()
        }
        __extends(a, d);
        a.prototype.getAnalyzerByType = function(a) {
            var d = this.analyzerDic[a];
            d || (d = this.analyzerDic[a] = egret.Injector.getInstance(c.AnalyzerBase, a));
            return d
        };
        a.prototype.init = function() {
            egret.Injector.hasMapRule(c.AnalyzerBase, c.ResourceItem.TYPE_BIN) || egret.Injector.mapClass(c.AnalyzerBase, c.BinAnalyzer, c.ResourceItem.TYPE_BIN);
            egret.Injector.hasMapRule(c.AnalyzerBase, c.ResourceItem.TYPE_IMAGE) || egret.Injector.mapClass(c.AnalyzerBase, c.ImageAnalyzer, c.ResourceItem.TYPE_IMAGE);
            egret.Injector.hasMapRule(c.AnalyzerBase, c.ResourceItem.TYPE_TEXT) || egret.Injector.mapClass(c.AnalyzerBase, c.TextAnalyzer, c.ResourceItem.TYPE_TEXT);
            egret.Injector.hasMapRule(c.AnalyzerBase, c.ResourceItem.TYPE_JSON) || egret.Injector.mapClass(c.AnalyzerBase, c.JsonAnalyzer, c.ResourceItem.TYPE_JSON);
            egret.Injector.hasMapRule(c.AnalyzerBase, c.ResourceItem.TYPE_SHEET) || egret.Injector.mapClass(c.AnalyzerBase, c.SheetAnalyzer, c.ResourceItem.TYPE_SHEET);
            egret.Injector.hasMapRule(c.AnalyzerBase, c.ResourceItem.TYPE_FONT) ||
                egret.Injector.mapClass(c.AnalyzerBase, c.FontAnalyzer, c.ResourceItem.TYPE_FONT);
            egret.Injector.hasMapRule(c.AnalyzerBase, c.ResourceItem.TYPE_SOUND) || egret.Injector.mapClass(c.AnalyzerBase, c.SoundAnalyzer, c.ResourceItem.TYPE_SOUND);
            egret.Injector.hasMapRule(c.AnalyzerBase, c.ResourceItem.TYPE_XML) || egret.Injector.mapClass(c.AnalyzerBase, c.XMLAnalyzer, c.ResourceItem.TYPE_XML);
            this.resConfig = new c.ResourceConfig;
            this.resLoader = new c.ResourceLoader;
            this.resLoader.callBack = this.onResourceItemComp;
            this.resLoader.resInstance =
                this;
            this.resLoader.addEventListener(c.ResourceEvent.GROUP_COMPLETE, this.onGroupComp, this)
        };
        a.prototype.loadConfig = function(b, d) {
            this.configURL = b;
            this.resourceRoot = d;
            var e = [new c.ResourceItem(b, b, c.ResourceItem.TYPE_JSON)];
            this.resLoader.loadGroup(e, a.GROUP_CONFIG, Number.MAX_VALUE)
        };
        a.prototype.isGroupLoaded = function(a) {
            return -1 != this.loadedGroups.indexOf(a)
        };
        a.prototype.getGroupByName = function(a) {
            return this.resConfig.getGroupByName(a)
        };
        a.prototype.loadGroup = function(a, c) {
            "undefined" === typeof c &&
                (c = 0);
            if (-1 == this.loadedGroups.indexOf(a) && !this.resLoader.isGroupInLoading(a))
                if (this.configComplete) {
                    var d = this.resConfig.getGroupByName(a);
                    this.resLoader.loadGroup(d, a, c)
                } else this.groupNameList.push({
                    name: a,
                    priority: c
                })
        };
        a.prototype.createGroup = function(a, c, d) {
            "undefined" === typeof d && (d = !1);
            return this.resConfig.createGroup(a, c, d)
        };
        a.prototype.onGroupComp = function(b) {
            if (b.groupName == a.GROUP_CONFIG) {
                b = this.getAnalyzerByType(c.ResourceItem.TYPE_JSON);
                var d = b.getRes(this.configURL);
                b.destroyRes(this.configURL);
                this.resConfig.parseConfig(d, this.resourceRoot);
                this.configComplete = !0;
                c.ResourceEvent.dispatchResourceEvent(this, c.ResourceEvent.CONFIG_COMPLETE);
                b = this.groupNameList;
                for (var d = b.length, e = 0; e < d; e++) {
                    var m = b[e];
                    this.loadGroup(m.name, m.priority)
                }
                this.groupNameList = []
            } else this.loadedGroups.push(b.groupName), this.dispatchEvent(b)
        };
        a.prototype.hasRes = function(a) {
            var d = this.resConfig.getType(a);
            return "" == d && (a = c.AnalyzerBase.getStringPrefix(a), d = this.resConfig.getType(a), "" == d) ? !1 : !0
        };
        a.prototype.getRes =
            function(a) {
                var d = this.resConfig.getType(a);
                return "" == d && (d = c.AnalyzerBase.getStringPrefix(a), d = this.resConfig.getType(d), "" == d) ? null : this.getAnalyzerByType(d).getRes(a)
            };
        a.prototype.getResAsync = function(a, d, e) {
            var m = this.resConfig.getType(a),
                f = a;
            if ("" == m && (f = c.AnalyzerBase.getStringPrefix(a), m = this.resConfig.getType(f), "" == m)) {
                d.call(e, null);
                return
            }(m = this.getAnalyzerByType(m).getRes(a)) ? d.call(e, m): (a = {
                name: a,
                compFunc: d,
                thisObject: e
            }, this.asyncDic[f] ? this.asyncDic[f].push(a) : (this.asyncDic[f] = [a],
                f = this.resConfig.getResourceItem(f), this.resLoader.loadItem(f)))
        };
        a.prototype.getResByUrl = function(a, d, e, m) {
            "undefined" === typeof m && (m = "");
            if (a) {
                m || (m = this.getTypeByUrl(a));
                var f = this.getAnalyzerByType(m).getRes(a);
                f ? d.call(e, f) : (d = {
                    name: a,
                    compFunc: d,
                    thisObject: e
                }, this.asyncDic[a] ? this.asyncDic[a].push(d) : (this.asyncDic[a] = [d], a = new c.ResourceItem(a, a, m), this.resLoader.loadItem(a)))
            } else d.call(e, null)
        };
        a.prototype.getTypeByUrl = function(a) {
            a = a.substr(a.lastIndexOf(".") + 1);
            switch (a) {
                case c.ResourceItem.TYPE_XML:
                case c.ResourceItem.TYPE_JSON:
                case c.ResourceItem.TYPE_SHEET:
                    break;
                case "png":
                case "jpg":
                case "gif":
                    a = c.ResourceItem.TYPE_IMAGE;
                    break;
                case "fnt":
                    a = c.ResourceItem.TYPE_FONT;
                    break;
                case "txt":
                    a = c.ResourceItem.TYPE_TEXT;
                    break;
                default:
                    a = c.ResourceItem.TYPE_BIN
            }
            return a
        };
        a.prototype.onResourceItemComp = function(a) {
            var c = this.asyncDic[a.name];
            delete this.asyncDic[a.name];
            a = this.getAnalyzerByType(a.type);
            for (var d = c.length, e = 0; e < d; e++) {
                var f = c[e],
                    g = a.getRes(f.name);
                f.compFunc.call(f.thisObject, g)
            }
        };
        a.prototype.destroyRes = function(a) {
            var c = this.resConfig.getRawGroupByName(a);
            if (c) {
                var d = this.loadedGroups.indexOf(a); - 1 != d && this.loadedGroups.splice(d, 1);
                a = c.length;
                for (var e = 0; e < a; e++) {
                    d = c[e];
                    d.loaded = !1;
                    var f = this.getAnalyzerByType(d.type);
                    f.destroyRes(d.name)
                }
                return !0
            }
            c = this.resConfig.getType(a);
            if ("" == c) return !1;
            d = this.resConfig.getRawResourceItem(a);
            d.loaded = !1;
            f = this.getAnalyzerByType(c);
            return f.destroyRes(a)
        };
        a.GROUP_CONFIG = "RES__CONFIG";
        return a
    }(egret.EventDispatcher))
})(RES || (RES = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(d) {
        function a() {
            d.call(this);
            this._time = 0;
            this.frameRate = 60;
            a.instance = this;
            this.registerListener()
        }
        __extends(a, d);
        a.prototype.enterFrame = function() {
            var b = a.instance,
                d = a._thisObject,
                e = a._callback,
                m = c.getTimer();
            e.call(d, m - b._time);
            b._time = m;
            b._requestAnimationId = a.requestAnimationFrame.call(window, a.prototype.enterFrame)
        };
        a.prototype.executeMainLoop = function(b, c) {
            a._callback = b;
            a._thisObject = c;
            this.enterFrame()
        };
        a.prototype.reset = function() {
            var b = a.instance;
            b._requestAnimationId &&
                (b._time = c.getTimer(), a.cancelAnimationFrame.call(window, b._requestAnimationId));
            b.enterFrame()
        };
        a.prototype.registerListener = function() {
            window.onfocus = function() {
                a.instance.reset()
            };
            window.onblur = function() {}
        };
        a.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(a) {
            return window.setTimeout(a, 1E3 / 60)
        };
        a.cancelAnimationFrame = window.cancelAnimationFrame || window.msCancelAnimationFrame ||
            window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.oCancelAnimationFrame || window.cancelRequestAnimationFrame || window.msCancelRequestAnimationFrame || window.mozCancelRequestAnimationFrame || window.oCancelRequestAnimationFrame || window.webkitCancelRequestAnimationFrame || function(a) {
                return window.clearTimeout(a)
            };
        return a
    }(c.DeviceContext);
    c.HTML5DeviceContext = e
})(egret || (egret = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(d) {
        function a(a) {
            this.canvas = a;
            this.canvasContext = a.getContext("2d");
            var c = this.canvasContext.setTransform,
                e = this;
            this.canvasContext.setTransform = function(a, b, d, k, n, p) {
                e._matrixA = a;
                e._matrixB = b;
                e._matrixC = d;
                e._matrixD = k;
                e._matrixTx = n;
                e._matrixTy = p;
                c.call(e.canvasContext, a, b, d, k, n, p)
            };
            this._matrixA = 1;
            this._matrixC = this._matrixB = 0;
            this._matrixD = 1;
            this._transformTy = this._transformTx = this._matrixTy = this._matrixTx = 0;
            d.call(this)
        }
        __extends(a, d);
        a.prototype.clearScreen = function() {
            this.setTransform(c.Matrix.identity.identity());
            for (var a = c.RenderFilter.getInstance().getDrawAreaList(), d = 0, e = a.length; d < e; d++) {
                var m = a[d];
                this.clearRect(m.x + this._transformTx, m.y + this._transformTy, m.width, m.height)
            }
            this.renderCost = 0
        };
        a.prototype.clearRect = function(a, c, d, e) {
            this.canvasContext.clearRect(a, c, d, e)
        };
        a.prototype.drawImage = function(a, e, l, m, f, g, k, n, p) {
            e /= c.MainContext.instance.rendererContext.texture_scale_factor;
            l /= c.MainContext.instance.rendererContext.texture_scale_factor;
            m /= c.MainContext.instance.rendererContext.texture_scale_factor;
            f /= c.MainContext.instance.rendererContext.texture_scale_factor;
            a = a._bitmapData;
            g += this._transformTx;
            k += this._transformTy;
            var q = c.getTimer();
            this.canvasContext.drawImage(a, e, l, m, f, g, k, n, p);
            d.prototype.drawImage.call(this, a, e, l, m, f, g, k, n, p);
            this.renderCost += c.getTimer() - q
        };
        a.prototype.setTransform = function(a) {
            1 == a.a && 0 == a.b && 0 == a.c && 1 == a.d && 1 == this._matrixA && 0 == this._matrixB && 0 == this._matrixC && 1 == this._matrixD ? (this._transformTx = a.tx - this._matrixTx, this._transformTy = a.ty - this._matrixTy) : (this._transformTx =
                this._transformTy = 0, this._matrixA == a.a && this._matrixB == a.b && this._matrixC == a.c && this._matrixD == a.d && this._matrixTx == a.tx && this._matrixTy == a.ty || this.canvasContext.setTransform(a.a, a.b, a.c, a.d, a.tx, a.ty))
        };
        a.prototype.save = function() {
            this.canvasContext.save()
        };
        a.prototype.restore = function() {
            this.canvasContext.restore();
            this.canvasContext.setTransform(1, 0, 0, 1, 0, 0)
        };
        a.prototype.setAlpha = function(a, d) {
            a != this.canvasContext.globalAlpha && (this.canvasContext.globalAlpha = a);
            d ? (this.blendValue = d.value, this.canvasContext.globalCompositeOperation =
                d.value) : this.blendValue != c.BlendMode.NORMAL.value && (this.blendValue = c.BlendMode.NORMAL.value, this.canvasContext.globalCompositeOperation = c.BlendMode.NORMAL.value)
        };
        a.prototype.setupFont = function(a) {
            var c = this.canvasContext,
                d = a.italic ? "italic " : "normal ",
                d = d + (a.bold ? "bold " : "normal "),
                d = d + (a.size + "px " + a.fontFamily);
            c.font = d;
            c.textAlign = "left";
            c.textBaseline = "middle"
        };
        a.prototype.measureText = function(a) {
            return this.canvasContext.measureText(a).width
        };
        a.prototype.drawText = function(a, c, e, m, f) {
            var g =
                a._strokeColorString,
                k = a.stroke,
                n = this.canvasContext;
            n.fillStyle = a._textColorString;
            n.strokeStyle = g;
            k && (n.lineWidth = 2 * k, n.strokeText(c, e + this._transformTx, m + this._transformTy, f || 65535));
            n.fillText(c, e + this._transformTx, m + this._transformTy, f || 65535);
            d.prototype.drawText.call(this, a, c, e, m, f)
        };
        a.prototype.clip = function(a, c, d, e) {};
        a.prototype.strokeRect = function(a, c, d, e, f) {
            this.canvasContext.strokeStyle = f;
            this.canvasContext.strokeRect(a, c, d, e)
        };
        a.prototype.pushMask = function(a) {
            this.canvasContext.save();
            this.canvasContext.beginPath();
            this.canvasContext.rect(a.x + this._transformTx, a.y + this._transformTy, a.width, a.height);
            this.canvasContext.clip();
            this.canvasContext.closePath()
        };
        a.prototype.popMask = function() {
            this.canvasContext.restore();
            this.canvasContext.setTransform(1, 0, 0, 1, 0, 0)
        };
        return a
    }(c.RendererContext);
    c.HTML5CanvasRenderer = e
})(egret || (egret = {}));
var egret_h5_graphics;
(function(c) {
    c.beginFill = function(c, a) {
        "undefined" === typeof a && (a = 1);
        var b = "rgba(" + (c >> 16) + "," + ((c & 65280) >> 8) + "," + (c & 255) + "," + a + ")";
        this.fillStyleColor = b;
        this.commandQueue.push(new e(this._setStyle, this, [b]))
    };
    c.drawRect = function(c, a, b, h) {
        this.commandQueue.push(new e(function(a, b, c, d) {
            var e = this.renderContext;
            this.canvasContext.beginPath();
            this.canvasContext.rect(e._transformTx + a, e._transformTy + b, c, d);
            this.canvasContext.closePath()
        }, this, [c, a, b, h]));
        this._fill()
    };
    c.drawCircle = function(c, a, b) {
        this.commandQueue.push(new e(function(a,
            b, c) {
            var d = this.renderContext;
            this.canvasContext.beginPath();
            this.canvasContext.arc(d._transformTx + a, d._transformTy + b, c, 0, 2 * Math.PI);
            this.canvasContext.closePath()
        }, this, [c, a, b]));
        this._fill()
    };
    c.lineStyle = function(c, a, b, h, l, m, f, g) {
        "undefined" === typeof c && (c = NaN);
        "undefined" === typeof a && (a = 0);
        "undefined" === typeof b && (b = 1);
        "undefined" === typeof h && (h = !1);
        "undefined" === typeof l && (l = "normal");
        "undefined" === typeof m && (m = null);
        "undefined" === typeof f && (f = null);
        "undefined" === typeof g && (g = 3);
        this.strokeStyleColor &&
            (this.createEndLineCommand(), this.commandQueue.push(this.endLineCommand));
        this.strokeStyleColor = a = "rgba(" + (a >> 16) + "," + ((a & 65280) >> 8) + "," + (a & 255) + "," + b + ")";
        this.commandQueue.push(new e(function(a, b) {
            this.canvasContext.lineWidth = a;
            this.canvasContext.strokeStyle = b;
            this.canvasContext.beginPath()
        }, this, [c, a]));
        "undefined" === typeof this.lineX && (this.lineY = this.lineX = 0);
        this.moveTo(this.lineX, this.lineY)
    };
    c.lineTo = function(c, a) {
        this.commandQueue.push(new e(function(a, c) {
            var d = this.renderContext;
            this.canvasContext.lineTo(d._transformTx +
                a, d._transformTy + c)
        }, this, [c, a]));
        this.lineX = c;
        this.lineY = a
    };
    c.curveTo = function(c, a, b, h) {
        this.commandQueue.push(new e(function(a, b, c, d) {
            var e = this.renderContext;
            this.canvasContext.quadraticCurveTo(e._transformTx + a, e._transformTy + b, c, d)
        }, this, [c, a, b, h]));
        this.lineX = b;
        this.lineY = h
    };
    c.moveTo = function(c, a) {
        this.commandQueue.push(new e(function(a, c) {
            var d = this.renderContext;
            this.canvasContext.moveTo(d._transformTx + a, d._transformTy + c)
        }, this, [c, a]))
    };
    c.clear = function() {
        this.lineY = this.lineX = this.commandQueue.length =
            0;
        this.fillStyleColor = this.strokeStyleColor = null
    };
    c.createEndFillCommand = function() {
        this.endFillCommand || (this.endFillCommand = new e(function() {
            this.canvasContext.fill()
        }, this, null))
    };
    c.endFill = function() {
        this.fillStyleColor = null
    };
    c._fill = function() {
        this.fillStyleColor && (this.createEndFillCommand(), this.commandQueue.push(this.endFillCommand))
    };
    c.createEndLineCommand = function() {
        this.endLineCommand || (this.endLineCommand = new e(function() {
                this.canvasContext.stroke();
                this.canvasContext.closePath()
            }, this,
            null))
    };
    c._draw = function(c) {
        this.renderContext = c;
        c = this.canvasContext = this.renderContext.canvasContext;
        c.save();
        var a = this.commandQueue.length;
        this.strokeStyleColor && 0 < a && this.commandQueue[a - 1] != this.endLineCommand && (this.createEndLineCommand(), this.commandQueue.push(this.endLineCommand));
        for (var b = 0; b < a; b++) {
            var e = this.commandQueue[b];
            e.method.apply(e.thisObject, e.args)
        }
        c.restore()
    };
    var e = function() {
        return function(c, a, b) {
            this.method = c;
            this.thisObject = a;
            this.args = b
        }
    }();
    c._setStyle = function(c) {
        this.canvasContext.fillStyle =
            c
    };
    c.init = function() {
        for (var d in c) egret.Graphics.prototype[d] = c[d];
        egret.RendererContext.createRendererContext = function(a) {
            return new egret.HTML5CanvasRenderer(a)
        }
    }
})(egret_h5_graphics || (egret_h5_graphics = {}));
egret_h5_graphics.init();
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(d) {
        function a() {
            d.call(this)
        }
        __extends(a, d);
        a.prototype.proceed = function(a) {
            function d(e) {
                c.IOErrorEvent.dispatchIOErrorEvent(a)
            }

            function e(d) {
                switch (this.dataFormat) {
                    case c.URLLoaderDataFormat.TEXT:
                        a.data = f.responseText;
                        break;
                    case c.URLLoaderDataFormat.VARIABLES:
                        a.data = new c.URLVariables(f.responseText);
                        break;
                    case c.URLLoaderDataFormat.BINARY:
                        a.data = f.response;
                        break;
                    default:
                        a.data = f.responseText
                }
                c.callLater(c.Event.dispatchEvent, c.Event, a, c.Event.COMPLETE)
            }
            if (a.dataFormat ==
                c.URLLoaderDataFormat.TEXTURE) this.loadTexture(a);
            else if (a.dataFormat == c.URLLoaderDataFormat.SOUND) this.loadSound(a);
            else {
                var m = a._request,
                    f = this.getXHR();
                f.onerror = d;
                f.onload = e;
                f.open(m.method, m.url, !0);
                this.setResponseType(f, a.dataFormat);
                m.method != c.URLRequestMethod.GET && m.data ? m.data instanceof c.URLVariables ? (f.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), f.send(m.data.toString())) : (f.setRequestHeader("Content-Type", "multipart/form-data"), f.send(m.data)) : f.send()
            }
        };
        a.prototype.loadSound =
            function(a) {
                function d(f) {
                    m.removeEventListener("canplaythrough", d, !1);
                    m.removeEventListener("error", e, !1);
                    f = new c.Sound;
                    f.audio = m;
                    a.data = f;
                    c.callLater(c.Event.dispatchEvent, c.Event, a, c.Event.COMPLETE)
                }

                function e(f) {
                    m.removeEventListener("canplaythrough", d, !1);
                    m.removeEventListener("error", e, !1);
                    c.IOErrorEvent.dispatchIOErrorEvent(a)
                }
                var m = new Audio(a._request.url);
                m.addEventListener("canplaythrough", d, !1);
                m.addEventListener("error", e, !1);
                m.load()
            };
        a.prototype.getXHR = function() {
            return window.XMLHttpRequest ?
                new window.XMLHttpRequest : new ActiveXObject("MSXML2.XMLHTTP")
        };
        a.prototype.setResponseType = function(a, d) {
            switch (d) {
                case c.URLLoaderDataFormat.TEXT:
                case c.URLLoaderDataFormat.VARIABLES:
                    a.responseType = c.URLLoaderDataFormat.TEXT;
                    break;
                case c.URLLoaderDataFormat.BINARY:
                    a.responseType = "arraybuffer";
                    break;
                default:
                    a.responseType = d
            }
        };
        a.prototype.loadTexture = function(a) {
            var d = a._request,
                e = new Image;
            e.crossOrigin = "Anonymous";
            e.onload = function(d) {
                e.onerror = null;
                e.onload = null;
                d = new c.Texture;
                d._setBitmapData(e);
                a.data = d;
                c.callLater(c.Event.dispatchEvent, c.Event, a, c.Event.COMPLETE)
            };
            e.onerror = function(d) {
                e.onerror = null;
                e.onload = null;
                c.IOErrorEvent.dispatchIOErrorEvent(a)
            };
            e.src = d.url
        };
        return a
    }(c.NetContext);
    c.HTML5NetContext = e
})(egret || (egret = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(d) {
        function a(a) {
            d.call(this);
            this.canvas = a;
            this._isTouchDown = !1
        }
        __extends(a, d);
        a.prototype.run = function() {
            var a = this;
            "ontouchstart" in window ? (this.canvas.addEventListener("touchstart", function(c) {
                for (var d = c.changedTouches.length, e = 0; e < d && e < a.maxTouches; e++) a._onTouchBegin(c.changedTouches[e]);
                c.stopPropagation();
                c.preventDefault()
            }, !1), this.canvas.addEventListener("touchmove", function(c) {
                for (var d = c.changedTouches.length, e = 0; e < d && e < a.maxTouches; e++) a._onTouchMove(c.changedTouches[e]);
                c.stopPropagation();
                c.preventDefault()
            }, !1), this.canvas.addEventListener("touchend", function(c) {
                for (var d = c.changedTouches.length, e = 0; e < d && e < a.maxTouches; e++) a._onTouchEnd(c.changedTouches[e]);
                c.stopPropagation();
                c.preventDefault()
            }, !1), this.canvas.addEventListener("touchcancel", function(c) {
                for (var d = c.changedTouches.length, e = 0; e < d && e < a.maxTouches; e++) a._onTouchEnd(c.changedTouches[e]);
                c.stopPropagation();
                c.preventDefault()
            }, !1)) : window.navigator.msPointerEnabled ? (this.canvas.addEventListener("MSPointerDown",
                function(c) {
                    a._onTouchBegin(c);
                    c.stopPropagation();
                    c.preventDefault()
                }, !1), this.canvas.addEventListener("MSPointerMove", function(c) {
                a._onTouchMove(c);
                c.stopPropagation();
                c.preventDefault()
            }, !1), this.canvas.addEventListener("MSPointerUp", function(c) {
                a._onTouchEnd(c);
                c.stopPropagation();
                c.preventDefault()
            }, !1)) : (this.canvas.addEventListener("mousedown", function(c) {
                a._onTouchBegin(c)
            }), this.canvas.addEventListener("mousemove", function(c) {
                a._onTouchMove(c)
            }), this.canvas.addEventListener("mouseup", function(c) {
                a._onTouchEnd(c)
            }));
            window.addEventListener("mousedown", function(c) {
                a.inOutOfCanvas(c) ? a.dispatchLeaveStageEvent() : a._isTouchDown = !0
            });
            window.addEventListener("mouseup", function(c) {
                a._isTouchDown && a.inOutOfCanvas(c) && a.dispatchLeaveStageEvent();
                a._isTouchDown = !1
            })
        };
        a.prototype.inOutOfCanvas = function(a) {
            a = this.getLocation(this.canvas, a);
            return 0 > a.x || 0 > a.y || a.x > this.canvas.width || a.y > this.canvas.height ? !0 : !1
        };
        a.prototype.dispatchLeaveStageEvent = function() {
            c.MainContext.instance.stage.dispatchEventWith(c.Event.LEAVE_STAGE)
        };
        a.prototype._onTouchBegin = function(a) {
            var c = this.getLocation(this.canvas, a),
                d = -1;
            a.hasOwnProperty("identifier") && (d = a.identifier);
            this.onTouchBegan(c.x, c.y, d)
        };
        a.prototype._onTouchMove = function(a) {
            var c = this.getLocation(this.canvas, a),
                d = -1;
            a.hasOwnProperty("identifier") && (d = a.identifier);
            this.onTouchMove(c.x, c.y, d)
        };
        a.prototype._onTouchEnd = function(a) {
            var c = this.getLocation(this.canvas, a),
                d = -1;
            a.hasOwnProperty("identifier") && (d = a.identifier);
            this.onTouchEnd(c.x, c.y, d)
        };
        a.prototype.getLocation = function(a,
            d) {
            var e = document.documentElement,
                m = window,
                f, g;
            "function" === typeof a.getBoundingClientRect ? (g = a.getBoundingClientRect(), f = g.left, g = g.top) : g = f = 0;
            f += m.pageXOffset - e.clientLeft;
            g += m.pageYOffset - e.clientTop;
            null != d.pageX ? (e = d.pageX, m = d.pageY) : (f -= document.body.scrollLeft, g -= document.body.scrollTop, e = d.clientX, m = d.clientY);
            var k = c.Point.identity;
            k.x = (e - f) / c.StageDelegate.getInstance().getScaleX();
            k.y = (m - g) / c.StageDelegate.getInstance().getScaleY();
            return k
        };
        return a
    }(c.TouchContext);
    c.HTML5TouchContext =
        e
})(egret || (egret = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(d) {
        function a() {
            d.call(this);
            this._isSupportDOMParser = this._xmlDict = this._parser = null;
            this._xmlDict = {};
            window.DOMParser ? (this._isSupportDOMParser = !0, this._parser = new DOMParser) : this._isSupportDOMParser = !1
        }
        __extends(a, d);
        a.getInstance = function() {
            a._instance || (a._instance = new a);
            return a._instance
        };
        a.prototype.parserXML = function(a) {
            for (var d = 0;
                "\n" == a.charAt(d) || "\t" == a.charAt(d) || "\r" == a.charAt(d) || " " == a.charAt(d);) d++;
            0 != d && (a = a.substring(d, a.length));
            this._isSupportDOMParser ?
                d = this._parser.parseFromString(a, "text/xml") : (d = new ActiveXObject("Microsoft.XMLDOM"), d.async = "false", d.loadXML(a));
            null == d && c.Logger.info("xml not found!");
            return d
        };
        a._instance = null;
        return a
    }(c.HashObject);
    c.SAXParser = e
})(egret || (egret = {}));
var __extends = this.__extends || function(c, e) {
        function d() {
            this.constructor = c
        }
        for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
        d.prototype = e.prototype;
        c.prototype = new d
    },
    catgame;
(function(c) {
    var e = function(c) {
        function a(a, e) {
            var l = RES.getRes("pot1");
            this.posx = a;
            this.posy = e;
            c.call(this, l);
            this.anchorX = this.anchorY = 0.5;
            this.fill = !1
        }
        __extends(a, c);
        a.prototype.doFillPot = function() {
            this.texture = RES.getRes("pot2");
            this.fill = !0
        };
        a.prototype.clean = function() {
            this.prenode = null
        };
        a.prototype.getPos = function() {
            return [this.posx, this.posy]
        };
        a.prototype.isFill = function() {
            return this.fill
        };
        return a
    }(egret.Bitmap);
    c.Node = e
})(catgame || (catgame = {}));
(function(c) {
    var e = function() {
        function c() {}
        c.hitTest = function(a, b) {
            var c = a.getBounds(),
                d = b.getBounds();
            c.x = a.x;
            c.y = a.y;
            d.x = b.x;
            d.y = b.y;
            return c.intersects(d)
        };
        return c
    }();
    c.GameUtil = e;
    c.createBitmapByName = function(c) {
        var a = new egret.Bitmap;
        c = RES.getRes(c);
        a.texture = c;
        return a
    }
})(catgame || (catgame = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(c) {
        function a() {
            c.call(this);
            this.isWeizhu = !1;
            var a = RES.getRes("stay_json"),
                e = RES.getRes("stay_png");
            this.standmc = new egret.MovieClip(a, e);
            this.standmc.setInterval(3);
            this.standmc.gotoAndPlay("stay");
            a = RES.getRes("weizhu_json");
            e = RES.getRes("weizhu_png");
            this.weizhumc = new egret.MovieClip(a, e);
            this.weizhumc.setInterval(3);
            this.weizhumc.gotoAndPlay("weizhu");
            this.anchorX = 0.5;
            this.anchorY = 1;
            this.stay()
        }
        __extends(a, c);
        a.prototype.init = function() {
            this.isWeizhu = !1;
            this.stay()
        };
        a.prototype.run = function(a) {
            this.x = a[0];
            this.y = a[1];
            this.dispatchEventWith("catRun")
        };
        a.prototype.stay = function() {
            this.numChildren && this.removeChildAt(0);
            this.isWeizhu ? this.addChild(this.weizhumc) : this.addChild(this.standmc)
        };
        a.prototype.weizhu = function() {
            this.isWeizhu = !0;
            this.stay()
        };
        a.prototype.successShow = function() {};
        a.prototype.failShow = function() {};
        return a
    }(egret.Sprite);
    c.Cat = e
})(catgame || (catgame = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(c) {
        function a() {
            c.call(this);
            var a = this.createBitmapByName("failed_bg");
            this.tap_textfeild = new egret.TextField;
            this.tap_textfeild.width = 400;
            this.tap_textfeild.textColor = 16711680;
            this.tap_textfeild.textAlign = egret.HorizontalAlign.CENTER;
            this.tap_textfeild.text = "\u4f60\u6ca1\u6709\u6293\u4f4f\u795e\uff01\u7ecf\uff01\u732b\uff01\uff01";
            this.tap_textfeild.size = 22;
            this.tap_textfeild.x = 20;
            this.tap_textfeild.y = 190;
            this.rank_textfeild = new egret.TextField;
            this.rank_textfeild.width =
                400;
            this.rank_textfeild.textColor = 16777215;
            this.rank_textfeild.textAlign = egret.HorizontalAlign.CENTER;
            this.rank_textfeild.text = "\u7cbe\u795e\u75c5\u9662\u957f\u53c8\u53d1\u795e\u7ecf\u75c5\u4e86\uff01";
            this.rank_textfeild.size = 22;
            this.rank_textfeild.strokeColor = 0;
            this.rank_textfeild.stroke = 2;
            this.rank_textfeild.x = 20;
            this.rank_textfeild.y = 230;
            this.share_btn = this.createBitmapByName("share_btn");
            this.share_btn.x = 10;
            this.share_btn.y = a.height + 20;
            this.share_btn.touchEnabled = !0;
            this.share_btn.addEventListener(egret.TouchEvent.TOUCH_TAP,
                this.doShare, this);
            this.replay_btn = this.createBitmapByName("replay_btn");
            this.replay_btn.x = 220;
            this.replay_btn.y = a.height + 20;
            this.replay_btn.touchEnabled = !0;
            this.replay_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.doRepaly, this);
            this.addChild(a);
            this.addChild(this.tap_textfeild);
            this.addChild(this.rank_textfeild);
            this.addChild(this.share_btn);
            this.addChild(this.replay_btn)
        }
        __extends(a, c);
        a.prototype.score = function(a) {
            this.tap_textfeild.text = "\u60a8\u7528" + a + "\u6b65\u90fd\u6ca1\u6709\u6293\u4f4f\u795e\u7ecf\u732b"
        };
        a.prototype.doShare = function(a) {
            this.dispatchEventWith("shareEvent")
        };
        a.prototype.doRepaly = function(a) {
            this.dispatchEventWith("replayEvent")
        };
        a.prototype.createBitmapByName = function(a) {
            var c = new egret.Bitmap;
            a = RES.getRes(a);
            c.texture = a;
            return c
        };
        return a
    }(egret.Sprite);
    c.FailPanel = e
})(catgame || (catgame = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(d) {
        function a() {
            d.call(this);
            this.map = [];
            this.mapsize = 9;
            this.playTurn = !0;
            this.block = 0.2;
            this.tap = 0;
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this)
        }
        __extends(a, d);
        a.prototype.onAddToStage = function(a) {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this)
        };
        a.prototype.init = function() {
            for (; this.numChildren;) this.removeChildAt(0);
            this.map = [];
            this.createMap();
            this.tap = 0
        };
        a.prototype.createMap = function() {
            for (var a, d = 0; d < this.mapsize; d++) {
                this.map[d] = [];
                for (var e = 0; e < this.mapsize; e++) {
                    a = new c.Node(d, e);
                    a.x = 48 * d + e % 2 * 24;
                    a.y = 44 * e;
                    this.map[d][e] = a;
                    a.touchEnabled = !0;
                    a.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onNodeClick, this);
                    this.addChild(a);
                    var m = (this.mapsize - 1) / 2;
                    d != m && e != m && Math.random() < this.block && (a.doFillPot(), a.touchEnabled = !1)
                }
            }
        };
        a.prototype.lock = function() {
            this.playTurn = !1
        };
        a.prototype.unlock = function() {
            this.playTurn = !0
        };
        a.prototype.getNode = function(a) {
            return this.map[a[0]][a[1]]
        };
        a.prototype.onNodeClick = function(a) {
            this.playTurn &&
                (this.tap += 1, a = a.target, a.doFillPot(), a.touchEnabled = !1, a.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onNodeClick, this), this.dispatchEventWith("nodeClick"))
        };
        a.prototype.showRound = function(a) {
            var c = a.getPos();
            a = this.getRound(c);
            for (var d = a.length, e, f = 0; f < this.mapsize; f++)
                for (var g = 0; g < this.mapsize; g++)
                    if (f != c[0] || g != c[1]) e = this.map[f][g], e.clean();
            for (f = 0; f < d; f++) c = a[f], e = this.map[c[0]][c[1]], e.doFillPot()
        };
        a.prototype.coverPos2Point = function(a) {
            return [this.x + 48 * a[0] + a[1] % 2 * 24, this.y + 44 * a[1]]
        };
        a.prototype.getRound = function(a) {
            var c = a[0],
                d = a[1];
            a = [];
            c = 0 == d % 2 ? [
                [c - 1, d - 1],
                [c - 1, d],
                [c - 1, d + 1],
                [c, d + 1],
                [c + 1, d],
                [c, d - 1]
            ] : [
                [c, d - 1],
                [c - 1, d],
                [c, d + 1],
                [c + 1, d + 1],
                [c + 1, d],
                [c + 1, d - 1]
            ];
            for (d = 0; 6 > d; d++) {
                var e = c[d];
                0 <= e[0] && 0 <= e[1] && e[0] < this.mapsize && e[1] < this.mapsize && a.push(e)
            }
            return a
        };
        a.prototype.findPath = function(a) {
            for (var c, d = 0; d < this.mapsize; d++)
                for (var e = 0; e < this.mapsize; e++) c = this.map[d][e], c.clean();
            c = this.findNode(a);
            d = [];
            if (c)
                for (; c.prenode;) d.push(c.getPos()), c = c.prenode;
            else console.log("\u5df2\u7ecf\u88ab\u56f0\u968f\u4fbf\u8d70\u4e00\u6b65"),
                this.dispatchEventWith("weizhu"), d = this.getNear(a);
            return d.reverse()
        };
        a.prototype.randomSort = function(a, c) {
            return 0.5 < Math.random() ? 1 : -1
        };
        a.prototype.findNode = function(a) {
            var c = [a];
            a = [a];
            for (var d, e = 0, f = 0, g = 0, k = 0, n, p;;) {
                f = a.length;
                if (0 == f) return null;
                for (var q = [], e = 0; e < f; e++) {
                    n = a.shift();
                    d = this.getRound(n.getPos());
                    k = d.length;
                    for (g = 0; g < k; g++)
                        if (p = d[g], p = this.map[p[0]][p[1]], p.isFill()) c.push(p);
                        else if (!(-1 < c.indexOf(p) || -1 < a.indexOf(p))) {
                        p.prenode = n;
                        if (this.isExit(p)) return p;
                        q.push(p)
                    }
                    c.push(n)
                }
                a =
                    q
            }
        };
        a.prototype.getNear = function(a) {
            a = a.getPos();
            a = this.getRound(a);
            for (var c = a.length, d = 0; d < c; d++)
                if (!this.getNode(a[d]).isFill()) return [a[d]];
            return []
        };
        a.prototype.isExit = function(a) {
            a = a.getPos();
            return 0 == a[0] || 0 == a[1] || a[0] == this.mapsize - 1 || a[1] == this.mapsize - 1 ? !0 : !1
        };
        return a
    }(egret.DisplayObjectContainer);
    c.Map = e
})(catgame || (catgame = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(c) {
        function a() {
            c.call(this);
            var a = this.graphics;
            a.beginFill(0, 0.8);
            a.drawRect(0, 0, 400, 200);
            a.endFill();
            this.txt = new egret.TextField;
            this.txt.width = 400;
            this.txt.height = 200;
            this.txt.textAlign = "center";
            this.txt.textColor = 16777215;
            this.txt.size = 24;
            this.txt.y = 60;
            this.addChild(this.txt)
        }
        __extends(a, c);
        a.prototype.showScore = function(a) {
            this.txt.text = a + "\n\u518d\u6765\u4e00\u6b21\u5427"
        };
        return a
    }(egret.Sprite);
    c.ScorePanel = e
})(catgame || (catgame = {}));
__extends = this.__extends || function(c, e) {
    function d() {
        this.constructor = c
    }
    for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
    d.prototype = e.prototype;
    c.prototype = new d
};
(function(c) {
    var e = function(c) {
        function a() {
            c.call(this);
            this.titles_arr = "\u585e\u5916\u9ad8\u624b \u795e\u7cbe\u75c5\u535a\u58eb \u795e\u7ecf\u5927\u795e \u4f60\u662f\u6211\u7684\u5c0f\u82f9\u679c \u9662\u957f\u6d3e\u6765\u7684\u6551\u5175 \u7cbe\u795e\u75c5\u9662\u957f \u626b\u5730\u50e7 \u4f20\u8bf4\u4e2d\u7684\u9ad8\u624b \u98ce\u9a9a\u7684\u5c11\u5e74 \u767d\u5929\u7761\u89c9\u55b5 \u9694\u58c1\u738b\u4f2f\u4f2f".split(" ");
            this.titles2_arr = "\u795e\u7ecf\u5927\u6761 \u6211\u662f\u5904\u5973\u5ea7\u7684 \u505c\u4e0d\u4e0b\u6765 \u4f60\u662f\u6211\u7684\u5c0f\u82f9\u679c \u55b5\u4e86\u4e2a\u54aa\u7684 M78\u661f\u4eba \u51e4\u59d0\u592b \u7b11\u800c\u4e0d\u8bed".split(" ");
            var a = this.createBitmapByName("victory_bg");
            this.tap_textfeild = new egret.TextField;
            this.tap_textfeild.width = 400;
            this.tap_textfeild.textColor = 16711680;
            this.tap_textfeild.textAlign = egret.HorizontalAlign.CENTER;
            this.tap_textfeild.text = "\u60a8\u752813\u6b65\u6293\u4f4f\u4e86\u795e\u7ecf\u732b";
            this.tap_textfeild.size = 22;
            this.tap_textfeild.x = 20;
            this.tap_textfeild.y = 150;
            this.rank_textfeild = new egret.TextField;
            this.rank_textfeild.width = 400;
            this.rank_textfeild.textColor = 16777215;
            this.rank_textfeild.textAlign =
                egret.HorizontalAlign.CENTER;
            this.rank_textfeild.text = "\u795e\u7ecf\u5168\u56fd\u6392\u540d421\u4f4d";
            this.rank_textfeild.size = 22;
            this.rank_textfeild.strokeColor = 0;
            this.rank_textfeild.stroke = 2;
            this.rank_textfeild.x = 20;
            this.rank_textfeild.y = 190;
            this.beat_textfeild = new egret.TextField;
            this.beat_textfeild.width = 400;
            this.beat_textfeild.textColor = 16711680;
            this.beat_textfeild.textAlign = egret.HorizontalAlign.CENTER;
            this.beat_textfeild.size = 22;
            this.beat_textfeild.text = "\u51fb\u8d25\u4e86\u7cbe\u795e\u75c5\u966280%\u7684\u7cbe\u795e\u75c5\u60a3\u8005";
            this.beat_textfeild.x = 20;
            this.beat_textfeild.y = 230;
            this.title_textfeild = new egret.TextField;
            this.title_textfeild.width = 400;
            this.title_textfeild.textColor = 16711680;
            this.title_textfeild.textAlign = egret.HorizontalAlign.CENTER;
            this.title_textfeild.size = 24;
            this.title_textfeild.text = "\u83b7\u5f97\u79f0\u53f7\uff1a\u601d\u7ef4\u5e7f";
            this.title_textfeild.x = 20;
            this.title_textfeild.y = 270;
            this.share_btn = this.createBitmapByName("share_btn");
            this.share_btn.x = 10;
            this.share_btn.y = a.height + 20;
            this.share_btn.touchEnabled = !0;
            this.share_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.doShare, this);
            this.replay_btn = this.createBitmapByName("replay_btn");
            this.replay_btn.x = 220;
            this.replay_btn.y = a.height + 20;
            this.replay_btn.touchEnabled = !0;
            this.replay_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.doRepaly, this);
            this.addChild(a);
            this.addChild(this.tap_textfeild);
            this.addChild(this.rank_textfeild);
            this.addChild(this.beat_textfeild);
            this.addChild(this.title_textfeild);
            this.addChild(this.share_btn);
            this.addChild(this.replay_btn)
        }
        __extends(a, c);
        a.prototype.score = function(a) {
            this.tap_textfeild.text = "\u60a8\u7528" + a + "\u6b65\u6293\u4f4f\u4e86\u795e\u7ecf\u732b";
            this.rank_textfeild.text = "\u795e\u7ecf\u5168\u56fd\u6392\u540d" + Math.floor(100 * a + Math.random() * a * 5) + "\u4f4d";
            this.beat_textfeild.text = "\u51fb\u8d25\u4e86\u7cbe\u795e\u75c5\u9662" + (100 - Math.floor(a * Math.random())) + "%\u7684\u7cbe\u795e\u75c5\u60a3\u8005";
            a = 11 > a ? this.titles_arr[a] : this.titles2_arr[Math.floor(Math.random() * this.titles2_arr.length)];
            this.title_textfeild.text =
                "\u83b7\u5f97\u79f0\u53f7\uff1a" + a
        };
        a.prototype.doShare = function(a) {
            this.dispatchEventWith("shareEvent")
        };
        a.prototype.doRepaly = function(a) {
            this.dispatchEventWith("replayEvent")
        };
        a.prototype.createBitmapByName = function(a) {
            var c = new egret.Bitmap;
            a = RES.getRes(a);
            c.texture = a;
            return c
        };
        return a
    }(egret.Sprite);
    c.SuccessPanel = e
})(catgame || (catgame = {}));
var __extends = this.__extends || function(c, e) {
        function d() {
            this.constructor = c
        }
        for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
        d.prototype = e.prototype;
        c.prototype = new d
    },
    LoadingUI = function(c) {
        function e() {
            c.call(this);
            this.createView()
        }
        __extends(e, c);
        e.prototype.createView = function() {
            this.textField = new egret.TextField;
            this.addChild(this.textField);
            this.textField.y = 300;
            this.textField.width = 480;
            this.textField.height = 100;
            this.textField.textAlign = "center"
        };
        e.prototype.setProgress = function(c, a) {
            this.textField.text =
                "\u6e38\u620f\u52a0\u8f7d\u4e2d..." + c + "/" + a
        };
        return e
    }(egret.Sprite),
    __extends = this.__extends || function(c, e) {
        function d() {
            this.constructor = c
        }
        for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
        d.prototype = e.prototype;
        c.prototype = new d
    };
(function(c) {
    var e = function(d) {
        function a() {
            d.call(this);
            this.isWin = 0;
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this)
        }
        __extends(a, d);
        a.prototype.onAddToStage = function(a) {
            this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
            this.createGameScene()
        };
        a.prototype.createGameScene = function() {
            this.stageW = this.stage.stageWidth;
            this.stageH = this.stage.stageHeight;
            this.map = new c.Map;
            this.map.init();
            this.map.x = 35;
            this.map.y = this.stageH - 440;
            this.addChild(this.map);
            this.cat = new c.Cat;
            this.map.addEventListener("nodeClick", this.onNodeClick, this);
            this.map.addEventListener("weizhu", this.onWeiZhu, this);
            this.cat.addEventListener("catRun", this.onCatRun, this);
            this.btnStart = this.createBitmapByName("btnStart");
            this.btnStart.x = (this.stageW - this.btnStart.width) / 2;
            this.btnStart.y = (this.stageH - this.btnStart.height) / 2;
            this.btnStart.touchEnabled = !0;
            this.btnStart.addEventListener(egret.TouchEvent.TOUCH_TAP, this.gameStart, this);
            this.addChild(this.btnStart);
            this.morebtn = this.createBitmapByName("more_btn");
            this.morebtn.x = (this.stageW - this.morebtn.width) / 2;
            this.morebtn.y = this.stageH - this.morebtn.height;
            this.morebtn.touchEnabled = !0;
            this.morebtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.doMore, this);
            this.scorePanel = new c.ScorePanel;
            this.successPanel = new c.SuccessPanel;
            this.successPanel.addEventListener("shareEvent", this.doShare, this);
            this.successPanel.addEventListener("replayEvent", this.doRestart, this);
            this.failPanel = new c.FailPanel;
            this.failPanel.addEventListener("shareEvent", this.doShare, this);
            this.failPanel.addEventListener("replayEvent", this.doRestart, this)
        };
        a.prototype.onWeiZhu = function(a) {
            this.cat.weizhu()
        };
        a.prototype.doShare = function(a) {
            dp_share(this.map.tap, this.isWin)
        };
        a.prototype.doRestart = function(a) {
            this.gameStart(null)
        };
        a.prototype.doMore = function(a) {
            showme()
        };
        a.prototype.gameStart = function(a) {
            this.map.init();
            this.cat.init();
            this.cat.node = this.map.getNode([4, 4]);
            a = this.map.coverPos2Point([4, 4]);
            this.cat.x = a[0];
            this.cat.y = a[1] + 10;
            this.addChild(this.cat);
            this.btnStart.parent && this.removeChild(this.btnStart);
            this.successPanel.parent && this.removeChild(this.successPanel);
            this.failPanel.parent && this.removeChild(this.failPanel);
            this.morebtn.parent && this.removeChild(this.morebtn);
            this.map.unlock();
            this.isWin = 0
        };
        a.prototype.onNodeClick = function(a) {
            if (this.map.isExit(this.cat.node)) this.showResult(!1);
            else if (this.map.lock(), a = this.map.findPath(this.cat.node), a.length) {
                a = a[0];
                var c = this.map.coverPos2Point(a);
                this.cat.node = this.map.getNode(a);
                this.cat.run(c)
            } else this.showResult(!0)
        };
        a.prototype.onCatRun = function(a) {
            this.map.unlock()
        };
        a.prototype.showResult = function(a) {
            a ? (this.successPanel.x = (this.stageW - this.successPanel.width) / 2, this.successPanel.y = (this.stageH - this.successPanel.height - this.morebtn.height) / 2, this.successPanel.score(this.map.tap), this.addChild(this.successPanel), this.isWin = 1) : (this.failPanel.x = (this.stageW - this.failPanel.width) / 2, this.failPanel.y = (this.stageH - this.failPanel.height - this.morebtn.height) / 2, this.successPanel.score(this.map.tap), this.addChild(this.failPanel), this.isWin = 2);
            this.addChild(this.morebtn)
        };
        a.prototype.createBitmapByName = function(a) {
            var c = new egret.Bitmap;
            a = RES.getRes(a);
            c.texture = a;
            return c
        };
        return a
    }(egret.DisplayObjectContainer);
    c.GameContainer = e
})(catgame || (catgame = {}));
var __extends = this.__extends || function(c, e) {
        function d() {
            this.constructor = c
        }
        for (var a in e) e.hasOwnProperty(a) && (c[a] = e[a]);
        d.prototype = e.prototype;
        c.prototype = new d
    },
    GameApp = function(c) {
        function e() {
            c.call(this);
            this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this)
        }
        __extends(e, c);
        e.prototype.onAddToStage = function(c) {
            this.loadingView = new LoadingUI;
            this.stage.addChild(this.loadingView);
            RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
            RES.loadConfig("static/json/resource.js",
                "static/json/")
        };
        e.prototype.onConfigComplete = function(c) {
            RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.loadGroup("preload")
        };
        e.prototype.onResourceLoadComplete = function(c) {
            "preload" == c.groupName && (this.stage.removeChild(this.loadingView), RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE,
                this.onResourceLoadComplete, this), RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this), this.createGameScene())
        };
        e.prototype.onResourceProgress = function(c) {
            "preload" == c.groupName && this.loadingView.setProgress(c.itemsLoaded, c.itemsTotal)
        };
        e.prototype.createGameScene = function() {
            var c = this.createBitmapByName("bgImage");
            this.addChild(c);
            var a = this.stage.stageHeight;
            c.width = this.stage.stageWidth;
            c.height = a;
            c = new catgame.GameContainer;
            this.addChild(c)
        };
        e.prototype.createBitmapByName =
            function(c) {
                var a = new egret.Bitmap;
                c = RES.getRes(c);
                a.texture = c;
                return a
            };
        return e
    }(egret.DisplayObjectContainer);