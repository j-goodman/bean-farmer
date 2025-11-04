import { WorldCard } from '../worldCard.js';
import { Ocean } from '../ocean.js';

let peninsularIslands = new WorldCard (
    [
        `X                     XXXX X    `,
        `                     XXXX       `,
        `XXXX                   XXX  X  X`,
        `XXXXX                         XX`,
        `XXXXX                XXX    XXXX`,
        ` XX                 XXXX  XXXXXX`,
        `                      X   XXXXXX`,
        `XX                         XXX X`,
        `X                               `,
        `                                `,
        `                                `,
        `                                `,
        `X                               `,
        `X                               `,
        `X                               `,
        `XX                              `,
        `XXX               XX            `,
        `XXX            XXXXXXX         X`,
        `XX             XXXXXXX          `,
        `XX              XXXXX         XX`,
        `X               XXXXXX        XX`,
        `               XXXXXXXX        X`,
        `               XXXXXXXXX    X   `,
        `                XXXXXXXXX       `,
    ],
    {
        " ": Ocean,
    }
)

export { peninsularIslands }