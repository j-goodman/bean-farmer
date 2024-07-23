import { WorldCard } from '../worldCard.js';
import { Rock } from '../rock.js';
import { Ore } from '../ore.js';
import { Boulder } from '../boulder.js';
import { Emerald } from '../emerald.js';
import { Ruby } from '../ruby.js';
import { Grass } from '../grass/grass.js';
import { DragonFlower } from '../dragonFlower.js';
import { DragonFlowerSprout } from '../dragonFlowerSprout.js';
import { WoolyPig } from '../woolyPig.js';
import { WoolyPigCarcass } from '../woolyPigCarcass.js';
import { WildOnion } from '../wildOnion/wildOnion.js';
import { Fire } from '../fire.js';
import { Hatchet } from '../hatchet.js';
import { Stump } from '../stump.js';
import { WildOnionSprout } from '../wildOnion/wildOnionSprout.js';
import { Player } from '../player.js';
import { DragonFlowerSeed } from '../dragonFlowerSeed.js';
import { SnowSnail } from '../snowSnail.js';

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
    `   X  sXXXX   ggg  ggggXXXX     `,
    `   S XXXXD W gggggg gggS XXX    `,
    `  XX XXXXXX ggSggggg gSX XXX s  `,
    ` XXX XXXd    gggggggg XX XXXX   `,
    ` XXX   XXXa  g gSgggS  X  XXXX  `,
    ` XXXXX XXX  XXXgXXXXX  XX S  S  `,
    ` XXXXX XXXXXXDXXXXXXXX  XXXXXX  `,
    `  XXXX XXXXXD XXX SXXXX  XXXX   `,
    `  @XXX XXDXD  XDXs  sXXX  W     `,
    `   XXX              sSXX       O`,
    `  XXXXXXXDXXXdXXXX SXXX       O `,
    `                 XXXX          W`,
    ],
    {
        "X": Rock,
        "O": Ore,
        "B": Boulder,
        "S": Stump,
        "W": WoolyPig,
        "C": WoolyPigCarcass,
        "D": DragonFlower,
        "@": SnowSnail,
        "d": DragonFlowerSprout,
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