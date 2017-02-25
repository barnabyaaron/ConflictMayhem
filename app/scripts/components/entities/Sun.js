Crafty.c('Sun', {
    init: function () {
        var bigGlare, blueGlare, directGlare, redGlare;
        this.requires('2D, WebGL, Collision, Choreography, ViewportFixed, sun');
        this.crop(0, 0, 64, 64);
        this.attr({
            w: 20,
            h: 20,
            z: -1000
        });
        this.origin('center');
        this.glare = [];
        directGlare = Crafty.e('2D, WebGL, Glare, directGlare').crop(0, 0, 175, 175).attr({
            w: this.w * 3,
            h: this.h * 3,
            z: 90,
            alpha: 0.8,
            originalAlpha: 0.8
        }).origin('center');
        this.attach(directGlare);
        this.glare.push(directGlare);
        blueGlare = Crafty.e('2D, WebGL, Glare, bigGlare, Horizon').crop(0, 0, 200, 200).attr({
            mirrored: true,
            w: 80,
            h: 80,
            z: 91,
            res: 0.9,
            alpha: 0.4,
            originalAlpha: 0.4,
            blur: 2.0
        }).origin('center').saturationGradient(1.0, 1.0);
        this.attach(blueGlare);
        this.glare.push(blueGlare);
        redGlare = Crafty.e('2D, WebGL, Glare, bigGlare, ColorEffects').crop(0, 0, 200, 200).colorOverride('#fd6565').attr({
            mirrored: true,
            w: 10,
            h: 10,
            z: 92,
            res: 0.80,
            alpha: 0.6,
            originalAlpha: 0.6
        }).origin('center');
        this.attach(redGlare);
        this.glare.push(redGlare);
        bigGlare = Crafty.e('2D, WebGL, Glare, bigGlare').crop(0, 0, 200, 200).attr({
            mirrored: true,
            w: 200,
            h: 200,
            z: 93,
            alpha: 0.2,
            res: 1.1,
            originalAlpha: 0.2
        }).origin('center');
        this.attach(bigGlare);
        return this.glare.push(bigGlare);
    },
    sun: function (settings) {
        this.attr(settings);
        this.uniqueBind('GameLoop', this._updateGlare);
        return this;
    },
    remove: function () {
        return this.unbind('GameLoop', this._updateGlare);
    },
    _updateGlare: function () {
        var blur, cloudLightness, collisions, covered, dx, dy, e, h, hh, horizonDistance, hw, i, j, l, len, len1, maxCoverage, o, perc, px, py, ref, size, sunArea, w, xMax, xMin, yMax, yMin;
        covered = [0];
        sunArea = this.area();
        if (collisions = this.hit('SunBlock')) {
            for (i = 0, len = collisions.length; i < len; i++) {
                o = collisions[i];
                e = o.obj;
                if (o.type === 'SAT') {
                    covered.push(((o.overlap * -1) / 50) * sunArea);
                } else {
                    xMin = Math.max(this.x, e.x);
                    xMax = Math.min(this.x + this.w, e.x + e.w);
                    w = xMax - xMin;
                    yMin = Math.max(this.y, e.y);
                    yMax = Math.min(this.y + this.h, e.y + e.h);
                    h = yMax - yMin;
                    covered.push(w * h);
                }
            }
        }
        maxCoverage = Math.max.apply(Math, covered) * 1.7;
        perc = maxCoverage / sunArea;
        if (maxCoverage > sunArea) {
            perc = 1;
        }
        hw = Crafty.viewport.width / 2;
        hh = Crafty.viewport.height / 2;
        dx = this.x + (this.w / 2) - ((Crafty.viewport.x * -1) + hw);
        dy = this.y + (this.h / 2) - ((Crafty.viewport.y * -1) + hh);
        px = dx / hw;
        py = dy / hh;
        ref = this.glare;
        for (j = 0, len1 = ref.length; j < len1; j++) {
            e = ref[j];
            e.attr({
                alpha: e.originalAlpha * (1 - perc)
            });
            if (e.mirrored) {
                e.attr({
                    x: this.x + (this.w / 2) - (e.w / 2) - (dx * 2 * e.res),
                    y: this.y + (this.h / 2) - (e.h / 2) - (dy * 2 * e.res)
                });
            } else {
                e.attr({
                    w: this.w * 5,
                    h: this.h * 5,
                    x: this.x - (2 * this.w),
                    y: this.y - (2 * this.h)
                });
            }
        }
        horizonDistance = (Crafty.viewport.height - 225) - Crafty.viewport._y - this.y;
        size = 65.0 - (30.0 * (Math.min(Math.max(horizonDistance, 0), 200.0) / 200.0));
        blur = 2 - (2.0 * (Math.min(Math.max(horizonDistance, 0), 200.0) / 200.0));
        this.attr({
            blur: blur
        });
        this.w = size;
        this.h = size;
        l = .4 + (Math.max(horizonDistance - 150, 0) / 200);
        cloudLightness = Math.min(Math.max(.4, l), 1.0);
        Crafty('cloud').each(function () {
            return this.attr({
                lightness: cloudLightness
            });
        });
        return Crafty('GoldenStripe').each(function () {
            if (horizonDistance <= 0) {
                return this.attr({
                    alpha: 1.0 - (Math.min(Math.abs(horizonDistance), 20) / 20),
                    h: 3
                });
            } else if ((0 < horizonDistance && horizonDistance < 1)) {
                return this.attr({
                    alpha: 1.0,
                    h: 3
                });
            } else if (horizonDistance < 60) {
                return this.attr({
                    alpha: 1.0,
                    h: Math.abs(Math.max(Math.min(horizonDistance / 2.0, 40.0), 3))
                });
            } else if (horizonDistance < 120) {
                return this.attr({
                    alpha: 1.0 - (Math.min(Math.abs(horizonDistance - 60), 60.0) / 60.0),
                    h: Math.abs(Math.max(Math.min(horizonDistance / 2.0, 40.0), 1))
                });
            } else {
                return this.attr({
                    alpha: 0,
                    h: 10.0
                });
            }
        });
    }
});