var Game,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

Game = this.Game;

Game.Scripts || (Game.Scripts = {});

Game.Scripts.PresentationSunSet = (function(superClass) {
    extend(PresentationSunSet, superClass);

    function PresentationSunSet() {
        return PresentationSunSet.__super__.constructor.apply(this, arguments);
    }

    PresentationSunSet.prototype.spawn = function(options) {
        var ref, ref1, sky, sun;
        sky = Crafty('Sky').get(0) || Crafty.e('2D, WebGL, Gradient, Sky, HUD, ColorFade').attr({
                w: Crafty.viewport.width,
                h: Crafty.viewport.height * .7
            }).positionHud({
                x: 0,
                y: 0,
                z: -1000
            });
        sun = Crafty('Sun');
        if (sun.length > 0) {
            return sun.attr({
                x: (Crafty.viewport.width * .5) - Crafty.viewport.x,
                y: (Crafty.viewport.height * .11) - Crafty.viewport.y,
                defaultSpeed: (ref = options.speed) != null ? ref : 1
            });
        } else {
            return Crafty.e('Sun, KeepAlive').sun({
                x: Crafty.viewport.width * .5,
                y: Crafty.viewport.height * .11,
                defaultSpeed: (ref1 = options.speed) != null ? ref1 : 1
            });
        }
    };

    PresentationSunSet.prototype.execute = function() {
        var colorDuration, preColor, ref, speed;
        speed = (ref = this.options.speed) != null ? ref : 1;
        preColor = 40000 / speed;
        colorDuration = 400000 / speed;
        return this.sequence(this.setLocation({
            x: .5,
            y: .11
        }), this.parallel(this.backgroundColorFade({
            duration: colorDuration,
            skip: this.options.skipTo - preColor
        }, ['#5dade9', '#7a86a2', '#222c50'], ['#5dade9', '#7a86a2', '#222c50']), this.movePath([[.35, .8]], {
            rotate: false,
            skip: this.options.skipTo - preColor
        })), this.backgroundColorFade({
            duration: preColor,
            skip: this.options.skipTo
        }, ['#222c50', '#000000'], ['#222c50', '#000000']), this.setLocation({
            x: .38,
            y: .8
        }));
    };

    return PresentationSunSet;

})(Game.EntityScript);
