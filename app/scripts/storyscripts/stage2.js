var Game,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

Game = this.Game;

Game.Scripts || (Game.Scripts = {});

Game.Scripts.Stage2 = (function(superClass) {
    extend(Stage2, superClass);

    function Stage2() {
        return Stage2.__super__.constructor.apply(this, arguments);
    }

    Stage2.prototype.nextScript = 'Stage1End';

    Stage2.prototype.assets = function() {
        return this.loadAssets('explosion');
    };

    Stage2.prototype.execute = function() {
        return this.sequence(this["if"]((function() {
            return this.player(1).active && !this.player(2).active;
        }), this.sequence(this.say('John', 'I\'ll try to find another way in!'), this.say('General', 'There are rumours about an underground entrance', {
            noise: 'low'
        }), this.say('John', 'Ok I\'ll check it out'))), this["if"]((function() {
            return !this.player(1).active && this.player(2).active;
        }), this.sequence(this.say('Jim', 'I\'ll use the underground tunnels!'), this.say('General', 'How do you know about those...\n' + 'that\'s classified info!', {
            noise: 'low'
        }))), this["if"]((function() {
            return this.player(1).active && this.player(2).active;
        }), this.sequence(this.say('John', 'We\'ll try to find another way in!'), this.say('Jim', 'We can use the underground tunnels!'), this.say('General', 'How do you know about those...\n' + 'that\'s classified info!', {
            noise: 'low'
        }))), this.setScenery('Skyline2'), this.parallel(this.gainHeight(-1300, {
            duration: 30000
        }), this.chapterTitle(2, 'Underground'), this.placeSquad(Game.Scripts.HeliAttack, {
            amount: 3,
            delay: 6000
        })), this.checkpoint(this.checkpointStreets('Skyline2')), this.placeSquad(Game.Scripts.TankAttack), this.placeSquad(Game.Scripts.HeliAttack), this.wait(8000));
    };

    Stage2.prototype.checkpointStreets = function(scenery) {
        return this.sequence(this.setScenery(scenery), this.async(this.runScript(Game.Scripts.SunRise, {
            skipTo: 10 * 60 * 1000
        })), this.wait(6000));
    };

    return Stage2;

})(Game.StoryScript);
