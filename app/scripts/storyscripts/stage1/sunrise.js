var Game,
  extend = function (child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Game = this.Game;

Game.Scripts || (Game.Scripts = {});

Game.Scripts.SunRise = (function (superClass) {
    extend(SunRise, superClass);

    function SunRise() {
        return SunRise.__super__.constructor.apply(this, arguments);
    }

    SunRise.prototype.spawn = function (options) {
        var ref, ref1, sky, sun;
        sky = Crafty('Sky').get(0) || Crafty.e('2D, StaticBackground, Gradient, Sky, ColorFade').attr({
            w: Crafty.viewport.width,
            h: Crafty.viewport.height * .7
        }).attr({
            x: 0,
            y: 0,
            z: 0
        });
        sun = Crafty('Sun');
        if (sun.length > 0) {
            return sun.attr({
                x: (Crafty.viewport.width * .97) - Crafty.viewport.x,
                y: (Crafty.viewport.height * .74) - Crafty.viewport.y,
                defaultSpeed: (ref = options.speed) != null ? ref : 1
            });
        } else {
            return Crafty.e('Sun, KeepAlive').sun({
                x: Crafty.viewport.width * .97,
                y: Crafty.viewport.height * .74,
                defaultSpeed: (ref1 = options.speed) != null ? ref1 : 1
            });
        }
    };

    SunRise.prototype.execute = function () {
        var base, colorDuration, preColor, ref, speed;
        speed = (ref = this.options.speed) != null ? ref : 1;
        if ((base = this.options).skipTo == null) {
            base.skipTo = 0;
        }
        preColor = 40000 / speed;
        colorDuration = 600000 / speed;
        return this.sequence(this.setLocation({
            x: .97,
            y: .74
        }), this.backgroundColorFade({
            duration: preColor,
            skip: this.options.skipTo
        }, ['#000020', '#000020', '#ca4331'], ['#000000', '#222c50']), this.parallel(this.backgroundColorFade({
            duration: colorDuration,
            skip: this.options.skipTo - preColor
        }, ['#ca4331', '#fcaf01', '#f7e459', '#d6d5d5', '#d6d5d5'], ['#222c50', '#7a86a2', '#366eab']), this.movePath([[.75, .31], [.5, .11]], {
            rotate: false,
            skip: this.options.skipTo - preColor
        })));
    };

    return SunRise;

})(Game.EntityScript);