/* jshintbrowser: true */
var fingerMatch = {
    tiger: 2,
    fly: 1
};
var fingers, score;
var nextSymbol, currentSymbol, running;
var startEvent, endEvent;
var timerStart, timerLength;
var shareDesc;

timerLength = 15000; // 15s

function g( id ) {
    return document.getElementById( id );
}

g( 'start' ).onclick = start;

function start() {
    g( 'teach' ).style.display = 'none';
    g( 'start' ).style.display = 'none';
    g( 'share' ).style.display = 'none';
    g( 'more' ).style.display = 'none';
    g( 'game' ).style.display = 'block';
    g( 'timer' ).style.display = 'block';
    g( 'score' ).innerHTML = '';
    g( 'timer' ).innerHTML = '开始点吧 -.-';
    score = 0;
    fingers = 0;
    timerStart = 0;
    nextSymbol = generate();
    next();
    running = true;
}

function stop() {
    running = false;
    if ( score < 5 ) {
        shareDesc = '“战斗力小于5的渣渣！”';
    } else if ( score < 30 ) {
        shareDesc = '“谢谢你为人类做出的贡献！”';
    } else if ( score < 50 ) {
        shareDesc = '“独孤求败，无人能敌！”';
    } else {
        shareDesc = '“我不是人类！”';
    }
    g( 'timer' ).innerHTML = shareDesc;
    shareDesc =  '我打了' + score + '个老虎和苍蝇！——' + shareDesc;
    document.title = shareDesc;
	dataForWeixin.tTitle = shareDesc;
    g( 'start' ).style.display = 'block';
    g( 'share' ).style.display = 'block';
    g( 'more' ).style.display = 'block';
    g( 'start' ).innerHTML = '再来一盘';
}

function next() {
    currentSymbol = nextSymbol;
    nextSymbol = generate();
    update();
}

function generate() {
    return Math.random() > 0.5 ? 'tiger' : 'fly';
}

function update() {
    g( 'current' ).src = _config['isSite']+"vapp/49/"+currentSymbol + '2.png';
    g( 'next' ).src = _config['isSite']+"vapp/49/"+nextSymbol + '2.png';
}

function slash( color, duration ) {
    duration = duration || 100;
    g( 'slash' ).style.background = color;
    g( 'slash' ).style.webkitAnimationDuration = duration + 'ms';
    g( 'slash' ).classList.add( 'play' );
    setTimeout( function () {
        g( 'slash' ).classList.remove( 'play' );
    }, duration );
}


function clock() {
    var ellapsed = +new Date() - timerStart;
    var left = ( timerLength - ellapsed ) / 1000;
    if ( left <= 0 ) {
        stop();
    } else if ( running ) {
        g( 'timer' ).innerHTML = left.toFixed( 2 );
        setTimeout( clock );
    }
}

if ( 'ontouchstart' in document.body ) {
    startEvent = 'touchstart';
    endEvent = 'touchend';
} else {
    startEvent = 'mousedown';
    endEvent = 'mouseup';
}

g( 'game' ).addEventListener( startEvent, function ( e ) {
    e.preventDefault();
    if ( !running ) return;
    fingers += e.touches ? e.touches.length : 1;
    //console.log(fingers);
    if ( !timerStart ) {
        timerStart = +new Date();
        clock();
    }
} );

g( 'game' ).addEventListener( endEvent, function ( e ) {
    e.preventDefault();
    if ( !running || !fingers ) return;
    if ( ( fingers > 1 && currentSymbol == 'tiger' ) ||
        ( fingers == 1 && currentSymbol == 'fly' ) ) {
        fingers = 0;
        next();
        g( 'score' ).innerHTML = '杀死：' + ( ++score );
        slash( 'red' );
        g( 'current' ).style.webkitTransform = ( score % 2 ) ? 'scale(-1, 1)' : '';
    } else {
        slash( 'red', 3000 );
        stop();
    }
    fingers = 0;
} );

g( 'game' ).addEventListener( 'contextmenu', function ( e ) {
    e.preventDefault();
} );

g( 'share' ).onclick = function () {
    
   g( 'share-mask' ).style.display = 'block';    
    
};

if (endgame.env.ee) {
    g( 'share' ).style.display = 'none';
}
g( 'share-mask' ).addEventListener( startEvent, function () {
    g( 'share-mask' ).style.display = 'none';
} );

function more() {
    window.location.href = v;
}