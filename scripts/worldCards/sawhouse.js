import { WorldCard } from '../worldCard.js';
import { Brick } from '../brick.js';
import { Player } from '../player.js';
import { Bomb } from '../bomb.js';
import { Narrowbrick } from '../narrowbrick.js';
import { Lockbox } from '../lockbox.js';
import { Sawblade } from '../sawblade.js';
import { SawbladeTrack } from '../sawbladeTrack.js';
import { StoneWall } from '../stoneWall.js';
import { Wood } from '../wood.js';
import { BrokenSaw } from '../brokenSaw.js';
import { Sawmill } from '../sawmill.js';
import { PowderBomb } from '../powderBomb.js';
import { Crate } from '../crate.js';
import { WoodFloor } from '../woodFloor.js';
import { ExtraHeart } from '../extraHeart.js';
import { Hatchet } from '../hatchet.js';
import { SoilCleaner } from '../soilCleaner.js';
import { Key } from '../key.js';
import { Tree } from '../tree.js';
import { Stump } from '../stump.js';
import { WoolyPig } from '../woolyPig.js';
import { Boulder } from '../boulder.js';
import { DragonFlowerSeed } from '../dragonFlowerSeed.js';
import { Rock } from '../rock.js';


let sawhouse = new WorldCard (
    [
        `        XIXIXRbbbbbbbpRRRpRRRp  `,
        `        X+  XRRRRRRRRRRRRbRRRR  `,
        `        X   XRRRRbRRRRbRRbRRRRT `,
        `        X  +XRRRRRRRRbRbRbRRRRb `,
        `       XXX XXXRRRRRRRRRRbbbbRRRR`,
        `       ==*====RRRRRRRRRRRRRbbbb `,
        ` S     XXX%XXIIIIIIIIIIXRRRRRRR `,
        `      S X   X    ??????XIIX     `,
        `  B     X   %  =*=========X     `,
        `        X   X     ?????X  X     `,
        `    S   XIIIXIXIXIXIXIIX  X     `,
        `        X----W     d   X  X     `,
        `        X----R       i    X     `,
        `S       XWWWWW  m m    XIIX     `,
        `   S    X=*============X! !     `,
        `        XXdXIIIIXIXIXIIX ???    `,
        `  B     X=*============X!???    `,
        `        XIIXIIX??XIIXIIX        `,
        `     S     X=*==========    B   `,
        ` S         X=*=========         `,
        `     B     X=*========          `,
        `           X=*=======     B     `,
        `       S                        `,
        `B                               `,
    ],
    {
        "P": Player,
        "!": SoilCleaner,
        "h": Hatchet,
        "d": DragonFlowerSeed,
        "X": Brick,
        "R": Rock,
        "B": Boulder,
        "I": Narrowbrick,
        "?": Crate,
        "%": Lockbox,
        "=": SawbladeTrack,
        "*": Sawblade,
        "+": ExtraHeart,
        "b": Bomb,
        "p": PowderBomb,
        "W": StoneWall,
        "i": BrokenSaw,
        "m": Sawmill,
        "-": Wood,
        "k": Key,
        "T": Tree,
        "S": Stump,
    }
)

sawhouse.setVariants("bomb", [
    "detonate", "detonate", "detonate", "detonate", "detonate", "detonate",
    "detonate", "detonate", "detonate", "detonate", "detonate", "detonate",
    "detonate", "detonate", "detonate", "detonate", "detonate", "detonate",
])
// sawhouse.noRotate = true

sawhouse.floor = WoodFloor
sawhouse.floorBounds = [{x: 8, y: 9}, {x: 23, y: 14}]

export { sawhouse }