Crafty.c('Fighter', {
    init: function () {
        return this.requires('Enemy');
    },
    fighter: function(type, attr) {
        this.addComponent(type);

        this.attr(_.defaults(attr, {
            w: 91,
            h: 105,
            health: 100,
            defaultSpeed: 100
        }));
        this.origin('center');
        this.collision([0, 25, 60, 0, 80, 20, 80, 75, 60, 90, 0, 75]);
        this.attr({
            weaponOrigin: [2, 25]
        });
        this.enemy();
        this.bind('Hit', (function(_this) {
            return function (data) {
                if (_this.juice !== false) {
                    _this.shiftedX += 5;
                    Crafty.audio.play('hit', 1, .5);
                }

                if (data.projectile.has('Bullet') && _this.juice !== false) {
                    return Crafty.e('Blast, LaserHit').explode({
                        x: data.projectile.x,
                        y: data.projectile.y,
                        radius: 4,
                        duration: 50
                    });
                }
            };
        })(this));
        return this;
    },
    updatedHealth: function () {
        // Used for setting a damaged sprite
    },
    updateMovementVisuals: function (rotation, dx, dy, dt) {
        // Used for visual updates on movement.
    }
})
