
/*
	Dragons
	(C) Mark Wilcox 
	More games at www.spacemonsters.co.uk
*/

var GAMETITLE = "DRAGONS";
var SCOREFONT = "Irish Grover";
var IPHONEHACK = true;

var g = {}; 
var NUM = {};

g.go = 0;
g.bg = [];

var m = { 
	spritesheets : [],
	player : null,
	explosion : [],
	lasers : [],
	monsters : [],
	bomb : [],
	textsprites : [],
	items : [],
	bonuses : []
};

var stars = [];
var gameaudio = []; 

g.checkSum = gamedata.imageFiles.length;// + gamedata.audioFiles.length; 
g.checkCount = 0;
g.imageData = [];
g.audioData = [];
g.aliensarray = [];
g.gameback = [];
g.channels = [];
g.channels[0] = null;
g.channels[1] = null;
g.channels[2] = null;
g.channels[3] = null;
g.channels[4] = null;



g.colours = [];
g.colours[0] = "#bf0000";
g.colours[1] = "#4386d0";
g.colours[2] = "#28d98c";
g.colours[3] = "#3de231";
g.colours[4] = "#d8e231";
g.colours[5] = "#feba4f";
g.colours[6] = "#fe5b4f";
g.colours[7] = "#fe4fd7";
g.colours[8] = "#ca4ffe";


function createSprites()
{
	try
	{
		// Load game media
		for (var a=0;a<imglib.length;a++)
		{
			m.spritesheets[imglib[a].sheetname] = new spritesheet(imglib[a]);
		}
		g.titlescreen	= new Image();	g.titlescreen.src	= g.imageData[0].src; 
		g.gameback[0]	= new Image();	g.gameback[0].src	= g.imageData[1].src; 
		g.gameback[1]	= new Image();	g.gameback[1].src	= g.imageData[2].src; 
		g.gameback[2]	= new Image();	g.gameback[2].src	= g.imageData[3].src; 
		g.splash		= new Image();	g.splash.src		= "library/splash.png";
		g.playpause		= new Image();	g.playpause.src		= "library/playpause.gif";

		for (var a=0;a < 1;a++)
		{
			g.bg[a] = new backgroundimage("bg"+a,"library/background"+a+".gif",320,480,0,0,1,1);
		}
			
	}
	catch (e)
	{
		write("CreateSprites1: " + e.message);
	}
	
	try
	{
		//g.volumecontrol = new Image(); g.volumecontrol.src = "library/volumecontrols.png";

		// STANDARD SPRITES
		m.player = new sprite("player", "player", m.spritesheets["playersheet"], 0, 0, 16, 4, 1);

		// SPRITE POTS
		NUM.BOMBS = 4;
		NUM.ITEMS = 4;
		NUM.BONUSES = 12;
		NUM.MONSTERS = 4;
		NUM.TEXTSPRITES = 12;
		for (var a=0;a<NUM.BOMBS;a++) m.bomb[a] = new sprite("bomb"+a, "bomb", m.spritesheets["bombsheet"], 0, 0, 2, 0, 0);
		for (var a=0;a<NUM.ITEMS;a++) m.items[a] = new sprite("item"+a, "item", m.spritesheets["itemsheet"], 0, 0, 2, 0, 0);
		for (var a=0;a<NUM.BONUSES;a++) m.bonuses[a] = new sprite("bonuses"+a, "bonus", m.spritesheets["bonussheet"], 0, 0, 2, 0, 0);
		for (var a=0;a<NUM.MONSTERS;a++) m.monsters[a] = new sprite("monster"+a, "monster", m.spritesheets["monstersheet"], 0, 0, 2, 0, 0);
		for (var a=0;a<NUM.TEXTSPRITES;a++) m.textsprites[a] = new textsprite("textsprite"+a,-32,-32,"",0.1);
	}
	catch (e)
	{
		write("CreateSprites2: " + e.message);
	}

	try
	{
		// SET UP THE TOUCH SCREEN
		initTouch();

		// SET UP THE GAME START
		initHiScore();
		setSplash();
		// TICKER
		g.ticker = setTimeout("loop()", 0);
	}
	catch (e)
	{
		write("CreateSprites3: " + e.message);
	}
};

function rnd(threshold)
{
	return Math.floor(Math.random()*threshold) + 1;
};

function preCache() {

	for (var a=0;a<gamedata.imageFiles.length;a++)
	{
		g.imageData[a] = new Image();
		g.imageData[a].src = gamedata.imageFiles[a];
		g.imageData[a].onload = check;
	}

};

function check() {
	try
	{
		g.checkCount ++;
		var pc = Math.round((g.checkCount / g.checkSum) * 100);
		var bar = Math.round(g.canvaswidth * (pc / 100));
		g.ctx.clearRect(140,150,32,16);
		g.ctx.fillStyle = "rgb(16,16,16)";
		g.ctx.fillRect(0,200,g.canvaswidth,16);
		g.ctx.fillStyle = "rgb(80,80,80)";
		g.ctx.fillRect(0,200,bar,16);
		if (g.checkCount >= g.checkSum)
		{
			createSprites();
		}
	}
	catch (e)
	{
		write ("Check: " + e.message);
	}
};


function rnd(threshold)
{
	return Math.floor(Math.random()*threshold) + 1;
};

function init()
{
	try
	{
		g.canvas = document.querySelector('canvas');
		g.ctx = g.canvas.getContext('2d');
		g.canvas.setAttribute('class', 'canvas');

		g.banad = document.getElementById("banad");
		g.ori = 0;

		setCanvasDimensions();
		g.canvas.style.backgroundColor = "#000";

		g.nextthink = 0;


		g.console = document.getElementById('console');
		g.console.style.display = 'none';
		g.console.style.textAlign = 'left';
		write("Console ready.");
		BrowserDetect.init();
		write("Browser: " + BrowserDetect.browser + " " + BrowserDetect.version);
		write("OS: " + BrowserDetect.OS);

		var br = new String(BrowserDetect.OS);
		g.framedelay = 30;
		g.ISIPHONE = false;
		if (br.indexOf("iPhone") != -1)
		{
			//if (IPHONEHACK) { g.framedelay = 0; }
			g.ISIPHONE = true;
		}

		g.nextthink = 0;
		g.banad.style.display = "none";
		pickAdURL();

		window.scrollTo(0,0);

		g.level = 1;
		g.pausemode = 0;
		g.audiomode = 1;
		preCache();
	}
	catch (e)
	{
		write(e.message);
	}
};

function setCanvasDimensions(e)
{
	g.canvaspadding = 32;
	g.displaypadding = 0;
	if (typeof(window.orientation)!="undefined")
	{
		g.ori = window.orientation; // 0, -90 or 90
	}

	g.canvaswidth = 320;
	g.canvasheight = 480;

	g.canvas.width = g.canvaswidth;
	g.canvas.height = g.canvasheight;

	window.scrollTo(0,0);
};


function initTouch()
{
	if(checkForTouch()) {
		if (document.body.addEventListener)
		{
			document.body.addEventListener('touchmove', touchMove, false);
			document.body.addEventListener('touchstart', touchStart, false);
			document.body.addEventListener('touchend', touchEnd, false);
		} else {
			window.addEventListener('touchmove', touchMove, false);
			window.addEventListener('touchstart', touchStart, false);
			window.addEventListener('touchend', touchEnd, false);
		}
	} else {
		window.addEventListener('mousemove', mouseMove, false);
		window.addEventListener('mouseup', mouseUp, false);
		write("No touch capability.");
	}
};

function initHiScore()
{
	if (typeof localStorage.key == "function")
	{
		if (localStorage.getItem(GAMETITLE + "-hiscore") != null)
		{
			m.player.hiscore = localStorage.getItem(GAMETITLE + "-hiscore");
		} else {
			m.player.hiscore = 0;
		}
	}
};

function sfx(o)
{
};

function handleAudio()
{
};

function checkForTouch() {		
	var d = document.createElement("div");
	d.setAttribute("ontouchmove", "return;");
	return typeof d.ontouchmove == "function" ? true : false;
};

function touch(event) {
	var o = m.player;
	var tx = (event.pageX - (g.canvas.offsetParent ? g.canvas.parentNode.offsetLeft : 0)) - (o.w / 2);
	var ty = (event.pageY - (g.canvas.offsetParent ? g.canvas.parentNode.offsetTop : 0)) - (o.h / 2);

	//if (tx < 128 && tx > 64 && ty < 64) g.audiomode ++; if (g.audiomode > 1) g.audiomode = 0;

	if (g.mode == "game")
	{
		if (!o.dying)
		{
			o.targetx = tx - (o.w/2);
			if (o.targetx > (g.canvaswidth - o.w)) o.targetx = g.canvaswidth - o.w;
			if (o.targetx < 0) o.targetx = 0;
		}
	}
};

function touchStart(event) { // exclusively the pause function
	var tx = (event.touches[0].pageX - g.canvas.offsetLeft);
	var ty = (event.touches[0].pageY - g.canvas.offsetTop);	
	if (g.mode == "title")
	{
		//if (ty > 320 && ty < 400)
		//{
		//	document.location.href = "http://m.spacemonsters.co.uk";
		//}  else {
			setGame();
		//}
	} else if (g.mode == "game" || g.mode == "pregame")
	{
		if (tx < 80 && ty < 80) 
		{
			g.pausemode ++; 
			if (g.pausemode > 1) { g.pausemode = 0; }
		}
	}
};

function touchMove(event) {
	touch(event.touches[0]);
	window.scrollTo(0, 1);
	event.preventDefault();
};

function touchEnd(event) {
	//touch(event.touches[0]);
};

function mouseMove(event) {
	if (g.mode != "title") touch(event);
};

function mouseUp(event) {
	if (g.mode == "title")
	{
		//if (event.pageY > 320 && event.pageY < 400)
		//{
		//	document.location.href = "http://m.spacemonsters.co.uk";
		//} else {
			setGame();
		//}
		
	} else {
		touch(event);
	}
};

function setSplash()
{
	g.mode = "splash";
	g.resetting = 100;
	g.banad.style.display = "none";
};

function setTitle()
{
	g.mode = "title";
	g.canvas.style.backgroundImage = "none";
	g.canvas.style.backgroundColor = "#000000";
	g.stage = 0; 
	g.banad.style.display = "block";
};

function setGame()
{
	g.banad.style.display = "none";
	g.mode = "pregame";
	g.resetting = 200;
	m.player.score = 0;
	m.player.targetscore = 0;
	m.player.lives = 3;
	g.level = 1;
	g.displaylevel = 1;
	g.resetting = 120;
	g.bonuspoints = 0;
	g.alienbombcooldown = 0;
	g.wavetype = 1;
	g.bonuslife1 = false; // 100,000
	g.bonuslife2 = false; // 200,000
	g.monstercooldown = 0;
	setLevel(); 
};

function setLevel()
{
	g.canvas.style.backgroundImage = "url(" + g.gameback[rnd(g.gameback.length)-1].src + ")";
	g.canvas.style.backgroundRepeat = "norepeat";
	wipe();
	m.player.dying = false;
	m.player.visible = true;
	g.fireballcooldown = 20;
	g.monsterstartx = 48;
	g.leveltreasure = 50;
	g.shotsfired = 0;
	g.hitratio = 0;
	g.levelmonsters = 0;
	playerStart();
};

function setLandscape()
{
	g.oldmode = g.mode;
	g.mode = "landscape";
};

function playerStart()
{
	m.player.x = 32; 
	m.player.y = 146;
	m.player.targetx = g.canvaswidth / 2 - 16;
	m.player.targety = 146;
	m.player.speed = 1;
	m.player.basey = g.canvasheight - 128;
	m.player.nextthink = 10;
	m.player.nextthinkmax = m.player.nextthink;
	m.player.direction = 0;
	m.player.row = 0;
	m.player.treasure = 0;
};

function wipe()
{
	for (var a=0;a<m.bomb.length;a++) kill(m.bomb[a]);
	for (var a=0;a<m.monsters.length;a++) kill(m.monsters[a]);
	for (var a=0;a<m.items.length;a++) kill(m.items[a]);
	for (var a=0;a<m.textsprites.length;a++) kill(m.textsprites[a]); 
	for (var a=0;a<m.bonuses.length;a++) kill(m.bonuses[a]); 
};

function kill(o)
{
	o.visible = false;
};

function playerDeath()
{
	m.player.dying = false;
	kill(m.player);
	m.player.lives --;
	playerStart();
	m.player.speed = 1;
};

function drawPlayer(o)
{
	if (!o.visible) return;
	try
	{
		if (isNaN(o.attacking)) o.attacking = 0;
		o.row = 0;
		
		g.ctx.save();
		if (o.attacking > 0 && !o.dying)
		{
			o.attacking --;
			o.row = 1;
		} else {

			var fpd = o.spritesheet.framesperdirection;
			o.startframe = 0;
			if (g.mode == "game")
			{
				o.startframe = 6;
				fpd = 2;
				if (!o.dying) { o.speed = 4; }
			} else if (g.mode == "pregame")
			{
				o.startframe = 0;
				fpd = 3;
				o.speed = 1;
			}
			if (o.dying) 
			{
				o.startframe = 9;
				fpd = 2;
			}

			if (isNaN(o.frame)) o.frame = o.startframe;
			o.framedelay --;
			if (o.framedelay < 0)
			{
				o.framedelay = o.framedelaymax;
				o.frame ++;
				if (o.frame >= (o.startframe + fpd))
				{
					o.frame = o.startframe;
				}
			}
			if (o.inpain) { o.frame = o.spritesheet.painframe; o.inpain = false; }
		}
		g.ctx.drawImage(o.spritesheet.canvas, o.frame * o.spritesheet.framewidth, o.row * o.spritesheet.frameheight, o.w, o.h, o.x, o.y, o.w, o.h);
		g.ctx.restore();

	}
	catch (e)
	{
		write("DrawPlayer: " + o.frame + " - " + e.message);
	}

};


function draw(o)
{
	if (!o.visible) return;
	try
	{
		if (isNaN(o.attacking)) o.attacking = 0;
		if (o.attacking > 0)
		{
			o.attacking --;
			o.frame = o.spritesheet.attackframe;
		} else {
			if (o.jumping)
			{
				o.frame = o.xmod < 0 ? 4 : 3;
				if (o.spritesheet.type == "monster") moveMonster(o);
			} else {
				if (isNaN(o.frame)) o.frame = o.startframe;
				o.framedelay --;
				if (o.framedelay < 0)
				{
					o.framedelay = o.framedelaymax;
					o.frame ++;
					if (o.spritesheet.type == "monster" && !o.falling) moveMonster(o);
				}
				if (o.frame >= (o.startframe + o.framesperdirection))
				{
					if (o.spritesheet.type == "explosion")
					{
						kill(o);
					} else {
						o.frame = o.startframe;
					}
				}
				if (o.inpain) { o.frame = o.spritesheet.painframe; o.inpain = false; }
			}
			
		} 
		g.ctx.save();
		if (o.spritesheet.type == "bomb")
		{
			o.size += 2;
			var x = o.x + ((o.spritesheet.framewidth / 2) - (o.size / 2));

			if (o.size > o.spritesheet.framewidth) o.size = o.spritesheet.framewidth;
			g.ctx.drawImage(o.spritesheet.canvas, o.frame * o.spritesheet.framewidth, o.row * o.spritesheet.frameheight, o.w, o.h, x, o.y, o.size, o.size);
		} else if (o.spritesheet.type == "item")
		{
			o.angle = 0;
			if (o.speed < 2) o.angle = o.xmod > 0 ? 45 : -45;
			if (o.speed < 0) o.angle = o.xmod > 0 ? 90 : -90;
			if (o.speed < -2) o.angle = o.xmod > 0 ? 135 : -135;
			if (o.speed < -4) o.angle = o.xmod > 0 ? 180 : -180;
			g.ctx.translate(o.x + (o.w/2),o.y + (o.h/2));
			g.ctx.rotate(o.angle * (Math.PI / 180));
			g.ctx.drawImage(o.spritesheet.canvas, o.frame * o.spritesheet.framewidth, o.row * o.spritesheet.frameheight, o.w, o.h, -o.w/2, -o.h/2, o.w, o.h);
		} else if (o.spritesheet.type == "bonus")
		{
			o.decay --;
			if (o.decay < 0) kill(o);
			var d = true;
			if (o.decay < 50 && (o.decay%2 > 0)) d = false;
			if (d)
			{	
				g.ctx.drawImage(o.spritesheet.canvas, o.frame * o.spritesheet.framewidth, o.row * o.spritesheet.frameheight, o.w, o.h, o.x, o.y, o.w, o.h);
			}
		} else {
			g.ctx.drawImage(o.spritesheet.canvas, o.frame * o.spritesheet.framewidth, o.row * o.spritesheet.frameheight, o.w, o.h, o.x, o.y, o.w, o.h);
		}
		g.ctx.restore();
	}
	catch (e)
	{
		write("Draw: Angle = " + o.x);
	}

};

function moveToTarget(o)
{
	if (!o.visible || o.dead || o.dying || g.pausemode > 0) return;

	o.oldx = o.x;
	o.oldy = o.y;

	if (o.targetx < 0 && o.targety < 0)
	{
		switch (o.direction)
		{
		case 0:
			o.y -= o.speed;
			break;			
		case 1:
			o.y -= (o.speed / 1.5);
			o.x += (o.speed / 1.5);
			break;			
		case 2:
			o.x += o.speed;
			break;			
		case 3:
			o.y += (o.speed / 1.5);
			o.x += (o.speed / 1.5);
			break;			
		case 4:
			o.y += o.speed;
			break;			
		case 5:
			o.y += (o.speed / 1.5);
			o.x -= (o.speed / 1.5);
			break;			
		case 6:
			o.x -= o.speed;
			break;			
		case 7:
			o.y -= (o.speed / 1.5);
			o.x -= (o.speed / 1.5);
			break;			
		}
	} else {
		// Target co-ords set by screen touch.
		if (o.targetx > o.x) { o.x += o.speed; }
		if (o.targetx < o.x) { o.x -= o.speed; }
		if (o.targety < o.y) { o.y -= o.speed; }
		if (o.targety > o.y) { o.y += o.speed; }
	}
	if (o.dying < 1)
	{
		if (o.x < g.canvaspadding) o.x = g.canvaspadding;
		if ((o.x + o.w) > (g.canvaswidth - g.canvaspadding)) o.x = g.canvaswidth - g.canvaspadding - o.w;
		if (o.y < g.canvaspadding) o.y = g.canvaspadding;
		if ((o.y + o.h) > (g.canvasheight - g.canvaspadding)) o.y = g.canvasheight - g.canvaspadding - o.h;
	}
};

function movePlayer(o)
{
	if (!o.visible || o.dead || g.pausemode > 0) return;

	if (!o.dying)
	{
		if (o.targetx > o.x) { o.x += o.speed; }
		if (o.targetx < o.x) { o.x -= o.speed; }
	}

	if (g.mode == "game")
	{
		if (o.dying)
		{
			o.y -= o.speed;
			o.speed -= 1;
		} else {
			o.nextthink --;
			if (o.nextthink < 1) 
			{
				o.nextthink = o.nextthinkmax;
				if (o.direction == 0)
				{
					o.direction = 4;
				} else {
					o.direction = 0;
				}
			}
			if (o.direction == 4)
			{
				o.y += 1;
			} else {
				o.y -= 1;
			}
		}
	}	

	if (!o.dying && !g.mode == "game")
	{
		if (o.x < g.canvaspadding) o.x = 8;
		if ((o.x + o.w) > (g.canvaswidth - 8)) o.x = g.canvaswidth - 8 - o.w;
	} else {
		if (o.y > g.canvasheight)
		{
			playerDeath();
			if (m.player.lives < 1)
			{
				g.banad.style.display = "block";
				g.mode = "gameover";
				g.resetting = 200;
			} else {
				m.player.visible = true;
				m.player.dying = false;
				g.mode = "pregame";
				g.resetting = 100;
			}
		}
	}

};

function move(o)
{
	if (!o.visible || g.pausemode > 0) return;

	var bomb = o.spritesheet.type == "bomb" ? true : false;
	var item = o.spritesheet.type == "item" ? true : false;
	var bonus = o.spritesheet.type == "bonus" ? true : false;

	if (item)
	{
		if (o.row < 3)
		{
			o.speed -= 0.2;
			o.x += o.xmod;
		} 
	} 

	switch (o.direction)
	{
		case 0:
			o.y -= o.speed;
			break;			
		case 1:
			o.y -= (o.speed / 1.5);
			o.x += (o.speed / 1.5);
			break;			
		case 2:
			o.x += o.speed;
			break;			
		case 3:
			o.y += (o.speed / 1.5);
			o.x += (o.speed / 1.5);
			break;			
		case 4:
			o.y += o.speed;
			break;			
		case 5:
			o.y += (o.speed / 1.5);
			o.x -= (o.speed / 1.5);
			break;			
		case 6:
			o.x -= o.speed;
			break;			
		case 7:
			o.y -= (o.speed / 1.5);
			o.x -= (o.speed / 1.5);
			break;			
	}
	if (bomb)
	{
		if (o.y > (g.canvasheight))
		{
			kill(o);
		}
	} else if (item)
	{
		if (o.row < 3)
		{
			if (o.y > (g.canvasheight))
			{
				kill(o);
			}
		} else {
			if ((o.y + o.h) < 0)
			{
				kill(o);
			}
		}
	}
};

function moveBonus(o)
{
	if (!o.visible || g.pausemode > 0) return;

	if (o.collected)
	{
		o.y -= o.speed;
		o.x -= o.xmod;
		if (o.y < 32 && o.x < 32)
		{
			kill(o);
			m.player.targetscore += 200;
		}
	} else {
		if (!o.taken && o.y != 162)
		{
			o.y += o.speed;
			o.speed += 1;
		}
		if (o.y > 162 && !o.taken && !o.bounced)
		{
			o.speed = -8;
			o.bounced = true;
		} else if (o.y > 162)
		{
			o.y = 162;
		}
	}
};

function moveMonster(o)
{
	if (!o.visible || g.pausemode > 0) return;

	if (o.jumping)
	{
		o.speed += 1;
		o.y += o.speed;
		o.x += o.xmod;
	} else {
		o.nextthink --;
		if (o.nextthink < 1)
		{
			o.nextthink = o.basenextthink;
		}
		switch (o.direction)
		{
		case 0:
			o.y -= o.speed;
			break;			
		case 1:
			o.y -= (o.speed / 1.5);
			o.x += (o.speed / 1.5);
			break;			
		case 2:
			o.x += o.speed;
			break;			
		case 3:
			o.y += (o.speed / 1.5);
			o.x += (o.speed / 1.5);
			break;			
		case 4:
			o.y += o.speed;
			break;			
		case 5:
			o.y += (o.speed / 1.5);
			o.x -= (o.speed / 1.5);
			break;			
		case 6:
			o.x -= o.speed;
			break;			
		case 7:
			o.y -= (o.speed / 1.5);
			o.x -= (o.speed / 1.5);
			break;			
		}
	}

	if (o.y > g.canvasheight) kill(o);
	if (o.y < 178 && !o.jumping) 
	{
		o.jumping = true;
		o.speed = -8;
		o.xmod = o.x < (g.canvaswidth / 2) ? 1 : -1;
		m.player.treasure -= rnd(g.level);
		if (m.player.treasure < 0) m.player.treasure = 0;
	}
};


function changeDirection(o)
{
	switch (o.direction)
	{
	case 0:
		o.direction = 4;
	break;
	case 1:
		o.direction = 5;
	break;
	case 2:
		o.direction = 6;
	break;
	case 3:
		o.direction = 7;
	break;
	case 4:
		o.direction = 0;
	break;
	case 5:
		o.direction = 1;
	break;
	case 6:
		o.direction = 2;
	break;
	case 7:
		o.direction = 3;
	break;
	}
};


function itemCollision(o,m) 
{
	if (!o.visible || m.dead || m.dying > 0 || o.dying > 0 || g.pausemode > 0) return;

	var ox = o.x;
	var oy = o.y;
	var ow = o.w; 
	var oh = o.h; 

	var mx = m.x;
	var my = m.y;
	var mw = m.w;
	var mh = m.h;

	var c1 = false, c2 = false, c3 = false, c4 = false;
	
	if (ox <= (mx+mw)  &&  oy <= (my+mh)  &&  ox >= (mx)  && oy >= my) c1 = true;
	if ((ox+ow) >= mx  &&  oy >= my  &&  (ox+ow) <= (mx+mw)  &&  oy <= (my+mh)) c2 = true;
	if (ox <= (mx+mw)  &&  (oy+oh) >= my  &&  ox >= mx  &&  (oy+oh) <= (my+mh)) c3 = true;
	if (((ox + ow) >= mx) && ((ox + ow) <= (mx + mw)) && ((oy + oh) >= my) && ((oy + oh) <= (my + mh))) c4 = true; 

	if (c1 == true || c2 == true || c3 == true || c4 == true)
	{
		if (o.row == 0)
		{
			var x = o.x - 16;
			for (var a=0;a<4;a++)
			{
				spawnBonusReward(x + (a*16),-16);
				m.targetscore += 250;
			}
		} else {
			playerDying();
		}
		kill(o);
	}
};

function bonusCollision(o,m) 
{
	try
	{
		if (!o.visible || m.dead || m.dying > 0 || o.dying > 0 || g.pausemode > 0) return;

		var ox = o.x;
		var oy = o.y;
		var ow = o.w; 
		var oh = o.h; 

		var mx = m.x;
		var my = m.y;
		var mw = m.w;
		var mh = m.h;

		var c1 = false, c2 = false, c3 = false, c4 = false;
		
		if (ox <= (mx+mw)  &&  oy <= (my+mh)  &&  ox >= (mx)  && oy >= my) c1 = true;
		if ((ox+ow) >= mx  &&  oy >= my  &&  (ox+ow) <= (mx+mw)  &&  oy <= (my+mh)) c2 = true;
		if (ox <= (mx+mw)  &&  (oy+oh) >= my  &&  ox >= mx  &&  (oy+oh) <= (my+mh)) c3 = true;
		if (((ox + ow) >= mx) && ((ox + ow) <= (mx + mw)) && ((oy + oh) >= my) && ((oy + oh) <= (my + mh))) c4 = true; 

		if (c1 == true || c2 == true || c3 == true || c4 == true)
		{
			o.collected = true;
			o.speed = 16;
			calculateMods(o, 16, 16); // the location of the treasure icon
			var bonus = (o.row + 1) * 50;
			spawnTextSprite(o,bonus); 
			m.targetscore += bonus;
			m.treasure ++;
			checkEndOfLevel();
		}
	}
	catch (e)
	{
		write("BonusColl: " + e.message);
	}
};

function checkEndOfLevel()
{
	if (m.player.treasure >= g.leveltreasure)
	{
		endLevel();
	}
};

function calculateMods(o,tx,ty)  
{
	try
	{
		var steps = (o.y - ty) / o.speed;
		o.xmod = (o.x - tx) / steps;
	}
	catch (e)
	{
		write("Calcmods: " + e.message);
	}
};


function playerDying()
{
	wipe();
	m.player.dying = true;
	g.resetting = 100;
	m.player.y = 146;
	m.player.speed = 16;
};

function monsterFireballCollision(o) 
{
	if (!o.visible || g.pausemode > 0 || o.falling) return;

	var ox = o.x;
	var oy = o.y;
	var ow = o.w; 
	var oh = o.h; 

	for (var z=0;z<NUM.MONSTERS;z++)
	{
		var a = m.monsters[z];
		if (a.visible)
		{
			var mx = a.x;
			var my = a.y;
			var mw = a.w;
			var mh = a.h;

			var c1 = false, c2 = false, c3 = false, c4 = false;
			
			if (ox <= (mx+mw)  &&  oy <= (my+mh)  &&  ox >= (mx)  && oy >= my) c1 = true;
			if ((ox+ow) >= mx  &&  oy >= my  &&  (ox+ow) <= (mx+mw)  &&  oy <= (my+mh)) c2 = true;
			if (ox <= (mx+mw)  &&  (oy+oh) >= my  &&  ox >= mx  &&  (oy+oh) <= (my+mh)) c3 = true;
			if (((ox + ow) >= mx) && ((ox + ow) <= (mx + mw)) && ((oy + oh) >= my) && ((oy + oh) <= (my + mh))) c4 = true; 

			if (c1 == true || c2 == true || c3 == true || c4 == true)
			{
				if (a.jumping) 
				{ 
					spawnBonusXY(a.x,a.y); 
					spawnTextSprite(a,"X5 BONUS !"); 
					m.player.targetscore += 500;
					m.player.score = m.player.targetscore;
				}
				a.falling = true;
				a.jumping = false;
				a.frame = 2;
				a.startframe = 2;
				a.framesperdirection = 1;
				a.direction = 4;
				a.speed = 6;
				a.framedelay = 4;
				a.framedelaymax = 4;
				//}
				spawnTextSprite(o, "100");
				m.player.targetscore += 100;
				kill(o);
				m.player.treasure ++;
				checkEndOfLevel();
			}
		}
	}
};

function endLevel()
{
	g.hitratio = Math.round((g.levelmonsters/g.shotsfired)*100);
	m.player.targetscore += g.hitratio * 100;
	m.player.score = m.player.targetscore;
	g.mode = "levelup";
	g.resetting = 90;
	wipe();
	g.level ++;
};

function alienBonus(a)
{
	var bonus = 0;
	bonus = Math.round(a.y * 10);
	if (bonus > 3000)
	{
		spawnTextSpriteXY(a.x,a.y-24,"X5 BONUS!");
		bonus = bonus * 5;
	} else if (bonus > 2500)
	{
		spawnTextSpriteXY(a.x,a.y-24,"X2 BONUS!");
		bonus = bonus * 2;
	}
	spawnTextSprite(a,bonus);
	m.player.score += bonus;
	m.player.targetscore = m.player.score;
	m.player.targetscore += 10;
};

function monsterBombCollision(o,m) 
{
	if (!o.visible || !m.visible || m.dead || m.dying > 0 || o.dying > 0 || g.pausemode > 0) return;

	var ox = o.x;
	var oy = o.y;
	var ow = o.w; 
	var oh = o.h; 

	var mx = m.x;
	var my = m.y;
	var mw = m.w;
	var mh = m.h;

	var t = 8; // attempt to set a threshold a la manic shooter tiny boxes.

	var c1 = false, c2 = false, c3 = false, c4 = false;
	
	if (ox <= (mx+(mw-t))  &&  oy <= (my+(mh-t))  &&  ox >= (mx+t)  && oy >= (my+t)) c1 = true;
	if ((ox+ow) >= (mx+t)  &&  oy >= (my+t)  &&  (ox+ow) <= (mx+(mw-t))  &&  oy <= (my+(mh-t))) c2 = true;
	if (ox <= (mx+(mw-t))  &&  (oy+oh) >= (my+t)  &&  ox >= (mx+t)  &&  (oy+oh) <= (my+(mh-t))) c3 = true;
	if (((ox + ow) >= (mx+t)) && ((ox + ow) <= (mx + (mw-t))) && ((oy + oh) >= (my+t)) && ((oy + oh) <= (my + (mh-t)))) c4 = true; 

	if (c1 == true || c2 == true || c3 == true || c4 == true)
	{
		kill(o);
	}
};

function itemPlayerCollision(o,m) // redundant just now
{
	if (!o.visible || !m.visible || m.dead || m.dying > 0 || o.dying > 0 || g.pausemode > 0) return;

	var ox = o.x;
	var oy = o.y;
	var ow = o.w; 
	var oh = o.h; 

	var mx = m.x;
	var my = m.y;
	var mw = m.w;
	var mh = m.h;

	var t = 8; // attempt to set a threshold a la manic shooter tiny boxes.

	var c1 = false, c2 = false, c3 = false, c4 = false;
	
	if (ox <= (mx+(mw-t))  &&  oy <= (my+(mh-t))  &&  ox >= (mx+t)  && oy >= (my+t)) c1 = true;
	if ((ox+ow) >= (mx+t)  &&  oy >= (my+t)  &&  (ox+ow) <= (mx+(mw-t))  &&  oy <= (my+(mh-t))) c2 = true;
	if (ox <= (mx+(mw-t))  &&  (oy+oh) >= (my+t)  &&  ox >= (mx+t)  &&  (oy+oh) <= (my+(mh-t))) c3 = true;
	if (((ox + ow) >= (mx+t)) && ((ox + ow) <= (mx + (mw-t))) && ((oy + oh) >= (my+t)) && ((oy + oh) <= (my + (mh-t)))) c4 = true; 

	if (c1 == true || c2 == true || c3 == true || c4 == true)
	{
		kill(o);
	}
};

function writeText(t,x,y,s,f)
{
	var sx = x;
	var grid = {};
	grid.w = 10;
	grid.h = 16;
	var text = new String(t);	
	//text = text.toUpperCase();
	g.ctx.save();
	var ss = "";
	g.ctx.font = "normal "+s+"px '"+f+"', Sans-Serif";
	g.ctx.textAlign = "left";
	g.ctx.fillStyle = "#ffffff";
	if (y > 300) // bonus !
	{
		g.ctx.fillStyle = g.colours[rnd(g.colours.length-1)];
	}
	g.ctx.fillText(text, x,y+8);
	g.ctx.restore();
};

function drawTextSprite(o)
{
	return;
	if (!o.visible) return;
	var text = new String(o.text);	
	g.ctx.save();
	g.ctx.font = "bold 16px Arial, Sans-Serif";
	g.ctx.textAlign = "left";
	g.ctx.shadowOffsetX = 1;
	g.ctx.shadowOffsetY = 1;
	g.ctx.shadowBlur = 1;
	g.ctx.shadowColor = "rgba(0,0,0, 1)";
	g.ctx.fillStyle = o.colour;
	g.ctx.fillText(text, o.x,o.y+8);
	g.ctx.restore();
};

function moveTextSprite(o)
{
	if (!o.visible) return;
	o.y -= o.speed;
	o.ticks --;
	if (o.ticks < 0) kill(o);
};

function moveBackground()
{
	try
	{
		var bg = g.bg[0];
		g.ctx.drawImage(bg.img,bg.x,bg.y);
		g.ctx.drawImage(bg.img,bg.x,bg.y + bg.h);
		bg.y -= bg.speed;
		if ((bg.y + bg.h) < 0) bg.y = g.canvasheight * (bg.screens - 1);
		
	}
	catch (e)
	{
		write("MoveBG: " + bg.img.src);
	}
};



/** ---------------------------------------------------------------- **/
/** ---------------------------------------------------------------- **/

function loop()
{
	try
	{
		clearTimeout(g.ticker);
		g.ctx.clearRect(0, 0, g.canvaswidth, g.canvasheight);

		switch (g.mode)
		{
			case "splash":
				g.ctx.drawImage(g.splash,0,0);
				g.resetting --;
				if (g.resetting < 1) 
				{ 
					setTitle();
				}
			break;
			case "title":
				g.ctx.drawImage(g.titlescreen,(g.canvaswidth/2)-160,0);
				hiScore();
				writeText(textdata[1],64,216,22,SCOREFONT);
			break;
			case "pregame":
				drawPlayer(m.player);
				movePlayer(m.player);
				g.resetting --;
				m.player.treasure --;
				if (m.player.treasure < 0) m.player.treasure = 0;
				if (g.resetting < 1) 
				{ 
					g.mode = "game";
					m.player.frame = 6;
				}
				writeText(textdata[0],84,230,32,SCOREFONT);
				updateScore();
				playerLives();
				goldBar();
			break;
			case "game":
				if (g.nextthink > 0) g.nextthink --;

				g.fireballcooldown --;
				if (g.fireballcooldown < 0 && !m.player.dying)
				{
					m.player.attacking = 2;
					spawnFireball(m.player);
					g.fireballcooldown = 15;
				}

				g.monstercooldown --;
				if (g.monstercooldown < 1)
				{
					spawnMonster();
					g.monstercooldown = 30;
				}

				for (var a=0;a < NUM.MONSTERS;a++)
				{
					if (m.monsters[a].falling) { moveMonster(m.monsters[a]); }
					draw(m.monsters[a]);
				}

				drawPlayer(m.player);
				movePlayer(m.player);

 				for (var a=0;a < NUM.ITEMS;a++)
				{
					move(m.items[a]);
					draw(m.items[a]);
					itemCollision(m.items[a],m.player); 
				}

 				for (var a=0;a < NUM.BONUSES;a++)
				{
					moveBonus(m.bonuses[a]);
					draw(m.bonuses[a]);
					bonusCollision(m.bonuses[a],m.player); 
				}

				for (var a=0;a < NUM.BOMBS;a++)
				{
					move(m.bomb[a]);
					draw(m.bomb[a]);
					monsterFireballCollision(m.bomb[a]); 
				}

				for (var a=0;a<NUM.TEXTSPRITES;a++) 
				{
					moveTextSprite(m.textsprites[a]);
					drawTextSprite(m.textsprites[a]);
				}

				spawnItem();
				spawnBonus();
				updateScore();
				playerLives();
				goldBar();
			break;

			case "landscape":
			break;
			case "levelup":
				g.resetting --;
				m.player.treasure --;
				if (m.player.treasure < 0) m.player.treasure = 0;
				if (g.resetting < 1)
				{
					setLevel();
					playerStart();
					g.mode = "game";
				}
				writeText("STAGE COMPLETE",24,240,20,SCOREFONT);
				writeText("Flames used "+g.shotsfired,24,265,16,"Arial, Sans-Serif");
				writeText("Torched ratio "+g.hitratio+"%",24,285,16,"Arial, Sans-Serif");
				writeText("Bonus "+(g.hitratio*100),24,305,16,"Arial, Sans-Serif");
				updateScore();
				playerLives();
				for (var a=0;a < NUM.TEXTSPRITES;a++)
				{
					moveTextSprite(m.textsprites[a]);
					drawTextSprite(m.textsprites[a]);
				}
				goldBar();
			break;
			case "gameover":
				writeText(textdata[3],72,230,32,SCOREFONT);
				g.resetting --;
				if (g.resetting < 1)
				{
					setTitle();
				}
				updateScore();
			break;
		}
		if (g.mode == "game" || g.mode == "pregame") { g.ctx.drawImage(g.playpause, g.pausemode * 32, 0, 32, 32, 8, 8, 32, 32); }

		if (g.ori != 0) { 
			g.ctx.fillStyle = "rgba(0,0,0,0.5)";
			g.ctx.fillRect(0,184,g.canvaswidth,40);
			writeText(textdata[2],24,200,16,"Orbitron"); 
			g.pausemode = 1;
		}
		if (isNaN(g.framedelay)) g.framedelay = 30;
		
		g.ticker = setTimeout("loop()", g.framedelay);
	}
	catch (e)
	{
		write("Loop: " + e.message);
	}
};

function playerLives()
{
	var o = m.player;
	for (var a=0;a<(m.player.lives-1);a++)
	{
		g.ctx.drawImage(o.spritesheet.canvas, 0, 0, o.w, o.h, (g.canvaswidth-90)+(a * 18), 16, 16, 16);
	}
};

function goldBar()
{
	var pc = Math.round((m.player.treasure / g.leveltreasure) * 100);
	var bar = Math.round((g.canvaswidth - 60) * (pc / 100));
	g.ctx.fillStyle = "rgba(255,236,172,0.3)";
	g.ctx.fillRect(48,40,(g.canvaswidth - 60),24);
	g.ctx.fillStyle = "rgb(255,255,0)";
	g.ctx.fillRect(48,40,bar,24);
};

function testFPS()
{
	try
	{
		// FPS
		if (isNaN(g.fps)) g.fps = 0;
		if (g.fps) 
		{
			var d = new Date();
			var c = Math.round(1000 / (d - g.fps));
		}
		var s = new String(c);
		g.fps = new Date();
		//if (c) writeString(s,220,g.canvasheight - 128);
		if (isNaN(g.testy)) g.testy = 0;
		if (isNaN(g.ave)) g.ave = 0;
		if (g.testy < 20) 
		{ 
			g.testy ++; g.ave += c; 
			if (g.testy >= 10)
			{
				if (g.ave > 1000) g.framedelay = 42; // throttle the fast devices
			}
		}
	}
	catch (e)
	{
		write(e.message);
	}
};

function spawnTextSprite(o,t)
{
	for (var a=0;a<NUM.TEXTSPRITES;a++)
	{
		if (!m.textsprites[a].visible)
		{
			var e = m.textsprites[a];
			e.visible = true;
			e.ticks = 30;
			e.x = o.x;
			e.y = o.y;
			e.text = t;
			e.speed = 1;
			e.colour = g.colours[rnd(g.colours.length)-1];
			break;
		}
	}
};

function spawnTextSpriteXY(x,y,t)
{
	for (var a=0;a<NUM.TEXTSPRITES;a++)
	{
		if (!m.textsprites[a].visible)
		{
			var e = m.textsprites[a];
			e.visible = true;
			e.ticks = 30;
			e.x = x;
			e.y = y;
			e.text = t;
			e.speed = 1;
			break;
		}
	}
};

function spawnMonster()
{
	if (g.pausemode < 1 && !m.player.dying)
	{
		var y = g.canvasheight;
		var d = 0;
		var r = g.level; if (r > 12) r = 12;
		var sp = 6 + rnd(r);
		var hp = 10;
		var r = rnd(2)-1;

		for (var a=0;a<NUM.MONSTERS;a++)
		{
			if (!m.monsters[a].visible)
			{
				var e = m.monsters[a];
				g.monsterstartx += 100; if (g.monsterstartx > 248) g.monsterstartx = 48;
				e.visible = true;
				e.direction = 0;
				e.w = e.spritesheet.framewidth;
				e.h = e.spritesheet.frameheight;
				e.framesperdirection = e.spritesheet.framesperdirection;
				e.killed = false;
				e.hp = hp;
				e.speed = sp;
				e.basespeed = sp;
				e.frame = 0;
				e.row = r;
				e.nextthink = 16;
				e.decay = 0;
				e.basenextthink = e.nextthink;
				e.startframe = 0;
				e.inpain = 0;
				e.x = g.monsterstartx;
				e.y = y;
				e.falling = false;
				e.jumping = false;
				g.levelmonsters ++;
				break;
			}
		}
	}
};


function spawnItemChance(o)
{
	var x = 0; var y = 0;
	if ((rnd(100) < 10) && g.pausemode < 1) 
	{
		x = o.x + 32 + (rnd(g.roadwidth - 64));
		y = 0;
		var row = parseInt(m.spritesheets["entitysheet"].height) / parseInt(m.spritesheets["entitysheet"].frameheight);
		var r = rnd(100)<(g.level)?rnd(3)-1:2+rnd(row-3);
		if (g.level < 5 && r == 5)
		{
			if (rnd(100)>5) r = 4; // frig to prevent too much missile exposure on early levels
		}
		spawnEntity(x, y, r);
	}
};

function spawnItem()
{
	if ((rnd(200) < (g.level < 3 ? 2 : 3)) && g.pausemode < 1 && !m.player.dying) 
	{
		for (var a=0;a<NUM.ITEMS;a++)
		{
			if (!m.items[a].visible)
			{
				var s = m.items[a];
				s.visible = true;
				s.x = 32 + rnd(g.canvaswidth - 96);
				s.y = g.canvasheight;
				s.w = s.spritesheet.framewidth;
				s.h = s.spritesheet.frameheight;
				s.framesperdirection = s.spritesheet.framesperdirection;
				s.startframe = 0;
				s.direction = 0;
				s.xmod = rnd(100) < 49 ? -1 : 1;
				s.row = g.level < 3 ? 0 : rnd(4)-1;
				s.speed = 6 + rnd(8);
				if (s.row == 3) { s.speed = 10; s.x = m.player.x; }
				break;
			}
		}
	}
};

function spawnBonus()
{
	if ((rnd(100) < 3) && g.pausemode < 1 && !m.player.dying) 
	{
		for (var a=0;a<NUM.BONUSES;a++)
		{
			if (!m.bonuses[a].visible)
			{
				var s = m.bonuses[a];
				s.visible = true;
				s.x = 32 + rnd(g.canvaswidth - 96);
				s.y = -16; //162;
				s.w = s.spritesheet.framewidth;
				s.h = s.spritesheet.frameheight;
				s.framesperdirection = s.spritesheet.framesperdirection;
				s.startframe = 0;
				s.direction = 4;
				s.bounced = false;
				s.taken = false;
				s.collected = false;
				s.speed = 4;
				s.row = rnd(3)-1;
				s.decay = 150;
				break;
			}
		}
	}
};

function spawnBonusReward(x,y)
{
	for (var a=0;a<NUM.BONUSES;a++)
	{
		if (!m.bonuses[a].visible)
		{
			var s = m.bonuses[a];
			s.visible = true;
			s.x = x;
			s.y = y;
			s.w = s.spritesheet.framewidth;
			s.h = s.spritesheet.frameheight;
			s.framesperdirection = s.spritesheet.framesperdirection;
			s.startframe = 0;
			s.direction = 0;
			s.bounced = false;
			s.taken = false;
			s.collected = false;
			s.speed = 4;
			s.row = rnd(3)-1;
			s.decay = 100;
			break;
		}
	}
};

function spawnBonusXY(x,y)
{
	for (var a=0;a<NUM.BONUSES;a++)
	{
		if (!m.bonuses[a].visible)
		{
			var s = m.bonuses[a];
			s.visible = true;
			s.x = x;
			s.y = y;
			s.w = s.spritesheet.framewidth;
			s.h = s.spritesheet.frameheight;
			s.framesperdirection = s.spritesheet.framesperdirection;
			s.startframe = 0;
			s.direction = 0;
			s.bounced = false;
			s.taken = false;
			s.collected = true;
			s.speed = 16;
			s.row = rnd(3)-1;
			calculateMods(s,16,16);
			s.decay = 1000;
			break;
		}
	}
};

function spawnFireball(o)
{
	if (!o.visible) { return; }
	if (g.pausemode > 0) { return; }
	if ((o.x + o.w) < 0) { return; }
	if (o.x > g.canvaswidth) { return; }
	if (g.fireballcooldown > 2) { return; } 
	if (g.mode != "game") { return; }
	if (o.dying) { return; }
	var d = 4;  
	for (var a=0;a<NUM.BOMBS;a++)
	{
		if (!m.bomb[a].visible)
		{
			var s = m.bomb[a];
			s.visible = true;
			s.direction = 4;
			s.x = o.x + ((o.w/2) - (s.w/2));
			s.y = o.y + (o.h/2);
			s.row = 0;
			s.speed = 8;
			s.size = 4;
			s.framesperdirection = s.spritesheet.framesperdirection;
			g.shotsfired ++;
			break;
		}
	}
};

function writeString(s,x,y)
{
	var o = m.spritesheets["numberssheet"];
	for (var a=0;a<s.length;a++)
	{
		x += o.framewidth;
		var i = s.substr(a,1);
		g.ctx.drawImage(o.image, i*o.framewidth, 0, o.framewidth, o.frameheight, x, y, o.framewidth, o.frameheight);
	}
};

function writeLevel()
{
	var ph = new String();
	var ph2 = new String(g.level);
	var ls = ph2.length;
	var s = new String();
	
	for (var b = 0; b < ph2.length; b++) s += ph2.substring(b,b+1);
	
	writeString(s,190,200);

};

function hiScore()
{
	try
	{
		var sScore = new String();
		var sInScore = new String(m.player.hiscore);
		var ls = sInScore.length;
		var s = new String();
		
		for (var a = 0; a < (8-ls); a++) s += "0";
		for (var b = 0; b < sInScore.length; b++) s += "" + sInScore.substring(b,b+1);
		
		writeText(s,96,26,28,SCOREFONT)
		
	}
	catch (e)
	{
		write(e.message);
	}
};

function updateScore()
{
	try
	{
		m.player.score += 50;
		if (m.player.score > m.player.targetscore) m.player.score = m.player.targetscore;
		if (m.player.score > m.player.hiscore) 
		{
			m.player.hiscore = Math.round(m.player.score);
			localStorage.setItem(GAMETITLE + "-hiscore", m.player.hiscore);
		}
		if (m.player.score > 99999999) m.player.score = 99999999;
		var sScore = new String();
		var sInScore = new String(m.player.score);
		var ls = sInScore.length;
		var s = new String();
		
		for (var a = 0; a < (8-ls); a++) s += "0";
		for (var b = 0; b < sInScore.length; b++) s += "" + sInScore.substring(b,b+1);
		
		if (m.player.score >= 100000 && !g.bonuslife1) 
		{
			m.player.lives ++;
			spawnTextSprite(m.player,"EXTRA LIFE");
			g.bonuslife1 = true;
		}

		if (m.player.score >= 200000 && !g.bonuslife2) 
		{
			m.player.lives ++;
			spawnTextSprite(m.player,"EXTRA LIFE");
			g.bonuslife2 = true;
		}

		writeText(s,96,26,28,SCOREFONT)
		
	}
	catch (e)
	{
		write("Score: " + e.message);
	}
};


function scanInput(e)
{
	if (window.event) keypress = e.keyCode;
	else if(e.which) keypress = e.which;
	switch (keypress)
	{
		case 16: // SHIFT
			break;
		case 18: // ALT
			break;
		case 32: // Space
			if (g.mode == "title") setGame();
			break;
		case 38: // Up
			break;
		case 40: // Down
			break;
		case 39: // Right
			break;
		case 37: // Left
			break;
		case 67: // C
			g.console.style.display = g.console.style.display == "none" ? "block" : "none";
			break;
		case 80: // P
			g.pausemode ++; if (g.pausemode > 1) g.pausemode = 0;
			break;
		case 83: // S
			g.audiomode ++; if (g.audiomode > 1) g.audiomode = 0;
			handleAudio();
			break;
		case 17: // CTRL
		case 90: // Z
			break;
	}
};

function stopMove(e)
{
	if (window.event) // IE
	{
		keyup = e.keyCode;
	}
	else if(e.which)
	{
		keyup = e.which;
	}

	var k = 0;
	if (keyup >= 48 && keyup <= 57)
	{
		k = (48 - keyup) * -1;
	}
	switch (keyup)
	{
		case 16: // SHIFT
			break;
		case 18: // ALT
			break;
		case 32: // Space
			break;
		case 38: // Up
			break;
		case 40: // Down
			break;
		case 39: // Right
			break;
		case 37: // Left
			break;
		case 67: // C
			break;
		case 83: // S
			break;
		case 17: // CTRL
		case 90: // Z
			break;
	}
};

window.onorientationchange = function(event) {
	setCanvasDimensions(event);
};

