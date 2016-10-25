
/**
* 侧边栏滑动
* 通用性不好，请慎用
*/
define(function(require, exports, module){
	var $ = require('lib/zepto'),
		slip = require('lib/slip'),
		ai = require('lib/ai');
	/**
	* 判断是否支持translate属性(目前只有webkit/firefox)
	*/
	function isTranslateUseful(){
		return ai.ovb.webkit || ai.ovb.safari;
	}
	
	function ScrollSlide(param){
		this.options = $.extend({
			direction : 'left',//滑动方向
			slideContent : '',//侧边栏
			slideBody : [],//页面主体
			width : 0,
			height : 0
		}, param);
		this.animateQueue = [];
		this.isShow = false;
	}
	ScrollSlide.prototype = {
		toggle : function(){
			var that = this;
			//正在动画
			if(this.isProcessing){
				this.animateQueue.push(function(){
					that.toggle();
				});
				return;
			}
			this.isProcessing = true;
			this._animate();
		},
		_animate : function(){
			var width = this.options.width + 'px', height = this.options.height + 'px'
				, left = '0px', top = '0px', that = this, slideArray = this.options.slideBody;
			switch(this.options.direction){
				case 'left':	left = '-' + width;break;
				case 'right':	left = width;break;
				case 'top':		top = '-' + height;break;
				case 'down':	top = height;break;
			}
			if(isTranslateUseful()){
				if(this.isShow){
					//隐藏
					$(this.options.slideContent).css({
						'zIndex' : -1
					});
					for(var i=0, len=slideArray.length; i<len; i++){
						(function(i){
							$(slideArray[i]).animate({'translate' : '0px, 0px'}, {'duration': 'fast', 'complete': function(){
								if(i == len-1){
									that._changeStatus();
								}
							}});
						})(i);
					}
				}
				else{
					//显示
					$(this.options.slideContent).css({
						'zIndex' : -1,
						'visibility' : 'visible',
						'display' : ''
					});
					for(var i=0, len=slideArray.length; i<len; i++){
						(function(i){
							$(slideArray[i]).animate({'translate' : left + ', ' + top}, {'duration': 'fast', 'complete': function(){
								if(i == len-1){
									that._changeStatus();
								}
							}});
						})(i);
					}
				}
			}else{
				if(this.isShow){
					//隐藏
					$(this.options.slideContent).css({
						'zIndex' : -1
					});
					for(var i=0, len=slideArray.length; i<len; i++){
						(function(i){
							$(slideArray[i]).animate({'right':'0px', 'top':'0px'}, {'duration': 'fast', 'complete': function(){
								if(i == len-1){
									that._changeStatus();
								}
							}});
						})(i);
					}
				}else{
					//显示
					$(this.options.slideContent).css({
						'zIndex' : -1,
						'visibility' : 'visible',
						'display' : ''
					});
					for(var i=0, len=slideArray.length; i<len; i++){
						(function(i){
							$(slideArray[i]).animate({'right': width, 'top': top}, {'duration': 'fast', 'complete': function(){
								if(i == len-1){
									that._changeStatus();
								}
							}});
						})(i);
					}
				}
			}
		},
		_changeStatus : function(){
			if(this.isShow){
				$(this.options.slideContent).css({
					'zIndex' : -1,
					'visibility' : 'hidden',
					'display' : 'none'
				});
				this.options.afterHide && this.options.afterHide();
			}else{
				$(this.options.slideContent).css({
					'zIndex' : 1,
					'visibility' : 'visible',
					'display' : 'block'
				});
				this.options.afterShow && this.options.afterShow();
			}
			this.isShow = !this.isShow;
			this.isProcessing = false;
			var cb = this.animateQueue.shift();
			if(typeof cb == 'function'){
				cb();
			}
		}
	}
	return ScrollSlide;
});