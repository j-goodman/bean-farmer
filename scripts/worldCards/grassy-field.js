import { WorldCard } from '../worldCard.js';
import { Rock } from '../rock.js';
import { Player } from '../player.js';
import { Mushroom } from '../mushroom.js';
import { Grass } from '../grass/grass.js';
import { WildOnionSprout } from '../wildOnion/wildOnionSprout.js';
import { PigLily } from '../pigLily.js';
import { Ore } from '../ore.js';
import { WoolyPig } from '../woolyPig.js';
import { SnowSnail } from '../snowSnail.js';


let grassyField = new WorldCard (
    [
    `                               X`,
    `                           g   X`,
    `         W         g          XX`,
    `                    g        XXX`,
    `            O               XXXX`,
    `               g          l   XX`,
    `        *              *l     X `,
    `            g                lX `,
    `   gggg                W    OXX `,
    `ggg       g                XXX  `,
    ` gggg g               O    XXX  `,
    `   g  ggg                   XXX `,
    `    g g    g        XXX      XX `,
    `     gg   g        XXX        XX`,
    `ggg                 X          X`,
    ` g          g                 XX`,
    `    g                    X   XXX`,
    `        *              *     XXX`,
    `                            XXX `,
    `                           XXXX `,
    `          w           s    XXXX  `,
    `                           XXXX `,
    `               s           XXXX `,
    `                  s       XXXXX `,
    ],
    {
        "X": Rock,
        "m": Mushroom,
        "l": PigLily,
        "P": Player,
        "g": Grass,
        "s": WildOnionSprout,
        "@": SnowSnail,
        "O": Ore,
        "W": WoolyPig,
    }
)

export { grassyField }