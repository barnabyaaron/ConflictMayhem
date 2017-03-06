var Game,
    extend = function (child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

Game = this.Game;

Game.Scripts || (Game.Scripts = {});

Game.Scripts.EnemyFighter = (function (superClass) {
    extend(EnemyFighter, superClass);

    function EnemyFighter() {
        return EnemyFighter.__super__.constructor.apply(this, arguments);
    }

    EnemyFighter.prototype.assets = function() {
        return this.loadAssets('enemy');
    };

    EnemyFighter.prototype.onKilled = function() {
        return this.sequence(
            this.deathDecoy(),
            this.smallExplosion({
                juice: this.juice,
                offsetX: 20,
                offsetY: 20
            }),
            this.endDecoy()
        );
    };

    return EnemyFighter;
})(Game.EntityScript);

Game.Scripts.Invaders = (function (superclass) {
    extend(Invaders, superclass);

    function Invaders() {
        return Invaders.__super__.constructor.apply(this, arguments);
    }

    Invaders.prototype.spawn = function (options) {
        var d, ref;
        d = Crafty.e('Fighter').fighter('enemy' ,{
            x: Crafty.viewport.width + 40,
            y: Crafty.viewport.height / 2,
            defaultSpeed: (ref = options.speed) != null ? ref : 300,
            juice: options.juice
        });
        this.juice = options.juice;

        // @TODO add firing component
        return d;
    };

    Invaders.prototype.execute = function () {
        this.bindSequence('Destroyed', this.onKilled);
        return this.sequence(
            this.repeat(2, this.sequence(
                this.moveTo({
                    x: .8,
                    y: .1
                }, {
                    speed: 200,
                    easing: 'easeInOutQuad'
                }),
                this.wait(200),
                this.moveTo({
                    x: .8,
                    y: .7
                }, {
                    speed: 200,
                    easing: 'easeInOutQuad'
                }),
                this.wait(200)
            )),
            this.pickTarget('PlayerControlledShip'),
            this.moveTo(this.targetLocation(), {
                x: .8,
                speed: 200,
                easing: 'easeInOutQuad'
            }),
            this.wait(200),
            this.moveTo({
                x: -50,
                speed: 400,
                easing: 'easeInQuad'
            })
        );
    };

    return Invaders;
})(Game.Scripts.EnemyFighter);
