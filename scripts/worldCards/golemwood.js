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

let golemwood = new WorldCard (
    [
        `!    XXXXXXXXXX**XXXXXXXXXBBBXX `,
        `   XXXXXXX   T  !fXXXXXXXXBvBXXX`,
        `  XXXXXXX  ,     f,,,XXHHHBLBHHX`,
        ` XXXXXX  ,    , Tf,,,,XH    FFHX`,
        ` XXXT      ?     f,,,,of S    HX`,
        `XXX    ,        sf,,c,,f    ##HX`,
        `XX   ,        s  f,o,,,f??    HX`,
        `XX      *        fffffffHHH HHHX`,
        `XX T         ,    T,    sXH HXXX`,
        `XX      ,  s          s   H HXXX`,
        `X  g          X   s      s   XXX`,
        `X    , s          g     ,    TXX`,
        `* s             ,      X   , gX*`,
        `*        ,            XXXs   s *`,
        `XX  T         ,      XXXo     oX`,
        `XXX!g ,             ?? o  , T  X`,
        `XXXTX    ??X     s ,,,,  , ,,, X`,
        `XXXXX  s           ,,0,X,,,,o XX`,
        `XXXXXs  *        ,XXXX,*,s,0,,XX`,
        ` XXXT    T      XXXXXX ,,,,g,,XX`,
        ` XXXXX      g  ,XXXXXXs ,  T XX `,
        `    XXXXXX    ,  XXXX     0     `,
        `      XXXXXXX       T          0`,
        `!      XXXXX   **           0  !`,
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
    }
)

golemwood.writeSigns([
    `It's a shelf of old journals.
    
    "You can kill a snail with an axe if you catch it out of its shell, but remember the best weapon against it is fire."`,
    `It's a shelf of old journals.
    
    "The sawmill is calibrated to take in wood and make fenceposts."`,
])

export { golemwood }