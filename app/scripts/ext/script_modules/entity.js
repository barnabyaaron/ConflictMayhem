var Game,
  slice = [].slice;

Game = this.Game;

if (Game.ScriptModule == null) {
    Game.ScriptModule = {};
}

Game.ScriptModule.Entity = {
    bindSequence: function (eventName, sequenceFunction, filter) {
        var eventHandler;
        if (sequenceFunction == null) {
            return;
        }
        if (filter == null) {
            filter = function () {
                return true;
            };
        }
        eventHandler = (function (_this) {
            return function () {
                var args, p, sequence;
                args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
                if (!filter.apply(null, args)) {
                    return;
                }
                _this.entity.unbind(eventName, eventHandler);
                p = function (sequence) {
                    _this.alternatePath = null;
                    return WhenJS(sequenceFunction.apply(_this, args)(sequence))["catch"](function () {
                        return _this.alternatePath;
                    });
                };
                _this.currentSequence = sequence = Math.random();
                return _this.alternatePath = p(sequence);
            };
        })(this);
        return this.entity.bind(eventName, eventHandler);
    },
    sendToBackground: function (scale, z) {
        return (function (_this) {
            return function (sequence) {
                _this._verify(sequence);
                return _this.entity.sendToBackground(scale, z);
            };
        })(this);
    },
    reveal: function () {
        return (function (_this) {
            return function (sequence) {
                _this._verify(sequence);
                return _this.entity.reveal();
            };
        })(this);
    },
    animate: function (reel, repeat, member) {
        return (function (_this) {
            return function (sequence) {
                _this._verify(sequence);
                if (member) {
                    return _this.entity[member].animate(reel, repeat);
                } else {
                    return _this.entity.animate(reel, repeat);
                }
            };
        })(this);
    },
    scale: function (scale, options) {
        if (options == null) {
            options = {};
        }
        return (function (_this) {
            return function (sequence) {
                var cleanup, d, oscale, ref;
                _this._verify(sequence);
                oscale = (ref = _this.entity.scale) != null ? ref : 1.0;
                options = _.defaults(options, {
                    duration: Math.abs(scale - oscale) * 1000
                });
                d = WhenJS.defer();
                cleanup = function () {
                    return defer.resolve();
                };
                _this.entity.tween({
                    scale: scale
                }, options.duration).one('TweenEnd', function () {
                    this.unbind('Remove', cleanup);
                    return d.resolve();
                });
                return d.promise;
            };
        })(this);
    },
    movePath: function (inputPath, settings) {
        if (settings == null) {
            settings = {};
        }
        return (function (_this) {
            return function (sequence) {
                var a, b, bezierPath, c, d, defer, duration, p, path, pn, pp, px, py, res, x, y;
                _this._verify(sequence);
                if (!_this.enemy.alive && (_this.decoyingEntity == null)) {
                    return WhenJS.resolve();
                }
                settings = _.defaults(settings, {
                    rotate: true,
                    skip: 0,
                    speed: _this.entity.defaultSpeed,
                    continuePath: false,
                    easing: 'linear',
                    autoAccellerate: true
                });
                path = [].concat(inputPath);
                path.unshift([Math.round(_this.entity.x + Crafty.viewport.x), Math.round(_this.entity.y + Crafty.viewport.y)]);
                pp = path[0];
                d = 0;
                bezierPath = (function () {
                    var i, len, results;
                    results = [];
                    for (i = 0, len = path.length; i < len; i++) {
                        p = path[i];
                        if (res = typeof p === "function" ? p() : void 0) {
                            x = res.x;
                            y = res.y;
                        } else {
                            x = p[0], y = p[1];
                        }
                        if ((-1 < x && x < 2)) {
                            x *= Crafty.viewport.width;
                        }
                        if ((-1 < y && y < 2)) {
                            y *= Crafty.viewport.height;
                        }
                        pn = [x, y];
                        px = pp[0], py = pp[1];
                        a = Math.abs(x - px);
                        b = Math.abs(y - py);
                        c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
                        d += c;
                        pp = pn;
                        x -= Crafty.viewport.x;
                        y -= Crafty.viewport.y;
                        results.push({
                            x: x,
                            y: y
                        });
                    }
                    return results;
                })();
                duration = (d / settings.speed) * 1000;
                defer = WhenJS.defer();
                _this.entity.choreography([
                  {
                      type: 'viewportBezier',
                      rotation: settings.rotate,
                      continuePath: settings.continuePath,
                      path: bezierPath,
                      duration: duration,
                      easingFn: settings.easing
                  }
                ], {
                    skip: settings.skip
                }).one('ChoreographyEnd', function () {
                    return defer.resolve();
                });
                return defer.promise;
            };
        })(this);
    },
    _isFloat: function (n) {
        return n === +n && n !== (n | 0);
    },
    moveTo: function (location, extraSettings) {
        if (extraSettings == null) {
            extraSettings = {};
        }
        return (function (_this) {
            return function (sequence) {
                var offsets, ref, ref1, ref2, settings, target;
                _this._verify(sequence);
                if (!_this.enemy.alive && (_this.decoyingEntity == null)) {
                    return WhenJS.resolve();
                }
                if (typeof location === 'string') {
                    target = Crafty(location).get(0);
                    offsets = _.defaults(extraSettings, {
                        offsetX: 0,
                        offsetY: 0
                    });
                    location = {
                        x: target.x + Crafty.viewport.x + offsets.offsetX,
                        y: target.y + Crafty.viewport.y + offsets.offsetY
                    };
                }
                settings = (ref = typeof location === "function" ? location() : void 0) != null ? ref : location;
                if (_.isFunction(settings)) {
                    return WhenJS();
                }
                _.extend(settings, extraSettings);
                if ((settings.x != null) && ((-1 < (ref1 = settings.x) && ref1 < 2))) {
                    settings.x *= Crafty.viewport.width;
                }
                if ((settings.y != null) && ((-1 < (ref2 = settings.y) && ref2 < 2))) {
                    settings.y *= Crafty.viewport.height;
                }
                if (settings.positionType === 'absoluteY') {
                    settings.y += Crafty.viewport.y;
                }
                if (!_.isObject(location)) {
                    throw new Error('location invalid');
                }
                
                return _this._moveAir(settings);
            };
        })(this);
    },
    moveThrough: function (location) {
        return (function (_this) {
            return function (sequence) {
                var dx, dy, fx, fy, rad, res, tx, ty, x, y;
                _this._verify(sequence);
                x = Math.round(_this.entity.x + Crafty.viewport.x);
                y = Math.round(_this.entity.y + Crafty.viewport.y);
                if (res = typeof location === "function" ? location() : void 0) {
                    tx = res.x;
                    ty = res.y;
                } else {
                    tx = location[0], ty = location[1];
                }
                if ((tx != null) && (ty != null)) {
                    dx = tx - x;
                    dy = ty - y;
                } else {
                    dx = -1;
                    dy = 0;
                }
                rad = Math.atan2(dy, dx);
                fx = (Math.cos(rad) * 1000) + x;
                fy = (Math.sin(rad) * 1000) + y;
                return _this.moveTo({
                    x: fx,
                    y: fy,
                    rotation: true
                })(sequence);
            };
        })(this);
    },
    _moveAir: function (settings) {
        var defaults, defer, delta, deltaX, deltaY, easing, ref;
        defaults = {
            speed: this.entity.defaultSpeed
        };
        if (this.entity.has('ViewportFixed')) {
            defaults.x = this.entity.x + Crafty.viewport.x;
            defaults.y = this.entity.y + Crafty.viewport.y;
        }
        settings = _.defaults(settings, defaults);
        deltaX = settings.x != null ? Math.abs(settings.x - (this.entity.x + Crafty.viewport.x)) : 0;
        deltaY = settings.y != null ? Math.abs(settings.y - (this.entity.y + Crafty.viewport.y)) : 0;
        delta = Math.sqrt((Math.pow(deltaX, 2)) + (Math.pow(deltaY, 2)));
        defer = WhenJS.defer();
        easing = (ref = settings.easing) != null ? ref : 'linear';
        this.entity.choreography([
          {
              type: 'viewport',
              x: settings.x,
              y: settings.y,
              rotation: settings.rotation,
              easingFn: easing,
              maxSpeed: settings.speed,
              duration: (delta / settings.speed) * 1000
          }
        ]).one('ChoreographyEnd', function () {
            return defer.resolve();
        });
        return defer.promise;
    },
    rotate: function (degrees, duration) {
        return (function (_this) {
            return function (sequence) {
                var cleanup, defer;
                _this._verify(sequence);
                defer = WhenJS.defer();
                cleanup = function () {
                    return defer.resolve();
                };
                _this.entity.one('Remove', cleanup);
                _this.entity.tween({
                    rotation: degrees
                }, duration).one('TweenEnd', function () {
                    this.unbind('Remove', cleanup);
                    return defer.resolve();
                });
                return defer.promise;
            };
        })(this);
    },
    synchronizeOn: function (name) {
        return (function (_this) {
            return function (sequence) {
                return _this.synchronizer.synchronizeOn(name, _this);
            };
        })(this);
    },
    squadOnce: function (name, events) {
        return (function (_this) {
            return function (sequence) {
                _this._verify(sequence);
                if (_this.synchronizer.allowOnce(name)) {
                    return events(sequence);
                }
            };
        })(this);
    },
    setLocation: function (location) {
        return (function (_this) {
            return function (sequence) {
                var ref, settings, x, y;
                settings = (ref = typeof location === "function" ? location() : void 0) != null ? ref : location;
                x = settings.x, y = settings.y;
                if (_this._isFloat(x) || (-1 < x && x < 2)) {
                    x *= Crafty.viewport.width;
                }
                if (_this._isFloat(y) || (-1 < y && y < 2)) {
                    y *= Crafty.viewport.height;
                }
                return _this.entity.attr({
                    x: x - Crafty.viewport.x,
                    y: y - Crafty.viewport.y
                });
            };
        })(this);
    },
    location: function (settings) {
        if (settings == null) {
            settings = {};
        }
        return (function (_this) {
            return function () {
                var ref, ref1, ref2, ref3, ref4, ref5;
                if (_this.decoyingEntity != null) {
                    return {
                        x: (_this.entity.x + Crafty.viewport.x) + (_this.entity.w / 2) + ((ref = settings.offsetX) != null ? ref : 0),
                        y: (_this.entity.y + Crafty.viewport.y) + (_this.entity.h / 2) + ((ref1 = settings.offsetY) != null ? ref1 : 0)
                    };
                } else {
                    return {
                        x: ((ref2 = _this.enemy.location.x) != null ? ref2 : (_this.entity.x + Crafty.viewport.x) + (_this.entity.w / 2)) + ((ref3 = settings.offsetX) != null ? ref3 : 0),
                        y: ((ref4 = _this.enemy.location.y) != null ? ref4 : (_this.entity.y + Crafty.viewport.y) + (_this.entity.h / 2)) + ((ref5 = settings.offsetY) != null ? ref5 : 0)
                    };
                }
            };
        })(this);
    },
    invincible: function (yesNo) {
        return (function (_this) {
            return function (sequence) {
                _this._verify(sequence);
                return _this.entity.invincible = yesNo;
            };
        })(this);
    },
    turnAround: function () {
        return (function (_this) {
            return function (sequence) {
                var ref;
                _this._verify(sequence);
                if (_this.turned == null) {
                    _this.turned = (ref = _this.entity.xFlipped) != null ? ref : false;
                }
                _this.turned = !_this.turned;
                if (_this.turned) {
                    return _this.entity.flipX();
                } else {
                    return _this.entity.unflipX();
                }
            };
        })(this);
    },
    deathDecoy: function () {
        return (function (_this) {
            return function (sequence) {
                var ref, x, y;
                _this._verify(sequence);
                _this.decoy = _this.spawn(_this.options);
                ref = _this.location()(), x = ref.x, y = ref.y;
                _this.decoy.removeComponent('BurstShot');
                _this.decoy.attr({
                    x: x - Crafty.viewport.x,
                    y: y - Crafty.viewport.y,
                    invincible: true,
                    health: 1,
                    defaultSpeed: _this.entity.defaultSpeed
                });
                _this.decoy.updatedHealth();
                if (_this.entity.xFlipped) {
                    _this.decoy.flipX();
                } else {
                    _this.decoy.unflipX();
                }
                _this.decoyingEntity = _this.entity;
                return _this.entity = _this.decoy;
            };
        })(this);
    },
    endDecoy: function () {
        return (function (_this) {
            return function (sequence) {
                var ref;
                if ((ref = _this.decoy) != null) {
                    ref.destroy();
                }
                _this.decoy = null;
                _this.entity = _this.decoyingEntity;
                return _this.decoyingEntity = void 0;
            };
        })(this);
    },
    leaveAnimation: function (task) {
        return (function (_this) {
            return function (sequence) {
                _this._verify(sequence);
                if (_this._skippingToCheckpoint()) {
                    return WhenJS();
                }
                _this.entity.addComponent('KeepAlive');
                task(sequence).then(function () {
                    if (_this.enemy.alive) {
                        return _this.entity.destroy();
                    }
                });
            };
        })(this);
    },
    action: function (name, args) {
        return (function (_this) {
            return function (sequence) {
                _this._verify(sequence);
                if (_this._skippingToCheckpoint()) {
                    return WhenJS();
                }
                return WhenJS(_this.entity.execute(name, args, _this));
            };
        })(this);
    }
};
