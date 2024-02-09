import { WorldCard } from '../worldCard.js';
import { Rock } from '../rock.js';
import { Player } from '../player.js';
import { Emerald } from '../emerald.js';
import { WildOnionSprout } from '../wildOnion/wildOnionSprout.js';
import { DragonFlower } from '../dragonFlower.js';
import { Grass } from '../grass/grass.js';

let jewelMaze = new WorldCard (
    [
    `              X    XX           `,
    `       XX    XXX   XXXXXXXX     `,
    `        X  XXX  XX X      XX  X `,
    ` XX   XXXXXXXXXXXXXX XXXX XXX   `,
    `  gXXXXXXX           X XX  XXX  `,
    ` gXXXXXXXX XXXXXXXXXXX XXX XX   `,
    `ggXXXXXXXX XXXXXXXXXXX XXX XXX  `,
    ` ggggX     XX            X  XXXX`,
    `ggXX X XXXXX  XXXXXXX e  XX XXX `,
    ` gXXgXgXXXXX XXXXXXXXXXXXXX XX  `,
    `  XX g XXXXX XXXX           XX  `,
    ` XXX XXXXXXX   XXX XXXXXXXXXX   `,
    ` XXX w  g   XX XXD     DXXXXXX   `,
    `  XX XXXXX  XX XXXXX XXXXXXXX   `,
    ` XXX  gXXXX  X   XD    XXXXX    `,
    `  XXXX    XX XXX  XXXX XXXXX    `,
    `X   XXXXX XX   XX XD   XXX      `,
    `  X   XXX XXXX XX XXXX XXX XXXX `,
    `  X    XX XXXX    XXXX XXXX XXX `,
    `     X XX    XXXXXXXXX XXX  XXXX`,
    `   s    XXXX           XXXX  XXX`,
    `         XXXXXXXXXXXXXXXXXXX  X `,
    `   X          XXXXXXXXXXXXX  X  `,
    `                    XXXXXX      `,
    ],
    {
        "X": Rock,
        "P": Player,
        "e": Emerald,
        "s": WildOnionSprout,
        "D": DragonFlower,
        "g": Grass,
    }
)

export { jewelMaze }