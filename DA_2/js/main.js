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


    var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', {
        preload: preload,
        create: create,
        update: update,
        render: render
    });

    function preload() {
        game.load.image('arrow', 'assets/sprites/arrow.png');
    }

    var sprite;

    function create() {

        game.physics.startSystem(Phaser.Physics.ARCADE);

        game.stage.backgroundColor = '#0072bc';

        sprite = game.add.sprite(400, 300, 'arrow');
        sprite.anchor.setTo(0.5, 0.5);

    }

    function update() {

        //  This will update the sprite.rotation so that it points to the currently active pointer
        //  On a Desktop that is the mouse, on mobile the most recent finger press.
        sprite.rotation = game.physics.arcade.angleToPointer(sprite);

    }

    function render() {

        game.debug.spriteInfo(sprite, 32, 32);

    }
}