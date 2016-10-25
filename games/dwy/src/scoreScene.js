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
var g_score = {"score":[
    {"titleimg":"4.png","percent":"0","titleName":"杀马特"},
    {"titleimg":"4.png","percent":"5","titleName":"杀马特"},
    {"titleimg":"4.png","percent":"10","titleName":"杀马特"},
    {"titleimg":"7.png","percent":"15","titleName":"搓男子"},
    {"titleimg":"7.png","percent":"20","titleName":"搓男子"},
    {"titleimg":"9.png","percent":"25","titleName":"神之右手"},
    {"titleimg":"9.png","percent":"30","titleName":"神之右手"},
    {"titleimg":"9.png","percent":"35","titleName":"神之右手"},
    {"titleimg":"3.png","percent":"40","titleName":"猛男子"},
    {"titleimg":"3.png","percent":"45","titleName":"猛男子"},
    {"titleimg":"3.png","percent":"50","titleName":"猛男子"},
    {"titleimg":"2.png","percent":"55","titleName":"炫迈王子"},
    {"titleimg":"2.png","percent":"60","titleName":"炫迈王子"},
    {"titleimg":"2.png","percent":"65","titleName":"炫迈王子"},
    {"titleimg":"6.png","percent":"70","titleName":"大力出奇迹"},
    {"titleimg":"6.png","percent":"75","titleName":"大力出奇迹"},
    {"titleimg":"6.png","percent":"80","titleName":"大力出奇迹"},
    {"titleimg":"1.png","percent":"85","titleName":"快枪手"},
    {"titleimg":"1.png","percent":"90","titleName":"快枪手"},
    {"titleimg":"8.png","percent":"95","titleName":"金手指"},
    {"titleimg":"8.png","percent":"99","titleName":"金手指"}
]
};

var scoreLayer = cc.LayerColor.extend({
    isMouseDown:false,
    circle:null,
    score:null,
    arrow:null,
    title:null,
    titlecontent:null,
    titlescore:null,
    timeDisplay:null,
    result:null,
    resultContent:null,
    touchBeginPositionX:null,
    replayButton:null,
    shareButton:null,
    shareimg:null,
    lazyLayer:null,
    scoreIndex:null,
    sharestring:null,
    timehead_2:null,

    init:function () {
        //////////////////////////////
        // 1. super init first
        this._super();

        if(myScore==300){
            this.sharestring = '來打我呀！我只用了 ' + myTimeString + '秒噢!';
            if(myTime<15000){
                this.scoreIndex = 20;}
            else if(myTime>=15000&&myTime<16000){
                this.scoreIndex = 19;}
            else if(myTime>=16000&&myTime<17000){
                this.scoreIndex = 18;}
            else if(myTime>=17000&&myTime<18000){
                this.scoreIndex = 17;}
            else if(myTime>=18000&&myTime<19000){
                this.scoreIndex = 16;}
            else if(myTime>=19000&&myTime<20000){
                this.scoreIndex = 15;}
            else if(myTime>=20000&&myTime<21000){
                this.scoreIndex = 14;}
            else if(myTime>=21000&&myTime<22000){
                this.scoreIndex = 13;}
            else if(myTime>=22000&&myTime<23000){
                this.scoreIndex = 12;}
            else if(myTime>=23000&&myTime<24000){
                this.scoreIndex = 11;}
            else if(myTime>=24000&&myTime<25000){
                this.scoreIndex = 10;}
            else if(myTime>=25000&&myTime<26000){
                this.scoreIndex = 9;}
            else if(myTime>=26000&&myTime<27000){
                this.scoreIndex = 8;}
            else if(myTime>=27000&&myTime<28000){
                this.scoreIndex = 7;}
            else if(myTime>=28000&&myTime<29000){
                this.scoreIndex = 6;}
            else if(myTime>=29000&&myTime<30000){
                this.scoreIndex = 5;}
            else if(myTime>=30000&&myTime<31000){
                this.scoreIndex = 4;}
            else if(myTime>=31000&&myTime<32000){
                this.scoreIndex = 3;}
            else if(myTime>=32000&&myTime<33000){
                this.scoreIndex = 2;}
            else if(myTime>=33000){
                this.scoreIndex = 1;}
            else{
                this.scoreIndex = 0;}
        }else{
            this.scoreIndex = 0;
            this.sharestring = '來打我呀！我居然撐不了'+myTimeString+'秒 ';
        }

        var temp = g_score.score[this.scoreIndex].percent + "%玩家.荣获'" + g_score.score[this.scoreIndex].titleName+"'称号,敢来一战?";
        //weixin api
        //"desc": '耗时 ' + myTimeString + '秒,我已击败'+g_score.score[this.scoreIndex].percent+'%玩家.荣获'+g_score.score[this.scoreIndex].titleName+'称号,敢来一战?',
		var stitle= '耗时 ' + myTimeString + '秒,我已击败'+g_score.score[this.scoreIndex].percent+'%玩家.荣获'+g_score.score[this.scoreIndex].titleName+'称号,敢来一战?';
		dp_submitScore(myTimeString,stitle);
        //console.log(this.scoreIndex);
        this.size = cc.Director.getInstance().getWinSize();


        this.lazyLayer = cc.LayerColor.create(cc.c4b(0,0,0,255*0.9),this.size.width,this.size.height);

        this.addChild(this.lazyLayer,0);


        // add all xiaoxin sprite
        this.cache = cc.SpriteFrameCache.getInstance();


        //title
        this.title = cc.Sprite.createWithSpriteFrame(this.cache.getSpriteFrame("dakuangkuang.png"));// getInstance().create("xiaoxin_1.png");
        this.title.setAnchorPoint(cc.p(0,1));
        this.title.setPosition(this.size.width*(47/640), this.size.height*((960-177)/960));

        //titlecontent
        this.titlecontent = cc.Sprite.createWithSpriteFrame(this.cache.getSpriteFrame("toumiaoshu.png"));

        this.titlecontent.setAnchorPoint(cc.p(0,1));
        this.titlecontent.setPosition(this.size.width*(97/640), this.size.height*((960 - 219)/960)) ;

        //titlescore
        this.titlescore = cc.LabelTTF.create(g_score.score[this.scoreIndex].percent,  'Times New Roman',40);
        this.titlescore.setAnchorPoint(cc.p(0,1));
        this.titlescore.setColor(cc.c3(255,0,0)) ;
        this.titlescore.setFontSize(40);
       //this.titlescore.setString('63');
        this.titlescore.setPosition(this.size.width*(346/640), this.size.height*((960-230)/960));
        this.lazyLayer.addChild(this.titlescore);

        //.setString(" "+this._time.toString() + "'" + (this._intval * 1000).toString().substring(1, 3));
        //time
        this.timehead_2 = cc.Sprite.createWithSpriteFrame(this.cache.getSpriteFrame("fenshu.png"));
        this.timehead_2.setAnchorPoint(cc.p(0,1));
        this.timehead_2.setPosition(this.size.width*(229/640), this.size.height*((960-121)/960));

        this.timeDisplay = cc.LabelTTF.create(myTimeString, "Times New Roman", 40);
        this.timeDisplay.setAnchorPoint(cc.p(0,1));
        this.timeDisplay.setPosition(this.size.width*(335/640), this.size.height*((960-121)/960));

        this.timeDisplay.setColor(cc.c3b(255,255,255));

        this.timeDisplay.setFontSize(40);




        //result
        this.result = cc.Sprite.createWithSpriteFrame(this.cache.getSpriteFrame("wanjmiaoshu.png"));// getInstance().create("xiaoxin_1.png");
        this.result.setAnchorPoint(cc.p(0,1));
        this.result.setPosition(this.size.width*(163/640), this.size.height*((960-450)/960));

        //resultcontent
        this.resultcontent = cc.Sprite.createWithSpriteFrame(this.cache.getSpriteFrame(g_score.score[this.scoreIndex].titleimg));// getInstance().create("xiaoxin_1.png");
        this.resultcontent.setAnchorPoint(cc.p(0,1));
        this.resultcontent.setPosition(this.size.width*(285/640), this.size.height*((960-445)/960));


        //replay
         var replayItem = cc.MenuItemImage.create(s_ui1,s_ui2,function(){cc.Director.getInstance().replaceScene(new GameMainScene());},this);
        replayItem.setAnchorPoint(cc.p(0,1));

        this.replayButton = cc.Menu.create(replayItem);

        this.replayButton.setAnchorPoint(cc.p(0,1));
        //this.shareButton.loadTextures("anjian.png","anxia.png","",ccs.TextureResType.plist);
        this.replayButton.setPosition(this.size.width*(64/640), this.size.height*((960-700)/960));
        /*this.shareButton.addTouchEventListener(function(object,touchType){
            if(touchType == cc.TOUCH_ENDED) {
                console.log("click");
            }
        }.bind(this),this);*/
        this.replayButton.setTouchEnabled(true);

       var playAgain = cc.Sprite.createWithSpriteFrame(this.cache.getSpriteFrame("zailai.png"));
           playAgain.setAnchorPoint(cc.p(0,1));
           playAgain.setPosition(this.size.width*(92/640), this.size.height*((960-713)/960));


        //share
            var shareItem = cc.MenuItemImage.create(s_ui1,s_ui2,function(){
				dp_share();
            /*var sharelayer = cc.LayerColor.create(cc.c4b(0,0,0,255*0.95),this.size.width,this.size.height);


            sharelayer.setTag(999);
            this.addChild(sharelayer,20);

            var shareicon = cc.Sprite.createWithSpriteFrame(this.cache.getSpriteFrame("fenxiang.png"));
            shareicon.setAnchorPoint(cc.p(0,1));
            shareicon.setPosition(this.size.width*(411/640), this.size.height*((960-123)/960));


            var desLabel = cc.LabelTTF.create("点击右上角\n分享到朋友圈",  'Times New Roman',48);

            desLabel.setAnchorPoint(cc.p(0,1));
            desLabel.setPosition(this.size.width*(110/640), this.size.height*((960-80)/960));



            var arrowToShare = cc.Sprite.createWithSpriteFrame(this.cache.getSpriteFrame("xiejiantou.png"));
            arrowToShare.setAnchorPoint(cc.p(0,1));
            arrowToShare.setPosition(this.size.width*(481/640), this.size.height*((960-12)/960));

            sharelayer.addChild(shareicon,10);
            sharelayer.addChild(arrowToShare,10);
            sharelayer.addChild(desLabel,11);
            sharelayer.setTouchEnabled(true);

            
			
            this.shareButton.setTouchEnabled(false);*/

        },this);
        shareItem.setAnchorPoint(cc.p(0,1));
        this.shareButton = cc.Menu.create(shareItem);

        this.shareButton.setAnchorPoint(cc.p(0,1));
        //this.replayButton.loadTextures("anjian.png","anxia.png","",ccs.TextureResType.plist);
        this.shareButton.setPosition(this.size.width*(374/640), this.size.height*((960-699)/960));
        this.shareButton.setTouchEnabled(true);

        var shareIt = cc.Sprite.createWithSpriteFrame(this.cache.getSpriteFrame("xuanyao.png"));
        shareIt.setAnchorPoint(cc.p(0,1));
        shareIt.setPosition(this.size.width*(409/640), this.size.height*((960-715)/960));


        this.lazyLayer.addChild(this.title, 0);
        this.lazyLayer.addChild(this.titlecontent, 1);
        this.lazyLayer.addChild(this.result, 0);
        this.lazyLayer.addChild(this.resultcontent,1);
        this.lazyLayer.addChild(this.timehead_2,1);
        this.lazyLayer.addChild(this.timeDisplay,1);

        this.lazyLayer.addChild(this.shareButton,1);
        this.lazyLayer.addChild(this.replayButton,1);
        this.lazyLayer.addChild(playAgain,1);
        this.lazyLayer.addChild(shareIt,1);



        this.setTouchEnabled(true);
        return true;
    },
   onTouchesBegan:function (touches, event) {
        this.isMouseDown = true;


   },
    onTouchesMoved:function (touches, event) {
        if (this.isMouseDown) {
            if (touches) {

            }
        }
    },

    onTouchesEnded:function (touches, event) {
        this.isMouseDown = false;
        if(this.getChildByTag(999))
        {
            this.shareButton.setTouchEnabled(true);
            this.removeChildByTag(999);

        }
        // var arrowActionMove = cc.MoveTo.create(1, cc.p(this.size.width*(198/640), this.size.height*((960 - 704)/960)));
        //this.arrow.runAction(arrowActionMove);
        //var labelActionMove = cc.MoveTo.create(1, cc.p(this.size.width*(309/640), this.size.height*((960 - 760)/960)));
        //this.tLabel.runAction(labelActionMove);

    },
    onTouchesCancelled:function (touches, event) {
        console.log("onTouchesCancelled");
    }
});

var scoreScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new scoreLayer();
        layer.init();
        this.addChild(layer);
    }
});
/**
 * Created by Xiaoting on 8/29/14.
 */
