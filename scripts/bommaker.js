import { Entity } from './entity.js';
import { Sprite } from './sprite.js';

import { Bomb } from './bomb.js';

import { utils } from './utils.js'

class Bommaker extends Entity {
    constructor(x, y) {
        super(x, y)
        this.sprite = makeBommakerSprite()
        this.name = "bommaker"
        this.baseMoveDelay = 15
        this.moveDelay = this.baseMoveDelay
        this.animal = true
        this.spawnPosition = {x: x, y: y}
        this.tradePosition = {x: 12, y: 16}
        this.tradeRugPosition = {x: 11, y: 16}
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
                if (Math.floor(game.time / 21) % 3 === 0) {
                    icon = "trade-rug"
                }
            }
            this.drawSpeechBubble(icon)
        }

        if (game.time % 33 === 0) {
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
                        const blocker = game.checkGrid(
                            this.tradeRugPosition.x,
                            this.tradeRugPosition.y
                        )
                        if (blocker) {
                            blocker.move(0, -1)
                        }
                        game.setTimer(() => {
                            new this.request.reward (
                                this.tradeRugPosition.x,
                                this.tradeRugPosition.y
                            )
                        }, 0)
                        this.hasRequest = false
                        this.talking = false
                        this.mood = "idle"
                        game.setTimer(() => {
                            this.hasRequest = true
                            this.interaction = this.talk
                        }, 66)
                    }, 12)
                }
                }, 19)
            }
        }
    }

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
            0, -2, -3, -2, 0, 0, 0, 0, 0,
            0, -2, -3, -3, -2, 0,
        ]
        for (let i = 0; i < jumpNums.length; i++) {
            game.setTimer(() => {
                this.spriteOffset.y = jumpNums[i] / 20
            }, i)
        }
    }
}

// const makeBommakerSprite = () => {
//     const bommakerSprite = new Sprite ("bommaker/6")

//     bommakerSprite.addVersion("12", "bommaker/6")
//     bommakerSprite.addVersion("3", "bommaker/6")
//     bommakerSprite.addVersion("6", "bommaker/6")
//     bommakerSprite.addVersion("9", "bommaker/6")

//     return bommakerSprite
// }

const makeBommakerSprite = () => {
    const golemerSprite = new Sprite ("golemer/3")
    golemerSprite.addVersion("12", "golemer/12")
    golemerSprite.addVersion("3", "golemer/3")
    golemerSprite.addVersion("6", "golemer/6")
    golemerSprite.addVersion("9", "golemer/9")

    golemerSprite.addClockVersions("golemer")

    return golemerSprite
}


export { Bommaker }