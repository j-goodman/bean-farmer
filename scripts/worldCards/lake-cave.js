import { WorldCard } from '../worldCard.js';
import { Rock } from '../rock.js';
import { Player } from '../player.js';
import { Ocean } from '../ocean.js';
import { Key } from '../key.js';
import { Grass } from '../grass/grass.js';
import { WildOnionSprout } from '../wildOnion/wildOnionSprout.js';
import { Stump } from '../stump.js';
import { PigLily } from '../pigLily.js';
import { Brick } from '../brick.js';
import { ExtraHeart } from '../extraHeart.js';
import { Lockbox } from '../lockbox.js';
import { DragonFlowerSeed } from '../dragonFlowerSeed.js';

let lakeCave = new WorldCard (
    [
        `   XXXXXXXXXXXX**XXXXXXXXXXXXXX `,
        ` XXXXXXXXXXXXX   XXXXXXXXXXXXXXX`,
        `XXXXXXXXXXX     XXXXXXXXXXXXXXXX`,
        `XXXXXXXXX      XXXXXXXXXXXXXXXXX`,
        `XXXXXXX     XXXXXXXXXXXXXXXXXXXX`,
        `XXXXX      XXXXXXXXXXXXXXXXXXXXX`,
        `XXXX   XXS  XXSXXXXXXXXXXXXXXXXX`,
        `XXXw   XXX S         XXXXXXXXXXX`,
        `XX   XXXXXX ,         XXXXXXXXXX`,
        `X   XXXXXX    OOOOO,      XXXXXX`,
        `   XXXXXX    OOOOOOO.l        XX`,
        `  XXXXXXX   OOOOOOOO   X        `,
        ` XXXXXXXX   OOOkOOOO ..XXXXX    `,
        `XXXXXXXXX l OOOOOOOa.. XXXXXXXXX`,
        `XXXXXXXXX  , OOOOO.....XXXXXXXXX`,
        `XXXXXXXXXX   ..  ..S..XSXXXXXXXX`,
        `XXXXXBBBXXXX   ..... XXXXXXXXXXX`,
        `XXXXBB BBXXXXXXXXX   XXXXXSXXXXX`,
        `XXXXB e BXXXXXXXX    XXXXXXXXXXX`,
        `XXXXBBLBBXXXXXXXX   XXXXXXXXXXXX`,
        `XXXXXBdBXXXXXXXX   XX XXXXXXXXXX`,
        `XXXXXX XXXXXXXX   XXXXXXXXXXXXXX`,
        `XXXXXX XXXXXXXX   XXXXXXXXXXXXXX`,
        `       XXXXXXX   XXXXXXXXXXXXX  `,
    ],
    {
        "X": Rock,
        "B": Brick,
        "d": DragonFlowerSeed,
        "e": ExtraHeart,
        "L": Lockbox,
        "S": Stump,
        ".": Grass,
        ",": WildOnionSprout,
        "l": PigLily,
        "O": Ocean,
    }
)

export { lakeCave }