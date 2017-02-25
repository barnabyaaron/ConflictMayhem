Crafty.c('PlayerClone', {
    init: function () {
        return this.requires('Enemy, playerShip');
    },
    playerClone: function (attr) {
        var defaultHealth, ref;
        if (attr == null) {
            attr = {};
        }
        defaultHealth = 300;
        this.attr(_.defaults(attr, {
            h: 45,
            w: 71,
            health: defaultHealth,
            maxHealth: (ref = attr.health) != null ? ref : defaultHealth,
            weaponOrigin: [5, 30]
        }));
        this.origin('center');
        this.colorOverride('#808080', 'partial');
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
        var healthPerc, sprite;
        sprite = 0;
        healthPerc = this.health / this.maxHealth;
        if (healthPerc < .3) {
            sprite = 2;
        }
        return this.sprite(0, sprite);
    },
    updateMovementVisuals: function (rotation, dx, dy, dt) {
        this.vx = dx * (1000 / dt);
        return this.vy = dy * (1000 / dt);
    }
});