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
        this.matureAge = (30 * 60 * 3) + utils.dice(30 * 60 * 3)
        
        this.createSelf()
        this.cleanSoil(7)
        this.cleanSoil(15)
        this.cleanSoil(9, "soilHealth", -1)
        this.cleanSoil(6, "soilHealth", -1)
    }
    
    update (age) {
        this.age = age
        this.frameUpdate()
        if (game.time % 150 === 0 && age > (this.matureAge / 2)) {
            this.sprite = this.grownSprite
            this.grown = true
        }
        if (this.grown && game.time % (this.matureAge) === 0) {
            this.reproduce()
        }
    }

    reproduce () {
        const coords = utils.shuffle([
            {x: 3, y: 2},
            {x: 3, y: -2},
            {x: -3, y: 2},
            {x: -3, y: -2},
        ])
        let done = false
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

    onCut (subject) {
        this.die()
    }

    onTouch (subject) {
        if (game.time % 15 === 0) {
            subject.onHit()
        }
    }

    getPlucked () {
        this.die()
    }

    onDeath (subject) {
        if (this.grown) {
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