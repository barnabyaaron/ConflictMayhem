Crafty.scene('mainmenu', function() {
    Crafty.background('#000 url(images/earth_bg.jpg) no-repeat center center');
    Crafty.audio.play('menu_music', -1);

    var playBtn = Crafty.e("MenuButton").create(
        "start",
        Crafty.viewport.width / 2 - 170,
        Crafty.viewport.height / 5 * 2,
        function () {
            Crafty.audio.stop('menu_music');
            
            // Start MAIN Story Game

        }
    );

    var classicBtnText = [
        "Classic Mode",
        "Old Man Mode",
        "Over 50's Mode"
    ];

    var classicBtn = Crafty.e("MenuButton").create(
        "gold",
        Crafty.viewport.width / 2 - 170,
        Crafty.viewport.height / 5 * 4,
        function () {
            Crafty.audio.stop('menu_music');
            
            Crafty.enterScene('classic');
        },
        classicBtnText[Crafty.math.randomInt(0, (classicBtnText.length - 1))]
    ).textFont({ size: '24px', family: "Silkscreen Expanded" });



}, function() {
  // destructor
});
