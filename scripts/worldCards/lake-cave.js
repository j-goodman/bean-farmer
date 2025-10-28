import { WorldCard } from '../worldCard.js';
import { Rock } from '../rock.js';
import { Player } from '../player.js';
import { Ocean } from '../ocean.js';
import { Key } from '../key.js';
import { Grass } from '../grass/grass.js';
import { WildOnionSprout } from '../wildOnion/wildOnionSprout.js';
import { Stump } from '../stump.js';
import { PigLily } from '../pigLily.js';
import { Brick } from '../brick.js';
import { ExtraHeart } from '../extraHeart.js';
import { Lockbox } from '../lockbox.js';
import { DragonFlowerSeed } from '../dragonFlowerSeed.js';
import { WoolyPig } from '../woolyPig.js';
import { DragonFlower } from '../dragonFlower.js';
import { Bomb } from '../bomb.js';
import { PowderBomb } from '../powderBomb.js';
import { HeartFlower } from '../heartFlower.js';
import { PointsGem } from '../pointsGem.js';
import { Ring } from '../rings.js';
import { Tree } from '../tree.js';
import { SoilCleaner } from '../soilCleaner.js';
import { WildOnionSeed } from '../wildOnion/wildOnionSeed.js';
import { BrokenGlasses } from '../brokenGlasses.js';

let lakeCave = new WorldCard (
    [
        `bDbDpWbpddbbbbbpbbbbbbbbb    W  `,
        `dppgW d d  ;            |      W`,
        `;DDWdp pdd       ;           h  `,
        `pDbd|Db                        h`,
        `b d d b      ;                  `,
        `b  ;  bbp                       `,
        `b    d;  S    S                 `,
        `bb         S    !        X      `,
        `;b          ,.                  `,
        `bb  ;       ..OOOOO,  X         `,
        `b h         !OOOOOOO.l      |   `,
        `h           OOOOOOOO!           `,
        ` h         !OOOOOOOO ..         `,
        `    |     l OOOOOOOa..!         `,
        `           , OOOOO.....         `,
        `        X    .l !..S..          `,
        ` XXX      X       ..   S  X     `,
        `XXXXXX                  X       `,
        `XBBBXX                          `,
        `B   BXX                         `,
        `B e BXX         |               `,
        `B   BX|               |      h  `,
        `XBLBXX    X                    h`,
        ` XdXX                       h   `,
    ],
    {
        "X": Rock,
        "B": Brick,
        "d": DragonFlowerSeed,
        "D": DragonFlower,
        "b": Bomb,
        "p": PowderBomb,
        "P": Player,
        "e": Ring,
        "W": WoolyPig,
        "L": Lockbox,
        "S": Stump,
        ".": Grass,
        // ",": WildOnionSprout,
        // ";": WildOnionSeed,
        "!": SoilCleaner,
        "l": PigLily,
        "O": Ocean,
        "h": HeartFlower,
        "|": Tree,
        "g": BrokenGlasses,
    }
)

export { lakeCave }