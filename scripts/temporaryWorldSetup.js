import { Boulder } from './boulder.js';
import { Rock } from './rock.js';
import { Ore } from './ore.js';
import { Player } from './player.js';
import { WoolyPig } from './woolyPig.js';

const temporaryWorldSetup = () => {
    game.player = new Player (3, 3)

new Rock (2, 2)
new Rock (2, 5)
new Rock (3, 1)
new Rock (4, 2)
new Rock (5, 1)
new Rock (6, 1)
new Rock (7, 1)
new Rock (8, 2)
new Rock (9, 2)
new Rock (10, 2)
new Rock (11, 2)
new Rock (12, 1)
new Rock (14, 1)
new Rock (12, 2)
new Rock (13, 2)
new Rock (14, 3)
new Rock (15, 4)
new Rock (16, 4)
new Rock (17, 5)
new Rock (17, 6)
new Rock (16, 6)
new Rock (15, 6)
new Rock (15, 7)
new Rock (14, 8)
new Rock (13, 8)
new Rock (14, 11)
new Rock (12, 9)
new Rock (11, 9)
new Rock (10, 9)
new Rock (9, 9)
new Rock (8, 9)
new Rock (7, 10)
new Rock (6, 11)
new Rock (6, 12)
new Rock (5, 13)
new Rock (4, 14)
new Rock (3, 13)
new Rock (2, 13)

for (let i = 32; i > -46; i--) {
    if (i !== 2) {
        new Rock (1, i)
    }
    if (!Math.floor(Math.random() * 15)) {
        new Rock (2, i)
    }
    if (!Math.floor(Math.random() * 12)) {
        new Ore ("ore", 1, i)
    }
    if (!Math.floor(Math.random() * 9)) {
        new Rock (0, i)
    }
}

new Boulder (5, 7)
new Boulder (6, 6)
new Boulder (7, 4)
new Boulder (9, 6)
new Boulder (7, 7)
new Boulder (11, 3)
new Boulder (14, 6)

new Ore (0, 6)

let firstPig = new WoolyPig (6, 10)
let secondPig = new WoolyPig (14, 7)
new WoolyPig (10, 8)
firstPig.birthday = -75
secondPig.birthday = -40
}

export { temporaryWorldSetup }