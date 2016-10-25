function ds(ct) {
	ct = (ct + '').toString();
	return encodeURIComponent(ct).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+');
};

// 排行版链接
function eF() {
	dp_Ranking();
};


function w596_rank(x){
    var s ='';
	
	var t ='跳跳蛙 我要跳得更远';

	var x1=''; // 部门
	var x2=''; // 公职
    var y='';  // 人数
    var z='';  // 百分比
    
	 var arr ='';
    
	if(x>10000){
		x2='超凡跳跳蛙';
		z='99';
		y=Math.floor(  + Math.random() *  713);
	}
	 
	else if(x>3000){						// 特攻队
		arr= "王牌跳跳蛙 钢铁跳跳蛙 超级跳跳蛙 人气跳跳蛙".split(" "); 
		x2=arr[Math.floor(Math.random() * arr.length)];
		z=myRnd(55,98);
		y=Math.floor(  + Math.random() *  97596);
		
	}
	else if(x>1000){							// 陆战队
		arr= "奇葩跳跳蛙 红人跳跳蛙 得瑟跳跳蛙 天朝跳跳蛙".split(" "); 
		x2=arr[Math.floor(Math.random() * arr.length)];
		z=myRnd(20,55);
		y=Math.floor(  + Math.random() *  998899);
	}
	else if(x>500){							// 文艺兵
		arr= "屌丝跳跳蛙 普通跳跳蛙 山寨跳跳蛙".split(" "); 
		x2=arr[Math.floor(Math.random() * arr.length)];
		z=myRnd(5,20);
		y=Math.floor(  + Math.random() *  72568899);
		
	}
	else{  									// 预备役
		x2='失败跳跳蛙';
		z=myRnd(1,5);
		
		if(x==0){z=1;}
				y=Math.floor(  + Math.random() *  895968899);

	}
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



