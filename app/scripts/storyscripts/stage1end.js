var Game,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

Game = this.Game;

Game.Scripts || (Game.Scripts = {});

Game.Scripts.Stage1End = (function(superClass) {
    extend(Stage1End, superClass);

    function Stage1End() {
        return Stage1End.__super__.constructor.apply(this, arguments);
    }

    Stage1End.prototype.assets = function() {
        return this.loadAssets('explosion');
    };

    Stage1End.prototype.execute = function() {
        return this.sequence(this.parallel(this.sequence(this.disableControls(), this.disableWeapons(), this.placeSquad(Game.Scripts.PresentationLeaveScreen, {
            amount: 2,
            delay: 1000
        })), this.sequence(this.say('This is it for now!\nMore content coming soon!'), this.say('Thanks for playing!\nThe heroes will return...'))), this.screenFadeOut(), this.endGame());
    };

    return Stage1End;

})(Game.StoryScript);
