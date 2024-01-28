import { WorldCard } from '../worldCard.js';
import { Rock } from '../rock.js';
import { Emerald } from '../emerald.js';
import { WoolyPig } from '../woolyPig.js';
import { Player } from '../player.js';

let pigCave = new WorldCard (
    [
    `    X X  XXXXXXXXX      `,
    `  XXXXXXXXXXXXXXXXXXX   `,
    ` XX   XXXXXXXXXXXXXXXXX `,
    ` X     XXXXXXXXXXXXXXXW `,
    `XX  P         XXXXXXXX  `,
    `XX     XXXXXX  XXXXXXX  `,
    ` XX   XXXXXXXX XXXXXXX  `,
    ` XXXXXXXXXXXXX XXXXXXX  `,
    `XXXXXXXXXX XXX XXXXXXXX `,
    ` XXXXXXXXXXXXX      XXX `,
    ` XXXXX X XXXXX XXXXXXXX `,
    ` XXXXXX  XXXXX XXXXXXXX `,
    ` XXXXXXX XX XX XXXXXXXX `,
    ` XXXX          XXXXXXX  `,
    ` XXXX XXWXX XXXXXXXXX   `,
    ` XXXX XX XX XXXXXXXX    `,
    ` XXXX eX   WXXXXX       `,
    `   XXXXX XXXXXXX        `,
    ],
    {
        "X": Rock,
        "W": WoolyPig,
        "P": Player,
        "e": Emerald,
    }
)

export { pigCave }