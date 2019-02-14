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
        game.load.spritesheet('bird', 'assets/sprites/bird.png', 32, 48);
        game.load.image('bg', 'assets/sprites/bg.png');
        game.load.image('ground', 'assets/sprites/platform.png');
        game.load.image('plat', 'assets/sprites/half.png');
        game.load.audio('titleMusic', ['assets/desert-dance.mp3']);
        game.load.image('cactus', 'assets/sprites/cactus.png');
    }

    var platforms;
    var player;
    var player2;
    var cursors;
    var music;
    var wasd;
    var cacti;

    function create() {
        //music
        music = game.add.audio('titleMusic');
        music.play();

        //physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);

        //background
        game.add.sprite(0, 0, 'bg');

        //cacti
        cacti = game.add.group();
        cacti.enableBody = true;
        var cactus = cacti.create(384, game.world.height - 96, 'cactus');
        cactus.body.immovable = true;
        var cactus2 = cacti.create(96, game.world.height - 96, 'cactus');
        cactus2.body.immovable = true;
        var cactus3 = cacti.create(672, game.world.height - 96, 'cactus');
        cactus3.body.immovable = true;
        var cactus4 = cacti.create(384, 348, 'cactus');
        cactus4.body.immovable = true;
        var cactus5 = cacti.create(134, 196, 'cactus');
        cactus5.body.immovable = true;
        var cactus6 = cacti.create(634, 196, 'cactus');
        cactus6.body.immovable = true;

        //ground
       platforms = game.add.group();
       platforms.enableBody = true;
       var ground = platforms.create(0, game.world.height - 64, 'ground');
       ground.scale.setTo(2, 2);
       ground.body.immovable = true;

       //platforms
       var ledge = platforms.create(200, 380, 'ground');
       ledge.body.immovable = true;
       var ledge2 = platforms.create(50, 228, 'plat');
       ledge2.body.immovable = true;
       var ledge3 = platforms.create(550, 228, 'plat');
       ledge3.body.immovable = true;

       //player
        player = game.add.sprite(32, game.world.height - 150, 'dude');
        game.physics.arcade.enable(player);
        player.body.bounce.y = 0.2;
        player.body.gravity.y = 1200;
        player.body.collideWorldBounds = true;
        player.animations.add('left', [0, 1, 2, 3], 10, true);
        player.animations.add('right', [5, 6, 7, 8], 10, true);

        //player2
        player2 = game.add.sprite(736, game.world.height - 150, 'bird');
        game.physics.arcade.enable(player2);
        player2.body.bounce.y = 0.4;
        player2.body.gravity.y = 1000;
        player2.body.collideWorldBounds = true;
        player2.animations.add('left', [0, 1, 2, 3], 10, true);
        player2.animations.add('right', [5, 6, 7, 8], 10, true);

        //cursor
        cursors = game.input.keyboard.createCursorKeys();
        wasd = {
            up: game.input.keyboard.addKey(Phaser.Keyboard.W),
            down: game.input.keyboard.addKey(Phaser.Keyboard.S),
            left: game.input.keyboard.addKey(Phaser.Keyboard.A),
            right: game.input.keyboard.addKey(Phaser.Keyboard.D),
        };
    }

    function update() {

        //collisions
        game.physics.arcade.collide(player2, cacti);
        game.physics.arcade.overlap(player, player2, gameover, null, this);
        game.physics.arcade.overlap(player, cacti, gameover, null, this);
        game.physics.arcade.collide(platforms, cacti);

        //collide with platforms
        var hitPlatforms = game.physics.arcade.collide(player, platforms);
        var hitPlatforms2 = game.physics.arcade.collide(player2, platforms);

        //  Reset the players velocity (movement)
        player.body.velocity.x = 0;
        player2.body.velocity.x = 0;

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
        if (wasd.left.isDown)
        {
            //  Move to the left
            player2.body.velocity.x = -240;

            player2.animations.play('left');
        }
        else if (wasd.right.isDown)
        {
            //  Move to the right
            player2.body.velocity.x = 240;

            player2.animations.play('right');
        }
        else
        {
            //  Stand still
            player2.animations.stop();

            player2.frame = 4;
        }

        //  Allow the player to jump if they are touching the ground.
        if (wasd.up.isDown && player2.body.touching.down)
        {
            player2.body.velocity.y = -640;
        }
    }
    function gameover(player) {
        player.kill();
    }
}