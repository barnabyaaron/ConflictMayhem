var Game,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

Game = this.Game;

Game.Scripts || (Game.Scripts = {});

Game.Scripts.SunSet = (function(superClass) {
    extend(SunSet, superClass);

    function SunSet() {
        return SunSet.__super__.constructor.apply(this, arguments);
    }

    SunSet.prototype.spawn = function(options) {
        var sun;
        sun = Crafty('Sun');
        if (sun.length > 0) {
            return sun.attr({
                x: sun.x + Crafty.viewport.x,
                y: sun.y + Crafty.viewport.y
            });
        } else {
            return Crafty.e('Sun, ColorFade, KeepAlive').sun({
                x: 620,
                y: 340,
                defaultSpeed: 2
            });
        }
    };

    SunSet.prototype.execute = function() {
        return this.sequence(this.moveTo({
            x: 320,
            y: 100,
            speed: 2000
        }), this.backgroundColorFade({
            duration: 1
        }, '#8080FF'), this.parallel(this.movePath([[220, 120], [120, 320], [20, 420]], {
            rotate: false
        }), this.colorFade({
            duration: 300000
        }, '#DDDD80', '#DDDD00', '#DD8000'), this.sequence(this.wait(150000), this.backgroundColorFade({
            duration: 150000
        }, '#8080FF', '#602020'))));
    };

    return SunSet;

})(Game.EntityScript);
