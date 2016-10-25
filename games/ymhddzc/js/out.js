var link, jsGame; (function() {
	var g, h, a, b, c, d, e = window.eval,
	f = function(a, b, c) {
		c = c || {};
		if (b) {
			var f = function() {};
			f.prototype = b.prototype;
			a.prototype = new f;
			a.prototype.constructor = a;
			a.prototype.superClass = b.prototype;
			f = null
		}
		for (var d in c) a.prototype[d] = c[d];
		c = null;
		return a
	};
	window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || window.setTimeout;
	window.cancelAnimationFrame = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || window.msCancelAnimationFrame || window.clearTimeout;
	String || (String = {});
	String.format || (String.format = function() {
		if (0 == arguments.length) return null;
		for (var a = arguments[0] || "", b, c = 1, f = arguments.length; c < f; c++) b = RegExp("\\{" + (c - 1) + "\\}", "gm"),
		a = a.replace(b, arguments[c]);
		return a
	});
	String.getByteLength || (String.getByteLength = function(a) {
		for (var b = 0,
		c = a || "",
		f = c.length,
		a = 0; a < f; a++) b = 0 <= c.charCodeAt(a) & 255 >= c.charCodeAt(a) ? b + 1 : b + 2;
		return b
	});
	if (!Array || !Array.prototype) Array.prototype = {};
	Array.prototype.indexOfAttr = function(a, b) {
		for (var c = (typeof a).toLowerCase(), f = -1, d = 0, e = this.length; d < e; d++) if ("string" == c && this[d][a] == b || "number" == c && this[d] == a) {
			f = d;
			break
		}
		return f
	};
	var i = "linkScreen",
	k = "12px Arial",
	x = 240,
	l = 320,
	m = [],
	s = [],
	t = "",
	v = 1,
	z = !1,
	u = 1,
	n = {
		loadRes: null,
		pageLoad: null,
		menu: null,
		run: null,
		runFn: function() {},
		rafRun: null,
		stop: null,
		over: null,
		zone: null,
		active: null,
		lastDate: Date.now(),
		timeout: 30,
		isPause: !1,
		gameFlow: -1,
		loadedImageToGameFlow: -1,
		zoneArgs: null,
		activeArgs: null,
		spendTime: 0,
		loadResTimer: null,
		playTimer: null
	},
	j = {
		key: 0,
		keys: {
			up: !1,
			down: !1,
			left: !1,
			right: !1,
			a: !1,
			b: !1,
			c: !1,
			menu: !1,
			quit: !1
		},
		lastKey: {
			up: !1,
			down: !1,
			left: !1,
			right: !1,
			a: !1,
			b: !1,
			c: !1,
			menu: !1,
			quit: !1
		},
		pressedKey: {
			up: !1,
			down: !1,
			left: !1,
			right: !1,
			a: !1,
			b: !1,
			c: !1,
			menu: !1,
			quit: !1
		},
		keyPressCtrl: {
			up: !0,
			down: !0,
			left: !0,
			right: !0,
			a: !0,
			b: !0,
			c: !0,
			menu: !0,
			quit: !0
		},
		keyDownGo: !1,
		keyUpGo: !1,
		keyPressedGo: !1,
		keyDownCallBack: null,
		keyUpCallBack: null,
		orientationChange: null,
		touchStart: null,
		touchEnd: null,
		touchMove: null,
		touchCancel: null,
		clickCallBack: null,
		mouseDownCallBack: null,
		mouseUpCallBack: null,
		mouseMoveCallBack: null,
		focused: !1,
		pageFocusCallBack: null,
		pageUnFocusCallBack: null,
		swipeCallBack: null,
		pageOffX: 0,
		pageOffY: 0,
		pageStarOffX: 0,
		pageStarOffY: 0,
		swipeDate: null,
		swipeTimeout: 200,
		swipeRange: 50
	},
	r = {},
	G = [],
	J = {},
	H = {},
	P = 0,
	K = 0,
	L = "",
	S = !1,
	A = {},
	y = {
		xhrObj: null,
		pool: [],
		poolLength: 5,
		date: null,
		isTimeout: !1,
		param: {
			type: "get",
			data: null,
			dataType: "json",
			url: "",
			xhr: null,
			timeout: 5E3,
			before: function() {},
			success: function() {},
			error: function() {},
			complete: function() {}
		}
	},
	Z = [],
	C = [],
	da = f(function(a) {
		this.id = a.id;
		this.value = a.value;
		this.x = a.x;
		this.y = a.y;
		this.width = a.width;
		this.height = a.height;
		this.bgColor = a.bgColor;
		this.bgStroke = a.bgStroke;
		this.stroke = a.stroke;
		this.font = a.font;
		this.imageId = a.imageId;
		this.sx = a.sx;
		this.sy = a.sy;
		this.color = a.color;
		this.hx = a.hx;
		this.hy = a.hy;
		this.hColor = a.hColor;
		this.dex = a.dex;
		this.dey = a.dey;
		this.deColor = a.deColor;
		this.hided = a.hided;
		this.disabled = a.disabled;
		this.path = a.path;
		this.goned = this.released = this.pressed = this.repeated = this.hovered = !1;
		this.cacheId = "buttonLayoutCache_" + this.id;
		this.setDelay(a.delay).refresh()
	},
	null, {
		refresh: function() {
			w.canvas.pass(this.cacheId, 3 * this.width, this.height);
			"" == this.imageId ? ("" != this.bgColor && w.canvas.fillStyle(this.bgColor).fillRect(0, 0, this.width, this.height).fillRect(this.width, 0, this.width, this.height).fillRect(2 * this.width, 0, this.width, this.height), "" != this.bgStroke && w.canvas.strokeStyle(this.bgStroke).strokeRect(1, 1, this.width - 2, this.height - 2).strokeRect(this.width + 1, 1, this.width - 2, this.height - 2).strokeRect(2 * this.width + 1, 1, this.width - 2, this.height - 2)) : w.canvas.drawImage(this.imageId, this.sx, this.sy, this.width, this.height, 0, 0, this.width, this.height).drawImage(this.imageId, this.hx, this.hy, this.width, this.height, this.width, 0, this.width, this.height).drawImage(this.imageId, this.dex, this.dey, 2 * this.width, this.height, 2 * this.width, 0, this.width, this.height);
			if ("" != this.value) {
				var a = w.canvas.font(this.font).measureText(this.value),
				b = this.width - a.width >> 1,
				a = (this.height - a.height >> 1) + parseInt(this.font) - 2;
				"" != this.stroke && w.canvas.fillStyle(this.stroke).fillText(this.value, b - 1, a).fillText(this.value, b, a - 1).fillText(this.value, b + 1, a).fillText(this.value, b, a + 1).fillText(this.value, b + this.width - 1, a).fillText(this.value, b + this.width, a - 1).fillText(this.value, b + this.width + 1, a).fillText(this.value, b + this.width, a + 1).fillText(this.value, b + 2 * this.width - 1, a).fillText(this.value, b + 2 * this.width, a - 1).fillText(this.value, b + 2 * this.width + 1, a).fillText(this.value, b + 2 * this.width, a + 1);
				w.canvas.fillStyle(this.color).fillText(this.value, b, a).fillStyle(this.hColor).fillText(this.value, b + this.width, a).fillStyle(this.deColor).fillText(this.value, b + 2 * this.width, a)
			}
			w.canvas.pass();
			return this
		},
		show: function() {
			this.hided = !1;
			return this
		},
		hide: function() {
			this.hided = !0;
			return this
		},
		disable: function(a) {
			this.disabled = a;
			return this
		},
		setPath: function(a, b) {
			this.setDelay(b).path = a || [];
			return this
		},
		endPath: function() {
			return 0 == this.path.length
		},
		gone: function(a, b) {
			this.setPath(a, b).goned = !0;
			return this
		},
		setDelay: function(a) {
			this.delay = a || 0;
			this.delayDate = null;
			0 < this.delay && (this.delayDate = Date.now());
			return this
		},
		action: function() {
			if (this.hided) return this;
			this.delayDate && Date.now() - this.delayDate >= this.delay && (this.delayDate = null);
			if (!this.delayDate && 0 < this.path.length) {
				var a = this.path.shift();
				this.x += a[0];
				this.y += a[1]
			}
			return this
		},
		render: function() {
			if (this.hided) return this;
			w.canvas.drawCache(this.cacheId, this.hovered ? this.width: this.disabled ? 2 * this.width: 0, 0, this.width, this.height, this.x, this.y, this.width, this.height);
			return this
		},
		disposed: function() {
			return this
		}
	}),
	$ = {
		up: 38,
		down: 40,
		left: 37,
		right: 39,
		a: 90,
		b: 88,
		c: 67,
		menu: 49,
		quit: 50
	},
	B = {
		menu: 0,
		run: 1,
		stop: 2,
		over: 3,
		zone: 4,
		active: 5,
		loadImage: 6,
		loadedImage: 7
	},
	aa,
	q = {
		getCanvasDom: function() {
			aa || (aa = w.getDom("linkScreen"));
			return aa
		},
		getOffsetX: function(a) {
			return a.offsetX || (a.changedTouches && a.changedTouches[0] ? a.changedTouches[0].clientX - q.getCanvasDom().offsetLeft: a.clientX - q.getCanvasDom().offsetLeft) || 0
		},
		getOffsetY: function(a) {
			return a.offsetY || (a.changedTouches && a.changedTouches[0] ? a.changedTouches[0].clientY - q.getCanvasDom().offsetTop: a.clientY - q.getCanvasDom().offsetTop) || 0
		},
		keydown: function(a) {
			var b = q.checkKey(a.keyCode);
			j.keyDownGo && void 0 != j.keys[b] && (j.keys[b] = !0);
			j.keyUpGo && void 0 != j.lastKey[b] && (j.lastKey[b] = !1);
			j.keyPressCtrl[b] && j.keyPressedGo && (void 0 != j.pressedKey[b] && (j.pressedKey[b] = !0), j.keyPressCtrl[b] = !1);
			null != j.keyDownCallBack && j.keyDownCallBack(a)
		},
		keyup: function(a) {
			var b = q.checkKey(a.keyCode);
			j.keyDownGo && void 0 != j.keys[b] && (j.keys[b] = !1);
			j.keyUpGo && void 0 != j.lastKey[b] && (j.lastKey[b] = !0);
			j.keyPressedGo && (void 0 != j.pressedKey[b] && (j.pressedKey[b] = !1), j.keyPressCtrl[b] = !0);
			null != j.keyUpCallBack && j.keyUpCallBack(a)
		},
		orientationchange: function(a) {
			null != j.orientationChange && j.orientationChange(a)
		},
		swipeStart: function(a, b) {
			null != j.swipeCallBack && (j.swipeDate = Date.now(), j.pageStarOffX = a, j.pageStarOffY = b)
		},
		swipeSuccess: function(a, b) {
			if (j.swipeDate) {
				if (Date.now() - j.swipeDate < j.swipeTimeout && (Math.abs(a - j.pageStarOffX) >= j.swipeRange || Math.abs(b - j.pageStarOffY) >= j.swipeRange)) return j.swipeCallBack(j.pageStarOffX, j.pageStarOffY, a, b),
				!0;
				j.swipeDate = null
			}
			return ! 1
		},
		touchstart: function(a) {
			a.preventDefault();
			j.pageOffX = q.getOffsetX(a);
			j.pageOffY = q.getOffsetY(a);
			null != j.touchStart && j.touchStart(a, j.pageOffX, j.pageOffY);
			if (q.buttonLayoutEventHandler(a.type, j.pageOffX, j.pageOffY)) return ! 1;
			q.swipeStart(j.pageOffX, j.pageOffY)
		},
		touchend: function(a) {
			a.preventDefault();
			if (q.swipeSuccess(j.pageOffX, j.pageOffY) || q.buttonLayoutEventHandler(a.type, j.pageOffX, j.pageOffY)) return ! 1;
			null != j.touchEnd && j.touchEnd(a, j.pageOffX, j.pageOffY)
		},
		touchmove: function(a) {
			a.preventDefault();
			j.pageOffX = q.getOffsetX(a);
			j.pageOffY = q.getOffsetY(a);
			null != j.touchMove && j.touchMove(a, j.pageOffX, j.pageOffY)
		},
		touchcancel: function(a) {
			j.pageOffX = q.getOffsetX(a);
			j.pageOffY = q.getOffsetY(a);
			null != j.touchCancel && j.touchCancel(a, j.pageOffX, j.pageOffY)
		},
		click: function(a) {
			null != j.clickCallBack && j.clickCallBack(a, q.getOffsetX(a), q.getOffsetY(a))
		},
		mouseDown: function(a) {
			var b = q.getOffsetX(a),
			c = q.getOffsetY(a);
			if (q.buttonLayoutEventHandler(a.type, b, c)) return ! 1;
			null != j.mouseDownCallBack && j.mouseDownCallBack(a, b, c);
			q.swipeStart(b, c)
		},
		mouseUp: function(a) {
			var b = q.getOffsetX(a),
			c = q.getOffsetY(a);
			if (q.buttonLayoutEventHandler(a.type, b, c) || q.swipeSuccess(b, c)) return ! 1;
			null != j.mouseUpCallBack && j.mouseUpCallBack(a, b, c)
		},
		mouseMove: function(a) {
			null != j.mouseMoveCallBack && j.mouseMoveCallBack(a, q.getOffsetX(a), q.getOffsetY(a))
		},
		pageFocus: function(a) {
			if (j.focused) return j.focused = !1;
			null != j.pageFocusCallBack && j.pageFocusCallBack(a)
		},
		pageUnFocus: function(a) {
			null != j.pageUnFocusCallBack && j.pageUnFocusCallBack(a)
		},
		checkKey: function(a) {
			var b = "0",
			c;
			for (c in $) if ($[c] == a) {
				b = c;
				break
			}
			return b
		},
		getDeviceConfig: function() {
			var a = navigator.userAgent.toLowerCase();
			return - 1 != a.indexOf("duopaosafari") ? {
				device: "duopaoSafari",
				fps: 1,
				touch: !0,
				zoom: 1
			}: -1 != a.indexOf("iphone") || -1 != a.indexOf("ipod") ? {
				device: "iphone",
				fps: 1,
				touch: !0,
				zoom: 1
			}: -1 != a.indexOf("ipad") ? {
				device: "ipad",
				fps: 1,
				touch: !0,
				zoom: 1
			}: -1 != a.indexOf("duopaoandroid") ? {
				device: "duopaoAndroid",
				fps: 1,
				touch: !0,
				zoom: 1
			}: -1 != a.indexOf("duopaowindowsphone") ? {
				device: "duopaoWindowsPhone",
				fps: 1,
				touch: !0,
				zoom: 1
			}: -1 != a.indexOf("opera mobi") ? {
				device: "operamobile",
				fps: 1,
				touch: !0,
				zoom: 1
			}: -1 != a.indexOf("flyflow") ? {
				device: "flyflow",
				fps: 1,
				touch: !0,
				zoom: 1
			}: -1 != a.indexOf("android") ? {
				device: "android",
				fps: 1,
				touch: !0,
				zoom: 1
			}: -1 != a.indexOf("iemobile") ? {
				device: "iemobile",
				fps: 1,
				touch: !1,
				zoom: 1
			}: -1 != a.indexOf("j2me") ? {
				device: "j2me",
				fps: 1,
				touch: !1,
				zoom: 1
			}: -1 != a.indexOf("symbian v5") ? {
				device: "symbian5",
				fps: 1,
				touch: !0,
				zoom: 1
			}: -1 != a.indexOf("symbian v3") ? {
				device: "symbian3",
				fps: 1,
				touch: !1,
				zoom: 1
			}: -1 != a.indexOf("chrome") ? {
				device: "chrome",
				fps: 1,
				touch: !1,
				zoom: 1
			}: -1 != a.indexOf("firefox") ? {
				device: "firefox",
				fps: 1,
				touch: !1,
				zoom: 1
			}: -1 != a.indexOf("msie") ? {
				device: "ie",
				fps: 0.5,
				touch: !1,
				zoom: 1
			}: -1 != a.indexOf("windows") ? {
				device: "ie",
				fps: 0.5,
				touch: !1,
				zoom: 1
			}: -1 != a.indexOf("safari") ? {
				device: "safari",
				fps: 1,
				touch: !1,
				zoom: 1
			}: -1 != a.indexOf("opera") ? {
				device: "opera",
				fps: 1,
				touch: !1,
				zoom: 1
			}: {
				device: "",
				fps: 1,
				touch: !1,
				zoom: 1
			}
		},
		setImage: function(a, b, c, f, d) {
			if (!a || !b) return ! 1;
			r[a] || (r[a] = new Image, r[a].onload = function() {
				K++;
				this.loaded = !0;
				this.cache && w.canvas.pass(this.id, this.width, this.height).drawImage(this.id, 0, 0).pass().base().delImage(this.id, !0)
			},
			r[a].src = b + ("" != L ? "?v=" + L: ""), r[a].id = a, r[a].url = b, r[a].benchId = c, r[a].bench = f, r[a].cache = d, r[a].refreshed = !1)
		},
		setAudio: function(a, b, c, f, d, e) {
			if (!a || !b) return ! 1;
			A[a] || (b = new Audio(b + ("" != L ? "?v=" + L: "")), b.id = a, b.autoplay = f, b.preload = d, b.autobuffer = e, b.loop = c, A[b.id] = b)
		},
		loadingCallBack: function(a, b, c) {
			var f = w.canvas.screen.getWidth(),
			d = w.canvas.screen.getHeight(),
			e = parseInt(f - f >> 1),
			i = d - 5,
			a = a > b ? b: a,
			k = parseInt(100 * (a / b)) + "%";
			w.canvas.fillStyle("#000").fillRect(0, 0, f, d).fillStyle("#00FFFF").fillRect(e, i, parseInt(a / b * f), 5).fillStyle("#FFF").fillText("loading " + c, 5, d - 10).fillText(k, f - w.canvas.measureText(k).width - 5, d - 10)
		},
		loadingEndCallBack: null,
		getAnchor: function(a, b, c, f, d) {
			switch (d) {
			case 3:
				a -= parseInt(c / 2);
				b -= parseInt(f / 2);
				break;
			case 6:
				b -= parseInt(f / 2);
				break;
			case 10:
				a -= c;
				b -= parseInt(f / 2);
				break;
			case 17:
				a -= parseInt(c / 2);
				break;
			case 24:
				a -= c;
				break;
			case 33:
				a -= parseInt(c / 2);
				b -= f;
				break;
			case 36:
				b -= f;
				break;
			case 40:
				a -= c,
				b -= f
			}
			return {
				x: a,
				y: b
			}
		},
		initUrlParams: function(a) {
			if (0 <= a.indexOf("?")) {
				var b = a.split("?"),
				a = [];
				0 <= b[1].indexOf("&") ? a = b[1].split("&") : a.push(b[1]);
				for (var b = [], c = 0; c < a.length; c++) 0 <= a[c].indexOf("=") && (b = a[c].split("="), Z[b[0]] = b[1])
			}
		},
		audioEnded: function() {
			w.audio.replay(this.id)
		},
		pageLoaded: function() {
			S = !0;
			n.pageLoad(w)
		},
		buttonLayoutAction: function() {
			for (var a, b = C.length - 1; 0 <= b; b--) if (a = C[b]) a.action().render(),
			a.goned && a.endPath() && C.splice(b, 1)
		},
		buttonLayoutEventHandler: function(a, b, c) {
			for (var f, d = !1,
			e = C.length - 1; 0 <= e; e--) if (f = C[e]) if (w.comm.collision(f.x, f.y, f.width, f.height, b - 5, c - 5, 10, 10)) {
				switch (a) {
				case "mousedown":
				case "touchstart":
					f.hovered = !0;
					f.repeated = !0;
					f.pressed = !0;
					f.released = !1;
					break;
				case "mouseup":
				case "touchend":
					f.hovered && (f.released = !0, f.hovered = !1),
					f.repeated = !1,
					f.pressed = !1
				}
				d = !0
			} else if ("mouseup" == a || "touchend" == a) f.hovered = !1,
			f.repeated = !1;
			return d
		}
	},
	p,
	D,
	M,
	N,
	E,
	Q,
	O,
	R,
	T = [],
	ca = 0,
	U = 0,
	w = jsGame = link = {
		init: function(a, b) { ! a && !b ? (this.version = 1, this.request.init(), this.canvas.initDevice(), this.localStorage.init(), this.sessionStorage.init()) : (x = a, l = b);
			return this
		},
		extend: f,
		setAjax: function(a) {
			y.param = this.objExtend(y.param, a || {});
			return this
		},
		ajax: function(a) {
			a && y.pool.length < y.poolLength && y.pool.push(a);
			a && a.clear && (y.pool = []);
			y.xhr || (y.xhr = new XMLHttpRequest, y.xhr.onreadystatechange = function() {
				if (y.isTimeout) return ! 1;
				var a = y.xhr,
				b = y.xhrObj;
				if (b && 4 == a.readyState) {
					y.date && (clearTimeout(y.date), y.date = null);
					if (200 == a.status) {
						switch (b.dataType) {
						case "HTML":
						case "SCRIPT":
						case "XML":
							a = a.responseText;
							break;
						default:
							a = a.responseText.replace(/<[^>].*?>/g, "");
							break;
						case "JSON":
							a = w.getJson(a.responseText)
						}
						b.success(a, b);
						b.complete(b)
					} else b.error(b, "error");
					y.xhrObj = null;
					w.ajax()
				}
			});
			if (null == y.xhrObj && 0 < y.pool.length) {
				y.xhrObj = this.objExtend(y.param, y.pool.shift() || {});
				var a = y.xhr,
				b = y.xhrObj,
				c = y.xhrObj.url,
				f = null,
				d = b.data;
				b.type = b.type.toUpperCase();
				b.dataType = b.dataType.toUpperCase();
				y.isTimeout = !1;
				if ("string" == typeof d) f = d;
				else if ("object" == typeof d) {
					var f = [],
					e;
					for (e in d) f.push(e + "=" + d[e]);
					f = f.join("&")
				}
				"GET" == b.type && (c += "?" + f);
				a.open(b.type, c, !0);
				b.before(y.xhrObj);
				"POST" == b.type && a.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
				a.send(f);
				a = b = f = d = c = null;
				y.date = setTimeout(function() {
					w.ajax({
						clear: !0
					});
					y.isTimeout = !0;
					y.xhrObj && (y.xhrObj.error(y.xhrObj, "timeout"), y.xhrObj = null)
				},
				y.xhrObj.timeout)
			}
			return this
		},
		getDom: function(a) {
			try {
				return document.getElementById(a)
			} catch(b) {
				return document.all[a]
			}
		},
		objExtend: function() {
			var a = this.clone(arguments[0]) || {},
			b = 1,
			c = arguments.length,
			f = !1,
			d;
			"boolean" === typeof a && (f = a, a = arguments[1] || {},
			b = 2);
			"object" !== typeof a && (a = {});
			c == b && (a = this, --b);
			if (!arguments[1]) return a;
			for (; b < c; b++) if (null != (d = arguments[b])) for (var e in d) {
				var i = a[e],
				k = d[e];
				a !== k && (f && k && "object" === typeof k && !k.nodeType ? a[e] = this.objExtend(f, i || (null != k.length ? [] : {}), k) : void 0 !== k && (a[e] = k))
			}
			return a
		},
		getJson: function(a) {
			var b = {};
			try {
				b = window.JSON ? JSON.parse(a) : e("(" + a + ")")
			} catch(c) {}
			return b
		},
		clone: function(a) {
			var b = a || [];
			if ("object" == typeof b) if (void 0 != b.length) for (var a = [], c = 0, f = b.length; c < f; c++) void 0 !== b[c] && (a[c] = null != b[c] && "object" == typeof b[c] ? void 0 != b[c].length ? b[c].slice(0) : b[c] : b[c]);
			else for (c in a = {},
			b) void 0 !== b[c] && (a[c] = null != b[c] && "object" == typeof b[c] ? void 0 != b[c].length ? b[c].slice(0) : b[c] : b[c]);
			return a
		},
		classes: {},
		comm: {
			registerNotify: function(a, b) {
				null != a && a.register(b)
			},
			rangeRegisterNotify: function(a, b) {
				for (var c = 0; c < b.length; c++) w.commandFuns.registerNotify(a, b[c])
			},
			unRegisterNotify: function(a, b) {
				null != a && a.unregister(b)
			},
			rangeUnRegisterNotify: function(a, b) {
				for (var c = 0; c < b.length; c++) w.commandFuns.unRegisterNotify(a, b[c])
			},
			getRandom: function(a, b) {
				if (b) return Math.round(Math.random() * (b - a) + a);
				var c = a;
				if (!c || 0 > c) c = 0;
				return Math.round(Math.random() * c)
			},
			getArray: function(a, b) {
				T = [];
				ca = a.toString().length;
				U = a;
				for (var c = 0; c < ca; c++) T.push(U % 10),
				U = parseInt(U / 10);
				b || T.reverse();
				return T
			},
			inArray: function(a, b) {
				var c, f = b.length;
				for (c = 0; c < f; c++) if (a == b[c]) return c;
				return - 1
			},
			collision: function(a, b, c, f, d, e, i, k) {
				return i && Math.abs(a + (c >> 1) - (d + (i >> 1))) < c + i >> 1 && Math.abs(b + (f >> 1) - (e + (k >> 1))) < f + k >> 1 ? !0 : !1
			},
			circleCollision: function(a, b, c, f, d, e) {
				a = Math.abs(a - f);
				b = Math.abs(b - d);
				return Math.sqrt(a * a + b * b) < c + e ? !0 : !1
			},
			rect2CircleCollision: function(a, b, c, f, d, e, i) {
				var k = !1;
				if (! (k = this.circleCollision(a, b, 1, d, e, i))) if (! (k = this.circleCollision(a + c, b, 1, d, e, i))) if (! (k = this.circleCollision(a + c, b + f, 1, d, e, i))) if (! (k = this.circleCollision(a, b + f, 1, d, e, i))) k = this.collision(a, b, c, f, d - (i >> 1), e - (i >> 1), i, i);
				return k
			},
			polygonCollision: function(a, b, c, f, d, e, i, k) {
				return this.polygonSAT(a, b, c, f, d, e, i, k) && this.polygonSAT(b, a, d, e, c, f, k, i)
			},
			polygonSAT: function(a, b, c, f, d, e, i, k) {
				var g = a.length,
				h = b.length,
				c = c || 0,
				f = f || 0,
				d = d || 0,
				e = e || 0,
				l = c + a[a.length - 1][0],
				x = f + a[a.length - 1][1],
				j,
				m,
				s,
				n,
				t,
				v,
				p,
				q,
				u,
				r;
				for (u = 0; u < g; u++) {
					j = c + a[u][0];
					m = f + a[u][1];
					s = m - x;
					n = l - j;
					t = s * l + n * x;
					v = !0;
					for (r = 0; r < h; r++) if (p = d + b[r][0], q = e + b[r][1], p = s * p + n * q - t, 0 > p) {
						v = !1;
						break
					}
					if (v) {
						if (0 != i[0] || 0 != i[1] || 0 != k[0] || 0 != k[1]) {
							t = s * (l + i[0]) + n * (x + i[1]);
							for (r = 0; r < h; r++) if (p = d + b[r][0] + k[0], q = e + b[r][1] + k[1], p = s * p + n * q - t, 0 > p) {
								v = !1;
								break
							}
						}
						if (v) return ! 1
					}
					l = j;
					x = m
				}
				return ! 0
			},
			setMatrixRotate: function(a, b) {
				if (!a || !a[0]) return null;
				var c, f;
				c = Math.PI / 180 * b;
				for (var d = Math.sin(c), e = Math.cos(c), i = 0; i < a.length; i++) c = a[i][0],
				f = a[i][1],
				a[i][0] = e * c - d * f,
				a[i][1] = d * c + e * f;
				return this
			},
			createPath: function(a, b, c, f, d) {
				var e = [],
				a = (c || 0) - (a || 0),
				i = (f || 0) - (b || 0),
				b = Math.sqrt(Math.pow(a, 2) + Math.pow(i, 2)),
				f = d = d || 5,
				k = c = 0,
				g = 180 * (Math.atan2(i, a) / Math.PI),
				g = 0 <= g ? g: g + 360;
				for (f >= b && (f = b >> 1); f < b + d;) f = f > b ? b: f,
				a = f * Math.cos(g / 180 * Math.PI),
				i = f * Math.sin(g / 180 * Math.PI),
				e.unshift([a - c, i - k]),
				c = a,
				k = i,
				f += d;
				e.angle = g + 90;
				return e
			}
		},
		localStorage: function() {
			var a, b;
			return {
				init: function() {
					a = this;
					if (!b) {
						var c;
						try {
							c = window.localStorage,
							c.getItem || (c.getItem = function() {
								return null
							}),
							c.setItem || (c.setItem = function() {})
						} catch(f) {
							c = {
								getItem: function() {
									return null
								},
								setItem: function() {}
							}
						}
						b = c
					}
					return a
				},
				setItem: function(c, f) {
					try {
						b.setItem(c, f)
					} catch(d) {}
					return a
				},
				getItem: function(a) {
					return b.getItem(a)
				},
				removeItem: function(c) {
					b.removeItem(c);
					return a
				},
				clear: function() {
					b.clear();
					return a
				},
				key: function(a) {
					return b.key(a)
				},
				getLength: function() {
					return b.length
				},
				base: function() {
					return w
				}
			}
		} (),
		sessionStorage: function() {
			var a, b;
			return {
				init: function() {
					a = this;
					if (!b) {
						var c;
						try {
							c = window.sessionStorage,
							c.getItem || (c.getItem = function() {
								return null
							}),
							c.setItem || (c.setItem = function() {})
						} catch(f) {
							c = {
								getItem: function() {
									return null
								},
								setItem: function() {}
							}
						}
						b = c
					}
					return a
				},
				setItem: function(c, f) {
					b.setItem(c, f);
					return a
				},
				getItem: function(a) {
					return b.getItem(a)
				},
				removeItem: function(c) {
					b.removeItem(c);
					return a
				},
				clear: function() {
					b.clear();
					return a
				},
				key: function(a) {
					return b.key(a)
				},
				getLength: function() {
					return b.length
				},
				base: function() {
					return w
				}
			}
		} (),
		pageLoad: function(a) {
			null == n.pageLoad && (n.pageLoad = a, window.addEventListener("load",
			function() {
				w.main(n.pageLoad)
			},
			!1));
			return w
		},
		main: function(a) {
			null == n.pageLoad && (n.pageLoad = a);
			this.canvas.init();
			this.graphics.ANCHOR_LT = 20;
			this.graphics.ANCHOR_LV = 6;
			this.graphics.ANCHOR_LB = 36;
			this.graphics.ANCHOR_HT = 17;
			this.graphics.ANCHOR_HV = 3;
			this.graphics.ANCHOR_HB = 33;
			this.graphics.ANCHOR_RT = 24;
			this.graphics.ANCHOR_RV = 10;
			this.graphics.ANCHOR_RB = 40;
			if (a = this.getDom("linkScreen")) this.canvas.screen.getTouch() ? (window.addEventListener("orientationchange", q.orientationchange, !1), a.addEventListener("touchstart", q.touchstart, !1), a.addEventListener("touchend", q.touchend, !1), a.addEventListener("touchmove", q.touchmove, !1), a.addEventListener("touchcancel", q.touchcancel, !1)) : (document.onkeydown = q.keydown, document.onkeyup = q.keyup, a.addEventListener("click", q.click, !1), a.addEventListener("mousedown", q.mouseDown, !1), a.addEventListener("mouseup", q.mouseUp, !1), a.addEventListener("mousemove", q.mouseMove, !1));
			a = this.canvas.screen.getDevice();
			"ipad" == a || "iphone" == a ? (j.focused = !0, window.addEventListener("pageshow", q.pageFocus, !1), window.addEventListener("pagehide", q.pageUnFocus, !1)) : ("firefox" == a && (j.focused = !0), window.addEventListener("focus", q.pageFocus, !1), window.addEventListener("blur", q.pageUnFocus, !1));
			this.canvas.fillStyle("#000").fillRect(0, 0, this.canvas.screen.getWidth(), this.canvas.screen.getHeight());
			S = !1;
			this.gameFlow.run().base().play();
			0 < G.length ? this.loadImage(G) : q.pageLoaded();
			return this
		},
		menu: function(a) {
			"function" == typeof a && (n.menu = a);
			return this
		},
		run: function(a) {
			"function" == typeof a && (n.runFn = a);
			return this
		},
		stop: function(a) {
			"function" == typeof a && (n.stop = a);
			return this
		},
		over: function(a) {
			"function" == typeof a && (n.over = a);
			return this
		},
		zone: function(a) {
			"function" == typeof a && (n.zone = a);
			return this
		},
		active: function(a) {
			"function" == typeof a && (n.active = a);
			return this
		},
		play: function() {
			n.run || (n.run = function() {
				var a = Date.now();
				switch (n.gameFlow) {
				case B.menu:
					n.menu();
					break;
				case B.run:
					n.runFn();
					break;
				case B.stop:
					n.stop();
					break;
				case B.over:
					n.over();
					break;
				case B.zone:
					n.zone(n.zoneArgs);
					break;
				case B.active:
					n.active(n.activeArgs);
					break;
				case B.loadImage:
					if (null != q.loadingCallBack) {
						var b = P,
						c = K > b ? b: K;
						c == b && (n.gameFlow = B.loadedImage);
						0 < b && q.loadingCallBack(c, b, "image");
						c == b && q.loadingEndCallBack && (q.loadingEndCallBack(c, b, "image"), q.loadingEndCallBack = null)
					}
					break;
				case B.loadedImage:
					n.gameFlow = n.loadedImageToGameFlow,
					G = [],
					K = 0,
					S || q.pageLoaded()
				}
				q.buttonLayoutAction();
				n.spendTime = Date.now() - a
			});
			n.playTimer || (n.isPause = !1, (n.rafRun = function() {
				var a = Date.now();
				a - n.lastDate >= n.timeout - n.spendTime && (n.lastDate = a, n.isPause || n.run());
				n.rafRun && (n.playTimer = requestAnimationFrame(n.rafRun))
			})());
			return this
		},
		pause: function() {
			n.playTimer && (n.isPause = !0, n.rafRun = null, cancelAnimationFrame(n.playTimer), n.playTimer = null);
			return this
		},
		gameFlow: {
			menu: function() {
				null != n.menu && (n.gameFlow = B.menu, w.resetKeys());
				return this
			},
			run: function() {
				null != n.runFn && (n.gameFlow = B.run, w.resetKeys());
				return this
			},
			stop: function() {
				null != n.stop && (n.gameFlow = B.stop, w.resetKeys());
				return this
			},
			over: function() {
				null != n.over && (n.gameFlow = B.over, w.resetKeys());
				return this
			},
			zone: function(a) {
				null != n.zone && (n.gameFlow = B.zone, n.zoneArgs = a, w.resetKeys());
				return this
			},
			active: function(a) {
				null != n.active && (n.gameFlow = B.active, n.activeArgs = a, w.resetKeys());
				return this
			},
			isIn: function(a) {
				return n.gameFlow == B[a]
			},
			base: function() {
				return w
			}
		},
		keyRepeated: function(a) {
			j.keyDownGo || (j.keyDownGo = !0);
			return j.keys[a]
		},
		keyPressed: function(a) {
			j.keyPressedGo || (j.keyPressedGo = !0);
			var b = j.pressedKey[a];
			j.pressedKey[a] = !1;
			return b
		},
		keyReleased: function(a) {
			j.keyUpGo || (j.keyUpGo = !0);
			var b = j.lastKey[a];
			j.lastKey[a] = !1;
			return b
		},
		setKeyCode: function(a, b) {
			j.keys[a] = !1;
			j.lastKey[a] = !1;
			j.pressedKey[a] = !1;
			j.keyPressCtrl[a] = !0;
			$[a] = b;
			return this
		},
		resetKeys: function() {
			for (var a in j.keys) j.keys[a] = !1;
			for (a in j.lastKey) j.lastKey[a] = !1;
			for (a in j.pressedKey) j.pressedKey[a] = !1;
			for (a in j.keyPressCtrl) j.keyPressCtrl[a] = !0;
			return this
		},
		canvas: {
			init: function() {
				D = {
					x: 0,
					y: 0
				};
				d = c = "#000000";
				M = {
					x: 0,
					y: 0
				};
				N = {
					x: 0,
					y: 0
				};
				h = g = 0;
				a = "#FFFFFF";
				b = "#CCCCCC";
				return this.pass()
			},
			initDevice: function() {
				Q = q.getDeviceConfig();
				t = Q.device;
				v = Q.fps;
				z = Q.touch;
				u = Q.zoom;
				return this
			},
			pass: function(a, b, c) {
				var f, a = !a || "" == a ? "linkScreen": a;
				s[a] || (f = this.base().getDom(a) || document.createElement("canvas"), s[a] = null, delete s[a], s[a] = f.getContext("2d"), f.width = b ? b: x, f.style.width = parseInt(f.width * u) + "px", f.height = c ? c: l, f.style.height = parseInt(f.height * u) + "px", m[a] = null, delete m[a], m[a] = f);
				p = s[a];
				p.font = k;
				E = m[a];
				O = parseInt(E.width);
				R = parseInt(E.height);
				this.screen.setId(a);
				return this
			},
			font: function(a) {
				k = a;
				p.font = k;
				return this
			},
			del: function(a) {
				s[a] && (s[a] = null, delete s[a], m[a] = null, delete m[a]);
				return this
			},
			setCurrent: function(a) {
				return _canvas.pass(a)
			},
			screen: {
				setId: function(a) {
					s[a] && (i = a);
					return this
				},
				getId: function() {
					return i
				},
				getWidth: function() {
					return O
				},
				setWidth: function(a) {
					x = a;
					E && (E.width = x, E.style.width = E.width + "px", O = parseInt(E.width));
					return this
				},
				getHeight: function() {
					return R
				},
				setHeight: function(a) {
					l = a;
					E && (E.height = l, E.style.height = E.height + "px", R = parseInt(E.height));
					return this
				},
				getDevice: function() {
					return t
				},
				getFps: function() {
					return v
				},
				setFps: function(a) {
					0 < a && (v = a);
					return this
				},
				getTouch: function() {
					return z
				},
				getZoom: function() {
					return u
				}
			},
			fillStyle: function(a) {
				p.fillStyle = a;
				return this
			},
			fillRect: function(a, b, c, f, d) {
				c = c ? c: 0;
				f = f ? f: 0;
				d ? N = q.getAnchor(a, b, c, f, d) : (N.x = a, N.y = b);
				p.fillRect(N.x, N.y, c, f);
				return this
			},
			fillText: function(a, b, c, f) {
				p.font = f || k;
				p.fillText(a, b, c);
				return this
			},
			clearRect: function(a, b, c, f) {
				p.clearRect(a, b, c, f);
				return this
			},
			clearScreen: function() {
				return this.clearRect(0, 0, O, R)
			},
			fillScreen: function() {
				return this.fillRect(0, 0, O, R)
			},
			strokeStyle: function(a) {
				p.strokeStyle = a;
				return this
			},
			lineWidth: function(a) {
				p.lineWidth = a || 1;
				return this
			},
			strokeRect: function(a, b, c, f, d) {
				d ? M = q.getAnchor(a, b, c, f, d) : (M.x = a, M.y = b);
				p.strokeRect(M.x, M.y, c, f);
				return this
			},
			strokeText: function(a, b, c, f) {
				p.font = f || k;
				p.strokeText(a, b, c);
				return this
			},
			setColor: function(a, b, f) {
				null == f ? (c = a, d = b ? b: a) : d = c = "rgb(" + a + ", " + b + ", " + f + ")";
				return this.fillStyle(c).strokeStyle(d)
			},
			drawImage: function(a, b, c, f, d, e, i, k, g, h) {
				var l = w.getImage(a);
				if (l.refreshed) this.drawCache(a, b, c, f, d, e, i, k, g, h);
				else if (null != l.src) null != k && (b = 0 > b ? 0 : b, k = 0 >= k ? 0.1 : k),
				null != g && (c = 0 > c ? 0 : c, g = 0 >= g ? 0.1 : g),
				null != f && null != k && (f = 0 >= f ? 0.1 : b + f <= l.width ? f: l.width - b),
				null != d && null != g && (d = 0 >= d ? 0.1 : c + d <= l.height ? d: l.height - c),
				l.loaded && (f ? d ? h ? (D = q.getAnchor(e, i, k, g, h), p.drawImage(l, b, c, f, d, D.x, D.y, k, g)) : p.drawImage(l, b, c, f, d, e, i, k, g) : (D = q.getAnchor(b, c, l.width, l.height, f), p.drawImage(l, D.x, D.y)) : p.drawImage(l, b, c));
				else if ((a = H[a]) && !a.inited) q.setImage(a.id, a.src, a.benchId, a.bench, a.cache),
				a.inited = !0;
				return this
			},
			drawRotate: function(a, b, c, f, d, e, i, k, g, h) {
				var l = parseInt(k >> 1),
				x = parseInt(g >> 1),
				j = w.getImage(a),
				a = j.src ? j: m[a],
				e = e - l,
				i = i - x;
				p.save();
				p.translate(e + l, i + x);
				p.rotate(h * Math.PI / 180);
				p.translate( - (e + l), -(i + x));
				p.drawImage(a, b, c, f, d, e, i, k, g);
				p.restore();
				return this
			},
			drawCache: function(a, b, c, f, d, e, i, k, g, h) {
				if (a = m[a]) null != k && (b = 0 > b ? 0 : b, k = 0 >= k ? 0.1 : k),
				null != g && (c = 0 > c ? 0 : c, g = 0 >= g ? 0.1 : g),
				null != f && null != k && (f = 0 >= f ? 0.1 : b + f <= a.width ? f: a.width - b),
				null != d && null != g && (d = 0 >= d ? 0.1 : c + d <= a.height ? d: a.height - c),
				f ? d ? h ? (D = q.getAnchor(e, i, k, g, h), p.drawImage(a, b, c, f, d, D.x, D.y, k, g)) : p.drawImage(a, b, c, f, d, e, i, k, g) : (D = q.getAnchor(b, c, a.width, a.height, f), p.drawImage(a, D.x, D.y)) : p.drawImage(a, b, c);
				return this
			},
			drawRegion: function(a, b, c, f, d, e, i, k) {
				switch (e) {
				default:
					p.transform(1, 0, 0, 1, i, k);
					break;
				case 5:
					p.transform(0, 1, -1, 0, d + i, k);
					break;
				case 3:
					p.transform( - 1, 0, 0, -1, f + i, d + k);
					break;
				case 6:
					p.transform(0, -1, 1, 0, i, f + k);
					break;
				case 2:
					p.transform( - 1, 0, 0, 1, f + i, k);
					break;
				case 7:
					p.transform(0, -1, -1, 0, d + i, f + k);
					break;
				case 1:
					p.transform(1, 0, 0, -1, i, d + k);
					break;
				case 4:
					p.transform(0, 1, 1, 0, i, k)
				} (!w.getImage(a).cache ? this.drawImage: this.drawCache)(a, b, c, f, d, 0, 0, f, d);
				p.setTransform(1, 0, 0, 1, 0, 0);
				return this
			},
			drawRegionAndZoom: function(a, b, c, f, d, e, i, k, g, h, l) {
				switch (e) {
				default:
					p.transform(1, 0, 0, 1, i, k);
					break;
				case 5:
					p.transform(0, 1, -1, 0, l + i, k);
					break;
				case 3:
					p.transform( - 1, 0, 0, -1, h + i, l + k);
					break;
				case 6:
					p.transform(0, -1, 1, 0, i, h + k);
					break;
				case 2:
					p.transform( - 1, 0, 0, 1, h + i, k);
					break;
				case 7:
					p.transform(0, -1, -1, 0, l + i, h + k);
					break;
				case 1:
					p.transform(1, 0, 0, -1, i, l + k);
					break;
				case 4:
					p.transform(0, 1, 1, 0, i, k)
				} (!w.getImage(a).cache ? this.drawImage: this.drawCache)(a, b, c, f, d, 0, 0, h, l);
				p.setTransform(1, 0, 0, 1, 0, 0);
				return this
			},
			drawNumber: function(a, b, c, f, d, e, i, k, g) {
				var a = a.toString(),
				h = a.length,
				k = k ? k: c,
				g = g ? g: f;
				if ("center" == i) {
					d += parseInt(O - k * h >> 1);
					for (i = 0; i < h; i++) this.drawImage(b, parseInt(a.charAt(i)) * c, 0, c, f, d + i * k, e, k, g)
				} else if (!0 == i) for (i = 0; i < h; i++) this.drawImage(b, parseInt(a.charAt(i)) * c, 0, c, f, d + i * k, e, k, g);
				else if (!1 == i) for (i = h - 1; 0 <= i; i--) this.drawImage(b, parseInt(a.charAt(i)) * c, 0, c, f, d - (h - 1 - i) * k, e, k, g, w.graphics.ANCHOR_RT);
				return this
			},
			moveTo: function(a, b) {
				p.moveTo(a, b);
				return this
			},
			lineTo: function(a, b) {
				p.lineTo(a, b);
				return this
			},
			stroke: function() {
				p.stroke();
				return this
			},
			fill: function() {
				p.fill();
				return this
			},
			beginPath: function() {
				p.beginPath();
				return this
			},
			closePath: function() {
				p.closePath();
				return this
			},
			arc: function(a, b, c, f, d, i) {
				p.arc(a, b, c, f, d, i);
				return this
			},
			quadraticCurveTo: function(a, b, c, f) {
				p.quadraticCurveTo(a, b, c, f);
				return this
			},
			bezierCurveTo: function(a, b, c, f, d, i) {
				p.bezierCurveTo(a, b, c, f, d, i);
				return this
			},
			measureText: function(a) {
				var b = p.measureText(a),
				c = b.width,
				b = b.height ? b.height: parseInt(p.font);
				return {
					width: "j2me" == this.screen.getDevice() ? p.measureText(a) : c,
					height: b
				}
			},
			translate: function(a, b) {
				p.translate(a, b);
				return this
			},
			drawLine: function(a, b, c, f) {
				return this.beginPath().moveTo(a, b).lineTo(c, f).closePath().stroke()
			},
			drawRect: function(a, b, c, f, d) {
				return this.strokeRect(a, b, c, f, d)
			},
			drawString: function(c, f, d, i, e, l, x, j) {
				g = f;
				h = d;
				p.font = j || k;
				if (i) switch (i) {
				case 4:
					g = 0;
					break;
				case 2:
					g = parseInt(this.screen.getWidth() - this.measureText(c).width >> 1);
					break;
				case 8:
					g = this.screen.getWidth() - this.measureText(c).width
				}
				e && (a = l ? l: "#000000", b = x ? x: "#CCCCCC", this.fillStyle(b).fillText(c, g + 1, h + 1, j).fillStyle(a));
				return this.fillText(c, g, h, j).fillStyle("rgb(0, 0, 0)")
			},
			drawSubstring: function(a, b, c, f, d, i, e, k, g, h) {
				return this.drawString(a.substring(b, b + c), f, d, i, e, k, g, h)
			},
			clip: function() {
				p.clip();
				return this
			},
			save: function() {
				p.save();
				return this
			},
			restore: function() {
				p.restore();
				return this
			},
			rect: function(a, b, c, f) {
				p.rect(a, b, c, f);
				return this
			},
			rotate: function(a) {
				p.rotate(a);
				return this
			},
			setTransform: function(a, b, c, f, d, i) {
				p.setTransform(a, b, c, f, d, i);
				return this
			},
			scale: function(a, b) {
				p.scale(a, b);
				return this
			},
			globalAlpha: function(a) {
				p.globalAlpha = a;
				return this
			},
			getContext: function() {
				return p
			},
			base: function() {
				return w
			}
		},
		pushImage: function(a, b) {
			if (S) return this;
			for (var c, f = 0,
			d = a.length; f < d; f++) if ((c = a[f]) && !J[c.id]) J[c.id] = !0,
			G.push(a[f]);
			this.loadingEndCallBack(b);
			return this
		},
		loadImage: function(a, b) {
			if (n.gameFlow != B.loadImage && 0 < a.length) {
				n.loadedImageToGameFlow = n.gameFlow;
				n.gameFlow = B.loadImage;
				G = a;
				P = G.length;
				for (var c = K = 0,
				f; f = G[c]; c++) r[f.id] ? K++:q.setImage(f.id, f.src, f.benchId);
				this.loadingEndCallBack(b)
			}
			return this
		},
		asyncImage: function(a) {
			for (var b, c = 0,
			f = a.length; c < f; c++) b = a[c] || {},
			H[b.id] || (H[b.id] = b);
			return this
		},
		verImage: function(a) {
			"" == L && (L = a);
			return this
		},
		loadingCallBack: function(a) {
			"function" === typeof a && (q.loadingCallBack = a);
			return this
		},
		loadingEndCallBack: function(a) {
			"function" === typeof a && (q.loadingEndCallBack = a);
			return this
		},
		addImage: function(a, b) {
			a && (b && !r[a]) && (r[a] = b);
			return this
		},
		getImage: function(a) {
			return r[a] ? r[a] : {
				src: null
			}
		},
		delImage: function(a, b) {
			r[a] && (r[a] = null, delete r[a], b && (r[a] = {
				id: a,
				loaded: !0,
				cache: !0,
				refreshed: !0
			}));
			return this
		},
		getAsyncImage: function(a) {
			return H[a] ? H[a] : {
				src: null
			}
		},
		clearAsyncImageCache: function() {
			try {
				var a, b, c;
				for (c in r) if (a = r[c]) if (b = H[c]) b.inited = !1,
				this.delImage(c).canvas.del(c)
			} catch(f) {}
			return this
		},
		audio: {
			play: function(a) {
				var b = A[a];
				if (b) try {
					b.currentTime >= b.duration ? this.replay(a) : b.paused && b.play()
				} catch(c) {}
				return this
			},
			playRange: function(a, b, c) {
				if (a = A[a]) try {
					a.__timeupdateCallBack__ || a.addEventListener("timeupdate", a.__timeupdateCallBack__ = function() {
						this.currentTime >= this.__to__ && (this.loop ? this.currentTime = this.__from__: this.pause())
					},
					!1),
					a.__from__ = null == b ? 0 : b,
					a.__to__ = null == c ? a.duration: c,
					this.setCurrentTime(a.id, a.__from__).play(a.id)
				} catch(f) {}
				a = null;
				return this
			},
			pause: function(a) {
				if (A[a]) try {
					A[a].pause()
				} catch(b) {}
				return this
			},
			pauseAll: function() {
				for (var a in A) this.pause(a);
				return this
			},
			mute: function(a, b) {
				if (A[a]) try {
					A[a].muted = b
				} catch(c) {}
			},
			vol: function(a, b) {
				if (A[a]) try {
					A[a].volume = b
				} catch(c) {}
				return this
			},
			loop: function(a, b) {
				if (A[a]) try {
					A[a].loop = b
				} catch(c) {}
				return this
			},
			replay: function(a) {
				this.setCurrentTime(a, 0).play(a);
				return this
			},
			setCurrentTime: function(a, b) {
				var c = A[a];
				if (c) try {
					0 > b ? b = 0 : b > c.duration && (b = c.duration),
					c.currentTime = b || 0
				} catch(f) {}
				return this
			},
			getAudio: function(a) {
				return A[a]
			},
			del: function(a) {
				var b = A[a];
				b && b.__timeupdateCallBack__ && (b.pause(), b.removeEventListener("timeupdate", b.__timeupdateCallBack__, !1), A[a] = null, delete A[a]);
				return this
			},
			base: function() {
				return w
			}
		},
		initAudio: function(a) {
			if (!window.Audio) return this;
			if (0 < a.length) {
				A = {};
				for (var b, c = 0; c < a.length; c++)(b = a[c]) && q.setAudio(b.id, b.src, b.loop, b.autoplay, b.preload, b.autobuffer)
			}
			return this
		},
		setRunFrequency: function(a) {
			n.timeout = a;
			return this
		},
		events: {
			keyDown: function(a) {
				j.keyDownGo || (j.keyDownGo = !0);
				j.keyUpGo || (j.keyUpGo = !0);
				j.keyPressedGo || (j.keyPressedGo = !0);
				j.keyDownCallBack = a;
				return this
			},
			keyUp: function(a) {
				j.keyDownGo || (j.keyDownGo = !0);
				j.keyUpGo || (j.keyUpGo = !0);
				j.keyPressedGo || (j.keyPressedGo = !0);
				j.keyUpCallBack = a;
				return this
			},
			orientationChange: function(a) {
				j.orientationChange = a;
				return this
			},
			touchStart: function(a) {
				j.touchStart = a;
				return this
			},
			touchEnd: function(a) {
				j.touchEnd = a;
				return this
			},
			touchMove: function(a) {
				j.touchMove = a;
				return this
			},
			touchCancel: function(a) {
				j.touchCancel = a;
				return this
			},
			click: function(a) {
				j.clickCallBack = a;
				return this
			},
			mouseDown: function(a) {
				j.mouseDownCallBack = a;
				return this
			},
			mouseUp: function(a) {
				j.mouseUpCallBack = a;
				return this
			},
			mouseMove: function(a) {
				j.mouseMoveCallBack = a;
				return this
			},
			createEvent: function(a, b) {
				var c = document.getElementById(a);
				if (c) {
					var f = document.createEvent("HTMLEvents");
					f.initEvent(b, !1, !0);
					c.dispatchEvent(f)
				}
			},
			pageFocus: function(a) {
				j.pageFocusCallBack = a;
				return this
			},
			pageUnFocus: function(a) {
				j.pageUnFocusCallBack = a;
				return this
			},
			swipe: function(a, b, c) {
				j.swipeCallBack = a;
				null != b && (j.swipeTimeout = b);
				null != c && (j.swipeRange = c)
			},
			base: function() {
				return w
			}
		},
		ui: {},
		graphics: {
			HCENTER: 1,
			VCENTER: 2,
			LEFT: 4,
			RIGHT: 8,
			TOP: 16,
			BOTTOM: 32
		},
		trans: {
			TRANS_NONE: 0,
			TRANS_ROT90: 5,
			TRANS_ROT180: 3,
			TRANS_ROT270: 6,
			TRANS_MIRROR: 2,
			TRANS_MIRROR_ROT90: 7,
			TRANS_MIRROR_ROT180: 1,
			TRANS_MIRROR_ROT270: 4
		},
		request: {
			init: function() {
				q.initUrlParams(window.leiyooHref ? window.leiyooHref: location.href)
			},
			get: function(a) {
				return Z[a] ? Z[a] : ""
			}
		},
		buttonLayout: {
			create: function(a) {
				a = this.base().objExtend({
					id: "",
					value: "",
					x: 0,
					y: 0,
					width: 60,
					height: 30,
					bgColor: "#000",
					bgStroke: "#FFF",
					stroke: "#000",
					font: "12px Arial",
					imageId: "",
					sx: 0,
					sy: 0,
					color: "#FFF",
					hx: 0,
					hy: 0,
					hColor: "#0FF",
					dex: 0,
					dey: 0,
					deColor: "#CCC",
					hided: !1,
					disabled: !1,
					path: []
				},
				a || {});
				this.get(a.id) || C.push(new da(a));
				return this
			},
			destroy: function(a) {
				for (var b, c = C.length - 1; 0 <= c; c--) if ((b = C[c]) && b.id == a) {
					b.disposed();
					C.splice(c, 1);
					break
				}
				return this
			},
			clear: function() {
				for (var a, b = C.length - 1; 0 <= b; b--) if (a = C[b]) a.disposed(),
				C.splice(b, 1);
				return this
			},
			gone: function(a, b, c) { (a = this.get(a)) && a.gone(b || [], c);
				return this
			},
			get: function(a) {
				return C[C.indexOfAttr("id", a)]
			},
			show: function(a) { (a = this.get(a)) && a.show();
				return this
			},
			hide: function(a) { (a = this.get(a)) && a.hide();
				return this
			},
			disable: function(a, b) {
				var c = this.get(a);
				c && c.disable(b);
				return this
			},
			repeated: function(a) {
				if (a = this.get(a)) return a.repeated
			},
			pressed: function(a) {
				if (a = this.get(a)) {
					var b = a.pressed;
					a.pressed = !1;
					return b
				}
			},
			released: function(a) {
				if (a = this.get(a)) {
					var b = a.released;
					a.released = !1;
					return b
				}
			},
			base: function() {
				return w
			}
		}
	}.init(),
	V = document.getElementsByTagName("head")[0],
	F = null,
	W = null,
	X = null,
	Y = null,
	ba = function() {
		W && (clearTimeout(W), W = null)
	};
	link.getScript = function(a) {
		if (!V || F) return ! 1;
		a = w.objExtend({
			url: "",
			before: function() {},
			success: function() {},
			error: function() {},
			timeout: 5E3,
			contentType: "text/javascript",
			destroyed: !0
		},
		a || {});
		"" != a.url && (a.before(), F = document.createElement("script"), F.type = a.contentType, F.async = !0, F.src = a.url, F.destroyed = a.destroyed, X = a.success, Y = a.error, F.onload = function() {
			ba();
			X && (X(), X = null);
			this.destroyed && V.removeChild(this);
			F = null
		},
		V.appendChild(F), ba(), W = setTimeout(function() {
			ba();
			Y && (Y("timeout"), Y = null);
			F && F.destroyed && V.removeChild(F);
			F = null
		},
		a.timeout));
		a = null;
		return w
	};
	var I = function() {
		return (65536 * (1 + Math.random()) | 0).toString(16).substring(1)
	};
	link.getNewGuid = function() {
		return I() + I() + "-" + I() + "-" + I() + "-" + I() + "-" + I() + I() + I()
	};
	link.classes.Observer = function() {
		this.group = []
	};
	link.classes.Observer.prototype.register = function(a) {
		if (null == a) return this; - 1 == w.comm.inArray(a, this.group) && this.group.push(a);
		return this
	};
	link.classes.Observer.prototype.unregister = function(a) {
		if (null == a) return this;
		a = w.commandFuns.inArray(a, this.group); - 1 < a && this.group.splice(a, 1);
		return this
	};
	link.classes.Observer.prototype.notify = function(a) {
		for (var b = 0; b < this.group.length; b++) if (null != this.group[b]) this.group[b](a);
		return this
	};
	link.classes.Observer.prototype.clear = function() {
		0 < this.group.length && this.group.splice(0, this.group.length);
		return this
	};
	link.classes.Timer = function(a, b, c, f, d) {
		this.id = a;
		this._initTime = b;
		this._dateTime = Date.now();
		this.time = this._initTime;
		this.callBack = c;
		this.millisec = f || 1E3;
		this.data = d;
		this.timeout = null
	};
	link.classes.Timer.prototype.stop = function() {
		this.timeout && (clearTimeout(this.timeout), this.timeout = null)
	};
	link.classes.Timer.prototype.start = function(a) {
		a && (this.time = this._initTime, this._dateTime = Date.now());
		this.stop();
		this.timeout = setTimeout(function(a) {
			var b = Date.now(),
			c = parseInt(Math.round((b - a._dateTime) / a.millisec));
			a._dateTime = b;
			a.time -= c;
			a.callBack ? a.callBack(a) : a.stop();
			0 <= a.time ? a.start() : (a.stop(), a.time = 0)
		},
		this.millisec, this)
	};
	link.classes.WebSocket = function(a, b, c, f, d) {
		this.ipPort = a || "";
		this.socket = new WebSocket(this.ipPort);
		this.socket.onopen = b;
		this.socket.onmessage = c;
		this.socket.onclose = f;
		this.socket.onerror = d
	};
	link.classes.WebSocket.prototype.send = function(a) {
		this.socket.send(a)
	};
	link.classes.WebSocket.prototype.close = function() {
		this.socket.close()
	};
	link.classes.observer = link.classes.Observer;
	link.classes.timer = link.classes.Timer;
	link.classes.webSocket = link.classes.websocket = link.classes.WebSocket;
	link.commandFuns = link.comm;
	link.commandFuns.collisionCheck = link.commandFuns.collision;
	link.commandFuns.circleCollisionCheck = link.commandFuns.circleCollision;
	link.initImage = link.pushImage;
	"function" === typeof define && define(function() {
		return link
	})
})(); (function() {
	var g = {
		Point2D: function(g, a) {
			this.x = g || 0;
			this.y = a || 0
		},
		pointOnCubicBezier: function(g, a) {
			var b, c, d, e, f, i, k, x, l = new this.Point2D;
			d = 3 * (g[1].x - g[0].x);
			c = 3 * (g[2].x - g[1].x) - d;
			b = g[3].x - g[0].x - d - c;
			i = 3 * (g[1].y - g[0].y);
			f = 3 * (g[2].y - g[1].y) - i;
			e = g[3].y - g[0].y - i - f;
			k = a * a;
			x = k * a;
			l.x = b * x + c * k + d * a + g[0].x;
			l.y = e * x + f * k + i * a + g[0].y;
			return l
		}
	};
	bezier = {
		Point2D: g.Point2D,
		create: function(h, a) {
			var b, c, d = [],
			e = a || 10;
			b = 1 / (e - 1);
			for (c = 0; c < e; c++) d.push(g.pointOnCubicBezier(h, c * b));
			return d
		},
		createPath: function(h, a) {
			var b, c, d = [],
			e = a || 10;
			b = 1 / (e - 1);
			var f = h || [],
			i,
			k = f[0].x,
			x = f[0].y;
			for (c = 0; c < e; c++) i = g.pointOnCubicBezier(f, c * b),
			0 < c && (d.push([i.x - k, i.y - x]), k = i.x, x = i.y);
			return d
		}
	}
})(); (function(g) {
	var h = function(a, c) {
		return 0 == a && 0 == c ? 0 : 0 < a && 0 > c ? 1 : 0 < a && 0 == c ? 2 : 0 < a && 0 < c ? 3 : 0 == a && 0 < c ? 4 : 0 > a && 0 < c ? 5 : 0 > a && 0 == c ? 6 : 0 > a && 0 > c ? 7 : 0
	};
	link.action = {};
	link.action.Role = function(a, c, d, e, f, i, k, h) {
		this.imageNames = f || [];
		this.rects = i || [];
		this.frames = k || [];
		this.actions = h || [];
		f = this.frames;
		i = this.actions;
		k = [];
		if (0 < i.length) {
			for (h = 0; h < i.length; h++) {
				for (var f = [], a = i[h].frames, l = 0; l < a.length; l++) f.push({
					args: [a[l][0], a[l][1], a[l][2]],
					step: a[l][3]
				});
				k.push(new g.action.sprite(f, i[h].loop, 0))
			}
			a = k
		}
		this.sprites = a || [];
		this.x = c || 0;
		this.y = d || 0;
		this.step = this.dy = this.dx = 0;
		this.id = "";
		this.mapOffx = this.x;
		this.mapOffy = this.y;
		this.svy = this.svx = null;
		this._cr = this.current = e || 0;
		this.zoom = 1;
		this.angle = 0;
		this._zooms = [];
		this._angles = [];
		this._moveDs = [4, 7, 5, 5, 6, -5, -5, -7];
		this._stopDs = [0, -3, 1, 1, 2, -1, -1, -3];
		this.dsIndex = 4;
		this._path = [];
		c = this.getSprite().getFrame();
		c = this.frames[c.args[0]];
		this._fA = c.fA;
		this.aR = c.aR;
		this.bR = c.bR;
		this._skipMoveDs = !1;
		this.onstart = this.onend = this._stopedAction = null;
		this._locked = !1;
		this.speed = 5;
		this.links = []
	};
	link.action.Role.prototype.setSprite = function(a, c, d) {
		if (this._locked) return this;
		var e = void 0 != a ? a: 0,
		f = 0 <= e ? g.trans.TRANS_NONE: g.trans.TRANS_MIRROR;
		this._cr != e && (this._cr = e, 0 > e && (e = Math.abs(e)), this.current = e >= this.sprites.length ? this.sprites.length - 1 : e, 1 < this.sprites.length && this.setTrans(f), e = this.getSprite(), e.getFrame(), c || e.setFrame(0), d && (this._stopedAction = this._cr), this.updateFrameParam());
		for (e = 0; f = this.links[e]; e++) f.setSprite(a, c, d);
		trans = null;
		return this
	};
	link.action.Role.prototype.addLinks = function(a) {
		this.links = a || [];
		for (var a = 0,
		c; c = this.links[a]; a++) c.setSprite(this.getSprite().trans == g.trans.TRANS_NONE ? this.current: -this.current).setStep(this.step);
		return this
	};
	link.action.Role.prototype.clearLinks = function() {
		this.links = [];
		return this
	};
	link.action.Role.prototype.lockSprite = function() {
		this._locked = !0;
		return this
	};
	link.action.Role.prototype.unlockSprite = function() {
		this._locked = !1;
		return this
	};
	link.action.Role.prototype.setTrans = function(a) {
		this.getSprite().trans = a;
		return this
	};
	link.action.Role.prototype.getSprite = function(a) {
		return this.sprites[null == a ? this.current: a]
	};
	link.action.Role.prototype.getFrame = function(a) {
		return this.frames[null == a ? this.getSprite().getFrame().args[0] : a]
	};
	link.action.Role.prototype.updateFrameParam = function() {
		var a = this.getSprite();
		if (!a) return this;
		var a = a.getFrame(),
		c;
		if (a && a.args && (c = this.frames[a.args[0]])) this._fA = c.fA,
		this.aR = c.aR,
		this.bR = c.bR;
		return this
	};
	link.action.Role.prototype.action = function() {
		var a = this.getSprite();
		if (!a) return this;
		var c = a.getFrame(),
		d = 0,
		e = 0;
		if (c) {
			this.updateFrameParam();
			if (0 < this._path.length) e = this._path.shift(),
			d = e[0] || 0,
			e = e[1] || 0,
			this._skipMoveDs || this.setSprite(this._moveDs[this.dsIndex = h(d, e)], !0),
			this.svx = d,
			this.svy = e,
			this.mapOffx += this.svx,
			this.mapOffy += this.svy;
			else if (null != this.svx && null != this.svy) {
				this._skipMoveDs || (this.setSprite(this._stopedAction || this._stopDs[this.dsIndex = h(this.svx, this.svy)]), this._stopedAction = null);
				if (this.onend) this.onend(this);
				this._skipMoveDs = !1;
				this.svy = this.svx = null
			}
			if (0 < this._zooms.length) {
				var f = this._zooms.shift();
				"number" == typeof~~f && this.setZoom(f)
			}
			0 < this._angles.length && (f = this._angles.shift(), "number" == typeof~~f && this.setRotate(f));
			this.x += c.args[1] + d;
			this.y += c.args[2] + e;
			for (c = 0; d = this.links[c]; c++) d.x = this.x + (d.dx || 0),
			d.y = this.y + (d.dy || 0),
			d.getSprite().setFrame(a.current),
			d.updateFrameParam()
		}
		a.nextFrame();
		return this
	};
	link.action.Role.prototype.render = function() {
		var a = this.getSprite();
		if (a && this._fA) {
			var c = this._fA,
			d = c.length,
			e = g.canvas,
			a = a.trans,
			f, i, k;
			c[0] && (f = this.x, i = this.y, g.canvas.save().translate(f, i).rotate(this.angle * Math.PI / 180).translate( - f, -i));
			for (var h = 0; h < d; h++) f = this.rects[c[h][0]][c[h][1]],
			i = this.imageNames[c[h][0]],
			k = g.getImage(i),
			a == g.trans.TRANS_NONE ? e.drawImage(i, f[0], f[1], f[2], f[3], 1 == this.zoom ? ~~ (this.x + this.dx + c[h][2] * this.zoom) : this.x + this.dx + c[h][2] * this.zoom, 1 == this.zoom ? ~~ (this.y + this.dy + c[h][3] * this.zoom) : this.y + this.dy + c[h][3] * this.zoom, f[2] * this.zoom, f[3] * this.zoom) : 1 == this.zoom ? e.drawRegion(i, f[0], f[1], f[2], f[3], a, ~~ (this.x + this.dx - (c[h][2] + f[2])), ~~ (this.y + this.dy + c[h][3])) : e.drawRegionAndZoom(i, f[0], f[1], f[2], f[3], a, this.x + this.dx - (c[h][2] + f[2]) * this.zoom, this.y + this.dy + c[h][3] * this.zoom, null, f[2] * this.zoom, f[3] * this.zoom),
			!k.loaded && k.bench && e.drawImage(k.bench.id || k.benchId, k.bench.sx || 0, k.bench.sy || 0, k.bench.sw || k.bench.w, k.bench.sh || k.bench.h, ~~ (this.x + this.dx - (k.bench.w * this.zoom >> 1)), ~~ (this.y + this.dy - k.bench.h * this.zoom), k.bench.w * this.zoom, k.bench.h * this.zoom);
			c[0] && g.canvas.restore();
			for (c = 0; d = this.links[c]; c++) d.render()
		}
		return this
	};
	link.action.Role.prototype.setZoom = function(a) {
		this.zoom = a;
		return this
	};
	link.action.Role.prototype.setZoomTransition = function(a) {
		a && 0 < a.length && (this._zooms = a);
		return this
	};
	link.action.Role.prototype.endZoomTransition = function() {
		return 0 == this._zooms.length
	};
	link.action.Role.prototype.getBodyRect = function(a, c) {
		var d = this.getSprite(null != a ? Math.abs(a) : null);
		if (!d) return null;
		var e = d.getFrame(c);
		if (!e) return null;
		e = this.frames[e.args[0]].bR;
		return null == a && d.trans != g.trans.TRANS_NONE || 0 > a ? [ - (e[0] + e[2] * this.zoom), e[1] * this.zoom, e[2] * this.zoom, e[3] * this.zoom] : [e[0] * this.zoom, e[1] * this.zoom, e[2] * this.zoom, e[3] * this.zoom]
	};
	link.action.Role.prototype.getAttackRect = function(a, c) {
		var d = this.getSprite(null != a ? Math.abs(a) : null);
		if (!d) return null;
		var e = d.getFrame(c);
		if (!e) return null;
		e = this.frames[e.args[0]].aR;
		return null == a && d.trans != g.trans.TRANS_NONE || 0 > a ? [ - (e[0] + e[2] * this.zoom), e[1] * this.zoom, e[2] * this.zoom, e[3] * this.zoom] : [e[0] * this.zoom, e[1] * this.zoom, e[2] * this.zoom, e[3] * this.zoom]
	};
	link.action.Role.prototype.setStep = function(a) {
		this.step = a || 0;
		for (var c = 0,
		d = this.sprites.length; c < d; c++) this.sprites[c].setStep(a);
		for (a = 0; c = this.links[a]; a++) c.setStep(this.step);
		return this
	};
	link.action.Role.prototype.collision = function(a, c, d) {
		if (!a) return ! 1;
		var c = c || "aR",
		d = d || "aR",
		e, f;
		"aR" == c ? e = this.aR: "bR" == c && (e = this.bR);
		"aR" == d ? f = a.aR: "bR" == d && (f = a.bR);
		return e && f ? g.comm.collision(this.getSprite().trans == g.trans.TRANS_NONE ? ~~ (this.x + this.dx + e[0] * this.zoom) : ~~ (this.x + this.dx - (e[0] + e[2]) * this.zoom), ~~ (this.y + this.dy + e[1] * this.zoom), ~~ (e[2] * this.zoom), ~~ (e[3] * this.zoom), a.getSprite().trans == g.trans.TRANS_NONE ? ~~ (a.x + a.dx + f[0] * a.zoom) : ~~ (a.x + a.dx - (f[0] + f[2]) * a.zoom), ~~ (a.y + a.dy + f[1] * a.zoom), ~~ (f[2] * a.zoom), ~~ (f[3] * a.zoom)) : !1
	};
	link.action.Role.prototype.collisionInput = function(a, c, d, e, f) {
		var f = f || "aR",
		i;
		"aR" == f ? i = this.aR: "bR" == f && (i = this.bR);
		return i ? g.comm.collision(this.getSprite().trans == g.trans.TRANS_NONE ? ~~ (this.x + this.dx + i[0] * this.zoom) : ~~ (this.x + this.dx - (i[0] + i[2]) * this.zoom), ~~ (this.y + this.dy + i[1] * this.zoom), ~~ (i[2] * this.zoom), ~~ (i[3] * this.zoom), a, c, d, e) : !1
	};
	link.action.Role.prototype.setLoop = function(a) {
		for (var c = 0,
		d = this.sprites.length; c < d; c++) this.sprites[c].setLoop(a);
		return this
	};
	link.action.Role.prototype.setPath = function(a, c) {
		this._path = a || [];
		if (0 < this._path.length && this.onstart) this.onstart(this);
		c && (this._skipMoveDs = !0);
		return this
	};
	link.action.Role.prototype.concatPath = function(a) {
		this._path = this._path.concat(a || []);
		return this
	};
	link.action.Role.prototype.endPath = function() {
		return 0 == this._path.length
	};
	link.action.Role.prototype.clearPath = function() {
		this._path = [];
		return this
	};
	link.action.Role.prototype.getPathCount = function() {
		return this._path.length
	};
	link.action.Role.prototype.moveTo = function(a, c, d) {
		d && (this.speed = Math.abs(d));
		this.setPath(g.comm.createPath(this.mapOffx, this.mapOffy, a, c, this.speed));
		return this
	};
	link.action.Role.prototype.setMoveDs = function(a) {
		this._moveDs = a || [4, 7, 5, 5, 6, -5, -5, -7];
		return this
	};
	link.action.Role.prototype.setStopDs = function(a) {
		this._stopDs = a || [0, -3, 1, 1, 2, -1, -1, -3];
		return this
	};
	link.action.Role.prototype.mark = function(a, c, d, e) {
		null != a && (this.x = a);
		null != c && (this.y = c);
		null != d && (this.mapOffx = d);
		null != e && (this.mapOffy = e);
		return this
	};
	link.action.Role.prototype.setSpeed = function(a, c) {
		a && (this.speed = Math.abs(a));
		this.nodeXStep = a;
		this.nodeYStep = c;
		return this
	};
	link.action.Role.prototype.setRotate = function(a) {
		this.angle = Math.abs(a) || 0;
		return this
	};
	link.action.Role.prototype.setRotateTransition = function(a) {
		a && 0 < a.length && (this._angles = a);
		return this
	};
	link.action.Role.prototype.endRotateTransition = function() {
		return 0 == this._angles.length
	};
	link.action.Role.prototype.move = function(a, c) {
		null != a && (this.x += a);
		null != c && (this.y += c);
		return this
	};
	link.action.Role.prototype.rotate = function(a) {
		null != a && (this.angle += a);
		return this
	};
	link.action.Role.prototype.stoped = function() {
		return null == this.svx
	};
	link.action.Role.prototype.getCurrent = function() {
		return this.current * (this.getSprite().trans == g.trans.TRANS_NONE ? 1 : -1)
	};
	link.action.Sprite = function(a, c, d, e) {
		this.frames = a || [];
		this.loop = c;
		this.current = d || 0;
		this.step = e || 0;
		this.trans = g.trans.TRANS_NONE;
		this.setFrame(d);
		this.runStep = this.getFrame().step || this.step
	};
	link.action.Sprite.prototype.setFrame = function(a) {
		this.current = a >= this.frames.length ? this.frames.length - 1 : 0 < a ? a: 0;
		this.getFrame().step && (this.runStep = this.getFrame().step);
		return this
	};
	link.action.Sprite.prototype.getFrame = function(a) {
		return this.frames[null == a ? this.current: a]
	};
	link.action.Sprite.prototype.nextFrame = function() {
		if (!this.loop && this.endFrame()) return this;
		0 < this.frames.length && (0 >= this.runStep ? (this.loop ? (this.current++, this.current %= this.frames.length) : this.current < this.frames.length - 1 && this.current++, this.runStep = this.getFrame().step ? this.getFrame().step: this.step) : this.runStep--);
		return this
	};
	link.action.Sprite.prototype.preFrame = function() {
		0 < this.frames.length && (0 >= this.runStep ? (this.loop ? (this.current--, 0 > this.current && (this.current = this.frames.length - 1)) : 0 < this.current && this.current--, this.runStep = this.getFrame().step ? this.getFrame().step: this.step) : this.runStep--);
		return this
	};
	link.action.Sprite.prototype.endFrame = function(a) {
		var c = this.frames.length - 1;
		null != a && (0 <= a && a <= this.frames.length - 1) && (c = a);
		return this.current >= c && 0 == this.runStep
	};
	link.action.Sprite.prototype.firstFrame = function() {
		return 0 == this.current && 0 == this.runStep
	};
	link.action.Sprite.prototype.setStep = function(a) {
		this.step = a || 0;
		this.runStep = this.getFrame().step || this.step;
		return this
	};
	link.action.Sprite.prototype.setLoop = function(a) {
		this.loop = a;
		return this
	};
	var a;
	link.action.Fragment = function(a) {
		this.sprites = a || []
	};
	link.action.Fragment.prototype.queue = function() {
		0 < this.sprites.length ? 0 < this.sprites[0].frames.length && (0 >= this.sprites[0].runStep ? (this.sprites[0].runStep = this.sprites[0].step, a = this.sprites[0].frames.shift(), 0 == this.sprites[0].frames.length && this.sprites.shift()) : (a = this.sprites[0].getFrame(), this.sprites[0].runStep--)) : a = null;
		return a
	};
	g.action.role = g.action.Role;
	g.action.sprite = g.action.Sprite;
	g.action.fragment = g.action.Fragment
})(link);
jsGame.carmark = jsGame.Carmark = function(g) {
	return g.extend(function(g, a, b, c, d, e, f, i) {
		this.args = {
			carWidth: 0,
			carHeight: 0,
			carTitleWidth: 0,
			carTitleHeight: 0,
			scrWidth: 0,
			scrHeight: 0,
			carx: 0,
			cary: 0,
			mapOffx: 0,
			mapOffy: 0,
			carBuffer: null,
			carGp: null,
			buffSize: 0,
			titleSize: 0,
			titleW: 0,
			titleH: 0,
			mapLastx: 0,
			mapLasty: 0,
			map: [[]],
			tilesType: "array",
			tiles: null,
			xState: 0,
			yState: 0
		};
		this.args.carx = 0;
		this.args.cary = 0;
		this.args.mapOffx = 0;
		this.args.mapOffy = 0;
		this.args.scrWidth = g;
		this.args.scrHeight = a;
		this.args.titleW = b;
		this.tw = this.args.titleW;
		this.args.titleH = c;
		this.th = this.args.titleH;
		this.args.buffW = b * d;
		this.args.buffH = c * d;
		this.args.map = e;
		this.args.tiles = f;
		this.args.tilesType = null != this.args.tiles.length ? "array": "json";
		for (g = 0; g < this.args.scrWidth;) g += b;
		this.args.carWidth = this.args.buffW + g;
		for (g = 0; g < this.args.scrHeight;) g += c;
		this.args.carHeight = this.args.buffH + g;
		this.args.titleSH = this.args.map.length;
		this.args.titleSW = this.args.map[0].length;
		this.args.carTitleWidth = this.args.carWidth / b;
		this.args.carTitleHeight = this.args.carHeight / c;
		this.args.carBuffer || (this.args.carBuffer = i ? i: document.createElement("canvas"), this.args.carGp = this.args.carBuffer.getContext("2d"));
		if (this.args.carBuffer.width != this.args.carWidth || this.args.carBuffer.height != this.args.carHeight) this.args.carBuffer.width = this.args.carWidth,
		this.args.carBuffer.height = this.args.carHeight,
		this.args.carBuffer.style.width = this.args.carBuffer.width + "px",
		this.args.carBuffer.style.height = this.args.carBuffer.height + "px";
		this.args.mapLastx = this.args.titleSW * b - this.args.scrWidth;
		this.args.mapLasty = this.args.titleSH * c - this.args.scrHeight;
		this.carWidth = this.args.carWidth;
		this.carHeight = this.args.carHeight;
		this.tileW = this.args.titleSW;
		this.tileH = this.args.titleSH;
		this.mapW = this.args.titleW * this.args.map[0].length;
		this.mapH = this.args.titleH * this.args.map.length;
		this.scrWidth = this.args.scrWidth;
		this.scrHeight = this.args.scrHeight
	},
	null, {
		mapRender: function() {
			this.initBuffer()
		},
		refreshCache: function() {
			for (var h = this.getIndexCarY(), a = this.getIndexCarX(), b = this.getIndexBuffLastY(), c = this.getIndexBuffLastX(); h <= b; h++) if (this.args.map[h]) for (var d = a; d <= c; d++) {
				var e = this.args.map[h][d];
				0 != e ? (e = 0 > e ? -e: e, (e = this.getTile(e)) && this.args.carGp.drawImage(g.getImage(e.imageid), e.sx, e.sy, this.args.titleW, this.args.titleH, d * this.args.titleW, h * this.args.titleH, this.args.titleW, this.args.titleH)) : (this.args.carGp.fillStyle = "#000", this.args.carGp.fillRect(d * this.args.titleW, h * this.args.titleH, this.args.titleW, this.args.titleH))
			}
		},
		scroll: function(g, a) {
			var b = 0;
			if (0 != g) if (b = g, b = 0 > b ? -b: b, b <= this.args.titleW) this.scrollDelt(g, 0);
			else {
				for (var c = b / this.args.titleW,
				b = b % this.args.titleW,
				d = 0; d < c; d++) this.scrollDelt(0 > g ? -this.args.titleW: this.args.titleW, 0);
				this.scrollDelt(0 > g ? -b: b, 0)
			}
			if (0 != a) if (b = a, b = 0 > b ? -b: b, b <= this.args.titleH) this.scrollDelt(0, a);
			else {
				c = b / this.args.titleH;
				b %= this.args.titleH;
				for (d = 0; d < c; d++) this.scrollDelt(0, 0 > a ? -this.args.titleH: this.args.titleH);
				this.scrollDelt(0, 0 > a ? -b: b)
			}
		},
		paint: function(g, a, b) {
			var c = this.args.mapOffx % this.args.carWidth,
			d = this.args.mapOffy % this.args.carHeight,
			e = this.args.carWidth - c,
			f = this.args.carHeight - d;
			this.drawRange(g, this.args.carBuffer, c, d, e, f, a, b);
			this.drawRange(g, this.args.carBuffer, 0, d, this.args.scrWidth - e, f, a + e, b);
			this.drawRange(g, this.args.carBuffer, c, 0, e, this.args.scrHeight - f, a, b + f);
			this.drawRange(g, this.args.carBuffer, 0, 0, this.args.scrWidth - e, this.args.scrHeight - f, a + e, b + f)
		},
		getContext: function() {
			return this.args.carGp
		},
		getCanvas: function() {
			return this.args.carBuffer
		},
		getMapOffX: function() {
			return this.args.mapOffx
		},
		getMapOffY: function() {
			return this.args.mapOffy
		},
		getMap: function() {
			return this.args.map
		},
		setMap: function(g) {
			this.args.map = null;
			this.args.map = g
		},
		getTile: function(g) {
			return "json" == this.args.tilesType ? this.args.tiles["i" + g] : "array" == this.args.tilesType ? this.args.tiles[g] : null
		},
		initBuffer: function() {
			for (var h = 0; h < this.args.carTitleHeight; h++) if (this.args.map[h]) for (var a, b = 0; b < this.args.carTitleWidth; b++) if (a = this.args.map[h][b], 0 != a) {
				a = 0 > a ? -a: a;
				var c = this.getTile(a);
				c && (a = g.getImage(c.imageid), a.loaded && this.args.carGp.drawImage(g.getImage(c.imageid), c.sx, c.sy, this.args.titleW, this.args.titleH, b * this.args.titleW, h * this.args.titleH, this.args.titleW, this.args.titleH))
			} else this.args.carGp.fillStyle = "#000",
			this.args.carGp.fillRect(b * this.args.titleW, h * this.args.titleH, this.args.titleW, this.args.titleH)
		},
		scrollDelt: function(g, a) {
			g += this.args.mapOffx;
			a += this.args.mapOffy;
			if (0 > g) return this.args.xState = g,
			!1;
			if (0 > a) return this.args.yState = a,
			!1;
			if (g > this.args.mapLastx) return this.args.xState = g - this.args.mapLastx,
			this.args.mapOffx = this.args.mapLastx,
			!1;
			if (a > this.args.mapLasty) return this.args.yState = a - this.args.mapLasty,
			this.args.mapOffy = this.args.mapLasty,
			!1;
			this.updateBuffer(g, a)
		},
		updateBuffer: function(g, a) {
			this.args.mapOffx = g;
			this.args.mapOffy = a;
			if (g > this.args.carx + this.args.buffW) {
				var b = this.getIndexBuffLastX();
				this.copyBufferX(b, this.getIndexCarY(), this.getTitleHeight(), this.getBufferCarX(), this.getBufferCarY());
				this.args.carx += this.args.titleW
			}
			g < this.args.carx && (this.args.carx -= this.args.titleW, this.copyBufferX(this.getIndexCarX(), this.getIndexCarY(), this.getTitleHeight(), this.getBufferCarX(), this.getBufferCarY()));
			a > this.args.cary + this.args.buffH && (b = this.getIndexBuffLastY(), this.copyBufferY(this.getIndexCarX(), b, this.getTitelWidth(), this.getBufferCarX(), this.getBufferCarY()), this.args.cary += this.args.titleH);
			a < this.args.cary && (this.args.cary -= this.args.titleH, this.copyBufferY(this.getIndexCarX(), this.getIndexCarY(), this.getTitelWidth(), this.getBufferCarX(), this.getBufferCarY()))
		},
		getIndexCarX: function() {
			return this.args.carx / this.args.titleW
		},
		getIndexCarY: function() {
			return this.args.cary / this.args.titleH
		},
		getBufferCarX: function() {
			return this.args.carx % this.args.carWidth
		},
		getBufferCarY: function() {
			return this.args.cary % this.args.carHeight
		},
		getIndexBuffLastX: function() {
			return (this.args.carx + this.args.carWidth) / this.args.titleW
		},
		getIndexBuffLastY: function() {
			return (this.args.cary + this.args.carHeight) / this.args.titleH
		},
		getTitleHeight: function() {
			return (this.args.carHeight - this.args.cary % this.args.carHeight) / this.args.titleH
		},
		getTitelWidth: function() {
			return (this.args.carWidth - this.args.carx % this.args.carWidth) / this.args.titleW
		},
		copyBufferX: function(h, a, b, c, d) {
			for (var e, f = 0; f < b; f++) if (e = f * this.args.titleH + d, this.args.map[a + f]) {
				var i = this.args.map[a + f][h];
				0 != i ? (i = 0 > i ? -i: i, (i = this.getTile(i)) && this.args.carGp.drawImage(g.getImage(i.imageid), i.sx, i.sy, this.args.titleW, this.args.titleH, c, e, this.args.titleW, this.args.titleH)) : (this.args.carGp.fillStyle = "#000", this.args.carGp.fillRect(c, e, this.args.titleW, this.args.titleH))
			}
			for (d = b; d < this.args.carTitleHeight; d++) e = (d - b) * this.args.titleH,
			this.args.map[a + d] && (i = this.args.map[a + d][h], 0 != i ? (i = 0 > i ? -i: i, (i = this.getTile(i)) && this.args.carGp.drawImage(g.getImage(i.imageid), i.sx, i.sy, this.args.titleW, this.args.titleH, c, e, this.args.titleW, this.args.titleH)) : (this.args.carGp.fillStyle = "#000", this.args.carGp.fillRect(c, e, this.args.titleW, this.args.titleH)))
		},
		copyBufferY: function(h, a, b, c, d) {
			for (var e, f = 0; f < b; f++) if (e = f * this.args.titleW + c, this.args.map[a]) {
				var i = this.args.map[a][h + f];
				0 != i ? (i = 0 > i ? -i: i, (i = this.getTile(i)) && this.args.carGp.drawImage(g.getImage(i.imageid), i.sx, i.sy, this.args.titleW, this.args.titleH, e, d, this.args.titleW, this.args.titleH)) : (this.args.carGp.fillStyle = "#000", this.args.carGp.fillRect(e, d, this.args.titleW, this.args.titleH))
			}
			for (c = b; c < this.args.carTitleWidth; c++) e = (c - b) * this.args.titleW,
			this.args.map[a] && (i = this.args.map[a][h + c], 0 != i ? (i = 0 > i ? -i: i, (i = this.getTile(i)) && this.args.carGp.drawImage(g.getImage(i.imageid), i.sx, i.sy, this.args.titleW, this.args.titleH, e, d, this.args.titleW, this.args.titleH)) : (this.args.carGp.fillStyle = "#000", this.args.carGp.fillRect(e, d, this.args.titleW, this.args.titleH)))
		},
		drawRange: function(g, a, b, c, d, e, f, i) {
			if (0 >= d || 0 >= e) return ! 1;
			d > this.args.scrWidth && (d = this.args.scrWidth);
			e > this.args.scrHeight && (e = this.args.scrHeight);
			g.drawImage(a, b, c, d, e, f, i, d, e)
		}
	})
} (jsGame); (function(g) {
	var h = g.commandFuns.collisionCheck;
	g.World = g.extend(function(a) {
		a = g.objExtend({
			x: 0,
			y: 0,
			width: 800,
			height: 480,
			tw: 100,
			th: 100,
			ow: 100,
			oh: 100,
			sw: 100,
			sh: 100,
			asyncUrl: "",
			offsetTileNumber: 1,
			nodeXStep: 5,
			nodeYStep: 5,
			wordsNum: 40,
			wordsW: 120,
			wordsH: 40,
			bubbleNum: 10,
			bubbleW: 200,
			bubbleH: 100,
			bubbleFont: "14px Arial",
			tiles: [],
			roleId: "",
			sortStep: 5,
			onEvent: null,
			moveDs: [0, 1, 2, 3, 4, 5, 6, 7],
			stopDs: [8, 9, 10, 11, 12, 13, 14, 15],
			callEventTimeout: 100,
			outScreenWH: 0
		},
		a || {});
		this.x = a.x;
		this.y = a.y;
		this.width = a.width;
		this.height = a.height;
		this.tw = a.tw;
		this.th = a.th;
		this.ow = a.ow;
		this.oh = a.oh;
		this.sw = a.sw;
		this.sh = a.sh;
		this._owNum = Math.ceil(this.width / this.ow);
		this._ohNum = Math.ceil(this.height / this.oh);
		this._asyncUrl = a.asyncUrl;
		this.offsetTileNumber = a.offsetTileNumber;
		this._nodeXStep = a.nodeXStep;
		this._nodeYStep = a.nodeYStep;
		this._wordsNum = a.wordsNum;
		this._wordsW = a.wordsW;
		this._wordsH = a.wordsH;
		this._wordsPassIds = [];
		for (var b = 0; b < this._wordsNum; b++) g.canvas.pass("_wordsPass_" + b, this._wordsW, this._wordsH).pass(),
		this._wordsPassIds.push("_wordsPass_" + b);
		this._wordsList = [];
		this._bubbleNum = a.bubbleNum;
		this._bubbleW = a.bubbleW;
		this._bubbleH = a.bubbleH;
		this._bubbleFont = a.bubbleFont;
		this._bubblePassIds = [];
		for (b = 0; b < this._bubbleNum; b++) g.canvas.pass("_bubblePass_" + b, this._bubbleW, this._bubbleH).pass(),
		this._bubblePassIds.push("_bubblePass_" + b);
		this._bubblesList = [];
		this._aStars = [];
		this._events = [];
		this._endEvents = [];
		this._onEvent = a.onEvent;
		this._onEventQueue = [];
		this._roleObjs = {};
		this._buildingObjs = {};
		this._frontEffs = [];
		this._backEffs = [];
		this._fontEffs = [];
		this._shelters = [];
		this._context = g.canvas.getContext();
		this._tiles = a.tiles;
		this.car = null;
		this.roleId = "";
		this._superStar = null;
		this._focusPath = [];
		this._canSort = !1;
		this._sortStep = this._sortStep_ = a.sortStep;
		this.setMoveDs(a.moveDs);
		this.setStopDs(a.stopDs);
		this.shakeY = this.shakeX = 0;
		this._shakePath = [];
		this._endEventObj = null;
		this._loadingBars = [];
		this.callEventTimeout = a.callEventTimeout;
		this._callEventDate = Date.now();
		this._runDownSleepDate = Date.now();
		this._runDownSleepTimeout = 0;
		this._focusLampShelters = [];
		this._focusLampBlockColor = "#000";
		this._focusLampTimeout = 0;
		this._focusLampDate = Date.now();
		this._outScreenWH = a.outScreenWH;
		this._outScreenW = this.width + this._outScreenWH;
		this._outScreenH = this.height + this._outScreenWH;
		this._outScreenX = this.x - (this._outScreenWH >> 1);
		this._outScreenY = this.y - (this._outScreenWH >> 1)
	},
	null, {
		init: function() {
			this.car && this.car.mapRender();
			return this
		},
		resetScreen: function(a, b) {
			this.width = a;
			this.height = b;
			this._owNum = Math.ceil(this.width / this.ow);
			this._ohNum = Math.ceil(this.height / this.oh);
			return this
		},
		setMoveDs: function(a) {
			this._moveDs = a || [0, 1, 2, 3, 4, 5, 6, 7];
			return this
		},
		setStopDs: function(a) {
			this._stopDs = a || [8, 9, 10, 11, 12, 13, 14, 15];
			return this
		},
		render: function() {
			this.carRender().shelterRender().wordsRender();
			return this
		},
		wordsRender: function() {
			if (0 == this._focusLampShelters.length) {
				for (var a, b = Date.now(), c = this._wordsList.length - 1; 0 <= c; c--)(a = this._wordsList[c]) && !a.outScreen && g.canvas.drawCache(a._passId, parseInt(a.x + a._wordsDx), parseInt(a.y + a._wordsDy));
				for (c = this._bubblesList.length - 1; 0 <= c; c--)(a = this._bubblesList[c]) && !a.role.outScreen && (b - a.data >= a.delayMs ? this.removeRoleBubbleByIndex(c) : g.canvas.drawCache(a.passId, parseInt(a.role.x + a.dx), parseInt(a.role.y + a.dy)));
				for (c = this._fontEffs.length - 1; 0 <= c; c--) if ((b = this._fontEffs[c]) && !b.outScreen) {
					a = b.getFrame();
					if (null != a[2] || null != a[3]) if (g.canvas.save(), 0 <= a[2] && g.canvas.globalAlpha(a[2]), 0 <= a[3]) {
						var d = g.canvas.font(b._font).measureText(b._text).width;
						g.canvas.translate(b.x + (d >> 1), b.y).scale(a[3], a[3]).translate( - (b.x + (d >> 1)), -b.y)
					}
					g.canvas.drawString(b._text, b.x + a[0], b.y + a[1], "", !0, b._color, b._strokeColor, b._font); (null != a[2] || null != a[3]) && g.canvas.restore()
				}
			}
			return this
		},
		animationRender: function() {
			for (var a = this._loadingBars.length - 1,
			b; b = this._loadingBars[a]; a--) this.loadingBarRender(b);
			return this
		},
		loadingBarRender: function(a) {
			var b = a.role;
			if (b && !b.outScreen) {
				var c = a.curMs / a.ms,
				d = parseInt(100 - 100 * c) + "%",
				e = parseInt(a.font);
				g.canvas.fillStyle("#CCC").fillRect(b.x - 60, b.y + a.dy + 5, 120, e + 4).fillStyle("#0F0").fillRect(b.x - 60, b.y + a.dy + 5, 120 - 120 * c, e + 4).drawString(d, b.x - (g.canvas.font(a.font).measureText(d).width >> 1), b.y + a.dy + 5 + e, "", !0, a.color, a.stroke, a.font).drawString(a.desc, b.x + a.dx, b.y + a.dy, "", !0, a.color, a.stroke, a.font)
			}
			return this
		},
		carRender: function() {
			this.car && this.car.paint(this._context, this.x + this.shakeX, this.y + this.shakeY);
			return this
		},
		shelterRender: function() {
			if (0 == this._focusLampShelters.length || 0 <= this._focusLampBlockColor.indexOf("rgba")) {
				for (var a, b = this._backEffs.length - 1; 0 <= b; b--)(a = this._backEffs[b]) && !a.outScreen && a.render();
				for (b = this._shelters.length - 1; 0 <= b; b--)(a = this._shelters[b]) && (!a.hided && !a.outScreen) && a.render()
			}
			if (0 < this._focusLampShelters.length) {
				g.canvas.fillStyle(this._focusLampBlockColor).fillScreen();
				for (b = this._backEffs.length - 1; 0 <= b; b--)(a = this._backEffs[b]) && (a.shine && !a.outScreen) && a.render();
				for (b = this._focusLampShelters.length - 1; a = this._focusLampShelters[b]; b--) a.outScreen || a.render();
				for (b = this._frontEffs.length - 1; 0 <= b; b--)(a = this._frontEffs[b]) && (a.shine && !a.outScreen) && a.render();
				for (var c, b = this._fontEffs.length - 1; 0 <= b; b--) if ((a = this._fontEffs[b]) && a.shine && !a.outScreen) c = a.getFrame(),
				g.canvas.drawString(a._text, a.x + c[0], a.y + c[1], "", !0, a._color, a._strokeColor, a._font)
			}
			return this
		},
		frontEffectRender: function() {
			for (var a = this._frontEffs.length - 1,
			b; b = this._frontEffs[a]; a--) b.outScreen || b.render();
			return this
		},
		clearShelters: function() {
			for (var a, b = this._shelters.length - 1; 0 <= b; b--)(a = this._shelters[b]) && ("building" == a.type ? this.removeBuilding(a.id) : this.removeRole(a.id));
			return this
		},
		debugRender: function() {
			for (var a, b = this._shelters.length - 1; 0 <= b; b--) if ((a = this._shelters[b]) && !a.outScreen) {
				var c = a._fA,
				d = c.length;
				g.canvas.fillStyle("rgba(0, 0, 0, 0.2)");
				for (var e = 0; e < d; e++) g.canvas.fillRect(parseInt(a.x + c[e][2] * a.zoom), parseInt(a.y + c[e][3] * a.zoom), a.rects[c[e][0]][c[e][1]][2] * a.zoom, a.rects[c[e][0]][c[e][1]][3] * a.zoom);
				g.canvas.fillStyle("rgba(0, 255, 255, 0.5)").fillRect(a.getSprite().trans == g.trans.TRANS_NONE ? parseInt(a.x + a.dx + a.bR[0] * a.zoom) : parseInt(a.x + a.dx - (a.bR[0] + a.bR[2]) * a.zoom), a.y + a.dy + a.bR[1] * a.zoom, a.bR[2] * a.zoom, a.bR[3] * a.zoom).fillStyle("rgba(255, 0, 255, 0.5)").fillRect(a.getSprite().trans == g.trans.TRANS_NONE ? parseInt(a.x + a.dx + a.aR[0] * a.zoom) : parseInt(a.x + a.dx - (a.aR[0] + a.aR[2]) * a.zoom), a.y + a.dy + a.aR[1] * a.zoom, a.aR[2] * a.zoom, a.aR[3] * a.zoom)
			}
			var f, i;
			g.canvas.fillStyle("rgba(255, 0, 0, 0.5)");
			for (b = 0; b < this._events.length; b++) {
				if ("npcRange" != this._events[b][0]) f = this._events[b][2] - this.car.getMapOffX(),
				i = this._events[b][3] - this.car.getMapOffY();
				else if (a = this._events[b][7]) f = a.x - (this._events[b][4] >> 1),
				i = a.y - (this._events[b][5] >> 1);
				g.canvas.fillRect(f, i, this._events[b][4], this._events[b][5])
			}
			g.canvas.fillStyle("rgba(0, 0, 0, 0.6)");
			for (b = 0; b < this._aStars.length; b++) for (e = 0; e < this._aStars[b].length; e++) 0 >= this._aStars[b][e] && g.canvas.fillRect(e * this.ow - this.car.getMapOffX(), b * this.oh - this.car.getMapOffY(), this.ow, this.oh);
			return this
		},
		action: function() {
			var a, b, c;
			if (a = this._superStar) if (this.eventListener(), null != a.svx && null != a.svy && this.focusRole(a.id), 0 < this._endEvents.length && 0 == a.nodes.length && a.endPath()) {
				for (var d, e = 0,
				f = this._endEvents.length; e < f; e++) d = this._endEvents[e],
				this._onEvent(d[0], d[1], a, this, d[2]);
				d = null;
				this._endEvents = []
			}
			0 < this._focusPath.length && (b = this._focusPath.shift(), this.carScroll( - b[0], -b[1]));
			if (0 < this._shakePath.length) c = this._shakePath.shift(),
			this.shakeX = c[0],
			this.shakeY = c[1],
			b && (b[0] += this.shakeX, b[1] += this.shakeY);
			else if (0 != this.shakeX || 0 != this.shakeY) this.shakeY = this.shakeX = 0;
			this._canSort = !1;
			for (e = this._shelters.length - 1; 0 <= e; e--) if (a = this._shelters[e]) {
				b ? (a.x += b[0], a.y += b[1]) : c && (a.x += c[0], a.y += c[1]);
				a.action();
				if ("role" == a.type || "npc" == a.type) a.endPath() ? 0 < a.nodes.length && (this._superStar && (this._superStar.id == a.id && this._onEvent) && this._onEvent("setNode", a.id, a, this), d = a.nodes.shift(), a.setPath(this.returnRolePathByNode(a.x0, a.y0, d[0], d[1], a.nodeXStep, a.nodeYStep)), a.lastX0 = a.x0, a.lastY0 = a.y0, a.x0 = d[0], a.y0 = d[1]) : this._canSort = !0;
				a.outScreen = h(a.x + a.bR[0], a.y + a.bR[1], a.bR[2], a.bR[3], this._outScreenX, this._outScreenY, this._outScreenW, this._outScreenH) ? !1 : !0
			}
			for (e = this._frontEffs.length - 1; 0 <= e; e--) a = this._frontEffs[e],
			d = a.getSprite(),
			a && d && (b ? (a.x += b[0], a.y += b[1]) : c && (a.x += c[0], a.y += c[1]), a.action(), a._aimObj && a.mark(a._aimObj.x + a._effDx, a._aimObj.y + a._effDy, a._aimObj.mapOffx + a._effDx, a._aimObj.mapOffy + a._effDy), !a.loop && (null != a.aimX && a.endPath() || null == a.aimX && d.endFrame()) && this._frontEffs.splice(e, 1), a.outScreen = h(a.x + a.bR[0], a.y + a.bR[1], a.bR[2], a.bR[3], this._outScreenX, this._outScreenY, this._outScreenW, this._outScreenH) ? !1 : !0);
			for (e = this._backEffs.length - 1; 0 <= e; e--) a = this._backEffs[e],
			d = a.getSprite(),
			a && d && (b ? (a.x += b[0], a.y += b[1]) : c && (a.x += c[0], a.y += c[1]), a.action(), a._aimObj && a.mark(a._aimObj.x + a._effDx, a._aimObj.y + a._effDy, a._aimObj.mapOffx + a._effDx, a._aimObj.mapOffy + a._effDy), !a.loop && (a.endPath() && d.endFrame()) && this._backEffs.splice(e, 1), a.outScreen = h(a.x + a.bR[0], a.y + a.bR[1], a.bR[2], a.bR[3], this._outScreenX, this._outScreenY, this._outScreenW, this._outScreenH) ? !1 : !0);
			for (e = this._fontEffs.length - 1; 0 <= e; e--) if (a = this._fontEffs[e]) b ? (a.x += b[0], a.y += b[1]) : c && (a.x += c[0], a.y += c[1]),
			a.nextFrame(),
			a._aimObj && (a.x = a._aimObj.x + a._effDx, a.y = a._aimObj.y + a._effDy),
			!a.loop && a.endFrame() && this._fontEffs.splice(e, 1),
			a.outScreen = h(a.x, a.y, a.width, a.height, this._outScreenX, this._outScreenY, this._outScreenW, this._outScreenH) ? !1 : !0;
			a = d = null;
			if (0 < this._loadingBars.length) {
				b = Date.now();
				for (e = this._loadingBars.length - 1; c = this._loadingBars[e]; e--) c.role && 0 < c.curMs ? (c.curMs -= b - c.date, c.date = b, 0 > c.curMs && (c.curMs = 0)) : (this._onEvent && this._onEvent("loadingBarEnd", c.roleId, c.role, this, null, c.data), c.role = null, this._loadingBars.splice(e, 1));
				b = null
			}
			0 < this._focusLampShelters.length && (e = Date.now(), e - this._focusLampDate >= this._focusLampTimeout && (this._focusLampDate = e, this.turnOffFocusLamp()), this._focusLampShelters.sort(function(a, b) {
				return b.y - a.y
			}), e = null);
			this._canSort && (0 == this._sortStep && this.sortShelters(), this._sortStep++, this._sortStep %= this._sortStep_);
			a = b = d = null;
			return this
		},
		sortShelters: function() {
			this._shelters.sort(function(a, b) {
				return b.y - a.y
			});
			return this
		},
		turnOnFocusLamp: function(a, b, c, d) {
			for (var e = this._focusLampShelters.length - 1,
			f; f = this._focusLampShelters[e]; e--) if (f.id == b) return this;
			switch (a) {
			default:
				(a = this.getRole(b)) && this._focusLampShelters.push(a);
				break;
			case "building":
				(a = this.getBuilding(b)) && this._focusLampShelters.push(a)
			}
			this._focusLampTimeout = c || 1E3;
			this._focusLampDate = Date.now();
			null != d && (this._focusLampBlockColor = d);
			return this
		},
		turnOffFocusLamp: function() {
			this._focusLampShelters = [];
			return this
		},
		returnRolePathByNode: function(a, b, c, d, e, f) {
			for (var i = [], f = f || this._nodeYStep, b = this.cutNumToSteps((d - b) * this.ow, e || this._nodeXStep), a = this.cutNumToSteps((c - a) * this.oh, f), c = b.length > a.length ? b.length: a.length, f = 0; f < c; f++) d = b[f] || 0,
			e = a[f] || 0,
			i.push([d, e]);
			return i
		},
		update: function(a, b) {
			this.updateMap(a, b).init();
			return this
		},
		updateMap: function(a, b) {
			if (a) {
				if (this.car) {
					for (var c, d = this._shelters.length - 1; 0 <= d; d--)(c = this._shelters[d]) && c.mark(c.mapOffx, c.mapOffy, c.mapOffx, c.mapOffy);
					for (d = this._frontEffs.length - 1; 0 <= d; d--)(c = this._frontEffs[d]) && c.mark(c.mapOffx, c.mapOffy, c.mapOffx, c.mapOffy);
					for (d = this._backEffs.length - 1; 0 <= d; d--)(c = this._backEffs[d]) && c.mark(c.mapOffx, c.mapOffy, c.mapOffx, c.mapOffy);
					for (d = this._fontEffs.length - 1; 0 <= d; d--) if (c = this._fontEffs[d]) c.x = c.mapOffx + c._effDx - (c.width >> 1),
					c.y = c.mapOffy + c._effDy - c.height;
					this.car = null
				}
				this.car = new g.Carmark(this.width, this.height, this.tw, this.th, this.offsetTileNumber, a, this._tiles)
			}
			b && (this._aStars = b);
			return this
		},
		makeCameraMove: function(a, b, c, d) {
			this._focusPath.length = 0;
			var a = a || 0,
			b = b || 0,
			e = this.car,
			f = e.getMapOffX(),
			i = e.getMapOffY();
			0 > a ? a = e.mapW - e.scrWidth - f < Math.abs(a) ? -(e.mapW - e.scrWidth - f) : a: 0 < a && (a = f < a ? f: a);
			0 > b ? b = e.mapH - e.scrHeight - i < Math.abs(b) ? -(e.mapH - e.scrHeight - i) : b: 0 < b && (b = i < b ? i: b);
			c = this.cutNumToSteps(a, c || this.sw);
			d = this.cutNumToSteps(b, d || this.sh);
			a = c.length > d.length ? c.length: d.length;
			for (f = e = b = 0; f < a; f++) b = c[f] || 0,
			e = d[f] || 0,
			(0 != b || 0 != e) && this._focusPath.push([b, e]);
			return this
		},
		setCameraSpeed: function(a, b) {
			this.sw = a || this.tw;
			this.sh = b || this.th;
			return this
		},
		carScroll: function(a, b) {
			this.car.scroll(a, b);
			return this
		},
		makeRoleMove: function(a, b) {
			var c = this.getRole(a);
			c && c.setPath(b);
			return this
		},
		makeRoleFly: function(a, b, c, d, e, f, i, g, h) {
			if (a = this.getRole(a)) {
				var b = b || a.mapOffx,
				c = c || a.mapOffy,
				l = [],
				m = this.car,
				l = this.getFly(b, c, d, e, f, i, g);
				a.mark(b - m.getMapOffX(), c - m.getMapOffY(), b, c).setPath(l, h)
			}
			return this
		},
		getFly: function(a, b, c, d, e, f, i) {
			var a = (c || 0) - a,
			b = (d || 0) - b,
			d = Math.sqrt(a * a + b * b),
			f = f || 100,
			c = e || "linear",
			i = i || 10,
			g,
			h = a / d,
			l = b / d,
			e = [];
			_stepX = a;
			for (g = b; d > f;) d -= f,
			a = d * h,
			_stepX -= a,
			b = d * l,
			g -= b,
			e.push([_stepX, g]),
			_stepX = a,
			g = b;
			0 < d && (_stepX = d * h, g = d * l, e.push([_stepX, g]));
			switch (c) {
			case "ease-in":
				if (0 < e.length) {
					a = e.shift();
					for (a = this.getEasePath(a[0], a[1], i); 0 < a.length;) e.unshift(a.pop())
				}
				break;
			case "ease-out":
				if (0 < e.length) {
					a = e.pop();
					for (a = this.getEasePath(a[0], a[1], i); 0 < a.length;) e.push(a.shift())
				}
				break;
			case "ease":
				if (1 < e.length) {
					a = e.shift();
					for (a = this.getEasePath(a[0], a[1], i); 0 < a.length;) e.unshift(a.pop());
					a = e.pop();
					for (a = this.getEasePath(a[0], a[1], i); 0 < a.length;) e.push(a.shift())
				}
			}
			_stepX = null;
			return e
		},
		getEasePath: function(a, b, c) {
			for (var d = [], c = c || 10; 0 < c--;) a /= 2,
			b /= 2,
			d.push([a, b]);
			d.push([a, b]);
			return d
		},
		createAstarNodes: function(a, b, c, d, e, f, i, k, h, l) {
			var m = this.getRole(a);
			if (m) {
				this.setRole(a, b, c);
				m._cutNum = f || 0;
				var d = (b = this.checkIJ(d, e)) ? b[0] : 0,
				e = b ? b[1] : 0,
				b = null,
				s = this;
				g.Astar.callPath({
					id: a,
					map: this._aStars,
					x0: m.x0,
					y0: m.y0,
					x1: d,
					y1: e,
					sx: i,
					sy: k,
					ex: h,
					ey: l,
					asyncUrl: this._asyncUrl,
					async: !0,
					callBack: function(a) {
						var b = s.getRole(a.id),
						a = a.path;
						b && (0 < a.length && a.shift(), a.length > b._cutNum && (0 < b._cutNum && a.splice(a.length - b._cutNum, b._cutNum), b.nodes = a, s._superStar && (b.id == s._superStar.id && 0 < a.length) && (a = a[a.length - 1] || [], s._onEvent && s._onEvent("getPath", b.id, b, s, null, {
							x0: b.x0,
							y0: b.y0,
							x1: a[0],
							y1: a[1]
						}))), s._superStar && (s._endEventObj && b.id == s._superStar.id) && (s._endEvents.push(s._endEventObj), s._endEventObj = null))
					}
				})
			}
			m = null;
			return this
		},
		getPathRange: function() {
			var a = [0, 0, 0, 0],
			b = this.car,
			c = parseInt(b.getMapOffY() / this.oh),
			b = parseInt(b.getMapOffX() / this.ow);
			a[0] = c;
			a[1] = b;
			a[2] = c + this._ohNum - 1;
			a[3] = b + this._owNum - 1;
			return a
		},
		checkIJ: function(a, b) {
			if (null == a || null == b) return null;
			0 > a ? a = 0 : a >= this._aStars.length && (a = this._aStars.length - 1);
			0 > b ? b = 0 : b >= this._aStars[0].length && (b = this._aStars[0].length - 1);
			return [a, b]
		},
		getO: function(a, b) {
			return this._aStars[a][b]
		},
		setO: function(a, b, c) {
			this._aStars[a] && null != this._aStars[a][b] && (this._aStars[a][b] = c || 0);
			return this
		},
		aim: function(a, b, c, d, e, f, i) {
			a = this.getRole(a) || this._superStar || null;
			return ! a ? this: this.createAstarNodes(a.id, null, null, this.yToI(c), this.xToJ(b), 0, d, e, f, i)
		},
		selectRole: function(a, b) {
			if (!this._superStar) return ! 1;
			for (var c = null,
			d, e = 0,
			f = this._shelters.length; e < f; e++) if (d = this._shelters[e], !d.outScreen && !("npc" != d.type || d.id == this.roleId) && h(a, b, 1, 1, d.x + d.bR[0], d.y + d.bR[1], d.bR[2], d.bR[3])) {
				this._onEvent && this._onEvent("selectedRole", d.id, this._superStar, this, d);
				c = d;
				break
			}
			if (!c) {
				e = 0;
				for (f = this._shelters.length; e < f; e++) if (d = this._shelters[e], !d.outScreen && !("role" != d.type || d.id == this.roleId) && !d.canNotClick && h(a, b, 1, 1, d.x + d.bR[0], d.y + d.bR[1], d.bR[2], d.bR[3])) {
					this._onEvent && this._onEvent("selectedRole", d.id, this._superStar, this, d);
					c = d;
					break
				}
			}
			return c
		},
		selectEffect: function(a, b, c) {
			if (!this._superStar) return ! 1;
			var d = null,
			c = c || "front",
			e;
			"front" == c ? e = this._frontEffs: "back" == c && (e = this._backEffs);
			for (var c = 0,
			f; f = e[c]; c++) if (!f.outScreen && h(a, b, 1, 1, f.x + f.bR[0], f.y + f.bR[1], f.bR[2], f.bR[3])) {
				this._onEvent && this._onEvent("selectedEffect", f.id, this._superStar, this, f);
				d = f;
				break
			}
			return d
		},
		setShelter: function(a, b, c) {
			if (!a) return this;
			b = (c = this.checkIJ(b, c)) ? c[0] : 0;
			c = c ? c[1] : 0;
			a.x0 = b;
			a.y0 = c;
			a.mark(this.jToX(a.y0), this.iToY(a.x0), a.y0 * this.ow + (this.ow >> 1), a.x0 * this.oh + (this.oh >> 1));
			return ! 1
		},
		removeShelter: function(a, b) {
			for (var c, d = this._shelters.length - 1; 0 <= d; d--) if (c = this._shelters[d], !(b && b != c.type) && c.id == a) {
				this._shelters.splice(d, 1);
				break
			}
			return this
		},
		getBuilding: function(a) {
			return this._buildingObjs["_" + a] ? this._buildingObjs["_" + a] : null
		},
		addBuilding: function(a, b, c, d, e, f) {
			a && (b && !this.getBuilding(a)) && (b.id = a, b.type = "building", this._buildingObjs["_" + a] = b, this._shelters.push(this._buildingObjs["_" + a]), this.setBuilding(a, c, d, e, f));
			return this
		},
		setBuilding: function(a, b, c, d, e) {
			if (a = this.getBuilding(a)) this.setShelter(a, b, c),
			null != d && a.setSprite(d),
			null != e && a.setStep(e);
			return this
		},
		removeBuilding: function(a) {
			var b = this.getBuilding(a);
			b && (this.removeShelter(a, b.type), this._buildingObjs["_" + a] = null, delete this._buildingObjs["_" + a]);
			return this
		},
		getRole: function(a) {
			return this._roleObjs["_" + a] ? this._roleObjs["_" + a] : null
		},
		addRole: function(a, b, c, d, e, f, i, g, h, l, m, s, t, v, z, u) {
			a && (b && !this.getRole(a)) && (b.id = a, b.type = g || "role", b.words = [], b.curHP = 0, b.HP = 0, b.curPower = 0, b.power = 0, b.width = b.bR[2], b.height = b.bR[3], b.setMoveDs(this._moveDs), b.setStopDs(this._stopDs), b.setSpeed(this._nodeXStep, this._nodeYStep), b.hided = !1, this._roleObjs["_" + a] = b, this._shelters.push(this._roleObjs["_" + a]), this.setRole(a, d, e, [], f, i, h, l, m, s), this.setRoleWords(b.id, c, t, v, z, u));
			return this
		},
		removeRole: function(a) {
			var b = this.getRole(a);
			if (b) {
				this.removeRoleWords(b.id);
				this.removeEventById(b.id);
				this.removeShelter(a, b.type);
				this.removeRoleBubble(b.id);
				this.removeRoleLinks(b.id);
				if (b.effects) for (var c, d = 0; d < b.effects.length; d++)(c = b.effects[d]) && this.removeEffect(c[0], c[1]);
				this._roleObjs["_" + a] = null;
				delete this._roleObjs["_" + a]
			}
			return this
		},
		clearRoles: function(a) {
			var b; (!a || "role" == a) && this.unFocusRole();
			for (var c = this._shelters.length - 1; 0 <= c; c--) b = this._shelters[c],
			a ? a == b.type && this.removeRole(b.id) : this.removeRole(b.id);
			return this
		},
		hideRoles: function(a) {
			for (var b, c = this._superStar ? this._superStar.id: "-1", d = this._shelters.length - 1; 0 <= d; d--) b = this._shelters[d],
			b.id == c || b.canNotHide || (a ? a == b.type && (b.hided = !0) : b.hided = !0);
			return this
		},
		showRoles: function(a) {
			for (var b, c = this._shelters.length - 1; 0 <= c; c--) b = this._shelters[c],
			a ? a == b.type && (b.hided = !1) : b.hided = !1;
			return this
		},
		setRoleDxDy: function(a, b, c) {
			if (a = this.getRole(a)) a.dx = b || 0,
			a.dy = c || 0;
			return this
		},
		addRoleLinks: function(a, b, c, d, e) {
			var f = this.getRole(a);
			f && (this.removeRoleLinks(a), f.addLinks(b), null != c && f.setMoveDs(c), null != d && null != e && this.setRoleDxDy(a, d, e));
			return this
		},
		removeRoleLinks: function(a, b) {
			var c = this.getRole(a);
			c && (c.clearLinks().setMoveDs(b || this._moveDs), this.setRoleDxDy(a, 0, 0));
			return this
		},
		setRole: function(a, b, c, d, e, f, i, g, h, l) {
			var m = this.getRole(a);
			m && (this._aStars[0] && null != b && null != c ? this.setShelter(m, b, c) : null != h && null != l && this.beatRole(a, h, l), null != e && m.setSprite(e), null != f && m.setStep(f), d && (m.nodes = d), i && (m.onstart && (m.onstart = null), m.onstart = i), g && (m.onend && (m.onend = null), m.onend = g));
			return this
		},
		beatRole: function(a, b, c) {
			if (a = this.getRole(a)) {
				var d = this.car;
				d && a.mark(b - d.getMapOffX(), c - d.getMapOffY(), b, c)
			}
			return this
		},
		setRoleState: function(a, b, c) { (a = this.getRole(a)) && (a[b] = c);
			return this
		},
		setRoleSpeed: function(a, b, c) { (a = this.getRole(a)) && a.setSpeed(b || this._nodeXStep, c || this._nodeYStep);
			return this
		},
		setRoleWords: function(a, b, c, d, e, f) {
			if ((a = this.getRole(a)) && ("role" == a.type || "npc" == a.type)) b && (a.words = b),
			null != c && (a.curHP = c),
			null != d && (a.HP = d),
			null != e && (a.curPower = e),
			null != f && (a.power = f),
			!a._passId && 0 < this._wordsPassIds.length && (a._passId = this._wordsPassIds.pop(), a._wordsDx = -(a.width * a.zoom >> 1) + (a.width * a.zoom - this._wordsW >> 1), a._wordsDy = -(a.height * a.zoom + this._wordsH - 20), this._wordsList.push(a)),
			a._passId && (a.words && this.initWordsCache(a, this._wordsW, this._wordsH), (a.curHP || a.HP) && this.initHPCache(a, this._wordsW, this._wordsH));
			return this
		},
		setRoleZoom: function(a, b, c, d) {
			var e = this.getRole(a),
			c = c || 0,
			d = d || 0;
			e && (e.setZoom(b), e._wordsDx = -(e.width * e.zoom >> 1) + (e.width * e.zoom - this._wordsW >> 1) + c, e._wordsDy = -(e.height * e.zoom + this._wordsH - 20) + d, this.setRoleWords(a));
			return this
		},
		removeRoleWords: function(a) {
			for (var b, c = this._wordsList.length - 1; 0 <= c; c--) if ((b = this._wordsList[c]) && b.id == a && b._passId) {
				b.words = [];
				this._wordsPassIds.push(b._passId);
				b._passId = null;
				this._wordsList.splice(c, 1);
				break
			}
			return this
		},
		addRoleBubble: function(a, b, c, d, e, f, i, k, h, l, m) {
			var s, t, v, z, u, n;
			if (!b || !b.length) return this;
			if ((t = this.getRole(a)) && ("role" == t.type || "npc" == t.type)) if (this.removeRoleBubble(t.id), 0 == this._bubblePassIds.length && this.removeRoleBubbleByIndex(0), 0 < this._bubblePassIds.length) {
				s = this._bubblePassIds.pop();
				a = b[0];
				a = g.canvas.font(this._bubbleFont).measureText(a);
				v = l || 0;
				z = m || 0;
				var l = a.height * b.length + 5,
				m = a.width > this._bubbleW - 20 - 20 ? this._bubbleW - 20 - 20 : a.width,
				l = l > this._bubbleH - 20 ? this._bubbleH - 20 : l,
				j,
				r = e || 5,
				m = m + 20,
				l = l + 20;
				j = 20 < l - 2 * r ? 20 : l - 2 * r;
				1 == d ? (v += t.width >> 1, z += -t.height, e = 20) : (v += -(t.width >> 1) - m - 20, z += -t.height, e = 0);
				this._bubblesList.push({
					id: t.id,
					role: t,
					passId: s,
					delayMs: c,
					data: Date.now(),
					dx: v,
					dy: z,
					width: m,
					height: l
				});
				c = f || "#000";
				i = i || "";
				k = k || "#FFF";
				h = h || "#000";
				g.canvas.pass(s).clearScreen().beginPath().moveTo(e + 2 + r, 2).lineTo(e + m - r - 2, 2).quadraticCurveTo(e + m - 2, 2, e + m - 2, 2 + r).lineTo(e + m - 2, l - r - 2).quadraticCurveTo(e + m - 2, l - 2, e + m - r - 2, l - 2).lineTo(e + 2 + r, l - 2).quadraticCurveTo(e + 2, l - 2, e + 2, l - r - 2).lineTo(e + 2, 2 + r).quadraticCurveTo(e + 2, 2, e + 2 + r, 2).closePath().lineWidth(2).strokeStyle(h).stroke().fillStyle(k).fill();
				1 == d ? (u = 21, n = l - r - (j >> 1), v = 21, z = l - r - j, f = 0, t = l - r - parseInt(j / 3), d = 22, s = l - r - (j >> 1), m = 22) : (u = m - 2 + 1, n = l - r - (j >> 1), v = m - 2 + 1, z = l - r - j, f = m - 2 + 20, t = l - r - parseInt(j / 3), d = m - 2, s = l - r - (j >> 1), m -= 2);
				g.canvas.beginPath().moveTo(u, n).lineTo(v, z).lineTo(f, t).lineTo(u, n).closePath().strokeStyle(h).stroke().fillStyle(k).fill().strokeStyle(k).drawLine(d, s, m, l - r - j);
				for (m = 0; l = b[m]; m++) j = e + 10,
				r = 10 + (m + 1) * a.height + 2 * m,
				"" != i && g.canvas.fillStyle(i).fillText(l, j - 1, r - 1).fillText(l, j + 1, r - 1).fillText(l, j - 1, r + 1).fillText(l, j + 1, r + 1),
				g.canvas.fillStyle(c).fillText(l, j, r);
				g.canvas.pass();
				_pointerH = null
			}
			return this
		},
		removeRoleBubble: function(a) {
			for (var b, c = this._bubblesList.length - 1; 0 <= c; c--) if ((b = this._bubblesList[c]) && b.id == a) {
				this._bubblePassIds.push(b.passId);
				this._bubblesList.splice(c, 1);
				break
			}
			return this
		},
		removeRoleBubbleByIndex: function(a) {
			for (var b, c = this._bubblesList.length - 1; 0 <= c; c--) if ((b = this._bubblesList[c]) && c == a) {
				this._bubblePassIds.push(b.passId);
				this._bubblesList.splice(c, 1);
				break
			}
			return this
		},
		clearRoleBubble: function() {
			for (var a, b = this._bubblesList.length - 1; 0 <= b; b--) if (a = this._bubblesList[b]) this._bubblePassIds.push(a.passId),
			this._bubblesList.splice(b, 1);
			return this
		},
		initWordsCache: function(a, b, c) {
			if (a && a.words) {
				a._wordsDx = -(a.width >> 1) + (a.width - b >> 1);
				a._wordsDy = -(a.height + c + 5);
				g.canvas.pass(a._passId).clearScreen().font("12px Arial");
				var c = a.words[1],
				d = g.canvas.measureText(c),
				d = b - d.width >> 1;
				g.canvas.fillStyle("#000").fillText(c, d - 1, 19).fillText(c, d + 1, 19).fillText(c, d - 1, 21).fillText(c, d + 1, 21).fillStyle("#FF0").fillText(c, d, 20);
				g.canvas.font("14px Arial");
				c = a.words[0];
				d = g.canvas.measureText(c);
				b = b - d.width >> 1;
				g.canvas.fillStyle("#000").fillText(c, b - 1, 37).fillText(c, b + 1, 37).fillText(c, b - 1, 39).fillText(c, b + 1, 39).fillStyle(a.words[2] || "#FFF").fillText(c, b, 38);
				g.canvas.pass()
			}
			return this
		},
		initHPCache: function(a, b, c) {
			if (a) {
				var d = ((0 <= a.curHP ? a.curHP: 0) + 0.1) / ((0 <= a.HP ? a.HP: 0) + 0.1);
				g.canvas.pass(a._passId).fillStyle("rgba(0, 0, 0, 1)").fillRect(b - 60 >> 1, c - 2 - 4, 60, 2).fillStyle("rgba(0, 255, 0, 1)").fillRect(b - 60 >> 1, c - 2 - 4, parseInt(60 * (1 < d ? 1 : d)), 2).pass()
			}
			return this
		},
		focusRole: function(a, b, c) { ! this._superStar && this.getRole(a) && (this.roleId = a, this._superStar = this.getRole(this.roleId));
			if (!this._superStar || !this.car) return this;
			this.makeCameraMove((this.car.scrWidth >> 1) - this._superStar.x, (this.car.scrHeight >> 1) - this._superStar.y, b, c);
			return this
		},
		unFocusRole: function() {
			this._superStar && (this._superStar.onstart = null, this._superStar.onend = null, this.roleId = "", this._superStar = null, this.clearEndEvents());
			return this
		},
		getSuperStar: function() {
			return this._superStar
		},
		cutNumToSteps: function(a, b) {
			for (var c = [], d, e = 0 < a ? 1 : -1, f = 0 > a ? -a: a; 0 < f;) 1 <= f / b ? (d = b, f -= b) : (d = f % b, f -= d),
			c.push(d * e);
			return c
		},
		jToX: function(a) {
			return a * this.ow + (this.ow >> 1) - this.car.getMapOffX()
		},
		iToY: function(a) {
			return a * this.oh + (this.oh >> 1) - this.car.getMapOffY()
		},
		xToJ: function(a) {
			return parseInt((a + this.car.getMapOffX()) / this.ow)
		},
		yToI: function(a) {
			return parseInt((a + this.car.getMapOffY()) / this.oh)
		},
		addEvent: function(a, b, c, d, e, f, i, g) {
			var h = this.getRole(g),
			c = this.checkIJ(c, d),
			e = e || this.ow,
			f = f || this.oh;
			this._events.push([a, b, c ? c[1] * this.ow + (this.ow >> 1) - (e >> 1) : 0, c ? c[0] * this.oh + (this.oh >> 1) - (f >> 1) : 0, e, f, i, h, g]);
			return this
		},
		addEndEvent: function(a, b, c) {
			if (!this._superStar) return this;
			this._endEventObj = [a, b, c];
			return this
		},
		clearEndEvents: function() {
			this._endEvents = null;
			this._endEvents = [];
			return this
		},
		removeEventById: function(a) {
			for (var b, c = this._onEventQueue.length - 1; 0 <= c; c--)(b = this._onEventQueue[c]) && b[1] == a && this._onEventQueue.splice(c, 1);
			for (c = this._events.length - 1; 0 <= c; c--) if ((b = this._events[c]) && b[1] == a) {
				this._events.splice(c, 1);
				break
			}
			return this
		},
		removeEventByType: function(a) {
			for (var b, c = this._onEventQueue.length - 1; 0 <= c; c--)(b = this._onEventQueue[c]) && b[0] == a && this._events._onEventQueue(c, 1);
			for (c = this._events.length - 1; 0 <= c; c--)(b = this._events[c]) && b[0] == a && this._events.splice(c, 1);
			return this
		},
		checkEventCollision: function(a, b, c, d, e) {
			var a = a || [],
			f,
			i,
			g;
			g = !0;
			if ("npcRange" != a[0]) f = a[2],
			i = a[3];
			else if (g = a[7]) f = g.mapOffx - (a[4] >> 1),
			i = g.mapOffy - (a[5] >> 1);
			return g = h(b, c, d, e, f, i, a[4], a[5])
		},
		eventListener: function() {
			if (!this._superStar || !this._onEvent) return this;
			var a, b = this._superStar,
			c = Date.now();
			if (c - this._callEventDate >= this.callEventTimeout) {
				for (var d = this._onEventQueue.length - 1; a = this._onEventQueue[d]; d++) this.checkEventCollision(a, b.mapOffx, b.mapOffy, 1, 1) || (this._events.push(a), this._onEventQueue.splice(d, 1));
				for (d = this._events.length - 1; a = this._events[d]; d--) this.checkEventCollision(a, b.mapOffx, b.mapOffy, 1, 1) && (a[6] && this._onEventQueue.push(a), this._events.splice(d, 1), null != this._superStar.lastX0 && null != this._superStar.lastY0 && this._onEvent(a[0], a[1], b, this, "npcRange" == a[0] ? a[7] : null, null, a[8]));
				this._callEventDate = c
			}
			return this
		},
		clearEvents: function() {
			this._events = null;
			this._events = [];
			this._onEventQueue = null;
			this._onEventQueue = [];
			return this
		},
		bind: function(a, b) {
			if ("function" != typeof b) return this;
			"event" == a && (this._onEvent = b);
			return this
		},
		getFontEffect: function(a) {
			for (var b, c = null,
			d = this._fontEffs.length - 1; 0 <= d; d--) if ((b = this._fontEffs[d]) && b.id == a) {
				c = b;
				break
			}
			return c
		},
		removeFontEffect: function(a) {
			for (var b, c = this._fontEffs.length - 1; 0 <= c; c--) if ((b = this._fontEffs[c]) && b.id == a) {
				this._fontEffs.splice(c, 1);
				break
			}
			return this
		},
		addFontEffect: function(a, b, c, d, e, f, i, k, h, l, m, s, t, v, z) {
			if (a) {
				this.removeFontEffect(a);
				m = m || "normal";
				f = f || 0;
				b = b || "";
				c = c || 0;
				d = d || 0;
				k = k || "#000";
				h = h || "#FFF";
				l = l || "12px Arial";
				_hold = i || f;
				var u, i = g.canvas.font(l).measureText(b),
				n = this.car;
				switch (m) {
				default:
					u = [0, -20];
					m = [[0, -2], [0, -4], [0, -6], [0, -7], [0, -10], [0, -12], [0, -14], [0, -16], [0, -18], u];
					break;
				case "upDown":
					u = [0, -49];
					m = [[0, -15], [0, -60], [0, -58], [0, -56], [0, -54], [0, -53], [0, -52], [0, -51], [0, -50], u];
					break;
				case "jumpUp":
					u = [0, -51, null, 1];
					m = [[0, -15, null, 0.4], [0, -45, null, 1.6], [0, -45, null, 1], [0, -46, null, 1], [0, -47, null, 1], [0, -48, null, 1], [0, -49, null, 1], [0, -50, null, 1], u];
					break;
				case "static":
					m = [[0, 0]]
				}
				u && (u.step = _hold);
				u = new g.action.sprite(m, !1, 0, f);
				u.id = a;
				u._text = 0 < b ? "+" + b: b;
				u.width = i.width;
				u.height = i.height;
				u.loop = e;
				u._color = k;
				u._aimObj = this.getRole(s);
				u._effDx = t || 0;
				u._effDy = v || 0;
				u.mapOffx = c;
				u.mapOffy = d;
				u.x = u.mapOffx - n.getMapOffX() + u._effDx - (u.width >> 1);
				u.y = u.mapOffy - n.getMapOffY() + u._effDy - u.height;
				u._strokeColor = h;
				u._font = l;
				u.shine = z;
				this._fontEffs.unshift(u);
				_hold = null
			}
			return this
		},
		clearFontEffects: function() {
			this._fontEffs = [];
			return this
		},
		getEffect: function(a) {
			for (var b, c = null,
			d = this._frontEffs.length - 1; 0 <= d; d--) if ((b = this._frontEffs[d]) && b.id == a) {
				c = b;
				break
			}
			for (d = this._backEffs.length - 1; 0 <= d; d--) if ((b = this._backEffs[d]) && b.id == a) {
				c = b;
				break
			}
			return c
		},
		removeEffect: function(a, b) {
			var c = b || "front",
			d = [];
			"front" == c ? d = this._frontEffs: "back" == c && (d = this._backEffs);
			for (var e = d.length - 1; 0 <= e; e--) if ((c = d[e]) && c.id == a) {
				d.splice(e, 1);
				break
			}
			return this
		},
		addEffect: function(a, b, c, d, e, f, i, g, h, l, m, s, t, v, z, u, n, j, r) {
			var g = g || "front",
			G = h || -1E3,
			J = l || -1E3;
			if (b && !this.getEffect(a)) {
				var H = this.checkIJ(c, d),
				P = null == c && null == d && null == h && null == l ? -1E3: 0,
				c = H ? H[0] : 0,
				d = H ? H[1] : 0;
				b.x0 = c;
				b.y0 = d;
				null == h && null == l && (null != d && (G = d * this.ow + (this.ow >> 1) + P), null != c && (J = c * this.oh + (this.oh >> 1) + P));
				c = this.car;
				if (!c) return this;
				b.id = a;
				b.loop = e;
				b.type = g;
				b._aimObj = this.getRole(u);
				b._aimObj && (b._aimObj.effects || (b._aimObj.effects = []), b._aimObj.effects.push([b.id, b.type]));
				b._effDx = n || 0;
				b._effDy = j || 0;
				b.shine = r;
				null != f && b.setSprite(f);
				null != i && b.setStep(i);
				b.mark(G - c.getMapOffX(), J - c.getMapOffY(), G, J);
				null != m && null != s && (a = this.getFly(G, J, m, s, t, v, z), b.setPath(a), b.aimX = m, b.aimY = s);
				"front" == g ? this._frontEffs.unshift(b) : "back" == g && this._backEffs.unshift(b)
			}
			return this
		},
		clearEffects: function(a) {
			"front" == a ? this._frontEffs = [] : ("back" != a && (this._frontEffs = []), this._backEffs = []);
			return this
		},
		addLoadingBar: function(a, b, c, d, e, f, i, k) {
			if ((a = this.getRole(a)) && 0 > this._loadingBars.indexOfAttr("roleId", a.id)) f = f || "14px Arial",
			this._loadingBars.push({
				roleId: a.id,
				role: a,
				color: d || "#000",
				stroke: e || "#FFF",
				font: f,
				dx: -(g.canvas.font(f).measureText(c).width >> 1),
				dy: i || 0,
				curMs: b,
				ms: b,
				desc: c,
				date: Date.now(),
				data: k
			}),
			this._onEvent && this._onEvent("loadingBarStart", a.id, a, this, null, k);
			return this
		},
		removeLoadingBar: function(a) {
			a = this._loadingBars.indexOfAttr("roleId", a);
			0 <= a && this._loadingBars.splice(a, 1);
			return this
		},
		makeShake: function(a) {
			if (0 < this._shakePath.length) return this;
			switch (a) {
			case "earthquake":
				this._shakePath = [[0, 8], [0, -8], [0, -8], [0, 8], [0, 5], [0, -5], [0, -5], [0, 5]];
				break;
			case "shake":
				this._shakePath = [[8, 0], [ - 8, 0], [ - 8, 0], [8, 0], [5, 0], [ - 5, 0], [ - 5, 0], [5, 0]];
				break;
			case "oblique":
				this._shakePath = [[5, 5], [ - 5, -5], [ - 5, -5], [5, 5], [2, 2], [ - 2, -2], [ - 2, -2], [2, 2]];
				break;
			case "smallEarthquake":
				this._shakePath = [[0, 2], [0, -2], [0, -2], [0, 2], [0, 1], [0, -1], [0, -1], [0, 1]];
				break;
			case "severeEarthquake":
				this._shakePath = [];
				for (var b, c = 0; 5 > c; c++) a = g.commandFuns.getRandom( - 5, 5),
				b = g.commandFuns.getRandom( - 5, 5),
				this._shakePath.push([a, b]),
				this._shakePath.push([ - a, -b]),
				this._shakePath.push([ - a, -b]),
				this._shakePath.push([a, b]);
				this._shakePath.push([2, 2]);
				this._shakePath.push([ - 2, -2]);
				this._shakePath.push([ - 2, -2]);
				this._shakePath.push([2, 2]);
				this._shakePath.push([1, 1]);
				this._shakePath.push([ - 1, -1]);
				this._shakePath.push([ - 1, -1]);
				this._shakePath.push([1, 1])
			}
			return this
		},
		endPath: function() {
			return 0 == this._focusPath.length
		},
		clearPath: function() {
			this._focusPath.length = 0;
			return this
		},
		getShelters: function() {
			return this._shelters
		},
		getAStars: function() {
			return this._aStars
		},
		disposed: function() {
			this._focusPath = this._shelters = this._effectObjs = this._buildingObjs = this._roleObjs = this._aStars = null;
			this.unFocusRole();
			this.clearEvents();
			this.clearEndEvents();
			this._runDowns = this._runDownObjs = null;
			this.clearEffects();
			this._backEffs = this._frontEffs = null;
			this.clearFontEffects();
			this._fontEffs = null;
			for (var a = this._wordsPassIds.length - 1; 0 <= a; a--) g.canvas.del(this._wordsPassIds[a]);
			this._wordsList = this._wordsPassIds = null;
			for (a = this._bubblePassIds.length - 1; 0 <= a; a--) g.canvas.del(this._bubblePassIds[a]);
			this._loadingBars = this._endEventObj = this._onEvent = this._endEvents = this._bubblesList = this._bubblePassIds = null;
			this._canSort = !1;
			return this
		}
	});
	g.World.enums = {
		oType: {
			stop: 0,
			pass: 1,
			shadow: 2
		}
	}
})(jsGame);
var gl = {
	gameState: 0
},
CDN = "",
lastVersionPath = "./release_0.005.030/",
versionId = "0.006.028"; (function(g) {
	gl.getImgUrl = function(g, a, b) {
		return "url(" + this.getImgSrc(g) + ") -" + (a || 0) + "px -" + (b || 0) + "px"
	};
	gl.getImgSrc = function(g) {
		return CDN + g + "?v=" + versionId
	};
	gl.resource = {
		imgs: [{
			id: "bg2",
			src: gl.getImgSrc("img/bg2.jpg")
		},
		{
			id: "cf",
			src: gl.getImgSrc("img/cf.png")
		},
		{
			id: "notice1",
			src: gl.getImgSrc("img/notice1.png")
		},
		{
			id: "btn1",
			src: gl.getImgSrc("img/btn1.png")
		},
		{
			id: "btn3",
			src: gl.getImgSrc("img/btn3.png")
		}],
		battleLoading: function() {},
		loadImgs: [],
		matchLoadImg: [],
		coachActionLoadImg: [],
		playerShowActionLoadImg: [],
		loadBattle: [],
		asyncImgs: [{
			id: "xinshengbaodao_01",
			src: gl.getImgSrc("img/xinshengbaodao_01.png")
		},
		{
			id: "num_toulan",
			src: gl.getImgSrc("img/num_toulan.jpg")
		},
		{
			id: "UI_toulan2",
			src: gl.getImgSrc("img/UI_toulan2.png")
		},
		{
			id: "bg1",
			src: gl.getImgSrc("img/bg1.jpg")
		},
		{
			id: "panel1",
			src: gl.getImgSrc("img/panel1.png")
		},
		{
			id: "gl",
			src: gl.getImgSrc("img/gl.png")
		},
		{
			id: "notice2",
			src: gl.getImgSrc("img/notice2.png")
		}],
		audios: []
	};
	window.glsysw = 580 < window.glsysw ? 580 : window.glsysw;
	gl.sys = {
		innerWidth: window.innerWidth,
		w: 580 < window.innerWidth ? 580 : window.innerWidth,
		h: 1136 < window.innerHeight ? 1136 : window.innerHeight,
		left: 0,
		top: 0,
		id: 0,
		alertStyle: "pop",
		requestSingal: !1,
		callIn999: !1,
		loadedSceneImgSceneId: null,
		loadedSceneImgLayerId: null,
		notReConnectedYet: !0,
		device: "",
		initSys: function() {
			g.canvas.screen.getTouch() && (gl.sys.h = window.innerHeight, g.ui.core.prototype.getScreenWidth = function() {
				return gl.sys.w
			},
			g.ui.core.prototype.getScreenHeight = function() {
				return gl.sys.h
			},
			"ipad" != g.canvas.screen.getDevice() && (gl.sys.alertStyle = "normal"));
			this.resetCanvasStyle()
		}
	}
})(link);
CDN = ""; (function(g) {
	var h = {
		name: "",
		bg: "",
		color: "",
		img: null,
		id: 0,
		sx: 0,
		sy: 0,
		width: 70,
		height: 70,
		w: 10,
		h: 10,
		type: 0,
		ui: {},
		getData: function() {
			return null
		}
	},
	a = {};
	if (/iPad|iPhone|iPod/.test(navigator.platform)) {
		var b = navigator.appVersion.match(/OS ((\d+)_(?:\d+)_?(?:\d+)?)/);
		a.longVersion = b[1];
		a.shortVersion = parseInt(b[2])
	} else a.longVersion = 0,
	a.shortVersion = 0;
	var c = "",
	d = !1,
	e = !1;
	statics = {
		basicUserInfo: {
			id: 0,
			code: 0,
			name: "",
			level: 1,
			vipLevel: 0,
			exp: 0,
			goldCoin: 0,
			diamond: 0,
			wishDiamond: 0,
			soulDiamond: 0,
			friendship: 0,
			vigor: 0,
			scoop: 0,
			peakedNess: 0
		},
		init: function() {
			gl.sys.notReConnectedYet = !0;
			document.body.style.background = gl.getImgUrl("img/bgs/UI_BG_01.jpg");
			document.body.style.backgroundColor = "#000";
			document.body.style.backgroundSize = "1136px 768px";
			document.body.style.backgroundRepeat = "no-repeat";
			document.body.style.backgroundPosition = (window.innerWidth - 1136 >> 1) + "px " + (window.innerHeight - 768 >> 1) + "px";
			notify.notify("callReConnectMsgWindow", {
				desc: "\u8bf7\u7a0d\u7b49<br />\u6b63\u5728\u8fde\u63a5\u670d\u52a1\u5668\u4e2d..."
			});
			im.init()
		},
		getTime: function(a) {
			var b, c, a = ~~a;
			b = 3600 > a ? 0 : ~~ (a / 3600);
			c = ~~ (a % 3600 / 60);
			a %= 60;
			return (10 > b ? "0" + b: b) + ":" + (10 > c ? "0" + c: c) + ":" + (10 > a ? "0" + a: a)
		},
		getShortTime: function(a) {
			var b, a = ~~a;
			b = ~~ (a % 3600 / 60);
			a %= 60;
			return (10 > b ? "0" + b: b) + ":" + (10 > a ? "0" + a: a)
		},
		getFullTime: function(a, b) {
			var c, d, a = parseInt(a),
			e = b || "{0}\u5c0f\u65f6{1}\u5206{2}\u79d2";
			c = 3600 > a ? 0 : parseInt(a / 3600);
			c = 10 > c ? "0" + c: 24 < c ? parseInt(c / 24) + "\u5929" + c % 24 : c;
			d = parseInt(a % 3600 / 60);
			a %= 60;
			return String.format(e, c, 10 > d ? "0" + d: d, 10 > a ? "0" + a: a)
		},
		getTimeStamp: function() {
			var a = (new Date).getTime().toString(),
			b = 13 - a.length;
			0 < b ? a += (new Date).getTime().toString().substring(0, b) : 0 > b && (a = a.substring(0, 13));
			return a
		},
		getMapping: function(a, b) {
			"pet" == a && (a = "role");
			if (!a || !sceneDataMapping[a] && !mappings[a]) return h;
			var c = sceneDataMapping[a];
			c || (c = mappings[a] || h);
			return c["mp" + b] || c.mp1 || h
		},
		addWToNum: function(a, b, c) {
			a = a || 0;
			return a.toString().length > b ? Math.floor(a / c) + "W": a
		},
		makeDataToList: function(a, b, c, d, e) {
			for (var g = [], b = b || [], h, t, a = a || 0, v = 0, z = 0; v < a; v++) {
				h = c + v * d;
				t = [];
				for (z = 0; z < d; z++) t.push(b[h + z]);
				e && gl.tools[e] ? g.push(gl.tools[e](t)) : g.push(t)
			}
			return g
		},
		comJson: function(a) {
			a = JSON.stringify(a || {});
			a = a.replace(/\[/g, "(");
			a = a.replace(/\]/g, ")");
			return a = a.replace(/,/g, "|")
		},
		unComJson: function(a) {
			a = (a || "").replace(/\(/g, "[");
			a = a.replace(/\)/g, "]");
			a = a.replace(/\|/g, ",");
			return JSON.parse(a)
		},
		makeStyleGradient: function(a, b) {
			a && a.dom && ("" != a.style("-prefix-") ? a.dom.style.backgroundImage = a.style("-prefix-") + "linear-gradient(" + b + ")": a.dom.style.background = "rgba(0, 0, 0, 0.8)")
		},
		getTextShadowColor: function(a, b) {
			var c = a || "#000",
			d = b || 1;
			return "0px " + d + "px " + d + "px " + c + "," + d + "px 0px " + d + "px " + c + ",-" + d + "px 0px " + d + "px " + c + ",0px -" + d + "px " + d + "px " + c
		},
		numberToChinese: function(a) {
			var b = (a + "").split(""),
			a = [];
			if (12 < b.length) throw Error("too big");
			for (var c = 0,
			d = b.length - 1; c <= d; c++) 1 == d || 5 == d || 9 == d ? 0 == c ? "1" != b[c] && a.push("\u96f6\u4e00\u4e8c\u4e09\u56db\u4e94\u516d\u4e03\u516b\u4e5d".charAt(b[c])) : a.push("\u96f6\u4e00\u4e8c\u4e09\u56db\u4e94\u516d\u4e03\u516b\u4e5d".charAt(b[c])) : a.push("\u96f6\u4e00\u4e8c\u4e09\u56db\u4e94\u516d\u4e03\u516b\u4e5d".charAt(b[c])),
			c != d && a.push("\u4e2a\u5341\u767e\u5343\u4e07@#%\u4ebf^&~".charAt(d - c));
			return a.join("").replace(/\u96f6([\u5341\u767e\u5343\u4e07\u4ebf@#%^&~])/g,
			function(a, c, f) {
				f = "\u4e2a\u5341\u767e\u5343\u4e07@#%\u4ebf^&~".indexOf(c);
				if ( - 1 != f) {
					if ("\u4ebf" == c || "\u4e07" == c) return c;
					if ("0" == b[d - f]) return "\u96f6"
				}
				return ""
			}).replace(/\u96f6+/g, "\u96f6").replace(/\u96f6([\u4e07\u4ebf])/g,
			function(a, b) {
				return b
			}).replace(/\u4ebf[\u4e07\u5343\u767e]/g, "\u4ebf").replace(/[\u96f6]$/, "").replace(/[@#%^&~]/g,
			function(a) {
				return {
					"@": "\u5341",
					"#": "\u767e",
					"%": "\u5343",
					"^": "\u5341",
					"&": "\u767e",
					"~": "\u5343"
				} [a]
			}).replace(/([\u4ebf\u4e07])([\u4e00-\u4e5d])/g,
			function(a, c, f, e) {
				e = "\u4e2a\u5341\u767e\u5343\u4e07@#%\u4ebf^&~".indexOf(c);
				return - 1 != e && "0" == b[d - e] ? c + "\u96f6" + f: a
			})
		},
		getDeviceVersion: function() {
			return a
		},
		get2PointRotate: function(a, b, c, d) {
			a = 180 * (Math.atan2(d - b, c - a) / Math.PI);
			return 0 <= a ? a: a + 360
		},
		get2PointDirection: function(a, b, c, d) {
			_rotate = this.get2PointRotate(a, b, c, d);
			if (255 < _rotate && 285 >= _rotate) return 0;
			if (285 < _rotate && 345 >= _rotate) return 1;
			if (345 < _rotate || 15 >= _rotate) return 2;
			if (15 < _rotate && 75 >= _rotate) return 3;
			if (75 < _rotate && 105 >= _rotate) return 4;
			if (105 < _rotate && 165 >= _rotate) return 5;
			if (165 < _rotate && 195 >= _rotate) return 6;
			if (195 < _rotate && 255 >= _rotate) return 7
		},
		createUIButton: function(a, b, c, d, e, h, s, t, v) {
			e = this.getMapping("buttons", e);
			return new g.ui[!v ? "button": v]({
				id: a,
				position: b,
				x: c,
				y: d,
				width: e.width,
				height: e.height,
				ui: e.ui,
				color: e.color,
				hColor: e.hColor,
				deColor: e.deColor,
				value: h,
				zIndex: s || 0,
				appendTo: t || ""
			})
		},
		createResourcesLabel: function(a, b, c, d, e) {
			for (var e = e || [], h = [], s = 0, t; t = e[s]; s++) h.push([staticsHtml.getResourceSpan("", "absolute", 5 + 161 * s, 12, t.type), '<span style="position:absolute;left:' + (38 + 160 * s) + "px;top:5px;width:126px;height:43px;line-height:43px;background:" + gl.getImgUrl("img/UI_other_01.png", 50, 0) + ';">' + t.value + "</span>"].join(""));
			return new g.ui.label({
				id: a,
				position: b,
				x: c,
				y: d,
				width: 488,
				height: 50,
				color: "#FFF",
				textAlign: "center",
				html: h.join("")
			})
		},
		setResourceLabelValue: function(a, b) {
			if (a) {
				var c = b || [],
				d = a.getChildren(),
				e;
				if (d && 2 <= d.length) for (var g, h = 0; h < c.length; h++) if (e = c[h], g = d[2 * h + 1]) g.innerHTML = e;
				_value = null
			}
		},
		getPlayerInfo: function(a) {
			var a = a || [],
			b = 0;
			return 0 == a.length ? {}: {
				playerId: a[b++],
				cardId: a[b++],
				picId: a[b++],
				quality: a[b++],
				name: a[b++],
				level: a[b++],
				maxStar: a[b++],
				curStar: a[b++],
				score: a[b++],
				sites: a[b++] || [],
				curSite: a[b++],
				playerValue: a[b++],
				price: a[b++],
				train: a[b++],
				tips: a[b++],
				flag: a[b++],
				fightingPicId: a[b++]
			}
		},
		getEquipInfo: function(a) {
			var a = a || [],
			b = 0;
			return 0 == a.length ? {}: {
				equipId: a[b++],
				initId: a[b++],
				picId: a[b++],
				quality: a[b++],
				name: a[b++],
				level: a[b++],
				maxLevel: a[b++],
				desc: a[b++],
				strengthCost: a[b++],
				price: a[b++],
				site: a[b++],
				pos: a[b++],
				propObj: a[b++],
				tips: a[b++],
				flag: a[b++]
			}
		},
		getResourceInfo: function(a) {
			var a = a || [],
			b = 0;
			return 0 == a.length ? {}: {
				picId: a[b++],
				name: a[b++],
				quality: a[b++],
				count: a[b++],
				pickState: a[b++],
				dropType: a[b++],
				relationId: a[b++]
			}
		},
		getPeakBattleInfo: function(a) {
			var a = a || [],
			b = 0;
			return 0 == a.length ? {}: {
				max: a[b++],
				cur: a[b++],
				last: a[b++],
				allAttrAdd: a[b++],
				doubleFlag: a[b++],
				pkCount: a[b++]
			}
		},
		getAssosiationInfo: function(a) {
			var a = a || [],
			b = 0;
			return 0 == a.length ? {}: {
				num: a[b++],
				max: a[b++],
				prestige: a[b++]
			}
		},
		getSitesStr: function(a, b) {
			var c = ["PG", "SG", "C", "SF", "PF"],
			d = "";
			if ( - 1 == b) {
				for (var e = 0,
				g = a.length - 1; e < g; e++) d += c[a[e]] + "/";
				d += c[a[g]]
			} else {
				e = 0;
				for (g = a.length - 1; e < g; e++) d = a[e] != b ? d + (c[a[e]] + "/") : d + ('<span style="color:#fc0">' + c[a[e]] + "</span>/");
				d = a[g] != b ? d + c[a[g]] : d + ('<span style="color:#fc0">' + c[a[g]] + "</span>")
			}
			return d
		},
		getBtnWithResource: function(a, b, c, d, e, h, s) {
			return new g.ui.label({
				id: a,
				position: b,
				x: c,
				y: d,
				width: 194,
				height: 56,
				color: "#FFF",
				textAlign: "center",
				background: gl.getImgUrl("img/button_01.png", 163, 266),
				html: ['<div style="position: absolute; left: 0px; top: 0px; width: 125px; height: 60px; text-align: center; line-height: 60px; font-size: 18px; text-shadow: ' + statics.getTextShadowColor("#000") + ';">' + h + "</div>", staticsHtml.getResourceSpan("", "absolute", 110, 0, e), '<div style="position: absolute; left: 135px; top: -10px; width: 60px; height: 60px; text-align: center; line-height: 55px;">' + (s || 0) + "</div>", '<div id="' + a + '" style="position:absolute;left:0px;top:0px;width:194px;height:56px;"></div>'].join("")
			})
		},
		setBtnWithResourceValue: function(a, b, c, d) {
			if (a) {
				var e = a.getChildren();
				null != b && (e[0].innerHTML = b);
				null != c && (e[2].innerHTML = c);
				null != d && a.style("background", d ? gl.getImgUrl("img/button_01.png", 555, 266) : gl.getImgUrl("img/button_01.png", 163, 266))
			}
		},
		getPlayCardLabel: function(a, b, c, d, e) {
			a = a || 0;
			b = b || 0;
			c = g.objExtend({
				transform: "scale(" + (c || 1) + "," + (d || 1) + ")",
				transformOrigin: "center center"
			},
			e || {});
			return (new g.ui.label({
				position: "absolute",
				x: a,
				y: b,
				width: 240,
				height: 340,
				html: ""
			})).style(c)
		},
		getPlayerRealSite: function(a) {
			return a ? 0 <= a.curSite && 4 >= a.curSite ? a.curSite: a.sites[0] : 0
		},
		setPlayerCardValue: function(a, b) {
			if (!b) return ! 1;
			var c = Math.min(b.maxStar, 9),
			d = this.getMapping("siteTypeMapping", this.getPlayerRealSite(b)),
			e = this.getMapping("playerCard", b.picId).bg,
			e = e.replace(/-(\d+)px\s-(\d+)px/,
			function(a, b) {
				b = parseInt(b);
				return "-" + Math.round(236 * b / 270) + "px 30px"
			}),
			g = ['<div style="position:absolute;width:236px;height:336px;left:2px;background:' + e + "," + this.getMapping("qualityPlayerBGMapping", b.quality).bg + ';background-size:1180px 310px,240px 340px;background-repeat: no-repeat,no-repeat;"></div>', '<div style="position:absolute;width:240px;height:337px;background:' + this.getMapping("cardFrameMapping", b.quality).bg + ';background-size:240px 340px"></div>', '<div style="position:absolute;left:25px;top:8px;width:' + 20 * c + 'px;height:20px;">', '<div style="width:' + 20 * b.curStar + "px;height:20px;background:" + gl.getImgUrl("img/UI_star_01.png", 0, 0) + ';background-size:20px 40px;display:inline-block;"></div><div style="width:' + 20 * (c - b.curStar) + "px;height:20px;background:" + gl.getImgUrl("img/UI_star_01.png", 0, 20) + ';background-size:20px 40px;display:inline-block;"></div>', "</div>", '<div style="position:absolute;left:170px;top:30px;width:60px;height:45px;text-align:center;">' + staticsHtml.makeNumToSpan(b.score, "img/Card_123.png", 0, 0, 29, 45) + "</div>", '<div style="position:absolute;left:15px;top:299px;line-height: 22px;font-size:18px;color:#fff;text-shadow: ' + statics.getTextShadowColor("#000") + ';">' + b.name + "</div>", '<div data-type="level" style="position:absolute;right:75px;top:299px;color:rgb(255,204,0);font-size: 20px;;line-height: 22px;">Lv' + b.level + "</div>", '<div style="position:absolute;left:173px;top:296px;width:' + d.width + "px;height:" + d.height + "px;background: " + d.bg + ";" + statics.getPrefixCSSS("transform", "scale(0.6)") + statics.getPrefixCSSS("transform-origin", "0 0") + '"></div>'];
			b.relations && b.relations.forEach(function(a, b) {
				g.push('<div style="position: absolute;background:' + gl.getImgUrl("img/UI_tianti_01.png", 225, 0) + ";width:238px;height:29px;color:rgb(255,204,0);text-align:center;line-height:29px;top:" + ( - 30 + 370 * b) + 'px;left:1px;">' + a + "</div>")
			});
			a.setHtml(g.join(""))
		},
		analyticalFormula: function(a, b) {
			return eval("eval(String.format(" + (a || "'parseInt({0}/60/5)*2'") + ", " + (b || [0]).join(",") + "))")
		},
		getPrefixCSSS: function(a, b) {
			return ["-moz-", "-ms-", "-webkit-", ""].map(function(c) {
				return c + a + ":" + b + ";"
			}).join("")
		},
		getMoneyBackground: function(a) {
			return 1E4 < a ? gl.getImgUrl("img/UI_shangcheng_01.png", 500, 190) : 5E3 < a ? gl.getImgUrl("img/UI_shangcheng_01.png", 400, 190) : 2500 < a ? gl.getImgUrl("img/UI_shangcheng_01.png", 300, 190) : 1E3 < a ? gl.getImgUrl("img/UI_shangcheng_01.png", 200, 190) : 500 < a ? gl.getImgUrl("img/UI_shangcheng_01.png", 100, 190) : gl.getImgUrl("img/UI_shangcheng_01.png", 0, 190)
		},
		getTransitionEndEventName: function() {
			if ("" == c) {
				var a, b = document.createElement("fakeelement"),
				d = {
					transition: "transitionend",
					MozTransition: "transitionend",
					WebkitTransition: "webkitTransitionEnd"
				};
				for (a in d) void 0 !== b.style[a] && (c = d[a])
			}
			return c
		},
		getAnimationEndEventName: function() {
			var a, b = document.createElement("fakeelement"),
			c = {
				animation: "animationend",
				MozAnimation: "animationend",
				WebkitAnimation: "webkitAnimationEnd"
			};
			for (a in c) if (void 0 !== b.style[a]) return c[a]
		},
		support3D: function() {
			if (e) return d;
			for (var a = document.createElement("div"), b = ["perspectiveProperty", "WebkitPerspective"], c = b.length - 1; 0 <= c; c--) d = d ? d: void 0 != a.style[b[c]];
			d && (b = document.createElement("style"), b.textContent = "@media (-webkit-transform-3d){#test3d{height:3px}}", document.getElementsByTagName("head")[0].appendChild(b), a.id = "test3d", document.body.appendChild(a), d = 3 === a.offsetHeight, b.parentNode.removeChild(b), a.parentNode.removeChild(a));
			e = !0;
			return d
		},
		doActivity: function(a, b) {
			switch (parseInt(a)) {
			case enums.activityType.activity:
				notify.notify("callActivitiesWindow");
				break;
			case enums.activityType.xuanxiu:
				notify.notify("callPlayerShowFactory", {
					index: 0
				});
				break;
			case enums.activityType.shijian:
				notify.notify("callEventSysFactory", {
					index: 0
				});
				break;
			case enums.activityType.qiuyuanchushou:
				notify.notify("callPlayerManageFactory", {
					index: 0,
					type: enums.playerWindowType.sell
				});
				break;
			case enums.activityType.qiuyuanxunlian:
				notify.notify("callPlayerDevelopmentFactory", {
					index: 0
				});
				break;
			case enums.activityType.tiaozhansai:
				notify.notify("requestAreaListInfo");
				break;
			case enums.activityType.zhuangbeiguanli:
				notify.notify("callEquipManageFactory", {
					index: 0,
					type: enums.equipWindowType.list,
					title: "\u88c5\u5907\u5f3a\u5316",
					curEquipId: -1,
					curSite: -1,
					curPos: -1
				});
				break;
			case enums.activityType.zhenrongguanli:
				notify.notify("callTacticsWindow", {
					index: 0
				});
				break;
			case enums.activityType.haoyouxitong:
			case enums.activityType.haoyouguwu:
			case enums.activityType.haoyoutiaozhan:
				notify.notify("callFriendFactory");
				break;
			case enums.activityType.liaotian:
				notify.notify("callChatFactory");
				break;
			case enums.activityType.VIP:
				notify.notify("callVIPFactory", {
					index: 0
				});
				break;
			case enums.activityType.goumaitili:
				notify.notify("callVIPFactory", {
					index: 3
				});
				break;
			case enums.activityType.goumaijingli:
				notify.notify("callVIPFactory", {
					index: 3
				});
				break;
			case enums.activityType.meirizanzhu:
				notify.notify("callVIPFactory", {
					index: 3
				});
				break;
			case enums.activityType.chongzhi:
				notify.notify("callVIPFactory", {
					index: 2
				});
				break;
			case enums.activityType.huoyuedu:
				notify.notify("callActivityListFactory", {
					index: 0
				});
				break;
			case enums.activityType.shangcheng:
				notify.notify("callVIPFactory", {
					index: 1
				});
				break;
			case enums.activityType.qiandao:
				b ? notify.notify("callSignBoardWindow") : notify.notify("callActivitiesWindow", {
					activityId: enums.activityType.qiandao
				});
				break;
			case enums.activityType.dengjilibao:
				b ? notify.notify("callLevelGiftWindow") : notify.notify("callActivitiesWindow", {
					activityId: enums.activityType.dengjilibao
				});
				break;
			case enums.activityType.zhoukayueka:
				b ? notify.notify("callWeekMonthCardWindow") : notify.notify("callActivitiesWindow", {
					activityId: enums.activityType.zhoukayueka
				});
				break;
			case enums.activityType.shouchong:
				b ? notify.notify("callFirstRechargeWindow") : notify.notify("callActivitiesWindow", {
					activityId: enums.activityType.shouchong
				});
				break;
			case enums.activityType.report:
				b ? notify.notify("getNewerReportInfo") : notify.notify("callActivitiesWindow", {
					activityId: enums.activityType.report
				});
				break;
			case enums.activityType.zeongsongtili:
				b ? notify.notify("callGiveEnergyWindow") : notify.notify("callActivitiesWindow", {
					activityId: enums.activityType.zeongsongtili
				});
				break;
			case enums.activityType.shootGame:
				b ? notify.notify("callShootGameWindow") : notify.notify("callActivitiesWindow", {
					activityId: enums.activityType.shootGame
				});
				break;
			case enums.activityType.qiuduijineng:
				notify.notify("callTeamDevelopmentFactory", {
					index: 0
				});
				break;
			case enums.activityType.dianfengsai:
				notify.notify("pricallPeakBattle");
				break;
			case enums.activityType.qiuyuanshengxing:
				notify.notify("callPlayerDevelopmentFactory", {
					index: 1
				});
				break;
			case enums.activityType.jiaoliangtexun:
				notify.notify("callTeamDevelopmentFactory", {
					index: 2
				});
				break;
			case enums.activityType.tiantisai:
				notify.notify("callLadderMatchWindow");
				break;
			case enums.activityType.huangjinbeisai:
				notify.notify("getGoldBattleType");
				break;
			case enums.activityType.qiuyuanpeiyang:
				notify.notify("callPlayerDevelopmentFactory", {
					index: 2
				});
				break;
			case enums.activityType.jinglitianfu:
				notify.notify("callTeamDevelopmentFactory", {
					index: 1
				});
				break;
			case enums.activityType.qiuyuanjuexing:
				notify.notify("callPlayerDevelopmentFactory", {
					index: 3
				});
				break;
			case enums.activityType.shetuan:
				notify.notify("hasAssociation");
				break;
			case enums.activityType.jiaolian:
				notify.notify("callCoachFactory", {
					index: 1
				});
				break;
			case enums.activityType.tibu:
				notify.notify("callCoachFactory", {
					index: 3
				});
				break;
			case enums.activityType.rechargeRank:
				notify.notify("callRechargeRankWindow");
				break;
			case enums.activityType.consumeRank:
				notify.notify("callConsumeRankWindow")
			}
		},
		activityIsOpen: function(a) {
			a = statics.getMapping("openLvsMapping", a);
			return a.lv > statics.basicUserInfo.level ? (notify.notify("alert", {
				msg: String.format("{0}\u7ea7\u5f00\u542f{1}\u529f\u80fd", a.lv, a.name)
			}), !1) : !0
		}
	};
	staticsData = {
		dataUrlList: {
			mpurl: {
				bg: "",
				width: 320,
				height: 375
			}
		}
	};
	staticsHtml = {
		makeChatToHtml: function(a, b) {
			var c = 0,
			d = a[c++],
			e = a[c++] || [],
			g = e[0] || "",
			h,
			t = e[1] || "",
			e = e[3] || 0,
			v = a[c++] + ""; (c = v.match(/playerlink_(\d+)/)) && parseInt(c[1], 10) == b && (h = !0);
			g == b && (h = !0);
			c = [];
			c = [];
			v = v.replace(/\((\d{2}|\d{3})\)/g,
			function(a, b) {
				return 0 < b && 17 > b ? '<span style="vertical-align:-30%;display:inline-block;width:27px;height:27px;background:' + statics.getMapping("faceIcon", b).bg + ';"></span>': a
			});
			c.push(v);
			var v = d != enums.channelType.privatec ? "<span style='color:" + statics.getMapping("channelTypeMapping", d).color + "'>[" + statics.getMapping("channelTypeMapping", d).name + "] </span>": "",
			z = null,
			z = h ? '<span style="color:#0099FF;">' + t + "</span>" + (0 < e ? '<span style="display:inline-block;vertical-align:sub;width:38px;height:19px;background:' + gl.getImgUrl("img/VIPdengji.png", 0, 19 * (e - 1)) + ';"></span>': "") + ": ": d != enums.channelType.privatec ? '<span id="playerlink_' + g + "_" + t + '" style="color:#0099FF;text-decoration:underline;">' + t + "</span>" + (0 < e ? '<span style="display:inline-block;vertical-align:sub;width:38px;height:19px;background:' + gl.getImgUrl("img/VIPdengji.png", 0, 19 * (e - 1)) + ';"></span>': "") + ": ": '<span style="color:#0099FF;">' + t + "</span>" + (0 < e ? '<span style="display:inline-block;vertical-align:sub;width:38px;height:19px;background:' + gl.getImgUrl("img/VIPdengji.png", 0, 19 * (e - 1)) + ';"></span>': "") + ": ";
			return v + z + c.join("")
		},
		replaceStr: function(a) {
			return (a || "").replace(/\<|\>|\"|\'|\,/g,
			function(a) {
				switch (a) {
				case "<":
					return "&lt;";
				case ">":
					return "&gt;";
				case '"':
				case "'":
					return "'";
				case ",":
					return "\uff0c"
				}
			})
		},
		makeNumToSpan: function(a, b, c, d, e, g) {
			for (var h = [], a = (a || 0).toString(), c = c || 0, t = 0, v; v = a[t]; t++) h.push('<span style="display:inline-block;width:' + e + "px;height:" + g + "px;background:" + gl.getImgUrl(b, c + parseInt(v) * e, d) + ';"></span>');
			return h.join("")
		},
		getResourceSpan: function(a, b, c, d, e) {
			e = statics.getMapping("resourceMapping", e);
			return '<span id="' + a + '" style="display:inline-block;position:' + b + ";" + ("absolute" == b ? "left:" + c + "px;top:" + d + "px;": "margin-left:" + c + "px;margin-top:" + d + "px;") + "width:" + e.width + "px;height:" + e.height + "px;background:" + e.bg + ';vertical-align: middle;">&nbsp;</span>'
		},
		getPlayerHeadIconDivs: function(a, b, c) {
			var d = statics.getMapping("UI", 1),
			d = ['<div style="position:absolute;left:18px;top:25px;width:' + d.width + "px;height:" + d.height + "px;background:" + d.bg + ';"></div>'];
			if (b) {
				var c = statics.getMapping("playerBigHeadIcon", b.picId),
				e = statics.getMapping("qualityTypeMapping", b.quality);
				d.push(['<div style="position:absolute;left:15px;top:0px;width:' + (c.width - 5) + "px;height:" + (c.height - 20) + "px;background:" + c.bg + ';"></div>', '<div style="position:absolute;left:0px;top:133px;width:100%;color:' + e.color + ";text-shadow:" + statics.getTextShadowColor(e.strokeColor) + ';text-align:center;">' + b.name + "</div>", '<div style="position:absolute;left:0px;top:158px;width:100%;color:#FFF;text-shadow:' + statics.getTextShadowColor("#000") + ';text-align:center;">Lv' + b.level + "</div>", '<div style="position:absolute;left:0px;top:190px;width:100%;height:28px;background:' + gl.getImgUrl("img/UI_tianti_01.png", 256, 0) + ';color:#FFF;font-size:17px;">', '\t<span style="position:absolute;left:5px;top:4px;">\u7403\u5458\u8eab\u4ef7:</span>', '\t<span style="position:absolute;left:80px;top:4px;width:68px;text-align:right;">' + b.playerValue + "</span>", this.getResourceSpan("", "absolute", 146, 0, enums.resource.diamond), "</div>"].join(""))
			} else d.push(['<div style="position:absolute;left:52px;top:50px;width:76px;height:76px;background:' + gl.getImgUrl("img/UI_head_frame_01.png", 0, 174) + ';"></div>', '<div style="position:absolute;left:0px;top:133px;width:100%;color:#0F0;text-align:center;">' + (c || "\u9009\u62e9\u7403\u5458") + "</div>"].join(""));
			d.push('<div id="' + a + '" style="position:absolute;left:0px;top:0px;width:100%;height:180px;"></div>');
			return d.join("")
		},
		getAbcdSpan: function(a, b, c, d, e, g) {
			var e = statics.getMapping("abcd", e),
			h = e.height;
			return ['<span id="' + a + '" style="display:inline-block;position:' + b + ";" + ("absolute" == b ? "left:" + c + "px;top:" + d + "px;": "margin-left:" + c + "px;margin-top:" + d + "px;") + ';">', null != g ? '\t<span style="display:inline-block;height:' + h + "px;line-height:" + h + 'px;">' + g + "</span>": "", '\t<span style="display:inline-block;width:' + e.width + "px;height:" + h + "px;line-height:" + h + "px;background:" + e.bg + ';">&nbsp;</span>', "</span>"].join("")
		},
		getItemIconSpan: function(a, b, c, d, e, g, h, t) {
			var e = statics.getMapping("items", e),
			v = e.width,
			z = e.height + (null != h ? 20 : 0),
			u = e.bg,
			t = statics.getMapping("qualityTypeMapping", t);
			return ['<span id="' + a + '" style="display:inline-block;position:' + b + ";" + ("absolute" == b ? "left:" + c + "px;top:" + d + "px;": "margin-left:" + c + "px;margin-top:" + d + "px;") + ";width:" + v + "px;height:" + z + 'px;font-size:20px;">', '<span style="position:absolute;left:0px;top:0px;width:' + e.width + "px;height:" + e.height + "px;background:" + u + ';"></span>', '<span style="position:absolute;left:8px;top:55px;width:' + (v - 16) + "px;text-align:right;color:#ffcc00;text-shadow:" + statics.getTextShadowColor("#000") + ';">' + (null != g ? "\u00d7" + statics.addWToNum(g, 4, 1E4) : "") + "</span>", null != h ? '<span style="position:absolute;left:0px;top:' + e.height + "px;width:" + v + "px;text-align:center;color:" + t.color + ";text-shadow:" + statics.getTextShadowColor(t.strokeColor) + ';font-size:16px;">' + h + "</span>": "", '<span style="position:absolute;left:0px;top:0px;width:' + v + "px;height:" + z + 'px;"></span>', "</span>"].join("")
		},
		getDropIconSpan: function(a) {
			var b = "",
			c;
			switch (a.type) {
			case 2:
				c = statics.getMapping("items", a.iconId);
				b += '<span style="width: ' + c.width + "px;height: " + c.width + "px;background: " + c.bg + ';display:inline-block;"></span>';
				break;
			case 3:
				c = statics.getMapping("playerHeadIcon", a.iconId);
				b += '<span style="width: ' + c.width + "px;height: " + c.width + "px;background: " + c.bg + "," + statics.getMapping("qualityEquipBGMapping", a.quality).bg + ';display:inline-block;"></span>';
				break;
			case 4:
				2 < a.relationId ? (c = statics.getMapping("playerHeadIcon", a.iconId), b += '<span style="width: ' + c.width + "px;height: " + c.width + "px;background: " + c.bg + "," + statics.getMapping("qualitySuipianMapping", a.quality).bg + ';display:inline-block;"></span>') : (c = statics.getMapping("fragment", a.iconId), b += '<span style="width: ' + c.width + "px;height: " + c.width + "px;background: " + c.bg + "," + statics.getMapping("qualityEquipBGMapping", a.quality).bg + ';display:inline-block;"></span>')
			}
			return b
		}
	};
	staticsUI = {}
})(link);
var basketball, basketballNameSpace = {}; (function(g) {
	g.asyncImage([{
		id: "basketball_0_to_4",
		src: "img/roles/basketball_0_to_4.png",
		cache: !0
	}]);
	var h = ["basketball_0_to_4"],
	a = [[[558, 0, 17, 17], [539, 0, 17, 17], [520, 0, 17, 17], [501, 0, 17, 17], [482, 0, 17, 17], [463, 0, 17, 17], [444, 0, 17, 17], [425, 0, 17, 17], [406, 0, 17, 17], [387, 0, 17, 17], [368, 0, 17, 17], [349, 0, 17, 17], [330, 0, 17, 17], [311, 0, 17, 17], [292, 0, 17, 17], [273, 0, 17, 17], [254, 0, 17, 17], [235, 0, 17, 17], [215, 0, 18, 17], [196, 0, 17, 17], [177, 0, 17, 17], [158, 0, 17, 17], [139, 0, 17, 17], [120, 0, 17, 17], [100, 0, 18, 17], [80, 0, 18, 17], [60, 0, 18, 17], [40, 0, 18, 17], [20, 0, 18, 17], [0, 0, 18, 17]]],
	b = [{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 8, -9, 17, 17],
		fA: [[0, 29, -9, -8, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 8, -9, 17, 17],
		fA: [[0, 28, -9, -8, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 8, -9, 17, 17],
		fA: [[0, 27, -9, -8, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 8, -9, 17, 17],
		fA: [[0, 26, -9, -8, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 8, -9, 17, 17],
		fA: [[0, 25, -9, -8, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 8, -9, 17, 17],
		fA: [[0, 24, -9, -8, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 7, -10, 16, 19],
		fA: [[0, 23, -8, -8, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 7, -10, 16, 19],
		fA: [[0, 22, -8, -8, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 7, -10, 16, 19],
		fA: [[0, 21, -8, -8, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 7, -10, 16, 19],
		fA: [[0, 20, -8, -8, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 7, -10, 16, 19],
		fA: [[0, 19, -8, -8, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[0, 18, -9, -8, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 7, -8, 15, 16],
		fA: [[0, 17, -8, -8, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 7, -8, 15, 16],
		fA: [[0, 16, -8, -8, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 7, -8, 15, 16],
		fA: [[0, 15, -8, -8, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 7, -8, 15, 16],
		fA: [[0, 14, -8, -8, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 7, -8, 15, 16],
		fA: [[0, 13, -8, -8, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 7, -8, 15, 16],
		fA: [[0, 12, -8, -8, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 8, -10, 16, 18],
		fA: [[0, 11, -8, -8, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 8, -10, 16, 18],
		fA: [[0, 10, -8, -8, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 8, -10, 16, 18],
		fA: [[0, 9, -8, -8, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 8, -10, 16, 18],
		fA: [[0, 8, -8, -8, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 8, -10, 16, 18],
		fA: [[0, 7, -8, -8, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 8, -10, 16, 18],
		fA: [[0, 6, -8, -8, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 7, -8, 14, 15],
		fA: [[0, 5, -8, -8, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 7, -8, 14, 15],
		fA: [[0, 4, -8, -8, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 7, -8, 14, 15],
		fA: [[0, 3, -8, -8, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 7, -8, 14, 15],
		fA: [[0, 2, -8, -8, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 7, -8, 14, 15],
		fA: [[0, 1, -8, -8, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 7, -8, 14, 15],
		fA: [[0, 0, -8, -8, 0]]
	}],
	c = [{
		loop: !0,
		frames: [[0, 0, 0, 0], [1, 0, 0, 0], [2, 0, 0, 0], [3, 0, 0, 0], [4, 0, 0, 0], [5, 0, 0, 0]]
	},
	{
		loop: !0,
		frames: [[6, 0, 0, 0], [7, 0, 0, 0], [8, 0, 0, 0], [9, 0, 0, 0], [10, 0, 0, 0], [11, 0, 0, 0]]
	},
	{
		loop: !0,
		frames: [[12, 0, 0, 0], [13, 0, 0, 0], [14, 0, 0, 0], [15, 0, 0, 0], [16, 0, 0, 0], [17, 0, 0, 0]]
	},
	{
		loop: !0,
		frames: [[18, 0, 0, 0], [19, 0, 0, 0], [20, 0, 0, 0], [21, 0, 0, 0], [22, 0, 0, 0], [23, 0, 0, 0]]
	},
	{
		loop: !0,
		frames: [[24, 0, 0, 0], [25, 0, 0, 0], [26, 0, 0, 0], [27, 0, 0, 0], [28, 0, 0, 0], [29, 0, 0, 0]]
	}];
	basketballNameSpace.get = function(d, e) {
		return new g.action.role([], 0, 0, 0, e ? e: h, a, b, (0 <= d && c[d] ? [c[d]] : c) || c)
	};
	basketball = basketballNameSpace.get()
})(jsGame);
var body_red, body_redNameSpace = {}; (function(g) {
	g.asyncImage([{
		id: "body_red_0_to_4",
		src: "img/roles/body_red_0_to_4.png",
		cache: !0
	},
	{
		id: "body_red_5_to_9",
		src: "img/roles/body_red_5_to_9.png",
		cache: !0
	},
	{
		id: "body_red_10_to_14",
		src: "img/roles/body_red_10_to_14.png",
		cache: !0
	},
	{
		id: "body_red_15_to_19",
		src: "img/roles/body_red_15_to_19.png",
		cache: !0
	},
	{
		id: "body_red_20_to_24",
		src: "img/roles/body_red_20_to_24.png",
		cache: !0
	},
	{
		id: "body_red_25_to_29",
		src: "img/roles/body_red_25_to_29.png",
		cache: !0
	},
	{
		id: "body_red_30_to_34",
		src: "img/roles/body_red_30_to_34.png",
		cache: !0
	},
	{
		id: "body_red_35_to_39",
		src: "img/roles/body_red_35_to_39.png",
		cache: !0
	},
	{
		id: "body_red_40_to_44",
		src: "img/roles/body_red_40_to_44.png",
		cache: !0
	},
	{
		id: "body_red_45_to_49",
		src: "img/roles/body_red_45_to_49.png",
		cache: !0
	},
	{
		id: "body_red_55_to_59",
		src: "img/roles/body_red_55_to_59.png",
		cache: !0
	},
	{
		id: "body_red_60_to_64",
		src: "img/roles/body_red_60_to_64.png",
		cache: !0
	},
	{
		id: "body_red_65_to_69",
		src: "img/roles/body_red_65_to_69.png",
		cache: !0
	},
	{
		id: "body_red_50_to_54",
		src: "img/roles/body_red_50_to_54.png",
		cache: !0
	},
	{
		id: "body_red_75_to_79",
		src: "img/roles/body_red_75_to_79.png",
		cache: !0
	},
	{
		id: "body_red_80_to_84",
		src: "img/roles/body_red_80_to_84.png",
		cache: !0
	},
	{
		id: "body_red_85_to_89",
		src: "img/roles/body_red_85_to_89.png",
		cache: !0
	},
	{
		id: "body_red_90_to_94",
		src: "img/roles/body_red_90_to_94.png",
		cache: !0
	},
	{
		id: "body_red_95_to_99",
		src: "img/roles/body_red_95_to_99.png",
		cache: !0
	},
	{
		id: "body_red_100_to_104",
		src: "img/roles/body_red_100_to_104.png",
		cache: !0
	},
	{
		id: "body_red_105_to_109",
		src: "img/roles/body_red_105_to_109.png",
		cache: !0
	},
	{
		id: "body_red_115_to_117",
		src: "img/roles/body_red_115_to_117.png",
		cache: !0
	},
	{
		id: "body_red_110_to_114",
		src: "img/roles/body_red_110_to_114.png",
		cache: !0
	}]);
	var h = "body_red_0_to_4 body_red_5_to_9 body_red_10_to_14 body_red_15_to_19 body_red_20_to_24 body_red_25_to_29 body_red_30_to_34 body_red_35_to_39 body_red_40_to_44 body_red_45_to_49 body_red_55_to_59 body_red_60_to_64 body_red_65_to_69 body_red_50_to_54 body_red_75_to_79 body_red_80_to_84 body_red_85_to_89 body_red_90_to_94 body_red_95_to_99 body_red_100_to_104 body_red_105_to_109 body_red_115_to_117 body_red_110_to_114".split(" "),
	a = [[[131, 143, 101, 69], [0, 150, 101, 61], [232, 147, 95, 65], [510, 0, 83, 112], [441, 0, 69, 136], [593, 0, 76, 122], [661, 211, 88, 63], [100, 212, 80, 68], [416, 215, 80, 62], [669, 102, 81, 109], [285, 0, 69, 147], [62, 0, 69, 147], [244, 262, 102, 45], [244, 212, 101, 50], [0, 211, 100, 57], [354, 0, 87, 113], [211, 0, 74, 143], [131, 0, 80, 134], [180, 212, 64, 80], [750, 142, 63, 82], [416, 136, 72, 79], [669, 0, 90, 102], [354, 113, 62, 127], [599, 122, 62, 114], [568, 236, 64, 63], [749, 224, 63, 68], [496, 217, 72, 65], [510, 122, 89, 95], [759, 0, 62, 142], [0, 0, 62, 150]], [[991, 0, 76, 110], [842, 0, 75, 112], [468, 0, 77, 112], [303, 0, 81, 111], [384, 0, 84, 107], [138, 110, 80, 102], [287, 111, 69, 115], [69, 0, 69, 116], [0, 0, 69, 116], [218, 111, 69, 115], [458, 112, 69, 114], [138, 0, 83, 110], [917, 0, 74, 113], [768, 0, 74, 114], [694, 0, 74, 114], [620, 0, 74, 114], [384, 107, 74, 111], [991, 110, 78, 104], [62, 116, 62, 107], [0, 116, 62, 108], [733, 114, 62, 108], [1067, 0, 67, 107], [842, 112, 75, 104], [527, 113, 82, 95], [671, 114, 62, 113], [609, 114, 62, 113], [1069, 107, 62, 113], [917, 113, 67, 113], [545, 0, 75, 113], [221, 0, 82, 111]], [[0, 141, 102, 60], [143, 136, 103, 60], [386, 115, 96, 67], [389, 0, 79, 115], [556, 0, 68, 131], [295, 99, 91, 88], [865, 117, 92, 66], [865, 183, 84, 69], [565, 194, 79, 66], [713, 0, 80, 109], [69, 0, 74, 141], [624, 0, 89, 98], [462, 191, 103, 51], [246, 187, 104, 52], [482, 131, 104, 60], [143, 0, 82, 119], [0, 0, 69, 141], [793, 97, 72, 95], [794, 192, 70, 70], [718, 109, 69, 75], [386, 182, 76, 78], [468, 0, 88, 102], [881, 0, 69, 117], [624, 109, 94, 85], [102, 196, 69, 68], [644, 194, 69, 70], [718, 192, 76, 69], [793, 0, 88, 97], [225, 0, 70, 136], [295, 0, 94, 99]], [[383, 114, 72, 108], [621, 0, 82, 112], [703, 0, 79, 113], [1E3, 109, 72, 112], [1074, 0, 63, 111], [1072, 111, 63, 110], [852, 0, 74, 113], [303, 0, 80, 120], [140, 0, 79, 128], [547, 0, 74, 125], [1E3, 0, 74, 109], [926, 0, 74, 112], [852, 113, 69, 113], [465, 0, 82, 114], [219, 0, 84, 116], [383, 0, 82, 114], [289, 120, 69, 111], [140, 128, 69, 110], [0, 131, 70, 104], [70, 130, 70, 108], [219, 116, 70, 110], [525, 125, 70, 109], [761, 121, 70, 109], [455, 114, 70, 111], [621, 112, 70, 115], [782, 0, 70, 121], [0, 0, 70, 131], [70, 0, 70, 130], [691, 113, 70, 112], [926, 112, 70, 114]], [[70, 231, 63, 113], [0, 239, 63, 110], [226, 0, 74, 112], [70, 126, 74, 105], [226, 112, 74, 108], [70, 0, 74, 126], [300, 110, 69, 110], [300, 0, 69, 110], [144, 0, 82, 115], [214, 220, 70, 110], [284, 220, 70, 109], [0, 129, 70, 110], [144, 226, 70, 104], [144, 115, 70, 111], [0, 0, 70, 129]], [[0, 334, 69, 108], [262, 440, 76, 104], [284, 178, 63, 154], [284, 0, 63, 178], [145, 180, 63, 150], [425, 330, 63, 91], [347, 331, 78, 111], [70, 330, 94, 138], [418, 0, 76, 173], [71, 0, 74, 182], [418, 173, 74, 157], [338, 442, 74, 99], [262, 332, 69, 108], [164, 330, 98, 121], [494, 0, 69, 164], [215, 0, 69, 180], [347, 177, 69, 154], [164, 451, 69, 95], [0, 442, 70, 101], [425, 438, 70, 105], [208, 180, 70, 149], [347, 0, 71, 177], [0, 187, 70, 147], [70, 468, 70, 91], [492, 325, 70, 113], [71, 182, 70, 147], [145, 0, 70, 180], [0, 0, 71, 187], [494, 164, 70, 161], [495, 438, 70, 104]], [[351, 285, 74, 112], [283, 139, 74, 133], [283, 0, 74, 139], [70, 0, 74, 161], [277, 272, 74, 116], [276, 388, 74, 110], [70, 416, 63, 120], [496, 156, 63, 144], [496, 0, 63, 156], [214, 155, 63, 147], [70, 292, 66, 124], [421, 399, 66, 119], [207, 302, 69, 118], [357, 145, 69, 140], [357, 0, 69, 145], [214, 0, 69, 155], [136, 300, 71, 115], [350, 397, 71, 112], [136, 415, 70, 110], [70, 161, 70, 131], [426, 0, 70, 141], [0, 0, 70, 165], [0, 288, 70, 117], [0, 405, 70, 110], [487, 399, 70, 110], [144, 160, 70, 140], [144, 0, 70, 160], [426, 141, 70, 140], [0, 165, 70, 123], [426, 281, 70, 118]], [[413, 106, 69, 107], [551, 108, 69, 105], [620, 109, 69, 104], [997, 108, 69, 104], [482, 106, 69, 105], [344, 106, 69, 107], [586, 0, 70, 108], [275, 106, 69, 108], [206, 106, 69, 108], [137, 106, 69, 108], [997, 0, 69, 108], [656, 0, 69, 109], [289, 0, 75, 106], [512, 0, 74, 106], [438, 0, 74, 106], [364, 0, 74, 106], [214, 0, 75, 106], [137, 0, 77, 106], [0, 110, 68, 104], [893, 110, 68, 101], [825, 110, 68, 101], [757, 110, 68, 101], [689, 110, 68, 101], [68, 110, 69, 102], [929, 0, 68, 110], [861, 0, 68, 110], [793, 0, 68, 110], [725, 0, 68, 110], [69, 0, 68, 110], [0, 0, 69, 110]], [[500, 204, 72, 97], [444, 103, 75, 101], [538, 0, 77, 104], [366, 103, 78, 98], [519, 104, 75, 100], [594, 108, 72, 102], [0, 114, 69, 106], [666, 111, 69, 106], [297, 102, 69, 111], [615, 0, 73, 108], [131, 106, 70, 107], [688, 0, 69, 111], [201, 107, 74, 101], [380, 0, 80, 103], [215, 0, 82, 107], [460, 0, 78, 103], [297, 0, 83, 102], [131, 0, 84, 106], [263, 213, 65, 97], [696, 217, 62, 100], [131, 213, 62, 104], [0, 220, 62, 97], [634, 217, 62, 100], [366, 201, 69, 103], [435, 204, 65, 109], [572, 210, 62, 109], [69, 0, 62, 114], [69, 114, 62, 110], [201, 208, 62, 109], [0, 0, 69, 114]], [[218, 0, 69, 178], [0, 0, 70, 182], [0, 304, 80, 120], [218, 178, 69, 124], [74, 453, 73, 104], [356, 164, 69, 169], [425, 164, 71, 163], [426, 327, 69, 117], [426, 444, 69, 114], [154, 450, 69, 113], [287, 176, 62, 175], [287, 0, 69, 176], [0, 182, 81, 122], [430, 0, 65, 121], [349, 333, 77, 112], [144, 0, 74, 176], [70, 0, 74, 180], [154, 331, 74, 119], [80, 331, 74, 122], [223, 462, 74, 99], [356, 0, 74, 164], [144, 176, 74, 155], [302, 445, 74, 111], [0, 424, 74, 111], [228, 351, 74, 111]], [[238, 0, 88, 148], [760, 0, 64, 163], [893, 0, 62, 156], [691, 153, 62, 145], [893, 156, 62, 89], [326, 0, 75, 166], [474, 0, 74, 152], [474, 152, 74, 134], [548, 0, 74, 145], [307, 166, 74, 96], [138, 0, 100, 159], [691, 0, 69, 153], [548, 145, 70, 144], [238, 148, 69, 146], [753, 163, 70, 92], [138, 159, 70, 139], [69, 0, 69, 169], [401, 0, 73, 159], [824, 149, 69, 144], [0, 169, 69, 86], [0, 0, 69, 169], [622, 0, 69, 153], [618, 153, 73, 135], [824, 0, 69, 149], [401, 159, 69, 101]], [[0, 114, 70, 94], [725, 105, 69, 102], [890, 0, 71, 104], [270, 109, 69, 98], [592, 106, 69, 101], [887, 104, 69, 102], [1039, 103, 69, 103], [656, 0, 69, 106], [320, 0, 69, 109], [582, 0, 74, 106], [513, 0, 69, 106], [127, 0, 69, 110], [196, 109, 74, 98], [961, 103, 78, 103], [807, 0, 83, 104], [513, 106, 79, 101], [807, 104, 80, 102], [725, 0, 82, 105], [127, 110, 62, 94], [451, 106, 62, 101], [1026, 0, 62, 103], [389, 108, 62, 97], [661, 106, 62, 99], [961, 0, 65, 103], [451, 0, 62, 106], [258, 0, 62, 109], [0, 0, 62, 114], [196, 0, 62, 109], [389, 0, 62, 108], [62, 0, 65, 112]], [[1270, 0, 70, 106], [88, 0, 62, 112], [483, 0, 82, 109], [888, 0, 103, 107], [0, 0, 88, 112], [346, 109, 87, 102], [991, 106, 80, 106], [259, 109, 87, 102], [433, 109, 86, 101], [1184, 0, 86, 106], [397, 0, 86, 109], [722, 0, 74, 108], [328, 0, 69, 109], [1101, 0, 83, 106], [1071, 106, 93, 105], [991, 0, 110, 106], [150, 0, 109, 111], [259, 0, 69, 109], [150, 111, 91, 100], [1247, 106, 77, 104], [643, 108, 69, 102], [712, 108, 74, 97], [1164, 106, 83, 104], [0, 112, 92, 95], [796, 107, 91, 103], [565, 108, 78, 102], [887, 107, 70, 102], [648, 0, 74, 108], [565, 0, 83, 108], [796, 0, 92, 107]], [[162, 166, 78, 145], [402, 0, 69, 177], [471, 176, 69, 163], [540, 316, 69, 153], [446, 467, 70, 113], [149, 468, 70, 87], [76, 0, 86, 183], [471, 0, 69, 176], [150, 311, 69, 157], [377, 319, 69, 149], [377, 177, 78, 142], [219, 353, 82, 103], [162, 0, 92, 166], [240, 174, 63, 179], [303, 326, 63, 160], [0, 333, 63, 154], [446, 339, 78, 128], [63, 467, 86, 98], [74, 331, 74, 136], [328, 0, 74, 174], [540, 0, 74, 163], [540, 163, 74, 153], [219, 456, 74, 109], [516, 469, 74, 82], [0, 0, 76, 186], [254, 0, 74, 174], [303, 174, 74, 152], [0, 186, 74, 147], [76, 183, 74, 148], [366, 468, 74, 102]], [[277, 395, 69, 89], [134, 389, 69, 92], [0, 280, 69, 105], [418, 148, 69, 133], [63, 0, 69, 169], [0, 385, 69, 99], [143, 286, 75, 103], [132, 167, 69, 119], [349, 148, 69, 147], [132, 0, 69, 167], [69, 389, 65, 96], [366, 295, 75, 100], [63, 169, 65, 111], [423, 0, 63, 140], [0, 0, 63, 172], [346, 395, 74, 87], [203, 391, 74, 89], [218, 289, 74, 102], [275, 162, 74, 127], [201, 0, 74, 165], [292, 295, 74, 100], [69, 286, 74, 103], [201, 165, 74, 121], [349, 0, 74, 148], [275, 0, 74, 162]], [[69, 183, 76, 121], [217, 0, 79, 163], [217, 163, 64, 178], [281, 439, 63, 100], [421, 429, 64, 103], [218, 341, 63, 108], [505, 166, 74, 146], [69, 0, 74, 183], [143, 0, 74, 181], [0, 304, 74, 119], [74, 310, 74, 112], [505, 312, 74, 110], [351, 179, 75, 137], [366, 0, 69, 179], [0, 0, 69, 184], [427, 321, 76, 108], [351, 316, 76, 109], [0, 184, 69, 111], [74, 422, 70, 108], [281, 178, 70, 147], [505, 0, 70, 166], [0, 423, 70, 100], [351, 425, 70, 97], [503, 422, 70, 104], [435, 174, 70, 147], [296, 0, 70, 178], [435, 0, 70, 174], [145, 181, 70, 129], [281, 325, 70, 114], [148, 341, 70, 111]], [[69, 155, 70, 108], [806, 111, 82, 112], [673, 0, 63, 155], [373, 123, 63, 133], [0, 157, 69, 104], [668, 155, 63, 110], [213, 119, 81, 111], [529, 0, 74, 133], [139, 0, 74, 155], [455, 0, 74, 135], [373, 0, 82, 123], [1029, 131, 74, 110], [599, 140, 69, 110], [213, 0, 90, 119], [0, 0, 69, 157], [890, 0, 69, 134], [806, 0, 84, 111], [736, 137, 69, 111], [294, 151, 70, 108], [436, 135, 70, 111], [303, 0, 70, 151], [959, 0, 70, 132], [139, 155, 70, 103], [529, 133, 70, 113], [959, 132, 70, 113], [736, 0, 70, 137], [69, 0, 70, 155], [603, 0, 70, 140], [1029, 0, 70, 131], [888, 134, 70, 111]], [[324, 469, 77, 107], [193, 174, 69, 163], [193, 0, 69, 174], [460, 0, 69, 170], [324, 338, 69, 121], [230, 474, 69, 91], [393, 336, 72, 133], [62, 0, 69, 180], [62, 180, 69, 162], [324, 170, 69, 168], [467, 335, 73, 148], [86, 470, 69, 103], [0, 460, 86, 115], [386, 0, 74, 170], [467, 170, 74, 165], [393, 170, 74, 166], [131, 338, 82, 132], [155, 470, 75, 96], [62, 342, 62, 112], [131, 179, 62, 159], [131, 0, 62, 179], [262, 0, 62, 173], [0, 342, 62, 118], [463, 483, 62, 90], [262, 335, 62, 139], [0, 0, 62, 185], [262, 173, 62, 162], [324, 0, 62, 170], [0, 185, 62, 157], [401, 469, 62, 106]], [[143, 158, 69, 155], [0, 0, 69, 162], [217, 156, 69, 156], [0, 162, 69, 139], [512, 308, 69, 111], [437, 310, 75, 99], [291, 144, 71, 156], [371, 0, 71, 160], [442, 0, 71, 159], [654, 0, 76, 146], [362, 292, 75, 124], [581, 311, 71, 101], [217, 0, 74, 156], [69, 0, 74, 161], [143, 0, 74, 158], [69, 161, 74, 143], [286, 300, 74, 120], [212, 312, 74, 100], [443, 159, 69, 151], [584, 0, 70, 159], [513, 157, 71, 151], [362, 160, 81, 132], [652, 304, 77, 110], [144, 313, 67, 98], [584, 159, 68, 152], [654, 146, 70, 158], [513, 0, 71, 157], [291, 0, 80, 144], [0, 304, 77, 119], [77, 313, 67, 102]], [[69, 109, 74, 89], [504, 107, 71, 98], [1082, 103, 66, 103], [357, 0, 72, 108], [790, 105, 66, 100], [1019, 103, 63, 103], [212, 108, 74, 96], [646, 105, 74, 101], [943, 104, 74, 101], [69, 0, 74, 109], [791, 0, 82, 105], [945, 0, 74, 104], [286, 108, 87, 93], [143, 108, 69, 97], [873, 104, 70, 101], [504, 0, 73, 107], [873, 0, 72, 104], [1019, 0, 70, 103], [0, 110, 69, 87], [429, 107, 75, 98], [715, 0, 76, 105], [577, 0, 69, 106], [577, 106, 69, 97], [720, 105, 70, 100], [646, 0, 69, 105], [429, 0, 75, 107], [281, 0, 76, 108], [0, 0, 69, 110], [212, 0, 69, 108], [143, 0, 69, 108]], [[276, 115, 69, 113], [207, 115, 69, 113], [138, 115, 69, 113], [138, 228, 69, 110], [488, 227, 69, 110], [419, 227, 69, 110], [0, 115, 69, 115], [579, 0, 69, 115], [69, 115, 69, 114], [510, 0, 69, 115], [441, 0, 69, 115], [372, 0, 69, 115], [493, 115, 74, 112], [345, 227, 74, 111], [567, 226, 74, 111], [567, 115, 74, 111], [419, 115, 74, 112], [345, 115, 74, 112], [0, 230, 62, 109], [69, 229, 62, 109], [269, 228, 62, 109], [207, 228, 62, 109], [641, 224, 62, 109], [641, 115, 62, 109], [310, 0, 62, 115], [248, 0, 62, 115], [186, 0, 62, 115], [124, 0, 62, 115], [62, 0, 62, 115], [0, 0, 62, 115]], [[304, 216, 69, 98], [381, 215, 69, 100], [77, 112, 69, 104], [70, 216, 74, 98], [0, 215, 70, 101], [233, 109, 69, 105], [309, 108, 72, 108], [387, 0, 74, 108], [0, 0, 77, 113], [309, 0, 78, 108], [234, 0, 75, 109], [77, 0, 73, 112], [0, 113, 74, 102], [224, 214, 80, 102], [381, 108, 82, 107], [146, 214, 78, 103], [150, 109, 83, 105], [150, 0, 84, 109]], [[0, 154, 63, 136], [438, 150, 74, 140], [162, 152, 80, 139], [520, 149, 71, 145], [375, 150, 63, 140], [294, 294, 63, 128], [444, 0, 76, 150], [138, 0, 83, 152], [520, 0, 83, 149], [367, 0, 77, 150], [743, 0, 74, 148], [375, 290, 74, 137], [750, 148, 69, 146], [69, 0, 69, 152], [221, 0, 69, 151], [0, 0, 69, 154], [603, 148, 69, 147], [147, 291, 69, 130], [70, 291, 77, 130], [672, 294, 85, 123], [519, 295, 93, 119], [216, 294, 78, 128], [0, 291, 70, 131], [449, 290, 70, 132], [290, 0, 77, 150], [290, 150, 85, 144], [69, 152, 93, 139], [672, 148, 78, 146], [673, 0, 70, 148], [603, 0, 70, 148]]],
	b = [{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[0, 29, -31, -130, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[0, 28, -31, -121, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[0, 27, -36, -70, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[0, 26, -31, -35, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[0, 25, -31, -33, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[0, 24, -31, -25, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[0, 23, -31, -95, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[0, 22, -31, -109, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[0, 21, -53, -81, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[0, 20, -41, -60, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[0, 19, -32, -69, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[0, 18, -33, -67, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[0, 17, -43, -118, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[0, 16, -33, -127, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[0, 15, -39, -97, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[0, 14, -43, -41, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[0, 13, -34, -34, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[0, 12, -25, -29, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[0, 11, -34, -129, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[0, 10, -32, -127, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[0, 9, -39, -87, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[0, 8, -20, -36, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[0, 7, -22, -39, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[0, 6, -25, -31, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[0, 5, -41, -104, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[0, 4, -32, -119, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[0, 3, -41, -91, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[0, 2, -46, -55, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[0, 1, -45, -54, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[0, 0, -40, -57, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[1, 29, -35, -91, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[1, 28, -31, -93, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[1, 27, -31, -93, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[1, 26, -31, -93, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[1, 25, -31, -93, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[1, 24, -31, -93, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[1, 23, -47, -75, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[1, 22, -44, -85, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[1, 21, -36, -88, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[1, 20, -31, -89, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[1, 19, -31, -89, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[1, 18, -31, -88, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[1, 17, -41, -88, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[1, 16, -37, -95, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[1, 15, -37, -98, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[1, 14, -37, -98, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[1, 13, -37, -98, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[1, 12, -37, -97, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[1, 11, -48, -92, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[1, 10, -34, -96, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[1, 9, -34, -97, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[1, 8, -34, -98, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[1, 7, -34, -98, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[1, 6, -34, -97, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[1, 5, -45, -84, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[1, 4, -49, -89, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[1, 3, -46, -93, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[1, 2, -42, -94, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[1, 1, -40, -94, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[1, 0, -41, -92, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[2, 29, -47, -81, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[2, 28, -35, -116, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[2, 27, -35, -75, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[2, 26, -35, -44, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[2, 25, -34, -41, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[2, 24, -34, -37, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[2, 23, -47, -67, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[2, 22, -35, -100, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[2, 21, -53, -83, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[2, 20, -41, -55, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[2, 19, -35, -54, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[2, 18, -35, -51, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[2, 17, -37, -76, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[2, 16, -32, -123, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[2, 15, -40, -101, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[2, 14, -55, -42, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[2, 13, -49, -34, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[2, 12, -43, -33, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[2, 11, -52, -82, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[2, 10, -35, -124, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[2, 9, -37, -90, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[2, 8, -27, -44, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[2, 7, -32, -45, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[2, 6, -37, -40, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[2, 5, -59, -69, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[2, 4, -35, -113, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[2, 3, -43, -96, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[2, 2, -55, -52, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[2, 1, -57, -48, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[2, 0, -53, -44, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [5, -119, 1, 1],
		fA: [[3, 29, -35, -96, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [5, -119, 1, 1],
		fA: [[3, 28, -35, -94, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [5, -119, 1, 1],
		fA: [[3, 27, -35, -112, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [5, -119, 1, 1],
		fA: [[3, 26, -35, -113, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [5, -119, 1, 1],
		fA: [[3, 25, -35, -103, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [5, -119, 1, 1],
		fA: [[3, 24, -35, -97, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 7, -52, 1, 1],
		fA: [[3, 23, -35, -93, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 7, -52, 1, 1],
		fA: [[3, 22, -35, -91, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 7, -52, 1, 1],
		fA: [[3, 21, -35, -91, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 7, -52, 1, 1],
		fA: [[3, 20, -35, -92, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 7, -52, 1, 1],
		fA: [[3, 19, -35, -90, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 7, -52, 1, 1],
		fA: [[3, 18, -35, -86, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 54, -90, 1, 1],
		fA: [[3, 17, -34, -92, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 54, -90, 1, 1],
		fA: [[3, 16, -34, -93, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 54, -90, 1, 1],
		fA: [[3, 15, -47, -96, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 54, -90, 1, 1],
		fA: [[3, 14, -49, -98, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 54, -90, 1, 1],
		fA: [[3, 13, -47, -96, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 54, -90, 1, 1],
		fA: [[3, 12, -34, -95, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 31, -114, 1, 1],
		fA: [[3, 11, -37, -96, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 31, -114, 1, 1],
		fA: [[3, 10, -37, -93, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 31, -114, 1, 1],
		fA: [[3, 9, -37, -109, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 31, -114, 1, 1],
		fA: [[3, 8, -42, -112, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 31, -114, 1, 1],
		fA: [[3, 7, -43, -104, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 31, -114, 1, 1],
		fA: [[3, 6, -37, -97, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 43, -63, 1, 1],
		fA: [[3, 5, -31, -91, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 43, -63, 1, 1],
		fA: [[3, 4, -31, -92, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 43, -63, 1, 1],
		fA: [[3, 3, -40, -93, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 43, -63, 1, 1],
		fA: [[3, 2, -47, -94, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 43, -63, 1, 1],
		fA: [[3, 1, -50, -93, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 43, -63, 1, 1],
		fA: [[3, 0, -40, -89, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [3, -108, 1, 1],
		fA: [[4, 14, -35, -111, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [3, -108, 1, 1],
		fA: [[4, 13, -35, -93, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [3, -108, 1, 1],
		fA: [[4, 12, -35, -86, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 6, -63, 1, 1],
		fA: [[4, 11, -35, -92, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 6, -63, 1, 1],
		fA: [[4, 10, -35, -91, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 6, -63, 1, 1],
		fA: [[4, 9, -35, -92, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 40, -87, 1, 1],
		fA: [[4, 8, -47, -97, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 40, -87, 1, 1],
		fA: [[4, 7, -34, -92, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 40, -87, 1, 1],
		fA: [[4, 6, -34, -92, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 27, -104, 1, 1],
		fA: [[4, 5, -37, -110, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 27, -104, 1, 1],
		fA: [[4, 4, -37, -92, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 27, -104, 1, 1],
		fA: [[4, 3, -37, -89, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 33, -72, 1, 1],
		fA: [[4, 2, -42, -93, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 33, -72, 1, 1],
		fA: [[4, 1, -31, -91, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 33, -72, 1, 1],
		fA: [[4, 0, -31, -94, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 4, -164, 1, 1],
		fA: [[5, 29, -35, -86, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 4, -164, 1, 1],
		fA: [[5, 28, -35, -143, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 4, -164, 1, 1],
		fA: [[5, 27, -36, -169, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 4, -164, 1, 1],
		fA: [[5, 26, -35, -162, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 4, -164, 1, 1],
		fA: [[5, 25, -35, -129, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 4, -164, 1, 1],
		fA: [[5, 24, -35, -95, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [2, -154, 1, 1],
		fA: [[5, 23, -35, -73, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [2, -154, 1, 1],
		fA: [[5, 22, -35, -129, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [2, -154, 1, 1],
		fA: [[5, 21, -35, -159, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [2, -154, 1, 1],
		fA: [[5, 20, -35, -131, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [2, -154, 1, 1],
		fA: [[5, 19, -35, -87, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [2, -154, 1, 1],
		fA: [[5, 18, -35, -83, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 9, -157, 1, 1],
		fA: [[5, 17, -34, -77, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 9, -157, 1, 1],
		fA: [[5, 16, -34, -136, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 9, -157, 1, 1],
		fA: [[5, 15, -34, -162, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 9, -157, 1, 1],
		fA: [[5, 14, -34, -146, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 9, -157, 1, 1],
		fA: [[5, 13, -63, -103, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 9, -157, 1, 1],
		fA: [[5, 12, -34, -90, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 9, -161, 1, 1],
		fA: [[5, 11, -37, -83, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 9, -161, 1, 1],
		fA: [[5, 10, -37, -141, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 9, -161, 1, 1],
		fA: [[5, 9, -37, -166, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 9, -161, 1, 1],
		fA: [[5, 8, -39, -157, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 9, -161, 1, 1],
		fA: [[5, 7, -57, -122, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 9, -161, 1, 1],
		fA: [[5, 6, -41, -95, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 5, -156, 1, 1],
		fA: [[5, 5, -31, -72, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 5, -156, 1, 1],
		fA: [[5, 4, -31, -131, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 5, -156, 1, 1],
		fA: [[5, 3, -31, -159, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 5, -156, 1, 1],
		fA: [[5, 2, -31, -135, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 5, -156, 1, 1],
		fA: [[5, 1, -44, -85, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 5, -156, 1, 1],
		fA: [[5, 0, -37, -89, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [4, -126, 1, 1],
		fA: [[6, 29, -35, -100, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [4, -126, 1, 1],
		fA: [[6, 28, -35, -105, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [4, -126, 1, 1],
		fA: [[6, 27, -35, -122, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [4, -126, 1, 1],
		fA: [[6, 26, -35, -142, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [4, -126, 1, 1],
		fA: [[6, 25, -35, -122, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [4, -126, 1, 1],
		fA: [[6, 24, -35, -92, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 6, -152, 1, 1],
		fA: [[6, 23, -35, -92, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 6, -152, 1, 1],
		fA: [[6, 22, -35, -99, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 6, -152, 1, 1],
		fA: [[6, 21, -35, -147, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 6, -152, 1, 1],
		fA: [[6, 20, -35, -123, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 6, -152, 1, 1],
		fA: [[6, 19, -35, -113, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 6, -152, 1, 1],
		fA: [[6, 18, -35, -92, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [13, -138, 1, 1],
		fA: [[6, 17, -36, -94, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [13, -138, 1, 1],
		fA: [[6, 16, -36, -97, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [13, -138, 1, 1],
		fA: [[6, 15, -34, -137, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [13, -138, 1, 1],
		fA: [[6, 14, -34, -127, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [13, -138, 1, 1],
		fA: [[6, 13, -34, -122, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [13, -138, 1, 1],
		fA: [[6, 12, -34, -100, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [16, -132, 1, 1],
		fA: [[6, 11, -31, -99, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [16, -132, 1, 1],
		fA: [[6, 10, -31, -104, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [16, -132, 1, 1],
		fA: [[6, 9, -31, -127, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [16, -132, 1, 1],
		fA: [[6, 8, -31, -136, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [16, -132, 1, 1],
		fA: [[6, 7, -31, -124, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [16, -132, 1, 1],
		fA: [[6, 6, -31, -100, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [10, -149, 1, 1],
		fA: [[6, 5, -37, -94, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [10, -149, 1, 1],
		fA: [[6, 4, -37, -100, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [10, -149, 1, 1],
		fA: [[6, 3, -37, -145, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [10, -149, 1, 1],
		fA: [[6, 2, -37, -123, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [10, -149, 1, 1],
		fA: [[6, 1, -37, -117, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [10, -149, 1, 1],
		fA: [[6, 0, -37, -96, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[7, 29, -31, -90, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[7, 28, -31, -90, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[7, 27, -31, -90, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[7, 26, -31, -90, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[7, 25, -31, -90, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[7, 24, -31, -90, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[7, 23, -38, -83, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[7, 22, -37, -82, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[7, 21, -37, -82, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[7, 20, -37, -82, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[7, 19, -37, -82, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[7, 18, -37, -85, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[7, 17, -40, -90, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[7, 16, -38, -90, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[7, 15, -37, -90, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[7, 14, -37, -90, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[7, 13, -37, -90, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[7, 12, -38, -90, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[7, 11, -34, -91, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[7, 10, -34, -90, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[7, 9, -34, -90, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[7, 8, -34, -90, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[7, 7, -34, -90, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[7, 6, -34, -90, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[7, 5, -34, -89, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[7, 4, -34, -87, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[7, 3, -34, -86, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[7, 2, -34, -86, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[7, 1, -34, -87, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[7, 0, -34, -89, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[8, 29, -38, -94, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[8, 28, -31, -89, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[8, 27, -31, -90, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[8, 26, -31, -94, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[8, 25, -31, -89, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[8, 24, -34, -89, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[8, 23, -31, -84, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[8, 22, -31, -81, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[8, 21, -31, -78, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[8, 20, -31, -85, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[8, 19, -31, -81, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[8, 18, -31, -78, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[8, 17, -37, -90, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[8, 16, -37, -86, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[8, 15, -41, -87, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[8, 14, -42, -91, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[8, 13, -37, -87, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[8, 12, -37, -85, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[8, 11, -34, -93, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[8, 10, -34, -89, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[8, 9, -38, -90, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[8, 8, -34, -93, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[8, 7, -34, -88, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[8, 6, -34, -88, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[8, 5, -37, -84, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[8, 4, -40, -82, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[8, 3, -43, -80, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[8, 2, -42, -86, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[8, 1, -38, -83, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[8, 0, -37, -79, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 3, -159, 1, 1],
		fA: [[9, 24, -37, -95, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 3, -159, 1, 1],
		fA: [[9, 23, -37, -89, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 3, -159, 1, 1],
		fA: [[9, 22, -37, -89, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 3, -159, 1, 1],
		fA: [[9, 21, -37, -143, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 3, -159, 1, 1],
		fA: [[9, 20, -44, -164, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [1, -140, 1, 1],
		fA: [[9, 19, -37, -83, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [1, -140, 1, 1],
		fA: [[9, 18, -37, -111, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [1, -140, 1, 1],
		fA: [[9, 17, -37, -108, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [1, -140, 1, 1],
		fA: [[9, 16, -37, -158, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [1, -140, 1, 1],
		fA: [[9, 15, -30, -143, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 19, -148, 1, 1],
		fA: [[9, 14, -45, -92, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 19, -148, 1, 1],
		fA: [[9, 13, -21, -101, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 19, -148, 1, 1],
		fA: [[9, 12, -21, -102, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 19, -148, 1, 1],
		fA: [[9, 11, -41, -156, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 19, -148, 1, 1],
		fA: [[9, 10, -63, -152, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 15, -155, 1, 1],
		fA: [[9, 9, -34, -95, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 15, -155, 1, 1],
		fA: [[9, 8, -27, -92, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 15, -155, 1, 1],
		fA: [[9, 7, -27, -95, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 15, -155, 1, 1],
		fA: [[9, 6, -41, -149, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 15, -155, 1, 1],
		fA: [[9, 5, -62, -160, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 12, -142, 1, 1],
		fA: [[9, 4, -38, -86, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 12, -142, 1, 1],
		fA: [[9, 3, -27, -110, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 12, -142, 1, 1],
		fA: [[9, 2, -27, -106, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 12, -142, 1, 1],
		fA: [[9, 1, -42, -160, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 12, -142, 1, 1],
		fA: [[9, 0, -52, -146, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 4, -161, 1, 1],
		fA: [[13, 29, -37, -86, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 4, -161, 1, 1],
		fA: [[13, 28, -37, -132, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 4, -161, 1, 1],
		fA: [[13, 27, -37, -131, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 4, -161, 1, 1],
		fA: [[13, 26, -37, -136, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 4, -161, 1, 1],
		fA: [[13, 25, -37, -158, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 4, -161, 1, 1],
		fA: [[13, 24, -38, -169, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [2, -113, 1, 1],
		fA: [[13, 23, -37, -66, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [2, -113, 1, 1],
		fA: [[13, 22, -37, -93, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [2, -113, 1, 1],
		fA: [[13, 21, -37, -137, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [2, -113, 1, 1],
		fA: [[13, 20, -37, -147, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [2, -113, 1, 1],
		fA: [[13, 19, -37, -158, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [2, -113, 1, 1],
		fA: [[13, 18, -37, -120, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 52, -138, 1, 1],
		fA: [[13, 17, -54, -78, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 52, -138, 1, 1],
		fA: [[13, 16, -46, -108, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 52, -138, 1, 1],
		fA: [[13, 15, -31, -134, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 52, -138, 1, 1],
		fA: [[13, 14, -31, -140, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 52, -138, 1, 1],
		fA: [[13, 13, -31, -159, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 52, -138, 1, 1],
		fA: [[13, 12, -60, -146, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 39, -158, 1, 1],
		fA: [[13, 11, -47, -85, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 39, -158, 1, 1],
		fA: [[13, 10, -43, -124, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 39, -158, 1, 1],
		fA: [[13, 9, -34, -131, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 39, -158, 1, 1],
		fA: [[13, 8, -34, -139, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 39, -158, 1, 1],
		fA: [[13, 7, -34, -158, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 39, -158, 1, 1],
		fA: [[13, 6, -51, -165, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 36, -120, 1, 1],
		fA: [[13, 5, -35, -69, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 36, -120, 1, 1],
		fA: [[13, 4, -35, -95, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 36, -120, 1, 1],
		fA: [[13, 3, -34, -135, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 36, -120, 1, 1],
		fA: [[13, 2, -34, -145, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 36, -120, 1, 1],
		fA: [[13, 1, -34, -159, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 36, -120, 1, 1],
		fA: [[13, 0, -43, -127, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [7, -131, 1, 1],
		fA: [[10, 24, -33, -82, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [7, -131, 1, 1],
		fA: [[10, 23, -33, -130, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [7, -131, 1, 1],
		fA: [[10, 22, -37, -113, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [7, -131, 1, 1],
		fA: [[10, 21, -33, -127, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [7, -131, 1, 1],
		fA: [[10, 20, -33, -141, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 8, -120, 1, 1],
		fA: [[10, 19, -36, -68, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 8, -120, 1, 1],
		fA: [[10, 18, -36, -126, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 8, -120, 1, 1],
		fA: [[10, 17, -36, -144, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 8, -120, 1, 1],
		fA: [[10, 16, -36, -159, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 8, -120, 1, 1],
		fA: [[10, 15, -36, -131, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 11, -130, 1, 1],
		fA: [[10, 14, -34, -74, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 11, -130, 1, 1],
		fA: [[10, 13, -33, -128, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 11, -130, 1, 1],
		fA: [[10, 12, -28, -126, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 11, -130, 1, 1],
		fA: [[10, 11, -19, -135, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 11, -130, 1, 1],
		fA: [[10, 10, -46, -141, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 3, -133, 1, 1],
		fA: [[10, 9, -35, -80, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 3, -133, 1, 1],
		fA: [[10, 8, -35, -129, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 3, -133, 1, 1],
		fA: [[10, 7, -31, -115, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 3, -133, 1, 1],
		fA: [[10, 6, -25, -130, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 3, -133, 1, 1],
		fA: [[10, 5, -24, -143, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 14, -125, 1, 1],
		fA: [[10, 4, -31, -70, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 14, -125, 1, 1],
		fA: [[10, 3, -31, -126, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 14, -125, 1, 1],
		fA: [[10, 2, -27, -139, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 14, -125, 1, 1],
		fA: [[10, 1, -21, -149, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 14, -125, 1, 1],
		fA: [[10, 0, -44, -136, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[11, 29, -34, -92, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[11, 28, -31, -88, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[11, 27, -31, -89, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[11, 26, -31, -94, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[11, 25, -31, -89, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[11, 24, -31, -86, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[11, 23, -31, -84, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[11, 22, -31, -80, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[11, 21, -31, -78, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[11, 20, -31, -84, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[11, 19, -31, -82, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[11, 18, -31, -75, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[11, 17, -40, -89, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[11, 16, -37, -86, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[11, 15, -42, -85, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[11, 14, -45, -88, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[11, 13, -37, -87, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[11, 12, -37, -82, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[11, 11, -34, -92, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[11, 10, -34, -88, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[11, 9, -39, -88, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[11, 8, -34, -91, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[11, 7, -34, -88, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[11, 6, -34, -85, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[11, 5, -34, -84, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[11, 4, -34, -83, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[11, 3, -34, -80, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[11, 2, -36, -86, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[11, 1, -34, -84, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[11, 0, -35, -76, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[12, 29, -35, -89, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[12, 28, -34, -107, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[12, 27, -34, -106, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[12, 26, -35, -100, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[12, 25, -35, -100, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[12, 24, -35, -93, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[12, 23, -57, -77, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[12, 22, -49, -67, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[12, 21, -40, -59, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[12, 20, -35, -64, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[12, 19, -43, -66, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[12, 18, -56, -74, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[12, 17, -34, -91, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[12, 16, -100, -93, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[12, 15, -102, -88, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[12, 14, -84, -87, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[12, 13, -76, -88, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[12, 12, -50, -91, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[12, 11, -37, -92, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[12, 10, -62, -105, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[12, 9, -63, -103, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[12, 8, -63, -98, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[12, 7, -61, -98, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[12, 6, -48, -95, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[12, 5, -55, -83, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[12, 4, -82, -80, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[12, 3, -98, -74, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[12, 2, -77, -77, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[12, 1, -55, -80, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[12, 0, -50, -81, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 9, -158, 1, 1],
		fA: [[5, 17, -34, -77, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 9, -158, 1, 1],
		fA: [[5, 16, -34, -136, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 9, -158, 1, 1],
		fA: [[5, 15, -34, -162, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [7, -141, 1, 1],
		fA: [[14, 24, -37, -146, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [7, -141, 1, 1],
		fA: [[14, 23, -37, -132, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [7, -141, 1, 1],
		fA: [[14, 22, -37, -105, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [7, -141, 1, 1],
		fA: [[14, 21, -37, -87, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [7, -141, 1, 1],
		fA: [[14, 20, -37, -84, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 8, -143, 1, 1],
		fA: [[14, 19, -37, -149, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 8, -143, 1, 1],
		fA: [[14, 18, -37, -111, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 8, -143, 1, 1],
		fA: [[14, 17, -37, -86, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 8, -143, 1, 1],
		fA: [[14, 16, -37, -73, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 8, -143, 1, 1],
		fA: [[14, 15, -37, -71, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [1, -147, 1, 1],
		fA: [[14, 14, -31, -152, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [1, -147, 1, 1],
		fA: [[14, 13, -31, -120, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [1, -147, 1, 1],
		fA: [[14, 12, -33, -91, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [1, -147, 1, 1],
		fA: [[14, 11, -43, -80, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [1, -147, 1, 1],
		fA: [[14, 10, -33, -76, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [6, -144, 1, 1],
		fA: [[14, 9, -34, -149, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [6, -144, 1, 1],
		fA: [[14, 8, -34, -129, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [6, -144, 1, 1],
		fA: [[14, 7, -34, -101, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [6, -144, 1, 1],
		fA: [[14, 6, -40, -85, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [6, -144, 1, 1],
		fA: [[14, 5, -34, -81, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 6, -145, 1, 1],
		fA: [[14, 4, -34, -151, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 6, -145, 1, 1],
		fA: [[14, 3, -34, -115, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 6, -145, 1, 1],
		fA: [[14, 2, -34, -87, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 6, -145, 1, 1],
		fA: [[14, 1, -34, -74, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 6, -145, 1, 1],
		fA: [[14, 0, -34, -71, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [26, -164, 1, 1],
		fA: [[15, 29, -35, -93, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [26, -164, 1, 1],
		fA: [[15, 28, -35, -96, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [26, -164, 1, 1],
		fA: [[15, 27, -35, -111, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [26, -164, 1, 1],
		fA: [[15, 26, -35, -156, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [26, -164, 1, 1],
		fA: [[15, 25, -35, -160, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [26, -164, 1, 1],
		fA: [[15, 24, -35, -129, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 27, -153, 1, 1],
		fA: [[15, 23, -35, -86, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 27, -153, 1, 1],
		fA: [[15, 22, -35, -79, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 27, -153, 1, 1],
		fA: [[15, 21, -35, -80, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 27, -153, 1, 1],
		fA: [[15, 20, -35, -148, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 27, -153, 1, 1],
		fA: [[15, 19, -35, -129, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 27, -153, 1, 1],
		fA: [[15, 18, -35, -90, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 17, -167, 1, 1],
		fA: [[15, 17, -34, -93, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 17, -167, 1, 1],
		fA: [[15, 16, -41, -91, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 17, -167, 1, 1],
		fA: [[15, 15, -41, -90, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 17, -167, 1, 1],
		fA: [[15, 14, -34, -166, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 17, -167, 1, 1],
		fA: [[15, 13, -34, -161, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 17, -167, 1, 1],
		fA: [[15, 12, -40, -119, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [5, -169, 1, 1],
		fA: [[15, 11, -37, -94, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [5, -169, 1, 1],
		fA: [[15, 10, -37, -96, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [5, -169, 1, 1],
		fA: [[15, 9, -37, -103, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [5, -169, 1, 1],
		fA: [[15, 8, -37, -165, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [5, -169, 1, 1],
		fA: [[15, 7, -37, -167, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [5, -169, 1, 1],
		fA: [[15, 6, -37, -130, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 37, -160, 1, 1],
		fA: [[15, 5, -31, -89, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 37, -160, 1, 1],
		fA: [[15, 4, -32, -84, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 37, -160, 1, 1],
		fA: [[15, 3, -31, -81, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 37, -160, 1, 1],
		fA: [[15, 2, -32, -159, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 37, -160, 1, 1],
		fA: [[15, 1, -47, -144, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 37, -160, 1, 1],
		fA: [[15, 0, -44, -102, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [7, -144, 1, 1],
		fA: [[16, 29, -35, -93, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [7, -144, 1, 1],
		fA: [[16, 28, -35, -113, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [7, -144, 1, 1],
		fA: [[16, 27, -35, -122, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [7, -144, 1, 1],
		fA: [[16, 26, -35, -137, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [7, -144, 1, 1],
		fA: [[16, 25, -35, -119, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [7, -144, 1, 1],
		fA: [[16, 24, -35, -95, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -137, 1, 1],
		fA: [[16, 23, -35, -95, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -137, 1, 1],
		fA: [[16, 22, -35, -85, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -137, 1, 1],
		fA: [[16, 21, -35, -114, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -137, 1, 1],
		fA: [[16, 20, -35, -133, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -137, 1, 1],
		fA: [[16, 19, -35, -93, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -137, 1, 1],
		fA: [[16, 18, -35, -90, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 13, -142, 1, 1],
		fA: [[16, 17, -34, -93, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 13, -142, 1, 1],
		fA: [[16, 16, -49, -93, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 13, -142, 1, 1],
		fA: [[16, 15, -34, -116, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 13, -142, 1, 1],
		fA: [[16, 14, -34, -139, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 13, -142, 1, 1],
		fA: [[16, 13, -55, -101, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 13, -142, 1, 1],
		fA: [[16, 12, -34, -92, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 4, -145, 1, 1],
		fA: [[16, 11, -37, -94, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 4, -145, 1, 1],
		fA: [[16, 10, -45, -107, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 4, -145, 1, 1],
		fA: [[16, 9, -37, -119, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 4, -145, 1, 1],
		fA: [[16, 8, -37, -139, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 4, -145, 1, 1],
		fA: [[16, 7, -37, -117, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 4, -145, 1, 1],
		fA: [[16, 6, -44, -95, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 19, -138, 1, 1],
		fA: [[16, 5, -31, -91, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 19, -138, 1, 1],
		fA: [[16, 4, -37, -85, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 19, -138, 1, 1],
		fA: [[16, 3, -31, -114, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 19, -138, 1, 1],
		fA: [[16, 2, -31, -136, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 19, -138, 1, 1],
		fA: [[16, 1, -50, -93, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 19, -138, 1, 1],
		fA: [[16, 0, -38, -89, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 2, -169, 1, 1],
		fA: [[17, 29, -31, -86, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 2, -169, 1, 1],
		fA: [[17, 28, -31, -137, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 2, -169, 1, 1],
		fA: [[17, 27, -31, -150, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 2, -169, 1, 1],
		fA: [[17, 26, -31, -142, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 2, -169, 1, 1],
		fA: [[17, 25, -31, -165, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 2, -169, 1, 1],
		fA: [[17, 24, -31, -119, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [0, -165, 1, 1],
		fA: [[17, 23, -31, -71, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [0, -165, 1, 1],
		fA: [[17, 22, -31, -99, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [0, -165, 1, 1],
		fA: [[17, 21, -31, -154, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [0, -165, 1, 1],
		fA: [[17, 20, -31, -160, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [0, -165, 1, 1],
		fA: [[17, 19, -31, -140, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [0, -165, 1, 1],
		fA: [[17, 18, -31, -93, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 2, -160, 1, 1],
		fA: [[17, 17, -38, -80, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 2, -160, 1, 1],
		fA: [[17, 16, -45, -116, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 2, -160, 1, 1],
		fA: [[17, 15, -37, -150, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 2, -160, 1, 1],
		fA: [[17, 14, -37, -149, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 2, -160, 1, 1],
		fA: [[17, 13, -37, -154, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 2, -160, 1, 1],
		fA: [[17, 12, -49, -99, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 9, -158, 1, 1],
		fA: [[17, 11, -34, -85, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 9, -158, 1, 1],
		fA: [[17, 10, -38, -130, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 9, -158, 1, 1],
		fA: [[17, 9, -34, -150, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 9, -158, 1, 1],
		fA: [[17, 8, -34, -144, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 9, -158, 1, 1],
		fA: [[17, 7, -34, -162, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 9, -158, 1, 1],
		fA: [[17, 6, -37, -115, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 7, -163, 1, 1],
		fA: [[17, 5, -34, -73, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 7, -163, 1, 1],
		fA: [[17, 4, -34, -103, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 7, -163, 1, 1],
		fA: [[17, 3, -34, -152, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 7, -163, 1, 1],
		fA: [[17, 2, -34, -156, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 7, -163, 1, 1],
		fA: [[17, 1, -34, -145, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 7, -163, 1, 1],
		fA: [[17, 0, -42, -89, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[18, 29, -31, -82, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[18, 28, -46, -99, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[18, 27, -49, -124, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[18, 26, -40, -137, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[18, 25, -39, -138, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[18, 24, -37, -132, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[18, 23, -36, -79, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[18, 22, -31, -91, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[18, 21, -31, -113, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[18, 20, -31, -132, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[18, 19, -31, -140, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[18, 18, -31, -132, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[18, 17, -37, -84, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[18, 16, -37, -104, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[18, 15, -37, -127, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[18, 14, -37, -142, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[18, 13, -37, -145, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[18, 12, -37, -140, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[18, 11, -36, -83, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[18, 10, -40, -106, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[18, 9, -41, -128, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[18, 8, -36, -141, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[18, 7, -36, -142, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[18, 6, -36, -138, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[18, 5, -40, -81, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[18, 4, -34, -93, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[18, 3, -34, -121, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[18, 2, -34, -138, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[18, 1, -34, -144, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[18, 0, -34, -137, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[19, 29, -34, -78, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[19, 28, -26, -79, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[19, 27, -29, -86, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[19, 26, -41, -92, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[19, 25, -46, -97, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[19, 24, -21, -104, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[19, 23, -35, -93, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[19, 22, -43, -90, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[19, 21, -40, -94, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[19, 20, -35, -85, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[19, 19, -29, -72, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[19, 18, -48, -47, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[19, 17, -13, -85, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[19, 16, -16, -90, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[19, 15, -26, -91, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[19, 14, -38, -83, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[19, 13, -51, -76, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[19, 12, -76, -82, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[19, 11, -21, -80, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[19, 10, -24, -84, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[19, 9, -25, -90, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[19, 8, -39, -86, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[19, 7, -52, -89, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[19, 6, -57, -98, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[19, 5, -16, -91, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[19, 4, -25, -92, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[19, 3, -36, -95, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[19, 2, -34, -83, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[19, 1, -39, -70, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[19, 0, -71, -59, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[20, 29, -31, -95, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[20, 28, -31, -95, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[20, 27, -31, -95, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[20, 26, -31, -95, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[20, 25, -31, -95, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[20, 24, -31, -95, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[20, 23, -31, -90, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[20, 22, -31, -90, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[20, 21, -31, -90, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[20, 20, -31, -90, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[20, 19, -31, -90, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[20, 18, -31, -90, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[20, 17, -37, -96, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[20, 16, -37, -96, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[20, 15, -37, -95, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[20, 14, -37, -95, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[20, 13, -37, -95, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[20, 12, -37, -96, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[20, 10, -34, -97, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[20, 9, -34, -97, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[20, 8, -34, -96, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[20, 7, -34, -97, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[20, 6, -34, -97, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[20, 5, -34, -92, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[20, 4, -34, -92, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[20, 3, -34, -92, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[20, 2, -34, -95, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[20, 1, -34, -95, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[20, 0, -34, -95, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[22, 29, -35, -130, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[22, 28, -35, -130, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[22, 27, -36, -128, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[22, 26, -45, -121, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[22, 25, -47, -126, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[22, 24, -42, -132, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[22, 23, -35, -114, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[22, 22, -35, -113, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[22, 21, -42, -110, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[22, 20, -48, -101, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[22, 19, -38, -105, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[22, 18, -35, -112, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[22, 17, -34, -112, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[22, 16, -34, -129, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[22, 15, -34, -136, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[22, 14, -34, -133, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[22, 13, -34, -134, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[22, 12, -34, -128, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[22, 11, -37, -121, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[22, 10, -37, -132, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[22, 9, -40, -134, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[22, 8, -46, -133, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[22, 7, -46, -136, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[22, 6, -39, -134, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[22, 5, -31, -109, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[22, 4, -31, -121, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[22, 3, -39, -126, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[22, 2, -48, -120, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[22, 1, -42, -121, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[22, 0, -31, -117, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[21, 17, -47, -93, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[21, 16, -46, -89, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[21, 15, -37, -87, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[21, 14, -40, -91, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[21, 13, -43, -86, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[21, 12, -37, -86, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[21, 11, -35, -94, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[21, 10, -35, -91, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[21, 9, -35, -90, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[21, 8, -35, -95, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[21, 7, -36, -90, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[21, 6, -35, -90, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[21, 5, -35, -87, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[21, 4, -36, -83, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[21, 3, -35, -80, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[21, 2, -35, -86, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[21, 1, -35, -82, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[21, 0, -35, -80, 0]]
	}],
	c = [{
		loop: !1,
		frames: [[0, 0, 0, 0], [1, 0, 0, 0], [2, 0, 0, 0], [3, 0, 0, 0], [4, 0, 0, 0], [5, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[6, 0, 0, 0], [7, 0, 0, 0], [8, 0, 0, 0], [9, 0, 0, 0], [10, 0, 0, 0], [11, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[12, 0, 0, 0], [13, 0, 0, 0], [14, 0, 0, 0], [15, 0, 0, 0], [16, 0, 0, 0], [17, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[18, 0, 0, 0], [19, 0, 0, 0], [20, 0, 0, 0], [21, 0, 0, 0], [22, 0, 0, 0], [23, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[24, 0, 0, 0], [25, 0, 0, 0], [26, 0, 0, 0], [27, 0, 0, 0], [28, 0, 0, 0], [29, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[30, 0, 0, 0], [31, 0, 0, 0], [32, 0, 0, 0], [33, 0, 0, 0], [34, 0, 0, 0], [35, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[36, 0, 0, 0], [37, 0, 0, 0], [38, 0, 0, 0], [39, 0, 0, 0], [40, 0, 0, 0], [41, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[42, 0, 0, 0], [43, 0, 0, 0], [44, 0, 0, 0], [45, 0, 0, 0], [46, 0, 0, 0], [47, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[48, 0, 0, 0], [49, 0, 0, 0], [50, 0, 0, 0], [51, 0, 0, 0], [52, 0, 0, 0], [53, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[54, 0, 0, 0], [55, 0, 0, 0], [56, 0, 0, 0], [57, 0, 0, 0], [58, 0, 0, 0], [59, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[60, 0, 0, 0], [61, 0, 0, 0], [62, 0, 0, 0], [63, 0, 0, 0], [64, 0, 0, 0], [65, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[66, 0, 0, 0], [67, 0, 0, 0], [68, 0, 0, 0], [69, 0, 0, 0], [70, 0, 0, 0], [71, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[72, 0, 0, 0], [73, 0, 0, 0], [74, 0, 0, 0], [75, 0, 0, 0], [76, 0, 0, 0], [77, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[78, 0, 0, 0], [79, 0, 0, 0], [80, 0, 0, 0], [81, 0, 0, 0], [82, 0, 0, 0], [83, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[84, 0, 0, 0], [85, 0, 0, 0], [86, 0, 0, 0], [87, 0, 0, 0], [88, 0, 0, 0], [89, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[90, 0, 0, 0], [91, 0, 0, 0], [92, 0, 0, 0], [93, 0, 0, 0], [94, 0, 0, 0], [95, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[96, 0, 0, 0], [97, 0, 0, 0], [98, 0, 0, 0], [99, 0, 0, 0], [100, 0, 0, 0], [101, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[102, 0, 0, 0], [103, 0, 0, 0], [104, 0, 0, 0], [105, 0, 0, 0], [106, 0, 0, 0], [107, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[108, 0, 0, 0], [109, 0, 0, 0], [110, 0, 0, 0], [111, 0, 0, 0], [112, 0, 0, 0], [113, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[114, 0, 0, 0], [115, 0, 0, 0], [116, 0, 0, 0], [117, 0, 0, 0], [118, 0, 0, 0], [119, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[120, 0, 0, 0], [121, 0, 0, 0], [122, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[123, 0, 0, 0], [124, 0, 0, 0], [125, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[126, 0, 0, 0], [127, 0, 0, 0], [128, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[129, 0, 0, 0], [130, 0, 0, 0], [131, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[132, 0, 0, 0], [133, 0, 0, 0], [134, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[135, 0, 0, 0], [136, 0, 0, 0], [137, 0, 0, 0], [138, 0, 0, 0], [139, 0, 0, 0], [140, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[141, 0, 0, 0], [142, 0, 0, 0], [143, 0, 0, 0], [144, 0, 0, 0], [145, 0, 0, 0], [146, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[147, 0, 0, 0], [148, 0, 0, 0], [149, 0, 0, 0], [150, 0, 0, 0], [151, 0, 0, 0], [152, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[153, 0, 0, 0], [154, 0, 0, 0], [155, 0, 0, 0], [156, 0, 0, 0], [157, 0, 0, 0], [158, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[159, 0, 0, 0], [160, 0, 0, 0], [161, 0, 0, 0], [162, 0, 0, 0], [163, 0, 0, 0], [164, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[165, 0, 0, 0], [166, 0, 0, 0], [167, 0, 0, 0], [168, 0, 0, 0], [169, 0, 0, 0], [170, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[171, 0, 0, 0], [172, 0, 0, 0], [173, 0, 0, 0], [174, 0, 0, 0], [175, 0, 0, 0], [176, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[177, 0, 0, 0], [178, 0, 0, 0], [179, 0, 0, 0], [180, 0, 0, 0], [181, 0, 0, 0], [182, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[183, 0, 0, 0], [184, 0, 0, 0], [185, 0, 0, 0], [186, 0, 0, 0], [187, 0, 0, 0], [188, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[189, 0, 0, 0], [190, 0, 0, 0], [191, 0, 0, 0], [192, 0, 0, 0], [193, 0, 0, 0], [194, 0, 0, 0]]
	},
	{
		loop: !0,
		frames: [[195, 0, 0, 0], [196, 0, 0, 0], [197, 0, 0, 0], [198, 0, 0, 0], [199, 0, 0, 0], [200, 0, 0, 0]]
	},
	{
		loop: !0,
		frames: [[201, 0, 0, 0], [202, 0, 0, 0], [203, 0, 0, 0], [204, 0, 0, 0], [205, 0, 0, 0], [206, 0, 0, 0]]
	},
	{
		loop: !0,
		frames: [[207, 0, 0, 0], [208, 0, 0, 0], [209, 0, 0, 0], [210, 0, 0, 0], [211, 0, 0, 0], [212, 0, 0, 0]]
	},
	{
		loop: !0,
		frames: [[213, 0, 0, 0], [214, 0, 0, 0], [215, 0, 0, 0], [216, 0, 0, 0], [217, 0, 0, 0], [218, 0, 0, 0]]
	},
	{
		loop: !0,
		frames: [[219, 0, 0, 0], [220, 0, 0, 0], [221, 0, 0, 0], [222, 0, 0, 0], [223, 0, 0, 0], [224, 0, 0, 0]]
	},
	{
		loop: !0,
		frames: [[225, 0, 0, 0], [226, 0, 0, 0], [227, 0, 0, 0], [228, 0, 0, 0], [229, 0, 0, 0], [230, 0, 0, 0]]
	},
	{
		loop: !0,
		frames: [[231, 0, 0, 0], [232, 0, 0, 0], [233, 0, 0, 0], [234, 0, 0, 0], [235, 0, 0, 0], [236, 0, 0, 0]]
	},
	{
		loop: !0,
		frames: [[237, 0, 0, 0], [238, 0, 0, 0], [239, 0, 0, 0], [240, 0, 0, 0], [241, 0, 0, 0], [242, 0, 0, 0]]
	},
	{
		loop: !0,
		frames: [[243, 0, 0, 0], [244, 0, 0, 0], [245, 0, 0, 0], [246, 0, 0, 0], [247, 0, 0, 0], [248, 0, 0, 0]]
	},
	{
		loop: !0,
		frames: [[249, 0, 0, 0], [250, 0, 0, 0], [251, 0, 0, 0], [252, 0, 0, 0], [253, 0, 0, 0], [254, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[255, 0, 0, 0], [256, 0, 0, 0], [257, 0, 0, 0], [258, 0, 0, 0], [259, 0, 0, 9]]
	},
	{
		loop: !1,
		frames: [[260, 0, 0, 0], [261, 0, 0, 0], [262, 0, 0, 0], [263, 0, 0, 0], [264, 0, 0, 9]]
	},
	{
		loop: !1,
		frames: [[265, 0, 0, 0], [266, 0, 0, 0], [267, 0, 0, 0], [268, 0, 0, 0], [269, 0, 0, 9]]
	},
	{
		loop: !1,
		frames: [[270, 0, 0, 0], [271, 0, 0, 0], [272, 0, 0, 0], [273, 0, 0, 0], [274, 0, 0, 9]]
	},
	{
		loop: !1,
		frames: [[275, 0, 0, 0], [276, 0, 0, 0], [277, 0, 0, 0], [278, 0, 0, 0], [279, 0, 0, 9]]
	},
	{
		loop: !1,
		frames: [[280, 0, 0, 0], [281, 0, 0, 0], [282, 0, 0, 0], [283, 0, 0, 0], [284, 0, 0, 0], [285, 0, 0, 9]]
	},
	{
		loop: !1,
		frames: [[286, 0, 0, 0], [287, 0, 0, 0], [288, 0, 0, 0], [289, 0, 0, 0], [290, 0, 0, 0], [291, 0, 0, 9]]
	},
	{
		loop: !1,
		frames: [[292, 0, 0, 0], [293, 0, 0, 0], [294, 0, 0, 0], [295, 0, 0, 0], [296, 0, 0, 0], [297, 0, 0, 9]]
	},
	{
		loop: !1,
		frames: [[298, 0, 0, 0], [299, 0, 0, 0], [300, 0, 0, 0], [301, 0, 0, 0], [302, 0, 0, 0], [303, 0, 0, 9]]
	},
	{
		loop: !1,
		frames: [[304, 0, 0, 0], [305, 0, 0, 0], [306, 0, 0, 0], [307, 0, 0, 0], [308, 0, 0, 0], [309, 0, 0, 9]]
	},
	{
		loop: !1,
		frames: [[310, 0, 0, 0], [311, 0, 0, 0], [312, 0, 0, 0], [313, 0, 0, 0], [314, 0, 0, 9]]
	},
	{
		loop: !1,
		frames: [[315, 0, 0, 0], [316, 0, 0, 0], [317, 0, 0, 0], [318, 0, 0, 0], [319, 0, 0, 9]]
	},
	{
		loop: !1,
		frames: [[320, 0, 0, 0], [321, 0, 0, 0], [322, 0, 0, 0], [323, 0, 0, 0], [324, 0, 0, 9]]
	},
	{
		loop: !1,
		frames: [[325, 0, 0, 0], [326, 0, 0, 0], [327, 0, 0, 0], [328, 0, 0, 0], [329, 0, 0, 9]]
	},
	{
		loop: !1,
		frames: [[330, 0, 0, 0], [331, 0, 0, 0], [332, 0, 0, 0], [333, 0, 0, 0], [334, 0, 0, 9]]
	},
	{
		loop: !0,
		frames: [[335, 0, 0, 0], [336, 0, 0, 0], [337, 0, 0, 0], [338, 0, 0, 0], [339, 0, 0, 0], [340, 0, 0, 0]]
	},
	{
		loop: !0,
		frames: [[341, 0, 0, 0], [342, 0, 0, 0], [343, 0, 0, 0], [344, 0, 0, 0], [345, 0, 0, 0], [346, 0, 0, 0]]
	},
	{
		loop: !0,
		frames: [[347, 0, 0, 0], [348, 0, 0, 0], [349, 0, 0, 0], [350, 0, 0, 0], [351, 0, 0, 0], [352, 0, 0, 0]]
	},
	{
		loop: !0,
		frames: [[353, 0, 0, 0], [354, 0, 0, 0], [355, 0, 0, 0], [356, 0, 0, 0], [357, 0, 0, 0], [358, 0, 0, 0]]
	},
	{
		loop: !0,
		frames: [[359, 0, 0, 0], [360, 0, 0, 0], [361, 0, 0, 0], [362, 0, 0, 0], [363, 0, 0, 0], [364, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[365, 0, 0, 0], [366, 0, 0, 0], [367, 0, 0, 0], [368, 0, 0, 0], [369, 0, 0, 0], [370, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[371, 0, 0, 0], [372, 0, 0, 0], [373, 0, 0, 0], [374, 0, 0, 0], [375, 0, 0, 0], [376, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[377, 0, 0, 0], [378, 0, 0, 0], [379, 0, 0, 0], [380, 0, 0, 0], [381, 0, 0, 0], [382, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[383, 0, 0, 0], [384, 0, 0, 0], [385, 0, 0, 0], [386, 0, 0, 0], [387, 0, 0, 0], [388, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[389, 0, 0, 0], [390, 0, 0, 0], [391, 0, 0, 0], [392, 0, 0, 0], [393, 0, 0, 0], [394, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[135, 0, 0, 0], [136, 0, 0, 0], [137, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[141, 0, 0, 0], [142, 0, 0, 0], [143, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[395, 0, 0, 0], [396, 0, 0, 0], [397, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[153, 0, 0, 0], [154, 0, 0, 0], [155, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[159, 0, 0, 0], [160, 0, 0, 0], [161, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[398, 0, 0, 0], [399, 0, 0, 0], [400, 0, 0, 0], [401, 0, 0, 0], [402, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[403, 0, 0, 0], [404, 0, 0, 0], [405, 0, 0, 0], [406, 0, 0, 0], [407, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[408, 0, 0, 0], [409, 0, 0, 0], [410, 0, 0, 0], [411, 0, 0, 0], [412, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[413, 0, 0, 0], [414, 0, 0, 0], [415, 0, 0, 0], [416, 0, 0, 0], [417, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[418, 0, 0, 0], [419, 0, 0, 0], [420, 0, 0, 0], [421, 0, 0, 0], [422, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[423, 0, 0, 0], [424, 0, 0, 0], [425, 0, 0, 0], [426, 0, 0, 0], [427, 0, 0, 0], [428, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[429, 0, 0, 0], [430, 0, 0, 0], [431, 0, 0, 0], [432, 0, 0, 0], [433, 0, 0, 0], [434, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[435, 0, 0, 0], [436, 0, 0, 0], [437, 0, 0, 0], [438, 0, 0, 0], [439, 0, 0, 0], [440, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[441, 0, 0, 0], [442, 0, 0, 0], [443, 0, 0, 0], [444, 0, 0, 0], [445, 0, 0, 0], [446, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[447, 0, 0, 0], [448, 0, 0, 0], [449, 0, 0, 0], [450, 0, 0, 0], [451, 0, 0, 0], [452, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[453, 0, 0, 0], [454, 0, 0, 0], [455, 0, 0, 0], [456, 0, 0, 0], [457, 0, 0, 0], [458, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[459, 0, 0, 0], [460, 0, 0, 0], [461, 0, 0, 0], [462, 0, 0, 0], [463, 0, 0, 0], [464, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[465, 0, 0, 0], [466, 0, 0, 0], [467, 0, 0, 0], [468, 0, 0, 0], [469, 0, 0, 0], [470, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[471, 0, 0, 0], [472, 0, 0, 0], [473, 0, 0, 0], [474, 0, 0, 0], [475, 0, 0, 0], [476, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[477, 0, 0, 0], [478, 0, 0, 0], [479, 0, 0, 0], [480, 0, 0, 0], [481, 0, 0, 0], [482, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[483, 0, 0, 0], [484, 0, 0, 0], [485, 0, 0, 0], [486, 0, 0, 0], [487, 0, 0, 0], [488, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[489, 0, 0, 0], [490, 0, 0, 0], [491, 0, 0, 0], [492, 0, 0, 0], [493, 0, 0, 0], [494, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[495, 0, 0, 0], [496, 0, 0, 0], [497, 0, 0, 0], [498, 0, 0, 0], [499, 0, 0, 0], [500, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[501, 0, 0, 0], [502, 0, 0, 0], [503, 0, 0, 0], [504, 0, 0, 0], [505, 0, 0, 0], [506, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[507, 0, 0, 0], [508, 0, 0, 0], [509, 0, 0, 0], [510, 0, 0, 0], [511, 0, 0, 0], [512, 0, 0, 0]]
	},
	{
		loop: !0,
		frames: [[513, 0, 0, 0], [514, 0, 0, 0], [515, 0, 0, 0], [516, 0, 0, 0], [517, 0, 0, 0], [518, 0, 0, 0]]
	},
	{
		loop: !0,
		frames: [[519, 0, 0, 0], [520, 0, 0, 0], [521, 0, 0, 0], [522, 0, 0, 0], [523, 0, 0, 0], [524, 0, 0, 0]]
	},
	{
		loop: !0,
		frames: [[525, 0, 0, 0], [526, 0, 0, 0], [527, 0, 0, 0], [528, 0, 0, 0], [529, 0, 0, 0], [530, 0, 0, 0]]
	},
	{
		loop: !0,
		frames: [[531, 0, 0, 0], [532, 0, 0, 0], [533, 0, 0, 0], [534, 0, 0, 0], [535, 0, 0, 0], [536, 0, 0, 0]]
	},
	{
		loop: !0,
		frames: [[537, 0, 0, 0], [538, 0, 0, 0], [539, 0, 0, 0], [540, 0, 0, 0], [541, 0, 0, 0], [542, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[543, 0, 0, 0], [544, 0, 0, 0], [545, 0, 0, 0], [546, 0, 0, 0], [547, 0, 0, 0], [548, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[549, 0, 0, 0], [550, 0, 0, 0], [551, 0, 0, 0], [552, 0, 0, 0], [553, 0, 0, 0], [554, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[555, 0, 0, 0], [556, 0, 0, 0], [557, 0, 0, 0], [558, 0, 0, 0], [559, 0, 0, 0], [560, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[561, 0, 0, 0], [562, 0, 0, 0], [563, 0, 0, 0], [564, 0, 0, 0], [565, 0, 0, 0], [566, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[567, 0, 0, 0], [568, 0, 0, 0], [569, 0, 0, 0], [570, 0, 0, 0], [571, 0, 0, 0], [572, 0, 0, 0]]
	},
	{
		loop: !0,
		frames: [[573, 0, 0, 0], [574, 0, 0, 0], [575, 0, 0, 0], [576, 0, 0, 0], [577, 0, 0, 0], [578, 0, 0, 0]]
	},
	{
		loop: !0,
		frames: [[579, 0, 0, 0], [580, 0, 0, 0], [581, 0, 0, 0], [582, 0, 0, 0], [583, 0, 0, 0], [584, 0, 0, 0]]
	},
	{
		loop: !0,
		frames: [[585, 0, 0, 0], [586, 0, 0, 0], [587, 0, 0, 0], [588, 0, 0, 0], [589, 0, 0, 0], [590, 0, 0, 0]]
	},
	{
		loop: !0,
		frames: [[591, 0, 0, 0], [591, 0, 0, 0], [592, 0, 0, 0], [593, 0, 0, 0], [594, 0, 0, 0], [595, 0, 0, 0]]
	},
	{
		loop: !0,
		frames: [[596, 0, 0, 0], [597, 0, 0, 0], [598, 0, 0, 0], [599, 0, 0, 0], [600, 0, 0, 0], [601, 0, 0, 0]]
	},
	{
		loop: !0,
		frames: [[602, 0, 0, 0], [603, 0, 0, 0], [604, 0, 0, 0], [605, 0, 0, 0], [606, 0, 0, 0], [607, 0, 0, 0]]
	},
	{
		loop: !0,
		frames: [[608, 0, 0, 0], [609, 0, 0, 0], [610, 0, 0, 0], [611, 0, 0, 0], [612, 0, 0, 0], [613, 0, 0, 0]]
	},
	{
		loop: !0,
		frames: [[614, 0, 0, 0], [615, 0, 0, 0], [616, 0, 0, 0], [617, 0, 0, 0], [618, 0, 0, 0], [619, 0, 0, 0]]
	},
	{
		loop: !0,
		frames: [[620, 0, 0, 0], [621, 0, 0, 0], [622, 0, 0, 0], [623, 0, 0, 0], [624, 0, 0, 0], [625, 0, 0, 0]]
	},
	{
		loop: !0,
		frames: [[626, 0, 0, 0], [627, 0, 0, 0], [628, 0, 0, 0], [629, 0, 0, 0], [630, 0, 0, 0], [631, 0, 0, 0]]
	},
	{
		loop: !0,
		frames: [[632, 0, 0, 0], [633, 0, 0, 0], [634, 0, 0, 0], [635, 0, 0, 0], [636, 0, 0, 0], [637, 0, 0, 0]]
	},
	{
		loop: !0,
		frames: [[638, 0, 0, 0], [639, 0, 0, 0], [640, 0, 0, 0], [641, 0, 0, 0], [642, 0, 0, 0], [643, 0, 0, 0]]
	},
	{
		loop: !0,
		frames: [[644, 0, 0, 0], [645, 0, 0, 0], [646, 0, 0, 0], [647, 0, 0, 0], [648, 0, 0, 0], [649, 0, 0, 0]]
	}];
	body_redNameSpace.get = function(d, e) {
		return new g.action.role([], 0, 0, 0, e ? e: h, a, b, (0 <= d && c[d] ? [c[d]] : c) || c)
	};
	body_red = body_redNameSpace.get()
})(jsGame);
var buildings01, buildings01NameSpace = {}; (function(g) {
	g.asyncImage([{
		id: "buildings01_0_to_1",
		src: "img/buildings/buildings01_0_to_1.png",
		cache: !0
	},
	{
		id: "buildings01_2_to_3",
		src: "img/buildings/buildings01_2_to_3.png",
		cache: !0
	}]);
	var h = ["buildings01_0_to_1", "buildings01_2_to_3"],
	a = [[[244, 0, 218, 308], [0, 0, 242, 197]], [[240, 0, 251, 328], [0, 0, 238, 192]]],
	b = [{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 177, -155, 230, 181],
		fA: [[0, 1, -180, -129, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 39, -284, 221, 287],
		fA: [[0, 0, -41, -291, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 178, -157, 227, 176],
		fA: [[1, 1, -182, -128, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 68, -293, 236, 315],
		fA: [[1, 0, -76, -299, 0]]
	}],
	c = [{
		loop: !1,
		frames: [[0, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[1, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[2, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[3, 0, 0, 0]]
	}];
	buildings01NameSpace.get = function(d, e) {
		return new g.action.role([], 0, 0, 0, e ? e: h, a, b, (0 <= d && c[d] ? [c[d]] : c) || c)
	};
	buildings01 = buildings01NameSpace.get()
})(jsGame);
var effects01, effects01NameSpace = {}; (function(g) {
	g.asyncImage([{
		id: "effects01_0",
		src: "img/effects/effects01_0.png",
		cache: !0
	},
	{
		id: "effects01_3",
		src: "img/effects/effects01_3.png",
		cache: !0
	},
	{
		id: "effects01_4",
		src: "img/effects/effects01_4.png",
		cache: !0
	},
	{
		id: "effects01_1",
		src: "img/effects/effects01_1.png",
		cache: !0
	},
	{
		id: "effects01_2",
		src: "img/effects/effects01_2.png",
		cache: !0
	},
	{
		id: "effects01_5",
		src: "img/effects/effects01_5.png",
		cache: !0
	},
	{
		id: "effects01_6_to_7",
		src: "img/effects/effects01_6_to_7.png",
		cache: !0
	},
	{
		id: "effects01_8",
		src: "img/effects/effects01_8.png",
		cache: !0
	},
	{
		id: "effects01_9",
		src: "img/effects/effects01_9.png",
		cache: !0
	},
	{
		id: "effects01_10",
		src: "img/effects/effects01_10.png",
		cache: !0
	},
	{
		id: "effects01_11",
		src: "img/effects/effects01_11.png",
		cache: !0
	},
	{
		id: "effects01_12",
		src: "img/effects/effects01_12.png",
		cache: !0
	},
	{
		id: "effects01_13",
		src: "img/effects/effects01_13.png",
		cache: !0
	},
	{
		id: "effects01_14",
		src: "img/effects/effects01_14.png",
		cache: !0
	},
	{
		id: "effects01_15",
		src: "img/effects/effects01_15.png",
		cache: !0
	}]);
	var h = "effects01_0 effects01_3 effects01_4 effects01_1 effects01_2 effects01_5 effects01_6_to_7 effects01_8 effects01_9 effects01_10 effects01_11 effects01_12 effects01_13 effects01_14 effects01_15".split(" "),
	a = [[[420, 0, 82, 49], [336, 0, 82, 49], [252, 0, 82, 48], [168, 0, 82, 50], [84, 0, 82, 49], [0, 0, 82, 49]], [[439, 0, 86, 43], [351, 0, 86, 44], [264, 0, 85, 42], [176, 0, 86, 44], [87, 0, 87, 44], [0, 0, 85, 43]], [[520, 0, 72, 36], [445, 0, 73, 36], [372, 0, 71, 37], [298, 0, 72, 37], [223, 0, 73, 37], [147, 0, 74, 36], [74, 0, 71, 37], [0, 0, 72, 38]], [[244, 0, 78, 45], [162, 0, 80, 45], [83, 0, 77, 46], [0, 0, 81, 44]], [[204, 0, 100, 50], [102, 0, 100, 50], [0, 0, 100, 50]], [[323, 0, 63, 31], [258, 0, 63, 31], [195, 0, 61, 31], [130, 0, 63, 31], [65, 0, 63, 31], [0, 0, 63, 31]], [[490, 0, 68, 87], [420, 0, 68, 87], [350, 0, 68, 87], [280, 0, 68, 87], [210, 0, 68, 77], [140, 0, 68, 77], [70, 0, 68, 77], [0, 0, 68, 77]], [[381, 0, 73, 100], [302, 0, 77, 100], [224, 0, 76, 100], [146, 0, 76, 100], [71, 0, 73, 97], [0, 0, 69, 95]], [[381, 0, 73, 100], [302, 0, 77, 100], [224, 0, 76, 100], [146, 0, 76, 100], [71, 0, 73, 97], [0, 0, 69, 95]], [[399, 0, 81, 99], [317, 0, 80, 99], [236, 0, 79, 99], [153, 0, 81, 99], [73, 0, 78, 93], [0, 0, 71, 98]], [[399, 0, 81, 99], [317, 0, 80, 99], [236, 0, 79, 99], [153, 0, 81, 99], [73, 0, 78, 93], [0, 0, 71, 98]], [[327, 0, 82, 100], [255, 0, 70, 100], [199, 0, 54, 92], [157, 0, 40, 74], [73, 0, 82, 56], [0, 0, 71, 52]], [[327, 0, 82, 100], [255, 0, 70, 100], [199, 0, 54, 92], [157, 0, 40, 74], [73, 0, 82, 56], [0, 0, 71, 52]], [[286, 0, 77, 77], [210, 0, 74, 88], [136, 0, 72, 86], [89, 0, 45, 75], [41, 0, 46, 80], [0, 0, 39, 61]], [[286, 0, 77, 77], [210, 0, 74, 88], [136, 0, 72, 86], [89, 0, 45, 75], [41, 0, 46, 80], [0, 0, 39, 61]]],
	b = [{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 35, -25, 73, 51],
		fA: [[0, 5, -40, -19, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 35, -25, 73, 51],
		fA: [[0, 4, -40, -20, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 35, -25, 73, 51],
		fA: [[0, 3, -40, -20, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 35, -25, 73, 51],
		fA: [[0, 2, -40, -19, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 35, -25, 73, 51],
		fA: [[0, 1, -40, -20, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 35, -25, 73, 51],
		fA: [[0, 0, -40, -20, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 37, -22, 73, 43],
		fA: [[3, 3, -41, -20, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 37, -22, 73, 43],
		fA: [[3, 2, -36, -19, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 37, -22, 73, 43],
		fA: [[3, 1, -39, -17, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 37, -22, 73, 43],
		fA: [[3, 0, -41, -18, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 33, -24, 69, 46],
		fA: [[4, 2, -49, -24, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 33, -24, 69, 46],
		fA: [[4, 1, -49, -24, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 33, -24, 69, 46],
		fA: [[4, 0, -49, -24, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 40, -22, 81, 42],
		fA: [[1, 5, -42, -21, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 40, -22, 81, 42],
		fA: [[1, 4, -43, -22, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 40, -22, 81, 42],
		fA: [[1, 3, -43, -22, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 40, -22, 81, 42],
		fA: [[1, 2, -42, -21, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 40, -22, 81, 42],
		fA: [[1, 1, -43, -22, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 40, -22, 81, 42],
		fA: [[1, 0, -43, -21, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 38, -23, 78, 46],
		fA: [[2, 7, -35, -18, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 38, -23, 78, 46],
		fA: [[2, 6, -33, -17, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 38, -23, 78, 46],
		fA: [[2, 5, -36, -16, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 38, -23, 78, 46],
		fA: [[2, 4, -36, -16, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 38, -23, 78, 46],
		fA: [[2, 3, -37, -17, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 38, -23, 78, 46],
		fA: [[2, 2, -37, -17, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 38, -23, 78, 46],
		fA: [[2, 1, -36, -17, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 38, -23, 78, 46],
		fA: [[2, 0, -34, -17, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 28, -19, 56, 37],
		fA: [[5, 5, -31, -15, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 28, -19, 56, 37],
		fA: [[5, 4, -31, -15, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 28, -19, 56, 37],
		fA: [[5, 3, -31, -15, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 28, -19, 56, 37],
		fA: [[5, 2, -30, -15, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 28, -19, 56, 37],
		fA: [[5, 1, -31, -15, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 28, -19, 56, 37],
		fA: [[5, 0, -31, -15, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 1, 1, 71, 78],
		fA: [[6, 7, 1, 1, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 1, 1, 71, 78],
		fA: [[6, 6, 1, 1, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 1, 1, 71, 78],
		fA: [[6, 5, 1, 1, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 1, 1, 71, 78],
		fA: [[6, 4, 1, 1, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 3, -3, 73, 92],
		fA: [[6, 3, -1, 0, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 3, -3, 73, 92],
		fA: [[6, 2, -1, 0, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 3, -3, 73, 92],
		fA: [[6, 1, -1, 0, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 3, -3, 73, 92],
		fA: [[6, 0, -1, 0, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 21, -65, 44, 73],
		fA: [[7, 5, -32, -84, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 21, -65, 44, 73],
		fA: [[7, 4, -33, -84, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 21, -65, 44, 73],
		fA: [[7, 3, -36, -84, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 21, -65, 44, 73],
		fA: [[7, 2, -34, -84, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 21, -65, 44, 73],
		fA: [[7, 1, -35, -84, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 21, -65, 44, 73],
		fA: [[7, 0, -36, -84, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 26, -73, 55, 79],
		fA: [[8, 5, -31, -85, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 26, -73, 55, 79],
		fA: [[8, 4, -32, -85, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 26, -73, 55, 79],
		fA: [[8, 3, -35, -85, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 26, -73, 55, 79],
		fA: [[8, 2, -33, -85, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 26, -73, 55, 79],
		fA: [[8, 1, -34, -85, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 26, -73, 55, 79],
		fA: [[8, 0, -35, -85, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 25, -74, 51, 77],
		fA: [[9, 5, -34, -89, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 25, -74, 51, 77],
		fA: [[9, 4, -37, -89, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 25, -74, 51, 77],
		fA: [[9, 3, -41, -89, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 25, -74, 51, 77],
		fA: [[9, 2, -38, -89, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 25, -74, 51, 77],
		fA: [[9, 1, -40, -89, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 25, -74, 51, 77],
		fA: [[9, 0, -40, -89, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 22, -67, 45, 72],
		fA: [[10, 5, -34, -89, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 22, -67, 45, 72],
		fA: [[10, 4, -37, -89, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 22, -67, 45, 72],
		fA: [[10, 3, -41, -89, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 22, -67, 45, 72],
		fA: [[10, 2, -38, -89, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 22, -67, 45, 72],
		fA: [[10, 1, -40, -89, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 22, -67, 45, 72],
		fA: [[10, 0, -40, -89, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 26, -69, 55, 85],
		fA: [[11, 5, -35, -27, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 26, -69, 55, 85],
		fA: [[11, 4, -41, -33, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 26, -69, 55, 85],
		fA: [[11, 3, -20, -57, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 26, -69, 55, 85],
		fA: [[11, 2, -27, -69, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 26, -69, 55, 85],
		fA: [[11, 1, -35, -69, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 26, -69, 55, 85],
		fA: [[11, 0, -41, -69, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 30, -73, 61, 92],
		fA: [[12, 5, -35, -27, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 30, -73, 61, 92],
		fA: [[12, 4, -41, -33, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 30, -73, 61, 92],
		fA: [[12, 3, -20, -57, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 30, -73, 61, 92],
		fA: [[12, 2, -27, -69, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 30, -73, 61, 92],
		fA: [[12, 1, -35, -69, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 30, -73, 61, 92],
		fA: [[12, 0, -41, -69, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 25, -78, 50, 82],
		fA: [[13, 5, -18, -68, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 25, -78, 50, 82],
		fA: [[13, 4, -21, -84, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 25, -78, 50, 82],
		fA: [[13, 3, -22, -79, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 25, -78, 50, 82],
		fA: [[13, 2, -39, -83, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 25, -78, 50, 82],
		fA: [[13, 1, -40, -84, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 25, -78, 50, 82],
		fA: [[13, 0, -39, -76, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 29, -79, 60, 90],
		fA: [[14, 5, -18, -68, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 29, -79, 60, 90],
		fA: [[14, 4, -21, -84, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 29, -79, 60, 90],
		fA: [[14, 3, -22, -79, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 29, -79, 60, 90],
		fA: [[14, 2, -39, -83, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 29, -79, 60, 90],
		fA: [[14, 1, -40, -84, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 29, -79, 60, 90],
		fA: [[14, 0, -39, -76, 0]]
	}],
	c = [{
		loop: !0,
		frames: [[0, 0, 0, 0], [1, 0, 0, 0], [2, 0, 0, 0], [3, 0, 0, 0], [4, 0, 0, 0], [5, 0, 0, 0]]
	},
	{
		loop: !0,
		frames: [[6, 0, 0, 0], [7, 0, 0, 0], [8, 0, 0, 0], [9, 0, 0, 0]]
	},
	{
		loop: !0,
		frames: [[10, 0, 0, 0], [11, 0, 0, 0], [12, 0, 0, 0]]
	},
	{
		loop: !0,
		frames: [[13, 0, 0, 0], [14, 0, 0, 0], [15, 0, 0, 0], [16, 0, 0, 0], [17, 0, 0, 0], [18, 0, 0, 0]]
	},
	{
		loop: !0,
		frames: [[19, 0, 0, 0], [20, 0, 0, 0], [21, 0, 0, 0], [22, 0, 0, 0], [23, 0, 0, 0], [24, 0, 0, 0], [25, 0, 0, 0], [26, 0, 0, 0]]
	},
	{
		loop: !0,
		frames: [[27, 0, 0, 0], [28, 0, 0, 0], [29, 0, 0, 0], [30, 0, 0, 0], [31, 0, 0, 0], [32, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[33, 0, 0, 0], [34, 0, 0, 0], [35, 0, 0, 0], [36, 0, 0, 0], [33, 0, 0, 0], [34, 0, 0, 0], [35, 0, 0, 0], [36, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[37, 0, 0, 0], [38, 0, 0, 0], [39, 0, 0, 0], [40, 0, 0, 0], [37, 0, 0, 0], [38, 0, 0, 0], [39, 0, 0, 0], [40, 0, 0, 0]]
	},
	{
		loop: !0,
		frames: [[41, 0, 0, 0], [42, 0, 0, 0], [43, 0, 0, 0], [44, 0, 0, 0], [45, 0, 0, 0], [46, 0, 0, 0]]
	},
	{
		loop: !0,
		frames: [[47, 0, 0, 0], [48, 0, 0, 0], [49, 0, 0, 0], [50, 0, 0, 0], [51, 0, 0, 0], [52, 0, 0, 0]]
	},
	{
		loop: !0,
		frames: [[53, 0, 0, 0], [54, 0, 0, 0], [55, 0, 0, 0], [56, 0, 0, 0], [57, 0, 0, 0], [58, 0, 0, 0]]
	},
	{
		loop: !0,
		frames: [[59, 0, 0, 0], [60, 0, 0, 0], [61, 0, 0, 0], [62, 0, 0, 0], [63, 0, 0, 0], [64, 0, 0, 0]]
	},
	{
		loop: !0,
		frames: [[65, 0, 0, 0], [66, 0, 0, 0], [67, 0, 0, 0], [68, 0, 0, 0], [69, 0, 0, 0], [70, 0, 0, 0]]
	},
	{
		loop: !0,
		frames: [[71, 0, 0, 0], [72, 0, 0, 0], [73, 0, 0, 0], [74, 0, 0, 0], [75, 0, 0, 0], [76, 0, 0, 0]]
	},
	{
		loop: !0,
		frames: [[77, 0, 0, 0], [78, 0, 0, 0], [79, 0, 0, 0], [80, 0, 0, 0], [81, 0, 0, 0], [82, 0, 0, 0]]
	},
	{
		loop: !0,
		frames: [[83, 0, 0, 0], [84, 0, 0, 0], [85, 0, 0, 0], [86, 0, 0, 0], [87, 0, 0, 0], [88, 0, 0, 0]]
	}];
	effects01NameSpace.get = function(d, e) {
		return new g.action.role([], 0, 0, 0, e ? e: h, a, b, (0 <= d && c[d] ? [c[d]] : c) || c)
	};
	effects01 = effects01NameSpace.get()
})(jsGame);
var player11, player11NameSpace = {}; (function(g) {
	g.asyncImage([{
		id: "player11_0_to_5",
		src: "img/roles/player11_0_to_5.png",
		cache: !0
	},
	{
		id: "player11_6_to_9",
		src: "img/roles/player11_6_to_9.png",
		cache: !0
	},
	{
		id: "player11_10_to_14",
		src: "img/roles/player11_10_to_14.png",
		cache: !0
	},
	{
		id: "player11_15_to_19",
		src: "img/roles/player11_15_to_19.png",
		cache: !0
	},
	{
		id: "player11_20_to_24",
		src: "img/roles/player11_20_to_24.png",
		cache: !0
	},
	{
		id: "player11_25_to_29",
		src: "img/roles/player11_25_to_29.png",
		cache: !0
	},
	{
		id: "player11_30_to_34",
		src: "img/roles/player11_30_to_34.png",
		cache: !0
	},
	{
		id: "player11_35_to_39",
		src: "img/roles/player11_35_to_39.png",
		cache: !0
	},
	{
		id: "player11_40_to_44",
		src: "img/roles/player11_40_to_44.png",
		cache: !0
	},
	{
		id: "player11_45_to_49",
		src: "img/roles/player11_45_to_49.png",
		cache: !0
	},
	{
		id: "player11_55_to_59",
		src: "img/roles/player11_55_to_59.png",
		cache: !0
	},
	{
		id: "player11_75_to_79",
		src: "img/roles/player11_75_to_79.png",
		cache: !0
	},
	{
		id: "player11_80_to_84",
		src: "img/roles/player11_80_to_84.png",
		cache: !0
	},
	{
		id: "player11_85_to_89",
		src: "img/roles/player11_85_to_89.png",
		cache: !0
	},
	{
		id: "player11_90_to_94",
		src: "img/roles/player11_90_to_94.png",
		cache: !0
	},
	{
		id: "player11_95_to_99",
		src: "img/roles/player11_95_to_99.png",
		cache: !0
	},
	{
		id: "player11_100_to_104",
		src: "img/roles/player11_100_to_104.png",
		cache: !0
	},
	{
		id: "player11_105_to_109",
		src: "img/roles/player11_105_to_109.png",
		cache: !0
	},
	{
		id: "player11_110_to_114",
		src: "img/roles/player11_110_to_114.png",
		cache: !0
	},
	{
		id: "player11_60_to_64",
		src: "img/roles/player11_60_to_64.png",
		cache: !0
	},
	{
		id: "player11_50_to_54",
		src: "img/roles/player11_50_to_54.png",
		cache: !0
	},
	{
		id: "player11_65_to_69",
		src: "img/roles/player11_65_to_69.png",
		cache: !0
	},
	{
		id: "player11_115_to_117",
		src: "img/roles/player11_115_to_117.png",
		cache: !0
	}]);
	var h = "player11_0_to_5 player11_6_to_9 player11_10_to_14 player11_15_to_19 player11_20_to_24 player11_25_to_29 player11_30_to_34 player11_35_to_39 player11_40_to_44 player11_45_to_49 player11_55_to_59 player11_75_to_79 player11_80_to_84 player11_85_to_89 player11_90_to_94 player11_95_to_99 player11_100_to_104 player11_105_to_109 player11_110_to_114 player11_60_to_64 player11_50_to_54 player11_65_to_69 player11_115_to_117".split(" "),
	a = [[[61, 62, 16, 18], [100, 21, 13, 21], [82, 0, 18, 22], [13, 0, 15, 23], [42, 22, 14, 21], [69, 0, 13, 22], [34, 62, 14, 19], [84, 42, 14, 20], [70, 42, 14, 20], [56, 42, 14, 20], [98, 61, 14, 19], [48, 62, 13, 18], [16, 62, 18, 19], [0, 62, 16, 19], [28, 43, 16, 19], [0, 23, 16, 20], [72, 22, 15, 20], [56, 22, 16, 20], [100, 0, 12, 21], [55, 0, 14, 22], [28, 22, 14, 21], [41, 0, 14, 22], [28, 0, 13, 22], [0, 0, 13, 23], [44, 43, 12, 18], [14, 43, 14, 19], [0, 43, 14, 19], [98, 42, 14, 19], [16, 23, 12, 18], [87, 22, 13, 19]], [[448, 0, 14, 23], [432, 0, 14, 23], [416, 0, 14, 24], [399, 0, 15, 24], [383, 0, 14, 23], [368, 0, 13, 23], [353, 0, 13, 19], [338, 0, 13, 20], [324, 0, 12, 19], [309, 0, 13, 20], [295, 0, 12, 19], [280, 0, 13, 18], [264, 0, 14, 23], [247, 0, 15, 22], [231, 0, 14, 23], [215, 0, 14, 23], [198, 0, 15, 22], [181, 0, 15, 24], [166, 0, 13, 23], [151, 0, 13, 22], [136, 0, 13, 22], [120, 0, 14, 22], [104, 0, 14, 23], [89, 0, 13, 22], [74, 0, 13, 18], [59, 0, 13, 19], [44, 0, 13, 19], [29, 0, 13, 19], [14, 0, 13, 18], [0, 0, 12, 18]], [[476, 0, 16, 18], [460, 0, 14, 21], [443, 0, 15, 22], [427, 0, 14, 22], [411, 0, 14, 22], [394, 0, 15, 20], [377, 0, 15, 19], [361, 0, 14, 20], [345, 0, 14, 20], [329, 0, 14, 20], [313, 0, 14, 18], [297, 0, 14, 18], [276, 0, 19, 19], [257, 0, 17, 19], [239, 0, 16, 19], [221, 0, 16, 20], [204, 0, 15, 21], [186, 0, 16, 21], [171, 0, 13, 21], [155, 0, 14, 21], [139, 0, 14, 21], [122, 0, 15, 22], [107, 0, 13, 23], [92, 0, 13, 19], [78, 0, 12, 18], [62, 0, 14, 20], [46, 0, 14, 19], [30, 0, 14, 19], [14, 0, 14, 18], [0, 0, 12, 16]], [[456, 0, 14, 21], [440, 0, 14, 21], [424, 0, 14, 20], [409, 0, 13, 21], [394, 0, 13, 21], [378, 0, 14, 20], [361, 0, 15, 18], [345, 0, 14, 19], [329, 0, 14, 19], [313, 0, 14, 19], [297, 0, 14, 19], [280, 0, 15, 19], [261, 0, 17, 20], [243, 0, 16, 20], [225, 0, 16, 19], [208, 0, 15, 20], [190, 0, 16, 19], [172, 0, 16, 19], [158, 0, 12, 21], [143, 0, 13, 22], [129, 0, 12, 22], [115, 0, 12, 23], [101, 0, 12, 22], [86, 0, 13, 21], [72, 0, 12, 19], [57, 0, 13, 20], [43, 0, 12, 20], [29, 0, 12, 19], [15, 0, 12, 20], [0, 0, 13, 20]], [[217, 0, 13, 21], [201, 0, 14, 21], [186, 0, 13, 20], [170, 0, 14, 19], [154, 0, 14, 19], [138, 0, 14, 20], [121, 0, 15, 19], [103, 0, 16, 20], [86, 0, 15, 19], [71, 0, 13, 21], [57, 0, 12, 21], [43, 0, 12, 22], [28, 0, 13, 20], [14, 0, 12, 19], [0, 0, 12, 20]], [[469, 0, 14, 23], [453, 0, 14, 23], [434, 0, 17, 22], [414, 0, 18, 21], [398, 0, 14, 24], [382, 0, 14, 20], [367, 0, 13, 19], [351, 0, 14, 19], [335, 0, 14, 17], [318, 0, 15, 17], [301, 0, 15, 18], [285, 0, 14, 20], [267, 0, 16, 21], [249, 0, 16, 21], [228, 0, 19, 18], [206, 0, 20, 18], [188, 0, 16, 20], [170, 0, 16, 21], [156, 0, 12, 24], [142, 0, 12, 24], [128, 0, 12, 24], [115, 0, 11, 23], [101, 0, 12, 24], [86, 0, 13, 20], [72, 0, 12, 17], [58, 0, 12, 18], [44, 0, 12, 17], [29, 0, 13, 17], [15, 0, 12, 18], [0, 0, 13, 17]], [[450, 0, 15, 21], [434, 0, 14, 21], [417, 0, 15, 19], [400, 0, 15, 18], [384, 0, 14, 22], [367, 0, 15, 21], [352, 0, 13, 20], [338, 0, 12, 20], [324, 0, 12, 19], [310, 0, 12, 19], [296, 0, 12, 19], [279, 0, 15, 18], [262, 0, 15, 20], [245, 0, 15, 20], [228, 0, 15, 20], [212, 0, 14, 19], [195, 0, 15, 19], [176, 0, 17, 19], [161, 0, 13, 22], [147, 0, 12, 22], [131, 0, 14, 21], [115, 0, 14, 20], [101, 0, 12, 23], [87, 0, 12, 21], [72, 0, 13, 18], [58, 0, 12, 19], [44, 0, 12, 19], [28, 0, 14, 19], [14, 0, 12, 18], [0, 0, 12, 19]], [[446, 0, 13, 22], [431, 0, 13, 22], [416, 0, 13, 23], [401, 0, 13, 22], [385, 0, 14, 21], [370, 0, 13, 21], [356, 0, 12, 17], [341, 0, 13, 17], [326, 0, 13, 17], [311, 0, 13, 17], [296, 0, 13, 17], [281, 0, 13, 17], [264, 0, 15, 19], [247, 0, 15, 18], [230, 0, 15, 19], [212, 0, 16, 19], [195, 0, 15, 19], [178, 0, 15, 19], [164, 0, 12, 23], [149, 0, 13, 23], [134, 0, 13, 23], [119, 0, 13, 23], [104, 0, 13, 22], [89, 0, 13, 23], [75, 0, 12, 20], [60, 0, 13, 20], [45, 0, 13, 19], [30, 0, 13, 19], [15, 0, 13, 20], [0, 0, 13, 19]], [[449, 0, 13, 22], [433, 0, 14, 22], [417, 0, 14, 21], [401, 0, 14, 22], [386, 0, 13, 23], [370, 0, 14, 22], [355, 0, 13, 19], [339, 0, 14, 19], [323, 0, 14, 19], [308, 0, 13, 19], [293, 0, 13, 19], [277, 0, 14, 23], [260, 0, 15, 20], [243, 0, 15, 20], [225, 0, 16, 19], [208, 0, 15, 21], [190, 0, 16, 21], [172, 0, 16, 22], [158, 0, 12, 22], [143, 0, 13, 23], [128, 0, 13, 22], [114, 0, 12, 23], [100, 0, 12, 22], [86, 0, 12, 22], [72, 0, 12, 18], [57, 0, 13, 18], [42, 0, 13, 19], [28, 0, 12, 19], [14, 0, 12, 19], [0, 0, 12, 19]], [[406, 0, 15, 22], [389, 0, 15, 18], [374, 0, 13, 16], [355, 0, 17, 21], [337, 0, 16, 20], [320, 0, 15, 18], [305, 0, 13, 18], [285, 0, 18, 17], [270, 0, 13, 20], [252, 0, 16, 19], [233, 0, 17, 19], [219, 0, 12, 19], [199, 0, 18, 16], [183, 0, 14, 20], [164, 0, 17, 19], [149, 0, 13, 23], [130, 0, 17, 21], [116, 0, 12, 17], [97, 0, 17, 19], [83, 0, 12, 19], [67, 0, 14, 18], [49, 0, 16, 18], [33, 0, 14, 16], [14, 0, 17, 20], [0, 0, 12, 19]], [[370, 0, 13, 20], [353, 0, 15, 15], [337, 0, 14, 18], [321, 0, 14, 24], [304, 0, 15, 18], [289, 0, 13, 18], [277, 0, 10, 11], [263, 0, 12, 19], [249, 0, 12, 19], [231, 0, 16, 19], [214, 0, 15, 19], [200, 0, 12, 16], [186, 0, 12, 19], [171, 0, 13, 23], [153, 0, 16, 19], [138, 0, 13, 10], [122, 0, 14, 23], [105, 0, 15, 17], [93, 0, 10, 11], [78, 0, 13, 17], [64, 0, 12, 19], [49, 0, 13, 17], [32, 0, 15, 22], [15, 0, 15, 17], [0, 0, 13, 16]], [[400, 0, 14, 20], [383, 0, 15, 21], [366, 0, 15, 22], [349, 0, 15, 23], [330, 0, 17, 23], [313, 0, 15, 21], [297, 0, 14, 20], [280, 0, 15, 17], [263, 0, 15, 17], [245, 0, 16, 17], [227, 0, 16, 20], [210, 0, 15, 20], [191, 0, 17, 20], [171, 0, 18, 20], [150, 0, 19, 18], [135, 0, 13, 20], [120, 0, 13, 20], [105, 0, 13, 23], [90, 0, 13, 22], [75, 0, 13, 25], [60, 0, 13, 18], [45, 0, 13, 17], [30, 0, 13, 18], [15, 0, 13, 17], [0, 0, 13, 17]], [[475, 0, 14, 21], [455, 0, 18, 21], [436, 0, 17, 20], [421, 0, 13, 22], [404, 0, 15, 20], [387, 0, 15, 21], [371, 0, 14, 19], [356, 0, 13, 19], [340, 0, 14, 18], [323, 0, 15, 19], [306, 0, 15, 19], [289, 0, 15, 19], [271, 0, 16, 20], [253, 0, 16, 19], [235, 0, 16, 19], [217, 0, 16, 20], [199, 0, 16, 20], [180, 0, 17, 20], [164, 0, 14, 22], [149, 0, 13, 23], [135, 0, 12, 22], [120, 0, 13, 18], [106, 0, 12, 20], [91, 0, 13, 21], [76, 0, 13, 19], [59, 0, 15, 19], [44, 0, 13, 19], [30, 0, 12, 19], [15, 0, 13, 18], [0, 0, 13, 18]], [[445, 0, 14, 23], [430, 0, 13, 20], [414, 0, 14, 21], [398, 0, 14, 20], [382, 0, 14, 23], [367, 0, 13, 23], [353, 0, 12, 19], [339, 0, 12, 20], [324, 0, 13, 19], [309, 0, 13, 18], [294, 0, 13, 20], [280, 0, 12, 20], [263, 0, 15, 22], [245, 0, 16, 22], [229, 0, 14, 19], [211, 0, 16, 20], [193, 0, 16, 22], [176, 0, 15, 22], [161, 0, 13, 23], [146, 0, 13, 24], [129, 0, 15, 23], [114, 0, 13, 19], [100, 0, 12, 23], [86, 0, 12, 23], [71, 0, 13, 19], [57, 0, 12, 19], [42, 0, 13, 19], [28, 0, 12, 18], [14, 0, 12, 18], [0, 0, 12, 18]], [[476, 0, 13, 23], [459, 0, 15, 17], [439, 0, 18, 23], [424, 0, 13, 23], [407, 0, 15, 24], [391, 0, 14, 20], [375, 0, 14, 19], [356, 0, 17, 16], [338, 0, 16, 15], [320, 0, 16, 17], [304, 0, 14, 19], [288, 0, 14, 19], [270, 0, 16, 22], [250, 0, 18, 17], [228, 0, 20, 20], [210, 0, 16, 18], [192, 0, 16, 20], [174, 0, 16, 21], [159, 0, 13, 23], [144, 0, 13, 22], [130, 0, 12, 22], [116, 0, 12, 23], [102, 0, 12, 11], [88, 0, 12, 20], [73, 0, 13, 18], [58, 0, 13, 16], [43, 0, 13, 14], [28, 0, 13, 17], [14, 0, 12, 18], [0, 0, 12, 17]], [[457, 0, 13, 22], [442, 0, 13, 23], [426, 0, 14, 23], [411, 0, 13, 23], [395, 0, 14, 23], [377, 0, 16, 22], [362, 0, 13, 19], [347, 0, 13, 19], [332, 0, 13, 19], [317, 0, 13, 19], [302, 0, 13, 20], [286, 0, 14, 19], [268, 0, 16, 20], [250, 0, 16, 21], [233, 0, 15, 21], [215, 0, 16, 20], [198, 0, 15, 22], [180, 0, 16, 21], [164, 0, 14, 24], [148, 0, 14, 24], [132, 0, 14, 24], [117, 0, 13, 24], [102, 0, 13, 23], [87, 0, 13, 20], [72, 0, 13, 19], [58, 0, 12, 18], [43, 0, 13, 19], [29, 0, 12, 19], [15, 0, 12, 19], [0, 0, 13, 18]], [[476, 0, 15, 17], [459, 0, 15, 21], [443, 0, 14, 22], [426, 0, 15, 18], [407, 0, 17, 22], [391, 0, 14, 20], [373, 0, 16, 20], [356, 0, 15, 20], [340, 0, 14, 22], [324, 0, 14, 22], [309, 0, 13, 17], [293, 0, 14, 18], [274, 0, 17, 19], [259, 0, 13, 20], [242, 0, 15, 24], [227, 0, 13, 18], [212, 0, 13, 22], [194, 0, 16, 19], [178, 0, 14, 17], [160, 0, 16, 22], [146, 0, 12, 19], [128, 0, 16, 17], [110, 0, 16, 19], [95, 0, 13, 22], [80, 0, 13, 18], [63, 0, 15, 18], [49, 0, 12, 20], [31, 0, 16, 24], [14, 0, 15, 18], [0, 0, 12, 19]], [[446, 0, 14, 22], [430, 0, 14, 22], [414, 0, 14, 22], [398, 0, 14, 22], [382, 0, 14, 22], [366, 0, 14, 22], [351, 0, 13, 19], [336, 0, 13, 19], [321, 0, 13, 19], [306, 0, 13, 19], [291, 0, 13, 18], [276, 0, 13, 19], [258, 0, 16, 21], [240, 0, 16, 21], [222, 0, 16, 21], [204, 0, 16, 21], [186, 0, 16, 21], [168, 0, 16, 20], [154, 0, 12, 22], [140, 0, 12, 22], [126, 0, 12, 23], [112, 0, 12, 22], [98, 0, 12, 22], [84, 0, 12, 22], [70, 0, 12, 19], [56, 0, 12, 19], [42, 0, 12, 19], [28, 0, 12, 19], [14, 0, 12, 19], [0, 0, 12, 19]], [[445, 0, 13, 23], [430, 0, 13, 23], [415, 0, 13, 23], [399, 0, 14, 22], [384, 0, 13, 23], [369, 0, 13, 23], [354, 0, 13, 19], [340, 0, 12, 19], [325, 0, 13, 18], [311, 0, 12, 19], [296, 0, 13, 19], [282, 0, 12, 19], [265, 0, 15, 22], [248, 0, 15, 17], [231, 0, 15, 19], [214, 0, 15, 18], [198, 0, 14, 22], [181, 0, 15, 22], [165, 0, 14, 23], [149, 0, 14, 23], [133, 0, 14, 23], [117, 0, 14, 23], [101, 0, 14, 23], [86, 0, 13, 23], [71, 0, 13, 19], [57, 0, 12, 18], [43, 0, 12, 19], [29, 0, 12, 19], [14, 0, 13, 19], [0, 0, 12, 19]], [[454, 0, 13, 23], [438, 0, 14, 22], [421, 0, 15, 21], [405, 0, 14, 22], [390, 0, 13, 22], [374, 0, 14, 22], [359, 0, 13, 19], [344, 0, 13, 18], [328, 0, 14, 19], [313, 0, 13, 18], [297, 0, 14, 18], [281, 0, 14, 21], [264, 0, 15, 24], [247, 0, 15, 20], [229, 0, 16, 20], [212, 0, 15, 20], [194, 0, 16, 22], [176, 0, 16, 22], [161, 0, 13, 23], [146, 0, 13, 22], [132, 0, 12, 22], [117, 0, 13, 22], [102, 0, 13, 22], [88, 0, 12, 21], [73, 0, 13, 19], [58, 0, 13, 18], [44, 0, 12, 18], [29, 0, 13, 18], [14, 0, 13, 19], [0, 0, 12, 18]], [[465, 0, 14, 23], [448, 0, 15, 23], [432, 0, 14, 21], [415, 0, 15, 21], [400, 0, 13, 22], [385, 0, 13, 23], [370, 0, 13, 19], [355, 0, 13, 18], [337, 0, 16, 16], [316, 0, 19, 15], [298, 0, 16, 17], [283, 0, 13, 19], [266, 0, 15, 21], [248, 0, 16, 17], [226, 0, 20, 18], [206, 0, 18, 16], [186, 0, 18, 21], [169, 0, 15, 24], [154, 0, 13, 24], [139, 0, 13, 24], [124, 0, 13, 23], [108, 0, 14, 22], [91, 0, 15, 24], [75, 0, 14, 23], [60, 0, 13, 18], [45, 0, 13, 15], [30, 0, 13, 15], [15, 0, 13, 16], [0, 0, 13, 18]], [[479, 0, 15, 19], [460, 0, 17, 18], [440, 0, 18, 17], [419, 0, 19, 19], [402, 0, 15, 19], [385, 0, 15, 18], [368, 0, 15, 18], [352, 0, 14, 17], [337, 0, 13, 17], [322, 0, 13, 18], [307, 0, 13, 19], [290, 0, 15, 18], [271, 0, 17, 19], [251, 0, 18, 18], [232, 0, 17, 18], [213, 0, 17, 18], [195, 0, 16, 18], [176, 0, 17, 19], [161, 0, 13, 17], [147, 0, 12, 17], [132, 0, 13, 17], [116, 0, 14, 17], [102, 0, 12, 19], [87, 0, 13, 17], [72, 0, 13, 16], [58, 0, 12, 16], [43, 0, 13, 16], [29, 0, 12, 24], [15, 0, 12, 20], [0, 0, 13, 17]], [[279, 0, 13, 23], [263, 0, 14, 23], [247, 0, 14, 22], [232, 0, 13, 22], [216, 0, 14, 23], [200, 0, 14, 22], [185, 0, 13, 20], [169, 0, 14, 20], [153, 0, 14, 24], [137, 0, 14, 20], [122, 0, 13, 19], [106, 0, 14, 18], [89, 0, 15, 22], [71, 0, 16, 22], [53, 0, 16, 22], [36, 0, 15, 21], [18, 0, 16, 20], [0, 0, 16, 20]]],
	b = [{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[0, 29, -7, -109, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[0, 28, -1, -99, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[0, 27, 2, -70, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[0, 26, 4, -28, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[0, 25, 2, -13, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[0, 24, 0, 6, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[0, 23, -6, -100, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[0, 22, -11, -109, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[0, 21, -16, -92, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[0, 20, -18, -72, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[0, 19, -16, -76, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[0, 18, -12, -73, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[0, 17, -18, -104, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[0, 16, 1, -107, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[0, 15, 13, -86, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[0, 14, 34, -56, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[0, 13, 52, -49, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[0, 12, 65, -36, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[0, 11, -14, -107, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[0, 10, 3, -103, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[0, 9, 15, -77, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[0, 8, 32, -39, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[0, 7, 42, -26, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[0, 6, 50, -8, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[0, 5, -13, -101, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[0, 4, -4, -109, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[0, 3, 2, -93, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[0, 2, 15, -70, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[0, 1, 30, -70, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[0, 0, 41, -63, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[1, 29, 5, -106, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[1, 28, 8, -107, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[1, 27, 10, -108, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[1, 26, 10, -108, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[1, 25, 9, -108, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[1, 24, 7, -108, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[1, 23, -17, -83, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[1, 22, -21, -94, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[1, 21, -23, -98, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[1, 20, -23, -99, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[1, 19, -22, -99, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[1, 18, -20, -98, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[1, 17, -31, -100, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[1, 16, -21, -108, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[1, 15, -17, -111, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[1, 14, -16, -112, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[1, 13, -17, -111, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[1, 12, -18, -110, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[1, 11, -15, -106, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[1, 10, -5, -111, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[1, 9, -1, -112, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[1, 8, 0, -112, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[1, 7, -2, -112, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[1, 6, -4, -111, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[1, 5, -30, -90, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[1, 4, -27, -101, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[1, 3, -26, -106, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[1, 2, -25, -107, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[1, 1, -24, -106, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[1, 0, -24, -104, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[2, 29, -4, -95, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[2, 28, -2, -98, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[2, 27, 3, -69, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[2, 26, 4, -34, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[2, 25, 2, -21, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[2, 24, 0, -6, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[2, 23, -8, -70, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[2, 22, -11, -107, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[2, 21, -17, -95, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[2, 20, -18, -67, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[2, 19, -16, -68, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[2, 18, -13, -66, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[2, 17, -33, -84, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[2, 16, 0, -105, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[2, 15, 16, -88, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[2, 14, 23, -57, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[2, 13, 37, -49, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[2, 12, 47, -39, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[2, 11, -23, -92, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[2, 10, 2, -101, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[2, 9, 18, -77, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[2, 8, 24, -44, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[2, 7, 32, -31, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[2, 6, 37, -17, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[2, 5, -26, -74, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[2, 4, -4, -107, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[2, 3, 4, -95, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[2, 2, 7, -67, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[2, 1, 19, -65, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[2, 0, 28, -59, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[3, 29, -6, -103, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[3, 28, -4, -103, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[3, 27, -4, -102, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[3, 26, -6, -108, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[3, 25, -7, -111, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[3, 24, -3, -113, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[3, 23, -7, -103, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[3, 22, -8, -103, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[3, 21, -8, -104, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[3, 20, -6, -104, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[3, 19, -6, -101, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[3, 18, -9, -96, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[3, 17, -8, -103, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[3, 16, -9, -103, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[3, 15, -7, -104, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[3, 14, -13, -105, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[3, 13, -18, -105, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[3, 12, -25, -106, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[3, 11, -7, -103, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[3, 10, -6, -103, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[3, 9, -5, -103, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[3, 8, -10, -107, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[3, 7, -14, -109, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[3, 6, -17, -111, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[3, 5, -7, -103, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[3, 4, -8, -103, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[3, 3, -7, -104, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[3, 2, -10, -104, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[3, 1, -13, -102, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[3, 0, -20, -99, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[4, 14, -7, -105, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[4, 13, -4, -102, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[4, 12, -6, -102, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[4, 11, -5, -104, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[4, 10, -8, -102, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[4, 9, -7, -103, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[4, 8, -10, -103, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[4, 7, -9, -103, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[4, 6, -7, -102, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[4, 5, -8, -104, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[4, 4, -6, -103, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[4, 3, -6, -102, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[4, 2, -7, -103, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[4, 1, -8, -103, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[4, 0, -6, -103, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[5, 29, -17, -99, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[5, 28, -10, -131, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[5, 27, -16, -130, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[5, 26, -14, -124, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[5, 25, -10, -113, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[5, 24, -8, -109, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[5, 23, 4, -78, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[5, 22, -2, -130, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[5, 21, 5, -136, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[5, 20, 2, -126, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[5, 19, -2, -95, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[5, 18, -4, -95, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[5, 17, -29, -83, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[5, 16, -10, -128, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[5, 15, -6, -128, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[5, 14, -9, -120, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[5, 13, -27, -101, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[5, 12, -22, -100, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[5, 11, -29, -92, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[5, 10, -12, -129, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[5, 9, -11, -127, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[5, 8, -12, -121, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[5, 7, -23, -109, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[5, 6, -18, -106, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[5, 5, -14, -77, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[5, 4, -5, -129, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[5, 3, 0, -131, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[5, 2, -3, -123, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[5, 1, -17, -96, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[5, 0, -15, -96, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[6, 29, -2, -103, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[6, 28, -7, -104, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[6, 27, -15, -106, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[6, 26, -16, -116, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[6, 25, -12, -113, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[6, 24, -10, -106, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[6, 23, -10, -101, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[6, 22, -5, -112, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[6, 21, 1, -116, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[6, 20, 2, -108, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[6, 19, 0, -107, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[6, 18, -3, -102, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[6, 17, -10, -104, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[6, 16, -1, -107, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[6, 15, 2, -106, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[6, 14, -16, -107, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[6, 13, -14, -107, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[6, 12, -13, -103, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[6, 11, -5, -104, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[6, 10, -2, -105, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[6, 9, -5, -104, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[6, 8, -18, -111, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[6, 7, -14, -110, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[6, 6, -12, -105, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[6, 5, -11, -103, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[6, 4, -1, -111, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[6, 3, 5, -111, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[6, 2, -7, -105, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[6, 1, -8, -106, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[6, 0, -9, -101, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[7, 29, 2, -104, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[7, 28, 3, -104, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[7, 27, 4, -103, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[7, 26, 5, -103, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[7, 25, 5, -103, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[7, 24, 4, -104, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[7, 23, -15, -93, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[7, 22, -16, -92, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[7, 21, -17, -92, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[7, 20, -18, -92, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[7, 19, -18, -93, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[7, 18, -16, -93, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[7, 17, -20, -102, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[7, 16, -20, -103, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[7, 15, -20, -103, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[7, 14, -19, -103, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[7, 13, -19, -103, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[7, 12, -19, -103, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[7, 11, -9, -105, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[7, 10, -8, -105, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[7, 9, -7, -105, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[7, 8, -6, -105, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[7, 7, -6, -105, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[7, 6, -7, -105, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[7, 5, -21, -97, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[7, 4, -22, -97, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[7, 3, -22, -97, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[7, 2, -22, -98, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[7, 1, -22, -98, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[7, 0, -22, -98, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[8, 29, -9, -110, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[8, 28, -7, -105, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[8, 27, -6, -106, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[8, 26, -8, -110, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[8, 25, -7, -104, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[8, 24, -7, -105, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[8, 23, -3, -94, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[8, 22, -5, -91, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[8, 21, -6, -89, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[8, 20, -5, -94, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[8, 19, -6, -91, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[8, 18, -5, -88, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[8, 17, -24, -100, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[8, 16, -22, -97, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[8, 15, -25, -97, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[8, 14, -24, -100, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[8, 13, -22, -97, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[8, 12, -25, -95, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[8, 11, -20, -106, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[8, 10, -17, -102, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[8, 9, -18, -103, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[8, 8, -19, -107, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[8, 7, -17, -102, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[8, 6, -19, -102, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[8, 5, -15, -95, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[8, 4, -15, -93, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[8, 3, -18, -91, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[8, 2, -17, -95, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[8, 1, -16, -92, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[8, 0, -17, -90, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[9, 24, -7, -111, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[9, 23, -10, -97, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[9, 22, 7, -89, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[9, 21, -15, -127, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[9, 20, -17, -126, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[9, 19, -5, -90, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[9, 18, -7, -125, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[9, 17, -21, -119, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[9, 16, -2, -125, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[9, 15, 4, -119, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[9, 14, -27, -99, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[9, 13, 19, -110, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[9, 12, 18, -112, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[9, 11, -9, -122, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[9, 10, -17, -117, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[9, 9, -22, -107, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[9, 8, 11, -100, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[9, 7, 20, -99, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[9, 6, -14, -124, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[9, 5, -21, -121, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[9, 4, -20, -93, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[9, 3, 11, -120, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[9, 2, 2, -120, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[9, 1, -5, -122, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[9, 0, -6, -116, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[20, 28, -7, -100, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[20, 27, -4, -109, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[20, 26, -3, -113, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: []
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[20, 25, -5, -142, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[20, 24, -5, -148, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[20, 23, -6, -77, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[20, 22, -9, -100, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[20, 21, -10, -116, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[20, 20, -10, -126, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[20, 19, -8, -129, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[20, 18, -8, -123, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[20, 17, -31, -88, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[20, 16, -20, -106, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[20, 15, -7, -115, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[20, 14, -15, -127, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[20, 13, -24, -137, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[20, 12, -34, -136, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[20, 11, -23, -96, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[20, 10, -14, -109, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[20, 9, -7, -114, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[20, 8, -8, -128, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[20, 7, -16, -143, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[20, 6, -23, -145, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[20, 5, -22, -80, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[20, 4, -15, -102, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[20, 3, -11, -117, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[20, 2, -14, -127, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[20, 1, -20, -132, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[20, 0, -26, -127, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[10, 24, -11, -97, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[10, 23, -3, -112, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[10, 22, -5, -120, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[10, 21, -8, -117, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[10, 20, 1, -116, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[10, 19, -2, -68, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[10, 18, -8, -110, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[10, 17, -10, -134, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[10, 16, -6, -145, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[10, 15, -14, -136, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[10, 14, -35, -80, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[10, 13, 2, -120, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[10, 12, 8, -128, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[10, 11, 18, -129, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[10, 10, 11, -129, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[10, 9, -29, -91, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[10, 8, 4, -116, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[10, 7, 5, -123, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[10, 6, 13, -114, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[10, 5, 12, -121, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[10, 4, -23, -71, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[10, 3, -5, -123, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[10, 2, 1, -133, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[10, 1, 12, -138, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[10, 0, 2, -136, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[19, 29, -6, -108, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[19, 28, -6, -104, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[19, 27, -5, -104, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[19, 26, -6, -108, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[19, 25, -7, -104, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[19, 24, -8, -102, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[19, 23, -6, -92, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[19, 22, -7, -90, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[19, 21, -8, -87, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[19, 20, -6, -92, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[19, 19, -6, -91, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[19, 18, -5, -86, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[19, 17, -24, -100, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[19, 16, -22, -97, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[19, 15, -25, -96, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[19, 14, -25, -100, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[19, 13, -21, -97, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[19, 12, -24, -93, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[19, 11, -18, -106, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[19, 10, -16, -101, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[19, 9, -17, -102, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[19, 8, -19, -106, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[19, 7, -16, -102, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[19, 6, -19, -99, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[19, 5, -17, -94, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[19, 4, -16, -92, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[19, 3, -19, -90, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[19, 2, -19, -94, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[19, 1, -16, -93, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[19, 0, -16, -88, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[21, 29, 5, -104, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[21, 28, 12, -122, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[21, 27, 15, -119, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[21, 26, 12, -114, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[21, 25, 3, -115, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[21, 24, 3, -108, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[21, 23, -18, -78, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[21, 22, -24, -63, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[21, 21, -27, -45, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[21, 20, -25, -41, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[21, 19, -15, -58, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[21, 18, -16, -75, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[21, 17, -32, -97, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[21, 16, -64, -102, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[21, 15, -79, -93, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[21, 14, -78, -87, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[21, 13, -63, -91, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[21, 12, -39, -96, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[21, 11, -16, -104, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[21, 10, -34, -120, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[21, 9, -42, -116, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[21, 8, -43, -110, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[21, 7, -39, -110, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[21, 6, -23, -107, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[21, 5, -32, -86, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[21, 4, -60, -78, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[21, 3, -73, -64, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[21, 2, -70, -58, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[21, 1, -53, -70, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[21, 0, -36, -84, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[11, 24, -11, -123, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[11, 23, -9, -127, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[11, 22, -10, -107, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[11, 21, -12, -102, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[11, 20, -17, -98, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[11, 19, -2, -130, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[11, 18, -4, -127, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[11, 17, -3, -100, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[11, 16, -1, -78, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[11, 15, 4, -77, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[11, 14, -5, -123, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[11, 13, -11, -125, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[11, 12, -16, -101, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[11, 11, -31, -87, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[11, 10, -29, -81, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[11, 9, -8, -122, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[11, 8, -10, -126, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[11, 7, -15, -104, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[11, 6, -27, -97, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[11, 5, -29, -91, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[11, 4, -2, -127, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[11, 3, -7, -126, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[11, 2, -10, -99, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[11, 1, -20, -80, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[11, 0, -14, -76, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[12, 29, -5, -109, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[12, 28, -5, -112, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[12, 27, -10, -104, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[12, 26, -9, -126, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[12, 25, -14, -134, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[12, 24, -4, -104, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[12, 23, -8, -96, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[12, 22, -8, -87, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[12, 21, -2, -91, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[12, 20, -3, -134, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[12, 19, 1, -139, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[12, 18, -10, -91, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[12, 17, -21, -103, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[12, 16, -32, -100, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[12, 15, -21, -95, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[12, 14, -1, -128, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[12, 13, -5, -132, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[12, 12, -22, -98, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[12, 11, -15, -108, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[12, 10, -23, -109, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[12, 9, -19, -100, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[12, 8, -4, -125, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[12, 7, -10, -132, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[12, 6, -14, -102, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[12, 5, -17, -98, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[12, 4, -25, -91, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[12, 3, -12, -92, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[12, 2, -2, -131, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[12, 1, -3, -135, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[12, 0, -18, -93, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[13, 29, -7, -108, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[13, 28, -8, -105, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[13, 27, -9, -103, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[13, 26, -12, -108, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[13, 25, -9, -114, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[13, 24, -10, -110, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[13, 23, -5, -103, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[13, 22, -4, -96, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[13, 21, -3, -100, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[13, 20, -3, -112, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[13, 19, -3, -105, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[13, 18, -3, -102, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[13, 17, -13, -105, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[13, 16, -18, -99, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[13, 15, -8, -102, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[13, 14, -3, -107, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[13, 13, -18, -107, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[13, 12, -16, -104, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[13, 11, -10, -107, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[13, 10, -15, -103, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[13, 9, -8, -102, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[13, 8, -8, -107, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[13, 7, -15, -111, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[13, 6, -14, -107, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[13, 5, -9, -103, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[13, 4, -12, -96, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[13, 3, -4, -101, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[13, 2, -1, -109, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[13, 1, -11, -105, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[13, 0, -10, -102, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[14, 29, -8, -101, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[14, 28, -8, -112, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[14, 27, -6, -130, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[14, 26, -4, -128, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[14, 25, -3, -128, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[14, 24, -4, -106, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[14, 23, -4, -76, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[14, 22, -4, -106, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[14, 21, -6, -132, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[14, 20, -8, -138, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[14, 19, -10, -135, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[14, 18, -9, -101, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[14, 17, -32, -87, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[14, 16, -15, -107, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[14, 15, -6, -131, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[14, 14, -5, -135, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[14, 13, -3, -133, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[14, 12, -14, -104, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[14, 11, -26, -96, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[14, 10, -13, -110, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[14, 9, -7, -130, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[14, 8, -2, -130, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[14, 7, -3, -130, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[14, 6, -10, -106, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[14, 5, -22, -79, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[14, 4, -11, -106, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[14, 3, -9, -132, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[14, 2, -8, -138, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[14, 1, -5, -136, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[14, 0, -12, -102, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[15, 29, -5, -98, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[15, 28, -7, -107, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[15, 27, -10, -114, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[15, 26, -13, -119, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[15, 25, -14, -116, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[15, 24, -14, -110, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[15, 23, -8, -86, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[15, 22, -5, -103, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[15, 21, -3, -116, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[15, 20, -1, -121, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[15, 19, 1, -118, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[15, 18, 0, -112, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[15, 17, -19, -93, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[15, 16, -12, -104, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[15, 15, -7, -112, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[15, 14, -6, -116, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[15, 13, -7, -113, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[15, 12, -7, -106, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[15, 11, -14, -97, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[15, 10, -10, -106, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[15, 9, -8, -113, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[15, 8, -10, -116, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[15, 7, -11, -113, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[15, 6, -11, -107, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[15, 5, -16, -89, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[15, 4, -9, -103, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[15, 3, -2, -114, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[15, 2, -1, -118, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[15, 1, 0, -115, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[15, 0, 0, -108, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[16, 29, -7, -94, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[16, 28, 14, -90, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[16, 27, 12, -98, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[16, 26, -15, -97, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[16, 25, -30, -108, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[16, 24, -7, -117, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[16, 23, -6, -100, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[16, 22, -28, -93, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[16, 21, -28, -92, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[16, 20, 3, -100, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[16, 19, 14, -81, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[16, 18, -7, -48, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[16, 17, -2, -96, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[16, 16, -3, -103, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[16, 15, -11, -106, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[16, 14, -5, -95, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[16, 13, -33, -83, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[16, 12, -75, -82, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[16, 11, -3, -94, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[16, 10, 11, -99, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[16, 9, 5, -105, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[16, 8, -12, -95, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[16, 7, -43, -96, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[16, 6, -55, -107, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[16, 5, -3, -98, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[16, 4, -21, -101, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[16, 3, -24, -101, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[16, 2, 2, -97, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[16, 1, -11, -77, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[16, 0, -54, -58, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[17, 29, -6, -111, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[17, 28, -6, -111, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[17, 27, -6, -111, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[17, 26, -6, -111, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[17, 25, -6, -111, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[17, 24, -6, -111, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[17, 23, -6, -102, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[17, 22, -6, -102, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[17, 21, -6, -102, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[17, 20, -6, -102, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[17, 19, -6, -102, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[17, 18, -6, -102, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[17, 17, -18, -106, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[17, 16, -18, -106, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[17, 15, -18, -106, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[17, 14, -18, -106, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[17, 13, -18, -106, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[17, 12, -18, -106, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[17, 11, -13, -110, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[17, 10, -13, -109, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[17, 9, -13, -109, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[17, 8, -13, -109, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[17, 7, -13, -109, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[17, 6, -13, -110, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[17, 5, -13, -103, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[17, 4, -13, -103, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[17, 3, -13, -103, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[17, 2, -13, -103, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[17, 1, -13, -103, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[17, 0, -13, -103, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[18, 29, -16, -103, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[18, 28, -11, -104, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[18, 27, -5, -105, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[18, 26, -4, -105, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[18, 25, -7, -104, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[18, 24, -12, -104, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[18, 23, 4, -100, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[18, 22, -2, -101, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[18, 21, -7, -102, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[18, 20, -8, -102, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[18, 19, -5, -102, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[18, 18, -1, -101, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[18, 17, -12, -96, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[18, 16, -11, -100, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[18, 15, -11, -104, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[18, 14, -11, -104, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[18, 13, -11, -102, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[18, 12, -12, -99, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[18, 11, -16, -99, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[18, 10, -12, -102, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[18, 9, -8, -105, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[18, 8, -7, -105, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[18, 7, -9, -104, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[18, 6, -13, -101, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[18, 5, -2, -96, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[18, 4, -6, -100, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[18, 3, -10, -102, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[18, 2, -10, -103, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[18, 1, -8, -102, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[18, 0, -5, -99, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[22, 17, 8, -103, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[22, 16, 6, -98, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[22, 15, 10, -97, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[22, 14, 8, -102, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[22, 13, 6, -97, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[22, 12, 10, -97, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[22, 11, 1, -108, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[22, 10, 2, -103, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[22, 9, 4, -103, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[22, 8, 3, -108, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[22, 7, 2, -102, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[22, 6, 4, -103, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[22, 5, 6, -97, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[22, 4, 3, -94, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[22, 3, 5, -91, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[22, 2, 5, -96, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[22, 1, 3, -93, 0]]
	},
	{
		aR: [ - 15, -30, 30, 30],
		bR: [ - 10, -25, 20, 20],
		fA: [[22, 0, 6, -91, 0]]
	}],
	c = [{
		loop: !1,
		frames: [[0, 0, 0, 0], [1, 0, 0, 0], [2, 0, 0, 0], [3, 0, 0, 0], [4, 0, 0, 0], [5, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[6, 0, 0, 0], [7, 0, 0, 0], [8, 0, 0, 0], [9, 0, 0, 0], [10, 0, 0, 0], [11, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[12, 0, 0, 0], [13, 0, 0, 0], [14, 0, 0, 0], [15, 0, 0, 0], [16, 0, 0, 0], [17, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[18, 0, 0, 0], [19, 0, 0, 0], [20, 0, 0, 0], [21, 0, 0, 0], [22, 0, 0, 0], [23, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[24, 0, 0, 0], [25, 0, 0, 0], [26, 0, 0, 0], [27, 0, 0, 0], [28, 0, 0, 0], [29, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[30, 0, 0, 0], [31, 0, 0, 0], [32, 0, 0, 0], [33, 0, 0, 0], [34, 0, 0, 0], [35, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[36, 0, 0, 0], [37, 0, 0, 0], [38, 0, 0, 0], [39, 0, 0, 0], [40, 0, 0, 0], [41, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[42, 0, 0, 0], [43, 0, 0, 0], [44, 0, 0, 0], [45, 0, 0, 0], [46, 0, 0, 0], [47, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[48, 0, 0, 0], [49, 0, 0, 0], [50, 0, 0, 0], [51, 0, 0, 0], [52, 0, 0, 0], [53, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[54, 0, 0, 0], [55, 0, 0, 0], [56, 0, 0, 0], [57, 0, 0, 0], [58, 0, 0, 0], [59, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[60, 0, 0, 0], [61, 0, 0, 0], [62, 0, 0, 0], [63, 0, 0, 0], [64, 0, 0, 0], [65, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[66, 0, 0, 0], [67, 0, 0, 0], [68, 0, 0, 0], [69, 0, 0, 0], [70, 0, 0, 0], [71, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[72, 0, 0, 0], [73, 0, 0, 0], [74, 0, 0, 0], [75, 0, 0, 0], [76, 0, 0, 0], [77, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[78, 0, 0, 0], [79, 0, 0, 0], [80, 0, 0, 0], [81, 0, 0, 0], [82, 0, 0, 0], [83, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[84, 0, 0, 0], [85, 0, 0, 0], [86, 0, 0, 0], [87, 0, 0, 0], [88, 0, 0, 0], [89, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[90, 0, 0, 0], [91, 0, 0, 0], [92, 0, 0, 0], [93, 0, 0, 0], [94, 0, 0, 0], [95, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[96, 0, 0, 0], [97, 0, 0, 0], [98, 0, 0, 0], [99, 0, 0, 0], [100, 0, 0, 0], [101, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[102, 0, 0, 0], [103, 0, 0, 0], [104, 0, 0, 0], [105, 0, 0, 0], [106, 0, 0, 0], [107, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[108, 0, 0, 0], [109, 0, 0, 0], [110, 0, 0, 0], [111, 0, 0, 0], [112, 0, 0, 0], [113, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[114, 0, 0, 0], [115, 0, 0, 0], [116, 0, 0, 0], [117, 0, 0, 0], [118, 0, 0, 0], [119, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[120, 0, 0, 0], [121, 0, 0, 0], [122, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[123, 0, 0, 0], [124, 0, 0, 0], [125, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[126, 0, 0, 0], [127, 0, 0, 0], [128, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[129, 0, 0, 0], [130, 0, 0, 0], [131, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[132, 0, 0, 0], [133, 0, 0, 0], [134, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[135, 0, 0, 0], [136, 0, 0, 0], [137, 0, 0, 0], [138, 0, 0, 0], [139, 0, 0, 0], [140, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[141, 0, 0, 0], [142, 0, 0, 0], [143, 0, 0, 0], [144, 0, 0, 0], [145, 0, 0, 0], [146, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[147, 0, 0, 0], [148, 0, 0, 0], [149, 0, 0, 0], [150, 0, 0, 0], [151, 0, 0, 0], [152, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[153, 0, 0, 0], [154, 0, 0, 0], [155, 0, 0, 0], [156, 0, 0, 0], [157, 0, 0, 0], [158, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[159, 0, 0, 0], [160, 0, 0, 0], [161, 0, 0, 0], [162, 0, 0, 0], [163, 0, 0, 0], [164, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[165, 0, 0, 0], [166, 0, 0, 0], [167, 0, 0, 0], [168, 0, 0, 0], [169, 0, 0, 0], [170, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[171, 0, 0, 0], [172, 0, 0, 0], [173, 0, 0, 0], [174, 0, 0, 0], [175, 0, 0, 0], [176, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[177, 0, 0, 0], [178, 0, 0, 0], [179, 0, 0, 0], [180, 0, 0, 0], [181, 0, 0, 0], [182, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[183, 0, 0, 0], [184, 0, 0, 0], [185, 0, 0, 0], [186, 0, 0, 0], [187, 0, 0, 0], [188, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[189, 0, 0, 0], [190, 0, 0, 0], [191, 0, 0, 0], [192, 0, 0, 0], [193, 0, 0, 0], [194, 0, 0, 0]]
	},
	{
		loop: !0,
		frames: [[195, 0, 0, 0], [196, 0, 0, 0], [197, 0, 0, 0], [198, 0, 0, 0], [199, 0, 0, 0], [200, 0, 0, 0]]
	},
	{
		loop: !0,
		frames: [[201, 0, 0, 0], [202, 0, 0, 0], [203, 0, 0, 0], [204, 0, 0, 0], [205, 0, 0, 0], [206, 0, 0, 0]]
	},
	{
		loop: !0,
		frames: [[207, 0, 0, 0], [208, 0, 0, 0], [209, 0, 0, 0], [210, 0, 0, 0], [211, 0, 0, 0], [212, 0, 0, 0]]
	},
	{
		loop: !0,
		frames: [[213, 0, 0, 0], [214, 0, 0, 0], [215, 0, 0, 0], [216, 0, 0, 0], [217, 0, 0, 0], [218, 0, 0, 0]]
	},
	{
		loop: !0,
		frames: [[219, 0, 0, 0], [220, 0, 0, 0], [221, 0, 0, 0], [222, 0, 0, 0], [223, 0, 0, 0], [224, 0, 0, 0]]
	},
	{
		loop: !0,
		frames: [[225, 0, 0, 0], [226, 0, 0, 0], [227, 0, 0, 0], [228, 0, 0, 0], [229, 0, 0, 0], [230, 0, 0, 0]]
	},
	{
		loop: !0,
		frames: [[231, 0, 0, 0], [232, 0, 0, 0], [233, 0, 0, 0], [234, 0, 0, 0], [235, 0, 0, 0], [236, 0, 0, 0]]
	},
	{
		loop: !0,
		frames: [[237, 0, 0, 0], [238, 0, 0, 0], [239, 0, 0, 0], [240, 0, 0, 0], [241, 0, 0, 0], [242, 0, 0, 0]]
	},
	{
		loop: !0,
		frames: [[243, 0, 0, 0], [244, 0, 0, 0], [245, 0, 0, 0], [246, 0, 0, 0], [247, 0, 0, 0], [248, 0, 0, 0]]
	},
	{
		loop: !0,
		frames: [[249, 0, 0, 0], [250, 0, 0, 0], [251, 0, 0, 0], [252, 0, 0, 0], [253, 0, 0, 0], [254, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[255, 0, 0, 0], [256, 0, 0, 0], [257, 0, 0, 0], [258, 0, 0, 0], [259, 0, 0, 9]]
	},
	{
		loop: !1,
		frames: [[260, 0, 0, 0], [261, 0, 0, 0], [262, 0, 0, 0], [263, 0, 0, 0], [264, 0, 0, 9]]
	},
	{
		loop: !1,
		frames: [[265, 0, 0, 0], [266, 0, 0, 0], [267, 0, 0, 0], [268, 0, 0, 0], [269, 0, 0, 9]]
	},
	{
		loop: !1,
		frames: [[270, 0, 0, 0], [271, 0, 0, 0], [272, 0, 0, 0], [273, 0, 0, 0], [274, 0, 0, 9]]
	},
	{
		loop: !1,
		frames: [[275, 0, 0, 0], [276, 0, 0, 0], [277, 0, 0, 0], [278, 0, 0, 0], [279, 0, 0, 9]]
	},
	{
		loop: !1,
		frames: [[280, 0, 0, 0], [281, 0, 0, 0], [282, 0, 0, 0], [283, 0, 0, 0], [284, 0, 0, 0], [285, 0, 0, 9]]
	},
	{
		loop: !1,
		frames: [[286, 0, 0, 0], [287, 0, 0, 0], [288, 0, 0, 0], [289, 0, 0, 0], [290, 0, 0, 0], [291, 0, 0, 9]]
	},
	{
		loop: !1,
		frames: [[292, 0, 0, 0], [293, 0, 0, 0], [294, 0, 0, 0], [295, 0, 0, 0], [296, 0, 0, 0], [297, 0, 0, 9]]
	},
	{
		loop: !1,
		frames: [[298, 0, 0, 0], [299, 0, 0, 0], [300, 0, 0, 0], [301, 0, 0, 0], [302, 0, 0, 0], [303, 0, 0, 9]]
	},
	{
		loop: !1,
		frames: [[304, 0, 0, 0], [305, 0, 0, 0], [306, 0, 0, 0], [307, 0, 0, 0], [308, 0, 0, 0], [309, 0, 0, 9]]
	},
	{
		loop: !1,
		frames: [[310, 0, 0, 0], [311, 0, 0, 0], [312, 0, 0, 0], [313, 0, 0, 0], [314, 0, 0, 9]]
	},
	{
		loop: !1,
		frames: [[315, 0, 0, 0], [316, 0, 0, 0], [317, 0, 0, 0], [318, 0, 0, 0], [319, 0, 0, 9]]
	},
	{
		loop: !1,
		frames: [[320, 0, 0, 0], [321, 0, 0, 0], [322, 0, 0, 0], [323, 0, 0, 0], [324, 0, 0, 9]]
	},
	{
		loop: !1,
		frames: [[325, 0, 0, 0], [326, 0, 0, 0], [327, 0, 0, 0], [328, 0, 0, 0], [329, 0, 0, 9]]
	},
	{
		loop: !1,
		frames: [[330, 0, 0, 0], [331, 0, 0, 0], [332, 0, 0, 0], [333, 0, 0, 0], [334, 0, 0, 9]]
	},
	{
		loop: !0,
		frames: [[335, 0, 0, 0], [336, 0, 0, 0], [337, 0, 0, 0], [338, 0, 0, 0], [339, 0, 0, 0], [340, 0, 0, 0]]
	},
	{
		loop: !0,
		frames: [[341, 0, 0, 0], [342, 0, 0, 0], [343, 0, 0, 0], [344, 0, 0, 0], [345, 0, 0, 0], [346, 0, 0, 0]]
	},
	{
		loop: !0,
		frames: [[347, 0, 0, 0], [348, 0, 0, 0], [349, 0, 0, 0], [350, 0, 0, 0], [351, 0, 0, 0], [352, 0, 0, 0]]
	},
	{
		loop: !0,
		frames: [[353, 0, 0, 0], [354, 0, 0, 0], [355, 0, 0, 0], [356, 0, 0, 0], [357, 0, 0, 0], [358, 0, 0, 0]]
	},
	{
		loop: !0,
		frames: [[359, 0, 0, 0], [360, 0, 0, 0], [361, 0, 0, 0], [362, 0, 0, 0], [363, 0, 0, 0], [364, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[365, 0, 0, 0], [366, 0, 0, 0], [367, 0, 0, 0], [368, 0, 0, 0], [369, 0, 0, 0], [370, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[371, 0, 0, 0], [372, 0, 0, 0], [373, 0, 0, 0], [374, 0, 0, 0], [375, 0, 0, 0], [376, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[377, 0, 0, 0], [378, 0, 0, 0], [379, 0, 0, 0], [380, 0, 0, 0], [381, 0, 0, 0], [382, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[383, 0, 0, 0], [384, 0, 0, 0], [385, 0, 0, 0], [386, 0, 0, 0], [387, 0, 0, 0], [388, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[389, 0, 0, 0], [390, 0, 0, 0], [391, 0, 0, 0], [392, 0, 0, 0], [393, 0, 0, 0], [394, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[135, 0, 0, 0], [136, 0, 0, 0], [137, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[141, 0, 0, 0], [142, 0, 0, 0], [143, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[147, 0, 0, 0], [148, 0, 0, 0], [149, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[153, 0, 0, 0], [154, 0, 0, 0], [155, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[159, 0, 0, 0], [160, 0, 0, 0], [161, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[395, 0, 0, 0], [396, 0, 0, 0], [397, 0, 0, 0], [398, 0, 0, 0], [399, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[400, 0, 0, 0], [401, 0, 0, 0], [402, 0, 0, 0], [403, 0, 0, 0], [404, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[405, 0, 0, 0], [406, 0, 0, 0], [407, 0, 0, 0], [408, 0, 0, 0], [409, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[410, 0, 0, 0], [411, 0, 0, 0], [412, 0, 0, 0], [413, 0, 0, 0], [414, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[415, 0, 0, 0], [416, 0, 0, 0], [417, 0, 0, 0], [418, 0, 0, 0], [419, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[420, 0, 0, 0], [421, 0, 0, 0], [422, 0, 0, 0], [423, 0, 0, 0], [424, 0, 0, 0], [425, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[426, 0, 0, 0], [427, 0, 0, 0], [428, 0, 0, 0], [429, 0, 0, 0], [430, 0, 0, 0], [431, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[432, 0, 0, 0], [433, 0, 0, 0], [434, 0, 0, 0], [435, 0, 0, 0], [436, 0, 0, 0], [437, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[438, 0, 0, 0], [439, 0, 0, 0], [440, 0, 0, 0], [441, 0, 0, 0], [442, 0, 0, 0], [443, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[444, 0, 0, 0], [445, 0, 0, 0], [446, 0, 0, 0], [447, 0, 0, 0], [448, 0, 0, 0], [449, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[450, 0, 0, 0], [451, 0, 0, 0], [452, 0, 0, 0], [453, 0, 0, 0], [454, 0, 0, 0], [455, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[456, 0, 0, 0], [457, 0, 0, 0], [458, 0, 0, 0], [459, 0, 0, 0], [460, 0, 0, 0], [461, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[462, 0, 0, 0], [463, 0, 0, 0], [464, 0, 0, 0], [465, 0, 0, 0], [466, 0, 0, 0], [467, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[468, 0, 0, 0], [469, 0, 0, 0], [470, 0, 0, 0], [471, 0, 0, 0], [472, 0, 0, 0], [473, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[474, 0, 0, 0], [475, 0, 0, 0], [476, 0, 0, 0], [477, 0, 0, 0], [478, 0, 0, 0], [479, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[480, 0, 0, 0], [481, 0, 0, 0], [482, 0, 0, 0], [483, 0, 0, 0], [484, 0, 0, 0], [485, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[486, 0, 0, 0], [487, 0, 0, 0], [488, 0, 0, 0], [489, 0, 0, 0], [490, 0, 0, 0], [491, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[492, 0, 0, 0], [493, 0, 0, 0], [494, 0, 0, 0], [495, 0, 0, 0], [496, 0, 0, 0], [497, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[498, 0, 0, 0], [499, 0, 0, 0], [500, 0, 0, 0], [501, 0, 0, 0], [502, 0, 0, 0], [503, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[504, 0, 0, 0], [505, 0, 0, 0], [506, 0, 0, 0], [507, 0, 0, 0], [508, 0, 0, 0], [509, 0, 0, 0]]
	},
	{
		loop: !0,
		frames: [[510, 0, 0, 0], [511, 0, 0, 0], [512, 0, 0, 0], [513, 0, 0, 0], [514, 0, 0, 0], [515, 0, 0, 0]]
	},
	{
		loop: !0,
		frames: [[516, 0, 0, 0], [517, 0, 0, 0], [518, 0, 0, 0], [519, 0, 0, 0], [520, 0, 0, 0], [521, 0, 0, 0]]
	},
	{
		loop: !0,
		frames: [[522, 0, 0, 0], [523, 0, 0, 0], [524, 0, 0, 0], [525, 0, 0, 0], [526, 0, 0, 0], [527, 0, 0, 0]]
	},
	{
		loop: !0,
		frames: [[528, 0, 0, 0], [529, 0, 0, 0], [530, 0, 0, 0], [531, 0, 0, 0], [532, 0, 0, 0], [533, 0, 0, 0]]
	},
	{
		loop: !0,
		frames: [[534, 0, 0, 0], [535, 0, 0, 0], [536, 0, 0, 0], [537, 0, 0, 0], [538, 0, 0, 0], [539, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[540, 0, 0, 0], [541, 0, 0, 0], [542, 0, 0, 0], [543, 0, 0, 0], [544, 0, 0, 0], [545, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[546, 0, 0, 0], [547, 0, 0, 0], [548, 0, 0, 0], [549, 0, 0, 0], [550, 0, 0, 0], [551, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[552, 0, 0, 0], [553, 0, 0, 0], [554, 0, 0, 0], [555, 0, 0, 0], [556, 0, 0, 0], [557, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[558, 0, 0, 0], [559, 0, 0, 0], [560, 0, 0, 0], [561, 0, 0, 0], [562, 0, 0, 0], [563, 0, 0, 0]]
	},
	{
		loop: !1,
		frames: [[564, 0, 0, 0], [565, 0, 0, 0], [566, 0, 0, 0], [567, 0, 0, 0], [568, 0, 0, 0], [569, 0, 0, 0]]
	},
	{
		loop: !0,
		frames: [[570, 0, 0, 0], [571, 0, 0, 0], [572, 0, 0, 0], [573, 0, 0, 0], [574, 0, 0, 0], [575, 0, 0, 0]]
	},
	{
		loop: !0,
		frames: [[576, 0, 0, 0], [577, 0, 0, 0], [578, 0, 0, 0], [579, 0, 0, 0], [580, 0, 0, 0], [581, 0, 0, 0]]
	},
	{
		loop: !0,
		frames: [[582, 0, 0, 0], [583, 0, 0, 0], [584, 0, 0, 0], [585, 0, 0, 0], [586, 0, 0, 0], [587, 0, 0, 0]]
	},
	{
		loop: !0,
		frames: [[588, 0, 0, 0], [589, 0, 0, 0], [590, 0, 0, 0], [591, 0, 0, 0], [592, 0, 0, 0], [593, 0, 0, 0]]
	},
	{
		loop: !0,
		frames: [[594, 0, 0, 0], [595, 0, 0, 0], [596, 0, 0, 0], [597, 0, 0, 0], [598, 0, 0, 0], [599, 0, 0, 0]]
	},
	{
		loop: !0,
		frames: [[600, 0, 0, 0], [601, 0, 0, 0], [602, 0, 0, 0], [603, 0, 0, 0], [604, 0, 0, 0], [605, 0, 0, 0]]
	},
	{
		loop: !0,
		frames: [[606, 0, 0, 0], [607, 0, 0, 0], [608, 0, 0, 0], [609, 0, 0, 0], [610, 0, 0, 0], [611, 0, 0, 0]]
	},
	{
		loop: !0,
		frames: [[612, 0, 0, 0], [613, 0, 0, 0], [614, 0, 0, 0], [615, 0, 0, 0], [616, 0, 0, 0], [617, 0, 0, 0]]
	},
	{
		loop: !0,
		frames: [[618, 0, 0, 0], [619, 0, 0, 0], [620, 0, 0, 0], [621, 0, 0, 0], [622, 0, 0, 0], [623, 0, 0, 0]]
	},
	{
		loop: !0,
		frames: [[624, 0, 0, 0], [625, 0, 0, 0], [626, 0, 0, 0], [627, 0, 0, 0], [628, 0, 0, 0], [629, 0, 0, 0]]
	},
	{
		loop: !0,
		frames: [[630, 0, 0, 0], [631, 0, 0, 0], [632, 0, 0, 0], [633, 0, 0, 0], [634, 0, 0, 0], [635, 0, 0, 0]]
	},
	{
		loop: !0,
		frames: [[636, 0, 0, 0], [637, 0, 0, 0], [638, 0, 0, 0], [639, 0, 0, 0], [640, 0, 0, 0], [641, 0, 0, 0]]
	},
	{
		loop: !0,
		frames: [[642, 0, 0, 0], [643, 0, 0, 0], [644, 0, 0, 0], [645, 0, 0, 0], [646, 0, 0, 0], [647, 0, 0, 0]]
	}];
	player11NameSpace.get = function(d, e) {
		return new g.action.role([], 0, 0, 0, e ? e: h, a, b, (0 <= d && c[d] ? [c[d]] : c) || c)
	};
	player11 = player11NameSpace.get()
})(jsGame);
var sceneDataNameSpace = {},
sceneDataMapping; (function(g) {
	g.pushImage([{
		id: "bgtile02_0",
		src: gl.getImgSrc("img/tiles/bgtile02_0.jpg")
	},
	{
		id: "bgtile02_1",
		src: gl.getImgSrc("img/tiles/bgtile02_1.jpg")
	},
	{
		id: "bgtile02_3",
		src: gl.getImgSrc("img/tiles/bgtile02_3.jpg")
	},
	{
		id: "bgtile02_4",
		src: gl.getImgSrc("img/tiles/bgtile02_4.jpg")
	},
	{
		id: "bgtile02_5",
		src: gl.getImgSrc("img/tiles/bgtile02_5.jpg")
	},
	{
		id: "bgtile02_6",
		src: gl.getImgSrc("img/tiles/bgtile02_6.jpg")
	},
	{
		id: "bgtile02_7",
		src: gl.getImgSrc("img/tiles/bgtile02_7.jpg")
	},
	{
		id: "bgtile02_8",
		src: gl.getImgSrc("img/tiles/bgtile02_8.jpg")
	},
	{
		id: "bgtile03_2",
		src: gl.getImgSrc("img/tiles/bgtile03_2.jpg")
	}]);
	sceneDataMapping = {
		tiles: {
			i217: {
				imageid: "bgtile02_0",
				sx: 0,
				sy: 0
			},
			i218: {
				imageid: "bgtile02_0",
				sx: 120,
				sy: 0
			},
			i219: {
				imageid: "bgtile02_0",
				sx: 240,
				sy: 0
			},
			i220: {
				imageid: "bgtile02_0",
				sx: 360,
				sy: 0
			},
			i221: {
				imageid: "bgtile02_0",
				sx: 480,
				sy: 0
			},
			i222: {
				imageid: "bgtile02_0",
				sx: 600,
				sy: 0
			},
			i223: {
				imageid: "bgtile02_0",
				sx: 0,
				sy: 120
			},
			i224: {
				imageid: "bgtile02_0",
				sx: 120,
				sy: 120
			},
			i225: {
				imageid: "bgtile02_0",
				sx: 240,
				sy: 120
			},
			i226: {
				imageid: "bgtile02_0",
				sx: 360,
				sy: 120
			},
			i227: {
				imageid: "bgtile02_0",
				sx: 480,
				sy: 120
			},
			i228: {
				imageid: "bgtile02_0",
				sx: 600,
				sy: 120
			},
			i229: {
				imageid: "bgtile02_0",
				sx: 0,
				sy: 240
			},
			i230: {
				imageid: "bgtile02_0",
				sx: 120,
				sy: 240
			},
			i231: {
				imageid: "bgtile02_0",
				sx: 240,
				sy: 240
			},
			i232: {
				imageid: "bgtile02_0",
				sx: 360,
				sy: 240
			},
			i233: {
				imageid: "bgtile02_0",
				sx: 480,
				sy: 240
			},
			i234: {
				imageid: "bgtile02_0",
				sx: 600,
				sy: 240
			},
			i235: {
				imageid: "bgtile02_0",
				sx: 0,
				sy: 360
			},
			i236: {
				imageid: "bgtile02_0",
				sx: 120,
				sy: 360
			},
			i237: {
				imageid: "bgtile02_0",
				sx: 240,
				sy: 360
			},
			i238: {
				imageid: "bgtile02_0",
				sx: 360,
				sy: 360
			},
			i239: {
				imageid: "bgtile02_0",
				sx: 480,
				sy: 360
			},
			i240: {
				imageid: "bgtile02_0",
				sx: 600,
				sy: 360
			},
			i241: {
				imageid: "bgtile02_1",
				sx: 0,
				sy: 0
			},
			i242: {
				imageid: "bgtile02_1",
				sx: 120,
				sy: 0
			},
			i243: {
				imageid: "bgtile02_1",
				sx: 240,
				sy: 0
			},
			i244: {
				imageid: "bgtile02_1",
				sx: 360,
				sy: 0
			},
			i245: {
				imageid: "bgtile02_1",
				sx: 480,
				sy: 0
			},
			i246: {
				imageid: "bgtile02_1",
				sx: 600,
				sy: 0
			},
			i247: {
				imageid: "bgtile02_1",
				sx: 0,
				sy: 120
			},
			i248: {
				imageid: "bgtile02_1",
				sx: 120,
				sy: 120
			},
			i249: {
				imageid: "bgtile02_1",
				sx: 240,
				sy: 120
			},
			i250: {
				imageid: "bgtile02_1",
				sx: 360,
				sy: 120
			},
			i251: {
				imageid: "bgtile02_1",
				sx: 480,
				sy: 120
			},
			i252: {
				imageid: "bgtile02_1",
				sx: 600,
				sy: 120
			},
			i253: {
				imageid: "bgtile02_1",
				sx: 0,
				sy: 240
			},
			i254: {
				imageid: "bgtile02_1",
				sx: 120,
				sy: 240
			},
			i255: {
				imageid: "bgtile02_1",
				sx: 240,
				sy: 240
			},
			i256: {
				imageid: "bgtile02_1",
				sx: 360,
				sy: 240
			},
			i257: {
				imageid: "bgtile02_1",
				sx: 480,
				sy: 240
			},
			i258: {
				imageid: "bgtile02_1",
				sx: 600,
				sy: 240
			},
			i259: {
				imageid: "bgtile02_1",
				sx: 0,
				sy: 360
			},
			i260: {
				imageid: "bgtile02_1",
				sx: 120,
				sy: 360
			},
			i261: {
				imageid: "bgtile02_1",
				sx: 240,
				sy: 360
			},
			i262: {
				imageid: "bgtile02_1",
				sx: 360,
				sy: 360
			},
			i263: {
				imageid: "bgtile02_1",
				sx: 480,
				sy: 360
			},
			i264: {
				imageid: "bgtile02_1",
				sx: 600,
				sy: 360
			},
			i265: {
				imageid: "bgtile02_3",
				sx: 0,
				sy: 0
			},
			i266: {
				imageid: "bgtile02_3",
				sx: 120,
				sy: 0
			},
			i267: {
				imageid: "bgtile02_3",
				sx: 240,
				sy: 0
			},
			i268: {
				imageid: "bgtile02_3",
				sx: 360,
				sy: 0
			},
			i269: {
				imageid: "bgtile02_3",
				sx: 480,
				sy: 0
			},
			i270: {
				imageid: "bgtile02_3",
				sx: 600,
				sy: 0
			},
			i271: {
				imageid: "bgtile02_3",
				sx: 0,
				sy: 120
			},
			i272: {
				imageid: "bgtile02_3",
				sx: 120,
				sy: 120
			},
			i273: {
				imageid: "bgtile02_3",
				sx: 240,
				sy: 120
			},
			i274: {
				imageid: "bgtile02_3",
				sx: 360,
				sy: 120
			},
			i275: {
				imageid: "bgtile02_3",
				sx: 480,
				sy: 120
			},
			i276: {
				imageid: "bgtile02_3",
				sx: 600,
				sy: 120
			},
			i277: {
				imageid: "bgtile02_3",
				sx: 0,
				sy: 240
			},
			i278: {
				imageid: "bgtile02_3",
				sx: 120,
				sy: 240
			},
			i279: {
				imageid: "bgtile02_3",
				sx: 240,
				sy: 240
			},
			i280: {
				imageid: "bgtile02_3",
				sx: 360,
				sy: 240
			},
			i281: {
				imageid: "bgtile02_3",
				sx: 480,
				sy: 240
			},
			i282: {
				imageid: "bgtile02_3",
				sx: 600,
				sy: 240
			},
			i283: {
				imageid: "bgtile02_3",
				sx: 0,
				sy: 360
			},
			i284: {
				imageid: "bgtile02_3",
				sx: 120,
				sy: 360
			},
			i285: {
				imageid: "bgtile02_3",
				sx: 240,
				sy: 360
			},
			i286: {
				imageid: "bgtile02_3",
				sx: 360,
				sy: 360
			},
			i287: {
				imageid: "bgtile02_3",
				sx: 480,
				sy: 360
			},
			i288: {
				imageid: "bgtile02_3",
				sx: 600,
				sy: 360
			},
			i289: {
				imageid: "bgtile03_2",
				sx: 0,
				sy: 0
			},
			i290: {
				imageid: "bgtile03_2",
				sx: 120,
				sy: 0
			},
			i291: {
				imageid: "bgtile03_2",
				sx: 240,
				sy: 0
			},
			i292: {
				imageid: "bgtile03_2",
				sx: 360,
				sy: 0
			},
			i293: {
				imageid: "bgtile03_2",
				sx: 480,
				sy: 0
			},
			i294: {
				imageid: "bgtile03_2",
				sx: 600,
				sy: 0
			},
			i295: {
				imageid: "bgtile03_2",
				sx: 0,
				sy: 120
			},
			i296: {
				imageid: "bgtile03_2",
				sx: 120,
				sy: 120
			},
			i297: {
				imageid: "bgtile03_2",
				sx: 240,
				sy: 120
			},
			i298: {
				imageid: "bgtile03_2",
				sx: 360,
				sy: 120
			},
			i299: {
				imageid: "bgtile03_2",
				sx: 480,
				sy: 120
			},
			i300: {
				imageid: "bgtile03_2",
				sx: 600,
				sy: 120
			},
			i301: {
				imageid: "bgtile03_2",
				sx: 0,
				sy: 240
			},
			i302: {
				imageid: "bgtile03_2",
				sx: 120,
				sy: 240
			},
			i303: {
				imageid: "bgtile03_2",
				sx: 240,
				sy: 240
			},
			i304: {
				imageid: "bgtile03_2",
				sx: 360,
				sy: 240
			},
			i305: {
				imageid: "bgtile03_2",
				sx: 480,
				sy: 240
			},
			i306: {
				imageid: "bgtile03_2",
				sx: 600,
				sy: 240
			},
			i307: {
				imageid: "bgtile03_2",
				sx: 0,
				sy: 360
			},
			i308: {
				imageid: "bgtile03_2",
				sx: 120,
				sy: 360
			},
			i309: {
				imageid: "bgtile03_2",
				sx: 240,
				sy: 360
			},
			i310: {
				imageid: "bgtile03_2",
				sx: 360,
				sy: 360
			},
			i311: {
				imageid: "bgtile03_2",
				sx: 480,
				sy: 360
			},
			i312: {
				imageid: "bgtile03_2",
				sx: 600,
				sy: 360
			},
			i313: {
				imageid: "bgtile02_4",
				sx: 0,
				sy: 0
			},
			i314: {
				imageid: "bgtile02_4",
				sx: 120,
				sy: 0
			},
			i315: {
				imageid: "bgtile02_4",
				sx: 240,
				sy: 0
			},
			i316: {
				imageid: "bgtile02_4",
				sx: 360,
				sy: 0
			},
			i317: {
				imageid: "bgtile02_4",
				sx: 480,
				sy: 0
			},
			i318: {
				imageid: "bgtile02_4",
				sx: 600,
				sy: 0
			},
			i319: {
				imageid: "bgtile02_4",
				sx: 0,
				sy: 120
			},
			i320: {
				imageid: "bgtile02_4",
				sx: 120,
				sy: 120
			},
			i321: {
				imageid: "bgtile02_4",
				sx: 240,
				sy: 120
			},
			i322: {
				imageid: "bgtile02_4",
				sx: 360,
				sy: 120
			},
			i323: {
				imageid: "bgtile02_4",
				sx: 480,
				sy: 120
			},
			i324: {
				imageid: "bgtile02_4",
				sx: 600,
				sy: 120
			},
			i325: {
				imageid: "bgtile02_4",
				sx: 0,
				sy: 240
			},
			i326: {
				imageid: "bgtile02_4",
				sx: 120,
				sy: 240
			},
			i327: {
				imageid: "bgtile02_4",
				sx: 240,
				sy: 240
			},
			i328: {
				imageid: "bgtile02_4",
				sx: 360,
				sy: 240
			},
			i329: {
				imageid: "bgtile02_4",
				sx: 480,
				sy: 240
			},
			i330: {
				imageid: "bgtile02_4",
				sx: 600,
				sy: 240
			},
			i331: {
				imageid: "bgtile02_4",
				sx: 0,
				sy: 360
			},
			i332: {
				imageid: "bgtile02_4",
				sx: 120,
				sy: 360
			},
			i333: {
				imageid: "bgtile02_4",
				sx: 240,
				sy: 360
			},
			i334: {
				imageid: "bgtile02_4",
				sx: 360,
				sy: 360
			},
			i335: {
				imageid: "bgtile02_4",
				sx: 480,
				sy: 360
			},
			i336: {
				imageid: "bgtile02_4",
				sx: 600,
				sy: 360
			},
			i337: {
				imageid: "bgtile02_5",
				sx: 0,
				sy: 0
			},
			i338: {
				imageid: "bgtile02_5",
				sx: 120,
				sy: 0
			},
			i339: {
				imageid: "bgtile02_5",
				sx: 240,
				sy: 0
			},
			i340: {
				imageid: "bgtile02_5",
				sx: 360,
				sy: 0
			},
			i341: {
				imageid: "bgtile02_5",
				sx: 480,
				sy: 0
			},
			i342: {
				imageid: "bgtile02_5",
				sx: 600,
				sy: 0
			},
			i343: {
				imageid: "bgtile02_5",
				sx: 0,
				sy: 120
			},
			i344: {
				imageid: "bgtile02_5",
				sx: 120,
				sy: 120
			},
			i345: {
				imageid: "bgtile02_5",
				sx: 240,
				sy: 120
			},
			i346: {
				imageid: "bgtile02_5",
				sx: 360,
				sy: 120
			},
			i347: {
				imageid: "bgtile02_5",
				sx: 480,
				sy: 120
			},
			i348: {
				imageid: "bgtile02_5",
				sx: 600,
				sy: 120
			},
			i349: {
				imageid: "bgtile02_5",
				sx: 0,
				sy: 240
			},
			i350: {
				imageid: "bgtile02_5",
				sx: 120,
				sy: 240
			},
			i351: {
				imageid: "bgtile02_5",
				sx: 240,
				sy: 240
			},
			i352: {
				imageid: "bgtile02_5",
				sx: 360,
				sy: 240
			},
			i353: {
				imageid: "bgtile02_5",
				sx: 480,
				sy: 240
			},
			i354: {
				imageid: "bgtile02_5",
				sx: 600,
				sy: 240
			},
			i355: {
				imageid: "bgtile02_5",
				sx: 0,
				sy: 360
			},
			i356: {
				imageid: "bgtile02_5",
				sx: 120,
				sy: 360
			},
			i357: {
				imageid: "bgtile02_5",
				sx: 240,
				sy: 360
			},
			i358: {
				imageid: "bgtile02_5",
				sx: 360,
				sy: 360
			},
			i359: {
				imageid: "bgtile02_5",
				sx: 480,
				sy: 360
			},
			i360: {
				imageid: "bgtile02_5",
				sx: 600,
				sy: 360
			},
			i361: {
				imageid: "bgtile02_6",
				sx: 0,
				sy: 0
			},
			i362: {
				imageid: "bgtile02_6",
				sx: 120,
				sy: 0
			},
			i363: {
				imageid: "bgtile02_6",
				sx: 240,
				sy: 0
			},
			i364: {
				imageid: "bgtile02_6",
				sx: 360,
				sy: 0
			},
			i365: {
				imageid: "bgtile02_6",
				sx: 480,
				sy: 0
			},
			i366: {
				imageid: "bgtile02_6",
				sx: 600,
				sy: 0
			},
			i367: {
				imageid: "bgtile02_6",
				sx: 0,
				sy: 120
			},
			i368: {
				imageid: "bgtile02_6",
				sx: 120,
				sy: 120
			},
			i369: {
				imageid: "bgtile02_6",
				sx: 240,
				sy: 120
			},
			i370: {
				imageid: "bgtile02_6",
				sx: 360,
				sy: 120
			},
			i371: {
				imageid: "bgtile02_6",
				sx: 480,
				sy: 120
			},
			i372: {
				imageid: "bgtile02_6",
				sx: 600,
				sy: 120
			},
			i373: {
				imageid: "bgtile02_6",
				sx: 0,
				sy: 240
			},
			i374: {
				imageid: "bgtile02_6",
				sx: 120,
				sy: 240
			},
			i375: {
				imageid: "bgtile02_6",
				sx: 240,
				sy: 240
			},
			i376: {
				imageid: "bgtile02_6",
				sx: 360,
				sy: 240
			},
			i377: {
				imageid: "bgtile02_6",
				sx: 480,
				sy: 240
			},
			i378: {
				imageid: "bgtile02_6",
				sx: 600,
				sy: 240
			},
			i379: {
				imageid: "bgtile02_6",
				sx: 0,
				sy: 360
			},
			i380: {
				imageid: "bgtile02_6",
				sx: 120,
				sy: 360
			},
			i381: {
				imageid: "bgtile02_6",
				sx: 240,
				sy: 360
			},
			i382: {
				imageid: "bgtile02_6",
				sx: 360,
				sy: 360
			},
			i383: {
				imageid: "bgtile02_6",
				sx: 480,
				sy: 360
			},
			i384: {
				imageid: "bgtile02_6",
				sx: 600,
				sy: 360
			},
			i385: {
				imageid: "bgtile02_7",
				sx: 0,
				sy: 0
			},
			i386: {
				imageid: "bgtile02_7",
				sx: 120,
				sy: 0
			},
			i387: {
				imageid: "bgtile02_7",
				sx: 240,
				sy: 0
			},
			i388: {
				imageid: "bgtile02_7",
				sx: 360,
				sy: 0
			},
			i389: {
				imageid: "bgtile02_7",
				sx: 480,
				sy: 0
			},
			i390: {
				imageid: "bgtile02_7",
				sx: 600,
				sy: 0
			},
			i391: {
				imageid: "bgtile02_7",
				sx: 0,
				sy: 120
			},
			i392: {
				imageid: "bgtile02_7",
				sx: 120,
				sy: 120
			},
			i393: {
				imageid: "bgtile02_7",
				sx: 240,
				sy: 120
			},
			i394: {
				imageid: "bgtile02_7",
				sx: 360,
				sy: 120
			},
			i395: {
				imageid: "bgtile02_7",
				sx: 480,
				sy: 120
			},
			i396: {
				imageid: "bgtile02_7",
				sx: 600,
				sy: 120
			},
			i397: {
				imageid: "bgtile02_7",
				sx: 0,
				sy: 240
			},
			i398: {
				imageid: "bgtile02_7",
				sx: 120,
				sy: 240
			},
			i399: {
				imageid: "bgtile02_7",
				sx: 240,
				sy: 240
			},
			i400: {
				imageid: "bgtile02_7",
				sx: 360,
				sy: 240
			},
			i401: {
				imageid: "bgtile02_7",
				sx: 480,
				sy: 240
			},
			i402: {
				imageid: "bgtile02_7",
				sx: 600,
				sy: 240
			},
			i403: {
				imageid: "bgtile02_7",
				sx: 0,
				sy: 360
			},
			i404: {
				imageid: "bgtile02_7",
				sx: 120,
				sy: 360
			},
			i405: {
				imageid: "bgtile02_7",
				sx: 240,
				sy: 360
			},
			i406: {
				imageid: "bgtile02_7",
				sx: 360,
				sy: 360
			},
			i407: {
				imageid: "bgtile02_7",
				sx: 480,
				sy: 360
			},
			i408: {
				imageid: "bgtile02_7",
				sx: 600,
				sy: 360
			},
			i409: {
				imageid: "bgtile02_8",
				sx: 0,
				sy: 0
			},
			i410: {
				imageid: "bgtile02_8",
				sx: 120,
				sy: 0
			},
			i411: {
				imageid: "bgtile02_8",
				sx: 240,
				sy: 0
			},
			i412: {
				imageid: "bgtile02_8",
				sx: 360,
				sy: 0
			},
			i413: {
				imageid: "bgtile02_8",
				sx: 480,
				sy: 0
			},
			i414: {
				imageid: "bgtile02_8",
				sx: 600,
				sy: 0
			},
			i415: {
				imageid: "bgtile02_8",
				sx: 0,
				sy: 120
			},
			i416: {
				imageid: "bgtile02_8",
				sx: 120,
				sy: 120
			},
			i417: {
				imageid: "bgtile02_8",
				sx: 240,
				sy: 120
			},
			i418: {
				imageid: "bgtile02_8",
				sx: 360,
				sy: 120
			},
			i419: {
				imageid: "bgtile02_8",
				sx: 480,
				sy: 120
			},
			i420: {
				imageid: "bgtile02_8",
				sx: 600,
				sy: 120
			},
			i421: {
				imageid: "bgtile02_8",
				sx: 0,
				sy: 240
			},
			i422: {
				imageid: "bgtile02_8",
				sx: 120,
				sy: 240
			},
			i423: {
				imageid: "bgtile02_8",
				sx: 240,
				sy: 240
			},
			i424: {
				imageid: "bgtile02_8",
				sx: 360,
				sy: 240
			},
			i425: {
				imageid: "bgtile02_8",
				sx: 480,
				sy: 240
			},
			i426: {
				imageid: "bgtile02_8",
				sx: 600,
				sy: 240
			},
			i427: {
				imageid: "bgtile02_8",
				sx: 0,
				sy: 360
			},
			i428: {
				imageid: "bgtile02_8",
				sx: 120,
				sy: 360
			},
			i429: {
				imageid: "bgtile02_8",
				sx: 240,
				sy: 360
			},
			i430: {
				imageid: "bgtile02_8",
				sx: 360,
				sy: 360
			},
			i431: {
				imageid: "bgtile02_8",
				sx: 480,
				sy: 360
			},
			i432: {
				imageid: "bgtile02_8",
				sx: 600,
				sy: 360
			}
		},
		role: {
			mp1: {
				getData: function() {
					return basketballNameSpace.get()
				}
			},
			mp2: {
				getData: function() {
					return basketballNameSpace.get()
				}
			},
			mp1001: {
				getData: function() {
					return body_whiteNameSpace.get()
				}
			},
			mp2001: {
				getData: function() {
					return player01NameSpace.get()
				}
			}
		},
		npc: {},
		building: {
			mp1: {
				getData: function() {
					return buildings01NameSpace.get(0)
				}
			},
			mp70001: {
				getData: function() {
					return buildings01NameSpace.get(0)
				}
			},
			mp70002: {
				getData: function() {
					return buildings01NameSpace.get(1)
				}
			},
			mp70003: {
				getData: function() {
					return buildings01NameSpace.get(2)
				}
			},
			mp70004: {
				getData: function() {
					return buildings01NameSpace.get(3)
				}
			}
		},
		effect: {
			mp1: {
				getData: function() {
					return effects01NameSpace.get(0)
				}
			},
			mp80001: {
				getData: function() {
					return effects01NameSpace.get(0)
				}
			},
			mp80002: {
				getData: function() {
					return effects01NameSpace.get(1)
				}
			},
			mp80003: {
				getData: function() {
					return effects01NameSpace.get(2)
				}
			},
			mp80004: {
				getData: function() {
					return effects01NameSpace.get(3)
				}
			},
			mp80005: {
				getData: function() {
					return effects01NameSpace.get(4)
				}
			},
			mp80006: {
				getData: function() {
					return effects01NameSpace.get(5)
				}
			},
			mp80007: {
				getData: function() {
					return effects01NameSpace.get(6)
				}
			},
			mp80008: {
				getData: function() {
					return effects01NameSpace.get(7)
				}
			},
			mp80009: {
				getData: function() {
					return effects01NameSpace.get(8)
				}
			},
			mp80010: {
				getData: function() {
					return effects01NameSpace.get(9)
				}
			},
			mp80011: {
				getData: function() {
					return effects01NameSpace.get(10)
				}
			},
			mp80012: {
				getData: function() {
					return effects01NameSpace.get(11)
				}
			},
			mp80013: {
				getData: function() {
					return effects01NameSpace.get(12)
				}
			},
			mp80014: {
				getData: function() {
					return effects01NameSpace.get(13)
				}
			},
			mp80015: {
				getData: function() {
					return effects01NameSpace.get(14)
				}
			},
			mp80016: {
				getData: function() {
					return effects01NameSpace.get(15)
				}
			}
		}
	}
})(jsGame);
var roundsGroupsDataNameSpace = {}; (function() {
	roundsGroupsDataNameSpace.getGroup = function(g) {
		switch (g) {
		case 1:
			return '[{"ms":900,"type":"roundsEnd","id":24}]';
		default:
			return "[]"
		}
	};
	roundsGroupsDataNameSpace.getRoleLinks = function(g) {
		switch (g) {
		default:
			return {
				role:
				body_whiteNameSpace.get(),
				links: [player01NameSpace.get()]
			};
		case 101:
			return {
				role:
				body_redNameSpace.get(),
				links: [player01NameSpace.get()]
			};
		case 102:
			return {
				role:
				body_redNameSpace.get(),
				links: [player02NameSpace.get()]
			};
		case 103:
			return {
				role:
				body_redNameSpace.get(),
				links: [player03NameSpace.get()]
			};
		case 104:
			return {
				role:
				body_redNameSpace.get(),
				links: [player04NameSpace.get()]
			};
		case 105:
			return {
				role:
				body_redNameSpace.get(),
				links: [player05NameSpace.get()]
			};
		case 106:
			return {
				role:
				body_redNameSpace.get(),
				links: [player06NameSpace.get()]
			};
		case 107:
			return {
				role:
				body_redNameSpace.get(),
				links: [player07NameSpace.get()]
			};
		case 108:
			return {
				role:
				body_redNameSpace.get(),
				links: [player08NameSpace.get()]
			};
		case 109:
			return {
				role:
				body_redNameSpace.get(),
				links: [player09NameSpace.get()]
			};
		case 110:
			return {
				role:
				body_redNameSpace.get(),
				links: [player10NameSpace.get()]
			};
		case 111:
			return {
				role:
				body_redNameSpace.get(),
				links: [player11NameSpace.get()]
			};
		case 201:
			return {
				role:
				body_whiteNameSpace.get(),
				links: [player01NameSpace.get()]
			};
		case 202:
			return {
				role:
				body_whiteNameSpace.get(),
				links: [player02NameSpace.get()]
			};
		case 203:
			return {
				role:
				body_whiteNameSpace.get(),
				links: [player03NameSpace.get()]
			};
		case 204:
			return {
				role:
				body_whiteNameSpace.get(),
				links: [player04NameSpace.get()]
			};
		case 205:
			return {
				role:
				body_whiteNameSpace.get(),
				links: [player05NameSpace.get()]
			};
		case 206:
			return {
				role:
				body_whiteNameSpace.get(),
				links: [player06NameSpace.get()]
			};
		case 207:
			return {
				role:
				body_whiteNameSpace.get(),
				links: [player07NameSpace.get()]
			};
		case 208:
			return {
				role:
				body_whiteNameSpace.get(),
				links: [player08NameSpace.get()]
			};
		case 209:
			return {
				role:
				body_whiteNameSpace.get(),
				links: [player09NameSpace.get()]
			};
		case 210:
			return {
				role:
				body_whiteNameSpace.get(),
				links: [player10NameSpace.get()]
			};
		case 211:
			return {
				role:
				body_whiteNameSpace.get(),
				links: [player11NameSpace.get()]
			}
		}
	}
})(link); (function(g) {
	var h = [];
	notifyId = 0;
	notify = {
		observers: {},
		type: {
			addTimer: notifyId++,
			removeTimer: notifyId++,
			clearTimers: notifyId++,
			callReConnectMsgWindow: notifyId++,
			alert: notifyId++,
			confirm: notifyId++,
			callPopMsgUI: notifyId++,
			showNoticeMsgNotify: notifyId++,
			callLogoutAccount: notifyId++,
			login: notifyId++,
			loginEcho: notifyId++,
			resisterResourceChange: notifyId++,
			unResisterResourceChange: notifyId++,
			echoUserBasicInfo: notifyId++,
			getOpenLvsEcho: notifyId++,
			closeAllWindow: notifyId++,
			callMainMenu: notifyId++,
			showAlertNotify: notifyId++,
			showLVAlertNotify: notifyId++,
			callMarqueeUI: notifyId++,
			showMarqueeMsgNotify: notifyId++,
			prompt: notifyId++,
			getBattleInfo: notifyId++,
			callBattleTotalEntranceWindow: notifyId++,
			playMusic: notifyId++,
			toggleAudio: notifyId++,
			loadCompleted: notifyId++,
			callClientRecharge: notifyId++,
			changeClientServer: notifyId++,
			logoutClient: notifyId++,
			handleMsgFromObjC: notifyId++,
			showJumpAlertMsgNotify: notifyId++,
			callShiftServer: notifyId++
		},
		notify: function(a, b) {
			var c = notify.type[a]; (c || 0 == c) && notify.observers[c] && notify.observers[c].notify(b)
		},
		register: function(a, b) {
			var c = notify.type[a];
			if (c || 0 == c) notify.observers[c] || (notify.observers[c] = new g.classes.observer),
			"function" == typeof b ? g.commandFuns.registerNotify(notify.observers[c], b) : 0 < b.length && g.commandFuns.rangeRegisterNotify(notify.observers[c], b)
		},
		unregister: function(a, b) {
			var c = notify.type[a];
			if ((c || 0 == c) && notify.observers[c] && 0 <= b) {
				var d = notify.observers[c].group.length;
				0 < d && d > b && notify.observers[c].group.splice(b, 1)
			}
		},
		observers: []
	};
	notify.register("resisterResourceChange",
	function(a) {
		h.push(a)
	});
	notify.register("unResisterResourceChange",
	function(a) {
		a = h.indexOf(a);
		h.splice(a, 1)
	});
	notify.register("echoUserBasicInfo",
	function(a) {
		a = g.objExtend({
			data: []
		},
		a || {}).data[0] || [];
		statics.basicUserInfo.id = a[0];
		statics.basicUserInfo.code = a[1];
		statics.basicUserInfo.name = a[2];
		statics.basicUserInfo.level = a[3];
		statics.basicUserInfo.vipLevel = a[4];
		statics.basicUserInfo.exp = a[5];
		statics.basicUserInfo.goldCoin = a[6];
		statics.basicUserInfo.diamond = a[7];
		statics.basicUserInfo.wishDiamond = a[8];
		statics.basicUserInfo.soulDiamond = a[9];
		statics.basicUserInfo.friendship = a[10];
		statics.basicUserInfo.vigor = a[11];
		statics.basicUserInfo.scoop = a[12];
		statics.basicUserInfo.peakedNess = a[13];
		statics.basicUserInfo.honor = a[14];
		statics.basicUserInfo.totalExp = a[15];
		statics.basicUserInfo.maxVigor = a[16];
		statics.basicUserInfo.maxStrength = a[17];
		statics.basicUserInfo.strength = a[18];
		statics.basicUserInfo.note = a[19];
		statics.basicUserInfo.superNote = a[20];
		h.forEach(function(a) {
			a && a.refreshResource(statics.basicUserInfo)
		})
	});
	notify.register("getOpenLvsEcho",
	function(a) {
		for (var a = g.objExtend({
			data: []
		},
		a || {}).data[0] || [], b = 0, c; c = a[b]; b++) mappings.openLvsMapping["mp" + c[0]] = {
			activityId: c[0],
			lv: c[2],
			name: c[1]
		}
	});
	notify.register("addTimer",
	function(a) {
		a = g.objExtend({
			id: "",
			second: 0,
			data: null,
			callBack: null
		},
		a || {});
		model.timerCtrl && model.timerCtrl.addTimer(a.id, a.second, a.data, a.callBack)
	});
	notify.register("removeTimer",
	function(a) {
		a = g.objExtend({
			id: ""
		},
		a || {});
		model.timerCtrl && model.timerCtrl.removeTimer(a.id)
	});
	notify.register("clearTimers",
	function() {
		model.timerCtrl && model.timerCtrl.clearTimers()
	});
	notify.register("callReConnectMsgWindow",
	function(a) {
		a = g.objExtend({
			method: "open",
			desc: ""
		},
		a || {});
		"open" == a.method ? (model.ui.reConnectMsgWindowCtrl || (model.reConnectMsgWindowModel.closed = function() {
			model.ui.reConnectMsgWindowCtrl = null
		},
		model.ui.reConnectMsgWindowCtrl = new ctrl.classes.ReConnectMsgWindow(new view.classes.ReConnectMsgWindow(model.reConnectMsgWindowModel))), model.ui.reConnectMsgWindowCtrl.update(a.desc).refresh()) : model.ui.reConnectMsgWindowCtrl && model.ui.reConnectMsgWindowCtrl.closeWindow();
		a = null
	});
	notify.register("alert",
	function(a) {
		if (gl.sys.callIn999) return ! 1;
		var b = statics.getMapping("buttons", 13),
		c = statics.getMapping("buttons", 3),
		a = g.objExtend({
			id: "",
			width: 500,
			height: 320,
			contextHeight: 260,
			contextPadding: "30px",
			fontSize: "14px",
			color: "#333",
			title: "\u63d0\u793a\u4fe1\u606f",
			msg: "",
			msgFontSize: "20px",
			msgColor: "#CCC",
			textAlign: "left",
			block: !0,
			showTool: !0,
			blockColor: "rgba(0, 0, 0, 0.5)",
			lineHeight: "24px",
			x: -1,
			y: -1,
			btnDx: 150,
			btnDy: 5,
			hided: !1,
			padding: 0,
			bgColor: "",
			tiles: [],
			background: gl.getImgUrl("img/UI_Notice_01.png") + " no-repeat",
			closeBtnUi: {
				id: b.ui.id,
				sx: b.ui.sx,
				sy: b.ui.sy,
				hx: b.ui.hx,
				hy: b.ui.hy,
				w: b.width,
				h: b.height,
				dx: 15,
				dy: -15
			},
			yesBtnMsg: "\u786e\u5b9a",
			yesBtnUi: {
				id: c.ui.id,
				sx: c.ui.sx,
				sy: c.ui.sy,
				hx: c.ui.hx,
				hy: c.ui.hy,
				w: c.width,
				h: c.height
			},
			closed: function() {},
			data: null,
			windowIconType: -1,
			style: gl.sys.alertStyle,
			zIndex: 10000002
		},
		a || {});
		a.title = '<div style="padding:10px;text-align:center;font-size:18px;color:#FFF;">' + a.title + "</div>";
		a.msg = '<div style="padding:25px 15px 5px 15px;height:' + (a.contextHeight - 30) + 'px;font-size:18px;">' + a.msg + "</div>";
		g.ui.alert(a);
		b = c = a = null
	});
	notify.register("confirm",
	function(a) {
		var b = statics.getMapping("buttons", 13),
		c = statics.getMapping("buttons", 3),
		a = g.objExtend({
			id: "",
			width: 500,
			height: 320,
			contextHeight: 260,
			contextPadding: "30px",
			fontSize: "14px",
			color: "#333",
			title: "\u786e\u8ba4\u4fe1\u606f",
			msg: "",
			msgFontSize: "20px",
			msgColor: "#CCC",
			textAlign: "left",
			block: !0,
			showTool: !0,
			blockColor: "rgba(0, 0, 0, 0.5)",
			lineHeight: "24px",
			x: -1,
			y: -1,
			btnsMargin: 10,
			btnDx: 72,
			btnDy: 5,
			hided: !1,
			padding: 0,
			bgColor: "",
			tiles: [],
			background: gl.getImgUrl("img/UI_Notice_01.png") + " no-repeat",
			closeBtnUi: {
				id: b.ui.id,
				sx: b.ui.sx,
				sy: b.ui.sy,
				hx: b.ui.hx,
				hy: b.ui.hy,
				w: b.width,
				h: b.height,
				dx: 15,
				dy: -15
			},
			yesValue: "\u786e\u5b9a",
			yesBtnUi: {
				id: c.ui.id,
				sx: c.ui.sx,
				sy: c.ui.sy,
				hx: c.ui.hx,
				hy: c.ui.hy,
				w: c.width,
				h: c.height
			},
			noValue: "\u53d6\u6d88",
			noBtnUi: {
				id: c.ui.id,
				sx: c.ui.sx,
				sy: c.ui.sy,
				hx: c.ui.hx,
				hy: c.ui.hy,
				w: c.width,
				h: c.height
			},
			closed: function() {},
			data: null,
			windowIconType: -1,
			style: gl.sys.alertStyle,
			zIndex: 2E7
		},
		a || {});
		a.title = '<div style="padding:10px;text-align:center;font-size:18px;color:#FFF;">' + a.title + "</div>";
		a.msg = '<div style="padding:25px 15px 5px 15px;height:' + (a.contextHeight - 30) + 'px;font-size:18px;">' + a.msg + "</div>";
		g.ui.confirm(a);
		b = c = a = null
	});
	notify.register("callMarqueeUI",
	function(a) {
		a = g.objExtend({
			id: "marqueeLbl",
			width: 780,
			height: 23,
			fontSize: "18px",
			fontFamily: "\u5fae\u8f6f\u96c5\u9ed1",
			fontWeight: "bold",
			color: "#FF0",
			textShadow: "",
			msg: "",
			msgWidth: -1,
			lineHeight: "23px",
			x: gl.sys.left + (gl.sys.w - 780 >> 1),
			y: gl.sys.top + 5,
			hided: !1,
			padding: 0,
			zIndex: 2E7,
			background: "rgba(0,0,0,0)",
			speed: 2,
			items: [],
			style: "normal",
			type: "normal",
			step: 1,
			loop: 0
		},
		a || {});
		"" != a.msg && g.ui.marquee(a)
	});
	notify.register("showMarqueeMsgNotify",
	function(a) {
		a = g.objExtend({
			data: []
		},
		a || {});
		notify.notify("callMarqueeUI", {
			msg: a.data + "\u3000",
			background: model.ui.smallChatCtrl ? "rgba(0,0,0,0)": "rgba(0,0,0,0.5)"
		})
	});
	notify.register("callPopMsgUI",
	function(a) {
		a = g.objExtend({
			fontSize: "26px",
			color: "#FFF000",
			dx: 0,
			dy: 0,
			msg: "",
			padding: 5,
			lineHeight: "30px",
			textAlign: "center",
			fontWeight: "bold",
			background: "",
			zIndex: 2E7
		},
		a || {});
		g.ui.popMsg(a)
	});
	notify.register("showNoticeMsgNotify",
	function(a) {
		a = g.objExtend({
			data: []
		},
		a || {});
		notify.notify("callPopMsgUI", {
			msg: a.data[0]
		})
	});
	notify.register("callLogoutAccount",
	function() {
		var a = window.WebViewJavascriptBridge;
		a ? a.sendMessage(JSON.stringify({
			cmd: 5
		})) : (window.onbeforeunload = null, location.href = window.LOGOUTURL ? window.LOGOUTURL: location.href)
	});
	notify.register("login",
	function(a) {
		a = g.objExtend({
			username: "",
			password: "",
			loginUserType: "",
			token: "",
			wzId: "",
			oneKeyType: ""
		},
		a || {});
		g.localStorage.getItem("SESSIONID") || g.localStorage.setItem("SESSIONID", statics.getTimeStamp());
		var b = g.localStorage.getItem("SESSIONID") || statics.getTimeStamp();
		im.send({
			protocol: "login",
			data: [a.username, a.password, a.loginUserType, a.token, b, a.wzId, a.oneKeyType]
		})
	});
	notify.register("loginEcho",
	function(a) {
		a = g.objExtend({
			data: []
		},
		a || {});
		1 == a.data[0] ? flow.setFlow("ready") : 2 == a.data[0] && (flow.setFlow("start"), notify.notify("openNameTeamWindow"))
	});
	notify.register("closeAllWindow",
	function(a) {
		var a = g.objExtend({
			except: {
				itemsInfoCtrl: !0
			}
		},
		a || {}),
		b,
		c;
		for (b in model.ui)(c = model.ui[b]) && (c.view && c.view.win && !("window" != c.view.win.type || a.except[b])) && c.view.win.closeBtn.click()
	});
	notify.register("callMainMenu",
	function() {});
	notify.register("showAlertNotify",
	function(a) {
		a = g.objExtend({
			data: []
		},
		a || {});
		0 > a.data[2] ? notify.notify("alert", {
			msg: a.data[0]
		}) : notify.notify("confirm", {
			msg: a.data[0],
			data: {
				activityId: a.data[2]
			},
			yesValue: a.data[1],
			yesCallBack: function(a) {
				statics.doActivity(a.data.activityId)
			}
		});
		a = null
	});
	notify.register("showLVAlertNotify",
	function(a) {
		a = g.objExtend({
			data: []
		},
		a || {});
		notify.notify("alert", {
			msg: a.data[0]
		});
		notify.notify("closeAllFactorys");
		notify.notify("openMainUIWindow")
	});
	notify.register("prompt",
	function(a) {
		var b = statics.getMapping("buttons", 13),
		c = statics.getMapping("buttons", 3),
		a = g.objExtend({
			id: "",
			width: 500,
			height: 320,
			contextHeight: 200,
			contextPadding: 30,
			fontSize: "14px",
			color: "#333",
			title: "\u8f93\u5165\u4fe1\u606f",
			msg: "",
			msgWidth: 430,
			msgHeight: 30,
			msgFontSize: "20px",
			msgColor: "#000",
			textAlign: "left",
			block: !0,
			showTool: !0,
			blockColor: "rgba(0, 0, 0, 0.5)",
			lineHeight: "24px",
			x: -1,
			y: -1,
			btnsMargin: 10,
			btnDx: 72,
			btnDy: 5,
			hided: !1,
			padding: 0,
			bgColor: "",
			tiles: [],
			background: gl.getImgUrl("img/UI_Notice_01.png") + " no-repeat",
			closeBtnUi: {
				id: b.ui.id,
				sx: b.ui.sx,
				sy: b.ui.sy,
				hx: b.ui.hx,
				hy: b.ui.hy,
				w: b.width,
				h: b.height,
				dx: 15,
				dy: -15
			},
			yesBtnMsg: "\u786e\u5b9a",
			yesBtnUi: {
				id: c.ui.id,
				sx: c.ui.sx,
				sy: c.ui.sy,
				hx: c.ui.hx,
				hy: c.ui.hy,
				w: c.width,
				h: c.height
			},
			noBtnMsg: "\u53d6\u6d88",
			noBtnUi: {
				id: c.ui.id,
				sx: c.ui.sx,
				sy: c.ui.sy,
				hx: c.ui.hx,
				hy: c.ui.hy,
				w: c.width,
				h: c.height
			},
			closed: function() {},
			data: null,
			windowIconType: -1,
			style: gl.sys.alertStyle,
			zIndex: 10000002,
			yesCallBack: function() {},
			noCallBack: function() {}
		},
		a || {});
		a.title = '<div style="padding:10px;text-align:center;font-size:18px;color:#FFF;">' + a.title + "</div>";
		g.ui.prompt(a);
		b = c = a = null
	});
	notify.register("getBattleInfo",
	function(a) {
		a = g.objExtend({
			id: 0
		},
		a || {});
		im.send({
			protocol: "getBattleInfo",
			data: [a.id]
		})
	});
	notify.register("callBattleTotalEntranceWindow",
	function() {
		notify.notify("closeAllFactorys");
		notify.notify("closeAllWindow");
		model.ui.battleTotalCtrl || (model.battleTotalEntranceModel.closed = function() {
			model.ui.battleTotalCtrl && (model.ui.battleTotalCtrl = null)
		},
		model.ui.battleTotalCtrl = new ctrl.classes.BattleTotalEntranceWindow(new view.classes.BattleTotalEntranceWindow(model.battleTotalEntranceModel)))
	});
	notify.register("playMusic",
	function() {
		var a;
		return function(b) {
			b = g.objExtend({
				sound: ""
			},
			b || {});
			a || (a = window.WebViewJavascriptBridge);
			a ? a.sendMessage(JSON.stringify({
				cmd: 2,
				sound: b.sound
			})) : "1" != g.localStorage.getItem("audioOpened") && g.audio.play("background")
		}
	} ());
	notify.register("toggleAudio",
	function() {
		var a;
		return function() {
			a || (a = window.WebViewJavascriptBridge);
			var b = g.localStorage.getItem("audioOpened");
			null == b && (b = "0", g.localStorage.setItem("audioOpened", "0"));
			a ? a.sendMessage(JSON.stringify({
				cmd: 3,
				value: b
			})) : "0" == b ? g.audio.pause("background") : g.audio.play("background");
			g.localStorage.setItem("audioOpened", "1" == b ? "0": "1")
		}
	} ());
	notify.register("callClientRecharge",
	function() {
		var a;
		return function(b) {
			var c = g.objExtend({
				orderId: 0,
				nickName: "",
				value: 0,
				give: 0,
				gameId: 0
			},
			b || {});
			a || (a = window.WebViewJavascriptBridge);
			if (a) a.sendMessage(JSON.stringify({
				cmd: 13,
				code: c.orderId,
				rolename: c.nickName,
				value: c.value,
				give: c.give,
				balance: statics.basicUserInfo.diamond
			}));
			else if (window.onbeforeunload = null, b = g.getDom("payFormDiv"), b || (b = document.createElement("div"), b.innerHTML = ['<form id="payForm" name="payForm" action="http://g.lanrenmb.com/slamdunk" method="post">', '   <input type="hidden" name="wz_id" value="' + window.SERVERWZID + '" />', '   <input type="hidden" name="money" value="' + parseInt(c.value) / 10 + '" />', '   <input type="hidden" name="game_money" value="' + (parseInt(c.value) + parseInt(c.give)) + '" />', '   <input type="hidden" name="user_code" value="' + window.SERVERUSERCODE + '" />', '   <input type="hidden" name="game_oid" value="' + c.orderId + '" />', '   <input type="hidden" name="role_name" value="' + statics.basicUserInfo.name + '" />', "</form>"].join(""), document.body.appendChild(b)), c = g.getDom("payForm")) c.submit(),
			b && document.body.removeChild(b)
		}
	} ());
	notify.register("changeClientServer",
	function() {
		var a;
		return function() {
			a || (a = window.WebViewJavascriptBridge);
			a ? a.sendMessage(JSON.stringify({
				cmd: 4
			})) : (window.onbeforeunload = null, location.href = window.REDIRECTURL ? window.REDIRECTURL: location.href)
		}
	} ());
	notify.register("logoutClient",
	function() {
		var a;
		return function() {
			a || (a = window.WebViewJavascriptBridge);
			a ? a.sendMessage(JSON.stringify({
				cmd: 5
			})) : (window.onbeforeunload = null, location.href = window.LOGOUTURL ? window.LOGOUTURL: location.href)
		}
	} ());
	notify.register("loadCompleted",
	function() {
		var a;
		return function() {
			if (!a && (a = window.WebViewJavascriptBridge)) a._handleMessageFromObjC = function(a) {
				a = JSON.parse(a);
				notify.notify("handleMsgFromObjC", {
					data: a
				})
			},
			a.sendMessage(JSON.stringify({
				cmd: 11
			}))
		}
	} ());
	notify.register("handleMsgFromObjC",
	function() {
		var a;
		return function(b) {
			b = g.objExtend({
				data: {}
			},
			b || {});
			a || (a = window.WebViewJavascriptBridge);
			if (a) switch (b.data.cmd) {
			case 18:
				window.scrollTo(0, 1)
			}
		}
	} ());
	notify.register("showJumpAlertMsgNotify",
	function(a) {
		notify.notify("callLoading", {
			method: "close"
		});
		im.close();
		a = g.objExtend({
			data: []
		},
		a || {});
		notify.notify("alert", {
			msg: a.data[0],
			closed: function() {
				notify.notify("changeClientServer")
			}
		});
		gl.sys.callIn999 = !0;
		a = null
	})
})(link); (function(g) {
	model = {};
	model.matchModel = {
		world: null,
		map: null,
		tw: 120,
		th: 120,
		ow: 120,
		oh: 120,
		scrollW: 10,
		scrollH: 10,
		nodeXStep: 2,
		nodeYStep: 2,
		font: "20px \u5fae\u8f6f\u96c5\u9ed1",
		font2: "16px \u5fae\u8f6f\u96c5\u9ed1",
		font3: "18px \u5fae\u8f6f\u96c5\u9ed1",
		font4: "50px \u5fae\u8f6f\u96c5\u9ed1",
		roleBubbleFont: "16px \u5fae\u8f6f\u96c5\u9ed1",
		numFont: "50px qianduanNet",
		roleStep: 0,
		newDate: null,
		data: null,
		ACTION: {
			SHOOT_N: 85,
			SHOOT_NE: -88,
			SHOOT_E: -87,
			SHOOT_SE: -89,
			SHOOT_S: 86,
			SHOOT_SW: 89,
			SHOOT_W: 87,
			SHOOT_NW: 88,
			OUTSHOOT_N: 90,
			OUTSHOOT_NE: -93,
			OUTSHOOT_E: -92,
			OUTSHOOT_SE: -94,
			OUTSHOOT_S: 91,
			OUTSHOOT_SW: 94,
			OUTSHOOT_W: 92,
			OUTSHOOT_NW: 93,
			HOOKSHOOT_N: 30,
			HOOKSHOOT_NE: -33,
			HOOKSHOOT_E: -32,
			HOOKSHOOT_SE: -34,
			HOOKSHOOT_S: 31,
			HOOKSHOOT_SW: 34,
			HOOKSHOOT_W: 32,
			HOOKSHOOT_NW: 33,
			LAYUPSHOOT_N: 80,
			LAYUPSHOOT_NE: -83,
			LAYUPSHOOT_E: -82,
			LAYUPSHOOT_SE: -84,
			LAYUPSHOOT_S: 81,
			LAYUPSHOOT_SW: 84,
			LAYUPSHOOT_W: 82,
			LAYUPSHOOT_NW: 83,
			PASS_N: 15,
			PASS_NE: -18,
			PASS_E: -17,
			PASS_SE: -19,
			PASS_S: 16,
			PASS_SW: 19,
			PASS_W: 17,
			PASS_NW: 18,
			CATCHBALL_N: 20,
			CATCHBALL_NE: -23,
			CATCHBALL_E: -22,
			CATCHBALL_SE: -24,
			CATCHBALL_S: 21,
			CATCHBALL_SW: 24,
			CATCHBALL_W: 22,
			CATCHBALL_NW: 23,
			JUMP_N: 25,
			JUMP_NE: -28,
			JUMP_E: -27,
			JUMP_SE: -29,
			JUMP_S: 26,
			JUMP_SW: 29,
			JUMP_W: 27,
			JUMP_NW: 28,
			REBOUNDJUMPUP_N: 70,
			REBOUNDJUMPUP_NE: -73,
			REBOUNDJUMPUP_E: -72,
			REBOUNDJUMPUP_SE: -74,
			REBOUNDJUMPUP_S: 71,
			REBOUNDJUMPUP_SW: 74,
			REBOUNDJUMPUP_W: 72,
			REBOUNDJUMPUP_NW: 73,
			GOTREBOUND_N: 75,
			GOTREBOUND_NE: -78,
			GOTREBOUND_E: -77,
			GOTREBOUND_SE: -79,
			GOTREBOUND_S: 76,
			GOTREBOUND_SW: 79,
			GOTREBOUND_W: 77,
			GOTREBOUND_NW: 78,
			BLOCK_N: 25,
			BLOCK_NE: -28,
			BLOCK_E: -27,
			BLOCK_SE: -29,
			BLOCK_S: 26,
			BLOCK_SW: 29,
			BLOCK_W: 27,
			BLOCK_NW: 28,
			DUNK1_N: 45,
			DUNK1_NE: -48,
			DUNK1_E: -47,
			DUNK1_SE: -49,
			DUNK1_S: 46,
			DUNK1_SW: 49,
			DUNK1_W: 47,
			DUNK1_NW: 48,
			DUNK2_N: 50,
			DUNK2_NE: -53,
			DUNK2_E: -52,
			DUNK2_SE: -54,
			DUNK2_S: 51,
			DUNK2_SW: 54,
			DUNK2_W: 52,
			DUNK2_NW: 53,
			DUNK3_N: 55,
			DUNK3_NE: -58,
			DUNK3_E: -57,
			DUNK3_SE: -59,
			DUNK3_S: 56,
			DUNK3_SW: 59,
			DUNK3_W: 57,
			DUNK3_NW: 58,
			DRIBBLERUN_N: 40,
			DRIBBLERUN_NE: 116,
			DRIBBLERUN_E: 115,
			DRIBBLERUN_SE: 117,
			DRIBBLERUN_S: 41,
			DRIBBLERUN_SW: 44,
			DRIBBLERUN_W: 42,
			DRIBBLERUN_NW: 43,
			DRIBBLESTAND_N: 35,
			DRIBBLESTAND_NE: -38,
			DRIBBLESTAND_E: -37,
			DRIBBLESTAND_SE: -39,
			DRIBBLESTAND_S: 35,
			DRIBBLESTAND_SW: 39,
			DRIBBLESTAND_W: 37,
			DRIBBLESTAND_NW: 38,
			WITHOUTBALLRUN_N: 60,
			WITHOUTBALLRUN_NE: -63,
			WITHOUTBALLRUN_E: -62,
			WITHOUTBALLRUN_SE: -64,
			WITHOUTBALLRUN_S: 61,
			WITHOUTBALLRUN_SW: 64,
			WITHOUTBALLRUN_W: 62,
			WITHOUTBALLRUN_NW: 63,
			WITHOUTBALLSTAND_N: 105,
			WITHOUTBALLSTAND_NE: -108,
			WITHOUTBALLSTAND_E: -107,
			WITHOUTBALLSTAND_SE: -109,
			WITHOUTBALLSTAND_S: 106,
			WITHOUTBALLSTAND_SW: 109,
			WITHOUTBALLSTAND_W: 107,
			WITHOUTBALLSTAND_NW: 108
		},
		shootActions: [],
		outShootActions: [],
		hookShootActions: [],
		layupShootActions: [],
		passActions: [],
		catchBallActions: [],
		jumpActions: [],
		reboundJumpUpActions: [],
		gotReboundActions: [],
		blockActions: [],
		dunk1Actions: [],
		dunk2Actions: [],
		dunk3Actions: [],
		dribbleMoveActions: [],
		dribbleStopActions: [],
		withoutBallMoveActions: [],
		withoutBallStopActions: [],
		jumpBallActions: [],
		ballActions: [0, -3, -2, -4, 1, 4, 2, 3],
		teamA: [],
		basketryAPosition: {
			x: 606,
			y: 822
		},
		ballAStartPosition: {
			x1: 606,
			y1: 842,
			x2: 606,
			y2: 966
		},
		dunkAPosition: {
			x1: 612,
			y1: 832,
			x2: 612,
			y2: 974
		},
		teamB: [],
		basketryBPosition: {
			x: 1542,
			y: 344
		},
		ballBStartPosition: {
			x1: 1542,
			y1: 364,
			x2: 1542,
			y2: 490
		},
		dunkBPosition: {
			x1: 1537,
			y1: 355,
			x2: 1537,
			y2: 497
		},
		jumpBallStartPosition: {
			x: 1042,
			y: 580
		},
		roundsData: [],
		rounds: [],
		roundsDataStartIndex: 0,
		roundsDataEndIndex: 0,
		roundsDataCutCount: 1,
		roundsDataCache: null,
		shootQueue: [],
		passQueue: [],
		reboundQueue: [],
		blockQueue: [],
		dunkQueue: [],
		jumpBallQueue: [],
		dribbleRole: null,
		roundSleepDate: null,
		roundSleepTimeout: 0,
		playerSkillState: "ready",
		playerSkillInfo: null,
		halfTimeShowState: "ready",
		halfTimeShowInfo: null,
		second: 0,
		cachesInited: !1,
		teamAPlayersCache: null,
		teamBPlayersCache: null,
		topCacheObj: null,
		shootRoleId: 0,
		maxActionFontsNum: 8,
		maxActionFontsW: 130,
		maxActionFontsH: 30,
		actionFontCacheIds: [],
		actionFonts: [],
		passBtn: null,
		matchGroundType: 0,
		flyFonts: [],
		delayCallbacks: [],
		style: "match",
		shootGameRole: null,
		shootGamePoints: [{
			x: 1312,
			y: 344,
			x1: 1371,
			y1: 391,
			x2: 1254,
			y2: 305,
			dir: 3
		},
		{
			x: 1136,
			y: 480,
			x1: 1281,
			y1: 477,
			x2: 1061,
			y2: 496,
			dir: 2
		},
		{
			x: 1242,
			y: 639,
			x1: 1344,
			y1: 581,
			x2: 1168,
			y2: 692,
			dir: 1
		},
		{
			x: 1522,
			y: 712,
			x1: 1531,
			y1: 624,
			x2: 1517,
			y2: 790,
			dir: 0
		},
		{
			x: 1846,
			y: 603,
			x1: 1743,
			y1: 569,
			x2: 1905,
			y2: 645,
			dir: 7
		}],
		shootGameScore: 0,
		shootGameInitTime: 3E4,
		shootGameTime: 0,
		shootGameCountdown: 3,
		shootGameCountdownDate: null,
		shootGameScores: [],
		shootGameProgress: {
			width: 28,
			height: 477,
			x: 0,
			y: 0,
			barY: 0,
			barSpeed: 8,
			barASpeed: 1,
			rangeX: 0,
			rangeY: 0,
			rangeW: 28,
			rangeH: 80,
			rangeChangeStep: 0,
			touched: !1,
			success: !1
		},
		screenWillScroll: !1,
		shootStep: 0,
		shootTimes: 15,
		isFront: !0,
		shootInitScores: [{
			index: 3,
			score: 1
		},
		{
			index: 3,
			score: 1
		},
		{
			index: 3,
			score: 1
		},
		{
			index: 3,
			score: 1
		},
		{
			index: 3,
			score: 1
		},
		{
			index: 3,
			score: 1
		},
		{
			index: 3,
			score: 1
		},
		{
			index: 3,
			score: 1
		},
		{
			index: 3,
			score: 1
		},
		{
			index: 3,
			score: 1
		},
		{
			index: 3,
			score: 1
		},
		{
			index: 3,
			score: 1
		},
		{
			index: 3,
			score: 1
		},
		{
			index: 3,
			score: 1
		},
		{
			index: 3,
			score: 1
		},
		{
			index: 3,
			score: 1
		},
		{
			index: 3,
			score: 1
		},
		{
			index: 3,
			score: 1
		},
		{
			index: 3,
			score: 1
		},
		{
			index: 3,
			score: 1
		},
		{
			index: 3,
			score: 1
		},
		{
			index: 3,
			score: 1
		},
		{
			index: 3,
			score: 1
		},
		{
			index: 3,
			score: 1
		},
		{
			index: 3,
			score: 1
		},
		{
			index: 3,
			score: 1
		},
		{
			index: 3,
			score: 1
		},
		{
			index: 3,
			score: 1
		},
		{
			index: 3,
			score: 1
		},
		{
			index: 3,
			score: 1
		},
		{
			index: 3,
			score: 1
		},
		{
			index: 3,
			score: 1
		},
		{
			index: 3,
			score: 1
		},
		{
			index: 3,
			score: 1
		},
		{
			index: 3,
			score: 1
		},
		{
			index: 3,
			score: 1
		},
		{
			index: 3,
			score: 1
		},
		{
			index: 3,
			score: 1
		},
		{
			index: 3,
			score: 1
		},
		{
			index: 3,
			score: 1
		},
		{
			index: 3,
			score: 1
		},
		{
			index: 3,
			score: 1
		},
		{
			index: 3,
			score: 1
		},
		{
			index: 3,
			score: 1
		},
		{
			index: 3,
			score: 1
		}],
		lostTimes: 0,
		aimTimes: 0,
		taunt: !1,
		tauntSprite: new g.action.Sprite([ - 2, 0, 2, 0, -2, 0, 2, 0, -2, 0, 2, 0, -2, 0, 2, 0, -2, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], !1, 0, 0),
		comeOn: !1,
		comeOnSprite: new g.action.Sprite([400, 200, 100, 50, 25, 15, 10, 5, 3, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 5, 10, 15, 25, 50, 100, 200, 400], !1, 0, 1),
		firstClicked: !1
	};
	model.matchCtrl = null
})(link); (function(g) {
	view = {
		classes: {}
	};
	g.World.prototype.initWordsCache = function(h, a, b) {
		if (h && h.words) {
			h._wordsDx = -(h.width >> 1) + (h.width - a >> 1);
			h._wordsDy = -b;
			g.canvas.pass(h._passId).clearScreen().font("12px Arial");
			var b = h.words[1],
			c = g.canvas.measureText(b),
			c = a - c.width >> 1;
			g.canvas.fillStyle("#000").fillText(b, c - 1, 19).fillText(b, c + 1, 19).fillText(b, c - 1, 21).fillText(b, c + 1, 21).fillStyle("#FF0").fillText(b, c, 20);
			g.canvas.font("14px Arial");
			b = h.words[0];
			c = g.canvas.measureText(b);
			a = a - c.width >> 1;
			g.canvas.fillStyle("#000").fillText(b, a - 1, 37).fillText(b, a + 1, 37).fillText(b, a - 1, 39).fillText(b, a + 1, 39).fillStyle(h.words[2] || "#FFF").fillText(b, a, 38);
			g.canvas.pass()
		}
		return this
	};
	g.World.prototype.initHPCache = function(h, a, b) {
		if (h) {
			g.canvas.pass(h._passId);
			if (0 > h.curHP || 0 > h.HP) return g.canvas.clearScreen().pass(),
			this;
			var c = h.curPower || 0,
			d = h.power || 100,
			e = ((0 <= h.curHP ? h.curHP: 0) + 0.1) / ((0 <= h.HP ? h.HP: 0) + 0.1),
			f = a - 59 >> 1,
			b = b - 9,
			e = parseInt(59 * (1 < e ? 1 : e)),
			c = (c + 0.1) / (d + 0.1);
			parseInt(59 * (1 < c ? 1 : c));
			e = 4 > e && 0 < e ? 4 : e;
			if (h.buffIcons) {
				a = a - 26 * h.buffIcons.length >> 1;
				for (c = 0; d = h.buffIcons[c]; c++) d = statics.getMapping("buffIcon", d),
				g.canvas.drawImage(d.id, d.sx, d.sy, d.w, d.h, a + c * (d.w + 1), 0, d.w, d.h)
			}
			g.canvas.drawImage("battleHp", 0, 9, 59, 9, f, b - 9, 59, 9).drawImage("battleHp", 0, 0, e, 9, f, b - 9 - 1, e, 9).pass()
		}
		return this
	};
	view.classes.Match = g.extend(function(h) {
		var a = sceneDataMapping ? sceneDataMapping.tiles: [];
		this.model = h;
		this.model.world = new g.World({
			width: gl.sys.w,
			height: gl.sys.h,
			tw: this.model.tw,
			th: this.model.th,
			ow: this.model.ow,
			oh: this.model.oh,
			sw: this.model.scrollW,
			sh: this.model.scrollH,
			wordsNum: 0,
			wordsW: 174,
			wordsH: 60,
			bubbleNum: 10,
			bubbleW: 300,
			bubbleH: 100,
			bubbleFont: this.model.roleBubbleFont,
			asyncUrl: "../../engine/lib/asyncAstar.js",
			nodeXStep: this.model.nodeXStep,
			nodeYStep: this.model.nodeYStep,
			tiles: a,
			callEventTimeout: 100,
			moveDs: [3, 3, 4, 4, 5, -4, -4, 3],
			stopDs: [0, 0, 1, 1, 2, -1, -1, 0],
			outScreenWH: 160
		})
	},
	null, {
		shootGameRender: function() {
			var h = this.model;
			if (h.shootGameRole) {
				switch (h.shootGameRole.state) {
				case "shootReady":
					h.shootGameCountdownDate && g.canvas.drawNumber(h.shootGameCountdown, "xinshengbaodao_01", 98, 125, 0, (gl.sys.h - 125 >> 1) - 50, "center").drawImage("notice2", gl.sys.w - 274 >> 1, gl.sys.h - 240);
					break;
				case "shootChecking":
				case "shoot":
				case "shootResult":
					g.canvas.drawImage("UI_toulan2", 0, 33, h.shootGameProgress.width, h.shootGameProgress.height, h.shootGameProgress.x, h.shootGameProgress.y, h.shootGameProgress.width, h.shootGameProgress.height).drawImage("UI_toulan2", 72, 43, h.shootGameProgress.rangeW, 80, h.shootGameProgress.x + h.shootGameProgress.rangeX, h.shootGameProgress.y + h.shootGameProgress.rangeY, h.shootGameProgress.rangeW, h.shootGameProgress.rangeH).drawImage("UI_toulan2", 36, 33 + (h.shootGameProgress.height - h.shootGameProgress.barY), h.shootGameProgress.width, h.shootGameProgress.barY, h.shootGameProgress.x, h.shootGameProgress.y + (h.shootGameProgress.height - h.shootGameProgress.barY), h.shootGameProgress.width, h.shootGameProgress.barY)
				}
				g.canvas.drawImage("UI_toulan2", 0, 0, 80, 33, 20, 32, 80, 33).drawString(statics.getShortTime(h.shootGameTime / 1E3), 35, 56, "", !0, "#FFF", "#000", h.font);
				10 > h.shootGameScore ? g.canvas.drawNumber(0, "num_toulan", 40, 51, 20, 70, !0).drawNumber(h.shootGameScore, "num_toulan", 40, 51, 60, 70, !0) : g.canvas.drawNumber(h.shootGameScore, "num_toulan", 40, 51, 20, 70, !0);
				h.taunt && g.canvas.drawImage("cf", gl.sys.w - 395 >> 1, (gl.sys.h - 394 >> 1) + h.tauntSprite.getFrame());
				h.comeOn && g.canvas.drawImage("gl", gl.sys.w - 299 >> 1, (gl.sys.h - 290 >> 1) + h.comeOnSprite.getFrame())
			}
			return this
		}
	})
})(link); (function(g, h) {
	ctrl = {
		classes: {}
	};
	ctrl.classes.Match = g.extend(function(a) {
		this.view = a;
		var a = this.view.model,
		b = a.ACTION;
		a.shootActions = [b.SHOOT_N, b.SHOOT_NE, b.SHOOT_E, b.SHOOT_SE, b.SHOOT_S, b.SHOOT_SW, b.SHOOT_W, b.SHOOT_NW];
		a.outShootActions = [b.OUTSHOOT_N, b.OUTSHOOT_NE, b.OUTSHOOT_E, b.OUTSHOOT_SE, b.OUTSHOOT_S, b.OUTSHOOT_SW, b.OUTSHOOT_W, b.OUTSHOOT_NW];
		a.hookShootActions = [b.HOOKSHOOT_N, b.HOOKSHOOT_NE, b.HOOKSHOOT_E, b.HOOKSHOOT_SE, b.HOOKSHOOT_S, b.HOOKSHOOT_SW, b.HOOKSHOOT_W, b.HOOKSHOOT_NW];
		a.layupShootActions = [b.LAYUPSHOOT_N, b.LAYUPSHOOT_NE, b.LAYUPSHOOT_E, b.LAYUPSHOOT_SE, b.LAYUPSHOOT_S, b.LAYUPSHOOT_SW, b.LAYUPSHOOT_W, b.LAYUPSHOOT_NW];
		a.passActions = [b.PASS_N, b.PASS_NE, b.PASS_E, b.PASS_SE, b.PASS_S, b.PASS_SW, b.PASS_W, b.PASS_NW];
		a.catchBallActions = [b.CATCHBALL_N, b.CATCHBALL_NE, b.CATCHBALL_E, b.CATCHBALL_SE, b.CATCHBALL_S, b.CATCHBALL_SW, b.CATCHBALL_W, b.CATCHBALL_NW];
		a.reboundJumpUpActions = [b.REBOUNDJUMPUP_N, b.REBOUNDJUMPUP_NE, b.REBOUNDJUMPUP_E, b.REBOUNDJUMPUP_SE, b.REBOUNDJUMPUP_S, b.REBOUNDJUMPUP_SW, b.REBOUNDJUMPUP_W, b.REBOUNDJUMPUP_NW];
		a.gotReboundActions = [b.GOTREBOUND_N, b.GOTREBOUND_NE, b.GOTREBOUND_E, b.GOTREBOUND_SE, b.GOTREBOUND_S, b.GOTREBOUND_SW, b.GOTREBOUND_W, b.GOTREBOUND_NW];
		a.blockActions = [b.BLOCK_N, b.BLOCK_NE, b.BLOCK_E, b.BLOCK_SE, b.BLOCK_S, b.BLOCK_SW, b.BLOCK_W, b.BLOCK_NW];
		a.dunk1Actions = [b.DUNK1_N, b.DUNK1_NE, b.DUNK1_E, b.DUNK1_SE, b.DUNK1_S, b.DUNK1_SW, b.DUNK1_W, b.DUNK1_NW];
		a.dunk2Actions = [b.DUNK2_N, b.DUNK2_NE, b.DUNK2_E, b.DUNK2_SE, b.DUNK2_S, b.DUNK2_SW, b.DUNK2_W, b.DUNK2_NW];
		a.dunk3Actions = [b.DUNK3_N, b.DUNK3_NE, b.DUNK3_E, b.DUNK3_SE, b.DUNK3_S, b.DUNK3_SW, b.DUNK3_W, b.DUNK3_NW];
		a.jumpBallActions = [b.JUMP_N, b.JUMP_NE, b.JUMP_E, b.JUMP_SE, b.JUMP_S, b.JUMP_SW, b.JUMP_W, b.JUMP_NW];
		a.dribbleMoveActions = [b.DRIBBLERUN_N, b.DRIBBLERUN_NE, b.DRIBBLERUN_E, b.DRIBBLERUN_SE, b.DRIBBLERUN_S, b.DRIBBLERUN_SW, b.DRIBBLERUN_W, b.DRIBBLERUN_NW];
		a.dribbleStopActions = [b.DRIBBLESTAND_N, b.DRIBBLESTAND_NE, b.DRIBBLESTAND_E, b.DRIBBLESTAND_SE, b.DRIBBLESTAND_S, b.DRIBBLESTAND_SW, b.DRIBBLESTAND_W, b.DRIBBLESTAND_NW];
		a.withoutBallMoveActions = [b.WITHOUTBALLRUN_N, b.WITHOUTBALLRUN_NE, b.WITHOUTBALLRUN_E, b.WITHOUTBALLRUN_SE, b.WITHOUTBALLRUN_S, b.WITHOUTBALLRUN_SW, b.WITHOUTBALLRUN_W, b.WITHOUTBALLRUN_NW];
		a.withoutBallStopActions = [b.WITHOUTBALLSTAND_N, b.WITHOUTBALLSTAND_NE, b.WITHOUTBALLSTAND_E, b.WITHOUTBALLSTAND_SE, b.WITHOUTBALLSTAND_S, b.WITHOUTBALLSTAND_SW, b.WITHOUTBALLSTAND_W, b.WITHOUTBALLSTAND_NW];
		a.world.setMoveDs(a.withoutBallMoveActions).setStopDs(a.withoutBallStopActions)
	},
	null, {
		updateScene: function(a, b, c, d) {
			var e = this.view.model;
			e.style = "match";
			e.matchGroundType = d || 0;
			e.map = [[217, 218, 219, 220, 221, 222, 241, 242, 243, 244, 245, 246, 289, 290, 291, 292, 293, 294], [223, 224, 225, 226, 227, 228, 247, 248, 249, 250, 251, 252, 295, 296, 297, 298, 299, 300], [229, 230, 231, 232, 233, 234, 253, 254, 255, 256, 257, 258, 301, 302, 303, 304, 305, 306], [235, 236, 237, 238, 239, 240, 259, 260, 261, 262, 263, 264, 307, 308, 309, 310, 311, 312], [265, 266, 267, 268, 269, 270, 313, 314, 315, 316, 317, 318, 337, 338, 339, 340, 341, 342], [271, 272, 273, 274, 275, 276, 319, 320, 321, 322, 323, 324, 343, 344, 345, 346, 347, 348], [277, 278, 279, 280, 281, 282, 325, 326, 327, 328, 329, 330, 349, 350, 351, 352, 353, 354], [283, 284, 285, 286, 287, 288, 331, 332, 333, 334, 335, 336, 355, 356, 357, 358, 359, 360], [361, 362, 363, 364, 365, 366, 385, 386, 387, 388, 389, 390, 409, 410, 411, 412, 413, 414], [367, 368, 369, 370, 371, 372, 391, 392, 393, 394, 395, 396, 415, 416, 417, 418, 419, 420], [373, 374, 375, 376, 377, 378, 397, 398, 399, 400, 401, 402, 421, 422, 423, 424, 425, 426], [379, 380, 381, 382, 383, 384, 403, 404, 405, 406, 407, 408, 427, 428, 429, 430, 431, 432]];
			e.teamA = [];
			e.teamB = [];
			e.roundsDataCache = c || [];
			e.roundsDataStartIndex = 0;
			e.roundsDataEndIndex = e.roundsDataCutCount;
			if (b) for (c = 0; d = b[c]; c++)"A" == d[8] ? e.teamA.push({
				id: d[0],
				spriteId: d[1],
				fightingPicId: d.fightingPicId,
				name: d[2],
				desc: d[3],
				x: d[4],
				y: d[5],
				dir: d[6],
				speed: d[7],
				teamType: d[8],
				attX: d[9],
				attY: d[10],
				defX: d[11],
				defY: d[12],
				player: d.player,
				site: d.site
			}) : e.teamB.push({
				id: d[0],
				spriteId: d[1],
				fightingPicId: d.fightingPicId,
				name: d[2],
				desc: d[3],
				x: d[4],
				y: d[5],
				dir: d[6],
				speed: d[7],
				teamType: d[8],
				attX: d[9],
				attY: d[10],
				defX: d[11],
				defY: d[12],
				player: d.player,
				site: d.site
			});
			this.updateMatchCaches(a);
			return this
		},
		refreshScene: function() {
			var a = this.view.model;
			a.map && a.world.update(a.map);
			for (var b, c = 0,
			d; d = a.teamA[c]; c++) b = roundsGroupsDataNameSpace.getRoleLinks(d.fightingPicId),
			a.world.addRole(d.id, b.role, [d.name, d.desc, "#0FF", "#000"], null, null, a.withoutBallStopActions[d.dir], a.roleStep, "role", null, null, d.x, d.y).setRoleState(d.id, "teamType", "A").addRoleLinks(d.id, b.links).getRole(d.id).setSpeed(d.speed),
			0 == c && a.world.setCameraSpeed(a.tw, a.th).clearPath().unFocusRole().focusRole(d.id).setCameraSpeed(a.scrollW, a.scrollH);
			for (c = 0; d = a.teamB[c]; c++) b = roundsGroupsDataNameSpace.getRoleLinks(d.fightingPicId),
			a.world.addRole(d.id, b.role, [d.name, d.desc, "#F00", "#000"], null, null, a.withoutBallStopActions[d.dir], a.roleStep, "role", null, null, d.x, d.y).setRoleState(d.id, "teamType", "B").addRoleLinks(d.id, b.links).getRole(d.id).setSpeed(d.speed);
			a.world.sortShelters();
			return this
		},
		refreshLK: function() {
			var a = this.view.model;
			1 == a.matchGroundType ? a.world.addRole("lk1", statics.getMapping("building", 70001).getData(), null, null, null, null, a.roleStep, "npc", null, null, 1700, 400).addRole("lk2", statics.getMapping("building", 70002).getData(), null, null, null, null, a.roleStep, "npc", null, null, 456, 1064) : a.world.addRole("lk1", statics.getMapping("building", 70003).getData(), null, null, null, null, a.roleStep, "npc", null, null, 1700, 399).addRole("lk2", statics.getMapping("building", 70004).getData(), null, null, null, null, a.roleStep, "npc", null, null, 456, 1068);
			return this
		},
		removeLK1: function() {
			this.view.model.world.removeRole("lk1");
			return this
		},
		updateMatchCaches: function() {
			return this
		},
		clearScene: function() {
			var a = this.view.model;
			a.map = null;
			a.world.unFocusRole().clearShelters().clearEvents().clearFontEffects().clearEffects();
			a.teamA = [];
			a.teamB = [];
			a.roundsData = [];
			a.rounds = [];
			a.shootQueue = [];
			a.passQueue = [];
			a.reboundQueue = [];
			a.blockQueue = [];
			a.dunkQueue = [];
			a.jumpBallQueue = [];
			a.dribbleRole = null;
			a.cachesInited = !1;
			a.teamAPlayersCache = null;
			a.teamBPlayersCache = null;
			a.topCacheObj = null;
			a.playerSkillInfo = null;
			a.halfTimeShowInfo = null;
			a.roundsDataCache = null;
			this.clearDelayCallbacks();
			a.shootGameRole = null;
			a.shootGameScores = null;
			a.shootGameDate = null;
			a.shootGameScores = null;
			a.style = "match";
			return this
		},
		withoutBall: function(a) {
			var b = this.view.model;
			if (a = b.world.getRole(a)) a.setMoveDs(b.withoutBallMoveActions).setStopDs(b.withoutBallStopActions),
			b.world.removeEffect("dribble", "back");
			return this
		},
		dribble: function(a, b) {
			var c = this.view.model;
			c.dribbleRole && this.withoutBall(c.dribbleRole.id);
			if (c.dribbleRole = c.world.getRole(a)) c.dribbleRole.setMoveDs(c.dribbleMoveActions).setStopDs(c.dribbleStopActions),
			b || (this.removeFlyBall("main"), c.world.clearPath().unFocusRole().focusRole(c.dribbleRole.id)),
			c.world.addEffect("dribble", statics.getMapping("effect", 80006).getData(), null, null, !0, 0, c.roleStep, "back", null, null, null, null, null, null, null, c.dribbleRole.id);
			return this
		},
		makeRoleMove: function(a, b, c, d, e, f, g, h) {
			var x = this.view.model,
			l = x.world.getRole(a);
			l && !l.canNotMove && (null != g && (l.data = g), null != h && null == l.onend && (l.onend = h), null == b || null == c || x.world.beatRole(a, b, c), a = l.speed, l.moveTo(d, e, f).setSpeed(a));
			return this
		},
		roleShoot: function(a, b, c, d) {
			var e = this.view.model,
			f = e.world.getRole(a);
			if (!f) return this;
			if (0 > e.shootQueue.indexOfAttr("id", a)) {
				var g = "A" == f.teamType ? e.basketryBPosition: e.basketryAPosition;
				if (g) {
					switch (c) {
					default:
						c = e.shootActions;
						break;
					case 1:
						c = e.outShootActions;
						break;
					case 2:
						c = e.hookShootActions;
						break;
					case 3:
						c = e.layupShootActions
					}
					var h = g.x,
					g = g.y,
					x = statics.get2PointDirection(f.mapOffx, f.mapOffy - 120, h, g);
					delete f.toPassing;
					e.shootQueue.push({
						id: a,
						state: "waiting",
						role: f,
						startAction: c[x],
						endAction: e.withoutBallStopActions[x],
						outFrameIndex: 4,
						toX: h,
						toY: g,
						successed: b,
						notFocus: d
					});
					y1 = null
				}
			}
			return this
		},
		shootAction: function() {
			for (var a = this.view.model,
			b, c = a.shootQueue.length - 1; 0 <= c; c--) if (b = a.shootQueue[c]) switch (b.state) {
			case "waiting":
				b.state = "start";
				a.shootRoleId = 0;
				break;
			case "start":
				b.role.clearPath().unlockSprite().setSprite(b.startAction).lockSprite();
				this.withoutBall(b.id).removeFlyBall("main");
				b.state = "ready";
				_direcion = null;
				break;
			case "ready":
				if (b.role.getSprite().endFrame(b.outFrameIndex)) if (b.successed) {
					a.shootRoleId = b.role.id;
					var d = b.role.getBodyRect();
					b.ball = this.createFlyBall(b.id, b.role.mapOffx + d[0], b.role.mapOffy + d[1], b.toX, b.toY);
					b.state = "ballShooting";
					b.notFocus || a.world.setCameraSpeed(2 * a.scrollW, 2 * a.scrollH).clearPath().unFocusRole().focusRole("ball_" + b.id).setCameraSpeed(a.scrollW, a.scrollH);
					this.removeLK1()
				} else b.state = "remove";
				break;
			case "ballShooting":
				b.ball.stoped() && (b.state = "remove");
				break;
			case "remove":
				this.removeFlyBall(b.id),
				b.role.unlockSprite().setSprite(b.endAction),
				a.shootQueue.splice(c, 1)
			} else a.shootQueue.splice(c, 1);
			return this
		},
		endShoot: function() {
			return 0 == this.view.model.shootQueue.length
		},
		createBallPath: function(a, b, c, d, e, f) {
			var g = d - b,
			g = Math.sqrt(Math.pow(c - a, 2) + Math.pow(g, 2)),
			f = g / 50 * (f || 18),
			e = g / 80 * (e || 2),
			e = 8 > e ? 6 : e;
			return h.createPath([new h.Point2D(a, b), new h.Point2D(a, b - f), new h.Point2D(c, d - f), new h.Point2D(c, d)], 25 < e ? 25 : e)
		},
		createFlyBall: function(a, b, c, d, e, f, g, h) {
			d = this.createBallPath(b, c, d, e, f, g, h);
			return 0 < d.length ? this.createPathBall(a, b, c, d) : null
		},
		createPathBall: function(a, b, c, d, e) {
			var f = this,
			g = f.view.model,
			h = 0;
			if (d && 2 <= d.length) var h = d[d.length - 1],
			x = d[d.length - 2],
			h = g.ballActions[statics.get2PointDirection(x[0], x[1], h[0], h[1])] || 0;
			return g.world.addRole("ball_" + a, statics.getMapping("role", 2).getData(), ["", "", "#FFF", "#000"], null, null, h, g.roleStep, "role", null, e ?
			function() {
				f.removeFlyBall(this.id)
			}: null, b, c).beatRole("ball_" + a, b, c).getRole("ball_" + a).setPath(d)
		},
		removeFlyBall: function(a) {
			this.view.model.world.removeRole("ball_" + a);
			return this
		},
		makeBallJump: function(a) {
			if (!a) return this;
			a.setLoop(!1).concatPath([[0, -30], [0, 0], [0, 30], [0, 0], [0, -15], [0, 0], [0, 15], [0, 0], [0, -10], [0, 0], [0, 10], [0, 0], [0, -5], [0, 0], [0, 5], [0, 0], [0, -2], [0, 0], [0, 2], [0, 0], [0, 0], [0, 0]]);
			return this
		},
		action: function() {
			var a = this.view.model;
			if (!a.world) return this;
			a.newDate = Date.now();
			switch (a.style) {
			case "shootGame":
				this.shootAction().shootGameAction(),
				a.world.action(),
				a.world.carRender(),
				a.world.shelterRender().frontEffectRender().wordsRender().animationRender(),
				this.view.shootGameRender()
			}
			this.delayCallbackAction();
			return this
		},
		addDelayCallback: function(a, b, c, d) {
			var e = this.view.model;
			0 > e.delayCallbacks.indexOfAttr("id", a) && e.delayCallbacks.push({
				id: a,
				timeout: b,
				date: Date.now(),
				data: c,
				callback: d
			});
			return this
		},
		removeDelayCallback: function(a) {
			for (var b = this.view.model,
			c = b.delayCallbacks.length - 1,
			d; d = b.delayCallbacks[c]; c--) if (d.id == a) {
				d.data = null;
				d.callback = null;
				b.delayCallbacks.splice(c, 1);
				break
			}
			return this
		},
		delayCallbackAction: function() {
			for (var a = this.view.model,
			b = a.delayCallbacks.length - 1,
			c; c = a.delayCallbacks[b]; b--) a.newDate - c.date >= c.timeout && c.callback && (c.callback(c.data), c.data = null, c.callback = null, a.delayCallbacks.splice(b, 1));
			return this
		},
		clearDelayCallbacks: function() {
			this.view.model.delayCallbacks.length = 0;
			return this
		},
		delayCallbackDateUpdate: function(a) {
			for (var b = this.view.model,
			c = b.delayCallbacks.length - 1,
			d; d = b.delayCallbacks[c]; c--) d.date += a;
			return this
		},
		initShootGame: function() {
			var a = this.view.model,
			b = roundsGroupsDataNameSpace.getRoleLinks(111);
			a.style = "shootGame";
			a.shootGameScore = 0;
			a.shootGameTime = a.shootGameInitTime + 999;
			a.shootGameCountdown = 3;
			a.shootGameProgress.rangeChangeStep = 0;
			a.isFront = !0;
			this.initShootScores(a.isFront);
			a.world.addRole("shooter", b.role, ["", "", "#F00", "#000"], null, null, a.withoutBallStopActions[1], a.roleStep, "role", null, null, 1506, 506).addRoleLinks("shooter", b.links).setRoleState("shooter", "teamType", "A").setRoleState("shooter", "state", "ready");
			a.shootGameRole = a.world.getRole("shooter");
			this.dribble("shooter").addDelayCallback("shooter", 1E3, {
				role: a.shootGameRole
			},
			function(a) {
				a.role.state = "stand"
			});
			a.world.setCameraSpeed(a.tw, a.th).unFocusRole().focusRole("shooter").setCameraSpeed(a.scrollW, a.scrollH);
			a.shootGameProgress.touched = !1;
			a.screenWillScroll = !1;
			a.shootStep = 0;
			a.taunt = !1;
			a.tauntSprite.setFrame(0);
			a.firstClicked = !1;
			a.aimTimes = 0;
			a.comeOn = !1;
			a.comeOnSprite.setFrame(0);
			a.shootGameProgress.rangeH = 200;
			a = b = null;
			return this
		},
		initShootScores: function(a) {
			_model = this.view.model;
			_model.shootGameScores = [];
			if (a) for (var a = 0,
			b; b = _model.shootInitScores[a]; a++) _model.shootGameScores.push({
				index: b.index,
				score: b.score
			});
			else for (a = _model.shootInitScores.length - 1; b = _model.shootInitScores[a]; a--) _model.shootGameScores.push({
				index: b.index,
				score: b.score
			});
			_model = null;
			return this
		},
		shootGameAction: function() {
			var a = this.view.model;
			switch (a.shootGameRole.state) {
			case "stand":
				if (a.shootGameRole.endPath()) if (0 < a.shootGameScores.length) {
					a.shootGameRole.state = "moving";
					var b = a.shootGameScores[0],
					b = a.shootGamePoints[b.index],
					c = a.world.getRole("shooter");
					this.dribble("shooter", !0);
					a.shootGameRole.setSprite(a.dribbleStopActions[b.dir]);
					if (Math.round(c.mapOffx) != b.x || Math.round(c.mapOffy) != b.y) a.world.unFocusRole().focusRole("shooter"),
					a.screenWillScroll = !0,
					a.shootStep++,
					this.makeRoleMove("shooter", null, null, b.x, b.y, 15, {
						direction: a.dribbleStopActions[b.dir]
					},
					function() {
						this.setSprite(this.data.direction)
					});
					b = b = null
				} else a.shootGameScore < a.shootTimes && (this.initShootScores(a.isFront), a.shootGameRole.state = "stand", a.shootStep = 0);
				break;
			case "moving":
				if (a.shootGameRole.endPath() && a.world.endPath()) {
					if (a.screenWillScroll) {
						a.screenWillScroll = !1;
						c = b = 0;
						switch (a.shootStep) {
						case 1:
							c = 100;
							break;
						case 2:
							b = -180;
							break;
						case 3:
							b = -170;
							c = 200;
							break;
						case 4:
							c = 200;
							break;
						case 5:
							b = 200,
							c = 100
						}
						a.world.unFocusRole().makeCameraMove(b, c, a.scrollW, a.scrollH);
						b = c = null
					}
					a.shootGameRole.state = "shootReady";
					0 < a.shootGameCountdown && (a.shootGameCountdownDate = Date.now())
				}
				break;
			case "showNotice":
				a.firstClicked && (a.shootGameRole.state = "moving");
				break;
			case "shootReady":
				a.shootGameCountdownDate ? (1E3 < a.newDate - a.shootGameCountdownDate && (a.shootGameCountdownDate = a.newDate, a.shootGameCountdown--), 0 > a.shootGameCountdown && (a.shootGameCountdownDate = null)) : (a.shootGameRole.state = "shootChecking", a.shootGameProgress.x = 30, a.shootGameProgress.y = 140, a.shootGameProgress.barY = 0, a.shootGameProgress.barSpeed = 20, a.shootGameProgress.barASpeed = 1.5, a.shootGameProgress.rangeY = g.comm.getRandom(80, 230), a.shootGameProgress.rangeH -= 0.05 * a.shootGameProgress.rangeH, a.shootGameProgress.rangeH = 30 > a.shootGameProgress.rangeH ? 30 : a.shootGameProgress.rangeH, a.shootGameProgress.success = !1, a.shootGameTime -= 33);
				break;
			case "shootChecking":
				a.shootGameProgress.touched && (a.shootGameProgress.barSpeed += a.shootGameProgress.barASpeed, a.shootGameProgress.barY += a.shootGameProgress.barSpeed, a.shootGameProgress.barY > a.shootGameProgress.height ? (a.shootGameProgress.barY = a.shootGameProgress.height, a.shootGameProgress.barSpeed *= -1) : 0 > a.shootGameProgress.barY && (a.shootGameProgress.barY = 0, a.shootGameProgress.barSpeed *= -1));
				a.shootGameTime -= 33;
				break;
			case "shoot":
				this.roleShoot("shooter", !0, 1, !0);
				a.shootGameRole.state = "shootResult";
				a.shootGameTime -= 33;
				break;
			case "shootResult":
				0 == a.shootQueue.length && (a.shootGameProgress.success ? (a.shootGameRole.state = "gotScore", a.shootGameScores[0] && (a.shootGameScore += a.shootGameScores[0].score)) : a.shootGameRole.state = "notGotScore");
				a.shootGameTime -= 33;
				break;
			case "gotScore":
				c = a.ballBStartPosition; (c = this.createFlyBall("main", c.x1, c.y1, c.x2, c.y2, null, null, !0)) && this.makeBallJump(c);
				0 == a.matchGroundType ? a.world.addEffect("aimEffect", statics.getMapping("effect", 80008).getData(), null, null, !1, 0, a.roleStep, "front", 1527, 286) : a.world.addEffect("aimEffect", statics.getMapping("effect", 80008).getData(), null, null, !1, 0, a.roleStep, "front", 1531, 287);
				a.shootGameRole.state = "dequeueScores";
				a.lostTimes = 0;
				a.aimTimes++;
				break;
			case "notGotScore":
				c = a.ballBStartPosition;
				b = a.shootGamePoints[g.comm.getRandom(0, a.shootGamePoints.length - 1)];
				if (c = this.createFlyBall("main", c.x1, c.y1, b.x1, b.y1, 5, 40, !0)) c.concatPath(this.createBallPath(b.x1, b.y1, b.x, b.y, 4, 30)).concatPath(this.createBallPath(b.x, b.y, b.x2, b.y2, 2, 10)),
				this.makeBallJump(c);
				a.shootGameRole.state = "dequeueScores";
				a.aimTimes = 0;
				a.lostTimes++;
				break;
			case "ballLive":
				a.world.getRole("ball_main").endPath() && (a.shootGameRole.state = "dequeueScores", this.removeFlyBall("main"));
				break;
			case "dequeueScores":
				a.shootGameScores.shift(),
				a.shootGameRole.state = "stand"
			}
			a.taunt && (a.tauntSprite.endFrame() && (a.taunt = !1), a.tauntSprite.nextFrame());
			a.comeOn && (a.comeOnSprite.endFrame() && (a.comeOn = !1), a.comeOnSprite.nextFrame());
			a.shootGameTime = 0 > a.shootGameTime ? 0 : a.shootGameTime;
			"ready" != a.shootGameRole.state && (0 >= a.shootGameTime && this.endShoot()) && (a.shootGameRole.state = "ready", dp_submitScore(a.shootGameScore),gl.gameState = 2);
			return this
		},
		touchStart: function() {
			var a = this.view.model;
			if ("shootGame" == a.style && a.shootGameRole) switch (a.shootGameRole.state) {
			case "shootChecking":
				a.shootGameProgress.touched = !0;
				break;
			case "showNotice":
				a.firstClicked = !0
			}
			return this
		},
		touchEnd: function() {
			var a = this.view.model;
			"shootGame" == a.style && (a.shootGameProgress.touched && a.shootGameRole && "shootChecking" == a.shootGameRole.state) && (a.shootGameProgress.touched = !1, a.shootGameProgress.success = g.comm.collision(a.shootGameProgress.x, a.shootGameProgress.y + (a.shootGameProgress.height - a.shootGameProgress.barY), a.shootGameProgress.width, 1, a.shootGameProgress.x + a.shootGameProgress.rangeX, a.shootGameProgress.y + a.shootGameProgress.rangeY, a.shootGameProgress.rangeW, a.shootGameProgress.rangeH), a.shootGameRole.state = "shoot", a.firstClicked || (a.firstClicked = !0));
			return this
		}
	})
})(link, bezier); (function(g) {
	window.model || (window.model = {});
	document.body.style.background = window.CommBgColor = "#000";
	document.body.style.overflow = "hidden";
	g.canvas.screen.getTouch() || (document.body.style.textAlign = "center", document.onselectstart = new Function("event.returnValue=false;"));
	var h = g.getDom("wait");
	h && document.body.removeChild(h);
	h = null;
	g.init(gl.sys.w, gl.sys.h).verImage(versionId).initImage(gl.resource.imgs).asyncImage(gl.resource.asyncImgs).pageLoad(function(a) {
		try {
			var b = a.request.get("title");
			b && (document.title = decodeURIComponent(b));
			b = null
		} catch(c) {}
		var b = function(a, b, c) {
			model.matchCtrl && model.matchCtrl.touchStart(b, c)
		},
		d = function(a) {
			a.preventDefault && a.preventDefault()
		},
		e = function(a, b, c) {
			a.preventDefault && a.preventDefault();
			switch (gl.gameState) {
			case 0:
				t();
				break;
			case 1:
				model.matchCtrl && model.matchCtrl.touchEnd(b, c)
			}
		};
		a.setRunFrequency(a.canvas.screen.getTouch() ? 35 : 30).events.touchStart(b).touchMove(d).touchEnd(e).mouseDown(b).mouseMove(d).mouseUp(e).keyDown(function(a) {
			116 == a.keyCode && (window.onbeforeunload = null)
		});
		var f;
		document.title = window.GAMENAME;
		var g, h = new a.action.Sprite([ - 2, 0, 2], !0, 0, 5),
		x,
		l,
		m,
		s = function() {
			x = 428;
			l = gl.sys.w - x >> 1;
			m = gl.sys.h - 300 - 300
		},
		t = function() {
			s();
			gl.gameState = 1;
			model.matchCtrl || (model.matchCtrl = new ctrl.classes.Match(new view.classes.Match(model.matchModel)));
			model.matchCtrl.clearScene().updateScene().refreshScene().initShootGame();
			a.buttonLayout.clear();
			a.buttonLayout.create({
				id: "restart",
				x: l + x - 30,
				y: 30,
				value: "",
				imageId: "btn3",
				width: 80,
				height: 80
			})
		};
		s();
		gl.gameState = 0;
		a.buttonLayout.clear();
		a.run(function() {
			switch (gl.gameState) {
			default:
				h.nextFrame();
				a.canvas.drawImage("bg2", 0, 0, 480, 800, 0, 0, gl.sys.w, gl.sys.h).drawImage("notice1", gl.sys.w - 201 >> 1, gl.sys.h - 170 + h.getFrame());
				break;
			case 1:
				model.matchCtrl && (model.matchCtrl.action(), a.buttonLayout.released("restart") && t());
				break;
			case 2:
				s();
				gl.gameState = 3;
				model.matchCtrl && model.matchCtrl.clearScene();
				a.buttonLayout.clear();
				a.buttonLayout.create({
					id: "replay",
					x: l,
					y: m + 270,
					value: "再来一次",
					font: "30px \u5fae\u8f6f\u96c5\u9ed1",
					imageId: "btn1",
					width: 157,
					height: 76
				});
				a.buttonLayout.create({
					id: "share",
					x: l + x - 157,
					y: m + 270,
					value: "更多游戏",
					font: "30px \u5fae\u8f6f\u96c5\u9ed1",
					imageId: "btn1",
					width: 157,
					height: 76
				});
				model.matchCtrl && (document.title = String.format(window.TITLEDESCFORMAT, model.matchCtrl.view.model.shootGameScore));
				break;
			case 3:
				if (model.matchCtrl) {
					var b = model.matchCtrl.view.model,
					c = "",
					c = 3 >= b.shootGameScore ? "\u8fd8\u662f\u67d4\u9053\u6bd4\u8f83\u9002\u5408\u4f60...": 6 >= b.shootGameScore ? "\u606d\u559c\u4f60\u7684\u6295\u7bee\u6280\u672f\u8d85\u8d8a\u4e86\u94c1\u7537": 9 >= b.shootGameScore ? "\u4f60\u8fd8\u662f\u53bb\u7ec3\u4e60\u704c\u7bee\u5427": 12 >= b.shootGameScore ? "\u53ea\u80fd\u8bf4\u9a6c\u9a6c\u864e\u864e\u5427": 15 >= b.shootGameScore ? "\u4f60\u8fd8\u662f\u6709\u70b9\u7bee\u7403\u5929\u8d4b\u7684": 18 >= b.shootGameScore ? "\u6211\u53bb...\u96be\u9053\u4f60\u662f\u5929\u624d\uff1f": 21 >= b.shootGameScore ? "\u5bf9\u5929\u624d\u6765\u8bf4\u8fd9\u6e38\u620f\u679c\u7136\u592a\u5bb9\u6613\u4e86\u5417\uff1f\uff1f": 24 >= b.shootGameScore ? "\u6551\u4e16\u4e3b\u8bde\u751f\u4e86\uff01": "\u7bee\u7403\u4e4b\u795e\u8bf7\u5f15\u9886\u6211\u4eec\u79f0\u9738\u5168\u56fd\uff01\uff01\uff01";
					a.canvas.drawImage("bg1", 0, 0, 480, 800, 0, 0, gl.sys.w, gl.sys.h).drawImage("panel1", l, m).drawString("\u7ecf\u8fc7\u8270\u82e6\u7684\u96c6\u8bad, \u4f60\u4e00\u5171", 0, m + 60, a.graphics.VCENTER, !0, "#FFF", "#000", "30px \u5fae\u8f6f\u96c5\u9ed1").drawString("\u6295\u8fdb\u4e86" + b.shootGameScore + "\u7403!", 0, m + 140, a.graphics.VCENTER, !0, "#F00", "#FFF", "50px \u5fae\u8f6f\u96c5\u9ed1").fillStyle("#FF0").drawString(c, 0, m + 205, a.graphics.VCENTER, !1, "#006CFF", "#000", "22px \u5fae\u8f6f\u96c5\u9ed1");
					b = null
				}
				a.buttonLayout.released("replay") ? t() : a.buttonLayout.released("share") &&clickMore();
				
			}
		})
	})
})(link);