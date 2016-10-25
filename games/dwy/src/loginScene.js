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



var LoginLayer = cc.Layer.extend({
    isMouseDown:false,
    circle:null,
    background:null,
    name:null,
    arrow:null,
    tLabel:null,
    logo:null,
    cache :null,
    touchBeginPositionX:null,
    moved:null,
    size:null,

    init:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        //weixin api
         this.size = cc.Director.getInstance().getWinSize();

        this.moved = false;
        var lazyLayer = cc.Layer.create();
        this.addChild(lazyLayer,0);


        // add all xiaoxin sprite"
        this.cache = cc.SpriteFrameCache.getInstance();
        this.cache.addSpriteFrames(p_Xiaoxin,s_Xiaoxin);

        //back
        this.background = cc.Sprite.createWithSpriteFrame(this.cache.getSpriteFrame("xiaoxin_2.png"));// getInstance().create("xiaoxin_1.png");
        this.background.setPosition(this.size.width / 2, this.size.height / 2);

        //title
        this.name = cc.Sprite.createWithSpriteFrame(this.cache.getSpriteFrame("mingzi.png"));

        this.name.setAnchorPoint(cc.p(0,1));
        this.name.setPosition(this.size.width*(131/640), this.size.height*((960 - 92)/960)) ;

        //arrow
        this.arrow = cc.Sprite.createWithSpriteFrame(this.cache.getSpriteFrame("jiantou.png"));
        this.arrow.setAnchorPoint(cc.p(0,1));
        this.arrow.setPosition(this.size.width*(198/640), this.size.height*((960 - 704)/960));

        //label
        this.tLabel = cc.Sprite.createWithSpriteFrame(this.cache.getSpriteFrame("huadong.png"));
        this.tLabel.setAnchorPoint(cc.p(0,0));
        this.tLabel.setPosition(this.size.width*(309/640), this.size.height*((960 - 765)/960));

        //logo
        this.logo = cc.Sprite.createWithSpriteFrame(this.cache.getSpriteFrame("gongsi.png"));
        this.logo.setAnchorPoint(cc.p(0,1));
        this.logo.setPosition(this.size.width*(258/640), this.size.height*((960 - 917)/960));

        lazyLayer.addChild(this.background, 0);
        lazyLayer.addChild(this.name,1);
        lazyLayer.addChild(this.arrow,1);
        lazyLayer.addChild(this.tLabel,1);
        lazyLayer.addChild(this.logo,2);


        this.setTouchEnabled(true);
        return true;
    },

    onTouchesBegan:function (touches, event) {
        this.isMouseDown = true;
        this.touchBeginPositionX =  touches[0].getLocation().x;

        this.arrow.stopAllActions();
        this.tLabel.stopAllActions();

    },
    onTouchesMoved:function (touches, event) {
        if (this.isMouseDown&&(touches[0].getLocation().y<=this.size.height/3)) {
            if (touches) {
                 var dis = touches[0].getLocation().x - this.touchBeginPositionX;
                this.arrow.setPosition(cc.p(this.arrow.getPosition().x + dis,this.arrow.getPosition().y));// = this.arrow.getPosition().x + dis;
                this.tLabel.setPosition(cc.p(this.tLabel.getPosition().x + dis,this.tLabel.getPosition().y));
                this.touchBeginPositionX =  touches[0].getLocation().x;

                if(touches[0].getLocation().x >= this.size.width*0.75)
                {
                    cc.AudioEngine.getInstance().playEffect("res/hit100.mp3");
                    this.setTouchEnabled(false);
                    var actionMove = cc.MoveTo.create(1, cc.p(this.size.width*1.5 ,this.arrow.getPosition().y));
                     this.arrow.runAction(actionMove);


                    var labelActionMove = cc.MoveTo.create(1, cc.p(this.size.width*1.5 ,this.tLabel.getPosition().y));
                    var arrowSeq = cc.Sequence.create(labelActionMove, cc.CallFunc.create(function ()
                    {

                        cc.Director.getInstance().replaceScene(new GameMainScene());
                    }, this));

                    this.tLabel.runAction(arrowSeq);


                }

              }
         }
    },

    onTouchesEnded:function (touches, event) {
        this.isMouseDown = false;
        if(touches[0].getLocation().x < this.size.width*0.75)
        {
            this.arrow.setPosition(this.size.width*(198/640), this.size.height*((960 - 704)/960));
            this.tLabel.setPosition(this.size.width*(309/640), this.size.height*((960 - 760)/960));
        }
    },
    onTouchesCancelled:function (touches, event) {
        console.log("onTouchesCancelled");
    }
});

var GameLoginScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new LoginLayer();
        layer.init();
        this.addChild(layer);
    }
});

/**
 * Created by Xiaoting on 8/29/14.
 */
