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
        `   XXXX *g  gXXX X     *        `,
        `XX XXOX   g XXXXXXXXX    X      `,
        `XXXOXXXg  XXXXXXXXXXXX          `,
        `XXXXOXXX  XXX hXXXXXXXXX     X  `,
        ` XXOOXXX XXX   XD   DXXXX   XX  `,
        ` XXOXXXX XXXX        XX XX      `,
        ` XOXX XX DXXXXD   D  X   XX     `,
        `XXXX   X XXXXX    X XXX  X      `,
        `          XXXXX D X          XX `,
        `            XXXXXXXXXXXXXXX  X  `,
        `XXXXXXXXXX    XXXX XXXXXX       `,
        `XXXO  XXXXX            *  X X   `,
        `XXXXX XXXX        XXXXXXXXXXXXXX`,
        `  XX     X        X      X      `,
        `   X  X          XX  XX    XX   `,
        `    XXX              X     XX g `,
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