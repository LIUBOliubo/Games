
var stage, W = 640, H = 960, IS_TOUCH, SCREEN_SHOW_ALL = !1, g_androidsoundtimer = null, g_followAnim = null;
onload = function () {
	stage = new createjs.Stage("stage");
	if (IS_TOUCH = createjs.Touch.isSupported()) {
		createjs.Touch.enable(stage, !0);
		var a = new createjs.Shape;
		a.graphics.f("white").r(0, 0, W, H);
		stage.addChild(a);
	}
	createjs.Ticker.setFPS(60);
	setTimeout(setCanvas, 100);
	createjs.Ticker.on("tick", stage);
	loadResource();
	initBest();
};
onresize = setCanvas;
function setCanvas() {
	var a = stage.canvas, b = window.innerWidth, c = window.innerHeight - 3;
	if (SCREEN_SHOW_ALL) {
		var d = c;
		b / c > W / H ? b = W * c / H : c = H * b / W;
		a.style.marginTop = (d - c) / 2 + "px";
	} else {
		d = W * c / H, b >= d ? (b = d, stage.x = 0) : stage.x = (b - d) / 2;
	}
	a.width = W;
	a.height = H;
	a.style.width = b + "px";
	a.style.height = c + "px";
}
createjs.DisplayObject.prototype.do_cache = function () {
	var a = this.getBounds();
	this.cache(a.x, a.y, a.width, a.height);
};
function showFPS() {
	var a = new createjs.Text("", "bold 24px Arial", "red");
	a.x = W;
	a.textAlign = "right";
	a.textBaseline = "top";
	stage.addChild(a);
	createjs.Ticker.on("tick", function () {
		a.text = "FPS:" + createjs.Ticker.getMeasuredFPS(10).toFixed(2);
	});
}
function ProgressBar(a, b) {
	this.initialize();
	this.w = a;
	this.h = b;
	this.progress = new createjs.Shape;
	this.progress.graphics.s("black").r(0, 0, a, b).es();
	this.progress.graphics.lf(["red", "yellow", "blue"], [0, 0.5, 1], 0, 0, a, 0);
	this.progressText = new createjs.Text("\u8d44\u6e90\u52a0\u8f7d\u4e2d..", "bold 24px Arial", "black");
	this.progressText.x = a / 2;
	this.progressText.y = b / 2;
	this.progressText.textAlign = "center";
	this.progressText.textBaseline = "middle";
	this.addChild(this.progress);
	this.addChild(this.progressText);
}
ProgressBar.prototype = new createjs.Container;
ProgressBar.prototype.completeCallback = function (a) {
	this.parent.removeChild(this);
};
ProgressBar.prototype.progressCallback = function (a) {
	this.progress.graphics.r(0, 0, this.w * a.progress, this.h);
	this.progressText.text = "\u5df2\u52a0\u8f7d: " + parseInt(100 * a.progress) + "%";
};
ProgressBar.prototype.forQueue = function (a) {
	this.errorList = [];
	a.on("complete", this.completeCallback, this, !0);
	a.on("progress", this.progressCallback, this);
	a.on("error", function (a) {
		//alert("网速不给力，刷新一下吧!")
	}, null, !0);
	a.on("error", function (a) {
		this.errorList.push(a.item.src);
	}, this);
};
function RepeatedImgLayer(a, b, c, d) {
	this.initialize();
	d = a.width + d;
	b += d;
	this.graphics.bf(a).r(0, 0, b, a.height);
	this.setBounds(0, 0, b, a.height);
	this.animation = createjs.Tween.get(this, {loop:!0}).to({x:-d}, d / c * 1000);
	this.do_cache();
}
RepeatedImgLayer.prototype = new createjs.Shape;
RepeatedImgLayer.prototype.setPaused = function (a) {
	this.animation.setPaused(a);
};
function ImageButton(a, b, c) {
	this.initialize();
	a = new createjs.Bitmap(queue.getResult(a));
	b && (b = new createjs.Bitmap(queue.getResult(b)), this.addChild(b), a.x = (b.image.width - a.image.width) / 2, a.y = (b.image.height - a.image.height) / 2);
	this.addChild(a);
	c && (c = this.getBounds(), this.regX = c.width / 2, this.regY = c.height / 2);
	this.on("mousedown", function () {
		this._addFilter(new createjs.ColorMatrixFilter((new createjs.ColorMatrix).adjustBrightness(-80)), "mouse");
	}, this);
	this.on("pressup", function () {
		this._removeFilter("mouse");
	}, this);
}
ImageButton.prototype = new createjs.Container;
ImageButton.prototype._addFilter = function (a, b) {
	a.tag = b;
	if (this.filters) {
		for (var c in this.filters) {
			if (this.filters[c].tag == b) {
				return;
			}
		}
		this.filters.push(a);
	} else {
		this.filters = [a];
	}
	this.do_cache();
};
ImageButton.prototype._removeFilter = function (a) {
	if (this.filters) {
		var b = [], c;
		for (c in this.filters) {
			var d = this.filters[c];
			a != d.tag && b.push(d);
		}
		this.filters = b;
		this.do_cache();
	}
};
ImageButton.prototype.setEnabled = function (a) {
	(this.mouseEnabled = a) ? this._removeFilter("disable") : (a = new createjs.ColorMatrixFilter((new createjs.ColorMatrix).adjustBrightness(-80).adjustSaturation(-100)), this._addFilter(a, "disable"));
};
function loadFollowRes() {
	USE_NATIVE_SHARE || queue.loadManifest({path:BASE_RES_DIR + "img/", manifest:[{src:"follow_anim.png", id:"follow"}]}, !1);
}
function addFollowAnim(a) {
	if (!USE_NATIVE_SHARE) {
		var b = new createjs.SpriteSheet({framerate:10, images:[queue.getResult("follow")], frames:{width:170, height:150}, animations:{show:[0, 4, !0]}});
		g_followAnim = new createjs.Sprite(b);
		g_followAnim.y = H;
		g_followAnim.name = "follow";
		g_followAnim.on("click", function () {
			window.open(FOLLOW_URL, "follow");
		});
		g_followAnim.visible = !1;
		void 0 == a ? stage.addChild(g_followAnim) : a.addChild(g_followAnim);
	}
}
function setFollowParent(a) {
	USE_NATIVE_SHARE || (g_followAnim.parent.removeChild(g_followAnim), a.addChild(g_followAnim));
}
function setFollowAnim(a) {
	if (!USE_NATIVE_SHARE && IS_REFFER) {
		var b = g_followAnim.getBounds();
		a ? (g_followAnim.play(), createjs.Tween.get(g_followAnim).to({regX:b.width, regY:0, visible:!0}).to({regX:0, regY:b.height}, 500)) : createjs.Tween.get(g_followAnim).to({regX:b.width, regY:0}, 500).to({visible:!1}).call(function () {
			g_followAnim.stop();
		});
	}
}
USE_NATIVE_SOUND ? createjs.Sound.play = function (a) {
	window.open("qipa://sound/" + GID + "/" + a);
} : IS_NATIVE_ANDROID && (createjs.Sound.play = function (a, b) {
	var c = queue.getResult("sound");
	c.currentTime = this.soundSprite[a];
	c.play();
	void 0 != b && !0 == b && (null != g_androidsoundtimer && (clearTimeout(g_androidsoundtimer), g_androidsoundtimer = null), g_androidsoundtimer = setTimeout(function () {
		createjs.Sound.play("silenttail");
	}, 1000));
}, createjs.Sound.registMySound = function (a, b) {
	this.soundSprite || (this.soundSprite = {});
	this.soundSprite[a] = b;
});
function loadGameData(a) {
}
function zero_fill_hex(a, b) {
	for (var c = a.toString(16); c.length < b; ) {
		c = "0" + c;
	}
	return c;
}
function rgb2hex(a) {
	if ("#" == a.charAt(0)) {
		return a;
	}
	a = a.split(/\D+/);
	return "#" + zero_fill_hex(65536 * Number(a[1]) + 256 * Number(a[2]) + Number(a[3]), 6);
}
function hex2rgb(a) {
	var b = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
	a = a.toLowerCase();
	var c = new RGBAcolor;
	if (a && b.test(a)) {
		if (4 === a.length) {
			for (var b = "#", d = 1; 4 > d; d += 1) {
				b += a.slice(d, d + 1).concat(a.slice(d, d + 1));
			}
			a = b;
		}
		b = [];
		b.push(parseInt("0x" + a.slice(1, 3)));
		c.r = parseInt("0x" + a.slice(1, 3));
		b.push(parseInt("0x" + a.slice(3, 5)));
		c.g = parseInt("0x" + a.slice(3, 5));
		b.push(parseInt("0x" + a.slice(5, 7)));
		c.b = parseInt("0x" + a.slice(5, 7));
		c.rgbastring = "RGB(" + b.join(",") + ")";
		return c;
	}
	return a;
}
function RGBAcolor() {
	this.a = this.A = this.b = this.B = this.g = this.G = this.r = this.R = 0;
	this.rgbastring = null;
}
createjs.DisplayObject.prototype.setAnchorPoint = function (a, b) {
	var c = this.getBounds();
	this.regX = c.width * a;
	this.regY = c.height * b;
};
createjs.Container.prototype.addCenterChild = function (a) {
	a.setAnchorPoint(0.5, 0.5);
	var b = this.getBounds();
	a.x = b.x + 0.5 * b.width;
	a.y = b.y + 0.5 * b.height;
	this.addChild(a);
};

