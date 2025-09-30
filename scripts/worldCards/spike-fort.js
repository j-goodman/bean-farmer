import { WorldCard } from '../worldCard.js';
import { Rock } from '../rock.js';
import { Bomb } from '../bomb.js';
import { Stump } from '../stump.js';
import { DragonFlower } from '../dragonFlower.js';
import { WildOnion } from '../wildOnion/wildOnion.js';
import { Hatchet } from '../hatchet.js';
import { Player } from '../player.js';
import { DragonFlowerSeed } from '../dragonFlowerSeed.js';
import { Brick } from '../brick.js';
import { Key } from '../key.js';
import { Spikes } from '../spikes.js';
import { SpikeController } from '../spikeController.js';
import { PowderBomb } from '../powderBomb.js';
import { Mushroom } from '../mushroom.js';
import { Grass } from '../grass/grass.js';
import { BurningSword } from '../burningSword.js';
import { SoilCleaner } from '../soilCleaner.js';
import { SnailEgg } from '../snailEgg.js';
import { Tree } from '../tree.js';
import { WildOnionSeed } from '../wildOnion/wildOnionSeed.js';
import { SnowSnail } from '../snowSnail.js';
import { WoolyPigCarcass } from '../woolyPigCarcass.js';
import { HeartFlower } from '../heartFlower.js';
import { MapTable } from '../mapTable.js';

let spikeFort = new WorldCard (
    [
        `  RRR   !       !    R  RRRRRR  `,
        ` RRRRR    !  XXXXXXXXXXXXXRRRRR `,
        `RRRR!  R     X^^^^^^^X   XRRRRR `,
        ` !R   !!!!!!  ^^^^^^^  M XRRRRR `,
        `   !R!!!!!!!!X^^^^^^^X   XRRRR  `,
        `  !!!!!! !!! X^^^%^^^XX XXRR    `,
        ` !!!!!!!!!   X^^^^^^^X   XR     `,
        `  !!!!!!!!!! X^^^^^^^X k XR     `,
        ` !!!!!!!!!!  X^^^^^^^X   XRRR   `,
        `!! !!!!!!!!!!XXXX XXXXXXXXRRRR  `,
        `!!!!!!!!!!!R    X XRRR,,,,RRRRR `,
        `!!!!! !RR       X XR,,D,,,,,,RR `,
        `!!!!!RRR   !    X X,,d@,,|S,,,R `,
        ` !!RRRRRRR    ! X XR,,SSTSSSS,R `,
        ` !RRRRRRRRRR  XXX XXX,TSSS, SSRR`,
        ` RRRRRRRRRRRRRX^^^^^X,,SSSW,oRRR`,
        `RRRRRRRRRRRRRRR^^^^^X   ST,,,,RR`,
        `RRRRRRRRRRRRRRR^^%^^ o   ,o ,,R `,
        `RRRRRRRRRRRRRRR^^^^^X, ,,  RR , `,
        ` RRRR  RRRRRRRR^^^^^X o,,,RRRR  `,
        ` RRR  RRRRRRRRRRRXXXX ,,,,RRR   `,
        `  R   RRRRRRRRRRRRR,,  ,, RR    `,
        `     RRRRRRRRRRRRRR RR, ,o      `,
        `            mRRRR   RR          `,
    ],
    {
        "R": Rock,
        "X": Brick,
        "b": Bomb,
        "M": MapTable,
        "k": Key,
        "^": Spikes,
        "D": DragonFlower,
        "P": Player,
        "S": Stump,
        "T": Tree,
        "%": SpikeController,
        "h": Hatchet,
        "m": Mushroom,
        "!": HeartFlower,
        "o": WildOnionSeed,
        "d": DragonFlowerSeed,
        ",": Grass,
        "@": SnowSnail,
        "W": WoolyPigCarcass,
        "|": SoilCleaner,
    }
)

spikeFort.setVariants("spike controller", ["simple", "simple"])

export { spikeFort }