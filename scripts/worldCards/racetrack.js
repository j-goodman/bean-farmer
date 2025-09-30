import { WorldCard } from '../worldCard.js';
import { Rock } from '../rock.js';
import { Player } from '../player.js';
import { Mercury } from '../mercury.js';
import { Hatchet } from '../hatchet.js';
import { IslandMap } from '../island-map.js';
import { RedFlag } from '../redFlag.js';
import { GreenFlag } from '../greenFlag.js';
import { Sign } from '../sign.js';
import { Brick } from '../brick.js';
import { GoldMedal } from '../goldMedal.js';
import { Key } from '../key.js';
import { LockedDoor } from '../lockedDoor.js';

let racetrack = new WorldCard (
    [
        `                                `,
        `              **    XXXXX       `,
        `         XXXX       XXXXXXX     `,
        `      XXXXXXXXXX     XXXXXXX    `,
        ` R  XXXXXXXXXXXXXX     XXXXXX   `,
        `   XXXXXXXXXXXXXXXX    XXXXXX   `,
        `  XXXXXXXXXXXXXXXXXX    XXXXX   `,
        `  XXXXXXXXXXXXXXXXXX    XXX     `,
        ` XXXXXXXXXXXXXXXXXXXX        X  `,
        `     XXXXXXXXXXXXXXXX       XX  `,
        ` XXX XXXXXXXXXXXXXXXX       XX  `,
        `XXXX     XXXXXXXXXXXXX       X  `,
        `XXXXXXXX XXXXXXXXXXXXX         *`,
        `XXXXXX   XXXXXXXXXXXXX   XX    *`,
        `XXXXXX XXXXXXXXXXXXXXX   XXX    `,
        ` XXXXX     XXXXXXXXXX    XXX    `,
        ` XXXXXXXXX XXXXXXXXXX   XXX     `,
        ` XXXXXXX   XXXXXXXXXX   XXX     `,
        `  XXXXX  XXXXXXBBBBX    X       `,
        `  XXXX  XXXXXXXBmkL             `,
        `       XXXXXXXXBBBB             `,
        `    XXXXXXXXXXXXXX  MG          `,
        `      XXXXXXXXXXT               `,
        `         XXXX                   `,
        `                                `,
    ],
    {
        "X": Rock,
        "B": Brick,
        "L": LockedDoor,
        "P": Player,
        "h": Hatchet,
        "i": IslandMap,
        "M": Mercury,
        "R": RedFlag,
        "G": GreenFlag,
        "T": Sign,
        "m": GoldMedal,
        "k": Key,
    }
)

racetrack.writeSigns([
    `I am Mercury, fastest snail in world!
    
    Race me from green flag to red flag, you will lose! No one but me can have my exceptional treasures.
    
    —M`,
])

racetrack.setVariants("brick", [
    "mercury", "mercury", "mercury", "mercury", "mercury", "mercury",
    "mercury", "mercury", "mercury", "mercury", "mercury", "mercury",
    "mercury", "mercury", "mercury", "mercury", "mercury", "mercury",
])

export { racetrack }