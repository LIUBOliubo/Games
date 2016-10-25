
(function(){
	
var Orientation = Quark.Orientation =
{
	lastGamma: 0,
	lastBeta: 0,
	lastAlpha: 0,
	callback: null
};

Orientation.register = function(callback)
{
	var me = this, handler = function(e){me.onOrientation(e, callback);};
	//window.addEventListener('deviceorientation', handler, false);
	//window.addEventListener('MozOrientation', handler, false);
	window.addEventListener('devicemotion', handler, false);
};

Orientation.onOrientation = function(e, callback)
{
	var gamma = e.gamma, beta = e.beta, alpha = e.alpha;
	if(!gamma && !beta)
	{
        gamma = e.x * Quark.RADIAN;
        beta = e.y * Quark.RADIAN;
       	alpha = e.z * Quark.RADIAN;
	}
	
	var data = {gamma:gamma, beta:beta, alpha:alpha};

	if(e.accelerationIncludingGravity)
	{
		data.accelerationX = e.accelerationIncludingGravity.x;
		data.accelerationY = e.accelerationIncludingGravity.y;
		data.accelerationZ = e.accelerationIncludingGravity.z;
	}	

	if(callback != null) callback(data);
	
	this.lastData = data;
};
	
})();