import { WorldCard } from '../worldCard.js';
import { Rock } from '../rock.js';
import { Boulder } from '../boulder.js';
import { IceSheet } from '../iceSheet.js';
import { SnowSnail } from '../snowSnail.js';
import { Sapphire } from '../sapphire.js';
import { Ore } from '../ore.js';
import { Player } from '../player.js';
import { Bomb } from '../bomb.js';


let iceCave = new WorldCard (
    [
    `XXXXXXXXXXXXXX  W XXXXXXXXXXXXXX`,
    `XXXXXXXXXXXXX X  XXXXXXXXXXXXXXX`,
    `XXXXXXXXXXXX   XXXXXXXXXXXXXXXXX`,
    `   XXXXXXXX    XXXXXXXXXXXXXX   `,
    `     XXXXX    XXXXXXXXX         `,
    `     XXXX    XXXXXXXX           `,
    `     XXXX    XXXXXXX   *XXXX    `,
    `    XXXXX        @XXXXXXXXXXXX  `,
    `    XXXXX            XXXXXXXXXX `,
    `     XXXX             $$XX XXXX `,
    `B    XXXXXX    @      X$$$ X$XX `,
    `   XXXXXSXXX          $$XX  s$XX`,
    ` XXX$X$$X$X$X          XX$ $$$XX`,
    ` XX$$$$$$$$    X       XXX X  XX`,
    `  XX$$X$X$X$XX                $X`,
    `   XXX$X$XXX         @ XXX   $XX`,
    `      @$XXXXXXX        XXX$  X$X`,
    `      $XXXXXXXXXXXXXXX  XXX$X$XX`,
    `     B  XXXXXXXXXXXXXXX  XXX$   `,
    `           XXXXXX   XXXX XXX     `,
    `                     XX B      W`,
    `        B                       `,
    `  XXXXXXXXXXXXXXX           B  X`,
    `XXXXXXXXXXXXXXXXXXXXXX       XXX`,
    ],
    {
        "X": Rock,
        "B": Boulder,
        "i": IceSheet,
        "@": SnowSnail,
        "s": Sapphire,
        "b": Bomb,
        "$": Ore,
        "P": Player,
    }
)

export { iceCave }