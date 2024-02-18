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
        `      X                         `,
        `     g       X        X   XX    `,
        `    X     g  XDX      X         `,
        `   X    *g  gXXX X     *        `,
        `XX XX     g XXXXXXXXX    X      `,
        `  XOXX g  XXXXXXXXXXXX          `,
        `   XOX    XXX hXXXXXXXXX     X  `,
        `  XOOX   XXX   XD   DXXXX   XX  `,
        `  XOX X  XXXX        XX  X      `,
        ` XOX   X DXXXXD   D  X   XX     `,
        `  X      XXXXX    X XXX XX      `,
        `          XXXXX D X          XX `,
        `          XXXXXXXXXXXXXXXXX  X  `,
        `  XXXXX     X XXXXXXXXXXXX      `,
        `XXXO  XX*        XXXXXX*XXX X   `,
        `XXXXX XX          XXXXXXXXXXXXXX`,
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