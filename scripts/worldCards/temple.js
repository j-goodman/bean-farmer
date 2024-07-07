import { WorldCard } from '../worldCard.js';
import { Rock } from '../rock.js';
import { Ocean } from '../ocean.js';
import { Player } from '../player.js';
import { Brick } from '../brick.js';
import { Lockbox } from '../lockbox.js';
import { Key } from '../key.js';
import { RockGolem } from '../rockGolem.js';
import { ExtraHeart } from '../extraHeart.js';
import { SmokyQuartz } from '../smokyQuartz.js';
import { Crate } from '../crate.js';
import { WildOnionSprout } from '../wildOnion/wildOnionSprout.js';
import { Bomb } from '../bomb.js';
import { SulfurCrystal } from '../sulfurCrystal.js';

let temple = new WorldCard (
    [
        `               **               `,
        `    OOOOOOOOOOOOOOOOOOOOOOOO    `,
        `  OOOOOOOOOOOOOOOOOOOOOOOOOOOO  `,
        `  OOOOOOOOOO             OOOOO  `,
        ` OOOOOOOOO                 OOOO `,
        ` OOOXXXXXXXXXXXXXXXXXXXXX   OOO `,
        ` OOOXXXXXXXXX!XXXX!XXXXXX   OOO `,
        ` OXX   XX   X X  X X   XXX   OO `,
        ` OXX          L  L   ? XXX   OO `,
        ` OXX   XX   X X  X X   XXX   OO `,
        ` OOXX XXXXXXXXX  XXXXXXXX    OO `,
        `*OOXqqqXXXiibb    sss XXX    OO*`,
        `*OOXq+qXXXibb     sss XXX    OO*`,
        ` OOXqqqXXXLXX    XXXXXXXX    OO `,
        ` OXXXXXXX   X    XXX   XXX   OO `,
        ` OXXXXXXX + X    X      +X   OO `,
        ` OXXXXXXX   X    X X   XXX   OO `,
        ` OOO   XXXXXXLXXXXLXXXXXX    OO `,
        ` OOO   XXXXXX XXXX XXXXXX   OOO `,
        ` OOOO   XX            XX    OOO `,
        `  OOOOOOXX            XX   OOOO `,
        `  OOOOOOOOOOOOO          OOOOO  `,
        `    OOOOOOOOOOO  OOOOOOOOOOOOO  `,
        `               **OOOOOOOOOOO    `,
    ],
    {
        "X": Brick,
        "O": Ocean,
        "L": Lockbox,
        "q": SmokyQuartz,
        "b": Bomb,
        "s": WildOnionSprout,
        "i": SulfurCrystal,
        "!": RockGolem,
        "?": Crate,
        "+": ExtraHeart,
        "k": Key,
        "P": Player,
    }
)

export { temple }