import { WorldCard } from '../worldCard.js';
import { Rock } from '../rock.js';
import { Ore } from '../ore.js';
import { Ocean } from '../ocean.js';
import { Bommaker } from '../bommaker.js';
import { TradeRug } from '../tradeRug.js';
import { Bomb } from '../bomb.js';
import { Emerald } from '../emerald.js';
import { Ruby } from '../ruby.js';
import { Sapphire } from '../sapphire.js';
import { Grass } from '../grass/grass.js';
import { Sign } from '../sign.js';
import { SnowSnail } from '../snowSnail.js';
import { SnailEgg } from '../snailEgg.js';
import { Egg } from '../egg.js';
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
import { Sawmill } from '../sawmill.js';
import { Tree } from '../tree.js';
import { EyeStatue } from '../eyeStatue.js';
import { GateBlock } from '../gateBlock.js';
import { Spikes } from '../spikes.js';
import { SpikeController } from '../spikeController.js';
import { Boomerang } from '../boomerang.js';
import { IceBlast } from '../iceBlast.js';
import { BurningSword } from '../burningSword.js';
import { StoneWall } from '../stoneWall.js';
import { Chicken } from '../chicken.js';
import { SoilCleaner } from '../soilCleaner.js';

let devCard = new WorldCard (
    [
        `                                `,
        `                                `,
        `                                `,
        `                                `,
        `                                `,
        `                                `,
        `              bbbb              `,
        `            h bbbb              `,
        `              bbbb              `,
        `           P                    `,
        `        FFF FFFFFFFFFFFFFFFFF   `,
        `        F        ,,,,       F   `,
        `        F   c     ,,,,,,!   F   `,
        `        F          ,,,,,,,  F   `,
        `        F       l ,,,,,,    F   `,
        `        F           ,,,,,   F   `,
        `        F         !,,,,,    F   `,
        `        F  |   o  ,,,       F   `,
        `        F   o    ,          F   `,
        `        F                   F   `,
        `        FFFFFFFFFFFFFFFFFFFFF   `,
        `                                `,
        `                                `,
        `|                               `,
    ],
    {
        "R": Rock,
        "W": StoneWall,
        "X": Brick,
        "G": GateBlock,
        "0": Firepot,
        "$": WoodGolem,
        "+": ExtraHeart,
        "B": Boulder,
        "F": Fence,
        "v": Boomerang,
        "r": TradeRug,
        "l": Lamp,
        "b": Bomb,
        "k": Key,
        "E": EyeStatue,
        "e": Emerald,
        "r": Ruby,
        "s": Sapphire,
        "i": IceSheet,
        // "W": WoolyPig,
        "p": PowderBomb,
        "C": WoolyPigCarcass,
        "^": Spikes,
        "c": Chicken,
        "D": DragonFlower,
        "P": Player,
        ",": Grass,
        "T": Sign,
        "@": SnowSnail,
        "S": Stump,
        "|": Tree,
        "M": Sawmill,
        "?": SpikeController,
        "!": BurningSword,
        "m": Mushroom,
        "h": Hatchet,
        "o": Egg,
        "d": DragonFlowerSeed,
        "!": SoilCleaner,
    }
)

devCard.noRotate = true

devCard.writeSigns([
    "It's a sign."
])

devCard.setVariants("brick", ["dark"], true)

export { devCard }