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
import { HeartFlower } from '../heartFlower.js';
import { PointsGem } from '../pointsGem.js';
import { WoodGolem } from '../woodGolem.js';


let sawhouse = new WorldCard (
    [
        `        XIXIXRbbbbbbbpRRRpRRRp  `,
        `        X+  XRRRRRRRRRRRRbRRRR  `,
        `        X   XRRRRbRRRRbRRbRRRRT `,
        `        X  1XRRRRRRRRbRbRbRRRRb `,
        `       XXX XXXXXRRRRRRRRbbbbRRRR`,
        `       ==*=======RRRRRRRRRRbbbb `,
        ` S     XXX%XXIIIIIIIIIIXRRRRRRR `,
        `      S X   X  & ??????XIIX     `,
        `  B     X   %  =*=========X     `,
        `        X   X &   ?????X  X     `,
        `     XXBXIIIXIXIXIXIXIIX& X     `,
        `     X   ----W   & d   X  X     `,
        `     XXXX----  &i &m &    X     `,
        `S       XWWWWW WWWWWW WXIIX     `,
        `   S    X=*============X  !     `,
        `       ,XXdXIIIIXIXIXIIX ???    `,
        `  B     X=*============X!???    `,
        `        XIIXIIX??XIIXIIX        `,
        `     S     X=*==========    B   `,
        ` S         X=*=========  ,      `,
        `     B   , X=*========      !   `,
        `           X=*=======     B     `,
        ` ,     S           ,            `,
        `B                              ,`,
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
        "1": PointsGem,
        ",": HeartFlower,
        "b": Bomb,
        "p": PowderBomb,
        "W": StoneWall,
        "&": WoodGolem,
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