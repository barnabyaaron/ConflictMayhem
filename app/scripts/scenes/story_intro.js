Crafty.scene('Story_Intro', function(data) {
    var Game, entry, h, offset, w;
    Game = window.Game;
    Game.resetCredits();
    Crafty.background('#000');
    Crafty.viewport.x = 0;
    Crafty.viewport.y = 0;
    w = Crafty.viewport.width;
    h = Crafty.viewport.height;
    offset = .15;

    if (!data) {
        data = {
            DEBUG: false
        };
    }

    var professor = Crafty.e('2D, DOM, pProfessorFull, SpriteAnimation').attr({
        x: (w * .1),
        y: (h * .5) - 190,
        w: 210,
        h: 380
    }).reel('talk', 500, 0, 0, 2).animate('talk', 20);

    Crafty.e('2D, DOM, Text').attr({
        x: professor.x + 250,
        y: professor.y,
        w: 600
    }).text('Welcome Pilot!').textColor('#FFF').textFont({
        size: '12px',
        family: 'Press Start 2P'
    });

    Crafty.e('2D, DOM, Text').attr({
        x: professor.x + 250,
        y: professor.y + 24,
        w: 600
    }).text('Today is your first day out in space, we have reports of unknown entities heading our way so we are sending you to intercept.').textColor('#FFF').textFont({
        size: '12px',
        family: 'Press Start 2P',
        lineHeight: '22px'
    });

    Crafty.e('2D, DOM, Text').attr({
        x: professor.x + 250,
        y: professor.y + 100,
        w: 600
    }).text('You will take our most advanced ship, fitted with hypersonic engines\nand our most advanced weaponry.').textColor('#FFF').textFont({
        size: '12px',
        family: 'Press Start 2P',
        lineHeight: '22px'
    });

    Crafty.e('2D, DOM, Text').attr({
        x: professor.x + 250,
        y: professor.y + 160,
        w: 600
    }).text('Good Luck Pilot.').textColor('#FFF').textFont({
        size: '12px',
        family: 'Press Start 2P',
        lineHeight: '22px'
    });

    Crafty.e('2D, DOM, Text, Tween, Delay').attr({
        x: (w * .5) - 150,
        y: h * .9,
        w: 300
    }).text('Press fire to start!').textColor('#FF0000').textFont({
        size: '15px',
        weight: 'bold',
        family: 'Press Start 2P'
    }).delay(function() {
        this.tween({
            alpha: 0.5
        }, 1000);
        return this.one('TweenEnd', function() {
            return this.tween({
                alpha: 1
            }, 1000);
        });
    }, 2000, -1);
    Crafty('Player').each(function() {
        this.reset();
        return this.one('Activated', function() {
            return Crafty.enterScene(Game.firstLevel, data);
        });
    });
}, function() {
    Crafty('Delay').each(function() {
        return this.destroy();
    });
    return Crafty('Player').each(function() {
        return this.unbind('Activated');
    });
});
