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

let rubyCanyon = new WorldCard (
    [
        `  XX  WXXXXXXXX  XXXXXX         `,
        ` XXXXXXXXXXXXXX   XXXXXX        `,
        `WXXOOOOOOOOOOOXXX   XXXXX       `,
        ` XXOOOO      OXXXX     XXX      `,
        `XXXOOOOOOOOO OXXXXXX       XXX  `,
        `XXXXXXXXXXXX XXXXXXXX    XXXXXX `,
        `XXXXXXXXXXXX XXXXXXXXXXXXXXXXXXX`,
        `XXXXXXXXX* * *    * *  XXXXXXXXX`,
        `XXXXXXXXX           W *XXXxbbbXX`,
        `XXXXXXXXX                 CbbbXX`,
        `XXXXXXXXX*            *XXXCCxxXX`,
        `                  S    XXXXXXXXX`,
        `                       XXXXXXXX `,
        ` XXXXXXXX*     S  S   *XX    XX `,
        ` XXXXXXXX                  ! XX `,
        ` XXXXXXXX  W           XX    XX `,
        ` XXXXXXXX* * *    * * *XXXXXXXX `,
        ` XXXXXXXXXXXCXXXXXXCXXXXXXXXXXX `,
        ` XXXXXXXXXXXCXXXXXX XXXXXXXXXXX `,
        ` XXXXXXXXrOO OXXXXX XXXXXXXXXX  `,
        `  XXXXXXXOOO OXXXXC    XXXXXX   `,
        `  XXXXXXXXXXXXXXXXC CCCXXXXXX   `,
        `g  XXXXXXXXXXXXXXXXXXXXXXXX     `,
        ` gg  B             B            `,
    ],
    {
        "X": Rock,
        "O": Ore,
        "*": DragonFlowerSeed,
        "b": Bomb,
        "x": SulfurCrystal,
        "!": SmokyQuartz,
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