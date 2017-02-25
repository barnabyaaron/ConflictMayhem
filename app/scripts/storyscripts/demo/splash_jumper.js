var Game,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

Game = this.Game;

Game.Scripts || (Game.Scripts = {});

Game.Scripts.SplashJumper = (function(superClass) {
    extend(SplashJumper, superClass);

    function SplashJumper() {
        return SplashJumper.__super__.constructor.apply(this, arguments);
    }

    SplashJumper.prototype.spawn = function() {
        return Crafty.e('Drone').drone({
            health: 200,
            x: 680,
            y: 200,
            defaultSpeed: 300
        });
    };

    SplashJumper.prototype.execute = function() {
        this.bindSequence('Destroyed', this.onKilled);
        return this.sequence(this.moveTo({
            x: 500
        }), this.wait(500), this.repeat(this.sequence(this.moveTo({
            y: 600
        }), this.moveTo({
            y: 50
        }))));
    };

    SplashJumper.prototype.onKilled = function() {
        return this.explosion(this.location());
    };

    return SplashJumper;

})(Game.EntityScript);
