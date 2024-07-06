import { WorldCard } from '../worldCard.js';
import { Rock } from '../rock.js';
import { Ore } from '../ore.js';
import { Ocean } from '../ocean.js';
import { Bommaker } from '../bommaker.js';
import { TradeRug } from '../tradeRug.js';
import { Bomb } from '../bomb.js';
import { Emerald } from '../emerald.js';
import { Grass } from '../grass/grass.js';
import { Sign } from '../sign.js';
import { SnowSnail } from '../snowSnail.js';
import { SnailEgg } from '../snailEgg.js';
import { RockGolem } from '../rockGolem.js';
import { Stump } from '../stump.js';
import { Crate } from '../crate.js';
import { IceSheet } from '../iceSheet.js';
import { DragonFlower } from '../dragonFlower.js';
import { WoolyPig } from '../woolyPig.js';
import { WoolyPigCarcass } from '../woolyPigCarcass.js';
import { WildOnion } from '../wildOnion/wildOnion.js';
import { Firepot } from '../firepot.js';
import { Hatchet } from '../hatchet.js';
import { Mushroom } from '../mushroom.js';
import { WildOnionSprout } from '../wildOnion/wildOnionSprout.js';
import { Player } from '../player.js';
import { DragonFlowerSeed } from '../dragonFlowerSeed.js';
import { WildCornSeed } from '../wildCornSeed.js';

let devCard = new WorldCard (
    [
        `                                `,
        `                                `,
        `                                `,
        `                                `,
        `                                `,
        `       X                X       `,
        `        X              X        `,
        `        XXXXXXX XXXXXXX         `,
        `        X            X          `,
        `        X XXbbXXXXX  X          `,
        `        X XXb     X  X          `,
        `        X XX      X             `,
        `        X          G  X         `,
        `        XXXX         XX         `,
        `              e                 `,
        `          XXXXXX Ph X           `,
        `                   @            `,
        `        X              X        `,
        `       X                X       `,
        `                                `,
        `                                `,
        `                                `,
        `                                `,
        `                                `,
        ],
    {
        "X": Rock,
        "O": Ore,
        "$": Ocean,
        "B": Bommaker,
        "r": TradeRug,
        "b": Bomb,
        "i": IceSheet,
        "W": WoolyPig,
        "C": WoolyPigCarcass,
        "c": WildCornSeed,
        "D": DragonFlower,
        "G": RockGolem,
        "P": Player,
        "e": SnailEgg,
        "g": Grass,
        "T": Sign,
        "@": SnowSnail,
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

devCard.writeSigns([
    "This is a test."
])

export { devCard }