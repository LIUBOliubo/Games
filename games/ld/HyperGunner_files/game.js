
/*
	HyperGunner
	An HTML5 game by Mark Wilcox
	(C) Mark Wilcox
*/

var GAMETITLE = "HYPERGUNNER";
var SCOREFONT = "Arial, Sans-Serif";
var IPHONEHACK = true;
var ISPORTRAIT = true;

/*
	-- AJAX ----------------------------------------------------------------------------
*/

var AJAX = {
	"user" : "mark",
	"pass" : "",
	"gameId" : "",
	"playerId" : "",
	"ts" : "",
	"score" : "",
	"url" : "senddata.php"
};

function getData()
{
	AJAX.gameId = "";
	AJAX.playerId = "";
	g.displayBanner = 0;
	g.qs = window.location.search.substring(1).split("&");
	for (var a=0;a < g.qs.length;a++)
	{
		var s = g.qs[a].split("=");
		write(s[0] + " = " + s[1]);
		switch(s[0])
		{
			case "banner":
				g.displayBanner = s[1];
				break;
			case "gameId":
				AJAX.gameId = s[1];
				break;
			case "playerId":
				AJAX.playerId = s[1];
				break;
		}
	}
};

function postData()
{
	AJAX.ts = g.time;
	AJAX.score = m.player.score;

	$.ajax({
		url: AJAX.url,
		type: "get",
		data: "user=" + AJAX.user + "&pass=" + AJAX.pass + "&gameId=" + AJAX.gameId + "&playerId=" + AJAX.playerId + "&ts=" + AJAX.ts + "&score=" + AJAX.score,
		success: function(msg){
			write("Data Sent Successfully !");
		},
		error: function(jqXHR, textStatus, errorThrown) {
			write("Send error: " + jqXHR);
			write("Send error (" + textStatus + "): " + errorThrown);
		}
	});

	write("SENT user = " + AJAX.user);
	write("SENT pass = " + AJAX.pass);
	write("SENT gameId = " + AJAX.gameId);
	write("SENT playerId = " + AJAX.playerId);
	write("SENT ts = " + AJAX.ts);
	write("SENT score = " + AJAX.score);
};

/*
	------------------------------------------------------------------------------------
*/

var g = {}; // Define the global namespace.
g.characterset = new Image(); g.characterset.src = "library/characterset.gif";

var m = { // Game media namespace.
	spritesheets : [],
	player : null,
	monster : [],
	numbers : null,
	explosion : [],
	playermissile : [],
	spark : [],
	entity : [],
	alienbomb : []
};

var stars = [];
var gameaudio = []; 

g.checkSum = gamedata.imageFiles.length; // + gamedata.audioFiles.length;
g.checkCount = 1;
g.imageData = [];
g.audioData = [];

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
		stars[a] = new star("star"+a, rnd(g.canvaswidth), rnd(g.canvasheight), 4, rnd(4)+1, 4, g.colours[rnd(g.colours.length)-1]); 
	}
};

function createSprites()
{
	// Load game media
	for (var a=0;a<imglib.length;a++)
	{
		m.spritesheets[imglib[a].sheetname] = new spritesheet(imglib[a]);
	}
	g.titlescreen = new Image(); g.titlescreen.src = "library/titlescreen.png";
	g.gamebackdrops = [];
	g.gamebackdrops[0] = new Image(); g.gamebackdrops[0].src = "library/gamebackdrop.gif";
	g.gamebackdrops[1] = new Image(); g.gamebackdrops[1].src = "library/earth.gif";
	g.playericon = new Image(); g.playericon.src = "library/playericon.png";
	g.staricon = new Image(); g.staricon.src = "library/staricon.png";
	g.gameover = new Image(); g.gameover.src = "library/gameover.png";
	g.levelicon = new Image(); g.levelicon.src = "library/level.png";
	g.hiscore = new Image(); g.hiscore.src = "library/hiscore.png";
	g.levelcomplete = new Image(); g.levelcomplete.src = "library/levelcomplete.png";
	g.playpause = new Image(); g.playpause.src = "library/playpause.png";
	g.pregame = new Image(); g.pregame.src = "library/pregame.png";
	g.notportrait = new Image(); g.notportrait.src = "library/notportrait.png";
	g.volumecontrol = new Image(); g.volumecontrol.src = "library/volumecontrols.png";
	g.levelflag = new Image(); g.levelflag.src = "library/levelflag.png";
	g.splash = new Image(); g.splash.src = "library/splash.png";

	m.player = new sprite("player", "player", m.spritesheets["playersheet"], 0, 0, 8, 4, 1);
	m.player.hiscore = 0;
	
	m.starfighter = new sprite("starfighter", "starfighter", m.spritesheets["starfightersheet"], 0, 0, 1, 4, 1);

	m.numbers = new sprite("numbers", "numbers", m.spritesheets["numberssheet"], 0, 0, 0, 0, 1);
	for (var a=0;a<8;a++) m.alienbomb[a] = new sprite("alienbomb"+a, "alienbomb", m.spritesheets["alienbombsheet"], 0, 0, 2, 0, 0);
	for (var a=0;a<48;a++) m.monster[a] = new sprite("monster"+a, "monster", m.spritesheets["monstersheet"], 0, 0, 2, 0, 0);
	for (var a=0;a<16;a++) m.explosion[a] = new sprite("explosion"+a, "explosion", m.spritesheets["explosionsheet"], 0, 0, 2, 0, 0);
	for (var a=0;a<8;a++) m.entity[a] = new sprite("entity"+a, "entity", m.spritesheets["entitysheet"], 0, 0, 0, 0, 0);
	for (var a=0;a<96;a++) m.spark[a] = new sprite("spark"+a, "spark", m.spritesheets["sparksheet"], 0, 0, 2, 0, 0);
	for (var a=0;a<32;a++) m.playermissile[a] = new sprite("playermissile"+a, "playermissile", m.spritesheets["playermissilesheet"], 0, 0, 8, 0, 0);

	initTouch();
	initHiScore();
	setSplash();

	g.ticker = setTimeout("loop()", 0);
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
		//write(a + " " + gamedata.imageFiles[a] + " of " + g.checkSum);
		g.imageData[a].onload = check;
	}

	/*soundManager.url = 'soundmanager2.swf';
	soundManager.useHTML5Audio = true;
	soundManager.onready(function() {
		soundManager.defaultOptions.autoLoad = true;
		soundManager.defaultOptions.onload = check;
			if (soundManager.supported()) {
				soundManager.debugMode = false;
				for (var a=0;a<gamedata.audioFiles.length;a++)
				{
					gameaudio[gamedata.audioFiles[a].name] = soundManager.createSound( 
						{
							id:gamedata.audioFiles[a].name, 
							url:gamedata.audioFiles[a].path,
							volume:gamedata.audioFiles[a].volume, 
							onfinish: gamedata.audioFiles[a].repeat ? function(){ this.play(); } : null
						}
					); 
				}
			}
		}
	);*/

};

function check() {
	g.checkCount ++;
	var pc = Math.round((g.checkCount / g.checkSum) * 100);
	var bar = Math.round(g.canvaswidth * (pc / 100));
	g.ctx.clearRect(160,150,32,16);
	g.ctx.fillStyle = "rgb(16,16,16)";
	g.ctx.fillRect(0,200,g.canvaswidth,16);
	g.ctx.fillStyle = "rgb(80,80,80)";
	g.ctx.fillRect(0,200,bar,16);
	if (g.checkCount >= g.checkSum)
	{
		createSprites();
	}
};


function init()
{
	try
	{
		g.canvas = document.querySelector('canvas');
		g.ctx = g.canvas.getContext('2d');
		g.canvas.setAttribute('class', 'canvas');

		g.banad = document.getElementById("banad");

		g.canvaswidth = 320;
		g.canvasheight = 460;
		g.canvaspadding = 32;

		g.ori = 0;

		setResolution();
		setCanvasDimensions();
		g.canvas.style.backgroundColor = "#142760";

		g.nextthink = 0;

		g.console = document.getElementById('console');
		g.console.style.display = 'none';
		g.console.style.textAlign = 'left';
		write("Console ready.");
		BrowserDetect.init();
		write("Browser: " + BrowserDetect.browser + " " + BrowserDetect.version);
		write("OS: " + BrowserDetect.OS);
		write("Language: " + BrowserDetect.Language);

		var br = new String(BrowserDetect.OS);
		g.framedelay = 30;
		g.ISIPHONE = false;
		if (br.indexOf("iPhone") != -1)
		{
			//if (IPHONEHACK) { g.framedelay = 0; }
			g.ISIPHONE = true;
		}

		g.thousandseparator = textformat.thousandseparator;
		g.banad.style.display = "none";
		pickAdURL();

		g.pausemode = 0;
		g.audiomode = 1;

		window.scrollTo(0,0)

		preCache();
	}
	catch (e)
	{
		write("!!"+e.message);
	}
};

function setResolution()
{
	var w = 0;
	var h = 0;

	if(document.all){
		h = document.body.offsetHeight;
		w = document.body.offsetWidth;
	}
	else
	{
		h = innerHeight;
		w = innerWidth;
	}

	g.canvaswidth = 320;
	g.canvasheight = 480;

	/*
	// force resolution on larger devices
	if (w > 640) 
	{
		var pc = (h / w);
		w = 640;
		h = Math.round(w * pc);
	}

	// avoid splitting integers
	if (w % 2 > 0) w ++;
	if (h % 2 > 0) h ++;

	if (ISPORTRAIT)
	{
		if (w > h)
		{
			g.canvaswidth = h;
			g.canvasheight = w;
		} else {
			g.canvaswidth = w;
			g.canvasheight = h;
		}
	} else {
		if (h > w)
		{
			g.canvaswidth = h;
			g.canvasheight = w;
		} else {
			g.canvaswidth = w;
			g.canvasheight = h;
		}
	}		
	*/
};

function setCanvasDimensions(e)
{
	g.canvaspadding = 32;
	g.displaypadding = 0;
	if (typeof(window.orientation)!="undefined")
	{
		g.ori = window.orientation; // 0, -90 or 90
	}

	g.canvas.width = g.canvaswidth;
	g.canvas.height = g.canvasheight;

	g.textcentre = g.canvaswidth / 2;
	g.canvascentre = g.canvasheight / 2;

	window.scrollTo(0,1);
};

function initTouch()
{
	if(checkForTouch()) {
		if (document.body.addEventListener)
		{
			document.body.addEventListener('touchmove', touchMove, false);
			document.body.addEventListener('touchstart', touchStart, false);
		} else {
			window.addEventListener('touchmove', touchMove, false);
			window.addEventListener('touchstart', touchStart, false);
		}
	} else {
		window.addEventListener('mousemove', mouseMove, false);
		window.addEventListener('mouseup', mouseUp, false);
	}
};

function initHiScore()
{
	m.player.hiscore = 0;
	if (typeof localStorage.key == "function")
	{
		if (localStorage.getItem(GAMETITLE + "-hiscore") != null)
		{
			m.player.hiscore = localStorage.getItem(GAMETITLE + "-hiscore");
		}
	}
};

function sfx(o)
{
	return;
	if (g.audiomode > 0)
	{
		o.play();
	}
};

function handleAudio()
{
	if (g.audiomode < 1)
	{
		soundManager.pauseAll();
	} else {
		soundManager.resumeAll();
	}
};

function checkForTouch() {		
	var d = document.createElement("div");
	d.setAttribute("ontouchmove", "return;");
	return typeof d.ontouchmove == "function" ? true : false;
};

function touch(event) {
	if (g.mode == "title" && g.resetting < 70) setGame();
	if (g.mode == "pregame") { setLevel(); g.mode = "levelup"; }

	var o = m.player;
	var tx = (event.pageX - (g.canvas.offsetParent ? g.canvas.parentNode.offsetLeft : 0)) - (o.w / 2);
	var ty = (event.pageY - (g.canvas.offsetParent ? g.canvas.parentNode.offsetTop : 0)) - (o.h / 2);
	if (g.pausemode < 1)
	{
		o.x = tx;
	}

	if (tx < 32 && ty < 32) g.pausemode ++; if (g.pausemode > 1) g.pausemode = 0;
	//if (tx < 72 && (ty > 96 && ty < 140)) 
	//{
	//	g.audiomode ++; if (g.audiomode > 1) g.audiomode = 0;
	//	handleAudio();
	//}
};

function touchStart(event) {
	touch(event.touches[0]);
	window.scrollTo(0, 1);
	spawnLaser(m.player);
	event.preventDefault();
};

function touchMove(event) {
	touch(event.touches[0]);
	spawnLaser(m.player);
};

function mouseMove(event) {
	touch(event);
	spawnLaser(m.player);
};

function mouseUp(event) {
	spawnLaser(m.player);
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
	g.resetting = 80;
	g.canvas.style.backgroundImage = "none";
	g.canvas.style.backgroundColor = "#142760";
	g.banad.style.display = "block";
};

function setGame()
{
	g.banad.style.display = "none";
	g.mode = "pregame";
	g.canvas.style.backgroundImage = "none";
	g.canvas.style.backgroundColor = "#142760";
	g.time = new Date();
	m.player.score = 0;
	m.player.targetscore = 0;
	m.player.lives = 3;
	m.player.gunmode = 0;
	g.level = 1;
	g.levelwave = 0;
	g.wavetype = 0;
	g.resetting = 1000;
	g.levelwavemultiplier = 2;
	g.warplength = 200;
	g.saucermode = 0;
	m.player.energy = 0;
	m.player.milestohome = 20000000000;
	m.player.totalstars = 0;
	createStars();
	g.extralife = 0;

	sfx(gameaudio["titlemusic"]);
};

function endGame()
{
	g.mode = "endgame";		
	m.starfighter.x = (g.canvaswidth / 2) - (m.starfighter.w / 2);
	m.starfighter.y = -28;
	m.starfighter.row = 0;
};

function finallyHome()
{
	g.canvas.style.backgroundImage = "url('" + g.gamebackdrops[1].src + "')";
	g.canvas.style.backgroundRepeat = "no-repeat";
	g.canvas.style.backgroundColor = "#00cc00";
	g.mode = "finallyhome";		
	m.starfighter.x = (g.canvaswidth / 2) - (m.starfighter.w / 2) - 32;
	m.starfighter.y = -28;
	m.starfighter.row = 1;
	wipe(true);
};

function setStars()
{
	for (var a=0;a<stars.length;a++) 
	{ 
		stars[a].x = rnd(g.canvaswidth);
		stars[a].y = rnd(g.canvasheight); 
		stars[a].speed = stars[a].basespeed;
	}
};

function setLevel()
{
	g.mode = "levelup";
	g.miles = thousandSeparator(m.player.milestohome, g.thousandseparator);
	wipe(true);
	g.resetting = 100;
	g.levelwave = 0;
	setStars();
	m.player.scoremultiplier = 1;
	playerStart();
};

function setLandscape()
{
	g.oldmode = g.mode;
	g.mode = "landscape";
};

function playerStart()
{
	if (g.level < 2)
	{
		m.player.x = g.canvaswidth / 2 - (m.player.w / 2);
		m.player.y = g.canvasheight - 102;
		m.player.basex = m.player.x;
		m.player.basey = m.player.y;
		m.player.targetx = m.player.x;
		m.player.targety = m.player.y;
	}
	m.player.health = 100;
	m.player.stars = 0;
	m.player.magicpower = 0;
	m.player.row = 0;
	m.player.lasercooldown = 0;
	m.player.lasercooldownmax = 5;
	m.player.aliencount = 0;
	m.player.speed = 8;
	g.saucermode = 0;
	g.hyperdrive = 0;
};

function setAliens()
{
	var aa = [];
	var l = (g.level > leveldata.length) ? 0 : g.level-1;
	aa = leveldata[l].aliens.split(",");
	var c = 0;
	m.player.aliencount = 0;
	g.levelaliens = 0;
	if (g.wavetype != 0)
	{
		for (var row=0;row<2;row++)
		{
			for (var a=0;a<4;a++)
			{
				var x = ((g.canvaswidth / 2) - 80) + (a * 40);
				var y = 128 + (row * 40); 
				var d = 0;
				switch (g.wavetype)
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
				}
				var s = 2;
				var f = 0;
				var ty = -1;
				var hp = g.level;
				spawnMonster(x,y,d,s,f,1,rnd(5)+1,hp);
				c ++;
				g.levelaliens ++;
			}
		}
		sfx(gameaudio["regen"]);
	} else {
		for (var a=0;a < 16;a++)
		{
			var x = g.canvaswidth / 2;
			var y = (a * 64) * -1;
			var d = 4;
			var s = 4;
			var f = 0;
			var ty = 1;
			var hp = 2;
			spawnMonster(x,y,d,s,f,1,rnd(5),hp);
			c ++;
			g.levelaliens ++;
		}
	}
	g.wavetype ++; if (g.wavetype > 6) g.wavetype = 0;
};

function wipe(doentities)
{
	for (var a=0;a<m.explosion.length;a++) m.explosion[a].visible = false;
	for (var a=0;a<m.monster.length;a++) m.monster[a].visible = false;
	for (var a=0;a<m.alienbomb.length;a++) m.alienbomb[a].visible = false;
	for (var a=0;a<m.playermissile.length;a++) m.playermissile[a].visible = false;
	if (doentities) for (var a=0;a<m.entity.length;a++) { if (m.entity[a].row == 0) { m.entity[a].visible = false; m.entity[a].x = -32; m.entity[a].y = -32; sparkShower(m.entity[a]); } }
};

function playerDeath()
{
	m.player.dying = 40;
	g.wavetype --;
	m.player.gunmode = 0;
	m.player.lives --;
	m.player.energy = 0;
};

/* -- Game control routines -- */

function drawPlayer(o)
{
	if (!o.visible) return;
	if (o.magicpower > 0) { o.magicpower --; } else { o.row = 0; }
	try
	{
		if (isNaN(o.attacking)) o.attacking = 0;
		if (o.attacking > 0)
		{
			o.attacking --;
			o.frame = o.spritesheet.attackframe;
		} else {
			g.ctx.save();
			if (o.dying > 0)
			{
				o.angle += 45; if (o.angle > 360) o.angle = 0;
				g.ctx.translate(o.x + (o.w/2),o.y + (o.h/2));
				spawnExplosion(o,1,rnd(3));
				g.ctx.rotate(o.angle * (Math.PI / 180));
				g.ctx.drawImage(o.spritesheet.image, o.frame * o.spritesheet.framewidth, 0, o.w, o.h, -o.w/2, -o.h/2, o.w, o.h);
				o.dying --;
				if (o.dying < 1)
				{
					if (m.player.lives < 1)
					{
						g.mode = "gameover";
						g.miles = thousandSeparator(m.player.milestohome, g.thousandseparator)
						g.resetting = 100;
						g.banad.style.display = "block";
						g.time = new Date() - g.time;
					} else {
						setLevel();
					}
				}
			} else {
				if (o.targetx < 0 && o.targety < 0) getDirection(o);
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
					if (o.magicpower > 0 && o.magicpower < 50)
					{
						o.row ++; if (o.row > 1) o.row = 0;
					}
				}
				if (o.inpain > 0) { o.frame = o.spritesheet.painframe; o.inpain --; }

				g.ctx.drawImage(o.spritesheet.image, o.frame * o.spritesheet.framewidth, o.row * o.spritesheet.frameheight, o.w, o.h, o.x, o.y, o.w, o.h);
			}
			g.ctx.restore();
		}
	}
	catch (e)
	{
		write(o.frame + " - " + e.message);
	}

};

function draw(o)
{
	if (!o.visible) return;
	try
	{
		if (o.decay > 0) { o.decay --; if (o.decay < 1) { remove(o); sparkShower(o); } }
		if (isNaN(o.attacking)) o.attacking = 0;
		if (o.attacking > 0)
		{
			o.attacking --;
			o.frame = o.spritesheet.attackframe;
		} else {
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
						remove(o);
					} else {
						o.frame = o.startframe;
					}
				}
			}
		}
		if (o.inpain > 0) 
		{ 
			o.frame = o.spritesheet.painframe; 
			o.inpain --; 
			o.y += 4;
		}
		if (o.spritesheet.type == "playermissile") 
		{
			o.row = Math.round(m.player.gunmode);
			if (g.hyperdrive > 0) o.row = 5;
			}
		if (o.decay > 0 && o.decay < 50)
		{
			o.toggle ++; if (o.toggle > 1) o.toggle = 0;
			if (o.toggle < 1)
			{
				g.ctx.drawImage(o.spritesheet.image, o.frame * o.spritesheet.framewidth, o.row * o.spritesheet.frameheight, o.w, o.h, o.x, o.y, o.w, o.h);
			}
		} else {
			g.ctx.drawImage(o.spritesheet.image, o.frame * o.spritesheet.framewidth, o.row * o.spritesheet.frameheight, o.w, o.h, o.x, o.y, o.w, o.h);
		}
	}
	catch (e)
	{
		write(o.row + " - " + o.spritesheet.type + ", " + o.frame + " - " + e.message);
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

function getDirection(o)
{
	o.direction = -1;
	if (o.moveup)
	{
		o.direction = 0; o.angle = 0; 
		if (o.moveleft) { o.direction = 7; o.angle = 315; }
		if (o.moveright) { o.direction = 1; o.angle = 45; }
	}
	if (o.movedown)
	{
		o.direction = 4; o.angle = 180;
		if (o.moveleft) { o.direction = 5; o.angle = 225; }
		if (o.moveright) { o.direction = 3; o.angle = 135; }
	}
	if (o.moveleft)
	{
		o.direction = 6; o.angle = 270; 
		if (o.moveup) { o.direction = 7; o.angle = 315; }
		if (o.movedown) { o.direction = 5; o.angle = 225; }
	}
	if (o.moveright)
	{
		o.direction = 2; o.angle = 90; 
		if (o.moveup) { o.direction = 1; o.angle = 45; }
		if (o.movedown) { o.direction = 3; o.angle = 135; }
	}

	if (o.direction >= 0) o.lastdirection = o.direction;
};

function movePlayer(o)
{
	if (!o.visible || g.pausemode > 0) return;

	o.oldx = o.x;
	o.oldy = o.y;

	if (o.moveleft) 
	{
		o.direction = 6;
	} else if (o.moveright)
	{
		o.direction = 2;
	} else {
		o.direction = -1;
	}

	switch (o.direction)
	{
	case 2:
		o.x += o.speed;
		break;			
	case 6:
		o.x -= o.speed;
		break;			
	}
	if (o.x < 0) { o.x = o.oldx; o.moveleft = false; }
	if ((o.x + o.w) > g.canvaswidth) { o.x = o.oldx; o.moveright = false; }
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
		if (o.spritesheet.type == "entity")
		{
			if (o.y >= o.targety)
			{
				if (o.bounced == 0)
				{
					o.bounced = 3;
				} else {
					if (o.bounced > 1)
					{
						o.bounced --;
						o.y = o.y - (o.bounced * 4);
						o.speed = (o.bounced * -4);
					} else {
						o.speed = 0;
					}
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
					remove(o);
				}
			}
			if (o.bounced > 0) o.speed += 2;
			if (o.y < o.targety) { o.y += o.speed; }
		} else {
			if (o.targetx > o.x) { o.x += o.speed; }
			if (o.targetx < o.x) { o.x -= o.speed; }
			if (o.targety < o.y) { o.y -= o.speed; }
			if (o.targety > o.y) { o.y += o.speed; }
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

function move(o)
{
	if (!o.visible || g.pausemode > 0) return;

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
	if ((o.x + o.w) < 0) remove(o); 
	if (o.x > g.canvaswidth) remove(o); 
	if ((o.y - o.h) < 0 && o.spritesheet.type != "starfighter") remove(o); 
	if (g.mode == "finallyhome" && o.y > (g.canvasheight - 170))
	{
		g.mode = "landed";
	}
	if (o.y > g.canvasheight)  
	{
		if (g.mode == "endgame")
		{
			finallyHome();
		} else {
			remove(o);
		}
	}

};

function moveAlien(o)
{
	if (!o.visible || g.pausemode > 0) return;

	if ((g.wavetype-1) != 0)
	{
		o.nextthink --;
		if (o.nextthink < 1)
		{
			o.nextthink = o.basenextthink;
			if (o.row == 0)
			{
				o.direction = rnd(10) <= 5 ? 2 : 6;
			} else {
				changeDirection(o);
			}
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
	if (o.row == 0)
	{
		if ((o.x + o.w) > g.canvaswidth)
		{
			o.direction = 6;
		}
		if (o.x < 0)
		{
			o.direction = 2;
		}
	}
	if ((g.wavetype-1) == 0)
	{
		if (isNaN(o.mod)) { o.mod = 0; o.moddir = "right"; }
		if (o.moddir == "right")
		{
			o.x += o.mod;
			if ((o.x + o.mod) > (g.canvaswidth - o.w)) { o.mod = 0; o.moddir = "left"; }
		} else {
			o.x -= o.mod;
			if ((o.x + o.mod) < (o.w)) { o.mod = 0; o.moddir = "right"; }
		}
		o.mod += o.moddir == "right" ? (((o.x > g.canvaswidth / 4) * 3) ? (g.canvaswidth-o.x)*-0.0001 : 0.05) : (o.x < g.canvaswidth / 4) ? (o.x)*-0.001 : 0.05;
		if (o.y > g.canvasheight) o.y = -32;
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

function changeRow(r,d)
{
	for (var a=0;a<m.monster.length;a++)
	{
		var b = m.monster[a];
		b.direction = (b.direction == 6) ? 2 : 6;
		b.y += 8;
	}
};

function throwStars(force,o)
{
	for (var a=0;a<m.player.stars;a++)
	{
		spawnEntityChance(force,o);
	}
};

function playerMonsterCollision(o) // Monster passed in
{
	if (!o.visible || o.dying || m.player.dead || g.pausemode > 0) return;

	var ox = o.x;
	var oy = o.y;
	var ow = o.w; 
	var oh = o.h; 

	var mx = m.player.x;
	var my = m.player.y;
	var mw = m.player.w;
	var mh = m.player.h;

	var c1 = false, c2 = false, c3 = false, c4 = false;
	
	if (ox <= (mx+mw)  &&  oy <= (my+mh)  &&  ox >= (mx)  && oy >= my) c1 = true;
	if ((ox+ow) >= mx  &&  oy >= my  &&  (ox+ow) <= (mx+mw)  &&  oy <= (my+mh)) c2 = true;
	if (ox <= (mx+mw)  &&  (oy+oh) >= my  &&  ox >= mx  &&  (oy+oh) <= (my+mh)) c3 = true;
	if (((ox + ow) >= mx) && ((ox + ow) <= (mx + mw)) && ((oy + oh) >= my) && ((oy + oh) <= (my + mh))) c4 = true; 

	if (c1 == true || c2 == true || c3 == true || c4 == true)
	{
		if (o.spritesheet.type == "monster")
		{
			remove(o);
			sparkShower(o);
			if (m.player.magicpower > 0)
			{
				m.player.targetscore += 10;
			} else {
				playerDeath();
			}
		} else {
			bootMonster(o);
		}
	}
};

function bootMonster(o)
{
	if (o.dying) return;
	m.player.targetscore += 10;
	o.speed = 32;
	sparkShower(o);
	remove(o);
};

function entityCollision(o,m) // Entity and Player passed in. Alien bombs are entities.
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

	var c1 = false, c2 = false, c3 = false, c4 = false;
	
	if (ox <= (mx+mw)  &&  oy <= (my+mh)  &&  ox >= (mx)  && oy >= my) c1 = true;
	if ((ox+ow) >= mx  &&  oy >= my  &&  (ox+ow) <= (mx+mw)  &&  oy <= (my+mh)) c2 = true;
	if (ox <= (mx+mw)  &&  (oy+oh) >= my  &&  ox >= mx  &&  (oy+oh) <= (my+mh)) c3 = true;
	if (((ox + ow) >= mx) && ((ox + ow) <= (mx + mw)) && ((oy + oh) >= my) && ((oy + oh) <= (my + mh))) c4 = true; 

	if (c1 == true || c2 == true || c3 == true || c4 == true)
	{
		if (m.spritesheet.type == "player")
		{
			if (o.spritesheet.type == "alienbomb")
			{
				if (m.magicpower < 1)
				{
					playerDeath();
				}
			} else {
				if (o.spritesheet.type = "entity")
				{
					switch (o.row)
					{
						case 0:
							playerDeath();
						break;
						case 1:
							m.totalstars ++;
							m.stars ++;
							m.targetscore += 10;
							if (g.hyperdrive < 1) m.energy += 4;
							if (m.energy > 100) 
							{
								g.hyperdrive = 1000;
								m.energy = 0;
								sfx(gameaudio["hyperdrive"]);
							}
						break;
						case 2:
							m.scoremultiplier += 0.1;
							if (m.scoremultiplier > 50) m.scoremultiplier = 50;
						break;
						case 3:
							m.gunmode += 0.1;
							if (m.gunmode > 5) m.gunmode = 5;
						break;
						case 4:
							m.gunmode += 0.2;
							if (m.gunmode > 5) m.gunmode = 5;
						break;
						case 5:
							m.targetscore += 50;
							if (g.hyperdrive < 1) m.energy += 16;
							if (m.energy > 100) 
							{
								g.hyperdrive = 1000;
								m.energy = 0;
								sfx(gameaudio['hyperdrive']);
							}
						break;
					}
					sfx(gameaudio['bonusitem']);
					m.targetscore += g.hyperdrive > 0 ? (o.row * (Math.round(m.scoremultiplier)*10)) * 2 : (o.row * (Math.round(m.scoremultiplier) * 10));
				}
			}
		} 
		remove(o);
	}
};

function alienBombCollision(o,m) // Entity and Player passed in. 
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

	var t = 8; 

	var c1 = false, c2 = false, c3 = false, c4 = false;
	
	if (ox <= (mx+(mw-t))  &&  oy <= (my+(mh-t))  &&  ox >= (mx+t)  && oy >= (my+t)) c1 = true;
	if ((ox+ow) >= (mx+t)  &&  oy >= (my+t)  &&  (ox+ow) <= (mx+(mw-t))  &&  oy <= (my+(mh-t))) c2 = true;
	if (ox <= (mx+(mw-t))  &&  (oy+oh) >= (my+t)  &&  ox >= (mx+t)  &&  (oy+oh) <= (my+(mh-t))) c3 = true;
	if (((ox + ow) >= (mx+t)) && ((ox + ow) <= (mx + (mw-t))) && ((oy + oh) >= (my+t)) && ((oy + oh) <= (my + (mh-t)))) c4 = true; 

	if (c1 == true || c2 == true || c3 == true || c4 == true)
	{
		remove(o);
		if (m.magicpower < 1)
		{
			playerDeath();
		}
	}
};

function monsterLaserCollision(o) // Laser passed in
{
	if (!o.visible || o.dying > 0 || g.pausemode > 0) return;

	var ox = o.x;
	var oy = o.y;
	var ow = o.w; 
	var oh = o.h; 

	for (var a=0;a<m.monster.length;a++)
	{
		var b = m.monster[a];
		if (b.visible)
		{
			var mx = b.x;
			var my = b.y;
			var mw = b.w;
			var mh = b.h;

			var c1 = false, c2 = false, c3 = false, c4 = false;
			
			if (ox <= (mx+mw)  &&  oy <= (my+mh)  &&  ox >= (mx)  && oy >= my) c1 = true;
			if ((ox+ow) >= mx  &&  oy >= my  &&  (ox+ow) <= (mx+mw)  &&  oy <= (my+mh)) c2 = true;
			if (ox <= (mx+mw)  &&  (oy+oh) >= my  &&  ox >= mx  &&  (oy+oh) <= (my+mh)) c3 = true;
			if (((ox + ow) >= mx) && ((ox + ow) <= (mx + mw)) && ((oy + oh) >= my) && ((oy + oh) <= (my + mh))) c4 = true; 

			if (c1 == true || c2 == true || c3 == true || c4 == true)
			{
				remove(o);
				b.hp -= (m.player.gunmode + 1);
				if (b.inpain < 1) b.y -= 8;
				b.inpain = 2;
				if (b.hp < 1)
				{
					remove(b);
					spawnExplosion(b,0,1);
					if (b.row == 0) g.saucermode = 0;
					sfx(gameaudio['explosion']);
					spawnEntityChance(true,b);
					if (b.row > 0)
					{
						m.player.aliencount ++;
						m.player.targetscore += 50 * m.player.scoremultiplier;
						if (m.player.aliencount >= g.levelaliens)
						{
							if ((g.wavetype-1) == 0) for (var a=0;a<m.monster.length;a++) m.monster[a].visible = false;
							g.levelwave ++;
							var mg = g.level * g.levelwavemultiplier;
							if (mg > 24) mg = 24;
							if (g.levelwave > mg)
							{
								for (var x=0;x<3;x++)
								{
									spawnEntity((b.x-32)+(x*32),b.y,(b.x-32)+(x*32),g.canvasheight - 64,3);
								}
								g.mode = "endlevel";
								g.resetting = g.warplength;
								sfx(gameaudio['wavecomplete']);
							} else {
								setAliens();
							}
						}
					}
				}
				m.player.lasercooldown = 0;
			}
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
	g.ctx.save();
	var ss = "";
	g.ctx.font = "normal "+s+"px '"+f+"', Sans-Serif";
	g.ctx.shadowOffsetX = 2;
	g.ctx.shadowOffsetY = 2;
	g.ctx.shadowBlur = 2;
	g.ctx.shadowColor = "rgba(0, 0, 0, 0.9)";
	g.ctx.textAlign = "center";
	g.ctx.fillStyle = "#ffffff";
	g.ctx.fillText(text, x,y+8);
	g.ctx.restore();
};


/** ---------------------------------------------------------------- **/
/** ---------------------------------------------------------------- **/

function loop()
{
	try
	{
		clearTimeout(g.ticker);
		g.ctx.save();
		g.ctx.clearRect(0, 0, g.canvaswidth, g.canvasheight);
		switch (g.mode)
		{
			case "splash":
				g.ctx.drawImage(g.splash,0,0);
				g.resetting --; if (g.resetting < 0) { setTitle(); }
			break;
			case "title":
				hiScore();
				g.ctx.drawImage(g.titlescreen, (g.canvaswidth/2) - 160, 80);
				writeText(textdata[1],g.textcentre,290,14,SCOREFONT);
				g.resetting --; if (g.resetting < 0) { g.resetting = 0; }
			break;
			case "pregame":
				g.ctx.drawImage(g.pregame, 0, (g.canvasheight/2)-80);
				for (var a=0;a<stars.length;a++) { moveStar(stars[a]); drawStar(stars[a]); }
				g.resetting --; if (g.resetting < 1) { setLevel(); g.mode = "levelup"; }
			break;

			case "game":
				m.player.milestohome -= rnd(50000);
				if (m.player.milestohome < 100000) m.player.milestohome = 100000;
				if (g.nextthink > 0) g.nextthink --;
				if (g.hyperdrive > 0) 
				{
					g.hyperdrive --; 
					m.player.milestohome -= 5000000 + rnd(500000);
				}

				for (var a=0;a<stars.length;a++) { moveStar(stars[a]); drawStar(stars[a]); }
				if (m.player.lasercooldown > 0) m.player.lasercooldown --;
				if (m.player.dying < 1) // i.e. not dying
				{
					for (var a=0;a<m.monster.length;a++)
					{
						moveAlien(m.monster[a]);
						draw(m.monster[a]);
						spawnAlienBomb(m.monster[a]);
						playerMonsterCollision(m.monster[a]);
					}
					for (var a=0;a<m.entity.length;a++)
					{
						move(m.entity[a]);
						draw(m.entity[a]);
						entityCollision(m.entity[a],m.player);
					}
					for (var a=0;a<m.alienbomb.length;a++)
					{
						move(m.alienbomb[a]);
						draw(m.alienbomb[a]);
						alienBombCollision(m.alienbomb[a],m.player);
					}
					movePlayer(m.player);
				}
				drawPlayer(m.player);
				for (var a=0;a<m.spark.length;a++)
				{
					move(m.spark[a]);
					draw(m.spark[a]);
				}
				for (var a=0;a<m.playermissile.length;a++)
				{
					move(m.playermissile[a]);
					draw(m.playermissile[a]);
					monsterLaserCollision(m.playermissile[a]);
				}

				for (var a=0;a<m.explosion.length;a++)
				{
					move(m.explosion[a]);
					draw(m.explosion[a]);
				}
				updateScore();
				updateLives();
				drawEnergy();
				drawLevelFlags();
				if ((g.wavetype - 1) != 0) spawnSaucer();
				
			break;
			case "endgame":
				for (var a=0;a<stars.length;a++) { moveStar(stars[a]); drawStar(stars[a]); }
				move(m.starfighter);
				draw(m.starfighter);
			break;
			case "finallyhome":
				move(m.starfighter);
				draw(m.starfighter);
			break;
			case "landed":
				draw(m.starfighter);
				writeText(textdata[4],g.textcentre,120,16,SCOREFONT);
				writeText(textdata[5],g.textcentre,142,16,SCOREFONT);
			break;
			case "endlevel":
				for (var a=0;a<stars.length;a++) { moveStar(stars[a]); drawStar(stars[a]); }
				for (var a=0;a<m.spark.length;a++) { move(m.spark[a]); draw(m.spark[a]); }
				g.resetting --;
				if (g.resetting < 1)
				{
					g.level ++;
					if (m.player.milestohome < 1)
					{
						endGame();
					} else {
						setLevel();
					}
				}
				for (var a=0;a<m.entity.length;a++)
				{
					move(m.entity[a]);
					draw(m.entity[a]);
					entityCollision(m.entity[a],m.player);
				}
				drawPlayer(m.player);
				movePlayer(m.player);						
				updateScore();
				updateLives();
				updateEnergy();
				drawEnergy();
				m.player.milestohome -= 50000 + rnd(50000);
				writeText(textdata[8],g.textcentre,200,18,SCOREFONT);
				spawnEntityChance(true, null);
			break;
			case "landscape":
			break;
			case "levelup":
				for (var a=0;a<stars.length;a++) { moveStar(stars[a]); drawStar(stars[a]); }
				writeLevel();
				writeText(textdata[6] + g.miles,g.textcentre,260,16,SCOREFONT);
				g.resetting --;
				if (g.resetting < 1)
				{
					setAliens();
					g.mode = "game";
				}
				drawPlayer(m.player);
				movePlayer(m.player);						
				updateScore();
				updateLives();
				updateEnergy();
				for (var a=0;a<m.entity.length;a++)
				{
					move(m.entity[a]);
					draw(m.entity[a]);
					entityCollision(m.entity[a],m.player);
				}
				drawEnergy();
			break;
			case "gameover":
				for (var a=0;a<stars.length;a++) { moveStar(stars[a]); drawStar(stars[a]); }
				writeText(textdata[3],g.textcentre,200,20,SCOREFONT);
				g.resetting --;
				if (g.resetting < 1)
				{
					//postData();
					setTitle();
				}
				writeText(textdata[7] + g.miles,g.textcentre,260,16,SCOREFONT);
				updateScore();
			break;
			case "getdata":
				for (var a=0;a<stars.length;a++) { moveStar(stars[a]); drawStar(stars[a]); }
				writeText(textdata[9],g.textcentre,100,16,SCOREFONT);
				updateScore();
			break;
		}
		if (g.mode != "splash" && g.mode != "title") g.ctx.drawImage(g.playpause, g.pausemode * 32, 0, 32, 32, 0, 8, 32, 32);
		if (ISPORTRAIT && (g.ori != 0 && g.ori != 180) || !ISPORTRAIT && (g.ori != 90 && g.ori != -90))
		{
			g.ctx.fillStyle = "rgba(0,0,0,0.5)";
			g.ctx.fillRect(0,184,g.canvaswidth,40);
			writeText(textdata[2],g.textcentre - (ISPORTRAIT ? 0 : 80),200,16,SCOREFONT); 
			g.pausemode = 1;
		}
		g.ticker = setTimeout("loop()", g.framedelay);
		g.ctx.restore();
	}
	catch (e)
	{
		write("*"+e.message);
	}
};

function thousandSeparator(n,sep) {
	var sRegExp = new RegExp('(-?[0-9]+)([0-9]{3})'),
	sValue=n+"";

	if (sep === undefined) {sep=',';}
	while(sRegExp.test(sValue)) {
		sValue = sValue.replace(sRegExp, '$1'+sep+'$2');
	}
	return sValue;
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
		//if (c) writeString(s,220,g.canvasheight - 52);
		if (isNaN(g.testy)) g.testy = 0;
		if (isNaN(g.ave)) g.ave = 0;
		if (g.mode != "title" && g.testy < 20) 
		{ 
			g.testy ++; g.ave += c; 
			if (g.testy >= 10)
			{
				if (g.ave > 1500) g.framedelay = 24; // throttle the fast devices
			}
		}
	}
	catch (e)
	{
		write(e.message);
	}
};

function drawEnergy()
{
	if (m.player.dying > 0) return;
	var w = 300 * (m.player.energy / 100);
	g.ctx.fillStyle = "rgba(" + rnd(255) + "," + rnd(255) + ",0,0.8)";
	g.ctx.fillRect(8,48,w,16);
	g.ctx.drawImage(g.staricon, 8, 38);
};

function drawLevelFlags()
{
	for (var a=0;a<((g.level*g.levelwavemultiplier)+1)-g.levelwave;a++)
	{
		g.ctx.drawImage(g.levelflag, 8 + (a * 10), g.canvasheight - 24);
	}
};

function spawnMonsterChance()
{
	if (rnd(100) < (10 + (g.level)) && g.pausemode < 1) 
	{
		var x = -32; var y = -32;
		var d = 0; var s = 0; var f = 0;
		if (rnd(100) < 50)
		{
			// Aliens !!
			y = (g.canvaspadding * 2) + rnd(g.canvasheight / 2);
			if (rnd(10) < 5)
			{
				x = -32;
				d = 2;
			} else {
				x = g.canvaswidth;
				d = 6;
			}
			s = 1 + rnd(3);
			var row = parseInt(m.spritesheets["monstersheet"].height) / parseInt(m.spritesheets["monstersheet"].frameheight);
			spawnMonster(x,y,d,s,f,1,rnd(row)-1,10);
		}
	}
};

function spawnSaucer()
{
	if (g.saucermode > 0 || g.level < 7) return;
	if (rnd(100) < 10) { spawnMonster(0,64,2,2,0,1,0,100); g.saucermode = 1; }
};

function spawnMonster(x,y,d,s,f,ty,row,hp)
{
	if (ty == 1)
	{
		for (var a=0;a<m.monster.length;a++)
		{
			if (!m.monster[a].visible)
			{
				var e = m.monster[a];
				e.visible = true;
				e.direction = d;
				e.x = x;
				e.y = y;
				e.speed = s;
				e.frame = 0;
				e.startframe = f;
				e.row = row;
				e.hp = hp;
				e.inpain = 0;
				e.nextthink = row == 0 ? 30 : 40;
				e.basenextthink = e.nextthink;
				e.mod = 0;
				e.moddir = rnd(10) <= 5 ? "right" : "left";
				sparkShower(e);
				break;
			}
		}
	} 
};

function spawnLaser(o,x)
{
	if (o.lasercooldown > 0 || o.dying || g.mode != "game") return;
	for (var n = 0;n < (g.hyperdrive > 0 ? 5 : (o.gunmode < 3 ? 2 : 3));n++)
	{
		for (var a=0;a<m.playermissile.length;a++)
		{
			if (!m.playermissile[a].visible)
			{
				var e = m.playermissile[a];
				e.visible = true;
				if (o.gunmode > 0)
				{
					if (g.hyperdrive > 0)
					{
						if (n == 0) e.x = o.x;
						if (n == 1) e.x = (o.x + o.w) - e.w;
						if (n == 2) e.x = o.x + (o.w / 2) - (e.w / 2);
						if (n == 3) e.x = o.x - 16;
						if (n == 4) e.x = o.x + o.w + 16;
					} else {
						e.x = (n < 1) ? o.x : ((n < 2) ? (o.x + o.w) - e.w : o.x + (o.w / 2) - (e.w / 2));
					}
				} else {
					e.x = o.x + (o.w / 2) - (e.w / 2);
				}
				e.y = (n > 1) ? o.y - (e.h * 1.5) : o.y - (e.h);
				e.frame = 0;
				e.startframe = 0;
				e.direction = 0;
				e.speed = 16;
				o.lasercooldown = o.lasercooldownmax;
				break;
			}
		}
	}
	sfx(gameaudio["playershot"]);
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
			e.x = o.x + (o.w / 2) - (e.w / 2);
			e.y = o.y + (o.h / 2) - (e.h / 2);
			e.speed = sp;
			e.frame = 0;
			break;
		}
	}
};

function sparkShower(o)
{
	for (var a=0;a<8;a++)
	{
		spawnSpark(o,a,12);
	}
};

function spawnSpark(o,d,sp)
{
	for (var a=0;a<m.spark.length;a++)
	{
		if (!m.spark[a].visible)
		{
			var s = m.spark[a];
			s.visible = true;
			s.direction = d;
			s.x = o.x + (o.w/2);
			s.y = o.y + (o.h/2);
			s.spawny = o.y + 16;
			s.speed = sp;
			s.decay = 0;
			s.opacity = 1;
			break;
		}
	}
};

function spawnAlienBomb(o)
{
	if (rnd(1000) > 20 || !o.visible || g.pausemode > 0 || o.y > (g.canvasheight - 80)) return;
	var d = 4;  
	var sp = o.row == 0 ? 8 : (g.level/2);
	if (sp > 14) sp = 14;
	if (sp < 8) sp = 8;
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
			s.speed = sp;
			s.decay = 0;
			s.opacity = 1;
			s.row = o.row == 0 ? 1 : 0;
			if (o.row == 0) sfx(gameaudio["saucerbomb"]);
			break;
		}
	}
};

function spawnEntityChance(force,o)
{
	var x = 0; var y = 0;
	var tx = 0; var ty = 0;
	if (g.mode == "endlevel" && rnd(100) > 10) return;
	if ((rnd(1000) < 5 || force == true) && g.pausemode < 1) 
	{
		if (o != null)
		{
			x = o.x; 
			y = o.y;
			tx = o.x;
		} else {
			x = (g.canvaspadding * 2) + rnd(g.canvaswidth / 2);
			tx = x;
			y = 32;
		}
		ty = g.canvasheight - 64;
		var row = (parseInt(m.spritesheets["entitysheet"].height) / parseInt(m.spritesheets["entitysheet"].frameheight)) + 1;
		var r = rnd(row) - 1;
		if (force) r = rnd(10) < 8 ? 1 : (rnd(10) < 5 ? 2 : 3); // Favour stars
		if (g.mode == "endlevel" || g.mode == "levelup" && r == 1) r = rnd(10) < 7 ? 2 : 3; // Over-ride for hyperspace
		if (g.level < 9 && r == 0) r = 1;
		spawnEntity(x,y,tx,ty,r);
	}
};

function spawnEntity(x,y,tx,ty,row)
{
	for (var a=0;a<m.entity.length;a++)
	{
		if (!m.entity[a].visible)
		{
			var s = m.entity[a];
			s.visible = true;
			s.x = x;
			s.y = y;
			s.targetx = tx; 
			s.targety = ty;
			s.direction = 4;
			s.speed = row == 0 ? 1 : 6;
			s.bounced = 0;
			s.dying = 0;
			s.decay = row == 0 ? 1000 : 100;
			s.row = row;
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
	
	writeText(textdata[0] + s,g.textcentre,200,24,SCOREFONT);

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
		
		writeString(s,(g.canvaswidth/2) - 96,0);
		
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
		if (m.player.targetscore > 50000 && g.extralife < 1) { m.player.lives ++; g.extralife = 1; }
		if (m.player.targetscore > 100000 && g.extralife < 2) { m.player.lives ++; g.extralife = 2; }
		if (m.player.targetscore > 150000 && g.extralife < 3) { m.player.lives ++; g.extralife = 3; }
		if (m.player.score > 99999999) m.player.score = 99999999;
		if (m.player.score > m.player.targetscore) m.player.score = m.player.targetscore;
		if (m.player.score > m.player.hiscore) 
		{
			m.player.hiscore = m.player.score;
			localStorage.setItem(GAMETITLE + "-hiscore", m.player.hiscore);
		}
		var sScore = new String();
		var sInScore = new String(m.player.score);
		var ls = sInScore.length;
		var s = new String();
		
		for (var a = 0; a < (8-ls); a++) s += "0";
		for (var b = 0; b < sInScore.length; b++) s += "" + sInScore.substring(b,b+1);

		writeString(s,(g.canvaswidth/2) - 64,0);
		
		//if (g.mode == "gameover") writeString(s,40,0); else writeString(s,90,0);
		
	}
	catch (e)
	{
		write(e.message);
	}
};

function updateLives()
{
	g.ctx.drawImage(g.playericon, 64, 8);

	var ph = new String();
	var ph2 = new String(m.player.lives);
	var ls = ph2.length;
	var s = new String();
	
	for (var b = 0; b < ph2.length; b++) s += ph2.substring(b,b+1);
	
	writeString(s,16,0);

};

function updateEnergy()
{
	return;
	g.ctx.drawImage(g.staricon, 230, 8);

	var ph = new String();
	var ph2 = new String(m.player.energy);
	var ls = ph2.length;
	var s = new String();
	
	for (var b = 0; b < ph2.length; b++) s += ph2.substring(b,b+1);
	
	writeString(s,240,0);

};

function remove(o)
{
	o.visible = false;
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
			break;
		case 38: // Up
			break;
		case 40: // Down
			break;
		case 39: // Right
			m.player.moveright = true;
			break;
		case 37: // Left
			m.player.moveleft = true;
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
			if (g.mode == "landed") setTitle();
			if (g.mode == "title" && g.resetting < 1) setGame();
			if (g.mode == "game") spawnLaser(m.player);
			if (g.mode == "pregame") { if (g.resetting < 950) { setLevel(); g.mode = "levelup"; } }
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
			m.player.moveright = false;
			break;
		case 37: // Left
			m.player.moveleft = false;
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
