Crafty.scene('loading', function() {
    Crafty.background('#000 url(images/loading_bg.jpg) no-repeat center center');

    // Load Assets
    Crafty.load(window.GAME_ASSETS,
        function() {
            // Done Loading
            Crafty.enterScene('mainmenu');
        });
}, function() {
  // destructor
});
