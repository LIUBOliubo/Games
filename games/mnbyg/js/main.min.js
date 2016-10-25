var Config = {
	allTime: 3e4,
	liveTimeStart: 3e3,
	liveTimeEnd: 1e3,
	num: 3,
	meiziLen: 13,
	interval: 200
},

Res = ["mblogpic/53906b453e48eb290e34/120.jpg", "mblogpic/7a22839181b07a690ecc/120.jpg", "mblogpic/7e90dde8ac83ffd16b58/120.jpg", "mblogpic/f13da5af094ec552f0bc/120.jpg", "mblogpic/97bf0271a41eb311249a/120.jpg", "mblogpic/52bef08d35e6d8f36e7c/120.jpg", "mblogpic/62a31b4cf34795cc5e2c/120.jpg", "mblogpic/9960d7a52d32ba39d3fa/120.jpg", "mblogpic/55dc25c83d4eb9d23ba0/120.jpg", "mblogpic/36f94de5be883f5a6692/120.jpg", "mblogpic/f13da5af094ec552f0bc/120.jpg", "mblogpic/d2a78fdd1659381753a4/460.jpg", "mblogpic/830f59fcde1e5279f01a/460.jpg", "mblogpic/f8aa2f3ca6d4a2bb1622/460.jpg", "mblogpic/59a79dc060d981fe15b0/460.jpg", "mblogpic/d41a598521a46d91ffaa/80.jpg", "mblogpic/54b4a15b4ec611d6337e/460.jpg"],
timeoutData = [{
	max: 30,
	desc: "肥皂诚可贵，基友价更高！若为妹纸故，二者皆可抛~！这位壮士只亲到 #score# 位妹纸，还需努力啊~"
},
{
	max: 50,
	desc: "眼前的妹纸是我的心头爱，想要亲她就要点的快~这位壮士本次亲到 #score# 位妹纸，再来一次！可以亲更多的妹纸呢~！"
},
{
	max: 90,
	desc: "这位壮士眼疾手快亲到了 #score# 位美女，完美闪避出现的宅男~不亏是真·汉纸·无双！"
},
{
	max: 30,
	desc: "这位壮士完美闪避如花，亲到 #score# 个美女！你行？来试试？"
},
{
	max: 1e6,
	desc: "这位壮士真直男！爱美女！不畏基友和肥皂的诱惑，居然亲到了 #score# 位妹纸！真是叹为观止~！"
}],
suicideData = [{
	max: 0,
	desc: "恭喜您亲到了女神如花，他已决定为你生儿育女，和美丽的妹子 say goodbye吧~"
},
{
	max: 20,
	desc: "人固有一死，或死于老眼昏花错点如花，或死于手速太快误点宅男！马上再来一次，不亲到妹纸不罢休~"
},
{
	max: 40,
	desc: "此人死于手太快，错把如花当美女~你来亲亲美女试试？"
},
{
	max: 60,
	desc: "恭喜您亲到了女神如花，他已决定为你生儿育女，和美丽的妹子 say goodbye吧~"
},
{
	max: 80,
	desc: "壮士断腕，你勇于牺牲自己拯救妹子的精神已感动如花，真英雄，不畏基！"
},
{
	max: 1e5,
	desc: "虽然你亲到了大波的美女，但还是没能逃过宅男【王大锤】的荼毒……菊花残，满地伤……你的影子已……"
}],
rankData = [{
	max: 30,
	name: "色中菜鸟"
},
{
	max: 50,
	name: "色中好手"
},
{
	max: 70,
	name: "色中饿狼"
},
{
	max: 90,
	name: "色中领袖"
},
{
	max: 1e5,
	name: "色中翘楚"
}],
beatData = [{
	max: 3,
	percent: 0
},
{
	max: 5,
	percent: 8
},
{
	max: 10,
	percent: 20
},
{
	max: 15,
	percent: 40
},
{
	max: 30,
	percent: 70
},
{
	max: 40,
	percent: 85
},
{
	max: 50,
	percent: 98.5
},
{
	max: 60,
	percent: 99.2
},
{
	max: 70,
	percent: 99.4
},
{
	max: 80,
	percent: 99.6
},
{
	max: 90,
	percent: 99.8
},
{
	max: 1e5,
	percent: 100
}]; !
function(a) {
	var b,
	c = $("#layout"),
	d = $("#box"),
	e = ($(".page"), $("#box .hole")),
	f = $("#box .meizi"),
	g = ($("#box .kiss"), $(".count_down")),
	h = $(".score span"),
	i = [],
	j = [],
	k = 0,
	m = {
		init: function() {
			this.inited || (this.initEvent()),
			this.inited = !0
		},
		load: function() {
			function a() {
				c++,
				b == c && (m.init(), d.switchPage("index"))
			}
			for (var b = Res.length, c = 0, d = this, e = 0; b > e; e++) {
				var f = new Image;
				f.onload = a,
				f.src = Res[e]
			}
		},
		renderUI: function() {
			var b,
			c,
			g,
			h,
			i = a.innerWidth - 20,
			j = a.innerHeight - 50;
			j / i > 1.2 ? (b = Math.min(i, 500), g = (b - 12) / 3, h = 1.2 * g, c = 3 * h + 12) : (c = Math.min(j, 500), b = c / 1.2, g = (b - 12) / 3, h = 1.2 * g),
			d.width(b).height(c),
			e.width(g).height(h),
			f.width(g).height(h)
		},
		initEvent: function() {
			var a = "ontouchstart" in document.documentElement ? "touchend": "click";
			d.on(a, ".hole>div", _.bind(this.checkTap, this)),
			c.on(a, ".js_start_game", _.bind(this.start, this)),
			c.on(a, ".js_pause_game", _.bind(this.pause, this)),
			c.on(a, ".js_game_again", _.bind(this.again, this)),
			c.on(a, ".js_game_continue", _.bind(this.resume, this))
		},
		start: function() {
			this.reset(),
			console.log(">> start"),
			h.text(0),
			g.text(Config.allTime / 1e3),
			this.switchPage("game"),
			this.renderUI(),
			i = this.initThree(),
			console.log(i);
			for (var a = 0; 9 > a; a++) i[a] > 0 ? this.addMeizi(a) : j.push(!1);
			this.tick()
		},
		initThree: function() {
			for (var a = [], b = 0, c = 9; c > b; b++) a.push(3 > b ? Config.liveTimeStart: 0);
			return _.shuffle(a)
		},
		tick: function(b) {
			function c(b) {
				return e = e || b,
				b = Date.now(),
				f = b - e,
				f >= k && (d(f), e = b),
				l._gameover ? void(h && a.cancelAnimationFrame(h)) : l._pause ? void(h && a.cancelAnimationFrame(h)) : void(h = a.requestAnimationFrame(c))
			}
			function d(a) {
				var b = Date.now();
				if (l.time = b - m, l.time >= Config.allTime) return void l.gameOver("timeout");
				l.time < 6e3 && g.addClass("danger");
				for (var c = 0; 9 > c; c++) {
					var d = i[c] - a;
					d > 0 ? i[c] = d: j[c] && (l.removeMeizi(c), l.addMeizi())
				}
				g.text(Math.round((Config.allTime - l.time) / 1e3))
			}
			var e,
			f,
			h,
			k = Config.interval,
			l = this,
			m = Date.now();
			console.log("startTime", m),
			"resume" == b && (m -= l.time);
			var e = Date.now();
			h = a.requestAnimationFrame(c)
		},
		resume: function() {
			console.log(">> resume"),
			this._pause = !1,
			this.switchPage("game"),
			this.tick("resume")
		},
		pause: function() {
			console.log(">> pause"),
			this._pause = !0,
			this.switchPage("game_pause")
		},
		checkTap: function(a) {
			if (!this._gameover) {
				var b = this,
				c = $(a.currentTarget),
				d = c.data(),
				e = d.id,
				f = d.value;
				j[e] && (k = f, f ? (this.kiss(e,
				function() {
					b.removeMeizi(e)
				}), this.addMeizi(), this.setScore()) : this.gameOver("suicide"))
			}
		},
		setScore: function() {
			this.score += 1,
			h.text(this.score)
		},
		again: function() {
			console.log(">> again"),
			this.start(),
			this.switchPage("game")
		},
		gameOver: function(a) {
			console.log(">> gameover");
			var b = this;
			this._gameover = !0,
			b.switchPage("gameover"); {
				var c,
				d,
				e,
				g = this.score,
				h = this.filterText(g, beatData).percent;
				g > 0 ? "我一分钟亲了" + b.score + "个美女！肯定比你多，不信你试试？": shareDataX.tTitle
			}
			"timeout" == a ? (c = this.filterText(g, timeoutData), d = c.desc.replace(/#score#/, g), e = "恭喜你将她领回家~") : (c = this.filterText(g, suicideData), d = c.desc, e = "恭喜你将他领回家~");
			var i = $("#tpl_gameover").html(),
			j = _.template(i, {
				score: this.score,
				desc: d,
				img: Res[k],
				name: this.filterText(g, rankData).name,
				doMore: "再多亲" + this.random(4, 2) + "个就能多击败" + this.random(5, 2) + "%的玩家，加油哦~",
				congratulation: e,
				percent: h
			});
			$("#gameover").html(j),
			f.removeClass();
			dp_submitScore(g);
		},
		filterText: function(a, b) {
			var c = _.filter(b,
			function(b) {
				return a <= b.max
			});
			return c[0]
		},
		reset: function() {
			i = [],
			j = [],
			this.time = Config.allTime,
			this.score = 0,
			this._gameover = null,
			this._pause = !1,
			b = Date.now()
		},
		switchPage: function(a) {
			a && ($(".page").addClass("hide"), $("#" + a).addClass("show").removeClass("hide"))
		},
		random: function(a, b) {
			return Math.floor(Math.random() * (a - b + 1)) + b
		},
		randomSurplusOnly: function() {
			function a() {
				var c = 8,
				d = 0,
				e = Math.floor(Math.random() * (c - d + 1)) + d;
				return b[e] ? a() : e
			}
			var b = _.clone(j);
			return a()
		},
		removeMeizi: function(a) {
			i[a] = 0,
			j[a] = !1,
			$(f[a]).removeClass()
		},
		addMeizi: function(a) {
			var a = _.isUndefined(a) ? this.randomSurplusOnly() : a,
			b = this.random(Config.meiziLen - 1, 0);
			j[a] = !0,
			i[a] = this.getliveTime(),
			$(f[a]).addClass("meizi_" + b).addClass("meizi").data("value", b)
		},
		initShareEvent: function() {
			
		},
		kiss: function(a, b) {
			var c = $(f[a]),
			d = '<img src="mblogpic/54b4a15b4ec611d6337e/460.jpg" />';
			c.html(d),
			c.find("img").fadeOut(300, b)
		},
		getliveTime: function() {
			var a = (Config.liveTimeStart - Config.liveTimeEnd) / Config.allTime;
			return Config.liveTimeStart - this.time * a
		}
	};
	m.load()
} (window);