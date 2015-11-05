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
    }

    function create() {
        player = game.add.sprite(game.world.centerX - 52, game.world.centerY - 75, 'walk');
        player.animations.add('idle', [13], 1, false);
        player.animations.add('walk', [6,7,8,9,10,11], 6, true);
        player.anchor.setTo(.5,.5);

        player.move = function(movement) {
            this.animations.play('walk');
            player.x += movement;
        };
        player.moveLeft = function() {
            this.scale.x = 1;
            this.move(-3);
        };
        player.moveRight = function() {
            this.scale.x = -1;
            this.move(3);
        };
        player.idle = function() {
            this.animations.play('idle', true);
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