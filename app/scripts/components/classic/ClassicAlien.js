this.ClassicAlienConstants = (function() {
    function ClassicAlienConstants() { }

    ClassicAlienConstants.IDLE_X = -200;

    ClassicAlienConstants.IDLE_Y = 400;

    ClassicAlienConstants.WIDTH = ClassicAlienConstants.HEIGHT = 48;

    ClassicAlienConstants.HORIZONTAL_SPEED = 10;

    ClassicAlienConstants.VERTICAL_SPEED = 25;

    ClassicAlienConstants.MOVEMENT_INTERVAL = 2000;

    ClassicAlienConstants.HITBOX = {
        1: (function () {
            return [8, 8, 39, 8, 39, 37, 8, 37];
        }),
        2: (function () {
            return [8, 8, 39, 8, 39, 37, 8, 37];
        }),
        3: (function () {
            return [8, 8, 39, 8, 39, 37, 8, 37];
        })
    };

    return ClassicAlienConstants;
})();

Crafty.c("ClassicAlien",
{
    init: function () {
        this.requires("2D, DOM, SpriteAnimation, Collision");
        return this.direction = 'w';
    },
    respawn: function () {
        this.attr({
            x: this.spawnX,
            y: this.spawnY,
            visible: true
        });
        if (!this.custom) {
            this.reelPosition(0);
        }
        
        this.direction = 'w';
        return this;
    },
    die: function () {
        Crafty.audio.play('classic_alien_die');

        return this.dieSilently();
    },
    dieSilently: function () {
        this.attr({
            x: ClassicAlienConstants.IDLE_X,
            y: ClassicAlienConstants.IDLE_Y,
            visible: false
        });
        this.node.remove();
        return this;
    },
    alien: function (type, x, y, bonus) {
        if (bonus) {
            var customInvaderAssets = {
                1: 'charlieInvader',
                2: 'paulInvader',
                3: 'paulInvader',
                4: 'frankInvader',
                5: 'frankInvader'
            };
            this.type = customInvaderAssets[type];
            this.addComponent(this.type);
            this.attr({
                w: 35,
                h: 50.1
            });
            this.collision();
            this.custom = true;

        } else {
            this.addComponent("classic_alien" + type);
            this.reel("move", 1, 0, 0, 2);
            this.reel("move");
            this.collision(new Crafty.polygon(ClassicAlienConstants.HITBOX[type]()));
            this.type = type;
            this.custom = false;
        }

        this.spawnX = x;
        this.spawnY = y;
        
        return this;
    },
    advance: function () {
        this.move(this.direction, ClassicAlienConstants.HORIZONTAL_SPEED);
        if (!this.custom) {
            this.reelPosition((this.reelPosition() + 1) % 2);
        }
        return this;
    },
    descend: function () {
        this.move('s', ClassicAlienConstants.VERTICAL_SPEED);
        if (this.direction === 'w') {
            this.direction = 'e';
        } else {
            this.direction = 'w';
        }
        return this;
    },
    pointsWorth: function () {
        if (this.custom) {
            var customInvaderPoints = {
                'frankInvader': 10,
                'charlieInvader': 50,
                'paulInvader': 20
            };

            // @TODO CHANGE
            return customInvaderPoints[this.type];
        } else {
            return 50 * this.type;
        }
    },
    setContainingNode: function (node) {
        this.node = node;
        return this;
    }
});