var NUM = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];

var TILE = [
    [0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5],
    [1, 0], [1, 1], [1, 2], [1, 3], [1, 4], [1, 5],
    [2, 0], [2, 1], [2, 2], [2, 3], [2, 4], [2, 5],
    [3, 0], [3, 1], [3, 2], [3, 3], [3, 4], [3, 5], 
    [4, 0], [4, 1], [4, 2], [4, 3], [4, 4], [4, 5],
    [5, 0], [5, 1], [5, 2], [5, 3], [5, 4], [5, 5],
];

var HelloWorldLayer = cc.Layer.extend({
    ctor:function () {
        this._super();  

        var title = cc.createSprite('@看看你有多老', {
            anchor: [0.5, 1.0],
            xy: [360, 1260],
            color: '#000',
            fontSize: 44
        });
        this.addChild(title);

        var hint = cc.createSprite('@数字盖上后，按记忆从小到大顺序点开', {
            anchor: [0.5, 1.0],
            xy: [360, 1180],
            color: '#000',
            fontSize: 34
        });
        this.addChild(hint);

        var timeTxt = cc.createSprite('@还有3秒，抓紧时间记忆', {
            anchor: [0.5, 1.0],
            xy: [360, 1100],
            color: '#f00',
            fontSize: 34            
        });
        this.addChild(timeTxt);
        this.timeTxt = timeTxt;

        this.round = 0;

        this.nSprites = [];

        var tileNode = cc.TileLayer.create(120, 120);
        tileNode.attr({
            xy: [0, 240]
        });
        this.addChild(tileNode);
        this.tileNode = tileNode;

        var self = this;

        this.delegate(tileNode, 'click', function(touch){
            var location = touch.getLocation();
            location = tileNode.convertToNodeSpace(location);
            var pos = tileNode.locationToTile(location);
            var tile = tileNode.getTileAt(pos.x, pos.y);
            //console.log(tile._value);
            if(!this.gameOver && tile && self._numbers.length){
                var n = self._numbers.pop();
                if(tile._value == n){
                    tile.setString(tile._value);
                    if(self._numbers.length == 0){
                        self.round++;
                        self.newRound();
                    }
                }else{
                    self.gameOver();
                }
            }
        });

        this.newRound();

        var text = '记忆力超群有木有？谁来挑战谁知道！';

        WeixinApi.ready(function(Api) {
            // 隐藏
            // Api.hideOptionMenu();

            // 显示
            // Api.showOptionMenu();

            // 微信分享的数据
            var wxData = {
                "appId": "", // 服务号可以填写appId
                "imgUrl" : 'http://g.lanrenmb.com/games/duolao/460.jpg',
                "link" : 'http://g.lanrenmb.com/games/duolao/',
                "desc" : text,
                "title" : '来比记忆力'
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
                    // alert("分享失败");
                },
                // 分享成功
                confirm : function(resp) {
                    // 分享成功了，我们是不是可以做一些分享统计呢？
                    window.location.href='http://g.lanrenmb.com';
                    // alert("分享成功");
                },
                // 整个分享过程结束
                all : function(resp) {
                    // 如果你做的是一个鼓励用户进行分享的产品，在这里是不是可以给用户一些反馈了？
                    // alert("分享结束");
                    self.getParent().reload();
                    if(window.location) window.location.href = "http://g.lanrenmb.com";
                }
            };

             // 用户点开右上角popup菜单后，点击分享给好友，会执行下面这个代码
            Api.shareToFriend(wxData, wxCallbacks);

            // 点击分享到朋友圈，会执行下面这个代码
            Api.shareToTimeline(wxData, wxCallbacks);

            // 点击分享到腾讯微博，会执行下面这个代码
            Api.shareToWeibo(wxData, wxCallbacks);
        });  

        return true;
    },
    newRound: function(){
        var tileNode = this.tileNode;

        for(var i = 0; i < this.nSprites.length; i++){
            var sp = this.nSprites[i];
            sp.removeFromParent(true);
        }
        tileNode._tiles = [];

        //新回合
        var num = NUM;
        var self = this;
        var delay = 5; //5秒盖上

        if(this.round < 3){
            delay = 3;
        }

        if(this.round < 8){
            num = NUM.slice(0, 10);
        }else if(this.round < 12){
            num = NUM.slice(0, 16);
        }

        var count = this.round + 3;

        var numbers = cc.random(num, count);
        var tiles = cc.random(TILE, count);
        //console.log(tiles);

        for(var i = 0; i < numbers.length; i++){
            //console.log([-60 + tiles[i][0] * 120, 240 + tiles[i][1] * 120]);

            var sprite = cc.createSprite('@'+numbers[i], {
                fontSize: cc.random(80, 95),
                color: cc.random(['#f00', '#000', 'blue', '#666', 'green', 'olive', '#773', 'purple']),
                rotationX: cc.random(-40, 40),
            });
            tileNode.setTileAt(sprite, tiles[i][0], tiles[i][1]);
            sprite._value = numbers[i]; 
            this.nSprites.push(sprite);
        }

        this._numbers = [];

        var timer = setInterval(function(){
            delay--;
            if(delay > 0){
                self.timeTxt.setString('还有'+delay+'秒，抓紧时间记忆');
            }else{
                clearInterval(timer);
                self.timeTxt.setString('开始!');
                self._numbers = numbers.sort(function(a,b){
                    return b-a;
                });
                self.cover();
            }
        }, 1000);
    },
    cover: function(){
        var self = this;

        for(var i = 0; i < this.nSprites.length; i++){
            this.nSprites[i].setString('?');
        }
    },
    gameOver: function(){
        this.gameOver = true;
        for(var i = 0; i < this.nSprites.length; i++){
            this.nSprites[i].setString(this.nSprites[i]._value);
        }

        var self = this;

        var layerMask = cc.LayerColor.create(cc.color('rgba(0,0,0,128)'));
        layerMask.attr({
            zOrder: 88,
            opacity: 0
        });
        self.addChild(layerMask);  
        layerMask.delay(0.5).then(function(){
            layerMask.attr('opacity', 128);
            var share = cc.createSprite('res/share.png', {
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

            var text;
            if(self.round < 1){
                text = '兔兔对你无语，脑残片要按时吃，别过量，这样才能萌萌哒！';
            }
            else if(self.round < 2){
                text = 'ORZ。。你就算有年轻的身体，也是一颗苍老的心，大脑年龄为90岁！';
            }
            else if(self.round < 3){
                text = '兔兔觉得你的大脑已经不年轻了，大概有70岁吧！';
            }
            else if(self.round < 4){
                text = '兔兔觉得你的大脑年龄起码有50岁了！';
            }
            else if(self.round < 5){
                text = '你觉得自己年轻吗？要不和别人比比？';
            }
            else if(self.round < 6){
                text = '妈妈说只有年轻人才能记住这些，还有谁要挑战一下？';
            }
            else if(self.round < 7){
                text = '记忆力超群有木有？谁来挑战谁知道！';
            }
            else if(self.round < 8){
                text = '好吧，兔兔觉得你一定是作弊了！';
            }
            else{
                text = '你就是神~偶崇拜你~分享出去让别人羡慕吧！';
            }

            var result = cc.createSprite('@'+text, {
                xy: [360, 720],
                fontSize: 46,
                size: [700, 300],
                textAlign: 'center'
            });
            layerMask.addChild(result);            

        }).act();
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

