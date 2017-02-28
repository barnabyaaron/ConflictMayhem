var Game,
  extend = function (child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Game = this.Game;

Game.Scripts || (Game.Scripts = {});

Game.Scripts.Level1 = (function (superClass) {
    extend(Level1, superClass);

    function Level1() {
        return Level1.__super__.constructor.apply(this, arguments);
    }

    Level1.prototype.nextScript = 'ComingSoon';

    Level1.prototype.assets = function () {
        return this.loadAssets('explosion', 'playerShip', 'general');
    };

    Level1.prototype.execute = function () {
        this.inventoryAdd('weapon', 'lasers', {
            marking: 'L'
        });
        this.inventoryAdd('ship', 'life', {
            marking: '❤',
            icon: 'heart'
        });
        this.inventoryAdd('ship', 'points', {
            marking: 'P',
            icon: 'star'
        });
        this.inventoryAdd('weaponUpgrade', 'rapid', {
            marking: 'RF',
            icon: 'rapidFireBoost'
        });
        this.inventoryAdd('weaponUpgrade', 'damage', {
            marking: 'D',
            icon: 'damageBoost'
        });
        this.inventoryAdd('weaponUpgrade', 'aim', {
            marking: 'A',
            icon: 'aimBoost'
        });
        this.inventoryAdd('weaponUpgrade', 'speed', {
            marking: 'S',
            icon: 'speedBoost'
        });
        this.inventoryAdd('weaponBoost', 'rapidb', {
            marking: 'RF',
            icon: 'rapidFireBoost'
        });
        this.inventoryAdd('weaponBoost', 'aimb', {
            marking: 'A',
            icon: 'aimBoost'
        });
        this.inventoryAdd('weaponBoost', 'speedb', {
            marking: 'S',
            icon: 'speedBoost'
        });
        this.inventoryAdd('weaponBoost', 'damageb', {
            marking: 'D',
            icon: 'damageBoost'
        });

        return this.sequence(
            this.setPowerupPool('rapidb', 'speed', 'points', 'rapidb'),
            this.openingScene(),
            this.tutorial(),
            this.setPowerupPool('aimb', 'speedb', 'rapidb', 'speed', 'aim', 'rapid'),
            this.droneTakeover(),
            this.hacked(),
            this.setPowerupPool('aim', 'speedb', 'rapidb', 'rapid', 'rapidb', 'aimb'),
            this.enteringLand(),
            this.cityBay(),
            this.setPowerupPool('speed', 'rapid', 'aim', 'speed', 'rapid', 'aim'),
            this.bossFight(),
            this.bossFightReward()
        );
    };

    Level1.prototype.openingScene = function() {
        return this.sequence(
            this.setWeapons(['lasers']),
            this.setSpeed(100),
            this.setScenery('Intro'),
            this.sunRise(),
            this.vip(),
            this.async(this.runScript(Game.Scripts.IntroBarrel)),
            this.say('Professor', 'You are clear for take up, take care out there pilot.', {
                noise: 'low'
            }),
            this.say('Paul', 'Let\'s do it!')
        );
    };

    Level1.prototype.tutorial = function() {
        return this.sequence(
            this.setSpeed(200),
            this.setScenery('Ocean'),
            this.say('Professor', 'We have sent some drones for you to have some target practice.', {
                noise: 'low'
            }),
            this.parallel(
                this.showText('Get Ready', {
                    color: '#00FF00',
                    mode: 'blink',
                    blink_amount: 3,
                    blink_speed: 300
                }),
                this.say('Paul', 'Bring them on!')
            ),
            this.parallel(
                this.gainHeight(150, {
                    duration: 4000
                }),
                this.repeat(2, this.sequence(
                    this.placeSquad(Game.Scripts.Swirler, {
                        amount: 6,
                        delay: 250,
                        drop: 'pool'
                    }),
                    this.wait(1000)
                ))
            ),
            this.say('Professor', 'Great job, seems like you can handle yourself.', {
                noise: 'low'
            }),
            this.placeSquad(Game.Scripts.Shooter, {
                amount: 6,
                delay: 500,
                drop: 'pool'
            })
        );
    };

    Level1.prototype.droneTakeover = function() {
        return this.sequence(
            this.parallel(
                this.say('Professor', '... Something is wrong.', {
                    noise: 'low'
                }),
                this.placeSquad(Game.Scripts.VIPShooters, {
                    amount: 4,
                    delay: 750,
                    drop: 'pool'
                }),
                this.sequence(
                    this.wait(4000),
                    this.say('Charlie', 'WERE GOING DOWN!', {
                        noise: 'high'
                    })
                )
            ),
            this.say('Paul', 'My VIP is down, I repeat my VIP is down'),
            this.say('Paul', 'The drones turned on me, what\'s my orders?'),
            this.parallel(
                this.say('Professor', 'Pilot stay your course we are investigating', {
                    noise: 'low'
                }),
                this.async(this.chapterTitle(1, 'Hacked'))
            )
        );
    };

    Level1.prototype.hacked = function() {
        return this.sequence(
            this.checkpoint(
                this.checkpointStart('Ocean', 45000)
            ),
            this.swirlAttacks(),
            this.setScenery('CoastStart'),
            this.say('Professor', 'We have reports that our drones are being hacked.', {
                noise: 'low'
            }),
            this.say('Professor', 'We belive they are being hacked from HQ.\nYour mission is to continue to HQ to investigate.', {
                noise: 'low'
            }),
            this.parallel(
                this.say('Paul', 'Roger!'),
                this.swirlAttacks()
            ),
            this.parallel(
                this.gainHeight(-150, {
                    duration: 4000
                }),
                this.sequence(
                    this.wait(2000),
                    this.underWaterAttacks()
                )
            )
        );
    };

    Level1.prototype.enteringLand = function() {
        return this.sequence(
            this.checkpoint(
                this.checkpointStart('CoastStart', 93000)
            ),
            this.setScenery('BayStart'),
            this.mineSwarm(),
            this.underWaterAttacks()
        );
    };

    Level1.prototype.cityBay = function() {
        return this.sequence(
            this.checkpoint(
                this.checkpointStart('Bay', 131000)
            ),
            this.setScenery('UnderBridge'),
            this.parallel(
                this.placeSquad(Game.Scripts.Stalker, {
                    drop: 'pool'
                }),
                this.mineSwarm({
                    direction: 'left'
                })
            ),
            this.sequence(
                this.stalkerShootout(),
                this.parallel(
                    this.placeSquad(Game.Scripts.Stalker, {
                        drop: 'pool'
                    }),
                    this.mineSwarm({
                        direction: 'left'
                    })
                )
            )
        );
    };

    Level1.prototype.bossFight = function() {
        return this.sequence(
            this.checkpoint(
                this.checkpointStart('BayFull', 168000)
            ),
            this.drop({
                item: 'pool',
                inFrontOf: this.player(1)
            }),
            this.mineSwarm({
                direction: 'left'
            }),
            this.drop({
                item: 'pool',
                inFrontOf: this.player(1)
            }),
            this.parallel(
                this.mineSwarm(),
                this.sequence(
                    this.wait(5000),
                    this.setScenery('UnderBridge')
                )
            ),
            this.async(this.showText('Warning!', {
                color: '#FF0000',
                mode: 'blink'
            })),
            this["while"](
                this.waitForScenery('UnderBridge', {
                    event: 'enter'
                }),
                this.waitingRocketStrike()
            ),
            this.setSpeed(75),
            this.waitForScenery('UnderBridge', {
                event: 'inScreen'
            }),
            this.setSpeed(0),
            this.checkpoint(
                this.checkpointStart('UnderBridge', 203000)
            ),
            this.placeSquad(Game.Scripts.Stage1BossStage1),
            this.drop({
                item: 'life',
                inFrontOf: this.player(1)
            }),
            this.setSpeed(200),
            this.wait(500),
            this.drop({
                item: 'rapidb',
                inFrontOf: this.player(1)
            }),
            this.wait(500),
            this.drop({
                item: 'speedb',
                inFrontOf: this.player(1)
            })
        );
    };

    Level1.prototype.bossFightReward = function() {
        return this.sequence(
            this.checkpoint(
                this.checkpointMidStage('BayFull', 400000)
            ),
            this.say('Professor', 'Follow him we cannot let him get away!', {
                noise: 'low'
            }),
            this.setSpeed(200),
            this.setPowerupPool('rapidb', 'speedb', 'aimb', 'speed', 'rapidb'),
            this.parallel(
                this.sequence(
                    this.wait(4000),
                    this.gainHeight(800, {
                        duration: 14000
                    })
                ),
                this.sequence(
                    this.stalkerShootout(),
                    this.setScenery('Skyline'),
                    this.placeSquad(Game.Scripts.Shooter, {
                        amount: 8,
                        delay: 500,
                        drop: 'pool',
                        options: {
                            shootOnSight: true
                        }
                    }),
                    this.attackWaves(
                        this.parallel(
                            this.placeSquad(Game.Scripts.Shooter, {
                                amount: 8,
                                delay: 500,
                                options: {
                                    shootOnSight: true
                                }
                            }),
                            this.placeSquad(Game.Scripts.Swirler, {
                                amount: 8,
                                delay: 500,
                                options: {
                                    shootOnSight: true
                                }
                            })
                        )
                    ), {
                        drop: 'pool'
                    }
                )
            )
        );
    };

    Level1.prototype.waitingRocketStrike = function() {
        return this.sequence(this.placeSquad(Game.Scripts.Stage1BossRocketStrike, {
            amount: 6,
            delay: 150,
            options: {
                gridConfig: {
                    x: {
                        start: 1.1,
                        steps: 1,
                        stepSize: 0.05
                    },
                    y: {
                        start: 0.125,
                        steps: 12,
                        stepSize: 0.05
                    }
                }
            }
        }), this.wait(200));
    };

    Level1.prototype.swirlAttacks = function() {
        return this.attackWaves(
            this.parallel(
                this.repeat(2,
                    this.placeSquad(Game.Scripts.Swirler, {
                        amount: 8,
                        delay: 500,
                        options: {
                            shootOnSight: true
                        }
                    })
                ),
                this.repeat(2,
                    this.placeSquad(Game.Scripts.Shooter, {
                        amount: 8,
                        delay: 500,
                        options: {
                            shootOnSight: true
                        }
                    })
                )
            ), {
                drop: 'pool'
            }
        );
    };

    Level1.prototype.underWaterAttacks = function() {
        return this.sequence(
            this.placeSquad(Game.Scripts.Stalker, {
                drop: 'pool'
            }),
            this.repeat(2, this.stalkerShootout())
        );
    };

    Level1.prototype.mineSwarm = function(options) {
        var ref;
        if (options == null) {
            options = {
                direction: 'right'
            };
        }
        return this.placeSquad(Game.Scripts.JumpMine, {
            amount: 20,
            delay: 100,
            options: {
                gridConfig: {
                    x: {
                        start: 0.1,
                        steps: 16,
                        stepSize: 0.05
                    },
                    y: {
                        start: 0.125,
                        steps: 12,
                        stepSize: 0.05
                    }
                },
                points: (ref = options.points) != null ? ref : true,
                direction: options.direction
            }
        });
    };

    Level1.prototype.stalkerShootout = function() {
        return this.parallel(
            this.placeSquad(Game.Scripts.Stalker, {
                drop: 'pool'
            }),
            this.attackWaves(
                this.parallel(
                    this.placeSquad(Game.Scripts.Shooter, {
                        amount: 8,
                        delay: 500,
                        options: {
                            shootOnSight: true
                        }
                    }),
                    this.placeSquad(Game.Scripts.Swirler, {
                        amount: 8,
                        delay: 500,
                        options: {
                            shootOnSight: true
                        }
                    })
                ), {
                    drop: 'pool'
                }
            )
        );
    };

    Level1.prototype.vip = function() {
        return this.async(this.placeSquad(Game.Scripts.VIP));
    };

    Level1.prototype.sunRise = function(options) {
        if (options == null) {
            options = {
                skipTo: 0
            };
        }
        return this.async(this.runScript(Game.Scripts.SunRise, _.extend({
            speed: 2
        }, options)));
    };

    Level1.prototype.checkpointStart = function(scenery, sunSkip) {
        return this.sequence(
            this.setScenery(scenery),
            this.sunRise({
                skipTo: sunSkip
            }),
            this.wait(2000)
        );
    };

    Level1.prototype.checkpointMidStage = function(scenery, sunSkip) {
        return this.sequence(
            this.setScenery(scenery),
            this.sunRise({
                skipTo: sunSkip
            }),
            this.wait(2000)
        );
    };

    return Level1;

})(Game.StoryScript);
