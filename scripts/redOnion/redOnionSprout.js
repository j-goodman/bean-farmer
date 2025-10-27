import { Plant } from '../plant.js';
import { Sprite } from '../sprite.js';
import { RedOnion } from './redOnion.js';
import { RedOnionSeed } from './redOnionSeed.js';

import { game } from '../game.js';
import { utils } from '../utils.js';

class RedOnionSprout extends Plant {
    constructor(x, y) {
        super(x, y)
        this.name = "red onion sprout"
        this.sprite = makeRedOnionSprite()
        this.elevation = "ground"
        this.sprite.version = 1
        this.stage = 1
        this.maxStage = 4
        this.stageLength = 1300
        this.pushability = 10
        this.breakability = 10
        this.burnability = 8
        this.pluckable = false
        if (game.time === 0) {
            this.birthday -= utils.dice(this.stageLength)
        }
        // this.moveToGround()
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
        if (this.stage === this.maxStage && !game.checkGrid(this.position.x, this.position.y)) {
            this.pluckable = true
            this.moveFromGround()
        }
        if (!this.exists) {
            this.die()
        }
        if (game.time % (30 * 30) === 0) {
            const square = game.checkGrid(this.position.x, this.position.y, true)
            if (square.soilToxicity > .15 || square.soilHealth < .85) {
                if (utils.dice(3) === 3) {
                    this.onHit()
                }
            }
        }
        this.sprite.changeVersion(stage)
    }

    onCut () {
        this.onHit()
    }

    onHit () {
        const square = game.checkGrid(this.position.x, this.position.y, true)
        this.die()
        if (square.soilToxicity <= .1 && square.soilHealth >= .9) {
            game.addToGrid(new RedOnionSeed (this.position.x, this.position.y))
        } else if (utils.dice(4) === 4) {
            game.addToGrid(new RedOnionSeed (this.position.x, this.position.y))
        }
    }

    bePlucked (subject) {
        this.cleanSoil(utils.dice(5) + utils.dice(5), "soilHealth", 1)
        this.die()
        let coords = [
            {x: 1, y: 0},
            {x: -1, y: 0},
            {x: 0, y: 1},
            {x: 0, y: -1}
        ]
        let seeds = utils.dice(3)
        if (this.stage !== this.maxStage) {
            seeds = 1
        }
        utils.shuffle(coords).forEach(coord => {
            const { x, y } = coord;
            if (seeds > 0 && !game.checkGrid(this.position.x + x, this.position.y + y)) {
                seeds -= 1
                game.addToGrid(new RedOnionSeed (this.position.x + x, this.position.y + y))
            }
        })
        if (this.stage === this.maxStage) {
            this.checkDrop(new RedOnion (this.position.x, this.position.y))
            game.givePoints(5, this)
        }
    }
}

const makeRedOnionSprite = () => {
    const redOnionSprite = new Sprite ("red-onion/sprout-1")

    redOnionSprite.addVersion(1, "red-onion/sprout-1")
    redOnionSprite.addVersion(2, "red-onion/sprout-2")
    redOnionSprite.addVersion(3, "red-onion/sprout-3")
    redOnionSprite.addVersion(4, "red-onion/sprout-4")

    return redOnionSprite
}

game.constructors[RedOnionSprout.name] = RedOnionSprout
export { RedOnionSprout }