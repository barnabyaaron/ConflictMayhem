var Game,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

Game = this.Game;

Game.Scripts || (Game.Scripts = {});

Game.Scripts.TrainAssaulter = (function(superClass) {
    extend(TrainAssaulter, superClass);

    function TrainAssaulter() {
        return TrainAssaulter.__super__.constructor.apply(this, arguments);
    }

    TrainAssaulter.prototype.assets = function() {
        return this.loadAssets('playerShip');
    };

    TrainAssaulter.prototype.spawn = function(options) {
        var dir, p, ref, ref1, startY;
        dir = (ref = options.from) != null ? ref : 'top';
        switch (dir) {
            case 'top':
                startY = .3;
                this.endY = .6;
                break;
            case 'middle':
                startY = .5;
                this.endY = .5;
                break;
            default:
                startY = .6;
                this.endY = .3;
        }
        p = Crafty.e('PlayerClone').attr({
            x: Crafty.viewport.width + 40,
            y: startY * Crafty.viewport.height,
            defaultSpeed: (ref1 = options.speed) != null ? ref1 : 50,
            health: 500
        }).playerClone();
        p.addComponent('BurstShot').burstShot({
            projectile: (function(_this) {
                return function(x, y, angle) {
                    var projectile;
                    projectile = Crafty.e('Projectile, Color, Enemy, TrainBullet').attr({
                        w: 16,
                        h: 4,
                        speed: 550,
                        damage: 1
                    }).color('#FFFF00');
                    return projectile.shoot(x, y, angle);
                };
            })(this)
        });
        return p;
    };

    TrainAssaulter.prototype.execute = function() {
        this.bindSequence('Destroyed', this.onKilled);
        return this.sequence(this.movePath([[.7, .5], [1.1, this.endY]], {
            rotate: false
        }));
    };

    TrainAssaulter.prototype.onKilled = function() {
        return this.bigExplosion();
    };

    return TrainAssaulter;

})(Game.EntityScript);
