import { WorldCard } from '../worldCard.js';
import { Rock } from '../rock.js';
import { Player } from '../player.js';
import { Ocean } from '../ocean.js';
import { SoilCleaner } from '../soilCleaner.js';
import { Grass } from '../grass/grass.js';
import { Gravestone } from '../gravestone.js';
import { AtomBomb } from '../atomBomb.js';
import { IceBlade } from '../iceBlade.js';
import { IslandMap } from '../islandMap.js';
import { Penny } from '../penny.js';

let peninsula = new WorldCard (
    [
        `OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO`,
        ` OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO`,
        ` OOOOOOOOOOOOOOOOOOOOOOOOOOOOOO `,
        ` OOOOOOOOOOOOOOOOOOOOOOOOOOOOO  `,
        `  OOOOOOOOOOOOOOOOOOOOOOOOOOOOO `,
        `  OOOOOOOOOOOOOOOOOOOOOOOOOO OO `,
        `   OOOOOOOOOOOOOOOOOOOOOOOOOOOO `,
        `    OOOO OOOOOOOOOOOOOOOOOOOOOOO`,
        `     OOO   OOOOOOOOOOOOOOOOOOOOO`,
        `   .......  OOOOOOOOOOOOOOOOOOOO`,
        `     ..... OOOOOOOOOOOOOOOOOOOOO`,
        `   t  ....... OOOOOOOOOOOOOOOOO `,
        `    ..   ......  OOOOOOOOOOOOO  `,
        ` ....  .....$....  OOOOOOOOOOO  `,
        `  ....   ......OOOOOOOOOOOOOOOO `,
        ` ....   ..$...$OOOOOOOOOOOOOOOO `,
        `  .. ........    OOOOOOOOOOOOOO `,
        `  ....OOO  ....   OOOOOOOOOOOOOO`,
        `   OOOOOOO      OOOOOOOOOOOOOOOO`,
        `    OOOOO  OOOOOOOOOOOOOOOOOOOOO`,
        `      OOOOOOOOOOOOOOOOOOOOOOOOOO`,
        ` O     OOOOOOOOOOOOOOOOOOOOOOOOO`,
        `OOO  OOOOOOOOOOOOOOOOOOOOOOOOOOO`,
        `OOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO`,
    ],
    {
        "X": Rock,
        "O": Ocean,
        "P": Player,
        "a": AtomBomb,
        "i": IslandMap,
        "h": IceBlade,
        "$": SoilCleaner,
        "t": Gravestone,
        ".": Grass,
        "*": Penny,
    }
)

peninsula.rotateOnlyVertically = true

export { peninsula }