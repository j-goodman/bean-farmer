import { WorldCard } from '../worldCard.js';
import { Rock } from '../rock.js';
import { Emerald } from '../emerald.js';
import { WoolyPig } from '../woolyPig.js';
import { Boulder } from '../boulder.js';
import { Player } from '../player.js';

let flowerCave = new WorldCard (
    [
    `   XXXXX XXXXXXXXX      `,
    ` X XXXX  XXXXXXX X  X   `,
    `  XXXXX XXXXXXXXXXX    `,
    ` XXXXXX  XXXXXXXXXXXXX  `,
    `XXXXXXXX           XXX  `,
    `XXXX XXX   XXX   X XXX  `,
    `XXX XXXXXBXXXXXBXX XXXX `,
    `XXXXX              XXXX `,
    `XXXX              XXXXX `,
    `XXXX XXX    X    XXXXXX `,
    `XXXX  XXXXXXXXXXXXX XXX `,
    `XXXXX      XXXXXXXXXXXX `,
    `XXXXXXXXXX    XXXXXXXXX `,
    `XXXX            XXXXXX  `,
    ` XXXX             XXXXX `,
    `XXXXX             XXXXX `,
    ` XXXXXX        XXXXXXX  `,
    ` XXXXXXXXXXX XXXXXX     `,
    ],
    {
        "X": Rock,
        "B": Boulder,
        "W": WoolyPig,
        "P": Player,
        "e": Emerald,
    }
)

export { flowerCave }