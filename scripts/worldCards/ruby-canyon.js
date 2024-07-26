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

let rubyCanyon = new WorldCard (
    [
        `      W                         `,
        ` RRRXXXXXXXXXXXXXXXXXXXX        `,
        `WXRRRX*XX*XX*XX*XX*XXXXXX       `,
        ` XXR                 XXXXX      `,
        `XXXX XXXXXXX XXXXXXX XXXXXXXXX  `,
        `XXXX XXXXXXX XXXXXXX XXXXXXXXXX `,
        `XXXX XXXXXXX XXXXXXX XXXXXXXXXX `,
        `RRXX XXXXXIX XIXXXXX XXXXXXXXXX `,
        `RRRR                  XXXXx CCX `,
        `RIRRRRXXX XXXXXXXXXX      C  CR `,
        `RRIRRRRXX  XXXXXXXXXBBXXXXCCxxR `,
        `        XX XI  IXXS   SXXXXXRRR `,
        `           X    XX     XXIXXXRR `,
        ` RRXXRRRRRXXX  XXX  S   I    XX `,
        ` RRXXXRRR        X         ! XX `,
        ` RXXXXXXR        BS   SXX    XX `,
        ` XXXXXXXX        RR XXXXXXXXXXX `,
        ` XXXXXXXXXXXCXXRRRRCXXXXXXXXXXX `,
        ` XXXXXXXXXXXCXXXXRR XXXXXXXXXXX `,
        ` XXXXXXXXrOO OXXXXX RIXXXXXRXX  `,
        ` WXXXXXXXOOO      C    RXXXXX   `,
        `  XXXXXXXXXXXRRXXXC CC!XRRRRX   `,
        `g  XXXXXXXXXXXRRXXXXXXXXRRR     `,
        ` Bgg                        B   `,
    ],
    {
        "X": Brick,
        "R": Rock,
        "O": Ore,
        "B": Boulder,
        "*": DragonFlowerSeed,
        "b": Bomb,
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
    }
)

rubyCanyon.rotateOnlyHorizontally = true

export { rubyCanyon }