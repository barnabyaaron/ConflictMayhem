Crafty.c('Cheats', {
    init: function () {
        this.addCheat('Freddie', ['Up', 'Up', 'Down', 'Down', 'Left', 'Right', 'Left', 'Right', 'Fire'], (function (_this) {
            return function () {
                var alreadyProtected, ship;
                alreadyProtected = false;
                ship = _this.ship;
                Crafty('Freddy').each(function () {
                    if (this.ship === ship) {
                        return alreadyProtected = true;
                    }
                });
                if (!alreadyProtected) {
                    return Crafty.e('Freddy').freddy({
                        protect: _this.ship
                    });
                }
            };
        })(this));

        this.addCheat('99Lives', ['Down', 'Down', 'Left', 'Left', 'Right', 'Right', 'Fire'], (function (_this) {
            return function() {
                _this.lives = 100;
                return _this.trigger('UpdateLives', {
                    lives: 100
                });
            };
        })(this));

        this.addCheat('GodMode', ['Down', 'Right', 'Up', 'Left', 'Up', 'Right', 'Down', 'Left', 'Fire'], (function (_this) {
            return function() {
                var ship = _this.ship;
                return ship.addComponent('Invincible').invincibleDuration(-1);
            };
        })(this));

        return this._listenInput();
    },
    remove: function () {
        var input, inputs, j, len, results;
        inputs = ['Up', 'Down', 'Left', 'Right', 'Fire'];
        results = [];
        for (j = 0, len = inputs.length; j < len; j++) {
            input = inputs[j];
            results.push(this.unbind(input));
        }
        return results;
    },
    addCheat: function (name, sequence, method) {
        if (this.cheats == null) {
            this.cheats = [];
        }
        return this.cheats.push({
            name: name,
            sequence: sequence,
            method: method,
            index: 0
        });
    },
    _listenInput: function () {
        var input, inputs, j, len, results;
        inputs = ['Up', 'Down', 'Left', 'Right', 'Fire'];
        results = [];
        for (j = 0, len = inputs.length; j < len; j++) {
            input = inputs[j];
            results.push((function (_this) {
                return function (input) {
                    return _this.bind(input, function () {
                        var c, k, len1, ref, results1;
                        ref = _this.cheats;
                        results1 = [];
                        for (k = 0, len1 = ref.length; k < len1; k++) {
                            c = ref[k];
                            if (c.sequence[c.index] === input) {
                                c.index += 1;
                                if (c.index === c.sequence.length) {
                                    results1.push(c.method());
                                } else {
                                    results1.push(void 0);
                                }
                            } else {
                                results1.push(c.index = 0);
                            }
                        }
                        return results1;
                    });
                };
            })(this)(input));
        }
        return results;
    }
});
