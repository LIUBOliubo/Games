<?php session_start();?><!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<meta name="format-detection" content="telephone=no" />
		<meta name="viewport"
			content="width=device-width initial-scale=1.0 maximum-scale=1.0 user-scalable=yes" />
		   <title>麦霸挑战赛现在开始！《找你歌》</title>
		<link href="bootstrap/3.0.3/css/bootstrap.min.css" rel="stylesheet">
		<link rel="stylesheet" href="Public/fangyan/style.css?m=0711" />
		<style type="text/css">
/*    body {
        background: #000 url(Public/fangyan/bg.jpg) top center no-repeat !important;
        background-size:100% 100% !important;
    }*/
.bg {
	width: 100%;
	height: 100%;
	position: fixed;
	top: 0;
	left: 0;
	background: #000 url(Public/upload/6177/53fe872815c9a.jpeg) top center
		no-repeat !important;
	background-size: 100% 100% !important;
}

.addthumb {
	padding-left: 0;
	padding-right: 0;
	height: 50px;
	overflow: hidden;
}

.btn-danger {
	background-color: #f08c86;
	border-color: #f08c86;
	color: #fff;
}

.btn-danger:hover,.btn-danger:focus,.btn-danger:active,.btn-danger.active,.open>.dropdown-toggle.btn-danger
	{
	background-color: #f08c86;
	border-color: #f08c86;
	color: #fff;
}

.btn-danger2 {
	background-color: #5a4c4b;
	border-color: #5a4c4b;
	color: #fff;
}

.buttons2 {
	padding-top: 5px;
}

.btn-danger2:hover,.btn-danger2:focus,.btn-danger2:active,.btn-danger2.active,.open>.dropdown-toggle.btn-danger2
	{
	background-color: #5a4c4b;
	border-color: #5a4c4b;
	color: #fff;
}

.btn-danger1 {
	font-size: 22px;
	padding: 10px;
}

.btn-success {
	background-color: #2d892d;
	border-color: #4cae4c;
	color: #fff;
}

.panel {
	background-color: #fff;
	border: 1px solid transparent;
	border-radius: 4px;
	box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
	margin-bottom: 5px;
}
</style>
	</head>
	<body><link rel="stylesheet" type="text/css" href="{morelink}/bdad.css">
<div id="bdfootpanel">
 <script type="text/javascript">
    /*20:3 创建于 2014-09-01*/
    var cpro_id = "u1692937";
</script>
<script src="http://cpro.baidustatic.com/cpro/ui/cm.js" type="text/javascript"></script>
</div>
		<div class="bg"></div>

		<div id="ad0">
			<script type="text/javascript">
        var cpro_id = "u1646897";
    </script>
		</div>
		<script>
    function play(url){

        var audio = document.createElement('audio');
        var source = document.createElement('source');
        source.type = "audio/mpeg";
        source.type = "audio/mpeg";
        source.src = url;
        source.autoplay = "autoplay";
        source.controls = "controls";
        audio.appendChild(source);
        audio.play();
        $('.btn').hide();
        $('.stop').show();
    }
</script>


		<div class="container">
			<div class="text-center header">
				<style>
.header {
	color: #fff;
	margin: 0 0 55px;
}
</style>
				<h1 class="bold">
				麦霸挑战赛现在开始！《找你歌》
				</h1>
				<p>
					已有<?php
//读操作：
$content = file_get_contents("txt/tongji.txt");
echo $content;
//写操作：
if (isset($_SESSION['olduser'])){
}
else{
$fp = fopen("txt/tongji.txt", 'w+'); 
fwrite($fp, $content+1);
fclose($fp); 
$_SESSION['olduser']=1;
}
?>人参考
				</p>
				<div class="avatar1 text-center">
					<div class="img-circle" id="sicon">
						<span class="glyphicon glyphicon-pencil"></span>
					</div>
				</div>
			</div>
		 <div id="bd" class="panel">
        <div id="panel1" class="panel-body">
            <dl>
                <dd style="font-size:18px;">
				自以为自己是ktv麦霸？自以为听过的歌曲千千万？来游戏里试一试吧！总有你没听过的歌，总有你猜不出歌名的歌！				</dd>
            </dl>
            <div class="buttons">
                <a href="#result" class="btn btn-danger btn-danger1 btn-block" onClick="return next(0);"> 开始测试</a>
            </div>
			<div class="buttons buttons2">
                <a href="#" onClick="guanzhu();" class="btn btn-danger btn-danger2 btn-block"> 一键关注 </a>
            </div>        </div>
		<div id="panel2" class="panel-body js_answer"
data-type="2"
		 style="display: none;">
            <dl>
                
								<dd>
				<p><input type="button" value="☞☞☞点击播放音乐" class="btn btn-success btn-block" id="start" onClick="play('http://www.bangbangu.com/games/zhaonige/audio/%E7%8E%8B%E6%9D%B0-%E4%B8%80%E5%9C%BA%E6%B8%B8%E6%88%8F%E4%B8%80%E5%9C%BA%E6%A2%A6+-+%E9%93%83%E5%A3%B0(1)%20-%20%E9%93%83%E5%A3%B0.mp3')" />
				<p class="stop">猜猜这首歌叫神马？</p>
				</dd>
								
            </dl>
            <ul class="list-group js_group">
				<li class="list-group-item" data-score="0" onClick="return toggle(this);"><i class="glyphicon glyphicon-unchecked"></i>A 爱情陷阱</li>				<li class="list-group-item" data-score="0" onClick="return toggle(this);"><i class="glyphicon glyphicon-unchecked"></i>B 爱</li>				<li class="list-group-item" data-score="10" onClick="return toggle(this);"><i class="glyphicon glyphicon-unchecked"></i>C 一场游戏一场梦</li>				<li class="list-group-item" data-score="0" onClick="return toggle(this);"><i class="glyphicon glyphicon-unchecked"></i>D 不可一世</li>																												
            </ul>
			<div class="buttons buttons2">
                <a href="#" onClick="guanzhu();" class="btn btn-danger btn-danger2 btn-block"> 一键关注 </a>
            </div>        </div><div id="panel2" class="panel-body js_answer"
data-type="2"
		 style="display: none;">
            <dl>
                
								<dd>
				<p><input type="button" value="☞☞☞点击播放音乐" class="btn btn-success btn-block" id="start" onClick="play('http://www.bangbangu.com/games/zhaonige/audio/%E9%99%88%E6%85%A7%E5%A8%B4-%E5%8D%83%E5%8D%83%E9%98%99%E6%AD%8C%20-%20%E9%93%83%E5%A3%B0%20-%20%E9%93%83%E5%A3%B0.mp312.mp3')" />
				<p class="stop">猜猜这首歌叫神马？</p>
				</dd>
								
            </dl>
            <ul class="list-group js_group">
				<li class="list-group-item" data-score="0" onClick="return toggle(this);"><i class="glyphicon glyphicon-unchecked"></i>A 痴情意外</li>				<li class="list-group-item" data-score="10" onClick="return toggle(this);"><i class="glyphicon glyphicon-unchecked"></i>B 千千阙歌</li>				<li class="list-group-item" data-score="0" onClick="return toggle(this);"><i class="glyphicon glyphicon-unchecked"></i>C 红茶馆</li>				<li class="list-group-item" data-score="0" onClick="return toggle(this);"><i class="glyphicon glyphicon-unchecked"></i>D 奔向未来</li>																												
            </ul>
			<div class="buttons buttons2">
                <a href="#" onClick="guanzhu();" class="btn btn-danger btn-danger2 btn-block"> 一键关注 </a>
            </div>        </div><div id="panel2" class="panel-body js_answer"
data-type="2"
		 style="display: none;">
            <dl>
                
								<dd>
				<p><input type="button" value="☞☞☞点击播放音乐" class="btn btn-success btn-block" id="start" onClick="play('http://www.bangbangu.com/games/zhaonige/audio/Beyond-%E6%B5%B7%E9%98%94%E5%A4%A9%E7%A9%BA%20-%20%E9%93%83%E5%A3%B0.mp311%20-%20%E9%93%83%E5%A3%B0.mp312.mp3')" />
				<p class="stop">猜猜这首歌叫神马？</p>
				</dd>
								
            </dl>
            <ul class="list-group js_group">
				<li class="list-group-item" data-score="0" onClick="return toggle(this);"><i class="glyphicon glyphicon-unchecked"></i>A 灰色空间</li>				<li class="list-group-item" data-score="0" onClick="return toggle(this);"><i class="glyphicon glyphicon-unchecked"></i>B 光辉岁月</li>				<li class="list-group-item" data-score="0" onClick="return toggle(this);"><i class="glyphicon glyphicon-unchecked"></i>C 天高地厚</li>				<li class="list-group-item" data-score="10" onClick="return toggle(this);"><i class="glyphicon glyphicon-unchecked"></i>D 海阔天空</li>																												
            </ul>
			<div class="buttons buttons2">
                <a href="#" onClick="guanzhu();" class="btn btn-danger btn-danger2 btn-block"> 一键关注 </a>
            </div>        </div><div id="panel2" class="panel-body js_answer"
data-type="2"
		 style="display: none;">
            <dl>
                
								<dd>
				<p><input type="button" value="☞☞☞点击播放音乐" class="btn btn-success btn-block" id="start" onClick="play('http://www.bangbangu.com/games/zhaonige/audio/%E5%88%9D%E9%9F%B3%E3%83%9F%E3%82%AF-%E7%94%A9%E8%91%B1%E6%AD%8C%20-%20%E9%93%83%E5%A3%B0.mp312.mp3')" />
				<p class="stop">猜猜这首歌叫神马？</p>
				</dd>
								
            </dl>
            <ul class="list-group js_group">
				<li class="list-group-item" data-score="0" onClick="return toggle(this);"><i class="glyphicon glyphicon-unchecked"></i>A 甩饼歌</li>				<li class="list-group-item" data-score="0" onClick="return toggle(this);"><i class="glyphicon glyphicon-unchecked"></i>B 熊猫与傻瓜</li>				<li class="list-group-item" data-score="0" onClick="return toggle(this);"><i class="glyphicon glyphicon-unchecked"></i>C 赶鸭子</li>				<li class="list-group-item" data-score="10" onClick="return toggle(this);"><i class="glyphicon glyphicon-unchecked"></i>D 甩葱歌 </li>																												
            </ul>
			<div class="buttons buttons2">
                <a href="#" onClick="guanzhu();" class="btn btn-danger btn-danger2 btn-block"> 一键关注 </a>
            </div>        </div><div id="panel2" class="panel-body js_answer"
data-type="2"
		 style="display: none;">
            <dl>
                
								<dd>
				<p><input type="button" value="☞☞☞点击播放音乐" class="btn btn-success btn-block" id="start" onClick="play('http://www.bangbangu.com/games/zhaonige/audio/%E8%AE%B8%E5%B5%A9-%E4%BD%A0%E8%8B%A5%E6%88%90%E9%A3%8E%20-%20%E9%93%83%E5%A3%B0(1)%20-%20%E9%93%83%E5%A3%B0.mp312.mp3')" />
				<p class="stop">猜猜这首歌叫神马？</p>
				</dd>
								
            </dl>
            <ul class="list-group js_group">
				<li class="list-group-item" data-score="0" onClick="return toggle(this);"><i class="glyphicon glyphicon-unchecked"></i>A 不够成熟</li>				<li class="list-group-item" data-score="10" onClick="return toggle(this);"><i class="glyphicon glyphicon-unchecked"></i>B 你若成风</li>				<li class="list-group-item" data-score="0" onClick="return toggle(this);"><i class="glyphicon glyphicon-unchecked"></i>C 爱丫爱丫</li>				<li class="list-group-item" data-score="0" onClick="return toggle(this);"><i class="glyphicon glyphicon-unchecked"></i>D 走火入魔</li>																												
            </ul>
			<div class="buttons buttons2">
                <a href="#" onClick="guanzhu();" class="btn btn-danger btn-danger2 btn-block"> 一键关注 </a>
            </div>        </div><div id="panel2" class="panel-body js_answer"
data-type="2"
		 style="display: none;">
            <dl>
                
								<dd>
				<p><input type="button" value="☞☞☞点击播放音乐" class="btn btn-success btn-block" id="start" onClick="play('http://www.bangbangu.com/games/zhaonige/audio/%E9%82%A3%E8%8B%B1-%E7%99%BD%E5%A4%A9%E4%B8%8D%E6%87%82%E5%A4%9C%E7%9A%84%E9%BB%91%20-%20%E9%93%83%E5%A3%B0%20-%20%E9%93%83%E5%A3%B0.mp312.mp3')" />
				<p class="stop">猜猜这首歌叫神马？</p>
				</dd>
								
            </dl>
            <ul class="list-group js_group">
				<li class="list-group-item" data-score="10" onClick="return toggle(this);"><i class="glyphicon glyphicon-unchecked"></i>A 白天不懂夜的黑</li>				<li class="list-group-item" data-score="0" onClick="return toggle(this);"><i class="glyphicon glyphicon-unchecked"></i>B 怎能放开你的手</li>				<li class="list-group-item" data-score="0" onClick="return toggle(this);"><i class="glyphicon glyphicon-unchecked"></i>C 如果我不能够爱你</li>				<li class="list-group-item" data-score="0" onClick="return toggle(this);"><i class="glyphicon glyphicon-unchecked"></i>D 凌晨的眼泪</li>																												
            </ul>
			<div class="buttons buttons2">
                <a href="#" onClick="guanzhu();" class="btn btn-danger btn-danger2 btn-block"> 一键关注 </a>
            </div>        </div><div id="panel2" class="panel-body js_answer"
data-type="2"
		 style="display: none;">
            <dl>
                
								<dd>
				<p><input type="button" value="☞☞☞点击播放音乐" class="btn btn-success btn-block" id="start" onClick="play('http://www.bangbangu.com/games/zhaonige/audio/%E9%AB%98%E8%83%9C%E7%BE%8E-%E6%88%91%E6%98%AF%E4%B8%8D%E6%98%AF%E4%BD%A0%E6%9C%80%E7%96%BC%E7%88%B1%E7%9A%84%E4%BA%BA%20(Shi)%20-%20%E9%93%83%E5%A3%B0%20-%20%E9%93%83%E5%A3%B0.mp312.mp3')" />
				<p class="stop">猜猜这首歌叫神马？</p>
				</dd>
								
            </dl>
            <ul class="list-group js_group">
				<li class="list-group-item" data-score="0" onClick="return toggle(this);"><i class="glyphicon glyphicon-unchecked"></i>A 不会消失的夜晚</li>				<li class="list-group-item" data-score="0" onClick="return toggle(this);"><i class="glyphicon glyphicon-unchecked"></i>B 下一个天亮</li>				<li class="list-group-item" data-score="10" onClick="return toggle(this);"><i class="glyphicon glyphicon-unchecked"></i>C 我是不是你最疼爱的人</li>				<li class="list-group-item" data-score="0" onClick="return toggle(this);"><i class="glyphicon glyphicon-unchecked"></i>D 听说爱情回来过</li>																												
            </ul>
			<div class="buttons buttons2">
                <a href="#" onClick="guanzhu();" class="btn btn-danger btn-danger2 btn-block"> 一键关注 </a>
            </div>        </div><div id="panel2" class="panel-body js_answer"
data-type="2"
		 style="display: none;">
            <dl>
                
								<dd>
				<p><input type="button" value="☞☞☞点击播放音乐" class="btn btn-success btn-block" id="start" onClick="play('http://www.bangbangu.com/games/zhaonige/audio/%E6%9D%8E%E5%A4%A9%E5%8D%8E-%E4%B8%83%E5%A4%A9%E4%B8%83%E4%B8%96%E7%BA%AA%20-%20%E9%93%83%E5%A3%B0%20-%20%E9%93%83%E5%A3%B0.mp312.mp3')" />
				<p class="stop">猜猜这首歌叫神马？</p>
				</dd>
								
            </dl>
            <ul class="list-group js_group">
				<li class="list-group-item" data-score="0" onClick="return toggle(this);"><i class="glyphicon glyphicon-unchecked"></i>A 一路走好</li>				<li class="list-group-item" data-score="0" onClick="return toggle(this);"><i class="glyphicon glyphicon-unchecked"></i>B 越爱越难过</li>				<li class="list-group-item" data-score="0" onClick="return toggle(this);"><i class="glyphicon glyphicon-unchecked"></i>C 七日七日情</li>				<li class="list-group-item" data-score="10" onClick="return toggle(this);"><i class="glyphicon glyphicon-unchecked"></i>D 七天七世纪</li>																												
            </ul>
			<div class="buttons buttons2">
                <a href="#" onClick="guanzhu();" class="btn btn-danger btn-danger2 btn-block"> 一键关注 </a>
            </div>        </div><div id="panel2" class="panel-body js_answer"
data-type="2"
		 style="display: none;">
            <dl>
                
								<dd>
				<p><input type="button" value="☞☞☞点击播放音乐" class="btn btn-success btn-block" id="start" onClick="play('http://www.bangbangu.com/games/zhaonige/audio/%E5%8F%B6%E4%B8%BD%E4%BB%AA&%E9%99%88%E6%B4%81%E7%81%B5-%E9%93%81%E8%A1%80%E4%B8%B9%E5%BF%83%20-%20%E9%93%83%E5%A3%B0%20-%20%E9%93%83%E5%A3%B0.mp312.mp3')" />
				<p class="stop">猜猜这首歌叫神马？</p>
				</dd>
								
            </dl>
            <ul class="list-group js_group">
				<li class="list-group-item" data-score="0" onClick="return toggle(this);"><i class="glyphicon glyphicon-unchecked"></i>A 铁血丹心</li>				<li class="list-group-item" data-score="0" onClick="return toggle(this);"><i class="glyphicon glyphicon-unchecked"></i>B 万水千山纵横</li>				<li class="list-group-item" data-score="0" onClick="return toggle(this);"><i class="glyphicon glyphicon-unchecked"></i>C 小李飞刀</li>				<li class="list-group-item" data-score="0" onClick="return toggle(this);"><i class="glyphicon glyphicon-unchecked"></i>D 世间始终你好</li>																												
            </ul>
			<div class="buttons buttons2">
                <a href="#" onClick="guanzhu();" class="btn btn-danger btn-danger2 btn-block"> 一键关注 </a>
            </div>        </div><div id="panel2" class="panel-body js_answer"
data-type="2"
		 style="display: none;">
            <dl>
                
								<dd>
				<p><input type="button" value="☞☞☞点击播放音乐" class="btn btn-success btn-block" id="start" onClick="play('http://www.bangbangu.com/games/zhaonige/audio/%E5%AD%99%E5%AD%90%E6%B6%B5-%E8%87%B4%E5%91%BD%E7%9A%84%E7%94%9C%E8%9C%9C%20-%20%E9%93%83%E5%A3%B0%20-%20%E9%93%83%E5%A3%B0.mp312.mp3')" />
				<p class="stop">猜猜这首歌叫神马？</p>
				</dd>
								
            </dl>
            <ul class="list-group js_group">
				<li class="list-group-item" data-score="0" onClick="return toggle(this);"><i class="glyphicon glyphicon-unchecked"></i>A 吻得太逼真</li>				<li class="list-group-item" data-score="0" onClick="return toggle(this);"><i class="glyphicon glyphicon-unchecked"></i>B 甜蜜的伤口</li>				<li class="list-group-item" data-score="0" onClick="return toggle(this);"><i class="glyphicon glyphicon-unchecked"></i>C 认真的雪</li>				<li class="list-group-item" data-score="10" onClick="return toggle(this);"><i class="glyphicon glyphicon-unchecked"></i>D 致命的甜蜜</li>																												
            </ul>
			<div class="buttons buttons2">
                <a href="#" onClick="guanzhu();" class="btn btn-danger btn-danger2 btn-block"> 一键关注 </a>
            </div>        </div>		<div id="panel3" class="panel-body js_result" data-id="1" style="display:none;">
            <h1 class="bold text-danger">没到10分，零级</h1>
            <hr>
            <dl>
                <dt>详细分析:</dt>
                <dd>
                    <p>哇哦！能考出如此惊天地、泣鬼神的分数，小朋友，你一定是00后吧，回去问问爸爸，他一定知道</p>
                </dd>
            </dl>
            <div class="buttons">
           <a href="javascript:void(0)" class="btn btn-success btn-block"
							onclick="dp_share();">分享给朋友(圈)</a>
            </div>
			<div class="buttons buttons2">
                <a href="#" onClick="guanzhu();" class="btn btn-danger btn-danger2 btn-block"> 一键关注 </a>
            </div>        </div><div id="panel3" class="panel-body js_result" data-id="2" style="display:none;">
            <h1 class="bold text-danger">没到20分，一级</h1>
            <hr>
            <dl>
                <dt>详细分析:</dt>
                <dd>
                    <p>哇哦！能考出如此惊天地、泣鬼神的分数，小朋友，你一定是00后吧，回去问问爸爸，他一定知道</p>
                </dd>
            </dl>
            <div class="buttons">
                <a href="javascript:void(0)" class="btn btn-success btn-block"
							onclick="dp_share();">分享给朋友(圈)</a>
            </div>
			<div class="buttons buttons2">
                <a href="#" onClick="guanzhu();" class="btn btn-danger btn-danger2 btn-block"> 一键关注 </a>
            </div>        </div><div id="panel3" class="panel-body js_result" data-id="3" style="display:none;">
            <h1 class="bold text-danger">没到30分，一级</h1>
            <hr>
            <dl>
                <dt>详细分析:</dt>
                <dd>
                    <p>哇哦！能考出如此惊天地、泣鬼神的分数，小朋友，你一定是00后吧，回去问问爸爸，他一定知道</p>
                </dd>
            </dl>
            <div class="buttons">
              <a href="javascript:void(0)" class="btn btn-success btn-block"
							onclick="dp_share();">分享给朋友(圈)</a>
            </div>
			<div class="buttons buttons2">
                <a href="#" onClick="guanzhu();" class="btn btn-danger btn-danger2 btn-block"> 一键关注 </a>
            </div>        </div><div id="panel3" class="panel-body js_result" data-id="4" style="display:none;">
            <h1 class="bold text-danger">没到40分，一级</h1>
            <hr>
            <dl>
                <dt>详细分析:</dt>
                <dd>
                    <p>哇哦！能考出如此惊天地、泣鬼神的分数，小朋友，你一定是00后吧，回去问问爸爸，他一定知道</p>
                </dd>
            </dl>
            <div class="buttons">
             <a href="javascript:void(0)" class="btn btn-success btn-block"
							onclick="dp_share();">分享给朋友(圈)</a>
            </div>
			<div class="buttons buttons2">
                <a href="#" onClick="guanzhu();" class="btn btn-danger btn-danger2 btn-block"> 一键关注 </a>
            </div>        </div><div id="panel3" class="panel-body js_result" data-id="5" style="display:none;">
            <h1 class="bold text-danger">没到50分，一级</h1>
            <hr>
            <dl>
                <dt>详细分析:</dt>
                <dd>
                    <p>真可惜! 差点点就及格了哈，继续 努力...</p>
                </dd>
            </dl>
            <div class="buttons">
                 <a href="javascript:void(0)" class="btn btn-success btn-block"
							onclick="dp_share();">分享给朋友(圈)</a>
            </div>
			<div class="buttons buttons2">
                <a href="#" onClick="guanzhu();" class="btn btn-danger btn-danger2 btn-block"> 一键关注 </a>
            </div>        </div><div id="panel3" class="panel-body js_result" data-id="6" style="display:none;">
            <h1 class="bold text-danger">没到60分，，二级</h1>
            <hr>
            <dl>
                <dt>详细分析:</dt>
                <dd>
                    <p>very good! 刚好在及格线上，不过这个成绩你自己满意么？</p>
                </dd>
            </dl>
            <div class="buttons">
                <a href="javascript:void(0)" class="btn btn-success btn-block"
							onclick="dp_share();">分享给朋友(圈)</a>
            </div>
			<div class="buttons buttons2">
                <a href="#" onClick="guanzhu();" class="btn btn-danger btn-danger2 btn-block"> 一键关注 </a>
            </div>        </div><div id="panel3" class="panel-body js_result" data-id="7" style="display:none;">
            <h1 class="bold text-danger">没到70分，三级</h1>
            <hr>
            <dl>
                <dt>详细分析:</dt>
                <dd>
                    <p>very good! ，不过这个成绩你自己满意么？</p>
                </dd>
            </dl>
            <div class="buttons">
                <a href="javascript:void(0)" class="btn btn-success btn-block"
							onclick="dp_share();">分享给朋友(圈)</a>
            </div>
			<div class="buttons buttons2">
                <a href="#" onClick="guanzhu();" class="btn btn-danger btn-danger2 btn-block"> 一键关注 </a>
            </div>        </div><div id="panel3" class="panel-body js_result" data-id="8" style="display:none;">
            <h1 class="bold text-danger">没到80分，四级</h1>
            <hr>
            <dl>
                <dt>详细分析:</dt>
                <dd>
                    <p>哟西，小朋友，有多少人上不来这个分数，你上来了，快通知你的伙伴们一起来测试一下</p>
                </dd>
            </dl>
            <div class="buttons">
                <a href="javascript:void(0)" class="btn btn-success btn-block"
							onclick="dp_share();">分享给朋友(圈)</a>
            </div>
			<div class="buttons buttons2">
                <a href="#" onClick="guanzhu();" class="btn btn-danger btn-danger2 btn-block"> 一键关注 </a>
            </div>        </div><div id="panel3" class="panel-body js_result" data-id="9" style="display:none;">
            <h1 class="bold text-danger">没到90分，五级</h1>
            <hr>
            <dl>
                <dt>详细分析:</dt>
                <dd>
                    <p>哟西，小朋友，有多少人上不来这个分数，你上来了，快通知你的伙伴们一起来测试一下</p>
                </dd>
            </dl>
            <div class="buttons">
                <a href="javascript:void(0)" class="btn btn-success btn-block"
							onclick="dp_share();">分享给朋友(圈)</a>
            </div>
			<div class="buttons buttons2">
                <a href="#" onClick="guanzhu();" class="btn btn-danger btn-danger2 btn-block"> 一键关注 </a>
            </div>        </div><div id="panel3" class="panel-body js_result" data-id="10" style="display:none;">
            <h1 class="bold text-danger">哇塞，满分！满级</h1>
            <hr>
            <dl>
                <dt>详细分析:</dt>
                <dd>
                    <p>艾玛，大神，你既然全部答对了。快通知你的伙伴们一起来测试一下哈</p>
                </dd>
            </dl>
            <div class="buttons">
             <a href="javascript:void(0)" class="btn btn-success btn-block"
							onclick="dp_share();">分享给朋友(圈)</a>
            </div>
			<div class="buttons buttons2">
                <a href="#" onClick="guanzhu();" class="btn btn-danger btn-danger2 btn-block"> 一键关注 </a>
            </div>        </div>        
    </div>
</div>
		<div class="footer text-center"
			style="position: relative; margin-bottom: 20px">
			<div class="container">
				<a href="#" onClick="guanzhu();">关注{sitename}网络</a>
			</div>
		</div>

		<div class="loads" style="display: bolck">
			<i></i>
		</div>
		<script src="Public/fangyan/zepto.min.js"></script>
		<script type="text/javascript">
    // var audio = new Audio();
    var total = '10';
    var tScore = 0;
    var scoreArr = new Array();
        scoreArr[0] = 0;
        scoreArr[1] = 10;
        scoreArr[2] = 20;
        scoreArr[3] = 30;
        scoreArr[4] = 40;
        scoreArr[5] = 50;
        scoreArr[6] = 60;
		scoreArr[7] = 70;
		scoreArr[8] = 80;
		scoreArr[9] = 90;
    function next(t){
        //console.log(t);
        $(".panel-body").hide();
        var $_this = $(".js_answer").eq(t);
            $_this.show();
        var type = $_this.attr('data-type');
        if(type==2){
            // audio.src = $_this.find('audio').attr('src');
            // audio.load();
            // audio.play();
            $('#sicon').html('<span class="glyphicon glyphicon-headphones"></span>');
        }
        else if(type==1){
            // stop = true;
            // audio.pause();
            $('#sicon').html('<span class="glyphicon glyphicon-picture"></span>');
        }
        else{
            // stop = true;
            // audio.pause();
            $('#sicon').html('<span class="glyphicon glyphicon-pencil"></span>');
        }
    }

    function result(t){
        console.log("得分"+tScore);
        dp_submitScore(tScore);
        $(".panel-body").hide();
        for (var i = scoreArr.length - 1; i >= 0; i--) {
            if ( parseInt(t) >= parseInt(scoreArr[i]) ) {
                console.log("应该弹"+i);
                $(".js_result").eq(i).show();
                if(i>(10/2)){
                    $('#sicon').html('<span class="glyphicon glyphicon-thumbs-up"></span>');
                }
                else{
                    $('#sicon').html('<span class="glyphicon glyphicon-thumbs-down"></span>');
                }
                return false;
            }
            else{
                continue;    
            }
        };
    }

    function toggle(t){
        $(".list-group-item").removeClass('active')
        var score = $(t).attr("data-score");
        tScore  = parseInt(tScore) + parseInt(score);
        $(t).find('i').removeClass('glyphicon-unchecked').addClass('glyphicon-ok');
        var t = $(".js_answer").index($(t).parents(".js_answer")) + 1;
		//音乐播放beg
		$('.btn').show();
        $('.stop').hide();
		//音乐播放end
        if(t == total){
            result(tScore);
        }
        else{
            setTimeout(function(){next(t);},300);
        }
    }
    Zepto(function($){
        $('.loads').hide();
    })
   
</script>
		<script>
	$("#content img").each(function(){
		$(this).removeAttr('height');
		if(($(this).width()+20)>$('#content').innerWidth()){
			
			$(this).removeAttr('style').removeAttr('width');
			$(this).removeAttr('style').attr('width',($('#content').innerWidth()-20));
		}else{
			$(this).removeAttr('style').attr('max-width','100%');
		}
						   
	});
	$("#content2 img").each(function(){
		$(this).removeAttr('height');
		if(($(this).width()+20)>$('#content2').innerWidth()){
			
			$(this).removeAttr('style').removeAttr('width');
			$(this).removeAttr('style').attr('width',($('#content2').innerWidth()-20));
		}else{
			$(this).removeAttr('style').attr('max-width','100%');
		}
						   
	});
	</script>
	<script language=javascript>
		var mebtnopenurl = '{morelink}';
var thegameurl ="{morelink}/games/zhaonige/"; 
var guanzhuurl ="{tuiguanglink}";
		window.shareData = {
		       "imgUrl" : 'http://mmbiz.qpic.cn/mmbiz/2zpp2iaH4HWFfk1AD88Z0sGY5yBYLBDajUAg1KDNzicw9M4ic2VTaWOTqqEUhXsrFOt2rovOgndovicia0QjiaZoV5pw/640',
            "timeLineLink" :thegameurl,
            "tTitle" : '麦霸挑战赛开始了！',
            "tContent" : '麦霸挑战赛开始了！'
		};
				
		function goHome(){
			window.location=mebtnopenurl;
		}
		function guanzhu(){
			window.location=guanzhuurl;
		}
		function clickMore(){
			if((window.location+"").indexOf("f=zf",1)>0){
				window.location = mebtnopenurl ;
			 }
			 else{
				goHome();
			 }
		}
		function guanzhu(){
				window.location = guanzhuurl ;
		}
		function dp_share(){
			if(myData.score){
				document.title ="麦霸挑战赛开始了！我得了"+myData.score+"分！还能再牛点吗？";
			}
			document.getElementById("share").style.display="";
			window.shareData.tTitle = document.title;
		}
		function dp_Ranking(){
			window.location=mebtnopenurl;
		}

		function showAd(){
		}
		function hideAd(){
		}
		document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
		    
		    WeixinJSBridge.on('menu:share:appmessage', function(argv) {
		        WeixinJSBridge.invoke('sendAppMessage', {
		            "img_url": window.shareData.imgUrl,
		            "link": window.shareData.timeLineLink,
		            "desc": window.shareData.tContent,
		            "title": window.shareData.tTitle
		        }, onShareComplete);
		    });

		    WeixinJSBridge.on('menu:share:timeline', function(argv) {
		        WeixinJSBridge.invoke('shareTimeline', {
		            "img_url": window.shareData.imgUrl,
		            "img_width": "640",
		            "img_height": "640",
		            "link": window.shareData.timeLineLink,
		            "desc": window.shareData.tContent,
		            "title": window.shareData.tTitle
		        }, onShareComplete);
		    });
		}, false);
		</script>
		<div id=share style="display: none">
			<img width=100% src="share.png"
				style="position: fixed; z-index: 9999; top: 0; left: 0; display: "
				ontouchstart="document.getElementById('share').style.display='none';" />
		</div>
		<div style="display: none;">
			<script type="text/javascript">
            var myData = { gameid: "ndtnrgclm" };
			 var domain = ["oixm.cn", "hiemma.cn", "peagame.net"][parseInt(Math.random() * 3)];
			window.shareData.timeLineLink = thegameurl ;
			function dp_submitScore(score){
				myData.score = parseInt(score);
				
			}
			function onShareComplete(res) {
               /* if (localStorage.myuid && myData.score != undefined) {
                    setTimeout(function(){
                        if (confirm("？")) {
                            window.location = mebtnopenurl ;
                        }
                        else {
                            document.location.href = mebtnopenurl;
                        }
                    }, 500);
                }
				else {
		        	document.location.href = guanzhuurl ;
				}*/
				document.location.href = guanzhuurl ;
	        }
			</script>
			<div style="display: none;">
				
			</div>
	
	</body>
</html>