var Game,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

Game = this.Game;

Game.Scripts || (Game.Scripts = {});

Game.Scripts.Stage1 = (function(superClass) {
    extend(Stage1, superClass);

    function Stage1() {
        return Stage1.__super__.constructor.apply(this, arguments);
    }

    Stage1.prototype.assets = function() {
        return this.loadAssets(
            'explosion',
            'rocket',
            'playerShip',
            'general',
            'thruster',
            'star',
            'powerup',
            'frank',
            'laser',
            'engine',
            'enemy',
            'custom_enemy',
            'health_bar',
            'health_icon',
            'rock',
            'star',
            'numbers',
            'playerIcon',
            'shield',
            'laser_hit'
        );
    };

    Stage1.prototype.execute = function() {
        this.inventoryAdd('ship', 'life', {
            marking: '❤',
            icon: 'pill_blue',
            icon_custom: true
        });
        this.inventoryAdd('ship', 'points', {
            marking: 'P',
            icon: 'powerup_star',
            icon_custom: true
        });
        this.inventoryAdd('ship', 'points2', {
            marking: 'P2',
            icon: 'powerupYellow_star',
            icon_custom: true
        });
        this.inventoryAdd('ship', 'points3', {
            marking: 'P3',
            icon: 'powerupGreen_star',
            icon_custom: true
        });
        this.inventoryAdd('weapon', 'lasers', {
            marking: 'L',
            icon: 'item_bronze',
            icon_custom: true
        });
        this.inventoryAdd('weapon', 'diagonals', {
            markings: 'DL',
            icon: 'item_silver',
            icon_custom: true
        });
        this.inventoryAdd('weaponUpgrade', 'levelup', {
            marking: 'WU',
            icon: 'powerup_bolt',
            icon_custom: true
        });
        this.inventoryAdd('weaponBoost', 'speedb', {
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
        this.inventoryAdd('weaponBoost', 'damageb', {
            marking: 'D',
            icon: 'damageBoost'
        });

        return this.sequence(
            this.openingScene(),
            this.setPowerupPool('speedb', 'rapidb', 'damageb', 'aimb', 'levelup'),
            this.firstContact(),
            this.drop({
                item: 'life',
                inFrontOf: this.player(0)
            }),
            this.bossIntro(),
            this.leaveSpace()
        );
    };

    Stage1.prototype.openingScene = function() {
        return this.sequence(
            this.setWeapons(['lasers']),
            this.setSpeed(100),
            this.setScenery('Intro'),
            this.say('Professor', 'Your closing in on these unusual readings be careful.', {
                noise: 'low'
            }),
            this.say('Pilot', 'Roger! I\'m ready for whatever is out here')
        );
    };

    Stage1.prototype.firstContact = function() {
        return this.sequence(
            this.checkpoint(
                this.checkpointStart('Void')
            ),
            this.setSpeed(200),
            this.setScenery('Void'),
            this.chapterTitle(1, "First Contact"),
            this.attackWaves(
                this.parallel(
                    this.repeat(3, this.placeSquad(Game.Scripts.FlyByFighters, {
                        amount: 3,
                        delay: 2000,
                        drop: 'pool',
                        dropChance: .7,
                        options: {
                            path: 'top'
                        }
                    })),
                    this.repeat(3, this.placeSquad(Game.Scripts.FlyByFighters, {
                        amount: 3,
                        delay: 2000,
                        drop: 'pool',
                        dropChance: .7,
                        options: {
                            path: 'bottom'
                        }
                    }))
                ), {
                    drop: 'pool'
                }
            ),
            this.say('Pilot', 'Targets are hostile, what are my orders?'),
            this.say('Professor', 'Really? \nWe have a problem then because we are getting a lot of readings here.', {
                noise: 'low'
            }),
            this.say('Professor', 'Stay your course and we will see what we can do\nGood luck pilot.', {
                noise: 'low'
            }),
            this.repeat(4, this.placeSquad(Game.Scripts.Invaders, {
                amount: 3,
                delay: 1000,
                drop: 'pool',
                dropChance: .6
            }))
        );
    };

    Stage1.prototype.bossIntro = function() {
        return this.sequence(
            this.setScenery('Red'),
            this.wait(2000),
            this.checkpoint(
                this.checkpointStart('Red')
            ),
            this.chapterTitle(2, "Unknown Object"),
            this.placeSquad(Game.Scripts.FrankBossStage1),
            this.wait(1000)
        );
    };

    Stage1.prototype.leaveSpace = function() {
        return this.sequence(
            this.parallel(
                this.sequence(
                    this.disableControls(),
                    this.disableWeapons(),
                    this.placeSquad(Game.Scripts.PresentationLeaveScreen, {
                        amount: 2,
                        delay: 1000
                    })
                ),
                this.say('That\'s all for now!\nMore content coming soon!')
            ),
            this.screenFadeOut(),
            this.endGame()
        );
    };

    Stage1.prototype.checkpointStart = function(scenery) {
        return this.sequence(
            this.setScenery(scenery),
            this.wait(2000)
        );
    };

    return Stage1;
})(Game.StoryScript);
