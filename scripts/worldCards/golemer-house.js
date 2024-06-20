import { WorldCard } from '../worldCard.js';
import { Rock } from '../rock.js';
import { Ore } from '../ore.js';
import { Boulder } from '../boulder.js';
import { Bomb } from '../bomb.js';
import { Crate } from '../crate.js';
import { Emerald } from '../emerald.js';
import { Sapphire } from '../sapphire.js';
import { Grass } from '../grass/grass.js';
import { Bookshelf } from '../bookshelf.js';
import { LockedDoor } from '../lockedDoor.js';
import { Brick } from '../brick.js';
import { Firepot } from '../firepot.js';
import { Golemer } from '../golemer.js';
import { DragonFlower } from '../dragonFlower.js';
import { Stump } from '../stump.js';
import { WoolyPig } from '../woolyPig.js';
import { WoolyPigCarcass } from '../woolyPigCarcass.js';
import { WildOnion } from '../wildOnion/wildOnion.js';
import { Fire } from '../fire.js';
import { Hatchet } from '../hatchet.js';
import { WildOnionSprout } from '../wildOnion/wildOnionSprout.js';
import { Player } from '../player.js';
import { DragonFlowerSeed } from '../dragonFlowerSeed.js';
import { WildOnionSeed } from '../wildOnion/wildOnionSeed.js';
import { WildCornItem } from '../wildCornItem.js';
import { Cauldron } from '../cauldron.js';
import { StoneFloor } from '../stoneFloor.js';
import { Mushroom } from '../mushroom.js';

let golemerHouse = new WorldCard (
    [
        `RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR`,
        `RRRRRRRRR       RRRRRRRRRRRRRRRR`,
        `RRRRRRRRR    CW RCCCRRRRRR     R`,
        `                   CRRRRR       `,
        `RRRRRRRRR       RC  RRRRR     RR`,
        `XXRRRRRRRRRRRRRRRRRXXXXXRRR RRRR`,
        `XXXXXXXXXXXXXXXXXXXXTTTXRRR RRRR`,
        `XXXXXXXXXX   XXXX  X   XXXX XXRR`,
        `XXXXXXXXX     XXX  L c X     XR `,
        `XXXXXXXXX GP       X   XXXXX XRR`,
        `XXXXXXXXX     XXX  XXXXXRRRX XRR`,
        `XXXXXXXXXX   XXFX  XFXXXRRRX XRR`,
        `     XXXXXX XX        XXRRRX XR `,
        `       XXXX XX        XXRRRX XR `,
        `XXX                   XXRRRX XRR`,
        `XXXXX               * XXRRRX XRR`,
        `XXXXXXXXXXXXXX        XXRRRX XRR`,
        `XXXXXXXXXXXXXXXXXXXXXXXXRRRX XRR`,
        `XXRRRRRRRRRRRRXXXXXXXXXXXXXX XR `,
        `RRRROORRRRRRRRX              X R`,
        `RROOO OORRRRRRX XXXXXXXXXXXXXX  `,
        `RRRO  OOORRR RX XRRRRRRRRRRRRRR `,
        `RRRRORRORRRR RX XRRRRRRR    RRRR`,
        ` RR   RRRRR  RX XRRRRRR      RRR`,
    ],
    {
        "X": Brick,
        "R": Rock,
        "P": Player,
        "F": Firepot,
        "3": Fire,
        "L": LockedDoor,
        "G": Golemer,
        "T": Bookshelf,
        "*": Cauldron,

        "O": Ore,
        "B": Boulder,
        "b": Bomb,
        "W": WoolyPig,
        "C": Crate,
        "c": WildCornItem,
        "D": DragonFlower,
        "S": Stump,
        "P": Player,
        "e": Emerald,
        "s": Sapphire,
        "g": Grass,
        "h": Hatchet,
        "m": Mushroom,
        "o": WildOnion,
        "d": DragonFlowerSeed,
        // "s": WildOnionSprout,
        ",": WildOnionSeed,
    }
)

golemerHouse.floor = StoneFloor

golemerHouse.writeSigns([
    "A shelf of books about necromancy and the undead.",
    "A shelf of old golemer's books. One is about how to use ambient blue ectoplasm to summon a ghost golem.",
    "A shelf of books about soil toxicity.",
])

export { golemerHouse }