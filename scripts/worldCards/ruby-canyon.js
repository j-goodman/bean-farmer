import { WorldCard } from '../worldCard.js';
import { Rock } from '../rock.js';
import { Player } from '../player.js';
import { Ruby } from '../ruby.js';
import { Ore } from '../ore.js';
import { WoolyPig } from '../woolyPig.js';
import { Grass } from '../grass/grass.js';
import { SnowSnail } from '../snowSnail.js';
import { Boulder } from '../boulder.js';
import { Crate } from '../crate.js';
import { DragonFlowerSeed } from '../dragonFlowerSeed.js';
import { Sapphire } from '../sapphire.js';
import { Bomb } from '../bomb.js';
import { SulfurCrystal } from '../sulfurCrystal.js';
import { SmokyQuartz } from '../smokyQuartz.js';
import { RockGolem } from '../rockGolem.js';
import { Brick } from '../brick.js';
import { Key } from '../key.js';
import { HeartFlower } from '../heartFlower.js';
import { Ring } from '../rings.js';

let rubyCanyon = new WorldCard (
    [
        `      W                        ,`,
        ` RRRXXXXXXXXXXXXXXXXXXX         `,
        `WXRRRX*XX*XX*XX XX*XXXX         `,
        ` XXR                 XX         `,
        `XXXX XXXX XX XXBXXXX XX         `,
        `XXXX X     X X   i X XX         `,
        `XXXX X   XXX XXX   X XXXXXXXXXX `,
        `RRXX XXXXXIX XIXXXXX XXXXXXXXXX `,
        `RRRR                  XXXXx CCX `,
        `RIRRRRXXX XXXXXXXXXX      C  CR `,
        `RRIRRRRXX  XXXXXXXXXBBXXXXCCxxR `,
        `        XX XI  IXXS   SXXXXXRRR `,
        `           X    XX     XXIXXXRR `,
        `       RRRXXX  XXX  S   I    XX `,
        `       RR        X         ! XX `,
        `       XR        BS   SXX    XX `,
        `       XX        RR XXXXXXXXXXX `,
        `       XXXXXCXXRRRRCXXXXXXXXXXX `,
        `       XXXXXCXXXXRR XXXXXRRRRRR `,
        `       XXrOO OXXXXX RIXXXRRRRR  `,
        ` W     XXOOO      C    RXRRRR   `,
        `  R    XXXXXXRRXXXC CC!XRRRRR   `,
        `g      XXXXXXXRRXXXXXXXXRRR     `,
        ` Bgg                        B   `,
    ],
    {
        "X": Brick,
        "R": Rock,
        "O": Ore,
        "B": Boulder,
        "*": DragonFlowerSeed,
        "b": Bomb,
        ",": HeartFlower,
        "x": SulfurCrystal,
        "!": Key,
        "I": RockGolem,
        "g": Grass,
        "W": WoolyPig,
        "B": Boulder,
        "C": Crate,
        "r": Ruby,
        "s": Sapphire,
        "S": SnowSnail,
        "P": Player,
        "i": Ring,
    }
)

rubyCanyon.setVariants("pearl ring", [
    "onyx",
])

rubyCanyon.rotateOnlyHorizontally = true

export { rubyCanyon }