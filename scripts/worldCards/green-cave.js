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
        `W  D| d XXXXXXX  XXXXXXXXXXXX   `,
        `S      SXXXXXX   XXXXXXXXXXXXXX `,
        `  d  S XXXXX|X  XXXXXXXXXXXXXXXX`,
        ` S   XS SXXXXd  XXXXXXXXXXXXXXXX`,
        `XXXXXXXSXXXSXX   XXXXXXXXXXXXXXX`,
        `XXXXXXXXXXXXXXX      XXXXXXXXXXX`,
        `XXXXXXXXXXX  XXX  XX  X XXXXXXXX`,
        `XXXXXXXXX        XXXX   XXXXXXXX`,
        `XXXXXXX    XXX  XXXXXXX XXXXXXXX`,
        `XXXXXX   SXXXXX XXXXXXXOXXXXXXXX`,
        `XXXXX   XXXXXXXXXXXX a   @XXXXX|`,
        `  |    XXXX  SXXXXXX  @   XXXXX `,
        `      X Xs  XXXXXXXX    @ XXXX  `,
        `XXXXXXXX| SXXXXXXXXX      XXX  X`,
        `XXXXXXX sXXXXXXXXXXX@     XXX XX`,
        `XXXXXX XXXXX     XXXXXOXXXXX  dX`,
        `XXXXXXXXX     XX  XX   XXXXX| XX`,
        `XXBBBBBXX XXXXXXX    X XXXX   XX`,
        `XXB   BX  XXXXXXXXXXXXXX S  DXXX`,
        `XXB e L  XXXXXXXXXXXXXX  XXXXXXX`,
        `XXB   BXXXXXXXXXXdXX     DXXXXX `,
        `XXBBBBBXXXXXXXXXX    XdSXXXXXXX `,
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
        "s": WildOnionSprout,
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