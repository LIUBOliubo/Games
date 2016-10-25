
(function(){

var Peach = game.Peach = function(props)
{
	props = props || {};
	this.type = props.type;
	Peach.superClass.constructor.call(this, this.type);
	this.id = props.id || Q.UIDUtil.createUID("Peach");
	
	this.reset(this.type);
};
Q.inherit(Peach, Q.MovieClip);

Peach.prototype.init = function()
{
	
};

Peach.prototype.update = function(timeInfo)
{
	this.rotation += 0.5;
};

Peach.prototype.reset = function(type)
{
	this.setType(type);
	this.currentScore = this.type.score;
	this.alpha = 1;
	this.fading = false;
	//this.bouncing = false;
	this.currentSpeedY = this.speedY;
	this.currentSpeedX = 0;
	this.delay = Math.floor(Math.random()*50);
	
	this.setRandomPosition();
}

Peach.prototype.setRandomPosition = function()
{
	var minX = 100, maxX = game.width-100, minY = -100, maxY = 0;
	this.x = Math.floor(Math.random()*(maxX-minX)+minX);
	this.y = Math.floor(Math.random()*(maxY-minY)+minY) - 50;
	//this.y = -50;
}

Peach.prototype.setType = function(type)
{
	this.type = type;
	this._frames.length = 0;
	this.addFrame(type.frames);
	this.currentFrame = 0;
}

Peach.getRandomType = function(time)
{
	var list = this.TypeList;
    var tmp = Math.floor(time/20);
	//var r = Math.floor(Math.random()*list.length);
    var r = Math.floor(Math.random()*9) > tmp+2 ? 0 : 1;
	return list[r];
};

Peach.prototype.getCollide = function()
{
	//this.currentScore += this.type.scoreStep;
	//if(this.currentScore > this.type.maxScore) this.currentScore = this.type.maxScore;
	//this.y += 200;
   // this.x = -500;
	//this.bouncing = true;
}

Peach.prototype.stopBounce = function()
{
	//this.currentSpeedY = this.speedY;
	//this.bouncing = false;
}

Peach.init = function(height)
{
	this.Type = {};
	this.Type.plus =
	{
		image:game.getImage("peach"),
		regX: 94,
		regY: 92,
		width: 188,
		height: 184,
		score: 1,
		scoreStep: 0,
		maxScore: 3,
		speedY: height/80,
		frames:[
            {rect:[0,0,94,96]}
			]
	};
	
	this.Type.minus =
	{
		image:game.getImage("peach"),
		regX: 94,
		regY: 92,
		width: 188,
		height: 184,
		score: -2,
		scoreStep: 0,
		maxScore: 5,
		speedY:  height/35,
		frames:[
            {rect:[94,0,94,96]}
			]
	};


	this.TypeList = [this.Type.minus, this.Type.plus];
};

})();