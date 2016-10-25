POP.Starfish = function() {

    this.x = (Math.random() * (POP.W));
    this.y = POP.H + (Math.random() * 100) + 100;
    this.speed= -1;
    this.inner_r = 10;
    this.offset = (this.inner_r / 100) * 70;
    this.r = this.inner_r + this.offset; // for col detection
    this.points = 5;
    this.increase = Math.PI * 2 / this.points;
    this.angle = 0;
    this.types = {
        'green': { inner: 'green', outer: 'limegreen', action: 'green' },
        'red': { inner: '#600', 'outer': '#900', action: 'red'},
        'black': { inner: '#111', 'outer': '#444', action: 'black' }
    };

    this.types_ref = ['green', 'red', 'black'];

    this.type = this.types[this.types_ref[Math.floor(Math.random() * this.types_ref.length)]];


    this.render = function() {


        if (this.y < 0) {
            this.reset();
            return;
        }

    
        var i, x, y;

        this.y += this.speed;

        POP.draw.circle(this.x, this.y, this.inner_r, this.type.inner);

        for (i = 0; i < this.points; i += 1) {

            x = this.offset * Math.cos(this.angle) + (this.x);
            y = this.offset * Math.sin(this.angle) + (this.y);

            POP.draw.circle(x, y, this.inner_r / 2, (this.type.outer));
                
            this.angle += this.increase;
        }

        this.angle += 0.01;

    };

    this.collides = function() {

        return POP.collision.circle(this, POP.m);

    };


    this.reset = function() {
    
        this.type = this.types[this.types_ref[Math.floor(Math.random() * this.types_ref.length)]];
        this.x = (Math.random() * (POP.W));
        this.y = POP.H + (Math.random() * 100) + 100;
    
    };

};
