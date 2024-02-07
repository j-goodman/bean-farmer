import { WorldCard } from '../worldCard.js';
import { Rock } from '../rock.js';
import { Ore } from '../ore.js';
import { Hatchet } from '../hatchet.js';
import { DragonFlower } from '../dragonFlower.js';
import { WoolyPig } from '../woolyPig.js';
import { WildOnionSprout } from '../wildOnion/wildOnionSprout.js';
import { Boulder } from '../boulder.js';
import { Player } from '../player.js';

let fireCave = new WorldCard (
    [
        `                  X             `,
        `     O                   XX     `,
        `              X         XX X    `,
        `      X                         `,
        `             X        X   XX    `,
        `    X        XDX      X         `,
        `   X    *    XXX X     *        `,
        `XX XX       XXXXXXXXX    X      `,
        `  XOXX    XXXXXXXXXXXX          `,
        `   XOX    XXX hXXXXXXXXX     X  `,
        `  XOOX   XXX s XD   DXXXX   XX  `,
        `  XOX X  XXXX        XX  X      `,
        ` XOX   X DXXXXD   D  X   XX     `,
        `  X      XXXXX    X XXX XX      `,
        `          XXXXX D X          XX `,
        `          XXXXXXXXXXXX    X  X  `,
        `  XXXXX     X XXXXXX    XX      `,
        `XXXO  XX*        XX  X *    X   `,
        `XXXXX XX          X      X     X`,
        `  XX     X        X      X      `,
        `   X  X          XX  XX    XX   `,
        `    XXX              X     XX   `,
        `     DXX                 X      `,
        `      X                   X X   `,
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
    }
)

export { fireCave }