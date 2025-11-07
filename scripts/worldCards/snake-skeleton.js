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
import { ExtraHeart } from '../extraHeart.js';
import { PowderBomb } from '../powderBomb.js';
import { HeartFlower } from '../heartFlower.js';

let snakeSkeleton = new WorldCard (
    [
        `C**C*      p  p**p pXDp@p p    p`,
        `**C*                X      @  p `,
        ` *   *           @  XX @ @     p`,
        `                @    XXX   XX@  `,
        `                   @  XXXX XXX  `,
        `         X       @     XXX XXXX `,
        `        X           @ XXXX  XXX `,
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
        `   XD..@.......                 `,
        ` ............             (  )  `,
        `   ........s                    `,
        `.........                      )`,
        `   .s...       **            (  `,
    ],
    {
        "X": Rock,
        "P": Player,
        "M": MeteorOre,
        "p": PowderBomb,
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
        "+": ExtraHeart,
        "*": HeartFlower,
    }
)

snakeSkeleton.noRotate = true
snakeSkeleton.setVariants("blue eye", ["red"])

export { snakeSkeleton }