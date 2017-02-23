Crafty.scene('classic', function() {
    Crafty.background('rgb(32, 55, 67)');

    // Create Layers
    Crafty.createLayer('UILayerDOM', 'DOM', {
        scaleResponse: 0,
        yResponse: 0,
        xResponse: 0,
        z: 40
    });

    Crafty.createLayer('UILayerWebGL', 'WebGL', {
        scaleResponse: 0,
        yResponse: 0,
        xResponse: 0,
        z: 35
    });

    var game = new Classic(false);

    Crafty.bind("EnterFrame", game.update);
}, function() {
  // destructor
});
