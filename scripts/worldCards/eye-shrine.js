import { WorldCard } from '../worldCard.js';
import { Rock } from '../rock.js';
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

let eyeShrine = new WorldCard (
    [
        ` XXXXX         **   XXXXX   o   `,
        ` X   XXXXXXXXXXXXXXXXddkX o     `,
        ` X +    X!X^^^^^^^^  dDdX      o`,
        ` X      X^^^^^^^^^^^XoddXo      `,
        ` XX     X^X^^^^^^^^^XXXXX       `,
        `  X     X^X^^^^^^^^^X??X     o  `,
        `  XXXLXXX^X^^^%^^^^^X?iX oXXLXX `,
        ` XX     X^X^^^^^^^^^X??X  X   X `,
        ` X      X^X^^^^^^^^^Xi+XXXX 1 X `,
        ` X       ^X^RRRRRRXXX?    L   X `,
        ` XX     X X^^^^^^^XXXXXXXXXXXXX `,
        `* X     X!XXXXX^^XX    ! !   X *`,
        `* XXX XXXXX   X  X           X *`,
        ` XX           X  L           XX `,
        ` X  S     S   X  X     ! !    X `,
        ` X           XXXXXXX   XXXX $ X `,
        ` X           X     X   X  X   X `,
        `XX   S   S   XX   XX   XX XXXXX `,
        `X             X   X  c  X       `,
        `X   XXG GXX   X   X     X       `,
        `X   XG@G@GX   X   XXXXXXX       `,
        `XXXXX  @  XXXXX d               `,
        `  d o EEE   d o                 `,
        `do      d  o d **  o            `,
    ],
    {
        "X": Brick,
        "R": Rock,
        "E": EyeStatue,
        "G": GateBlock,
        "@": SnailEgg,
        "P": Player,
        "S": Stump,
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