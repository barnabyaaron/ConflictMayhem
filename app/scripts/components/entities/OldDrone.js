Crafty.c('OldDrone', {
    init: function () {
        return this.requires('Enemy, Color');
    },
    drone: function (attr) {
        if (attr == null) {
            attr = {};
        }
        this.color('#0000FF');
        this.attr(_.defaults(attr, {
            w: 40,
            h: 40,
            health: 200
        }));
        this.origin('center');
        this.attr({
            weaponOrigin: [2, 25]
        });
        this.enemy();
        return this;
    }
});