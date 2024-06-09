import { WorldCard } from '../worldCard.js';
import { Rock } from '../rock.js';
import { Ore } from '../ore.js';
import { Boulder } from '../boulder.js';
import { Emerald } from '../emerald.js';
import { Grass } from '../grass/grass.js';
import { Sign } from '../sign.js';
import { Stump } from '../stump.js';
import { Crate } from '../crate.js';
import { DragonFlower } from '../dragonFlower.js';
import { WoolyPig } from '../woolyPig.js';
import { WoolyPigCarcass } from '../woolyPigCarcass.js';
import { WildOnion } from '../wildOnion/wildOnion.js';
import { Firepot } from '../firepot.js';
import { Hatchet } from '../hatchet.js';
import { Mushroom } from '../mushroom.js';
import { WildOnionSprout } from '../wildOnion/wildOnionSprout.js';
import { Player } from '../player.js';
import { DragonFlowerSeed } from '../dragonFlowerSeed.js';
import { WildCornSeed } from '../wildCornSeed.js';

let devCard = new WorldCard (
    [
        `                                `,
        `                                `,
        `                                `,
        `                                `,
        `                                `,
        `       X                X       `,
        `        X              X        `,
        `                                `,
        `                                `,
        `               s                `,
        `                     h          `,
        `        s                  s    `,
        `                P               `,
        `                F               `,
        `                                `,
        `                S               `,
        `                                `,
        `        X              X        `,
        `       X                X       `,
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
        "C": WoolyPigCarcass,
        "c": WildCornSeed,
        "D": DragonFlower,
        "P": Player,
        "e": Emerald,
        "g": Grass,
        "T": Sign,
        "S": Stump,
        "?": Crate,
        "m": Mushroom,
        "h": Hatchet,
        "o": WildOnion,
        "d": DragonFlowerSeed,
        "s": WildOnionSprout,
        "F": Firepot,
    }
)

devCard.writeSigns([
    "This is a test."
])

export { devCard }