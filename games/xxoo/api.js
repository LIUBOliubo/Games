
// 排行榜通用接口
Auth9G = function(gameid) {
	this.gameid = gameid;
	this.title = document.title;
	this.uid = null;
	this.myuid = null;
	this.accessToken = null;
	this.user = null;
	this.order = "desc";
	this.identify = function(){};
	this.ready = function(){};
	this.readyDone = false;
	this.baseUrl = "http://wx.9g.com/";
	this.gameUrl = "http://game.9g.com/";
	this.init();
}

// 初始化
Auth9G.prototype.init = function() {
	this.uid = this.getParameter("uid");
	console.log("uid=" + this.uid);
}

// 是否微信浏览器
Auth9G.prototype.isWeixin = function() {
	var e = navigator.userAgent.toLowerCase();
	if(e.match(/MicroMessenger/i) == "micromessenger") {
		return true;
	} else {
		return false;
	}
}

// 身份认证系统 - 连接测试
Auth9G.prototype.connect = function(success, fail) {
	var isConnect;
	setTimeout(function(){
		if (isConnect == undefined) {
			isConnect = false;
			fail && fail.call(null);
			console.log("连接超过2秒");
		}
	}, 2000);
	jQuery.ajax({
		type: "GET",
		async: true,
		cache: false,
		timeout: 5000,
		url: this.baseUrl + "/auth/connect",
		dataType: "jsonp",
		jsonp: "callback",
		jsonpCallback: "authConnectHandler",
		success: function(data){
			console.log(data);
			if (data.success == "ok" && isConnect == undefined) {
				isConnect = true;
				success && success.call(null);
				console.log("连接测试成功!");
			}
		}
	});
}

// 验证身份
Auth9G.prototype.check = function() {
	// TEMP
	document.title = "9G游戏";
	document.body.style.display = "none";
	// 禁用 API
	// this.doReady();
	// return;
	// 是否微信浏览器
	if (!this.isWeixin()) {
		console.log("非微信浏览器");
		this.doReady();
		return;
	}
	// 不支持 localStorage
	console.log(window.localStorage);
	if (!window.localStorage) {
		console.log("不支持 localStorage");
		this.doReady();
		return;
	}
	// 本地已保存 Access Token
	if (localStorage.accessToken) {
		this.accessToken = localStorage.accessToken;
		// 此步骤更合理应该是在验证 Access Token 有效性之后，但那个时机将无法再执行 document.write 之类的语句
		this.doReady();
	}
	// 微信 API 返回 errcode
	if (sessionStorage.errcode != undefined) {
		console.log("errcode=" + sessionStorage.errcode + ", errmsg=" + sessionStorage.errmsg);
		sessionStorage.removeItem("errcode");
		sessionStorage.removeItem("errmsg");
		// 继续静态流程
		this.doReady();
		return;
	}
	// 连接测试
	var _this = this;
	this.connect(
		function(){
			// 连接成功
			if (_this.accessToken) {
				// 通过 Access Token 调用 AJAX 获取 9G 用户信息
				_this.get9gUser(_this.accessToken);
			}
			else {
				// 开始身份验证
				_this.check9gAuth();
			}
		},
		function(){
			// 连接失败，继续静态流程
			// _this.doReady();
			// TEMP：此时执行 document.write 会有问题
			document.title = _this.title;
			document.body.style.display = "";
			setTimeout(function(){
				try {
					WeixinJSBridge.call("showOptionMenu");
				}
				catch (e) {}
			}, 2000);
		}
	);
}

// 执行 ready
Auth9G.prototype.doReady = function() {
	if (this.readyDone) return;
	// TEMP
	document.title = this.title;
	document.body.style.display = "";
	// 执行 ready 方法
	this.ready && this.ready.call(null);
	this.readyDone = true;
	console.log("ready");
	// 附加：显示右上角转发按钮
	setTimeout(function(){
		try {
			WeixinJSBridge.call("showOptionMenu");
		}
		catch (e) {}
	}, 2000);
}

// 开始身份验证
Auth9G.prototype.check9gAuth = function() {
	var origin = removeParameter(window.location.href, "uid");
	var trans = this.gameUrl + "/auth/trans.html?gameid=" + this.gameid + "&origin=" + encodeURIComponent(origin);
	var url = this.baseUrl + "/auth/check?fromurl=" + encodeURIComponent(trans);
	if (this.uid != null) url += ("&uid=" + this.uid);
	window.location = url;
}

// 获取 9G 用户信息
Auth9G.prototype.get9gUser = function(accessToken) {
	var _this = this;
	jQuery.ajax({
		type: "GET",
		async: true,
		cache: false,
		url: this.baseUrl + "/auth/get9guser?access_token=" + accessToken,
		dataType: "jsonp",
		jsonp: "callback",
		jsonpCallback: "get9gUserHandler",
		success: function(data){
			if (data.errcode) {
				// access token 过期，重新验证
				localStorage.removeItem("accessToken");
				_this.accessToken = null;
				_this.check9gAuth();
			}
			else {
				// 获取成功
				_this.myuid = data.uid;
				_this.user = data.user;
				_this.identify && _this.identify.call(null);
				console.log(data);
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			alert(textStatus + "\n" + errorThrown);
		}
	});
}

// 查看排行榜
Auth9G.prototype.gotoRank = function(type) {
	var url = this.baseUrl + "/rank/rank.jsp?gameid=" + this.gameid + "&order=" + this.order + "&type=" + type;
	window.location = url;
}

// 提交成绩
Auth9G.prototype.submit = function(score, scoreName, callback) {
	if (!this.user) return;
	jQuery.ajax({
		type: "GET",
		async: true,
		cache: false,
		url: this.baseUrl + "/rank/submit.jsp?gameid=" + this.gameid + "&access_token=" + this.accessToken + "&score=" + score + "&scorename=" + encodeURIComponent(scoreName) + "&order=" + this.order,
		dataType: "jsonp",
		jsonp: "callback",
		jsonpCallback: "submitCompleteHandler",
		success: function(data){
			if (data.submit == "ok") {
				if (data.refreshRankScore) {
					alert("你的成绩已经成功提交到9G！\n刷新了上一次的最好成绩: " + data.lastRankScoreName);
				}
				else {
					alert("你的成绩已经成功提交到9G！");
				}
			}
			else {
				alert("提交成绩失败");
			}
			callback && callback.apply(null);
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			alert(textStatus + "\n" + errorThrown);
		}
	});
}

// 读取 QueryString 参数
Auth9G.prototype.getParameter = function(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return r[2]; return null;
}

// 从 QueryString 中删除一项参数
function removeParameter(url, name) {
	if (url.indexOf("?") == -1) return url;
	var origin = url.split("?")[0];
	var search = url.split("?")[1];
	var isRd = false;
	if (search.substr(search.length - 3) == "#rd") {
		search = search.substr(0, search.length - 3);
		isRd = true;
	}
	var a = search.split("&");
	for (var i=a.length-1; i>=0; i--) {
		var p = a[i].substr(0, a[i].indexOf("="));
		if (p == name) a.splice(i, 1);
	}
	var result;
	if (a.length == 0) {
		result = origin;
	}
	else {
		result = origin + "?" + a.join("&");
	}
	if (isRd) result += "#rd";
	return result;
}
