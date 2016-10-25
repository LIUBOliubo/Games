var HelloWorldLayer = cc.Layer.extend({
    ctor:function () {
        this._super(); 

        WeixinApi.ready(function(Api) {
            // 隐藏
            Api.hideOptionMenu();

            // 显示
            // Api.showOptionMenu();
        });

        this.setBackground('static/bg.jpg');

        var banner = cc.createSprite('static/banner3.jpg', {
            anchor: [0.5, 1.0],
            xy: [360, 1280],
        });
        this.addChild(banner);

        var pos = [
            [160, 200],
            [360, 200],
            [560, 200],

            [260, 480],
            [460, 480],

            [160, 760],
            [360, 760],
            [560, 760]
        ];

        for(var i = 0; i < pos.length; i++){
            var h = cc.createSprite('hole.png', {
                xy: pos[i]
            });
            this.addChild(h);
        }

        this.pos = pos;

        var timeTxt = cc.createSprite('@60 秒', {
            xy: [600, 1220],
            fontSize: 44,
            color: '#f00'
        });

        this.addChild(timeTxt);
        this._timeTxt = timeTxt;

        var startBtn = cc.Button.create('btn_play.png');
        startBtn.attr({
            xy: [580, 1140],
        });

        this.addChild(startBtn);

        var self = this;
        this.delegate(this, 'click', function(){
            startBtn.removeFromParent(true);
            self.gameStart();
            self.undelegate(self);
        });

        this._xiaosan = [];
        this._yuanpei = [];

        this._hitXiaosan = 0;

        return true;
    },
    gameStart: function(){
        var self = this;

        var _startTime = Date.now();
        self._clockTimer = self.setInterval(function(){
            var t = Date.now();
            var left = 60 - (0 | ((t - _startTime) / 1000));
            if(left < 10){
                self.bornSpeed = 0.15;
                self.bornDelay = 1500;
                self.bornNum = cc.random(3, 6);
            }
            else if(left < 25){
                self.bornSpeed = 0.25;
                self.bornDelay = 2000;
                self.bornNum = cc.random(2, 5);
            }
            else if(left < 40){
                self.bornSpeed = 0.4;
                self.bornDelay = 2600;
                self.bornNum = cc.random(1, 4);
            }
            else if(left < 55){
                self.bornNum = cc.random(1, 3);
            }
            if(left >= 0){
                self._timeTxt.setString(left + ' 秒'); 
            }else{
                self.gameOver();
            }
        }, 1000);

        this.combo = 0;

        var comboText = cc.createSprite('@连击: 0', {
            xy: [530, 1130],
            fontSize: 44,
            color: '#f60'
        });
        this.addChild(comboText);
        this.comboText = comboText;

        this.bornDelay = 3000;
        this.bornSpeed = 0.5;
        this.bornNum = 1;

        self.bornMouse();
    },
    gameOver: function(){
        if(this.bornTimer){
            this.clearTimeout(this.bornTimer);
        }

        var self = this;

        self._gameOver = true;
        self.clearInterval(self._clockTimer);

        self._yuanpei.forEach(function(o){
            self.undelegate(o);
            o.removeFromParent(true);
        });

        self._xiaosan.forEach(function(o){
            self.undelegate(o);
            o.removeFromParent(true);
        });

        var layerMask = cc.LayerColor.create(cc.color('rgba(0,0,0,128)'));
        layerMask.attr({
            zOrder: 88,
            opacity: 0
        });
        this.addChild(layerMask);
        
        var chartxt = self.getChar();

        var shareDesc = '斗小三，打流氓，我消灭' +self._hitXiaosan+ '只小三，被兔兔授予'+chartxt.charname+'称号！';

        var huodong = false;

        if(location.hash){
            //打小三活动
            var info = location.hash.slice(1).split(',');
            var name = decodeURIComponent(info[0]);
            var target = info[1] - 0;

            if(name != null && !isNaN(target)){
                huodong = true;
                if(self._hitXiaosan >= target){
                    shareDesc = '我打跑' + self._hitXiaosan + '个小三，成功把 ' + name + ' 从小三的世界里拯救了出来。';
                }else{
                    shareDesc = '我拯救失败， ' + name + ' 光荣地成为了别人的小三。';
                }
            }
        }

        layerMask.delay(0.5).then(function(){
            layerMask.attr('opacity', 128);
            var share = cc.createSprite('http://t2.qpic.cn/mblogpic/3da146bc16e94d1e2724/460', {
                anchor: [1.0, 1.0],
                xy: [720, 1280],
                opacity: 0,
                scale: 0.5
            });
            layerMask.addChild(share);
            
            if(!huodong){
                share.fadeIn(0.5).act();
                self.delegate(layerMask, 'click', function(){
                    layerMask.fadeOut(0.5).then(function(){
                        self.getParent().reload();
                    }).act();
                });
            }else{
                if(self._hitXiaosan >= target){
                    var restart = cc.createSprite('@去救别人', {
                        xy: [360, 560],
                        fontSize: 46,
                        color: '#af0'
                    });
                    layerMask.addChild(restart);
                    self.delegate(restart, 'click', function(){
                        if(window.location){
                            window.location = 'http://www.shouyoutu.com/hd/qixi.html';
                        } 
                    });
                }else{
                    var restart = cc.createSprite('@再次解救', {
                        xy: [360, 560],
                        fontSize: 46,
                        color: '#af0'
                    });
                    layerMask.addChild(restart);
                    self.delegate(restart, 'click', function(){
                        self.getParent().reload();
                    });
                }

                var shareHint = cc.createSprite('@分享到朋友圈让别人拯救', {
                    xy: [360, 320],
                    fontSize: 34,
                    color: '#fff'
                });
                layerMask.addChild(shareHint);

                self.delegate(shareHint, 'click', function(){
                    share.fadeIn(0.5).act();
                });
            }

            var text = cc.tmpl('游戏结束，你打败了{score}只小三。\n\n获得了“{charname}”的{chartype}', {
                score: self._hitXiaosan,
                charname: chartxt.charname,
                chartype: chartxt.chartype
            });
            
            if(huodong){
                if(self._hitXiaosan >= target){
                    text = '恭喜你成功把 ' + name + ' 从小三的世界里拯救了出来。';
                }else{
                    text = '拯救失败， ' + name + ' 光荣地成为了别人的小三。';
                }
            }

            var result = cc.createSprite('@'+text, {
                xy: [360, 720],
                fontSize: 46,
                size: [700, 300],
                textAlign: 'center'
            });
            layerMask.addChild(result);
        }).act();

        WeixinApi.ready(function(Api) {
            // 隐藏
            // Api.hideOptionMenu();

            // 显示
            Api.showOptionMenu();

            var hiscore = 169;

            var rand =  Math.random()*12454;
            var rank = 0|((hiscore - self._hitXiaosan) * 34763  + rand);
            var percent = (self._hitXiaosan *34763 + rand) / (hiscore*34763+rand);

            // 微信分享的数据
            var wxData = {
                "appId": "", // 服务号可以填写appId
                "imgUrl" : 'http://t2.qpic.cn/mblogpic/a6296814b8456a310c90/460',
                "link" : huodong ?  'http://www.shouyoutu.com/hd/qixi.html':'http://218.244.142.3/game/xiaosan/index.html',
                "desc" : shareDesc,
                "title" : "他是小三吗？"
            };

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
                	window.location.href='http://www.lieqicun.com/nav/top.php?id=215';
                },
                // 分享成功
                confirm : function(resp) {
                    // 分享成功了，我们是不是可以做一些分享统计呢？
                    window.location.href='http://www.lieqicun.com/nav/top.php?id=215';
                    // alert("分享成功");
                },
                // 整个分享过程结束
                all : function(resp) {
                    // 如果你做的是一个鼓励用户进行分享的产品，在这里是不是可以给用户一些反馈了？
                    // alert("分享结束");
                    layerMask.removeFromParent(true);
                    self.getParent().reload();
                    if(window.location) window.location.href = "http://www.lieqicun.com/nav/top.php?id=215";
                }
            };   
            
             // 用户点开右上角popup菜单后，点击分享给好友，会执行下面这个代码
            Api.shareToFriend(wxData, wxCallbacks);

            // 点击分享到朋友圈，会执行下面这个代码
            Api.shareToTimeline(wxData, wxCallbacks);

            // 点击分享到腾讯微博，会执行下面这个代码
            Api.shareToWeibo(wxData, wxCallbacks); 
        });

        //self.getParent().reload();
    },
    getChar: function(){
        var score = this._hitXiaosan;
        var ret = {
            charname: '邻家女孩',
            chartype: '称号'
        };

        if(score > 120){
            ret = cc.random([{
                charname: '女神',
                chartype: '尊称！'
            },{
                charname: '国士无双',
                chartype: '尊称！'
            },{
                charname: '救世主',
                chartype: '尊称！'
            }]);
        }else if(score >= 110){
            ret = cc.random([
                {
                    charname: '武神',
                    chartype: '尊称！'
                },
                {
                    charname: '皇帝',
                    chartype: '尊称'
                }
            ]);
        }else if(score >= 90){
            ret = cc.random([
                {
                    charname: '女巫',
                    chartype: '称号',
                },
                {
                    charname: '魔法师',
                    chartype: '称号'
                },
                {
                    charname: '贤者',
                    chartype: '称号'
                }
            ]);
        }else if(score >= 70){
            ret = cc.random([
                {
                    charname: '杀手',
                    chartype: '称号'
                },
                {
                    charname: '白领',
                    chartype: '称号'
                },
                {
                    charname: '大美人',
                    chartype: '称号'
                },
                {
                    charname: '小三杀手',
                    chartype: '称号'
                },
                {
                    charname: '尊贵夫人',
                    chartype: '称号'
                }
            ]);
        }else if(score >= 50){
            ret = cc.random([
                {
                    charname: '文艺青年',
                    chartype: '称号'
                },
                {
                    charname: '小清新',
                    chartype: '称号'
                },
                {
                    charname: '美人',
                    chartype: '称号'
                },
                {
                    charname: '大众情人',
                    chartype: '称号'
                },
                {
                    charname: '老公的最爱',
                    chartype: '称号'
                }
            ]);           
        }else if(score >= 30){
            ret = cc.random([
                {
                    charname: '邻家女孩',
                    chartype: '称号'
                },
                {
                    charname: '女强人',
                    chartype: '称号'
                },
                {
                    charname: '傲娇娘',
                    chartype: '称号'
                },
                {
                    charname: '萌萌哒',
                    chartype: '称号'
                },
                {
                    charname: '白富美',
                    chartype: '称号'
                }
            ]);             
        }else{
            ret = cc.random([
                {
                    charname: '蛇精病人',
                    chartype: '称号'
                },
                {
                    charname: '女屌丝',
                    chartype: '称号'
                },
                {
                    charname: '邻家女孩',
                    chartype: '称号'
                },
                {
                    charname: '萌萌哒',
                    chartype: '称号'
                },
                {
                    charname: '么么哒',
                    chartype: '称号'
                },
                {
                    charname: '女汉纸',
                    chartype: '称号'
                }                
            ]);
        }
        return ret;
    },
    bornMouse: function(n, p){
        n = n || this.bornNum; //一次出现老鼠的数量
        p = p || 0.3; //原配的概率

        if(this.bornTimer){
            this.clearTimeout(this.bornTimer);
        }

        var posSel = cc.random(this.pos, n);
        var self = this;
        
        this.bornTimer = this.setTimeout(function(){
            self.bornMouse(); 
        }, this.bornDelay);

        this._yuanpei.forEach(function(o){
            //o.stopAllActions();
            self.undelegate(o);
            o.scaleTo(0.1, 0).then(function(){
                
                o.removeFromParent(true);
            }).act();
            
        });

        this._xiaosan.forEach(function(o){
            //o.stopAllActions();
            self.combo = 0;
            self.comboText.setString('连击: ' + self.combo);
            self.undelegate(o);
            o.scaleTo(0.1, 0).then(function(){
                
                o.removeFromParent(true);
            }).act();
        });

        for(var i = 0; i < posSel.length; i++){
            if(i == 0 || Math.random() > p){
                var xiaosan = cc.createSprite('sis1.png', {
                    anchor: [0.5, 0],
                    xy: posSel[i],
                    //opacity: 0
                    scale: 0
                });
                this.addChild(xiaosan);  
                xiaosan.delay(i*0.05).scaleTo(self.bornSpeed, 1).act();
                this._xiaosan[i] = xiaosan;

                (function(xiaosan, i){  
                    self.delegate(xiaosan, 'click', function(){
                        self.combo++;
                        self.comboText.setString('连击: ' + self.combo);
                        self.undelegate(xiaosan);
                        delete self._xiaosan[i];
                        self._hitXiaosan++;
                        xiaosan.fadeOut(0.1).then(function(){
                            xiaosan.removeFromParent(true);
                            if(!self._xiaosan.some(function(o){return o != null})){
                                self.bornMouse();
                            }
                        }).act();
                        xiaosan.rotateBy(0.1, 90).act();
                    });
                })(xiaosan, i);
            }else{
                var yuanpei = cc.createSprite('sis2.png', {
                    anchor: [0.5, 0],
                    xy: posSel[i],
                    //opacity: 0
                    scale: 0
                });
                this.addChild(yuanpei);  
                yuanpei.delay(i*0.05).scaleTo(self.bornSpeed, 1).act();
                this._yuanpei[i] = yuanpei; 

                (function(yuanpei, i){  
                    self.delegate(yuanpei, 'click', function(){
                        self.undelegate(yuanpei);
                        delete self._yuanpei[i];
                        yuanpei.fadeOut(0.1).then(function(){
                            yuanpei.removeFromParent(true);
                            //游戏结束
                            self.gameOver();
                        }).act();
                        yuanpei.rotateBy(0.1, 90).act();
                    });
                })(yuanpei, i);               
            }
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

