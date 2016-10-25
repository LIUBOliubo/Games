/**

 * Created by Administrator on 2014/8/19.

 */

var AD = ["res/ad02.png"];

var ADLink = ["http://g.lanrenmb.com"];

var androidAD = ["res/ad01.png", "res/ad03.png"];

var androidADLink = ["http://g.lanrenmb.com","http://g.lanrenmb.com"];

var iosAD = ["res/ad01.png", "res/ad03.png"];

var iosADLink = ["http://g.lanrenmb.com","http://g.lanrenmb.com"];

var adPush = function(b) {

    var e = document.createElement("a");

    var a = Math.random() * AD.length >> 0;

    e.target = "_blank";

    e.href = ADLink[a];

    e.addEventListener("touchstart", function() {

        _hmt.push(["_trackEvent", "button", "topAD"]);

    });

    e.style.height = 120 * window.devicePixelRatio/2 + 'px';

    e.style.background = "url(" + AD[a] + ") no-repeat";

    e.style.backgroundSize = "100%";

    e.className = "adbox2";



    var d = document.createElement("a");

    if (navigator.userAgent.match(/android/gi) != null) {

        var c = Math.random() * androidAD.length >> 0;

        d.href = androidADLink[c];

        d.style.background = "url(" + androidAD[c] + ") no-repeat bottom";

        _hmt.push(["_trackEvent", "button", "showbottomAndroidAD" + c]);

        d.addEventListener("touchstart", function() {

            _hmt.push(["_trackEvent", "button", "bottomAndroidAD" + c]);

        });

    } else {

        if (navigator.userAgent.match(/iPhone/gi) != null) {

            var c = Math.random() * iosAD.length >> 0;

            d.href = iosADLink[c];

            _hmt.push(["_trackEvent", "button", "showbottomIosAD" + c]);

            d.style.background = "url(" + iosAD[c] + ") no-repeat bottom";

            d.addEventListener("touchstart", function() {

                _hmt.push(["_trackEvent", "button", "bottomIosAD" + c]);

            });

        }

    }

    d.target = "_blank";

    d.style.height = 120 * window.devicePixelRatio/2 + 'px';

    d.style.backgroundSize = "100%";

    d.className = "adbox";

    if (b) {

        $(".adbox").remove();

        $(".adbox2").remove();

    } else {

        $("body").append(e);

        $("body").append(d);

    }

};





var headSrc = "res/k_head.png";

var head2Src = null;

var ShareWords = "哥，挺住18秒！躲开条子。这次坚持了1秒，击败了全国1%的人";

var GameLayer = cc.Layer.extend

({



    player:null,

    winSize:null,

    touchBeginPosition:null,

    playerBeginPosition:null,

    isSelected:false,

    playerSize:null,

    enmeyList:[],

    enmeyDiectionList:[],

    leftBottom:null,

    rightTop:null,

    isStart:false,

    contentLayer:null,

    coefficient:1.0,

    time:0.0,

    ctor:function () {

        this._super();

        if( 'touches' in sys.capabilities ){

            this.setTouchEnabled(true);

        }

        else if ('mouse' in sys.capabilities )

            this.setMouseEnabled(true);



    },

//    registerWithTouchDispatcher:function(){

//        cc.Director.getInstance().getTouchDispatcher()._addTargetedDelegate(this,PriorityLayer,true);

//    },

    onEnter:function()

    {

        _hmt.push(["_trackEvent", "button", "gameStart"]);

        cc.registerTargetedDelegate(-126, true, this);

        this._super();

    },

    onExit:function(){

        cc.unregisterTouchDelegate(this);

        this._super();

    },



    onTouchBegan:function (touch, event) {

        this.touchBeginPosition = touch.getLocation();

        this.playerBeginPosition = this.player.getPosition();

        var inViewPosition = this.player.convertToNodeSpace(this.touchBeginPosition);

        if(inViewPosition.x > 0  && inViewPosition.x < this.playerSize.width && inViewPosition.y > 0 && inViewPosition.y <this.playerSize.height){

            this.isSelected = true;

            if(this.isStart == false) {

                this.startGame();

                this.isStart = true;

            }



        }

        return true;

    },

    startGame:function()

    {

        //update Logic

        this.scheduleUpdate();



    },

    update:function(dt){

       this.time += dt;

        this.coefficient = dt*80;

        if(this.coefficient > 18) this.coefficient == 18;



        for(var i = 0;i < this.enmeyList.length;i++){

            var currentPosition = this.enmeyList[i].getPosition();

            var dPosition = cc.p(this.enmeyDiectionList[i].x*this.coefficient+ (this.enmeyDiectionList[i].x/Math.abs(this.enmeyDiectionList[i].x))*this.time*0.2,

				 this.enmeyDiectionList[i].y*this.coefficient+

            (this.enmeyDiectionList[i].y/Math.abs(this.enmeyDiectionList[i].y))*this.time*0.2);

            var willPosition = cc.p(currentPosition.x+dPosition.x,dPosition.y+currentPosition.y);

            if(willPosition.x < this.leftBottom.x || willPosition.x > this.rightTop.x) {

                dPosition.x = this.enmeyDiectionList[i].x = -this.enmeyDiectionList[i].x;

            }

            if(willPosition.y < this.leftBottom.y || willPosition.y > this.rightTop.y) {

                dPosition.y = this.enmeyDiectionList[i].y = -this.enmeyDiectionList[i].y;

            }

            this.enmeyList[i].setPosition(cc.p(currentPosition.x+dPosition.x,dPosition.y+currentPosition.y));

	    

      var size1 = cc.size(this.enmeyList[i].getContentSize().width-20,this.enmeyList[i].getContentSize().height-20-(i==3?5:0));

           var rect1 =  cc.rect(currentPosition.x-size1.width/2,currentPosition.y-size1.height/2,size1.width,size1.height);

         var size2 = cc.size(this.player.getContentSize().width-20,this.player.getContentSize().height-20);

            var rect2 = cc.rect(this.player.getPosition().x-size2.width/2,this.player.getPosition().y-size2.height/2,size2.width,size2.height);

	    

           if(cc.rectIntersectsRect(rect1,rect2)){

              this.enmeyList[i].setPosition(cc.p(currentPosition.x+dPosition.x,dPosition.y+currentPosition.y));

              this.enmeyList[i].setPosition(cc.p(currentPosition.x+dPosition.x,dPosition.y+currentPosition.y));



              if(this.isStart == true){

                     this.onGameOver();

                    this.isStart = false;

             }

                break;

            }

            

        }

    },



    onGameOver:function()

    {



        var words= ["小男人","宅男","成年男子","猛男"];

        var word = words[0];

        var text = 1;

        if(this.time < 1){//1-10

            word = words[0];

            text = 1+ parseInt((this.time/1.0)*9);

        }else if(this.time < 3){//10-70

            word = words[1];

            text = 10+ parseInt(((this.time-1)/2.0)*60);

        }else if(this.time < 10){

            word = words[2];//70-90

            text = 70+ parseInt(((this.time-3)/7.0)*20);



        }else{

            text = 99;

            word = words[3];

        }

        _hmt.push(["_trackEvent", "button", "gameOver" , this.time.toFixed(2)+"_s" ]);

        ShareWords ="哥，挺住18秒!这次坚持了"+this.time.toFixed(2)+"秒，击败了全国"+text+"%的人";

        this.gameOverLayer = GameOverLayer.create(this.time,text,word);

        this.gameOverLayer.setCallback(this);

        this.addChild(this.gameOverLayer);

        this.time = 0;

        this.unscheduleUpdate();

    cc.AudioEngine.getInstance().playEffect(sound_death);

        this.isSelected = false;

        adPush();

	    //$(".ad_banner").css("display","inline");

    },

    onTouchMoved:function (touch, event) {

        if(this.isSelected){

            var currentMePosition = this.convertToNodeSpace(touch.getLocation());

            var beginMePosition = this.convertToNodeSpace(this.touchBeginPosition);

            this.player.setPosition(this.playerBeginPosition.x+currentMePosition.x-beginMePosition.x,this.playerBeginPosition.y+currentMePosition.y-beginMePosition.y);

	    

        }

    },

    onTouchEnded:function (touch, event) {

        this.isSelected = false;

    },

    playGame:function(){

        try {

            _hmt.push(['_trackEvent', 'escape', 'click', 'start', '1']);

        } catch(e) {}

        this.contentLayer.removeFromParent();

    cc.AudioEngine.getInstance().playEffect(sound_start);



        this.readyGame();



    },

    readyGame:function(){

      



      if(!this.player){

        this.leftBottom = cc.p(-20,-20);

        this.rightTop = cc.p(this.winSize.width+20,this.winSize.height+20);



        //add Enemy

        var enemy1 = cc.Sprite.create(res_enemy03 );

        var enemy2 = cc.Sprite.create(res_enemy04 );

        var enemy3 = cc.Sprite.create(res_enemy02);

        var enemy4 = cc.Sprite.create(res_enemy01);



        this.addChild(enemy1);

        this.addChild(enemy2);

        this.addChild(enemy3);

        this.addChild(enemy4);



        this.enmeyList[0] = enemy1;

        this.enmeyList[1] = enemy2;

        this.enmeyList[2] = enemy3;

        this.enmeyList[3] = enemy4;





      }

      if(this.player){

		this.player.removeFromParent();

      }

        this.player = cc.Sprite.create(headSrc);

        this.playerSize = this.player.getContentSize();

        this.addChild(this.player);

	

        this.enmeyDiectionList[0] = cc.p(2,2);

        this.enmeyDiectionList[1] = cc.p(-2,1);

        this.enmeyDiectionList[2] = cc.p(-2,-2.1);

        this.enmeyDiectionList[3] = cc.p(2,-1.5);

	

        this.player.setPosition(this.winSize.width/2,this.winSize.height/2);



         this.enmeyList[0] .setPosition(this.enmeyList[0].getContentSize().width/2,this.enmeyList[0].getContentSize().height/2);

         this.enmeyList[1] .setPosition(this.winSize.width  - this.enmeyList[1].getContentSize().width/2,this.enmeyList[1].getContentSize().height/2);

         this.enmeyList[2] .setPosition(this.winSize.width  - this.enmeyList[2].getContentSize().width/2,this.winSize.height  - this.enmeyList[2].getContentSize().height/2);

         this.enmeyList[3] .setPosition(this.enmeyList[3].getContentSize().width/2,this.winSize.height  -this.enmeyList[3].getContentSize().height/2);



        for(var i = 0 ;i <this.enmeyList.length;i++){

            this.enmeyList[i].setScale(0);

            var action1 = cc.DelayTime.create(parseFloat(Math.random()*0.5));

            var action2 = cc.EaseBounce.create(cc.Sequence.create(cc.ScaleTo.create(0.3,1.2),cc.ScaleTo.create(0.3,1)));

            console.log(action1)

            this.enmeyList[i].runAction(cc.Sequence.create(action1,action2));

        }

    },

    aginGame:function(){

        if(Math.random() > 0.5){

            headSrc = res_k_head1;

            head2Src = res_k_head2;

        }else{

            headSrc = res_f_head1;

            head2Src = res_f_head2;

        }

        try {

            _hmt.push(['_trackEvent', 'escape18', 'click', 'restart', '1']);

        } catch(e) {}

        adPush(true);

        // $(".ad_banner").css("display","none");



        this.gameOverLayer.removeFromParent();

	    cc.AudioEngine.getInstance().playEffect(sound_restart);



        this.readyGame();

    },

    init:function()

    {

        var bRet = false;

        if(this._super()) {

            bRet = true;

        }



        cc.AudioEngine.getInstance().preloadEffect(sound_restart);

        cc.AudioEngine.getInstance().preloadEffect(sound_death);

        cc.AudioEngine.getInstance().preloadEffect(sound_click);

        cc.AudioEngine.getInstance().preloadEffect(sound_start);



        if(Math.random() > 0.5){

            headSrc = res_k_head1;

            head2Src = res_k_head2;

        }else{

            headSrc = res_f_head1;

            head2Src = res_f_head2;

        }

        this.winSize = cc.Director.getInstance().getWinSize();

       var background = cc.Sprite.create(res_background);

        background.setPosition(this.winSize.width/2,this.winSize.height/2);

          //this.addChild(background);

        this.contentLayer = ContentLayer.create();

        this.contentLayer.setCallback(this);

        this.addChild(this.contentLayer);

        return bRet;

    }

});

var GameScene = cc.Scene.extend({



        onEnter:function(){

            var layer = GameLayer.create();

            this.addChild(layer);

            this._super();



        }

    }

);



GameLayer.scene = function () {

    var scene = cc.Scene.create();

    var layer = GameLayer.create();

    scene.addChild(layer);

    return scene;

};

GameLayer.create = function () {

    var sg = new GameLayer();

    if (sg && sg.init())

    {

        return sg;

    }

    return  null;

};