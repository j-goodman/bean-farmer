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
import { Fence } from '../fence.js';
import { Lamp } from '../lamp.js';
import { WoodGolem } from '../woodGolem.js';
import { PowderBomb } from '../powderBomb.js';
import { SnowGolem } from '../snowGolem.js';
import { ExtraHeart } from '../extraHeart.js';

let devCard = new WorldCard (
    [
        `     RRRRRRRRRRRRRRRRRRRRRRRRRR `,
        `     R                        R `,
        `     R                        R `,
        `     R                        R `,
        `     R                        R `,
        `     R X                X     R `,
        `     R  X              X      R `,
        `     R                        R `,
        `     R         D          p   R `,
        `     R                        R `,
        `     R                D       R `,
        `     R                        R `,
        `     R     Ph   FFFFFFFF      R `,
        `     R                        R `,
        `     R  $$          eeee      R `,
        `     R  $        $            R `,
        `     R         D   $ D      @ R `,
        `     R       p   $            R `,
        `     R  X         D    X      R `,
        `     R X    l           X     R `,
        `     R                        R `,
        `     R     @     bbb          R `,
        `     R           bbb          R `,
        `     RRRRRRRRRRRRRRRRRRRRRRRRRR `,
        ],
    {
        "R": Rock,
        "X": Brick,
        "O": Ore,
        "$": SnowGolem,
        "e": ExtraHeart,
        "B": Boulder,
        "F": Fence,
        "r": TradeRug,
        "l": Lamp,
        "b": Bomb,
        "k": Key,
        "i": IceSheet,
        "W": WoolyPig,
        "p": PowderBomb,
        "C": WoolyPigCarcass,
        "c": WildCornSeed,
        "D": DragonFlower,
        "G": RockGolem,
        "P": Player,
        "g": Grass,
        "T": Sign,
        "@": SnowSnail,
        "S": Stump,
        "?": Crate,
        "m": Mushroom,
        "h": Hatchet,
        "o": SnailEgg,
        "d": DragonFlowerSeed,
        "s": WildOnionSprout,
    }
)

devCard.writeSigns([
    "This is a test."
])

export { devCard }