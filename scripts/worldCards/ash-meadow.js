import { WorldCard } from '../worldCard.js';
import { Rock } from '../rock.js';
import { Player } from '../player.js';
import { Mushroom } from '../mushroom.js';
import { DragonFlower } from '../dragonFlower.js';
import { WoolyPig } from '../woolyPig.js';
import { Grass } from '../grass/grass.js';
import { WildOnionSprout } from '../wildOnion/wildOnionSprout.js';
import { Key } from '../key.js';
import { DragonFlowerSeed } from '../dragonFlowerSeed.js';

let ashMeadow = new WorldCard (
    [
    `    g    XXXXXXXXXXXX  XX       `,
    `    ggmXXXXXXXXXXXXXXXX XXX    s`,
    `   ggmXXXXDXdXXXXX  XXXXXXXg    `,
    `   ggmXXXXXD!DXXX      ggXXXg   `,
    `  ggXXXXXXdXDXDXg   g g ggXXXX  `,
    `  gXXXXXXXDXXdgggg  gg g  gXXXX `,
    ` ggXXXXX*ggggg  ggggggg* g  XXX `,
    `  ggXX g ggggggggg gWXggg  gXXX `,
    `  XXXX g gWg gXgggXXXX ggg  XXX `,
    `   XX g gggg    ggX DXX gg g XXX`,
    ` XXXXXg gggX XX W    X  ggg gXXX`,
    `XXXXXX gggggXXD       Xgg  g XXX`,
    `  XXXXXXgggg XX    DXX ggg g g XX`,
    ` XXDgXXXgggg XXggXXg gggg   XXXX`,
    `g XXgXXXXg Wggggg g  gggggWXXXX `,
    `ggggggXXXgg ggggggg ggggg  gXXXX`,
    `gXXXXDXXXggggggWgg ggggg ggXXXX `,
    `gggXXXXXXX gggggg gggWgg gggXXX `,
    ` g XXXXsXXX ggggggg ggg gggmXXX `,
    `ggggmgX XXX Wgggggggggg g  XXXX  `,
    ` gg gggXXXXXXggggg gm    gggXXX `,
    `  ggg  g sgXXXXXgXXXX  mggggXXXX `,
    `    gggg  XXXXXXXXXXXXXX  XXXX   `,
    `       g g   XXXXX  gXXXXXXX   s`,
    ],
    {
        "X": Rock,
        "P": Player,
        "D": DragonFlower,
        "d": DragonFlowerSeed,
        "W": WoolyPig,
        "!": Key,
        "s": WildOnionSprout,
        "m": Mushroom,
        "g": Grass,
    }
)

export { ashMeadow }