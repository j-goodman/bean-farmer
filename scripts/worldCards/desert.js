import { WorldCard } from '../worldCard.js';
import { Rock } from '../rock.js';
import { Boulder } from '../boulder.js';
import { WoolyPig } from '../woolyPig.js';
import { Cactus } from '../cactus.js';
import { Player } from '../player.js';
import { Hatchet } from '../hatchet.js';
import { Mushroom } from '../mushroom.js';

let desert = new WorldCard (
    [
    `       x                `,
    `                        `,
    `                        `,
    `     X                  `,
    `    X                  x`,
    `                        `,
    `            X           `,
    `                        `,
    `                        `,
    `                        `,
    `                        `,
    `          x             `,
    `           X            `,
    `       x                `,
    `         x    WB        `,
    `             B          `,
    `                 B      `,
    `                        `,
    ],
    {
        "X": Rock,
        "B": Boulder,
        "P": Player,
        "h": Hatchet,
        "m": Mushroom,
        "W": WoolyPig,
        "x": Cactus,
    }
)

export { desert }