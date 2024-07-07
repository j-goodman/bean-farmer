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
        `  RRRRRRRRRRRRRRRRRRRRRORRRRR   `,
        ` RRRRRRRRRORRRRRRRRRRRORRRRRRRR `,
        `RRRRRRRRRORORRRRRORRRRRORRRRORR `,
        `RRRRRRRORRRRORRRORRRRRORORRRRORR`,
        `RRRRORORRRRRRORRORRRRRRRRORORRRR`,
        `RRRORORRORRRORRORRRRRRRORRORORRR`,
        `RRORRRRRRORRRRORRRRRORORORRRRORO`,
        `RRRORRRRRRORRRRORR   ORRRRRROROR`,
        `RRRRRORRRO  RROR      ORRORORRRO`,
        `RRRRR!ORR  RRORORR  W  ORRORRROR`,
        `ORRRR RORR  RRRR  ?? RORRRRRRORR`,
        ` OR!R ORORR   R   ??  RORORRRROR`,
        `ORRRk?RORRRRR R   ??RRORRRORRRRO`,
        `ROROR??RO O        RRRRORRORRRRO `,
        `RRRRORRRRRRR??   R  RRORRRORRRRO`,
        `RRRRRORRRRR      RR  O    RROROR`,
        `RORRRRRRRRRR   RRRRR   RR RRRORR`,
        `RRORRRRRRRRR RRRRORRRRRRR RRRRRR`,
        `RRRORRRORORR RRRRRORRORRR RORRRR`,
        `RRRROROROR   RRRRORRORORR RRORRR`,
        `RRRRROROROR  RRRORORRRROR RORRRR`,
        ` RRORRRORRR     RRRRRORRO  RRRRR`,
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

export { sulfurMine }