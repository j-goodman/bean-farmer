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

let bridge = new WorldCard (
    [
        `~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`,
        `~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`,
        `~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`,
        `~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`,
        `~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`,
        ` ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ `,
        `  ~~~~~~~~~~~~~~~~~~~~~~    ~~  `,
        `   ~~~~~~~~~BBBBBBBB~           `,
        `     ~~~~~BBB    s BBB          `,
        `*     ~~~~B$    $  ssB   ~     *`,
        `*       ~~Bs      sssL  ~~~    *`,
        `         ~B   $     sB ~~~~~~   `,
        `  ~~      Bss$     s B~~~~~~~~  `,
        ` ~~~~~~   Lsss       B~~~~~~~~  `,
        `~~~~~~~~  Bss    $  $B~~~~~~~~~ `,
        `~~~~~~~~~ BBB s    BBB~~~~~~~~~~`,
        `~~~~~~~~~  ~BBBBBBBB~~~~~~~~~~~~`,
        `~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`,
        `~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`,
        `~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`,
        `~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`,
        `~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`,
        `~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`,
        `~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`,
    ],
    {
        "X": Rock,
        "B": Brick,
        "L": Lockbox,
        "p": PowderBomb,
        "@": SnowSnail,
        "s": Stump,
        "$": WoodGolem,
        "o": SnailEgg,
        "D": DragonFlower,
        "d": DragonFlowerSeed,
        ".": Grass,
        "k": Key,
        "~": Ocean,
        "P": Player,
    }
)

export { bridge }