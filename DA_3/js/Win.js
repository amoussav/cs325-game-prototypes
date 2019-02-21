var Win = {

    create : function(game){
        var winLabel = game.add.text(80,80,'YOU WON!',{font:'50px Arial', fill:'#FFF'});
        var startLabel = game.add.text(80,game.world.height-80,'Press "w" to restart the game', {font:'25px Arial', fill:'#FFF'});

        var wkey = game.input.keyboard.addKey(Phaser.Keyboard.W);
        wkey.onDown.addOnce(this.restart,this);

    },

    restart : function(game){
        game.state.start('Menu');

    }


};