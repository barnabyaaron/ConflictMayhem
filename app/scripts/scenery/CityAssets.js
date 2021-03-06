﻿var generator;

generator = this.Game.levelGenerator;

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
        powerup: ['powerup.mp3']
    }
});

generator.defineAssets('player', {
    contents: ['playerShip', 'shipEngineFire', 'mine', 'drone', 'rocket', 'helicopter', 'largeDrone', 'laserTank'],
    spriteMap: 'city-enemies.png',
    sprites: {
        all: {
            tile: 32,
            tileh: 32,
            map: {
                playerShip: [0, 0, 3, 2],
                playerShipDamaged: [0, 2, 3, 2],
                muzzleFlash: [10, 0, 1, 1],
                shipEngineFire: [3, 0, 3, 1],
                freddie: [3, 1, 3, 2],
                standardMine: [3, 3, 1, 1],
                standardDrone: [0, 4, 2, 2],
                standardRocket: [4, 4, 2, 1],
                helicopter: [0, 6, 4, 2],
                heliDamaged: [8, 6, 4, 2],
                standardLargeDrone: [0, 8, 3, 3],
                eyeStart: [6, 0, 1, 1],
                wingLoaded: [12, 2, 2, 1],
                rapidFireBoost: [11, 0, 1, 1],
                speedBoost: [12, 0, 1, 1],
                damageBoost: [13, 0, 1, 1],
                aimBoost: [14, 0, 1, 1],
                heart: [13, 1, 1, 1],
                star: [14, 1, 1, 1],
                powerUpBox: [10, 1, 1, 1],
                sphere1: [7, 3, 1, 1],
                laserTank: [0, 11, 6, 3],
                laserTankBarrel: [6, 11, 4, 2]
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
