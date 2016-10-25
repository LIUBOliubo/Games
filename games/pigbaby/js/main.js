
var g_queue, qp_a, qp_b = [], qp_c = 1000, qp_d = 500, qp_e = !0, GAME_READY = 1, GAME_PLAY = 2, GAME_FAIL = -2, GAME_OVER = -1, GAME_START = -10, GAMESTATUS = GAME_START;
function loadResource() {
	SCREEN_SHOW_ALL = !0;
	var a = new ProgressBar(0.8 * W, 40);
	a.regX = a.w / 2;
	a.regY = a.h / 2;
	a.x = W / 2;
	a.y = H / 2;
	stage.addChild(a);
	queue = new createjs.LoadQueue(!1);
	queue.setMaxConnections(30);
	loadGameData();
	queue.on("complete", qp_f, null, !0);
	queue.loadManifest({path:RES_DIR + "img/", manifest:[{src:"cloud1.png", id:"cloud1"}, {src:"cloud2.png", id:"cloud2"}, {src:"cloud3.png", id:"cloud3"}, {src:"cloud4.png", id:"cloud4"}, {src:"welcome.png", id:"welcome"}, {src:"logo.png", id:"logo"}, {src:"tag.png", id:"btnframe"}, {src:"start.png", id:"startbtnlabel"}, {src:"top.png", id:"topbtnlabel"}, {src:"share.png", id:"sharebutton"}, {src:"game_over.png", id:"gameoverbanner"}, {src:"score.png", id:"scorelabel"}, {src:"line.png", id:"line"}, {src:"green.png", id:"ballgreen"}, {src:"blue.png", id:"ballblue"}, {src:"red.png", id:"ballred"}]}, !1);
	a.forQueue(queue);
	queue.load();
}
function qp_f(a) {
	a = new Qp_g;
	stage.addChild(a);
	createjs.Ticker.on("tick", a.update, a);
	qp_a = new Qp_h;
	stage.addChild(qp_a);
}
function qp_i() {
	qp_a.startGame();
}
function qp_j() {
	//showTop();
	goHome();
}
function qp_k() {
	dp_share();
}
function Qp_g() {
	this.initialize();
	var a = new createjs.Shape;
	a.graphics.lf(["#88c3d9", "#9ddcf2"], [0, 1], 0, 0, 0, H).r(0, 0, W, H);
	this.addChild(a);
	for (a = this.nextCloud = 0; 3 > a; a++) {
		this.update();
	}
}
Qp_g.prototype = new createjs.Container;
Qp_g.prototype.update = function (a) {
	a && (this.nextCloud -= a.delta / 1000);
	if (0 >= this.nextCloud) {
		var c = parseInt(4 * Math.random()) + 1, b = new createjs.Bitmap(queue.getResult("cloud" + c));
		b.setAnchorPoint(0.5, 0.5);
		b.y = Math.random() * H * 0.6;
		a ? (b.x = -b.image.width / 2, this.nextCloud += 5 * Math.random() + 5) : b.x = Math.random() * W;
		a = W + b.image.width / 2;
		createjs.Tween.get(b).to({x:a}, (a - b.x) * c * 10).call(function () {
			this.parent.removeChild(this);
		});
		this.addChild(b);
	}
};
function Qp_h() {
	this.initialize();
	this.menuLayer = new Qp_l;
	this.gameplayinglayer = new Qp_m;
	this.gameplayinglayer.visible = !1;
	this.addChild(this.menuLayer, this.gameplayinglayer);
}
Qp_h.prototype = new createjs.Container;
Qp_h.prototype.gameover = function () {
	GAMESTATUS != GAME_OVER && (GAMESTATUS = GAME_OVER, createjs.Ticker.removeEventListener("tick", window.update), this.gameplayinglayer.visible = !1, onNewScore(score), this.menuLayer.gameover.buttonactions(), this.menuLayer.gameover.refresh(), this.menuLayer.visible = !0);
};
Qp_h.prototype.startGame = function () {
	GAMESTATUS = GAME_START;
	record_flag = !1;
	qp_b = [];
	score = 0;
	this.menuLayer.visible = !1;
	if (!1 == qp_e) {
		this.removeChild(a), this.gameplayinglayer.doReset(), this.gameplayinglayer.visible = !0, createjs.Ticker.addEventListener("tick", window.update);
	} else {
		qp_e = !1;
		var a = new createjs.Text("黑线下点猪头托飞它", "bold 60px Arial", "#ff9d36");
		a.stroke = "white";
		a.textBaseline = "middle";
		a.regX = a.getBounds().width / 2;
		a.regY = a.getBounds().height / 2;
		a.scaleX = 2;
		a.scaleY = 2;
		createjs.Tween.get(a).to({scaleX:1, scaleY:1}, 200);
		createjs.Tween.get(a).to({alpha:0.6}, 200).to({alpha:1}, 200).to({alpha:0.6}, 200).to({alpha:1}, 200);
		a.x = 320;
		a.y = 720;
		this.addChild(a);
		setTimeout(function () {
			qp_a.removeChild(a);
			qp_a.gameplayinglayer.doReset();
			qp_a.gameplayinglayer.visible = !0;
			createjs.Ticker.addEventListener("tick", window.update);
		}, 1500);
	}
};
function Qp_n(a, c, b, d, e) {
	this.initialize();
	c = new createjs.Bitmap(queue.getResult(c));
	c.setAnchorPoint(0.5, 0.5);
	a && (a = new createjs.Bitmap(queue.getResult(a)), a.setAnchorPoint(0.5, 0.5), this.addChild(a));
	this.addChild(c);
	this.do_cache();
	this.x = d;
	this.y = e;
	this.on("click", b);
}
Qp_n.prototype = new createjs.Container;
function Qp_o(a, c, b, d) {
	this.initialize(queue.getResult(a));
	this.setAnchorPoint(0.5, 0.5);
	this.x = c;
	this.y = b;
	if (d) {
		this.on("click", d);
	}
}
Qp_o.prototype = new createjs.Bitmap;
function Qp_p() {
	this.initialize();
	this.addChild(new Qp_o("gameoverbanner", 320, 350));
	this.sharebutton = new createjs.Bitmap(queue.getResult("sharebutton"));
	this.sharebutton.x = 320;
	this.sharebutton.y = 1200;
	this.sharebutton.regX = this.sharebutton.getBounds().width / 2;
	this.sharebutton.regY = this.sharebutton.getBounds().height / 2;
	this.sharebutton.on("mousedown", qp_k, this.sharebutton);
	this.addChild(this.sharebutton);
	this.scoreText = new createjs.Text(score, "bold 60px Arial", "#ff9d36");
	this.scoreText.stroke = "white";
	this.scoreText.textBaseline = "middle";
	this.scoreText.x = 420;
	this.scoreText.y = 330;
	this.addChild(this.scoreText);
	this.bestscoreText = new createjs.Text(best, "bold 60px Arial", "#ff9d36");
	this.bestscoreText.stroke = "white";
	this.bestscoreText.textBaseline = "middle";
	this.bestscoreText.x = 420;
	this.bestscoreText.y = 530;
	this.addChild(this.bestscoreText);
}
Qp_p.prototype = new createjs.Container;
Qp_p.prototype.buttonactions = function () {
	var a = qp_a.menuLayer.start;
	a.y = 1200;
	createjs.Tween.get(a).to({y:720}, 200);
	a = qp_a.menuLayer.top;
	a.y = 1200;
	createjs.Tween.get(a).to({y:1200}, 150).to({y:720}, 200);
	createjs.Tween.get(this.sharebutton).to({y:1200}, 350).to({y:880}, 200);
};
Qp_p.prototype.refresh = function () {
	this.bestscoreText.text = "" + best;
	this.scoreText.text = "" + score;
};
function Qp_l() {
	this.initialize();
	this.gameover = new Qp_p(score, best);
	this.gameover.visible = !1;
	this.addChild(this.gameover);
	this.logopicture = new createjs.Bitmap(queue.getResult("logo"));
	this.logopicture.setAnchorPoint(0.5, 0.5);
	this.logopicture.x = 320;
	this.logopicture.y = 340;
	this.addChild(this.logopicture);
	this.start = new Qp_n("btnframe", "startbtnlabel", qp_i, 180, 720);
	this.start.on("click", function () {
		this.gameover.visible = !0;
		this.removeChild(this.logopicture);
		this.logopicture = null;
	}, this, !0);
	this.addChild(this.start);
	this.top = new Qp_n("btnframe", "topbtnlabel", qp_j, 460, 720);
	this.addChild(this.top);
}
Qp_l.prototype = new createjs.Container;
function Qp_m() {
	this.initialize();
	this.ballLayer = new createjs.Container;
	this.addChild(this.ballLayer);
	var a = new createjs.Bitmap(queue.getResult("scorelabel"));
	a.setAnchorPoint(0, 0.5);
	a.x = 30;
	a.y = 50;
	this.addChild(a);
	this.scoreText = new createjs.Text("0", "bold 48px Arial", "#ff9d36");
	this.scoreText.stroke = "white";
	this.scoreText.textBaseline = "middle";
	this.scoreText.x = 140;
	this.scoreText.y = 50;
	this.addChild(this.scoreText);
	a = new createjs.Bitmap(queue.getResult("line"));
	a.setAnchorPoint(0.5, 0.5);
	a.x = 320;
	a.y = qp_d;
	this.addChild(a);
}
Qp_m.prototype = new createjs.Container;
Qp_m.prototype.randomBalls = function () {
	var a = new Qp_q(queue, ["ballgreen", "ballred", "ballblue"][parseInt(3 * Math.random())], 506 * Math.random() + 67);
	qp_b.push(a);
	this.ballLayer.addChild(a);
};
Qp_m.prototype.doReset = function () {
	this.ballLayer.removeAllChildren();
	this.scoreText.text = "" + score;
};
function update(a) {
	5 > qp_b.length && score / 5 + 1 > qp_b.length && qp_a.gameplayinglayer.randomBalls();
	a = a.delta / 1300;
	for (var c in qp_b) {
		if (qp_b[c].refreshLoop(a)) {
			return qp_a.gameover();
		}
	}
}
createjs.DisplayObject.prototype.setAnchorPoint = function (a, c) {
	var b = this.getBounds();
	this.regX = b.width * a;
	this.regY = b.height * c;
};
createjs.Container.prototype.addCenterChild = function (a) {
	a.setAnchorPoint(0.5, 0.5);
	var c = this.getBounds();
	a.x = c.x + 0.5 * c.width;
	a.y = c.y + 0.5 * c.height;
	this.addChild(a);
};
function Qp_q(a, c, b) {
	this.initialize();
	this.ball = new createjs.Bitmap(a.getResult(c));
	this.ball.setAnchorPoint(0.5, 0.5);
	this.addChild(this.ball);
	this.doReset(b);
	this.on("mousedown", function (a) {
		IS_TOUCH && a.nativeEvent instanceof MouseEvent || this.touch(a.localX, a.localY);
	}, this);
}
Qp_q.prototype = new createjs.Container;
Qp_q.prototype.doReset = function (a) {
	this.y = -67;
	this.x = a;
	this.vx = this.vy = 0;
	this.ball.rotation = 0;
};
Qp_q.prototype.touch = function (a, c) {
	if (this.y > qp_d) {
		var b = this.x, d = Math.abs(Math.sqrt(2 * qp_c * this.y));
		if (320 <= b) {
			var e = (-d - Math.sqrt(4000 * qp_c)) / qp_c;
			this.vx = b / e;
		} else {
			e = (-d - Math.sqrt(4000 * qp_c)) / qp_c, this.vx = (b - 640) / e;
		}
		this.vy = -d;
		0 > this.vy && (score++, qp_a.gameplayinglayer.scoreText.text = score);
	}
};
Qp_q.prototype.refreshLoop = function (a) {
	this.vy += qp_c * a;
	this.y += this.vy * a;
	this.x += this.vx * a;
	this.mouseEnabled = 0 < this.vy;
	this.ball.rotation = (this.ball.rotation + 100 * a) % 360;
	0 >= this.x - 67 ? this.vx = Math.abs(this.vx) : this.x + 67 >= W && (this.vx = -Math.abs(this.vx));
	return this.y >= H;
};

