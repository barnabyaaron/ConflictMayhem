var Game,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

Game = this.Game;

Game.Scripts || (Game.Scripts = {});

Game.Scripts.Train = (function(superClass) {
    extend(Train, superClass);

    function Train() {
        return Train.__super__.constructor.apply(this, arguments);
    }

    Train.prototype.spawn = function() {
        var p;
        p = Crafty.e('Enemy, Color').attr({
            x: -1200,
            y: 160,
            defaultSpeed: 20,
            health: 900,
            w: 1100,
            h: 270
        }).enemy({
            projectile: 'TrainBullet'
        }).color('#808080');
        return p;
    };

    Train.prototype.execute = function() {
        this.bindSequence('Destroyed', this.onKilled);
        this.bindSequence('Progress', this.progress);
        this.point = -1050;
        this.entity.currentY = this.entity.y;
        return this.sequence(this.moveTo({
            x: this.point
        }), this.repeat(this.sequence(this.moveTo({
            y: 165,
            speed: 10
        }), this.moveTo({
            y: 155,
            speed: 10
        }))));
    };

    Train.prototype.progress = function() {
        var p;
        this.bindSequence('Progress', this.progress);
        p = this.point;
        this.point += 200;
        return this.sequence(this.moveTo({
            x: p - 40,
            speed: 50
        }), this.wait(500), this.moveTo({
            x: this.point,
            speed: 150
        }), this.repeat(this.sequence(this.moveTo(((function(_this) {
            return function() {
                return {
                    y: _this.entity.currentY
                };
            };
        })(this)), {
            speed: 10,
            positionType: 'absoluteY'
        }), this.moveTo(((function(_this) {
            return function() {
                return {
                    y: _this.entity.currentY + 10
                };
            };
        })(this)), {
            speed: 10,
            positionType: 'absoluteY'
        }))));
    };

    Train.prototype.onKilled = function() {
        return this.bigExplosion();
    };

    return Train;

})(Game.EntityScript);
