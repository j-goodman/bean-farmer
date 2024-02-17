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
        `        XXXXX XXXDXXXXXs        `,
        `         XXXX  XX XXX           `,
        `           XX       XXX         `,
        `     X      XXXXX      X        `,
        `           XX   B      XX W     `,
        `      X     XX X XXXXXXXX  B    `,
        `    g   * XXXX X XXX  XX  X     `,
        `            XX X  B     X   WBXX`,
        `        XX    XX s  XX g  X   X `,
        `  X  XXXX XXXO        XXXB   XX `,
        `  g OX                   XXXX   `,
        ` g                              `,
        `   g       g                    `,
        ` g WXXX XX XO     g  X XXXX     `,
        `gXXX  XXXO B  g      XXB XXX    `,
        ` X       XO XXXg g g gDXX    a   `,
        ` X       XX  X Xg XXXXX    X    `,
        `XX      *  XXX  XX     * XXXXXXX`,
        `DX         XXX  XX         XXX  `,
        ` XXg              X             `,
        `XXXXD                           `,
        `XXDXXX                     XX   `,
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