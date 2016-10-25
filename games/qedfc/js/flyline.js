Main.flyLine = function(angle){
	
	var speedRate = 7;//速度倍率
	var gRate = 100;//重力倍率
	var flyBird;
	var stage = Main.stage;
	var fps = Main.fps;
	
	var startX = 0;
	var startY = 0;
	var sWidth = Main.width;
	var sHeight = Main.height;
	var flySpeed = Main.speed * (Math.random() * 0.2 + 0.8) * speedRate;
	var flyRad;
	
	function initFlyLine() {  
		// code here.  
		//Main.stage.removeChild(Main.penguin);
		Main.penguin.alpha = 0;
		flyRad = angleToRad(angle);
		 var flyData = {
			 images: ["/vapp/57/fly.png"],
			 frames: {width:180, height:170},
			 animations: {fly:[0,2]},
			 framerate: 6
		 };
		 var spriteSheet = new createjs.SpriteSheet(flyData);
		 flyBird = new createjs.Sprite(spriteSheet, "fly");
		 flyBird.regX = 105;
		 flyBird.regY = 105;
		 stage.addChild(flyBird);
		 startFly();
	}
	
	var tParam = 0;
	var g = 9.8 * gRate;

	function clock(){
		tParam += 1/fps;
		moveBird(flySpeed, flyRad);
		// stage.update();
	}
	
	function stageMove(difDistance, totalDistance){
		Main.fire("moveStage", difDistance, totalDistance);
	}
	var offsetX = Main.penguinOffsetX;
	var offsetY = Main.height - Main.floorLine + 32;
	var flyStageDistance = Main.visibleDistance;
	var fadeCnt = 0;
	// var hitOffsetY = 100;//地平线与击打的距离
	var hitOffsetY = Main.floorLine - Main.penguin.y - Main.penguinHeight / 2;
	var tween;
	function moveBird(speed, rad){
		var x = speed * Math.cos(rad) * tParam;
		var y = speed * Math.sin(rad) * tParam - 1/2 * g * square(tParam) + hitOffsetY;//v0*sina-1/2gt2
		var vy = speed * Math.sin(rad) - g * tParam;
		var vx = speed * Math.cos(rad);//x轴上的运动速度			
		var slope = -g / square(speed) / square(Math.cos(rad)) * x + Math.sin(rad) / Math.cos(rad);//抛物线斜率					
		flyBird.rotation = slope * angle;
		
		var dif = vx * 1/fps;
		if(x + startX > flyStageDistance){	
			stageMove(dif, x + startX);//舞台一个时间间隔内移动的距离
		}else{
			flyBird.x =  sWidth - offsetX - (x + startX);	
		}
		//circle.x =  (x + startX);
		//circle.y =  y;
		flyBird.y =  sHeight - offsetY - y;

		if(y <= 0 && slope < 0){		
			//reset				
			tParam = 0;
			startX += x;
			startY = 0;
			flySpeed = speed * 2.2 / 3;
			flyRad = rad * 2.2 / 3;
			fadeCnt ++ ;
			Main.log(fadeCnt);
			stopFly();
			hitOffsetY = 0;
			Main.log(flyBird.rotation)
			if(Math.abs(flyBird.rotation) >= 46 && fadeCnt == 1){
				//角度太大，请它倒立
				turnDown(flyBird.x, flyBird.y, "down");
				stopFly();
				gameOver(x + startX);
				return;
			}
			if(fadeCnt == 3){
				//end game
				stopFly();
				//添加长划痕
				var slideTime = Math.cos(rad) * 800;		
				addLongTrace(x, dif, slideTime);
			}else{
				tween = createjs.Tween.get(flyBird, {loop:false})
				.to({rotation:0}, 50, createjs.Ease.bounceOut)
				.call(function(){
					startFly();
					createjs.Tween.removeTweens(tween);
				});
				//添加痕迹
				addTrace(dif);
			}
		}
	}

	var longTracer;
	function addLongTrace(xPass, dif, timeC){
		longTracer = new createjs.Bitmap(Resource.get("/vapp/57/longtraces.png"));
		stage.addChild(longTracer);
		longTracer.width = 452;
		longTracer.height = 14;
		longTracer.regX = 452;
		longTracer.regY = -17;
		longTracer.x = flyBird.x;
		longTracer.y = flyBird.y;
		createjs.Ticker.addEventListener("tick", longTracerClock);
		function longTracerClock(){
			longTracer.x += dif;
			stageMove(dif, xPass + startX + 452);
		}
		setTimeout(function(){
			turnDown(flyBird.x, flyBird.y, "slide");
			createjs.Ticker.removeEventListener("tick", longTracerClock);	
			
			gameOver(xPass + startX + 452);
			//插入成绩牌
		}, timeC);
		
		//遮罩
			var rect = new createjs.Shape();
            rect.graphics.setStrokeStyle(5, 'round', 'round');
            rect.graphics.beginFill("#FF0000").drawRect(0,0,460, 40);
            rect.graphics.endStroke();
			rect.x = 200;
			rect.y = 790;
			//stage.addChild(rect);
			longTracer.mask = rect;
			
	}
	function addTrace(dif){
		var totalD = 0;
		var tracer = new createjs.Bitmap(Resource.get("/vapp/57/traces.png"));
		stage.addChild(tracer);
		tracer.width = 145;
		tracer.height = 45;
		tracer.regX = 92;
		tracer.regY = -18;
		tracer.x = flyBird.x;
		tracer.y = flyBird.y;
		createjs.Ticker.removeEventListener("tick", tracerClock);
		createjs.Ticker.addEventListener("tick", tracerClock);
		function tracerClock(){
			tracer.x += dif;
			totalD += dif;
			if(totalD > sWidth * 2 / 3){
				Main.log("回收痕迹");
				createjs.Ticker.removeEventListener("tick", tracerClock);
				stage.removeChild(tracer);
			}
		}
	}
	function turnDown(fx, fy, status){
		Main.stage.removeChild(flyBird);
		var spriteSheet = Main.gameOverPenguinSS;
		flyBird = new createjs.Sprite(spriteSheet);
		Main.stage.addChild(flyBird);
		flyBird.gotoAndPlay(status);
		flyBird.x = fx - 120;
		flyBird.y = fy - 112;		 
	}
	
	function gameOver(distance){
		//todo
		
		Main.fire("gameOver", distance, flyBird.x);
		
	}
	Main.on("replay", function(){
		// 垃圾回收
		if(longTracer){
			Main.log("longTracerDisp")
			stage.removeChild(longTracer);
		}
		stage.removeChild(flyBird);
		flyBird = null;
		stopFly();
	});
	
	function stopFly(){
		 createjs.Ticker.removeEventListener("tick", clock);
	}
	function startFly(){
		stopFly();
		clock(); // 顺便修正第一次的位置
		createjs.Ticker.addEventListener("tick", clock);
	}
	
	//角度转弧度
	function angleToRad(angle){
		return Math.PI / 180 * angle;
	}
	//2
	function square(num){
		return num * num
	}		
	// 外部运行
	initFlyLine(angle);
}