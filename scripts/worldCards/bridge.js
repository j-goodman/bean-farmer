import { WorldCard } from '../worldCard.js';
import { Rock } from '../rock.js';
import { Player } from '../player.js';
import { Ocean } from '../ocean.js';
import { Brick } from '../brick.js';
import { Lockbox } from '../lockbox.js';
import { Key } from '../key.js';
import { PowderBomb } from '../powderBomb.js';
import { DragonFlower } from '../dragonFlower.js';
import { DragonFlowerSeed } from '../dragonFlowerSeed.js';
import { SnowSnail } from '../snowSnail.js';
import { Grass } from '../grass/grass.js';
import { SnailEgg } from '../snailEgg.js';
import { WoodGolem } from '../woodGolem.js';
import { Stump } from '../stump.js';
import { DeathsHeadSeed } from '../deathsHeadSeed.js';
import { DeathsHead } from '../deathsHead.js';

let bridge = new WorldCard (
    [
        ` ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ `,
        ` ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~  `,
        `  ~~~~~~~~~~~~~~~~~~~~~~~~~~~   `,
        `  ~~~~~~~~~~~~~~~~~~~~~~~~~~~   `,
        `   ~~~~~~~~~~~~~~~~~~~~~~~~~~~  `,
        `    ~~~~~~~~~~~~~~~~~~~~~~~~~~~ `,
        `      ~~~~~~~~~   ~~~~~~    ~~  `,
        `       ~~~~~ d   @BB~           `,
        `       ~~~do    @s BBB          `,
        `       ~~~  D o   ossB   ~      `,
        `        ~~ s   @d sssL  ~~~     `,
        `         ~B oo   d  sB ~~~~     `,
        `          Bsso@    s B~~~~      `,
        `    ~~~   Lsss o  @  d~~~~      `,
        `   ~~~~~  Bsso  D  @oo~~~~~     `,
        `    ~~~~~ BBB s  ood  ~~~~~~~   `,
        `    ~~~~~  ~BB d @ od~~~~~~~~~  `,
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
        "D": DragonFlower,
        "o": SnailEgg,
        ".": Grass,
        "k": Key,
        "~": Ocean,
        "P": Player,
    }
)

export { bridge }