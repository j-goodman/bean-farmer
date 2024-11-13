import { WorldCard } from '../worldCard.js';
import { Rock } from '../rock.js';
import { Player } from '../player.js';
import { Stump } from '../stump.js';
import { Grass } from '../grass/grass.js';
import { DragonFlower } from '../dragonFlower.js';
import { WoolyPig } from '../woolyPig.js';
import { WildOnionSprout } from '../wildOnion/wildOnionSprout.js';
import { DragonFlowerSeed } from '../dragonFlowerSeed.js';
import { SnowSnail } from '../snowSnail.js';
import { Bomb } from '../bomb.js';
import { Crate } from '../crate.js';
import { Key } from '../key.js';

let devilsCave = new WorldCard (
    [
        `  WXXXX XX XXX   XXXXXXXXXXXX   `,
        `oXXXX XX XXX   XXXXXXXXXXXXXXXX `,
        `XXXX    XXX   XXXX    XXXXXXXXXX`,
        `XXX   XXXX   XXX         XXXXXXX`,
        `XX   X XXX  XX    XX       XXXXX`,
        `XX   XXXX   X   XXXXXXX     XXXX`,
        `XX  XXXXX  X   XXXXXXXXX     XXX`,
        `XX  XXXXX    XXX^XbXXXXXX   @ ^X`,
        `XXX XXXX    XXX    oXXXXXX    XX`,
        `XXX  XXX   XXX    o   XXXXX    X`,
        `  XX XXX   XX??bbXXX  oXXXX    X`,
        `   XX X^ @ XXbbbXXkXX   XXXX    `,
        `    XX X    X???Xb XX   XXXX  X `,
        `X    XXXX   XXb b?XXX   XXXX  XX`,
        `XX    XXX    XXXXXX^o  XXXX   XX`,
        `XXX    XXX^   XXX     XXXX   XXX`,
        `XXXX     XX    s    XXX     XXX X`,
        `XXXXXX    XXXX  XXXbX     XXX  X`,
        `XXXXXXX      XXXXXXX    XXX    X`,
        `XXXX  XXXX            XXX     XX`,
        `XXX      XXXXXXX   XXXX      XX `,
        ` XXX           XXXXX    X    XXo`,
        ` XXXXX    XX         XXX   XXXX `,
        `   XXXXXXXXXXXX  XXXXXXXXXXXXXW `,
    ],
    {
        "X": Rock,
        "b": Bomb,
        "?": Crate,
        "W": WoolyPig,
        "@": SnowSnail,
        "d": DragonFlowerSeed,
        "k": Key,
        " ": Grass,
        "o": WildOnionSprout,
        "W": WoolyPig,
        "^": DragonFlower,
        "S": Stump,
        "P": Player,
    }
)

export { devilsCave }