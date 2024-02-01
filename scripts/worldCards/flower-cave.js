import { WorldCard } from '../worldCard.js';
import { Rock } from '../rock.js';
import { Ore } from '../ore.js';
import { Emerald } from '../emerald.js';
import { DragonFlower } from '../dragonFlower.js';
import { WoolyPig } from '../woolyPig.js';
import { WildOnionSprout } from '../wildOnion/wildOnionSprout.js';
import { Boulder } from '../boulder.js';
import { Player } from '../player.js';

let flowerCave = new WorldCard (
    [
        `        XXXXX XXXDXXXXXs        `,
        `         XXXX  XX XXX           `,
        `        s  XX       XXX  s      `,
        `     X    s XXXXX      X        `,
        `           XX   B      XX W     `,
        `      X s  sXX X XXXXXXXX  B    `,
        `        * XXXX X XXX  XX  X     `,
        `            XX X  B   s X   WB  `,
        `         X   s         s  X     `,
        `        X                B      `,
        `    OX  X                  XX   `,
        `  XXX  Ws                 XXXX  `,
        ` WX X X X                XXXX   `,
        `   W    X   O          XXXXXX   `,
        `   X     O B           B XXX    `,
        `          O           D         `,
        `               Xs X  X     X    `,
        `        *  XXX  XX s   *        `,
        `D          XXX  XX              `,
        `                  X             `,
        `    D                           `,
        `  D                      s      `,
        `      D                     O   `,
        `D                          X    `,
    ],
    {
        "X": Rock,
        "B": Boulder,
        "W": WoolyPig,
        "O": Ore,
        "D": DragonFlower,
        "s": WildOnionSprout,
        "P": Player,
        "e": Emerald,
    }
)

export { flowerCave }