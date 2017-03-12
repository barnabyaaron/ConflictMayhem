var Game,
    extend = function (child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

Game = this.Game;

Game.Scripts || (Game.Scripts = {});

Game.Scripts.EnemyFighter = (function (superClass) {
    extend(EnemyFighter, superClass);

    function EnemyFighter() {
        return EnemyFighter.__super__.constructor.apply(this, arguments);
    }

    EnemyFighter.prototype.assets = function() {
        return this.loadAssets('enemy');
    };

    EnemyFighter.prototype.onKilled = function() {
        return this.sequence(
            this.deathDecoy(),
            this.smallExplosion({
                juice: this.juice,
                offsetX: 20,
                offsetY: 20
            }),
            this.endDecoy()
        );
    };

    return EnemyFighter;
})(Game.EntityScript);

Game.Scripts.FlyByFighters = (function (superClass) {
    extend(FlyByFighters, superClass);

    function FlyByFighters() {
        return FlyByFighters.__super__.constructor.apply(this, arguments);
    }

    FlyByFighters.prototype.spawn = function (options) {
        var d, ref;
        d = Crafty.e('Fighter').fighter('enemy', {
            x: Crafty.viewport.width + 40,
            y: Crafty.viewport.height / 2,
            defaultSpeed: (ref = options.speed) != null ? ref : 200,
            juice: options.juice
        });
        this.juice = options.juice;
        if (options.shooter) {
            d.addComponent('StandardShot').standardShot({
                cooldown: 3000,
                chance: .2,
                projectile: (function (_this) {
                    return function (x, y, angle) {
                        var projectile;
                        projectile = Crafty.e('Sphere, Hostile, Projectile').blink();
                        return projectile.shoot(x, y, angle);
                    };
                })(this)
            });
        }
        this.options = options;
        return d;
    };

    FlyByFighters.prototype.execute = function () {
        this.bindSequence('Destroyed', this.onKilled);

        if (this.options.path) {
            if (this.options.path === 'top') {
                return this.movePath([
                    [.8, .11], [.6, .4], [.4, .1], [.1, .45], [-100, .11]
                ], { rotate: false });
            } else {
                return this.movePath([
                    [.8, .71], [.6, .6], [.4, .7], [.1, .55], [-100, .71]
                ], { rotate: false });
            }
        } else {
            if (Math.random() <= .5) {
                return this.movePath([
                    [.8, .11], [.6, .4], [.4, .1], [.1, .45], [-100, .11]
                ], { rotate: false });
            } else {
                return this.movePath([
                    [.8, .71], [.6, .6], [.4, .7], [.1, .55], [-100, .71]
                ], { rotate: false });
            }
        }
    };

    return FlyByFighters;
})(Game.Scripts.EnemyFighter);

Game.Scripts.Invaders = (function (superClass) {
    extend(Invaders, superClass);

    function Invaders() {
        return Invaders.__super__.constructor.apply(this, arguments);
    }

    Invaders.prototype.spawn = function (options) {
        var d, ref;
        d = Crafty.e('Fighter').fighter('enemy2' ,{
            x: Crafty.viewport.width + 40,
            y: Crafty.viewport.height / 2,
            defaultSpeed: (ref = options.speed) != null ? ref : 300,
            juice: options.juice
        });
        this.juice = options.juice;
        if (options.shootOnSight) {
            d.addComponent('ShootOnSight').shootOnSight({
                cooldown: 1000 + (Math.random() * 8000),
                sightAngle: 250,
                projectile: (function (_this) {
                    return function (x, y, angle) {
                        var projectile;
                        projectile = Crafty.e('Sphere, Hostile, Projectile').blink();
                        return projectile.shoot(x, y, angle);
                    };
                })(this)
            });
        }
        return d;
    };

    Invaders.prototype.execute = function () {
        this.bindSequence('Destroyed', this.onKilled);
        return this.sequence(
            this.repeat(2, this.sequence(
                this.moveTo({
                    x: .8,
                    y: .1
                }, {
                    speed: 250,
                    easing: 'easeInOutQuad'
                }),
                this.moveTo({
                    x: .8,
                    y: .7
                }, {
                    speed: 250,
                    easing: 'easeInOutQuad'
                })
            )),
            this.pickTarget('PlayerControlledShip'),
            this.moveTo(this.targetLocation(), {
                x: .8,
                speed: 250,
                easing: 'easeInOutQuad'
            }),
            this.wait(100),
            this.moveTo({
                x: -50,
                speed: 400,
                easing: 'easeInQuad'
            })
        );
    };

    return Invaders;
})(Game.Scripts.EnemyFighter);
