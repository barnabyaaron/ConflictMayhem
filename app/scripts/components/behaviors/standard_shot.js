Crafty.c('StandardShot', {
    remove: function() {
        return this.unbind('GameLoop', this._checkForShot);
    },
    standardShot: function (options) {
        this.shootConfig = _.defaults(options, {
            targetType: 'PlayerControlledShip',
            amount: 1,
            cooldown: 200,
            aim: 0,
            angle: 0,
            angleDeviation: 0,
            chance: 1
        });
        return this.bind('GameLoop', this._checkForShot);
    },
    _checkForShot: function (fd) {
        var aimAngle, angle, self;

        if (this.lastShotAt != null) {
            this.lastShotAt += fd.dt;
            if (this.lastShotAt < this.shootConfig.cooldown) {
                return;
            }
        }

        if (Math.random() <= this.shootConfig.chance) {
            self = this;
            aimAngle = 0;
            Crafty(this.shootConfig.targetType).each(function () {
                aimAngle = Math.atan2(self.y - this.y, self.x - this.x);
                return aimAngle *= 180 / Math.PI;
            });
            angle = aimAngle;
            if (angle > (this.shootConfig.angle + this.shootConfig.aim)) {
                angle = this.shootConfig.angle + this.shootConfig.aim;
            } else if (angle < (this.shootConfig.angle - this.shootConfig.aim)) {
                angle = this.shootConfig.angle - this.shootConfig.aim;
            }
            angle = angle - (Math.floor(this.shootConfig.angleDeviation / 2)) + (Math.random() * this.shootConfig.angleDeviation);
            angle = (angle + 360) % 360;

            return this._shoot(angle);
        }
    },
    _shoot: function (angle) {
        var ref, ref1, ref2, wo;
        if (this.hidden && !this.shootConfig.shootWhenHidden) {
            return;
        }
        this.lastShotAt = 0;
        wo = (ref = this.weaponOrigin) != null ? ref : [0, 0];
        wo[0] *= (ref1 = this.scale) != null ? ref1 : 1;
        wo[1] *= (ref2 = this.scale) != null ? ref2 : 1;
        return this.shootConfig.projectile(wo[0] + this.x, wo[1] + this.y, angle);
    }
});
