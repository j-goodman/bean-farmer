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
        `X X XXXX      XX  M         X   `,
        `   XXXX     XXX    T M  XX     X`,
        `  X      XX  X   m      X X     `,
        `      XX X    X      m *   X X  `,
        `X    X  X  X        m   X  XXXX `,
        `    XXXX                X X  X  `,
        `  X X X          m   m   X  X X `,
        ` X XXXX X      m           XXX  `,
        `*  XX             m         XX *`,
        `*  X X X                   XXX *`,
        `  XXXXX  X   m   0  m       XX  `,
        `    XX                  X  XXXX `,
        ` X XXXm X       M      X  X XX  `,
        `  XXXXXX  XM     M        XX XX `,
        `X X XXX * m  M       m * XXXXX X`,
        `  XXXX XX  X  m        XMXX  mXX`,
        ` X XXXXXXXX     X   XXX XX m    `,
        `   XXXXXXXMX XXXX XXXXXXX       `,
        ` X  XXX XXX X XXXXXXX XXXX  m   `,
        ` XX XXMX    XXXXXX XXXXX   XX   `,
        `  X     mXX    **XXX     XXXXX  `,
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