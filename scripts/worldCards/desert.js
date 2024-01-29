import { WorldCard } from '../worldCard.js';
import { Rock } from '../rock.js';
import { Boulder } from '../boulder.js';

let desert = new WorldCard (
    [
    `                        `,
    `                        `,
    `                        `,
    `     X                  `,
    `    X                   `,
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