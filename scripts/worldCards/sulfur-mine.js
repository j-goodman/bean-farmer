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
        `  FFFFFFFFFF s   S RRRR RRRRR   `,
        `S F        F   s RRRRR RRRRRRRR `,
        `  F W      F s   sRRRRR RRRR RR `,
        `  F        F   s sRRRRR RRRR RR `,
        `  F      FFF s   RRRRR R RRRR RR`,
        `  F  FFFFF     s RRRRRRRR R RRRR`,
        ` SFFFF     X R  RRRRRRR RROR RRR`,
        `       X M XRR RRRRROROR RRRR R `,
        `S      XXXXXRRRRRR   ORRRRRR ROR`,
        ` SRRRO    RRRR R       RR R RRR `,
        `RRRRRRORR  RROR RR  W   RR RRR R`,
        `ORRRR!RORR  RRRR  ?? RORRRRRR RR`,
        ` OR!R ORORR   R   ??  RORORRRR  `,
        ` RRRk?RORRRRRsR   ??RRORRRORR   `,
        `ROR!R??ROsOss      RRRRORRORR R `,
        `RRRRO!RRRRRR??s  R  RRORRROR  RO`,
        `RRRRRORRRRR      RR  O    RR ROR`,
        `RORRRRRRRRRR   RRRRR   RR RR ORR`,
        `RRORRRRRRRRR RRRR RRRRRRR    RRR`,
        `RRRROROROR   RRRR RROR RR RRORRR`,
        `RRRRROROROR  RRR R RRRR R RORRRR`,
        ` RRORRRORRR     RRRRR RRO  RRRRR`,
        ` RRRORRRORRR     R   RORRR RRRR `,
        `   RRRRRRRO        RRORRRR RRR  `,
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