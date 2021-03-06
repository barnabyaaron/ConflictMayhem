var Game,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

Game = this.Game;

Game.Scripts || (Game.Scripts = {});

Game.Scripts.MineWall = (function(superClass) {
    extend(MineWall, superClass);

    function MineWall() {
        return MineWall.__super__.constructor.apply(this, arguments);
    }

    MineWall.prototype.spawn = function(options) {
        this.startX = options.direction === 'left' ? -80 : 680;
        this.screenX = options.direction === 'left' ? 20 : 620;
        this.wallX = options.direction === 'left' ? 100 : 540;
        this.wallTarget = options.grid.getLocation();
        return Crafty.e('Mine').mine({
            x: this.startX,
            y: 240,
            defaultSpeed: 200
        });
    };

    MineWall.prototype.execute = function() {
        this.bindSequence('Destroyed', this.onKilled);
        return this.sequence(this.movePath([[this.screenX, 240], [this.wallX, this.wallTarget.y]], {
            rotate: false,
            speed: 600
        }), this.synchronizeOn('placed'), this.pickTarget('PlayerControlledShip'), this.repeat(this.seekAndDestroy()));
    };

    MineWall.prototype.seekAndDestroy = function() {
        return this.moveTo(this.targetLocation());
    };

    MineWall.prototype.onKilled = function() {
        return this.blast(this.location(), {
            damage: 300,
            radius: 40
        });
    };

    return MineWall;

})(Game.EntityScript);
