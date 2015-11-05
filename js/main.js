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
        player.animations.add('left', [13], 1, false);
        player.animations.add('right', [12], 1, false);
        player.animations.add('rightwalk', [0,1,2,3,4,5], 6, true);
        player.animations.add('leftwalk', [6,7,8,9,10,11], 6, true);

        player.isLeft = true;

        player.move = function(movement) {
            player.x += movement;
        };
        player.moveLeft = function() {
            this.animations.play('leftwalk');
            this.isLeft = true;
            this.move(-3);
        };
        player.moveRight = function() {
            this.animations.play('rightwalk');
            this.isLeft = false;
            this.move(3);
        };
        player.idle = function() {
            if(this.isLeft == true) {
                this.animations.play('left', true);
            } else {
                this.animations.play('right', true);
            }
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