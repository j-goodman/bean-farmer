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
        ` XXXXXXXXXXXXXXXXXXXXXXX        `,
        `WXXXXX*XX*XX*XX*XX*XXXXXX       `,
        ` XXX                 XXXXX      `,
        `XXXX XXXXXXX XXXXXXX XXXXXXXXX  `,
        `XXXX XXXXXXX XXXXXXX XXXXXXXXXX `,
        `XXXX XXXXXXX XXXXXXX XXXXXXXXXX `,
        `RRXX XXXXXIX XIXXXXX XXXXXXXXXX `,
        `RRRR                  XXXXx CCX `,
        `RIRRRRXXX XXXXXXXXXX      C  CX `,
        `RRIRRRRXX  XXXXXXXXXBBXXXXCCxxX `,
        `        XX XI  IXXS    XXXXXXXX `,
        `           X    XX     XXIXXXXX `,
        ` RRXXRXXXXXXX  XXX      I    XX `,
        ` RRXXXXXX        X      B  ! XX `,
        ` RXXXXXXX        B    SXX    XX `,
        ` XXXXXXXX        XX XXXXXXXXXXX `,
        ` XXXXXXXXXXXCXXXXXXCXXXXXXXXXXX `,
        ` XXXXXXXXXXXCXXXXXX XXXXXXXXXXX `,
        ` XXXXXXXXrOO OXXXXX XXXXXXXXXX  `,
        ` WXXXXXXXOOO OXXXXC    XXXXXX   `,
        `  XXXXXXXXXXXXXXXXC CCCXXXXXX   `,
        `g  XXXXXXXXXXXXXXXXXXXXXXXX     `,
        ` gg  B             B            `,
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

export { rubyCanyon }