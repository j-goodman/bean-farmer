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
import { SoilCleaner } from '../soilCleaner.js';
import { WoolyPig } from '../woolyPig.js';
import { Crate } from '../crate.js';
import { WildOnion } from '../wildOnion/wildOnion.js';
import { Hatchet } from '../hatchet.js';
import { HeartFlower } from '../heartFlower.js';
import { WildOnionSprout } from '../wildOnion/wildOnionSprout.js';
import { Player } from '../player.js';
import { DragonFlowerSeed } from '../dragonFlowerSeed.js';
import { WildCornSeed } from '../wildCornSeed.js';
import { Sign } from '../sign.js';
import { Mushroom } from '../mushroom.js';
import { WoolyPigCarcass } from '../woolyPigCarcass.js';
import { Bomb } from '../bomb.js';
import { Chicken } from '../chicken.js';
import { DeathsHead } from '../deathsHead.js';


let golemerTunnel = new WorldCard (
    [
        `gRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR`,
        `!ggRRRRRRR        R^RRRRRRRRRRRR`,
        `gggg0CCRR            RRRRRRRRRTR`,
        `gggggCCRR        RRR RRRRRRRR   `,
        `gggggg RRR RRRRR RRR           R`,
        `ggg ggRRRR RRRRR RRRRRRRRRRRRRRR`,
        `gggRRRRRR  RRRRR  RRRRRRRRRRRRRR`,
        `RRRR   RR RRRRRRR   RRR!ggRRRRRR`,
        `RRD R   F  RRR RRRR RRgggggRRRRR`,
        `RR     RRRRRD  F  S  ggggggRR  X`,
        `R   S  TRRRRRR RRRRRSgg$g.RR   X`,
        `R      RRRRRR   RRRRRRRRRRRT    `,
        `R S  S RRRRR  s  TRRRRRRR       `,
        `R     RRRRRRR  RRRR            X`,
        `RRRRSRRRRRRRRR DRR             X`,
        `RR   RRRRRRRRR RR   RRR        R`,
        ` R e RRRRRRRRR   o RRRRRR     RR`,
        ` R   RRRRRRRRRRRRRRRRRRRRRRRRRRR`,
        ` RRR RRRRRRRRRRRRRRRRORRRRRRRRRR`,
        ` RRR        RRCCCR  O O     ORRR`,
        `  RR RW       CCC        .   ORg`,
        `  RRS    s     R gR    T    OORR`,
        ` RRRRR  W     s   RR RORO RRRRRR`,
        `   RRRRRRRRRRRRRRRRRRRRORRRRRRRR`,
    ],
    {
        "X": Brick,
        "R": Rock,
        "P": Player,
        "F": Firepot,
        "S": Stump,

        "O": Ore,
        ".": Bomb,
        "B": Boulder,
        "m": Mushroom,
        "T": Sign,
        "W": WoolyPig,
        "$": WoolyPigCarcass,
        "!": SoilCleaner,
        "C": Crate,
        "c": WildCornSeed,
        "0": Chicken,
        "D": DragonFlower,
        "P": Player,
        "e": Emerald,
        "g": Grass,
        "h": Hatchet,
        ",": HeartFlower,
        "o": WildOnion,
        "d": DragonFlowerSeed,
        "s": WildOnionSprout,
        "^": DeathsHead,
    }
)

golemerTunnel.rotateOnlyVertically = true

golemerTunnel.writeSigns([
    "Please do not bother the wooly pig. Do not stand in front of it or go closer than one step away.",
    "Near the easternmost point there is a magic cup in a broken tomb. Find it to win.",
    "Past here is danger.",
    "If you get hurt, eat food. Equip an onion, then press F to eat it. If you're full, pressing F will drop the onion.",
    "Make sure there is open space in front of you before you press F to throw equipped bomb.",
])

golemerTunnel.setVariants("wooly pig carcass", ["skeleton"])
golemerTunnel.setVariants("sign", [null, null, "stone"])

export { golemerTunnel }