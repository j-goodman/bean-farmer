import { Plant } from './plant.js';
import { Sprite } from './sprite.js';
import { PricklyPear } from './pricklyPear.js';

import { game } from './game.js';
import { utils } from './utils.js';

class Cactus extends Plant {
    constructor(x, y) {
        super(x, y)
        this.name = "cactus"
        this.grownSprite = makeCactusSprite()
        this.sprite = makeCactusSproutSprite()
        this.pushability = 10
        this.breakability = 5
        this.burnability = 5
        this.birthday -= utils.dice(60)
        this.matureAge = (30 * 60 * 3) + utils.dice(30 * 60 * 3)
        
        this.createSelf()
        this.cleanSoil(7)
        this.cleanSoil(15)
        this.cleanSoil(13, "soilHealth", -1)
        this.cleanSoil(9, "soilHealth", -1)
    }
    
    update (age) {
        this.age = age
        this.frameUpdate()
        if (game.time % 88 === 0 && age > (this.matureAge / 2)) {
            this.sprite = this.grownSprite
            this.grown = true
        }
        if (this.grown && game.time % (this.matureAge) === 0) {
            const square = game.checkGrid(this.position.x, this.position.y, true)
            if (square.soilToxicity > .4) {
                this.barren = true
                this.die()
            } else {
                this.reproduce()
            }
        }
        if (!this.grown && age % (15 * 3) === 0 && this.cactusCount() > 1) {
            if (utils.dice(3) === 3) {
                utils.drawSmoke(this.position, 9)
                game.setTimer(() => {
                    this.barren = true
                    this.die()
                }, 15 + utils.dice(5))
            }
        }
    }

    cactusCount () {
        let count = 0
        for (let x = -1; x <= 1; x++) {
            for (let y = -2; y <= 2; y++) {
                const item = game.checkGrid(
                    this.position.x + x,
                    this.position.y + y
                )
                if (item && item.name === "cactus") {
                    count += 1
                }
            }
        }
        return count
    }

    reproduce () {
        const coords = utils.shuffle([
            {x: 3, y: 2},
            {x: 3, y: -2},
            {x: -3, y: 2},
            {x: -3, y: -2},
        ])
        let done = false
        if (utils.dice(2) === 2) {
            coords[0].x += Math.random() > .5 ? 1 : -1
            coords[1].x += Math.random() > .5 ? 1 : -1
            coords[2].y += Math.random() > .5 ? 1 : -1
            coords[3].y += Math.random() > .5 ? 1 : -1
        }
        coords.forEach(coord => {
            if (!done && !game.checkGrid(this.position.x + coord.x, this.position.y + coord.y)) {
                done = true
                game.setTimer(() => {
                    if (utils.dice(2) === 2) {
                        new Cactus (this.position.x + coord.x, this.position.y + coord.y)
                    }
                }, utils.dice(30))
            }
        })
    }

    onCut (cutter) {
        this.die()
        if (cutter && cutter.name == "player") {
            game.givePoints(8, this)
        }
    }

    onTouch (subject) {
        if (game.time % 15 === 0 && subject && subject.onHit) {
            subject.onHit()
        }
    }

    bePlucked () {
        this.die()
    }

    onDeath (subject) {
        if (this.grown && !this.barren) {
            this.checkDrop(new PricklyPear (this.position.x, this.position.y))
        }
    }
}

const makeCactusSprite = () => {
    const cactusSprite = new Sprite ("cactus")
    return cactusSprite
}

const makeCactusSproutSprite = () => {
    const cactusSprite = new Sprite ("cactus-sprout")
    return cactusSprite
}

game.constructors[Cactus.name] = Cactus
export { Cactus }