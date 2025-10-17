import { Plant } from './plant.js';
import { Sprite } from './sprite.js';

import { game } from './game.js';
import { utils } from './utils.js';

class HeartFlower extends Plant {
    constructor (x, y, elevation, color) {
        super(x, y, elevation, color)
        this.name = "heart flower"
        if (!color) {
            this.color = game.defaultFlowerColor
            this.color += Math.floor(x / 40)
            this.color += utils.dice(3)
        } else {
            this.color = color
        }
        if (this.color > 36) {
            this.color -= 36
        } else if (this.color < 1) {
            this.color += 36
        }
        this.sprite = new Sprite ("heart-flower/stems")
        this.overlayExists = false
        this.underlay = true
        this.overlay = [`heart-flower/${this.color}`]
        this.overlayCycle = 0
        this.overlayLoop = true
        this.elevation = "ground"
        this.pushability = 10
        this.breakability = 10
        this.burnability = 4
        this.seeds = utils.dice(3) + 1
        this.pluckable = false
        this.cleanSoil(utils.dice(3) + 2)
        if (game.time < 100) {
            this.cleanSoil(utils.dice(6) + 6)
            this.birthday -= utils.dice(120)
        }
    }

    update (age) {
        if (!this.flowered && utils.dice(30 * 90) === 1) {
            this.flower()
        }
        if (this.flowered && age > (30 * 30) && utils.dice(30 * 210) === 30) {
            this.reproduce()
        }
        if (age % (30 * 13) === 0 && !utils.isInViewport(this.position)) {
            const square = game.checkGrid(this.position.x, this.position.y, true)
            if (square.soilHealth < 0.27 || square.soilToxicity > 0.21) {
                this.die()
            }
        }
        if (age > (30 * 60 * 10) && utils.dice(64) === 64) {
            this.die()
        }
        if (this.flowered && age % 5 === 0) {
            const item = game.checkGrid(this.position.x, this.position.y)
            if (item && item.name === "player" && game.player.health < game.player.maxHealth) {
                game.player.health += 1
                game.displayHealth = 120
                this.unflower()
            }
        }
        if (age % (30 * 50) === 0) {
            if (game.checkGrid(this.position.x, this.position.y, true).soilToxicity > .5) {
                this.die()
            }
        }
    }

    flower () {
        this.overlayExists = true
        this.flowered = true
    }

    unflower () {
        this.overlayExists = false
        this.flowered = false
    }

    onCut () {
        if (this.flowered) {
            this.unflower()
        } else {
            this.die()
        }
    }

    burn () {
        if (this.flowered || utils.dice(7) === 7) {
            game.checkGrid(this.position.x, this.position.y, true).airOccupant = null
            this.unflower()
        }
        this.cleanSoil(3, "soilHealth", 1)
        this.burnability -= 1
        if (this.burnability <= 0) {
            this.die()
        }
    }

    reproduce () {
        let flowerCount = 0

        utils.checkAdjacentSpaces(this, (item, x, y) => {
            if (item && item.name === "heart flower") {
                flowerCount += 1
            }
            if ((!item || item.name === "grass") && utils.dice(2) === 2) {
                this.seeds -= 1
                if (item && item.name === "grass") {
                    item.die()
                }
                if (this.seeds < 0) {
                    game.setTimer(() => {
                        this.die()
                    }, utils.dice(90))
                } else {
                    let newColor = this.color
                    if (utils.dice(2) === 2) {
                        newColor -= 1
                    } else {
                        newColor += 1
                    }
                    new HeartFlower (x, y, "ground", newColor)
                }
            }
        })
        if (flowerCount > 1 && utils.dice(5) === 5) {
            this.die()
        }
    }
}

game.constructors[HeartFlower.name] = HeartFlower
export { HeartFlower }