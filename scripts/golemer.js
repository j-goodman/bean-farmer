import { Entity } from './entity.js';
import { Sprite } from './sprite.js';

import { WildCornItem } from './wildCornItem.js';
import { Hatchet } from './hatchet.js';
import { Emerald } from './emerald.js';
import { Ruby } from './ruby.js';
import { Sapphire } from './sapphire.js';
import { Mushroom } from './mushroom.js';

import { utils } from './utils.js'

class Golemer extends Entity {
    constructor(x, y) {
        super(x, y)
        this.sprite = makeGolemerSprite()
        this.name = "golemer"
        this.baseMoveDelay = 17
        this.moveDelay = this.baseMoveDelay
        this.animal = true
        if (game.golemer) {
            game.golemer.die()
            console.log("Second golemer.")
        }
        game.golemer = this
        this.hasRequest = true
        this.spawnPosition = {x: x, y: y}
        this.workPosition = {x: 11, y: 21}
        this.mood = "idle"
        this.clockDirections = true
        this.currentAction = null
        this.requestQueue = [
            {name: "mushroom", image: "mushroom", reward: WildCornItem},
            {name: "emerald", image: "emerald", reward: Hatchet},
            {name: "dragonflower seed", image: "dragon-flower/seed", reward: Sapphire},
            {name: "sulfur crystal", image: "sulfur-crystal", reward: Mushroom},
            {name: "ruby", image: "ruby", reward: Emerald},
            {name: "wild onion", image: "wild-onion/bulb", reward: Mushroom},
            {name: "sapphire", image: "sapphire", reward: Ruby},
        ]
        this.requestIndex = 0
        this.request = this.requestQueue[this.requestIndex]

        this.facing = "right"
        this.sprite.changeVersion("5")

        this.pushability = 10
        this.text = "Ahoj, blobb."
        this.walkToWork()
    }

    update (age) {
        if (this.movable) {
            this.frameUpdate()
        }
        if (this.talking) {
            const tileSize = game.tileSize
            let icon = this.request.image
            if (this.mood === "found item") {
                if (Math.floor(game.time / 21) % 3 === 0) {
                    icon = "cauldron"
                }
            }
            game.ctx.drawImage(
                game.images["speech-bubble"],
                (this.spritePosition.x + this.spriteOffset.x - game.viewport.origin.x) * tileSize - 97,
                (this.spritePosition.y + this.spriteOffset.y - game.viewport.origin.y) * tileSize - 226,
                tileSize * 1.65,
                tileSize * 1.65
            )
            game.ctx.drawImage(
                game.images[icon],
                (this.spritePosition.x + this.spriteOffset.x - game.viewport.origin.x) * tileSize - 54,
                (this.spritePosition.y + (this.spriteOffset.y * 1.5) - game.viewport.origin.y) * tileSize - 216,
                tileSize * .9,
                tileSize * .9
            )
        }
        if (age % 33 === 0) {
            if (this.mood === "idle" || this.mood === "found item") {
                if (this.hasRequest) {
                    this.interaction = this.talk
                }
                this.checkForPlayer()
                if (!(
                    this.position.x === this.workPosition.x &&
                    this.position.y === this.workPosition.y
                )) {
                    this.walkToWork()
                }
            }
        }
    }

    checkForPlayer () {
        if (utils.distanceBetweenSquares(this.position, game.player.position) < 6) {
            this.checkForRequest()
            const angle = utils.angleBetweenSquares(this.position, game.player.position, true)
            const direction = utils.degreesToAngle(angle)
            this.facing = direction
            const clockDir = utils.degreesToClock(angle)
            this.sprite.changeVersion(clockDir)
        } else {
            this.faceCauldron()
        }
    }

    checkForRequest () {
        if (!this.hasRequest) {
            return false
        }
        let scannedItems = this.findPath({x: this.position.x + 2, y: this.position.y}, true)
        scannedItems.forEach(item => {
            if (
                (item && item.name === this.request.name) ||
                (item.name === "player" && item.equipped && item.equipped.name === this.request.name)
            ) {
                this.mood = "found item"
                this.interaction = null
                this.talking = true
                this.jump()
            }
        })
    }

    faceCauldron () {
        this.facing = "down"
        if (this.position.x === this.workPosition.x && this.position.y === this.workPosition.y) {
            this.sprite.changeVersion("4")
        }
    }

    giveReward () {
        if (this.currentAction && this.currentAction !== `Walking to 10, 14.`) {
            game.setTimer(() => {
                this.giveReward()
            }, 66)
            return false;
        }
        this.talking = false;
        this.jump()
        this.mood = "walking"
        this.hasRequest = false
        game.setTimer(() => {
            this.walkTo({x: 10, y: 14}, () => {
                this.facing = "right"
                this.sprite.changeVersion(3)
                let door = game.checkGrid(11, 14)
                if (door && door.locked) {
                    game.setTimer(() => {
                        door.unlock()
                    }, 12)
                }
                game.setTimer(() => {
                    this.walkToWork()
                    this.waitForPlayerToLeave(() => {
                        this.replaceReward()
                    })
                }, 15)
            })
        }, 45)
    }

    replaceReward () {
        if (this.currentAction && this.currentAction !== `Walking to 2, 15.`) {
            console.log("Not yet...")
            game.setTimer(() => {
                this.replaceReward()
            }, 202)
            return false
        }
        this.mood = "walking"
        console.log("Here I go...")
        this.walkTo({x: 12, y: 14}, () => {
            this.facing = "right"
            this.sprite.changeVersion("3")
            this.requestIndex += 1
            while (this.requestIndex >= this.requestQueue.length) {
                this.requestIndex -= this.requestQueue.length
            }
            let target = {x: 13, y: 14}
            let occupant = game.checkGrid(target.x, target.y)
            if (occupant) {
                occupant.move(1, 0)
            }
            game.setTimer(() => {
                occupant = game.checkGrid(target.x, target.y)
                if (occupant && occupant.name !== "hatchet") {
                    occupant.die()
                }
                game.addToGrid(
                    new this.requestQueue[this.requestIndex].reward (target.x, target.y)
                )
            }, 3)
            game.setTimer(() => {
                this.walkTo({x: 10, y: 14}, () => {
                    let door = game.checkGrid(11, 14, true).groundOccupant
                    this.facing = "right"
                    this.sprite.changeVersion("3")
                    if (door && typeof door.lock === "function") {
                        game.setTimer(() => {
                            door.lock()
                        }, 12)
                    }
                    game.setTimer(() => {
                        this.walkToWork()
                    }, 23)
                })
            }, 9)
            while (this.requestIndex >= this.requestQueue.length) {
                this.requestIndex -= this.requestQueue.length
            }
            this.request = this.requestQueue[this.requestIndex]
            this.hasRequest = true
        })
    }

    waitForPlayerToLeave (callback) {
        if (utils.distanceBetweenSquares(this.position, game.player.position) > 28) {
        // if (utils.distanceBetweenSquares(this.position, game.player.position) > 8) {
            callback()
        } else {
            game.setTimer(() => {
                this.waitForPlayerToLeave(callback)
            }, 200)
        }
    }
        
    walkToWork () {
        this.mood = "walking"
        this.interaction = null
        setTimeout(() => {
            this.walkTo(this.workPosition, () => {
                this.mood = "idle"
                this.talking = false
                if (
                    this.hasRequest &&
                    this.position.x === this.workPosition.x &&
                    this.position.y === this.workPosition.y
                ) {
                    if (this.hasRequest) {
                        this.interaction = this.talk
                    }
                }
                this.faceCauldron()
            })
        }, 1200 + utils.dice(400))
    }

    talk () {
        if (!this.talking) {
            this.jump()
            this.interaction = null
            this.talking = true
            game.setTimer(() => {
                if (this.hasRequest) {
                    this.interaction = this.talk
                }
                this.talking = false
            }, 70)
        }
    }

    jump () {
        let jumpNums = [
            0, -3, -5, -6, -7, -6, -5, -3, 0,
            0, -3, -5, -6, -6, -5, -3, 0
        ]
        for (let i = 0; i < jumpNums.length; i++) {
            game.setTimer(() => {
                this.spriteOffset.y = jumpNums[i] / 20
            }, i)
        }
    }
}

const makeGolemerSprite = () => {
    const golemerSprite = new Sprite ("golemer/3")
    golemerSprite.addVersion("12", "golemer/12")
    golemerSprite.addVersion("3", "golemer/3")
    golemerSprite.addVersion("6", "golemer/6")
    golemerSprite.addVersion("9", "golemer/9")

    golemerSprite.addClockVersions("golemer")

    return golemerSprite
}


export { Golemer }