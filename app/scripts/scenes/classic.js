Crafty.scene('classic', function() {
    Crafty.background('rgb(32, 55, 67)');

    var game = new Classic();

    Crafty.bind("EnterFrame", game.update);
}, function() {
  // destructor
});
