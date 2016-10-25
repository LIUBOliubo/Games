
(function(){

window.onload = function()
{
	game.init();
};
	
var game = 
{
	res: [
	{id:"begin", size:372, src:"images/0begin.png"},
    {id:"end", size:372, src:"images/1end.png"},
    {id:"help", size:372, src:"images/2help.png"},
	{id:"btns", size:77, src:"images/btns.png"},
    {id:"endbtns", size:151, src:"images/endbtns.png"},
    {id:"helpbtns", size:151, src:"images/helpbtns.png"},
    {id:"yxgzbtns", size:151, src:"images/yxgzbtns.png"},
	{id:"monkey", size:186, src:"images/monkey.png"},
	{id:"peach", size:151, src:"images/peach.png"},
	{id:"island", size:372, src:"images/island.png"},
	{id:"num1", size:15, src:"images/num1.png"},
	{id:"num2", size:29, src:"images/num2.png"}
	],
	
	container: null,
	width: 0,
	height: 0,
	params: null,
	frames: 0,
	
	fps: 40,
	timer: null,
	eventTarget: null,
	state: null,
	
	monkey: null,
	peachs: [],
	maxPeachs: 5,
	collidedPeach: null,
	
	time: {total:59, current:59},      //TODO
	score: 0,
	scoreNum: null
};

var STATE = 
{
	MENU: 0,
	MAIN: 1,
	OVER: 2
};

var ns = window.game = game;

game.init = function()
{
	//加载进度信息
	var container = Q.getDOM("container");
	var div = document.createElement("div");
	div.style.position = "absolute";
	div.style.width = container.clientWidth + "px";
	div.style.left = "0px";
	div.style.top = (container.clientHeight >> 1) + "px";
	div.style.textAlign = "center";
	div.style.color = "#fff";
	div.style.font = Q.isMobile ?  'bold 16px 黑体' : 'bold 16px 宋体';
	div.style.textShadow = Q.isAndroid ? "0 2px 2px #111" : "0 2px 2px #ccc";
	container.appendChild(div);
	this.loader = div;
    
    //隐藏浏览器顶部导航
    setTimeout(game.hideNavBar, 10);    
    if(Q.supportOrient)
    {
        window.onorientationchange = function(e)
        {
            game.hideNavBar();
            game.calcStagePosition();
        };
    }

    //加载图片素材
	var loader = new Q.ImageLoader();
	loader.addEventListener("loaded", Q.delegate(this.onLoadLoaded, this));
	loader.addEventListener("complete", Q.delegate(this.onLoadComplete, this));
	loader.load(this.res);
};

//加载进度条
game.onLoadLoaded = function(e)
{
	this.loader.innerHTML = "正在加载资源中，请稍候...<br>";
	this.loader.innerHTML += "(" + Math.round(e.target.getLoadedSize()/e.target.getTotalSize()*100) + "%)";
}

//加载完成
game.onLoadComplete = function(e)
{
	e.target.removeAllEventListeners();
	Q.getDOM("container").removeChild(this.loader);
	this.loader = null;
	
	this.images = e.images;
	//初始化一些类
    //console.log(this.stage);
	ns.Num.init();
	//启动游戏
	this.startup();
}

//获取图片资源
game.getImage = function(id)
{
	return this.images[id].image;
}

//启动游戏
game.startup = function()
{
	//手持设备的特殊webkit设置
	if(Q.isWebKit && Q.supportTouch)
	{
		document.body.style.webkitTouchCallout = "none";
		document.body.style.webkitUserSelect = "none";
		document.body.style.webkitTextSizeAdjust = "none";
		document.body.style.webkitTapHighlightColor = "rgba(0,0,0,0)";
	}
	
	//初始化容器设置
	var colors = ["#00c2eb", "#cbfeff"];
	this.container = Q.getDOM("container");
	this.container.style.overflow = "hidden";
	this.container.style.background = "-moz-linear-gradient(top, "+ colors[0] +", "+ colors[1] +")";
	this.container.style.background = "-webkit-gradient(linear, 0 0, 0 bottom, from("+ colors[0] +"), to("+ colors[1] +"))";
	this.container.style.background = "-o-linear-gradient(top, "+ colors[0] +", "+ colors[1] +")";
	this.container.style.filter = "progid:DXImageTransform.Microsoft.gradient(startColorstr="+ colors[0] +", endColorstr="+ colors[1] +")";
	this.width = this.container.clientWidth;
	this.height = this.container.clientHeight;

    //获取URL参数设置
	this.params = Q.getUrlParams();
  //  this.maxPeachs = this.params.peachs || 20;
  //  this.time = this.params.time ? {total:this.params.time, current:this.params.time} : {total:15, current:15};
  //  this.fps = this.params.fps || 40;
	
	//初始化context
	var context = null;
	if(this.params.canvas)
	{
		var canvas = Q.createDOM("canvas", {id:"canvas", width:this.width, height:this.height, style:{position:"absolute"}});
		this.container.appendChild(canvas);
		this.context = new Q.CanvasContext({canvas:canvas});
	}else
	{
		this.context = new Q.DOMContext({canvas:this.container});
	}
	
	//创建舞台
	this.stage = new Q.Stage({width:this.width, height:this.height, context:this.context, update:Q.delegate(this.update, this)});
    ns.Peach.init(this.stage.height);
	
	//初始化定时器
	var timer = new Q.Timer(1000 / this.fps);
	timer.addListener(this.stage);
	timer.addListener(Q.Tween);
	timer.start();
	this.timer = timer;
		
	//预加载背景音乐
   // var audio = new Quark.Audio("images/a.mp3", true, true, true);
   // this.audio = audio;

	//注册事件
	var me = this;
	var em = new Q.EventManager();
	var events = Q.supportTouch ? ["touchstart", "touchmove", "touchend"] : ["mousedown", "mousemove", "mouseup"];
	em.register(this.context.canvas, events, function(e)
	{
		var ne = (e.touches && e.touches.length > 0) ? e.touches[0] : 
			(e.changedTouches && e.changedTouches.length > 0) ? e.changedTouches[0] : e;
		//确保touchend事件的类型正确
        if(Q.supportTouch) ne.type = e.type;

		var x = ne.pageX - me.stage.stageX, y = ne.pageY - me.stage.stageY;
		var obj = me.stage.getObjectUnderPoint(x, y);
		
		//加载音效
	/*	if(me.audio && !me.audio.loading)
        {
            me.audio.loading = true;
            me.audio.load();
        }
	*/
		if(me.eventTarget != null && me.eventTarget != obj)
		{
			if(me.eventTarget.onEvent != null) me.eventTarget.onEvent({type:"mouseout"});
			me.eventTarget = null;
		}
		if(obj != null)
		{
			me.eventTarget = obj;
			if(obj.useHandCursor) me.context.canvas.style.cursor = "pointer";
			if(obj.onEvent != null) obj.onEvent(ne);
		}
		if(me.state == STATE.MAIN)
		{
            if (ne.type == "touchstart" && obj.id == "monkey"){
                me.monkey.mov = true;
            }
			if(ne.type == "touchmove")
			{
                if (me.monkey.mov){
                    me.monkey.x = ne.pageX - me.monkey.getCurrentWidth()/2;
                }
			}
            if (ne.type == "touchend"){
                me.monkey.mov = false;
                game.audioobj.play();
            }
		}else if(me.state == STATE.OVER && ne.type != "mousemove" && ne.type != "touchmove")
		{
			//me.restart();
		}
	}, true, true);
	
	//按键事件
	em.register(document, ["keydown", "keyup"], function(e)
	{
		var key = e.keyCode;
		if(me.state != STATE.MAIN) return;		
		if(key == Q.KEY.A || key == Q.KEY.LEFT)
		{
			if(e.type == "keydown") me.monkey.move(-1);
			else if(e.type == "keyup") me.monkey.stopMove();
		}else if(key == Q.KEY.D || key == Q.KEY.RIGHT)
		{
			if(e.type == "keydown") me.monkey.move(1);
			else if(e.type == "keyup") me.monkey.stopMove();
		}
	}, false, false);
	
	//显示开始菜单
	this.showMenu();
    var audioobj=$("audio").get(0);
    this.audioobj = audioobj;
    setInterval(function(){game.audioobj.play();}, 3000);
};

//显示开始菜单
game.showMenu = function()
{	
	if(this.begin == null)
	{
		
		//启动画面
		var begin = new Q.Bitmap({id:"begin", image:this.getImage("begin")});
        var sX = this.stage.width/begin.width;
        var sY = this.stage.height/begin.height;
        begin.scaleX = sX;
        begin.scaleY = sY;
        begin.x = 0;
        begin.y = 0;
		this.begin = begin;
		 //TODOBEGIN
		//开始按钮
		var playBtn = new Q.Button({id:"playBtn", image:this.getImage("btns")});
		playBtn.setUpState({rect:[0,286,200,200]});
		playBtn.setOverState({rect:[0,86,200,200]});
        playBtn.scaleX = sX;
        playBtn.scaleY = sY;
		playBtn.regX = playBtn.width >> 1;
		playBtn.regY = playBtn.height >> 1;
		playBtn.x = this.width * 0.5;
		playBtn.y = this.height * 0.7;
		this.playBtn = playBtn;
		playBtn.onEvent = function(e)
		{
			Q.Button.prototype.onEvent.call(this, e);
			if(e.type == "mouseup" || e.type == "touchend")
			{
				game.stage.removeAllChildren();
				game.context.canvas.style.cursor = "";
				if(game.state == STATE.MENU)
				{				
					trace("game start");
					setTimeout(Q.delegate(game.showMain, game), 100);
				}else if(game.state == STATE.OVER)
				{
					trace("game restart");
					game.overlay.parentNode.removeChild(game.overlay);
					game.stage.removeAllChildren();			
					game.score = 0;
					game.time.current = game.time.total;
					game.timer.paused = false;
					setTimeout(Q.delegate(game.showMain, game), 100);
				}
			}else if(e.type == "mouseout")
			{
				game.context.canvas.style.cursor = "";
			}
		}
		
		//帮助提示
        var tip = new Q.Button({id:"yxgzBtn", image:this.getImage("yxgzbtns")});
        tip.setUpState({rect:[0,0,312,41]});
        tip.scaleX = sX*0.7;
        tip.scaleY = sY*0.7;
        tip.x = 200*sX;
        tip.y = 900*sY;
        tip.onEvent = function(e)
        {
            Q.Button.prototype.onEvent.call(this, e);
            if(e.type == "mouseup" || e.type == "touchend")
            {
                game.showHelp();
            }else if(e.type == "mouseout")
            {
                game.context.canvas.style.cursor = "";
            }
        }
		this.tip = tip;
	}
	
	this.state = STATE.MENU;
	this.stage.addChild(this.begin, this.playBtn, this.tip);
}

//游戏主场景
game.showMain = function()
{
	var me = this;
	//设置当前状态
	this.state = STATE.MAIN;
	
	if(this.tip.parentNode) this.tip.parentNode.removeChild(this.tip);
	
	//启动重力感应
	//Q.Orientation.register(function(data){game.acceleration = data;});
	
	if(this.island == null)
	{
		
		//海岛
		var island = new Q.Bitmap({id:"island", image:this.getImage("island")});
        island.scaleX = this.stage.width/island.width;
        island.scaleY = this.stage.height/island.height;
		island.x = 0;
		island.y = 0;
		this.island = island;

		
		//创建猴子
		var monkey = new ns.Monkey({id:"monkey"});
		monkey.scaleX = monkey.scaleY = island.scaleX*0.8;
		this.monkey = monkey;
		
		//创建下落的球组
		this.createPeachs();
	}
	
	//初始化
	this.monkey.x = this.width - this.monkey.getCurrentWidth() >> 1;
	this.monkey.y = this.height - this.monkey.getCurrentHeight() - 5;
	this.monkey.dirX = 0;
	this.monkey.dirY = 0;
	this.monkey.jumping = false;
	this.monkey.avatar.gotoAndPlay("idle");
	
	//添加所有对象到舞台
	this.stage.addChild(this.island);
	for(var i = 0; i < this.peachs.length; i++)
	{
		var peach = this.peachs[i];
		peach.reset(ns.Peach.getRandomType(this.time.current));
		this.stage.addChild(peach);
	}
	this.stage.addChild(this.monkey);
	
	//显示倒计时
	this.showTimer();
	//显示得分
	this.updateScore();
}

//创建小球
game.createPeachs = function()
{
	var minX = 100, maxX = this.width-100, minY = -500, maxY = 0;
	//for(var i = 0; i < 1; i++)
	for(var i = 0; i < this.maxPeachs; i++)
	{
		var peach = new ns.Peach({id:"peach"+i, type:ns.Peach.getRandomType(this.time.current)});
		peach.scaleX = peach.scaleY = this.stage.width*0.8/this.island.width;
		this.peachs.push(peach);
	}
}

//主更新方法
game.update = function(timeInfo)
{
	this.frames++;
	
	if(this.state == STATE.MENU)
	{
	}else if(this.state == STATE.MAIN)
	{
		this.updatePeachs();
		this.updateMonkey();
	}
}

//更新小球
game.updatePeachs = function()
{
	var me = this, peachs = this.peachs, minBottom = 80;
	for(var i = 0; i < peachs.length; i++)
	{
		var peach = me.peachs[i];
		if(peach.delay > 0)
		{
			peach.delay -= 1;
			continue;
		}
		if(peach.currentSpeedY > 0) peach.currentSpeedY += 0.05;
		else if(peach.currentSpeedY < 0) peach.currentSpeedY += 0.15;
		peach.y += peach.currentSpeedY;
		peach.x += peach.currentSpeedX;

		if(peach.y > me.height - minBottom && peach.alpha > 0)
		{
			peach.alpha -= 0.1;
			peach.fading = true;
		}
		if(peach.y > me.height)
		{
			peach.reset(ns.Peach.getRandomType(this.time.current));
		}
	}
}

//更新猴子位置
game.updateMonkey = function()
{
	var acc = this.acceleration, dw = this.monkey.getCurrentWidth(), dh = this.monkey.getCurrentHeight();
	if(acc != null)
	{
		//重力感应移动
		var ax = acc.accelerationX, ay = acc.accelerationY, or = window.orientation;
        var av = (or%180) ? ay : ax;
        var dv = (or%180) ? (ax<0?1:-1) : (ay<0?-1:1);
        
		this.monkey.currentSpeedX = this.monkey.jumping ? 0.5*Math.abs(av) : this.monkey.currentSpeedX + 0.08*Math.abs(av);
		if(av*dv > 0.5)
		{
			this.monkey.x -= this.monkey.currentSpeedX*1;
			if(this.monkey.x < 0) this.monkey.x = 0;
		}else if(av*dv < -0.5)
		{
			this.monkey.x += this.monkey.currentSpeedX*1;
			if(this.monkey.x > this.width - dw) this.monkey.x = this.width - dw;
		}else
		{
			this.monkey.currentSpeedX = this.monkey.speedX;
		}
	}else if(this.monkey.dirX != 0)
	{
		//普通移动
		//this.monkey.currentSpeedX += 0.1;
		this.monkey.x += this.monkey.currentSpeedX * this.monkey.dirX;
		if(this.monkey.x < 0) this.monkey.x = 0;
		else if(this.monkey.x > this.width - dw) this.monkey.x = this.width - dw;
	}
    this.checkCollision()
}

var sortPeachFunc = function(a, b){return a.y < b.y;}

//海豚与球的碰撞检测
game.checkCollision = function()
{
	var me = this, peachs = this.peachs, monkey = this.monkey;
	//根据球的Y轴排序
	peachs.sort(sortPeachFunc);
	
	for(var i = 0; i < peachs.length; i++)
	{
		var peach = peachs[i];
		if(peach.fading) continue;
		var gapH = gapV = 0//peach.getCurrentHeight()*0.5; peach.getCurrentWidth()*0.5,
		var dx = peach.x - monkey.x, dy = monkey.y - peach.y;
		//trace(peach, monkey.y, peach.y, gapV, peach.x, monkey.x, gapH);
		
		if(dx <= monkey.getCurrentWidth()+gapH && dx >= 0 && dy <= gapV && dy >= -gapV-100)
		{
			this.addScore(peach, peach.currentScore);
            peach.y += 1000;
			return true;
		}
	}
	return false;
}

//得分
game.addScore = function(peach, score)
{
	//if(this.addNum == null)
	//{
		var container = new Q.DisplayObjectContainer({id:"addNum", width:100, height:65});
		var plus = new ns.Num({id:"plus", type:ns.Num.Type.num1});
		if (score>=0){
            plus.setValue(11);
        }else{
            plus.setValue(10);
        }
		container.addChild(plus);
		var num = new ns.Num({id:"num", type:ns.Num.Type.num1});
		num.x = plus.x + plus.width - 15;
        num.setValue(Math.abs(score))
		container.addChild(num);
	//	this.addNum = container;
	//}
    container.x = peach.x - 50;
    container.y = peach.y - 100;
    container.scaleX = container.scaleY = this.island.scaleY*2;
    this.stage.addChild(container);
    container.alpha = 1;

	this.score += score;
   // console.log(this.score);
    if (this.score <= 0) {this.score = 0}
    if (this.score >= 59) {this.score = 59}
	this.updateScore();
	
	Q.Tween.to(container, {y:container.y-100, alpha:0}, {time:1000});
}

//更新总得分
game.updateScore = function()
{
	if(this.scoreNum == null)
	{
		var container = new Q.DisplayObjectContainer({id:'score', width:75, height:65});
	//	var num0 = new ns.Num({id:"num0", type:ns.Num.Type.num2});
	//	var num1 = new ns.Num({id:"num1", type:ns.Num.Type.num2});
        var num$ = new ns.Num({id:"num$", type:ns.Num.Type.num2});
		var num2 = new ns.Num({id:"num2", type:ns.Num.Type.num2});
		var num3 = new ns.Num({id:"num3", type:ns.Num.Type.num2});
    //    num$.x = 25;
        num$.setValue(11);
		num2.x = 25;
		num3.x = 50;
		container.addChild(num$, num2, num3);
		container.scaleX = container.scaleY = this.island.scaleY*1.5;
		container.x = this.width - container.getCurrentWidth() - 15 >> 0;
		//container.y = this.stage.height - 50;
        container.y = 15;
		this.scoreNum = container;
	}
    var str = this.score.toString(), len = str.length;
    str = len > 2 ? str.slice(len - 2) : str;
    while(str.length < 2) str = "0" + str;
    this.scoreNum.getChildAt(1).setValue(Number(str[0]));
    this.scoreNum.getChildAt(2).setValue(Number(str[1]));
	this.stage.addChild(this.scoreNum);


    //console.log(this.scoreNum);
}

//显示倒计时
game.showTimer = function()
{	
	if(this.countdown == null)
	{
		//初始化倒计时
		var countdown = new Q.DisplayObjectContainer({id:'countdown', width:250, height:65});
		var num1 = new ns.Num({id:"min1", type:ns.Num.Type.num2});
		var num2 = new ns.Num({id:"min2", type:ns.Num.Type.num2});
		var sep = new ns.Num({id:"sep", type:ns.Num.Type.num2});
		var sec1 = new ns.Num({id:"sec1", type:ns.Num.Type.num2});
		var sec2 = new ns.Num({id:"sec2", type:ns.Num.Type.num2});
		num2.x = 45;
		sep.x = 80;
		sec1.x = 125;
		sec2.x = 170;
		sep.setValue(10);
		countdown.addChild(num1, num2, sep, sec1, sec2);
		countdown.scaleX = countdown.scaleY = this.island.scaleY*1.5;
		countdown.x = 20;
		countdown.y = 15;
		this.countdown = countdown;
	}	
	this.stage.addChild(this.countdown);
	this.time.current = this.time.total;
	this.updateTimer();
	
	//启动倒计时Tween
	Q.Tween.to(this.time, null, {time:1000, loop:true, 
	onComplete:function(tween)
	{
		game.updateTimer();
		if(game.time.current <= -1)
		{
			tween.stop();
			game.gameOver();
		}
	}});
}

//更新倒计时数值
game.updateTimer = function()
{	
	var me = this, time = this.time;
	var min = Math.floor(time.current / 60), sec = time.current % 60;
	me.countdown.getChildAt(0).setValue(min>=10?Math.floor(min/10) : 0);
	me.countdown.getChildAt(1).setValue(min>=10?(min%10) : min);
	me.countdown.getChildAt(3).setValue(sec>=10?Math.floor(sec/10) : 0);
	me.countdown.getChildAt(4).setValue(sec>=10?(sec%10) : sec);
	time.current--;
}

//游戏结束
game.gameOver = function()
{
	trace("game over:", this.score);
	this.timer.pause();
	if(this.context.context == null)
	{
		if(this.overlay == null)
		{
			this.overlay = Q.createDOM("div", {id:"overlay", style:
			{
				position: "absolute",
				width: this.width + "px",
				height: this.height + "px",
				background: "#000",
				opacity: 0.4
			}});
		}
		this.container.lastChild.appendChild(this.overlay);
	}
	
	this.state = STATE.OVER;
	this.playBtn.setState(Q.Button.state.OVER);
    game.showEnd();
	this.stage.step();
	
	//保存分数
	this.saveScore(this.score);
}

//重新开始
game.restart = function()
{
	trace("game restart");
	this.overlay.parentNode.removeChild(this.overlay);
	this.stage.removeAllChildren();
	this.timer.paused = false;
	this.showMenu();
	
	this.score = 0;
	this.time.current = this.time.total;
}

//获取保存的分数
game.getScore = function()
{
	var key = "monkey_score";
	if(Q.supportStorage && localStorage.hasOwnProperty(key))
	{
		var score = Number(localStorage.getItem("monkey_score"));
		return score;
	}
	return 0;
}

//保存分数到localStorage
game.saveScore = function(score)
{
	var key = "monkey_score";
	if(Q.supportStorage)
	{
		localStorage.removeItem(key);
		localStorage.setItem(key, score);
	}
}

//显示结束页面
game.showEnd = function(){
    //TODOEND
    //结束画面
    var end = new Q.Bitmap({id:"end", image:this.getImage("end")});
    var sY = end.scaleY = this.stage.height/end.height;
    var sX = end.scaleX = this.stage.width/end.width;
    end.x = 0;
    end.y = 0;

    var getPriceBtn = new Q.Button({id:"gpBtn", image:this.getImage("endbtns")});
    getPriceBtn.setUpState({rect:[0,0,337,125]});
    getPriceBtn.scaleX = sX;
    getPriceBtn.scaleY = sY;
    getPriceBtn.x = 175*sX;
    getPriceBtn.y = 755*sY;
    getPriceBtn.onEvent = function(e)
    {
        Q.Button.prototype.onEvent.call(this, e);
        if(e.type == "mouseup" || e.type == "touchend")
        {
            //TODO

        }else if(e.type == "mouseout")
        {
            game.context.canvas.style.cursor = "";
        }
    }

    var rePlayBtn = new Q.Button({id:"rpBtn", image:this.getImage("endbtns")});
    rePlayBtn.setUpState({rect:[0,176,337,125]});
    rePlayBtn.scaleX = sX;
    rePlayBtn.scaleY = sY;
    rePlayBtn.x = 175*sX;
    rePlayBtn.y = 585*sY;
    rePlayBtn.onEvent = function(e)
    {
        Q.Button.prototype.onEvent.call(this, e);
        if(e.type == "mouseup" || e.type == "touchend")
        {
            game.restart();
        }else if(e.type == "mouseout")
        {
            game.context.canvas.style.cursor = "";
        }
    }

    var end_num = this.score;
    var end_num_str = end_num.toString(), len = end_num_str.length;
    end_num_str = len > 2 ? end_num_str.slice(len - 2) : end_num_str;
    while(end_num_str.length < 2) end_num_str = "0" + end_num_str;
    var container = new Q.DisplayObjectContainer({id:'end_score', width:75, height:65});
    var end_num$ = new ns.Num({id:"end_num$", type:ns.Num.Type.num2});
    var end_num2 = new ns.Num({id:"end_num2", type:ns.Num.Type.num2});
    var end_num3 = new ns.Num({id:"end_num3", type:ns.Num.Type.num2});
    end_num$.setValue(11);
    end_num2.setValue(Number(end_num_str[0]));
    end_num3.setValue(Number(end_num_str[1]));
    end_num2.x = 25;
    end_num3.x = 50;
    container.addChild(end_num$, end_num2, end_num3);
    container.scaleX = sX*1.3;
    container.scaleY = sY*1.3;
    container.x = 380 * sX;
    container.y = 444 * sY;
    this.endNum = container;

    this.end = end;
    this.getPriceBtn = getPriceBtn;
    this.rePlayBtn = rePlayBtn;
    this.stage.addChild(this.end, this.getPriceBtn, this.rePlayBtn, this.endNum);

}
game.showHelp = function(){
    //TODOHELP
    if(this.tip.parentNode) this.tip.parentNode.removeChild(this.tip);

    var help = new Q.Bitmap({id:"help", image:this.getImage("help")});
    var sY = help.scaleY = this.stage.height/help.height;
    var sX = help.scaleX = this.stage.width/help.width;
    help.x = 0;
    help.y = 0;

    var rePlayBtn = new Q.Button({id:"hpBtn", image:this.getImage("helpbtns")});
    rePlayBtn.setUpState({rect:[0,0,334,121]});
    rePlayBtn.scaleX = sX;
    rePlayBtn.scaleY = sY;
    rePlayBtn.x = 160*sX;
    rePlayBtn.y = 774*sY;
    rePlayBtn.onEvent = function(e)
    {
        Q.Button.prototype.onEvent.call(this, e);
        if(e.type == "mouseup" || e.type == "touchend")
        {
            trace("game restart");
            game.stage.removeAllChildren();
            game.showMenu();
        }else if(e.type == "mouseout")
        {
            game.context.canvas.style.cursor = "";
        }
    }

    this.help = help;
    this.rePlayBtn = rePlayBtn;
    this.stage.addChild(this.help, this.rePlayBtn);
}
//显示当前FPS值
game.showFPS = function()
{
	var me = this, fpsContainer = Quark.getDOM("fps");
	setInterval(function()
	{
		fpsContainer.innerHTML = "FPS:" + me.frames;
		me.frames = 0;
	}, 1000);
}

//隐藏浏览器顶部导航
game.hideNavBar = function()
{
    window.scrollTo(0, 1);
}

//重新计算舞台stage在页面中的偏移
game.calcStagePosition = function()
{
    if(game.stage) 
    {
        var offset = Q.getElementOffset(game.stage.context.canvas);
        game.stage.stageX = offset.left;
        game.stage.stageY = offset.top;
    }
}
	
})();