Crafty.c('Helicopter', {
    init: function () {
        this.requires('Enemy, helicopter, SpriteAnimation');
        this.reel('fly', 200, [[0, 6, 4, 2], [4, 6, 4, 2]]);
        this.crop(0, 9, 128, 55);
        this.origin('center');
        return this.collision([8, 5, 120, 5, 112, 35, 12, 47]);
    },
    helicopter: function (attr) {
        var defaultHealth, ref;
        if (attr == null) {
            attr = {};
        }
        defaultHealth = 2750;
        this.attr(_.defaults(attr, {
            w: 128,
            h: 55,
            health: defaultHealth,
            maxHealth: (ref = attr.health) != null ? ref : defaultHealth,
            weaponOrigin: [5, 46]
        }));
        this.origin('center');
        this.flip('x');
        this.animate('fly', -1);
        this.enemy();
        this.bind('Hit', (function (_this) {
            return function (data) {
                if (data.projectile.has('Bullet')) {
                    _this.shiftedX += 2;
                    Crafty.audio.play('hit', 1, .5);
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
        var healthPerc;
        healthPerc = this.health / this.maxHealth;
        if (healthPerc < .01) {
            this.pauseAnimation();
            return this.sprite(8, 6);
        } else {
            if (!this.isPlaying('fly')) {
                return this.animate('fly', -1);
            }
        }
    },
    updateMovementVisuals: function (rotation, dx, dy, dt) {
        this.vx = dx * (1000 / dt);
        return this.vy = dy * (1000 / dt);
    }
});