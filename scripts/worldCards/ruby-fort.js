import { WorldCard } from '../worldCard.js';
import { Rock } from '../rock.js';
import { Player } from '../player.js';
import { Ruby } from '../ruby.js';
import { Ore } from '../ore.js';
import { WoolyPig } from '../woolyPig.js';
import { Grass } from '../grass/grass.js';
import { SnowSnail } from '../snowSnail.js';
import { Boulder } from '../boulder.js';
import { Crate } from '../crate.js';
import { DragonFlowerSeed } from '../dragonFlowerSeed.js';
import { Sapphire } from '../sapphire.js';
import { Bomb } from '../bomb.js';
import { SulfurCrystal } from '../sulfurCrystal.js';
import { SmokyQuartz } from '../smokyQuartz.js';
import { RockGolem } from '../rockGolem.js';
import { Brick } from '../brick.js';
import { Key } from '../key.js';
import { HeartFlower } from '../heartFlower.js';
import { Ring } from '../rings.js';
import { Hatchet } from '../hatchet.js';
import { IslandMap } from '../island-map.js';
import { StoneWall } from '../stoneWall.js';
import { Tree } from '../tree.js';
import { DragonFlower } from '../dragonFlower.js';
import { Pinecone } from '../pinecone.js';
import { SoilCleaner } from '../soilCleaner.js';
import { ExtraHeart } from '../extraHeart.js';
import { DeathsHeadSeed } from '../deathsHeadSeed.js';

let rubyFort = new WorldCard (
    [
        `                                `,
        `                                `,
        `              ...               `,
        `             ..$.p.             `,
        ` .$.  D        ...              `,
        `.p...                           `,
        ` ...             HHHHHHHHHHH    `,
        `  B .   W ..     HdHIHdHIHdH    `,
        `    W    ..|     H         H    `,
        `        B  ..    H  XXXXX HH    `,
        `              d HHH X   X HC    `,
        `                H   X i X HC    `,
        `   B  ..    d d HHH X   X HC    `,
        `      |..  HHHHHH   B XXX HH    `,
        `     ..    HI  eHHH X X+X  H    `,
        `        O   C    HI XXXIX HH    `,
        `       O   XCXRRRR    CCC       `,
        `        XXXXCXXRXX XXX      B   `,
        `        XrOO OXXX  I X          `,
        ` W     OXOO     C    X     RR R `,
        `  R     XXXXXXXXC CC!X    RRORRR`,
        `g     O    O   XXXXXXX    RRRRR `,
        ` Bgg      O             R  RROR `,
        `             O            RRRR  `,
    ],
    {
        "X": Brick,
        "R": Rock,
        "O": Ore,
        "B": Boulder,
        "d": DragonFlowerSeed,
        "D": DragonFlower,
        "b": Bomb,
        ",": HeartFlower,
        "x": SulfurCrystal,
        "!": Key,
        "I": RockGolem,
        ".": Grass,
        "W": WoolyPig,
        "B": Boulder,
        "C": Crate,
        "r": Ruby,
        "s": Sapphire,
        "S": SnowSnail,
        "P": Player,
        "h": Hatchet,
        "m": IslandMap,
        "i": Ring,
        "H": StoneWall,
        "|": Tree,
        "p": Pinecone,
        "$": SoilCleaner,
        "+": ExtraHeart,
        "e": DeathsHeadSeed,
    }
)

rubyFort.setVariants("pearl ring", [
    "onyx",
])

rubyFort.rotateOnlyHorizontally = true

export { rubyFort }