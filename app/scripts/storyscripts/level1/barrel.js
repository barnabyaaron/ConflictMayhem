var Game,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

Game = this.Game;

Game.Scripts || (Game.Scripts = {});

Game.Scripts.IntroBarrel = (function(superClass) {
    extend(IntroBarrel, superClass);

    function IntroBarrel() {
        return IntroBarrel.__super__.constructor.apply(this, arguments);
    }

    IntroBarrel.prototype.spawn = function() {
        return Crafty.e('2D, WebGL, Tween, Color, Collision, Choreography, Hideable').color('#606000').attr({
            z: 3,
            w: 10,
            h: 15,
            defaultSpeed: 150
        }).onHit('PlayerControlledShip', function(c) {
            if (Game.paused) {
                return;
            }
            return this.trigger('Knock', c[0].obj);
        });
    };

    IntroBarrel.prototype.execute = function() {
        this.bindSequence('Knock', this.knockedOff);
        return this.sequence(
            this.pickTarget('BarrelLocation'),
            this.setLocation(
                this.targetLocation({
                    offsetY: -15
                })
            ),
            this.wait(20000)
        );
    };

    IntroBarrel.prototype.knockedOff = function(player) {
        player.trigger('BonusPoints', {
            points: 25,
            location: this.location()
        });
        return this.parallel(this.moveTo({
            y: 1.25
        }), this.rotate(90, 1500));
    };

    return IntroBarrel;

})(Game.EntityScript);
