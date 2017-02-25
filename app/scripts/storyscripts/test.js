var Game,
  extend = function (child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

Game = this.Game;

Game.Scripts || (Game.Scripts = {});

Game.Scripts.Test = (function (superClass) {
    extend(Test, superClass);

    function Test() {
        return Test.__super__.constructor.apply(this, arguments);
    }

    Test.prototype.assets = function () {
        return this.loadAssets('playerShip');
    };

    Test.prototype.execute = function () {
        this.inventoryAdd('weapon', 'lasers', {
            marking: 'L'
        });

        return this.sequence(this.setScenery('Blackness'), this.setWeapons([]), this.enableWeapons(), this.setWeapons(['lasers']), this.setSpeed(50), this.testEnemy());
    };

    Test.prototype.testEnemy = function (amount) {
        return this.placeSquad(Game.Scripts.EnemyTestScript, {
            amount: amount,
            delay: 2500,
            options: {
                entityName: 'NewEnemyNameHere',
                assetsName: 'newEnemyNameHere'
            }
        });
    };

    Test.prototype.oldEnemy = function (amount) {
        return this.placeSquad(Game.Scripts.Swirler, {
            amount: amount,
            delay: 2500
        });
    };

    return Test;

})(Game.StoryScript);

Game.Scripts.EnemyTestScript = (function (superClass) {
    extend(EnemyTestScript, superClass);

    function EnemyTestScript() {
        return EnemyTestScript.__super__.constructor.apply(this, arguments);
    }

    EnemyTestScript.prototype.assets = function (options) {
        var ref;
        return this.loadAssets((ref = options.assetsName) != null ? ref : 'shadow');
    };

    EnemyTestScript.prototype.spawn = function (options) {
        return Crafty.e(options.entityName).initEnemy({
            x: Crafty.viewport.width + 40,
            y: Crafty.viewport.height / 2
        });
    };

    EnemyTestScript.prototype.execute = function () {
        return this.sequence(this.setLocation({
            x: .5,
            y: .5
        }), this.wait(2000), (function (_this) {
            return function () {
                return _this.entity.flipX();
            };
        })(this), this.wait(2000), this.moveTo({
            x: 1.1,
            y: .5,
            easing: 'easeInQuad'
        }), this.movePath([[.5, .21], [.156, .5], [.5, .833]]), this.movePath([[.86, .52], [-100, .21]], {
            continuePath: true,
            speed: 400
        }));
    };

    return EnemyTestScript;

})(Game.EntityScript);

Crafty.c('EnemyPart', {
    autoAdjustSize: function () {
        var h, tz, w;
        w = Math.floor(this.w / 32);
        h = Math.floor(this.h / 32);
        tz = 16;
        return this.attr({
            w: w * tz,
            h: h * tz
        });
    }
});

Crafty.c('NewEnemyNameHere', {
    init: function () {
        this.requires('Enemy, droneBody, EnemyPart');
        return this.parts = {};
    },
    initEnemy: function (attr) {
        if (attr == null) {
            attr = {};
        }
        this.attr(_.defaults(attr, {
            health: 200,
            defaultSpeed: 200
        }));
        this.autoAdjustSize();
        this.definePart('tfWing', 'droneTopFrontWing', 30, -3, 1);
        this.parts['tfWing'].origin(5, 10);
        this.definePart('tbWing', 'droneTopBackWing', 15, -1, -1);
        this.parts['tbWing'].origin(5, 10);
        this.definePart('bfWing', 'droneBottomFrontWing', 30, 15, 1);
        this.parts['bfWing'].origin(5, 5);
        this.definePart('bbWing', 'droneBottomBackWing', 20, 15, -1);
        this.parts['bbWing'].origin(5, 5);
        this.definePart('blades', 'droneRotorBlades', 15, 6, 2);
        this.parts['blades'].origin('center');
        this.origin('center');
        this.attr({
            weaponOrigin: [2, 25]
        });
        this.enemy();
        return this;
    },
    definePart: function (id, sprite, x, y, z) {
        var ent;
        ent = Crafty.e('WebGL, EnemyPart').addComponent(sprite);
        this.parts[id] = ent;
        ent.autoAdjustSize();
        ent.attr({
            x: this.x + x,
            y: this.y + y,
            z: this.z + z
        });
        return this.attach(ent);
    },
    updateMovementVisuals: function (rotation, dx, dy, dt) {
        var speed;
        speed = Math.abs((1000 / dt) * dx);
        if (dx > 0) {
            this.flipX();
        } else {
            this.unflipX();
        }
        if (rotation != null) {
            this.updateBladeRotation(rotation, dx);
        }
        return this.updateWingRotation(speed, dx);
    },
    updateBladeRotation: function (rotation, dx) {
        if (dx > 0) {
            rotation += 180;
        }
        rotation = (360 + rotation) % 360;
        if (rotation < 180) {
            rotation /= 2;
        } else {
            rotation = ((rotation - 360) / 2) + 360;
        }
        return this.parts['blades'].rotation = -rotation;
    },
    updateWingRotation: function (speed, dx) {
        var m;
        m = dx > 0 ? -1 : 1;
        this.rotatePart('tfWing', speed, -20, 25, m);
        this.rotatePart('tbWing', speed, -20, 25, m);
        this.rotatePart('bfWing', speed, 25, -20, m * -1);
        return this.rotatePart('bbWing', speed, 25, -20, m * -1);
    },
    rotatePart: function (part, speed, min, max, m) {
        var current, target;
        target = this.wingRotation(speed, min, max) * m;
        target = (360 + target + 180) % 360;
        current = (this.parts[part].rotation + 180) % 360;
        if (current > target) {
            return this.parts[part].rotation -= 1;
        } else if (current < target) {
            return this.parts[part].rotation += 1;
        }
    },
    wingRotation: function (speed, min, max) {
        var maxSpeed;
        if (speed < this.defaultSpeed) {
            return ((this.defaultSpeed - speed) / this.defaultSpeed) * -20;
        } else {
            maxSpeed = this.defaultSpeed * 2;
            return ((maxSpeed - this.defaultSpeed) / maxSpeed) * 25;
        }
    }
});

Game.levelGenerator.defineAssets('newAwesomeSpriteSheet', {
    contents: ['newEnemyNameHere'],
    spriteMap: 'high-drone.png',
    sprites: {
        newEnemyNameHere: {
            tile: 32,
            tileh: 32,
            map: {
                droneBody: [0, 0, 3, 2],
                droneTopFrontWing: [3, 0, 2, 1],
                droneBottomFrontWing: [3, 1, 2, 1],
                droneBottomBackWing: [2, 2, 2, 1],
                droneTopBackWing: [4, 2, 2, 1],
                droneRotorBlades: [0, 2, 2, 1]
            }
        }
    }
});
