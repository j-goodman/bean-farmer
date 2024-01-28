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
    ` XX   XXXXXX XXXXX XXO  `,
    ` XXXXXXXXXXX  XXXX  XX O`,
    `XXXXXXXXXX XX    XX XXX `,
    ` X XXXXXXXXXXX X    XXX `,
    ` XXXXX X XXXXX XXXXXXXX `,
    ` XXXXXX  XXXXX XXXXXXXXB`,
    ` XXXXXXX XX XX XXXXXXXX `,
    ` XXXX          XXXXXXX  `,
    ` XXXX XXWXX XXXXXXXXX B `,
    ` XXXX XX XX XX XXXXX   B`,
    ` XXXX eX   WXXXXX  B    `,
    `   XXXXX XXXXXXX  B  B  `,
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