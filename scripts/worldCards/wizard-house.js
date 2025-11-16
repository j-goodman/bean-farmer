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
import { PointsGem } from '../pointsGem.js';
import { SoilCleaner } from '../soilCleaner.js';
import { Birchpod } from '../birchpod.js';
import { Ore } from '../ore.js';
import { Chicken } from '../chicken.js';
import { BulletinBoard } from '../bulletinBoard.js';
import { LowChair } from '../lowChair.js';
import { PotTable } from '../potTable.js';

let wizardHouse = new WorldCard (
    [
        `    XXXXXXXX  b , ,, ,          `,
        `  XXX%X %XXXX ,, , ,  G  ,      `,
        ` XX|XX%XX%X  % ,, , ,    G      `,
        ` X%XXXXX  8888  $ ,    ,        `,
        ` XXX%X    8     ,  , ,    ,     `,
        `XXXXX |   8 8888888,,,,         `,
        `XX%X    * 8 8?? e 8,-,,.*       `,
        `XXX%     88 888 8&8cc,,,,,,,,,,,`,
        ` XXX     8! [Z[   8c ?,,,,,,,|,,`,
        `  XX     8_ W     8  ?,,,,,,,,,,`,
        `         8$    #  8,,,,,,,,,,,,,`,
        `*   X    8U      U8,,,|,,      *`,
        `*        8888888 88,,          *`,
        `     X    8 8..8$s8             `,
        `                        ,,,   | `,
        ` X                       ,,,    `,
        `        -                ,,,    `,
        `     G     |           *,,,     `,
        `  G     ,,,          ,,,,,,,,.  `,
        `         ,,,,,,    ,,,,,,,,,,,, `,
        `          .,,,,,,,,,,,G,,D,,,,,,`,
        `            .,,,,,,,,,,,,,,G,,,,`,
        `     |       ,,,,,,,,,,,,,,,    `,
        `              *.,,,,, ,. ,      `,
    ],
    {
        "X": Rock,
        "8": StoneWall,
        "1": PointsGem,
        ".": HeartFlower,
        "_": TradeRug,
        "G": WoolyPig,
        "D": DragonFlower,
        // "o": WildOnionSprout,
        "$": SoilCleaner,
        "U": Firepot,
        "?": Crate,
        "c": Chicken,
        "W": Wizard,
        "O": Wizard,
        "P": Player,
        "h": Hatchet,
        "b": Bomb,
        "!": GemStand,
        "k": Key,
        ",": Grass,
        "|": Tree,
        "-": Birchpod,
        "#": MapTable,
        "&": BulletinBoard,
        "%": Ore,
        "[": LowChair,
        "Z": PotTable,
    }
)

wizardHouse.setVariants("firepot", [
    "blue", "blue"
])

wizardHouse.setVariants("trade rug", [
    "wizard"
])

wizardHouse.setVariants("tree", [
    "birch", "birch", "birch", "birch", "birch", "birch",
    "birch", "birch", "birch", "birch", "birch", "birch",
    "birch", "birch", "birch", "birch", "birch", "birch"
])

wizardHouse.setVariants("bomb", [
    "detonate"
])

wizardHouse.floor = WoodFloor
wizardHouse.floorBounds = [{x: 18, y: 6}, {x: 23, y: 11}]

wizardHouse.rotateOnlyVertically = true

export { wizardHouse }