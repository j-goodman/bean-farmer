import { WorldCard } from '../worldCard.js';
import { Rock } from '../rock.js';
import { Ore } from '../ore.js';
import { Boulder } from '../boulder.js';
import { Emerald } from '../emerald.js';
import { Grass } from '../grass/grass.js';
import { Stump } from '../stump.js';
import { Brick } from '../brick.js';
import { Firepot } from '../firepot.js';
import { DragonFlower } from '../dragonFlower.js';
import { WoolyPig } from '../woolyPig.js';
import { Crate } from '../crate.js';
import { WildOnion } from '../wildOnion/wildOnion.js';
import { Hatchet } from '../hatchet.js';
import { WildOnionSprout } from '../wildOnion/wildOnionSprout.js';
import { Player } from '../player.js';
import { DragonFlowerSeed } from '../dragonFlowerSeed.js';
import { WildCornSeed } from '../wildCornSeed.js';
import { Sign } from '../sign.js';


let golemerTunnel = new WorldCard (
    [
        ` RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR`,
        ` RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR`,
        `  RRRRRRRRRRRRRRRRRRRRRRRRRRRRTR`,
        `  RRRRRRRR       RRRRRRRRRR     `,
        `  RRRRRRRR RRRRR            RRRR`,
        `  RRRRRRRR RRRRR RRRRRRRRRRRRRRR`,
        ` RRRRRRRRR RRRRRgRRRRRRRRRRRRRRR`,
        `RRRR   RRR RRRgg ggRRRRRRRRRRRRR`,
        `RRD R    F  RRRggg  RRRRRRRRRRRR`,
        `RR     RRRRRRD  sgg RRRRR RRR   `,
        `R   S  RRRRR   g  RRRRRRRRRR    `,
        `R      RRRRR RRRRRRRRRRRRRRR    `,
        `R S  S RRRRR    TRRRsRRRRRT     `,
        `R     RRRRRRR  RRRR             `,
        `RRRRSRRRRRRRRR DRR              `,
        `RRR   RRRRRRRR RR   RRR        R`,
        ` RRe RRRRRRRRR   o RRRRRR     RR`,
        ` RRR RRRRRRRRRRRRRRRRRRRRRRRRRRR`,
        ` RRRgRRRRRRRRRRRRRRRRRRRRRRRRRRR`,
        ` RRRggggg   RR                RR`,
        `  RRgRgg              s    h   R`,
        `  RRSgg gs     R g           RRR`,
        ` RRRRR        s   RRRRRRRRRRRRRR`,
        `   RRRRRRRRRRRRRRRRRRRRRRRRRRRRR`,
    ],
    {
        "X": Brick,
        "R": Rock,
        "P": Player,
        "F": Firepot,
        "S": Stump,

        "O": Ore,
        "B": Boulder,
        "T": Sign,
        "W": WoolyPig,
        "C": Crate,
        "c": WildCornSeed,
        "D": DragonFlower,
        "P": Player,
        "e": Emerald,
        "g": Grass,
        "h": Hatchet,
        "o": WildOnion,
        "d": DragonFlowerSeed,
        "s": WildOnionSprout,
    }
)

golemerTunnel.writeSigns([
    "Barn. Please do not bother the wooly pig.",
    "If you get hurt, eat food to recover. You can equip an onion, then press F to eat it.",
    "DANGER. Treacherous caves ahead."
])

export { golemerTunnel }