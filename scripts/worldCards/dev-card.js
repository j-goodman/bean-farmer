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
import { Brick } from '../brick.js';
import { Key } from '../key.js';
import { Boulder } from '../boulder.js';

let devCard = new WorldCard (
    [
        `                                `,
        `                                `,
        `                                `,
        `                                `,
        `                                `,
        `       X                X       `,
        `        X              X        `,
        `                                `,
        `                                `,
        `                                `,
        `          RRRRRRRRRR            `,
        `          R@ @@@ @@R            `,
        `          R@@ @ @ @R            `,
        `          R@@D@@@@@RRRR         `,
        `          R@@@@@W kbk R         `,
        `          R @@ @ kbkb R         `,
        `          R@@@@@ @@RR R         `,
        `        X RRRRRRRRRRR  X        `,
        `       X      Ph    RR  X       `,
        `            bbbbbbb             `,
        `                                `,
        `                                `,
        `                                `,
        `                                `,
        ],
    {
        "R": Rock,
        "X": Brick,
        "O": Ore,
        "$": Ocean,
        "B": Boulder,
        "r": TradeRug,
        "b": Bomb,
        "k": Key,
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