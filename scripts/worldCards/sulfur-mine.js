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
import { StoneWall } from '../stoneWall.js';

let sulfurMine = new WorldCard (
    [
        `                 S RRRR RRRRR   `,
        `S              s RRRRR  RRRRRRR `,
        `    W        s   sRRRR RRRRR RR `,
        `               s  RRRR  RRRR RR `,
        `             s   RRRRRR  RRRR RR`,
        `               s RRRRRRR RR RRRR`,
        ` S           R  RRRRRRRR ROR RRR`,
        `            RR RRRRROROR   RR R `,
        `S          RRRRRRR   ORRRR R ROR`,
        ` SRRRO    RRRR R W     RR   RRR `,
        `RRRRRRORR  RROR RR  W   RR RRR R`,
        `ORRRR!RORR  RRRR ??? RORRRRRR RR`,
        ` OR!R ORORR   R  ???  RORORRRR  `,
        ` RRRk?RORRRRRsR  ???RRORRRORR   `,
        `  R!R??ROsOss      RRRRORRORR   `,
        `  RRO!RRRRRR??s  R  RRORRROR    `,
        `  RRRORRRRR      RR  O    RR    `,
        `      RRRRRR   RRRRR   RR  R    `,
        `  ORR   RRRR RRRR RRRRRRR    R  `,
        ` RRRORO OR   RRRR  ROR RR RROR  `,
        ` RRRROROROR  RRR R RRRR R RORR  `,
        `  RORRRORR      RR RR RRO  RR   `,
        `   RORR          R   RORRR R    `,
        `                                `,
    ],
    {
        "X": StoneWall,
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