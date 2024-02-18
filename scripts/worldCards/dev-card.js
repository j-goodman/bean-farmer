import { WorldCard } from '../worldCard.js';
import { Rock } from '../rock.js';
import { Ore } from '../ore.js';
import { Boulder } from '../boulder.js';
import { Emerald } from '../emerald.js';
import { Grass } from '../grass/grass.js';
import { DragonFlower } from '../dragonFlower.js';
import { WoolyPig } from '../woolyPig.js';
import { WoolyPigCarcass } from '../woolyPigCarcass.js';
import { WildOnion } from '../wildOnion/wildOnion.js';
import { Fire } from '../fire.js';
import { Hatchet } from '../hatchet.js';
import { WildOnionSprout } from '../wildOnion/wildOnionSprout.js';
import { Player } from '../player.js';
import { WildOnionSeed } from '../wildOnion/wildOnionSeed.js';

let devCard = new WorldCard (
    [
    `                                `,
    `                                `,
    `                                `,
    `                                `,
    `                                `,
    `                                `,
    `                                `,
    `         XXXXXXXXXXXXXX         `,
    `         X            X         `,
    `         X            X         `,
    `         X   o  d     X         `,
    `         X            X         `,
    `         X     Ph     X         `,
    `         X            X         `,
    `         X            X         `,
    `         X            X         `,
    `         XXXXXXXXXXXXXX         `,
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
        // "O": Ore,
        // "B": Boulder,
        // "W": WoolyPig,
        "C": WoolyPigCarcass,
        "D": DragonFlower,
        "P": Player,
        // "e": Emerald,
        "g": Grass,
        "h": Hatchet,
        "o": WildOnion,
        "d": WildOnionSeed
        // "s": WildOnionSprout,
        // "f": Fire,
    }
)

export { devCard }