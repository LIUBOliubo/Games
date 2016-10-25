H = 960;
function qp_a(a) {}
var qp_b = 30,
qp_c, qp_d = 5,
qp_e = 3,
qp_f = qp_e,
qp_g = 420,
qp_h = 0,
qp_i = [],
qp_j = 20,
qp_k = 0,
qp_l,
qp_m = 0,
qp_n = 0,
qp_o = 0;
function qp_p() {
	qipaStage.stage.arrow.visible = !0;
	qp_q = qipaApp.score = 0;
	qp_n = qp_b;
	qp_m = -1;
	qipaStage.stage.num.txt.text = qp_n + '"';
	qp_k = 0;
	qp_o = 1;
	qipaApp.onGameStarted()
}
function qp_r() {
	qipaStage.stage.splash.visible = !0
}
function qp_s() {
	qipaStage.stage.arrow.visible = !1;
	qp_m = 0
}
function qp_t() {
	qp_o = 3;
	qp_l = setTimeout(function() {
		window.clearTimeout(qp_l)
	},
	900);
	qp_u();
	qipaApp.onNewScore(qipaApp.score);
	qipaApp.onGameOver();
	qipaStage.stage.gameover.visible = !0;
	qipaStage.stage.gameover.refresh()
}
function qp_v(a) {
	IS_ANDROID && (createjs.Sound.registMySound("count", 0), createjs.Sound.registMySound("silenttail", 0.25));
	qp_w();
	qp_u()
}
function Qp_x() {
	this.initialize();
	this.bg = new createjs.Shape;
	this.bg.graphics.beginFill("#559966").drawRect(0, 0, W, H);
	this.addChild(this.bg);
	this.label = new createjs.Bitmap(qipaStage.queue.getResult("splashtitle"));
	this.label.x = (W - this.label.getBounds().width) / 2;
	this.label.y = 100;
	this.addChild(this.label);
	this.start = new createjs.Bitmap(qipaStage.queue.getResult("mb0"));
	this.start.y = H - 300;
	this.start.x = (W - this.start.getBounds().width) / 2;
	this.addChild(this.start);
	this.arrow = new createjs.Bitmap(qipaStage.queue.getResult("starttip"));
	this.arrow.y = H - 400;
	this.arrow.x = (W - this.arrow.getBounds().width) / 2;
	this.addChild(this.arrow);
	var a, b;
	this.start.on("mousedown",
	function(c) {
		0 == qp_o && (a = c.localY, b = H - 300)
	});
	this.start.on("pressmove",
	function(c) {
		0 == qp_o && SplashPressmoveEvent(c.localY - a, b)
	});
	this.start.on("pressup",
	function(b) {
		0 == qp_o && 30 > a - b.localY && (createjs.Sound.play("count", !0), createjs.Tween.get(qipaStage.stage.splash.start).to({
			y: -H
		},
		400).call(function(a) {
			qipaStage.stage.splash.arrow.visible = !1;
			qp_p();
			qipaStage.stage.splash.visible = !1
		}))
	})
}
Qp_x.prototype = new createjs.Container;
function SplashPressmoveEvent(a, b) {
	qipaStage.stage.splash.start.y + a < b && (qipaStage.stage.splash.start.y += a)
}
function qp_w() {
	var a = new createjs.Shape;
	a.graphics.beginFill("#559966").drawRect(0, 0, W, H);
	qipaStage.stage.addChild(a);
	var b = new createjs.Shape;
	b.graphics.beginFill("white").rect(0, 200, W, H);
	a.hitArea = b;
	var c = 0,
	d = 0;
	a.on("mousedown",
	function(a) {
		IS_TOUCH && a.nativeEvent instanceof MouseEvent || 2 != qp_o && 1 != qp_o || (c = a.localY, d = qipaStage.stage.player.m[qp_f].y)
	});
	a.on("pressmove",
	function(a) {
		IS_TOUCH && a.nativeEvent instanceof MouseEvent || (1 == qp_o && (qp_s(), qp_o = 2), 2 == qp_o && (qipaStage.stage.player.m[qp_f].visible = !0, qipaStage.stage.player.m[qp_f].y += (a.localY - c) / 1.5))
	});
	var f = 0;
	a.on("pressup",
	function(a) {
		IS_TOUCH && a.nativeEvent instanceof MouseEvent || 2 != qp_o || (50 < c - a.localY ? (a = (new Date).getTime(), 0 < qp_i.length && qp_i[qp_i.length - 1] + 50 > a ? qp_a("WARNING: Too fast! maybe engine error.") : (f = qp_y(a), f <= qp_j ? (qp_k++, qipaApp.score += 100, qipaStage.stage.player.playAnimation(qipaStage.stage.player.m[qp_f]), createjs.Sound.play("count", !0)) : (qp_i.length--, qp_a("WARN: " + f)))) : (qp_z(d), qipaStage.stage.player.m[qp_f].visible = !1))
	});
	qp_c = [];
	for (a = 0; a <= qp_e; a++) for (qp_c[a] = [], b = 0; b < qp_d; b++) {
		var e = new createjs.Bitmap(qipaStage.queue.getResult("d0"));
		e.regX = e.getBounds().width / 2;
		e.regY = e.getBounds().height / 2;
		e.x = genRandom(W);
		e.y = -H / 2 + genRandom(H);
		e.visible = !1;
		qp_c[a].push(e);
		qipaStage.stage.addChild(qp_c[a][b])
	}
	qipaStage.stage.player = new Qp_A;
	qipaStage.stage.addChild(qipaStage.stage.player);
	qipaStage.stage.num = new Qp_B;
	qipaStage.stage.num.y = 30;
	qipaStage.stage.addChild(qipaStage.stage.num);
	qipaStage.stage.arrow = new createjs.Bitmap(qipaStage.queue.getResult("starttip"));
	qipaStage.stage.arrow.x = (W - qipaStage.stage.arrow.getBounds().width) / 2;
	qipaStage.stage.arrow.y = 290;
	qipaStage.stage.arrow.visible = !1;
	qipaStage.stage.addChild(qipaStage.stage.arrow);
	qipaStage.stage.gameover = new Qp_C;
	qipaStage.stage.gameover.x = 0;
	qipaStage.stage.gameover.y = 260;
	qipaStage.stage.gameover.visible = !1;
	qipaStage.stage.addChild(qipaStage.stage.gameover);
	qipaStage.stage.splash = new Qp_x;
	qipaStage.stage.addChild(qipaStage.stage.splash);
	setInterval(qp_D, 1E3);
	createjs.Ticker.addEventListener("tick",
	function(a) {
		0 <= qp_m && (qp_m += a.delta, a = 30 - parseInt(qp_m / 1E3), a != qp_n && (qp_n = a, qipaStage.stage.num.txt.text = qp_n + '"'), 0 >= qp_n && (qp_m = -1, qp_t()));
		qipaStage.stage.num.sum.text = "\uffe5" + qipaApp.score
	})
}
function Qp_A() {
	this.initialize();
	this.mb = new createjs.Bitmap(qipaStage.queue.getResult("mb0"));
	this.mb.regX = this.mb.getBounds().width / 2;
	this.mb.regY = this.mb.getBounds().height / 2;
	this.mb.y = qp_g;
	this.x = W / 2;
	this.y = H / 2 - 150;
	this.addChild(this.mb);
	this.m = [];
	for (var a = 0; 3 >= a; a++) this.m[a] = new createjs.Bitmap(qipaStage.queue.getResult("m0")),
	this.m[a].regX = this.m[a].getBounds().width / 2,
	this.m[a].regY = this.m[a].getBounds().height / 2,
	this.m[a].y = qp_g,
	this.m[a].visible = !1,
	this.addChild(this.m[a]);
	for (a = 0; a <= qp_e; a++) this.m[a].image = qipaStage.queue.getResult("m0");
	for (a = 0; a < qp_c.length; a++) for (var b = 0; b < qp_c[a].length; b++) qp_c[a][b].image = qipaStage.queue.getResult("d0")
}
Qp_A.prototype = new createjs.Container;
Qp_A.prototype.playAnimation = function(a) {
	a.visible = !0;
	createjs.Tween.get(a).to({
		scaleX: 0.5,
		scaleY: 0.5,
		y: -H
	},
	300).to({
		visible: !1,
		y: qp_g,
		scaleX: 1,
		scaleY: 1
	},
	0);
	0 < qp_f ? qp_f--:qp_f = qp_e
};
function genRandom(a) {
	return parseInt(Math.random() * a)
}
function qp_E(a) {
	return 10
}
var qp_F = 0;
function qp_D() {
	for (var a = 0; a < qp_d; a++) qp_c[qp_F][a].visible = !0,
	createjs.Tween.get(qp_c[qp_F][a]).to({
		y: H + qp_c[qp_F][a].getBounds().height / 2 + 100,
		rotation: 720 + genRandom(400),
		x: genRandom(W)
	},
	1E3 + genRandom(800)).to({
		visible: !1
	},
	10).to({
		x: genRandom(W),
		y: -H / 2 + genRandom(H / 2),
		rotation: 0
	},
	10);
	qp_F < qp_e ? qp_F++:qp_F = 0
}
function qp_z(a) {
	var b = Math.abs(qipaStage.stage.player.m[qp_f] - a);
	createjs.Tween.get(qipaStage.stage.player.m[qp_f]).to({
		y: a
	},
	20 * b)
}
function Qp_C() {
	this.initialize();
	var a = new createjs.Shape,
	b = qipaStage.queue.getResult("dlgbg");
	a.setBounds(0, 0, W, b.height);
	a.graphics.bf(b).r(0, 0, W, b.height);
	this.addChild(a);
	b = new createjs.Bitmap(qipaStage.queue.getResult("start"));
	b.x = 40;
	b.y = a.y + a.getBounds().height - 160;
	b.on("click",
	function(a) {
		qp_p();
		qipaStage.stage.gameover.visible = !1
	});
	var c = new createjs.Bitmap(qipaStage.queue.getResult("rank"));
	c.x = W / 2;
	c.y = b.y;
	c.regX = c.getBounds().width / 2;
	c.on("click",
	function(a) {
		clickMore();
	});
	var d = new createjs.Bitmap(qipaStage.queue.getResult("share"));
	d.x = W - 40;
	d.y = b.y;
	d.regX = c.getBounds().width;
	d.on("click",
	function(a) {
		IS_TOUCH && a.nativeEvent instanceof MouseEvent || dp_share()
	});
	this.addChild(b);
	this.addChild(c);
	this.addChild(d);
	this.scoreText = new createjs.Text("", "bold 50px Arial", "#fff");
	this.scoreText.textAlign = "center";
	this.scoreText.x = W / 2;
	this.scoreText.y = a.y + 50;
	this.addChild(this.scoreText);
	this.shareText = new createjs.Text("", "38px Arial", "#eee");
	this.shareText.textAlign = "center";
	this.shareText.x = W / 2;
	this.shareText.y = this.scoreText.y + 95;
	this.addChild(this.shareText)
}
Qp_C.prototype = new createjs.Container;
Qp_C.prototype.refresh = function() {
	this.scoreText.text = "\uffe5" + qipaApp.score;
	this.shareText.text = 0 < qipaApp.score ? qipaShare.desc.replace("\u6bd4", "\n\u6bd4").replace("\u6211\u662f", "\n\u6211\u662f") : ""
};
function Qp_B() {
	this.initialize();
	this.tmbg = new createjs.Bitmap(qipaStage.queue.getResult("tmbg"));
	this.tmbg.x = (W - this.tmbg.getBounds().width) / 2;
	this.tmbg.y = 30;
	this.addChild(this.tmbg);
	this.sum = new createjs.Text("\uffe5" + qipaApp.score, "bold 46px Arial", "yellow");
	this.sum.textAlign = "center";
	this.sum.textBaseline = "middle";
	this.sum.x = W / 2;
	this.sum.y = this.tmbg.y + this.tmbg.getBounds().height / 2;
	this.addChild(this.sum);
	this.tmbg1 = new createjs.Bitmap(qipaStage.queue.getResult("tmbg"));
	this.tmbg1.scaleX = 0.7;
	this.tmbg1.x = (W - 0.7 * this.tmbg.getBounds().width) / 2;
	this.tmbg1.y = this.tmbg.y + this.tmbg.getBounds().height + 15;
	this.addChild(this.tmbg1);
	this.tmicon = new createjs.Bitmap(qipaStage.queue.getResult("tmicon"));
	this.tmicon.x = this.tmbg1.x + 14;
	this.tmicon.y = this.tmbg1.y + 14;
	this.addChild(this.tmicon);
	this.txt = new createjs.Text(qp_n + '"', "bold 44px Arial", "white");
	this.txt.textAlign = "center";
	this.txt.textBaseline = "middle";
	this.txt.x = W / 2 + this.tmicon.getBounds().width / 2;
	this.txt.y = this.tmbg1.y + this.tmbg1.getBounds().height / 2;
	this.addChild(this.txt)
}
Qp_B.prototype = new createjs.Container;
function qp_y(a) {
	var b = 0;
	if (0 != qp_i.length) {
		var c;
		for (c = 0; c < qp_i.length && !(qp_i[c] > a - 1E3); c++);
		for (var b = qp_i.length - c,
		d = c; d < qp_i.length; d++) qp_i[d - c] = qp_i[d];
		qp_i.length -= c
	}
	qp_i.push(a);
	return parseInt(b)
}
function qp_u() {
	qipaShare.title = "\u6570\u94b1\u6570\u5230\u624b\u62bd\u7b4b\uff01\u4f60\u662f\u6570\u94b1\u9ad8\u624b\u5417\uff1f";
	if (0 == qipaApp.score) qipaShare.desc = qipaShare.title;
	else {
		var a = parseInt(Math.sqrt(1E4 * qipaApp.score / 17E3));
		99 < a && (a = "99.9");
		qipaShare.title = "\u6211\u6570\u4e86\uffe5" + qipaApp.score + "\uff0c\u6bd4" + a + "%\u7684\u4eba\u6709\u94b1\uff01\u6211\u662f" + (5E3 > qipaApp.score ? "\u5c4c\u4e1d": 1E4 > qipaApp.score ? "\u8d2b\u519c": 15E3 > qipaApp.score ? "\u5bcc\u519c": 2E4 > qipaApp.score ? "\u571f\u8c6a": 25E3 > qipaApp.score ? "\u7164\u8001\u677f": "\u8d44\u672c\u5bb6") + "\u3002"
	}
	dp_submitScore(qipaApp.score);
}
var _cfg = {
	startFunc: qp_v,
	img: {
		path: "img/",
		manifest: [{
			src: "m0.png",
			id: "m0"
		},
		{
			src: "mb0.png",
			id: "mb0"
		},
		{
			src: "d0.png",
			id: "d0"
		},
		{
			src: "starttip.png",
			id: "starttip"
		},
		{
			src: "tmbg.png",
			id: "tmbg"
		},
		{
			src: "splashtitle.png",
			id: "splashtitle"
		},
		{
			src: "tmicon.png",
			id: "tmicon"
		},
		{
			src: "start.png",
			id: "start"
		},
		{
			src: "rank.png",
			id: "rank"
		},
		{
			src: "share.png",
			id: "share"
		},
		{
			src: "dlgbg.png",
			id: "dlgbg"
		}]
	},
	audio: {
		path: "audio/",
		manifest: [{
			src: "count.mp3",
			id: "count"
		}]
	}
};
qipaStage.init(_cfg);
