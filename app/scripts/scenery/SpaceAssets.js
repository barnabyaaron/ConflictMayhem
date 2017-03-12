var generator;

generator = this.Game.levelGenerator;

generator.defineAssets('stars', {
    contents: ['star'],
    spriteMap: 'sprites/star_sprite.png',
    sprites: {
        all: {
            tile: 25,
            tileh: 24,
            map: {
                star: [0, 0],
                star2: [1, 0],
                star3: [2, 0]
            }
        }
    }
});

generator.defineAssets('pulsing_star', {
    contents: ['pulsing_star'],
    spriteMap: 'sprites/pulsing_star_sprite.png',
    sprites: {
        all: {
            tile: 128,
            tileh: 128,
            map: {
                pulsing_star: [0, 0]
            }
        }
    }
});

generator.defineAssets('rocks', {
    contents: ['rock'],
    spriteMap: 'sprites/meteor_sprite.png',
    sprites: {
        all: {
            tile: 136,
            tileh: 111,
            map: {
                rock1: [0, 0],
                rock2: [1, 0],
                rock3: [2, 0],
                rock4: [3, 0],
                rock5: [4, 0],
                rock_small1: [5, 0],
                rock_small2: [6, 0],
                rock_small3: [7, 0],
                rock_small4: [8, 0],
                rock_small5: [9, 0],
                rock_small6: [10, 0],
                rock_small7: [10, 1],
                grey_rock1: [0, 1],
                grey_rock2: [1, 1],
                grey_rock3: [2, 1],
                grey_rock4: [3, 1],
                grey_rock_small1: [4, 1],
                grey_rock_small2: [5, 1],
                grey_rock_small3: [6, 1],
                grey_rock_small4: [7, 1],
                grey_rock_small5: [8, 1],
                grey_rock_small6: [9, 1]
            }
        }
    }
});

generator.defineAssets('explosion', {
    contents: ['explosion'],
    spriteMap: 'explosion.png',
    sprites: {
        all: {
            tile: 96,
            tileh: 96,
            map: {
                explosionStart: [0, 0]
            }
        }
    },
    audio: {
        explosion: ['explosion.mp3'],
        shoot: ['sfx_laser1.mp3'],
        shoot2: ['sfx_laser2.mp3'],
        launch: ['launch.mp3'],
        foom: ['foom.mp3'],
        powerup: ['powerup.mp3'],
        bossMusic: ['boss.mp3'],
        bossMusic2: ['boss/boss_music.mp3'],
        shieldUp: ['sfx_shieldUp.mp3'],
        shieldDown: ['sfx_shieldDown.mp3']
    }
});

generator.defineAssets('explosion_colored', {
    contents: ['explosion_colored'],
    spriteMap: 'sprites/explosions_colored_sprite.png',
    sprites: {
        all: {
            tile: 256,
            tileh: 256,
            map: {
                blue_explosionStart: [0, 0],
                green_explosionStart: [0, 1],
                red_explosionStart: [0, 2]
            }
        }
    }
});

generator.defineAssets('explosion_special', {
    contents: ['explosion_special'],
    spriteMap: 'sprites/explosions_special_sprite.png',
    sprites: {
        all: {
            tile: 640,
            tileh: 640,
            map: {
                explosion_specialStart: [0, 0],
                explosion_special2Start: [0, 1],
                explosion_special3Start: [0, 2],
                explosion_special4Start: [0, 3]
            }
        }
    }
});

generator.defineAssets('numbers', {
    contents: ['numbers'],
    spriteMap: 'sprites/numbers_sprite.png',
    sprites: {
        all: {
            tile: 20,
            tileh: 20,
            map: {
                cross: [0, 0],
                number0: [1, 0],
                number1: [2, 0],
                number2: [3, 0],
                number3: [4, 0],
                number4: [5, 0],
                number5: [6, 0],
                number6: [7, 0],
                number7: [8, 0],
                number8: [9, 0],
                number9: [10, 0]
            }
        }
    }
});

generator.defineAssets('powerup', {
    contents: ['powerup'],
    spriteMap: 'sprites/powerups_sprite.png',
    sprites: {
        all: {
            tile: 34,
            tileh: 33,
            map: {
                bolt_silver: [0, 0],
                bolt_bronze: [1, 0],
                bolt_gold: [2, 0],
                pill_blue: [3, 0],
                pill_green: [4, 0],
                pill_red: [5, 0],
                pill_yellow: [6, 0],
                powerup: [0, 1],
                powerup_bolt: [1, 1],
                powerup_shield: [2, 1],
                powerup_star: [3, 1],
                powerupGreen: [4, 1],
                powerupGreen_bolt: [5, 1],
                powerupGreen_shield: [6, 1],
                powerupGreen_star: [0, 2],
                powerupRed: [1, 2],
                powerupRed_bolt: [2, 2],
                powerupRed_shield: [3, 2],
                powerupRed_star: [4, 2],
                powerupYellow: [5, 2],
                powerupYellow_bolt: [6, 2],
                powerupYellow_shield: [0, 3],
                powerupYellow_star: [1, 3],
                shield_bronze: [2, 3],
                shield_gold: [3, 3],
                shield_silver: [4, 3],
                star_bronze: [5, 3],
                star_gold: [6, 3],
                star_silver: [0, 4],
                item_bronze: [1, 4],
                item_gold: [2, 4],
                item_silver: [3, 4]
            }
        }
    }
});

generator.defineAssets('frank', {
    contents: ['frank'],
    spriteMap: 'frank_boss.png',
    sprites: {
        all: {
            tile: 200,
            tileh: 282,
            map: {
                frank: [0, 0]
            }
        }
    },
    audio: {
        frankDie: ['boss/frank/FrankDie.mp3'],
        frankHit: ['boss/frank/FrankHit1.mp3'],
        frankHit2: ['boss/frank/FrankHit2.mp3'],
        frankLaugh: ['boss/frank/FrankLaugh.mp3'],
        frankOhMyGod: ['boss/frank/OhMyGod.mp3'],
        frankOhMyGoodLord: ['boss/frank/OhMyGoodLord.mp3']
    }
});

generator.defineAssets('player', {
    contents: ['playerShip'],
    spriteMap: 'sprites/player_sprite.png',
    sprites: {
        all: {
            tile: 77,
            tileh: 113,
            map: {
                playerShip: [0, 0],
                playerShipGreen: [1, 0],
                playerShipOrange: [2, 0],
                playerShipRed: [3, 0],
                playerShip2: [0, 1],
                playerShip2Green: [1, 1],
                playerShip2Orange: [2, 1],
                playerShip2Red: [3, 1],
                playerShip3: [0, 2],
                playerShip3Green: [1, 2],
                playerShip3Orange: [2, 2],
                playerShip3Red: [3, 2]
            }
        }
    }
});

generator.defineAssets('player_icons', {
    contents: ['playerIcon'],
    spriteMap: 'sprites/player_icons_sprite.png',
    sprites: {
        all: {
            tile: 37,
            tileh: 27,
            map: {
                playerIcon_red: [0, 0],
                playerIcon: [1, 0],
                playerIcon_green: [2, 0],
                playerIcon_orange: [3, 0],
                playerIcon2: [5, 0],
                playerIcon2_green: [6, 0],
                playerIcon2_orange: [0, 1],
                playerIcon2_red: [1, 1],
                playerIcon3: [2, 1],
                playerIcon3_green: [3, 1],
                playerIcon3_orange: [4, 1],
                playerIcon3_red: [5, 1]
            }
        }
    }
});

generator.defineAssets('shield', {
    contents: ['shield'],
    spriteMap: 'sprites/shield_sprite.png',
    sprites: {
        all: {
            tile: 137,
            tileh: 151,
            map: {
                shield: [0, 0],
                shield_low: [1, 0],
                shield_medium: [2, 0],
                shield_high: [3, 0]
            }
        }
    }
});

generator.defineAssets('beam', {
    contents: ['beam'],
    spriteMap: 'sprites/beam_sprite.png',
    sprites: {
        all: {
            tile: 256,
            tileh: 57,
            map: {
                beam: [0, 0]
            }
        }
    }
});

generator.defineAssets('blue_beam', {
    contents: ['blue_beam'],
    spriteMap: 'sprites/bluebeam_sprite.png',
    sprites: {
        all: {
            tile: 78,
            tileh: 15,
            map: {
                blue_beam: [0, 0]
            }
        }
    }
});

generator.defineAssets('laser_hit', {
    contents: ['laser_hit'],
    spriteMap: 'sprites/laser_hit_sprite.png',
    sprites: {
        all: {
            tile: 56,
            tileh: 54,
            map: {
                laser_hit: [0, 0],
                laser_hit2: [1, 0],
                laser_hit3: [2, 0],
                laser_hit4: [3, 0],
                green_laser_hit4: [4, 0],
                green_laser_hit: [0, 1],
                green_laser_hit2: [1, 1],
                green_laser_hit3: [2, 1],
                green_laser_hit5: [3, 1],
                red_laser_hit: [4, 1],
                red_laser_hit2: [0, 2],
                red_laser_hit3: [1, 2],
                red_laser_hit4: [2, 2],
                red_laser_hit5: [3, 2]
            }
        }
    }
});

generator.defineAssets('extra', {
    contents: ['mine', 'rocket', 'helicopter', 'largeDrone'],
    spriteMap: 'city-enemies.png',
    sprites: {
        all: {
            tile: 32,
            tileh: 32,
            map: {
                muzzleFlash: [10, 0, 1, 1],
                shipEngineFire: [3, 0, 3, 1],
                freddie: [3, 1, 3, 2],
                standardMine: [3, 3, 1, 1],
                standardRocket: [4, 4, 2, 1],
                helicopter: [0, 6, 4, 2],
                heliDamaged: [8, 6, 4, 2],
                standardLargeDrone: [0, 8, 3, 3],
                eyeStart: [6, 0, 1, 1],
                wingLoaded: [12, 2, 2, 1],
                sphere1: [7, 3, 1, 1],
                powerUpBox: [10, 1, 1, 1],
                rapidFireBoost: [11, 0, 1, 1],
                speedBoost: [12, 0, 1, 1],
                damageBoost: [13, 0, 1, 1],
                aimBoost: [14, 0, 1, 1]
            }
        }
    }
});

generator.defineAssets('laser', {
    contents: ['laser'],
    spriteMap: 'sprites/lasers_sprite.png',
    sprites: {
        all: {
            tile: 57,
            tileh: 13,
            map: {
                laserLongFade: [0, 0],
                laserFat: [1, 0],
                laser: [2, 0],
                laserFatLight: [3, 0],
                laserLight: [4, 0],
                laserFatFade: [5, 0],
                laserFade: [6, 0],
                laserLongFat: [7, 0],
                laserLong: [8, 0],
                laserLongFatLight: [9, 0],
                laserLongLight: [10, 0],
                laserLongFatFade: [11, 0],
                laserGreen2: [12, 0],
                laserGreenLongFat: [0, 1],
                laserGreenLong: [1, 1],
                laserGreenFat: [2, 1],
                laserGreen: [3, 1],
                laserGreenLongFatLight: [4, 1],
                laserGreenLongLight: [5, 1],
                laserGreenFatLight: [6, 1],
                laserGreenLight: [7, 1],
                laserGreenLongFatFade: [8, 1],
                laserGreenLongFade: [9, 1],
                laserGreenFatFade: [10, 1],
                laserGreenFade: [11, 1],
                laserRed2: [12, 1],
                laserRedLongFade: [0, 2],
                laserRedFat: [1, 2],
                laserRed: [2, 2],
                laserRedFatLight: [3, 2],
                laserRedLight: [4, 2],
                laserRedFatFade: [5, 2],
                laserRedFade: [6, 2],
                laserRedLongFat: [7, 2],
                laserRedLong: [8, 2],
                laserRedLongFatLight: [9, 2],
                laserRedLongLight: [10, 2],
                laserRedLongFatFade: [11, 2]
            }
        }
    }
});

generator.defineAssets('thruster', {
    contents: ['thruster'],
    spriteMap: 'sprites/thrusters_sprite.png',
    sprites: {
        all: {
            tile: 41,
            tileh: 16,
            map: {
                thruster: [0, 0],
                thruster1: [1, 0],
                thruster2: [2, 0],
                thruster3: [3, 0],
                thruster4: [4, 0],
                thruster5: [5, 0],
                thruster6: [6, 0],
                thruster7: [7, 0],
                thruster8: [8, 0],
                thruster9: [9, 0],
                thruster10: [0, 1],
                thruster11: [1, 1],
                thruster12: [2, 1],
                thruster13: [3, 1],
                thruster14: [4, 1],
                thruster15: [5, 1],
                thruster16: [6, 1],
                thruster17: [7, 1],
                thruster18: [8, 1],
                thruster19: [9, 1]
            }
        }
    }
});

generator.defineAssets('engine', {
    contents: ['engine'],
    spriteMap: 'sprites/engine_sprite.png',
    sprites: {
        all: {
            tile: 45,
            tileh: 49,
            map: {
                engine: [0, 0],
                engine2: [1, 0],
                engine3: [2, 0],
                engine4: [3, 0]
            }
        }
    }
});

generator.defineAssets('enemy', {
    contents: ['enemy'],
    spriteMap: 'sprites/enemy_sprite.png',
    sprites: {
        all: {
            tile: 91,
            tileh: 105,
            map: {
                enemy: [0, 0],
                enemy2: [1, 0],
                enemy3: [2, 0],
                enemy4: [3, 0],
                enemy5: [4, 0],
                enemyBlue: [5, 0],
                enemy2Blue: [6, 0],
                enemy3Blue: [0, 1],
                enemy4Blue: [1, 1],
                enemy5Blue: [2, 1],
                enemyGreen: [3, 1],
                enemy2Green: [4, 1],
                enemy3Green: [5, 1],
                enemy4Green: [6, 1],
                enemy5Green: [0, 2],
                enemyOrange: [1, 2],
                enemy2Orange: [2, 2],
                enemy3Orange: [3, 2],
                enemy4Orange: [4, 2],
                enemy5Orange: [5, 2],
                enemyUFO: [6, 2],
                enemyUFOBlue: [0, 3],
                enemyUFOGreen: [1, 3],
                enemyUFORed: [2, 3],
                enemyUFOYellow: [3, 3]
            }
        }
    }
});

generator.defineAssets('custom_enemy', {
    contents: ['custom_enemy'],
    spriteMap: 'sprites/custom_enemy_sprite.png',
    sprites: {
        all: {
            tile: 122,
            tileh: 140,
            map: {
                custom_enemy: [0, 0],
                custom_enemy2: [1, 0],
                custom_enemy3: [2, 0],
                custom_enemy4: [3, 0]
            }
        }
    }
});

generator.defineAssets('ui', {
    contents: ['health_bar', 'shield_bar', 'power_bar'],
    spriteMap: 'sprites/bar_ui.png',
    sprites: {
        all: {
            tile: 140,
            tileh: 26,
            map: {
                health_bar: [0, 0],
                power_bar: [1, 0],
                shield_bar: [2, 0],
                ui_bar_bg: [3, 0]
            }
        }
    }
});

generator.defineAssets('ui_icons', {
    contents: ['health_icon', 'shield_icon', 'power_icon'],
    spriteMap: 'sprites/bar_ui_icons.png',
    sprites: {
        all: {
            tile: 40,
            tileh: 40,
            map: {
                health_icon: [0, 0],
                power_icon: [1, 0],
                shield_icon: [2, 0]
            }
        }
    }
});

generator.defineAssets('portraits', {
    contents: ['general'],
    spriteMap: 'portraits.png',
    sprites: {
        all: {
            tile: 32,
            tileh: 32,
            map: {
                pGeneral: [0, 0, 4, 4],
                pPilot: [0, 4, 4, 4],
                pProfessor: [0, 8, 4, 4],
                pCharlie: [0, 16, 4, 4],
                pPaul: [0, 12, 4, 4]
            }
        }
    }
});

