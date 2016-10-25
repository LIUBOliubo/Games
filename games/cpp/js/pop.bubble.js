POP.Bubble = function(speed) {

    this.x = POP.rnd(POP.W);
    this.xConstant = this.x;
    this.y = POP.rnd(50, POP.H);
    this.r = POP.rnd(15, 10);
    this.speed = speed || POP.rnd(5, 1) * -1;
    this.remove = false;
    this.counter = 0;
    this.waveSize = 5 + this.r; 
    this.col = 'rgba(255,255,255,0.5)';

    this.move = function() {

        this.y = this.y + this.speed;
        this.x = this.waveSize * Math.sin(this.counter) + this.xConstant;

        if (this.y < 0) {
            POP.score.escapees += 1;
            POP.lives -= 1;
            this.remove = true;
        }

        this.counter += 0.05;

        return this;
    };


    this.render = function() {
        POP.draw.circle(this.x, this.y, 
                            this.r, 
                            this.col, 
                            '#fff');

        return this;
    };


    this.checkCollision = function() {
    

        if ( POP.m.click && POP.collision.circle(this, POP.m)) {
        
                this.burst();
        }

        return this;

    };


    this.burst = function() {
    
            POP.score.burst += 1;
            POP.explosions.push( new POP.Explosion(this.x, this.y, this.r));        
            this.remove = true;

    
    };

};
