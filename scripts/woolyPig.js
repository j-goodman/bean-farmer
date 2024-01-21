import { Entity } from './entity.js';

import { utils } from './utils.js';

class WoolyPig extends Entity {
    constructor(imageName, x, y) {
        imageName = "wooly-pig-left"
        super(imageName, x, y)
        this.baseMoveDelay = 18
        this.moveDelay = this.baseMoveDelay
        this.baseStrength = 5
        this.strength = this.baseStrength
        this.pushability = 5
        this.direction = "left"
    }

    update (age) {
        this.frameUpdate()
        const posX = this.position.x
        const posY = this.position.y
        if (!((age + 26) % 150)) {
            this.direction = utils.randomRotate(this.direction)
            this.imageName = "wooly-pig-" + this.direction
        }

        if (!((age + 1) % 50)) {
            let x = 0
            let y = 0
            if (this.direction === "left" || this.direction === "right") {
                x = this.direction === "left" ? -1 : 1
            } else {
                y = this.direction === "up" ? -1 : 1
            }
            this.move(x, y)
        }
    }
}

export { WoolyPig }