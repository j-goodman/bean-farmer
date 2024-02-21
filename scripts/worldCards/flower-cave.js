import { WorldCard } from '../worldCard.js';
import { Rock } from '../rock.js';
import { Ore } from '../ore.js';
import { Emerald } from '../emerald.js';
import { DragonFlower } from '../dragonFlower.js';
import { DragonFlowerSeed } from '../dragonFlowerSeed.js';
import { WoolyPig } from '../woolyPig.js';
import { WildOnionSprout } from '../wildOnion/wildOnionSprout.js';
import { WildOnion } from '../wildOnion/wildOnion.js';
import { Boulder } from '../boulder.js';
import { Sign } from '../sign.js';
import { Player } from '../player.js';
import { Grass } from '../grass/grass.js';

let flowerCave = new WorldCard (
    [
        `       XXXXXX XXXDXXXXXXXX      `,
        `       XXXXXX  XX XXXXXXXX      `,
        `       XX  XX       XXXXX       `,
        `       XX   XXXXX      X        `,
        `      X    XX   B      XX W     `,
        `  X XXX   w   XX XXXXXXXXXX  B    `,
        `  X XXX * XXXX X XXX XXX  X     `,
        `XXXXXXXXXXXXXX X  B  XX X   WBXX`,
        `XXXXXXXXXXT XXXX s  XXX   X   X `,
        `  X  XXXXXXoXX        XXXB   XX `,
        `    OX     B             XXXXd  `,
        `   O   XXX                      `,
        `       XX                       `,
        `  WXXXXXXX XX        XXXXXX     `,
        ` XXX  XXXX  B         XXXXXX    `,
        ` X       XX XXX     XgDXX    a   `,
        ` X       XX  XXX  XXXgXXX  XX X `,
        `XX      * XXXXXXXXXXXgXXXXXXXXXX`,
        `DXg        XXX  XXXXXgXXXXXXXXX `,
        ` XX               X Xggg    s XX`,
        `XXXXD               XXXXXXX  sXX`,
        `XXDXXX                    Xs XX  `,
        `   X XD X  X XXXXX  XX  XXXXOX  `,
        `DXXXX   XXXXXX   XXX XXXXXX   W `,
    ],
    {
        "X": Rock,
        "B": Boulder,
        "T": Sign,
        "W": WoolyPig,
        "O": Ore,
        "D": DragonFlower,
        "d": DragonFlowerSeed,
        "s": WildOnionSprout,
        "o": WildOnion,
        "P": Player,
        "e": Emerald,
        "g": Grass,
    }
)

flowerCave.writeSigns([
    "If you have an item equipped, you can press F to use or drop it. If you're not at full health and you have an onion, you can press F to eat it and restore health."
])

export { flowerCave }