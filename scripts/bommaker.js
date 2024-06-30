import { Entity } from './entity.js';
import { Sprite } from './sprite.js';

import { Bomb } from './bomb.js';
import { ItemStack } from './itemStack.js';

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
        this.tradeRugPosition = {x: x + 7, y: y + 1}
        this.tradePosition = {x: x + 8, y: y + 1}
        this.idlePositions = [
            {x: 5, y: 8},
            {x: this.spawnPosition.x, y: this.spawnPosition.y},
            {x: this.tradePosition.x, y: this.tradePosition.y},
            {x: this.spawnPosition.x - 1, y: this.spawnPosition.y - 10},
            {x: this.spawnPosition.x + 43, y: this.spawnPosition.y + 10},
        ]
        this.mood = "idle"
        this.clockDirections = true
        this.currentAction = null

        this.request = {name: "sulfur crystal", image: "sulfur-crystal", reward: Bomb},
        this.secondRequest = {name: "smoky quartz", image: "smoky-quartz", reward: Bomb},
        this.hasRequest = true

        this.facing = "6"

        this.pushability = 10

        window.bom = this

        game.setTimer(() => {
            this.search(50)
        }, 100)
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

        if (age % 33 === 0) {
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
                const offer = game.checkGrid(
                    this.tradeRugPosition.x,
                    this.tradeRugPosition.y
                )
                if (offer && (
                    offer.name === this.request.name ||
                    offer.name === this.secondRequest.name
                )) {
                    offer.die()
                    this.jump()
                    const blocker = game.checkGrid(
                        this.tradeRugPosition.x,
                        this.tradeRugPosition.y
                    )
                    if (blocker) {
                        blocker.move(0, -1)
                    }
                    this.hasRequest = false
                    this.talking = false
                    this.mood = "idle"

                    this.jump()
                    this.hasRequest = true
                    this.interaction = this.talk

                    if (!(offer.name === this.secondRequest.name)) {
                        new this.request.reward (
                            this.tradeRugPosition.x,
                            this.tradeRugPosition.y
                        )
                    } else {
                        this.checkDrop(
                            new ItemStack (
                                this.tradeRugPosition.x,
                                this.tradeRugPosition.y,
                                Bomb,
                                "bomb",
                                6
                            ), "left"
                        )
                    }

                    this.mood = "idle"
                }
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
        }, Math.floor(Math.random() * 20))
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

    search (range=30) {
        console.log("Searching...")
        for (let x = this.position.x - range; x < this.position.x + range; x++) {
            for (let y = this.position.y - range; y < this.position.y + range; y++) {
                let square = game.checkGrid(
                    this.position.x + x,
                    this.position.y + y,
                    true
                )
                let item = square.occupant
                let floorItem = square.groundOccupant
                // if (item && item.name === "ore") {
                //     console.log(item)
                // }
                if (floorItem && floorItem.name === "trade rug") {
                    this.tradeRugPosition = {
                        x: floorItem.position.x,
                        y: floorItem.position.y
                    }
                    this.tradePosition = {
                        x: floorItem.position.x + 1,
                        y: floorItem.position.y
                    }
                }
            }
        }
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