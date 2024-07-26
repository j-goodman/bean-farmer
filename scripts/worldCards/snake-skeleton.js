import { WorldCard } from '../worldCard.js';
import { Rock } from '../rock.js';
import { Player } from '../player.js';
import { MeteorOre } from '../meteorOre.js';
import { SmallMeteorOre } from '../smallMeteorOre.js';
import { Bomb } from '../bomb.js';
import { Hatchet } from '../hatchet.js';
import { BlueEye } from '../blueEye.js';
import { LeftRib } from '../leftRib.js';
import { RightRib } from '../rightRib.js';
import { Grass } from '../grass/grass.js';
import { SoilCleaner } from '../soilCleaner.js';
import { DragonFlower } from '../dragonFlower.js';
import { SnowSnail } from '../snowSnail.js';
import { WildOnionSprout } from '../wildOnion/wildOnionSprout.js';
import { DragonFlowerSeed } from '../dragonFlowerSeed.js';

let snakeSkeleton = new WorldCard (
    [
        `C              **   X           `,
        `                    X           `,
        `                    XX          `,
        `                     XXX   XX   `,
        `                      XXXX XXX  `,
        `         X             XXX XXXX `,
        `        X             XXXX  XXX `,
        `                     XXXXXX XX  `,
        `           X      XXXXXXX@  XXX `,
        `     X    X       XX0XXXX @ XXXX`,
        `  )      XX0  X    XXXXXXX  XX  `,
        `(     )   XX         XXXXXXXX   `,
        `    (                  (XXXXX   `,
        `         )              ) XXXX  `,
        ` XXX   (            (      X )  `,
        `XXX          )  (     )    ( X  `,
        `X           (     )             `,
        `  X..dXsX              X    (   `,
        ` XdX..........                ) `,
        `   XD..@.......                  `,
        ` ............             (  )  `,
        `  C........s                    `,
        `.........                      ) `,
        `   .s...       **            (  `,
    ],
    {
        "X": Rock,
        "P": Player,
        "M": MeteorOre,
        "C": SoilCleaner,
        "D": DragonFlower,
        "d": DragonFlowerSeed,
        "@": SnowSnail,
        "(": LeftRib,
        ")": RightRib,
        "0": BlueEye,
        ".": Grass,
        "s": WildOnionSprout,
        "m": SmallMeteorOre,
        "b": Bomb,
        "h": Hatchet,
    }
)

snakeSkeleton.noRotate = true

export { snakeSkeleton }