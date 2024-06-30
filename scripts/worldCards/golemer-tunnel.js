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
        ` RRRRRRRRR      m RRRRRRRRRRRRRR`,
        `  RRRRRRRm           RRRRRRRRRTR`,
        `  RRRRRRR     m  RRR RRRRRRRR   `,
        `  RRRRRRRR RRRRR RRR           R`,
        `  RRRRRRRR RRRRR RRRRRRRRRRRRRRR`,
        ` RRRRRRRRR RRRRRgRRRRRRRRRRRRRRR`,
        `RRRR   RRR RRRgg ggRRRRRRRRRRRRR`,
        `RRD R    F  RRR ggg RRRRRRRRRRRR`,
        `RR     RRRRRRDg sgggRRRRR RRR  R`,
        `R   S  RRRRR   g  RRRRRRRRRR   X`,
        `R      RRRRR RRRRRRRRRRRRRRR   X`,
        `R S  S RRRRR    TRRRsRRRRRT     `,
        `R     RRRRRRR  RRRR             `,
        `RRRRSRRRRRRRRR DRR             X`,
        `RRR   RRRRRRRR RR   RRR        X`,
        ` RRe RRRRRRRRR   o RRRRRR     RR`,
        ` RRR RRRRRRRRRRRRRRRRORRRRRRRRRR`,
        ` RRRgRRRRRRRRRRRRRRRO ORRTRRRRRR`,
        ` RRRgggggg  RR W           gSgRR`,
        `  RRgRggg             s  g  gSgR`,
        `  RRSggggs     R g      W Sg ORR`,
        ` RRRRRg       s   RR RORO RRORRR`,
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

golemerTunnel.writeSigns([
    "Barn. Please do not bother the wooly pig.",
    "If you get hurt, eat food to recover. You can equip an onion, then press F to eat it. If you're already healthy, you can press F to drop the onion.",
    "DANGER. Treacherous caves ahead.",
    "You can pause and look at your items by pressing Enter, or by pressing E."
])

export { golemerTunnel }