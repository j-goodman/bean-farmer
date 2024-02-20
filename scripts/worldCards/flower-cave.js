import { WorldCard } from '../worldCard.js';
import { Rock } from '../rock.js';
import { Ore } from '../ore.js';
import { Emerald } from '../emerald.js';
import { DragonFlower } from '../dragonFlower.js';
import { WoolyPig } from '../woolyPig.js';
import { WildOnionSprout } from '../wildOnion/wildOnionSprout.js';
import { Boulder } from '../boulder.js';
import { Player } from '../player.js';
import { Grass } from '../grass/grass.js';

let flowerCave = new WorldCard (
    [
        `       XXXXXX XXXDXXXXXXXX      `,
        `       XXXXXX  XX XXXXXXXX      `,
        `       XX  XX       XXXXX       `,
        `       XX   XXXXX      X        `,
        `      X    XX   B      XX W     `,
        `  X XXX  dw   XX XXXXXXXXXX  B    `,
        `  X XXX * XXXX X XXX XXX  X     `,
        `XXXXXXXXXXXXXX X  B  XX X   WBXX`,
        `XXXXXXXXXXXXXXXX s  XXX   X   X `,
        `  X  XXXXXXXXO        XXXB   XX `,
        `    OX                   XXXX   `,
        `       XX                       `,
        `       XX                       `,
        `  WXXXXXXX XO        XXXXXX     `,
        ` XXX  XXXO B          XXXXXX    `,
        ` X       XO XXX     XgDXX    a   `,
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
        "W": WoolyPig,
        "O": Ore,
        "D": DragonFlower,
        "s": WildOnionSprout,
        "P": Player,
        "e": Emerald,
        "g": Grass,
    }
)

export { flowerCave }