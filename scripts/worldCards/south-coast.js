import { WorldCard } from '../worldCard.js';
import { Ocean } from '../ocean.js';

let southCoast = new WorldCard (
    [
        `                    OOOOOOO     `,
        `                    OOOOOOOOOOOO`,
        `OOOO                 OOOOOOOOOOOO`,
        `OOOOOOOOO       OOOOOOOOOOOOOOOO`,
        `OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO`,
        `OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO`,
        `OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO`,
        `OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO`,
        `OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO`,
        `OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO`,
        `OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO`,
        `OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO`,
        `OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO`,
        `OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO`,
        `OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO`,
        `OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO`,
        `OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO`,
        `OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO`,
        `OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO`,
        `OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO`,
        `OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO`,
        `OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO`,
        `OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO`,
        `OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO`,
    ],
    {
        "O": Ocean,
    }
)

southCoast.rotateOnlyHorizontally = true

export { southCoast }