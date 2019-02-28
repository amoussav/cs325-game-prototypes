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
        game.load.image('healthBar', 'assets/sprites/health.png');
    }

    var platforms;
    var player;
    var player2;
    var cursors;
    var music;
    var wasd;
    var cacti;
    var cactus, cactus2, cactus3, cactus4, cactus5, cactus6;
    var healthText;
    var timer;
    var birdVelocity;

    function create() {
        //music
        music = game.add.audio('titleMusic');
        music.play();

        //physics system
        game.physics.startSystem(Phaser.Physics.ARCADE);

        //background
        game.add.sprite(0, 0, 'bg');

        //timer

        //cacti
        cacti = game.add.physicsGroup();
        cacti.enableBody = true;
        cactus = cacti.create(384, game.world.height - 96, 'cactus');
       // cactus.body.immovable = true;
        cactus2 = cacti.create(96, game.world.height - 96, 'cactus');
        //cactus2.body.immovable = true;
        cactus3 = cacti.create(672, game.world.height - 96, 'cactus');
        //cactus3.body.immovable = true;
        cactus4 = cacti.create(384, 348, 'cactus');
        //cactus4.body.immovable = true;
        cactus5 = cacti.create(134, 196, 'cactus');
        //cactus5.body.immovable = true;
        cactus6 = cacti.create(634, 196, 'cactus');
        //cactus6.body.immovable = true;
        cacti.setAll('body.gravity.y', 1200);

        //ground
       platforms = game.add.physicsGroup();
       platforms.enableBody = true;
       var ground = platforms.create(0, game.world.height - 64, 'ground');
       ground.scale.setTo(2, 2);

       //platforms
       var ledge = platforms.create(200, 380, 'ground');
       var ledge2 = platforms.create(50, 228, 'plat');
       var ledge3 = platforms.create(550, 228, 'plat');
       platforms.setAll('body.immovable', true);

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
        birdVelocity = 200;

        //cursor
        cursors = game.input.keyboard.createCursorKeys();
        wasd = {
            up: game.input.keyboard.addKey(Phaser.Keyboard.W),
            down: game.input.keyboard.addKey(Phaser.Keyboard.S),
            left: game.input.keyboard.addKey(Phaser.Keyboard.A),
            right: game.input.keyboard.addKey(Phaser.Keyboard.D),
        };

        //bird health
        player2.health = 12;
        healthText = game.add.text(650, 32, "health: " + player2.health.toString());

        //timer
        timer = game.time.create(false);
        timer.loop(1000, decHealth, this);
        timer.start();

    }

    function update() {

        //collisions
        game.physics.arcade.overlap(player2, cacti, eat, null, this);
        game.physics.arcade.overlap(player, player2, gameover, null, this);
        game.physics.arcade.overlap(player, cacti, gameover, null, this);
        game.physics.arcade.collide(platforms, cacti);

        //cacti velocity
        cacti.setAll('body.velocity.x', 'body.velocity.x' * 0.8);

        //collide with platforms
        var hitPlatforms = game.physics.arcade.collide(player, platforms);
        var hitPlatforms2 = game.physics.arcade.collide(player2, platforms);
        var hitPlatforms3 = game.physics.arcade.collide(cacti, platforms);

        //  Reset the players velocity (movement)
        player.body.velocity.x = 0;
        player2.body.velocity.x = 0;

        //movement for worm
        if (wasd.left.isDown && !wasd.right.isDown)
        {
            //  Move to the left
            player.body.velocity.x = -330;

            player.animations.play('left');
        }
        else if (wasd.right.isDown && !wasd.left.isDown)
        {
            //  Move to the right
            player.body.velocity.x = 330;

            player.animations.play('right');
        }
        else
        {
            //  Stand still
            player.animations.stop();

            player.frame = 4;
        }

        //  Allow the player to jump if they are touching the ground.
        if (wasd.up.isDown && player.body.touching.down)
        {
            player.body.velocity.y = -640;
        }

        //movement for bird

        if (cursors.left.isDown && !cursors.right.isDown)
        {
            //  Move to the left
            player2.body.velocity.x = -1 * birdVelocity;

            player2.animations.play('left');
        }
        else if (cursors.right.isDown && !cursors.left.isDown)
        {
            //  Move to the right
            player2.body.velocity.x = birdVelocity;

            player2.animations.play('right');
        }
        else
        {
            //  Stand still
            player2.animations.stop();

            player2.frame = 4;
        }

        //  Allow the player to jump if they are touching the ground.
        if (cursors.up.isDown && player2.body.touching.down)
        {
            player2.body.velocity.y = -640;
        }
    }
    function gameover(player) {
        player.kill();
    }
    function eat(bird, cactus) {
        if (cursors.down.isDown) {
            cactus.kill();
            player2.health = 12;
            timer.stop();
            timer.loop(1000, decHealth, this);
            timer.start();
            birdVelocity = 200;
            healthText.setText("health: " + player2.health.toString());
        }
    }
    function decHealth() {
        player2.health -= 1;
        if (player2.health == 0) {
            player2.kill();
            timer.stop();
        }
        if (player2.health == 5) {
            birdVelocity = 300;
        }
        healthText.setText("health: " + player2.health.toString());
    }
}