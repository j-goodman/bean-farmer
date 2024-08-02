import { Plant } from '../plant.js';
import { Sprite } from '../sprite.js';
import { GrassSeed } from './grassSeed.js';

import { game } from '../game.js';
import { utils } from '../utils.js';

class Grass extends Plant {
    constructor (x, y, elevation, dna) {
        super(x, y, elevation, dna)
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
        this.seedAge = 2500 + utils.dice(2500)
        this.immutability = 30
        if (game.time === 0) {
            this.birthday -= utils.dice(this.stageLength * 2)
        }

        if (this.dna.corngrass) {
            if (utils.dice(9) > 1) {
                this.stage = "corngrass"
            } else {
                this.stage = "sprout"
                this.dna.corngrass = false
                this.dna.dead = true
            }
        }

        if (this.dna.dead) {
            this.stage = "dead"
            game.setTimer(() => {
                this.die()
            }, 100 + utils.dice(200))
        }

        let square = game.checkGrid(this.position.x, this.position.y, true)

        if (utils.dice(this.immutability) <= 1) {
            this.mutate()
        }
    }

    update (age) {
        this.frameUpdate()
        let stage = age > this.stageLength ? "grass" : "sprout"
        if (this.stage === "dead" || this.stage === "corngrass") {
            stage = this.stage
        }

        if (age % (30 * 30) === 0) {
            try {
                if (game.checkGrid(this.position.x, this.position.y, true).soilToxicity > .45) {
                    this.die()
                }
            } catch {
                return false
            }
        }

        if (stage === "grass") {
            stage = "tileTwo"
            let sum = this.position.x - (this.position.y - (Math.round(this.position.x / 3))) + 227
            sum -= 1
            if (!(sum % 2)) {
                stage = "tileFour"
            }
            let primesOne = [17, 37, 71, 97, 127, 179, 223, 227]
            let primesTwo = [29, 41, 53, 59, 67, 101, 149, 191]
            if (primesOne.some(prime => sum % prime === 0)) {
                stage = "tileThree"
            }
            if (primesTwo.some(prime => sum % prime === 0)) {
                stage = "tileOne"
            }
        }

        if (!(age % 3000)) {
            this.cleanSoil(utils.dice(4))
        }

        if (age > this.seedAge) {
            this.die()
            this.cleanSoil(utils.dice(5), "soilHealth", 1)
            const wind = utils.directionToCoordinates(game.prevailingWind)
            let coordList = [
                {x: 0, y: 0},
                {x: 1, y: 0},
                {x: -1, y: 0},
                {x: 0, y: 1},
                {x: 0, y: -1},
            ]
            coordList.forEach(coords => {
                coords.x += wind.x
                coords.y += wind.y
            })
            coordList.forEach(coords => {
                if (
                    !game.checkGrid(this.position.x + coords.x, this.position.y + coords.y, true).groundOccupant
                    && utils.dice(3) === 3
                ) {
                    game.setTimer(() => {
                        new Grass (
                            this.position.x + coords.x,
                            this.position.y + coords.y,
                            "ground",
                            this.dna
                        )
                    }, utils.dice(100))
                }
            })
        }
        this.stage = stage
        this.sprite.changeVersion(stage)
    }

    mutate () {
        if (!this.dna.corngrass && utils.dice(5) > 1) {
            this.stage = "dead"
            this.dna.dead = true
            game.setTimer(() => {
                this.die()
            }, 100 + utils.dice(200))
        } else {
            this.stage = "corngrass"
            this.dna.corngrass = true
        }
    }

    onCut (item) {
        this.bePlucked(item)
    }
    
    bePlucked (subject) {
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
                let seed = new GrassSeed (this.position.x + x, this.position.y + y, null, this.dna)
                if (this.mutation) {
                    seed.mutation = this.mutation
                }
                game.addToGrid(seed)
            }
        })
    }
}

const makeGrassSprite = () => {
    const GrassSprite = new Sprite ("grass/sprout")

    GrassSprite.addVersion("sprout", "grass/sprout")
    GrassSprite.addVersion("tileOne", "grass/tile-1")
    GrassSprite.addVersion("tileTwo", "grass/tile-2")
    GrassSprite.addVersion("tileThree", "grass/tile-3")
    GrassSprite.addVersion("tileFour", "grass/tile-4")

    GrassSprite.addVersion("dead", "grass/dead")
    GrassSprite.addVersion("corngrass", "grass/corngrass")

    return GrassSprite
}

game.constructors[Grass.name] = Grass
export { Grass }