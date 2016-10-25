function backgroundimage(id,src,w,h,x,y,speed,screens)
{
	this.id = id;
	this.src = src;
	this.w = w;
	this.h = h;
	this.x = x;
	this.screens = screens;
	this.y = 0 - (g.canvasheight * (screens - 1));
	this.speed = speed;

	var i = new Image();
	i.src = src;
	this.img = i;
};

function spritesheet(s)
{
	this.sheet				= s;
	this.sheetname			= s.sheetname;
	this.type				= s.type;
	this.height				= s.height;
	this.width				= s.width;
	this.framewidth			= s.framewidth;
	this.frameheight		= s.frameheight;
	this.framedelay			= s.framedelay;
	this.framesperdirection = s.framesperdirection;
	this.deathframe			= s.deathframe;
	this.deathframecount	= s.deathframecount;
	this.attackframe		= s.attackframe;
	this.attackframecount	= s.attackframecount;
	this.painframe			= s.painframe;
	this.painframecount		= s.painframecount;

	this.image				= new Image();
	this.image.setAttribute("id", this.sheetname);
	this.image.src			= s.src;

	this.canvas				= document.createElement("canvas");
	this.canvas.width		= s.width;
	this.canvas.height		= s.height;
	this.canvas.getContext("2d").drawImage(this.image, 0, 0);
};

function laser(id,w,h,col,sp)
{
	this.id = id;
	this.w = w;
	this.h = h;
	this.color = col;
	this.speed = sp;
};

function textsprite(id, x, y, txt, s)
{
	this.id = id;
	this.x = x;
	this.y = y;
	this.text = txt;
	this.speed = s;
	this.ticks = 10; // ticks before removal
	this.visible = false;
};

function sprite(id, nameid, spritesheet, x, y, speed, direction, visible)
{
	this.id = id;
	this.nid = nameid;
	this.spritesheet = spritesheet;
	
	this.frame = 0; this.startframe = 0;
	this.framedelay = spritesheet.framedelay;
	this.framedelaymax = spritesheet.framedelay;

	this.x = x;
	this.y = y;
	this.oldx = x;
	this.oldy = y;
	this.basex = x;
	this.basey = y;
	this.targetx = -1;
	this.targety = -1;

	this.w = spritesheet.framewidth;
	this.h = spritesheet.frameheight;
	
	this.speed = speed;
	this.basespeed = speed;
	this.direction = direction;
	this.lastdirection = direction;
	
	this.offset = 0;
	this.frame = 0;
	this.row = 0; // row index
	
	this.visible = visible > 0 ? true : false;

	this.moveup = false;
	this.movedown = false;
	this.moveleft = false;
	this.moveright = false;
	
	this.angle = 0;
	this.opacity = 1;
	this.decay = 0;
	this.dying = false;
	this.spinning = 0;
	this.dead = false;
	this.inpain = false;
	this.boosting = 0;

	this.jumping = false;

	this.nextthink = 1;
	this.basenextthink = this.nextthink;
};