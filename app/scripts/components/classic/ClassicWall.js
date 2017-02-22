Crafty.c('ClassicWall',
{
    init: function() {
        this.requires('2D, Edge, Collision');
        this.attr({
            x: 0,
            y: 0,
            w: 2,
            h: Crafty.viewport.height
        });

        this.wallRight = Crafty.e('2D, Edge, Collision').attr({
            x: -(Crafty.viewport.x - Crafty.viewport.width) - 3,
            y: 0,
            h: Crafty.viewport.height,
            w: 12
        });
        this.attach(this.wallRight);
        return this;
    }
})