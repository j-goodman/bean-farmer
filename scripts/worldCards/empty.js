import { WorldCard } from '../worldCard.js';
import { Rock } from '../rock.js';
import { Ore } from '../ore.js';
import { Boulder } from '../boulder.js';
import { Emerald } from '../emerald.js';
import { Grass } from '../grass/grass.js';
import { Stump } from '../stump.js';
import { Brick } from '../brick.js';
import { Firepot } from '../firepot.js';
import { DragonFlower } from '../dragonFlower.js';
import { SoilCleaner } from '../soilCleaner.js';
import { WoolyPig } from '../woolyPig.js';
import { Crate } from '../crate.js';
import { WildOnion } from '../wildOnion/wildOnion.js';
import { Hatchet } from '../hatchet.js';
import { WildOnionSprout } from '../wildOnion/wildOnionSprout.js';
import { Player } from '../player.js';
import { DragonFlowerSeed } from '../dragonFlowerSeed.js';
import { WildCornSeed } from '../wildCornSeed.js';
import { Sign } from '../sign.js';
import { Mushroom } from '../mushroom.js';
import { WoolyPigCarcass } from '../woolyPigCarcass.js';
import { Bomb } from '../bomb.js';
import { Chicken } from '../chicken.js';
import { Key } from '../key.js';


let empty = new WorldCard (
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
        `               k                `,
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
        "X": Brick,
        "R": Rock,
        "P": Player,
        "F": Firepot,
        "S": Stump,

        "O": Ore,
        ".": Bomb,
        "B": Boulder,
        "m": Mushroom,
        "T": Sign,
        "W": WoolyPig,
        "$": WoolyPigCarcass,
        "!": SoilCleaner,
        "C": Crate,
        "k": Key,
        "c": WildCornSeed,
        "0": Chicken,
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

empty.rotateOnlyVertically = true

empty.writeSigns([
    "Please do not bother the wooly pig. Do not stand in front or go too close.",
    "In the east there is a magic cup in a broken tomb. Find it to win.",
    "Past here is danger.",
    "If you get hurt, eat food. Equip an onion, then press F to eat it. If you're full, pressing F will drop the onion.",
    "Make sure there is open space in front of you before you press F to throw equipped bomb.",
])

empty.setVariants("wooly pig carcass", ["skeleton"])
empty.setVariants("sign", [null, null, "stone"])

export { empty }