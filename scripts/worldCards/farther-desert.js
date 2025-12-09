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
import { Dollar } from '../dollar.js';
import { RandomGem } from '../randomGem.js';
import { RazorWire } from '../razorWire.js';
import { Penny } from '../penny.js';

let fartherDesert = new WorldCard (
    [
    `                        `,
    `         W      X  .. . `,
    ` |H       ,   O  .. .x. `,
    `W HG             . ... .`,
    `  H     ,XO,    . .. .. `,
    ` ,      XHX,,   ...  f..`,
    `      ,,,H,       . . . `,
    `     HHHHH         .    `,
    `                 HHH    `,
    `  X                     `,
    `            HHHHHH      `,
    `            H  G       H`,
    `       ..f..H  B       H`,
    `   ..|.f.. .H.       H H`,
    `  . ....... ..       H H`,
    `   .....f.           H  `,
    ` x   f..             H  `,
    `                HHHHHH  `,
    ],
    {
        "X": Rock,
        "B": Boulder,
        "f": Fire,
        "P": Player,
        "h": Hatchet,
        "m": Mushroom,
        "W": WoolyPig,
        "x": Cactus,
        ".": Grass,
        "|": Tree,
        "O": Ore,
        "*": Dollar,
        ",": Penny,
        "@": Pesoduro,
        "H": RazorWire,
        "?": Crate,
        "g": RandomGem,
    }
)

export { fartherDesert }