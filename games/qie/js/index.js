
var Main = {};
btGame.makePublisher(Main);
// 舞台宽高
Main.width = 720;
Main.height = 950;
// 地平线
Main.floorLine = 820;
// 路标间距
Main.guideDistance = Main.width;

Main.debug = false;
// 角度
Main.minAngle = 5;
Main.maxAngle = 45;
Main.randomAngle = 2; // 上下偏移角度
// 掉落时间
Main.fallingTime = 1100;
// 速度
Main.speed = 300;
// 舞台可视距离
Main.visibleDistance = 250;
// 最高份
Main.maxScore = (window.localStorage && +localStorage["penguinMaxScore"]) || 0;
// 帧频
Main.fps = 40;

var Resource;
;~function(res){
	
	// 资源加载
	res.load = function(){
		if(res.queue != null) return;
		res.queue = new createjs.LoadQueue(false);
		
		res.queue.addEventListener("progress",function(e) {
			//console.log(e);// 进度：e.loaded
			btGame.gameLoading(e.loaded);
		});
		res.queue.addEventListener("complete",function(e) {
			Main.log("完成", e);
		});
		res.queue.addEventListener("error",function(e) {
			btGame.gameLoading(0.1, e.text);
		});
		
		res.queue.loadFile("img/start.png");
		res.queue.loadFile("img/morebtn.png");
		res.queue.loadFile("img/startbtn.png");
		
		res.queue.loadFile("img/penguin.png");
		res.queue.loadFile("img/bear.png");
		res.queue.loadFile("img/hill.png");
		res.queue.loadFile("img/guide.png");
		res.queue.loadFile("img/background1.png");
		res.queue.loadFile("img/background2.png");
		res.queue.loadFile("img/flyend.png");
		res.queue.loadFile("img/traces.png");
		res.queue.loadFile("img/longtraces.png");
		res.queue.loadFile("img/score.png");
		res.queue.loadFile("img/fly.png");
		
		res.queue.loadFile("img/end.png");
		res.queue.loadFile("img/againbtn.png");
		res.queue.loadFile("img/notifybtn.png");
	}
	
	res.get = function(path){
		return res.queue.getResult(path);
	}
	
}(Resource || (Resource = {}));

Main.log = function(){
	Main.debug && console.log(arguments);
}

Main.shareTextMap = {
	"0": {
		tip: "没打中,手滑!再来一次~"
		,title: "玩到了一个坑爹的游戏，不想砸手机就千万别来玩！"
	}
	,"1": {
		tip: "没吃饱饭吗,用力用力!!"
		,title: "我把企鹅打出了${m}米，击败了${n}%人，来挑战我吧！"
	}
	,"2": {
		tip: "死鬼!想把我打去北极吗!"
		,title: "我把企鹅打出了${m}米，击败了${n}%人，来挑战我吧！"
	}
	,"3": {
		tip: "讨厌啦~怎么那么棒!"
		,title: "我把企鹅打出了${m}米，击败了${n}%人，来挑战我吧！"
	}
};
Main.getShareText = function(distance){
	var i = 0, n = 0;
	if(distance > 0){
		i = 1;
		n = Math.floor(Math.random() * 11 + 70);
	}
	if(distance > 500){
		i = 2;
		n = Math.floor(Math.random() * 9 + 81);
	}
	if(distance > 900){
		i = 3;
		n = Math.floor(Math.random() * 9 + 90);
	}
	var share = Main.shareTextMap[i];
	btGame.setShare({
	   title:share.title.replace("${m}", distance).replace("${n}", n)
	});
	return share;
};


// 游戏开始界面
Main.startGame = function(){
	var container = new createjs.Container();
	container.addChild(new createjs.Bitmap(Resource.get("img/start.png")));
	
	
	// 开始游戏
	var beginGame = new createjs.Bitmap(Resource.get("img/startbtn.png"));
	beginGame.setTransform(34, 580);
	beginGame.cursor = "pointer";
	beginGame.addEventListener("click", function(){
		createjs.Tween.get(container, {loop: false})
					.to({alpha: 0}, 300)
					.call(function(){
						Main.initGame();
					});
	});
	container.addChild(beginGame);
	
	// 更多游戏
	var moreGame = new createjs.Bitmap(Resource.get("img/morebtn.png"));
	moreGame.setTransform(377, 580);
	moreGame.cursor = "pointer";
	moreGame.addEventListener("click", function(){
		clickMore();
	});
	container.addChild(moreGame);
	
	Main.stage.addChild(container);
	
}

// 游戏结束界面
Main.endGame = function(distance){
	if(!Main.endContainer){
		Main.endContainer = new createjs.Container();
	}else{
		Main.endContainer.removeAllEventListeners();
		Main.endContainer.removeAllChildren();
	}
	var container = Main.endContainer;
	container.alpha = 0;
	
	container.addChild(new createjs.Bitmap(Resource.get("img/end.png")));
	
	// 本次成绩
	var text1 = new createjs.Text(
		"本次距离: "+distance+" M", "bold 28pt Tahoma Helvetica Arial sans-serif", "#ffffff"
	);
	text1.textAlign = "center";
	text1.x = Main.width / 2;
	text1.y = 174;
	container.addChild(text1);
	
	var text2 = text1.clone(true);
	text2.text = "最远距离: " + Main.maxScore + " M";
	text2.y = 248;
	container.addChild(text2);
	
	var share = Main.getShareText(distance);
	var text3 = text1.clone(true);
	text3.text = share["tip"];
	text3.font = "bold 24pt Tahoma Helvetica Arial sans-serif";
	text3.textAlign = "center";
	text3.y = 394;
	container.addChild(text3);
	
	// 再来一次
	var again = new createjs.Bitmap(Resource.get("img/againbtn.png"));
	again.setTransform(35, 623);
	again.addEventListener("click", function(){
		createjs.Tween.get(container, {loop: false})
			.to({y: -Main.height, alpha: 0}, 500, createjs.Ease.quintInOut)
			.call(function(){
				container.alpha = 1;
				container.removeAllEventListeners();
				container.removeAllChildren();
				Main.reset.replay();
			});
	});
	container.addChild(again);
	
	// 通知好友
	var notify = new createjs.Bitmap(Resource.get("img/notifybtn.png"));
	notify.setTransform(376, 623);
	notify.addEventListener("click", function(){
		dp_share();
	});
	container.addChild(notify);
	
	// 更多游戏
	var more = new createjs.Shape();
	more.graphics.beginFill("#ffffff").drawRect(0, 0, Main.width, 60);
	more.alpha = 0.1;
	more.y = 870;
	more.addEventListener("click", function(){
		clickMore();
	});
	container.addChild(more);
	
	Main.stage.addChild(container);
	container.y = -Main.height;
	createjs.Tween.get(container, {loop: false})
		.to({y:0, alpha:1}, 500, createjs.Ease.quintInOut);
		dp_submitScore(distance);
}

Main.initStage = function(){
	// 舞台已经有了，就不用再初始化了
	if(!this.stage){
		Main.stage = new createjs.Stage("canvas");
	}
	// Main.stage.enableMouseOver();
	
	Main.stage.removeAllEventListeners();
	Main.stage.removeAllChildren();
	
	// 清空舞台
	Main.stage.removeAllChildren();
	Main.stage.removeAllEventListeners();
	
	// 舞台大小
	Main.stage.width = canvas.width = Main.width;
	Main.stage.height = canvas.height = Main.height;
	
	createjs.Ticker.addEventListener("tick", this.stage);
	
	// 先加载资源
	Resource.load();
	Resource.queue.addEventListener("complete", function(){
		// Main.startGame();
		Main.startGame();
	});

};

Main.initGame = function(){
	Main.initGame = function(){}; // 防止重复初始化
	Main.stage.enableMouseOver(true);
	Main.log("开始初始化游戏");
	Main.log("初始化：游戏背景");
	var img = new createjs.Container();
	img.setBounds(0, 0, Main.width * 2, Main.height);
	var b1 = new createjs.Bitmap(Resource.get("img/background2.png"));
	img.addChild(b1);
	b1 = new createjs.Bitmap(Resource.get("img/background2.png"));
	b1.x = Main.width;
	img.addChild(b1);
	b1 = new createjs.Bitmap(Resource.get("img/background1.png"));
	b1.x = Main.width * 2;
	img.addChild(b1);
	
	this.background = img;
	this.stage.addChild(img);
	this.reset.background(img);
	
	
	
	
	Main.log("初始化：北极熊");
	var bearImg = new createjs.Bitmap(Resource.get("img/bear.png"));
	var bearBound = bearImg.getBounds();
	var bearSS = new createjs.SpriteSheet({
		"framerate": 4
		,"animations":{
			 "normal": [0, 0]
			,"prepare": [1, 2, false, 1.5]
			,"shoot": {
				frames: [1, 3, 4, 5],
				next: false,
				speed: 3
			}
			,"shootNull":{
				frames: [1, 3, 4, 0],
				next: false,
				speed: 2
			}
		},
		"images": [Resource.get("img/bear.png")],
		"frames":{
			"height": 360,
			"width":300,
			"regX": 0,
			"regY": 0,
			"count": 6
		}
	});
	var bear = new createjs.Sprite(bearSS);
	this.bear = bear;
	this.stage.addChild(bear);
	this.reset.bear();
	
	this.knockPoint = Math.ceil(bear.y + bearBound.height * 0.1);
	
	if(Main.debug){
		Main.log("计算击打点:" + this.knockPoint);
		var shape = new createjs.Shape();
		shape.graphics.beginFill("#ff0000").drawRect(0, 0, 50, 10);
		shape.x = this.width - 50;
		shape.y = this.knockPoint;
		this.stage.addChild(shape);
		shape = null;
		
		// 地平线
		var floor = new createjs.Shape();
		floor.graphics.beginFill("#ffff00").drawRect(0, 0, Main.width, 10);
		floor.x = 0;
		floor.y = this.floorLine;
		this.stage.addChild(floor);
		floor = null;
	}
	
	// 回收熊的内存
	bearImg = bearBound = bearSS = bear = null;
	
	
	
	Main.log("初始化: 分数");
	var score = new createjs.Container();
	score.setBounds(0, 0, 238, 56);
	
	if(this.debug){
		var shape = new createjs.Shape();
		shape.graphics.beginFill("#fefefe").drawRect(
			0, 0, score.getBounds().width, score.getBounds().height
		);
		score.addChild(shape);
	}
	
	var top = new createjs.Text("TOP:", "36px Arial Black", "#336600");
	score.addChild(top);
	var topWidth = top.getMeasuredWidth();
	var text = new createjs.Text("", "36px Arial Black", "#FF0000");
	text.x = topWidth;
	
	score.addChild(text);
	this.scoreTop = top;
	this.scoreText = text;
	this.score = score;
	this.stage.addChild(score);
	this.reset.score();
	
	score = top = text = null;
	
	
	
	// 路标
	Main.log("初始化:路标");
	var guideBackground = new createjs.Bitmap(Resource.get("img/guide.png"));
	var guideBackgroundHeight = guideBackground.getBounds().height;
	var guideBackgroundWidth = guideBackground.getBounds().width;
	
	var guideIcon = new createjs.Container();
	guideIcon.setBounds(guideBackground.getBounds());
	guideIcon.addChild(guideBackground);
	guideIcon.y = this.floorLine - guideBackgroundHeight - 20;
	
	var guideText = new createjs.Text("", "28px Arial Black", "#2B5580");
	guideText.y = 40;
	guideIcon.addChild(guideText);
	
	this.guideWidth = guideBackgroundWidth;
	this.guideHeight = guideBackgroundHeight;
	this.guideText = guideText;
	this.guide = guideIcon;
	this.stage.addChild(guideIcon);
	this.reset.guide("100M");
	
	
	
	Main.log("初始化：企鹅");
	var penguinImg = new createjs.Bitmap(Resource.get("img/penguin.png"));
	var penguinBound = penguinImg.getBounds();
	var penguinSS = new createjs.SpriteSheet({
		"framerate": 5
		,"animations": {
			"normal": {
				frames:[0, 1, 0, 1, 2]
				,next: false
			}
			,"nod" : [2, 2, "normal"]
			,"jump" : {
				frames: [2, 3, 4, 5]
				,speed: 2
				,next: false
			}
		}
		,"images" : [Resource.get("img/penguin.png")]
		,"frames" : {
			width: 180,
			height: 170,
			count: 6
		}
	});
	var penguin = new createjs.Sprite(penguinSS);
	this.penguin = penguin;
	this.penguinHeight = penguinBound.height;
	this.stage.addChild(penguin);
	this.reset.penguin();
	// 回收内存吧，少年！
	img = bound = null;		
	
	
	Main.log("初始化:游戏结束的企鹅");
	var endData = {
		images: [Resource.get("img/flyend.png")],
		frames: {width:180, height:170, count: 2},
		animations: {slide:[0], down:[1]}
	};
	Main.gameOverPenguinSS = new createjs.SpriteSheet(endData);
	endData = null;
	
	
	
	// 结束的分数牌
	Main.log("初始化:游戏结束的分数牌");
	Main.gameOverScore = new createjs.Container();
	
	
	Main.gameOverScoreBg = new createjs.Bitmap(Resource.get("img/score.png"));
	Main.gameOverScore.addChild(Main.gameOverScoreBg);
	Main.gameOverScore.regY = Main.gameOverScoreBg.getBounds().height;
	Main.gameOverScoreText = new createjs.Text("0", "26px Arial Black", "#336600");
	Main.gameOverScoreText.x = 10;
	Main.gameOverScoreText.y = 33;
	Main.gameOverScore.addChild(Main.gameOverScoreText);
	
	Main.stage.addChild(Main.gameOverScore);
	Main.gameOverScore.x = 0;
	Main.gameOverScore.y = 0;
	Main.gameOverScore.cursor = "pointer";
	Main.reset.gameOverScore(1);
	
	// 事件绑定，htc 坑爹的速度
	setTimeout(function(){
		Main.initEvent();
	}, 200);

};

Main.gameOverSocreHd = {
	over: function(event){
		console.log(this.hover);
	}
	,out: function(event){
		console.log(this.hover);
	}
}

// 重设状态
Main.penguinOffsetX = 260;
Main.reset = {
	replay: function(){
		this.guide("100M");
		this.score();
		this.penguin();
		this.bear();
		this.background();
		this.endPenguin(false);
		this.gameOverScore("0");
		
		// 游戏数据
		Main.penguinAnimation = null;
		Main.isPlaying = false; // 正在进行游戏
		Main.isQuiver = false;
		
		Main.guideMoveLength = 0;
		Main.guideMoveIndex = 1;
		
		Main.fire("replay");
	}
	,guide: function(text){
		Main.guide.x = -Main.guideWidth;
		var guideText = Main.guideText;
		if(text){
			guideText.text = text;
			guideText.x = (Main.guideWidth - guideText.getMeasuredWidth()) / 2;
		}
		
	}
	,score: function(txt){
		var text = Main.scoreText;
		var topWidth = Main.scoreTop.getMeasuredWidth(); // top 文字的宽度
		var maxWidth = Main.score.getBounds().width - topWidth;
		
		text.text = txt || (Main.maxScore + "M");
		var width = text.getMeasuredWidth();
		if(width >= maxWidth){
			text.x = topWidth;
			text.text = text.text.slice(0, -1);
		}else{
			text.x = topWidth + (maxWidth - width) / 2;
		}
		Main.score.x = 68;
		Main.score.y = 681;
	}
	,gameOverScore: function(txt){
		var text = Main.gameOverScoreText;
		var offsetX = 11, width = 100;
		if(txt){
			text.text = txt;
			var textWidth = text.getMeasuredWidth();
			if(textWidth >= width){
				text.x = offsetX;
			}else{
				text.x = (width - textWidth) / 2 + offsetX;
			}
		}
		Main.gameOverScore.y = -Main.gameOverScore.getBounds().height;
	}
	,penguin: function(){
		var penguin = Main.penguin;
		var bound = Main.penguin.getBounds();
		penguin.x = Main.width - Main.penguinOffsetX;
		penguin.y = 0;
		penguin.alpha = 1;
		penguin.rotation = 0;
		penguin.gotoAndPlay("normal");
	}
	,bear: function(){
		var bear = Main.bear;
		var bound = bear.getBounds();
		bear.x = Main.width - 330;
		bear.y = 500;
		bear.gotoAndPlay("normal");
	}
	,background: function(){
		var background = Main.background;
		Main.stopMoveStage();
		background.regX = 2 * Main.width;
	}
	,endPenguin: function(visible){
		if(visible){
			if(!Main.gameOverPenguin){
				Main.gameOverPenguin = new createjs.Sprite(Main.gameOverPenguinSS);
				Main.stage.addChild(Main.gameOverPenguin);
			}
			Main.penguin.alpha = 0;
			Main.gameOverPenguin.alpha = 1;
			Main.gameOverPenguin.gotoAndPlay("down");
			Main.gameOverPenguin.x = Main.penguin.x;
			Main.gameOverPenguin.y = Main.penguin.y;
		}else{
			Main.penguin.alpha = 1;
			Main.gameOverPenguin && (Main.gameOverPenguin.alpha = 0);
		}
	}
};


Main.initEvent = function(){
	Main.clickTime = 0;
	this.stage.removeEventListener("stagemousedown", this.eventHandler.stageClick);
	this.stage.addEventListener("stagemousedown", this.eventHandler.stageClick);
	
};

var eventCD = false;
Main.eventHandler = {
	stageClick: function(event){
		// 如果点击了游戏结束排
		// 三星坑爹的事件，重复触发了
		if(!eventCD){
			Main.fire("stageClick", Main.clickTime);
			eventCD = true;
			setTimeout(function(){
				eventCD = false;
			}, 500);
		}
	}
};


Main.penguinAnimation = null;
Main.isPlaying = false; // 正在进行游戏
Main.isQuiver = false; // 是否击中
/* 事件处理 */
Main.on("stageClick", function(clickTime){
	// 第一次点击：企鹅掉下来 + 白熊准备动作
	if(!Main.isPlaying){
		Main.isPlaying = true;
		// 重设场景
		this.reset.penguin();
		this.reset.bear();
		this.reset.background();
		this.reset.score();
		
		Main.log("白熊挥棒了！");
		Main.bear.gotoAndPlay("prepare");

		Main.log("企鹅跳下来吧~！");
		Main.penguin.gotoAndPlay("jump");
		var toY = Main.floorLine - Main.penguinHeight + 70;
		Main.penguinAnimation = createjs.Tween.get(this.penguin, {loop: false});
		Main.penguinAnimation.to({y: toY}, Main.fallingTime, createjs.Ease.quadIn)
						.call(function(){
							Main.fire("gameOver", 0);
							Main.log("掉下来了");
						});		
		
		// 监听熊的挥棒动作
		Main.bearListenerShoot();
	}else if(!Main.penguinAnimation._paused){
		// 这里很诡异，没有检测 pause 的方法..
		
		var penguinY = this.penguin.y - this.penguin.regY;
		var clickX = Math.abs(this.knockPoint - penguinY);
		Main.isQuiver = clickX <= this.penguinHeight;
		// 击中了？
		if(Main.isQuiver){
			clickX = Math.ceil(clickX / this.penguinHeight * 100);
			var angle = Main.calculateAngle(clickX);
			Main.log("击中角度:" + angle);
			Main.fire("knockPenguin", angle);
			// 解除熊的监听
			Main.bearRemoveListenerShoot();
		}else{
			Main.log("你木有击中！！");
		}
		this.bear.gotoAndPlay("shoot");
	}
});

Main.bearListenerShoot = function(){
	this.bearRemoveListenerShoot();
	this.bear.addEventListener("animationend", Main.bearShoot);
}
Main.bearRemoveListenerShoot = function(){
	this.bear.removeEventListener("animationend", Main.bearShoot);
}

// 如果打不中，立刻回去准备
Main.bearShoot = function(){
	if(!Main.isQuiver && Main.bear.currentAnimation == "shoot"){
		Main.bear.gotoAndPlay("prepare");
	}
}

Main.on("knockPenguin", function(event, angle){
	Main.penguinAnimation.setPaused(true);
	Main.flyLine(angle);
});


Main.on("moveStage", function(event, distance, totalDistance){
	Main.moveStage(distance, totalDistance);
});

Main._moveStage = function(distance, totalDistance){
	Main.moveStage = Main.moveStage2;
	Main.moveStage(distance, totalDistance);
}
Main.moveStage = Main._moveStage;
Main.stopMoveStage = function(){
	// this.stage.removeEventListener("tick", testMoveStage);
	Main.moveStage = Main._moveStage;
}

// 2、熊、山都和背景，都往后挪，Main.visibleDistance距离左右，就不挪动了
Main.moveStage2 = function(distance, totalDistance){
	if(this.background.regX > Main.width){
		this.bear.x += distance;
		this.score.x += distance;
		this.background.regX -= distance;
		
		Main.moveGuide(distance, totalDistance);
	}else{
		Main.moveStage = Main.moveStage3;
		// Main.guideMoveLength = Main.guideDistance + Main.guideWidth;
		Main.moveStage3(distance, totalDistance);
		// 添加1个路标
		// Main.tool.addNewGuide(totalDistance, 0);
	}
}

// 3、背景往后挪
Main.moveStage3 = function(distance, totalDistance){
	this.background.regX -= distance;
	if(this.background.regX <= 0){
		this.background.regX += Main.width;
	}
	Main.moveGuide(distance, totalDistance);
}

// 路标
Main.guideMoveLength = 0;
Main.guideMoveIndex = 1;
Main.moveGuide = function(distance, totalDistance){
	this.guide.x += distance;
	// 路标
	this.guideMoveLength += distance;
	if(this.guideMoveLength >= this.guideDistance + this.guideWidth){
		this.reset.guide(++Main.guideMoveIndex + "00M");
		this.guideMoveLength = 0;
	}
}

Main.getTotalDistance = function(distance){
	Main.log(distance);
	var result = Main.guideMoveIndex * 100;
	var total = this.guideDistance + this.guideWidth;
	result += Math.round(Main.guide.x * total / Main.width) / 10;
	return distance > 0 ? result : 0;
}


Main.calculateAngle = function(x){
	Main.log("角度" + x);
	var y = Main.minAngle + Main.maxAngle * Math.sin(Math.PI * x / 200);
	y += Math.round(Math.random() * Main.randomAngle) * (Math.random() < 0.5 ? -1 : 1);
	return Math.ceil(y);
}

Main.gameOverScoreUtil = {
	dropDown: function(score, x){
		Main.reset.gameOverScore(score);
		Main.gameOverScore.x = x;
		createjs.Tween.get(Main.gameOverScore, {loop: false})
						.to({
							y: Main.floorLine - 60
						}, 800, createjs.Ease.quintIn);
	}
};

// 游戏结束
Main.on("gameOver", function(event, distance, x){
	Main.log("游戏结束:" + Main.getTotalDistance(distance));
	var score = Main.getTotalDistance(distance);
	var hasNewMaxScore = score > Main.maxScore;
	Main.maxScore = Math.max(Main.maxScore, score);
	try{
		localStorage["penguinMaxScore"] = Main.maxScore;
	}catch(e){
		
	}
	if(distance <= 0){
		Main.reset.endPenguin(true);
		Main.bear.gotoAndPlay("shootNull");
		//Main.gameOverScoreUtil.dropDown("0", Main.penguin.x + 50);
	}else{
		//Main.gameOverScoreUtil.dropDown(score, x);
	}
	setTimeout(function(){
		Main.endGame(score);
		if(hasNewMaxScore && score > 700){
			btGame.playScoreMsg("笨熊喝大力，大力出奇迹！你获得了最好的成绩，快跟好友分享一下吧");
			btGame.setShare({
				title: "我在《打企鹅》中将企鹅打出了"+Main.maxScore+"米，简直停不下来！"
			});
		}
	}, 1200);
});


btGame.resizePlayArea($("#container"), Main.width, Main.height, "center", "center");
Main.initStage();
