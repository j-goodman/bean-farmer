import { WorldCard } from '../worldCard.js';
import { Rock } from '../rock.js';
import { Ore } from '../ore.js';
import { Boulder } from '../boulder.js';
import { Emerald } from '../emerald.js';
import { Grass } from '../grass/grass.js';
import { Sign } from '../sign.js';
import { DragonFlower } from '../dragonFlower.js';
import { WoolyPig } from '../woolyPig.js';
import { WoolyPigCarcass } from '../woolyPigCarcass.js';
import { WildOnion } from '../wildOnion/wildOnion.js';
import { Fire } from '../fire.js';
import { Hatchet } from '../hatchet.js';
import { WildOnionSprout } from '../wildOnion/wildOnionSprout.js';
import { Player } from '../player.js';
import { DragonFlowerSeed } from '../dragonFlowerSeed.js';

let devCard = new WorldCard (
    [
        `                                `,
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
        `              T   s             `,
        `              P                 `,
        `                 d              `,
        `                                `,
        `                                `,
        `                                `,
        `        *              *        `,
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
        "W": WoolyPig,
        "C": WoolyPigCarcass,
        "D": DragonFlower,
        "P": Player,
        // "e": Emerald,
        "g": Grass,
        "T": Sign,
        "h": Hatchet,
        "o": WildOnion,
        "d": DragonFlowerSeed,
        "s": WildOnionSprout,
        // "f": Fire,
    }
)

devCard.writeSigns([
    "This is a test."
])

export { devCard }