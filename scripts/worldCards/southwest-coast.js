import { WorldCard } from '../worldCard.js';
import { Ocean } from '../ocean.js';
import { Penny } from '../penny.js';
import { Grass } from '../grass/grass.js';
import { SoilSmoother } from '../soilSmoother.js';

let southwestCoast = new WorldCard (
    [
        `OOOOOOOOOOOOOOOOOOOO*          $`,
        `OOOOOOOOOOOOOOOOOOOOOOO         `,
        `OOOOOOOOOOOOOOOOOOOOOOOO       O`,
        `OOOOOOOOOOOOOOOOOOOOOOOOOO   OOO`,
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
        ` OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO`,
        ` OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO`,
        ` OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO`,
        ` OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO`,
        `  OOOOOOOOOOOOOOOOOOOOOOOOOOOOOO`,
        `  OOOOOOOOOOOOOOOOOOOOOOOOOOOOOO`,
        `  OOOOOOOOOOOOOOOOOOOOOOOOOOOOOO`,
        `    OOOOOOOOOOOOOOOOOOOOOOOOOOOO`,
        `       OOOOOOOOOOOOOOOOOOOOOOOOO`,
        `           OOOOOOOOOOOOOOOOOOOOO`,
    ],
    {
        "O": Ocean,
        " ": SoilSmoother,
        "*": Penny,
    }
)

southwestCoast.noRotate = true

export { southwestCoast }