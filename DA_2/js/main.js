"use strict";

window.onload = function() {
    // You can copy-and-paste the code from any of the examples at http://examples.phaser.io here.
    // You will need to change the fourth parameter to "new Phaser.Game()" from
    // 'phaser-example' to 'game', which is the id of the HTML element where we
    // want the game to go.
    // The assets (and code) can be found at: https://github.com/photonstorm/phaser/tree/master/examples/assets
    // You will need to change the paths you pass to "game.load.image()" or any other
    // loading functions to reflect where you are putting the assets.
    // All loading functions will typically all be found inside "preload()".


    var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game', {
        preload: preload,
        create: create,
        update: update,
    });

    function preload() {
        game.load.image('guy', 'assets/sprites/guy.png');
        game.load.spritesheet('dude', 'assets/sprites/dude.png', 32, 48);
        game.load.image('bg', 'assets/sprites/bg.png');
        game.load.image('ground', 'assets/sprites/platform.png');
    }

    var platforms;
    var player;
    var cursors;

    function create() {
        //physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);

        //background
        game.add.sprite(0, 0, 'bg');

        //ground
       platforms = game.add.group();
       platforms.enableBody = true;
       var ground = platforms.create(0, game.world.height - 64, 'ground');
       ground.scale.setTo(2, 2);
       ground.body.immovable = true;

       //platforms
       var ledge = platforms.create(200, 400, 'ground');
       ledge.body.immovable = true;

       //player
        player = game.add.sprite(32, game.world.height - 150, 'dude');
        game.physics.arcade.enable(player);
        player.body.bounce.y = 0.2;
        player.body.gravity.y = 1200;
        player.body.collideWorldBounds = true;
        player.animations.add('left', [0, 1, 2, 3], 10, true);
        player.animations.add('right', [5, 6, 7, 8], 10, true);

        //cursor
        cursors = game.input.keyboard.createCursorKeys();
    }

    function update() {

        //collide with platforms
        var hitPlatforms = game.physics.arcade.collide(player, platforms);

        //  Reset the players velocity (movement)
        player.body.velocity.x = 0;

        if (cursors.left.isDown)
        {
            //  Move to the left
            player.body.velocity.x = -300;

            player.animations.play('left');
        }
        else if (cursors.right.isDown)
        {
            //  Move to the right
            player.body.velocity.x = 300;

            player.animations.play('right');
        }
        else
        {
            //  Stand still
            player.animations.stop();

            player.frame = 4;
        }

        //  Allow the player to jump if they are touching the ground.
        if (cursors.up.isDown && player.body.touching.down)
        {
            player.body.velocity.y = -640;
        }
    }
}