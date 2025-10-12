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
        `XXXXXXX  R                      `,
        `XXXXXXX      XXBBXX   &         `,
        `XXss XXXXXXXXXX  XXXXXXXXXXX    `,
        `XXs ?XXXXXXXXXX  XXXXXXXXXXX    `,
        `XX?d?                     XX    `,
        `XXXXXXXXX XXXXX  XXXXX XXXXX    `,
        `XXXXXXXXX XXXXXXXXXXXX XXXXX    `,
        `&     &XX XX!XXXXXX!XX          `,
        `       XX                 &     `,
        `   &   XX                       `,
        ` XXXXXXXX  XXXXXXXXXX        &  `,
        `*XXXXXXXX  XXXX XXXXX          *`,
        `*XXXXXXXX      XXXXXX          *`,
        ` XXXXXXXX  XXX  XXXXXXX         `,
        ` XXX???XX  XX!X XX!XXXX        R`,
        ` XXX?k?XX            XX &    R  `,
        ` XXX???XX            XX         `,
        ` XXXXX XXXXXXXXXXXX  XX         `,
        ` XXXXX XX ! XXXXXXX  XX         `,
        ` XXX&     B     XX?  ?X         `,
        ` XXXXXXXX   XXX     ??X         `,
        ` XXXXXXXXXXXXXXXXX????X         `,
        ` XXXXXXXXXXXXXXXXXXXXXX         `,
        `   ,   &                        `,
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