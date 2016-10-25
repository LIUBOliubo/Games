
/*
	Danger Ranger
	(C) Mark Wilcox 
	More games at www.spacemonsters.co.uk
*/

var GAMETITLE = "DANGERRANGER";
var SCOREFONT = "Arial"; //"Bowlby One SC";
var IPHONEHACK = true;

var g = {}; 
g.go = 0;


var m = { 
	spritesheets : [],
	player : null,
	explosion : [],
	lasers : [],
	aliens : [],
	alienbomb : [],
	textsprites : [],
	platforms : [],
	jumppad : null,
	keys : [],
	fireswirl : null
};

var stars = [];
var gameaudio = []; 

g.checkSum = gamedata.imageFiles.length;// + gamedata.audioFiles.length; 
g.checkCount = 0;
g.imageData = [];
g.audioData = [];
g.aliensarray = [];

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


function createStars()
{
	for (var a=0;a<20;a++) 
	{ 
		stars[a] = new star("star"+a, rnd(g.canvaswidth), rnd(g.canvasheight), 4, rnd(2)+1, 4, g.colours[rnd(g.colours.length)-1]); 
	}
};

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
		g.splash		= new Image();	g.splash.src		= "library/splash.png";
		g.playpause		= new Image();	g.playpause.src		= "library/playpause.png";
		g.gameback		= [];
		g.gameback[0]	= new Image();	g.gameback[0].src	= "library/gameback1.gif";
		g.gameback[1]	= new Image();	g.gameback[1].src	= "library/gameback2.gif";
		g.gameback[2]	= new Image();	g.gameback[2].src	= "library/gameback3.gif";
		
		//g.volumecontrol = new Image(); g.volumecontrol.src = "library/volumecontrols.png";

		// STANDARD SPRITES
		m.player = new sprite("player", "player", m.spritesheets["playersheet"], 0, 0, 16, 4, 1);
		m.jumppad = new sprite("jumppad", "jumppad", m.spritesheets["jumppad"], 0, 0, 16, 4, 1);
		m.fireswirl = new sprite("fireswirl", "fireswirl", m.spritesheets["fireswirl"], 0, 0, 16, 4, 0);

		// SPRITE POTS
		for (var a=0;a<4;a++) m.platforms[a] = new sprite("platform"+a, "platform", m.spritesheets["platformsheet"], 0, 0, 2, 0, 0);
		for (var a=0;a<8;a++) m.keys[a] = new sprite("keys"+a, "keys", m.spritesheets["keyssheet"], 0, 0, 2, 0, 0);
		for (var a=0;a<12;a++) m.alienbomb[a] = new sprite("alienbomb"+a, "alienbomb", m.spritesheets["alienbombsheet"], 0, 0, 2, 0, 0);
		for (var a=0;a<3;a++) m.aliens[a] = new sprite("aliens"+a, "alien", m.spritesheets["aliensheet"], 0, 0, 2, 0, 0);
		for (var a=0;a<8;a++) m.explosion[a] = new sprite("explosion"+a, "explosion", m.spritesheets["explosionsheet"], 0, 0, 2, 0, 0);
		for (var a=0;a<6;a++) m.lasers[a] = new laser("laser"+a, 2, 16, "255,255,255", 16);
		for (var a=0;a<8;a++) m.textsprites[a] = new textsprite("textsprite"+a,-32,-32,"",0.1);

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
		write("CreateSprites: " + e.message);
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

		g.banad.style.display = "none";
		g.nextthink = 0;
		pickAdURL();

		window.scrollTo(0,0);

		g.pausemode = 0;
		g.audiomode = 1;
		createStars();	
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
	if (g.mode == "title") setGame();
	
	var o = m.player;
	var tx = (event.pageX - (g.canvas.offsetParent ? g.canvas.parentNode.offsetLeft : 0)) - (o.w / 2);
	var ty = (event.pageY - (g.canvas.offsetParent ? g.canvas.parentNode.offsetTop : 0)) - (o.h / 2);

	// Pause and Audio
	if (tx < 64 && ty < 64 && (g.mode == "pregame" || g.mode == "game"))  { g.pausemode ++; if (g.pausemode > 1) g.pausemode = 0; }
	if (tx < 128 && tx > 64 && ty < 64) { g.audiomode ++; if (g.audiomode > 1) g.audiomode = 0; }

};

function playerMovement(o,tx,ty)
{
	if (g.mode != "game") return;
	if (tx > (o.storedx + 8))
	{
		o.moveright = true; o.moveleft = false; o.spritedirection = 2;
		o.storedx = tx;
	}
	if (tx < (o.storedx - 8))
	{
		o.moveright = false; o.moveleft = true; o.spritedirection = 6;
		o.storedx = tx;
	}
};

function touchStart(event) { 
	window.scrollTo(0, 0);
	event.preventDefault();
	touch(event.touches[0]);
};

function touchMove(event) {
	window.scrollTo(0, 0);
	event.preventDefault();

	var tx = (event.touches[0].pageX - g.canvas.offsetLeft);
	var ty = (event.touches[0].pageY - g.canvas.offsetTop);	
	playerMovement(m.player,tx,ty);
};

function touchEnd(event) {
	m.player.moveright = false;
	m.player.moveleft = false;
};

function mouseMove(event) {
	var tx = (event.pageX - g.canvas.offsetLeft);
	var ty = (event.pageY - g.canvas.offsetTop);	
	playerMovement(m.player,tx,ty);
};

function mouseUp(event) {
	touch(event);
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
	g.stage = 0; 
	g.banad.style.display = "block";
};

function setGame()
{
	g.banad.style.display = "none";

	g.mode = "pregame";
	g.resetting = 30;
	m.player.score = 0;
	m.player.targetscore = 0;
	m.player.lives = 3;
	g.level = -1;
	g.lap = 1;
	g.displaylevel = 1;
	g.bonuspoints = 0;
	g.lasercooldown = 0;
	g.wavetype = 1;
	g.floor = g.canvasheight - 120;
	setLevel(); 
	playerStart();
	g.bonuslife1 = false; // 100,000
	g.bonuslife2 = false; // 250,000
};

function setLevel()
{
	wipe(true);
	g.levelbonus = 0;
	m.player.dying = false;
	m.player.visible = true;
	g.shotsfired = 0;
	g.hitratio = 0;

	// What to do with the platforms...


	var row = rnd(5) - 1;
	g.level ++;
	if (g.level >= leveldata.length) 
	{
		g.level = 0;
		g.lap ++;
		if (g.lap > 3) g.lap = 3;
	}
	var l = g.level;
	for (var a=0;a < m.platforms.length;a++)
	{
		var o = m.platforms[a];
		o.x = leveldata[l][a].x;
		o.y = leveldata[l][a].y;
		o.row = row;
	}
	for (var a=0;a < m.keys.length;a++)
	{
		var o = m.keys[a];
		o.x = keydata[l][a].x;
		o.y = keydata[l][a].y;
		o.visible = true;
		o.row = 0;
	}

	for (var a=0;a < m.aliens.length;a++)
	{
		var o = m.aliens[a];
		o.x = aliendata[l][a].x;
		o.y = aliendata[l][a].y;
		o.direction = aliendata[l][a].direction;
		o.minx = aliendata[l][a].minx;
		o.maxx = aliendata[l][a].maxx;
		o.miny = aliendata[l][a].miny;
		o.maxy = aliendata[l][a].maxy;
		o.speed = aliendata[l][a].speed;

		o.visible = false;
		if (a == 0 && g.lap >= 1) o.visible = true;
		if (a == 1 && g.lap >= 2) o.visible = true;
		if (a == 2 && g.lap >= 3) o.visible = true;

		o.row = rnd(5)-1;
	}

	m.jumppad.x = jumppaddata[l].x;
	m.jumppad.y = jumppaddata[l].y;
	m.jumppad.startframe = 0;
	m.jumppad.framedelaymax = m.jumppad.spritesheet.framedelay;

	g.levelkeys = keydata[l].length;
	g.keys = 0;

};

function playerStart()
{
	m.player.x = 32; 
	m.player.y = g.floor;
	m.player.speed = 4;
	m.player.spritedirection = 2;
	m.player.basew = m.player.w;
	m.player.baseh = m.player.h;
	m.player.moveright = false;
	m.player.moveleft = false;
	m.player.jumping = false;
	m.player.falling = false;
	m.player.xmod = 0;
	m.player.ymod = 0;
	m.player.row = 0;
	m.player.size = 1;
	m.player.storedx = m.player.x;
	m.player.angle = 0;
	m.player.air = 100;
	g.bonusmulti = 1;
};

function setLandscape()
{
	g.oldmode = g.mode;
	g.mode = "landscape";
};

function wipe(doentities)
{
	for (var a=0;a<m.alienbomb.length;a++) kill(m.alienbomb[a]);
	for (var a=0;a<m.aliens.length;a++) kill(m.aliens[a]);
	for (var a=0;a<m.explosion.length;a++) kill(m.explosion[a]);
	for (var a=0;a<m.lasers.length;a++) kill(m.lasers[a]);
	for (var a=0;a<m.textsprites.length;a++) kill(m.textsprites[a]); 
	kill(m.fireswirl);
};

function kill(o)
{
	o.visible = false;
};

function playerDeath()
{
	if (m.player.dying) return;
	//wipe();
	m.player.dying = true;
	m.player.falling = false;
	m.player.jumping = false;
	m.player.lives --;
	m.player.ymod = 16;
	g.resetting = 50;
};


function movePlayer(o)
{
	if (!o.visible || g.pausemode > 0) return;

	if (o.dying)
	{
		o.y -= o.ymod;
		o.ymod -= 1;
	} else {
		if (o.jumping)
		{
			o.ymod -= 0.5;
			if (o.ymod <= 0)
			{
				o.jumping = false;
				o.falling = true;
			}
			o.y -= o.ymod;
		}

		if (o.falling)
		{
			o.ymod += 0.5;
			o.y += o.ymod/2;
		}

		if (o.y > (g.canvasheight - 80))
		{
			playerDeath();
		}

		if (o.moveright)
		{
			o.x += (o.jumping || o.falling) ? o.speed : o.speed;
		}
		if (o.moveleft)
		{
			o.x -= (o.jumping || o.falling) ? o.speed : o.speed;
		}

		if ((o.y + o.h) > (g.canvasheight - 100) && o.falling)
		{
			o.y = g.canvasheight - 120;
			o.falling = false;
		}
		if (o.x < 0) o.x = 0;
		if (o.x > (g.canvaswidth - o.w)) o.x = g.canvaswidth - o.w;
		if ((o.x+o.w) > (m.jumppad.x+8) && o.x < (m.jumppad.x+m.jumppad.w-8) && (o.y+o.h) >= m.jumppad.y && (o.y+o.h) <= (m.jumppad.y+m.jumppad.h))
		{
			if (!m.player.jumping)
			{
				o.jumping = true;
				o.falling = false;
				o.ymod = 18;
			}
		}
	}
};

function drawPlayer(o)
{
	if (!o.visible) return;
	try
	{
		if (!o.moveright && !o.moveleft)
		{
			o.frame = o.spritedirection == 2 ? 8 : 1;
			o.row = o.spritedirection == 2 ? 0 : 1;
		} else {
			o.row = o.moveright ? 0 : 1;
			if (isNaN(o.frame)) o.frame = o.startframe;
			o.framedelay --;
			if (o.framedelay < 0)
			{
				o.framedelay = o.framedelaymax;
				o.frame ++;
				if (o.frame >= (o.startframe + o.spritesheet.framesperdirection))
				{
					o.frame = o.startframe;
				}
			}
		}
		if (o.dying)
		{
			o.angle += 30; if (o.angle > 360) o.angle = 0;
			g.ctx.save();
			g.ctx.translate(o.x + (o.w/2),o.y + (o.h/2));
			g.ctx.rotate(o.angle * (Math.PI / 180));
			g.ctx.drawImage(o.spritesheet.image, o.frame * o.spritesheet.framewidth, o.row * o.spritesheet.frameheight, o.w, o.h, -o.w/2, -o.h/2, o.w, o.h);
			g.ctx.restore();
		} else if (o.jumping || o.falling)
		{
			g.ctx.drawImage(o.spritesheet.image, 10 * o.spritesheet.framewidth, o.row * o.spritesheet.frameheight, o.spritesheet.framewidth, o.spritesheet.frameheight, o.x, o.y, o.w, o.h);
		} else {
			g.ctx.drawImage(o.spritesheet.image, o.frame * o.spritesheet.framewidth, o.row * o.spritesheet.frameheight, o.spritesheet.framewidth, o.spritesheet.frameheight, o.x, o.y, o.w, o.h);
		}

	}
	catch (e)
	{
		write("DrawPlayer: " + o.frame + " - " + e.message);
	}

};

function drawStar(o)
{
	try
	{
		g.ctx.fillStyle = o.colour;
		if (g.mode == "game")
		{
			o.size = g.hyperdrive > 0 ? o.basesize * 4 : o.basesize;
		} else if (g.mode == "endlevel")
		{
			if (g.resetting <= (g.warplength / 2))
			{
				o.size -= 0.5;
			} else {
				o.size += 0.5;
			}
		} else if (g.mode == "endgame")
		{
			g.ctx.fillStyle = rnd(10) < 5 ? "#4362b2" : "#365298";
			o.size = 64;
			o.direction = 0;
		}
		g.ctx.fillRect(o.x,o.y,2,o.size);
	}
	catch (e)
	{
		write(o.id);
	}

};

function moveStar(o)
{
	if (g.mode == "game")
	{
		o.speed = g.hyperdrive > 0 ? o.basespeed * 8 : o.basespeed;
	} else if (g.mode == "endlevel")
	{
		if (g.resetting <= (g.warplength / 2))
		{
			o.speed -= 0.5;
		} else {
			o.speed += 0.5;
		}
	} else if (g.mode == "endgame")
	{
		o.speed = o.basespeed + 16;
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

		if ((o.x + o.w) < 0) o.x = o.canvaswidth;
		if (o.x > g.canvaswidth) o.x = (o.size * -1); 
		if ((o.y + o.size) < 0) o.y = g.canvasheight; 
		if (o.y > g.canvasheight) o.y = o.size * -1;
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
		} else if (!o.diving) {
			if (isNaN(o.frame)) o.frame = o.startframe;
			o.framedelay --;
			if (o.framedelay < 0)
			{
				o.framedelay = o.framedelaymax;
				o.frame ++;
				if (o.frame >= (o.startframe + o.spritesheet.framesperdirection))
				{
					if (o.spritesheet.type == "explosion")
					{
						kill(o);
					} else {
						o.frame = o.startframe;
					}
				}
			}
			if (o.inpain) { o.frame = o.spritesheet.painframe; o.inpain = false; }
		} else {
			o.frame = 0;
		}
		g.ctx.save();
		if (o.diving)
		{
			var angle = 0;
			if (o.divestage == 1) angle = o.divedirection == 6 ? -45 : 45;
			if (o.divestage == 2) angle = o.divedirection == 6 ? 225 : 135;
			if (o.divestage == 3) angle = o.divedirection == 6 ? 165 : -165;
			g.ctx.translate(o.x + (o.w/2),o.y + (o.h/2));
			g.ctx.rotate(angle * (Math.PI / 180));
			g.ctx.drawImage(o.spritesheet.image, o.frame * o.spritesheet.framewidth, o.row * o.spritesheet.frameheight, o.w, o.h, -o.w/2, -o.h/2, o.w, o.h);
		} else {
			g.ctx.drawImage(o.spritesheet.image, o.frame * o.spritesheet.framewidth, o.row * o.spritesheet.frameheight, o.w, o.h, o.x, o.y, o.w, o.h);
		}
		g.ctx.restore();
	}
	catch (e)
	{
		write("Draw: Angle = " + o.angle + " - " + o.spritesheet.type + ", " + o.frame + " - " + e.message);
	}

};

function moveLaser(o)
{
	if (!o.visible || o.dead || g.pausemode > 0) return;
	o.y -= o.speed;
	if (o.y < (o.h * -1)) kill(o);
};

function drawLaser(o)
{
	try
	{
		if (!o.visible || o.dead || g.pausemode > 0) return;
		g.ctx.fillStyle = "rgb(" + o.color + ")";
		g.ctx.fillRect(o.x,o.y,o.w,o.h);
	}
	catch (e)
	{
		write("DrawLaser: " + e.message);
	}
};

function drawPlatform(o)
{
	try
	{
		g.ctx.drawImage(o.spritesheet.image,0,o.row * o.spritesheet.frameheight,o.spritesheet.width,o.spritesheet.frameheight,o.x,o.y,o.spritesheet.width,o.spritesheet.frameheight);
	}
	catch (e)
	{
		write("DrawPlatform: " + e.message);
	}
};

function moveToTarget(o)
{
	if (!o.visible || o.dead || g.pausemode > 0) return;

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
		if (o.jumping)
		{
			if (o.y >= o.targety)
			{
				if (!o.bounced)
				{
					o.bounced = true;
					o.y = o.y - 8;
					o.speed = -8;
				} else {
					o.speed = o.basespeed;
					o.jumping = false;
				}
			}
			if (o.dying > 0)
			{
				if (o.targetx > o.x) { o.x += o.speed; }
				if (o.targetx < o.x) { o.x -= o.speed; }
				if (o.targety < o.y) { o.y -= o.speed; }
				if (o.targety > o.y) { o.y += o.speed; }
				if (o.y < 0)
				{
					kill(o);
				}
			}
			if (o.bounced) o.speed += 2;
			if (o.y < o.targety) { o.y += o.speed; }
		} else {
			if (o.divestage == 4 && o.diving)
			{
				var thresh = 1;
				if ((Math.round(o.x) >= Math.round(o.targetx) - thresh) 
					&& 
					(Math.round(o.x) <= Math.round(o.targetx) + o.w + thresh) 
					&& 
					(Math.round(o.y) >= Math.round(o.targety) - thresh)
					&& 
					(Math.round(o.y) <= Math.round(o.targety) + o.h + thresh)
					)
				{
					o.divestage = 0;
					o.diving = false;
					write("Back");
					o.speed = o.basespeed;
					g.divingaliens --;
				} else {
					if (o.targetx > o.x) { o.x += o.speed; }
					if (o.targetx < o.x) { o.x -= o.speed; }
					if (o.targety < o.y) { o.y -= o.speed; }
					if (o.targety > o.y) { o.y += o.speed; }
					//calculateModsAlien(o);
					//o.x += o.xmod;
					//write("Moving");
				}
			} else {
				// Target co-ords set by screen touch.
				if (o.targetx > o.x) { o.x += o.speed; }
				if (o.targetx < o.x) { o.x -= o.speed; }
				if (o.targety < o.y) { o.y -= o.speed; }
				if (o.targety > o.y) { o.y += o.speed; }
			}
		}
	}
	if (o.dying < 1)
	{
		if (o.x < g.canvaspadding) o.x = g.canvaspadding;
		if ((o.x + o.w) > (g.canvaswidth - g.canvaspadding)) o.x = g.canvaswidth - g.canvaspadding - o.w;
		if (o.y < g.canvaspadding) o.y = g.canvaspadding;
		if ((o.y + o.h) > (g.canvasheight - g.canvaspadding)) o.y = g.canvasheight - g.canvaspadding - o.h;
	}
};



function setAliens()
{

	g.levelaliens = 0;
	g.alienskilled = 0;
	g.maxdivingaliens = (g.level); if (g.maxdivingaliens > 4) g.maxdivingaliens = 4;
	g.divingaliens = 0;

	var c = 0;
	var r = 0;

	g.level ++;
	if (g.level > 12) g.level = 12;

	for (var row=0;row<3;row++)
	{
		r ++; if (r > 1) r = 0;
		for (var a=0;a<4;a++)
		{
			var x = 48 + (a * 64);
			var y = 64 + (row * 24); //(((g.levelwave + 1) * 48) + (row * 24));
			var d = 4;
			/*switch (g.wavetype)
			{
				case 1:
					d = (row == 0) ? 0 : (a < 2) ? 5 : 3; 
					break;
				case 2:
				case 5:
					d = (row == 0) ? ((a < 2) ? 7 : 1) : (a < 2) ? 5 : 3; 
					break;
				case 3:
				case 6:
					d = (row == 0) ? ((a < 2) ? 5 : 3) : (a < 2) ? 7 : 1; 
					break;
				case 4:
					d = (row == 0) ? 2 : 6; 
					break;
			}*/
			var s = 0.5;
			var f = 0;
			var ty = -1;
			var hp = 1;
			spawnAlien(x,y,d,s,hp,r);
			c ++;
			g.levelaliens ++;
		}
	}

	//g.wavetype ++; if (g.wavetype > 6) g.wavetype = 0;
};

function resetAliens()
{
	for (var a=0;a<g.aliensarray.length;a++)
	{
		var o = g.aliensarray[a];
		if (!o.killed)
		{
			o.visible = true;
			o.x = o.originx;
			o.y = o.originy;
			o.diving = false;
			o.speed = o.basespeed;
		}
	}
};

function move(o)
{
	if (!o.visible || g.pausemode > 0) return;

	var bomb = o.spritesheet.type == "alienbomb" ? true : false;

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
		o.x += bomb ? o.xmod : o.speed;
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
		if (o.y > (g.canvasheight - 70))
		{
			kill(o);
		}
	}
};

function moveAlien(o)
{
	if (!o.visible || g.pausemode > 0) return;

	switch (o.direction)
	{
		case 0:
			o.y -= o.speed;
			if (o.y < o.miny) o.direction = 4;
			break;
		case 2:
			o.x += o.speed;
			if (o.x > o.maxx) o.direction = 6;
			break;
		case 4:
			o.y += o.speed;
			if (o.y > o.maxy) o.direction = 0;
			break;
		case 6:
			o.x -= o.speed;
			if (o.x < o.minx) o.direction = 2;
			break;
	}

};

function drawAlien(o)
{
	if (!o.visible) return;
	try
	{
		if (isNaN(o.frame)) o.frame = o.startframe;
		if (isNaN(o.framedelay)) o.framedelay = 0;
		o.framedelay --;
		if (o.framedelay < 0)
		{
			o.framedelay = o.framedelaymax;
			o.frame ++;
			if (o.frame >= (o.startframe + o.spritesheet.framesperdirection))
			{
				o.frame = o.startframe;
			}
		}
		g.ctx.drawImage(o.spritesheet.image, o.frame * o.spritesheet.framewidth, o.row * o.spritesheet.frameheight, o.spritesheet.framewidth, o.spritesheet.frameheight, o.x, o.y, o.spritesheet.framewidth, o.spritesheet.frameheight);
	}
	catch (e)
	{
		write("Draw Alien: " + e.message);
	}
};

function moveFireSwirl(o)
{
	if (!o.visible || g.pausemode > 0) return;
	if (o.direction == 2)
	{
		o.x += o.x < -16 ? 0.1 : o.speed;
		if (o.x > g.canvaswidth) kill(o);
	} else {
		o.x -= o.x > (g.canvaswidth-8) ? 0.1 : o.speed;
		if ((o.x + o.w) < 0) kill(o);
	}
	o.nextthink --;
	if (o.nextthink < 1) 
	{
		o.nextthink = o.nextthinkmax;
		if (o.moddir == 0)
		{
			o.moddir= 4;
		} else {
			o.moddir= 0;
		}
	}
	if (o.moddir == 4)
	{
		o.y += 1;
	} else {
		o.y -= 1;
	}
};

function drawFireSwirl(o)
{
	if (!o.visible) return;
	try
	{
		if (isNaN(o.frame)) o.frame = o.startframe;
		if (isNaN(o.framedelay)) o.framedelay = 0;
		o.framedelay --;
		if (o.framedelay < 0)
		{
			o.framedelay = o.framedelaymax;
			o.frame ++;
			if (o.frame >= (o.startframe + o.spritesheet.framesperdirection))
			{
				o.frame = o.startframe;
			}
		}
		if (o.direction == 2)
		{
			o.angle += (4*o.speed); if (o.angle > 360) o.angle = 0;
		} else {
			o.angle -= (4*o.speed); if (o.angle < 0) o.angle = 360;
		}
		g.ctx.save();
		g.ctx.translate(o.x + (o.w/2),o.y + (o.h/2));
		g.ctx.rotate(o.angle * (Math.PI / 180));
		g.ctx.drawImage(o.spritesheet.image, o.frame * o.spritesheet.framewidth, o.row * o.spritesheet.frameheight, o.w, o.h, -o.w/2, -o.h/2, o.w, o.h);
		g.ctx.restore();
	}
	catch (e)
	{
		write("Draw FireSwirl: " + e.message);
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


function entityCollision(o,m) 
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
		switch(o.row) // Which entity ?
		{
			default:
				break;
		}
	}
};

function alienMissileCollision(o) 
{
	if (!o.visible || g.pausemode > 0) return;

	var ox = o.x;
	var oy = o.y;
	var ow = o.w; 
	var oh = o.h; 

	for (var z=0;z<m.aliens.length;z++)
	{
		var a = m.aliens[z];
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
				a.hp -= o.damage;
				if (a.hp < 1)
				{
					kill(a);
					alienKill(a);
				}
				kill(o);
			}
		}
	}
};

function endLevel()
{
	m.player.score += g.level * 500;
	g.levelbonus = Math.round(m.player.air) * 50;
	m.player.score += g.levelbonus;
	m.player.targetscore = m.player.score;
	g.mode = "levelup";
	g.resetting = 90;
};

function keyBonus(a)
{
	var bonus = 100;
	//bonus = Math.round(a.y * 10);
	/*if (bonus > 3000)
	{
		spawnTextSpriteXY(a.x,a.y-24,"X5 BONUS!");
		bonus = bonus * 5;
	} else if (bonus > 2500)
	{
		spawnTextSpriteXY(a.x,a.y-24,"X2 BONUS!");
		bonus = bonus * 2;
	}*/
	spawnTextSprite(a,bonus);
	m.player.score += bonus;
	m.player.targetscore = m.player.score;
	m.player.targetscore += 10;
	g.keys ++;
	if (g.keys >= g.levelkeys)
	{
		//wipe();
		m.player.score += g.level * 500;
		g.levelbonus = Math.round(m.player.air) * 50;
		m.player.score += g.levelbonus;
		m.player.targetscore = m.player.score;
		g.mode = "levelup";
		g.resetting = 70;
	}
};

function alienBombCollision(o,m) 
{
	if (!o.visible || !m.visible || m.dead || m.dying || o.dying > 0 || g.pausemode > 0) return;

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
		playerDeath();
	}
};

function keyPlayerCollision(o,m) // o = key
{
	if (!o.visible || !m.visible || g.pausemode > 0 || m.dying) return;
	var ox = o.x;
	var oy = o.y;
	var ow = o.w; 
	var oh = o.h; 

	var mx = m.x;
	var my = m.y;
	var mw = m.w;
	var mh = m.h;

	var t = 0; // attempt to set a threshold a la manic shooter tiny boxes.

	var c1 = false, c2 = false, c3 = false, c4 = false;
	
	if (ox <= (mx+(mw-t))  &&  oy <= (my+(mh-t))  &&  ox >= (mx+t)  && oy >= (my+t)) c1 = true;
	if ((ox+ow) >= (mx+t)  &&  oy >= (my+t)  &&  (ox+ow) <= (mx+(mw-t))  &&  oy <= (my+(mh-t))) c2 = true;
	if (ox <= (mx+(mw-t))  &&  (oy+oh) >= (my+t)  &&  ox >= (mx+t)  &&  (oy+oh) <= (my+(mh-t))) c3 = true;
	if (((ox + ow) >= (mx+t)) && ((ox + ow) <= (mx + (mw-t))) && ((oy + oh) >= (my+t)) && ((oy + oh) <= (my + (mh-t)))) c4 = true; 

	if (c1 == true || c2 == true || c3 == true || c4 == true)
	{
		kill(o);
		keyBonus(o);
	}
};

function alienPlayerCollision(o,m) // o = alien
{
	if (!o.visible || !m.visible || m.dying || g.pausemode > 0) return;
	var ox = o.x;
	var oy = o.y;
	var ow = o.w; 
	var oh = o.h; 

	var mx = m.x;
	var my = m.y;
	var mw = m.w;
	var mh = m.h;

	var t = 4; // attempt to set a threshold a la manic shooter tiny boxes.

	var c1 = false, c2 = false, c3 = false, c4 = false;
	
	if (ox <= (mx+(mw-t))  &&  oy <= (my+(mh-t))  &&  ox >= (mx+t)  && oy >= (my+t)) c1 = true;
	if ((ox+ow) >= (mx+t)  &&  oy >= (my+t)  &&  (ox+ow) <= (mx+(mw-t))  &&  oy <= (my+(mh-t))) c2 = true;
	if (ox <= (mx+(mw-t))  &&  (oy+oh) >= (my+t)  &&  ox >= (mx+t)  &&  (oy+oh) <= (my+(mh-t))) c3 = true;
	if (((ox + ow) >= (mx+t)) && ((ox + ow) <= (mx + (mw-t))) && ((oy + oh) >= (my+t)) && ((oy + oh) <= (my + (mh-t)))) c4 = true; 

	if (c1 == true || c2 == true || c3 == true || c4 == true)
	{
		playerDeath();
	}
};

function bonusPlayerCollision(o,m) // o = bonus
{
	if (!o.visible || !m.visible || m.dying || g.pausemode > 0) return;
	var ox = o.x;
	var oy = o.y;
	var ow = o.w; 
	var oh = o.h; 

	var mx = m.x;
	var my = m.y;
	var mw = m.w;
	var mh = m.h;

	var t = o.row == 0 ? -8 : 4; // threshold

	var c1 = false, c2 = false, c3 = false, c4 = false;
	
	if (ox <= (mx+(mw-t))  &&  oy <= (my+(mh-t))  &&  ox >= (mx+t)  && oy >= (my+t)) c1 = true;
	if ((ox+ow) >= (mx+t)  &&  oy >= (my+t)  &&  (ox+ow) <= (mx+(mw-t))  &&  oy <= (my+(mh-t))) c2 = true;
	if (ox <= (mx+(mw-t))  &&  (oy+oh) >= (my+t)  &&  ox >= (mx+t)  &&  (oy+oh) <= (my+(mh-t))) c3 = true;
	if (((ox + ow) >= (mx+t)) && ((ox + ow) <= (mx + (mw-t))) && ((oy + oh) >= (my+t)) && ((oy + oh) <= (my + (mh-t)))) c4 = true; 

	if (c1 == true || c2 == true || c3 == true || c4 == true)
	{
		switch(o.row)
		{
			case 0:
				kill(o);
				switch(g.bonusmulti)
				{
					case 5:
						spawnTextSpriteXY(o.x,o.y+16, "MEGA BONUS !");
						m.score += 10000;
					break;
					case 10:
						spawnTextSpriteXY(o.x,o.y+16, "ULTRA BONUS !");
						m.score += 20000;
					break;
					default:
						spawnTextSprite(o, g.bonusmulti * 1000);
						m.score += (g.bonusmulti * 1000);
					break;
				}
				m.targetscore = m.score;
				g.bonusmulti ++; 
				break;
			case 1:
				playerDeath();
				break;
		}
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
	g.ctx.shadowOffsetX = 1;
	g.ctx.shadowOffsetY = 1;
	g.ctx.shadowBlur = 2;
	g.ctx.shadowColor = "rgba(0, 0, 0, 0.9)";
	g.ctx.textAlign = "left";
	g.ctx.fillStyle = "#ffffff";
	g.ctx.fillText(text, x,y+8);
	g.ctx.restore();
};

function drawTextSprite(o)
{
	if (!o.visible) return;
	var text = new String(o.text);	
	g.ctx.save();
	g.ctx.font = "normal 14px Arial, Sans-Serif";
	g.ctx.textAlign = "left";
	g.ctx.fillStyle = g.colours[rnd(g.colours.length)-1];
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

function playerPlatforms()
{
	var o = m.player;
	if (o.jumping) return;
	if (o.dying) return;
	var feet = false;
	var p = null;
	for (var a=0;a<m.platforms.length;a++)
	{
		p = m.platforms[a];
		var o2 = o.y + o.h;
		if (o2 >= p.y && o2 < (p.y + p.spritesheet.frameheight) && o.x >= (p.x - (o.w/2)) && (o.x + o.w) < (p.x + p.spritesheet.width + (o.w/2)))
		{
			feet = true;
			break;
		}
	}
	if (feet)
	{
		o.y = p.y - o.h;
		o.falling = false;
	} else {
		o.falling = true;
		o.ymod = 8;
	}
};

function drawFloor()
{
	return;
	g.ctx.fillStyle = "#bf0000";
	g.ctx.fillRect(0,g.floor+m.player.h,g.canvaswidth,8);
};

function drawJumppad(o)
{
	try
	{
		if (isNaN(o.frame)) o.frame = o.startframe;
		if (isNaN(o.framedelay)) o.framedelay = 0;
		o.framedelay --;
		if (o.framedelay < 0)
		{
			o.framedelay = o.framedelaymax;
			o.frame ++;
			if (o.frame >= (o.startframe + o.spritesheet.framesperdirection))
			{
				o.frame = o.startframe;
			}
		}
		g.ctx.drawImage(o.spritesheet.image, o.frame * o.spritesheet.framewidth, 0, o.spritesheet.framewidth, o.spritesheet.frameheight, o.x, o.y, o.spritesheet.framewidth, o.spritesheet.frameheight);
	}
	catch (e)
	{
		write("Draw Jumppad: " + e.message);
	}

};

function drawKeys(o)
{
	if (!o.visible) return;
	try
	{
		if (isNaN(o.frame)) o.frame = o.startframe;
		if (isNaN(o.framedelay)) o.framedelay = 0;
		o.framedelay --;
		if (o.framedelay < 0)
		{
			o.framedelay = o.framedelaymax;
			o.frame ++;
			if (o.frame >= (o.startframe + o.spritesheet.framesperdirection))
			{
				o.frame = o.startframe;
			}
		}
		g.ctx.drawImage(o.spritesheet.image, o.frame * o.spritesheet.framewidth, 0, o.spritesheet.framewidth, o.spritesheet.frameheight, o.x, o.y, o.spritesheet.framewidth, o.spritesheet.frameheight);
	}
	catch (e)
	{
		write("Draw Keys: " + e.message);
	}

};


function drawSky()
{
	try
	{
		g.ctx.fillStyle = "#1B1A34";
		g.ctx.fillRect(0,0,g.canvaswidth,315);
		if (g.mode == "title")
		{
			g.ctx.drawImage(g.gameback[0],0,228);
		} else {
			var b = g.lap; if (b > 3) b = 3;
			g.ctx.drawImage(g.gameback[b-1],0,228);
		}
		if (m.player.dying)
		{
			g.ctx.fillStyle = "#000";
			g.ctx.fillRect(0,408,g.canvaswidth,100);
		}
		
	}
	catch (e)
	{
		write("Draw sky: " + e.message);
	}
};

function drawAir()
{
	var pc = Math.round((m.player.air / 100) * 100);
	var bar = Math.round((g.canvaswidth - 60) * (pc / 100));
	if (m.player.air > 20)
	{
		g.ctx.fillStyle = g.colours[Math.round((m.player.air/12)-1)];
	} else {
		g.ctx.fillStyle = g.colours[rnd(g.colours.length)-1];
	}
	g.ctx.fillRect(48,54,bar,12);
	writeText(textdata[5],8,58,16,SCOREFONT);
};

/** ---------------------------------------------------------------- **/
/** ---------------------------------------------------------------- **/

function loop()
{
	try
	{
		clearTimeout(g.ticker);
		g.ctx.save();
		//g.ctx.clearRect(0, 0, g.canvaswidth, g.canvasheight-120);

		switch (g.mode)
		{
			case "splash":
				g.ctx.drawImage(g.splash,0,0);
				g.resetting --;
				if (g.resetting < 1) 
				{ 
					setTitle();
					g.ctx.fillStyle = "rgb(0,0,0)";
					g.ctx.fillRect(0,0,g.canvaswidth,g.canvasheight);
				}
			break;
			case "title":
				drawSky();
				hiScore();
				g.ctx.drawImage(g.titlescreen,(g.canvaswidth/2)-160,0);
				writeText(textdata[1],64,260,22,SCOREFONT);
			break;
			case "pregame":
				drawSky();
				drawAir();
				for (var a=0;a < m.platforms.length;a++)
				{
					drawPlatform(m.platforms[a]);
				}

				drawFloor();
				drawJumppad(m.jumppad);

				for (var a=0;a < m.keys.length;a++)
				{
					drawKeys(m.keys[a]);
				}

				if (!playerPlatforms()) m.player.falling;
				
				for (var a=0;a < m.aliens.length;a++)
				{
					drawAlien(m.aliens[a]);
				}

				//movePlayer(m.player);
				drawPlayer(m.player);
				g.resetting --;
				if (g.resetting < 1) 
				{ 
					g.mode = "game";
				}
				writeText(textdata[0],80,200,32,SCOREFONT);
				updateScore();
				playerLives();
			break;
			case "game":
				drawSky();
				drawAir();
				if (!m.player.dying && g.pausemode < 1) { m.player.air -= ((g.lap > 3 ? 3 : g.lap) * 0.035); if (m.player.air < 0) playerDeath(); }
				if (g.nextthink > 0) g.nextthink --;

				for (var a=0;a < m.platforms.length;a++)
				{
					drawPlatform(m.platforms[a]);
				}

				drawFloor();
				drawJumppad(m.jumppad);

				for (var a=0;a < m.keys.length;a++)
				{
					drawKeys(m.keys[a]);
					keyPlayerCollision(m.keys[a],m.player);
				}

				if (m.player.dying)
				{
					g.resetting --;
					if (g.resetting < 1)
					{
						if (m.player.lives < 1)
						{
							g.banad.style.display = "block";
							g.mode = "gameover";
							g.resetting = 80;
						} else {
							m.player.visible = true;
							m.player.dying = false;
							g.mode = "pregame";
							//setLevel();
							playerStart();
							g.resetting = 30;
						}
					}
				}

				if (!playerPlatforms()) m.player.falling;
	
				if (g.lasercooldown < 1)
				{
					//spawnLaser(m.player.x + (m.player.w / 2) - 2, m.player.y - 8);
					g.lasercooldown = 12;
				} else {
					g.lasercooldown --;
				}

				spawnFireSwirl();
				moveFireSwirl(m.fireswirl);
				drawFireSwirl(m.fireswirl);
				bonusPlayerCollision(m.fireswirl,m.player);

				/*
				for (var a=0;a < m.lasers.length;a++)
				{
					moveLaser(m.lasers[a]);
					drawLaser(m.lasers[a]);
					alienMissileCollision(m.lasers[a]);
				}
				*/
				for (var a=0;a < m.aliens.length;a++)
				{
					moveAlien(m.aliens[a]);
					drawAlien(m.aliens[a]);
					alienPlayerCollision(m.aliens[a],m.player);
				}
				/*
				for (var a=0;a < m.explosion.length;a++)
				{
					move(m.explosion[a]);
					draw(m.explosion[a]);
				}
				/*
				for (var a=0;a<m.alienbomb.length;a++)
				{
					move(m.alienbomb[a]);
					draw(m.alienbomb[a]);
					alienBombCollision(m.alienbomb[a],m.player);
				}
				*/
				for (var a=0;a < m.textsprites.length;a++)
				{
					moveTextSprite(m.textsprites[a]);
					drawTextSprite(m.textsprites[a]);
				}
	
				movePlayer(m.player);
				drawPlayer(m.player);

				updateScore();
				playerLives();
			break;

			case "landscape":
			break;
			case "levelup":
				drawSky();
				if (m.player.air < 100) m.player.air += 2;
				drawAir();
				g.resetting --;
				if (g.resetting < 1)
				{
					setLevel();
					playerStart();
					g.mode = "pregame";
					g.resetting = 50;
				}
				for (var a=0;a < m.platforms.length;a++)
				{
					drawPlatform(m.platforms[a]);
				}
				writeText(textdata[4],64,200,28,SCOREFONT);
				writeText(textdata[6] + " = " + g.levelbonus,64,240,22,SCOREFONT);
				updateScore();
				playerLives();
				for (var a=0;a < m.textsprites.length;a++)
				{
					moveTextSprite(m.textsprites[a]);
					drawTextSprite(m.textsprites[a]);
				}
			break;
			case "gameover":
				drawSky();
				writeText(textdata[3],80,200,32,SCOREFONT);
				g.resetting --;
				if (g.resetting < 1)
				{
					setTitle();
				}
				updateScore();
			break;
		}
		if (g.mode != "splash" && g.mode != "title") g.ctx.drawImage(g.playpause, g.pausemode * 32, 0, 32, 32, 8, 8, 32, 32);
		//g.ctx.drawImage(g.volumecontrol, g.audiomode * 32, 0, 32, 32, 72, 8, 32, 32);

		if (g.ori != 0) { 
			g.ctx.fillStyle = "rgba(0,0,0,0.5)";
			g.ctx.fillRect(0,184,g.canvaswidth,40);
			writeText(textdata[2],24,200,16,"Orbitron"); 
			g.pausemode = 1;
		}
		
		//testFPS();
		g.ticker = setInterval("loop()", g.framedelay);
		
		g.ctx.restore();
	}
	catch (e)
	{
		write("Loop: " + e.message);
	}
};

// Redundant until I figure it out //
window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       || 
              window.webkitRequestAnimationFrame || 
              window.mozRequestAnimationFrame    || 
              window.oRequestAnimationFrame      || 
              window.msRequestAnimationFrame     || 
              function(/* function */ callback, /* DOMElement */ element){
                window.setTimeout(callback, 1000 / 60);
              };
    })();

function playerLives()
{
	var o = m.player;
	for (var a=0;a<m.player.lives;a++)
	{
		g.ctx.drawImage(o.spritesheet.image, 0, 0, o.w, o.h, (g.canvaswidth-100)+(a * 18), 16, 16, 16);
	}
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
		//if (c) writeText(s,220,g.canvasheight - 128,20,SCOREFONT);
		if (isNaN(g.testy)) g.testy = 0;
		if (isNaN(g.ave)) g.ave = 0;
		if (g.mode == "game" && g.testy < 20) 
		{ 
			g.testy ++; g.ave += c; 
			//if (g.testy >= 10)
			//{
			//	if (g.ave > 1000) g.framedelay = 42; // throttle the fast devices
			//}
		} else {
			var s2 = new String(g.ave/20);
			writeText(s2, 128,128,30,SCOREFONT);
		}
	}
	catch (e)
	{
		write(e.message);
	}
};

function spawnTextSprite(o,t)
{
	for (var a=0;a<m.textsprites.length;a++)
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
			break;
		}
	}
};

function spawnTextSpriteXY(x,y,t)
{
	for (var a=0;a<m.textsprites.length;a++)
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

function spawnExplosion(o,d,sp)
{
	for (var a=0;a<m.explosion.length;a++)
	{
		if (!m.explosion[a].visible)
		{
			var e = m.explosion[a];
			e.visible = true;
			e.direction = d;
			e.x = o.x;
			e.y = o.y;
			e.speed = 0.1;
			e.frame = 0;
			break;
		}
	}
};

function spawnExplosionXY(x,y,d,sp)
{
	for (var a=0;a<m.explosion.length;a++)
	{
		if (!m.explosion[a].visible)
		{
			var e = m.explosion[a];
			e.visible = true;
			e.direction = d;
			e.x = x;
			e.y = y;
			e.speed = sp;
			e.frame = 0;
			break;
		}
	}
};

function spawnAlien(x,y,d,sp,hp,r)
{
	for (var a=0;a<m.aliens.length;a++)
	{
		if (!m.aliens[a].visible)
		{
			var e = m.aliens[a];
			e.visible = true;
			e.direction = d;
			e.w = e.spritesheet.framewidth;
			e.h = e.spritesheet.frameheight;
			e.x = x;
			e.y = y;
			e.originx = x;
			e.originy = y;
			e.killed = false;
			e.targetx = x;
			e.targety = y;
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
			e.diving = false;
			e.divestage = 0;
			e.mod = 0; 
			e.moddir = "right";
			g.aliensarray.push(e);
			break;
		}
	}
};

function spawnFireSwirl()
{
	var e = m.fireswirl;
	if (m.player.dying || e.visible) return;
	if (rnd(1000) > 40) return;
	e.visible = true;
	if (rnd(100) <= 49)
	{
		e.x = -24;
		e.direction = 2;
	} else {
		e.x = g.canvaswidth;
		e.direction = 6;
	}
	e.y = 80 + rnd(200);
	e.speed = 2;
	e.w = e.spritesheet.framewidth;
	e.h = e.spritesheet.frameheight;
	e.angle = 0;
	e.frame = 0;
	e.startframe = 0;
	e.framedelay = e.spritesheet.framedelay;
	e.framedelaymax = e.framedelay;
	e.nextthink = 16 + rnd(32);
	e.nextthinkmax = e.nextthink;
	e.moddir = 0;
	e.row = rnd(2)-1;
};



function spawnEntityChance(o)
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

function spawnEntity(x,y,row)
{
	for (var a=0;a<m.entity.length;a++)
	{
		if (!m.entity[a].visible)
		{
			var s = m.entity[a];
			s.visible = true;
			s.x = x;
			s.y = y;
			s.direction = 4;
			s.speed = g.roadspeed;
			s.dying = 0;
			s.row = row;
			break;
		}
	}
};

function spawnAlienBomb(o)
{
	if (rnd(500) > (g.level * 3)|| !o.visible || g.pausemode > 0 || !o.diving || o.y > (g.canvasheight - 140) 
		|| (o.x + o.w) < 0 || o.x > g.canvaswidth) return;
	var d = 4;  
	for (var a=0;a<m.alienbomb.length;a++)
	{
		if (!m.alienbomb[a].visible)
		{
			var s = m.alienbomb[a];
			s.visible = true;
			s.direction = d;
			s.x = o.x + (o.w/2);
			s.y = o.y + (o.h/2);
			s.spawny = o.y + 16;
			s.decay = 0;
			s.opacity = 1;
			s.row = 0;
			s.xmod = 0;
			s.speed = 8;
			if (g.level > 6 && rnd(100) < 49 && o.y < (g.canvasheight - 180))
			{
				s.speed = (g.level / 2) + 2;
				s.row = 1;
				calculateMods(o,m.player,s);
			}
			break;
		}
	}
};

function calculateModsAlien(a)
{
	var steps = (a.ghosty - (a.y + a.h)) / a.speed;
	var gx = a.ghostx; //a.divestage == 2 ? m.player.x : a.ghostx;
	a.xmod = (gx - a.x) / steps;
};

function calculateMods(a,p,o)
{
	var steps = ((p.y + p.h) - (a.y + a.h)) / o.speed;
	o.xmod = (p.x - a.x) / steps;
};

function spawnLaser(x,y)
{
	try
	{
		if (m.player.dying) return;
		for (var a=0;a<m.lasers.length;a++)
		{
			if (!m.lasers[a].visible)
			{
				var s = m.lasers[a];
				s.visible = true;
				s.x = x;
				s.y = y;
				s.speed = 16;
				s.dead = false;
				s.damage = 1;
				var c1 = 100 + rnd(155);
				var c2 = 100 + rnd(155);
				var c3 = 100 + rnd(155);
				s.color = "255,255,255";
				g.shotsfired ++;
				break;
			}
		}
	}
	catch (e)
	{
		write("SpawnLaser: " + e.message);
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
		
		writeText(s,80,26,28,SCOREFONT)
		
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
		m.player.score += 10;
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

		for (var a = 0; a < (8-ls); a++) s += "0";
		for (var b = 0; b < sInScore.length; b++) s += "" + sInScore.substring(b,b+1);
		
		writeText(s,80,26,28,SCOREFONT)
		
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
			m.player.moveleft = false; 
			m.player.moveright = true;
			m.player.spritedirection = 2;
			break;
		case 37: // Left
			m.player.moveleft = true; 
			m.player.moveright = false;
			m.player.spritedirection = 6;
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
			if (g.mode == "title") setGame();
			if (!m.player.jumping && !m.player.falling)
			{
				m.player.jumping = true;
				m.player.ymod = 8;
			}
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
		case 37: // Left
			m.player.moveleft = false; 
			m.player.moveright = false;
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

