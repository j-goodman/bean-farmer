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
import { SoilCleaner } from '../soilCleaner.js';
import { StoneWall } from '../stoneWall.js';
import { Chicken } from '../chicken.js';
import { Fence } from '../fence.js';
import { HeartFlower } from '../heartFlower.js';
import { Ore } from '../ore.js';

let lampwood = new WorldCard (
    [
        `               ..XXXXXXXXXXX    `,
        `    W  XXXXXXXXX o  ...dXXXXXX  `,
        `    XXXXXXXXXXXXX ..  ...oXXXXXX`,
        `   XXXXX0XXXXXX0XXX.. @..... XRX`,
        `  XXX0XXXXXXX0XXXXXd ......  XXX`,
        `  XXXXX0XXXXXXXXXXXX...o... XXRX`,
        `  XXXXXXXXXXXXXXXXX.o.D.XXXXXXXX`,
        ` .XXXXXXX0XXBBBBBBBB..XXXXRXRXRX`,
        `..XXXX0XXXXXB? ?p??BBBBXXXXXXXXX`,
        `...X0XXXXXXXB i  , XD           `,
        `...XXXXXXXXXBb pp? BBBBXXXXX    `,
        `...XXXXX0XXXBBBBBBBBXXXXXXXXXX  `,
        ` ...XXXXXXXXXXX . .XXXXXXXXXXXX `,
        `  ...SXXXXXX. .. .. .XXXXXXXXXX `,
        ` W ......XXXX ...  XXXXXXXXXX   `,
        `   S ...S XX  .XXXXXXXXXXXXXS   `,
        `            . XXXXXXXXTXXX      `,
        `   h        SXXXXXXXXX          `,
        `             XXXXXXXX    XXS    `,
        `           S XXXXXXXS   XXX     `,
        `        h  ...XXXXXX    XXX     `,
        `          W   XXXXXXXX       S  `,
        `h        ... SXXXXXXXXXXX       `,
        `         .. ...  XXXXXX         `,
    ],
    {
        "X": Rock,
        "B": StoneWall,
        "i": Lamp,
        "L": Lockbox,
        "b": Bomb,
        ",": SoilCleaner,
        "d": DragonFlowerSeed,
        "D": DragonFlower,
        "o": WildOnionSprout,
        "c": Chicken,
        "R": RockGolem,
        "F": Fence,
        "W": WoolyPig,
        "@": SnowSnail,
        "!": SoilCleaner,
        "P": Player,
        "p": PricklyPear,
        "k": Key,
        "T": Tree,
        "?": Crate,
        ".": Grass,
        "0": Ore,
        "m": Mushroom,
        "S": Stump,
        "h": HeartFlower,
    }
)

export { lampwood }