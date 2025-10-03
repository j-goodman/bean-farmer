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
import { Songbird } from '../songbird.js';
import { Boulder } from '../boulder.js';
import { StoneWall } from '../stoneWall.js';
import { Ring } from '../rings.js';

let racetrack = new WorldCard (
    [
        `                0             0 `,
        `   0          **    XXXXX   0   `,
        `         XXXX     0 X0XXXXX     `,
        `      XXXXXXXXXX     XXXXXX0   0`,
        ` R  XXXXXXXXXXXXXX     XXXXXX   `,
        `   XXXXXXXXXXXXXXXX    XXXXXX 0 `,
        `  XXXXXXXXXXXXXXXXXX    XXXXX   `,
        `  XXXXXXXXXXXXXXXXXX    XXX    0`,
        ` XXXXXXXXXXXXXXXXXXXX        X  `,
        `     XXXXXXXXXXXXXXXX     0 XX  `,
        ` XXX XXXXXXXXXXXXXXXX       XX  `,
        `XXXX     XXXXXXXXXXXXX  0    X  `,
        `XXXXXXXX XXXXXXXXXXXXX         *`,
        `XXXXXX   XXXXXXXXXXXXX   XX    *`,
        `XXXXXX XXXXXXXXXXXXXXX   XXX  0 `,
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
        "H": StoneWall,
        "0": Boulder,
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
        "s": Songbird,
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