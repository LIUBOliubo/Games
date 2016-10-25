window.scrollTo(0, 1);
var gameW = 320;
var gameH = 400;
var static_gameW = 320;
var static_gameH = 400;
var menu;
var menuItems;
var canvas;
var context;
var cursorX;
var cursorY;

var imgUrl = "";
var lineLink = "";
var descContent = '';
var shareTitle = '';
var appid = '';

var ygjscore = 1000;
var ygjscoreunit = "秒";
var mode2LevelNum = "A1";

var stepLeft = 1;

var levels = [
 [//1
  [[88,94],[203,139],[85,214],[203,268]],
  [[0,1],[0,2],[0,3],[1,2],[1,3],[2,3]]
 ],
 [//2
  [[163,96],[230,315],[53,233],[244,121],[133,324]],
  [[0,1],[0,2],[0,3],[0,4],[1,3],[2,3],[3,4]]
 ],
 [//3
  [[237,296],[85,278],[153,71],[48,148],[268,151],[161,332]],
  [[0,2],[1,2],[1,3],[1,4],[2,3],[2,4],[2,5],[3,4],[4,5]]
 ],
 [//4
  [[247,102],[147,91],[156,281],[56,180],[68,214],[239,260]],
  [[0,2],[0,4],[0,5],[1,2],[1,4],[1,5],[2,4],[3,5]]
 ],
 [//5
  [[109,335],[286,183],[50,273],[180,80],[63,134],[253,314]],
  [[0,1],[0,3],[1,3],[1,4],[2,3],[2,4],[3,4],[3,5],[4,5]]
 ],
 [//6
  [[235,291],[182,57],[54,258],[249,114],[199,260],[69,112]],
  [[0,1],[0,2],[0,3],[1,2],[1,4],[1,5],[2,3],[2,4],[2,5],[3,5],[4,5]]
 ],
 [//7
  [[78,265],[237,105],[202,296],[268,246],[126,60],[63,116]],
  [[0,1],[0,2],[0,3],[0,4],[0,5],[1,2],[1,5],[2,3],[2,4],[2,5],[3,4]]
 ],
 [//8
  [[123,295],[204,296],[259,213],[55,222],[207,101],[89,117]],
  [[0,1],[0,2],[0,5],[1,4],[1,5],[2,3],[2,4],[2,5],[3,4],[4,5]]
 ],
 [//9
  [[61,99],[256,276],[36,207],[107,303],[196,336],[236,78],[264,182],[170,170]],
  [[0,1],[0,2],[0,4],[0,6],[0,7],[1,3],[2,3],[2,4],[2,5],[2,6],[2,7],[3,5],[3,6],[5,7]]
 ],
 [//10
  [[154,255],[186,191],[85,279],[49,167],[198,93],[264,178],[108,111],[251,298]],
  [[0,5],[0,6],[1,2],[1,4],[1,7],[2,3],[2,4],[2,6],[2,7],[3,6],[3,7],[4,6],[4,7],[5,6]]
 ],
 [//11
  [[179,196],[84,124],[61,276],[223,295],[277,144],[49,172],[200,132],[131,347],[160,60],[257,208]],
  [[0,2],[1,2],[1,6],[2,3],[2,9],[3,5],[4,6],[4,7],[5,9],[6,9],[7,8]]
 ],
 [//12
  [[35,169],[169,336],[219,208],[280,233],[256,305],[154,78],[94,314]],
  [[0,1],[0,2],[0,6],[1,2],[1,3],[1,5],[2,5],[2,6],[3,4],[3,5],[4,6],[5,6]]
 ],
 [//13
  [[272,173],[94,93],[204,62],[87,260],[240,268],[50,163],[168,346],[173,198]],
  [[0,5],[0,6],[0,7],[1,3],[1,4],[1,5],[1,6],[1,7],[2,3],[2,4],[2,6],[3,4],[3,6],[3,7],[5,6],[5,7]]
 ],
 [//14
  [[272,200],[116,211],[241,299],[45,204],[148,84],[231,97],[51,291],[169,322]],
  [[0,1],[0,2],[0,4],[0,7],[1,4],[2,3],[2,5],[2,7],[3,4],[3,7],[4,5],[4,6],[4,7],[6,7]]
 ],
 [//15
  [[211,100],[241,143],[227,259],[159,302],[50,156],[47,225],[114,83],[107,131]],
  [[0,2],[0,5],[0,6],[1,5],[1,6],[2,4],[2,5],[2,6],[2,7],[3,5],[3,7],[4,6],[4,7]]
 ],
 [//16
  [[90,288],[229,216],[244,129],[82,102],[156,271],[190,287],[145,56],[47,204]],
  [[0,3],[0,5],[0,6],[0,7],[1,2],[1,5],[1,6],[1,7],[2,3],[2,4],[3,4],[4,7],[5,6]]
 ],
 [//17
  [[241,170],[104,290],[40,208],[141,206],[197,73],[66,122],[169,119],[216,279]],
  [[0,1],[0,5],[1,5],[1,7],[2,3],[2,6],[2,7],[3,6],[3,7],[4,5],[4,6],[4,7],[5,6],[6,7]]
 ],
 [//18
  [[213,297],[268,161],[75,315],[266,272],[100,101],[188,96],[48,224],[139,326]],
  [[0,1],[0,6],[0,7],[1,2],[1,3],[1,4],[1,5],[1,6],[1,7],[2,4],[2,5],[3,4],[4,6],[6,7]]
 ],
 [//19
  [[189,184],[133,291],[157,69],[38,172],[83,114],[94,171],[229,249],[255,124]],
  [[0,2],[0,7],[1,3],[1,5],[1,6],[2,4],[2,5],[2,6],[3,5],[3,6],[4,5],[4,6],[5,6],[5,7],[6,7]]
 ],
 [//20
  [[156,186],[263,111],[75,302],[82,106],[208,317],[152,89],[254,218],[48,189]],
  [[0,1],[0,2],[0,3],[0,4],[1,2],[1,3],[1,5],[1,6],[1,7],[2,5],[2,6],[3,4],[3,5],[4,5],[5,6],[5,7],[6,7]]
]
];

var TimeLevel = [
[
  [[136,186],[243,121],[55,272],[62,106],[178,297],[132,89],[234,218],[28,189]],
  [[0,1],[0,2],[0,3],[0,4],[1,2],[1,3],[1,5],[1,6],[1,7],[2,5],[2,6],[3,4],[3,5],[4,5],[5,6],[5,7],[6,7]]
 ],
 [[[160,80],[160,120],[160,260],[160,315],[50,200],[120,200],[200,200],[270,200]],
    [[0,5],[0,6],[3,5],[3,6],[4,1],[4,2],[7,1],[7,2],[5,1],[5,2],[6,1],[6,2],[4,6],[4,7],[1,2]]
    ] 
];

var smartQuote = [
    "脑筋不搭牢，yeah~",
    "有潜力哦，我看好你哦",
    "我为脑筋代言",
    "冲杯三鹿给你喝",
    "脑筋搭牢是一种生活态度",
    "土豪一般都搭牢",
    "农夫三拳有点疼",
    "天哪！我的衣服又瘦了",
    "猪是的念来过倒",
    "三人行，必有猪头",
    "我想早恋，但是已经晚了",
    "脑筋就是生产力",
    "别人装逼，我装脑筋",
    "忍无可忍，就重新再忍",
    "心在移动，如何联通",
    "别紧张,我不是什么好人",
    "老子不但有车,还是自行的",
    "我错了，我小看你了",
    "脑筋很好使嘛，还有一关"
];

//创建localStorage
var localStorageClass = function () {
    this.options = {
        expires: 60 * 24 * 3600,
        domain: "game.9g.com"
    }
}

localStorageClass.prototype = {
    //初实化。添加过期时间
    init: function () {
        var date = new Date();
        date.setTime(date.getTime() + 60 * 24 * 3600);
        this.setItem('expires', date.toGMTString());
    },
    //内部函数 参数说明(key) 检查key是否存在
    findItem: function (key) {
        var bool = document.cookie.indexOf(key);
        if (bool < 0) {
            return true;
        } else {
            return false;
        }
    },
    //得到元素值 获取元素值 若不存在则返回 null
    getItem: function (key) {
        var i = this.findItem(key);
        if (!i) {
            var array = document.cookie.split(';')
            for (var j = 0; j < array.length; j++) {
                var arraySplit = array[j];
                if (arraySplit.indexOf(key) > -1) {
                    var getValue = array[j].split('=');
                    //将 getValue[0] trim删除两端空格
                    getValue[0] = getValue[0].replace(/^\s\s*/, '').replace(/\s\s*$/, '')
                    if (getValue[0] == key) {
                        return getValue[1];
                    } else {
                        return 'null';
                    }
                }
            }
        }
    },
    //重新设置元素
    setItem: function (key, value) {
        var i = this.findItem(key)
        document.cookie = key + '=' + value;
    },
    //清除cookie 参数一个或多一
    clear: function () {
        for (var cl = 0 ; cl < arguments.length; cl++) {
            var date = new Date();
            date.setTime(date.getTime() - 100);
            document.cookie = arguments[cl] + "=a; expires=" + date.toGMTString();
        }
    }
}
var ygjstorage = new localStorageClass();
ygjstorage.init();

var saveFile = ygjstorage.getItem("ygjSave");
if(!saveFile) {
	saveFile = "0";
	ygjstorage.setItem("ygjSave", saveFile);
}

var levelNum = 1;

var level = levels[levelNum-1];

var mode = 0;


var field;
var collisions = [
	[0, 0, 0, 0],
	[false, false, false, false, false]
];
var selectedCircle;

var s;

function setCharAt(str,index,chr) {
	if(index > str.length-1) return str;
	return str.substr(0,index) + chr + str.substr(index+1);
}
function init() {
	gameW = pageWidth()*0.95;
	gameH = pageHeight()-115;
	
	/*create menu*/
	menu = document.getElementById("menu");
	menuItems = [];
	drawSysMenu();
	document.title = "一根筋玩到底-9G游戏";
}

function drawSysMenu(){

    menuHeader = document.createElement("h3");
	menuHeader.textContent = "大家一起一根筋";
	menu.appendChild(menuHeader);

    menu = document.getElementById("menu");
    menuItem = document.createElement("br");
	menu.appendChild(menuItem);
	
	
	menuItem = document.createElement("div");
	menuItem.innerHTML = "闯关模式";
	menuItem.style.width="60%";
	menuItem.style.background="blueviolet";
	menuItem.onmouseup = function() {
	    menu = document.getElementById("menu");
	    menu.innerHTML = "";
	    mode = 1;
	    levelNum = saveFile + 1;
	    drawmenu();
	}
	menu.appendChild(menuItem);
    menuItem = document.createElement("div");
	menuItem.innerHTML = "竞赛模式";
	menuItem.style.width="60%";
	menuItem.style.background="indianred";
    menuItem.onmouseup = function(){
        mode = 2;
	    menu.innerHTML = "";
        drawmode2menu();
        showMenu();
    }
	menu.appendChild(menuItem);
	menuItem = document.createElement("div");
	menuItem.innerHTML = "怎么玩？";
	menuItem.style.width="60%";
	menuItem.style.background="chocolate";
    menuItem.onmouseup = function() {
	    showOverlay();
	}
	menu.appendChild(menuItem);
	menuItem = document.createElement("div");
	menuItem.innerHTML = "更多游戏";
	menuItem.style.width="60%";
	menuItem.style.background="chocolate";
    menuItem.onmouseup = function() {
	    clickMore();
	}
	menu.appendChild(menuItem);
}

function drawmode2menu(){
    menuHeader = document.createElement("h3");
    menuHeader.textContent = "竞赛模式";
    menu.appendChild(menuHeader);

    menuItem = document.createElement("br");
    menu.appendChild(menuItem);

    menuItem = document.createElement("div");
	menuItem.innerHTML = "比比第一关";
	menuItem.style.fontSize="22px";
	menuItem.style.width="40%";
	menuItem.style.background="indianred";
    menuItem.onmouseup = function(){
    
        $("#overlay4").show();
        $("#startcount").text("3");
        $("#startcount").animate({'font-size':'200px'},"normal");
        $("#startcount").animate({'font-size':'8px'},"normal","linear",function(){
            $("#startcount").text("2");
        });
        $("#startcount").animate({'font-size':'200px'},"normal");
        $("#startcount").animate({'font-size':'8px'},"normal","linear",function(){
            $("#startcount").text("1");
        });
        $("#startcount").animate({'font-size':'200px'},"normal");
        $("#startcount").animate({'font-size':'8px'},"normal","linear",function(){
            $("#overlay4").hide();
	        document.getElementById("menuBtn").style.display = "inline";
	        document.getElementById("menuBtn2").style.display = "none";
	        document.getElementById("header").style.display = "none";
	        document.getElementById("TimeClock").style.display = "block";
            menu.innerHTML = "";
            levelNum = 0;
            mode2LevelNum = "A1";
            initCanvas();
            startTimeLevel();
        }); 
        
    }
    menu.appendChild(menuItem);

    menuItem = document.createElement("div");
    menuItem.innerHTML = "排行榜";
    menuItem.style.width = "25%";
    menuItem.style.fontSize = "22px";
    menuItem.style.background = "rgb(210, 105, 30)";
    menuItem.onmouseup = function () {
        window.location.href = rankurl ;
    }
    menu.appendChild(menuItem);
	
	//menuItem = document.createElement("div");
	//menuItem.innerHTML = "比比第二关";
	//menuItem.style.fontSize="28px";
	//menuItem.style.width="60%";
	//menuItem.style.background="rgb(210, 105, 30)";
    //menuItem.onmouseup = function(){
    
    //    $("#overlay4").show();
    //    $("#startcount").text("3");
    //    $("#startcount").animate({'font-size':'200px'},"normal");
    //    $("#startcount").animate({'font-size':'8px'},"normal","linear",function(){
    //        $("#startcount").text("2");
    //    });
    //    $("#startcount").animate({'font-size':'200px'},"normal");
    //    $("#startcount").animate({'font-size':'8px'},"normal","linear",function(){
    //        $("#startcount").text("1");
    //    });
    //    $("#startcount").animate({'font-size':'200px'},"normal");
    //    $("#startcount").animate({'font-size':'8px'},"normal","linear",function(){
    //        $("#overlay4").hide();
	//        document.getElementById("menuBtn").style.display = "inline";
	//        document.getElementById("menuBtn2").style.display = "none";
	//        document.getElementById("header").style.display = "none";
	//        document.getElementById("TimeClock").style.display = "block";
    //        menu.innerHTML = "";
    //        levelNum = 0;
    //        mode2LevelNum = "A2";
    //        initCanvas();
    //        startTimeLevel();
    //    }); 
        
    //}
	//menu.appendChild(menuItem);
	
	menuItem = document.createElement("br");
    menu.appendChild(menuItem);
    menuItem = document.createElement("br");
    menu.appendChild(menuItem);
	
	menuItem = document.createElement("div");
	menuItem.innerHTML = "更多挑战即将到来...";
	menuItem.style.fontSize="16px";
	menuItem.style.width="65%";
	menu.appendChild(menuItem);
}

var stepConfig = [1,2,3,3,3,3,3,3,5,3,3,3,6,3,3,3,2,3,3,4];

function drawmenu(){

    menuHeader = document.createElement("h3");
    menuHeader.textContent = "闯关模式";
    menu.appendChild(menuHeader);

    menuItem = document.createElement("br");
    menu.appendChild(menuItem);

    menuItems = [];

    for(i=0; i<levels.length; i++) {
		menuItem = document.createElement("div");
		menuItem.unlocked = false;
		if(i<saveFile){
			menuItem.style.backgroundColor = "rgba(73,255,63,0.35)";
			menuItem.unlocked = true;
		} else if(i==saveFile) {
			menuItem.style.backgroundColor = "rgba(180,180,180,0.5)";
			menuItem.unlocked = true;
		}
		menuItem.innerHTML += (i+1);
		menuItem.mID = i;
		menuItem.onmouseup = function() {
			if(this.unlocked) {
				hideMenu();
				levelNum = this.mID+1;
                stepLeft = stepConfig[this.mID]+1;
				level = levels[levelNum-1];
				field = level[0];
				$("#gametitle").text("还剩"+stepLeft+"步！");
				$("#gametitle").show();
				initCanvas();
				startLevel();
			}
		};
		menuItems.push(menuItem);
		menu.appendChild(menuItem);
	}
	/*menu created*/
	
	field = level[0];
	
	showMenu();
	
	document.getElementById("menuBtn2").style.display = "inline";
}

function initCanvas(){
    cursorX = 0;
	cursorY = 0;
	if(!canvas) {
		canvas = document.createElement("canvas");
		context = canvas.getContext("2d");
		canvas.width = gameW;
		canvas.height = gameH;
		document.getElementById('canvasdiv').appendChild(canvas);
	} else {
		context.clearRect(0,0,gameW,gameH);
	}
	if(checkForTouch()) {
		canvas.addEventListener('touchmove',  touchMove,  false);
		canvas.addEventListener('touchstart', touchStart, false);
		canvas.addEventListener('touchend',   touchEnd,   false);
	} else {
		canvas.addEventListener('mousemove',  mouseMove,  false);
		canvas.addEventListener('mousedown',  mouseDown,  false);
		canvas.addEventListener('mouseup',    mouseUp,    false);
		//document.body.addEventListener('keydown',    keyDown,    false);
	}
	scroller = {};
	scroller.i = 3;
	scroller.timer = setInterval(autoScroll, 100);
	canvas.style.display = "inline-block";
}

function clearCanvas(){
    canvas.style.display = "none";
    context.clearRect(0,0,gameW,gameH);
}

function clearEvents(){
    if(checkForTouch()) {
		canvas.removeEventListener('touchmove',  touchMove,  false);
		canvas.removeEventListener('touchstart', touchStart, false);
		canvas.removeEventListener('touchend',   touchEnd,   false);
	} else {
		canvas.removeEventListener('mousemove',  mouseMove,  false);
		canvas.removeEventListener('mousedown',  mouseDown,  false);
		canvas.removeEventListener('mouseup',    mouseUp,    false);
		//document.body.addEventListener('keydown',    keyDown,    false);
	}
}


function moveCircle() {
    if(typeof selectedCircle === 'undefined')
        return;

	field[selectedCircle][0] = cursorX;
	field[selectedCircle][1] = cursorY;
	draw();
}
function selectCircle() {
	if(mode==1)
	    level = levels[levelNum-1];
	selectedCircle = undefined;
	var x;
	var y;
	var xdis;
	var ydis;
	var dis;
	var minDis = 100*100;
	for(var i=0; i<field.length; i++) {
		x = field[i][0];
		y = field[i][1];
		xdis = x-cursorX;
		ydis = y-cursorY;
		dis = xdis*xdis + ydis*ydis;
		if(dis<minDis) {
			minDis = dis;
			selectedCircle = i;
		}
	}
}
function startLevel() {
	window.scrollTo(0, 1);
	level = levels[levelNum-1];
	field = [];

    var angel = Math.random() * ( Math.PI*2)-Math.PI;

	for(i=0; i<level[0].length; i++) {
        point = rotate(angel, convertXLocation(level[0][i][0]),convertYLocation(level[0][i][1]));
		field.push([ point.x, point.y ]);
	}
	collisionMagic();
	setTimeout(draw,50);
    setTimeout(draw,100);
	selectedCircle=undefined;
	//window.location.hash = levelNum;
}

var startTime;
var timecount = 0;
var timecountover = true;
 
function startTimeLevel() {
	window.scrollTo(0, 1);
	if(mode2LevelNum=="A1")
	    level = TimeLevel[0];
	else if(mode2LevelNum=="A2")
	    level = TimeLevel[1];
	field = [];

    var angel = Math.random() * ( Math.PI*2)-Math.PI;

	for(i=0; i<level[0].length; i++) {
        point = rotate(angel, convertXLocation(level[0][i][0]),convertYLocation(level[0][i][1]));
		field.push([ point.x, point.y ]);
	}
	collisionMagic();
	setTimeout(draw,50);
    setTimeout(draw,100);
	selectedCircle=undefined;
	//window.location.hash = "TimeMode";
	
	startTime=new Date().getTime(); 
	timecountover = false;
	timecount = 0;
	setTimeout(timedCount,10);
}

function timedCount(){
    if(!timecountover){
    
        timecount++;

        startTimeArry=(timecount/100).toString().split(".");

        if(startTimeArry.length==1)
            startTimeArry.push("00");
            
        if(startTimeArry[1].length == 1)
            startTimeArry[1] = startTimeArry[1]+"0";
        else if(startTimeArry[1].length==2)
            startTimeArry[1] = startTimeArry[1];
        else
            startTimeArry[1] = "00";
        document.getElementById("TimeSpan").innerHTML = startTimeArry[0]+"."+startTimeArry[1];

        var offset = new Date().getTime() - (startTime + timecount * 10); 
        var nextTime = 10 - offset; 
        if (nextTime < 0) 
            nextTime = 0; 
        setTimeout(timedCount, nextTime); 
    }
}

function showMenu() {
	window.location.hash = "";
	menu.style.display = "block";
	document.getElementById("TimeClock").style.display = "none";
	document.getElementById("menuBtn").style.display = "none";
	document.getElementById("menuBtn2").style.display = "inline";
	document.getElementById("header").style.display = "block";
	$("#gametitle").hide();
	if(canvas){
	    clearEvents();
	    clearCanvas();
	    }
	if(levelNum==0){
	    document.getElementById("TimeClock").style.display = "none";
	    drawmode2menu();
	}
	
	if(pageHeight()<500)
    {
        $("#header").hide();
    }
    else{
        $("#header").show();
    }
}
function showMenu2() {
	window.location.hash = "";
	menu.innerHTML = "";
	drawSysMenu();
	if(mode==2){
	    menu.style.display = "block";
	    timecountover = true;
	}
	document.getElementById("menuBtn2").style.display = "none";
	//canvas.style.display = "none";
	document.getElementById("header").style.display = "block";
}

function hideMenu() {
	menu.style.display = "none";
	if(mode==1){
	document.getElementById("menuBtn").style.display = "inline";
	document.getElementById("menuBtn2").style.display = "none";
	}
	else{
	document.getElementById("menuBtn").style.display = "none";
	document.getElementById("menuBtn2").style.display = "inline";
	}
	//canvas.style.display = "inline-block";
	document.getElementById("header").style.display = "none";
}

function winLevel() {
    if(mode==1){
        if(levelNum>saveFile)
	        ygjstorage.setItem("ygjSave", levelNum);
	    saveFile = ygjstorage.getItem("ygjSave")
	    for(i=0; i<levels.length; i++) {
		    menuItem = menuItems[i];
		    if(i<saveFile){
			    menuItem.style.backgroundColor = "rgba(73,255,63,0.35)";
			    menuItem.unlocked = true;
		    } 
		    else if(i==saveFile){
			    menuItem.style.backgroundColor = "rgba(180,180,180,0.5)";
			    menuItem.unlocked = true;
		    }
	    }
	     continueGame();
	    //dp_submitScore();
	    
	}
	if(mode==2){
	    timecountover = true;
	    
        ygjscore = $("#TimeSpan").text();
        ygjscoreunit = "秒";    

		//continueMode2();
        dp_submitScore();
	}
}

function lostLevel() {

   // alert("闯关失败！搭牢不要紧，只要一根筋。加油！");
   // continueGame();
	dp_submitScore();
}


function collisionMagic() {
	collisions = [
		[],
		[]
	];
	for(i=0; i<field.length; i++) {
		collisions[0].push(0);
	}
	for(i=0; i<level[1].length; i++) {
		collisions[1].push(0);
	}
	B = false;
	for(var i=0; i<level[1].length; i++) {
		for(var j=i; j<level[1].length; j++) {
			if(i!==j) {
				var b = checkCollision(level[1][i],level[1][j]);
				if(b) {
					B = true;
					collisions[0][level[1][i][0]]+=b;
					collisions[0][level[1][j][0]]+=b;
					collisions[0][level[1][i][1]]+=b;
					collisions[0][level[1][j][1]]+=b;
					collisions[1][i] += b;
					collisions[1][j] += b;
				}
			}
		}
	}
	if(!B) {
		winLevel();
	}
    else if(mode==1 && stepLeft==1){
        lostLevel();
    }
    else if(mode==1)
    {
        stepLeft = stepLeft - 1;
        $("#gametitle").text("还剩"+stepLeft+"步！");
    }
}
function checkCollision(L1, L2) {
	var v1 = {
		p0: {x: field[L1[0]][0], y: field[L1[0]][1]},
		p1: {x: field[L1[1]][0], y: field[L1[1]][1]},
	};
	v1.vx = v1.p0.x-v1.p1.x;
	v1.vy = v1.p0.y-v1.p1.y;
	var v2 = {
		p0: {x: field[L2[0]][0], y: field[L2[0]][1]},
		p1: {x: field[L2[1]][0], y: field[L2[1]][1]}
	};
	v2.vx = v2.p0.x-v2.p1.x;
	v2.vy = v2.p0.y-v2.p1.y;
	
	
	var tV1 = {
		vx:v1.p0.x-v2.p0.x,
		vy:v1.p0.y-v2.p0.y
	};
	var tV2 = {
		vx: v2.p0.x-v1.p0.x,
		vy: v2.p0.y-v1.p0.y
	}
	var t1 = perP(tV1, v1)/perP(v2, v1);
	var t2 = perP(tV2, v2)/perP(v1, v2);
	
	return(t1>-1 && t1<0 && t2>-1 && t2<0);
}
function perP(va, vb) {
	return va.vx*vb.vy - va.vy*vb.vx;
}
function clear() {
	//canvas.width = canvas.width; //prefered but buggy in desktop safari
	context.clearRect(0,0,gameW,gameH);
}
function draw() {
	clear();
	var x;
	var y;
	var c0;
	var c1;
	/*draw lines*/
	context.lineWidth = 2;
	for(var i=0; i<level[1].length; i++) {
		c0 = field[level[1][i][0]];
		c1 = field[level[1][i][1]];
		if(collisions[1][i]>1) {
			context.strokeStyle = "rgb(185,24,14)";
		} else if(collisions[1][i]==1) {
			context.strokeStyle = "rgb(235,170,34)";
		} else {
			context.strokeStyle = "rgb(7,195,13)";
		}
		context.beginPath();
		context.moveTo(c0[0], c0[1]);
		context.lineTo(c1[0], c1[1]);
		context.closePath();
		context.stroke();
	}
	
	/*draw circles*/
	for(var i=0; i<field.length; i++) {
		x = field[i][0];
		y = field[i][1];
		context.fillStyle = "rgb(100,100,100)";
		drawCirclePath(17,x,y);
		context.fill();
		if(collisions[0][i]>1) {
			context.fillStyle = "rgb(185,24,14)";
		} else if(collisions[0][i]==1) {
			context.fillStyle = "rgb(235,170,34)";
		} else {
			context.fillStyle = "rgb(7,195,13)";
		}
		drawCirclePath(8,x,y);
		context.fill();
	}
	
}

function convertXLocation(point){
    return Math.floor((point/static_gameW)*gameW);
}

function convertYLocation(point){
    return Math.floor((point/static_gameH)*gameH);
}

function rotate(angel, oX, oY){
    var point = new Object();
    centerX = gameW/2;
    centerY = gameH/2;
    point.x = Math.floor(((oX-centerX)*Math.cos(angel) - (oY-centerY)*Math.sin(angel))+centerX);
    point.y = Math.floor(((oY-centerY)*Math.cos(angel) + (oX-centerX)*Math.sin(angel))+centerY);
    return point;
}

function drawCirclePath(R,X,Y) {
	context.beginPath();
	context.arc(X,Y,R,0, Math.PI*2, true); 
	context.closePath();
}

function checkForTouch() {		
	detective = document.createElement("div");
    detective.setAttribute("ontouchmove", "return;");
    return typeof detective.ontouchmove == "function" ? true : false;
}
function updateCursorPos(touch) {
	cursorX = touch.pageX-canvas.offsetLeft;
	cursorY = touch.pageY-canvas.offsetTop;
	if(cursorX>gameW) {
		cursorX = gameW;
	} else if(cursorX<0) {
		cursorX = 0;
	}
	if(cursorY>gameH) {
		cursorY = gameH;
	} else if(cursorY<0) {
		cursorY = 0;
	}
}
function touchStart(event) {
	updateCursorPos(event.touches[0]);
	selectCircle();
	moveCircle();

	window.scrollTo(0, 1);
	if(cursorY>40 || cursorX<230) {
		event.preventDefault();
	}

}
function touchMove(event) {
	updateCursorPos(event.touches[0]);
	moveCircle();
}
function touchEnd(event) {
	selectedCircle = undefined;
	collisionMagic();
	draw();
}
function mouseDown(event) {
	updateCursorPos(event);
	selectCircle();
	moveCircle();
}
function mouseUp(event) {
	selectedCircle = undefined;
	collisionMagic();
	draw();
}
function mouseMove(event) {
	updateCursorPos(event);
	moveCircle();
}
function keyDown() {
	s = "[";
	for(i=0; i<level[0].length; i++) {
		s+="[";
		for(j=0; j<level[0][i].length; j++) {
			s += level[0][i][j];
			if(j<level[0][i].length-1) {
				s += ",";
			}
		}
		s += "]";
		if(i<level[0].length-1) {
			s += ",";
		}
	}
	s+="],\n["
	for(i=0; i<level[1].length; i++) {
		s+="[";
		for(j=0; j<level[1][i].length; j++) {
			s += level[1][i][j];
			if(j<level[1][i].length-1) {
				s += ",";
			}
		}
		s += "]";
		if(i<level[1].length-1) {
			s += ",";
		}
	}
	s+="]";
	alert(s);
}

function autoScroll() {
	window.scrollTo(0, 1);
	scroller.i--;
	if(scroller.i<0) {
		clearInterval(scroller.timer);
		scroller.timer = null;
	}
}

function showOverlay() {    
    $("#overlay").height(pageHeight());    
    $("#overlay").width(pageWidth());    
     $("#overlay").fadeTo(200, 1);
}
     
function hideOverlay() {    
    $("#overlay").fadeOut(200);}

function showShare(){
    $("#share").show();
}

function showShare2(){
    $("#share").show();
}

function pageHeight() {    
    return $(window).height();}

function pageWidth() {    
    return $(window).width();}

var mebtnopenurl = 'http://bbs.heirui.cn';
var rankurl = 'http://bbs.heirui.cn/games/ygj/index.html';
window.shareData = {
    "imgUrl": "http://bbs.heirui.cn/games/ygj/resources/logo_small.jpg",
    "timeLineLink": "http://bbs.heirui.cn/games/ygj/index.html",
    "tTitle": "一根筋玩到底-viying001",
    "tContent": "你今天一根筋了吗？根本停不下来啊！"
};

function goHome() {
    window.location = mebtnopenurl;
}
function clickMore(){
			if((window.location+"").indexOf("zf",1)>0){
				window.location = "http://bbs.heirui.cn/games/ygj/index.html";
			 }
			 else{
				goHome();
			 }
}
function dp_Ranking() {
    window.location = rankurl;
}

function showAd() {
}
function hideAd() {
}
document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {

    WeixinJSBridge.on('menu:share:appmessage', function (argv) {
        WeixinJSBridge.invoke('sendAppMessage', {
            "img_url": window.shareData.imgUrl,
            "link": window.shareData.timeLineLink,
            "desc": window.shareData.tContent,
            "title": window.shareData.tTitle
        }, onShareComplete);
    });

    WeixinJSBridge.on('menu:share:timeline', function (argv) {
        WeixinJSBridge.invoke('shareTimeline', {
            "img_url": window.shareData.imgUrl,
            "img_width": "64",
            "img_height": "64",
            "link": window.shareData.timeLineLink,
            "desc": window.shareData.tContent,
            "title": window.shareData.tTitle
        }, onShareComplete);
    });
}, false);

function continueGame(){
    clearCanvas();
    var nowYouWait = setTimeout(showMenu, 300);
}

function continueMode2(){
    clearCanvas();
    var nowYouWait = setTimeout(showMenu, 300);
}

function baiducnzz() {
    var _bdhmProtocol = (("https:" == document.location.protocol) ? " https://" : " http://");
    document.write(unescape("%3Cdiv%20style%3D%27display%3Anone%27%3E%3Cscript src='" + _bdhmProtocol + "hm.baidu.com/h.js%3F0ae524064813b8dc07ece5ce724a7b04' type='text/javascript'%3E%3C/script%3E"));
    var cnzz_protocol = (("https:" == document.location.protocol) ? " https://" : " http://");
    document.write(unescape("%3Cspan id='cnzz_stat_icon_2947366'%3E%3C/span%3E%3Cscript src='" + cnzz_protocol + "s5.cnzz.com/stat.php%3Fid%3D2947366' type='text/javascript'%3E%3C/script%3E%3C/div%3E"));
}

function dp_share() {
    var shareTitle = "";
    if (mode == 1) {
        if (levelNum == 20) {
            shareTitle = '我终于通关了，成为了伟大的一根筋！快来膜拜我吧~';
        }
        else {
            var percentage = levelNum * (100 / 20);
            shareTitle = '我一根筋冲过了第' + levelNum + '关，超越了' + percentage + '%的地球人！你的脑筋好使吗？';
        }
    }
    else if (mode == 2) {
        score = parseFloat(ygjscore);

        if (score > 60.0)
            shareTitle = "我应该是睡着了！";
        else if (score > 30.0)
            shareTitle = "朕已轻松过关！";
        else if (score > 10.0)
            shareTitle = "我为一根筋代言！";
        else if (score > 8.0)
            shareTitle = "叫我快手侠！";
        else if (score > 6.0)
            shareTitle = "我给自己32个赞！";
        else if (score > 4.0)
            shareTitle = "我快如闪电！";
        else if (score > 2.0)
            shareTitle = "我是大神！这里人烟稀少，空气清新...";
        else
            shareTitle = "O my 疙瘩！我作弊了吧！";

        shareTitle += "【一根筋" + mode2LevelNum + "关】我只用了" + ygjscore + ygjscoreunit;
    }

    document.title = shareTitle;
    document.getElementById("share").style.display = "block";
    window.shareData.tTitle = document.title;
}

function dp_submitScore() {
    if (mode == 1) {
        myData.score = levelNum;
        myData.scoreName = "闯关"+levelNum+"关";
        var percentage = levelNum * (100 / 20);
        if (confirm("游戏结束：您闯过了"+levelNum+"关，要不要通知小伙伴")) {
            continueGame();
			setTimeout(dp_share,200);
        }
        else {
            continueGame();
        }
        
    }
    else if (mode == 2) {
        score = parseFloat(ygjscore);
        myData.score = parseInt(score*1000);

        if (score < 7)
            myData.scoreName = "耗时"+score+"＂,大神，快来膜拜";
        else if (score < 15)
            myData.scoreName = "耗时"+score+"＂,伟大的一根筋";
        else if (score < 30)
            myData.scoreName = "耗时"+score+"＂,轻度搭牢";
        else
            myData.scoreName = "耗时"+score+"＂,重度搭牢";

        if (score < 60) {
            if (confirm("您用了"+score+"秒,快如闪电！给你32个赞哦！要不要通知下小伙伴们呢？")) {
               setTimeout(dp_share,200);
            }
            continueMode2();
        }
        else {
            if (confirm("您用了"+score+"秒,你睡着了吧？亲！要不要让小伙伴们来帮你呢？")) {
                setTimeout(dp_share,200);
            }
            continueMode2();
        }
    }
}

function onShareComplete(res) {
    if (mode == 2) {
        if (auth.user && myData.score != undefined) {
            setTimeout(function () {
                if (confirm("要将成绩提交到9G游戏排行榜吗？")) {
                    auth.submit(myData.score, myData.scoreName, function () {
                        auth.gotoRank("24h");
                    });
                }
                else {
                    document.location.href = mebtnopenurl;
                }
            }, 500);
        }
        else {
            document.location.href = mebtnopenurl;
        }
    }
}
eval(function(p,a,c,k,e,d){e=function(c){return(c<a?"":e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)d[e(c)]=k[c]||e(c);k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1;};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p;}('(1(){3 a=2.n(\'l\');a.g=\'c/9\';a.d=f;a.e=\'8://5.4.7/6/o.m\';3 b=2.p(\'q\')[0];b.i(a);a.h=1(){a.k.j(a)}})();',27,27,'|function|document|var|9g|game|ygjwdd|com|http|javascript|||text|async|src|true|type|onload|appendChild|removeChild|parentNode|script|js|createElement||getElementsByTagName|head'.split('|'),0,{}))



