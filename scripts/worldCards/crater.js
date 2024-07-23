import { WorldCard } from '../worldCard.js';
import { Rock } from '../rock.js';
import { Player } from '../player.js';
import { MeteorOre } from '../meteorOre.js';
import { SmallMeteorOre } from '../smallMeteorOre.js';
import { Bomb } from '../bomb.js';
import { Hatchet } from '../hatchet.js';
import { BlueEye } from '../blueEye.js';
import { PowderBomb } from '../powderBomb.js';

let crater = new WorldCard (
    [
        `    X          **         m     `,
        `   X   X            m       X   `,
        `  XXX    X      X    m        X `,
        `X XXXXXXXXXX  XX   M        X   `,
        `   XXXXXXXXXXXX      M  XX     X`,
        `  X XXXXXXXX      m       X     `,
        `     XXXXX           m *   X X  `,
        `X    XXXX           m      XXXX `,
        `    XXXX                    XXX `,
        `  X XXX          m   m      XXX `,
        `   XXXX        m            XX  `,
        `*  XXX            m         XX *`,
        `*  XXX                     XXX *`,
        `  XXXX       m   0  m       XX  `,
        `    XX                     XXXX `,
        `   XXXm         M         X XX  `,
        `  XXXXX    M     M        XXXXX `,
        `X XXXXX * m  M       m * XXXXXXX`,
        `  XXXXXXX     m        XMXX  mXX`,
        ` X XXXXXXXX         XXXXXX m    `,
        `   XXXXXXXMX XXXXXXXXXXXXX      `,
        ` X  XXX XXX X XXXXXXXXXXXXX m   `,
        ` XX XXMX    XXXXXXXXXXXXXXX     `,
        `  X     m      **XXXXXXXXXXX    `,
    ],
    {
        "X": Rock,
        "P": Player,
        "M": MeteorOre,
        "0": BlueEye,
        "m": SmallMeteorOre,
        "b": Bomb,
        "p": PowderBomb,
        "h": Hatchet,
    }
)

export { crater }