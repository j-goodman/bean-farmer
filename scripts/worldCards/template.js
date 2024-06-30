import { WorldCard } from '../worldCard.js';
import { Rock } from '../rock.js';
import { Player } from '../player.js';

let template = new WorldCard (
    [
        `               **               `,
        `                                `,
        `                                `,
        `                                `,
        `                                `,
        `                                `,
        `        *              *        `,
        `                                `,
        `                                `,
        `                                `,
        `                                `,
        `*              P               *`,
        `*                              *`,
        `                                `,
        `                                `,
        `                                `,
        `                                `,
        `        *              *        `,
        `                                `,
        `                                `,
        `                                `,
        `                                `,
        `                                `,
        `               **               `,
    ],
    {
        "X": Rock,
        "P": Player,
    }
)

export { template }