import { WorldCard } from '../worldCard.js';
import { Ocean } from '../ocean.js';

let southwestCoast = new WorldCard (
    [
        `OOOOOOOOOOOOOOO                 `,
        `OOOOOOOOOOOO        OOO         `,
        `OOOOOOOOOO       OOOOOOOOO      `,
        `OOOOOOOOOO     OOOOOOOOOOOO     `,
        `OOOOOOOOOOO   OOOOOOOOOOOOO     `,
        `OOOOOOOOOOOOOOOOOOOOOOOOOO      `,
        `OOOOOOOOOOOOOOOOOOOOOOOOOO      `,
        `OOOOOOOOOOOOOOOOOOOOOOOOO       `,
        `OOOOOOOOOOOOOOOOOOOOOOOOO       `,
        `OOOOOOOOOOOOOOOOOOOOOOOOOOO     `,
        `OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO`,
        `OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO`,
        `OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO`,
        `OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO`,
        `OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO`,
        `OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO`,
        ` OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO`,
        ` OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO`,
        ` OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO`,
        `  OOOOOOOOOOOOOOOOOOOOOOOOOOOOOO`,
        `  OOOOOOOOOOOOOOOOOOOOOOOOOOOOOO`,
        `   OOOOOOOOOOOOOOOOOOOOOOOOOOOOO`,
        `     OOOOOOOOOOOOOOOOOOOOOOOOOOO`,
        `        OOOOOOOOOOOOOOOOOOOOOOOO`,
    ],
    {
        "O": Ocean,
    }
)

southwestCoast.noRotate = true

export { southwestCoast }