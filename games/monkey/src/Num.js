
(function(){

var Num = game.Num = function(props)
{
	props = props || {};
	this.type = props.type;
	Num.superClass.constructor.call(this, this.type);
	this.id = props.id || Q.UIDUtil.createUID("Num");
	this.setType(this.type);
	this.stop();
}
Q.inherit(Num, Q.MovieClip);

Num.prototype.setType = function(type)
{
	this.type = type;
	this._frames.length = 0;
	this.addFrame(type.frames);
	this.currentFrame = 0;
}

Num.prototype.setValue = function(num)
{
	this.gotoAndStop(num);
}

Num.init = function()
{
	this.Type = {};
	this.Type.num1 = 
	{
		image:game.getImage("num1"),
		width: 25,
		height: 32,
        scaleX:0.5,
        scaleY:0.5,
		frames:[
			{rect:[0,0,50,65]},
			{rect:[50,0,50,65]},
			{rect:[100,0,50,65]},
			{rect:[150,0,50,65]},
			{rect:[200,0,50,65]},
			{rect:[0,65,50,65]},
			{rect:[50,65,50,65]},
			{rect:[100,65,50,65]},
			{rect:[150,65,50,65]},
			{rect:[200,65,50,65]},
			{rect:[0,130,50,65]},
			{rect:[50,130,50,65]},
			]
	};
	
	this.Type.num2 = 
	{
		image:game.getImage("num2"),
		width: 25,
		height: 32,
        scaleX:0.5,
        scaleY:0.5,
		frames:[
			{rect:[0,0,50,65]},
			{rect:[50,0,50,65]},
			{rect:[100,0,50,65]},
			{rect:[150,0,50,65]},
			{rect:[200,0,50,65]},
			{rect:[0,65,50,65]},
			{rect:[50,65,50,65]},
			{rect:[100,65,50,65]},
			{rect:[150,65,50,65]},
			{rect:[200,65,50,65]},
			{rect:[0,130,50,65]},
            {rect:[50,130,50,65]}
			]
	};

	this.TypeList = [this.Type.num1, this.Type.num2];
}

})();