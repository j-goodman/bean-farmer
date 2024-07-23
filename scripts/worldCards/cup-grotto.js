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
import { PowderBomb } from '../powderBomb.js';
import { SulfurCrystal } from '../sulfurCrystal.js';
import { Boomerang } from '../boomerang.js';
import { Hatchet } from '../hatchet.js';
import { MagicCup } from '../magicCup.js';
import { SoilCleaner } from '../soilCleaner.js';
import { CrystalLockbox } from '../crystalLockbox.js';
import { CrystalKey } from '../crystalKey.js';

let cupGrotto = new WorldCard (
    [
        `         RRRRRR**RRRRR          `,
        `     RRRRRRRR     RRRRRRR       `,
        `   RRRRRRR           RRRRRR     `,
        `  RRR                  RRRRR    `,
        ` RRRR                    RRRR   `,
        ` RRR                       RRR  `,
        ` RRR    *   ss X X ss  *    RRR `,
        ` RR        sss X X sss      RRRR`,
        ` RR        sssXXXXXsss       RRR`,
        ` R           XX   XX          RR`,
        ` R         XXX  C  XXX         R`,
        `RR  C        X  c  X        C  R`,
        `R          XXX  C  XXX         R`,
        `R            XX   XX           R`,
        `R          sssXXEXXsss        RR`,
        `RR         sss XCX sss        RR`,
        ` RRR        ss XEX ss         RR`,
        `  RR    *              *    RRR `,
        `  RRRRR                    RRRR `,
        `   RRRRR                  RRRRR `,
        `    RRRRRR             RRRRRR   `,
        `     RRRRRR         RRRRRRR     `,
        `       RRRRRRR    RRRRR         `,
        `             RR**RR             `,
    ],
    {
        "X": Brick,
        "R": Rock,
        "O": Ocean,
        "L": Lockbox,
        "E": CrystalLockbox,
        "q": SmokyQuartz,
        "c": MagicCup,
        "C": SoilCleaner,
        "h": Hatchet,
        "b": Bomb,
        "p": PowderBomb,
        "v": Boomerang,
        "s": WildOnionSprout,
        "i": SulfurCrystal,
        "!": RockGolem,
        "?": Crate,
        "+": ExtraHeart,
        "k": Key,
        "t": CrystalKey,
        "P": Player,
    }
)

cupGrotto.rotateOnlyHorizontally = true

export { cupGrotto }