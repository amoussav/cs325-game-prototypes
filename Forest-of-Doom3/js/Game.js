"use strict";

GameStates.makeGame = function( game, shared ) {
    // Create your own variables.
    var bouncy = null;
    
    function quitGame() {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        music.stop();
        game.state.start('MainMenu');

    }
    function winGame() {
        var winText = game.add.text(300,120,'YOU WON!',{font:'50px Arial', fill:'#FFF'});
    }

    var music;
    var map;
    var layer;
    var player;
    var cursors;
    var weapon;
    var shadow;
    var qKey;

    function swap() {
        if (shadow.num == 2) {
            shadow.kill()
            shadow = game.add.sprite(0, 0, 'shadow');
            shadow.num = 1;
            player.animations.play('stick');
        }
        else {
            shadow.kill()
            shadow = game.add.sprite(0, 0, 'shadow2');
            shadow.num = 2;
            player.animations.play('light');
        }
        shadow.fixedToCamera = true;
    }

    function check() {
        if (shadow.num == 2) {
            quitGame();
        }
    }

    return {

        create: function () {

            //music
            music = game.add.audio('backgroundMusic');
            music.play();

            //map
            map = game.add.tilemap('map', 32, 32);
            //map.setTileIndexCallback(2, shadow.kill(), this);
            map.addTilesetImage('tiles');
            layer = map.createLayer(0);
            layer.resizeWorld();
            map.setCollision(1);
            map.setTileIndexCallback(2, winGame, this);
            map.setTileIndexCallback(3, check, this);
            //layer.debug = true;

            //player
            player = game.add.sprite(224, 224, 'player', 0);
            game.physics.enable(player, Phaser.Physics.ARCADE);
            player.body.setSize(23, 21, 4, 6);
            player.animations.add('light', [0], true);
            player.animations.add('stick', [1], true);
            cursors = game.input.keyboard.createCursorKeys();

            //camera
            game.camera.follow(player);

            //shadow
            shadow = game.add.sprite(0, 0, 'shadow2');
            shadow.num = 2;
            shadow.fixedToCamera = true;

            //weapon
            qKey = game.input.keyboard.addKey(Phaser.Keyboard.Q);
        },
    
        update: function () {
            //collisions
            game.physics.arcade.collide(player, layer);

            //shadow
            if (qKey.justDown) {
                /*if (shadow.num == 2) {
                    shadow.kill()
                    shadow = game.add.sprite(0, 0, 'shadow');
                    shadow.num = 1;
                }
                else {
                    shadow.kill()
                    shadow = game.add.sprite(0, 0, 'shadow2');
                    shadow.num = 2;
                }
                shadow.fixedToCamera = true;*/
                swap();
            }

            //movement
            player.body.velocity.set(0);

            if (cursors.left.isDown && !cursors.right.isDown)
            {
                player.body.velocity.x = -120;
                player.play('left');
            }
            if (cursors.right.isDown && !cursors.left.isDown)
            {
                player.body.velocity.x = 120;
                player.play('right');
            }
            if (cursors.up.isDown && !cursors.down.isDown)
            {
                player.body.velocity.y = -120;
                player.play('up');
            }
            if (cursors.down.isDown && !cursors.up.isDown)
            {
                player.body.velocity.y = 120;
                player.play('down');
            }
            player.animations.stop();
        }
    };
};
