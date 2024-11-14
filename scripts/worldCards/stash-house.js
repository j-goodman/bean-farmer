import { WorldCard } from '../worldCard.js';
import { Rock } from '../rock.js';
import { Player } from '../player.js';
import { Crate } from '../crate.js';
import { DragonFlower } from '../dragonFlower.js';
import { SnowSnail } from '../snowSnail.js';
import { StoneWall } from '../stoneWall.js';
import { Fence } from '../fence.js';
import { Grass } from '../grass/grass.js';
import { Chicken } from '../chicken.js';
import { PowderBomb } from '../powderBomb.js';
import { Hatchet } from '../hatchet.js';
import { SoilCleaner } from '../soilCleaner.js';
import { Bomb } from '../bomb.js';
import { Tree } from '../tree.js';
import { Brick } from '../brick.js';
import { RockGolem } from '../rockGolem.js';
import { TombStatue } from '../tombStatue.js';
import { Key } from '../key.js';
import { Spikes } from '../spikes.js';
import { SpikeController } from '../spikeController.js';

let stashHouse = new WorldCard (
    [
    `         S SSSSSSSSB % BSSSXX   `,
    `         SSS   S$S^BBBBB ,b,XXX `,
    `             S S  ^B   B  ,,,XXX`,
    `             S   S^  k B   ,,,XX`,
    `         SSS S$S S^B   B   ,,,XX`,
    `         S SSSSSSSSBBBBB  ,,,  X`,
    `                   B   BSSSSpSSX`,
    `                         T ,,   `,
    `                          ,,  X `,
    `         XXXXXXX           ,,, b`,
    `        XX     XXXX  X     ,,,,p`,
    `                   X      ,,,,,b`,
    `                      X  ,,,,,  `,
    `   ,,                X ,,,,,,,, `,
    `,,            ,,,,  XX,,,,,,,,,,`,
    `         ,,,,,,,,  Xb,,,,,,,,,,D`,
    ` SScSSSffffff,,,  XXX,,,,,,,,,,@`,
    ` Sc ??S,c,, f,   XXb,,,,,,,,,,,p`,
    ` S     ,,c,,f    XX,,,,,,,,,,,, `,
    ` S    S ,,c,f   XX,,T,,,,,,,,,, `,
    ` S ? ?S,,,,,f,  XX,,,,,,,,, ,,,,`,
    ` S SS?Sffffff,,,XXXX,,,,,,,,,,, `,
    `,SSSSSS  ,,,,,,,,XXXXX,,,,,,,,,,`,
    `!,,  ,,,,,,,,      XXXXXX,,,,T,,`,
    ],
    {
        "X": Rock,
        "S": StoneWall,
        "A": TombStatue,
        "B": Brick,
        "b": Bomb,
        "f": Fence,
        "?": Crate,
        "T": Tree,
        "@": SnowSnail,
        "D": DragonFlower,
        "h": Hatchet,
        "P": Player,
        ",": Grass,
        "^": Spikes,
        "%": SpikeController,
        "c": Chicken,
        "p": PowderBomb,
        "!": SoilCleaner,
        "$": RockGolem,
        "k": Key,
    }
)

stashHouse.setVariants("spike controller", ["slow", "slow"])

export { stashHouse }