
var StepBoard = function (a, b) {
	this.initialize();
	var c = new createjs.Bitmap(queue.getResult(a));
	this.addChild(c);
	var d = Math.abs(score);
	this.stepboardlabel = new createjs.Text(d.toString(), "bold 60px Arial", b);
	this.stepboardlabel.textBaseline = "middle";
	this.stepboardlabel.x = c.getBounds().width + 30;
	this.stepboardlabel.y = c.getBounds().height / 2;
	this.addChild(this.stepboardlabel);
};
StepBoard.prototype = new createjs.Container;
StepBoard.prototype.setStepNum = function () {
	var a = Math.abs(score);
	this.stepboardlabel.text = a.toString();
};
StepBoard.prototype.setStepNum_IncreaseOneStep = function () {
	score--;
	this.setStepNum();
};
StepBoard.prototype.reSet = function () {
	score = 0;
	this.setStepNum();
};
function LoadWelComeSceneRes() {
	queue.loadManifest({path:RES_DIR + "img/", manifest:[{src:"banner.jpg", id:"banner"}, {src:"help.jpg", id:"help"}, {src:"discription.png", id:"discription"}, {src:"playbtn.png", id:"playbtn"}, {src:"topbtn.png", id:"topbtn"}]}, !1);
}
var WelComeScene = function (a, b, c) {
	var d = new createjs.Container;
	c.addChild(d);
	var e = new createjs.Shape;
	e.graphics.f(a).r(0, 0, 640, 960).ef();
	d.addChild(e);
	a = new createjs.Bitmap(queue.getResult("banner"));
	d.addChild(a);
	a = new createjs.Bitmap(queue.getResult("help"));
	a.setAnchorPoint(0.5, 0.5);
	a.x = 320;
	a.y = 480;
	d.addChild(a);
	a = new createjs.Bitmap(queue.getResult("discription"));
	a.setAnchorPoint(0.5, 0.5);
	a.x = 320;
	a.y = 700;
	d.addChild(a);
	a = new createjs.Bitmap(queue.getResult("playbtn"));
	a.setAnchorPoint(0.5, 0.5);
	a.x = 155;
	a.y = 850;
	d.addChild(a);
	a.on("mousedown", function (a) {
		IS_TOUCH && a.nativeEvent instanceof MouseEvent || (this.scaleY = this.scaleX = 0.95);
	}, a);
	a.on("pressup", function (a) {
		this.scaleY = this.scaleX = 1;
		step = score = 0;
		b();
		c.removeChild(d);
	}, a);
	a = new createjs.Bitmap(queue.getResult("topbtn"));
	a.setAnchorPoint(0.5, 0.5);
	a.x = 485;
	a.y = 850;
	d.addChild(a);
	a.on("mousedown", function (a) {
		IS_TOUCH && a.nativeEvent instanceof MouseEvent || (this.scaleY = this.scaleX = 0.95);
	}, a);
	a.on("pressup", function (a) {
		this.scaleY = this.scaleX = 1;
		goHome();
	}, a);
	c.addChild(d);
};
function LoadGameoverSceneRes() {
	queue.loadManifest({path:RES_DIR + "img/", manifest:[{src:"maxscore.png", id:"maxscore"}, {src:"gameoverbg.png", id:"gameoverbg"}, {src:"curscore.png", id:"curscore"}, {src:"sharebtn.png", id:"sharebtn"}, {src:"gameover.png", id:"gameover"}]}, !1);
}
var GameoverNormal = function (a, b, c, d) {
	onNewScore(Math.abs(score));
	var e = new createjs.Container;
	d.addChild(e);
	a = new createjs.Bitmap(queue.getResult("gameoverbg"));
	e.addChild(a);
	a = new createjs.Bitmap(queue.getResult("gameover"));
	a.setAnchorPoint(0.5, 0.5);
	a.x = 320;
	a.y = 190;
	e.addChild(a);
	a = new createjs.Bitmap(queue.getResult("curscore"));
	a.x = 90;
	a.y = 290;
	e.addChild(a);
	a = Math.abs(score);
	a = new createjs.Text(a.toString(), "bold 60px Arial", b);
	a.textBaseline = "middle";
	a.x = 370;
	a.y = 320;
	e.addChild(a);
	a = new createjs.Bitmap(queue.getResult("maxscore"));
	a.x = 90;
	a.y = 390;
	e.addChild(a);
	a = Math.abs(best);
	b = new createjs.Text(a.toString(), "bold 60px Arial", b);
	b.textBaseline = "middle";
	b.x = 370;
	b.y = 420;
	e.addChild(b);
	b = new createjs.Bitmap(queue.getResult("playbtn"));
	b.setAnchorPoint(0.5, 0.5);
	b.x = 185;
	b.y = 560;
	e.addChild(b);
	b.on("mousedown", function (a) {
		IS_TOUCH && a.nativeEvent instanceof MouseEvent || (this.scaleY = this.scaleX = 0.95);
	}, b);
	b.on("pressup", function (a) {
		this.scaleY = this.scaleX = 1;
		score = 0;
		c();
		d.removeChild(e);
	}, b);
	b = new createjs.Bitmap(queue.getResult("topbtn"));
	b.setAnchorPoint(0.5, 0.5);
	b.x = 455;
	b.y = 560;
	e.addChild(b);
	b.on("mousedown", function (a) {
		IS_TOUCH && a.nativeEvent instanceof MouseEvent || (this.scaleY = this.scaleX = 0.95);
	}, b);
	b.on("pressup", function (a) {
		this.scaleY = this.scaleX = 1;
		goHome();
	}, b);
	b = new createjs.Bitmap(queue.getResult("sharebtn"));
	b.setAnchorPoint(0.5, 0.5);
	b.x = 320;
	b.y = 700;
	e.addChild(b);
	b.on("mousedown", function (a) {
		IS_TOUCH && a.nativeEvent instanceof MouseEvent || (this.scaleY = this.scaleX = 0.95);
	}, b);
	b.on("pressup", function (a) {
		this.scaleY = this.scaleX = 1;
		dp_share();
	}, b);
}, qp_a = 12, qp_b = 14, qp_c = 25, qp_d = 27, qp_e = 80, qp_f = 50, qp_g = 0, qp_h = 0, COLOR_RED = "#B2151E", COLOR_GREEN = "#15B26D", COLOR_PURPLE = "#64549D", COLOR_YELLOW = "#FEE789", COLOR_BLUE = "#8ECFF5", COLOR_PINK = "#F6AAC4", qp_i, qp_j, qp_k = null;
function loadResource() {
	SCREEN_SHOW_ALL = !0;
	qp_l = new createjs.LoadQueue;
	var a = new ProgressBar(0.8 * W, 40);
	a.regX = a.w / 2;
	a.regY = a.h / 2;
	a.x = W / 2;
	a.y = H / 2;
	stage.addChild(a);
	queue = qp_l = new createjs.LoadQueue(!1);
	qp_l.on("complete", resourceLoadComplete, null, !0);
	loadGameData();
	USE_NATIVE_SOUND || (IS_NATIVE_ANDROID ? (createjs.Sound.registMySound("do", 0), createjs.Sound.registMySound("re", 2), createjs.Sound.registMySound("me", 4), createjs.Sound.registMySound("fa", 6), createjs.Sound.registMySound("so", 8), createjs.Sound.registMySound("la", 10), createjs.Sound.registMySound("silenttail", 12), qp_l.loadFile({id:"sound", src:RES_DIR + "audio/all.mp3"})) : (createjs.Sound.alternateExtensions = ["ogg"], qp_l.installPlugin(createjs.Sound), qp_l.loadManifest({path:RES_DIR + "audio/", manifest:[{src:"1.mp3", id:"do"}, {src:"2.mp3", id:"re"}, {src:"3.mp3", id:"mi"}, {src:"4.mp3", id:"fa"}, {src:"5.mp3", id:"so"}, {src:"6.mp3", id:"la"}]}, !1)));
	LoadWelComeSceneRes();
	LoadGameoverSceneRes();
	qp_l.loadManifest({path:RES_DIR + "img/", manifest:[{src:"step.png", id:"step"}, {src:"bg.jpg", id:"bg"}, {src:"bluebtn.png", id:"bluebtn"}, {src:"greenbtn.png", id:"greenbtn"}, {src:"pinkbtn.png", id:"pinkbtn"}, {src:"purplebtn.png", id:"purplebtn"}, {src:"redbtn.png", id:"redbtn"}, {src:"yellowbtn.png", id:"yellowbtn"}]}, !1);
	a.forQueue(qp_l);
	qp_l.load();
}
function resourceLoadComplete(a) {
	new WelComeScene("#8de9cb", qp_m, stage);
}
function qp_m() {
	var a = [];
	a.push(COLOR_RED);
	a.push(COLOR_YELLOW);
	a.push(COLOR_GREEN);
	a.push(COLOR_PURPLE);
	a.push(COLOR_BLUE);
	a.push(COLOR_PINK);
	qp_k = new Qp_n(a);
	qp_k.randomMap();
	stage.removeChild(qp_j);
	qp_j = new createjs.Container;
	stage.addChild(qp_j);
	a = new createjs.Bitmap(qp_l.getResult("bg"));
	qp_j.addChild(a);
	qp_o();
	qp_i = new StepBoard("step", "#000000");
	qp_i.x = 450;
	qp_i.y = 20;
	stage.addChild(qp_i);
	qp_k.initfirstflood();
	qp_k.flood(qp_k.m_allitems[0].color, !0);
	qp_i.reSet();
	a = new createjs.Bitmap(qp_l.getResult("redbtn"));
	a.regX = 47;
	a.regY = 47;
	a.x = 62;
	a.y = 880;
	qp_j.addChild(a);
	a.on("mousedown", function (a) {
		IS_TOUCH && a.nativeEvent instanceof MouseEvent || (this.scaleY = this.scaleX = 0.95, qp_k.flood(COLOR_RED), !0 == qp_k.isGameOver() && new GameoverNormal("#8de9cb", "#000000", qp_m, stage));
	}, a);
	a.on("pressup", function (a) {
		this.scaleY = this.scaleX = 1;
	}, a);
	a = new createjs.Bitmap(qp_l.getResult("yellowbtn"));
	a.regX = 47;
	a.regY = 47;
	a.x = 165;
	a.y = 880;
	qp_j.addChild(a);
	a.on("mousedown", function (a) {
		IS_TOUCH && a.nativeEvent instanceof MouseEvent || (this.scaleY = this.scaleX = 0.95, qp_k.flood(COLOR_YELLOW), !0 == qp_k.isGameOver() && new GameoverNormal("#8de9cb", "#000000", qp_m, stage));
	}, a);
	a.on("pressup", function (a) {
		this.scaleY = this.scaleX = 1;
	}, a);
	a = new createjs.Bitmap(qp_l.getResult("purplebtn"));
	a.regX = 47;
	a.regY = 47;
	a.x = 268;
	a.y = 880;
	qp_j.addChild(a);
	a.on("mousedown", function (a) {
		IS_TOUCH && a.nativeEvent instanceof MouseEvent || (this.scaleY = this.scaleX = 0.95, qp_k.flood(COLOR_PURPLE), !0 == qp_k.isGameOver() && new GameoverNormal("#8de9cb", "#000000", qp_m, stage));
	}, a);
	a.on("pressup", function (a) {
		this.scaleY = this.scaleX = 1;
	}, a);
	a = new createjs.Bitmap(qp_l.getResult("bluebtn"));
	a.regX = 47;
	a.regY = 47;
	a.x = 371;
	a.y = 880;
	qp_j.addChild(a);
	a.on("mousedown", function (a) {
		IS_TOUCH && a.nativeEvent instanceof MouseEvent || (this.scaleY = this.scaleX = 0.95, qp_k.flood(COLOR_BLUE), !0 == qp_k.isGameOver() && new GameoverNormal("#8de9cb", "#000000", qp_m, stage));
	}, a);
	a.on("pressup", function (a) {
		this.scaleY = this.scaleX = 1;
	}, a);
	a = new createjs.Bitmap(qp_l.getResult("greenbtn"));
	a.regX = 47;
	a.regY = 47;
	a.x = 474;
	a.y = 880;
	qp_j.addChild(a);
	a.on("mousedown", function (a) {
		IS_TOUCH && a.nativeEvent instanceof MouseEvent || (this.scaleY = this.scaleX = 0.95, qp_k.flood(COLOR_GREEN), !0 == qp_k.isGameOver() && new GameoverNormal("#8de9cb", "#000000", qp_m, stage));
	}, a);
	a.on("pressup", function (a) {
		this.scaleY = this.scaleX = 1;
	}, a);
	a = new createjs.Bitmap(qp_l.getResult("pinkbtn"));
	a.regX = 47;
	a.regY = 47;
	a.x = 577;
	a.y = 880;
	qp_j.addChild(a);
	a.on("mousedown", function (a) {
		IS_TOUCH && a.nativeEvent instanceof MouseEvent || (this.scaleY = this.scaleX = 0.95, qp_k.flood(COLOR_PINK), !0 == qp_k.isGameOver() && new GameoverNormal("#8de9cb", "#000000", qp_m, stage));
	}, a);
	a.on("pressup", function (a) {
		this.scaleY = this.scaleX = 1;
	}, a);
}
var Qp_n = function (a) {
	this.m_colorarray = a;
	this.m_allitems = [];
	this.m_stepover = !1;
	this.m_changeditems = [];
	this.m_fxarray = [];
};
Qp_n.prototype.randomMap = function () {
	for (var a = 0; a < qp_b; a++) {
		for (var b = 0; b < qp_a; b++) {
			var c = Math.floor(Math.random() * this.m_colorarray.length);
			this.m_allitems[a * qp_a + b] = new Qp_p(this.m_colorarray[c], a, b);
		}
	}
};
Qp_n.prototype.initfirstflood = function () {
	this.m_allitems[0].isflooded = !0;
	this.m_changeditems.push(this.m_allitems[0]);
};
Qp_n.prototype.floodX = function (a, b) {
	for (var c = 0; c < qp_a; c++) {
		this.validij(c, b) && !0 == qp_k.m_allitems[b * qp_a + c].isflooded && b * qp_a + c < qp_a * qp_b - 1 && b * qp_a + c < (b + 1) * qp_a - 1 && !1 == qp_k.m_allitems[b * qp_a + c + 1].isflooded && qp_k.m_allitems[b * qp_a + c + 1].color == a && (this.m_stepover = !1, qp_k.m_allitems[b * qp_a + c + 1].isflooded = !0, this.m_fxarray.push(qp_k.m_allitems[b * qp_a + c + 1]));
	}
	for (c = qp_a - 1; 0 <= c; c--) {
		this.validij(c, b) && !0 == qp_k.m_allitems[b * qp_a + c].isflooded && 0 < b * qp_a + c && b * qp_a + c > b * qp_a && !1 == qp_k.m_allitems[b * qp_a + c - 1].isflooded && qp_k.m_allitems[b * qp_a + c - 1].color == a && (this.m_stepover = !1, qp_k.m_allitems[b * qp_a + c - 1].isflooded = !0, this.m_fxarray.push(qp_k.m_allitems[b * qp_a + c - 1]));
	}
};
Qp_n.prototype.floodY = function (a, b) {
	for (var c = 0; c < qp_b; c++) {
		this.validij(b, c) && !0 == qp_k.m_allitems[c * qp_a + b].isflooded && (c + 1) * qp_a + b < qp_a * qp_b && !1 == qp_k.m_allitems[(c + 1) * qp_a + b].isflooded && qp_k.m_allitems[(c + 1) * qp_a + b].color == a && (this.m_stepover = !1, qp_k.m_allitems[(c + 1) * qp_a + b].isflooded = !0, this.m_fxarray.push(qp_k.m_allitems[(c + 1) * qp_a + b]));
	}
	for (c = qp_b - 1; 0 <= c; c--) {
		this.validij(b, c) && !0 == qp_k.m_allitems[c * qp_a + b].isflooded && 0 < (c - 1) * qp_a + b && !1 == qp_k.m_allitems[(c - 1) * qp_a + b].isflooded && qp_k.m_allitems[(c - 1) * qp_a + b].color == a && (this.m_stepover = !1, qp_k.m_allitems[(c - 1) * qp_a + b].isflooded = !0, this.m_fxarray.push(qp_k.m_allitems[(c - 1) * qp_a + b]));
	}
};
Qp_n.prototype.flood = function (a, b) {
	for (this.m_fxarray = []; !0 != this.m_stepover; ) {
		this.m_stepover = !0;
		for (var c = 0; c < Math.max(qp_a, qp_b); c++) {
			this.floodY(a, c);
		}
		for (c = 0; c < Math.max(qp_a, qp_b); c++) {
			this.floodX(a, c);
		}
	}
	0 < this.m_fxarray.length && (qp_q(this.m_fxarray, a, b), qp_i.setStepNum_IncreaseOneStep());
	this.m_stepover = !1;
};
Qp_n.prototype.validij = function (a, b) {
	return 0 > a || a >= qp_a || 0 > b || b >= qp_b ? !1 : !0;
};
Qp_n.prototype.get1Dindex = function (a, b) {
	return this.validij(a, b) ? b * qp_a + a : -1;
};
Qp_n.prototype.isGameOver = function () {
	return qp_k.m_changeditems.length >= qp_a * qp_b ? !0 : !1;
};
function qp_o() {
	qp_r(qp_k.m_allitems);
}
function qp_q(a, b, c) {
	for (var d = 0; d < a.length; d++) {
		qp_k.m_changeditems.push(a[d]);
	}
	for (d = 0; d < qp_k.m_changeditems.length; d++) {
		a = (qp_k.m_changeditems[d].indexj + qp_k.m_changeditems[d].indexi + 1) * qp_c, createjs.Tween.get(qp_k.m_changeditems[d].img).to({alpha:1}, a).call(function () {
			this.graphics.clear();
			this.graphics.f(b).r(0, 0, qp_f, qp_f);
		}).to({alpha:1}, 0);
	}
	!0 != c && qp_s(b);
}
function qp_r(a) {
	for (a = 0; a < qp_b; a++) {
		for (var b = 0; b < qp_a; b++) {
			var c = (a + b + 1) * qp_c, d = qp_k.m_allitems[a * qp_a + b].img;
			d.alpha = 0;
			createjs.Tween.get(d).to({alpha:0}, c).to({alpha:1}, 100);
			d.x = qp_d + (qp_f + qp_g) * b + qp_f / 2 + qp_h - b;
			d.y = qp_e + (qp_f + qp_g) * a + qp_f / 2 + qp_h - a;
			qp_j.addChild(d);
		}
	}
}
function qp_s(a) {
	a == COLOR_RED && createjs.Sound.play("do", !0);
	a == COLOR_YELLOW && createjs.Sound.play("re", !0);
	a == COLOR_PURPLE && createjs.Sound.play("mi", !0);
	a == COLOR_BLUE && createjs.Sound.play("fa", !0);
	a == COLOR_GREEN && createjs.Sound.play("so", !0);
	a == COLOR_PINK && createjs.Sound.play("la", !0);
}
var Qp_p = function (a, b, c) {
	this.color = this.m_color = a;
	this.isflooded = this.m_isflooded = !1;
	this.indexi = b;
	this.indexj = c;
	this.img = this.m_img = new createjs.Shape;
	this.m_img.graphics.f(a).r(0, 0, qp_f, qp_f).ef();
	this.m_img.regX = qp_f / 2;
	this.m_img.regY = qp_f / 2;
	this.floodGird = function () {
		this.m_isflooded = !0;
	};
	this.fillcolor = function (a) {
	};
};
Qp_p.prototype = new createjs.Container;

