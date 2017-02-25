var Game,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

Game = this.Game;

Game.Scripts || (Game.Scripts = {});

Game.Scripts.Slider = (function(superClass) {
    extend(Slider, superClass);

    function Slider() {
        return Slider.__super__.constructor.apply(this, arguments);
    }

    Slider.prototype.spawn = function(options) {
        var target;
        target = options.grid.getLocation();
        return Crafty.e('OldDrone').drone({
            health: 200,
            x: target.x * Crafty.viewport.width,
            y: target.y * Crafty.viewport.height,
            defaultSpeed: 100
        });
    };

    Slider.prototype.execute = function() {
        return this.moveTo({
            x: -30
        });
    };

    return Slider;

})(Game.EntityScript);
