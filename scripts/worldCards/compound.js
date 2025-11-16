import { WorldCard } from '../worldCard.js';
import { Rock } from '../rock.js';
import { Boulder } from '../boulder.js';
import { WoolyPig } from '../woolyPig.js';
import { Cactus } from '../cactus.js';
import { Player } from '../player.js';
import { Hatchet } from '../hatchet.js';
import { Mushroom } from '../mushroom.js';
import { Grass } from '../grass/grass.js';
import { GrassSeed } from '../grass/grassSeed.js';
import { RazorWire } from '../razorWire.js';
import { RandomGem } from '../randomGem.js';
import { Dollar } from '../dollar.js';
import { Pesoduro } from '../pesoduro.js';
import { GasMine } from '../gasMine.js';
import { PowderBomb } from '../powderBomb.js';
import { IslandMap } from '../islandMap.js';
import { AtomBomb } from '../atomBomb.js';
import { OceanDryer } from '../oceanDryer.js';
import { Lockbox } from '../lockbox.js';
import { Key } from '../key.js';
import { Brick } from '../brick.js';
import { MagicMap } from '../magicMap.js';
import { Scarecrow } from '../scarecrow.js';

let compound = new WorldCard (
    [
    ` x   B  |||||||. .      `,
    `   G   .|@*ggg|.. . .   `,
    `     x  |*ggg*|.       x`,
    `  X ||| |||||||  X      `,
    `x   |               |p|.`,
    `||||| ||||||||||||| |p| `,
    `|  x  |p          | ||| `,
    `| |||||   |||| S  |    |`,
    `| |    G  |  |||| HHHH |`,
    `X | |     |     | L0gH X`,
    ` B| |||||G||B|||| H*iH |`,
    `|G| |        |    HHHH |`,
    `|k| | |||||| |       | |`,
    `| |   |    ||| G     | |`,
    `| |   |           |||| |`,
    `| |   ||G|| |    p|    |`,
    `| |         |    p|  |||`,
    `| ||||||||||||||||| X x `,
    ],
    {
        "X": Rock,
        "B": Boulder,
        "P": Player,
        "h": Hatchet,
        "H": Brick,
        "i": MagicMap,
        "a": AtomBomb,
        "m": Mushroom,
        "W": WoolyPig,
        "|": RazorWire,
        "x": Cactus,
        ".": Grass,
        "g": RandomGem,
        "*": Dollar,
        "@": Pesoduro,
        "G": GasMine,
        "p": PowderBomb,
        "0": OceanDryer,
        "L": Lockbox,
        "k": Key,
        "S": Scarecrow,
    }
)

export { compound }