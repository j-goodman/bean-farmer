import { WorldCard } from '../worldCard.js';
import { Rock } from '../rock.js';
import { Boulder } from '../boulder.js';

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
    `              B         `,
    `                        `,
    `                 B      `,
    `                        `,
    ],
    {
        "X": Rock,
        "B": Boulder,
    }
)

export { desert }