import { AtomBomb } from './atomBomb.js';
import { BoneShards } from './boneShards.js';
import { Dollar } from './dollar.js';
import { Entity } from './entity.js';
import { Key } from './key.js';
import { MeteorCrystal } from './meteorCrystal.js';
import { Penny } from './penny.js';
import { Sprite } from './sprite.js';
import { SulfurCrystal } from './sulfurCrystal.js';
import { utils } from './utils.js';

class Ocean extends Entity {
    constructor(x, y) {
        super(x, y)
        this.sprite = makeOceanSprite()
        this.name = "ocean"
        this.sprite.version = "down"
        this.pipeConnection = true
        this.pushability = 10
        this.immobile = true
    }

    onDeath () {
        if (game.time > 200 && utils.dice(30) === 30) {
            const drop = new BoneShards ()
            drop.sprite = new Sprite ("fishbones")
            this.checkDrop(drop)
        } else if (game.time > 200 && utils.dice(130) === 130) {
            const drop = new Penny ()
            this.checkDrop(drop)
        } else if (game.time > 200 && utils.dice(130) === 130) {
            const drop = new MeteorCrystal ()
            this.checkDrop(drop)
        } else if (game.time > 200 && utils.dice(400) === 400) {
            const drop = new SulfurCrystal ()
            this.checkDrop(drop)
        } else if (game.time > 200 && utils.dice(600) === 600) {
            const drop = new Key ()
            this.checkDrop(drop)
        } else if (game.time > 200 && utils.dice(600) === 600) {
            const drop = new Dollar ()
            this.checkDrop(drop)
        } else if (game.time > 200 && utils.dice(2300) === 2300) {
            const drop = new AtomBomb ()
            this.checkDrop(drop)
        }
    }
}

const makeOceanSprite = () => {
    const oceanSprite = new Sprite ("ocean")

    oceanSprite.addVersion("down", "ocean")
    oceanSprite.addURDLVersions("ocean")
    oceanSprite.addVersion("fill", "ocean/fill")

    return oceanSprite
}

game.constructors[Ocean.name] = Ocean
export { Ocean }