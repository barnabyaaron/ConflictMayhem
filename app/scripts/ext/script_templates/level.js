var Game;

Game = this.Game;

if (Game.ScriptTemplate == null) {
    Game.ScriptTemplate = {};
}

Game.ScriptTemplate.Level = {
    smallExplosion: function (options) {
        if (options == null) {
            options = {};
        }
        options = _.defaults(options, {
            juice: true,
            offsetX: 0,
            offsetY: 0
        });
        if (options.juice === false) {
            return this.blast(this.location());
        } else {
            return this.parallel(
                this.blast(this.location({
                    offsetX: options.offsetX,
                    offsetY: options.offsetY
                }), {
                    alpha: .85
                }),
                (function (_this) {
                    return function () {
                        return Crafty.audio.play("explosion", 1, .25);
                    };
                })(this)
            );
        }
    },
    bigExplosion: function (options) {
        if (options == null) {
            options = {};
        }
        options = _.defaults(options, {
            juice: true,
            offsetX: 0,
            offsetY: 0,
            damage: 300
        });
        if (options.juice === false) {
            return this.blast(this.location(), {
                damage: options.damage,
                radius: 40
            });
        } else {
            return this.parallel(
                this.screenShake(10, {
                    duration: 200
                }),
                (function (_this) {
                    return function () {
                        return Crafty.audio.play("explosion");
                    };
                })(this),
                this.blast(this.location({
                    offsetX: options.offsetX,
                    offsetY: options.offsetY
                }), {
                    damage: options.damage,
                    radius: 40
                })
            );
        }
    }
};
