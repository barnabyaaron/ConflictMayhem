var Game,
    slice = [].slice;

Game = {
    paused: false,
    firstLevel: 'Story',
    togglePause: function() {
        this.paused = !this.paused;
        if (this.paused) {
            Crafty('Delay').each(function () {
                return this.pauseDelays();
            });
            Crafty('Tween').each(function () {
                return this.pauseTweens();
            });
            Crafty('Particles').each(function () {
                return this.pauseParticles();
            });
            Crafty('SpriteAnimation').each(function () {
                return this.pauseAnimation();
            });
            Crafty('PlayerControlledShip').each(function () {
                if (!this.disableControls) {
                    this.disabledThroughPause = true;
                    return this.disableControl();
                }
            });
            return Crafty.trigger('GamePause', this.paused);
        } else {
            Crafty('Delay').each(function () {
                return this.resumeDelays();
            });
            Crafty('Tween').each(function () {
                return this.resumeTweens();
            });
            Crafty('Particles').each(function () {
                return this.resumeParticles();
            });
            Crafty('SpriteAnimation').each(function () {
                return this.resumeAnimation();
            });
            Crafty('PlayerControlledShip').each(function () {
                if (this.disabledThroughPause) {
                    this.disabledThroughPause = null;
                    return this.enableControl();
                }
            });
            return Crafty.trigger('GamePause', this.paused);
        }
    },
    start: function () {
        var handler, settings;
        this.resetCredits();
        settings = this.settings();
        if (settings.sound === false) {
            Crafty.audio.mute();
        }

        Crafty.bind('EnterFrame',
            function() {
                if (Game.paused) {
                    return;
                }
                return Crafty.trigger.apply(Crafty, ['GameLoop'].concat(slice.call(arguments)));
            });
        Crafty.paths({
            audio: 'audio/',
            images: 'images/'
        });
        Crafty.init(1024, 576);
        Crafty.background('#000000');

        Crafty.e('Player, Color').attr({
            name: 'Player 1',
            z: 0,
            playerNumber: 1
        }).setName('Player').color('#FF0000');
        Crafty.e('KeyboardControls, PlayerAssignable').controls({
            fire: Crafty.keys.SPACE,
            switchWeapon: Crafty.keys.PERIOD,
            "super": Crafty.keys.ENTER,
            up: Crafty.keys.W,
            down: Crafty.keys.S,
            left: Crafty.keys.A,
            right: Crafty.keys.D,
            pause: Crafty.keys.P
        });

        handler = (function(_this) {
            return function(e) {
                if (e.key === Crafty.keys.T) {
                    Crafty.unbind('KeyDown', handler);
                    return Crafty.enterScene('Story_Intro', {
                        script: 'Testing',
                        checkpoint: 0,
                        DEBUG: true
                    });
                }
            };
        })(this);
        Crafty.bind('KeyDown', handler);

        return Crafty.enterScene('loading');
    },
    resetCredits: function () {
        return this.credits = 2;
    },
    settings: function () {
        var data, settings;
        data = localStorage.getItem('CNFLMYMS');
        settings = {};
        if (data) {
            settings = JSON.parse(data);
        }
        return _.defaults(settings, {
            sound: true
        });
    },
    changeSettings: function (changes) {
        var newSettings, str;
        if (changes == null) {
            changes = {};
        }
        newSettings = _.defaults(changes, this.settings());
        str = JSON.stringify(newSettings);
        return localStorage.setItem('CNFLMYMS', str);
    }
};

window.Game = Game;
