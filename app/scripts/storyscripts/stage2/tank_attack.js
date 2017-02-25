var Game,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

Game = this.Game;

Game.Scripts || (Game.Scripts = {});

Game.Scripts.TankAttack = (function(superClass) {
    extend(TankAttack, superClass);

    function TankAttack() {
        return TankAttack.__super__.constructor.apply(this, arguments);
    }

    TankAttack.prototype.spawn = function(options) {
        var p;
        return p = Crafty.e('Tank').attr({
            x: Crafty.viewport.width + 40,
            y: 400,
            defaultSpeed: 30,
            weaponOrigin: [30, 0]
        }).tank();
    };

    TankAttack.prototype.execute = function() {
        this.bindSequence('Destroyed', this.onKilled);
        return this.sequence(this.moveTo({
            x: .2,
            speed: 120
        }), this.action('searchAim'), this["while"](this.sequence(this.wait(200), this.moveTo({
            x: .8
        }), this.wait(4000), this.moveTo({
            x: -.2
        })), this.sequence(this.action('shoot'), this.wait(1000), this.action('searchAim'))));
    };

    TankAttack.prototype.onKilled = function() {
        return this.leaveAnimation(this.sequence(this.deathDecoy(), this.bigExplosion(), this.wait(200), this.bigExplosion(), (function(_this) {
            return function() {
                _this.entity.removeComponent('ViewportFixed');
                _this.entity.attr({
                    lightness: .3
                });
                return _this.entity.barrel.attr({
                    lightness: .3
                });
            };
        })(this), this.wait(10000), this.endDecoy()));
    };

    return TankAttack;

})(Game.EntityScript);
