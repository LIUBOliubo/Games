
window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame       || 
          window.webkitRequestAnimationFrame || 
          window.mozRequestAnimationFrame    || 
          window.oRequestAnimationFrame      || 
          window.msRequestAnimationFrame     || 
          function(/* function */ callback, /* DOMElement */ element){
            window.setTimeout(callback, 1000 / 60);
          };
}());

var POP = {

	canvas: null, // html canvas object
	ctx: null, // context for interacting with canvas
	W: 320, // shortcut for canvas width
	H: 480, // shortcut for canvas height
    offset: null, // offset from edge of screen to canvas
    debug: false,
    delay: 0,
    touches: [], // array to hold instances of Touch object
    explosions: [],
    bubbles: [], // array to hold instances of Bubbles object
    nextBubble: 100, // timelapse until next bubble released
    // track score
    score: { taps: 0, burst: 0, escapees: 0, accuracy: 0, seconds: 0, total: 0, name: '' },
    hiScore: localStorage.POP_hiScore || 0,
    newHiscore: false,
    lives: null,
    level: 1,
    MAX_LIVES: 3,
    state: 'splash',
    timer: null,
    gameStart: 0,
    secsElapsed: 0,
    bonus: null,
    wave: { r: 50, x: -25, y: -40, total: null },
    ua: { mobile: null, browser: null, version: null, platform: null, scale: 1 },


    // store mouse / click coordinates
    m: {
        x: null,
        y: null,
        r: 10,
        click: null,

        set: function(x, y) {
            this.x = x;
            this.y = y;
            this.click = true;
        },

        reset: function() {
            this.x = this.y = this.click = null;
        }
    },


   /**
    * generate a random integer
    *
    * @param integer range - generate number between 0 and range
    * @param integer offset - added onto random number
    * @return integer
    *
    */
    rnd: function(range, offset) {

        offset = offset || 0;
        return ~~( (Math.random() * range) + offset );

    }

}
