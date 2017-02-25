Crafty.c('Mine', {
    init: function () {
        this.requires('Enemy, standardMine, SpriteAnimation');
        this.reel('open', 200, [[4, 3], [5, 3]]);
        this.reel('close', 200, [[4, 3], [3, 3]]);
        this.reel('blink', 100, [[5, 3], [6, 3]]);
        return this.bind('GameLoop', function (fd) {
            var delta;
            delta = (360 / 4000) * fd.dt;
            return this.attr({
                rotation: this.rotation + delta
            });
        });
    },
    mine: function (attr) {
        if (attr == null) {
            attr = {};
        }
        this.crop(4, 4, 25, 25);
        this.attr(_.defaults(attr, {
            h: 25,
            w: 25,
            health: 100
        }));
        this.origin('center');
        this.enemy();
        return this;
    },
    updateMovementVisuals: function (rotation, dx, dy, dt) {
        this.vx = dx * (1000 / dt);
        return this.vy = dy * (1000 / dt);
    }
});