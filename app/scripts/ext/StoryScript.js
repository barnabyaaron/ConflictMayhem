var Game,
  bind = function (fn, me) { return function () { return fn.apply(me, arguments); }; },
  slice = [].slice,
  extend = function (child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Game = this.Game;

Game.StoryScript = (function() {
    function StoryScript(level) {
        this.level = level;
        this._endScriptOnGameOver = bind(this._endScriptOnGameOver, this);
    }

    StoryScript.prototype.run = function() {
        var args, loadingAssets, ref;
        args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
        this.currentSequence = Math.random();
        this.options = (ref = args[0]) != null ? ref : {};
        this.startAtCheckpoint = this.options.startAtCheckpoint;
        this.currentCheckpoint = 0;
        loadingAssets = WhenJS(true);
        if (this.assets != null) {
            loadingAssets = this.assets(this.options)(this.currentSequence);
        }
        return loadingAssets.then((function (_this) {
            return function () {
                return _this.initialize.apply(_this, args);
            };
        })(this));
    };

    StoryScript.prototype.end = function() {
        return this.currentSequence = null;
    };

    StoryScript.prototype.initialize = function() {
        var args;
        args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
        Crafty.bind('PlayerDied', this._endScriptOnGameOver);
        return WhenJS(this.execute.apply(this, args)(this.currentSequence))["finally"]((function (_this) {
            return function () {
                return Crafty.unbind('PlayerDied', _this._endScriptOnGameOver);
            };
        })(this));
    };

    StoryScript.prototype.execute = function () { };

    StoryScript.prototype._endScriptOnGameOver = function() {
        var playersActive;
        playersActive = false;
        Crafty('Player ControlScheme').each(function () {
            if (this.lives > 0) {
                return playersActive = true;
            }
        });
        if (!playersActive) {
            return this.currentSequence = null;
        }
    };

    return StoryScript;
})();

_.extend(Game.StoryScript.prototype,
    Game.ScriptModule.Core,
    Game.ScriptModule.Level,
    Game.ScriptModule.Colors,
    Game.ScriptTemplate.Level);

Game.EntityScript = (function(superClass) {
    extend(EntityScript, superClass);

    function EntityScript() {
        return EntityScript.__super__.constructor.apply(this, arguments);
    }

    EntityScript.prototype.initialize = function() {
        var args, identifier, ref;
        args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
        this.boundEvents = [];
        if (_.isEmpty(args)) {
            args.push({});
        }
        this.entity = this.spawn.apply(this, args);
        if (_.isObject(args[0]) && (args[0].identifier != null)) {
            identifier = args[0].identifier;
            this.entity.addComponent(identifier);
        }
        this.synchronizer = (ref = this.options.synchronizer) != null ? ref : new Game.Synchronizer;
        this.synchronizer.registerEntity(this);
        if (this.entity == null) {
            this.synchronizer.unregisterEntity(this);
            return WhenJS({
                alive: false,
                killedAt: new Date,
                location: null
            });
        }
        if (!this.entity.has('PlayerControlledShip')) {
            this.entity.attr({
                x: this.entity.x - Crafty.viewport.x,
                y: this.entity.y - Crafty.viewport.y
            });
        }
        this.entity.bind('Destroyed',
        (function(_this) {
            return function() {
                _this.currentSequence = null;
                _this.synchronizer.unregisterEntity(_this);
                _this.enemy.location.x = _this.entity.x + Crafty.viewport.x;
                _this.enemy.location.y = _this.entity.y + Crafty.viewport.y;
                _this.enemy.alive = false;
                return _this.enemy.killedAt = new Date;
            };
        })(this));
        this.enemy = {
            moveState: 'air',
            alive: true,
            location: {}
        };
        return EntityScript.__super__.initialize.apply(this, arguments)["catch"]((function(_this) {
            return function(e) {
                if (e.message !== 'sequence mismatch') {
                    throw e;
                }
                if (_this.enemy.alive) {
                    return _this.alternatePath;
                }
            };
        })(this))["finally"]((function(_this) {
            return function() {
                if (_this.enemy.alive && !_this.entity.has('KeepAlive')) {
                    return _this.entity.destroy();
                }
            };
        })(this)).then((function(_this) {
            return function() {
                return _this.enemy;
            };
        })(this));
    };

    EntityScript.prototype.spawn = function() {};

    return EntityScript;
})(Game.StoryScript);

_.extend(Game.EntityScript.prototype, Game.ScriptModule.Entity);