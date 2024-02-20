import { WorldCard } from '../worldCard.js';
import { Rock } from '../rock.js';
import { Stump } from '../stump.js';
import { Ore } from '../ore.js';
import { Boulder } from '../boulder.js';
import { Emerald } from '../emerald.js';
import { Hatchet } from '../hatchet.js';
import { DragonFlower } from '../dragonFlower.js';
import { WoolyPig } from '../woolyPig.js';
import { WildOnion } from '../wildOnion/wildOnion.js';
import { Fire } from '../fire.js';
import { WildOnionSprout } from '../wildOnion/wildOnionSprout.js';
import { Player } from '../player.js';

let pigCave = new WorldCard (
    [
    `s O W     X                 XXX `,
    ` O      B                     XX`,
    `    XO                      X  X`,
    `         X                    XX`,
    `      B XX   X            XXX  X`,
    `       XXXXXXXX XX XXX  XXXXXX  `,
    `     XXXXXXXXXXXXXXXXXX*XXXXXXX `,
    `     XXXXXXXXXXX     XXXX    XX `,
    `    XXXXXXX XXXXXXX   sXXX    X `,
    `    XXXXX XXXXXXXX sXX    WX  XX`,
    `    XX    XX   XXXXXXX XX       `,
    `     XX XXX     XXXXXXXXX     XX`,
    `         XX  P      XXXXX X   X `,
    `     XXX  X     XXX XXXXX    XX `,
    `      s  XXX   XXXX  XXXXXX  XX `,
    `    XXXXXXXXXXXXXXXX XXXXXX XXXO`,
    `    XXXXXXXXXXXXXXXX XXXXXX XXXX`,
    `     XXXXXXXXXXXXXXX XXXXXX XXXX`,
    `     XXXXXXXXXXXXXXX XXXXXX XXXX`,
    `     XXXXX  XXXXX XX XXXX   XXX `,
    `      XXX  W          X       XX`,
    `       XX  X   W      X       XX`,
    `     X XX e X XX XXXXXXXXX   XX `,
    `       XXX XX XXXXXX     XXXXX  `,
    ],
    {
        "X": Rock,
        "S": Stump,
        "O": Ore,
        "B": Boulder,
        "W": WoolyPig,
        "D": DragonFlower,
        "P": Player,
        "e": Emerald,
        "h": Hatchet,
        "o": WildOnion,
        "s": WildOnionSprout,
        "f": Fire,
    }
)

export { pigCave }