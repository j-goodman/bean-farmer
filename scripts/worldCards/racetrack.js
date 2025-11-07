import { WorldCard } from '../worldCard.js';
import { Rock } from '../rock.js';
import { Player } from '../player.js';
import { Mercury } from '../mercury.js';
import { Hatchet } from '../hatchet.js';
import { IslandMap } from '../islandMap.js';
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
import { Grass } from '../grass/grass.js';
import { WoolyPig } from '../woolyPig.js';
import { RockGolem } from '../rockGolem.js';
import { Bomb } from '../bomb.js';
import { Lamp } from '../lamp.js';
import { Crate } from '../crate.js';
import { SoilCleaner } from '../soilCleaner.js';
import { DragonFlowerSeed } from '../dragonFlowerSeed.js';
import { Ore } from '../ore.js';
import { Penny } from '../penny.js';

let racetrack = new WorldCard (
    [
        `                0    XXX      0 `,
        `   0          **    XXXXX   0   `,
        `  ....   XXXX     0 X0XXXXX     `,
        ` .... XXXXXXXXXX     XXXXXX0   0`,
        `R.. XXX$XSSSSSSSSX    X!X!X!X   `,
        `.. XXX$XXS?*?p??SSS    XXXXXX   `,
        `..XX$XXXXS*l  ,*Xd X    XXXXX   `,
        ` .XXX$XXXS**pp? SSSS    XXXXX   `,
        `   XXXXX$SSSSSSSSXXXX    XXXXX  `,
        ` X   XX$XXXXXXXXXXXXX     0XXX  `,
        ` XXX XXXXXXXXXXXXXXXX     XXXX  `,
        `XX$X     XXXXX$XXXXXXX  0   XX  `,
        `XXXXXXXX  XXXXXXX*XXXX          `,
        `XXXXXX    XXXXXXXXXXXX   XX     `,
        `XXXXX  XXXXXXXXX$XXXXX   XXX  0 `,
        ` XXX        XXXXXXXXX    XXX    `,
        `WXXXX  XXX  XXXXXXX$X   XXX     `,
        ` XXXXXXX   XXXXXXXXXX   XXX     `,
        `  XXXXX  XXXXXXBBBBX    X       `,
        `  XXXX  XXXX$XXBmkL             `,
        `       XXXXXXXXBBBB             `,
        `    XXXXXXXXXXXXXX  MG       0  `,
        `    W XXXXXXXXXX T              `,
        `         XXXX               0   `,
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
        "!": RockGolem,
        "G": GreenFlag,
        "T": Sign,
        "m": GoldMedal,
        "k": Key,
        ".": Grass,
        "W": WoolyPig,
        "S": StoneWall,
        "p": Bomb,
        "l": Lamp,
        "?": Crate,
        ",": SoilCleaner,
        "d": DragonFlowerSeed,
        "$": Ore,
        "*": Penny,
    }
)

racetrack.writeSigns([
    `I am Miercoles, fastest snail in world!
    
    Race me from green flag to red flag, you will lose! No one but me can have my exceptional treasures.
    
    —M`,
])

racetrack.setVariants("brick", [
    "mercury", "mercury", "mercury", "mercury", "mercury", "mercury",
    "mercury", "mercury", "mercury", "mercury", "mercury", "mercury",
    "mercury", "mercury", "mercury", "mercury", "mercury", "mercury",
])

export { racetrack }