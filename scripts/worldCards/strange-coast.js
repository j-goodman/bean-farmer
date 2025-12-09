import { WorldCard } from '../worldCard.js';
import { Rock } from '../rock.js';
import { Player } from '../player.js';
import { Ocean } from '../ocean.js';
import { Grass } from '../grass/grass.js';
import { Tree } from '../tree.js';
import { RazorWire } from '../razorWire.js';
import { RandomGem } from '../randomGem.js';
import { Dollar } from '../dollar.js';
import { GasMine } from '../gasMine.js';

let strangeCoast = new WorldCard (
    [
        ` HH HHHHHHH   HH  OOOOOOOOOOOOOO`,
        `         |     OOOOOOOOOOOOOOOOO`,
        `H              OOOOOOOOOOOOOOOOO`,
        `H  OOO          OOOOOOOOOOOOOOOO`,
        `H OOOOO            .OOOOOOOOOOOO`,
        `OOOOOOOO           ...OOOOOOOOOO`,
        `OOOOOOOO            ...OOOOOOOOO`,
        `OOOOOOOO              ..OOOOOOOO`,
        `OOOOOOO                ....OOOO.`,
        `HOOOOOO                  .......`,
        `H  OOO   OOO               ....H`,
        `        OOOOOO          G    ..H`,
        `       OOOOOOOO       HHHH.HH  H`,
        `       OOOOOOOO                H`,
        `HH HH . OOOOOOO        ..      H`,
        `H         OOOO        ....     .`,
        `H  .              OOOOOOO..  ...`,
        `H               OOOOOOOOOOOO....`,
        ` HHH           OOOOOOOOOOOOOOOOO`,
        `H   G          OOOOOOOOOOOOOOOO `,
        `                OOOOOOOOOOOOOOO `,
        `  |     .       OOOOOOOOOOOOOOO `,
        `                 OOOOOOOOOOOO   `,
        ` HHHHHHHHHHHHH      OOOOOOOO    `,
    ],
    {
        "X": Rock,
        "O": Ocean,
        ".": Grass,
        "|": Tree,
        "H": RazorWire,
        "g": RandomGem,
        "G": GasMine,
        "*": Dollar,
    }
)

export { strangeCoast }