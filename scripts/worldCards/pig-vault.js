import { WorldCard } from '../worldCard.js';
import { Rock } from '../rock.js';
import { Player } from '../player.js';

import { Sapphire } from '../sapphire.js';
import { WildOnionSprout } from '../wildOnion/wildOnionSprout.js';
import { DragonFlower } from '../dragonFlower.js';
import { Ore } from '../ore.js';
import { Boulder } from '../boulder.js';
import { Grass } from '../grass/grass.js';
import { WoolyPig } from '../woolyPig.js';


let pigVault = new WorldCard (
    [
    `                                `,
    `              g    g        X   `,
    `  XXg     ggg       g      XX   `,
    `  Xs   ggggg          ggg       `,
    `     gggg     XXX      gggg     `,
    `  ggggg     XXXXXXXXX    ggggg  `,
    ` ggggg  *   XXXXXXXXX  *  ggggg `,
    ` ggggg    XXXXXXXXXXXX     ggggg`,
    `   gggg  XXXOXXOXXXXXXX    ggggg`,
    `      gg XXOXXO XXXXXXXXX   gXg `,
    `      XXXXXXXXO  XOXXXXXX ggggg `,
    `     XXXXXOXXO   OXXOXXXXXg g   `,
    `     XXXXXXXOXgW gsOXXXXXX      `,
    `  X   W  XXXXXO   OXXXOXXXX     `,
    `  XX XXX XXXXOW g  XOXXXXXX     `,
    `    XXXXXXOXXg        XXXXX  X  `,
    `    XXXXXXXXXXsDXX   WOXXX  B   `,
    `     XXX*XX XXXXXOX XXX*XX      `,
    `     XXXXXX XXXXXXXXXXXXXX   B  `,
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