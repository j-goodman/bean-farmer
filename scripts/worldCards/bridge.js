import { WorldCard } from '../worldCard.js';
import { Rock } from '../rock.js';
import { Player } from '../player.js';
import { Ocean } from '../ocean.js';
import { Brick } from '../brick.js';
import { Lockbox } from '../lockbox.js';
import { Key } from '../key.js';
import { Penny } from '../penny.js';
import { PowderBomb } from '../powderBomb.js';
import { DragonFlower } from '../dragonFlower.js';
import { DragonFlowerSeed } from '../dragonFlowerSeed.js';
import { SnowSnail } from '../snowSnail.js';
import { Grass } from '../grass/grass.js';
import { SnailEgg } from '../snailEgg.js';
import { WoodGolem } from '../woodGolem.js';
import { Stump } from '../stump.js';
import { StoneWall } from '../stoneWall.js';
import { Hatchet } from '../hatchet.js';

let bridge = new WorldCard (
    [
        ` ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ `,
        ` ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  `,
        `  ~~~~~~~~~~~~~~~~~~~~~~~~~~~   `,
        `  ~~~~~~~~~~~~~~~~~~~~~~~~~~~   `,
        `   ~~~~~~~~~~~~~~~~~~~~~~~~~~~  `,
        `    ~~~~~~~~~~~~~~~~~~~~~~~~~~~ `,
        `      ~~~~~~~~~ o ~~~~~~    ~~  `,
        `       ~~~~~ o    BB~  ,        `,
        `.      ~~~ o   H  dBBB          `,
        `       ~~~o  o H ddd B  ,~      `,
        `        ~~ s   HdddddL  ~~~     `,
        `         ~B    HH dddB ~~~~     `,
        `        , Bss   HH d B~~~~      `,
        `    ~~~   Lsss   Ho  o~~~~      `,
        `   ~~~~~  Bss  ddHd o ~~~~~     `,
        `    ~~~~~ BBBsdddHd  o~~~~~~~   `,
        `    ~~~~~  ~BB dd  o ~~~~~~~~~  `,
        `   ~~~~~~~~~~~  ~~ ~~~~~~~~~~~  `,
        `  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~  `,
        ` ~~~~~~~~~~~~~~~~~~~~~~~~~~~~   `,
        ` ~~~~~~~~~~~~~~~~~~~~~~~~~~~~   `,
        ` ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  `,
        ` ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ `,
        ` ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ `,
    ],
    {
        "X": Rock,
        "B": Brick,
        "L": Lockbox,
        "p": PowderBomb,
        "@": SnowSnail,
        "s": Stump,
        "$": WoodGolem,
        "d": DragonFlowerSeed,
        "h": Hatchet,
        "D": DragonFlower,
        "o": SnailEgg,
        "H": StoneWall,
        ".": Grass,
        ",": Penny,
        "k": Key,
        "~": Ocean,
        "P": Player,
    }
)

export { bridge }