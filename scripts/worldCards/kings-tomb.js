import { WorldCard } from '../worldCard.js';
import { Rock } from '../rock.js';
import { Player } from '../player.js';
import { Hatchet } from '../hatchet.js';
import { Bomb } from '../bomb.js';
import { PowderBomb } from '../powderBomb.js';
import { TombStatue } from '../tombStatue.js';
import { Tomb } from '../tomb.js';
import { Brick } from '../brick.js';
import { StoneWall } from '../stoneWall.js';
import { Firepot } from '../firepot.js';
import { Sapphire } from '../sapphire.js';
import { Lamp } from '../lamp.js';
import { StoneSlab } from '../stoneSlab.js';
import { Grass } from '../grass/grass.js';
import { Ore } from '../ore.js';
import { RockGolem } from '../rockGolem.js';
import { Mushroom } from '../mushroom.js';
import { MeteorCrystal } from '../meteorCrystal.js';
import { SpikeController } from '../spikeController.js';
import { Spikes } from '../spikes.js';
import { Key } from '../key.js';

let kingsTomb = new WorldCard (
    [
        `               **               `,
        `         XXXXXX                 `,
        `      XXXXXXXXXXXXXXX  XXXX     `,
        `     XXXXOXXXOXXXXXXXXXXXXXX    `,
        `    XXXXXXOXXXXXXXXXXXXXXXXX    `,
        `    XXXOXOXOXXXXXXXXXXXXXXXX    `,
        `   XXXXXOXXXXXXXXXXXXXXXXXXX    `,
        `   X!XXOXXBBBBBBBBBBBXXXXXX     `,
        `   WXXO.OXB!       !BXXXXX      `,
        `   W.XX..XB    T    BXXXXX      `,
        `    .X!.XXB WWcskWW BXXXXX      `,
        `*  W....XXB KWWWWWK BXXXXX     *`,
        `*  W..XXXXB         BXXXX      *`,
        `   WWWWXXXB         BXXXX       `,
        `      XXXXB         BXXXX       `,
        `     XXXXXBF WW WW FBXXXXX      `,
        `     XXXXXBBBB   BBBBXXXXXX     `,
        `    XXXXXXX!X^^^^^X$XXXXXXX     `,
        `     XXXXXXXX^^^^^XXXXXXXX      `,
        `       XXXXXXW,,, mXXXXXm       `,
        `        ,   mWWWWWXXXXX         `,
        `   ,      ,,,,m,,  ,            `,
        `           ,,,, ,    ,          `,
        `         ,  ,,,**               `,
    ],
    {
        "X": Rock,
        "B": Brick,
        "O": Ore,
        "W": StoneWall,
        "F": Firepot,
        "!": RockGolem,
        "P": Player,
        "l": Lamp,
        "h": Hatchet,
        "s": Sapphire,
        "c": MeteorCrystal,
        "k": Key,
        "b": Bomb,
        "p": PowderBomb,
        "m": Mushroom,
        ",": Grass,
        "K": TombStatue,
        "T": Tomb,
        "$": SpikeController,
        "^": Spikes,
    }
)

kingsTomb.noRotate = true
// kingsTomb.rotateOnlyHorizontally = true
kingsTomb.floor = StoneSlab
kingsTomb.floorBounds = [{x: 10, y: 7}, {x: 20, y: 17}]

const brickArray = []
for (let index = 0; index < 500; index++) {
    brickArray.push("dark")
}
kingsTomb.setVariants("brick", brickArray)
kingsTomb.setVariants("spike controller", ["slow"])

kingsTomb.lightFirepots()

export { kingsTomb }