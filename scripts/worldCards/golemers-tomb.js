import { WorldCard } from '../worldCard.js';
import { Rock } from '../rock.js';
import { Player } from '../player.js';
import { Statue } from '../statue.js';
import { Brick } from '../brick.js';
import { Tomb } from '../tomb.js';
import { Bomb } from '../bomb.js';
import { StoneSlab } from '../stoneSlab.js';
import { CrystalLockbox } from '../crystalLockbox.js';
import { Firepot } from '../firepot.js';
import { Lockbox } from '../lockbox.js';
import { CrystalKey } from '../crystalKey.js';
import { Key } from '../key.js';
import { TombStatue } from '../tombStatue.js';
import { MagicCup } from '../magicCup.js';
import { RockGolem } from '../rockGolem.js';
import { Ore } from '../ore.js';
import { SnowSnail } from '../snowSnail.js';
import { DragonFlower } from '../dragonFlower.js';
import { DragonFlowerSeed } from '../dragonFlowerSeed.js';
import { SnailEgg } from '../snailEgg.js';
import { PowderBomb } from '../powderBomb.js';
import { WildOnionSprout } from '../wildOnion/wildOnionSprout.js';
import { WoolyPig } from '../woolyPig.js';
import { StoneWall } from '../stoneWall.js';
import { Hatchet } from '../hatchet.js';
import { Stump } from '../stump.js';
import { Grass } from '../grass/grass.js';
import { SoilCleaner } from '../soilCleaner.js';
import { DeathsHeadSeed } from '../deathsHeadSeed.js';
import { DeathsHead } from '../deathsHead.js';

let golemersTomb = new WorldCard (
    [
        `            BBBBBBBBB           `,
        ` BBBBBBBBBB B   B   B BBBBBBBBB `,
        ` B        BBB   ?   BBB       B `,
        ` B      @       B        d    B `,
        ` B        BBBBBBBBBBBBB       B `,
        ` B  d     B     B     B    @  B `,
        ` B      * B     B     B*      B `,
        ` B  BBBBBBB  BFBBBFB  BBBBBB  B `,
        ` B     d @B  BBBSBBB  B       B `,
        ` B        B  B     B  B       B `,
        ` BBBBBBB  B  B  T  B  B  BBBBBB `,
        `       B  B  B  Y  B  !  Bbbbp p`,
        `*      B  B  B     B  B  Bb W p*`,
        `*      B  B  B     B  B  Bbp  o*`,
        `       B* B  BBB!BBB  B* B   WXo`,
        `       B  B           B pB o   W`,
        `   U   B DBBBBBBBBBBBBBBBBppo p `,
        `    U  B   @ d@ BD0bb   bB     p`,
        `&   U& B @  @ d@!d pb b  B  p   `,
        `   UU  B& @d @ dB     bb B      `,
        `UUUU   BBBBBBBBBBBBB  BBBB      `,
        `U0 E   U          |    |        `,
        `UU&UUUU U U       |    |        `,
        `&UUUU  U&U     ** ||||||        `,
    ],
    {
        "X": Rock,
        "B": Brick,
        "b": Bomb,
        "W": WoolyPig,
        "O": Ore,
        "|": StoneWall,
        "o": WildOnionSprout,
        "S": Statue,
        "U": Stump,
        "@": SnailEgg,
        "0": SnowSnail,
        "E": DragonFlower,
        "D": DeathsHead,
        "d": DeathsHeadSeed,
        "P": Player,
        "h": Hatchet,
        "F": Firepot,
        "T": Tomb,
        " ": Grass,
        "&": SoilCleaner,
        "!": CrystalLockbox,
        "p": PowderBomb,
        "?": Lockbox,
        "$": TombStatue,
        "G": RockGolem,
        "c": CrystalKey,
        "k": Key,
        "Y": MagicCup,
    }
)

golemersTomb.setVariants("statue", ["golemer"])
golemersTomb.noRotate = true

golemersTomb.floor = StoneSlab
golemersTomb.floorBounds = [{x: 10, y: 4}, {x: 22, y: 16}]

const brickArray = []
for (let index = 0; index < 500; index++) {
    brickArray.push("dark")
}
golemersTomb.setVariants("brick", brickArray)
golemersTomb.lightFirepots()

game.setTimer(() => {
    golemersTomb.entities.forEach(entity => {
        if (entity.name === "tomb") {
            entity.text = "Herein is the golemer who killed the king of old and called down blue-eyed comets to ruin the land."
            entity.onBreak()
            entity.drop = false
        }
    })
}, 30)

export { golemersTomb }