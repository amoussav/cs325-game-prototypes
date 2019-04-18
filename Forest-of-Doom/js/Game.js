"use strict";

GameStates.makeGame = function( game, shared ) {
    // Create your own variables.
    var bouncy = null;
    
    function quitGame() {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        game.state.start('MainMenu');

    }

    var music;
    var map;
    var layer;
    var player;
    var cursors;
    var weapon;
    var shadow;
    var qKey;

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
            map.setTileIndexCallback(2, quitGame, this);
            //layer.debug = true;

            //player
            player = game.add.sprite(224, 224, 'player', 0);
            game.physics.enable(player, Phaser.Physics.ARCADE);
            player.body.setSize(23, 21, 4, 6);
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
            game.physics.arcade.collide(player, layer);

            //shadow
            if (qKey.justDown) {
                if (shadow.num == 2) {
                    shadow.kill()
                    shadow = game.add.sprite(0, 0, 'shadow');
                    shadow.num = 1;
                }
                else {
                    shadow.kill()
                    shadow = game.add.sprite(0, 0, 'shadow2');
                    shadow.num = 2;
                }
                shadow.fixedToCamera = true;
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
