import { WorldCard } from '../worldCard.js';
import { Rock } from '../rock.js';
import { IceSheet } from '../iceSheet.js';
import { Ore } from '../ore.js';
import { Player } from '../player.js';
import { Bomb } from '../bomb.js';


let iceCave = new WorldCard (
    [
    `XXXXXXXXXXXXXX    XXXXXXXXXXXXXX`,
    `XXXXXXXXXXXXX    XXXXXXXXXXXXXXX`,
    `XXXXXXXXXXXX   XXXXXXXXXXXXXXXXX`,
    `   XXXXXXXX    XXXXXXXXXXXXXX   `,
    `     XXXXXi   XXXXXXXXX         `,
    `     XXXXiiiiXXXXXXXX           `,
    `     XXXXiiiiXXXXXXX   *        `,
    `    XXXXXiiiiiiiiiXXXXXXX       `,
    `    XXXXXiiiiiiiiiiiiXXXXXXX    `,
    `     XXXXiiiiiiiiiiiii$$XXXXXX  `,
    `     XXXXXXiiiiiiiiiiiX$$$XX$XX `,
    `   XXXXXSXXXiiiiiiiiii$$XX$$$$X `,
    ` XXX$X$$X$X$XiiiiiiiiiiXX$X$i$X `,
    ` XX$$$$$$$$iiiiXiiiiiiiXXX$XiiXX`,
    ` iXX$$X$X$X$XXiiiiiiiiiiiiiiii$X`,
    `iiiXXX$X$XXXiiiiiiiiiiiXXXiii$XX`,
    `iiiiiii$XXXXXXXiiiiiii XXX$iiX$X`,
    ` iiiii$XXXXXXXXXXXXXXX  XXX$X$XX`,
    ` iiiiiiiXXXXXXXXXXXXXXX  XXX$   `,
    ` iiiiiiiiiiXXXXXX   XXXX XXX     `,
    `  iiiiiiiiiii        XX         `,
    `     iiiiiii                    `,
    `  XXXXXXXXXXXXXXX              X`,
    `XXXXXXXXXXXXXXXXXXXXXX       XXX`,
    ],
    {
        "X": Rock,
        "i": IceSheet,
        "b": Bomb,
        "$": Ore,
        "P": Player,
    }
)

export { iceCave }