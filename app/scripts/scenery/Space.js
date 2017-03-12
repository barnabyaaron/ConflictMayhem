var Game, generator,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

generator = this.Game.levelGenerator;

Game = this.Game;

generator.defineElement('rock', function() {
    var blur, c1, c2, s, v, y, sn, id;

    // Get a sprite
    // rock[1-5] - rock_small[1-7] - grey_rock[1-4] - grey_rock_small[1-6]
    var t = Math.random();
    if (t > .8) {
        id = Math.random() * (5 - 1) + 1;
        sn = "rock" + id.toFixed(0);
    } else if (t > .6) {
        id = Math.random() * (7 - 1) + 1;
        sn = "rock_small" + id.toFixed(0);
    } else if (t > .4) {
        id = Math.random() * (4 - 1) + 1;
        sn = "grey_rock" + id.toFixed(0);
    } else {
        id = Math.random() * (6 - 1) + 1;
        sn = "grey_rock_small" + id.toFixed(0);
    }

    v = Math.random();
    blur = Math.random() * 4.0;
    y = Crafty.viewport.height * Math.random();
    if (v > .8) {
        c1 = Crafty.e('2D, WebGL, ' + sn + ', Hideable, Horizon').attr({
            z: -300,
            w: 136,
            h: 111,
            topDesaturation: 0.6,
            bottomDesaturation: 0.6,
            lightness: .4,
            blur: blur
        });
        if (Math.random() < 0.7) {
            c1 = c1.flip('X');
        }
        this.addBackground(20 + (Math.random() * 400), y, c1, .375);
    }
    if (v < .2) {
        s = (Math.random() * .20) + .15;
        c2 = Crafty.e('2D, WebGL, ' + sn + ', Hideable, Horizon').attr({
            z: -570,
            w: 136,
            h: 111,
            topDesaturation: 1.0 - s,
            bottomDesaturation: 1.0 - s,
            lightness: .4,
            blur: blur
        });
        if (Math.random() < 0.2) {
            c2 = c2.flip('X');
        }
        return this.addBackground(60 + Math.random() * 400, y, c2, s);
    }
});

generator.defineElement('space', function() {
   var e;
   e = Crafty.e('2D, WebGL, space, Horizon').attr({
       z: -598,
       w: Crafty.viewport.width,
       h: Crafty.viewport.height
   });
   return this.addBackground(0, this.level.visibleHeight - Crafty.viewport.height, e, .25);
});

generator.defineElement('liteSpace', function() {
    var e;
    e = Crafty.e('2D, WebGL, space_lite, Horizon').attr({
        z: -598,
        w: Crafty.viewport.width,
        h: Crafty.viewport.height
    });
    return this.addBackground(0, this.level.visibleHeight - Crafty.viewport.height, e, .25);
});

generator.defineElement('redSpace', function() {
    var e;
    e = Crafty.e('2D, WebGL, space_red, Horizon').attr({
        z: -598,
        w: Crafty.viewport.width,
        h: Crafty.viewport.height
    });
    return this.addBackground(0, this.level.visibleHeight - Crafty.viewport.height, e, .25);
});

Game.SpaceScenery = (function(superClass) {
    extend(SpaceScenery, superClass);

    function SpaceScenery() {
        return SpaceScenery.__super__.constructor.apply(this, arguments);
    }

    SpaceScenery.prototype.assets = function() {
        return {
            sprites: {
                'space_bg.png': {
                    tile: 512,
                    tileh: 512,
                    map: {
                        space: [0, 0]
                    }
                },
                'space_bg_lite.png': {
                    tile: 512,
                    tileh: 512,
                    map: {
                        space_lite: [0, 0]
                    }
                },
                'space_bg_red.png': {
                    tile: 500,
                    tileh: 500,
                    map: {
                        space_red: [0, 0]
                    }
                },
            }
        }
    };

    return SpaceScenery;
})(Game.LevelScenery);

generator.defineBlock((function(superClass) {
    extend(_Class, superClass);

    function _Class() {
        return _Class.__super__.constructor.apply(this, arguments);
    }

    _Class.prototype.name = 'Space.Intro';

    _Class.prototype.delta = {
        x: 1024,
        y: 0
    };

    _Class.prototype.autoNext = 'Void';

    _Class.prototype.generate = function() {
        _Class.__super__.generate.apply(this, arguments);
        this.addElement('liteSpace');
        return this.addElement('rock');
    };

    _Class.prototype.enter = function() {
        var block, c, ship;
        _Class.__super__.enter.apply(this, arguments);
        Crafty('ScrollWall').attr({
            x: -100
        });
        c = [
            {
                type: 'linear',
                x: (Crafty.viewport.width * .3) - 100,
                easingFn: 'easeInOutQuad',
                duration: 1200,
                event: 'flyIn'
            },
            {
                type: 'linear',
                x: -300,
                duration: 1200,
                easingFn: 'easeInOutQuad'
            },
            {
                type: 'delay',
                duration: 1,
                event: 'go'
            }
        ];
        block = this;
        ship = null;

        return Crafty('PlayerControlledShip').each(function(index) {
            if (index !== 0) {
                return;
            }
            ship = this;
            this.addComponent('Choreography');
            this.attr({
                x: -50,
                y: Crafty.viewport.height / 2 - (this.h / 2)
            });
            this.disableControl();
            this.weaponsEnabled = false;
            this.choreography(c);
            this.currentRenderedSpeed = 400;
            this.one('ChoreographyEnd', (function(_this) {
                return function() {
                    return _this.removeComponent('Choreography', 'no');
                }
            })(this));
            this.one('flyIn', function() {
                return Crafty('ScrollWall').each(function() {
                    this.addComponent('Tween');
                    this.tween({
                        x: 0
                    }, 2500);
                    return this.one('TweenEnd', function() {
                        return this.removeComponent('Tween', false);
                    })
                });
            });
            this.one('go', (function(_this) {
                return function() {
                    this.enableControl();
                    return this.weaponsEnabled = true;
                };
            })(this));
        });
    };

    return _Class;
})(Game.LevelScenery));

generator.defineBlock((function(superClass) {
    extend(_Class, superClass);

    function _Class() {
        return _Class.__super__.constructor.apply(this, arguments);
    }

    _Class.prototype.name = 'Space.Void';

    _Class.prototype.delta = {
        x: 1024,
        y: 0
    };

    _Class.prototype.generate = function() {
        _Class.__super__.generate.apply(this, arguments);
        this.addElement('rock');
        this.addElement('rock');
        return this.addElement('space');
    };

    return _Class;

})(Game.SpaceScenery));

generator.defineBlock((function(superClass) {
    extend(_Class, superClass);

    function _Class() {
        return _Class.__super__.constructor.apply(this, arguments);
    }

    _Class.prototype.name = 'Space.Lite';

    _Class.prototype.delta = {
        x: 1024,
        y: 0
    };

    _Class.prototype.generate = function() {
        _Class.__super__.generate.apply(this, arguments);
        this.addElement('rock');
        return this.addElement('liteSpace');
    };

    return _Class;

})(Game.SpaceScenery));

generator.defineBlock((function(superClass) {
    extend(_Class, superClass);

    function _Class() {
        return _Class.__super__.constructor.apply(this, arguments);
    }

    _Class.prototype.name = 'Space.Red';

    _Class.prototype.delta = {
        x: 1024,
        y: 0
    };

    _Class.prototype.generate = function() {
        _Class.__super__.generate.apply(this, arguments);
        this.addElement('rock');
        this.addElement('rock');
        return this.addElement('redSpace');
    };

    return _Class;

})(Game.SpaceScenery));
