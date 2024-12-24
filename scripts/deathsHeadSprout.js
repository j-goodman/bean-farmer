import { Plant } from './plant.js';
import { Sprite } from './sprite.js';
import { DeathsHead } from './deathsHead.js';
import { DeathsHeadSeed } from './deathsHeadSeed.js';

import { game } from './game.js';
import { utils } from './utils.js';

class DeathsHeadSprout extends Plant {
    constructor(x, y) {
        super(x, y)
        this.name = "deaths head sprout"
        this.sprite = makeDeathsHeadSproutSprite()
        this.sprite.version = 1
        this.stage = 1
        this.maxStage = 5
        this.stageLength = 300 + utils.dice(200)
        this.pushability = 10
        this.breakability = 10
        this.burnability = 0
        this.pluckable = false
        this.poisonImmune = true
        if (game.time === 0) {
            this.birthday -= utils.dice(this.stageLength * 2)
        }
    }

    onCut () {
        this.die()
        this.checkDrop(
            new DeathsHeadSeed (this.position.x, this.position.y)
        )
    }

    onHit () {
        this.onCut()
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
            this.cleanSoil(utils.dice(13), "soilToxicity", -1)
        }
        this.stage = stage
        this.sprite.changeVersion(stage)
        if (this.stage === this.maxStage) {
            this.die()
            game.addToGrid(new DeathsHead (this.position.x, this.position.y))
        }
    }
}

const makeDeathsHeadSproutSprite = () => {
    const sproutSprite = new Sprite ("deathshead/sprout/1")

    for (let i = 0; i <= 5; i++) {        
        sproutSprite.addVersion(i, `deathshead/sprout/${i}`)
    }

    return sproutSprite
}

game.constructors[DeathsHeadSprout.name] = DeathsHeadSprout
export { DeathsHeadSprout }