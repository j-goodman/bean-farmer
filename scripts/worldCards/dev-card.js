import { WorldCard } from '../worldCard.js';
import { Rock } from '../rock.js';
import { Ore } from '../ore.js';
import { Boulder } from '../boulder.js';
import { Emerald } from '../emerald.js';
import { DragonFlower } from '../dragonFlower.js';
import { WoolyPig } from '../woolyPig.js';
import { WildOnion } from '../wildOnion/wildOnion.js';
import { Fire } from '../fire.js';
import { WildOnionSprout } from '../wildOnion/wildOnionSprout.js';
import { Player } from '../player.js';

let devCard = new WorldCard (
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
    `             P  X               `,
    `                W X             `,
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
        "O": Ore,
        "B": Boulder,
        "W": WoolyPig,
        "D": DragonFlower,
        "P": Player,
        "e": Emerald,
        "o": WildOnion,
        "s": WildOnionSprout,
        "f": Fire,
    }
)

export { devCard }