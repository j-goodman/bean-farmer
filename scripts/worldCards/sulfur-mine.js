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

let sulfurMine = new WorldCard (
    [
        `  RRRRRRRRRRRRRRRRRRRRR RRRRR   `,
        ` RRRRRRRRR RRRRRRRRRRR RRRRRRRR `,
        `RRRRRRRRR R RRRRR RRRRR RRRR RR `,
        `RRRRRRR RRRR RRR RRRRR R RRRR RR`,
        `RRRR RORRRRRR RR RRRRRRRR R RRRR`,
        `RRR RORRORRR RR RRRRRRR RROR RRR`,
        `RR RRRRRRORRRR RRRRROROR RRRR R `,
        `RRR RRRRRRORRRR RR   ORRRRRR ROR`,
        `RRRRRORRRO  RR R       RR R RRR `,
        `RRRRR!ORR  RROR RR  W   RR RRR R`,
        `ORRRR RORR  RRRR  ?? RORRRRRR RR`,
        ` OR!R ORORR   R   ??  RORORRRR  `,
        ` RRRk?RORRRRRsR   ??RRORRRORR   `,
        `ROROR??ROsOss      RRRRORRORR R `,
        `RRRRORRRRRRR??s  R  RRORRROR  RO`,
        `RRRRRORRRRR      RR  O    RR ROR`,
        `RORRRRRRRRRR   RRRRR   RR RR ORR`,
        `RRORRRRRRRRR RRRR RRRRRRR    RRR`,
        `RRRORRRORORR RRRRR RR RRR RORRRR`,
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
        "?": Crate,
        "m": Mushroom,
        "h": Hatchet,
        "o": WildOnion,
        "d": DragonFlowerSeed,
        "s": WildOnionSprout,
        "F": Firepot,
    }
)

sulfurMine.rotateOnlyHorizontally = true

export { sulfurMine }