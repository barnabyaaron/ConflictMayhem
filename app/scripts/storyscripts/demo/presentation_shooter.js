var Game,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

Game = this.Game;

Game.Scripts || (Game.Scripts = {});

Game.Scripts.PresentationShooter = (function(superClass) {
    extend(PresentationShooter, superClass);

    function PresentationShooter() {
        return PresentationShooter.__super__.constructor.apply(this, arguments);
    }

    PresentationShooter.prototype.spawn = function(options) {
        var d, ref;
        d = Crafty.e('OldDrone').drone({
            x: Crafty.viewport.width + 40,
            y: Crafty.viewport.height * .71,
            defaultSpeed: (ref = options.speed) != null ? ref : 200
        });
        if (options.shootOnSight) {
            d.addComponent('ShootOnSight').shootOnSight({
                cooldown: 2000,
                sightAngle: 8,
                projectile: (function(_this) {
                    return function(x, y, angle) {
                        var projectile;
                        projectile = Crafty.e('Projectile, Color, Enemy').attr({
                            w: 6,
                            h: 6,
                            speed: 350
                        }).color('#FFFF00');
                        return projectile.shoot(x, y, angle);
                    };
                })(this)
            });
        }
        return d;
    };

    PresentationShooter.prototype.execute = function() {
        this.bindSequence('Destroyed', this.onKilled);
        return this.movePath([[.5, .625], [.2, .5], [.53, .21], [.90, .54], [-20, .625]]);
    };

    PresentationShooter.prototype.onKilled = function() {
        return this.oldExplosion(this.location({
            offsetX: 20,
            offsetY: 20
        }));
    };

    return PresentationShooter;

})(Game.EntityScript);
