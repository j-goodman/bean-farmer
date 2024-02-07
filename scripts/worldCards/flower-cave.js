import { WorldCard } from '../worldCard.js';
import { Rock } from '../rock.js';
import { Ore } from '../ore.js';
import { Emerald } from '../emerald.js';
import { DragonFlower } from '../dragonFlower.js';
import { WoolyPig } from '../woolyPig.js';
import { WildOnionSprout } from '../wildOnion/wildOnionSprout.js';
import { Boulder } from '../boulder.js';
import { Player } from '../player.js';

let flowerCave = new WorldCard (
    [
        `        XXXXX XXXDXXXXXs        `,
        `         XXXX  XX XXX           `,
        `           XX       XXX         `,
        `     X      XXXXX      X        `,
        `           XX   B      XX W     `,
        `      X     XX X XXXXXXXX  B    `,
        `        * XXXX X XXX  XX  X     `,
        `            XX X  B     X   WBXX`,
        `        XX    XX s  XX s  X   X `,
        `  X  XXXX XXXO        XXXB   XX `,
        `    OX                   XXXX   `,
        `                                `,
        `                                `,
        `   WXXX XX XO        X XXXX     `,
        ` XXX  XXXO B         XXB XXX    `,
        ` X       XO XXX       DXX    a   `,
        ` X       XX  X Xs XXXXX    X    `,
        `XX      *  XXX  XX     * XXXXXXX`,
        `DX         XXX  XX         XXX  `,
        ` X                X             `,
        ` XXXD                           `,
        ` XDXXX                     XX   `,
        `   X XD X  X XXXXX  XX  XX XO   `,
        `DXXX    XXXXXX   XXX XXXXXX     `,
    ],
    {
        "X": Rock,
        "B": Boulder,
        "W": WoolyPig,
        "O": Ore,
        "D": DragonFlower,
        "s": WildOnionSprout,
        "P": Player,
        "e": Emerald,
    }
)

export { flowerCave }