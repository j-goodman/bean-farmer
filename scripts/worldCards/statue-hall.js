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
import { StoneWall } from '../stoneWall.js';
import { HeartFlower } from '../heartFlower.js';

let statueHall = new WorldCard (
    [
        `XXXXXXX  RRRRR               RRR`,
        `XXXXXXX   RRRXXBBXX   &      RRR`,
        `XXss XXXXXXXXXX  XXXXXXXXXXX RRR`,
        `XXs ?XXXXXXXXXX  XXXXXXXXXXX RRR`,
        `XX?d?                     XX RRR`,
        `XXXXXXXXX XXXXX  XXXXX XXXXX  RR`,
        `XXXXXXXXX XXXXXXXXXXXX XXXXX    `,
        `&     &XX XX!XXXXXX!XX          `,
        `       XX                 &     `,
        `   &   XX                      &`,
        ` XXXXXXXX  XXXXXXXXXX           `,
        `*XXXXXXXX  XXXX XXXXX          *`,
        `*XXXXXXXX      XXXXXX          *`,
        ` XXXXXXXX  XXX  XXXXXXX         `,
        ` XXX   XX  XX!X XX!XXXX        R`,
        ` XXX k XX            XX &    R  `,
        ` XXX   XX            XX         `,
        ` XXXXX XXXXXXXXXXXX  XXXXXXXXXX `,
        ` XXXXX XX ! XXXXXXX  XXXXXXXXXX `,
        ` XXX&     B     XX?  ?XXXqs bXX `,
        ` XXXXXXXX   XXX     ??      ?XX `,
        ` XXXXXXXXXXXXXXXXX ???XXX  ?bXX `,
        ` XXXXXXXXXXXXXXXXXXXXXXXXXXXXXX `,
        `   ,   &        XXXXXXXXXXXXXXX `,
    ],
    {
        "X": StoneWall,
        "!": RockGolem,
        "R": Rock,
        "?": Crate,
        "s": SulfurCrystal,
        "q": SmokyQuartz,
        "e": Emerald,
        "k": Key,
        "b": Bomb,
        "d": DragonFlowerSeed,
        ",": HeartFlower,
        "&": Cactus,
        "P": Player,
        "h": Hatchet,
        "B": Boulder,
    }
)

statueHall.rotateOnlyHorizontally = true

export { statueHall }