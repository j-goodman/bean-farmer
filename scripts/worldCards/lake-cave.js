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

let lakeCave = new WorldCard (
    [
        `bWbDpbbpbbbpbbbpbbbp         W  `,
        `pbbp                           W`,
        `b                            h  `,
        `p                              h`,
        `b                          h    `,
        `b                               `,
        `b        S    S                 `,
        `p          S       X            `,
        `            ,                   `,
        `              OOOOO,  X         `,
        `  h          OOOOOOO.l          `,
        `h           OOOOOOOO            `,
        ` h          OOOkOOOO ..         `,
        `          l OOOOOOOa..          `,
        `           , OOOOO.....         `,
        `        X    .l  ..S..          `,
        ` XXX      X       ..   S  X     `,
        `XXXXXX                  X       `,
        `XBBBXX                          `,
        `B   BXX                         `,
        `B e BXX                         `,
        `B   BX                       h  `,
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
        "e": PointsGem,
        "W": WoolyPig,
        "L": Lockbox,
        "S": Stump,
        ".": Grass,
        ",": WildOnionSprout,
        "l": PigLily,
        "O": Ocean,
        "h": HeartFlower,
    }
)

export { lakeCave }