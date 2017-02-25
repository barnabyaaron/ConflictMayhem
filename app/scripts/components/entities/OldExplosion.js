Crafty.c('OldExplosion', {
    init: function () {
        this.requires('2D,Tween,Delay');
        this.explosionMode = window.Game.explosionMode;
        if (this.explosionMode === 'block') {
            return this.requires('WebGL,Color');
        }
    },
    explode: function (attr) {
        var cleanupDelay, duration, options, radius, ref, ref1;
        radius = (ref = attr.radius) != null ? ref : 20;
        duration = ((ref1 = attr.duration) != null ? ref1 : 160) / 1000;
        this.attr(attr);
        options = {
            maxParticles: 13 * attr.radius,
            size: attr.radius * 2,
            sizeRandom: 8,
            speed: attr.radius / 13,
            speedRandom: 0.5,
            lifeSpan: 19,
            lifeSpanRandom: 7,
            angle: 0,
            angleRandom: 360,
            startColour: [235, 135, 5, 1],
            startColourRandom: [28, 150, 45, 0.2],
            endColour: [135, 135, 135, 0],
            endColourRandom: [60, 60, 60, 0.1],
            sharpness: 10,
            sharpnessRandom: 10,
            spread: attr.radius / 2,
            duration: duration * Crafty.timer.FPS(),
            fastMode: false,
            gravity: {
                x: 0,
                y: 0
            },
            jitter: 0
        };
        this.attr({
            w: 1,
            h: 1
        });
        if (this.explosionMode === 'block') {
            this.color('#FF0000');
        }
        this.tween({
            x: this.x - radius,
            y: this.y - radius,
            w: this.w + (radius * 2),
            h: this.h + (radius * 2),
            alpha: 0.2
        }, 500);
        this.bind('TweenEnd', function () {
            return this.destroy();
        });
        if (this.explosionMode === 'particles') {
            options.fastMode = true;
            options.maxParticles = 3 * attr.radius;
            options.size = attr.radius;
        }
        if (this.explosionMode === 'particles' || this.explosionMode === null) {
            cleanupDelay = (options.lifeSpan + options.lifeSpanRandom) * Crafty.timer.FPS();
            Crafty.e("2D,Particles,Delay").attr({
                x: this.x - (attr.radius / 2),
                y: this.y - (attr.radius / 2)
            }).particles(options).bind('ParticleEnd', function () {
                return this.delay((function () {
                    return this.destroy();
                }), cleanupDelay);
            });
        }
        return this;
    }
});