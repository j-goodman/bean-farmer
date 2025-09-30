import { WorldCard } from '../worldCard.js';
import { Rock } from '../rock.js';
import { Player } from '../player.js';
import { Ocean } from '../ocean.js';

let peninsula = new WorldCard (
    [
        `OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO`,
        ` OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO`,
        ` OOOOOOOOOOOOOOOOOOOOOOOOOOOOOO `,
        ` OOOOOOOOOOOOOOOOOOOOOOOOOOOOO  `,
        `  OOOOOOOOOOOOOO OOOOOOOOOOOOOO `,
        `  OOOOOOOOOOOOOOOOOOOOOOOOOO OO `,
        `   OOOOOOOO  OOOOOOOOOOOOOOOOOO `,
        `    OOOO OOOOOOOOOOOOOOOOOOOOOOO`,
        `     OOO   OOOOOOOOOOOOOOOOOOOOO`,
        `            OOOOOOOOO OOOOOOOOOO`,
        `           OOOOOOOOOOOOOOOOOOOOO`,
        `              OOOOOOOOOOOOOOOOO `,
        `                 OOOOOOOOOOOOO  `,
        `                   OOOOOOOOOOO  `,
        `               OOOOOOOOOOOOOOOO `,
        `               OOOOOOOOOOOOOOOO `,
        `                 OOOOOOOOOOOOOO `,
        `      OOO         OOOOOOOOOOOOOO`,
        `   OOOOOOO      OOOOOOOOOOOOOOOO`,
        `    OOOOO  OOOOOOOOOOOOOOOOOOOOO`,
        `      OOOOOOOOOOOOOOOOOOOOOOOOOO`,
        ` O     OOOOOOOOOOOOOOOOOOOOOOOOO`,
        `OOO  OOOOOOOOOOOOOOOOOOOOOOOOOOO`,
        `OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO`,
    ],
    {
        "X": Rock,
        "O": Ocean,
        "P": Player,
    }
)

peninsula.rotateOnlyVertically = true

export { peninsula }