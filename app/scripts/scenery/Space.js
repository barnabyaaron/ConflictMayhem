var Game, generator,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

generator = this.Game.levelGenerator;

Game = this.Game;

generator.defineElement('rock', function() {
    var blur, c1, c2, h, s, v, w, y;
    v = Math.random();
    blur = Math.random() * 4.0;
    if (v > .8) {
        y = (Math.random() * 20) + 30;
        w = (Math.random() * 20) + 125;
        h = (Math.random() * 10) + 50;
        c1 = Crafty.e('2D, WebGL, rock, Hideable, Horizon').attr({
            z: -300,
            w: w,
            h: h,
            topDesaturation: 0.6,
            bottomDesaturation: 0.6,
            alpha: (Math.random() * 0.8) + 0.2,
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
        y = 230 - (s * 150);
        w = ((Math.random() * 10) + 70) - (s * 20);
        h = ((Math.random() * 5) + 20) - (s * 10);
        c2 = Crafty.e('2D, WebGL, rock, Hideable, Horizon').attr({
            z: -570,
            w: w,
            h: h,
            topDesaturation: 1.0 - s,
            bottomDesaturation: 1.0 - s,
            alpha: (Math.random() * 0.8) + 0.2,
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
                'space-scenery.png': {
                    tile: 32,
                    tileh: 32,
                    map: {
                        space_black: [0, 0, 16, 16],
                        space_blue: [16, 0, 16, 16],
                        space_purple: [32, 0, 16, 16],
                        asteroid: [0, 16, 4, 3],
                        asteroid2: [4, 16, 4, 3],
                        asteroid3: [8, 16, 3, 3],
                        asteroid4: [11, 16, 3, 3],
                        rock: [0, 19, 4, 3],
                        rock2: [4, 19, 4, 3],
                        rock3: [8, 19, 3, 3],
                        rock4: [11, 19, 3, 3]
                    }
                },
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

    _Class.prototype.name = 'Space.Void';

    _Class.prototype.delta = {
        x: 1024,
        y: 0
    };

    _Class.prototype.generate = function() {
        _Class.__super__.generate.apply(this, arguments);
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
