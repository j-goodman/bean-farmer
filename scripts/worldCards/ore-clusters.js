import { WorldCard } from '../worldCard.js';
import { Rock } from '../rock.js';
import { Ore } from '../ore.js';
import { Emerald } from '../emerald.js';
import { DragonFlower } from '../dragonFlower.js';
import { Firepot } from '../firepot.js';
import { Brick } from '../brick.js';
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
        `           X      XX X X g      `,
        `        *  X      XX X *X     g `,
        `                  K      XX  g  `,
        `                  K K  OOOX     `,
        `g      XX         K K OOOXX     `,
        `               K KK K  XXX      `,
        `       XXXX       FFFF  X     XX`,
        `      DXXOXX     KKKK K  X    OX`,
        `      XOOXX         K   X    OOD`,
        `      XXX            X  X     XX`,
        `                    g XXX       `,
        `          X            XXX      `,
        `        *XXXX      g   * XX     `,
        `         XXXX     g       XX    `,
        `          DXX             XX    `,
        `   g                       XX   `,
        `    g                       X   `,
        `                      BWB    X  `,
        `              g                 `,
        ],
    {
        "X": Rock,
        "B": Boulder,
        "K": Brick,
        "F": Firepot,
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