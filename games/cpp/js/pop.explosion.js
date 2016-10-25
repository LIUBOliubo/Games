POP.Particle = function(x, y,r, col) {

    this.x = x;
    this.y = y;
    this.r = r;

    this.col = col || '#fff';
    this.remove = false;

    this.dir = ~~(Math.random() * 2);
    this.dir = (this.dir) ? 1 : -1;

    this.vx = ~~(Math.random() * 4) * this.dir;
    this.vy = ~~(Math.random() * 7) * 1;


    this.move = function() {
    
        this.x += this.vx;
        this.y += this.vy;

        this.vx *= 0.99;
        this.vy *= 0.99;

        this.vy -= 0.25;

        POP.draw.circle(this.x, this.y, this.r, this.col);

        if (this.y < 0) {
            this.remove = true;
        }

    };

};

POP.Explosion = function(x, y, r, num, cols) {

    this.x = x;
    this.y = y;

    this.finished = false;

    this.num = num || 6;
    this.cols = cols || ['#69a'];

    var totalCols = this.cols.length;
    var currCol = 0;

    this.r = ~~(r / num);
    this.r = 2;
    this.particles = [];

    for (i=0; i <= this.num; i++) {
        this.particles.push( new POP.Particle(x, y, this.r, this.cols[currCol]) );
        currCol = (currCol <= totalCols) ? currCol += 1 : 0;
    }


    this.move = function() {
    
        if (!this.particles.length) {
            this.finished = true;
        }

        for (i = 0; i < this.particles.length; i += 1) {
            this.particles[i].move();

        } 

        for (i = 0; i < this.particles.length; i += 1) {

            if (this.particles[i].remove === true) {
                this.particles.splice(i, 1);
            }
        }
    };

};
