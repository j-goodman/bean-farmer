import { WorldCard } from '../worldCard.js';
import { Rock } from '../rock.js';
import { Ore } from '../ore.js';
import { Boulder } from '../boulder.js';
import { Emerald } from '../emerald.js';
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
    `    s          WOOXXXX    X     `,
    `     s        OXXXXXX      B    `,
    `           S XXXX      W        `,
    ` XX                             `,
    `XXXXX         P                 `,
    `XXXXX   *              *        `,
    `XXXX          g     S           `,
    ` XXX X          S             O `,
    ` XXX XX     g    g   gS        O`,
    ` XXXDXXXX          g gg         `,
    `s XXXXXXXX    S     gg XXX      `,
    ` s XXXXXXXX    gg  ggggXX       `,
    `     XXXXD  W   gg  gggSXX      `,
    `  XX XXXXXX   S   g  gSXXX   s  `,
    ` XXX XXXD      g g g  XXXXX     `,
    `XXXX   XXXa  g  S ggS  XXXXXXX  `,
    `XXXXXX XXX  XXXgXXXXX  XXXXXXX  `,
    `XXXXXX XXXXXXDXXXXXXX  XXXXXXX  `,
    `  XXXX XXXXXD XXX SXXX   XXXX   `,
    `   XXX XXDXD  XDX   XXX   W     `,
    `   XXX              SXX        O`,
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