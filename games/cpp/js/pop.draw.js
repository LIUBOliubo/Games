/**
    * collection on methods that abstract drawing simple shapes
    * onto the canvas
    *
    * @access public
    * @return null
    *
    */
POP.draw = {

    clear: function() {
        POP.ctx.clearRect(0, 0, POP.W, POP.H); 
		POP.ctx.fillStyle = "#003466"; 
        POP.ctx.fillRect(0, 0, POP.W, POP.H);
    },

    rect: function(x, y, w, h, col) {
        POP.ctx.fillStyle = col; 
        POP.ctx.fillRect(x, y, w, h);
    },


    circle: function(x, y, r, col, stroke) {
        POP.ctx.fillStyle = col;
        POP.ctx.beginPath();
        POP.ctx.arc(x, y, r, 0, Math.PI*2, true);
        POP.ctx.closePath();
        POP.ctx.fill();

        if (stroke) {
            POP.ctx.strokeStyle = stroke;
            POP.ctx.lineWidth = 2;
            POP.ctx.stroke();
        }
    },


    text: function(x, y, str, size, col) {

        col = col || '#fff';
        size = size || 12;

        var font = (size < 13) ? 'SilkscreenExpandedBold, Droid Sans, Monospaced' : 'Sniglet, cursive';

        x = (x === 'center')
            ? ~~(POP.W / 2) - ((str.length * size) / 2.90 )
            : x;

        POP.ctx.font = 'bold '+size+'px '+font;
        POP.ctx.fillStyle = col;

        POP.ctx.fillText(str.toUpperCase(), x, y);

    }

};
