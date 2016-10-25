function logW() {
	console.log("window.c2_score =" + window.c2_score)
}
function isMobile() {
	if (navigator.appName == "Microsoft Internet Explorer") return true;
	var e = window.orientation;
	return e == null || e == undefined ? false : true
}
function getHighScore() {
	var e = localStorage[gameID + "high_score"];
	if ("" + e == "undefined") return "0";
	return e
}
function orientationListener() {
	if (!isMobile()) return;
	var e = window.innerWidth;
	var t = window.innerHeight;
	var n = e > t * 1.1 ? 0 : 1;
	if (n == 1) {
		document.getElementById("rotation").style.display = "none";
		document.getElementById("c2canvasdiv").style.display = "block"
	} else {
		document.getElementById("rotation").style.display = "block";
		document.getElementById("c2canvasdiv").style.display = "none"
	}
}
function easeOutBounce(e, t, n, r) {
	if ((e /= r) < 1 / 2.75) {
		return n * 7.5625 * e * e + t
	} else if (e < 2 / 2.75) {
		return n * (7.5625 * (e -= 1.5 / 2.75) * e + .75) + t
	} else if (e < 2.5 / 2.75) {
		return n * (7.5625 * (e -= 2.25 / 2.75) * e + .9375) + t
	} else {
		return n * (7.5625 * (e -= 2.625 / 2.75) * e + .984375) + t
	}
}
function integerize(e, t) {
	return Math.round(e / t * litetween_precision)
}
function easeFunc(e, t, n, r, i) {
	switch (e) {
	case 0:
		return r * t / i + n;
	case 1:
		return r * (t /= i) * t + n;
	case 2:
		return -r * (t /= i) * (t - 2) + n;
	case 3:
		if ((t /= i / 2) < 1) return r / 2 * t * t + n;
		return -r / 2 * (--t * (t - 2) - 1) + n;
	case 4:
		return r * (t /= i) * t * t + n;
	case 5:
		return r * ((t = t / i - 1) * t * t + 1) + n;
	case 6:
		if ((t /= i / 2) < 1) return r / 2 * t * t * t + n;
		return r / 2 * ((t -= 2) * t * t + 2) + n;
	case 7:
		return r * (t /= i) * t * t * t + n;
	case 8:
		return -r * ((t = t / i - 1) * t * t * t - 1) + n;
	case 9:
		if ((t /= i / 2) < 1) return r / 2 * t * t * t * t + n;
		return -r / 2 * ((t -= 2) * t * t * t - 2) + n;
	case 10:
		return r * (t /= i) * t * t * t * t + n;
	case 11:
		return r * ((t = t / i - 1) * t * t * t * t + 1) + n;
	case 12:
		if ((t /= i / 2) < 1) return r / 2 * t * t * t * t * t + n;
		return r / 2 * ((t -= 2) * t * t * t * t + 2) + n;
	case 13:
		return easeInCircle[integerize(t, i)];
	case 14:
		return easeOutCircle[integerize(t, i)];;
	case 15:
		return easeInOutCircle[integerize(t, i)];;
	case 16:
		var s = 0;
		if (s == 0) s = 1.70158;
		return r * (t /= i) * t * ((s + 1) * t - s) + n;
	case 17:
		return easeOutBack[integerize(t, i)];
	case 18:
		return easeInOutBack[integerize(t, i)];
	case 19:
		return easeInElasticArray[integerize(t, i)];
	case 20:
		return easeOutElasticArray[integerize(t, i)];
	case 21:
		return easeInOutElasticArray[integerize(t, i)];
	case 22:
		return r - easeOutBounceArray[integerize(i - t, i)] + n;
	case 23:
		return easeOutBounceArray[integerize(t, i)];
	case 24:
		if (t < i / 2) return (r - easeOutBounceArray[integerize(i - t * 2, i)] + n) * .5 + n;
		else return easeOutBounceArray[integerize(t * 2 - i, i)] * .5 + r * .5 + n;
	case 25:
		var o = t / i / 2;
		return 2 * o * o * (3 - 2 * o);
	case 26:
		var o = (t / i + 1) / 2;
		return 2 * o * o * (3 - 2 * o) - 1;
	case 27:
		var o = t / i;
		return o * o * (3 - 2 * o)
	}
	return 0
}
function trim(e) {
	return e.replace(/^\s\s*/, "").replace(/\s\s*$/, "")
}
function startCutting() {
	kye();
}
function kye() {
	function t() {
		if (document.hidden || document.mozHidden || document.webkitHidden || document.msHidden) cr_setSuspended(true);
		else cr_setSuspended(false)
	}
	var e = function() {
			cr_sizeCanvas(jQuery(window).width(), jQuery(window).height())
		};
	jQuery(window).resize(e);
	SG.setOrientationHandler(e);
	SG.setResizeHandler(e);
	cr_createRuntime("c2canvas");
	document.addEventListener("visibilitychange", t, false);
	document.addEventListener("mozvisibilitychange", t, false);
	document.addEventListener("webkitvisibilitychange", t, false);
	document.addEventListener("msvisibilitychange", t, false)
}
var gameID = "fruit_cut_ninja_";
document.getElementById("rotation").style.display = "none";
var cr = {};
cr.plugins_ = {};
cr.behaviors = {};
if (typeof Object.getPrototypeOf !== "function") {
	if (typeof "test".__proto__ === "object") {
		Object.getPrototypeOf = function(e) {
			return e.__proto__
		}
	} else {
		Object.getPrototypeOf = function(e) {
			return e.constructor.prototype
		}
	}
}(function() {
	function e(e, t) {
		this.x = e;
		this.y = t;
		cr.seal(this)
	}
	function t(e, t, n, r) {
		this.set(e, t, n, r);
		cr.seal(this)
	}
	function n() {
		this.tlx = 0;
		this.tly = 0;
		this.trx = 0;
		this.try_ = 0;
		this.brx = 0;
		this.bry = 0;
		this.blx = 0;
		this.bly = 0;
		cr.seal(this)
	}
	function s() {
		if (i) {
			this.s = new Set
		} else {
			this.items = {};
			this.item_count = 0
		}
		this.values_cache = [];
		this.cache_valid = true;
		cr.seal(this)
	}
	function a(e) {
		o[u++] = e
	}
	function f() {
		this.c = 0;
		this.y = 0;
		this.t = 0;
		this.sum = 0;
		cr.seal(this)
	}
	function l(e) {
		this.pts_cache = [];
		this.set_pts(e);
		cr.seal(this)
	}
	cr.logexport = function(e) {
		if (window.console && window.console.log) window.console.log(e)
	};
	cr.seal = function(e) {
		return e
	};
	cr.freeze = function(e) {
		return e
	};
	cr.is_undefined = function(e) {
		return typeof e === "undefined"
	};
	cr.is_number = function(e) {
		return typeof e === "number"
	};
	cr.is_string = function(e) {
		return typeof e === "string"
	};
	cr.isPOT = function(e) {
		return e > 0 && (e - 1 & e) === 0
	};
	cr.abs = function(e) {
		return e < 0 ? -e : e
	};
	cr.max = function(e, t) {
		return e > t ? e : t
	};
	cr.min = function(e, t) {
		return e < t ? e : t
	};
	cr.PI = Math.PI;
	cr.round = function(e) {
		return e + .5 | 0
	};
	cr.floor = function(e) {
		return e | 0
	};
	e.prototype.offset = function(e, t) {
		this.x += e;
		this.y += t;
		return this
	};
	e.prototype.mul = function(e, t) {
		this.x *= e;
		this.y *= t;
		return this
	};
	cr.vector2 = e;
	cr.segments_intersect = function(e, t, n, r, i, s, o, u) {
		if (cr.max(e, n) < cr.min(i, o) || cr.min(e, n) > cr.max(i, o) || cr.max(t, r) < cr.min(s, u) || cr.min(t, r) > cr.max(s, u)) {
			return false
		}
		var a = i - e + o - n;
		var f = s - t + u - r;
		var l = n - e;
		var c = r - t;
		var h = o - i;
		var p = u - s;
		var d = cr.abs(c * h - p * l);
		var v = h * f - p * a;
		var m = l * f - c * a;
		return cr.abs(v) <= d && cr.abs(m) <= d
	};
	t.prototype.set = function(e, t, n, r) {
		this.left = e;
		this.top = t;
		this.right = n;
		this.bottom = r
	};
	t.prototype.width = function() {
		return this.right - this.left
	};
	t.prototype.height = function() {
		return this.bottom - this.top
	};
	t.prototype.offset = function(e, t) {
		this.left += e;
		this.top += t;
		this.right += e;
		this.bottom += t;
		return this
	};
	t.prototype.intersects_rect = function(e) {
		return !(e.right < this.left || e.bottom < this.top || e.left > this.right || e.top > this.bottom)
	};
	t.prototype.contains_pt = function(e, t) {
		return e >= this.left && e <= this.right && t >= this.top && t <= this.bottom
	};
	cr.rect = t;
	n.prototype.set_from_rect = function(e) {
		this.tlx = e.left;
		this.tly = e.top;
		this.trx = e.right;
		this.try_ = e.top;
		this.brx = e.right;
		this.bry = e.bottom;
		this.blx = e.left;
		this.bly = e.bottom
	};
	n.prototype.set_from_rotated_rect = function(e, t) {
		if (t === 0) {
			this.set_from_rect(e)
		} else {
			var n = Math.sin(t);
			var r = Math.cos(t);
			var i = e.left * n;
			var s = e.top * n;
			var o = e.right * n;
			var u = e.bottom * n;
			var a = e.left * r;
			var f = e.top * r;
			var l = e.right * r;
			var c = e.bottom * r;
			this.tlx = a - s;
			this.tly = f + i;
			this.trx = l - s;
			this.try_ = f + o;
			this.brx = l - u;
			this.bry = c + o;
			this.blx = a - u;
			this.bly = c + i
		}
	};
	n.prototype.offset = function(e, t) {
		this.tlx += e;
		this.tly += t;
		this.trx += e;
		this.try_ += t;
		this.brx += e;
		this.bry += t;
		this.blx += e;
		this.bly += t;
		return this
	};
	n.prototype.bounding_box = function(e) {
		e.left = cr.min(cr.min(this.tlx, this.trx), cr.min(this.brx, this.blx));
		e.top = cr.min(cr.min(this.tly, this.try_), cr.min(this.bry, this.bly));
		e.right = cr.max(cr.max(this.tlx, this.trx), cr.max(this.brx, this.blx));
		e.bottom = cr.max(cr.max(this.tly, this.try_), cr.max(this.bry, this.bly))
	};
	n.prototype.contains_pt = function(e, t) {
		var n = this.trx - this.tlx;
		var r = this.try_ - this.tly;
		var i = this.brx - this.tlx;
		var s = this.bry - this.tly;
		var o = e - this.tlx;
		var u = t - this.tly;
		var a = n * n + r * r;
		var f = n * i + r * s;
		var l = n * o + r * u;
		var c = i * i + s * s;
		var h = i * o + s * u;
		var p = 1 / (a * c - f * f);
		var d = (c * l - f * h) * p;
		var v = (a * h - f * l) * p;
		if (d >= 0 && v > 0 && d + v < 1) return true;
		n = this.blx - this.tlx;
		r = this.bly - this.tly;
		var a = n * n + r * r;
		var f = n * i + r * s;
		var l = n * o + r * u;
		p = 1 / (a * c - f * f);
		d = (c * l - f * h) * p;
		v = (a * h - f * l) * p;
		return d >= 0 && v > 0 && d + v < 1
	};
	n.prototype.at = function(e, t) {
		switch (e) {
		case 0:
			return t ? this.tlx : this.tly;
		case 1:
			return t ? this.trx : this.try_;
		case 2:
			return t ? this.brx : this.bry;
		case 3:
			return t ? this.blx : this.bly;
		case 4:
			return t ? this.tlx : this.tly;
		default:
			return t ? this.tlx : this.tly
		}
	};
	n.prototype.midX = function() {
		return (this.tlx + this.trx + this.brx + this.blx) / 4
	};
	n.prototype.midY = function() {
		return (this.tly + this.try_ + this.bry + this.bly) / 4
	};
	n.prototype.intersects_segment = function(e, t, n, r) {
		if (this.contains_pt(e, t) || this.contains_pt(n, r)) return true;
		var i, s, o, u;
		var a;
		for (a = 0; a < 4; a++) {
			i = this.at(a, true);
			s = this.at(a, false);
			o = this.at(a + 1, true);
			u = this.at(a + 1, false);
			if (cr.segments_intersect(e, t, n, r, i, s, o, u)) return true
		}
		return false
	};
	n.prototype.intersects_quad = function(e) {
		var t = e.midX();
		var n = e.midY();
		if (this.contains_pt(t, n)) return true;
		t = this.midX();
		n = this.midY();
		if (e.contains_pt(t, n)) return true;
		var r, i, s, o, u, a, f, l;
		var c, h;
		for (c = 0; c < 4; c++) {
			for (h = 0; h < 4; h++) {
				r = this.at(c, true);
				i = this.at(c, false);
				s = this.at(c + 1, true);
				o = this.at(c + 1, false);
				u = e.at(h, true);
				a = e.at(h, false);
				f = e.at(h + 1, true);
				l = e.at(h + 1, false);
				if (cr.segments_intersect(r, i, s, o, u, a, f, l)) return true
			}
		}
		return false
	};
	cr.quad = n;
	cr.RGB = function(e, t, n) {
		return Math.max(Math.min(e, 255), 0) | Math.max(Math.min(t, 255), 0) << 8 | Math.max(Math.min(n, 255), 0) << 16
	};
	cr.GetRValue = function(e) {
		return e & 255
	};
	cr.GetGValue = function(e) {
		return (e & 65280) >> 8
	};
	cr.GetBValue = function(e) {
		return (e & 16711680) >> 16
	};
	cr.shallowCopy = function(e, t, n) {
		var r;
		for (r in t) {
			if (t.hasOwnProperty(r)) {
				e[r] = t[r]
			}
		}
		return e
	};
	cr.arrayRemove = function(e, t) {
		var n, r;
		t = cr.floor(t);
		if (t < 0 || t >= e.length) return;
		if (t === 0) e.shift();
		else if (t === e.length - 1) e.pop();
		else {
			for (n = t, r = e.length - 1; n < r; n++) e[n] = e[n + 1];
			e.length = r
		}
	};
	cr.shallowAssignArray = function(e, t) {
		e.length = t.length;
		var n, r;
		for (n = 0, r = t.length; n < r; n++) e[n] = t[n]
	};
	cr.arrayFindRemove = function(e, t) {
		var n = e.indexOf(t);
		if (n !== -1) cr.arrayRemove(e, n)
	};
	cr.clamp = function(e, t, n) {
		if (e < t) return t;
		else if (e > n) return n;
		else return e
	};
	cr.to_radians = function(e) {
		return e / (180 / cr.PI)
	};
	cr.to_degrees = function(e) {
		return e * (180 / cr.PI)
	};
	cr.clamp_angle_degrees = function(e) {
		e %= 360;
		if (e < 0) e += 360;
		return e
	};
	cr.clamp_angle = function(e) {
		e %= 2 * cr.PI;
		if (e < 0) e += 2 * cr.PI;
		return e
	};
	cr.to_clamped_degrees = function(e) {
		return cr.clamp_angle_degrees(cr.to_degrees(e))
	};
	cr.to_clamped_radians = function(e) {
		return cr.clamp_angle(cr.to_radians(e))
	};
	cr.angleTo = function(e, t, n, r) {
		var i = n - e;
		var s = r - t;
		return Math.atan2(s, i)
	};
	cr.angleDiff = function(e, t) {
		if (e === t) return 0;
		var n = Math.sin(e);
		var r = Math.cos(e);
		var i = Math.sin(t);
		var s = Math.cos(t);
		var o = n * i + r * s;
		if (o >= 1) return 0;
		if (o <= -1) return cr.PI;
		return Math.acos(o)
	};
	cr.angleRotate = function(e, t, n) {
		var r = Math.sin(e);
		var i = Math.cos(e);
		var s = Math.sin(t);
		var o = Math.cos(t);
		if (Math.acos(r * s + i * o) > n) {
			if (i * s - r * o > 0) return cr.clamp_angle(e + n);
			else return cr.clamp_angle(e - n)
		} else return cr.clamp_angle(t)
	};
	cr.angleClockwise = function(e, t) {
		var n = Math.sin(e);
		var r = Math.cos(e);
		var i = Math.sin(t);
		var s = Math.cos(t);
		return r * i - n * s <= 0
	};
	cr.rotatePtAround = function(e, t, n, r, i, s) {
		if (n === 0) return s ? e : t;
		var o = Math.sin(n);
		var u = Math.cos(n);
		e -= r;
		t -= i;
		var a = e * o;
		var f = t * o;
		var l = e * u;
		var c = t * u;
		e = l - f;
		t = c + a;
		e += r;
		t += i;
		return s ? e : t
	};
	cr.distanceTo = function(e, t, n, r) {
		var i = n - e;
		var s = r - t;
		return Math.sqrt(i * i + s * s)
	};
	cr.xor = function(e, t) {
		return !e !== !t
	};
	cr.lerp = function(e, t, n) {
		return e + (t - e) * n
	};
	cr.hasAnyOwnProperty = function(e) {
		var t;
		for (t in e) {
			if (e.hasOwnProperty(t)) return true
		}
		return false
	};
	cr.wipe = function(e) {
		var t;
		for (t in e) {
			if (e.hasOwnProperty(t)) delete e[t]
		}
	};
	var r = +(new Date);
	cr.performance_now = function() {
		if (typeof window["performance"] !== "undefined") {
			var e = window["performance"];
			if (typeof e.now !== "undefined") return e.now();
			else if (typeof e["webkitNow"] !== "undefined") return e["webkitNow"]();
			else if (typeof e["msNow"] !== "undefined") return e["msNow"]()
		}
		return Date.now() - r
	};
	var i = typeof Set !== "undefined" && typeof Set.prototype["forEach"] !== "undefined";
	s.prototype.contains = function(e) {
		if (i) return this.s["has"](e);
		else return this.items.hasOwnProperty(e.toString())
	};
	s.prototype.add = function(e) {
		if (i) {
			if (!this.s["has"](e)) {
				this.s["add"](e);
				this.cache_valid = false
			}
		} else {
			var t = e.toString();
			if (!this.items.hasOwnProperty(t)) {
				this.items[t] = e;
				this.item_count++;
				this.cache_valid = false
			}
		}
		return this
	};
	s.prototype.remove = function(e) {
		if (i) {
			if (this.s["has"](e)) {
				this.s["delete"](e);
				this.cache_valid = false
			}
		} else {
			var t = e.toString();
			if (this.items.hasOwnProperty(t)) {
				delete this.items[t];
				this.item_count--;
				this.cache_valid = false
			}
		}
		return this
	};
	s.prototype.clear = function() {
		if (i) {
			this.s["clear"]()
		} else {
			cr.wipe(this.items);
			this.item_count = 0
		}
		this.values_cache.length = 0;
		this.cache_valid = true;
		return this
	};
	s.prototype.isEmpty = function() {
		if (i) return this.s["size"] === 0;
		else return this.item_count === 0
	};
	s.prototype.count = function() {
		if (i) return this.s["size"];
		else return this.item_count
	};
	var o = null;
	var u = 0;
	s.prototype.update_cache = function() {
		if (this.cache_valid) return;
		if (i) {
			this.values_cache.length = this.s["size"];
			o = this.values_cache;
			u = 0;
			this.s["forEach"](a);
			o = null;
			u = 0
		} else {
			this.values_cache.length = this.item_count;
			var e, t = 0;
			for (e in this.items) {
				if (this.items.hasOwnProperty(e)) this.values_cache[t++] = this.items[e]
			}
		}
		this.cache_valid = true
	};
	s.prototype.values = function() {
		this.update_cache();
		return this.values_cache.slice(0)
	};
	s.prototype.valuesRef = function() {
		this.update_cache();
		return this.values_cache
	};
	cr.ObjectSet = s;
	f.prototype.add = function(e) {
		this.y = e - this.c;
		this.t = this.sum + this.y;
		this.c = this.t - this.sum - this.y;
		this.sum = this.t
	};
	f.prototype.reset = function() {
		this.c = 0;
		this.y = 0;
		this.t = 0;
		this.sum = 0
	};
	cr.KahanAdder = f;
	cr.regexp_escape = function(e) {
		return e.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
	};
	l.prototype.set_pts = function(e) {
		this.pts_array = e;
		this.pts_count = e.length / 2;
		this.pts_cache.length = e.length;
		this.cache_width = -1;
		this.cache_height = -1;
		this.cache_angle = 0
	};
	l.prototype.is_empty = function() {
		return !this.pts_array.length
	};
	l.prototype.set_from_quad = function(e, t, n, r, i) {
		this.pts_cache.length = 8;
		this.pts_count = 4;
		var s = this.pts_cache;
		s[0] = e.tlx - t;
		s[1] = e.tly - n;
		s[2] = e.trx - t;
		s[3] = e.try_ - n;
		s[4] = e.brx - t;
		s[5] = e.bry - n;
		s[6] = e.blx - t;
		s[7] = e.bly - n;
		this.cache_width = r;
		this.cache_height = i
	};
	l.prototype.set_from_poly = function(e) {
		this.pts_count = e.pts_count;
		cr.shallowAssignArray(this.pts_cache, e.pts_cache)
	};
	l.prototype.cache_poly = function(e, t, n) {
		if (this.cache_width === e && this.cache_height === t && this.cache_angle === n) return;
		this.cache_width = e;
		this.cache_height = t;
		this.cache_angle = n;
		var r, i, s, o;
		var u = 0;
		var a = 1;
		var f = this.pts_array;
		var l = this.pts_cache;
		if (n !== 0) {
			u = Math.sin(n);
			a = Math.cos(n)
		}
		for (r = 0, i = this.pts_count; r < i; r++) {
			s = f[r * 2] * e;
			o = f[r * 2 + 1] * t;
			l[r * 2] = s * a - o * u;
			l[r * 2 + 1] = o * a + s * u
		}
	};
	l.prototype.contains_pt = function(e, t) {
		var n = this.pts_cache;
		if (e === n[0] && t === n[1]) return true;
		var r, i, s, o = this.pts_count;
		var u = n[0];
		var a = u;
		var f = n[1];
		var l = f;
		for (r = 1; r < o; r++) {
			i = n[r * 2];
			s = n[r * 2 + 1];
			if (i < u) u = i;
			if (i > a) a = i;
			if (s < f) f = s;
			if (s > l) l = s
		}
		var c = u - 110;
		var h = f - 101;
		var p = a + 131;
		var d = l + 120;
		var v, m, g, y;
		var b = 0,
			w = 0;
		for (r = 0; r < o; r++) {
			v = n[r * 2];
			m = n[r * 2 + 1];
			g = n[(r + 1) % o * 2];
			y = n[(r + 1) % o * 2 + 1];
			if (cr.segments_intersect(c, h, e, t, v, m, g, y)) b++;
			if (cr.segments_intersect(p, d, e, t, v, m, g, y)) w++
		}
		return b % 2 === 1 || w % 2 === 1
	};
	l.prototype.intersects_poly = function(e, t, n) {
		var r = e.pts_cache;
		var i = this.pts_cache;
		if (this.contains_pt(r[0] + t, r[1] + n)) return true;
		if (e.contains_pt(i[0] - t, i[1] - n)) return true;
		var s, o, u, a;
		var f, l, c, h, p, d, v, m;
		for (s = 0, o = this.pts_count; s < o; s++) {
			f = i[s * 2];
			l = i[s * 2 + 1];
			c = i[(s + 1) % o * 2];
			h = i[(s + 1) % o * 2 + 1];
			for (u = 0, a = e.pts_count; u < a; u++) {
				p = r[u * 2] + t;
				d = r[u * 2 + 1] + n;
				v = r[(u + 1) % a * 2] + t;
				m = r[(u + 1) % a * 2 + 1] + n;
				if (cr.segments_intersect(f, l, c, h, p, d, v, m)) return true
			}
		}
		return false
	};
	l.prototype.intersects_segment = function(e, t, n, r, i, s) {
		var o = this.pts_cache;
		if (this.contains_pt(n - e, r - t)) return true;
		var u, a;
		var f, l, c, h;
		for (u = 0, a = this.pts_count; u < a; u++) {
			f = o[u * 2] + e;
			l = o[u * 2 + 1] + t;
			c = o[(u + 1) % a * 2] + e;
			h = o[(u + 1) % a * 2 + 1] + t;
			if (cr.segments_intersect(n, r, i, s, f, l, c, h)) return true
		}
		return false
	};
	cr.CollisionPoly = l;
	var c = ["lighter", "xor", "copy", "destination-over", "source-in", "destination-in", "source-out", "destination-out", "source-atop", "destination-atop"];
	cr.effectToCompositeOp = function(e) {
		if (e <= 0 || e >= 11) return "source-over";
		return c[e - 1]
	};
	cr.setGLBlend = function(e, t, n) {
		if (!n) return;
		e.srcBlend = n.ONE;
		e.destBlend = n.ONE_MINUS_SRC_ALPHA;
		switch (t) {
		case 1:
			e.srcBlend = n.ONE;
			e.destBlend = n.ONE;
			break;
		case 2:
			break;
		case 3:
			e.srcBlend = n.ONE;
			e.destBlend = n.ZERO;
			break;
		case 4:
			e.srcBlend = n.ONE_MINUS_DST_ALPHA;
			e.destBlend = n.ONE;
			break;
		case 5:
			e.srcBlend = n.DST_ALPHA;
			e.destBlend = n.ZERO;
			break;
		case 6:
			e.srcBlend = n.ZERO;
			e.destBlend = n.SRC_ALPHA;
			break;
		case 7:
			e.srcBlend = n.ONE_MINUS_DST_ALPHA;
			e.destBlend = n.ZERO;
			break;
		case 8:
			e.srcBlend = n.ZERO;
			e.destBlend = n.ONE_MINUS_SRC_ALPHA;
			break;
		case 9:
			e.srcBlend = n.DST_ALPHA;
			e.destBlend = n.ONE_MINUS_SRC_ALPHA;
			break;
		case 10:
			e.srcBlend = n.ONE_MINUS_DST_ALPHA;
			e.destBlend = n.SRC_ALPHA;
			break
		}
	};
	cr.round6dp = function(e) {
		return Math.round(e * 1e6) / 1e6
	};
	cr.equals_nocase = function(e, t) {
		if (typeof e !== "string" || typeof t !== "string") return false;
		if (e.length !== t.length) return false;
		if (e === t) return true;
		return e.toLowerCase() === t.toLowerCase()
	}
})();
var MatrixArray = typeof Float32Array !== "undefined" ? Float32Array : Array,
	glMatrixArrayType = MatrixArray,
	vec3 = {},
	mat3 = {},
	mat4 = {},
	quat4 = {};
vec3.create = function(e) {
	var t = new MatrixArray(3);
	e && (t[0] = e[0], t[1] = e[1], t[2] = e[2]);
	return t
};
vec3.set = function(e, t) {
	t[0] = e[0];
	t[1] = e[1];
	t[2] = e[2];
	return t
};
vec3.add = function(e, t, n) {
	if (!n || e === n) return e[0] += t[0], e[1] += t[1], e[2] += t[2], e;
	n[0] = e[0] + t[0];
	n[1] = e[1] + t[1];
	n[2] = e[2] + t[2];
	return n
};
vec3.subtract = function(e, t, n) {
	if (!n || e === n) return e[0] -= t[0], e[1] -= t[1], e[2] -= t[2], e;
	n[0] = e[0] - t[0];
	n[1] = e[1] - t[1];
	n[2] = e[2] - t[2];
	return n
};
vec3.negate = function(e, t) {
	t || (t = e);
	t[0] = -e[0];
	t[1] = -e[1];
	t[2] = -e[2];
	return t
};
vec3.scale = function(e, t, n) {
	if (!n || e === n) return e[0] *= t, e[1] *= t, e[2] *= t, e;
	n[0] = e[0] * t;
	n[1] = e[1] * t;
	n[2] = e[2] * t;
	return n
};
vec3.normalize = function(e, t) {
	t || (t = e);
	var n = e[0],
		r = e[1],
		i = e[2],
		s = Math.sqrt(n * n + r * r + i * i);
	if (s) {
		if (s === 1) return t[0] = n, t[1] = r, t[2] = i, t
	} else return t[0] = 0, t[1] = 0, t[2] = 0, t;
	s = 1 / s;
	t[0] = n * s;
	t[1] = r * s;
	t[2] = i * s;
	return t
};
vec3.cross = function(e, t, n) {
	n || (n = e);
	var r = e[0],
		i = e[1],
		e = e[2],
		s = t[0],
		o = t[1],
		t = t[2];
	n[0] = i * t - e * o;
	n[1] = e * s - r * t;
	n[2] = r * o - i * s;
	return n
};
vec3.length = function(e) {
	var t = e[0],
		n = e[1],
		e = e[2];
	return Math.sqrt(t * t + n * n + e * e)
};
vec3.dot = function(e, t) {
	return e[0] * t[0] + e[1] * t[1] + e[2] * t[2]
};
vec3.direction = function(e, t, n) {
	n || (n = e);
	var r = e[0] - t[0],
		i = e[1] - t[1],
		e = e[2] - t[2],
		t = Math.sqrt(r * r + i * i + e * e);
	if (!t) return n[0] = 0, n[1] = 0, n[2] = 0, n;
	t = 1 / t;
	n[0] = r * t;
	n[1] = i * t;
	n[2] = e * t;
	return n
};
vec3.lerp = function(e, t, n, r) {
	r || (r = e);
	r[0] = e[0] + n * (t[0] - e[0]);
	r[1] = e[1] + n * (t[1] - e[1]);
	r[2] = e[2] + n * (t[2] - e[2]);
	return r
};
vec3.str = function(e) {
	return "[" + e[0] + ", " + e[1] + ", " + e[2] + "]"
};
mat3.create = function(e) {
	var t = new MatrixArray(9);
	e && (t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[4] = e[4], t[5] = e[5], t[6] = e[6], t[7] = e[7], t[8] = e[8]);
	return t
};
mat3.set = function(e, t) {
	t[0] = e[0];
	t[1] = e[1];
	t[2] = e[2];
	t[3] = e[3];
	t[4] = e[4];
	t[5] = e[5];
	t[6] = e[6];
	t[7] = e[7];
	t[8] = e[8];
	return t
};
mat3.identity = function(e) {
	e[0] = 1;
	e[1] = 0;
	e[2] = 0;
	e[3] = 0;
	e[4] = 1;
	e[5] = 0;
	e[6] = 0;
	e[7] = 0;
	e[8] = 1;
	return e
};
mat3.transpose = function(e, t) {
	if (!t || e === t) {
		var n = e[1],
			r = e[2],
			i = e[5];
		e[1] = e[3];
		e[2] = e[6];
		e[3] = n;
		e[5] = e[7];
		e[6] = r;
		e[7] = i;
		return e
	}
	t[0] = e[0];
	t[1] = e[3];
	t[2] = e[6];
	t[3] = e[1];
	t[4] = e[4];
	t[5] = e[7];
	t[6] = e[2];
	t[7] = e[5];
	t[8] = e[8];
	return t
};
mat3.toMat4 = function(e, t) {
	t || (t = mat4.create());
	t[15] = 1;
	t[14] = 0;
	t[13] = 0;
	t[12] = 0;
	t[11] = 0;
	t[10] = e[8];
	t[9] = e[7];
	t[8] = e[6];
	t[7] = 0;
	t[6] = e[5];
	t[5] = e[4];
	t[4] = e[3];
	t[3] = 0;
	t[2] = e[2];
	t[1] = e[1];
	t[0] = e[0];
	return t
};
mat3.str = function(e) {
	return "[" + e[0] + ", " + e[1] + ", " + e[2] + ", " + e[3] + ", " + e[4] + ", " + e[5] + ", " + e[6] + ", " + e[7] + ", " + e[8] + "]"
};
mat4.create = function(e) {
	var t = new MatrixArray(16);
	e && (t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t[4] = e[4], t[5] = e[5], t[6] = e[6], t[7] = e[7], t[8] = e[8], t[9] = e[9], t[10] = e[10], t[11] = e[11], t[12] = e[12], t[13] = e[13], t[14] = e[14], t[15] = e[15]);
	return t
};
mat4.set = function(e, t) {
	t[0] = e[0];
	t[1] = e[1];
	t[2] = e[2];
	t[3] = e[3];
	t[4] = e[4];
	t[5] = e[5];
	t[6] = e[6];
	t[7] = e[7];
	t[8] = e[8];
	t[9] = e[9];
	t[10] = e[10];
	t[11] = e[11];
	t[12] = e[12];
	t[13] = e[13];
	t[14] = e[14];
	t[15] = e[15];
	return t
};
mat4.identity = function(e) {
	e[0] = 1;
	e[1] = 0;
	e[2] = 0;
	e[3] = 0;
	e[4] = 0;
	e[5] = 1;
	e[6] = 0;
	e[7] = 0;
	e[8] = 0;
	e[9] = 0;
	e[10] = 1;
	e[11] = 0;
	e[12] = 0;
	e[13] = 0;
	e[14] = 0;
	e[15] = 1;
	return e
};
mat4.transpose = function(e, t) {
	if (!t || e === t) {
		var n = e[1],
			r = e[2],
			i = e[3],
			s = e[6],
			o = e[7],
			u = e[11];
		e[1] = e[4];
		e[2] = e[8];
		e[3] = e[12];
		e[4] = n;
		e[6] = e[9];
		e[7] = e[13];
		e[8] = r;
		e[9] = s;
		e[11] = e[14];
		e[12] = i;
		e[13] = o;
		e[14] = u;
		return e
	}
	t[0] = e[0];
	t[1] = e[4];
	t[2] = e[8];
	t[3] = e[12];
	t[4] = e[1];
	t[5] = e[5];
	t[6] = e[9];
	t[7] = e[13];
	t[8] = e[2];
	t[9] = e[6];
	t[10] = e[10];
	t[11] = e[14];
	t[12] = e[3];
	t[13] = e[7];
	t[14] = e[11];
	t[15] = e[15];
	return t
};
mat4.determinant = function(e) {
	var t = e[0],
		n = e[1],
		r = e[2],
		i = e[3],
		s = e[4],
		o = e[5],
		u = e[6],
		a = e[7],
		f = e[8],
		l = e[9],
		c = e[10],
		h = e[11],
		p = e[12],
		d = e[13],
		v = e[14],
		e = e[15];
	return p * l * u * i - f * d * u * i - p * o * c * i + s * d * c * i + f * o * v * i - s * l * v * i - p * l * r * a + f * d * r * a + p * n * c * a - t * d * c * a - f * n * v * a + t * l * v * a + p * o * r * h - s * d * r * h - p * n * u * h + t * d * u * h + s * n * v * h - t * o * v * h - f * o * r * e + s * l * r * e + f * n * u * e - t * l * u * e - s * n * c * e + t * o * c * e
};
mat4.inverse = function(e, t) {
	t || (t = e);
	var n = e[0],
		r = e[1],
		i = e[2],
		s = e[3],
		o = e[4],
		u = e[5],
		a = e[6],
		f = e[7],
		l = e[8],
		c = e[9],
		h = e[10],
		p = e[11],
		d = e[12],
		v = e[13],
		m = e[14],
		g = e[15],
		y = n * u - r * o,
		b = n * a - i * o,
		w = n * f - s * o,
		E = r * a - i * u,
		S = r * f - s * u,
		x = i * f - s * a,
		T = l * v - c * d,
		N = l * m - h * d,
		C = l * g - p * d,
		k = c * m - h * v,
		L = c * g - p * v,
		A = h * g - p * m,
		O = 1 / (y * A - b * L + w * k + E * C - S * N + x * T);
	t[0] = (u * A - a * L + f * k) * O;
	t[1] = (-r * A + i * L - s * k) * O;
	t[2] = (v * x - m * S + g * E) * O;
	t[3] = (-c * x + h * S - p * E) * O;
	t[4] = (-o * A + a * C - f * N) * O;
	t[5] = (n * A - i * C + s * N) * O;
	t[6] = (-d * x + m * w - g * b) * O;
	t[7] = (l * x - h * w + p * b) * O;
	t[8] = (o * L - u * C + f * T) * O;
	t[9] = (-n * L + r * C - s * T) * O;
	t[10] = (d * S - v * w + g * y) * O;
	t[11] = (-l * S + c * w - p * y) * O;
	t[12] = (-o * k + u * N - a * T) * O;
	t[13] = (n * k - r * N + i * T) * O;
	t[14] = (-d * E + v * b - m * y) * O;
	t[15] = (l * E - c * b + h * y) * O;
	return t
};
mat4.toRotationMat = function(e, t) {
	t || (t = mat4.create());
	t[0] = e[0];
	t[1] = e[1];
	t[2] = e[2];
	t[3] = e[3];
	t[4] = e[4];
	t[5] = e[5];
	t[6] = e[6];
	t[7] = e[7];
	t[8] = e[8];
	t[9] = e[9];
	t[10] = e[10];
	t[11] = e[11];
	t[12] = 0;
	t[13] = 0;
	t[14] = 0;
	t[15] = 1;
	return t
};
mat4.toMat3 = function(e, t) {
	t || (t = mat3.create());
	t[0] = e[0];
	t[1] = e[1];
	t[2] = e[2];
	t[3] = e[4];
	t[4] = e[5];
	t[5] = e[6];
	t[6] = e[8];
	t[7] = e[9];
	t[8] = e[10];
	return t
};
mat4.toInverseMat3 = function(e, t) {
	var n = e[0],
		r = e[1],
		i = e[2],
		s = e[4],
		o = e[5],
		u = e[6],
		a = e[8],
		f = e[9],
		l = e[10],
		c = l * o - u * f,
		h = -l * s + u * a,
		p = f * s - o * a,
		d = n * c + r * h + i * p;
	if (!d) return null;
	d = 1 / d;
	t || (t = mat3.create());
	t[0] = c * d;
	t[1] = (-l * r + i * f) * d;
	t[2] = (u * r - i * o) * d;
	t[3] = h * d;
	t[4] = (l * n - i * a) * d;
	t[5] = (-u * n + i * s) * d;
	t[6] = p * d;
	t[7] = (-f * n + r * a) * d;
	t[8] = (o * n - r * s) * d;
	return t
};
mat4.multiply = function(e, t, n) {
	n || (n = e);
	var r = e[0],
		i = e[1],
		s = e[2],
		o = e[3],
		u = e[4],
		a = e[5],
		f = e[6],
		l = e[7],
		c = e[8],
		h = e[9],
		p = e[10],
		d = e[11],
		v = e[12],
		m = e[13],
		g = e[14],
		e = e[15],
		y = t[0],
		b = t[1],
		w = t[2],
		E = t[3],
		S = t[4],
		x = t[5],
		T = t[6],
		N = t[7],
		C = t[8],
		k = t[9],
		L = t[10],
		A = t[11],
		O = t[12],
		M = t[13],
		_ = t[14],
		t = t[15];
	n[0] = y * r + b * u + w * c + E * v;
	n[1] = y * i + b * a + w * h + E * m;
	n[2] = y * s + b * f + w * p + E * g;
	n[3] = y * o + b * l + w * d + E * e;
	n[4] = S * r + x * u + T * c + N * v;
	n[5] = S * i + x * a + T * h + N * m;
	n[6] = S * s + x * f + T * p + N * g;
	n[7] = S * o + x * l + T * d + N * e;
	n[8] = C * r + k * u + L * c + A * v;
	n[9] = C * i + k * a + L * h + A * m;
	n[10] = C * s + k * f + L * p + A * g;
	n[11] = C * o + k * l + L * d + A * e;
	n[12] = O * r + M * u + _ * c + t * v;
	n[13] = O * i + M * a + _ * h + t * m;
	n[14] = O * s + M * f + _ * p + t * g;
	n[15] = O * o + M * l + _ * d + t * e;
	return n
};
mat4.multiplyVec3 = function(e, t, n) {
	n || (n = t);
	var r = t[0],
		i = t[1],
		t = t[2];
	n[0] = e[0] * r + e[4] * i + e[8] * t + e[12];
	n[1] = e[1] * r + e[5] * i + e[9] * t + e[13];
	n[2] = e[2] * r + e[6] * i + e[10] * t + e[14];
	return n
};
mat4.multiplyVec4 = function(e, t, n) {
	n || (n = t);
	var r = t[0],
		i = t[1],
		s = t[2],
		t = t[3];
	n[0] = e[0] * r + e[4] * i + e[8] * s + e[12] * t;
	n[1] = e[1] * r + e[5] * i + e[9] * s + e[13] * t;
	n[2] = e[2] * r + e[6] * i + e[10] * s + e[14] * t;
	n[3] = e[3] * r + e[7] * i + e[11] * s + e[15] * t;
	return n
};
mat4.translate = function(e, t, n) {
	var r = t[0],
		i = t[1],
		t = t[2],
		s, o, u, a, f, l, c, h, p, d, v, m;
	if (!n || e === n) return e[12] = e[0] * r + e[4] * i + e[8] * t + e[12], e[13] = e[1] * r + e[5] * i + e[9] * t + e[13], e[14] = e[2] * r + e[6] * i + e[10] * t + e[14], e[15] = e[3] * r + e[7] * i + e[11] * t + e[15], e;
	s = e[0];
	o = e[1];
	u = e[2];
	a = e[3];
	f = e[4];
	l = e[5];
	c = e[6];
	h = e[7];
	p = e[8];
	d = e[9];
	v = e[10];
	m = e[11];
	n[0] = s;
	n[1] = o;
	n[2] = u;
	n[3] = a;
	n[4] = f;
	n[5] = l;
	n[6] = c;
	n[7] = h;
	n[8] = p;
	n[9] = d;
	n[10] = v;
	n[11] = m;
	n[12] = s * r + f * i + p * t + e[12];
	n[13] = o * r + l * i + d * t + e[13];
	n[14] = u * r + c * i + v * t + e[14];
	n[15] = a * r + h * i + m * t + e[15];
	return n
};
mat4.scale = function(e, t, n) {
	var r = t[0],
		i = t[1],
		t = t[2];
	if (!n || e === n) return e[0] *= r, e[1] *= r, e[2] *= r, e[3] *= r, e[4] *= i, e[5] *= i, e[6] *= i, e[7] *= i, e[8] *= t, e[9] *= t, e[10] *= t, e[11] *= t, e;
	n[0] = e[0] * r;
	n[1] = e[1] * r;
	n[2] = e[2] * r;
	n[3] = e[3] * r;
	n[4] = e[4] * i;
	n[5] = e[5] * i;
	n[6] = e[6] * i;
	n[7] = e[7] * i;
	n[8] = e[8] * t;
	n[9] = e[9] * t;
	n[10] = e[10] * t;
	n[11] = e[11] * t;
	n[12] = e[12];
	n[13] = e[13];
	n[14] = e[14];
	n[15] = e[15];
	return n
};
mat4.rotate = function(e, t, n, r) {
	var i = n[0],
		s = n[1],
		n = n[2],
		o = Math.sqrt(i * i + s * s + n * n),
		u, a, f, l, c, h, p, d, v, m, g, y, b, w, E, S, x, T, N, C;
	if (!o) return null;
	o !== 1 && (o = 1 / o, i *= o, s *= o, n *= o);
	u = Math.sin(t);
	a = Math.cos(t);
	f = 1 - a;
	t = e[0];
	o = e[1];
	l = e[2];
	c = e[3];
	h = e[4];
	p = e[5];
	d = e[6];
	v = e[7];
	m = e[8];
	g = e[9];
	y = e[10];
	b = e[11];
	w = i * i * f + a;
	E = s * i * f + n * u;
	S = n * i * f - s * u;
	x = i * s * f - n * u;
	T = s * s * f + a;
	N = n * s * f + i * u;
	C = i * n * f + s * u;
	i = s * n * f - i * u;
	s = n * n * f + a;
	r ? e !== r && (r[12] = e[12], r[13] = e[13], r[14] = e[14], r[15] = e[15]) : r = e;
	r[0] = t * w + h * E + m * S;
	r[1] = o * w + p * E + g * S;
	r[2] = l * w + d * E + y * S;
	r[3] = c * w + v * E + b * S;
	r[4] = t * x + h * T + m * N;
	r[5] = o * x + p * T + g * N;
	r[6] = l * x + d * T + y * N;
	r[7] = c * x + v * T + b * N;
	r[8] = t * C + h * i + m * s;
	r[9] = o * C + p * i + g * s;
	r[10] = l * C + d * i + y * s;
	r[11] = c * C + v * i + b * s;
	return r
};
mat4.rotateX = function(e, t, n) {
	var r = Math.sin(t),
		t = Math.cos(t),
		i = e[4],
		s = e[5],
		o = e[6],
		u = e[7],
		a = e[8],
		f = e[9],
		l = e[10],
		c = e[11];
	n ? e !== n && (n[0] = e[0], n[1] = e[1], n[2] = e[2], n[3] = e[3], n[12] = e[12], n[13] = e[13], n[14] = e[14], n[15] = e[15]) : n = e;
	n[4] = i * t + a * r;
	n[5] = s * t + f * r;
	n[6] = o * t + l * r;
	n[7] = u * t + c * r;
	n[8] = i * -r + a * t;
	n[9] = s * -r + f * t;
	n[10] = o * -r + l * t;
	n[11] = u * -r + c * t;
	return n
};
mat4.rotateY = function(e, t, n) {
	var r = Math.sin(t),
		t = Math.cos(t),
		i = e[0],
		s = e[1],
		o = e[2],
		u = e[3],
		a = e[8],
		f = e[9],
		l = e[10],
		c = e[11];
	n ? e !== n && (n[4] = e[4], n[5] = e[5], n[6] = e[6], n[7] = e[7], n[12] = e[12], n[13] = e[13], n[14] = e[14], n[15] = e[15]) : n = e;
	n[0] = i * t + a * -r;
	n[1] = s * t + f * -r;
	n[2] = o * t + l * -r;
	n[3] = u * t + c * -r;
	n[8] = i * r + a * t;
	n[9] = s * r + f * t;
	n[10] = o * r + l * t;
	n[11] = u * r + c * t;
	return n
};
mat4.rotateZ = function(e, t, n) {
	var r = Math.sin(t),
		t = Math.cos(t),
		i = e[0],
		s = e[1],
		o = e[2],
		u = e[3],
		a = e[4],
		f = e[5],
		l = e[6],
		c = e[7];
	n ? e !== n && (n[8] = e[8], n[9] = e[9], n[10] = e[10], n[11] = e[11], n[12] = e[12], n[13] = e[13], n[14] = e[14], n[15] = e[15]) : n = e;
	n[0] = i * t + a * r;
	n[1] = s * t + f * r;
	n[2] = o * t + l * r;
	n[3] = u * t + c * r;
	n[4] = i * -r + a * t;
	n[5] = s * -r + f * t;
	n[6] = o * -r + l * t;
	n[7] = u * -r + c * t;
	return n
};
mat4.frustum = function(e, t, n, r, i, s, o) {
	o || (o = mat4.create());
	var u = t - e,
		a = r - n,
		f = s - i;
	o[0] = i * 2 / u;
	o[1] = 0;
	o[2] = 0;
	o[3] = 0;
	o[4] = 0;
	o[5] = i * 2 / a;
	o[6] = 0;
	o[7] = 0;
	o[8] = (t + e) / u;
	o[9] = (r + n) / a;
	o[10] = -(s + i) / f;
	o[11] = -1;
	o[12] = 0;
	o[13] = 0;
	o[14] = -(s * i * 2) / f;
	o[15] = 0;
	return o
};
mat4.perspective = function(e, t, n, r, i) {
	e = n * Math.tan(e * Math.PI / 360);
	t *= e;
	return mat4.frustum(-t, t, -e, e, n, r, i)
};
mat4.ortho = function(e, t, n, r, i, s, o) {
	o || (o = mat4.create());
	var u = t - e,
		a = r - n,
		f = s - i;
	o[0] = 2 / u;
	o[1] = 0;
	o[2] = 0;
	o[3] = 0;
	o[4] = 0;
	o[5] = 2 / a;
	o[6] = 0;
	o[7] = 0;
	o[8] = 0;
	o[9] = 0;
	o[10] = -2 / f;
	o[11] = 0;
	o[12] = -(e + t) / u;
	o[13] = -(r + n) / a;
	o[14] = -(s + i) / f;
	o[15] = 1;
	return o
};
mat4.lookAt = function(e, t, n, r) {
	r || (r = mat4.create());
	var i, s, o, u, a, f, l, c, h = e[0],
		p = e[1],
		e = e[2];
	s = n[0];
	o = n[1];
	i = n[2];
	n = t[1];
	f = t[2];
	if (h === t[0] && p === n && e === f) return mat4.identity(r);
	n = h - t[0];
	f = p - t[1];
	l = e - t[2];
	c = 1 / Math.sqrt(n * n + f * f + l * l);
	n *= c;
	f *= c;
	l *= c;
	t = o * l - i * f;
	i = i * n - s * l;
	s = s * f - o * n;
	(c = Math.sqrt(t * t + i * i + s * s)) ? (c = 1 / c, t *= c, i *= c, s *= c) : s = i = t = 0;
	o = f * s - l * i;
	u = l * t - n * s;
	a = n * i - f * t;
	(c = Math.sqrt(o * o + u * u + a * a)) ? (c = 1 / c, o *= c, u *= c, a *= c) : a = u = o = 0;
	r[0] = t;
	r[1] = o;
	r[2] = n;
	r[3] = 0;
	r[4] = i;
	r[5] = u;
	r[6] = f;
	r[7] = 0;
	r[8] = s;
	r[9] = a;
	r[10] = l;
	r[11] = 0;
	r[12] = -(t * h + i * p + s * e);
	r[13] = -(o * h + u * p + a * e);
	r[14] = -(n * h + f * p + l * e);
	r[15] = 1;
	return r
};
mat4.fromRotationTranslation = function(e, t, n) {
	n || (n = mat4.create());
	var r = e[0],
		i = e[1],
		s = e[2],
		o = e[3],
		u = r + r,
		a = i + i,
		f = s + s,
		e = r * u,
		l = r * a;
	r *= f;
	var c = i * a;
	i *= f;
	s *= f;
	u *= o;
	a *= o;
	o *= f;
	n[0] = 1 - (c + s);
	n[1] = l + o;
	n[2] = r - a;
	n[3] = 0;
	n[4] = l - o;
	n[5] = 1 - (e + s);
	n[6] = i + u;
	n[7] = 0;
	n[8] = r + a;
	n[9] = i - u;
	n[10] = 1 - (e + c);
	n[11] = 0;
	n[12] = t[0];
	n[13] = t[1];
	n[14] = t[2];
	n[15] = 1;
	return n
};
mat4.str = function(e) {
	return "[" + e[0] + ", " + e[1] + ", " + e[2] + ", " + e[3] + ", " + e[4] + ", " + e[5] + ", " + e[6] + ", " + e[7] + ", " + e[8] + ", " + e[9] + ", " + e[10] + ", " + e[11] + ", " + e[12] + ", " + e[13] + ", " + e[14] + ", " + e[15] + "]"
};
quat4.create = function(e) {
	var t = new MatrixArray(4);
	e && (t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3]);
	return t
};
quat4.set = function(e, t) {
	t[0] = e[0];
	t[1] = e[1];
	t[2] = e[2];
	t[3] = e[3];
	return t
};
quat4.calculateW = function(e, t) {
	var n = e[0],
		r = e[1],
		i = e[2];
	if (!t || e === t) return e[3] = -Math.sqrt(Math.abs(1 - n * n - r * r - i * i)), e;
	t[0] = n;
	t[1] = r;
	t[2] = i;
	t[3] = -Math.sqrt(Math.abs(1 - n * n - r * r - i * i));
	return t
};
quat4.inverse = function(e, t) {
	if (!t || e === t) return e[0] *= -1, e[1] *= -1, e[2] *= -1, e;
	t[0] = -e[0];
	t[1] = -e[1];
	t[2] = -e[2];
	t[3] = e[3];
	return t
};
quat4.length = function(e) {
	var t = e[0],
		n = e[1],
		r = e[2],
		e = e[3];
	return Math.sqrt(t * t + n * n + r * r + e * e)
};
quat4.normalize = function(e, t) {
	t || (t = e);
	var n = e[0],
		r = e[1],
		i = e[2],
		s = e[3],
		o = Math.sqrt(n * n + r * r + i * i + s * s);
	if (o === 0) return t[0] = 0, t[1] = 0, t[2] = 0, t[3] = 0, t;
	o = 1 / o;
	t[0] = n * o;
	t[1] = r * o;
	t[2] = i * o;
	t[3] = s * o;
	return t
};
quat4.multiply = function(e, t, n) {
	n || (n = e);
	var r = e[0],
		i = e[1],
		s = e[2],
		e = e[3],
		o = t[0],
		u = t[1],
		a = t[2],
		t = t[3];
	n[0] = r * t + e * o + i * a - s * u;
	n[1] = i * t + e * u + s * o - r * a;
	n[2] = s * t + e * a + r * u - i * o;
	n[3] = e * t - r * o - i * u - s * a;
	return n
};
quat4.multiplyVec3 = function(e, t, n) {
	n || (n = t);
	var r = t[0],
		i = t[1],
		s = t[2],
		t = e[0],
		o = e[1],
		u = e[2],
		e = e[3],
		a = e * r + o * s - u * i,
		f = e * i + u * r - t * s,
		l = e * s + t * i - o * r,
		r = -t * r - o * i - u * s;
	n[0] = a * e + r * -t + f * -u - l * -o;
	n[1] = f * e + r * -o + l * -t - a * -u;
	n[2] = l * e + r * -u + a * -o - f * -t;
	return n
};
quat4.toMat3 = function(e, t) {
	t || (t = mat3.create());
	var n = e[0],
		r = e[1],
		i = e[2],
		s = e[3],
		o = n + n,
		u = r + r,
		a = i + i,
		f = n * o,
		l = n * u;
	n *= a;
	var c = r * u;
	r *= a;
	i *= a;
	o *= s;
	u *= s;
	s *= a;
	t[0] = 1 - (c + i);
	t[1] = l + s;
	t[2] = n - u;
	t[3] = l - s;
	t[4] = 1 - (f + i);
	t[5] = r + o;
	t[6] = n + u;
	t[7] = r - o;
	t[8] = 1 - (f + c);
	return t
};
quat4.toMat4 = function(e, t) {
	t || (t = mat4.create());
	var n = e[0],
		r = e[1],
		i = e[2],
		s = e[3],
		o = n + n,
		u = r + r,
		a = i + i,
		f = n * o,
		l = n * u;
	n *= a;
	var c = r * u;
	r *= a;
	i *= a;
	o *= s;
	u *= s;
	s *= a;
	t[0] = 1 - (c + i);
	t[1] = l + s;
	t[2] = n - u;
	t[3] = 0;
	t[4] = l - s;
	t[5] = 1 - (f + i);
	t[6] = r + o;
	t[7] = 0;
	t[8] = n + u;
	t[9] = r - o;
	t[10] = 1 - (f + c);
	t[11] = 0;
	t[12] = 0;
	t[13] = 0;
	t[14] = 0;
	t[15] = 1;
	return t
};
quat4.slerp = function(e, t, n, r) {
	r || (r = e);
	var i = e[0] * t[0] + e[1] * t[1] + e[2] * t[2] + e[3] * t[3],
		s, o;
	if (Math.abs(i) >= 1) return r !== e && (r[0] = e[0], r[1] = e[1], r[2] = e[2], r[3] = e[3]), r;
	s = Math.acos(i);
	o = Math.sqrt(1 - i * i);
	if (Math.abs(o) < .001) return r[0] = e[0] * .5 + t[0] * .5, r[1] = e[1] * .5 + t[1] * .5, r[2] = e[2] * .5 + t[2] * .5, r[3] = e[3] * .5 + t[3] * .5, r;
	i = Math.sin((1 - n) * s) / o;
	n = Math.sin(n * s) / o;
	r[0] = e[0] * i + t[0] * n;
	r[1] = e[1] * i + t[1] * n;
	r[2] = e[2] * i + t[2] * n;
	r[3] = e[3] * i + t[3] * n;
	return r
};
quat4.str = function(e) {
	return "[" + e[0] + ", " + e[1] + ", " + e[2] + ", " + e[3] + "]"
};
(function() {
	function v(e, t) {
		this.width = 0;
		this.height = 0;
		this.cam = vec3.create([0, 0, 100]);
		this.look = vec3.create([0, 0, 0]);
		this.up = vec3.create([0, 1, 0]);
		this.worldScale = vec3.create([1, 1, 1]);
		this.matP = mat4.create();
		this.matMV = mat4.create();
		this.lastMV = mat4.create();
		this.currentMV = mat4.create();
		this.gl = e;
		this.initState()
	}
	function m(e, t, n) {
		this.gl = e;
		this.shaderProgram = t;
		this.name = n;
		this.locAPos = e.getAttribLocation(t, "aPos");
		this.locATex = e.getAttribLocation(t, "aTex");
		this.locMatP = e.getUniformLocation(t, "matP");
		this.locMatMV = e.getUniformLocation(t, "matMV");
		this.locOpacity = e.getUniformLocation(t, "opacity");
		this.locSamplerFront = e.getUniformLocation(t, "samplerFront");
		this.locSamplerBack = e.getUniformLocation(t, "samplerBack");
		this.locDestStart = e.getUniformLocation(t, "destStart");
		this.locDestEnd = e.getUniformLocation(t, "destEnd");
		this.locSeconds = e.getUniformLocation(t, "seconds");
		this.locPixelWidth = e.getUniformLocation(t, "pixelWidth");
		this.locPixelHeight = e.getUniformLocation(t, "pixelHeight");
		this.locLayerScale = e.getUniformLocation(t, "layerScale");
		if (this.locOpacity) e.uniform1f(this.locOpacity, 1);
		if (this.locSamplerFront) e.uniform1i(this.locSamplerFront, 0);
		if (this.locSamplerBack) e.uniform1i(this.locSamplerBack, 1);
		if (this.locDestStart) e.uniform2f(this.locDestStart, 0, 0);
		if (this.locDestEnd) e.uniform2f(this.locDestEnd, 1, 1);
		this.hasCurrentMatMV = false
	}
	function g(e, t) {
		this.type = e;
		this.glwrap = t;
		this.gl = t.gl;
		this.opacityParam = 0;
		this.startIndex = 0;
		this.indexCount = 0;
		this.texParam = null;
		this.mat4param = null;
		this.shaderParams = [];
		cr.seal(this)
	}
	function w(e) {
		--e;
		for (var t = 1; t < 32; t <<= 1) {
			e = e | e >> t
		}
		return e + 1
	}
	var e = 8e3;
	var t = e / 2 * 3;
	var n = 8e3;
	var r = 4;
	var i = 0;
	var s = 1;
	var o = 2;
	var u = 3;
	var a = 4;
	var f = 5;
	var l = 6;
	var c = 7;
	var h = 8;
	var p = 9;
	var d = 10;
	v.prototype.initState = function() {
		var i = this.gl;
		var s, o;
		this.lastOpacity = 1;
		this.lastTexture = null;
		this.currentOpacity = 1;
		i.clearColor(0, 0, 0, 0);
		i.clear(i.COLOR_BUFFER_BIT);
		i.enable(i.BLEND);
		i.blendFunc(i.ONE, i.ONE_MINUS_SRC_ALPHA);
		i.disable(i.CULL_FACE);
		i.disable(i.DEPTH_TEST);
		this.maxTextureSize = i.getParameter(i.MAX_TEXTURE_SIZE);
		this.lastSrcBlend = i.ONE;
		this.lastDestBlend = i.ONE_MINUS_SRC_ALPHA;
		this.pointBuffer = i.createBuffer();
		i.bindBuffer(i.ARRAY_BUFFER, this.pointBuffer);
		this.vertexBuffers = new Array(r);
		this.texcoordBuffers = new Array(r);
		for (s = 0; s < r; s++) {
			this.vertexBuffers[s] = i.createBuffer();
			i.bindBuffer(i.ARRAY_BUFFER, this.vertexBuffers[s]);
			this.texcoordBuffers[s] = i.createBuffer();
			i.bindBuffer(i.ARRAY_BUFFER, this.texcoordBuffers[s])
		}
		this.curBuffer = 0;
		this.indexBuffer = i.createBuffer();
		i.bindBuffer(i.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
		this.vertexData = new Float32Array(e * 2);
		this.texcoordData = new Float32Array(e * 2);
		this.pointData = new Float32Array(n * 4);
		var u = new Uint16Array(t);
		s = 0, o = t;
		var a = 0;
		while (s < o) {
			u[s++] = a;
			u[s++] = a + 1;
			u[s++] = a + 2;
			u[s++] = a;
			u[s++] = a + 2;
			u[s++] = a + 3;
			a += 4
		}
		i.bufferData(i.ELEMENT_ARRAY_BUFFER, u, i.STATIC_DRAW);
		this.vertexPtr = 0;
		this.pointPtr = 0;
		var f, l;
		this.shaderPrograms = [];
		f = ["varying mediump vec2 vTex;", "uniform lowp float opacity;", "uniform lowp sampler2D samplerFront;", "void main(void) {", "	gl_FragColor = texture2D(samplerFront, vTex);", "	gl_FragColor *= opacity;", "}"].join("\n");
		l = ["attribute highp vec2 aPos;", "attribute mediump vec2 aTex;", "varying mediump vec2 vTex;", "uniform highp mat4 matP;", "uniform highp mat4 matMV;", "void main(void) {", "	gl_Position = matP * matMV * vec4(aPos.x, aPos.y, 0.0, 1.0);", "	vTex = aTex;", "}"].join("\n");
		var c = this.createShaderProgram({
			src: f
		}, l, "<default>");
		this.shaderPrograms.push(c);
		f = ["uniform mediump sampler2D samplerFront;", "varying lowp float opacity;", "void main(void) {", "	gl_FragColor = texture2D(samplerFront, gl_PointCoord);", "	gl_FragColor *= opacity;", "}"].join("\n");
		var h = ["attribute vec4 aPos;", "varying float opacity;", "uniform mat4 matP;", "uniform mat4 matMV;", "void main(void) {", "	gl_Position = matP * matMV * vec4(aPos.x, aPos.y, 0.0, 1.0);", "	gl_PointSize = aPos.z;", "	opacity = aPos.w;", "}"].join("\n");
		c = this.createShaderProgram({
			src: f
		}, h, "<point>");
		this.shaderPrograms.push(c);
		for (var p in cr.shaders) {
			if (cr.shaders.hasOwnProperty(p)) this.shaderPrograms.push(this.createShaderProgram(cr.shaders[p], l, p))
		}
		i.activeTexture(i.TEXTURE0);
		i.bindTexture(i.TEXTURE_2D, null);
		this.batch = [];
		this.batchPtr = 0;
		this.hasQuadBatchTop = false;
		this.hasPointBatchTop = false;
		this.lastProgram = -1;
		this.currentProgram = -1;
		this.currentShader = null;
		this.fbo = i.createFramebuffer();
		this.renderToTex = null;
		this.tmpVec3 = vec3.create([0, 0, 0]);
		var d = i.getParameter(i.ALIASED_POINT_SIZE_RANGE);
		this.minPointSize = d[0];
		this.maxPointSize = d[1];
		this.switchProgram(0);
		cr.seal(this)
	};
	v.prototype.createShaderProgram = function(e, t, n) {
		var r = this.gl;
		var i = r.createShader(r.FRAGMENT_SHADER);
		r.shaderSource(i, e.src);
		r.compileShader(i);
		if (!r.getShaderParameter(i, r.COMPILE_STATUS)) {
			r.deleteShader(i);
			return null
		}
		var s = r.createShader(r.VERTEX_SHADER);
		r.shaderSource(s, t);
		r.compileShader(s);
		if (!r.getShaderParameter(s, r.COMPILE_STATUS)) {
			r.deleteShader(i);
			r.deleteShader(s);
			return null
		}
		var o = r.createProgram();
		r.attachShader(o, i);
		r.attachShader(o, s);
		r.linkProgram(o);
		if (!r.getProgramParameter(o, r.LINK_STATUS)) {
			r.deleteShader(i);
			r.deleteShader(s);
			r.deleteProgram(o);
			return null
		}
		r.useProgram(o);
		r.deleteShader(i);
		r.deleteShader(s);
		var u = new m(r, o, n);
		u.extendBoxHorizontal = e.extendBoxHorizontal || 0;
		u.extendBoxVertical = e.extendBoxVertical || 0;
		u.crossSampling = !! e.crossSampling;
		u.animated = !! e.animated;
		u.parameters = e.parameters || [];
		var a, f;
		for (a = 0, f = u.parameters.length; a < f; a++) {
			u.parameters[a][1] = r.getUniformLocation(o, u.parameters[a][0]);
			r.uniform1f(u.parameters[a][1], 0)
		}
		cr.seal(u);
		return u
	};
	v.prototype.getShaderIndex = function(e) {
		var t, n;
		for (t = 0, n = this.shaderPrograms.length; t < n; t++) {
			if (this.shaderPrograms[t].name === e) return t
		}
		return -1
	};
	v.prototype.project = function(e, t, n) {
		var r = [0, 0, this.width, this.height];
		var i = this.matMV;
		var s = this.matP;
		var o = [0, 0, 0, 0, 0, 0, 0, 0];
		o[0] = i[0] * e + i[4] * t + i[12];
		o[1] = i[1] * e + i[5] * t + i[13];
		o[2] = i[2] * e + i[6] * t + i[14];
		o[3] = i[3] * e + i[7] * t + i[15];
		o[4] = s[0] * o[0] + s[4] * o[1] + s[8] * o[2] + s[12] * o[3];
		o[5] = s[1] * o[0] + s[5] * o[1] + s[9] * o[2] + s[13] * o[3];
		o[6] = s[2] * o[0] + s[6] * o[1] + s[10] * o[2] + s[14] * o[3];
		o[7] = -o[2];
		if (o[7] === 0) return;
		o[7] = 1 / o[7];
		o[4] *= o[7];
		o[5] *= o[7];
		o[6] *= o[7];
		n[0] = (o[4] * .5 + .5) * r[2] + r[0];
		n[1] = (o[5] * .5 + .5) * r[3] + r[1]
	};
	v.prototype.setSize = function(e, t, n) {
		if (this.width === e && this.height === t && !n) return;
		this.endBatch();
		this.width = e;
		this.height = t;
		this.gl.viewport(0, 0, e, t);
		mat4.perspective(45, e / t, 1, 1e3, this.matP);
		mat4.lookAt(this.cam, this.look, this.up, this.matMV);
		var r = [0, 0];
		var i = [0, 0];
		this.project(0, 0, r);
		this.project(1, 1, i);
		this.worldScale[0] = 1 / (i[0] - r[0]);
		this.worldScale[1] = -1 / (i[1] - r[1]);
		var s, o, u;
		for (s = 0, o = this.shaderPrograms.length; s < o; s++) {
			u = this.shaderPrograms[s];
			u.hasCurrentMatMV = false;
			if (u.locMatP) {
				this.gl.useProgram(u.shaderProgram);
				this.gl.uniformMatrix4fv(u.locMatP, false, this.matP)
			}
		}
		this.gl.useProgram(this.shaderPrograms[this.lastProgram].shaderProgram);
		this.gl.bindTexture(this.gl.TEXTURE_2D, null);
		this.lastTexture = null
	};
	v.prototype.resetModelView = function() {
		mat4.lookAt(this.cam, this.look, this.up, this.matMV);
		mat4.scale(this.matMV, this.worldScale)
	};
	v.prototype.translate = function(e, t) {
		if (e === 0 && t === 0) return;
		this.tmpVec3[0] = e;
		this.tmpVec3[1] = t;
		this.tmpVec3[2] = 0;
		mat4.translate(this.matMV, this.tmpVec3)
	};
	v.prototype.scale = function(e, t) {
		if (e === 1 && t === 1) return;
		this.tmpVec3[0] = e;
		this.tmpVec3[1] = t;
		this.tmpVec3[2] = 1;
		mat4.scale(this.matMV, this.tmpVec3)
	};
	v.prototype.rotateZ = function(e) {
		if (e === 0) return;
		mat4.rotateZ(this.matMV, e)
	};
	v.prototype.updateModelView = function() {
		var e = false;
		for (var t = 0; t < 16; t++) {
			if (this.lastMV[t] !== this.matMV[t]) {
				e = true;
				break
			}
		}
		if (!e) return;
		var n = this.pushBatch();
		n.type = f;
		if (n.mat4param) mat4.set(this.matMV, n.mat4param);
		else n.mat4param = mat4.create(this.matMV);
		mat4.set(this.matMV, this.lastMV);
		this.hasQuadBatchTop = false;
		this.hasPointBatchTop = false
	};
	g.prototype.doSetTexture = function() {
		this.gl.bindTexture(this.gl.TEXTURE_2D, this.texParam)
	};
	g.prototype.doSetOpacity = function() {
		var e = this.opacityParam;
		var t = this.glwrap;
		t.currentOpacity = e;
		var n = t.currentShader;
		if (n.locOpacity) this.gl.uniform1f(n.locOpacity, e)
	};
	g.prototype.doQuad = function() {
		this.gl.drawElements(this.gl.TRIANGLES, this.indexCount, this.gl.UNSIGNED_SHORT, this.startIndex * 2)
	};
	g.prototype.doSetBlend = function() {
		this.gl.blendFunc(this.startIndex, this.indexCount)
	};
	g.prototype.doUpdateModelView = function() {
		var e, t, n, r = this.glwrap.shaderPrograms,
			i = this.glwrap.currentProgram;
		for (e = 0, t = r.length; e < t; e++) {
			n = r[e];
			if (e === i && n.locMatMV) {
				this.gl.uniformMatrix4fv(n.locMatMV, false, this.mat4param);
				n.hasCurrentMatMV = true
			} else n.hasCurrentMatMV = false
		}
		mat4.set(this.mat4param, this.glwrap.currentMV)
	};
	g.prototype.doRenderToTexture = function() {
		var e = this.gl;
		var t = this.glwrap;
		if (this.texParam) {
			e.bindFramebuffer(e.FRAMEBUFFER, t.fbo);
			e.framebufferTexture2D(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0, e.TEXTURE_2D, this.texParam, 0);
		} else {
			e.framebufferTexture2D(e.FRAMEBUFFER, e.COLOR_ATTACHMENT0, e.TEXTURE_2D, null, 0);
			e.bindFramebuffer(e.FRAMEBUFFER, null)
		}
	};
	g.prototype.doClear = function() {
		var e = this.gl;
		if (this.startIndex === 0) {
			e.clearColor(this.mat4param[0], this.mat4param[1], this.mat4param[2], this.mat4param[3]);
			e.clear(e.COLOR_BUFFER_BIT)
		} else {
			e.enable(e.SCISSOR_TEST);
			e.scissor(this.mat4param[0], this.mat4param[1], this.mat4param[2], this.mat4param[3]);
			e.clearColor(0, 0, 0, 0);
			e.clear(this.gl.COLOR_BUFFER_BIT);
			e.disable(e.SCISSOR_TEST)
		}
	};
	g.prototype.doPoints = function() {
		var e = this.gl;
		var t = this.glwrap;
		var n = t.shaderPrograms[1];
		e.useProgram(n.shaderProgram);
		if (!n.hasCurrentMatMV && n.locMatMV) {
			e.uniformMatrix4fv(n.locMatMV, false, t.currentMV);
			n.hasCurrentMatMV = true
		}
		e.enableVertexAttribArray(n.locAPos);
		e.bindBuffer(e.ARRAY_BUFFER, t.pointBuffer);
		e.vertexAttribPointer(n.locAPos, 4, e.FLOAT, false, 0, 0);
		e.drawArrays(e.POINTS, this.startIndex / 4, this.indexCount);
		n = t.currentShader;
		e.useProgram(n.shaderProgram);
		if (n.locAPos >= 0) {
			e.enableVertexAttribArray(n.locAPos);
			e.bindBuffer(e.ARRAY_BUFFER, t.vertexBuffers[t.curBuffer]);
			e.vertexAttribPointer(n.locAPos, 2, e.FLOAT, false, 0, 0)
		}
		if (n.locATex >= 0) {
			e.enableVertexAttribArray(n.locATex);
			e.bindBuffer(e.ARRAY_BUFFER, t.texcoordBuffers[t.curBuffer]);
			e.vertexAttribPointer(n.locATex, 2, e.FLOAT, false, 0, 0)
		}
	};
	g.prototype.doSetProgram = function() {
		var e = this.gl;
		var t = this.glwrap;
		var n = t.shaderPrograms[this.startIndex];
		t.currentProgram = this.startIndex;
		t.currentShader = n;
		e.useProgram(n.shaderProgram);
		if (!n.hasCurrentMatMV && n.locMatMV) {
			e.uniformMatrix4fv(n.locMatMV, false, t.currentMV);
			n.hasCurrentMatMV = true
		}
		if (n.locOpacity) e.uniform1f(n.locOpacity, t.currentOpacity);
		if (n.locAPos >= 0) {
			e.enableVertexAttribArray(n.locAPos);
			e.bindBuffer(e.ARRAY_BUFFER, t.vertexBuffers[t.curBuffer]);
			e.vertexAttribPointer(n.locAPos, 2, e.FLOAT, false, 0, 0)
		}
		if (n.locATex >= 0) {
			e.enableVertexAttribArray(n.locATex);
			e.bindBuffer(e.ARRAY_BUFFER, t.texcoordBuffers[t.curBuffer]);
			e.vertexAttribPointer(n.locATex, 2, e.FLOAT, false, 0, 0)
		}
	};
	g.prototype.doSetProgramParameters = function() {
		var e, t, n = this.glwrap.currentShader;
		var r = this.gl;
		if (n.locSamplerBack) {
			r.activeTexture(r.TEXTURE1);
			r.bindTexture(r.TEXTURE_2D, this.texParam);
			r.activeTexture(r.TEXTURE0)
		}
		if (n.locPixelWidth) r.uniform1f(n.locPixelWidth, this.mat4param[0]);
		if (n.locPixelHeight) r.uniform1f(n.locPixelHeight, this.mat4param[1]);
		if (n.locDestStart) r.uniform2f(n.locDestStart, this.mat4param[2], this.mat4param[3]);
		if (n.locDestEnd) r.uniform2f(n.locDestEnd, this.mat4param[4], this.mat4param[5]);
		if (n.locLayerScale) r.uniform1f(n.locLayerScale, this.mat4param[6]);
		if (n.locSeconds) r.uniform1f(n.locSeconds, cr.performance_now() / 1e3);
		if (n.parameters.length) {
			for (e = 0, t = n.parameters.length; e < t; e++) {
				r.uniform1f(n.parameters[e][1], this.shaderParams[e])
			}
		}
	};
	v.prototype.pushBatch = function() {
		if (this.batchPtr === this.batch.length) this.batch.push(new g(i, this));
		return this.batch[this.batchPtr++]
	};
	v.prototype.endBatch = function() {
		if (this.batchPtr === 0) return;
		if (this.gl.isContextLost()) return;
		var e = this.gl;
		if (this.pointPtr > 0) {
			e.bindBuffer(e.ARRAY_BUFFER, this.pointBuffer);
			e.bufferData(e.ARRAY_BUFFER, this.pointData.subarray(0, this.pointPtr), e.STREAM_DRAW);
			if (t && t.locAPos >= 0 && t.name === "<point>") e.vertexAttribPointer(t.locAPos, 4, e.FLOAT, false, 0, 0)
		}
		if (this.vertexPtr > 0) {
			var t = this.currentShader;
			e.bindBuffer(e.ARRAY_BUFFER, this.vertexBuffers[this.curBuffer]);
			e.bufferData(e.ARRAY_BUFFER, this.vertexData.subarray(0, this.vertexPtr), e.STREAM_DRAW);
			if (t && t.locAPos >= 0 && t.name !== "<point>") e.vertexAttribPointer(t.locAPos, 2, e.FLOAT, false, 0, 0);
			e.bindBuffer(e.ARRAY_BUFFER, this.texcoordBuffers[this.curBuffer]);
			e.bufferData(e.ARRAY_BUFFER, this.texcoordData.subarray(0, this.vertexPtr), e.STREAM_DRAW);
			if (t && t.locATex >= 0 && t.name !== "<point>") e.vertexAttribPointer(t.locATex, 2, e.FLOAT, false, 0, 0)
		}
		var n, i, v;
		for (n = 0, i = this.batchPtr; n < i; n++) {
			v = this.batch[n];
			switch (v.type) {
			case s:
				v.doQuad();
				break;
			case o:
				v.doSetTexture();
				break;
			case u:
				v.doSetOpacity();
				break;
			case a:
				v.doSetBlend();
				break;
			case f:
				v.doUpdateModelView();
				break;
			case l:
				v.doRenderToTexture();
				break;
			case c:
				v.doClear();
				break;
			case h:
				v.doPoints();
				break;
			case p:
				v.doSetProgram();
				break;
			case d:
				v.doSetProgramParameters();
				break
			}
		}
		this.batchPtr = 0;
		this.vertexPtr = 0;
		this.pointPtr = 0;
		this.hasQuadBatchTop = false;
		this.hasPointBatchTop = false;
		this.curBuffer++;
		if (this.curBuffer >= r) this.curBuffer = 0
	};
	v.prototype.setOpacity = function(e) {
		if (e === this.lastOpacity) return;
		var t = this.pushBatch();
		t.type = u;
		t.opacityParam = e;
		this.lastOpacity = e;
		this.hasQuadBatchTop = false;
		this.hasPointBatchTop = false
	};
	v.prototype.setTexture = function(e) {
		if (e === this.lastTexture) return;
		var t = this.pushBatch();
		t.type = o;
		t.texParam = e;
		this.lastTexture = e;
		this.hasQuadBatchTop = false;
		this.hasPointBatchTop = false
	};
	v.prototype.setBlend = function(e, t) {
		if (e === this.lastSrcBlend && t === this.lastDestBlend) return;
		var n = this.pushBatch();
		n.type = a;
		n.startIndex = e;
		n.indexCount = t;
		this.lastSrcBlend = e;
		this.lastDestBlend = t;
		this.hasQuadBatchTop = false;
		this.hasPointBatchTop = false
	};
	v.prototype.setAlphaBlend = function() {
		this.setBlend(this.gl.ONE, this.gl.ONE_MINUS_SRC_ALPHA)
	};
	var y = e * 2 - 8;
	v.prototype.quad = function(e, t, n, r, i, o, u, a) {
		if (this.vertexPtr >= y) this.endBatch();
		var f = this.vertexPtr;
		var l = this.vertexData;
		var c = this.texcoordData;
		if (this.hasQuadBatchTop) {
			this.batch[this.batchPtr - 1].indexCount += 6
		} else {
			var h = this.pushBatch();
			h.type = s;
			h.startIndex = f / 4 * 3;
			h.indexCount = 6;
			this.hasQuadBatchTop = true;
			this.hasPointBatchTop = false
		}
		l[f] = e;
		c[f++] = 0;
		l[f] = t;
		c[f++] = 0;
		l[f] = n;
		c[f++] = 1;
		l[f] = r;
		c[f++] = 0;
		l[f] = i;
		c[f++] = 1;
		l[f] = o;
		c[f++] = 1;
		l[f] = u;
		c[f++] = 0;
		l[f] = a;
		c[f++] = 1;
		this.vertexPtr = f
	};
	v.prototype.quadTex = function(e, t, n, r, i, o, u, a, f) {
		if (this.vertexPtr >= y) this.endBatch();
		var l = this.vertexPtr;
		var c = this.vertexData;
		var h = this.texcoordData;
		if (this.hasQuadBatchTop) {
			this.batch[this.batchPtr - 1].indexCount += 6
		} else {
			var p = this.pushBatch();
			p.type = s;
			p.startIndex = l / 4 * 3;
			p.indexCount = 6;
			this.hasQuadBatchTop = true;
			this.hasPointBatchTop = false
		}
		c[l] = e;
		h[l++] = f.left;
		c[l] = t;
		h[l++] = f.top;
		c[l] = n;
		h[l++] = f.right;
		c[l] = r;
		h[l++] = f.top;
		c[l] = i;
		h[l++] = f.right;
		c[l] = o;
		h[l++] = f.bottom;
		c[l] = u;
		h[l++] = f.left;
		c[l] = a;
		h[l++] = f.bottom;
		this.vertexPtr = l
	};
	var b = n - 4;
	v.prototype.point = function(e, t, n, r) {
		if (this.pointPtr >= b) this.endBatch();
		var i = this.pointPtr;
		var s = this.pointData;
		if (this.hasPointBatchTop) {
			this.batch[this.batchPtr - 1].indexCount++
		} else {
			var o = this.pushBatch();
			o.type = h;
			o.startIndex = i;
			o.indexCount = 1;
			this.hasPointBatchTop = true;
			this.hasQuadBatchTop = false
		}
		s[i++] = e;
		s[i++] = t;
		s[i++] = n;
		s[i++] = r;
		this.pointPtr = i
	};
	v.prototype.switchProgram = function(e) {
		if (this.lastProgram === e) return;
		var t = this.shaderPrograms[e];
		if (!t) {
			if (this.lastProgram === 0) return;
			e = 0;
			t = this.shaderPrograms[0]
		}
		var n = this.pushBatch();
		n.type = p;
		n.startIndex = e;
		this.lastProgram = e;
		this.hasQuadBatchTop = false;
		this.hasPointBatchTop = false
	};
	v.prototype.programUsesDest = function(e) {
		var t = this.shaderPrograms[e];
		return !!(t.locDestStart || t.locDestEnd)
	};
	v.prototype.programUsesCrossSampling = function(e) {
		return this.shaderPrograms[e].crossSampling
	};
	v.prototype.programExtendsBox = function(e) {
		var t = this.shaderPrograms[e];
		return t.extendBoxHorizontal !== 0 || t.extendBoxVertical !== 0
	};
	v.prototype.getProgramBoxExtendHorizontal = function(e) {
		return this.shaderPrograms[e].extendBoxHorizontal
	};
	v.prototype.getProgramBoxExtendVertical = function(e) {
		return this.shaderPrograms[e].extendBoxVertical
	};
	v.prototype.getProgramParameterType = function(e, t) {
		return this.shaderPrograms[e].parameters[t][2]
	};
	v.prototype.programIsAnimated = function(e) {
		return this.shaderPrograms[e].animated
	};
	v.prototype.setProgramParameters = function(e, t, n, r, i, s, o, u, a) {
		var f, l, c = this.shaderPrograms[this.lastProgram];
		if (c.locPixelWidth || c.locPixelHeight || c.locSeconds || c.locSamplerBack || c.locDestStart || c.locDestEnd || c.locLayerScale || a.length) {
			var h = this.pushBatch();
			h.type = d;
			if (h.mat4param) mat4.set(this.matMV, h.mat4param);
			else h.mat4param = mat4.create();
			h.mat4param[0] = t;
			h.mat4param[1] = n;
			h.mat4param[2] = r;
			h.mat4param[3] = i;
			h.mat4param[4] = s;
			h.mat4param[5] = o;
			h.mat4param[6] = u;
			h.texParam = e;
			if (a.length) {
				h.shaderParams.length = a.length;
				for (f = 0, l = a.length; f < l; f++) h.shaderParams[f] = a[f]
			}
			this.hasQuadBatchTop = false;
			this.hasPointBatchTop = false
		}
	};
	v.prototype.clear = function(e, t, n, r) {
		var i = this.pushBatch();
		i.type = c;
		i.startIndex = 0;
		if (!i.mat4param) i.mat4param = mat4.create();
		i.mat4param[0] = e;
		i.mat4param[1] = t;
		i.mat4param[2] = n;
		i.mat4param[3] = r;
		this.hasQuadBatchTop = false;
		this.hasPointBatchTop = false
	};
	v.prototype.clearRect = function(e, t, n, r) {
		var i = this.pushBatch();
		i.type = c;
		i.startIndex = 1;
		if (!i.mat4param) i.mat4param = mat4.create();
		i.mat4param[0] = e;
		i.mat4param[1] = t;
		i.mat4param[2] = n;
		i.mat4param[3] = r;
		this.hasQuadBatchTop = false;
		this.hasPointBatchTop = false
	};
	v.prototype.present = function() {
		this.endBatch();
		this.gl.flush()
	};
	var E = [];
	var S = {};
	var x = 0;
	var T = 1;
	var N = 2;
	var C = 3;
	var k = 4;
	v.prototype.loadTexture = function(e, t, n, r, i) {
		t = !! t;
		n = !! n;
		var s = e.src + "," + t + "," + n + (t ? "," + i : "");
		var o = null;
		if (typeof e.src !== "undefined" && S.hasOwnProperty(s)) {
			o = S[s];
			o.c2refcount++;
			return o
		}
		this.endBatch();
		var u = this.gl;
		var a = cr.isPOT(e.width) && cr.isPOT(e.height);
		o = u.createTexture();
		u.bindTexture(u.TEXTURE_2D, o);
		u.pixelStorei(u["UNPACK_PREMULTIPLY_ALPHA_WEBGL"], true);
		var f = u.RGBA;
		var l = u.RGBA;
		var c = u.UNSIGNED_BYTE;
		if (r) {
			switch (r) {
			case T:
				f = u.RGB;
				l = u.RGB;
				break;
			case N:
				c = u.UNSIGNED_SHORT_4_4_4_4;
				break;
			case C:
				c = u.UNSIGNED_SHORT_5_5_5_1;
				break;
			case k:
				f = u.RGB;
				l = u.RGB;
				c = u.UNSIGNED_SHORT_5_6_5;
				break
			}
		}
		if (!a && t) {
			var h = document.createElement("canvas");
			h.width = w(e.width);
			h.height = w(e.height);
			var p = h.getContext("2d");
			p.drawImage(e, 0, 0, e.width, e.height, 0, 0, h.width, h.height);
			u.texImage2D(u.TEXTURE_2D, 0, f, l, c, h)
		} else u.texImage2D(u.TEXTURE_2D, 0, f, l, c, e);
		if (t) {
			if (i === "repeat-x") {
				u.texParameteri(u.TEXTURE_2D, u.TEXTURE_WRAP_S, u.REPEAT);
				u.texParameteri(u.TEXTURE_2D, u.TEXTURE_WRAP_T, u.CLAMP_TO_EDGE)
			} else if (i === "repeat-y") {
				u.texParameteri(u.TEXTURE_2D, u.TEXTURE_WRAP_S, u.CLAMP_TO_EDGE);
				u.texParameteri(u.TEXTURE_2D, u.TEXTURE_WRAP_T, u.REPEAT)
			} else {
				u.texParameteri(u.TEXTURE_2D, u.TEXTURE_WRAP_S, u.REPEAT);
				u.texParameteri(u.TEXTURE_2D, u.TEXTURE_WRAP_T, u.REPEAT)
			}
		} else {
			u.texParameteri(u.TEXTURE_2D, u.TEXTURE_WRAP_S, u.CLAMP_TO_EDGE);
			u.texParameteri(u.TEXTURE_2D, u.TEXTURE_WRAP_T, u.CLAMP_TO_EDGE)
		}
		if (n) {
			u.texParameteri(u.TEXTURE_2D, u.TEXTURE_MAG_FILTER, u.LINEAR);
			if (a) {
				u.texParameteri(u.TEXTURE_2D, u.TEXTURE_MIN_FILTER, u.LINEAR_MIPMAP_LINEAR);
				u.generateMipmap(u.TEXTURE_2D)
			} else u.texParameteri(u.TEXTURE_2D, u.TEXTURE_MIN_FILTER, u.LINEAR)
		} else {
			u.texParameteri(u.TEXTURE_2D, u.TEXTURE_MAG_FILTER, u.NEAREST);
			u.texParameteri(u.TEXTURE_2D, u.TEXTURE_MIN_FILTER, u.NEAREST)
		}
		u.bindTexture(u.TEXTURE_2D, null);
		this.lastTexture = null;
		o.c2width = e.width;
		o.c2height = e.height;
		o.c2refcount = 1;
		o.c2texkey = s;
		E.push(o);
		S[s] = o;
		return o
	};
	v.prototype.createEmptyTexture = function(e, t, n, r) {
		this.endBatch();
		var i = this.gl;
		var s = i.createTexture();
		i.bindTexture(i.TEXTURE_2D, s);
		i.texImage2D(i.TEXTURE_2D, 0, i.RGBA, e, t, 0, i.RGBA, r ? i.UNSIGNED_SHORT_4_4_4_4 : i.UNSIGNED_BYTE, null);
		i.texParameteri(i.TEXTURE_2D, i.TEXTURE_WRAP_S, i.CLAMP_TO_EDGE);
		i.texParameteri(i.TEXTURE_2D, i.TEXTURE_WRAP_T, i.CLAMP_TO_EDGE);
		i.texParameteri(i.TEXTURE_2D, i.TEXTURE_MAG_FILTER, n ? i.LINEAR : i.NEAREST);
		i.texParameteri(i.TEXTURE_2D, i.TEXTURE_MIN_FILTER, n ? i.LINEAR : i.NEAREST);
		i.bindTexture(i.TEXTURE_2D, null);
		this.lastTexture = null;
		s.c2width = e;
		s.c2height = t;
		E.push(s);
		return s
	};
	v.prototype.videoToTexture = function(e, t, n) {
		this.endBatch();
		var r = this.gl;
		r.bindTexture(r.TEXTURE_2D, t);
		r.texImage2D(r.TEXTURE_2D, 0, r.RGBA, r.RGBA, n ? r.UNSIGNED_SHORT_4_4_4_4 : r.UNSIGNED_BYTE, e);
		r.bindTexture(r.TEXTURE_2D, null);
		this.lastTexture = null
	};
	v.prototype.deleteTexture = function(e) {
		if (!e) return;
		if (typeof e.c2refcount !== "undefined" && e.c2refcount > 1) {
			e.c2refcount--;
			return
		}
		this.endBatch();
		this.gl.bindTexture(this.gl.TEXTURE_2D, null);
		this.lastTexture = null;
		cr.arrayFindRemove(E, e);
		if (typeof e.c2texkey !== "undefined") delete S[e.c2texkey];
		this.gl.deleteTexture(e)
	};
	v.prototype.estimateVRAM = function() {
		var e = this.width * this.height * 4 * 2;
		var t, n, r;
		for (t = 0, n = E.length; t < n; t++) {
			r = E[t];
			e += r.c2width * r.c2height * 4
		}
		return e
	};
	v.prototype.textureCount = function() {
		return E.length
	};
	v.prototype.setRenderingToTexture = function(e) {
		if (e === this.renderToTex) return;
		var t = this.pushBatch();
		t.type = l;
		t.texParam = e;
		this.renderToTex = e;
		this.hasQuadBatchTop = false;
		this.hasPointBatchTop = false
	};
	cr.GLWrap = v
})();
(function() {
	function e(e) {
		if (!e || !e.getContext && !e["dc"]) return;
		if (e["c2runtime"]) return;
		else e["c2runtime"] = this;
		var t = this;
		this.isPhoneGap = typeof window["device"] !== "undefined" && (typeof window["device"]["cordova"] !== "undefined" || typeof window["device"]["phonegap"] !== "undefined");
		this.isDirectCanvas = !! e["dc"];
		this.isAppMobi = typeof window["AppMobi"] !== "undefined" || this.isDirectCanvas;
		this.isCocoonJs = !! window["c2cocoonjs"];
		if (this.isCocoonJs) {
			CocoonJS["App"]["onSuspended"].addEventListener(function() {
				t["setSuspended"](true)
			});
			CocoonJS["App"]["onActivated"].addEventListener(function() {
				t["setSuspended"](false)
			})
		}
		this.isDomFree = this.isDirectCanvas || this.isCocoonJs;
		this.isTizen = /tizen/i.test(navigator.userAgent);
		this.isAndroid = /android/i.test(navigator.userAgent) && !this.isTizen;
		this.isIE = /msie/i.test(navigator.userAgent) || /trident/i.test(navigator.userAgent);
		this.isiPhone = /iphone/i.test(navigator.userAgent) || /ipod/i.test(navigator.userAgent);
		this.isiPad = /ipad/i.test(navigator.userAgent);
		this.isiOS = this.isiPhone || this.isiPad;
		this.isChrome = /chrome/i.test(navigator.userAgent) || /chromium/i.test(navigator.userAgent);
		this.isSafari = !this.isChrome && /safari/i.test(navigator.userAgent);
		this.isWindows = /windows/i.test(navigator.userAgent);
		this.isNodeWebkit = typeof window["c2nodewebkit"] !== "undefined";
		this.isArcade = typeof window["is_scirra_arcade"] !== "undefined";
		this.isWindows8App = !! (typeof window["c2isWindows8"] !== "undefined" && window["c2isWindows8"]);
		this.isWindowsPhone8 = !! (typeof window["c2isWindowsPhone8"] !== "undefined" && window["c2isWindowsPhone8"]);
		this.isBlackberry10 = !! (typeof window["c2isBlackberry10"] !== "undefined" && window["c2isBlackberry10"]);
		this.devicePixelRatio = 1;
		this.isMobile = this.isPhoneGap || this.isAppMobi || this.isCocoonJs || this.isAndroid || this.isiOS || this.isWindowsPhone8 || this.isBlackberry10 || this.isTizen;
		if (!this.isMobile) this.isMobile = /(blackberry|bb10|playbook|palm|symbian|nokia|windows\s+ce|phone|mobile|tablet)/i.test(navigator.userAgent);
		if (typeof cr_is_preview !== "undefined" && !this.isNodeWebkit && (window.location.search === "?nw" || /nodewebkit/i.test(navigator.userAgent))) {
			this.isNodeWebkit = true
		}
		this.isDebug = typeof cr_is_preview !== "undefined" && window.location.search.indexOf("debug") > -1;
		this.canvas = e;
		this.canvasdiv = document.getElementById("c2canvasdiv");
		this.gl = null;
		this.glwrap = null;
		this.ctx = null;
		this.canvas.oncontextmenu = function(e) {
			if (e.preventDefault) e.preventDefault();
			return false
		};
		this.canvas.onselectstart = function(e) {
			if (e.preventDefault) e.preventDefault();
			return false
		};
		if (this.isDirectCanvas) window["c2runtime"] = this;
		if (this.isNodeWebkit) {
			window.ondragover = function(e) {
				e.preventDefault();
				return false
			};
			window.ondrop = function(e) {
				e.preventDefault();
				return false
			}
		}
		this.width = e.width;
		this.height = e.height;
		this.lastwidth = this.width;
		this.lastheight = this.height;
		this.redraw = true;
		this.isSuspended = false;
		if (!Date.now) {
			Date.now = function() {
				return +(new Date)
			}
		}
		this.plugins = [];
		this.types = {};
		this.types_by_index = [];
		this.behaviors = [];
		this.layouts = {};
		this.layouts_by_index = [];
		this.eventsheets = {};
		this.eventsheets_by_index = [];
		this.wait_for_textures = [];
		this.triggers_to_postinit = [];
		this.all_global_vars = [];
		this.all_local_vars = [];
		this.deathRow = new cr.ObjectSet;
		this.isInClearDeathRow = false;
		this.isInOnDestroy = 0;
		this.isRunningEvents = false;
		this.createRow = [];
		this.isLoadingState = false;
		this.saveToSlot = "";
		this.loadFromSlot = "";
		this.loadFromJson = "";
		this.lastSaveJson = "";
		this.signalledContinuousPreview = false;
		this.suspendDrawing = false;
		this.dt = 0;
		this.dt1 = 0;
		this.logictime = 0;
		this.cpuutilisation = 0;
		this.zeroDtCount = 0;
		this.timescale = 1;
		this.kahanTime = new cr.KahanAdder;
		this.last_tick_time = 0;
		this.measuring_dt = true;
		this.fps = 0;
		this.last_fps_time = 0;
		this.tickcount = 0;
		this.execcount = 0;
		this.framecount = 0;
		this.objectcount = 0;
		this.changelayout = null;
		this.destroycallbacks = [];
		this.event_stack = [];
		this.event_stack_index = -1;
		this.localvar_stack = [
			[]
		];
		this.localvar_stack_index = 0;
		this.trigger_depth = 0;
		this.pushEventStack(null);
		this.loop_stack = [];
		this.loop_stack_index = -1;
		this.next_uid = 0;
		this.next_puid = 0;
		this.layout_first_tick = true;
		this.family_count = 0;
		this.suspend_events = [];
		this.raf_id = 0;
		this.timeout_id = 0;
		this.isloading = true;
		this.loadingprogress = 0;
		this.isNodeFullscreen = false;
		this.stackLocalCount = 0;
		this.had_a_click = false;
		this.objects_to_tick = new cr.ObjectSet;
		this.objects_to_tick2 = new cr.ObjectSet;
		this.registered_collisions = [];
		this.temp_poly = new cr.CollisionPoly([]);
		this.temp_poly2 = new cr.CollisionPoly([]);
		this.allGroups = [];
		this.activeGroups = {};
		this.cndsBySid = {};
		this.actsBySid = {};
		this.varsBySid = {};
		this.blocksBySid = {};
		this.running_layout = null;
		this.layer_canvas = null;
		this.layer_ctx = null;
		this.layer_tex = null;
		this.layout_tex = null;
		this.is_WebGL_context_lost = false;
		this.uses_background_blending = false;
		this.fx_tex = [null, null];
		this.fullscreen_scaling = 0;
		this.files_subfolder = "";
		this.objectsByUid = {};
		this.loaderlogo = null;
		this.snapshotCanvas = null;
		this.snapshotData = "";
		this.load();
		this.isRetina = !this.isDomFree && this.useiOSRetina && (this.isiOS || this.isTizen);
		this.devicePixelRatio = this.isRetina ? window["devicePixelRatio"] || 1 : 1;
		this.ClearDeathRow();
		var n;
		if (typeof jQuery !== "undefined" && this.fullscreen_mode > 0) this["setSize"](jQuery(window).width(), jQuery(window).height());
		try {
			if (this.enableWebGL && (this.isCocoonJs || !this.isDomFree)) {
				n = {
					depth: false,
					antialias: !this.isMobile
				};
				var r = true;
				if (this.isChrome && this.isWindows) {
					var i = document.createElement("canvas");
					var s = i.getContext("webgl", n) || i.getContext("experimental-webgl", n);
					if (s.getSupportedExtensions().toString() === "OES_texture_float,OES_standard_derivatives,WEBKIT_WEBGL_lose_context") {
						r = false
					}
				}
				if (r) this.gl = e.getContext("webgl", n) || e.getContext("experimental-webgl", n)
			}
		} catch (o) {}
		if (this.gl) {
			if (!this.isDomFree) {
				this.overlay_canvas = document.createElement("canvas");
				jQuery(this.overlay_canvas).appendTo(this.canvas.parentNode);
				this.overlay_canvas.oncontextmenu = function(e) {
					return false
				};
				this.overlay_canvas.onselectstart = function(e) {
					return false
				};
				this.overlay_canvas.width = e.width;
				this.overlay_canvas.height = e.height;
				this.positionOverlayCanvas();
				this.overlay_ctx = this.overlay_canvas.getContext("2d")
			}
			this.glwrap = new cr.GLWrap(this.gl, this.isMobile);
			this.glwrap.setSize(e.width, e.height);
			this.ctx = null;
			this.canvas.addEventListener("webglcontextlost", function(e) {
				e.preventDefault();
				t.onContextLost();
				window["cr_setSuspended"](true)
			}, false);
			this.canvas.addEventListener("webglcontextrestored", function(e) {
				t.glwrap.initState();
				t.glwrap.setSize(t.glwrap.width, t.glwrap.height, true);
				t.layer_tex = null;
				t.layout_tex = null;
				t.fx_tex[0] = null;
				t.fx_tex[1] = null;
				t.onContextRestored();
				t.redraw = true;
				window["cr_setSuspended"](false)
			}, false);
			var u, a, f, l, c, h, p, d, v, m;
			for (u = 0, a = this.types_by_index.length; u < a; u++) {
				p = this.types_by_index[u];
				for (f = 0, l = p.effect_types.length; f < l; f++) {
					d = p.effect_types[f];
					d.shaderindex = this.glwrap.getShaderIndex(d.id);
					this.uses_background_blending = this.uses_background_blending || this.glwrap.programUsesDest(d.shaderindex)
				}
			}
			for (u = 0, a = this.layouts_by_index.length; u < a; u++) {
				v = this.layouts_by_index[u];
				for (f = 0, l = v.effect_types.length; f < l; f++) {
					d = v.effect_types[f];
					d.shaderindex = this.glwrap.getShaderIndex(d.id)
				}
				for (f = 0, l = v.layers.length; f < l; f++) {
					m = v.layers[f];
					for (c = 0, h = m.effect_types.length; c < h; c++) {
						d = m.effect_types[c];
						d.shaderindex = this.glwrap.getShaderIndex(d.id);
						this.uses_background_blending = this.uses_background_blending || this.glwrap.programUsesDest(d.shaderindex)
					}
				}
			}
		} else {
			if (this.fullscreen_mode > 0 && this.isDirectCanvas) {
				this.canvas = null;
				document.oncontextmenu = function(e) {
					return false
				};
				document.onselectstart = function(e) {
					return false
				};
				this.ctx = AppMobi["canvas"]["getContext"]("2d");
				try {
					this.ctx["samplingMode"] = this.linearSampling ? "smooth" : "sharp";
					this.ctx["globalScale"] = 1;
					this.ctx["HTML5CompatibilityMode"] = true;
					this.ctx["imageSmoothingEnabled"] = this.linearSampling
				} catch (o) {}
				if (this.width !== 0 && this.height !== 0) {
					this.ctx.width = this.width;
					this.ctx.height = this.height
				}
			}
			if (!this.ctx) {
				if (this.isCocoonJs) {
					n = {
						antialias: !! this.linearSampling
					};
					this.ctx = e.getContext("2d", n)
				} else this.ctx = e.getContext("2d");
				this.ctx["webkitImageSmoothingEnabled"] = this.linearSampling;
				this.ctx["mozImageSmoothingEnabled"] = this.linearSampling;
				this.ctx["msImageSmoothingEnabled"] = this.linearSampling;
				this.ctx["imageSmoothingEnabled"] = this.linearSampling
			}
			this.overlay_canvas = null;
			this.overlay_ctx = null
		}
		this.tickFunc = function() {
			t.tick()
		};
		if (window != window.top && !this.isDomFree && !this.isWindows8App) {
			document.addEventListener("mousedown", function() {
				window.focus()
			}, true);
			document.addEventListener("touchstart", function() {
				window.focus()
			}, true)
		}
		if (typeof cr_is_preview !== "undefined") {
			if (this.isCocoonJs) console.log("[Construct 2] In preview-over-wifi via CocoonJS mode");
			if (window.location.search.indexOf("continuous") > -1) {
				cr.logexport("Reloading for continuous preview");
				this.loadFromSlot = "__c2_continuouspreview";
				this.suspendDrawing = true
			}
			if (this.pauseOnBlur && !this.isMobile) {
				jQuery(window).focus(function() {
					t["setSuspended"](false)
				});
				jQuery(window).blur(function() {
					t["setSuspended"](true)
				})
			}
		}
		this.go();
		this.extra = {};
		cr.seal(this)
	}
	function l(e) {
		var t = e.target.result;
		console.log("Save:" + t);
		t.createObjectStore("saves", {
			keyPath: "slot"
		})
	}
	function c(e, t, n, r) {
		console.log("IndexedDB_WriteSlot");
		var i = indexedDB.open("_C2SaveStates");
		i.onupgradeneeded = l;
		i.onerror = r;
		i.onsuccess = function(i) {
			var s = i.target.result;
			s.onerror = r;
			var o = s.transaction(["saves"], "readwrite");
			var u = o.objectStore("saves");
			var a = u.put({
				slot: e,
				data: t
			});
			a.onsuccess = n
		}
	}
	function h(e, t, n) {
		var r = indexedDB.open("_C2SaveStates");
		r.onupgradeneeded = l;
		r.onerror = n;
		r.onsuccess = function(r) {
			var i = r.target.result;
			i.onerror = n;
			var s = i.transaction(["saves"]);
			var o = s.objectStore("saves");
			var u = o.get(e);
			u.onsuccess = function(e) {
				if (u.result) t(u.result["data"]);
				else t(null)
			}
		}
	}
	function p() {
		cr.logexport("Reloading for continuous preview");
		if ( !! window["c2cocoonjs"]) {
			CocoonJS["App"]["reload"]()
		} else {
			if (window.location.search.indexOf("continuous") > -1) window.location.reload(true);
			else window.location = window.location + "?continuous"
		}
	}
	function d(e) {
		var t, n = {};
		for (t in e) {
			if (e.hasOwnProperty(t)) {
				if (e[t] instanceof cr.ObjectSet) continue;
				if (typeof e[t].c2userdata !== "undefined") continue;
				n[t] = e[t]
			}
		}
		return n
	}
	var t = false;
	e.prototype["setSize"] = function(e, t) {
		var n = this.hideAddressBar && this.isiPhone && !navigator["standalone"] && !this.isDomFree && !this.isPhoneGap;
		var r = 0;
		if (n) {
			if (this.isiPhone) r = 60;
			else if (this.isAndroid) r = 56;
			t += r
		}
		var i = 0,
			s = 0;
		var o = 0,
			u = 0,
			a = 0;
		var f = this.fullscreen_mode;
		var l = document["mozFullScreen"] || document["webkitIsFullScreen"] || !! document["msFullscreenElement"] || document["fullScreen"] || this.isNodeFullscreen;
		if (l && this.fullscreen_scaling > 0) f = this.fullscreen_scaling;
		if (f >= 4) {
			var c = this.original_width / this.original_height;
			var h = e / t;
			if (h > c) {
				o = t * c;
				if (f === 5) {
					a = o / this.original_width;
					if (a > 1) a = Math.floor(a);
					else if (a < 1) a = 1 / Math.ceil(1 / a);
					o = this.original_width * a;
					u = this.original_height * a;
					i = (e - o) / 2;
					s = (t - u) / 2;
					e = o;
					t = u
				} else {
					i = (e - o) / 2;
					e = o
				}
			} else {
				u = e / c;
				if (f === 5) {
					a = u / this.original_height;
					if (a > 1) a = Math.floor(a);
					else if (a < 1) a = 1 / Math.ceil(1 / a);
					o = this.original_width * a;
					u = this.original_height * a;
					i = (e - o) / 2;
					s = (t - u) / 2;
					e = o;
					t = u
				} else {
					s = (t - u) / 2;
					t = u
				}
			}
			if (l && !this.isNodeWebkit) {
				i = 0;
				s = 0
			}
			i = Math.floor(i);
			s = Math.floor(s);
			e = Math.floor(e);
			t = Math.floor(t)
		} else if (this.isNodeWebkit && this.isNodeFullscreen && this.fullscreen_mode_set === 0) {
			i = Math.floor((e - this.original_width) / 2);
			s = Math.floor((t - this.original_height) / 2);
			e = this.original_width;
			t = this.original_height
		}
		if (this.isRetina && this.isiPad && this.devicePixelRatio > 1) {
			if (e >= 1024) e = 1023;
			if (t >= 1024) t = 1023
		}
		var p = this.devicePixelRatio;
		this.width = e * p;
		this.height = t * p;
		this.redraw = true;
		if (this.canvasdiv && !this.isDomFree) {
			jQuery(this.canvasdiv).css({
				width: e + "px",
				height: t + "px",
				"margin-left": i,
				"margin-top": s
			});
			if (typeof cr_is_preview !== "undefined") {
				jQuery("#borderwrap").css({
					width: e + "px",
					height: t + "px"
				})
			}
		}
		if (this.canvas) {
			this.canvas.width = e * p;
			this.canvas.height = t * p;
			if (this.isRetina) {
				jQuery(this.canvas).css({
					width: e + "px",
					height: t + "px"
				})
			}
		}
		if (this.overlay_canvas) {
			this.overlay_canvas.width = e;
			this.overlay_canvas.height = t
		}
		if (this.glwrap) this.glwrap.setSize(e, t);
		if (this.isDirectCanvas && this.ctx) {
			this.ctx.width = e;
			this.ctx.height = t
		}
		if (this.ctx) {
			this.ctx["webkitImageSmoothingEnabled"] = this.linearSampling;
			this.ctx["mozImageSmoothingEnabled"] = this.linearSampling;
			this.ctx["msImageSmoothingEnabled"] = this.linearSampling;
			this.ctx["imageSmoothingEnabled"] = this.linearSampling
		}
		if (n && r > 0) {
			window.setTimeout(function() {
				window.scrollTo(0, 1)
			}, 100)
		}
	};
	e.prototype.onContextLost = function() {
		this.is_WebGL_context_lost = true;
		var e, t, n;
		for (e = 0, t = this.types_by_index.length; e < t; e++) {
			n = this.types_by_index[e];
			if (n.onLostWebGLContext) n.onLostWebGLContext()
		}
	};
	e.prototype.onContextRestored = function() {
		this.is_WebGL_context_lost = false;
		var e, t, n;
		for (e = 0, t = this.types_by_index.length; e < t; e++) {
			n = this.types_by_index[e];
			if (n.onRestoreWebGLContext) n.onRestoreWebGLContext()
		}
	};
	e.prototype.positionOverlayCanvas = function() {
		if (this.isDomFree) return;
		var e = document["mozFullScreen"] || document["webkitIsFullScreen"] || document["fullScreen"] || !! document["msFullscreenElement"] || this.isNodeFullscreen;
		var t = e ? jQuery(this.canvas).offset() : jQuery(this.canvas).position();
		t.position = "absolute";
		jQuery(this.overlay_canvas).css(t)
	};
	var n = window["cancelAnimationFrame"] || window["mozCancelAnimationFrame"] || window["webkitCancelAnimationFrame"] || window["msCancelAnimationFrame"] || window["oCancelAnimationFrame"];
	e.prototype["setSuspended"] = function(e) {
		var t, r;
		if (e && !this.isSuspended) {
			cr.logexport("[Construct 2] Suspending");
			this.isSuspended = true;
			if (this.raf_id !== 0 && n) n(this.raf_id);
			if (this.timeout_id !== 0) clearTimeout(this.timeout_id);
			for (t = 0, r = this.suspend_events.length; t < r; t++) this.suspend_events[t](true)
		} else if (!e && this.isSuspended) {
			cr.logexport("[Construct 2] Resuming");
			this.isSuspended = false;
			this.last_tick_time = cr.performance_now();
			this.last_fps_time = cr.performance_now();
			this.framecount = 0;
			this.logictime = 0;
			for (t = 0, r = this.suspend_events.length; t < r; t++) this.suspend_events[t](false);
			this.tick()
		}
	};
	e.prototype.addSuspendCallback = function(e) {
		this.suspend_events.push(e)
	};
	e.prototype.load = function() {
		var e = cr.getProjectModel();
		this.name = e[0];
		this.first_layout = e[1];
		this.fullscreen_mode = e[11];
		this.fullscreen_mode_set = e[11];
		if (this.isDomFree && (e[11] >= 4 || e[11] === 0)) {
			cr.logexport("[Construct 2] Letterbox scale fullscreen modes are not supported on this platform - falling back to 'Scale outer'");
			this.fullscreen_mode = 3;
			this.fullscreen_mode_set = 3
		}
		this.uses_loader_layout = e[17];
		this.loaderstyle = e[18];
		if (this.loaderstyle === 0) {
			this.loaderlogo = new Image;
			this.loaderlogo.src = "loading-logo.png"
		}
		this.next_uid = e[20];
		this.system = new cr.system_object(this);
		var t, n, r, i, s, o, u, a, f, l, c;
		var h, p;
		for (t = 0, n = e[2].length; t < n; t++) {
			a = e[2][t];
			cr.add_common_aces(a);
			h = new a[0](this);
			h.singleglobal = a[1];
			h.is_world = a[2];
			h.must_predraw = a[9];
			if (h.onCreate) h.onCreate();
			cr.seal(h);
			this.plugins.push(h)
		}
		e = cr.getProjectModel();
		for (t = 0, n = e[3].length; t < n; t++) {
			a = e[3][t];
			p = a[1];
			h = null;
			for (r = 0, i = this.plugins.length; r < i; r++) {
				if (this.plugins[r] instanceof p) {
					h = this.plugins[r];
					break
				}
			}
			var d = new h.Type(h);
			d.name = a[0];
			d.is_family = a[2];
			d.instvar_sids = a[3].slice(0);
			d.vars_count = a[3].length;
			d.behs_count = a[4];
			d.fx_count = a[5];
			d.sid = a[11];
			if (d.is_family) {
				d.members = [];
				d.family_index = this.family_count++;
				d.families = null
			} else {
				d.members = null;
				d.family_index = -1;
				d.families = []
			}
			d.family_var_map = null;
			d.family_beh_map = null;
			d.family_fx_map = null;
			d.is_contained = false;
			d.container = null;
			if (a[6]) {
				d.texture_file = a[6][0];
				d.texture_filesize = a[6][1];
				d.texture_pixelformat = a[6][2]
			} else {
				d.texture_file = null;
				d.texture_filesize = 0;
				d.texture_pixelformat = 0
			}
			if (a[7]) {
				d.animations = a[7];
			} else {
				d.animations = null
			}
			d.index = t;
			d.instances = [];
			d.deadCache = [];
			d.solstack = [new cr.selection(d)];
			d.cur_sol = 0;
			d.default_instance = null;
			d.stale_iids = true;
			d.updateIIDs = cr.type_updateIIDs;
			d.getFirstPicked = cr.type_getFirstPicked;
			d.getPairedInstance = cr.type_getPairedInstance;
			d.getCurrentSol = cr.type_getCurrentSol;
			d.pushCleanSol = cr.type_pushCleanSol;
			d.pushCopySol = cr.type_pushCopySol;
			d.popSol = cr.type_popSol;
			d.getBehaviorByName = cr.type_getBehaviorByName;
			d.getBehaviorIndexByName = cr.type_getBehaviorIndexByName;
			d.getEffectIndexByName = cr.type_getEffectIndexByName;
			d.applySolToContainer = cr.type_applySolToContainer;
			d.extra = {};
			d.toString = cr.type_toString;
			d.behaviors = [];
			for (r = 0, i = a[8].length; r < i; r++) {
				f = a[8][r];
				var v = f[1];
				var m = null;
				for (s = 0, o = this.behaviors.length; s < o; s++) {
					if (this.behaviors[s] instanceof v) {
						m = this.behaviors[s];
						break
					}
				}
				if (!m) {
					m = new v(this);
					m.my_instances = new cr.ObjectSet;
					if (m.onCreate) m.onCreate();
					cr.seal(m);
					this.behaviors.push(m)
				}
				var g = new m.Type(m, d);
				g.name = f[0];
				g.sid = f[2];
				g.onCreate();
				cr.seal(g);
				d.behaviors.push(g)
			}
			d.global = a[9];
			d.isOnLoaderLayout = a[10];
			d.effect_types = [];
			for (r = 0, i = a[12].length; r < i; r++) {
				d.effect_types.push({
					id: a[12][r][0],
					name: a[12][r][1],
					shaderindex: -1,
					active: true,
					index: r
				})
			}
			if (!this.uses_loader_layout || d.is_family || d.isOnLoaderLayout || !h.is_world) {
				d.onCreate();
				cr.seal(d)
			}
			if (d.name) this.types[d.name] = d;
			this.types_by_index.push(d);
			if (h.singleglobal) {
				var y = new h.Instance(d);
				y.uid = this.next_uid++;
				y.puid = this.next_puid++;
				y.iid = 0;
				y.get_iid = cr.inst_get_iid;
				y.toString = cr.inst_toString;
				y.properties = a[13];
				y.onCreate();
				cr.seal(y);
				d.instances.push(y);
				this.objectsByUid[y.uid.toString()] = y
			}
		}
		for (t = 0, n = e[4].length; t < n; t++) {
			var b = e[4][t];
			var w = this.types_by_index[b[0]];
			var E;
			for (r = 1, i = b.length; r < i; r++) {
				E = this.types_by_index[b[r]];
				E.families.push(w);
				w.members.push(E)
			}
		}
		for (t = 0, n = e[22].length; t < n; t++) {
			var S = e[22][t];
			var x = [];
			for (r = 0, i = S.length; r < i; r++) x.push(this.types_by_index[S[r]]);
			for (r = 0, i = x.length; r < i; r++) {
				x[r].is_contained = true;
				x[r].container = x
			}
		}
		if (this.family_count > 0) {
			for (t = 0, n = this.types_by_index.length; t < n; t++) {
				l = this.types_by_index[t];
				if (l.is_family || !l.families.length) continue;
				l.family_var_map = new Array(this.family_count);
				l.family_beh_map = new Array(this.family_count);
				l.family_fx_map = new Array(this.family_count);
				var T = [];
				var N = 0;
				var C = 0;
				var k = 0;
				for (r = 0, i = l.families.length; r < i; r++) {
					c = l.families[r];
					l.family_var_map[c.family_index] = N;
					N += c.vars_count;
					l.family_beh_map[c.family_index] = C;
					C += c.behs_count;
					l.family_fx_map[c.family_index] = k;
					k += c.fx_count;
					for (s = 0, o = c.effect_types.length; s < o; s++) T.push(cr.shallowCopy({}, c.effect_types[s]))
				}
				l.effect_types = T.concat(l.effect_types);
				for (r = 0, i = l.effect_types.length; r < i; r++) l.effect_types[r].index = r
			}
		}
		for (t = 0, n = e[5].length; t < n; t++) {
			a = e[5][t];
			var L = new cr.layout(this, a);
			cr.seal(L);
			this.layouts[L.name] = L;
			this.layouts_by_index.push(L)
		}
		for (t = 0, n = e[6].length; t < n; t++) {
			a = e[6][t];
			var A = new cr.eventsheet(this, a);
			cr.seal(A);
			this.eventsheets[A.name] = A;
			this.eventsheets_by_index.push(A)
		}
		for (t = 0, n = this.eventsheets_by_index.length; t < n; t++) this.eventsheets_by_index[t].postInit();
		for (t = 0, n = this.triggers_to_postinit.length; t < n; t++) this.triggers_to_postinit[t].postInit();
		this.triggers_to_postinit.length = 0;
		this.files_subfolder = e[7];
		this.pixel_rounding = e[8];
		this.original_width = e[9];
		this.original_height = e[10];
		this.aspect_scale = 1;
		this.enableWebGL = e[12];
		this.linearSampling = e[13];
		this.clearBackground = e[14];
		this.versionstr = e[15];
		var O = e[16];
		if (O === 2) O = this.isiPhone ? 1 : 0;
		this.useiOSRetina = O !== 0;
		this.hideAddressBar = e[19];
		this.pauseOnBlur = e[21];
		this.start_time = Date.now()
	};
	e.prototype.findWaitingTexture = function(e) {
		var t, n;
		for (t = 0, n = this.wait_for_textures.length; t < n; t++) {
			if (this.wait_for_textures[t].cr_src === e) return this.wait_for_textures[t]
		}
		return null
	};
	e.prototype.areAllTexturesLoaded = function() {
		var e = 0;
		var t = 0;
		var n = true;
		var r, i;
		for (r = 0, i = this.wait_for_textures.length; r < i; r++) {
			var s = this.wait_for_textures[r].cr_filesize;
			if (!s || s <= 0) s = 5e4;
			e += s;
			if (this.wait_for_textures[r].complete || this.wait_for_textures[r]["loaded"]) t += s;
			else n = false
		}
		if (e == 0) this.progress = 0;
		else this.progress = t / e;
		return n
	};
	e.prototype.go = function() {
		if (!this.ctx && !this.glwrap) return;
		var e = this.ctx || this.overlay_ctx;
		if (this.overlay_canvas) this.positionOverlayCanvas();
		this.progress = 0;
		this.last_progress = -1;
		if (this.areAllTexturesLoaded()) this.go_textures_done();
		else {
			var t = Date.now() - this.start_time;
			var n = 1;
			if (this.isTizen) n = this.devicePixelRatio;
			if (e) {
				if (this.loaderstyle !== 3 && t >= 500 && this.last_progress != this.progress) {
					e.clearRect(0, 0, this.width, this.height);
					var r = this.width / (2 * n);
					var i = this.height / (2 * n);
					var s = this.loaderstyle === 0 && this.loaderlogo.complete;
					var o = 40;
					var u = 0;
					var a = 80;
					if (s) {
						a = this.loaderlogo.width;
						o = a / 2;
						u = this.loaderlogo.height / 2;
						e.drawImage(this.loaderlogo, cr.floor(r - o), cr.floor(i - u))
					}
					if (this.loaderstyle <= 1) {
						i += u + (s ? 12 : 0);
						r -= o;
						r = cr.floor(r) + .5;
						i = cr.floor(i) + .5;
						e.fillStyle = "DodgerBlue";
						e.fillRect(r, i, Math.floor(a * this.progress), 6);
						e.strokeStyle = "black";
						e.strokeRect(r, i, a, 6);
						e.strokeStyle = "white";
						e.strokeRect(r - 1, i - 1, a + 2, 8)
					} else if (this.loaderstyle === 2) {
						e.font = "12pt Arial";
						e.fillStyle = "#999";
						e.textBaseLine = "middle";
						var f = Math.round(this.progress * 100) + "%";
						var l = e.measureText ? e.measureText(f) : null;
						var c = l ? l.width : 0;
						e.fillText(f, r - c / 2, i)
					}
				}
				this.last_progress = this.progress
			}
			setTimeout(function(e) {
				return function() {
					e.go()
				}
			}(this), 100)
		}
	};
	e.prototype.go_textures_done = function() {
		if (this.overlay_canvas) {
			this.canvas.parentNode.removeChild(this.overlay_canvas);
			this.overlay_ctx = null;
			this.overlay_canvas = null
		}
		this.start_time = Date.now();
		this.last_fps_time = cr.performance_now();
		var e, t, n;
		if (this.uses_loader_layout) {
			for (e = 0, t = this.types_by_index.length; e < t; e++) {
				n = this.types_by_index[e];
				if (!n.is_family && !n.isOnLoaderLayout && n.plugin.is_world) {
					n.onCreate();
					cr.seal(n)
				}
			}
		} else this.isloading = false;
		for (e = 0, t = this.layouts_by_index.length; e < t; e++) {
			this.layouts_by_index[e].createGlobalNonWorlds()
		}
		if (this.fullscreen_mode >= 2) {
			var r = this.original_width / this.original_height;
			var i = this.width / this.height;
			if (this.fullscreen_mode !== 2 && i > r || this.fullscreen_mode === 2 && i < r) this.aspect_scale = this.height / this.original_height;
			else this.aspect_scale = this.width / this.original_width
		}
		if (this.first_layout) this.layouts[this.first_layout].startRunning();
		else this.layouts_by_index[0].startRunning();
		if (!this.uses_loader_layout) {
			this.loadingprogress = 1;
			this.trigger(cr.system_object.prototype.cnds.OnLoadFinished, null)
		}
		this.tick();
		if (this.isDirectCanvas) AppMobi["webview"]["execute"]("onGameReady();")
	};
	var r = window["requestAnimationFrame"] || window["mozRequestAnimationFrame"] || window["webkitRequestAnimationFrame"] || window["msRequestAnimationFrame"] || window["oRequestAnimationFrame"];
	e.prototype.tick = function() {
		if (!this.running_layout) return;
		var e = cr.performance_now();
		if (!this.isDomFree && window != window.top) {
			var t = this.fullscreen_mode;
			var n = document["mozFullScreen"] || document["webkitIsFullScreen"] || document["fullScreen"] || !! document["msFullscreenElement"] || this.isNodeFullscreen;
			if (n && this.fullscreen_scaling > 0) t = this.fullscreen_scaling;
			if (t > 0) {
				var i = window.innerWidth;
				var s = window.innerHeight;
				if (this.lastwidth !== i || this.lastheight !== s) {
					this.lastwidth = i;
					this.lastheight = s;
					this["setSize"](i, s)
				}
			}
		}
		if (this.isloading) {
			var o = this.areAllTexturesLoaded();
			this.loadingprogress = this.progress;
			if (o) {
				this.isloading = false;
				this.progress = 1;
				this.trigger(cr.system_object.prototype.cnds.OnLoadFinished, null)
			}
		}
		this.logic();
		if ((this.redraw || this.isCocoonJs) && !this.is_WebGL_context_lost && !this.suspendDrawing) {
			this.redraw = false;
			if (this.glwrap) this.drawGL();
			else this.draw();
			if (this.snapshotCanvas) {
				if (this.canvas && this.canvas.toDataURL) {
					this.snapshotData = this.canvas.toDataURL(this.snapshotCanvas[0], this.snapshotCanvas[1]);
					this.trigger(cr.system_object.prototype.cnds.OnCanvasSnapshot, null)
				}
				this.snapshotCanvas = null
			}
		}
		if (!this.hit_breakpoint) {
			this.tickcount++;
			this.execcount++;
			this.framecount++
		}
		this.logictime += cr.performance_now() - e;
		if (this.isSuspended) return;
		if (r) this.raf_id = r(this.tickFunc, this.canvas);
		else {
			this.timeout_id = setTimeout(this.tickFunc, this.isMobile ? 1 : 16)
		}
	};
	e.prototype.logic = function() {
		orientationListener();
		var e, t, n, r, i, s, o, u, a;
		var f = cr.performance_now();
		if (f - this.last_fps_time >= 1e3) {
			this.last_fps_time += 1e3;
			this.fps = this.framecount;
			this.framecount = 0;
			this.cpuutilisation = this.logictime;
			this.logictime = 0
		}
		if (this.measuring_dt) {
			if (this.last_tick_time !== 0) {
				var l = f - this.last_tick_time;
				if (l === 0 && !this.isDebug) {
					this.zeroDtCount++;
					if (this.zeroDtCout >= 10) this.measuring_dt = false;
					this.dt1 = 1 / 60
				} else {
					this.dt1 = l / 1e3;
					if (this.dt1 > .5) this.dt1 = 0;
					else if (this.dt1 > .1) this.dt1 = .1
				}
			}
			this.last_tick_time = f
		}
		this.dt = this.dt1 * this.timescale;
		this.kahanTime.add(this.dt);
		var c = document["mozFullScreen"] || document["webkitIsFullScreen"] || document["fullScreen"] || !! document["msFullscreenElement"] || this.isNodeFullscreen;
		if (this.fullscreen_mode >= 2 || c && this.fullscreen_scaling > 0) {
			var h = this.original_width / this.original_height;
			var p = this.width / this.height;
			var d = this.fullscreen_mode;
			if (c && this.fullscreen_scaling > 0) d = this.fullscreen_scaling;
			if (d !== 2 && p > h || d === 2 && p < h) {
				this.aspect_scale = this.height / this.original_height
			} else {
				this.aspect_scale = this.width / this.original_width
			}
			if (this.running_layout) {
				this.running_layout.scrollToX(this.running_layout.scrollX);
				this.running_layout.scrollToY(this.running_layout.scrollY)
			}
		} else this.aspect_scale = 1;
		this.ClearDeathRow();
		this.isInOnDestroy++;
		this.system.runWaits();
		this.isInOnDestroy--;
		this.ClearDeathRow();
		this.isInOnDestroy++;
		for (e = 0, t = this.types_by_index.length; e < t; e++) {
			o = this.types_by_index[e];
			if (o.is_family || !o.behaviors.length && !o.families.length) continue;
			for (n = 0, r = o.instances.length; n < r; n++) {
				u = o.instances[n];
				for (i = 0, s = u.behavior_insts.length; i < s; i++) {
					u.behavior_insts[i].tick()
				}
			}
		}
		for (e = 0, t = this.types_by_index.length; e < t; e++) {
			o = this.types_by_index[e];
			if (o.is_family || !o.behaviors.length && !o.families.length) continue;
			for (n = 0, r = o.instances.length; n < r; n++) {
				u = o.instances[n];
				for (i = 0, s = u.behavior_insts.length; i < s; i++) {
					a = u.behavior_insts[i];
					if (a.posttick) a.posttick()
				}
			}
		}
		var v = this.objects_to_tick.valuesRef();
		for (e = 0, t = v.length; e < t; e++) v[e].tick();
		this.isInOnDestroy--;
		this.handleSaveLoad();
		e = 0;
		while (this.changelayout && e++ < 10) {
			this.doChangeLayout(this.changelayout)
		}
		for (e = 0, t = this.eventsheets_by_index.length; e < t; e++) this.eventsheets_by_index[e].hasRun = false;
		if (this.running_layout.event_sheet) this.running_layout.event_sheet.run();
		this.registered_collisions.length = 0;
		this.layout_first_tick = false;
		this.isInOnDestroy++;
		for (e = 0, t = this.types_by_index.length; e < t; e++) {
			o = this.types_by_index[e];
			if (o.is_family || !o.behaviors.length && !o.families.length) continue;
			for (n = 0, r = o.instances.length; n < r; n++) {
				var u = o.instances[n];
				for (i = 0, s = u.behavior_insts.length; i < s; i++) {
					a = u.behavior_insts[i];
					if (a.tick2) a.tick2()
				}
			}
		}
		v = this.objects_to_tick2.valuesRef();
		for (e = 0, t = v.length; e < t; e++) v[e].tick2();
		this.isInOnDestroy--
	};
	e.prototype.doChangeLayout = function(e) {
		var t = this.running_layout;
		this.running_layout.stopRunning();
		var n, r, i, s, o, u, a, f, l;
		if (this.glwrap) {
			for (n = 0, r = this.types_by_index.length; n < r; n++) {
				a = this.types_by_index[n];
				if (a.is_family) continue;
				if (a.unloadTextures && (!a.global || a.instances.length === 0) && e.initial_types.indexOf(a) === -1) {
					a.unloadTextures()
				}
			}
		}
		if (t == e) this.system.waits.length = 0;
		e.startRunning();
		for (n = 0, r = this.types_by_index.length; n < r; n++) {
			a = this.types_by_index[n];
			if (!a.global && !a.plugin.singleglobal) continue;
			for (i = 0, s = a.instances.length; i < s; i++) {
				f = a.instances[i];
				if (f.onLayoutChange) f.onLayoutChange();
				if (f.behavior_insts) {
					for (o = 0, u = f.behavior_insts.length; o < u; o++) {
						l = f.behavior_insts[o];
						if (l.onLayoutChange) l.onLayoutChange()
					}
				}
			}
		}
		this.redraw = true;
		this.layout_first_tick = true;
		this.ClearDeathRow()
	};
	e.prototype.tickMe = function(e) {
		this.objects_to_tick.add(e)
	};
	e.prototype.untickMe = function(e) {
		this.objects_to_tick.remove(e)
	};
	e.prototype.tick2Me = function(e) {
		this.objects_to_tick2.add(e)
	};
	e.prototype.untick2Me = function(e) {
		this.objects_to_tick2.remove(e)
	};
	e.prototype.getDt = function(e) {
		if (!e || e.my_timescale === -1) return this.dt;
		return this.dt1 * e.my_timescale
	};
	e.prototype.draw = function() {
		this.running_layout.draw(this.ctx);
		if (this.isDirectCanvas) this.ctx["present"]()
	};
	e.prototype.drawGL = function() {
		this.running_layout.drawGL(this.glwrap);
		this.glwrap.present()
	};
	e.prototype.addDestroyCallback = function(e) {
		if (e) this.destroycallbacks.push(e)
	};
	e.prototype.removeDestroyCallback = function(e) {
		cr.arrayFindRemove(this.destroycallbacks, e)
	};
	e.prototype.getObjectByUID = function(e) {
		return this.objectsByUid[e.toString()]
	};
	e.prototype.DestroyInstance = function(e) {
		var t, n;
		if (!this.deathRow.contains(e)) {
			this.deathRow.add(e);
			if (e.is_contained) {
				for (t = 0, n = e.siblings.length; t < n; t++) {
					this.DestroyInstance(e.siblings[t])
				}
			}
			if (this.isInClearDeathRow) this.deathRow.values_cache.push(e);
			this.isInOnDestroy++;
			this.trigger(Object.getPrototypeOf(e.type.plugin).cnds.OnDestroyed, e);
			this.isInOnDestroy--
		}
	};
	e.prototype.ClearDeathRow = function() {
		var e, t, n, r, i;
		var s, o, u, a, f, l;
		var c, h;
		this.isInClearDeathRow = true;
		for (s = 0, a = this.createRow.length; s < a; s++) {
			e = this.createRow[s];
			n = e.type;
			n.instances.push(e);
			for (o = 0, f = n.families.length; o < f; o++) {
				n.families[o].instances.push(e);
				n.families[o].stale_iids = true
			}
		}
		this.createRow.length = 0;
		var p = this.deathRow.valuesRef();
		for (s = 0; s < p.length; s++) {
			e = p[s];
			n = e.type;
			r = n.instances;
			for (o = 0, f = this.destroycallbacks.length; o < f; o++) this.destroycallbacks[o](e);
			cr.arrayFindRemove(r, e);
			if (e.layer) {
				cr.arrayRemove(e.layer.instances, e.get_zindex());
				e.layer.zindices_stale = true
			}
			for (o = 0, f = n.families.length; o < f; o++) {
				cr.arrayFindRemove(n.families[o].instances, e);
				n.families[o].stale_iids = true
			}
			if (e.behavior_insts) {
				for (o = 0, f = e.behavior_insts.length; o < f; o++) {
					i = e.behavior_insts[o];
					if (i.onDestroy) i.onDestroy();
					i.behavior.my_instances.remove(e)
				}
			}
			this.objects_to_tick.remove(e);
			this.objects_to_tick2.remove(e);
			for (o = 0, f = this.system.waits.length; o < f; o++) {
				c = this.system.waits[o];
				if (c.sols.hasOwnProperty(n.index)) cr.arrayFindRemove(c.sols[n.index].insts, e);
				if (!n.is_family) {
					for (u = 0, l = n.families.length; u < l; u++) {
						h = n.families[u];
						if (c.sols.hasOwnProperty(h.index)) cr.arrayFindRemove(c.sols[h.index].insts, e)
					}
				}
			}
			if (e.onDestroy) e.onDestroy();
			if (this.objectsByUid.hasOwnProperty(e.uid.toString())) delete this.objectsByUid[e.uid.toString()];
			this.objectcount--;
			if (n.deadCache.length < 64) n.deadCache.push(e);
			n.stale_iids = true
		}
		if (!this.deathRow.isEmpty()) this.redraw = true;
		this.deathRow.clear();
		this.isInClearDeathRow = false
	};
	e.prototype.createInstance = function(e, t, n, r) {
		if (e.is_family) {
			var i = cr.floor(Math.random() * e.members.length);
			return this.createInstance(e.members[i], t, n, r)
		}
		if (!e.default_instance) {
			return null
		}
		return this.createInstanceFromInit(e.default_instance, t, false, n, r, false)
	};
	var i = [];
	e.prototype.createInstanceFromInit = function(e, t, n, r, s, o) {
		var u, a, f, l, c, h, p, d;
		if (!e) return null;
		var v = this.types_by_index[e[1]];
		var m = v.plugin.is_world;
		if (this.isloading && m && !v.isOnLoaderLayout) return null;
		if (m && !this.glwrap && e[0][11] === 11) return null;
		var g = t;
		if (!m) t = null;
		var y;
		if (v.deadCache.length) {
			y = v.deadCache.pop();
			y.recycled = true;
			v.plugin.Instance.call(y, v)
		} else {
			y = new v.plugin.Instance(v);
			y.recycled = false
		}
		if (n && !o) y.uid = e[2];
		else y.uid = this.next_uid++;
		this.objectsByUid[y.uid.toString()] = y;
		y.puid = this.next_puid++;
		y.iid = v.instances.length;
		for (u = 0, a = this.createRow.length; u < a; ++u) {
			if (this.createRow[u].type === v) y.iid++
		}
		y.get_iid = cr.inst_get_iid;
		var b = e[3];
		if (y.recycled) {
			cr.wipe(y.extra)
		} else {
			y.extra = {};
			if (typeof cr_is_preview !== "undefined") {
				y.instance_var_names = [];
				y.instance_var_names.length = b.length;
				for (u = 0, a = b.length; u < a; u++) y.instance_var_names[u] = b[u][1]
			}
			y.instance_vars = [];
			y.instance_vars.length = b.length
		}
		for (u = 0, a = b.length; u < a; u++) y.instance_vars[u] = b[u][0];
		if (m) {
			var w = e[0];
			y.x = cr.is_undefined(r) ? w[0] : r;
			y.y = cr.is_undefined(s) ? w[1] : s;
			y.z = w[2];
			y.width = w[3];
			y.height = w[4];
			y.depth = w[5];
			y.angle = w[6];
			y.opacity = w[7];
			y.hotspotX = w[8];
			y.hotspotY = w[9];
			y.blend_mode = w[10];
			h = w[11];
			if (!this.glwrap && v.effect_types.length) y.blend_mode = h;
			y.compositeOp = cr.effectToCompositeOp(y.blend_mode);
			if (this.gl) cr.setGLBlend(y, y.blend_mode, this.gl);
			if (y.recycled) {
				for (u = 0, a = w[12].length; u < a; u++) {
					for (f = 0, l = w[12][u].length; f < l; f++) y.effect_params[u][f] = w[12][u][f]
				}
				y.bbox.set(0, 0, 0, 0);
				y.bquad.set_from_rect(y.bbox);
				y.bbox_changed_callbacks.length = 0
			} else {
				y.effect_params = w[12].slice(0);
				for (u = 0, a = y.effect_params.length; u < a; u++) y.effect_params[u] = w[12][u].slice(0);
				y.active_effect_types = [];
				y.active_effect_flags = [];
				y.active_effect_flags.length = v.effect_types.length;
				y.bbox = new cr.rect(0, 0, 0, 0);
				y.bquad = new cr.quad;
				y.bbox_changed_callbacks = [];
				y.set_bbox_changed = cr.set_bbox_changed;
				y.add_bbox_changed_callback = cr.add_bbox_changed_callback;
				y.contains_pt = cr.inst_contains_pt;
				y.update_bbox = cr.update_bbox;
				y.get_zindex = cr.inst_get_zindex
			}
			for (u = 0, a = v.effect_types.length; u < a; u++) y.active_effect_flags[u] = true;
			y.updateActiveEffects = cr.inst_updateActiveEffects;
			y.updateActiveEffects();
			y.uses_shaders = !! y.active_effect_types.length;
			y.bbox_changed = true;
			y.visible = true;
			y.my_timescale = -1;
			y.layer = t;
			y.zindex = t.instances.length;
			if (typeof y.collision_poly === "undefined") y.collision_poly = null;
			y.collisionsEnabled = true;
			this.redraw = true
		}
		y.toString = cr.inst_toString;
		var E, S;
		i.length = 0;
		for (u = 0, a = v.families.length; u < a; u++) {
			i.push.apply(i, v.families[u].behaviors)
		}
		i.push.apply(i, v.behaviors);
		if (y.recycled) {
			for (u = 0, a = i.length; u < a; u++) {
				var x = i[u];
				S = y.behavior_insts[u];
				S.recycled = true;
				x.behavior.Instance.call(S, x, y);
				E = e[4][u];
				for (f = 0, l = E.length; f < l; f++) S.properties[f] = E[f];
				S.onCreate();
				x.behavior.my_instances.add(y)
			}
		} else {
			y.behavior_insts = [];
			for (u = 0, a = i.length; u < a; u++) {
				var x = i[u];
				var S = new x.behavior.Instance(x, y);
				S.recycled = false;
				S.properties = e[4][u].slice(0);
				S.onCreate();
				cr.seal(S);
				y.behavior_insts.push(S);
				x.behavior.my_instances.add(y)
			}
		}
		E = e[5];
		if (y.recycled) {
			for (u = 0, a = E.length; u < a; u++) y.properties[u] = E[u]
		} else y.properties = E.slice(0);
		this.createRow.push(y);
		if (t) {
			t.instances.push(y)
		}
		this.objectcount++;
		if (v.is_contained) {
			y.is_contained = true;
			if (y.recycled) y.siblings.length = 0;
			else y.siblings = [];
			if (!n && !o) {
				for (u = 0, a = v.container.length; u < a; u++) {
					if (v.container[u] === v) continue;
					if (!v.container[u].default_instance) {
						return null
					}
					y.siblings.push(this.createInstanceFromInit(v.container[u].default_instance, g, false, m ? y.x : r, m ? y.y : s, true))
				}
				for (u = 0, a = y.siblings.length; u < a; u++) {
					y.siblings[u].siblings.push(y);
					for (f = 0; f < a; f++) {
						if (u !== f) y.siblings[u].siblings.push(y.siblings[f])
					}
				}
			}
		} else {
			y.is_contained = false;
			y.siblings = null
		}
		y.onCreate();
		if (!y.recycled) cr.seal(y);
		for (u = 0, a = y.behavior_insts.length; u < a; u++) {
			if (y.behavior_insts[u].postCreate) y.behavior_insts[u].postCreate()
		}
		return y
	};
	e.prototype.getLayerByName = function(e) {
		var t, n;
		for (t = 0, n = this.running_layout.layers.length; t < n; t++) {
			var r = this.running_layout.layers[t];
			if (cr.equals_nocase(r.name, e)) return r
		}
		return null
	};
	e.prototype.getLayerByNumber = function(e) {
		e = cr.floor(e);
		if (e < 0) e = 0;
		if (e >= this.running_layout.layers.length) e = this.running_layout.layers.length - 1;
		return this.running_layout.layers[e]
	};
	e.prototype.getLayer = function(e) {
		if (cr.is_number(e)) return this.getLayerByNumber(e);
		else return this.getLayerByName(e.toString())
	};
	e.prototype.clearSol = function(e) {
		var t, n;
		for (t = 0, n = e.length; t < n; t++) {
			e[t].getCurrentSol().select_all = true
		}
	};
	e.prototype.pushCleanSol = function(e) {
		var t, n;
		for (t = 0, n = e.length; t < n; t++) {
			e[t].pushCleanSol()
		}
	};
	e.prototype.pushCopySol = function(e) {
		var t, n;
		for (t = 0, n = e.length; t < n; t++) {
			e[t].pushCopySol()
		}
	};
	e.prototype.popSol = function(e) {
		var t, n;
		for (t = 0, n = e.length; t < n; t++) {
			e[t].popSol()
		}
	};
	e.prototype.testAndSelectCanvasPointOverlap = function(e, t, n, r) {
		var i = e.getCurrentSol();
		var s, o, u, a;
		var f, l;
		if (i.select_all) {
			if (!r) {
				i.select_all = false;
				i.instances.length = 0
			}
			for (s = 0, a = e.instances.length; s < a; s++) {
				u = e.instances[s];
				u.update_bbox();
				f = u.layer.canvasToLayer(t, n, true);
				l = u.layer.canvasToLayer(t, n, false);
				if (u.contains_pt(f, l)) {
					if (r) return false;
					else i.instances.push(u)
				}
			}
		} else {
			o = 0;
			for (s = 0, a = i.instances.length; s < a; s++) {
				u = i.instances[s];
				u.update_bbox();
				f = u.layer.canvasToLayer(t, n, true);
				l = u.layer.canvasToLayer(t, n, false);
				if (u.contains_pt(f, l)) {
					if (r) return false;
					else {
						i.instances[o] = i.instances[s];
						o++
					}
				}
			}
			if (!r) i.instances.length = o
		}
		e.applySolToContainer();
		if (r) return true;
		else if ((e.name == 't0' || e.name == 't3') && i.hasObjects()) {
			goHome();
			return false;
		}
		return i.hasObjects()
	};
	e.prototype.testOverlap = function(e, t) {
		if (!e || !t || e === t || !e.collisionsEnabled || !t.collisionsEnabled) return false;
		e.update_bbox();
		t.update_bbox();
		var n = e.layer;
		var r = t.layer;
		var i = n !== r && (n.parallaxX !== r.parallaxX || r.parallaxY !== r.parallaxY || n.scale !== r.scale || n.angle !== r.angle || n.zoomRate !== r.zoomRate);
		var s, o, u, a, f, l, c, h;
		if (!i) {
			if (!e.bbox.intersects_rect(t.bbox)) return false;
			if (!e.bquad.intersects_quad(t.bquad)) return false;
			f = e.collision_poly && !e.collision_poly.is_empty();
			l = t.collision_poly && !t.collision_poly.is_empty();
			if (!f && !l) return true;
			if (f) {
				e.collision_poly.cache_poly(e.width, e.height, e.angle);
				c = e.collision_poly
			} else {
				this.temp_poly.set_from_quad(e.bquad, e.x, e.y, e.width, e.height);
				c = this.temp_poly
			}
			if (l) {
				t.collision_poly.cache_poly(t.width, t.height, t.angle);
				h = t.collision_poly
			} else {
				this.temp_poly.set_from_quad(t.bquad, t.x, t.y, t.width, t.height);
				h = this.temp_poly
			}
			return c.intersects_poly(h, t.x - e.x, t.y - e.y)
		} else {
			f = e.collision_poly && !e.collision_poly.is_empty();
			l = t.collision_poly && !t.collision_poly.is_empty();
			if (f) {
				e.collision_poly.cache_poly(e.width, e.height, e.angle);
				this.temp_poly.set_from_poly(e.collision_poly)
			} else {
				this.temp_poly.set_from_quad(e.bquad, e.x, e.y, e.width, e.height)
			}
			c = this.temp_poly;
			if (l) {
				t.collision_poly.cache_poly(t.width, t.height, t.angle);
				this.temp_poly2.set_from_poly(t.collision_poly)
			} else {
				this.temp_poly2.set_from_quad(t.bquad, t.x, t.y, t.width, t.height)
			}
			h = this.temp_poly2;
			for (s = 0, o = c.pts_count; s < o; s++) {
				u = c.pts_cache[s * 2];
				a = c.pts_cache[s * 2 + 1];
				c.pts_cache[s * 2] = n.layerToCanvas(u + e.x, a + e.y, true);
				c.pts_cache[s * 2 + 1] = n.layerToCanvas(u + e.x, a + e.y, false)
			}
			for (s = 0, o = h.pts_count; s < o; s++) {
				u = h.pts_cache[s * 2];
				a = h.pts_cache[s * 2 + 1];
				h.pts_cache[s * 2] = r.layerToCanvas(u + t.x, a + t.y, true);
				h.pts_cache[s * 2 + 1] = r.layerToCanvas(u + t.x, a + t.y, false)
			}
			return c.intersects_poly(h, 0, 0)
		}
	};
	var s = new cr.quad;
	var o = new cr.rect(0, 0, 0, 0);
	e.prototype.testRectOverlap = function(e, t) {
		if (!t || !t.collisionsEnabled) return false;
		t.update_bbox();
		var n = t.layer;
		var r, i;
		if (!t.bbox.intersects_rect(e)) return false;
		s.set_from_rect(e);
		if (!t.bquad.intersects_quad(s)) return false;
		r = t.collision_poly && !t.collision_poly.is_empty();
		if (!r) return true;
		t.collision_poly.cache_poly(t.width, t.height, t.angle);
		s.offset(-e.left, -e.top);
		this.temp_poly.set_from_quad(s, 0, 0, 1, 1);
		return t.collision_poly.intersects_poly(this.temp_poly, e.left - t.x, e.top - t.y)
	};
	e.prototype.testSegmentOverlap = function(e, t, n, r, i) {
		if (!i || !i.collisionsEnabled) return false;
		i.update_bbox();
		var s = i.layer;
		var u, a;
		o.set(cr.min(e, n), cr.min(t, r), cr.max(e, n), cr.max(t, r));
		if (!i.bbox.intersects_rect(o)) return false;
		if (!i.bquad.intersects_segment(e, t, n, r)) return false;
		u = i.collision_poly && !i.collision_poly.is_empty();
		if (!u) return true;
		i.collision_poly.cache_poly(i.width, i.height, i.angle);
		return i.collision_poly.intersects_segment(i.x, i.y, e, t, n, r)
	};
	e.prototype.typeHasBehavior = function(e, t) {
		if (!t) return false;
		var n, r, i, s, o;
		for (n = 0, r = e.behaviors.length; n < r; n++) {
			if (e.behaviors[n].behavior instanceof t) return true
		}
		if (!e.is_family) {
			for (n = 0, r = e.families.length; n < r; n++) {
				o = e.families[n];
				for (i = 0, s = o.behaviors.length; i < s; i++) {
					if (o.behaviors[i].behavior instanceof t) return true
				}
			}
		}
		return false
	};
	e.prototype.typeHasNoSaveBehavior = function(e) {
		return this.typeHasBehavior(e, cr.behaviors.NoSave)
	};
	e.prototype.typeHasPersistBehavior = function(e) {
		return this.typeHasBehavior(e, cr.behaviors.Persist)
	};
	e.prototype.getSolidBehavior = function() {
		if (!cr.behaviors.solid) return null;
		var e, t;
		for (e = 0, t = this.behaviors.length; e < t; e++) {
			if (this.behaviors[e] instanceof cr.behaviors.solid) return this.behaviors[e]
		}
		return null
	};
	e.prototype.testOverlapSolid = function(e) {
		var t = this.getSolidBehavior();
		if (!t) return null;
		var n, r, i;
		var s = t.my_instances.valuesRef();
		for (n = 0, r = s.length; n < r; ++n) {
			i = s[n];
			if (!i.extra.solidEnabled) continue;
			if (this.testOverlap(e, i)) return i
		}
		return null
	};
	e.prototype.testRectOverlapSolid = function(e) {
		var t = this.getSolidBehavior();
		if (!t) return null;
		var n, r, i;
		var s = t.my_instances.valuesRef();
		for (n = 0, r = s.length; n < r; ++n) {
			i = s[n];
			if (!i.extra.solidEnabled) continue;
			if (this.testRectOverlap(e, i)) return i
		}
		return null
	};
	var u = [];
	e.prototype.testOverlapJumpThru = function(e, t) {
		var n = null;
		var r, i, s;
		if (!cr.behaviors.jumpthru) return null;
		for (r = 0, i = this.behaviors.length; r < i; r++) {
			if (this.behaviors[r] instanceof cr.behaviors.jumpthru) {
				n = this.behaviors[r];
				break
			}
		}
		if (!n) return null;
		var o = null;
		if (t) {
			o = u;
			o.length = 0
		}
		var a = n.my_instances.valuesRef();
		for (r = 0, i = a.length; r < i; ++r) {
			s = a[r];
			if (!s.extra.jumpthruEnabled) continue;
			if (this.testOverlap(e, s)) {
				if (t) o.push(s);
				else return s
			}
		}
		return o
	};
	e.prototype.pushOutSolid = function(e, t, n, r, i, s) {
		var o = r || 50;
		var u = e.x;
		var a = e.y;
		var f;
		var l = null,
			c = null;
		for (f = 0; f < o; f++) {
			e.x = u + t * f;
			e.y = a + n * f;
			e.set_bbox_changed();
			if (!this.testOverlap(e, l)) {
				l = this.testOverlapSolid(e);
				if (l) c = l;
				if (!l) {
					if (i) {
						if (s) l = this.testOverlap(e, s) ? s : null;
						else l = this.testOverlapJumpThru(e);
						if (l) c = l
					}
					if (!l) {
						if (c) this.pushInFractional(e, t, n, c, 16);
						return true
					}
				}
			}
		}
		e.x = u;
		e.y = a;
		e.set_bbox_changed();
		return false
	};
	e.prototype.pushOut = function(e, t, n, r, i) {
		var s = r || 50;
		var o = e.x;
		var u = e.y;
		var a;
		for (a = 0; a < s; a++) {
			e.x = o + t * a;
			e.y = u + n * a;
			e.set_bbox_changed();
			if (!this.testOverlap(e, i)) return true
		}
		e.x = o;
		e.y = u;
		e.set_bbox_changed();
		return false
	};
	e.prototype.pushInFractional = function(e, t, n, r, i) {
		var s = 2;
		var o;
		var u = false;
		var a = false;
		var f = e.x;
		var l = e.y;
		while (s <= i) {
			o = 1 / s;
			s *= 2;
			e.x += t * o * (u ? 1 : -1);
			e.y += n * o * (u ? 1 : -1);
			e.set_bbox_changed();
			if (this.testOverlap(e, r)) {
				u = true;
				a = true
			} else {
				u = false;
				a = false;
				f = e.x;
				l = e.y
			}
		}
		if (a) {
			e.x = f;
			e.y = l;
			e.set_bbox_changed()
		}
	};
	e.prototype.pushOutSolidNearest = function(e, t) {
		var n = cr.is_undefined(t) ? 100 : t;
		var r = 0;
		var i = e.x;
		var s = e.y;
		var o = 0;
		var u = 0,
			a = 0;
		var f = this.testOverlapSolid(e);
		if (!f) return true;
		while (r <= n) {
			switch (o) {
			case 0:
				u = 0;
				a = -1;
				r++;
				break;
			case 1:
				u = 1;
				a = -1;
				break;
			case 2:
				u = 1;
				a = 0;
				break;
			case 3:
				u = 1;
				a = 1;
				break;
			case 4:
				u = 0;
				a = 1;
				break;
			case 5:
				u = -1;
				a = 1;
				break;
			case 6:
				u = -1;
				a = 0;
				break;
			case 7:
				u = -1;
				a = -1;
				break
			}
			o = (o + 1) % 8;
			e.x = cr.floor(i + u * r);
			e.y = cr.floor(s + a * r);
			e.set_bbox_changed();
			if (!this.testOverlap(e, f)) {
				f = this.testOverlapSolid(e);
				if (!f) return true
			}
		}
		e.x = i;
		e.y = s;
		e.set_bbox_changed();
		return false
	};
	e.prototype.registerCollision = function(e, t) {
		if (!e.collisionsEnabled || !t.collisionsEnabled) return;
		this.registered_collisions.push([e, t])
	};
	e.prototype.checkRegisteredCollision = function(e, t) {
		var n, r, i;
		for (n = 0, r = this.registered_collisions.length; n < r; n++) {
			i = this.registered_collisions[n];
			if (i[0] == e && i[1] == t || i[0] == t && i[1] == e) return true
		}
		return false
	};
	e.prototype.calculateSolidBounceAngle = function(e, t, n, r) {
		var i = e.x;
		var s = e.y;
		var o = cr.max(10, cr.distanceTo(t, n, i, s));
		var u = cr.angleTo(t, n, i, s);
		var a = r || this.testOverlapSolid(e);
		if (!a) return cr.clamp_angle(u + cr.PI);
		var f = a;
		var l, c, h, p;
		var d = cr.to_radians(5);
		for (l = 1; l < 36; l++) {
			c = u - l * d;
			e.x = t + Math.cos(c) * o;
			e.y = n + Math.sin(c) * o;
			e.set_bbox_changed();
			if (!this.testOverlap(e, f)) {
				f = r ? null : this.testOverlapSolid(e);
				if (!f) {
					h = c;
					break
				}
			}
		}
		if (l === 36) h = cr.clamp_angle(u + cr.PI);
		var f = a;
		for (l = 1; l < 36; l++) {
			c = u + l * d;
			e.x = t + Math.cos(c) * o;
			e.y = n + Math.sin(c) * o;
			e.set_bbox_changed();
			if (!this.testOverlap(e, f)) {
				f = r ? null : this.testOverlapSolid(e);
				if (!f) {
					p = c;
					break
				}
			}
		}
		if (l === 36) p = cr.clamp_angle(u + cr.PI);
		e.x = i;
		e.y = s;
		e.set_bbox_changed();
		if (p === h) return p;
		var v = cr.angleDiff(p, h) / 2;
		var m;
		if (cr.angleClockwise(p, h)) {
			m = cr.clamp_angle(h + v + cr.PI)
		} else {
			m = cr.clamp_angle(p + v)
		}
		var g = Math.cos(u);
		var y = Math.sin(u);
		var b = Math.cos(m);
		var w = Math.sin(m);
		var E = g * b + y * w;
		var S = g - 2 * E * b;
		var x = y - 2 * E * w;
		return cr.angleTo(0, 0, S, x)
	};
	var a = [];
	var f = -1;
	e.prototype.trigger = function(e, t, n) {
		if (!this.running_layout) return false;
		var r = this.running_layout.event_sheet;
		if (!r) return false;
		f++;
		if (f === a.length) a.push(new cr.ObjectSet);
		else a[f].clear();
		var i = this.triggerOnSheet(e, t, r, n);
		f--;
		return i
	};
	e.prototype.triggerOnSheet = function(e, t, n, r) {
		var i = a[f];
		if (i.contains(n)) return false;
		i.add(n);
		var s = n.includes.valuesRef();
		var o = false;
		var u, l, c;
		for (u = 0, l = s.length; u < l; u++) {
			if (s[u].isActive()) {
				c = this.triggerOnSheet(e, t, s[u].include_sheet, r);
				o = o || c
			}
		}
		if (!t) {
			c = this.triggerOnSheetForTypeName(e, t, "system", n, r);
			o = o || c
		} else {
			c = this.triggerOnSheetForTypeName(e, t, t.type.name, n, r);
			o = o || c;
			for (u = 0, l = t.type.families.length; u < l; u++) {
				c = this.triggerOnSheetForTypeName(e, t, t.type.families[u].name, n, r);
				o = o || c
			}
		}
		return o
	};
	e.prototype.triggerOnSheetForTypeName = function(e, t, n, r, i) {
		var s, o;
		var u = false,
			a = false;
		var f, l;
		var c = typeof i !== "undefined";
		var h = c ? r.fasttriggers : r.triggers;
		var p = h[n];
		if (!p) return u;
		var d = null;
		for (s = 0, o = p.length; s < o; s++) {
			if (p[s].method == e) {
				d = p[s].evs;
				break
			}
		}
		if (!d) return u;
		var v;
		if (c) {
			v = d[i]
		} else {
			v = d
		}
		if (!v) return null;
		for (s = 0, o = v.length; s < o; s++) {
			f = v[s][0];
			l = v[s][1];
			a = this.executeSingleTrigger(t, n, f, l);
			u = u || a
		}
		return u
	};
	e.prototype.executeSingleTrigger = function(e, t, n, r) {
		var i, s;
		var o = false;
		this.trigger_depth++;
		var u = this.getCurrentEventStack().current_event;
		if (u) this.pushCleanSol(u.solModifiersIncludingParents);
		var a = this.trigger_depth > 1;
		this.pushCleanSol(n.solModifiersIncludingParents);
		if (a) this.pushLocalVarStack();
		var l = this.pushEventStack(n);
		l.current_event = n;
		if (e) {
			var c = this.types[t].getCurrentSol();
			c.select_all = false;
			c.instances.length = 1;
			c.instances[0] = e;
			this.types[t].applySolToContainer()
		}
		var h = true;
		if (n.parent) {
			var p = l.temp_parents_arr;
			var d = n.parent;
			while (d) {
				p.push(d);
				d = d.parent
			}
			p.reverse();
			for (i = 0, s = p.length; i < s; i++) {
				if (!p[i].run_pretrigger()) {
					h = false;
					break
				}
			}
		}
		if (h) {
			this.execcount++;
			if (n.orblock) n.run_orblocktrigger(r);
			else n.run();
			o = o || l.last_event_true
		}
		this.popEventStack();
		if (a) this.popLocalVarStack();
		this.popSol(n.solModifiersIncludingParents);
		if (u) this.popSol(u.solModifiersIncludingParents);
		if (this.isInOnDestroy === 0 && f === 0 && !this.isRunningEvents && (!this.deathRow.isEmpty() || this.createRow.length)) {
			this.ClearDeathRow()
		}
		this.trigger_depth--;
		return o
	};
	e.prototype.getCurrentCondition = function() {
		var e = this.getCurrentEventStack();
		return e.current_event.conditions[e.cndindex]
	};
	e.prototype.getCurrentAction = function() {
		var e = this.getCurrentEventStack();
		return e.current_event.actions[e.actindex]
	};
	e.prototype.pushLocalVarStack = function() {
		this.localvar_stack_index++;
		if (this.localvar_stack_index >= this.localvar_stack.length) this.localvar_stack.push([])
	};
	e.prototype.popLocalVarStack = function() {
		this.localvar_stack_index--
	};
	e.prototype.getCurrentLocalVarStack = function() {
		return this.localvar_stack[this.localvar_stack_index]
	};
	e.prototype.pushEventStack = function(e) {
		this.event_stack_index++;
		if (this.event_stack_index >= this.event_stack.length) this.event_stack.push(new cr.eventStackFrame);
		var t = this.getCurrentEventStack();
		t.reset(e);
		return t
	};
	e.prototype.popEventStack = function() {
		this.event_stack_index--
	};
	e.prototype.getCurrentEventStack = function() {
		return this.event_stack[this.event_stack_index]
	};
	e.prototype.pushLoopStack = function(e) {
		this.loop_stack_index++;
		if (this.loop_stack_index >= this.loop_stack.length) {
			this.loop_stack.push(cr.seal({
				name: e,
				index: 0,
				stopped: false
			}))
		}
		var t = this.getCurrentLoop();
		t.name = e;
		t.index = 0;
		t.stopped = false;
		return t
	};
	e.prototype.popLoopStack = function() {
		this.loop_stack_index--
	};
	e.prototype.getCurrentLoop = function() {
		return this.loop_stack[this.loop_stack_index]
	};
	e.prototype.getEventVariableByName = function(e, t) {
		var n, r, i, s, o, u;
		while (t) {
			for (n = 0, r = t.subevents.length; n < r; n++) {
				u = t.subevents[n];
				if (u instanceof cr.eventvariable && cr.equals_nocase(e, u.name)) return u
			}
			t = t.parent
		}
		for (n = 0, r = this.eventsheets_by_index.length; n < r; n++) {
			o = this.eventsheets_by_index[n];
			for (i = 0, s = o.events.length; i < s; i++) {
				u = o.events[i];
				if (u instanceof cr.eventvariable && cr.equals_nocase(e, u.name)) return u
			}
		}
		return null
	};
	e.prototype.getLayoutBySid = function(e) {
		var t, n;
		for (t = 0, n = this.layouts_by_index.length; t < n; t++) {
			if (this.layouts_by_index[t].sid === e) return this.layouts_by_index[t]
		}
		return null
	};
	e.prototype.getObjectTypeBySid = function(e) {
		var t, n;
		for (t = 0, n = this.types_by_index.length; t < n; t++) {
			if (this.types_by_index[t].sid === e) return this.types_by_index[t]
		}
		return null
	};
	e.prototype.getGroupBySid = function(e) {
		var t, n;
		for (t = 0, n = this.allGroups.length; t < n; t++) {
			if (this.allGroups[t].sid === e) return this.allGroups[t]
		}
		return null
	};
	e.prototype.signalContinuousPreview = function() {
		this.signalledContinuousPreview = true
	};
	e.prototype.handleSaveLoad = function() {
		var e = this;
		var t = this.saveToSlot;
		var n = this.lastSaveJson;
		var r = this.loadFromSlot;
		var i = false;
		if (this.signalledContinuousPreview) {
			i = true;
			t = "__c2_continuouspreview";
			this.signalledContinuousPreview = false
		}
		if (t.length) {
			this.ClearDeathRow();
			n = this.saveToJSONString();
			if (window.indexedDB && !this.isCocoonJs) {
				c(t, n, function() {
					cr.logexport("Saved state to IndexedDB storage (" + n.length + " bytes)");
					e.lastSaveJson = n;
					e.trigger(cr.system_object.prototype.cnds.OnSaveComplete, null);
					e.lastSaveJson = "";
					if (i) p()
				}, function(r) {
					try {
						localStorage["__c2save_" + t] = n;
						cr.logexport("Saved state to WebStorage (" + n.length + " bytes)");
						e.lastSaveJson = n;
						e.trigger(cr.system_object.prototype.cnds.OnSaveComplete, null);
						e.lastSaveJson = "";
						if (i) p()
					} catch (s) {
						cr.logexport("Failed to save game state: " + r + "; " + s)
					}
				})
			} else {
				try {
					localStorage["__c2save_" + t] = n;
					cr.logexport("Saved state to WebStorage (" + n.length + " bytes)");
					e.lastSaveJson = n;
					this.trigger(cr.system_object.prototype.cnds.OnSaveComplete, null);
					e.lastSaveJson = "";
					if (i) p()
				} catch (s) {
					cr.logexport("Error saving to WebStorage: " + s)
				}
			}
			this.saveToSlot = "";
			this.loadFromSlot = "";
			this.loadFromJson = ""
		}
		if (r.length) {
			if (window.indexedDB && !this.isCocoonJs) {
				h(r, function(t) {
					if (t) {
						e.loadFromJson = t;
						cr.logexport("Loaded state from IndexedDB storage (" + e.loadFromJson.length + " bytes)")
					} else {
						e.loadFromJson = localStorage["__c2save_" + r] || "";
						cr.logexport("Loaded state from WebStorage (" + e.loadFromJson.length + " bytes)")
					}
					e.suspendDrawing = false;
					if (!e.loadFromJson.length) e.trigger(cr.system_object.prototype.cnds.OnLoadFailed, null)
				}, function(t) {
					e.loadFromJson = localStorage["__c2save_" + r] || "";
					cr.logexport("Loaded state from WebStorage (" + e.loadFromJson.length + " bytes)");
					e.suspendDrawing = false;
					if (!e.loadFromJson.length) e.trigger(cr.system_object.prototype.cnds.OnLoadFailed, null)
				})
			} else {
				this.loadFromJson = localStorage["__c2save_" + r] || "";
				cr.logexport("Loaded state from WebStorage (" + this.loadFromJson.length + " bytes)");
				this.suspendDrawing = false;
				if (!e.loadFromJson.length) e.trigger(cr.system_object.prototype.cnds.OnLoadFailed, null)
			}
			this.loadFromSlot = "";
			this.saveToSlot = ""
		}
		if (this.loadFromJson.length) {
			this.ClearDeathRow();
			this.loadFromJSONString(this.loadFromJson);
			this.lastSaveJson = this.loadFromJson;
			this.trigger(cr.system_object.prototype.cnds.OnLoadComplete, null);
			this.lastSaveJson = "";
			this.loadFromJson = ""
		}
	};
	e.prototype.saveToJSONString = function() {
		var e, t, n, r, i, s, o, u, a, f, l, c;
		var h = {
			c2save: true,
			version: 1,
			rt: {
				time: this.kahanTime.sum,
				timescale: this.timescale,
				tickcount: this.tickcount,
				execcount: this.execcount,
				next_uid: this.next_uid,
				running_layout: this.running_layout.sid,
				start_time_offset: Date.now() - this.start_time
			},
			types: {},
			layouts: {},
			events: {
				groups: {},
				cnds: {},
				acts: {},
				vars: {}
			}
		};
		for (e = 0, t = this.types_by_index.length; e < t; e++) {
			i = this.types_by_index[e];
			if (i.is_family || this.typeHasNoSaveBehavior(i)) continue;
			o = {
				instances: []
			};
			if (cr.hasAnyOwnProperty(i.extra)) o["ex"] = d(i.extra);
			for (n = 0, r = i.instances.length; n < r; n++) {
				o["instances"].push(this.saveInstanceToJSON(i.instances[n]))
			}
			h["types"][i.sid.toString()] = o
		}
		for (e = 0, t = this.layouts_by_index.length; e < t; e++) {
			s = this.layouts_by_index[e];
			h["layouts"][s.sid.toString()] = s.saveToJSON()
		}
		var p = h["events"]["groups"];
		for (e = 0, t = this.allGroups.length; e < t; e++) {
			u = this.allGroups[e];
			p[u.sid.toString()] = !! this.activeGroups[u.group_name]
		}
		var v = h["events"]["cnds"];
		for (c in this.cndsBySid) {
			if (this.cndsBySid.hasOwnProperty(c)) {
				a = this.cndsBySid[c];
				if (cr.hasAnyOwnProperty(a.extra)) v[c] = {
					ex: d(a.extra)
				}
			}
		}
		var m = h["events"]["acts"];
		for (c in this.actsBySid) {
			if (this.actsBySid.hasOwnProperty(c)) {
				f = this.actsBySid[c];
				if (cr.hasAnyOwnProperty(f.extra)) m[c] = {
					ex: f.extra
				}
			}
		}
		var g = h["events"]["vars"];
		for (c in this.varsBySid) {
			if (this.varsBySid.hasOwnProperty(c)) {
				l = this.varsBySid[c];
				if (!l.is_constant && (!l.parent || l.is_static)) g[c] = l.data
			}
		}
		h["system"] = this.system.saveToJSON();
		return JSON.stringify(h)
	};
	e.prototype.refreshUidMap = function() {
		var e, t, n, r, i, s;
		this.objectsByUid = {};
		for (e = 0, t = this.types_by_index.length; e < t; e++) {
			n = this.types_by_index[e];
			if (n.is_family) continue;
			for (r = 0, i = n.instances.length; r < i; r++) {
				s = n.instances[r];
				this.objectsByUid[s.uid.toString()] = s
			}
		}
	};
	e.prototype.loadFromJSONString = function(e) {
		var t = JSON.parse(e);
		if (!t["c2save"]) return;
		if (t["version"] > 1) return;
		var n = t["rt"];
		this.kahanTime.reset();
		this.kahanTime.sum = n["time"];
		this.timescale = n["timescale"];
		this.tickcount = n["tickcount"];
		this.execcount = n["execcount"];
		this.start_time = Date.now() - n["start_time_offset"];
		var r = n["running_layout"];
		if (r !== this.running_layout.sid) {
			var i = this.getLayoutBySid(r);
			if (i) this.doChangeLayout(i);
			else return
		}
		this.isLoadingState = true;
		var s, o, u, a, f, l, c, h, p, d, v, m, g, y, b, w, E;
		var S = t["types"];
		for (c in S) {
			if (S.hasOwnProperty(c)) {
				h = this.getObjectTypeBySid(parseInt(c, 10));
				if (!h || h.is_family || this.typeHasNoSaveBehavior(h)) continue;
				if (S[c]["ex"]) h.extra = S[c]["ex"];
				else cr.wipe(h.extra);
				p = h.instances;
				d = S[c]["instances"];
				for (s = 0, o = cr.min(p.length, d.length); s < o; s++) {
					this.loadInstanceFromJSON(p[s], d[s])
				}
				for (s = d.length, o = p.length; s < o; s++) this.DestroyInstance(p[s]);
				for (s = p.length, o = d.length; s < o; s++) {
					y = null;
					if (h.plugin.is_world) {
						y = this.running_layout.getLayerBySid(d[s]["w"]["l"]);
						if (!y) continue
					}
					v = this.createInstanceFromInit(h.default_instance, y, false, 0, 0, true);
					this.loadInstanceFromJSON(v, d[s])
				}
				h.stale_iids = true
			}
		}
		this.ClearDeathRow();
		this.refreshUidMap();
		var x = t["layouts"];
		for (c in x) {
			if (x.hasOwnProperty(c)) {
				g = this.getLayoutBySid(parseInt(c, 10));
				if (!g) continue;
				g.loadFromJSON(x[c])
			}
		}
		var T = t["events"]["groups"];
		for (c in T) {
			if (T.hasOwnProperty(c)) {
				b = this.getGroupBySid(parseInt(c, 10));
				if (b) this.activeGroups[b.group_name] = T[c]
			}
		}
		var N = t["events"]["cnds"];
		for (c in N) {
			if (N.hasOwnProperty(c) && this.cndsBySid.hasOwnProperty(c)) {
				this.cndsBySid[c].extra = N[c]["ex"]
			}
		}
		var C = t["events"]["acts"];
		for (c in C) {
			if (C.hasOwnProperty(c) && this.actsBySid.hasOwnProperty(c)) {
				this.actsBySid[c].extra = C[c]["ex"]
			}
		}
		var k = t["events"]["vars"];
		for (c in k) {
			if (k.hasOwnProperty(c) && this.varsBySid.hasOwnProperty(c)) {
				this.varsBySid[c].data = k[c]
			}
		}
		this.next_uid = n["next_uid"];
		this.isLoadingState = false;
		this.system.loadFromJSON(t["system"]);
		for (s = 0, o = this.types_by_index.length; s < o; s++) {
			h = this.types_by_index[s];
			if (h.is_family) continue;
			for (u = 0, a = h.instances.length; u < a; u++) {
				v = h.instances[u];
				if (h.is_contained) {
					w = v.get_iid();
					v.siblings.length = 0;
					for (f = 0, l = h.container.length; f < l; f++) {
						E = h.container[f];
						if (h === E) continue;
						v.siblings.push(E.instances[w])
					}
				}
				if (v.afterLoad) v.afterLoad();
				if (v.behavior_insts) {
					for (f = 0, l = v.behavior_insts.length; f < l; f++) {
						m = v.behavior_insts[f];
						if (m.afterLoad) m.afterLoad()
					}
				}
			}
		}
		this.redraw = true
	};
	e.prototype.saveInstanceToJSON = function(e) {
		var t, n, r, i, s;
		var o = e.type;
		var u = o.plugin;
		var a = {
			uid: e.uid
		};
		if (cr.hasAnyOwnProperty(e.extra)) a["ex"] = d(e.extra);
		if (e.instance_vars && e.instance_vars.length) {
			a["ivs"] = {};
			for (t = 0, n = e.instance_vars.length; t < n; t++) {
				a["ivs"][e.type.instvar_sids[t].toString()] = e.instance_vars[t]
			}
		}
		if (u.is_world) {
			r = {
				x: e.x,
				y: e.y,
				w: e.width,
				h: e.height,
				l: e.layer.sid,
				zi: e.get_zindex()
			};
			if (e.angle !== 0) r["a"] = e.angle;
			if (e.opacity !== 1) r["o"] = e.opacity;
			if (e.hotspotX !== .5) r["hX"] = e.hotspotX;
			if (e.hotspotY !== .5) r["hY"] = e.hotspotY;
			if (e.blend_mode !== 0) r["bm"] = e.blend_mode;
			if (!e.visible) r["v"] = e.visible;
			if (!e.collisionsEnabled) r["ce"] = e.collisionsEnabled;
			if (e.my_timescale !== -1) r["mts"] = e.my_timescale;
			if (o.effect_types.length) {
				r["fx"] = [];
				for (t = 0, n = o.effect_types.length; t < n; t++) {
					s = o.effect_types[t];
					r["fx"].push({
						name: s.name,
						active: e.active_effect_flags[s.index],
						params: e.effect_params[s.index]
					})
				}
			}
			a["w"] = r
		}
		if (e.behavior_insts && e.behavior_insts.length) {
			a["behs"] = {};
			for (t = 0, n = e.behavior_insts.length; t < n; t++) {
				i = e.behavior_insts[t];
				if (i.saveToJSON) a["behs"][i.type.sid.toString()] = i.saveToJSON()
			}
		}
		if (e.saveToJSON) a["data"] = e.saveToJSON();
		return a
	};
	e.prototype.getInstanceVarIndexBySid = function(e, t) {
		var n, r;
		for (n = 0, r = e.instvar_sids.length; n < r; n++) {
			if (e.instvar_sids[n] === t) return n
		}
		return -1
	};
	e.prototype.getBehaviorIndexBySid = function(e, t) {
		var n, r;
		for (n = 0, r = e.behavior_insts.length; n < r; n++) {
			if (e.behavior_insts[n].type.sid === t) return n
		}
		return -1
	};
	e.prototype.loadInstanceFromJSON = function(e, t) {
		var n, r, i, s, o, u, a, f, l;
		var c;
		var h = e.type;
		var p = h.plugin;
		e.uid = t["uid"];
		if (t["ex"]) e.extra = t["ex"];
		else cr.wipe(e.extra);
		o = t["ivs"];
		if (o) {
			for (n in o) {
				if (o.hasOwnProperty(n)) {
					s = this.getInstanceVarIndexBySid(h, parseInt(n, 10));
					if (s < 0 || s >= e.instance_vars.length) continue;
					e.instance_vars[s] = o[n]
				}
			}
		}
		if (p.is_world) {
			u = t["w"];
			if (e.layer.sid !== u["l"]) {
				c = e.layer;
				e.layer = this.running_layout.getLayerBySid(u["l"]);
				if (e.layer) {
					e.layer.instances.push(e);
					e.layer.zindices_stale = true;
					cr.arrayFindRemove(c.instances, e);
					c.zindices_stale = true
				} else {
					e.layer = c;
					this.DestroyInstance(e)
				}
			}
			e.x = u["x"];
			e.y = u["y"];
			e.width = u["w"];
			e.height = u["h"];
			e.zindex = u["zi"];
			e.angle = u.hasOwnProperty("a") ? u["a"] : 0;
			e.opacity = u.hasOwnProperty("o") ? u["o"] : 1;
			e.hotspotX = u.hasOwnProperty("hX") ? u["hX"] : .5;
			e.hotspotY = u.hasOwnProperty("hY") ? u["hY"] : .5;
			e.visible = u.hasOwnProperty("v") ? u["v"] : true;
			e.collisionsEnabled = u.hasOwnProperty("ce") ? u["ce"] : true;
			e.my_timescale = u.hasOwnProperty("mts") ? u["mts"] : -1;
			e.blend_mode = u.hasOwnProperty("bm") ? u["bm"] : 0;
			e.compositeOp = cr.effectToCompositeOp(e.blend_mode);
			if (this.gl) cr.setGLBlend(e, e.blend_mode, this.gl);
			e.set_bbox_changed();
			if (u.hasOwnProperty("fx")) {
				for (r = 0, i = u["fx"].length; r < i; r++) {
					a = h.getEffectIndexByName(u["fx"][r]["name"]);
					if (a < 0) continue;
					e.active_effect_flags[a] = u["fx"][r]["active"];
					e.effect_params[a] = u["fx"][r]["params"]
				}
			}
			e.updateActiveEffects()
		}
		f = t["behs"];
		if (f) {
			for (n in f) {
				if (f.hasOwnProperty(n)) {
					l = this.getBehaviorIndexBySid(e, parseInt(n, 10));
					if (l < 0) continue;
					e.behavior_insts[l].loadFromJSON(f[n])
				}
			}
		}
		if (t["data"]) e.loadFromJSON(t["data"])
	};
	cr.runtime = e;
	cr.createRuntime = function(t) {
		return new e(document.getElementById(t))
	};
	cr.createDCRuntime = function(t, n) {
		return new e({
			dc: true,
			width: t,
			height: n
		})
	};
	window["cr_createRuntime"] = cr.createRuntime;
	window["cr_createDCRuntime"] = cr.createDCRuntime;
	window["createCocoonJSRuntime"] = function() {
		window["c2cocoonjs"] = true;
		var t = document.createElement("screencanvas") || document.createElement("canvas");
		document.body.appendChild(t);
		var n = new e(t);
		window["c2runtime"] = n;
		window.addEventListener("orientationchange", function() {
			window["c2runtime"]["setSize"](window.innerWidth, window.innerHeight)
		});
		window["c2runtime"]["setSize"](window.innerWidth, window.innerHeight);
		return n
	}
})();
window["cr_getC2Runtime"] = function() {
	var e = document.getElementById("c2canvas");
	if (e) return e["c2runtime"];
	else if (window["c2runtime"]) return window["c2runtime"];
	else return null
};
window["cr_sizeCanvas"] = function(e, t) {
	if (e === 0 || t === 0) return;
	var n = window["cr_getC2Runtime"]();
	if (n) n["setSize"](e, t)
};
window["cr_setSuspended"] = function(e) {
	var t = window["cr_getC2Runtime"]();
	if (t) t["setSuspended"](e)
};
(function() {
	function e(e, t) {
		this.runtime = e;
		this.event_sheet = null;
		this.scrollX = this.runtime.original_width / 2;
		this.scrollY = this.runtime.original_height / 2;
		this.scale = 1;
		this.angle = 0;
		this.first_visit = true;
		this.name = t[0];
		this.width = t[1];
		this.height = t[2];
		this.unbounded_scrolling = t[3];
		this.sheetname = t[4];
		this.sid = t[5];
		var n = t[6];
		var r, i;
		this.layers = [];
		this.initial_types = [];
		for (r = 0, i = n.length; r < i; r++) {
			var s = new cr.layer(this, n[r]);
			s.number = r;
			cr.seal(s);
			this.layers.push(s)
		}
		var o = t[7];
		this.initial_nonworld = [];
		for (r = 0, i = o.length; r < i; r++) {
			var u = o[r];
			var a = this.runtime.types_by_index[u[1]];
			if (!a.default_instance) a.default_instance = u;
			this.initial_nonworld.push(u);
			if (this.initial_types.indexOf(a) === -1) this.initial_types.push(a)
		}
		this.effect_types = [];
		this.active_effect_types = [];
		this.effect_params = [];
		for (r = 0, i = t[8].length; r < i; r++) {
			this.effect_types.push({
				id: t[8][r][0],
				name: t[8][r][1],
				shaderindex: -1,
				active: true,
				index: r
			});
			this.effect_params.push(t[8][r][2].slice(0))
		}
		this.updateActiveEffects();
		this.rcTex = new cr.rect(0, 0, 1, 1);
		this.rcTex2 = new cr.rect(0, 0, 1, 1);
		this.persist_data = {}
	}
	function n(e, t) {
		this.layout = e;
		this.runtime = e.runtime;
		this.instances = [];
		this.scale = 1;
		this.angle = 0;
		this.disableAngle = false;
		this.tmprect = new cr.rect(0, 0, 0, 0);
		this.tmpquad = new cr.quad;
		this.viewLeft = 0;
		this.viewRight = 0;
		this.viewTop = 0;
		this.viewBottom = 0;
		this.zindices_stale = false;
		this.name = t[0];
		this.index = t[1];
		this.sid = t[2];
		this.visible = t[3];
		this.background_color = t[4];
		this.transparent = t[5];
		this.parallaxX = t[6];
		this.parallaxY = t[7];
		this.opacity = t[8];
		this.forceOwnTexture = t[9];
		this.zoomRate = t[10];
		this.blend_mode = t[11];
		this.effect_fallback = t[12];
		this.compositeOp = "source-over";
		this.srcBlend = 0;
		this.destBlend = 0;
		this.render_offscreen = false;
		var n = t[13];
		var r, i;
		this.initial_instances = [];
		for (r = 0, i = n.length; r < i; r++) {
			var s = n[r];
			var o = this.runtime.types_by_index[s[1]];
			if (!o.default_instance) o.default_instance = s;
			this.initial_instances.push(s);
			if (this.layout.initial_types.indexOf(o) === -1) this.layout.initial_types.push(o)
		}
		this.effect_types = [];
		this.active_effect_types = [];
		this.effect_params = [];
		for (r = 0, i = t[14].length; r < i; r++) {
			this.effect_types.push({
				id: t[14][r][0],
				name: t[14][r][1],
				shaderindex: -1,
				active: true,
				index: r
			});
			this.effect_params.push(t[14][r][2].slice(0))
		}
		this.updateActiveEffects();
		this.rcTex = new cr.rect(0, 0, 1, 1);
		this.rcTex2 = new cr.rect(0, 0, 1, 1)
	}
	function r(e, t) {
		return e.zindex - t.zindex
	}
	e.prototype.saveObjectToPersist = function(e) {
		var t = e.type.sid.toString();
		if (!this.persist_data.hasOwnProperty(t)) this.persist_data[t] = [];
		var n = this.persist_data[t];
		n.push(this.runtime.saveInstanceToJSON(e))
	};
	e.prototype.hasOpaqueBottomLayer = function() {
		var e = this.layers[0];
		return !e.transparent && e.opacity === 1 && !e.forceOwnTexture && e.visible
	};
	e.prototype.updateActiveEffects = function() {
		this.active_effect_types.length = 0;
		var e, t, n;
		for (e = 0, t = this.effect_types.length; e < t; e++) {
			n = this.effect_types[e];
			if (n.active) this.active_effect_types.push(n)
		}
	};
	e.prototype.getEffectByName = function(e) {
		var t, n, r;
		for (t = 0, n = this.effect_types.length; t < n; t++) {
			r = this.effect_types[t];
			if (r.name === e) return r
		}
		return null
	};
	var t = [];
	e.prototype.startRunning = function() {
		if (this.sheetname) {
			this.event_sheet = this.runtime.eventsheets[this.sheetname];
		}
		this.runtime.running_layout = this;
		this.scrollX = this.runtime.original_width / 2;
		this.scrollY = this.runtime.original_height / 2;
		var e, n, i, s, o, u, a, f, l, c, h, p, d, v;
		for (e = 0, i = this.runtime.types_by_index.length; e < i; e++) {
			o = this.runtime.types_by_index[e];
			if (o.is_family) continue;
			u = o.instances;
			for (n = 0, s = u.length; n < s; n++) {
				a = u[n];
				if (a.layer) {
					var m = a.layer.number;
					if (m >= this.layers.length) m = this.layers.length - 1;
					a.layer = this.layers[m];
					a.layer.instances.push(a);
					a.layer.zindices_stale = true
				}
			}
		}
		var v;
		t.length = 0;
		this.boundScrolling();
		for (e = 0, i = this.layers.length; e < i; e++) {
			v = this.layers[e];
			v.createInitialInstances();
			v.disableAngle = true;
			var g = v.canvasToLayer(0, 0, true);
			var y = v.canvasToLayer(0, 0, false);
			v.disableAngle = false;
			if (this.runtime.pixel_rounding) {
				g = g + .5 | 0;
				y = y + .5 | 0
			}
			v.rotateViewport(g, y, null)
		}
		var b = false;
		if (!this.first_visit) {
			for (h in this.persist_data) {
				if (this.persist_data.hasOwnProperty(h)) {
					o = this.runtime.getObjectTypeBySid(parseInt(h, 10));
					if (!o || o.is_family || !this.runtime.typeHasPersistBehavior(o)) continue;
					d = this.persist_data[h];
					for (e = 0, i = d.length; e < i; e++) {
						v = null;
						if (o.plugin.is_world) {
							v = this.getLayerBySid(d[e]["w"]["l"]);
							if (!v) continue
						}
						a = this.runtime.createInstanceFromInit(o.default_instance, v, false, 0, 0, true);
						this.runtime.loadInstanceFromJSON(a, d[e]);
						b = true;
						t.push(a)
					}
					d.length = 0
				}
			}
			for (e = 0, i = this.layers.length; e < i; e++) {
				this.layers[e].instances.sort(r);
				this.layers[e].zindices_stale = true
			}
		}
		if (b) {
			this.runtime.ClearDeathRow();
			this.runtime.refreshUidMap()
		}
		for (e = 0; e < t.length; e++) {
			a = t[e];
			if (!a.type.is_contained) continue;
			f = a.get_iid();
			for (n = 0, s = a.type.container.length; n < s; n++) {
				l = a.type.container[n];
				if (a.type === l) continue;
				if (l.instances.length > f) a.siblings.push(l.instances[f]);
				else {
					if (!l.default_instance) {} else {
						c = this.runtime.createInstanceFromInit(l.default_instance, a.layer, true, a.x, a.y, true);
						this.runtime.ClearDeathRow();
						l.updateIIDs();
						a.siblings.push(c);
						t.push(c)
					}
				}
			}
		}
		for (e = 0, i = this.initial_nonworld.length; e < i; e++) {
			a = this.runtime.createInstanceFromInit(this.initial_nonworld[e], null, true);
		}
		this.runtime.changelayout = null;
		this.runtime.ClearDeathRow();
		if (this.runtime.ctx && !this.runtime.isDomFree) {
			for (e = 0, i = this.runtime.types_by_index.length; e < i; e++) {
				l = this.runtime.types_by_index[e];
				if (l.is_family || !l.instances.length || !l.preloadCanvas2D) continue;
				l.preloadCanvas2D(this.runtime.ctx)
			}
		}
		for (e = 0, i = t.length; e < i; e++) {
			a = t[e];
			this.runtime.trigger(Object.getPrototypeOf(a.type.plugin).cnds.OnCreated, a)
		}
		t.length = 0;
		this.runtime.trigger(cr.system_object.prototype.cnds.OnLayoutStart, null);
		this.first_visit = false
	};
	e.prototype.createGlobalNonWorlds = function() {
		var e, t, n, r, i, s;
		for (e = 0, t = 0, n = this.initial_nonworld.length; e < n; e++) {
			r = this.initial_nonworld[e];
			s = this.runtime.types_by_index[r[1]];
			if (s.global) i = this.runtime.createInstanceFromInit(r, null, true);
			else {
				this.initial_nonworld[t] = r;
				t++
			}
		}
		this.initial_nonworld.length = t
	};
	e.prototype.stopRunning = function() {
		this.runtime.trigger(cr.system_object.prototype.cnds.OnLayoutEnd, null);
		this.runtime.system.waits.length = 0;
		var e, t, n, r;
		var i, s, o;
		for (e = 0, t = this.layers.length; e < t; e++) {
			i = this.layers[e].instances;
			for (n = 0, r = i.length; n < r; n++) {
				s = i[n];
				if (!s.type.global) {
					if (this.runtime.typeHasPersistBehavior(s.type)) this.saveObjectToPersist(s);
					this.runtime.DestroyInstance(s)
				}
			}
			this.runtime.ClearDeathRow();
			i.length = 0;
			this.layers[e].zindices_stale = true
		}
		for (e = 0, t = this.runtime.types_by_index.length; e < t; e++) {
			o = this.runtime.types_by_index[e];
			if (o.global || o.plugin.is_world || o.plugin.singleglobal || o.is_family) continue;
			for (n = 0, r = o.instances.length; n < r; n++) this.runtime.DestroyInstance(o.instances[n]);
			this.runtime.ClearDeathRow()
		}
	};
	e.prototype.draw = function(e) {
		e.globalAlpha = 1;
		e.globalCompositeOperation = "source-over";
		if (this.runtime.clearBackground && !this.hasOpaqueBottomLayer()) e.clearRect(0, 0, this.runtime.width, this.runtime.height);
		var t, n, r;
		for (t = 0, n = this.layers.length; t < n; t++) {
			r = this.layers[t];
			if (r.visible && r.opacity > 0 && r.blend_mode !== 11) r.draw(e)
		}
	};
	e.prototype.drawGL = function(e) {
		var t = this.active_effect_types.length > 0 || this.runtime.uses_background_blending;
		if (t) {
			if (!this.runtime.layout_tex) {
				this.runtime.layout_tex = e.createEmptyTexture(this.runtime.width, this.runtime.height, this.runtime.linearSampling)
			}
			if (this.runtime.layout_tex.c2width !== this.runtime.width || this.runtime.layout_tex.c2height !== this.runtime.height) {
				e.deleteTexture(this.runtime.layout_tex);
				this.runtime.layout_tex = e.createEmptyTexture(this.runtime.width, this.runtime.height, this.runtime.linearSampling)
			}
			e.setRenderingToTexture(this.runtime.layout_tex)
		}
		if (this.runtime.clearBackground && !this.hasOpaqueBottomLayer()) e.clear(0, 0, 0, 0);
		var n, r;
		for (n = 0, r = this.layers.length; n < r; n++) {
			if (this.layers[n].visible && this.layers[n].opacity > 0) this.layers[n].drawGL(e)
		}
		if (t) {
			if (this.active_effect_types.length <= 1) {
				if (this.active_effect_types.length === 1) {
					var i = this.active_effect_types[0].index;
					e.switchProgram(this.active_effect_types[0].shaderindex);
					e.setProgramParameters(null, 1 / this.runtime.width, 1 / this.runtime.height, 0, 0, 1, 1, this.scale, this.effect_params[i]);
					if (e.programIsAnimated(this.active_effect_types[0].shaderindex)) this.runtime.redraw = true
				} else e.switchProgram(0);
				e.setRenderingToTexture(null);
				e.setOpacity(1);
				e.setTexture(this.runtime.layout_tex);
				e.setAlphaBlend();
				e.resetModelView();
				e.updateModelView();
				var s = this.runtime.width / 2;
				var o = this.runtime.height / 2;
				e.quad(-s, o, s, o, s, -o, -s, -o);
				e.setTexture(null)
			} else {
				this.renderEffectChain(e, null, null, null)
			}
		}
	};
	e.prototype.getRenderTarget = function() {
		return this.active_effect_types.length > 0 || this.runtime.uses_background_blending ? this.runtime.layout_tex : null
	};
	e.prototype.getMinLayerScale = function() {
		var e = this.layers[0].getScale();
		var t, n, r;
		for (t = 1, n = this.layers.length; t < n; t++) {
			r = this.layers[t];
			if (r.parallaxX === 0 && r.parallaxY === 0) continue;
			if (r.getScale() < e) e = r.getScale()
		}
		return e
	};
	e.prototype.scrollToX = function(e) {
		if (!this.unbounded_scrolling) {
			var t = this.runtime.width * (1 / this.getMinLayerScale()) / 2;
			if (e > this.width - t) e = this.width - t;
			if (e < t) e = t
		}
		if (this.scrollX !== e) {
			this.scrollX = e;
			this.runtime.redraw = true
		}
	};
	e.prototype.scrollToY = function(e) {
		if (!this.unbounded_scrolling) {
			var t = this.runtime.height * (1 / this.getMinLayerScale()) / 2;
			if (e > this.height - t) e = this.height - t;
			if (e < t) e = t
		}
		if (this.scrollY !== e) {
			this.scrollY = e;
			this.runtime.redraw = true
		}
	};
	e.prototype.boundScrolling = function() {
		this.scrollToX(this.scrollX);
		this.scrollToY(this.scrollY)
	};
	e.prototype.renderEffectChain = function(e, t, n, r) {
		var i = n ? n.active_effect_types : t ? t.active_effect_types : this.active_effect_types;
		var s = n ? n.layer.getScale() : t ? t.getScale() : 1;
		var o = this.runtime.fx_tex;
		var u, a, f, l, c = 0,
			h = 1;
		var p, d;
		var v = this.runtime.width;
		var m = this.runtime.height;
		var g = v / 2;
		var y = m / 2;
		var b = t ? t.rcTex : this.rcTex;
		var w = t ? t.rcTex2 : this.rcTex2;
		var E = 0,
			S = 0;
		var x = 0,
			T = 0;
		var N = v,
			C = v;
		var k = m,
			L = m;
		var A = 0;
		var O = 0;
		var M = n ? n.layer.getAngle() : 0;
		if (n) {
			for (u = 0, a = i.length; u < a; u++) {
				A += e.getProgramBoxExtendHorizontal(i[u].shaderindex);
				O += e.getProgramBoxExtendVertical(i[u].shaderindex)
			}
			var _ = n.bbox;
			E = t.layerToCanvas(_.left, _.top, true);
			x = t.layerToCanvas(_.left, _.top, false);
			N = t.layerToCanvas(_.right, _.bottom, true);
			k = t.layerToCanvas(_.right, _.bottom, false);
			if (M !== 0) {
				var D = t.layerToCanvas(_.right, _.top, true);
				var P = t.layerToCanvas(_.right, _.top, false);
				var H = t.layerToCanvas(_.left, _.bottom, true);
				var B = t.layerToCanvas(_.left, _.bottom, false);
				l = Math.min(E, N, D, H);
				N = Math.max(E, N, D, H);
				E = l;
				l = Math.min(x, k, P, B);
				k = Math.max(x, k, P, B);
				x = l
			}
			E -= A;
			x -= O;
			N += A;
			k += O;
			w.left = E / v;
			w.top = 1 - x / m;
			w.right = N / v;
			w.bottom = 1 - k / m;
			S = E = Math.floor(E);
			T = x = Math.floor(x);
			C = N = Math.ceil(N);
			L = k = Math.ceil(k);
			S -= A;
			T -= O;
			C += A;
			L += O;
			if (E < 0) E = 0;
			if (x < 0) x = 0;
			if (N > v) N = v;
			if (k > m) k = m;
			if (S < 0) S = 0;
			if (T < 0) T = 0;
			if (C > v) C = v;
			if (L > m) L = m;
			b.left = E / v;
			b.top = 1 - x / m;
			b.right = N / v;
			b.bottom = 1 - k / m
		} else {
			b.left = w.left = 0;
			b.top = w.top = 0;
			b.right = w.right = 1;
			b.bottom = w.bottom = 1
		}
		var j = n && ((n.angle || M) && e.programUsesDest(i[0].shaderindex) || A !== 0 || O !== 0 || n.opacity !== 1 || n.type.plugin.must_predraw) || t && !n && t.opacity !== 1;
		e.setAlphaBlend();
		if (j) {
			if (!o[c]) {
				o[c] = e.createEmptyTexture(v, m, this.runtime.linearSampling)
			}
			if (o[c].c2width !== v || o[c].c2height !== m) {
				e.deleteTexture(o[c]);
				o[c] = e.createEmptyTexture(v, m, this.runtime.linearSampling)
			}
			e.switchProgram(0);
			e.setRenderingToTexture(o[c]);
			d = L - T;
			p = m - T - d;
			e.clearRect(S, p, C - S, d);
			if (n) {
				n.drawGL(e)
			} else {
				e.setTexture(this.runtime.layer_tex);
				e.setOpacity(t.opacity);
				e.resetModelView();
				e.translate(-g, -y);
				e.updateModelView();
				e.quadTex(E, k, N, k, N, x, E, x, b)
			}
			w.left = w.top = 0;
			w.right = w.bottom = 1;
			if (n) {
				l = b.top;
				b.top = b.bottom;
				b.bottom = l
			}
			c = 1;
			h = 0
		}
		e.setOpacity(1);
		var f = i.length - 1;
		var F = e.programUsesCrossSampling(i[f].shaderindex);
		var I = 0;
		for (u = 0, a = i.length; u < a; u++) {
			if (!o[c]) {
				o[c] = e.createEmptyTexture(v, m, this.runtime.linearSampling)
			}
			if (o[c].c2width !== v || o[c].c2height !== m) {
				e.deleteTexture(o[c]);
				o[c] = e.createEmptyTexture(v, m, this.runtime.linearSampling)
			}
			e.switchProgram(i[u].shaderindex);
			I = i[u].index;
			if (e.programIsAnimated(i[u].shaderindex)) this.runtime.redraw = true;
			if (u == 0 && !j) {
				e.setRenderingToTexture(o[c]);
				d = L - T;
				p = m - T - d;
				e.clearRect(S, p, C - S, d);
				if (n) {
					e.setProgramParameters(r, 1 / n.width, 1 / n.height, w.left, w.top, w.right, w.bottom, s, n.effect_params[I]);
					n.drawGL(e)
				} else {
					e.setProgramParameters(r, 1 / v, 1 / m, 0, 0, 1, 1, s, t ? t.effect_params[I] : this.effect_params[I]);
					e.setTexture(t ? this.runtime.layer_tex : this.runtime.layout_tex);
					e.resetModelView();
					e.translate(-g, -y);
					e.updateModelView();
					e.quadTex(E, k, N, k, N, x, E, x, b)
				}
				w.left = w.top = 0;
				w.right = w.bottom = 1;
				if (n && !F) {
					l = k;
					k = x;
					x = l
				}
			} else {
				e.setProgramParameters(r, 1 / v, 1 / m, w.left, w.top, w.right, w.bottom, s, n ? n.effect_params[I] : t ? t.effect_params[I] : this.effect_params[I]);
				if (u === f && !F) {
					if (n) e.setBlend(n.srcBlend, n.destBlend);
					else if (t) e.setBlend(t.srcBlend, t.destBlend);
					e.setRenderingToTexture(r)
				} else {
					e.setRenderingToTexture(o[c]);
					d = L - T;
					p = m - T - d;
					e.clearRect(S, p, C - S, d)
				}
				e.setTexture(o[h]);
				e.resetModelView();
				e.translate(-g, -y);
				e.updateModelView();
				e.quadTex(E, k, N, k, N, x, E, x, b);
				if (u === f && !F) e.setTexture(null)
			}
			c = c === 0 ? 1 : 0;
			h = c === 0 ? 1 : 0
		}
		if (F) {
			e.switchProgram(0);
			if (n) e.setBlend(n.srcBlend, n.destBlend);
			else if (t) e.setBlend(t.srcBlend, t.destBlend);
			e.setRenderingToTexture(r);
			e.setTexture(o[h]);
			e.resetModelView();
			e.translate(-g, -y);
			e.updateModelView();
			if (n && i.length === 1 && !j) e.quadTex(E, x, N, x, N, k, E, k, b);
			else e.quadTex(E, k, N, k, N, x, E, x, b);
			e.setTexture(null)
		}
	};
	e.prototype.getLayerBySid = function(e) {
		var t, n;
		for (t = 0, n = this.layers.length; t < n; t++) {
			if (this.layers[t].sid === e) return this.layers[t]
		}
		return null
	};
	e.prototype.saveToJSON = function() {
		var e, t, n, r;
		var i = {
			sx: this.scrollX,
			sy: this.scrollY,
			s: this.scale,
			a: this.angle,
			w: this.width,
			h: this.height,
			fv: this.first_visit,
			persist: this.persist_data,
			fx: [],
			layers: {}
		};
		for (e = 0, t = this.effect_types.length; e < t; e++) {
			r = this.effect_types[e];
			i["fx"].push({
				name: r.name,
				active: r.active,
				params: this.effect_params[r.index]
			})
		}
		for (e = 0, t = this.layers.length; e < t; e++) {
			n = this.layers[e];
			i["layers"][n.sid.toString()] = n.saveToJSON()
		}
		return i
	};
	e.prototype.loadFromJSON = function(e) {
		var t, n, r, i, s;
		this.scrollX = e["sx"];
		this.scrollY = e["sy"];
		this.scale = e["s"];
		this.angle = e["a"];
		this.width = e["w"];
		this.height = e["h"];
		this.persist_data = e["persist"];
		if (typeof e["fv"] !== "undefined") this.first_visit = e["fv"];
		var o = e["fx"];
		for (t = 0, n = o.length; t < n; t++) {
			r = this.getEffectByName(o[t]["name"]);
			if (!r) continue;
			r.active = o[t]["active"];
			this.effect_params[r.index] = o[t]["params"]
		}
		this.updateActiveEffects();
		var u = e["layers"];
		for (i in u) {
			if (u.hasOwnProperty(i)) {
				s = this.getLayerBySid(parseInt(i, 10));
				if (!s) continue;
				s.loadFromJSON(u[i])
			}
		}
	};
	cr.layout = e;
	n.prototype.updateActiveEffects = function() {
		this.active_effect_types.length = 0;
		var e, t, n;
		for (e = 0, t = this.effect_types.length; e < t; e++) {
			n = this.effect_types[e];
			if (n.active) this.active_effect_types.push(n)
		}
	};
	n.prototype.getEffectByName = function(e) {
		var t, n, r;
		for (t = 0, n = this.effect_types.length; t < n; t++) {
			r = this.effect_types[t];
			if (r.name === e) return r
		}
		return null
	};
	n.prototype.createInitialInstances = function() {
		var e, n, r, i, s, o, u, a;
		for (e = 0, n = 0, r = this.initial_instances.length; e < r; e++) {
			s = this.initial_instances[e];
			o = this.runtime.types_by_index[s[1]];
			a = this.runtime.typeHasPersistBehavior(o);
			u = true;
			if (!a || this.layout.first_visit) {
				i = this.runtime.createInstanceFromInit(s, this, true);
				t.push(i);
				if (i.type.global) u = false
			}
			if (u) {
				this.initial_instances[n] = this.initial_instances[e];
				n++
			}
		}
		this.initial_instances.length = n;
		this.runtime.ClearDeathRow();
		if (!this.runtime.glwrap && this.effect_types.length) this.blend_mode = this.effect_fallback;
		this.compositeOp = cr.effectToCompositeOp(this.blend_mode);
		if (this.runtime.gl) cr.setGLBlend(this, this.blend_mode, this.runtime.gl)
	};
	n.prototype.updateZIndices = function() {
		if (!this.zindices_stale) return;
		var e, t;
		for (e = 0, t = this.instances.length; e < t; e++) {
			this.instances[e].zindex = e
		}
		this.zindices_stale = false
	};
	n.prototype.getScale = function() {
		return this.getNormalScale() * this.runtime.aspect_scale
	};
	n.prototype.getNormalScale = function() {
		return (this.scale * this.layout.scale - 1) * this.zoomRate + 1
	};
	n.prototype.getAngle = function() {
		if (this.disableAngle) return 0;
		return cr.clamp_angle(this.layout.angle + this.angle)
	};
	n.prototype.draw = function(e) {
		this.render_offscreen = this.forceOwnTexture || this.opacity !== 1 || this.blend_mode !== 0;
		var t = this.runtime.canvas;
		var n = e;
		e.globalAlpha = 1;
		e.globalCompositeOperation = "source-over";
		if (this.render_offscreen) {
			if (!this.runtime.layer_canvas) {
				this.runtime.layer_canvas = document.createElement("canvas");
				t = this.runtime.layer_canvas;
				t.width = this.runtime.width;
				t.height = this.runtime.height;
				this.runtime.layer_ctx = t.getContext("2d");
			}
			t = this.runtime.layer_canvas;
			n = this.runtime.layer_ctx;
			if (t.width !== this.runtime.width) t.width = this.runtime.width;
			if (t.height !== this.runtime.height) t.height = this.runtime.height;
			if (this.transparent) n.clearRect(0, 0, this.runtime.width, this.runtime.height)
		}
		if (!this.transparent) {
			n.fillStyle = "rgb(" + this.background_color[0] + "," + this.background_color[1] + "," + this.background_color[2] + ")";
			n.fillRect(0, 0, this.runtime.width, this.runtime.height)
		}
		n.save();
		this.disableAngle = true;
		var r = this.canvasToLayer(0, 0, true);
		var i = this.canvasToLayer(0, 0, false);
		this.disableAngle = false;
		if (this.runtime.pixel_rounding) {
			r = r + .5 | 0;
			i = i + .5 | 0
		}
		this.rotateViewport(r, i, n);
		var s = this.getScale();
		n.scale(s, s);
		n.translate(-r, -i);
		var o, u, a, f;
		for (o = 0, u = this.instances.length; o < u; o++) {
			a = this.instances[o];
			if (!a.visible || a.width === 0 || a.height === 0) continue;
			a.update_bbox();
			f = a.bbox;
			if (f.right < this.viewLeft || f.bottom < this.viewTop || f.left > this.viewRight || f.top > this.viewBottom) continue;
			n.globalCompositeOperation = a.compositeOp;
			a.draw(n)
		}
		n.restore();
		if (this.render_offscreen) {
			e.globalCompositeOperation = this.compositeOp;
			e.globalAlpha = this.opacity;
			e.drawImage(t, 0, 0)
		}
	};
	n.prototype.rotateViewport = function(e, t, n) {
		var r = this.getScale();
		this.viewLeft = e;
		this.viewTop = t;
		this.viewRight = e + this.runtime.width * (1 / r);
		this.viewBottom = t + this.runtime.height * (1 / r);
		var i = this.getAngle();
		if (i !== 0) {
			if (n) {
				n.translate(this.runtime.width / 2, this.runtime.height / 2);
				n.rotate(-i);
				n.translate(this.runtime.width / -2, this.runtime.height / -2)
			}
			this.tmprect.set(this.viewLeft, this.viewTop, this.viewRight, this.viewBottom);
			this.tmprect.offset((this.viewLeft + this.viewRight) / -2, (this.viewTop + this.viewBottom) / -2);
			this.tmpquad.set_from_rotated_rect(this.tmprect, i);
			this.tmpquad.bounding_box(this.tmprect);
			this.tmprect.offset((this.viewLeft + this.viewRight) / 2, (this.viewTop + this.viewBottom) / 2);
			this.viewLeft = this.tmprect.left;
			this.viewTop = this.tmprect.top;
			this.viewRight = this.tmprect.right;
			this.viewBottom = this.tmprect.bottom
		}
	};
	n.prototype.drawGL = function(e) {
		var t = this.runtime.width;
		var n = this.runtime.height;
		var r = 0;
		var i = 0;
		this.render_offscreen = this.forceOwnTexture || this.opacity !== 1 || this.active_effect_types.length > 0 || this.blend_mode !== 0;
		if (this.render_offscreen) {
			if (!this.runtime.layer_tex) {
				this.runtime.layer_tex = e.createEmptyTexture(this.runtime.width, this.runtime.height, this.runtime.linearSampling)
			}
			if (this.runtime.layer_tex.c2width !== this.runtime.width || this.runtime.layer_tex.c2height !== this.runtime.height) {
				e.deleteTexture(this.runtime.layer_tex);
				this.runtime.layer_tex = e.createEmptyTexture(this.runtime.width, this.runtime.height, this.runtime.linearSampling)
			}
			e.setRenderingToTexture(this.runtime.layer_tex);
			if (this.transparent) e.clear(0, 0, 0, 0)
		}
		if (!this.transparent) {
			e.clear(this.background_color[0] / 255, this.background_color[1] / 255, this.background_color[2] / 255, 1)
		}
		this.disableAngle = true;
		var s = this.canvasToLayer(0, 0, true);
		var o = this.canvasToLayer(0, 0, false);
		this.disableAngle = false;
		if (this.runtime.pixel_rounding) {
			s = s + .5 | 0;
			o = o + .5 | 0
		}
		this.rotateViewport(s, o, null);
		var u = this.getScale();
		e.resetModelView();
		e.scale(u, u);
		e.rotateZ(-this.getAngle());
		e.translate((this.viewLeft + this.viewRight) / -2, (this.viewTop + this.viewBottom) / -2);
		e.updateModelView();
		var a, f, l, c;
		for (a = 0, f = this.instances.length; a < f; a++) {
			l = this.instances[a];
			if (!l.visible || l.width === 0 || l.height === 0) continue;
			l.update_bbox();
			c = l.bbox;
			if (c.right < this.viewLeft || c.bottom < this.viewTop || c.left > this.viewRight || c.top > this.viewBottom) continue;
			if (l.uses_shaders) {
				r = l.active_effect_types[0].shaderindex;
				i = l.active_effect_types[0].index;
				if (l.active_effect_types.length === 1 && !e.programUsesCrossSampling(r) && !e.programExtendsBox(r) && (!l.angle && !l.layer.getAngle() || !e.programUsesDest(r)) && l.opacity === 1 && !l.type.plugin.must_predraw) {
					e.switchProgram(r);
					e.setBlend(l.srcBlend, l.destBlend);
					if (e.programIsAnimated(r)) this.runtime.redraw = true;
					var h = 0,
						p = 0,
						d = 0,
						v = 0;
					if (e.programUsesDest(r)) {
						var c = l.bbox;
						var m = this.layerToCanvas(c.left, c.top, true);
						var g = this.layerToCanvas(c.left, c.top, false);
						var y = this.layerToCanvas(c.right, c.bottom, true);
						var b = this.layerToCanvas(c.right, c.bottom, false);
						h = m / t;
						p = 1 - g / n;
						d = y / t;
						v = 1 - b / n
					}
					e.setProgramParameters(this.render_offscreen ? this.runtime.layer_tex : this.layout.getRenderTarget(), 1 / l.width, 1 / l.height, h, p, d, v, this.getScale(), l.effect_params[i]);
					l.drawGL(e)
				} else {
					this.layout.renderEffectChain(e, this, l, this.render_offscreen ? this.runtime.layer_tex : this.layout.getRenderTarget());
					e.resetModelView();
					e.scale(u, u);
					e.rotateZ(-this.getAngle());
					e.translate((this.viewLeft + this.viewRight) / -2, (this.viewTop + this.viewBottom) / -2);
					e.updateModelView()
				}
			} else {
				e.switchProgram(0);
				e.setBlend(l.srcBlend, l.destBlend);
				l.drawGL(e)
			}
		}
		if (this.render_offscreen) {
			r = this.active_effect_types.length ? this.active_effect_types[0].shaderindex : 0;
			i = this.active_effect_types.length ? this.active_effect_types[0].index : 0;
			if (this.active_effect_types.length === 0 || this.active_effect_types.length === 1 && !e.programUsesCrossSampling(r) && this.opacity === 1) {
				if (this.active_effect_types.length === 1) {
					e.switchProgram(r);
					e.setProgramParameters(this.layout.getRenderTarget(), 1 / this.runtime.width, 1 / this.runtime.height, 0, 0, 1, 1, this.getScale(), this.effect_params[i]);
					if (e.programIsAnimated(r)) this.runtime.redraw = true
				} else e.switchProgram(0);
				e.setRenderingToTexture(this.layout.getRenderTarget());
				e.setOpacity(this.opacity);
				e.setTexture(this.runtime.layer_tex);
				e.setBlend(this.srcBlend, this.destBlend);
				e.resetModelView();
				e.updateModelView();
				var w = this.runtime.width / 2;
				var E = this.runtime.height / 2;
				e.quad(-w, E, w, E, w, -E, -w, -E);
				e.setTexture(null)
			} else {
				this.layout.renderEffectChain(e, this, null, this.layout.getRenderTarget())
			}
		}
	};
	n.prototype.canvasToLayer = function(e, t, n) {
		var r = this.runtime.devicePixelRatio;
		if (this.runtime.isRetina && this.runtime.fullscreen_mode > 0) {
			e *= r;
			t *= r
		}
		var i = this.runtime.original_width / 2;
		var s = this.runtime.original_height / 2;
		var o = (this.layout.scrollX - i) * this.parallaxX + i;
		var u = (this.layout.scrollY - s) * this.parallaxY + s;
		var a = 1 / this.getScale();
		o -= this.runtime.width * a / 2;
		u -= this.runtime.height * a / 2;
		o += e * a;
		u += t * a;
		var f = this.getAngle();
		if (f !== 0) {
			o -= this.layout.scrollX;
			u -= this.layout.scrollY;
			var l = Math.cos(f);
			var c = Math.sin(f);
			var h = o * l - u * c;
			u = u * l + o * c;
			o = h;
			o += this.layout.scrollX;
			u += this.layout.scrollY
		}
		return n ? o : u
	};
	n.prototype.layerToCanvas = function(e, t, n) {
		var r = this.getAngle();
		if (r !== 0) {
			e -= this.layout.scrollX;
			t -= this.layout.scrollY;
			var i = Math.cos(-r);
			var s = Math.sin(-r);
			var o = e * i - t * s;
			t = t * i + e * s;
			e = o;
			e += this.layout.scrollX;
			t += this.layout.scrollY
		}
		var u = this.runtime.original_width / 2;
		var a = this.runtime.original_height / 2;
		var f = (this.layout.scrollX - u) * this.parallaxX + u;
		var l = (this.layout.scrollY - a) * this.parallaxY + a;
		var c = 1 / this.getScale();
		f -= this.runtime.width * c / 2;
		l -= this.runtime.height * c / 2;
		f = (e - f) / c;
		l = (t - l) / c;
		var h = this.runtime.devicePixelRatio;
		if (this.runtime.isRetina && this.runtime.fullscreen_mode > 0) {
			f /= h;
			l /= h
		}
		return n ? f : l
	};
	n.prototype.rotatePt = function(e, t, n) {
		if (this.getAngle() === 0) return n ? e : t;
		var r = this.layerToCanvas(e, t, true);
		var i = this.layerToCanvas(e, t, false);
		this.disableAngle = true;
		var s = this.canvasToLayer(r, i, true);
		var o = this.canvasToLayer(r, i, true);
		this.disableAngle = false;
		return n ? s : o
	};
	n.prototype.saveToJSON = function() {
		var e, t, n;
		var r = {
			s: this.scale,
			a: this.angle,
			vl: this.viewLeft,
			vt: this.viewTop,
			vr: this.viewRight,
			vb: this.viewBottom,
			v: this.visible,
			bc: this.background_color,
			t: this.transparent,
			px: this.parallaxX,
			py: this.parallaxY,
			o: this.opacity,
			zr: this.zoomRate,
			fx: [],
			instances: []
		};
		for (e = 0, t = this.effect_types.length; e < t; e++) {
			n = this.effect_types[e];
			r["fx"].push({
				name: n.name,
				active: n.active,
				params: this.effect_params[n.index]
			})
		}
		return r
	};
	n.prototype.loadFromJSON = function(e) {
		var t, n, i, s, o;
		this.scale = e["s"];
		this.angle = e["a"];
		this.viewLeft = e["vl"];
		this.viewTop = e["vt"];
		this.viewRight = e["vr"];
		this.viewBottom = e["vb"];
		this.visible = e["v"];
		this.background_color = e["bc"];
		this.transparent = e["t"];
		this.parallaxX = e["px"];
		this.parallaxY = e["py"];
		this.opacity = e["o"];
		this.zoomRate = e["zr"];
		var u = e["fx"];
		for (t = 0, n = u.length; t < n; t++) {
			o = this.getEffectByName(u[t]["name"]);
			if (!o) continue;
			o.active = u[t]["active"];
			this.effect_params[o.index] = u[t]["params"]
		}
		this.updateActiveEffects();
		this.instances.sort(r);
		this.zindices_stale = true
	};
	cr.layer = n
})();
(function() {
	function t(e, t) {
		var n, r = e.length;
		switch (r) {
		case 0:
			return true;
		case 1:
			return e[0] === t[0];
		case 2:
			return e[0] === t[0] && e[1] === t[1];
		default:
			for (n = 0; n < r; n++) {
				if (e[n] !== t[n]) return false
			}
			return true
		}
	}
	function n(e, t) {
		return e.index - t.index
	}
	function r(r) {
		var i, s, o, u, a;
		if (r.length === 2) {
			if (r[0].index > r[1].index) {
				u = r[0];
				r[0] = r[1];
				r[1] = u
			}
		} else if (r.length > 2) r.sort(n);
		if (r.length >= e.length) e.length = r.length + 1;
		if (!e[r.length]) e[r.length] = [];
		a = e[r.length];
		for (i = 0, s = a.length; i < s; i++) {
			o = a[i];
			if (t(r, o)) return o
		}
		a.push(r);
		return r
	}
	function i(e, t) {
		this.runtime = e;
		this.triggers = {};
		this.fasttriggers = {};
		this.hasRun = false;
		this.includes = new cr.ObjectSet;
		this.name = t[0];
		var n = t[1];
		this.events = [];
		var r, i;
		for (r = 0, i = n.length; r < i; r++) this.init_event(n[r], null, this.events)
	}
	function s(e) {
		this.type = e;
		this.instances = [];
		this.else_instances = [];
		this.select_all = true
	}
	function o(e, t, n) {
		this.sheet = e;
		this.parent = t;
		this.runtime = e.runtime;
		this.solModifiers = [];
		this.solModifiersIncludingParents = [];
		this.solWriterAfterCnds = false;
		this.group = false;
		this.initially_activated = false;
		this.toplevelevent = false;
		this.toplevelgroup = false;
		this.has_else_block = false;
		this.conditions = [];
		this.actions = [];
		this.subevents = [];
		if (n[1]) {
			this.group_name = n[1][1].toLowerCase();
			this.group = true;
			this.initially_activated = !! n[1][0];
			this.runtime.allGroups.push(this);
			this.runtime.activeGroups[this.group_name.toLowerCase()] = this.initially_activated
		} else {
			this.group_name = "";
			this.group = false;
			this.initially_activated = false
		}
		this.orblock = n[2];
		this.sid = n[4];
		if (!this.group) this.runtime.blocksBySid[this.sid.toString()] = this;
		var r, i;
		var s = n[5];
		for (r = 0, i = s.length; r < i; r++) {
			var o = new cr.condition(this, s[r]);
			o.index = r;
			cr.seal(o);
			this.conditions.push(o);
			this.addSolModifier(o.type)
		}
		var u = n[6];
		for (r = 0, i = u.length; r < i; r++) {
			var a = new cr.action(this, u[r]);
			a.index = r;
			cr.seal(a);
			this.actions.push(a)
		}
		if (n.length === 8) {
			var f = n[7];
			for (r = 0, i = f.length; r < i; r++) this.sheet.init_event(f[r], this, this.subevents)
		}
		this.is_else_block = false;
		if (this.conditions.length) {
			this.is_else_block = this.conditions[0].type == null && this.conditions[0].func == cr.system_object.prototype.cnds.Else
		}
	}
	function u(e, t) {
		var n, r, i;
		if (!e) return;
		if (t.indexOf(e) === -1) t.push(e);
		if (e.is_contained) {
			for (n = 0, r = e.container.length; n < r; n++) {
				i = e.container[n];
				if (e === i) continue;
				if (t.indexOf(i) === -1) t.push(i)
			}
		}
	}
	function a(e, t) {
		this.block = e;
		this.sheet = e.sheet;
		this.runtime = e.runtime;
		this.parameters = [];
		this.results = [];
		this.extra = {};
		this.index = -1;
		this.func = t[1];
		this.trigger = t[3] > 0;
		this.fasttrigger = t[3] === 2;
		this.looping = t[4];
		this.inverted = t[5];
		this.isstatic = t[6];
		this.sid = t[7];
		this.runtime.cndsBySid[this.sid.toString()] = this;
		if (t[0] === -1) {
			this.type = null;
			this.run = this.run_system;
			this.behaviortype = null;
			this.beh_index = -1
		} else {
			this.type = this.runtime.types_by_index[t[0]];
			if (this.isstatic) this.run = this.run_static;
			else this.run = this.run_object;
			if (t[2]) {
				this.behaviortype = this.type.getBehaviorByName(t[2]);
				this.beh_index = this.type.getBehaviorIndexByName(t[2]);
			} else {
				this.behaviortype = null;
				this.beh_index = -1
			}
			if (this.block.parent) this.block.parent.setSolWriterAfterCnds()
		}
		if (this.fasttrigger) this.run = this.run_true;
		if (t.length === 10) {
			var n, r;
			var i = t[9];
			for (n = 0, r = i.length; n < r; n++) {
				var s = new cr.parameter(this, i[n]);
				cr.seal(s);
				this.parameters.push(s)
			}
			this.results.length = i.length
		}
	}
	function f(e, t) {
		this.block = e;
		this.sheet = e.sheet;
		this.runtime = e.runtime;
		this.parameters = [];
		this.results = [];
		this.extra = {};
		this.index = -1;
		this.func = t[1];
		if (t[0] === -1) {
			this.type = null;
			this.run = this.run_system;
			this.behaviortype = null;
			this.beh_index = -1
		} else {
			this.type = this.runtime.types_by_index[t[0]];
			this.run = this.run_object;
			if (t[2]) {
				this.behaviortype = this.type.getBehaviorByName(t[2]);
				this.beh_index = this.type.getBehaviorIndexByName(t[2]);
			} else {
				this.behaviortype = null;
				this.beh_index = -1
			}
		}
		this.sid = t[3];
		this.runtime.actsBySid[this.sid.toString()] = this;
		if (t.length === 6) {
			var n, r;
			var i = t[5];
			for (n = 0, r = i.length; n < r; n++) {
				var s = new cr.parameter(this, i[n]);
				cr.seal(s);
				this.parameters.push(s)
			}
			this.results.length = i.length
		}
	}
	function h(e, t) {
		this.owner = e;
		this.block = e.block;
		this.sheet = e.sheet;
		this.runtime = e.runtime;
		this.type = t[0];
		this.expression = null;
		this.solindex = 0;
		this.combosel = 0;
		this.layout = null;
		this.key = 0;
		this.object = null;
		this.index = 0;
		this.varname = null;
		this.eventvar = null;
		this.fileinfo = null;
		this.subparams = null;
		this.variadicret = null;
		var n, r, i;
		switch (t[0]) {
		case 0:
		case 7:
			this.expression = new cr.expNode(this, t[1]);
			this.solindex = 0;
			this.get = this.get_exp;
			break;
		case 1:
			this.expression = new cr.expNode(this, t[1]);
			this.solindex = 0;
			this.get = this.get_exp_str;
			break;
		case 5:
			this.expression = new cr.expNode(this, t[1]);
			this.solindex = 0;
			this.get = this.get_layer;
			break;
		case 3:
		case 8:
			this.combosel = t[1];
			this.get = this.get_combosel;
			break;
		case 6:
			this.layout = this.runtime.layouts[t[1]];
			this.get = this.get_layout;
			break;
		case 9:
			this.key = t[1];
			this.get = this.get_key;
			break;
		case 4:
			this.object = this.runtime.types_by_index[t[1]];
			this.get = this.get_object;
			this.block.addSolModifier(this.object);
			if (this.owner instanceof cr.action) this.block.setSolWriterAfterCnds();
			else if (this.block.parent) this.block.parent.setSolWriterAfterCnds();
			break;
		case 10:
			this.index = t[1];
			if (e.type.is_family) this.get = this.get_familyvar;
			else this.get = this.get_instvar;
			break;
		case 11:
			this.varname = t[1];
			this.eventvar = null;
			this.get = this.get_eventvar;
			break;
		case 2:
		case 12:
			this.fileinfo = t[1];
			this.get = this.get_audiofile;
			break;
		case 13:
			this.get = this.get_variadic;
			this.subparams = [];
			this.variadicret = [];
			for (n = 1, r = t.length; n < r; n++) {
				i = new cr.parameter(this.owner, t[n]);
				cr.seal(i);
				this.subparams.push(i);
				this.variadicret.push(0)
			}
			break;
		default:
		}
	}
	function p(e, t, n) {
		this.sheet = e;
		this.parent = t;
		this.runtime = e.runtime;
		this.solModifiers = [];
		this.name = n[1];
		this.vartype = n[2];
		this.initial = n[3];
		this.is_static = !! n[4];
		this.is_constant = !! n[5];
		this.sid = n[6];
		this.runtime.varsBySid[this.sid.toString()] = this;
		this.data = this.initial;
		if (this.parent) {
			if (this.is_static || this.is_constant) this.localIndex = -1;
			else this.localIndex = this.runtime.stackLocalCount++;
			this.runtime.all_local_vars.push(this)
		} else {
			this.localIndex = -1;
			this.runtime.all_global_vars.push(this)
		}
	}
	function d(e, t, n) {
		this.sheet = e;
		this.parent = t;
		this.runtime = e.runtime;
		this.solModifiers = [];
		this.include_sheet = null;
		this.include_sheet_name = n[1]
	}
	function v() {
		this.temp_parents_arr = [];
		this.reset(null);
		cr.seal(this)
	}
	var e = [];
	i.prototype.toString = function() {
		return this.name
	};
	i.prototype.init_event = function(e, t, n) {
		switch (e[0]) {
		case 0:
			{
				var r = new cr.eventblock(this, t, e);
				cr.seal(r);
				if (r.orblock) {
					n.push(r);
					var i, s;
					for (i = 0, s = r.conditions.length; i < s; i++) {
						if (r.conditions[i].trigger) this.init_trigger(r, i)
					}
				} else {
					if (r.is_trigger()) this.init_trigger(r, 0);
					else n.push(r)
				}
				break
			};
		case 1:
			{
				var o = new cr.eventvariable(this, t, e);
				cr.seal(o);
				n.push(o);
				break
			};
		case 2:
			{
				var u = new cr.eventinclude(this, t, e);
				cr.seal(u);
				n.push(u);
				break
			};
		default:
		}
	};
	i.prototype.postInit = function() {
		var e, t;
		for (e = 0, t = this.events.length; e < t; e++) {
			this.events[e].postInit(e < t - 1 && this.events[e + 1].is_else_block)
		}
	};
	i.prototype.run = function(e) {
		if (!this.runtime.resuming_breakpoint) {
			this.hasRun = true;
			if (!e) this.runtime.isRunningEvents = true
		}
		var t, n;
		for (t = 0, n = this.events.length; t < n; t++) {
			var r = this.events[t];
			r.run();
			this.runtime.clearSol(r.solModifiers);
			if (!this.runtime.deathRow.isEmpty() || this.runtime.createRow.length) this.runtime.ClearDeathRow()
		}
		if (!e) this.runtime.isRunningEvents = false
	};
	i.prototype.init_trigger = function(e, t) {
		if (!e.orblock) this.runtime.triggers_to_postinit.push(e);
		var n, r;
		var i = e.conditions[t];
		var s;
		if (i.type) s = i.type.name;
		else s = "system";
		var o = i.fasttrigger;
		var u = o ? this.fasttriggers : this.triggers;
		if (!u[s]) u[s] = [];
		var a = u[s];
		var f = i.func;
		if (o) {
			if (!i.parameters.length) return;
			var l = i.parameters[0];
			if (l.type !== 1 || l.expression.type !== 2) {
				return
			}
			var c;
			var h = l.expression.value.toLowerCase();
			var n, r;
			for (n = 0, r = a.length; n < r; n++) {
				if (a[n].method == f) {
					c = a[n].evs;
					if (!c[h]) c[h] = [
						[e, t]
					];
					else c[h].push([e, t]);
					return
				}
			}
			c = {};
			c[h] = [
				[e, t]
			];
			a.push({
				method: f,
				evs: c
			})
		} else {
			for (n = 0, r = a.length; n < r; n++) {
				if (a[n].method == f) {
					a[n].evs.push([e, t]);
					return
				}
			}
			a.push({
				method: f,
				evs: [
					[e, t]
				]
			})
		}
	};
	cr.eventsheet = i;
	s.prototype.hasObjects = function() {
		if (this.select_all) return this.type.instances.length;
		else return this.instances.length
	};
	s.prototype.getObjects = function() {
		if (this.select_all) return this.type.instances;
		else return this.instances
	};
	s.prototype.pick_one = function(e) {
		if (!e) return;
		if (e.runtime.getCurrentEventStack().current_event.orblock) {
			if (this.select_all) {
				this.instances.length = 0;
				cr.shallowAssignArray(this.else_instances, e.type.instances);
				this.select_all = false
			}
			var t = this.else_instances.indexOf(e);
			if (t !== -1) {
				this.instances.push(this.else_instances[t]);
				this.else_instances.splice(t, 1)
			}
		} else {
			this.select_all = false;
			this.instances.length = 1;
			this.instances[0] = e
		}
	};
	cr.selection = s;
	o.prototype.postInit = function(e) {
		var t, n;
		var i = this.parent;
		if (this.group) {
			this.toplevelgroup = true;
			while (i) {
				if (!i.group) {
					this.toplevelgroup = false;
					break
				}
				i = i.parent
			}
		}
		this.toplevelevent = !this.is_trigger() && (!this.parent || this.parent.group && this.parent.toplevelgroup);
		this.has_else_block = !! e;
		this.solModifiersIncludingParents = this.solModifiers.slice(0);
		i = this.parent;
		while (i) {
			for (t = 0, n = i.solModifiers.length; t < n; t++) this.addParentSolModifier(i.solModifiers[t]);
			i = i.parent
		}
		this.solModifiers = r(this.solModifiers);
		this.solModifiersIncludingParents = r(this.solModifiersIncludingParents);
		var t, n;
		for (t = 0, n = this.conditions.length; t < n; t++) this.conditions[t].postInit();
		for (t = 0, n = this.actions.length; t < n; t++) this.actions[t].postInit();
		for (t = 0, n = this.subevents.length; t < n; t++) {
			this.subevents[t].postInit(t < n - 1 && this.subevents[t + 1].is_else_block)
		}
	};
	o.prototype.addSolModifier = function(e) {
		u(e, this.solModifiers)
	};
	o.prototype.addParentSolModifier = function(e) {
		u(e, this.solModifiersIncludingParents)
	};
	o.prototype.setSolWriterAfterCnds = function() {
		this.solWriterAfterCnds = true;
		if (this.parent) this.parent.setSolWriterAfterCnds()
	};
	o.prototype.is_trigger = function() {
		if (!this.conditions.length) return false;
		else return this.conditions[0].trigger
	};
	o.prototype.run = function() {
		var e, t, n = false,
			r;
		var i = this.runtime.getCurrentEventStack();
		i.current_event = this;
		if (!this.is_else_block) i.else_branch_ran = false;
		if (this.orblock) {
			if (this.conditions.length === 0) n = true;
			i.cndindex = 0;
			for (t = this.conditions.length; i.cndindex < t; i.cndindex++) {
				if (this.conditions[i.cndindex].trigger) continue;
				r = this.conditions[i.cndindex].run();
				if (r) n = true
			}
			i.last_event_true = n;
			if (n) this.run_actions_and_subevents()
		} else {
			i.cndindex = 0;
			for (t = this.conditions.length; i.cndindex < t; i.cndindex++) {
				r = this.conditions[i.cndindex].run();
				if (!r) {
					i.last_event_true = false;
					if (this.toplevelevent && (!this.runtime.deathRow.isEmpty() || this.runtime.createRow.length)) this.runtime.ClearDeathRow();
					return
				}
			}
			i.last_event_true = true;
			this.run_actions_and_subevents()
		}
		this.end_run(i)
	};
	o.prototype.end_run = function(e) {
		if (e.last_event_true && this.has_else_block) e.else_branch_ran = true;
		if (this.toplevelevent && (!this.runtime.deathRow.isEmpty() || this.runtime.createRow.length)) this.runtime.ClearDeathRow()
	};
	o.prototype.run_orblocktrigger = function(e) {
		var t = this.runtime.getCurrentEventStack();
		t.current_event = this;
		if (this.conditions[e].run()) {
			this.run_actions_and_subevents()
		}
	};
	o.prototype.run_actions_and_subevents = function() {
		var e = this.runtime.getCurrentEventStack();
		var t;
		for (e.actindex = 0, t = this.actions.length; e.actindex < t; e.actindex++) {
			if (this.actions[e.actindex].run()) return
		}
		this.run_subevents()
	};
	o.prototype.resume_actions_and_subevents = function() {
		var e = this.runtime.getCurrentEventStack();
		var t;
		for (t = this.actions.length; e.actindex < t; e.actindex++) {
			if (this.actions[e.actindex].run()) return
		}
		this.run_subevents()
	};
	o.prototype.run_subevents = function() {
		if (!this.subevents.length) return;
		var e, t, n, r;
		var i = this.subevents.length - 1;
		this.runtime.pushEventStack(this);
		if (this.solWriterAfterCnds) {
			for (e = 0, t = this.subevents.length; e < t; e++) {
				n = this.subevents[e];
				r = !this.toplevelgroup || !this.group && e < i;
				if (r) this.runtime.pushCopySol(n.solModifiers);
				n.run();
				if (r) this.runtime.popSol(n.solModifiers);
				else this.runtime.clearSol(n.solModifiers)
			}
		} else {
			for (e = 0, t = this.subevents.length; e < t; e++) {
				this.subevents[e].run()
			}
		}
		this.runtime.popEventStack()
	};
	o.prototype.run_pretrigger = function() {
		var e = this.runtime.getCurrentEventStack();
		e.current_event = this;
		var t = false;
		var n, r;
		for (e.cndindex = 0, r = this.conditions.length; e.cndindex < r; e.cndindex++) {
			if (this.conditions[e.cndindex].run()) t = true;
			else if (!this.orblock) return false
		}
		return this.orblock ? t : true
	};
	o.prototype.retrigger = function() {
		this.runtime.execcount++;
		var e = this.runtime.getCurrentEventStack().cndindex;
		var t;
		var n = this.runtime.pushEventStack(this);
		if (!this.orblock) {
			for (n.cndindex = e + 1, t = this.conditions.length; n.cndindex < t; n.cndindex++) {
				if (!this.conditions[n.cndindex].run()) {
					this.runtime.popEventStack();
					return false
				}
			}
		}
		this.run_actions_and_subevents();
		this.runtime.popEventStack();
		return true
	};
	o.prototype.isFirstConditionOfType = function(e) {
		var t = e.index;
		if (t === 0) return true;
		--t;
		for (; t >= 0; --t) {
			if (this.conditions[t].type === e.type) return false
		}
		return true
	};
	cr.eventblock = o;
	a.prototype.postInit = function() {
		var e, t;
		for (e = 0, t = this.parameters.length; e < t; e++) this.parameters[e].postInit()
	};
	a.prototype.run_true = function() {
		return true
	};
	a.prototype.run_system = function() {
		var e, t;
		for (e = 0, t = this.parameters.length; e < t; e++) this.results[e] = this.parameters[e].get();
		return cr.xor(this.func.apply(this.runtime.system, this.results), this.inverted)
	};
	a.prototype.run_static = function() {
		var e, t;
		for (e = 0, t = this.parameters.length; e < t; e++) this.results[e] = this.parameters[e].get(e);
		var n = this.func.apply(this.behaviortype ? this.behaviortype : this.type, this.results);
		this.type.applySolToContainer();
		return n
	};
	a.prototype.run_object = function() {
		var e, t, n, r, i, s, o, u, a;
		var f = this.type.getCurrentSol();
		var l = this.block.orblock && !this.trigger;
		var c = 0;
		var h = this.type.is_contained;
		if (f.select_all) {
			f.instances.length = 0;
			f.else_instances.length = 0;
			for (e = 0, n = this.type.instances.length; e < n; e++) {
				o = this.type.instances[e];
				for (t = 0, r = this.parameters.length; t < r; t++) this.results[t] = this.parameters[t].get(e);
				if (this.beh_index > -1) {
					if (this.type.is_family) {
						c = o.type.family_beh_map[this.type.family_index]
					}
					i = this.func.apply(o.behavior_insts[this.beh_index + c], this.results)
				} else i = this.func.apply(o, this.results);
				s = cr.xor(i, this.inverted);
				if (s) f.instances.push(o);
				else if (l) f.else_instances.push(o)
			}
			if (this.type.finish) this.type.finish(true);
			f.select_all = false;
			this.type.applySolToContainer();
			return f.hasObjects()
		} else {
			var p = 0;
			var d = l && !this.block.isFirstConditionOfType(this);
			var v = d ? f.else_instances : f.instances;
			var m = false;
			for (e = 0, n = v.length; e < n; e++) {
				o = v[e];
				for (t = 0, r = this.parameters.length; t < r; t++) this.results[t] = this.parameters[t].get(e);
				if (this.beh_index > -1) {
					if (this.type.is_family) {
						c = o.type.family_beh_map[this.type.family_index]
					}
					i = this.func.apply(o.behavior_insts[this.beh_index + c], this.results)
				} else i = this.func.apply(o, this.results);
				if (cr.xor(i, this.inverted)) {
					m = true;
					if (d) {
						f.instances.push(o);
						if (h) {
							for (t = 0, r = o.siblings.length; t < r; t++) {
								u = o.siblings[t];
								u.type.getCurrentSol().instances.push(u)
							}
						}
					} else {
						v[p] = o;
						if (h) {
							for (t = 0, r = o.siblings.length; t < r; t++) {
								u = o.siblings[t];
								u.type.getCurrentSol().instances[p] = u
							}
						}
						p++
					}
				} else {
					if (d) {
						v[p] = o;
						if (h) {
							for (t = 0, r = o.siblings.length; t < r; t++) {
								u = o.siblings[t];
								u.type.getCurrentSol().else_instances[p] = u
							}
						}
						p++
					} else if (l) {
						f.else_instances.push(o);
						if (h) {
							for (t = 0, r = o.siblings.length; t < r; t++) {
								u = o.siblings[t];
								u.type.getCurrentSol().else_instances.push(u)
							}
						}
					}
				}
			}
			v.length = p;
			if (h) {
				for (e = 0, n = this.type.container.length; e < n; e++) {
					a = this.type.container[e].getCurrentSol();
					if (d) a.else_instances.length = p;
					else a.instances.length = p
				}
			}
			var g = m;
			if (d && !m) {
				for (e = 0, n = f.instances.length; e < n; e++) {
					o = f.instances[e];
					for (t = 0, r = this.parameters.length; t < r; t++) this.results[t] = this.parameters[t].get(e);
					if (this.beh_index > -1) i = this.func.apply(o.behavior_insts[this.beh_index], this.results);
					else i = this.func.apply(o, this.results);
					if (cr.xor(i, this.inverted)) {
						m = true;
						break
					}
				}
			}
			if (this.type.finish) this.type.finish(g || l);
			return l ? m : f.hasObjects()
		}
	};
	cr.condition = a;
	f.prototype.postInit = function() {
		var e, t;
		for (e = 0, t = this.parameters.length; e < t; e++) this.parameters[e].postInit()
	};
	f.prototype.run_system = function() {
		var e, t;
		for (e = 0, t = this.parameters.length; e < t; e++) this.results[e] = this.parameters[e].get();
		return this.func.apply(this.runtime.system, this.results)
	};
	f.prototype.run_object = function() {
		var e = this.type.getCurrentSol().getObjects();
		var t, n, r, i, s;
		for (t = 0, r = e.length; t < r; t++) {
			s = e[t];
			for (n = 0, i = this.parameters.length; n < i; n++) this.results[n] = this.parameters[n].get(t);
			if (this.beh_index > -1) {
				var o = 0;
				if (this.type.is_family) {
					o = s.type.family_beh_map[this.type.family_index]
				}
				this.func.apply(s.behavior_insts[this.beh_index + o], this.results)
			} else this.func.apply(s, this.results)
		}
		return false
	};
	cr.action = f;
	var l = [];
	var c = -1;
	h.prototype.postInit = function() {
		var e, t;
		if (this.type === 11) {
			this.eventvar = this.runtime.getEventVariableByName(this.varname, this.block.parent);
		} else if (this.type === 13) {
			for (e = 0, t = this.subparams.length; e < t; e++) this.subparams[e].postInit()
		}
		if (this.expression) this.expression.postInit()
	};
	h.prototype.pushTempValue = function() {
		c++;
		if (l.length === c) l.push(new cr.expvalue);
		return l[c]
	};
	h.prototype.popTempValue = function() {
		c--
	};
	h.prototype.get_exp = function(e) {
		this.solindex = e || 0;
		var t = this.pushTempValue();
		this.expression.get(t);
		this.popTempValue();
		return t.data
	};
	h.prototype.get_exp_str = function(e) {
		this.solindex = e || 0;
		var t = this.pushTempValue();
		this.expression.get(t);
		this.popTempValue();
		if (cr.is_string(t.data)) return t.data;
		else return ""
	};
	h.prototype.get_object = function() {
		return this.object
	};
	h.prototype.get_combosel = function() {
		return this.combosel
	};
	h.prototype.get_layer = function(e) {
		this.solindex = e || 0;
		var t = this.pushTempValue();
		this.expression.get(t);
		this.popTempValue();
		if (t.is_number()) return this.runtime.getLayerByNumber(t.data);
		else return this.runtime.getLayerByName(t.data)
	};
	h.prototype.get_layout = function() {
		return this.layout
	};
	h.prototype.get_key = function() {
		return this.key
	};
	h.prototype.get_instvar = function() {
		return this.index
	};
	h.prototype.get_familyvar = function(e) {
		var t = this.owner.type;
		var n = null;
		var r = t.getCurrentSol();
		var i = r.getObjects();
		if (i.length) n = i[e % i.length].type;
		else {
			n = r.else_instances[e % r.else_instances.length].type
		}
		return this.index + n.family_var_map[t.family_index]
	};
	h.prototype.get_eventvar = function() {
		return this.eventvar
	};
	h.prototype.get_audiofile = function() {
		return this.fileinfo
	};
	h.prototype.get_variadic = function() {
		var e, t;
		for (e = 0, t = this.subparams.length; e < t; e++) {
			this.variadicret[e] = this.subparams[e].get()
		}
		return this.variadicret
	};
	cr.parameter = h;
	p.prototype.postInit = function() {
		this.solModifiers = r(this.solModifiers)
	};
	p.prototype.setValue = function(e) {
		var t = this.runtime.getCurrentLocalVarStack();
		if (!this.parent || this.is_static || !t) this.data = e;
		else {
			if (this.localIndex >= t.length) t.length = this.localIndex + 1;
			t[this.localIndex] = e
		}
	};
	p.prototype.getValue = function() {
		var e = this.runtime.getCurrentLocalVarStack();
		if (!this.parent || this.is_static || !e || this.is_constant) return this.data;
		else {
			if (this.localIndex >= e.length) {
				return this.initial
			}
			if (typeof e[this.localIndex] === "undefined") {
				return this.initial
			}
			return e[this.localIndex]
		}
	};
	p.prototype.run = function() {
		if (this.parent && !this.is_static && !this.is_constant) this.setValue(this.initial)
	};
	cr.eventvariable = p;
	d.prototype.toString = function() {
		return "include:" + this.include_sheet.toString()
	};
	d.prototype.postInit = function() {
		this.include_sheet = this.runtime.eventsheets[this.include_sheet_name];
		this.sheet.includes.add(this);
		this.solModifiers = r(this.solModifiers)
	};
	d.prototype.run = function() {
		if (this.parent) this.runtime.pushCleanSol(this.runtime.types_by_index);
		if (!this.include_sheet.hasRun) this.include_sheet.run(true);
		if (this.parent) this.runtime.popSol(this.runtime.types_by_index)
	};
	d.prototype.isActive = function() {
		var e = this.parent;
		while (e) {
			if (e.group) {
				if (!this.runtime.activeGroups[e.group_name.toLowerCase()]) return false
			}
			e = e.parent
		}
		return true
	};
	cr.eventinclude = d;
	v.prototype.reset = function(e) {
		this.current_event = e;
		this.cndindex = 0;
		this.actindex = 0;
		this.temp_parents_arr.length = 0;
		this.last_event_true = false;
		this.else_branch_ran = false;
		this.any_true_state = false
	};
	v.prototype.isModifierAfterCnds = function() {
		if (this.current_event.solWriterAfterCnds) return true;
		if (this.cndindex < this.current_event.conditions.length - 1) return !!this.current_event.solModifiers.length;
		return false
	};
	cr.eventStackFrame = v
})();
(function() {
	function e(e, t) {
		this.owner = e;
		this.runtime = e.runtime;
		this.type = t[0];
		this.get = [this.eval_int, this.eval_float, this.eval_string, this.eval_unaryminus, this.eval_add, this.eval_subtract, this.eval_multiply, this.eval_divide, this.eval_mod, this.eval_power, this.eval_and, this.eval_or, this.eval_equal, this.eval_notequal, this.eval_less, this.eval_lessequal, this.eval_greater, this.eval_greaterequal, this.eval_conditional, this.eval_system_exp, this.eval_object_behavior_exp, this.eval_instvar_exp, this.eval_object_behavior_exp, this.eval_eventvar_exp][this.type];
		var n = null;
		this.value = null;
		this.first = null;
		this.second = null;
		this.third = null;
		this.func = null;
		this.results = null;
		this.parameters = null;
		this.object_type = null;
		this.beh_index = -1;
		this.instance_expr = null;
		this.varindex = -1;
		this.behavior_type = null;
		this.varname = null;
		this.eventvar = null;
		this.return_string = false;
		switch (this.type) {
		case 0:
		case 1:
		case 2:
			this.value = t[1];
			break;
		case 3:
			this.first = new cr.expNode(e, t[1]);
			break;
		case 18:
			this.first = new cr.expNode(e, t[1]);
			this.second = new cr.expNode(e, t[2]);
			this.third = new cr.expNode(e, t[3]);
			break;
		case 19:
			this.func = t[1];
			this.results = [];
			this.parameters = [];
			if (t.length === 3) {
				n = t[2];
				this.results.length = n.length + 1
			} else this.results.length = 1;
			break;
		case 20:
			this.object_type = this.runtime.types_by_index[t[1]];
			this.beh_index = -1;
			this.func = t[2];
			this.return_string = t[3];
			if (t[4]) this.instance_expr = new cr.expNode(e, t[4]);
			else this.instance_expr = null;
			this.results = [];
			this.parameters = [];
			if (t.length === 6) {
				n = t[5];
				this.results.length = n.length + 1
			} else this.results.length = 1;
			break;
		case 21:
			this.object_type = this.runtime.types_by_index[t[1]];
			this.return_string = t[2];
			if (t[3]) this.instance_expr = new cr.expNode(e, t[3]);
			else this.instance_expr = null;
			this.varindex = t[4];
			break;
		case 22:
			this.object_type = this.runtime.types_by_index[t[1]];
			this.behavior_type = this.object_type.getBehaviorByName(t[2]);
			this.beh_index = this.object_type.getBehaviorIndexByName(t[2]);
			this.func = t[3];
			this.return_string = t[4];
			if (t[5]) this.instance_expr = new cr.expNode(e, t[5]);
			else this.instance_expr = null;
			this.results = [];
			this.parameters = [];
			if (t.length === 7) {
				n = t[6];
				this.results.length = n.length + 1
			} else this.results.length = 1;
			break;
		case 23:
			this.varname = t[1];
			this.eventvar = null;
			break
		}
		if (this.type >= 4 && this.type <= 17) {
			this.first = new cr.expNode(e, t[1]);
			this.second = new cr.expNode(e, t[2])
		}
		if (n) {
			var r, i;
			for (r = 0, i = n.length; r < i; r++) this.parameters.push(new cr.expNode(e, n[r]))
		}
		cr.seal(this)
	}
	function t(e, t) {
		this.type = e || cr.exptype.Integer;
		this.data = t || 0;
		this.object_class = null;
		if (this.type == cr.exptype.Integer) this.data = Math.floor(this.data);
		cr.seal(this)
	}
	e.prototype.postInit = function() {
		if (this.type === 23) {
			this.eventvar = this.owner.runtime.getEventVariableByName(this.varname, this.owner.block.parent);
		}
		if (this.first) this.first.postInit();
		if (this.second) this.second.postInit();
		if (this.third) this.third.postInit();
		if (this.instance_expr) this.instance_expr.postInit();
		if (this.parameters) {
			var e, t;
			for (e = 0, t = this.parameters.length; e < t; e++) this.parameters[e].postInit()
		}
	};
	e.prototype.eval_system_exp = function(e) {
		this.results[0] = e;
		var t = this.owner.pushTempValue();
		var n, r;
		for (n = 0, r = this.parameters.length; n < r; n++) {
			this.parameters[n].get(t);
			this.results[n + 1] = t.data
		}
		this.owner.popTempValue();
		this.func.apply(this.runtime.system, this.results)
	};
	e.prototype.eval_object_behavior_exp = function(e) {
		var t = this.object_type.getCurrentSol();
		var n = t.getObjects();
		if (!n.length) {
			if (t.else_instances.length) n = t.else_instances;
			else {
				if (this.return_string) e.set_string("");
				else e.set_int(0);
				return
			}
		}
		this.results[0] = e;
		e.object_class = this.object_type;
		var r = this.owner.pushTempValue();
		var i, s;
		for (i = 0, s = this.parameters.length; i < s; i++) {
			this.parameters[i].get(r);
			this.results[i + 1] = r.data
		}
		var o = this.owner.solindex;
		if (this.instance_expr) {
			this.instance_expr.get(r);
			if (r.is_number()) {
				o = r.data;
				n = this.object_type.instances
			}
		}
		this.owner.popTempValue();
		o %= n.length;
		if (o < 0) o += n.length;
		var u;
		var a = n[o];
		if (this.beh_index > -1) {
			var f = 0;
			if (this.object_type.is_family) {
				f = a.type.family_beh_map[this.object_type.family_index]
			}
			u = this.func.apply(a.behavior_insts[this.beh_index + f], this.results)
		} else u = this.func.apply(a, this.results);
	};
	e.prototype.eval_instvar_exp = function(e) {
		var t = this.object_type.getCurrentSol();
		var n = t.getObjects();
		if (!n.length) {
			if (t.else_instances.length) n = t.else_instances;
			else {
				if (this.return_string) e.set_string("");
				else e.set_int(0);
				return
			}
		}
		var r = this.owner.solindex;
		if (this.instance_expr) {
			var i = this.owner.pushTempValue();
			this.instance_expr.get(i);
			if (i.is_number()) {
				r = i.data;
				var s = this.object_type.instances;
				r %= s.length;
				if (r < 0) r += s.length;
				var o = s[r].instance_vars[this.varindex];
				if (cr.is_string(o)) e.set_string(o);
				else e.set_float(o);
				this.owner.popTempValue();
				return
			}
			this.owner.popTempValue()
		}
		r %= n.length;
		if (r < 0) r += n.length;
		var u = n[r];
		var a = 0;
		if (this.object_type.is_family) {
			a = u.type.family_var_map[this.object_type.family_index]
		}
		var o = u.instance_vars[this.varindex + a];
		if (cr.is_string(o)) e.set_string(o);
		else e.set_float(o)
	};
	e.prototype.eval_int = function(e) {
		e.type = cr.exptype.Integer;
		e.data = this.value
	};
	e.prototype.eval_float = function(e) {
		e.type = cr.exptype.Float;
		e.data = this.value
	};
	e.prototype.eval_string = function(e) {
		e.type = cr.exptype.String;
		e.data = this.value
	};
	e.prototype.eval_unaryminus = function(e) {
		this.first.get(e);
		if (e.is_number()) e.data = -e.data
	};
	e.prototype.eval_add = function(e) {
		this.first.get(e);
		var t = this.owner.pushTempValue();
		this.second.get(t);
		if (e.is_number() && t.is_number()) {
			e.data += t.data;
			if (t.is_float()) e.make_float()
		}
		this.owner.popTempValue()
	};
	e.prototype.eval_subtract = function(e) {
		this.first.get(e);
		var t = this.owner.pushTempValue();
		this.second.get(t);
		if (e.is_number() && t.is_number()) {
			e.data -= t.data;
			if (t.is_float()) e.make_float()
		}
		this.owner.popTempValue()
	};
	e.prototype.eval_multiply = function(e) {
		this.first.get(e);
		var t = this.owner.pushTempValue();
		this.second.get(t);
		if (e.is_number() && t.is_number()) {
			e.data *= t.data;
			if (t.is_float()) e.make_float()
		}
		this.owner.popTempValue()
	};
	e.prototype.eval_divide = function(e) {
		this.first.get(e);
		var t = this.owner.pushTempValue();
		this.second.get(t);
		if (e.is_number() && t.is_number()) {
			e.data /= t.data;
			e.make_float()
		}
		this.owner.popTempValue()
	};
	e.prototype.eval_mod = function(e) {
		this.first.get(e);
		var t = this.owner.pushTempValue();
		this.second.get(t);
		if (e.is_number() && t.is_number()) {
			e.data %= t.data;
			if (t.is_float()) e.make_float()
		}
		this.owner.popTempValue()
	};
	e.prototype.eval_power = function(e) {
		this.first.get(e);
		var t = this.owner.pushTempValue();
		this.second.get(t);
		if (e.is_number() && t.is_number()) {
			e.data = Math.pow(e.data, t.data);
			if (t.is_float()) e.make_float()
		}
		this.owner.popTempValue()
	};
	e.prototype.eval_and = function(e) {
		this.first.get(e);
		var t = this.owner.pushTempValue();
		this.second.get(t);
		if (e.is_number()) {
			if (t.is_string()) {
				e.set_string(e.data.toString() + t.data)
			} else {
				if (e.data && t.data) e.set_int(1);
				else e.set_int(0)
			}
		} else if (e.is_string()) {
			if (t.is_string()) e.data += t.data;
			else {
				e.data += (Math.round(t.data * 1e10) / 1e10).toString()
			}
		}
		this.owner.popTempValue()
	};
	e.prototype.eval_or = function(e) {
		this.first.get(e);
		var t = this.owner.pushTempValue();
		this.second.get(t);
		if (e.is_number() && t.is_number()) {
			if (e.data || t.data) e.set_int(1);
			else e.set_int(0)
		}
		this.owner.popTempValue()
	};
	e.prototype.eval_conditional = function(e) {
		this.first.get(e);
		if (e.data) this.second.get(e);
		else this.third.get(e)
	};
	e.prototype.eval_equal = function(e) {
		this.first.get(e);
		var t = this.owner.pushTempValue();
		this.second.get(t);
		e.set_int(e.data === t.data ? 1 : 0);
		this.owner.popTempValue()
	};
	e.prototype.eval_notequal = function(e) {
		this.first.get(e);
		var t = this.owner.pushTempValue();
		this.second.get(t);
		e.set_int(e.data !== t.data ? 1 : 0);
		this.owner.popTempValue()
	};
	e.prototype.eval_less = function(e) {
		this.first.get(e);
		var t = this.owner.pushTempValue();
		this.second.get(t);
		e.set_int(e.data < t.data ? 1 : 0);
		this.owner.popTempValue()
	};
	e.prototype.eval_lessequal = function(e) {
		this.first.get(e);
		var t = this.owner.pushTempValue();
		this.second.get(t);
		e.set_int(e.data <= t.data ? 1 : 0);
		this.owner.popTempValue()
	};
	e.prototype.eval_greater = function(e) {
		this.first.get(e);
		var t = this.owner.pushTempValue();
		this.second.get(t);
		e.set_int(e.data > t.data ? 1 : 0);
		this.owner.popTempValue()
	};
	e.prototype.eval_greaterequal = function(e) {
		this.first.get(e);
		var t = this.owner.pushTempValue();
		this.second.get(t);
		e.set_int(e.data >= t.data ? 1 : 0);
		this.owner.popTempValue()
	};
	e.prototype.eval_eventvar_exp = function(e) {
		var t = this.eventvar.getValue();
		if (cr.is_number(t)) e.set_float(t);
		else e.set_string(t)
	};
	cr.expNode = e;
	t.prototype.is_int = function() {
		return this.type === cr.exptype.Integer
	};
	t.prototype.is_float = function() {
		return this.type === cr.exptype.Float
	};
	t.prototype.is_number = function() {
		return this.type === cr.exptype.Integer || this.type === cr.exptype.Float
	};
	t.prototype.is_string = function() {
		return this.type === cr.exptype.String
	};
	t.prototype.make_int = function() {
		if (!this.is_int()) {
			if (this.is_float()) this.data = Math.floor(this.data);
			else if (this.is_string()) this.data = parseInt(this.data, 10);
			this.type = cr.exptype.Integer
		}
	};
	t.prototype.make_float = function() {
		if (!this.is_float()) {
			if (this.is_string()) this.data = parseFloat(this.data);
			this.type = cr.exptype.Float
		}
	};
	t.prototype.make_string = function() {
		if (!this.is_string()) {
			this.data = this.data.toString();
			this.type = cr.exptype.String
		}
	};
	t.prototype.set_int = function(e) {
		this.type = cr.exptype.Integer;
		this.data = Math.floor(e)
	};
	t.prototype.set_float = function(e) {
		this.type = cr.exptype.Float;
		this.data = e
	};
	t.prototype.set_string = function(e) {
		this.type = cr.exptype.String;
		this.data = e
	};
	t.prototype.set_any = function(e) {
		if (cr.is_number(e)) {
			this.type = cr.exptype.Float;
			this.data = e
		} else if (cr.is_string(e)) {
			this.type = cr.exptype.String;
			this.data = e.toString()
		} else {
			this.type = cr.exptype.Integer;
			this.data = 0
		}
	};
	cr.expvalue = t;
	cr.exptype = {
		Integer: 0,
		Float: 1,
		String: 2
	}
})();
cr.system_object = function(e) {
	this.runtime = e;
	this.waits = []
};
cr.system_object.prototype.saveToJSON = function() {
	var e = {};
	var t, n, r, i, s, o, u, a;
	e["waits"] = [];
	var f = e["waits"];
	var l;
	for (t = 0, n = this.waits.length; t < n; t++) {
		o = this.waits[t];
		l = {
			t: o.time,
			ev: o.ev.sid,
			sm: [],
			sols: {}
		};
		if (o.ev.actions[o.actindex]) l["act"] = o.ev.actions[o.actindex].sid;
		for (r = 0, i = o.solModifiers.length; r < i; r++) l["sm"].push(o.solModifiers[r].sid);
		for (s in o.sols) {
			if (o.sols.hasOwnProperty(s)) {
				u = this.runtime.types_by_index[parseInt(s, 10)];
				a = {
					sa: o.sols[s].sa,
					insts: []
				};
				for (r = 0, i = o.sols[s].insts.length; r < i; r++) a["insts"].push(o.sols[s].insts[r].uid);
				l["sols"][u.sid.toString()] = a
			}
		}
		f.push(l)
	}
	return e
};
cr.system_object.prototype.loadFromJSON = function(e) {
	var t = e["waits"];
	var n, r, i, s, o, u, a, f, l, c, h, p, d;
	this.waits.length = 0;
	for (n = 0, r = t.length; n < r; n++) {
		u = t[n];
		f = this.runtime.blocksBySid[u["ev"].toString()];
		if (!f) continue;
		l = -1;
		for (i = 0, s = f.actions.length; i < s; i++) {
			if (f.actions[i].sid === u["act"]) {
				l = i;
				break
			}
		}
		if (l === -1) continue;
		a = {};
		a.sols = {};
		a.solModifiers = [];
		a.deleteme = false;
		a.time = u["t"];
		a.ev = f;
		a.actindex = l;
		for (i = 0, s = u["sm"].length; i < s; i++) {
			c = this.runtime.getObjectTypeBySid(u["sm"][i]);
			if (c) a.solModifiers.push(c)
		}
		for (o in u["sols"]) {
			if (u["sols"].hasOwnProperty(o)) {
				c = this.runtime.getObjectTypeBySid(parseInt(o, 10));
				if (!c) continue;
				h = u["sols"][o];
				p = {
					sa: h["sa"],
					insts: []
				};
				for (i = 0, s = h["insts"].length; i < s; i++) {
					d = this.runtime.getObjectByUID(h["insts"][i]);
					if (d) p.insts.push(d)
				}
				a.sols[c.index.toString()] = p
			}
		}
		this.waits.push(a)
	}
};
(function() {
	function t() {}
	function i(e, t) {
		var n = e.extra.c2_foreachordered_val;
		var r = t.extra.c2_foreachordered_val;
		if (cr.is_number(n) && cr.is_number(r)) return n - r;
		else {
			n = "" + n;
			r = "" + r;
			if (n < r) return -1;
			else if (n > r) return 1;
			else return 0
		}
	}
	function a(e, t) {
		if (!s || e !== o || t !== u) {
			s = new RegExp(e, t);
			o = e;
			u = t
		}
		s.lastIndex = 0;
		return s
	}
	function l() {}
	function h() {
		var e;
		if (c.length) e = c.pop();
		else {
			e = {};
			e.sols = {};
			e.solModifiers = []
		}
		e.deleteme = false;
		return e
	}
	function p(e) {
		cr.wipe(e.sols);
		e.solModifiers.length = 0;
		c.push(e)
	}
	function v() {
		var e;
		if (d.length) e = d.pop();
		else {
			e = {};
			e.insts = []
		}
		e.sa = false;
		return e
	}
	function m(e) {
		e.insts.length = 0;
		d.push(e)
	}
	function g() {}
	function S(e, t, n) {
		if (e === b && t === w && n === E) return;
		var r = a(t, n);
		y = e.match(r);
		b = e;
		w = t;
		E = n
	}
	var e = cr.system_object.prototype;
	t.prototype.EveryTick = function() {
		return true
	};
	t.prototype.OnLayoutStart = function() {
		return true
	};
	t.prototype.OnLayoutEnd = function() {
		return true
	};
	t.prototype.Compare = function(e, t, n) {
		return cr.do_cmp(e, t, n)
	};
	t.prototype.CompareTime = function(e, t) {
		var n = this.runtime.kahanTime.sum;
		if (e === 0) {
			var r = this.runtime.getCurrentCondition();
			if (!r.extra.CompareTime_executed) {
				if (n >= t) {
					r.extra.CompareTime_executed = true;
					return true
				}
			}
			return false
		}
		return cr.do_cmp(n, e, t)
	};
	t.prototype.LayerVisible = function(e) {
		if (!e) return false;
		else return e.visible
	};
	t.prototype.LayerCmpOpacity = function(e, t, n) {
		if (!e) return false;
		return cr.do_cmp(e.opacity * 100, t, n)
	};
	t.prototype.Repeat = function(e) {
		var t = this.runtime.getCurrentEventStack();
		var n = t.current_event;
		var r = t.isModifierAfterCnds();
		var i = this.runtime.pushLoopStack();
		var s;
		if (r) {
			for (s = 0; s < e && !i.stopped; s++) {
				this.runtime.pushCopySol(n.solModifiers);
				i.index = s;
				n.retrigger();
				this.runtime.popSol(n.solModifiers)
			}
		} else {
			for (s = 0; s < e && !i.stopped; s++) {
				i.index = s;
				n.retrigger()
			}
		}
		this.runtime.popLoopStack();
		return false
	};
	t.prototype.While = function(e) {
		var t = this.runtime.getCurrentEventStack();
		var n = t.current_event;
		var r = t.isModifierAfterCnds();
		var i = this.runtime.pushLoopStack();
		var s;
		if (r) {
			for (s = 0; !i.stopped; s++) {
				this.runtime.pushCopySol(n.solModifiers);
				i.index = s;
				if (!n.retrigger()) i.stopped = true;
				this.runtime.popSol(n.solModifiers)
			}
		} else {
			for (s = 0; !i.stopped; s++) {
				i.index = s;
				if (!n.retrigger()) i.stopped = true
			}
		}
		this.runtime.popLoopStack();
		return false
	};
	t.prototype.For = function(e, t, n) {
		var r = this.runtime.getCurrentEventStack();
		var i = r.current_event;
		var s = r.isModifierAfterCnds();
		var o = this.runtime.pushLoopStack(e);
		var u;
		if (n < t) {
			if (s) {
				for (u = t; u >= n && !o.stopped; --u) {
					this.runtime.pushCopySol(i.solModifiers);
					o.index = u;
					i.retrigger();
					this.runtime.popSol(i.solModifiers)
				}
			} else {
				for (u = t; u >= n && !o.stopped; --u) {
					o.index = u;
					i.retrigger()
				}
			}
		} else {
			if (s) {
				for (u = t; u <= n && !o.stopped; ++u) {
					this.runtime.pushCopySol(i.solModifiers);
					o.index = u;
					i.retrigger();
					this.runtime.popSol(i.solModifiers)
				}
			} else {
				for (u = t; u <= n && !o.stopped; ++u) {
					o.index = u;
					i.retrigger()
				}
			}
		}
		this.runtime.popLoopStack();
		return false
	};
	var n = [];
	var r = -1;
	t.prototype.ForEach = function(e) {
		var t = e.getCurrentSol();
		r++;
		if (n.length === r) n.push([]);
		var i = n[r];
		cr.shallowAssignArray(i, t.getObjects());
		var s = this.runtime.getCurrentEventStack();
		var o = s.current_event;
		var u = s.isModifierAfterCnds();
		var a = this.runtime.pushLoopStack();
		var f, l, c, h, p, d, v;
		var m = e.is_contained;
		if (u) {
			for (f = 0, l = i.length; f < l && !a.stopped; f++) {
				this.runtime.pushCopySol(o.solModifiers);
				p = i[f];
				t = e.getCurrentSol();
				t.select_all = false;
				t.instances.length = 1;
				t.instances[0] = p;
				if (m) {
					for (c = 0, h = p.siblings.length; c < h; c++) {
						d = p.siblings[c];
						v = d.type.getCurrentSol();
						v.select_all = false;
						v.instances.length = 1;
						v.instances[0] = d
					}
				}
				a.index = f;
				o.retrigger();
				this.runtime.popSol(o.solModifiers)
			}
		} else {
			t.select_all = false;
			t.instances.length = 1;
			for (f = 0, l = i.length; f < l && !a.stopped; f++) {
				p = i[f];
				t.instances[0] = p;
				if (m) {
					for (c = 0, h = p.siblings.length; c < h; c++) {
						d = p.siblings[c];
						v = d.type.getCurrentSol();
						v.select_all = false;
						v.instances.length = 1;
						v.instances[0] = d
					}
				}
				a.index = f;
				o.retrigger()
			}
		}
		i.length = 0;
		this.runtime.popLoopStack();
		r--;
		return false
	};
	t.prototype.ForEachOrdered = function(e, t, s) {
		var o = e.getCurrentSol();
		r++;
		if (n.length === r) n.push([]);
		var u = n[r];
		cr.shallowAssignArray(u, o.getObjects());
		var a = this.runtime.getCurrentEventStack();
		var f = a.current_event;
		var l = this.runtime.getCurrentCondition();
		var c = a.isModifierAfterCnds();
		var h = this.runtime.pushLoopStack();
		var p, d, v, m, g, y, b;
		for (p = 0, d = u.length; p < d; p++) {
			u[p].extra.c2_foreachordered_val = l.parameters[1].get(p)
		}
		u.sort(i);
		if (s === 1) u.reverse();
		var w = e.is_contained;
		if (c) {
			for (p = 0, d = u.length; p < d && !h.stopped; p++) {
				this.runtime.pushCopySol(f.solModifiers);
				g = u[p];
				o = e.getCurrentSol();
				o.select_all = false;
				o.instances.length = 1;
				o.instances[0] = g;
				if (w) {
					for (v = 0, m = g.siblings.length; v < m; v++) {
						y = g.siblings[v];
						b = y.type.getCurrentSol();
						b.select_all = false;
						b.instances.length = 1;
						b.instances[0] = y
					}
				}
				h.index = p;
				f.retrigger();
				this.runtime.popSol(f.solModifiers)
			}
		} else {
			o.select_all = false;
			o.instances.length = 1;
			for (p = 0, d = u.length; p < d && !h.stopped; p++) {
				g = u[p];
				o.instances[0] = g;
				if (w) {
					for (v = 0, m = g.siblings.length; v < m; v++) {
						y = g.siblings[v];
						b = y.type.getCurrentSol();
						b.select_all = false;
						b.instances.length = 1;
						b.instances[0] = y
					}
				}
				h.index = p;
				f.retrigger()
			}
		}
		u.length = 0;
		this.runtime.popLoopStack();
		r--;
		return false
	};
	t.prototype.PickByComparison = function(e, t, i, s) {
		var o, u, a, f;
		if (!e) return;
		r++;
		if (n.length === r) n.push([]);
		var l = n[r];
		var c = e.getCurrentSol();
		cr.shallowAssignArray(l, c.getObjects());
		if (c.select_all) c.else_instances.length = 0;
		var h = this.runtime.getCurrentCondition();
		for (o = 0, a = 0, u = l.length; o < u; o++) {
			f = l[o];
			l[a] = f;
			t = h.parameters[1].get(o);
			s = h.parameters[3].get(o);
			if (cr.do_cmp(t, i, s)) {
				a++
			} else {
				c.else_instances.push(f)
			}
		}
		l.length = a;
		c.select_all = false;
		cr.shallowAssignArray(c.instances, l);
		l.length = 0;
		r--;
		e.applySolToContainer();
		return !!c.instances.length
	};
	t.prototype.PickByEvaluate = function(e, t) {
		var i, s, o, u;
		if (!e) return;
		r++;
		if (n.length === r) n.push([]);
		var a = n[r];
		var f = e.getCurrentSol();
		cr.shallowAssignArray(a, f.getObjects());
		if (f.select_all) f.else_instances.length = 0;
		var l = this.runtime.getCurrentCondition();
		for (i = 0, o = 0, s = a.length; i < s; i++) {
			u = a[i];
			a[o] = u;
			t = l.parameters[1].get(i);
			if (t) {
				o++
			} else {
				f.else_instances.push(u)
			}
		}
		a.length = o;
		f.select_all = false;
		cr.shallowAssignArray(f.instances, a);
		a.length = 0;
		r--;
		e.applySolToContainer();
		return !!f.instances.length
	};
	t.prototype.TriggerOnce = function() {
		var e = this.runtime.getCurrentCondition().extra;
		if (typeof e.TriggerOnce_lastTick === "undefined") e.TriggerOnce_lastTick = -1;
		var t = e.TriggerOnce_lastTick;
		var n = this.runtime.tickcount;
		e.TriggerOnce_lastTick = n;
		return this.runtime.layout_first_tick || t !== n - 1
	};
	t.prototype.Every = function(e) {
		var t = this.runtime.getCurrentCondition();
		var n = t.extra.Every_lastTime || 0;
		var r = this.runtime.kahanTime.sum;
		if (typeof t.extra.Every_seconds === "undefined") t.extra.Every_seconds = e;
		var i = t.extra.Every_seconds;
		if (r >= n + i) {
			t.extra.Every_lastTime = n + i;
			if (r >= t.extra.Every_lastTime + i) t.extra.Every_lastTime = r;
			t.extra.Every_seconds = e;
			return true
		} else return false
	};
	t.prototype.PickNth = function(e, t) {
		if (!e) return false;
		var n = e.getCurrentSol();
		var r = n.getObjects();
		t = cr.floor(t);
		if (t < 0 || t >= r.length) return false;
		var i = r[t];
		n.pick_one(i);
		e.applySolToContainer();
		return true
	};
	t.prototype.PickRandom = function(e) {
		if (!e) return false;
		var t = e.getCurrentSol();
		var n = t.getObjects();
		var r = cr.floor(Math.random() * n.length);
		if (r >= n.length) return false;
		var i = n[r];
		t.pick_one(i);
		e.applySolToContainer();
		return true
	};
	t.prototype.CompareVar = function(e, t, n) {
		return cr.do_cmp(e.getValue(), t, n)
	};
	t.prototype.IsGroupActive = function(e) {
		return this.runtime.activeGroups[e.toLowerCase()]
	};
	t.prototype.IsPreview = function() {
		return typeof cr_is_preview !== "undefined"
	};
	t.prototype.PickAll = function(e) {
		if (!e) return false;
		if (!e.instances.length) return false;
		var t = e.getCurrentSol();
		t.select_all = true;
		e.applySolToContainer();
		return true
	};
	t.prototype.IsMobile = function() {
		return this.runtime.isMobile
	};
	t.prototype.CompareBetween = function(e, t, n) {
		return e >= t && e <= n
	};
	t.prototype.Else = function() {
		var e = this.runtime.getCurrentEventStack();
		if (e.else_branch_ran) return false;
		else return !e.last_event_true
	};
	t.prototype.OnLoadFinished = function() {
		return true
	};
	t.prototype.OnCanvasSnapshot = function() {
		return true
	};
	t.prototype.EffectsSupported = function() {
		return !!this.runtime.glwrap
	};
	t.prototype.OnSaveComplete = function() {
		return true
	};
	t.prototype.OnLoadComplete = function() {
		return true
	};
	t.prototype.OnLoadFailed = function() {
		return true
	};
	t.prototype.ObjectUIDExists = function(e) {
		return !!this.runtime.getObjectByUID(e)
	};
	t.prototype.IsOnPlatform = function(e) {
		var t = this.runtime;
		switch (e) {
		case 0:
			return !t.isDomFree && !t.isNodeWebkit && !t.isPhoneGap && !t.isWindows8App && !t.isWindowsPhone8 && !t.isBlackberry10;
		case 1:
			return t.isiOS;
		case 2:
			return t.isAndroid;
		case 3:
			return t.isWindows8App;
		case 4:
			return t.isWindowsPhone8;
		case 5:
			return t.isBlackberry10;
		case 6:
			return t.isTizen;
		case 7:
			return t.isNodeWebkit;
		case 8:
			return t.isCocoonJs;
		case 9:
			return t.isPhoneGap;
		case 10:
			return t.isArcade;
		case 11:
			return t.isNodeWebkit;
		default:
			return false
		}
	};
	var s = null;
	var o = "";
	var u = "";
	t.prototype.RegexTest = function(e, t, n) {
		var r = a(t, n);
		return r.test(e)
	};
	var f = [];
	t.prototype.PickOverlappingPoint = function(e, t, n) {
		if (!e) return false;
		var r = e.getCurrentSol();
		var i = r.getObjects();
		var s = this.runtime.getCurrentEventStack().current_event;
		var o = s.orblock;
		var u = this.runtime.getCurrentCondition();
		var a, l, c, h;
		if (r.select_all) {
			cr.shallowAssignArray(f, i);
			r.else_instances.length = 0;
			r.select_all = false;
			r.instances.length = 0
		} else {
			if (o) {
				cr.shallowAssignArray(f, r.else_instances);
				r.else_instances.length = 0
			} else {
				cr.shallowAssignArray(f, i);
				r.instances.length = 0
			}
		}
		for (a = 0, l = f.length; a < l; ++a) {
			c = f[a];
			h = cr.xor(c.contains_pt(t, n), u.inverted);
			if (h) r.instances.push(c);
			else r.else_instances.push(c)
		}
		e.applySolToContainer();
		return cr.xor( !! r.instances.length, u.inverted)
	};
	e.cnds = new t;
	l.prototype.GoToLayout = function(e) {
		if (this.runtime.isloading) return;
		if (this.runtime.changelayout) return;
		this.runtime.changelayout = e
	};
	l.prototype.CreateObject = function(e, t, n, r) {
		if (!t || !e) return;
		var i = this.runtime.createInstance(e, t, n, r);
		if (!i) return;
		this.runtime.isInOnDestroy++;
		var s, o, u;
		this.runtime.trigger(Object.getPrototypeOf(e.plugin).cnds.OnCreated, i);
		if (i.is_contained) {
			for (s = 0, o = i.siblings.length; s < o; s++) {
				u = i.siblings[s];
				this.runtime.trigger(Object.getPrototypeOf(u.type.plugin).cnds.OnCreated, u)
			}
		}
		this.runtime.isInOnDestroy--;
		var a = e.getCurrentSol();
		a.select_all = false;
		a.instances.length = 1;
		a.instances[0] = i;
		if (i.is_contained) {
			for (s = 0, o = i.siblings.length; s < o; s++) {
				u = i.siblings[s];
				a = u.type.getCurrentSol();
				a.select_all = false;
				a.instances.length = 1;
				a.instances[0] = u
			}
		}
	};
	l.prototype.SetLayerVisible = function(e, t) {
		if (!e) return;
		if (e.visible !== t) {
			e.visible = t;
			this.runtime.redraw = true
		}
	};
	l.prototype.SetLayerOpacity = function(e, t) {
		if (!e) return;
		t = cr.clamp(t / 100, 0, 1);
		if (e.opacity !== t) {
			e.opacity = t;
			this.runtime.redraw = true
		}
	};
	l.prototype.SetLayerScaleRate = function(e, t) {
		if (!e) return;
		if (e.zoomRate !== t) {
			e.zoomRate = t;
			this.runtime.redraw = true
		}
	};
	l.prototype.SetLayoutScale = function(e) {
		if (!this.runtime.running_layout) return;
		if (this.runtime.running_layout.scale !== e) {
			this.runtime.running_layout.scale = e;
			this.runtime.running_layout.boundScrolling();
			this.runtime.redraw = true
		}
	};
	l.prototype.ScrollX = function(e) {
		this.runtime.running_layout.scrollToX(e)
	};
	l.prototype.ScrollY = function(e) {
		this.runtime.running_layout.scrollToY(e)
	};
	l.prototype.Scroll = function(e, t) {
		this.runtime.running_layout.scrollToX(e);
		this.runtime.running_layout.scrollToY(t)
	};
	l.prototype.ScrollToObject = function(e) {
		var t = e.getFirstPicked();
		if (t) {
			this.runtime.running_layout.scrollToX(t.x);
			this.runtime.running_layout.scrollToY(t.y)
		}
	};
	l.prototype.SetVar = function(e, t) {
		if (e.vartype === 0) {
			if (cr.is_number(t)) e.setValue(t);
			else e.setValue(parseFloat(t))
		} else if (e.vartype === 1) e.setValue(t.toString())
	};
	l.prototype.AddVar = function(e, t) {
		if (e.vartype === 0) {
			if (cr.is_number(t)) e.setValue(e.getValue() + t);
			else e.setValue(e.getValue() + parseFloat(t))
		} else if (e.vartype === 1) e.setValue(e.getValue() + t.toString())
	};
	l.prototype.SubVar = function(e, t) {
		if (e.vartype === 0) {
			if (cr.is_number(t)) e.setValue(e.getValue() - t);
			else e.setValue(e.getValue() - parseFloat(t))
		}
	};
	l.prototype.SetGroupActive = function(e, t) {
		var n = this.runtime.activeGroups;
		var r = e.toLowerCase();
		switch (t) {
		case 0:
			n[r] = false;
			break;
		case 1:
			n[r] = true;
			break;
		case 2:
			n[r] = !n[r];
			break
		}
	};
	l.prototype.SetTimescale = function(e) {
		var t = e;
		if (t < 0) t = 0;
		this.runtime.timescale = t
	};
	l.prototype.SetObjectTimescale = function(e, t) {
		var n = t;
		if (n < 0) n = 0;
		if (!e) return;
		var r = e.getCurrentSol();
		var i = r.getObjects();
		var s, o;
		for (s = 0, o = i.length; s < o; s++) {
			i[s].my_timescale = n
		}
	};
	l.prototype.RestoreObjectTimescale = function(e) {
		if (!e) return false;
		var t = e.getCurrentSol();
		var n = t.getObjects();
		var r, i;
		for (r = 0, i = n.length; r < i; r++) {
			n[r].my_timescale = -1
		}
	};
	var c = [];
	var d = [];
	l.prototype.Wait = function(e) {
		if (e < 0) return;
		var t, n, r, i, s;
		var o = this.runtime.getCurrentEventStack();
		var u = h();
		u.time = this.runtime.kahanTime.sum + e;
		u.ev = o.current_event;
		u.actindex = o.actindex + 1;
		for (t = 0, n = this.runtime.types_by_index.length; t < n; t++) {
			i = this.runtime.types_by_index[t];
			r = i.getCurrentSol();
			if (r.select_all && o.current_event.solModifiers.indexOf(i) === -1) continue;
			u.solModifiers.push(i);
			s = v();
			s.sa = r.select_all;
			cr.shallowAssignArray(s.insts, r.instances);
			u.sols[t.toString()] = s
		}
		this.waits.push(u);
		return true
	};
	l.prototype.SetLayerScale = function(e, t) {
		if (!e) return;
		if (e.scale === t) return;
		e.scale = t;
		this.runtime.redraw = true
	};
	l.prototype.ResetGlobals = function() {
		var e, t, n;
		for (e = 0, t = this.runtime.all_global_vars.length; e < t; e++) {
			n = this.runtime.all_global_vars[e];
			n.data = n.initial
		}
	};
	l.prototype.SetLayoutAngle = function(e) {
		e = cr.to_radians(e);
		e = cr.clamp_angle(e);
		if (this.runtime.running_layout) {
			if (this.runtime.running_layout.angle !== e) {
				this.runtime.running_layout.angle = e;
				this.runtime.redraw = true
			}
		}
	};
	l.prototype.SetLayerAngle = function(e, t) {
		if (!e) return;
		t = cr.to_radians(t);
		t = cr.clamp_angle(t);
		if (e.angle === t) return;
		e.angle = t;
		this.runtime.redraw = true
	};
	l.prototype.SetLayerParallax = function(e, t, n) {
		if (!e) return;
		if (e.parallaxX === t / 100 && e.parallaxY === n / 100) return;
		e.parallaxX = t / 100;
		e.parallaxY = n / 100;
		this.runtime.redraw = true
	};
	l.prototype.SetLayerBackground = function(e, t) {
		if (!e) return;
		var n = cr.GetRValue(t);
		var r = cr.GetGValue(t);
		var i = cr.GetBValue(t);
		if (e.background_color[0] === n && e.background_color[1] === r && e.background_color[2] === i) return;
		e.background_color[0] = n;
		e.background_color[1] = r;
		e.background_color[2] = i;
		this.runtime.redraw = true
	};
	l.prototype.SetLayerTransparent = function(e, t) {
		if (!e) return;
		if ( !! t === !! e.transparent) return;
		e.transparent = !! t;
		this.runtime.redraw = true
	};
	l.prototype.StopLoop = function() {
		if (this.runtime.loop_stack_index < 0) return;
		this.runtime.getCurrentLoop().stopped = true
	};
	l.prototype.GoToLayoutByName = function(e) {
		if (this.runtime.isloading) return;
		if (this.runtime.changelayout) return;
		var t;
		for (t in this.runtime.layouts) {
			if (this.runtime.layouts.hasOwnProperty(t) && cr.equals_nocase(t, e)) {
				this.runtime.changelayout = this.runtime.layouts[t];
				return
			}
		}
	};
	l.prototype.RestartLayout = function(e) {
		if (this.runtime.isloading) return;
		if (this.runtime.changelayout) return;
		if (!this.runtime.running_layout) return;
		this.runtime.changelayout = this.runtime.running_layout;
		var t, n, r;
		for (t = 0, n = this.runtime.allGroups.length; t < n; t++) {
			r = this.runtime.allGroups[t];
			this.runtime.activeGroups[r.group_name.toLowerCase()] = r.initially_activated
		}
	};
	l.prototype.SnapshotCanvas = function(e, t) {
		this.runtime.snapshotCanvas = [e === 0 ? "image/png" : "image/jpeg", t / 100];
		this.runtime.redraw = true
	};
	l.prototype.SetCanvasSize = function(e, t) {
		if (e <= 0 || t <= 0) return;
		this.runtime["setSize"](e, t)
	};
	l.prototype.SetLayoutEffectEnabled = function(e, t) {
		if (!this.runtime.running_layout || !this.runtime.glwrap) return;
		var n = this.runtime.running_layout.getEffectByName(t);
		if (!n) return;
		var r = e === 1;
		if (n.active == r) return;
		n.active = r;
		this.runtime.running_layout.updateActiveEffects();
		this.runtime.redraw = true
	};
	l.prototype.SetLayerEffectEnabled = function(e, t, n) {
		if (!e || !this.runtime.glwrap) return;
		var r = e.getEffectByName(n);
		if (!r) return;
		var i = t === 1;
		if (r.active == i) return;
		r.active = i;
		e.updateActiveEffects();
		this.runtime.redraw = true
	};
	l.prototype.SetLayoutEffectParam = function(e, t, n) {
		if (!this.runtime.running_layout || !this.runtime.glwrap) return;
		var r = this.runtime.running_layout.getEffectByName(e);
		if (!r) return;
		var i = this.runtime.running_layout.effect_params[r.index];
		t = Math.floor(t);
		if (t < 0 || t >= i.length) return;
		if (this.runtime.glwrap.getProgramParameterType(r.shaderindex, t) === 1) n /= 100;
		if (i[t] === n) return;
		i[t] = n;
		if (r.active) this.runtime.redraw = true
	};
	l.prototype.SetLayerEffectParam = function(e, t, n, r) {
		if (!e || !this.runtime.glwrap) return;
		var i = e.getEffectByName(t);
		if (!i) return;
		var s = e.effect_params[i.index];
		n = Math.floor(n);
		if (n < 0 || n >= s.length) return;
		if (this.runtime.glwrap.getProgramParameterType(i.shaderindex, n) === 1) r /= 100;
		if (s[n] === r) return;
		s[n] = r;
		if (i.active) this.runtime.redraw = true
	};
	l.prototype.SaveState = function(e) {
		this.runtime.saveToSlot = e
	};
	l.prototype.LoadState = function(e) {
		this.runtime.loadFromSlot = e
	};
	l.prototype.LoadStateJSON = function(e) {
		this.runtime.loadFromJson = e
	};
	e.acts = new l;
	g.prototype["int"] = function(e, t) {
		if (cr.is_string(t)) {
			e.set_int(parseInt(t, 10));
			if (isNaN(e.data)) e.data = 0
		} else e.set_int(t)
	};
	g.prototype["float"] = function(e, t) {
		if (cr.is_string(t)) {
			e.set_float(parseFloat(t));
			if (isNaN(e.data)) e.data = 0
		} else e.set_float(t)
	};
	g.prototype.str = function(e, t) {
		if (cr.is_string(t)) e.set_string(t);
		else e.set_string(t.toString())
	};
	g.prototype.len = function(e, t) {
		e.set_int(t.length || 0)
	};
	g.prototype.random = function(e, t, n) {
		if (n === undefined) {
			e.set_float(Math.random() * t)
		} else {
			e.set_float(Math.random() * (n - t) + t)
		}
	};
	g.prototype.sqrt = function(e, t) {
		e.set_float(Math.sqrt(t))
	};
	g.prototype.abs = function(e, t) {
		e.set_float(Math.abs(t))
	};
	g.prototype.round = function(e, t) {
		e.set_int(Math.round(t))
	};
	g.prototype.floor = function(e, t) {
		e.set_int(Math.floor(t))
	};
	g.prototype.ceil = function(e, t) {
		e.set_int(Math.ceil(t))
	};
	g.prototype.sin = function(e, t) {
		e.set_float(Math.sin(cr.to_radians(t)))
	};
	g.prototype.cos = function(e, t) {
		e.set_float(Math.cos(cr.to_radians(t)))
	};
	g.prototype.tan = function(e, t) {
		e.set_float(Math.tan(cr.to_radians(t)))
	};
	g.prototype.asin = function(e, t) {
		e.set_float(cr.to_degrees(Math.asin(t)))
	};
	g.prototype.acos = function(e, t) {
		e.set_float(cr.to_degrees(Math.acos(t)))
	};
	g.prototype.atan = function(e, t) {
		e.set_float(cr.to_degrees(Math.atan(t)))
	};
	g.prototype.exp = function(e, t) {
		e.set_float(Math.exp(t))
	};
	g.prototype.ln = function(e, t) {
		e.set_float(Math.log(t))
	};
	g.prototype.log10 = function(e, t) {
		e.set_float(Math.log(t) / Math.LN10)
	};
	g.prototype.max = function(e) {
		var t = arguments[1];
		var n, r;
		for (n = 2, r = arguments.length; n < r; n++) {
			if (t < arguments[n]) t = arguments[n]
		}
		e.set_float(t)
	};
	g.prototype.min = function(e) {
		var t = arguments[1];
		var n, r;
		for (n = 2, r = arguments.length; n < r; n++) {
			if (t > arguments[n]) t = arguments[n]
		}
		e.set_float(t)
	};
	g.prototype.dt = function(e) {
		e.set_float(this.runtime.dt)
	};
	g.prototype.timescale = function(e) {
		e.set_float(this.runtime.timescale)
	};
	g.prototype.wallclocktime = function(e) {
		e.set_float((Date.now() - this.runtime.start_time) / 1e3)
	};
	g.prototype.time = function(e) {
		e.set_float(this.runtime.kahanTime.sum)
	};
	g.prototype.tickcount = function(e) {
		e.set_int(this.runtime.tickcount)
	};
	g.prototype.objectcount = function(e) {
		e.set_int(this.runtime.objectcount)
	};
	g.prototype.fps = function(e) {
		e.set_int(this.runtime.fps)
	};
	g.prototype.loopindex = function(e, t) {
		var n, r, i;
		if (!this.runtime.loop_stack.length) {
			e.set_int(0);
			return
		}
		if (t) {
			for (r = 0, i = this.runtime.loop_stack.length; r < i; r++) {
				n = this.runtime.loop_stack[r];
				if (n.name === t) {
					e.set_int(n.index);
					return
				}
			}
			e.set_int(0)
		} else {
			n = this.runtime.getCurrentLoop();
			e.set_int(n ? n.index : -1)
		}
	};
	g.prototype.distance = function(e, t, n, r, i) {
		e.set_float(cr.distanceTo(t, n, r, i))
	};
	g.prototype.angle = function(e, t, n, r, i) {
		e.set_float(cr.to_degrees(cr.angleTo(t, n, r, i)))
	};
	g.prototype.scrollx = function(e) {
		e.set_float(this.runtime.running_layout.scrollX)
	};
	g.prototype.scrolly = function(e) {
		e.set_float(this.runtime.running_layout.scrollY)
	};
	g.prototype.newline = function(e) {
		e.set_string("\n")
	};
	g.prototype.lerp = function(e, t, n, r) {
		e.set_float(cr.lerp(t, n, r))
	};
	g.prototype.windowwidth = function(e) {
		e.set_int(this.runtime.width)
	};
	g.prototype.windowheight = function(e) {
		e.set_int(this.runtime.height)
	};
	g.prototype.uppercase = function(e, t) {
		e.set_string(cr.is_string(t) ? t.toUpperCase() : "")
	};
	g.prototype.lowercase = function(e, t) {
		e.set_string(cr.is_string(t) ? t.toLowerCase() : "")
	};
	g.prototype.clamp = function(e, t, n, r) {
		if (t < n) e.set_float(n);
		else if (t > r) e.set_float(r);
		else e.set_float(t)
	};
	g.prototype.layerscale = function(e, t) {
		var n = this.runtime.getLayer(t);
		if (!n) e.set_float(0);
		else e.set_float(n.scale)
	};
	g.prototype.layeropacity = function(e, t) {
		var n = this.runtime.getLayer(t);
		if (!n) e.set_float(0);
		else e.set_float(n.opacity * 100)
	};
	g.prototype.layerscalerate = function(e, t) {
		var n = this.runtime.getLayer(t);
		if (!n) e.set_float(0);
		else e.set_float(n.zoomRate)
	};
	g.prototype.layerparallaxx = function(e, t) {
		var n = this.runtime.getLayer(t);
		if (!n) e.set_float(0);
		else e.set_float(n.parallaxX * 100)
	};
	g.prototype.layerparallaxy = function(e, t) {
		var n = this.runtime.getLayer(t);
		if (!n) e.set_float(0);
		else e.set_float(n.parallaxY * 100)
	};
	g.prototype.layoutscale = function(e) {
		if (this.runtime.running_layout) e.set_float(this.runtime.running_layout.scale);
		else e.set_float(0)
	};
	g.prototype.layoutangle = function(e) {
		e.set_float(cr.to_degrees(this.runtime.running_layout.angle))
	};
	g.prototype.layerangle = function(e, t) {
		var n = this.runtime.getLayer(t);
		if (!n) e.set_float(0);
		else e.set_float(cr.to_degrees(n.angle))
	};
	g.prototype.layoutwidth = function(e) {
		e.set_int(this.runtime.running_layout.width)
	};
	g.prototype.layoutheight = function(e) {
		e.set_int(this.runtime.running_layout.height)
	};
	g.prototype.find = function(e, t, n) {
		if (cr.is_string(t) && cr.is_string(n)) e.set_int(t.search(new RegExp(cr.regexp_escape(n), "i")));
		else e.set_int(-1)
	};
	g.prototype.left = function(e, t, n) {
		e.set_string(cr.is_string(t) ? t.substr(0, n) : "")
	};
	g.prototype.right = function(e, t, n) {
		e.set_string(cr.is_string(t) ? t.substr(t.length - n) : "")
	};
	g.prototype.mid = function(e, t, n, r) {
		e.set_string(cr.is_string(t) ? t.substr(n, r) : "")
	};
	g.prototype.tokenat = function(e, t, n, r) {
		if (cr.is_string(t) && cr.is_string(r)) {
			var i = t.split(r);
			var s = cr.floor(n);
			if (s < 0 || s >= i.length) e.set_string("");
			else e.set_string(i[s])
		} else e.set_string("")
	};
	g.prototype.tokencount = function(e, t, n) {
		if (cr.is_string(t) && t.length) e.set_int(t.split(n).length);
		else e.set_int(0)
	};
	g.prototype.replace = function(e, t, n, r) {
		if (cr.is_string(t) && cr.is_string(n) && cr.is_string(r)) e.set_string(t.replace(new RegExp(cr.regexp_escape(n), "gi"), r));
		else e.set_string(cr.is_string(t) ? t : "")
	};
	g.prototype.trim = function(e, t) {
		e.set_string(cr.is_string(t) ? t.trim() : "")
	};
	g.prototype.pi = function(e) {
		e.set_float(cr.PI)
	};
	g.prototype.layoutname = function(e) {
		if (this.runtime.running_layout) e.set_string(this.runtime.running_layout.name);
		else e.set_string("")
	};
	g.prototype.renderer = function(e) {
		e.set_string(this.runtime.gl ? "webgl" : "canvas2d")
	};
	g.prototype.anglediff = function(e, t, n) {
		e.set_float(cr.to_degrees(cr.angleDiff(cr.to_radians(t), cr.to_radians(n))))
	};
	g.prototype.choose = function(e) {
		var t = cr.floor(Math.random() * (arguments.length - 1));
		e.set_any(arguments[t + 1])
	};
	g.prototype.rgb = function(e, t, n, r) {
		e.set_int(cr.RGB(t, n, r))
	};
	g.prototype.projectversion = function(e) {
		e.set_string(this.runtime.versionstr)
	};
	g.prototype.anglelerp = function(e, t, n, r) {
		t = cr.to_radians(t);
		n = cr.to_radians(n);
		var i = cr.angleDiff(t, n);
		if (cr.angleClockwise(n, t)) {
			e.set_float(cr.to_clamped_degrees(t + i * r))
		} else {
			e.set_float(cr.to_clamped_degrees(t - i * r))
		}
	};
	g.prototype.anglerotate = function(e, t, n, r) {
		t = cr.to_radians(t);
		n = cr.to_radians(n);
		r = cr.to_radians(r);
		e.set_float(cr.to_clamped_degrees(cr.angleRotate(t, n, r)))
	};
	g.prototype.zeropad = function(e, t, n) {
		var r = t < 0 ? "-" : "";
		if (t < 0) t = -t;
		var i = n - t.toString().length;
		for (var s = 0; s < i; s++) r += "0";
		e.set_string(r + t.toString())
	};
	g.prototype.cpuutilisation = function(e) {
		e.set_float(this.runtime.cpuutilisation / 1e3)
	};
	g.prototype.viewportleft = function(e, t) {
		var n = this.runtime.getLayer(t);
		e.set_float(n ? n.viewLeft : 0)
	};
	g.prototype.viewporttop = function(e, t) {
		var n = this.runtime.getLayer(t);
		e.set_float(n ? n.viewTop : 0)
	};
	g.prototype.viewportright = function(e, t) {
		var n = this.runtime.getLayer(t);
		e.set_float(n ? n.viewRight : 0)
	};
	g.prototype.viewportbottom = function(e, t) {
		var n = this.runtime.getLayer(t);
		e.set_float(n ? n.viewBottom : 0)
	};
	g.prototype.loadingprogress = function(e) {
		e.set_float(this.runtime.loadingprogress)
	};
	g.prototype.unlerp = function(e, t, n, r) {
		e.set_float((r - t) / (n - t))
	};
	g.prototype.canvassnapshot = function(e) {
		e.set_string(this.runtime.snapshotData)
	};
	g.prototype.urlencode = function(e, t) {
		e.set_string(encodeURIComponent(t))
	};
	g.prototype.urldecode = function(e, t) {
		e.set_string(decodeURIComponent(t))
	};
	g.prototype.canvastolayerx = function(e, t, n, r) {
		var i = this.runtime.getLayer(t);
		e.set_float(i ? i.canvasToLayer(n, r, true) : 0)
	};
	g.prototype.canvastolayery = function(e, t, n, r) {
		var i = this.runtime.getLayer(t);
		e.set_float(i ? i.canvasToLayer(n, r, false) : 0)
	};
	g.prototype.layertocanvasx = function(e, t, n, r) {
		var i = this.runtime.getLayer(t);
		e.set_float(i ? i.layerToCanvas(n, r, true) : 0)
	};
	g.prototype.layertocanvasy = function(e, t, n, r) {
		var i = this.runtime.getLayer(t);
		e.set_float(i ? i.layerToCanvas(n, r, false) : 0)
	};
	g.prototype.savestatejson = function(e) {
		e.set_string(this.runtime.lastSaveJson)
	};
	g.prototype.imagememoryusage = function(e) {
		if (this.runtime.glwrap) e.set_float(Math.round(100 * this.runtime.glwrap.estimateVRAM() / (1024 * 1024)) / 100);
		else e.set_float(0)
	};
	g.prototype.regexsearch = function(e, t, n, r) {
		var i = a(n, r);
		e.set_int(t ? t.search(i) : -1)
	};
	g.prototype.regexreplace = function(e, t, n, r, i) {
		var s = a(n, r);
		e.set_string(t ? t.replace(s, i) : "")
	};
	var y = [];
	var b = "";
	var w = "";
	var E = "";
	g.prototype.regexmatchcount = function(e, t, n, r) {
		var i = a(n, r);
		S(t, n, r);
		e.set_int(y ? y.length : 0)
	};
	g.prototype.regexmatchat = function(e, t, n, r, i) {
		i = Math.floor(i);
		var s = a(n, r);
		S(t, n, r);
		if (!y || i < 0 || i >= y.length) e.set_string("");
		else e.set_string(y[i])
	};
	g.prototype.infinity = function(e) {
		e.set_float(Infinity)
	};
	e.exps = new g;
	e.runWaits = function() {
		var e, t, n, r, i, s, o;
		var u = this.runtime.getCurrentEventStack();
		for (e = 0, n = this.waits.length; e < n; e++) {
			r = this.waits[e];
			if (r.time > this.runtime.kahanTime.sum) continue;
			u.current_event = r.ev;
			u.actindex = r.actindex;
			u.cndindex = 0;
			for (i in r.sols) {
				if (r.sols.hasOwnProperty(i)) {
					s = this.runtime.types_by_index[parseInt(i, 10)].getCurrentSol();
					o = r.sols[i];
					s.select_all = o.sa;
					cr.shallowAssignArray(s.instances, o.insts);
					m(o)
				}
			}
			r.ev.resume_actions_and_subevents();
			this.runtime.clearSol(r.solModifiers);
			r.deleteme = true
		}
		for (e = 0, t = 0, n = this.waits.length; e < n; e++) {
			r = this.waits[e];
			this.waits[t] = r;
			if (r.deleteme) p(r);
			else t++
		}
		this.waits.length = t
	}
})();
cr.add_common_aces = function(e) {
	var t = e[0].prototype;
	var n = e[1];
	var r = e[3];
	var i = e[4];
	var s = e[5];
	var o = e[6];
	var u = e[7];
	var a = e[8];
	if (!t.cnds) t.cnds = {};
	if (!t.acts) t.acts = {};
	if (!t.exps) t.exps = {};
	var f = t.cnds;
	var l = t.acts;
	var c = t.exps;
	if (r) {
		f.CompareX = function(e, t) {
			return cr.do_cmp(this.x, e, t)
		};
		f.CompareY = function(e, t) {
			return cr.do_cmp(this.y, e, t)
		};
		f.IsOnScreen = function() {
			var e = this.layer;
			this.update_bbox();
			var t = this.bbox;
			return !(t.right < e.viewLeft || t.bottom < e.viewTop || t.left > e.viewRight || t.top > e.viewBottom)
		};
		f.IsOutsideLayout = function() {
			this.update_bbox();
			var e = this.bbox;
			var t = this.runtime.running_layout;
			return e.right < 0 || e.bottom < 0 || e.left > t.width || e.top > t.height
		};
		f.PickDistance = function(e, t, n) {
			var r = this.getCurrentSol();
			var i = r.getObjects();
			if (!i.length) return false;
			var s = i[0];
			var o = s;
			var u = cr.distanceTo(s.x, s.y, t, n);
			var a, f, l;
			for (a = 1, f = i.length; a < f; a++) {
				s = i[a];
				l = cr.distanceTo(s.x, s.y, t, n);
				if (e === 0 && l < u || e === 1 && l > u) {
					u = l;
					o = s
				}
			}
			r.pick_one(o);
			return true
		};
		l.SetX = function(e) {
			if (this.x !== e) {
				this.x = e;
				this.set_bbox_changed()
			}
		};
		l.SetY = function(e) {
			if (this.y !== e) {
				this.y = e;
				this.set_bbox_changed()
			}
		};
		l.SetPos = function(e, t) {
			if (this.x !== e || this.y !== t) {
				this.x = e;
				this.y = t;
				this.set_bbox_changed()
			}
		};
		l.SetPosToObject = function(e, t) {
			var n = e.getPairedInstance(this);
			if (!n) return;
			var r, i;
			if (n.getImagePoint) {
				r = n.getImagePoint(t, true);
				i = n.getImagePoint(t, false)
			} else {
				r = n.x;
				i = n.y
			}
			if (this.x !== r || this.y !== i) {
				this.x = r;
				this.y = i;
				this.set_bbox_changed()
			}
		};
		l.MoveForward = function(e) {
			if (e !== 0) {
				this.x += Math.cos(this.angle) * e;
				this.y += Math.sin(this.angle) * e;
				this.set_bbox_changed()
			}
		};
		l.MoveAtAngle = function(e, t) {
			if (t !== 0) {
				this.x += Math.cos(cr.to_radians(e)) * t;
				this.y += Math.sin(cr.to_radians(e)) * t;
				this.set_bbox_changed()
			}
		};
		c.X = function(e) {
			e.set_float(this.x)
		};
		c.Y = function(e) {
			e.set_float(this.y)
		};
		c.dt = function(e) {
			e.set_float(this.runtime.getDt(this))
		}
	}
	if (i) {
		f.CompareWidth = function(e, t) {
			return cr.do_cmp(this.width, e, t)
		};
		f.CompareHeight = function(e, t) {
			return cr.do_cmp(this.height, e, t)
		};
		l.SetWidth = function(e) {
			if (this.width !== e) {
				this.width = e;
				this.set_bbox_changed()
			}
		};
		l.SetHeight = function(e) {
			if (this.height !== e) {
				this.height = e;
				this.set_bbox_changed()
			}
		};
		l.SetSize = function(e, t) {
			if (this.width !== e || this.height !== t) {
				this.width = e;
				this.height = t;
				this.set_bbox_changed()
			}
		};
		c.Width = function(e) {
			e.set_float(this.width)
		};
		c.Height = function(e) {
			e.set_float(this.height)
		};
		c.BBoxLeft = function(e) {
			this.update_bbox();
			e.set_float(this.bbox.left)
		};
		c.BBoxTop = function(e) {
			this.update_bbox();
			e.set_float(this.bbox.top)
		};
		c.BBoxRight = function(e) {
			this.update_bbox();
			e.set_float(this.bbox.right)
		};
		c.BBoxBottom = function(e) {
			this.update_bbox();
			e.set_float(this.bbox.bottom)
		}
	}
	if (s) {
		f.AngleWithin = function(e, t) {
			return cr.angleDiff(this.angle, cr.to_radians(t)) <= cr.to_radians(e)
		};
		f.IsClockwiseFrom = function(e) {
			return cr.angleClockwise(this.angle, cr.to_radians(e))
		};
		f.IsBetweenAngles = function(e, t) {
			var n = cr.to_clamped_radians(e);
			var r = cr.to_clamped_radians(t);
			var i = cr.clamp_angle(this.angle);
			var s = !cr.angleClockwise(r, n);
			if (s) return !(!cr.angleClockwise(i, n) && cr.angleClockwise(i, r));
			else return cr.angleClockwise(i, n) && !cr.angleClockwise(i, r)
		};
		l.SetAngle = function(e) {
			var t = cr.to_radians(cr.clamp_angle_degrees(e));
			if (isNaN(t)) return;
			if (this.angle !== t) {
				this.angle = t;
				this.set_bbox_changed()
			}
		};
		l.RotateClockwise = function(e) {
			if (e !== 0 && !isNaN(e)) {
				this.angle += cr.to_radians(e);
				this.angle = cr.clamp_angle(this.angle);
				this.set_bbox_changed()
			}
		};
		l.RotateCounterclockwise = function(e) {
			if (e !== 0 && !isNaN(e)) {
				this.angle -= cr.to_radians(e);
				this.angle = cr.clamp_angle(this.angle);
				this.set_bbox_changed()
			}
		};
		l.RotateTowardAngle = function(e, t) {
			var n = cr.angleRotate(this.angle, cr.to_radians(t), cr.to_radians(e));
			if (isNaN(n)) return;
			if (this.angle !== n) {
				this.angle = n;
				this.set_bbox_changed()
			}
		};
		l.RotateTowardPosition = function(e, t, n) {
			var r = t - this.x;
			var i = n - this.y;
			var s = Math.atan2(i, r);
			var o = cr.angleRotate(this.angle, s, cr.to_radians(e));
			if (isNaN(o)) return;
			if (this.angle !== o) {
				this.angle = o;
				this.set_bbox_changed()
			}
		};
		l.SetTowardPosition = function(e, t) {
			var n = e - this.x;
			var r = t - this.y;
			var i = Math.atan2(r, n);
			if (isNaN(i)) return;
			if (this.angle !== i) {
				this.angle = i;
				this.set_bbox_changed()
			}
		};
		c.Angle = function(e) {
			e.set_float(cr.to_clamped_degrees(this.angle))
		}
	}
	if (!n) {
		f.CompareInstanceVar = function(e, t, n) {
			return cr.do_cmp(this.instance_vars[e], t, n)
		};
		f.IsBoolInstanceVarSet = function(e) {
			return this.instance_vars[e]
		};
		f.PickInstVarHiLow = function(e, t) {
			var n = this.getCurrentSol();
			var r = n.getObjects();
			if (!r.length) return false;
			var i = r[0];
			var s = i;
			var o = i.instance_vars[t];
			var u, a, f;
			for (u = 1, a = r.length; u < a; u++) {
				i = r[u];
				f = i.instance_vars[t];
				if (e === 0 && f < o || e === 1 && f > o) {
					o = f;
					s = i
				}
			}
			n.pick_one(s);
			return true
		};
		f.PickByUID = function(e) {
			var t, n, r, i, s, o, u;
			var a = this.runtime.getCurrentCondition();
			if (a.inverted) {
				u = this.getCurrentSol();
				if (u.select_all) {
					u.select_all = false;
					u.instances.length = 0;
					u.else_instances.length = 0;
					o = this.instances;
					for (t = 0, n = o.length; t < n; t++) {
						i = o[t];
						if (i.uid === e) u.else_instances.push(i);
						else u.instances.push(i)
					}
					return !!u.instances.length
				} else {
					for (t = 0, r = 0, n = u.instances.length; t < n; t++) {
						i = u.instances[t];
						u.instances[r] = i;
						if (i.uid === e) {
							u.else_instances.push(i)
						} else r++
					}
					u.instances.length = r;
					return !!u.instances.length
				}
			} else {
				i = this.runtime.getObjectByUID(e);
				if (!i) return false;
				u = this.getCurrentSol();
				if (!u.select_all && u.instances.indexOf(i) === -1) return false;
				if (this.is_family) {
					s = i.type.families;
					for (t = 0, n = s.length; t < n; t++) {
						if (s[t] === this) {
							u.pick_one(i);
							return true
						}
					}
				} else if (i.type === this) {
					u.pick_one(i);
					return true
				}
				return false
			}
		};
		f.OnCreated = function() {
			return true
		};
		f.OnDestroyed = function() {
			return true
		};
		l.SetInstanceVar = function(e, t) {
			var n = this.instance_vars;
			if (cr.is_number(n[e])) {
				if (cr.is_number(t)) n[e] = t;
				else n[e] = parseFloat(t)
			} else if (cr.is_string(n[e])) {
				if (cr.is_string(t)) n[e] = t;
				else n[e] = t.toString()
			} else;
		};
		l.AddInstanceVar = function(e, t) {
			var n = this.instance_vars;
			if (cr.is_number(n[e])) {
				if (cr.is_number(t)) n[e] += t;
				else n[e] += parseFloat(t)
			} else if (cr.is_string(n[e])) {
				if (cr.is_string(t)) n[e] += t;
				else n[e] += t.toString()
			} else;
		};
		l.SubInstanceVar = function(e, t) {
			var n = this.instance_vars;
			if (cr.is_number(n[e])) {
				if (cr.is_number(t)) n[e] -= t;
				else n[e] -= parseFloat(t)
			} else;
		};
		l.SetBoolInstanceVar = function(e, t) {
			this.instance_vars[e] = t ? 1 : 0
		};
		l.ToggleBoolInstanceVar = function(e) {
			this.instance_vars[e] = 1 - this.instance_vars[e]
		};
		l.Destroy = function() {
			this.runtime.DestroyInstance(this)
		};
		c.Count = function(e) {
			var t = e.object_class.instances.length;
			var n, r, i;
			for (n = 0, r = this.runtime.createRow.length; n < r; n++) {
				i = this.runtime.createRow[n];
				if (e.object_class.is_family) {
					if (i.type.families.indexOf(e.object_class) >= 0) t++
				} else {
					if (i.type === e.object_class) t++
				}
			}
			e.set_int(t)
		};
		c.PickedCount = function(e) {
			e.set_int(e.object_class.getCurrentSol().getObjects().length)
		};
		c.UID = function(e) {
			e.set_int(this.uid)
		};
		c.IID = function(e) {
			e.set_int(this.get_iid())
		}
	}
	if (o) {
		f.IsVisible = function() {
			return this.visible
		};
		l.SetVisible = function(e) {
			if (!e !== !this.visible) {
				this.visible = e;
				this.runtime.redraw = true
			}
		};
		f.CompareOpacity = function(e, t) {
			return cr.do_cmp(cr.round6dp(this.opacity * 100), e, t)
		};
		l.SetOpacity = function(e) {
			var t = e / 100;
			if (t < 0) t = 0;
			else if (t > 1) t = 1;
			if (t !== this.opacity) {
				this.opacity = t;
				this.runtime.redraw = true
			}
		};
		c.Opacity = function(e) {
			e.set_float(cr.round6dp(this.opacity * 100))
		}
	}
	if (u) {
		f.IsOnLayer = function(e) {
			if (!e) return false;
			return this.layer === e
		};
		f.PickTopBottom = function(e) {
			var t = this.getCurrentSol();
			var n = t.getObjects();
			if (!n.length) return false;
			var r = n[0];
			var i = r;
			var s, o;
			for (s = 1, o = n.length; s < o; s++) {
				r = n[s];
				if (e === 0) {
					if (r.layer.index > i.layer.index || r.layer.index === i.layer.index && r.get_zindex() > i.get_zindex()) {
						i = r
					}
				} else {
					if (r.layer.index < i.layer.index || r.layer.index === i.layer.index && r.get_zindex() < i.get_zindex()) {
						i = r
					}
				}
			}
			t.pick_one(i);
			return true
		};
		l.MoveToTop = function() {
			var e = this.get_zindex();
			if (e === this.layer.instances.length - 1) return;
			cr.arrayRemove(this.layer.instances, e);
			this.layer.instances.push(this);
			this.runtime.redraw = true;
			this.layer.zindices_stale = true
		};
		l.MoveToBottom = function() {
			var e = this.get_zindex();
			if (e === 0) return;
			cr.arrayRemove(this.layer.instances, e);
			this.layer.instances.unshift(this);
			this.runtime.redraw = true;
			this.layer.zindices_stale = true
		};
		l.MoveToLayer = function(e) {
			if (!e || e == this.layer) return;
			cr.arrayRemove(this.layer.instances, this.get_zindex());
			this.layer.zindices_stale = true;
			this.layer = e;
			this.zindex = e.instances.length;
			e.instances.push(this);
			this.runtime.redraw = true
		};
		l.ZMoveToObject = function(e, t) {
			var n = e === 0;
			if (!t) return;
			var r = t.getFirstPicked(this);
			if (!r || r.uid === this.uid) return;
			if (this.layer.index !== r.layer.index) {
				cr.arrayRemove(this.layer.instances, this.get_zindex());
				this.layer.zindices_stale = true;
				this.layer = r.layer;
				this.zindex = r.layer.instances.length;
				r.layer.instances.push(this)
			}
			var i = this.get_zindex();
			var s = r.get_zindex();
			cr.arrayRemove(this.layer.instances, i);
			if (i < s) s--;
			if (n) s++;
			if (s === this.layer.instances.length) this.layer.instances.push(this);
			else this.layer.instances.splice(s, 0, this);
			this.layer.zindices_stale = true;
			this.runtime.redraw = true
		};
		c.LayerNumber = function(e) {
			e.set_int(this.layer.number)
		};
		c.LayerName = function(e) {
			e.set_string(this.layer.name)
		};
		c.ZIndex = function(e) {
			e.set_int(this.get_zindex())
		}
	}
	if (a) {
		l.SetEffectEnabled = function(e, t) {
			if (!this.runtime.glwrap) return;
			var n = this.type.getEffectIndexByName(t);
			if (n < 0) return;
			var r = e === 1;
			if (this.active_effect_flags[n] === r) return;
			this.active_effect_flags[n] = r;
			this.updateActiveEffects();
			this.runtime.redraw = true
		};
		l.SetEffectParam = function(e, t, n) {
			if (!this.runtime.glwrap) return;
			var r = this.type.getEffectIndexByName(e);
			if (r < 0) return;
			var i = this.type.effect_types[r];
			var s = this.effect_params[r];
			t = Math.floor(t);
			if (t < 0 || t >= s.length) return;
			if (this.runtime.glwrap.getProgramParameterType(i.shaderindex, t) === 1) n /= 100;
			if (s[t] === n) return;
			s[t] = n;
			if (i.active) this.runtime.redraw = true
		}
	}
};
cr.set_bbox_changed = function() {
	this.bbox_changed = true;
	this.runtime.redraw = true;
	var e, t;
	for (e = 0, t = this.bbox_changed_callbacks.length; e < t; e++) {
		this.bbox_changed_callbacks[e](this)
	}
};
cr.add_bbox_changed_callback = function(e) {
	if (e) this.bbox_changed_callbacks.push(e)
};
cr.update_bbox = function() {
	if (!this.bbox_changed) return;
	this.bbox.set(this.x, this.y, this.x + this.width, this.y + this.height);
	this.bbox.offset(-this.hotspotX * this.width, -this.hotspotY * this.height);
	if (!this.angle) {
		this.bquad.set_from_rect(this.bbox)
	} else {
		this.bbox.offset(-this.x, -this.y);
		this.bquad.set_from_rotated_rect(this.bbox, this.angle);
		this.bquad.offset(this.x, this.y);
		this.bquad.bounding_box(this.bbox)
	}
	var e = 0;
	if (this.bbox.left > this.bbox.right) {
		e = this.bbox.left;
		this.bbox.left = this.bbox.right;
		this.bbox.right = e
	}
	if (this.bbox.top > this.bbox.bottom) {
		e = this.bbox.top;
		this.bbox.top = this.bbox.bottom;
		this.bbox.bottom = e
	}
	this.bbox_changed = false
};
cr.inst_contains_pt = function(e, t) {
	if (!this.bbox.contains_pt(e, t)) return false;
	if (!this.bquad.contains_pt(e, t)) return false;
	if (this.collision_poly && !this.collision_poly.is_empty()) {
		this.collision_poly.cache_poly(this.width, this.height, this.angle);
		return this.collision_poly.contains_pt(e - this.x, t - this.y)
	} else return true
};
cr.inst_get_iid = function() {
	this.type.updateIIDs();
	return this.iid
};
cr.inst_get_zindex = function() {
	this.layer.updateZIndices();
	return this.zindex
};
cr.inst_updateActiveEffects = function() {
	this.active_effect_types.length = 0;
	var e, t, n, r;
	for (e = 0, t = this.active_effect_flags.length; e < t; e++) {
		if (this.active_effect_flags[e]) this.active_effect_types.push(this.type.effect_types[e])
	}
	this.uses_shaders = !! this.active_effect_types.length
};
cr.inst_toString = function() {
	return "Inst" + this.puid
};
cr.type_getFirstPicked = function(e) {
	if (e && e.is_contained && e.type != this) {
		var t, n, r;
		for (t = 0, n = e.siblings.length; t < n; t++) {
			r = e.siblings[t];
			if (r.type == this) return r
		}
	}
	var i = this.getCurrentSol().getObjects();
	if (i.length) return i[0];
	else return null
};
cr.type_getPairedInstance = function(e) {
	var t = this.getCurrentSol().getObjects();
	if (t.length) return t[e.get_iid() % t.length];
	else return null
};
cr.type_updateIIDs = function() {
	if (!this.stale_iids || this.is_family) return;
	var e, t;
	for (e = 0, t = this.instances.length; e < t; e++) this.instances[e].iid = e;
	var n = e;
	var r = this.runtime.createRow;
	for (e = 0, t = r.length; e < t; ++e) {
		if (r[e].type === this) r[e].iid = n++
	}
	this.stale_iids = false
};
cr.type_getCurrentSol = function() {
	return this.solstack[this.cur_sol]
};
cr.type_pushCleanSol = function() {
	this.cur_sol++;
	if (this.cur_sol === this.solstack.length) this.solstack.push(new cr.selection(this));
	else this.solstack[this.cur_sol].select_all = true
};
cr.type_pushCopySol = function() {
	this.cur_sol++;
	if (this.cur_sol === this.solstack.length) this.solstack.push(new cr.selection(this));
	var e = this.solstack[this.cur_sol];
	var t = this.solstack[this.cur_sol - 1];
	if (t.select_all) e.select_all = true;
	else {
		e.select_all = false;
		cr.shallowAssignArray(e.instances, t.instances);
		cr.shallowAssignArray(e.else_instances, t.else_instances)
	}
};
cr.type_popSol = function() {
	this.cur_sol--
};
cr.type_getBehaviorByName = function(e) {
	var t, n, r, i, s, o = 0;
	if (!this.is_family) {
		for (t = 0, n = this.families.length; t < n; t++) {
			s = this.families[t];
			for (r = 0, i = s.behaviors.length; r < i; r++) {
				if (e === s.behaviors[r].name) {
					this.extra.lastBehIndex = o;
					return s.behaviors[r]
				}
				o++
			}
		}
	}
	for (t = 0, n = this.behaviors.length; t < n; t++) {
		if (e === this.behaviors[t].name) {
			this.extra.lastBehIndex = o;
			return this.behaviors[t]
		}
		o++
	}
	return null
};
cr.type_getBehaviorIndexByName = function(e) {
	var t = this.getBehaviorByName(e);
	if (t) return this.extra.lastBehIndex;
	else return -1
};
cr.type_getEffectIndexByName = function(e) {
	var t, n;
	for (t = 0, n = this.effect_types.length; t < n; t++) {
		if (this.effect_types[t].name === e) return t
	}
	return -1
};
cr.type_applySolToContainer = function() {
	if (!this.is_contained || this.is_family) return;
	var e, t, n, r, i, s, o;
	this.updateIIDs();
	s = this.getCurrentSol();
	var u = s.select_all;
	var a = this.runtime.getCurrentEventStack();
	var f = a && a.current_event && a.current_event.orblock;
	for (e = 0, t = this.container.length; e < t; e++) {
		i = this.container[e];
		if (i === this) continue;
		i.updateIIDs();
		o = i.getCurrentSol();
		o.select_all = u;
		if (!u) {
			o.instances.length = s.instances.length;
			for (n = 0, r = s.instances.length; n < r; n++) o.instances[n] = i.instances[s.instances[n].iid];
			if (f) {
				o.else_instances.length = s.else_instances.length;
				for (n = 0, r = s.else_instances.length; n < r; n++) o.else_instances[n] = i.instances[s.else_instances[n].iid]
			}
		}
	}
};
cr.type_toString = function() {
	return "Type" + this.sid
};
cr.do_cmp = function(e, t, n) {
	if (typeof e === "undefined" || typeof n === "undefined") return false;
	switch (t) {
	case 0:
		return e === n;
	case 1:
		return e !== n;
	case 2:
		return e < n;
	case 3:
		return e <= n;
	case 4:
		return e > n;
	case 5:
		return e >= n;
	default:
		return false
	}
};
cr.shaders = {};
cr.plugins_.Browser = function(e) {
	this.runtime = e
};
(function() {
	function Cnds() {}
	function Acts() {}
	function onFullscreenError() {
		if (typeof jQuery !== "undefined") {
			crruntime["setSize"](jQuery(window).width(), jQuery(window).height())
		}
	}
	function Exps() {}
	var pluginProto = cr.plugins_.Browser.prototype;
	pluginProto.Type = function(e) {
		this.plugin = e;
		this.runtime = e.runtime
	};
	var typeProto = pluginProto.Type.prototype;
	typeProto.onCreate = function() {};
	pluginProto.Instance = function(e) {
		this.type = e;
		this.runtime = e.runtime
	};
	var instanceProto = pluginProto.Instance.prototype;
	instanceProto.onCreate = function() {
		var e = this;
		window.addEventListener("resize", function() {
			e.runtime.trigger(cr.plugins_.Browser.prototype.cnds.OnResize, e)
		});
		if (typeof navigator.onLine !== "undefined") {
			window.addEventListener("online", function() {
				e.runtime.trigger(cr.plugins_.Browser.prototype.cnds.OnOnline, e)
			});
			window.addEventListener("offline", function() {
				e.runtime.trigger(cr.plugins_.Browser.prototype.cnds.OnOffline, e)
			})
		}
		if (typeof window.applicationCache !== "undefined") {
			window.applicationCache.addEventListener("updateready", function() {
				e.runtime.loadingprogress = 1;
				e.runtime.trigger(cr.plugins_.Browser.prototype.cnds.OnUpdateReady, e)
			});
			window.applicationCache.addEventListener("progress", function(t) {
				e.runtime.loadingprogress = t["loaded"] / t["total"]
			})
		}
		if (!this.runtime.isDirectCanvas) {
			document.addEventListener("appMobi.device.update.available", function() {
				e.runtime.trigger(cr.plugins_.Browser.prototype.cnds.OnUpdateReady, e)
			});
			document.addEventListener("menubutton", function() {
				e.runtime.trigger(cr.plugins_.Browser.prototype.cnds.OnMenuButton, e)
			});
			document.addEventListener("searchbutton", function() {
				e.runtime.trigger(cr.plugins_.Browser.prototype.cnds.OnSearchButton, e)
			});
			document.addEventListener("tizenhwkey", function(t) {
				var n;
				switch (t["keyName"]) {
				case "back":
					n = e.runtime.trigger(cr.plugins_.Browser.prototype.cnds.OnBackButton, e);
					if (!n) {
						if (window["tizen"]) window["tizen"]["application"]["getCurrentApplication"]()["exit"]()
					}
					break;
				case "menu":
					n = e.runtime.trigger(cr.plugins_.Browser.prototype.cnds.OnMenuButton, e);
					if (!n) t.preventDefault();
					break
				}
			})
		}
		this.runtime.addSuspendCallback(function(t) {
			if (t) {
				e.runtime.trigger(cr.plugins_.Browser.prototype.cnds.OnPageHidden, e)
			} else {
				e.runtime.trigger(cr.plugins_.Browser.prototype.cnds.OnPageVisible, e)
			}
		});
		this.is_arcade = typeof window["is_scirra_arcade"] !== "undefined";
		this.fullscreenOldMarginCss = ""
	};
	Cnds.prototype.CookiesEnabled = function() {
		return navigator ? navigator.cookieEnabled : false
	};
	Cnds.prototype.IsOnline = function() {
		return navigator ? navigator.onLine : false
	};
	Cnds.prototype.HasJava = function() {
		return navigator ? navigator.javaEnabled() : false
	};
	Cnds.prototype.OnOnline = function() {
		return true
	};
	Cnds.prototype.OnOffline = function() {
		return true
	};
	Cnds.prototype.IsDownloadingUpdate = function() {
		if (typeof window["applicationCache"] === "undefined") return false;
		else return window["applicationCache"]["status"] === window["applicationCache"]["DOWNLOADING"]
	};
	Cnds.prototype.OnUpdateReady = function() {
		return true
	};
	Cnds.prototype.PageVisible = function() {
		return !this.runtime.isSuspended
	};
	Cnds.prototype.OnPageVisible = function() {
		return true
	};
	Cnds.prototype.OnPageHidden = function() {
		return true
	};
	Cnds.prototype.OnResize = function() {
		return true
	};
	Cnds.prototype.IsFullscreen = function() {
		return !!(document["mozFullScreen"] || document["webkitIsFullScreen"] || document["fullScreen"] || this.runtime.isNodeFullscreen)
	};
	Cnds.prototype.OnBackButton = function() {
		return true
	};
	Cnds.prototype.OnMenuButton = function() {
		return true
	};
	Cnds.prototype.OnSearchButton = function() {
		return true
	};
	Cnds.prototype.IsMetered = function() {
		var e = navigator["connection"] || navigator["mozConnection"] || navigator["webkitConnection"];
		if (!e) return false;
		return e["metered"]
	};
	Cnds.prototype.IsCharging = function() {
		var e = navigator["battery"] || navigator["mozBattery"] || navigator["webkitBattery"];
		if (!e) return true;
		return e["charging"]
	};
	Cnds.prototype.IsPortraitLandscape = function(e) {
		var t = window.innerWidth <= window.innerHeight ? 0 : 1;
		return t === e
	};
	pluginProto.cnds = new Cnds;
	Acts.prototype.Alert = function(e) {
		if (!this.runtime.isDomFree) alert(e.toString())
	};
	Acts.prototype.Close = function() {
		if (this.runtime.isCocoonJs) CocoonJS["App"]["forceToFinish"]();
		else if (!this.is_arcade && !this.runtime.isDomFree) window.close()
	};
	Acts.prototype.Focus = function() {
		if (this.runtime.isNodeWebkit) {
			var e = window["nwgui"]["Window"]["get"]();
			e["focus"]()
		} else if (!this.is_arcade && !this.runtime.isDomFree) window.focus()
	};
	Acts.prototype.Blur = function() {
		if (this.runtime.isNodeWebkit) {
			var e = window["nwgui"]["Window"]["get"]();
			e["blur"]()
		} else if (!this.is_arcade && !this.runtime.isDomFree) window.blur()
	};
	Acts.prototype.GoBack = function() {
		if (!this.is_arcade && !this.runtime.isDomFree && window.back) window.back()
	};
	Acts.prototype.GoForward = function() {
		if (!this.is_arcade && !this.runtime.isDomFree && window.forward) window.forward()
	};
	Acts.prototype.GoHome = function() {
		if (!this.is_arcade && !this.runtime.isDomFree && window.home) window.home()
	};
	Acts.prototype.GoToURL = function(e) {
		if (this.runtime.isCocoonJs) CocoonJS["App"]["openURL"](e);
		else if (!this.is_arcade && !this.runtime.isDomFree) window.location = e
	};
	Acts.prototype.GoToURLWindow = function(e, t) {
		if (this.runtime.isCocoonJs) CocoonJS["App"]["openURL"](e);
		else if (!this.is_arcade && !this.runtime.isDomFree) window.open(e, t)
	};
	Acts.prototype.Reload = function() {
		if (!this.is_arcade && !this.runtime.isDomFree) window.location.reload()
	};
	var firstRequestFullscreen = true;
	var crruntime = null;
	Acts.prototype.RequestFullScreen = function(e) {
		if (this.runtime.isDomFree) {
			cr.logexport("[Construct 2] Requesting fullscreen is not supported on this platform - the request has been ignored");
			return
		}
		if (e >= 2) e += 1;
		if (e === 6) e = 2;
		if (this.runtime.isNodeWebkit) {
			if (!this.runtime.isNodeFullscreen) {
				window["nwgui"]["Window"]["get"]()["enterFullscreen"]();
				this.runtime.isNodeFullscreen = true
			}
		} else {
			if (document["mozFullScreen"] || document["webkitIsFullScreen"] || !! document["msFullscreenElement"] || document["fullScreen"]) {
				return
			}
			this.fullscreenOldMarginCss = jQuery(this.runtime.canvasdiv).css("margin");
			jQuery(this.runtime.canvasdiv).css("margin", "0");
			window["c2resizestretchmode"] = e > 0 ? 1 : 0;
			this.runtime.fullscreen_scaling = e >= 2 ? e : 0;
			var t = this.runtime.canvasdiv || this.runtime.canvas;
			if (firstRequestFullscreen) {
				firstRequestFullscreen = false;
				crruntime = this.runtime;
				t.addEventListener("mozfullscreenerror", onFullscreenError);
				t.addEventListener("webkitfullscreenerror", onFullscreenError);
				t.addEventListener("msfullscreenerror", onFullscreenError);
				t.addEventListener("fullscreenerror", onFullscreenError)
			}
			if (!cr.is_undefined(t["webkitRequestFullScreen"])) {
				if (typeof Element !== "undefined" && typeof Element["ALLOW_KEYBOARD_INPUT"] !== "undefined") t["webkitRequestFullScreen"](Element["ALLOW_KEYBOARD_INPUT"]);
				else t["webkitRequestFullScreen"]()
			} else if (!cr.is_undefined(t["mozRequestFullScreen"])) t["mozRequestFullScreen"]();
			else if (!cr.is_undefined(t["msRequestFullscreen"])) t["msRequestFullscreen"]();
			else if (!cr.is_undefined(t["requestFullscreen"])) t["requestFullscreen"]()
		}
	};
	Acts.prototype.CancelFullScreen = function() {
		if (this.runtime.isDomFree) {
			cr.logexport("[Construct 2] Exiting fullscreen is not supported on this platform - the request has been ignored");
			return
		}
		if (this.runtime.isNodeWebkit) {
			if (this.runtime.isNodeFullscreen) {
				window["nwgui"]["Window"]["get"]()["leaveFullscreen"]();
				this.runtime.isNodeFullscreen = false
			}
		} else {
			if (!cr.is_undefined(document["webkitCancelFullScreen"])) document["webkitCancelFullScreen"]();
			else if (!cr.is_undefined(document["mozCancelFullScreen"])) document["mozCancelFullScreen"]();
			else if (!cr.is_undefined(document["msExitFullscreen"])) document["msExitFullscreen"]();
			else if (!cr.is_undefined(document["exitFullscreen"])) document["exitFullscreen"]();
			jQuery(this.runtime.canvasdiv).css("margin", this.fullscreenOldMarginCss)
		}
	};
	Acts.prototype.Vibrate = function(e) {
		try {
			var t = e.split(",");
			var n, r;
			for (n = 0, r = t.length; n < r; n++) {
				t[n] = parseInt(t[n], 10)
			}
			if (navigator["vibrate"]) navigator["vibrate"](t);
			else if (navigator["mozVibrate"]) navigator["mozVibrate"](t);
			else if (navigator["webkitVibrate"]) navigator["webkitVibrate"](t)
		} catch (i) {}
	};
	Acts.prototype.InvokeDownload = function(e, t) {
		var n = document.createElement("a");
		if (typeof n.download === "undefined") {
			window.open(e)
		} else {
			var r = document.getElementsByTagName("body")[0];
			n.textContent = t;
			n.href = e;
			n.download = t;
			r.appendChild(n);
			var i = document.createEvent("MouseEvent");
			alert("ddd");
			i.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
			n.dispatchEvent(i);
			r.removeChild(n)
		}
	};
	Acts.prototype.ConsoleLog = function(e, t) {
		if (!console) return;
		if (e === 0 && console.log) console.log(t.toString());
		if (e === 1 && console.warn) console.warn(t.toString());
		if (e === 2 && console.error) console.error(t.toString())
	};
	Acts.prototype.ConsoleGroup = function(e) {
		if (console && console.group) console.group(e)
	};
	Acts.prototype.ConsoleGroupEnd = function() {
		if (console && console.groupEnd) console.groupEnd()
	};
	Acts.prototype.ExecJs = function(js_) {
		if (eval) eval(js_)
	};
	var orientations = ["portrait", "landscape", "portrait-primary", "portrait-secondary", "landscape-primary", "landscape-secondary"];
	Acts.prototype.LockOrientation = function(e) {
		e = Math.floor(e);
		if (e < 0 || e >= orientations.length) return;
		var t = orientations[e];
		if (screen["lockOrientation"]) screen["lockOrientation"](t);
		else if (screen["webkitLockOrientation"]) screen["webkitLockOrientation"](t);
		else if (screen["mozLockOrientation"]) screen["mozLockOrientation"](t);
		else if (screen["msLockOrientation"]) screen["msLockOrientation"](t)
	};
	Acts.prototype.UnlockOrientation = function() {
		if (screen["unlockOrientation"]) screen["unlockOrientation"]();
		else if (screen["webkitUnlockOrientation"]) screen["webkitUnlockOrientation"]();
		else if (screen["mozUnlockOrientation"]) screen["mozUnlockOrientation"]();
		else if (screen["msUnlockOrientation"]) screen["msUnlockOrientation"]()
	};
	pluginProto.acts = new Acts;
	Exps.prototype.URL = function(e) {
		e.set_string(this.runtime.isDomFree ? "" : window.location.toString())
	};
	Exps.prototype.Protocol = function(e) {
		e.set_string(this.runtime.isDomFree ? "" : window.location.protocol)
	};
	Exps.prototype.Domain = function(e) {
		e.set_string(this.runtime.isDomFree ? "" : window.location.hostname)
	};
	Exps.prototype.PathName = function(e) {
		e.set_string(this.runtime.isDomFree ? "" : window.location.pathname)
	};
	Exps.prototype.Hash = function(e) {
		e.set_string(this.runtime.isDomFree ? "" : window.location.hash)
	};
	Exps.prototype.Referrer = function(e) {
		e.set_string(this.runtime.isDomFree ? "" : document.referrer)
	};
	Exps.prototype.Title = function(e) {
		e.set_string(this.runtime.isDomFree ? "" : document.title)
	};
	Exps.prototype.Name = function(e) {
		e.set_string(this.runtime.isDomFree ? "" : navigator.appName)
	};
	Exps.prototype.Version = function(e) {
		e.set_string(this.runtime.isDomFree ? "" : navigator.appVersion)
	};
	Exps.prototype.Language = function(e) {
		if (navigator && navigator.language) e.set_string(navigator.language);
		else e.set_string("")
	};
	Exps.prototype.Platform = function(e) {
		e.set_string(this.runtime.isDomFree ? "" : navigator.platform)
	};
	Exps.prototype.Product = function(e) {
		if (navigator && navigator.product) e.set_string(navigator.product);
		else e.set_string("")
	};
	Exps.prototype.Vendor = function(e) {
		if (navigator && navigator.vendor) e.set_string(navigator.vendor);
		else e.set_string("")
	};
	Exps.prototype.UserAgent = function(e) {
		e.set_string(this.runtime.isDomFree ? "" : navigator.userAgent)
	};
	Exps.prototype.QueryString = function(e) {
		e.set_string(this.runtime.isDomFree ? "" : window.location.search)
	};
	Exps.prototype.QueryParam = function(e, t) {
		if (this.runtime.isDomFree) {
			e.set_string("");
			return
		}
		var n = RegExp("[?&]" + t + "=([^&]*)").exec(window.location.search);
		if (n) e.set_string(decodeURIComponent(n[1].replace(/\+/g, " ")));
		else e.set_string("")
	};
	Exps.prototype.Bandwidth = function(e) {
		var t = navigator["connection"] || navigator["mozConnection"] || navigator["webkitConnection"];
		if (!t) e.set_float(Number.POSITIVE_INFINITY);
		else e.set_float(t["bandwidth"])
	};
	Exps.prototype.BatteryLevel = function(e) {
		var t = navigator["battery"] || navigator["mozBattery"] || navigator["webkitBattery"];
		if (!t) e.set_float(1);
		else e.set_float(t["level"])
	};
	Exps.prototype.BatteryTimeLeft = function(e) {
		var t = navigator["battery"] || navigator["mozBattery"] || navigator["webkitBattery"];
		if (!t) e.set_float(Number.POSITIVE_INFINITY);
		else e.set_float(t["dischargingTime"])
	};
	Exps.prototype.ExecJS = function(ret, js_) {
		if (!eval) {
			ret.set_any(0);
			return
		}
		var result = eval(js_);
		if (typeof result === "number") ret.set_any(result);
		else if (typeof result === "string") ret.set_any(result);
		else if (typeof result === "boolean") ret.set_any(result ? 1 : 0);
		else ret.set_any(0)
	};
	Exps.prototype.ScreenWidth = function(e) {
		e.set_int(screen.width)
	};
	Exps.prototype.ScreenHeight = function(e) {
		e.set_int(screen.height)
	};
	Exps.prototype.DevicePixelRatio = function(e) {
		e.set_float(this.runtime.devicePixelRatio)
	};
	pluginProto.exps = new Exps
})();
cr.plugins_.Mouse = function(e) {
	this.runtime = e
};
(function() {
	function i() {}
	function s() {}
	function o() {}
	var e = cr.plugins_.Mouse.prototype;
	e.Type = function(e) {
		this.plugin = e;
		this.runtime = e.runtime
	};
	var t = e.Type.prototype;
	t.onCreate = function() {};
	e.Instance = function(e) {
		this.type = e;
		this.runtime = e.runtime;
		this.buttonMap = new Array(4);
		this.mouseXcanvas = 0;
		this.mouseYcanvas = 0;
		this.triggerButton = 0;
		this.triggerType = 0;
		this.triggerDir = 0;
		this.handled = false
	};
	var n = e.Instance.prototype;
	n.onCreate = function() {
		var e = this;
		if (!this.runtime.isDomFree) {
			jQuery(document).mousemove(function(t) {
				e.onMouseMove(t)
			});
			jQuery(document).mousedown(function(t) {
				e.onMouseDown(t)
			});
			jQuery(document).mouseup(function(t) {
				e.onMouseUp(t)
			}); /*jQuery(document).dblclick(function(t){e.onDoubleClick(t)});var t=function(t){e.onWheel(t)};document.addEventListener("mousewheel",t,false);document.addEventListener("DOMMouseScroll",t,false)*/
		}
	};
	var r = {
		left: 0,
		top: 0
	};
	n.onMouseMove = function(e) {
		var t = this.runtime.isDomFree ? r : jQuery(this.runtime.canvas).offset();
		this.mouseXcanvas = e.pageX - t.left;
		this.mouseYcanvas = e.pageY - t.top
	};
	n.mouseInGame = function() {
		if (this.runtime.fullscreen_mode > 0) return true;
		return this.mouseXcanvas >= 0 && this.mouseYcanvas >= 0 && this.mouseXcanvas < this.runtime.width && this.mouseYcanvas < this.runtime.height
	};
	n.onMouseDown = function(e) {
		if (!this.mouseInGame()) return;
		if (this.runtime.had_a_click) e.preventDefault();
		this.buttonMap[e.which] = true;
		this.runtime.trigger(cr.plugins_.Mouse.prototype.cnds.OnAnyClick, this);
		this.triggerButton = e.which - 1;
		this.triggerType = 0;
		this.runtime.trigger(cr.plugins_.Mouse.prototype.cnds.OnClick, this);
		this.runtime.trigger(cr.plugins_.Mouse.prototype.cnds.OnObjectClicked, this);
	};
	n.onMouseUp = function(e) {
		if (!this.buttonMap[e.which]) return;
		if (this.runtime.had_a_click) e.preventDefault();
		this.runtime.had_a_click = true;
		this.buttonMap[e.which] = false;
		this.triggerButton = e.which - 1;
		this.runtime.trigger(cr.plugins_.Mouse.prototype.cnds.OnRelease, this);
	};
	n.onDoubleClick = function(e) {
		if (!this.mouseInGame()) return;
		e.preventDefault();
		this.triggerButton = e.which - 1;
		this.triggerType = 1;
		this.runtime.trigger(cr.plugins_.Mouse.prototype.cnds.OnClick, this);
		this.runtime.trigger(cr.plugins_.Mouse.prototype.cnds.OnObjectClicked, this)
	};
	n.onWheel = function(e) {
		var t = e.wheelDelta ? e.wheelDelta : e.detail ? -e.detail : 0;
		this.triggerDir = t < 0 ? 0 : 1;
		this.handled = false;
		this.runtime.trigger(cr.plugins_.Mouse.prototype.cnds.OnWheel, this);
		if (this.handled) e.preventDefault()
	};
	i.prototype.OnClick = function(e, t) {
		return e === this.triggerButton && t === this.triggerType
	};
	i.prototype.OnAnyClick = function() {
		return true
	};
	i.prototype.IsButtonDown = function(e) {
		return this.buttonMap[e + 1]
	};
	i.prototype.OnRelease = function(e) {
		return e === this.triggerButton
	};
	i.prototype.IsOverObject = function(e) {
		var t = this.runtime.getCurrentCondition();
		var n = this.mouseXcanvas;
		var r = this.mouseYcanvas;
		return cr.xor(this.runtime.testAndSelectCanvasPointOverlap(e, n, r, t.inverted), t.inverted)
	};
	i.prototype.OnObjectClicked = function(e, t, n) {
		if (e !== this.triggerButton || t !== this.triggerType) return false;
		return this.runtime.testAndSelectCanvasPointOverlap(n, this.mouseXcanvas, this.mouseYcanvas, false);
	};
	i.prototype.OnWheel = function(e) {
		this.handled = true;
		return e === this.triggerDir
	};
	e.cnds = new i;
	s.prototype.SetCursor = function(e) {
		var t = ["auto", "pointer", "text", "crosshair", "move", "help", "wait", "none"][e];
		if (this.runtime.canvas && this.runtime.canvas.style) this.runtime.canvas.style.cursor = t
	};
	s.prototype.SetCursorSprite = function(e) {
		if (this.runtime.isDomFree || this.runtime.isMobile || !e) return;
		var t = e.getFirstPicked();
		if (!t || !t.curFrame) return;
		var n = t.curFrame;
		var r = n.getDataUri();
		var i = "url(" + r + ") " + Math.round(n.hotspotX * n.width) + " " + Math.round(n.hotspotY * n.height) + ", auto";
		jQuery(this.runtime.canvas).css("cursor", i)
	};
	e.acts = new s;
	o.prototype.X = function(e, t) {
		var n, r, i, s, o;
		if (cr.is_undefined(t)) {
			n = this.runtime.getLayerByNumber(0);
			r = n.scale;
			i = n.zoomRate;
			s = n.parallaxX;
			o = n.angle;
			n.scale = this.runtime.running_layout.scale;
			n.zoomRate = 1;
			n.parallaxX = 1;
			n.angle = this.runtime.running_layout.angle;
			e.set_float(n.canvasToLayer(this.mouseXcanvas, this.mouseYcanvas, true));
			n.scale = r;
			n.zoomRate = i;
			n.parallaxX = s;
			n.angle = o
		} else {
			if (cr.is_number(t)) n = this.runtime.getLayerByNumber(t);
			else n = this.runtime.getLayerByName(t);
			if (n) e.set_float(n.canvasToLayer(this.mouseXcanvas, this.mouseYcanvas, true));
			else e.set_float(0)
		}
	};
	o.prototype.Y = function(e, t) {
		var n, r, i, s, o;
		if (cr.is_undefined(t)) {
			n = this.runtime.getLayerByNumber(0);
			r = n.scale;
			i = n.zoomRate;
			s = n.parallaxY;
			o = n.angle;
			n.scale = this.runtime.running_layout.scale;
			n.zoomRate = 1;
			n.parallaxY = 1;
			n.angle = this.runtime.running_layout.angle;
			e.set_float(n.canvasToLayer(this.mouseXcanvas, this.mouseYcanvas, false));
			n.scale = r;
			n.zoomRate = i;
			n.parallaxY = s;
			n.angle = o
		} else {
			if (cr.is_number(t)) n = this.runtime.getLayerByNumber(t);
			else n = this.runtime.getLayerByName(t);
			if (n) e.set_float(n.canvasToLayer(this.mouseXcanvas, this.mouseYcanvas, false));
			else e.set_float(0)
		}
	};
	o.prototype.AbsoluteX = function(e) {
		e.set_float(this.mouseXcanvas)
	};
	o.prototype.AbsoluteY = function(e) {
		e.set_float(this.mouseYcanvas)
	};
	e.exps = new o
})();
cr.plugins_.Particles = function(e) {
	this.runtime = e
};
(function() {
	function n(e) {
		this.owner = e;
		this.active = false;
		this.x = 0;
		this.y = 0;
		this.speed = 0;
		this.angle = 0;
		this.opacity = 1;
		this.grow = 0;
		this.size = 0;
		this.gs = 0;
		this.age = 0;
		cr.seal(this)
	}
	function s() {}
	function o() {}
	function u() {}
	var e = cr.plugins_.Particles.prototype;
	e.Type = function(e) {
		this.plugin = e;
		this.runtime = e.runtime
	};
	var t = e.Type.prototype;
	t.onCreate = function() {
		if (this.is_family) return;
		this.texture_img = new Image;
		this.texture_img["idtkLoadDisposed"] = true;
		this.texture_img.src = this.texture_file;
		this.texture_img.cr_filesize = this.texture_filesize;
		this.webGL_texture = null;
		this.runtime.wait_for_textures.push(this.texture_img)
	};
	t.onLostWebGLContext = function() {
		if (this.is_family) return;
		this.webGL_texture = null
	};
	t.onRestoreWebGLContext = function() {
		if (this.is_family || !this.instances.length) return;
		if (!this.webGL_texture) {
			this.webGL_texture = this.runtime.glwrap.loadTexture(this.texture_img, true, this.runtime.linearSampling, this.texture_pixelformat)
		}
	};
	t.loadTextures = function() {
		if (this.is_family || this.webGL_texture || !this.runtime.glwrap) return;
		this.webGL_texture = this.runtime.glwrap.loadTexture(this.texture_img, true, this.runtime.linearSampling, this.texture_pixelformat)
	};
	t.unloadTextures = function() {
		if (this.is_family || this.instances.length || !this.webGL_texture) return;
		this.runtime.glwrap.deleteTexture(this.webGL_texture);
		this.webGL_texture = null
	};
	t.preloadCanvas2D = function(e) {
		e.drawImage(this.texture_img, 0, 0)
	};
	n.prototype.init = function() {
		var e = this.owner;
		this.x = e.x - e.xrandom / 2 + Math.random() * e.xrandom;
		this.y = e.y - e.yrandom / 2 + Math.random() * e.yrandom;
		this.speed = e.initspeed - e.speedrandom / 2 + Math.random() * e.speedrandom;
		this.angle = e.angle - e.spraycone / 2 + Math.random() * e.spraycone;
		this.opacity = e.initopacity;
		this.size = e.initsize - e.sizerandom / 2 + Math.random() * e.sizerandom;
		this.grow = e.growrate - e.growrandom / 2 + Math.random() * e.growrandom;
		this.gs = 0;
		this.age = 0
	};
	n.prototype.tick = function(e) {
		var t = this.owner;
		this.x += Math.cos(this.angle) * this.speed * e;
		this.y += Math.sin(this.angle) * this.speed * e;
		this.y += this.gs * e;
		this.speed += t.acc * e;
		this.size += this.grow * e;
		this.gs += t.g * e;
		this.age += e;
		if (this.size < 1) {
			this.active = false;
			return
		}
		if (t.lifeanglerandom !== 0) this.angle += Math.random() * t.lifeanglerandom * e - t.lifeanglerandom * e / 2;
		if (t.lifespeedrandom !== 0) this.speed += Math.random() * t.lifespeedrandom * e - t.lifespeedrandom * e / 2;
		if (t.lifeopacityrandom !== 0) {
			this.opacity += Math.random() * t.lifeopacityrandom * e - t.lifeopacityrandom * e / 2;
			if (this.opacity < 0) this.opacity = 0;
			else if (this.opacity > 1) this.opacity = 1
		}
		if (t.destroymode <= 1 && this.age >= t.timeout) {
			this.active = false
		}
		if (t.destroymode === 2 && this.speed <= 0) {
			this.active = false
		}
	};
	n.prototype.draw = function(e) {
		var t = this.owner.opacity * this.opacity;
		if (t === 0) return;
		if (this.owner.destroymode === 0) t *= 1 - this.age / this.owner.timeout;
		e.globalAlpha = t;
		var n = this.x - this.size / 2;
		var r = this.y - this.size / 2;
		if (this.owner.runtime.pixel_rounding) {
			n = n + .5 | 0;
			r = r + .5 | 0
		}
		e.drawImage(this.owner.type.texture_img, n, r, this.size, this.size)
	};
	n.prototype.drawGL = function(e) {
		var t = this.owner.opacity * this.opacity;
		if (this.owner.destroymode === 0) t *= 1 - this.age / this.owner.timeout;
		var n = this.size;
		var r = n * this.owner.particlescale;
		var i = this.x - n / 2;
		var s = this.y - n / 2;
		if (this.owner.runtime.pixel_rounding) {
			i = i + .5 | 0;
			s = s + .5 | 0
		}
		if (r < 1 || t === 0) return;
		if (r < e.minPointSize || r > e.maxPointSize) {
			e.setOpacity(t);
			e.quad(i, s, i + n, s, i + n, s + n, i, s + n)
		} else e.point(this.x, this.y, r, t)
	};
	n.prototype.left = function() {
		return this.x - this.size / 2
	};
	n.prototype.right = function() {
		return this.x + this.size / 2
	};
	n.prototype.top = function() {
		return this.y - this.size / 2
	};
	n.prototype.bottom = function() {
		return this.y + this.size / 2
	};
	e.Instance = function(e) {
		this.type = e;
		this.runtime = e.runtime
	};
	var r = e.Instance.prototype;
	var i = [];
	r.onCreate = function() {
		var e = this.properties;
		this.rate = e[0];
		this.spraycone = cr.to_radians(e[1]);
		this.spraytype = e[2];
		this.spraying = true;
		this.initspeed = e[3];
		this.initsize = e[4];
		this.initopacity = e[5] / 100;
		this.growrate = e[6];
		this.xrandom = e[7];
		this.yrandom = e[8];
		this.speedrandom = e[9];
		this.sizerandom = e[10];
		this.growrandom = e[11];
		this.acc = e[12];
		this.g = e[13];
		this.lifeanglerandom = e[14];
		this.lifespeedrandom = e[15];
		this.lifeopacityrandom = e[16];
		this.destroymode = e[17];
		this.timeout = e[18];
		this.particleCreateCounter = 0;
		this.particlescale = 1;
		this.particleBoxLeft = this.x;
		this.particleBoxTop = this.y;
		this.particleBoxRight = this.x;
		this.particleBoxBottom = this.y;
		this.add_bbox_changed_callback(function(e) {
			e.bbox.set(e.particleBoxLeft, e.particleBoxTop, e.particleBoxRight, e.particleBoxBottom);
			e.bquad.set_from_rect(e.bbox);
			e.bbox_changed = false
		});
		if (!this.recycled) this.particles = [];
		this.runtime.tickMe(this);
		this.type.loadTextures();
		if (this.spraytype === 1) {
			for (var t = 0; t < this.rate; t++) this.allocateParticle().opacity = 0
		}
		this.first_tick = true
	};
	r.saveToJSON = function() {
		var e = {
			r: this.rate,
			sc: this.spraycone,
			st: this.spraytype,
			s: this.spraying,
			isp: this.initspeed,
			isz: this.initsize,
			io: this.initopacity,
			gr: this.growrate,
			xr: this.xrandom,
			yr: this.yrandom,
			spr: this.speedrandom,
			szr: this.sizerandom,
			grnd: this.growrandom,
			acc: this.acc,
			g: this.g,
			lar: this.lifeanglerandom,
			lsr: this.lifespeedrandom,
			lor: this.lifeopacityrandom,
			dm: this.destroymode,
			to: this.timeout,
			pcc: this.particleCreateCounter,
			ft: this.first_tick,
			p: []
		};
		var t, n, r;
		var i = e["p"];
		for (t = 0, n = this.particles.length; t < n; t++) {
			r = this.particles[t];
			i.push([r.x, r.y, r.speed, r.angle, r.opacity, r.grow, r.size, r.gs, r.age])
		}
		return e
	};
	r.loadFromJSON = function(e) {
		this.rate = e["r"];
		this.spraycone = e["sc"];
		this.spraytype = e["st"];
		this.spraying = e["s"];
		this.initspeed = e["isp"];
		this.initsize = e["isz"];
		this.initopacity = e["io"];
		this.growrate = e["gr"];
		this.xrandom = e["xr"];
		this.yrandom = e["yr"];
		this.speedrandom = e["spr"];
		this.sizerandom = e["szr"];
		this.growrandom = e["grnd"];
		this.acc = e["acc"];
		this.g = e["g"];
		this.lifeanglerandom = e["lar"];
		this.lifespeedrandom = e["lsr"];
		this.lifeopacityrandom = e["lor"];
		this.destroymode = e["dm"];
		this.timeout = e["to"];
		this.particleCreateCounter = e["pcc"];
		this.first_tick = e["ft"];
		i.push.apply(i, this.particles);
		this.particles.length = 0;
		var t, n, r, s;
		var o = e["p"];
		for (t = 0, n = o.length; t < n; t++) {
			r = this.allocateParticle();
			s = o[t];
			r.x = s[0];
			r.y = s[1];
			r.speed = s[2];
			r.angle = s[3];
			r.opacity = s[4];
			r.grow = s[5];
			r.size = s[6];
			r.gs = s[7];
			r.age = s[8]
		}
	};
	r.onDestroy = function() {
		i.push.apply(i, this.particles);
		this.particles.length = 0
	};
	r.allocateParticle = function() {
		var e;
		if (i.length) {
			e = i.pop();
			e.owner = this
		} else e = new n(this);
		this.particles.push(e);
		e.active = true;
		return e
	};
	r.tick = function() {
		var e = this.runtime.getDt(this);
		var t, n, r, s, o;
		if (this.spraytype === 0 && this.spraying) {
			this.particleCreateCounter += e * this.rate;
			s = cr.floor(this.particleCreateCounter);
			this.particleCreateCounter -= s;
			for (t = 0; t < s; t++) {
				r = this.allocateParticle();
				r.init()
			}
		}
		this.particleBoxLeft = this.x;
		this.particleBoxTop = this.y;
		this.particleBoxRight = this.x;
		this.particleBoxBottom = this.y;
		for (t = 0, o = 0, n = this.particles.length; t < n; t++) {
			r = this.particles[t];
			this.particles[o] = r;
			this.runtime.redraw = true;
			if (this.spraytype === 1 && this.first_tick) r.init();
			r.tick(e);
			if (!r.active) {
				i.push(r);
				continue
			}
			if (r.left() < this.particleBoxLeft) this.particleBoxLeft = r.left();
			if (r.right() > this.particleBoxRight) this.particleBoxRight = r.right();
			if (r.top() < this.particleBoxTop) this.particleBoxTop = r.top();
			if (r.bottom() > this.particleBoxBottom) this.particleBoxBottom = r.bottom();
			o++
		}
		this.particles.length = o;
		this.set_bbox_changed();
		this.first_tick = false;
		if (this.spraytype === 1 && this.particles.length === 0) this.runtime.DestroyInstance(this)
	};
	r.draw = function(e) {
		var t, n, r, i = this.layer;
		for (t = 0, n = this.particles.length; t < n; t++) {
			r = this.particles[t];
			if (r.right() >= i.viewLeft && r.bottom() >= i.viewTop && r.left() <= i.viewRight && r.top() <= i.viewBottom) {
				r.draw(e)
			}
		}
	};
	r.drawGL = function(e) {
		this.particlescale = this.layer.getScale();
		e.setTexture(this.type.webGL_texture);
		var t, n, r, i = this.layer;
		for (t = 0, n = this.particles.length; t < n; t++) {
			r = this.particles[t];
			if (r.right() >= i.viewLeft && r.bottom() >= i.viewTop && r.left() <= i.viewRight && r.top() <= i.viewBottom) {
				r.drawGL(e)
			}
		}
	};
	s.prototype.IsSpraying = function() {
		return this.spraying
	};
	e.cnds = new s;
	o.prototype.SetSpraying = function(e) {
		this.spraying = e !== 0
	};
	o.prototype.SetEffect = function(e) {
		this.compositeOp = cr.effectToCompositeOp(e);
		cr.setGLBlend(this, e, this.runtime.gl);
		this.runtime.redraw = true
	};
	o.prototype.SetRate = function(e) {
		this.rate = e;
		var t, n;
		if (this.spraytype === 1 && this.first_tick) {
			if (e < this.particles.length) {
				t = this.particles.length - e;
				for (n = 0; n < t; n++) i.push(this.particles.pop())
			} else if (e > this.particles.length) {
				t = e - this.particles.length;
				for (n = 0; n < t; n++) this.allocateParticle().opacity = 0
			}
		}
	};
	o.prototype.SetSprayCone = function(e) {
		this.spraycone = cr.to_radians(e)
	};
	o.prototype.SetInitSpeed = function(e) {
		this.initspeed = e
	};
	o.prototype.SetInitSize = function(e) {
		this.initsize = e
	};
	o.prototype.SetInitOpacity = function(e) {
		this.initopacity = e / 100
	};
	o.prototype.SetGrowRate = function(e) {
		this.growrate = e
	};
	o.prototype.SetXRandomiser = function(e) {
		this.xrandom = e
	};
	o.prototype.SetYRandomiser = function(e) {
		this.yrandom = e
	};
	o.prototype.SetSpeedRandomiser = function(e) {
		this.speedrandom = e
	};
	o.prototype.SetSizeRandomiser = function(e) {
		this.sizerandom = e
	};
	o.prototype.SetGrowRateRandomiser = function(e) {
		this.growrandom = e
	};
	o.prototype.SetParticleAcc = function(e) {
		this.acc = e
	};
	o.prototype.SetGravity = function(e) {
		this.g = e
	};
	o.prototype.SetAngleRandomiser = function(e) {
		this.lifeanglerandom = e
	};
	o.prototype.SetSpeedRandomiser = function(e) {
		this.lifespeedrandom = e
	};
	o.prototype.SetOpacityRandomiser = function(e) {
		this.lifeopacityrandom = e
	};
	o.prototype.SetTimeout = function(e) {
		this.timeout = e
	};
	e.acts = new o;
	u.prototype.ParticleCount = function(e) {
		e.set_int(this.particles.length)
	};
	u.prototype.Rate = function(e) {
		e.set_float(this.rate)
	};
	u.prototype.SprayCone = function(e) {
		e.set_float(cr.to_degrees(this.spraycone))
	};
	u.prototype.InitSpeed = function(e) {
		e.set_float(this.initspeed)
	};
	u.prototype.InitSize = function(e) {
		e.set_float(this.initsize)
	};
	u.prototype.InitOpacity = function(e) {
		e.set_float(this.initopacity * 100)
	};
	u.prototype.InitGrowRate = function(e) {
		e.set_float(this.growrate)
	};
	u.prototype.XRandom = function(e) {
		e.set_float(this.xrandom)
	};
	u.prototype.YRandom = function(e) {
		e.set_float(this.yrandom)
	};
	u.prototype.InitSpeedRandom = function(e) {
		e.set_float(this.speedrandom)
	};
	u.prototype.InitSizeRandom = function(e) {
		e.set_float(this.sizerandom)
	};
	u.prototype.InitGrowRandom = function(e) {
		e.set_float(this.growrandom)
	};
	u.prototype.ParticleAcceleration = function(e) {
		e.set_float(this.acc)
	};
	u.prototype.Gravity = function(e) {
		e.set_float(this.g)
	};
	u.prototype.ParticleAngleRandom = function(e) {
		e.set_float(this.lifeanglerandom)
	};
	u.prototype.ParticleSpeedRandom = function(e) {
		e.set_float(this.lifespeedrandom)
	};
	u.prototype.ParticleOpacityRandom = function(e) {
		e.set_float(this.lifeopacityrandom)
	};
	u.prototype.Timeout = function(e) {
		e.set_float(this.timeout)
	};
	e.exps = new u
})();
cr.plugins_.Softgames = function(e) {
	this.runtime = e
};
(function() {
	function r() {}
	function i() {}
	function s() {}
	var e = cr.plugins_.Softgames.prototype;
	e.Type = function(e) {
		this.plugin = e;
		this.runtime = e.runtime
	};
	var t = e.Type.prototype;
	t.onCreate = function() {};
	e.Instance = function(e) {
		this.type = e;
		this.runtime = e.runtime
	};
	var n = e.Instance.prototype;
	n.onCreate = function() {};
	n.onDestroy = function() {};
	n.saveToJSON = function() {
		return {}
	};
	n.loadFromJSON = function(e) {};
	n.draw = function(e) {};
	n.drawGL = function(e) {};
	r.prototype.IsSuspended = function() {
		return this.runtime.isSuspended
	};
	e.cnds = new r;
	i.prototype.ConnectAPI = function() {};
	i.prototype.startGame = function() {
		SG_Hooks.start()
	};
	i.prototype.levelUp = function() {
		if (typeof window.c2_level != "integer") throw "Please use the browser-object to execute javascript that puts the current level into window.c2_level every time it changes";
		if (typeof window.c2_score != "integer") throw "Please use the browser-object to execute javascript that puts the current score into window.c2_score every time it changes";
		SG_Hooks.levelUp(window.c2_level, window.c2_score);
		if (window.c2_score > getHighScore()) localStorage["high_score"] = window.c2_score
	};
	i.prototype.gameOver = function() {
		if (typeof window.c2_level != "number") throw "Please use the browser-object to execute javascript that puts the current level into window.c2_level every time it changes";
		if (typeof window.c2_score != "number") throw "Please use the browser-object to execute javascript that puts the current score into window.c2_score every time it changes";
		if (window.c2_score > getHighScore()) {
			localStorage[gameID + "high_score"] = window.c2_score;
		}
		submitScore(window.c2_score)
	};
	i.prototype.setOrientationHandler = function() {
		if (typeof window.c2_orientationHandler != "function") throw "Please use the browser-object to execute javascript that puts the c2-function which handles orientation changes into window.c2_orientationHandler";
		SG_Hooks.setOrientationHandler(window.c2_orientationHandler)
	};
	i.prototype.setOrientationHandler = function() {
		if (typeof window.c2_resizeHandler != "function") throw "Please use the browser-object to execute javascript that puts the c2-function which handles resize events into window.c2_resizeHandler";
		SG_Hooks.setResizeHandler(window.c2_resizeHandler)
	};
	e.acts = new i;
	s.prototype.getLanguage = function(e) {
		var t = Object.prototype.toString.call(window.c2_supportedLanguages).toLowerCase() == "[object array]";
		if (!t) throw "Please use the browser-object to execute javascript that puts the languages your game supports into window.c2_supportedLanguages. example window.c2_supportedLanguages = ['en','es']";
		e.set_string(SG_Hooks.getLanguage(window.c2_supportedLanguages))
	};
	e.exps = new s
})();
cr.plugins_.Sprite = function(e) {
	this.runtime = e
};
(function() {
	function n() {
		if (this.datauri.length === 0) {
			var e = document.createElement("canvas");
			e.width = this.width;
			e.height = this.height;
			var t = e.getContext("2d");
			if (this.spritesheeted) {
				t.drawImage(this.texture_img, this.offx, this.offy, this.width, this.height, 0, 0, this.width, this.height)
			} else {
				t.drawImage(this.texture_img, 0, 0, this.width, this.height)
			}
			this.datauri = e.toDataURL("image/png")
		}
		return this.datauri
	}
	function s() {}
	function u() {
		if (o.length) return o.pop();
		else return [0, 0]
	}
	function a(e) {
		e[0] = 0;
		e[1] = 0;
		o.push(e)
	}
	function f(e, t, n) {
		var r = u();
		r[0] = t.uid;
		r[1] = n.uid;
		e.push(r)
	}
	function l(e, t, n) {
		var r = t.uid;
		var i = n.uid;
		var s, o = 0,
			u, f;
		for (s = 0, u = e.length; s < u; s++) {
			f = e[s];
			if (!(f[0] === r && f[1] === i || f[0] === i && f[1] === r)) {
				e[o][0] = e[s][0];
				e[o][1] = e[s][1];
				o++
			}
		}
		for (s = o; s < u; s++) a(e[s]);
		e.length = o
	}
	function c(e, t) {
		var n, r = 0,
			i, s, o = t.uid;
		for (n = 0, i = e.length; n < i; n++) {
			s = e[n];
			if (s[0] !== o && s[1] !== o) {
				e[r][0] = e[n][0];
				e[r][1] = e[n][1];
				r++
			}
		}
		for (n = r; n < i; n++) a(e[n]);
		e.length = r
	}
	function h(e, t, n) {
		var r = t.uid;
		var i = n.uid;
		var s, o, u;
		for (s = 0, o = e.length; s < o; s++) {
			u = e[s];
			if (u[0] === r && u[1] === i || u[0] === i && u[1] === r) return true
		}
		return false
	}
	function m(e, t, n) {
		if (!e) return false;
		var r = t !== 0 || n !== 0;
		var i, s, o = false,
			u, a, f;
		var l = this.runtime.getCurrentCondition();
		var c = l.type;
		var h = l.inverted;
		var m = e.getCurrentSol();
		var g = this.runtime.getCurrentEventStack().current_event.orblock;
		var y;
		if (m.select_all) y = m.type.instances;
		else if (g) y = m.else_instances;
		else y = m.instances;
		p = e;
		v = c !== e && !h;
		if (r) {
			i = this.x;
			s = this.y;
			this.x += t;
			this.y += n;
			this.set_bbox_changed()
		}
		for (u = 0, a = y.length; u < a; u++) {
			f = y[u];
			if (this.runtime.testOverlap(this, f)) {
				o = true;
				if (h) break;
				if (c !== e) d.add(f)
			}
		}
		if (r) {
			this.x = i;
			this.y = s;
			this.set_bbox_changed()
		}
		return o
	}
	function g() {}
	function y() {}
	var e = cr.plugins_.Sprite.prototype;
	e.Type = function(e) {
		this.plugin = e;
		this.runtime = e.runtime
	};
	var t = e.Type.prototype;
	t.onCreate = function() {
		if (this.is_family) return;
		var e, t, r, i;
		var s, o, u, a, f, l;
		this.all_frames = [];
		this.has_loaded_textures = false;
		for (e = 0, t = this.animations.length; e < t; e++) {
			s = this.animations[e];
			u = {};
			u.name = s[0];
			u.speed = s[1];
			u.loop = s[2];
			u.repeatcount = s[3];
			u.repeatto = s[4];
			u.pingpong = s[5];
			u.sid = s[6];
			u.frames = [];
			for (r = 0, i = s[7].length; r < i; r++) {
				o = s[7][r];
				a = {};
				a.texture_file = o[0];
				a.texture_filesize = o[1];
				a.offx = o[2];
				a.offy = o[3];
				a.width = o[4];
				a.height = o[5];
				a.duration = o[6];
				a.hotspotX = o[7];
				a.hotspotY = o[8];
				a.image_points = o[9];
				a.poly_pts = o[10];
				a.pixelformat = o[11];
				a.spritesheeted = a.width !== 0;
				a.datauri = "";
				a.getDataUri = n;
				l = {};
				l.left = 0;
				l.top = 0;
				l.right = 1;
				l.bottom = 1;
				a.sheetTex = l;
				a.webGL_texture = null;
				f = this.runtime.findWaitingTexture(o[0]);
				if (f) {
					a.texture_img = f
				} else {
					a.texture_img = new Image;
					a.texture_img["idtkLoadDisposed"] = true;
					a.texture_img.src = o[0];
					a.texture_img.cr_src = o[0];
					a.texture_img.cr_filesize = o[1];
					a.texture_img.c2webGL_texture = null;
					this.runtime.wait_for_textures.push(a.texture_img)
				}
				cr.seal(a);
				u.frames.push(a);
				this.all_frames.push(a)
			}
			cr.seal(u);
			this.animations[e] = u
		}
	};
	t.updateAllCurrentTexture = function() {
		var e, t, n;
		for (e = 0, t = this.instances.length; e < t; e++) {
			n = this.instances[e];
			n.curWebGLTexture = n.curFrame.webGL_texture
		}
	};
	t.onLostWebGLContext = function() {
		if (this.is_family) return;
		var e, t, n;
		for (e = 0, t = this.all_frames.length; e < t; ++e) {
			n = this.all_frames[e];
			n.texture_img.c2webGL_texture = null;
			n.webGL_texture = null
		}
	};
	t.onRestoreWebGLContext = function() {
		if (this.is_family || !this.instances.length) return;
		var e, t, n;
		for (e = 0, t = this.all_frames.length; e < t; ++e) {
			n = this.all_frames[e];
			n.webGL_texture = this.runtime.glwrap.loadTexture(n.texture_img, false, this.runtime.linearSampling, n.pixelformat)
		}
		this.updateAllCurrentTexture()
	};
	t.loadTextures = function() {
		if (this.is_family || this.has_loaded_textures || !this.runtime.glwrap) return;
		var e, t, n;
		for (e = 0, t = this.all_frames.length; e < t; ++e) {
			n = this.all_frames[e];
			n.webGL_texture = this.runtime.glwrap.loadTexture(n.texture_img, false, this.runtime.linearSampling, n.pixelformat)
		}
		this.has_loaded_textures = true
	};
	t.unloadTextures = function() {
		if (this.is_family || this.instances.length || !this.has_loaded_textures) return;
		var e, t, n;
		for (e = 0, t = this.all_frames.length; e < t; ++e) {
			n = this.all_frames[e];
			this.runtime.glwrap.deleteTexture(n.webGL_texture)
		}
		this.has_loaded_textures = false
	};
	var r = [];
	t.preloadCanvas2D = function(e) {
		var t, n, i;
		r.length = 0;
		for (t = 0, n = this.all_frames.length; t < n; ++t) {
			i = this.all_frames[t].texture_img;
			if (r.indexOf(i) !== -1) continue;
			e.drawImage(i, 0, 0);
			r.push(i)
		}
	};
	e.Instance = function(e) {
		this.type = e;
		this.runtime = e.runtime;
		var t = this.type.animations[0].frames[0].poly_pts;
		if (this.recycled) this.collision_poly.set_pts(t);
		else this.collision_poly = new cr.CollisionPoly(t)
	};
	var i = e.Instance.prototype;
	i.onCreate = function() {
		this.visible = this.properties[0] === 0;
		this.isTicking = false;
		this.inAnimTrigger = false;
		this.collisionsEnabled = this.properties[3] !== 0;
		if (!(this.type.animations.length === 1 && this.type.animations[0].frames.length === 1) && this.type.animations[0].speed !== 0) {
			this.runtime.tickMe(this);
			this.isTicking = true
		}
		this.cur_animation = this.getAnimationByName(this.properties[1]) || this.type.animations[0];
		this.cur_frame = this.properties[2];
		if (this.cur_frame < 0) this.cur_frame = 0;
		if (this.cur_frame >= this.cur_animation.frames.length) this.cur_frame = this.cur_animation.frames.length - 1;
		var e = this.cur_animation.frames[this.cur_frame];
		this.collision_poly.set_pts(e.poly_pts);
		this.hotspotX = e.hotspotX;
		this.hotspotY = e.hotspotY;
		this.cur_anim_speed = this.cur_animation.speed;
		if (this.recycled) this.animTimer.reset();
		else this.animTimer = new cr.KahanAdder;
		this.frameStart = this.getNowTime();
		this.animPlaying = true;
		this.animRepeats = 0;
		this.animForwards = true;
		this.animTriggerName = "";
		this.changeAnimName = "";
		this.changeAnimFrom = 0;
		this.changeAnimFrame = -1;
		this.type.loadTextures();
		var t, n, r, i;
		var s, o, u, a;
		for (t = 0, n = this.type.animations.length; t < n; t++) {
			s = this.type.animations[t];
			for (r = 0, i = s.frames.length; r < i; r++) {
				o = s.frames[r];
				if (o.width === 0) {
					o.width = o.texture_img.width;
					o.height = o.texture_img.height
				}
				if (o.spritesheeted) {
					a = o.texture_img;
					u = o.sheetTex;
					u.left = o.offx / a.width;
					u.top = o.offy / a.height;
					u.right = (o.offx + o.width) / a.width;
					u.bottom = (o.offy + o.height) / a.height;
					if (o.offx === 0 && o.offy === 0 && o.width === a.width && o.height === a.height) {
						o.spritesheeted = false
					}
				}
			}
		}
		this.curFrame = this.cur_animation.frames[this.cur_frame];
		this.curWebGLTexture = this.curFrame.webGL_texture
	};
	i.saveToJSON = function() {
		var e = {
			a: this.cur_animation.sid,
			f: this.cur_frame,
			cas: this.cur_anim_speed,
			fs: this.frameStart,
			ar: this.animRepeats,
			at: this.animTimer.sum
		};
		if (!this.animPlaying) e["ap"] = this.animPlaying;
		if (!this.animForwards) e["af"] = this.animForwards;
		return e
	};
	i.loadFromJSON = function(e) {
		var t = this.getAnimationBySid(e["a"]);
		if (t) this.cur_animation = t;
		this.cur_frame = e["f"];
		if (this.cur_frame < 0) this.cur_frame = 0;
		if (this.cur_frame >= this.cur_animation.frames.length) this.cur_frame = this.cur_animation.frames.length - 1;
		this.cur_anim_speed = e["cas"];
		this.frameStart = e["fs"];
		this.animRepeats = e["ar"];
		this.animTimer.reset();
		this.animTimer.sum = e["at"];
		this.animPlaying = e.hasOwnProperty("ap") ? e["ap"] : true;
		this.animForwards = e.hasOwnProperty("af") ? e["af"] : true;
		this.curFrame = this.cur_animation.frames[this.cur_frame];
		this.curWebGLTexture = this.curFrame.webGL_texture;
		this.collision_poly.set_pts(this.curFrame.poly_pts);
		this.hotspotX = this.curFrame.hotspotX;
		this.hotspotY = this.curFrame.hotspotY
	};
	i.animationFinish = function(e) {
		this.cur_frame = e ? 0 : this.cur_animation.frames.length - 1;
		this.animPlaying = false;
		this.animTriggerName = this.cur_animation.name;
		this.inAnimTrigger = true;
		this.runtime.trigger(cr.plugins_.Sprite.prototype.cnds.OnAnyAnimFinished, this);
		this.runtime.trigger(cr.plugins_.Sprite.prototype.cnds.OnAnimFinished, this);
		this.inAnimTrigger = false;
		this.animRepeats = 0
	};
	i.getNowTime = function() {
		return this.animTimer.sum
	};
	i.tick = function() {
		this.animTimer.add(this.runtime.getDt(this));
		if (this.changeAnimName.length) this.doChangeAnim();
		if (this.changeAnimFrame >= 0) this.doChangeAnimFrame();
		var e = this.getNowTime();
		var t = this.cur_animation;
		var n = t.frames[this.cur_frame];
		var r;
		var i = n.duration / this.cur_anim_speed;
		if (this.animPlaying && e >= this.frameStart + i) {
			if (this.animForwards) {
				this.cur_frame++
			} else {
				this.cur_frame--
			}
			this.frameStart += i;
			if (this.cur_frame >= t.frames.length) {
				if (t.pingpong) {
					this.animForwards = false;
					this.cur_frame = t.frames.length - 2
				} else if (t.loop) {
					this.cur_frame = t.repeatto
				} else {
					this.animRepeats++;
					if (this.animRepeats >= t.repeatcount) {
						this.animationFinish(false)
					} else {
						this.cur_frame = t.repeatto
					}
				}
			}
			if (this.cur_frame < 0) {
				if (t.pingpong) {
					this.cur_frame = 1;
					this.animForwards = true;
					if (!t.loop) {
						this.animRepeats++;
						if (this.animRepeats >= t.repeatcount) {
							this.animationFinish(true)
						}
					}
				} else {
					if (t.loop) {
						this.cur_frame = t.repeatto
					} else {
						this.animRepeats++;
						if (this.animRepeats >= t.repeatcount) {
							this.animationFinish(true)
						} else {
							this.cur_frame = t.repeatto
						}
					}
				}
			}
			if (this.cur_frame < 0) this.cur_frame = 0;
			else if (this.cur_frame >= t.frames.length) this.cur_frame = t.frames.length - 1;
			if (e > this.frameStart + t.frames[this.cur_frame].duration / this.cur_anim_speed) {
				this.frameStart = e
			}
			r = t.frames[this.cur_frame];
			this.OnFrameChanged(n, r);
			this.runtime.redraw = true
		}
	};
	i.getAnimationByName = function(e) {
		var t, n, r;
		for (t = 0, n = this.type.animations.length; t < n; t++) {
			r = this.type.animations[t];
			if (cr.equals_nocase(r.name, e)) return r
		}
		return null
	};
	i.getAnimationBySid = function(e) {
		var t, n, r;
		for (t = 0, n = this.type.animations.length; t < n; t++) {
			r = this.type.animations[t];
			if (r.sid === e) return r
		}
		return null
	};
	i.doChangeAnim = function() {
		var e = this.cur_animation.frames[this.cur_frame];
		var t = this.getAnimationByName(this.changeAnimName);
		this.changeAnimName = "";
		if (!t) return;
		if (cr.equals_nocase(t.name, this.cur_animation.name) && this.animPlaying) return;
		this.cur_animation = t;
		this.cur_anim_speed = t.speed;
		if (this.cur_frame < 0) this.cur_frame = 0;
		if (this.cur_frame >= this.cur_animation.frames.length) this.cur_frame = this.cur_animation.frames.length - 1;
		if (this.changeAnimFrom === 1) this.cur_frame = 0;
		this.animPlaying = true;
		this.frameStart = this.getNowTime();
		this.animForwards = true;
		this.OnFrameChanged(e, this.cur_animation.frames[this.cur_frame]);
		this.runtime.redraw = true
	};
	i.doChangeAnimFrame = function() {
		var e = this.cur_animation.frames[this.cur_frame];
		var t = this.cur_frame;
		this.cur_frame = cr.floor(this.changeAnimFrame);
		if (this.cur_frame < 0) this.cur_frame = 0;
		if (this.cur_frame >= this.cur_animation.frames.length) this.cur_frame = this.cur_animation.frames.length - 1;
		if (t !== this.cur_frame) {
			this.OnFrameChanged(e, this.cur_animation.frames[this.cur_frame]);
			this.frameStart = this.getNowTime();
			this.runtime.redraw = true
		}
		this.changeAnimFrame = -1
	};
	i.OnFrameChanged = function(e, t) {
		var n = e.width;
		var r = e.height;
		var i = t.width;
		var s = t.height;
		if (n != i) this.width *= i / n;
		if (r != s) this.height *= s / r;
		this.hotspotX = t.hotspotX;
		this.hotspotY = t.hotspotY;
		this.collision_poly.set_pts(t.poly_pts);
		this.set_bbox_changed();
		this.curFrame = t;
		this.curWebGLTexture = t.webGL_texture;
		var o, u, a;
		for (o = 0, u = this.behavior_insts.length; o < u; o++) {
			a = this.behavior_insts[o];
			if (a.onSpriteFrameChanged) a.onSpriteFrameChanged(e, t)
		}
		this.runtime.trigger(cr.plugins_.Sprite.prototype.cnds.OnFrameChanged, this)
	};
	i.draw = function(e) {
		e.globalAlpha = this.opacity;
		var t = this.curFrame;
		var n = t.spritesheeted;
		var r = t.texture_img;
		var i = this.x;
		var s = this.y;
		var o = this.width;
		var u = this.height;
		if (this.angle === 0 && o >= 0 && u >= 0) {
			i -= this.hotspotX * o;
			s -= this.hotspotY * u;
			if (this.runtime.pixel_rounding) {
				i = i + .5 | 0;
				s = s + .5 | 0
			}
			if (n) {
				e.drawImage(r, t.offx, t.offy, t.width, t.height, i, s, o, u)
			} else {
				e.drawImage(r, i, s, o, u)
			}
		} else {
			if (this.runtime.pixel_rounding) {
				i = i + .5 | 0;
				s = s + .5 | 0
			}
			e.save();
			var a = o > 0 ? 1 : -1;
			var f = u > 0 ? 1 : -1;
			e.translate(i, s);
			if (a !== 1 || f !== 1) e.scale(a, f);
			e.rotate(this.angle * a * f);
			var l = 0 - this.hotspotX * cr.abs(o);
			var c = 0 - this.hotspotY * cr.abs(u);
			if (n) {
				e.drawImage(r, t.offx, t.offy, t.width, t.height, l, c, cr.abs(o), cr.abs(u))
			} else {
				e.drawImage(r, l, c, cr.abs(o), cr.abs(u))
			}
			e.restore()
		}
	};
	i.drawGL = function(e) {
		e.setTexture(this.curWebGLTexture);
		e.setOpacity(this.opacity);
		var t = this.curFrame;
		var n = this.bquad;
		if (this.runtime.pixel_rounding) {
			var r = (this.x + .5 | 0) - this.x;
			var i = (this.y + .5 | 0) - this.y;
			if (t.spritesheeted) e.quadTex(n.tlx + r, n.tly + i, n.trx + r, n.try_ + i, n.brx + r, n.bry + i, n.blx + r, n.bly + i, t.sheetTex);
			else e.quad(n.tlx + r, n.tly + i, n.trx + r, n.try_ + i, n.brx + r, n.bry + i, n.blx + r, n.bly + i)
		} else {
			if (t.spritesheeted) e.quadTex(n.tlx, n.tly, n.trx, n.try_, n.brx, n.bry, n.blx, n.bly, t.sheetTex);
			else e.quad(n.tlx, n.tly, n.trx, n.try_, n.brx, n.bry, n.blx, n.bly)
		}
	};
	i.getImagePointIndexByName = function(e) {
		var t = this.curFrame;
		var n, r;
		for (n = 0, r = t.image_points.length; n < r; n++) {
			if (cr.equals_nocase(e, t.image_points[n][0])) return n
		}
		return -1
	};
	i.getImagePoint = function(e, t) {
		var n = this.curFrame;
		var r = n.image_points;
		var i;
		if (cr.is_string(e)) i = this.getImagePointIndexByName(e);
		else i = e - 1;
		i = cr.floor(i);
		if (i < 0 || i >= r.length) return t ? this.x : this.y;
		var s = (r[i][1] - n.hotspotX) * this.width;
		var o = r[i][2];
		o = (o - n.hotspotY) * this.height;
		var u = Math.cos(this.angle);
		var a = Math.sin(this.angle);
		var f = s * u - o * a;
		o = o * u + s * a;
		s = f;
		s += this.x;
		o += this.y;
		return t ? s : o
	};
	var o = [];
	s.prototype.OnCollision = function(e) {
		if (!e) return false;
		var t = this.runtime;
		var n = t.getCurrentCondition();
		var r = n.type;
		if (!n.extra.collmemory) {
			n.extra.collmemory = [];
			t.addDestroyCallback(function(e) {
				return function(t) {
					c(e, t)
				}
			}(n.extra.collmemory))
		}
		var i = r.getCurrentSol();
		var s = e.getCurrentSol();
		var o = i.getObjects();
		var u = s.getObjects();
		var a, p, d, v;
		var m, g;
		var y = t.getCurrentEventStack().current_event;
		var b = y.orblock;
		for (a = 0; a < o.length; a++) {
			p = o[a];
			for (d = 0; d < u.length; d++) {
				v = u[d];
				if (t.testOverlap(p, v) || t.checkRegisteredCollision(p, v)) {
					if (!h(n.extra.collmemory, p, v)) {
						f(n.extra.collmemory, p, v);
						t.pushCopySol(y.solModifiers);
						m = r.getCurrentSol();
						g = e.getCurrentSol();
						m.select_all = false;
						g.select_all = false;
						if (r === e) {
							m.instances.length = 2;
							m.instances[0] = p;
							m.instances[1] = v;
							r.applySolToContainer()
						} else {
							m.instances.length = 1;
							g.instances.length = 1;
							m.instances[0] = p;
							g.instances[0] = v;
							r.applySolToContainer();
							e.applySolToContainer()
						}
						y.retrigger();
						t.popSol(y.solModifiers)
					}
				} else {
					l(n.extra.collmemory, p, v)
				}
			}
		}
		return false
	};
	var p = null;
	var d = new cr.ObjectSet;
	var v = false;
	t.finish = function(e) {
		if (!v) return;
		if (e) {
			var t = this.runtime.getCurrentEventStack().current_event.orblock;
			var n = p.getCurrentSol();
			var r = d.valuesRef();
			var i, s, o;
			if (n.select_all) {
				n.select_all = false;
				n.instances.length = r.length;
				for (i = 0, s = r.length; i < s; i++) {
					n.instances[i] = r[i]
				}
				if (t) {
					n.else_instances.length = 0;
					for (i = 0, s = p.instances.length; i < s; i++) {
						o = p.instances[i];
						if (!d.contains(o)) n.else_instances.push(o)
					}
				}
			} else {
				var u = n.instances.length;
				n.instances.length = u + r.length;
				for (i = 0, s = r.length; i < s; i++) {
					n.instances[u + i] = r[i];
					if (t) cr.arrayFindRemove(n.else_instances, r[i])
				}
			}
			p.applySolToContainer()
		}
		d.clear();
		v = false
	};
	s.prototype.IsOverlapping = function(e) {
		return m.call(this, e, 0, 0)
	};
	s.prototype.IsOverlappingOffset = function(e, t, n) {
		return m.call(this, e, t, n)
	};
	s.prototype.IsAnimPlaying = function(e) {
		if (this.changeAnimName.length) return cr.equals_nocase(this.changeAnimName, e);
		else return cr.equals_nocase(this.cur_animation.name, e)
	};
	s.prototype.CompareFrame = function(e, t) {
		return cr.do_cmp(this.cur_frame, e, t)
	};
	s.prototype.OnAnimFinished = function(e) {
		return cr.equals_nocase(this.animTriggerName, e)
	};
	s.prototype.OnAnyAnimFinished = function() {
		return true
	};
	s.prototype.OnFrameChanged = function() {
		return true
	};
	s.prototype.IsMirrored = function() {
		return this.width < 0
	};
	s.prototype.IsFlipped = function() {
		return this.height < 0
	};
	s.prototype.OnURLLoaded = function() {
		return true
	};
	s.prototype.IsCollisionEnabled = function() {
		return this.collisionsEnabled
	};
	e.cnds = new s;
	g.prototype.Spawn = function(e, t, n) {
		if (!e || !t) return;
		var r = this.runtime.createInstance(e, t, this.getImagePoint(n, true), this.getImagePoint(n, false));
		if (!r) return;
		if (typeof r.angle !== "undefined") {
			r.angle = this.angle;
			r.set_bbox_changed()
		}
		this.runtime.isInOnDestroy++;
		var i, s, o;
		this.runtime.trigger(Object.getPrototypeOf(e.plugin).cnds.OnCreated, r);
		if (r.is_contained) {
			for (i = 0, s = r.siblings.length; i < s; i++) {
				o = r.siblings[i];
				this.runtime.trigger(Object.getPrototypeOf(o.type.plugin).cnds.OnCreated, o)
			}
		}
		this.runtime.isInOnDestroy--;
		var u = this.runtime.getCurrentAction();
		var a = false;
		if (cr.is_undefined(u.extra.Spawn_LastExec) || u.extra.Spawn_LastExec < this.runtime.execcount) {
			a = true;
			u.extra.Spawn_LastExec = this.runtime.execcount
		}
		var f;
		if (e != this.type) {
			f = e.getCurrentSol();
			f.select_all = false;
			if (a) {
				f.instances.length = 1;
				f.instances[0] = r
			} else f.instances.push(r);
			if (r.is_contained) {
				for (i = 0, s = r.siblings.length; i < s; i++) {
					o = r.siblings[i];
					f = o.type.getCurrentSol();
					f.select_all = false;
					if (a) {
						f.instances.length = 1;
						f.instances[0] = o
					} else f.instances.push(o)
				}
			}
		}
	};
	g.prototype.SetEffect = function(e) {
		this.compositeOp = cr.effectToCompositeOp(e);
		cr.setGLBlend(this, e, this.runtime.gl);
		this.runtime.redraw = true
	};
	g.prototype.StopAnim = function() {
		this.animPlaying = false
	};
	g.prototype.StartAnim = function(e) {
		this.animPlaying = true;
		this.frameStart = this.getNowTime();
		if (e === 1 && this.cur_frame !== 0) {
			this.changeAnimFrame = 0;
			if (!this.inAnimTrigger) this.doChangeAnimFrame()
		}
		if (!this.isTicking) {
			this.runtime.tickMe(this);
			this.isTicking = true
		}
	};
	g.prototype.SetAnim = function(e, t) {
		this.changeAnimName = e;
		this.changeAnimFrom = t;
		if (!this.isTicking) {
			this.runtime.tickMe(this);
			this.isTicking = true
		}
		if (!this.inAnimTrigger) this.doChangeAnim()
	};
	g.prototype.SetAnimFrame = function(e) {
		this.changeAnimFrame = e;
		if (!this.isTicking) {
			this.runtime.tickMe(this);
			this.isTicking = true
		}
		if (!this.inAnimTrigger) this.doChangeAnimFrame()
	};
	g.prototype.SetAnimSpeed = function(e) {
		this.cur_anim_speed = cr.abs(e);
		this.animForwards = e >= 0;
		if (!this.isTicking) {
			this.runtime.tickMe(this);
			this.isTicking = true
		}
	};
	g.prototype.SetMirrored = function(e) {
		var t = cr.abs(this.width) * (e === 0 ? -1 : 1);
		if (this.width === t) return;
		this.width = t;
		this.set_bbox_changed()
	};
	g.prototype.SetFlipped = function(e) {
		var t = cr.abs(this.height) * (e === 0 ? -1 : 1);
		if (this.height === t) return;
		this.height = t;
		this.set_bbox_changed()
	};
	g.prototype.SetScale = function(e) {
		var t = this.curFrame;
		var n = this.width < 0 ? -1 : 1;
		var r = this.height < 0 ? -1 : 1;
		var i = t.width * e * n;
		var s = t.height * e * r;
		if (this.width !== i || this.height !== s) {
			this.width = i;
			this.height = s;
			this.set_bbox_changed()
		}
	};
	g.prototype.LoadURL = function(e, t) {
		var n = new Image;
		var r = this;
		var i = this.curFrame;
		n.onload = function() {
			if (i.texture_img.src === n.src) {
				if (r.runtime.glwrap && r.curFrame === i) r.curWebGLTexture = i.webGL_texture;
				r.runtime.redraw = true;
				r.runtime.trigger(cr.plugins_.Sprite.prototype.cnds.OnURLLoaded, r);
				return
			}
			i.texture_img = n;
			i.offx = 0;
			i.offy = 0;
			i.width = n.width;
			i.height = n.height;
			i.spritesheeted = false;
			i.datauri = "";
			if (r.runtime.glwrap) {
				if (i.webGL_texture) r.runtime.glwrap.deleteTexture(i.webGL_texture);
				i.webGL_texture = r.runtime.glwrap.loadTexture(n, false, r.runtime.linearSampling);
				if (r.curFrame === i) r.curWebGLTexture = i.webGL_texture;
				r.type.updateAllCurrentTexture()
			}
			if (t === 0) {
				r.width = n.width;
				r.height = n.height;
				r.set_bbox_changed()
			}
			r.runtime.redraw = true;
			r.runtime.trigger(cr.plugins_.Sprite.prototype.cnds.OnURLLoaded, r)
		};
		if (e.substr(0, 5) !== "data:") n.crossOrigin = "anonymous";
		n.src = e
	};
	g.prototype.SetCollisions = function(e) {
		this.collisionsEnabled = e !== 0
	};
	e.acts = new g;
	y.prototype.AnimationFrame = function(e) {
		e.set_int(this.cur_frame)
	};
	y.prototype.AnimationFrameCount = function(e) {
		e.set_int(this.cur_animation.frames.length)
	};
	y.prototype.AnimationName = function(e) {
		e.set_string(this.cur_animation.name)
	};
	y.prototype.AnimationSpeed = function(e) {
		e.set_float(this.cur_anim_speed)
	};
	y.prototype.ImagePointX = function(e, t) {
		e.set_float(this.getImagePoint(t, true))
	};
	y.prototype.ImagePointY = function(e, t) {
		e.set_float(this.getImagePoint(t, false))
	};
	y.prototype.ImagePointCount = function(e) {
		e.set_int(this.curFrame.image_points.length)
	};
	y.prototype.ImageWidth = function(e) {
		e.set_float(this.curFrame.width)
	};
	y.prototype.ImageHeight = function(e) {
		e.set_float(this.curFrame.height)
	};
	e.exps = new y
})();
cr.plugins_.Spritefont2 = function(e) {
	this.runtime = e
};
(function() {
	function r(e) {
		return e.replace(/\s\s*$/, "")
	}
	function s(e, t) {
		if (e.length) return e.pop();
		else return new t
	}
	function o(e, t) {
		if (e.length < i) {
			e.push(t)
		}
	}
	function u(e, t, n) {
		if (n) {
			var r, i;
			for (r = 0, i = t.length; r < i; r++) {
				o(e, t[r])
			}
			t.length = 0
		} else {
			var s;
			for (s in t) {
				if (Object.prototype.hasOwnProperty.call(t, s)) {
					o(e, t[s]);
					delete t[s]
				}
			}
		}
	}
	function a(e, t, n) {
		var i = e.lines;
		var s;
		n = r(n);
		if (t >= i.length) i.push(l());
		s = i[t];
		s.text = n;
		s.width = e.measureWidth(n);
		e.textWidth = cr.max(e.textWidth, s.width)
	}
	function l() {
		return s(f, Object)
	}
	function c(e) {
		o(f, e)
	}
	function h(e) {
		u(f, e, true)
	}
	function p(e, t, n, r, i, o) {
		if (e[t] === undefined) {
			e[t] = s(d, Object)
		}
		e[t].x = n;
		e[t].y = r;
		e[t].w = i;
		e[t].h = o
	}
	function v() {
		return s(d, Object)
	}
	function m(e) {
		u(d, e, false)
	}
	function g(e, t, n, r, i, o) {
		if (e[t] === undefined) {
			e[t] = s(y, cr.rect)
		}
		e[t].left = n;
		e[t].top = r;
		e[t].right = i;
		e[t].bottom = o
	}
	function b() {
		return s(y, cr.rect)
	}
	function w(e) {
		u(y, e, false)
	}
	function T(e, t, n) {
		var r;
		r = e.tlx * t - e.tly * n;
		e.tly = e.tly * t + e.tlx * n;
		e.tlx = r;
		r = e.trx * t - e.try_ * n;
		e.try_ = e.try_ * t + e.trx * n;
		e.trx = r;
		r = e.blx * t - e.bly * n;
		e.bly = e.bly * t + e.blx * n;
		e.blx = r;
		r = e.brx * t - e.bry * n;
		e.bry = e.bry * t + e.brx * n;
		e.brx = r
	}
	function N() {}
	function C() {}
	function k() {}
	var e = cr.plugins_.Spritefont2.prototype;
	e.onCreate = function() {};
	e.Type = function(e) {
		this.plugin = e;
		this.runtime = e.runtime
	};
	var t = e.Type.prototype;
	t.onCreate = function() {
		if (this.is_family) return;
		this.texture_img = new Image;
		this.texture_img["idtkLoadDisposed"] = true;
		this.texture_img.src = this.texture_file;
		this.runtime.wait_for_textures.push(this.texture_img);
		this.webGL_texture = null
	};
	t.onLostWebGLContext = function() {
		if (this.is_family) return;
		this.webGL_texture = null
	};
	t.onRestoreWebGLContext = function() {
		if (this.is_family || !this.instances.length) return;
		if (!this.webGL_texture) {
			this.webGL_texture = this.runtime.glwrap.loadTexture(this.texture_img, false, this.runtime.linearSampling, this.texture_pixelformat)
		}
		var e, t;
		for (e = 0, t = this.instances.length; e < t; e++) this.instances[e].webGL_texture = this.webGL_texture
	};
	t.unloadTextures = function() {
		if (this.is_family || this.instances.length || !this.webGL_texture) return;
		this.runtime.glwrap.deleteTexture(this.webGL_texture);
		this.webGL_texture = null
	};
	t.preloadCanvas2D = function(e) {
		e.drawImage(this.texture_img, 0, 0)
	};
	e.Instance = function(e) {
		this.type = e;
		this.runtime = e.runtime
	};
	var n = e.Instance.prototype;
	n.onDestroy = function() {
		h(this.lines);
		m(this.clipList);
		w(this.clipUV);
		cr.wipe(this.characterWidthList)
	};
	n.onCreate = function() {
		this.texture_img = this.type.texture_img;
		this.characterWidth = this.properties[0];
		this.characterHeight = this.properties[1];
		this.characterSet = this.properties[2];
		this.text = this.properties[3];
		this.characterScale = this.properties[4];
		this.visible = this.properties[5] === 0;
		this.halign = this.properties[6] / 2;
		this.valign = this.properties[7] / 2;
		this.wrapbyword = this.properties[9] === 0;
		this.characterSpacing = this.properties[10];
		this.lineHeight = this.properties[11];
		this.textWidth = 0;
		this.textHeight = 0;
		if (this.recycled) {
			this.lines.length = 0;
			cr.wipe(this.clipList);
			cr.wipe(this.clipUV);
			cr.wipe(this.characterWidthList)
		} else {
			this.lines = [];
			this.clipList = {};
			this.clipUV = {};
			this.characterWidthList = {}
		}
		this.text_changed = true;
		this.lastwrapwidth = this.width;
		if (this.runtime.glwrap) {
			if (!this.type.webGL_texture) {
				this.type.webGL_texture = this.runtime.glwrap.loadTexture(this.type.texture_img, false, this.runtime.linearSampling, this.type.texture_pixelformat)
			}
			this.webGL_texture = this.type.webGL_texture
		}
		this.SplitSheet()
	};
	n.saveToJSON = function() {
		var e = {
			t: this.text,
			csc: this.characterScale,
			csp: this.characterSpacing,
			lh: this.lineHeight,
			tw: this.textWidth,
			th: this.textHeight,
			lrt: this.last_render_tick,
			cw: {}
		};
		for (var t in this.characterWidthList) e["cw"][t] = this.characterWidthList[t];
		return e
	};
	n.loadFromJSON = function(e) {
		this.text = e["t"];
		this.characterScale = e["csc"];
		this.characterSpacing = e["csp"];
		this.lineHeight = e["lh"];
		this.textWidth = e["tw"];
		this.textHeight = e["th"];
		this.last_render_tick = e["lrt"];
		for (var t in e["cw"]) this.characterWidthList[t] = e["cw"][t];
		this.text_changed = true;
		this.lastwrapwidth = this.width
	};
	var i = 1e3;
	var f = [];
	var d = [];
	var y = [];
	n.SplitSheet = function() {
		var e = this.texture_img;
		var t = e.width;
		var n = e.height;
		var r = this.characterWidth;
		var i = this.characterHeight;
		var s = r / t;
		var o = i / n;
		var u = this.characterSet;
		var a = Math.floor(t / r);
		var f = Math.floor(n / i);
		for (var l = 0; l < u.length; l++) {
			if (l >= a * f) break;
			var c = l % a;
			var h = Math.floor(l / a);
			var d = u.charAt(l);
			if (this.runtime.glwrap) {
				g(this.clipUV, d, c * s, h * o, (c + 1) * s, (h + 1) * o)
			} else {
				p(this.clipList, d, c * r, h * i, r, i)
			}
		}
	};
	var E = [];
	e.TokeniseWords = function(e) {
		E.length = 0;
		var t = "";
		var n;
		var r = 0;
		while (r < e.length) {
			n = e.charAt(r);
			if (n === "\n") {
				if (t.length) {
					E.push(t);
					t = ""
				}
				E.push("\n");
				++r
			} else if (n === " " || n === "	" || n === "-") {
				do {
					t += e.charAt(r);
					r++
				} while (r < e.length && (e.charAt(r) === " " || e.charAt(r) === "	"));
				E.push(t);
				t = ""
			} else if (r < e.length) {
				t += n;
				r++
			}
		}
		if (t.length) E.push(t)
	};
	e.WordWrap = function(e) {
		var t = e.text;
		var n = e.lines;
		if (!t || !t.length) {
			h(n);
			return
		}
		var r = e.width;
		if (r <= 2) {
			h(n);
			return
		}
		var i = e.characterWidth;
		var s = e.characterScale;
		var o = e.characterSpacing;
		if (t.length * (i * s + o) - o <= r && t.indexOf("\n") === -1) {
			var u = e.measureWidth(t);
			if (u <= r) {
				h(n);
				n.push(l());
				n[0].text = t;
				n[0].width = u;
				e.textWidth = u;
				e.textHeight = e.characterHeight * s + e.lineHeight;
				return
			}
		}
		var a = e.wrapbyword;
		this.WrapText(e);
		e.textHeight = n.length * (e.characterHeight * s + e.lineHeight)
	};
	e.WrapText = function(e) {
		var t = e.wrapbyword;
		var n = e.text;
		var i = e.lines;
		var s = e.width;
		var o;
		if (t) {
			this.TokeniseWords(n);
			o = E
		} else {
			o = n
		}
		var u = "";
		var f;
		var l;
		var h;
		var p = 0;
		var d;
		var v = false;
		for (h = 0; h < o.length; h++) {
			if (o[h] === "\n") {
				if (v === true) {
					v = false
				} else {
					a(e, p, u);
					p++
				}
				u = "";
				continue
			}
			v = false;
			f = u;
			u += o[h];
			l = e.measureWidth(r(u));
			if (l > s) {
				if (f === "") {
					a(e, p, u);
					u = "";
					v = true
				} else {
					a(e, p, f);
					u = o[h]
				}
				p++;
				if (!t && u === " ") u = ""
			}
		}
		if (r(u).length) {
			a(e, p, u);
			p++
		}
		for (h = p; h < i.length; h++) c(i[h]);
		i.length = p
	};
	n.measureWidth = function(e) {
		var t = this.characterSpacing;
		var n = e.length;
		var r = 0;
		for (var i = 0; i < n; i++) {
			r += this.getCharacterWidth(e.charAt(i)) * this.characterScale + t
		}
		r -= r > 0 ? t : 0;
		return r
	};
	n.getCharacterWidth = function(e) {
		var t = this.characterWidthList;
		if (t[e] !== undefined) {
			return t[e]
		} else {
			return this.characterWidth
		}
	};
	n.rebuildText = function() {
		if (this.text_changed || this.width !== this.lastwrapwidth) {
			this.textWidth = 0;
			this.textHeight = 0;
			this.type.plugin.WordWrap(this);
			this.text_changed = false;
			this.lastwrapwidth = this.width
		}
	};
	var S = 1e-5;
	n.draw = function(e, t) {
		var n = this.texture_img;
		if (this.text !== "" && n != null) {
			this.rebuildText();
			if (this.height < this.characterHeight * this.characterScale + this.lineHeight) {
				return
			}
			e.globalAlpha = this.opacity;
			var r = this.x;
			var i = this.y;
			if (this.runtime.pixel_rounding) {
				r = r + .5 | 0;
				i = i + .5 | 0
			}
			e.save();
			e.translate(r, i);
			e.rotate(this.angle);
			var s = this.halign;
			var o = this.valign;
			var u = this.characterScale;
			var a = this.characterHeight * u;
			var f = this.lineHeight;
			var l = this.characterSpacing;
			var c = this.lines;
			var h = this.textHeight;
			var p;
			var d = o * cr.max(0, this.height - h);
			var v = -(this.hotspotX * this.width);
			var m = -(this.hotspotY * this.height);
			m += d;
			var g;
			var y = m;
			for (var b = 0; b < c.length; b++) {
				var w = c[b].text;
				var E = c[b].width;
				p = s * cr.max(0, this.width - E);
				g = v + p;
				y += f;
				for (var x = 0; x < w.length; x++) {
					var T = w.charAt(x);
					var N = this.clipList[T];
					if (g + this.getCharacterWidth(T) * u > this.width + S) {
						break
					}
					if (N !== undefined) {
						e.drawImage(this.texture_img, N.x, N.y, N.w, N.h, Math.round(g), Math.round(y), N.w * u, N.h * u)
					}
					g += this.getCharacterWidth(T) * u + l
				}
				y += a;
				if (y + a + f > this.height) {
					break
				}
			}
			e.restore()
		}
	};
	var x = new cr.quad;
	n.drawGL = function(e) {
		e.setTexture(this.webGL_texture);
		e.setOpacity(this.opacity);
		if (this.text !== "") {
			this.rebuildText();
			if (this.height < this.characterHeight * this.characterScale + this.lineHeight) {
				return
			}
			this.update_bbox();
			var t = this.bquad;
			var n = 0;
			var r = 0;
			if (this.runtime.pixel_rounding) {
				n = (this.x + .5 | 0) - this.x;
				r = (this.y + .5 | 0) - this.y
			}
			var i = this.angle;
			var s = this.halign;
			var o = this.valign;
			var u = this.characterScale;
			var a = this.characterHeight * u;
			var f = this.lineHeight;
			var l = this.characterSpacing;
			var c = this.lines;
			var h = this.textHeight;
			var p, d;
			if (i !== 0) {
				p = Math.cos(i);
				d = Math.sin(i)
			}
			var v;
			var m = o * cr.max(0, this.height - h);
			var g = t.tlx + n;
			var y = t.tly + r;
			var b;
			var w = m;
			for (var E = 0; E < c.length; E++) {
				var N = c[E].text;
				var C = c[E].width;
				v = s * cr.max(0, this.width - C);
				b = v;
				w += f;
				for (var k = 0; k < N.length; k++) {
					var L = N.charAt(k);
					var A = this.clipUV[L];
					if (b + this.getCharacterWidth(L) * u > this.width + S) {
						break
					}
					if (A !== undefined) {
						var O = this.characterWidth * u;
						var M = this.characterHeight * u;
						x.tlx = b;
						x.tly = w;
						x.trx = b + O;
						x.try_ = w;
						x.blx = b;
						x.bly = w + M;
						x.brx = b + O;
						x.bry = w + M;
						if (i !== 0) {
							T(x, p, d)
						}
						x.offset(g, y);
						e.quadTex(x.tlx, x.tly, x.trx, x.try_, x.brx, x.bry, x.blx, x.bly, A)
					}
					b += this.getCharacterWidth(L) * u + l
				}
				w += a;
				if (w + a + f > this.height) {
					break
				}
			}
		}
	};
	N.prototype.CompareText = function(e, t) {
		if (t) return this.text == e;
		else return cr.equals_nocase(this.text, e)
	};
	e.cnds = new N;
	C.prototype.SetText = function(e) {
		if (e.match(/BEST:/)) {
			e = "     " + getHighScore()
		} else if (e.match(/MEJOR:/)) {
			e = "MEJOR:" + getHighScore()
		}
		if (cr.is_number(e) && e < 1e9) e = Math.round(e * 1e10) / 1e10;
		var t = e.toString();
		if (this.text !== t) {
			this.text = t;
			this.text_changed = true;
			this.runtime.redraw = true
		}
	};
	C.prototype.AppendText = function(e) {
		if (cr.is_number(e)) e = Math.round(e * 1e10) / 1e10;
		var t = e.toString();
		if (t) {
			this.text += t;
			this.text_changed = true;
			this.runtime.redraw = true
		}
	};
	C.prototype.SetScale = function(e) {
		if (e !== this.characterScale) {
			this.characterScale = e;
			this.text_changed = true;
			this.runtime.redraw = true
		}
	};
	C.prototype.SetCharacterSpacing = function(e) {
		if (e !== this.CharacterSpacing) {
			this.characterSpacing = e;
			this.text_changed = true;
			this.runtime.redraw = true
		}
	};
	C.prototype.SetLineHeight = function(e) {
		if (e !== this.lineHeight) {
			this.lineHeight = e;
			this.text_changed = true;
			this.runtime.redraw = true
		}
	};
	n.SetCharWidth = function(e, t) {
		var n = parseInt(t, 10);
		if (this.characterWidthList[e] !== n) {
			this.characterWidthList[e] = n;
			this.text_changed = true;
			this.runtime.redraw = true
		}
	};
	C.prototype.SetCharacterWidth = function(e, t) {
		if (e !== "") {
			for (var n = 0; n < e.length; n++) {
				this.SetCharWidth(e.charAt(n), t)
			}
		}
	};
	C.prototype.SetEffect = function(e) {
		this.compositeOp = cr.effectToCompositeOp(e);
		cr.setGLBlend(this, e, this.runtime.gl);
		this.runtime.redraw = true
	};
	e.acts = new C;
	k.prototype.CharacterWidth = function(e, t) {
		e.set_int(this.getCharacterWidth(t))
	};
	k.prototype.CharacterHeight = function(e) {
		e.set_int(this.characterHeight)
	};
	k.prototype.CharacterScale = function(e) {
		e.set_float(this.characterScale)
	};
	k.prototype.CharacterSpacing = function(e) {
		e.set_int(this.characterSpacing)
	};
	k.prototype.LineHeight = function(e) {
		e.set_int(this.lineHeight)
	};
	k.prototype.Text = function(e) {
		e.set_string(this.text)
	};
	k.prototype.TextWidth = function(e) {
		this.rebuildText();
		e.set_float(this.textWidth)
	};
	k.prototype.TextHeight = function(e) {
		this.rebuildText();
		e.set_float(this.textHeight)
	};
	e.exps = new k
})();
cr.plugins_.Text = function(e) {
	this.runtime = e
};
(function() {
	function o() {
		if (s.length) return s.pop();
		else return {}
	}
	function u(e) {
		s.push(e)
	}
	function a(e) {
		var t, n;
		for (t = 0, n = e.length; t < n; t++) {
			u(e[t])
		}
		e.length = 0
	}
	function f() {}
	function l() {}
	function c() {}
	var e = cr.plugins_.Text.prototype;
	e.onCreate = function() {
		e.acts.SetWidth = function(e) {
			if (this.width !== e) {
				this.width = e;
				this.text_changed = true;
				this.set_bbox_changed()
			}
		}
	};
	e.Type = function(e) {
		this.plugin = e;
		this.runtime = e.runtime
	};
	var t = e.Type.prototype;
	t.onCreate = function() {};
	t.onLostWebGLContext = function() {
		if (this.is_family) return;
		var e, t, n;
		for (e = 0, t = this.instances.length; e < t; e++) {
			n = this.instances[e];
			n.mycanvas = null;
			n.myctx = null;
			n.mytex = null
		}
	};
	e.Instance = function(e) {
		this.type = e;
		this.runtime = e.runtime;
		if (this.recycled) this.lines.length = 0;
		else this.lines = [];
		this.text_changed = true
	};
	var n = e.Instance.prototype;
	var r = {};
	n.onCreate = function() {
		this.text = this.properties[0];
		this.visible = this.properties[1] === 0;
		this.font = this.properties[2];
		this.color = this.properties[3];
		this.halign = this.properties[4];
		this.valign = this.properties[5];
		this.wrapbyword = this.properties[7] === 0;
		this.lastwidth = this.width;
		this.lastwrapwidth = this.width;
		this.lastheight = this.height;
		this.line_height_offset = this.properties[8];
		this.facename = "";
		this.fontstyle = "";
		this.ptSize = 0;
		this.textWidth = 0;
		this.textHeight = 0;
		this.parseFont();
		this.mycanvas = null;
		this.myctx = null;
		this.mytex = null;
		this.need_text_redraw = false;
		this.last_render_tick = this.runtime.tickcount;
		if (this.recycled) this.rcTex.set(0, 0, 1, 1);
		else this.rcTex = new cr.rect(0, 0, 1, 1);
		if (this.runtime.glwrap) this.runtime.tickMe(this);
	};
	n.parseFont = function() {
		var e = this.font.split(" ");
		var t;
		for (t = 0; t < e.length; t++) {
			if (e[t].substr(e[t].length - 2, 2) === "pt") {
				this.ptSize = parseInt(e[t].substr(0, e[t].length - 2));
				this.pxHeight = Math.ceil(this.ptSize / 72 * 96) + 4;
				if (t > 0) this.fontstyle = e[t - 1];
				this.facename = e[t + 1];
				for (t = t + 2; t < e.length; t++) this.facename += " " + e[t];
				break
			}
		}
	};
	n.saveToJSON = function() {
		return {
			t: this.text,
			f: this.font,
			c: this.color,
			ha: this.halign,
			va: this.valign,
			wr: this.wrapbyword,
			lho: this.line_height_offset,
			fn: this.facename,
			fs: this.fontstyle,
			ps: this.ptSize,
			pxh: this.pxHeight,
			tw: this.textWidth,
			th: this.textHeight,
			lrt: this.last_render_tick
		}
	};
	n.loadFromJSON = function(e) {
		this.text = e["t"];
		this.font = e["f"];
		this.color = e["c"];
		this.halign = e["ha"];
		this.valign = e["va"];
		this.wrapbyword = e["wr"];
		this.line_height_offset = e["lho"];
		this.facename = e["fn"];
		this.fontstyle = e["fs"];
		this.ptSize = e["ps"];
		this.pxHeight = e["pxh"];
		this.textWidth = e["tw"];
		this.textHeight = e["th"];
		this.last_render_tick = e["lrt"];
		this.text_changed = true;
		this.lastwidth = this.width;
		this.lastwrapwidth = this.width;
		this.lastheight = this.height
	};
	n.tick = function() {
		if (this.runtime.glwrap && this.mytex && this.runtime.tickcount - this.last_render_tick >= 300) {
			var e = this.layer;
			this.update_bbox();
			var t = this.bbox;
			if (t.right < e.viewLeft || t.bottom < e.viewTop || t.left > e.viewRight || t.top > e.viewBottom) {
				this.runtime.glwrap.deleteTexture(this.mytex);
				this.mytex = null;
				this.myctx = null;
				this.mycanvas = null
			}
		}
	};
	n.onDestroy = function() {
		this.myctx = null;
		this.mycanvas = null;
		if (this.runtime.glwrap && this.mytex) this.runtime.glwrap.deleteTexture(this.mytex);
		this.mytex = null
	};
	n.updateFont = function() {
		this.font = this.fontstyle + " " + this.ptSize.toString() + "pt " + this.facename;
		this.text_changed = true;
		this.runtime.redraw = true
	};
	n.draw = function(e, t) {
		e.font = this.font;
		e.textBaseline = "top";
		e.fillStyle = this.color;
		e.globalAlpha = t ? 1 : this.opacity;
		var n = 1;
		if (t) {
			n = this.layer.getScale();
			e.save();
			e.scale(n, n)
		}
		if (this.text_changed || this.width !== this.lastwrapwidth) {
			this.type.plugin.WordWrap(this.text, this.lines, e, this.width, this.wrapbyword);
			this.text_changed = false;
			this.lastwrapwidth = this.width
		}
		this.update_bbox();
		var r = t ? 0 : this.bquad.tlx;
		var i = t ? 0 : this.bquad.tly;
		if (this.runtime.pixel_rounding) {
			r = r + .5 | 0;
			i = i + .5 | 0
		}
		if (this.angle !== 0 && !t) {
			e.save();
			e.translate(r, i);
			e.rotate(this.angle);
			r = 0;
			i = 0
		}
		var s = i + this.height;
		var o = this.pxHeight;
		o += this.line_height_offset * this.runtime.devicePixelRatio;
		var u;
		var a;
		if (this.valign === 1) i += Math.max(this.height / 2 - this.lines.length * o / 2, 0);
		else if (this.valign === 2) i += Math.max(this.height - this.lines.length * o - 2, 0);
		for (a = 0; a < this.lines.length; a++) {
			u = r;
			if (this.halign === 1) u = r + (this.width - this.lines[a].width) / 2;
			else if (this.halign === 2) u = r + (this.width - this.lines[a].width);
			e.fillText(this.lines[a].text, u, i);
			i += o;
			if (i >= s - o) break
		}
		if (this.angle !== 0 || t) e.restore();
		this.last_render_tick = this.runtime.tickcount
	};
	n.drawGL = function(e) {
		if (this.width < 1 || this.height < 1) return;
		var t = this.text_changed || this.need_text_redraw;
		this.need_text_redraw = false;
		var n = this.layer.getScale();
		var r = this.layer.getAngle();
		var i = this.rcTex;
		var s = n * this.width;
		var o = n * this.height;
		var u = Math.ceil(s);
		var a = Math.ceil(o);
		var f = this.runtime.width;
		var l = this.runtime.height;
		var c = f / 2;
		var h = l / 2;
		if (!this.myctx) {
			this.mycanvas = document.createElement("canvas");
			this.mycanvas.width = u;
			this.mycanvas.height = a;
			this.lastwidth = u;
			this.lastheight = a;
			t = true;
			this.myctx = this.mycanvas.getContext("2d")
		}
		if (u !== this.lastwidth || a !== this.lastheight) {
			this.mycanvas.width = u;
			this.mycanvas.height = a;
			if (this.mytex) {
				e.deleteTexture(this.mytex);
				this.mytex = null
			}
			t = true
		}
		if (t) {
			this.myctx.clearRect(0, 0, u, a);
			this.draw(this.myctx, true);
			if (!this.mytex) this.mytex = e.createEmptyTexture(u, a, this.runtime.linearSampling, this.runtime.isMobile);
			e.videoToTexture(this.mycanvas, this.mytex, this.runtime.isMobile)
		}
		this.lastwidth = u;
		this.lastheight = a;
		e.setTexture(this.mytex);
		e.setOpacity(this.opacity);
		e.resetModelView();
		e.translate(-c, -h);
		e.updateModelView();
		var p = this.bquad;
		var d = this.layer.layerToCanvas(p.tlx, p.tly, true);
		var v = this.layer.layerToCanvas(p.tlx, p.tly, false);
		var m = this.layer.layerToCanvas(p.trx, p.try_, true);
		var g = this.layer.layerToCanvas(p.trx, p.try_, false);
		var y = this.layer.layerToCanvas(p.brx, p.bry, true);
		var b = this.layer.layerToCanvas(p.brx, p.bry, false);
		var w = this.layer.layerToCanvas(p.blx, p.bly, true);
		var E = this.layer.layerToCanvas(p.blx, p.bly, false);
		if (this.runtime.pixel_rounding || this.angle === 0 && r === 0) {
			var S = (d + .5 | 0) - d;
			var x = (v + .5 | 0) - v;
			d += S;
			v += x;
			m += S;
			g += x;
			y += S;
			b += x;
			w += S;
			E += x
		}
		if (this.angle === 0 && r === 0) {
			m = d + u;
			g = v;
			y = m;
			b = v + a;
			w = d;
			E = b;
			i.right = 1;
			i.bottom = 1
		} else {
			i.right = s / u;
			i.bottom = o / a
		}
		e.quadTex(d, v, m, g, y, b, w, E, i);
		e.resetModelView();
		e.scale(n, n);
		e.rotateZ(-this.layer.getAngle());
		e.translate((this.layer.viewLeft + this.layer.viewRight) / -2, (this.layer.viewTop + this.layer.viewBottom) / -2);
		e.updateModelView();
		this.last_render_tick = this.runtime.tickcount
	};
	var i = [];
	e.TokeniseWords = function(e) {
		i.length = 0;
		var t = "";
		var n;
		var r = 0;
		while (r < e.length) {
			n = e.charAt(r);
			if (n === "\n") {
				if (t.length) {
					i.push(t);
					t = ""
				}
				i.push("\n");
				++r
			} else if (n === " " || n === "	" || n === "-") {
				do {
					t += e.charAt(r);
					r++
				} while (r < e.length && (e.charAt(r) === " " || e.charAt(r) === "	"));
				i.push(t);
				t = ""
			} else if (r < e.length) {
				t += n;
				r++
			}
		}
		if (t.length) i.push(t)
	};
	var s = [];
	e.WordWrap = function(e, t, n, r, i) {
		if (!e || !e.length) {
			a(t);
			return
		}
		if (r <= 2) {
			a(t);
			return
		}
		if (e.length <= 100 && e.indexOf("\n") === -1) {
			var s = n.measureText(e).width;
			if (s <= r) {
				a(t);
				t.push(o());
				t[0].text = e;
				t[0].width = s;
				return
			}
		}
		this.WrapText(e, t, n, r, i)
	};
	e.WrapText = function(e, t, n, r, s) {
		var a;
		if (s) {
			this.TokeniseWords(e);
			a = i
		} else a = e;
		var f = "";
		var l;
		var c;
		var h;
		var p = 0;
		var d;
		for (h = 0; h < a.length; h++) {
			if (a[h] === "\n") {
				if (p >= t.length) t.push(o());
				d = t[p];
				d.text = f;
				d.width = n.measureText(f).width;
				p++;
				f = "";
				continue
			}
			l = f;
			f += a[h];
			c = n.measureText(f).width;
			if (c >= r) {
				if (p >= t.length) t.push(o());
				d = t[p];
				d.text = l;
				d.width = n.measureText(l).width;
				p++;
				f = a[h];
				if (!s && f === " ") f = ""
			}
		}
		if (f.length) {
			if (p >= t.length) t.push(o());
			d = t[p];
			d.text = f;
			d.width = n.measureText(f).width;
			p++
		}
		for (h = p; h < t.length; h++) u(t[h]);
		t.length = p
	};
	f.prototype.CompareText = function(e, t) {
		if (t) return this.text == e;
		else return cr.equals_nocase(this.text, e)
	};
	e.cnds = new f;
	l.prototype.SetText = function(e) {
		if (cr.is_number(e) && e < 1e9) e = Math.round(e * 1e10) / 1e10;
		var t = e.toString();
		if (this.text !== t) {
			this.text = t;
			this.text_changed = true;
			this.runtime.redraw = true
		}
	};
	l.prototype.AppendText = function(e) {
		if (cr.is_number(e)) e = Math.round(e * 1e10) / 1e10;
		var t = e.toString();
		if (t) {
			this.text += t;
			this.text_changed = true;
			this.runtime.redraw = true
		}
	};
	l.prototype.SetFontFace = function(e, t) {
		var n = "";
		switch (t) {
		case 1:
			n = "bold";
			break;
		case 2:
			n = "italic";
			break;
		case 3:
			n = "bold italic";
			break
		}
		if (e === this.facename && n === this.fontstyle) return;
		this.facename = e;
		this.fontstyle = n;
		this.updateFont()
	};
	l.prototype.SetFontSize = function(e) {
		if (this.ptSize === e) return;
		this.ptSize = e;
		this.pxHeight = Math.ceil(this.ptSize / 72 * 96) + 4;
		this.updateFont()
	};
	l.prototype.SetFontColor = function(e) {
		var t = "rgb(" + cr.GetRValue(e).toString() + "," + cr.GetGValue(e).toString() + "," + cr.GetBValue(e).toString() + ")";
		if (t === this.color) return;
		this.color = t;
		this.need_text_redraw = true;
		this.runtime.redraw = true
	};
	l.prototype.SetWebFont = function(e, t) {
		if (this.runtime.isDomFree) {
			cr.logexport("[Construct 2] Text plugin: 'Set web font' not supported on this platform - the action has been ignored");
			return
		}
		var n = this;
		var i = function() {
				n.runtime.redraw = true;
				n.text_changed = true
			};
		if (r.hasOwnProperty(t)) {
			var s = "'" + e + "'";
			if (this.facename === s) return;
			this.facename = s;
			this.updateFont();
			for (var o = 1; o < 10; o++) {
				setTimeout(i, o * 100);
				setTimeout(i, o * 1e3)
			}
			return
		}
		var u = document.createElement("link");
		u.href = t;
		u.rel = "stylesheet";
		u.type = "text/css";
		u.onload = i;
		document.getElementsByTagName("head")[0].appendChild(u);
		r[t] = true;
		this.facename = "'" + e + "'";
		this.updateFont();
		for (var o = 1; o < 10; o++) {
			setTimeout(i, o * 100);
			setTimeout(i, o * 1e3)
		}
	};
	l.prototype.SetEffect = function(e) {
		this.compositeOp = cr.effectToCompositeOp(e);
		cr.setGLBlend(this, e, this.runtime.gl);
		this.runtime.redraw = true
	};
	e.acts = new l;
	c.prototype.Text = function(e) {
		e.set_string(this.text)
	};
	c.prototype.FaceName = function(e) {
		e.set_string(this.facename)
	};
	c.prototype.FaceSize = function(e) {
		e.set_int(this.ptSize)
	};
	c.prototype.TextWidth = function(e) {
		var t = 0;
		var n, r, i;
		for (n = 0, r = this.lines.length; n < r; n++) {
			i = this.lines[n].width;
			if (t < i) t = i
		}
		e.set_int(t)
	};
	c.prototype.TextHeight = function(e) {
		e.set_int(this.lines.length * (this.pxHeight + this.line_height_offset) - this.line_height_offset)
	};
	e.exps = new c
})();
cr.plugins_.Touch = function(e) {
	this.runtime = e
};
(function() {
	function u(e) {
		i = e.x;
		s = e.y;
		o = e.z
	}
	function c(e) {
		a = e.x;
		f = e.y;
		l = e.z
	}
	function d() {}
	function v() {}
	var e = cr.plugins_.Touch.prototype;
	e.Type = function(e) {
		this.plugin = e;
		this.runtime = e.runtime
	};
	var t = e.Type.prototype;
	t.onCreate = function() {};
	e.Instance = function(e) {
		this.type = e;
		this.runtime = e.runtime;
		this.touches = [];
		this.mouseDown = false
	};
	var n = e.Instance.prototype;
	var r = {
		left: 0,
		top: 0
	};
	n.findTouch = function(e) {
		var t, n;
		for (t = 0, n = this.touches.length; t < n; t++) {
			if (this.touches[t]["id"] === e) return t
		}
		return -1
	};
	var i = 0;
	var s = 0;
	var o = 0;
	var a = 0;
	var f = 0;
	var l = 0;
	var h = null;
	n.onCreate = function() {
		h = this;
		this.isWindows8 = !! (typeof window["c2isWindows8"] !== "undefined" && window["c2isWindows8"]);
		this.orient_alpha = 0;
		this.orient_beta = 0;
		this.orient_gamma = 0;
		this.acc_g_x = 0;
		this.acc_g_y = 0;
		this.acc_g_z = 0;
		this.acc_x = 0;
		this.acc_y = 0;
		this.acc_z = 0;
		this.curTouchX = 0;
		this.curTouchY = 0;
		this.trigger_index = 0;
		this.trigger_id = 0;
		this.useMouseInput = this.properties[0] !== 0;
		var e = this.runtime.fullscreen_mode > 0 ? document : this.runtime.canvas;
		var t = document;
		if (this.runtime.isDirectCanvas) t = e = window["Canvas"];
		else if (this.runtime.isCocoonJs) t = e = window;
		var n = this;
		if (window.navigator["msPointerEnabled"]) {
			e.addEventListener("MSPointerDown", function(e) {
				n.onPointerStart(e)
			}, false);
			e.addEventListener("MSPointerMove", function(e) {
				n.onPointerMove(e)
			}, false);
			t.addEventListener("MSPointerUp", function(e) {
				n.onPointerEnd(e)
			}, false);
			t.addEventListener("MSPointerCancel", function(e) {
				n.onPointerEnd(e)
			}, false);
			if (this.runtime.canvas) {
				this.runtime.canvas.addEventListener("MSGestureHold", function(e) {
					e.preventDefault()
				}, false);
				document.addEventListener("MSGestureHold", function(e) {
					e.preventDefault()
				}, false)
			}
		} else {
			e.addEventListener("touchstart", function(e) {
				n.onTouchStart(e)
			}, false);
			e.addEventListener("touchmove", function(e) {
				n.onTouchMove(e)
			}, false);
			t.addEventListener("touchend", function(e) {
				n.onTouchEnd(e)
			}, false);
			t.addEventListener("touchcancel", function(e) {
				n.onTouchEnd(e)
			}, false)
		}
		if (this.isWindows8) {
			var r = function(e) {
					var t = e["reading"];
					n.acc_x = t["accelerationX"];
					n.acc_y = t["accelerationY"];
					n.acc_z = t["accelerationZ"]
				};
			var i = function(e) {
					var t = e["reading"];
					n.orient_alpha = t["yawDegrees"];
					n.orient_beta = t["pitchDegrees"];
					n.orient_gamma = t["rollDegrees"]
				};
			var s = Windows["Devices"]["Sensors"]["Accelerometer"]["getDefault"]();
			if (s) {
				s["reportInterval"] = Math.max(s["minimumReportInterval"], 16);
				s.addEventListener("readingchanged", r)
			}
			var o = Windows["Devices"]["Sensors"]["Inclinometer"]["getDefault"]();
			if (o) {
				o["reportInterval"] = Math.max(o["minimumReportInterval"], 16);
				o.addEventListener("readingchanged", i)
			}
			document.addEventListener("visibilitychange", function(e) {
				if (document["hidden"] || document["msHidden"]) {
					if (s) s.removeEventListener("readingchanged", r);
					if (o) o.removeEventListener("readingchanged", i)
				} else {
					if (s) s.addEventListener("readingchanged", r);
					if (o) o.addEventListener("readingchanged", i)
				}
			}, false)
		} else {
			window.addEventListener("deviceorientation", function(e) {
				n.orient_alpha = e["alpha"] || 0;
				n.orient_beta = e["beta"] || 0;
				n.orient_gamma = e["gamma"] || 0
			}, false);
			window.addEventListener("devicemotion", function(e) {
				if (e["accelerationIncludingGravity"]) {
					n.acc_g_x = e["accelerationIncludingGravity"]["x"];
					n.acc_g_y = e["accelerationIncludingGravity"]["y"];
					n.acc_g_z = e["accelerationIncludingGravity"]["z"]
				}
				if (e["acceleration"]) {
					n.acc_x = e["acceleration"]["x"];
					n.acc_y = e["acceleration"]["y"];
					n.acc_z = e["acceleration"]["z"]
				}
			}, false)
		}
		if (this.useMouseInput && !this.runtime.isDomFree) { /*jQuery(document).mousemove(function(e){n.onMouseMove(e)});jQuery(document).mousedown(function(e){n.onMouseDown(e)});jQuery(document).mouseup(function(e){n.onMouseUp(e)})*/
		}
		if (this.runtime.isAppMobi && !this.runtime.isDirectCanvas) {
			AppMobi["accelerometer"]["watchAcceleration"](u, {
				frequency: 40,
				adjustForRotation: true
			})
		}
		if (this.runtime.isPhoneGap) {
			navigator["accelerometer"]["watchAcceleration"](c, null, {
				frequency: 40
			})
		}
		this.runtime.tick2Me(this)
	};
	n.onPointerMove = function(e) {
		if (e["pointerType"] === e["MSPOINTER_TYPE_MOUSE"]) return;
		if (e.preventDefault) e.preventDefault();
		var t = this.findTouch(e["pointerId"]);
		var n = cr.performance_now();
		if (t >= 0) {
			var i = this.runtime.isDomFree ? r : jQuery(this.runtime.canvas).offset();
			var s = this.touches[t];
			if (n - s.time < 2) return;
			s.lasttime = s.time;
			s.lastx = s.x;
			s.lasty = s.y;
			s.time = n;
			s.x = e.pageX - i.left;
			s.y = e.pageY - i.top
		}
	};
	n.onPointerStart = function(e) {
		if (e["pointerType"] === e["MSPOINTER_TYPE_MOUSE"]) return;
		if (e.preventDefault) e.preventDefault();
		var t = this.runtime.isDomFree ? r : jQuery(this.runtime.canvas).offset();
		var n = e.pageX - t.left;
		var i = e.pageY - t.top;
		var s = cr.performance_now();
		this.trigger_index = this.touches.length;
		this.trigger_id = e["pointerId"];
		this.touches.push({
			time: s,
			x: n,
			y: i,
			lasttime: s,
			lastx: n,
			lasty: i,
			id: e["pointerId"],
			startindex: this.trigger_index
		});
		this.runtime.trigger(cr.plugins_.Touch.prototype.cnds.OnNthTouchStart, this);
		this.runtime.trigger(cr.plugins_.Touch.prototype.cnds.OnTouchStart, this);
		this.curTouchX = n;
		this.curTouchY = i;
		this.runtime.trigger(cr.plugins_.Touch.prototype.cnds.OnTouchObject, this)
	};
	n.onPointerEnd = function(e) {
		if (e["pointerType"] === e["MSPOINTER_TYPE_MOUSE"]) return;
		if (e.preventDefault) e.preventDefault();
		var t = this.findTouch(e["pointerId"]);
		this.trigger_index = t >= 0 ? this.touches[t].startindex : -1;
		this.trigger_id = t >= 0 ? this.touches[t]["id"] : -1;
		this.runtime.trigger(cr.plugins_.Touch.prototype.cnds.OnNthTouchEnd, this);
		this.runtime.trigger(cr.plugins_.Touch.prototype.cnds.OnTouchEnd, this);
		if (t >= 0) {
			this.touches.splice(t, 1)
		}
	};
	n.onTouchMove = function(e) {
		var t = cr.performance_now();
		var n, i, s, o;
		for (n = 0, i = e.changedTouches.length; n < i; n++) {
			s = e.changedTouches[n];
			var u = this.findTouch(s["identifier"]);
			if (u >= 0) {
				var a = this.runtime.isDomFree ? r : jQuery(this.runtime.canvas).offset();
				o = this.touches[u];
				if (t - o.time < 2) continue;
				o.lasttime = o.time;
				o.lastx = o.x;
				o.lasty = o.y;
				o.time = t;
				o.x = s.pageX - a.left;
				o.y = s.pageY - a.top
			}
		}
	};
	n.onTouchStart = function(e) {
		var t = this.runtime.isDomFree ? r : jQuery(this.runtime.canvas).offset();
		var n = cr.performance_now();
		var i, s, o, u;
		for (i = 0, s = e.changedTouches.length; i < s; i++) {
			o = e.changedTouches[i];
			u = this.findTouch(o["identifier"]);
			if (u !== -1) continue;
			var a = o.pageX - t.left;
			var f = o.pageY - t.top;
			this.trigger_index = this.touches.length;
			this.trigger_id = o["identifier"];
			this.touches.push({
				time: n,
				x: a,
				y: f,
				lasttime: n,
				lastx: a,
				lasty: f,
				id: o["identifier"],
				startindex: this.trigger_index
			});
			this.runtime.trigger(cr.plugins_.Touch.prototype.cnds.OnNthTouchStart, this);
			this.runtime.trigger(cr.plugins_.Touch.prototype.cnds.OnTouchStart, this);
			this.curTouchX = a;
			this.curTouchY = f;
			if (navigator.userAgent.match(/iphone|ipod|ios/i)) this.runtime.trigger(cr.plugins_.Touch.prototype.cnds.OnTouchObject, this)
		}
	};
	n.onTouchEnd = function(e) {
		var t, n, r, i;
		for (t = 0, n = e.changedTouches.length; t < n; t++) {
			r = e.changedTouches[t];
			i = this.findTouch(r["identifier"]);
			if (i >= 0) {
				this.trigger_index = this.touches[i].startindex;
				this.trigger_id = this.touches[i]["id"];
				this.runtime.trigger(cr.plugins_.Touch.prototype.cnds.OnNthTouchEnd, this);
				this.runtime.trigger(cr.plugins_.Touch.prototype.cnds.OnTouchEnd, this);
				this.touches.splice(i, 1);
			}
		}
	};
	n.getAlpha = function() {
		if (this.runtime.isAppMobi && this.orient_alpha === 0 && o !== 0) return o * 90;
		else if (this.runtime.isPhoneGap && this.orient_alpha === 0 && l !== 0) return l * 90;
		else return this.orient_alpha
	};
	n.getBeta = function() {
		if (this.runtime.isAppMobi && this.orient_beta === 0 && s !== 0) return s * -90;
		else if (this.runtime.isPhoneGap && this.orient_beta === 0 && f !== 0) return f * -90;
		else return this.orient_beta
	};
	n.getGamma = function() {
		if (this.runtime.isAppMobi && this.orient_gamma === 0 && i !== 0) return i * 90;
		else if (this.runtime.isPhoneGap && this.orient_gamma === 0 && a !== 0) return a * 90;
		else return this.orient_gamma
	};
	var p = function() {};
	n.onMouseDown = function(e) {
		if (e.preventDefault && this.runtime.had_a_click) e.preventDefault();
		var t = {
			pageX: e.pageX,
			pageY: e.pageY,
			identifier: 0
		};
		var n = {
			changedTouches: [t]
		};
		this.onTouchStart(n);
		this.mouseDown = true
	};
	n.onMouseMove = function(e) {
		if (e.preventDefault && this.runtime.had_a_click) e.preventDefault();
		if (!this.mouseDown) return;
		var t = {
			pageX: e.pageX,
			pageY: e.pageY,
			identifier: 0
		};
		var n = {
			changedTouches: [t]
		};
		this.onTouchMove(n)
	};
	n.onMouseUp = function(e) {
		if (e.preventDefault && this.runtime.had_a_click) e.preventDefault();
		this.runtime.had_a_click = true;
		var t = {
			pageX: e.pageX,
			pageY: e.pageY,
			identifier: 0
		};
		var n = {
			changedTouches: [t]
		};
		this.onTouchEnd(n);
		this.mouseDown = false
	};
	n.tick2 = function() {
		var e, t, n;
		var r = cr.performance_now();
		for (e = 0, t = this.touches.length; e < t; e++) {
			n = this.touches[e];
			if (n.time <= r - 50) n.lasttime = r
		}
	};
	d.prototype.OnTouchStart = function() {
		return true
	};
	d.prototype.OnTouchEnd = function() {
		return true
	};
	d.prototype.IsInTouch = function() {
		return this.touches.length
	};
	d.prototype.OnTouchObject = function(e) {
		if (!e) return false;
		return this.runtime.testAndSelectCanvasPointOverlap(e, this.curTouchX, this.curTouchY, false)
	};
	d.prototype.IsTouchingObject = function(e) {
		if (!e) return false;
		var t = e.getCurrentSol();
		var n = t.getObjects();
		var r, i;
		var s = [];
		var o, u, a, f;
		for (o = 0, u = n.length; o < u; o++) {
			var l = n[o];
			l.update_bbox();
			for (a = 0, f = this.touches.length; a < f; a++) {
				var c = this.touches[a];
				r = l.layer.canvasToLayer(c.x, c.y, true);
				i = l.layer.canvasToLayer(c.x, c.y, false);
				if (l.contains_pt(r, i)) {
					s.push(l);
					break
				}
			}
		}
		if (s.length) {
			t.select_all = false;
			t.instances = s;
			return true
		} else return false
	};
	d.prototype.CompareTouchSpeed = function(e, t, n) {
		e = Math.floor(e);
		if (e < 0 || e >= this.touches.length) return false;
		var r = this.touches[e];
		var i = cr.distanceTo(r.x, r.y, r.lastx, r.lasty);
		var s = (r.time - r.lasttime) / 1e3;
		var o = 0;
		if (s > 0) o = i / s;
		return cr.do_cmp(o, t, n)
	};
	d.prototype.OrientationSupported = function() {
		return typeof window["DeviceOrientationEvent"] !== "undefined"
	};
	d.prototype.MotionSupported = function() {
		return typeof window["DeviceMotionEvent"] !== "undefined"
	};
	d.prototype.CompareOrientation = function(e, t, n) {
		var r = 0;
		if (e === 0) r = this.getAlpha();
		else if (e === 1) r = this.getBeta();
		else r = this.getGamma();
		return cr.do_cmp(r, t, n)
	};
	d.prototype.CompareAcceleration = function(e, t, n) {
		var r = 0;
		if (e === 0) r = this.acc_g_x;
		else if (e === 1) r = this.acc_g_y;
		else if (e === 2) r = this.acc_g_z;
		else if (e === 3) r = this.acc_x;
		else if (e === 4) r = this.acc_y;
		else if (e === 5) r = this.acc_z;
		return cr.do_cmp(r, t, n)
	};
	d.prototype.OnNthTouchStart = function(e) {
		e = Math.floor(e);
		return e === this.trigger_index
	};
	d.prototype.OnNthTouchEnd = function(e) {
		e = Math.floor(e);
		return e === this.trigger_index
	};
	d.prototype.HasNthTouch = function(e) {
		e = Math.floor(e);
		return this.touches.length >= e + 1
	};
	e.cnds = new d;
	v.prototype.TouchCount = function(e) {
		e.set_int(this.touches.length)
	};
	v.prototype.X = function(e, t) {
		if (this.touches.length) {
			var n, r, i, s, o;
			if (cr.is_undefined(t)) {
				n = this.runtime.getLayerByNumber(0);
				r = n.scale;
				i = n.zoomRate;
				s = n.parallaxX;
				o = n.angle;
				n.scale = this.runtime.running_layout.scale;
				n.zoomRate = 1;
				n.parallaxX = 1;
				n.angle = this.runtime.running_layout.angle;
				e.set_float(n.canvasToLayer(this.touches[0].x, this.touches[0].y, true));
				n.scale = r;
				n.zoomRate = i;
				n.parallaxX = s;
				n.angle = o
			} else {
				if (cr.is_number(t)) n = this.runtime.getLayerByNumber(t);
				else n = this.runtime.getLayerByName(t);
				if (n) e.set_float(n.canvasToLayer(this.touches[0].x, this.touches[0].y, true));
				else e.set_float(0)
			}
		} else e.set_float(0)
	};
	v.prototype.XAt = function(e, t, n) {
		t = Math.floor(t);
		if (t < 0 || t >= this.touches.length) {
			e.set_float(0);
			return
		}
		var r, i, s, o, u;
		if (cr.is_undefined(n)) {
			r = this.runtime.getLayerByNumber(0);
			i = r.scale;
			s = r.zoomRate;
			o = r.parallaxX;
			u = r.angle;
			r.scale = this.runtime.running_layout.scale;
			r.zoomRate = 1;
			r.parallaxX = 1;
			r.angle = this.runtime.running_layout.angle;
			e.set_float(r.canvasToLayer(this.touches[t].x, this.touches[t].y, true));
			r.scale = i;
			r.zoomRate = s;
			r.parallaxX = o;
			r.angle = u
		} else {
			if (cr.is_number(n)) r = this.runtime.getLayerByNumber(n);
			else r = this.runtime.getLayerByName(n);
			if (r) e.set_float(r.canvasToLayer(this.touches[t].x, this.touches[t].y, true));
			else e.set_float(0)
		}
	};
	v.prototype.XForID = function(e, t, n) {
		var r = this.findTouch(t);
		if (r < 0) {
			e.set_float(0);
			return
		}
		var i = this.touches[r];
		var s, o, u, a, f;
		if (cr.is_undefined(n)) {
			s = this.runtime.getLayerByNumber(0);
			o = s.scale;
			u = s.zoomRate;
			a = s.parallaxX;
			f = s.angle;
			s.scale = this.runtime.running_layout.scale;
			s.zoomRate = 1;
			s.parallaxX = 1;
			s.angle = this.runtime.running_layout.angle;
			e.set_float(s.canvasToLayer(i.x, i.y, true));
			s.scale = o;
			s.zoomRate = u;
			s.parallaxX = a;
			s.angle = f
		} else {
			if (cr.is_number(n)) s = this.runtime.getLayerByNumber(n);
			else s = this.runtime.getLayerByName(n);
			if (s) e.set_float(s.canvasToLayer(i.x, i.y, true));
			else e.set_float(0)
		}
	};
	v.prototype.Y = function(e, t) {
		if (this.touches.length) {
			var n, r, i, s, o;
			if (cr.is_undefined(t)) {
				n = this.runtime.getLayerByNumber(0);
				r = n.scale;
				i = n.zoomRate;
				s = n.parallaxY;
				o = n.angle;
				n.scale = this.runtime.running_layout.scale;
				n.zoomRate = 1;
				n.parallaxY = 1;
				n.angle = this.runtime.running_layout.angle;
				e.set_float(n.canvasToLayer(this.touches[0].x, this.touches[0].y, false));
				n.scale = r;
				n.zoomRate = i;
				n.parallaxY = s;
				n.angle = o
			} else {
				if (cr.is_number(t)) n = this.runtime.getLayerByNumber(t);
				else n = this.runtime.getLayerByName(t);
				if (n) e.set_float(n.canvasToLayer(this.touches[0].x, this.touches[0].y, false));
				else e.set_float(0)
			}
		} else e.set_float(0)
	};
	v.prototype.YAt = function(e, t, n) {
		t = Math.floor(t);
		if (t < 0 || t >= this.touches.length) {
			e.set_float(0);
			return
		}
		var r, i, s, o, u;
		if (cr.is_undefined(n)) {
			r = this.runtime.getLayerByNumber(0);
			i = r.scale;
			s = r.zoomRate;
			o = r.parallaxY;
			u = r.angle;
			r.scale = this.runtime.running_layout.scale;
			r.zoomRate = 1;
			r.parallaxY = 1;
			r.angle = this.runtime.running_layout.angle;
			e.set_float(r.canvasToLayer(this.touches[t].x, this.touches[t].y, false));
			r.scale = i;
			r.zoomRate = s;
			r.parallaxY = o;
			r.angle = u
		} else {
			if (cr.is_number(n)) r = this.runtime.getLayerByNumber(n);
			else r = this.runtime.getLayerByName(n);
			if (r) e.set_float(r.canvasToLayer(this.touches[t].x, this.touches[t].y, false));
			else e.set_float(0)
		}
	};
	v.prototype.YForID = function(e, t, n) {
		var r = this.findTouch(t);
		if (r < 0) {
			e.set_float(0);
			return
		}
		var i = this.touches[r];
		var s, o, u, a, f;
		if (cr.is_undefined(n)) {
			s = this.runtime.getLayerByNumber(0);
			o = s.scale;
			u = s.zoomRate;
			a = s.parallaxY;
			f = s.angle;
			s.scale = this.runtime.running_layout.scale;
			s.zoomRate = 1;
			s.parallaxY = 1;
			s.angle = this.runtime.running_layout.angle;
			e.set_float(s.canvasToLayer(i.x, i.y, false));
			s.scale = o;
			s.zoomRate = u;
			s.parallaxY = a;
			s.angle = f
		} else {
			if (cr.is_number(n)) s = this.runtime.getLayerByNumber(n);
			else s = this.runtime.getLayerByName(n);
			if (s) e.set_float(s.canvasToLayer(i.x, i.y, false));
			else e.set_float(0)
		}
	};
	v.prototype.AbsoluteX = function(e) {
		if (this.touches.length) e.set_float(this.touches[0].x);
		else e.set_float(0)
	};
	v.prototype.AbsoluteXAt = function(e, t) {
		t = Math.floor(t);
		if (t < 0 || t >= this.touches.length) {
			e.set_float(0);
			return
		}
		e.set_float(this.touches[t].x)
	};
	v.prototype.AbsoluteXForID = function(e, t) {
		var n = this.findTouch(t);
		if (n < 0) {
			e.set_float(0);
			return
		}
		var r = this.touches[n];
		e.set_float(r.x)
	};
	v.prototype.AbsoluteY = function(e) {
		if (this.touches.length) e.set_float(this.touches[0].y);
		else e.set_float(0)
	};
	v.prototype.AbsoluteYAt = function(e, t) {
		t = Math.floor(t);
		if (t < 0 || t >= this.touches.length) {
			e.set_float(0);
			return
		}
		e.set_float(this.touches[t].y)
	};
	v.prototype.AbsoluteYForID = function(e, t) {
		var n = this.findTouch(t);
		if (n < 0) {
			e.set_float(0);
			return
		}
		var r = this.touches[n];
		e.set_float(r.y)
	};
	v.prototype.SpeedAt = function(e, t) {
		t = Math.floor(t);
		if (t < 0 || t >= this.touches.length) {
			e.set_float(0);
			return
		}
		var n = this.touches[t];
		var r = cr.distanceTo(n.x, n.y, n.lastx, n.lasty);
		var i = (n.time - n.lasttime) / 1e3;
		if (i === 0) e.set_float(0);
		else e.set_float(r / i)
	};
	v.prototype.SpeedForID = function(e, t) {
		var n = this.findTouch(t);
		if (n < 0) {
			e.set_float(0);
			return
		}
		var r = this.touches[n];
		var i = cr.distanceTo(r.x, r.y, r.lastx, r.lasty);
		var s = (r.time - r.lasttime) / 1e3;
		if (s === 0) e.set_float(0);
		else e.set_float(i / s)
	};
	v.prototype.AngleAt = function(e, t) {
		t = Math.floor(t);
		if (t < 0 || t >= this.touches.length) {
			e.set_float(0);
			return
		}
		var n = this.touches[t];
		e.set_float(cr.to_degrees(cr.angleTo(n.lastx, n.lasty, n.x, n.y)))
	};
	v.prototype.AngleForID = function(e, t) {
		var n = this.findTouch(t);
		if (n < 0) {
			e.set_float(0);
			return
		}
		var r = this.touches[n];
		e.set_float(cr.to_degrees(cr.angleTo(r.lastx, r.lasty, r.x, r.y)))
	};
	v.prototype.Alpha = function(e) {
		e.set_float(this.getAlpha())
	};
	v.prototype.Beta = function(e) {
		e.set_float(this.getBeta())
	};
	v.prototype.Gamma = function(e) {
		e.set_float(this.getGamma())
	};
	v.prototype.AccelerationXWithG = function(e) {
		e.set_float(this.acc_g_x)
	};
	v.prototype.AccelerationYWithG = function(e) {
		e.set_float(this.acc_g_y)
	};
	v.prototype.AccelerationZWithG = function(e) {
		e.set_float(this.acc_g_z)
	};
	v.prototype.AccelerationX = function(e) {
		e.set_float(this.acc_x)
	};
	v.prototype.AccelerationY = function(e) {
		e.set_float(this.acc_y)
	};
	v.prototype.AccelerationZ = function(e) {
		e.set_float(this.acc_z)
	};
	v.prototype.TouchIndex = function(e) {
		e.set_int(this.trigger_index)
	};
	v.prototype.TouchID = function(e) {
		e.set_float(this.trigger_id)
	};
	e.exps = new v
})();
cr.behaviors.Fade = function(e) {
	this.runtime = e
};
(function() {
	function r() {}
	function i() {}
	var e = cr.behaviors.Fade.prototype;
	e.Type = function(e, t) {
		this.behavior = e;
		this.objtype = t;
		this.runtime = e.runtime
	};
	var t = e.Type.prototype;
	t.onCreate = function() {};
	e.Instance = function(e, t) {
		this.type = e;
		this.behavior = e.behavior;
		this.inst = t;
		this.runtime = e.runtime
	};
	var n = e.Instance.prototype;
	n.onCreate = function() {
		var e = this.properties[0] === 1;
		this.fadeInTime = this.properties[1];
		this.waitTime = this.properties[2];
		this.fadeOutTime = this.properties[3];
		this.destroy = this.properties[4];
		this.stage = e ? 0 : 3;
		if (this.recycled) this.stageTime.reset();
		else this.stageTime = new cr.KahanAdder;
		this.maxOpacity = this.inst.opacity ? this.inst.opacity : 1;
		if (e) {
			if (this.fadeInTime === 0) {
				this.stage = 1;
				if (this.waitTime === 0) this.stage = 2
			} else {
				this.inst.opacity = 0;
				this.runtime.redraw = true
			}
		}
	};
	n.saveToJSON = function() {
		return {
			fit: this.fadeInTime,
			wt: this.waitTime,
			fot: this.fadeOutTime,
			s: this.stage,
			st: this.stageTime.sum,
			mo: this.maxOpacity
		}
	};
	n.loadFromJSON = function(e) {
		this.fadeInTime = e["fit"];
		this.waitTime = e["wt"];
		this.fadeOutTime = e["fot"];
		this.stage = e["s"];
		this.stageTime.reset();
		this.stageTime.sum = e["st"];
		this.maxOpacity = e["mo"]
	};
	n.tick = function() {
		this.stageTime.add(this.runtime.getDt(this.inst));
		if (this.stage === 0) {
			this.inst.opacity = this.stageTime.sum / this.fadeInTime * this.maxOpacity;
			this.runtime.redraw = true;
			if (this.inst.opacity >= this.maxOpacity) {
				this.inst.opacity = this.maxOpacity;
				this.stage = 1;
				this.stageTime.reset()
			}
		}
		if (this.stage === 1) {
			if (this.stageTime.sum >= this.waitTime) {
				this.stage = 2;
				this.stageTime.reset()
			}
		}
		if (this.stage === 2) {
			if (this.fadeOutTime !== 0) {
				this.inst.opacity = this.maxOpacity - this.stageTime.sum / this.fadeOutTime * this.maxOpacity;
				this.runtime.redraw = true;
				if (this.inst.opacity < 0) {
					this.inst.opacity = 0;
					this.stage = 3;
					this.stageTime.reset();
					this.runtime.trigger(cr.behaviors.Fade.prototype.cnds.OnFadeOutEnd, this.inst);
					if (this.destroy === 1) this.runtime.DestroyInstance(this.inst)
				}
			}
		}
	};
	n.doStart = function() {
		this.stage = 0;
		this.stageTime.reset();
		if (this.fadeInTime === 0) {
			this.stage = 1;
			if (this.waitTime === 0) this.stage = 2
		} else {
			this.inst.opacity = 0;
			this.runtime.redraw = true
		}
	};
	r.prototype.OnFadeOutEnd = function() {
		return true
	};
	e.cnds = new r;
	i.prototype.StartFade = function() {
		if (this.stage === 3) this.doStart()
	};
	i.prototype.RestartFade = function() {
		this.doStart()
	};
	e.acts = new i
})();
cr.behaviors.Sin = function(e) {
	this.runtime = e
};
(function() {
	function o() {}
	function u() {}
	function a() {}
	var e = cr.behaviors.Sin.prototype;
	e.Type = function(e, t) {
		this.behavior = e;
		this.objtype = t;
		this.runtime = e.runtime
	};
	var t = e.Type.prototype;
	t.onCreate = function() {};
	e.Instance = function(e, t) {
		this.type = e;
		this.behavior = e.behavior;
		this.inst = t;
		this.runtime = e.runtime;
		this.i = 0
	};
	var n = e.Instance.prototype;
	var r = 2 * Math.PI;
	var i = Math.PI / 2;
	var s = 3 * Math.PI / 2;
	n.onCreate = function() {
		this.active = this.properties[0] === 1;
		this.movement = this.properties[1];
		this.wave = this.properties[2];
		this.period = this.properties[3];
		this.period += Math.random() * this.properties[4];
		if (this.period === 0) this.i = 0;
		else {
			this.i = this.properties[5] / this.period * r;
			this.i += Math.random() * this.properties[6] / this.period * r
		}
		this.mag = this.properties[7];
		this.mag += Math.random() * this.properties[8];
		this.initialValue = 0;
		this.initialValue2 = 0;
		this.ratio = 0;
		this.init()
	};
	n.saveToJSON = function() {
		return {
			i: this.i,
			a: this.active,
			mv: this.movement,
			w: this.wave,
			p: this.period,
			mag: this.mag,
			iv: this.initialValue,
			iv2: this.initialValue2,
			r: this.ratio,
			lkv: this.lastKnownValue,
			lkv2: this.lastKnownValue2
		}
	};
	n.loadFromJSON = function(e) {
		this.i = e["i"];
		this.active = e["a"];
		this.movement = e["mv"];
		this.wave = e["w"];
		this.period = e["p"];
		this.mag = e["mag"];
		this.initialValue = e["iv"];
		this.initialValue2 = e["iv2"] || 0;
		this.ratio = e["r"];
		this.lastKnownValue = e["lkv"];
		this.lastKnownValue2 = e["lkv2"] || 0
	};
	n.init = function() {
		switch (this.movement) {
		case 0:
			this.initialValue = this.inst.x;
			break;
		case 1:
			this.initialValue = this.inst.y;
			break;
		case 2:
			this.initialValue = this.inst.width;
			this.ratio = this.inst.height / this.inst.width;
			break;
		case 3:
			this.initialValue = this.inst.width;
			break;
		case 4:
			this.initialValue = this.inst.height;
			break;
		case 5:
			this.initialValue = this.inst.angle;
			this.mag = cr.to_radians(this.mag);
			break;
		case 6:
			this.initialValue = this.inst.opacity;
			break;
		case 7:
			this.initialValue = 0;
			break;
		case 8:
			this.initialValue = this.inst.x;
			this.initialValue2 = this.inst.y;
			break;
		default:
		}
		this.lastKnownValue = this.initialValue;
		this.lastKnownValue2 = this.initialValue2
	};
	n.waveFunc = function(e) {
		e = e % r;
		switch (this.wave) {
		case 0:
			return Math.sin(e);
		case 1:
			if (e <= i) return e / i;
			else if (e <= s) return 1 - 2 * (e - i) / Math.PI;
			else return (e - s) / i - 1;
		case 2:
			return 2 * e / r - 1;
		case 3:
			return -2 * e / r + 1;
		case 4:
			return e < Math.PI ? -1 : 1
		}
		return 0
	};
	n.tick = function() {
		var e = this.runtime.getDt(this.inst);
		if (!this.active || e === 0) return;
		if (this.period === 0) this.i = 0;
		else {
			this.i += e / this.period * r;
			this.i = this.i % r
		}
		switch (this.movement) {
		case 0:
			if (this.inst.x !== this.lastKnownValue) this.initialValue += this.inst.x - this.lastKnownValue;
			this.inst.x = this.initialValue + this.waveFunc(this.i) * this.mag;
			this.lastKnownValue = this.inst.x;
			break;
		case 1:
			if (this.inst.y !== this.lastKnownValue) this.initialValue += this.inst.y - this.lastKnownValue;
			this.inst.y = this.initialValue + this.waveFunc(this.i) * this.mag;
			this.lastKnownValue = this.inst.y;
			break;
		case 2:
			this.inst.width = this.initialValue + this.waveFunc(this.i) * this.mag;
			this.inst.height = this.inst.width * this.ratio;
			break;
		case 3:
			this.inst.width = this.initialValue + this.waveFunc(this.i) * this.mag;
			break;
		case 4:
			this.inst.height = this.initialValue + this.waveFunc(this.i) * this.mag;
			break;
		case 5:
			if (this.inst.angle !== this.lastKnownValue) this.initialValue = cr.clamp_angle(this.initialValue + (this.inst.angle - this.lastKnownValue));
			this.inst.angle = cr.clamp_angle(this.initialValue + this.waveFunc(this.i) * this.mag);
			this.lastKnownValue = this.inst.angle;
			break;
		case 6:
			this.inst.opacity = this.initialValue + this.waveFunc(this.i) * this.mag / 100;
			if (this.inst.opacity < 0) this.inst.opacity = 0;
			else if (this.inst.opacity > 1) this.inst.opacity = 1;
			break;
		case 8:
			if (this.inst.x !== this.lastKnownValue) this.initialValue += this.inst.x - this.lastKnownValue;
			if (this.inst.y !== this.lastKnownValue2) this.initialValue2 += this.inst.y - this.lastKnownValue2;
			this.inst.x = this.initialValue + Math.cos(this.inst.angle) * this.waveFunc(this.i) * this.mag;
			this.inst.y = this.initialValue2 + Math.sin(this.inst.angle) * this.waveFunc(this.i) * this.mag;
			this.lastKnownValue = this.inst.x;
			this.lastKnownValue2 = this.inst.y;
			break
		}
		this.inst.set_bbox_changed()
	};
	n.onSpriteFrameChanged = function(e, t) {
		switch (this.movement) {
		case 2:
			this.initialValue *= t.width / e.width;
			this.ratio = t.height / t.width;
			break;
		case 3:
			this.initialValue *= t.width / e.width;
			break;
		case 4:
			this.initialValue *= t.height / e.height;
			break
		}
	};
	o.prototype.IsActive = function() {
		return this.active
	};
	o.prototype.CompareMovement = function(e) {
		return this.movement === e
	};
	o.prototype.ComparePeriod = function(e, t) {
		return cr.do_cmp(this.period, e, t)
	};
	o.prototype.CompareMagnitude = function(e, t) {
		if (this.movement === 5) return cr.do_cmp(this.mag, e, cr.to_radians(t));
		else return cr.do_cmp(this.mag, e, t)
	};
	o.prototype.CompareWave = function(e) {
		return this.wave === e
	};
	e.cnds = new o;
	u.prototype.SetActive = function(e) {
		this.active = e === 1
	};
	u.prototype.SetPeriod = function(e) {
		this.period = e
	};
	u.prototype.SetMagnitude = function(e) {
		this.mag = e;
		if (this.movement === 5) this.mag = cr.to_radians(this.mag)
	};
	u.prototype.SetMovement = function(e) {
		if (this.movement === 5) this.mag = cr.to_degrees(this.mag);
		this.movement = e;
		this.init()
	};
	u.prototype.SetWave = function(e) {
		this.wave = e
	};
	e.acts = new u;
	a.prototype.CyclePosition = function(e) {
		e.set_float(this.i / r)
	};
	a.prototype.Period = function(e) {
		e.set_float(this.period)
	};
	a.prototype.Magnitude = function(e) {
		if (this.movement === 5) e.set_float(cr.to_degrees(this.mag));
		else e.set_float(this.mag)
	};
	a.prototype.Value = function(e) {
		e.set_float(this.waveFunc(this.i) * this.mag)
	};
	e.exps = new a
})();
cr.behaviors.custom = function(e) {
	this.runtime = e
};
(function() {
	function r(e) {
		if (e === 0) return 0;
		else if (e < 0) return -1;
		else return 1
	}
	function i() {}
	function s() {}
	function o() {}
	var e = cr.behaviors.custom.prototype;
	e.Type = function(e, t) {
		this.behavior = e;
		this.objtype = t;
		this.runtime = e.runtime
	};
	var t = e.Type.prototype;
	t.onCreate = function() {};
	e.Instance = function(e, t) {
		this.type = e;
		this.behavior = e.behavior;
		this.inst = t;
		this.runtime = e.runtime;
		this.dx = 0;
		this.dy = 0;
		this.cancelStep = 0
	};
	var n = e.Instance.prototype;
	n.onCreate = function() {
		this.stepMode = this.properties[0];
		this.pxPerStep = this.properties[1];
		this.enabled = this.properties[2] !== 0
	};
	n.saveToJSON = function() {
		return {
			dx: this.dx,
			dy: this.dy,
			cancelStep: this.cancelStep,
			enabled: this.enabled,
			stepMode: this.stepMode,
			pxPerStep: this.pxPerStep
		}
	};
	n.loadFromJSON = function(e) {
		this.dx = e["dx"];
		this.dy = e["dy"];
		this.cancelStep = e["cancelStep"];
		this.enabled = e["enabled"];
		this.stepMode = e["stepMode"];
		this.pxPerStep = e["pxPerStep"]
	};
	n.getSpeed = function() {
		return Math.sqrt(this.dx * this.dx + this.dy * this.dy)
	};
	n.getAngle = function() {
		return Math.atan2(this.dy, this.dx)
	};
	n.step = function(e, t, n) {
		if (e === 0 && t === 0) return;
		var r = this.inst.x;
		var i = this.inst.y;
		var s, o, u;
		var a = Math.round(Math.sqrt(e * e + t * t) / this.pxPerStep);
		if (a === 0) a = 1;
		var f;
		for (f = 1; f <= a; f++) {
			u = f / a;
			this.inst.x = r + e * u;
			this.inst.y = i + t * u;
			this.inst.set_bbox_changed();
			this.runtime.trigger(n, this.inst);
			if (this.cancelStep === 1) {
				f--;
				u = f / a;
				this.inst.x = r + e * u;
				this.inst.y = i + t * u;
				this.inst.set_bbox_changed();
				return
			} else if (this.cancelStep === 2) {
				return
			}
		}
	};
	n.tick = function() {
		var e = this.runtime.getDt(this.inst);
		var t = this.dx * e;
		var n = this.dy * e;
		var r, i;
		if (this.dx === 0 && this.dy === 0 || !this.enabled) return;
		this.cancelStep = 0;
		if (this.stepMode === 0) {
			this.inst.x += t;
			this.inst.y += n
		} else if (this.stepMode === 1) {
			this.step(t, n, cr.behaviors.custom.prototype.cnds.OnCMStep)
		} else if (this.stepMode === 2) {
			this.step(t, 0, cr.behaviors.custom.prototype.cnds.OnCMHorizStep);
			this.cancelStep = 0;
			this.step(0, n, cr.behaviors.custom.prototype.cnds.OnCMVertStep)
		} else if (this.stepMode === 3) {
			this.step(0, n, cr.behaviors.custom.prototype.cnds.OnCMVertStep);
			this.cancelStep = 0;
			this.step(t, 0, cr.behaviors.custom.prototype.cnds.OnCMHorizStep)
		}
		this.inst.set_bbox_changed()
	};
	i.prototype.IsMoving = function() {
		return this.dx != 0 || this.dy != 0
	};
	i.prototype.CompareSpeed = function(e, t, n) {
		var r;
		switch (e) {
		case 0:
			r = this.getSpeed();
			break;
		case 1:
			r = this.dx;
			break;
		case 2:
			r = this.dy;
			break
		}
		return cr.do_cmp(r, t, n)
	};
	i.prototype.OnCMStep = function() {
		return true
	};
	i.prototype.OnCMHorizStep = function() {
		return true
	};
	i.prototype.OnCMVertStep = function() {
		return true
	};
	e.cnds = new i;
	s.prototype.Stop = function() {
		this.dx = 0;
		this.dy = 0
	};
	s.prototype.Reverse = function(e) {
		switch (e) {
		case 0:
			this.dx *= -1;
			this.dy *= -1;
			break;
		case 1:
			this.dx *= -1;
			break;
		case 2:
			this.dy *= -1;
			break
		}
	};
	s.prototype.SetSpeed = function(e, t) {
		var n;
		switch (e) {
		case 0:
			n = this.getAngle();
			this.dx = Math.cos(n) * t;
			this.dy = Math.sin(n) * t;
			break;
		case 1:
			this.dx = t;
			break;
		case 2:
			this.dy = t;
			break
		}
	};
	s.prototype.Accelerate = function(e, t) {
		var n = this.runtime.getDt(this.inst);
		var r = t * n;
		var i;
		switch (e) {
		case 0:
			i = this.getAngle();
			this.dx += Math.cos(i) * r;
			this.dy += Math.sin(i) * r;
			break;
		case 1:
			this.dx += r;
			break;
		case 2:
			this.dy += r;
			break
		}
	};
	s.prototype.AccelerateAngle = function(e, t) {
		var n = this.runtime.getDt(this.inst);
		var r = e * n;
		var i = cr.to_radians(t);
		this.dx += Math.cos(i) * r;
		this.dy += Math.sin(i) * r
	};
	s.prototype.AcceleratePos = function(e, t, n) {
		var r = this.runtime.getDt(this.inst);
		var i = e * r;
		var s = Math.atan2(n - this.inst.y, t - this.inst.x);
		this.dx += Math.cos(s) * i;
		this.dy += Math.sin(s) * i
	};
	s.prototype.SetAngleOfMotion = function(e) {
		var t = cr.to_radians(e);
		var n = this.getSpeed();
		this.dx = Math.cos(t) * n;
		this.dy = Math.sin(t) * n
	};
	s.prototype.RotateAngleOfMotionClockwise = function(e) {
		var t = this.getAngle() + cr.to_radians(e);
		var n = this.getSpeed();
		this.dx = Math.cos(t) * n;
		this.dy = Math.sin(t) * n
	};
	s.prototype.RotateAngleOfMotionCounterClockwise = function(e) {
		var t = this.getAngle() - cr.to_radians(e);
		var n = this.getSpeed();
		this.dx = Math.cos(t) * n;
		this.dy = Math.sin(t) * n
	};
	s.prototype.StopStepping = function(e) {
		this.cancelStep = e + 1
	};
	s.prototype.PushOutSolid = function(e) {
		var t, n, r;
		switch (e) {
		case 0:
			t = this.getAngle();
			n = Math.cos(t);
			r = Math.sin(t);
			this.runtime.pushOutSolid(this.inst, -n, -r, Math.max(this.getSpeed() * 3, 100));
			break;
		case 1:
			this.runtime.pushOutSolidNearest(this.inst);
			break;
		case 2:
			this.runtime.pushOutSolid(this.inst, 0, -1, Math.max(Math.abs(this.dy) * 3, 100));
			break;
		case 3:
			this.runtime.pushOutSolid(this.inst, 0, 1, Math.max(Math.abs(this.dy) * 3, 100));
			break;
		case 4:
			this.runtime.pushOutSolid(this.inst, -1, 0, Math.max(Math.abs(this.dx) * 3, 100));
			break;
		case 5:
			this.runtime.pushOutSolid(this.inst, 1, 0, Math.max(Math.abs(this.dx) * 3, 100));
			break
		}
	};
	s.prototype.PushOutSolidAngle = function(e) {
		e = cr.to_radians(e);
		var t = Math.cos(e);
		var n = Math.sin(e);
		this.runtime.pushOutSolid(this.inst, t, n, Math.max(this.getSpeed() * 3, 100))
	};
	s.prototype.SetEnabled = function(e) {
		this.enabled = e === 1
	};
	e.acts = new s;
	o.prototype.Speed = function(e) {
		e.set_float(this.getSpeed())
	};
	o.prototype.MovingAngle = function(e) {
		e.set_float(cr.to_degrees(this.getAngle()))
	};
	o.prototype.dx = function(e) {
		e.set_float(this.dx)
	};
	o.prototype.dy = function(e) {
		e.set_float(this.dy)
	};
	e.exps = new o
})();
var easeOutBounceArray = [];
var easeInElasticArray = [];
var easeOutElasticArray = [];
var easeInOutElasticArray = [];
var easeInCircle = [];
var easeOutCircle = [];
var easeInOutCircle = [];
var easeOutBack = [];
var easeInOutBack = [];
var litetween_precision = 1e4;
var updateLimit = 0;
(function() {
	var t = 1;
	var n = 0;
	var r = 1;
	var i = 0;
	var s = 0;
	var o = 0;
	var u = 0;
	var a = 0;
	for (var f = 0; f <= litetween_precision; f++) {
		u = f / litetween_precision;
		if ((u /= t) < 1 / 2.75) {
			i = r * 7.5625 * u * u + n
		} else if (u < 2 / 2.75) {
			i = r * (7.5625 * (u -= 1.5 / 2.75) * u + .75) + n
		} else if (u < 2.5 / 2.75) {
			i = r * (7.5625 * (u -= 2.25 / 2.75) * u + .9375) + n
		} else {
			i = r * (7.5625 * (u -= 2.625 / 2.75) * u + .984375) + n
		}
		easeOutBounceArray[f] = easeOutBounce(f / litetween_precision, n, r, t);
		u = f / litetween_precision;
		s = 0;
		o = 0;
		if (u == 0) i = n;
		if ((u /= t) == 1) i = n + r;
		if (o == 0) o = t * .3;
		if (s == 0 || s < Math.abs(r)) {
			s = r;
			var a = o / 4
		} else var a = o / (2 * Math.PI) * Math.asin(r / s);
		i = -(s * Math.pow(2, 10 * (u -= 1)) * Math.sin((u * t - a) * 2 * Math.PI / o)) + n;
		easeInElasticArray[f] = i;
		u = f / litetween_precision;
		s = 0;
		o = 0;
		if (u == 0) i = n;
		if ((u /= t) == 1) i = n + r;
		if (o == 0) o = t * .3;
		if (s == 0 || s < Math.abs(r)) {
			s = r;
			var a = o / 4
		} else var a = o / (2 * Math.PI) * Math.asin(r / s);
		i = s * Math.pow(2, -10 * u) * Math.sin((u * t - a) * 2 * Math.PI / o) + r + n;
		easeOutElasticArray[f] = i;
		u = f / litetween_precision;
		s = 0;
		o = 0;
		if (u == 0) i = n;
		if ((u /= t / 2) == 2) i = n + r;
		if (o == 0) o = t * .3 * 1.5;
		if (s == 0 || s < Math.abs(r)) {
			s = r;
			var a = o / 4
		} else var a = o / (2 * Math.PI) * Math.asin(r / s);
		if (u < 1) i = -.5 * s * Math.pow(2, 10 * (u -= 1)) * Math.sin((u * t - a) * 2 * Math.PI / o) + n;
		else i = s * Math.pow(2, -10 * (u -= 1)) * Math.sin((u * t - a) * 2 * Math.PI / o) * .5 + r + n;
		easeInOutElasticArray[f] = i;
		u = f / litetween_precision;
		easeInCircle[f] = -(Math.sqrt(1 - u * u) - 1);
		u = f / litetween_precision;
		easeOutCircle[f] = Math.sqrt(1 - (u - 1) * (u - 1));
		u = f / litetween_precision;
		if ((u /= t / 2) < 1) i = -r / 2 * (Math.sqrt(1 - u * u) - 1) + n;
		else i = r / 2 * (Math.sqrt(1 - (u -= 2) * u) + 1) + n;
		easeInOutCircle[f] = i;
		u = f / litetween_precision;
		a = 0;
		if (a == 0) a = 1.70158;
		i = r * ((u = u / t - 1) * u * ((a + 1) * u + a) + 1) + n;
		easeOutBack[f] = i;
		u = f / litetween_precision;
		a = 0;
		if (a == 0) a = 1.70158;
		if ((u /= t / 2) < 1) i = r / 2 * u * u * (((a *= 1.525) + 1) * u - a) + n;
		i = r / 2 * ((u -= 2) * u * (((a *= 1.525) + 1) * u + a) + 2) + n;
		easeInOutBack[f] = i
	}
})();
var TweenObject = function() {
		var e = function(e, t, n, r, i, s, o) {
				this.name = e;
				this.value = 0;
				this.setInitial(r);
				this.setTarget(i);
				this.easefunc = n;
				this.tweened = t;
				this.duration = s;
				this.progress = 0;
				this.state = 0;
				this.onStart = false;
				this.onEnd = false;
				this.onReverseStart = false;
				this.onReverseEnd = false;
				this.lastKnownValue = 0;
				this.lastKnownValue2 = 0;
				this.enforce = o;
				this.pingpong = 1
			};
		return e
	}();
(function() {
	TweenObject.prototype = {};
	TweenObject.prototype.setInitial = function(e) {
		this.initialparam1 = parseFloat(e.split(",")[0]);
		this.initialparam2 = parseFloat(e.split(",")[1]);
		this.lastKnownValue = 0;
		this.lastKnownValue2 = 0
	};
	TweenObject.prototype.setTarget = function(e) {
		this.targetparam1 = parseFloat(e.split(",")[0]);
		this.targetparam2 = parseFloat(e.split(",")[1]);
		if (isNaN(this.targetparam2)) this.targetparam2 = this.targetparam1
	};
	TweenObject.prototype.OnTick = function(e) {
		if (this.state === 0) return -1;
		if (this.state === 1) this.progress += e;
		if (this.state === 2) this.progress -= e;
		if (this.state === 3) {
			this.state = 0
		}
		if (this.state === 4) {
			this.progress += e * this.pingpong
		}
		if (this.state === 5) {
			this.progress += e * this.pingpong
		}
		if (this.progress < 0) {
			this.progress = 0;
			if (this.state !== 4) {
				this.state = 0
			} else {
				this.pingpong = 1
			}
			this.onReverseEnd = true;
			return 0
		} else if (this.progress > this.duration) {
			this.progress = this.duration;
			if (this.state === 4) {
				this.pingpong = -1
			} else if (this.state === 5) {
				this.progress = 0
			} else {
				this.state = 0
			}
			this.onEnd = true;
			return 1
		} else {
			var t = easeFunc(this.easefunc, this.progress, 0, 1, this.duration);
			return t
		}
	}
})();
cr.behaviors.lunarray_LiteTween = function(e) {
	this.runtime = e
};
(function() {
	var e = cr.behaviors.lunarray_LiteTween.prototype;
	e.Type = function(e, t) {
		this.behavior = e;
		this.objtype = t;
		this.runtime = e.runtime
	};
	var t = e.Type.prototype;
	t.onCreate = function() {};
	e.Instance = function(e, t) {
		this.type = e;
		this.behavior = e.behavior;
		this.inst = t;
		this.runtime = e.runtime;
		this.i = 0
	};
	var n = e.Instance.prototype;
	n.onCreate = function() {
		this.active = this.properties[0];
		this.tweened = this.properties[1];
		this.easing = this.properties[2];
		this.target = this.properties[3];
		this.targetmode = this.properties[4];
		if (this.targetmode === 1) this.target = "relative(" + this.target + ")";
		this.duration = this.properties[5];
		this.enforce = this.properties[6] === 1;
		this.inst.value = 0;
		this.tween_list = {};
		this.addToTweenList("default", this.tweened, this.easing, "current", this.target, this.duration, this.enforce);
		if (this.active === 1) this.startTween(0);
		if (this.active === 2) this.startTween(2);
		if (this.active === 3) this.startTween(3)
	};
	n.parseCurrent = function(e, t) {
		if (t === undefined) t = "current";
		var n = trim(t);
		t = trim(t);
		if (t === "current") {
			switch (e) {
			case 0:
				n = this.inst.x + "," + this.inst.y;
				break;
			case 1:
				n = this.inst.width + "," + this.inst.height;
				break;
			case 2:
				n = this.inst.width + "," + this.inst.height;
				break;
			case 3:
				n = this.inst.width + "," + this.inst.height;
				break;
			case 4:
				n = cr.to_degrees(this.inst.angle) + "," + cr.to_degrees(this.inst.angle);
				break;
			case 5:
				n = this.inst.opacity * 100 + "," + this.inst.opacity * 100;
				break;
			case 6:
				n = this.inst.value + "," + this.inst.value;
				break;
			case 7:
				n = this.inst.x + "," + this.inst.y;
				break;
			case 8:
				n = this.inst.x + "," + this.inst.y;
				break;
			default:
				break
			}
		}
		if (t.substring(0, 8) === "relative") {
			var r = t.match(/\((.*?)\)/);
			if (r) {
				var i = parseFloat(r[1].split(",")[0]);
				var s = parseFloat(r[1].split(",")[1])
			}
			if (isNaN(i)) i = 0;
			if (isNaN(s)) s = 0;
			switch (e) {
			case 0:
				n = this.inst.x + i + "," + (this.inst.y + s);
				break;
			case 1:
				n = this.inst.width + i + "," + (this.inst.height + s);
				break;
			case 2:
				n = this.inst.width + i + "," + (this.inst.height + s);
				break;
			case 3:
				n = this.inst.width + i + "," + (this.inst.height + s);
				break;
			case 4:
				n = cr.to_degrees(this.inst.angle) + i + "," + (cr.to_degrees(this.inst.angle) + s);
				break;
			case 5:
				n = this.inst.opacity * 100 + i + "," + (this.inst.opacity * 100 + s);
				break;
			case 6:
				n = this.inst.value + i + "," + this.inst.value + i;
				break;
			case 7:
				n = this.inst.x + i + "," + this.inst.y;
				break;
			case 8:
				n = this.inst.x + "," + (this.inst.y + i);
				break;
			default:
				break
			}
		}
		return n
	};
	n.addToTweenList = function(e, t, n, r, i, s, o) {
		r = this.parseCurrent(t, r);
		i = this.parseCurrent(t, i);
		if (this.tween_list[e] !== undefined) {
			delete this.tween_list[e]
		}
		this.tween_list[e] = new TweenObject(e, t, n, r, i, s, o)
	};
	n.saveToJSON = function() {};
	n.loadFromJSON = function(e) {};
	n.setProgressTo = function(e) {
		if (e > 1) e = 1;
		if (e < 0) e = 0;
		for (var t in this.tween_list) {
			var n = this.tween_list[t];
			n.lastKnownValue = 0;
			n.lastKnownValue2 = 0;
			n.state = 3;
			n.progress = e * n.duration;
			var r = n.OnTick(0);
			this.updateTween(n, r)
		}
	};
	n.startTween = function(e) {
		for (var t in this.tween_list) {
			var n = this.tween_list[t];
			if (e === 0) {
				n.progress = 1e-6;
				n.lastKnownValue = 0;
				n.lastKnownValue2 = 0;
				n.onStart = true;
				n.state = 1
			}
			if (e === 1) {
				n.state = 1
			}
			if (e === 2) {
				n.progress = 1e-6;
				n.lastKnownValue = 0;
				n.lastKnownValue2 = 0;
				n.onStart = true;
				n.state = 4
			}
			if (e === 3) {
				n.progress = 1e-6;
				n.lastKnownValue = 0;
				n.lastKnownValue2 = 0;
				n.onStart = true;
				n.state = 5
			}
		}
	};
	n.stopTween = function(e) {
		for (var t in this.tween_list) {
			var n = this.tween_list[t];
			if (e === 1) n.progress = 0;
			if (e === 2) n.progress = n.duration;
			n.state = 3;
			var r = n.OnTick(0);
			this.updateTween(n, r)
		}
	};
	n.reverseTween = function(e) {
		for (var t in this.tween_list) {
			var n = this.tween_list[t];
			if (e === 1) {
				n.progress = n.duration;
				n.lastKnownValue = 0;
				n.lastKnownValue2 = 0;
				n.onReverseStart = true
			}
			n.state = 2
		}
	};
	n.updateTween = function(e, t) {
		if (e.tweened === 0) {
			if (e.enforce) {
				this.inst.x = e.initialparam1 + (e.targetparam1 - e.initialparam1) * t;
				this.inst.y = e.initialparam2 + (e.targetparam2 - e.initialparam2) * t
			} else {
				this.inst.x += (e.targetparam1 - e.initialparam1) * t - e.lastKnownValue;
				this.inst.y += (e.targetparam2 - e.initialparam2) * t - e.lastKnownValue2;
				e.lastKnownValue = (e.targetparam1 - e.initialparam1) * t;
				e.lastKnownValue2 = (e.targetparam2 - e.initialparam2) * t
			}
		} else if (e.tweened === 1) {
			if (e.enforce) {
				this.inst.width = e.initialparam1 + (e.targetparam1 - e.initialparam1) * t;
				this.inst.height = e.initialparam2 + (e.targetparam2 - e.initialparam2) * t
			} else {
				this.inst.width += (e.targetparam1 - e.initialparam1) * t - e.lastKnownValue;
				this.inst.height += (e.targetparam2 - e.initialparam2) * t - e.lastKnownValue2;
				e.lastKnownValue = (e.targetparam1 - e.initialparam1) * t;
				e.lastKnownValue2 = (e.targetparam2 - e.initialparam2) * t
			}
		} else if (e.tweened === 2) {
			if (e.enforce) {
				this.inst.width = e.initialparam1 + (e.targetparam1 - e.initialparam1) * t
			} else {
				this.inst.width += (e.targetparam1 - e.initialparam1) * t - e.lastKnownValue;
				e.lastKnownValue = (e.targetparam1 - e.initialparam1) * t
			}
		} else if (e.tweened === 3) {
			if (e.enforce) {
				this.inst.height = e.initialparam2 + (e.targetparam2 - e.initialparam2) * t
			} else {
				this.inst.height += (e.targetparam2 - e.initialparam2) * t - e.lastKnownValue2;
				e.lastKnownValue2 = (e.targetparam2 - e.initialparam2) * t
			}
		} else if (e.tweened === 4) {
			if (e.enforce) {
				var n = e.initialparam1 + (e.targetparam1 - e.initialparam1) * t;
				this.inst.angle = cr.clamp_angle(cr.to_radians(n))
			} else {
				var n = (e.targetparam1 - e.initialparam1) * t - e.lastKnownValue;
				this.inst.angle = cr.clamp_angle(this.inst.angle + cr.to_radians(n));
				e.lastKnownValue = (e.targetparam1 - e.initialparam1) * t
			}
		} else if (e.tweened === 5) {
			if (e.enforce) {
				this.inst.opacity = (e.initialparam1 + (e.targetparam1 - e.initialparam1) * t) / 100
			} else {
				this.inst.opacity += ((e.targetparam1 - e.initialparam1) * t - e.lastKnownValue) / 100;
				e.lastKnownValue = (e.targetparam1 - e.initialparam1) * t
			}
		} else if (e.tweened === 6) {
			if (e.enforce) {
				this.inst.value = e.initialparam1 + (e.targetparam1 - e.initialparam1) * t
			} else {
				this.inst.value += (e.targetparam1 - e.initialparam1) * t - e.lastKnownValue;
				e.lastKnownValue = (e.targetparam1 - e.initialparam1) * t
			}
		} else if (e.tweened === 7) {
			if (e.enforce) {
				this.inst.x = e.initialparam1 + (e.targetparam1 - e.initialparam1) * t
			} else {
				this.inst.x += (e.targetparam1 - e.initialparam1) * t - e.lastKnownValue;
				e.lastKnownValue = (e.targetparam1 - e.initialparam1) * t
			}
		} else if (e.tweened === 8) {
			if (e.enforce) {
				this.inst.y = e.initialparam2 + (e.targetparam2 - e.initialparam2) * t
			} else {
				this.inst.y += (e.targetparam2 - e.initialparam2) * t - e.lastKnownValue2;
				e.lastKnownValue2 = (e.targetparam2 - e.initialparam2) * t
			}
		}
		this.inst.set_bbox_changed()
	};
	n.tick = function() {
		var e = this.runtime.getDt(this.inst);
		var t = this.tween_list["default"];
		if (t.state !== 0) {
			if (t.onStart) {
				this.runtime.trigger(cr.behaviors.lunarray_LiteTween.prototype.cnds.OnStart, this.inst);
				t.onStart = false
			}
			if (t.onReverseStart) {
				this.runtime.trigger(cr.behaviors.lunarray_LiteTween.prototype.cnds.OnReverseStart, this.inst);
				t.onReverseStart = false
			}
			var n = t.OnTick(e);
			this.updateTween(t, n);
			if (t.onEnd) {
				this.runtime.trigger(cr.behaviors.lunarray_LiteTween.prototype.cnds.OnEnd, this.inst);
				t.onEnd = false
			}
			if (t.onReverseEnd) {
				this.runtime.trigger(cr.behaviors.lunarray_LiteTween.prototype.cnds.OnReverseEnd, this.inst);
				t.onReverseEnd = false
			}
		}
	};
	e.cnds = {};
	var r = e.cnds;
	r.IsActive = function() {
		return this.tween_list["default"].state !== 0
	};
	r.CompareProgress = function(e, t) {
		var n = this.tween_list["default"];
		return cr.do_cmp(n.progress / n.duration, e, t)
	};
	r.OnStart = function() {
		if (this.tween_list["default"] === undefined) return false;
		return this.tween_list["default"].onStart
	};
	r.OnReverseStart = function() {
		if (this.tween_list["default"] === undefined) return false;
		return this.tween_list["default"].onReverseStart
	};
	r.OnEnd = function() {
		if (this.tween_list["default"] === undefined) return false;
		return this.tween_list["default"].onEnd
	};
	r.OnReverseEnd = function() {
		if (this.tween_list["default"] === undefined) return false;
		return this.tween_list["default"].onReverseEnd
	};
	e.acts = {};
	var i = e.acts;
	i.Start = function(e) {
		this.startTween(e)
	};
	i.Stop = function(e) {
		this.stopTween(e)
	};
	i.Reverse = function(e) {
		this.reverseTween(e)
	};
	i.ProgressTo = function(e) {
		this.setProgressTo(e)
	};
	i.SetDuration = function(e) {
		if (isNaN(e)) return;
		if (e < 0) return;
		if (this.tween_list["default"] === undefined) return;
		this.tween_list["default"].duration = e
	};
	i.SetEnforce = function(e) {
		if (this.tween_list["default"] === undefined) return;
		this.tween_list["default"].enforce = e === 1
	};
	i.SetInitial = function(e) {
		if (this.tween_list["default"] === undefined) return;
		var t = this.parseCurrent(this.tween_list["default"].tweened, e);
		this.tween_list["default"].setInitial(t)
	};
	i.SetTarget = function(e, t, n) {
		if (this.tween_list["default"] === undefined) return;
		if (isNaN(n)) return;
		var r = n + "";
		var i = this.tween_list["default"];
		this.targetmode = t;
		if (t === 1) {
			switch (e) {
			case 0:
				r = this.inst.x + n + "," + i.targetparam2;
				break;
			case 1:
				r = i.targetparam1 + "," + (this.inst.y + n);
				break;
			case 2:
				r = "" + cr.to_degrees(this.inst.angle + cr.to_radians(n));
				break;
			case 3:
				r = "" + this.inst.opacity * 100 + n;
				break;
			case 4:
				r = this.inst.width + n + "," + i.targetparam2;
				break;
			case 5:
				r = i.targetparam1 + "," + (this.inst.height + n);
				break;
			case 6:
				r = n + "," + n;
				break;
			default:
				break
			}
		} else {
			switch (e) {
			case 0:
				r = n + "," + i.targetparam2;
				break;
			case 1:
				r = i.targetparam1 + "," + n;
				break;
			case 2:
				r = n + "," + n;
				break;
			case 3:
				r = n + "," + n;
				break;
			case 4:
				r = n + "," + i.targetparam2;
				break;
			case 5:
				r = i.targetparam1 + "," + n;
				break;
			case 6:
				r = n + "," + n;
				break;
			default:
				break
			}
		}
		var s = this.parseCurrent(this.tween_list["default"].tweened, "current");
		var o = this.parseCurrent(this.tween_list["default"].tweened, r);
		i.setInitial(s);
		i.setTarget(o)
	};
	i.SetTweenedProperty = function(e) {
		if (this.tween_list["default"] === undefined) return;
		this.tween_list["default"].tweened = e
	};
	i.SetEasing = function(e) {
		if (this.tween_list["default"] === undefined) return;
		this.tween_list["default"].easefunc = e
	};
	i.SetValue = function(e) {
		this.inst.value = e
	};
	i.SetParameter = function(e, t, n, r, i) {
		if (this.tween_list["default"] === undefined) {
			this.addToTweenList("default", e, t, initial, n, r, i)
		} else {
			var s = this.tween_list["default"];
			s.tweened = e;
			s.easefunc = t;
			s.setInitial(this.parseCurrent(e, "current"));
			s.setTarget(this.parseCurrent(e, n));
			s.duration = r;
			s.enforce = i === 1
		}
	};
	e.exps = {};
	var s = e.exps;
	s.Progress = function(e) {
		var t = this.tween_list["default"].progress / this.tween_list["default"].duration;
		e.set_float(t)
	};
	s.Duration = function(e) {
		e.set_float(this.tween_list["default"].duration)
	};
	s.Target = function(e) {
		var t = this.tween_list["default"];
		var n = "N/A";
		switch (t.tweened) {
		case 0:
			n = t.targetparam1;
			break;
		case 1:
			n = t.targetparam2;
			break;
		case 2:
			n = t.targetparam1;
			break;
		case 3:
			n = t.targetparam1;
			break;
		case 4:
			n = t.targetparam1;
			break;
		case 5:
			n = t.targetparam2;
			break;
		case 6:
			n = t.targetparam1;
			break;
		default:
			break
		}
		e.set_float(n)
	};
	s.Value = function(e) {
		var t = this.inst.value;
		e.set_float(t)
	}
})();
cr.getProjectModel = function() {
	return [null, "StartScreen", [
		[cr.plugins_.Mouse, true, false, false, false, false, false, false, false, false],
		[cr.plugins_.Particles, false, true, true, false, true, true, true, true, true],
		[cr.plugins_.Softgames, true, false, false, false, false, false, false, false, false],
		[cr.plugins_.Sprite, false, true, true, true, true, true, true, true, false],
		[cr.plugins_.Spritefont2, false, true, true, true, true, true, true, true, true],
		[cr.plugins_.Text, false, true, true, true, true, true, true, true, false],
		[cr.plugins_.Touch, true, false, false, false, false, false, false, false, false],
		[cr.plugins_.Browser, true, false, false, false, false, false, false, false, false]
	], [
		["t0", cr.plugins_.Sprite, false, [], 0, 0, null, [
			["Default", 5, false, 1, 0, false, 0xbf26330e17ef3, [
				["images/aboutbtn-sheet0.png", 2847, 0, 0, 169, 34, 1, .5, .508475, [],
					[-.471154, -.457627, 0, -.508475, .471154, -.457627, .490385, -.0169496, .471154, .440678, 0, .491525, -.480769, .457627, -.490385, -.0169496], 0]
			]]
		],
			[], false, false, 5208885876211883, []
		],
		["t1", cr.plugins_.Sprite, false, [], 0, 0, null, [
			["Default", 5, false, 1, 0, false, 8146450955332427, [
				["images/playbtn_square-sheet0.png", 2023, 0, 0, 187, 76, 1, .502674, .5, [],
					[-.481283, -.447368, -.00534782, -.473684, .475936, -.447368, .497326, 0, .475936, .447368, -.00534782, .486842, -.481283, .447368, -.502674, 0], 0]
			]]
		],
			[], false, false, 5839598333792561, []
		],
		["t2", cr.plugins_.Sprite, false, [], 0, 0, null, [
			["Default", 5, false, 1, 0, false, 9530490509326564, [
				["images/pausebtn-sheet0.png", 2077, 0, 0, 52, 52, 1, .519231, .519231, [],
					[-.365385, -.365385, -.0192308, -.519231, .346154, -.384616, .480769, -.0192308, .346154, .346154, -.0192308, .480769, -.384616, .346154, -.519231, -.0192308], 0]
			]]
		],
			[], false, false, 8127550894873643, []
		],
		["t3", cr.plugins_.Sprite, false, [], 0, 0, null, [
			["Default", 5, false, 1, 0, false, 9680036336350844, [
				["images/gotostartscreenbtn-sheet0.png", 2677, 0, 0, 92, 97, 1, .456522, .43299, [],
					[-.282609, -.268042, .0434783, -.381443, .358695, -.257732, .510869, .0618553, .369565, .402062, .0434783, .515464, -.282609, .402062, -.434783, .0618553], 0]
			]]
		],
			[], false, false, 0x3ce63d918c408, []
		],
		["t4", cr.plugins_.Sprite, false, [], 0, 0, null, [
			["Default", 5, false, 1, 0, false, 8381725045710814, [
				["images/playbtn_round-sheet0.png", 2763, 0, 0, 92, 97, 1, .5, .505155, [],
					[-.326087, -.340207, 0, -.453608, .315217, -.329897, .467391, -.0103096, .326087, .329897, 0, .443299, -.326087, .329897, -.478261, -.0103096], 0]
			]]
		],
			[], false, false, 9685690679230812, []
		],
		["t5", cr.plugins_.Sprite, false, [], 0, 0, null, [
			["Default", 5, false, 1, 0, false, 452975352209808, [
				["images/replaybtn-sheet0.png", 3449, 0, 0, 92, 97, 1, .543478, .505155, [],
					[-.369565, -.340207, -.0434783, -.453608, .271739, -.329897, .423913, -.0103096, .282609, .329897, -.0434783, .443299, -.369565, .329897, -.521739, -.0103096], 0]
			]]
		],
			[], false, false, 567107003245929, []
		],
		["t6", cr.plugins_.Sprite, false, [], 0, 0, null, [
			["Default", 5, false, 1, 0, false, 6364276854239438, [
				["images/startscreenbg-sheet0.png", 238084, 0, 0, 320, 480, 1, .5, .5, [],
					[], 1]
			]]
		],
			[], false, false, 5756279195113567, []
		],
		["t7", cr.plugins_.Sprite, false, [], 0, 0, null, [
			["Default", 5, false, 1, 0, false, 8270338397967252, [
				["images/ingamebg-sheet0.png", 181685, 0, 0, 320, 480, 1, .5, .5, [],
					[], 1]
			]]
		],
			[], false, false, 0x6f03f24f0373f, []
		],
		["t8", cr.plugins_.Sprite, false, [], 0, 0, null, [
			["Default", 5, false, 1, 0, false, 0x936836f36315a, [
				["images/tutorial2-sheet0.png", 200756, 0, 0, 320, 480, 1, 0, 0, [],
					[], 1],
				["images/tutorial2-sheet1.png", 198446, 0, 0, 320, 480, 1, 0, 0, [],
					[], 1]
			]]
		],
			[], false, false, 0xbcda3881d3248, []
		],
		["t9", cr.plugins_.Sprite, false, [], 0, 0, null, [
			["Default", 5, false, 1, 0, false, 0x74d899ec3ee24, [
				["images/tutorial-sheet0.png", 224267, 0, 0, 320, 480, 1, 0, 0, [],
					[], 1],
				["images/tutorial-sheet1.png", 220546, 0, 0, 320, 480, 1, 0, 0, [],
					[], 1]
			]]
		],
			[], false, false, 5702637664950532, []
		],
		["t10", cr.plugins_.Sprite, false, [], 0, 0, null, [
			["Default", 5, false, 1, 0, false, 0x89a209197ed88, [
				["images/pausescreen-sheet0.png", 9759, 0, 0, 320, 480, 1, 0, 0, [],
					[], 0],
				["images/pausescreen-sheet1.png", 9895, 0, 0, 320, 480, 1, 0, 0, [],
					[], 0]
			]]
		],
			[], false, false, 0x53749ddc258c5, []
		],
		["t11", cr.plugins_.Sprite, false, [], 0, 0, null, [
			["Default", 5, false, 1, 0, false, 328665383089664, [
				["images/aboutscreen-sheet0.png", 12935, 0, 0, 320, 480, 1, 0, 0, [],
					[], 0],
				["images/aboutscreen-sheet1.png", 12441, 0, 0, 320, 480, 1, 0, 0, [],
					[], 0]
			]]
		],
			[], false, false, 7242083636327699, []
		],
		["t12", cr.plugins_.Sprite, false, [], 0, 0, null, [
			["Default", 5, false, 1, 0, false, 0x8a533c43b0ecd, [
				["images/gameoverscreen-sheet0.png", 9535, 0, 0, 320, 480, 1, 0, 0, [],
					[], 0],
				["images/gameoverscreen-sheet1.png", 9518, 0, 0, 320, 480, 1, 0, 0, [],
					[], 0]
			]]
		],
			[], false, false, 5207905414052742, []
		],
		["t13", cr.plugins_.Sprite, false, [], 2, 0, null, [
			["Default", 5, false, 1, 0, false, 0xcb3d5b372aefb, [
				["images/whitescreen-sheet0.png", 244, 0, 0, 320, 480, 1, 0, 0, [],
					[], 4]
			]]
		],
			[
				["start", cr.behaviors.lunarray_LiteTween, 6485208721801974],
				["stop", cr.behaviors.lunarray_LiteTween, 0xb6d3375366d5c]
			], false, false, 0xb144ae5fd20a8, []
		],
		["t14", cr.plugins_.Sprite, false, [], 0, 0, null, [
			["Default", 5, false, 1, 0, false, 6095122240634483, [
				["images/bomb_big-sheet0.png", 4247, 0, 0, 64, 93, 1, .5, .505376, [],
					[-.3125, -.376344, 0, -.354838, .140625, -.258064, .421875, -.0107524, .265625, .333334, 0, .39785, -.25, .322581, -.375, -.0107524], 0]
			]]
		],
			[], false, false, 0x767e0a29bfc1a, []
		],
		["t15", cr.plugins_.Sprite, false, [], 0, 0, null, [
			["Default", 5, false, 1, 0, false, 6589965858475488, [
				["images/bomb_small-sheet0.png", 2521, 0, 0, 43, 61, 1, .511628, .508197, [],
					[-.139535, -.245902, -.0232559, -.262295, .27907, -.360656, .372093, -.0163937, .209302, .295082, -.0232559, .360655, -.27907, .327869, -.488372, -.0163937], 0]
			]]
		],
			[], false, false, 0xbe91bc7f8e75f, []
		],
		["t16", cr.plugins_.Sprite, false, [], 1, 0, null, [
			["Default", 5, false, 1, 0, false, 9942592025634288, [
				["images/explosion-sheet0.png", 5647, 1, 1, 137, 134, 1, .50365, .507463, [],
					[-.0583946, -.0522387, -.00729966, -.104478, .124087, -.126866, .0948904, -.00746268, .0583944, .0447763, -.00729966, .0373133, -.0364966, .0149253, -.0291966, -.00746268], 0],
				["images/explosion-sheet0.png", 5647, 139, 1, 137, 134, 1, .50365, .5, [],
					[-.0802917, -.067164, -.00729966, -.156716, .19708, -.19403, .19708, 0, .102189, .097015, -.00729966, .11194, -.109489, .097015, -.124088, 0], 0],
				["images/explosion-sheet0.png", 5647, 277, 1, 137, 134, 1, .50365, .5, [],
					[-.175183, -.164179, -.00729966, -.231343, .19708, -.19403, .248175, 0, .124087, .119403, -.00729966, .201493, -.160584, .149254, -.240876, 0], 0],
				["images/explosion-sheet0.png", 5647, 1, 136, 137, 134, 1, .50365, .5, [],
					[-.350365, -.343284, -.00729966, -.485075, .401459, -.402985, .459854, 0, .313868, .313433, -.00729966, .485075, -.335767, .328358, -.416058, 0], 0],
				["images/explosion-sheet0.png", 5647, 139, 136, 137, 134, 1, .50365, .5, [],
					[.204379, .223881, -.00729966, -.492537, .357664, -.358209, .489051, 0, .328467, .328358, -.00729966, .395522, .211678, -.231343, -.372263, 0], 0],
				["images/explosion-sheet0.png", 5647, 277, 136, 137, 134, 1, .50365, .5, [],
					[.270073, .291045, .29927, -.298507, .467153, 0, .240876, -.261194, -.277373, 0], 0],
				["images/explosion-sheet0.png", 5647, 1, 271, 137, 134, 1, .50365, .5, [],
					[.270073, .291045, .29927, -.298507, .467153, 0, .240876, -.261194, -.277373, 0], 0],
				["images/explosion-sheet0.png", 5647, 139, 271, 137, 134, 1, .50365, .5, [],
					[], 0],
				["images/explosion-sheet0.png", 5647, 277, 271, 137, 134, 1, .50365, .5, [],
					[], 0]
			]]
		],
			[
				["Fade", cr.behaviors.Fade, 5096540149705603]
			], false, false, 0xe83af3ce79b0b, []
		],
		["t17", cr.plugins_.Sprite, false, [], 0, 0, null, [
			["Default", 5, false, 1, 0, false, 6974015664332222, [
				["images/candyhalf_blue-sheet0.png", 2260, 0, 0, 31, 60, 1, 1, .483333, [],
					[-.612903, -.283333, -.516129, -.3, -.354839, -.3, -.032258, .0166667, -.354839, .333334, -.516129, .333334, -.612903, .316667, -.967742, .0166667], 0]
			]]
		],
			[], false, false, 0x85f240771fee9, []
		],
		["t18", cr.plugins_.Sprite, false, [], 0, 0, null, [
			["Default", 5, false, 1, 0, false, 0xd7c5541578bcb, [
				["images/candyhalf_green-sheet0.png", 2815, 0, 0, 39, 76, 1, 1, .5, [],
					[-.564103, -.276316, -.512821, -.302632, -.25641, -.368421, 0, 0, -.205128, .394737, -.512821, .355263, -.615385, .302632, -1, 0], 0]
			]]
		],
			[], false, false, 0x60310414c6744, []
		],
		["t19", cr.plugins_.Sprite, false, [], 0, 0, null, [
			["Default", 5, false, 1, 0, false, 0x6c020a91a5264, [
				["images/candyhalf_purple-sheet0.png", 1983, 0, 0, 25, 48, 1, 1, .520833, [],
					[-.68, -.354166, -.52, -.395833, -.16, -.4375, -.04, -.0208333, -.2, .375, -.64, .291667, -.96, -.0208333], 0]
			]]
		],
			[], false, false, 975699212391044, []
		],
		["t20", cr.plugins_.Sprite, false, [], 0, 0, null, [
			["Default", 5, false, 1, 0, false, 0x59fcf6e093ef9, [
				["images/candy_purple-sheet0.png", 2852, 0, 0, 48, 48, 1, .5, .5, [],
					[-.333333, -.333333, 0, -.479167, .333333, -.333333, .4375, 0, .270833, .270833, 0, .354167, -.270833, .270833, -.416667, 0], 0]
			]]
		],
			[], false, false, 8369650883463168, []
		],
		["t21", cr.plugins_.Sprite, false, [], 0, 0, null, [
			["Default", 5, false, 1, 0, false, 6323503275742133, [
				["images/candy_blue-sheet0.png", 3452, 0, 0, 60, 60, 1, .5, .5, [],
					[-.4, -.4, 0, -.366667, .25, -.25, .416667, 0, .283333, .283333, 0, .4, -.233333, .233333, -.316667, 0], 0]
			]]
		],
			[], false, false, 540997275623285, []
		],
		["t22", cr.plugins_.Sprite, false, [], 0, 0, null, [
			["Default", 5, false, 1, 0, false, 9770393067484724, [
				["images/candy_green-sheet0.png", 4524, 0, 0, 76, 76, 1, .5, .5, [],
					[-.368421, -.368421, 0, -.447368, .328947, -.328947, .473684, 0, .289474, .289474, 0, .342105, -.236842, .236842, -.447368, 0], 0]
			]]
		],
			[], false, false, 5323103978308123, []
		],
		["t23", cr.plugins_.Sprite, false, [6421634589541215], 1, 0, null, [
			["Default", 5, false, 1, 0, false, 5430814220914779, [
				["images/life-sheet0.png", 2410, 0, 0, 71, 55, 1, .507042, .509091, [],
					[-.338028, -.290909, -.0140842, -.454545, .295775, -.254546, .43662, -.0181819, .197183, .109091, -.0140842, .418182, -.183098, .0727271, -.295774, -.0181819], 0]
			]]
		],
			[
				["CustomMovement", cr.behaviors.custom, 891926197686602]
			], false, false, 0xa1cc1841c6402, []
		],
		["t24", cr.plugins_.Sprite, false, [851692599758286], 4, 0, null, [
			["Default", 5, false, 1, 0, false, 9769720370376208, [
				["images/life-sheet0.png", 2410, 0, 0, 71, 55, 1, .507042, .509091, [],
					[-.338028, -.290909, -.0140842, -.454545, .295775, -.254546, .43662, -.0181819, .197183, .109091, -.0140842, .418182, -.183098, .0727271, -.295774, -.0181819], 0]
			]]
		],
			[
				["CustomMovement", cr.behaviors.custom, 0x39a192194bb56],
				["LiteTween", cr.behaviors.lunarray_LiteTween, 0x8fb83cd24d6e],
				["LiteTween2", cr.behaviors.lunarray_LiteTween, 7787659317162863],
				["LiteTween3", cr.behaviors.lunarray_LiteTween, 0xe64fa641b096b]
			], false, false, 0xd6bf614ac12f, []
		],
		["t25", cr.plugins_.Sprite, false, [], 1, 0, null, [
			["Default", 5, false, 1, 0, false, 363864622756435, [
				["images/fontainstar-sheet0.png", 2733, 0, 0, 52, 50, 1, 1.05769, .78, [],
					[-.557692, -.62, -.384615, -.44, -.26923, -.28, -.26923, 0, -.557692, -.02, -.788461, -.0599999, -.884615, -.28], 0]
			]]
		],
			[
				["CustomMovement", cr.behaviors.custom, 0x59a05936e4a88]
			], false, false, 8275527515999204, []
		],
		["t26", cr.plugins_.Particles, false, [], 0, 0, ["images/fontainstarparticle.png", 278, 0], null, [], false, false, 7457665451351134, []],
		["t27", cr.plugins_.Sprite, false, [], 0, 0, null, [
			["Default", 5, false, 1, 0, false, 0x973cd5ed3fbc7, [
				["images/ingamehud_bg-sheet0.png", 7533, 0, 0, 320, 100, 1, .5, .5, [],
					[0, -.43, .315625, .09, .3, 0, .3, -.14, 0, .11, -.15, 0], 0]
			]]
		],
			[], false, false, 7034148364290492, []
		],
		["t28", cr.plugins_.Sprite, false, [], 0, 0, null, [
			["Default", 5, false, 1, 0, false, 807774306128449, [
				["images/lifebar-sheet0.png", 5840, 1, 85, 53, 41, 1, 0, .463415, [],
					[.0943396, -.341464, .490566, -.268293, .924528, -.365854, .981132, .0243904, .830189, .317073, .490566, .536585, .169811, .317073, .0377358, .0243904], 0],
				["images/lifebar-sheet0.png", 5840, 1, 43, 77, 41, 1, 0, .463415, [],
					[.0519481, -.365854, .493506, -.439024, .948052, -.365854, .987013, .0243904, .883117, .317073, .493506, .414634, .116883, .317073, .025974, .0243904], 0],
				["images/lifebar-sheet0.png", 5840, 1, 1, 101, 41, 1, 0, .463415, [],
					[.049505, -.341464, .49505, -.292683, .960396, -.365854, .990099, .0243904, .910891, .317073, .49505, .536585, .0891089, .317073, .019802, .0243904], 0]
			]]
		],
			[], false, false, 0xb4c7e4b26dbc5, []
		],
		["t29", cr.plugins_.Mouse, false, [], 0, 0, null, null, [], false, false, 0xc1fd9eb08fbb2, [],
			[]
		],
		["t30", cr.plugins_.Touch, false, [], 0, 0, null, null, [], false, false, 0xaaeeb29fe6633, [],
			[1]
		],
		["t31", cr.plugins_.Sprite, false, [], 1, 0, null, [
			["Default", 5, false, 1, 0, false, 0x48f453c54b81f, [
				["images/100scorelabel-sheet0.png", 812, 0, 0, 70, 36, 1, .857143, .0277778, [],
					[-.714286, .25, -.357143, .166666, .0285711, .194444, .0857142, .472222, .0142862, .722222, -.357143, .694444, -.728572, .722222, -.842857, .472222], 0]
			]]
		],
			[
				["Fade", cr.behaviors.Fade, 5241465307141786]
			], false, false, 0x4b52371e2d07c, []
		],
		["t32", cr.plugins_.Sprite, false, [], 1, 0, null, [
			["Default", 5, false, 1, 0, false, 0xcd1e0627b50b5, [
				["images/10scorelabel-sheet0.png", 644, 0, 0, 51, 34, 1, .901961, .941176, [],
					[-.72549, -.676471, -.411765, -.735294, -.0392158, -.735294, .0588232, -.441176, -.0392158, -.147058, -.764706, -.147058, -.901961, -.441176], 0]
			]]
		],
			[
				["Fade", cr.behaviors.Fade, 4847753738340389]
			], false, false, 7539418369974563, []
		],
		["t33", cr.plugins_.Sprite, false, [], 1, 0, null, [
			["Default", 5, false, 1, 0, false, 5333891986976473, [
				["images/30scorelabel-sheet0.png", 699, 0, 0, 56, 36, 1, .375, .972222, [],
					[-.196429, -.694444, .125, -.777778, .482143, -.75, .589286, -.472222, .482143, -.194444, -.232143, -.194444, -.357143, -.472222], 0]
			]]
		],
			[
				["Fade", cr.behaviors.Fade, 9927933799627120]
			], false, false, 9617569330535946, []
		],
		["t34", cr.plugins_.Sprite, false, [], 2, 0, null, [
			["Default", 5, false, 1, 0, false, 0x938b92d78ba9d, [
				["images/3xcombolabel-sheet0.png", 1471, 0, 0, 160, 39, 1, .5, .512821, [],
					[-.44375, -.282052, 0, -.179488, .41875, -.179488, .46875, -.0256415, .44375, .25641, -.44375, .25641, -.4625, -.0256415], 0]
			]]
		],
			[
				["Fade", cr.behaviors.Fade, 0x8efae30e12a3e],
				["Sine", cr.behaviors.Sin, 8326846716478066]
			], false, false, 507686160308873, []
		],
		["t35", cr.plugins_.Sprite, false, [], 2, 0, null, [
			["Default", 5, false, 1, 0, false, 0x8c12dd267e646, [
				["images/4xcombolabel-sheet0.png", 1861, 0, 0, 217, 55, 1, .502304, .509091, [],
					[-.447005, -.290909, -.00460812, -.163636, .410138, -.163636, .470046, -.0181819, .43318, .236364, -.43318, .218182, -.497696, -.0181819], 0]
			]]
		],
			[
				["Fade", cr.behaviors.Fade, 7244275268460735],
				["Sine", cr.behaviors.Sin, 0x3c605e93bd1c9]
			], false, false, 5996116958732497, []
		],
		["t36", cr.plugins_.Sprite, false, [], 1, 0, null, [
			["Default", 5, false, 1, 0, false, 7804252665775305, [
				["images/50scorelabel-sheet0.png", 702, 0, 0, 56, 36, 1, .285714, -.0555556, [],
					[-.125, .305556, .214286, .222223, .589286, .25, .678572, .555556, .553572, .805556, -.125, .805556, -.267857, .555556], 0]
			]]
		],
			[
				["Fade", cr.behaviors.Fade, 4799025338321075]
			], false, false, 9180470322993356, []
		],
		["t37", cr.plugins_.Sprite, false, [], 2, 0, null, [
			["Default", 5, false, 1, 0, false, 0x6a197eab48f4c, [
				["images/5xcombolabel-sheet0.png", 2375, 0, 0, 267, 64, 1, .501873, .5, [],
					[-.445693, -.265625, -.00374565, -.125, .411985, -.140625, .483146, 0, .449438, .296875, -.00374565, .3125, -.453184, .296875, -.483146, 0], 0]
			]]
		],
			[
				["Fade", cr.behaviors.Fade, 0x5078ac12e5d57],
				["Sine", cr.behaviors.Sin, 0x39c8e5423f677]
			], false, false, 0x5b84682b69854, []
		],
		["t38", cr.plugins_.Sprite, false, [], 2, 0, null, [
			["Default", 5, false, 1, 0, false, 0xce8d97781143f, [
				["images/candyfontainlable-sheet0.png", 3689, 0, 0, 299, 160, 1, .501672, .5, [],
					[-.187291, .0875, -.00334427, -.26875, .220736, .01875, .468228, 0, .384616, .2875, -.00334427, .3125, -.35117, .21875, .38796, 0], 0]
			]]
		],
			[
				["Fade", cr.behaviors.Fade, 9201479989150704],
				["Sine", cr.behaviors.Sin, 6322809057698405]
			], false, false, 90459198928289, []
		],
		["t39", cr.plugins_.Sprite, false, [], 2, 0, null, [
			["Default", 5, false, 1, 0, false, 7627941190844073, [
				["images/supercombolabel-sheet0.png", 7550, 1, 1, 260, 107, 1, .5, .504673, [],
					[-.261538, .0747661, 0, -.364486, .273077, .0467291, .019231, -.00934589, .423077, .308411, 0, .439252, -.426923, .317757, -.034615, -.00934589], 0],
				["images/supercombolabel-sheet0.png", 7550, 1, 109, 260, 107, 1, .5, .504673, [],
					[-.261538, .0747661, 0, -.364486, .273077, .0467291, .019231, -.00934589, .423077, .308411, 0, .439252, -.426923, .317757, -.034615, -.00934589], 0]
			]]
		],
			[
				["Sine", cr.behaviors.Sin, 6862564799226722],
				["Fade", cr.behaviors.Fade, 6000449520246343]
			], false, false, 0x5971f7126d7dd, []
		],
		["t40", cr.plugins_.Text, false, [], 0, 0, null, null, [], false, false, 0xfc3f2a1867b8f, []],
		["t41", cr.plugins_.Text, false, [], 0, 0, null, null, [], false, false, 0xb10852c8fae4b, []],
		["t42", cr.plugins_.Text, false, [], 0, 0, null, null, [], false, false, 0x560e1d7192b36, []],
		["t43", cr.plugins_.Text, false, [], 0, 0, null, null, [], false, false, 0x6742389f22114, []],
		["t44", cr.plugins_.Text, false, [], 0, 0, null, null, [], false, false, 5151779893385322, []],
		["t45", cr.plugins_.Text, false, [], 0, 0, null, null, [], false, false, 0xdf0e76169c6a2, []],
		["t46", cr.plugins_.Sprite, false, [], 1, 0, null, [
			["Default", 5, false, 1, 0, false, 7241622599948809, [
				["images/juice-sheet0.png", 4479, 0, 0, 451, 452, 1, .501109, .5, [],
					[-.230599, -.230089, -.00221765, -.25, .370288, -.371681, .474501, 0, -.00221765, .329646, -.159646, .159292, -.19734, 0], 0]
			]]
		],
			[
				["Fade", cr.behaviors.Fade, 6948119795969437]
			], false, false, 9146109515420968, []
		],
		["t47", cr.plugins_.Sprite, false, [], 1, 0, null, [
			["Default", 5, false, 1, 0, false, 0x94161286dd819, [
				["images/slice-sheet0.png", 816, 0, 0, 64, 64, 1, 0, .5, [],
					[.140625, -.359375, .5, -.5, .859375, -.359375, 1, 0, .859375, .359375, .5, .5, .140625, .359375, 0, 0], 0]
			]]
		],
			[
				["Fade", cr.behaviors.Fade, 5203335805529212]
			], false, false, 520202982938127, []
		],
		["t48", cr.plugins_.Softgames, false, [], 0, 0, null, null, [], false, false, 8621345822828066, [],
			[77]
		],
		["t49", cr.plugins_.Spritefont2, false, [], 0, 0, ["images/spritefont.png", 1427, 3], null, [], false, false, 7497840212195717, []],
		["t50", cr.plugins_.Spritefont2, false, [], 0, 0, ["images/fruitstxtbmp.png", 3591, 0], null, [], false, false, 0x92bb457feeba8, []],
		["t51", cr.plugins_.Spritefont2, false, [], 0, 0, ["images/fruitstxtbmp.png", 3591, 0], null, [], false, false, 8964434448941994, []],
		["t52", cr.plugins_.Spritefont2, false, [], 0, 0, ["images/bestscoretxtbmp.png", 2280, 0], null, [], false, false, 761159111345178, []],
		["t53", cr.plugins_.Spritefont2, false, [], 0, 0, ["images/bestscoretxtbmp.png", 2280, 0], null, [], false, false, 7550819395002681, []],
		["t54", cr.plugins_.Spritefont2, false, [], 0, 0, ["images/bestscoretxtbmp.png", 2280, 0], null, [], false, false, 8421631644712503, []],
		["t55", cr.plugins_.Browser, false, [], 0, 0, null, null, [], false, false, 0xdd18963d981d7, [],
			[]
		],
		["t56", cr.plugins_.Sprite, true, [], 1, 0, null, null, [
			["CustomMovement2", cr.behaviors.custom, 9968517923918220]
		], false, false, 8151068894234031, []],
		["t57", cr.plugins_.Sprite, true, [], 0, 0, null, null, [], false, false, 6624089687897138, []],
		["t58", cr.plugins_.Sprite, true, [], 0, 0, null, null, [], false, false, 761882580655443, []],
		["t59", cr.plugins_.Sprite, true, [], 0, 0, null, null, [], false, false, 0x7ede7813d326d, []],
		["t60", cr.plugins_.Sprite, true, [], 2, 0, null, null, [
			["VisibilityTween", cr.behaviors.lunarray_LiteTween, 9898873976583244],
			["InvisibilityTween", cr.behaviors.lunarray_LiteTween, 4895534882965581]
		], false, false, 7392654326175444, []],
		["t61", cr.plugins_.Sprite, true, [], 0, 0, null, null, [], false, false, 0x519e239ff9a34, []],
		["t62", cr.plugins_.Sprite, true, [], 0, 0, null, null, [], false, false, 883931708700071, []]
	], [
		[56, 14, 15, 21, 22, 20, 17, 18, 19, 25, 23],
		[57, 14, 15],
		[58, 21, 22, 20],
		[59, 17, 18, 19],
		[60, 11, 3],
		[61, 31, 32, 33, 34, 35, 36, 37, 38, 39],
		[62, 34, 35, 37, 38, 39]
	], [
		["GameScreen", 320, 480, false, "Event sheet 1", 5665669193748128, [
			["BG", 0, 0x82637b5140546, true, [255, 255, 255], false, 1, 1, 1, false, 1, 0, 0, [
				[
					[160, 240, 0, 320, 480, 0, 0, 1, .5, .5, 0, 0, []], 7, 19, [],
					[],
					[0, "Default", 0, 1]
				],
				[
					[224, -64, 0, 31.9646, 32.0355, 0, 0, 1, .501109, .5, 0, 0, []], 46, 0, [],
					[
						[1, 0, 0, 1, 1]
					],
					[0, "Default", 0, 1]
				]
			],
				[]
			],
			["Game", 1, 0x89e7f5b533396, true, [255, 255, 255], true, 1, 1, 1, false, 1, 0, 0, [
				[
					[128, -48, 0, 64, 64, 0, 0, 1, 0, .5, 0, 0, []], 47, 3, [],
					[
						[1, 0, 0, .125, 1]
					],
					[0, "Default", 0, 1]
				],
				[
					[-400, 48, 0, 250.785, 245.293, 0, 0, 1, .50365, .507463, 0, 0, []], 16, 7, [],
					[
						[1, 0, 0, 1, 1]
					],
					[0, "Default", 0, 1]
				],
				[
					[-400, 240, 0, 64, 93, 0, 0, 1, .5, .505376, 0, 0, []], 14, 11, [],
					[
						[0, 5, 1]
					],
					[0, "Default", 0, 1]
				],
				[
					[-320, 256, 0, 43, 61, 0, 0, 1, .511628, .508197, 0, 0, []], 15, 13, [],
					[
						[0, 5, 1]
					],
					[0, "Default", 0, 1]
				],
				[
					[-464, 448, 0, 60, 60, 0, 0, 1, .5, .5, 0, 0, []], 21, 29, [],
					[
						[0, 5, 1]
					],
					[0, "Default", 0, 1]
				],
				[
					[-464, 368, 0, 76, 76, 0, 0, 1, .5, .5, 0, 0, []], 22, 30, [],
					[
						[0, 5, 1]
					],
					[0, "Default", 0, 1]
				],
				[
					[-464, 528, 0, 48, 48, 0, 0, 1, .5, .5, 0, 0, []], 20, 31, [],
					[
						[0, 5, 1]
					],
					[0, "Default", 0, 1]
				],
				[
					[-352, 448, 0, 31, 60, 0, 0, 1, 1, .483333, 0, 0, []], 17, 32, [],
					[
						[0, 5, 1]
					],
					[0, "Default", 0, 1]
				],
				[
					[-384, 368, 0, 39, 76, 0, 0, 1, 1, .5, 0, 0, []], 18, 33, [],
					[
						[0, 5, 1]
					],
					[0, "Default", 0, 1]
				],
				[
					[-384, 544, 0, 25, 48, 0, 0, 1, 1, .520833, 0, 0, []], 19, 34, [],
					[
						[0, 5, 1]
					],
					[0, "Default", 0, 1]
				],
				[
					[-448, 128, 0, 71, 55, 0, 0, 1, .507042, .509091, 0, 0, []], 24, 2, [
						[0]
					],
					[
						[0, 5, 1],
						[0, 0, 0, "30, 32", 0, 2, 1],
						[0, 1, 0, "42, 35", 0, 2, 1],
						[0, 4, 0, "360", 0, 2, 1]
					],
					[0, "Default", 0, 1]
				],
				[
					[-432, -80, 0, 71, 55, 0, 0, 1, .507042, .509091, 0, 0, []], 23, 1, [
						[0]
					],
					[
						[0, 5, 1],
						[0, 5, 1]
					],
					[0, "Default", 0, 1]
				]
			],
				[]
			],
			["HUD", 2, 0xcf69930f08614, true, [255, 255, 255], true, 1, 1, 1, false, 1, 0, 0, [
				[
					[160, 50, 0, 320, 100, 0, 0, 1, .5, .5, 0, 0, []], 27, 27, [],
					[],
					[0, "Default", 0, 1]
				],
				[
					[16, 64, 0, 128, 32, 0, 0, 1, 0, 0, 0, 0, []], 42, 12, [],
					[],
					["Text", 0, "12pt Tahoma", "rgb(255,255,255)", 0, 0, 0, 0, 0]
				],
				[
					[32, -144, 0, 128, 32, 0, 0, 1, 0, 0, 0, 0, []], 43, 15, [],
					[],
					["     ", 0, "14pt Sniglet", "rgb(255,255,255)", 0, 1, 0, 0, 0]
				],
				[
					[288, 36, 0, 52, 52, 0, 0, 1, .519231, .519231, 0, 0, []], 2, 28, [],
					[],
					[0, "Default", 0, 1]
				],
				[
					[7, 32, 0, 53, 41, 0, 0, 1, 0, .463415, 0, 0, []], 28, 21, [],
					[],
					[0, "Default", 0, 1]
				],
				[
					[32, -176, 0, 128, 32, 0, 0, 1, 0, 0, 0, 0, []], 40, 4, [],
					[],
					["     ", 0, "14pt Sniglet", "rgb(255,255,255)", 0, 0, 0, 0, 0]
				],
				[
					[120, 34, 0, 128, 32, 0, 0, 1, 0, 0, 0, 0, []], 52, 56, [],
					[],
					[16, 16, "ABCDEFGHIJKLMNOPQRSTUVWXYZ!:0123456789", "     ", 1, 0, 0, 0, 0, 0, -5, 0]
				],
				[
					[118, 14, 0, 128, 32, 0, 0, 1, 0, 0, 0, 0, []], 53, 57, [],
					[],
					[16, 16, "ABCDEFGHIJKLMNOPQRSTUVWXYZ!:0123456789", "     ", 1, 0, 0, 0, 0, 0, -5, 0]
				]
			],
				[]
			],
			["GamePausedLayer", 3, 8316829967672342, true, [255, 255, 255], true, 1, 1, 1, false, 1, 0, 0, [
				[
					[272, 496, 0, 320, 480, 0, 0, 1, 0, 0, 0, 0, []], 10, 35, [],
					[],
					[0, "Default", 0, 1]
				],
				[
					[-928, 176, 0, 320, 480, 0, 0, 1, 0, 0, 0, 0, []], 9, 23, [],
					[],
					[0, "Default", 0, 1]
				],
				[
					[656, 496, 0, 320, 480, 0, 0, 1, 0, 0, 0, 0, []], 8, 36, [],
					[],
					[0, "Default", 0, 1]
				],
				[
					[-80, 512, 0, 320, 480, 0, 0, 1, 0, 0, 0, 0, []], 12, 22, [],
					[],
					[0, "Default", 0, 1]
				],
				[
					[-208, 816, 0, 95, 95, 0, 0, 1, .456522, .43299, 0, 0, []], 3, 26, [],
					[
						[0, 5, 0, "100,100", 0, 2.5, 1],
						[0, 0, 23, "100,100", 0, 2.5, 1]
					],
					[0, "Default", 0, 1]
				],
				[
					[-176, 944, 0, 92, 97, 0, 0, 1, .543478, .505155, 0, 0, []], 5, 25, [],
					[],
					[0, "Default", 0, 1]
				],
				[
					[-160, 672, 0, 92, 97, 0, 0, 1, .5, .505155, 0, 0, []], 4, 37, [],
					[],
					[0, "Default", 0, 1]
				],
				[
					[-448, 672, 0, 224, 48, 0, 0, 1, 0, 0, 0, 0, []], 41, 45, [],
					[],
					["Candies:", 0, "20pt Sniglet", "rgb(255,255,255)", 0, 0, 0, 0, 0]
				],
				[
					[-416, 720, 0, 224, 48, 0, 0, 1, 0, 0, 0, 0, []], 44, 47, [],
					[],
					["     ", 0, "20pt Sniglet", "rgb(255,255,255)", 0, 0, 0, 0, 0]
				],
				[
					[-51, 694, 0, 240, 32, 0, 0, 1, 0, 0, 0, 0, []], 50, 54, [],
					[],
					[23, 23, "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!:0123456789", "     ", 1, 0, 0, 0, 0, 0, -5, 0]
				],
				[
					[-49, 728, 0, 240, 32, 0, 0, 1, 0, 0, 0, 0, []], 51, 55, [],
					[],
					[23, 23, "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!:0123456789", "     ", 1, 0, 0, 0, 0, 0, -5, 0]
				]
			],
				[]
			],
			["TopLayer", 4, 4747559956664143, true, [255, 255, 255], true, 1, 1, 1, false, 1, 0, 0, [
				[
					[528, -80, 0, 160, 39, 0, 0, 1, .5, .512821, 0, 0, []], 34, 6, [],
					[
						[1, 0, 0, 1.5, 1],
						[1, 1, 0, .5, 0, 0, 0, 20, 0]
					],
					[0, "Default", 0, 1]
				],
				[
					[576, 0, 0, 217, 55, 0, 0, 1, .502304, .509091, 0, 0, []], 35, 8, [],
					[
						[1, 0, 0, 1.5, 1],
						[1, 1, 0, .4, 0, 0, 0, 35, 0]
					],
					[0, "Default", 0, 1]
				],
				[
					[560, 112, 0, 267, 64, 0, 0, 1, .501873, .5, 0, 0, []], 37, 14, [],
					[
						[1, 0, 0, 1.5, 1],
						[1, 1, 0, .4, 0, 0, 0, 50, 0]
					],
					[0, "Default", 0, 1]
				],
				[
					[528, 240, 0, 299, 160, 0, 0, 1, .501672, .5, 0, 0, []], 38, 16, [],
					[
						[1, 0, 0, 2.5, 1],
						[1, 1, 0, 1, 0, 0, 0, 70, 0]
					],
					[0, "Default", 0, 1]
				],
				[
					[416, 384, 0, 51, 34, 0, 0, 1, .901961, .941176, 0, 0, []], 32, 20, [],
					[
						[1, 0, 0, 1, 1]
					],
					[0, "Default", 0, 1]
				],
				[
					[512, 368, 0, 56, 36, 0, 0, 1, .375, .972222, 0, 0, []], 33, 39, [],
					[
						[1, 0, 0, 1, 1]
					],
					[0, "Default", 0, 1]
				],
				[
					[416, 416, 0, 56, 36, 0, 0, 1, .285714, -.0555556, 0, 0, []], 36, 40, [],
					[
						[1, 0, 0, 1, 1]
					],
					[0, "Default", 0, 1]
				],
				[
					[528, 448, 0, 70, 36, 0, 0, 1, .857143, .0277778, 0, 0, []], 31, 41, [],
					[
						[1, 0, 0, 1, 1]
					],
					[0, "Default", 0, 1]
				],
				[
					[-864, 720, 0, 320, 480, 0, 0, 1, 0, 0, 0, 0, []], 13, 42, [],
					[
						[0, 5, 0, "100", 0, .3, 1],
						[0, 5, 0, "0", 0, .3, 1]
					],
					[0, "Default", 0, 1]
				],
				[
					[-144, 384, 0, 48.9506, 47.0679, 0, 0, 1, 1.05769, .78, 0, 0, []], 25, 49, [],
					[
						[0, 5, 1],
						[0, 5, 1]
					],
					[0, "Default", 0, 1]
				],
				[
					[-240, 480, 0, 128, 128, 0, 0, 1, 0, .5, 0, 0, []], 26, 50, [],
					[],
					[20, 360, 1, 200, 20, 100, 0, 0, 0, 0, 0, 0, -150, 20, 0, 1200, 0, 0, 1]
				],
				[
					[864, 48, 0, 260, 107, 0, 0, 1, .5, .504673, 0, 0, []], 39, 51, [],
					[
						[1, 1, 0, .3, 0, 0, 0, 50, 0],
						[1, 0, 0, 1.5, 1]
					],
					[0, "Default", 0, 1]
				]
			],
				[]
			]
		],
			[],
			[]
		],
		["StartScreen", 320, 480, false, "Event sheet 2", 9901377344593672, [
			["BG", 0, 761795434122473, true, [255, 255, 255], false, 1, 1, 1, false, 1, 0, 0, [
				[
					[160, 240, 0, 320, 480, 0, 0, 1, .5, .5, 0, 0, []], 6, 9, [],
					[],
					[0, "Default", 0, 1]
				]
			],
				[]
			],
			["Btns", 1, 0x72ef05d2785c6, true, [255, 255, 255], true, 1, 1, 1, false, 1, 0, 0, [
				[
					[161, 343, 0, 187, 76, 0, 0, 1, .502674, .5, 0, 0, []], 1, 17, [],
					[],
					[0, "Default", 0, 1]
				],
				[
					[163, 418, 0, 104, 59, 0, 0, 1, .5, .508475, 0, 0, []], 0, 18, [],
					[],
					[0, "Default", 0, 1]
				],
				[
					[417, 292, 0, 131, 29, 0, 0, 1, .5, .5, 0, 0, []], 45, 52, [],
					[],
					["     0", 0, "16pt Sniglet", "rgb(255,255,255)", 1, 1, 1, 0, 0]
				],
				[
					[-193, 84.5, 0, 128, 48, 0, 0, 1, .5, .5, 0, 0, []], 43, 43, [],
					[],
					["     ", 0, "bold 14pt Tahoma", "rgb(255,255,255)", 0, 1, 1, 0, 0]
				],
				[
					[-257, 51.5, 0, 112, 32, 0, 0, 1, 0, 0, 0, 0, []], 40, 44, [],
					[],
					["Text", 0, "14pt Arial", "rgb(255,255,255)", 0, 0, 0, 0, 0]
				],
				[
					[-267, 105, 0, 224, 48, 0, 0, 1, 0, 0, 0, 0, []], 41, 46, [],
					[],
					["Candies:", 0, "20pt Sniglet", "rgb(255,255,255)", 0, 0, 0, 0, 0]
				],
				[
					[-268, 133, 0, 224, 48, 0, 0, 1, 0, 0, 0, 0, []], 44, 48, [],
					[],
					["     ", 0, "20pt Sniglet", "rgb(255,255,255)", 0, 0, 0, 0, 0]
				],
				[
					[90, 255, 0, 144, 32, 0, 0, 1, 0, 0, 0, 0, []], 54, 58, [],
					[],
					[16, 16, "ABCDEFGHIJKLMNOPQRSTUVWXYZ!:0123456789", "     0", 1, 0, 1, 0, 0, 0, -5, 0]
				]
			],
				[]
			],
			["Layer 0", 2, 0x73b50bd8aee9f, true, [255, 255, 255], true, 1, 1, 1, false, 1, 0, 0, [
				[
					[0, 0, 0, 320, 480, 0, 0, 1, 0, 0, 0, 0, []], 11, 24, [],
					[
						[0, 5, 0, "100", 0, .3, 1],
						[0, 5, 0, "0", 0, .3, 1]
					],
					[0, "Default", 0, 1]
				],
				[
					[249, 367, 0, 92, 97, 0, 0, 1, .456522, .43299, 0, 0, []], 3, 38, [],
					[
						[0, 5, 0, "100", 0, .3, 1],
						[0, 5, 0, "0", 0, .3, 1]
					],
					[0, "Default", 0, 1]
				]
			],
				[]
			]
		],
			[],
			[]
		]
	], [
		["Event sheet 1", [
			[1, "BestScore", 0, 0, false, false, 4832072822553496, false],
			[1, "GlobalSpeed", 0, 700, false, false, 0xb30f804de6ef7, false],
			[1, "CurrTut", 0, 0, false, false, 5499465144956748, false],
			[1, "TutCompleted", 0, 0, false, false, 0x4f2951a156125, false],
			[1, "SlomoIsActive", 0, 0, false, false, 0xbfc20cbf55359, false],
			[1, "CandyFontainIsActiveFor", 0, 0, false, false, 6398686650565134, false],
			[1, "CandyFontainIsActive", 0, 0, false, false, 5583264838436099, false],
			[1, "SpawnCandiesTimeRandOffset", 0, .4, false, false, 9067514685283420, false],
			[1, "SpawnCandiesTime", 0, .3, false, false, 0xce9fc0fedb569, false],
			[1, "CuttedAtRaw", 0, 0, false, false, 748545829960142, false],
			[1, "MouseBeenReleaseSinceLastCut", 0, 0, false, false, 7958792258545028, false],
			[1, "ElapsedSinceLastCut", 0, 0, false, false, 0x89782b7e4e60b, false],
			[1, "Score", 0, 0, false, false, 8401123337034218, false],
			[1, "Lives", 0, 2, false, false, 5255261810854884, false],
			[1, "GameIsPaused", 0, 1, false, false, 9167813209970552, false],
			[1, "Candies_Amount", 0, 0, false, false, 9344722873491312, false],
			[1, "Slice_Initial_X", 0, 0, false, false, 0x7b1848a51e511, false],
			[1, "Slice_Initial_Y", 0, 0, false, false, 0x62d49eb6733d8, false],
			[0, null, false, null, 0x53d8437754bbf, [
				[-1, cr.system_object.prototype.cnds.OnLayoutStart, null, 1, false, false, false, 7937539008198606, false]
			],
				[
					[42, cr.plugins_.Text.prototype.acts.Destroy, null, 6820424415321544, false],
					[47, cr.plugins_.Sprite.prototype.acts.Destroy, null, 6721067476553631, false],
					[46, cr.plugins_.Sprite.prototype.acts.Destroy, null, 9788157872917526, false],
					[56, cr.plugins_.Sprite.prototype.acts.Destroy, null, 0x8ed39869d485c, false],
					[61, cr.plugins_.Sprite.prototype.acts.Destroy, null, 5994690632022597, false],
					[24, cr.plugins_.Sprite.prototype.acts.Destroy, null, 5828823102253303, false],
					[10, cr.plugins_.Sprite.prototype.acts.Destroy, null, 5396774202371632, false],
					[12, cr.plugins_.Sprite.prototype.acts.Destroy, null, 8650605350340585, false],
					[9, cr.plugins_.Sprite.prototype.acts.Destroy, null, 0x7dc642a93417e, false],
					[8, cr.plugins_.Sprite.prototype.acts.Destroy, null, 7273147720164038, false],
					[3, cr.plugins_.Sprite.prototype.acts.Destroy, null, 4806718719820633, false],
					[4, cr.plugins_.Sprite.prototype.acts.Destroy, null, 9485122755064738, false],
					[5, cr.plugins_.Sprite.prototype.acts.Destroy, null, 0x713a6eb074c4e, false],
					[26, cr.plugins_.Particles.prototype.acts.Destroy, null, 0x5f905b126cec, false],
					[41, cr.plugins_.Text.prototype.acts.Destroy, null, 0xa99a129bfc4bd, false],
					[44, cr.plugins_.Text.prototype.acts.Destroy, null, 0x9cf7ba15df2f, false],
					[40, cr.plugins_.Text.prototype.acts.Destroy, null, 8392435797807625, false],
					[43, cr.plugins_.Text.prototype.acts.Destroy, null, 0xa636ffc9414b8, false],
					[-1, cr.system_object.prototype.acts.SetVar, null, 0xdcb5af0b42127, false, [
						[11, "Lives"],
						[7, [0, 2]]
					]],
					[-1, cr.system_object.prototype.acts.SetVar, null, 8163631624987311, false, [
						[11, "GameIsPaused"],
						[7, [0, 1]]
					]],
					[-1, cr.system_object.prototype.acts.SetVar, null, 53407383322061, false, [
						[11, "SlomoIsActive"],
						[7, [0, 0]]
					]],
					[-1, cr.system_object.prototype.acts.SetVar, null, 0x9f01a59a06f59, false, [
						[11, "MouseBeenReleaseSinceLastCut"],
						[7, [0, 0]]
					]],
					[-1, cr.system_object.prototype.acts.SetVar, null, 0x436d7dfffe751, false, [
						[11, "Candies_Amount"],
						[7, [0, 0]]
					]],
					[-1, cr.system_object.prototype.acts.SetVar, null, 6653766910556768, false, [
						[11, "Score"],
						[7, [0, 0]]
					]],
					[-1, cr.system_object.prototype.acts.SetVar, null, 5973102120616778, false, [
						[11, "CandyFontainIsActive"],
						[7, [0, 0]]
					]],
					[-1, cr.system_object.prototype.acts.SetVar, null, 768932538247207, false, [
						[11, "CandyFontainIsActiveFor"],
						[7, [0, 0]]
					]],
					[-1, cr.system_object.prototype.acts.SetVar, null, 0x82bc1ef910490, false, [
						[11, "BombsSpawnDelayDone"],
						[7, [0, 0]]
					]],
					[28, cr.plugins_.Sprite.prototype.acts.SetAnimFrame, null, 6433770912432973, false, [
						[0, [23, "Lives"]]
					]],
					[28, cr.plugins_.Sprite.prototype.acts.StopAnim, null, 0xc9fab59ebe5e1, false],
					[-1, cr.system_object.prototype.acts.CreateObject, null, 4938086548461428, false, [
						[4, 13],
						[5, [0, 4]],
						[0, [0, 0]],
						[0, [0, 0]]
					]],
					[13, cr.plugins_.Sprite.prototype.acts.SetOpacity, null, 5226120715309349, false, [
						[0, [0, 0]]
					]],
					[13, cr.behaviors.lunarray_LiteTween.prototype.acts.Start, "start", 484118958134746, false, [
						[3, 0]
					]],
					[-1, cr.system_object.prototype.acts.Wait, null, 0x7583da686d227, false, [
						[0, [1, .3]]
					]],
					[28, cr.plugins_.Sprite.prototype.acts.SetVisible, null, 8123885592019209, false, [
						[3, 0]
					]],
					[27, cr.plugins_.Sprite.prototype.acts.SetVisible, null, 4956083032955628, false, [
						[3, 0]
					]],
					[2, cr.plugins_.Sprite.prototype.acts.SetVisible, null, 0x8574f496f86d, false, [
						[3, 0]
					]],
					[43, cr.plugins_.Text.prototype.acts.SetText, null, 7160192311664218, false, [
						[7, [10, [2, "     "],
							[23, "Score"]
						]]
					]],
					[40, cr.plugins_.Text.prototype.acts.SetText, null, 0x3a53f13c93834, false, [
						[7, [10, [2, "BEST:"],
							[23, "BestScore"]
						]]
					]],
					[53, cr.plugins_.Spritefont2.prototype.acts.SetVisible, null, 7504492535028863, false, [
						[3, 0]
					]],
					[52, cr.plugins_.Spritefont2.prototype.acts.SetVisible, null, 0xabd15c40a2bb3, false, [
						[3, 0]
					]],
					[52, cr.plugins_.Spritefont2.prototype.acts.MoveToLayer, null, 0x916dab0f5b1c5, false, [
						[5, [0, 2]]
					]]
				],
				[
					[0, null, false, null, 9177726973297438, [
						[-1, cr.system_object.prototype.cnds.CompareVar, null, 0, false, false, false, 0x8a2f67d5f5278, false, [
							[11, "LANG"],
							[8, 0],
							[7, [2, "es"]]
						]]
					],
						[
							[53, cr.plugins_.Spritefont2.prototype.acts.SetText, null, 61351661703021, false, [
								[7, [10, [2, "PUNTAJE:"],
									[23, "Score"]
								]]
							]],
							[52, cr.plugins_.Spritefont2.prototype.acts.SetText, null, 0xd5fca1dd55e46, false, [
								[7, [10, [2, "MEJOR:"],
									[23, "BestScore"]
								]]
							]]
						]
					],
					[0, null, false, null, 0x4efb0c3cb5e52, [
						[-1, cr.system_object.prototype.cnds.Else, null, 0, false, false, false, 0xd1025aa094ccd, false]
					],
						[
							[53, cr.plugins_.Spritefont2.prototype.acts.SetText, null, 5319411021060142, false, [
								[7, [10, [2, "     "],
									[23, "Score"]
								]]
							]],
							[52, cr.plugins_.Spritefont2.prototype.acts.SetText, null, 8509529196405516, false, [
								[7, [10, [2, "BEST:"],
									[23, "BestScore"]
								]]
							]]
						]
					],
					[0, null, false, null, 8646791937225954, [],
						[
							[13, cr.behaviors.lunarray_LiteTween.prototype.acts.Start, "stop", 0x3dfc1ba9aefbb, false, [
								[3, 0]
							]],
							[-1, cr.system_object.prototype.acts.Wait, null, 9094988347303514, false, [
								[0, [1, .3]]
							]],
							[13, cr.plugins_.Sprite.prototype.acts.Destroy, null, 513240665258939, false]
						]
					],
					[0, null, false, null, 5263994670658141, [
						[-1, cr.system_object.prototype.cnds.CompareVar, null, 0, false, false, false, 0xa28db10ad5a10, false, [
							[11, "TutCompleted"],
							[8, 0],
							[7, [0, 0]]
						]]
					],
						[
							[-1, cr.system_object.prototype.acts.CreateObject, null, 6577262119012411, false, [
								[4, 9],
								[5, [0, 3]],
								[0, [0, 0]],
								[0, [0, 0]]
							]],
							[-1, cr.system_object.prototype.acts.CreateObject, null, 7309097208893702, false, [
								[4, 4],
								[5, [0, 3]],
								[0, [0, 261]],
								[0, [0, 406]]
							]],
							[-1, cr.system_object.prototype.acts.SetVar, null, 9532472212888396, false, [
								[11, "CurrTut"],
								[7, [0, 1]]
							]]
						],
						[
							[0, null, false, null, 0x4c2ed533a415d, [
								[-1, cr.system_object.prototype.cnds.CompareVar, null, 0, false, false, false, 0xc8889c20c2cb7, false, [
									[11, "LANG"],
									[8, 0],
									[7, [2, "es"]]
								]]
							],
								[
									[9, cr.plugins_.Sprite.prototype.acts.SetAnimFrame, null, 8474617350745324, false, [
										[0, [0, 1]]
									]],
									[9, cr.plugins_.Sprite.prototype.acts.StopAnim, null, 0xf33de6f3b1193, false]
								]
							],
							[0, null, false, null, 0xafd1f0e303c53, [
								[-1, cr.system_object.prototype.cnds.Else, null, 0, false, false, false, 0xb199b8b3f45d8, false]
							],
								[
									[9, cr.plugins_.Sprite.prototype.acts.SetAnimFrame, null, 664527044844423, false, [
										[0, [0, 0]]
									]],
									[9, cr.plugins_.Sprite.prototype.acts.StopAnim, null, 0x40ecd79e50661, false]
								]
							]
						]
					],
					[0, null, false, null, 5748467303303985, [
						[-1, cr.system_object.prototype.cnds.Else, null, 0, false, false, false, 335608760556832, false]
					],
						[
							[-1, cr.system_object.prototype.acts.SetVar, null, 9427173312487962, false, [
								[11, "GameIsPaused"],
								[7, [0, 0]]
							]],
							[28, cr.plugins_.Sprite.prototype.acts.SetVisible, null, 0x5bd95ba3e0b00, false, [
								[3, 1]
							]],
							[27, cr.plugins_.Sprite.prototype.acts.SetVisible, null, 6247536423914716, false, [
								[3, 1]
							]],
							[2, cr.plugins_.Sprite.prototype.acts.SetVisible, null, 0x51bd23be2c9bf, false, [
								[3, 1]
							]],
							[53, cr.plugins_.Spritefont2.prototype.acts.SetVisible, null, 9964285891037172, false, [
								[3, 1]
							]],
							[52, cr.plugins_.Spritefont2.prototype.acts.SetVisible, null, 8086180617662733, false, [
								[3, 1]
							]]
						]
					]
				]
			],
			[0, null, false, null, 0xc09f96ec06043, [
				[-1, cr.system_object.prototype.cnds.CompareVar, null, 0, false, false, false, 0xea49c9cec4c25, false, [
					[11, "GameIsPaused"],
					[8, 0],
					[7, [0, 1]]
				]],
				[-1, cr.system_object.prototype.cnds.CompareVar, null, 0, false, false, false, 6785094147308014, false, [
					[11, "TutCompleted"],
					[8, 0],
					[7, [0, 0]]
				]]
			],
				[],
				[
					[0, null, true, null, 7754857444298257, [
						[29, cr.plugins_.Mouse.prototype.cnds.OnObjectClicked, null, 1, false, false, false, 5705305411994146, false, [
							[3, 0],
							[3, 0],
							[4, 4]
						]],
						[30, cr.plugins_.Touch.prototype.cnds.OnTouchObject, null, 1, false, false, false, 6931394593831444, false, [
							[4, 4]
						]]
					],
						[],
						[
							[0, null, false, null, 0x5237c6604fe16, [
								[-1, cr.system_object.prototype.cnds.CompareVar, null, 0, false, false, false, 9727643922105048, false, [
									[11, "CurrTut"],
									[8, 0],
									[7, [0, 1]]
								]]
							],
								[
									[-1, cr.system_object.prototype.acts.CreateObject, null, 9536321484925048, false, [
										[4, 13],
										[5, [0, 4]],
										[0, [0, 0]],
										[0, [0, 0]]
									]],
									[13, cr.plugins_.Sprite.prototype.acts.SetOpacity, null, 7519477562270497, false, [
										[0, [0, 0]]
									]],
									[13, cr.behaviors.lunarray_LiteTween.prototype.acts.Start, "start", 4709208812830006, false, [
										[3, 0]
									]],
									[-1, cr.system_object.prototype.acts.Wait, null, 0xddd06cee07017, false, [
										[0, [1, .3]]
									]],
									[9, cr.plugins_.Sprite.prototype.acts.Destroy, null, 6595099038870162, false],
									[-1, cr.system_object.prototype.acts.CreateObject, null, 9768807131793894, false, [
										[4, 8],
										[5, [0, 3]],
										[0, [0, 0]],
										[0, [0, 0]]
									]],
									[4, cr.plugins_.Sprite.prototype.acts.MoveToTop, null, 0xba0e3cef0b16e, false],
									[-1, cr.system_object.prototype.acts.SetVar, null, 7246427662669753, false, [
										[11, "CurrTut"],
										[7, [0, 2]]
									]]
								],
								[
									[0, null, false, null, 6638191455274088, [
										[-1, cr.system_object.prototype.cnds.CompareVar, null, 0, false, false, false, 6908829644078461, false, [
											[11, "LANG"],
											[8, 0],
											[7, [2, "es"]]
										]]
									],
										[
											[8, cr.plugins_.Sprite.prototype.acts.SetAnimFrame, null, 7334354187499932, false, [
												[0, [0, 1]]
											]],
											[8, cr.plugins_.Sprite.prototype.acts.StopAnim, null, 0xfda8a48cf0447, false]
										]
									],
									[0, null, false, null, 0xa6bb8ffd38a9a, [
										[-1, cr.system_object.prototype.cnds.Else, null, 0, false, false, false, 9884926316486848, false]
									],
										[
											[8, cr.plugins_.Sprite.prototype.acts.SetAnimFrame, null, 0x670947c01f000, false, [
												[0, [0, 0]]
											]],
											[8, cr.plugins_.Sprite.prototype.acts.StopAnim, null, 0xfdaddc8616e6c, false]
										]
									],
									[0, null, false, null, 5846927071827348, [],
										[
											[13, cr.behaviors.lunarray_LiteTween.prototype.acts.Start, "stop", 0x741db25ab56c5, false, [
												[3, 0]
											]],
											[-1, cr.system_object.prototype.acts.Wait, null, 0x9e43f4def8ac9, false, [
												[0, [1, .3]]
											]],
											[13, cr.plugins_.Sprite.prototype.acts.Destroy, null, 9066729937577848, false]
										]
									]
								]
							],
							[0, null, false, null, 5316683306948174, [
								[-1, cr.system_object.prototype.cnds.Else, null, 0, false, false, false, 5508104589819223, false]
							],
								[
									[-1, cr.system_object.prototype.acts.CreateObject, null, 6106535191894293, false, [
										[4, 13],
										[5, [0, 4]],
										[0, [0, 0]],
										[0, [0, 0]]
									]],
									[13, cr.plugins_.Sprite.prototype.acts.SetOpacity, null, 6212239803941915, false, [
										[0, [0, 0]]
									]],
									[13, cr.behaviors.lunarray_LiteTween.prototype.acts.Start, "start", 7669512908206894, false, [
										[3, 0]
									]],
									[-1, cr.system_object.prototype.acts.Wait, null, 4808646555820771, false, [
										[0, [1, .3]]
									]],
									[8, cr.plugins_.Sprite.prototype.acts.Destroy, null, 5394579556213709, false],
									[4, cr.plugins_.Sprite.prototype.acts.Destroy, null, 4543648318239956, false],
									[-1, cr.system_object.prototype.acts.SetVar, null, 0x7fcb814e1ebbd, false, [
										[11, "TutCompleted"],
										[7, [0, 1]]
									]],
									[-1, cr.system_object.prototype.acts.SetVar, null, 8483754784208008, false, [
										[11, "CurrTut"],
										[7, [0, 2222]]
									]],
									[13, cr.behaviors.lunarray_LiteTween.prototype.acts.Start, "stop", 0xab80646a5503b, false, [
										[3, 0]
									]],
									[-1, cr.system_object.prototype.acts.Wait, null, 5024560761266645, false, [
										[0, [1, .3]]
									]],
									[13, cr.plugins_.Sprite.prototype.acts.Destroy, null, 5942891480654481, false],
									[-1, cr.system_object.prototype.acts.SetVar, null, 0x8fb327c69d527, false, [
										[11, "GameIsPaused"],
										[7, [0, 0]]
									]],
									[28, cr.plugins_.Sprite.prototype.acts.SetVisible, null, 6309081197139418, false, [
										[3, 1]
									]],
									[27, cr.plugins_.Sprite.prototype.acts.SetVisible, null, 5069813109175883, false, [
										[3, 1]
									]],
									[2, cr.plugins_.Sprite.prototype.acts.SetVisible, null, 6097726730871108, false, [
										[3, 1]
									]],
									[53, cr.plugins_.Spritefont2.prototype.acts.SetVisible, null, 7706081591061075, false, [
										[3, 1]
									]],
									[52, cr.plugins_.Spritefont2.prototype.acts.SetVisible, null, 8610312043259726, false, [
										[3, 1]
									]]
								]
							]
						]
					]
				]
			],
			[0, null, false, null, 8235732786874766, [
				[29, cr.plugins_.Mouse.prototype.cnds.OnClick, null, 1, false, false, false, 0xd0e4cb162b829, false, [
					[3, 0],
					[3, 0]
				]]
			],
				[
					[-1, cr.system_object.prototype.acts.SetVar, null, 9483357908559128, false, [
						[11, "Slice_Initial_X"],
						[7, [20, 29, cr.plugins_.Mouse.prototype.exps.X, false, null]]
					]],
					[-1, cr.system_object.prototype.acts.SetVar, null, 9269527787097844, false, [
						[11, "Slice_Initial_Y"],
						[7, [20, 29, cr.plugins_.Mouse.prototype.exps.Y, false, null]]
					]]
				]
			],
			[0, null, false, null, 8680557405443485, [
				[30, cr.plugins_.Touch.prototype.cnds.OnTouchStart, null, 1, false, false, false, 0xc7d4bf982b854, false]
			],
				[
					[-1, cr.system_object.prototype.acts.SetVar, null, 8078319301548373, false, [
						[11, "Slice_Initial_X"],
						[7, [20, 30, cr.plugins_.Touch.prototype.exps.X, false, null, [
							[2, "BG"]
						]]]
					]],
					[-1, cr.system_object.prototype.acts.SetVar, null, 0x62795083a709d, false, [
						[11, "Slice_Initial_Y"],
						[7, [20, 30, cr.plugins_.Touch.prototype.exps.Y, false, null, [
							[2, "BG"]
						]]]
					]]
				]
			],
			[0, null, false, null, 0xe38e6ddc38ebf, [
				[-1, cr.system_object.prototype.cnds.CompareVar, null, 0, false, false, false, 6593874809610883, false, [
					[11, "GameIsPaused"],
					[8, 1],
					[7, [0, 1]]
				]],
				[-1, cr.system_object.prototype.cnds.CompareVar, null, 0, false, false, false, 5842275606662821, false, [
					[11, "SlomoIsActive"],
					[8, 1],
					[7, [0, 1]]
				]],
				[30, cr.plugins_.Touch.prototype.cnds.IsTouchingObject, null, 0, false, true, false, 8511768616888706, false, [
					[4, 2]
				]],
				[30, cr.plugins_.Touch.prototype.cnds.IsTouchingObject, null, 0, false, true, false, 579743555049803, false, [
					[4, 4]
				]]
			],
				[],
				[
					[0, null, false, null, 0xb189256bc695, [
						[29, cr.plugins_.Mouse.prototype.cnds.IsButtonDown, null, 0, false, false, false, 9208063196246088, false, [
							[3, 0]
						]]
					],
						[
							[-1, cr.system_object.prototype.acts.CreateObject, null, 9738788806048504, false, [
								[4, 47],
								[5, [0, 0]],
								[0, [23, "Slice_Initial_X"]],
								[0, [23, "Slice_Initial_Y"]]
							]],
							[47, cr.plugins_.Sprite.prototype.acts.SetWidth, null, 7110760503873639, false, [
								[0, [19, cr.system_object.prototype.exps.distance, [
									[23, "Slice_Initial_X"],
									[23, "Slice_Initial_Y"],
									[20, 29, cr.plugins_.Mouse.prototype.exps.X, false, null],
									[20, 29, cr.plugins_.Mouse.prototype.exps.Y, false, null]
								]]]
							]],
							[47, cr.plugins_.Sprite.prototype.acts.SetHeight, null, 0x75d1529ee3286, false, [
								[0, [7, [20, 47, cr.plugins_.Sprite.prototype.exps.Width, false, null],
									[0, 8]
								]]
							]],
							[47, cr.plugins_.Sprite.prototype.acts.SetAngle, null, 0xc7f5aecb05db2, false, [
								[0, [19, cr.system_object.prototype.exps.angle, [
									[23, "Slice_Initial_X"],
									[23, "Slice_Initial_Y"],
									[20, 29, cr.plugins_.Mouse.prototype.exps.X, false, null],
									[20, 29, cr.plugins_.Mouse.prototype.exps.Y, false, null]
								]]]
							]],
							[-1, cr.system_object.prototype.acts.SetVar, null, 934323766011749, false, [
								[11, "Slice_Initial_X"],
								[7, [20, 29, cr.plugins_.Mouse.prototype.exps.X, false, null]]
							]],
							[-1, cr.system_object.prototype.acts.SetVar, null, 379194305975312, false, [
								[11, "Slice_Initial_Y"],
								[7, [20, 29, cr.plugins_.Mouse.prototype.exps.Y, false, null]]
							]]
						]
					],
					[0, null, false, null, 0xcf6f74c69e48d, [
						[30, cr.plugins_.Touch.prototype.cnds.IsInTouch, null, 0, false, false, false, 7498367476290705, false]
					],
						[
							[-1, cr.system_object.prototype.acts.CreateObject, null, 0x55839224d198b, false, [
								[4, 47],
								[5, [0, 0]],
								[0, [23, "Slice_Initial_X"]],
								[0, [23, "Slice_Initial_Y"]]
							]],
							[47, cr.plugins_.Sprite.prototype.acts.SetWidth, null, 0x7fa879901cd8f, false, [
								[0, [19, cr.system_object.prototype.exps.distance, [
									[23, "Slice_Initial_X"],
									[23, "Slice_Initial_Y"],
									[20, 30, cr.plugins_.Touch.prototype.exps.X, false, null, [
										[2, "BG"]
									]],
									[20, 30, cr.plugins_.Touch.prototype.exps.Y, false, null, [
										[2, "BG"]
									]]
								]]]
							]],
							[47, cr.plugins_.Sprite.prototype.acts.SetHeight, null, 0x6637246bd9853, false, [
								[0, [7, [20, 47, cr.plugins_.Sprite.prototype.exps.Width, false, null],
									[0, 8]
								]]
							]],
							[47, cr.plugins_.Sprite.prototype.acts.SetAngle, null, 0x4a0d70d6a2215, false, [
								[0, [19, cr.system_object.prototype.exps.angle, [
									[23, "Slice_Initial_X"],
									[23, "Slice_Initial_Y"],
									[20, 30, cr.plugins_.Touch.prototype.exps.X, false, null, [
										[2, "BG"]
									]],
									[20, 30, cr.plugins_.Touch.prototype.exps.Y, false, null, [
										[2, "BG"]
									]]
								]]]
							]],
							[-1, cr.system_object.prototype.acts.SetVar, null, 724601221004615, false, [
								[11, "Slice_Initial_X"],
								[7, [20, 30, cr.plugins_.Touch.prototype.exps.X, false, null, [
									[2, "BG"]
								]]]
							]],
							[-1, cr.system_object.prototype.acts.SetVar, null, 6654926442820032, false, [
								[11, "Slice_Initial_Y"],
								[7, [20, 30, cr.plugins_.Touch.prototype.exps.Y, false, null, [
									[2, "BG"]
								]]]
							]]
						]
					]
				]
			],
			[1, "RandNum", 0, 0, false, false, 6319539101115461, false],
			[0, null, false, null, 0x8623668b9050c, [
				[-1, cr.system_object.prototype.cnds.Every, null, 0, false, false, false, 8651764072200669, false, [
					[0, [4, [23, "SpawnCandiesTime"],
						[19, cr.system_object.prototype.exps.random, [
							[23, "SpawnCandiesTimeRandOffset"]
						]]
					]]
				]],
				[-1, cr.system_object.prototype.cnds.CompareVar, null, 0, false, false, false, 5388746387251387, false, [
					[11, "GameIsPaused"],
					[8, 1],
					[7, [0, 1]]
				]]
			],
				[
					[-1, cr.system_object.prototype.acts.SetVar, null, 0x68850639a6d8d, false, [
						[11, "RandNum"],
						[7, [19, cr.system_object.prototype.exps.random, [
							[0, 100]
						]]]
					]]
				],
				[
					[0, null, false, null, 5990317030899022, [
						[-1, cr.system_object.prototype.cnds.CompareVar, null, 0, false, false, false, 0x972bca0cfd750, false, [
							[11, "RandNum"],
							[8, 2],
							[7, [0, 50]]
						]]
					],
						[
							[-1, cr.system_object.prototype.acts.CreateObject, null, 6151099206952308, false, [
								[4, 22],
								[5, [0, 1]],
								[0, [4, [6, [20, 22, cr.plugins_.Sprite.prototype.exps.Width, false, null],
									[0, 2]
								],
									[19, cr.system_object.prototype.exps.random, [
										[5, [19, cr.system_object.prototype.exps.layoutwidth],
											[6, [20, 22, cr.plugins_.Sprite.prototype.exps.Width, false, null],
												[0, 4]
											]
										]
									]]
								]],
								[0, [4, [19, cr.system_object.prototype.exps.layoutheight],
									[7, [20, 22, cr.plugins_.Sprite.prototype.exps.Width, false, null],
										[0, 2]
									]
								]]
							]],
							[22, cr.behaviors.custom.prototype.acts.SetSpeed, "CustomMovement2", 0x93ff32960af06, false, [
								[3, 0],
								[0, [3, [23, "GlobalSpeed"]]]
							]],
							[22, cr.behaviors.custom.prototype.acts.SetAngleOfMotion, "CustomMovement2", 6286482505286708, false, [
								[0, [5, [1, -84.375],
									[19, cr.system_object.prototype.exps.random, [
										[1, 11.25]
									]]
								]]
							]]
						]
					],
					[0, null, false, null, 5274143938247925, [
						[-1, cr.system_object.prototype.cnds.CompareVar, null, 0, false, false, false, 9648577030902012, false, [
							[11, "RandNum"],
							[8, 4],
							[7, [0, 50]]
						]],
						[-1, cr.system_object.prototype.cnds.CompareVar, null, 0, false, false, false, 0xe9322495b31a4, false, [
							[11, "RandNum"],
							[8, 2],
							[7, [0, 80]]
						]]
					],
						[
							[-1, cr.system_object.prototype.acts.CreateObject, null, 6812113892113561, false, [
								[4, 21],
								[5, [0, 1]],
								[0, [4, [6, [20, 21, cr.plugins_.Sprite.prototype.exps.Width, false, null],
									[0, 2]
								],
									[19, cr.system_object.prototype.exps.random, [
										[5, [19, cr.system_object.prototype.exps.layoutwidth],
											[6, [20, 21, cr.plugins_.Sprite.prototype.exps.Width, false, null],
												[0, 4]
											]
										]
									]]
								]],
								[0, [4, [19, cr.system_object.prototype.exps.layoutheight],
									[7, [20, 21, cr.plugins_.Sprite.prototype.exps.Width, false, null],
										[0, 2]
									]
								]]
							]],
							[21, cr.behaviors.custom.prototype.acts.SetSpeed, "CustomMovement2", 9385652354809988, false, [
								[3, 0],
								[0, [3, [23, "GlobalSpeed"]]]
							]],
							[21, cr.behaviors.custom.prototype.acts.SetAngleOfMotion, "CustomMovement2", 6505644210799675, false, [
								[0, [5, [1, -84.375],
									[19, cr.system_object.prototype.exps.random, [
										[1, 11.25]
									]]
								]]
							]]
						]
					],
					[0, null, false, null, 890021948424506, [
						[-1, cr.system_object.prototype.cnds.CompareVar, null, 0, false, false, false, 7769282182095803, false, [
							[11, "RandNum"],
							[8, 4],
							[7, [0, 80]]
						]]
					],
						[
							[-1, cr.system_object.prototype.acts.CreateObject, null, 4744652261489706, false, [
								[4, 20],
								[5, [0, 1]],
								[0, [4, [6, [20, 20, cr.plugins_.Sprite.prototype.exps.Width, false, null],
									[0, 2]
								],
									[19, cr.system_object.prototype.exps.random, [
										[5, [19, cr.system_object.prototype.exps.layoutwidth],
											[6, [20, 20, cr.plugins_.Sprite.prototype.exps.Width, false, null],
												[0, 4]
											]
										]
									]]
								]],
								[0, [4, [19, cr.system_object.prototype.exps.layoutheight],
									[7, [20, 20, cr.plugins_.Sprite.prototype.exps.Width, false, null],
										[0, 2]
									]
								]]
							]],
							[20, cr.behaviors.custom.prototype.acts.SetSpeed, "CustomMovement2", 0x804bec5ad8823, false, [
								[3, 0],
								[0, [3, [23, "GlobalSpeed"]]]
							]],
							[20, cr.behaviors.custom.prototype.acts.SetAngleOfMotion, "CustomMovement2", 9181057484873316, false, [
								[0, [5, [1, -84.375],
									[19, cr.system_object.prototype.exps.random, [
										[1, 11.25]
									]]
								]]
							]]
						]
					]
				]
			],
			[1, "BombsSpawnDelayDone", 0, 0, false, false, 863431158169603, false],
			[0, null, false, null, 873855346871748, [
				[-1, cr.system_object.prototype.cnds.Every, null, 0, false, false, false, 5420250466619507, false, [
					[0, [0, 10]]
				]],
				[-1, cr.system_object.prototype.cnds.CompareVar, null, 0, false, false, false, 0xf022262cc77ff, false, [
					[11, "BombsSpawnDelayDone"],
					[8, 0],
					[7, [0, 0]]
				]],
				[-1, cr.system_object.prototype.cnds.CompareVar, null, 0, false, false, false, 5866031539419033, false, [
					[11, "GameIsPaused"],
					[8, 1],
					[7, [0, 1]]
				]]
			],
				[
					[-1, cr.system_object.prototype.acts.SetVar, null, 6529857721984496, false, [
						[11, "BombsSpawnDelayDone"],
						[7, [0, 1]]
					]]
				]
			],
			[0, null, false, null, 0xf8dfa6e71f112, [
				[-1, cr.system_object.prototype.cnds.Every, null, 0, false, false, false, 0xb4b15c8c10c14, false, [
					[0, [4, [0, 2],
						[19, cr.system_object.prototype.exps.random, [
							[0, 2]
						]]
					]]
				]],
				[-1, cr.system_object.prototype.cnds.CompareVar, null, 0, false, false, false, 8778999704927417, false, [
					[11, "GameIsPaused"],
					[8, 1],
					[7, [0, 1]]
				]],
				[-1, cr.system_object.prototype.cnds.CompareVar, null, 0, false, false, false, 6497079813489304, false, [
					[11, "CandyFontainIsActive"],
					[8, 1],
					[7, [0, 1]]
				]],
				[-1, cr.system_object.prototype.cnds.CompareVar, null, 0, false, false, false, 7884178814557775, false, [
					[11, "BombsSpawnDelayDone"],
					[8, 0],
					[7, [0, 1]]
				]]
			],
				[
					[-1, cr.system_object.prototype.acts.CreateObject, null, 8775271545487426, false, [
						[4, 14],
						[5, [0, 1]],
						[0, [4, [6, [20, 14, cr.plugins_.Sprite.prototype.exps.Width, false, null],
							[0, 2]
						],
							[19, cr.system_object.prototype.exps.random, [
								[5, [19, cr.system_object.prototype.exps.layoutwidth],
									[6, [20, 14, cr.plugins_.Sprite.prototype.exps.Width, false, null],
										[0, 4]
									]
								]
							]]
						]],
						[0, [4, [19, cr.system_object.prototype.exps.layoutheight],
							[7, [20, 14, cr.plugins_.Sprite.prototype.exps.Width, false, null],
								[0, 2]
							]
						]]
					]],
					[14, cr.behaviors.custom.prototype.acts.SetSpeed, "CustomMovement2", 4706481182765618, false, [
						[3, 0],
						[0, [3, [23, "GlobalSpeed"]]]
					]],
					[14, cr.behaviors.custom.prototype.acts.SetAngleOfMotion, "CustomMovement2", 5835107900658018, false, [
						[0, [5, [1, -84.375],
							[19, cr.system_object.prototype.exps.random, [
								[1, 11.25]
							]]
						]]
					]],
					[14, cr.plugins_.Sprite.prototype.acts.SetAngle, null, 506182958675356, false, [
						[0, [19, cr.system_object.prototype.exps.random, [
							[0, 360]
						]]]
					]]
				]
			],
			[0, null, false, null, 0xf3ebb1247cfdb, [
				[-1, cr.system_object.prototype.cnds.Every, null, 0, false, false, false, 6432816878591915, false, [
					[0, [4, [0, 3],
						[19, cr.system_object.prototype.exps.random, [
							[0, 1]
						]]
					]]
				]],
				[-1, cr.system_object.prototype.cnds.CompareVar, null, 0, false, false, false, 5885991440510994, false, [
					[11, "GameIsPaused"],
					[8, 1],
					[7, [0, 1]]
				]],
				[-1, cr.system_object.prototype.cnds.CompareVar, null, 0, false, false, false, 0xe6e617f3e6eee, false, [
					[11, "CandyFontainIsActive"],
					[8, 1],
					[7, [0, 1]]
				]],
				[-1, cr.system_object.prototype.cnds.CompareVar, null, 0, false, false, false, 0x3a0b9e6bd05c5, false, [
					[11, "BombsSpawnDelayDone"],
					[8, 0],
					[7, [0, 1]]
				]]
			],
				[
					[-1, cr.system_object.prototype.acts.CreateObject, null, 5155768844322383, false, [
						[4, 15],
						[5, [0, 1]],
						[0, [4, [6, [20, 15, cr.plugins_.Sprite.prototype.exps.Width, false, null],
							[0, 2]
						],
							[19, cr.system_object.prototype.exps.random, [
								[5, [19, cr.system_object.prototype.exps.layoutwidth],
									[6, [20, 15, cr.plugins_.Sprite.prototype.exps.Width, false, null],
										[0, 4]
									]
								]
							]]
						]],
						[0, [4, [19, cr.system_object.prototype.exps.layoutheight],
							[7, [20, 15, cr.plugins_.Sprite.prototype.exps.Width, false, null],
								[0, 2]
							]
						]]
					]],
					[15, cr.behaviors.custom.prototype.acts.SetSpeed, "CustomMovement2", 5807331087783236, false, [
						[3, 0],
						[0, [3, [23, "GlobalSpeed"]]]
					]],
					[15, cr.behaviors.custom.prototype.acts.SetAngleOfMotion, "CustomMovement2", 5098467506986848, false, [
						[0, [5, [1, -84.375],
							[19, cr.system_object.prototype.exps.random, [
								[1, 11.25]
							]]
						]]
					]],
					[15, cr.plugins_.Sprite.prototype.acts.SetAngle, null, 0x3d9c32263a1e1, false, [
						[0, [19, cr.system_object.prototype.exps.random, [
							[0, 360]
						]]]
					]]
				]
			],
			[0, null, false, null, 9169659291704680, [
				[-1, cr.system_object.prototype.cnds.Every, null, 0, false, false, false, 8100831553995254, false, [
					[0, [4, [0, 3],
						[19, cr.system_object.prototype.exps.random, [
							[0, 7]
						]]
					]]
				]],
				[-1, cr.system_object.prototype.cnds.CompareVar, null, 0, false, false, false, 9845164406988056, false, [
					[11, "GameIsPaused"],
					[8, 1],
					[7, [0, 1]]
				]],
				[-1, cr.system_object.prototype.cnds.CompareVar, null, 0, false, false, false, 0xfa47b5ba78089, false, [
					[11, "Lives"],
					[8, 2],
					[7, [0, 2]]
				]]
			],
				[
					[-1, cr.system_object.prototype.acts.CreateObject, null, 796941462357713, false, [
						[4, 23],
						[5, [0, 1]],
						[0, [4, [6, [20, 23, cr.plugins_.Sprite.prototype.exps.Width, false, null],
							[0, 2]
						],
							[19, cr.system_object.prototype.exps.random, [
								[5, [19, cr.system_object.prototype.exps.layoutwidth],
									[6, [20, 23, cr.plugins_.Sprite.prototype.exps.Width, false, null],
										[0, 4]
									]
								]
							]]
						]],
						[0, [4, [19, cr.system_object.prototype.exps.layoutheight],
							[7, [20, 23, cr.plugins_.Sprite.prototype.exps.Width, false, null],
								[0, 2]
							]
						]]
					]],
					[23, cr.behaviors.custom.prototype.acts.SetSpeed, "CustomMovement", 0x5dc8493b23fe7, false, [
						[3, 0],
						[0, [3, [23, "GlobalSpeed"]]]
					]],
					[23, cr.behaviors.custom.prototype.acts.SetAngleOfMotion, "CustomMovement", 7553820718100702, false, [
						[0, [5, [1, -84.375],
							[19, cr.system_object.prototype.exps.random, [
								[1, 11.25]
							]]
						]]
					]],
					[23, cr.plugins_.Sprite.prototype.acts.SetAngle, null, 0x96bffb3a6a41d, false, [
						[0, [19, cr.system_object.prototype.exps.random, [
							[0, 360]
						]]]
					]]
				]
			],
			[0, null, false, null, 8265547815813638, [
				[-1, cr.system_object.prototype.cnds.Every, null, 0, false, false, false, 8123537674051468, false, [
					[0, [4, [0, 20],
						[19, cr.system_object.prototype.exps.random, [
							[0, 20]
						]]
					]]
				]],
				[-1, cr.system_object.prototype.cnds.CompareVar, null, 0, false, false, false, 0x78d338a203ef0, false, [
					[11, "GameIsPaused"],
					[8, 1],
					[7, [0, 1]]
				]]
			],
				[
					[-1, cr.system_object.prototype.acts.CreateObject, null, 5608397315525246, false, [
						[4, 25],
						[5, [0, 1]],
						[0, [4, [6, [20, 25, cr.plugins_.Sprite.prototype.exps.Width, false, null],
							[0, 2]
						],
							[19, cr.system_object.prototype.exps.random, [
								[5, [19, cr.system_object.prototype.exps.layoutwidth],
									[6, [20, 25, cr.plugins_.Sprite.prototype.exps.Width, false, null],
										[0, 4]
									]
								]
							]]
						]],
						[0, [4, [19, cr.system_object.prototype.exps.layoutheight],
							[7, [20, 25, cr.plugins_.Sprite.prototype.exps.Width, false, null],
								[0, 2]
							]
						]]
					]],
					[25, cr.behaviors.custom.prototype.acts.SetSpeed, "CustomMovement", 6348895249535183, false, [
						[3, 0],
						[0, [3, [23, "GlobalSpeed"]]]
					]],
					[25, cr.behaviors.custom.prototype.acts.SetAngleOfMotion, "CustomMovement", 0x6c6ec4417a193, false, [
						[0, [5, [1, -84.375],
							[19, cr.system_object.prototype.exps.random, [
								[1, 11.25]
							]]
						]]
					]],
					[25, cr.plugins_.Sprite.prototype.acts.SetAngle, null, 0x783f65624c83a, false, [
						[0, [19, cr.system_object.prototype.exps.random, [
							[0, 360]
						]]]
					]]
				]
			],
			[0, null, false, null, 6383413249098096, [
				[-1, cr.system_object.prototype.cnds.EveryTick, null, 0, false, false, false, 5161049479181053, false]
			],
				[],
				[
					[0, null, false, null, 625864607214491, [
						[-1, cr.system_object.prototype.cnds.CompareVar, null, 0, false, false, false, 9916823000494700, false, [
							[11, "GameIsPaused"],
							[8, 1],
							[7, [0, 1]]
						]]
					],
						[
							[56, cr.behaviors.custom.prototype.acts.Accelerate, "CustomMovement2", 0xe778f03fe515e, false, [
								[3, 2],
								[0, [23, "GlobalSpeed"]]
							]]
						],
						[
							[0, null, false, null, 9455719517875960, [
								[-1, cr.system_object.prototype.cnds.CompareVar, null, 0, false, false, false, 5446070398976693, false, [
									[11, "CuttedAtRaw"],
									[8, 1],
									[7, [0, 0]]
								]]
							],
								[
									[-1, cr.system_object.prototype.acts.AddVar, null, 7314129080302319, false, [
										[11, "ElapsedSinceLastCut"],
										[7, [0, 1]]
									]]
								]
							],
							[0, null, false, null, 8259834515006519, [
								[-1, cr.system_object.prototype.cnds.CompareVar, null, 0, false, false, false, 0x67df6160ffc2, false, [
									[11, "CandyFontainIsActive"],
									[8, 0],
									[7, [0, 1]]
								]]
							],
								[
									[-1, cr.system_object.prototype.acts.AddVar, null, 881967108254761, false, [
										[11, "CandyFontainIsActiveFor"],
										[7, [0, 1]]
									]]
								]
							]
						]
					]
				]
			],
			[0, null, false, null, 6030020678628314, [
				[-1, cr.system_object.prototype.cnds.CompareVar, null, 0, false, false, false, 5716113288013841, false, [
					[11, "GameIsPaused"],
					[8, 1],
					[7, [0, 1]]
				]],
				[-1, cr.system_object.prototype.cnds.CompareVar, null, 0, false, false, false, 7002701125321502, false, [
					[11, "SlomoIsActive"],
					[8, 1],
					[7, [0, 1]]
				]]
			],
				[],
				[
					[0, null, false, null, 0x6fc375ebfffe7, [
						[-1, cr.system_object.prototype.cnds.CompareVar, null, 0, false, false, false, 0x8f223d4a0b43e, false, [
							[11, "CuttedAtRaw"],
							[8, 0],
							[7, [0, 0]]
						]]
					],
						[
							[-1, cr.system_object.prototype.acts.SetVar, null, 9123458658406860, false, [
								[11, "ElapsedSinceLastCut"],
								[7, [0, 0]]
							]]
						]
					],
					[0, null, false, null, 8493127079863287, [
						[47, cr.plugins_.Sprite.prototype.cnds.IsOverlapping, null, 0, false, false, false, 0x92153db54b519, false, [
							[4, 22]
						]],
						[47, cr.plugins_.Sprite.prototype.cnds.CompareWidth, null, 0, false, false, false, 8413115577728431, false, [
							[8, 5],
							[0, [7, [20, 22, cr.plugins_.Sprite.prototype.exps.Width, false, null],
								[0, 4]
							]]
						]]
					],
						[
							[22, cr.plugins_.Sprite.prototype.acts.Destroy, null, 4650146375872332, false],
							[22, cr.plugins_.Sprite.prototype.acts.Spawn, null, 8871154823538056, false, [
								[4, 18],
								[5, [0, 1]],
								[7, [0, 0]]
							]],
							[18, cr.behaviors.custom.prototype.acts.SetSpeed, "CustomMovement2", 0xfa772c6108ba2, false, [
								[3, 0],
								[0, [20, 47, cr.plugins_.Sprite.prototype.exps.Width, false, null]]
							]],
							[18, cr.behaviors.custom.prototype.acts.SetAngleOfMotion, "CustomMovement2", 0x7c10d0935a628, false, [
								[0, [4, [20, 47, cr.plugins_.Sprite.prototype.exps.Angle, false, null],
									[0, 90]
								]]
							]],
							[18, cr.plugins_.Sprite.prototype.acts.SetAngle, null, 4605857607331691, false, [
								[0, [5, [20, 47, cr.plugins_.Sprite.prototype.exps.Angle, false, null],
									[0, 90]
								]]
							]],
							[22, cr.plugins_.Sprite.prototype.acts.Spawn, null, 8785235951963116, false, [
								[4, 18],
								[5, [0, 1]],
								[7, [0, 0]]
							]],
							[18, cr.behaviors.custom.prototype.acts.SetSpeed, "CustomMovement2", 6512237293391449, false, [
								[3, 0],
								[0, [20, 47, cr.plugins_.Sprite.prototype.exps.Width, false, null]]
							]],
							[18, cr.behaviors.custom.prototype.acts.SetAngleOfMotion, "CustomMovement2", 5853196692798881, false, [
								[0, [5, [20, 47, cr.plugins_.Sprite.prototype.exps.Angle, false, null],
									[0, 90]
								]]
							]],
							[18, cr.plugins_.Sprite.prototype.acts.SetAngle, null, 5284441509140536, false, [
								[0, [4, [20, 47, cr.plugins_.Sprite.prototype.exps.Angle, false, null],
									[0, 90]
								]]
							]],
							[22, cr.plugins_.Sprite.prototype.acts.Spawn, null, 5993314721996034, false, [
								[4, 46],
								[5, [0, 0]],
								[7, [0, 0]]
							]],
							[46, cr.plugins_.Sprite.prototype.acts.SetSize, null, 7160971352198904, false, [
								[0, [6, [20, 47, cr.plugins_.Sprite.prototype.exps.Width, false, null],
									[0, 2]
								]],
								[0, [6, [20, 47, cr.plugins_.Sprite.prototype.exps.Width, false, null],
									[0, 2]
								]]
							]],
							[-1, cr.system_object.prototype.acts.AddVar, null, 0xa74b41ded5ed9, false, [
								[11, "Candies_Amount"],
								[7, [0, 1]]
							]],
							[22, cr.plugins_.Sprite.prototype.acts.Spawn, null, 5485534844886808, false, [
								[4, 32],
								[5, [0, 2]],
								[7, [0, 0]]
							]],
							[-1, cr.system_object.prototype.acts.AddVar, null, 0xc5672bebc59e, false, [
								[11, "Score"],
								[7, [0, 10]]
							]],
							[-1, cr.system_object.prototype.acts.AddVar, null, 7758672500430726, false, [
								[11, "CuttedAtRaw"],
								[7, [0, 1]]
							]]
						],
						[
							[0, null, false, null, 8917449329140815, [
								[-1, cr.system_object.prototype.cnds.CompareVar, null, 0, false, false, false, 0xeb4a29488296a, false, [
									[11, "LANG"],
									[8, 0],
									[7, [2, "es"]]
								]]
							],
								[
									[53, cr.plugins_.Spritefont2.prototype.acts.SetText, null, 4572167185885337, false, [
										[7, [10, [2, "PUNTAJE:"],
											[23, "Score"]
										]]
									]]
								]
							],
							[0, null, false, null, 4961199132868215, [
								[-1, cr.system_object.prototype.cnds.Else, null, 0, false, false, false, 0x8066db44eb463, false]
							],
								[
									[53, cr.plugins_.Spritefont2.prototype.acts.SetText, null, 0xe20e72a4fcc63, false, [
										[7, [10, [2, "     "],
											[23, "Score"]
										]]
									]]
								]
							]
						]
					],
					[0, null, false, null, 4760227365194652, [
						[47, cr.plugins_.Sprite.prototype.cnds.IsOverlapping, null, 0, false, false, false, 8387187860555, false, [
							[4, 21]
						]],
						[47, cr.plugins_.Sprite.prototype.cnds.CompareWidth, null, 0, false, false, false, 6465583165187032, false, [
							[8, 5],
							[0, [7, [20, 21, cr.plugins_.Sprite.prototype.exps.Width, false, null],
								[0, 4]
							]]
						]]
					],
						[
							[21, cr.plugins_.Sprite.prototype.acts.Destroy, null, 8740781175105327, false],
							[21, cr.plugins_.Sprite.prototype.acts.Spawn, null, 0x7b5b732771155, false, [
								[4, 17],
								[5, [0, 1]],
								[7, [0, 0]]
							]],
							[17, cr.behaviors.custom.prototype.acts.SetSpeed, "CustomMovement2", 7716282529865578, false, [
								[3, 0],
								[0, [20, 47, cr.plugins_.Sprite.prototype.exps.Width, false, null]]
							]],
							[17, cr.behaviors.custom.prototype.acts.SetAngleOfMotion, "CustomMovement2", 0x4455392c97ebc, false, [
								[0, [4, [20, 47, cr.plugins_.Sprite.prototype.exps.Angle, false, null],
									[0, 90]
								]]
							]],
							[17, cr.plugins_.Sprite.prototype.acts.SetAngle, null, 6097912708635622, false, [
								[0, [5, [20, 47, cr.plugins_.Sprite.prototype.exps.Angle, false, null],
									[0, 90]
								]]
							]],
							[21, cr.plugins_.Sprite.prototype.acts.Spawn, null, 0xe59876b2d6c09, false, [
								[4, 17],
								[5, [0, 1]],
								[7, [0, 0]]
							]],
							[17, cr.behaviors.custom.prototype.acts.SetSpeed, "CustomMovement2", 6832124705304942, false, [
								[3, 0],
								[0, [20, 47, cr.plugins_.Sprite.prototype.exps.Width, false, null]]
							]],
							[17, cr.behaviors.custom.prototype.acts.SetAngleOfMotion, "CustomMovement2", 9353905332356404, false, [
								[0, [5, [20, 47, cr.plugins_.Sprite.prototype.exps.Angle, false, null],
									[0, 90]
								]]
							]],
							[17, cr.plugins_.Sprite.prototype.acts.SetAngle, null, 655893297677597, false, [
								[0, [4, [20, 47, cr.plugins_.Sprite.prototype.exps.Angle, false, null],
									[0, 90]
								]]
							]],
							[21, cr.plugins_.Sprite.prototype.acts.Spawn, null, 4861522999075538, false, [
								[4, 46],
								[5, [0, 0]],
								[7, [0, 0]]
							]],
							[46, cr.plugins_.Sprite.prototype.acts.SetSize, null, 7945951529558972, false, [
								[0, [6, [20, 47, cr.plugins_.Sprite.prototype.exps.Width, false, null],
									[0, 2]
								]],
								[0, [6, [20, 47, cr.plugins_.Sprite.prototype.exps.Width, false, null],
									[0, 2]
								]]
							]],
							[-1, cr.system_object.prototype.acts.AddVar, null, 0x60c1c0c04494c, false, [
								[11, "Candies_Amount"],
								[7, [0, 1]]
							]],
							[21, cr.plugins_.Sprite.prototype.acts.Spawn, null, 6820504629535748, false, [
								[4, 33],
								[5, [0, 2]],
								[7, [0, 0]]
							]],
							[-1, cr.system_object.prototype.acts.AddVar, null, 6391725048986914, false, [
								[11, "Score"],
								[7, [0, 30]]
							]],
							[-1, cr.system_object.prototype.acts.AddVar, null, 8092292425733989, false, [
								[11, "CuttedAtRaw"],
								[7, [0, 1]]
							]]
						],
						[
							[0, null, false, null, 0x656e5ea9c491e, [
								[-1, cr.system_object.prototype.cnds.CompareVar, null, 0, false, false, false, 8776229217417637, false, [
									[11, "LANG"],
									[8, 0],
									[7, [2, "es"]]
								]]
							],
								[
									[53, cr.plugins_.Spritefont2.prototype.acts.SetText, null, 5235158398981018, false, [
										[7, [10, [2, "PUNTAJE:"],
											[23, "Score"]
										]]
									]]
								]
							],
							[0, null, false, null, 7623042934416609, [
								[-1, cr.system_object.prototype.cnds.Else, null, 0, false, false, false, 0x7d22b8aa96b76, false]
							],
								[
									[53, cr.plugins_.Spritefont2.prototype.acts.SetText, null, 4674972780462739, false, [
										[7, [10, [2, "     "],
											[23, "Score"]
										]]
									]]
								]
							]
						]
					],
					[0, null, false, null, 8347401128079996, [
						[47, cr.plugins_.Sprite.prototype.cnds.IsOverlapping, null, 0, false, false, false, 8047327168135777, false, [
							[4, 20]
						]],
						[47, cr.plugins_.Sprite.prototype.cnds.CompareWidth, null, 0, false, false, false, 8683133686858099, false, [
							[8, 5],
							[0, [7, [20, 20, cr.plugins_.Sprite.prototype.exps.Width, false, null],
								[0, 4]
							]]
						]]
					],
						[
							[20, cr.plugins_.Sprite.prototype.acts.Destroy, null, 8680693240130441, false],
							[20, cr.plugins_.Sprite.prototype.acts.Spawn, null, 4760268332244369, false, [
								[4, 19],
								[5, [0, 1]],
								[7, [0, 0]]
							]],
							[19, cr.behaviors.custom.prototype.acts.SetSpeed, "CustomMovement2", 4743491573804287, false, [
								[3, 0],
								[0, [20, 47, cr.plugins_.Sprite.prototype.exps.Width, false, null]]
							]],
							[19, cr.behaviors.custom.prototype.acts.SetAngleOfMotion, "CustomMovement2", 0x599569b6961d8, false, [
								[0, [4, [20, 47, cr.plugins_.Sprite.prototype.exps.Angle, false, null],
									[0, 90]
								]]
							]],
							[19, cr.plugins_.Sprite.prototype.acts.SetAngle, null, 0xd53e657831756, false, [
								[0, [5, [20, 47, cr.plugins_.Sprite.prototype.exps.Angle, false, null],
									[0, 90]
								]]
							]],
							[20, cr.plugins_.Sprite.prototype.acts.Spawn, null, 0xbae7328698244, false, [
								[4, 19],
								[5, [0, 1]],
								[7, [0, 0]]
							]],
							[19, cr.behaviors.custom.prototype.acts.SetSpeed, "CustomMovement2", 0x96693ee8ce256, false, [
								[3, 0],
								[0, [20, 47, cr.plugins_.Sprite.prototype.exps.Width, false, null]]
							]],
							[19, cr.behaviors.custom.prototype.acts.SetAngleOfMotion, "CustomMovement2", 748726927692113, false, [
								[0, [5, [20, 47, cr.plugins_.Sprite.prototype.exps.Angle, false, null],
									[0, 90]
								]]
							]],
							[19, cr.plugins_.Sprite.prototype.acts.SetAngle, null, 5717916157626853, false, [
								[0, [4, [20, 47, cr.plugins_.Sprite.prototype.exps.Angle, false, null],
									[0, 90]
								]]
							]],
							[20, cr.plugins_.Sprite.prototype.acts.Spawn, null, 0x9eb809d1b0372, false, [
								[4, 46],
								[5, [0, 0]],
								[7, [0, 0]]
							]],
							[46, cr.plugins_.Sprite.prototype.acts.SetSize, null, 0xbdbef0781a99f, false, [
								[0, [6, [20, 47, cr.plugins_.Sprite.prototype.exps.Width, false, null],
									[0, 2]
								]],
								[0, [6, [20, 47, cr.plugins_.Sprite.prototype.exps.Width, false, null],
									[0, 2]
								]]
							]],
							[-1, cr.system_object.prototype.acts.AddVar, null, 7213889005725447, false, [
								[11, "Candies_Amount"],
								[7, [0, 1]]
							]],
							[20, cr.plugins_.Sprite.prototype.acts.Spawn, null, 0xd9eabb92ea42a, false, [
								[4, 36],
								[5, [0, 2]],
								[7, [0, 0]]
							]],
							[-1, cr.system_object.prototype.acts.AddVar, null, 8082879853677376, false, [
								[11, "Score"],
								[7, [0, 50]]
							]],
							[-1, cr.system_object.prototype.acts.AddVar, null, 9071133409929528, false, [
								[11, "CuttedAtRaw"],
								[7, [0, 1]]
							]]
						],
						[
							[0, null, false, null, 0x82e9f8b924f34, [
								[-1, cr.system_object.prototype.cnds.CompareVar, null, 0, false, false, false, 7443089340077125, false, [
									[11, "LANG"],
									[8, 0],
									[7, [2, "es"]]
								]]
							],
								[
									[53, cr.plugins_.Spritefont2.prototype.acts.SetText, null, 8046492840883409, false, [
										[7, [10, [2, "PUNTAJE:"],
											[23, "Score"]
										]]
									]]
								]
							],
							[0, null, false, null, 0xdc7dcd0364aaf, [
								[-1, cr.system_object.prototype.cnds.Else, null, 0, false, false, false, 653394628917152, false]
							],
								[
									[53, cr.plugins_.Spritefont2.prototype.acts.SetText, null, 0xfcec6a86954cd, false, [
										[7, [10, [2, "     "],
											[23, "Score"]
										]]
									]]
								]
							]
						]
					]
				]
			],
			[0, null, true, null, 6080818693841965, [
				[29, cr.plugins_.Mouse.prototype.cnds.OnRelease, null, 1, false, false, false, 8559412079228267, false, [
					[3, 0]
				]],
				[-1, cr.system_object.prototype.cnds.CompareVar, null, 0, false, false, false, 0x69fecdcec424f, false, [
					[11, "ElapsedSinceLastCut"],
					[8, 4],
					[7, [0, 20]]
				]],
				[30, cr.plugins_.Touch.prototype.cnds.OnTouchEnd, null, 1, false, false, false, 0xb1512f14ad3e7, false]
			],
				[],
				[
					[0, null, false, null, 8541465445627343, [
						[-1, cr.system_object.prototype.cnds.CompareVar, null, 0, false, false, false, 6214401596773964, false, [
							[11, "CuttedAtRaw"],
							[8, 4],
							[7, [0, 2]]
						]]
					],
						[
							[62, cr.plugins_.Sprite.prototype.acts.Destroy, null, 0x682f8da6353e5, false]
						],
						[
							[0, null, false, null, 5823350887302462, [
								[-1, cr.system_object.prototype.cnds.CompareVar, null, 0, false, false, false, 0xa306bfdf6a10f, false, [
									[11, "CuttedAtRaw"],
									[8, 0],
									[7, [0, 3]]
								]]
							],
								[
									[-1, cr.system_object.prototype.acts.CreateObject, null, 8185334619146284, false, [
										[4, 34],
										[5, [0, 2]],
										[0, [7, [19, cr.system_object.prototype.exps.layoutwidth],
											[0, 2]
										]],
										[0, [7, [19, cr.system_object.prototype.exps.layoutheight],
											[0, 2]
										]]
									]],
									[-1, cr.system_object.prototype.acts.AddVar, null, 0xe1b63cc417118, false, [
										[11, "Score"],
										[7, [0, 30]]
									]],
									[-1, cr.system_object.prototype.acts.SetVar, null, 7938495860764223, false, [
										[11, "ElapsedSinceLastCut"],
										[7, [0, 0]]
									]],
									[-1, cr.system_object.prototype.acts.SetVar, null, 6413250676086552, false, [
										[11, "MouseBeenReleaseSinceLastCut"],
										[7, [0, 0]]
									]],
									[-1, cr.system_object.prototype.acts.SetVar, null, 651350986694386, false, [
										[11, "CuttedAtRaw"],
										[7, [0, 0]]
									]]
								],
								[
									[0, null, false, null, 5783763481490649, [
										[-1, cr.system_object.prototype.cnds.CompareVar, null, 0, false, false, false, 0xd9bdfb9872679, false, [
											[11, "LANG"],
											[8, 0],
											[7, [2, "en"]]
										]]
									],
										[
											[53, cr.plugins_.Spritefont2.prototype.acts.SetText, null, 8824638699154988, false, [
												[7, [10, [2, "     "],
													[23, "Score"]
												]]
											]]
										]
									],
									[0, null, false, null, 7601738940358797, [
										[-1, cr.system_object.prototype.cnds.Else, null, 0, false, false, false, 982470320388523, false]
									],
										[
											[53, cr.plugins_.Spritefont2.prototype.acts.SetText, null, 8647667191187012, false, [
												[7, [10, [2, "PUNTAJE:"],
													[23, "Score"]
												]]
											]]
										]
									]
								]
							],
							[0, null, false, null, 6592376484444267, [
								[-1, cr.system_object.prototype.cnds.CompareVar, null, 0, false, false, false, 6732178774229566, false, [
									[11, "CuttedAtRaw"],
									[8, 0],
									[7, [0, 4]]
								]]
							],
								[
									[-1, cr.system_object.prototype.acts.CreateObject, null, 7439393669589158, false, [
										[4, 35],
										[5, [0, 2]],
										[0, [7, [19, cr.system_object.prototype.exps.layoutwidth],
											[0, 2]
										]],
										[0, [7, [19, cr.system_object.prototype.exps.layoutheight],
											[0, 2]
										]]
									]],
									[-1, cr.system_object.prototype.acts.AddVar, null, 6693895834208048, false, [
										[11, "Score"],
										[7, [0, 40]]
									]],
									[-1, cr.system_object.prototype.acts.SetVar, null, 0xd2cac4c9ea498, false, [
										[11, "ElapsedSinceLastCut"],
										[7, [0, 0]]
									]],
									[-1, cr.system_object.prototype.acts.SetVar, null, 9678049925105540, false, [
										[11, "MouseBeenReleaseSinceLastCut"],
										[7, [0, 0]]
									]],
									[-1, cr.system_object.prototype.acts.SetVar, null, 9592563698270784, false, [
										[11, "CuttedAtRaw"],
										[7, [0, 0]]
									]]
								],
								[
									[0, null, false, null, 7322803436282442, [
										[-1, cr.system_object.prototype.cnds.CompareVar, null, 0, false, false, false, 0xb5ed4f3da71ce, false, [
											[11, "LANG"],
											[8, 0],
											[7, [2, "es"]]
										]]
									],
										[
											[53, cr.plugins_.Spritefont2.prototype.acts.SetText, null, 9857038563030242, false, [
												[7, [10, [2, "PUNTAJE:"],
													[23, "Score"]
												]]
											]]
										]
									],
									[0, null, false, null, 8423693208518711, [
										[-1, cr.system_object.prototype.cnds.Else, null, 0, false, false, false, 0xc24726e804d5f, false]
									],
										[
											[53, cr.plugins_.Spritefont2.prototype.acts.SetText, null, 0x662d43b359b04, false, [
												[7, [10, [2, "     "],
													[23, "Score"]
												]]
											]]
										]
									]
								]
							],
							[0, null, false, null, 0xc00ba24708f20, [
								[-1, cr.system_object.prototype.cnds.CompareVar, null, 0, false, false, false, 8672819983754613, false, [
									[11, "CuttedAtRaw"],
									[8, 0],
									[7, [0, 5]]
								]]
							],
								[
									[-1, cr.system_object.prototype.acts.CreateObject, null, 4509619447018252, false, [
										[4, 37],
										[5, [0, 2]],
										[0, [7, [19, cr.system_object.prototype.exps.layoutwidth],
											[0, 2]
										]],
										[0, [7, [19, cr.system_object.prototype.exps.layoutheight],
											[0, 2]
										]]
									]],
									[-1, cr.system_object.prototype.acts.AddVar, null, 4507112079150583, false, [
										[11, "Score"],
										[7, [0, 50]]
									]],
									[-1, cr.system_object.prototype.acts.SetVar, null, 8862729295659629, false, [
										[11, "ElapsedSinceLastCut"],
										[7, [0, 0]]
									]],
									[-1, cr.system_object.prototype.acts.SetVar, null, 6853232246662692, false, [
										[11, "MouseBeenReleaseSinceLastCut"],
										[7, [0, 0]]
									]],
									[-1, cr.system_object.prototype.acts.SetVar, null, 7929038798878766, false, [
										[11, "CuttedAtRaw"],
										[7, [0, 0]]
									]]
								],
								[
									[0, null, false, null, 0xad67364b186c4, [
										[-1, cr.system_object.prototype.cnds.CompareVar, null, 0, false, false, false, 7527985602434372, false, [
											[11, "LANG"],
											[8, 0],
											[7, [2, "en"]]
										]]
									],
										[
											[53, cr.plugins_.Spritefont2.prototype.acts.SetText, null, 7948289187562602, false, [
												[7, [10, [2, "     "],
													[23, "Score"]
												]]
											]]
										]
									],
									[0, null, false, null, 0x4be1d28d8e97a, [
										[-1, cr.system_object.prototype.cnds.Else, null, 0, false, false, false, 6470691792682331, false]
									],
										[
											[53, cr.plugins_.Spritefont2.prototype.acts.SetText, null, 4852314307202568, false, [
												[7, [10, [2, "PUNTAJE:"],
													[23, "Score"]
												]]
											]]
										]
									]
								]
							],
							[0, null, false, null, 8346247803789636, [
								[-1, cr.system_object.prototype.cnds.CompareVar, null, 0, false, false, false, 9610429944826140, false, [
									[11, "CuttedAtRaw"],
									[8, 4],
									[7, [0, 5]]
								]]
							],
								[
									[-1, cr.system_object.prototype.acts.CreateObject, null, 429899012368231, false, [
										[4, 39],
										[5, [0, 2]],
										[0, [7, [19, cr.system_object.prototype.exps.layoutwidth],
											[0, 2]
										]],
										[0, [7, [19, cr.system_object.prototype.exps.layoutheight],
											[0, 2]
										]]
									]],
									[-1, cr.system_object.prototype.acts.AddVar, null, 0xd2df8bd901517, false, [
										[11, "Score"],
										[7, [0, 100]]
									]],
									[-1, cr.system_object.prototype.acts.SetVar, null, 6585280724333992, false, [
										[11, "ElapsedSinceLastCut"],
										[7, [0, 0]]
									]],
									[-1, cr.system_object.prototype.acts.SetVar, null, 9403566578144688, false, [
										[11, "MouseBeenReleaseSinceLastCut"],
										[7, [0, 0]]
									]],
									[-1, cr.system_object.prototype.acts.SetVar, null, 7774165251762663, false, [
										[11, "CuttedAtRaw"],
										[7, [0, 0]]
									]]
								],
								[
									[0, null, false, null, 0xc27c57a329642, [
										[-1, cr.system_object.prototype.cnds.CompareVar, null, 0, false, false, false, 0x646145cabe652, false, [
											[11, "LANG"],
											[8, 0],
											[7, [2, "es"]]
										]]
									],
										[
											[39, cr.plugins_.Sprite.prototype.acts.SetAnimFrame, null, 4937860509171779, false, [
												[0, [0, 1]]
											]],
											[39, cr.plugins_.Sprite.prototype.acts.StopAnim, null, 7979733321069636, false],
											[53, cr.plugins_.Spritefont2.prototype.acts.SetText, null, 732317037949513, false, [
												[7, [10, [2, "PUNTAJE:"],
													[23, "Score"]
												]]
											]]
										]
									],
									[0, null, false, null, 4884380804361563, [
										[-1, cr.system_object.prototype.cnds.Else, null, 0, false, false, false, 0xba1897acddcec, false]
									],
										[
											[39, cr.plugins_.Sprite.prototype.acts.SetAnimFrame, null, 324537398061168, false, [
												[0, [0, 0]]
											]],
											[39, cr.plugins_.Sprite.prototype.acts.StopAnim, null, 9575381994614832, false],
											[53, cr.plugins_.Spritefont2.prototype.acts.SetText, null, 6157889859035316, false, [
												[7, [10, [2, "     "],
													[23, "Score"]
												]]
											]]
										]
									]
								]
							]
						]
					],
					[0, null, false, null, 0xc1f6847ffa2dd, [
						[-1, cr.system_object.prototype.cnds.Else, null, 0, false, false, false, 0xb90065674559f, false]
					],
						[
							[-1, cr.system_object.prototype.acts.SetVar, null, 8422628010004437, false, [
								[11, "ElapsedSinceLastCut"],
								[7, [0, 0]]
							]],
							[-1, cr.system_object.prototype.acts.SetVar, null, 0xf435aaf56f5e1, false, [
								[11, "MouseBeenReleaseSinceLastCut"],
								[7, [0, 0]]
							]],
							[-1, cr.system_object.prototype.acts.SetVar, null, 0xcce45ae8208ab, false, [
								[11, "CuttedAtRaw"],
								[7, [0, 0]]
							]]
						]
					]
				]
			],
			[0, null, false, null, 5996463625238656, [
				[47, cr.plugins_.Sprite.prototype.cnds.IsOverlapping, null, 0, false, false, false, 5076735141738713, false, [
					[4, 57]
				]],
				[47, cr.plugins_.Sprite.prototype.cnds.CompareWidth, null, 0, false, false, false, 8587842304227216, false, [
					[8, 5],
					[0, [7, [20, 57, cr.plugins_.Sprite.prototype.exps.Width, false, null],
						[0, 2]
					]]
				]],
				[-1, cr.system_object.prototype.cnds.CompareVar, null, 0, false, false, false, 0x4ddbc681ed606, false, [
					[11, "GameIsPaused"],
					[8, 1],
					[7, [0, 1]]
				]],
				[-1, cr.system_object.prototype.cnds.CompareVar, null, 0, false, false, false, 0xef36194daf63d, false, [
					[11, "SlomoIsActive"],
					[8, 1],
					[7, [0, 1]]
				]]
			],
				[
					[57, cr.plugins_.Sprite.prototype.acts.Destroy, null, 0x60c8d47c05b69, false],
					[57, cr.plugins_.Sprite.prototype.acts.Spawn, null, 6118527316936416, false, [
						[4, 16],
						[5, [0, 1]],
						[7, [0, 0]]
					]],
					[16, cr.plugins_.Sprite.prototype.acts.SetAnimSpeed, null, 0x5f9225d34f73e, false, [
						[0, [0, 25]]
					]],
					[16, cr.plugins_.Sprite.prototype.acts.SetAngle, null, 7876454773903579, false, [
						[0, [19, cr.system_object.prototype.exps.random, [
							[0, 360]
						]]]
					]],
					[-1, cr.system_object.prototype.acts.SubVar, null, 8287667579560846, false, [
						[11, "Lives"],
						[7, [0, 1]]
					]]
				],
				[
					[0, null, false, null, 6468099111072039, [
						[-1, cr.system_object.prototype.cnds.CompareVar, null, 0, false, false, false, 0xe55c48c0f1bc2, false, [
							[11, "Lives"],
							[8, 5],
							[7, [0, 0]]
						]]
					],
						[
							[28, cr.plugins_.Sprite.prototype.acts.SetAnimFrame, null, 7215508842746293, false, [
								[0, [23, "Lives"]]
							]]
						]
					]
				]
			],
			[0, null, false, null, 7201721173609944, [
				[47, cr.plugins_.Sprite.prototype.cnds.IsOverlapping, null, 0, false, false, false, 0xf6d48615a1558, false, [
					[4, 23]
				]],
				[47, cr.plugins_.Sprite.prototype.cnds.CompareWidth, null, 0, false, false, false, 0x9ead38af89c50, false, [
					[8, 5],
					[0, [7, [20, 23, cr.plugins_.Sprite.prototype.exps.Width, false, null],
						[0, 8]
					]]
				]],
				[-1, cr.system_object.prototype.cnds.CompareVar, null, 0, false, false, false, 6920352977967678, false, [
					[11, "GameIsPaused"],
					[8, 1],
					[7, [0, 1]]
				]],
				[-1, cr.system_object.prototype.cnds.CompareVar, null, 0, false, false, false, 0xe78f6b43a6cb1, false, [
					[11, "SlomoIsActive"],
					[8, 1],
					[7, [0, 1]]
				]]
			],
				[
					[23, cr.plugins_.Sprite.prototype.acts.Destroy, null, 6752963549167137, false],
					[23, cr.plugins_.Sprite.prototype.acts.Spawn, null, 5822288710094212, false, [
						[4, 24],
						[5, [0, 1]],
						[7, [0, 0]]
					]],
					[24, cr.behaviors.lunarray_LiteTween.prototype.acts.Start, "LiteTween", 0x44c5dfb3ee368, false, [
						[3, 0]
					]],
					[24, cr.behaviors.lunarray_LiteTween.prototype.acts.Start, "LiteTween2", 7686337962420552, false, [
						[3, 0]
					]],
					[24, cr.behaviors.lunarray_LiteTween.prototype.acts.Start, "LiteTween3", 4752632369457006, false, [
						[3, 0]
					]],
					[-1, cr.system_object.prototype.acts.Wait, null, 0x8d24629049b8d, false, [
						[0, [0, 2]]
					]],
					[24, cr.plugins_.Sprite.prototype.acts.Destroy, null, 0x444557911b7d0, false]
				],
				[
					[0, null, false, null, 8625413571961103, [
						[-1, cr.system_object.prototype.cnds.CompareVar, null, 0, false, false, false, 0x3a33b8c04ee74, false, [
							[11, "Lives"],
							[8, 2],
							[7, [0, 2]]
						]]
					],
						[
							[-1, cr.system_object.prototype.acts.AddVar, null, 0x3f1bb01f2e2a5, false, [
								[11, "Lives"],
								[7, [0, 1]]
							]],
							[28, cr.plugins_.Sprite.prototype.acts.SetAnimFrame, null, 593744193509825, false, [
								[0, [23, "Lives"]]
							]]
						]
					]
				]
			],
			[0, null, false, null, 0xc6cb788876ff7, [
				[47, cr.plugins_.Sprite.prototype.cnds.IsOverlapping, null, 0, false, false, false, 0x7df24d4ea8326, false, [
					[4, 25]
				]],
				[47, cr.plugins_.Sprite.prototype.cnds.CompareWidth, null, 0, false, false, false, 0x8522d57f4fa1d, false, [
					[8, 5],
					[0, [7, [20, 25, cr.plugins_.Sprite.prototype.exps.Width, false, null],
						[0, 8]
					]]
				]],
				[-1, cr.system_object.prototype.cnds.CompareVar, null, 0, false, false, false, 0x7ddaf0a0fcc5d, false, [
					[11, "GameIsPaused"],
					[8, 1],
					[7, [0, 1]]
				]],
				[-1, cr.system_object.prototype.cnds.CompareVar, null, 0, false, false, false, 9945201697037760, false, [
					[11, "SlomoIsActive"],
					[8, 1],
					[7, [0, 1]]
				]]
			],
				[
					[25, cr.plugins_.Sprite.prototype.acts.Destroy, null, 6513491906588931, false],
					[25, cr.plugins_.Sprite.prototype.acts.Spawn, null, 0x5c23e9072719d, false, [
						[4, 26],
						[5, [0, 1]],
						[7, [0, 0]]
					]]
				],
				[
					[0, null, false, null, 0xa03e3287503a1, [
						[-1, cr.system_object.prototype.cnds.CompareVar, null, 0, false, false, false, 4873055029171698, false, [
							[11, "CandyFontainIsActive"],
							[8, 0],
							[7, [0, 0]]
						]]
					],
						[
							[-1, cr.system_object.prototype.acts.SetVar, null, 6591445576310618, false, [
								[11, "CandyFontainIsActive"],
								[7, [0, 1]]
							]],
							[-1, cr.system_object.prototype.acts.SetVar, null, 5772371554525446, false, [
								[11, "SpawnCandiesTime"],
								[7, [1, .1]]
							]],
							[-1, cr.system_object.prototype.acts.SetVar, null, 523126012320112, false, [
								[11, "SpawnCandiesTimeRandOffset"],
								[7, [1, .1]]
							]],
							[62, cr.plugins_.Sprite.prototype.acts.Destroy, null, 8271809591340191, false],
							[-1, cr.system_object.prototype.acts.CreateObject, null, 0xe7bb7906ea6f4, false, [
								[4, 38],
								[5, [0, 2]],
								[0, [7, [19, cr.system_object.prototype.exps.layoutwidth],
									[0, 2]
								]],
								[0, [7, [19, cr.system_object.prototype.exps.layoutheight],
									[0, 2]
								]]
							]]
						]
					]
				]
			],
			[0, null, true, null, 6405825839671163, [
				[29, cr.plugins_.Mouse.prototype.cnds.OnRelease, null, 1, false, false, false, 5976957914350759, false, [
					[3, 0]
				]],
				[30, cr.plugins_.Touch.prototype.cnds.OnTouchEnd, null, 1, false, false, false, 0xee3fe5c86fdc2, false]
			],
				[
					[-1, cr.system_object.prototype.acts.SetVar, null, 7532124217750597, false, [
						[11, "MouseBeenReleaseSinceLastCut"],
						[7, [0, 1]]
					]]
				]
			],
			[0, null, false, null, 6496833290878127, [
				[-1, cr.system_object.prototype.cnds.CompareVar, null, 0, false, false, false, 8281996591910145, false, [
					[11, "GameIsPaused"],
					[8, 0],
					[7, [0, 1]]
				]]
			],
				[],
				[
					[0, null, true, null, 7927639622173751, [
						[29, cr.plugins_.Mouse.prototype.cnds.OnObjectClicked, null, 1, false, false, false, 40279358929321, false, [
							[3, 0],
							[3, 0],
							[4, 5]
						]],
						[30, cr.plugins_.Touch.prototype.cnds.OnTouchObject, null, 1, false, false, false, 0x8035e11a82d75, false, [
							[4, 5]
						]]
					],
						[],
						[
							[0, null, false, null, 6384338523563332, [
								[-1, cr.system_object.prototype.cnds.CompareVar, null, 0, false, false, false, 9281946248044072, false, [
									[11, "BestScore"],
									[8, 2],
									[7, [23, "Score"]]
								]]
							],
								[
									[-1, cr.system_object.prototype.acts.SetVar, null, 0x8682413edc4f, false, [
										[11, "BestScore"],
										[7, [23, "Score"]]
									]]
								]
							]
						]
					],
					[0, null, true, null, 9523724846481996, [
						[29, cr.plugins_.Mouse.prototype.cnds.OnObjectClicked, null, 1, false, false, false, 6292997461636642, false, [
							[3, 0],
							[3, 0],
							[4, 5]
						]],
						[30, cr.plugins_.Touch.prototype.cnds.OnTouchObject, null, 1, false, false, false, 0xef05f1ae2e4fe, false, [
							[4, 5]
						]]
					],
						[
							[-1, cr.system_object.prototype.acts.SetVar, null, 0xbf103ad2df4cb, false, [
								[11, "GameIsPaused"],
								[7, [0, 0]]
							]],
							[-1, cr.system_object.prototype.acts.SetVar, null, 6787210906365316, false, [
								[11, "MouseBeenReleaseSinceLastCut"],
								[7, [0, 0]]
							]],
							[-1, cr.system_object.prototype.acts.SetVar, null, 8910326485546273, false, [
								[11, "Candies_Amount"],
								[7, [0, 0]]
							]],
							[-1, cr.system_object.prototype.acts.SetVar, null, 0x7649de7d14f4d, false, [
								[11, "Score"],
								[7, [0, 0]]
							]],
							[-1, cr.system_object.prototype.acts.SetVar, null, 0xf7b060f78bc10, false, [
								[11, "CandyFontainIsActive"],
								[7, [0, 0]]
							]],
							[-1, cr.system_object.prototype.acts.SetVar, null, 7548294045840928, false, [
								[11, "CandyFontainIsActiveFor"],
								[7, [0, 0]]
							]],
							[-1, cr.system_object.prototype.acts.SetTimescale, null, 0xc0072b51b1925, false, [
								[0, [1, 1]]
							]],
							[-1, cr.system_object.prototype.acts.SetVar, null, 0x939d704501820, false, [
								[11, "SlomoIsActive"],
								[7, [0, 0]]
							]],
							[-1, cr.system_object.prototype.acts.SetVar, null, 0xbc70244981c30, false, [
								[11, "BombsSpawnDelayDone"],
								[7, [0, 0]]
							]],
							[-1, cr.system_object.prototype.acts.SetVar, null, 589896454099903, false, [
								[11, "Lives"],
								[7, [0, 2]]
							]],
							[27, cr.plugins_.Sprite.prototype.acts.SetVisible, null, 7617541839998137, false, [
								[3, 1]
							]],
							[2, cr.plugins_.Sprite.prototype.acts.SetVisible, null, 0x4519bea6bdd22, false, [
								[3, 1]
							]],
							[28, cr.plugins_.Sprite.prototype.acts.SetVisible, null, 7339303735138867, false, [
								[3, 1]
							]],
							[28, cr.plugins_.Sprite.prototype.acts.SetAnimFrame, null, 0xc0961985810cb, false, [
								[0, [23, "Lives"]]
							]],
							[3, cr.plugins_.Sprite.prototype.acts.Destroy, null, 8338095477456938, false],
							[5, cr.plugins_.Sprite.prototype.acts.Destroy, null, 9201003743690204, false],
							[4, cr.plugins_.Sprite.prototype.acts.Destroy, null, 8547764379099402, false],
							[47, cr.plugins_.Sprite.prototype.acts.Destroy, null, 8088803127723427, false],
							[46, cr.plugins_.Sprite.prototype.acts.Destroy, null, 0x8c6e46fc97c3, false],
							[56, cr.plugins_.Sprite.prototype.acts.Destroy, null, 0x8fdf0d63a2325, false],
							[61, cr.plugins_.Sprite.prototype.acts.Destroy, null, 878084447261485, false],
							[24, cr.plugins_.Sprite.prototype.acts.Destroy, null, 0xc4c53d87c05d1, false],
							[26, cr.plugins_.Particles.prototype.acts.Destroy, null, 624576331633458, false],
							[10, cr.plugins_.Sprite.prototype.acts.Destroy, null, 0xf263599d38360, false],
							[12, cr.plugins_.Sprite.prototype.acts.Destroy, null, 6288097401018803, false],
							[53, cr.plugins_.Spritefont2.prototype.acts.SetVisible, null, 0x60fbb2167829f, false, [
								[3, 1]
							]],
							[52, cr.plugins_.Spritefont2.prototype.acts.SetVisible, null, 6667596144226839, false, [
								[3, 1]
							]],
							[50, cr.plugins_.Spritefont2.prototype.acts.Destroy, null, 0xbc23124ad163a, false],
							[51, cr.plugins_.Spritefont2.prototype.acts.Destroy, null, 0xbd993175b213e, false],
							[-1, cr.system_object.prototype.acts.CreateObject, null, 5701083006875338, false, [
								[4, 13],
								[5, [0, 4]],
								[0, [0, 0]],
								[0, [0, 0]]
							]],
							[13, cr.plugins_.Sprite.prototype.acts.SetOpacity, null, 0xee980366afa42, false, [
								[0, [0, 0]]
							]],
							[13, cr.behaviors.lunarray_LiteTween.prototype.acts.Start, "start", 0xb95bf93d25f2d, false, [
								[3, 0]
							]],
							[-1, cr.system_object.prototype.acts.Wait, null, 8000820260313573, false, [
								[0, [1, .3]]
							]]
						],
						[
							[0, null, false, null, 0xfa1cedce8d596, [
								[-1, cr.system_object.prototype.cnds.CompareVar, null, 0, false, false, false, 5859308351895978, false, [
									[11, "LANG"],
									[8, 0],
									[7, [2, "es"]]
								]]
							],
								[
									[53, cr.plugins_.Spritefont2.prototype.acts.SetText, null, 8214875765164281, false, [
										[7, [10, [2, "PUNTAJE:"],
											[23, "Score"]
										]]
									]],
									[52, cr.plugins_.Spritefont2.prototype.acts.SetText, null, 0xd78a0053c5b15, false, [
										[7, [10, [2, "MEJOR:"],
											[23, "BestScore"]
										]]
									]]
								]
							],
							[0, null, false, null, 0x9dda64ac71772, [
								[-1, cr.system_object.prototype.cnds.Else, null, 0, false, false, false, 0x86e7146735ad7, false]
							],
								[
									[53, cr.plugins_.Spritefont2.prototype.acts.SetText, null, 0xbae54832ad041, false, [
										[7, [10, [2, "     "],
											[23, "Score"]
										]]
									]],
									[52, cr.plugins_.Spritefont2.prototype.acts.SetText, null, 0x42db38a887190, false, [
										[7, [10, [2, "BEST:"],
											[23, "BestScore"]
										]]
									]]
								]
							],
							[0, null, false, null, 0xb6112c93880df, [],
								[
									[13, cr.behaviors.lunarray_LiteTween.prototype.acts.Start, "stop", 0xd58a4470ccd6, false, [
										[3, 0]
									]],
									[-1, cr.system_object.prototype.acts.Wait, null, 6390269172949222, false, [
										[0, [1, .3]]
									]],
									[13, cr.plugins_.Sprite.prototype.acts.Destroy, null, 8924053971660529, false]
								]
							]
						]
					]
				]
			],
			[0, null, false, null, 0x9b980fac4198, [
				[56, cr.plugins_.Sprite.prototype.cnds.CompareY, null, 0, false, false, false, 0x46ddeb6f2b297, false, [
					[8, 4],
					[0, [4, [19, cr.system_object.prototype.exps.layoutheight],
						[6, [20, 56, cr.plugins_.Sprite.prototype.exps.Width, false, null],
							[0, 3]
						]
					]]
				]]
			],
				[
					[56, cr.plugins_.Sprite.prototype.acts.Destroy, null, 0x8b6ee4432fba0, false]
				]
			],
			[0, null, false, null, 5003848556370103, [
				[-1, cr.system_object.prototype.cnds.CompareVar, null, 0, false, false, false, 541729022589367, false, [
					[11, "Lives"],
					[8, 2],
					[7, [0, 0]]
				]],
				[-1, cr.system_object.prototype.cnds.CompareVar, null, 0, false, false, false, 0x84366732b8a5e, false, [
					[11, "GameIsPaused"],
					[8, 0],
					[7, [0, 0]]
				]],
				[-1, cr.system_object.prototype.cnds.CompareVar, null, 0, false, false, false, 5052450517383688, false, [
					[11, "SlomoIsActive"],
					[8, 0],
					[7, [0, 0]]
				]]
			],
				[
					[55, cr.plugins_.Browser.prototype.acts.ExecJs, null, 8773714266864497, false, [
						[1, [2, "window.c2_level = 0"]]
					]],
					[55, cr.plugins_.Browser.prototype.acts.ExecJs, null, 522830245742878, false, [
						[1, [10, [10, [2, "window.c2_score="],
							[23, "Score"]
						],
							[2, ""]
						]]
					]],
					[48, cr.plugins_.Softgames.prototype.acts.gameOver, null, 5110249338674038, false],
					[28, cr.plugins_.Sprite.prototype.acts.SetVisible, null, 6011242799732131, false, [
						[3, 0]
					]],
					[-1, cr.system_object.prototype.acts.SetVar, null, 770605679585685, false, [
						[11, "SlomoIsActive"],
						[7, [0, 1]]
					]],
					[-1, cr.system_object.prototype.acts.SetTimescale, null, 8824445748543782, false, [
						[0, [1, .5]]
					]],
					[-1, cr.system_object.prototype.acts.Wait, null, 0xdfa44b544ded8, false, [
						[0, [0, 1]]
					]],
					[-1, cr.system_object.prototype.acts.SetTimescale, null, 77428706961359, false, [
						[0, [0, 1]]
					]],
					[-1, cr.system_object.prototype.acts.Wait, null, 9698944552338880, false, [
						[0, [0, 1]]
					]],
					[-1, cr.system_object.prototype.acts.SetVar, null, 0xa9aaa52ece9ad, false, [
						[11, "GameIsPaused"],
						[7, [0, 1]]
					]],
					[-1, cr.system_object.prototype.acts.SetVar, null, 4923768814490621, false, [
						[11, "SlomoIsActive"],
						[7, [0, 0]]
					]],
					[-1, cr.system_object.prototype.acts.CreateObject, null, 0x4414cbeae3fb0, false, [
						[4, 13],
						[5, [0, 4]],
						[0, [0, 0]],
						[0, [0, 0]]
					]],
					[13, cr.plugins_.Sprite.prototype.acts.SetOpacity, null, 8081687774340519, false, [
						[0, [0, 0]]
					]],
					[13, cr.behaviors.lunarray_LiteTween.prototype.acts.Start, "start", 5987008171274848, false, [
						[3, 0]
					]],
					[-1, cr.system_object.prototype.acts.Wait, null, 760560107751624, false, [
						[0, [1, .3]]
					]],
					[61, cr.plugins_.Sprite.prototype.acts.Destroy, null, 9574951935332582, false],
					[56, cr.plugins_.Sprite.prototype.acts.Destroy, null, 5807413108808871, false],
					[24, cr.plugins_.Sprite.prototype.acts.Destroy, null, 0xd5908c7088e70, false],
					[26, cr.plugins_.Particles.prototype.acts.Destroy, null, 7739926647257792, false],
					[27, cr.plugins_.Sprite.prototype.acts.SetVisible, null, 0x760dc95ef98a1, false, [
						[3, 0]
					]],
					[2, cr.plugins_.Sprite.prototype.acts.SetVisible, null, 9625648051935414, false, [
						[3, 0]
					]],
					[53, cr.plugins_.Spritefont2.prototype.acts.SetVisible, null, 6990764514731954, false, [
						[3, 0]
					]],
					[52, cr.plugins_.Spritefont2.prototype.acts.SetVisible, null, 516512452758876, false, [
						[3, 0]
					]],
					[-1, cr.system_object.prototype.acts.CreateObject, null, 0xb3fe4fc039ad7, false, [
						[4, 12],
						[5, [0, 3]],
						[0, [0, 0]],
						[0, [0, 0]]
					]],
					[-1, cr.system_object.prototype.acts.CreateObject, null, 0xefc8035ddbe05, false, [
						[4, 5],
						[5, [0, 3]],
						[0, [0, 252]],
						[0, [0, 336]]
					]],
					[-1, cr.system_object.prototype.acts.CreateObject, null, 4892400712814428, false, [
						[4, 3],
						[5, [0, 3]],
						[0, [0, 64]],
						[0, [0, 330]]
					]],
					[-1, cr.system_object.prototype.acts.CreateObject, null, 488147896038764, false, [
						[4, 50],
						[5, [0, 3]],
						[0, [0, 55]],
						[0, [0, 180]]
					]],
					[-1, cr.system_object.prototype.acts.CreateObject, null, 0x39c6c3e6e71a6, false, [
						[4, 51],
						[5, [0, 3]],
						[0, [0, 55]],
						[0, [0, 210]]
					]]
				],
				[
					[0, null, false, null, 0xf8de527d7d1ef, [
						[-1, cr.system_object.prototype.cnds.CompareVar, null, 0, false, false, false, 9927545946162448, false, [
							[11, "LANG"],
							[8, 0],
							[7, [2, "es"]]
						]]
					],
						[
							[12, cr.plugins_.Sprite.prototype.acts.SetAnimFrame, null, 0xa592cd4f0962d, false, [
								[0, [0, 1]]
							]],
							[12, cr.plugins_.Sprite.prototype.acts.StopAnim, null, 0xf99450206a83, false],
							[51, cr.plugins_.Spritefont2.prototype.acts.SetText, null, 5428449903552759, false, [
								[7, [10, [2, "PUNTAJE:"],
									[23, "Score"]
								]]
							]],
							[50, cr.plugins_.Spritefont2.prototype.acts.SetText, null, 4553457772996537, false, [
								[7, [10, [2, "FRUTAS:"],
									[23, "Candies_Amount"]
								]]
							]]
						]
					],
					[0, null, false, null, 0xcfbc4a802ca82, [
						[-1, cr.system_object.prototype.cnds.Else, null, 0, false, false, false, 7604775900745352, false]
					],
						[
							[12, cr.plugins_.Sprite.prototype.acts.SetAnimFrame, null, 9999898491917928, false, [
								[0, [0, 0]]
							]],
							[12, cr.plugins_.Sprite.prototype.acts.StopAnim, null, 5587110823978502, false],
							[51, cr.plugins_.Spritefont2.prototype.acts.SetText, null, 0x77ec3f5982e53, false, [
								[7, [10, [2, "     "],
									[23, "Score"]
								]]
							]],
							[50, cr.plugins_.Spritefont2.prototype.acts.SetText, null, 0xd3f4cb04019a, false, [
								[7, [10, [2, "     "],
									[23, "Candies_Amount"]
								]]
							]]
						]
					],
					[0, null, false, null, 8629838128974253, [],
						[
							[13, cr.behaviors.lunarray_LiteTween.prototype.acts.Start, "stop", 0xba8c4f9e97977, false, [
								[3, 0]
							]],
							[-1, cr.system_object.prototype.acts.Wait, null, 0x7fac33d0e22b3, false, [
								[0, [1, .3]]
							]],
							[13, cr.plugins_.Sprite.prototype.acts.Destroy, null, 6848522201210278, false]
						]
					],
					[0, null, false, null, 0x68438f5d3521d, [
						[-1, cr.system_object.prototype.cnds.CompareVar, null, 0, false, false, false, 8688892054803231, false, [
							[11, "BestScore"],
							[8, 2],
							[7, [23, "Score"]]
						]]
					],
						[
							[-1, cr.system_object.prototype.acts.SetVar, null, 4678367891749245, false, [
								[11, "BestScore"],
								[7, [23, "Score"]]
							]],
							[40, cr.plugins_.Text.prototype.acts.SetText, null, 0x96f97a098ceda, false, [
								[7, [10, [2, "BEST:"],
									[23, "BestScore"]
								]]
							]]
						]
					]
				]
			],
			[0, null, false, null, 0xa865d71896731, [
				[-1, cr.system_object.prototype.cnds.CompareVar, null, 0, false, false, false, 0x662a6562ea833, false, [
					[11, "CandyFontainIsActiveFor"],
					[8, 4],
					[7, [0, 180]]
				]]
			],
				[
					[-1, cr.system_object.prototype.acts.SetVar, null, 0xe9a5d8af191d7, false, [
						[11, "CandyFontainIsActive"],
						[7, [0, 0]]
					]],
					[-1, cr.system_object.prototype.acts.SetVar, null, 0xd85c1436461d8, false, [
						[11, "CandyFontainIsActiveFor"],
						[7, [0, 0]]
					]],
					[-1, cr.system_object.prototype.acts.SetVar, null, 6900889012332763, false, [
						[11, "SpawnCandiesTime"],
						[7, [1, .3]]
					]],
					[-1, cr.system_object.prototype.acts.SetVar, null, 0xf22d14a307193, false, [
						[11, "SpawnCandiesTimeRandOffset"],
						[7, [1, .4]]
					]]
				]
			],
			[0, null, true, null, 5487047525951067, [
				[29, cr.plugins_.Mouse.prototype.cnds.OnObjectClicked, null, 1, false, false, false, 9128310952291382, false, [
					[3, 0],
					[3, 0],
					[4, 2]
				]],
				[30, cr.plugins_.Touch.prototype.cnds.OnTouchObject, null, 1, false, false, false, 0xa270138f2d55a, false, [
					[4, 2]
				]]
			],
				[],
				[
					[0, null, false, null, 0xfb7c71631c6d9, [
						[-1, cr.system_object.prototype.cnds.CompareVar, null, 0, false, false, false, 0xdd7fc44ca2ad9, false, [
							[11, "GameIsPaused"],
							[8, 1],
							[7, [0, 1]]
						]],
						[-1, cr.system_object.prototype.cnds.CompareVar, null, 0, false, false, false, 0x3aa2178966b15, false, [
							[11, "SlomoIsActive"],
							[8, 1],
							[7, [0, 1]]
						]]
					],
						[
							[47, cr.plugins_.Sprite.prototype.acts.Destroy, null, 0x7d9ec894bfa8b, false],
							[-1, cr.system_object.prototype.acts.CreateObject, null, 0xc8b938a3652bf, false, [
								[4, 10],
								[5, [0, 3]],
								[0, [0, 0]],
								[0, [0, 0]]
							]],
							[-1, cr.system_object.prototype.acts.CreateObject, null, 7883074365350581, false, [
								[4, 4],
								[5, [0, 3]],
								[0, [0, 160]],
								[0, [0, 320]]
							]],
							[-1, cr.system_object.prototype.acts.CreateObject, null, 4866026574519771, false, [
								[4, 5],
								[5, [0, 3]],
								[0, [0, 270]],
								[0, [0, 320]]
							]],
							[-1, cr.system_object.prototype.acts.CreateObject, null, 5595954281785923, false, [
								[4, 3],
								[5, [0, 3]],
								[0, [0, 50]],
								[0, [0, 312]]
							]],
							[-1, cr.system_object.prototype.acts.SetVar, null, 9857380323209656, false, [
								[11, "GameIsPaused"],
								[7, [0, 1]]
							]],
							[-1, cr.system_object.prototype.acts.SetTimescale, null, 0x4832ec4ecae73, false, [
								[0, [0, 0]]
							]]
						],
						[
							[0, null, false, null, 987321679636455, [
								[-1, cr.system_object.prototype.cnds.CompareVar, null, 0, false, false, false, 461848971484422, false, [
									[11, "LANG"],
									[8, 0],
									[7, [2, "es"]]
								]]
							],
								[
									[10, cr.plugins_.Sprite.prototype.acts.SetAnimFrame, null, 0x5a548e1a5c4f1, false, [
										[0, [0, 1]]
									]],
									[10, cr.plugins_.Sprite.prototype.acts.StopAnim, null, 6257676035305926, false]
								]
							],
							[0, null, false, null, 8533215077023397, [
								[-1, cr.system_object.prototype.cnds.Else, null, 0, false, false, false, 351158168306721, false]
							],
								[
									[10, cr.plugins_.Sprite.prototype.acts.SetAnimFrame, null, 6772709944771216, false, [
										[0, [0, 0]]
									]],
									[10, cr.plugins_.Sprite.prototype.acts.StopAnim, null, 0x7ae5afc7a70b4, false]
								]
							]
						]
					]
				]
			],
			[0, null, false, null, 7618354044431381, [
				[-1, cr.system_object.prototype.cnds.CompareVar, null, 0, false, false, false, 682706206605764, false, [
					[11, "GameIsPaused"],
					[8, 0],
					[7, [0, 1]]
				]],
				[-1, cr.system_object.prototype.cnds.CompareVar, null, 0, false, false, false, 8581251821508217, false, [
					[11, "TutCompleted"],
					[8, 0],
					[7, [0, 1]]
				]]
			],
				[],
				[
					[0, null, true, null, 5963360395752128, [
						[29, cr.plugins_.Mouse.prototype.cnds.OnObjectClicked, null, 1, false, false, false, 7764284720252511, false, [
							[3, 0],
							[3, 0],
							[4, 4]
						]],
						[30, cr.plugins_.Touch.prototype.cnds.OnTouchObject, null, 1, false, false, false, 6528850196822805, false, [
							[4, 4]
						]]
					],
						[
							[10, cr.plugins_.Sprite.prototype.acts.Destroy, null, 0x6457d57350518, false],
							[4, cr.plugins_.Sprite.prototype.acts.Destroy, null, 0xc7d6b6799b9d1, false],
							[3, cr.plugins_.Sprite.prototype.acts.Destroy, null, 954771014095224, false],
							[5, cr.plugins_.Sprite.prototype.acts.Destroy, null, 9532750981939328, false],
							[13, cr.plugins_.Sprite.prototype.acts.Destroy, null, 6336411769876715, false],
							[-1, cr.system_object.prototype.acts.SetTimescale, null, 9865563231120692, false, [
								[0, [0, 1]]
							]],
							[-1, cr.system_object.prototype.acts.Wait, null, 9954675901389412, false, [
								[0, [1, .1]]
							]],
							[-1, cr.system_object.prototype.acts.SetVar, null, 0x7cbdbaf76cf1b, false, [
								[11, "GameIsPaused"],
								[7, [0, 0]]
							]]
						]
					],
					[0, null, true, null, 0x69adbb8c95acf, [
						[29, cr.plugins_.Mouse.prototype.cnds.OnObjectClicked, null, 1, false, false, false, 5511458766292623, false, [
							[3, 0],
							[3, 0],
							[4, 3]
						]],
						[30, cr.plugins_.Touch.prototype.cnds.OnTouchObject, null, 1, false, false, false, 7041828015652946, false, [
							[4, 3]
						]]
					],
						[
							[-1, cr.system_object.prototype.acts.SetTimescale, null, 7031147480559458, false, [
								[0, [0, 1]]
							]],
							[-1, cr.system_object.prototype.acts.SetVar, null, 6467285222596793, false, [
								[11, "GameIsPaused"],
								[7, [0, 1]]
							]],
							[-1, cr.system_object.prototype.acts.CreateObject, null, 5895459652478379, false, [
								[4, 13],
								[5, [0, 4]],
								[0, [0, 0]],
								[0, [0, 0]]
							]],
							[13, cr.plugins_.Sprite.prototype.acts.SetOpacity, null, 4823684816292579, false, [
								[0, [0, 0]]
							]],
							[13, cr.behaviors.lunarray_LiteTween.prototype.acts.Start, "start", 9518766423616868, false, [
								[3, 0]
							]],
							[-1, cr.system_object.prototype.acts.Wait, null, 0x5682bd8e912a5, false, [
								[0, [1, .3]]
							]],
							[-1, cr.system_object.prototype.acts.GoToLayout, null, 0x61a0fa23d1213, false, [
								[6, "StartScreen"]
							]]
						],
						[
							[0, null, false, null, 5011441429252481, [
								[-1, cr.system_object.prototype.cnds.CompareVar, null, 0, false, false, false, 6017079279329459, false, [
									[11, "BestScore"],
									[8, 2],
									[7, [23, "Score"]]
								]]
							],
								[
									[-1, cr.system_object.prototype.acts.SetVar, null, 0x6b9328d61c751, false, [
										[11, "BestScore"],
										[7, [23, "Score"]]
									]]
								]
							]
						]
					]
				]
			]
		]],
		["Event sheet 2", [
			[1, "LANG", 1, "en", false, false, 0x3d42155431732, false],
			[0, null, false, null, 8298978542251967, [
				[-1, cr.system_object.prototype.cnds.OnLayoutStart, null, 1, false, false, false, 0x9f602c8e8832d, false]
			],
				[
					[55, cr.plugins_.Browser.prototype.acts.ExecJs, null, 0xe67802c801f26, false, [
						[1, [2, "window.c2_supportedLanguages = ['en','es']"]]
					]],
					[44, cr.plugins_.Text.prototype.acts.Destroy, null, 0x914d2f2de3d3f, false],
					[40, cr.plugins_.Text.prototype.acts.Destroy, null, 0x3d00d8ace84e2, false],
					[43, cr.plugins_.Text.prototype.acts.Destroy, null, 9979753701666872, false],
					[41, cr.plugins_.Text.prototype.acts.Destroy, null, 0xdba872566fd3a, false],
					[45, cr.plugins_.Text.prototype.acts.Destroy, null, 7894499940711632, false],
					[60, cr.plugins_.Sprite.prototype.acts.SetOpacity, null, 0xd3b64fcbc0ea1, false, [
						[0, [0, 0]]
					]],
					[3, cr.plugins_.Sprite.prototype.acts.SetOpacity, null, 887468358225114, false, [
						[0, [0, 0]]
					]],
					[-1, cr.system_object.prototype.acts.CreateObject, null, 4744460567821677, false, [
						[4, 13],
						[5, [0, 4]],
						[0, [0, 0]],
						[0, [0, 0]]
					]],
					[13, cr.plugins_.Sprite.prototype.acts.SetOpacity, null, 5016145366944877, false, [
						[0, [0, 100]]
					]],
					[-1, cr.system_object.prototype.acts.Wait, null, 0xc949516e9759c, false, [
						[0, [1, .5]]
					]],
					[48, cr.plugins_.Softgames.prototype.acts.startGame, null, 4609597207707687, false],
					[-1, cr.system_object.prototype.acts.Wait, null, 4950676714456789, false, [
						[0, [1, .2]]
					]],
					[-1, cr.system_object.prototype.acts.SetVar, null, 0xab020bb82950f, false, [
						[11, "LANG"],
						[7, [20, 48, cr.plugins_.Softgames.prototype.exps.getLanguage, true, null]]
					]]
				],
				[
					[0, null, false, null, 8051297272959024, [
						[-1, cr.system_object.prototype.cnds.CompareVar, null, 0, false, false, false, 5536045271514929, false, [
							[11, "LANG"],
							[8, 0],
							[7, [2, ""]]
						]]
					],
						[
							[-1, cr.system_object.prototype.acts.SetVar, null, 0xb834d7ad090f4, false, [
								[11, "LANG"],
								[7, [2, "en"]]
							]]
						]
					],
					[0, null, false, null, 8065023866466546, [
						[-1, cr.system_object.prototype.cnds.CompareVar, null, 0, false, false, false, 727984559581866, false, [
							[11, "LANG"],
							[8, 0],
							[7, [2, "es"]]
						]]
					],
						[
							[11, cr.plugins_.Sprite.prototype.acts.SetAnimFrame, null, 0x84befd2fe229f, false, [
								[0, [0, 1]]
							]],
							[11, cr.plugins_.Sprite.prototype.acts.StopAnim, null, 0xce66befe0f453, false],
							[54, cr.plugins_.Spritefont2.prototype.acts.SetText, null, 0xa33e53bc71921, false, [
								[7, [10, [2, "MEJOR:"],
									[23, "BestScore"]
								]]
							]],
							[60, cr.plugins_.Sprite.prototype.acts.SetOpacity, null, 6145553664488407, false, [
								[0, [0, 0]]
							]],
							[3, cr.plugins_.Sprite.prototype.acts.SetOpacity, null, 6600032657821854, false, [
								[0, [0, 0]]
							]]
						]
					],
					[0, null, false, null, 5019417563511174, [
						[-1, cr.system_object.prototype.cnds.Else, null, 0, false, false, false, 0xea7fed5ce32db, false]
					],
						[
							[11, cr.plugins_.Sprite.prototype.acts.SetAnimFrame, null, 0x7d58939635c34, false, [
								[0, [0, 0]]
							]],
							[11, cr.plugins_.Sprite.prototype.acts.StopAnim, null, 5897028323890919, false],
							[54, cr.plugins_.Spritefont2.prototype.acts.SetText, null, 6175939483687864, false, [
								[7, [10, [2, "BEST:"],
									[23, "BestScore"]
								]]
							]],
							[60, cr.plugins_.Sprite.prototype.acts.SetOpacity, null, 4734850290715652, false, [
								[0, [0, 0]]
							]],
							[3, cr.plugins_.Sprite.prototype.acts.SetOpacity, null, 6578289992069192, false, [
								[0, [0, 0]]
							]]
						]
					],
					[0, null, false, null, 4932213951698611, [],
						[
							[13, cr.behaviors.lunarray_LiteTween.prototype.acts.Start, "stop", 5550134621842616, false, [
								[3, 0]
							]],
							[-1, cr.system_object.prototype.acts.Wait, null, 7599427249119989, false, [
								[0, [1, .3]]
							]],
							[13, cr.plugins_.Sprite.prototype.acts.Destroy, null, 0xf4c6492a907b1, false]
						]
					]
				]
			],
			[0, null, false, null, 4625974666721471, [
				[11, cr.plugins_.Sprite.prototype.cnds.CompareOpacity, null, 0, false, false, false, 5020673556936083, false, [
					[8, 0],
					[0, [0, 0]]
				]]
			],
				[],
				[
					[0, null, true, null, 0x90f6f0e7d8b0, [
						[29, cr.plugins_.Mouse.prototype.cnds.OnObjectClicked, null, 1, false, false, false, 5503964874402602, false, [
							[3, 0],
							[3, 0],
							[4, 1]
						]],
						[30, cr.plugins_.Touch.prototype.cnds.OnTouchObject, null, 1, false, false, false, 8647999624876286, false, [
							[4, 1]
						]]
					],
						[
							[-1, cr.system_object.prototype.acts.GoToLayoutByName, null, 0xbea59e679f36c, false, [
								[1, [2, "GameScreen"]]
							]]
						]
					],
					[0, null, true, null, 4751670721087094, [
						[29, cr.plugins_.Mouse.prototype.cnds.OnObjectClicked, null, 1, false, false, false, 5535365556802565, false, [
							[3, 0],
							[3, 0],
							[4, 0]
						]],
						[30, cr.plugins_.Touch.prototype.cnds.OnTouchObject, null, 1, false, false, false, 0x4ead95f442c5b, false, [
							[4, 0]
						]]
					],
						[
							[60, cr.behaviors.lunarray_LiteTween.prototype.acts.Start, "VisibilityTween", 962646812031931, false, [
								[3, 0]
							]],
							[3, cr.behaviors.lunarray_LiteTween.prototype.acts.Start, "VisibilityTween", 933718736408831, false, [
								[3, 0]
							]]
						]
					]
				]
			],
			[0, null, false, null, 0xe6521ac911a0c, [
				[11, cr.plugins_.Sprite.prototype.cnds.CompareOpacity, null, 0, false, false, false, 8274953058219007, false, [
					[8, 0],
					[0, [0, 100]]
				]]
			],
				[],
				[
					[0, null, true, null, 8015931174011678, [
						[29, cr.plugins_.Mouse.prototype.cnds.OnObjectClicked, null, 1, false, false, false, 0x81157ebaa0b05, false, [
							[3, 0],
							[3, 0],
							[4, 3]
						]],
						[30, cr.plugins_.Touch.prototype.cnds.OnTouchObject, null, 1, false, false, false, 4786020213972257, false, [
							[4, 3]
						]]
					],
						[
							[60, cr.behaviors.lunarray_LiteTween.prototype.acts.Start, "InvisibilityTween", 7263011076222217, false, [
								[3, 0]
							]],
							[3, cr.behaviors.lunarray_LiteTween.prototype.acts.Start, "InvisibilityTween", 336763197603131, false, [
								[3, 0]
							]]
						]
					]
				]
			]
		]]
	], "media/", false, 320, 480, 4, true, true, true, "1.0", 1, false, 2, true, 60, true, []]
};
