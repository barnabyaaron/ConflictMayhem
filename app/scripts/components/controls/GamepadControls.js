Crafty.c('GamepadControls', {
    init: function () {
        this.requires('Listener');
        this.bind('RemoveComponent', function (componentName) {
            if (componentName === 'ControlScheme') {
                return this.removeComponent('GamepadControls');
            }
        });
        return this.emits = {};
    },
    remove: function () {
        return this.unbind('GamepadKeyChange', this._keyHandling);
    },
    setupControls: function (player) {
        return player.addComponent('GamepadControls').controls(this.controlMap).addComponent('ControlScheme');
    },
    controls: function (controlMap) {
        this.controlMap = controlMap;
        if (controlMap.gamepadIndex == null) {
            return;
        }
        this.requires('Gamepad');
        this.gamepad(controlMap.gamepadIndex);
        this.bind('GamepadKeyChange', this._keyHandling);
        this.bind('GamepadAxisChange', this._stickHandling);
        return this;
    },
    _stickHandling: function (e) {
        var direction;
        if (e.axis === 1) {
            direction = 'vertical';
            if (e.value < -0.5) {
                this._startEmit(direction, 'Up');
            } else if (e.value > 0.5) {
                this._startEmit(direction, 'Down');
            } else {
                this._stopEmit(direction);
            }
        }
        if (e.axis === 0) {
            direction = 'horizontal';
            if (e.value < -0.5) {
                return this._startEmit(direction, 'Left');
            } else if (e.value > 0.5) {
                return this._startEmit(direction, 'Right');
            } else {
                return this._stopEmit(direction);
            }
        }
    },
    _startEmit: function (axis, value) {
        var ref;
        if (((ref = this.emits[axis]) != null ? ref.value : void 0) === value) {
            return;
        }
        this._stopEmit(axis);
        this.trigger(value);
        return this.emits[axis] = {
            interval: setInterval((function (_this) {
                return function () {
                    return _this.trigger(value);
                };
            })(this), 200),
            value: value
        };
    },
    _stopEmit: function (axis) {
        var ref;
        clearInterval((ref = this.emits[axis]) != null ? ref.interval : void 0);
        return delete this.emits[axis];
    },
    _keyHandling: function (e) {
        if (this.lastPressed && this.lastPressed.getTime() > (new Date().getTime() - 200)) {
            return;
        }
        this.lastPressed = new Date();
        if (e.button === this.controlMap.fire && e.pressed) {
            this.trigger('Fire', e);
        }
        if (e.button === this.controlMap.up && e.pressed) {
            this.trigger('Up', e);
        }
        if (e.button === this.controlMap.down && e.pressed) {
            this.trigger('Down', e);
        }
        if (e.button === this.controlMap.left && e.pressed) {
            this.trigger('Left', e);
        }
        if (e.button === this.controlMap.right && e.pressed) {
            return this.trigger('Right', e);
        }
    },
    assignControls: function (ship) {
        ship.addComponent('GamepadMultiway').gamepadMultiway({
            speed: {
                y: 400,
                x: 400
            },
            gamepadIndex: this.controlMap.gamepadIndex,
            analog: true
        });
        return this.listenTo(ship, 'GamepadKeyChange', (function (_this) {
            return function (e) {
                if (e.button === _this.controlMap.fire) {
                    ship.shoot(e.pressed);
                }
                if (e.button === _this.controlMap.switchWeapon) {
                    ship.switchWeapon(e.pressed);
                }
                if (e.button === _this.controlMap["super"]) {
                    ship.superWeapon(e.pressed);
                }
                if (e.button === _this.controlMap.pause) {
                    if (e.pressed) {
                        return Game.togglePause();
                    }
                }
            };
        })(this));
    }
});