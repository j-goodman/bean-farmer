import { Entity } from './entity.js';
import { Sprite } from './sprite.js';

import { Bomb } from './bomb.js';

import { utils } from './utils.js'

class Bommaker extends Entity {
    constructor(x, y) {
        super(x, y)
        this.sprite = makeBommakerSprite()
        this.name = "bommaker"
        this.baseMoveDelay = 12
        this.moveDelay = this.baseMoveDelay
        this.animal = true
        this.spawnPosition = {x: x, y: y}
        this.tradePosition = {x: -20, y: -54}
        this.tradeRugPosition = {x: -21, y: -54}
        this.idlePositions = [
            {x: -20, y: -82},
            {x: -30, y: -66},
            {x: -28, y: -54},
            {x: -39, y: -56},
            {x: -25, y: -34},
            {x: -29, y: -17}
        ]
        this.mood = "idle"
        this.clockDirections = true
        this.currentAction = null

        this.request = {name: "sulfur crystal", image: "sulfur-crystal", reward: Bomb},
        this.hasRequest = true

        this.facing = "6"

        this.pushability = 10
    }

    update (age) {
        this.frameUpdate()

        if (this.talking) {
            let icon = this.request.image
            if (this.mood === "found item") {
                if (Math.floor(age / 21) % 3 === 0) {
                    icon = "trade-rug"
                }
            }
            this.drawSpeechBubble(icon)
        }

        if (age % 33 === 0 || (this.mood === "found item" && age % 13 === 0)) {
            if (this.mood === "idle") {
                const foundPlayer = this.checkForPlayer()
            }

            if (this.mood === "found item" && !(
                this.position.x === this.tradePosition.x &&
                this.position.y === this.tradePosition.y
            )) {
                this.mood = "walking"
                this.walkTo(this.tradePosition, () => {
                    this.facing = "9"
                    this.mood = "idle"
                    this.talking = false
                    this.sprite.changeVersion(this.facing)
                })
            }

            if (
                this.mood === "found item" &&
                this.position.x === this.tradePosition.x &&
                this.position.y === this.tradePosition.y
            ) {
                game.setTimer(() => {
                const offer = game.checkGrid(
                    this.tradeRugPosition.x,
                    this.tradeRugPosition.y
                )
                if (offer && offer.name === this.request.name) {
                    offer.die()
                    this.jump()
                    game.setTimer(() => {
                        this.jump()
                        const blocker = game.checkGrid(
                            this.tradeRugPosition.x,
                            this.tradeRugPosition.y
                        )
                        if (blocker) {
                            blocker.move(0, -1)
                        }
                        // game.setTimer(() => {
                        // }, 0)
                        this.hasRequest = false
                        this.talking = false
                        this.mood = "idle"
                        game.setTimer(() => {
                            this.jump()
                            this.hasRequest = true
                            this.interaction = this.talk
                            new this.request.reward (
                                this.tradeRugPosition.x,
                                this.tradeRugPosition.y
                            )
                            this.mood = "idle"
                        }, 7)
                    }, 1)
                }
                }, 19)
            }
        }

        if (game.time % 1199 === 0) {
            if (this.mood === "idle") {
                this.mood = "walking"
                this.talking = false
                this.interaction = null
                this.walkTo(this.idlePositions[Math.floor(Math.random() * this.idlePositions.length)], () => {
                    this.loiter()
                    this.interaction = this.talk
                    this.mood = "idle"
                })
            }
            if (this.mood === "found item") {
                this.mood = "idle"
            }
        }
    }

    loiter () {
        if (this.mood !== "idle") {
            return false
        }
        const directions = [12, 3, 6, 9]
        game.setTimer(() => {
            if (this.mood !== "idle") {
                return false
            }
            this.facing = directions[Math.floor(Math.random() * 4)]
            this.sprite.changeVersion(this.facing)
        }, Math.floor(Math.random() * 60))
        this.facing = directions[Math.floor(Math.random() * 4)]
        this.sprite.changeVersion(this.facing)
        
        game.setTimer(() => {
            if (this.mood !== "idle") {
                return false
            }
            this.facing = directions[Math.floor(Math.random() * 4)]
            this.sprite.changeVersion(this.facing)
        }, 60 + Math.floor(Math.random() * 60))
        
        game.setTimer(() => {
            if (this.mood !== "idle") {
                return false
            }
            this.facing = directions[Math.floor(Math.random() * 4)]
            this.sprite.changeVersion(this.facing)
        }, 120 + Math.floor(Math.random() * 60))
    }w

    interaction () {
        this.talk()
    }

    talk () {
        this.jump()
        this.talking = true
        this.interaction = null
        game.setTimer(() => {
            this.talking = false
            this.interaction = this.talk
        }, 70)
    }

    jump () {
        let jumpNums = [
            0, -2, -3, -3, -3, -2, 0, 0, 0, 0, 0,
            0, -2, -3, -3, -3, -3, -3, -2, 0,
        ]
        for (let i = 0; i < jumpNums.length; i++) {
            game.setTimer(() => {
                this.spriteOffset.y = jumpNums[i] / 20
            }, i)
        }
    }
}

const makeBommakerSprite = () => {
    const bommakerSprite = new Sprite ("bommaker/6")

    bommakerSprite.addVersion("12", "bommaker/6")
    bommakerSprite.addVersion("3", "bommaker/6")
    bommakerSprite.addVersion("6", "bommaker/6")
    bommakerSprite.addVersion("9", "bommaker/6")
    
    bommakerSprite.addClockVersions("bommaker")

    return bommakerSprite
}

export { Bommaker }