POP.init = function() {

    POP.Ua.init();
    if (window.screen.availWidth > 640) {
        // could add in css transform here for larger screen sizes
        // then need to recalibrate mouse / touch offsets
        // POP.ua.scale = 1.5;
    }

    POP.container = document.getElementById('SF_Game');
    POP.canvas = document.getElementsByTagName('canvas')[0];
    POP.canvas.width = POP.W;
    POP.canvas.height = POP.H;
    POP.ctx = POP.canvas.getContext('2d');

    POP.offset = {
        top: POP.container.offsetTop,
        left: POP.container.offsetLeft
    };

    POP.textLayer = document.getElementById('textLayer');
    POP.inputBox = document.getElementById('inputBox');

    POP.stats = new Stats();
    POP.stats.domElement.style.position = 'absolute';
    POP.stats.domElement.style.right = '0px';
    POP.stats.domElement.style.bottom = '0px';


    if (window.location.hash === '#debug') {
        POP.debug = true;
    }

    if (POP.debug) {
        document.body.appendChild( POP.stats.domElement );
    }

    POP.lives = POP.MAX_LIVES;
    POP.wave.total = POP.W / POP.wave.r + 1;

    POP.bonus = new POP.Starfish();


    POP.input();
    POP.router();

};

