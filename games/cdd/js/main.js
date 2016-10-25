var game = new Phaser.Game(320, 480, Phaser.AUTO, "game_div"),
	highScore = localStorage["avoiderHighScore"]?localStorage["avoiderHighScore"]:0,
	FONTFAMILY = "'Arial','Microsoft YaHei','黑体','宋体','sans-serif'";
var preloader_state = {
	preload: function() {
		this["game"]["stage"]["scaleMode"] = Phaser["StageScaleMode"]["SHOW_ALL"];
		this["game"]["stage"]["scale"]["minWidth"] = 160;
		this["game"]["stage"]["scale"]["minHeight"] = 240;
		// a_why
		this["game"]["stage"]["scale"]["maxWidth"] = 960;
		this["game"]["stage"]["scale"]["maxHeight"] = 1440;
		this["game"]["stage"]["scale"]["pageAlignHorizontally"] = true;
		this["game"]["stage"]["scale"]["pageAlignVertically"] = true;
		this["game"]["stage"]["scale"]["setScreenSize"](true);
		this["game"]["stage"]["backgroundColor"] = "#0095de";
		this["game"]["load"]["image"]("preloaderbar", "assets/_loading.png");
		this["game"]["load"]["image"]("splash", "assets/_splash.png");
	},
	create: function() {
		this["game"]["state"]["start"]("loading");
	},
	update: function() {}
};
var loading_state = {
	preload: function() {
		this["game"]["stage"]["backgroundColor"] = "#0095de";
		this["game"]["add"]["sprite"](0, 0, "splash");
		this["preloadBar"] = this["add"]["sprite"](75, 230, "preloaderbar");
		this["load"]["setPreloadSprite"](this["preloadBar"]);
		this["game"]["load"]["image"]("collect", "assets/_collect.png");
		this["game"]["load"]["image"]("avoid", "assets/_avoid.png");
		this["game"]["load"]["image"]("move", "assets/_move.png");
		this["game"]["load"]["image"]("gameover", "assets/_gameover.png");
		this["game"]["load"]["image"]("playagain", "assets/_playagain.png");
		this["game"]["load"]["image"]("playsharetips", "assets/_share.png");
		this["game"]["load"]["image"]("getmoregame", "assets/_moregame.png");
		this["game"]["load"]["image"]("doudouin", "assets/_doudouin.png");
		this["game"]["load"]["image"]("logo", "assets/_logo.png");
		this["game"]["load"]["image"]("help", "assets/_text.png");
		this["game"]["load"]["image"]("play", "assets/_play.png");
		this["game"]["load"]["image"]("collect2", "assets/_collect2.png");
		this["game"]["load"]["image"]("scoreabatter", "assets/_scoreabattre.png");
	},
	create: function() {
		this["game"]["state"]["start"]("start");
	},
	update: function() {}
};
var start_state = {
	preload: function() {
		this["game"]["stage"]["backgroundColor"] = "#0b70b7";
	},
	create: function() {
		this["logo"] = this["game"]["add"]["sprite"](35, 15, "logo");
		this["help"] = this["game"]["add"]["sprite"](30, 100, "help");
		this["play"] = this["game"]["add"]["sprite"](80, 380, "play");
		this["game"]["input"]["onTap"]["add"](this["tapped"], this);
	},
	update: function() {},
	tapped: function() {
		game["state"]["start"]("main");
	}
};
var main_state = {
	copy: "COPYRIGHT (c)2014 James Kayes",
	score: 0,
	collected: 0,
	lastP: {x:-1, y:-1},
	canMove: false,
	textStyle: {
		font: "bold 32px "+FONTFAMILY,
		fill: "white"
	},
	preload: function() {
		this["score"] = 0;
		this["collected"] = 0;
		this["collect2"] = null;
		this["collect2"] = this["game"]["add"]["sprite"](Math["random"]() * 270, Math["random"]() * 240, "collect2");
		this["collect2"]["kill"]();
	},
	create: function() {
		this["balls"] = this["game"]["add"]["group"]();
		this["dragger"] = this["game"]["add"]["sprite"](138, 335, "move");
		this["diaY"] = this["game"]["add"]["sprite"](140, 200, "collect");
		this["ball1"] = this["balls"]["create"](Math["random"]() * 290, Math["random"]() * 450, "avoid");
		// this["dragger"]["inputEnabled"] = true;
		// this["dragger"]["input"]["enableDrag"](true);
		var that = this;
		this.resetTouchPosition();
		// if (this["game"]["input"]["touch"]["touchStartCallback"] == null) {
			this["game"]["input"]["touch"]["touchStartCallback"] = function() {
				that.resetTouchPosition();
				that.canMove = true;
			}
			this["game"]["input"]["touch"]["touchMoveCallback"] = function(e) {
				if (that.canMove) {
					if (!(that.lastP.x == -1 && that.lastP.y == -1)) {
						that["dragger"]["x"] += (e.touches[0].clientX-that.lastP.x);
						that["dragger"]["y"] += (e.touches[0].clientY-that.lastP.y);
					}
					that.lastP.x = e.touches[0].clientX;
					that.lastP.y = e.touches[0].clientY;
				}
			}
			this["game"]["input"]["touch"]["touchEndCallback"] = function() {
				that.resetTouchPosition();
			}
		// }
		// this["game"]["input"]["onDown"]["add"](this["downed"], this);
		// this["game"]["input"]["onUp"]["add"](this["resetTouchPosition"], this);
		// setTimeout(function() {
		// 	that["game"]["input"]["moveCallback"] = function(e) {
		// 		that["moveDragger"].call(that, e);
		// 	}
		// }, 10);


		this["ball1"]["body"]["velocity"]["setTo"](60, 60);
		this["ball1"]["body"]["collideWorldBounds"] = true;
		this["ball1"]["body"]["bounce"]["setTo"](1, 1);
		this["s"] = this["game"]["add"]["text"](0, 0, "分数: " + this["score"], this["textStyle"]);
		this["b"] = this["game"]["add"]["text"](0, 35, "记录: " + highScore, {
			font: "bold 24px "+FONTFAMILY,
			fill: "white"
		});
	},
	resetTouchPosition: function() {
		this.lastP.x = -1;
		this.lastP.y = -1;
		this.canMove = false;
	},
	moveDragger: function(e) {
		if (this.canMove) {
			if (!(this.lastP.x == -1 && this.lastP.y == -1)) {
				this["dragger"]["x"] += (e.x-this.lastP.x);
				this["dragger"]["y"] += (e.y-this.lastP.y);
			}
			this.lastP.x = e.x;
			this.lastP.y = e.y;
		}
	},
	downed: function(e) {
		this.lastP.x = -1;
		this.lastP.y = -1;
		this.canMove = true;
	},
	uped: function(e) {
		this.lastP.x = -1;
		this.lastP.y = -1;
		this.canMove = false;
	},
	update: function() {
		this["game"]["physics"]["collide"](this["dragger"], this["diaY"], this["collisionHandler"], null, this);
		this["game"]["physics"]["collide"](this["dragger"], this["balls"], this["ballcollisionHandler"], null, this);
		this["game"]["physics"]["collide"](this["dragger"], this["collect2"], this["collect2collision"], null, this);
		this["game"]["physics"]["collide"](this["diaY"], this["collect2"], this["collect2respawn"], null, this);
		if ((this["dragger"]["body"]["x"] > 289) || (this["dragger"]["body"]["x"] < 0) || (this["dragger"]["body"]["y"] > 449) || (this["dragger"]["body"]["y"] < 0)) {
			// this.resetTouchPosition();
			game["state"]["start"]("lose");
		};
	},
	collisionHandler: function() {
		if ((this["dragger"]["body"]["y"] > 240)) {
			this["diaY"]["reset"](Math["random"]() * 270, Math["random"]() * 240);
			if ((this["collected"] > 10) && (Math["random"]() > 0.56) && (!this["collect2"]["exists"])) {
				this["collect2"]["reset"](Math["random"]() * 270, Math["random"]() * 240);
				this["collected"]--;
				this["collect2"]["lifespan"] = 4000;
			};
			this["ball1"] = this["balls"]["create"](Math["random"]() * 270, Math["random"]() * 240, "avoid");
			this["ball1"]["body"]["velocity"]["setTo"](-60, -60);
			this["ball1"]["body"]["collideWorldBounds"] = true;
			this["ball1"]["body"]["bounce"]["setTo"](1, 1);
			this["collected"]++;
			this["score"] += 5;
			this["s"]["destroy"]();
			this["s"] = this["game"]["add"]["text"](0, 0, "分数: " + this["score"], this["textStyle"]);
		};
		if ((this["dragger"]["body"]["y"] < 240)) {
			this["diaY"]["reset"](Math["random"]() * 270, (Math["random"]() * 190) + 240);
			if ((this["collected"] > 10) && (Math["random"]() > 0.56) && (!this["collect2"]["exists"])) {
				this["collect2"]["reset"](Math["random"]() * 270, (Math["random"]() * 190) + 240);
				this["collected"]--;
				this["collect2"]["lifespan"] = 4000;
			};
			this["ball1"] = this["balls"]["create"](Math["random"]() * 270, (Math["random"]() * 190) + 240, "avoid");
			this["ball1"]["body"]["velocity"]["setTo"](60, 60);
			this["ball1"]["body"]["collideWorldBounds"] = true;
			this["ball1"]["body"]["bounce"]["setTo"](1, 1);
			this["collected"]++;
			this["score"] += 5;
			this["s"]["destroy"]();
			this["s"] = this["game"]["add"]["text"](0, 0, "分数: " + this["score"], this["textStyle"]);
		};
	},
	ballcollisionHandler: function() {
		this["collected"] = 0;
		// this.resetTouchPosition();
		game["state"]["start"]("lose");
	},
	collect2collision: function() {
		this["collect2"]["kill"]();
		this["ball1"]["destroy"]();
		this["score"] += 7;
		this["s"]["destroy"]();
		this["s"] = this["game"]["add"]["text"](0, 0, "分数: " + this["score"], this["textStyle"]);
	},
	collect2respawn: function() {
		if ((this["dragger"]["body"]["y"] > 240)) {
			this["collect2"]["reset"](Math["random"]() * 270, Math["random"]() * 240);
		};
		if ((this["dragger"]["body"]["y"] < 240)) {
			this["collect2"]["reset"](Math["random"]() * 270, (Math["random"]() * 190) + 240);
		};
	}
};
var lose_state = {
	preload: function() {
		this["game"]["stage"]["backgroundColor"] = "#0b70b7";
		
	},
	create: function() {
		// this["game"]["input"]["onTap"]["add"](this["tapped"], this);
		// this["game"]["input"]["moveCallback"] = null;
		this["game"]["input"]["touch"]["touchStartCallback"] = null;
		this["game"]["input"]["touch"]["touchMoveCallback"] = null;
		this["game"]["input"]["touch"]["touchEndCallback"] = null;

		this["gameover"] = this["game"]["add"]["sprite"](25, 50, "gameover");
		this["scoreText"] = this["game"]["add"]["text"](160-20, 140, "分数", {
			font: "bold 20px "+FONTFAMILY,
			fill: "white"
		});
		this["scoreText"] = this["game"]["add"]["text"](160-44/4*(main_state["score"].toString().length), 180, "" + main_state["score"], {
			font: "bold 44px "+FONTFAMILY,
			fill: "white"
		});
		highScore = main_state["score"] > highScore ? main_state["score"] : highScore;
		try{
			localStorage["avoiderHighScore"] = main_state["score"] > highScore ? main_state["score"] : highScore;
		}catch(e){
			
		}
		this["highScoreText"] = this["game"]["add"]["text"](100, 250, "历史最佳: " + highScore, {
			font: "bold 20px "+FONTFAMILY,
			fill: "white"
		});

		this["playagain"] = this["game"]["add"]["button"](4, 300, "playagain", function() {
			// game["state"]["start"]("start");
			window.location.reload();
		});

		this["playsharetips"] = this["game"]["add"]["button"](162, 300, "playsharetips", function() {
			dp_share();
		});

		this["getmoregame"] = this["game"]["add"]["button"](110, 400, "getmoregame", function() {
			clickMore();
		});

		this["doudouin"] = this["game"]["add"]["sprite"](0, 453, "doudouin");

		var shareScore = main_state["score"];
		dp_submitScore(shareScore);
		
	},
	update: function() {},
	tapped: function(e) {
	}
};
game["state"]["add"]("loading", loading_state);
game["state"]["add"]("start", start_state);
game["state"]["add"]("main", main_state);
game["state"]["add"]("lose", lose_state);
game["state"]["add"]("preload", preloader_state);
game["state"]["start"]("preload");
