var Game,
  extend = function (child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Game = this.Game;

Game.Scripts || (Game.Scripts = {});

Game.Scripts.Lunch = (function (superClass) {
    extend(Lunch, superClass);

    function Lunch() {
        return Lunch.__super__.constructor.apply(this, arguments);
    }

    Lunch.prototype.assets = function () {
        return this.loadAssets('explosion', 'playerShip');
    };

    Lunch.prototype.execute = function () {
        this.inventoryAdd('weapon', 'oldlasers', {
            marking: 'L'
        });
        this.inventoryAdd('weapon', 'lasers', {
            marking: 'L'
        });
        this.inventoryAdd('ship', 'points', {
            marking: 'P',
            icon: 'star'
        });
        this.inventoryAdd('ship', 'xp', {
            marking: 'XP',
            icon: 'star'
        });
        Game.explosionMode = 'block';
        return this.sequence((function (_this) {
            return function () {
                return Crafty.audio.mute();
            };
        })(this), this.setShipType('PlayerControlledCube'), this.setScenery('Blackness'), this.hideHud({
            duration: 0
        }), this.setWeapons([]), this.enableWeapons(), this.nextSlide(), this.setWeapons(['oldlasers']), this.nextSlide(), this.updateTitle('First enemy'), this.placeSquad(Game.Scripts.Slider, {
            options: {
                gridConfig: {
                    x: {
                        start: 1.1
                    },
                    y: {
                        start: .5
                    }
                }
            }
        }), this.showHud(), this.updateTitle('2 Players'), this.nextSlide(), this.updateTitle('More enemies'), this.setScenery('OpenSpace'), this.setSpeed(150, {
            accellerate: false
        }), this.parallel(this.placeSquad(Game.Scripts.Slider, {
            amount: 15,
            options: {
                gridConfig: {
                    x: {
                        start: 1.2,
                        steps: 4,
                        stepSize: .2
                    },
                    y: {
                        start: .2,
                        steps: 5,
                        stepSize: .1
                    }
                }
            }
        }), this.sequence(this.waitForScenery('OpenSpace'), this.setSpeed(0, {
            accellerate: false
        }))), this.nextSlide(), this.updateTitle('Level geometry'), this.setSpeed(50, {
            accellerate: false
        }), this.nextSlide(), this.updateTitle('Speed and collision'), this.setSpeed(250, {
            accellerate: false
        }), this.nextSlide(), this.updateTitle('Backgrounds'), this.checkpoint(this.setScenery('OpenSpace')), this.setScenery('TunnelStart'), this.waitForScenery('TunnelStart'), this.setSpeed(50, {
            accellerate: false
        }), this.nextSlide(), this.updateTitle('Dialog'), this.say('SpeedLazer', 'Hello World!'), this.say('SpeedLazer', 'Flavor text can add to story telling'), this.nextSlide(), this.parallel(this.sequence(this.wait(3000), this.say('Enemies', 'Get them!')), this.nextSlide(this.sequence(this.placeSquad(Game.Scripts.Slider, {
            amount: 5,
            options: {
                gridConfig: {
                    x: {
                        start: 1.2,
                        steps: 4,
                        stepSize: .2
                    },
                    y: {
                        start: .3,
                        steps: 5,
                        stepSize: .1
                    }
                }
            }
        }), this.wait(3000)))), this.updateTitle('Enemy choreo start'), this.nextSlide(this.sequence(this.placeSquad(Game.Scripts.Sine, {
            amount: 5,
            delay: 1000
        }), this.wait(3000))), this.updateTitle('Start stage 1'), this.setScenery('TunnelEnd'), this.setSpeed(450, {
            accellerate: false
        }), this.waitForScenery('OceanOld', {
            event: 'leave'
        }), this.setSpeed(50, {
            accellerate: false
        }), this.checkpoint(this.setScenery('OceanOld')), this.nextSlide(), this.updateTitle('Bezier, powerups'), this.nextSlide(this.sequence(this.placeSquad(Game.Scripts.PresentationSwirler, {
            drop: 'xp',
            amount: 4,
            delay: 500
        }), this.waitForScenery('OceanOld'))), this.updateTitle('Lazerscript environment'), this.nextSlide(this.placeSquad(Game.Scripts.PresentationSwirler, {
            drop: 'xp',
            amount: 3,
            delay: 500
        })), this.nextSlide(this.parallel(this.placeSquad(Game.Scripts.PresentationShooter, {
            drop: 'xp',
            amount: 3,
            delay: 600
        }), this.placeSquad(Game.Scripts.PresentationSwirler, {
            amount: 3,
            delay: 500
        }))), this.checkpoint(this.setScenery('OceanOld')), this.updateTitle('Lazerscript enemies'), this.disableWeapons(), this.placeSquad(Game.Scripts.LittleDancer, {
            amount: 5,
            delay: 2000,
            options: {
                gridConfig: {
                    x: {
                        start: .25,
                        steps: 5,
                        stepSize: .1
                    }
                }
            }
        }), this.enableWeapons(), this.updateTitle('Particle effects'), (function (_this) {
            return function () {
                return Game.explosionMode = 'particles';
            };
        })(this), (function (_this) {
            return function () {
                return Game.webGLMode = false;
            };
        })(this), this.checkpoint(this.setScenery('OceanOld')), this.setScenery('OceanToNew'), this.async(this.runScript(Game.Scripts.PresentationSunRise, {
            skipTo: 0,
            speed: 10
        })), this.repeat(4, this.sequence(this.placeSquad(Game.Scripts.PresentationSwirler, {
            drop: 'xp',
            amount: 6,
            delay: 700
        }))), (function (_this) {
            return function () {
                return Game.explosionMode = null;
            };
        })(this), this.updateTitle('Graphics!'), this.swirlAttacks(), this.swirlAttacks(), this.setScenery('CoastStart'), this.nextSlide(this.sequence(this.mineSwarm({
            juice: false
        }))), this.checkpoint(this.sunriseCheckpoint(Game.Scripts.PresentationSunRise, 90000, 10, 'CoastStart')), this.parallel(this.runScript(Game.Scripts.PresentationSunSet, {
            skipTo: 0,
            speed: 50
        }), this.sequence(this.say('Graphics', 'Ok lets do the sunrise again'), this.say('Graphics', 'And now use WebGL Shaders'))), this.say('WebGL', 'Ready?'), this.say('WebGL', 'Really ready?'), (function (_this) {
            return function () {
                Game.webGLMode = true;
                Crafty('GoldenStripe').each(function () {
                    return this.bottomColor('#DDDD00', 0);
                });
                Crafty('waterMiddle').each(function () {
                    return this.attr({
                        lightness: 1.0
                    });
                });
                return Crafty('waterHorizon').each(function () {
                    return this.attr({
                        lightness: 1.0
                    });
                });
            };
        })(this), this.chapterTitle(1, 'WebGL Shaders'), this.async(this.runScript(Game.Scripts.SunRise, {
            skipTo: 0,
            speed: 2
        })), this.setScenery('BayStart'), this.nextSlide(this.sequence(this.swirlAttacks2())), this.disableWeapons(1), this.say('Player 1', 'Help I have a weapon malfunction!!'), this.say('Player 2', 'No worries, I will fight for you!'), this.chapterTitle(2, 'Juice'), this.nextSlide(this.sequence(this.swirlAttacks2())), this.setWeapons(['lasers']), this.say('Player 2', 'Woohoo Autofire! I will save you buddy!'), this.setSpeed(100, {
            accellerate: true
        }), this.swirlAttacks2({
            juice: true
        }), this.enableWeapons(), this.say('Player 1', 'My weapon works again! I seemed I was pressing the\n' + 'wrong button all this time!'), this.say('Player 2', 'Sigh...'), this.setSpeed(150, {
            accellerate: true
        }), this.nextSlide(this.mineSwarm({
            juice: true
        })), this.chapterTitle(3, 'Minimal viable audio'), this.wait(1000), (function (_this) {
            return function () {
                return Crafty.audio.unmute();
            };
        })(this), this.nextSlide(this.mineSwarm({
            juice: true
        })), this.nextSlide(this.placeSquad(Game.Scripts.Swirler, {
            amount: 4,
            delay: 500,
            drop: 'xp',
            options: {
                juice: true
            }
        })), this.checkpoint(this.sunriseCheckpoint(Game.Scripts.SunRise, 120000, 2, 'Bay')), this.setScenery('UnderBridge'), this.updateTitle('Player ship'), this.setWeapons(['lasers']), this.setShipType('PlayerSpaceship'), this.setWeapons(['lasers']), this["while"](this.waitForScenery('UnderBridge', {
            event: 'enter'
        }), this.placeSquad(Game.Scripts.Swirler, {
            amount: 4,
            delay: 500,
            drop: 'xp',
            options: {
                juice: true
            }
        })), this.setSpeed(50, {
            accellerate: true
        }), this.waitForScenery('UnderBridge', {
            event: 'inScreen'
        }), this.checkpoint(this.sunriseCheckpoint(Game.Scripts.SunRise, 140000, 2, 'UnderBridge')), this.setSpeed(0), this.nextSlide(), this.chapterTitle(4, 'Bossfight!'), this.placeSquad(Game.Scripts.LunchBossStage1), this.checkpoint(this.parallel(this.async(this.runScript(Game.Scripts.SunRise, {
            skipTo: 450000,
            speed: 2
        })), this.setScenery('Skyline'), this.gainHeight(600, {
            duration: 0
        }), this.setSpeed(150))), this.wait(5000), this.parallel(this.sequence(this.disableControls(), this.disableWeapons(), this.placeSquad(Game.Scripts.PresentationLeaveScreen, {
            amount: 2,
            delay: 1000
        })), this.sequence(this.say('With the evil boss destroyed\nMankind was saved again!'), this.say('And our heroes where off to another adventure!'), this.say('Thanks for playing!'))), this.screenFadeOut(), this.endGame());
    };

    Lunch.prototype.nextSlide = function (task) {
        return this.sequence(this["while"](this._waitForKeyPress(Crafty.keys.N), this.sequence(task != null ? task : this.wait(1000), this._addVisibleMarker())));
    };

    Lunch.prototype._addVisibleMarker = function () {
        return (function (_this) {
            return function () {
                var text;
                text = '';
                Crafty('LevelTitle').each(function () {
                    return text = this._text;
                });
                if (text[text.length - 1] === '-') {
                    text = text.slice(0, text.length - 2);
                }
                if (text[text.length - 1] !== '*') {
                    return Crafty('LevelTitle').text(text + ' *');
                }
            };
        })(this);
    };

    Lunch.prototype._clearVisibleMarker = function () {
        var text;
        text = '';
        Crafty('LevelTitle').each(function () {
            return text = this._text;
        });
        if (text[text.length - 1] === '*') {
            return Crafty('LevelTitle').text(text.slice(0, text.length - 2) + ' -');
        }
    };

    Lunch.prototype._waitForKeyPress = function (key) {
        return (function (_this) {
            return function () {
                var d, handler;
                d = WhenJS.defer();
                handler = function (e) {
                    if (e.key === key) {
                        _this._clearVisibleMarker();
                        Crafty.unbind('KeyDown', handler);
                        return d.resolve();
                    }
                };
                Crafty.bind('KeyDown', handler);
                return d.promise;
            };
        })(this);
    };

    Lunch.prototype.mineSwarm = function (options) {
        if (options == null) {
            options = {};
        }
        options = _.defaults(options, {
            direction: 'right',
            juice: true
        });
        return this.placeSquad(Game.Scripts.JumpMine, {
            amount: 8,
            delay: 300,
            options: {
                juice: options.juice,
                gridConfig: {
                    x: {
                        start: 200,
                        steps: 10,
                        stepSize: 40
                    },
                    y: {
                        start: 60,
                        steps: 8,
                        stepSize: 40
                    }
                },
                direction: options.direction
            }
        });
    };

    Lunch.prototype.swirlAttacks = function () {
        return this.parallel(this.repeat(2, this.placeSquad(Game.Scripts.PresentationSwirler, {
            amount: 4,
            delay: 500,
            drop: 'xp'
        })), this.repeat(2, this.placeSquad(Game.Scripts.PresentationShooter, {
            amount: 4,
            delay: 500,
            drop: 'xp'
        })));
    };

    Lunch.prototype.swirlAttacks2 = function (options) {
        if (options == null) {
            options = {
                juice: false
            };
        }
        return this.parallel(this.repeat(2, this.placeSquad(Game.Scripts.Swirler, {
            amount: 4,
            delay: 500,
            drop: 'xp',
            options: options
        })), this.repeat(2, this.placeSquad(Game.Scripts.Shooter, {
            amount: 4,
            delay: 500,
            drop: 'xp',
            options: options
        })));
    };

    Lunch.prototype.sunriseCheckpoint = function (script, skip, speed, scenery) {
        return this.sequence(this.async(this.runScript(script, {
            skipTo: skip,
            speed: speed
        })), this.setScenery(scenery), this.wait(2000));
    };

    return Lunch;

})(Game.StoryScript);