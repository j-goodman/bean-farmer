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
        this.elevation = "ground"
        this.sprite.version = 1
        this.stage = 1
        this.maxStage = 4
        this.stageLength = 1600
        this.pushability = 10
        this.breakability = 10
        this.burnability = 7
        this.pluckable = false
        this.birthday -= utils.dice(30)
        if (game.time === 0) {
            this.birthday -= utils.dice(this.stageLength * 2)
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
        if (this.stage === this.maxStage && !game.checkGrid(this.position.x, this.position.y)) {
            this.pluckable = true
            this.moveFromGround()
        }
        if (!this.exists) {
            this.die()
        }
        if (age % (30 * 30) === 0) {
            const square = game.checkGrid(this.position.x, this.position.y, true)
            if (square.soilToxicity > .45) {
                if (utils.dice(3) === 3) {
                    this.onHit()
                }
            }
            if (square.soilToxicity > .97) {
                this.barren = true
                this.die()
            }
        }
        this.sprite.changeVersion(stage)
    }

    onCut () {
        this.die()
        if (!this.barren) {
            game.addToGrid(new WildOnionSeed (this.position.x, this.position.y))
        }
    }

    onHit () {
        if (this.burnability === 7) {
            game.addToGrid(new WildOnionSeed (this.position.x, this.position.y))
        }
        this.die()
    }

    bePlucked (subject) {
        this.cleanSoil(utils.dice(4) + utils.dice(4), "soilHealth", 1)
        this.die()
        let coords = [
            {x: 0, y: -1},
            {x: 1, y: 0},
            {x: 0, y: 1},
            {x: -1, y: 0},
        ]
        let seeds = utils.dice(4) - 1
        if (this.stage !== this.maxStage) {
            seeds = 1
        }
        utils.shuffle(coords).forEach(coord => {
            const { x, y } = coord;
            if (seeds > 0 && !game.checkGrid(this.position.x + x, this.position.y + y)) {
                seeds -= 1
                game.addToGrid(new WildOnionSeed (this.position.x + x, this.position.y + y))
            }
        })
        if (this.stage === this.maxStage) {
            this.checkDrop(new WildOnion (this.position.x, this.position.y))
            game.givePoints(3, this)
        }
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

game.constructors[WildOnionSprout.name] = WildOnionSprout
export { WildOnionSprout }