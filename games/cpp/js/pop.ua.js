POP.Ua = {

    agent: navigator.userAgent.toLowerCase(),
    android: false,
    ipad: false,
    ipod: false,
    iphone: false,
    appleMobile: false,
    hasTouch: false,
    action: '点击',
    orientation: 'portrait',
    maxW: null,
    maxH: null,

    init: function() {
   
        this.android = (this.agent.indexOf('android') > -1) ? true : false;
        this.ipad = (this.agent.indexOf('ipad') > -1) ? true : false;
        this.ipod = (this.agent.indexOf('ipod') > -1) ? true : false;
        this.iphone = (this.agent.indexOf('iphone') > -1) ? true : false;

        this.appleMobile = this.ipad || this.ipod || this.iphone;

        this.hasTouch = this.android || this.ipad || this.ipod || this.iphone;

        if (this.hasTouch) {
            this.action = '点击';
        }

    }

};

