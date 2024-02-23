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
import { Sign } from '../sign.js';


let pigVault = new WorldCard (
    [
    `                                `,
    `              g    g      sXX   `,
    `  XXg     ggg       g     XXX   `,
    `  Xs   ggggg          ggg XX    `,
    `     gggg     XXX      gggg     `,
    `  ggggg     XXXXXXXXX    ggggg  `,
    ` ggggg  *   XXXXXXXXX  *  ggggg `,
    ` ggggg    XXXXXXXXXXXX     ggggg`,
    `   gggg  XXXOXXOXXXXXXX    ggggg`,
    `      gg XXOXXO XXXXXXXXX   gXg `,
    `sT    XXXXXXXXO  XOXXXXXX ggggg `,
    `     XXXXXOXXO   OXXOXXXXXg g   `,
    `     XXXXXXXOXgW gsOXXXXXX      `,
    `  X   W  XXXXXO   OXXXOXXXX     `,
    `  XX XXX XXXXOW g  XOXXXXXX     `,
    `    XXXXXXOXXg        XXXXX  X  `,
    `    XXXXXXXXXXsDXX   WOXXX  B   `,
    `     XXX*XX XXXXXOX XXX*XX      `,
    `     XXXXXX XXXXXXXXXXXXXX   B  `,
    `         XX  XX  XXXXXXXXT      `,
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
        "T": Sign,
        "D": DragonFlower,
        "O": Ore,
        "B": Boulder,
        "g": Grass,
    }
)

pigVault.writeSigns([
    "If you drop a seed on grass it won't grow.",
    "Press enter or e to pause.",
])

export { pigVault }