/**
 * dc.js 2.0
 * */
var _DC_Constant = {
	isFlashLoaded:false,
	rurl:'http://dc.100bt.com/dc?',
	startTime : new Date().getTime(),
	btdomain:'100bt.com',
	flashName:'_dcFlash',
	uidKey:'DC_UUID',
	imgckey:'DCIMGKEY_',
	isOpenSpeedStatic:true,    
	timeInterval:25*60*1000,        
	isTestMode:false,
	testInterval:2*1000,   
	testImgNum:2,         
	imgPram:[
	      {"name":"aobi40k","url":"http://aobi.100bt.com/do_not_delete/bt40k.jpg", "size":40},
	      {"name":"aola40k","url":"http://aola.100bt.com/do_not_delete/bt40k.jpg", "size":40},
	      {"name":"aoya40k","url":"http://aoya.100bt.com/do_not_delete/bt40k.jpg", "size":40},
	      {"name":"zj40k",  "url":"http://zj.100bt.com/do_not_delete/bt40k.jpg",   "size":40},
	      {"name":"lds40k", "url":"http://lds.100bt.com/do_not_delete/bt40k.jpg",  "size":40},
	      {"name":"aoqi40k","url":"http://aoqi.100bt.com/do_not_delete/bt40k.jpg", "size":40},
	      {"name":"aola_login_40k", "url":"http://login.9aola.com/bt40k.jpg",  "size":40}
	],
	isCdnOpen:true,
	cdnInterval : 10*60*1000,
	cdnNum:3,
	cdnImg:[
	     {"url":"http://zj.100bt.com/do_not_delete/cdn.gif"},
	     {"url":"http://aobi.100bt.com/do_not_delete/cdn.gif"},
	     {"url":"http://lds.100bt.com/do_not_delete/cdn.gif"}
	]

	
};

var _DC_Util = {
	fixUrl : function(url){
		var index = url.indexOf("?");
		if(index>0){
			url = url.substring(0,index);
		}
		index = url.indexOf("#");
		if(index>0){
			url = url.substring(0,index);
		}
		return url;
	},
	coordToString : function (coord){
		var result = "";
		var flag =1;     //实现格式：coordinate=(x,y)(x,y)...(x,y)
		var j = 0 ;
		for(i in coord){
			if(typeof(coord[i])=="object"){
				result += "("+coord[i].x+","+coord[i].y + ")" ;
				j=j+1;
				if(j < coord.length){
					result+=",";
				}
			}
		}
		return result;
	},
	objToString : function(obj){
		var result = "",kvpairSplit = "$;$",arrSplit = "$,$",kvSplit = "$=$";
		for(var i in obj){
			//如果对象类型为object，则进行递归
			if(obj.hasOwnProperty(i)){
				if(i=="coordinate"|i=="ncoordinate"){
					result += i;
					result += kvSplit;
					result += _DC_Util.coordToString(obj[i]) + kvpairSplit;
				}else{
					result += i;
					result += kvSplit;
					result += obj[i] + kvpairSplit;
				}
			}
		}
		return result;
	},
	postData : function(result){
		var submitURL = new Image();
		var submitData = encodeURI(_DC_Util.objToString(result))
		submitURL.src = _DC_Constant.rurl + submitData;
	},
	jsGetCookie : function(cName){
		var sRE = "(?:;)?" + cName + "=([^;]*);?" , oRE = new RegExp(sRE);
		if(oRE.test(document.cookie)){
			return decodeURIComponent(RegExp["$1"]);
		}else{
			return null;
		}
	},
	jsSetCookie : function (key,value,domain,expires){
		document.cookie = key+"="+value+";domain="+domain+";path=/;expires="+expires;
	},
	getFlashMovieObject : function (){
		var movieName = _DC_Constant.flashName;
		if(navigator.appName.indexOf("Microsoft")!=-1){
			return window[movieName];
		}else{
			return document[movieName]
		}
	},
	//[0,max]
	rand : function(max) {  
	    return Math.floor(Math.random() * (max + 1));  
	} ,
	returnBase : function(number, base) {  
	    return (number).toString(base).toUpperCase();  
	},
	getIntegerBits : function(val, start, end) {  
	    var base16 = _DC_Util.returnBase(val, 16);  
	    var quadArray = new Array();  
	    var quadString = '';  
	    var i = 0;  
	    for (i = 0; i < base16.length; i++) {  
	        quadArray.push(base16.substring(i, i + 1));  
	    }  
	    for (i = Math.floor(start / 4); i <= Math.floor(end / 4); i++) {  
	        if (!quadArray[i] || quadArray[i] == '')  
	            quadString += '0';  
	        else  
	            quadString += quadArray[i];  
	    }  
	    return quadString;  
	},
	modelNameIsUsed : function (userModelName){
		var usedModelNames=[
			"coordinate",   
			"Url",            
			"RefUrl",        
			"UserId",         
			"StayTime",       
			"BrowserInfo",    
			"TimeStamp",       
			"PageOnloadSpeed",
			"GameSiteName"     
		];
		for(var i=0;i<usedModelNames.length;i++){
			if(usedModelNames[i] == userModelName){
				return true;
			}
		}
		return false;
	},
	createUUID : function() {  
	    var dg = new Date(1582, 10, 15, 0, 0, 0, 0);  
	    var dc = new Date();  
	    var t = dc.getTime() - dg.getTime();  
	    var tl = _DC_Util.getIntegerBits(t, 0, 31);  
	    var tm = _DC_Util.getIntegerBits(t, 32, 47);  
	    var thv = _DC_Util.getIntegerBits(t, 48, 59) + '1'; // version 1, security version is 2  
	    var csar = _DC_Util.getIntegerBits(_DC_Util.rand(4095), 0, 7);  
	    var csl = _DC_Util.getIntegerBits(_DC_Util.rand(4095), 0, 7);  
	    var n = _DC_Util.getIntegerBits(_DC_Util.rand(8191), 0, 7)  
	            + _DC_Util.getIntegerBits(_DC_Util.rand(8191), 8, 15)  
	            + _DC_Util.getIntegerBits(_DC_Util.rand(8191), 0, 7)  
	            + _DC_Util.getIntegerBits(_DC_Util.rand(8191), 8, 15)  
	            + _DC_Util.getIntegerBits(_DC_Util.rand(8191), 0, 15); // this last number is two octets long  
	    return tl + tm + thv + csar + csl + n;  
	},
	addUnbeforeLoadEvent : function(func){
		var beforeloadFunc = window.onbeforeunload;
		if(typeof beforeloadFunc != 'function'){
			window.onbeforeunload = func;
		}else{
			window.onbeforeunload = function(){
				beforeloadFunc();
				func();
			}
		}
	},
	addUnloadEvent : function(func){
		var unloadFunc = window.onunload;
		if(typeof unloadFunc != 'function'){
			window.onunload = func;
		}else{
			window.onunload = function(){
				unloadFunc();
				func();
			}
		}
	},
	bindEvent:function(element, event, handle) {
        element.attachEvent ? element.attachEvent("on" + event, function(event) {
            handle.call(element, event)
        }) : element.addEventListener && element.addEventListener(event, handle, false)
    },
	addLoadEvent : function(func){
		var onloadFunc = window.onload;
		if(typeof onloadFunc != 'function'){
			window.onload = func;
		}else{
			window.onload = function(){
				onloadFunc();
				func();
			}
		}
	}
};
var user_result={};   
function setUserModelValue(name,value){
	if(!_DC_Util.modelNameIsUsed()){
		user_result[name]=value;
	}
}
function DC_SendUserModelData(){
	_DC_Util.postData(user_result);
}
function Dc_SetButtonClickData(gameName,buttonName){
	var result = {};
	var url = document.location.href;
	url = _DC_Util.fixUrl(url);
	result.Url = url+"@gameName="+gameName+"&buttonName="+buttonName;
	_DC_Util.postData(result);
}
function Dc_SetUserCanyuData(gameName,dc_userId){
	var result = {};
	var url = document.location.href;
	url = _DC_Util.fixUrl(url);
	result.Url = url+"@gameName="+gameName+"&DC_UserId="+dc_userId;
	_DC_Util.postData(result);
}

(function(){
	function jsLoadFlash (callback){
		if(!_DC_Constant.isFlashLoaded) {
			var div = document.createElement("div");
			div.innerHTML = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" codebase="" id="'+_DC_Constant.flashName+'" width=1 height=1><param name=movie value="http://dc.100bt.com/flash/cookie.swf"><param name="allowScriptAccess" value="always"><embed play=false swliveconnect="true" name="'+_DC_Constant.flashName+'" src="http://dc.100bt.com/flash/cookie.swf" quality=high bgcolor=#FFFFFF width=1 height=1 type="application/x-shockwave-flash"></embed ></object >';
			document.body.appendChild(div);
			 //每隔5ms判断一下flash是否加载完全,让flash加载完后再调用callback函数
			var t = setInterval(function(){
				if(_DC_Util.getFlashMovieObject().isFlashLoaded){
					clearInterval(t);
					if(callback){
						callback.call(new DC());
					}
					_DC_Constant.isFlashLoaded = true;
				}
			},5);
		}
	}

	function _DC_Result(){
		this.result = {};
	};

	_DC_Result.prototype = {
		getUrl : function(){
			this.result.Url = decodeURI(window.location.href).replace(/#/g, '@');
		},
		getRefUrl : function(){
			this.result.RefUrl = decodeURI(document.referrer);
		},
		getUserId : function(){
			if(_DC_Util.jsGetCookie("userId")){
				this.result.UserId = _DC_Util.jsGetCookie("userId");
			}
		},
		getTtqId : function(){
			if(window.ttqId){
				this.result.ttqId = window.ttqId;
			}
		},
		getBrowserInfo:function(){
			this.result.BrowserInfo = navigator.userAgent;
		},
		getTimeStamp:function(){
			this.result.TimeStamp = new Date().getTime();
		},
		getScreenInfo:function(){
			this.result.ScreenWidth = screen.width;
			this.result.ScreenHeight = screen.height; 
		},
		getStayTime : function(){
			var et = new Date();
			this.result.StayTime = et - _DC_Constant.startTime;
		},
		getUuid : function(){
			var cookieKey = _DC_Constant.uidKey;
			var cookieValue ;
			var cookieExpire = new Date();
			cookieExpire.setFullYear(2050, 12, 1);
			//如果flash不能被加载，则使用老的一套流程
			if(!_DC_Constant.isFlashLoaded){
				cookieValue = _DC_Util.jsGetCookie(cookieKey);  //存在则直接在HTTPCookie中取值
				if(!cookieValue){
					cookieValue = _DC_Util.createUUID();
					_DC_Util.jsSetCookie(cookieKey, cookieValue, _DC_Constant.btdomain, cookieExpire.toGMTString());
					this.result.FDC_UUID = cookieValue
					this.result.DC_UUID = cookieValue;
				}else{
					this.result.DC_UUID = cookieValue;
				}
				return;
			}
			var flashObj = _DC_Util.getFlashMovieObject() ;
			//如果HTTPCookie为空，则检查flashCookie是否存在
			if(document.cookie.indexOf(cookieKey)<0){
				//如果flashCookie存在，则直接把flashCookie的值设置到HTTPCookie中去
				if(flashObj.isFCookieExist(cookieKey)){
					cookieValue = flashObj.getFCookies(cookieKey);
					_DC_Util.jsSetCookie(cookieKey, cookieValue, _DC_Constant.btdomain, cookieExpire.toGMTString());
				}
				// 如果flashCookie也不存在，则由js直接产生一个新的值，分别同时设置到flashCookie和HTTPCookie中
				else{
					cookieValue = _DC_Util.createUUID();
					_DC_Util.jsSetCookie(cookieKey, cookieValue, _DC_Constant.btdomain, cookieExpire.toGMTString());
					flashObj.saveFCookies(cookieKey,cookieValue);
					this.result.FDC_UUID = cookieValue
				}
			}else{
				cookieValue = _DC_Util.jsGetCookie(cookieKey);  //存在则直接在HTTPCookie中取值
			}
			this.result.DC_UUID = cookieValue;
		},
		clearResult : function(){
			this.result = {};
		},
		initLoadData : function(){
			this.getUrl();
			this.getRefUrl();
			this.getBrowserInfo();
			this.getScreenInfo();
			this.getUserId();
			this.getTimeStamp();
			this.getUuid();
			this.getTtqId();
			this.result.us = _DC_Util.rand(Math.pow(2,32)); //为了计算pv，而单独区分url
		},
		initUnloadData : function(){
			this.getBrowserInfo();
			this.getScreenInfo();
			this.getRefUrl();
			this.getStayTime();
			this.result.uns = _DC_Util.rand(Math.pow(2,32)); //为了区分us
		},
		postData : function(){
			_DC_Util.postData(this.result);
		}
	}

	_DC_Result.testCdnMonitor = function(){
		if(_DC_Constant.isCdnOpen){
			DC_CdnMonitor(_DC_Constant.cdnInterval);
		}
		function DC_CdnMonitor(interval){
			setTimeout(function(){
				var imgs = _DC_Constant.cdnImg;
				var sendImgs = [];
				var n = 0;
				while(n<_DC_Constant.cdnNum){
					var i = _DC_Util.rand(imgs.length-1);
					var imgObj = imgs[i];
					if(imgObj!=undefined){
						delete(imgs[i]);
						n++;
						sendImgs.push(imgObj);
					}
				}
				var t = setInterval(function(){
					var img = sendImgs.shift();
					DC_CreateImg(img);
					if(sendImgs.length==0){
						clearInterval(t);
					}
				},2000);
			},interval);
		}
		function DC_CreateImg(imgObj){
		    var imgSrc = imgObj.url
		    //每十分钟一个版本号，不带日期，如 当前时间为 13：12，则版本号为 131
		    var day = new Date();
			var hour = day.getHours();
			var min = (day.getMinutes() - day.getMinutes()%10)/10;
		    var version = hour+""+min;
		    var result = {}
		    var img = document.createElement("img");
		    //为请求资源加上一个随机数，避免因为浏览器缓存而请求不到最新的资源
		    img.setAttribute("src",imgSrc+"?"+ version);
		    img.setAttribute("width","0");
		    img.setAttribute("heigth","0");
		    img.setAttribute("style","display:none;visibility:hidden;width:0;height:0;overflow:hidden;");
		    img.style.display = "none";
		    document.body.appendChild(img); 
		}
	}
	_DC_Result.getPageLoadSpeed = function(){
		
		if(_DC_Constant.isOpenSpeedStatic){
			if(_DC_Constant.isTestMode){
				//测试模式，用于测试数据是否出来
				DC_TestSpeed(_DC_Constant.testInterval);
			}else{
				DC_TestSpeed(_DC_Constant.timeInterval);
			}
		}
		
		function DC_TestSpeed(interval){
			setTimeout(function(){
				var imgs = _DC_Constant.imgPram;
				var sendImgs = [];
				var n = 0;
				while(n<_DC_Constant.testImgNum){
					var i = _DC_Util.rand(imgs.length-1);
					var imgObj = imgs[i];
					if(imgObj!=undefined){
						delete(imgs[i]);
						n++;
						sendImgs.push(imgObj);
					}
				}
				var t = setInterval(function(){
					var img = sendImgs.shift();
					if(_DC_Util.jsGetCookie(_DC_Constant.imgckey+img.name)==null){
						DC_CreateImg(img);
						setImgExpireCookie(img);
					}
					if(sendImgs.length==0){
						clearInterval(t);
					}
				},2000);
				
			},interval);
		}
		
		function DC_CreateImg(imgObj){
		    var imgSrc = imgObj.url
		    var startTime = new Date();
		   
		    //每十分钟一个版本号，不带日期，如 当前时间为 13：12，则版本号为 131
		    var day = new Date();
			var hour = day.getHours();
			var min = (day.getMinutes() - day.getMinutes()%10)/10;
		    var version = hour+""+min;
		    var result = {}
		   
		    var img = document.createElement("img");
		    //为请求资源加上一个随机数，避免因为浏览器缓存而请求不到最新的资源
		    img.setAttribute("src",imgSrc+"?"+ version);
		    img.setAttribute("width","0");
		    img.setAttribute("heigth","0");
		    img.setAttribute("style","display:none;visibility:hidden;width:0;height:0;overflow:hidden;");
		    img.style.display = "none";
		   
		    img.onload = function(){
		    	var imgSize = imgObj.size;
			    var endTime = new Date();
			    var loadTime = endTime - startTime;
			    var speed = imgSize*1000/loadTime; 
			    //以下操作是令结果更加精确，先乘10在取整，再除10得到结果  
			    var Lnum = Math.pow(10,1);
			    result.PageOnloadSpeed = Math.round(speed*Lnum)/Lnum+"kb/s";//这就是结果，多少kb/s,记录这个数据
			    result.GameSiteName = imgObj.name ;
			    result.loadTime = loadTime;
			    result.imgSize = imgSize;
			    _DC_Util.postData(result);
		    }; 
		    document.body.appendChild(img); 
		}
		//
		function setImgExpireCookie(imgObj){
			var name = imgObj.name;
			var cookieExpire = new Date();
			cookieExpire.setHours(cookieExpire.getHours()+1);
			_DC_Util.jsSetCookie(_DC_Constant.imgckey+name,name, _DC_Constant.btdomain, cookieExpire)
		}
		
	};

	_DC_Result.getCoorClick = function(){
		var px=0, py=0; 
		var obj = document.documentElement;	
		var temp_result = {}
		temp_result.coordinate = [] ;
		temp_result.ncoordinate = [] ;
		obj.onclick = function(event)
		{
			var Coordinate = new Object();
			var NewCoordinate = new Object();
			var width = window.innerWidth || document.documentElement.clientWidth || document.body.offsetWidth;
			if(temp_result.coordinate.length==10){
				_DC_Util.postData(temp_result);
				temp_result.coordinate = [] ;
				temp_result.ncoordinate = [] ;
			}
			//判断ie的兼容性 
			if(!event) { 
				event = window.event; 
			} 
			if(document.all) { // is ie 
				px = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft); 
				py = Math.max(document.documentElement.scrollTop, document.body.scrollTop); 
				px += event.clientX||0; 
				py += event.clientY||0;
			} else { 
				px = event.pageX||0;     // ||0 是为了防止pageX没初始化就赋值给px，出现NaN问题
				py = event.pageY||0; 
			} 
			Coordinate.x = px;
			Coordinate.y = py;
			temp_result.coordinate.push(Coordinate);
			/*新坐标点击*/
			NewCoordinate.x = px - width / 2;      //以中线为标准
			NewCoordinate.y = py;
			temp_result.ncoordinate.push(NewCoordinate);
		}
		temp_result.ScreenWidth = screen.width;;
		temp_result.ScreenHeight = screen.height; 
		_DC_Util.addUnbeforeLoadEvent(function(){
			if(temp_result.coordinate.length>0)
				_DC_Util.postData(temp_result);
		});
		_DC_Util.addUnloadEvent(function(){
			if(temp_result.coordinate.length>0)
				_DC_Util.postData(temp_result);
		});
	};

	_DC_Util.addLoadEvent(function(){
		_DC_Result.getPageLoadSpeed();
		_DC_Result.getCoorClick();
		_DC_Result.testCdnMonitor();
		// jsLoadFlash();
		var dc = new _DC_Result();
		dc.initLoadData();
		dc.postData();
	});

	_DC_Util.addUnbeforeLoadEvent(function(){
		var dc = new _DC_Result();
		dc.initUnloadData();
		dc.postData();
		setTimeout(function(){},1000);
	});
	//用于解决Firefox,360浏览器发送请求丢失问题
	_DC_Util.addUnloadEvent(function(){
		var isFirefox = navigator.userAgent.indexOf("Firefox") ;
		var is360se = navigator.userAgent.toLowerCase().indexOf("360se") ;
		var sendClosed = true;
		if(isFirefox >0 || is360se>-1){
			sendClosed = false ;
		}
		//若既不是Firefox也不是360，则直接返回
		if(sendClosed){return ;}
		var dc = new _DC_Result();
		dc.InitUnloadData();
		dc.postData();
		setTimeout(function(){},1000);
	});
})();