POP.router = function() {

    window.scrollTo(0,1);

    POP.timer = new Date().getTime() * 0.002;
    POP.draw.clear();

    switch(POP.state) {
    
        case 'splash':
            POP.splash(); 
        break;

        case 'gameOver':
            POP.gameOver(); 
        break;

        case 'hiScores':
            POP.hiScores();
        break;

        default:
            POP.play();
        break;

    }

    POP.m.click = false;
    POP.stats.update();
    requestAnimFrame(POP.router);

};


POP.splash = function() {

    var opacity = Math.abs(Math.sin(POP.timer * 0.8)),
        col = 'rgba(255,255,255,'+opacity+')';

    POP.delay += 1;
	
	/*
    if (POP.ua.appleMobile === true && window.navigator.standalone === false) {
        POP.draw.rect(0,0,POP.W, 30, 'rgba(0,0,0,0.2)'); 
        POP.draw.text(40,20, 'Psst! Save to homepage for full screen fun!', 10, '#fff');
    } else if (POP.Ua.hasTouch === false) {
        POP.draw.text(20,POP.H - 20, 'This game is much more fun on touch devices', 11, 'rgba(255,255,255,0.5)');
    }*/

    POP.draw.text(45,135,'戳泡泡！',64, 'rgba(0,0,0,0.3)');
    POP.draw.text(40,130,'戳泡泡！',64);
    POP.draw.text(110,240, POP.Ua.action + '开始游戏', 16, col);
    POP.draw.text(128, 340, '最高分', 20, 'rgba(255,255,255,0.8)');
    POP.draw.text("center", 380, POP.hiScore.toString(), 24, 'rgba(255,255,255,0.8)');

    if (POP.m.click && POP.delay > 20) {
        POP.textLayer.style.display = 'none';
        POP.delay = 0;
        POP.touches = [];
        POP.state = 'play';

        POP.gameStart = new Date().getTime();

    }

};


POP.gameOver = function() {

    var opacity = Math.abs(Math.sin(POP.timer * 0.8)),
        col = 'rgba(255,255,255,'+opacity+')',
        col2 = 'rgba(172,255,4,1)';

    POP.delay += 1;

    POP.draw.text(40,90,'Game Over',40, col);

    // display scores
	POP.draw.text(115,160,'泡泡数: '+POP.score.burst, 16, '#fff');
    POP.draw.text(115,190,'精准度: ' + POP.score.accuracy + '%', 16, '#fff'); 
    POP.draw.text(131,220,'时间: ' + POP.score.seconds, 16, '#fff'); 
    POP.draw.text("center",270,'' + POP.score.total, 30, '#fff'); 

    if (POP.newHiscore) {
        POP.draw.text('center', 310, '新记录!!!', 20, col2);

        // POP.draw.text('center', 320, POP.score.total.toString(), 20, col2);
    }
	// 绘画更多游戏
	//POP.draw.rect(10, 330, 50, 20, "#fff")
	
	POP.inputBox.style.display = "block";
	// POP.state = 'splash'; 就是重新开始游戏
	
    if (POP.m.click && POP.delay > 100) {
        POP.againGame();
    }
	
	if(!POP.isEndGame){
		POP.isEndGame = true;
		//btGame.setShare({title: "戳泡泡戳上瘾了，拿了"+POP.score.total+"分。你要不要来爽一把？"});
		//btGame.playScoreMsg("泡泡克星就是你！拿了"+POP.score.total+"分，不去炫耀一下吗？");
		dp_submitScore(POP.score.total);
	}
	

};
POP.isEndGame = false;
POP.againGame = function(){
	/*POP.isEndGame = false;
	POP.score.taps =
	POP.score.burst =
	POP.score.escapees =
	POP.score.accuracy =
	POP.score.seconds = 0;

	POP.newHiscore = false;

	POP.lives = POP.MAX_LIVES;
	POP.level = 1;
	POP.delay = 0;

	POP.gameStart = null;

	POP.inputBox.style.display = 'none';
	POP.state = 'splash';*/
	location.reload();
}

POP.hiScores = function() {

    if (POP.m.click) {
        POP.state = 'splash';
    }

    POP.draw.text('center',50,'Hi-Scores',40, '#fff');

};

POP.play = function() {

    var i, accuracy, live_col, bubble_speed;

    POP.secsElapsed = ( new Date().getTime() - POP.gameStart ) / 1000;
    POP.level = ~~(POP.secsElapsed / 10) + 1;
    
    if (POP.nextBubble < 0) {
        POP.nextBubble = POP.rnd(30 - POP.level, 10); 
        bubble_speed = POP.rnd(5 + POP.level) * -1;
        POP.bubbles.push(new POP.Bubble());
    }
    POP.nextBubble--;

    if (POP.m.click === true) {
        POP.score.taps += 1;
        POP.touches.push( new POP.Touch(POP.m.x, POP.m.y) );
    }

    // render bonus
    POP.bonus.render();
    if (POP.bonus.collides()) {
        switch (POP.bonus.type.action) {
            case 'green':
                POP.lives = POP.MAX_LIVES;
            break;

            case 'red':
                for (i = 0; i < POP.bubbles.length; i += 1) {
                    POP.bubbles[i].burst();
                }
            break;

            case 'black':
                POP.lives -= 1;
            break;
        }
        POP.bonus.reset();
    }

    // render all touches
    for (i = 0; i < POP.touches.length; i += 1) {
        POP.touches[i].render();

        if (POP.touches[i].remove) {
            POP.touches.splice(i, 1);
        }
    }


    // render all bubbles
    for (i = 0; i < POP.bubbles.length; i += 1) {
        POP.bubbles[i].move().render().checkCollision(); 

        if (POP.bubbles[i].remove) {
            POP.bubbles.splice(i, 1);
        }
    }

    // render all explosions
    for (i = 0; i < POP.explosions.length; i += 1) {
            POP.explosions[i].move();

            if (POP.explosions[i].finished) {
                POP.explosions.splice(i, 1);
            }
    }


    // display crappy wave effect
    for (i = 0; i < POP.wave.total; i++) {
        var x_offset = Math.sin(POP.timer * 0.8) * 10;
        POP.draw.circle(
                    POP.wave.x + x_offset +  (i * POP.wave.r), 
                    POP.wave.y, 
                    POP.wave.r, 
                    '#fff'); 
    }

    // calculate score
    POP.score.seconds = ~~(( new Date().getTime() - POP.gameStart ) / 1000);
    POP.score.total = ~~( POP.score.seconds + (POP.score.burst * 10) );
    POP.draw.text(20,40, POP.score.total.toString(), 22, '#fff');


    // draw lives
    for (i = 1; i <= POP.MAX_LIVES; i++) {
        live_col = (i > POP.lives) ? 'rgba(0,0,0,0.7)' : 'rgba(173,255,4,0.7)';
        POP.draw.circle( (i * 25) + (POP.W - 100), 30, 10, live_col); 
    }

    if (POP.lives <= 0) {
        POP.bubbles = [];
        POP.touches = [];
        POP.explosions = [];
        POP.state = 'gameOver';
        POP.secsElapsed = 0;
        POP.level = 0;
        POP.bonus.reset();
        POP.textLayer.style.display = 'block';

        // calculate final score
        POP.score.accuracy = ~~((POP.score.burst / POP.score.taps) * 100);
        if (POP.score.accuracy > 100) {
            POP.score.accuracy = 100;
        }
        POP.score.accuracy = (POP.score.burst === 0) ? 0 :POP.score.accuracy;
        POP.score.seconds = ~~(( new Date().getTime() - POP.gameStart ) / 1000);
        POP.score.total = ~~(POP.score.burst * 10) + 
                            (POP.score.seconds * 1);

        if (POP.score.total > POP.hiScore) {
            POP.newHiscore = true;
            POP.hiScore = POP.score.total;
			try{
				localStorage.POP_hiScore = POP.score.total;
			}catch(e){
				console.log(e);
			}
        }
    }


};
