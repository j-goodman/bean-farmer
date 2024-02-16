import { Plant } from '../plant.js';
import { Sprite } from '../sprite.js';
import { GrassSeed } from './grassSeed.js';

import { game } from '../game.js';
import { utils } from '../utils.js';

class Grass extends Plant {
    constructor(x, y) {
        super(x, y)
        this.name = "grass"
        this.sprite = makeGrassSprite()
        this.sprite.version = 1
        this.stage = "sprout"
        this.stageLength = 200
        this.elevation = "ground"
        this.pushability = 10
        this.breakability = 10
        this.burnability = 5
        this.pluckable = false
        this.seedAge = 4000 + utils.dice(2000)
        if (game.time === 0) {
            this.birthday -= utils.dice(this.stageLength * 2)
        }
        this.moveToGround()
    }

    update (age) {
        this.frameUpdate()
        let stage = age > this.stageLength ? "grass" : "sprout"
        if (stage === "grass") {
            stage = "tileTwo"
            let sum = this.position.x - (this.position.y - (Math.round(this.position.x / 3))) + 227
            sum -= 1
            if (!(sum % 2)) {
                stage = "tileFour"
            }
            let primesOne = [17, 37, 71, 97, 127, 223]
            let primesTwo = [29, 41, 53, 59, 67, 101, 149, 179, 191, 227]
            if (primesOne.some(prime => sum % prime === 0)) {
                stage = "tileThree"
            }
            if (primesTwo.some(prime => sum % prime === 0)) {
                stage = "tileOne"
            }
        }
        if (!(age % 3000)) {
            this.cleanSoil()
        }
        if (age > this.seedAge) {
            this.die()
            const wind = utils.directionToCoordinates(game.prevailingWind)
            let coordList = [
                {x: 0, y: 0},
                {x: 1, y: 0},
                {x: -1, y: 0},
                {x: 0, y: 1},
                {x: 0, y: -1},
                {x: 0 - wind.x - wind.x, y: 0 - wind.y - wind.y},
                {x: 0 + wind.x, y: 0 + wind.y},
            ]
            coordList.forEach(coords => {
                coords.x += wind.x
                coords.y += wind.y
            })
            coordList.forEach(coords => {
                if (
                    utils.dice(3) === 3 &&
                    !game.checkGrid(this.position.x + coords.x, this.position.y + coords.y)
                ) {
                    game.setTimer(() => {
                        new Grass (this.position.x + coords.x, this.position.y + coords.y, "ground")
                    }, utils.dice(500))
                }
            })
        }
        this.stage = stage
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
        utils.shuffle(coords).forEach(coord => {
            const { x, y } = coord;
            if (seeds > 0 && !game.checkGrid(this.position.x + x, this.position.y + y)) {
                seeds -= 1
                game.addToGrid(new GrassSeed (this.position.x + x, this.position.y + y))
            }
        })
        game.addToGrid(new Grass (this.position.x, this.position.y, "ground"))
    }
}

const makeGrassSprite = () => {
    const GrassSprite = new Sprite ("grass/sprout")

    GrassSprite.addVersion("sprout", "grass/sprout")
    GrassSprite.addVersion("tileOne", "grass/tile-1")
    GrassSprite.addVersion("tileTwo", "grass/tile-2")
    GrassSprite.addVersion("tileThree", "grass/tile-3")
    GrassSprite.addVersion("tileFour", "grass/tile-4")

    return GrassSprite
}


export { Grass }