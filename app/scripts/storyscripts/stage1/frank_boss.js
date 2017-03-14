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
                this.fireRockets(4),
                this.wait(1500),
                this.fireRockets(4),
                this.wait(1000),
                this.fireRockets(2),
                this.wait(300),
                this.fireRockets(2),
                this.wait(300),
                this.fireRockets(2),
                this.wait(300)
            ))
        );
    };

    FrankBoss.prototype.spreadDance = function() {
        return this.parallel(
            this.movePath([[.7, 0], [.8, .1], [.8, .2], [.7, .3], [.6, .4], [.7, .5], [.8, .3], [.6, .2], [.7, .1]]),
            this.repeat(2, this.sequence(
                this.fireRockets(2, true),
                this.wait(600),
                this.fireRockets(4),
                this.wait(300),
                this.fireRockets(2, true),
                this.wait(600),
                this.fireRockets(4),
                this.wait(300)
            ))
        );
    };

    FrankBoss.prototype.headbuttDance = function() {
        return this.sequence(
            this.pickTarget('PlayerControlledShip'),
            this.rotate(-45, 200),
            this.moveTo({
                x: .3,
                y: this.targetLocation().y,
                offsetY: -(this.entity.h / 2),
                speed: 800,
                easing: 'easeInQuad'
            }),
            this.rotate(0, 100),
            this.moveTo({
                x: .7,
                y: this.targetLocation().y,
                offsetY: -(this.entity.h / 2),
                speed: 600,
                easing: 'easeInQuad'
            }),
            this.rotate(-45, 200),
            this.moveTo({
                x: .1,
                offsetY: -(this.entity.h / 2),
                speed: 600,
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
                    speed: 400,
                    easing: 'easeInOutQuad'
                })
            ),
            this.parallel(
                this.movePath([[.7, 0], [.8, .2], [.6, .4], [.8, .3], [.7, .1]]),
                this.sequence(
                    this.fireRockets(2, true),
                    this.wait(600),
                    this.fireRockets(4),
                    this.wait(300)
                )
            )
        );
    };

    FrankBoss.prototype.fireLaser = function(options) {
        return this.sequence(
            (function(_this) {
                return function() {
                    _this.entity.animate('shoot');
                };
            })(this)
        )
    };

    FrankBoss.prototype.fireRockets = function(amount, homing) {
        var script;
        script = Game.Scripts.FrankBossRocket;
        if (homing) {
            script = Game.Scripts.FrankBossAimedRocket;
        }

        return this.sequence(
            this.async(this.placeSquad(script, {
                options: {
                    z: 5,
                    offsetX: 0,
                    offsetY: 50,
                    pointsOnHit: 0,
                    pointsOnDestroy: 0,
                    location: this.location()
                }
            })),
            this.animate('shoot', 0),
            this.async(this.placeSquad(script, {
                options: {
                    z: -5,
                    offsetX: 0,
                    offsetY: -50,
                    pointsOnHit: 0,
                    pointsOnDestroy: 0,
                    location: this.location()
                }
            })),
            this["if"]((function() {
                return amount > 2;
            }),
            this.async(this.placeSquad(Game.Scripts.FrankBossRocket, {
                options: {
                    z: -5,
                    offsetX: 30,
                    offsetY: -100,
                    location: this.location(),
                    pointsOnHit: 0,
                    pointsOnDestroy: 0
                }
            }))),
            this["if"]((function() {
                return amount > 3;
            }),
            this.async(this.placeSquad(Game.Scripts.FrankBossRocket, {
                options: {
                    z: -5,
                    offsetX: 30,
                    offsetY: 100,
                    location: this.location(),
                    pointsOnHit: 0,
                    pointsOnDestroy: 0
                }
            }))),
            this.wait(500)
        )
    };

    FrankBoss.prototype.onKilled = function () {
        return this.sequence(
            this.deathDecoy(),
            this.moveTo({
                x: .7,
                y: .2
            }),
            (function (_this) {
                Crafty.audio.stop(); // Stop any playing audio
                Crafty.audio.play('frankDie');
                _this.entity.animate('die');
            })(this),
            this.wait(4000),
            (function (_this) {
                return _this.entity.destroy();
            })(this)
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
            health: 25000,
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
        this.bindSequence('Hit', this.fase3, (function(_this) {
            return function() {
                return _this.entity.healthBelow(.3);
            };
        })(this));

        return this.sequence(
            (function(_this) {
                return function() {
                    _this.entity.defaultSpeed = 200;
                };
            })(this),
            this.repeat(
                this.sequence(
                    this.repeat(2, this.spreadDance())
                )
            )
        );
    };

    FrankBossStage1.prototype.fase3 = function() {
        this.bindSequence('Destroyed', this.onKilled);

        return this.sequence(
            (function(_this) {
                return function() {
                    _this.entity.defaultSpeed = 300;
                };
            })(this),
            this.repeat(
                this.sequence(
                    this.repeat(2, this.headbuttDance())
                )
            )
        );
    };

    // @TODO Frank runs away ?
    FrankBossStage1.prototype.endOfFight = function () {
        return this.sequence(
            this.invincible(true),
            this.leaveAnimation(
                this.sequence(
                    (function (_this) {
                        return function () {
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

    return FrankBossStage1;

})(Game.Scripts.FrankBoss);

Game.Scripts.FrankBossRocket = (function(superClass) {
    extend(FrankBossRocket, superClass);

    function FrankBossRocket() {
        return FrankBossRocket.__super__.constructor.apply(this, arguments);
    }

    FrankBossRocket.prototype.spawn = function(options) {
        var location;
        options = _.defaults(options, {
            pointsOnHit: 125,
            pointsOnDestroy: 50,
            offsetY: 0,
            offsetX: 0,
            scale: 1.0,
            health: 50
        });
        if (options.location == null) {
            return null;
        }
        location = typeof options.location === "function" ? options.location() : void 0;
        if (!location) {
            return null;
        }
        this.offsetY = options.offsetY;
        this.offsetX = options.offsetX;
        return Crafty.e('Rocket').rocket({
            health: options.health,
            x: location.x - 30,
            y: location.y - 8 + Math.round(Math.random() * 15),
            z: 5,
            scale: options.scale,
            defaultSpeed: 600,
            pointsOnHit: options.pointsOnHit,
            pointsOnDestroy: options.pointsOnDestroy
        });
    };

    FrankBossRocket.prototype.execute = function() {
       this.bindSequence('Destroyed', this.onKilled);

       return this["while"](
           this.sequence(
               this.moveTo(this.location({
                   offsetY: this.offsetY,
                   offsetX: this.offsetX
               })),
               this["if"](
                   (function() {
                       return this.offsetX !== 0 || this.offsetY !== 0;
                   }),
                   this.wait(500)
               ),
               this.moveTo({
                   x: -205,
                   easing: 'easeInQuad'
               })
           ),
           this.sequence(
               this.blast(this.location(), function() {
                   return {
                       radius: 5,
                       duration: 135,
                       z: 1,
                       alpha: .8,
                       lightness: 1.0,
                       gravity: Math.random() * .2,
                       vertical: 0
                   };
               }, function() {
                   return {
                       vertical: this.vertical + Math.random() * this.gravity,
                       rotation: this.rotation + (Math.random() * 3),
                       alpha: Math.max(0.1, this.alpha - Math.random() * .03),
                       lightness: Math.max(.4, this.lightness - .05),
                       y: this.y - this.vertical
                   };
               }),
               this.wait(20)
           )
       );
   };

    FrankBossRocket.prototype.onKilled = function() {
        return this.bigExplosion();
   };

   return FrankBossRocket;
})(Game.EntityScript);

Game.Scripts.FrankBossAimedRocket = (function(superClass) {
    extend(FrankBossAimedRocket, superClass);

    function FrankBossAimedRocket() {
        return FrankBossAimedRocket.__super__.constructor.apply(this, arguments);
    }

    FrankBossAimedRocket.prototype.spawn = function(options) {
        var location, ref;
        options = _.defaults(options, {
            pointsOHit: 125,
            pointsOnDestroy: 50,
            z: 5,
            scale: 1.0,
            offsetY: 0
        });
        if (options.location == null) {
            return null;
        }
        location = typeof options.location === "function" ? options.location() : void 0;
        if (!location) {
            return null;
        }
        this.offsetY = options.offsetY;
        this.cooldown = (ref = options.cooldown) != null ? ref : 500;
        return Crafty.e('Rocket').rocket({
            health: 250,
            x: location.x - 30,
            y: location.y - 8 + Math.round(Math.random() * 15),
            z: options.z,
            defaultSpeed: 500,
            scale: options.scale,
            pointsOnHit: options.pointsOnHit,
            pointsOnDestroy: options.pointsOnDestroy
        });
    };

    FrankBossAimedRocket.prototype.execute = function() {
        this.bindSequence('Destroyed', this.onKilled);
        return this.sequence(
            this.pickTarget('PlayerControlledShip'),
            this.moveTo(this.location({
                offsetY: this.offsetY
            })),
            this.wait(this.cooldown),
            this["while"](
                this.moveThrough(this.targetLocation()),
                this.sequence(
                    this.blast(this.location(), function() {
                        return {
                            radius: 5,
                            duration: 135,
                            z: 1,
                            alpha: .8,
                            lightness: 1.0,
                            gravity: Math.random() * .2,
                            vertical: 0
                        };
                    }, function() {
                        return {
                            vertical: this.vertical + Math.random() * this.gravity,
                            rotation: this.rotation + (Math.random() * 3),
                            alpha: Math.max(0.1, this.alpha - Math.random() * .03),
                            lightness: Math.max(.4, this.lightness - .05),
                            y: this.y - this.vertical
                        };
                    }),
                    this.wait(20))
            )
        );
    };

    FrankBossAimedRocket.prototype.onKilled = function() {
        return this.bigExplosion();
    };

    return FrankBossAimedRocket;

})(Game.EntityScript);

Game.Scripts.FrankBossHomingRocket = (function(superClass) {
    extend(FrankBossHomingRocket, superClass);

    function FrankBossHomingRocket() {
        return FrankBossHomingRocket.__super__.constructor.apply(this, arguments);
    }

    FrankBossHomingRocket.prototype.spawn = function(options) {
        var location, ref;
        options = _.defaults(options, {
            pointsOHit: 125,
            pointsOnDestroy: 50,
            z: 5,
            scale: 1.0,
            offsetY: 0
        });
        if (options.location == null) {
            return null;
        }
        location = typeof options.location === "function" ? options.location() : void 0;
        if (!location) {
            return null;
        }
        this.offsetY = options.offsetY;
        this.cooldown = (ref = options.cooldown) != null ? ref : 500;
        return Crafty.e('Rocket').rocket({
            health: 250,
            x: location.x - 30,
            y: location.y - 8 + Math.round(Math.random() * 15),
            z: options.z,
            defaultSpeed: 500,
            scale: options.scale,
            pointsOnHit: options.pointsOnHit,
            pointsOnDestroy: options.pointsOnDestroy
        });
    };

    FrankBossHomingRocket.prototype.execute = function() {
        this.bindSequence('Destroyed', this.onKilled);
        return this.sequence(this.pickTarget('PlayerControlledShip'), this.moveTo(this.location({
            offsetY: this.offsetY
        })), this.wait(this.cooldown), this["while"](this.movePath([this.targetLocation(), [-160, .5]]), this.sequence(this.blast(this.location(), function() {
            return {
                radius: 5,
                duration: 135,
                z: 1,
                alpha: .8,
                lightness: 1.0,
                gravity: Math.random() * .2,
                vertical: 0
            };
        }, function() {
            return {
                vertical: this.vertical + Math.random() * this.gravity,
                rotation: this.rotation + (Math.random() * 3),
                alpha: Math.max(0.1, this.alpha - Math.random() * .03),
                lightness: Math.max(.4, this.lightness - .05),
                y: this.y - this.vertical
            };
        }), this.wait(20))));
    };

    FrankBossHomingRocket.prototype.onKilled = function() {
        return this.bigExplosion();
    };

    return FrankBossHomingRocket;

})(Game.EntityScript);
