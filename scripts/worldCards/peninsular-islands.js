import { WorldCard } from '../worldCard.js';
import { Ocean } from '../ocean.js';
import { RazorWire } from '../razorWire.js';
import { RandomGem } from '../randomGem.js';
import { Dollar } from '../dollar.js';
import { Pesoduro } from '../pesoduro.js';
import { Grass } from '../grass/grass.js';
import { GasMine } from '../gasMine.js';

let peninsularIslands = new WorldCard (
    [
        `X         H.--.-..H   XXXX X    `,
        `          HHHHHHHHH  XXXX       `,
        `XXXX                   XXX  X  H`,
        `XXXXX                         HH`,
        `XXXXX                XXX    HHHX`,
        ` XX                 XXXX  XXHGXX`,
        `                      X   XXXXXX`,
        `XX                         XXX X`,
        `X                              X`,
        `                           HHHHH`,
        `                           H*ggH`,
        `                           HgggH`,
        `X                          Hgg*H`,
        `XH                         Hg*@H`,
        `XHH                        HHHHH`,
        `XXH                           GX`,
        `XGH               HHH           `,
        `XHH            HHHHXXH         X`,
        `XH             HXXXXXX          `,
        `HH              HXXXX         XX`,
        `H               HXXXXX        XX`,
        `               XXXXXXXX        X`,
        `   HHHHHHHHHHH XXXXXXXXX    X   `,
        `   H.-.--..-.H  XXXXXXXXX       `,
    ],
    {
        ".": Grass,
        " ": Ocean,
        "H": RazorWire,
        "g": RandomGem,
        "*": Dollar,
        "@": Pesoduro,
        "G": GasMine,
    }
)

export { peninsularIslands }