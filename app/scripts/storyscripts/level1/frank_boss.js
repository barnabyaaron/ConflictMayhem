var Game,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

Game = this.Game;

Game.Scripts || (Game.Scripts = {});

Game.Scripts.FrankBoss = (function(superClass) {
    extend(FrankBoss, superClass);

    function FrankBoss() {
        return FrankBoss.__super__.constructor.apply(this, arguments);
    }

    FrankBoss.prototype.assets = function() {
        return this.loadAssets('frank');
    };

    FrankBoss.prototype.simpleDance = function() {
        return this.parallel(
            this.movePath([[.7, 0], [.8, .1], [.8, .2], [.7, .3], [.6, .4], [.7, .5], [.8, .3], [.6, .2], [.7, .1]]),
            this.repeat(2, this.sequence(
                this.fireLaser({
                    type: 'single'
                }),
                this.wait(1500),
                this.fireLaser({
                    type: 'single'
                }),
                this.wait(1000),
                this.fireLaser({
                    type: 'single'
                }),
                this.wait(300),
                this.fireLaser({
                    type: 'single'
                }),
                this.wait(300),
                this.fireLaser({
                    type: 'single'
                }),
                this.wait(2000)
            ))
        );
    };

    FrankBoss.prototype.spreadDance = function() {
        return this.parallel(
            this.movePath([[.7, 0], [.8, .1], [.8, .2], [.7, .3], [.6, .4], [.7, .5], [.8, .3], [.6, .2], [.7, .1]]),
            this.repeat(2, this.sequence(
                this.fireLaser({
                    type: 'multi'
                }),
                this.wait(2000),
                this.fireLaser({
                    type: 'multi'
                }),
                this.wait(1500),
                this.fireLaser({
                    type: 'multi'
                }),
                this.wait(2000),
                this.fireLaser({
                    type: 'multi'
                }),
                this.wait(1000)
            ))
        );
    };

    FrankBoss.prototype.headbuttDance = function() {
        return this.sequence(
            this.movePath([[.7, 0], [.8, .2], [.6, .4], [.8, .3], [.7, .1]]),
            this.pickTarget('PlayerControlledShip'),
            this.moveTo(this.targetLocation(), {
                x: .7,
                speed: 300,
                easing: 'easeInOutQuad'
            }),
            this.wait(100),
            this.rotate(-45, 200),
            this.moveTo({
                //x: this.targetLocation().x + 100,
                x: .3,
                speed: 500,
                easing: 'easeInQuad'
            }),
            this.rotate(0, 100),
            this.moveTo(this.targetLocation(), {
                x: .7,
                speed: 300,
                easing: 'easeInOutQuad',
            }),
            this.rotate(-45, 200),
            this.moveTo({
                //x: this.targetLocation().x,
                x: .1,
                speed: 500,
                easing: 'easeInQuad'
            }),
            this.rotate(0, 100),
            this.parallel(
                (function(_this) {
                    return function() {
                        return _this.entity.animate('smile');
                    };
                })(this),
                this.moveTo({
                    x: .7,
                    y: .3,
                    speed: 200,
                    easing: 'easeInOutQuad'
                })
            )

        );
    };

    FrankBoss.prototype.fireLaser = function(options) {
        return this.sequence(
            (function(_this) {
                return function() {
                    return _this.entity.animate('shoot');
                };
            })(this)
        )
    };

    return FrankBoss;

})(Game.EntityScript);

Game.Scripts.FrankBossStage1 = (function(superClass) {
    extend(FrankBossStage1, superClass);

    function FrankBossStage1() {
        return FrankBossStage1.__super__.constructor.apply(this, arguments);
    }

    FrankBossStage1.prototype.spawn = function() {
        return Crafty.e('Frank, Horizon').spawn({
            x: Crafty.viewport.width + 40,
            y: Crafty.viewport.height * .35,
            defaultSpeed: 100,
            health: 23000,
            pointsOnHit: 10
        });
    };

    FrankBossStage1.prototype.execute = function() {
        this.bindSequence('Hit', this.fase2, (function(_this) {
            return function() {
                return _this.entity.healthBelow(.5);
            };
        })(this));

        return this.sequence(
            this.invincible(true),
            this.disableWeapons(),
            this.parallel(
                this.moveTo({
                    x: .7,
                    y: .2
                }),
                this.say('Frank', 'Get out of my space!')
            ),
            this.laugh(),
            this.invincible(false),
            this.enableWeapons(),
            this.repeat(
                this.sequence(
                    this.repeat(2, this.simpleDance())
                )
            )
        );
    };

    FrankBossStage1.prototype.fase2 = function() {
        console.log('Starting fase2');
        this.bindSequence('Hit', this.fase3, (function(_this) {
            return function() {
                return _this.entity.healthBelow(.3);
            };
        })(this));

        return this.sequence(
            this.setSpeed(200),
            this.repeat(
                this.sequence(
                    this.repeat(2, this.spreadDance())
                )
            )
        );
    };

    FrankBossStage1.prototype.fase3 = function() {
        console.log('Starting fase3');
        this.bindSequence('Hit', this.endOfFight, (function(_this) {
            return function() {
                return _this.entity.healthBelow(.01);
            };
        })(this));

        return this.sequence(
            this.setSpeed(300),
            this.repeat(
                this.sequence(
                    this.repeat(2, this.headbuttDance())
                )
            )
        );
    };

    FrankBossStage1.prototype.laugh = function() {
        return this.sequence(
            (function(_this) {
                return function() {
                    _this.entity.animate('smile');
                    return Crafty.audio.play('frankLaugh');
                };
            })(this), (function(_this) {
                return function() {
                    return _this.entity.invincible = true;
                };
            })(this),
            this.repeat(5, this.sequence(
                this.rotate(10, 200),
                this.rotate(-10, 200)
            )),
            this.rotate(0, 200),
            (function(_this) {
                return function() {
                    return _this.entity.invincible = false;
                };
            })(this)
        );
    };

    FrankBossStage1.prototype.endOfFight = function() {
        console.log('Starting endOfFight');
        return this.sequence(
            this.invincible(true),
            this.leaveAnimation(
                this.sequence(
                    (function(_this) {
                        return function() {
                            Crafty.audio.stop();
                            Crafty.audio.play('frankDie');
                            _this.entity.animate('die');
                        };
                    })(this),
                    this.moveTo({
                        x: .7,
                        y: .2
                    }),
                    this.wait(3000)
                )
            )
        );
    };

    return FrankBossStage1;

})(Game.Scripts.FrankBoss);
