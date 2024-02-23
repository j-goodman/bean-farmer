import { Entity } from './entity.js';
import { WoolyPigCarcass } from './woolyPigCarcass.js';

import { makeWoolyPigSprite } from './sprites/woolyPigSprite.js';

import { game } from './game.js';
import { utils } from './utils.js';

class WoolyPig extends Entity {
    constructor(x, y) {
        super(x, y)
        this.imageName = "wooly-pig-right"
        this.baseMoveDelay = 18
        this.name = "wooly pig"
        this.moveDelay = this.baseMoveDelay
        this.baseStrength = 5
        this.strength = this.baseStrength
        this.pushability = 5
        this.sprite = makeWoolyPigSprite()
        this.sprite.version = "right"
        this.direction = "right"
        this.mood = "walking"
        this.animal = true
        this.health = 12
        this.update4DirectionSprite()
        this.burnability = 3
        this.walkCycle = 0
        this.chargeCycle = 0
        this.chargeCooldown = 0
        this.birthday -= utils.dice(150)
    }

    checkAhead () {
        const { x, y } = utils.directionToCoordinates(this.direction)
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
        if (
                target
                && target.animal
                && this.chargeCooldown <= 0
            ) {
            this.quiver(target)
            if (target.name === "wooly pig" && target.mood !== "angry") {
                target.direction = utils.oppositeDirection(this.direction)
                target.update4DirectionSprite()
                target.quiver()
            }
        }
    }

    charge () {
        const { x, y } = utils.directionToCoordinates(this.direction)
        this.mood = "angry"
        this.chargeCycle = 9
        this.chargeCooldown = 150
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

    onHit (subject) {
        if (this.mood !== "angry") {
            this.quiver()
            this.mood = "angry"
        }
        if (subject && subject.name === "wooly pig") {
            this.health -= 0
        } else {
            this.health -= 1
        }
        if (this.health <= 0) {
            this.die()
        }
    }

    quiver () {
        let jumpNums = [0, -3, -5, -3, 0, -2, -4, -2, 0, -2, -3, -1, 0, 0, 0]
        this.mood = "angry"
        for (let i = 0; i < jumpNums.length; i++) {
            game.setTimer(() => {
                this.spriteOffset.y = jumpNums[i] / 20
                if (i === jumpNums.length - 1) {
                    this.charge()
                }
            }, i)
        }
    }

    attack () {
        const { x, y } = utils.directionToCoordinates(this.direction)
        const target = game.checkGrid(
            this.position.x + x,
            this.position.y + y
        )

        if (target) {
            game.setTimer(() => {
                if (target === game.checkGrid(this.position.x + x, this.position.y + y)) {
                    this.hit(target, x, y)
                }
            }, 7)
        }

        this.playAnimationOnce(`attack-${this.direction}`)
    }

    onTouch (subject) {
        if (subject) {
            let xDiff = this.position.x - subject.position.x
            let yDiff = this.position.y - subject.position.y
            if (yDiff === 1) {
                this.direction = "up"
            } else if (yDiff === -1) {
                this.direction = "down"
            } else if (xDiff === -1) {
                this.direction = "right"
            } else if (xDiff === 1) {
                this.direction = "left"
            }
            this.update4DirectionSprite()
        }
    }

    onDeath () {
        game.addToGrid(new WoolyPigCarcass (this.position.x, this.position.y))
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

        if (!((age + 1) % 100) && this.mood !== "angry") { // Change 75 back to 150
            let x = 0
            let y = 0
            if (this.direction === "left" || this.direction === "right") {
                x = this.direction === "left" ? -1 : 1
            } else {
                y = this.direction === "up" ? -1 : 1
            }
            this.walkCycle += x
            this.walkCycle += y
            let moveSuccess = this.move(x, y)
            if (!moveSuccess) {
                this.walkCycle += x
                this.walkCycle += y
                if (utils.dice(12) > 11) {
                    this.quiver()
                }
            }
            if (this.walkCycle > 2) { this.walkCycle = 2 }
            if (this.walkCycle < -2) { this.walkCycle = -2 }
            // this.update4DirectionSprite()
            if ((this.walkCycle > 1 || this.walkCycle < -1)) {
                game.setTimer(() => {
                    if (this.mood !== "angry") {
                        this.direction = {
                            left: "up",
                            down: "left",
                            right: "down",
                            up: "right"
                        }[this.direction]
                        this.update4DirectionSprite()
                    }
                }, 25)
                game.setTimer(() => {
                    if (this.mood !== "angry") {
                        this.direction = {
                            left: "right",
                            down: "up",
                            right: "left",
                            up: "down"
                        }[this.direction]
                        this.update4DirectionSprite()
                    }
                }, 45)
                game.setTimer(() => {
                    if (utils.dice(100) > 1) {
                        if (this.mood !== "angry") {
                            this.direction = {
                                left: "down",
                                down: "right",
                                right: "up",
                                up: "left"
                            }[this.direction]
                            this.update4DirectionSprite()
                        }
                    } else {
                        this.walkCycle = 0
                    }
                }, 75)
            }
        }
    }
}

export { WoolyPig }