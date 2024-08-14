import { WorldCard } from '../worldCard.js';
import { Rock } from '../rock.js';
import { Brick } from '../brick.js';
import { Ore } from '../ore.js';
import { Bommaker } from '../bommaker.js';
import { TradeRug } from '../tradeRug.js';
import { Bomb } from '../bomb.js';
import { Emerald } from '../emerald.js';
import { Grass } from '../grass/grass.js';
import { Sign } from '../sign.js';
import { Stump } from '../stump.js';
import { Crate } from '../crate.js';
import { DragonFlower } from '../dragonFlower.js';
import { WoolyPig } from '../woolyPig.js';
import { WildOnion } from '../wildOnion/wildOnion.js';
import { Firepot } from '../firepot.js';
import { Hatchet } from '../hatchet.js';
import { Mushroom } from '../mushroom.js';
import { WildOnionSprout } from '../wildOnion/wildOnionSprout.js';
import { Player } from '../player.js';
import { DragonFlowerSeed } from '../dragonFlowerSeed.js';
import { WildCornSeed } from '../wildCornSeed.js';
import { Key } from '../key.js';
import { RockGolem } from '../rockGolem.js';
import { Fence } from '../fence.js';
import { Sawmill } from '../sawmill.js';

let sulfurMine = new WorldCard (
    [
        `           FFF FFS RRRR RRRRR   `,
        `S          F   s RRRRR RRRRRRRR `,
        `    W      F s   sRRRRR RRRR RR `,
        `           F   s  RRRRR RRRR RR `,
        `           F s   RRRRR R RRRR RR`,
        `           F   s RRRRRRRR R RRRR`,
        ` S         X R  RRRRRRR RROR RRR`,
        `       X M XRR RRRRROROR RRRR R `,
        `S      XXXXXRRRRRR   ORRRRRR ROR`,
        ` SRRRO    RRRR R       RR R RRR `,
        `RRRRRRORR  RROR RR  W   RR RRR R`,
        `ORRRR!RORR  RRRR  ?? RORRRRRR RR`,
        ` OR!R ORORR   R   ??  RORORRRR  `,
        ` RRRk?RORRRRRsR   ??RRORRRORR   `,
        `  R!R??ROsOss      RRRRORRORR   `,
        `  RRO!RRRRRR??s  R  RRORRROR    `,
        `  RRRORRRRR      RR  O    RR    `,
        `  RRRRRRRRRR   RRRRR   RR  R    `,
        `  ORRRRRRRRR RRRR RRRRRRR    R  `,
        ` RRROROROR   RRRR RROR RR RROR  `,
        ` RRRROROROR  RRR R RRRR R RORR  `,
        `  RORRRORR      RRRRR RRO  RR   `,
        `   RORR          R   RORRR R    `,
        `                                `,
    ],
    {
        "X": Brick,
        "R": Rock,
        "O": Ore,
        "B": Bommaker,
        "r": TradeRug,
        "F": Fence,
        "b": Bomb,
        "k": Key,
        "W": WoolyPig,
        "c": WildCornSeed,
        "D": DragonFlower,
        "P": Player,
        "e": Emerald,
        "g": Grass,
        "!": RockGolem,
        "T": Sign,
        "S": Stump,
        "M": Sawmill,
        "?": Crate,
        "m": Mushroom,
        "h": Hatchet,
        "o": WildOnion,
        "d": DragonFlowerSeed,
        "s": WildOnionSprout,
    }
)

export { sulfurMine }