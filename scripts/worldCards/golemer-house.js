import { WorldCard } from '../worldCard.js';
import { Rock } from '../rock.js';
import { Ore } from '../ore.js';
import { Boulder } from '../boulder.js';
import { Crate } from '../crate.js';
import { Emerald } from '../emerald.js';
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
import { WildCornSeed } from '../wildCornSeed.js';
import { OrbTable } from '../orbTable.js';
import { StoneFloor } from '../stoneFloor.js';

let golemerHouse = new WorldCard (
    [
    `RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR`,
    `RRRRRRRRR       RRRRRRRRRRRRRRRR`,
    `RRRRRRRRR    CW RCCCRRRRRR     R`,
    `                   CRRRRR       `,
    `RRRRRRRRR       RC  RRRRR     RR`,
    `XXRRRRRRRRRRRRRRRRRRRXXRRRR RRRR`,
    `XXXXXXXXXXXXXXXXXXXXXXXXRRR RRRR`,
    `XXXXXXXXXX   XXXX  XTTTXXXX XXRR`,
    `XXXXXXXXX     XXX  X   F     XRR`,
    `XXXXXXXXX GP       L   XXXXXXXRR`,
    `XXXXXXXXX     XXX  XXXXXRRRRRRRR`,
    `      XXXX   XXFX  XFXXXRRRRRRRR`,
    `      XXXXX XX        XXRRRRRRRR`,
    `XXXX  XXXXX XX        XXRRRRRRRR`,
    `XXXX                  XXRRRRRRRR`,
    `XXXX                * XXRRRRRRRR`,
    `XXXXXXXXXXXXXX        XXRRRRRRRR`,
    `XXXXXXXXXXXXXXXXXXXXXXXXRRRRRRRR`,
    `XXRRRRRRRRRRRXRRRRRRRRXXRRRRRRRR`,
    `RRRRRRRRRRRRRXRRRRRRRRXXRRRRRRRR`,
    `RRRRRRRRRRRRRRRRR RRRRRRRRRRRRRR`,
    `RRRRRRRRRRRR RRR RRRRRRRRRRRRRRR`,
    `RRRRRRRRRRRR RRRRRRRRRRR    RRRR`,
    `RRRRRRRRRRR  RRRRRRRRRR      RRR`,
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
        "*": OrbTable,

        "O": Ore,
        "B": Boulder,
        "W": WoolyPig,
        "C": Crate,
        "c": WildCornSeed,
        "D": DragonFlower,
        "S": Stump,
        "P": Player,
        "e": Emerald,
        "g": Grass,
        "h": Hatchet,
        "o": WildOnion,
        "d": DragonFlowerSeed,
        "s": WildOnionSprout,
    }
)

golemerHouse.floor = StoneFloor

golemerHouse.writeSigns([
    "A shelf of books about ghosts.",
    "A shelf of old golemer's books. One is about how to summon a slime golem.",
    "A shelf of books about plants and fungus.",
])

export { golemerHouse }