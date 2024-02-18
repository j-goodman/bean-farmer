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

let oreClusters = new WorldCard (
    [
        `                 g     ggggg    `,
        `  BWB                 g ggggg   `,
        `               g   g gg  gg     `,
        `          BWB    ggg g g  gg    `,
        `                 gXD  XXXg      `,
        `           X      XX X   g      `,
        `        *  X      XX X *      g `,
        `                         XX  g  `,
        `                       OOOX     `,
        `g      XX             OOOXX     `,
        `                       XXX      `,
        `       XXXX                   XX`,
        `      DXXOXX                  OX`,
        `      XOOXX            XX    OOD`,
        `      XXX                     XX`,
        `                    g XXX       `,
        `          X            XXX      `,
        `        *XXXX      g   *        `,
        `         XXXX     g             `,
        `          DXX                   `,
        `   g                            `,
        `    g                           `,
        `                      BWB       `,
        `              g                 `,
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

export { oreClusters }