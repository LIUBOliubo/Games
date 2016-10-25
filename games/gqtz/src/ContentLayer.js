/**
 * Created by Administrator on 2014/8/19.
 */
var ContentLayer = cc.Layer.extend
({
    target:null,
    setCallback:function(target){
        this.target = target;
    },
    ctor:function () {
        this._super();
        if( 'touches' in sys.capabilities ){
            this.setTouchEnabled(true);
        }
        else if ('mouse' in sys.capabilities )
            this.setMouseEnabled(true);

    },
    onEnter:function()
    {
        cc.registerTargetedDelegate(-126, true, this);
        this._super();
    },
    onExit:function(){
        cc.unregisterTouchDelegate(this);
        this._super();
    },
    init:function() {
        this._super();
        this.winSize = cc.Director.getInstance().getWinSize();
        var content = cc.Sprite.create(res_contents);
        content.setPosition(this.winSize.width/2+2.5,this.winSize.height/2+33);
        this.addChild(content);

        var $this = this;
        var start = cc.MenuItemImage.create(res_start,res_start,function(node){
            if($this.target ){
                $this.target.playGame();
            }
        });
        start.setPosition(0,-120);
        var menu = cc.Menu.create(start);
        menu.setTouchPriority(-126);
        this.addChild(menu);

        var player = cc.Sprite.create(headSrc==res_f_head1?res_f_head:res_k_head);
        player.setPosition(this.winSize.width/2,this.winSize.height/2);
        this.addChild(player);
        var tip = cc.Sprite.create(res_tiptitle);
        tip.setPosition(this.winSize.width/2,this.winSize.height/2+100);
        tip.runAction(cc.RepeatForever.create(cc.Sequence.create(cc.MoveBy.create(1,cc.p(0,-25)),cc.MoveBy.create(1,cc.p(0,25)))));
        this.addChild(tip);

        return true;
    },

    onTouchBegan:function (touch, event) {
        return true;
    },
    onTouchMoved:function (touch, event) {
    },
    onTouchEnded:function (touch, event) {
    }
});

ContentLayer.create = function () {
    var sg = new ContentLayer();
    if (sg && sg.init())
    {
        return sg;
    }
    return  null;
};