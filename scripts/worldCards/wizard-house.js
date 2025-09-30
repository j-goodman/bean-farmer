import { WorldCard } from '../worldCard.js';
import { Rock } from '../rock.js';
import { Player } from '../player.js';
import { Wizard } from '../wizard.js';
import { StoneWall } from '../stoneWall.js';
import { Bookshelf } from '../bookshelf.js';
import { Crate } from '../crate.js';
import { HeartFlower } from '../heartFlower.js';
import { Hatchet } from '../hatchet.js';
import { Firepot } from '../firepot.js';
import { GemStand } from '../gemStand.js';
import { WoolyPig } from '../woolyPig.js';
import { Bomb } from '../bomb.js';
import { Key } from '../key.js';
import { Grass } from '../grass/grass.js';
import { DragonFlower } from '../dragonFlower.js';
import { Tree } from '../tree.js';
import { WoodFloor } from '../woodFloor.js';
import { TradeRug } from '../tradeRug.js';
import { WildOnionSprout } from '../wildOnion/wildOnionSprout.js';
import { MapTable } from '../mapTable.js';
import { IslandMap } from '../island-map.js';
import { PointsGem } from '../pointsGem.js';

let wizardHouse = new WorldCard (
    [
        `    XXXXXXXX 8b8*               `,
        `  XXXXXXXXXXX8 8      G         `,
        ` XXXXXXXXXX  8 8         G      `,
        ` XXXXXXX  8888 8                `,
        ` XXXXX    8    8                `,
        `XXXXX     8 8888                `,
        `XXXX    * 8 8    8  |  *        `,
        `XXXX     88 8888888             `,
        ` XXX  |  8!     HH8 ??          `,
        `  XX     8_ W     8  ?          `,
        `        |8     # H8             `,
        `*   X    8U      U8            *`,
        `*        8888888 88 o o ,      *`,
        `     X   .8 8..8 8.    ,,,      `,
        `                    o o ,,,     `,
        ` X                       ,,,    `,
        `       ,,  |             ,,,    `,
        `     G ,,,,,           *,,,     `,
        `  G     ,,,,,,       ,,,,,,,,   `,
        `         ,,,,,,    ,,,,,,,,,,|, `,
        `           ,,,,,,,,,,,G,,D,,,,,,`,
        `             ,,,,,,,,,,,,,,G,,,,`,
        `             ,,,,,,|,,,,,,,,,   `,
        `               **,,,,,,,,,,     `,
    ],
    {
        "X": Rock,
        "8": StoneWall,
        "1": PointsGem,
        ".": HeartFlower,
        "_": TradeRug,
        "H": Bookshelf,
        "G": WoolyPig,
        "D": DragonFlower,
        "o": WildOnionSprout,
        "U": Firepot,
        "?": Crate,
        "W": Wizard,
        "O": Wizard,
        "P": Player,
        "h": Hatchet,
        "b": Bomb,
        "!": GemStand,
        "k": Key,
        ",": Grass,
        "|": Tree,
        "#": MapTable,
    }
)

wizardHouse.writeSigns([
    "A disorganized collection of old tapes.",
    "A shelf of books about ancient symbols.",
    "A shelf of books about birds.",
])

wizardHouse.setVariants("firepot", [
    "blue", "blue"
])

wizardHouse.setVariants("trade rug", [
    "wizard"
])

wizardHouse.setVariants("bomb", [
    "detonate"
])

wizardHouse.floor = WoodFloor
wizardHouse.floorBounds = [{x: 18, y: 6}, {x: 23, y: 11}]

wizardHouse.noRotate = true

export { wizardHouse }