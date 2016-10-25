(function() {
	function _ga(a) {
		var b = this;
		b.container = UD,
		b.zc = UD,
		b.UP = UD,
		b.z9 = UD,
		b.uP = UD,
		b.g = UD,
		b.dh = 1,
		b.uI = a.uI != UD ? a.uI: 20,
		b.uc = b[W_] = a[zl] | 320,
		b.ul = b[w_] = a[zL] | 480,
		b.zj = 8888,
		b.zD = 400,
		b.ut = 20,
		b.Us(uf, a),
		b.UU = tq,
		b.UG = tq,
		b.moused = tq
	}
	function km() {
		var a = this;
		a.kn = 40,
		a.kb = {
			r: 12,
			R: 8
		},
		a.kc = [0, .003, .004, .005, .006, .008, .01, .04, .08],
		a.d8 = [0, .003 * .8, .0032, .004, .006 * .8, .0064, .008, .032, .064],
		a.kx = 450,
		a.kz = 350,
		a.d7 = 10,
		a.KW = new KQ(5, 140, 1, 6, 3, 800, 15, null),
		a.KE = new KQ(0, 80, 2, 10, 3, 800, 15, new qg(255, 255, 255)),
		a.kl = new qg(255, 140, 62, 1),
		a.kj = [new qg(255, 68, 0, 1), new qg(238, 0, 204, 1), new qg(34, 238, 0, 1), new qg(255, 34, 153, 1), new qg(105, 255, 0, 1), new qg(255, 255, 0, 1), new qg(0, 204, 255, 1)],
		a.kh = new qg(255, 255, 255, 1),
		a.dl = "",
		a.kg = [[0, "Cadet"], [10, "Lieutenant"], [25, "Captain"], [50, "Major"], [100, "Colonel"], [150, "Brigadier"], [200, "General"], [250, "Field Marshall"]],
		a.kf = [[0, 0, "Crawler"], [0, .5, "Walker"], [1, .4, "Walker"], [1, .8, "Runner"], [2, .5, "Sprinter"], [2, 1, "Racer"]],
		a.kd = [[0, "简介", "首先选择一个点，然后走线。 "], [2, "驱逐", "会有一条线一直追逐你！"], [6, "路线", "记住，每一条线必须仍然被使用一次。"]],
		a.KH = [[3, "10 个等级", "There are loads more levels to be released soon. \n \nHelp me improve the game by giving me some feedback and sharing it with your friends."]],
		a.dc = {},
		a.dc.dQ = "No Thanks",
		a.dc.dv = "Rate/Review",
		a.dc.dn = "If you are enjoying playing Pathuku, help us by giving us a good review/rating. \n \nThanks \nPathuku Team",
		a.ks = [],
		a.ka = ["this is madness", "please try harder.", "hurry up, you're wasting your battery!"]
	}
	function wF(a, b, c, d, e, f, g, h) {
		var i = this;
		i.s = a,
		i.zV = b,
		i.raduis = c,
		i.angle = e,
		i[Zk] = f,
		g == UD ? i[ZK] = i[Zk].kX( - 100) : i[ZK] = g,
		i[ZJ] = 2,
		i.t = h,
		i.ps = d,
		i.lineJoin = "round",
		i.t == "qd" && (i.ps += i.ps, i.lineJoin = "miter"),
		i.uz = 360 / i.ps
	}
	function UA(a) {
		var b = this;
		b.s = a,
		b.Gs = new Array,
		b.uU = 0,
		b.uY = 359
	}
	function _G(a, b, c, d, e, f, g, h, i, j, k) {
		var l,
		m,
		n,
		o = this;
		o.ls = [],
		o.s = a,
		d != UD ? (o.pn = 360 / e, o.ls[pZ] = e, o.Uz = c, o.qmzZ = d, o.zn = f, o.zI = g, o.Y = h, o.color = i == UD ? new qg(255, 255, 255) : i) : (o.pn = 360 / c.ls, o.ls[pZ] = c.ls, o.Uz = c.Uz, o.qmzZ = c.qmzZ, o.zn = c.zn, o.zI = c.zI, o.Y = c.Y, o.color = c.color),
		o.zg = 0,
		o.aF = 0,
		o.zV = b,
		o.gI = 0,
		o.yq = 0;
		for (l = 0, m = mr, n = mn; l < o.ls[pZ]; l++) o.ls[l] = new _tmppp(j + n(m() * k), m() * o.Y)
	}
	function _tmppp(a, b) {
		this.angle = a,
		this.Y = b
	}
	function KQ(a, b, c, d, e, f, g, h) {
		var i = this;
		i.ls = c,
		i.KI = [c, d],
		i.Uz = a,
		i.qmzZ = b,
		i.zn = e,
		i.zI = f,
		i.Y = g,
		i.color = h
	}
	function qg(a, b, c, d) {
		var e = this;
		e.r = a,
		e.g = b,
		e.b = c,
		e.a = d
	}
	function _cr(a) {
		var b = this;
		b.s = a,
		b.cHs = new Array,
		b.cH = 0,
		b.cqk = 0,
		b.aF = 0,
		b.TTime = 0,
		b.qe = 0,
		b.enabled = a1,
		b.gI = 0,
		b.zs = .02
	}
	function h(a, b) {
		this.x = a,
		this.y = b
	}
	function _D(a, b) {
		var c = this;
		c.s = a,
		c.S = b,
		c.inner = new wF(c.s, new h(50, 100), 14, 3, 90, b.kq),
		c.outer = new wF(c.s, new h(50, 100), 17, 3, 45, b.kM),
		c.ub = .3,
		c.qe = 0,
		c.visible = tq
	}
	function un(a, b, c, d) {
		var e = this;
		e.s = a,
		e.sGrid = b,
		e.KY = 0,
		e.Zz = -1,
		e.level = 0,
		e[W_] = c,
		e[w_] = d,
		e.zy = a1,
		e.g = UD,
		e.KZ = 0
	}
	function um() {
		var a,
		b = this;
		b.d = [],
		b.l = [],
		b.qa = 1,
		b.t = 0,
		b.Uo = new Array(1111, 2222, 3333),
		b[pZ] = 0,
		a = new Date,
		b.id = "RB" + a.getFullYear() + a.getMonth() + "_" + a.getTime()
	}
	function _l() {
		this.p = [],
		this.zn = 0
	}
	function _p(a, b, c) {
		this.x = a,
		this.y = b,
		this.t = c
	}
	function U8(a, b, c, d) {
		var e = this;
		e.s = a,
		e.Uj = d || 50,
		e[W_] = b || 100,
		e[w_] = c || 100,
		e.uR = 1 / (e.Uj / 1e3),
		e.fps = 0,
		e.sfps = "FPS",
		e.zu = 0,
		e.lastTime = new Date
	}
	function _aJ() {
		this.aJ = [],
		this.KC = UD
	}
	function z3(a, b, c, d, e, f, g) {
		var h = this;
		h.x = a,
		h.y = b,
		h[W_] = c,
		h[w_] = d,
		h.aD = e,
		h.z4 = f,
		h.KN = g
	}
	function U9() {
		this.aDs = [],
		this.g = UD
	}
	function U0() {
		this.Zzs = []
	}
	function _Zz(a, b, c, d) {
		var e = this;
		e.id = a,
		e.KY = b || 0,
		e.z5 = b || 0,
		e.KU = 0,
		e.qds = 0,
		e.uN = d
	}
	function z2(a, b, c, d, e) {
		var f,
		g,
		h,
		i,
		j,
		k,
		l,
		m,
		n = this;
		n.a = a,
		n.b = b,
		n.c = c,
		n.d = d,
		n.t = e || 0,
		n.len = 10,
		n.gH = new Array(n.len + 1),
		n.gH[0] = 0,
		f = n.x(0),
		g = n.y(0),
		h = 0;
		for (i = 1; i <= n.len; i += 1) j = n.x(i * 1 / n.len),
		k = n.y(i * 1 / n.len),
		l = f - j,
		m = g - k,
		h += mS(l * l + m * m),
		n.gH[i] = h,
		f = j,
		g = k;
		n[pZ] = h
	}
	function _W(a, b, c, d, e) {
		var f = this;
		f.s = a,
		f[W_] = d,
		f[w_] = e,
		f.x = b,
		f.y = c,
		f.row = 0,
		f.col = 0,
		f.color = "#FF1F98",
		f.uM = f.x + f[W_] / 2,
		f.z6 = f.y + f[w_] / 2,
		f.d = UD
	}
	function zU(a, b, c, d) {
		var e = this;
		e.s = a,
		e.text = b,
		e[W_] = c,
		e[w_] = 0,
		e.r = [""],
		e.textHeight = d | 12,
		e.textLineSpacing = 2,
		e.uW = tq
	}
	function _g(a, b, c, d, e, f, g) {
		var h = this;
		h.version = "1.29",
		h.dd = "lieqicun.com/game/list.html",
		h.df = "http://www." + h.dd,
		h.data = {},
		h.z7 = a,
		h.s = a[Zs]("2d"),
		h.z7Es = b,
		h.sEs = b[Zs]("2d"),
		h.z7Bg = c,
		h.sBg = c[Zs]("2d"),
		h.dh = 1,
		h.z8 = 30,
		h.leftOffset = 0,
		h[W_] = f,
		h[w_] = g,
		h.zP = tq,
		h.dt = UD,
		h.r = d,
		h.R = e,
		h.K = h[W_] / h.R,
		h.k = (h[w_] - h.z8) / h.r,
		h.Ws = new Array,
		h.g = new Array,
		h.O = new _O,
		h.S = new km,
		h.S.ki(),
		h.level = new um,
		h.aJ = new _aJ,
		h.aJ.g = h,
		h.Y4 = new _Y4(h, h.O, h[W_], h[w_], h.S, h.aJ),
		h.cr = new _cr(h.s),
		h.cr.S = h.S,
		h.cr.pp = h,
		h.cr.uE = function(a) {
			var b = this,
			c = b.pp.pN(a),
			d = b.pp.Ger.us(c, b.S.KW),
			e = b.pp.Ger.us(c, b.S.KE);
			b.pp.D.move(c)
		},
		h.cr.ze = function(a) {
			var b = this.pp.pN(a);
			if (this.pp.qw) return;
			this.pp.po()
		},
		h.Ger = new UA(h.sEs),
		h.Ger.pp = h,
		h.D = new _D(h.sEs, h.S),
		h.zX = new un(h.sEs, h.s, h[W_], 20),
		h.zX.g = h,
		h.Zzs = new U0,
		h.fps = new U8(h.sEs, h[W_], 50, h.S.kn),
		h.gc = new _gc(h.s, h.O),
		h.gc.g = h,
		h.aDs = new U9,
		h.m = new _m,
		h.Uw = new _Uw(h.sBg, h[W_], h[w_], h.R, h.r, h.S.kO, h.S.kh),
		h.Uq = 1,
		h.dW = 0,
		h.aB = 0,
		h.aA = 0,
		h.time = 0,
		h.u9 = tq,
		h.qw = tq,
		h.zw = tq,
		h.u0 = tq,
		h.qq = a1,
		h.UJ = 0,
		h.gC = 0,
		h.UL = 0,
		h.KJ = 0,
		h.dn = 19,
		h.UZ = UD,
		h.ZC = 20,
		h.Zc = 2,
		h.d3 = tq,
		h.UU = a1,
		h.dp = ""
	}
	function _m() {
		var a = this;
		a.db = UD,
		tq && window.openDatabase && (a.db = openDatabase("Pathuku", "1.0", "m", 2097152), zK("DB CREATED"), a.db.zo(function(a) {
			a.executeSql("CREATE TABLE IF NOT EXISTS rbMemory(NamePK TEXT PRIMARY KEY,Val TEXT)")
		},
		a.zA), a.db.zo(function(a) {
			zK("Create"),
			a.executeSql("INSERT INTO rbMemory (NamePK,Val) VALUES (?,?)", ["rbdata", "nothinge"])
		},
		a.zA))
	}
	function _O() {}
	function _gc(a, b) {
		var c = this;
		c.s = a,
		c.R = 4,
		c.r = 5,
		c.O = b,
		c.g = UD
	}
	function _Y4(a, b, c, d, e, f) {
		var g = this;
		g.g = a,
		g.O = b,
		g[W_] = c,
		g[w_] = d,
		g.S = e,
		g.aJ = f,
		g.zC = 10,
		g.da = 0,
		g.dg = UD
	}
	function _Y4I(a, b, c) {
		var d = this;
		d[w_] = 35,
		d.text = a,
		d.aD = b,
		d.para = c,
		d.selected = tq
	}
	function _Uw(a, b, c, d, e, f, g) {
		this.gds = [new Uc(a, b, c, d, e, f, g), new u2(a, b, c, d, e, f, g, 1), new u2(a, b, c, d, e, f, g, 2), new uk(a, b, c, d, e, f, g)],
		this.eE = this.gds[0]
	}
	function uk(a, b, c, d, e, f, g) {
		var h = this;
		h.s = a,
		h[W_] = b,
		h[w_] = c,
		h.gb = .005,
		h.gb = .005,
		h.ls = 18,
		h.uw = f,
		h.u5 = g
	}
	function Uc(a, b, c, d, e, f, g) {
		var h = this;
		h.s = a,
		h[W_] = b,
		h[w_] = c,
		h.z8 = 30,
		h.gb = .005,
		h.R = d,
		h.r = e,
		h.K = h[W_] / h.R,
		h.k = (h[w_] - h.z8) / h.r,
		h.Y = 14,
		h.uw = f,
		h.u5 = g
	}
	function u2(a, b, c, d, e, f, g, h) {
		var i = this;
		i.s = a,
		i[W_] = b,
		i[w_] = c,
		i.gb = .009,
		i.K = i[W_] / i.R,
		i.k = i[w_] / i.r,
		i.uw = f,
		i.Uq = h,
		i.ps = [],
		i.u5 = g
	}
	var uf,
	width,
	height,
	zl,
	zL,
	_,
	length,
	W_,
	w_,
	pZ,
	zK,
	a1,
	tq,
	mm; (function() {
		var a = {
			x: 0,
			y: 0,
			t: 0
		},
		b = {
			x: 0,
			y: 0,
			t: 1
		},
		c = {
			x: 0,
			y: 1,
			t: 0
		},
		d = {
			x: 0,
			y: 1,
			t: 1
		},
		e = {
			x: 0,
			y: 2,
			t: 0
		},
		f = {
			x: 0,
			y: 2,
			t: 1
		},
		g = {
			x: 0,
			y: 3,
			t: 0
		},
		h = {
			x: 0,
			y: 3,
			t: 1
		},
		i = {
			x: 0,
			y: 4,
			t: 0
		},
		j = {
			x: 0,
			y: 4,
			t: 1
		},
		k = {
			x: 0,
			y: 5,
			t: 0
		},
		l = {
			x: 0,
			y: 5,
			t: 1
		},
		m = {
			x: 0,
			y: 6,
			t: 0
		},
		n = {
			x: 0,
			y: 6,
			t: 1
		},
		o = {
			x: 0,
			y: 7,
			t: 0
		},
		p = {
			x: 0,
			y: 7,
			t: 1
		},
		q = {
			x: 0,
			y: 8,
			t: 0
		},
		r = {
			x: 0,
			y: 8,
			t: 1
		},
		s = {
			x: 0,
			y: 9,
			t: 0
		},
		t = {
			x: 0,
			y: 9,
			t: 1
		},
		u = {
			x: 0,
			y: 10,
			t: 0
		},
		v = {
			x: 0,
			y: 10,
			t: 1
		},
		w = {
			x: 1,
			y: 0,
			t: 0
		},
		x = {
			x: 1,
			y: 0,
			t: 1
		},
		y = {
			x: 1,
			y: 1,
			t: 0
		},
		z = {
			x: 1,
			y: 1,
			t: 1
		},
		A = {
			x: 1,
			y: 2,
			t: 0
		},
		B = {
			x: 1,
			y: 2,
			t: 1
		},
		C = {
			x: 1,
			y: 3,
			t: 0
		},
		D = {
			x: 1,
			y: 3,
			t: 1
		},
		E = {
			x: 1,
			y: 4,
			t: 0
		},
		F = {
			x: 1,
			y: 4,
			t: 1
		},
		G = {
			x: 1,
			y: 5,
			t: 0
		},
		H = {
			x: 1,
			y: 5,
			t: 1
		},
		I = {
			x: 1,
			y: 6,
			t: 0
		},
		J = {
			x: 1,
			y: 6,
			t: 1
		},
		K = {
			x: 1,
			y: 7,
			t: 0
		},
		L = {
			x: 1,
			y: 7,
			t: 1
		},
		M = {
			x: 1,
			y: 8,
			t: 0
		},
		N = {
			x: 1,
			y: 8,
			t: 1
		},
		O = {
			x: 1,
			y: 9,
			t: 0
		},
		P = {
			x: 1,
			y: 9,
			t: 1
		},
		Q = {
			x: 1,
			y: 10,
			t: 0
		},
		R = {
			x: 1,
			y: 10,
			t: 1
		},
		S = {
			x: 1,
			y: 11,
			t: 0
		},
		T = {
			x: 1,
			y: 12,
			t: 0
		},
		U = {
			x: 2,
			y: 0,
			t: 0
		},
		V = {
			x: 2,
			y: 0,
			t: 1
		},
		W = {
			x: 2,
			y: 1,
			t: 0
		},
		X = {
			x: 2,
			y: 1,
			t: 1
		},
		Y = {
			x: 2,
			y: 2,
			t: 0
		},
		Z = {
			x: 2,
			y: 2,
			t: 1
		},
		$ = {
			x: 2,
			y: 3,
			t: 0
		},
		_ = {
			x: 2,
			y: 3,
			t: 1
		},
		ba = {
			x: 2,
			y: 4,
			t: 0
		},
		bb = {
			x: 2,
			y: 4,
			t: 1
		},
		bc = {
			x: 2,
			y: 5,
			t: 0
		},
		bd = {
			x: 2,
			y: 5,
			t: 1
		},
		be = {
			x: 2,
			y: 6,
			t: 0
		},
		bf = {
			x: 2,
			y: 6,
			t: 1
		},
		bg = {
			x: 2,
			y: 7,
			t: 0
		},
		bh = {
			x: 2,
			y: 7,
			t: 1
		},
		bi = {
			x: 2,
			y: 8,
			t: 0
		},
		bj = {
			x: 2,
			y: 8,
			t: 1
		},
		bk = {
			x: 2,
			y: 9,
			t: 0
		},
		bl = {
			x: 2,
			y: 9,
			t: 1
		},
		bm = {
			x: 2,
			y: 10,
			t: 0
		},
		bn = {
			x: 2,
			y: 10,
			t: 1
		},
		bo = {
			x: 3,
			y: 0,
			t: 0
		},
		bp = {
			x: 3,
			y: 0,
			t: 1
		},
		bq = {
			x: 3,
			y: 1,
			t: 0
		},
		br = {
			x: 3,
			y: 1,
			t: 1
		},
		bs = {
			x: 3,
			y: 2,
			t: 0
		},
		bt = {
			x: 3,
			y: 2,
			t: 1
		},
		bu = {
			x: 3,
			y: 3,
			t: 0
		},
		bv = {
			x: 3,
			y: 3,
			t: 1
		},
		bw = {
			x: 3,
			y: 4,
			t: 0
		},
		bx = {
			x: 3,
			y: 4,
			t: 1
		},
		by = {
			x: 3,
			y: 5,
			t: 0
		},
		bz = {
			x: 3,
			y: 5,
			t: 1
		},
		bA = {
			x: 3,
			y: 6,
			t: 0
		},
		bB = {
			x: 3,
			y: 6,
			t: 1
		},
		bC = {
			x: 3,
			y: 7,
			t: 0
		},
		bD = {
			x: 3,
			y: 7,
			t: 1
		},
		bE = {
			x: 3,
			y: 8,
			t: 0
		},
		bF = {
			x: 3,
			y: 8,
			t: 1
		},
		bG = {
			x: 3,
			y: 9,
			t: 0
		},
		bH = {
			x: 3,
			y: 9,
			t: 1
		},
		bI = {
			x: 3,
			y: 10,
			t: 0
		},
		bJ = {
			x: 3,
			y: 10,
			t: 1
		},
		bK = {
			x: 4,
			y: 0,
			t: 0
		},
		bL = {
			x: 4,
			y: 0,
			t: 1
		},
		bM = {
			x: 4,
			y: 1,
			t: 0
		},
		bN = {
			x: 4,
			y: 1,
			t: 1
		},
		bO = {
			x: 4,
			y: 2,
			t: 0
		},
		bP = {
			x: 4,
			y: 2,
			t: 1
		},
		bQ = {
			x: 4,
			y: 3,
			t: 0
		},
		bR = {
			x: 4,
			y: 3,
			t: 1
		},
		bS = {
			x: 4,
			y: 4,
			t: 0
		},
		bT = {
			x: 4,
			y: 4,
			t: 1
		},
		bU = {
			x: 4,
			y: 5,
			t: 0
		},
		bV = {
			x: 4,
			y: 5,
			t: 1
		},
		bW = {
			x: 4,
			y: 6,
			t: 0
		},
		bX = {
			x: 4,
			y: 6,
			t: 1
		},
		bY = {
			x: 4,
			y: 7,
			t: 0
		},
		bZ = {
			x: 4,
			y: 7,
			t: 1
		},
		b$ = {
			x: 4,
			y: 8,
			t: 0
		},
		b_ = {
			x: 4,
			y: 8,
			t: 1
		},
		ca = {
			x: 4,
			y: 9,
			t: 0
		},
		cb = {
			x: 4,
			y: 9,
			t: 1
		},
		cc = {
			x: 4,
			y: 10,
			t: 0
		},
		cd = {
			x: 4,
			y: 10,
			t: 1
		},
		ce = {
			x: 5,
			y: 0,
			t: 0
		},
		cf = {
			x: 5,
			y: 0,
			t: 1
		},
		cg = {
			x: 5,
			y: 1,
			t: 0
		},
		ch = {
			x: 5,
			y: 1,
			t: 1
		},
		ci = {
			x: 5,
			y: 2,
			t: 0
		},
		cj = {
			x: 5,
			y: 2,
			t: 1
		},
		ck = {
			x: 5,
			y: 3,
			t: 0
		},
		cl = {
			x: 5,
			y: 3,
			t: 1
		},
		cm = {
			x: 5,
			y: 4,
			t: 0
		},
		cn = {
			x: 5,
			y: 4,
			t: 1
		},
		co = {
			x: 5,
			y: 5,
			t: 0
		},
		cp = {
			x: 5,
			y: 5,
			t: 1
		},
		cq = {
			x: 5,
			y: 6,
			t: 0
		},
		cr = {
			x: 5,
			y: 6,
			t: 1
		},
		cs = {
			x: 5,
			y: 7,
			t: 0
		},
		ct = {
			x: 5,
			y: 7,
			t: 1
		},
		cu = {
			x: 5,
			y: 8,
			t: 0
		},
		cv = {
			x: 5,
			y: 8,
			t: 1
		},
		cw = {
			x: 5,
			y: 9,
			t: 0
		},
		cx = {
			x: 5,
			y: 9,
			t: 1
		},
		cy = {
			x: 5,
			y: 10,
			t: 0
		},
		cz = {
			x: 5,
			y: 10,
			t: 1
		},
		cA = {
			x: 6,
			y: 0,
			t: 0
		},
		cB = {
			x: 6,
			y: 0,
			t: 1
		},
		cC = {
			x: 6,
			y: 1,
			t: 0
		},
		cD = {
			x: 6,
			y: 1,
			t: 1
		},
		cE = {
			x: 6,
			y: 2,
			t: 0
		},
		cF = {
			x: 6,
			y: 2,
			t: 1
		},
		cG = {
			x: 6,
			y: 3,
			t: 0
		},
		cH = {
			x: 6,
			y: 3,
			t: 1
		},
		cI = {
			x: 6,
			y: 4,
			t: 0
		},
		cJ = {
			x: 6,
			y: 4,
			t: 1
		},
		cK = {
			x: 6,
			y: 5,
			t: 0
		},
		cL = {
			x: 6,
			y: 5,
			t: 1
		},
		cM = {
			x: 6,
			y: 6,
			t: 0
		},
		cN = {
			x: 6,
			y: 6,
			t: 1
		},
		cO = {
			x: 6,
			y: 7,
			t: 0
		},
		cP = {
			x: 6,
			y: 7,
			t: 1
		},
		cQ = {
			x: 6,
			y: 8,
			t: 0
		},
		cR = {
			x: 6,
			y: 8,
			t: 1
		},
		cS = {
			x: 6,
			y: 9,
			t: 0
		},
		cT = {
			x: 6,
			y: 9,
			t: 1
		},
		cU = {
			x: 6,
			y: 10,
			t: 0
		},
		cV = {
			x: 6,
			y: 10,
			t: 1
		},
		cW = {
			x: 7,
			y: 0,
			t: 0
		},
		cX = {
			x: 7,
			y: 0,
			t: 1
		},
		cY = {
			x: 7,
			y: 1,
			t: 0
		},
		cZ = {
			x: 7,
			y: 1,
			t: 1
		},
		c$ = {
			x: 7,
			y: 2,
			t: 0
		},
		c_ = {
			x: 7,
			y: 2,
			t: 1
		},
		da = {
			x: 7,
			y: 3,
			t: 0
		},
		db = {
			x: 7,
			y: 3,
			t: 1
		},
		dc = {
			x: 7,
			y: 4,
			t: 0
		},
		dd = {
			x: 7,
			y: 4,
			t: 1
		},
		de = {
			x: 7,
			y: 5,
			t: 0
		},
		df = {
			x: 7,
			y: 5,
			t: 1
		},
		dg = {
			x: 7,
			y: 6,
			t: 0
		},
		dh = {
			x: 7,
			y: 6,
			t: 1
		},
		di = {
			x: 7,
			y: 7,
			t: 0
		},
		dj = {
			x: 7,
			y: 7,
			t: 1
		},
		dk = {
			x: 7,
			y: 8,
			t: 0
		},
		dl = {
			x: 7,
			y: 8,
			t: 1
		},
		dm = {
			x: 7,
			y: 9,
			t: 0
		},
		dn = {
			x: 7,
			y: 9,
			t: 1
		},
		dp = {
			x: 7,
			y: 10,
			t: 0
		},
		dq = {
			x: 7,
			y: 10,
			t: 1
		},
		dr = {
			x: 8,
			y: 2,
			t: 0
		},
		ds = {
			x: 8,
			y: 4,
			t: 0
		},
		dt = {
			x: 8,
			y: 6,
			t: 0
		},
		du = {
			x: 8,
			y: 8,
			t: 0
		};
		uf = {
			version: "1.4",
			levels: [{
				d: [bQ, bc, bY, cK, bc, bg, bY, cO, cK, bQ],
				l: [{
					p: [bQ, bc]
				},
				{
					p: [bc, bY]
				},
				{
					p: [bY, cK]
				},
				{
					p: [cK, bc]
				},
				{
					p: [bc, bg]
				},
				{
					p: [bg, bY]
				},
				{
					p: [bY, cO]
				},
				{
					p: [cO, cK]
				},
				{
					p: [cK, bQ]
				}],
				qa: 0,
				t: 0,
				id: "4246224664",
				gI: 1e3
			},
			{
				d: [cG, bg, $, bQ, bY, cG, cO, bY, bg, bQ, cG],
				l: [{
					p: [cG, bg]
				},
				{
					p: [bg, $]
				},
				{
					p: [$, bQ]
				},
				{
					p: [bQ, bY]
				},
				{
					p: [bY, cG]
				},
				{
					p: [cG, cO]
				},
				{
					p: [cO, bY]
				},
				{
					p: [bY, bg]
				},
				{
					p: [bg, bQ]
				},
				{
					p: [bQ, cG]
				}],
				qa: 0,
				t: 0,
				id: "62244664246",
				gI: 1e3
			},
			{
				d: [o, ce, w, dp, o, cG, w, o],
				l: [{
					p: [o, ce]
				},
				{
					p: [ce, w]
				},
				{
					p: [w, dp]
				},
				{
					p: [dp, o]
				},
				{
					p: [o, cG]
				},
				{
					p: [cG, w]
				},
				{
					p: [w, o]
				}],
				qa: 3,
				t: 0,
				id: "05170610",
				gI: 1e3
			},
			{
				d: [E, cI, A, E, cM, cI, I, cM, M, I],
				l: [{
					p: [E, cI]
				},
				{
					p: [cI, A]
				},
				{
					p: [A, E]
				},
				{
					p: [E, cM]
				},
				{
					p: [cM, cI]
				},
				{
					p: [cI, I]
				},
				{
					p: [I, cM]
				},
				{
					p: [cM, M]
				},
				{
					p: [M, I]
				}],
				qa: 2,
				t: 0,
				id: "1611661611",
				gI: 1e3
			},
			{
				d: [Y, cC, cQ, bk, Y, cQ, cU, bk, cC, U, Y],
				l: [{
					p: [Y, cC]
				},
				{
					p: [cC, cQ]
				},
				{
					p: [cQ, bk]
				},
				{
					p: [bk, Y]
				},
				{
					p: [Y, cQ]
				},
				{
					p: [cQ, cU]
				},
				{
					p: [cU, bk]
				},
				{
					p: [bk, cC]
				},
				{
					p: [cC, U]
				},
				{
					p: [U, Y]
				}],
				qa: 3,
				t: 0,
				id: "26622662622",
				gI: 3064
			},
			{
				d: [bs, bw, cm, cq, dg, cu, cq, bw, E, bs],
				l: [{
					p: [bs, bw]
				},
				{
					p: [bw, cm]
				},
				{
					p: [cm, cq]
				},
				{
					p: [cq, dg]
				},
				{
					p: [dg, cu]
				},
				{
					p: [cu, cq]
				},
				{
					p: [cq, bw]
				},
				{
					p: [bw, E]
				},
				{
					p: [E, bs]
				}],
				qa: 2,
				t: 0,
				id: "3355755313",
				gI: 2040
			},
			{
				d: [$, cg, cm, $, be, cm, cs, be, bk, cs],
				l: [{
					p: [$, cg]
				},
				{
					p: [cg, cm]
				},
				{
					p: [cm, $]
				},
				{
					p: [$, be]
				},
				{
					p: [be, cm]
				},
				{
					p: [cm, cs]
				},
				{
					p: [cs, be]
				},
				{
					p: [be, bk]
				},
				{
					p: [bk, cs]
				}],
				qa: 2,
				t: 0,
				id: "2552255225",
				gI: 1e3
			},
			{
				d: [m, g, Y, ci, da, dg, Y, m, ci, dg, m, M, cQ, dg],
				l: [{
					p: [m, g]
				},
				{
					p: [g, {
						x: 2,
						y: 2,
						t: 3,
						s: g,
						cp1: e,
						cp2: e,
						e: Y
					}]
				},
				{
					p: [Y, ci]
				},
				{
					p: [ci, {
						x: 7,
						y: 3,
						t: 3,
						s: ci,
						cp1: c$,
						cp2: c$,
						e: da
					}]
				},
				{
					p: [da, dg]
				},
				{
					p: [dg, Y]
				},
				{
					p: [Y, m]
				},
				{
					p: [m, ci]
				},
				{
					p: [ci, dg]
				},
				{
					p: [dg, cs, cq, {
						x: 2,
						y: 6,
						t: 2,
						s: cq,
						cp1: ck,
						cp2: $,
						e: be
					},
					bg, m]
				},
				{
					p: [m, M]
				},
				{
					p: [M, cQ]
				},
				{
					p: [cQ, dg]
				}],
				qa: 1,
				t: 0,
				id: "00257720570167",
				gI: 1e3
			},
			{
				d: [bc, de, bO, bc, b$, de, cY, bO, C, bc, K, b$, dm, de, C, K, de],
				l: [{
					p: [bc, de]
				},
				{
					p: [de, bO]
				},
				{
					p: [bO, bc]
				},
				{
					p: [bc, b$]
				},
				{
					p: [b$, de]
				},
				{
					p: [de, cY]
				},
				{
					p: [cY, bO]
				},
				{
					p: [bO, C]
				},
				{
					p: [C, bc]
				},
				{
					p: [bc, K]
				},
				{
					p: [K, b$]
				},
				{
					p: [b$, dm]
				},
				{
					p: [dm, de]
				},
				{
					p: [de, C]
				},
				{
					p: [C, K]
				},
				{
					p: [K, de]
				}],
				qa: 2,
				t: 0,
				id: "27424774121477117",
				gI: 1e3
			},
			{
				d: [E, A, cE, cI, K, O, cS, cO, E, cE, K, cS, E],
				l: [{
					p: [E, A]
				},
				{
					p: [A, cE]
				},
				{
					p: [cE, cI]
				},
				{
					p: [cI, K]
				},
				{
					p: [K, O]
				},
				{
					p: [O, cS]
				},
				{
					p: [cS, cO]
				},
				{
					p: [cO, E]
				},
				{
					p: [E, cE]
				},
				{
					p: [cE, K]
				},
				{
					p: [K, cS]
				},
				{
					p: [cS, E]
				}],
				qa: 2,
				t: 0,
				id: "1166116616161",
				gI: 1e3
			},
			{
				d: [bI, cw, cs, bA, bw, ck, cg, bo, bw, cs, bI, bA, ck, bo],
				l: [{
					p: [bI, cw]
				},
				{
					p: [cw, {
						x: 5,
						y: 7,
						t: 3,
						s: cw,
						cp1: dk,
						cp2: dk,
						e: cs
					}]
				},
				{
					p: [cs, bA]
				},
				{
					p: [bA, {
						x: 3,
						y: 4,
						t: 3,
						s: bA,
						cp1: G,
						cp2: G,
						e: bw
					}]
				},
				{
					p: [bw, ck]
				},
				{
					p: [ck, {
						x: 5,
						y: 1,
						t: 3,
						s: ck,
						cp1: c$,
						cp2: c$,
						e: cg
					}]
				},
				{
					p: [cg, bo]
				},
				{
					p: [bo, bw]
				},
				{
					p: [bw, cs]
				},
				{
					p: [cs, bI]
				},
				{
					p: [bI, bA]
				},
				{
					p: [bA, ck]
				},
				{
					p: [ck, bo]
				}],
				qa: 2,
				t: 0,
				id: "35533553353353",
				gI: 1e3
			},
			{
				d: [bg, bU, cG, bO, ba, bU, cM, b$, bg, ba, cG, cM, bg],
				l: [{
					p: [bg, bU]
				},
				{
					p: [bU, cG]
				},
				{
					p: [cG, bO]
				},
				{
					p: [bO, ba]
				},
				{
					p: [ba, bU]
				},
				{
					p: [bU, cM]
				},
				{
					p: [cM, b$]
				},
				{
					p: [b$, bg]
				},
				{
					p: [bg, ba]
				},
				{
					p: [ba, cG]
				},
				{
					p: [cG, cM]
				},
				{
					p: [cM, bg]
				}],
				qa: 2,
				t: 0,
				id: "2464246422662",
				gI: 1e3
			},
			{
				d: [C, ci, cI, bc, C, K, bk, bc, cQ, bk, cI, cQ],
				l: [{
					p: [C, ci]
				},
				{
					p: [ci, cI]
				},
				{
					p: [cI, bc]
				},
				{
					p: [bc, C]
				},
				{
					p: [C, K]
				},
				{
					p: [K, bk]
				},
				{
					p: [bk, bc]
				},
				{
					p: [bc, cQ]
				},
				{
					p: [cQ, bk]
				},
				{
					p: [bk, cI]
				},
				{
					p: [cI, cQ]
				}],
				qa: 2,
				t: 0,
				id: "156211226266",
				gI: 1e3
			},
			{
				d: [K, cO, W, cg, K, O, dm, cO],
				l: [{
					p: [K, E, {
						x: 2,
						y: 3,
						t: 3,
						s: E,
						cp1: C,
						cp2: C,
						e: $
					},
					ck, {
						x: 6,
						y: 4,
						t: 3,
						s: ck,
						cp1: cG,
						cp2: cG,
						e: cI
					},
					cO]
				},
				{
					p: [cO, W]
				},
				{
					p: [W, cg]
				},
				{
					p: [cg, K]
				},
				{
					p: [K, O]
				},
				{
					p: [O, s, i, {
						x: 2,
						y: 2,
						t: 3,
						s: i,
						cp1: e,
						cp2: e,
						e: Y
					},
					bO, ci, {
						x: 7,
						y: 4,
						t: 3,
						s: ci,
						cp1: c$,
						cp2: c$,
						e: dc
					},
					dm]
				},
				{
					p: [dm, cS, cO]
				}],
				qa: 2,
				t: 0,
				id: "16251176",
				gI: 1e3
			},
			{
				d: [E, dc, by, E, ck, dc, cu, ck, by, cu, E],
				l: [{
					p: [E, Y, {
						x: 6,
						y: 2,
						t: 3,
						s: Y,
						cp1: {
							x: 4,
							y: -2
						},
						cp2: {
							x: 4,
							y: -2
						},
						e: cE
					},
					dc]
				},
				{
					p: [dc, by]
				},
				{
					p: [by, E]
				},
				{
					p: [E, ck]
				},
				{
					p: [ck, dc]
				},
				{
					p: [dc, cu]
				},
				{
					p: [cu, ck]
				},
				{
					p: [ck, by]
				},
				{
					p: [by, cu]
				},
				{
					p: [cu, E]
				}],
				qa: 1,
				t: 0,
				id: "17315755351",
				gI: 1e3
			},
			{
				d: [q, G, cK, dk, c$, e, q, c$, cK, cu, bi, G, e, dk],
				l: [{
					p: [q, G]
				},
				{
					p: [G, {
						x: 6,
						y: 5,
						t: 3,
						s: G,
						cp1: {
							x: 3.5,
							y: -2.5
						},
						cp2: {
							x: 3.5,
							y: -2.5
						},
						e: cK
					}]
				},
				{
					p: [cK, dk]
				},
				{
					p: [dk, c$]
				},
				{
					p: [c$, bQ, bu, e]
				},
				{
					p: [e, q]
				},
				{
					p: [q, c$]
				},
				{
					p: [c$, cK]
				},
				{
					p: [cK, cu]
				},
				{
					p: [cu, bi]
				},
				{
					p: [bi, G]
				},
				{
					p: [G, e]
				},
				{
					p: [e, dk]
				}],
				qa: 2,
				t: 0,
				id: "01677007652107",
				gI: 1e3
			},
			{
				d: [bg, E, bw, bg, bY, bw, cm, bY, cO, cm],
				l: [{
					p: [bg, E]
				},
				{
					p: [E, {
						x: 3,
						y: 4,
						t: 2,
						s: E,
						cp1: {
							x: -0.26491106406735176,
							y: .20526680779794493
						},
						cp2: {
							x: 4.264911064067352,
							y: .20526680779794493
						},
						e: bw
					}]
				},
				{
					p: [bw, bg]
				},
				{
					p: [bg, {
						x: 4,
						y: 7,
						t: 2,
						s: bg,
						cp1: {
							x: .735088935932648,
							y: 10.794733192202056
						},
						cp2: {
							x: 5.264911064067352,
							y: 10.794733192202056
						},
						e: bY
					}]
				},
				{
					p: [bY, bw]
				},
				{
					p: [bw, {
						x: 5,
						y: 4,
						t: 2,
						s: bw,
						cp1: {
							x: 1.735088935932648,
							y: .20526680779794493
						},
						cp2: {
							x: 6.264911064067352,
							y: .20526680779794493
						},
						e: cm
					}]
				},
				{
					p: [cm, bY]
				},
				{
					p: [bY, {
						x: 6,
						y: 7,
						t: 2,
						s: bY,
						cp1: {
							x: 2.735088935932648,
							y: 10.794733192202056
						},
						cp2: {
							x: 7.264911064067352,
							y: 10.794733192202056
						},
						e: cO
					}]
				},
				{
					p: [cO, cm]
				}],
				qa: 1,
				t: 1,
				id: "2132435465",
				gI: 1e3
			},
			{
				d: [e, bO, de, dm, e, m, bG, dm, bO, bG, e, de, m, dm],
				l: [{
					p: [e, bO]
				},
				{
					p: [bO, {
						x: 7,
						y: 5,
						t: 3,
						s: bO,
						cp1: c$,
						cp2: c$,
						e: de
					}]
				},
				{
					p: [de, dm]
				},
				{
					p: [dm, e]
				},
				{
					p: [e, m]
				},
				{
					p: [m, {
						x: 3,
						y: 9,
						t: 3,
						s: m,
						cp1: s,
						cp2: s,
						e: bG
					}]
				},
				{
					p: [bG, dm]
				},
				{
					p: [dm, bO]
				},
				{
					p: [bO, bG]
				},
				{
					p: [bG, e]
				},
				{
					p: [e, de]
				},
				{
					p: [de, m]
				},
				{
					p: [m, dm]
				}],
				qa: 1,
				t: 1,
				id: "04770037430707",
				gI: 1e3
			},
			{
				d: [C, cG, cQ, M, C, cQ, C],
				l: [{
					p: [C, ba, {
						x: 5,
						y: 4,
						t: 3,
						s: ba,
						cp1: {
							x: 3.5,
							y: 5.5
						},
						cp2: {
							x: 3.5,
							y: 5.5
						},
						e: cm
					},
					cG]
				},
				{
					p: [cG, cm, {
						x: 5,
						y: 7,
						t: 3,
						s: cm,
						cp1: {
							x: 3.5,
							y: 5.5
						},
						cp2: {
							x: 3.5,
							y: 5.5
						},
						e: cs
					},
					cQ]
				},
				{
					p: [cQ, cs, {
						x: 2,
						y: 7,
						t: 3,
						s: cs,
						cp1: {
							x: 3.5,
							y: 5.5
						},
						cp2: {
							x: 3.5,
							y: 5.5
						},
						e: bg
					},
					M]
				},
				{
					p: [M, bg, {
						x: 2,
						y: 4,
						t: 3,
						s: bg,
						cp1: {
							x: 3.5,
							y: 5.5
						},
						cp2: {
							x: 3.5,
							y: 5.5
						},
						e: ba
					},
					C]
				},
				{
					p: [C, ck, ci, c$, dc, cI, cQ]
				},
				{
					p: [cQ, bi, bk, O, s, o, K, C]
				}],
				qa: 1,
				t: 1,
				id: "1661161",
				gI: 1e3
			},
			{
				d: [E, A, bw, cm, c$, dc, dg, dk, cq, bA, M, I, E, bs, ci, dc, cq, bw, I, bE, cu, dg, cm, bA, E],
				l: [{
					p: [E, A]
				},
				{
					p: [A, bw]
				},
				{
					p: [bw, cm]
				},
				{
					p: [cm, c$]
				},
				{
					p: [c$, dc]
				},
				{
					p: [dc, dg]
				},
				{
					p: [dg, dk]
				},
				{
					p: [dk, cq]
				},
				{
					p: [cq, bA]
				},
				{
					p: [bA, M]
				},
				{
					p: [M, I]
				},
				{
					p: [I, E]
				},
				{
					p: [E, bs]
				},
				{
					p: [bs, ci]
				},
				{
					p: [ci, dc]
				},
				{
					p: [dc, cq]
				},
				{
					p: [cq, bw]
				},
				{
					p: [bw, I]
				},
				{
					p: [I, bE]
				},
				{
					p: [bE, cu]
				},
				{
					p: [cu, dg]
				},
				{
					p: [dg, cm]
				},
				{
					p: [cm, bA]
				},
				{
					p: [bA, E]
				}],
				qa: 1,
				t: 1,
				id: "1135777753111357531357531",
				gI: 1e3
			},
			{
				d: [bI, dp, cY, bq, bI, co, bq, G, bI, Q, G, co, cY],
				l: [{
					p: [bI, dp]
				},
				{
					p: [dp, cY]
				},
				{
					p: [cY, bq]
				},
				{
					p: [bq, bI]
				},
				{
					p: [bI, co]
				},
				{
					p: [co, bq]
				},
				{
					p: [bq, G]
				},
				{
					p: [G, bI]
				},
				{
					p: [bI, Q]
				},
				{
					p: [Q, G]
				},
				{
					p: [G, co]
				},
				{
					p: [co, cY]
				}],
				qa: 3,
				t: 1,
				id: "3773353131157",
				gI: 1e3
			},
			{
				d: [by, bg, cO, de, by, $, cG, de, bg, G, $, de],
				l: [{
					p: [by, bg]
				},
				{
					p: [bg, cO]
				},
				{
					p: [cO, de]
				},
				{
					p: [de, by]
				},
				{
					p: [by, $]
				},
				{
					p: [$, cG]
				},
				{
					p: [cG, de]
				},
				{
					p: [de, bg]
				},
				{
					p: [bg, G]
				},
				{
					p: [G, $]
				},
				{
					p: [$, de]
				}],
				qa: 3,
				t: 1,
				id: "326732672127",
				gI: 1e3
			},
			{
				d: [U, cW, e, c$, U, dc, e, dg, U, dk, e, dp, U, cy, e, bI, U, Q, e],
				l: [{
					p: [U, cW]
				},
				{
					p: [cW, e]
				},
				{
					p: [e, c$]
				},
				{
					p: [c$, U]
				},
				{
					p: [U, dc]
				},
				{
					p: [dc, e]
				},
				{
					p: [e, dg]
				},
				{
					p: [dg, U]
				},
				{
					p: [U, dk]
				},
				{
					p: [dk, e]
				},
				{
					p: [e, dp]
				},
				{
					p: [dp, U]
				},
				{
					p: [U, cy]
				},
				{
					p: [cy, e]
				},
				{
					p: [e, bI]
				},
				{
					p: [bI, U]
				},
				{
					p: [U, Q]
				},
				{
					p: [Q, e]
				}],
				qa: 1,
				t: 1,
				id: "2707270727072503210",
				gI: 1e3
			},
			{
				d: [e, dk, cy, i, bq, da, bq, e, i],
				l: [{
					p: [e, A, C, $, ba, bw, by, bU, bW, cq, cs, cO, cQ, dk]
				},
				{
					p: [dk, cy]
				},
				{
					p: [cy, cw, ca, b$, bE, bC, bg, be, I, G, k, i]
				},
				{
					p: [i, bq]
				},
				{
					p: [bq, bs, bO, ck, cm, cI, cK, de, da]
				},
				{
					p: [da, bq]
				},
				{
					p: [bq, e]
				},
				{
					p: [e, i]
				}],
				qa: 3,
				t: 1,
				id: "075037300",
				gI: 1e3
			},
			{
				d: [bk, cw, cs, bg, bc, co, ck, $, bc, co, cs, bg, bk, cw],
				l: [{
					p: [bk, M, {
						x: 6,
						y: 8,
						t: 2,
						s: M,
						cp1: {
							x: -1.8284271247461903,
							y: 5.17157287525381
						},
						cp2: {
							x: 8.82842712474619,
							y: 5.17157287525381
						},
						e: cQ
					},
					cw]
				},
				{
					p: [cw, cs]
				},
				{
					p: [cs, cM, {
						x: 1,
						y: 6,
						t: 2,
						s: cM,
						cp1: {
							x: 8.82842712474619,
							y: 3.17157287525381
						},
						cp2: {
							x: -1.8284271247461903,
							y: 3.17157287525381
						},
						e: I
					},
					bg]
				},
				{
					p: [bg, bc]
				},
				{
					p: [bc, E, {
						x: 6,
						y: 4,
						t: 2,
						s: E,
						cp1: {
							x: -1.8284271247461903,
							y: 1.1715728752538102
						},
						cp2: {
							x: 8.82842712474619,
							y: 1.1715728752538102
						},
						e: cI
					},
					co]
				},
				{
					p: [co, ck]
				},
				{
					p: [ck, cE, {
						x: 1,
						y: 2,
						t: 2,
						s: cE,
						cp1: {
							x: 8.82842712474619,
							y: -0.8284271247461898
						},
						cp2: {
							x: -1.8284271247461903,
							y: -0.8284271247461898
						},
						e: A
					},
					$]
				},
				{
					p: [$, bc]
				},
				{
					p: [bc, co]
				},
				{
					p: [co, cs]
				},
				{
					p: [cs, bg]
				},
				{
					p: [bg, bk]
				},
				{
					p: [bk, bG, bq, bM, ca, cw]
				}],
				qa: 1,
				t: 1,
				id: "25522552255225",
				gI: 1e3
			},
			{
				d: [c, W, dk, dp, cs, cm, cY, cg, q, u, bg, ba, c, g, cy, dp, u, bm, da, cY, c],
				l: [{
					p: [c, W]
				},
				{
					p: [W, {
						x: 7,
						y: 8,
						t: 3,
						s: W,
						cp1: cY,
						cp2: cY,
						e: dk
					}]
				},
				{
					p: [dk, dp]
				},
				{
					p: [dp, cs]
				},
				{
					p: [cs, cm]
				},
				{
					p: [cm, cY]
				},
				{
					p: [cY, cg]
				},
				{
					p: [cg, {
						x: 0,
						y: 8,
						t: 3,
						s: cg,
						cp1: c,
						cp2: c,
						e: q
					}]
				},
				{
					p: [q, u]
				},
				{
					p: [u, bg]
				},
				{
					p: [bg, ba]
				},
				{
					p: [ba, c]
				},
				{
					p: [c, g]
				},
				{
					p: [g, {
						x: 5,
						y: 10,
						t: 3,
						s: g,
						cp1: u,
						cp2: u,
						e: cy
					}]
				},
				{
					p: [cy, dp]
				},
				{
					p: [dp, cw, bk, u]
				},
				{
					p: [u, bm]
				},
				{
					p: [bm, {
						x: 7,
						y: 3,
						t: 3,
						s: bm,
						cp1: dp,
						cp2: dp,
						e: da
					}]
				},
				{
					p: [da, cY]
				},
				{
					p: [cY, ci, Y, c]
				}],
				qa: 1,
				t: 1,
				id: "027755750022005702770",
				gI: 1e3
			},
			{
				d: [bs, de, bE, cO, G, cG, bs, G, bE, cS, cO, de, cG, cC, bs],
				l: [{
					p: [bs, bu, {
						x: 6,
						y: 5,
						t: 3,
						s: bu,
						cp1: by,
						cp2: by,
						e: cK
					},
					de]
				},
				{
					p: [de, cK, {
						x: 3,
						y: 7,
						t: 3,
						s: cK,
						cp1: by,
						cp2: by,
						e: bC
					},
					bE]
				},
				{
					p: [bE, cO]
				},
				{
					p: [cO, G]
				},
				{
					p: [G, cG]
				},
				{
					p: [cG, bs]
				},
				{
					p: [bs, G]
				},
				{
					p: [G, bE]
				},
				{
					p: [bE, cS]
				},
				{
					p: [cS, cO]
				},
				{
					p: [cO, de]
				},
				{
					p: [de, cG]
				},
				{
					p: [cG, cC]
				},
				{
					p: [cC, bs]
				}],
				qa: 1,
				t: 1,
				id: "373616313667663",
				gI: 1e3
			},
			{
				d: [k, de, ck, C, k, K, cs, de, c$, ck, cs, dk, de, C, c, k, s, K, de],
				l: [{
					p: [k, de]
				},
				{
					p: [de, ck]
				},
				{
					p: [ck, {
						x: 1,
						y: 3,
						t: 3,
						s: ck,
						cp1: {
							x: 2.333333333333333,
							y: .33333333333333304
						},
						cp2: {
							x: 2.333333333333333,
							y: .33333333333333304
						},
						e: C
					}]
				},
				{
					p: [C, k]
				},
				{
					p: [k, K]
				},
				{
					p: [K, {
						x: 5,
						y: 7,
						t: 3,
						s: K,
						cp1: {
							x: 2.333333333333334,
							y: 9.666666666666668
						},
						cp2: {
							x: 2.333333333333334,
							y: 9.666666666666668
						},
						e: cs
					}]
				},
				{
					p: [cs, de]
				},
				{
					p: [de, c$]
				},
				{
					p: [c$, ck]
				},
				{
					p: [ck, {
						x: 5,
						y: 7,
						t: 3,
						s: ck,
						cp1: G,
						cp2: G,
						e: cs
					}]
				},
				{
					p: [cs, dk]
				},
				{
					p: [dk, de]
				},
				{
					p: [de, C]
				},
				{
					p: [C, c]
				},
				{
					p: [c, k]
				},
				{
					p: [k, s]
				},
				{
					p: [s, K]
				},
				{
					p: [K, de]
				}],
				qa: 1,
				t: 1,
				id: "0751015775577100017",
				gI: 1e3
			},
			{
				d: [A, dk, de, G, A, dk, cG, A, bg, dk],
				l: [{
					p: [A, dk]
				},
				{
					p: [dk, de]
				},
				{
					p: [de, G]
				},
				{
					p: [G, A]
				},
				{
					p: [A, bO, b$, dk]
				},
				{
					p: [dk, cG]
				},
				{
					p: [cG, A]
				},
				{
					p: [A, bg]
				},
				{
					p: [bg, dk]
				}],
				qa: 5,
				t: 1,
				id: "1771176127",
				gI: 3064
			},
			{
				d: [M, G, bS, de, dk, G, C, bS, da, de, M, dk],
				l: [{
					p: [M, G]
				},
				{
					p: [G, bS]
				},
				{
					p: [bS, de]
				},
				{
					p: [de, dk]
				},
				{
					p: [dk, G]
				},
				{
					p: [G, C]
				},
				{
					p: [C, bS]
				},
				{
					p: [bS, da]
				},
				{
					p: [da, de]
				},
				{
					p: [de, M]
				},
				{
					p: [M, bG, cu, ci, {
						x: 3,
						y: 2,
						t: 2,
						s: ci,
						cp1: ce,
						cp2: bo,
						e: bs
					},
					bE, cw, dk]
				}],
				qa: 4,
				t: 1,
				id: "114771147717",
				gI: 1e3
			},
			{
				d: [G, $, ck, cK, cs, bg, G, ck, cs, $, bg, cK, G],
				l: [{
					p: [G, $]
				},
				{
					p: [$, {
						x: 5,
						y: 3,
						t: 3,
						s: $,
						cp1: {
							x: 3.5,
							y: 0
						},
						cp2: {
							x: 3.5,
							y: 0
						},
						e: ck
					}]
				},
				{
					p: [ck, cK]
				},
				{
					p: [cK, cs]
				},
				{
					p: [cs, {
						x: 2,
						y: 7,
						t: 3,
						s: cs,
						cp1: {
							x: 3.5,
							y: 10
						},
						cp2: {
							x: 3.5,
							y: 10
						},
						e: bg
					}]
				},
				{
					p: [bg, G]
				},
				{
					p: [G, ck]
				},
				{
					p: [ck, cs]
				},
				{
					p: [cs, $]
				},
				{
					p: [$, bg]
				},
				{
					p: [bg, cK]
				},
				{
					p: [cK, G]
				}],
				qa: 3,
				t: 1,
				id: "1256521552261",
				gI: 1e3
			},
			{
				d: [k, $, bg, k, bc, bO, b$, bc, co, c$, dk, co, $, bc, bg, co],
				l: [{
					p: [k, $]
				},
				{
					p: [$, {
						x: 2,
						y: 7,
						t: 2,
						s: $,
						cp1: {
							x: 4.82842712474619,
							y: .17157287525381015
						},
						cp2: {
							x: 4.82842712474619,
							y: 9.82842712474619
						},
						e: bg
					}]
				},
				{
					p: [bg, k]
				},
				{
					p: [k, bc]
				},
				{
					p: [bc, bO]
				},
				{
					p: [bO, {
						x: 4,
						y: 8,
						t: 2,
						s: bO,
						cp1: {
							x: 6.2188007849009175,
							y: -1.3282011773513749
						},
						cp2: {
							x: 6.2188007849009175,
							y: 11.328201177351374
						},
						e: b$
					}]
				},
				{
					p: [b$, bc]
				},
				{
					p: [bc, co]
				},
				{
					p: [co, c$]
				},
				{
					p: [c$, dk]
				},
				{
					p: [dk, co]
				},
				{
					p: [co, $]
				},
				{
					p: [$, bc]
				},
				{
					p: [bc, bg]
				},
				{
					p: [bg, co]
				}],
				qa: 3,
				t: 1,
				id: "0220244257752225",
				gI: 1e3
			},
			{
				d: [cE, by, k, cE],
				l: [{
					p: [cE, cQ, M, C, ck, cs, bg, ba, bS, bW, bA, by]
				},
				{
					p: [by, k]
				},
				{
					p: [k, s, dm, cY, c, e, cE]
				}],
				qa: 6,
				t: 1,
				id: "6306",
				gI: 1004
			},
			{
				d: [G, g, da, cK, cs, bg, G, o, di, cK, ck, $, G, ck, cs, $, cK, bg, $, ck, bg, cs, G],
				l: [{
					p: [G, g]
				},
				{
					p: [g, {
						x: 7,
						y: 3,
						t: 2,
						s: g,
						cp1: {
							x: -1.7888543819998322,
							y: -0.5777087639996634
						},
						cp2: {
							x: 8.788854381999831,
							y: -0.5777087639996634
						},
						e: da
					}]
				},
				{
					p: [da, cK]
				},
				{
					p: [cK, cs]
				},
				{
					p: [cs, {
						x: 2,
						y: 7,
						t: 3,
						s: cs,
						cp1: {
							x: 3.5,
							y: 10
						},
						cp2: {
							x: 3.5,
							y: 10
						},
						e: bg
					}]
				},
				{
					p: [bg, G]
				},
				{
					p: [G, o]
				},
				{
					p: [o, {
						x: 7,
						y: 7,
						t: 2,
						s: o,
						cp1: {
							x: -1.7888543819998322,
							y: 10.577708763999663
						},
						cp2: {
							x: 8.788854381999831,
							y: 10.577708763999663
						},
						e: di
					}]
				},
				{
					p: [di, cK]
				},
				{
					p: [cK, ck]
				},
				{
					p: [ck, {
						x: 2,
						y: 3,
						t: 3,
						s: ck,
						cp1: {
							x: 3.5,
							y: 0
						},
						cp2: {
							x: 3.5,
							y: 0
						},
						e: $
					}]
				},
				{
					p: [$, G]
				},
				{
					p: [G, ck]
				},
				{
					p: [ck, cs]
				},
				{
					p: [cs, $]
				},
				{
					p: [$, cK]
				},
				{
					p: [cK, bg]
				},
				{
					p: [bg, $]
				},
				{
					p: [$, ck]
				},
				{
					p: [ck, bg]
				},
				{
					p: [bg, cs]
				},
				{
					p: [cs, G]
				}],
				qa: 4,
				t: 1,
				id: "10765210765215526225251",
				gI: 1e3
			},
			{
				d: [Q, cU, dk, q, Q, be, cq, cU, cI, E, Q, dk, be, E, cI, cq, q, cU],
				l: [{
					p: [Q, bI, bo, bK, cc, cU]
				},
				{
					p: [cU, dk]
				},
				{
					p: [dk, {
						x: 0,
						y: 8,
						t: 2,
						s: dk,
						cp1: {
							x: 8.788854381999831,
							y: 4.422291236000337
						},
						cp2: {
							x: -1.7888543819998322,
							y: 4.422291236000337
						},
						e: q
					}]
				},
				{
					p: [q, Q]
				},
				{
					p: [Q, be]
				},
				{
					p: [be, {
						x: 5,
						y: 6,
						t: 3,
						s: be,
						cp1: {
							x: 3.5,
							y: 0
						},
						cp2: {
							x: 3.5,
							y: 0
						},
						e: cq
					}]
				},
				{
					p: [cq, cU]
				},
				{
					p: [cU, cI]
				},
				{
					p: [cI, {
						x: 1,
						y: 4,
						t: 2,
						s: cI,
						cp1: {
							x: 6,
							y: -1
						},
						cp2: {
							x: 1,
							y: -1
						},
						e: E
					}]
				},
				{
					p: [E, Q]
				},
				{
					p: [Q, dk]
				},
				{
					p: [dk, be]
				},
				{
					p: [be, E]
				},
				{
					p: [E, cI]
				},
				{
					p: [cI, cq]
				},
				{
					p: [cq, q]
				},
				{
					p: [q, cU]
				}],
				qa: 4,
				t: 1,
				id: "167012566117216506",
				gI: 1e3
			},
			{
				d: [co, bg, cs, bc, ck, $, co, dc, ck, bg, m, bc, i, $, cs, dg, co],
				l: [{
					p: [co, bg]
				},
				{
					p: [bg, {
						x: 5,
						y: 7,
						t: 2,
						s: bg,
						cp1: {
							x: -0.4961508830135313,
							y: 8.664100588675687
						},
						cp2: {
							x: 7.496150883013531,
							y: 8.664100588675687
						},
						e: cs
					}]
				},
				{
					p: [cs, bc]
				},
				{
					p: [bc, ck]
				},
				{
					p: [ck, {
						x: 2,
						y: 3,
						t: 2,
						s: ck,
						cp1: {
							x: 7.496150883013531,
							y: 1.3358994113243128
						},
						cp2: {
							x: -0.4961508830135313,
							y: 1.3358994113243128
						},
						e: $
					}]
				},
				{
					p: [$, co]
				},
				{
					p: [co, dc]
				},
				{
					p: [dc, ck]
				},
				{
					p: [ck, bg]
				},
				{
					p: [bg, m]
				},
				{
					p: [m, bc]
				},
				{
					p: [bc, i]
				},
				{
					p: [i, $]
				},
				{
					p: [$, cs]
				},
				{
					p: [cs, dg]
				},
				{
					p: [dg, co]
				}],
				qa: 4,
				t: 1,
				id: "52525257520202575",
				gI: 1e3
			},
			{
				d: [cc, bi, cQ, cc, bY, bc, cK, bY, bS, Y, cE, bS, bc, bi, bm, cc, cU, cQ, cK, cE, bM, Y, bc, cc, cK, bS],
				l: [{
					p: [cc, bi]
				},
				{
					p: [bi, {
						x: 6,
						y: 8,
						t: 2,
						s: bi,
						cp1: {
							x: -0.8284271247461903,
							y: 5.17157287525381
						},
						cp2: {
							x: 8.82842712474619,
							y: 5.17157287525381
						},
						e: cQ
					}]
				},
				{
					p: [cQ, cc]
				},
				{
					p: [cc, bY]
				},
				{
					p: [bY, bc]
				},
				{
					p: [bc, {
						x: 6,
						y: 5,
						t: 2,
						s: bc,
						cp1: {
							x: -0.8284271247461903,
							y: 2.17157287525381
						},
						cp2: {
							x: 8.82842712474619,
							y: 2.17157287525381
						},
						e: cK
					}]
				},
				{
					p: [cK, bY]
				},
				{
					p: [bY, bS]
				},
				{
					p: [bS, Y]
				},
				{
					p: [Y, {
						x: 6,
						y: 2,
						t: 2,
						s: Y,
						cp1: {
							x: -0.8284271247461903,
							y: -0.8284271247461898
						},
						cp2: {
							x: 8.82842712474619,
							y: -0.8284271247461898
						},
						e: cE
					}]
				},
				{
					p: [cE, bS]
				},
				{
					p: [bS, bc]
				},
				{
					p: [bc, bi]
				},
				{
					p: [bi, bm]
				},
				{
					p: [bm, cc]
				},
				{
					p: [cc, cU]
				},
				{
					p: [cU, cQ]
				},
				{
					p: [cQ, cK]
				},
				{
					p: [cK, cE]
				},
				{
					p: [cE, bM]
				},
				{
					p: [bM, Y]
				},
				{
					p: [Y, bc]
				},
				{
					p: [bc, cc]
				},
				{
					p: [cc, cK]
				},
				{
					p: [cK, bS]
				}],
				qa: 1,
				t: 1,
				id: "42644264426422246666422464",
				gI: 1e3
			},
			{
				d: [bi, $, cu, ck, $, k, bi, cu, dg, ck, k, dg, bi],
				l: [{
					p: [bi, $]
				},
				{
					p: [$, {
						x: 5,
						y: 8,
						t: 2,
						s: $,
						cp1: {
							x: 2,
							y: -2.8309518948453007
						},
						cp2: {
							x: 5,
							y: 13.830951894845299
						},
						e: cu
					}]
				},
				{
					p: [cu, ck]
				},
				{
					p: [ck, $]
				},
				{
					p: [$, k]
				},
				{
					p: [k, bi]
				},
				{
					p: [bi, cu]
				},
				{
					p: [cu, dg]
				},
				{
					p: [dg, ck]
				},
				{
					p: [ck, k]
				},
				{
					p: [k, dg]
				},
				{
					p: [dg, bi]
				}],
				qa: 3,
				t: 1,
				id: "2255202575072",
				gI: 1e3
			},
			{
				d: [k, ba, cm, de, cq, be, k, cm, be, de, ba, cq, k],
				l: [{
					p: [k, ba]
				},
				{
					p: [ba, {
						x: 5,
						y: 4,
						t: 3,
						s: ba,
						cp1: {
							x: 3.5,
							y: 3.25
						},
						cp2: {
							x: 3.5,
							y: 3.25
						},
						e: cm
					}]
				},
				{
					p: [cm, de]
				},
				{
					p: [de, cq]
				},
				{
					p: [cq, {
						x: 2,
						y: 6,
						t: 3,
						s: cq,
						cp1: {
							x: 3.5,
							y: 6.75
						},
						cp2: {
							x: 3.5,
							y: 6.75
						},
						e: be
					}]
				},
				{
					p: [be, k]
				},
				{
					p: [k, C, {
						x: 4,
						y: 3,
						t: 3,
						s: C,
						cp1: W,
						cp2: W,
						e: bQ
					},
					cm]
				},
				{
					p: [cm, be]
				},
				{
					p: [be, bC, {
						x: 6,
						y: 7,
						t: 3,
						s: bC,
						cp1: cw,
						cp2: cw,
						e: cO
					},
					de]
				},
				{
					p: [de, cG, {
						x: 3,
						y: 3,
						t: 3,
						s: cG,
						cp1: cg,
						cp2: cg,
						e: bu
					},
					ba]
				},
				{
					p: [ba, cq]
				},
				{
					p: [cq, bY, {
						x: 1,
						y: 7,
						t: 3,
						s: bY,
						cp1: bk,
						cp2: bk,
						e: K
					},
					k]
				}],
				qa: 3,
				t: 1,
				id: "0257520527250",
				gI: 1e3
			},
			{
				d: [bO, de, b$, G, bO, cO, bg, $, cG, cO, G, cG, b$, $, de, bg, bO],
				l: [{
					p: [bO, de]
				},
				{
					p: [de, b$]
				},
				{
					p: [b$, G]
				},
				{
					p: [G, bO]
				},
				{
					p: [bO, cO]
				},
				{
					p: [cO, bg]
				},
				{
					p: [bg, $]
				},
				{
					p: [$, cG]
				},
				{
					p: [cG, cO]
				},
				{
					p: [cO, G]
				},
				{
					p: [G, cG]
				},
				{
					p: [cG, b$]
				},
				{
					p: [b$, $]
				},
				{
					p: [$, de]
				},
				{
					p: [de, bg]
				},
				{
					p: [bg, bO]
				}],
				qa: 3,
				t: 2,
				id: "47414622661642724",
				gI: 1e3
			},
			{
				d: [bm, cw, cs, be, ba, ck, cg, U, Y, ck, co, be, bi, cw, cg, Y, ba, co, cs, bi, bm, U],
				l: [{
					p: [bm, cw]
				},
				{
					p: [cw, {
						x: 5,
						y: 7,
						t: 3,
						s: cw,
						cp1: du,
						cp2: du,
						e: cs
					}]
				},
				{
					p: [cs, be]
				},
				{
					p: [be, {
						x: 2,
						y: 4,
						t: 3,
						s: be,
						cp1: {
							x: -1,
							y: 5
						},
						cp2: {
							x: -1,
							y: 5
						},
						e: ba
					}]
				},
				{
					p: [ba, ck]
				},
				{
					p: [ck, {
						x: 5,
						y: 1,
						t: 3,
						s: ck,
						cp1: dr,
						cp2: dr,
						e: cg
					}]
				},
				{
					p: [cg, U]
				},
				{
					p: [U, Y]
				},
				{
					p: [Y, ck]
				},
				{
					p: [ck, {
						x: 5,
						y: 5,
						t: 3,
						s: ck,
						cp1: ds,
						cp2: ds,
						e: co
					}]
				},
				{
					p: [co, be]
				},
				{
					p: [be, {
						x: 2,
						y: 8,
						t: 3,
						s: be,
						cp1: {
							x: -1,
							y: 7
						},
						cp2: {
							x: -1,
							y: 7
						},
						e: bi
					}]
				},
				{
					p: [bi, cw]
				},
				{
					p: [cw, cy, dp, cW, ce, cg]
				},
				{
					p: [cg, Y]
				},
				{
					p: [Y, {
						x: 2,
						y: 4,
						t: 3,
						s: Y,
						cp1: {
							x: -1,
							y: 3
						},
						cp2: {
							x: -1,
							y: 3
						},
						e: ba
					}]
				},
				{
					p: [ba, co]
				},
				{
					p: [co, {
						x: 5,
						y: 7,
						t: 3,
						s: co,
						cp1: dt,
						cp2: dt,
						e: cs
					}]
				},
				{
					p: [cs, bi]
				},
				{
					p: [bi, bm]
				},
				{
					p: [bm, u, a, U]
				}],
				qa: 3,
				t: 2,
				id: "2552255225522552255222",
				gI: 1e3
			},
			{
				d: [A, cE, cO, K, A, cO, cU, Q, K, cU, cE, bU, bu, bU],
				l: [{
					p: [A, cE]
				},
				{
					p: [cE, cO]
				},
				{
					p: [cO, K]
				},
				{
					p: [K, A]
				},
				{
					p: [A, e, m, dg, di, cO]
				},
				{
					p: [cO, cU]
				},
				{
					p: [cU, Q]
				},
				{
					p: [Q, K]
				},
				{
					p: [K, o, s, dm, dp, cU]
				},
				{
					p: [cU, cu, cg, cY, c$, cE]
				},
				{
					p: [cE, cA, a, c, bM, bU]
				},
				{
					p: [bU, bc, ba, dc, da, bu]
				},
				{
					p: [bu, bE, b$, bU]
				}],
				qa: 2,
				t: 2,
				id: "16611661166434",
				gI: 1e3
			},
			{
				d: [E, bS, bs, E, I, bW, bE, I, bS, bs, A, bW, bE, M, bS, bW],
				l: [{
					p: [E, bS]
				},
				{
					p: [bS, {
						x: 3,
						y: 2,
						t: 2,
						s: bS,
						cp1: ds,
						cp2: {
							x: 5.82842712474619,
							y: -0.8284271247461898
						},
						e: bs
					}]
				},
				{
					p: [bs, E]
				},
				{
					p: [E, I]
				},
				{
					p: [I, bW]
				},
				{
					p: [bW, {
						x: 3,
						y: 8,
						t: 2,
						s: bW,
						cp1: dt,
						cp2: {
							x: 5.82842712474619,
							y: 10.82842712474619
						},
						e: bE
					}]
				},
				{
					p: [bE, I]
				},
				{
					p: [I, bS]
				},
				{
					p: [bS, bs]
				},
				{
					p: [bs, A]
				},
				{
					p: [A, bW]
				},
				{
					p: [bW, bE]
				},
				{
					p: [bE, M]
				},
				{
					p: [M, bS]
				},
				{
					p: [bS, cI, dg, dp, u, a, cW, dc, cM, bW]
				}],
				qa: 5,
				t: 2,
				id: "1431143143143144",
				gI: 5096
			},
			{
				d: [E, o, di, cI, c$, ci, cI, E, e, Y, E, be, cq, cI, cu, cq, bi, E],
				l: [{
					p: [E, o]
				},
				{
					p: [o, {
						x: 7,
						y: 7,
						t: 2,
						s: o,
						cp1: {
							x: -1.2649110640673518,
							y: 10.794733192202056
						},
						cp2: {
							x: 8.264911064067352,
							y: 10.794733192202056
						},
						e: di
					}]
				},
				{
					p: [di, cI]
				},
				{
					p: [cI, c$]
				},
				{
					p: [c$, {
						x: 5,
						y: 2,
						t: 2,
						s: c$,
						cp1: {
							x: 8.788854381999831,
							y: -1.5777087639996634
						},
						cp2: {
							x: 3.2111456180001676,
							y: -1.5777087639996634
						},
						e: ci
					}]
				},
				{
					p: [ci, cI]
				},
				{
					p: [cI, E]
				},
				{
					p: [E, e]
				},
				{
					p: [e, {
						x: 2,
						y: 2,
						t: 2,
						s: e,
						cp1: {
							x: -1.7888543819998322,
							y: -1.5777087639996634
						},
						cp2: {
							x: 3.7888543819998324,
							y: -1.5777087639996634
						},
						e: Y
					}]
				},
				{
					p: [Y, E]
				},
				{
					p: [E, be]
				},
				{
					p: [be, bA, bo, bK, bW, cq]
				},
				{
					p: [cq, cI]
				},
				{
					p: [cI, dc, de, cM, cQ, dm, dp, cU, cw, cu]
				},
				{
					p: [cu, cq]
				},
				{
					p: [cq, bi]
				},
				{
					p: [bi, bk, Q, u, s, M, I, k, i, E]
				}],
				qa: 3,
				t: 2,
				id: "107675610212565521",
				gI: 1e3
			},
			{
				d: [C, cG, cK, bU, bc, k, C, bc, bq, bU, cg, bq, cK],
				l: [{
					p: [C, cG]
				},
				{
					p: [cG, cE, c$, di, cw, ca, cO, cK]
				},
				{
					p: [cK, cq, cs, bG, bk, bY, bW, bU]
				},
				{
					p: [bU, bA, bC, O, s, bg, bc]
				},
				{
					p: [bc, k]
				},
				{
					p: [k, C]
				},
				{
					p: [C, bc]
				},
				{
					p: [bc, W, bq]
				},
				{
					p: [bq, bU]
				},
				{
					p: [bU, cg]
				},
				{
					p: [cg, bq]
				},
				{
					p: [bq, cK]
				}],
				qa: 1,
				t: 2,
				id: "1664201234536",
				gI: 1e3
			},
			{
				d: [E, A, bw, E, I, M, bA, I, bw, cq, dc, dg, cm, bA, E, bM, c$, dc, cm, cq, dg, dk, ca, I],
				l: [{
					p: [E, A]
				},
				{
					p: [A, {
						x: 3,
						y: 4,
						t: 2,
						s: A,
						cp1: {
							x: 1,
							y: -2
						},
						cp2: dc,
						e: bw
					}]
				},
				{
					p: [bw, E]
				},
				{
					p: [E, I]
				},
				{
					p: [I, M]
				},
				{
					p: [M, {
						x: 3,
						y: 6,
						t: 2,
						s: M,
						cp1: T,
						cp2: dg,
						e: bA
					}]
				},
				{
					p: [bA, I]
				},
				{
					p: [I, bw]
				},
				{
					p: [bw, cq]
				},
				{
					p: [cq, dc]
				},
				{
					p: [dc, dg]
				},
				{
					p: [dg, cm]
				},
				{
					p: [cm, bA]
				},
				{
					p: [bA, E]
				},
				{
					p: [E, bM]
				},
				{
					p: [bM, c$]
				},
				{
					p: [c$, dc]
				},
				{
					p: [dc, cm]
				},
				{
					p: [cm, cq]
				},
				{
					p: [cq, dg]
				},
				{
					p: [dg, dk]
				},
				{
					p: [dk, ca]
				},
				{
					p: [ca, I]
				}],
				qa: 2,
				t: 2,
				id: "113111313577531477557741",
				gI: 1e3
			},
			{
				d: [K, cs, G, co, K, ck, cC, bM, ck, bu, bM, W, bu, C, W, c, C, cC],
				l: [{
					p: [K, cs]
				},
				{
					p: [cs, G]
				},
				{
					p: [G, co]
				},
				{
					p: [co, K]
				},
				{
					p: [K, O, {
						x: 5,
						y: 3,
						t: 3,
						s: O,
						cp1: S,
						cp2: S,
						e: ck
					}]
				},
				{
					p: [ck, cC]
				},
				{
					p: [cC, bM]
				},
				{
					p: [bM, ck]
				},
				{
					p: [ck, bu]
				},
				{
					p: [bu, bM]
				},
				{
					p: [bM, W]
				},
				{
					p: [W, bu]
				},
				{
					p: [bu, C]
				},
				{
					p: [C, W]
				},
				{
					p: [W, c]
				},
				{
					p: [c, C]
				},
				{
					p: [C, ba, cm, cG, c$, cC]
				}],
				qa: 2,
				t: 2,
				id: "151515645342312016",
				gI: 1e3
			},
			{
				d: [G, bw, cm, de, ci, bs, G, bA, cq, de, cu, bE, G, C, bw, bA, cu, cq, cm, da, de, di, cq, bw, ci, cm, bs, bw, bA, bE, cq, K, bA, cm, C],
				l: [{
					p: [G, bw]
				},
				{
					p: [bw, {
						x: 5,
						y: 4,
						t: 3,
						s: bw,
						cp1: {
							x: 4,
							y: 3.5
						},
						cp2: {
							x: 4,
							y: 3.5
						},
						e: cm
					}]
				},
				{
					p: [cm, de]
				},
				{
					p: [de, ci]
				},
				{
					p: [ci, {
						x: 3,
						y: 2,
						t: 3,
						s: ci,
						cp1: {
							x: 4,
							y: .5
						},
						cp2: {
							x: 4,
							y: .5
						},
						e: bs
					}]
				},
				{
					p: [bs, G]
				},
				{
					p: [G, bA]
				},
				{
					p: [bA, {
						x: 5,
						y: 6,
						t: 3,
						s: bA,
						cp1: {
							x: 4,
							y: 6.5
						},
						cp2: {
							x: 4,
							y: 6.5
						},
						e: cq
					}]
				},
				{
					p: [cq, de]
				},
				{
					p: [de, cu]
				},
				{
					p: [cu, {
						x: 3,
						y: 8,
						t: 3,
						s: cu,
						cp1: {
							x: 4,
							y: 9.5
						},
						cp2: {
							x: 4,
							y: 9.5
						},
						e: bE
					}]
				},
				{
					p: [bE, G]
				},
				{
					p: [G, C]
				},
				{
					p: [C, bw]
				},
				{
					p: [bw, bA]
				},
				{
					p: [bA, cu]
				},
				{
					p: [cu, cq]
				},
				{
					p: [cq, cm]
				},
				{
					p: [cm, da]
				},
				{
					p: [da, de]
				},
				{
					p: [de, di]
				},
				{
					p: [di, cq]
				},
				{
					p: [cq, bw]
				},
				{
					p: [bw, ci]
				},
				{
					p: [ci, cm]
				},
				{
					p: [cm, bs]
				},
				{
					p: [bs, bw]
				},
				{
					p: [bw, y, c, i, s, O, bA]
				},
				{
					p: [bA, bE]
				},
				{
					p: [bE, cq]
				},
				{
					p: [cq, dm, bG, K, K]
				},
				{
					p: [K, bA]
				},
				{
					p: [bA, cm]
				},
				{
					p: [cm, cY, bq, C]
				}],
				qa: 1,
				t: 2,
				id: "13575313575311335557775355333351351",
				gI: 1e3
			},
			{
				d: [k, bs, b$, de, da, bs, k, o, b$, de],
				l: [{
					p: [k, bs]
				},
				{
					p: [bs, b$]
				},
				{
					p: [b$, de]
				},
				{
					p: [de, i, da]
				},
				{
					p: [da, bs]
				},
				{
					p: [bs, g, dc, k]
				},
				{
					p: [k, dg, o]
				},
				{
					p: [o, b$]
				},
				{
					p: [b$, di, m, de]
				}],
				qa: 1,
				t: 2,
				id: "0347730047",
				gI: 1e3
			},
			{
				d: [q, dk, de, k, q, Y, ba, k, be, de, bW, be, bk, bW, ca, dk, bk, q, be, ca],
				l: [{
					p: [q, dk]
				},
				{
					p: [dk, de]
				},
				{
					p: [de, {
						x: 0,
						y: 5,
						t: 2,
						s: de,
						cp1: {
							x: 7,
							y: -2
						},
						cp2: {
							x: 4.440892098500626e-16,
							y: -2
						},
						e: k
					}]
				},
				{
					p: [k, q]
				},
				{
					p: [q, O, A, c, a, w, W, cg, cA, cW, cY, cE, Y]
				},
				{
					p: [Y, $, cG, cI, ba]
				},
				{
					p: [ba, k]
				},
				{
					p: [k, be]
				},
				{
					p: [be, bc, de]
				},
				{
					p: [de, cM, bW]
				},
				{
					p: [bW, be]
				},
				{
					p: [be, bk]
				},
				{
					p: [bk, bG, bC, bW]
				},
				{
					p: [bW, ca]
				},
				{
					p: [ca, cw, cs, cO, cS, dk]
				},
				{
					p: [dk, dp, bI, bk]
				},
				{
					p: [bk, Q, u, q]
				},
				{
					p: [q, be]
				},
				{
					p: [be, ca]
				}],
				qa: 3,
				t: 2,
				id: "07700220274224472024",
				gI: 1e3
			},
			{
				d: [C, bs, bw, dg, bW, bw, be, C, m, be, bE, M, m, bs],
				l: [{
					p: [C, ck, cs, cG, cO, da, c$, bO, bs]
				},
				{
					p: [bs, bw]
				},
				{
					p: [bw, dg]
				},
				{
					p: [dg, di, cQ, cu, bY, bW]
				},
				{
					p: [bW, bw]
				},
				{
					p: [bw, be]
				},
				{
					p: [be, C]
				},
				{
					p: [C, m]
				},
				{
					p: [m, be]
				},
				{
					p: [be, bE]
				},
				{
					p: [bE, M]
				},
				{
					p: [M, m]
				},
				{
					p: [m, g, A, bs]
				}],
				qa: 3,
				t: 2,
				id: "13374321023103",
				gI: 1e3
			},
			{
				d: [ba, bi, cu, bW, cM, cI, bS, I, bi, bW, ba, bs, bS, ci, cI, bW],
				l: [{
					p: [ba, bi]
				},
				{
					p: [bi, cu]
				},
				{
					p: [cu, bW]
				},
				{
					p: [bW, cM]
				},
				{
					p: [cM, cI]
				},
				{
					p: [cI, bS]
				},
				{
					p: [bS, I]
				},
				{
					p: [I, bi]
				},
				{
					p: [bi, bW]
				},
				{
					p: [bW, ba]
				},
				{
					p: [ba, bs]
				},
				{
					p: [bs, bS]
				},
				{
					p: [bS, ci]
				},
				{
					p: [ci, cI]
				},
				{
					p: [cI, bW]
				}],
				qa: 3,
				t: 2,
				id: "2254664124234564",
				gI: 1e3
			},
			{
				d: [cI, E, bq, E, cq, bq, cI, cq, ca, O, ca],
				l: [{
					p: [cI, E]
				},
				{
					p: [E, i, k, bc, W, bq]
				},
				{
					p: [bq, bA, I, E]
				},
				{
					p: [E, C, ck, cq]
				},
				{
					p: [cq, bW, bO, e, c, y, w, bo, bq]
				},
				{
					p: [bq, bM, bK, ce, ci, cE, cA, cW, da, cG, cI]
				},
				{
					p: [cI, cU, dp, dg, cq]
				},
				{
					p: [cq, cw, cy, cc, ca]
				},
				{
					p: [ca, bY, o, u, Q, O]
				},
				{
					p: [O, M, bi, bm, bI, bG, ca]
				}],
				qa: 5,
				t: 2,
				id: "61315365414",
				gI: 1e3
			},
			{
				d: [O, o, di, cS, cI, c$, e, E, O, cI, e, W, cg, c$, E, cS, o, cI, W, E, cg, cI, di, E, o, cg, O, di, W, cS],
				l: [{
					p: [O, o]
				},
				{
					p: [o, {
						x: 7,
						y: 7,
						t: 2,
						s: o,
						cp1: {
							x: -1.7888543819998322,
							y: 3.422291236000337
						},
						cp2: {
							x: 8.788854381999831,
							y: 3.422291236000337
						},
						e: di
					}]
				},
				{
					p: [di, cS]
				},
				{
					p: [cS, cI]
				},
				{
					p: [cI, c$]
				},
				{
					p: [c$, {
						x: 0,
						y: 2,
						t: 2,
						s: c$,
						cp1: {
							x: 8.788854381999831,
							y: -1.5777087639996634
						},
						cp2: {
							x: -1.7888543819998322,
							y: -1.5777087639996634
						},
						e: e
					}]
				},
				{
					p: [e, E]
				},
				{
					p: [E, O]
				},
				{
					p: [O, cI]
				},
				{
					p: [cI, e]
				},
				{
					p: [e, W]
				},
				{
					p: [W, cg]
				},
				{
					p: [cg, c$]
				},
				{
					p: [c$, E]
				},
				{
					p: [E, cS]
				},
				{
					p: [cS, o]
				},
				{
					p: [o, cI]
				},
				{
					p: [cI, W]
				},
				{
					p: [W, E]
				},
				{
					p: [E, cg]
				},
				{
					p: [cg, cI]
				},
				{
					p: [cI, di]
				},
				{
					p: [di, E]
				},
				{
					p: [E, o]
				},
				{
					p: [o, cg]
				},
				{
					p: [cg, O]
				},
				{
					p: [O, di]
				},
				{
					p: [di, W]
				},
				{
					p: [W, cS]
				}],
				qa: 4,
				t: 2,
				id: "107667011602571606215671051726",
				gI: 2040
			},
			{
				d: [g, Y, bQ, cE, cI, bQ, ba, g, k, ba, bU, cI, cM, bU, be, k, o, be, bY, cM, cQ, bY, bi, o, s, bi, cQ, bU, bY, o, ba, Y, c, g, bQ, bU, cE, bM, Y, cE, cQ, ca, bi, be, g],
				l: [{
					p: [g, Y]
				},
				{
					p: [Y, bQ]
				},
				{
					p: [bQ, cE]
				},
				{
					p: [cE, cI]
				},
				{
					p: [cI, bQ]
				},
				{
					p: [bQ, ba]
				},
				{
					p: [ba, g]
				},
				{
					p: [g, k]
				},
				{
					p: [k, ba]
				},
				{
					p: [ba, bU]
				},
				{
					p: [bU, cI]
				},
				{
					p: [cI, cM]
				},
				{
					p: [cM, bU]
				},
				{
					p: [bU, be]
				},
				{
					p: [be, k]
				},
				{
					p: [k, o]
				},
				{
					p: [o, be]
				},
				{
					p: [be, bY]
				},
				{
					p: [bY, cM]
				},
				{
					p: [cM, cQ]
				},
				{
					p: [cQ, bY]
				},
				{
					p: [bY, bi]
				},
				{
					p: [bi, o]
				},
				{
					p: [o, s]
				},
				{
					p: [s, bi]
				},
				{
					p: [bi, cQ]
				},
				{
					p: [cQ, bU]
				},
				{
					p: [bU, bY]
				},
				{
					p: [bY, o]
				},
				{
					p: [o, ba]
				},
				{
					p: [ba, Y]
				},
				{
					p: [Y, c]
				},
				{
					p: [c, g]
				},
				{
					p: [g, bQ]
				},
				{
					p: [bQ, bU]
				},
				{
					p: [bU, cE]
				},
				{
					p: [cE, bM]
				},
				{
					p: [bM, Y]
				},
				{
					p: [Y, cE]
				},
				{
					p: [cE, de, cQ]
				},
				{
					p: [cQ, ca]
				},
				{
					p: [ca, bi]
				},
				{
					p: [bi, be]
				},
				{
					p: [be, g]
				}],
				qa: 4,
				t: 2,
				id: "024664200246642002466420026440220044642664220",
				gI: 1e3
			},
			{
				d: [k, g, bc, co, da, de, Y, bc, ci, co, cu, bc, bi, o, k, bi, co, de, bi, cu, di, de, cu, Y, g, da, ci, Y, k, bc, o, di, co, Y, c, ci, bi, s, cu],
				l: [{
					p: [k, g]
				},
				{
					p: [g, bc]
				},
				{
					p: [bc, co]
				},
				{
					p: [co, da]
				},
				{
					p: [da, de]
				},
				{
					p: [de, Y]
				},
				{
					p: [Y, bc]
				},
				{
					p: [bc, ci]
				},
				{
					p: [ci, co]
				},
				{
					p: [co, cu]
				},
				{
					p: [cu, bc]
				},
				{
					p: [bc, bi]
				},
				{
					p: [bi, o]
				},
				{
					p: [o, k]
				},
				{
					p: [k, bi]
				},
				{
					p: [bi, co]
				},
				{
					p: [co, de]
				},
				{
					p: [de, bi]
				},
				{
					p: [bi, cu]
				},
				{
					p: [cu, di]
				},
				{
					p: [di, de]
				},
				{
					p: [de, cu]
				},
				{
					p: [cu, Y]
				},
				{
					p: [Y, g]
				},
				{
					p: [g, da]
				},
				{
					p: [da, ci]
				},
				{
					p: [ci, Y]
				},
				{
					p: [Y, k]
				},
				{
					p: [k, bc]
				},
				{
					p: [bc, o]
				},
				{
					p: [o, di]
				},
				{
					p: [di, co]
				},
				{
					p: [co, Y]
				},
				{
					p: [Y, c]
				},
				{
					p: [c, ci]
				},
				{
					p: [ci, bi]
				},
				{
					p: [bi, s]
				},
				{
					p: [s, cu]
				}],
				qa: 4,
				t: 2,
				id: "002577225552200257257752075202075205205",
				gI: 1e3
			},
			{
				d: [bE, cu, dg, dc, ci, bs, E, I, bE, ci, I, dc, cu, E, dg, bs, cu, I, bs, dc, bE, E, ci, dg, bE],
				l: [{
					p: [bE, cu]
				},
				{
					p: [cu, dg]
				},
				{
					p: [dg, dc]
				},
				{
					p: [dc, ci]
				},
				{
					p: [ci, bs]
				},
				{
					p: [bs, E]
				},
				{
					p: [E, I]
				},
				{
					p: [I, bE]
				},
				{
					p: [bE, ci]
				},
				{
					p: [ci, I]
				},
				{
					p: [I, dc]
				},
				{
					p: [dc, cu]
				},
				{
					p: [cu, E]
				},
				{
					p: [E, dg]
				},
				{
					p: [dg, bs]
				},
				{
					p: [bs, cu]
				},
				{
					p: [cu, I]
				},
				{
					p: [I, bs]
				},
				{
					p: [bs, dc]
				},
				{
					p: [dc, bE]
				},
				{
					p: [bE, E]
				},
				{
					p: [E, ci]
				},
				{
					p: [ci, dg]
				},
				{
					p: [dg, bE]
				}],
				qa: 4,
				t: 2,
				id: "3577531135175173513731573",
				gI: 1e3
			},
			{
				d: [bg, cm, o, bg, dc, cm, c$, dc, dg, bk, s, o, bk, bg, k, ci, dc],
				l: [{
					p: [bg, ba, {
						x: 5,
						y: 7,
						t: 2,
						s: ba,
						cp1: {
							x: 2,
							y: -0.24264068711928477
						},
						cp2: {
							x: 5,
							y: 11.242640687119284
						},
						e: cs
					},
					cm]
				},
				{
					p: [cm, o]
				},
				{
					p: [o, bg]
				},
				{
					p: [bg, dc]
				},
				{
					p: [dc, cm]
				},
				{
					p: [cm, c$]
				},
				{
					p: [c$, dc]
				},
				{
					p: [dc, dg]
				},
				{
					p: [dg, bk]
				},
				{
					p: [bk, s]
				},
				{
					p: [s, o]
				},
				{
					p: [o, bk]
				},
				{
					p: [bk, bg]
				},
				{
					p: [bg, k]
				},
				{
					p: [k, ci]
				},
				{
					p: [ci, dc]
				}],
				qa: 4,
				t: 2,
				id: "25027577720022057",
				gI: 1e3
			},
			{
				d: [bG, I, bW, bG, ba, cI, bW, ba, I, O, bG, cw, bW, cM, cw, dm, cM, cI, O],
				l: [{
					p: [bG, I]
				},
				{
					p: [I, {
						x: 4,
						y: 6,
						t: 2,
						s: I,
						cp1: {
							x: -1.2188007849009166,
							y: 2.6717988226486256
						},
						cp2: {
							x: 5.264911064067352,
							y: 2.205266807797945
						},
						e: bW
					}]
				},
				{
					p: [bW, bG]
				},
				{
					p: [bG, ba]
				},
				{
					p: [ba, {
						x: 6,
						y: 4,
						t: 2,
						s: ba,
						cp1: {
							x: 1.2155354594472643,
							y: .07767729723631955
						},
						cp2: {
							x: 8.82842712474619,
							y: 1.1715728752538102
						},
						e: cI
					}]
				},
				{
					p: [cI, bW]
				},
				{
					p: [bW, ba]
				},
				{
					p: [ba, I]
				},
				{
					p: [I, O]
				},
				{
					p: [O, bG]
				},
				{
					p: [bG, cw]
				},
				{
					p: [cw, bW]
				},
				{
					p: [bW, cM]
				},
				{
					p: [cM, cw]
				},
				{
					p: [cw, dm]
				},
				{
					p: [dm, cM]
				},
				{
					p: [cM, cI]
				},
				{
					p: [cI, dg, cY, W, g, s, O]
				}],
				qa: 4,
				t: 2,
				id: "3143264211354657661",
				gI: 1e3
			},
			{
				d: [e, da, i, de, m, di, q, dm, u, q, m, i, e, cY, da, de, di, dm, bk, bg, bc, $, W, da, $, de, bc, di, bg, dm],
				l: [{
					p: [e, da]
				},
				{
					p: [da, i]
				},
				{
					p: [i, de]
				},
				{
					p: [de, m]
				},
				{
					p: [m, di]
				},
				{
					p: [di, q]
				},
				{
					p: [q, dm]
				},
				{
					p: [dm, u]
				},
				{
					p: [u, q]
				},
				{
					p: [q, m]
				},
				{
					p: [m, i]
				},
				{
					p: [i, e]
				},
				{
					p: [e, cY]
				},
				{
					p: [cY, da]
				},
				{
					p: [da, de]
				},
				{
					p: [de, di]
				},
				{
					p: [di, dm]
				},
				{
					p: [dm, bk]
				},
				{
					p: [bk, bg]
				},
				{
					p: [bg, bc]
				},
				{
					p: [bc, $]
				},
				{
					p: [$, W]
				},
				{
					p: [W, da]
				},
				{
					p: [da, $]
				},
				{
					p: [$, de]
				},
				{
					p: [de, bc]
				},
				{
					p: [bc, di]
				},
				{
					p: [di, bg]
				},
				{
					p: [bg, dm]
				}],
				qa: 4,
				t: 2,
				id: "070707070000077777222227272727",
				gI: 1e3
			}]
		}
	})(),
	width = "width",
	height = "height",
	zl = "width",
	zL = "height",
	_ = "prototype",
	length = "length",
	hardScale = "scale",
	_ga[_] = {
		onclick: function() {},
		Us: function(a, b) {
			var c = this;
			c.container = document.createElement("div"),
			c.container.className = "clsContainer",
			document.body.appendChild(c.container),
			c.container.zF = c,
			c.zc = c.zY(),
			c.z9 = c.zY(),
			c.zm = c.zY(),
			c.z9[Zs] != UD && (c.uP = c.z9[Zs]("2d"), c.UP = c.zc[Zs]("2d"), c.uJ = c.zm[Zs]("2d"), c.zm.zF = c, c.zm.onclick = function(a) {
				var b;
				if (this.zF.UU || this.zF.moused) {
					try {
						a.preventDefault(),
						a.bubbles = tq
					} catch(c) {}
					return
				}
				this.zF.UG = a1,
				this.zF.g.UU = tq,
				b = a,
				b == UD && (b = event),
				this.zF.g.onclick(b.clientX - this.zF.zD, b.clientY - this.zF.ut);
				try {
					a.preventDefault(),
					a.bubbles = tq
				} catch(c) {}
				return tq
			},
			c.zm.onmousedown = function(a) {
				var b;
				if (this.zF.UU || this.zF.UG) {
					try {
						a.preventDefault(),
						a.bubbles = tq
					} catch(c) {}
					return
				}
				this.zF.moused = a1,
				this.zF.g.UU = tq,
				b = a,
				b == UD && (b = event),
				this.zF.g.onclick(b.clientX - this.zF.zD, b.clientY - this.zF.ut);
				try {
					a.preventDefault(),
					a.bubbles = tq
				} catch(c) {}
				return tq
			},
			c.zm.ontouchstart = function(a) {
				var b;
				if (this.zF.UG || this.zF.moused) {
					try {
						a.preventDefault(),
						a.bubbles = tq
					} catch(c) {}
					return
				}
				this.zF.g.UU = this.zF.UU = a1,
				b = a.touches[0],
				this.zF.g.onclick(b.pageX - this.zF.zD, b.pageY - this.zF.ut);
				try {
					a.preventDefault(),
					a.bubbles = tq
				} catch(c) {}
				return tq
			},
			c.zm.onmouseout = function() {
				this.zF.g.onmove( - 1, -1)
			},
			c.zm.onmousemove = function(a) {
				var b;
				this.zF.UU || (b = a, b == UD && (b = event), this.zF.g.onmove(b.clientX - this.zF.zD, b.clientY - this.zF.ut))
			},
			window.onorientationchange = window.onresize = function() {
				c.resize()
			},
			c.UI(document), c.UI(window), c.UI(document.body), b.dj != UD && (c.dj = b.dj), c.resize(a1), c.g = new _g(c.z9, c.zm, c.zc, c.r, c.R, c[W_], c[w_]), c.g.zP = c.zP, b.ZC != UD && (c.g.ZC = b.ZC, c.g.Zc = b.Zc, c.g.KL = b.KL, c.g.zX.KZ = b.KZ, c.g.d3 = b.d3), b.dp != UD && (c.g.dp = b.dp), b.dg != UD && (c.g.Y4.dg = b.dg), b.UJ != UD && (c.g.UJ = b.UJ), b.gC != UD && (c.g.gC = b.gC), b.handle != UD && (b.handle = c), b.dz != UD && (c.dz = b.dz), c.g.de = function() {},
			c.g.sLs(a), navigator.userAgent.match(/Android/i) ? window.setTimeout(function() {
				c.init()
			},
			1e3) : c.init())
		},
		init: function() {
			var a = this;
			a.g.init(),
			a.g.dh = a.dh,
			a.dz(),
			window.setInterval(function() {
				a.T()
			},
			a.g.S.kn)
		},
		resize: function(a) {
			var b,
			c,
			d,
			e,
			f,
			g,
			h,
			i,
			j,
			k = this,
			l = tq;
			navigator.userAgent.match(/Android/i) ? (window.scrollTo(20, 20), k.uI = 0, k.dh = window.devicePixelRatio < 1 || window.devicePixelRatio == UD ? 1: window.devicePixelRatio) : (window.scrollTo(0, 1), window.navigator.standalone ? k.uI = 20: k.uI = 0),
			b = window.innerWidth,
			c = window.innerHeight,
			d = k.uc,
			e = k.ul,
			f = 480,
			g = 720,
			h = k.rD,
			b > f * k.dh && c > g * k.dh || c > f * k.dh && b > g * k.dh ? (d = f, e = g, k.rD = 18, k.RD = 12) : (k.rD = 12, k.RD = 8),
			b > c && (i = d, d = e, e = i, l = a1),
			e -= k.uI;
			if (d > b || e > c) {
				j = d / e;
				if (d > b || e > c) k[W_] = b,
				k[w_] = mn(b / j),
				k[w_] > c && (k[W_] = mn(c * j), k[w_] = c);
				a = a1
			} else k[W_] = d,
			k[w_] = e,
			a = tq || a == a1;
			h != k.rD && (a = a1),
			k.zD = mf((b - k[W_] * k.dh) / 2),
			k.ut = mf((c - k[w_] * k.dh) / 2),
			k.up(k[W_], k[w_], k.zD, k.ut, a, l)
		},
		up: function(a, b, c, d, e, f) {
			var g,
			h = this,
			i = a * h.dh,
			j = b * h.dh;
			if (h[W_] != a || h[w_] != b || e || h.zP != f) h.zc[zl] = h.z9[zl] = h.zm[zl] = i,
			h.zc[zL] = h.z9[zL] = h.zm[zL] = j,
			h.container[Zf][zl] = h.zc[Zf][zl] = h.z9[Zf][zl] = h.zm[Zf][zl] = i + "px",
			h.container[Zf][zL] = h.zc[Zf][zL] = h.z9[Zf][zL] = h.zm[Zf][zL] = j + "px",
			f ? (h.r = h.RD, h.R = h.rD) : (h.r = h.rD, h.R = h.RD),
			h.uP[hardScale](h.dh, h.dh),
			h.UP[hardScale](h.dh, h.dh),
			h.uJ[hardScale](h.dh, h.dh),
			h.g != UD && h.g.up(a, b, h.r, h.R, f, e);
			g = {
				zD: c,
				ut: d + h.uI / 2,
				w: a,
				h: b
			},
			g = h.dj(g),
			h.dk(g.zD, g.ut),
			h.zP = f
		},
		dk: function(a, b) {
			var c = this;
			c.zD = a,
			c.ut = b,
			c.ut < 0 && (c.ut = 0),
			c.zD < 0 && (c.zD = 0),
			c.container[Zf].left = c.zD + "px",
			c.container[Zf].top = c.ut + "px"
		},
		dj: function(a) {
			return a
		},
		dz: function() {},
		T: function() {
			this.g.T()
		},
		clear: function(a) {
			a[ZG](0, 0, this[W_], this[w_])
		},
		zY: function() {
			var a = document.createElement("canvas");
			return this.UI(a, a1),
			a.innerText = "Sorry your browser does not support HTML5",
			this.container.appendChild(a),
			a
		},
		UI: function(a, b) {
			b && (a.ontouchstart = function(a) {
				try {
					a.preventDefault(),
					a.bubbles = tq
				} catch(b) {}
				return tq
			},
			a.touchmove = function(a) {
				try {
					a.preventDefault(),
					a.bubbles = tq
				} catch(b) {}
				return tq
			}),
			a.onselectqdt = function(a) {
				try {
					a.preventDefault(),
					a.bubbles = tq
				} catch(b) {}
				return tq
			},
			a.onclick = function(a) {
				try {
					a.preventDefault(),
					a.bubbles = tq
				} catch(b) {}
				return tq
			},
			a.onselect = function(a) {
				try {
					a.preventDefault(),
					a.bubbles = tq
				} catch(b) {}
			},
			a.ondblclick = function(a) {
				try {
					a.preventDefault(),
					a.bubbles = tq
				} catch(b) {}
			}
		},
		preventDefault: function() {}
	},
	km[_] = {
		ki: function(a) {
			var b,
			c,
			d = this;
			a == null ? (c = mf(mr() * d.kj[pZ]), b = d.kj[c]) : b = d.kj[a],
			d.kl = b,
			d.kh = new qg(8, 8, 8),
			d.klpb = new qg(255, 255, 255),
			d.ke = d.klpb,
			d.kq = d.kl,
			d.kM = new qg(150, 150, 150),
			d.kN = new h(220, 130),
			d.kN.kV = 80,
			d.kC = d.kl.kX(0),
			d.kC.a = .8,
			d.kL = new qg(0, 0, 0, .4),
			d.kK = new h(220, 280),
			d.kK.kV = 50,
			d.kJ = new h(220, 330),
			d.kJ.kV = 50,
			d.kH = new h(220, 250),
			d.kH.kV = 110,
			d.kG = new h(220, 170),
			d.kG.kV = 110,
			d.kF = new h(220, 240),
			d.kF.kV = 190,
			d.KD = new h(220, 230),
			d.KD.kV = 180,
			d.KA = new h(220, 200),
			d.KA.kV = 145,
			d.kW = new h(220, 240),
			d.kW.kV = 140,
			d.db = new h(220, 270),
			d.db.kV = 170,
			d.kD = d.kC.kX(20),
			d.kS = new qg(0, 0, 0, .4),
			d.d9 = d.kD.kX(80).gL(.7),
			d.d0 = d.kD.kX( - 250).gL(.5),
			d.dq = d.kD.kX( - 250).gL(.5),
			d.dw = d.kD.kX( - 190).gL(.6),
			d.dy = d.kD.kX( - 200).gL(.6),
			d.kA = 30,
			d.kO = d.kl,
			d.kP = d.kl.kX(80),
			d.KW.color = d.kP
		}
	},
	wF[_] = {
		draw: function() {
			var a,
			b,
			c = this;
			c.s.save(),
			c.s[ZJ] = c[ZJ],
			c.s.lineJoin = c.lineJoin,
			c.s[ZK] = c[ZK].gL(),
			c.s[Zk] = c[Zk].gL(),
			c.s[Zh]();
			for (a = 0; a < c.ps; a++) b = mP * ((a * c.uz + c.angle) / 360),
			a == 0 ? c.t == "qd" && a % 2 == 0 ? c.s[UO](c.zV.x + c.raduis * .4 * ms(b), c.zV.y + c.raduis * .4 * mc(b)) : c.s[UO](c.zV.x + c.raduis * ms(b), c.zV.y + c.raduis * mc(b)) : c.t == "qd" && a % 2 == 0 ? c.s[Zg](c.zV.x + c.raduis * .4 * ms(b), c.zV.y + c.raduis * .4 * mc(b)) : c.s[Zg](c.zV.x + c.raduis * ms(b), c.zV.y + c.raduis * mc(b));
			c.s[ZD](),
			c.s.fill(),
			c.s[ZF](),
			c.s[ZS]()
		}
	},
	UA[_] = {
		T: function(a, b) {
			var c,
			d = this;
			d.s.save();
			for (c = 0; c < d.Gs[pZ]; c++) d.Gs[c].T(a, b) || d.Gs.splice(c, 1);
			d.s[ZS]()
		},
		us: function(a, b, c, d, e, f, g, h) {
			var i = this,
			j = new _G(i.s, a, b, c, d, e, f, g, h, i.uU, i.uY);
			return j.zg = (new Date).getTime(),
			j.gI = 0,
			j.Ul = function() {},
			i.Gs.push(j),
			j
		}
	},
	KQ[_] = {
		UF: function(a) {
			var b = this;
			b.ls += a,
			b.ls < b.KI[0] ? b.ls = b.KI[0] : b.ls > b.KI[1] && (b.ls = b.KI[1])
		}
	},
	_G[_] = {
		Ul: function() {},
		T: function(a) {
			var b,
			c,
			d,
			e,
			f,
			g,
			h,
			i,
			j,
			k,
			l,
			m,
			n,
			o,
			p,
			q,
			r = this;
			if (a - r.gI < r.zg) return a1;
			r.ql = (a - (r.zg + r.gI)) / r.zI;
			if (r.ql < 0) return zK(888888),
			a1;
			if (r.ql > 1) return r.Ul(),
			tq;
			b = r.ql * (r.qmzZ - r.Uz) + r.Uz,
			c = b + r.zn,
			r.yq > 0 ? r.s[ZJ] = 1 + r.yq * mr() : r.s[ZJ] = 1,
			r.color.a = 1.1 - r.ql,
			r.s[Zk] = r.color.gL(),
			r.s[Zh]();
			for (d = 0, e = r.ls[pZ], f = r.s, g = r.zV.x, h = r.zV.y, i = ms, j = mc, k = mP; d < e; d++) l = r.ls[d],
			m = k * (l.angle / 360),
			n = i(m),
			o = j(m),
			p = b + l.Y,
			q = c + l.Y,
			f[UO](g + p * o, h + p * n),
			f[Zg](g + q * o, h + q * n);
			return r.s[ZF](),
			a1
		}
	},
	qg[_].gL = function(a) {
		var b = this,
		c = "",
		d = b.a;
		return a != UD && (d = a),
		d != UD && d != 1 ? "rgba(" + b.r + "," + b.g + "," + b.b + "," + d + ")": "rgb(" + b.r + "," + b.g + "," + b.b + ")"
	},
	qg[_].Un = function(a) {
		var b = this;
		b.r += a,
		b.g += a,
		b.b += a,
		b.uO()
	},
	qg[_].kX = function(a) {
		var b = this,
		c = new qg(b.r, b.g, b.b, b.a);
		return c.Un(a),
		c
	},
	qg[_].uO = function() {
		var a = this;
		a.r > 255 && (a.r = 255),
		a.g > 255 && (a.g = 255),
		a.b > 255 && (a.b = 255),
		a.r < 0 && (a.r = 0),
		a.g < 0 && (a.g = 0),
		a.b < 0 && (a.b = 0),
		a.a > 1 && (a.b = 1),
		a.a < 0 && (a.b = 0)
	},
	_cr[_] = {
		uE: function() {},
		ze: function() {},
		Zv: function() {
			var a = this;
			a.cHs = new Array,
			a.cH = 0,
			a.cqk = 0,
			a.aF = 0,
			a.qe = 0,
			a.TTime = 0,
			a.enabled = a1,
			a.gI = 0
		},
		T: function(a, b) {
			var c,
			d,
			e,
			f,
			g = this,
			h = 0;
			if (!g.enabled || g.zs == 0) return;
			if (g.cH < g.cHs[pZ] - 1) {
				g.gI -= a - b;
				if (g.gI < 0) {
					g.cH == 0 && g.cqk == 0 && (g.cqk += g.cHs[g.cH].zn),
					c = .01,
					d = a,
					g.qe = b,
					g.qe != 0 && (c = (d - g.qe) * g.zs),
					g.qe = d,
					h = g.aF / g.cqk;
					if (h > 1) do {
						if (g.cH + 2 == g.cHs[pZ]) {
							g.qe = 0,
							g.ze(g.cHs[g.cH + 1]);
							return
						}
						e = g.aF - g.cqk,
						g.aF = e,
						g.cH++,
						g.cqk = g.cHs[g.cH].zn,
						h = g.aF / g.cqk
					}
					while (h > 1);
					g.aF += c
				}
				f = new Object,
				g.cHs[g.cH].t > 1 ? (g.cHs[g.cH].ge && (h = 1 - h), f.x = g.cHs[g.cH].bez.mx(h), f.y = g.cHs[g.cH].bez.my(h)) : (f.x = g.cHs[g.cH].x + (g.cHs[g.cH + 1].x - g.cHs[g.cH].x) * h, f.y = g.cHs[g.cH].y + (g.cHs[g.cH + 1].y - g.cHs[g.cH].y) * h),
				g.uE(f)
			}
		},
		Uds: function(a, b) {
			var c,
			d = this,
			e = a.p[0].x == b.x && a.p[0].y == b.y;
			if (!e) {
				d.cHs[pZ] != 0;
				for (c = 0; c < a.p[pZ]; c++) d.Ud(a.p[c], e)
			} else {
				d.cHs[pZ] != 0;
				for (c = a.p[pZ] - 1; c + 1 > 0; c--) d.Ud(a.p[c], e)
			}
		},
		Ud: function(a, b) {
			var c,
			d,
			e,
			f = this;
			if (f.cHs[pZ] > 1 && f.cHs[f.cHs[pZ] - 1].x == a.x && f.cHs[f.cHs[pZ] - 1].y == a.y) {
				a.t > 1 && (a.bez = new z2(a.s, a.cp1, a.cp2, a.e, a.t), a.zn = a.bez[pZ], a.ge = b, f.ZMHs(f.cHs[f.cHs[pZ] - 1], a));
				return
			}
			f.cHs[f.cHs[pZ]] = a,
			a.t > 1 ? (a.bez = new z2(a.s, a.cp1, a.cp2, a.e, a.t), a.zn = a.bez[pZ], a.ge = b, f.cHs[pZ] > 1 && (c = f.cHs[f.cHs[pZ] - 2], f.cHs[f.cHs[pZ] - 2].zn = a.bez[pZ], c.x == a.s.x && c.y == a.s.y && f.ZMHs(c, a))) : f.cHs[pZ] > 1 && f.cHs[f.cHs[pZ] - 2].t < 2 && (d = f.cHs[f.cHs[pZ] - 2].x - f.cHs[f.cHs[pZ] - 1].x, e = f.cHs[f.cHs[pZ] - 2].y - f.cHs[f.cHs[pZ] - 1].y, f.cHs[f.cHs[pZ] - 2].zn = mS(d * d + e * e), f.cHs[f.cHs[pZ] - 2].zn == 0 && zK("oh no"))
		},
		ZMHs: function(a, b) {
			var c = a.s,
			d = a.cp1,
			e = a.cp2,
			f = a.e,
			g = a.t,
			h = a.zn,
			i = a.bez,
			j = b.ge;
			a.s = b.s,
			a.cp1 = b.cp1,
			a.cp2 = b.cp2,
			a.e = b.e,
			a.t = b.t,
			a.zn = b.zn,
			a.bez = b.bez,
			a.ge = b.ge,
			b.s = c,
			b.cp1 = d,
			b.cp2 = e,
			b.e = f,
			b.t = g,
			b.zn = h,
			b.bez = i,
			b.ge = j
		}
	},
	_D[_] = {
		draw: function(a) {
			var b,
			c,
			d = this;
			if (!d.visible) return;
			b = a,
			d.qe == 0 && (d.qe = b),
			c = (b - d.qe) * d.ub,
			d.qe = b,
			d.inner.angle += c,
			d.outer.angle -= c,
			d.outer.draw(),
			d.inner.draw()
		},
		move: function(a) {
			var b = this;
			b.visible = a1,
			b.outer.zV.x = b.inner.zV.x = a.x,
			b.outer.zV.y = b.inner.zV.y = a.y
		},
		Zv: function() {
			var a = this;
			a.inner = new wF(a.s, new h(50, 100), 14, 3, 90, a.S.kq),
			a.outer = new wF(a.s, new h(50, 100), 17, 3, 45, a.S.kM),
			a.qe = 0,
			a.visible = tq
		}
	},
	un[_] = {
		T: function() {
			var a = this;
			if (a.zy) return;
			a.s.save(),
			a.Ug(a.s),
			a.s[ZS]()
		},
		Zv: function() {
			var a,
			b = this,
			c = b.sGrid;
			if (b.zy) return;
			c.save(),
			c[Zh](),
			c[ZJ] = 2,
			c[Zk] = b.g.S.kD.gL(.7),
			a = c.createLinearGradient(0, 3, 0, 25),
			a.addColorStop(0, b.g.S.d9),
			a.addColorStop(.3, b.g.S.d0),
			a.addColorStop(.6, b.g.S.dq),
			a.addColorStop(1, b.g.S.dw),
			c[ZK] = a,
			c[UO](0, 0),
			c[Zg](0, b[w_]),
			c[Zj](b[W_] / 2, b[w_] + 19, b[W_], b[w_]),
			c[Zg](b[W_], 0),
			c[ZD](),
			c.fill(),
			c[Zh](),
			c[UO](0, b[w_]),
			c[Zj](b[W_] / 2, b[w_] + 19, b[W_], b[w_]),
			c.shadowColor = b.g.S.kD.gL(1),
			c.shadowBlur = 4,
			c[ZF](),
			c[ZJ] = 1,
			c.font = "10pt Arial",
			c.textBaseline = "middle",
			c[Zk] = "white",
			c[ZK] = "white",
			c.textAlign = "left",
			c[ZH]("最好成绩:" + b.zk(b.KY), 13, b[w_] / 2 + 2),
			c.textAlign = "right",
			c[ZH]("菜单", b[W_] - 13 - b.KZ, b[w_] / 2 + 2),
			c[ZS]()
		},
		Ug: function(a) {
			a[ZJ] = 1,
			a.font = "12pt Arial",
			a.textBaseline = "middle",
			a[Zk] = "white",
			a[ZK] = "white",
			a.textAlign = "center",
			a[ZH](this.zk(this.Zz), this[W_] / 2, this[w_] / 2 + 7)
		},
		zk: function(a) {
			var b,
			c;
			return a > 0 ? (b = a + "", a > 999 || (a > 99 ? b = "0" + b: b = "00" + b), c = b[pZ] - 1, b.substring(0, c - 2) + ":" + b.substring(c - 2, c)) : "0:00"
		}
	},
	um[_] = {
		Uv: function(a, b) {
			var c = this.d[this.d[pZ]] = new h(a, b);
			return c
		},
		u8: function() {
			var a = this.l[this.l[pZ]] = new _l;
			return a
		}
	},
	_l[_] = {
		Ue: function(a, b, c) {
			var d = this.p[this.p[pZ]] = new _p(a, b, c);
			return d
		}
	},
	U8[_] = {
		T: function() {
			var a = this,
			b = new Date,
			c = mC(b.getTime() - a.lastTime.getTime());
			c >= 1e3 && (a.fps = a.zu, a.zu = 0, a.lastTime = b),
			a.s.save(),
			a.s[ZK] = "#FFF",
			a.s.font = "bold 10px sans-serif",
			a.s[ZH](a.sfps + ":" + a.fps + "/" + a.uR, 4, a[w_] - 10),
			a.s[ZS](),
			a.zu++
		}
	},
	_aJ[_] = {
		aG: function(a, b, c, d, e, f, g) {
			var h = this,
			i = h.aJ[h.aJ[pZ]] = new z3(a, b, c, d, e, f, g);
			return i.g = h.g,
			i
		},
		click: function(a, b) {
			var c = this,
			d = c.KX(a, b);
			return d != UD ? (d.aD(d.z4), a1) : tq
		},
		KX: function(a, b) {
			var c,
			d = this;
			d.KC = UD;
			for (c = 0; c < d.aJ[pZ]; c++) if (d.aJ[c].ud(a, b)) return d.KC = d.aJ[c],
			d.aJ[c]
		},
		clear: function(a, b) {
			this.aJ[pZ] = a == UD ? 0: a,
			b && (this.KC = UD)
		}
	},
	z3[_] = {
		ud: function(a, b) {
			var c = this;
			return a > c.x && a < c.x + c[W_] && b > c.y && b < c.y + c[w_] ? a1: tq
		}
	},
	U9[_] = {
		uD: function(a, b) {
			var c = {
				aD: a,
				data: b
			};
			this.aDs.push(c)
		},
		Ut: function() {
			var a,
			b;
			this.aDs[pZ] > 0 && (a = this.aDs.shift(), a.aD(a.data), b = this, window.setTimeout(function() {
				b.Ut()
			},
			0))
		},
		clear: function() {
			this.aDs[pZ] = 0
		}
	},
	U0[_] = {
		load: function(a) {
			a != UD && (this.Zzs = a)
		},
		zE: function(a) {
			var b,
			c,
			d = this;
			for (b = 0; b < d.Zzs[pZ]; b++) if (d.Zzs[b].id == a) return d.Zzs[b];
			return c = new _Zz(a),
			d.Zzs.push(c),
			c
		}
	},
	z2[_] = {
		map: function(a) {
			var b,
			c = this,
			d = a * c[pZ],
			e = 0,
			f = c.len,
			g = 0;
			while (e < f) g = e + ((f - e) / 2 | 0),
			c.gH[g] < d ? e = g + 1: f = g;
			return c.gH[g] > d && g--,
			b = c.gH[g],
			b == d ? g / c.len: (g + (d - b) / (c.gH[g + 1] - b)) / c.len
		},
		mx: function(a) {
			return this.x(this.map(a))
		},
		my: function(a) {
			return this.y(this.map(a))
		},
		x: function(a) {
			var b = this;
			return b.t == 3 ? b.a.x + a * (2 * (1 - a) * (b.b.x - b.a.x) + a * (b.d.x - b.a.x)) : (1 - a) * (1 - a) * (1 - a) * b.a.x + 3 * (1 - a) * (1 - a) * a * b.b.x + 3 * (1 - a) * a * a * b.c.x + a * a * a * b.d.x
		},
		y: function(a) {
			var b = this;
			return b.t == 3 ? b.a.y + a * (2 * (1 - a) * (b.b.y - b.a.y) + a * (b.d.y - b.a.y)) : (1 - a) * (1 - a) * (1 - a) * b.a.y + 3 * (1 - a) * (1 - a) * a * b.b.y + 3 * (1 - a) * a * a * b.c.y + a * a * a * b.d.y
		}
	},
	_W[_].ud = function(a, b) {
		var c = this,
		d = a,
		e = b;
		return d > c.x && d < c.x + c[W_] && e > c.y && e < c.y + c[w_] ? a1: tq
	},
	zU[_] = {
		uC: function() {
			var a,
			b,
			c = this,
			d = c.text.split(" "),
			e = 0;
			for (a = 0, b = d[pZ]; a < b; a++) c.measureText(c.r[e] + " " + d[a]) <= c[W_] && d[a].indexOf("\n") == -1 ? c.r[e] += d[a] + " ": (e++, c.r[e] = d[a] + " ");
			c[w_] = c.r[pZ] * (c.textHeight + c.textLineSpacing),
			c.uW = a1
		},
		fillText: function(a, b) {
			var c,
			d,
			e,
			f,
			g = this;
			g.uW || g.uC(),
			c = g.textHeight;
			for (d = 0, e = b, f = g.r[pZ]; d < f; d++) g.s[ZH](g.r[d], a, e),
			e += c + g.textLineSpacing
		},
		measureText: function(a) {
			var b = this;
			try {
				return b.s.measureText(a)[zl]
			} catch(c) {
				return a[pZ] * 6.5
			}
		}
	},
	"use strict",
	_g[_] = {
		init: function() {
			var a,
			b = this,
			c = b.m.read("data");
			c != UD && (b.Zzs.load(c.Zzs), b.UJ = c.UJ, b.gC = c.gC | 0, b.UL = c.UL | 0, b.KJ = c.KJ | 0, b.UZ = c.UZ, b.dn = c.dn || 19);
			if (b.KJ < this.S.KH[0][0]) {
				b.s[ZG](0, 0, b[W_], b[w_]),
				b.s[ZK] = "rgba(1,1,1,0.7)",
				b.s[Zd](0, 0, b[W_], b[w_]),
				a = function() {
					b.u7()
				},
				b.Y4.ZV(b.s, b.S.KH[0], a),
				b.KJ = this.S.KH[0][0];
				return
			}
			c == UD ? (b.uq(), b.UE(), b.u7()) : (b.uu(b.gC), b.sL(b.levels[b.UJ]))
		},
		UE: function() {
			var a = this;
			a.zX.Ug(a.s),
			a.zX.zy = a1,
			a.s[ZK] = "rgba(1,1,1,0.7)",
			a.s[Zd](0, 0, a[W_], a[w_])
		},
		up: function(a, b, c, d, e, f) {
			var g = this;
			g.Y4[W_] = g.zX[W_] = g[W_] = a,
			g.Y4[w_] = g[w_] = b,
			g.r = c,
			g.R = d,
			g.K = g[W_] / g.R,
			g.k = (g[w_] - g.z8) / g.r,
			g.Uw.up(g[W_], g[w_], g.R, g.r),
			g.zP != e ? (g.zP = e, g.zW(g.level), g.level.rotate = a1) : !f,
			!g.qq && !g.zw && !g.qw && !g.u0 && g.UL > 0 ? g.sL(g.levels[g.UJ]) : g.u7()
		},
		uq: function() {
			var a = this;
			a.zX.Zv(),
			a.aJ.KC = UD,
			a.s[ZK] = a.S.kh.gL(),
			a.s[Zk] = a.S.kC.gL(),
			a.s[ZJ] = a.Zc,
			a.O.uyOut(a.s, 0, 0, a[W_], a[w_], a.ZC, a1, tq),
			a.O.uy(a.s, 1, 1, a[W_] - 2, a[w_] - 2, a.ZC, tq, a1)
		},
		d_: function() {
			var a = this;
			a.aJ.clear(),
			a.zG(a.level),
			a.uq(),
			a.s[ZK] = "rgba(1,1,1,0.7)",
			a.s[Zd](0, 0, a[W_], a[w_])
		},
		u3: function() {
			var a = this,
			b = {};
			b.Zzs = a.Zzs.Zzs,
			b.UJ = a.UJ,
			b.gC = a.gC,
			b.UL = a.UL,
			b.KJ = a.KJ,
			b.UZ = a.UZ,
			b.dn = a.dn,
			a.m.save("data", b)
		},
		T: function() {
			var a = this;
			a.u0 || (a.aB = (new Date).getTime()),
			a.sEs[ZG](0, 0, a[W_], a[w_]),
			a.u9 && (a.u9 = tq);
			if (!a.qw || !a.aS) a.zw && !a.qw && !a.qq && (a.time += a.aB - a.aA),
			a.zX.Zz = a.time;
			a.KV(a.aJ.KC),
			a.cr.T(a.aB, a.aA),
			a.zX.T(),
			a.UF(a.aB, a.aA),
			a.Ger.T(a.aB, a.aA),
			a.D.draw(a.aB, a.aA),
			a.Uw.T(a.aB, a.aA),
			a.aA = a.aB
		},
		UF: function(a, b) {
			var c = this,
			d = a - b;
			if (d - c.S.kn < 10) {
				if (c.Ger.Gs[pZ] < 35) return;
				c.S.KW.UF(1),
				c.S.KE.UF(1)
			} else c.S.KW.UF( - 1),
			c.S.KE.UF( - 1);
			c.fps.sfps = c.S.KW.ls
		},
		KV: function(a) {
			var b,
			c,
			d,
			e,
			f,
			g = this;
			if (g.hoverd1 == UD && a == UD) return;
			b = g.sEs,
			b.save(),
			b[Zh](),
			b.shadowColor = "white",
			b.shadowBlur = 7,
			b[ZJ] = 4,
			b[Zk] = this.S.kD.gL(),
			a != UD ? a.KN == 0 ? (c = g[W_] - 2, b[UO](2, 21), b[Zj](c / 2, 40, c, 21), b[Zj](c, 2, c - g.ZC, 2), b[Zg](g.ZC, 2), b[Zj](2, 2, 2, 21), b[ZF]()) : a.KN == 1 ? (d = new h(g[W_] - 32, 20), e = new wF(b, d, 12, 3, 90, new qg(255, 255, 255, .8), new qg(40, 40, 40, .2)), e[ZK] = new qg(255, 255, 255), e.draw()) : a.KN == 2 ? (d = new h(32, 20), f = new wF(b, d, 12, 3, 30, new qg(255, 255, 255, .8), new qg(255, 255, 255, 1)), f[ZK] = new qg(255, 255, 255), f.draw()) : g.O.uy(b, a.x - 1, a.y - 1, a[W_] + 2, a[w_] + 2, 5, tq, a1) : g.hoverd1 != UD && (b[Zh](), b[Zk] = "rgba(255,255,255,0.9)", b.shadowBlur = 6, b[ZJ] = 3, b.arc(g.z1(g.hoverd1.x), g.zB(g.hoverd1.y), 18, 0, mP, a1), b[ZF]()),
			b[ZS]()
		},
		pause: function(a) {
			var b = this;
			b.u0 = a,
			b.zG(b.level),
			b.uq(),
			a ? (b.s[ZK] = "rgba(1,1,1,0.7)", b.s[Zd](0, 0, b[W_], b[w_]), b.dr(a1)) : (b.addwHLayer(), b.dr(tq)),
			b.aA = (new Date).getTime()
		},
		po: function() {
			var a,
			b,
			c = this;
			if (c.qq) return;
			c.aJ.clear(),
			c.qw = a1,
			c.aS && (a = c.S.kl.kX( - 80), c.pl(c.aS.l, a), c.zJ(c.aS.ds[0], a), c.zJ(c.aS.ds[1], a)),
			c.uq(),
			c.UE(),
			c.Y4.pq(c.s),
			b = c.Zzs.zE(c.level.id),
			b.KU++,
			c.dr(a1)
		},
		uZ: function(a, b) {
			var c = this;
			c.zG(c.level),
			c.uq(),
			c.UE(),
			c.Y4.ZB(c.s, a, b),
			c.dr(a1)
		},
		KO: function() {
			var a = this;
			a.uq(),
			a.qh(),
			a.s[ZG](0, 0, a[W_], a[w_]),
			a.UE(),
			a.Y4.KP(a.s),
			a.dr(a1)
		},
		UX: function() {
			var a = this;
			a.uq(),
			a.qh(),
			a.s[ZG](0, 0, a[W_], a[w_]),
			a.UE(),
			a.Y4.UC(a.s),
			a.dr(a1)
		},
		d5: function(a) {
			var b = this;
			b.uq(),
			b.qh(),
			b.s[ZG](0, 0, b[W_], b[w_]),
			b.UE(),
			b.Y4.d2(b.s, a | 0),
			b.dr(a1)
		},
		pw: function() {
			var a,
			b,
			c,
			d = this,
			e = tq;
			d.qq = a1,
			d.aJ.clear(),
			d.uq(),
			a = d.Zzs.zE(d.level.id),
			a.last = d.zX.Zz;
			if (d.zX.Zz < a.KY || a.KY == 0) a.KY = d.zX.Zz,
			d.zX.KY = d.zX.Zz,
			e = a1;
			a.qds = 1,
			a.KY < d.level.d[pZ] * d.S.kx && (a.qds = 2),
			a.KY < d.level.d[pZ] * d.S.kz && (a.qds = 3),
			a.KU++,
			b = {
				level: d.g.level,
				Zz: d.zX.zk(d.zX.Zz),
				KY: d.zX.zk(d.zX.KY),
				qds: a.qds,
				newRecord: e
			},
			d.UE(),
			d.qh() ? (b.rank = d.UZ.rank, d.Y4.Uh(d.s, b), d.di(d.UZ.rank, d.UZ.zjpr)) : d.UZ.qds[0] > d.dn ? d.Y4.dm(d.s, b) : d.Y4.pu(d.s, b),
			d.u3();
			try {
				c = d.gC + " " + d.UJ + " " + d.level.id,
				_gaq.push(["_trackEvent", "Pathuku", "Complete", c, d.zX.Zz])
			} catch(f) {}
			d.dr(a1),
			d.du(d.UZ.zjpr, d.level.id, d.zX.Zz, a.KU, d.level.t, a.qds)
		},
		gD: function() {
			var a = this;
			a.qq = a1,
			a.s[ZK] = "rgba(1,1,1,0.7)",
			a.s[Zd](0, 0, a[W_], a[w_]),
			a.sEs[ZG](0, 0, a[W_], a[w_]),
			a.zX.zy = a1,
			a.gc.draw(),
			a.dr(tq)
		},
		u7: function() {
			var a = this;
			a.dW == 1 && (a.dW = 0),
			a.zX.zy = a1,
			a.s[ZG](0, 0, a[W_], a[w_]),
			a.UE(),
			a.cr.Zv(),
			a.D.Zv(),
			a.aJ.KC = UD,
			a.sEs[ZG](0, 0, a[W_], a[w_]),
			a.qh(),
			a.Y4.Zn(a.s),
			a.dr(a1)
		},
		KG: function() {
			var a = this;
			a.zX.zy = a1,
			a.s[ZG](0, 0, a[W_], a[w_]),
			a.UE(),
			a.sEs[ZG](0, 0, a[W_], a[w_]),
			a.qh(),
			a.Y4.KF(a.s),
			a.dr(a1)
		},
		onmove: function(a, b) {
			var c = this,
			d = a / c.dh,
			e = b / c.dh,
			f = c.aJ.KX(d, e);
			c.qw || c.qq || c.u0 ? c.hoverd1 = UD: c.hoverd1 = c.uA(d, e, 35)
		},
		qh: function() {
			var a,
			b,
			c,
			d,
			e,
			f,
			g,
			h,
			i,
			j,
			k = this,
			l = {
				qds: [0, 0, 0, 0],
				t: [0, 0, 0, 0],
				rank: "",
				KU: 0,
				zjpr: 0
			},
			m = k.gE[3];
			for (a = 0, b = m[pZ]; a < b; ++a) {
				c = k.Zzs.zE(m[a].id);
				if (c != UD) {
					for (d = 0, e = 4; d < e; d++) c.qds > d && l.qds[d]++;
					c.qds > 0 && (m[a].t != UD ? l.t[m[a].t]++:l.t[2] = (l.t[2] | 0) + 1, f = m[a].d[pZ] * k.S.kx - c.KY, f > 150 ? l.zjpr += f: l.zjpr += 150),
					l.KU += c.KU
				}
			}
			g = l.qds[0],
			h = 0;
			for (a = 0, b = k.S.kg[pZ]; a < b; ++a) g >= k.S.kg[a][0] && (l.rank = k.S.kg[a][1], a + 1 < b ? h = k.S.kg[a + 1][0] : h = k.S.kg[a][0]);
			i = "";
			for (a = 0, b = k.S.kf[pZ]; a < b; ++a) l.qds[k.S.kf[a][0]] / h >= k.S.kf[a][1] && (i = k.S.kf[a][2]);
			return l.rank += " " + i,
			j = k.UZ != UD ? k.UZ.rank: l.rank,
			k.UZ = l,
			k.UZ.rank != j ? a1: tq
		},
		onclick: function(a, b) {
			var c,
			d,
			e,
			f = this,
			g = a / f.dh,
			h = b / f.dh;
			if (f.aJ.click(g, h)) return tq;
			if (f.u0 || f.qw) return;
			if (f.qw) {
				f.sL(f.level),
				f.qw = tq;
				return
			}
			c = f.uA(g, h);
			if (c == UD) return;
			d = f.pN(c);
			if (f.Y2d1 != UD) {
				e = f.U7(f.Y2d1, c);
				if (e == UD) {
					if (f.Y2d1.x == c.x && f.Y2d1.y == c.y) return;
					f.aS = {
						l: {
							p: [{
								x: f.Y2d1.x,
								y: f.Y2d1.y,
								t: 0
							},
							{
								x: c.x,
								y: c.y,
								t: 1
							}]
						},
						ds: [{
							x: f.Y2d1.x,
							y: f.Y2d1.y
						},
						{
							x: c.x,
							y: c.y
						}]
					},
					f.po();
					return
				}
				f.zw = a1,
				e.selected = a1,
				f.pl(e),
				f.cr.Uds(e, c),
				f.Y2d1.selected = tq,
				f.zJ(f.Y2d1);
				if (f.zQ()) {
					c.selected = a1,
					f.zJ(c),
					f.pw(),
					f.Ger.us(d, 5, 35, 30, 3, 700, 19, new qg(255, 210, 132)),
					f.Ger.us(d, 20, 65, 30, 3, 600, 19, new qg(255, 210, 132)),
					f.Ger.us(d, 30, 95, 90, 3, 400, 19, new qg(255, 210, 132)),
					c.selected = a1;
					return
				}
			}
			c.selected = a1,
			f.zJ(c),
			f.Y2d1 = c,
			f.Ger.us(d, 10, 45, 30, 3, 600, 25, new qg(255, 255, 255))
		},
		pB: function(a, b) {
			var c = a.x - b.x,
			d = a.y - b.y,
			e = mS(c * c + d * d);
			return e < 0 && (zK(e), e = e * -1),
			e
		},
		uA: function(a, b, c) {
			var d,
			e,
			f = this,
			g = 9999,
			i = UD,
			j = new h(a, b);
			for (d = 0; d < f.level.d[pZ]; d++) e = f.pB(j, f.pN(f.level.d[d])),
			e < g && (g = e, i = f.level.d[d]);
			if (c == UD || c > g) return i
		},
		dx: function(a) {
			var b = this;
			b.aJ.clear(),
			b.UJ = a,
			b.sL(b.levels[b.UJ]),
			b.aDs.clear()
		},
		dE: function(a) {
			var b = this;
			b.dW = a,
			b.uu( - 1),
			b.dR()
		},
		dR: function() {
			var a = this;
			a.dW == 1 ? (a.UJ = mf(mr() * a.levels[pZ]), a.ds() && a.sL(a.levels[a.UJ])) : a.UJ + 1 < a.levels[pZ] ? (a.UJ++, a.aJ.clear(), a.ds() && a.sL(a.levels[a.UJ])) : (a.aJ.clear(0, a1), a.KG())
		},
		sL: function(a) {
			var b,
			c,
			d = this;
			if (d.S.kd[pZ] > d.UL && d.S.kd[d.UL][0] <= d.UJ) {
				d.s[ZG](0, 0, d[W_], d[w_]),
				d.s[ZK] = "rgba(1,1,1,0.7)",
				d.s[Zd](0, 0, d[W_], d[w_]),
				d.uq(),
				d.Y4.ZV(d.s, d.S.kd[d.UL]),
				d.UL++;
				return
			}
			d.S.ki(),
			b = UD,
			d.s.globalCompositeOpeqln = "source-over",
			b = d.zO(a),
			d.cr.Zv(),
			d.UU ? d.cr.zs = d.S.kc[b.qa] : d.cr.zs = d.S.d8[b.qa],
			d.cr.gI = b.gI,
			d.D.Zv(),
			d.Uw.uw = d.S.kO,
			d.Uw.Zv(),
			d.aS = UD,
			d.Y2w = UD,
			d.Y2d1 = UD,
			d.u9 = tq,
			d.zw = tq,
			d.u0 = tq,
			d.qw = tq,
			d.qq = tq,
			c = d.Zzs.zE(b.id),
			d.zX.zy = tq,
			d.zX.KY = c.KY,
			d.time = 0,
			d.aDs.aDs[pZ] = 0,
			d.addwHLayer(),
			d.level = b,
			d.zG(b),
			d.uq(),
			d.u3(),
			d.ux != UD && d.ux(b),
			d.dr(tq)
		},
		addwHLayer: function() {
			var a = this;
			a.aJ.aJ[pZ] = 0,
			a.aJ.aG(0, 0, a[W_], 25,
			function() {
				this.g.aJ.clear(),
				this.g.pause(a1),
				this.g.Y4.ZN(this.g.s)
			},
			UD, 0)
		},
		sLs: function(a) {
			var b,
			c,
			d = this;
			d.UV = a.version,
			d.levels = [],
			d.gE = [[], [], [], a.levels];
			for (b = 0, c = d.gE[3][pZ]; b < c; b++) d.gE[3][b].id != UD && d.gE[3][b].id != "" && d.gE[3][b].id != "",
			d.gE[3][b].iid = b + 1,
			d.gE[3][b].t != UD ? d.gE[d.gE[3][b].t].push(d.gE[3][b]) : d.gE[2].push(d.gE[3][b]);
			d.uu(0)
		},
		uu: function(a) {
			var b = this;
			b.gC != a && (b.UJ = 0),
			b.gC = a,
			a == -1 ? (b.levels = b.gE[3], b.gC = 3) : b.levels = b.gE[a]
		},
		zG: function(a, b, c) {
			var d,
			e = this;
			c != a1 && e.s[ZG](0, 0, e[W_], e[w_]);
			for (d = 0; d < a.l[pZ]; d++) d == 2 && tq ? e.ur(e.s, oqst, oCp1, oEnd) : e.pl(a.l[d], b);
			for (d = 0; d < a.d[pZ]; d++) e.zJ(a.d[d], b)
		},
		zf: function(a, b, c) {
			var d,
			e;
			if (c == 0) return;
			return d = Math.atan((b.y - a.y) / (b.x - a.x)),
			e = c,
			b.x < a.x && b.x != a.x && (e = e * -1, b.x != a.x),
			new h(b.x + e * mc(d), b.y + e * ms(d))
		},
		qp: function(a, b, c, d, e) {
			var f = this;
			a[UO](f.z1(b.x), f.zB(b.y)),
			a.bezierCurveTo(f.z1(c.x), f.zB(c.y), f.z1(d.x), f.zB(d.y), f.z1(e.x), f.zB(e.y))
		},
		ur: function(a, b, c, d) {
			var e = this;
			a[UO](e.z1(b.x), e.zB(b.y)),
			a[Zj](e.z1(c.x), e.zB(c.y), e.z1(d.x), e.zB(d.y))
		},
		Um: function(a) {
			var b,
			c = {};
			for (b in a) typeof a[b] == "object" ? c[b] = this.U2(a[b]) : c[b] = a[b];
			return c
		},
		U2: function(a) {
			function b() {}
			return b[_] = a,
			new b
		},
		zO: function(a) {
			var b,
			c,
			d,
			e,
			f,
			g,
			i = this,
			j = 0,
			k = 999999999,
			l = 0,
			m = 999999999,
			n = new um,
			o = a;
			for (b = 0; b < o.l[pZ]; b++) for (c = 1; c < o.l[b].p[pZ]; c++) o.l[b].p[c].x > j && (j = o.l[b].p[c].x),
			o.l[b].p[c].x < k && (k = o.l[b].p[c].x),
			o.l[b].p[c].y > l && (l = o.l[b].p[c].y),
			o.l[b].p[c].y < m && (m = o.l[b].p[c].y);
			d = mf((i.R - j - k) / 2),
			e = mf((i.r - l - m) / 2 - .5),
			i.zP && (d = 0, e = 0, d = mf((i.r - j - k) / 2 - .5), e = mf((i.R - l - m) / 2)),
			o.qa != UD ? n.qa = o.qa: n.qa = 3,
			n.gI = o.gI | 1e3,
			n.t = o.t,
			n.Uo = o.Uo,
			n[pZ] = o[pZ],
			n.id = o.id,
			n.iid = o.iid;
			for (b = 0; b < o.d[pZ]; b++) n.Uv(o.d[b].x + d, o.d[b].y + e);
			for (b = 0; b < o.l[pZ]; b++) {
				f = n.u8();
				for (c = 0; c < o.l[b].p[pZ]; c++) g = f.Ue(o.l[b].p[c].x + d, o.l[b].p[c].y + e, o.l[b].p[c].t),
				o.l[b].p[c].s != UD && (g.s = new h(o.l[b].p[c].s.x + d, o.l[b].p[c].s.y + e), g.cp1 = new h(o.l[b].p[c].cp1.x + d, o.l[b].p[c].cp1.y + e), g.cp2 = new h(o.l[b].p[c].cp2.x + d, o.l[b].p[c].cp2.y + e), g.e = new h(o.l[b].p[c].e.x + d, o.l[b].p[c].e.y + e))
			}
			return i.zP && i.zW(n),
			n
		},
		zW: function(a) {
			var b,
			c,
			d = this;
			for (b = 0; b < a.d[pZ]; b++) d.ZM(a.d[b]);
			for (b = 0; b < a.l[pZ]; b++) for (c = 0; c < a.l[b].p[pZ]; c++) d.ZM(a.l[b].p[c]),
			a.l[b].p[c].s != UD && (d.ZM(a.l[b].p[c].s), d.ZM(a.l[b].p[c].cp1), d.ZM(a.l[b].p[c].cp2), d.ZM(a.l[b].p[c].e))
		},
		ZM: function(a) {
			var b = 0;
			this.zP ? (b = this.r - 1 - a.x, a.x = a.y, a.y = b) : (b = a.x, a.x = this.R - 1 - a.y, a.y = b)
		},
		pl: function(a, b) {
			var c,
			d,
			e,
			f = this,
			g = b;
			g == UD && (a.selected ? g = f.S.klpb: g = f.S.kl),
			f.s[Zh](),
			f.s.lineJoin = "round";
			for (c = 0; c < a.p[pZ]; c++) a.p[c].t != 2 && a.p[c].t != 3 || a.p[c].cp2 == UD ? (d = f.z1(a.p[c].x), e = f.zB(a.p[c].y), c == 0 ? f.s[UO](d, e) : (f.s[Zk] = g.kX( - 60).gL(1), f.s[ZJ] = f.S.d7 + 6, f.s[Zg](d, e), f.s[ZF](), a.p[c].t == 2 ? f.s[Zk] = (new qg(0, 0, 255)).gL() : f.s[Zk] = g.gL(1), f.s[ZJ] = f.S.d7 + 3, f.s[Zg](d, e), f.s[ZF]())) : (f.s[Zh](), f.s[Zk] = g.kX( - 60).gL(1), f.s[ZJ] = f.S.d7 + 6, a.p[c].t == 3 ? f.ur(f.s, a.p[c].s, a.p[c].cp1, a.p[c].e) : f.qp(f.s, a.p[c].s, a.p[c].cp1, a.p[c].cp2, a.p[c].e), f.s[ZF](), f.s[ZJ] = f.S.d7 + 3, f.s[Zk] = g.gL(1), a.p[c].t == 3 ? f.ur(f.s, a.p[c].s, a.p[c].cp1, a.p[c].e) : f.qp(f.s, a.p[c].s, a.p[c].cp1, a.p[c].cp2, a.p[c].e), f.s[ZF]()),
			f.lastH = a.p[c]
		},
		zJ: function(a, b) {
			var c = this,
			d = b,
			e = c.z1(a.x),
			f = c.zB(a.y);
			d == UD && (a.selected ? d = c.S.kl: d = c.S.kl),
			c.s[ZK] = d.gL(),
			c.s[Zh](),
			c.s.arc(e, f, c.S.d7 + 5, 0, mP, a1),
			c.s.fill(),
			c.s[ZJ] = 2,
			c.s[Zk] = d.kX( - 60).gL(.4),
			c.s[ZF](),
			a.selected && (c.s[Zh](), c.s[ZK] = (new qg(255, 255, 255)).gL(), c.s.arc(e, f, c.S.d7 + 1, 0, mP, a1), c.s.fill(), c.s[ZJ] = 2, c.s[Zk] = d.kX( - 60).gL(.4), c.s[ZF]())
		},
		pN: function(a) {
			return new h(this.z1(a.x), this.zB(a.y))
		},
		z1: function(a) {
			return this.leftOffset + (a * this.K + this.K / 2)
		},
		zB: function(a) {
			return this.z8 + (a * this.k + this.k / 2)
		},
		U7: function(a, b) {
			var c,
			d,
			e = this;
			for (c = 0; c < e.level.l[pZ]; c++) {
				d = e.level.l[c];
				if (!d.selected && (d.p[0].x == a.x && d.p[d.p[pZ] - 1].x == b.x && d.p[0].y == a.y && d.p[d.p[pZ] - 1].y == b.y || d.p[0].x == b.x && d.p[d.p[pZ] - 1].x == a.x && d.p[0].y == b.y && d.p[d.p[pZ] - 1].y == a.y)) return e.level.l[c]
			}
		},
		zQ: function() {
			var a;
			for (a = 0; a < this.level.l[pZ]; a++) if (!this.level.l[a].selected) return tq;
			return a1
		},
		KL: function(a, b, c, d) {
			var e,
			f;
			d || a.indexOf("mailto:") > -1 ? window.location = a: window.navigator.standalone ? (e = document.createElement("a"), e.setAttribute("href", a), e.setAttribute("target", "_blank"), f = document.createEvent("HTMLEvents"), f.initEvent("click", a1, a1), e.dispatchEvent(f)) : window.open(a, b, c)
		},
		dr: function(a) {
			var b = this;
			b.dt != a && (b.dt = a, b.de(a))
		},
		de: function() {},
		du: function() {},
		di: function() {},
		ds: function() {
			return a1
		}
	},
	_m[_] = {
		save: function(a, b) {
			var c = "rb" + a;
			this.db ? this.db.zo(function(a) {
				a.executeSql("UPDATE rbMemory SET Val=? WHERE NamePK=?", [JSON.stringify(b), c])
			},
			this.zA) : window.localStorage != UD && window.localStorage.setItem(c, JSON.stringify(b))
		},
		read: function(uV, oObj) {
			var sJson = "UD",
			sRbKey = "rb" + uV,
			that = this;
			return that.db ? that.db.zo(function(a) {
				zK("before select" + sRbKey),
				a.executeSql("SELECT Val FROM rbMemory WHERE NamePK=?", [sRbKey],
				function(a, b) {
					var c,
					d;
					for (c = 0, d = b.r[pZ]; c < d; c++) zK(b.r.item(c).Val),
					sJson = b.r.item(c).Val
				},
				UD, that.zA)
			}) : window.localStorage != UD && (sJson = window.localStorage.getItem(sRbKey)),
			eval("sJson=" + sJson),
			sJson
		},
		U6: function(a) {
			return
		},
		zA: function() {}
	},
	_O[_] = {
		uy: function(a, b, c, d, e, f, g, h) {
			a[Zh](),
			a[UO](b + f, c),
			a[Zg](b + d - f, c),
			a[Zj](b + d, c, b + d, c + f),
			a[Zg](b + d, c + e - f),
			a[Zj](b + d, c + e, b + d - f, c + e),
			a[Zg](b + f, c + e),
			a[Zj](b, c + e, b, c + e - f),
			a[Zg](b, c + f),
			a[Zj](b, c, b + f, c),
			a[ZD](),
			g && a.fill(),
			h && a[ZF]()
		},
		uyOut: function(a, b, c, d, e, f, g, h) {
			g && (a[Zh](), a[UO](b + d, c), a[Zg](b + d - f, c), a[Zj](b + d, c, b + d, c + f), a[ZD](), a.fill(), a[Zh](), a[UO](b + d, c + e), a[Zg](b + d, c + e - f), a[Zj](b + d, c + e, b + d - f, c + e), a[ZD](), a.fill(), a[Zh](), a[UO](b, c + e), a[Zg](b, c + e - f), a[Zj](b, c + e, b + f, c + e), a[ZD](), a.fill(), a[Zh](), a[UO](b, c), a[Zg](b, c + f), a[Zj](b, c, b + f, c), a[ZD](), a.fill()),
			h && this.uy(a, b, c, d, e, f, tq, a1)
		},
		uj: function(a, b, c, d, e, f, g, i) {
			var j,
			k,
			l,
			m = d / 3,
			n = b + d / 2 - m;
			for (j = 0; j < 3; j++) {
				k = new qg(20, 20, 20, 1);
				if (g >= j + 1) k = new qg(255, 255, 255, 1);
				else if (i == tq) return;
				l = new wF(a, new h(n + j * m, c), f, 5, 0, new qg(255, 255, 255, .8), k, "qd"),
				l[ZJ] = 1,
				l.draw()
			}
		},
		centerText: function(a, b, c, d, e) {
			a.font = e || "10pt Arial",
			a[ZK] = "white",
			a.textAlign = "center",
			a.textBaseline = "middle",
			a[ZH](b, c, d)
		},
		uX: function(a) {
			return a
		}
	},
	_gc[_] = {
		draw: function(a) {
			var b,
			c,
			d,
			e,
			f,
			g,
			i,
			j,
			k,
			l,
			m,
			n,
			o,
			p,
			q,
			r,
			s = this,
			t = a,
			u = a,
			v = 4,
			w = 5;
			if (s.g[W_] < 250 || s.g[w_] < 250) v = 2,
			w = 3;
			s.g.zP ? (s.R = w, s.r = v) : (s.R = v, s.r = w),
			a == UD ? (u = mf(s.g.UJ / (s.R * s.r)), t = s.R * s.r * u) : t = s.R * s.r * a,
			b = 10,
			c = (s.g[W_] - b * 3) / s.R,
			d = (s.g[w_] - 50) / s.r,
			e = c - b,
			f = d - b,
			g = 7,
			i = (f - b * 1.1) / s.g[w_],
			s.g.aDs.clear(),
			s.s[ZG](0, 0, s.g[W_], s.g[w_]),
			s.g.zG(s.g.zO(s.g.level)),
			s.s[ZK] = "rgba(1,1,1,0.7)",
			s.s[Zd](0, 0, s.g[W_], s.g[w_]),
			s.s.save(),
			s.s.shadowColor = "white",
			s.s.shadowBlur = 4,
			s.g.aJ.clear(0, a1),
			s.s.font = "14pt sans-serif",
			s.s[ZK] = "white",
			s.s.textAlign = "center",
			s.s.textBaseline = "middle",
			s.s[ZH]("Select Level", s.g[W_] / 2, 20),
			s.s.shadowBlur = 10,
			s.R * s.r * (u + 1) < s.g.levels[pZ] && (j = new h(s.g[W_] - (b * 2 + 12), 20), k = new wF(s.s, j, 10, 3, 90, new qg(255, 255, 255, .8), new qg(40, 40, 40, .2)), k[ZK] = new qg(255, 255, 255), k.draw(), s.g.aJ.aG(j.x - 12, j.y - 12, j.x + 12, j.y + 12,
			function(a) {
				this.g.aJ.aJ[pZ] = 0,
				this.g.gc.draw(a + 1)
			},
			u, 1)),
			u != 0 && (j = new h(b * 2 + 12, 20), l = new wF(s.s, j, 10, 3, 30, new qg(255, 255, 255, .8), new qg(40, 40, 40, .2)), l[ZK] = new qg(255, 255, 255), l.draw(), s.g.aJ.aG(0, j.y - 12, j.x + 12, j.y + 12,
			function(a) {
				this.g.aJ.aJ[pZ] = 0,
				this.g.gc.draw(a - 1)
			},
			u, 2)),
			s.s[ZS]();
			for (m = 0; m < s.r; m++) {
				n = 40 + m * d;
				for (o = 0; o < s.R; o++) {
					p = 20 + o * c,
					s.s[Zk] = s.g.S.kC.gL(),
					s.s[ZK] = "rgba(0,0,0,0.5)",
					s.g.UJ == t ? (s.s[Zk] = "rgb(255,255,255)", s.s[ZJ] = 4) : (s.s[ZJ] = 2, s.s[Zk] = s.g.S.kC.gL()),
					q = s.s.createLinearGradient(0, n, 0, n + f),
					q.addColorStop(0, s.g.S.d9),
					q.addColorStop(.2, s.g.S.d0),
					q.addColorStop(.5, s.g.S.dq),
					q.addColorStop(1, s.g.S.dw),
					s.s[ZK] = q,
					s.O.uy(s.s, p, n, e, f, 4, a1, a1),
					r = {
						s: s.s,
						O: s.O,
						g: s.g,
						x: p,
						y: n,
						scaleRatio: i,
						levelID: t,
						qds: s.g.Zzs.zE(s.g.levels[t].id).qds,
						ua: g,
						g: s.g,
						zC: b
					},
					s.g.aDs.uD(function(a) {
						a.levelID != 17 || a.qds == 3,
						a.s.save(),
						a.g.zP ? a.s.translate(a.x + a.zC * 1.8 - 10, a.y) : a.s.translate(a.x + a.zC * 1.8, a.y),
						a.s[hardScale](i, i),
						a.s.globalAlpha = .5,
						a.g.zG(a.g.zO(a.g.levels[a.levelID]), UD, a1),
						a.s[ZS](),
						a.s.save(),
						a.s.font = "bold 12pt sans-serif",
						a.s[ZK] = "white",
						a.s.textAlign = "center",
						a.s.textBaseline = "middle",
						a.s.shadowColor = "white",
						a.s.shadowBlur = 5,
						a.s[ZH](a.levelID + 1, a.x + a.zC + 4, a.y + (a.zC + 4)),
						a.s.shadowBlur = 10,
						a.g.O.uj(a.s, a.x + 3, a.y + f - (g + 5), e - 6, 40, a.ua, a.qds),
						a.s.shadowBlur = 0,
						a.s[ZS]()
					},
					r),
					s.g.aJ.aG(p, n, e, f,
					function(a) {
						var b,
						c,
						d = this;
						d.g.aJ.clear(),
						d.g.UJ = a,
						d.g.sL(d.g.levels[d.g.UJ]),
						b = d.x + d[W_] / 2,
						c = d.y + d[w_] / 2,
						d.g.aDs.clear()
					},
					t),
					t++;
					if (t == s.g.levels[pZ]) {
						s.g.aDs.Ut();
						return
					}
				}
			}
			s.g.aDs.Ut()
		}
	},
	_Y4[_] = {
		ZN: function(a) {
			var b,
			c = this,
			d = (c[W_] - c.S.kK.x) / 2,
			e = c.zC,
			f = 0,
			g = new Array;
			g[g[pZ]] = new _Y4I("继续",
			function() {
				this.g.pause(tq),
				this.g.aJ.aJ[pZ] = 1
			}),
			g[g[pZ]] = new _Y4I("重新开始",
			function() {
				var a;
				this.g.sL(this.g.levels[this.g.UJ]),
				this.g.aJ.aJ[pZ] = 1,
				a = this.g.Zzs.zE(this.g.level.id),
				a.KU++
			}),
			b = function() {
				this.g.sL(this.g.levels[this.g.UJ]),
				this.g.aJ.aJ[pZ] = 1;
				var a = this.g.Zzs.zE(this.g.level.id);
				a.KU++
			},
			g[g[pZ]] = new _Y4I("分享",
			function(a) {
				this.g.aJ.clear(),
				this.g.uZ(1, a)
			},
			b),
			g[g[pZ]] = new _Y4I("切换游戏难度",
			function() {
				this.g.aJ.clear(0, a1),
				this.g.KG()
			}),
			g[g[pZ]] = new _Y4I("主菜单",
			function() {
				this.g.aJ.clear(),
				this.g.u7()
			}),
			f = this.zC * 3 + (this.zC + this.S.kA) * g[pZ],
			e = (this[w_] - f) / 2,
			a[ZJ] = 2,
			a[ZK] = this.S.kL.gL(),
			a[Zk] = this.S.kC.gL(),
			this.zv(a, this.S.kK, "菜单", "", g)
		},
		Zn: function(a) {
			var b,
			c,
			d,
			e,
			f,
			g = new Array,
			i = this;
			i.g.aJ.clear(),
			b = g[g[pZ]] = new _Y4I("开始 (" + (i.g.UZ.t[0] + i.g.UZ.t[1] + i.g.UZ.t[2]) + "/" + (i.g.gE[0][pZ] + i.g.gE[1][pZ] + i.g.gE[2][pZ]) + ")",
			function() {
				i.g.aJ.clear(0, a1),
				i.g.KG()
			}),
			i.dg != UD && (g[g[pZ]] = new _Y4I(i.dg[0], i.dg[1])),
			b = g[g[pZ]] = new _Y4I("分享",
			function() {
				i.g.aJ.clear(),
				i.g.uZ(0,
				function() {
					i.g.aJ.clear(),
					i.g.u7()
				})
			}),
			/*
			g[g[pZ]] = new _Y4I("统计",
			function() {
				i.g.aJ.clear(),
				i.g.KO()
			}),
			*/
			g[g[pZ]] = new _Y4I("游戏说明",
			function() {
				i.g.aJ.clear(),
				i.g.d5(0)
			}),
			g[g[pZ]] = new _Y4I("更多游戏",
			function() {
				i.g.KL(i.g.df, UD, UD, a1)
			}),
			/*
			i.dg == UD && (g[g[pZ]] = new _Y4I("关于",
			function() {
				i.g.aJ.clear(),
				i.g.UX()
			})),
			*/
			i[W_] < i[w_] ? i.zv(a, i.S.kJ, "主菜单", "", g) : (c = 360 + i.zC * 4, d = (i[W_] - c) / 2, e = new h(c + i.zC, 195), f = 55 + (i[w_] - e.y) / 2, i.zv(a, e, "主菜单", "", ""), i.Ui(a, d + i.zC, f + i.da, 180, 0, g.slice(0, 3)), i.Ui(a, d + i.zC * 3 + 180, f + i.da, 180, 0, g.slice(3)))
		},
		KF: function(a) {
			var b,
			c;
			this.g.aJ.clear(),
			b = new Array,
			c = b[b[pZ]] = new _Y4I("容易 (" + this.g.UZ.t[0] + "/" + this.g.gE[0][pZ] + ")",
			function() {
				this.g.aJ.clear(),
				this.g.uu(0),
				this.g.gD()
			}),
			c.selected = this.g.gC == 0,
			c = b[b[pZ]] = new _Y4I("中等 (" + this.g.UZ.t[1] + "/" + this.g.gE[1][pZ] + ")",
			function() {
				this.g.aJ.clear(),
				this.g.uu(1),
				this.g.gD()
			}),
			c.selected = this.g.gC == 1,
			c = b[b[pZ]] = new _Y4I("难 (" + this.g.UZ.t[2] + "/" + this.g.gE[2][pZ] + ")",
			function() {
				this.g.aJ.clear(),
				this.g.uu(2),
				this.g.gD()
			}),
			c.selected = this.g.gC == 2,
			c = b[b[pZ]] = new _Y4I("所有 (" + (this.g.UZ.t[0] + this.g.UZ.t[1] + this.g.UZ.t[2]) + "/" + (this.g.gE[0][pZ] + this.g.gE[1][pZ] + this.g.gE[2][pZ]) + ")",
			function() {
				this.g.aJ.clear(),
				this.g.uu( - 1),
				this.g.gD()
			}),
			c.selected = this.g.gC == 3,
			this.zv(a, {
				x: 220,
				y: 240,
				kV: 50
			},
			"选择难度", "", b)
		},
		ZB: function(a, b, c) {
			var d,
			e,
			f,
			g,
			h,
			i,
			j,
			k,
			l,
			m = this.g.S.ks,
			n = [];
			n[n[pZ]] = new _Y4I("完成", c),
			this.zv(a, this.S.KD, "点击右上角的分享按钮", "", n),
			d = 0,
			e = 0,
			f = 14 + (this[W_] - this.S.KD.x) / 2,
			g = 16 + (this[w_] - this.S.KD.y) / 2;
			for (h = 0, i = m[pZ]; h < i; h++) j = m[h],
			j[2] != "" && !(j[1].indexOf("mailto:") > -1 && this.g.d3) && (k = new Image, k.s = a, k.g = this.g, k.src = j[2], k.Zb = j, k.Zb.x = f + d * 40, k.Zb.y = g + e * 40 + this.da, k.Zb.url = this.g.df, b == 1 ? (l = this.g.Zzs.zE(this.g.level.id), l.qds > 0 ? (k.Zb.text = "I%20just%20completed%20Level%20" + this.g.level.iid + "%20of%20Pathuku", k.Zb.url += "/play/" + this.g.level.id + "/" + this.g.level.id.charAt(2)) : (k.Zb.text = "I'm%20stuck%20on%20Level%20" + this.g.level.iid + "%20of%20Pathuku.%20Try%20it.", k.Zb.url += "/play/" + this.g.level.id + "/00")) : k.Zb.text = "Check%20out%20Pathuku. It's%20addictive!!!", d++, d == 5 && (d = 0, e++), k.onload = function() {
				var a = this;
				a.g.aJ.aG(a.Zb.x, a.Zb.y, a.Zb[3], a.Zb[4],
				function(a) {
					var b = a[1].replace("[TITLE]", a.text).replace("[URL]", a.url);
					this.g.KL(b, "newwindow")
				},
				a.Zb),
				a.s.drawImage(a, a.Zb[5], a.Zb[6], a.Zb[3], a.Zb[4], a.Zb.x, a.Zb.y, a.Zb[3], a.Zb[4])
			})
		},
		pq: function(a) {
			var b = new Array;
			b[b[pZ]] = new _Y4I("重新开始",
			function() {
				this.g.aJ.clear(),
				this.g.sL(this.g.levels[this.g.UJ])
			}),
			this.zv(a, this.S.kN, "游戏结束", "继续努力", b)
		},
		KP: function(a) {
			var b,
			c,
			d,
			e,
			f = new Array;
			f[f[pZ]] = new _Y4I("继续",
			function() {
				this.g.aJ.clear(),
				this.g.u7()
			}),
			b = this,
			c = b.g.UZ,
			d = "成功: " + c.qds[0] + " \n失败: " + c.KU + " \n3星: " + c.qds[2] + " \n2星: " + (c.qds[1] - c.qds[2]) + " \n1星: " + (c.qds[0] - c.qds[1]) + "",
			e = new zU(a, d, 200, 14),
			this.zv(a, b.S.KA, "统计", e, f)
		},
		UC: function(a) {
			var b,
			c,
			d,
			e = new Array;
			e[e[pZ]] = new _Y4I(this.S.dc.dv,
			function() {
				this.g.KL(this.g.S.dl, "w")
			}),
			e[e[pZ]] = new _Y4I("继续",
			function() {
				this.g.aJ.clear(),
				this.g.u7()
			}),
			b = this,
			c = "Pathuku Version: " + b.g.version + " \nLevel Pack: " + b.g.UV + " \nContact:\n feedback@pathuku.com",
			d = new zU(a, c, 200, 14),
			this.zv(a, b.S.kW, "关于", d, e)
		},
		d2: function(a, b) {
			var c,
			d = new Array,
			e = {
				x: this.S.kF.x,
				y: this.S.kF.y + 10,
				kV: this.S.kF.kV + 10
			};
			b + 1 < this.S.kd[pZ] && (d[d[pZ]] = new _Y4I("Next",
			function() {
				this.g.aJ.clear(),
				this.g.d5(b + 1)
			}), e.kV -= 45),
			d[d[pZ]] = new _Y4I("完成",
			function() {
				this.g.aJ.clear(),
				this.g.u7()
			}),
			c = new zU(a, this.S.kd[b][2], 200, 14),
			this.zv(a, e, this.S.kd[b][1] + " (" + (b + 1) + "/" + this.S.kd[pZ] + ")", c, d)
		},
		ZV: function(a, b, c) {
			var d,
			e = new Array,
			f = c;
			f == UD && (f = function() {
				this.g.aJ.clear(),
				this.g.sL(this.g.levels[this.g.UJ])
			}),
			e[e[pZ]] = new _Y4I("继续", f),
			d = new zU(a, b[2], 200, 14),
			this.zv(a, this.S.kF, b[1], d, e)
		},
		Uh: function(a, b) {
			var c,
			d = new Array,
			e = {
				s: a,
				U4: b
			};
			d[d[pZ]] = new _Y4I("继续",
			function(a) {
				this.g.d_(),
				this.g.Y4.pu(a.s, a.U4)
			},
			e),
			c = new zU(a, "You have been promoted to:\n" + b.rank, 200, 15),
			this.zv(a, this.S.kG, "祝贺你", c, d)
		},
		dm: function(a, b) {
			var c,
			d = new Array,
			e = {
				s: a,
				U4: b
			};
			d[d[pZ]] = new _Y4I(this.S.dc.dv,
			function(a) {
				this.g.KL(this.g.S.dl, "w"),
				this.g.dn = 60,
				this.g.d_(),
				this.g.Y4.pu(a.s, a.U4)
			},
			e),
			d[d[pZ]] = new _Y4I(this.S.dc.dQ,
			function(a) {
				this.g.dn += 10,
				this.g.d_(),
				this.g.Y4.pu(a.s, a.U4)
			},
			e),
			c = new zU(a, this.S.dc.dn, 200, 15),
			this.zv(a, this.S.db, this.S.dc.dv, c, d)
		},
		pu: function(a, b) {
			var c,
			d = new Array,
			e = function() {
				var a = this;
				a.g.dR()
			};
			d[d[pZ]] = new _Y4I("下一关", e),
			d[d[pZ]] = new _Y4I("Share Completed Level",
			function(a) {
				this.g.aJ.clear(),
				this.g.uZ(1, a)
			},
			e),
			d[d[pZ]] = new _Y4I("重新再玩",
			function() {
				this.g.sL(this.g.levels[this.g.UJ]),
				this.g.aJ.clear()
			}),
			b.KY > b.Zz ? this.zv(a, this.S.kH, "用时:" + b.Zz, "", d) : this.zv(a, this.S.kH, "完成", "点击右上角的分享按钮！", d),
			a.save(),
			a.font = "10pt Arial",
			a[ZK] = "white",
			a.textAlign = "center",
			a.textBaseline = "middle",
			a.shadowColor = "white",
			a.shadowBlur = 6,
			c = (this[w_] - this.S.kH.y) / 2 + 50 + this.da,
			b.newRecord ? a[ZH]("新纪录时间:" + b.Zz, this[W_] / 2, c) : a[ZH]("Time:" + b.Zz, this[W_] / 2, c),
			a.shadowBlur = 8,
			this.O.uj(a, (this[W_] - this.S.kH.x) / 2 + 10, (this[w_] - this.S.kH.y) / 2 + 80 + this.da, this.S.kH.x - 20, 40, 15, b.qds),
			a[ZS]()
		},
		zv: function(a, b, c, d, e) {
			var f,
			g,
			h,
			i = this,
			j = (i[w_] - b.y) / 2 + i.da,
			k = (i[W_] - b.x) / 2;
			a[ZJ] = 2,
			a[ZK] = i.S.kL.gL(),
			a[Zk] = i.S.kC.gL(),
			f = a.createLinearGradient(0, j, 0, j + b.y),
			f.addColorStop(0, this.S.dy),
			f.addColorStop(.4, this.S.dq),
			f.addColorStop(.5, this.S.dq),
			f.addColorStop(1, this.S.d0),
			a[ZK] = f,
			i.O.uy(a, k, j, b.x, b.y, 10, a1, a1),
			a.save(),
			a.shadowColor = "white",
			a.shadowBlur = 7,
			a.font = "14pt Arial",
			a[ZK] = "white",
			a.textAlign = "center",
			a.textBaseline = "middle",
			a[ZH](c, i[W_] / 2, j + 24),
			a.font = "10pt Arial",
			d.text != UD ? d[ZH](i[W_] / 2, j + 60) : a[ZH](d, i[W_] / 2, j + 60),
			a[ZS](),
			g = 90,
			b.kV != UD && (g = b.kV);
			for (h = 0; h < e[pZ]; h++) i.Ub(a, k + 20, j + g + h * (e[h][w_] + 10), b.x - 40, e[h][w_], e[h].text, e[h].aD, e[h].selected, e[h].para)
		},
		Ui: function(a, b, c, d, e, f) {
			var g;
			for (g = 0; g < f[pZ]; g++) this.Ub(a, b, c + g * (f[g][w_] + this.zC), d, f[g][w_], f[g].text, f[g].aD, f[g].selected, f[g].para)
		},
		Ub: function(a, b, c, d, e, f, g, h, i) {
			var j;
			a.save(),
			a[ZK] = this.S.kS.gL(),
			h ? (a[Zk] = "rgb(255,255,255)", a[ZJ] = 4) : (a[ZJ] = 2, a[Zk] = this.S.kD.gL()),
			j = a.createLinearGradient(0, c, 0, c + e),
			j.addColorStop(0, this.S.d9),
			j.addColorStop(.3, this.S.d0),
			j.addColorStop(.4, this.S.dq),
			j.addColorStop(1, this.S.dw),
			a[ZK] = j,
			this.O.uy(a, b, c, d, e, 5, a1, a1),
			a.shadowColor = "white",
			a.shadowBlur = 6,
			a.font = "10pt Arial",
			a[ZK] = "white",
			a.textAlign = "center",
			a.textBaseline = "middle",
			a[ZH](f, b + d / 2, c + e / 2),
			this.aJ.aG(b, c, d, e, g, i),
			a[ZS]()
		}
	},
	_Uw[_] = {
		T: function(a, b) {
			if (a - b > 2e3) return;
			this.eE.T(a, b)
		},
		Zv: function() {
			var a = this;
			a.eE = a.gds[mf(a.gds[pZ] * mr())],
			a.eE.uw = a.uw.kX( - 120),
			a.eE.Zv()
		},
		up: function(a, b, c, d) {
			var e,
			f = this;
			for (e = 0; e < f.gds[pZ]; e++) f.gds[e][W_] = a,
			f.gds[e][w_] = b,
			f.gds[e].r = d,
			f.gds[e].R = c
		}
	},
	uk[_] = {
		T: function(a, b) {
			var c,
			d = this;
			d.zj = d.zj + (a - b) * d.gb || 0,
			d.s[Zk] = d.uw.gL(.5),
			d.s[Zh](),
			d.s.lineCap = "round",
			d.s[ZJ] = mr() * 8 + 2,
			c = d.u5.gL(.04);
			while (d.zj - 1 > 0) d.pl(),
			d.zj--,
			d.s[ZK] = c,
			d.s[Zd](0, 0, d[W_], d[w_]);
			d.s[ZF]()
		},
		Zv: function() {
			this.s[ZG](0, 0, this[W_], this[w_]),
			this.za()
		},
		za: function() {
			var a,
			b = this;
			b.s[Zk] = b.uw.gL(.4),
			b.s[Zh](),
			b.s[ZJ] = 2,
			b.s.lineCap = "round";
			for (a = 0; a < b.ls; a++) b.pl(),
			b.s[ZF]()
		},
		pl: function() {
			var a = this,
			b = a[w_],
			c = a[W_];
			a.s[UO](mr() * c, mr() * b),
			a.s.bezierCurveTo(mr() * c, mr() * b, mr() * c, mr() * b, mr() * c, mr() * b)
		}
	},
	Uc[_] = {
		T: function(a, b) {
			var c,
			d,
			e,
			f = this;
			f.zj = f.zj + (a - b) * f.gb || 0,
			f.s[Zk] = f.uw.gL(),
			f.s[Zh](),
			f.s[ZJ] = 1,
			c = f.u5.gL(.05);
			while (f.zj - 1 > 0) d = mn(mr() * f.R),
			e = mn(mr() * f.r),
			f.zR(d),
			f.zr(e),
			f.zj--,
			f.s[ZK] = c,
			f.s[Zd](0, 0, f[W_], f[w_]);
			f.s[ZF]()
		},
		Zv: function() {
			var a = this;
			a.s[ZG](0, 0, a[W_], a[w_]),
			a.Y = 14 + mn(mr() * 25),
			a.za()
		},
		za: function() {
			var a,
			b = this,
			c = 0;
			b.s[Zk] = b.uw.gL(),
			b.s[Zh](),
			b.s[ZJ] = 1;
			for (a = 0; a < b.R + 1; a++) b.zR(a);
			for (a = 0; a < b.r + 1; a++) b.zr(a);
			b.s[ZF]()
		},
		zR: function(a) {
			var b = this;
			b.pl(new h(a * b.K + mr() * b.Y, 0), new h(a * b.K + mr() * b.Y, b[w_]))
		},
		zr: function(a) {
			var b = this;
			b.pl(new h(0, a * b.k + b.z8 + mr() * b.Y), new h(b[W_], a * b.k + b.z8 + mr() * b.Y))
		},
		pl: function(a, b) {
			this.s[UO](a.x, a.y),
			this.s[Zg](b.x, b.y)
		}
	},
	u2[_] = {
		T: function(a, b) {
			var c,
			d = this;
			d.zj = d.zj + (a - b) * d.gb || 0,
			d.s[Zk] = d.uw.gL(),
			c = d.u5.gL(.0035),
			d.s[ZK] = c,
			d.s[Zd](0, 0, d[W_], d[w_]);
			while (d.zj - 1 > 0) d.uv(d.ps[mf(d.ps[pZ] * mr())]),
			d.zj--
		},
		Zv: function() {
			var a = this;
			a.s[ZG](0, 0, a[W_], a[w_]),
			a.za()
		},
		za: function() {
			var a,
			b,
			c,
			d,
			e,
			f,
			g,
			h,
			i,
			j,
			k,
			l,
			m,
			n,
			o,
			p = this;
			p.ps[pZ] = 0,
			a = 150 + 150 * mr(),
			b = 250 + 150 * mr(),
			c = 22,
			d = 3 + mn(mr() * 3),
			e = 24,
			p.ua = 10 + mn(mr() * 18),
			p.alpha = .4,
			p.uS = 30,
			p.ua > 13 && (p.alpha = .2),
			f = mr() * 500,
			g = mr() * 500,
			p.s.save();
			for (h = 1; h < c; h++) {
				i = h * e,
				j = 360 / (h * d);
				for (k = 0; k < h * d; k++) l = mP * (k * j / 360),
				m = a + ms(l) * i,
				n = b + mc(l) * i,
				m > -p.uS && m < p[W_] + p.uS && n > -p.uS && n < p[w_] + p.uS && (o = {
					x: m,
					y: n,
					x2: f,
					y2: g
				},
				(p.Uq == 1 || (h * c + k) % 10 == 1) && p.uv(o), p.ps.push(o))
			}
			p.s[ZS]()
		},
		uv: function(a) {
			var b = this,
			c = mr() * b.alpha + .04;
			b.s[Zh](),
			b.Uq == 1 ? (b.s[ZK] = b.uw.gL(c), b.s.arc(a.x, a.y, b.ua, 0, mP, a1), b.s.fill()) : (b.s[Zk] = b.uw.gL(c + .1), b.s[ZJ] = 1, b.s[UO](a.x, a.y), b.s[Zg](a.x2, a.y2), b.s[ZF]())
		}
	},
	window.onload = function(a) {
		a.handle != UD ? a.handle = new _ga(a) : new _ga(a)
	},
	W_ = "w_",
	w_ = "W_",
	pZ = "length",
	zK = alert,
	a1 = !0,
	tq = !1,
	mm = Math,
	mn = mm.round,
	mr = mm.random,
	mf = mm.floor,
	ms = mm.sin,
	mc = mm.cos,
	mP = mm.PI * 2,
	mp = mm.PI,
	mS = mm.sqrt,
	mC = mm.ceil,
	ln = "length",
	UD = null,
	UO = "moveTo",
	Zk = "strokeStyle",
	ZK = "fillStyle",
	ZJ = "lineWidth",
	Zj = "quadraticCurveTo",
	Zh = "beginPath",
	ZH = "fillText",
	Zg = "lineTo",
	ZG = "clearRect",
	Zf = "style",
	ZF = "stroke",
	Zd = "fillRect",
	ZD = "closePath",
	ZS = "restore",
	Zs = "getContext"
})()