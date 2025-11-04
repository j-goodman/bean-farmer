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
import { Fire } from '../fire.js';
import { Stump } from '../stump.js';


let grassyField = new WorldCard (
    [
    `                               X`,
    `                           g   X`,
    `         W         g          XX`,
    `                    g        XXX`,
    `      ggg   O               XXXX`,
    `    gggg       g         g    XX`,
    `        *              *      X `,
    `            g       g     g   X `,
    `   gggg          g     W    OXX `,
    `ggg       g         gg g   XXX  `,
    ` gggg g         l  gggOgg  XXX  `,
    `   g  ggg      g     lgfggg XXX `,
    `    g g    g     g  XXXggggg XX `,
    `     gg   g   g   lXXXggfgg  gXX`,
    `ggg             g   Xgggggg   gX`,
    ` g          g      gggggg   g XX`,
    `    g           g    ggggXg  XXX`,
    `        *        s     *gg   XXX`,
    `           g     XX   g    gXXX `,
    `             XX  XXX    g  XXXX `,
    `          w XXX  XXX  s    XXXX `,
    `           XXXX  XXXX  g  gXXXX `,
    `          XXXXXs XXXXXX  g XXXX `,
    `          XXXXX  XXXXXXXXXXXXX  `,

    ],
    {
        "X": Rock,
        "m": Mushroom,
        "l": PigLily,
        "P": Player,
        "g": Grass,
        "f": Fire,
        "s": WildOnionSprout,
        "O": Ore,
        "W": WoolyPig,
        "S": Stump,
    }
)

export { grassyField }