var Game,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

Game = this.Game;

Game.Scripts || (Game.Scripts = {});

Game.Scripts.PresentationSunRise = (function(superClass) {
    extend(PresentationSunRise, superClass);

    function PresentationSunRise() {
        return PresentationSunRise.__super__.constructor.apply(this, arguments);
    }

    PresentationSunRise.prototype.spawn = function(options) {
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
                x: (Crafty.viewport.width * .97) - Crafty.viewport.x,
                y: (Crafty.viewport.height * .74) - Crafty.viewport.y,
                defaultSpeed: (ref = options.speed) != null ? ref : 1
            });
        } else {
            return Crafty.e('Sun, KeepAlive').sun({
                defaultSpeed: (ref1 = options.speed) != null ? ref1 : 1,
                x: Crafty.viewport.width * .97,
                y: Crafty.viewport.height * .74
            });
        }
    };

    PresentationSunRise.prototype.execute = function() {
        var colorDuration, preColor, ref, speed;
        speed = (ref = this.options.speed) != null ? ref : 1;
        preColor = 40000 / speed;
        colorDuration = 500000 / speed;
        return this.sequence(this.setLocation({
            x: .97,
            y: .74
        }), this.wait(15000 - this.options.skipTo), this.backgroundColorFade({
            duration: preColor,
            skip: this.options.skipTo - 15000
        }, ['#000000', '#222c50'], ['#000000', '#222c50']), this.parallel(this.sequence(this.backgroundColorFade({
            duration: colorDuration,
            skip: this.options.skipTo - preColor - 15000
        }, ['#222c50', '#7a86a2', '#5dade9'], ['#222c50', '#7a86a2', '#5dade9'])), this.sequence(this.movePath([[.75, .31], [.5, .11]], {
            rotate: false,
            skip: this.options.skipTo - preColor - 15000
        }))), this.setLocation({
            x: .5,
            y: .11
        }));
    };

    return PresentationSunRise;

})(Game.EntityScript);
