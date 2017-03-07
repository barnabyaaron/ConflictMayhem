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
        return this.sequence(
            this.movePath([[.7, .4], [.8, .3], [.8, .2], [.7, .1], [.7, .3], [.8, .6], [.8, .7], [.7, .6]])
        );
    };

    FrankBoss.prototype.spreadDance = function() {
        return this.sequence(
            this.movePath([[.7, .4], [.8, .3], [.8, .2], [.7, .1], [.7, .3], [.8, .6], [.8, .7], [.7, .6]])
        );
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
            this.moveTo({
                y: .4,
                speed: 5
            }),
            this.repeat(
                this.sequence(
                    this.repeat(2, this.simpleDance())
                )
            )
        );
    };

    FrankBossStage1.prototype.fase2 = function() {
        this.bindSequence('Hit', this.endOfFight, (function(_this) {
            return function() {
                return _this.entity.healthBelow(.2);
            };
        })(this));

        return this.sequence(
            this.setSpeed(200),
            this.repeat(
                this.sequence(
                    this.repeat(2, this["while"](
                        this.spreadDance(),
                        this.sequence(
                            this.wait(1500)
                        ),
                        this.wait(1500)
                    )),
                    this.wait(1000)
                )
            )
        )
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
        return this.sequence(
            this.invincible(true),
            this.leaveAnimation(
                this.sequence(
                    (function(_this) {
                        return function() {
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
