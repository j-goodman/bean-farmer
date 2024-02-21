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
import { Fire } from '../fire.js';
import { Hatchet } from '../hatchet.js';
import { Stump } from '../stump.js';
import { WildOnionSprout } from '../wildOnion/wildOnionSprout.js';
import { Player } from '../player.js';
import { DragonFlowerSeed } from '../dragonFlowerSeed.js';

let cutGrove = new WorldCard (
    [
    `S               XXOX           W`,
    `               WOOXXXX    X     `,
    `              OXXXXXX      B    `,
    `           S XXXX      W        `,
    ` XX                             `,
    `XXXXX                           `,
    `XXXXX   *              *        `,
    `XXXX          g     S           `,
    ` XXX X          S             O `,
    ` XXX XX     g    g   gS        O`,
    ` XXXDXXXX          g gg         `,
    `  XXXXXXXX    S     gg XXX      `,
    `   X  sXXXX    gg  ggggXXXX     `,
    `   S XXXXD  W   gg  gggSXXXX    `,
    `  XX XXXXXX   S   g  gSXXXXX s  `,
    ` XXX XXXD      g g g  XXXXXXX   `,
    `XXXX   XXXa  g  S ggS  XXrXXXX  `,
    `XXXXXX XXX  XXXgXXXXX  XX S  S  `,
    `XXXXXX XXXXXXDXXXXXXX  XXXXXXX  `,
    `  XXXX XXXXXD XXX SXXX   XXXX   `,
    `   XXX XXDXD  XDXs  sXX   W     `,
    `   XXX             sSXX        O`,
    `  XXXXXXXDX XDXXX SXXX        O `,
    `   XXXXXXXXDXXXXXXXX           W`,
    ],
    {
        "X": Rock,
        "O": Ore,
        "B": Boulder,
        "W": WoolyPig,
        "C": WoolyPigCarcass,
        "D": DragonFlower,
        "P": Player,
        "e": Emerald,
        "r": Ruby,
        "g": Grass,
        "h": Hatchet,
        "o": WildOnion,
        "d": DragonFlowerSeed,
        "S": Stump,
        "s": WildOnionSprout,
        "f": Fire,
    }
)

export { cutGrove }