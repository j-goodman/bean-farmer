import { WorldCard } from '../worldCard.js';
import { Rock } from '../rock.js';
import { Ore } from '../ore.js';
import { Boulder } from '../boulder.js';
import { Emerald } from '../emerald.js';
import { DragonFlower } from '../dragonFlower.js';
import { WoolyPig } from '../woolyPig.js';
import { WildOnion } from '../wildOnion/wildOnion.js';
import { Fire } from '../fire.js';
import { WildOnionSprout } from '../wildOnion/wildOnionSprout.js';
import { Player } from '../player.js';

let pigCave = new WorldCard (
    [
    `s O W     X                 XXX `,
    ` O      B                      X`,
    `    XO                      X   `,
    `         X                      `,
    `      B      X                  `,
    `            XXX X  XXXs      X  `,
    `        X  XXXXXXXXXXXX*X       `,
    `        sXOXXXXXXXXXXXX         `,
    `        XXXXXXXXXXXXX XX X      `,
    `      XXXXXXXXXXXX XXX    WX    `,
    `   s   XXXXX   XXXXXX XO        `,
    `        XXX     XXX XXXXX       `,
    `         XX  P      XXXXX X     `,
    ` s     X sX     XXX XXXX        `,
    `       s XXX   XX X  XXs        `,
    `        sXXXXXXXXXXX XXX       O`,
    `      X XXXXXXXXXXXX XX         `,
    `        *XXXXXXXXXXX XX*        `,
    `    s  XXXXXXXXXXXXX Xs       X `,
    `       XXX  XXXXX XX X s       X`,
    `       XX  W        B XX    s   `,
    `        X  X   W      XX        `,
    `      X X e X X XXXXXX XX       `,
    `        XX XX XXXXXX            `,
    ],
    {
        "X": Rock,
        "O": Ore,
        "B": Boulder,
        "W": WoolyPig,
        "D": DragonFlower,
        "P": Player,
        "e": Emerald,
        "o": WildOnion,
        "s": WildOnionSprout,
        "f": Fire,
    }
)

export { pigCave }