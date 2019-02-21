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


    var game = new Phaser.Game(800, 704, Phaser.AUTO, 'game', {
        preload: preload,
        create: create,
        update: update,
    });

    function preload() {
        game.load.tilemap('map', 'assets/map.csv', null, Phaser.Tilemap.CSV);
        game.load.image('tiles', 'assets/tiles.png');
        game.load.spritesheet('player', 'assets/sprite2.png');
        game.load.image('book', 'assets/book.png');
        game.load.image('bookcheck', 'assets/bookcheck.png');
    }

    var map;
    var layer;
    var player;
    var cursors;
    var books;
    var book1, book2, book3;

    function create() {
        //map
        map = game.add.tilemap('map', 32, 32);
        map.addTilesetImage('tiles');
        layer = map.createLayer(0);
        layer.resizeWorld();
        map.setCollision(1);
        map.setTileIndexCallback(2, gameOver, this);
        //layer.debug = true;

        //books
        books = game.add.group();
        books.enableBody = true;
        book1 = books.create(32, mult(4), 'book');
        book2 = books.create(mult(5), mult(16), 'book');
        book3 = books.create(mult(26), mult(20), 'book');

        //player
        player = game.add.sprite(32, 32, 'player', 0);
        game.physics.enable(player, Phaser.Physics.ARCADE);
        game.camera.follow(player);
        cursors = game.input.keyboard.createCursorKeys();
    }

    function update() {
        game.physics.arcade.collide(player, layer);

        //overlap with yearbooks
        game.physics.arcade.overlap(player, books, replaceBook);
        //game.physics.overlap(player, Phaser.Tile(2), gameOver);

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

    function replaceBook(player, book) {
        book.loadTexture('bookcheck');
    }

    function gameOver(player, tile) {
        player.kill();
    }
    function mult(num) {
        return num * 32;
    }
}