import { WorldCard } from '../worldCard.js';
import { Rock } from '../rock.js';
import { Player } from '../player.js';

import { Sapphire } from '../sapphire.js';
import { WildOnionSprout } from '../wildOnion/wildOnionSprout.js';
import { DragonFlower } from '../dragonFlower.js';
import { Ore } from '../ore.js';
import { Boulder } from '../Boulder.js';
import { Grass } from '../grass/grass.js';
import { WoolyPig } from '../woolyPig.js';


let pigVault = new WorldCard (
    [
    `                                `,
    `                   g        X   `,
    `  XX                g      XX   `,
    `  Xs                            `,
    `              XXX               `,
    `             XXXXXXX            `,
    `        *   XXXXXXXXXX *        `,
    `          XXXXXXXXXXXX          `,
    `         XXXOXXOXXXXXXX         `,
    `        XXXOXXO XXXXXXXX     X  `,
    `      XXXXXXXXOg XOXXXXXX       `,
    `     XXXXXOXXOg  OXXOXXXXX      `,
    `     XXXXXXXOX W gXOXXXXXX      `,
    `  X   W  XXXXXO   OXXXOXXXX     `,
    `  XX XXXXXXXXOXg   XOXXXXXX     `,
    `    XXXXXXOXXX   W  XXXXXXX  X  `,
    `    XXXXXXXXXXsDXX  OXXXXX  B   `,
    `     XXX*XX XXXXXOX XXX*XX      `,
    `       XXXX XXXXXXXXXXXXX    B  `,
    `         XX  XX  XXXXXXXX       `,
    `  g       XX    XXXXXXXX        `,
    ` g           XXXXXXXXXX    B    `,
    `   g                      B X   `,
    `              X       BX        `,
    ],
    {
        "X": Rock,
        "P": Player,
        "S": Sapphire,
        "s": WildOnionSprout,
        "W": WoolyPig,
        "D": DragonFlower,
        "O": Ore,
        "B": Boulder,
        "g": Grass,
    }
)

export { pigVault }