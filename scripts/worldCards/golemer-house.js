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
import { RockGolem } from '../rockGolem.js';
import { SnowSnail } from '../snowSnail.js';
import { Key } from '../key.js';
import { Lockbox } from '../lockbox.js';
import { Ruby } from '../ruby.js';
import { SnailEgg } from '../snailEgg.js';
import { ExtraHeart } from '../extraHeart.js';
import { Boomerang } from '../boomerang.js';
import { Telescope } from '../telescope.js';
import { Tree } from '../tree.js';
import { Cactus } from '../cactus.js';
import { PigLilyItem } from '../pigLilyItem.js';
import { Lamp } from '../lamp.js';
import { PowderBomb } from '../powderBomb.js';
import { CrystalKey } from '../crystalKey.js';
import { FencePost } from '../fencePost.js';
import { RedOnionSeed } from '../redOnion/redOnionSeed.js';

let golemerHouse = new WorldCard (
    [
        ` RRRRRRRRRRRRRRRRRRRRRRRRRRRRRR `,
        `RRRRRRRRR       RRRRRRRRRRRRRRRR`,
        `RRRRRRRRR    CW RCCCRRRRRR     R`,
        `                   CRRRRR       `,
        `RRRRRRRRR       RC  RRRRR     RR`,
        `XXRRRRRRRRRRRRRRRRRXXXXXRRR RRRR`,
        `XXXXXXXXXXXXXXXXXXXXTTTXRRR RRR `,
        `XXXXXXXXXX   XXXX  X   XXXX XXRR`,
        `XXXXXXXXX     XFX  L h F      RR`,
        `XXXXXXXXX GP       X   XXXXX XRR`,
        `XXXXXXXXX     XXX  XXXXXRRRX XRR`,
        `   XXXXXXX   XXXX  XXXXXRRRX XRR`,
        `     XXXXXX XX        XXRRRX XR `,
        `X      XXXX XX        XXRRRX XR `,
        `XXX                   XXRRRX XRR`,
        `XXXXX               * XXRRRX XRR`,
        `XXXXXXXXXXXXXX        XXRRRX XRR`,
        `XXXXXXXXXXXXXXXXXXXXXXXXRRRX XRR`,
        `XXRRRRRRRRRRRRXXXXXXXXXXXXXX XR `,
        `RRROR W   RRRRX              X R`,
        `          RRRRX XXXXXXXXXXXXXX  `,
        `RRRCC    RRR RX XRRRRRRRRRRRRRR `,
        `RRRRORRRRROR !X X!RRRRRR    RRRR`,
        ` RR          R    RRRRR      RRT`,
    ],
    {
        "X": Brick,
        "R": Rock,
        "P": Player,
        "F": Firepot,
        "t": Telescope,
        "f": FencePost,
        "3": Fire,
        "L": LockedDoor,
        "G": Golemer,
        "T": Bookshelf,
        "*": Cauldron,
        "i": Lamp,
        "y": CrystalKey,
        "~": RedOnionSeed,
        
        "k": Key,
        "t": Telescope,
        "#": Lockbox,
        "v": Boomerang,
        "x": Cactus,
        "l": PigLilyItem,

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
        "r": Ruby,
        "g": Grass,
        "h": Hatchet,
        "v": Boomerang,
        "m": Mushroom,
        "o": SnailEgg,
        "!": RockGolem,
        "@": SnowSnail,
        "+": ExtraHeart,
        "d": DragonFlowerSeed,
        ",": WildOnionSeed,
    }
)

golemerHouse.floor = StoneFloor
golemerHouse.noRotate = true

golemerHouse.writeSigns([
    "A shelf of books about necromancy and the undead.",
    "A shelf of old golemer's books. One is about how to use ambient blue ectoplasm to summon a ghost golem.",
    "A shelf of books about soil toxicity.",
    "Seek the sacred cup hidden in the east to win the game.",
])

export { golemerHouse }