import { Entity } from './entity.js';
import { Sprite } from './sprite.js';

import { utils } from './utils.js';

class WoolyPig extends Entity {
    constructor(imageName, x, y) {
        imageName = "wooly-pig-left"
        super(imageName, x, y)
        this.baseMoveDelay = 18
        this.name = "wooly pig"
        this.moveDelay = this.baseMoveDelay
        this.baseStrength = 5
        this.strength = this.baseStrength
        this.pushability = 5
        this.sprite = makeWoolyPigSprite()
        this.sprite.version = "left"
        this.direction = "left"
        this.updateSprite()
    }

    update (age) {
        this.frameUpdate()
        const posX = this.position.x
        const posY = this.position.y
        if (!((age + 26) % 150)) {
            this.direction = utils.randomRotate(this.direction)
            this.updateSprite()
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

const makeWoolyPigSprite = () => {
    const woolyPigSprite = new Sprite ("wooly-pig-left")
    
    woolyPigSprite.addVersion("down", "wooly-pig-down")
    woolyPigSprite.addVersion("left", "wooly-pig-left")
    woolyPigSprite.addVersion("up", "wooly-pig-up")
    woolyPigSprite.addVersion("right", "wooly-pig-right")
    
    woolyPigSprite.addTransition("down", "right", [
        "wooly-pig-down-right",
    ])
    
    woolyPigSprite.addTransition("right", "up", [
        "wooly-pig-right-up-1",
        "wooly-pig-right-up-2"
    ])
    
    woolyPigSprite.addTransition("left", "up", [
        "wooly-pig-left-up-1",
        "wooly-pig-left-up-2"
    ])
    
    woolyPigSprite.addTransition("left", "down", [
        "wooly-pig-down-left",
    ])
    
    woolyPigSprite.addTransition("left", "right", [
        "wooly-pig-down-left",
        "wooly-pig-down",
        "wooly-pig-down-right",
    ])
    
    woolyPigSprite.addTransition("up", "down", [
        "wooly-pig-right-up-2",
        "wooly-pig-right-up-1",
        "wooly-pig-down-right"
    ])
    return woolyPigSprite
}


export { WoolyPig }