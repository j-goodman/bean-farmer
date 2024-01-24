import { Entity } from './entity.js';
import { Sprite } from './sprite.js';

import { game } from './game.js';
import { utils } from './utils.js';

class WoolyPig extends Entity {
    constructor(imageName, x, y) {
        imageName = "wooly-pig-up"
        super(imageName, x, y)
        this.baseMoveDelay = 18
        this.name = "wooly pig"
        this.moveDelay = this.baseMoveDelay
        this.baseStrength = 5
        this.strength = this.baseStrength
        this.pushability = 5
        this.sprite = makeWoolyPigSprite()
        this.sprite.version = "up"
        this.direction = "up"
        this.mood = "walking"
        this.animal = true
        this.updateSprite()
        this.walkCycle = 0
        this.chargeCycle = 0
    }

    checkAhead () {
        const { x, y } = utils.directionToCoordinates(this.direction);
        let visionDistance = 4
        let visionCursor = {
            x: this.position.x,
            y: this.position.y
        }
        let entity = null
        let target = null
        while (!entity && visionDistance > 0) {
            visionCursor.x += x
            visionCursor.y += y
            visionDistance -= 1
            entity = game.checkGrid(visionCursor.x, visionCursor.y)
            if (entity) {
                target = entity
            }
        }
        if (target && target.animal) {
            this.charge()
        }
    }

    charge () {
        const { x, y } = utils.directionToCoordinates(this.direction);
        this.mood = "angry"
        console.log("Charging!")
        this.chargeCycle = 4
        this.moveDelay = 5

        const chargeStep = () => {
            this.chargeCycle -= 1
            console.log("Charge step:", this.chargeCycle, x, y)
            this.move(x, y, () => {
                if (this.chargeCycle > 0) {
                    chargeStep()
                } else {
                    this.moveDelay = this.baseMoveDelay
                }
            })
        }

        this.move(x, y, chargeStep)
    }

    update (age) {
        this.frameUpdate()
        const posX = this.position.x
        const posY = this.position.y

        if (!((age + 1) % 13) && this.mood !== "angry") {
            this.checkAhead()
        }

        if (!((age + 1) % 150) && this.mood !== "angry") {
            let x = 0
            let y = 0
            if (this.direction === "left" || this.direction === "right") {
                x = this.direction === "left" ? -1 : 1
            } else {
                y = this.direction === "up" ? -1 : 1
            }
            this.walkCycle += x
            this.walkCycle += y
            this.move(x, y)

            if (this.walkCycle > 1 || this.walkCycle < -1) {
                game.setTimer(() => {
                    this.direction = {
                        left: "up",
                        down: "left",
                        right: "down",
                        up: "right"
                    }[this.direction]
                    this.updateSprite()
                }, 30)
                game.setTimer(() => {
                    this.direction = {
                        left: "right",
                        down: "up",
                        right: "left",
                        up: "down"
                    }[this.direction]
                    this.updateSprite()
                }, 65)
                game.setTimer(() => {
                    if (utils.dice(9) > 1) {
                        this.direction = {
                            left: "down",
                            down: "right",
                            right: "up",
                            up: "left"
                        }[this.direction]
                        this.updateSprite()
                    } else {
                        this.walkCycle = 0
                    }
                }, 120)
            }
        }
    }
}

const makeWoolyPigSprite = () => {
    const woolyPigSprite = new Sprite ("wooly-pig-up")
    
    woolyPigSprite.addVersion("down", "wooly-pig-down")
    woolyPigSprite.addVersion("left", "wooly-pig-left")
    woolyPigSprite.addVersion("up", "wooly-pig-up")
    woolyPigSprite.addVersion("right", "wooly-pig-right")
    
    woolyPigSprite.addTransition("down", "right", [
        "wooly-pig-down-right-1",
        "wooly-pig-down-right-2",
        "wooly-pig-down-right-3"
    ])
    
    woolyPigSprite.addTransition("right", "up", [
        "wooly-pig-right-up-0",
        "wooly-pig-right-up-1",
        "wooly-pig-right-up-2",
        "wooly-pig-right-up-3",
        "wooly-pig-right-up-4"
    ])
    
    woolyPigSprite.addTransition("left", "up", [
        "wooly-pig-left-up-0",
        "wooly-pig-left-up-1",
        "wooly-pig-left-up-2",
        "wooly-pig-left-up-3",
        "wooly-pig-left-up-4"
    ])
    
    woolyPigSprite.addTransition("down", "left", [
        "wooly-pig-down-left-1",
        "wooly-pig-down-left-2",
        "wooly-pig-down-left-3"
    ])
    
    woolyPigSprite.addTransition("left", "right", [
        "wooly-pig-down-left-3",
        "wooly-pig-down-left-2",
        "wooly-pig-down",
        "wooly-pig-down-right-2",
        "wooly-pig-down-right-3"
    ])
    
    woolyPigSprite.addTransition("up", "down", [
        "wooly-pig-right-up-3",
        "wooly-pig-right-up-2",
        "wooly-pig-right",
        "wooly-pig-down-right-2",
        "wooly-pig-down-right-1"
    ])
    return woolyPigSprite
}

export { WoolyPig }