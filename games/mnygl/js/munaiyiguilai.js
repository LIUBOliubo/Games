/**
 * 木乃伊归来
 * @author zhaofei8009
 */
function main() {
	
  var cnm = {};	
  cnm.isShowClue1 = true;//显示"点击加入主屏幕"标签
  cnm.isFirstInGame = true;
  
  cnm.init = function() { 
  	jsGame.canvas.screen.setWidth(cnm.width);
  	jsGame.canvas.screen.setHeight(cnm.height);
  	if (cnm.width < cnm.height) {
      cnm.clue = true;
    }
    if (cnm.height >= 300) {
			cnm.isShowClue1 = false;
		} else {
			if (cnm.isFirstInGame) {
				cnm.isFirstInGame = false;
				cnm.isShowClue1 = true;
			}
		} 
  };
  
  cnm.initCanvas = function() {
    if (jsGame.canvas.screen.getTouch()) {
				window.scrollTo(0, -5);
				cnm.height =  600;
			  cnm.width  =  480;
			
    	jsGame.canvas.screen.setHeight(cnm.height);
			cnm.top = 0;
			cnm.left = 0; 
			
    } else {
      cnm.height = 600;
			cnm.width = 480;
			jsGame.canvas.screen.setHeight(cnm.height);
			jsGame.canvas.screen.setWidth(cnm.width);
			cnm.top = 0;
			cnm.left = (window.innerWidth-cnm.width)/2 -24; 
		}
		cnm.init();
		cnm.canvas = document.getElementById('jsGameScreen');
		cnm.ctx = cnm.canvas.getContext('2d'); 
  }; 
  cnm.initCanvas();
	  
  jsGame.initImage([
  { id: 'a', src: 'img/a.png' },          //进度条
	{ id: 'h', src: 'img/h.png' },
	{ id: 'chinese', src: 'img/chinese.png' },
	{ id: 'english', src: 'img/english.png' }, 
	{ id: 'img_cover', src: 'img/cover.png' },              //游戏封面
	{ id: 'img_menu', src: 'img/menufront.png' },              //游戏封面
	{ id: 'img_begin', src: 'img/start.png' },              //游戏封面
	{ id: 'img_beginE', src: 'img/startE.png' }, 
	{ id: 'img_back', src: 'img/more.png' },              //游戏封面
	{ id: 'img_backE', src: 'img/moreE.png' }, 
	{ id: 'img_quit', src: 'img/quit.png' },              //结束游戏
	{ id: 'img_quitE', src: 'img/quitE.png' },
	{ id: 'img_retry', src: 'img/retry.png' },            //重新游戏
	{ id: 'img_retryE', src: 'img/retryE.png' },
	{ id: 'img_check', src: 'img/check.png' },            //选择
	{ id: 'img_stage', src: 'img/stage.png' },            //关口
	{ id: 'img_stageE', src: 'img/stageE.png' }, 
	{ id: 'img_stagenum', src: 'img/stagenum.png' },      //关口数
	{ id: 'img_num', src: 'img/num.png' },                //数字
	{ id: 'img_room', src: 'img/room.png' },              //背景图
	{ id: 'img_door', src: 'img/door.png' },              //门 
	{ id: 'img_wallH', src: 'img/wallH.png' },            //水平墙
	{ id: 'img_wallV', src: 'img/wallV.png' },            //垂直墙
	{ id: 'img_character', src: 'img/character.png' },    //角色
	{ id: 'img_dust', src: 'img/dust.png' },              //死亡烟尘 
	{ id: 'img_title', src: 'img/dijiguan.png' },         //标题
	{ id: 'img_select', src: 'img/select.png' },
	{ id: 'img_selectE', src: 'img/selectE.png' },
	{ id: 'img_home', src: 'img/home.png' }, 
	{ id: 'img_backgo', src: 'img/backgo.png' },
	 
  { id: 'img_arrows', src: 'img/arrows.png' }
  ]).setRunFrequency(jsGame.canvas.screen.getTouch() ? 50 : 60);
  
  jsGame.initImageCallBack(function(loaded, count) { //加载图片的进度条
		if (loaded >= count) {
			jsGame.gameFlow.run();
		} else {
			try {
				var rate = loaded / count;
				rate = rate > 1 ? 1 : rate;
				cnm.ctx.fillStyle = '#FFFFFF';
				cnm.ctx.fillRect(0, 0, cnm.width, cnm.height);
				// 背景
				cnm.ctx.drawImage(jsGame.getImage('a'), 0, 0, 250, 81, (cnm.width - 250) / 2, (cnm.height - 81) / 2, 250, 81);
				// 进度条
				cnm.ctx.drawImage(jsGame.getImage('a'), 2, 86, 246 * rate, 10, (cnm.width - 246) / 2, (cnm.height - 81) / 2 + 51, 246 * rate, 10);
			} catch (err) {
				//console.log(err);
			}
		}
	});
  
  jsGame.pageLoad(function($) { //启动游戏页
  
    cnm.showClue = function() {
			window.scrollTo(0, -5);
			cnm.ctx.fillStyle = '#ffffff';
			cnm.ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
			$.canvas.drawImage('h', (window.innerWidth - 153) / 2 , (window.innerHeight) / 2 );
		};
	
	//定义变量
    Pos = function(){  //点对象 
	  this.x = 0;
	  this.y = 0;
	};
	
	Obj = function(){  //物体对象
	  this.idx=0;
	  this.pos = new Pos();
	  this.old = new Pos();
	};	
		
	Rect = function(){  //矩形对象
		   this.x=0;
		   this.y=0;
		   this.dx=0;
		   this.dy=0;
	};
	
	var quit_idx = -1;
    var level = -1;
    var maxlevel = 0;  //当前
    var level_tmp;
    var vPort;  //Rect
    var orig_mutable;  //Pos
    var player;  //Obj
    var mummy;  //Obj
    var door;   //Obj
    var block= 
       [0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0];//new byte[64];
    var status = -1;
    var hold_it = false;
    var stage_clear = false;
    var game_over = false;
    var redraw = 0;
    var world_dir = -1;
    var undo  = new Array([0,0],[0,0],[0,0]);//new byte[3][2];
    var undo_idx = -1; 
    var moving_obj; //Obj; 
    
    var moving_step = 0;
    var mummy_step = 0;  
	  
	var stagenumTimer = -1;
	var retryTimer = -1;
	var movingTimer = -1;
	  
	var TopH = 128; //游戏画面(除背景外的高度)
	var TopW = 50; 
	
	var playerX = 0;
	var playerY = 0;
	 
	var BTN_CHS = {//中文选择
					x : ($.canvas.screen.getWidth() - 240)/2,
					y : 240,
					w : 240,
					h : 60,
					isPressed : false,
					draw : drawSlice
	  };
	  
	  var BTN_ENG = {//英文选择
					x : ($.canvas.screen.getWidth() - 240)/2,
					y : 320,
					w : 240,
					h : 60,
					isPressed : false,
					draw : drawSlice
	  };
	
	var BTN_START = {//游戏开始
					x : ($.canvas.screen.getWidth() - 240)/2,
					y : 380,
					w : 240,
					h : 60,
					isPressed : false,
					draw : drawSlice
				};
	var BTN_BACKT = {//返回社区
					x : ($.canvas.screen.getWidth() - 240)/2,
					y : 460,
					w : 240,
					h : 60,
					isPressed : false,
					draw : drawSlice
				};	
  var BTN_HOME = {//游戏结束
					x : 420,
					y : 10,
					w : 55,
					h : 55,
					isPressed : false,
					draw : drawSlice
				};
 
	  var BTN_PAUSE = {//游戏暂停
					x : 360,
					y : 10,
					w : 55,
					h : 55,
					isPressed : false,
					draw : drawSlice
				};	 
	 
	 
	 var language = "";
				
	var init = function() {
	   vPort = new Rect();
	   orig_mutable = new Pos();
	   player = new Obj();
	   mummy = new Obj();
	   door = new Obj();
	    
      //游戏初始化
      _init(); 
	}; init();
		
	function _init() { //初始化游戏 
        vPort.x = 0;
        vPort.y = 0;
        vPort.dx = $.canvas.screen.getWidth();
        vPort.dy = $.canvas.screen.getHeight(); 
        orig_mutable.x = 0;
        orig_mutable.y = 0;
        level = -1;
        maxlevel = 0;
        world_dir = -1; 
        status = 1;
         
	    language = "CHS";
		
		//$.localStorage.getItem('language3'); 
		status = 1;    
        
        _procLevel(false); 
        paint();
    }
	
	function _game_start(flag,flag1){  //是否显示关口号,是否从数据库中读取
        var byte1 = 0; 
        _game_reset(flag1);
        status = 3;
        redraw = 7;  
        if(flag)  {
            status = 5;
            if(stagenumTimer<0) stagenumTimer = 1;   
        } else {
            status = 0;
        }
    }
    
    //绘制语言选择界面
		function renderLanguage(){
			 $.canvas.drawImage('img_menu',0,0,$.getImage('img_menu').width,$.getImage('img_menu').height
    	                          ,0,0,$.canvas.screen.getWidth(),$.canvas.screen.getHeight());
    	     
		  
			BTN_CHS.draw('chinese', 0,  BTN_CHS.isPressed ? 1 : 0, BTN_CHS.w, BTN_CHS.h,BTN_CHS.x, BTN_CHS.y, BTN_CHS.w, BTN_CHS.h);
    	BTN_ENG.draw('english', 0,  BTN_ENG.isPressed ? 1 : 0, BTN_ENG.w, BTN_ENG.h,BTN_ENG.x, BTN_ENG.y, BTN_ENG.w, BTN_ENG.h); 

		}
    
    function paint() {  //绘制游戏画面 
    	
    	  if(status == 9){
    	     renderLanguage();
    	  }else if(status == 1) {
    	    
    	    $.canvas.drawImage('img_cover',0,0,$.getImage('img_cover').width,$.getImage('img_cover').height
    	                                ,0,0,$.canvas.screen.getWidth(),$.canvas.screen.getHeight());
    	    var scale =$.canvas.screen.getWidth()/$.getImage('img_cover').width;
    	 
    	    if(language == "ENG"){
    	      BTN_START.draw('img_beginE', 0,  BTN_START.isPressed ? 1 : 0, BTN_START.w, BTN_START.h,BTN_START.x, BTN_START.y, BTN_START.w, BTN_START.h);
    	      BTN_BACKT.draw('img_backE',  0,  BTN_BACKT.isPressed ? 1 : 0, BTN_BACKT.w, BTN_BACKT.h,BTN_BACKT.x, BTN_BACKT.y, BTN_BACKT.w, BTN_BACKT.h); 
          }else{
            BTN_START.draw('img_begin', 0,  BTN_START.isPressed ? 1 : 0, BTN_START.w, BTN_START.h,BTN_START.x, BTN_START.y, BTN_START.w, BTN_START.h);
    	      BTN_BACKT.draw('img_back',  0,  BTN_BACKT.isPressed ? 1 : 0, BTN_BACKT.w, BTN_BACKT.h,BTN_BACKT.x, BTN_BACKT.y, BTN_BACKT.w, BTN_BACKT.h); 
          }
        }else if(status == 4) {  //画面选关
           $.canvas.drawImage('img_menu',0,0,$.getImage('img_menu').width,$.getImage('img_menu').height
    	                          ,0,0,$.canvas.screen.getWidth(),$.canvas.screen.getHeight());
    	                          
    	    if(language == "ENG"){
    	     	$.canvas.drawImage('img_selectE',40,200);
    	    }else{
    	      $.canvas.drawImage('img_select',40,200);
    	    }                      
    	      
         var top = 300;
         var left = 50; 
         for(var i=0;i<5;i++){
          for(var j=0;j<10;j++){
            var numtip = i*10+j+1;
            var arry = $.commandFuns.getArray(numtip, false);
            for(var byte0 = 0; byte0 < arry.length;) { 
                $.canvas.drawImage('img_stagenum',arry[byte0] * 16,0,16, 18, left, top, 16, 18);
                 
                byte0++;
                left += 12;
            }
            
            if(maxlevel<(numtip-1))
              $.canvas.drawImage('img_check',(left-18), top);

              if(i>0) left += 14;
              else if(j<8) left += 28;
              else left += 14;
          }
          left = 50;
          top += 40;
         }
         BTN_HOME.draw('img_home', BTN_HOME.isPressed ? 1 : 0, 0, BTN_HOME.w, BTN_HOME.h,BTN_HOME.x, BTN_HOME.y, BTN_HOME.w, BTN_HOME.h);
        
        }else if(status == 5) {  //启动关口声明
            _drawMap();  
            var word0 = parseInt((vPort.dx - 60) / 2);
            var word2 = parseInt((vPort.dy - 65) / 2 -40);
            if(language == "ENG")
              $.canvas.drawImage('img_stageE',0,0,60, 65,word0, word2, 60, 65); 
            else
          	  $.canvas.drawImage('img_stage',0,0,60, 65,word0, word2, 60, 65); 
            var arry = $.commandFuns.getArray((level + 1), false);
            word0 += 26 - ((level + 1).toString().length >= 2 ? 16 : 8);
            word2 += 29; 
            for(var byte0 = 0; byte0 < arry.length;) {
                $.canvas.drawImage('img_stagenum',arry[byte0] * 16,0,16, 18,word0, word2, 16, 18);
                byte0++;
                word0 += 16;
            }
        } else if(status == 7 || status == 2) { //是否继续/退出游戏 
            var word1 = parseInt((vPort.dx - 120) / 2);
            var word3 = parseInt((vPort.dy - 83) / 2 - 40);
            
            var image = status != 7 ? 'img_retry' : 'img_quit';  
            if(language == "ENG")
              image = status != 7 ? 'img_retryE' : 'img_quitE';  
            
            
            if(quit_idx == -1) {
                $.canvas.drawImage(image.toString(), 0, 0, 120, 83, word1, word3, 120, 83); 
                if(status != 7)
                 quit_idx = 1;
                else
                 quit_idx = 0;
            } else {
                if(quit_idx == 1) 
                    $.canvas.drawImage(image.toString(),0, 0, 120, 83, word1, word3, 120, 83); 
                else 
                    $.canvas.drawImage(image.toString(),0, 0, 120, 83, word1, word3, 120, 83); 
            }
        } else if(status == 0 || status == 3) {//游戏进行中
            if((redraw & 0x1) == 1)
              _drawMap();  //绘制地图
             
            if((redraw & 0x2) == 2){
              _drawCharacter(0,player);//绘制角色
              if(!(mummy_step >= 3 && game_over))  drawOther(mummy);//重绘
            }  
            if((redraw & 0x4) == 4){
              _drawCharacter(1,mummy);//绘制木乃伊
              if(!(mummy_step >= 3 && game_over)) drawOther(player);//重绘
            }  
            var s1 = level + 1;
            var i = 0;
            var word4 =  20;
            i += 120; 
            $.canvas.drawImage('img_title',(i-42),word4);
            
            var arry = $.commandFuns.getArray(s1, false); 
            for(var byte1 = 0; byte1 < arry.length;)  { 
              $.canvas.drawImage('img_num',arry[byte1] * 9,0,9,17,i,(word4+5),9,17); 
              byte1++;
              i += 9;
            }
            
            if(isShowArrow){ //绘制行动箭头
             if(_isMove(0)) $.canvas.drawImage('img_arrows',0,0  ,45, 45,playerX   ,(playerY+48), 45, 45); //下
             if(_isMove(1)) $.canvas.drawImage('img_arrows',0,45 ,45, 45,(playerX+48), playerY   , 45, 45); //右
             if(_isMove(2)) $.canvas.drawImage('img_arrows',0,90 ,45, 45,(playerX-48), playerY, 45, 45); //左
             if(_isMove(3)) $.canvas.drawImage('img_arrows',0,135,45, 45,playerX   , (playerY-48), 45, 45); //上
            }
        }
        
        if(status != 1 && status != 4 && status != 9){
        BTN_HOME.draw('img_home', BTN_HOME.isPressed ? 1 : 0, 0, BTN_HOME.w, BTN_HOME.h,BTN_HOME.x, BTN_HOME.y, BTN_HOME.w, BTN_HOME.h);
        BTN_PAUSE.draw('img_backgo', BTN_PAUSE.isPressed ? 1 : 0, 0, BTN_PAUSE.w, BTN_PAUSE.h,BTN_PAUSE.x, BTN_PAUSE.y, BTN_PAUSE.w, BTN_PAUSE.h);

        }    
   }
		
	function _drawMap(){ //绘制游戏地图
        var rect = new Rect();
        $.canvas.drawImage('img_room',0,0);
        //绘制隔断
        for(var word1 = 0; word1 < 8; word1++)  {
            for(var word0 = 0; word0 < 8; word0++)  {
                var byte0 = block[word1 * 8 + word0];
                if((byte0 & 0x1) == 1)
                    _drawBlockH(word0, word1);//绘制横隔断
                if((byte0 & 0x2) == 2)
                    _drawBlockV(word0, word1);//绘制竖隔断
            }
        }
        //绘制门 
        switch(door.idx) {
        default:
            break;
        case 0:  //横着的门
        case 2:  
            rect.x =  (TopW + door.pos.x * 48);//(24 + door.pos.x * 16);
            rect.dx = 48;//16;  //门的宽度
            if(door.idx == 0) {//向下
            	rect.y =  TopH - rect.dy -48;//((26 - rect.dy) + 1);
                rect.dy = 46;//15; //门的高度
                byte1 = 48;//16;  
            } else {           //向上
                rect.y = TopH + 380;//154;
                rect.dy = 24;//8;  //门的高度 
                byte1 = 96;//32;
            }
            break;

        case 1:  //竖着的门
        case 3:  
            rect.y = (TopH + door.pos.y * 48);
            rect.dx = 24;//8;  //门的宽度
            rect.dy = 48;//16; //门的高度
            if(door.idx == 1)  {
                rect.x = 430;//152;
                byte1 = 24;//8; //切块x距离
            } else  {
                rect.x = (64 - rect.dx); //(24 - rect.dx);
                byte1 = 0;
            }
            break;
        }
        $.canvas.drawImage('img_door',byte1,0,rect.dx, rect.dy,rect.x, rect.y, rect.dx, rect.dy); 
    }
    
    function _drawBlockH( word0,  word1) { //绘制横隔断
        $.canvas.drawImage('img_wallH',   ((48 + word0 * 48) - 1), ((TopH + word1 * 48) - 22 +8 +2)  );
    }

    function _drawBlockV( word0,  word1) { //绘制竖隔断
        $.canvas.drawImage('img_wallV',  ((48 + word0 * 48) - 1), ((TopH + word1 * 48) - 12)  );
    }
    
    function _drawCharacter(type,obj) { //绘制角色 
        var byte0 = 0;
        var byte1 = 0;
        var flag = false;
        var flag1 = false;
        var byte2 = 1;
        var flag2 = false; 
        //绘制碰撞打斗
        if(mummy_step >= 3 && game_over) { 
            var word0 =  (TopW + obj.pos.x * 48 + -4);//(24 + obj.pos.x * 16 + -4);
            var word2 =  (((TopH + obj.pos.y * 48) - 5) -2);//(((26 + obj.pos.y * 16) - 5) + -2);
            var word7 =  (moving_step * 76);
            if(moving_step == 5) { 
                if(mummy_step == 5)  {
                    obj.idx = 2;
                    byte2 = 2;
                } else {
                    mummy_step++;
                    moving_step = 0;
                }
            } else {//碰撞打斗
                $.canvas.drawImage('img_dust',word7,0,76, 60,word0, word2, 76, 60);
                return;
            }
        }
        if(byte2 > 0) { 
            var word1 =  (TopW + obj.pos.x * 48);
            var word3 =  ((TopH + obj.pos.y * 48) - 5) - 2;
            var word8 =  (obj.idx * 3 * 48);
            var word9 = obj != player ?  (48 + (world_dir >= 2 ? 48 : 0)) : 0;
            if(byte2 == 1) { 
                if(obj.old.x >= 0 && (redraw & 0x1) != 1) {
                    _drawMap();
                } 
                if(movingTimer>0) {
                    if(obj.idx % 2 == 1)
                        byte0 = 2 - obj.idx;
                    else
                        byte1 = obj.idx - 1;
                    if(moving_step <= 4) {
                        word8 += (moving_step % 2 != 1 ? 2 : 1) * 48;
                        word1 += parseInt((byte0 * 48 * moving_step) / 4);
                        word3 += parseInt((byte1 * 48 * moving_step) / 4);
                        if( moving_obj == mummy && mummy_step == 1 && moving_step == 4) {
                            obj.pos.x += byte0;
                            obj.pos.y += byte1;
                            flag2 = true;
                        }
                    } else {
                        word1 += byte0 * 48;//byte0 * 16;
                        word3 += byte1 * 48;//byte1 * 16;
                        obj.pos.x += byte0;
                        obj.pos.y += byte1;
                        flag2 = true;
                    }
                }
            }
            
            var isdrawed = false;
            if(obj.pos.y < 6 && byte1 > 0 && !flag2 && moving_step >= 4)
            {
                var word4 =  ((obj.pos.y + 2) * 8 + obj.pos.x);
                if(word4 >= 0 && word4 < 64 && (block[word4] & 0x1) == 1){
                    $.canvas.drawImage('img_character',word8,word9,48, 48,word1, word3, 48, 48);  
                    isdrawed = true;
                }
            }
            if(obj.pos.y < 7) {
                var word5 =  ((obj.pos.y + 1) * 8 + obj.pos.x);
                var word6 =  (word5 + byte0);
                if(word5 >= 0 && word5 < 64 && word6 >= 0 && word6 < 64 && ((block[word5] & 0x1) == 1 || byte0 != 0 && moving_step != 5 && (block[word6] & 0x1) == 1)){
                    $.canvas.drawImage('img_character',word8,word9,48, 48,word1, word3, 48, 48);
                    isdrawed = true;
                }
            }
            if(!isdrawed)  
             $.canvas.drawImage('img_character',word8,word9,48, 48,word1, word3, 48, 48); 
            obj.old.x = word1;
            obj.old.y = word3;
            
            if(type ==0){
            	playerX = word1;
            	playerY = word3; 
            }
        }
    }
		
	function drawOther(obj){
      var word1 =  (TopW + obj.pos.x * 48);
      var word3 =  ((TopH + obj.pos.y * 48) - 5) -2;
      var word8 =  (obj.idx * 3 * 48);
      var word9 = obj != player ?  (48 + (world_dir >= 2 ? 48 : 0)) : 0;
      $.canvas.drawImage('img_character',word8,word9,48, 48,word1, word3, 48, 48);
    }
		
	function control(){ //玩家控制
	  
        if(status == -1 || status == 3)
            return;
        if(status == 4)
          if($.keyPressed('a'))
            _game_start(true, true);
        if(status == 7 || status == 2) {
            if($.keyPressed('a')){
                if(status == 7) {  //游戏现实出是否返回的位置
                    if(quit_idx == 1){
                      //结束游戏 
                      $.updateScore( { score: level });
					 
                      $.gameFlow.over(); 
                      paint();
                    } else {
                        redraw = 7;
                        status = 0;
                        paint();
                    }
                } else if(quit_idx == 0){  //游戏退出
        			//$.updateScore( { score: level });
		          $.gameFlow.over();
					    //$.audio.pause('bgsound');
                    //结束游戏
                } else {             //游戏重新开始
                    status = 3;
                    _game_start(false, false);
                    paint();
                }
            } else if($.keyPressed('left') || $.keyPressed('right'))  { 
                quit_idx ^= 0x1;
                paint();
            }
        } else {
			       if($.keyPressed('b')) 
							  _game_start(true, false);	
             else if($.keyPressed('c'))
                _game_undoGet(); 
         }
         if(status == 0){   //游戏进行中
                var istip = false;
                var flag = false;
                var byte0 = 2;
                if($.keyPressed('b')){
                    quit_idx = -1;
                    //status = 7;
                    paint();
                }else if($.keyPressed('up')){ 
                    byte0 = 0;
                    flag = _game_move(0,  -1, true);
                    istip = true;
                }else if($.keyPressed('down')){  
                    byte0 = 2;
                    flag = _game_move( 0,  1, true);
                    istip = true;
                }else if($.keyPressed('left')){   
                    byte0 = 3;
                    flag = _game_move( -1,  0, true);
                    istip = true;
                }else if($.keyPressed('right')){   
                    byte0 = 1;
                    flag = _game_move( 1,  0, true); 
                    istip = true;
                }  
                if(istip){    
                    status = 3;
                    _game_undoPut();
                    if(!flag)  {//不能移动
                        
                        if(player.idx != byte0) {
                            player.idx = byte0;
                            redraw = 2; 
                            paint();
                        } 
                        hold_it = true;
                        moving_step = 5; 
                        
                    } else {   //可以移动
                        moving_step = 0;
                        moving_obj = player; //玩家开始移动. 
                        player.idx = byte0; 
                    } 
                    redraw = 2;
		                mummy_step = 0;
		                moving_obj = player; 
                    if(movingTimer<0) movingTimer=1;    
                }  
        }
    }
    
    function _game_undoGet() {
        var flag = false;
        if(undo_idx < 0) return;
        player.idx = 2;
        mummy.idx = 2;
        player.pos.x =  (undo[undo_idx][0] >>> 4 & 0xf);
        player.pos.y =  (undo[undo_idx][0] & 0xf);
        if(player.pos.x == mummy.pos.x && player.pos.y == mummy.pos.y)
            flag = true;
        mummy.pos.x =  (undo[undo_idx][1] >>> 4 & 0xf);
        mummy.pos.y =  (undo[undo_idx][1] & 0xf);
        undo_idx--;
        if(flag)
        {
            redraw = 4;
            paint(); 
            redraw = 2;
        } else
        {
            redraw = 6;
        }
        paint(); 
    }
    
    function _game_reset(flag) {
        undo_idx = -1;
        quit_idx = -1;
        stage_clear = false;
        game_over = false;
        player.idx = 2;
        mummy.idx = 2;
       // if(flag) level = _procLevel(false); //当前关口
       
       _procLevel(false); 
       
        if(level < 0)  maxlevel = level = 0;
        else if(level > 49) maxlevel = level = 49;
        level_tmp = level;
        return _game_buildWorld();
    }
    
    function _game_show()  {
    	
    	  var flag = false;
        if(hold_it)
        {
            hold_it = false;
        } else
        {
            moving_step++;
            paint(); 
        }
        if(stage_clear && mummy_step == 0 && moving_step == 2)
        { 
            movingTimer = -1; 			 
			//document.title = window.shareData.tTitle = "我在经典游戏【木乃伊】中玩了" + (level+1)+ "关" + //window.shareData.Rankstr + ",据说全世界只有不到10个人通过，一起来挑战吧！";
			//if (confirm("你真牛逼,玩了" +  (level+1) + "关" + window.shareData.Rankstr + //",要不要让小伙伴们看看你有多厉害呢？")) {
				//share();
			//}  
				
			if(++level >= 50)
                level = 49;
            if(level > maxlevel)
                maxlevel = level;
			dp_submitScore(level);
            _procLevel(true);
            world_dir = -1;
            _game_start(true, false);
            return;
        }
        if(moving_step == 5 || moving_step == 4 && mummy_step == 1)
        {
            moving_step = 0;
            mummy_step++;
            var flag1= false;
            switch(mummy_step)
            {
            case 1: 
            case 2:  
                if(game_over || !_mummy_action())
                {
                    flag1 = true;
                } else
                {
                    moving_obj = mummy;
                    redraw = 4;
                    return;
                }
                break;

            default:
                flag1 = true;
                break;
            }
            if(mummy_step < 5 && flag1 && game_over)
            {
                mummy_step = 3;
                return;
            }
            if(flag1)
            {
                movingTimer = -1;
                
                moving_step = 0;
                mummy_step = 0;
                if(!game_over)
                {
                    status = 0;
                } else
                {
                    status = 3;
                    if(retryTimer<0) retryTimer=1;
                }
                return;
            }
        }
    }
    
    function _mummy_action()
    {
        var flag = false;
        var byte6;
        if(world_dir != 2 && (byte6 =  (player.pos.x - mummy.pos.x)) != 0)
        {
            var byte3 = 0;
            var byte0;
            if(byte6 > 0)
            {
                mummy.idx = 1;
                byte0 = 1;
            } else
            {
                mummy.idx = 3;
                byte0 = -1;
            }
            flag = _game_move(byte0, byte3, false);
        }
        if(!flag && (byte6 =  (player.pos.y - mummy.pos.y)) != 0)
        {
            var byte1 = 0;
            var byte4;
            if(byte6 > 0)
            {
                mummy.idx = 2;
                byte4 = 1;
            } else
            {
                mummy.idx = 0;
                byte4 = -1;
            }
            flag = _game_move(byte1, byte4, false);
        }
        if(!flag && world_dir == 2 && (byte6 =  (player.pos.x - mummy.pos.x)) != 0)
        {
            var byte5 = 0;
            var byte2;
            if(byte6 > 0)
            {
                mummy.idx = 1;
                byte2 = 1;
            } else
            {
                mummy.idx = 3;
                byte2 = -1;
            }
            flag = _game_move(byte2, byte5, false);
        }
        return flag;
    }
    
    function _game_move(byte0,byte1,flag)  {

        var word2 = 0;
        var byte2 = 0;
        var obj;
        var obj1;
        if(flag) {
            obj = player;
            obj1 = mummy;
            if(obj.pos.x + byte0 == door.pos.x && obj.pos.y + byte1 == door.pos.y)
            {
                stage_clear = true;
                return true;
            }
        } else
        {
            obj = mummy;
            obj1 = player;
        }
        var word0 =  (obj.pos.x + byte0);
        if(word0 < 0 || word0 >= 8)
            return false;
        word0 =  (obj.pos.y + byte1);
        if(word0 < 0 || word0 >= 8)
            return false;
        word0 =  (obj.pos.y * 8 + obj.pos.x);
        if(byte0 != 0)
        {
            byte2 = 2;
            word2 =  ((byte0 + 1) / 2);
        } else
        {
            byte2 = 1;
            word2 =  (((byte1 + 1) / 2) * 8);
        }
        if((block[word0 + word2] & byte2) == byte2)
            return false;
        word0 += byte1 * 8 + byte0;
        var word1 =  (obj1.pos.y * 8 + obj1.pos.x);
        if(word0 == word1)
        {
            if(flag)
                return false;
            game_over = true;
        }
        return true;
    }
    
    function _game_undoPut() {
        if(undo_idx < 2)  {
            undo_idx++;
        } else  {
            for(var byte0 = 0; byte0 < undo_idx; byte0++) {
                undo[byte0][0] = undo[byte0 + 1][0];
                undo[byte0][1] = undo[byte0 + 1][1];
            } 
        }
        undo[undo_idx][0] =  (player.pos.x << 4 | player.pos.y);
        undo[undo_idx][1] =  (mummy.pos.x << 4 | mummy.pos.y);
    }
    
    function _game_buildWorld() {
       
            var abyte0; 
            if(level == 0){
            	abyte0 = [50,48,50,53,50,55,88,88];
              block = [48,48,50,48,48,48,50,48,48,49,48,50,48,49,48,50,48,50,49,48,49,50,50,48,48,48,48,48,49,50,49,51,48,48,49,48,48,50,48,48,48,50,48,51,51,48,50,48,48,48,51,48,49,49,49,48,48,48,48,48,48,48,48,48];
           
            }else if(level == 1){
               abyte0 = [48,48,53,49,50,50,88,88];
              block = [48,48,50,48,48,48,50,48,48,49,50,50,50,48,50,48,48,48,48,49,48,50,48,49,48,48,48,49,51,49,48,48,48,49,50,49,50,51,49,48,49,49,48,51,50,48,49,48,48,50,48,48,49,49,48,48,49,48,48,50,48,48,48,48];
              
            }else if(level == 2){
              abyte0 = [48,52,50,52,48,51,88,88];
              block = [48,48,48,48,48,50,48,48,48,50,48,48,49,50,50,50,48,48,50,50,50,48,50,49,48,51,48,50,50,49,48,50,48,50,49,50,51,50,48,48,48,48,48,50,50,49,51,48,48,48,50,50,48,48,49,48,48,50,49,48,48,50,48,48];
            }else if(level == 3){
              abyte0 = [50,48,55,51,51,54,88,88];
              block = [48,48,48,48,48,50,48,48,48,51,48,48,51,48,48,48,48,48,48,48,48,48,48,50,49,48,48,48,48,48,48,49,48,48,49,48,48,48,48,48,49,48,50,48,48,48,50,48,48,48,48,50,50,49,51,48,48,49,49,48,50,49,48,48];
            }else if(level == 4){
              abyte0 = [51,49,52,52,49,51,88,88];
              block = [48,50,48,48,48,48,50,48,48,48,50,48,48,48,48,48,48,50,49,48,50,49,50,48,48,50,49,48,48,49,48,48,49,48,48,50,50,50,48,49,48,49,48,50,48,49,48,48,48,51,48,50,48,49,50,48,48,50,48,48,49,49,48,50];
            }else if(level == 5){
              abyte0 = [50,55,53,53,50,55,88,88];
              block = [48,50,48,48,48,48,50,48,48,51,49,48,48,48,49,48,48,48,48,48,51,48,48,51,49,49,50,48,48,48,51,48,48,50,48,48,48,50,49,50,48,50,48,50,48,51,48,48,48,48,48,51,48,48,48,48,48,48,49,48,48,48,48,49];
            }else if(level == 6){
              abyte0 = [50,51,49,52,49,54,88,88];
              block = [48,48,48,48,48,48,48,48,48,50,48,48,49,50,51,50,49,48,48,48,48,50,50,49,48,48,48,48,48,48,50,48,48,48,50,48,48,48,50,48,48,49,49,50,48,48,48,48,48,50,48,48,50,48,48,50,48,50,48,48,48,49,50,50];
            }else if(level == 7){
              abyte0 = [50,49,48,53,52,55,88,88];
              block = [48,48,48,48,48,48,48,50,48,48,49,48,48,48,48,48,48,48,48,49,50,48,48,48,48,48,49,51,48,49,48,48,48,48,48,49,51,48,48,48,48,49,50,51,49,48,50,48,48,48,48,48,50,48,50,48,48,48,48,49,48,50,49,50];
            }else if(level == 8){
              abyte0 = [51,49,52,49,49,50,88,88];
              block = [48,48,48,48,48,50,48,48,48,48,48,48,51,48,50,48,48,48,50,48,49,50,50,48,49,48,51,51,50,50,51,48,49,48,48,48,48,48,50,48,49,50,48,49,49,49,49,48,48,48,48,50,50,48,49,48,48,48,49,48,48,50,48,49];
            }else if(level == 9){
              abyte0 = [51,55,54,52,48,52,88,88];
              block = [48,48,48,50,48,48,48,48,48,49,50,50,49,51,51,48,48,49,48,51,49,48,50,48,48,48,50,50,48,49,48,49,49,48,48,50,49,50,48,48,48,48,50,50,48,49,49,50,49,48,48,48,48,49,48,50,48,48,48,48,50,48,48,48];
            }else if(level == 10){
              abyte0 = [51,54,50,50,51,53,88,88];
              block = [48,48,48,48,48,48,48,50,48,49,50,50,48,50,50,48,49,51,48,48,48,49,48,50,48,48,51,49,49,51,48,48,49,48,48,48,48,48,49,48,48,48,49,50,48,49,49,50,48,48,49,48,48,51,48,48,48,49,48,50,48,48,48,48];
            }else if(level == 11){
              abyte0 = [50,51,48,53,55,53,88,88];
              block = [48,48,48,48,50,48,48,50,48,50,48,48,51,50,48,48,48,50,49,48,48,49,48,50,48,49,50,50,51,50,51,48,48,48,49,48,48,51,50,48,48,50,49,49,50,50,48,48,48,49,48,48,48,48,48,51,49,48,49,48,48,48,49,48];
            }else if(level == 12){
              abyte0 = [51,48,51,55,48,49,88,88];
              block = [48,48,50,48,50,48,48,48,48,49,50,48,48,49,50,48,48,49,48,51,49,48,49,48,48,48,48,49,49,49,49,49,48,50,49,48,49,48,48,48,49,49,51,50,49,48,50,49,48,50,48,49,48,48,51,48,49,48,51,49,48,50,49,48];
            }else if(level == 13){
              abyte0 = [50,55,50,48,53,50,88,88];
              block = [48,50,48,48,50,48,48,48,48,48,49,48,49,48,48,51,48,50,51,48,48,49,48,48,48,50,48,51,48,48,48,51,48,49,50,48,48,49,48,48,48,48,48,48,48,50,48,50,48,48,51,48,48,49,48,48,48,48,49,48,48,48,48,49];
            }else if(level == 14){
              abyte0 = [51,52,52,52,53,50,88,88];
              block = [48,48,48,48,50,48,48,48,49,48,48,48,48,48,48,48,48,50,49,50,48,48,51,48,48,48,48,48,50,48,48,48,49,50,48,51,48,48,49,49,48,48,50,49,50,49,48,49,49,49,49,48,50,50,48,48,49,48,51,48,48,48,49,48];
            }else if(level == 15){
              abyte0 = [50,53,51,48,51,55,88,88];
              block = [48,48,50,48,48,48,48,50,48,48,49,50,48,48,49,50,48,51,48,48,48,48,48,48,48,51,48,50,48,50,48,50,48,48,49,48,50,49,49,51,49,48,51,51,50,48,48,48,48,48,48,48,48,50,51,48,48,48,49,48,48,48,48,48];
            }else if(level == 16){
              abyte0 = [50,53,48,48,53,55,88,88];
              block = [48,50,48,48,48,50,50,48,48,49,48,48,49,48,49,48,48,48,49,50,49,48,48,49,48,48,48,48,48,49,48,48,49,48,51,51,50,50,49,48,48,51,48,48,50,50,49,50,48,48,48,50,48,50,48,50,48,49,48,48,48,48,49,50];
            }else if(level == 17){
              abyte0 = [48,48,52,48,48,49,88,88];
              block = [48,48,48,48,48,48,48,50,48,51,50,49,48,48,48,48,49,50,51,50,50,48,48,48,48,50,48,51,49,49,48,48,48,48,48,48,51,51,49,48,48,50,49,49,48,49,51,48,49,48,50,48,48,48,49,50,48,50,49,49,48,49,48,48];
            }else if(level == 18){
              abyte0 = [48,49,55,55,53,49,88,88];
              block = [48,48,48,48,48,48,48,48,48,48,48,48,48,48,48,48,48,49,49,50,48,50,49,48,48,48,51,49,51,49,48,48,48,50,48,49,48,48,49,48,48,48,48,48,50,48,48,48,48,48,48,49,48,49,49,51,48,49,49,48,48,48,50,48];
            }else if(level == 19){
              abyte0 = [49,51,50,49,50,53,88,88];
              block = [48,48,50,48,48,48,48,48,48,48,48,50,49,48,48,48,48,49,48,48,51,48,49,51,49,50,48,48,48,50,51,48,48,49,48,48,48,49,48,48,48,48,51,49,48,49,48,49,48,50,48,48,48,50,49,48,49,48,49,48,49,48,49,49];
            }else if(level == 20){
              abyte0 = [50,53,51,49,51,53,88,88];
              block = [48,48,50,48,48,48,48,50,48,48,49,50,48,48,48,50,48,48,49,50,48,48,49,50,48,51,48,50,48,50,48,50,48,48,49,48,50,49,49,51,49,48,51,51,50,48,48,48,48,48,48,48,48,50,51,48,48,48,49,48,48,48,48,48];
            }else if(level == 21){
              abyte0 = [51,50,48,54,51,50,88,88];
              block = [48,50,48,50,48,50,50,48,48,49,48,50,48,48,48,51,48,49,49,48,48,48,48,48,49,49,48,50,50,49,49,48,48,48,50,49,48,48,51,48,49,50,49,48,51,48,50,48,48,49,50,49,48,48,51,48,48,50,48,49,49,50,48,48];
            }else if(level == 22){
              abyte0 = [48,55,51,53,55,48,88,88];
              block = [48,48,48,48,48,50,48,48,48,50,49,48,50,50,49,48,48,49,50,48,50,48,48,48,48,48,48,48,50,48,50,48,48,48,51,49,48,48,48,49,48,48,48,51,48,48,48,48,49,48,50,51,48,49,49,49,48,48,50,48,49,49,49,48];
            }else if(level == 23){
              abyte0 = [51,49,48,53,48,48,88,88];
              block = [48,48,48,48,48,48,48,50,49,50,49,51,48,50,49,48,48,48,48,48,50,48,50,49,49,49,51,50,48,50,48,50,48,50,48,48,48,49,48,50,48,48,50,48,48,48,48,48,48,49,48,48,49,49,49,48,48,48,48,49,48,48,50,48];
            }else if(level == 24){
              abyte0 = [51,50,48,51,49,50,88,88];
              block = [48,48,48,50,48,48,48,48,48,50,49,50,48,50,50,48,49,48,50,48,49,49,48,49,49,49,48,50,48,48,49,48,48,49,48,48,48,51,50,48,48,48,48,49,49,50,48,48,48,49,48,48,50,48,49,48,48,48,50,49,48,50,50,49];
            }else if(level == 25){
              abyte0 = [50,49,51,49,53,54,88,88];
              block = [48,48,48,50,50,48,48,48,48,50,49,50,48,49,48,50,49,48,48,49,50,49,48,48,48,49,49,49,50,49,49,50,48,48,50,48,48,50,49,50,48,48,51,49,48,50,50,49,48,49,49,48,49,51,50,48,48,51,49,48,48,48,49,48];
            }else if(level == 26){
              abyte0 = [48,50,48,51,53,50,88,88];
              block = [48,48,48,50,48,48,50,48,48,50,48,48,48,48,48,48,48,48,48,50,50,48,51,50,48,48,48,49,49,48,48,48,49,48,49,50,50,48,48,48,48,48,48,48,50,49,48,48,48,48,48,48,50,49,49,48,49,49,48,48,48,49,48,48];
            }else if(level == 27){
              abyte0 = [49,55,48,55,55,54,88,88];
              block = [48,48,48,48,48,48,48,48,48,50,48,50,48,50,48,48,49,48,48,50,48,49,49,48,48,48,48,50,49,48,50,50,48,49,48,48,49,48,48,48,49,48,48,50,48,48,48,50,48,48,50,51,49,48,48,48,48,48,48,50,48,48,49,48];
            }else if(level == 28){
              abyte0 = [51,55,53,51,50,54,88,88];
              block = [48,48,48,48,48,48,48,48,49,50,50,50,48,48,48,48,48,48,50,48,49,50,48,50,48,48,48,50,48,48,51,48,48,49,48,48,48,49,51,48,48,48,50,49,50,51,48,49,48,50,50,51,49,48,50,48,49,48,50,49,48,50,48,50];
            }else if(level == 29){
              abyte0 = [50,54,50,48,53,54,88,88];
              block = [48,48,48,48,48,48,50,48,48,50,50,49,48,50,50,50,48,48,48,48,50,48,48,50,48,48,50,48,50,48,48,50,48,49,49,50,50,50,48,48,49,48,48,48,48,49,48,49,48,48,51,49,48,48,48,48,48,50,48,50,48,51,48,48];
            }else if(level == 30){
              abyte0 = [49,53,49,48,52,55,88,88];
              block = [48,48,48,48,48,50,48,48,48,50,50,50,48,48,50,49,48,50,50,49,48,48,49,49,48,50,48,49,48,48,49,51,48,48,48,50,48,48,49,48,48,48,49,48,50,48,48,51,48,48,50,48,48,50,48,48,48,49,50,50,51,48,49,48];
            }else if(level == 31){
              abyte0 = [50,49,51,49,51,53,88,88];
              block = [48,48,48,48,50,48,48,48,48,49,48,51,48,48,49,48,48,48,48,48,49,49,50,49,49,50,49,49,48,48,49,48,48,50,48,49,48,49,48,48,48,50,49,49,51,48,50,50,48,48,50,48,51,49,48,50,48,49,49,48,48,49,51,48];
            }else if(level == 32){
              abyte0 = [50,49,49,50,48,52,88,88];
              block = [48,48,50,48,48,50,48,48,49,50,48,48,48,49,48,50,48,50,48,50,51,48,48,50,48,49,48,48,48,48,49,48,49,50,50,49,49,48,49,48,48,49,48,48,51,48,50,50,48,50,49,48,50,50,48,51,48,48,49,50,48,48,48,48];
            }else if(level == 33){
            	abyte0 = [51,54,51,55,48,54,88,88];
              block = [48,48,48,48,48,48,48,50,48,48,50,48,48,51,49,48,48,48,48,48,48,50,48,48,48,48,48,48,48,48,48,48,48,48,50,50,48,49,48,48,48,49,48,48,48,48,49,50,48,48,50,50,49,48,49,48,49,48,49,48,48,48,49,50];
            }else if(level == 34){
              abyte0 = [49,48,50,50,54,48,88,88];
              block = [48,48,48,48,50,48,48,48,48,48,48,49,49,48,48,50,48,48,50,50,48,50,48,49,49,48,50,48,48,48,50,50,48,51,48,50,48,48,51,48,48,50,48,49,48,48,48,48,48,48,51,50,48,49,49,48,48,48,48,49,48,48,48,50];
            }else if(level == 35){
              abyte0 = [48,48,50,53,53,49,88,88];
              block = [48,50,48,48,48,50,48,48,48,48,48,49,48,48,48,48,48,48,50,48,50,48,51,48,48,48,49,49,48,48,48,49,49,50,48,51,48,49,50,49,48,48,48,48,51,48,49,48,49,48,48,48,48,50,49,50,48,49,50,48,51,49,48,48];
            }else if(level == 36){
              abyte0 = [50,54,50,48,53,54,88,88];
              block = [48,48,48,48,48,48,50,48,48,50,50,49,48,50,50,50,48,48,48,48,50,48,48,50,48,48,50,48,50,48,48,50,48,49,49,50,50,50,48,48,49,48,48,48,48,49,48,49,48,48,51,49,48,48,48,48,48,50,48,50,48,51,48,48];
            }else if(level == 37){
              abyte0 = [48,49,55,49,48,51,88,88];
              block = [48,48,48,50,48,48,48,48,48,48,48,48,50,48,48,48,49,50,48,50,48,49,48,49,48,48,49,49,48,51,48,48,48,48,50,51,49,50,48,48,48,48,51,50,49,50,49,49,48,48,48,48,48,49,48,48,48,48,49,48,50,49,51,48];
            }else if(level == 38){
              abyte0 = [49,52,51,55,54,55,88,88];
              block = [48,48,50,48,50,50,48,48,48,49,49,48,48,48,48,48,49,48,50,48,49,50,48,51,48,51,48,50,49,50,50,48,48,50,48,50,48,50,50,48,48,48,50,50,49,50,48,48,48,50,50,49,51,48,49,48,48,49,50,50,48,49,50,49];
            }else if(level == 39){
              abyte0 = [49,49,54,52,50,48,88,88];
              block = [48,50,48,48,50,48,48,48,48,51,48,48,48,48,51,49,48,48,49,48,48,48,48,48,48,49,50,49,49,48,48,49,48,49,48,49,49,49,49,50,48,48,48,51,48,48,49,50,49,48,51,48,48,49,48,49,49,48,49,48,51,48,48,50];
            }else if(level == 40){
              abyte0 = [50,53,51,53,48,53,88,88];
              block = [48,48,48,50,48,50,48,50,48,49,50,48,50,50,49,48,48,48,51,48,50,48,48,49,48,49,50,49,48,48,48,51,48,49,50,48,48,50,50,48,49,50,48,50,50,49,48,50,48,48,49,48,48,49,51,50,48,48,50,50,48,48,48,48];
            }else if(level == 41){
              abyte0 = [48,49,55,54,49,51,88,88];
              block = [48,50,50,48,48,48,48,48,48,48,48,48,48,50,49,49,48,48,49,48,51,50,48,48,48,49,51,50,48,51,49,48,48,48,48,48,49,48,49,51,49,49,48,50,48,50,50,48,48,49,49,48,51,48,49,49,48,50,51,48,48,48,48,50];
            }else if(level == 42){
              abyte0 = [49,51,51,51,54,52,88,88];
              block = [48,48,48,48,48,50,48,48,48,51,48,50,51,48,50,48,48,51,48,48,49,48,50,49,48,48,49,48,48,50,49,50,48,48,49,48,48,48,48,49,49,49,48,48,49,49,49,48,48,48,50,48,50,48,48,50,48,48,48,49,48,49,50,49];
            }else if(level == 43){
              abyte0 = [49,53,51,48,48,53,88,88];
              block = [48,48,48,48,48,48,48,48,49,50,50,49,48,48,49,48,48,49,49,48,48,48,48,51,48,48,48,48,48,50,50,48,48,48,48,48,50,49,51,48,48,48,48,48,50,48,50,48,48,49,49,48,50,50,48,48,49,48,48,49,48,50,49,48];
            }else if(level == 44){
              abyte0 = [48,52,50,51,52,50,88,88];
              block = [48,48,48,48,48,48,48,50,48,49,50,50,48,48,50,48,49,50,48,48,50,49,48,50,48,48,50,48,48,50,48,48,48,49,48,48,50,48,48,50,49,48,48,50,51,48,48,48,48,48,48,51,50,48,48,49,48,48,48,48,48,48,48,49];
            }else if(level == 45){
              abyte0 = [49,54,55,48,55,53,88,88];
              block = [48,48,48,48,48,48,50,48,48,50,50,49,50,48,49,48,48,48,49,50,48,51,48,48,49,50,48,49,50,48,51,48,48,48,48,48,48,48,50,51,49,50,50,48,51,48,51,48,48,50,51,48,48,49,48,48,48,48,50,48,50,50,49,48];
            }else if(level == 46){
              abyte0 = [51,51,52,53,53,50,88,88];
              block = [48,48,50,48,48,50,48,48,48,48,50,49,50,48,48,50,48,48,49,48,48,50,50,48,48,48,48,48,49,50,51,48,48,48,51,48,48,48,49,49,48,49,50,48,48,49,50,48,48,49,48,50,50,51,49,48,48,48,50,48,48,48,48,49];
            }else if(level == 47){
              abyte0 = [48,55,48,51,50,50,88,88];
              block = [48,48,48,48,48,48,48,48,48,50,49,48,48,48,50,49,48,48,50,49,49,48,48,48,48,49,48,48,48,48,48,50,48,49,48,48,51,48,49,48,48,48,48,50,50,50,50,48,48,50,48,48,48,48,50,50,49,48,50,48,48,48,48,48];
            }else if(level == 48){
              abyte0 = [52,55,49,54,52,55,88,88];
              block = [48,48,48,48,48,50,48,48,48,50,48,49,48,48,48,50,48,48,48,48,48,48,51,48,48,50,49,49,49,48,48,50,48,49,50,48,48,48,49,49,49,50,49,49,48,50,48,50,48,48,48,48,48,48,50,48,48,49,48,48,48,49,48,48];
            }else if(level == 49){ 
              abyte0 = [49,48,53,50,52,51,88,88];
              block = [48,48,50,48,48,48,48,48,48,48,48,48,49,48,48,51,49,48,50,49,50,50,50,50,48,49,51,51,50,48,51,48,48,48,48,48,50,48,50,48,49,48,48,48,51,50,48,50,48,50,48,50,48,48,48,48,48,48,49,48,49,48,48,48];
            }
             
            for(var word0 = 0; word0 < 64; word0++)  
              block[word0] -= 48; 
            for(var word1 = 0; word1 < abyte0.length; word1++) 
              abyte0[word1] -= 48; 
            if(world_dir < 0)
                world_dir = $.commandFuns.getRandom(3);
            switch(world_dir)  {
            default:
                break; 
            case 0:  
            case 1:  
                for(var word2 = 0; word2 < 4; word2++) {
                    var word10 =  (word2 * 8);
                    var word14 =  (64 - (word10 + 8));
                    for(var word6 = 0; word6 < 8; word6++)  {
                        block[word10 + word6] ^= block[word14 + word6];
                        block[word14 + word6] ^= block[word10 + word6];
                        block[word10 + word6] ^= block[word14 + word6];
                    } 
                } 
                for(var word3 = 6; word3 >= 0; word3--)  {
                    var word11 =  (word3 * 8);
                    var word15 =  (word11 + 8);
                    for(var word7 = 0; word7 < 8; word7++)
                        if((block[word11 + word7] & 0x1) == 1) {
                            block[word11 + word7] ^= 0x1;
                            block[word15 + word7] |= 0x1;
                        } 
                } 
                if((abyte0[0] & 0x1) == 0)
                    abyte0[0] =  (2 - abyte0[0]);
                else
                    abyte0[1] =  (8 - abyte0[1] - 1);
                abyte0[3] =  (8 - abyte0[3] - 1);
                abyte0[5] = (8 - abyte0[5] - 1);
                break; 
            case 2: 
                var abyte1 = [0,0,0,0,0,0,0,0,
											        0,0,0,0,0,0,0,0,
											        0,0,0,0,0,0,0,0,
											        0,0,0,0,0,0,0,0,
											        0,0,0,0,0,0,0,0,
											        0,0,0,0,0,0,0,0,
											        0,0,0,0,0,0,0,0,
											        0,0,0,0,0,0,0,0];
                abyte1 = $.clone(block); 
                
                for(var word4 = 0; word4 < 8; word4++)  {
                    var word12 =  (word4 * 8);
                    var word16 =  (8 - word4 - 1);
                    for(var word8 = 0; word8 < 8; word8++)
                        block[word8 * 8 + word16] = abyte1[word12 + word8]; 
                }

                for(var word5 = 0; word5 < 8; word5++)
                {
                    var word13 =  (word5 * 8);
                    for(var word9 = 7; word9 >= 0; word9--) {
                        if((block[word13 + word9] & 0x1) == 1)
                        {
                            block[word13 + word9] ^= 0x1;
                            block[word13 + word9 + 1] |= 0x2;
                        }
                        if((block[word13 + word9] & 0x2) == 2)
                        {
                            block[word13 + word9] ^= 0x2;
                            block[word13 + word9] |= 0x1;
                        }
                    }

                }

                abyte1 = null;
                if((abyte0[0] & 0x1) == 0)
                {
                    abyte0[0]++;
                } else
                {
                    abyte0[0] =  ((abyte0[0] + 1) % 4);
                    abyte0[1] =  (8 - abyte0[1] - 1);
                }
                abyte0[2] ^= abyte0[3];
                abyte0[3] ^= abyte0[2];
                abyte0[2] ^= abyte0[3];
                abyte0[2] =  (8 - abyte0[2] - 1);
                abyte0[4] ^= abyte0[5];
                abyte0[5] ^= abyte0[4];
                abyte0[4] ^= abyte0[5];
                abyte0[4] =  (8 - abyte0[4] - 1);
                break;
            }
            door.idx = abyte0[0];
            switch(door.idx)
            {
            case 0: 
                door.pos.x = abyte0[1];
                door.pos.y = -1;
                break;

            case 1: 
                door.pos.x = 8;
                door.pos.y = abyte0[1];
                break;

            case 2:  
                door.pos.x = abyte0[1];
                door.pos.y = 8;
                break;

            case 3:  
                door.pos.x = -1;
                door.pos.y = abyte0[1];
                break;
            }
            player.pos.x = abyte0[2];
            player.pos.y = abyte0[3];
            mummy.pos.x = abyte0[4];
            mummy.pos.y = abyte0[5]; 
        return true;
    } 
    
	  function _procLevel(flag) { 
        //从数据库中读取关口号
        if(flag) {   
          $.localStorage.setItem('maxlevel',maxlevel);  
        }else{
        	maxlevel = $.localStorage.getItem('maxlevel'); 
        } 
    }
	
    //-------------------------------------------------
  var mousePos = { x: 0, y: 0 };
  var isShowArrow = false;
    
    $.events.touchStart(function(e) {
    	  var PosX = e.touches[0].clientX;
		    var PosY = e.touches[0].clientY;
    	  mousePos = {x:PosX,y:PosY}; 
    	  Press(mousePos);  
    }).touchMove(function(e) {
    	  var PosX = e.touches[0].clientX;
		    var PosY = e.touches[0].clientY;
    	  mousePos = {x:PosX,y:PosY};  
    	  Move(mousePos); 
    }).touchEnd(function(e) { 
    	  Release(mousePos);
    }).mouseMove(function(e) {
        var PosX = e.clientX - cnm.left;
		    var PosY = e.clientY - cnm.top;
        mousePos = {x:PosX,y:PosY};  
        Move(mousePos);
    }).mouseDown(function(e) {
        var PosX = e.clientX - cnm.left;
		    var PosY = e.clientY - cnm.top;
        mousePos = {x:PosX,y:PosY};  
        Press(mousePos); 
     }).mouseUp(function(e) {
        var PosX = e.clientX - cnm.left;
		    var PosY = e.clientY - cnm.top;
        mousePos = {x:PosX,y:PosY};   
        Release(mousePos);
     });       	  

    function Press(mousePos){
     	 if(status == 9){
     	 	 
			    if(checkBtnArea(BTN_CHS, mousePos.x, mousePos.y)){   
        		BTN_CHS.isPressed = true; 
        	}else if(checkBtnArea(BTN_ENG, mousePos.x, mousePos.y)){ 
        		BTN_ENG.isPressed = true; 
        	}
			   }else if(status == 1) { //游戏主菜单
           
        	if(checkBtnArea(BTN_START, mousePos.x, mousePos.y)){ 
        		BTN_START.isPressed = true; 
        	}else if(checkBtnArea(BTN_BACKT, mousePos.x, mousePos.y)){
        		BTN_BACKT.isPressed = true; 
        	}
        	paint();
        
        }else if(status == 4){ //画面选关 
          if(checkSelectBtn(mousePos.x, mousePos.y) >=0){ 
          	
          	if(checkSelectBtn(mousePos.x, mousePos.y) <= maxlevel) {
             level = checkSelectBtn(mousePos.x, mousePos.y); 
             if(level == 0)
               _game_start(true, true);
             else
               _game_start(true, false);
            }else{
              alert("关口"+(checkSelectBtn(mousePos.x, mousePos.y)+1)+"尚未打开！");
            }
          }else if(checkBtnArea(BTN_HOME, mousePos.x, mousePos.y)){  
        		BTN_HOME.isPressed = true; 
        	}
        	paint();	
        
        }else if(status == 0 || status == 3){
             
          if(checkBtnArea(BTN_HOME,mousePos.x,mousePos.y)){ //回主菜单 
        	   BTN_HOME.isPressed = true; 
        	   paint();
        	}else if(checkBtnArea(BTN_PAUSE,mousePos.x,mousePos.y)){ //后退
        	   BTN_PAUSE.isPressed = true; 
        	   paint();
          }else{  
		        var pos = _getPos(mousePos);  
		        if(_isSelectPlayer(pos)){
		           isShowArrow = !isShowArrow;
		           paint();
		        }
		        else if(isShowArrow &&_getDirection(pos)!=-1 ){
		        	 
		        	if(_getDirection(pos) == 0){//下
		        	  _movePlayer(0);
		          }else if(_getDirection(pos) == 1){//右
		        	  _movePlayer(1);
		        	}else if(_getDirection(pos) == 2){//左
		        	  _movePlayer(2);
		        	}else if(_getDirection(pos) == 3){//上
		        	  _movePlayer(3);
		          }
		          isShowArrow = false; 
		          paint();
		        }
	        }
	      }else if(status == 7 || status == 2){ 
	      	if(status == 2){
	      		if(checkRetryOrQuit(mousePos.x , mousePos.y)==0){ //是
	      		  status = 3;
							_game_start(false, false);
							paint();
	      		}else if(checkRetryOrQuit(mousePos.x , mousePos.y)==1){//否
	      		  //$.updateScore( { score: level });
							$.gameFlow.over();
							//$.audio.pause('bgsound');
							status = 1;
							paint();
	      		}
	      	}else if(status == 7){
	      		if(checkRetryOrQuit(mousePos.x , mousePos.y)==0){ //是
	      		  //$.updateScore( { score: level });
							$.gameFlow.over();
							paint();
							//$.audio.pause('bgsound');
							status = 1;
							paint();
	      		}else if(checkRetryOrQuit(mousePos.x , mousePos.y)==1){//否
	      	    redraw = 7;
							status = 0;
							paint();
	      	  }
	      	}
	      }
    }
    
    function Move(mousePos){
    	    if(status == 9){
				    if(!checkBtnArea(BTN_CHS, mousePos.x, mousePos.y)){ 
	        		BTN_CHS.isPressed = false; 
	        	} 
	        	if(!checkBtnArea(BTN_ENG, mousePos.x, mousePos.y)){
	        		BTN_ENG.isPressed = false; 
	        	}  
			  }else if(status == 1) { //游戏主菜单
        	if(!checkBtnArea(BTN_START, mousePos.x, mousePos.y)){ 
        		BTN_START.isPressed = false; 
        	}
        	if(!checkBtnArea(BTN_BACKT, mousePos.x, mousePos.y)){
        		BTN_BACKT.isPressed = false; 
        	}
        	paint();
        }
        if(status == 4){ //画面选关 
          if(!checkBtnArea(BTN_HOME, mousePos.x, mousePos.y)){ 
        		BTN_HOME.isPressed = false; 
        	}
        	paint();
        }
        if(status == 0 || status == 3){ //游戏中
          if(!checkBtnArea(BTN_HOME,mousePos.x,mousePos.y)){ //回主菜单 
        	   BTN_HOME.isPressed = false; 
        	}
        	if(!checkBtnArea(BTN_PAUSE,mousePos.x,mousePos.y)){ //后退
        	  BTN_PAUSE.isPressed = false;  
          } 
          paint();
        }
    }
    
    
    function Release(mousePos){
      if(status == 9){
			     if(BTN_CHS.isPressed && checkBtnArea(BTN_CHS,mousePos.x,mousePos.y)){ 
        		 status = 1;
	        	 language = "CHS";
	        	 $.localStorage.setItem('language3',language); 
	        	 BTN_CHS.isPressed = false;  
	        
	        }else if(BTN_ENG.isPressed && checkBtnArea(BTN_ENG,mousePos.x,mousePos.y)){ 
	        	 status = 1;
	        	 language = "ENG";
	        	 $.localStorage.setItem('language3',language); 
	        	 BTN_ENG.isPressed = false; 
	        }  
			  }else if(status == 1) { //游戏主菜单
        	if(BTN_START.isPressed && checkBtnArea(BTN_START,mousePos.x,mousePos.y)){ 
	        	  status = 4;
	        	  BTN_START.isPressed = false;  
	        }else if(BTN_BACKT.isPressed && checkBtnArea(BTN_BACKT,mousePos.x,mousePos.y)){ 
	        	  dp_Ranking(); //打开排行榜
				  BTN_BACKT.isPressed = false;  
	        }
        	paint();
        
        }else if(status == 4){ //画面选关 
          status = 1;
          BTN_HOME.isPressed = false; 
          paint();
        }else if(status == 0 || status == 3){
               
          if(checkBtnArea(BTN_HOME,mousePos.x,mousePos.y)){ //回主菜单 
        	    status = 7;
        	    BTN_HOME.isPressed = false; 
							paint();
        	}else if(checkBtnArea(BTN_PAUSE,mousePos.x,mousePos.y)){ //后退
        	    BTN_PAUSE.isPressed = false; 
        	    _game_start(true, false);	 
        	    paint();    
          }else{  
         	 
			        var pos = _getPos(mousePos);  
			        
			        if(isShowArrow && _getDirection(pos)!=-1 ){ 
			        	if(_getDirection(pos) == 0){//下
			        	  _movePlayer(0);
			          }else if(_getDirection(pos) == 1){//右
			        	  _movePlayer(1);
			        	}else if(_getDirection(pos) == 2){//左
			        	  _movePlayer(2);
			        	}else if(_getDirection(pos) == 3){//上
			        	  _movePlayer(3);
			          }
			          isShowArrow = false; 
			          paint();
			        } 
          }
        }
    }


      // 按钮切片绘制
		function drawSlice(imageName, xId, yId, cellW, cellH, x, y, w, h,
					anchor) {
				$.canvas.drawImage(imageName, xId * cellW, yId * cellH, cellW,
						cellH, x, y, w, h, anchor);
		}

		// 按钮区域判断
		function checkBtnArea(btn, x, y) { 
			if ( x > btn.x && y > btn.y && x < btn.x + btn.w && y < btn.y + btn.h) { 
						return true;
			} 
			return false;
		}
		
		//关口选择
		function checkSelectBtn(x,y){
			var x1 = x-40; 
			var y1 = y-300;   
			
			var a = parseInt(x1/39);
			var b = parseInt(y1/40);

			if(a>=0 && a<=9 && b>=0 && b<=9)
			  var level = b*10+a;
			
			if(level>=0 && level < 50)  
			  return level;
		  return -1;
		}
			
			//判断是否选择重来或者退出
			function checkRetryOrQuit(x, y){
				var left = parseInt((vPort.dx - 120) / 2);
        var top = parseInt((vPort.dy - 83) / 2 - 40);
        var w = 120;
        var h = 83;
				if(x>=left && x<=left+w/2 && y>=top && y<=top+h)
				  return 0;
				else if(x>=left+w/2 && x<=left+w && y>=top && y<=top+h)  
				  return 1;
				return -1;
			}
			

      function _getPos(mousePos) { //获取当前选中点的坐标
      	var pos =  { x: 0, y: 0 };
      	
      	if((mousePos.x-TopW)>=0)
      	  pos.x = parseInt((mousePos.x-TopW)/48);
      	else 
      		pos.x = parseInt((mousePos.x-TopW)/48)-1;
      	
      	if((mousePos.y-TopH)>=0)
      	  pos.y = parseInt((mousePos.y-TopH)/48);   
      	else
      		pos.y = parseInt((mousePos.y-TopH)/48)-1;     
      	return pos;
      }
      
      function _isSelectPlayer(pos){//是否选择玩家
      	if(player.pos.x == pos.x && player.pos.y == pos.y) return true;
      	return false;
      }
      
      function _getDirection(pos){ //获取当前选中的方向 
      	if(player.pos.x == pos.x && player.pos.y +1 == pos.y ) return 0; //下
      	else if(player.pos.x == pos.x && player.pos.y -1 == pos.y ) return 3; //上
      	else if(player.pos.x+1 == pos.x && player.pos.y == pos.y ) return 1; //右
      	else if(player.pos.x-1 == pos.x && player.pos.y == pos.y ) return 2; //左
      	else return -1;
      }
      
      function _isMove(direction){
         var istip = false;
         var flag = false;
         var byte0 = 2;
         if(direction == 3){ 
           byte0 = 0;
           flag = _game_move(0,  -1, true);
           istip = true;
         }else if(direction == 0){  
           byte0 = 2;
           flag = _game_move( 0,  1, true);
           istip = true;
         }else if(direction == 2){   
           byte0 = 3;
           flag = _game_move( -1,  0, true);
           istip = true;
         }else if(direction == 1){   
           byte0 = 1;
           flag = _game_move( 1,  0, true); 
           istip = true;
         }
         return flag;  
      }
      
      function _movePlayer(direction){
                var istip = false;
                var flag = false;
                var byte0 = 2;
                if(direction == 3){ 
                    byte0 = 0;
                    flag = _game_move(0,  -1, true);
                    istip = true;
                }else if(direction == 0){  
                    byte0 = 2;
                    flag = _game_move( 0,  1, true);
                    istip = true;
                }else if(direction == 2){   
                    byte0 = 3;
                    flag = _game_move( -1,  0, true);
                    istip = true;
                }else if(direction == 1){   
                    byte0 = 1;
                    flag = _game_move( 1,  0, true); 
                    istip = true;
                }  
                
                if(flag) {
                	moving_step = 0;
                  moving_obj = player; //玩家开始移动. 
                  player.idx = byte0; 
	                redraw = 2;
			            mummy_step = 0;
			            moving_obj = player; 
	                if(movingTimer<0) movingTimer=1;    
	                
                }else{
                  if(player.idx != byte0) {
                            player.idx = byte0;
                            redraw = 2; 
                            paint();
                        } 
                        hold_it = true;
                        moving_step = 5; 
                }
      }

//-------------------------------------------------
    var once = false;
    
    $.run(function() {// 游戏主循环
    	window.scrollTo(0, -5);
    	  
    	if (window.innerHeight < window.innerWidth && 
    	    jsGame.canvas.screen.getTouch()) { //横
	       cnm.showClue(); 
	       once = true;
			} else {
			   if(once){
			     paint();
			     once = false;
			   }
					if(stagenumTimer>0){ //关口标题时间
					  if(stagenumTimer<40){
						stagenumTimer++;
						paint();
					  }else{
						redraw = 7;
			      status = 0; 
						stagenumTimer = -1;
						paint();
					  }   
					}
					if(retryTimer>0){ //是否结束游戏/或继续
					  if(retryTimer<10){
					    retryTimer++;
			          }else{
			            quit_idx = -1;
			            status = 2;
			            retryTimer = -1;
			            paint();
			          }
			        }	
					if(movingTimer>0){  //人物移动
					  _game_show(); 
					} 
					control();
			  }
    });
	});
};
//eval(function(p,a,c,k,e,d){e=function(c){return(c<a?"":e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)d[e(c)]=k[c]||e(c);k=[function(e){return d[e]}];e=function(){return'\\w+'};c=1;};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p;}('(1(){2 a=3.p(\'4\');a.e=\'d/c\';a.h=g;a.f=\'6://9.8.7/m/o.k\';2 b=3.n(\'4\')[0];b.5.j(a,b);a.i=1(){a.5.l(a)}})();',26,26,'|function|var|document|script|parentNode|http|com|9g|game|||javascript|text|type|src|true|async|onload|insertBefore|js|removeChild|mnygl|getElementsByTagName||createElement'.split('|'),0,{}))
	