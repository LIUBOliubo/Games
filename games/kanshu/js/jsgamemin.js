var jsGame = window.jsGame || {};
(function () {
    window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || window.setTimeout;
    window.cancelAnimationFrame = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || window.msCancelAnimationFrame || window.clearTimeout;
    String || (String = {});
    if (!String.format) String.format = function () {
        if (arguments.length == 0) return null;
        for (var a = arguments[0], c, d = 1, e = arguments.length; d < e; d++) {
            c = RegExp("\\{" + (d - 1) + "\\}", "gm");
            a = a.replace(c, arguments[d])
        }
        return a
    };
    if (!String.getByteLength) String.getByteLength = function (a) {
        var c = 0,
			d = a || "",
			e = d.length;
        for (a = 0; a < e; a++) c += d.charCodeAt(a) >= 0 & d.charCodeAt(a) <= 255 ? 1 : 2;
        return c
    };
    if (!Array || !Array.prototype) Array.prototype = {};
    Array.prototype.indexOfAttr = function (a, c) {
        for (var d = (typeof a).toLowerCase(), e = -1, l = 0, q = this.length; l < q; l++) if (d == "string" && this[l][a] == c || d == "number" && this[l] == a) {
            e = l;
            break
        }
        return e
    };
    var b = {
        canvas: {
            id: "jsGameScreen",
            defaultId: "jsGameScreen",
            defaultFont: "12px Arial",
            defaultWidth: 240,
            defaultHeight: 320,
            defaultColor: "rgb(0, 0, 0)",
            bgColor: "#333333",
            cavansDoms: [],
            ctxs: [],
            device: "",
            fps: 1,
            touch: false,
            zoom: 1
        },
        system: {
            loadRes: null,
            pageLoad: null,
            menu: null,
            run: null,
            runFn: null,
            rafRun: null,
            stop: null,
            over: null,
            zone: null,
            active: null,
            lastDate: Date.now(),
            timeout: 30,
            isPause: false,
            gameFlow: 0,
            zoneArgs: null,
            activeArgs: null,
            spendTime: 0,
            loadResTimer: null,
            playTimer: null
        },
        event: {
            key: 0,
            keys: {
                up: false,
                down: false,
                left: false,
                right: false,
                a: false,
                b: false,
                c: false,
                menu: false,
                quit: false
            },
            lastKey: {
                up: false,
                down: false,
                left: false,
                right: false,
                a: false,
                b: false,
                c: false,
                menu: false,
                quit: false
            },
            pressedKey: {
                up: false,
                down: false,
                left: false,
                right: false,
                a: false,
                b: false,
                c: false,
                menu: false,
                quit: false
            },
            keyPressCtrl: {
                up: true,
                down: true,
                left: true,
                right: true,
                a: true,
                b: true,
                c: true,
                menu: true,
                quit: true
            },
            keyDownGo: false,
            keyUpGo: false,
            keyPressedGo: false,
            keyDownCallBack: null,
            keyUpCallBack: null,
            orientationChange: null,
            touchStart: null,
            touchEnd: null,
            touchMove: null,
            touchCancel: null,
            clickCallBack: null,
            mouseDownCallBack: null,
            mouseUpCallBack: null,
            mouseMoveCallBack: null,
            mouseDowned: false
        },
        image: {
            imgs: {},
            imgObjs: [],
            initImgs: {},
            asyncImgObjs: {},
            imgCount: 0,
            countLoaded: 0,
            reCountLoaded: 0
        },
        audio: {
            audios: [],
            fuckSkip: 0
        },
        ajax: {
            xhrObj: null,
            pool: [],
            poolLength: 5,
            date: Date.now(),
            isTimeout: false,
            param: {
                type: "get",
                data: null,
                dataType: "html",
                url: "",
                timeout: 5E3,
                before: function () { },
                success: function () { },
                error: function () { },
                complete: function () { }
            }
        },
        request: {
            gets: []
        },
        timer: {
            lockIds: {}
        },
        error: {
            img: {
                msg: "��Դ���س���",
                callBack: function () { }
            }
        }
    },
		i = {
		    canvas: {
		        context: {
		            base: 0
		        },
		        graphics: {
		            HCENTER: 1,
		            VCENTER: 2,
		            LEFT: 4,
		            RIGHT: 8,
		            TOP: 16,
		            BOTTOM: 32,
		            ANCHOR_LT: 20,
		            ANCHOR_LV: 6,
		            ANCHOR_LB: 36,
		            ANCHOR_HT: 17,
		            ANCHOR_HV: 3,
		            ANCHOR_HB: 33,
		            ANCHOR_RT: 24,
		            ANCHOR_RV: 10,
		            ANCHOR_RB: 40
		        },
		        trans: {
		            TRANS_MIRROR: 2,
		            TRANS_NONE: 0,
		            TRANS_ROT90: 5,
		            TRANS_ROT180: 3,
		            TRANS_ROT270: 6,
		            TRANS_MIRROR_ROT90: 7,
		            TRANS_MIRROR_ROT180: 1,
		            TRANS_MIRROR_ROT270: 4
		        }
		    },
		    event: {
		        key: {
		            up: 38,
		            down: 40,
		            left: 37,
		            right: 39,
		            a: 90,
		            b: 88,
		            c: 67,
		            menu: -6,
		            quit: -7,
		            pcmenu: 49,
		            pcquit: 50
		        }
		    },
		    system: {
		        gameFlowType: {
		            menu: 0,
		            run: 1,
		            stop: 2,
		            over: 3,
		            zone: 4,
		            active: 5,
		            loadImage: 6
		        }
		    }
		},
		k = {
		    getCanvasDom: function () {
		        var a;
		        return function () {
		            a || (a = jsGame.getDom(b.canvas.defaultId));
		            return a
		        }
		    }(),
		    getOffsetX: function (a) {
		        return a.offsetX || (a.targetTouches && a.targetTouches[0] ? a.targetTouches[0].clientX - k.getCanvasDom().offsetLeft : a.clientX - k.getCanvasDom().offsetLeft) || 0
		    },
		    getOffsetY: function (a) {
		        return a.offsetY || (a.targetTouches && a.targetTouches[0] ? a.targetTouches[0].clientY - k.getCanvasDom().offsetTop : a.clientY - k.getCanvasDom().offsetTop) || 0
		    },
		    keydown: function (a) {
		        var c = k.checkKey(a.keyCode);
		        if (b.event.keyDownGo) if (b.event.keys[c] != undefined) b.event.keys[c] = true;
		        if (b.event.keyUpGo) if (b.event.lastKey[c] != undefined) b.event.lastKey[c] = false;
		        if (b.event.keyPressCtrl[c] && b.event.keyPressedGo) {
		            if (b.event.pressedKey[c] != undefined) b.event.pressedKey[c] = true;
		            b.event.keyPressCtrl[c] = false
		        }
		        b.event.keyDownCallBack != null && b.event.keyDownCallBack(a)
		    },
		    keyup: function (a) {
		        var c = k.checkKey(a.keyCode);
		        if (b.event.keyDownGo) if (b.event.keys[c] != undefined) b.event.keys[c] = false;
		        if (b.event.keyUpGo) if (b.event.lastKey[c] != undefined) b.event.lastKey[c] = true;
		        if (b.event.keyPressedGo) {
		            if (b.event.pressedKey[c] != undefined) b.event.pressedKey[c] = false;
		            b.event.keyPressCtrl[c] = true
		        }
		        b.event.keyUpCallBack != null && b.event.keyUpCallBack(a)
		    },
		    orientationchange: function (a) {
		        b.event.orientationChange != null && b.event.orientationChange(a)
		    },
		    touchstart: function (a) {
		        b.event.touchStart != null && b.event.touchStart(a, k.getOffsetX(a), k.getOffsetY(a))
		    },
		    touchend: function (a) {
		        a.preventDefault();
		        b.event.touchEnd != null && b.event.touchEnd(a, k.getOffsetX(a), k.getOffsetY(a))
		    },
		    touchmove: function (a) {
		        a.touches.length == 1 && a.preventDefault();
		        b.event.touchMove != null && b.event.touchMove(a, k.getOffsetX(a), k.getOffsetY(a))
		    },
		    touchcancel: function (a) {
		        b.event.touchCancel != null && b.event.touchCancel(a, k.getOffsetX(a), k.getOffsetY(a))
		    },
		    click: function (a) {
		        b.event.clickCallBack != null && b.event.clickCallBack(a, k.getOffsetX(a), k.getOffsetY(a))
		    },
		    mouseDown: function (a) {
		        b.event.mouseDownCallBack != null && b.event.mouseDownCallBack(a, k.getOffsetX(a), k.getOffsetY(a))
		    },
		    mouseUp: function (a) {
		        b.event.mouseUpCallBack != null && b.event.mouseUpCallBack(a, k.getOffsetX(a), k.getOffsetY(a))
		    },
		    mouseMove: function (a) {
		        b.event.mouseMoveCallBack != null && b.event.mouseMoveCallBack(a, k.getOffsetX(a), k.getOffsetY(a))
		    },
		    checkKey: function (a) {
		        var c = "0";
		        switch (a) {
		            case i.event.key.up:
		                c = "up";
		                break;
		            case i.event.key.down:
		                c = "down";
		                break;
		            case i.event.key.left:
		                c = "left";
		                break;
		            case i.event.key.right:
		                c = "right";
		                break;
		            case i.event.key.a:
		                c = "a";
		                break;
		            case i.event.key.b:
		                c = "b";
		                break;
		            case i.event.key.c:
		                c = "c";
		                break;
		            case i.event.key.menu:
		                c = "menu";
		                break;
		            case i.event.key.quit:
		                c = "quit";
		                break;
		            case i.event.key.pcmenu:
		                c = "menu";
		                break;
		            case i.event.key.pcquit:
		                c = "quit"
		        }
		        return c
		    },
		    getDeviceConfig: function () {
		        var a = navigator.userAgent.toLowerCase();
		        return a.indexOf("duopaosafari") != -1 ? {
		            device: "duopaoSafari",
		            fps: 1,
		            touch: true,
		            zoom: 1
		        } : a.indexOf("iphone") != -1 || a.indexOf("ipod") != -1 ? {
		            device: "iphone",
		            fps: 1,
		            touch: true,
		            zoom: 1
		        } : a.indexOf("ipad") != -1 ? {
		            device: "ipad",
		            fps: 1,
		            touch: true,
		            zoom: 1
		        } : a.indexOf("duopaoandroid") != -1 ? {
		            device: "duopaoAndroid",
		            fps: 1,
		            touch: true,
		            zoom: 1
		        } : a.indexOf("duopaowindowsphone") != -1 ? {
		            device: "duopaoWindowsPhone",
		            fps: 1,
		            touch: true,
		            zoom: 1
		        } : a.indexOf("opera mobi") != -1 ? {
		            device: "operamobile",
		            fps: 1,
		            touch: true,
		            zoom: 1
		        } : a.indexOf("flyflow") != -1 ? {
		            device: "flyflow",
		            fps: 1,
		            touch: true,
		            zoom: 1
		        } : a.indexOf("android") != -1 ? {
		            device: "android",
		            fps: 1,
		            touch: true,
		            zoom: 1
		        } : a.indexOf("iemobile") != -1 ? {
		            device: "iemobile",
		            fps: 1,
		            touch: false,
		            zoom: 1
		        } : a.indexOf("j2me") != -1 ? {
		            device: "j2me",
		            fps: 1,
		            touch: false,
		            zoom: 1
		        } : a.indexOf("symbian v5") != -1 ? {
		            device: "symbian5",
		            fps: 1,
		            touch: true,
		            zoom: 1
		        } : a.indexOf("symbian v3") != -1 ? {
		            device: "symbian3",
		            fps: 1,
		            touch: false,
		            zoom: 1
		        } : a.indexOf("chrome") != -1 ? {
		            device: "chrome",
		            fps: 1,
		            touch: false,
		            zoom: 1
		        } : a.indexOf("msie") != -1 ? {
		            device: "ie",
		            fps: 0.5,
		            touch: false,
		            zoom: 1
		        } : a.indexOf("safari") != -1 ? {
		            device: "safari",
		            fps: 1,
		            touch: false,
		            zoom: 1
		        } : a.indexOf("opera") != -1 ? {
		            device: "opera",
		            fps: 1,
		            touch: false,
		            zoom: 1
		        } : a.indexOf("firefox") != -1 ? {
		            device: "firefox",
		            fps: 1,
		            touch: false,
		            zoom: 1
		        } : {
		            device: "",
		            fps: 1,
		            touch: false,
		            zoom: 1
		        }
		    },
		    loadImages: function (a, c) {
		        if (parseInt(b.image.reCountLoaded) < parseInt(b.image.imgObjs.length * 0.3)) b.image.reCountLoaded += 0.1;
		        var d = jsGame.canvas.screen.getWidth(),
					e = jsGame.canvas.screen.getHeight(),
					l = parseInt(d * 0.5),
					q = parseInt(d - l >> 1),
					s = parseInt(e - 20 >> 1);
		        a = parseInt(b.image.reCountLoaded) > a ? parseInt(b.image.reCountLoaded) : a;
		        a = a > c ? c : a;
		        loadStor = "loading: " + a + " / " + c;
		        jsGame.canvas.fillStyle(b.canvas.bgColor).fillRect(0, 0, d, e).strokeRect(q, s, l, 20).fillStyle("#FFFFFF").fillRect(q, s, l, 20).fillStyle("#00FFFF").fillRect(q + 1, s + 1, parseInt(a / c * (l - 2)), 18).drawString(loadStor, 0, s + 14, jsGame.graphics.VCENTER, true, "#000000", "#FFFFFF");
		        loadStor = null
		    },
		    setImage: function (a, c, d) {
		        if (!a || !c) return false;
		        if (!b.image.imgs[a]) {
		            b.image.imgs[a] = jsGame.classes.getImage();
		            b.image.imgs[a].onload = function () {
		                b.image.countLoaded++;
		                this.loaded = true
		            };
		            b.image.imgs[a].onerror = function () {
		                var e = jsGame.args.getError("img");
		                b.image.tips = [e.msg];
		                e.callBack()
		            };
		            b.image.imgs[a].src = c;
		            b.image.imgs[a].id = a;
		            b.image.imgs[a].url = c;
		            b.image.imgs[a].benchId = d
		        }
		    },
		    initImageCallBack: null,
		    loadImageCallBack: null,
		    getAnchor: function (a, c, d, e, l) {
		        switch (l) {
		            case i.canvas.graphics.ANCHOR_HV:
		                a -= parseInt(d / 2);
		                c -= parseInt(e / 2);
		                break;
		            case i.canvas.graphics.ANCHOR_LV:
		                c -= parseInt(e / 2);
		                break;
		            case i.canvas.graphics.ANCHOR_RV:
		                a -= d;
		                c -= parseInt(e / 2);
		                break;
		            case i.canvas.graphics.ANCHOR_HT:
		                a -= parseInt(d / 2);
		                break;
		            case i.canvas.graphics.ANCHOR_RT:
		                a -= d;
		                break;
		            case i.canvas.graphics.ANCHOR_HB:
		                a -= parseInt(d / 2);
		                c -= e;
		                break;
		            case i.canvas.graphics.ANCHOR_LB:
		                c -= e;
		                break;
		            case i.canvas.graphics.ANCHOR_RB:
		                a -= d;
		                c -= e
		        }
		        return {
		            x: a,
		            y: c
		        }
		    },
		    initUrlParams: function (a) {
		        if (a.indexOf("?") >= 0) {
		            var c = a.split("?");
		            a = [];
		            if (c[1].indexOf("&") >= 0) a = c[1].split("&");
		            else a.push(c[1]);
		            c = [];
		            for (var d = 0; d < a.length; d++) if (a[d].indexOf("=") >= 0) {
		                c = a[d].split("=");
		                b.request.gets[c[0]] = c[1]
		            }
		        }
		    }
		};
    jsGame = {
        init: function (a, c) {
            if (!a && !c) {
                this.version = 1.8;
                this.request.init();
                this.events.init();
                this.canvas.initDevice()
            } else {
                b.canvas.defaultWidth = a;
                b.canvas.defaultHeight = c
            }
            return this
        },
        extend: function (a, c, d) {
            d = d || {};
            if (c) {
                var e = function () { };
                e.prototype = c.prototype;
                a.prototype = new e;
                a.prototype.constructor = a;
                e = null
            }
            for (var l in d) a.prototype[l] = d[l];
            d = null;
            return a
        },
        error: function (a) {
            throw Error(a);
        },
        ajax: function (a) {
            a && b.ajax.pool.length < b.ajax.poolLength && b.ajax.pool.push(a);
            if (a && a.clear) b.ajax.pool = [];
            if (b.ajax.xhrObj == null && b.ajax.pool.length > 0) {
                b.ajax.xhrObj = this.objExtend(b.ajax.param, b.ajax.pool.shift() || {});
                b.ajax.xhrObj.type = b.ajax.xhrObj.type.toUpperCase();
                b.ajax.xhrObj.dataType = b.ajax.xhrObj.dataType.toUpperCase();
                b.ajax.xhrObj.xhr = jsGame.classes.getAjax();
                b.ajax.isTimeout = false;
                b.ajax.xhrObj.xhr.onreadystatechange = function () {
                    if (b.ajax.isTimeout) return false;
                    if (b.ajax.xhrObj && b.ajax.xhrObj.xhr.readyState == 4) {
                        if (b.ajax.data) {
                            clearTimeout(b.ajax.data);
                            b.ajax.data = null
                        }
                        if (b.ajax.xhrObj.xhr.status == 200) {
                            var e;
                            switch (b.ajax.xhrObj.dataType) {
                                case "HTML":
                                    e = b.ajax.xhrObj.xhr.responseText;
                                    break;
                                default:
                                    e = b.ajax.xhrObj.xhr.responseText.replace(/<[^>].*?>/g, "");
                                    break;
                                case "JSON":
                                    e = jsGame.getJson(b.ajax.xhrObj.xhr.responseText)
                            }
                            b.ajax.xhrObj.success(e, b.ajax.xhrObj);
                            b.ajax.xhrObj.complete(b.ajax.xhrObj)
                        } else b.ajax.xhrObj.error(b.ajax.xhrObj.xhr, "error", b.ajax.xhrObj);
                        b.ajax.xhrObj = null;
                        jsGame.ajax()
                    }
                };
                b.ajax.xhrObj.xhr.open(b.ajax.xhrObj.type, b.ajax.xhrObj.url, true);
                b.ajax.xhrObj.before(b.ajax.xhrObj);
                b.ajax.xhrObj.type == "POST" && b.ajax.xhrObj.xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded;charset=UTF-8");
                a = null;
                var c = b.ajax.xhrObj.data;
                if (typeof c == "string") a = c;
                else if (typeof c == "object") {
                    a = [];
                    for (var d in c) a.push(d + "=" + c[d]);
                    a = a.join("&")
                }
                b.ajax.xhrObj.xhr.send(a);
                a = c = null;
                b.ajax.data = setTimeout(function () {
                    jsGame.ajax({
                        clear: true
                    });
                    b.ajax.isTimeout = true;
                    if (b.ajax.xhrObj) {
                        b.ajax.xhrObj.error(b.ajax.xhrObj.xhr, "timeout", b.ajax.xhrObj);
                        b.ajax.xhrObj = null
                    }
                }, b.ajax.xhrObj.timeout)
            }
            return this
        },
        getDom: function (a) {
            try {
                return document.getElementById(a)
            } catch (c) {
                return document.all[a]
            }
        },
        getScript: function () {
            var a = document.getElementsByTagName("head")[0],
				c = null,
				d = null;
            _error = _success = null;
            _disposed = function () {
                if (d) {
                    clearTimeout(d);
                    d = null
                }
            };
            return function (e) {
                if (!a || c) return false;
                e = jsGame.objExtend({
                    url: "",
                    before: function () { },
                    success: function () { },
                    error: function () { },
                    timeout: 5E3,
                    contentType: "text/javascript",
                    destroyed: true
                }, e || {});
                if (e.url != "") {
                    e.before();
                    c = document.createElement("script");
                    c.type = e.contentType;
                    c.async = true;
                    c.src = e.url;
                    c.destroyed = e.destroyed;
                    _success = e.success;
                    _error = e.error;
                    c.onload = function () {
                        _disposed();
                        if (_success) {
                            _success();
                            _success = null
                        }
                        this.destroyed && a.removeChild(this);
                        c = null
                    };
                    a.appendChild(c);
                    _disposed();
                    d = setTimeout(function () {
                        _disposed();
                        if (_error) {
                            _error("timeout");
                            _error = null
                        }
                        c && c.destroyed && a.removeChild(c);
                        c = null
                    }, e.timeout)
                }
                e = null;
                return jsGame
            }
        }(),
        objExtend: function () {
            var a = this.clone(arguments[0]) || {},
				c = 1,
				d = arguments.length,
				e = false,
				l;
            if (typeof a === "boolean") {
                e = a;
                a = arguments[1] || {};
                c = 2
            }
            if (typeof a !== "object") a = {};
            if (d == c) {
                a = this;
                --c
            }
            for (; c < d; c++) if ((l = arguments[c]) != null) for (var q in l) {
                var s = a[q],
					r = l[q];
                if (a !== r) if (e && r && typeof r === "object" && !r.nodeType) a[q] = this.objExtend(e, s || (r.length != null ? [] : {}), r);
                else if (r !== undefined) a[q] = r
            }
            return a
        },
        getJson: function (a) {
            var c = {};
            try {
                c = window.JSON ? JSON.parse(a) : eval("(" + a + ")")
            } catch (d) { }
            return c
        },
        clone: function (a) {
            var c = a || [];
            if (typeof c == "object") if (c.length != undefined) {
                a = [];
                for (var d = 0, e = c.length; d < e; d++) if (c[d] !== undefined) a[d] = c[d] != null && typeof c[d] == "object" ? c[d].length != undefined ? c[d].slice(0) : c[d] : c[d]
            } else {
                a = {};
                for (d in c) if (c[d] !== undefined) a[d] = c[d] != null && typeof c[d] == "object" ? c[d].length != undefined ? c[d].slice(0) : c[d] : c[d]
            }
            return a
        },
        classes: {
            init: function (a) {
                a.classes.timer.prototype.stop = function () {
                    if (this.timeout) {
                        clearTimeout(this.timeout);
                        this.timeout = null
                    }
                };
                a.classes.timer.prototype.start = function (c) {
                    if (c) {
                        this.time = this._initTime;
                        this._dateTime = Date.now()
                    }
                    this.stop();
                    this.timeout = setTimeout(function (d) {
                        var e = Date.now(),
							l = parseInt(Math.round((e - d._dateTime) / d.millisec));
                        d._dateTime = e;
                        d.time -= l;
                        d.callBack ? d.callBack(d) : d.stop();
                        if (d.time >= 0) d.start();
                        else {
                            d.stop();
                            d.time = 0
                        }
                    }, this.millisec, this)
                };
                a.classes.webSocket.prototype.send = function (c) {
                    this.socket.send(c)
                };
                a.classes.webSocket.prototype.close = function () {
                    this.socket.close()
                }
            },
            getAjax: function () {
                return new XMLHttpRequest
            },
            observer: function () {
                this.group = [];
                this.register = function (a) {
                    if (a == null) return this;
                    jsGame.commandFuns.inArray(a, this.group) == -1 && this.group.push(a);
                    return this
                };
                this.unregister = function (a) {
                    if (a == null) return this;
                    a = jsGame.commandFuns.inArray(a, this.group);
                    a > -1 && this.group.splice(a, 1);
                    return this
                };
                this.notify = function (a) {
                    for (var c = 0; c < this.group.length; c++) if (this.group[c] != null) this.group[c](a);
                    return this
                };
                this.clear = function () {
                    this.group.length > 0 && this.group.splice(0, this.group.length);
                    return this
                }
            },
            getImage: function () {
                return new Image
            },
            timer: function (a, c, d, e, l) {
                this.id = a;
                this._initTime = c;
                this._dateTime = Date.now();
                this.time = this._initTime;
                this.callBack = d;
                this.millisec = e || 1E3;
                this.data = l;
                this.timeout = null
            },
            webSocket: function (a, c, d, e, l) {
                this.ipPort = a || "";
                this.socket = new WebSocket(this.ipPort);
                this.socket.onopen = c;
                this.socket.onmessage = d;
                this.socket.onclose = e;
                this.socket.onerror = l
            }
        },
        commandFuns: function () {
            var a = {
                arr: [],
                len: 0,
                v: 0
            };
            return {
                registerNotify: function (c, d) {
                    c != null && c.register(d)
                },
                rangeRegisterNotify: function (c, d) {
                    for (var e = 0; e < d.length; e++) jsGame.commandFuns.registerNotify(c, d[e])
                },
                unRegisterNotify: function (c, d) {
                    c != null && c.unregister(d)
                },
                rangeUnRegisterNotify: function (c, d) {
                    for (var e = 0; e < d.length; e++) jsGame.commandFuns.unRegisterNotify(c, d[e])
                },
                getRandom: function (c, d) {
                    if (d) return Math.round(Math.random() * (d - c) + c);
                    else {
                        var e = c;
                        if (!e || e < 0) e = 0;
                        return Math.round(Math.random() * e)
                    }
                },
                getArray: function (c, d) {
                    a.arr = [];
                    a.len = c.toString().length;
                    a.v = c;
                    for (var e = 0; e < a.len; e++) {
                        a.arr.push(a.v % 10);
                        a.v = parseInt(a.v / 10)
                    }
                    d || a.arr.reverse();
                    return a.arr
                },
                inArray: function (c, d) {
                    var e, l = d.length;
                    for (e = 0; e < l; e++) if (c == d[e]) return e;
                    return -1
                },
                collisionCheck: function (c, d, e, l, q, s, r, w) {
                    if (r && Math.abs(c + parseInt(e / 2) - (q + parseInt(r / 2))) < parseInt((e + r) / 2) && Math.abs(d + parseInt(l / 2) - (s + parseInt(w / 2))) < parseInt((l + w) / 2)) return true;
                    return false
                },
                circleCollisionCheck: function (c, d, e, l, q, s) {
                    c = Math.abs(c - l);
                    d = Math.abs(d - q);
                    if (Math.sqrt(c * c + d * d) < e + s) return true;
                    return false
                }
            }
        }(),
        args: {
            ajax: {
                type: "get",
                data: null,
                dataType: "html",
                url: "",
                before: function () { },
                success: function () { },
                error: function (a, c, d) {
                    this.error(c + "[" + d + "]")
                },
                complete: function () { }
            },
            setError: function (a, c, d) {
                b.error[a] = {
                    msg: c,
                    callBack: d
                };
                return jsGame
            },
            getError: function (a) {
                if (b.error[a]) return b.error[a];
                return {
                    msg: "",
                    callBack: function () { }
                }
            },
            setAjax: function (a, c) {
                if (b.ajax[a]) b.ajax[a] = c;
                return jsGame
            },
            xhr: null,
            gc: {
                collectWaitTime: 1E3
            }
        },
        localStorage: function () {
            var a, c, d = function () {
                var e;
                try {
                    e = window.localStorage;
                    if (!e.getItem) e.getItem = function () {
                        return null
                    };
                    if (!e.setItem) e.setItem = function () { }
                } catch (l) {
                    e = {
                        getItem: function () {
                            return null
                        },
                        setItem: function () { }
                    }
                }
                return e
            };
            return {
                init: function () {
                    a = this;
                    c || (c = d());
                    return a
                },
                setItem: function (e, l) {
                    try {
                        c.setItem(e, l)
                    } catch (q) { }
                    return a
                },
                getItem: function (e) {
                    return c.getItem(e)
                },
                removeItem: function (e) {
                    c.removeItem(e);
                    return a
                },
                clear: function () {
                    c.clear();
                    return a
                },
                key: function (e) {
                    return c.key(e)
                },
                getLength: function () {
                    return c.length
                },
                base: function () {
                    return jsGame
                }
            }
        }(),
        sessionStorage: function () {
            var a, c, d = function () {
                var e;
                try {
                    e = window.sessionStorage;
                    if (!e.getItem) e.getItem = function () {
                        return null
                    };
                    if (!e.setItem) e.setItem = function () { }
                } catch (l) {
                    e = {
                        getItem: function () {
                            return null
                        },
                        setItem: function () { }
                    }
                }
                return e
            };
            return {
                init: function () {
                    a = this;
                    c || (c = d());
                    return a
                },
                setItem: function (e, l) {
                    c.setItem(e, l);
                    return a
                },
                getItem: function (e) {
                    return c.getItem(e)
                },
                removeItem: function (e) {
                    c.removeItem(e);
                    return a
                },
                clear: function () {
                    c.clear();
                    return a
                },
                key: function (e) {
                    return c.key(e)
                },
                getLength: function () {
                    return c.length
                },
                base: function () {
                    return jsGame
                }
            }
        }(),
        pageLoad: function (a) {
            if (b.system.pageLoad == null) {
                b.system.pageLoad = a;
                this.localStorage.init();
                this.sessionStorage.init();
                this.canvas.init();
                this.audio.init();
                this.gameFlow.init();
                this.classes.init(this);
                this.graphics.ANCHOR_LT = i.canvas.graphics.ANCHOR_LT;
                this.graphics.ANCHOR_LV = i.canvas.graphics.ANCHOR_LV;
                this.graphics.ANCHOR_LB = i.canvas.graphics.ANCHOR_LB;
                this.graphics.ANCHOR_HT = i.canvas.graphics.ANCHOR_HT;
                this.graphics.ANCHOR_HV = i.canvas.graphics.ANCHOR_HV;
                this.graphics.ANCHOR_HB = i.canvas.graphics.ANCHOR_HB;
                this.graphics.ANCHOR_RT = i.canvas.graphics.ANCHOR_RT;
                this.graphics.ANCHOR_RV = i.canvas.graphics.ANCHOR_RV;
                this.graphics.ANCHOR_RB = i.canvas.graphics.ANCHOR_RB;
                a = jsGame.getDom(b.canvas.defaultId);
                if (jsGame.canvas.screen.getTouch()) {
                    window.addEventListener("orientationchange", k.orientationchange, false);
                    a.ontouchstart = k.touchstart;
                    a.ontouchend = k.touchend;
                    a.ontouchmove = k.touchmove;
                    a.ontouchcancel = k.touchcancel
                } else {
                    document.onkeydown = k.keydown;
                    document.onkeyup = k.keyup;
                    if (jsGame.canvas.screen.getDevice() != "j2me" && jsGame.canvas.screen.getDevice().indexOf("symbian") == -1) {
                        a.onclick = k.click;
                        a.onmousedown = k.mouseDown;
                        a.onmouseup = k.mouseUp;
                        a.onmousemove = k.mouseMove;
                        if (b.canvas.device == "iemobile") try {
                            window.external.notify("RM," + b.canvas.id + ",0,0," + jsGame.canvas.screen.getWidth() + "," + jsGame.canvas.screen.getHeight() + ",0")
                        } catch (c) { }
                    }
                }
                a = null;
                if (k.initImageCallBack == null) k.initImageCallBack = k.loadImages;
                this.canvas.fillStyle(b.canvas.bgColor).fillRect(0, 0, jsGame.canvas.screen.getWidth(), jsGame.canvas.screen.getHeight());
                b.system.gameFlow = i.system.gameFlowType.run;
                if (b.system.loadRes == null) {
                    b.system.loadRes = function () {
                        var d = b.image.imgObjs.length - 1;
                        k.initImageCallBack(b.image.countLoaded > d ? d : b.image.countLoaded, d);
                        if (b.system.loadResTimer) {
                            clearTimeout(b.system.loadResTimer);
                            b.system.loadResTimer = null
                        }
                        if (b.image.countLoaded == b.image.imgObjs.length) {
                            b.system.pageLoad(jsGame);
                            b.image.imgObjs = [];
                            b.image.initImgs = {};
                            b.image.countLoaded = 0;
                            b.image.reCountLoaded = 0;
                            clearTimeout(b.system.loadRes);
                            b.system.loadRes = null
                        } else b.system.loadResTimer = setTimeout(b.system.loadRes, b.system.timeout)
                    };
                    b.system.loadRes()
                }
            }
        },
        menu: function (a) {
            if (b.system.menu == null && typeof a == "function") {
                b.system.gameFlow = i.system.gameFlowType.menu;
                b.system.menu = a
            }
            return this
        },
        run: function (a) {
            if (b.system.run == null) {
                if (b.system.runFn == null) b.system.runFn = a;
                b.system.run = function () {
                    var c = Date.now();
                    switch (b.system.gameFlow) {
                        case i.system.gameFlowType.menu:
                            b.system.menu();
                            break;
                        case i.system.gameFlowType.run:
                            b.system.runFn();
                            break;
                        case i.system.gameFlowType.stop:
                            b.system.stop();
                            break;
                        case i.system.gameFlowType.over:
                            b.system.over();
                            break;
                        case i.system.gameFlowType.zone:
                            b.system.zone(b.system.zoneArgs);
                            break;
                        case i.system.gameFlowType.active:
                            b.system.active(b.system.activeArgs);
                            break;
                        case i.system.gameFlowType.loadImage:
                            if (k.loadImageCallBack != null) {
                                var d = b.image.imgCount - 1,
                                    e = b.image.countLoaded > d ? d : b.image.countLoaded;
                                k.loadImageCallBack(e, d);
                                if (e == d) {
                                    b.image.imgObjs = [];
                                    b.image.countLoaded = 0;
                                    jsGame.gameFlow.run()
                                }
                                if (b.image.imgObjs.length > 0) if (d = b.image.imgObjs.shift()) if (b.image.imgs[d.id]) b.image.countLoaded++;
                                else k.setImage(d.id, d.src, d.benchId)
                            }
                    }
                    b.system.spendTime = Date.now() - c
                };
                jsGame.play()
            }
            return this
        },
        stop: function (a) {
            if (b.system.stop == null && typeof a == "function") b.system.stop = a;
            return this
        },
        over: function (a) {
            if (b.system.over == null && typeof a == "function") b.system.over = a;
            return this
        },
        zone: function (a) {
            if (b.system.zone == null && typeof a == "function") b.system.zone = a;
            return this
        },
        active: function (a) {
            if (b.system.active == null && typeof a == "function") b.system.active = a;
            return this
        },
        play: function () {
            if (!b.system.playTimer) {
                b.system.isPause = false;
                (b.system.rafRun = function () {
                    var a = Date.now();
                    if (a - b.system.lastDate >= b.system.timeout - b.system.spendTime) {
                        b.system.lastDate = a;
                        b.system.isPause || b.system.run()
                    }
                    if (b.system.rafRun) b.system.playTimer = requestAnimationFrame(b.system.rafRun)
                })()
            }
            return this
        },
        pause: function () {
            if (b.system.playTimer) {
                b.system.isPause = true;
                b.system.rafRun = null;
                cancelAnimationFrame(b.system.playTimer);
                b.system.playTimer = null
            }
            return this
        },
        gameFlow: function () {
            var a;
            return {
                init: function () {
                    return a = this
                },
                menu: function () {
                    if (b.system.menu != null) b.system.gameFlow = i.system.gameFlowType.menu;
                    return a
                },
                run: function () {
                    if (b.system.run != null) b.system.gameFlow = i.system.gameFlowType.run;
                    return a
                },
                stop: function () {
                    if (b.system.stop != null) b.system.gameFlow = i.system.gameFlowType.stop;
                    return a
                },
                over: function () {
                    if (b.system.over != null) b.system.gameFlow = i.system.gameFlowType.over;
                    return a
                },
                zone: function (c) {
                    if (b.system.zone != null) {
                        b.system.gameFlow = i.system.gameFlowType.zone;
                        b.system.zoneArgs = c
                    }
                    return a
                },
                active: function (c) {
                    if (b.system.active != null) {
                        b.system.gameFlow = i.system.gameFlowType.active;
                        b.system.activeArgs = c
                    }
                    return a
                },
                base: function () {
                    return jsGame
                }
            }
        }(),
        keyIsPressed: function (a) {
            if (!b.event.keyDownGo) b.event.keyDownGo = true;
            return b.event.keys[a]
        },
        keyPressed: function (a) {
            if (a) {
                if (!b.event.keyPressedGo) b.event.keyPressedGo = true;
                var c = b.event.pressedKey[a];
                b.event.pressedKey[a] = false;
                return c
            } else {
                if (this.keyPressed("up")) return true;
                else if (this.keyPressed("down")) return true;
                else if (this.keyPressed("left")) return true;
                else if (this.keyPressed("right")) return true;
                else if (this.keyPressed("a")) return true;
                else if (this.keyPressed("b")) return true;
                else if (this.keyPressed("c")) return true;
                else if (this.keyPressed("menu")) return true;
                else if (this.keyPressed("quit")) return true;
                return false
            }
        },
        keyIsUnPressed: function (a) {
            if (!b.event.keyUpGo) b.event.keyUpGo = true;
            var c = b.event.lastKey[a];
            b.event.lastKey[a] = false;
            return c
        },
        keyReleased: function (a) {
            if (a) return this.keyIsUnPressed(a);
            else {
                if (this.keyReleased("up")) return true;
                else if (this.keyReleased("down")) return true;
                else if (this.keyReleased("left")) return true;
                else if (this.keyReleased("right")) return true;
                else if (this.keyReleased("a")) return true;
                else if (this.keyReleased("b")) return true;
                else if (this.keyReleased("c")) return true;
                else if (this.keyReleased("menu")) return true;
                else if (this.keyReleased("quit")) return true;
                return false
            }
        },
        keyRepeated: function (a) {
            if (a) return this.keyIsPressed(a);
            else {
                if (this.keyRepeated("up")) return true;
                else if (this.keyRepeated("down")) return true;
                else if (this.keyRepeated("left")) return true;
                else if (this.keyRepeated("right")) return true;
                else if (this.keyRepeated("a")) return true;
                else if (this.keyRepeated("b")) return true;
                else if (this.keyRepeated("c")) return true;
                else if (this.keyRepeated("menu")) return true;
                else if (this.keyRepeated("quit")) return true;
                return false
            }
        },
        canvas: function () {
            var a, c, d, e, l, q, s, r, w, x, y;
            return {
                init: function () {
                    a = this;
                    d = {
                        x: 0,
                        y: 0
                    };
                    e = {
                        fillColor: "#000000",
                        strokeColor: "#000000"
                    };
                    l = {
                        x: 0,
                        y: 0
                    };
                    q = {
                        x: 0,
                        y: 0
                    };
                    s = {
                        x: 0,
                        y: 0,
                        fillStyle: "#FFFFFF",
                        strokeStyle: "#CCCCCC"
                    };
                    return a.pass()
                },
                initDevice: function () {
                    w = k.getDeviceConfig();
                    b.canvas.device = w.device;
                    b.canvas.fps = w.fps;
                    b.canvas.touch = w.touch;
                    b.canvas.zoom = w.zoom;
                    return a
                },
                pass: function (f, g, j) {
                    var h;
                    h = !f || f == "" ? b.canvas.defaultId : f;
                    if (!b.canvas.ctxs[h]) {
                        f = f ? document.createElement("canvas") : a.base().getDom(h);
                        b.canvas.ctxs[h] = null;
                        delete b.canvas.ctxs[h];
                        b.canvas.ctxs[h] = f.getContext("2d");
                        f.width = g ? g : b.canvas.defaultWidth;
                        f.style.width = parseInt(f.width * b.canvas.zoom) + "px";
                        f.height = j ? j : b.canvas.defaultHeight;
                        f.style.height = parseInt(f.height * b.canvas.zoom) + "px";
                        b.canvas.cavansDoms[h] = null;
                        delete b.canvas.cavansDoms[h];
                        b.canvas.cavansDoms[h] = f
                    }
                    c = b.canvas.ctxs[h];
                    c.font = b.canvas.defaultFont;
                    r = b.canvas.cavansDoms[h];
                    x = parseInt(r.width);
                    y = parseInt(r.height);
                    return a.screen.setId(h)
                },
                font: function (f) {
                    b.canvas.defaultFont = f;
                    c.font = b.canvas.defaultFont;
                    return a
                },
                del: function (f) {
                    if (b.canvas.ctxs[f]) {
                        b.canvas.ctxs[f] = null;
                        delete b.canvas.ctxs[f];
                        b.canvas.cavansDoms[f] = null;
                        delete b.canvas.cavansDoms[f]
                    }
                    return a
                },
                setCurrent: function (f) {
                    return a.pass(f)
                },
                screen: {
                    setId: function (f) {
                        if (b.canvas.ctxs[f]) b.canvas.id = f;
                        return a
                    },
                    getId: function () {
                        return b.canvas.id
                    },
                    getWidth: function () {
                        return x
                    },
                    setWidth: function (f) {
                        b.canvas.defaultWidth = f;
                        if (r) {
                            r.width = b.canvas.defaultWidth;
                            r.style.width = r.width + "px";
                            x = parseInt(r.width)
                        }
                        return a
                    },
                    getHeight: function () {
                        return y
                    },
                    setHeight: function (f) {
                        b.canvas.defaultHeight = f;
                        if (r) {
                            r.height = b.canvas.defaultHeight;
                            r.style.height = r.height + "px";
                            y = parseInt(r.height)
                        }
                        return a
                    },
                    getDevice: function () {
                        return b.canvas.device
                    },
                    getFps: function () {
                        return b.canvas.fps
                    },
                    setFps: function (f) {
                        if (f > 0) b.canvas.fps = f;
                        return a
                    },
                    getTouch: function () {
                        return b.canvas.touch
                    },
                    getZoom: function () {
                        return b.canvas.zoom
                    }
                },
                fillStyle: function (f) {
                    c.fillStyle = f;
                    return a
                },
                fillRect: function (f, g, j, h, n) {
                    j = j ? j : 0;
                    h = h ? h : 0;
                    if (n) q = k.getAnchor(f, g, j, h, n);
                    else {
                        q.x = f;
                        q.y = g
                    }
                    c.fillRect(q.x, q.y, j, h);
                    return a
                },
                fillText: function (f, g, j, h) {
                    c.font = h || b.canvas.defaultFont;
                    c.fillText(f, g, j);
                    return a
                },
                clearRect: function (f, g, j, h) {
                    c.clearRect(f, g, j, h);
                    return a
                },
                clearScreen: function () {
                    return a.clearRect(0, 0, x, y)
                },
                fillScreen: function () {
                    return a.fillRect(0, 0, x, y)
                },
                strokeStyle: function (f) {
                    c.strokeStyle = f;
                    return a
                },
                lineWidth: function (f) {
                    c.lineWidth = f || 1;
                    return a
                },
                strokeRect: function (f, g, j, h, n) {
                    if (n) l = k.getAnchor(f, g, j, h, n);
                    else {
                        l.x = f;
                        l.y = g
                    }
                    c.strokeRect(l.x, l.y, j, h);
                    return a
                },
                strokeText: function (f, g, j, h) {
                    c.font = h || b.canvas.defaultFont;
                    c.strokeText(f, g, j);
                    return a
                },
                setColor: function (f, g, j) {
                    if (j == null) {
                        e.fillColor = f;
                        e.strokeColor = g ? g : f
                    } else {
                        e.fillColor = "rgb(" + f + ", " + g + ", " + j + ")";
                        e.strokeColor = e.fillColor
                    }
                    return a.fillStyle(e.fillColor).strokeStyle(e.strokeColor)
                },
                drawImage: function (f, g, j, h, n, p, m, o, t, u) {
                    var v = jsGame.getImage(f);
                    if (v.src != null) {
                        h = h <= 0 ? 0.1 : h;
                        n = n <= 0 ? 0.1 : n;
                        o = o <= 0 ? 0.1 : o;
                        t = t <= 0 ? 0.1 : t;
                        if (v.loaded) if (h) if (n) if (u) {
                            d = k.getAnchor(p, m, o, t, u);
                            c.drawImage(v, g, j, h, n, d.x, d.y, o, t)
                        } else c.drawImage(v, g, j, h, n, p, m, o, t);
                        else {
                            d = k.getAnchor(g, j, jsGame.getImage(f).width, jsGame.getImage(f).height, h);
                            c.drawImage(v, d.x, d.y)
                        } else c.drawImage(v, g, j);
                        else v.benchId && a.drawImage(v.benchId, g, j, h, n, p, m, o, t, u)
                    } else if (g = b.image.asyncImgObjs[f]) {
                        k.setImage(g.id, g.src, g.benchId);
                        b.image.asyncImgObjs[f] = null;
                        delete b.image.asyncImgObjs[f]
                    }
                    return a
                },
                drawRotate: function (f, g, j, h, n, p, m, o, t, u) {
                    var v = parseInt(o >> 1),
						z = parseInt(t >> 1),
						A = jsGame.getImage(f);
                    f = A ? A : b.canvas.cavansDoms[f];
                    p -= v;
                    m -= z;
                    c.save();
                    c.translate(p + v, m + z);
                    c.rotate(u * Math.PI / 180);
                    c.translate(-(p + v), -(m + z));
                    c.drawImage(f, g, j, h, n, p, m, o, t);
                    c.restore();
                    return a
                },
                drawCache: function (f, g, j, h, n, p, m, o, t, u) {
                    if (f = b.canvas.cavansDoms[f]) if (h) if (n) if (u) {
                        d = k.getAnchor(p, m, o, t, u);
                        c.drawImage(f, g, j, h, n, d.x, d.y, o, t)
                    } else c.drawImage(f, g, j, h, n, p, m, o, t);
                    else {
                        d = k.getAnchor(g, j, f.width, f.height, h);
                        c.drawImage(f, d.x, d.y)
                    } else c.drawImage(f, g, j);
                    return a
                },
                drawRegion: function (f, g, j, h, n, p, m, o) {
                    switch (p) {
                        default:
                            c.setTransform(1, 0, 0, 1, m, o);
                            break;
                        case i.canvas.trans.TRANS_ROT90:
                            c.setTransform(0, 1, -1, 0, n + m, o);
                            break;
                        case i.canvas.trans.TRANS_ROT180:
                            c.setTransform(-1, 0, 0, -1, h + m, n + o);
                            break;
                        case i.canvas.trans.TRANS_ROT270:
                            c.setTransform(0, -1, 1, 0, m, h + o);
                            break;
                        case i.canvas.trans.TRANS_MIRROR:
                            c.setTransform(-1, 0, 0, 1, h + m, o);
                            break;
                        case i.canvas.trans.TRANS_MIRROR_ROT90:
                            c.setTransform(0, -1, -1, 0, n + m, h + o);
                            break;
                        case i.canvas.trans.TRANS_MIRROR_ROT180:
                            c.setTransform(1, 0, 0, -1, m, n + o);
                            break;
                        case i.canvas.trans.TRANS_MIRROR_ROT270:
                            c.setTransform(0, 1, 1, 0, m, o)
                    } (jsGame.getImage(f) ? a.drawImage : a.drawCache)(f, g, j, h, n, 0, 0, h, n);
                    c.setTransform(1, 0, 0, 1, 0, 0);
                    return a
                },
                drawNumber: function (f, g, j, h, n, p, m, o, t) {
                    f = f.toString();
                    var u = f.length;
                    o = o ? o : j;
                    t = t ? t : h;
                    if (m == "center") {
                        n -= parseInt(o * u >> 1);
                        for (m = 0; m < u; m++) a.drawImage(g, parseInt(f.charAt(m)) * j, 0, j, h, n + m * o, p, o, t)
                    } else if (m == true) for (m = 0; m < u; m++) a.drawImage(g, parseInt(f.charAt(m)) * j, 0, j, h, n + m * o, p, o, t);
                    else if (m == false) for (m = u - 1; m >= 0; m--) a.drawImage(g, parseInt(f.charAt(m)) * j, 0, j, h, n - (u - 1 - m) * o, p, o, t, jsGame.graphics.ANCHOR_RT);
                    return a
                },
                moveTo: function (f, g) {
                    c.moveTo(f, g);
                    return a
                },
                lineTo: function (f, g) {
                    c.lineTo(f, g);
                    return a
                },
                stroke: function () {
                    c.stroke();
                    return a
                },
                fill: function () {
                    c.fill();
                    return a
                },
                beginPath: function () {
                    c.beginPath();
                    return a
                },
                closePath: function () {
                    c.closePath();
                    return a
                },
                arc: function (f, g, j, h, n, p) {
                    c.arc(f, g, j, h, n, p);
                    return a
                },
                quadraticCurveTo: function (f, g, j, h) {
                    c.quadraticCurveTo(f, g, j, h);
                    return a
                },
                bezierCurveTo: function (f, g, j, h, n, p) {
                    c.bezierCurveTo(f, g, j, h, n, p);
                    return a
                },
                measureText: function (f) {
                    var g = c.measureText(f),
						j = g.width;
                    g = g.height ? g.height : parseInt(c.font);
                    return {
                        width: a.screen.getDevice() == "j2me" ? c.measureText(f) : j,
                        height: g
                    }
                },
                translate: function (f, g) {
                    c.translate(f, g);
                    return a
                },
                drawLine: function (f, g, j, h) {
                    return a.beginPath().moveTo(f, g).lineTo(j, h).closePath().stroke()
                },
                drawRect: function (f, g, j, h, n) {
                    return a.strokeRect(f, g, j, h, n)
                },
                drawString: function (f, g, j, h, n, p, m, o) {
                    s.x = g;
                    s.y = j;
                    c.font = o || b.canvas.defaultFont;
                    if (h) switch (h) {
                        case i.canvas.graphics.LEFT:
                            s.x = 0;
                            break;
                        case i.canvas.graphics.VCENTER:
                            s.x = parseInt(a.screen.getWidth() - a.measureText(f).width >> 1);
                            break;
                        case i.canvas.graphics.RIGHT:
                            s.x = a.screen.getWidth() - a.measureText(f).width
                    }
                    if (n) {
                        s.fillStyle = p ? p : "#000000";
                        s.strokeStyle = m ? m : "#CCCCCC";
                        a.fillStyle(s.strokeStyle).fillText(f, s.x + 1, s.y + 1, o).fillStyle(s.fillStyle)
                    }
                    return a.fillText(f, s.x, s.y, o).fillStyle(b.canvas.defaultColor)
                },
                drawSubstring: function (f, g, j, h, n, p, m, o, t, u) {
                    return a.drawString(f.substring(g, g + j), h, n, p, m, o, t, u)
                },
                clip: function () {
                    c.clip();
                    return a
                },
                save: function () {
                    c.save();
                    return a
                },
                restore: function () {
                    c.restore();
                    return a
                },
                rect: function (f, g, j, h) {
                    c.rect(f, g, j, h);
                    return a
                },
                rotate: function (f) {
                    c.rotate(f);
                    return a
                },
                setTransform: function (f, g, j, h, n, p) {
                    c.setTransform(f, g, j, h, n, p);
                    return a
                },
                scale: function (f, g) {
                    c.scale(f, g);
                    return a
                },
                globalAlpha: function (f) {
                    c.globalAlpha = f || 1;
                    return a
                },
                getContext: function () {
                    return c
                },
                base: function () {
                    return jsGame
                }
            }
        }(),
        initImage: function (a) {
            b.image.imgs = [];
            if (a.length > 0) {
                jsGame.pushImage(a);
                for (var c = 0; c < b.image.imgObjs.length; c++) (a = b.image.imgObjs[c]) && k.setImage(a.id, a.src, a.benchId)
            }
            return this
        },
        loadImage: function (a) {
            if (b.system.gameFlow != i.system.gameFlowType.loadImage && a.length > 0) {
                b.system.gameFlow = i.system.gameFlowType.loadImage;
                b.image.imgObjs = a;
                b.image.imgCount = b.image.imgObjs.length;
                b.image.countLoaded = 0
            }
            return this
        },
        pushImage: function (a) {
            for (var c, d = 0, e = a.length; d < e; d++) if ((c = a[d]) && !b.image.initImgs[c.id]) {
                b.image.initImgs[c.id] = true;
                b.image.imgObjs.push(a[d])
            }
            return this
        },
        asyncImage: function (a) {
            for (var c, d = 0, e = a.length; d < e; d++) {
                c = a[d];
                b.image.asyncImgObjs[c.id] = c
            }
            return this
        },
        initImageCallBack: function (a) {
            if (typeof a == "function") k.initImageCallBack = a;
            return this
        },
        loadImageCallBack: function (a) {
            if (typeof a == "function") k.loadImageCallBack = a;
            return this
        },
        addImage: function (a, c) {
            if (a && c && !b.image.imgs[a]) b.image.imgs[a] = c;
            return this
        },
        getImage: function (a) {
            return b.image.imgs[a] ? b.image.imgs[a] : {
                src: null
            }
        },
        delImage: function (a) {
            if (b.image.imgs[a]) {
                b.image.imgs[a] = null;
                delete b.image.imgs[a]
            }
            return this
        },
        audio: function () {
            var a = null;
            return {
                init: function () {
                    return a = this
                },
                play: function (c) {
                    if (b.audio.audios[c]) try {
                        b.audio.audios[c].paused && b.audio.audios[c].play()
                    } catch (d) { }
                    return a
                },
                pause: function (c) {
                    if (b.audio.audios[c]) try {
                        b.audio.audios[c].pause()
                    } catch (d) { }
                    return a
                },
                noSound: function () {
                    for (var c in b.audio.audios) b.audio.audios[c].pause && b.audio.audios[c].pause();
                    return a
                },
                load: function (c) {
                    if (b.audio.audios[c]) try {
                        b.audio.audios[c].load()
                    } catch (d) { }
                    return a
                },
                replay: function (c) {
                    a.pause(c);
                    a.load(c);
                    a.play(c);
                    return a
                },
                fuckAudio: function (c) {
                    if (b.audio.audios[c] && b.audio.audios[c].paused) {
                        b.audio.fuckSkip++;
                        if (b.audio.fuckSkip == 10) {
                            a.replay(c);
                            b.audio.fuckSkip = 0
                        }
                    }
                    return a
                },
                getAudio: function (c) {
                    return b.audio.audios[c]
                }
            }
        }(),
        initAudio: function (a) {
            if (a.length > 0) {
                b.audio.audios = [];
                for (var c, d, e, l, q = 0; q < a.length; q++) if ((c = a[q]) && c.id != "" && c.src != "") {
                    d = c.loop;
                    e = c.preload;
                    l = c.autoplay;
                    b.audio.audios[c.id] = new Audio(c.src);
                    b.audio.audios[c.id].id = c.id;
                    b.audio.audios[c.id].loop = d;
                    b.audio.audios[c.id].preload = e;
                    b.audio.audios[c.id].autoplay = l
                }
            }
            return this
        },
        setRunFrequency: function (a) {
            b.system.timeout = a;
            return this
        },
        events: function () {
            var a;
            return {
                init: function () {
                    return a = this
                },
                keyDown: function (c) {
                    if (!b.event.keyDownGo) b.event.keyDownGo = true;
                    if (!b.event.keyUpGo) b.event.keyUpGo = true;
                    if (!b.event.keyPressedGo) b.event.keyPressedGo = true;
                    b.event.keyDownCallBack = c;
                    return a
                },
                keyUp: function (c) {
                    if (!b.event.keyDownGo) b.event.keyDownGo = true;
                    if (!b.event.keyUpGo) b.event.keyUpGo = true;
                    if (!b.event.keyPressedGo) b.event.keyPressedGo = true;
                    b.event.keyUpCallBack = c;
                    return a
                },
                orientationChange: function (c) {
                    b.event.orientationChange = c;
                    return a
                },
                touchStart: function (c) {
                    b.event.touchStart = c;
                    return a
                },
                touchEnd: function (c) {
                    b.event.touchEnd = c;
                    return a
                },
                touchMove: function (c) {
                    b.event.touchMove = c;
                    return a
                },
                touchCancel: function (c) {
                    b.event.touchCancel = c;
                    return a
                },
                click: function (c) {
                    b.event.clickCallBack = c;
                    return a
                },
                mouseDown: function (c) {
                    b.event.mouseDownCallBack = c;
                    return a
                },
                mouseUp: function (c) {
                    b.event.mouseUpCallBack = c;
                    return a
                },
                mouseMove: function (c) {
                    b.event.mouseMoveCallBack = c;
                    return a
                },
                base: function () {
                    return jsGame
                }
            }
        }(),
        ui: {},
        graphics: {
            HCENTER: i.canvas.graphics.HCENTER,
            VCENTER: i.canvas.graphics.VCENTER,
            LEFT: i.canvas.graphics.LEFT,
            RIGHT: i.canvas.graphics.RIGHT,
            TOP: i.canvas.graphics.TOP,
            BOTTOM: i.canvas.graphics.BOTTOM
        },
        trans: {
            TRANS_NONE: i.canvas.trans.TRANS_NONE,
            TRANS_ROT90: i.canvas.trans.TRANS_ROT90,
            TRANS_ROT180: i.canvas.trans.TRANS_ROT180,
            TRANS_ROT270: i.canvas.trans.TRANS_ROT270,
            TRANS_MIRROR: i.canvas.trans.TRANS_MIRROR,
            TRANS_MIRROR_ROT90: i.canvas.trans.TRANS_MIRROR_ROT90,
            TRANS_MIRROR_ROT180: i.canvas.trans.TRANS_MIRROR_ROT180,
            TRANS_MIRROR_ROT270: i.canvas.trans.TRANS_MIRROR_ROT270
        },
        request: function () {
            return {
                init: function () {
                    k.initUrlParams(location.href)
                },
                get: function (a) {
                    return b.request.gets[a] ? b.request.gets[a] : ""
                }
            }
        }()
    }.init()
})();
