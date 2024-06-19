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
import { Crystallizer } from '../crystallizer.js';
import { WoolyPig } from '../woolyPig.js';
import { WildOnion } from '../wildOnion/wildOnion.js';
import { Firepot } from '../firepot.js';
import { Hatchet } from '../hatchet.js';
import { Mushroom } from '../mushroom.js';
import { WildOnionSprout } from '../wildOnion/wildOnionSprout.js';
import { Player } from '../player.js';
import { DragonFlowerSeed } from '../dragonFlowerSeed.js';
import { WildCornSeed } from '../wildCornSeed.js';

let bommakerHouse = new WorldCard (
    [
        `   RRRRRRO      ??RRRRORRR RR   `,
        ` RRRRRRRRRO     ??RRRRRROR RRR  `,
        `RRRRRRRRRRRR    RRRR       RRRR `,
        `    RRRRRRRRRR RRRRR RRROR RRRR `,
        `RR  RRRRRRRRRR       RRRRR RRRRR`,
        ` R  RRRRRRRRRRRRRRRRRRRRRR RRRRR`,
        ` R  RRRRRRRRRRRRRRRRRRRRRR RRRR `,
        ` R  RRRRRRRRRRXXRRRRRRRRRR RRRR `,
        ` RR  RRRRRRF Z XRXXXXXRRRR RRRRR`,
        ` ORR RRRRRT    XRX   XXRRR RRRR `,
        `  OR  RRRRR    XXX         RRRR `,
        `  R   RRRRX          XXRR RRRRR `,
        `        RRX    XXX r Xb   RRRR  `,
        `         RX?   XbXXXXX RRRRR    `,
        `          XXX XXb               `,
        `                                `,
        `         s s   s s   RRO        `,
        `                      RRR       `,
        `                     RRRRR      `,
        `                    OORRR       `,
        `    W         b      OR         `,
        `                    O           `,
        `            B                   `,
        `                                 `,
        ],
    {
        "X": Brick,
        "R": Rock,
        "Z": Crystallizer,
        "O": Ore,
        "B": Bommaker,
        "r": TradeRug,
        "b": Bomb,
        "W": WoolyPig,
        "c": WildCornSeed,
        "D": DragonFlower,
        "P": Player,
        "e": Emerald,
        "g": Grass,
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

bommakerHouse.writeSigns([
    "Add sulfur-rich seeds to the crystallizer to get crystals."
])

export { bommakerHouse }