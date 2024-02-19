import { Plant } from './plant.js';
import { Sprite } from './sprite.js';
import { DragonFlower } from './dragonFlower.js';
import { DragonFlowerSeed } from './dragonFlowerSeed.js';

import { game } from './game.js';
import { utils } from './utils.js';

class DragonFlowerSprout extends Plant {
    constructor(x, y) {
        super(x, y)
        this.name = "wild onion sprout"
        this.sprite = makeDragonFlowerSproutSprite()
        this.sprite.version = 1
        this.stage = 1
        this.maxStage = 2
        this.stageLength = 1600
        this.pushability = 10
        this.breakability = 10
        this.burnability = 7
        this.pluckable = false
        if (game.time === 0) {
            this.birthday -= utils.dice(this.stageLength * 2)
        }
    }

    onCut () {
        this.die()
        game.addToGrid(new DragonFlowerSeed (this.position.x, this.position.y))
    }

    update (age) {
        this.frameUpdate()
        if (this.stage > this.maxStage) {
            this.stage = this.maxStage
            return false
        }
        let stage = Math.ceil(age / this.stageLength)
        stage = stage > this.maxStage ? this.maxStage : stage
        if (stage > this.stage) {
            this.cleanSoil()
        }
        this.stage = stage
        if (this.stage === this.maxStage) {
            this.die()
            game.addToGrid(new DragonFlower (this.position.x, this.position.y))
        }
    }
}

const makeDragonFlowerSproutSprite = () => {
    const dragonFlowerSproutSprite = new Sprite ("dragon-flower/sprout/1")

    dragonFlowerSproutSprite.addVersion(1, "dragon-flower/sprout/1")

    return dragonFlowerSproutSprite
}


export { DragonFlowerSprout }