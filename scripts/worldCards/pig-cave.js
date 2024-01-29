import { WorldCard } from '../worldCard.js';
import { Rock } from '../rock.js';
import { Ore } from '../ore.js';
import { Boulder } from '../boulder.js';
import { Emerald } from '../emerald.js';
import { WoolyPig } from '../woolyPig.js';
import { Player } from '../player.js';

let pigCave = new WorldCard (
    [
    `XX XX XXXXXXXXXXXX    O `,
    ` XXXXXXXXXXXXXXXXXXOX  X`,
    `XXX   XXXXXXXXXXX XOOXX `,
    `XX     XXXXXXXXXXX   OW `,
    `XX  P        XXXXX XOX  `,
    `XX     XXXXX XXXXX X X  `,
    ` XX   XXX XX XXXXX XXO  `,
    ` XXXXXXXXXXX  XXXX  XX O`,
    `XXXXXXXX X XX  XXXX XXX `,
    ` X XXXXXXXXXXX XX   XXX `,
    ` XXXXX X X XXX XX XXXXX `,
    ` XXXXXX  XXXXX XX XXXXXB`,
    ` XXXXXXX XX XX XX XXXXX `,
    ` XXXX             XXXX  `,
    ` XXXX XX XX XXXXXXXXX B `,
    ` XXXX XX XX XX XXXXX   B`,
    ` XXXX eXW  WXXXXX  B    `,
    `   XXXXXWXXXXXXX  B  B  `,
    ],
    {
        "X": Rock,
        "O": Ore,
        "B": Boulder,
        "W": WoolyPig,
        "P": Player,
        "e": Emerald,
    }
)

export { pigCave }