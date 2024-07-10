import { WorldCard } from '../worldCard.js';
import { Rock } from '../rock.js';
import { Brick } from '../brick.js';
import { Player } from '../player.js';
import { Key } from '../key.js';
import { Grass } from '../grass/grass.js';
import { DragonFlower } from '../dragonFlower.js';
import { Firepot } from '../firepot.js';
import { Bomb } from '../bomb.js';
import { RockGolem } from '../rockGolem.js';
import { SnowSnail } from '../snowSnail.js';
import { SnailEgg } from '../snailEgg.js';
import { ExtraHeart } from '../extraHeart.js';
import { Hatchet } from '../hatchet.js';
import { WoolyPig } from '../woolyPig.js';
import { WildOnionSprout } from '../wildOnion/wildOnionSprout.js';

let redMaze = new WorldCard (
    [
        `       ggggggg    gg            `,
        ` RRRRRRRRRRRRRRRRRRRRRRXXXXXXXXX`,
        `gRR   RX               XgWggw gX`,
        ` RR X  X RRRRRRRRRRRRR XWw ggg X`,
        ` RR XX X         R   R wgg wgWgX`,
        ` RX XX XXXXXXXXX R X XXXXXXXXX!X`,
        ` RX X              X X       X R`,
        ` RR XXXXXXXXXXXXXXXX X XXXXX X R`,
        ` RR RX             X X X   X X R`,
        ` XR RX XXXXXXXXXXX X X X X X X R`,
        ` XXXXX X         X X X X X X X R`,
        `       X XXXXXXXXX   X X X X X R`,
        `*XXXXX X      @XXXXXXX X X X X R`,
        ` X   X XXXXXXo X     X!X X X X R`,
        ` X X X      X  X      !X X X X R`,
        `gX X XXXXXX X  X  k  X!X X   X R`,
        ` X X      X X oX     X X XX XX R`,
        `gX XXXXXX X X  XXXXXXX X  X X  R`,
        `gX          X          XX X XX R`,
        `gX XXXXXXXXXXXXXXXXXXX    X  X R`,
        `gX        X          XX@@@XX   R`,
        `gX RRRRRRRR XXXXXXRR XXXXXXX RRR`,
        `gX          X      R           R`,
        ` XXXXXXXXXXXXX    RRRRRRRRRRRRRR`,
    ],
    {
        "R": Rock,
        "k": Key,
        "g": Grass,
        "b": Bomb,
        "D": DragonFlower,
        "W": WoolyPig,
        "e": ExtraHeart,
        "h": Hatchet,
        "!": RockGolem,
        "B": Firepot,
        "@": SnowSnail,
        "o": SnailEgg,
        "w": WildOnionSprout,
        "X": Brick,
        "P": Player,
    }
)

export { redMaze }