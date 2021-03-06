var Game,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

Game = this.Game;

Game.Scripts || (Game.Scripts = {});

Game.Scripts.PlayerClone = (function(superClass) {
    extend(PlayerClone, superClass);

    function PlayerClone() {
        return PlayerClone.__super__.constructor.apply(this, arguments);
    }

    PlayerClone.prototype.assets = function() {
        return this.loadAssets('playerShip');
    };

    PlayerClone.prototype.spawn = function(options) {
        var p, ref, ref1;
        this.dir = (ref = options.from) != null ? ref : 'top';
        p = Crafty.e('PlayerClone').attr({
            x: Crafty.viewport.width + 40,
            y: .1 * Crafty.viewport.height,
            defaultSpeed: (ref1 = options.speed) != null ? ref1 : 280
        }).playerClone({
            pointsOnHit: 25,
            pointsOnDestroy: 125
        });
        p.addComponent('ShootOnSight').shootOnSight({
            cooldown: 150,
            sightAngle: 20,
            projectile: (function(_this) {
                return function(x, y, angle) {
                    var projectile;
                    projectile = Crafty.e('Sphere, Hostile, Projectile').attr({
                        w: 9,
                        h: 9,
                        speed: 600
                    }).blink();
                    return projectile.shoot(x, y, angle);
                };
            })(this)
        });
        return p;
    };

    PlayerClone.prototype.execute = function() {
        this.bindSequence('Destroyed', this.onKilled);
        return this.sequence(this["while"](this.flightPathTop(), this.sequence(this.dropBombs(), this.wait(300))), this.turnAround(), this["while"](this.flightPathBack(), this.sequence(this.dropBombs(), this.wait(300))), this.turnAround(), this["while"](this.flightPathTop(), this.sequence(this.dropBombs(), this.wait(300))));
    };

    PlayerClone.prototype.flightPathTop = function() {
        return this.moveTo({
            x: -.1,
            y: .2
        });
    };

    PlayerClone.prototype.flightPathBack = function() {
        return this.moveTo({
            x: 1.01,
            y: .1
        });
    };

    PlayerClone.prototype.onKilled = function() {
        return this.sequence(this.deathDecoy(), this.smallExplosion({
            offsetX: 20,
            offsetY: 30
        }), this.wait(50), this.smallExplosion({
            offsetX: 40,
            offsetY: 20
        }), this.wait(50), this.smallExplosion({
            offsetX: -50,
            offsetY: -10
        }), this.wait(20), this.endDecoy(), this.bigExplosion({
            damage: 0
        }));
    };

    PlayerClone.prototype.dropBombs = function() {
        return this.async(this.placeSquad(Game.Scripts.Stage1BossBombRaid, {
            options: {
                location: this.location(),
                armed: false,
                scale: .75
            }
        }));
    };

    PlayerClone.prototype.fireRockets = function(amount) {
        var script;
        script = Game.Scripts.Stage1BossAimedRocket;
        return this.sequence(this.async(this.placeSquad(script, {
            options: {
                z: 5,
                offsetX: 0,
                offsetY: 50,
                scale: .75,
                cooldown: 20,
                health: 100,
                location: this.location()
            }
        })), this.async(this.placeSquad(script, {
            options: {
                z: -5,
                offsetX: 0,
                offsetY: -50,
                cooldown: 20,
                scale: .75,
                health: 100,
                location: this.location()
            }
        })));
    };

    return PlayerClone;

})(Game.EntityScript);
