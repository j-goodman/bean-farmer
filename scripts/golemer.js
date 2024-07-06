import { Entity } from './entity.js';
import { Sprite } from './sprite.js';

import { WildCornItem } from './wildCornItem.js';
import { Hatchet } from './hatchet.js';
import { Emerald } from './emerald.js';
import { Ruby } from './ruby.js';
import { Bomb } from './bomb.js';
import { Sapphire } from './sapphire.js';
import { Mushroom } from './mushroom.js';

import { utils } from './utils.js'
import { WildOnion } from './wildOnion/wildOnion.js';
import { Wood } from './wood.js';

class Golemer extends Entity {
    constructor(x, y) {
        super(x, y)
        this.sprite = makeGolemerSprite()
        this.name = "golemer"
        this.baseMoveDelay = 15
        this.moveDelay = this.baseMoveDelay
        this.animal = true
        game.golemer = this
        this.hasRequest = true
        this.spawnPosition = {x: x, y: y}
        this.workPosition = {x: 11, y: 21}
        this.rewardPlaced = true
        this.mood = "idle"
        this.clockDirections = true
        this.currentAction = null
        this.unfreezable = true
        this.requestQueue = [
            // {name: "mushroom", image: "mushroom", reward: WildCornItem},
            {name: "emerald", image: "emerald", reward: Hatchet},
            {name: "dragonflower seed", image: "dragon-flower/seed", reward: Ruby},
            {name: "sulfur crystal", image: "sulfur-crystal", reward: Bomb},
            {name: "sapphire", image: "sapphire", reward: Emerald},
            // {name: "sulfur crystal", image: "sulfur-crystal", reward: Bomb},
            // {name: "wild onion", image: "wild-onion/bulb", reward: Mushroom},
            {name: "sulfur crystal", image: "sulfur-crystal", reward: Bomb},
            {name: "ruby", image: "ruby", reward: Sapphire},
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
        if (game.time === 99 && game.checkGrid(2, 15) && game.checkGrid(2, 15).name === "golemer") {
            location.reload()
        }
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
            this.drawSpeechBubble(icon)
        }
        if (age % 33 === 0) {
            if (this.mood === "idle" || this.mood === "found item") {
                if (age % (33 * 9) === 0 && this.hasRequest) {
                    this.interaction = this.talk
                }
                const foundPlayer = this.checkForPlayer()
                if (!foundPlayer) {
                    this.faceCauldron()
                }
                if (!(
                    this.position.x === this.workPosition.x &&
                    this.position.y === this.workPosition.y
                )) {
                    this.walkToWork()
                }
            }
        }
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
                if (!this.rewardPlaced) {
                    this.move(1, 0, () => {
                        this.move(1, 0, () => {
                            let target = {x: 13, y: 14}
                            let occupant = game.checkGrid(target.x, target.y)
                            if (occupant) {
                                occupant.move(1, 0)
                            }
                            game.addToGrid(
                                new this.requestQueue[this.requestIndex].reward (target.x, target.y)
                            )
                        })
                    })
                } else {
                    this.rewardPlaced = false
                }

                game.setTimer(() => {
                    this.walkToWork()
                    this.hasRequest = true
                    this.waitForPlayerToLeave(() => {
                        this.replaceReward()
                    })
                }, 15)

                game.setTimer(() => {
                    this.requestIndex += 1
                    while (this.requestIndex >= this.requestQueue.length) {
                        this.requestIndex -= this.requestQueue.length
                    }
                    this.request = this.requestQueue[this.requestIndex]
                }, 70)
            })
        }, 45)
    }

    replaceReward () {
        if (this.currentAction && this.currentAction !== `Walking to 2, 15.`) {
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
                this.rewardPlaced = true
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

game.constructors[Golemer.name] = Golemer
export { Golemer }