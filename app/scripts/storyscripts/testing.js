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
        return this.loadAssets('explosion', 'rocket', 'playerShip', 'general', 'thruster', 'star', 'powerup', 'frank', 'laser', 'engine', 'enemy', 'custom_enemy', 'health_bar', 'health_icon');
    };

    Testing.prototype.execute = function() {
        this.inventoryAdd('weapon', 'oldlasers', {
            marking: 'OL',
            icon: 'item_bronze'
        });
        this.inventoryAdd('weapon', 'lasers', {
            marking: 'L',
            icon: 'item_silver'
        });
        this.inventoryAdd('weapon', 'diagonals', {
            markings: 'DL',
            icon: 'item_gold'
        });
        this.inventoryAdd('ship', 'life', {
            marking: '❤',
            icon: 'pill_blue'
        });
        this.inventoryAdd('ship', 'points', {
            marking: 'P',
            icon: 'powerup_star'
        });
        this.inventoryAdd('weaponUpgrade', 'levelup', {
            marking: 'WU',
            icon: 'powerup_bolt'
        });

        return this.sequence(
            (function(_this) {
                return function() {
                    //Crafty.e('BossBar').render({});
                };
            })(this),
            this.updateTitle('Testing Mode'),
            this.openingScene(),
            this.setSpeed(200),
            this.updateTitle('Enemy Test'),
            this.repeat(3, this.placeSquad(Game.Scripts.Invaders, {
                amount: 4,
                delay: 800,
                drop: 'levelup'
            })),
            this.updateTitle('The FRANK'),
            this.showText('Warning!', {
                color: '#FF0000',
                mode: 'blink',
                blink_amount: 1
            }),
            this.async(
                this.parallel(
                    (function(_this) {
                        return function() {
                            return Crafty.audio.play('frankOhMyGoodLord');
                        };
                    })(this),
                    this.showText('Frank Incoming!', {
                        color: '#FF0000',
                        mode: 'blink',
                        blink_amount: 2
                    })
                )
            ),
            this.setSpeed(0),
            this.placeSquad(Game.Scripts.FrankBossStage1)
        );
    };

    Testing.prototype.openingScene = function() {
        return this.sequence(
            this.setWeapons(['diagonals']),
            this.setSpeed(100),
            this.setScenery('Void')
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
