import { WorldCard } from '../worldCard.js';
import { Rock } from '../rock.js';
import { Player } from '../player.js';
import { DragonFlower } from '../dragonFlower.js';
import { WoolyPig } from '../woolyPig.js';
import { Grass } from '../grass/grass.js';
import { WildOnionSprout } from '../wildOnion/wildOnionSprout.js';

let ashMeadow = new WorldCard (
    [
    `    g            XXXX  XX       `,
    `    ggg  XXXXXXXXXXXXXX XXX     `,
    `   ggggXXXXXXXXXsX  XXXXXXXg    `,
    `   gggXXXXXXXX  g    s ggXXXg   `,
    `  ggXXXXg gs   gg   g g ggXXXX  `,
    `  gXXXgg g ggggggg  gg g  gXXXX `,
    ` ggXXX g*gggggg ggggggg* g sXXX `,
    `  ggXXsg ggggggggg gWXggg  gXXX `,
    `  XXXX g gWg gXgggXXXX ggg  XXX `,
    `   XX g gggg    ggX DXX gg g XXX`,
    ` XXXXXg gggX XX W    X  ggg gXXX`,
    `XXXXXX gggggXXD       Xgg  g XXX`,
    ` sXXXXXXgggg XX    DXX ggg g g XX`,
    ` XXDgXXXgggg XXggXXg gggg   XXXX`,
    `g XXgXXXXg Wggggg g  gggggWXXXX `,
    `ggggggXXXgg ggggggg ggggg sgXXXX`,
    `gXXXXDXXXggggggWgg ggggg ggXXXX `,
    `gggXXXXXXX gggggg gggWgg gggXXX `,
    ` g XXXXXXXX ggggggg ggg ggggXXX `,
    `ggggggXsXXXsWgggggggggg g  XXXX  `,
    ` gg gggXXXXXXggggg gg    gggXXX `,
    `  ggg  g sgXXXXXgXXXX  sggggXXXX `,
    `    gggg  XXXXXXXXXXXXXX  XXXX   `,
    `       g g   XXXXX  gXXXXXXX    `,
    ],
    {
        "X": Rock,
        "P": Player,
        "D": DragonFlower,
        "W": WoolyPig,
        "s": WildOnionSprout,
        "g": Grass,
    }
)

export { ashMeadow }