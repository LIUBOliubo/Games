/**
    * polls input and updates POP.m object
    *
    * @access public
    * @return null
    *
    */
POP.input = function() {

    var target = $("#SF_Game canvas")[0];
	var $target = $(target);
    $target.on('click', function(e) {

        if (POP.state === 'play') {
             e.preventDefault(); 
        }
		var width = POP.canvas.width, height = POP.canvas.height;
		var rwidth = $target.width(), rheight = $target.height();
        POP.m.set(
           e.offsetX * width / rwidth,
           e.offsetY * height / rheight
        );
    });

    $target.on('touchstart', function(e) {

        if (POP.state === 'play') {
            e.preventDefault(); 
        }

        var touch = e.touches[0], offset = $target.offset(); 
		var width = POP.canvas.width, height = POP.canvas.height;
		var rwidth = $target.width(), rheight = $target.height();
        var x = (touch.pageX - offset.left) * width / rwidth;
        var y = (touch.pageY - offset.top) * height / rheight;
        POP.m.set(x, y);

    });
    

    target.addEventListener('touchmove', function(e) {
        window.scrollTo(0, 1);
        e.preventDefault(); 
        return false;
    }, false);

    target.addEventListener('touchend', function(e) {
        window.scrollTo(0, 1);
        e.preventDefault(); 
        return false;
    }, false);

};
