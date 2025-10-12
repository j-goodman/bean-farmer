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
        `       ~~~ D  o   ossB   ~      `,
        `        ~~ sD  @d sssL  ~~~     `,
        `         ~B  o   d  sB ~~~~     `,
        `          Bsso@ o  s@B~~~~      `,
        `    ~~~   Lsss o     d~~~~      `,
        `   ~~~~~  Bsso  oD @oo~~~~~     `,
        `    ~~~~~ BBB s  oo   ~~~~~~~   `,
        `    ~~~~~  ~BB   @ od~~~~~~~~~  `,
        `   ~~~~~~~~~~~ d~~ ~~~~~~~~~~~  `,
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