
function systemmsg(msg, fn){
    var msgbox = $("#systemmsg_box");
    msg && msg.length>0 && $('#systemmsg_text').html(msg);    
    $('#systemmsg_btn').bind('click', function(){
      msgbox.hide();
      fn && fn();
    });
    msgbox.show();
}

//手机测试
function isMobile(str) {
  return /^1[3-9]{1}[0-9]{9}$/.test(str);
}

//邮箱测试
function isEmail(str){
    var reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    if(reg.test(str)){ 
        return true;
    }
    return false;
}

//车牌测试
function isLicenseNo(str) {
  return /(^[\u4E00-\u9FA5]{1}[A-Z0-9]{6}$)|(^[A-Z]{2}[A-Z0-9]{2}[A-Z0-9\u4E00-\u9FA5]{1}[A-Z0-9]{4}$)|(^[\u4E00-\u9FA5]{1}[A-Z0-9]{5}[挂学警军港澳]{1}$)|(^[A-Z]{2}[0-9]{5}$)|(^(08|38){1}[A-Z0-9]{4}[A-Z0-9挂学警军港澳]{1}$)/i.test(str);
}

var dataForWeixin = {
    appid: 'wx13b7a88076a07cba', //平安财富帮APPID
    img_url: '',
    img_width: '100',
    img_height: '100',
    link: '',
    title: '',
    desc: '',
    callback:function(){}
};

// 当微信内置浏览器完成内部初始化后会触发WeixinJSBridgeReady事件。
(function(){
    var onBridgeReady = function(){
        var WJ = WeixinJSBridge;
        
        // 发送给好友
        WJ.on('menu:share:appmessage', function() {
            WJ.invoke('sendAppMessage', dataForWeixin, function(res) {
                dataForWeixin.callback();
            });
        });
        // 发送到朋友圈
        WJ.on('menu:share:timeline', function() {
            WJ.invoke('shareTimeline', dataForWeixin, function(res) {
                dataForWeixin.callback();
            });
        });

        // 发送到微博
        WJ.on('menu:share:weibo', function() {
            WJ.invoke('shareWeibo', dataForWeixin, function(res) {
                dataForWeixin.callback();
            });
        });
        
    	//显示右上角三个点按钮
    	WJ.call('showOptionMenu');
    };
    
    if (document.addEventListener) {
        document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
    } else if (document.attachEvent) {
        document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
        document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
    }
    
})();