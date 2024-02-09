import { WorldCard } from '../worldCard.js';
import { Rock } from '../rock.js';
import { Boulder } from '../boulder.js';
import { WoolyPig } from '../woolyPig.js';

let desert = new WorldCard (
    [
    `                        `,
    `                        `,
    `         s              `,
    `     X                  `,
    `    Xs                  `,
    `            X           `,
    `                        `,
    `                        `,
    `                        `,
    `                        `,
    `                        `,
    `                        `,
    `                        `,
    `                  B     `,
    `             BWB        `,
    `                        `,
    `                 B      `,
    `                        `,
    ],
    {
        "X": Rock,
        "B": Boulder,
        "W": WoolyPig,
    }
)

export { desert }