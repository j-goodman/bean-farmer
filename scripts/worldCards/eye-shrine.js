import { WorldCard } from '../worldCard.js';
import { Rock } from '../rock.js';
import { StoneWall } from '../stoneWall.js';
import { Player } from '../player.js';
import { EyeStatue } from '../eyeStatue.js';
import { GateBlock } from '../gateBlock.js';
import { Brick } from '../brick.js';
import { Ruby } from '../ruby.js';
import { Bomb } from '../bomb.js';
import { Emerald } from '../emerald.js';
import { Sapphire } from '../sapphire.js';
import { DragonFlowerSeed } from '../dragonFlowerSeed.js';
import { Hatchet } from '../hatchet.js';
import { WildOnionSprout } from '../wildOnion/wildOnionSprout.js';
import { Lockbox } from '../lockbox.js';
import { RockGolem } from '../rockGolem.js';
import { Key } from '../key.js';
import { ExtraHeart } from '../extraHeart.js';
import { SpikeController } from '../spikeController.js';
import { Spikes } from '../spikes.js';
import { DragonFlower } from '../dragonFlower.js';
import { SnailEgg } from '../snailEgg.js';
import { BurningSword } from '../burningSword.js';
import { Boomerang } from '../boomerang.js';
import { Stump } from '../stump.js';
import { WoodGolem } from '../woodGolem.js';
import { Crate } from '../crate.js';
import { SmokyQuartz } from '../smokyQuartz.js';
import { CrystalKey } from '../crystalKey.js';
import { PointsGem } from '../pointsGem.js';
import { Tree } from '../tree.js';
import { SoilCleaner } from '../soilCleaner.js';
import { Pinecone } from '../pinecone.js';
import { Penny } from '../penny.js';
import { Grass } from '../grass/grass.js';
import { HeartFlower } from '../heartFlower.js';
import { Cactus } from '../cactus.js';
import { GasMine } from '../gasMine.js';

let eyeShrine = new WorldCard (
    [
        `               **   XXXXX       `,
        `        XXXXXXXXXXXXXddkX       `,
        `  XXXXXXX!X^R^^^^^^ dd9dX       `,
        `  X     X^^^R^^^^^^^XDddX       `,
        `  X  +  X^XRR^^^^^^^XXXXX       `,
        `  X     X^X^^^^^^^^^X           `,
        `  XXXLXXX^X^^^%^^^^^X           `,
        ` XX     X^X^^^^^^^^^X           `,
        ` X      X^X^^^^^^^^^X           `,
        ` X       ^X^RRRRRRXXX           `,
        ` XX     X X^^^^^^^XXXXXXX       `,
        `* X     X!XXXXX^^XX !!! XXX    *`,
        `* XXX XXXXX#  X  X     cX$X    *`,
        ` XX,,,,,,, ,S X  L      L X     `,
        ` X,,       ,, X  X  !!! XXX     `,
        ` X,   ;     ,XXXXXXXXXXXX       `,
        ` X,   #  ;  ,X                 R`,
        `XX,       # ,XX           R   RR`,
        `X ,, ,,,,, ,, X             R RR`,
        `X S XXG GXX S X               R `,
        `X   XG G GX   X         R   C   `,
        `XXXXX     XXXXX            R&RR `,
        `    doEEEd  D d            RR.RR`,
        `     d       d **        R  RRR `,
    ],
    {
        "X": Brick,
        "R": Rock,
        "&": SpikeController,
        "W": StoneWall,
        "E": EyeStatue,
        "G": GateBlock,
        "@": SnailEgg,
        "S": Tree,
        "c": CrystalKey,
        "T": WoodGolem,
        "d": DragonFlowerSeed,
        "D": DragonFlower,
        "r": Ruby,
        "i": SmokyQuartz,
        "e": Emerald,
        "s": Sapphire,
        "h": Hatchet,
        "o": WildOnionSprout,
        "k": Key,
        "b": Bomb,
        "L": Lockbox,
        "!": RockGolem,
        "$": BurningSword,
        "+": ExtraHeart,
        "1": PointsGem,
        "v": Boomerang,
        "%": SpikeController,
        "^": Spikes,
        "?": Crate,
        "#": SoilCleaner,
        ".": Penny,
        ",": Grass,
        ";": HeartFlower,
        "C": Cactus,
        "9": GasMine,
    }
)

eyeShrine.setVariants("eye statue", ["red", "green", "blue"])
const brickArray = []
for (let index = 0; index < 500; index++) {
    brickArray.push("dark")
}
eyeShrine.setVariants("brick", brickArray)
eyeShrine.addGroundItems(Spikes, "rock")
// eyeShrine.rotateOnlyHorizontally = true

export { eyeShrine }