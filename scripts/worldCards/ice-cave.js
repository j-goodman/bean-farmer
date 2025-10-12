import { WorldCard } from '../worldCard.js';
import { Rock } from '../rock.js';
import { Boulder } from '../boulder.js';
import { IceSheet } from '../iceSheet.js';
import { SnowSnail } from '../snowSnail.js';
import { Sapphire } from '../sapphire.js';
import { Ore } from '../ore.js';
import { Player } from '../player.js';
import { Bomb } from '../bomb.js';
import { SmokyQuartz } from '../smokyQuartz.js';
import { Key } from '../key.js';
import { Crate } from '../crate.js';
import { Hatchet } from '../hatchet.js';
import { WoolyPig } from '../woolyPig.js';


let iceCave = new WorldCard (
    [
    `  XXXX     XXX  W               `,
    `XXXXXXX  XXXX X  XXX       XXXX `,
    `XXXXX XXXXXX   XXXXXX   XXXXXXXX`,
    `   XXXXXXXX    XXXXXXXXXXXXXXX  `,
    ` ??? XXXXX    XXXXXXXXX         `,
    `???? XXXX    XXXXXXXX       X   `,
    `???  XXXX    XXXXXXXW  *XX      `,
    `    XXXXX         XXXXXXXXXX    `,
    `    XXXXX            XXXXXXXX   `,
    `     XXXX             $$XX@XXX  `,
    `B    XXXXXX           X$!$ X$X  `,
    `   XXXXXSXXX          $$X   !$X `,
    ` XXX$X$$X$X$X          XX$ $$$X `,
    ` XX$$$$$$$$@   X       XXX X !XX`,
    `  XX$$X$X$X$XX                $X`,
    `   XXX$X$XXX@          XXX   $XX`,
    `       $XXXXXXX        XXX$ kX$X`,
    `  X   $XXXXXXXXXXXXXXX  XXX$X$XX`,
    `     B      XXXXXXXXXXX  XXX$   `,
    `                    XXXX XXX  X `,
    `                     XX B   X  W`,
    `        B                       `,
    `                            B   `,
    `                                `,
    ],
    {
        "X": Rock,
        "B": Boulder,
        "i": IceSheet,
        "@": SnowSnail,
        "?": Crate,
        "!": SmokyQuartz,
        "k": Key,
        "b": Bomb,
        "$": Ore,
        "P": Player,
        "h": Hatchet,
        "W": WoolyPig,
    }
)

export { iceCave }