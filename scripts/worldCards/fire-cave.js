import { WorldCard } from '../worldCard.js';
import { Rock } from '../rock.js';
import { Ore } from '../ore.js';
import { Hatchet } from '../hatchet.js';
import { DragonFlower } from '../dragonFlower.js';
import { WoolyPig } from '../woolyPig.js';
import { WildOnionSprout } from '../wildOnion/wildOnionSprout.js';
import { Boulder } from '../boulder.js';
import { Grass } from '../grass/grass.js';
import { Player } from '../player.js';

let fireCave = new WorldCard (
    [
        `                  X             `,
        `     O                   XX     `,
        `              X        XXX X    `,
        `      XX                        `,
        `     g XX    X        X   XX    `,
        `    XXXX  g  XDX      X         `,
        `   XXXX *g  gXXX       *        `,
        `XX XXOX   g XXXXXXXXX    X      `,
        `XXXOXXXg  XXXXXXXXXXXXXs X      `,
        `XXXXOXX   XXX hXXXXXXXXX XXX    `,
        ` XXOOXXX XXX   XD   DXX  XXXX   `,
        ` XXOXXXX XXXX        XX XX      `,
        ` XOXX XX DXXXXD   D  X   XX     `,
        `XXXX   X XXXXX    X XXX  X      `,
        `          XXXXX D X          XX `,
        `            XXXXXXXXXXXXXXX  X  `,
        `XXXXXXXXXX    XXXX              `,
        `XXXO  XXXXX        XXXXXXX X XXX`,
        `XXXXX XXXX         sXXXXXX X XXXX`,
        `  XX     X        X      X      `,
        `   X  X          XX  XX  X XX   `,
        `    XXX             XX     XX g `,
        `     DXX                 X     g`,
        `      X                   X Xg  `,
        ],
    {
        "X": Rock,
        "B": Boulder,
        "W": WoolyPig,
        "O": Ore,
        "D": DragonFlower,
        "s": WildOnionSprout,
        "P": Player,
        "h": Hatchet,
        "g": Grass,
    }
)

export { fireCave }