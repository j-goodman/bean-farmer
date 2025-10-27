import { WorldCard } from '../worldCard.js';
import { Rock } from '../rock.js';
import { Player } from '../player.js';
import { Tree } from '../tree.js';
import { WildOnionSprout } from '../wildOnion/wildOnionSprout.js';
import { Stump } from '../stump.js';
import { Sign } from '../sign.js';
import { Bookshelf } from '../bookshelf.js';
import { Sawmill } from '../sawmill.js';
import { Firepot } from '../firepot.js';
import { Fence } from '../fence.js';
import { Hatchet } from '../hatchet.js';
import { SoilCleaner } from '../soilCleaner.js';
import { Bomb } from '../bomb.js';
import { Crate } from '../crate.js';
import { WoodGolem } from '../woodGolem.js';
import { Wood } from '../wood.js';
import { Brick } from '../brick.js';
import { Lockbox } from '../lockbox.js';
import { ExtraHeart } from '../extraHeart.js';
import { Shield } from '../shield.js';
import { Boomerang } from '../boomerang.js';
import { Grass } from '../grass/grass.js';
import { StoneWall } from '../stoneWall.js';
import { Ore } from '../ore.js';
import { Chicken } from '../chicken.js';
import { SecondGravestone } from '../secondGravestone.js';
import { HeartFlower } from '../heartFlower.js';

let golemwood = new WorldCard (
    [
        `!    ,       **XXHHHHH HBBBX! .,`,
        `           T   fXH,,!  HBvBXX.,G`,
        ` XXXX    ,     f,,,XXHHH#L#HHX,.`,
        `XXXXXX ,    , Tf,,c,XH     FHX !`,
        `XXT      ?   ,,fc,,,of S    HXX `,
        `,    ,        sf,,c,,f     #HXX `,
        `   ,        s ,f,o,,,f??    HXX `,
        `      *        fffffffHHH HHHXX `,
        ` T         ,    T,,,  sXH HXXX  `,
        `      ,  s          s   H HXXX, `,
        ` g          X   s      s   XXX  `,
        `   , s          g     ,    TXX  `,
        `s             ,      X   , gX** `,
        `       ,            XXXs   s ** `,
        `T           ,      XXXo     oX  `,
        ` !g ,             ?? o  ,  T    `,
        `       ??X     s ,,,,  , ,,,    `,
        `     s           ,,0,X,,,,o     `,
        `   s  *        ,    ,*,s,0,,    `,
        `  T    T   !         ,,,,g,,    `,
        `          g  ,      s ,  T      `,
        `            ,           0       `,
        `                  T          0  `,
        `!            **           0  !  `,
    ],
    {
        "X": Rock,
        "H": StoneWall,
        "P": Player,
        "B": Brick,
        "L": Lockbox,
        "o": WildOnionSprout,
        "0": Ore,
        "c": Chicken,
        "u": Shield,
        "g": WoodGolem,
        "!": SoilCleaner,
        "?": Crate,
        "b": Bomb,
        "T": Tree,
        "S": Sawmill,
        "F": Firepot,
        "f": Fence,
        "h": Hatchet,
        "v": Boomerang,
        "#": Bookshelf,
        "v": Boomerang,
        "s": Stump,
        "w": Wood,
        ",": Grass,
        ".": HeartFlower,
        "G": SecondGravestone,
    }
)

golemwood.writeSigns([
    `Excerpt from a journal:
    
    "The colorful heart flowers are the purest source of undead vitality on the island. I have not burned them yet despite this evil quality. That hermit says they should be protected."`,
    `Excerpt from a journal:

    "Calibrated the sawmill today to turn wood into fence posts. Useful for building, and it will help me avoid depending too much on the new loghouse."`,
    `Excerpt from a journal:

    "The ice snails almost killed me that winter, even with my wood golems protecting me. Their axes only worked when the snails came out of their shells. So I learned that the best weapon against them is fire."`,
])

export { golemwood }