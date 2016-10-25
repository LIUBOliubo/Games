clearSaveState();
var gameState=0;
function Block(a, b, d, c, e) {
	this.settled = void 0 === e ? 0 : 1;
	this.height = settings.blockHeight;
	this.fallingLane = a;
	this.checked = 0;
	this.angle = 90 - (30 + 60 * a);
	this.angularVelocity = 0;
	this.targetAngle = this.angle;
	this.color = b;
	this.tint = this.removed = this.deleted = 0;
	this.initializing = this.opacity = 1;
	this.ict = MainHex.ct;
	this.iter = d;
	this.initLen = settings.creationDt;
	this.attachedLane = 0;
	this.distFromHex = c || settings.startDist * settings.scale;
	this.incrementOpacity = function() {
		if (this.deleted) {
			if (.925 <= this.opacity) {
				for (var b =
					this.attachedLane - MainHex.position, b = MainHex.sides - b; 0 > b;) b += MainHex.sides;
				b %= MainHex.sides;
				MainHex.shakes.push({
					lane: b,
					magnitude: 3 * (window.devicePixelRatio ? window.devicePixelRatio : 1) * settings.scale
				})
			}
			this.opacity -= .075;
			0 >= this.opacity && (this.opacity = 0, this.deleted = 2, 1 != gameState && 0 != gameState || localStorage.setItem("saveState", exportSaveState()))
		}
	};
	this.getIndex = function() {
		for (var b = MainHex.blocks[this.attachedLane], a = 0; a < b.length; a++)
			if (b[a] == this) return a
	};
	this.draw = function(b, a) {
		this.height = settings.blockHeight;
		1E-9 < Math.abs(settings.scale - settings.prevScale) && (this.distFromHex *= settings.scale / settings.prevScale);
		this.incrementOpacity();
		this.angle > this.targetAngle ? this.angularVelocity -= angularVelocityConst : this.angle < this.targetAngle && (this.angularVelocity += angularVelocityConst);
		Math.abs(this.angle - this.targetAngle + this.angularVelocity) <= Math.abs(this.angularVelocity) ? (this.angle = this.targetAngle, this.angularVelocity = 0) : this.angle += this.angularVelocity;
		this.width = 2 * this.distFromHex / Math.sqrt(3);
		this.widthWide =
			2 * (this.distFromHex + this.height) / Math.sqrt(3);
		var d, c, e, v;
		this.initializing ? (v = (MainHex.ct - this.ict) / this.initLen, d = rotatePoint(-this.width / 2 * v, this.height / 2, this.angle), c = rotatePoint(this.width / 2 * v, this.height / 2, this.angle), e = rotatePoint(this.widthWide / 2 * v, -this.height / 2, this.angle), v = rotatePoint(-this.widthWide / 2 * v, -this.height / 2, this.angle), MainHex.ct - this.ict >= this.initLen && (this.initializing = 0)) : (d = rotatePoint(-this.width / 2, this.height / 2, this.angle), c = rotatePoint(this.width / 2, this.height / 2, this.angle),
			e = rotatePoint(this.widthWide / 2, -this.height / 2, this.angle), v = rotatePoint(-this.widthWide / 2, -this.height / 2, this.angle));
		this.deleted ? ctx.fillStyle = "#FFF" : 0 === gameState ? "r" == this.color.charAt(0) ? ctx.fillStyle = rgbColorsToTintedColors[this.color] : ctx.fillStyle = hexColorsToTintedColors[this.color] : ctx.fillStyle = this.color;
		ctx.globalAlpha = this.opacity;

		var w = trueCanvas.width / 2 + Math.sin(Math.PI / 180 * this.angle) * (this.distFromHex + this.height / 2) + gdx,
			n = trueCanvas.height / 2 - Math.cos(Math.PI / 180 * this.angle) * (this.distFromHex +
				this.height / 2) + gdy;
		ctx.beginPath();
		ctx.moveTo(w + d.x, n + d.y);
		ctx.lineTo(w + c.x, n + c.y);
		ctx.lineTo(w + e.x, n + e.y);
		ctx.lineTo(w + v.x, n + v.y);
		ctx.closePath();
		ctx.fill();
		this.tint && (1 > this.opacity && (1 != gameState && 0 != gameState || localStorage.setItem("saveState", exportSaveState()), this.iter = 2.25, this.tint = 0), ctx.fillStyle = "#FFF", ctx.globalAlpha = this.tint, ctx.beginPath(), ctx.moveTo(w + d.x, n + d.y), ctx.lineTo(w + c.x, n + c.y), ctx.lineTo(w + e.x, n + e.y), ctx.lineTo(w + v.x, n + v.y), ctx.lineTo(w + d.x, n + d.y), ctx.closePath(), ctx.fill(),
			this.tint -= .02, 0 > this.tint && (this.tint = 0));
		ctx.globalAlpha = 1
	}
}

function findCenterOfBlocks(a) {
	for (var b = 0, d = 0, c = 0; c < a.length; c++) {
		for (var b = b + a[c].distFromHex, e = a[c].angle; 0 > e;) e += 360;
		d += e % 360
	}
	b /= a.length;
	d /= a.length;
	return {
		x: trueCanvas.width / 2 + Math.cos(Math.PI / 180 * d) * b,
		y: trueCanvas.height / 2 + Math.sin(Math.PI / 180 * d) * b
	}
};

function search(a, b) {
	for (var d = 0; d < a.length; d++)
		if (a[d][0] == b[0] && a[d][1] == b[1]) return !0;
	return !1
}

function floodFill(a, b, d, c) {
	if (void 0 !== a.blocks[b] && void 0 !== a.blocks[b][d])
		for (var e = a.blocks[b][d].color, f = -1; 2 > f; f++)
			for (var h = -1; 2 > h; h++)
				if (Math.abs(f) != Math.abs(h)) {
					var q = (b + f + a.sides) % a.sides,
						u = d + h;
					void 0 !== a.blocks[q] && void 0 !== a.blocks[q][u] && a.blocks[q][u].color == e && !1 === search(c, [q, u]) && 0 === a.blocks[q][u].deleted && (c.push([q, u]), floodFill(a, q, u, c))
				}
}

function consolidateBlocks(a, b, d) {
	var c = [],
		e = [],
		f = [];
	e.push([b, d]);
	floodFill(a, b, d, e);
	if (!(3 > e.length)) {
		for (b = 0; b < e.length; b++) d = e[b], void 0 !== d && 2 == d.length && (-1 == c.indexOf(d[0]) && c.push(d[0]), a.blocks[d[0]][d[1]].deleted = 1, f.push(a.blocks[d[0]][d[1]]));
		c = MainHex.ct;
		c - a.lastCombo < settings.comboTime ? (settings.comboTime = 1 / settings.creationSpeedModifier * (waveone.nextGen / 16.666667) * 3, a.comboMultiplier += 1, a.lastCombo = c, c = findCenterOfBlocks(f), a.texts.push(new Text(c.x, c.y, "x " + a.comboMultiplier.toString(),
			"bold Q", "#fff", fadeUpAndOut))) : (settings.comboTime = 240, a.lastCombo = c, a.comboMultiplier = 1);
		e = e.length * e.length * a.comboMultiplier;
		a.texts.push(new Text(a.x, a.y, "+ " + e.toString(), "bold Q ", f[0].color, fadeUpAndOut));
		a.lastColorScored = f[0].color;
		score += e
	}
};

function drawTimer() {
	if (1 == gameState) {
		var a = [],
			b = [];
		if (MainHex.ct - MainHex.lastCombo < settings.comboTime)
			for (var d = 0; 6 > d; d++) {
				var c = MainHex.ct - MainHex.lastCombo;
				if (c < 1 / 6 * (5 - d) * settings.comboTime) a.push(calcSide(d, d + 1, 1, 1)), b.push(calcSide(12 - d, 11 - d, 1, 1));
				else {
					a.push(calcSide(d, d + 1, 1 - 6 * c / settings.comboTime % 1, 1));
					b.push(calcSide(12 - d, 11 - d, 1 - 6 * c / settings.comboTime % 1, 1));
					break
				}
			}
		0 !== b.length && drawSide(b);
		0 !== a.length && drawSide(a)
	}
}

function calcSide(a, b, d, c) {
	a = (a + c) % 12;
	b = (b + c) % 12;
	ctx.globalAlpha = 1;
	ctx.beginPath();
	ctx.lineCap = "round";
	c = settings.rows * settings.blockHeight * (2 / Math.sqrt(3)) + settings.hexWidth;
	var e = c / 2,
		f = c * (Math.sqrt(3) / 2);
	c = [
		[3 * e / 2, f / 2],
		[c, 0],
		[3 * e / 2, -f / 2],
		[e, -f],
		[0, -f],
		[-e, -f],
		[-(3 * e) / 2, -f / 2],
		[-c, 0],
		[-(3 * e) / 2, f / 2],
		[-e, f],
		[0, f],
		[e, f]
	].reverse();
	e = trueCanvas.width / 2 + c[a][0];
	a = trueCanvas.height / 2 + c[a][1];
	return [[e, a], [(trueCanvas.width / 2 + c[b][0] - e) * d + e, (trueCanvas.height / 2 + c[b][1] - a) * d + a]]
}

function drawSide(a) {

	ctx.strokeStyle = 0 === gameState ? hexColorsToTintedColors[MainHex.lastColorScored] : MainHex.lastColorScored;
	ctx.lineWidth = 4 * settings.scale;
	ctx.moveTo(a[0][0][0], a[0][0][1]);
	ctx.lineTo(a[0][1][0], a[0][1][1]);
	for (var b = 1; b < a.length; b++) ctx.lineTo(a[b][1][0], a[b][1][1]), ctx.moveTo(a[b][1][0], a[b][1][1]);
	ctx.closePath();
	ctx.fill();
	ctx.stroke()
};

function Hex(a) {
	this.playThrough = 0;
	this.fillColor = [44, 62, 80];
	this.tempColor = [44, 62, 80];
	this.dy = this.position = this.angularVelocity = 0;
	this.sides = 6;
	this.blocks = [];
	this.targetAngle = this.angle = 180 / this.sides;
	this.shakes = [];
	this.sideLength = a;
	this.strokeColor = "blue";
	this.x = trueCanvas.width / 2;
	this.y = trueCanvas.height / 2;
	this.ct = 0;
	this.lastCombo = this.ct - settings.comboTime;
	this.lastColorScored = "#000";
	this.comboTime = 1;
	this.texts = [];
	this.lastRotate = Date.now();
	for (a = 0; a < this.sides; a++) this.blocks.push([]);
	this.shake =
		function(b) {
			var a = 30 + 60 * b.lane,
				a = Math.PI / 180 * a,
				c = Math.cos(a) * b.magnitude,
				a = Math.sin(a) * b.magnitude;
			gdx -= c;
			gdy += a;
			b.magnitude /= 2;
			if (1 > b.magnitude)
				for (c = 0; c < this.shakes.length; c++) this.shakes[c] == b && this.shakes.splice(c, 1)
	};
	this.addBlock = function(b) {
		if (1 == gameState || 0 === gameState) {
			b.settled = 1;
			b.tint = .6;
			var a = this.sides - b.fallingLane;
			this.shakes.push({
				lane: b.fallingLane,
				magnitude: 4.5 * (window.devicePixelRatio ? window.devicePixelRatio : 1) * settings.scale
			});
			a += this.position;
			a = (a + this.sides) % this.sides;
			b.distFromHex =
				MainHex.sideLength / 2 * Math.sqrt(3) + b.height * this.blocks[a].length;
			this.blocks[a].push(b);
			b.attachedLane = a;
			b.checked = 1
		}
	};
	this.doesBlockCollide = function(b, a, c) {
		b.settled || (void 0 !== a ? 0 >= a ? 0 >= b.distFromHex - b.iter * settings.scale - this.sideLength / 2 * Math.sqrt(3) ? (b.distFromHex = this.sideLength / 2 * Math.sqrt(3), b.settled = 1, b.checked = 1) : (b.settled = 0, b.iter = 1.5 + waveone.difficulty / 15 * 3) : c[a - 1].settled && 0 >= b.distFromHex - b.iter * settings.scale - c[a - 1].distFromHex - c[a - 1].height ? (b.distFromHex = c[a - 1].distFromHex + c[a -
			1].height, b.settled = 1, b.checked = 1) : (b.settled = 0, b.iter = 1.5 + waveone.difficulty / 15 * 3) : (a = this.sides - b.fallingLane, a += this.position, a = (a + this.sides) % this.sides, c = this.blocks[a], 0 < c.length ? 0 >= b.distFromHex + b.iter * settings.scale - c[c.length - 1].distFromHex - c[c.length - 1].height && (b.distFromHex = c[c.length - 1].distFromHex + c[c.length - 1].height, this.addBlock(b)) : 0 >= b.distFromHex + b.iter * settings.scale - this.sideLength / 2 * Math.sqrt(3) && (b.distFromHex = this.sideLength / 2 * Math.sqrt(3), this.addBlock(b))))
	};
	this.rotate =
		function(a) {
			if (!(75 > Date.now() - this.lastRotate) || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
				if (1 === gameState || 0 === gameState) {
					this.position += a;
					history[this.ct] || (history[this.ct] = {});
					for (history[this.ct].rotate = history[this.ct].rotate ? history[this.ct].rotate + a : a; 0 > this.position;) this.position += 6;
					this.position %= this.sides;
					this.blocks.forEach(function(d) {
						d.forEach(function(c) {
							c.targetAngle -= 60 * a
						})
					});
					this.targetAngle -= 60 * a;
					this.lastRotate = Date.now()
				}
	};
	this.draw =
		function() {
			this.x = trueCanvas.width / 2; - 2 != gameState && (this.y = trueCanvas.height / 2);
			this.sideLength = settings.hexWidth;
			for (var a = gdy = gdx = 0; a < this.shakes.length; a++) this.shake(this.shakes[a]);
			this.angle > this.targetAngle ? this.angularVelocity -= angularVelocityConst : this.angle < this.targetAngle && (this.angularVelocity += angularVelocityConst);
			Math.abs(this.angle - this.targetAngle + this.angularVelocity) <= Math.abs(this.angularVelocity) ? (this.angle = this.targetAngle, this.angularVelocity = 0) : this.angle += this.angularVelocity;
			drawPolygon(this.x + gdx, this.y + gdy + this.dy, this.sides, this.sideLength, this.angle, arrayToColor(this.fillColor), 0, "rgba(0,0,0,0)")
	}
}

function arrayToColor(a) {
	return "rgb(" + a[0] + "," + a[1] + "," + a[2] + ")"
};
$(document).ready(function() {
	initialize();
	$("#bottombar").hide()
});

function showbottombar() {
	"onLine" in navigator && !navigator.onLine ? setTimeout(showbottombar, 1E3) : (window.iframeHasLoaded = !0, 1 != gameState && $("#bottombar").fadeIn(150, "linear"))
}

function hidebottombar() {
	$("#bottombar").fadeOut(150, "linear");
	$("#overlayMask").hide();
}

function initialize(a) {
	window.iframHasLoaded = !1;
	window.colors = ["#e74c3c", "#f1c40f", "#3498db", "#2ecc71"];
	window.hexColorsToTintedColors = {
		"#e74c3c": "rgb(241,163,155)",
		"#f1c40f": "rgb(246,223,133)",
		"#3498db": "rgb(151,201,235)",
		"#2ecc71": "rgb(150,227,183)"
	};
	window.rgbToHex = {
		"rgb(231,76,60)": "#e74c3c",
		"rgb(241,196,15)": "#f1c40f",
		"rgb(52,152,219)": "#3498db",
		"rgb(46,204,113)": "#2ecc71"
	};
	window.rgbColorsToTintedColors = {
		"rgb(231,76,60)": "rgb(241,163,155)",
		"rgb(241,196,15)": "rgb(246,223,133)",
		"rgb(52,152,219)": "rgb(151,201,235)",
		"rgb(46,204,113)": "rgb(150,227,183)"
	};
	window.hexagonBackgroundColor = "rgb(236, 240, 241)";
	window.hexagonBackgroundColorClear = "rgba(236, 240, 241, 0.5)";
	window.centerBlue = "rgb(44,62,80)";
	window.angularVelocityConst = 4;
	window.scoreOpacity = 0;
	window.textOpacity = 0;
	window.prevGameState = void 0;
	window.op = 0;
	window.saveState = localStorage.getItem("saveState") || "{}";
	"{}" !== saveState && (op = 1);
	window.textShown = !1;
	window.requestAnimFrame = function() {
		return window.requestAnimationFrame || window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame || function(a) {
				window.setTimeout(a, 1E3 / framerate)
		}
	}();
	$("#clickToExit").bind("click", toggleDevTools);
	window.settings;
	/Mobile|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ? settings = {
		platform: "mobile",
		startDist: 227,
		creationDt: 40,
		baseScale: 1.4,
		scale: 1,
		prevScale: 1,
		baseHexWidth: 87,
		hexWidth: 87,
		baseBlockHeight: 20,
		blockHeight: 20,
		rows: 7,
		speedModifier: 1.73,
		creationSpeedModifier: 0.73,
		comboTime: 240
	} : (settings = {
		platform: "nonmobile",
		baseScale: 1,
		startDist: 340,
		creationDt: 9,
		scale: 1,
		prevScale: 1,
		hexWidth: 65,
		baseHexWidth: 87,
		baseBlockHeight: 20,
		blockHeight: 15,
		rows: 8,
		speedModifier: 1.65,
		creationSpeedModifier:0.65,
		comboTime: 240
	});
	window.canvas = document.getElementById("canvas");
	window.ctx = canvas.getContext("2d");
	window.trueCanvas = {
		width: canvas.width,
		height: canvas.height
	};
	scaleCanvas();
	window.framerate = 60;
	window.history = {};
	window.score = 0;
	window.isGameOver = 3;
	window.scoreAdditionCoeff = 1;
	window.prevScore = 0;
	window.numHighScores = 3;
	highscores = [];
	if (localStorage.getItem("highscores")) try {
		highscores = JSON.parse(localStorage.getItem("highscores"))
	} catch (b) {
		highscores = []
	}
	window.blocks = [];
	window.MainHex;
	window.gdx = 0;
	window.gdy = 0;
	window.devMode = 0;
	window.lastGen = void 0;
	window.prevTimeScored =
		void 0;
	window.nextGen = void 0;
	window.spawnLane = 0;
	window.importing = 0;
	window.importedHistory = void 0;
	window.startTime = void 0;
	window.gameState;
	setStartScreen();
	if (1 != a) {
		window.canRestart = 1;
		$("#startBtn").off();
		if ("mobile" == settings.platform) $("#startBtn").on("touchstart", startBtnHandler);
		else $("#startBtn").on("mousedown", startBtnHandler);
		document.addEventListener("touchmove", function(a) {
			a.preventDefault()
		}, !1);
		$(window).resize(scaleCanvas).resize();
		$(window).unload(function() {
			1 ==
				gameState || -1 == gameState || 0 === gameState ? localStorage.setItem("saveState", exportSaveState()) : localStorage.setItem("saveState", "{}")
		});
		addKeyListeners();
		document.addEventListener("pause", handlePause, !1);
		document.addEventListener("backbutton", handlePause, !1);
		document.addEventListener("menubutton", handlePause, !1);
		setTimeout(function() {
			if ("mobile" == settings.platform) {
				try {
					document.body.removeEventListener("touchstart", handleTapBefore, !1)
				} catch (a) {}
				try {
					document.body.removeEventListener("touchstart", handleTap, !1)
				} catch (b) {}
				document.body.addEventListener("touchstart", handleTapBefore, !1)
			} else {
				try {
					document.body.removeEventListener("mousedown",
						handleClickBefore, !1)
				} catch (e) {}
				try {
					document.body.removeEventListener("mousedown", handleClick, !1)
				} catch (f) {}
				document.body.addEventListener("mousedown", handleClickBefore, !1)
			}
		}, 1)
	}
}

function startBtnHandler() {
	setTimeout(function() {
		if ("mobile" == settings.platform) {
			try {
				document.body.removeEventListener("touchstart", handleTapBefore, !1)
			} catch (a) {}
			try {
				document.body.removeEventListener("touchstart", handleTap, !1)
			} catch (b) {}
			document.body.addEventListener("touchstart", handleTap, !1)
		} else {
			try {
				document.body.removeEventListener("mousedown", handleClickBefore, !1)
			} catch (d) {}
			try {
				document.body.removeEventListener("mousedown", handleClick, !1)
			} catch (c) {}
			document.body.addEventListener("mousedown",
				handleClick, !1)
		}
	}, 5);
	if (!canRestart) return !1;
	$("#helpScreen").is(":visible") && $("#helpScreen").fadeOut(150, "linear");
	1 == importing ? init(1) : resumeGame();
}

function handlePause() {
	1 != gameState && 2 != gameState || pause()
}

function handleTap(a) {
	handleClickTap(a.changedTouches[0].clientX, a.changedTouches[0].clientY,a)
}

function handleClick(a) {
	handleClickTap(a.clientX, a.clientY,a)
}

function handleTapBefore(a) {
	var b = a.changedTouches[0].clientY;
	120 > a.changedTouches[0].clientX && 50 > b && $(".helpText").is(":visible") && showHelp()
}

function handleClickBefore(a) {
	var b = a.clientY;
	120 > a.clientX && 50 > b && $(".helpText").is(":visible") && showHelp()
};

function addKeyListeners() {
	keypress.register_combo({
		keys: "left",
		on_keydown: function() {
			MainHex && 0 !== gameState && MainHex.rotate(1)
		}
	});
	keypress.register_combo({
		keys: "right",
		on_keydown: function() {
			MainHex && 0 !== gameState && MainHex.rotate(-1)
		}
	});
	keypress.register_combo({
		keys: "a",
		on_keydown: function() {
			MainHex && 0 !== gameState && MainHex.rotate(1)
		}
	});
	keypress.register_combo({
		keys: "d",
		on_keydown: function() {
			MainHex && 0 !== gameState && MainHex.rotate(-1)
		}
	});
	keypress.register_combo({
		keys: "p",
		on_keydown: function() {
			pause()
		}
	});
	keypress.register_combo({
		keys: "q",
		on_keydown: function() {
			devMode && toggleDevTools()
		}
	});
	keypress.register_combo({
		keys: "enter",
		on_keydown: function() {
			2 != gameState && 1 != gameState && 1 != importing || init(1);
			0 === gameState && resumeGame()
		}
	});
	$("#pauseBtn").on("touchstart mousedown", function() {
		if (1 == gameState || -1 == gameState) return $("#helpScreen").is(":visible") && $("#helpScreen").fadeOut(150, "linear"), pause(), !1
	});
	$("#colorBlindBtn").on("touchstart mousedown", function() {
		window.colors = ["#8e44ad", "#f1c40f", "#3498db",
			"#d35400"
		];
		window.hexColorsToTintedColors = {
			"#8e44ad": "rgb(229,152,102)",
			"#f1c40f": "rgb(246,223,133)",
			"#3498db": "rgb(151,201,235)",
			"#d35400": "rgb(210,180,222)"
		};
		window.rgbToHex = {
			"rgb(142,68,173)": "#8e44ad",
			"rgb(241,196,15)": "#f1c40f",
			"rgb(52,152,219)": "#3498db",
			"rgb(211,84,0)": "#d35400"
		};
		window.rgbColorsToTintedColors = {
			"rgb(142,68,173)": "rgb(229,152,102)",
			"rgb(241,196,15)": "rgb(246,223,133)",
			"rgb(52,152,219)": "rgb(151,201,235)",
			"rgb(46,204,113)": "rgb(210,180,222)"
		}
	});
	if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){ 
		$("body").on("touchstart",".irestartBtn",function(){
				init(1);
				canRestart = !1;
		})
		$("body").on("touchstart",".moreGame",function(){
				clickMore();
				return false;
			})
		}
	else {
	$("body").on("click",".irestartBtn",function(){
				init(1);
				canRestart = !1;
		})
	$("body").on("click",".moreGame",function(){
		clickMore();
		return false;
	})
	}
}

function handleClickTap(a, b,evt) {
	if($(evt.target).hasClass("bt-play-share-tip")){
		return false;
	}
	if(gameState==2){
		return false;
	}
	120 > a && 50 > b && $(".helpText").is(":visible") ? showHelp() : 2 == gameState && canRestart ? init(1) : MainHex && 0 !== gameState && -1 != gameState && (a < window.innerWidth / 2 && (1 != gameState && -2 != gameState && -1 != gameState && (0 === importing ? resumeGame() : init(1)), MainHex.rotate(1)), a > window.innerWidth / 2 && (1 != gameState && -2 != gameState && -1 != gameState && (0 === importing ? resumeGame() : init(1)), MainHex.rotate(-1)))
};

function scaleCanvas() {
	canvas.width = $(window).width();
	canvas.height = $(window).height();
	settings.scale = canvas.height > canvas.width ? canvas.width / 800 * settings.baseScale : canvas.height / 800 * settings.baseScale;
	trueCanvas = {
		width: canvas.width,
		height: canvas.height
	};
	if (window.devicePixelRatio) {
		var a = $("#canvas").attr("width"),
			b = $("#canvas").attr("height");
		$("#canvas").attr("width", a * window.devicePixelRatio);
		$("#canvas").attr("height", b * window.devicePixelRatio);
		$("#canvas").css("width", a);
		$("#canvas").css("height",
			b);
		trueCanvas = {
			width: a,
			height: b
		};
		ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
	}
	$("html").css("font-size",~~$(window).width()*12/640+"px");
}

function toggleDevTools() {
	$("#devtools").toggle()
}

function resumeGame() {
	gameState = 1;
	hideUIElements();
	$("#pauseBtn").show();
	$("#restartBtn").hide();
	importing = 0;
	startTime = Date.now();
	setTimeout(function() {
		1 != gameState && 2 != gameState || $("#helpScreen").is(":visible") || $(".helpText").fadeOut(150, "linear")
	}, 7E3);
	checkVisualElements()
}

function checkVisualElements() {
	$(".helpText").is(":visible") || $(".helpText").fadeIn(150, "linear");
	$("#pauseBtn").is(":visible") || $("#pauseBtn").fadeIn(150, "linear");
	$("#restartBtn").is(":visible") || $("#restartBtn").fadeOut(150, "linear")
}

function hideUIElements() {
	$("#pauseBtn").hide();
	$("#restartBtn").hide();
	$("#startBtn").hide();
	$("#attributions").hide();
	$("#bottombar").hide();
	$(".doudouLink").hide();
}

function init(a) {
	a ? (hidebottombar(), $("#helpScreen").is(":visible") && $("#helpScreen").fadeOut(150, "linear"), setTimeout(function() {
		$(".helpText").fadeOut(150, "linear")
	}, 7E3), clearSaveState()) : void(0);
	$("#pauseBtnInner").html('<i class="fa fa-pause fa-2x"></i>');
	hideUIElements();
	a = localStorage.getItem("saveState") || "{}";
	a = JSONfn.parse(a);
	document.getElementById("canvas").className = "";
	history = {};
	importedHistory = void 0;
	importing = 0;
	isGameOver = 2;
	score = a.score ||0;
	scoreOpacity = op = spawnLane = prevScore = 0;
	gameState = 1;
	$("#restartBtn").hide();
	$("#pauseBtn").show();
	void 0 !== a.hex && (gameState = 1);
	settings.blockHeight = settings.baseBlockHeight * settings.scale;
	settings.hexWidth = settings.baseHexWidth * settings.scale;
	MainHex = a.hex || new Hex(settings.hexWidth);
	a.hex && (MainHex.playThrough += 1);
	MainHex.sideLength = settings.hexWidth;
	var b, d;
	if (a.blocks)
		for (a.blocks.map(function(a) {
			rgbToHex[a.color] && (a.color = rgbToHex[a.color])
		}), b = 0; b < a.blocks.length; b++) d = a.blocks[b], blocks.push(d);
	else blocks = [];
	gdx = a.gdx || 0;
	gdy = a.gdy || 0;
	comboTime = a.comboTime || 0;
	for (b = 0; b < MainHex.blocks.length; b++)
		for (d = 0; d < MainHex.blocks[b].length; d++) MainHex.blocks[b][d].height = settings.blockHeight, MainHex.blocks[b][d].settled = 0;
	MainHex.blocks.map(function(a) {
		a.map(function(a) {
			rgbToHex[a.color] && (a.color = rgbToHex[a.color])
		})
	});
	MainHex.y = -100;
	startTime = Date.now();
	waveone = a.wavegen || new waveGen(MainHex);
	MainHex.texts = [];
	MainHex.delay = 15;
	hideText();
	document.getElementById('moregame2').style.display='none';
}

function addNewBlock(a, b, d, c, e) {
	d *= settings.speedModifier;
	history[MainHex.ct] || (history[MainHex.ct] = {});
	history[MainHex.ct].block = {
		blocklane: a,
		color: b,
		iter: d
	};
	c && (history[MainHex.ct].distFromHex = c);
	e && (blockHist[MainHex.ct].settled = e);
	blocks.push(new Block(a, b, d, c, e))
}

function exportHistory() {
	$("#devtoolsText").html(JSON.stringify(history));
	toggleDevTools()
}

function setStartScreen() {
	$("#startBtn").show();
	init();
	importing = isStateSaved() ? 0 : 1;
	$("#pauseBtn").hide();
	$("#restartBtn").hide();
	$("#startBtn").show();
	$(".doudouLink").show();
	$("#attributions").show();
	showbottombar();
	gameState = 0;
	requestAnimFrame(animLoop)
}
setInterval(function() {
	1 == gameState && (MainHex.delay ? MainHex.delay-- : update())
}, 17);

function animLoop() {
	switch (gameState) {
		case 1:
			requestAnimFrame(animLoop);
			render();
			if (checkGameOver() && !importing) {
				var a = localStorage.getItem("saveState") || "{}",
					a = JSONfn.parse(a);
				gameState = 2;
				setTimeout(function() {
					enableRestart()
				}, 150);
				$("#helpScreen").is(":visible") && $("#helpScreen").fadeOut(150, "linear");
				$("#pauseBtn").is(":visible") && $("#pauseBtn").fadeOut(150, "linear");
				$("#restartBtn").is(":visible") && $("#restartBtn").fadeOut(150, "linear");
				$(".helpText").is(":visible") || $(".helpText").fadeIn(150,
					"linear");
				showbottombar();
				canRestart = 0;
				clearSaveState()
			}
			break;
		case 0:
			requestAnimFrame(animLoop);
			importing && update();
			render();
			break;
		case -1:
			requestAnimFrame(animLoop);
			render();
			break;
		case 2:
			requestAnimFrame(animLoop);
			update();
			render();
			break;
		case 3:
			requestAnimFrame(animLoop);
			fadeOutObjectsOnScreen();
			render();
			break;
		case 4:
			setTimeout(function() {
				initialize(1)
			}, 1);
			render();
			break;
		default:
			initialize(), setStartScreen()
	}
}

function enableRestart() {
	canRestart = 1
}

function isInfringing(a) {
	for (var b = 0; b < a.sides; b++) {
		for (var d = 0, c = 0; c < a.blocks[b].length; c++) d += a.blocks[b][c].deleted;
		if (a.blocks[b].length - d > settings.rows) return !0
	}
	return !1
}

function checkGameOver() {
	for (var a = 0; a < MainHex.sides; a++)
		if (isInfringing(MainHex)) return -1 == highscores.indexOf(score) && highscores.push(score), writeHighScores(), gameOverDisplay(),(function(){
			dp_submitScore(score);	
			document.getElementById('moregame2').style.display='block';			
		})(), !0;
	return !1
}

function showHelp() {
	1 == gameState && pause();
	$("#helpScreen").fadeToggle(150, "linear")
};

function rotatePoint(a, b, d) {
	var c = Math.PI / 180 * d;
	d = Math.cos(c) * a - Math.sin(c) * b;
	a = Math.sin(c) * a + Math.cos(c) * b;
	return {
		x: d,
		y: a
	}
}

function randInt(a, b) {
	return Math.floor(Math.random() * b + a)
};

function render() {
	var a = "#bdc3c7";
	0 === gameState && (a = "rgb(220, 223, 225)");
	ctx.clearRect(0, 0, trueCanvas.width, trueCanvas.height);
	clearGameBoard();
	if (1 === gameState || 2 === gameState || -1 === gameState || 0 === gameState) 1 > op && (op += .01), ctx.globalAlpha = 1, drawPolygon(trueCanvas.width / 2, trueCanvas.height / 2, 6, settings.rows * settings.blockHeight * (2 / Math.sqrt(3)) + settings.hexWidth, 30, a, !1, 6), drawTimer(), ctx.globalAlpha = 1;
	for (a = 0; a < MainHex.blocks.length; a++)
		for (var b = 0; b < MainHex.blocks[a].length; b++) MainHex.blocks[a][b].draw(!0,
			b);
	for (a = 0; a < blocks.length; a++) blocks[a].draw();
	MainHex.draw();
	1 != gameState && -1 != gameState && 0 !== gameState || drawScoreboard();
	for (a = 0; a < MainHex.texts.length; a++) MainHex.texts[a].draw() || (MainHex.texts.splice(a, 1), a--);
	400 > MainHex.ct && 0 !== gameState && !MainHex.playThrough && (350 < MainHex.ct && (ctx.globalAlpha = (50 - (MainHex.ct - 350)) / 50), 50 > MainHex.ct && (ctx.globalAlpha = MainHex.ct / 50), renderBeginningText(), ctx.globalAlpha = 1); - 1 == gameState && (ctx.globalAlpha = 0.9, ctx.fillStyle = "rgb(236,240,241)", ctx.fillRect(0, 0,
		trueCanvas.width, trueCanvas.height), ctx.globalAlpha = 1);
	settings.prevScale = settings.scale;
	settings.hexWidth = settings.baseHexWidth * settings.scale;
	settings.blockHeight = settings.baseBlockHeight * settings.scale
}

function renderBeginningText() {
	renderText(trueCanvas.width / 2 + 1.5 * settings.scale, trueCanvas.height / 2 - 208 * settings.scale-20, 35, "#2c3e50", "\u63a7\u5236", "35px 微软雅黑");
	renderText(trueCanvas.width / 2 - 85 * settings.scale, trueCanvas.height / 2 - 169 * settings.scale, 20, "#2c3e50", "\u65cb\u8f6c:", "20px 微软雅黑");
	renderText(trueCanvas.width / 2 - 21 * settings.scale, trueCanvas.height / 2 - 141 * settings.scale+10, 14, "#2c3e50", "\u5de6", "14px 微软雅黑");
	renderText(trueCanvas.width / 2 + 25 * settings.scale, trueCanvas.height / 2 - 141 * settings.scale+10,14, "#2c3e50", "\u53f3", "14px 微软雅黑");
	/*加提示语*/
	renderText(trueCanvas.width / 2 + 0 * settings.scale, trueCanvas.height / 2 - 121 * settings.scale+20,
		16, "#2c3e50", "\u70b9\u51fb\u5c4f\u5e55\u5de6\u53f3\u6d4b\uff0c\u5411\u5de6\u3001\u5411\u53f3\u65cb\u8f6c\u516d\u8fb9\u5f62\u3002", "16px 微软雅黑");
	drawKey("right", trueCanvas.width / 2 + 23 * settings.scale - 17.5 * settings.scale, trueCanvas.height / 2 - 195 * settings.scale);
	drawKey("left", trueCanvas.width / 2 - 23 * settings.scale - 17.5 * settings.scale, trueCanvas.height / 2 - 195 * settings.scale)
}

function drawKey(a, b, d) {
	ctx.save();
	ctx.beginPath();
	ctx.fillStyle = "#2c3e50";
	ctx.strokeStyle = "#2c3e50";
	ctx.lineWidth = 4 * settings.scale;
	ctx.rect(b + 2.5 * settings.scale, d + 2.5 * settings.scale, 35 * settings.scale, 35 * settings.scale);
	ctx.stroke();
	switch (a) {
		case "left":
			ctx.translate(b + 28 * settings.scale, d + 13 * settings.scale);
			ctx.rotate(3.14159);
			ctx.font = "20px Fontawesome";
			ctx.scale(settings.scale, settings.scale);
			ctx.fillText(String.fromCharCode("0xf04b"), 0, 0);
			break;
		case "right":
			ctx.font = "20px Fontawesome";
			ctx.translate(b +
				12.5 * settings.scale, d + 27.5 * settings.scale);
			ctx.scale(settings.scale, settings.scale);
			ctx.fillText(String.fromCharCode("0xf04b"), 0, 0);
			break;
		default:
			ctx.font = "35px Roboto", ctx.translate(b + 25 * settings.scale, d + 39.5 * settings.scale), ctx.scale(settings.scale, settings.scale), ctx.fillText(a, 0, 0)
	}
	ctx.restore()
};

function exportSaveState() {
	var a = {};
	if (1 == gameState || -1 == gameState || 0 === gameState && void 0 !== localStorage.getItem("saveState")) {
		a = {
			hex: $.extend(!0, {}, MainHex),
			blocks: $.extend(!0, [], blocks),
			score: score,
			wavegen: waveone,
			gdx: gdx,
			gdy: gdy,
			comboTime: settings.comboTime
		};
		a.hex.blocks.map(function(a) {
			for (var b = 0; b < a.length; b++) a[b] = $.extend(!0, {}, a[b]);
			a.map(descaleBlock)
		});
		for (var b = 0; b < a.blocks.length; b++) a.blocks[b] = $.extend(!0, {}, a.blocks[b]);
		a.blocks.map(descaleBlock)
	}
	localStorage.setItem("highscores",
		JSON.stringify(highscores));
	return JSONfn.stringify(a)
}

function descaleBlock(a) {
	a.distFromHex /= settings.scale
}

function writeHighScores() {
	highscores.sort(function(a, b) {
		a = parseInt(a, 10);
		b = parseInt(b, 10);
		return a < b ? 1 : a > b ? -1 : 0
	});
	highscores = highscores.slice(0, 3);
	localStorage.setItem("highscores", JSON.stringify(highscores))
}

function clearSaveState() {
	localStorage.setItem("saveState", "{}");
}

function isStateSaved() {
	return "{}" != localStorage.getItem("saveState") && void 0 != localStorage.getItem("saveState")
};

function Text(a, b, d, c, e, f) {
	this.x = a;
	this.y = b;
	this.font = c;
	this.color = e;
	this.opacity = 1;
	this.text = d;
	this.alive = 1;
	this.draw = function() {
		return 0 < this.alive ? (ctx.globalAlpha = this.opacity, renderText(this.x + gdx, this.y + gdy, 50, this.color, this.text), ctx.globalAlpha = 1, f(this), !0) : !1
	}
}

function fadeUpAndOut(a) {
	a.opacity -= Math.pow(Math.pow(1 - a.opacity, 1 / 3) + 1, 3) / 100;
	a.alive = a.opacity;
	a.y -= 3
};

function update() {
	var a = MainHex.ct;
	1 == gameState && (waveone.update(), 1E3 < a - waveone.prevTimeScored && (waveone.prevTimeScored = a));
	var a = 99,
		b, d, c;
	for (b = 0; b < blocks.length; b++)(MainHex.doesBlockCollide(blocks[b]), blocks[b].settled) ? blocks[b].removed || (blocks[b].removed = 1) : blocks[b].initializing || (blocks[b].distFromHex -= blocks[b].iter * settings.scale);
	for (b = 0; b < MainHex.blocks.length; b++)
		for (d = 0; d < MainHex.blocks[b].length; d++) 1 == MainHex.blocks[b][d].checked && (consolidateBlocks(MainHex, MainHex.blocks[b][d].attachedLane,
			MainHex.blocks[b][d].getIndex()), MainHex.blocks[b][d].checked = 0);
	for (b = 0; b < MainHex.blocks.length; b++) {
		a = 99;
		for (d = 0; d < MainHex.blocks[b].length; d++) c = MainHex.blocks[b][d], 2 == c.deleted && (MainHex.blocks[b].splice(d, 1), blockDestroyed(), d < a && (a = d), d--);
		if (a < MainHex.blocks[b].length)
			for (d = a; d < MainHex.blocks[b].length; d++) MainHex.blocks[b][d].settled = 0
	}
	for (b = 0; b < MainHex.blocks.length; b++)
		for (d = 0; d < MainHex.blocks[b].length; d++) c = MainHex.blocks[b][d], MainHex.doesBlockCollide(c, d, MainHex.blocks[b]), MainHex.blocks[b][d].settled ||
			(MainHex.blocks[b][d].distFromHex -= c.iter * settings.scale);
	for (b = 0; b < blocks.length; b++) 1 == blocks[b].removed && (blocks.splice(b, 1), b--);
	MainHex.ct++
};

function easeOutCubic(a, b, d, c) {
	return d * ((a = a / c - 1) * a * a + 1) + b
}

function renderText(a, b, d, c, e, f) {
	ctx.save();
	f || (f = "px/0 微软雅黑");
	d *= settings.scale;
	ctx.font = d + f;
	ctx.textAlign = "center";
	ctx.fillStyle = c;
	ctx.fillText(e, a, b + d / 2 - 9 * settings.scale);
	ctx.restore()
}
var doudouIcon=new Image();
doudouIcon.src="doudouIcon.png";
function drawScoreboard() {
	1 > scoreOpacity && (scoreOpacity += .01, textOpacity += .01);
	ctx.globalAlpha = textOpacity;
	var a = 50,
		b = String(score);
	6 == b.length ? a = 43 : 7 == b.length ? a = 35 : 8 == b.length ? a = 31 : 9 == b.length && (a = 27);
	0 === gameState ? (renderText(trueCanvas.width / 2 + gdx + 6 * settings.scale, trueCanvas.height / 2 + gdy, 60, "rgb(236, 240, 241)", String.fromCharCode("0xf04b"), "px FontAwesome"), renderText(trueCanvas.width / 2 + gdx + 6 * settings.scale, trueCanvas.height / 2 + gdy - 170 * settings.scale, 150, "#2c3e50", "\u8f6c\u4f60\u59b9"), renderText(trueCanvas.width /
		2 + gdx + 5 * settings.scale, trueCanvas.height / 2 + gdy + 100 * settings.scale, 20, "rgb(44,62,80)", "\u5f00\u59cb!"),ctx.drawImage(doudouIcon,0,0,266,120,trueCanvas.width / 2 -120 * settings.scale, trueCanvas.height / 2 +250 * settings.scale,266*settings.scale,120*settings.scale)) : (0 != gameState && 0 < textOpacity && (textOpacity -= .05, renderText(trueCanvas.width / 2 + gdx + 6 * settings.scale, trueCanvas.height / 2 + gdy, 60, "rgb(236, 240, 241)", String.fromCharCode("0xf04b"), "px FontAwesome"), renderText(trueCanvas.width / 2 + gdx + 6 * settings.scale, trueCanvas.height / 2 + gdy - 170 * settings.scale, 150, "#2c3e50", "\u8f6c\u4f60\u59b9"), renderText(trueCanvas.width / 2 + gdx + 5 * settings.scale, trueCanvas.height / 2 + gdy +
		100 * settings.scale, 20, "rgb(44,62,80)", "\u5f00\u59cb!")), ctx.globalAlpha = scoreOpacity, renderText(trueCanvas.width / 2 + gdx, trueCanvas.height / 2 + gdy, a, "rgb(236, 240, 241)", score));
	ctx.globalAlpha = 1
}

function clearGameBoard() {
	drawPolygon(trueCanvas.width / 2, trueCanvas.height / 2, 6, trueCanvas.width / 2, 30, hexagonBackgroundColor, 0, "rgba(0,0,0,0)")
}
function drawPolygon(a, b, d, c, e, f, h, q) {
	ctx.fillStyle = f;
	ctx.lineWidth = h;
	ctx.strokeStyle = q;
	ctx.beginPath();
	f = rotatePoint(0, c, e);
	ctx.moveTo(f.x + a, f.y + b);
	c = f.x;
	f = f.y;
	for (e = 0; e < d; e++) f = rotatePoint(c, f, 360 / d), ctx.lineTo(f.x + a, f.y + b), c = f.x, f = f.y;
	ctx.closePath();
	ctx.fill();
	ctx.stroke();
	ctx.strokeStyle = "rgba(0,0,0,0)"
}

function toggleClass(a, b) {
	$(a).hasClass(b) ? $(a).removeClass(b) : $(a).addClass(b)
}

function showText(a) {
	var b = {
		paused: "<div class='centeredHeader unselectable'>\u6682\u505c</div><br><div class='unselectable centeredSubHeader'>\u6309 p \u7ee7\u7eed</div><div style='height:100px;line-height:100px;cursor:pointer;'></div>",
		pausedMobile: "<div class='centeredHeader unselectable'>\u6682\u505c</div><br><div class='unselectable centeredSubHeader'>\u6309 <i class='fa fa-play'></i> \u7ee7\u7eed</div><div style='height:100px;line-height:100px;cursor:pointer;'></div>",
		start: "<div class='centeredHeader unselectable' style='line-height:80px;'>Press enter to start</div>",
		gameover: "<div class='centeredHeader unselectable' style='color: #2C3E50;font-weight: bold;font-size: 3rem;'> Game Over</div><div style='color: #2C3E50;margin-top: 5%;font-size: 2.5rem;'>得分</div><div style='font-size: 6rem;color: #2C3E50;'>"+ score +"</div>"
	};
	"paused" == a && "mobile" == settings.platform && (a = "pausedMobile");
	if ("gameover" == a) {
		var d = 1,
			c, e;
		b.gameover += "<div class='unselectable centeredSubHeader endBtn'><a href=\"###\" class='moreGame'></a><a href=\"###\" class=\"irestartBtn\" ></a></div>";
		if (d)
			for (c = 0; c < highscores.length; c++) 0 !== highscores[c] && (d = 0)
	}
	$("#overlay").html(b[a]);
	$("#overlay").fadeIn("1000", "swing");
	$("#overlayMask").show();
	"gameover" == a && ("mobile" == settings.platform && $(".tg").css("margin-top", "4px"))
}

function setMainMenu() {
	gameState = 4;
	canRestart = !1;
	setTimeout(function() {
		canRestart = "s"
	}, 500);
	$("#restartBtn").hide(); - 1 == $($("#pauseBtn").children()[0]).attr("class").indexOf("pause") ? $("#pauseBtnInner").html('<i class="fa fa-pause fa-2x"></i>') : $("#pauseBtnInner").html('<i class="fa fa-play fa-2x"></i>')
}

function hideText() {
	$("#overlay").fadeOut("1000", function() {
		$("#overlay").html("")
	});
	$("#overlayMask").hide();
}

function gameOverDisplay() {
	$("#attributions").show();
	document.getElementById("canvas").className = "blur";
	showText("gameover");
	showbottombar();
}

function pause(a) {
	writeHighScores();
	a = a ? "" : "paused";
	document.getElementById("canvas"); - 1 == gameState ? ($("#restartBtn").fadeOut(150, "linear"), $("#helpScreen").is(":visible") && $("#helpScreen").fadeOut(150, "linear"), $("#pauseBtnInner").html('<i class="fa fa-pause fa-2x"></i>'), $(".helpText").fadeOut(200, "linear"), hideText(), hidebottombar(), setTimeout(function() {
		gameState = prevGameState
	}, 200)) : -2 != gameState && 0 !== gameState && 2 !== gameState && ($("#restartBtn").fadeIn(150, "linear"), $(".helpText").fadeIn(200,
		"linear"), showbottombar(), "paused" == a && showText(a), $("#pauseBtnInner").html('<i class="fa fa-play fa-2x"></i>'), prevGameState = gameState, gameState = -1)
};

function blockDestroyed() {
	waveone.nextGen = 1350 < waveone.nextGen ? waveone.nextGen - 24 * settings.creationSpeedModifier : 600 < waveone.nextGen ? waveone.nextGen - 10 * settings.creationSpeedModifier : 600;
	waveone.difficulty = 35 > waveone.difficulty ? waveone.difficulty + .17 * settings.speedModifier : 35
}

function waveGen(a) {
	this.last = this.lastGen = 0;
	this.nextGen = 2300;
	this.start = 0;
	this.colors = colors;
	this.ct = 0;
	this.hex = a;
	this.difficulty = 1;
	this.dt = 0;
	this.update = function() {
		this.currentFunction();
		this.dt = 16.6666667 * MainHex.ct;
		this.computeDifficulty();
		(this.dt - this.lastGen) * settings.creationSpeedModifier > this.nextGen && 600 < this.nextGen && (this.nextGen -= this.nextGen / 1300 * 10 * settings.creationSpeedModifier)
	};
	this.randomGeneration = function() {
		if (this.dt - this.lastGen > this.nextGen) {
			this.ct++;
			this.lastGen = this.dt;
			var a = randInt(0, MainHex.sides);
			addNewBlock(a, colors[randInt(0, colors.length)], 1.6 + this.difficulty / 15 * 3);
			5 < this.ct && (a = randInt(0, 24), 15 < a ? (this.ct = 0, this.currentFunction = this.doubleGeneration) : 10 < a ? (this.ct = 0, this.currentFunction = this.crosswiseGeneration) : 7 < a ? (this.ct = 0, this.currentFunction = this.spiralGeneration) : 4 < a ? (this.ct = 0, this.currentFunction = this.circleGeneration) : 1 < a && (this.ct = 0, this.currentFunction = this.halfCircleGeneration))
		}
	};
	this.computeDifficulty = function() {
		35 > this.difficulty && (this.difficulty =
			8 > this.difficulty ? this.difficulty + (this.dt - this.last) / 2566667 * settings.speedModifier : 15 > this.difficulty ? this.difficulty + (this.dt - this.last) / 53333333 * settings.speedModifier : this.difficulty + (this.dt - this.last) / 12E7 * settings.speedModifier)
	};
	this.circleGeneration = function() {
		if (this.dt - this.lastGen > this.nextGen + 500) {
			var a = randInt(1, 4);
			3 == a && (a = randInt(1, 4));
			var d = [],
				c = 0;
			a: for (; c < a; c++) {
				var e = randInt(0, colors.length),
					f;
				for (f in d)
					if (d[f] == colors[e]) {
						c--;
						continue a
					}
				d.push(colors[e])
			}
			for (c = 0; c < MainHex.sides; c++) addNewBlock(c,
				d[c % a], 1.5 + this.difficulty / 15 * 3);
			this.ct += 15;
			this.lastGen = this.dt;
			this.shouldChangePattern(1)
		}
	};
	this.halfCircleGeneration = function() {
		if (this.dt - this.lastGen > (this.nextGen + 500) / 2) {
			var a = randInt(1, 3),
				d = colors[randInt(0, colors.length)],
				c = [d, d, d];
			2 == a && (c = [d, colors[randInt(0, colors.length)], d]);
			a = randInt(0, 6);
			for (d = 0; 3 > d; d++) addNewBlock((a + d) % 6, c[d], 1.5 + this.difficulty / 15 * 3);
			this.ct += 8;
			this.lastGen = this.dt;
			this.shouldChangePattern()
		}
	};
	this.crosswiseGeneration = function() {
		if (this.dt - this.lastGen > this.nextGen) {
			var a =
				randInt(0, colors.length),
				d = randInt(0, colors.length);
			addNewBlock(d, colors[a], .6 + this.difficulty / 15 * 3);
			addNewBlock((d + 3) % MainHex.sides, colors[a], .6 + this.difficulty / 15 * 3);
			this.ct += 1.5;
			this.lastGen = this.dt;
			this.shouldChangePattern()
		}
	};
	this.spiralGeneration = function() {
		var a = randInt(0, 2);
		this.dt - this.lastGen > 2 / 3 * this.nextGen && (a ? addNewBlock(5 - this.ct % MainHex.sides, colors[randInt(0, colors.length)], 1.5 + this.difficulty / 15 * 1.5) : addNewBlock(this.ct % MainHex.sides, colors[randInt(0, colors.length)], 1.5 + this.difficulty /
			15 * 1.5), this.ct += 1, this.lastGen = this.dt, this.shouldChangePattern())
	};
	this.doubleGeneration = function() {
		if (this.dt - this.lastGen > this.nextGen) {
			var a = randInt(0, colors.length);
			addNewBlock(a, colors[randInt(0, colors.length)], 1.5 + this.difficulty / 15 * 3);
			addNewBlock((a + 1) % MainHex.sides, colors[randInt(0, colors.length)], 1.5 + this.difficulty / 15 * 3);
			this.ct += 2;
			this.lastGen = this.dt;
			this.shouldChangePattern()
		}
	};
	this.setRandom = function() {
		this.ct = 0;
		this.currentFunction = this.randomGeneration
	};
	this.shouldChangePattern =
		function(a) {
			if (a) switch (a = randInt(0, 4), this.ct = 0, a) {
				case 0:
					this.currentFunction = this.doubleGeneration;
					break;
				case 1:
					this.currentFunction = this.spiralGeneration;
					break;
				case 2:
					this.currentFunction = this.crosswiseGeneration
			} else if (8 < this.ct && 0 === randInt(0, 2)) return this.setRandom(), 1;
			return 0
	};
	this.currentFunction = this.randomGeneration
};
! function(a, b) {
	function d() {
		c.READY || (B.determineEventTypes(), g.each(c.gestures, function(a) {
			x.register(a)
		}), B.onTouch(c.DOCUMENT, y, x.detect), B.onTouch(c.DOCUMENT, r, x.detect), c.READY = !0)
	}
	var c = function K(a, b) {
		return new K.Instance(a, b || {})
	};
	c.VERSION = "1.1.2";
	c.defaults = {
		behavior: {
			userSelect: "none",
			touchAction: "none",
			touchCallout: "none",
			contentZooming: "none",
			userDrag: "none",
			tapHighlightColor: "rgba(0,0,0,0)"
		}
	};
	c.DOCUMENT = document;
	c.HAS_POINTEREVENTS = navigator.pointerEnabled || navigator.msPointerEnabled;
	c.HAS_TOUCHEVENTS = "ontouchstart" in a;
	c.IS_MOBILE = /mobile|tablet|ip(ad|hone|od)|android|silk/i.test(navigator.userAgent);
	c.NO_MOUSEEVENTS = c.HAS_TOUCHEVENTS && c.IS_MOBILE || c.HAS_POINTEREVENTS;
	c.CALCULATE_INTERVAL = 25;
	var e = {}, f = c.DIRECTION_DOWN = "down",
		h = c.DIRECTION_LEFT = "left",
		q = c.DIRECTION_UP = "up",
		u = c.DIRECTION_RIGHT = "right",
		A = c.POINTER_MOUSE = "mouse",
		v = c.POINTER_TOUCH = "touch",
		w = c.POINTER_PEN = "pen",
		n = c.EVENT_START = "start",
		y = c.EVENT_MOVE = "move",
		r = c.EVENT_END = "end",
		z = c.EVENT_RELEASE = "release",
		D = c.EVENT_TOUCH =
			"touch";
	c.READY = !1;
	c.plugins = c.plugins || {};
	c.gestures = c.gestures || {};
	var g = c.utils = {
		extend: function(a, c, d) {
			for (var l in c)!c.hasOwnProperty(l) || a[l] !== b && d || (a[l] = c[l]);
			return a
		},
		on: function(a, b, c) {
			a.addEventListener(b, c, !1)
		},
		off: function(a, b, c) {
			a.removeEventListener(b, c, !1)
		},
		each: function(a, c, d) {
			var l, e;
			if ("forEach" in a) a.forEach(c, d);
			else if (a.length !== b)
				for (l = 0, e = a.length; e > l && !1 !== c.call(d, a[l], l, a); l++);
			else
				for (l in a)
					if (a.hasOwnProperty(l) && !1 === c.call(d, a[l], l, a)) break
		},
		inStr: function(a, b) {
			return -1 <
				a.indexOf(b)
		},
		inArray: function(a, b) {
			if (a.indexOf) {
				var c = a.indexOf(b);
				return -1 === c ? !1 : c
			}
			for (var c = 0, d = a.length; d > c; c++)
				if (a[c] === b) return c;
			return !1
		},
		toArray: function(a) {
			return Array.prototype.slice.call(a, 0)
		},
		hasParent: function(a, b) {
			for (; a;) {
				if (a == b) return !0;
				a = a.parentNode
			}
			return !1
		},
		getCenter: function(a) {
			var b = [],
				c = [],
				d = [],
				e = [],
				m = Math.min,
				f = Math.max;
			return 1 === a.length ? {
				pageX: a[0].pageX,
				pageY: a[0].pageY,
				clientX: a[0].clientX,
				clientY: a[0].clientY
			} : (g.each(a, function(a) {
				b.push(a.pageX);
				c.push(a.pageY);
				d.push(a.clientX);
				e.push(a.clientY)
			}), {
				pageX: (m.apply(Math, b) + f.apply(Math, b)) / 2,
				pageY: (m.apply(Math, c) + f.apply(Math, c)) / 2,
				clientX: (m.apply(Math, d) + f.apply(Math, d)) / 2,
				clientY: (m.apply(Math, e) + f.apply(Math, e)) / 2
			})
		},
		getVelocity: function(a, b, c) {
			return {
				x: Math.abs(b / a) || 0,
				y: Math.abs(c / a) || 0
			}
		},
		getAngle: function(a, b) {
			return 180 * Math.atan2(b.clientY - a.clientY, b.clientX - a.clientX) / Math.PI
		},
		getDirection: function(a, b) {
			var c = Math.abs(a.clientX - b.clientX),
				d = Math.abs(a.clientY - b.clientY);
			return c >= d ? 0 < a.clientX -
				b.clientX ? h : u : 0 < a.clientY - b.clientY ? q : f
		},
		getDistance: function(a, b) {
			var c = b.clientX - a.clientX,
				d = b.clientY - a.clientY;
			return Math.sqrt(c * c + d * d)
		},
		getScale: function(a, b) {
			return 2 <= a.length && 2 <= b.length ? this.getDistance(b[0], b[1]) / this.getDistance(a[0], a[1]) : 1
		},
		getRotation: function(a, b) {
			return 2 <= a.length && 2 <= b.length ? this.getAngle(b[1], b[0]) - this.getAngle(a[1], a[0]) : 0
		},
		isVertical: function(a) {
			return a == q || a == f
		},
		setPrefixedCss: function(a, b, c, d) {
			var e = ["", "Webkit", "Moz", "O", "ms"];
			b = g.toCamelCase(b);
			for (var f =
				0; f < e.length; f++) {
				var s = b;
				if (e[f] && (s = e[f] + s.slice(0, 1).toUpperCase() + s.slice(1)), s in a.style) {
					a.style[s] = (null == d || d) && c || "";
					break
				}
			}
		},
		toggleBehavior: function(a, b, c) {
			if (b && a && a.style) {
				g.each(b, function(b, d) {
					g.setPrefixedCss(a, d, b, c)
				});
				var d = c && function() {
						return !1
					};
				"none" == b.userSelect && (a.onselectstart = d);
				"none" == b.userDrag && (a.ondragstart = d)
			}
		},
		toCamelCase: function(a) {
			return a.replace(/[_-]([a-z])/g, function(a) {
				return a[1].toUpperCase()
			})
		}
	}, B = c.event = {
			preventMouseEvents: !1,
			started: !1,
			shouldDetect: !1,
			on: function(a, b, c, d) {
				b = b.split(" ");
				g.each(b, function(b) {
					g.on(a, b, c);
					d && d(b)
				})
			},
			off: function(a, b, c, d) {
				b = b.split(" ");
				g.each(b, function(b) {
					g.off(a, b, c);
					d && d(b)
				})
			},
			onTouch: function(a, b, d) {
				var l = this,
					f = function(e) {
						var f, F = e.type.toLowerCase(),
							h = c.HAS_POINTEREVENTS;
						(F = g.inStr(F, "mouse")) && l.preventMouseEvents || (F && b == n && 0 === e.button ? (l.preventMouseEvents = !1, l.shouldDetect = !0) : h && b == n ? l.shouldDetect = 1 === e.buttons : F || b != n || (l.preventMouseEvents = !0, l.shouldDetect = !0), h && b != r && C.updatePointer(b, e), l.shouldDetect &&
								(f = l.doDetect.call(l, e, b, a, d)), f == r && (l.preventMouseEvents = !1, l.shouldDetect = !1, C.reset()), h && b == r && C.updatePointer(b, e))
					};
				return this.on(a, e[b], f), f
			},
			doDetect: function(a, b, c, d) {
				var e = this.getTouchList(a, b),
					f = b,
					g = e.trigger,
					k = e.length;
				b == n ? g = D : b == r && (g = z, k = e.length - (a.changedTouches ? a.changedTouches.length : 1));
				0 < k && this.started && (f = y);
				this.started = !0;
				a = this.collectEventData(c, f, e, a);
				return b != r && d.call(x, a), g && (a.changedLength = k, a.eventType = g, d.call(x, a), a.eventType = f, delete a.changedLength), f == r &&
					(d.call(x, a), this.started = !1), f
			},
			determineEventTypes: function() {
				var b;
				return b = c.HAS_POINTEREVENTS ? a.PointerEvent ? ["pointerdown", "pointermove", "pointerup pointercancel lostpointercapture"] : ["MSPointerDown", "MSPointerMove", "MSPointerUp MSPointerCancel MSLostPointerCapture"] : c.NO_MOUSEEVENTS ? ["touchstart", "touchmove", "touchend touchcancel"] : ["touchstart mousedown", "touchmove mousemove", "touchend touchcancel mouseup"], e[n] = b[0], e[y] = b[1], e[r] = b[2], e
			},
			getTouchList: function(a, b) {
				if (c.HAS_POINTEREVENTS) return C.getTouchList();
				if (a.touches) {
					if (b == y) return a.touches;
					var d = [],
						l = [].concat(g.toArray(a.touches), g.toArray(a.changedTouches)),
						e = [];
					return g.each(l, function(a) {
						!1 === g.inArray(d, a.identifier) && e.push(a);
						d.push(a.identifier)
					}), e
				}
				return a.identifier = 1, [a]
			},
			collectEventData: function(a, b, c, d) {
				a = v;
				return g.inStr(d.type, "mouse") || C.matchType(A, d) ? a = A : C.matchType(w, d) && (a = w), {
					center: g.getCenter(c),
					timeStamp: Date.now(),
					target: d.target,
					touches: c,
					eventType: b,
					pointerType: a,
					srcEvent: d,
					preventDefault: function() {
						var a = this.srcEvent;
						a.preventManipulation && a.preventManipulation();
						a.preventDefault && a.preventDefault()
					},
					stopPropagation: function() {
						this.srcEvent.stopPropagation()
					},
					stopDetect: function() {
						return x.stopDetect()
					}
				}
			}
		}, C = c.PointerEvent = {
			pointers: {},
			getTouchList: function() {
				var a = [];
				return g.each(this.pointers, function(b) {
					a.push(b)
				}), a
			},
			updatePointer: function(a, b) {
				a == r || a != r && 1 !== b.buttons ? delete this.pointers[b.pointerId] : (b.identifier = b.pointerId, this.pointers[b.pointerId] = b)
			},
			matchType: function(a, b) {
				if (!b.pointerType) return !1;
				var c = b.pointerType,
					d = {};
				return d[A] = c === (b.MSPOINTER_TYPE_MOUSE || A), d[v] = c === (b.MSPOINTER_TYPE_TOUCH || v), d[w] = c === (b.MSPOINTER_TYPE_PEN || w), d[a]
			},
			reset: function() {
				this.pointers = {}
			}
		}, x = c.detection = {
			gestures: [],
			current: null,
			previous: null,
			stopped: !1,
			startDetect: function(a, b) {
				this.current || (this.stopped = !1, this.current = {
					inst: a,
					startEvent: g.extend({}, b),
					lastEvent: !1,
					lastCalcEvent: !1,
					futureCalcEvent: !1,
					lastCalcData: {},
					name: ""
				}, this.detect(b))
			},
			detect: function(a) {
				if (this.current && !this.stopped) {
					a = this.extendEventData(a);
					var b = this.current.inst,
						c = b.options;
					return g.each(this.gestures, function(d) {
						return !this.stopped && b.enabled && c[d.name] && !1 === d.handler.call(d, a, b) ? (this.stopDetect(), !1) : void 0
					}, this), this.current && (this.current.lastEvent = a), a.eventType == r && this.stopDetect(), a
				}
			},
			stopDetect: function() {
				this.previous = g.extend({}, this.current);
				this.current = null;
				this.stopped = !0
			},
			getCalculatedData: function(a, b, d, e, f) {
				var m = this.current,
					s = !1,
					k = m.lastCalcEvent,
					h = m.lastCalcData;
				k && a.timeStamp - k.timeStamp > c.CALCULATE_INTERVAL &&
					(b = k.center, d = a.timeStamp - k.timeStamp, e = a.center.clientX - k.center.clientX, f = a.center.clientY - k.center.clientY, s = !0);
				a.eventType != D && a.eventType != z || (m.futureCalcEvent = a);
				(!m.lastCalcEvent || s) && (h.velocity = g.getVelocity(d, e, f), h.angle = g.getAngle(b, a.center), h.direction = g.getDirection(b, a.center), m.lastCalcEvent = m.futureCalcEvent || a, m.futureCalcEvent = a);
				a.velocityX = h.velocity.x;
				a.velocityY = h.velocity.y;
				a.interimAngle = h.angle;
				a.interimDirection = h.direction
			},
			extendEventData: function(a) {
				var b = this.current,
					c = b.startEvent,
					b = b.lastEvent || c;
				a.eventType != D && a.eventType != z || (c.touches = [], g.each(a.touches, function(a) {
					c.touches.push({
						clientX: a.clientX,
						clientY: a.clientY
					})
				}));
				var d = a.timeStamp - c.timeStamp,
					e = a.center.clientX - c.center.clientX,
					f = a.center.clientY - c.center.clientY;
				return this.getCalculatedData(a, b.center, d, e, f), g.extend(a, {
					startEvent: c,
					deltaTime: d,
					deltaX: e,
					deltaY: f,
					distance: g.getDistance(c.center, a.center),
					angle: g.getAngle(c.center, a.center),
					direction: g.getDirection(c.center, a.center),
					scale: g.getScale(c.touches,
						a.touches),
					rotation: g.getRotation(c.touches, a.touches)
				}), a
			},
			register: function(a) {
				var d = a.defaults || {};
				return d[a.name] === b && (d[a.name] = !0), g.extend(c.defaults, d, !0), a.index = a.index || 1E3, this.gestures.push(a), this.gestures.sort(function(a, b) {
					return a.index < b.index ? -1 : a.index > b.index ? 1 : 0
				}), this.gestures
			}
		};
	c.Instance = function(a, b) {
		var e = this;
		d();
		this.element = a;
		this.enabled = !0;
		g.each(b, function(a, c) {
			delete b[c];
			b[g.toCamelCase(c)] = a
		});
		this.options = g.extend(g.extend({}, c.defaults), b || {});
		this.options.behavior &&
			g.toggleBehavior(this.element, this.options.behavior, !0);
		this.eventStartHandler = B.onTouch(a, n, function(a) {
			e.enabled && a.eventType == n ? x.startDetect(e, a) : a.eventType == D && x.detect(a)
		});
		this.eventHandlers = []
	};
	c.Instance.prototype = {
		on: function(a, b) {
			var c = this;
			return B.on(c.element, a, b, function(a) {
				c.eventHandlers.push({
					gesture: a,
					handler: b
				})
			}), c
		},
		off: function(a, b) {
			var c = this;
			return B.off(c.element, a, b, function(a) {
				a = g.inArray({
					gesture: a,
					handler: b
				});
				!1 !== a && c.eventHandlers.splice(a, 1)
			}), c
		},
		trigger: function(a,
			b) {
			b || (b = {});
			var d = c.DOCUMENT.createEvent("Event");
			d.initEvent(a, !0, !0);
			d.gesture = b;
			var e = this.element;
			return g.hasParent(b.target, e) && (e = b.target), e.dispatchEvent(d), this
		},
		enable: function(a) {
			return this.enabled = a, this
		},
		dispose: function() {
			var a, b;
			g.toggleBehavior(this.element, this.options.behavior, !1);
			for (a = -1; b = this.eventHandlers[++a];) g.off(this.element, b.gesture, b.handler);
			return this.eventHandlers = [], B.off(this.element, e[n], this.eventStartHandler), null
		}
	};
	(function(a) {
		var b = !1;
		c.gestures.Drag = {
			name: a,
			index: 50,
			handler: function(c, d) {
				var e = x.current;
				if (!(0 < d.options.dragMaxTouches && c.touches.length > d.options.dragMaxTouches)) switch (c.eventType) {
					case n:
						b = !1;
						break;
					case y:
						if (c.distance < d.options.dragMinDistance && e.name != a) break;
						var m = e.startEvent.center;
						if (e.name != a && (e.name = a, d.options.dragDistanceCorrection && 0 < c.distance)) {
							var s = Math.abs(d.options.dragMinDistance / c.distance);
							m.pageX += c.deltaX * s;
							m.pageY += c.deltaY * s;
							m.clientX += c.deltaX * s;
							m.clientY += c.deltaY * s;
							c = x.extendEventData(c)
						}(e.lastEvent.dragLockToAxis ||
							d.options.dragLockToAxis && d.options.dragLockMinDistance <= c.distance) && (c.dragLockToAxis = !0);
						e = e.lastEvent.direction;
						c.dragLockToAxis && e !== c.direction && (c.direction = g.isVertical(e) ? 0 > c.deltaY ? q : f : 0 > c.deltaX ? h : u);
						b || (d.trigger(a + "start", c), b = !0);
						d.trigger(a, c);
						d.trigger(a + c.direction, c);
						e = g.isVertical(c.direction);
						(d.options.dragBlockVertical && e || d.options.dragBlockHorizontal && !e) && c.preventDefault();
						break;
					case z:
						b && c.changedLength <= d.options.dragMaxTouches && (d.trigger(a + "end", c), b = !1);
						break;
					case r:
						b = !1
				}
			},
			defaults: {
				dragMinDistance: 10,
				dragDistanceCorrection: !0,
				dragMaxTouches: 1,
				dragBlockHorizontal: !1,
				dragBlockVertical: !1,
				dragLockToAxis: !1,
				dragLockMinDistance: 25
			}
		}
	})("drag");
	c.gestures.Gesture = {
		name: "gesture",
		index: 1337,
		handler: function(a, b) {
			b.trigger(this.name, a)
		}
	};
	(function(a) {
		var b;
		c.gestures.Hold = {
			name: a,
			index: 10,
			defaults: {
				holdTimeout: 500,
				holdThreshold: 2
			},
			handler: function(c, d) {
				var e = d.options,
					f = x.current;
				switch (c.eventType) {
					case n:
						clearTimeout(b);
						f.name = a;
						b = setTimeout(function() {
							f && f.name == a &&
								d.trigger(a, c)
						}, e.holdTimeout);
						break;
					case y:
						c.distance > e.holdThreshold && clearTimeout(b);
						break;
					case z:
						clearTimeout(b)
				}
			}
		}
	})("hold");
	c.gestures.Release = {
		name: "release",
		index: 1 / 0,
		handler: function(a, b) {
			a.eventType == z && b.trigger(this.name, a)
		}
	};
	c.gestures.Swipe = {
		name: "swipe",
		index: 40,
		defaults: {
			swipeMinTouches: 1,
			swipeMaxTouches: 1,
			swipeVelocityX: .6,
			swipeVelocityY: .6
		},
		handler: function(a, b) {
			if (a.eventType == z) {
				var c = a.touches.length,
					d = b.options;
				c < d.swipeMinTouches || c > d.swipeMaxTouches || (a.velocityX > d.swipeVelocityX ||
					a.velocityY > d.swipeVelocityY) && (b.trigger(this.name, a), b.trigger(this.name + a.direction, a))
			}
		}
	};
	(function(a) {
		var b = !1;
		c.gestures.Tap = {
			name: a,
			index: 100,
			handler: function(c, d) {
				var e, f, g = d.options,
					k = x.current,
					h = x.previous;
				switch (c.eventType) {
					case n:
						b = !1;
						break;
					case y:
						b = b || c.distance > g.tapMaxDistance;
						break;
					case r:
						"touchcancel" != c.srcEvent.type && c.deltaTime < g.tapMaxTime && !b && (e = h && h.lastEvent && c.timeStamp - h.lastEvent.timeStamp, f = !1, h && h.name == a && e && e < g.doubleTapInterval && c.distance < g.doubleTapDistance && (d.trigger("doubletap",
							c), f = !0), (!f || g.tapAlways) && (k.name = a, d.trigger(k.name, c)))
				}
			},
			defaults: {
				tapMaxTime: 250,
				tapMaxDistance: 10,
				tapAlways: !0,
				doubleTapDistance: 20,
				doubleTapInterval: 300
			}
		}
	})("tap");
	c.gestures.Touch = {
		name: "touch",
		index: -1 / 0,
		defaults: {
			preventDefault: !1,
			preventMouse: !1
		},
		handler: function(a, b) {
			return b.options.preventMouse && a.pointerType == A ? void a.stopDetect() : (b.options.preventDefault && a.preventDefault(), void(a.eventType == D && b.trigger("touch", a)))
		}
	};
	(function(a) {
		var b = !1;
		c.gestures.Transform = {
			name: a,
			index: 45,
			defaults: {
				transformMinScale: .01,
				transformMinRotation: 1
			},
			handler: function(c, d) {
				switch (c.eventType) {
					case n:
						b = !1;
						break;
					case y:
						if (2 > c.touches.length) break;
						var e = Math.abs(1 - c.scale),
							f = Math.abs(c.rotation);
						if (e < d.options.transformMinScale && f < d.options.transformMinRotation) break;
						x.current.name = a;
						b || (d.trigger(a + "start", c), b = !0);
						d.trigger(a, c);
						f > d.options.transformMinRotation && d.trigger("rotate", c);
						e > d.options.transformMinScale && (d.trigger("pinch", c), d.trigger("pinch" + (1 > c.scale ? "in" : "out"), c));
						break;
					case z:
						b &&
							2 > c.changedLength && (d.trigger(a + "end", c), b = !1)
				}
			}
		}
	})("transform");
	"function" == typeof define && define.amd ? define(function() {
		return c
	}) : "undefined" != typeof module && module.exports ? module.exports = c : a.Hammer = c
}(window);
(function(a) {
	a.stringify = function(a) {
		return JSON.stringify(a, function(a, b) {
			return b instanceof Function || "function" == typeof b ? b.toString() : b instanceof RegExp ? "_PxEgEr_" + b : b
		})
	};
	a.parse = function(a, d) {
		var c = d ? /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/ : !1;
		return JSON.parse(a, function(a, b) {
			var d;
			if ("string" != typeof b || 8 > b.length) return b;
			d = b.substring(0, 8);
			return c && b.match(c) ? new Date(b) : "function" === d ? eval("(" + b + ")") : "_PxEgEr_" === d ? eval(b.slice(8)) : b
		})
	};
	a.clone = function(b, d) {
		return a.parse(a.stringify(b),
			d)
	}
})("undefined" === typeof exports ? window.JSONfn = {} : exports);
(function() {
	var a, b, d, c, e, f, h, q, u, A, v, w, n, y, r, z, D, g, B, C, x, W, K, X, Y, l, F, m, s, k, Q, H, Z, R, I, S, L, J, T, M, t, U, N, E, O, V, P, aa, p = [].indexOf || function(a) {
			for (var b = 0, c = this.length; b < c; b++)
				if (b in this && this[b] === a) return b;
			return -1
		}, ba = {}.hasOwnProperty;
	t = [];
	E = [];
	O = null;
	k = [];
	d = [];
	L = !1;
	R = "ctrl";
	S = "meta alt option ctrl shift cmd".split(" ");
	P = [];
	u = {
		keys: [],
		count: 0
	};
	y = function(a, b) {
		var c;
		if (a.filter) return a.filter(b);
		var d, e, f;
		f = [];
		d = 0;
		for (e = a.length; d < e; d++) c = a[d], b(c) && f.push(c);
		return f
	};
	H = function() {
		return console.log.apply(console,
			arguments)
	};
	A = function(a, b) {
		var c, d, e;
		if (a.length !== b.length) return !1;
		d = 0;
		for (e = a.length; d < e; d++)
			if (c = a[d], !(0 <= p.call(b, c))) return !1;
		return !0
	};
	v = function(a, b) {
		var c, d, e;
		if (a.length !== b.length) return !1;
		c = d = 0;
		for (e = a.length; 0 <= e ? d < e : d > e; c = 0 <= e ? ++d : --d)
			if (a[c] !== b[c]) return !1;
		return !0
	};
	K = function(a, b) {
		var c, d, e;
		d = 0;
		for (e = a.length; d < e; d++)
			if (c = a[d], 0 > p.call(b, c)) return !1;
		return !0
	};
	X = function(a, b) {
		var c, d, e, f;
		e = d = 0;
		for (f = a.length; e < f; e++)
			if (c = a[e], c = b.indexOf(c), c >= d) d = c;
			else return !1;
		return !0
	};
	J = function(a,
		b) {
		if ((b || keypress.suppress_event_defaults) && !keypress.force_event_defaults && (a.preventDefault ? a.preventDefault() : a.returnValue = !1, a.stopPropagation)) return a.stopPropagation()
	};
	f = function(a) {
		if (a.prevent_repeat) return !1;
		if ("function" === typeof a.on_keydown) return !0
	};
	Q = function(a) {
		var b, c, d, e;
		e = a.keys;
		c = 0;
		for (d = e.length; c < d; c++)
			if (a = e[c], 0 <= p.call(k, a)) {
				b = !0;
				break
			}
		return b
	};
	r = function(a, b, c) {
		"function" === typeof b["on_" + a] && J(c, !1 === b["on_" + a].call(b["this"], c, b.count));
		"release" === a && (b.count = 0);
		if ("keyup" ===
			a) return b.keyup_fired = !0
	};
	Z = function(a, b) {
		var c, d, e;
		d = 0;
		for (e = t.length; d < e; d++) c = t[d], (c.is_ordered && v(a, c.keys) || !c.is_ordered && A(a, c.keys)) && b(c)
	};
	z = function(a, b) {
		var c, d, e;
		d = 0;
		for (e = t.length; d < e; d++) c = t[d], (c.is_ordered && X(c.keys, a) || !c.is_ordered && K(c.keys, a)) && b(c)
	};
	q = function(a) {
		return 0 <= p.call(k, "cmd") && 0 > p.call(a, "cmd") ? !1 : !0
	};
	D = function(a) {
		var b, c;
		b = [];
		c = y(k, function(b) {
			return b !== a
		});
		c.push(a);
		Z(c, function(a) {
			if (q(a.keys)) return b.push(a)
		});
		z(c, function(a) {
			if (!(0 <= p.call(b, a) || a.is_solitary) &&
				q(a.keys)) return b.push(a)
		});
		return b
	};
	B = function(a) {
		var b, c, d, e;
		c = [];
		d = 0;
		for (e = t.length; d < e; d++) b = t[d], b.is_sequence || 0 <= p.call(b.keys, a) && q(b.keys) && c.push(b);
		return c
	};
	e = function(a) {
		var b, c, e, f, G, g, k, h, l, m, n;
		g = !1;
		G = !0;
		e = !1;
		if (0 <= p.call(d, a)) return !0;
		if (d.length)
			for (f = k = 0, m = d.length; 0 <= m ? k < m : k > m; f = 0 <= m ? ++k : --k)
				if ((b = d[f]) && b.is_exclusive && a.is_exclusive) {
					b = b.keys;
					if (!g)
						for (h = 0, l = b.length; h < l; h++)
							if (c = b[h], g = !0, 0 > p.call(a.keys, c)) {
								g = !1;
								break
							}
					if (G && !g)
						for (n = a.keys, h = 0, l = n.length; h < l; h++)
							if (c = n[h],
								G = !1, 0 > p.call(b, c)) {
								G = !0;
								break
							}
					g && (e ? N(d.splice(f, 1)) : (N(d.splice(f, 1, a)), e = !0), G = !1)
				}
		G && d.unshift(a);
		return g || G
	};
	U = function(a) {
		var b, c, e, f;
		c = e = 0;
		for (f = d.length; 0 <= f ? e < f : e > f; c = 0 <= f ? ++e : --e)
			if (b = d[c], b === a) {
				N(d.splice(c, 1));
				break
			}
	};
	N = function(a) {
		if (a) return a.count = null, a.keyup_fired = null
	};
	c = function(a, b) {
		var c, d, e, f;
		E.push(a);
		d = g();
		if (d.length) {
			e = 0;
			for (f = d.length; e < f; e++) c = d[e], J(b, c.prevent_default);
			O && clearTimeout(O); - 1 < keypress.sequence_delay && (O = setTimeout(function() {
				return E = []
			}, keypress.sequence_delay))
		} else E =
			[]
	};
	g = function() {
		var a, b, c, d, e, f, g, k, h, l, m;
		d = [];
		f = 0;
		for (h = t.length; f < h; f++)
			for (a = t[f], b = g = 1, l = E.length; 1 <= l ? g <= l : g >= l; b = 1 <= l ? ++g : --g)
				if ((e = E.slice(-b), a.is_sequence) && (!(0 > p.call(a.keys, "shift")) || (e = y(e, function(a) {
					return "shift" !== a
				}), e.length))) {
					b = k = 0;
					for (m = e.length; 0 <= m ? k < m : k > m; b = 0 <= m ? ++k : --k)
						if (a.keys[b] === e[b]) c = !0;
						else {
							c = !1;
							break
						}
					c && d.push(a)
				}
		return d
	};
	C = function(a) {
		var b, c, d, e, f, g, k, h, l, m, n;
		g = 0;
		for (l = t.length; g < l; g++)
			if (b = t[g], b.is_sequence) {
				c = k = 1;
				for (m = E.length; 1 <= m ? k <= m : k >= m; c = 1 <= m ? ++k : --k)
					if (f =
						y(E, function(a) {
							return 0 <= p.call(b.keys, "shift") ? !0 : "shift" !== a
						}).slice(-c), b.keys.length === f.length)
						for (c = h = 0, n = f.length; 0 <= n ? h < n : h > n; c = 0 <= n ? ++h : --h)
							if (e = f[c], !(0 > p.call(b.keys, "shift") && "shift" === e || "shift" === a && 0 > p.call(b.keys, "shift")))
								if (b.keys[c] === e) d = !0;
								else {
									d = !1;
									break
								}
				if (d) return b
			}
		return !1
	};
	n = function(a, b) {
		var c;
		if (!b.shiftKey) return !1;
		c = s[a];
		return null != c ? c : !1
	};
	x = function(a, b, c) {
		if (0 > p.call(a.keys, b)) return !1;
		J(c, a && a.prevent_default);
		if (0 <= p.call(k, b) && !f(a)) return !1;
		b = e(a, b);
		a.keyup_fired = !1;
		a.is_counting && "function" === typeof a.on_keydown && (a.count += 1);
		if (b) return r("keydown", a, c)
	};
	Y = function(a, b) {
		var d, e, f, g;
		(e = n(a, b)) && (a = e);
		c(a, b);
		(e = C(a)) && r("keydown", e, b);
		for (d in I) e = I[d], b[e] && (d === a || 0 <= p.call(k, d) || k.push(d));
		for (d in I)
			if (e = I[d], d !== a && 0 <= p.call(k, d) && !b[e])
				for (e = f = 0, g = k.length; 0 <= g ? f < g : f > g; e = 0 <= g ? ++f : --f) k[e] === d && k.splice(e, 1);
		e = D(a);
		f = 0;
		for (g = e.length; f < g; f++) d = e[f], x(d, a, b);
		e = B(a);
		if (e.length)
			for (f = 0, g = e.length; f < g; f++) d = e[f], J(b, d.prevent_default);
		0 > p.call(k, a) && k.push(a)
	};
	W = function(a, b, c) {
		var d, e;
		e = Q(a);
		a.keyup_fired || (d = k.slice(), d.push(c), a.is_solitary && !A(d, a.keys)) || (r("keyup", a, b), a.is_counting && "function" === typeof a.on_keyup && "function" !== typeof a.on_keydown && (a.count += 1));
		e || (r("release", a, b), U(a))
	};
	l = function(a, b) {
		var c, e, f, g, h, l;
		e = a;
		(f = n(a, b)) && (a = f);
		f = s[e];
		b.shiftKey ? f && 0 <= p.call(k, f) || (a = e) : e && 0 <= p.call(k, e) || (a = f);
		(g = C(a)) && r("keyup", g, b);
		if (0 > p.call(k, a)) return !1;
		g = h = 0;
		for (l = k.length; 0 <= l ? h < l : h > l; g = 0 <= l ? ++h : --h)
			if ((c = k[g]) === a || c === f || c === e) {
				k.splice(g,
					1);
				break
			}
		e = d.length;
		f = [];
		g = 0;
		for (h = d.length; g < h; g++) c = d[g], 0 <= p.call(c.keys, a) && f.push(c);
		g = 0;
		for (h = f.length; g < h; g++) c = f[g], W(c, b, a);
		if (1 < e)
			for (e = 0, g = d.length; e < g; e++) c = d[e], void 0 === c || 0 <= p.call(f, c) || Q(c) || U(c)
	};
	M = function(a, b) {
		var c;
		if (L) k.length && (k = []);
		else if (b || k.length)
			if (c = w(a.keyCode)) return b ? Y(c, a) : l(c, a)
	};
	V = function(a) {
		var b, c, d, e;
		e = [];
		b = c = 0;
		for (d = t.length; 0 <= d ? c < d : c > d; b = 0 <= d ? ++c : --c)
			if (a === t[b]) {
				t.splice(b, 1);
				break
			} else e.push(void 0);
		return e
	};
	aa = function(a) {
		var b, c, d, e, f;
		a.keys.length ||
			H("You're trying to bind a combo with no keys.");
		c = e = 0;
		for (f = a.keys.length; 0 <= f ? e < f : e > f; c = 0 <= f ? ++e : --e) d = a.keys[c], (b = F[d]) && (d = a.keys[c] = b), "meta" === d && a.keys.splice(c, 1, R), "cmd" === d && H('Warning: use the "meta" key rather than "cmd" for Windows compatibility');
		f = a.keys;
		b = 0;
		for (e = f.length; b < e; b++)
			if (d = f[b], 0 > p.call(P, d)) return H('Do not recognize the key "' + d + '"'), !1;
		if (0 <= p.call(a.keys, "meta") || 0 <= p.call(a.keys, "cmd")) {
			b = a.keys.slice();
			e = 0;
			for (f = S.length; e < f; e++) d = S[e], -1 < (c = b.indexOf(d)) && b.splice(c,
				1);
			1 < b.length && H("META and CMD key combos cannot have more than 1 non-modifier keys", a, b)
		}
		return !0
	};
	h = function(a) {
		var b;
		if (0 <= p.call(k, "cmd") && "cmd" !== (b = w(a.keyCode)) && "shift" !== b && "alt" !== b && "caps" !== b && "tab" !== b) return M(a, !1)
	};
	window.keypress = {};
	keypress.force_event_defaults = !1;
	keypress.suppress_event_defaults = !1;
	keypress.sequence_delay = 800;
	keypress.get_registered_combos = function() {
		return t
	};
	keypress.reset = function() {
		t = []
	};
	keypress.combo = function(a, b, c) {
		null == c && (c = !1);
		return keypress.register_combo({
			keys: a,
			on_keydown: b,
			prevent_default: c
		})
	};
	keypress.counting_combo = function(a, b, c) {
		null == c && (c = !1);
		return keypress.register_combo({
			keys: a,
			is_counting: !0,
			is_ordered: !0,
			on_keydown: b,
			prevent_default: c
		})
	};
	keypress.sequence_combo = function(a, b, c) {
		null == c && (c = !1);
		return keypress.register_combo({
			keys: a,
			on_keydown: b,
			is_sequence: !0,
			prevent_default: c
		})
	};
	keypress.register_combo = function(a) {
		var b, c;
		"string" === typeof a.keys && (a.keys = a.keys.split(" "));
		for (b in u) ba.call(u, b) && (c = u[b], null == a[b] && (a[b] = c));
		if (aa(a)) return t.push(a), !0
	};
	keypress.register_many = function(a) {
		var b, c, d, e;
		e = [];
		c = 0;
		for (d = a.length; c < d; c++) b = a[c], e.push(keypress.register_combo(b));
		return e
	};
	keypress.unregister_combo = function(a) {
		var b, c, d;
		if (!a) return !1;
		if (a.keys) return V(a);
		d = [];
		b = 0;
		for (c = t.length; b < c; b++)(a = t[b]) && (A(keys, a.keys) ? d.push(V(a)) : d.push(void 0));
		return d
	};
	keypress.unregister_many = function(a) {
		var b, c, d, e;
		e = [];
		c = 0;
		for (d = a.length; c < d; c++) b = a[c], e.push(keypress.unregister_combo(b));
		return e
	};
	keypress.listen = function() {
		return L = !1
	};
	keypress.stop_listening =
		function() {
			return L = !0
	};
	w = function(a) {
		return m[a]
	};
	I = {
		cmd: "metaKey",
		ctrl: "ctrlKey",
		shift: "shiftKey",
		alt: "altKey"
	};
	F = {
		escape: "esc",
		control: "ctrl",
		command: "cmd",
		"break": "pause",
		windows: "cmd",
		option: "alt",
		caps_lock: "caps",
		apostrophe: "'",
		semicolon: ";",
		tilde: "~",
		accent: "`",
		scroll_lock: "scroll",
		num_lock: "num"
	};
	s = {
		"/": "?",
		".": ">",
		",": "<",
		"'": '"',
		";": ":",
		"[": "{",
		"]": "}",
		"\\": "|",
		"`": "~",
		"=": "+",
		"-": "_",
		1: "!",
		2: "@",
		3: "#",
		4: "$",
		5: "%",
		6: "^",
		7: "&",
		8: "*",
		9: "(",
		0: ")"
	};
	m = {
		0: "\\",
		8: "backspace",
		9: "tab",
		12: "num",
		13: "enter",
		16: "shift",
		17: "ctrl",
		18: "alt",
		19: "pause",
		20: "caps",
		27: "escape",
		32: "space",
		33: "pageup",
		34: "pagedown",
		35: "end",
		36: "home",
		37: "left",
		38: "up",
		39: "right",
		40: "down",
		44: "print",
		45: "insert",
		46: "delete",
		48: "0",
		49: "1",
		50: "2",
		51: "3",
		52: "4",
		53: "5",
		54: "6",
		55: "7",
		56: "8",
		57: "9",
		65: "a",
		66: "b",
		67: "c",
		68: "d",
		69: "e",
		70: "f",
		71: "g",
		72: "h",
		73: "i",
		74: "j",
		75: "k",
		76: "l",
		77: "m",
		78: "n",
		79: "o",
		80: "p",
		81: "q",
		82: "r",
		83: "s",
		84: "t",
		85: "u",
		86: "v",
		87: "w",
		88: "x",
		89: "y",
		90: "z",
		91: "cmd",
		92: "cmd",
		93: "cmd",
		96: "num_0",
		97: "num_1",
		98: "num_2",
		99: "num_3",
		100: "num_4",
		101: "num_5",
		102: "num_6",
		103: "num_7",
		104: "num_8",
		105: "num_9",
		106: "num_multiply",
		107: "num_add",
		108: "num_enter",
		109: "num_subtract",
		110: "num_decimal",
		111: "num_divide",
		124: "print",
		144: "num",
		145: "scroll",
		186: ";",
		187: "=",
		188: ",",
		189: "-",
		190: ".",
		191: "/",
		192: "`",
		219: "[",
		220: "\\",
		221: "]",
		222: "'",
		223: "`",
		224: "cmd",
		57392: "ctrl",
		63289: "num"
	};
	for (b in m) a = m[b], P.push(a);
	for (b in s) a = s[b], P.push(a); - 1 !== navigator.userAgent.indexOf("Mac OS X") && (R = "cmd"); - 1 !== navigator.userAgent.indexOf("Opera") &&
		(m["17"] = "cmd");
	T = function(a) {
		return (document.attachEvent ? "complete" === document.readyState : "loading" !== document.readyState) ? a() : setTimeout(function() {
			return T(a)
		}, 9)
	};
	T(function() {
		var a;
		a = function(a, b, c) {
			if (a.addEventListener) return a.addEventListener(b, c);
			if (a.attachEvent) return a.attachEvent("on" + b, c)
		};
		a(document.body, "keydown", function(a) {
			a = a || window.event;
			M(a, !0);
			return h(a)
		});
		a(document.body, "keyup", function(a) {
			a = a || window.event;
			return M(a, !1)
		});
		return a(window, "blur", function() {
			var a, b, c;
			b =
				0;
			for (c = k.length; b < c; b++) a = k[b], l(a, {});
			k = [];
			return []
		})
	})
}).call(this);