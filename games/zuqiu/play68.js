
function play68_init() {
	updateShare(0);
}

function goHome() {
	window.location.href = HOME_PATH;
}

function play68_submitScore(score) {
	updateShareScore(score);
	setTimeout( function() { show_share(); }, 1500 )
}

function updateShare(bestScore) {
	imgUrl = 'http://g.lanrenmb.com/games/zuqiu/soccermoveicon.png';
	lineLink = 'http://g.lanrenmb.com/games/zuqiu';
	descContent = "快跟我一起用手指指点足球！";
	updateShareScore(bestScore);
	appid = '';
}

function updateShareScore(bestScore) {
	if(bestScore > 0) {
		shareTitle = "我玩《滚滚足球》过了" + bestScore + "关，动脑的足球最好玩！";
	}
	else{
		shareTitle = "世界杯快到了，快来玩《滚滚足球》！动脑的足球最好玩！";
	}
}