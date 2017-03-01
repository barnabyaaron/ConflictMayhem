var Game,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

Game = this.Game;

Game.Scripts || (Game.Scripts = {});

Game.Scripts.Testing = (function(superClass) {
    extend(Testing, superClass);

    function Testing() {
        return Testing.__super__.constructor.apply(this, arguments);
    }

    Testing.prototype.assets = function() {
        return this.loadAssets('explosion', 'playerShip', 'general');
    };

    Testing.prototype.execute = function() {
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

        return this.sequence(
            this.updateTitle('Testing Mode'),
            this.openingScene(),
            this.nextSlide(),
            this.updateTitle('Test Enemy'),
            // Testing new Kamikaze enemy
            this.repeat(3, this.placeSquad(Game.Scripts.Kamikaze, {
                amount: 5
            }))
        );
    };

    Testing.prototype.openingScene = function() {
        return this.sequence(
            this.setWeapons(['lasers']),
            this.setSpeed(100),
            this.setScenery('Intro'),
            //this.sunRise(),
            this.async(this.runScript(Game.Scripts.IntroBarrel)),
            this.setSpeed(200),
            this.setScenery('Ocean')
        );
    };

    Testing.prototype.nextSlide = function(task) {
        return this.sequence(this["while"](this._waitForKeyPress(Crafty.keys.N), this.sequence(task != null ? task : this.wait(1000), this._addVisibleMarker())));
    };

    Testing.prototype._addVisibleMarker = function() {
        return (function(_this) {
            return function() {
                var text;
                text = '';
                Crafty('LevelTitle').each(function() {
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

    Testing.prototype._clearVisibleMarker = function() {
        var text;
        text = '';
        Crafty('LevelTitle').each(function() {
            return text = this._text;
        });
        if (text[text.length - 1] === '*') {
            return Crafty('LevelTitle').text(text.slice(0, text.length - 2) + ' -');
        }
    };

    Testing.prototype._waitForKeyPress = function(key) {
        return (function(_this) {
            return function() {
                var d, handler;
                d = WhenJS.defer();
                handler = function(e) {
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

    return Testing;

})(Game.StoryScript);
