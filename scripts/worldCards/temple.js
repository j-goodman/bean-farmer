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
import { Boomerang } from '../boomerang.js';
import { Hatchet } from '../hatchet.js';

let temple = new WorldCard (
    [
        `               **               `,
        `          OOOOOOOOOOOO          `,
        `     OOOOOOOOOOOOOOOOOOOOOO     `,
        `   OOOOOOOOO             OOOO   `,
        `  OOOOOOOO                 OOO  `,
        `  OOXXXXXXXXXXXXXXXXXXXXX   OO  `,
        ` OOOXXXXXXXXX!XXXX!XXXXXX   OOO `,
        ` OXX   XX   X X  X X   XXX   OO `,
        ` OXX             L   v XXX   OO `,
        ` OXX   XX   X X  X X   XXX   OO `,
        ` OOXXLXXXXXXXXX  XXXXXXXX    OO `,
        `*OOXqqqXXXiibb    sss XXX    OO*`,
        `*OOXq+qXXXibb     sss XXX    OO*`,
        ` OOXqqqXXXLXX    XXXXXXXX    OO `,
        ` OXXXXXXX   X    XXX         OO `,
        ` OXXXXXXX + X    XX          OO `,
        ` OXXXXXXX   X    XX          OO `,
        ` OOO   XXXXXXLXXXXX          OO `,
        ` OOO   XXXXXX XXXXX         OOO `,
        ` OOOO   XX       XX         OOO `,
        `  OOOOOOXX       XX        OOOO `,
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
        "v": Boomerang,
        "s": WildOnionSprout,
        "i": SulfurCrystal,
        "!": RockGolem,
        "?": Crate,
        "+": ExtraHeart,
        "k": Key,
        "P": Player,
    }
)

temple.rotateOnlyHorizontally = true

export { temple }