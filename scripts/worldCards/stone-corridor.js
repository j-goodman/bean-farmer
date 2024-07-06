import { WorldCard } from '../worldCard.js';
import { Rock } from '../rock.js';
import { Player } from '../player.js';
import { Ore } from '../ore.js';
import { WoolyPig } from '../woolyPig.js';
import { Grass } from '../grass/grass.js';
import { SnowSnail } from '../snowSnail.js';

let stoneCorridor = new WorldCard (
    [
        `     XXXXXXXXXX  XXXXXXOOOXX    `,
        `  XXXXXXXXXXXXX   XXXXXXXXXXXX  `,
        `  OOOXXXXXXXXXXXX   OOOXX  XXXX `,
        ` XXXXXXXXXOOOXXXXX     XXX   XX `,
        `XXXXXXXXXXXXXXXXXXXX       XOOOW`,
        `OOOXXXXXXX!XXOOOXXXXX XXXXXXXXXX`,
        `XXXXXXXXXXXXXXXXXXXXX XXOOOXXXXX`,
        `XXXXXX!XXX g XXXXXW      XXXXXXX`,
        `XXXXXOOO g    XX  XX  XX  XXXOOO`,
        `XXXXXXXW  g        OOO XX   XXXX`,
        `XXXXXXXX       XXX  X  XXX    XX`,
        `   XXXXXXX    XXXXX  X DXXXX  g  `,
        ` WX  XXXXXXX  XXXXXXXXXXXXXX g  `,
        `XX    XXXXXXS OOOXXXXXXXXXXXXXXX`,
        `XXXX   XXXXX  XXXXXXXXXXXXOOOXXX`,
        `XXXXX     X   XXXOOOXXXXXXXXXXXX`,
        `XXXXXXXXX    XXXXXXXXXXXOOOXXXXX`,
        `OOOXXXXXX    XXXXXOOOXXXXXXXXXXX`,
        `XXXXXXXXX    XXXXXXXXXXXXOOOXXXX`,
        `XXXXOOOXX  X  XXOOOXXXXXXXXXXXXX`,
        `XXXXXXXXX XX  XXXXXXXXXXXXXXOOO `,
        `XXOOOXXXX  XX  XXXXXXXXXXXXXXXX `,
        `gXXXXOOOX   XX  XXXXXXXXXOOOXW  `,
        ` ggXXXXXXX  XXX  XXXXXXX        `,
    ],
    {
        "X": Rock,
        "O": Ore,
        "g": Grass,
        "W": WoolyPig,
        "S": SnowSnail,
        "P": Player,
    }
)

export { stoneCorridor }