import { WorldCard } from '../worldCard.js';
import { Rock } from '../rock.js';
import { Ore } from '../ore.js';
import { Boulder } from '../boulder.js';
import { Emerald } from '../emerald.js';
import { Ruby } from '../ruby.js';
import { Grass } from '../grass/grass.js';
import { DragonFlower } from '../dragonFlower.js';
import { WoolyPig } from '../woolyPig.js';
import { WoolyPigCarcass } from '../woolyPigCarcass.js';
import { WildOnion } from '../wildOnion/wildOnion.js';
import { Stump } from '../stump.js';
import { Sign } from '../sign.js';
import { Hatchet } from '../hatchet.js';
import { WildOnionSprout } from '../wildOnion/wildOnionSprout.js';
import { Player } from '../player.js';
import { DragonFlowerSeed } from '../dragonFlowerSeed.js';

let boulderMaze = new WorldCard (
    [
        `   XXXXX XXXXXXXXXXXXXXXXXXXXW  `,
        ` XXXs  XXXXXDXXXXggg XXXXXXXXX  `,
        ` XX   sXXgggggggggg    XXXX     `,
        ` XXs   XXgXXXXXXg    SXXXXX XXX `,
        `  X   XXXgggggXXXX gXX      XXXX`,
        `X X XXXXXXXXXgXXXXXXX  XXXXXXXXX`,
        `X X XXXXXXXXX XXXXXXX XXXXXXXXXX`,
        `  X    XXXXXX XXXs    XXX    XXX`,
        ` XXXXX       B XX XDXX        XX`,
        ` XXXXXXXXXXXX  XXXXX   XXX   S X`,
        `   XXXXXX   XX  XXX  X XXX     X`,
        `          S XX XXX  XX XX   r SX`,
        `    XXXXX B    XXXX    XX S   XX`,
        `    XXXXXX XXXXXXXXXXXBXXX   XX `,
        `     XXXXX XXXXDXX  XX XXXXXXXXX`,
        `  B   XXXX XX B        XX W    X`,
        `      XXXX XX XDXXX XX XXXX XX X`,
        ` B     XXX XX XXXXXXXX XXXX X   `,
        `      XXXX XX XXXXXXXX XXXX X   `,
        `   B  XXX         B    XXXX     `,
        `       XXXXXXXXXXXXXXXXXXXX     `,
        `         XXXXX   XXXXXXXXX     W`,
        `BWB                  Xd X        `,
        ],
    {
        "X": Rock,
        "O": Ore,
        "B": Boulder,
        "W": WoolyPig,
        "C": WoolyPigCarcass,
        "D": DragonFlower,
        "S": Stump,
        "T": Sign,
        "P": Player,
        "e": Emerald,
        "r": Ruby,
        "g": Grass,
        "h": Hatchet,
        "o": WildOnion,
        "d": DragonFlowerSeed,
        "s": WildOnionSprout,
    }
)

export { boulderMaze }