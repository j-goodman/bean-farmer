import { WorldCard } from '../worldCard.js';
import { Rock } from '../rock.js';
import { Boulder } from '../boulder.js';
import { WoolyPig } from '../woolyPig.js';
import { Cactus } from '../cactus.js';
import { Player } from '../player.js';
import { Hatchet } from '../hatchet.js';
import { Mushroom } from '../mushroom.js';
import { Grass } from '../grass/grass.js';
import { GrassSeed } from '../grass/grassSeed.js';

let desert = new WorldCard (
    [
    `.... . x         . ... .`,
    `..B                  ...`,
    `        B     X       ..`,
    `.    X    x            .`,
    `    X   .x...X..  x X  .x`,
    `       ...x... ... X    `,
    ` B    .x ...x. x ..  X  `,
    `      x... ..x...x..    `,
    `  x  ....X.. ... ....   `,
    `     ..x. .x...x..x.x   `,
    `      ......x. ..xX     `,
    `.       ..x.......      `,
    `.         .X..x         `,
    `..          x      x   .`,
    `..            WB        `,
    `....         B    x    .`,
    `.......          B   ...`,
    `........... x    .......`,
    ],
    {
        "X": Rock,
        "B": Boulder,
        "P": Player,
        "h": Hatchet,
        "m": Mushroom,
        "W": WoolyPig,
        "x": Cactus,
        " ": Grass,
    }
)

export { desert }