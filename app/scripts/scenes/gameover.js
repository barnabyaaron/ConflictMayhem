Crafty.scene('GameOver', function (data) {
    var Game, h, text, w;
    Game = window.Game;
    Crafty.background('#000');
    Crafty.viewport.x = 0;
    Crafty.viewport.y = 0;
    w = Crafty.viewport.width;
    h = Crafty.viewport.height;
    text = 'Game Over';
    if (data.gameCompleted) {
        text = 'Congratulations';
    }
    Crafty.e('2D, DOM, Text').attr({
        x: 0,
        y: h * .2,
        w: w
    }).text(text).textColor('#FF0000').textAlign('center').textFont({
        size: '50px',
        weight: 'bold',
        family: 'Press Start 2P'
    });

    return Crafty.e('Delay').delay(function() {
        var e, prefix, time;
        if (Game.credits > 0 && !data.gameCompleted) {
            time = 10;
            text = Game.credits === 1 ? "1 Credit left" : Game.credits + " Credits left";
            Crafty.e('2D, DOM, Text').attr({
                x: 0,
                y: h * .8,
                w: w
            }).textColor('#FF0000').textAlign('center').textFont({
                size: '15px',
                weight: 'bold',
                family: 'Press Start 2P'
            }).text(text);
            e = Crafty.e('2D, DOM, Text').attr({
                x: 0,
                y: (h * .8) + 30,
                w: w
            }).textColor('#FF0000').textAlign('center').textFont({
                size: '15px',
                weight: 'bold',
                family: 'Press Start 2P'
            });
            prefix = "Press fire to continue";
            e.text(prefix + " " + (("00" + time).slice(-2)));
            this.delay(function() {
                    time -= 1;
                    return e.text(prefix + " " + (("00" + time).slice(-2)));
                },
                1000,
                time,
                function() {
                    return Crafty.enterScene('mainmenu');
                });

            return Crafty('Player').each(function() {
                this.reset();
                return this.one('Activated',
                    function() {
                        Game.credits -= 1;
                        return Crafty.enterScene(Game.firstLevel, data);
                    });
            });
        } else {
            return this.delay(function() {
                    return Crafty.enterScene('mainmenu');
                },
                5000);
        }
    });
}, function () {
    Crafty('Delay').each(function () {
        return this.destroy();
    });
    return Crafty('Player').each(function () {
        return this.unbind('Activated');
    });
});