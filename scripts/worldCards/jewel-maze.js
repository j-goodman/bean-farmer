import { WorldCard } from '../worldCard.js';
import { Rock } from '../rock.js';
import { Player } from '../player.js';
import { Sapphire } from '../sapphire.js';
import { WildOnionSprout } from '../wildOnion/wildOnionSprout.js';
import { DragonFlower } from '../dragonFlower.js';
import { Grass } from '../grass/grass.js';
import { WoolyPigCarcass } from '../woolyPigCarcass.js';
import { Crate } from '../crate.js';

let jewelMaze = new WorldCard (
    [
    `                   XXXXX        `,
    `    s       XXXXXXXXXXXXXXX     `,
    `           XX             XX  X `,
    ` XX     XXXXX XXXXXXXXXXX XXX   `,
    `  gX  XXXX    X    X   XX  XXX  `,
    ` gXXXXXXXX XXXX XX XXX XXX XX   `,
    `ggXXXXXXXX XXXX XX XXX XXX XXX  `,
    ` ggggX     XX   XX    S  X  XXXX`,
    ` sXX X XXXXXX XXXXXDXX XXXX XXX `,
    `CgXXgXgXX   X XXXXXXXXXXXXX XX  `,
    `  XX g XX X X XXX           XX  `,
    ` XXX XXXX X X  XXX XXXXXXXXXX   `,
    ` XXX w   gX XX XXD     DXXXXXX  `,
    `  XX XXXXXX XX XXXXX XXXXXXXX???`,
    ` XXX   XXXX  X   XD    XXXXX ???`,
    `  XXXX    XX XXX  XXXX XXXXX ???`,
    `X   XXXXX XX   XX XD   XXX   X  `,
    `  X   XXX XXXX XX XXXX XXX XXXX `,
    `  X    XX XXXX    XXXX XXX XXXX `,
    `     X XX    XXXXXXXXX XXX  XXXX`,
    `   s    XXXX           XXXX  XXX`,
    `        XXXXXXXXXXXXXXXXXXXX  X `,
    `   X   XXXXXXXXXXXXXXXXXX    X  `,
    `      XXXXXXX                   `,
    ],
    {
        "X": Rock,
        "P": Player,
        "?": Crate,
        "S": Sapphire,
        "s": WildOnionSprout,
        "C": WoolyPigCarcass,
        "D": DragonFlower,
        "g": Grass,
    }
)

export { jewelMaze }