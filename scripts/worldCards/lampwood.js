import { WorldCard } from '../worldCard.js';
import { Rock } from '../rock.js';
import { Brick } from '../brick.js';
import { Player } from '../player.js';
import { Key } from '../key.js';
import { Lockbox } from '../lockbox.js';
import { Tree } from '../tree.js';
import { Stump } from '../stump.js';
import { Grass } from '../grass/grass.js';
import { Mushroom } from '../mushroom.js';
import { Crate } from '../crate.js';
import { PricklyPear } from '../pricklyPear.js';
import { WildOnionSprout } from '../wildOnion/wildOnionSprout.js';
import { RockGolem } from '../rockGolem.js';
import { Hatchet } from '../hatchet.js';
import { Bomb } from '../bomb.js';
import { DragonFlowerSeed } from '../dragonFlowerSeed.js';
import { DragonFlower } from '../dragonFlower.js';
import { SnowSnail } from '../snowSnail.js';
import { WoolyPig } from '../woolyPig.js';
import { Lamp } from '../lamp.js';

let lampwood = new WorldCard (
    [
        `     XXXXXXXXXX..XXXXXXXXXXXXXX `,
        `    WXXXXXXXXXXX o  ...dXXXXXXXX`,
        `   XXXXXXXXXXXXXX ..  ...oXXXXXX`,
        `XXXXXXXXXXXXXXXXXXX.. @..... XRX`,
        `XXXXXXXXXXXXXXXXXXXd ......  XXX`,
        `XXXXXXXXXXXXXXXXXXXX...o... XXRX`,
        `XXXXXXXXXXXXXXXXXXX.o.D.XXXXXXXX`,
        `XXXXXXXXXXXXBBBBBBBB..XXXXRXRXRX`,
        `XXXXXXXXXXXXB? ?p??BBBBXXXXXXXXX`,
        `XXXXXXXXXXXXB i    LX           `,
        `XXXXXXXXXXXXBb pp? BBBBXXXXXXXX `,
        `XXXXXXXXXXXXBBBBBBBBXXXXXXXXXXX `,
        `XXXXXXXXXXXXXXX    XXXXXXXXXXXX `,
        `     SXXXXXX         XXXXXXXXXX `,
        `         XXXX      XXXXXXXXXX   `,
        `        S XX   XXXXXXXXXXXXXS   `,
        `S             XXXXXXXXTXXX      `,
        `     ...    SXXXXXXXXX          `,
        `   ......    XXXXXXXX    XXS    `,
        `  .....    S XXXXXXXS   XXX     `,
        `   ...        XXXXXX    XXX     `,
        `              XXXXXXXX       S  `,
        `             SXXXXXXXXXXX       `,
        `        ...      XXXXXX         `,
    ],
    {
        "X": Rock,
        "B": Brick,
        "i": Lamp,
        "L": Lockbox,
        "b": Bomb,
        "d": DragonFlowerSeed,
        "D": DragonFlower,
        "o": WildOnionSprout,
        "R": RockGolem,
        "W": WoolyPig,
        "@": SnowSnail,
        "P": Player,
        "h": Hatchet,
        "p": PricklyPear,
        "k": Key,
        "T": Tree,
        "?": Crate,
        ".": Grass,
        "m": Mushroom,
        "S": Stump,
    }
)

export { lampwood }