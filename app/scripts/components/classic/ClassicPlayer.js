this.ClassicPlayerConstants = (function() {
    function ClassicPlayerConstants() { }

    ClassicPlayerConstants.WIDTH = ClassicPlayerConstants.HEIGHT = 64;

    ClassicPlayerConstants.SPEED = 200;

    ClassicPlayerConstants.MOVEMENT_ANIMATION_DURATION = 250;

    ClassicPlayerConstants.FIRE_ANIMATION_DURATION = 300;

    ClassicPlayerConstants.RELOAD_ANIMATION_DURATION = 500;

    ClassicPlayerConstants.SHOT_SPEED = 8;

    ClassicPlayerConstants.SHOT_IDLE_X = -100;

    ClassicPlayerConstants.SHOT_IDLE_Y = -100;

    return ClassicPlayerConstants;
})();

Crafty.c('ClassicPlayerCommon',
{
    init: function () {
        this.tmp = null;
        this.requires("2D, DOM, Multiway");
        this.multiway(ClassicPlayerConstants.SPEED,
        {
            LEFT_ARROW: 180,
            RIGHT_ARROW: 0,
            D: 0,
            A: 180
        });
        this.bind("NewDirection",
            function (info) {
                return this.direction = info;
            });
        return this.bind("Moved",
            function (from) {
                if (from.axis === 'x') {
                    if (this.movingOutsidePlayfield(from.oldValue, this.direction)) {
                        return this.attr({
                            x: from.oldValue
                        });
                    }
                }
            });
    },
    movingOutsidePlayfield: function (x, direction) {
        this.tmp = x + direction.x;
        return (this.tmp <= 0) || (this.tmp + this.w >= Crafty.viewport.width);
    }
});

Crafty.c('ClassicPlayer',
{
    init: function () {
        this.requires('Keyboard');
        this.body = Crafty.e('ClassicPlayerBody');
        this.cannon = Crafty.e('ClassicPlayerCannon');
        this.shot = Crafty.e('ClassicPlayerShot');
        this.explosion = Crafty.e('ClassicExplosion').explosion('classic_playerExplosion', 3, 1000, 2);
        this.isShooting = false;
        this.shootingDisabled = false;
        this.enableControl();
        this.shotHit = (function (_this) {
            return function (hitInfo) {
                var target;
                target = hitInfo[0].obj;
                if (target.has('ClassicAlien')) {
                    _this.trigger('AlienHit', target);
                }
                if (target.has('ClassicShield')) {
                    _this.trigger('ShieldHit', target);
                }
                if (target.has('ClassicAlienShot')) {
                    _this.trigger('AlienShotHit', target);
                }
                if (target.has('ClassicSpaceship')) {
                    _this.trigger('SpaceshipHit', [_this.shot, target]);
                }
                return _this.shot.stop();
            };
        })(this);
        this.playerHit = (function (_this) {
            return function (hitInfo) {
                var target;
                target = hitInfo[0].obj;
                if (target.has('ClassicAlien')) {
                    return _this.trigger('HitByAlien', target);
                }
            };
        })(this);
        this.shot.bind("HitOn", this.shotHit);
        this.body.bind("HitOn", this.playerHit);
        return this.explosion.bind("ExplosionEnded", (function (_this) {
            return function () {
                return _this.respawn();
            };
        })(this));
    },
    setPosition: function (x, y) {
        this.body.attr({
            x: x,
            y: y
        });
        this.cannon.attr({
            x: x,
            y: y
        });
        return this;
    },
    x: function () {
        return this.body.x;
    },
    y: function () {
        return this.body.y;
    },
    show: function () {
        this.body.attr({
            visible: true
        });
        return this.cannon.attr({
            visible: true
        });
    },
    hide: function () {
        this.body.attr({
            visible: false
        });
        return this.cannon.attr({
            visible: false
        });
    },
    shoot: function () {
        if (!this.shot.isActive()) {
            this.cannon.fire();
            this.shot.fireFrom(this.x() + 29, this.y() + 16);

            Crafty.audio.play('classic_player_shoot');
        }
        return this;
    },
    die: function () {
        if (this.isDead() === false) {
            this.explosion.explodeAt(this.body.x, this.body.y);
            this.disableControl();
            this.stopShooting();
            this.hide();

            Crafty.audio.play('classic_player_die');

            return true;
        }
        return false;
    },
    isDead: function () {
        return !this.body._visible;
    },
    respawn: function () {
        return this.trigger("Respawning", this);
    },
    remove: function () {
        this.body.destroy();
        this.cannon.destroy();
    },
    keyDown: function () {
        if (this.isDown(Crafty.keys.SPACE) && this.shootingDisabled === false) {
            return this.startShooting();
        }
    },
    keyUp: function () {
        if (!this.isDown(Crafty.keys.SPACE)) {
            return this.stopShooting();
        }
    },
    startShooting: function () {
        if (!this.isShooting) {
            this.isShooting = true;
            this.shoot();
            return this.bind("ShotStopped", this.shoot);
        }
    },
    stopShooting: function () {
        if (this.isShooting) {
            this.isShooting = false;
            return this.unbind("ShotStopped", this.shoot);
        }
    },
    enableControl: function () {
        this.enableShooting();
        this.bind("KeyDown", this.keyDown);
        return this.bind("KeyUp", this.keyUp);
    },
    disableControl: function () {
        this.disableShooting();
        this.unbind("KeyDown", this.keyDown);
        return this.unbind("KeyUp", this.keyUp);
    },
    disableShooting: function () {
        return this.shootingDisabled = true;
    },
    enableShooting: function () {
        return this.shootingDisabled = false;
    }
});

Crafty.c("ClassicPlayerBody",
{
    init: function () {
        this.requires("ClassicPlayerCommon, classic_bodySprite, SpriteAnimation, Collision");
        this.reel("MoveRight", ClassicPlayerConstants.MOVEMENT_ANIMATION_DURATION, 0, 0, 8);
        this.reel("MoveLeft", ClassicPlayerConstants.MOVEMENT_ANIMATION_DURATION, 7, 0, -8);
        this.collision(new Crafty.polygon(12, 32, 12, 64, 52, 64, 52, 32));
        this.checkHits('ClassicAlien');
        this.bind("NewDirection", this.changedDirection);
        return this.currentFrame = 0;
    },
    changedDirection: function (info) {
        switch (info.x) {
            case 0:
                this.pauseAnimation();
                return this.currentFrame = this.getReel();
            case ClassicPlayerConstants.SPEED:
                this.animate("MoveRight", -1);
                return this.reelPosition(this.currentFrame);
            case -ClassicPlayerConstants.SPEED:
                this.animate("MoveLeft", -1);
                return this.reelPosition(this.currentFrame);
        }
    }
});

Crafty.c("ClassicPlayerCannon",
{
    init: function () {
        this.requires("ClassicPlayerCommon, classic_cannonSprite, SpriteAnimation");
        this.reel("Fire", ClassicPlayerConstants.FIRE_ANIMATION_DURATION, 0, 0, 7);
        this.reel("Reload", ClassicPlayerConstants.RELOAD_ANIMATION_DURATION, 6, 0, -7);
        return this.bind("AnimationEnd", this.reload);
    },
    fire: function () {
        return this.animate("Fire");
    },
    reload: function (reel) {
        if (reel.id === "Fire") {
            return this.animate("Reload");
        }
    }
});

Crafty.c("ClassicPlayerShot",
{
    init: function () {
        this.requires("2D, DOM, classic_shellSprite, Collision");
        this.stop();
        return this.checkHits('ClassicAlien, ClassicShip, ClassicShield, ClassicAlienShot, ClassicSpaceship');
    },
    fireFrom: function (x, y) {
        this.attr({
            x: x,
            y: y,
            visible: true
        });
        this.bind("EnterFrame", this.advance);
        this.active = true;
        return this;
    },
    advance: function () {
        this.move('n', ClassicPlayerConstants.SHOT_SPEED);
        if (this.outsidePlayfield()) {
            this.stop();
        }
        return this;
    },
    stop: function () {
        this.attr({
            x: ClassicPlayerConstants.SHOT_IDLE_X,
            y: ClassicPlayerConstants.SHOT_IDLE_Y,
            visible: false
        });
        this.unbind("EnterFrame", this.advance);
        this.active = false;
        Crafty.trigger("ShotStopped", this);
        return this;
    },
    isActive: function () {
        return this.active;
    },
    outsidePlayfield: function () {
        return this.y < 0;
    }
});