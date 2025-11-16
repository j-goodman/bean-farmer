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
import { Lockbox } from '../lockbox.js';
import { Hammer } from '../hammer.js';
import { Narrowbrick } from '../narrowbrick.js';

let spikeFort = new WorldCard (
    [
        `  RRR   !       !    R  RRRRRR @`,
        ` RRRRR    !  XXXXXXXXXXXXXRRRRRd`,
        `RRRR!  R     X^^^^^^^X   XRRRRRd`,
        ` !R   !!!!!!  ^^^^^^^  M XRRRRd@`,
        `   !R!!!!!!!!X^^^^^^^X   XRRdddd`,
        `. !!!!!! !!! X^^^%^^^XX XXRRdddd`,
        ` !!!!!!!!!   X^^^^^^^X   XR ddd `,
        `XIIIX!!!!!!! X^^^^^^^X k XR  d  `,
        `X!!!X!!!!!!  X^^^^^^^X   XRRR   `,
        `X h!L!!!!!!!!XXXX XXXXXXXXRRRR  `,
        `X!! X!!!!!!R    X XRRR,,,,RRRRR `,
        `XIIIX !RR       X XR,,D,,,,,,RR `,
        `!!!!!RRR   !    X X,,d@,,|S,,,R `,
        ` !!RRRRRRR    ! X XR,,SSTSSSS,R@`,
        ` !RRRRRRRRRR  XXX XXX,TSSS, SSRR`,
        ` RRR**|*RRRRRRX^^^^^X,,SSSW,oRRR`,
        `RRR*|***RRRRRRR^^^^^X   ST,,,,RR`,
        `RRR****RRRRRRRR^^%^^ o   ,o ,,R `,
        `RRRRRRRRRRRRRRR^^^^^X, ,,  RR , `,
        `  RRRRRRRRRRRRR^^^^^X o,,,RRRR  `,
        `      RRRRRRRRRRRXXXX ,,,,RRR   `,
        `  R   RRRRRRRRRRRRR,,  ,, RR    `,
        `     RRRRRRRRRRRRRR RR, ,o      `,
        `            mRRRR   RR          `,
    ],
    {
        "R": Rock,
        "X": Brick,
        "L": Lockbox,
        "h": Hammer,
        "b": Bomb,
        "M": MapTable,
        "k": Key,
        "^": Spikes,
        "D": DragonFlower,
        "P": Player,
        "S": Stump,
        "T": Tree,
        "%": SpikeController,
        "m": Mushroom,
        "!": HeartFlower,
        "o": WildOnionSeed,
        "d": DragonFlowerSeed,
        ",": Grass,
        "@": SnowSnail,
        "W": WoolyPigCarcass,
        "|": SoilCleaner,
        "*": HeartFlower,
        "I": Narrowbrick,
    }
)

spikeFort.setVariants("spike controller", ["simple", "simple"])

export { spikeFort }