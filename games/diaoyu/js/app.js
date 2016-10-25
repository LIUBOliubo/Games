var HelloWorldLayer = cc.Layer.extend({
    ctor:function () {
        this._super();  
        var self = this;

        var txt = cc.createSprite('@第1小时', {
            anchor: [0.5, 1.0],
            xy: [140, 1200],
            color: 'black',
            fontSize: 34
        });
        this.addChild(txt);
        this.hour = 1;

        var layer = cc.LayerColor.create(cc.color('rgba(255,255,255,255)'));
        layer.attr({
            'zOrder': 10,
            'xy' : [300, 1005]
        });
        this.addChild(layer);

        var fishman = cc.createSprite('fishman.png', {
            xy: [240, 1000],

        });

        this.addChild(fishman);

        var rope = cc.createSprite('rope.png', {
            anchor: [0.5, 1.0],
            xy: [370, 1000]
        });
        this.addChild(rope);

        var hook = cc.createSprite('hook.png', {
            xy: [0, 0]
        });
        rope.addChild(hook);
        this.hook = hook;

        this.bornFish(5);

        this.delegate(this, 'click', function(){
            //console.log('aaa');
            self.undelegate(self);

            //rope.scaleTo(7.5, 1.0, 0.2).act();
            rope.moveBy(7.5, cc.p(0, 850)).then(function(){
                self.gameOver();
            }).act();
        });

        var max = 5,t = 0;
        setInterval(function(){
            self.bornFish(cc.random(1, max));
            if(++t%10 == 0){
                max = (++max - 3) % 10 + 3;
                if(t%2 == 0){
                    self.hour++;
                    txt.setString('第'+self.hour+'小时');
                }
            }
        }, 1500);

        this.score = 0;

        // 微信分享的数据
        self.wxData = {
            "appId": "", // 服务号可以填写appId
            "imgUrl" : 'http://g.lanrenmb.com/games/diaoyu/logo.png',
            "link" : 'http://g.lanrenmb.com/games/diaoyu/',
            "desc" : '史上最寂寞的游戏：我钓的不是鱼，是寂寞',
            "title" : '钓鱼'
        };
            
        WeixinApi.ready(function(Api) {
            // 隐藏
            // Api.hideOptionMenu();

            // 显示
            // Api.showOptionMenu();

            // 分享的回调
            var wxCallbacks = {
                // 分享操作开始之前
                ready : function() {
                    // 你可以在这里对分享的数据进行重组
                    // alert("准备分享");
                },
                // 分享被用户自动取消
                cancel : function(resp) {
                    // 你可以在你的页面上给用户一个小Tip，为什么要取消呢？
                    // alert("分享被取消");
                },
                // 分享失败了
                fail : function(resp) {
                    // 分享失败了，是不是可以告诉用户：不要紧，可能是网络问题，一会儿再试试？
                    // alert("分享失败");
                },
                // 分享成功
                confirm : function(resp) {
                    // 分享成功了，我们是不是可以做一些分享统计呢？
                    //window.location.href='http://g.lanrenmb.com/';
                    // alert("分享成功");
                },
                // 整个分享过程结束
                all : function(resp) {
                    // 如果你做的是一个鼓励用户进行分享的产品，在这里是不是可以给用户一些反馈了？
                    // alert("分享结束");
                    if(self.isGameOver){
                        if(window.location) window.location.href = "http://g.lanrenmb.com/games/diaoyu/";
                    }
                }
            };

             // 用户点开右上角popup菜单后，点击分享给好友，会执行下面这个代码
            Api.shareToFriend(self.wxData, wxCallbacks);

            // 点击分享到朋友圈，会执行下面这个代码
            Api.shareToTimeline(self.wxData, wxCallbacks);

            // 点击分享到腾讯微博，会执行下面这个代码
            Api.shareToWeibo(self.wxData, wxCallbacks);
        });  

        return true;
    },
    gameOver: function(){
        var self = this;

        this.isGameOver = true;

        var layerMask = cc.LayerColor.create(cc.color('rgba(0,0,0,128)'));
        layerMask.attr({
            zOrder: 88,
            opacity: 0
        });
        self.addChild(layerMask); 

        if(self.score <= 0){
            self.wxData.desc = '蹲了'+self.hour+'个多小时，腿都麻了，我连半条鱼都木有调到';
        }else{
            self.wxData.desc = '经过'+self.hour+'个多小时的蹲点，我成功的钓到了'+self.score+'条小鱼儿';
        }
        var text = self.wxData.desc;

        layerMask.delay(0.5).then(function(){
            layerMask.attr('opacity', 128);
            var share = cc.createSprite('http://g.lanrenmb.com/games/diaoyu/share.png', {
                anchor: [1.0, 1.0],
                xy: [720, 1280],
                opacity: 0,
                scale: 0.5
            });
            layerMask.addChild(share);     

            share.fadeIn(0.5).act();
            self.delegate(layerMask, 'click', function(){
                layerMask.fadeOut(0.5).then(function(){
                    self.getParent().reload();
                }).act();
            }); 

            var result = cc.createSprite('@'+text, {
                xy: [360, 720],
                fontSize: 46,
                size: [700, 300],
                textAlign: 'center'
            });
            layerMask.addChild(result);     

            var again = cc.createSprite('@再玩一次', {
                xy: [360, 420],
                fontSize: 46,
                size: [700, 300],
                textAlign: 'center'
            });
            layerMask.addChild(again);       

        }).act();
    },
    bornFish: function(n){
        var self = this;
        for(var i = 0; i < n; i++){
            var flippedX = cc.random([0, 180]);
            var speedX = flippedX == 180 ? -cc.random(20, 100) : cc.random(20, 100);

            var fish = cc.createSprite('fish.png', {
                xy: [flippedX == 180 ? -40 : 760, cc.random(150, 850)],
                flippedX: [flippedX]
            });
            this.addChild(fish);

            (function(fish){
                var fishTimer = setInterval(function(){
                    var box = self.hook.getBoundingBoxToWorld();
                    
                    var fbox = fish.getBoundingBoxToWorld(); 

                    if(cc.rectIntersectsRect(box, fbox)){
                        clearInterval(fishTimer);
                        fish.stopAllActions();
                        fish.removeFromParent(false);
                        self.hook.addChild(fish);
                        fish.attr({
                            'xy': [0, 0],
                            rotationX: 90,
                            flippedX: 0
                        });
                        self.score++;
                    }
                }, 20);
                fish.moveBy(860 / Math.abs(speedX), cc.p(flippedX == 180 ? 860 : -860, 0)).then(function(){
                    clearInterval(fishTimer);
                    fish.removeFromParent(true);
                }).act();
            })(fish);
        }
    },
    backClicked: function(){
    	//cc.log('end');
    	cc.director.end();
    }
});

var HelloWorldScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new HelloWorldLayer();
        this.addChild(layer);
    }
});

