import { WorldCard } from '../worldCard.js';
import { Rock } from '../rock.js';
import { Player } from '../player.js';
import { Sapphire } from '../sapphire.js';
import { WildOnionSprout } from '../wildOnion/wildOnionSprout.js';
import { DragonFlower } from '../dragonFlower.js';
import { Grass } from '../grass/grass.js';
import { WoolyPigCarcass } from '../woolyPigCarcass.js';

let jewelMaze = new WorldCard (
    [
    `           XXX   X XX           `,
    `       XX   XXXXXXXXXXXXXXX     `,
    `        X  XX             XX  X `,
    ` XX   XXXXXXX XXXXXXXXXXX XXX   `,
    `  gXXXXXXX    X    X   XX  XXX  `,
    `sgXXXXXXXX XXXX XX XXX XXX XX    `,
    `ggXXXXXXXX XXXX XX XXX XXX XXX  `,
    ` ggggX     XX   XX    S  X  XXXX`,
    `CgXX X XXX XX XXXXXXXX XXXX XXX `,
    ` gXXgXgXXX XX XXXXXXXXXXXXX XX  `,
    `  XX g XX  XX XXX ggg g     XX  `,
    ` XXX XXXXXXXX  XXXgXXXXXXXXXX   `,
    ` XXX w  g  XXX XXD g g DXXXXXX   `,
    `  XX XXXXX  XX XXXXXgXXXXXXXX   `,
    ` XXX  gXXXX  X   XD gggXXXXX    `,
    `  XXXX    XX XXX  XXXXgXXXXX    `,
    `X   XXXXX XX   XX XD ggXXX   X  `,
    `  X   XXX XXXX XX XXXXgXXX XXXX `,
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
        "S": Sapphire,
        "s": WildOnionSprout,
        "C": WoolyPigCarcass,
        "D": DragonFlower,
        "g": Grass,
    }
)

export { jewelMaze }