import { WorldCard } from '../worldCard.js';
import { Ocean } from '../ocean.js';

let northCoast = new WorldCard (
    [
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
    `OOOOOOOO   OOOOOOOOOOOOOOOOOOOOO`,
    `OOOOO          OOOOOOOOOOOOOOOOO`,
    `O                      OOOOOOOOO`,
    `                          OOOO  `,
    ],
    {
        "O": Ocean,
    }
)

northCoast.rotateOnlyHorizontally = true

export { northCoast }