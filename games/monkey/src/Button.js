
(function(){
	
var Button = Quark.Button = function(props)
{
	props = props || {};
	Button.superClass.constructor.call(this, props);
	this.id = props.id || Quark.UIDUtil.createUID("Button");

	if(props.upState) this.setUpState(props.upState);
	if(props.overState) this.setOverState(props.overState);
	if(props.downState) this.setDownState(props.downState);
	if(props.disabledState) this.setDisabledState(props.disabledState);
	
	this.state = Button.state.UP;
	this.enabled = true;
	this.mouseChildren = false;
	this.useHandCursor = true;
	this.stop();
};
Quark.inherit(Button, Quark.MovieClip);

Button.state = 
{
	UP: "up",
	OVER: "over",
	DOWN: "down",
	DISABLED: "disabled"
}

Button.prototype.setUpState = function(upState)
{
	upState.label = Button.state.UP;
	this.setFrame(upState, 0);
	this.upState = upState;
	return this;
}

Button.prototype.setOverState = function(overState)
{
	overState.label = Button.state.OVER;
	this.setFrame(overState, 1);
	this.overState = overState;
	return this;
}

Button.prototype.setDownState = function(downState)
{
	downState.label = Button.state.DOWN;
	this.setFrame(downState, 2);
	this.downState = downState;
	return this;
}

Button.prototype.setDisabledState = function(disabledState)
{
	disabledState.label = Button.state.DISABLED;
	this.setFrame(disabledState, 3);
	this.disabledState = disabledState;
	return this;
}

Button.prototype.setEnabled = function(enabled)
{
	if(this.enabled == enabled) return this;
	this.mouseEnabled = this.enabled = enabled;	 
	if(!enabled)
	{
		if(this.disabledState) this.gotoAndStop(Button.state.DISABLED);
		else this.gotoAndStop(Button.state.UP);
	}else
	{
		if(this.currentFrame == 3) this.gotoAndStop(Button.state.UP);
	}
	return this;
}

Button.prototype.setState = function(state)
{
	if(this.state == state) return;
	this.state = state;

	switch(state)
	{
		case Button.state.OVER:
		case Button.state.DOWN:
		case Button.state.UP:
			if(!this.enabled) this.mouseEnabled = this.enabled = true;
			this.gotoAndStop(state);
			break;
		case Button.state.DISABLED:
			this.setEnabled(false);
			break;
	}
}

Button.prototype.onEvent = function(e)
{
	if(!this.enabled) return;
	
	switch(e.type)
	{
		case "mousemove":
			if(this.overState) this.setState(Button.state.OVER);		
			break;
		case "mouseout":
			if(this.upState) this.setState(Button.state.UP);
			break;
		case "mousedown":  
			if(this.downState) this.setState(Button.state.DOWN);
			break;
		case "mouseup":
			if(this.overState) this.setState(Button.state.OVER);
			else this.setState(Button.state.UP);
			break;
	}
}

	
})();