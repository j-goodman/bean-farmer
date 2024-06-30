import { WorldCard } from '../worldCard.js';
import { Rock } from '../rock.js';
import { Emerald } from '../emerald.js';
import { Sapphire } from '../sapphire.js';
import { Ruby } from '../ruby.js';
import { Grass } from '../grass/grass.js';
import { Player } from '../player.js';
import { WoolyPig } from '../woolyPig.js';
import { SnowSnail } from '../snowSnail.js';
import { Hatchet } from '../hatchet.js';
import { DragonFlowerSeed } from '../dragonFlowerSeed.js';

let gemMine = new WorldCard (
    [
    `                W      XXXX     `,
    `     W               XXXXXX    X`,
    `   X          X     XXXXXX      `,
    `  XXX               XXXXXX      `,
    `  XX     W   X       XXXX    X  `,
    `                            XX  `,
    `        *  X           *   XXXX `,
    `          XX            XXXXXXX `,
    `  X       X          XXXXXXXXXX `,
    `         XX        XXXXXXXXdXXX `,
    `         X        XXXXXXXXXXXXX `,
    `                  XdXXXXXXXXXXXX`,
    ` XX              XXXeXXXXXXXXXXX`,
    ` X              XXXXXXXXXXXXXXXX`,
    ` XX       X     XXXX gXXXXXXXXXX`,
    `               XXXXdgggXXXXXXXX `,
    `               XXg X g XXXrXXXXX`,
    ` XX     *      XXXg @XXXXXXdXXX  `,
    `XXX           XXXXXXXXXXhXXXXX  `,
    `XX     X      XXXXXXXXXXXXXXX   `,
    `      XXX      XXXXXeXXXXXXXX   `,
    `      XXX       XXXdXXXXXXX     `,
    `  W  XXX       XXXXXXXX         `,
    `     X           XXX            `,
    ],
    {
        "X": Rock,
        "g": Grass,
        "e": Emerald,
        "s": Sapphire,
        "r": Ruby,
        "W": WoolyPig,
        "h": Hatchet,
        "d": DragonFlowerSeed,
        "P": Player,
        "@": SnowSnail,
    }
)

export { gemMine }