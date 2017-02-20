var Game,
    slice = [].slice;

Game = {
    paused: false,
    firstLevel: 'Game',
    start: function () {
        var handler, settings;

        Crafty.bind('EnterFrame',
            function() {
                if (Game.paused) {
                    return;
                }
                //return Crafty.trigger.apply(Crafty['GameLoop'].concat(slice.call(arguments)));
            });
        Crafty.paths({
            audio: 'audio/',
            images: 'images/'
        });
        Crafty.init(800, 600);
        Crafty.background('#000000');

        return Crafty.enterScene('loading');
    }
};

window.Game = Game;
