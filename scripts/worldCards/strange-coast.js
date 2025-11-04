import { WorldCard } from '../worldCard.js';
import { Rock } from '../rock.js';
import { Player } from '../player.js';
import { Ocean } from '../ocean.js';
import { Grass } from '../grass/grass.js';
import { Tree } from '../tree.js';

let strangeCoast = new WorldCard (
    [
        `                  OOOOOOOOOOOOOO`,
        `         |     OOOOOOOOOOOOOOOOO`,
        `               OOOOOOOOOOOOOOOOO`,
        `   OOO          OOOOOOOOOOOOOOOO`,
        `  OOOOO            .OOOOOOOOOOOO`,
        `OOOOOOOO           ...OOOOOOOOOO`,
        `OOOOOOOO*           ...OOOOOOOOO`,
        `OOOOOOOO              ..OOOOOOOO`,
        `OOOOOOO                ....OOOO.`,
        ` OOOOOO                  .......`,
        `   OOO   OOO               .....`,
        `*       OOOOOO               ...`,
        `*      OOOOOOOO           .     `,
        `       OOOOOOOO                 `,
        `     .  OOOOOOO        ..       `,
        `          OOOO        ....     .`,
        `   .              OOOOOOO..  ...`,
        `        *       OOOOOOOOOOOO....`,
        `               OOOOOOOOOOOOOOOOO`,
        `               OOOOOOOOOOOOOOOO `,
        `                OOOOOOOOOOOOOOO `,
        `  |     .       OOOOOOOOOOOOOOO `,
        `                 OOOOOOOOOOOO   `,
        `               **   OOOOOOOO    `,
    ],
    {
        "X": Rock,
        "O": Ocean,
        ".": Grass,
        "|": Tree,
    }
)

export { strangeCoast }