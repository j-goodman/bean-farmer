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
        `   XX       XXXXXXXXX    X      `,
        `  XOXX    XXXXXXXXXXXX          `,
        `   XOX    XXX hXXXXXXXX      X  `,
        `  XOOX   XXX s XD   DXX     XX  `,
        `  XOX    XXXX        XX  X      `,
        ` XOX   X DXXXXD   D  XX  XX     `,
        `  X      XXXXX    X XXX XX      `,
        `          XXXXX D X          XX `,
        ` X        XXXXXXXXXXXX    X  X  `,
        `X X XXX     XXXXXXXX    XX      `,
        ` XXO  X *            X *    X   `,
        `    X                    X     X`,
        `         X               X      `,
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