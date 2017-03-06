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

    if (!data.DEBUG) {
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
        }).text('Your mission is to escort the VIP to headquarters.').textColor('#FFF').textFont({
            size: '12px',
            family: 'Press Start 2P'
        });

        Crafty.e('2D, DOM, Text').attr({
            x: professor.x + 250,
            y: professor.y + 70,
            w: 600
        }).text('You will take our most advanced ship, fitted with hypersonic engines\nand our most advanced weaponry.').textColor('#FFF').textFont({
            size: '12px',
            family: 'Press Start 2P',
            lineHeight: '20px'
        });

        Crafty.e('2D, DOM, Text').attr({
            x: professor.x + 250,
            y: professor.y + 140,
            w: 600
        }).text('We expect light or no resistance so should be a simple mission.').textColor('#FFF').textFont({
            size: '12px',
            family: 'Press Start 2P',
            lineHeight: '20px'
        });

        Crafty.e('2D, DOM, Text').attr({
            x: professor.x + 250,
            y: professor.y + 200,
            w: 600
        }).text('Once you reach headquarters report back for further instructions.').textColor('#FFF').textFont({
            size: '12px',
            family: 'Press Start 2P',
            lineHeight: '20px'
        });

        Crafty.e('2D, DOM, Text').attr({
            x: professor.x + 250,
            y: professor.y + 260,
            w: 600
        }).text('Good Luck Pilot.').textColor('#FFF').textFont({
            size: '12px',
            family: 'Press Start 2P',
            lineHeight: '20px'
        });
    } else {
        Crafty.e('2D, DOM, Text').attr({
            x: 100,
            y: 50,
            w: Crafty.viewport.width - 100
        }).text('TESTING MODE').textColor('#FFF').textFont({
            size: '12px',
            family: 'Press Start 2P'
        });

        Crafty.e('2D, DOM, Text').attr({
            x: 100,
            y: 100,
            w: Crafty.viewport.width - 100
        }).text('Testing mode is a sandbox mode allowing developer to test new scripts and assets.').textColor('#FFF').textFont({
            size: '12px',
            family: 'Press Start 2P'
        });

        Crafty.e('2D, DOM, Text').attr({
            x: 100,
            y: 150,
            w: Crafty.viewport.width - 100
        }).text('Use \'N\' key to move to next story sequence').textColor('#FFF').textFont({
            size: '12px',
            family: 'Press Start 2P',
            lineHeight: '20px'
        });
    }

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
