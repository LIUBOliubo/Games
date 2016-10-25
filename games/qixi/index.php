<html>
<head>
<meta charset="utf-8">
<meta content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" name="viewport">
	<link rel="prerender" href="http://weixinad.lejuy.com/ssql/img/start_page.jpg?2">
	<link rel="prerender" href="http://weixinad.lejuy.com/ssql/img/game_bg.jpg?1">
	<link rel="prerender" href="http://weixinad.lejuy.com/ssql/img/score_bg.png?3">
	<link rel="prerender" href="http://weixinad.lejuy.com/ssql/img/lovers_0.png">
	<link rel="prerender" href="http://weixinad.lejuy.com/ssql/img/lovers_1.png">
	<link rel="prerender" href="http://weixinad.lejuy.com/ssql/img/lovers_2.png">
	<link rel="prerender" href="http://weixinad.lejuy.com/ssql/img/lovers_3.png">
	<link rel="prerender" href="http://weixinad.lejuy.com/ssql/img/blood.png">
	<link rel="prerender" href="http://weixinad.lejuy.com/ssql/img/single_0.png">
	<link rel="prerender" href="http://weixinad.lejuy.com/ssql/img/single_1.png">
	<link rel="prerender" href="http://weixinad.lejuy.com/ssql/img/single_2.png">
	<link rel="prerender" href="http://weixinad.lejuy.com/ssql/img/single_3.png">
	<link rel="prerender" href="http://weixinad.lejuy.com/ssql/img/time_over.png">
	<link rel="prerender" href="http://weixinad.lejuy.com/ssql/img/share.png?2">
	<link rel="prerender" href="http://weixinad.lejuy.com/ssql/img/music.mp3">
    <script type="text/javascript" src="http://libs.baidu.com/jquery/1.10.2/jquery.min.js"></script>
    <script type="text/javascript" src="createjs.js"></script>
    <script type="text/javascript">
		var isDesktop = navigator['userAgent'].match(/(ipad|iphone|ipod|android|windows phone)/i) ? false : true;
    	var fontunit        = isDesktop ? 20 : ((window.innerWidth>window.innerHeight?window.innerHeight:window.innerWidth)/320)*10;
    	document.write('<style type="text/css">'+
    		'html,body {font-size:'+(fontunit<30?fontunit:'30')+'px;}'+
    		(isDesktop?'#welcome,#GameLayerBG,#GameScoreLayer.SHADE{position: absolute;}':
    		'#welcome,#GameTimeLayer,#GameLayerBG,#GameScoreLayer.SHADE{position:fixed;}')+
    		'</style>');
    </script>
    <style type="text/css">
    body {font-family: "微软雅黑"; margin: 0; padding: 0;max-width:640px;margin:0 auto;position: relative;}
    @media screen and (min-width:640px)
	{
		body{font-size: 36px;}
	}
	@media screen and (min-width:540px) and (max-width:639px)
	{
		body{font-size: 32px;}
	}
	@media screen and (min-width:480px) and (max-width:539px)
	{
		body{font-size: 28px;}
	}
	@media screen and (min-width:320px) and (max-width:479px)
	{
		body{font-size: 20px;}
	}

	#ready-btn,.loading{height:12.5%;bottom:0;width:58%;left:22%;position: absolute;z-index: 5;color:#b67f76;display: box;display: -webkit-box;display: -moz-box;display: -ms-flexbox;box-align: center;box-pack: center;-webkit-box-align: center;-webkit-box-pack: center;-ms-flex-align: center;-ms-flex-pack: center;letter-spacing:6px;}
	
    .SHADE {top: 0; left:0; width:100%; height: 100%; bottom:0; z-index: 11;}

    #welcome {background:url(http://weixinad.lejuy.com/ssql/img/start_page.jpg?2) no-repeat;overflow: hidden;background-size: 100% 100%;}
    .welcome-bg {position:absolute;top:0;left:0;right:0;bottom:0;}
	#GameLayerBG {top:0;left:0;right:0;bottom:0;overflow:hidden;background:url(http://weixinad.lejuy.com/ssql/img/game_bg.jpg?1) no-repeat;background-size:100% 100%;}
    .GameLayer {position:absolute;bottom:0;left:5%;height:100%;width:91%;}
    .block{position:absolute; background-repeat: no-repeat; background-position: center bottom;background-size: auto 90%;background-image: none;}
    .t0{background-image:url(http://weixinad.lejuy.com/ssql/img/lovers_0.png);}
    .t1{background-image:url(http://weixinad.lejuy.com/ssql/img/lovers_1.png);}
    .t2{background-image:url(http://weixinad.lejuy.com/ssql/img/lovers_2.png);}
    .t3{background-image:url(http://weixinad.lejuy.com/ssql/img/lovers_3.png);}
    .tt0{ background-image:url(http://weixinad.lejuy.com/ssql/img/blood.png);background-size:100% auto;}
    .s0{background-image:url(http://weixinad.lejuy.com/ssql/img/single_0.png);}
    .s1{background-image:url(http://weixinad.lejuy.com/ssql/img/single_1.png);}
    .s2{background-image:url(http://weixinad.lejuy.com/ssql/img/single_2.png);}
    .s3{background-image:url(http://weixinad.lejuy.com/ssql/img/single_3.png);}
    @-ms-keyframes flash {
    	0% { opacity: 1; }
    	50% { opacity: 0; }
    	100% { opacity: 1; }
    }
    @-webkit-keyframes flash {
    	0% { opacity: 1; } 
    	50% { opacity: 0; }
    	100% { opacity: 1; }
    }
  	.flash {-webkit-animation: flash .2s 3;animation: flash .2s 3;}
    .bad {-webkit-animation: flash .2s 3;animation: flash .2s 3;background-image:url(http://weixinad.lejuy.com/ssql/img/blood.png);background-size:100% auto;}
    *    {-webkit-tap-highlight-color: rgba(0,0,0,0);-ms-tap-highlight-color: rgba(0,0,0,0); tap-highlight-color: rgba(0,0,0,0); -ms-user-select: none;}
    #GameScoreLayer {background-position:center .5em; background-size: auto 4em; font-weight: bold; color:#fff; text-align: center;overflow: hidden;background:url(http://weixinad.lejuy.com/ssql/img/score_bg.png?3) no-repeat #191a1e;background-size:100% 100%;}

	#GameScoreLayer-btn{position: absolute;bottom:5%;height:18%;width:85%;left:7.5%;color:#b67f76;overflow: hidden;}
    .btn{display: box; display: -webkit-box; display: -moz-box; display: -ms-flexbox;box-align: center;box-pack: center; -webkit-box-align: center; -webkit-box-pack: center; -ms-flex-align:center; -ms-flex-pack:center;width:46%;height:100%;float:left;font-weight: normal;cursor: pointer;}
	.btn:nth-child(2){float:right;}
    #landscape {display: none;}
	#GameScoreLayer-adv{position: absolute;bottom:0;height:5%;width:85%;left:7.5%;color:#b67f76;overflow: hidden;}
	#gameBody {position: relative; width:100%; margin: 0 auto; height: 100%;}
	#share-wx {background:#191a1e;position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;z-index: 10000;display: none;}
	#share-wx-img{width:100%;}
	#scoreTotal{max-width:640px;padding-left:4%;position:fixed;top:0;height:50px;width:100%;overflow: hidden;background:#000;-webkit-box-sizing: border-box;-moz-box-sizing: border-box;box-sizing: border-box;display:none;}
	#titleBg{float:left;margin-right:20px;height:40px;z-index: 3;margin-top:5px;}
	#number,#GameTimeLayer{line-height:50px;font-size: 24px;color:#850101;height:100%;}
	#number{float:left;}
	#GameTimeLayer {text-shadow:0 0 3px #fff,0 0 3px #fff,0 0 3px #fff;position: absolute;right:85px;}
	#photo{height:100%;float:right;border: none;display:block;}
	#GameScoreLayer-text{color:#191a1e;text-align: center;font-size: 20px;font-weight: bold;padding:20px 5%;display:none;}
	#scoreLoading{height:232px;line-height: 232px;text-align: center;font-size: 28px;letter-spacing:6px;color:#b67f76;}
	#GameScoreLayer-text p{padding:0;margin:0;}
	#GameScoreLayer-text .text0{text-align: left;}
	#GameScoreLayer-text .text1{position: relative;width:100%;}
	#GameScoreLayer-text .text2{font-size: 30px;}
	#scoreAll{color:#b12813;font-size: 74px;}
	.positonP{position: absolute;right:0;bottom:16px;}
	#timeOver{width:0%;position: absolute;height:17.5%;left:0%;top:16%;display:none;background:url(http://weixinad.lejuy.com/ssql/img/time_over.png) no-repeat;background-size: 100% 100%}
    </style>
</head>
<body onLoad="init()">
	
	<script type="text/javascript">
	var mebtnopenurl = '{morelink}';
	//分享
	window.shareData = {
        "imgUrl": "http://weixinad.lejuy.com/ssql/img/fx.jpg",
        "timeLineLink": "http://weixinad.lejuy.com/ssql",
        "tTitle": "我们不分散情侣，我们只做七夕的拆桥工~快来加入我们！",
        "tContent": "女神拒绝？小三横行？快来玩，在这里，摁死那些可恶的情侣才是王道！"
    };
	
	if (isDesktop)
		document.write('<div id="gameBody">');

	var body, blockSize, GameLayer = [], GameLayerBG, touchArea = [], GameTimeLayer;
	var transform, transitionDuration;

	function init (argument) {
		showWelcomeLayer();
		if (typeof WeixinJSBridge == "undefined"){
		    if( document.addEventListener ){
		        document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
		    }else if (document.attachEvent){
		        document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
		        document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
		    }
		}else{
		    onBridgeReady();
		} 
		body = document.getElementById('gameBody') || document.body;
		body.style.height = window.innerHeight+'px';
		transform = typeof(body.style.webkitTransform) != 'undefined' ? 'webkitTransform' : (typeof(body.style.msTransform) != 'undefined'?'msTransform':'transform');
		transitionDuration = transform.replace(/ransform/g, 'ransitionDuration');

		GameTimeLayer = document.getElementById('GameTimeLayer');
		GameLayer.push( document.getElementById('GameLayer1') );
		GameLayer[0].children = GameLayer[0].querySelectorAll('div');
		GameLayer.push( document.getElementById( 'GameLayer2' ) );
		GameLayer[1].children = GameLayer[1].querySelectorAll('div');
		GameLayerBG = document.getElementById( 'GameLayerBG' );
		if( GameLayerBG.ontouchstart === null ){
			GameLayerBG.ontouchstart = gameTapEvent;
		}else{
			GameLayerBG.onmousedown = gameTapEvent;
		}
		gameInit();
		window.addEventListener('resize', refreshSize, false);

		var rtnMsg = "true";	
				
		setTimeout(function(){
			if(rtnMsg){
				var btn = document.getElementById('ready-btn');
				btn.className = 'btn';
				btn.innerHTML = '点击开始游戏'
				btn.onclick = function(){
					closeWelcomeLayer();
				} 
			}					
		}, 500);
	}
	var refreshSizeTime;
	function refreshSize(){
		clearTimeout(refreshSizeTime);
		refreshSizeTime = setTimeout(_refreshSize, 200);
	}
	function onBridgeReady(){
	   WeixinJSBridge.call('hideToolbar');
	}
	function _refreshSize(){
		countBlockSize();
		for( var i=0; i<GameLayer.length; i++ ){
			var box = GameLayer[i];
			for( var j=0; j<box.children.length; j++){
				var r = box.children[j],
					rstyle = r.style;
				rstyle.left = (j%4)*blockSize+'px';
				rstyle.bottom = Math.floor(j/4)*blockSize+'px';
				rstyle.width = blockSize+'px';
				rstyle.height = blockSize+'px';
			}
		}
		var f, a;
		if( GameLayer[0].y > GameLayer[1].y ){
			f = GameLayer[0];
			a = GameLayer[1];
		}else{
			f = GameLayer[1];
			a = GameLayer[0];
		}
		var y = (_gameBBListIndex%10)*blockSize;
		f.y = y;
		f.style[transform] = 'translate3D(0,'+f.y+'px,0)';

		a.y = -blockSize*Math.floor(f.children.length/4)+y;
		a.style[transform] = 'translate3D(0,'+a.y+'px,0)';

	}
	function countBlockSize(){
		blockSize = body.offsetWidth*0.91/4;
		body.style.height = window.innerHeight+'px';
		GameLayerBG.style.height = window.innerHeight+'px';
		touchArea[0] = window.innerHeight-blockSize*1;
		touchArea[1] = window.innerHeight-blockSize*2;
	}
	var _gameBBList = [], _gameBBListIndex = 0, _gameOver = false, _gameStart = false, _gameTime, _gameTimeNum, _gameScore;
	function gameInit(){
        createjs.Sound.registerSound( {src:"http://weixinad.lejuy.com/ssql/img/music.mp3", id:"tap"} );
		gameRestart();
	}
	function gameRestart(){
		_gameBBList = [];
		_gameBBListIndex = 0;
		_gameScore = 0;
		_gameOver = false;
		_gameStart = false;
		_gameTimeNum = 2000;
		GameTimeLayer.innerHTML = creatTimeText(_gameTimeNum);
		countBlockSize();
		refreshGameLayer(GameLayer[0]);
		refreshGameLayer(GameLayer[1], 1);
	}
	function gameStart(){
		_gameStart = true;
		_gameTime = setInterval(gameTime, 10);
	}
	function gameOver(){
		_gameOver = true;
		clearInterval(_gameTime);
		setTimeout(function(){
			GameLayerBG.className = '';
			showGameScoreLayer();
		}, 1000);
	}
	function gameTime(){
		_gameTimeNum --;
		if( _gameTimeNum <= 0){
			GameTimeLayer.innerHTML = "0'00''";
			//$('#timeOver').show();
			gameOver();
			GameLayerBG.className += ' flash';
			createjs.Sound.play("tap");
		}else{
			GameTimeLayer.innerHTML = creatTimeText(_gameTimeNum);
		}
	}
	function creatTimeText( n ){
		var text = (100000+n+'').substr(-4,4);
		text = '&nbsp;&nbsp;'+text.substr(0,2)+"'"+text.substr(2)+"''"
		return text;
	}
	var _ttreg = / t{1,2}(\d+)/, _clearttClsReg = / t{1,2}\d+| bad/,_clears1ClsReg = / s\d/;
	function refreshGameLayer( box, loop, offset ){
		var i = Math.floor(Math.random()*1234)%4+(loop?0:4);
		for( var j=0; j<box.children.length; j++){
			var r = box.children[j],
				rstyle = r.style;
			rstyle.left = (j%4)*blockSize+'px';
			rstyle.bottom = Math.floor(j/4)*blockSize+'px';
			rstyle.width = blockSize+'px';
			rstyle.height = blockSize+'px';
			r.className = r.className.replace(_clearttClsReg, '');
			r.className = r.className.replace(_clears1ClsReg, '');
			if( i == j ){
				_gameBBList.push( {cell:i%4, id:r.id} );
				var random=Math.floor((Math.random()*1234)%4);
				r.className += ' t'+random;

				var random1=Math.floor((Math.random()*1234)%4);

				if( loop ){
					var x=j%4;
					if(random1!=x)
					{
						var endNum=Math.floor(j/4)*4+random1;
						box.children[endNum].className = box.children[endNum].className+' s'+Math.floor((Math.random()*1234)%4);
					}
				}else{
					if(j>7){
						var x=j%4;
						if(random1!=x)
						{
							var endNum=Math.floor(j/4)*4+random1;
							box.children[endNum].className = box.children[endNum].className+' s'+Math.floor((Math.random()*1234)%4);
						}
					}
				}
				r.notEmpty = true;
				i = ( Math.floor(j/4)+1)*4+Math.floor((Math.random()*1234)%4);

			}else{
				r.notEmpty = false;
			}
		}
		if( loop ){
			box.style.webkitTransitionDuration = '0ms';
			box.style.display          = 'none';
			box.y                      = -blockSize*(Math.floor(box.children.length/4)+(offset||0))*loop;
			setTimeout(function(){
				box.style[transform] = 'translate3D(0,'+box.y+'px,0)';
				setTimeout( function(){
					box.style.display     = 'block';
				}, 100 );
			}, 200 );
		} else {
			box.y = 0;
			box.style[transform] = 'translate3D(0,'+box.y+'px,0)';
		}
		box.style[transitionDuration] = '150ms';
	}
	function gameLayerMoveNextRow(){
		for(var i=0; i<GameLayer.length; i++){
			var g = GameLayer[i];
			g.y += blockSize;
			if( g.y > blockSize*(Math.floor(g.children.length/4)) ){
				refreshGameLayer(g, 1, -1);
			}else{
				g.style[transform] = 'translate3D(0,'+parseInt(g.y)+'px,0)';
			}
		}
	}
	function gameTapEvent(e){
		if (_gameOver) {
			return false;
		}
		var tar = e.target;
		var y = e.clientY || e.targetTouches[0].clientY,
			x = (e.clientX || e.targetTouches[0].clientX)-body.offsetLeft,
			cha=body.offsetWidth*0.95;
			x=x+cha;
			p = _gameBBList[_gameBBListIndex];
		if ( y > touchArea[0] || y < touchArea[1]) {
			return false;
		}
		if( (p.id==tar.id&&tar.notEmpty) || (p.cell==0&&x<blockSize+cha) || (p.cell==1&&x>blockSize+cha&&x<2*blockSize+cha) || (p.cell==2&&x>2*blockSize+cha&&x<3*blockSize+cha) || (p.cell==3&&x>3*blockSize+cha) ){
			if( !_gameStart ){
				gameStart();
			}
        	createjs.Sound.play("tap");
			tar = document.getElementById(p.id);
			tar.className = tar.className.replace(_ttreg, ' tt0');
			_gameBBListIndex++;
			_gameScore ++; 
			$('#number span').html(_gameScore);
			gameLayerMoveNextRow();
		}else if( _gameStart && !tar.notEmpty && / s\d/.test(tar.className)){
			createjs.Sound.play("tap");
			tar.className += ' bad';
			gameOver();
		}
		return false;
	}
	function createGameLayer(){
		var html = '<div id="GameLayerBG">';
		for(var i=1; i<=2; i++){
			var id = 'GameLayer'+i;
			html += '<div id="'+id+'" class="GameLayer">';
			for(var j=0; j<10; j++ ){
				for(var k=0; k<4; k++){ 
					html += '<div id="'+id+'-'+(k+j*4)+'" num="'+(k+j*4)+'" class="block"></div>';
				}
			}
			html += '</div>';
		}
		html += '</div>';

		return html;
	}
	function closeWelcomeLayer(){
		var l = document.getElementById('welcome');
		l.style.display = 'none';
		$('#scoreTotal').show();
	}
	function showWelcomeLayer(){
		var l = document.getElementById('welcome');
		l.style.display = 'block';
	}
	function showGameScoreLayer(){
		
		var data =  "50%";
		
		$('#scoreLoading').hide();
		$('#GameScoreLayer-text').html(shareText(data,_gameScore)).show();
					
		var l = document.getElementById('GameScoreLayer');
		l.style.display = 'block';
		 window.shareData.tTitle = '我摁死了'+_gameScore+'对情侣，太爽了，单身同胞们快上啊!'
	}
	function hideGameScoreLayer(){
		var l = document.getElementById('GameScoreLayer');
		l.style.display = 'none';
		$('#timeOver').hide();
		$('#score').html('0');
		$('#scoreLoading').show();
        $('#GameScoreLayer-text').html('').hide();
	}
	function replayBtn(){
		gameRestart();
		hideGameScoreLayer();
	}
	function backBtn(){
		gameRestart();
		hideGameScoreLayer();
		showWelcomeLayer();
	}
	function shareText( data,score){
		if( score <= 50 )
			return "<p class='text0'>太少了太少了！隔壁老奶奶手一抖都比你多！你只摁死了</p><p class='text1'><span id='scoreAll'>"+score+"</span><span class='positonP'>对情侣</span></p><p class='text2'></p>";
		else if( score <= 100 )
			return "<p class='text0'>手指蛮厉害啊，不过这就是你所有的撸劲了吗？！你摁死了</p><p class='text1'><span id='scoreAll'>"+score+"</span><span class='positonP'>对情侣</span></p><p class='text2'></p>";
		else if( score <= 150 )
			return "<p class='text0'>单身贱圣的狂欢，让我们在七夕夜把所有情侣的温床都摁塌吧！你居然摁死了</p><p class='text1'><span id='scoreAll'>"+score+"</span><span class='positonP'>对情侣</span></p><p class='text2'></p>";
		else
			return "<p class='text0'>传奇！什么最牛逼？单身最牛逼！你TMD摁死了</p><p class='text1'><span id='scoreAll'>"+score+"</span><span class='positonP'>对情侣</span></p><p class='text2'></p>";
	}
	
	function toStr(obj) {
		if ( typeof obj == 'object' ) {
			return JSON.stringify(obj);
		} else {
			return obj;
		}
		return '';
	}
	function cookie(name, value, time) {
		if (name) {
			if (value) {
				if (time) {
					var date = new Date();
					date.setTime(date.getTime() + 864e5 * time), time = date.toGMTString();
				}
				return document.cookie = name + "=" + escape(toStr(value)) + (time ? "; expires=" + time + (arguments[3] ? "; domain=" + arguments[3] + (arguments[4] ? "; path=" + arguments[4] + (arguments[5] ? "; secure" : "") : "") : "") : ""), !0;
			}
			return value = document.cookie.match("(?:^|;)\\s*" + name.replace(/([-.*+?^${}()|[\]\/\\])/g, "\\$1") + "=([^;]*)"), value = value && "string" == typeof value[1] ? unescape(value[1]) : !1, (/^(\{|\[).+\}|\]$/.test(value) || /^[0-9]+$/g.test(value)) && eval("value=" + value), value;
		}
		var data = {};
		value = document.cookie.replace(/\s/g, "").split(";");
		for (var i = 0; value.length > i; i++) name = value[i].split("="), name[1] && (data[name[0]] = unescape(name[1]));
		return data;
	}
	document.write(createGameLayer());
	
	function share(){
		document.getElementById('share-wx').style.display = 'block';
		document.getElementById('share-wx').onclick = function(){
			this.style.display = 'none';
		};
	}
	
	function more(){
		document.location.href = "http://weixinad.lejuy.com/game.html";
	}
	
	function about(){
		document.location.href = mebtnopenurl;
	}
	
	document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
	    
	    WeixinJSBridge.on('menu:share:appmessage', function(argv) {
	        WeixinJSBridge.invoke('sendAppMessage', {
	            "img_url": window.shareData.imgUrl,
	            "link": window.shareData.timeLineLink,
	            "desc": window.shareData.tContent,
	            "title": window.shareData.tTitle
	        }, function(res) {
				document.location.href = mebtnopenurl;
	        })
	    });

	    WeixinJSBridge.on('menu:share:timeline', function(argv) {
	        WeixinJSBridge.invoke('shareTimeline', {
	            "img_url": window.shareData.imgUrl,
	            "img_width": "120",
	            "img_height": "120",
	            "link": window.shareData.timeLineLink,
	            "desc": window.shareData.tContent,
	            "title": window.shareData.tTitle
	        }, function(res) {
				document.location.href = mebtnopenurl;
	        });
	    });
	}, false);
</script>

	<div id="GameScoreLayer" class="BBOX SHADE" style="display:none;">
		<div id="GameScoreLayer-text"></div>
		<div id='scoreLoading'>加载中...</div>
		<div id="GameScoreLayer-btn">
			<div class="btn">
				<a onclick = "javascript:replayBtn()" style="color:yellow; font-size:24; z-index:99999" >再来一次</a><br/><br/>
				<a onclick = "javascript:more()" style="color:yellow; font-size:24; z-index:99999" >更多游戏</a>
			</div>
			<div class="btn">
				<a onClick="javascript:share()" style="color:yellow; font-size:24; z-index:99999">分享好友</a><br/><br/>
				<a onClick="javascript:about()" style="color:yellow; font-size:24; z-index:99999" >关注我们</a>
			</div>
			</div>	
		<div id="GameScoreLayer-adv">
			<!--广告-->
		</div>
	</div>
	<div id='scoreTotal'><img src='http://weixinad.lejuy.com/ssql/img/title_bg.png' id='titleBg'><span id='number'>=&nbsp;<span id='score'>0</span></span><img src='http://weixinad.lejuy.com/ssql/img/photo_bg.png' id='photo'><div id="GameTimeLayer"></div></div>
	<div id="welcome" class="SHADE BOX-M">
		<div class="welcome-bg FILL"></div>
		<div id="ready-btn" class="btn loading">加载中...</div>	
	</div>
	<div id='timeOver'></div>
	<div id="share-wx"><img src="http://weixinad.lejuy.com/ssql/img/share.png?2" id="share-wx-img"></div>
<script type="text/javascript">
	if (isDesktop)
		document.write('</div>');
</script>
 <div style="display:none">
<script type="text/javascript">
var _bdhmProtocol = (("https:" == document.location.protocol) ? " https://" : " http://");
document.write(unescape("%3Cscript src='" + _bdhmProtocol + "hm.baidu.com/h.js%3F2eac95e2df0ea5d2b0aaa92e3dbbe419' type='text/javascript'%3E%3C/script%3E"));
</script>
</div>
{tongji}</body>
</html>
