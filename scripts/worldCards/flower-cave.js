import { WorldCard } from '../worldCard.js';
import { Rock } from '../rock.js';
import { Ore } from '../ore.js';
import { Emerald } from '../emerald.js';
import { DragonFlower } from '../dragonFlower.js';
import { WoolyPig } from '../woolyPig.js';
import { WildOnionSprout } from '../wildOnion/wildOnionSprout.js';
import { Boulder } from '../boulder.js';
import { Player } from '../player.js';
import { Grass } from '../grass/grass.js';

let flowerCave = new WorldCard (
    [
        `        XXXXX XXXDXXXXXs        `,
        `         XXXX  XX XXX           `,
        `           XX       XXX         `,
        `     X      XXXXX      X        `,
        `           XX   B      XX W     `,
        `      X     XX X XXXXXXXX  B    `,
        `    g   * XXXX X XXX  XX  X     `,
        `            XX X  B g ggX   WBXX`,
        ` g      XX    XX s  XX gg X   X `,
        `g X  XXXX XXXO        XXXB   XX `,
        `  g OX   g    g g        XXXX   `,
        ` gggg g   g g  g    g           `,
        `   ggg   g g       ggg          `,
        ` g WXXX XX XO     g  XgXXXX     `,
        `gXXX  XXXO B  g g    XXB XXX    `,
        ` X       XO XXXg g    DXX    a   `,
        ` X       XX  X Xg XXXXX    X    `,
        `XX      *  XXX  XX     * XXXXXXX`,
        `DX         XXX  XX         XXX  `,
        ` XX               X             `,
        `XXXXD                           `,
        `XXDXXX                     XX   `,
        `   X XD X  X XXXXX  XX  XX XO   `,
        `DXXXX   XXXXXX   XXX XXXXXX     `,
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
        "g": Grass,
    }
)

export { flowerCave }