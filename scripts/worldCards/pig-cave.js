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
    `       XXXXXXXXXXXXXXXX*XXXXXXX `,
    `       XXXXXXXXX     XXXX    XX `,
    `        XXX XXXXXXX   sXXX    X `,
    `      XXX XXXXXXXX sXX    WX  XX`,
    `          XX   XXXXXXX XX       `,
    `        XXX     XXXXXXXXX     XX`,
    `         XX  P      XXXXX X   X `,
    `       X  X     XXX XXXXX    XX `,
    `      s  XXX   XXXX  XXXXXX  XX `,
    `       XXXXXXXXXXXXX XXXXXX XXXO`,
    `      XXXXXXXXXXXXXX XXXXXX XXXX`,
    `        XXXXXXXXXXXX XXXXXX XXXX`,
    `       XXXXXXXXXXXXX XXXXXX XXXX`,
    `       XXX  XXXXX XX XXXX   XXX `,
    `       XX  W          X       XX`,
    `        X  X   W      X       XX`,
    `      X X e X XX XXXXXXXXX   XX `,
    `        XX XX XXXXXX     XXXXX  `,
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