import { WorldCard } from '../worldCard.js';
import { Rock } from '../rock.js';
import { RockGolem } from '../rockGolem.js';
import { Player } from '../player.js';
import { Emerald } from '../emerald.js';
import { Crate } from '../crate.js';
import { Boulder } from '../boulder.js';
import { Bomb } from '../bomb.js';
import { SulfurCrystal } from '../sulfurCrystal.js';
import { DragonFlowerSeed } from '../dragonFlowerSeed.js';
import { SmokyQuartz } from '../smokyQuartz.js';
import { Key } from '../key.js';
import { Cactus } from '../cactus.js';
import { Hatchet } from '../hatchet.js';

let statueHall = new WorldCard (
    [
        `XXXXXXX                         `,
        `XXXXXXX      XXBBXX   &         `,
        `XXss XXXXXXXXXX  XXXXXXXXXXX    `,
        `XXs ?XXXXXXXXXX  XXXXXXXXXXX    `,
        `XX?d?                     XX    `,
        `XXXXXXXXX XXXXX  XXXXX XXXXX    `,
        `XXXXXXXXX XXXXXXXXXXXX XXXXX    `,
        `       XX XX!XXXXXX!XX          `,
        `       XX                       `,
        `       XX                      &`,
        ` XXXXXXXX  XXXXXXXXXX           `,
        `*XXXXXXXX  XXXX XXXXX          *`,
        `*XXXXXXXX      XXXXXX          *`,
        ` XXXXXXXX  XXX  XXXXXXX         `,
        ` XXX   XX  XX!X XX!XXXX         `,
        ` XXX k XX            XX &       `,
        ` XXX   XX            XX         `,
        ` XXXXX XXXXXXXXXXXX  XXXXXXXXXX `,
        ` XXXXX XX ! XXXXXXX  XXXXXXXXXX `,
        ` XXXX     B     XX?  ?XXXqs bXX `,
        ` XXXXXXXX   XXX     ??      ?XX `,
        ` XXXXXXXXXXXXXXXXX ???XXX  ?bXX `,
        ` XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX `,
        `                XXXXXXXXXXXXXXX `,
    ],
    {
        "X": Rock,
        "!": RockGolem,
        "?": Crate,
        "s": SulfurCrystal,
        "q": SmokyQuartz,
        "e": Emerald,
        "k": Key,
        "b": Bomb,
        "d": DragonFlowerSeed,
        "&": Cactus,
        "P": Player,
        "h": Hatchet,
        "B": Boulder,
    }
)

statueHall.rotateOnlyHorizontally = true

export { statueHall }