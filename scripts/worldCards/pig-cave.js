import { WorldCard } from '../worldCard.js';
import { Rock } from '../rock.js';
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
    ` O      B                      X`,
    `    XO                      X   `,
    `         X                      `,
    `      B      X                  `,
    `            XXX X  XXX       X  `,
    `        X  XXXXXX XX XX*X       `,
    `         XOXX XX  X XXX         `,
    `        XXXOXXXXXXXXX XX X      `,
    `      XXX XXXXXXXX XXX    WX    `,
    `       XX XX   XXXXXX XO        `,
    `        XXX     XXX XXXXX       `,
    `         XX  Ph     XXXXX X     `,
    `       X sX     XXX XXXX        `,
    `       s XXX   XX X  XX         `,
    `        sXXXXXXXXXXX XXX       O`,
    `      X XXX XXX  XXX XX         `,
    `        *XXX XX  XXX XX*        `,
    `       XXXXXXX XXXXX X        X `,
    `       XXX  XXXXX XX X         X`,
    `       XX  W        B XX        `,
    `        X  X   W      XX        `,
    `      X X e X X XXXXXX XX       `,
    `        XX XX X XXXX            `,
    ],
    {
        "X": Rock,
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