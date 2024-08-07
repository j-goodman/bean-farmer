import { WorldCard } from '../worldCard.js';
import { Ocean } from '../ocean.js';

let eastCoast = new WorldCard (
    [
    `  OOOOOOOOOOOOOOOOOOOOOOOOOOOOOO`,
    `  OOOOOOOOOOOOOOOOOOOOOOOOOOOOOO`,
    ` OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO`,
    ` OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO`,
    ` OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO`,
    ` OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO`,
    `OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO`,
    `OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO`,
    `OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO`,
    `OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO`,
    ` OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO`,
    ` OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO`,
    `  OOOOOOOOOOOOOOOOOOOOOOOOOOOOOO`,
    `   OOOOOOOOOOOOOOOOOOOOOOOOOOOOO`,
    `   OOOOOOOOOOOOOOOOOOOOOOOOOOOOO`,
    `    OOOOOOOOOOOOOOOOOOOOOOOOOOOO`,
    `    OOOOOOOOOOOOOOOOOOOOOOOOOOOO`,
    `    OOOOOOOOOOOOOOOOOOOOOOOOOOOO`,
    `    OOOOOOOOOOOOOOOOOOOOOOOOOOOO`,
    `   OOOOOOOOOOOOOOOOOOOOOOOOOOOOO`,
    `   OOOOOOOOOOOOOOOOOOOOOOOOOOOOO`,
    `   OOOOOOOOOOOOOOOOOOOOOOOOOOOOO`,
    `   OOOOOOOOOOOOOOOOOOOOOOOOOOOOO`,
    `  OOOOOOOOOOOOOOOOOOOOOOOOOOOOOO`,
    ],
    {
        "O": Ocean,
    }
)

eastCoast.rotateOnlyVertically = true

export { eastCoast }