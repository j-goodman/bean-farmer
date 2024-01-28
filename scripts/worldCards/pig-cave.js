import { WorldCard } from '../worldCard.js';
import { Rock } from '../rock.js';
import { Ore } from '../ore.js';
import { Boulder } from '../boulder.js';
import { Emerald } from '../emerald.js';
import { WoolyPig } from '../woolyPig.js';
import { Player } from '../player.js';

let pigCave = new WorldCard (
    [
    `    X X  XXXXXXXXX    O `,
    `  XXXXXXXXXXXXXXXXXOX  X`,
    ` XX   XXXXXXXXXXX XOOXX `,
    ` X     XXXXXXXXXXX   OW `,
    `XX  P         XXXX XOX  `,
    `XX     XXXXXX  XXX X X  `,
    ` XX   XXXXXXXX XXX XXO  `,
    ` XXXXXXXXXXXXX XXX  XX O`,
    `XXXXXXXXXX XXX XXXX XXX `,
    ` XXXXXXXXXXXXX      XXX `,
    ` XXXXX X XXXXX XXXXXXXX `,
    ` XXXXXX  XXXXX XXXXXXXXB`,
    ` XXXXXXX XX XX XXXXXXXX `,
    ` XXXX          XXXXXXX  `,
    ` XXXX XXWXX XXXXXXXXX B `,
    ` XXXX XX XX XXXXXXXX   B`,
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