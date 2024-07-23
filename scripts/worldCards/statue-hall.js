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

let statueHall = new WorldCard (
    [
        `XXXXXXXXXXXXXXXBBXXXXXXXXXXXXXXX`,
        `XXXXXXXXXXXXXXX  XXXXXXXXXXXXXXX`,
        `Xss XXXXXXXXXXX  XXXXXXXXXXXXXXX`,
        `Xs ?XXXXXXXXXXX  XXXXXXXXXXXXXXX`,
        `X?d?                      XXXXXX`,
        `XXXXXXXXX XXXXX  XXXXX XXXXXXXXX`,
        `XXXXXXXXX XXXXXXXXXXXX XXXXXXXXX`,
        `XXXXXXXXX XX!XXXXXX!XX XXXXXXXXX`,
        `       XX              XXXXXXXXX`,
        `       XX              XXXXXXXXX`,
        ` XXXXXXXX  XXXXXXXXXX  XXXXXXXXX`,
        `*XXXXXXXX  XXXX XXXXX          *`,
        `*XXXXXXXX      XXXXXX          *`,
        ` XXXXXXXX  XXX  XXXXXXXXXXXXXXXX`,
        ` XXX   XX  XX!X XX!XXXXXXXXXXXXX`,
        ` XXX k XX            XX         `,
        ` XXX   XX            XX         `,
        ` XXXXX XXXXXXXXXXXX  XXXXXXXXXXX`,
        ` XXXXX XX ! XXXXXXX  XXXXXXXXXXX`,
        ` XXXX     B     XX?  ?XXXqs bXXX`,
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
        "k": Key,
        "b": Bomb,
        "d": DragonFlowerSeed,
        "P": Player,
        "B": Boulder,
    }
)

statueHall.rotateOnlyHorizontally = true

export { statueHall }