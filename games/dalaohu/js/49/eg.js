(function(){
    var eg = window.endgame = {};
    eg.env = {};
    eg.env.ee = true;
    if ('WeixinJSBridge' in window) {
        eg.env.weixin = true;
    }
    // loading
    (function(){
        endgame = endgame || {};
        if (window.endgame_loading !== false) {
            endgame.loading = {
                init: function() {
                    var me = this;
                    var timer = setTimeout(function() {
                        clearTimeout(timer);
                        if (!document.body || !document.body.appendChild) {
                            this.init();
                        }
                        else {
                            var div = me.el = document.createElement('div');
                            div.style.cssText = 
                                'position:absolute;top:0;right:0;bottom:0;left:0;' + 
                                'background:rgba(0,0,0,0.95) url('+_config['isSite']+'vapp/49/loading.jpg) no-repeat center 35%;' +
                                'background-size: 60%;' + 
                                '-webkit-transition: opacity .8s linear;' +
                                'text-align: center;' +
                                'z-index: 999999;'
                                ;
                            document.body.appendChild(div);
                            if ( !('endgame_loading_auto' in window) || 
                                window.endgame_loading_auto !== false ) {
                                me.delayHide();
                            } 
                        }
                    }, 16);
                },
                hide: function() {
                    me.el.style.opacity = 0;
                },
                delayHide: function() {
                    var me = this;

                    setTimeout(function(){
                        me.el.style.opacity = 0;

                        setTimeout(function(){
                            me.el.parentNode.removeChild(me.el);
                        }, 800);
                    }, 1000);
                }
            };
            endgame.loading.init();
        }
    })();
})();