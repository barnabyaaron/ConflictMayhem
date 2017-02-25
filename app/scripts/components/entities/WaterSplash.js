Crafty.c('WaterSplash', {
    init: function () {
        this.requires('2D,Particles,Delay');
        this.explosionMode = window.Game.explosionMode;
        if (this.explosionMode === 'block') {
            return this.requires('WebGL, Color, Tween');
        }
    },
    waterSplash: function (attr) {
        var cleanupDelay, options, radius;
        options = {
            maxParticles: 2 * attr.size,
            size: attr.size / 1.5,
            sizeRandom: 4,
            speed: attr.size / 20,
            speedRandom: 0.2,
            lifeSpan: attr.size / 3,
            lifeSpanRandom: 7,
            angle: 350,
            angleRandom: 20,
            startColour: [40, 40, 170, 1],
            startColourRandom: [0, 0, 0, 0],
            endColour: [205, 205, 205, 0.1],
            endColourRandom: [30, 30, 30, 0.1],
            sharpness: 10,
            sharpnessRandom: 5,
            spread: attr.size / 3,
            duration: 900 / Crafty.timer.FPS(),
            fastMode: false,
            gravity: {
                x: 0,
                y: 0.25
            },
            jitter: 0
        };
        cleanupDelay = (options.lifeSpan + options.lifeSpanRandom) * Crafty.timer.FPS();
        if (this.explosionMode === 'particles') {
            options.fastMode = true;
        }
        if (this.explosionMode !== 'block') {
            this.attr({
                x: attr.x,
                y: attr.y
            }).particles(options).bind('ParticleEnd', function () {
                return this.delay((function () {
                    return this.destroy();
                }), cleanupDelay);
            });
        } else {
            radius = 60;
            this.attr({
                x: attr.x,
                y: attr.y,
                w: 30,
                h: 0
            });
            this.color('#FFFFFF');
            this.tween({
                y: this.y - radius,
                h: this.h + radius,
                alpha: 0.2
            }, 500);
            this.bind('TweenEnd', function () {
                return this.destroy();
            });
        }
        return this;
    }
});