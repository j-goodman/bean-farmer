import { WorldCard } from '../worldCard.js';
import { Rock } from '../rock.js';
import { Player } from '../player.js';
import { Grass } from '../grass/grass.js';
import { Brick } from '../brick.js';
import { Lockbox } from '../lockbox.js';
import { Key } from '../key.js';
import { SnowSnail } from '../snowSnail.js';
import { Hatchet } from '../hatchet.js';
import { Bomb } from '../bomb.js';
import { Boulder } from '../boulder.js';
import { ExtraHeart } from '../extraHeart.js';
import { DragonFlower } from '../dragonFlower.js';
import { Stump } from '../stump.js';
import { DragonFlowerSeed } from '../dragonFlowerSeed.js';
import { WoolyPig } from '../woolyPig.js';
import { WildOnionSprout } from '../wildOnion/wildOnionSprout.js';
import { Telescope } from '../telescope.js';
import { Tree } from '../tree.js';

let greenCave = new WorldCard (
    [
        `    | d                         `,
        `S      S         XXXXXXXXXX     `,
        `  d WS      |   XXXXX   XXXXXX  `,
        ` S  D S S    d  XXXX   XXddXXXXX`,
        `       S   S     XXXXXXXdddddXXX`,
        `                     XXXXddkddXX`,
        `|                 XX  XXXdddddXX`,
        `           |  XXXXXXX   XOdddXXX`,
        `     |     XXXXXXXXOXXX XXXXX XX`,
        `         SXXOXXX  XXXXXOXXXX  XX`,
        `        XXXXXX     XX    @XX XX|`,
        `  |    XXXX  SX  X  X @      XX `,
        `      X Xs  XX   XX     @  XXX  `,
        `  XXXXXX| SXXXX   X       XXX  X`,
        `  XXXXX sXXXXXXXXXXX@     XXX XX`,
        ` XXXXX XXXXX     XXXXX XXXXO  dX`,
        ` XXXXXXXX     XX  XX O  XXXX| XX`,
        ` XBBBBBXX XXXXXXX    XXXXXX   XX`,
        ` XB   BX  XXXXXOXXXXXXXX S  DXXX`,
        ` XB e L  XXXXXXXXXXXXXX  XXXXXXX`,
        ` XB   BXXXXXXXXXXdXX     DXXXXX `,
        ` XBBBBBXXXXXXXXXX    XdSXXXXXXX `,
        ` XXXXXXXXXXXXXXX   XXXXXXXXXX   `,
        `   XXXXXXXXXX |   XXXXXXXXX     `,
    ],
    {
        "X": Rock,
        "B": Brick,
        "D": DragonFlower,
        "W": WoolyPig,
        "d": DragonFlowerSeed,
        "S": Stump,
        // "s": WildOnionSprout,
        "O": Boulder,
        "@": SnowSnail,
        "e": ExtraHeart,
        "L": Lockbox,
        "|": Tree,
        "k": Key,
        "h": Hatchet,
        "t": Telescope,
        "b": Bomb,
        "k": Key,
        " ": Grass,
        "P": Player,
    }
)

export { greenCave }