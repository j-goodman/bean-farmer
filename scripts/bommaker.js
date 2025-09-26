import { Entity } from './entity.js';
import { Sprite } from './sprite.js';

import { Bomb } from './bomb.js';
import { ItemStack } from './itemStack.js';

import { utils } from './utils.js'
import { PowderBomb } from './powderBomb.js';

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
        this.timeSinceLastTrade = 0
        this.idlePositions = [
            // {x: 5, y: 8},
            {x: this.spawnPosition.x, y: this.spawnPosition.y},
            {x: this.tradePosition.x, y: this.tradePosition.y},
            {x: this.spawnPosition.x - 1, y: this.spawnPosition.y - 10},
            // {x: this.spawnPosition.x + 43, y: this.spawnPosition.y + 10},
        ]
        this.mood = "idle"
        this.clockDirections = true
        this.currentAction = null

        this.request = {name: "sulfur crystal", image: "sulfur-crystal", reward: Bomb},
        this.secondRequest = {name: "smoky quartz", image: "smoky-quartz", reward: Bomb},
        this.thirdRequest = {name: "meteor crystal", image: "meteor-crystal", reward: Bomb},
        this.hasRequest = true

        this.facing = "6"

        this.pushability = 10

        game.setTimer(() => {
            this.search(50)
        }, 100)
    }

    update (age) {
        this.frameUpdate()
        this.timeSinceLastTrade += 1
        
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
            
            if (this.mood === "found item" && this.checkIfPlayerHas("smoky quartz")) {
                this.request.image = "smoky-quartz"
                game.setTimer(() => {
                    this.request.image = "sulfur-crystal"
                }, 45)
            }
            
            if (
                this.mood === "found item" &&
                this.checkIfPlayerHas("meteor crystal") &&
                Math.floor(game.time / 45) % 6 === 0
            ) {
                this.request.image = "meteor-crystal"
                game.setTimer(() => {
                    this.request.image = "sulfur-crystal"
                }, 45)
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
                    offer.name === this.secondRequest.name ||
                    offer.name === this.thirdRequest.name
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

                    this.timeSinceLastTrade = 0
                    if (!(offer.name === this.secondRequest.name) && !(offer.name === this.thirdRequest.name)) {
                        game.givePoints(1, {position: this.tradeRugPosition})
                        new this.request.reward (
                            this.tradeRugPosition.x,
                            this.tradeRugPosition.y
                        )
                    } else {
                        if (offer.name === this.thirdRequest.name) {
                            game.givePoints(12, {position: this.tradeRugPosition})
                            this.checkDrop(
                                new PowderBomb (
                                    this.tradeRugPosition.x,
                                    this.tradeRugPosition.y,
                                ), "left"
                            )
                        } else {
                            game.givePoints(6, {position: this.tradeRugPosition})
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
                    }

                    this.mood = "idle"
                }
            }
        }

        if (game.time % 3600 === 0) {
            this.interaction = this.talk
            this.mood = "idle"
            this.currentAction = null
            this.currentDestination = null
            this.currentWalk = null
        }

        if (game.time % 1199 === 0 && this.timeSinceLastTrade > 240) {
            this.interaction = this.talk
            
            if (this.mood === "idle") {
                this.mood = "walking"
                this.talking = false
                // this.interaction = null
                this.walkTo(this.idlePositions[Math.floor(Math.random() * this.idlePositions.length)], () => {
                    this.loiter()
                    this.interaction = this.talk
                    this.mood = "idle"
                })
            } else {
                this.interaction = this.talk
            }
            
            if (this.mood === "found item") {
                this.mood = "idle"
            }
        }
    }

    checkIfPlayerHas (searchName) {
        const itemNames = game.player.items.map(item => {
            return item.name
        })
        return itemNames.includes(searchName)
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

    search (range=30) {
        for (let x = this.position.x - range; x < this.position.x + range; x++) {
            for (let y = this.position.y - range; y < this.position.y + range; y++) {
                let square = game.checkGrid(
                    this.position.x + x,
                    this.position.y + y,
                    true
                )
                let item = square.occupant
                let floorItem = square.groundOccupant
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

    bommakerSprite.addClockVersions("bommaker")

    return bommakerSprite
}

game.constructors[Bommaker.name] = Bommaker
export { Bommaker }