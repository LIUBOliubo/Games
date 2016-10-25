/****************************************************************************
 Copyright (c) 2010-2012 cocos2d-x.org
 Copyright (c) 2008-2010 Ricardo Quesada
 Copyright (c) 2011      Zynga Inc.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

//global data
var myScore = 0;
var myTime  = 0;
var myTimeString ;

var GameLayer = cc.Layer.extend({
    isMouseDown:false,
    circle:null,
    xiaoxin:null,
    startUpLabel:null,
    hit100:null,
    touchBeginPositionX:null,
    direction:null,
    timeLabel:null,
    scoreLabel:null,
    _time:null,
    _intval:null,
    _hitTimes:null,
    _historyHit:null,
    _overTime:null,
    _startupTime:null,
    powerProBack:null,
    powerProFront:null,
    progressHit:null,
    movingarrow:null,
    initFlag:null,
    currentPer:null,
    hitDt:null,
    xiaoxinLeftRed:null,
    xiaoxinRightRed:null,
    xiaoxinTurn :null,
    displayFlag :null, // 1- <30  2- <41<90 3- 91-150 4- 151 230 5- 231 300
    currentFlag :null,
    cache :null,
    heightSize :null,
    dHeight :null,
    vHeight :null,
    handani :null,
    bootLayer : null,
    shinningLayer : null,
    shinningFlag : null,
    shinningTime :null,
    _touchmovingFlag:null,


    init:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

       var size = cc.Director.getInstance().getWinSize();


        var lazyLayer = cc.Layer.create();
        this.bootLayer = lazyLayer;
        this.addChild(lazyLayer);

        this._time = 0.0;
        this._intval = 0.0;
        this._hitTimes = 0;
        this._overTime = 0;
        this._startupTime = 0;
        this._historyHit = 0;
        this.initFlag = false;
        this.hitDt = 1;
        this.handani = false;
        this.shinningFlag = false;
        this.shinningTime = 0;
        this._touchmovingFlag = false;

        this.cache = cc.SpriteFrameCache.getInstance();

        // add all xiaoxin sprite"
        this.xiaoxinStatus1 = cc.Sprite.createWithSpriteFrame(this.cache.getSpriteFrame("xiaoxin_1.png"));
        this.xiaoxinStatus1.setPosition(size.width / 2, size.height / 2);
        this.xiaoxinStatus1.setFlippedX(true);

        this.xiaoxinStatus1.retain();


        this.xiaoxin = new cc.Sprite();


        this.xiaoxin = this.xiaoxinStatus1;

        this.displayFlag = 1 ;

        var timehead = cc.Sprite.createWithSpriteFrame(this.cache.getSpriteFrame("fenshu.png"));
        timehead.setAnchorPoint(cc.p(0,1));
        timehead.setPosition(size.width*(229/640), size.height*((960-121)/960));

        //time
        this.timeLabel = cc.LabelTTF.create(" 00 00", "Times New Roman", 40);
        this.timeLabel.setAnchorPoint(cc.p(0,1));
        this.timeLabel.setPosition(size.width*(335/640), size.height*((960-121)/960));

        this.timeLabel.setColor(cc.c3b(255,255,255));

        this.timeLabel.setFontSize(40);

        //jiaocheng
        var jiaocheng = cc.Sprite.createWithSpriteFrame(this.cache.getSpriteFrame("jiaocheng.png"));
        jiaocheng.setAnchorPoint(cc.p(0,1));
        jiaocheng.setPosition(size.width*(136/640), size.height*((960-821)/960));

        //score
        this.scoreLabel = cc.LabelTTF.create("分數", "Arial", 38);
        this.scoreLabel.setPosition(size.width *0.5,size.height *0.9);//= size.width *0.48;


        this.scoreLabel.setFontSize(32);

        //progress
        this.powerProBack = cc.Sprite.createWithSpriteFrame(this.cache.getSpriteFrame("kuang.png"));
        this.powerProBack.setPosition(size.width *0.1, size.height / 2);

        this.powerProFront = cc.Sprite.createWithSpriteFrame(this.cache.getSpriteFrame("qicao.png"));

        this.progressHit = cc.ProgressTimer.create(this.powerProFront);

        this.progressHit.setPercentage(80/380);    //设置初始百分比的值
        this.progressHit.setType(cc.PROGRESS_TIMER_TYPE_BAR);
        this.progressHit.setMidpoint(cc.p(0.5, 0));
        this.progressHit.setBarChangeRate(cc.p(0,1));


        this.progressHit.setPosition(24, size.height*0.223);

        //movingarrow
        this.movingarrow = cc.Sprite.createWithSpriteFrame(this.cache.getSpriteFrame("sanjiao.png"));
        this.movingarrow.setPosition(size.width *0.15, size.height*0.378);
        this.heightSize = this.powerProFront.getContentSize().height;
        this.vHeight =  this.heightSize/380;
        this.dHeight =  this.movingarrow.getPosition().y - 80*this.vHeight;

        //jike
        var jike = cc.Sprite.createWithSpriteFrame(this.cache.getSpriteFrame("jike.png"));
        jike.setAnchorPoint(cc.p(0,1));
        jike.setPosition(size.width*(40/640), size.height*((960-701)/960));

        //manzu
        var manzu = cc.Sprite.createWithSpriteFrame(this.cache.getSpriteFrame("manzu.png"));
        manzu.setAnchorPoint(cc.p(0,1));
        manzu.setPosition(size.width*(40/640), size.height*((960-221)/960));

        //hong
        this.xiaoxinRightRed = cc.Sprite.createWithSpriteFrame(this.cache.getSpriteFrame("hongyin.png"));
        this.xiaoxinRightRed.setPosition(size.width *0.65, size.height*0.38);
        this.xiaoxinRightRed.setVisible(false);
        this.xiaoxinRightRed.setScale(0.8);

        this.xiaoxinLeftRed = cc.Sprite.createWithSpriteFrame(this.cache.getSpriteFrame("hongyin.png"));
        this.xiaoxinLeftRed.setPosition(size.width*0.34, size.height*0.38);
        this.xiaoxinLeftRed.setVisible(false);
        this.xiaoxinLeftRed.setScale(0.8);

        this.startUpLabel = cc.LabelTTF.create("Ready", "Arial", 100);
        this.startUpLabel.setPosition(size.width *0.5,size.height *0.6);//= size.width *0.48;

        this.startUpLabel.setColor(cc.c3b(255,215,0));
        this.startUpLabel.setVisible(false);

        //shinninglayer
        this.shinningLayer = cc.LayerColor.create(cc.c4b(255,204,204,255*0.4),size.width,size.height);
        this.shinningLayer.setVisible(false);
        this.addChild(this.shinningLayer,50);
        lazyLayer.addChild(this.xiaoxin, 0);
        lazyLayer.addChild(timehead,0);
        lazyLayer.addChild(this.timeLabel,1);
        lazyLayer.addChild(jiaocheng,1);
        lazyLayer.addChild(this.powerProBack,1);
        lazyLayer.addChild(this.xiaoxinLeftRed,2);
        lazyLayer.addChild(this.xiaoxinRightRed,2);
        lazyLayer.addChild(this.startUpLabel,4);
        this.powerProBack.addChild(this.progressHit,2);
        lazyLayer.addChild(this.movingarrow,2);
        lazyLayer.addChild(manzu,2);
        lazyLayer.addChild(jike,2);

        this.schedule(this.timeClock);


        this.direction = 0; // 0 right

        return true;
    },
    /*a selector callback
    menuCloseCallback:function (sender) {
        cc.Director.getInstance().end();
    },*/
    timeClock:function(dt) {

       this._startupTime +=dt;

        if(((this._hitTimes>=25&&this._hitTimes<=40)||(this._hitTimes>=85&&this._hitTimes<=100)||(this._hitTimes>=215&&this._hitTimes<=230)||(this._hitTimes>=285&&this._hitTimes<=300))&&this.isMouseDown)
        {

            this.shinningTime += dt;
            if(this.shinningTime >=0.08)
            {
                this.shinningTime = 0;
                if(!this.shinningFlag) {
                    this.shinningFlag = true;
                    this.shinningLayer.setVisible(true);
                }else{
                    this.shinningFlag = false;
                    this.shinningLayer.setVisible(false);
                }
            }

        }else
        {
            this.shinningFlag = false;
            this.shinningLayer.setVisible(false);
            this.shinningTime = 0;
        }

       if(this._startupTime >=0.5&&this._startupTime<1.5){
           this.startUpLabel.setVisible(true);
           this.progressHit.setPercentage(parseInt(80 / 380 * 100));
       }else if(this._startupTime >= 1.5&&(!this.handani)){
           this.startUpLabel.setVisible(false);
           this.handani = true;
           this.progressHit.setPercentage(parseInt(80 / 380 * 100));

           var handSprite = cc.Sprite.createWithSpriteFrame(this.cache.getSpriteFrame("shou.png"));
           handSprite.setFlippedX(true);
           handSprite.setVisible(false);
           handSprite.setPosition(cc.Director.getInstance().getWinSize().width *0.3,cc.Director.getInstance().getWinSize().height *0.35);
           this.bootLayer.addChild(handSprite,5);

           var handSprite2 = cc.Sprite.createWithSpriteFrame(this.cache.getSpriteFrame("shou.png"));
           handSprite2.setPosition(cc.Director.getInstance().getWinSize().width *0.5,cc.Director.getInstance().getWinSize().height *0.35);
           //handSprite2.setVisible(false);

           this.bootLayer.addChild(handSprite2,5);

           var moveLeft = cc.MoveTo.create(1, cc.p(cc.Director.getInstance().getWinSize().width *0.5-600 ,handSprite.getPosition().y));
           var moveRight = cc.MoveTo.create(1,cc.p(cc.Director.getInstance().getWinSize().width *0.5+600 ,handSprite2.getPosition().y));

           var handSeq = cc.Sequence.create(moveRight,cc.CallFunc.create(function ()
           {

               handSprite.setVisible(true);
               var handSeq2 = cc.Sequence.create(moveLeft,cc.CallFunc.create(function(){
                   handSprite.removeFromParent();
                   handSprite.removeFromParent();

               }))
               handSprite.runAction(handSeq2);

           }, this));
             handSprite2.runAction(handSeq);
       }else if(this._startupTime >= 1.5&&this._startupTime<3.5&&(this.handani)){
           this.progressHit.setPercentage(parseInt(80 / 380 * 100));
       }else if(this._startupTime >= 3.5&&this._startupTime<3.8){
           this.startUpLabel.setVisible(true);
           this.startUpLabel.setString("GO~");
           this.setTouchEnabled(true);
           this.progressHit.setPercentage(parseInt(80 / 380 * 100));
       }else if(this._startupTime >3.8)
       {
           this.startUpLabel.setVisible(false);
           this._intval += dt;
           this._overTime += dt;

           if(this._startupTime -3.8 >=30) {
               if (this._overTime >= 0.6) {
                   this._overTime = 0;
                   if (this._historyHit == this._hitTimes) {
                       this._hitTimes -= 3;
                       this._historyHit = this._hitTimes;
                       this.scoreLabel.setString("分數 " + this._hitTimes.toString());
                   }
               }
           }
           else
           {
               if (this._overTime >= 0.6) {
                   this._overTime = 0;
                   if (this._historyHit == this._hitTimes) {
                       this._hitTimes -= 4;
                       this._historyHit = this._hitTimes;
                       this.scoreLabel.setString("分數 " + this._hitTimes.toString());
                   }
               }
           }

           if (this._intval >= 1) {
               this._time += 1;
               this._intval -= 1.0;
           }
           this.timeLabel.setString(" "+this._time.toString() + "'" + (this._intval * 1000).toString().substring(1, 3));
           myTimeString = " "+this._time.toString() + "'" + (this._intval * 1000).toString().substring(1, 3);
           if (this._hitTimes <= -80) {
               this.setTouchEnabled(false);
               this.unschedule(this.timeClock);
               myScore = this._hitTimes;
               myTime = (this._time+this._intval)*1000;
               //cc.Director.getInstance().pushScene(new scoreScene());
               var scorelayer = new scoreLayer();
               scorelayer.init();
               scorelayer.setOpacity(0);
               this.addChild(scorelayer,100);
           }
           if (this._hitTimes >= 300) {
              // this.shinningFlag = false;
              // this.shinningLayer.setVisible(false);
               this.setTouchEnabled(false);
               this.unschedule(this.timeClock);
               myScore = this._hitTimes;
               myTime = (this._time+this._intval)*1000;
               var scorelayer = new scoreLayer();
               scorelayer.init();
               scorelayer.setOpacity(0);
               this.addChild(scorelayer,100);
               //cc.Director.getInstance().pushScene(new scoreScene());
           }
           if (this._hitTimes <= 100) {
               this.hitDt = 4;
           } else if (this._hitTimes <= 250) {
               this.hitDt = 2;//2
           } else {
               this.hitDt = 1;//1
           }


           if (this._hitTimes <= 40) {
               if (this.displayFlag != 1) {
                   this.xiaoxinLeftRed.setVisible(false);
                   this.xiaoxinRightRed.setVisible(false);
                   //this.xiaoxin = this.xiaoxinStatus1;
                   this.displayFlag = 1;
                   this.xiaoxin.setTexture(this.xiaoxinStatus1.getTexture());
                   if (this.direction) {
                       this.xiaoxin.setFlippedX(true);
                   }
                   else
                       this.xiaoxin.setFlippedX(false);
               }
           } else if (this._hitTimes <= 100) {
               if (this.displayFlag != 1) {
                   this.displayFlag = 1;
                   this.xiaoxin.setDisplayFrame(this.cache.getSpriteFrame("xiaoxin_1.png"));
                   this.xiaoxin = this.xiaoxinStatus1;
                   if (this.direction) {
                       this.xiaoxin.setFlippedX(true);
                       this.xiaoxinLeftRed.setVisible(true);
                   }
                   else {
                       this.xiaoxin.setFlippedX(false);
                       this.xiaoxinRightRed.setVisible(true)
                   }
               }
           }
           else if (this._hitTimes >= 101 && this._hitTimes <= 230) {
               if (this.displayFlag != 2) {
                   this.xiaoxin.setDisplayFrame(this.cache.getSpriteFrame("xiaoxin_3.png"));
                   this.displayFlag = 2;
                   if (this.direction) {
                       this.xiaoxin.setFlippedX(true);
                   }
                   else
                       this.xiaoxin.setFlippedX(false);
               }
           } else if (this._hitTimes >= 231 && this._hitTimes <= 300) {
               if (this.displayFlag != 3) {
                   // this.xiaoxin = this.xiaoxinStatus3;
                   this.xiaoxin.setDisplayFrame(this.cache.getSpriteFrame("xiaoxin_2.png"));
                   this.displayFlag = 3;
                   if (this.direction) {
                       this.xiaoxin.setFlippedX(true);
                   }
                   else
                       this.xiaoxin.setFlippedX(false);
               }
           }

          if (this.initFlag == false) {
               this.progressHit.setPercentage(parseInt(80 / 380 * 100));
               this.currentPer = parseInt(80 / 380 * 100);
               this.initFlag = true;
           } else {
               this.progressHit.setPercentage(parseInt((this._hitTimes + 80) / 380 * 100));
               this.movingarrow.setPosition(this.movingarrow.getPosition().x,this.dHeight+(this._hitTimes+80)*this.vHeight);
           }
        }
    },
    onTouchesBegan:function (touches, event) {
        this.isMouseDown = true;
        this.touchBeginPositionX =  touches[0].getLocation().x;
    },
    onTouchesMoved:function (touches, event) {
        if (this.isMouseDown) {
            if (touches) {
               if(this.direction)
                {
                    if (this.touchBeginPositionX - touches[0].getLocation().x>=20) {
                        cc.AudioEngine.getInstance().playEffect("res/hit100.mp3");
                        this.touchBeginPositionX = touches[0].getLocation().x;
                        this._hitTimes += this.hitDt;
                        this._historyHit = this._hitTimes;

                       // this._touchmovingFlag = true;
                        if(this._hitTimes>=1&&this._hitTimes<=40&&this.displayFlag!=1)
                        {
                            this.displayFlag =  1;
                        }
                        else if(this._hitTimes>=101&&this._hitTimes<=230&&this.displayFlag!=2)
                        {
                            this.xiaoxin.setDisplayFrame(this.cache.getSpriteFrame("xiaoxin_3.png"));
                            this.displayFlag =  2;
                        }else if(this._hitTimes>=231&&this._hitTimes<=300&&this.displayFlag!=3)
                        {
                            this.xiaoxin.setDisplayFrame(this.cache.getSpriteFrame("xiaoxin_2.png"));
                            this.displayFlag =  3;
                        }

                        this.xiaoxinLeftRed.setVisible(false);
                        this.xiaoxinRightRed.setVisible(false);

                        if (this._hitTimes>40&&this._hitTimes<=100) {
                            this.xiaoxinLeftRed.setVisible(true);
                        }
                        if(this.displayFlag != 1)
                            this.xiaoxin.setFlippedX(false);
                        else
                            this.xiaoxin.setFlippedX(true);

                        this.direction = 0;
                        this.scoreLabel.setString("分數 "+this._hitTimes.toString());
                    }
                        //this._touchmovingFlag = false;
                }else
                {
                    if (touches[0].getLocation().x - this.touchBeginPositionX >=20) {
                        cc.AudioEngine.getInstance().playEffect("res/hit100.mp3");
                        this.touchBeginPositionX = touches[0].getLocation().x;
                        this._hitTimes += this.hitDt;
                        this._historyHit = this._hitTimes;

                        //this._touchmovingFlag = true;
                        if(this._hitTimes>=1&&this._hitTimes<=40&&this.displayFlag!=1)
                        {

                                this.displayFlag = 1;
                        }
                        else if(this._hitTimes>=101&&this._hitTimes<=230&&this.displayFlag!=2)
                        {
                            this.xiaoxin.setDisplayFrame(this.cache.getSpriteFrame("xiaoxin_3.png"));
                            this.displayFlag =  2;
                        }else if(this._hitTimes>=231&&this._hitTimes<=300&&this.displayFlag!=3)
                        {
                            this.xiaoxin.setDisplayFrame(this.cache.getSpriteFrame("xiaoxin_2.png"));
                            this.displayFlag =  3;
                        }

                        this.xiaoxinLeftRed.setVisible(false);
                        this.xiaoxinRightRed.setVisible(false)

                        if (this._hitTimes>40&&this._hitTimes<=100) {
                            this.xiaoxinRightRed.setVisible(true);
                        }
                        if(this.displayFlag != 1)
                            this.xiaoxin.setFlippedX(true);
                        else
                        this.xiaoxin.setFlippedX(false);

                        this.direction = 1;
                        this.scoreLabel.setString("分數 "+this._hitTimes.toString());
                    }
                        //this._touchmovingFlag = false;
                }

            }
        }
    },
    onTouchesEnded:function (touches, event) {
        this.isMouseDown = false;
        //this._touchmovingFlag = false;
    },
    onTouchesCancelled:function (touches, event) {
        console.log("onTouchesCancelled");
    }
});

var GameMainScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new GameLayer();
        layer.init();
        this.addChild(layer);
    }
});

