var Game,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

Game = this.Game;

Game.Scripts || (Game.Scripts = {});

Game.Scripts.HeliAttack = (function(superClass) {
    extend(HeliAttack, superClass);

    function HeliAttack() {
        return HeliAttack.__super__.constructor.apply(this, arguments);
    }

    HeliAttack.prototype.assets = function() {
        return this.loadAssets('helicopter');
    };

    HeliAttack.prototype.spawn = function(options) {
        var p, ref, ref1, ref2, ref3;
        this.dir = (ref = options.from) != null ? ref : 'top';
        this.ground = (ref1 = options.ground) != null ? ref1 : 660;
        this.corpseKeep = (ref2 = options.corpseKeep) != null ? ref2 : 10000;
        p = Crafty.e('Helicopter').attr({
            x: Crafty.viewport.width + 40,
            y: .6 * Crafty.viewport.height,
            defaultSpeed: (ref3 = options.speed) != null ? ref3 : 40,
            weaponOrigin: [0, 25]
        }).helicopter({
            pointsOnHit: 25,
            pointsOnDestroy: 200
        });
        p.addComponent('BurstShot').burstShot({
            burstCooldown: 2500,
            burstAmount: 7,
            angle: -15,
            angleDeviation: 10,
            aim: 45,
            cooldown: 50,
            projectile: (function(_this) {
                return function(x, y, angle) {
                    var projectile;
                    projectile = Crafty.e('Projectile, sphere1, Hostile').crop(6, 21, 18, 7).flip().attr({
                        w: 12,
                        h: 4,
                        speed: 350
                    });
                    return projectile.shoot(x, y, angle);
                };
            })(this)
        });
        return p;
    };

    HeliAttack.prototype.execute = function() {
        this.bindSequence('Destroyed', this.onKilled);
        return this["while"](this.flightPath(), this.sequence(this.fireRockets(), this.wait(5000)));
    };

    HeliAttack.prototype.flightPath = function() {
        if (this.dir === 'top') {
            return this.movePath([[.9, .4], [.7, .25], [.65, .2], [.4, .6], [.6, .7], [.8, .5], [.4, .8], [.2, .3], [-.2, .5]]);
        } else {
            return this.movePath([[.9, .6], [.7, .75], [.65, .8], [.4, .4], [.6, .3], [.8, .5], [.4, .2], [.2, .7], [-.2, .5]]);
        }
    };

    HeliAttack.prototype.onKilled = function() {
        return this.leaveAnimation(this.sequence(this.deathDecoy(), this.bigExplosion(), this["while"](this.moveTo({
            x: .6,
            y: this.ground,
            speed: 250,
            easing: 'easeInQuad',
            positionType: 'absoluteY'
        }), this.sequence(this.blast(this.location(), {
            radius: 10,
            duration: 480,
            z: -1,
            lightness: .2,
            alpha: .5
        }), this.blast(this.location({
            offsetX: 10,
            offsetY: 5
        }), {
            radius: 5,
            duration: 180,
            z: -1
        }), this.wait(100))), this.moveTo({
            x: .6,
            y: this.ground - 20,
            speed: 50,
            easing: 'easeInOutQuad',
            positionType: 'absoluteY'
        }), this.moveTo({
            x: .6,
            y: this.ground,
            speed: 50,
            easing: 'easeInOutQuad',
            positionType: 'absoluteY'
        }), this.bigExplosion(), (function(_this) {
            return function() {
                _this.entity.removeComponent('ViewportFixed');
                return _this.entity.attr({
                    lightness: .3
                });
            };
        })(this), this.wait(this.corpseKeep), this.endDecoy()));
    };

    HeliAttack.prototype.fireRockets = function(amount) {
        var script;
        script = Game.Scripts.Stage1BossRocket;
        return this.sequence(this.async(this.placeSquad(script, {
            options: {
                z: 5,
                offsetX: 0,
                offsetY: 50,
                scale: .75,
                health: 100,
                location: this.location()
            }
        })), this.async(this.placeSquad(script, {
            options: {
                z: -5,
                offsetX: 0,
                offsetY: -50,
                scale: .75,
                health: 100,
                location: this.location()
            }
        })), this.wait(500));
    };

    return HeliAttack;

})(Game.EntityScript);
