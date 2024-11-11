import { WorldCard } from '../worldCard.js';
import { Rock } from '../rock.js';
import { Player } from '../player.js';
import { MeteorOre } from '../meteorOre.js';
import { SmallMeteorOre } from '../smallMeteorOre.js';
import { Bomb } from '../bomb.js';
import { Hatchet } from '../hatchet.js';
import { BlueEye } from '../blueEye.js';
import { PowderBomb } from '../powderBomb.js';
import { WildCorn } from '../wildCorn.js';
import { Sign } from '../sign.js';

let crater = new WorldCard (
    [
        `    X          **         m     `,
        `   X   X            m       X   `,
        `  XXX    X      X    m        X `,
        `X XXXXXXXXXX  XX  M         X   `,
        `   XXXXXXXXXXXX    T M  XX     X`,
        `  X XXXXXXXX     m        X     `,
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
        `   XXXXXXXMX XXXXXXXXXXXX       `,
        ` X  XXX XXX X XXXXXXXXXXXX  m   `,
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
        "c": WildCorn,
        "p": PowderBomb,
        "h": Hatchet,
        "T": Sign,
    }
)

crater.setVariants("sign", ["stone"])

crater.writeSigns([
    "The danger is still present in your time as it was in ours.",
])

export { crater }