var slice = [].slice;

this.Game.say = function(speaker, text, settings) {
    var avatar, avatarOffset, back, defer, h, i, j, len, line, lines, offset, portrait, ref, speakerText, w, x;

    // Removing exsisting dialogs
    Crafty('Dialog').each(function () {
        this.trigger('Abort');
        return this.destroy();
    });

    lines = text.split('\n');
    x = 60;
    defer = WhenJS.defer();
    w = Crafty.viewport.width * .86;
    h = lines.length + 1;
    if (speaker != null) {
        h += 1;
    }

    

    avatar = (function() {
        switch (speaker) {
        case 'Professor':
            return {
                n: 'pProfessor',
                l: {
                    w: 72,
                    h: 132
                }
            };
        case 'General':
            return {
                n: 'pGeneral',
                l: {
                    w: 75,
                    h: 115
                }
            };
        case 'Pilot':
            return {
                n: 'pPilot',
                l: {
                    w: 71,
                    h: 117
                }
            };
        }
    })();
    if (avatar) {
        h = Math.max(5, h);
    }

    back = Crafty.e('2D, UILayerWebGL, Color, Tween, Dialog').attr({
        w: w,
        h: h * 20,
        alpha: 0.7
    }).color('#000000').attr({
        x: x - 10,
        y: settings.bottom - (h * 20),
        z: 100
    });
    back.bind('Abort', function () {
        return defer.resolve();
    });

    avatarOffset = avatar ? 100 : 0;

    if (avatar != null) {
        portrait = (ref = Crafty.e('2D, UILayerWebGL, SpriteAnimation')
            .addComponent(avatar.n))
            .attr(_.extend(avatar.l,
                {
                    x: back.x + 10,
                    y: back.y - 20,
                    z: back.z + 1
                }))
            .reel('talk', 400, 0, 0, 2)
            .animate('talk', lines.length * 6);
        back.attach(portrait);
        if (settings.noise !== 'none' && (avatar !== null)) {
            portrait.addComponent('Delay');
            portrait.delay(function() {
                    return portrait.attr({
                        alpha: .6 + (Math.random() * .3)
                    });
                },
                159,
                -1);
        }
    }

    offset = 15;
    if (speaker != null) {
        speakerText = Crafty.e('2D, UILayerDOM, Text').attr({
            w: w - 20,
            x: back.x + 10 + avatarOffset,
            y: back.y + 10,
            z: 101,
            alpha: 1
        }).text(speaker).textColor('#707070').textFont({
            size: '10px',
            weight: 'bold',
            family: 'Press Start 2P'
        });
        back.attach(speakerText);
        offset = 30;
    }

    for (i = j = 0, len = lines.length; j < len; i = ++j) {
        line = lines[i];
        back.attach(Crafty.e('2D, UILayerDOM, Text').attr({
            w: w - 20,
            x: back.x + 10 + avatarOffset,
            y: back.y + offset + (i * 20),
            z: 101
        }).text(line).textColor('#909090').textFont({
            size: '10px',
            weight: 'bold',
            family: 'Press Start 2P'
        }));
    }
    Crafty.e('Dialog, Delay').delay(function () {
        defer.resolve();
        return Crafty('Dialog').each(function () {
            return this.destroy();
        });
    }, 3000 * lines.length, 0);
    return defer.promise;
};