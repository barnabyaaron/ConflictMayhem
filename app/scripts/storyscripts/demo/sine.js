var Game,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

Game = this.Game;

Game.Scripts || (Game.Scripts = {});

Game.Scripts.Sine = (function(superClass) {
    extend(Sine, superClass);

    function Sine() {
        return Sine.__super__.constructor.apply(this, arguments);
    }

    Sine.prototype.spawn = function() {
        return Crafty.e('OldDrone').drone({
            health: 200,
            x: Crafty.viewport.width + 40,
            y: 200,
            defaultSpeed: 250
        });
    };

    Sine.prototype.execute = function() {
        return this.movePath([[.78, .315], [.625, .468], [.468, .625], [.312, .468], [.156, .315], [0, .468], [-.3, .625]], {
            rotate: false
        });
    };

    return Sine;

})(Game.EntityScript);
