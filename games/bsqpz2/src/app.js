var ICONS = [
    ['ditu.png', '地图'],
    ['huluwa.png', '葫芦兄弟'],
    ['beiwanglu.png', '备忘录'],
    ['zhuyishixiang.png', '提醒事项'],
    ['taobao.png', '手机淘宝'],
    ['itunes.png', 'iTunes Store'],
    ['weixin.png', '微信'],
    ['yinyue.png', '音乐'],
    ['qq.png', 'QQ'],
    ['baokanzazhi.png', '报刊杂志'],
    ['shanku.png', '闪酷'],
    ['appstore.png', 'App Store'],
    ['tianqi.png', '天气'],
    ['shezhi.png', '设置'],
    ['youjian.png', '邮件'],
    ['2048.png', '2048']
];
var StartLayer = cc.Layer.extend({
    ctor: function(context){
        this._super();

        this.setBackground('rgba(0, 0, 0, 128)');
        var title = cc.createSprite('title.png', {
            xy: [320, 700],
        });
        this.addChild(title);      

        var buttonSp = cc.Button.create('button_bg.png', {
            xy: [320, 380],
            scale: 0.88
        });
        this.addChild(buttonSp);

        var btnTxt = cc.createSprite('@开始戳', {
            xy: [220, 40],
            fontSize: 46,
            color: '#00a538'
        });
        buttonSp.addChild(btnTxt);

        buttonSp.scaleTo(0.5, 0.92).scaleTo(0.5, 0.85).delay(1.0).repeat().act();

        var self = this;
        this.delegate(buttonSp, 'click', function(){
            self.undelegate(buttonSp);
            context.start();
        });

        return true;
    }
});

var HelloWorldLayer = cc.Layer.extend({
    ctor:function () {
        this._super();  

        this.setBackground('res/bg.jpg');

        var startLayer = new StartLayer(this);
        startLayer.attr('zIndex', 20);
        this.addChild(startLayer);

        this.startLayer = startLayer;

        return true;
    },
    start: function(){
        var self = this;
        this.startLayer.fadeOut(0.1).then(function(){
            self.startLayer.removeFromParent(true);
        }).act();
        this.initIcons();

        this.setNotice(10, 3);
       
        this.speedy = 1500;
        this.score = 0;
        this.tap = 0;
        var startTime = Date.now();
        
        setTimeout(function foo(){
            self.speedy = Math.max(self.speedy-5, 200);
            self.setNotice(5, 2);
            if(Date.now() - startTime <= 30000){
                setTimeout(foo, self.speedy);
            }else{
                self.timeout = true;
                self.checkend();
            }
        }, self.speedy);
    },
    checkend: function(){
        this.isGameOver = !this.icons.some(function(o){
            return o.notice;
        });
        if(this.isGameOver){
            //console.log('gameOver');
            this.gameOver();
        }
    },
    gameOver: function(){
        //console.log(this.score);
        var self = this;
        var i = 0;

        var hiscore = 635;
        var score = this.score;

        var rand =  Math.random()*12454;
        var rank = 0|((hiscore - score) * 34763  + rand);
        var percent = (score *34763 + rand) / (hiscore*34763+rand);
        percent = Math.min(0.999, percent);

		dp_submitScore(this.score);
        var layerMask = cc.LayerColor.create(cc.color('rgba(0,0,0,128)'));
        layerMask.attr({
            zOrder: 88,
            opacity: 0
        });
        self.addChild(layerMask);  
        layerMask.delay(0.5).then(function(){
            layerMask.attr('opacity', 192);
            var share = cc.createSprite('share_arraw.png', {
                anchor: [1.0, 1.0],
                xy: [620, 1136],
                opacity: 0,
                scale: 0.5
            });
            layerMask.addChild(share);     

            var text = cc.tmpl("强迫症真的伤不起，你干掉了{score}个新提示。分享给你的强迫症好友吧。", {tap: self.tap, score: score, percent: (percent * 100).toFixed(1)});

            var result = cc.createSprite('@'+text, {
                xy: [320, 720],
                fontSize: 36,
                size: [600, 300],
                textAlign: 'center'
            });
            layerMask.addChild(result);

            var againButton = cc.Button.create('button_bg.png', {
                xy: [320, 560],
                opacity: 0,
                scale: 0.88
            });
            layerMask.addChild(againButton);

            var text = cc.createSprite('@再玩一次', {
                xy: [220, 40],
                fontSize: 46,
                color: '#00a538',
            });
            againButton.setCascadeOpacityEnabled(true);
            againButton.addChild(text);
            againButton.delay(0.5).fadeIn(0.5).act();

            layerMask.delegate(againButton, 'click', function(){
                layerMask.fadeOut(0.5).then(function(){
                    self.getParent().reload();
                }).act();
            });

            var shareButton = cc.Button.create('button_bg.png', {
                xy: [320, 460],
                opacity: 0,
                scale: 0.88
            });
            layerMask.addChild(shareButton);

            text = cc.createSprite('@分享给好友', {
                xy: [220, 40],
                fontSize: 46,
                color: '#00a538',
            });
            shareButton.setCascadeOpacityEnabled(true);
            shareButton.addChild(text);
            shareButton.delay(0.6).fadeIn(0.5).act();

            layerMask.delegate(shareButton, 'click', function(){
               dp_share();
            });

            var otherButton = cc.Button.create('button_bg.png', {
                xy: [320, 360],
                opacity: 0,
                scale: 0.88
            });
            layerMask.addChild(otherButton);

            text = cc.createSprite('@更多游戏',{
                xy: [220, 40],
                fontSize: 46,
                color: '#00a538',
            });
            otherButton.setCascadeOpacityEnabled(true);
            otherButton.addChild(text);
            otherButton.delay(0.7).fadeIn(0.5).act();

            layerMask.delegate(otherButton, 'click', function(){
                clickMore();
            });
        }).act();          
    },
    initIcons: function(){
        var self = this;
        this.icons = [];
        for(var i = 0; i < 16; i++){
            var sp = cc.createSprite(ICONS[i][0], {
                xy: [90 + (i % 4) * 152, 1026 - (0 | (i / 4)) * 176],
                opacity: 0
            });
            this.addChild(sp);
            sp.setCascadeOpacityEnabled(false);
            /*var spTxt = cc.createSprite('@'+ICONS[i][1], {
                xy: [80 + (i % 4) * 160, 915 - (0 | (i / 4)) * 190],
                fontSize: 22
            });
            this.addChild(spTxt);*/

            (function(sp){
                self.delegate(sp, {
                    touchstart: function(){
                        var mask = cc.createSprite('mask.png', {
                            xy: [62, 61],
                        });
                        sp.addChild(mask);
                        sp.mask = mask;
                        if(sp.notice){
                            self.score += sp.notice.value;
                            self.tap++;
                            sp.notice.removeFromParent(true);
                            self.speedy -= 50;
                            delete sp.notice;
                            if(self.timeout){
                                self.checkend();
                            }
                        }
                    },
                    touchend: function(){
                        if(sp.mask){
                            sp.mask.removeFromParent(true);
                            delete sp.mask;
                        }
                    }
                });
            })(sp);
            this.icons.push(sp);
        }
    },
    setNotice: function(n, max){
        var icons = cc.random(this.icons, max);
        for(var i = 0; i < n; i++){
            var icon = cc.random(icons);
            if(!icon.notice){
                icon.notice = cc.createSprite("n.png", {
                    xy: [115, 115],
                    scale: 0.1,
                });
                icon.notice.value = 1;
                var v = cc.createSprite("@1", {
                    xy: [20, 20],
                    fontSize: 26
                });
                icon.notice.addChild(v);
                icon.notice.v = v;
                icon.addChild(icon.notice);
                icon.notice.scaleTo(0.2, 1.0).act();
            }else{
                icon.notice.value++;
                //icon.notice.attr('texture', 'n.png');
                icon.notice.v.setString(icon.notice.value);
                icon.notice.scaleTo(0.1, 1.3).scaleTo(0.1, 1.0).act();
            }
        }
    },
    backClicked: function(){

    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});

