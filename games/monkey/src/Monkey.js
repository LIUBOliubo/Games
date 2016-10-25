
(function(){

var Monkey = game.Monkey = function(props)
{
	props = props || {};
	Monkey.superClass.constructor.call(this, props);
	this.id = props.id || Q.UIDUtil.createUID("Monkey");
	
	this.avatar = null;	
	this.jumping = false;
	this.moving = false;
    this.mov = false;
	
	this.init();
}
Q.inherit(Monkey, Q.DisplayObjectContainer);

Monkey.prototype.init = function()
{
	var avatar = new Q.MovieClip({id:"monkey", image:game.getImage("monkey"), interval:120});
	avatar.addFrame([
	{rect:[0,0,223,250], label:"idle"},
	{rect:[223,0,223,250]},
	{rect:[0,250,223,250], jump:"idle"},
	//{rect:[217,0,217,229], jump:"idle"},
	{rect:[223,250,223,250], label:"jump"},
	]);
	
	this.width = 223;
	this.height = 250;
	this.currentSpeedX = this.speedX = 5;
	this.currentSpeedY = this.speedY = 10;
	this.dirX = 0;
	this.dirY = 0;
	this.oldY = 0;
	
	this.avatar = avatar;
	this.addChild(avatar);
};

Monkey.prototype.move = function(dir)
{
	if(this.moving) return;
	this.dirX = dir;
	this.currentSpeedX = this.speedX;
	this.moving = true;
}

Monkey.prototype.stopMove = function()
{
	this.dirX = 0;
	this.currentSpeedX = this.speedX;
	this.moving = false;
}

Monkey.prototype.jump = function()
{
	if(this.jumping) return;
	this.oldY = this.y;
	this.dirY = 1;
	this.currentSpeedY = this.speedY;
	this.jumping = true;
	this.avatar.gotoAndStop("jump");
}

Monkey.prototype.stopJump = function()
{
	this.y = this.oldY;
	this.dirY = 0;
	this.jumping = false;
	this.avatar.gotoAndPlay("idle");
}

})();