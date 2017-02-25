Crafty.c('Tank', {
    init: function () {
        this.requires('Enemy, laserTank, Delay');
        return this.crop(6, 5, 179, 103);
    },
    tank: function (attr) {
        var defaultHealth, laserLength, ref;
        if (attr == null) {
            attr = {};
        }
        defaultHealth = 2750;
        this.attr(_.defaults(attr, {
            w: 179,
            h: 103,
            health: defaultHealth,
            maxHealth: (ref = attr.health) != null ? ref : defaultHealth,
            aimSpeed: 45
        }));
        this.barrel = Crafty.e('2D, WebGL, laserTankBarrel, TweenPromise');
        this.barrel.crop(5, 4, 109, 38);
        this.barrel.attr({
            x: this.x + 54,
            y: this.y,
            z: this.z - 1,
            w: 109,
            h: 38
        });
        this.barrel.origin(this.barrel.w - 32, 32);
        this.charge = Crafty.e('2D, Color, WebGL, TweenPromise');
        this.charge.color('#F0F');
        this.charge.attr({
            x: this.barrel.x - 10,
            y: this.barrel.y + 5,
            w: 10,
            h: 28,
            alpha: 0
        });
        this.charge.origin(this.charge.w - 32, 32);
        this.laser = Crafty.e('2D, Color, WebGL, TweenPromise, Collision');
        this.laser.color('#F0F');
        laserLength = 1000;
        this.laser.attr({
            x: this.barrel.x - laserLength,
            y: this.barrel.y + 5,
            w: laserLength,
            h: 28,
            alpha: 0
        });
        this.laser.origin(this.laser.w - 10, 10);
        this.attach(this.barrel);
        this.barrel.attach(this.charge);
        this.barrel.attach(this.laser);
        this.enemy();
        return this;
    },
    updatedHealth: function () { },
    execute: function (action, args, level) {
        switch (action) {
            case 'searchAim':
                return this.aimAt(level.player('anyActive'));
            case 'shoot':
                return this.shoot();
        }
    },
    aimAt: function (player) {
        var angle, duration;
        angle = this.aimAngle(player);
        if (angle === null) {
            return WhenJS().delay(1000).then((function (_this) {
                return function () {
                    return _this.aimAt(player);
                };
            })(this));
        }
        if (angle < -80) {
            angle = (angle + 360) % 360;
        }
        duration = Math.abs(this.barrel.rotation - angle) * 1000 / this.aimSpeed;
        return this.barrel.tweenPromise({
            rotation: angle
        }, duration).then((function (_this) {
            return function () {
                var adjusted;
                adjusted = Math.abs(_this.aimAngle(player) - _this.barrel.rotation);
                if (adjusted > 10) {
                    return _this.aimAt(player);
                }
            };
        })(this));
    },
    aimAngle: function (player) {
        var b, t, target;
        target = player.ship();
        if (target === null) {
            return null;
        }
        b = [this.barrel.x + this.barrel._origin.x, this.barrel.y + this.barrel._origin.y];
        t = [target.x + (target.w / 2), target.y + (target.h / 2)];
        return Math.atan2(b[1] - t[1], b[0] - t[0]) * 180 / Math.PI;
    },
    shoot: function () {
        var chargeTime, fireTime;
        chargeTime = 500;
        fireTime = 100;
        return this.charge.tweenPromise({
            alpha: 1
        }, chargeTime).then((function (_this) {
            return function () {
                _this.charge.attr({
                    alpha: 0
                });
                _this.laser.addComponent('Hostile');
                _this.laser.attr({
                    alpha: 1
                });
                return WhenJS().delay(fireTime).then(function () {
                    _this.laser.removeComponent('Hostile');
                    return _this.laser.attr({
                        alpha: 0
                    });
                });
            };
        })(this));
    }
});