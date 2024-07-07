import { WorldCard } from '../worldCard.js';
import { Rock } from '../rock.js';
import { Player } from '../player.js';
import { Crate } from '../crate.js';
import { DragonFlower } from '../dragonFlower.js';
import { SnowSnail } from '../snowSnail.js';

let stashHouse = new WorldCard (
    [
    `                                `,
    `                                `,
    `                                `,
    `                                `,
    `                                `,
    `       XXXXXXXXXXXXXXXXXX       `,
    `       XXXXXXXXXXXXXXXXXX       `,
    `       XX         ?????XX       `,
    `       XX         ?????XX       `,
    `       XXXXXXXXXXX?????XX       `,
    `       XXXDXXDXXDXX    XX       `,
    `P                      XX       `,
    `                       XX       `,
    `       XXXDXXDXXDXX    XX       `,
    `       XXXXXXXXXXX   ??XX       `,
    `       XX            ??XX       `,
    `       XX            ??XX       `,
    `       XXXXXXXXXXXXXXXXXX       `,
    `       XXXXXXXXXXXXXXXXXX       `,
    `                                `,
    `                                `,
    `                                `,
    `                                `,
    `                                `,
    ],
    {
        "X": Rock,
        "?": Crate,
        "@": SnowSnail,
        "D": DragonFlower,
        "P": Player,
    }
)

export { stashHouse }