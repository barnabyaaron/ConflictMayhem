var Game,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

Game = this.Game;

Game.Scripts || (Game.Scripts = {});

Game.Scripts.PresentationLeaveScreen = (function(superClass) {
    extend(PresentationLeaveScreen, superClass);

    function PresentationLeaveScreen() {
        return PresentationLeaveScreen.__super__.constructor.apply(this, arguments);
    }

    PresentationLeaveScreen.prototype.spawn = function(options) {
        var ship;
        ship = void 0;
        Crafty('PlayerControlledShip').each(function() {
            if (this.playerNumber === options.index + 1) {
                return ship = this;
            }
        });
        if (ship != null) {
            ship.addComponent('Tween', 'Choreography', 'ViewportFixed', 'AnimationMode');
        }
        return ship;
    };

    PresentationLeaveScreen.prototype.execute = function() {
        return this.sequence(this.rotate(0, 200), this.moveTo({
            x: .2,
            y: .45 + (this.options.index * .1),
            speed: 100,
            easing: 'easeInOutQuad'
        }), this.synchronizeOn('waveOff'), this.wait(2000), this.wait(300 * this.options.index), this.moveTo({
            x: 1.1,
            y: .45 + (this.options.index * .1),
            speed: 500,
            easing: 'easeInQuad'
        }));
    };

    return PresentationLeaveScreen;

})(Game.EntityScript);
