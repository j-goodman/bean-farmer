import { WorldCard } from '../worldCard.js';
import { Rock } from '../rock.js';
import { Ore } from '../ore.js';
import { Boulder } from '../boulder.js';
import { Emerald } from '../emerald.js';
import { Grass } from '../grass/grass.js';
import { Sign } from '../sign.js';
import { DragonFlower } from '../dragonFlower.js';
import { WoolyPig } from '../woolyPig.js';
import { WoolyPigCarcass } from '../woolyPigCarcass.js';
import { WildOnion } from '../wildOnion/wildOnion.js';
import { Hatchet } from '../hatchet.js';
import { WildOnionSprout } from '../wildOnion/wildOnionSprout.js';
import { Player } from '../player.js';
import { DragonFlowerSeed } from '../dragonFlowerSeed.js';

let horseshoeField = new WorldCard (
    [
        `  XXXX  XXXXXXXXXXXXXXXXXXXXX   `,
        `  d dXXXXXXXXXXXXXXXXXXXXXXXXXX `,
        ` XXd d d XXXXXXXXXXXXXXXXXXXXXXX`,
        `XXXXXXd XXXXXXXXXXXXXXXXXXXXXXXX`,
        `XXXXXXXXX                   XXX `,
        `XXXXXX    WXXXXX X           XXX`,
        `XXXXXX  *  XXXXX X     *     X X`,
        `XXXXX W    XX         XXX   W  X`,
        `XXXX         WXX W    XXXW    XX`,
        `XXXXX          XW      XX    XXXw`,
        ` XXXX                         XX`,
        ` XXXX X              XXXX     XX`,
        ` XXXX XXXXW                  XXX`,
        `XXXX  XXXX    W  XXX         XXW`,
        `XXXXX  XXX       WXXX W      XXXd`,
        `   XXX XXXX      XXXX     W   XX`,
        ` X  XX XX XX    XXXXX      XX X `,
        ` XX XX  * XX   WXXXXXX *  XXX XX`,
        ` XX XXX  XXXW    XXXXX    XXX XX`,
        ` XX  XXXXXX   W   XXXXX XXXXX Xd`,
        `XXXX XXXXXXXXXXXXXXXXXXXXXX   X `,
        `XXXX       XXXXX      W     XXXX`,
        ` XXXXXX     XXX          XXXXX  `,
        `  XXXXXXXXXXXXXXXXXXXXXXXXXX    `,
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
        "T": Sign,
        "h": Hatchet,
        "o": WildOnion,
        "d": DragonFlowerSeed,
        "s": WildOnionSprout,
    }
)

horseshoeField.writeSigns([
    "This is a test."
])

export { horseshoeField }