function Delegate(){}
Delegate.create=function(o,f){var a=new Array();var l=arguments.length;for(var i=2;i<l;i++)a[i-2]=arguments[i];return function(){var aP=[].concat(arguments,a);f.apply(o,aP);}}
Tween=function(obj,prop,func,begin,finish,duration,suffixe){this.init(obj,prop,func,begin,finish,duration,suffixe)}
var t=Tween.prototype;t.obj=new Object();t.prop='';t.func=function(t,b,c,d){return c*t/d+b;};t.begin=0;t.change=0;t.prevTime=0;t.prevPos=0;t.looping=false;t._duration=0;t._time=0;t._pos=0;t._position=0;t._startTime=0;t._finish=0;t.name='';t.suffixe='';t._listeners=new Array();t.setTime=function(t){this.prevTime=this._time;if(t>this.getDuration()){if(this.looping){this.rewind(t-this._duration);this.update();this.broadcastMessage('onMotionLooped',{target:this,type:'onMotionLooped'});}else{this._time=this._duration;this.update();this.stop();this.broadcastMessage('onMotionFinished',{target:this,type:'onMotionFinished'});}}else if(t<0){this.rewind();this.update();}else{this._time=t;this.update();}}
t.getTime=function(){return this._time;}
t.setDuration=function(d){this._duration=(d==null||d<=0)?100000:d;}
t.getDuration=function(){return this._duration;}
t.setPosition=function(p){this.prevPos=this._pos;var a=this.suffixe!=''?this.suffixe:'';this.obj[this.prop]=Math.round(p)+a;this._pos=p;this.broadcastMessage('onMotionChanged',{target:this,type:'onMotionChanged'});}
t.getPosition=function(t){if(t==undefined)t=this._time;return this.func(t,this.begin,this.change,this._duration);};t.setFinish=function(f){this.change=f-this.begin;};t.getFinish=function(){return this.begin+this.change;};t.init=function(obj,prop,func,begin,finish,duration,suffixe){if(!arguments.length)return;this._listeners=new Array();this.addListener(this);if(suffixe)this.suffixe=suffixe;this.obj=obj;this.prop=prop;this.begin=begin;this._pos=begin;this.setDuration(duration);if(func!=null&&func!=''){this.func=func;}
this.setFinish(finish);}
t.start=function(){this.rewind();this.startEnterFrame();this.broadcastMessage('onMotionStarted',{target:this,type:'onMotionStarted'});}
t.rewind=function(t){this.stop();this._time=(t==undefined)?0:t;this.fixTime();this.update();}
t.fforward=function(){this._time=this._duration;this.fixTime();this.update();}
t.update=function(){this.setPosition(this.getPosition(this._time));}
t.startEnterFrame=function(){this.stopEnterFrame();this.isPlaying=true;this.onEnterFrame();}
t.onEnterFrame=function(){if(this.isPlaying){this.nextFrame();setTimeout(Delegate.create(this,this.onEnterFrame),0);}}
t.nextFrame=function(){this.setTime((this.getTimer()-this._startTime)/1000);}
t.stop=function(){this.stopEnterFrame();this.broadcastMessage('onMotionStopped',{target:this,type:'onMotionStopped'});}
t.stopEnterFrame=function(){this.isPlaying=false;}
t.continueTo=function(finish,duration){this.begin=this._pos;this.setFinish(finish);if(this._duration!=undefined)
this.setDuration(duration);this.start();}
t.resume=function(){this.fixTime();this.startEnterFrame();this.broadcastMessage('onMotionResumed',{target:this,type:'onMotionResumed'});}
t.yoyo=function(){this.continueTo(this.begin,this._time);}
t.addListener=function(o){this.removeListener(o);return this._listeners.push(o);}
t.removeListener=function(o){var a=this._listeners;var i=a.length;while(i--){if(a[i]==o){a.splice(i,1);return true;}}
return false;}
t.broadcastMessage=function(){var arr=new Array();for(var i=0;i<arguments.length;i++){arr.push(arguments[i])}
var e=arr.shift();var a=this._listeners;var l=a.length;for(var i=0;i<l;i++){if(a[i][e])
a[i][e].apply(a[i],arr);}}
t.fixTime=function(){this._startTime=this.getTimer()-this._time*1000;}
t.getTimer=function(){return new Date().getTime()-this._time;}
Tween.backEaseIn=function(t,b,c,d,a,p){if(s==undefined)var s=1.70158;return c*(t/=d)*t*((s+1)*t-s)+b;}
Tween.backEaseOut=function(t,b,c,d,a,p){if(s==undefined)var s=1.70158;return c*((t=t/d-1)*t*((s+1)*t+s)+1)+b;}
Tween.backEaseInOut=function(t,b,c,d,a,p){if(s==undefined)var s=1.70158;if((t/=d/2)<1)return c/2*(t*t*(((s*=(1.525))+1)*t-s))+b;return c/2*((t-=2)*t*(((s*=(1.525))+1)*t+s)+2)+b;}
Tween.elasticEaseIn=function(t,b,c,d,a,p){if(t==0)return b;if((t/=d)==1)return b+c;if(!p)p=d*.3;if(!a||a<Math.abs(c)){a=c;var s=p/4;}
else
var s=p/(2*Math.PI)*Math.asin(c/a);return-(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b;}
Tween.elasticEaseOut=function(t,b,c,d,a,p){if(t==0)return b;if((t/=d)==1)return b+c;if(!p)p=d*.3;if(!a||a<Math.abs(c)){a=c;var s=p/4;}
else var s=p/(2*Math.PI)*Math.asin(c/a);return(a*Math.pow(2,-10*t)*Math.sin((t*d-s)*(2*Math.PI)/p)+c+b);}
Tween.elasticEaseInOut=function(t,b,c,d,a,p){if(t==0)return b;if((t/=d/2)==2)return b+c;if(!p)var p=d*(.3*1.5);if(!a||a<Math.abs(c)){var a=c;var s=p/4;}
else var s=p/(2*Math.PI)*Math.asin(c/a);if(t<1)return-.5*(a*Math.pow(2,10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p))+b;return a*Math.pow(2,-10*(t-=1))*Math.sin((t*d-s)*(2*Math.PI)/p)*.5+c+b;}
Tween.bounceEaseOut=function(t,b,c,d){if((t/=d)<(1/2.75)){return c*(7.5625*t*t)+b;}else if(t<(2/2.75)){return c*(7.5625*(t-=(1.5/2.75))*t+.75)+b;}else if(t<(2.5/2.75)){return c*(7.5625*(t-=(2.25/2.75))*t+.9375)+b;}else{return c*(7.5625*(t-=(2.625/2.75))*t+.984375)+b;}}
Tween.bounceEaseIn=function(t,b,c,d){return c-Tween.bounceEaseOut(d-t,0,c,d)+b;}
Tween.bounceEaseInOut=function(t,b,c,d){if(t<d/2)return Tween.bounceEaseIn(t*2,0,c,d)*.5+b;else return Tween.bounceEaseOut(t*2-d,0,c,d)*.5+c*.5+b;}
Tween.strongEaseInOut=function(t,b,c,d){return c*(t/=d)*t*t*t*t+b;}
Tween.regularEaseIn=function(t,b,c,d){return c*(t/=d)*t+b;}
Tween.regularEaseOut=function(t,b,c,d){return-c*(t/=d)*(t-2)+b;}
Tween.regularEaseInOut=function(t,b,c,d){if((t/=d/2)<1)return c/2*t*t+b;return-c/2*((--t)*(t-2)-1)+b;}
Tween.strongEaseIn=function(t,b,c,d){return c*(t/=d)*t*t*t*t+b;}
Tween.strongEaseOut=function(t,b,c,d){return c*((t=t/d-1)*t*t*t*t+1)+b;}
Tween.strongEaseInOut=function(t,b,c,d){if((t/=d/2)<1)return c/2*t*t*t*t*t+b;return c/2*((t-=2)*t*t*t*t+2)+b;}
OpacityTween.prototype=new Tween();OpacityTween.prototype.constructor=Tween;OpacityTween.superclass=Tween.prototype;function OpacityTween(obj,func,fromOpacity,toOpacity,duration){this.targetObject=obj;this.init(new Object(),'x',func,fromOpacity,toOpacity,duration);}
var o=OpacityTween.prototype;o.targetObject={};o.onMotionChanged=function(evt){var v=evt.target._pos;var t=this.targetObject;t.style['opacity']=v/100;t.style['-moz-opacity']=v/100;if(t.filters)t.filters.alpha['opacity']=v;}


var w = 320;
var h = 480;
var cw = 320;
var ch = 240;
var fps = 1e3 / 30;
var canvas, context, levelCount, imageSprite, timeout;
var strings = {
	witr: "猜猜金币在哪儿？<br>（请选择）",
	fail: ["是不是眼花了？", "别瞎猜，看准了再选", "太快了吗？"],
	ok: ["这个太简单了", "还不错，不过这只是练习！", "你确定没有使诈？", "好", "再接再厉", "很好", "太棒了", "下一关会更难哦", "牛逼！", "不可思议", "太夸张了吧", "太厉害了有木有？？", "你是怎么做到的？！", "肯定是运气！", "你的眼力那么好，你家人知道吗？", "不会再让你过关的，小心哦！", "简直无法置信！", "从来没有人能到这一关", "大神，教教我你的诀窍吧！", "我不玩了！我不玩了！"]
};
var init = function() {
	imageSprite = new Image;
	imageSprite.src = "2.png";
	play68_init();
	welcomeView()
};
var welcomeView = function() {
	var e = document.getElementById("logo");
	e.style.display = "block";
	var t = new OpacityTween(e, null, 0, 100, .5);
	t.start();
	t.onMotionFinished = function() {
		setTimeout(function() {
			var t = new OpacityTween(e, null, 100, 0, .5);
			t.start();
			t.onMotionFinished = function() {
				e.style.display = "none";
				menuView()
			}
		},
		500)
	}
};
var menuView = function() {
	var e = document.getElementById("playButton");
	e.style.display = "block";
	var t = new OpacityTween(e, null, 0, 100, .5);
	t.start();
	t.onMotionFinished = function() {
		e.onclick = function(t) {
			e.style.display = "none";
			gameView();
			play68_init()
		}
	}
};
var gameView = function() {
	canvas = document.getElementById("canvas");
	canvas.style.display = "block";
	canvas.width = cw;
	canvas.height = ch;
	context = canvas.getContext("2d");
	levelCount = 1;
	livesCount = 3;
	var e = document.getElementById("level");
	var t = document.getElementById("lives");
	var n = false;
	e.innerHTML = "关卡：" + levelCount;
	e.style.display = t.style.display = "block";
	var r = document.getElementById("hearts");
	var i = "";
	for (var s = 0; s < livesCount; s++) {
		i += '<div class="heart">&nbsp;</div>'
	}
	r.innerHTML = i;
	var o = 28;
	var u = 28;
	var a = 15;
	var f = 0;
	var l = 0;
	var c = 60;
	var h = 100;
	var p = 50;
	var d = 53;
	var v = 57;
	var m = function() {
		this.draw = function() {
			context.fillStyle = "#222";
			context.fillRect(0, 0, cw, ch)
		}
	};
	var g = function() {
		this.draw = function() {
			context.drawImage(imageSprite, 6, 100, 82, 86, this.x - 41, this.y, 82, 86)
		}
	};
	var y = function() {
		this.draw = function() {
			var e = context.globalAlpha;
			try {
				context.globalAlpha = this.alpha
			} catch(t) {}
			context.drawImage(imageSprite, 94, 100, 82, 86, this.x - 41, this.y, 82, 86);
			try {
				context.globalAlpha = e
			} catch(t) {}
		}
	};
	var b = function() {
		this.draw = function() {
			context.drawImage(imageSprite, 257, 5, 82, 152, this.x - 41, this.y, 82, 152)
		}
	};
	var w = function() {
		this.draw = function() {
			context.drawImage(imageSprite, 159, 55, 44, 26, this.x - 22, this.y, 44, 26)
		}
	};
	var E = {
		bg: new m,
		bucketShadow: new y,
		coin: new w,
		bucket: new g,
		bucketWs1: new b,
		bucketWs2: new b
	};
	var S = c + (h + h * l);
	E.bucket.x = S;
	E.coin.x = S;
	E.coin.y = p + v;
	E.bucketShadow.x = S;
	E.bucketShadow.y = p + d;
	E.bucketWs1.x = c + (l == 0 ? 0 : h);
	E.bucketWs2.x = c + (l == 0 ? h * 2 : l == -1 ? +h * 2 : 0);
	E.bucket.y = E.bucketWs1.y = E.bucketWs2.y = p;
	var x = function(e) {
		if (n) {
			return
		}
		var t = c + (h + h * e);
		E.bucket.x = t;
		if (e != l) {
			E.coin.x = -2e3;
			E.coin.y = -2e3
		} else {
			E.coin.x = t;
			E.coin.y = p + v
		}
		E.bucketShadow.x = t;
		E.bucketWs1.x = c + (e == 0 ? 0 : h);
		E.bucketWs2.x = c + (e == 0 ? h * 2 : e == -1 ? +h * 2 : 0);
		var r = new Tween({},
		null, Tween.strongEaseInOut, 0, 50, 1);
		r.start();
		r.onMotionChanged = function(e) {
			var t = e.target._pos;
			E.bucket.y = p - t;
			E.bucketShadow.y = p + d + t;
			E.bucketShadow.alpha = 1 - t * .016;
			T()
		};
		r.onMotionFinished = function(e) {
			setTimeout(function() {
				var e = new Tween({},
				null, Tween.strongEaseInOut, 50, 0, 1);
				e.start();
				e.onMotionChanged = function(e) {
					var t = e.target._pos;
					E.bucket.y = p - t;
					E.bucketShadow.y = p + d + t;
					E.bucketShadow.alpha = 1 - t * .016;
					T()
				}
			},
			500)
		}
	};
	var T = function() {
		for (key in E) {
			var e = E[key];
			e.draw()
		}
	};
	var N = function() {
		var e = document.getElementById("msg");
		e.style.display = "block";
		var t = new OpacityTween(e, null, 0, 100, .2);
		t.start();
		e.innerHTML = strings.witr
	};
	var C = function() {
		var e = document.getElementById("b");
		var t = document.getElementById("b1");
		var n = document.getElementById("b2");
		var r = document.getElementById("b3");
		e.style.display = t.style.display = n.style.display = r.style.display = "block";
		t.onclick = function(e) {
			O( - 1)
		};
		n.onclick = function(e) {
			O(0)
		};
		r.onclick = function(e) {
			O(1)
		}
	};
	var k = function() {
		if (n) {
			return
		}
		var e = document.getElementById("level");
		levelCount++;
		e.innerHTML = "关卡：" + levelCount;
		o = u + Math.sqrt(levelCount * 1.5);
		a += Math.floor(levelCount / 3)
	};
	var L = function() {
		if (n) {
			return
		}
		var e = document.getElementById("hearts");
		livesCount--;
		for (node in e.childNodes) {
			var t = e.childNodes[node];
			if (t.className == "heart") {
				var r = new OpacityTween(t, null, 100, 0, .5);
				r.start();
				r.onMotionFinished = function() {
					e.removeChild(t);
					if (livesCount < 1) {
						levelScore = levelCount;
						A();
						return
					}
				};
				break
			}
		}
	};
	var A = function() {
		clearTimeout(timeout);
		n = true;
		canvas.style.display = "none";
		var e = document.getElementById("level");
		var t = document.getElementById("lives");
		e.style.display = t.style.display = "none";
		updateShareScore(levelCount - 1);
		setTimeout(function() {
			show_share()
		},
		1500);
		var r = document.getElementById("msg");
		r.style.display = "block";
		var i = new OpacityTween(r, null, 0, 100, .2);
		i.start();
		r.style.margin = "200px 0 0 0";
		r.innerHTML = "游戏结束";
		setTimeout(function() {
			r.style.display = "none";
			menuView()
		},
		1500)
	};
	var O = function(e) {
		if (n) {
			return
		}
		var t = document.getElementById("b");
		var r = document.getElementById("b1");
		var i = document.getElementById("b2");
		var s = document.getElementById("b3");
		var o = document.getElementById("msg");
		r.style.display = i.style.display = s.style.display = o.style.display = "none";
		x(e);
		setTimeout(function() {
			if (n) {
				return
			}
			if (e == l) {
				var t = levelCount - 1;
				if (t > strings.ok.length - 1) {
					t = strings.ok.length - 1
				}
				o.innerHTML = strings.ok[t];
				k()
			} else {
				o.innerHTML = strings.fail[livesCount - 1];
				L()
			}
			o.style.display = "block";
			var r = new OpacityTween(o, null, 0, 100, .2);
			r.start();
			r.onMotionFinished = function() {
				if (n) {
					return
				}
				setTimeout(function() {
					var e = new OpacityTween(o, null, 100, 0, .2);
					e.start();
					e.onMotionFinished = function() {
						if (n) {
							return
						}
						o.innerHTML = "关卡：" + levelCount;
						var e = new OpacityTween(o, null, 0, 100, .2);
						e.start();
						e.onMotionFinished = function() {
							if (n) {
								return
							}
							setTimeout(function() {
								var e = new OpacityTween(o, null, 100, 0, .2);
								e.start();
								e.onMotionFinished = function() {
									if (n) {
										return
									}
									o.style.display = "none";
									l = 0;
									x(0);
									setTimeout(function() {
										f = 0;
										M()
									},
									3e3)
								}
							},
							1e3)
						}
					}
				},
				1500)
			}
		},
		2500)
	};
	var M = function() {
		if (n) {
			return
		}
		f++;
		if (f > a) {
			N();
			C();
			return
		}
		var e = Math.floor(Math.random() * 3);
		var t = Math.floor(Math.random() * 2);
		var r = 0;
		if (t == 1) {
			r = 180
		}
		var i = o;
		if (e == 2) {
			i = i * .8
		}
		i *= t == 0 ? 1 : -1;
		var s, u, d, v, m, g, y, b;
		var w = 24;
		var S = function() {
			if (n) {
				return
			}
			var t = r + i;
			if (t > 180) {
				r = 180
			} else if (t < 0) {
				r = 0
			} else {
				r += i
			}
			E.bg.draw();
			y = deg2rad(r - 90);
			b = deg2rad(r + 90);
			if (e == 0) {
				s = p + Math.cos(y) * w;
				u = p + Math.cos(b) * w;
				d = p;
				v = c + h / 2 + Math.sin(y) * (h / 2);
				m = c + h / 2 + Math.sin(b) * (h / 2);
				g = c + h * 2;
				if (s > u) {
					context.drawImage(imageSprite, 257, 5, 82, 152, m - 41, u, 82, 152);
					context.drawImage(imageSprite, 257, 5, 82, 152, v - 41, s, 82, 152)
				} else {
					context.drawImage(imageSprite, 257, 5, 82, 152, v - 41, s, 82, 152);
					context.drawImage(imageSprite, 257, 5, 82, 152, m - 41, u, 82, 152)
				}
				context.drawImage(imageSprite, 257, 5, 82, 152, g - 41, d, 82, 152)
			} else if (e == 1) {
				d = p + Math.cos(y) * w;
				u = p + Math.cos(b) * w;
				s = p;
				g = c + h / 2 + h + Math.sin(y) * (h / 2);
				m = c + h / 2 + h + Math.sin(b) * (h / 2);
				v = c;
				if (s > u) {
					context.drawImage(imageSprite, 257, 5, 82, 152, m - 41, u, 82, 152);
					context.drawImage(imageSprite, 257, 5, 82, 152, v - 41, s, 82, 152)
				} else {
					context.drawImage(imageSprite, 257, 5, 82, 152, v - 41, s, 82, 152);
					context.drawImage(imageSprite, 257, 5, 82, 152, m - 41, u, 82, 152)
				}
				context.drawImage(imageSprite, 257, 5, 82, 152, g - 41, d, 82, 152)
			} else if (e == 2) {
				s = p + Math.cos(y) * w * 1.3;
				d = p + Math.cos(b) * w * 1.3;
				u = p;
				v = c + h + Math.sin(y) * h;
				g = c + h + Math.sin(b) * h;
				m = c + h;
				if (s > u) {
					context.drawImage(imageSprite, 257, 5, 82, 152, g - 41, d, 82, 152);
					context.drawImage(imageSprite, 257, 5, 82, 152, m - 41, u, 82, 152);
					context.drawImage(imageSprite, 257, 5, 82, 152, v - 41, s, 82, 152)
				} else {
					context.drawImage(imageSprite, 257, 5, 82, 152, v - 41, s, 82, 152);
					context.drawImage(imageSprite, 257, 5, 82, 152, m - 41, u, 82, 152);
					context.drawImage(imageSprite, 257, 5, 82, 152, g - 41, d, 82, 152)
				}
			}
			if (r >= 180 || r <= 0) {
				if (e == 0) {
					if (l == -1 || l == 0) {
						l = l == -1 ? 0 : -1
					}
				} else if (e == 1) {
					if (l == 1 || l == 0) {
						l = l == 1 ? 0 : 1
					}
				} else if (e == 2) {
					if (l == 1 || l == -1) {
						l *= -1
					}
				}
				r = 0;
				M()
			} else {
				timeout = setTimeout(S, fps)
			}
		};
		timeout = setTimeout(S, fps)
	};
	var _ = function() {
		T();
		setTimeout(function() {
			x(l)
		},
		300);
		setTimeout(function() {
			f = 0;
			M()
		},
		3e3)
	};
	_()
};
var deg2rad = function(e) {
	return e * Math.PI / 180
};
init();
if (typeof StartGame == 'function') {
    StartGame();
  }
  window.scrollTo(0, 1);
  function shareFriend() {
		WeixinJSBridge.invoke("sendAppMessage", {
			appid: appid,
			img_url: imgUrl,
			img_width: "200",
			img_height: "200",
			link: lineLink,
			desc: descContent,
			title: shareTitle
		},
		function(e) {})
	}
	function shareTimeline() {
		WeixinJSBridge.invoke("shareTimeline", {
			img_url: imgUrl,
			img_width: "200",
			img_height: "200",
			link: lineLink,
			desc: descContent,
			title: shareTitle
		},
		function(e) {})
	}
	function shareWeibo() {
		WeixinJSBridge.invoke("shareWeibo", {
			img_url: imgUrl,
			content: shareTitle + " " + descContent,
			url: lineLink
		},
		function(e) {})
	}
	function isWeixin() {
		var e = navigator.userAgent.toLowerCase();
		if (e.match(/MicroMessenger/i) == "micromessenger") {
			return true
		} else {
			return false
		}
	}
	function toggle(e) {
		var t = document.getElementById(e);
		var n = document.getElementById("arrow");
		var r = t.getAttribute("class");
		if (r == "hide") {
			t.setAttribute("class", "show");
			delay(n, RESOURCE_IMG_PATH + "arrowright.png", 400)
		} else {
			t.setAttribute("class", "hide");
			delay(n, RESOURCE_IMG_PATH + "arrowleft.png", 400)
		}
	}
	function delay(e, t, n) {
		window.setTimeout(function() {
			e.setAttribute("src", t)
		},
		n)
	}
	function show_share() {
			document.getElementById("share-wx").style.display = "block"
	}
	function closeshare() {
		document.getElementById("share-wx").style.display = "none"
	}
	function closewx() {
		document.getElementById("wx-qr").style.display = "none"
	}
	function addShareWX() {
		var e = document.createElement("div");
		e.id = "share-wx";
		e.onclick = closeshare;
		document.body.appendChild(e);
		var t = document.createElement("p");
		t.style.cssText = "text-align:right;padding-left:10px;";
		e.appendChild(t);
		var n = document.createElement("img");
		n.src = "3.png";
		n.id = "share-wx-img";
		n.style.cssText = "max-width:280px;padding-right:25px;";
		t.appendChild(n);
	}

	if (getCookie("num")) {
			var nn = parseInt(getCookie("num"));
			setCookie("num", ++nn);
		} else {
			setCookie("num", 1);
		}
		function getCookie(name) 
		{ 
			var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)"); 
			if(arr=document.cookie.match(reg)) return unescape(arr[2]); 
			else return null; 
		} 
		function setCookie(name, value) {
			var Days = 30;
			var exp = new Date();
			exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
			document.cookie = name + "=" + escape(value) + ";expires" + exp.toGMTString();
		}
	function isMobile() {
		return navigator.userAgent.match(/android|iphone|ipod|blackberry|meego|symbianos|windowsphone|ucbrowser/i)
	}
	function isIOS() {
		return navigator.userAgent.match(/iphone|ipod|ios/i)
	}
	var HOME_PATH = HOME_PATH || "http://www.dwz.cn/qZ3Ug",
	RESOURCE_IMG_PATH = RESOURCE_IMG_PATH || "/game/",
	HORIZONTAL = HORIZONTAL || false,
	COVER_SHOW_TIME = COVER_SHOW_TIME || 2e3;
	var imgUrl = HOME_PATH + "http://bbs.heirui.cn/games/zuiqiangyanli/1.png";
	var lineLink = HOME_PATH;
	var descContent = "快来跟我一起玩！";
	var shareTitle = "最好玩的小游戏就在游戏排行榜！";
	var appid = "";
	document.addEventListener("WeixinJSBridgeReady",
	function() {
		WeixinJSBridge.on("menu:share:appmessage",
		function(e) {
			shareFriend()
		});
		WeixinJSBridge.on("menu:share:timeline",
		function(e) {
			shareTimeline()
		});
		WeixinJSBridge.on("menu:share:weibo",
		function(e) {
			shareWeibo()
		});
		if (HORIZONTAL == true) {
			WeixinJSBridge.call("hideToolbar")
		}
	},
	false); (function() {
		function n() {
			window.scroll(0, 0);
			var e;
			if (window.orientation == 0 || window.orientation == 180) {
				e = false
			} else if (window.orientation == -90 || window.orientation == 90) {
				e = true
			}
			if (e == HORIZONTAL) {
				t.style.display = "none"
			} else {
				setTimeout(function() {
					r();
					t.style.width = window.innerWidth + "px";
					t.style.display = "block"
				},
				isIOS() ? 0 : 600)
			}
			if (HORIZONTAL == true && isWeixin() && !isIOS()) {
				WeixinJSBridge.call("hideToolbar")
			}
		}
		function r() {
			e.style.height = window.innerHeight + "px";
			e.style.width = window.innerWidth + "px";
			t.style.height = window.innerHeight + "px"
		}
		if (typeof play68_init == "function") {
			play68_init()
		}
		if (!isMobile()) return;
		var e = document.createElement("div");
		e.style.cssText = "position:absolute;z-index:1000000;left:0;top:0;background-size: 50%;width:" + window.innerWidth + "px;height:" + Math.max(window.innerHeight, window.document.documentElement.offsetHeight) + "px";
		e.className = "common_cover";
		document.body.appendChild(e);
		setTimeout(function() {
			e.parentNode.removeChild(e)
		},
		COVER_SHOW_TIME);
		document.addEventListener("touchmove",
		function(e) {
			e.preventDefault()
		},
		false);
		var t = document.createElement("div");
		t.className = "common_notice";
		t.style.cssText = "position:absolute;z-index:999999;left:0;top:0;background-size: 50%;";
		document.body.appendChild(t);
		window.addEventListener("orientationchange", n);
		window.addEventListener("load", n);
		window.addEventListener("scroll", r)
	})();
	addShareWX();