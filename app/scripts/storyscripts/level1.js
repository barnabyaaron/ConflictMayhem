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
            this.openingScene(),
            this.tutorial(),
            this.droneTakeover()
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
                this.placeSquad(Game.Scripts.CrewShooters, {
                    amount: 4,
                    delay: 750,
                    drop: 'pool'
                })
            ),
            this.say('Charlie', 'WERE GOING DOWN!', {
                noise: 'high'
            }),
            this.say('Paul', 'My VIP is down, I repeat my VIP is down'),
            this.say('Paul', 'The drones turned on the,'),
            this.parallel(
                this.say('Professor', 'Pilot stay your course we are investigating', {
                    noise: 'low'
                }),
                this.async(this.chapterTitle(1, 'Hacked'))
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

    return Level1;

})(Game.StoryScript);
