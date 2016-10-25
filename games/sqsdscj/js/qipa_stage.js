var W = 640,
H = 1E3,
IS_TOUCH, SCREEN_SHOW_ALL = !0; (function(a, d) {
	function b() {
		var c = a.stage.canvas,
		k = window.innerWidth,
		b = window.innerHeight;
		if (SCREEN_SHOW_ALL) k / b > W / H ? k = W * b / H: b = H * k / W,
		c.style.marginTop = 0;
		else {
			var d = W * b / H;
			k >= d ? (k = d, stage.x = 0) : stage.x = (k - d) / 2
		}
		c.width = W;
		c.height = H;
		c.style.width = k + "px";
		c.style.height = b + "px"
	}
	var l = null,
	f = null,
	g = null,
	e = null,
	h = null;
	a.stage = null;
	a.queue = null;
	a.init = function(c) {
		h = c;
		IS_ANDROID && (createjs.Sound.play = function(c, b) {
			var e = a.queue.getResult("sound");
			e.currentTime = this.soundSprite[c];
			e.play();
			b != d && !0 == b && (null != l && (clearTimeout(l), l = null), l = setTimeout(function() {
				createjs.Sound.play("silenttail")
			},
			1E3))
		},
		createjs.Sound.registMySound = function(a, c) {
			this.soundSprite || (this.soundSprite = {});
			this.soundSprite[a] = c
		})
	};
	window.onload = function() {
		a.stage = new createjs.Stage("stage");
		a.queue = new createjs.LoadQueue(!1);
		a.queue.setMaxConnections(30);
		if (IS_TOUCH = createjs.Touch.isSupported()) {
			createjs.Touch.enable(a.stage, !0);
			a.stage.mouseEnabled = !1;
			var c = new createjs.Shape;
			c.graphics.f("white").r(0, 0, W, H);
			a.stage.addChild(c)
		}
		createjs.Ticker.setFPS(60);
		setTimeout(b, 100);
		createjs.Ticker.on("tick", a.stage);
		c = new MyProgressBar(W, H);
		a.stage.addChild(c);
		a.queue.on("complete", h.startFunc, null, !0);
		h.img && a.queue.loadManifest(h.img, !1);
		h.audio && (IS_ANDROID ? a.queue.loadFile({
			id: "sound",
			src: "audio/all.mp3"
		}) : (createjs.Sound.alternateExtensions = ["ogg"], a.queue.installPlugin(createjs.Sound), a.queue.loadManifest(h.audio, !1)));
		h.noshare || a.queue.loadManifest({
			path: "img/",
			manifest: [{
				src: "share_tip.png",
				id: "share_tip"
			}]
		},
		!1);
		h.followed || a.queue.loadManifest({
			path: "img/",
			manifest: [{
				src: "follow_anim.png",
				id: "follow"
			}]
		},
		!1);
		c.forQueue(a.queue);
		a.queue.load()
	};
	window.onresize = b;
	createjs.DisplayObject.prototype.do_cache = function() {
		var a = this.getBounds();
		this.cache(a.x, a.y, a.width, a.height)
	};
	a.showShareTip = function() {
		if (!h.noshare) {
			if (null == f) {
				f = new createjs.Container;
				var c = new createjs.Shape;
				c.graphics.f("#000").r(0, 0, W, H).ef();
				c.alpha = 0.9;
				f.addChild(c);
				c = new createjs.Bitmap(a.queue.getResult("share_tip"));
				c.x = W - c.getBounds().width;
				c.y = 0;
				f.addChild(c);
				f.on("click",
				function(c) {
					IS_TOUCH && c.nativeEvent instanceof MouseEvent || a.stage.removeChild(f)
				})
			}
			a.stage.addChild(f)
		}
	};
	a.showFollowAnim = function(c) {
		a.showMoreGames(c);
		if (!h.followed) {
			if (null == g) {
				var b = new createjs.SpriteSheet({
					framerate: 10,
					images: [a.queue.getResult("follow")],
					frames: {
						width: 170,
						height: 150
					},
					animations: {
						show: [0, 4, !0]
					}
				});
				g = new createjs.Sprite(b);
				g.y = H;
				g.name = "follow";
				g.on("click",
				function(a) {
					a.stopImmediatePropagation();
					IS_TOUCH && a.nativeEvent instanceof MouseEvent || window.open(APP_FOLLOW_URL)
				})
			} else a.stage.removeChild(g);
			a.stage.addChild(g);
			b = g.getBounds();
			c ? (g.play(), createjs.Tween.get(g).to({
				regX: b.width,
				regY: 0,
				visible: !0
			}).to({
				regX: 0,
				regY: b.height
			},
			200)) : createjs.Tween.get(g).to({
				regX: b.width,
				regY: 0
			},
			200).to({
				visible: !1
			}).call(function() {
				g.stop()
			})
		}
	};
	a.showMoreGames = function(b) {
		if (null == e) {
			e = new createjs.Text("【更多奇葩游戏】", "28px Arial", "#404040");
			e.textAlign = "right";
			e.textBaseline = "bottom";
			e.x = W - 15;
			e.y = H - 15;
			var d = new createjs.Shape,
			f = e.getBounds();
			d.graphics.beginFill("#000").rect(0, 0, -f.width, -f.height);
			e.hitArea = d;
			e.on("click",
			function(a) {
				a.stopImmediatePropagation();
				IS_TOUCH && a.nativeEvent instanceof MouseEvent || window.open(APP_LIST_URL)
			});
			e.name = "moreGames"
		} else a.stage.removeChild(e);
		a.stage.addChild(e);
		e.visible = b
	}
})(window.qipaStage = window.qipaStage || {});
function MyProgressBar(a, d, b) {
	this.initialize();
	this.w = a;
	this.h = d;
	this.lastCount = 0;
	var l = d / 2;
	this.progress = new createjs.Shape;
	var f = this.progress.graphics;
	f.setStrokeStyle(1);
	f.beginStroke("black");
	f.rect(76, l - 4, 488, 48);
	f.endStroke();
	this.addChild(this.progress);
	this.progressText = new createjs.Text("0%", "bold 24px Arial", "black");
	this.progressText.x = a / 2;
	this.progressText.y = l + 20;
	this.progressText.textAlign = "center";
	this.progressText.textBaseline = "middle";
	this.addChild(this.progressText);
	void 0 == b && (b = "奇葩游戏");
	b = new createjs.Text(b, "bold 66px Arial", "black");
	b.x = a / 2;
	b.y = 150;
	b.textAlign = "center";
	this.addChild(b);
	b = new createjs.Text("微信公众号: 奇葩游戏", "38px Arial", "black");
	b.x = a / 2;
	b.y = 260;
	b.textAlign = "center";
	this.addChild(b);
	b = new createjs.Text("(c)2014 奇葩游戏\nwww.qipagame.com", "32px Arial", "black");
	b.x = a / 2;
	b.y = d - 100;
	b.textAlign = "center";
	this.addChild(b)
}
MyProgressBar.prototype = new createjs.Container;
MyProgressBar.prototype.completeCallback = function(a) {
	this.parent.removeChild(this)
};
MyProgressBar.prototype.progressCallback = function(a) {
	var d = this.progress.graphics;
	d.setStrokeStyle(0);
	d.beginStroke("#008000");
	d.beginFill("#008000");
	d.rect(80, this.h / 2, 480 * a.progress, 40);
	d.endFill();
	d.endStroke();
	this.progressText.text = "" + parseInt(100 * a.progress) + "%"
};
MyProgressBar.prototype.forQueue = function(a) {
	this.errorList = [];
	a.on("complete", this.completeCallback, this, !0);
	a.on("progress", this.progressCallback, this);
	a.on("error",
	function(a) {
		//alert("\u90e8\u5206\u8d44\u6e90\u52a0\u8f7d\u5931\u8d25!")
	},
	null, !0);
	a.on("error",
	function(a) {
		this.errorList.push(a.item.src)
	},
	this)
};