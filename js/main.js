window.onload = function() {

    var player,
        cursors,
        game = new Phaser.Game(
            800,
            600,
            Phaser.AUTO,
            'game',
            {
                preload: preload,
                create: create,
                render:render,
                update: update
            }
        );

    function preload() {
        game.load.spritesheet('walk', 'img/walk.png', 104, 150, 14);
        game.load.spritesheet('explosion', 'img/explosion.png', 36, 37, 14);
        game.load.image('hat', 'img/hat.gif');
    }

    function create() {
        player = game.add.group();

        var guy = game.add.sprite(game.world.centerX - 52, game.world.centerY - 75, 'walk');
        guy.animations.add('idle', [13], 1, false);
        guy.animations.add('walk', [6,7,8,9,10,11], 6, true);
        guy.anchor.setTo(.5,.5);
        player.add(guy);

        var explosion = game.add.sprite(game.world.centerX - 44, game.world.centerY - 72, 'explosion');
        explosion.animations.add('explode', [0,1,2,3,4,5,6,7,8], 30, true);
        explosion.animations.add('idle', [0], 1, false);
        explosion.anchor.setTo(.8,.5);
        player.add(explosion);

        player.move = function(movement) {
            this.children[0].animations.play('walk');
            this.children[1].animations.play('explode');
            player.x += movement;
        };
        player.moveLeft = function() {
            this.children[0].scale.x = 1;
            this.move(-3);
        };
        player.moveRight = function() {
            this.children[0].scale.x = -1;
            this.move(3);
        };
        player.idle = function() {
            this.children[0].animations.play('idle', true);
            this.children[1].animations.play('idle', true);
        };

        cursors = game.input.keyboard.createCursorKeys();
    }

    function render() {
        //game.debug.pointer(game.input.activePointer);
    }

    function update() {
        if (isLeft()) {
            player.moveLeft();
        }
        else if (isRight()) {
            player.moveRight();
        }
        else {
            player.idle();
        }
    }

    function isLeft() {
        var pointer = game.input.activePointer;
        return cursors.left.isDown ||
            (pointer.isDown && pointer.x < player.x + 40);
    }
    function isRight() {
        var pointer = game.input.activePointer;
        return cursors.right.isDown ||
            (pointer.isDown && pointer.x > player.x + 60)
    }
};