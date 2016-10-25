var com;
(function(a) {
    (function(d) {
        var c = (function() {
            function e() {
            }
            e.init = function() {
            };
            e.clear = function() {
            };
            return e
        })();
        d.TextureCache = c
    })(a.goldenratio || (a.goldenratio = {}));
    var b = a.goldenratio
})(com || (com = {}));
var com;
(function(a) {
    (function(d) {
        var c = (function() {
            function e(f) {
                this.type = f
            }
            e.LAUNCH_GAME = "com.goldenratio.GameEvent.LAUNCH_GAME";
            e.GAME_OVER = "com.goldenratio.GameEvent.GAME_OVER";
            e.GAME_OVER_BUTTON_READY = "com.goldenratio.GameEvent.GAME_OVER_BUTTON_READY";
            e.SOUND_LOADED = "com.goldenratio.GameEvent.SOUND_LOADED";
            e.SOUND_ERROR = "com.goldenratio.GameEvent.SOUND_ERROR";
            e.BUTTON_UP = "com.goldenratio.GameEvent.BUTTON_UP";
            e.BUTTON_DOWN = "com.goldenratio.GameEvent.BUTTON_DOWN";
            e.TOGGLE_PAUSE = "com.goldenratio.GameEvent.TOGGLE_PAUSE";
            e.START_GAME = "com.goldenratio.GameEvent.START_GAME";
            e.CANVAS_MOUSE_DOOWN = "com.goldenratio.GameEvent.CANVAS_MOUSE_DOOWN";
            e.EGG_OUTOFF_BASKET = "com.goldenratio.GameEvent.EGG_OUTOFF_BASKET";
            e.EGG_INSIDE_BASKET = "com.goldenratio.GameEvent.EGG_INSIDE_BASKET";
            e.EGG_DIED = "com.goldenratio.GameEvent.EGG_DIED";
            e.SCREEN_TRANSITION_SHOW_SCREEN = "com.goldenratio.GameEvent.SCREEN_TRANSITION_SHOW_SCREEN";
            e.SCREEN_TRANSITION_HIDE_SCREEN = "com.goldenratio.GameEvent.SCREEN_TRANSITION_HIDE_SCREEN";
            e.PLAY_AGAIN_CLICK = "com.goldenratio.GameEvent.PLAY_AGAIN_CLICK";
            return e
        })();
        d.GameEvent = c
    })(a.goldenratio || (a.goldenratio = {}));
    var b = a.goldenratio
})(com || (com = {}));
var com;
(function(a) {
    (function(d) {
        var c = (function() {
            function e() {
            }
            e.supportsDeviceOrientation = function() {
                if ("ondeviceorientation" in window) {
                    return true
                }
                return false
            };
            e.isTouchDevice = function() {
                if ("ontouchstart" in window || window.navigator.msMaxTouchPoints > 0 || window.navigator.maxTouchPoints > 0) {
                    return true
                }
                return false
            };
            e.isMobileDevice = function() {
                if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i) || navigator.userAgent.match(/Mobile/i) || navigator.userAgent.match(/Tablet/i) || navigator.userAgent.match(/Silk/i)) {
                    return true
                }
                return false
            };
            e.isChrome = function() {
                if (navigator.userAgent.match(/Chrome/i)) {
                    return true
                }
                return false
            };
            e.isFirefox = function() {
                if (navigator.userAgent.match(/Firefox/i)) {
                    return true
                }
                return false
            };
            e.isFirefoxForAndroid = function() {
                return e.isAndroid() && e.isFirefox()
            };
            e.isFirefoxOS = function() {
                return (("mozApps") in navigator) && (navigator.userAgent.search("Mobile") != -1)
            };
            e.isOpera = function() {
                if (navigator.userAgent.match(/Opera/i) || navigator.userAgent.match(/OPR/i)) {
                    return true
                }
                return false
            };
            e.isIE11 = function() {
                if (navigator.userAgent.match(/Trident/i)) {
                    return true
                }
                return false
            };
            e.isAndroid = function() {
                if (navigator.userAgent.match(/Android/i)) {
                    return true
                }
                return false
            };
            e.isLinux = function() {
                if (navigator.userAgent.match(/Linux/i)) {
                    return true
                }
                return false
            };
            e.isWindows = function() {
                if (navigator.userAgent.match(/Windows/i)) {
                    return true
                }
                return false
            };
            e.isMac = function() {
                if (navigator.userAgent.match(/Mac/i)) {
                    return true
                }
                return false
            };
            e.getAndroidVersion = function() {
                var f = navigator.userAgent;
                if (f.indexOf("Android") >= 0) {
                    return parseFloat(f.slice(f.indexOf("Android") + 8))
                }
                return 0
            };
            e.renderInWebGL = function() {
                if (e.isFirefox() && e.isLinux()) {
                    return false
                }
                return true
            };
            e.lockScreenToPortrait = function() {
                var f = ["portrait-primary"];
                if (window.screen.mozLockOrientation) {
                    return window.screen.mozLockOrientation(f)
                }
                if (window.screen.msLockOrientation) {
                    return window.screen.msLockOrientation(f)
                }
                if (window.screen.lockOrientation) {
                    return window.screen.lockOrientation(f)
                }
                return false
            };
            e.lockScreenToLandscape = function() {
                var f = ["landscape-primary"];
                if (window.screen.mozLockOrientation) {
                    return window.screen.mozLockOrientation(f)
                }
                if (window.screen.msLockOrientation) {
                    return window.screen.msLockOrientation(f)
                }
                if (window.screen.lockOrientation) {
                    return window.screen.lockOrientation(f)
                }
                return false
            };
            e.isLandscapeMode = function() {
                if (window.orientation == 90 || window.orientation == -90) {
                    return e.isMobileDevice()
                }
                if (window.orientation == null || window.orientation == 0) {
                    return (window.innerWidth > window.innerHeight) && e.isMobileDevice()
                }
                return false
            };
            e.isGamepadSupported = function() {
                return !!navigator.webkitGetGamepads || !!navigator.webkitGamepads || (navigator.userAgent.indexOf("Firefox/") != -1)
            };
            return e
        })();
        d.DeviceUtils = c
    })(a.goldenratio || (a.goldenratio = {}));
    var b = a.goldenratio
})(com || (com = {}));
var __extends = this.__extends || function(f, a) {
    for (var e in a) {
        if (a.hasOwnProperty(e)) {
            f[e] = a[e]
        }
    }
    function c() {
        this.constructor = f
    }
    c.prototype = a.prototype;
    f.prototype = new c()
};
var com;
(function(a) {
    (function(d) {
        var c = (function(e) {
            __extends(f, e);
            function f() {
                e.call(this);
                this.loaderContainer = document.getElementById("loader-container");
                this.loadProgressContainer = document.getElementById("loader-progress");
                this.loadCompleteContainer = document.getElementById("loader-complete");
                this.loaderTapToPlay = document.getElementById("loader-tap-to-play");
                this.fullscreenCheckboxContainer = document.getElementById("fullscreen-option");
                this.showFullscreenCheckbox(false);
                this.loaderContainer.style.display = "block";
                this.loadProgressContainer.style.display = "block";
                this.mapBinds()
            }
            f.prototype.showFullscreenCheckbox = function(g) {
                this.fullscreenCheckbox = null;
                if (fullscreenEnabled && g && isMobileDevice) {
                    this.fullscreenCheckboxContainer.style.display = "block";
                    this.fullscreenCheckbox = document.getElementById("fullscreen-opt")
                } else {
                    this.fullscreenCheckboxContainer.style.display = "none"
                }
            };
            f.prototype.mapBinds = function() {
                this.onLoaderTapToPlayClickHL = this.onLoaderTapToPlayClickHL.bind(this)
            };
            f.prototype.updateViewPort = function(g, h) {
                this.loaderContainer.style.width = g + "px";
                this.loaderContainer.style.height = h-40 + "px";
                if (g < window.innerWidth && this.fullscreenCheckbox == null && d.DeviceUtils.isLandscapeMode() == false) {
                    this.showFullscreenCheckbox(true)
                }
            };
            f.prototype.onLoadComplete = function() {
                this.loadProgressContainer.style.display = "none";
                this.loadCompleteContainer.style.display = "block";
                this.addLoaderListeners(true);
				this.launchGame();
               // if (f.SHOW_TAP_TO_PLAY == false) {
               //     this.launchGame()
               // }
            };
            f.prototype.addLoaderListeners = function(g) {
                this.loaderTapToPlay.removeEventListener("click", this.onLoaderTapToPlayClickHL, false);
                if (g) {
                    this.loaderTapToPlay.addEventListener("click", this.onLoaderTapToPlayClickHL, false)
                }
            };
            f.prototype.onLoaderTapToPlayClickHL = function(g) {
                this.launchGame();
                g.preventDefault();
                g.stopPropagation()
            };
            f.prototype.launchGame = function() {
                this.loaderContainer.style.display = "none";
                this.addLoaderListeners(false);
                if (fullscreenEnabled) {
                    if (this.fullscreenCheckbox && this.fullscreenCheckbox.checked == true) {
                        triggerFullscreen()
                    }
                }
                this.dispatchEvent(new d.GameEvent(d.GameEvent.LAUNCH_GAME))
            };
            f.SHOW_TAP_TO_PLAY = true;
            return f
        })(PIXI.EventTarget);
        d.LoaderScreen = c
    })(a.goldenratio || (a.goldenratio = {}));
    var b = a.goldenratio
})(com || (com = {}));
var com;
(function(a) {
    (function(d) {
        var c = (function() {
            function e(h, g, i, f) {
                this.type = h;
                this.startTime = g;
                this.duration = i;
                this.loop = f
            }
            e.CLICK = new e("click", 0, 261.2244897959184, false);
            e.EGG_FALL = new e("egg_fall", 2000, 789.4784580498869, false);
            e.EGG_SUCCESS = new e("egg_success", 4000, 1732.154195011338, false);
            e.LEVEL_COMPLETE = new e("level_complete", 7000, 1500, false);
            e.WOOD_TAP = new e("wood_tap", 10000, 624.9886621315195, false);
            e.HOWLER_DATA = {click: [0, 261.2244897959184],egg_fall: [2000, 789.4784580498869],egg_success: [4000, 1732.154195011338],level_complete: [7000, 1500],wood_tap: [10000, 624.9886621315195]};
            return e
        })();
        d.AudioSpriteData = c
    })(a.goldenratio || (a.goldenratio = {}));
    var b = a.goldenratio
})(com || (com = {}));
var com;
(function(a) {
    (function(e) {
        var d = (function() {
            function f(g) {
                this.type = g
            }
            f.CLICK = new f(e.AudioSpriteData.CLICK.type);
            f.WOOD_TAP = new f(e.AudioSpriteData.WOOD_TAP.type);
            f.EGG_FALL = new f(e.AudioSpriteData.EGG_FALL.type);
            f.EGG_SUCCESS = new f(e.AudioSpriteData.EGG_SUCCESS.type);
            f.LEVEL_COMPLETE = new f(e.AudioSpriteData.LEVEL_COMPLETE.type);
            return f
        })();
        e.SFXType = d;
        var c = (function() {
            function f() {
            }
            f.init = function() {
                if (f.isSFXLoaded == true) {
                    return
                }
                if (f.isSFXLoadError == true) {
                    return
                }
                f.loadSFX();
                window.addEventListener("blur", f.onWindowBlur, false);
                window.addEventListener("focus", f.onWindowFocus, false);
                document.addEventListener(visibilityChange, f.handleVisibilityChange, false)
            };
            f.onWindowBlur = function(g) {
                f.mute(true)
            };
            f.onWindowFocus = function(g) {
                if (f.userMuteState == false) {
                    f.mute(false)
                }
            };
            f.handleVisibilityChange = function() {
                if (document[hidden]) {
                    f.mute(true)
                } else {
                    if (f.userMuteState == false) {
                        f.mute(false)
                    }
                }
            };
            f.loadSFX = function() {
                this._sfx = new Howl({urls: ["mp3/70/sfx.ogg", "mp3/70/sfx.mp3"],sprite: e.AudioSpriteData.HOWLER_DATA,onplay: function() {
                        f.isSFXLoaded = false;
                        f.isSFXPlaying = true
                    },onend: function() {
                        f.isSFXLoaded = false;
                        f.isSFXPlaying = false
                    },onload: function() {
                        f.isSFXLoaded = true;
                        f.event.dispatchEvent(new e.GameEvent(e.GameEvent.SOUND_LOADED))
                    },onloaderror: function() {
                        f.isSFXLoaded = false;
                        f.isSFXLoadError = true;
                        f.event.dispatchEvent(new e.GameEvent(e.GameEvent.SOUND_ERROR))
                    }});
                f.isSFXLoaded = false;
                f.isSFXLoadError = true;
                f.event.dispatchEvent(new e.GameEvent(e.GameEvent.SOUND_ERROR))
            };
            f.canPlaySFX = function(g) {
                return f.isSFXLoaded && (f.muteState == false || g)
            };
            f.playSFX = function(g, h) {
                if (typeof h === "undefined") {
                    h = false
                }
                if (f.canPlaySFX(h) == true) {
                    this._sfx.play(g.type)
                }
            };
            f.mute = function(g) {
                f.muteState = g;
                if (g) {
                    Howler.mute()
                } else {
                    Howler.unmute()
                }
            };
            f.toggleUserMute = function() {
                f.userMuteState = !f.userMuteState;
                f.mute(f.userMuteState)
            };
            f.setUserMute = function(g) {
                if (f.userMuteState != g) {
                    f.userMuteState = g;
                    f.mute(g)
                }
            };
            f.event = new PIXI.EventTarget();
            f.isSFXPlaying = false;
            f.isSFXLoaded = false;
            f.isSFXLoadError = false;
            f.muteState = false;
            f.userMuteState = false;
            return f
        })();
        e.SoundManager = c
    })(a.goldenratio || (a.goldenratio = {}));
    var b = a.goldenratio
})(com || (com = {}));
var com;
(function(a) {
    (function(d) {
        var c = (function() {
            function e() {
                this.id_basket_01 = "basket_01";
                this.id_basket_02 = "basket_02";
                this.id_bg = "bg";
                this.id_button_credits = "button_credits";
                this.id_button_mainmenu = "button_mainmenu";
                this.id_button_moregames = "button_moregames";
                this.id_button_playagain = "button_playagain";
                this.id_button_startgame = "button_startgame";
                this.id_credits_panel = "credits_panel";
                this.id_egg = "egg";
                this.id_egg_life = "egg_life";
                this.id_egg_nolife = "egg_nolife";
                this.id_egg_title = "egg_title";
                this.id_labrat_copyright = "labrat_copyright";
                this.id_medal_bronze_1 = "medal_bronze_1";
                this.id_medal_gold_1 = "medal_gold_1";
                this.id_medal_gold_2 = "medal_gold_2";
                this.id_medal_gold_3 = "medal_gold_3";
                this.id_medal_gold_4 = "medal_gold_4";
                this.id_medal_none = "medal_none";
                this.id_medal_silver_1 = "medal_silver_1";
                this.id_medal_silver_2 = "medal_silver_2";
                this.id_medal_silver_3 = "medal_silver_3";
                this.id_medal_silver_4 = "medal_silver_4";
                this.id_number_0 = "number_0";
                this.id_number_1 = "number_1";
                this.id_number_2 = "number_2";
                this.id_number_3 = "number_3";
                this.id_number_4 = "number_4";
                this.id_number_5 = "number_5";
                this.id_number_6 = "number_6";
                this.id_number_7 = "number_7";
                this.id_number_8 = "number_8";
                this.id_number_9 = "number_9";
                this.id_pause_play_button = "pause_play_button";
                this.id_score_new = "score_new";
                this.id_score_panel = "score_panel";
                this.id_tap_hand_01 = "tap_hand_01";
                this.id_tap_hand_02 = "tap_hand_02";
                this.id_tap_left = "tap_left";
                this.id_tap_right = "tap_right";
                this.id_text_0 = "text_0";
                this.id_text_1 = "text_1";
                this.id_text_2 = "text_2";
                this.id_text_3 = "text_3";
                this.id_text_4 = "text_4";
                this.id_text_5 = "text_5";
                this.id_text_6 = "text_6";
                this.id_text_7 = "text_7";
                this.id_text_8 = "text_8";
                this.id_text_9 = "text_9";
                this.id_text_gameover = "text_gameover";
                this.id_text_paused = "text_paused";
                this.id_trans = "trans";
                this.id_volume_off = "volume_off";
                this.id_volume_on = "volume_on"
            }
            e.prototype.basket_01 = function() {
                return PIXI.Sprite.fromFrame("basket_01")
            };
            e.prototype.basket_02 = function() {
                return PIXI.Sprite.fromFrame("basket_02")
            };
            e.prototype.bg = function() {
                return PIXI.Sprite.fromFrame("bg")
            };
            e.prototype.button_credits = function() {
                return PIXI.Sprite.fromFrame("button_credits")
            };
            e.prototype.button_mainmenu = function() {
                return PIXI.Sprite.fromFrame("button_mainmenu")
            };
            e.prototype.button_moregames = function() {
                return PIXI.Sprite.fromFrame("button_moregames")
            };
            e.prototype.button_playagain = function() {
                return PIXI.Sprite.fromFrame("button_playagain")
            };
            e.prototype.button_startgame = function() {
                return PIXI.Sprite.fromFrame("button_startgame")
            };
            e.prototype.credits_panel = function() {
                return PIXI.Sprite.fromFrame("credits_panel")
            };
            e.prototype.egg = function() {
                return PIXI.Sprite.fromFrame("egg")
            };
            e.prototype.egg_life = function() {
                return PIXI.Sprite.fromFrame("egg_life")
            };
            e.prototype.egg_nolife = function() {
                return PIXI.Sprite.fromFrame("egg_nolife")
            };
            e.prototype.egg_title = function() {
                return PIXI.Sprite.fromFrame("egg_title")
            };
            e.prototype.labrat_copyright = function() {
                return PIXI.Sprite.fromFrame("labrat_copyright")
            };
            e.prototype.medal_bronze_1 = function() {
                return PIXI.Sprite.fromFrame("medal_bronze_1")
            };
            e.prototype.medal_gold_1 = function() {
                return PIXI.Sprite.fromFrame("medal_gold_1")
            };
            e.prototype.medal_gold_2 = function() {
                return PIXI.Sprite.fromFrame("medal_gold_2")
            };
            e.prototype.medal_gold_3 = function() {
                return PIXI.Sprite.fromFrame("medal_gold_3")
            };
            e.prototype.medal_gold_4 = function() {
                return PIXI.Sprite.fromFrame("medal_gold_4")
            };
            e.prototype.medal_none = function() {
                return PIXI.Sprite.fromFrame("medal_none")
            };
            e.prototype.medal_silver_1 = function() {
                return PIXI.Sprite.fromFrame("medal_silver_1")
            };
            e.prototype.medal_silver_2 = function() {
                return PIXI.Sprite.fromFrame("medal_silver_2")
            };
            e.prototype.medal_silver_3 = function() {
                return PIXI.Sprite.fromFrame("medal_silver_3")
            };
            e.prototype.medal_silver_4 = function() {
                return PIXI.Sprite.fromFrame("medal_silver_4")
            };
            e.prototype.number_0 = function() {
                return PIXI.Sprite.fromFrame("number_0")
            };
            e.prototype.number_1 = function() {
                return PIXI.Sprite.fromFrame("number_1")
            };
            e.prototype.number_2 = function() {
                return PIXI.Sprite.fromFrame("number_2")
            };
            e.prototype.number_3 = function() {
                return PIXI.Sprite.fromFrame("number_3")
            };
            e.prototype.number_4 = function() {
                return PIXI.Sprite.fromFrame("number_4")
            };
            e.prototype.number_5 = function() {
                return PIXI.Sprite.fromFrame("number_5")
            };
            e.prototype.number_6 = function() {
                return PIXI.Sprite.fromFrame("number_6")
            };
            e.prototype.number_7 = function() {
                return PIXI.Sprite.fromFrame("number_7")
            };
            e.prototype.number_8 = function() {
                return PIXI.Sprite.fromFrame("number_8")
            };
            e.prototype.number_9 = function() {
                return PIXI.Sprite.fromFrame("number_9")
            };
            e.prototype.pause_play_button = function() {
                return PIXI.Sprite.fromFrame("pause_play_button")
            };
            e.prototype.score_new = function() {
                return PIXI.Sprite.fromFrame("score_new")
            };
            e.prototype.score_panel = function() {
                return PIXI.Sprite.fromFrame("score_panel")
            };
            e.prototype.tap_hand_01 = function() {
                return PIXI.Sprite.fromFrame("tap_hand_01")
            };
            e.prototype.tap_hand_02 = function() {
                return PIXI.Sprite.fromFrame("tap_hand_02")
            };
            e.prototype.tap_left = function() {
                return PIXI.Sprite.fromFrame("tap_left")
            };
            e.prototype.tap_right = function() {
                return PIXI.Sprite.fromFrame("tap_right")
            };
            e.prototype.text_0 = function() {
                return PIXI.Sprite.fromFrame("text_0")
            };
            e.prototype.text_1 = function() {
                return PIXI.Sprite.fromFrame("text_1")
            };
            e.prototype.text_2 = function() {
                return PIXI.Sprite.fromFrame("text_2")
            };
            e.prototype.text_3 = function() {
                return PIXI.Sprite.fromFrame("text_3")
            };
            e.prototype.text_4 = function() {
                return PIXI.Sprite.fromFrame("text_4")
            };
            e.prototype.text_5 = function() {
                return PIXI.Sprite.fromFrame("text_5")
            };
            e.prototype.text_6 = function() {
                return PIXI.Sprite.fromFrame("text_6")
            };
            e.prototype.text_7 = function() {
                return PIXI.Sprite.fromFrame("text_7")
            };
            e.prototype.text_8 = function() {
                return PIXI.Sprite.fromFrame("text_8")
            };
            e.prototype.text_9 = function() {
                return PIXI.Sprite.fromFrame("text_9")
            };
            e.prototype.text_gameover = function() {
                return PIXI.Sprite.fromFrame("text_gameover")
            };
            e.prototype.text_paused = function() {
                return PIXI.Sprite.fromFrame("text_paused")
            };
            e.prototype.trans = function() {
                return PIXI.Sprite.fromFrame("trans")
            };
            e.prototype.volume_off = function() {
                return PIXI.Sprite.fromFrame("volume_off")
            };
            e.prototype.volume_on = function() {
                return PIXI.Sprite.fromFrame("volume_on")
            };
            return e
        })();
        d.Frame = c
    })(a.goldenratio || (a.goldenratio = {}));
    var b = a.goldenratio
})(com || (com = {}));
var com;
(function(a) {
    (function(d) {
        var c = (function() {
            function e() {
            }
            e.frame = new d.Frame();
            return e
        })();
        d.Res = c
    })(a.goldenratio || (a.goldenratio = {}));
    var b = a.goldenratio
})(com || (com = {}));
var com;
(function(a) {
    (function(d) {
        var c = (function() {
            function e() {
            }
            e.removeAllChildren = function(g) {
                if (g == null) {
                    return
                }
                for (var f = g.children.length - 1; f >= 0; f--) {
                    g.removeChild(g.children[f])
                }
            };
            e.removeFromParent = function(f) {
                if (f && f.parent) {
                    f.parent.removeChild(f)
                }
            };
            e.removeList = function(f) {
                for (var g = f.length - 1; g >= 0; g--) {
                    this.removeFromParent(f[g]);
                    f[g] = null
                }
            };
            return e
        })();
        d.DisplayObjectUtils = c
    })(a.goldenratio || (a.goldenratio = {}));
    var b = a.goldenratio
})(com || (com = {}));
var com;
(function(a) {
    (function(g) {
        var f = (function() {
            function h(i) {
                this._bucketType = i
            }
            h.prototype.toString = function() {
                return "{type: " + this._bucketType + "}"
            };
            h.MOVE_NONE = new h("MOVE_NONE");
            h.MOVE_LEFT_RIGHT = new h("MOVE_LEFT_RIGHT");
            h.MOVE_RIGHT_LEFT = new h("MOVE_RIGHT_LEFT");
            return h
        })();
        g.BucketAnimationType = f;
        var c = (function() {
            function h(i) {
                this._type = i
            }
            h.prototype.toString = function() {
                return "{type: " + this._type + "}"
            };
            h.STATIC = new h("static");
            h.FALLING = new h("falling");
            return h
        })();
        g.BucketType = c;
        var d = (function() {
            function h(i, j) {
                this.value = j;
                this._type = i
            }
            h.SLOW = new h("SLOW", 1);
            h.MEDIUM = new h("MEDIUM", 2);
            h.FAST = new h("FAST", 3);
            return h
        })();
        g.BucketSpeed = d;
        var e = (function() {
            function h(i, j) {
                this._rect = new PIXI.Rectangle(0, 0, 0, 0);
                this._eggPosition = new PIXI.Point(0, 0);
                this._isBounce = false;
                this._bounceCount = 0;
                this._animationType = f.MOVE_NONE;
                this._speed = d.SLOW;
                this._id = -1;
                this._direction = 1;
                this._isBlinkStart = false;
                this._blinkCount = 0;
                this._isFirstBlink = false;
                this._isSecondBlink = false;
                this._canDropBasket = false;
                this._canDropEgg = false;
                this.onBlinkComplete = this.onBlinkComplete.bind(this);
                this.dropBasket = this.dropBasket.bind(this);
                if (i == c.STATIC) {
                    this._gfx = g.Res.frame.basket_01()
                } else {
                    if (i == c.FALLING) {
                        this._gfx = g.Res.frame.basket_02()
                    }
                }
                this._type = i;
                this._id = j;
                this._gfx.pivot.x = this._gfx.width >> 1;
                this._gfx.pivot.y = this._gfx.height >> 1;
                this._gfx.scale.x = this._gfx.scale.y = 0.5;
                this._rect.width = this._gfx.width;
                this._rect.height = this._gfx.height-40
            }
            h.prototype.setAnimationType = function(i) {
                this._animationType = i;
                if (this._animationType == f.MOVE_RIGHT_LEFT) {
                    this._direction = -1
                }
                if (this._animationType == f.MOVE_LEFT_RIGHT) {
                    this._direction = 1
                }
            };
            Object.defineProperty(h.prototype, "animationType", {get: function() {
                    return this._animationType
                },enumerable: true,configurable: true});
            h.prototype.setSpeed = function(i) {
                this._speed = i
            };
            h.prototype.setPosition = function(j, i) {
                this._rect.x = j;
                this._rect.y = i;
                this.updateRect()
            };
            h.prototype.updateRect = function() {
                this._eggPosition.x = this._rect.x + (this._rect.width >> 1);
                this._eggPosition.y = this._rect.y + (this._rect.height >> 1) - 10;
                this._gfx.position.x = this._rect.x + (this._rect.width >> 1);
                this._gfx.position.y = this._rect.y + (this._rect.height >> 1)
            };
            Object.defineProperty(h.prototype, "id", {get: function() {
                    return this._id
                },enumerable: true,configurable: true});
            Object.defineProperty(h.prototype, "type", {get: function() {
                    return this._type
                },enumerable: true,configurable: true});
            Object.defineProperty(h.prototype, "canDropEgg", {get: function() {
                    return this._canDropEgg
                },enumerable: true,configurable: true});
            h.prototype.bounce = function() {
                if (this._isBounce == false) {
                    this._rect.y += 2;
                    this._isBounce = true;
                    this.updateRect()
                }
            };
            h.prototype.onEggJumpedOffBasket = function() {
                this.bounce();
                this._isBlinkStart = false;
                this._isFirstBlink = false;
                this._isSecondBlink = false;
                this._blinkCount = 0
            };
            h.prototype.onEggLanded = function() {
                this.bounce();
                if (this._type == c.FALLING) {
                    this._isBlinkStart = true;
                    this._isFirstBlink = true
                }
            };
            h.prototype.reset = function() {
                this._isBlinkStart = false;
                this._isFirstBlink = false;
                this._isSecondBlink = false;
                this._canDropBasket = false;
                this._canDropEgg = false;
                this._blinkCount = 0;
                var i = this;
                this._tween = new TWEEN.Tween({alpha: this._gfx.alpha}).to({alpha: 1}, 200).easing(TWEEN.Easing.Linear.None).onUpdate(function() {
                    if (i._gfx) {
                        i._gfx.alpha = this.alpha
                    }
                }).start()
            };
            h.prototype.update = function(i) {
                if (this._isBounce) {
                    this._bounceCount++;
                    if (this._bounceCount >= 8) {
                        this._isBounce = false;
                        this._bounceCount = 0;
                        this._rect.y -= 2;
                        this.updateRect()
                    }
                }
                if (this._animationType && this._rect) {
                    if (this._animationType == f.MOVE_LEFT_RIGHT || this._animationType == f.MOVE_RIGHT_LEFT) {
                        this._rect.x -= this._speed.value * i * this._direction;
                        if (this._rect.x <= 0) {
                            this._rect.x = 0;
                            this._direction *= -1
                        } else {
                            if (this._rect.x >= (320 - this._rect.width)) {
                                this._rect.x = (320 - this._rect.width);
                                this._direction *= -1
                            }
                        }
                        this.updateRect()
                    }
                }
                if (this._isBlinkStart) {
                    this._blinkCount++;
                    if (this._blinkCount >= 80 && this._isFirstBlink == true) {
                        this._isFirstBlink = false;
                        this.blinkBucket(false)
                    }
                    if (this._blinkCount >= 80 && this._isSecondBlink == true) {
                        this._isSecondBlink = false;
                        this.blinkBucket(true)
                    }
                }
            };
            h.prototype.blinkBucket = function(j) {
                this._isBlinkStart = false;
                this._canDropBasket = j;
                var i = this;
                this._tween = new TWEEN.Tween({alpha: 1}).to({alpha: 0.3}, 600).repeat(3).yoyo(true).easing(TWEEN.Easing.Linear.None).onUpdate(function() {
                    if (i._gfx) {
                        i._gfx.alpha = this.alpha
                    }
                }).onComplete(this.onBlinkComplete).start()
            };
            h.prototype.onBlinkComplete = function() {
                if (this._canDropBasket) {
                    var i = this;
                    this._tween = new TWEEN.Tween({alpha: 1}).to({alpha: 0}, 300).easing(TWEEN.Easing.Linear.None).onUpdate(function() {
                        if (i._gfx) {
                            i._gfx.alpha = this.alpha
                        }
                    }).onComplete(this.dropBasket).start();
                    return
                }
                this._blinkCount = 0;
                this._isBlinkStart = true;
                this._isSecondBlink = true
            };
            h.prototype.dropBasket = function() {
                this._canDropEgg = true
            };
            Object.defineProperty(h.prototype, "gfx", {get: function() {
                    return this._gfx
                },enumerable: true,configurable: true});
            Object.defineProperty(h.prototype, "rect", {get: function() {
                    return this._rect
                },enumerable: true,configurable: true});
            Object.defineProperty(h.prototype, "eggPosition", {get: function() {
                    return this._eggPosition
                },enumerable: true,configurable: true});
            h.prototype.dispose = function() {
                if (this._tween) {
                    this._tween = null
                }
                g.DisplayObjectUtils.removeFromParent(this._gfx);
                this._gfx = null;
                this._rect = null;
                this._eggPosition = null;
                this._animationType = null;
                this._speed = null;
                this._type = null
            };
            return h
        })();
        g.Bucket = e
    })(a.goldenratio || (a.goldenratio = {}));
    var b = a.goldenratio
})(com || (com = {}));
var com;
(function(a) {
    (function(d) {
        var c = (function() {
            function e(g) {
                this._list = [];
                this._container = g;
                var k = 999;
                var n = 115;
                var l = -50;
                var t = new d.Bucket(d.BucketType.STATIC, 0);
                t.setPosition(n, l);
                t.setAnimationType(d.BucketAnimationType.MOVE_NONE);
                this._list.push(t);
                l -= 180;
                var s = new d.Bucket(d.BucketType.STATIC, 1);
                s.setPosition(n, l);
                s.setAnimationType(d.BucketAnimationType.MOVE_NONE);
                this._list.push(s);
                k -= 2;
                var o = 0;
                for (var m = 0; m < k; m++) {
                    l -= 180;
                    var j = (Math.random() * 50) | 0;
                    var f = this.getRandomBucketType(j);
                    var h = this.getRandomAnimationType(j);
                    var q = d.BucketSpeed.MEDIUM;
                    if (f == d.BucketType.STATIC) {
                        q = this.getRandomBucketSpeed(j)
                    }
                    if (m > 0) {
                        var p = this._list[(m + 2) - 1];
                        if (p.animationType == d.BucketAnimationType.MOVE_LEFT_RIGHT && h == d.BucketAnimationType.MOVE_LEFT_RIGHT) {
                            h = d.BucketAnimationType.MOVE_NONE
                        } else {
                            if (p.animationType == d.BucketAnimationType.MOVE_RIGHT_LEFT && h == d.BucketAnimationType.MOVE_RIGHT_LEFT) {
                                h = d.BucketAnimationType.MOVE_NONE
                            }
                        }
                        if ((p.animationType == d.BucketAnimationType.MOVE_LEFT_RIGHT || p.animationType == d.BucketAnimationType.MOVE_RIGHT_LEFT) && h == d.BucketAnimationType.MOVE_NONE) {
                            n = (Math.random() * 230) | 0
                        }
                    }
                    if (f == d.BucketType.STATIC && h == d.BucketAnimationType.MOVE_NONE) {
                        o++
                    }
                    if (o >= 4) {
                        o = 0;
                        h = d.BucketAnimationType.MOVE_RIGHT_LEFT
                    }
                    var r = new d.Bucket(f, m + 2);
                    if (h == d.BucketAnimationType.MOVE_NONE) {
                        r.setPosition(n, l)
                    } else {
                        r.setPosition((Math.random() * 230) | 0, l)
                    }
                    r.setAnimationType(h);
                    r.setSpeed(q);
                    this._list.push(r)
                }
                this._list.reverse();
                this._firstBasket = this._list[this._list.length - 1]
            }
            e.prototype.getRandomAnimationType = function(f) {
                if (f > 16 && f <= 32) {
                    return d.BucketAnimationType.MOVE_LEFT_RIGHT
                } else {
                    if (f > 32) {
                        return d.BucketAnimationType.MOVE_RIGHT_LEFT
                    }
                }
                return d.BucketAnimationType.MOVE_NONE
            };
            e.prototype.getRandomBucketSpeed = function(f) {
                if (f >= 0 && f <= 20) {
                    return d.BucketSpeed.SLOW
                }
                return d.BucketSpeed.MEDIUM
            };
            e.prototype.getRandomBucketType = function(f) {
                if (f >= 30) {
                    return d.BucketType.FALLING
                }
                return d.BucketType.STATIC
            };
            e.prototype.updateCurrentBasket = function(g) {
                this._nextBasket = null;
                this._currentBasket = null;
                if (this._firstBasket && !this._firstBasket.gfx.parent) {
                    this._container.addChild(this._firstBasket.gfx)
                }
                for (var f = this._list.length - 1; f >= 0; f--) {
                    if (this._list[f].id == g) {
                        this._currentBasket = this._list[f];
                        if (!this._currentBasket.gfx.parent) {
                            this._container.addChild(this._currentBasket.gfx)
                        }
                        if (this._list[f - 1]) {
                            this._nextBasket = this._list[f - 1];
                            if (!this._nextBasket.gfx.parent) {
                                this._container.addChild(this._nextBasket.gfx)
                            }
                        }
                        if (this._list[f - 2]) {
                            this._list[f - 2].gfx.visible = true;
                            if (!this._list[f - 2].gfx.parent) {
                                this._container.addChild(this._list[f - 2].gfx)
                            }
                        }
                        return
                    }
                }
            };
            Object.defineProperty(e.prototype, "currentBasket", {get: function() {
                    return this._currentBasket
                },enumerable: true,configurable: true});
            Object.defineProperty(e.prototype, "nextBasket", {get: function() {
                    return this._nextBasket
                },enumerable: true,configurable: true});
            Object.defineProperty(e.prototype, "firstBasket", {get: function() {
                    return this._firstBasket
                },enumerable: true,configurable: true});
            e.prototype.update = function(j) {
                var h = this._list.length;
                var f = (h - 3);
                if (f < 0) {
                    f = 0
                }
                for (var g = h - 1; g >= f; g--) {
                    this._list[g].update(j)
                }
            };
            e.prototype.onEggLanded = function() {
            };
            e.prototype.onContainerScrollComplete = function() {
                for (var f = this._list.length - 1; f >= 0; f--) {
                    if (this._list[f].id < this._currentBasket.id) {
                        var g = this._list[f];
                        if (g) {
                            g.dispose();
                            g = null;
                            this._list.splice(f, 1)
                        }
                    } else {
                        break
                    }
                }
                this._firstBasket = this._list[this._list.length - 1]
            };
            e.prototype.dispose = function() {
                for (var f = 0; f < this._list.length; f++) {
                    this._list[f].dispose();
                    this._list[f] = null
                }
                this._list.length = 0;
                this._list = null;
                this._currentBasket = null;
                this._nextBasket = null;
                this._firstBasket = null;
                this._container = null
            };
            return e
        })();
        d.BucketManager = c
    })(a.goldenratio || (a.goldenratio = {}));
    var b = a.goldenratio
})(com || (com = {}));
var com;
(function(a) {
    (function(d) {
        var c = (function() {
            function e() {
            }
            e.distanceBetweenTwoPoints = function(h, g, f, i) {
                return Math.sqrt(Math.pow(f - h, 2) + Math.pow(i - g, 2))
            };
            e.degreesToRadians = function(f) {
                return f * Math.PI / 180
            };
            e.radiansToDegrees = function(f) {
                return f * 180 / Math.PI
            };
            return e
        })();
        d.MathUtils = c
    })(a.goldenratio || (a.goldenratio = {}));
    var b = a.goldenratio
})(com || (com = {}));
var com;
(function(a) {
    (function(e) {
        var d = (function() {
            function f() {
            }
            f.SPEED = 5;
            f.MAX_HEIGHT = 240;
            f.ROTATION_SPEED = 15;
            return f
        })();
        e.EggConf = d;
        var c = (function(g) {
            __extends(f, g);
            function f() {
                g.call(this);
                this._rect = new PIXI.Rectangle(0, 0, 0, 0);
                this._position = new PIXI.Point(0, 0);
                this._rotation = 0;
                this._isJump = false;
                this._destinationPosition = new PIXI.Point(0, 0);
                this._initialPosition = new PIXI.Point(0, 0);
                this._fallFlag = false;
                this._basketID = -1;
                this._fallFriction = 1;
                this._raiseFriction = 1;
                this._isFreeFall = false;
                this._swapDepthFlag = false;
                this._swapDepthInsideFlag = false;
                this._canLandInNextBasket = false;
                this._isAlive = true;
                this._hasFallenOffScreen = false;
                this._gfx = e.Res.frame.egg();
                this._gfx.pivot.x = this._gfx.width >> 1;
                this._gfx.pivot.y = this._gfx.height >> 1;
                this._gfx.scale.x = this._gfx.scale.y = 0.5;
                this._rect.width = this._gfx.width;
                this._rect.height = this._gfx.height-40
            }
            f.prototype.resetFlags = function() {
                this._fallFlag = false;
                this._isJump = false;
                this._initialPosition.x = 0;
                this._initialPosition.y = 0;
                this._destinationPosition.x = 0;
                this._destinationPosition.y = 0;
                this._rotation = 0;
                this._canLandInNextBasket = false
            };
            f.prototype.setPosition = function(i, h) {
                this._position.x = i;
                this._position.y = h;
                this.updateRect()
            };
            f.prototype.updateRect = function() {
                this._rect.x = this._position.x - (this._rect.width >> 1);
                this._rect.y = this._position.y - (this._rect.height >> 1);
                this._gfx.position.x = this._position.x;
                this._gfx.position.y = this._position.y;
                this._gfx.rotation = e.MathUtils.degreesToRadians(this._rotation)
            };
            f.prototype.setJump = function(h) {
                if (this._isJump != h) {
                    this._isJump = h;
                    if (this._isJump) {
                        this._fallFlag = false;
                        this._fallFriction = 0;
                        this._raiseFriction = 1;
                        this._isFreeFall = false;
                        this._swapDepthFlag = false;
                        this._swapDepthInsideFlag = false;
                        this._initialPosition.y = this._position.y;
                        this._destinationPosition.y = (this._position.y - d.MAX_HEIGHT) >> 0
                    }
                }
            };
            Object.defineProperty(f.prototype, "gfx", {get: function() {
                    return this._gfx
                },enumerable: true,configurable: true});
            Object.defineProperty(f.prototype, "rect", {get: function() {
                    return this._rect
                },enumerable: true,configurable: true});
            Object.defineProperty(f.prototype, "isJumping", {get: function() {
                    return this._isJump
                },enumerable: true,configurable: true});
            Object.defineProperty(f.prototype, "hasFallenOffScreen", {get: function() {
                    return this._hasFallenOffScreen
                },enumerable: true,configurable: true});
            Object.defineProperty(f.prototype, "canLandInNextBasket", {get: function() {
                    return this._canLandInNextBasket
                },enumerable: true,configurable: true});
            Object.defineProperty(f.prototype, "isFalling", {get: function() {
                    return this._fallFlag
                },enumerable: true,configurable: true});
            f.prototype.setBasketID = function(h) {
                this._basketID = h;
                this.resetFlags()
            };
            Object.defineProperty(f.prototype, "basketID", {get: function() {
                    return this._basketID
                },enumerable: true,configurable: true});
            f.prototype.update = function(k, i, h, j) {
                if (this._hasFallenOffScreen) {
                    return
                }
                if (this._isJump) {
                    if (!this._fallFlag) {
                        this._fallFlag = (this._position.y <= this._destinationPosition.y)
                    }
                    if (this._fallFlag) {
                        if (this._fallFriction < 1) {
                            this._fallFriction += 0.05
                        }
                        if (this._fallFriction > 1) {
                            this._fallFriction = 1
                        }
                        this._position.y += d.SPEED * this._fallFriction
                    } else {
                        if (this._isFreeFall) {
                            if (this._raiseFriction > 0) {
                                this._raiseFriction -= 0.05
                            }
                            if (this._raiseFriction < 0) {
                                this._raiseFriction = 0
                            }
                            this._position.y -= d.SPEED * this._raiseFriction
                        } else {
                            this._position.y -= d.SPEED
                        }
                    }
                    if (Math.abs(this._destinationPosition.y - this._position.y) > 40) {
                        this._rotation += d.ROTATION_SPEED;
                        this._isFreeFall = false
                    } else {
                        this._rotation = 270;
                        this._isFreeFall = true
                    }
                    if (this._rotation >= 360) {
                        this._rotation = 0
                    }
                    if (this._swapDepthFlag == false && (this._position.y <= (this._initialPosition.y - 60))) {
                        this._swapDepthFlag = true;
                        this.dispatchEvent(new e.GameEvent(e.GameEvent.EGG_OUTOFF_BASKET))
                    }
                    if (this._fallFlag && h) {
                        if ((this._position.x > h.rect.x + 10) && (this._position.x < (h.rect.x + h.rect.width - 10))) {
                            if (this._swapDepthInsideFlag == false && (this._position.y >= h.rect.y - 15) && (this._position.y <= h.rect.y)) {
                                this._swapDepthInsideFlag = true;
                                this.dispatchEvent(new e.GameEvent(e.GameEvent.EGG_INSIDE_BASKET))
                            }
                            if (this._canLandInNextBasket == false && (this._position.y >= h.rect.y - 5) && (this._position.y <= h.rect.y)) {
                                this._canLandInNextBasket = true
                            }
                        }
                        if (this._hasFallenOffScreen == false && this._position.y >= (j.rect.y + j.rect.height + 100)) {
                            this._hasFallenOffScreen = true;
                            this.dispatchEvent(new e.GameEvent(e.GameEvent.GAME_OVER));
                            return
                        }
                    }
                } else {
                    if (i) {
                        if (i.canDropEgg == false) {
                            this._position.x = i.eggPosition.x;
                            this._position.y = i.eggPosition.y
                        } else {
                            if (this._hasFallenOffScreen == false && this._position.y >= (j.rect.y + j.rect.height + 100)) {
                                this._hasFallenOffScreen = true;
                                this.dispatchEvent(new e.GameEvent(e.GameEvent.GAME_OVER));
                                return
                            }
                            this._position.y += 6 * k;
                            if (this._isAlive) {
                                this._isAlive = false;
                                this.dispatchEvent(new e.GameEvent(e.GameEvent.EGG_DIED))
                            }
                        }
                    }
                }
                this.updateRect()
            };
            f.prototype.reset = function() {
                this.resetFlags();
                this._hasFallenOffScreen = false;
                this._fallFlag = false;
                this._fallFriction = 0;
                this._raiseFriction = 1;
                this._isFreeFall = false;
                this._swapDepthFlag = false;
                this._swapDepthInsideFlag = false
            };
            f.prototype.dispose = function() {
                e.DisplayObjectUtils.removeFromParent(this._gfx);
                this._gfx = null;
                this._rect = null;
                this._position = null;
                this._destinationPosition = null;
                this._initialPosition = null
            };
            return f
        })(PIXI.EventTarget);
        e.Egg = c
    })(a.goldenratio || (a.goldenratio = {}));
    var b = a.goldenratio
})(com || (com = {}));
var com;
(function(a) {
    (function(d) {
        var c = (function() {
            function e() {
            }
            e.hideMouse = function(f) {
                f.style.cursor = "none"
            };
            e.showMouse = function(f) {
                f.style.cursor = "default"
            };
            e.getMouseX = function(i, f, h) {
                var g = h.offsetX ? h.offsetX : h.clientX - i.left;
                return ((g / i.width) * f) >> 0
            };
            e.getMouseY = function(h, i, g) {
                var f = g.offsetY ? g.offsetY : g.clientY - h.top;
                return ((f / h.height) * i) >> 0
            };
            e.getTouchX = function(i, f, h) {
                var j = h.touches[0];
                var g = j.clientX - i.left;
                return ((g / i.width) * f) >> 0
            };
            e.getTouchY = function(h, i, g) {
                var j = g.touches[0];
                var f = j.clientY - h.top;
                return ((f / h.height) * i) >> 0
            };
            return e
        })();
        d.MouseUtils = c
    })(a.goldenratio || (a.goldenratio = {}));
    var b = a.goldenratio
})(com || (com = {}));
var com;
(function(a) {
    (function(d) {
        var c = (function(f) {
            __extends(e, f);
            function e() {
                f.call(this);
                this.isSoundButtonPressed = false;
                this.isPlayAgainPressed = false;
                this.isMoreGamesPressed = false;
                this.isStartGamePressed = false;
                this.isCreditPressed = false;
                this.isMainMenuPressed = false;
                this.isPauseButtonPressed = false;
                this._isGamePaused = false;
                this.mapBinds();
                this.setEnable(false)
            }
            e.prototype.mapBinds = function() {
                this.onMouseDownHL = this.onMouseDownHL.bind(this);
                this.onMouseUpHL = this.onMouseUpHL.bind(this);
                this.onTouchStartHL = this.onTouchStartHL.bind(this);
                this.onTouchEndHL = this.onTouchEndHL.bind(this)
            };
            e.prototype.setSoundButtonRect = function(g) {
                this._soundRect = g
            };
            e.prototype.setStartGameRect = function(g) {
                this._startGameRect = g
            };
            e.prototype.setCreditsRect = function(g) {
                this._creditsRect = g
            };
            e.prototype.setMainMenuRect = function(g) {
                this._mainMenuRect = g
            };
            e.prototype.setPlayAgainRect = function(g) {
                this._playAgainRect = g
            };
            e.prototype.setMoreGamesRect = function(g) {
                this._moreGamesRect = g
            };
            e.prototype.setPauseButtonRect = function(g) {
                this._pauseButtonRect = g
            };
            e.prototype.setGamePaused = function(g) {
                this._isGamePaused = g
            };
            e.prototype.setEnable = function(g) {
                gameContainer.removeEventListener("touchstart", this.onTouchStartHL, false);
                gameContainer.removeEventListener("touchend", this.onTouchEndHL, false);
                gameContainer.removeEventListener("mousedown", this.onMouseDownHL, false);
                gameContainer.removeEventListener("mouseup", this.onMouseUpHL, false);
                if (g) {
                    gameContainer.addEventListener("touchstart", this.onTouchStartHL, false);
                    gameContainer.addEventListener("touchend", this.onTouchEndHL, false);
                    gameContainer.addEventListener("mousedown", this.onMouseDownHL, false);
                    gameContainer.addEventListener("mouseup", this.onMouseUpHL, false)
                }
            };
            e.prototype.onMouseUpHL = function(g) {
                g.stopPropagation();
                g.preventDefault();
                this.handleUPState()
            };
            e.prototype.onTouchEndHL = function(g) {
                g.stopPropagation();
                g.preventDefault();
                this.handleUPState()
            };
            e.prototype.onTouchStartHL = function(j) {
                j.stopPropagation();
                j.preventDefault();
                var i = gameContainer.getBoundingClientRect();
                var h = d.MouseUtils.getTouchX(i, d.Main.GAME_DIMENSION.width, j);
                var g = d.MouseUtils.getTouchY(i, d.Main.GAME_DIMENSION.height, j);
                this.checkButtonHit(h, g)
            };
            e.prototype.onMouseDownHL = function(j) {
                j.stopPropagation();
                j.preventDefault();
                var i = gameContainer.getBoundingClientRect();
                var h = d.MouseUtils.getMouseX(i, d.Main.GAME_DIMENSION.width, j);
                var g = d.MouseUtils.getMouseY(i, d.Main.GAME_DIMENSION.height, j);
                this.checkButtonHit(h, g)
            };
            e.prototype.checkButtonHit = function(h, g) {
                if (!this._isGamePaused) {
                    if (this._soundRect && this._soundRect.contains(h, g)) {
                        this.isSoundButtonPressed = true;
                        this.dispatchEvent(new d.GameEvent(d.GameEvent.BUTTON_DOWN))
                    } else {
                        if (this._playAgainRect && this._playAgainRect.contains(h, g)) {
                            this.isPlayAgainPressed = true;
                            this.dispatchEvent(new d.GameEvent(d.GameEvent.BUTTON_DOWN))
                        } else {
                            if (this._moreGamesRect && this._moreGamesRect.contains(h, g)) {
                                this.isMoreGamesPressed = true;
                                this.dispatchEvent(new d.GameEvent(d.GameEvent.BUTTON_DOWN))
                            } else {
                                if (this._startGameRect && this._startGameRect.contains(h, g)) {
                                    this.isStartGamePressed = true;
                                    this.dispatchEvent(new d.GameEvent(d.GameEvent.BUTTON_DOWN))
                                } else {
                                    if (this._creditsRect && this._creditsRect.contains(h, g)) {
                                        this.isCreditPressed = true;
                                        this.dispatchEvent(new d.GameEvent(d.GameEvent.BUTTON_DOWN))
                                    } else {
                                        if (this._mainMenuRect && this._mainMenuRect.contains(h, g)) {
                                            this.isMainMenuPressed = true;
                                            this.dispatchEvent(new d.GameEvent(d.GameEvent.BUTTON_DOWN))
                                        } else {
                                            this.dispatchEggJump()
                                        }
                                    }
                                }
                            }
                        }
                    }
                } else {
                    if (this._pauseButtonRect && this._pauseButtonRect.contains(h, g)) {
                        this.isPauseButtonPressed = true;
                        this.dispatchEvent(new d.GameEvent(d.GameEvent.BUTTON_DOWN))
                    }
                }
            };
            e.prototype.handleUPState = function() {
                if (this.isSoundButtonPressed) {
                    this.dispatchEvent(new d.GameEvent(d.GameEvent.BUTTON_UP));
                    this.isSoundButtonPressed = false
                } else {
                    if (this.isPlayAgainPressed) {
                        this.dispatchEvent(new d.GameEvent(d.GameEvent.BUTTON_UP));
                        this.isPlayAgainPressed = false
                    } else {
                        if (this.isMoreGamesPressed) {
                            this.dispatchEvent(new d.GameEvent(d.GameEvent.BUTTON_UP));
                            this.isMoreGamesPressed = false
                        } else {
                            if (this.isStartGamePressed) {
                                this.dispatchEvent(new d.GameEvent(d.GameEvent.BUTTON_UP));
                                this.isStartGamePressed = false
                            } else {
                                if (this.isCreditPressed) {
                                    this.dispatchEvent(new d.GameEvent(d.GameEvent.BUTTON_UP));
                                    this.isCreditPressed = false
                                } else {
                                    if (this.isMainMenuPressed) {
                                        this.dispatchEvent(new d.GameEvent(d.GameEvent.BUTTON_UP));
                                        this.isMainMenuPressed = false
                                    } else {
                                        if (this.isPauseButtonPressed) {
                                            this.dispatchEvent(new d.GameEvent(d.GameEvent.BUTTON_UP));
                                            this.isPauseButtonPressed = false
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            };
            e.prototype.dispatchEggJump = function() {
                this.dispatchEvent(new d.GameEvent(d.GameEvent.CANVAS_MOUSE_DOOWN))
            };
            e.prototype.dispose = function() {
                this.setEnable(false);
                this._soundRect = null;
                this._playAgainRect = null;
                this._moreGamesRect = null;
                this._startGameRect = null;
                this._creditsRect = null;
                this._pauseButtonRect = null
            };
            return e
        })(PIXI.EventTarget);
        d.InputControl = c
    })(a.goldenratio || (a.goldenratio = {}));
    var b = a.goldenratio
})(com || (com = {}));
var com;
(function(a) {
    (function(e) {
        var c = (function() {
            function f() {
            }
            f.SOUND_KEY = "com.labrat.egg.sound_key";
            f.SCORE = "com.labrat.egg.score";
            return f
        })();
        e.LocalKey = c;
        var d = (function() {
            function f() {
            }
            f.save = function(g, i) {
                localStorage.setItem(g, i);
                try {
                    var k = f.convertValueToHash(i);
                    var h = g + "_data";
                    localStorage.setItem(h, k.toString())
                } catch (j) {
                }
            };
            f.convertValueToHash = function(h) {
                var g = h + f.HASH;
                return CryptoJS.MD5(g).toString()
            };
            f.get = function(i, g) {
                var j = localStorage.getItem(i);
                var h = localStorage.getItem(i + "_data");
                var k = j;
                if (j != null && h != null) {
                    try {
                        var m = f.convertValueToHash(k.toString());
                        if (m != h) {
                            k = null
                        }
                    } catch (l) {
                    }
                }
                if (k == null && g != null) {
                    k = g
                }
                return k
            };
            f.getNumber = function(i, g) {
                var j = 0;
                var h = f.get(i);
                if (h) {
                    j = parseInt(h);
                    if (isNaN(j)) {
                        if (!isNaN(g)) {
                            j = g
                        } else {
                            j = 0
                        }
                    }
                } else {
                    if (!isNaN(g)) {
                        j = g
                    }
                }
                return j
            };
            f.getBoolean = function(i, g) {
                var h = f.get(i);
                if (h == "true" || h == "1") {
                    return true
                }
                if (h == "false" || h == "0") {
                    return false
                }
                if (typeof g !== "undefined") {
                    return g
                }
                return false
            };
            f.HASH = "xPBUEYnZpWrjlACCKDXh";
            return f
        })();
        e.LocalStorageUtils = d
    })(a.goldenratio || (a.goldenratio = {}));
    var b = a.goldenratio
})(com || (com = {}));
var com;
(function(a) {
    (function(d) {
        var c = (function() {
            function e() {
            }
            e.getMedalGfxFromScore = function(f) {
                if (f <= 0) {
                    return d.Res.frame.medal_none()
                }
                if (f >= 1 && f < 10) {
                    return d.Res.frame.medal_bronze_1()
                }
                if (f >= 10 && f < 30) {
                    return d.Res.frame.medal_silver_1()
                }
                if (f >= 30 && f < 50) {
                    return d.Res.frame.medal_silver_2()
                }
                if (f >= 50 && f < 70) {
                    return d.Res.frame.medal_silver_3()
                }
                if (f >= 70 && f < 90) {
                    return d.Res.frame.medal_silver_4()
                }
                if (f >= 90 && f < 120) {
                    return d.Res.frame.medal_gold_1()
                }
                if (f >= 120 && f < 150) {
                    return d.Res.frame.medal_gold_2()
                }
                if (f >= 150 && f < 180) {
                    return d.Res.frame.medal_gold_3()
                }
                if (f >= 180) {
                    return d.Res.frame.medal_gold_4()
                }
                return d.Res.frame.medal_none()
            };
            return e
        })();
        d.MedalData = c
    })(a.goldenratio || (a.goldenratio = {}));
    var b = a.goldenratio
})(com || (com = {}));
var com;
(function(a) {
    (function(e) {
        var c = (function(g) {
            __extends(f, g);
            function f(h) {
                g.call(this);
                this._gameOverContainer = new PIXI.DisplayObjectContainer();
                h.addChild(this._gameOverContainer);
                this.showScorePanel = this.showScorePanel.bind(this);
                this.populateScoreData = this.populateScoreData.bind(this);
                this.showButtons = this.showButtons.bind(this);
                this.dispatchButtonReadyEvent = this.dispatchButtonReadyEvent.bind(this)
            }
            f.prototype.show = function(i) {
                this._score = i;
                this._gameOverText = e.Res.frame.text_gameover();
                this._gameOverText.anchor.x = 0.5;
                this._gameOverText.anchor.y = 0.5;
                this._gameOverText.scale.x = 0;
                this._gameOverText.scale.y = 0;
                this._gameOverText.position.x = 160;
                this._gameOverText.position.y = 80;
                this._gameOverContainer.addChild(this._gameOverText);
                var h = this;
                this._tween = new TWEEN.Tween({scale: this._gameOverText.scale.x}).to({scale: 0.5}, 600).easing(TWEEN.Easing.Bounce.Out).onUpdate(function() {
                    if (h._gameOverText) {
                        h._gameOverText.scale.x = this.scale;
                        h._gameOverText.scale.y = this.scale
                    }
                }).onComplete(h.showScorePanel).start()				
				//var titlex = "鸡妈妈感谢你拯救了"+this._score+"颗蛋！分享到朋友圈告诉朋友一起来帮助鸡妈妈~~";
				var score = this._score;
				//btGame.playScoreMsg(titlex);
				dp_submitScore(parseInt(score));
            };
            f.prototype.showScorePanel = function() {
                this._scorePanelGfx = e.Res.frame.score_panel();
                this._scorePanelGfx.scale.x = 1;
                this._scorePanelGfx.scale.y = 1;
                this._scorePanelGfx.anchor.x = 0.5;
                this._scorePanelGfx.anchor.y = 0.5;
                this._scorePanelGfx.position.x = 160;
                this._scorePanelGfx.position.y = 520;
                this._gameOverContainer.addChild(this._scorePanelGfx);
                var h = this;
                this._tween = new TWEEN.Tween({y: this._scorePanelGfx.position.y}).to({y: 190}, 400).easing(TWEEN.Easing.Back.Out).onUpdate(function() {
                    if (h._scorePanelGfx) {
                        h._scorePanelGfx.position.y = this.y;
                        h._scorePanelGfx.position.y = this.y
                    }
                }).onComplete(h.populateScoreData).start()
            };
            f.prototype.populateScoreData = function() {
                var m = new d(this._score.toString());
                m.position.x = 272;
                m.position.y = 155;
                m.alpha = 0;
                this._gameOverContainer.addChild(m);
                var h = e.LocalStorageUtils.getNumber(e.LocalKey.SCORE, 0);
                var k;
                if (this._score > h) {
                    h = this._score;
                    e.LocalStorageUtils.save(e.LocalKey.SCORE, h.toString());
                    k = e.Res.frame.score_new()
                }
                var l = new d(h.toString());
                l.position.x = 272;
                l.position.y = 220;
                l.alpha = 0;
                this._gameOverContainer.addChild(l);
                var j = e.MedalData.getMedalGfxFromScore(this._score);
                if (j) {
                    j.position.x = 50;
                    j.position.y = 155;
                    j.scale.x = 0.8;
                    j.scale.y = 0.8;
                    j.alpha = 0;
                    this._gameOverContainer.addChild(j)
                }
                if (k) {
                    k.position.x = 180;
                    k.position.y = 195;
                    k.alpha = 0;
                    this._gameOverContainer.addChild(k)
                }
                var i = this;
                this._tween = new TWEEN.Tween({alpha: 0}).to({alpha: 1}, 200).easing(TWEEN.Easing.Linear.None).onUpdate(function() {
                    if (m) {
                        m.alpha = this.alpha
                    }
                    if (l) {
                        l.alpha = this.alpha
                    }
                    if (j) {
                        j.alpha = this.alpha
                    }
                    if (k) {
                        k.alpha = this.alpha
                    }
                }).onComplete(i.showButtons).start()
            };
            f.getScoreText = function(h) {
                if (h == "0") {
                    return e.Res.frame.number_0()
                }
                if (h == "1") {
                    return e.Res.frame.number_1()
                }
                if (h == "2") {
                    return e.Res.frame.number_2()
                }
                if (h == "3") {
                    return e.Res.frame.number_3()
                }
                if (h == "4") {
                    return e.Res.frame.number_4()
                }
                if (h == "5") {
                    return e.Res.frame.number_5()
                }
                if (h == "6") {
                    return e.Res.frame.number_6()
                }
                if (h == "7") {
                    return e.Res.frame.number_7()
                }
                if (h == "8") {
                    return e.Res.frame.number_8()
                }
                if (h == "9") {
                    return e.Res.frame.number_9()
                }
            };
            f.prototype.showButtons = function() {
                this._playAgainButton = e.Res.frame.button_playagain();
                this._playAgainButton.position.x = (320 - this._playAgainButton.width) >> 1;
                this._playAgainButton.position.y = 300;
                this._playAgainButton.alpha = 0;
                this._playAgainRect = new PIXI.Rectangle(this._playAgainButton.position.x, this._playAgainButton.position.y, this._playAgainButton.width, this._playAgainButton.height);
                this._moreGamesButton = e.Res.frame.button_moregames();
                this._moreGamesButton.position.x = (320 - this._moreGamesButton.width) >> 1;
                this._moreGamesButton.position.y = 320;
                this._moreGamesButton.alpha = 0;
                this._moreGamesRect = new PIXI.Rectangle(this._moreGamesButton.position.x, 350, this._moreGamesButton.width, this._moreGamesButton.height);
                this._gameOverContainer.addChild(this._moreGamesButton);
                this._gameOverContainer.addChild(this._playAgainButton);
                var h = this;
                this._tween = new TWEEN.Tween({alpha: 0}).to({alpha: 1}, 200).easing(TWEEN.Easing.Linear.None).onUpdate(function() {
                    if (h._playAgainButton) {
                        h._playAgainButton.alpha = this.alpha
                    }
                }).start();
                var i = new TWEEN.Tween({alpha: 0,y: 320}).to({alpha: 1,y: 350}, 200).delay(100).easing(TWEEN.Easing.Back.Out).onUpdate(function() {
                    if (h._moreGamesButton) {
                        h._moreGamesButton.alpha = this.alpha;
                        h._moreGamesButton.position.y = this.y
                    }
                }).onComplete(h.dispatchButtonReadyEvent).start()
            };
            f.prototype.dispatchButtonReadyEvent = function() {
                this.dispatchEvent(new e.GameEvent(e.GameEvent.GAME_OVER_BUTTON_READY))
            };
            f.prototype.setPlayAgainButtonState = function(h) {
                if (h == 1) {
                    this._playAgainButton.position.y += 2;
                    e.SoundManager.playSFX(e.SFXType.CLICK)
                } else {
                    if (h == 2) {
                        this._playAgainButton.position.y -= 2
                    }
                }
            };
            f.prototype.setMoreGamesButtonState = function(h) {
                if (h == 1) {
                    this._moreGamesButton.position.y += 2;
                    e.SoundManager.playSFX(e.SFXType.CLICK)
                } else {
                    if (h == 2) {
                        this._moreGamesButton.position.y -= 2
                    }
                }
            };
            Object.defineProperty(f.prototype, "playAgainRect", {get: function() {
                    return this._playAgainRect
                },enumerable: true,configurable: true});
            Object.defineProperty(f.prototype, "moreGamesRect", {get: function() {
                    return this._moreGamesRect
                },enumerable: true,configurable: true});
            f.prototype.update = function(h) {
            };
            f.prototype.dispose = function() {
                if (this._tween) {
                    this._tween.stop();
                    this._tween = null
                }
                if (this._gameOverContainer) {
                    e.DisplayObjectUtils.removeAllChildren(this._gameOverContainer);
                    e.DisplayObjectUtils.removeFromParent(this._gameOverContainer);
                    this._gameOverContainer = null
                }
                this._gameOverText = null;
                this._scorePanelGfx = null;
                this._playAgainButton = null;
                this._playAgainRect = null;
                this._moreGamesButton = null;
                this._moreGamesRect = null
            };
            return f
        })(PIXI.EventTarget);
        e.GameOverScreen = c;
        var d = (function(g) {
            __extends(f, g);
            function f(l) {
                g.call(this);
                var j = new PIXI.DisplayObjectContainer();
                var h = 0;
                for (var k = l.length - 1; k >= 0; k--) {
                    var m = c.getScoreText(l.charAt(k));
                    m.position.x = h - m.width;
                    j.addChild(m);
                    h -= m.width - 5
                }
                this.addChild(j)
            }
            return f
        })(PIXI.DisplayObjectContainer);
        e.ScoreText = d
    })(a.goldenratio || (a.goldenratio = {}));
    var b = a.goldenratio
})(com || (com = {}));
var com;
(function(a) {
    (function(d) {
        var c = (function() {
            function e(j, k) {
                this._list = [];
                this._listBG = [];
                this._lifeLeft = 5;
                this._container = j;
                this._lifeLeft = k;
                var h = 12;
                var f = 14;
                var m;
                for (m = 0; m < this._lifeLeft; m++) {
                    var l = d.Res.frame.egg_nolife();
                    l.scale.x = 0.6;
                    l.scale.y = 0.6;
                    l.anchor.x = 0.5;
                    l.anchor.y = 0.5;
                    l.position.x = h;
                    l.position.y = f;
                    l.visible = false;
                    j.addChild(l);
                    this._listBG.push(l);
                    h += l.width + 3;
                    if ((m + 1) % 5 == 0) {
                        h = 12;
                        f += 21
                    }
                }
                h = 12;
                f = 14;
                for (m = 0; m < this._lifeLeft; m++) {
                    var g = d.Res.frame.egg_life();
                    g.scale.x = 0.6;
                    g.scale.y = 0.6;
                    g.anchor.x = 0.5;
                    g.anchor.y = 0.5;
                    g.position.x = h;
                    g.position.y = f;
                    j.addChild(g);
                    h += g.width + 3;
                    this._list.push(g);
                    if ((m + 1) % 5 == 0) {
                        h = 12;
                        f += 21
                    }
                }
            }
            e.prototype.reduceLife = function() {
                this._lifeLeft -= 1;
                var f = this._list[this._lifeLeft];
                if (f) {
                    this._listBG[this._lifeLeft].visible = true;
                    this._tween = new TWEEN.Tween({scaleValue: f.scale.x}).to({scaleValue: 0}, 200).easing(TWEEN.Easing.Quadratic.Out).onUpdate(function() {
                        if (f) {
                            f.scale.x = this.scaleValue;
                            f.scale.y = this.scaleValue
                        }
                    }).onComplete(function() {
                        f.visible = false
                    }).start()
                }
            };
            e.prototype.dispose = function() {
                this._container = null;
                this._tween = null;
                if (this._list) {
                    d.DisplayObjectUtils.removeList(this._list);
                    this._list = null
                }
                if (this._listBG) {
                    d.DisplayObjectUtils.removeList(this._listBG);
                    this._listBG = null
                }
            };
            return e
        })();
        d.LifeLeftDisplay = c
    })(a.goldenratio || (a.goldenratio = {}));
    var b = a.goldenratio
})(com || (com = {}));
var com;
(function(a) {
    (function(d) {
        var c = (function() {
            function e(f) {
                this._container = f;
                this._scoreContainer = new PIXI.DisplayObjectContainer();
                this._container.addChild(this._scoreContainer)
            }
            e.getScoreText = function(f) {
                if (f == "0") {
                    return d.Res.frame.text_0()
                }
                if (f == "1") {
                    return d.Res.frame.text_1()
                }
                if (f == "2") {
                    return d.Res.frame.text_2()
                }
                if (f == "3") {
                    return d.Res.frame.text_3()
                }
                if (f == "4") {
                    return d.Res.frame.text_4()
                }
                if (f == "5") {
                    return d.Res.frame.text_5()
                }
                if (f == "6") {
                    return d.Res.frame.text_6()
                }
                if (f == "7") {
                    return d.Res.frame.text_7()
                }
                if (f == "8") {
                    return d.Res.frame.text_8()
                }
                if (f == "9") {
                    return d.Res.frame.text_9()
                }
            };
            e.prototype.setScore = function(k) {
                d.DisplayObjectUtils.removeAllChildren(this._scoreContainer);
                var j = k.toString();
                var g = 0;
                for (var h = 0; h < j.length; h++) {
                    var f = e.getScoreText(j.charAt(h));
                    f.scale.x = 0.5;
                    f.scale.y = 0.5;
                    f.position.x = g;
                    this._scoreContainer.addChild(f);
                    g += f.width - 6
                }
                this._scoreContainer.position.x = (320 - g + 6) >> 1;
                this._scoreContainer.position.y = -4
            };
            e.prototype.hide = function() {
                var f = this;
                this._tween = new TWEEN.Tween({alpha: 1}).to({alpha: 0}, 200).easing(TWEEN.Easing.Linear.None).onUpdate(function() {
                    if (f._scoreContainer) {
                        f._scoreContainer.alpha = this.alpha
                    }
                }).start()
            };
            e.prototype.dispose = function() {
                this._container = null;
                if (this._tween) {
                    this._tween.stop();
                    this._tween = null
                }
                if (this._scoreContainer) {
                    d.DisplayObjectUtils.removeAllChildren(this._scoreContainer);
                    d.DisplayObjectUtils.removeFromParent(this._scoreContainer);
                    this._scoreContainer = null
                }
            };
            return e
        })();
        d.ScoreDisplay = c
    })(a.goldenratio || (a.goldenratio = {}));
    var b = a.goldenratio
})(com || (com = {}));
var com;
(function(a) {
    (function(d) {
        var c = (function() {
            function e(f) {
                this._onState = true;
                this._container = f;
                this._soundOn = d.Res.frame.volume_on();
                this._soundOn.scale.x = 0.5;
                this._soundOn.scale.y = 0.5;
                this._soundOn.position.x = 320 - this._soundOn.width - 4;
                this._soundOn.position.y = 2;
                this._soundOn.visible = false;
                this._container.addChild(this._soundOn);
                this._soundRect = new PIXI.Rectangle(this._soundOn.position.x, this._soundOn.position.y, this._soundOn.width, this._soundOn.height);
                this._soundOff = d.Res.frame.volume_off();
                this._soundOff.scale.x = 0.5;
                this._soundOff.scale.y = 0.5;
                this._soundOff.position.x = 320 - this._soundOff.width - 4;
                this._soundOff.position.y = 2;
                this._soundOff.visible = false;
                this._container.addChild(this._soundOff);
                var g = d.LocalStorageUtils.getBoolean(d.LocalKey.SOUND_KEY, true);
                d.SoundManager.setUserMute(!g);
                this.setSoundOn(g)
            }
            e.prototype.setSoundOn = function(f) {
                this._onState = f;
                this.update()
            };
            e.prototype.toggleSound = function() {
                this._onState = !this._onState;
                d.SoundManager.setUserMute(!this._onState);
                d.LocalStorageUtils.save(d.LocalKey.SOUND_KEY, this._onState.toString());
                this.update()
            };
            e.prototype.buttonDown = function() {
                this._soundOn.position.y += 2;
                this._soundOff.position.y += 2;
                d.SoundManager.playSFX(d.SFXType.CLICK)
            };
            e.prototype.buttonUp = function() {
                this._soundOn.position.y -= 2;
                this._soundOff.position.y -= 2
            };
            e.prototype.update = function() {
                this.clear();
                if (this._onState) {
                    this._soundOn.visible = true
                } else {
                    this._soundOff.visible = true
                }
            };
            e.prototype.clear = function() {
                this._soundOff.visible = false;
                this._soundOn.visible = false
            };
            Object.defineProperty(e.prototype, "soundRect", {get: function() {
                    return this._soundRect
                },enumerable: true,configurable: true});
            Object.defineProperty(e.prototype, "onState", {get: function() {
                    return this._onState
                },enumerable: true,configurable: true});
            e.prototype.dispose = function() {
                this._container = null;
                this._soundRect = null;
                if (this._soundOn) {
                    d.DisplayObjectUtils.removeFromParent(this._soundOn);
                    this._soundOn = null
                }
                if (this._soundOff) {
                    d.DisplayObjectUtils.removeFromParent(this._soundOff);
                    this._soundOff = null
                }
            };
            return e
        })();
        d.SoundButtonDisplay = c
    })(a.goldenratio || (a.goldenratio = {}));
    var b = a.goldenratio
})(com || (com = {}));
var com;
(function(a) {
    (function(d) {
        var c = (function() {
            function e(f) {
                this._tapContainer = new PIXI.DisplayObjectContainer();
                f.addChild(this._tapContainer);
                this.dispose = this.dispose.bind(this)
            }
            e.prototype.show = function() {
                var h = d.Res.frame.tap_right();
                h.scale.x = 0.6;
                h.scale.y = 0.6;
                h.position.x = 200;
                h.position.y = 400;
                var g = d.Res.frame.tap_left();
                g.scale.x = 0.6;
                g.scale.y = 0.6;
                g.position.x = 40;
                g.position.y = 400;
                this._tapContainer.addChild(g);
                this._tapContainer.addChild(h);
                var f = new PIXI.MovieClip([PIXI.Texture.fromFrame(d.Res.frame.id_tap_hand_01), PIXI.Texture.fromFrame(d.Res.frame.id_tap_hand_02)]);
                f.loop = true;
                f.animationSpeed = 0.05;
                f.gotoAndPlay(0);
                f.scale.x = 0.6;
                f.scale.y = 0.6;
                f.position.x = 125;
                f.position.y = 410;
                this._tapContainer.addChild(f)
            };
            e.prototype.hide = function() {
                var f = this;
                this._tween = new TWEEN.Tween({alpha: 1}).to({alpha: 0}, 200).easing(TWEEN.Easing.Linear.None).onUpdate(function() {
                    if (f._tapContainer) {
                        f._tapContainer.alpha = this.alpha
                    }
                }).onComplete(f.dispose).start()
            };
            e.prototype.dispose = function() {
                if (this._tapContainer) {
                    d.DisplayObjectUtils.removeAllChildren(this._tapContainer);
                    d.DisplayObjectUtils.removeFromParent(this._tapContainer);
                    this._tapContainer = null
                }
            };
            return e
        })();
        d.TapInfo = c
    })(a.goldenratio || (a.goldenratio = {}));
    var b = a.goldenratio
})(com || (com = {}));
var com;
(function(a) {
    (function(d) {
        var c = (function(e) {
            __extends(f, e);
            function f(g) {
                e.call(this);
                this._transitionContainer = new PIXI.DisplayObjectContainer();
                g.addChild(this._transitionContainer);
                this.clear = this.clear.bind(this)
            }
            f.prototype.showScreen = function() {
                this._gfx = d.Res.frame.trans();
                this._gfx.position.x = -320;
                this._transitionContainer.addChild(this._gfx);
                var g = this;
                this._tween = new TWEEN.Tween({x: -320}).to({x: -960}, 500).easing(TWEEN.Easing.Quadratic.In).onUpdate(function() {
                    if (g._gfx) {
                        g._gfx.position.x = this.x
                    }
                }).onComplete(function() {
                    g.dispatchEvent(new d.GameEvent(d.GameEvent.SCREEN_TRANSITION_SHOW_SCREEN))
                }).start()
            };
            f.prototype.clear = function() {
                d.DisplayObjectUtils.removeAllChildren(this._transitionContainer);
                this._gfx = null
            };
            f.prototype.hideScreen = function() {
                this._gfx = d.Res.frame.trans();
                this._gfx.position.x = 320;
                this._transitionContainer.addChild(this._gfx);
                var g = this;
                this._tween = new TWEEN.Tween({x: 320}).to({x: -320}, 500).easing(TWEEN.Easing.Quadratic.Out).onUpdate(function() {
                    if (g._gfx) {
                        g._gfx.position.x = this.x
                    }
                }).onComplete(function() {
                    g.dispatchEvent(new d.GameEvent(d.GameEvent.SCREEN_TRANSITION_HIDE_SCREEN))
                }).start()
            };
            f.prototype.dispose = function() {
                if (this._tween) {
                    this._tween = null
                }
                if (this._transitionContainer) {
                    d.DisplayObjectUtils.removeAllChildren(this._transitionContainer);
                    this._transitionContainer = null
                }
                this._gfx = null
            };
            return f
        })(PIXI.EventTarget);
        d.ScreenTransition = c
    })(a.goldenratio || (a.goldenratio = {}));
    var b = a.goldenratio
})(com || (com = {}));
var com;
(function(a) {
    (function(d) {
        var c = (function() {
            function e(f) {
                this._stage = f;
                this.mapBinds();
                this.init()
            }
            e.prototype.resetProperties = function() {
                this._landBasketCount = 0;
                this._lifesLeft = 3;
                this._scoreValue = 0;
                this._canEggJump = false;
                this._showTapInfo = true;
                this._isGamePaused = false;
                this._isGameOver = false
            };
            e.prototype.init = function() {
                this.resetProperties();
                this._backgroundContainer = new PIXI.DisplayObjectContainer();
                this._stage.addChild(this._backgroundContainer);
                this._container = new PIXI.DisplayObjectContainer();
                this._container.position.x = 0;
                this._container.position.y = 460;
                this._stage.addChild(this._container);
                this._overlayContainer = new PIXI.DisplayObjectContainer();
                this._stage.addChild(this._overlayContainer);
                this._pauseContainer = new PIXI.DisplayObjectContainer();
                this._stage.addChild(this._pauseContainer);
                this.createBackground();
                this.createEgg();
                this._bucketManager = new d.BucketManager(this._container);
                this._lifeLeftDisplay = new d.LifeLeftDisplay(this._backgroundContainer, this._lifesLeft);
                this._scoreDisplay = new d.ScoreDisplay(this._backgroundContainer);
                this._scoreDisplay.setScore(this._scoreValue);
                this._soundButton = new d.SoundButtonDisplay(this._backgroundContainer);
                this._inputControl = new d.InputControl();
                this._inputControl.addEventListener(d.GameEvent.CANVAS_MOUSE_DOOWN, this.onCanvasMouseDownHL);
                this._inputControl.addEventListener(d.GameEvent.BUTTON_DOWN, this.onInputButtonDownHL);
                this._inputControl.addEventListener("ontouchstart", this.onInputButtonDownHL);
                this._inputControl.addEventListener(d.GameEvent.BUTTON_UP, this.onInputButtonUpHL);
                this._inputControl.addEventListener("ontouchend", this.onInputButtonUpHL);
                this._inputControl.setSoundButtonRect(this._soundButton.soundRect);
                this._inputControl.setEnable(false);
                this._pauseTextGfx = d.Res.frame.text_paused();
                this._pauseTextGfx.scale.x = 0.5;
                this._pauseTextGfx.scale.y = 0.5;
                this._pauseTextGfx.position.x = ((320 - this._pauseTextGfx.width) >> 1) + 5;
                this._pauseTextGfx.position.y = 110;
                this._pauseButtonGfx = d.Res.frame.pause_play_button();
                this._pauseButtonGfx.scale.x = 0.5;
                this._pauseButtonGfx.scale.y = 0.5;
                this._pauseButtonGfx.position.x = ((320 - this._pauseButtonGfx.width) >> 1) + 5;
                this._pauseButtonGfx.position.y = 200;
                this._inputControl.setPauseButtonRect(new PIXI.Rectangle(this._pauseButtonGfx.position.x, 200, this._pauseButtonGfx.width, this._pauseButtonGfx.height));
                this._gameOverScreen = new d.GameOverScreen(this._overlayContainer);
                this._gameOverScreen.addEventListener(d.GameEvent.GAME_OVER_BUTTON_READY, this.onGameOverButtonReady);
                this._tapInfo = new d.TapInfo(this._overlayContainer);
                this._screenTransition = new d.ScreenTransition(this._overlayContainer);
                this._screenTransition.addEventListener(d.GameEvent.SCREEN_TRANSITION_SHOW_SCREEN, this.onScreenTransitionShowScreen);
                this._screenTransition.addEventListener(d.GameEvent.SCREEN_TRANSITION_HIDE_SCREEN, this.onScreenTransitionHideScreen);
                window.addEventListener("blur", this.onWindowBlurHL, false);
                document.addEventListener(visibilityChange, this.handleVisiblityChange, false);
                this.setCanEggJump(true);
                this._egg.setBasketID(0);
                this._bucketManager.updateCurrentBasket(this._egg.basketID);
                this._tapInfo.show();
                this._screenTransition.showScreen()
            };
            e.prototype.handleVisiblityChange = function(f) {
                this.pauseGame();
                f.stopPropagation()
            };
            e.prototype.onWindowBlurHL = function(f) {
                this.pauseGame();
                f.stopPropagation()
            };
            e.prototype.pauseGame = function() {
                if (this._isGamePaused || this._isGameOver) {
                    return
                }
                this._isGamePaused = true;
                this._pauseTextGfx.alpha = 1;
                this._pauseContainer.addChild(this._pauseTextGfx);
                this._pauseButtonGfx.alpha = 1;
                this._pauseContainer.addChild(this._pauseButtonGfx);
                this._inputControl.setGamePaused(true)
            };
            e.prototype.resumeGame = function() {
                if (!this._isGamePaused || this._isGameOver) {
                    return
                }
                var f = this;
                new TWEEN.Tween({alpha: 1}).to({alpha: 0}, 170).easing(TWEEN.Easing.Linear.None).onUpdate(function() {
                    if (f._pauseButtonGfx) {
                        f._pauseButtonGfx.alpha = this.alpha
                    }
                    if (f._pauseTextGfx) {
                        f._pauseTextGfx.alpha = this.alpha
                    }
                }).onComplete(function() {
                    f._isGamePaused = false;
                    d.DisplayObjectUtils.removeAllChildren(f._pauseContainer);
                    f._inputControl.setGamePaused(false)
                }).start()
            };
            e.prototype.createEgg = function() {
                this._egg = new d.Egg();
                this.addEggListeners();
                this._egg.setPosition(0, 0);
                this._container.addChild(this._egg.gfx)
            };
            e.prototype.addEggListeners = function() {
                this._egg.addEventListener(d.GameEvent.EGG_OUTOFF_BASKET, this.onEggOutOffBasket);
                this._egg.addEventListener(d.GameEvent.EGG_INSIDE_BASKET, this.onEggInsideBasket);
                this._egg.addEventListener(d.GameEvent.EGG_DIED, this.onEggDieHL);
                this._egg.addEventListener(d.GameEvent.GAME_OVER, this.onGameOverHL)
            };
            e.prototype.removeEggListeners = function() {
                this._egg.removeEventListener(d.GameEvent.EGG_OUTOFF_BASKET, this.onEggOutOffBasket);
                this._egg.removeEventListener(d.GameEvent.EGG_INSIDE_BASKET, this.onEggInsideBasket);
                this._egg.removeEventListener(d.GameEvent.EGG_DIED, this.onEggDieHL);
                this._egg.removeEventListener(d.GameEvent.GAME_OVER, this.onGameOverHL)
            };
            e.prototype.createBackground = function() {
                var f = d.Res.frame.bg();
                f.scale.x = 0.4;
                f.scale.y = 0.4;
                this._backgroundContainer.addChild(f)
            };
            e.prototype.mapBinds = function() {
                this.onCanvasMouseDownHL = this.onCanvasMouseDownHL.bind(this);
                this.onEggOutOffBasket = this.onEggOutOffBasket.bind(this);
                this.onEggInsideBasket = this.onEggInsideBasket.bind(this);
                this.onEggDieHL = this.onEggDieHL.bind(this);
                this.onGameOverHL = this.onGameOverHL.bind(this);
                this.onInputButtonUpHL = this.onInputButtonUpHL.bind(this);
                this.onInputButtonDownHL = this.onInputButtonDownHL.bind(this);
                this.onContainerScrollComplete = this.onContainerScrollComplete.bind(this);
                this.onGameOverButtonReady = this.onGameOverButtonReady.bind(this);
                this.onScreenTransitionShowScreen = this.onScreenTransitionShowScreen.bind(this);
                this.onScreenTransitionHideScreen = this.onScreenTransitionHideScreen.bind(this);
                this.onWindowBlurHL = this.onWindowBlurHL.bind(this);
                this.handleVisiblityChange = this.handleVisiblityChange.bind(this)
            };
            e.prototype.onCanvasMouseDownHL = function(f) {
                if (!this._canEggJump || !this._egg) {
                    return
                }
                if (this._showTapInfo) {
                    this._showTapInfo = false;
                    if (this._tapInfo) {
                        this._tapInfo.hide()
                    }
                }
                this.setCanEggJump(false);
                this._canEggJump = false;
                this._egg.setJump(true);
                this._bucketManager.currentBasket.onEggJumpedOffBasket();
                d.SoundManager.playSFX(d.SFXType.WOOD_TAP)
            };
            e.prototype.setCanEggJump = function(f) {
                this._canEggJump = f
            };
            e.prototype.onInputButtonUpHL = function(f) {
                if (this._inputControl.isSoundButtonPressed) {
                    this._soundButton.buttonUp();
                    this._soundButton.toggleSound()
                } else {
                    if (this._inputControl.isPlayAgainPressed) {
                        this._inputControl.setEnable(false);
                        this._gameOverScreen.setPlayAgainButtonState(2);
                        this._screenTransition.hideScreen()
                    } else {
                        if (this._inputControl.isMoreGamesPressed) {
                            this._gameOverScreen.setMoreGamesButtonState(2);
                            //window.top.location.href = btGame.URL.getMoreGame();
							clickMore();
                        } else {
                            if (this._inputControl.isPauseButtonPressed) {
                                this._pauseButtonGfx.position.y -= 2;
                                this.resumeGame()
                            }
                        }
                    }
                }
            };
            e.prototype.onInputButtonDownHL = function(f) {
                if (this._inputControl.isSoundButtonPressed) {
                    this._soundButton.buttonDown()
                } else {
                    if (this._inputControl.isPlayAgainPressed) {
                        this._gameOverScreen.setPlayAgainButtonState(1)
                    } else {
                        if (this._inputControl.isMoreGamesPressed) {
                            this._gameOverScreen.setMoreGamesButtonState(1)
                        } else {
                            if (this._inputControl.isPauseButtonPressed) {
                                this._pauseButtonGfx.position.y += 2;
                                d.SoundManager.playSFX(d.SFXType.CLICK)
                            }
                        }
                    }
                }
            };
            e.prototype.onEggOutOffBasket = function(f) {
                if (this._bucketManager.nextBasket) {
                    this._container.swapChildren(this._bucketManager.nextBasket.gfx, this._egg.gfx)
                }
            };
            e.prototype.onEggDieHL = function(f) {
                this.setCanEggJump(false);
                this._container.swapChildren(this._bucketManager.currentBasket.gfx, this._egg.gfx)
            };
            e.prototype.onGameOverHL = function(f) {
                d.SoundManager.playSFX(d.SFXType.EGG_FALL);
                this._lifesLeft -= 1;
                this._lifeLeftDisplay.reduceLife();
                if (this._lifesLeft > 0) {
                    this._egg.reset();
                    this._egg.setBasketID(this._bucketManager.currentBasket.id);
                    this._bucketManager.currentBasket.reset();
                    this._bucketManager.onEggLanded();
                    this._bucketManager.currentBasket.onEggLanded();
                    this.clearAndUpdateDisplayList();
                    this.setCanEggJump(true)
                } else {
                    this.showGameOverForReal(true)
                }
            };
            e.prototype.showGameOverForReal = function(f) {
                if (this._egg && f) {
                    this._egg.dispose();
                    this.removeEggListeners();
                    this._egg = null
                }
                this._isGameOver = true;
                this._scoreDisplay.hide();
                this._gameOverScreen.show(this._scoreValue);
                d.SoundManager.playSFX(d.SFXType.LEVEL_COMPLETE)
            };
            e.prototype.onScreenTransitionShowScreen = function(f) {
                this._screenTransition.clear();
                this._inputControl.setEnable(true)
            };
            e.prototype.onScreenTransitionHideScreen = function(f) {
                this.clearGameArea();
                this.init()
            };
            e.prototype.onGameOverButtonReady = function(f) {
                this._inputControl.setPlayAgainRect(this._gameOverScreen.playAgainRect);
                this._inputControl.setMoreGamesRect(this._gameOverScreen.moreGamesRect)
            };
            e.prototype.clearAndUpdateDisplayList = function() {
                d.DisplayObjectUtils.removeAllChildren(this._container);
                this._container.addChild(this._egg.gfx);
                this._bucketManager.updateCurrentBasket(this._egg.basketID)
            };
            e.prototype.onEggInsideBasket = function(f) {
                if (this._bucketManager.nextBasket) {
                    this._container.swapChildren(this._bucketManager.nextBasket.gfx, this._egg.gfx)
                }
            };
            e.prototype.update = function(f) {
                if (this._isGamePaused) {
                    return
                }
                if (this._egg && !this._egg.hasFallenOffScreen) {
                    this._egg.update(f, this._bucketManager.currentBasket, this._bucketManager.nextBasket, this._bucketManager.firstBasket);
                    if (this._egg && !this._egg.hasFallenOffScreen) {
                        if (this._egg.isFalling && this._egg.canLandInNextBasket && this._bucketManager.nextBasket) {
                            this.landOnNextBasket()
                        }
                    }
                }
                if (this._bucketManager && this._egg) {
                    this._bucketManager.update(f)
                }
            };
            e.prototype.landOnNextBasket = function() {
                this._landBasketCount++;
                d.SoundManager.playSFX(d.SFXType.EGG_SUCCESS);
                if (this._bucketManager.currentBasket) {
                    this._egg.setBasketID(this._bucketManager.nextBasket.id);
                    this._bucketManager.onEggLanded();
                    this._bucketManager.updateCurrentBasket(this._egg.basketID);
                    this._bucketManager.currentBasket.onEggLanded();
                    this.incrementScore(1);
                    if (this._bucketManager.nextBasket) {
                        if (this._landBasketCount >= 2) {
                            this._landBasketCount = 0;
                            var f = this;
                            this._tween = new TWEEN.Tween({y: this._container.position.y}).to({y: 460 - this._bucketManager.currentBasket.rect.y - this._bucketManager.currentBasket.rect.height - 20}, 500).easing(TWEEN.Easing.Quadratic.Out).delay(200).onUpdate(function() {
                                if (f._container) {
                                    f._container.position.y = this.y
                                }
                            }).onComplete(this.onContainerScrollComplete).start()
                        } else {
                            this.setCanEggJump(true)
                        }
                    } else {
                        this.showGameOverForReal(false)
                    }
                }
            };
            e.prototype.incrementScore = function(f) {
                this._scoreValue += f;
                this._scoreDisplay.setScore(this._scoreValue)
            };
            e.prototype.onContainerScrollComplete = function() {
                this._bucketManager.onContainerScrollComplete();
                this.setCanEggJump(true)
            };
            e.prototype.clearGameArea = function() {
                window.removeEventListener("blur", this.onWindowBlurHL, false);
                document.removeEventListener(visibilityChange, this.handleVisiblityChange, false);
                if (this._tween) {
                    this._tween = null
                }
                if (this._bucketManager) {
                    this._bucketManager.dispose();
                    this._bucketManager = null
                }
                if (this._lifeLeftDisplay) {
                    this._lifeLeftDisplay.dispose();
                    this._lifeLeftDisplay = null
                }
                if (this._scoreDisplay) {
                    this._scoreDisplay.dispose();
                    this._scoreDisplay = null
                }
                if (this._soundButton) {
                    this._soundButton.dispose();
                    this._soundButton = null
                }
                if (this._inputControl) {
                    this._inputControl.removeEventListener(d.GameEvent.CANVAS_MOUSE_DOOWN, this.onCanvasMouseDownHL);
                    this._inputControl.removeEventListener(d.GameEvent.BUTTON_DOWN, this.onInputButtonDownHL);
                    this._inputControl.removeEventListener(d.GameEvent.BUTTON_UP, this.onInputButtonUpHL);
                    this._inputControl.dispose();
                    this._inputControl = null
                }
                if (this._egg) {
                    this._egg.dispose();
                    this._egg = null
                }
                if (this._gameOverScreen) {
                    this._gameOverScreen.removeEventListener(d.GameEvent.GAME_OVER_BUTTON_READY, this.onGameOverButtonReady);
                    this._gameOverScreen.dispose();
                    this._gameOverScreen = null
                }
                if (this._tapInfo) {
                    this._tapInfo.dispose();
                    this._tapInfo = null
                }
                if (this._screenTransition) {
                    this._screenTransition.removeEventListener(d.GameEvent.SCREEN_TRANSITION_SHOW_SCREEN, this.onScreenTransitionShowScreen);
                    this._screenTransition.removeEventListener(d.GameEvent.SCREEN_TRANSITION_HIDE_SCREEN, this.onScreenTransitionHideScreen);
                    this._screenTransition.dispose();
                    this._screenTransition = null
                }
                d.DisplayObjectUtils.removeAllChildren(this._container);
                d.DisplayObjectUtils.removeFromParent(this._container);
                this._container = null;
                d.DisplayObjectUtils.removeAllChildren(this._backgroundContainer);
                d.DisplayObjectUtils.removeFromParent(this._backgroundContainer);
                this._backgroundContainer = null;
                d.DisplayObjectUtils.removeAllChildren(this._overlayContainer);
                d.DisplayObjectUtils.removeFromParent(this._overlayContainer);
                this._overlayContainer = null;
                d.DisplayObjectUtils.removeAllChildren(this._pauseContainer);
                d.DisplayObjectUtils.removeFromParent(this._pauseContainer);
                this._pauseContainer = null;
                this._pauseButtonGfx = null;
                this._pauseTextGfx = null
            };
            e.prototype.dispose = function() {
                this.clearGameArea();
                this._stage = null
            };
            return e
        })();
        d.GameArea = c
    })(a.goldenratio || (a.goldenratio = {}));
    var b = a.goldenratio
})(com || (com = {}));
var com;
(function(a) {
    (function(d) {
        var c = (function(f) {
            __extends(e, f);
            function e(g) {
                f.call(this);
                this.mapBinds();
                this._backgroundContainer = new PIXI.DisplayObjectContainer();
                g.addChild(this._backgroundContainer);
                this._gfxContainer = new PIXI.DisplayObjectContainer();
                g.addChild(this._gfxContainer);
                this._overlayContainer = new PIXI.DisplayObjectContainer();
                g.addChild(this._overlayContainer);
                this.createBackground();
                this.createTitleGfx(false);
                var h = d.Res.frame.labrat_copyright();
                h.position.x = 5;
                h.position.y = 445;
                this._backgroundContainer.addChild(h);
                this._soundButton = new d.SoundButtonDisplay(this._backgroundContainer);
                this._inputControl = new d.InputControl();
                this._inputControl.addEventListener(d.GameEvent.BUTTON_DOWN, this.onInputButtonDownHL);
                this._inputControl.addEventListener(d.GameEvent.BUTTON_UP, this.onInputButtonUpHL);
                this._inputControl.setEnable(false);
                this._inputControl.setSoundButtonRect(this._soundButton.soundRect);
                this.createAndShowButtons(false);
                this._screenTransition = new d.ScreenTransition(this._overlayContainer);
                this._screenTransition.addEventListener(d.GameEvent.SCREEN_TRANSITION_SHOW_SCREEN, this.onScreenTransitionShowScreen);
                this._screenTransition.addEventListener(d.GameEvent.SCREEN_TRANSITION_HIDE_SCREEN, this.onScreenTransitionHideScreen);
                this._screenTransition.showScreen()
            }
            e.prototype.mapBinds = function() {
                this.onScreenTransitionShowScreen = this.onScreenTransitionShowScreen.bind(this);
                this.onScreenTransitionHideScreen = this.onScreenTransitionHideScreen.bind(this);
                this.onInputButtonUpHL = this.onInputButtonUpHL.bind(this);
                this.onInputButtonDownHL = this.onInputButtonDownHL.bind(this);
                this.showCreditsPanel = this.showCreditsPanel.bind(this);
                this.showCreditsMainMenuButton = this.showCreditsMainMenuButton.bind(this);
                this.showCreditsDone = this.showCreditsDone.bind(this);
                this.clearCreditsScreen = this.clearCreditsScreen.bind(this)
            };
            e.prototype.createBackground = function() {
                var g = d.Res.frame.bg();
                g.scale.x = 0.4;
                g.scale.y = 0.4;
                this._backgroundContainer.addChild(g)
            };
            e.prototype.createTitleGfx = function(h) {
                this._titleGfx = d.Res.frame.egg_title();
                this._titleGfx.scale.x = 0.5;
                this._titleGfx.scale.y = 0.5;
                this._titleGfx.position.x = 17;
                this._titleGfx.position.y = 50;
                if (h) {
                    this._titleGfx.alpha = 0
                }
                this._gfxContainer.addChild(this._titleGfx);
                if (h) {
                    var g = this;
                    new TWEEN.Tween({alpha: 0}).to({alpha: 1}, 170).easing(TWEEN.Easing.Linear.None).onUpdate(function() {
                        if (g._titleGfx) {
                            g._titleGfx.alpha = this.alpha
                        }
                    }).start()
                }
            };
            e.prototype.createAndShowButtons = function(h) {
                this._playButton = d.Res.frame.button_startgame();
                this._playButton.position.x = 79;
                this._playButton.position.y = 305;
                if (h) {
                    this._playButton.alpha = 0
                }
                this._gfxContainer.addChild(this._playButton);
                this._creditsButton = d.Res.frame.button_credits();
                this._creditsButton.position.x = 79;
                this._creditsButton.position.y = 370;
                if (h) {
                    this._creditsButton.position.y = 315;
                    this._creditsButton.alpha = 0
                }
                this._gfxContainer.addChild(this._creditsButton);
                this._playButtonRect = new PIXI.Rectangle(79, 305, this._playButton.width, this._playButton.height);
                this._creditButtonRect = new PIXI.Rectangle(79, 370, this._creditsButton.width, this._creditsButton.height);
                this._inputControl.setStartGameRect(this._playButtonRect);
                this._inputControl.setCreditsRect(this._creditButtonRect);
                if (h) {
                    var g = this;
                    new TWEEN.Tween({alpha: 0}).to({alpha: 1}, 200).delay(150).easing(TWEEN.Easing.Linear.None).onUpdate(function() {
                        if (g._playButton) {
                            g._playButton.alpha = this.alpha
                        }
                    }).start();
                    new TWEEN.Tween({y: 315,alpha: 0}).to({y: 370,alpha: 1}, 200).delay(180).easing(TWEEN.Easing.Back.InOut).onUpdate(function() {
                        if (g._creditsButton) {
                            g._creditsButton.position.y = this.y;
                            g._creditsButton.alpha = this.alpha
                        }
                    }).onComplete(function() {
                        g._inputControl.setEnable(true)
                    }).start()
                }
            };
            e.prototype.onInputButtonDownHL = function(g) {
                if (this._inputControl.isSoundButtonPressed) {
                    this._soundButton.buttonDown()
                } else {
                    if (this._inputControl.isStartGamePressed) {
                        this._playButton.position.y += 2;
                        d.SoundManager.playSFX(d.SFXType.CLICK)
                    } else {
                        if (this._inputControl.isCreditPressed) {
                            this._creditsButton.position.y += 2;
                            d.SoundManager.playSFX(d.SFXType.CLICK)
                        } else {
                            if (this._inputControl.isMainMenuPressed) {
                                this._mainMenuButton.position.y += 2;
                                d.SoundManager.playSFX(d.SFXType.CLICK)
                            }
                        }
                    }
                }
            };
            e.prototype.onInputButtonUpHL = function(g) {
                if (this._inputControl.isSoundButtonPressed) {
                    this._soundButton.buttonUp();
                    this._soundButton.toggleSound()
                } else {
                    if (this._inputControl.isStartGamePressed) {
                        this._playButton.position.y -= 2;
                        this.startGame()
                    } else {
                        if (this._inputControl.isCreditPressed) {
                            this._creditsButton.position.y -= 2;
                            // this.hideTitle()
                            window.top.location.href = btGame.URL.getMoreGame();
                        } else {
                            if (this._inputControl.isMainMenuPressed) {
                                this._mainMenuButton.position.y -= 2;
                                this.hideCreditsScreen()
                            }
                        }
                    }
                }
            };
            e.prototype.startGame = function() {
                this._inputControl.setEnable(false);
                this._screenTransition.hideScreen()
            };
            e.prototype.hideTitle = function() {
                this._inputControl.setEnable(false);
                var g = this;
                new TWEEN.Tween({alpha: 1}).to({alpha: 0}, 170).easing(TWEEN.Easing.Linear.None).onUpdate(function() {
                    if (g._titleGfx) {
                        g._titleGfx.alpha = this.alpha
                    }
                }).start();
                new TWEEN.Tween({x: 79,x2: 79}).to({x: -160,x2: 430}, 200).easing(TWEEN.Easing.Quadratic.Out).onUpdate(function() {
                    if (g._playButton) {
                        g._playButton.position.x = this.x
                    }
                    if (g._creditsButton) {
                        g._creditsButton.position.x = this.x2
                    }
                }).onComplete(g.showCreditsPanel).start()
            };
            e.prototype.clearTitleScreen = function() {
                d.DisplayObjectUtils.removeAllChildren(this._gfxContainer);
                this._titleGfx = null;
                this._playButton = null;
                this._creditsButton = null;
                this._creditButtonRect = null;
                this._playButtonRect = null;
                this._inputControl.setStartGameRect(null);
                this._inputControl.setCreditsRect(null)
            };
            e.prototype.showCreditsPanel = function() {
                this.clearTitleScreen();
                this._creditsPanelGfx = d.Res.frame.credits_panel();
                this._creditsPanelGfx.position.x = 24;
                this._creditsPanelGfx.position.y = 90;
                this._creditsPanelGfx.alpha = 0;
                this._gfxContainer.addChild(this._creditsPanelGfx);
                var g = this;
                new TWEEN.Tween({y: 400,alpha: 0}).to({y: 90,alpha: 1}, 800).easing(TWEEN.Easing.Back.InOut).onUpdate(function() {
                    if (g._creditsPanelGfx) {
                        g._creditsPanelGfx.position.y = this.y;
                        g._creditsPanelGfx.alpha = this.alpha
                    }
                }).onComplete(g.showCreditsMainMenuButton).start()
            };
            e.prototype.showCreditsMainMenuButton = function() {
                this._mainMenuButton = d.Res.frame.button_mainmenu();
                this._mainMenuButton.position.x = 79;
                this._mainMenuButton.position.y = 335;
                this._mainMenuButton.alpha = 0;
                this._gfxContainer.addChild(this._mainMenuButton);
                this._mainMenuButtonRect = new PIXI.Rectangle(79, 335, this._mainMenuButton.width, this._mainMenuButton.height);
                var g = this;
                new TWEEN.Tween({y: 290,alpha: 0}).to({y: 335,alpha: 1}, 200).easing(TWEEN.Easing.Quadratic.Out).onUpdate(function() {
                    if (g._mainMenuButton) {
                        g._mainMenuButton.position.y = this.y;
                        g._mainMenuButton.alpha = this.alpha
                    }
                }).onComplete(g.showCreditsDone).start()
            };
            e.prototype.hideCreditsScreen = function() {
                this._inputControl.setEnable(false);
                var g = this;
                new TWEEN.Tween({alpha: 1}).to({alpha: 0}, 170).easing(TWEEN.Easing.Linear.None).onUpdate(function() {
                    if (g._creditsPanelGfx) {
                        g._creditsPanelGfx.alpha = this.alpha
                    }
                    if (g._mainMenuButton) {
                        g._mainMenuButton.alpha = this.alpha
                    }
                }).onComplete(g.clearCreditsScreen).start()
            };
            e.prototype.clearCreditsScreen = function() {
                d.DisplayObjectUtils.removeAllChildren(this._gfxContainer);
                this._mainMenuButton = null;
                this._mainMenuButtonRect = null;
                this._creditsPanelGfx = null;
                this._inputControl.setMainMenuRect(null);
                this.createTitleGfx(true);
                this.createAndShowButtons(true)
            };
            e.prototype.showCreditsDone = function() {
                this._inputControl.setMainMenuRect(this._mainMenuButtonRect);
                this._inputControl.setEnable(true)
            };
            e.prototype.onScreenTransitionShowScreen = function(g) {
                this._screenTransition.clear();
                this._inputControl.setEnable(true)
            };
            e.prototype.onScreenTransitionHideScreen = function(g) {
                this.dispatchEvent(new d.GameEvent(d.GameEvent.START_GAME))
            };
            e.prototype.update = function(g) {
            };
            e.prototype.dispose = function() {
                if (this._screenTransition) {
                    this._screenTransition.dispose();
                    this._screenTransition = null
                }
                if (this._inputControl) {
                    this._inputControl.dispose();
                    this._inputControl = null
                }
                if (this._soundButton) {
                    this._soundButton.dispose();
                    this._soundButton = null
                }
                if (this._backgroundContainer) {
                    d.DisplayObjectUtils.removeAllChildren(this._backgroundContainer);
                    d.DisplayObjectUtils.removeFromParent(this._backgroundContainer);
                    this._backgroundContainer = null
                }
                if (this._overlayContainer) {
                    d.DisplayObjectUtils.removeAllChildren(this._overlayContainer);
                    d.DisplayObjectUtils.removeFromParent(this._overlayContainer);
                    this._overlayContainer = null
                }
                if (this._gfxContainer) {
                    d.DisplayObjectUtils.removeAllChildren(this._gfxContainer);
                    d.DisplayObjectUtils.removeFromParent(this._gfxContainer);
                    this._gfxContainer = null
                }
                this._titleGfx = null;
                this._creditsPanelGfx = null;
                this._playButton = null;
                this._playButtonRect = null;
                this._creditButtonRect = null;
                this._creditsButton = null;
                this._mainMenuButton = null;
                this._mainMenuButtonRect = null
            };
            return e
        })(PIXI.EventTarget);
        d.TitleScreen = c
    })(a.goldenratio || (a.goldenratio = {}));
    var b = a.goldenratio
})(com || (com = {}));
var com;
(function(a) {
    (function(d) {
        var c = (function() {
            function e(f) {
                this.type = f
            }
            e.SCRIPT = new e("script");
            e.GRAPHICS = new e("graphics");
            e.SFX = new e("sfx");
            return e
        })();
        d.LoadingState = c
    })(a.goldenratio || (a.goldenratio = {}));
    var b = a.goldenratio
})(com || (com = {}));
var com;
(function(a) {
    (function(e) {
        var d = (function() {
            function f() {
                this._rafDelta = new c();
                this._gameRect = new PIXI.Rectangle(0, 0, f.GAME_DIMENSION.width, f.GAME_DIMENSION.height);
                this._gameRectDesktop = new PIXI.Rectangle(0, 0, 400, 575);
                isMobileDevice = e.DeviceUtils.isMobileDevice();
                if (isMobileDevice) {
                    this.resizeGameForMobile()
                } else {
                    this.resizeGameForDesktop()
                }
                this.mapBinds();
                window.addEventListener("resize", this.onResizeWindowHandler, false);
                window.addEventListener("orientationchange", this.onOrientationChangeHandler, false);
                document.addEventListener("fullscreenchange", this.onFullscreenChangeHL, false);
                document.addEventListener("mozfullscreenchange", this.onFullscreenChangeHL, false);
                document.addEventListener("webkitfullscreenchange", this.onFullscreenChangeHL, false);
                document.addEventListener("msfullscreenchange", this.onFullscreenChangeHL, false);
                e.SoundManager.event.addEventListener(e.GameEvent.SOUND_LOADED, this.onSoundLoadComplete);
                e.SoundManager.event.addEventListener(e.GameEvent.SOUND_ERROR, this.onSoundLoadComplete);
                this._loader = new e.LoaderScreen();
                this._loader.addEventListener(e.GameEvent.LAUNCH_GAME, this.onLaunchGameHL);
                this._loader.updateViewPort(this._gameRect.width, this._gameRect.height);
                this.updateLoadingTextState(e.LoadingState.GRAPHICS);
                this._assetLoader = new PIXI.AssetLoader(["js/70/data.json"]);
                this._assetLoader.addEventListener("onComplete", this.onAssetsLoadComplete);
                this._assetLoader.load()
            }
            f.prototype.mapBinds = function() {
                this.onAssetsLoadComplete = this.onAssetsLoadComplete.bind(this);
                this.onOrientationChangeHandler = this.onOrientationChangeHandler.bind(this);
                this.onResizeWindowHandler = this.onResizeWindowHandler.bind(this);
                this.update = this.update.bind(this);
                this.onFullscreenChangeHL = this.onFullscreenChangeHL.bind(this);
                this.onLaunchGameHL = this.onLaunchGameHL.bind(this);
                this.launchStartGameFromTitle = this.launchStartGameFromTitle.bind(this);
                this.onSoundLoadComplete = this.onSoundLoadComplete.bind(this)
            };
            f.prototype.onFullscreenChangeHL = function(g) {
                if (isFullscreen()) {
                    e.DeviceUtils.lockScreenToPortrait()
                }
            };
            f.prototype.onResizeWindowHandler = function(g) {
                if (isMobileDevice) {
                    this.resizeGameForMobile()
                } else {
                    this.resizeGameForDesktop()
                }
            };
            f.prototype.onOrientationChangeHandler = function(g) {
                if (isMobileDevice) {
                    this.resizeGameForMobile()
                }
            };
            f.prototype.onAssetsLoadComplete = function(g) {
                this._assetLoader.removeEventListener("onComplete", this.onAssetsLoadComplete);
                this.updateLoadingTextState(e.LoadingState.SFX);
                e.SoundManager.init()
            };
            f.prototype.updateLoadingTextState = function(g) {
                document.getElementById("loader-message").style.display = "none";
                document.getElementById("loader-message-sfx").style.display = "none";
                document.getElementById("loader-message-graphics").style.display = "none";
                if (g == e.LoadingState.GRAPHICS) {
                    document.getElementById("loader-message-graphics").style.display = "block"
                } else {
                    if (g == e.LoadingState.SFX) {
                        document.getElementById("loader-message-sfx").style.display = "block"
                    } else {
                        if (g == e.LoadingState.SCRIPT) {
                            document.getElementById("loader-message").style.display = "block"
                        }
                    }
                }
            };
            f.prototype.onSoundLoadComplete = function(g) {
                e.SoundManager.event.removeEventListener(e.GameEvent.SOUND_LOADED, this.onSoundLoadComplete);
                e.SoundManager.event.removeEventListener(e.GameEvent.SOUND_ERROR, this.onSoundLoadComplete);
                this._loader.onLoadComplete()
            };
            f.prototype.onLaunchGameHL = function(g) {
                this.init()
            };
            f.prototype.init = function() {
                disableTouchFreeze();
                gameArea.style.display = "block";
                var h = document.getElementById("game_area");
                this._stage = new PIXI.Stage(0, false);
                var i = e.DeviceUtils.renderInWebGL();
                var g = getQueryVariable("webgl");
                if (g != null) {
                    i = g == "1"
                }
                if (i) {
                    this._renderer = PIXI.autoDetectRenderer(f.GAME_DIMENSION.width, f.GAME_DIMENSION.height, h, false, false)
                } else {
                    this._renderer = new PIXI.CanvasRenderer(f.GAME_DIMENSION.width, f.GAME_DIMENSION.height, h, false)
                }
                this._renderer.view.style.width = this._gameRect.width + "px";
                this._renderer.view.style.height = this._gameRect.height-40 + "px";
                this.initTitleArea();
                this.onResizeWindowHandler(null);
                this._rafDelta.init();
                this.update()
            };
            f.prototype.initGamePlay = function() {
                if (this._gameArea) {
                    this.disposeGameArea()
                }
                this._gameArea = new e.GameArea(this._stage)
            };
            f.prototype.disposeGameArea = function() {
                if (this._gameArea) {
                    this._gameArea.dispose();
                    this._gameArea = null
                }
            };
            f.prototype.initTitleArea = function() {
                if (this._titleArea) {
                    this.disposeTitleArea()
                }
                this._titleArea = new e.TitleScreen(this._stage);
                this._titleArea.addEventListener(e.GameEvent.START_GAME, this.launchStartGameFromTitle)
            };
            f.prototype.disposeTitleArea = function() {
                if (this._titleArea) {
                    this._titleArea.addEventListener(e.GameEvent.START_GAME, this.launchStartGameFromTitle);
                    this._titleArea.dispose();
                    this._titleArea = null
                }
            };
            f.prototype.launchStartGameFromTitle = function(g) {
                this.disposeTitleArea();
                this.initGamePlay()
            };
            f.prototype.update = function() {
                requestAnimFrame(this.update);
                this._rafDelta.update();
                if (this._gameArea) {
                    this._gameArea.update(this._rafDelta.delta)
                }
                if (this._titleArea) {
                    this._titleArea.update(this._rafDelta.delta)
                }
                if (this._renderer) {
                    this._renderer.render(this._stage)
                }
                TWEEN.update()
            };
            f.prototype.resizeGameForDesktop = function() {
                this.resizeGameForMobile(this._gameRectDesktop.width, this._gameRectDesktop.height)
            };
            f.prototype.resizeGameForMobile = function(k, j) {
                var g = window.innerWidth;
                var l = window.innerHeight;
                if (k) {
                    g = k
                }
                if (j) {
                    l = j
                }
                var m = f.GAME_DIMENSION.width / f.GAME_DIMENSION.height;
                var i = g / l;
                if (i > m) {
                    g = Math.round(l * m)
                } else {
                    l = Math.round(g / m)
                }
                this._gameRect.width = g;
                this._gameRect.height = l;
                if (this._renderer) {
                    this._renderer.view.style.height = l-40 + "px";
                    this._renderer.view.style.width = g + "px"
                }
                gameContainer.style.width = g + "px";
                gameContainer.style.height = l-40 + "px";
                if (this._loader) {
                    this._loader.updateViewPort(g, l)
                }
                var h = (window.innerHeight - l) >> 1;
                gameContainer.style.marginTop = h.toString() + "px";
                this.displayRotateDeviceInfo()
            };
            f.prototype.displayRotateDeviceInfo = function() {
                if (isMobileDevice) {
                    if (e.DeviceUtils.isLandscapeMode() == true) {
                        rotateDeviceInfo.style.display = "block"
                    } else {
                        rotateDeviceInfo.style.display = "none"
                    }
                }
            };
            f.GAME_DIMENSION = new PIXI.Rectangle(0, 0, 320, 460);
            return f
        })();
        e.Main = d;
        var c = (function() {
            function f() {
            }
            f.prototype.init = function() {
                this._then = Date.now()
            };
            f.prototype.update = function() {
                this._now = Date.now();
                this.delta = (this._now - this._then) * 0.06;
                this._then = this._now;
                this.delta = (((this.delta * 100) + 0.5) >> 0) / 100;
                if (this.delta > 1) {
                    this.delta = 1
                }
            };
            return f
        })();
        e.RAFDelta = c
    })(a.goldenratio || (a.goldenratio = {}));
    var b = a.goldenratio
})(com || (com = {}));
var gameContainer;
var gameArea;
var rotateDeviceInfo;
//程序入口
window.addEventListener("load", onLoad, false);
function onLoad() {
	//btGame.onlyVScreen();
    gameContainer = document.getElementById("container");
    gameArea = document.getElementById("game_area");
    rotateDeviceInfo = document.getElementById("rotate-device-instruction");
    gameContainer.style.display = "block";
    new com.goldenratio.Main()
}
function disableTouchFreeze() {
    document.addEventListener("touchstart", touchHandlerDummy, false);
    document.addEventListener("touchmove", touchHandlerDummy, false);
    document.addEventListener("touchend", touchHandlerDummy, false)
}
function touchHandlerDummy(a) {
    a.preventDefault();
    return false
}
;
