var Game,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

Game = this.Game;

Game.Scripts || (Game.Scripts = {});

Game.Scripts.JumpMine = (function(superClass) {
    extend(JumpMine, superClass);

    function JumpMine() {
        return JumpMine.__super__.constructor.apply(this, arguments);
    }

    JumpMine.prototype.assets = function() {
        return this.loadAssets('mine');
    };

    JumpMine.prototype.spawn = function(options) {
        var ref, ref1, x;
        x = options.direction === 'right' ? Crafty.viewport.width + 180 : -180;
        this.target = options.grid.getLocation();
        this.juice = (ref = options.juice) != null ? ref : true;
        return Crafty.e('Mine').mine({
            x: x,
            y: 440,
            defaultSpeed: (ref1 = options.speed) != null ? ref1 : 200,
            pointsOnHit: options.points ? 10 : 0,
            pointsOnDestroy: options.points ? 50 : 0
        });
    };

    JumpMine.prototype.execute = function() {
        this.bindSequence('Destroyed', this.onKilled);
        return this.sequence(this.moveTo({
            y: 1.05,
            speed: 400
        }), this.moveTo({
            x: this.target.x,
            easing: this.juice ? 'easeOutQuad' : 'linear'
        }), this.moveTo({
            y: this.target.y,
            easing: this.juice ? 'easeOutQuad' : 'linear'
        }), this.parallel(this.sequence(this.synchronizeOn('placed'), this.animate('open'), this.wait(200), this.moveTo({
            x: -50,
            speed: 35
        })), this.sequence(this.wait(4000), this.animate('blink', -1), this.wait(1000), (function(_this) {
            return function() {
                return _this.entity.absorbDamage({
                    damage: _this.entity.health
                });
            };
        })(this), this.endSequence())));
    };

    JumpMine.prototype.onKilled = function() {
        return this.bigExplosion({
            juice: this.juice
        });
    };

    return JumpMine;

})(Game.EntityScript);
