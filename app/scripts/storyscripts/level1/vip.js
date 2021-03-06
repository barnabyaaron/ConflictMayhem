var Game,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

Game = this.Game;

Game.Scripts || (Game.Scripts = {});

Game.Scripts.VIP = (function(superClass) {
    extend(VIP, superClass);

    function VIP() {
        return VIP.__super__.constructor.apply(this, arguments);
    }

    VIP.prototype.assets = function() {
        return this.loadAssets('helicopter');
    };

    VIP.prototype.spawn = function(options) {
        return Crafty.e('VIP, Horizon').attr({
            x: (Crafty.viewport.width * .2) - Crafty.viewport.x,
            y: Crafty.viewport.height * .2,
            defaultSpeed: 100,
            topDesaturation: 0.1,
            bottomDesaturation: 0.1
        }).vip();
    };

    VIP.prototype.execute = function() {
        this.entity.colorDesaturation(Game.backgroundColor);
        this.bindSequence('Hit', this.crash);
        return this.sequence(this.sendToBackground(0.85, -100), this.setLocation({
            x: 0.45,
            y: .4
        }), this.moveTo({
            x: -.1
        }), this.turnAround(), this.wait(200), this.sendToBackground(0.75, -200), this.moveTo({
            x: .22,
            y: .45
        }), this.repeat(this.sequence(this.moveTo({
            x: .36,
            y: .47,
            speed: 25,
            easing: 'easeInOutQuad'
        }), this.moveTo({
            x: .25,
            y: .5,
            speed: 25,
            easing: 'easeInOutQuad'
        }))));
    };

    VIP.prototype.crash = function() {
        return this.sequence(this.parallel(this.screenShake(5, {
            duration: 400
        }), this.blast(this.location(), {
            duration: 480,
            z: -199,
            topDesaturation: 0.3,
            bottomDesaturation: 0.3
        }), (function(_this) {
            return function() {
                return Crafty.audio.play("explosion");
            };
        })(this)), (function(_this) {
            return function() {
                return _this.entity.flip('Y');
            };
        })(this), this.turnAround(), this["while"](this.movePath([[.6, .82]], {
            speed: 150
        }), this.sequence(this.blast(this.location(), {
            radius: 10,
            duration: 480,
            z: -199,
            topDesaturation: 0.3,
            bottomDesaturation: 0.3,
            lightness: .2,
            alpha: .5
        }), this.blast(this.location({
            offsetX: 10,
            offsetY: 5
        }), {
            radius: 5,
            duration: 180,
            z: -199,
            topDesaturation: 0.3,
            bottomDesaturation: 0.3
        }), this.wait(100))), this.moveTo({
            y: 1.1
        }));
    };

    return VIP;

})(Game.EntityScript);
