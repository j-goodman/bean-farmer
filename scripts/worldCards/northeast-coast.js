import { WorldCard } from '../worldCard.js';
import { Ocean } from '../ocean.js';
import { Ore } from '../ore.js';

let northeastCoast = new WorldCard (
    [
    `OOOOOOOOOOOOOOOOOOOOOOO         `,
    `OOOOOOOOOOOOOOOOOOOOOOOOOOO     `,
    `OOOOOOOOOOOOOOOOOOOOOOOOOOOOO   `,
    `OOOOOOOOOOOOOOOOOOOOOOOOOOOOOO  `,
    `OOOOOOOOOOOOOOOOOOOOOOOOOOOOOO  `,
    `OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO `,
    `OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO `,
    `OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO `,
    `OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO`,
    `OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO`,
    `OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO`,
    `OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO`,
    `OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO`,
    `OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO`,
    `OOOOOOOOO    OOOOOOOOOOOOOOOOOOO`,
    `OOOOOOOO     $ OOOOOOOOOOOOOOOOO`,
    `OOOOOO      $ $ OOOOOOOOOOOOOOOO`,
    `OO       *       OOOOOOOOOOOOOOO`,
    `              $ $OOOOOOOOOOOOOOO`,
    `    $      $   $ OOOOOOOOOOOOOOO`,
    `   $        $    OOOOOOOOOOOOOOO`,
    `           $     OOOOOOOOOOOOOOO`,
    `              $ $OOOOOOOOOOOOOOO`,
    `               $OOOOOOOOOOOOOOOO`,
    ],
    {
        "O": Ocean,
        "$": Ore,
    }
)

export { northeastCoast }