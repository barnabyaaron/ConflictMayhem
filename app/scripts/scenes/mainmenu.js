Crafty.scene('mainmenu', function () {
    var Game, w, h, offset;
    Game = window.Game;
    Game.resetCredits();

    Crafty.background('#000 url(images/earth_bg.jpg) no-repeat center center');
    Crafty.audio.play('menu_music', -1, .5);

    Crafty.viewport.x = 0;
    Crafty.viewport.y = 0;
    w = Crafty.viewport.width;
    h = Crafty.viewport.height;
    offset = .15;

    var playBtn = Crafty.e("MenuButton").create(
        "start",
        Crafty.viewport.width / 2 - 170,
        Crafty.viewport.height / 5 * 2,
        function () {
            Crafty.audio.stop('menu_music');
            // Start MAIN Story Game
            return Crafty.enterScene('Story_Intro');
        }
    );

    var bonusBtn = Crafty.e("MenuButton").create(
        "gold",
        Crafty.viewport.width / 2 - 170,
        Crafty.viewport.height / 5 * 3,
        function () {
            Crafty.audio.stop('menu_music');
            Crafty.enterScene('bonus');
        },
        "Bonus Mode"
    ).textFont({ size: '24px', family: "Silkscreen Expanded" });

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
