
function w596_rank(x){
    var s ='';
	
	var t ='神奇蜘蛛侠 变态版';

	var x1=''; // 部门
	var x2=''; // 公职
    var y='';  // 人数
    var z='';  // 百分比
    
	 var arr ='';
    
	if(x>10000){
		x2='超凡蜘蛛侠';
		z='99';
		y=Math.floor(  + Math.random() *  713);
	}
	 
	else if(x>3000){						// 特攻队
		arr= "王牌蜘蛛侠 钢铁蜘蛛侠 超级蜘蛛侠 人气蜘蛛侠".split(" "); 
		x2=arr[Math.floor(Math.random() * arr.length)];
		z=myRnd(55,98);
		y=Math.floor(  + Math.random() *  97596);
		
	}
	else if(x>1000){							// 陆战队
		arr= "奇葩蜘蛛侠 红人蜘蛛侠 得瑟蜘蛛侠 天朝蜘蛛侠".split(" "); 
		x2=arr[Math.floor(Math.random() * arr.length)];
		z=myRnd(20,55);
		y=Math.floor(  + Math.random() *  998899);
	}
	else if(x>500){							// 文艺兵
		arr= "屌丝蜘蛛侠 普通蜘蛛侠 山寨蜘蛛侠".split(" "); 
		x2=arr[Math.floor(Math.random() * arr.length)];
		z=myRnd(5,20);
		y=Math.floor(  + Math.random() *  72568899);
		
	}
	else{  									// 预备役
		x2='失败蜘蛛侠';
		z=myRnd(1,5);
		
		if(e==0){z=1;}
				y=Math.floor(  + Math.random() *  895968899);

	}
	
	
	
	title = "在"+t+"我获得了 "+x2+"称号，看看你能玩多大?";
	dp_submitScore(x);
    return  '<div id="weixin-share"></div><div id="weixin-text"><div id="j"><div id="txt">'+x2+'</div><div id="rank">排名 '+y+' 位 <br/>击败了 ' + z+ '% 玩家</div></div></div></div>';

	 
}


function myRnd(min,max){
    return Math.floor(min+Math.random()*(max-min));
}


  var isTouch = ('ontouchstart' in window);
    var touchStartEvent = isTouch ? "touchstart" : "mousedown";
    var touchEndEvent = isTouch ? "touchend" : "mouseup";


   document.addEventListener(touchStartEvent, function () {
            try {
                event.stopPropagation();
            }
            catch (err) {
            }

        }, false);
        document.addEventListener(touchEndEvent, function () {
            
            event.stopPropagation();
        }, false);
 

function bodyClick(dom) {
        dom.addEventListener(touchStartEvent, function () {

            try {
                event.stopPropagation();
            }
            catch (err) {
            }

        }, false);
        dom.addEventListener(touchEndEvent, function () {
            var linkbtn = document.getElementById("linkbtn");
            if (linkbtn && linkbtn.length) {
                linkbtn.style.display = "none";
            }
            event.stopPropagation();
        }, false);
};
var bodyx = document.getElementById("hs");
bodyClick(bodyx);