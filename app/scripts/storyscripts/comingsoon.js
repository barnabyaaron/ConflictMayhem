/**
 * Created by Aaron on 27/02/2017.
 */
var Game,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

Game = this.Game;

Game.Scripts || (Game.Scripts = {});

Game.Scripts.ComingSoon = (function(superClass) {
    extend(ComingSoon, superClass);

    function ComingSoon() {
        return ComingSoon.__super__.constructor.apply(this, arguments);
    }

    ComingSoon.prototype.assets = function() {
        return this.loadAssets('explosion');
    };

    ComingSoon.prototype.execute = function() {
        return this.sequence(
            this.parallel(
                this.sequence(
                    this.disableControls(),
                    this.disableWeapons(),
                    this.placeSquad(Game.Scripts.PresentationLeaveScreen, {
                        amount: 2,
                        delay: 1000
                    })
                ),
                this.say('That\'s all for now!\nMore content coming soon!')
            ),
            this.screenFadeOut(),
            this.endGame()
        );
    };

    return ComingSoon;
})(Game.StoryScript);
