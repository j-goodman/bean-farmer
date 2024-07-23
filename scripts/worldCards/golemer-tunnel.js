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
import { Mushroom } from '../mushroom.js';


let golemerTunnel = new WorldCard (
    [
        ` RRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR`,
        ` RRRRRRRRR        RRRRRRRRRRRRRR`,
        `  RRRRRRR            RRRRRRRRRTR`,
        `  RRRRRRR        RRR RRRRRRRR   `,
        `  RRRRRRRR RRRRR RRR           R`,
        `  RRRRRRRR RRRRR RRRRRRRRRRRRRRR`,
        ` RRRRRRRRR RRRRRgRRRRRRRRRRRRRRR`,
        `RRRR   RRR RRRgg ggRRRRRRRRRRRRR`,
        `RRD R    F  RRR ggg RRRRRRRRRRRR`,
        `RR     RRRRRRDg sgggRRRRR RRR  X`,
        `R   S  RRRRRRR g  RRRRRRRRRR   X`,
        `R      RRRRR   RRRRRRRRRRRRT    `,
        `R S  S RRRRR    TRRRsRRRR       `,
        `R     RRRRRRR  RRRR            X`,
        `RRRRSRRRRRRRRR DRR             X`,
        `RRR   RRRRRRRR RR   RRR        R`,
        ` RRe RRRRRTRRR   o RRRRRR     RR`,
        ` RRR RRRRR  DRRRRRRRRORRRRRRRRRR`,
        ` RRR RRRRR RRRRRRRRRO ORRRRRRRRR`,
        ` RRR        RR W           gSgRR`,
        `  RR R                s  g  gSgg`,
        `  RRS    s     R g      W Sg ORR`,
        ` RRRRR        s   RR RORO RRORRR`,
        `   RRRRRRRRRRRRRRRRRRRRORRRRRRRR`,
    ],
    {
        "X": Brick,
        "R": Rock,
        "P": Player,
        "F": Firepot,
        "S": Stump,

        "O": Ore,
        "B": Boulder,
        "m": Mushroom,
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

golemerTunnel.rotateOnlyVertically = true

golemerTunnel.writeSigns([
    "Barn. Please do not bother the wooly pig.",
    "DANGER. Treacherous caves ahead.",
    "If you get hurt, eat food to recover. You can equip an onion, then press F to eat it. If you're already healthy, you can press F to drop the onion.",
    "You can pause and look at your items by pressing Enter, or by pressing E."
])

export { golemerTunnel }