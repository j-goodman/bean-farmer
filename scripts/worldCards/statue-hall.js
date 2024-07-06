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

let statueHall = new WorldCard (
    [
        `XXXXXXXXXXXXXXXBBXXXXXXXXXXXXXXX`,
        `XXXXXXXXXXXXXXX  XXXXXXXXXXXXXXX`,
        `Xss XXXXXXXXXXX  XXXXXXXXXXXXXXX`,
        `Xs ?XXXXXXXXXXX  XXXXXXXXXXXXXXX`,
        `X?d?                      XXXXXX`,
        `XXXXXXXXX XXXXXXXXXXXX XXXXXXXXX`,
        `XXXXXXXXX XXXXXXXXXXXX XXXXXXXXX`,
        `XXXXXXXXX XX!XXXXXX!XX XXXXXXXXX`,
        `XXXXXXXXX              XXXXXXXXX`,
        `XXXXXXXXX              XXXXXXXXX`,
        `XXXXXXXX   XXXXXXXXXX  XXXXXXXXX`,
        `*XXXXXXXX  XXXX XXXXX          *`,
        `*XXXXXXXX      XXXXXX          *`,
        ` XXXXXXXX  XXX  XXXXXXXXXXXXXXXX`,
        ` XXXXXXXX  XX!X XX!XXXXXXXXXXXXX`,
        ` XXXXXXXX            XXXXXXXXXXX`,
        ` XXXXXXXX            XXXXXXXXXXX`,
        ` XXXXXXXXXXXXXXXXXX  XXXXXXXXXXX`,
        ` XXXXXXXX   XXXXXXX  XXXXXXXXXXX`,
        ` XXXXXXXX e     XX?  ?XXXqs bXXX`,
        ` XXXXXXXX   XXX     ??      ?XXX`,
        ` XXXXXXXXXXXXXXXXX ???XXX  ?bXXX`,
        ` XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX`,
        `                 XXXXXXXXXXXXXXX`,
    ],
    {
        "X": Rock,
        "!": RockGolem,
        "?": Crate,
        "s": SulfurCrystal,
        "q": SmokyQuartz,
        "e": Emerald,
        "b": Bomb,
        "d": DragonFlowerSeed,
        "P": Player,
        "B": Boulder,
    }
)

export { statueHall }