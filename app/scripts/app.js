'use strict';
require('scripts/assets');
require('scripts/components/*');
require('scripts/game');
require('scripts/ext/*');
require('scripts/storyscripts/*');
require('scripts/scenery/*');
require('scripts/scenes/*');

Crafty.debugBar.show();
window.Game.start(false);

