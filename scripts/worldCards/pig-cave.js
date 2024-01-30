import { WorldCard } from '../worldCard.js';
import { Rock } from '../rock.js';
import { Ore } from '../ore.js';
import { Boulder } from '../boulder.js';
import { Emerald } from '../emerald.js';
import { WoolyPig } from '../woolyPig.js';
import { WildOnion } from '../wildOnion/wildOnion.js';
import { WildOnionSprout } from '../wildOnion/wildOnionSprout.js';
import { Player } from '../player.js';

let pigCave = new WorldCard (
    [
    `                             B  `,
    `                            BW  `,
    `                         BW     `,
    `                            B   `,
    `            s          B        `,
    `                                `,
    `        Os             O        `,
    `                                `,
    `          s                     `,
    `      s                         `,
    `              P e               `,
    `         s                      `,
    `               s                `,
    `                     s          `,
    `                                `,
    `                                `,
    `                                `,
    `        O              O        `,
    `                                `,
    `                                `,
    `             X                  `,
    `       X XXXX                   `,
    `                X               `,
    `          X                     `,
    ],
    {
        "X": Rock,
        "O": Ore,
        "B": Boulder,
        "W": WoolyPig,
        "P": Player,
        "e": Emerald,
        "o": WildOnion,
        "s": WildOnionSprout,
    }
)

export { pigCave }