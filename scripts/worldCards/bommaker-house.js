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
import { IceSheet } from '../iceSheet.js';
import { Firepot } from '../firepot.js';
import { Hatchet } from '../hatchet.js';
import { Mushroom } from '../mushroom.js';
import { WildOnionSprout } from '../wildOnion/wildOnionSprout.js';
import { Player } from '../player.js';
import { DragonFlowerSeed } from '../dragonFlowerSeed.js';
import { WildCornSeed } from '../wildCornSeed.js';
import { PowderBomb } from '../powderBomb.js';
import { MeteorCrystal } from '../meteorCrystal.js';
import { HeartFlower } from '../heartFlower.js';

let bommakerHouse = new WorldCard (
    [
        `,  RRRRRRO      ??RRRRORRR RR  ,`,
        ` RRRRORRRRO   k ??RRRRRROR RRR  `,
        `RRRRRRRORRRR    RRRR       RRRR `,
        `    RRORRORRRR RRRRR RRROR RRRR `,
        `RR  RRRRRRRORR       RRRRR RRR  `,
        ` R  RRRORRRR   RRRRRRRRRRR RRR  `,
        ` R  RRORRORR RRORRRRRRRRRR RRRR `,
        ` R  RRRRORRR RXXRRRRRRRRRR   RR `,
        ` RR  RRRRRRF Z XRXXXXXRRRRRR RR `,
        ` ORR RRRRRT    XRX   XXRRRRR RR `,
        `  OR  RRRRR    XXX           RR `,
        `  R   RRRRX B        XXRR RRRRR `,
        `        RRX    XXX r Xb   RRRR  `,
        `        .RX?   XbXXXXX RRRRR    `,
        `        ..XXX XXb..             `,
        `        ...........             `,
        `          ........   RRO        `,
        `            ....      RRR       `,
        `                     RRRRR      `,
        `                    OORRR       `,
        `    W         b      OR         `,
        `                    O           `,
        `                                `,
        `,                              ,`,
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
        ".": Grass,
        "i": IceSheet,
        "T": Sign,
        "S": Stump,
        "p": PowderBomb,
        "m": MeteorCrystal,
        "?": Crate,
        "h": Hatchet,
        "o": WildOnion,
        "d": DragonFlowerSeed,
        "s": WildOnionSprout,
        "F": Firepot,
        ",": HeartFlower,
    }
)

bommakerHouse.noRotate = true

bommakerHouse.writeSigns([
    "Add sulfur-rich seeds to the crystallizer to get crystals.",
])

export { bommakerHouse }