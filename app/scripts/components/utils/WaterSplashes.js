Crafty.c('WaterSplashes', {
    init: function () {
        this.bind('GameLoop', this._waterSplashes);
        this.cooldown = 0;
        if (this.defaultWaterCooldown == null) {
            this.defaultWaterCooldown = 70;
        }
        this.detectionOffset = 0;
        return this.minOffset = -10;
    },
    remove: function () {
        return this.unbind('GameLoop', this._waterSplashes);
    },
    setSealevel: function (sealevel1) {
        this.sealevel = sealevel1;
    },
    setDetectionOffset: function (detectionOffset, minOffset) {
        this.detectionOffset = detectionOffset;
        this.minOffset = minOffset != null ? minOffset : -10;
    },
    _waterSplashes: function (fd) {
        var coverage, d, i, j, k, parts, pos, r, ref, ref1, ref2, ref3, sealevel, speed, upwards;
        if (window.Game.explosionMode != null) {
            return;
        }
        this.cooldown -= fd.dt;
        if ((this.y + this.h + this.detectionOffset > this.sealevel) && (this.y < this.sealevel) && (this.cooldown <= 0)) {
            speed = (ref = this.waterSplashSpeed) != null ? ref : this.defaultSpeed;
            this.cooldown = this.defaultWaterCooldown;
            upwards = 1;
            if (this._lastWaterY !== this.y) {
                upwards = (speed - 20) / 30;
            }
            upwards *= (ref1 = this.scale) != null ? ref1 : 1;
            coverage = 45;
            parts = this.w / coverage;
            r = 0;
            for (i = j = 0, ref2 = parts; 0 <= ref2 ? j < ref2 : j > ref2; i = 0 <= ref2 ? ++j : --j) {
                for (d = k = 0, ref3 = Math.min(upwards, 3) ; 0 <= ref3 ? k < ref3 : k > ref3; d = 0 <= ref3 ? ++k : --k) {
                    r += 1;
                    pos = Math.random();
                    sealevel = this.sealevel;
                    Crafty.e('Blast').colorOverride('#FFFFFF').explode({
                        upwards: r % 2 === 0 ? upwards : 0,
                        x: this.x + (i * coverage) + (pos * coverage),
                        y: this.sealevel + this.minOffset,
                        z: this.z + 3,
                        duration: 210 + (Math.random() * 100),
                        radius: 5,
                        topDesaturation: this.topDesaturation,
                        bottomDesaturation: this.bottomDesaturation,
                        alpha: .6,
                        gravity: 0.2
                    }, function () {
                        return {
                            gravity: this.gravity + 0.3,
                            alpha: Math.max(0.1, this.alpha - Math.random() * .03),
                            y: Math.min(this.y - (Math.random() * this.upwards) + this.gravity, sealevel - 10),
                            x: this.x + ((-.5 + pos) * Math.random() * 4.0),
                            w: this.w + .3,
                            h: this.h + .3
                        };
                    });
                }
            }
        }
        return this._lastWaterY = this.y;
    }
});