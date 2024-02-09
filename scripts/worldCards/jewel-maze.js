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
    ` ggggX     XX         e  X  XXXX`,
    `ggXX X XXX X  XXXXXXXX XXXX XXX `,
    ` gXXgXgXXX X XXXXXXXXXXXXXX XX  `,
    `  XX g XX  X XXXX           XX  `,
    ` XXX XXXXXXX   XXX XXXXXXXXXX   `,
    ` XXX w  g  XXX XXD     DXXXXXX   `,
    `  XX XXXXX  XX XXXXX XXXXXXXX   `,
    ` XXX  gXXXX  X   XD    XXXXX    `,
    `  XXXX    XX XXX  XXXX XXXXX    `,
    `X   XXXXX XX   XX XD   XXX   X  `,
    `  X   XXX XXXX XX XXXX XXX XXXX `,
    `  X    XX XXXX    XXXX XXX XXXX `,
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