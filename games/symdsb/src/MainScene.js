var kTagOpenDoor = 77771;
var kMode20S = 1;
var kMode20 = 2;

MODE=1;
ISHELP=false;
var MainLayer = cc.Layer.extend({
	isDoorOpen:false,
	/*
	onEnter:function () {
		cc.log("onEnter");
		this._super();
		this._touchListener = cc.EventListener({
			event: cc.EventListener.TOUCH_ONE_BY_ONE,
			swallowTouches: true,
			onTouchBegan:function () {
				return true;
			}
		}); 
		cc.eventManager.addListener(this._touchListener, 1);
		
		
		//this.openDoor(doorItem);
	},
*/
	ctor:function () {
		cc.log("MainLayer128");
		this._super();
	/*
		var script = document.createElement('script');
		script.onload = function() {
			//alert("Script loaded and ready");
		};
		script.src = "http://cpro.baidustatic.com/cpro/ui/cm.js";
		document.getElementsByTagName('body')[0].appendChild(script);
*/
		ISHELP = false;
		var bg = new cc.Sprite(res.android_bj);
		bg.attr({
			x: cc.winSize.width / 2,
			y: cc.winSize.height / 2,
		});
		this.addChild(bg);


		var FLO =  new cc.Sprite(res.banquan);
		FLO.attr({
			anchorX: 0,
			anchorY: 1,
			x: 5,
			y: cc.winSize.height - 5
		});
		this.addChild(FLO);

		var labelTitle = new cc.LabelTTF("随意门（屌丝版）", "黑体",  50);
		labelTitle.setColor(cc.color(85, 64, 71));
		labelTitle.x=cc.winSize.width/2;
		labelTitle.y=cc.winSize.height-labelTitle.getContentSize().height*0.8;
		this.addChild(labelTitle, 10);
		labelTitle = new cc.LabelTTF("用最快的时间打开20扇门", "黑体",  45);
		labelTitle.setColor(cc.color(85, 64, 71));
		labelTitle.x=cc.winSize.width/2;
		labelTitle.y=60;
		this.addChild(labelTitle, 10);

		var doorItem = new cc.MenuItemImage(
				res.menu_door_1,
				res.menu_door_1,
				this.openDoorItem, this);
		doorItem.attr({
			x: cc.winSize.width/2+34,
			y: cc.winSize.height*0.6,
			scale:1.1,
		});

		var menudoor = new cc.Menu(doorItem);
		menudoor.x = 0;
		menudoor.y = 0;
		this.addChild(menudoor, 1);
		
		var shadow = new cc.Sprite(res.shadow1);
		shadow.attr({
			x: cc.winSize.width/2-4,
			y: doorItem.getPositionY()-doorItem.getContentSize().height*0.47*1.1,
			anchorX: 0.5,
			anchorY: 1
		});
		shadow.setScale(1.1);
		this.addChild(shadow);

		var animation = new cc.Animation();
		for (var i = 1; i < 3; i++) {
			var frameName = "res/help" + i + ".png";
			animation.addSpriteFrameWithFile(frameName);
		}
		animation.setDelayPerUnit(0.1);
		animation.setRestoreOriginalFrame(true);

		var action = cc.animate(animation);

		var spriteNormal = new cc.Sprite("res/help1.png");
		var spriteSelected = new cc.Sprite("res/help1.png");
		var spriteDisabled = new cc.Sprite("res/help1.png");
		var sequence = cc.sequence(action, action.reverse());
		spriteNormal.runAction(sequence.repeatForever());

		var itemHelp = new cc.MenuItemSprite(spriteNormal, spriteSelected, spriteDisabled, function(sender){
			cc.log("sprite clicked!");
			//cc.audioEngine.playEffect("res/sound_1.wav");
			ISHELP = true;
			MODE = kMode20;

			var pScene = new GameScene();
			var layer = new GameLayer();
			pScene.addChild(layer);
			cc.director.runScene( pScene );;
			return;
		}, this);
		
		//var help = new cc.Sprite( "res/help1.png" );
		//help.runAction(cc.sequence(action, action.reverse()).repeatForever());

		//var itemHelp = cc.MenuItemSprite(help, cc.Sprite("res/help1.png"), cc.Sprite("res/help1.png"), this.showHelp, this);
		var mode20 = this.menuItemWithLabel(res.menubutton1, "开始游戏", this.startGame);
		var mode20S = this.menuItemWithLabel(res.menubutton1, "倒计时模式", this.startGame);
		var full = this.menuItemWithLabel(res.menubutton2, "下载完整版", this.showMoreGame);
		itemHelp.setPosition(cc.p(cc.winSize.width-itemHelp.getContentSize().width*0.7, cc.winSize.height-itemHelp.getContentSize().height*0.7))
		mode20.x=cc.winSize.width/2;
		mode20.y=220;
		mode20S.x=cc.winSize.width/2+mode20.getContentSize().width*0.7;
		mode20S.y=mode20.getPositionY();
		full.setPosition(cc.p(cc.winSize.width*0.5, 140))

		mode20.setTag(kMode20);
		mode20S.setTag(kMode20S);

		var menu = new cc.Menu(itemHelp, mode20);
		menu.x = 0;
		menu.y = 0;
		this.addChild(menu, 2);
		return true;
	},

	menuItemWithLabel: function(sprite, str, selector){
		
		var spriteNormal = new cc.Sprite(sprite);
		var spriteSelected = new cc.Sprite(sprite);
		var spriteDisabled = new cc.Sprite(sprite);
		
		var labelTitle = new cc.LabelTTF(str, "黑体",  32);
		labelTitle.x=spriteNormal.getContentSize().width*0.5;
		labelTitle.y=spriteNormal.getContentSize().height*0.5;
		spriteNormal.addChild(labelTitle);
		
		var item = new cc.MenuItemSprite(spriteNormal, spriteSelected, spriteDisabled, selector, this);
		return item;
	},
	
	openDoorItem: function(sender){
		cc.log("openDoorItem");
		//cc.audioEngine.playEffect("res/sound_2.wav");

		if (this.isDoorOpen==true) {
			this.removeChildByTag(kTagOpenDoor);
			this.isDoorOpen = false;
			return;
		}else{
			this.isDoorOpen = true;
		}
		var item = sender;
		var openDoor = new cc.Sprite(res.menu_door_2);
		openDoor.setPosition(item.getPosition());
		openDoor.setScale(1.1);
		openDoor.setTag(kTagOpenDoor);
		this.addChild(openDoor, 1);
	},


	startGame: function(sender){
		//cc.audioEngine.playEffect("res/sound_1.wav");
		cc.log("startGame");

		var item = sender;
		MODE = item.getTag();

		var pScene = new GameScene();
		var layer = new GameLayer();
		pScene.addChild(layer);
		cc.director.runScene( pScene );
	},

	showMoreGame: function(){
		//cc.audioEngine.playEffect("res/sound_1.wav");
		if (!cc.sys.isNative) {
			clickMore();
		} 
	},

	closeMoreGame: function(){
		//cc.audioEngine.playEffect("res/sound_1.wav");


	},
});

var MainScene = cc.Scene.extend({

});