import { WorldCard } from '../worldCard.js';
import { Rock } from '../rock.js';
import { Brick } from '../brick.js';
import { Ore } from '../ore.js';
import { Bommaker } from '../bommaker.js';
import { TradeRug } from '../tradeRug.js';
import { Bomb } from '../bomb.js';
import { Emerald } from '../emerald.js';
import { Grass } from '../grass/grass.js';
import { Sign } from '../sign.js';
import { Stump } from '../stump.js';
import { Crate } from '../crate.js';
import { DragonFlower } from '../dragonFlower.js';
import { Crystallizer } from '../crystallizer.js';
import { WoolyPig } from '../woolyPig.js';
import { WildOnion } from '../wildOnion/wildOnion.js';
import { IceSheet } from '../iceSheet.js';
import { Firepot } from '../firepot.js';
import { Hatchet } from '../hatchet.js';
import { Mushroom } from '../mushroom.js';
import { WildOnionSprout } from '../wildOnion/wildOnionSprout.js';
import { Player } from '../player.js';
import { DragonFlowerSeed } from '../dragonFlowerSeed.js';
import { WildCornSeed } from '../wildCornSeed.js';
import { PowderBomb } from '../powderBomb.js';
import { MeteorCrystal } from '../meteorCrystal.js';
import { HeartFlower } from '../heartFlower.js';
import { DeathsHead } from '../deathsHead.js';
import { Boulder } from '../boulder.js';
import { Tree } from '../tree.js';
import { GasMine } from '../gasMine.js';
import { RockStatue } from '../rockStatue.js';
import { IslandMap } from '../islandMap.js';

let bommakerHouse = new WorldCard (
    [
        `,?RRRRRRRO      ??RRRRORRR RR? ,`,
        `bRRGRR7RRRO   k ??RRRRRROR RRR  `,
        `RRdRRO   ORR    RRRO       RRRR `,
        `    R  R       RRROR RdROR RRRR `,
        `RR  R RRORRORR       dddRR RRR? `,
        `bR  R RO7RRR   RR RRRRdRRR RRRb `,
        `?R  R     OR RROR     7ORR RRRR `,
        ` R  RORRO dR RXXRRRRRRORRR   RR `,
        ` RR  RR   OF Z XRXXXXXRRRRRR RR `,
        ` ORR RR RRT    XRX   XXRRRRR RR `,
        ` bOR O    F    XXX           RR `,
        `  R  ?ORRRX B        XXRR RRRRR `,
        `        RRX    XXX r Xb   RRRR  `,
        `        bRX?   XbXXXXX RRRRR    `,
        ` R      ..XXX XXb..             `,
        `     R  ...........             `,
        `   |      ........   RRO        `,
        `            ....      RRR       `,
        `R                    RRRRR      `,
        `                    OORRR       `,
        ` RR W         b      OR         `,
        `R5RRO               O           `,
        `ORRR,                           `,
        `,R5RR                          ,`,
    ],
    {
        "X": Brick,
        "R": Rock,
        "Z": Crystallizer,
        "O": Ore,
        "0": Boulder,
        "B": Bommaker,
        "r": TradeRug,
        "b": Bomb,
        "W": WoolyPig,
        "c": WildCornSeed,
        "D": DragonFlower,
        "P": Player,
        "e": Emerald,
        ".": Grass,
        "i": IslandMap,
        "T": Sign,
        "S": Stump,
        "p": PowderBomb,
        "m": MeteorCrystal,
        "?": Crate,
        "h": Hatchet,
        "o": WildOnion,
        "d": DragonFlowerSeed,
        "7": DeathsHead,
        "s": WildOnionSprout,
        "F": Firepot,
        ",": HeartFlower,
        "|": Tree,
        "G": GasMine,
        "5": RockStatue,
    }
)

bommakerHouse.noRotate = true

bommakerHouse.setVariants("statue", ["serpent"])

bommakerHouse.writeSigns([
    "Add sulfur-rich seeds to the crystallizer to get crystals.",
])

export { bommakerHouse }