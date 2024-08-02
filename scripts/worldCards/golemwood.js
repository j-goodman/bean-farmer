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

let golemwood = new WorldCard (
    [
        `   XXXXXXXXXXXX**XXXXXXXXBBBXXX `,
        ` XXXXXXXXX   T   !XXXXXXXBvBXXXX`,
        `XXXXXXXXX          XXXXXXBLBXXXX`,
        `XXXXXXX          T wwwXf    FFXX`,
        `XXXXT      ?b      wwwsf S    XX`,
        `XXX             s      f    ##XX`,
        `XX       ???  s    s   f??    XX`,
        `XX      * bb           ffff XXXX`,
        `XX  T            T      sXX XXXX`,
        `XX   T     s  !       s   X XXXX`,
        `X  g          X   s      s   XXX`,
        `X      s          g          TXX`,
        `*  T                   X     gX*`,
        `* !                   XXXs   s *`,
        `XX  T               ?XXXo     oX`,
        `XXX g    ?b        bb? o   T   X`,
        `XXXTX     ?X     s             X`,
        `XXXXX  T           T        o XX`,
        `XXXXXT  *              * T    XX`,
        `XXXXT    T          s     Tg  XX`,
        `XXXXXX  T   g         T    T XXX`,
        `XXXXXXXXXX                XXXXXX`,
        `XXXXXXXXXXXXXXX  XX T !XXXXXXXX `,
        `  XXXXXXXXXXXXX**XXXXXXXXXXXXXX `,
    ],
    {
        "X": Rock,
        "P": Player,
        "B": Brick,
        "L": Lockbox,
        "o": WildOnionSprout,
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
    }
)

golemwood.writeSigns([
    `It's a shelf of old journals.
    
    "You can kill a snail with an axe if you catch it out of its shell, but the best weapon against it is fire."`,
    `It's a shelf of old journals.
    
    "The sawmill is calibrated to take in wood and make fenceposts."`,
])

export { golemwood }