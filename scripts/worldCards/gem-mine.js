import { WorldCard } from '../worldCard.js';
import { Rock } from '../rock.js';
import { Emerald } from '../emerald.js';
import { Sapphire } from '../sapphire.js';
import { Ruby } from '../ruby.js';
import { Player } from '../player.js';
import { WoolyPig } from '../woolyPig.js';
import { Hatchet } from '../hatchet.js';
import { DragonFlowerSeed } from '../dragonFlowerSeed.js';

let gemMine = new WorldCard (
    [
    `                W      XXXX     `,
    `     W                   X      `,
    `   X                X    X      `,
    `  XXX               XX  XX      `,
    ` XXX     W           XXXX       `,
    `  X                             `,
    `        *              *        `,
    `                        XXXXX   `,
    `                     XXXXXXXXX  `,
    `                   XXXXXXXXdXXX `,
    `                  XXXXXXXXXXXXX `,
    `  XXXX     X      XdXXXXXXXXXXXX`,
    ` XX  XX   XX     XXXeXXXXXXXXXXX`,
    ` X    XX XX     XXXXXXXXXXXXXXXX`,
    ` X     XXX      XXXXXXXXXXXXXXXX`,
    ` XX            XXXXdXXXXXXXXXXX `,
    `  XX           XXXXXXXXXXXsXXX  `,
    ` XX     *      XXXXXXXXXhXXdXXX  `,
    `XX            XXXXXXXXXXXXXXXX  `,
    `X             XXXXXXXXXXXXXXX   `,
    `X              XXXXXrXXXXXXXX   `,
    `                XXXdXXXXXXXX    `,
    `  W              XXXXXXXXX      `,
    `                   XXXXX        `,
    ],
    {
        "X": Rock,
        "e": Emerald,
        "s": Sapphire,
        "r": Ruby,
        "W": WoolyPig,
        "h": Hatchet,
        "d": DragonFlowerSeed,
        "P": Player,
    }
)

export { gemMine }