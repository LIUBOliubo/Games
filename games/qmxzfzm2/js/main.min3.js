
var _lang = {
	zh1: {
		title: "全民摇一摇寻找房祖名",
		help_txt: "虽然柯少向龙叔保证不会带坏房祖名,但龙叔强烈要求你找回祖名。",
		score: "得分：",
		btn_pause: "暂停",
		btn_start: "开始游戏",
		btn_reTry: "再来一次",
		btn_more_game: "更多游戏",
		game_pause: "游戏暂停",
		btn_resume: "继续游戏",
		loading: "加载中...",
		lv_txt: ["龙叔的脑残粉", "龙叔的忠实粉", "龙叔的路人粉", "慧眼识祖名", "火眼金睛", "洞察一切", "两眼冒光", "24k氪金眼", "已被亮瞎！"],
		share_txt1: "我闯过",
		share_txt2: "关，击败",
		share_txt3: "%的人，我是【",
		share_txt4: "】，不服来战！",
		desc: "找出所有色块中颜色不同的一块。分享朋友圈，找到身边的色魔"
	},
	zh: {
		title: "全民摇一摇寻找房祖名",
		help_txt: "虽然柯少向龙叔保证不会带坏房祖名,但龙叔强烈要求你找回祖名。",
		score: "过关：",
		btn_pause: "暂停",
		btn_start: "开始游戏",
		btn_reTry: "再来一次",
		btn_more_game: "更多游戏",
		game_pause: "游戏暂停",
		btn_resume: "继续游戏",
		loading: "加载中...",
		lv_txt: ["龙叔的脑残粉", "龙叔的忠实粉", "龙叔的路人粉", "慧眼识祖名", "火眼金睛", "洞察一切", "两眼冒光", "24k氪金眼", "已被亮瞎！"],
		share_txt1: "【找妹子】我在",
		share_txt2: "只袜子中找到",
		share_txt3: "个妹子，我是【",
		share_txt4: "】，不服来战！",
		desc: "找出所有'袜'字中的'妹'字。分享朋友圈，找到身边的色魔"
	},
	en: {
		title: "How strong is your eyesight",
		help_txt: "Find the box with the different colour",
		score: "Score：",
		btn_pause: "Pause",
		btn_start: "Start",
		btn_reTry: "Again",
		btn_more_game: "More games",
		game_pause: "Pause",
		btn_resume: "Continues",
		loading: "loading...",
		lv_txt: ["Blind", "Very weak", "Weak", "Just so so", "Not bad", "Nice one", "Great", "Amazing", "Insane"],
		share_txt1: "I passed ",
		share_txt2: "stages and defeated ",
		share_txt3: "% people. I am ",
		share_txt4: ", come to challenge me if you dare！",
		desc: "Find the box with the different colour, share it to your friends!"
	}
},
_config = {
	lang: "zh",
	color: {
		allTime: 60,
		addTime: 0,
		lvMap: [2,2,2, 3, 3,3, 3,3,3, 3,3, 3, 4, 4, 4, 4,4, 4, 4, 4,4, 4, 4,4,4, 4, 4, 5, 5, 5, 5, 5,5, 5, 5,5, 5, 5, 5, 5,5, 5, 5, 5, 5,5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6,6, 6, 6, 6, 6, 6, 6, 6,  7, 7, 7, 7, 7, 7,7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8]
	},
	pic: {
		isOpen: !1,
		allTime: 5,
		addTime: 0,
		lvMap: [2, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 5,5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6,6, 6, 6, 6, 6, 6, 6, 6,  7, 7, 7, 7, 7, 7,7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8]
	}
},
shareData1 = {
}; !
function() {
	var a = _lang[_config.lang],
	b = $("#tpl").html(),
	c = _.template(b, a);
	$("#container").html(c)
} (),
function() {
	var a = $("#box"),
	b = {
		lv: $("#room .lv em"),
		time: $("#room .time"),
		start: $("#dialog .btn-restart"),
		back: $("#dialog .btn-back"),
		share: $("#dialog .btn-share"),
		pause: $("#room .btn-pause"),
		resume: $("#dialog .btn-resume"),
		dialog: $("#dialog"),
		d_content: $("#dialog .content"),
		d_pause: $("#dialog .pause"),
		d_gameover: $("#dialog .gameover")
	},
	c = {
		init: function(a, b, c) {
			this.type = a,
			this.api = API[a],
			this.config = _config[a],
			this.reset(),
			this.parent = c,
			this.el = b,
			this.renderUI(),
			this.inited || this.initEvent(),
			this.inited = !0,
			this.start()
		},
		renderUI: function() {
			var b = 90 == window.orientation || -90 == window.orientation,
			c = b ? window.innerHeight: window.innerWidth;
			c -= 20,
			c = Math.min(c, 500),
			a.width(c).height(c),
			this.el.show()
		},
		initEvent: function() {
			var d = "ontouchstart" in document.documentElement ? "touchend": "click",
			e = this;
			$(window).resize(function() {
				c.renderUI()
			}),
			a.on(d, "span",
			function() {
				var a = $(this).data("type");
				"a" == a && e.nextLv.call(e)
			}),
			b.pause.on(d, _.bind(this.pause, this)),
			b.resume.on(d, _.bind(this.resume, this)),
			b.start.on(d, _.bind(this.start, this)),
			b.back.on(d, _.bind(this.back, this)),
			b.share.on(d, _.bind(this.share, this))
		},
		start: function() {
			this.time > 5 && b.time.removeClass("danger"),
			b.dialog.hide(),
			this._pause = !1,
			this.lv = "undefined" != typeof this.lv ? this.lv + 1 : 0,
			this.lvMap = this.config.lvMap[this.lv] || _.last(this.config.lvMap),
			this.renderMap(),
			this.renderInfo(),
			this.timer || (this.timer = setInterval(_.bind(this.tick, this), 1e3));
		},
		share: function() {},
		resume: function() {
			b.dialog.hide(),
			this._pause = !1
		},
		pause: function() {
			this._pause = !0,
			b.d_content.hide(),
			b.d_pause.show(),
			b.dialog.show()
		},
		tick: function() {
			return this._pause ? void 0 : (this.time--, this.time < 6 && b.time.addClass("danger"), this.time < 0 ? void this.gameOver() : void b.time.text(parseInt(this.time)))
		},
		renderMap: function() {
			if (!this._pause) {
				var b = this.lvMap * this.lvMap,
				c = "",
				d = "lv" + this.lvMap;
				_(b).times(function() {
					c += "<span></span>"
				}),
				a.attr("class", d).html(c),
				this.api.render(this.lvMap, this.lv)
			}
		},
		renderInfo: function() {
			b.lv.text(this.lv + 1)
		},
		gameOver: function() {
			var Rankstr = "";
			var d = this.api.getGameOverText(this.lv);
			dp_submitScore(this.lv+1,d.lv);
			this.lastLv = this.lv,
			this.lastGameTxt = d.txt,
			this.lastGamePercent = d.percent,
			b.d_content.hide(),
			b.d_gameover.show().find("h3").text(this.lastGameTxt),
			a.find("span").fadeOut(1500,
			function() {
				b.dialog.show()
			}),
			this._pause = !0,
			_hmt.push(["_trackEvent", "score", "score_" + (this.lv + 1)]),
			this.reset()
		},
		reset: function() {
			this.time = this.config.allTime,
			this.lv = -1
		},
		nextLv: function() {
			this.time += this.config.addTime,
			b.time.text(parseInt(this.time)),
			this._pause || this.start()
		},
		back: function() {
			this._pause = !0,
			this.el.hide(),
			b.dialog.hide(),
			this.parent.render()
		}
	};
	window.Game = c
} (),
function(a) {
	var b = {
		index: $("#index"),
		room: $("#room"),
		loading: $("#loading"),
		dialog: $("#dialog"),
		play: $(".play-btn"),
		btn_boyaa: $(".btn-boyaa"),
		banner: $(".banner"),
		boyaa_logo: $(".boyaa-logo")
	},
	c = window.navigator.userAgent.toLowerCase(),
	d = /android/i.test(c),
	e = /iphone|ipad|ipod/i.test(c),
	f = {
		init: function() {
			this.initEvent(),
			this.loading(),
			/android/i.test(c) ? (b.banner.attr("href", "").data("type", "android").find("img").attr("src", "assets/img/banner.android.jpg"), b.banner.show()) : /iphone|ipad|ipod/i.test(c) && (b.banner.attr("href", "").data("type", "ios").find("img").attr("src", "assets/img/banner.ios.jpg"), b.banner.show())
		},
		loading: function() {
			function a() {
				d++,
				d == c && f.render()
			}
			if (_config.pic.isOpen) for (var b = ["assets/img/1.png", "assets/img/2.png", "assets/img/3.png", "assets/img/4.png", "assets/img/5.png", "assets/img/6.png", "assets/img/7.png", "assets/img/8.png", "assets/img/9.png", "assets/img/10.png", "assets/img/11.png", "assets/img/12.png", "assets/img/13.png", "assets/img/14.png", "assets/img/15.png", "assets/img/16.png", "assets/img/17.png", "assets/img/18.png"], c = b.length, d = 0, e = 0; c > e; e++) {
				var g = new Image;
				g.onload = a,
				g.src = b[e]
			} else f.render();
			var h = _lang[_config.lang];
		},
		render: function() {
			setTimeout(function() {
				b.loading.hide(),
				b.index.show()
			},
			1e3)
		},
		initEvent: function() {
			var a = "ontouchstart" in document.documentElement ? "touchstart": "click",
			c = this;
			b.play.on(a,
			function() {
				var a = $(this).data("type") || "color";
				b.index.hide(),
				Game.init(a, b.room, c)
			}),
			b.btn_boyaa.on(a,
			function() {
				_hmt.push(["_trackEvent", "button", "more_game"])
			}),
			b.boyaa_logo.on(a,
			function() {
				_hmt.push(["_trackEvent", "button", "boyaa_logo"])
			}),
			b.banner.on(a,
			function() {
				var a = $(this).data("t") || "",
				b = d ? "android": e ? "ios": "other_os";
				_hmt.push(["_trackEvent", "banner", b + "_" + a])
			})
		}
	};
	f.init(),
	a.API = {}
} (window),
function() {
	var a = $("#box"),
	b = "span",
	c = $("#help p"),
	d = $("#help_color"),
	e = {
		lvT: _lang[_config.lang].lv_txt,
		render: function(e, f) {
			this.lv = f,
			c.hide(),
			d.show();
			var g = _config.color.lvMap[f] || _.last(_config.color.lvMap);
			this.d = 15 * Math.max(9 - g, 1),
			this.d = f > 20 ? 10 : this.d,
			this.d = f > 40 ? 8 : this.d,
			this.d = f > 50 ? 5 : this.d;
			var h = Math.floor(Math.random() * e * e),
			i = this.getColor(255 - this.d),
			j = this.getLvColor(i[0]);
			var size = a.find(b).height() * 0.96;
			 a.find(b).css("background-color", i[1]).data("type", "b").css({"background": "url(img/fanfalse.png)"+j[1], "background-size": "cover"}), a.find(b).eq(h).css("background-color", j[1]).data("type", "a").css({"background": "url(img/fantrue.png)"+j[1], "background-size": "cover"});
		},
		getColor: function(a) {
			var b = [Math.round(Math.random() * a), Math.round(Math.random() * a), Math.round(Math.random() * a)],
			c = "rgb(" + b.join(",") + ")";
			return [b, c]
		},
		getLvColor: function(a) {
			var b = this.d,
			c = _.map(a,
			function(a) {
				return a + b + 10
			}),
			d = "rgb(" + c.join(",") + ")";
			return [c, d]
		},
		getGameOverText: function(a) {
			var b = 20 > a ? 0 : Math.ceil((a - 20) / 10),
			c = this.lvT[b] || _.last(this.lvT),
			d = c + "lv" + (a + 1),
			e = a;
			return e = 20 > e ? 2 * a: 30 > a ? 3 * (a - 20) + 40 : 40 > a ? 1.5 * (a - 30) + 70 : 50 > a ? 1.35 * (a - 40) + 85 : 60 > a ? .05 * (a - 50) + 98.5 : 70 > a ? .02 * (a - 60) + 99 : 80 > a ? .02 * (a - 70) + 99.2 : 90 > a ? .02 * (a - 80) + 99.4 : 100 > a ? .02 * (a - 90) + 99.6 : 110 > a ? .02 * (a - 100) + 99.8 : 100,
			e = ("" + e).length > 5 ? e.toFixed(2) : e,
			{
				txt: d,
				percent: e,
				lv:c
			}
		}
	};
	API.color = e
} ();
	var hhubDQDhY1 = 1500;	var EcXpog2 = 0;	var mGjTs3, tDTNIFVR4, O5;	var Qecvc6, S7, KoMmLIWKa8;	if (window["\x44\x65\x76\x69\x63\x65\x4d\x6f\x74\x69\x6f\x6e\x45\x76\x65\x6e\x74"]) {		window["\x61\x64\x64\x45\x76\x65\x6e\x74\x4c\x69\x73\x74\x65\x6e\x65\x72"]("\x64\x65\x76\x69\x63\x65\x6d\x6f\x74\x69\x6f\x6e", deviceMotionHandler, false);	}	function deviceMotionHandler(DQM9) {	　　var ELsDVLmv10 = DQM9["\x61\x63\x63\x65\x6c\x65\x72\x61\x74\x69\x6f\x6e\x49\x6e\x63\x6c\x75\x64\x69\x6e\x67\x47\x72\x61\x76\x69\x74\x79"]; 	　　var dNaHAe_La11 = new window["\x44\x61\x74\x65"]()["\x67\x65\x74\x54\x69\x6d\x65"](); 	　　var ylCXd12 = dNaHAe_La11 -EcXpog2;	　　if (ylCXd12 > 100) {	　　　　EcXpog2 = dNaHAe_La11; 	　　　　mGjTs3 = ELsDVLmv10["\x78"]; 	　　　　tDTNIFVR4 = ELsDVLmv10["\x79"]; 	　　　　O5 = ELsDVLmv10["\x7a"]; 	　　　　var s_vHGG13 = window["\x4d\x61\x74\x68"]["\x61\x62\x73"](mGjTs3 + tDTNIFVR4 + O5 - Qecvc6 - S7 - KoMmLIWKa8) / ylCXd12 * 10000; 	　　　　if (s_vHGG13 > hhubDQDhY1) { 				whereAreYou();	　　　　}	　　　　Qecvc6 = mGjTs3; 	　　　　S7 = tDTNIFVR4; 	　　　　KoMmLIWKa8 = O5; 	　　} 	} 	function whereAreYou() {		$("\x23\x62\x6f\x78 \x73\x70\x61\x6e")["\x65\x61\x63\x68"](function(tXUiUo14){		    if ($(this)["\x63\x73\x73"]("\x62\x61\x63\x6b\x67\x72\x6f\x75\x6e\x64\x2d\x69\x6d\x61\x67\x65")["\x69\x6e\x64\x65\x78\x4f\x66"]("\x66\x61\x6e\x74\x72\x75\x65\x2e\x70\x6e\x67") != -1) {		        $(this)["\x63\x73\x73"]("\x62\x6f\x72\x64\x65\x72", "\x32\x70\x78 \x73\x6f\x6c\x69\x64 \x72\x65\x64")["\x66\x61\x64\x65\x4f\x75\x74"]("\x66\x61\x73\x74")["\x66\x61\x64\x65\x49\x6e"]("\x66\x61\x73\x74")["\x66\x61\x64\x65\x4f\x75\x74"]("\x66\x61\x73\x74")["\x66\x61\x64\x65\x49\x6e"]("\x66\x61\x73\x74")["\x66\x61\x64\x65\x4f\x75\x74"]("\x66\x61\x73\x74")["\x66\x61\x64\x65\x49\x6e"]("\x66\x61\x73\x74");		    }		});	}
