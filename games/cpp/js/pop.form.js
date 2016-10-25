POP.form = {

    send: function() {
    
        POP.m.click = false;
        var name = document.getElementById('userName').value;
        POP.inputBox.style.display = 'none';
        console.log(name); 
    },

    focus: function() {
        document.getElementById('userName').focus();
    },

    hide: function() {
        POP.m.click = false;
        document.getElementById('inputBox').display = 'none';
    },

    show: function() {
        document.getElementById('inputBox').display = 'block';
    }

};
