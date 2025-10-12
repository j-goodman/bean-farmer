import { WorldCard } from '../worldCard.js';
import { Rock } from '../rock.js';
import { StoneWall } from '../stoneWall.js';
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
import { Tree } from '../tree.js';
import { ExtraHeart } from '../extraHeart.js';


let golemerTunnel = new WorldCard (
    [
        `gRRR   RRRRRRRRRRRRRRRRRR     RR`,
        `!g0RRRRRRR        R^RRRRRRR  RRR`,
        `ggg00CCRR            RRRRRRRRRTR`,
        `gggggCCRRg       RRR RRRRRRRR   `,
        `gggggg RRRgHHHHH RRR           R`,
        `ggg ggRRRRgHgggH RRRRRRRRRRRRRRR`,
        `gggRRRRRRg!HgggH  RRRRRRRRRRRRRR`,
        `RRRR   RR RHHHHHR   RRR!ggRRRRRR`,
        `RRD R   F  RR  RHHH RRgggggRRRRR`,
        `RR     RRRRRD  FS    ggggggRR  X`,
        `R   S  TRRRRRR  HHHR|gg$g.RR   X`,
        `R      RRRRRR   RRRRRRRRRRRT    `,
        `R S  S RRRR|  s  TRRRRRRR       `,
        `R     RRRRR    RRRR            X`,
        `RRRRSRRRRRRg   DRR             X`,
        `RR   RRRRRRgg  RR   RRR        R`,
        ` R e RRRRRRgg F  o RRRRRR     RR`,
        ` R   RR+RRRRggRRRRRRRRRRRRRRRRRR`,
        ` RR RRRHHRRRRHHHHHRRRORRRRRRRRRR`,
        ` RR RR  HHHHHHCCC   O O     ORRR`,
        `  R   R     W CCC        .   ORg`,
        `  RRS    s     R gR    T    OORR`,
        ` RRRRR    W   s   RR RORO RRR  R`,
        `   RRRRRRRRRRRRRRRRRRRRORRRR    `,
    ],
    {
        "X": Brick,
        "R": Rock,
        "H": StoneWall,
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
        "+": ExtraHeart,
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
        "|": Tree,
    }
)

golemerTunnel.rotateOnlyVertically = true

golemerTunnel.writeSigns([
    "If the venomous plant swells with gas and bursts, stand still to avoid taking more damage.",
    "On the eastmost peninsula there is a magic cup in a broken tomb with no one inside it. Find it to win.",
    "Past here is danger.",
    "If you get hurt, eat food. Equip an onion, then press F to eat it. If you're full, pressing F will drop the onion.",
    "Make sure there is open space in front of you before you press F to throw an equipped bomb.",
])

golemerTunnel.setVariants("wooly pig carcass", ["skeleton"])
golemerTunnel.setVariants("sign", [null, null, "stone"])

export { golemerTunnel }