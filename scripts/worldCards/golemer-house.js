import { WorldCard } from '../worldCard.js';
import { Rock } from '../rock.js';
import { Ore } from '../ore.js';
import { Boulder } from '../boulder.js';
import { Emerald } from '../emerald.js';
import { Grass } from '../grass/grass.js';
import { Sign } from '../sign.js';
import { Stump } from '../stump.js';
import { Brick } from '../brick.js';
import { Firepot } from '../firepot.js';
import { Golemer } from '../golemer.js';
import { DragonFlower } from '../dragonFlower.js';
import { WoolyPig } from '../woolyPig.js';
import { WoolyPigCarcass } from '../woolyPigCarcass.js';
import { WildOnion } from '../wildOnion/wildOnion.js';
import { Fire } from '../fire.js';
import { Hatchet } from '../hatchet.js';
import { WildOnionSprout } from '../wildOnion/wildOnionSprout.js';
import { Player } from '../player.js';
import { DragonFlowerSeed } from '../dragonFlowerSeed.js';
import { WildCornSeed } from '../wildCornSeed.js';

let golemerHouse = new WorldCard (
    [
    ` RRRRRRRRRR RRRRRRRRRRRRRRRRRRR `,
    `RRRRRRRRR   RRRRRRRRRRRRRRRRRRRR`,
    `RRRRRRRRR RRRRRRRRRRRRRRR     RR`,
    `RRRRRRRRR                     RR`,
    `RRRRRRRRRRRRRRRRRRRRRRRRR     RR`,
    `RRRRRRRRRRRRRRRRRRRRRRRRRRR RRRR`,
    `RRRRRRRXXXXXXXXXXXXXXXXXRRR RRRR`,
    `RRRRRRRXXX   XXXXXXX   XXXX XXRR`,
    `RRRRRRRXX     XXX  S   F     XRR`,
    `RRRRRRRXX GP       X   XXXXXXXRR`,
    `RRRRRRRXX     XXX  XXXTXRRRRRRRR`,
    `RRRRRRXXXX   XXFX  XFXXXRRRRRRRR`,
    `RRRRRXXXXXX XX        XXRRRRRRRR`,
    `RRRRRRRXXXX XX        XXRRRRRRRR`,
    `         D            XXRRRRRRRR`,
    `D              h    F XXRRRRRRRR`,
    `RRRRRRRXXXXXXX        XXRRRRRRRR`,
    ` RRRRXXXXXXXXXXXXXXXXXXXRRRRRRRR`,
    ` RRRRRRRRRRRXXRRRRRRRRXXRRRRRRRR`,
    ` RRRRRRRRRRRXXRRRRRRRRXXRRRRRRRR`,
    `  RRRRRRRRRRRRRRR RRRRRRRRRRRRRR`,
    `  RRRRRRRRRRRRRR RRRRRRRRRRRRRRR`,
    `   RRRRRRRRRRRRRRRRRRRRR    RRRR`,
    `    RRRRRRRRRRRRRRRRRRR      RRR`,
    ],
    {
        "X": Brick,
        "R": Rock,
        "P": Player,
        "F": Firepot,
        "S": Stump,
        "G": Golemer,
        "T": Sign,

        "O": Ore,
        "B": Boulder,
        "W": WoolyPig,
        "C": WoolyPigCarcass,
        "c": WildCornSeed,
        "D": DragonFlower,
        "P": Player,
        "e": Emerald,
        "g": Grass,
        "h": Hatchet,
        "o": WildOnion,
        "d": DragonFlowerSeed,
        "s": WildOnionSprout,
    }
)

golemerHouse.writeSigns([
    "Golemer's desk."
])

export { golemerHouse }