import { Plant } from '../plant.js';
import { Sprite } from '../sprite.js';
import { WildOnion } from './wildOnion.js';
import { WildOnionSeed } from './wildOnionSeed.js';

import { game } from '../game.js';
import { utils } from '../utils.js';

class WildOnionSprout extends Plant {
    constructor(x, y) {
        super(x, y)
        this.name = "wild onion sprout"
        this.sprite = makeWildOnionSprite()
        this.sprite.version = 1
        this.stage = 1
        this.maxStage = 4
        this.stageLength = 700
        this.pushability = 10
        this.breakability = 10
        this.pluckable = false
        if (game.time === 0) {
            this.birthday -= utils.dice(this.stageLength)
        }
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
            this.pluckable = true
        }
        this.sprite.changeVersion(stage)
    }

    getPlucked (subject) {
        this.die()
        let coords = [
            {x: 1, y: 0},
            {x: -1, y: 0},
            {x: 0, y: 1},
            {x: 0, y: -1}
        ]
        let seeds = utils.dice(4) - 1
        console.log(seeds)
        utils.shuffle(coords).forEach(coord => {
            const { x, y } = coord;
            if (seeds > 0 && !game.checkGrid(this.position.x + x, this.position.y + y)) {
                seeds -= 1
                game.addToGrid(new WildOnionSeed (this.position.x + x, this.position.y + y))
            }
        })
        game.addToGrid(new WildOnion (this.position.x, this.position.y))
    }
}

const makeWildOnionSprite = () => {
    const wildOnionSprite = new Sprite ("wild-onion/sprout-1")

    wildOnionSprite.addVersion(1, "wild-onion/sprout-1")
    wildOnionSprite.addVersion(2, "wild-onion/sprout-2")
    wildOnionSprite.addVersion(3, "wild-onion/sprout-3")
    wildOnionSprite.addVersion(4, "wild-onion/sprout-4")

    return wildOnionSprite
}


export { WildOnionSprout }