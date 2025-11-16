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
import { CoinSlot } from '../coinSlot.js';
import { PennyPlaque } from '../pennyPlaque.js';
import { LockedDoor } from '../lockedDoor.js';
import { Penny } from '../penny.js';
import { Diamond } from '../diamond.js';
import { IslandMap } from '../islandMap.js';
import { PigLily } from '../pigLily.js';
import { Scarecrow } from '../scarecrow.js';


let golemerTunnel = new WorldCard (
    [
        `g gg g,RRRRRSRRRRRRRRRRRR , ,,RR`,
        `gXXXggRRRR        R^RRRRRRR ,RR `,
        `0L1XC3CRR            RRRRRRRRRT `,
        `gX56gCCRRg       RRR RRRRRRRR   `,
        `g gggg RRRgHHHHH RRR           R`,
        `g, gggRRRRgHCCCH RRRRRRRRRRRRRRR`,
        `g gRRRRRRg!HCCCH  RRRRRRRRRRRRRR`,
        `RRRR   RR RHHHHHR   RRR!ggRRRRRR`,
        `RRD R   F  RR  RHHH RRgggggRRRRR`,
        `RR     RRRRRD  FS    ggggggRR  X`,
        `R   S  TRRRRRR  HHHR|gg$g.RR   X`,
        `R      RRRRRR   RRRRRRRRRRRT    `,
        `R S  S RRRR|  s  TRRRRRRR       `,
        `R     RRRRR    RRRR            X`,
        `RRRRSRRRRRRg   DRR             X`,
        `RR   RRRRRRgg  RR   RRR        R`,
        ` R e RRRRRRgggFg o RRRRRR     RR`,
        ` R   RRRRRRRRRRRRRRRRRRRRRRRRRRR`,
        ` RR RRRHHHR+RHHHHHRRRORRRRRRRRRR`,
        `,RR RR   HHHHHCCC   O O     ORRR`,
        ` ,R   R       CCC W      .   ORg`,
        `,,RRS    s     R gR    T    OORR`,
        `,RRRRR    W   s   RR RORO RRR,,R`,
        `  ,RRRRRRRRRRRRRRRRRRRRORRRR,,z,`,
    ],
    {
        "X": Brick,
        "R": Rock,
        "H": StoneWall,
        "P": Player,
        "F": Firepot,
        "S": Stump,
        "5": CoinSlot,
        "3": Scarecrow,
        "6": PennyPlaque,
        "*": Penny,
        "1": Diamond,
        "L": LockedDoor,

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
        "i": IslandMap,
        "z": PigLily,
    }
)

golemerTunnel.rotateOnlyVertically = true

golemerTunnel.writeSigns([
    "Please do not bother the wooly pig.",
    "On the eastmost peninsula there is a magic cup in a broken tomb. Find it to win.",
    "Past here is danger.",
    "If you get hurt, eat food to restore your undead vitality. Equip an onion, then press F to eat it. If you're full, pressing F will drop the onion.",
    "You'll blow yourself up if you're not careful. Make sure there is open space in front of you before you press F to throw an equipped bomb.",
])

golemerTunnel.setVariants("wooly pig carcass", ["skeleton"])
golemerTunnel.setVariants("sign", [null, null, "stone"])

export { golemerTunnel }