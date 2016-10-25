var kTagParentNode = 500;
var kTagLabelScore = 501;
var kTagCheckBG = 502;
var kTagColorLayer = 503;
var kTagScoreBall = 504;
var kTagHelpBG = 505;
var kTagBG = 506;
var kTagTopMenu = 507;
var kTagTargetColor = 508;
var kTagTipLabel = 509;
var kTagHelpMenu = 510;
var kTagShadow = 511;


var GameScene = cc.Scene.extend({

});

var GameLayer = cc.Layer.extend({
	score:1,
	targetScore:0,
	isGameStart:false,
	isTouchCheck:false,  
	isMenuEnable:true,
	isGameOver:false,
	isGameWin:false,
	isHelp:false,
	helpCnt: 0,
	image:null,
	time:0,
	target:0,
	gameMode:1,
	labelTime:null,
	labelScore:null,
	startPoint:cc.p(0,0),
	onEnter:function () {
		cc.log("onEnter");
		this._super();
		cc.eventManager.addListener({
			event: cc.EventListener.TOUCH_ONE_BY_ONE,
			swallowTouches: true,
			onTouchBegan:function (touch, event){
				cc.log("onTouchBegan");
				if (this.isMenuEnable == false||this.isGameOver == true) {
					return true;
				}
				this.isTouchCheck = false;
				this.startPoint = touch.getLocation();
				return true;
			}.bind(this),
			onTouchMoved:function (touch, event){
				cc.log("ccTouchesMoved");
				//return;
				if (this.isMenuEnable == false||this.isTouchCheck == true||this.isGameOver == true) {
					return;
				}

				var location = touch.getLocation();
				//location = cc.director.convertToGL( location );
				//var startPoint = touch.getStartLocation();
				var diff = cc.pSub(location, this.startPoint);
				if (Math.abs(diff.x)>15 ||Math.abs(diff.y)>15 ) {
					if (this.isGameStart == false) {
						this.isGameStart = true;
						this.scheduleUpdate();
					}
					this.isTouchCheck = true;
					if (Math.abs(diff.x)>Math.abs(diff.y)) {
						if (diff.x<0) {
							cc.log("MOVE LEFT");
							if (this.target==3) {
								cc.log("win");
								this.openCurDoor(res.game_door2_open1, true);
							}else{
								this.openCurDoor(res.game_door2_open1, false);
							}
						}else {
							cc.log("MOVE RIGHT");
							if (this.target==2) {
								cc.log("win");
								this.openCurDoor(res.game_door2_open2, true);
							}else{
								this.openCurDoor(res.game_door2_open2, false);
							}
						}
					}else{
						if (diff.y<0) {
							cc.log("MOVE DOWN");
							if (this.target==0) {
								cc.log("win");
								this.openCurDoor(res.game_door2_open4, true);
							}else{
								this.openCurDoor(res.game_door2_open4, false);
							}
						}else {
							cc.log("MOVE UP");
							if (this.target==1) {
								cc.log("win");
								this.openCurDoor(res.game_door2_open3, true);
							}else{
								this.openCurDoor(res.game_door2_open3, false);
							}
						}
					}
				}
			}.bind(this),
			onTouchEnded:function (touch, event){
				if (this.isMenuEnable == false||this.isGameOver == true) {
					return;
				}
				cc.log("onTouchEnded");
				this.isTouchCheck = false;
			}.bind(this)
		}, this); 
		/*
		if( 'mouse' in cc.sys.capabilities ) {
			cc.eventManager.addListener({
				event: cc.EventListener.MOUSE,
				onMouseDown: this.onTouchBegan,
				onMouseMove: this.onTouchMoved,
				onMouseUp:this.onTouchEnded }, this);
		}
		*/
	},
	
	ctor:function () {
		this._super();
		this.gameMode = MODE;
		this.isHelp = ISHELP;
		cc.log("GameLayer - S -"+this.gameMode);
		if (this.gameMode==kMode20) {
			this.targetScore = 20;
		}else{
			this.targetScore = 0;
			this.score = 0;
			this.time = 20.00;
		}

		this.initGame();

		var quit = this.menuItemWithLabel(res.tongyong_back,null,this.quitGame);
		quit.setPosition(cc.p(quit.getContentSize().width*0.6,cc.winSize.height-quit.getContentSize().height*0.6));

		var restart = this.menuItemWithLabel(res.replaymini,null,this.restartGame);
		restart.setPosition(cc.p(restart.getContentSize().width*1.7,cc.winSize.height-restart.getContentSize().height*0.6));

		var help = this.menuItemWithLabel(res.tongyong_help,null,this.showHelp);
		help.setPosition(cc.p(help.getContentSize().width*2.8,cc.winSize.height-help.getContentSize().height*0.6));

		var menu = new cc.Menu(quit, restart, help);
		menu.setPosition( cc.p(0,0) );
		//this.addChild(menu, 1, kTagTopMenu);


		this.labelTime = new cc.LabelTTF(this.time+"''", "Arial Black",  50);
		this.labelTime.setColor(cc.color(0, 0, 0));
		this.labelTime.setAnchorPoint(cc.p(1, 1));
		this.addChild(this.labelTime, 1);
		this.labelTime.setPosition(cc.p(cc.winSize.width - 8, cc.winSize.height - 8));

		var isHelped = cc.sys.localStorage.getItem('isShowHelped');
		//var isHelped = getLocalData('isHelped');
		cc.log("isShowHelped ＝"+isHelped);

		if (isHelped==null||this.isHelp==true){
			cc.sys.localStorage.setItem( 'isShowHelped', 2 );
			//setLocalData('isHelped', 1)
			this.showHelp();
			
			var quit = this.menuItemWithLabel(res.tongyong_back,null,this.quitGame);
			quit.setPosition(cc.p(quit.getContentSize().width*0.6,cc.winSize.height-quit.getContentSize().height*0.6));

			var menu = new cc.Menu(quit);
			menu.setPosition( cc.p(0,0) );
			this.addChild(menu, 2, kTagTopMenu);
		}

		cc.log("GameScene - E -");
	},

	menuItemWithLabel: function(sprite, str, selector){

		var spriteNormal = new cc.Sprite(sprite);
		var spriteSelected = new cc.Sprite(sprite);
		var spriteDisabled = new cc.Sprite(sprite);
		if(str){
			var labelTitle = new cc.LabelTTF(str, "黑体",  27);
			labelTitle.x=spriteNormal.getContentSize().width*0.5;
			labelTitle.y=spriteNormal.getContentSize().height*0.5;
			spriteNormal.addChild(labelTitle);
		}

		var item = new cc.MenuItemSprite(spriteNormal, spriteSelected, spriteDisabled, selector, this);
		return item;
	},
	
	randomInt: function(maxNum){
		var random = Math.random();
		var range = 1/maxNum;
		for (var int = 0; int < maxNum; int++) {
			if(random>=int*range&&random<=(int+1)*range){
				return int; 
				break;
			}
		}
	},
	
	initGame: function(){
		
	
		
		var bg = new cc.Sprite(res.game_bj);
		bg.x=cc.winSize.width/2;
		bg.y=cc.winSize.height/2;
		this.addChild(bg,0,kTagBG);

		var door = new cc.Sprite(res.game_door1_close);
		door.x=bg.getContentSize().width/2;
		door.y=bg.getContentSize().height/2;
		bg.addChild(door, 5);

		var shadow = new cc.Sprite(res.shadowbig);
		shadow.attr({
			anchorX: 0.5,
			anchorY: 1,
			x: door.getPositionX(),
			y: door.getPositionY()-door.getContentSize().height*0.5+door.getContentSize().height*0.115
		});
		bg.addChild(shadow, 1, kTagShadow);

		this.labelScore = new cc.LabelTTF(""+this.score, "黑体",  100);
		this.labelScore.setColor(cc.color(255, 255, 255));
		this.labelScore.attr({
			anchorX: 0.5,
			anchorY: 0.5,
			x: door.getContentSize().width/2,
			y: door.getContentSize().height/2+50
		});
		door.addChild(this.labelScore, 2, kTagLabelScore);

		var blackboard = new cc.Sprite(res.blackboard);
		var point = bg.convertToWorldSpace(cc.p(bg.getContentSize().width/2, door.getPositionY()+325 ));
		blackboard.setPosition(point);
		this.addChild(blackboard, 1, kTagTargetColor);

		this.target = this.randomInt(4)+1;

		var no1 = this.randomInt(4);
		
		var no2 = this.randomInt(4);
		while (no2==no1) {
			no2 = this.randomInt(4);
		}

		var no3 = this.randomInt(4);
		while (no3==no1||no3==no2) {
			no3 = this.randomInt(4);
		}

		var no4 = this.randomInt(4);
		while (no4==no1||no4==no2||no4==no3) {
			no4 = this.randomInt(4);
		}

		var  pos  = [   cc.p(door.getContentSize().width/2, door.getContentSize().height-131 ),
		                cc.p(door.getContentSize().width/2, 131 ),
		                cc.p(125, door.getContentSize().height/2),
		                cc.p(door.getContentSize().width-125 , door.getContentSize().height/2)
		                ];

		if (this.helpCnt>0) {
			this.labelScore.setVisible(false);
			var arr = [0,3,1,4,2];
			no1 = 0;
			no2 = 1;
			no3 = 2;
			no4 = 3;
			if (this.helpCnt<5) {
				this.target = arr[this.helpCnt];
				cc.log("target = "+this.target);
				var yuan = new cc.Sprite(res.yuan);
				yuan.setPosition(cc.p(blackboard.getContentSize().width/2, blackboard.getContentSize().height/2));
				blackboard.addChild(yuan);
				var fadeIn = cc.fadeIn(0.1);
				var delayTime1 = cc.delayTime(0.1);
				var fadeOut = cc.fadeOut(0.1);
				var delayTime2 = cc.delayTime(0.1);
				var sequence = cc.sequence(fadeIn,delayTime1,fadeOut,delayTime2);
				yuan.runAction(sequence.repeatForever());

				var yuan1 = new cc.Sprite(res.yuan);
				yuan1.setPosition(pos[this.target-1]);
				door.addChild(yuan1);
				var fadeIn1 = cc.fadeIn(0.1);
				var delayTime3 = cc.delayTime(0.1);
				var fadeOut1 = cc.fadeOut(0.1);
				var delayTime4 = cc.delayTime(0.1);
				var sequence1 = cc.sequence(fadeIn1,delayTime3,fadeOut1,delayTime4);
				yuan1.runAction(sequence1.repeatForever());

				var jiantou = new cc.Sprite(res.jiantou);
				jiantou.setAnchorPoint(cc.p(0, 0.5));
				jiantou.setPosition(pos[this.target-1]);
				door.addChild(jiantou, 5);

				var shou = new cc.Sprite(res.shou);
				shou.setAnchorPoint(cc.p(0.5, 1.0));
				shou.setPosition(pos[this.target-1]);
				door.addChild(shou, 5);

				if (this.target==1) {
					jiantou.setRotation(90);
					shou.setRotation(90);
					var moveBy = cc.moveBy(1.0, cc.p(0,-120));
					var moveTo = cc.moveTo(0.01, shou.getPosition());
					var sequence = cc.sequence(moveBy,moveTo);
					shou.runAction(sequence.repeatForever());
				}else if(this.target==2){
					jiantou.setRotation(270);
					//shou.setRotation(270);
					var moveBy = cc.moveBy(1.0, cc.p(0,120));
					var moveTo = cc.moveTo(0.01, shou.getPosition());
					var sequence = cc.sequence(moveBy,moveTo);
					shou.runAction(sequence.repeatForever());
				}else if(this.target==3){
					var moveBy = cc.moveBy(1.0, cc.p(120,0));
					var moveTo = cc.moveTo(0.01, shou.getPosition());
					var sequence = cc.sequence(moveBy,moveTo);
					shou.runAction(sequence.repeatForever());
				}else{
					jiantou.setRotation(180);
					//shou.setRotation(180);
					var moveBy = cc.moveBy(1.0, cc.p(-120,0));
					var moveTo = cc.moveTo(0.01, shou.getPosition());
					var sequence = cc.sequence(moveBy,moveTo);
					shou.runAction(sequence.repeatForever());
				}

				var  labelDesc = new cc.LabelTTF("根据黑色方框内的门锁颜色来判断开门方向。", "黑体", 30, cc.size(200.0, 200.0), cc.TEXT_ALIGNMENT_LEFT, cc.VERTICAL_TEXT_ALIGNMENT_CENTER);
				labelDesc.setColor(cc.color(0, 0, 0));
				labelDesc.setAnchorPoint(cc.p(0.0, 0.5));
				labelDesc.setPosition(cc.p(blackboard.getContentSize().width*1.2, blackboard.getContentSize().height/2));
				blackboard.addChild(labelDesc, 10);
			}else{
				this.target = arr[this.helpCnt-1];
				this.helpCnt = 0;

				if(this.isHelp==true){
					this.isMenuEnable = false;

					var ret = this.menuItemWithLabel(res.bluebutton, "再看一遍", this.showHelp);
					ret.setPosition(cc.p(cc.winSize.width*0.3,  140));
					var restart = this.menuItemWithLabel(res.bluebutton,"返回", this.quitGame);
					restart.setPosition(cc.p(cc.winSize.width*0.7,  140));

					var menu = new cc.Menu(ret, restart);
					menu.setPosition( cc.p(0,0) );
					this.addChild(menu, 10, kTagHelpMenu);
				}else{
					this.isMenuEnable = false;
					var ret = this.menuItemWithLabel(res.bluebutton, "再看一遍", this.showHelp);
					ret.setPosition(cc.p(cc.winSize.width*0.3,  140));
					var restart = this.menuItemWithLabel(res.bluebutton,"返回", this.restartGame);
					restart.setPosition(cc.p(cc.winSize.width*0.7,  140));

					var menu = new cc.Menu(ret, restart);
					menu.setPosition( cc.p(0,0) );
					this.addChild(menu, 10, kTagHelpMenu);
				}
			}
		}

		var spriteTarget = new cc.Sprite("res/lock"+this.target+".png");
		spriteTarget.setPosition(cc.p(blackboard.getContentSize().width/2, blackboard.getContentSize().height/2));
		blackboard.addChild(spriteTarget);

		var sprite1 = new cc.Sprite(res.lock1);
		sprite1.setPosition(pos[no1]);
		door.addChild(sprite1);

		var sprite2 = new cc.Sprite(res.lock2);
		sprite2.setPosition(pos[no2]);
		door.addChild(sprite2);

		var sprite3 = new cc.Sprite(res.lock3);
		sprite3.setPosition(pos[no3]);
		door.addChild(sprite3);

		var sprite4 = new cc.Sprite(res.lock4);
		sprite4.setPosition(pos[no4]);
		door.addChild(sprite4);

		if (this.target==1) {
			this.target = no1;
		}else if(this.target==2){
			this.target = no2;
		}else if(this.target==3){
			this.target = no3;
		}else{
			this.target = no4;
		}
	},


	showHelp: function(){
		//cc.audioEngine.playEffect("res/sound_1.wav");
		this.isMenuEnable = true;
		this.removeChildByTag(kTagBG);
		this.removeChildByTag(kTagTargetColor);
		this.removeChildByTag(kTagTopMenu);
		this.removeChildByTag(kTagHelpMenu);
		this.helpCnt++;
		this.initGame();

		this.labelTime.setVisible(false);
		this.labelScore.setVisible(false);
		this.unscheduleUpdate();
		return;

	},

	start: function(){
		//cc.audioEngine.playEffect("res/sound_1.wav");
		this.isGameStart = true;

		this.removeChildByTag(kTagHelpBG);
		this.isMenuEnable=true;
		scheduleUpdate();
	},

	creatTimeOutMenu: function()
	{

		this.isGameOver = true;
		this.unscheduleUpdate();
		this.removeChildByTag(kTagTopMenu);
		this.removeChildByTag(kTagBG);
		this.removeChildByTag(kTagTargetColor);
		this.removeChildByTag(kTagShadow);
		this.labelTime.setString("");
 
		var bg = new cc.Sprite(res.android_bj);
		bg.setPosition( cc.p(cc.winSize.width/2,cc.winSize.height/2) );
		this.addChild(bg);

		var bestScore = cc.sys.localStorage.getItem('bestScoreModeS');
		if (this.score>bestScore) {
			bestScore = this.score;
			cc.sys.localStorage.setItem( 'bestScoreModeS', bestScore );
			var newscore = new cc.Sprite(res.newscore);
			newscore.setAnchorPoint(cc.p(0.0, 0.0));
			newscore.setPosition( cc.p(cc.winSize.width*0.55, cc.winSize.height*0.6) );
			this.addChild(newscore);
		}

		var  labelMode = new cc.LabelTTF("倒计时模式", "黑体", 60);
		labelMode.setColor(cc.color(0, 0, 0));
		labelMode.setPosition( cc.p(cc.winSize.width/2, cc.winSize.height*0.86) );
		this.addChild(labelMode, 8);

		var  labelScore = new cc.LabelTTF(""+this.score, "黑体",  200);
		labelScore.setColor(cc.color(0, 0, 0));
		labelScore.setPosition( cc.p(cc.winSize.width/2, cc.winSize.height*0.55) );
		this.addChild(labelScore, 8);

		var  labelBestScore = new cc.LabelTTF("最佳成绩"+bestScore, "黑体",  60);
		labelBestScore.setColor(cc.color(0, 0, 0));
		labelBestScore.setPosition( cc.p(cc.winSize.width/2, cc.winSize.height*0.40) );
		this.addChild(labelBestScore, 8);
		
		this.gameOverMenu()

	},

	creatWinMenu: function( res)
	{
 
		//cc.audioEngine.playEffect("res/sound_1.wav");
		this.isGameWin = true;

		this.isGameOver = true;
		this.unscheduleUpdate();

		this.removeChildByTag(kTagTopMenu);
		this.removeChildByTag(kTagTargetColor);
		var bg = this.getChildByTag(kTagBG);
		bg.removeAllChildren();

		var animation = new cc.Animation();
		for (var i = 1; i < 3; i++) {
			var frameName = "res/background_suc2000" + i + ".png";
			animation.addSpriteFrameWithFile(frameName);
		}
		animation.setDelayPerUnit(0.1);
		animation.setRestoreOriginalFrame(true);

		var action = cc.animate(animation);
		
		var winImgBG = new cc.Sprite( "res/background_suc20001.png" );
		winImgBG.setPosition(cc.p(cc.winSize.width/2, cc.winSize.height/2));
		var sequence = cc.sequence(action, action.reverse());
		winImgBG.runAction(sequence.repeatForever());
		this.addChild(winImgBG);

		var door = new cc.Sprite(res);
		door.setPosition( cc.p(cc.winSize.width/2,cc.winSize.height/2) );
		this.addChild(door, 5);

		var shadow = new cc.Sprite("res/shadowbig.png");
		shadow.setAnchorPoint(cc.p(0.5,1));
		shadow.setPosition( cc.p(door.getPositionX(), door.getPositionY()-door.getContentSize().height*0.5+door.getContentSize().height*0.115) );
		this.addChild(shadow, 1);


		var percent;
		var imgNo;
		if(this.time>18){
			percent = this.randomInt(5)+1;
			imgNo = 1;
		}else if(this.time>16){
			percent = this.randomInt(5)+6;
			imgNo = 2;
		}else if(this.time>14){
			percent = this.randomInt(20)+11;
			imgNo = 3;
		}else if(this.time>13){
			percent = this.randomInt(20)+31;
			imgNo = 4;
		}else if(this.time>12){
			percent = this.randomInt(30)+51;
			imgNo = 5;
		}else if(this.time>11){
			percent = this.randomInt(10)+81;
			imgNo = 6;
		}else{
			percent = this.randomInt(8)+91;
			imgNo = 7;
		}
		
		var  label1 = new cc.LabelTTF("开门成功!", "黑体",  50);
		label1.setColor(cc.color(0, 0, 0));
		label1.setAnchorPoint(cc.p(0.0, 0.5));
		label1.setPosition(cc.p(8 , cc.winSize.height-label1.getContentSize().height/2-8 ));
		this.addChild(label1, 8);

		var  label2 = new cc.LabelTTF("恭喜您击败了全国"+percent+"%的玩家", "黑体",  30);
		label2.setColor(cc.color(0, 0, 0));
		label2.setAnchorPoint(cc.p(0.0, 0.5));
		label2.setPosition(cc.p(8 , cc.winSize.height-label1.getContentSize().height-label2.getContentSize().height/2-8 ));
		this.addChild(label2, 8);
		
		var winImg = new cc.Sprite("res/photo_"+imgNo+".png");
		winImg.setPosition( cc.p(winImgBG.getContentSize().width/2, winImgBG.getContentSize().height/2) );
		winImgBG.addChild(winImg);

		this.gameOverMenu()
		
		var bestScore = cc.sys.localStorage.getItem('bestScoreMode');
		//var bestScore = getLocalData('bestScoreMode');
		if (bestScore==null) {
			cc.log("!bestScore");
			bestScore = this.time;
			cc.sys.localStorage.setItem( 'bestScoreMode', bestScore );
		}
		if (this.time<bestScore) {
			bestScore = this.time;
			//setLocalData('bestScoreMode', bestScore);
			cc.sys.localStorage.setItem( 'bestScoreMode', bestScore );
			var newscore = new cc.Sprite(res.new_mini);
			newscore.setAnchorPoint(cc.p(1.0, 1.0));
			newscore.setPosition( cc.p(this.labelTime.getPositionX() - this.labelTime.getContentSize().width-5 , this.labelTime.getPositionY()-5 ) );
			this.addChild(newscore);
		}
		var b = (Math.round(bestScore*100))/100;
		var labelBestScore = new cc.LabelTTF(b+"''", "黑体",  30);
		labelBestScore.setColor(cc.color(0, 0, 0));
		labelBestScore.setAnchorPoint(cc.p(1, 0.5));
		labelBestScore.setPosition( cc.p(cc.winSize.width-8 , label2.getPositionY()) );
		this.addChild(labelBestScore, 8);
 
		var  labelBest = new cc.LabelTTF("最佳成绩", "黑体",  30);
		labelBest.setColor(cc.color(0, 0, 0));
		labelBest.setPosition( cc.p(labelBestScore.getPositionX()-labelBestScore.getContentSize().width-labelBest.getContentSize().width/2-6 , labelBestScore.getPositionY() ) );
		this.addChild(labelBest, 8);
		dp_submitScore(this.time.toFixed(2));
	},

	creatLoseMenu: function( res)
	{

		this.isGameWin = false;
		this.isMenuEnable = false;

		this.isGameOver = true;
		this.unscheduleUpdate();

		this.removeChildByTag(kTagTopMenu);
		this.removeChildByTag(kTagTargetColor);
		var bg = this.getChildByTag(kTagBG);
		bg.removeAllChildren();
		
		var winImgBG = new cc.Sprite("res/photo_fail.png");
		winImgBG.setPosition(cc.p(cc.winSize.width/2, cc.winSize.height/2));
		this.addChild(winImgBG,10);
		
		var door = new cc.Sprite(res);
		door.setPosition( cc.p(cc.winSize.width/2,cc.winSize.height/2) );
		this.addChild(door, 5);
		
		var shadow = new cc.Sprite("res/shadowbig.png");
		shadow.setAnchorPoint(cc.p(0.5,1));
		shadow.setPosition( cc.p(door.getPositionX(), door.getPositionY()-door.getContentSize().height*0.5+door.getContentSize().height*0.115) );
		this.addChild(shadow, 1);
		
		var  label1 = new cc.LabelTTF("开门失败！", "黑体",  50);
		label1.setColor(cc.color(0, 0, 0));
		label1.setAnchorPoint(cc.p(0.0, 0.5));
		label1.setPosition(cc.p(8 , cc.winSize.height-label1.getContentSize().height/2-8 ));
		this.addChild(label1, 8);

		var  label2 = new cc.LabelTTF("你被全国100%的用户击败了", "黑体",  30);
		label2.setColor(cc.color(0, 0, 0));
		label2.setAnchorPoint(cc.p(0.0, 0.5));
		label2.setPosition(cc.p(8 , cc.winSize.height-label1.getContentSize().height-label2.getContentSize().height/2-8 ));
		this.addChild(label2, 8);
		this.gameOverMenu()
	},

	gameOverMenu: function(){

		var animation = new cc.Animation();
		var frameName = "res/bluebutton.png";
		animation.addSpriteFrameWithFile(frameName);
		frameName = "res/bluebutton2.png";
		animation.addSpriteFrameWithFile(frameName);
		animation.setDelayPerUnit(0.1);
		animation.setRestoreOriginalFrame(true);

		var action = cc.animate(animation);

		var spriteNormal = new cc.Sprite("res/bluebutton.png");
		var spriteSelected = new cc.Sprite("res/bluebutton.png");
		var spriteDisabled = new cc.Sprite("res/bluebutton.png");
		var sequence = cc.sequence(action, action.reverse());
		spriteNormal.runAction(sequence.repeatForever());
		
		var labelTitle = new cc.LabelTTF("分享", "黑体",  32);
		labelTitle.x=spriteNormal.getContentSize().width*1;
		labelTitle.y=spriteNormal.getContentSize().height*0.5;
		spriteNormal.addChild(labelTitle);
		
		//var share = new cc.MenuItemSprite(spriteNormal, spriteSelected, spriteDisabled, this.shareButtonClick, this);

		//var  share = menuItemAnimationWithLabel("bluebutton",CCLocalizedString("share"),menu_selector(GameScene.shareButtonClick));
		//var  more = this.menuItemWithLabel(res.moregames,"更\n多\n游\n戏",clickMore());
		//more.setPosition(cc.p(more.getContentSize().width/2,  cc.winSize.height/2));
		//var  full = this.menuItemWithLabel(res.orangebutton,"下载完整版",this.showMoreGame);
		//full.setPosition(cc.p(cc.winSize.width*0.125,  150));
		var  share = this.menuItemWithLabel(res.bluebutton,"分享",dp_share);
		share.setPosition(cc.p(cc.winSize.width*0.525,  150));
		var  ret = this.menuItemWithLabel(res.bluebutton,"更多游戏",clickMore);
		ret.setPosition(cc.p(cc.winSize.width*0.225,  150));
		var  restart = this.menuItemWithLabel(res.bluebutton,"重玩",this.restartGame);
		restart.setPosition(cc.p(cc.winSize.width*0.825,  150));

		var menu = new cc.Menu(share,ret, restart);
		menu.setPosition( cc.p(0,0) );
		this.addChild(menu, 10);
	},

	showMoreGame: function(){
		//cc.audioEngine.playEffect("res/sound_1.wav");
		if (!cc.sys.isNative) {
			//window.open("http://www.leopaw.net/suiyimenandroid.html", "_blank");
		} 
	},
	
	restartGame: function()
	{
		//cc.audioEngine.playEffect("res/sound_1.wav");
		ISHELP = false;
		var pScene = new GameScene();
		var layer = new GameLayer();
		pScene.addChild(layer);
		cc.director.runScene( pScene );
	},

	quitGame: function()
	{
		ISHELP = false;
		//cc.audioEngine.playEffect("res/sound_1.wav");
		var pScene = new MainScene();
		var layer = new MainLayer();
		pScene.addChild(layer);
		cc.director.runScene( pScene );
	}, 

	tipLabel: function( info, color, pos) {
		var  labelTip = new cc.LabelTTF(info, "黑体",  36);
		labelTip.setColor(color);
		labelTip.setAnchorPoint(cc.p(0.5, 0.5));
		labelTip.setPosition(pos);
		var fadeOut = cc.fadeOut(1.0);
		var removeSelf = cc.removeSelf(true);
		var action = cc.sequence(fadeOut, removeSelf);
		labelTip.runAction(action);
		return labelTip;
	},

	update: function( dt)
	{
		if (this.gameMode==kMode20S) {
			this.time-=dt;
		}else{
			this.time+=dt;
		}
		var b = this.time.toFixed(2);
		this.labelTime.setString(b+"''");
		if(this.time<=0){
			this.time = 0;
			this.isGameOver = true;
			this.unscheduleUpdate();
			this.creatTimeOutMenu();
		}

	},

	newDoor: function(doorRes){
		this.removeChildByTag(kTagBG);
		this.removeChildByTag(kTagTargetColor);
		this.initGame();
		var bg = this.getChildByTag(kTagBG);
		bg.setScale(0.5);
		var delayTime = cc.delayTime(0.1);
		var scaleTo = cc.scaleTo(0.2, 1.0);
		var sequence = cc.sequence(delayTime, scaleTo);
		bg.runAction(sequence);

		var tempBG = new cc.Sprite(res.game_bj);
		tempBG.setPosition( cc.p(cc.winSize.width/2,cc.winSize.height/2) );
		this.addChild(tempBG);

		var door = new cc.Sprite(doorRes);
		door.setPosition( cc.p(tempBG.getContentSize().width/2,tempBG.getContentSize().height/2) );
		tempBG.addChild(door);

		if (doorRes!=res.game_door2_open4) {
			var shadow = new cc.Sprite(res.shadowbig);
			shadow.setAnchorPoint(cc.p(0.5,1));
			shadow.setPosition( cc.p(door.getPositionX(), door.getPositionY()-door.getContentSize().height*0.5+door.getContentSize().height*0.115) );
			tempBG.addChild(shadow);
		}

		var delayTime1 = cc.delayTime(0.1);
		var scaleTo1 = cc.scaleTo(0.2, 2.0);
		var removeSelf1 = cc.removeSelf(true);
		var action = cc.sequence(delayTime1, scaleTo1, removeSelf1);
		tempBG.runAction(action);

	},

	
	openCurDoor: function(doorRes, isRight)
	{
		this.removeChildByTag(kTagTipLabel);
		if (this.helpCnt>0) {
			if (isRight) {
				//cc.audioEngine.playEffect("res/sound_2.wav");
				this.helpCnt++;
				this.newDoor(doorRes);
			}else{
				//cc.audioEngine.playEffect("res/error.wav");
				this.addChild(this.tipLabel("操作失误", cc.color(0, 0, 0), cc.p(cc.winSize.width/2, cc.winSize.height/2-40 )));
			}
			return;
		}

		if (this.gameMode==kMode20S) {
			if (this.time<=0) {
 
			}else{
				if (isRight) {
					//cc.audioEngine.playEffect("res/sound_2.wav");
					this.score++;
					cc.log("isRight = %d", isRight);
					this.newDoor(doorRes);
				}else{
					//cc.audioEngine.playEffect("res/error.wav");
					var tip = this.tipLabel("操作失误", cc.color(0, 0, 0), cc.p(cc.winSize.width/2, cc.winSize.height/2-40 ));
					tip.setTag(kTagTipLabel);
					this.addChild(tip);
				}
			}
		}else{
			if (isRight) {
				//cc.audioEngine.playEffect("res/sound_2.wav");

				this.score++;
				if(this.score>this.targetScore){
					this.creatWinMenu(doorRes);
				}else{
					this.newDoor(doorRes);
				}
			}else{
				//cc.audioEngine.playEffect("res/error.wav");

				this.creatLoseMenu(doorRes);
			}
		}
	},

	shareButtonClick: function()
	{
		//cc.audioEngine.playEffect("res/sound_1.wav");
		var shareUI = new ShareUI()
		this.addChild(shareUI, 100);
		var b = (Math.round(this.time*100))/100;
		if(MODE==kMode20){
			if(this.isGameWin){
				window.wxData.title = "我的随意门得分"+b+"秒，左拥凤姐右抱芙蓉，小样你行么？";
				window.wxData.desc = "我的随意门得分"+b+"秒，左拥凤姐右抱芙蓉，小样你行么？";
				window.wxFriend.title = "我的随意门得分"+b+"秒，左拥凤姐右抱芙蓉，小样你行么？";
			}else{
				window.wxData.title = "随意门屌丝版，左拥凤姐右抱芙蓉，快快来玩。";
				window.wxData.desc = "随意门屌丝版，左拥凤姐右抱芙蓉，快快来玩。";
				window.wxFriend.title = "随意门屌丝版，左拥凤姐右抱芙蓉，快快来玩。";
			}
		}else{
			window.wxData.title = "我在倒计时模式中得分"+this.score+"，左拥凤姐右抱芙蓉，小样你行么？";
			window.wxData.desc = "我在倒计时模式中得分"+this.score+"，左拥凤姐右抱芙蓉，小样你行么？";
			window.wxFriend.title = "我在倒计时模式中得分"+this.score+"，左拥凤姐右抱芙蓉，小样你行么？";
		}
	},
});

var ShareUI = cc.LayerColor.extend({
	ctor: function () {
		this._super(cc.color(0, 0, 0, 80), cc.winSize.width, cc.winSize.height);
		this.setOpacity(128);
		/*
		this.setContentSize(cc.size(cc.winSize.width, cc.winSize.height));
		this.setPosition(cc.p(cc.winSize.width*0.5,cc.winSize.height*0.5));
		this.setColor(cc.color(0, 0, 0));
		this.setOpacity(128);
		*/
		var arrow = new cc.Sprite(res.share); 
		arrow.anchorX = 1; 
		arrow.anchorY = 1; 
		arrow.x = cc.winSize.width - 90; 
		arrow.y = cc.winSize.height - 5; 
		this.addChild(arrow); 
	},
	onEnter: function () {
		this._super();
		cc.eventManager.addListener({
			event: cc.EventListener.TOUCH_ONE_BY_ONE,
			swallowTouches:true,
			onTouchBegan: function (touch, event) {
				return true;
			},
			onTouchEnded:function(t, event){
				event.getCurrentTarget().removeFromParent();
			}
		}, this);
	}
});