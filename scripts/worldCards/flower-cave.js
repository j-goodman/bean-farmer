import { WorldCard } from '../worldCard.js';
import { Rock } from '../rock.js';
import { Emerald } from '../emerald.js';
import { WoolyPig } from '../woolyPig.js';
import { Boulder } from '../boulder.js';
import { Player } from '../player.js';

let flowerCave = new WorldCard (
    [
        `                                `,
        `                                `,
        `                                `,
        `                                `,
        `                                `,
        `                                `,
        `                                `,
        `                                `,
        `                                `,
        `                                `,
        `                                `,
        `                                `,
        `                                `,
        `                                `,
        `                                `,
        `                                `,
        `                                `,
        `                                `,
        `                                `,
        `                                `,
        `                                `,
        `                                `,
        `                                `,
        `                                `,
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