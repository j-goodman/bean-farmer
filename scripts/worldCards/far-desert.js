import { WorldCard } from '../worldCard.js';
import { Rock } from '../rock.js';
import { Boulder } from '../boulder.js';
import { WoolyPig } from '../woolyPig.js';
import { Cactus } from '../cactus.js';
import { Player } from '../player.js';
import { Hatchet } from '../hatchet.js';
import { Mushroom } from '../mushroom.js';
import { Grass } from '../grass/grass.js';
import { Bomb } from '../bomb.js';
import { Tree } from '../tree.js';
import { Ore } from '../ore.js';
import { Fire } from '../fire.js';
import { Pesoduro } from '../pesoduro.js';
import { StoneWall } from '../stoneWall.js';
import { Crate } from '../crate.js';
import { Sapphire } from '../sapphire.js';
import { Emerald } from '../emerald.js';
import { Ruby } from '../ruby.js';

let farDesert = new WorldCard (
    [
    `   O      X        .... `,
    `X    x           ...... `,
    `          OX    ........`,
    ` O       OXX    ........`,
    `      O X X     ........`,
    `                 ...... `,
    ` B   X             ..   `,
    `            ..          `,
    `  ...      ......       `,
    ` ......    ...H..H. H   `,
    `  ....x.    ..HHHHHHH   `,
    `     .....  . Hs****H|  `,
    `   ......b... H****rH   `,
    `  ...|.f....b.H**sesH   `,
    `  ............Hsrss*H   `,
    `   .....f.|...HHHHHHH   `,
    ` x   b......     B      `,
    `                       x`,
    ],
    {
        "X": Rock,
        "B": Boulder,
        "b": Bomb,
        "f": Fire,
        "P": Player,
        "h": Hatchet,
        "m": Mushroom,
        "W": WoolyPig,
        "x": Cactus,
        ".": Grass,
        "|": Tree,
        "O": Ore,
        "*": Pesoduro,
        "H": StoneWall,
        "?": Crate,
        "s": Sapphire,
        "e": Emerald,
        "r": Ruby,
    }
)

farDesert.setVariants("bomb", [
    "detonate", "detonate", "detonate", "detonate", "detonate", "detonate",
])


export { farDesert }