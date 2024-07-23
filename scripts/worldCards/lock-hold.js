import { WorldCard } from '../worldCard.js';
import { Rock } from '../rock.js';
import { Ocean } from '../ocean.js';
import { Player } from '../player.js';
import { Brick } from '../brick.js';
import { Lockbox } from '../lockbox.js';
import { Key } from '../key.js';
import { RockGolem } from '../rockGolem.js';
import { ExtraHeart } from '../extraHeart.js';
import { SmokyQuartz } from '../smokyQuartz.js';
import { Crate } from '../crate.js';
import { WildOnionSprout } from '../wildOnion/wildOnionSprout.js';
import { Bomb } from '../bomb.js';
import { SulfurCrystal } from '../sulfurCrystal.js';
import { Boomerang } from '../boomerang.js';
import { Hatchet } from '../hatchet.js';
import { DragonFlower } from '../dragonFlower.js';
import { DragonFlowerSeed } from '../dragonFlowerSeed.js';
import { Grass } from '../grass/grass.js';

let lockHold = new WorldCard (
    [
        `RRRRRRRRRRRRRRRR  RRRRRRRRRRRRRR`,
        `RRRRRRRRRRRRRR   RRRRRRRRRRRRRRR`,
        `RRRRRRRRRRRR    RRRRRRRRRRRRRRRR`,
        `RRRRRRRR            RRRRRRRRRRRR`,
        `RRRRRR    RR           RRRRRRRRR`,
        `RRRRR   RRRRR            RRRRRRR`,
        `RRRR   RRRRR               RRRRR`,
        `RRRR  RRRRRRR  XXXXX         RRR`,
        `RR    RRRRRRRRXX.d.XX         RR`,
        `R    XXXXXRRRXX.....XX         R`,
        `   RRX   XXXXX.......X          `,
        `  RRRX e     Ld.....dL      RR  `,
        ` RRRRX   XXXXX.......X      RRR `,
        `RRRRRXXXXX   XX.....XX      RRRR`,
        `RRRRRR        XX.d.XX       RRRR`,
        `RRRRR          XXLXX       RRRRR`,
        `RRRRR           X X      RRRRRRR`,
        `RRRRR           X X      RRRRRRR`,
        `RRRRR           X X     RRRRRRRR`,
        `RRRRRR         XX XX    RRRRRRRR`,
        `RRRRRRR        X   X   RRRRRRRRR`,
        `RRRRRRRRRR   RRX v X RRRRRRRRRRR`,
        `RRRRRRRRRRRRRRRX   XRRRRRRRRRRRR`,
        `RRRRRRRRRRRRRRRXXXXXRRRRRRRRRRRR`,
    ],
    {
        "X": Brick,
        "R": Rock,
        "O": Ocean,
        "L": Lockbox,
        "q": SmokyQuartz,
        "b": Bomb,
        "v": Boomerang,
        ".": Grass,
        "s": WildOnionSprout,
        "i": SulfurCrystal,
        "D": DragonFlower,
        "d": DragonFlowerSeed,
        "?": Crate,
        "+": ExtraHeart,
        "k": Key,
        "h": Hatchet,
        "e": ExtraHeart,
        "v": Boomerang,
        "P": Player,
    }
)

export { lockHold }