Crafty.c('Frank', {
    init: function () {
        return this.requires('Enemy, frank, SpriteAnimation');
    },
    spawn: function(attr) {
        var defaultHealth, ref;
        if (attr == null) {
            attr = {};
        }

        defaultHealth = 360000;
        this.attr(_.defaults(attr, {
            health: defaultHealth,
            maxHealth: (ref = attr.health) != null ? ref : defaultHealth,
            z: -1
        }));
        this.origin('center');
        this.collision([10, 141, 50, 75, 100, 5, 150, 75, 190, 141, 100, 279]);
        this.reel('hit', 200, [[3, 0], [0, 0]]);
        this.reel('smile', 2000, [[2, 0], [0, 0]]);
        this.reel('shoot', 200, [[1, 0], [0, 0]]);
        this.reel('die', 4000, 4, 0, 5);
        this.enemy();

        this.healthBar = Crafty.e('BossBar').render('Frank', {
            current: this.health,
            max: this.maxHealth
        });

        this.updatedHealth();
        this.bind('Hit', (function (_this) {
            return function (data) {
                if (data.projectile.has('Bullet')) {
                    _this.shiftedX += 1;

                    if (!Crafty.audio.isPlaying('frankHit') && !Crafty.audio.isPlaying('frankHit2')) {
                        var d = Math.random();
                        if (d < .3 && d > .02) {
                            this.animate('hit');
                            Crafty.audio.play('frankHit');
                        } else if (d < .02) {
                            this.animate('hit');
                            Crafty.audio.play('frankHit2');
                        }
                    }

                    return Crafty.e('Blast, LaserHit').explode({
                        x: data.projectile.x,
                        y: data.projectile.y,
                        z: _this.z + 2,
                        radius: 4,
                        duration: 50
                    });
                }
            };
        })(this));
        return this;
    },
    healthBelow: function (perc) {
        return (this.health / this.maxHealth) < perc;
    },
    updatedHealth: function () {
        if (this.health <= 0) {
            this.health = 0; // Force health to 0
            this.healthBar.updateBar(0);
            this.healthBar.removeBar();
        } else {
            return this.healthBar = this.healthBar.updateBar(this.health);
        }
    },
    updateMovementVisuals: function (rotation, dx, dy, dt) {
        this.vx = dx * (1000 / dt);
        return this.vy = dy * (1000 / dt);
    }
});
