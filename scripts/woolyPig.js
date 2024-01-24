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
        this.chargeCooldown = 0
    }

    checkAhead () {
        const { x, y } = utils.directionToCoordinates(this.direction);
        let visionDistance = 5
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
        if (target && target.animal && this.chargeCooldown <= 0) {
            this.quiver()
            if (target.name === "wooly pig") {
                target.direction = utils.oppositeDirection(this.direction)
                target.updateSprite()
                target.quiver()
            }
        }
    }

    charge () {
        const { x, y } = utils.directionToCoordinates(this.direction);
        this.mood = "angry"
        this.chargeCycle = 5
        this.chargeCooldown = 250
        this.moveDelay = 5

        const chargeStep = () => {
            this.chargeCycle -= 1
            this.move(x, y, () => {
                if (this.chargeCycle > 0) {
                    let inFrontOf = game.checkGrid(
                        x + this.position.x,
                        y + this.position.y
                    )
                    if (inFrontOf) {
                        this.attack()
                        this.mood = "walking"
                        this.chargeCycle = 0
                    }
                    chargeStep()
                } else {
                    this.moveDelay = this.baseMoveDelay
                    this.mood = "walking"
                }
            })
        }

        this.move(x, y, chargeStep)
    }

    quiver () {
        let jumpNums = [0, -3, -5, -5, -3, 0, -2, -3, -2, 0, 0]
        this.mood = "angry"
        for (let i = 0; i < jumpNums.length; i++) {
            game.setTimer(() => {
                this.spritePosition.y = this.position.y + (jumpNums[i] / 20)
                if (i === jumpNums.length - 1) {
                    this.charge()
                }
            }, i)
        }
    }

    attack () {
        if (this.direction === "left") {
            this.playAnimationOnce("attack-left")
        } else {
            this.playAnimationOnce("attack-right")
        }
    }

    update (age) {
        this.frameUpdate()
        const posX = this.position.x
        const posY = this.position.y

        this.chargeCooldown = this.chargeCooldown > 0 ?
        this.chargeCooldown - 1 : this.chargeCooldown

        if (!((age + 1) % 6) && this.mood !== "angry") {
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

            if ((this.walkCycle > 1 || this.walkCycle < -1)) {
                game.setTimer(() => {
                    if (this.mood !== "angry") {
                        this.direction = {
                            left: "up",
                            down: "left",
                            right: "down",
                            up: "right"
                        }[this.direction]
                        this.updateSprite()
                    }
                }, 30)
                game.setTimer(() => {
                    if (this.mood !== "angry") {
                        this.direction = {
                            left: "right",
                            down: "up",
                            right: "left",
                            up: "down"
                        }[this.direction]
                        this.updateSprite()
                    }
                }, 65)
                game.setTimer(() => {
                    if (utils.dice(9) > 1) {
                        if (this.mood !== "angry") {
                            this.direction = {
                                left: "down",
                                down: "right",
                                right: "up",
                                up: "left"
                            }[this.direction]
                            this.updateSprite()
                        }
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

    woolyPigSprite.addAnimatedVersion("attack-right", [
        "wooly-pig-attack-right/1",
        "wooly-pig-attack-right/2",
        "wooly-pig-attack-right/3",
        "wooly-pig-attack-right/4",
        "wooly-pig-attack-right/4",
        "wooly-pig-attack-right/5",
        "wooly-pig-attack-right/5",
        "wooly-pig-attack-right/6",
        "wooly-pig-attack-right/6",
        "wooly-pig-attack-right/7",
        "wooly-pig-attack-right/8",
        "wooly-pig-attack-right/9",
        "wooly-pig-attack-right/10",
    ])

    woolyPigSprite.addAnimatedVersion("attack-left", [
        "wooly-pig-attack-left/1",
        "wooly-pig-attack-left/2",
        "wooly-pig-attack-left/3",
        "wooly-pig-attack-left/4",
        "wooly-pig-attack-left/4",
        "wooly-pig-attack-left/5",
        "wooly-pig-attack-left/5",
        "wooly-pig-attack-left/6",
        "wooly-pig-attack-left/6",
        "wooly-pig-attack-left/7",
        "wooly-pig-attack-left/8",
        "wooly-pig-attack-left/9",
        "wooly-pig-attack-left/10",
    ])

    return woolyPigSprite
}

export { WoolyPig }