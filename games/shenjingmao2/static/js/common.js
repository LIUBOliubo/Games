
// 排行榜通用接口
CommonRank = function(gameid) {
	this.gameid = gameid;
	this.uid;
	this.myuid;
	this.is9Guser;
	this.order = "desc";
	this.init();
}

// 初始化
CommonRank.prototype.init = function() {
	this.uid = this.getParameter("uid");
	this.myuid = this.getParameter("myuid");
	this.is9Guser = (this.getParameter("is9guser") === "true");
}

// 是否微信浏览器
CommonRank.prototype.isWeixin = function() {
	// if (this.gameid == "sjm") return false;
	// return false;
	var e = navigator.userAgent.toLowerCase();
	if(e.match(/MicroMessenger/i) == "micromessenger") {
		return true;
	} else {
		return false;
	}
}

// 验证身份
CommonRank.prototype.check = function() {
	if (this.myuid === null) {
		var url = "http://wx.9g.com/oauth/check.jsp?fromurl=" + encodeURIComponent(window.location.href);
		if (this.uid != null) url += ("&uid=" + this.uid);
		window.location.href = url;
		return false;
	}
	else {
		return true;
	}
}

// 查看排行榜
CommonRank.prototype.gotoRank = function(type) {
	var url = "http://wx.9g.com/rank/rank.jsp?gameid=" + this.gameid + "&order=" + this.order + "&type=" + type;
	window.location = url;
}

// 提交成绩
CommonRank.prototype.submit = function(score, scoreName, callback) {
	if (!this.is9Guser) return;
	$.ajax({
		type: "GET",
		async: true,
		cache: false,
		url: "http://wx.9g.com/rank/submit.jsp?gameid=" + this.gameid + "&uid=" + this.myuid + "&score=" + score + "&scorename=" + encodeURIComponent(scoreName) + "&order=" + this.order,
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

// 读取 QueryString
CommonRank.prototype.getParameter = function(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return r[2]; return null;
}