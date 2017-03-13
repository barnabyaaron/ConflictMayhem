Crafty.c('BossBar', {
    init: function () {
       return this.requires('2D, Listener');
    },
    render: function(name, options) {
        if (options == null) {
            options = {};
        }
        options =_.defaults(options, {
            bgColor: '#666666',
            barColor: '#FF0000',
            current: 100,
            max: 100
        });
        this.attr(options);

        this.name = Crafty.e('2D, UILayerDOM, Text, Tween').attr({
            w: 400,
            x: this.x + ((Crafty.viewport.width / 2) - 200),
            y: 25,
            z: 200
        }).textAlign('center').text(name).textColor('#FFFFFF').textFont({
            size: '12px',
            weight: 'bold',
            family: 'Press Start 2P'
        });

        this.bg = Crafty.e('2D, UILayerDOM, Color, Tween').attr({
            w: 400,
            h: 22,
            x: this.x + ((Crafty.viewport.width / 2) - 200),
            y: 40,
            z: 200
        }).color(this.bgColor);

        this.bar = Crafty.e('2D, UILayerDOM, Color, Tween').attr({
            w: 390,
            h: 18,
            x: (this.x + 5) + ((Crafty.viewport.width / 2) - 200),
            y: 42,
            z: 201
        }).color(this.barColor);

        this.value = Crafty.e('2D, UILayerDOM, Text, Tween').attr({
            w: 400,
            x: this.x + ((Crafty.viewport.width / 2) - 200),
            y: 46,
            z: 202,
            alpha: .6
        }).textAlign('center').text(this.getBarPercent() + "%").textColor('#EEEEEE').textFont({
            size: '10px',
            weight: 'bold',
            family: 'Press Start 2P'
        })

        return this;
    },
    getBarPercent: function() {
        return (this.current / this.max) * 100;
    },
    updateBar: function(current) {
        this.current = current;

        this.bar.w = 390 * (this.current / this.max);
        this.value.text(this.getBarPercent().toFixed(0) + "%");

        return this;
    },
    removeBar: function () {
        var removeFunc = {
            removeElements: function(els) {
                var d, el, i, len;
                d = WhenJS.defer();
                els[0].one('TweenEnd',
                    function() {
                        return d.resolve();
                    });
                for (i = 0, len = els.length; i < len; i++) {
                    el = els[i];
                    el.tween({
                            alpha: 0
                        },
                        3000);
                }
                return d.promise;
            }
        }

        var elems = [
            this.value,
            this.name,
            this.bar,
            this.bg
        ];
        var self = this;

        return removeFunc.removeElements(elems).then(function () {
            var i, len, el;
            for (i = 0, len = elems.length; i < len; i++) {
                el = elems[i];
                el.destroy();
            }

            return self.destroy();
        });
    }
});
