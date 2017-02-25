var Game,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

Game = this.Game;

Game.Scripts || (Game.Scripts = {});

Game.Scripts.DemoBoss = (function(superClass) {
    extend(DemoBoss, superClass);

    function DemoBoss() {
        return DemoBoss.__super__.constructor.apply(this, arguments);
    }

    DemoBoss.prototype.assets = function() {
        return this.loadAssets('largeDrone');
    };

    DemoBoss.prototype.smoke = function(version) {
        var options;
        if (version == null) {
            version = 'heavy';
        }
        options = {
            heavy: {
                alpha: .8,
                wait: 40
            },
            medium: {
                alpha: .6,
                wait: 80
            },
            light: {
                alpha: .4,
                wait: 140
            }
        }[version];
        return this.sequence(this.blast(this.location(), (function(_this) {
            return function() {
                return {
                    radius: 10,
                    duration: 480,
                    z: _this.entity.z - 3,
                    alpha: options.alpha,
                    lightness: 1.0
                };
            };
        })(this), function() {
            return {
                rotation: this.rotation + 1,
                alpha: Math.max(0, this.alpha - .003),
                lightness: function() {
                    return Math.max(.2, this.lightness - .05);
                },
                y: this.y - (Math.random() * 2)
            };
        }), this.wait(function() {
            return options.wait + (Math.random() * 50);
        }));
    };

    return DemoBoss;

})(Game.EntityScript);

Game.Scripts.DemoBossStage1 = (function(superClass) {
    extend(DemoBossStage1, superClass);

    function DemoBossStage1() {
        return DemoBossStage1.__super__.constructor.apply(this, arguments);
    }

    DemoBossStage1.prototype.spawn = function() {
        return Crafty.e('LargeDrone, Horizon').drone({
            x: Crafty.viewport.width + 40,
            y: Crafty.viewport.height * .35,
            defaultSpeed: 100,
            health: 45000,
            pointsOnHit: 10
        });
    };

    DemoBossStage1.prototype.execute = function() {
        this.bindSequence('Hit', this.fase2, (function(_this) {
            return function() {
                return _this.entity.healthBelow(.8);
            };
        })(this));
        return this.sequence(this.setScenery('UnderBridge'), this.invincible(true), this.animate('slow', -1, 'eye'), this.disableWeapons(), this.moveTo({
            x: .75,
            y: .41
        }), this.say('Drone Commander', 'We have control now! You will suffer!'), this.say('Drone Commander', 'Earths defences are in our hands!'), this.laugh(), this.invincible(false), this.enableWeapons(), this.async(this.placeSquad(Game.Scripts.Stage1BossRocket, {
            options: {
                location: this.location(),
                pointsOnDestroy: 0,
                pointsOnHit: 0
            }
        })), this.animate('emptyWing', 0, 'wing'), this.animate('reload', 0, 'wing'), this.moveTo({
            y: .43,
            speed: 50
        }), this.repeat(this.attackCycle(25)));
    };

    DemoBossStage1.prototype.attackCycle = function(speed) {
        return this.sequence(this.async(this.runScript(Game.Scripts.Stage1BossMine, this.location())), this.moveTo({
            y: .36,
            easing: 'easeInOutQuad',
            speed: speed
        }), this.wait(200), this.async(this.placeSquad(Game.Scripts.Stage1BossRocket, {
            options: {
                location: this.location(),
                pointsOnDestroy: 0,
                pointsOnHit: 0
            }
        })), this.animate('emptyWing', 0, 'wing'), this.animate('reload', 0, 'wing'), this.async(this.runScript(Game.Scripts.Stage1BossMine, this.location())), this.moveTo({
            y: .58,
            easing: 'easeInOutQuad',
            speed: speed
        }), this.async(this.placeSquad(Game.Scripts.Stage1BossRocket, {
            options: {
                location: this.location(),
                pointsOnDestroy: 0,
                pointsOnHit: 0
            }
        })), this.animate('emptyWing', 0, 'wing'), this.wait(200), this.animate('reload', 0, 'wing'));
    };

    DemoBossStage1.prototype.fase2 = function() {
        this.bindSequence('Hit', this.fase3, (function(_this) {
            return function() {
                return _this.entity.healthBelow(.5);
            };
        })(this));
        return this.sequence(this.setSpeed(75), this.bombRaid(true), this.repeat(this.sequence(this.repeat(3, this.attackCycle(50)), this.laugh(), this.async(this.placeSquad(Game.Scripts.Stage1BossDroneRaid, {
            amount: 6,
            delay: 300,
            options: {
                shootOnSight: true
            }
        })), this.laugh())));
    };

    DemoBossStage1.prototype.fase3 = function() {
        this.bindSequence('Hit', this.dramaDeath, (function(_this) {
            return function() {
                return _this.entity.healthBelow(.2);
            };
        })(this));
        return this.sequence(this.setSpeed(150), this.bombRaid(true), this.parallel(this.sequence(this.setScenery('Skyline'), this.gainHeight(300, {
            duration: 4000
        })), this.repeat(this.sequence(this.repeat(2, this.attackCycleAir()), this.airBashAttack()))));
    };

    DemoBossStage1.prototype.attackCycleAir = function() {
        return this.repeat(5, this.sequence(this.async(this.placeSquad(Game.Scripts.Stage1BossHomingRocket, {
            options: {
                z: 5,
                offsetY: 100,
                location: this.location()
            }
        })), this.animate('emptyWing', 0, 'wing'), this.async(this.placeSquad(Game.Scripts.Stage1BossHomingRocket, {
            options: {
                z: -5,
                offsetY: -100,
                location: this.location()
            }
        })), this.parallel(this.moveTo(this.targetLocation({
            offsetY: -20
        }), {
            x: .845
        }), this.sequence(this.animate('reload', 0, 'wing'), this.wait(1000)))));
    };

    DemoBossStage1.prototype.airBashAttack = function() {
        return this.sequence(this.moveTo({
            y: .5,
            x: 0.95,
            speed: 100
        }, 'easeInOutQuad'), this.async(this.placeSquad(Game.Scripts.DemoBossMineField, {
            amount: 20,
            delay: 50,
            options: {
                location: this.location(),
                gridConfig: {
                    x: {
                        start: 0.1,
                        steps: 12,
                        stepSize: 0.075
                    },
                    y: {
                        start: 0.1,
                        steps: 5,
                        stepSize: 0.075
                    }
                }
            }
        })), this.async(this.placeSquad(Game.Scripts.DemoBossMineField, {
            amount: 20,
            delay: 50,
            options: {
                location: this.location(),
                gridConfig: {
                    x: {
                        start: 0.1,
                        steps: 12,
                        stepSize: 0.075
                    },
                    y: {
                        start: 0.7,
                        steps: 5,
                        stepSize: 0.075
                    }
                }
            }
        })), this.wait(3000), this.invincible(true), this["while"](this.moveTo({
            x: -.15,
            speed: 500,
            easing: 'easeInOutQuad'
        }), this.sequence(this.smallExplosion(), this["while"](this.wait(300), this.smoke()))), this.turnAround(), this.sendToBackground(0.7, -150), this["while"](this.moveTo({
            x: 1.1,
            speed: 300
        }), this.smoke('light')), this.invincible(false), this.turnAround(), this.scale(1.0, {
            duration: 0
        }), this.reveal(), this.moveTo({
            x: .85,
            y: .41,
            speed: 200
        }));
    };

    DemoBossStage1.prototype.dramaDeath = function() {
        return this.sequence((function(_this) {
            return function() {
                return _this.entity.colorOverride('#FF8080');
            };
        })(this), this.invincible(true), this.parallel(this.gainHeight(300, {
            duration: 4000
        }), this.say('Drone Commander', 'You will never stop us!!'), this["while"](this.moveTo({
            x: .5,
            y: .4,
            speed: 100
        }), this.sequence(this.smallExplosion(), this["while"](this.wait(300), this.smoke())))), this.bigExplosion(), this.wait(50), this.bigExplosion(), this.bigExplosion(), this.wait(500), (function(_this) {
            return function() {
                return Crafty('RiggedExplosion').trigger('BigExplosion');
            };
        })(this), this.explosionBurst(100), this.bigExplosion(), this.explosionBurst(200), this.bigExplosion(), this.explosionBurst(300), this.explosionBurst(30), (function(_this) {
            return function() {
                return _this.entity.colorOverride('#403030');
            };
        })(this), this.parallel(this.moveTo({
            y: 1.1,
            speed: 300,
            easing: 'easeInOutQuad'
        }), this.rotate(180, 1000)));
    };

    DemoBossStage1.prototype.explosionBurst = function(offset) {
        return this.parallel(this.bigExplosion({
            offsetX: offset,
            offsetY: offset
        }), this.bigExplosion({
            offsetX: -offset,
            offsetY: offset
        }), this.bigExplosion({
            offsetX: offset,
            offsetY: -offset
        }), this.bigExplosion({
            offsetX: -offset,
            offsetY: -offset
        }));
    };

    DemoBossStage1.prototype.laugh = function() {
        return this.sequence((function(_this) {
            return function() {
                return Crafty.audio.play('laugh');
            };
        })(this), this.repeat(5, this.sequence(this.rotate(10, 200), this.rotate(-10, 200))), this.rotate(0, 200));
    };

    DemoBossStage1.prototype.bombRaid = function(armed) {
        if (armed == null) {
            armed = false;
        }
        return this.sequence(this.invincible(true), this.moveTo({
            y: .1
        }), this["while"](this.moveTo({
            x: -100,
            speed: 200
        }), this.sequence(this.async(this.placeSquad(Game.Scripts.Stage1BossBombRaid, {
            options: {
                location: this.location(),
                armed: false
            }
        })), this.wait(500))), this.turnAround(), this["while"](this.moveTo({
            x: 1.0,
            speed: 200
        }), this.sequence(this.async(this.placeSquad(Game.Scripts.Stage1BossBombRaid, {
            options: {
                location: this.location(),
                armed: armed
            }
        })), this.wait(500))), this.moveTo({
            x: 1.2,
            speed: 200
        }), this.turnAround(), this.moveTo({
            x: .85,
            y: .41,
            speed: 200
        }), this.invincible(false));
    };

    return DemoBossStage1;

})(Game.Scripts.DemoBoss);

Game.Scripts.DemoBossMineField = (function(superClass) {
    extend(DemoBossMineField, superClass);

    function DemoBossMineField() {
        return DemoBossMineField.__super__.constructor.apply(this, arguments);
    }

    DemoBossMineField.prototype.assets = function() {
        return this.loadAssets('mine');
    };

    DemoBossMineField.prototype.spawn = function(options) {
        var location, ref;
        location = options.location();
        this.target = options.grid.getLocation();
        this.index = options.index;
        return Crafty.e('Mine').mine({
            health: 700,
            x: location.x,
            y: location.y + 10,
            z: -4,
            defaultSpeed: (ref = options.speed) != null ? ref : 300,
            pointsOnHit: options.points ? 10 : 0,
            pointsOnDestroy: options.points ? 50 : 0
        });
    };

    DemoBossMineField.prototype.execute = function() {
        this.bindSequence('Destroyed', this.onKilled);
        return this.sequence(this.moveTo({
            x: this.target.x,
            y: this.target.y,
            easing: 'easeOutQuad'
        }), this.synchronizeOn('placed'), this.sequence(this.wait((1 - this.target.xPerc) * 1000), this.animate('blink', -1), this.wait(1000), (function(_this) {
            return function() {
                return _this.entity.absorbDamage(_this.entity.health);
            };
        })(this), (function(_this) {
            return function() {
                if (_this.index === 0) {
                    return Crafty('RiggedExplosion').trigger('BigExplosion');
                }
            };
        })(this), this.endSequence()));
    };

    DemoBossMineField.prototype.onKilled = function() {
        return this.bigExplosion({
            juice: this.juice
        });
    };

    return DemoBossMineField;

})(Game.EntityScript);
