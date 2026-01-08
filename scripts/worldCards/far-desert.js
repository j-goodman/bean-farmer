import { WorldCard } from '../worldCard.js';
import { Rock } from '../rock.js';
import { Boulder } from '../boulder.js';
import { WoolyPig } from '../woolyPig.js';
import { Cactus } from '../cactus.js';
import { Player } from '../player.js';
import { Hatchet } from '../hatchet.js';
import { Mushroom } from '../mushroom.js';
import { Grass } from '../grass/grass.js';
import { Bomb } from '../bomb.js';
import { Tree } from '../tree.js';
import { Ore } from '../ore.js';
import { Fire } from '../fire.js';
import { Pesoduro } from '../pesoduro.js';
import { StoneWall } from '../stoneWall.js';
import { Crate } from '../crate.js';
import { Dollar } from '../dollar.js';
import { RandomGem } from '../randomGem.js';
import { RazorWire } from '../razorWire.js';
import { Penny } from '../penny.js';
import { GasMine } from '../gasMine.js';
import { SoilSmoother } from '../soilSmoother.js';
import { SoilCleaner } from '../soilCleaner.js';

let farDesert = new WorldCard (
    [
    `   O      X       !.   $`,
    `X    x         , .. .$.!`,
    `        , OX    ...!... `,
    ` O     , OXX    !.....$.`,
    `  B   O X X     .. ..!..`,
    `HHHH             . . .. `,
    `HG   X              .   `,
    `H HHH       ..          `,
    ` .H..      .. ...HHHHHH `,
    ` . . ..    ... .. .  GH `,
    ` H. ..x.     .HHHHHHH H `,
    `,H   ... .  . Hg@**@H|H `,
    ` H ..  ..f. H H **@gH H `,
    ` H. .|.f.. fH.H*@g gH H `,
    ` H$H........H.Hgggg@H   `,
    ` H H....f.| ..HHHHHHH   `,
    ` x H$f......     B      `,
    `$  HHHHHHHHHHHHHHHH    x`,
    ],
    {
        "X": Rock,
        "B": Boulder,
        "f": Fire,
        "P": Player,
        "h": Hatchet,
        "m": Mushroom,
        "W": WoolyPig,
        "x": Cactus,
        ".": Grass,
        "|": Tree,
        "O": Ore,
        "*": Dollar,
        "@": Pesoduro,
        "H": RazorWire,
        "?": Crate,
        "g": RandomGem,
        ",": Penny,
        "G": GasMine,
        "$": SoilSmoother,
        "!": SoilCleaner,
    }
)

export { farDesert }