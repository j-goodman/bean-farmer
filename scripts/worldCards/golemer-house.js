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
import { WoodGolem } from '../woodGolem.js';
import { SmokyQuartz } from '../smokyQuartz.js';
import { HeartFlower } from '../heartFlower.js';
import { IslandMap } from '../island-map.js';
import { AtomBomb } from '../atomBomb.js';
import { BrokenGlasses } from '../brokenGlasses.js';
import { Chair } from '../chair.js';
import { Desk } from '../desk.js';
import { GolemerBookshelf } from '../golemerBookshelf.js';
import { BulletinBoard } from '../bulletinBoard.js';

let golemerHouse = new WorldCard (
    [
        ` RRRRRRRRRRRRRRRRRRR     RRRRRR `,
        `RRRRRRRRR       RRRRRR  RRRRRRRR`,
        `RRRRRRRRR    CW R CCRRRRRR     R`,
        `                    RRRRR      R`,
        `RRRRRRRRR       RC  RRRRR     RR`,
        `RRRRRRRRRRRRRRRRRRRXXXXXRRRR RRR`,
        `RXXqXXXXXXXXXXXXXXXX45TXXXXX XX `,
        `RXX XXXXXX   XXXX  X   XX XX XXX`,
        `RXX   XXX     XFX  L k F BX  XXX`,
        `XXXXX   X  P       X   X       R`,
        `XXXXXXX X     XXX  XXXXXXXXX XXX`,
        `   XXXX XX   XXXX  XXXXXRRRX XXX`,
        `  #  XX XXX XXX       XXRRRX XR `,
        `XX      XXX XXX       XXRRRX XR `,
        `XXXX                  XXRRRX XRR`,
        ` XXXXX              * XXRRRX XRR`,
        `   XXXXXXXXXXXX       XXRRRX XRR`,
        `  |  XXXXXXXXXXXXXXXXXXXRRRX XRR`,
        `     XXXRRXXXRRXXXRRXXXRRXXX XR `,
        `R RRRRRRRRRRRRX           C  X R`,
        `  RRRRRRRRRRRRX XXXXXXXXXXXXXX  `,
        `R   W    RRRR!X X!RRRRRRRRRRRRR `,
        `RRRCC   CROR  /    RRRRR    RRRR`,
        ` RRRORRRRRO  /    / RRR      RR `,
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
        "T": GolemerBookshelf,
        "*": Cauldron,
        "i": IslandMap,
        "y": CrystalKey,
        "~": RedOnionSeed,
        "a": AtomBomb,
        "4": Chair,
        "5": Desk,
        
        "k": Key,
        "t": Telescope,
        "#": Lockbox,
        "v": Boomerang,
        "x": Cactus,
        "l": PigLilyItem,

        "|": Tree,

        "O": Ore,
        "B": Boulder,
        "b": Bomb,
        "p": PowderBomb,
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
        "q": SmokyQuartz,
        "/": HeartFlower,
        "z": BrokenGlasses,
    }
)

golemerHouse.floor = StoneFloor
golemerHouse.noRotate = true
golemerHouse.floorBounds = [{x: 2, y: 5}, {x: 30, y: 21}]
// golemerHouse.floorBounds = [{x: 6, y: 6}, {x: 26, y: 18}]

golemerHouse.writeSigns([
    "A shelf of books about summoning comets.",
    "A shelf of books about necromancy and creating blue slime golems.",
    "A shelf of books about soil toxicity and fire-breathing plants.",
])

export { golemerHouse }