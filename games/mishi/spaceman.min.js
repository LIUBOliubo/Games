function main() {
	var e = {
		isShowClue1: !0,
		isFirstInGame: !1,
		init: function() {
			jsGame.canvas.screen.setWidth(e.width);
			jsGame.canvas.screen.setHeight(e.height);
			e.width < e.height && (e.clue = !0);
			300 <= e.height ? e.isShowClue1 = !1 : e.isFirstInGame && (e.isFirstInGame = !1, e.isShowClue1 = !0)
		},
		initCanvas: function() {
			jsGame.canvas.screen.getTouch() ? (window.scrollTo(0, -5), e.height = 640, e.width = 480, jsGame.canvas.screen.setHeight(e.height), e.top = 0, e.left = 0) : (e.height = 640, e.width = 480, jsGame.canvas.screen.setHeight(e.height), jsGame.canvas.screen.setWidth(e.width), e.top = 0, e.left = (window.innerWidth - e.width) / 2);
			e.init();
			e.canvas = document.getElementById("jsGameScreen");
			e.ctx = e.canvas.getContext("2d")
		}
	};
	e.initCanvas();
	jsGame.initImage([{
		id: "a",
		src: "3.png"
	},
	{
		id: "h",
		src: "4.png"
	},
	{
		id: "chinese",
		src: "5.png"
	},
	{
		id: "english",
		src: "6.png"
	},
	{
		id: "fm",
		src: "1.jpg"
	},
	{
		id: "jianren",
		src: "7.png"
	},
	{
		id: "xue",
		src: "8.png"
	},
	{
		id: "bl1",
		src: "9.png"
	},
	{
		id: "bl2",
		src: "10.png"
	},
	{
		id: "han1",
		src: "11.png"
	},
	{
		id: "han2",
		src: "12.png"
	},
	{
		id: "sb",
		src: "13.png"
	},
	{
		id: "sz",
		src: "14.png"
	},
	{
		id: "start",
		src: "15.png"
	},
	{
		id: "startE",
		src: "16.png"
	},
	{
		id: "more",
		src: "17.png"
	},
	{
		id: "moreE",
		src: "18.png"
	},
	{
		id: "back",
		src: "19.png"
	},
	{
		id: "backE",
		src: "20.png"
	},
	{
		id: "retry",
		src: "21.png"
	},
	{
		id: "retryE",
		src: "22.png"
	},
	{
		id: "intro",
		src: "23.png"
	},
	{
		id: "score",
		src: "24.png"
	},
	{
		id: "scoreE",
		src: "25.png"
	},
	{
		id: "Hscore",
		src: "26.png"
	},
	{
		id: "HscoreE",
		src: "27.png"
	}]);
	jsGame.initImageCallBack(function(t, n) {
		if (t >= n) jsGame.gameFlow.run();
		else try {
			var r = t / n,
			r = 1 < r ? 1 : r;
			e.ctx.fillStyle = "#000000";
			e.ctx.fillRect(0, 0, e.width, e.height);
			e.ctx.drawImage(jsGame.getImage("a"), 0, 0, 250, 81, (e.width - 250) / 2, (e.height - 81) / 2, 250, 81);
			e.ctx.drawImage(jsGame.getImage("a"), 2, 86, 246 * r, 10, (e.width - 246) / 2, (e.height - 81) / 2 + 51, 246 * r, 10)
		} catch(i) {}
	});
	jsGame.pageLoad(function(t) {
		function n(e, n, r, i, s, o, u, a, f, l) {
			t.canvas.drawImage(e, n * i, r * s, i, s, o, u, a, f, l)
		}
		function r(e, t, n) {
			return t > e.x && n > e.y && t < e.x + e.w && n < e.y + e.h ? !0 : !1
		}
		function i(e) {
			D == L ? r(u, e.x, e.y) ? u.isPressed = !0 : r(a, e.x, e.y) && (a.isPressed = !0) : D == A ? r(f, e.x, e.y) ? f.isPressed = !0 : r(l, e.x, e.y) && (l.isPressed = !0) : D == O ? (B(), D = M) : D == M ? e.x >= t.canvas.screen.getWidth() / 2 ? v.jianren.state == p.jianRenStateType.normal && (v.jianren.index++, v.jianren.index >= v.wall.tiles.bottom.length && (v.jianren.index = 0), v.jianren.direction = p.jianRenDirection.right) : v.jianren.state == p.jianRenStateType.normal && (v.jianren.index--, 0 > v.jianren.index && (v.jianren.index = v.wall.tiles.bottom.length - 1), v.jianren.direction = p.jianRenDirection.left) : D == _ && (r(c, e.x, e.y) ? c.isPressed = !0 : r(h, e.x, e.y) && (h.isPressed = !0))
		}
		function s(e) {
			D == L ? (r(u, e.x, e.y) || (u.isPressed = !1), r(a, e.x, e.y) || (a.isPressed = !1)) : D == A ? (r(f, e.x, e.y) || (f.isPressed = !1), r(l, e.x, e.y) || (l.isPressed = !1)) : D == _ && (r(c, e.x, e.y) || (c.isPressed = !1), r(h, e.x, e.y) || (h.isPressed = !1))
		}
		function o(e) {
			D == L ? u.isPressed && r(u, e.x, e.y) ? (D = A, P = "CHS", t.localStorage.setItem("language2", P), u.isPressed = !1) : a.isPressed && r(a, e.x, e.y) && (D = A, P = "ENG", t.localStorage.setItem("language2", P), a.isPressed = !1) : D == A ? f.isPressed && r(f, e.x, e.y) ? (D = O, f.isPressed = !1) : l.isPressed && r(l, e.x, e.y) && (goHome(), l.isPressed = !1) : D == _ && (c.isPressed && r(c, e.x, e.y) ? (B(), D = M, c.isPressed = !1) : h.isPressed && r(h, e.x, e.y) && (D = A, h.isPressed = !1))
		}
		e.showClue = function() {
			window.scrollTo(0, -5);
			e.ctx.fillStyle = "#ffffff";
			e.ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
			t.canvas.drawImage("h", (window.innerWidth - 153) / 2, (window.innerHeight - 122) / 2)
		};
		var u = {
			x: (t.canvas.screen.getWidth() - 126) / 2,
			y: 180,
			w: 126,
			h: 35,
			isPressed: !1,
			draw: n
		},
		a = {
			x: (t.canvas.screen.getWidth() - 126) / 2,
			y: 260,
			w: 126,
			h: 35,
			isPressed: !1,
			draw: n
		},
		f = {
			x: (t.canvas.screen.getWidth() - 126) / 2,
			y: 420,
			w: 126,
			h: 35,
			isPressed: !1,
			draw: n
		},
		l = {
			x: (t.canvas.screen.getWidth() - 126) / 2,
			y: 500,
			w: 126,
			h: 35,
			isPressed: !1,
			draw: n
		},
		c = {
			x: (t.canvas.screen.getWidth() - 126) / 2,
			y: 420,
			w: 126,
			h: 35,
			isPressed: !1,
			draw: n
		},
		h = {
			x: (t.canvas.screen.getWidth() - 126) / 2,
			y: 500,
			w: 126,
			h: 35,
			isPressed: !1,
			draw: n
		},
		p = {
			jianRenStateType: {
				normal: 0,
				died: 1,
				stop: 2
			},
			jianRenDirection: {
				center: 0,
				left: 1,
				right: 2
			}
		},
		v = {
			baseY: 0,
			mission: 0,
			wall: {
				width: 30,
				topWallY: -150,
				bottomWallY: 0,
				timeout: 1e3,
				gapTimeout: 1e3,
				dropped: !1,
				tiles: {
					top: [],
					bottom: []
				}
			},
			jianren: {
				index: 0,
				y: 0,
				width: 30,
				height: 38,
				state: p.jianRenStateType.normal,
				direction: p.jianRenDirection.center,
				showAction: !1
			}
		},
		m,
		g,
		y,
		b,
		w,
		E,
		S = [20, 35, 50, 25],
		x,
		T = function(e) {
			if (0 < e) {
				switch (e) {
				case 10:
					y = 3;
					v.wall.timeout = 500;
					break;
				case 20:
					y = 2;
					v.wall.timeout = 350;
					break;
				case 30:
					y = 1;
					v.wall.timeout = 225;
					break;
				case 40:
					v.wall.timeout = 100;
					break;
				case 50:
					v.wall.timeout = 50
				}
				for (b = []; b.length < y;) if (w = t.commandFuns.getRandom(0, parseInt(t.canvas.screen.getWidth() / 2 / v.wall.width) - 1), 0 == b.length) b.push(w);
				else {
					E = !0;
					for (e = 0; e < b.length; e++) w == b[e] && (E = !1);
					E && b.push(w)
				}
				var n;
				v.wall.tiles.top = [];
				v.wall.tiles.bottom = [];
				for (e = 0; e < parseInt(t.canvas.screen.getWidth() / 2 / v.wall.width); e++) n = t.commandFuns.getRandom(220, 280),
				v.wall.tiles.top.push({
					height: n
				}),
				v.wall.tiles.bottom.push({
					height: t.canvas.screen.getHeight() - n
				});
				for (e = 0; e < b.length; e++) v.wall.tiles.top[b[e]].height -= S[t.commandFuns.getRandom(0, S.length - 1)]
			} else v.wall.tiles = {
				top: [{
					height: 250
				},
				{
					height: 250
				},
				{
					height: 250
				},
				{
					height: 250
				},
				{
					height: 215
				},
				{
					height: 250
				},
				{
					height: 250
				},
				{
					height: 250
				}],
				bottom: [{
					height: 70
				},
				{
					height: 70
				},
				{
					height: 70
				},
				{
					height: 70
				},
				{
					height: 70
				},
				{
					height: 70
				},
				{
					height: 70
				},
				{
					height: 70
				}]
			};
			m = [];
			for (e = 0; e < v.wall.tiles.top.length; e++) m.push({
				sx: e * v.wall.width,
				sy: v.baseY + v.wall.tiles.top[e].height,
				ex: (e + 1) * v.wall.width,
				ey: v.baseY + v.wall.tiles.top[e].height
			});
			g = [];
			for (e = 0; e < v.wall.tiles.bottom.length; e++) g.push({
				sx: e * v.wall.width,
				sy: v.baseY + t.canvas.screen.getHeight() - v.wall.tiles.bottom[e].height,
				ex: (e + 1) * v.wall.width,
				ey: v.baseY + t.canvas.screen.getHeight() - v.wall.tiles.bottom[e].height
			});
			v.wall.topWallY = -150;
			v.wall.bottomWallY = 0;
			v.wall.timeout = 1e3;
			v.wall.gapTimeout = 800;
			v.wall.dropped = !1;
			v.jianren.index = 4;
			v.jianren.y = 150;
			v.jianren.state = p.jianRenStateType.normal;
			v.jianren.showAction = !1;
			x = t.commandFuns.getRandom(0, 1)
		},
		N = 0,
		C,
		k,
		L = 5,
		A = 0,
		O = 1,
		M = 2,
		_ = 3,
		D = 0,
		P = "",
		H = 0,
		P = "CHS",
		D = null == P ? L: A,
		H = t.localStorage.getItem("highScore2");
		null == H && (H = 0);
		updateShareScore(H);
		var B = function() {
			N = 0;
			v.mission = 1;
			y = 3;
			v.jianren.direction = p.jianRenDirection.center;
			C = 0;
			k = 105;
			T(v.mission)
		},
		j = function() {
			t.canvas.drawImage("bl1", 0, 0, t.getImage("bl1").width, t.getImage("bl1").height, 0, 0, t.canvas.screen.getWidth(), t.canvas.screen.getHeight())
		},
		F = [],
		I = 0,
		q = [],
		R,
		U = 0,
		z = [{
			sx: 0,
			sy: 0
		},
		{
			sx: 30,
			sy: 0
		}],
		W = 0,
		X = [{
			sx: 60,
			sy: 0
		},
		{
			sx: 60,
			sy: 0
		},
		{
			sx: 90,
			sy: 0
		},
		{
			sx: 90,
			sy: 0
		},
		{
			sx: 120,
			sy: 0
		},
		{
			sx: 120,
			sy: 0
		},
		{
			sx: 150,
			sy: 0
		},
		{
			sx: 150,
			sy: 0
		},
		{
			sx: 180,
			sy: 0
		},
		{
			sx: 180,
			sy: 0
		}],
		V,
		$ = [0, 1],
		J = [2, 3],
		K = 0,
		Q = [{
			sx: 0,
			sy: 0
		},
		{
			sx: 30,
			sy: 0
		},
		{
			sx: 60,
			sy: 0
		},
		{
			sx: 90,
			sy: 0
		},
		{
			sx: 120,
			sy: 0
		}],
		G = 0,
		Y = function(e, n) {
			6 > G ? (t.canvas.drawImage("han1", 20 * parseInt(G), 0, 20, 17, 2 * (e + 15), 2 * n, 40, 34), G += .5) : 12 > G && (t.canvas.drawImage("han2", 20 * parseInt(G - 6), 0, 20, 17, 2 * (e - 5), 2 * n, 40, 34), G += .5, G %= 12)
		},
		Z = [],
		et = [],
		tt,
		nt = function(e, n, r) {
			t.canvas.beginPath();
			t.canvas.lineWidth(2 * (n + 2)).strokeStyle("#000000");
			for (var i = 0; i < e.length; i++) 0 == i ? t.canvas.moveTo(2 * e[i].sx, 2 * (r + e[i].sy)) : t.canvas.lineTo(2 * e[i].sx, 2 * (r + e[i].sy)),
			t.canvas.lineTo(2 * e[i].ex, 2 * (r + e[i].ey));
			t.canvas.stroke();
			t.canvas.lineWidth(2 * n).strokeStyle("#00FF00");
			for (i = 0; i < e.length; i++) 0 == i ? t.canvas.moveTo(2 * e[i].sx, 2 * (r + e[i].sy)) : t.canvas.lineTo(2 * e[i].sx, 2 * (r + e[i].sy)),
			t.canvas.lineTo(2 * e[i].ex, 2 * (r + e[i].ey));
			t.canvas.stroke().closePath().lineWidth(2)
		},
		rt = 0,
		it = {
			x: 0,
			y: 0
		};
		t.events.touchStart(function(e) {
			it = {
				x: e.touches[0].clientX,
				y: e.touches[0].clientY
			};
			i(it)
		}).touchMove(function(e) {
			it = {
				x: e.touches[0].clientX,
				y: e.touches[0].clientY
			};
			s(it)
		}).touchEnd(function(e) {
			o(it)
		}).mouseMove(function(t) {
			it = {
				x: t.clientX - e.left,
				y: t.clientY - e.top
			};
			s(it)
		}).mouseDown(function(t) {
			it = {
				x: t.clientX - e.left,
				y: t.clientY - e.top
			};
			i(it)
		}).mouseUp(function(t) {
			it = {
				x: t.clientX - e.left,
				y: t.clientY - e.top
			};
			o(it)
		});
		var st = !1;
		t.run(function() {
			window.scrollTo(0, -5);
			if (window.innerHeight < window.innerWidth && jsGame.canvas.screen.getTouch()) e.showClue(),
			st = !0;
			else if (st && (st = !1), D == L) e.ctx.fillStyle = "#000000",
			e.ctx.fillRect(0, 0, e.width, e.height),
			u.draw("chinese", 0, u.isPressed ? 1 : 0, u.w, u.h, u.x, u.y, u.w, u.h),
			a.draw("english", 0, a.isPressed ? 1 : 0, a.w, a.h, a.x, a.y, a.w, a.h);
			else if (D == A) {
				e.ctx.fillStyle = "#000000";
				e.ctx.fillRect(0, 0, e.width, e.height);
				var n = t.canvas.screen.getWidth() / t.getImage("fm").width;
				t.canvas.drawImage("fm", 0, 0, t.getImage("fm").width, t.getImage("fm").height, 0, 0, t.getImage("fm").width * n, t.getImage("fm").height * n);
				"ENG" == P ? (f.draw("startE", 0, f.isPressed ? 1 : 0, f.w, f.h, f.x, f.y, f.w, f.h), l.draw("moreE", 0, l.isPressed ? 1 : 0, l.w, l.h, l.x, l.y, l.w, l.h)) : (f.draw("start", 0, f.isPressed ? 1 : 0, f.w, f.h, f.x, f.y, f.w, f.h), l.draw("more", 0, l.isPressed ? 1 : 0, l.w, l.h, l.x, l.y, l.w, l.h))
			} else if (D == O) j(),
			t.canvas.drawImage("intro", (t.canvas.screen.getWidth() - t.getImage("intro").width) / 2, 60);
			else if (D == _) {
				j();
				t.canvas.drawImage("jianren", parseInt(C) * v.jianren.width, 2 * v.jianren.height, v.jianren.width, v.jianren.height, k, 30, 2 * v.jianren.width, 2 * v.jianren.height);
				C += .2;
				C %= 2;
				260 == k ? rt = 1 : 80 == k && (rt = 0);
				k = 0 == rt ? k + 1 : k - 1;
				var r = t.getImage("sb"),
				n = r.width,
				r = r.height,
				n = parseInt((t.canvas.screen.getWidth() - n) / 2),
				r = parseInt((t.canvas.screen.getHeight() - r) / 2) - 40;
				t.canvas.drawImage("sb", n, r);
				"ENG" == P ? (t.canvas.drawImage("scoreE", n + 30, r + 200).drawNumber(v.mission, "sz", 8, 15, n + 84, r + 202, !1), t.canvas.drawImage("HscoreE", n + 30, r + 170).drawNumber(H, "sz", 8, 15, n + 124, r + 172, !1), c.draw("retryE", 0, c.isPressed ? 1 : 0, c.w, c.h, c.x, c.y, c.w, c.h), h.draw("backE", 0, h.isPressed ? 1 : 0, h.w, h.h, h.x, h.y, h.w, h.h)) : (t.canvas.drawImage("score", n + 30, r + 200).drawNumber(v.mission, "sz", 8, 15, n + 84, r + 202, !1), t.canvas.drawImage("Hscore", n + 30, r + 170).drawNumber(H, "sz", 8, 15, n + 124, r + 172, !1), c.draw("retry", 0, c.isPressed ? 1 : 0, c.w, c.h, c.x, c.y, c.w, c.h), h.draw("back", 0, h.isPressed ? 1 : 0, h.w, h.h, h.x, h.y, h.w, h.h))
			} else if (4 == D)"ENG" == P ? t.canvas.drawImage("isexitE", (t.canvas.screen.getWidth() - t.getImage("isexit").width) / 2, 300) : t.canvas.drawImage("isexit", (t.canvas.screen.getWidth() - t.getImage("isexit").width) / 2, 300);
			else if (D == M) switch (N) {
			case 0:
				N = 1;
				break;
			case 1:
				t.canvas.clearScreen();
				j();
				F = v.wall.tiles.top;
				t.canvas.fillStyle("#333333");
				for (n = 0; n < F.length; n++) t.canvas.drawImage("bl2", n * v.wall.width, 0, v.wall.width, F[n].height, n * v.wall.width * 2, 2 * (v.baseY + v.wall.topWallY), 2 * v.wall.width, 2 * F[n].height);
				nt(m, 2, v.wall.topWallY); - 150 >= v.wall.topWallY && 0 == v.mission && (I++, I %= 2);
				q = v.wall.tiles.bottom;
				t.canvas.fillStyle("#000000");
				for (n = 0; n < q.length; n++) t.canvas.fillRect(n * v.wall.width * 2, 2 * (v.baseY + t.canvas.screen.getHeight() - q[n].height + v.wall.bottomWallY), 2 * v.wall.width, 2 * q[n].height);
				nt(g, 2, v.wall.bottomWallY);
				R = v.baseY + t.canvas.screen.getHeight() - v.wall.tiles.bottom[v.jianren.index].height - v.jianren.height;
				if (v.jianren.y < R) R = v.jianren.y - v.jianren.height,
				v.jianren.y += 10,
				t.canvas.drawImage("jianren", z[U].sx, z[U].sy, v.jianren.width, v.jianren.height, 2 * (v.jianren.index * v.wall.width + parseInt((v.wall.width - v.jianren.width) / 2)), 2 * R, 2 * v.jianren.width, 2 * v.jianren.height),
				Y(v.jianren.index * v.wall.width + parseInt((v.wall.width - v.jianren.width) / 2), R),
				U++,
				U %= z.length;
				else if (v.jianren.showAction) if (v.jianren.state != p.jianRenStateType.died) switch (V = t.canvas.screen.getHeight() - (v.wall.tiles.top[v.jianren.index].height + v.wall.tiles.bottom[v.jianren.index].height), V) {
				case S[0]:
					t.canvas.drawImage("jianren", $[x] * v.jianren.width, v.jianren.height, v.jianren.width, v.jianren.height, 2 * (v.jianren.index * v.wall.width + parseInt((v.wall.width - v.jianren.width) / 2)), 2 * R, 2 * v.jianren.width, 2 * v.jianren.height);
					Y(v.jianren.index * v.wall.width + parseInt((v.wall.width - v.jianren.width) / 2), R + 10);
					break;
				case S[1]:
					t.canvas.drawImage("jianren", J[x] * v.jianren.width, v.jianren.height, v.jianren.width, v.jianren.height, 2 * (v.jianren.index * v.wall.width + parseInt((v.wall.width - v.jianren.width) / 2)), 2 * R, 2 * v.jianren.width, 2 * v.jianren.height);
					Y(v.jianren.index * v.wall.width + parseInt((v.wall.width - v.jianren.width) / 2), R);
					break;
				case S[2]:
					t.canvas.drawImage("jianren", X[W].sx, X[W].sy, v.jianren.width, v.jianren.height, 2 * (v.jianren.index * v.wall.width + parseInt((v.wall.width - v.jianren.width) / 2)), 2 * R, 2 * v.jianren.width, 2 * v.jianren.height);
					W++;
					W %= X.length;
					break;
				case S[3]:
					t.canvas.drawImage("jianren", 7 * v.jianren.width, 0, v.jianren.width, v.jianren.height, 2 * (v.jianren.index * v.wall.width + parseInt((v.wall.width - v.jianren.width) / 2)), 2 * R, 2 * v.jianren.width, 2 * v.jianren.height),
					Y(v.jianren.index * v.wall.width + parseInt((v.wall.width - v.jianren.width) / 2), R)
				} else t.canvas.drawImage("xue", Q[K].sx, Q[K].sy, 30, 30, 2 * (v.jianren.index * v.wall.width + parseInt((v.wall.width - v.jianren.width) / 2)), 2 * (v.baseY + t.canvas.screen.getHeight() - v.wall.tiles.bottom[v.jianren.index].height) + 2, 60, 60),
				K < Q.length - 1 && K++;
				else switch (v.jianren.direction) {
				case p.jianRenDirection.center:
					t.canvas.drawImage("jianren", X[W].sx, X[W].sy, v.jianren.width, v.jianren.height, 2 * (v.jianren.index * v.wall.width + parseInt((v.wall.width - v.jianren.width) / 2)), 2 * R, 2 * v.jianren.width, 2 * v.jianren.height);
					W++;
					W %= X.length;
					break;
				case p.jianRenDirection.left:
					t.canvas.drawImage("jianren", (v.jianren.y < R ? 7 : 5) * v.jianren.width, v.jianren.height, v.jianren.width, v.jianren.height, 2 * (v.jianren.index * v.wall.width + parseInt((v.wall.width - v.jianren.width) / 2)), 2 * R, 2 * v.jianren.width, 2 * v.jianren.height);
					break;
				case p.jianRenDirection.right:
					t.canvas.drawImage("jianren", (v.jianren.y < R ? 6 : 4) * v.jianren.width, v.jianren.height, v.jianren.width, v.jianren.height, 2 * (v.jianren.index * v.wall.width + parseInt((v.wall.width - v.jianren.width) / 2)), 2 * R, 2 * v.jianren.width, 2 * v.jianren.height)
				}
				"ENG" == P ? (t.canvas.fillStyle("#000000").fillRect(0, 624, t.canvas.screen.getWidth(), 2).drawImage("scoreE", 360, 5).drawNumber(v.mission, "sz", 8, 15, 435, 5, !1), t.canvas.drawImage("HscoreE", 2, 5).drawNumber(H, "sz", 8, 15, 120, 5, !1)) : (t.canvas.fillStyle("#000000").fillRect(0, 624, t.canvas.screen.getWidth(), 2).drawImage("score", 360, 5).drawNumber(v.mission, "sz", 8, 15, 435, 5, !1), t.canvas.drawImage("Hscore", 2, 5).drawNumber(H, "sz", 8, 15, 120, 5, !1));
				0 < Z.length ? v.wall.topWallY += Z.shift().y: (0 < et.length && (tt = et.shift(), v.wall.topWallY += tt.y, v.wall.bottomWallY += tt.y), v.wall.dropped && (v.jianren.showAction = !0));
				0 < v.wall.timeout ? v.wall.timeout -= 50 : v.wall.dropped ? (0 == Z.length && (v.jianren.state = p.jianRenStateType.stop), 0 == et.length && (n = v.jianren.index, v.wall.tiles.top[n].height + v.wall.tiles.bottom[n].height >= t.canvas.screen.getHeight() && (v.jianren.state = p.jianRenStateType.died), 0 < v.wall.gapTimeout ? v.wall.gapTimeout -= 50 : v.jianren.state != p.jianRenStateType.died ? T(++v.mission) : N = 2)) : (0 == Z.length && (K = 0, Z = [{
					y: -2
				},
				{
					y: 2
				},
				{
					y: -2
				},
				{
					y: 2
				},
				{
					y: -2
				},
				{
					y: 2
				},
				{
					y: -2
				},
				{
					y: 2
				},
				{
					y: -2
				},
				{
					y: 2
				},
				{
					y: 0
				},
				{
					y: 10
				},
				{
					y: 15
				},
				{
					y: 25
				},
				{
					y: 25
				},
				{
					y: 30
				},
				{
					y: 45
				}]), 0 == et.length && (et = [{
					y: -2
				},
				{
					y: 2
				},
				{
					y: -2
				},
				{
					y: 2
				},
				{
					y: -2
				},
				{
					y: 2
				},
				{
					y: 0
				}]), v.wall.dropped = !0);
				t.keyPressed("a") && !v.wall.dropped && (v.wall.timeout = 0);
				t.keyPressed("left") && v.jianren.state == p.jianRenStateType.normal ? (v.jianren.index--, 0 > v.jianren.index && (v.jianren.index = v.wall.tiles.bottom.length - 1), v.jianren.direction = p.jianRenDirection.left) : t.keyPressed("right") && v.jianren.state == p.jianRenStateType.normal ? (v.jianren.index++, v.jianren.index >= v.wall.tiles.bottom.length && (v.jianren.index = 0), v.jianren.direction = p.jianRenDirection.right) : v.jianren.direction = p.jianRenDirection.center;
				t.keyPressed("menu") && (H < v.mission && (H = v.mission, t.localStorage.setItem("highScore2", H)), t.gameFlow.stop());
				break;
			case 2:
				H < v.mission && (play68_submitScore(v.mission), H = v.mission, t.localStorage.setItem("highScore2", H)),
				t.gameFlow.stop(),
				D = _
			}
		})
	})
}