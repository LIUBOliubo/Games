POP.Touch = function(x, y) {

    this.x = x;
    this.y = y;
    this.r = 10;
    this.opacity = 1;
    this.remove = false;

    this.render = function() {
    
        if (this.remove) {
            return;
        }

        if (this.opacity < 0.1 ) {
            this.remove = true;
        } else {
            POP.draw.circle(this.x, this.y, this.r, 
                            'rgba(255,0,0,' + this.opacity + ')');
            this.opacity = this.opacity - 0.05;
        }

    
    };

};
