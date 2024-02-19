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
        `       XXXXXX XXXDXXXXXs        `,
        `       XXXXXX  XX XXX           `,
        `       XX  XX       XXX         `,
        `       XX   XXXXX      X        `,
        `      X    XX   B      XX W     `,
        `  X XXX  dw   XX XXXXXXXXXX  B    `,
        `  X XXX * XXXX X XXX  XX  X     `,
        `            XX X  B     X   WBXX`,
        `       XXX    XX s  XX    X   X `,
        `  X  XXXX XXXO        XXXB   XX `,
        `    OX                   XXXX   `,
        `                                `,
        `       XXg                      `,
        `   WXXXXXX XO        X XXXX     `,
        ` XXX  XXXO B         XXB XXX    `,
        ` X       XO XXX       DXX    a   `,
        ` X       XX  X X  XXXXX    X    `,
        `XX      *  XXX  XX     * XXXXXXX`,
        `DXg        XXX  XX       XXXXXXX`,
        ` XX               X          X  `,
        `XXXXD                           `,
        `XXDXXX                     wXX   `,
        `   X XD X  X XXXXX  XX  XX XO   `,
        `DXXXX   XXXXXX   XXX XXXXXX     `,
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