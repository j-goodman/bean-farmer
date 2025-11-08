import { Entity } from './entity.js';
import { Sprite } from './sprite.js';

import { WildCornItem } from './wildCornItem.js';
import { PigLilyItem } from './pigLilyItem.js';
import { Hatchet } from './hatchet.js';
import { Emerald } from './emerald.js';
import { Key } from './key.js';
import { Telescope } from './telescope.js';
import { Ruby } from './ruby.js';
import { Bomb } from './bomb.js';
import { Sapphire } from './sapphire.js';
import { Mushroom } from './mushroom.js';

import { fireballSpell } from './fireballSpell.js'

import { utils } from './utils.js'
import { WildOnion } from './wildOnion/wildOnion.js';
import { Wood } from './wood.js';
import { Fire } from './fire.js';
import { SmokyQuartz } from './smokyQuartz.js';
import { PowderBomb } from './powderBomb.js';

class Golemer extends Entity {
    constructor(x, y) {
        super(x, y)
        this.sprite = makeGolemerSprite()
        this.name = "necromancer"
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
        this.patience = 2
        this.requestQueue = [
            {name: "smoky quartz", image: "smoky-quartz", reward: Key},
            {name: "emerald", image: "emerald", reward: Hatchet},
            {name: "broken glasses", image: "glasses", reward: Key},
            {name: "ruby", image: "ruby", reward: Telescope},
            {name: "sapphire", image: "sapphire", reward: Key},
            {name: "dragonflower seed", image: "dragon-flower/seed", reward: Ruby},
            {name: "sulfur crystal", image: "sulfur-crystal", reward: Sapphire},
            {name: "wild onion", image: "wild-onion/bulb", reward: Emerald},
            {name: "snail egg", image: "snail-egg", reward: SmokyQuartz},
        ]
        this.secondRequestQueue = [
            {name: "bone shards", image: "bone-shards", reward: PowderBomb},
        ]
        this.requestIndex = 0
        this.request = this.requestQueue[this.requestIndex]
        this.wearingGlasses = false

        this.facing = "right"
        this.sprite.changeVersion("5")
        
        this.pushability = 10
        this.text = "Ahoj, skelli."
        game.setTimer(() => {
            this.facing = this.direction = "down"
            this.sprite.changeVersion("6")
            this.move(0, 1)
        }, 45)
        game.setTimer(() => {
            this.walkToWork()
        }, 85)
    }

    update (age) {
        if (age % 150 === 0) {
            if (
                !this.rewardPlaced && 
                utils.distanceBetweenSquares(this.position, game.player.position) > 28 &&
                this.mood === "idle"
            ) {
                this.replaceReward()
            }
            if (!this.wearingGlasses && this.requestIndex > 2 && !utils.isInViewport(this.position)) {
                this.sprite = makeGolemerWithGlassesSprite()
                this.wearingGlasses = true
            }
        }
        if (game.time === 99 && game.checkGrid(2, 15) && game.checkGrid(2, 15).name === "golemer") {
            // location.reload()
            // game.setTimer(() => {
                // game.player.playAnimationOnce("spawn")
            // }, 0)
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
        if (age % (30 * 13) === 0) {
            this.checkForIntruders()
        }
        if (age % 33 === 0) {
            if (this.mood === "idle" || this.mood === "found item") {
                if (age % (33 * 9) === 0 && this.hasRequest) {
                    this.interaction = this.talk
                    this.talking = false
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

    onDeath () {
        let obstacle = game.checkGrid(64, -6)
        if (obstacle) {
            obstacle.die()
        }
        game.player.spawnPosition = {x: 64, y: -6}
    }

    onHit (attacker) {
        this.patience -= 1
        if (this.patience <= 0) {
            this.patience = 2
            this.jump()
            game.setTimer(() => {
                if (attacker && attacker.name === "boomerang") {
                    return false
                }
                if (attacker && attacker.die) {
                    attacker.die()
                    attacker.checkDrop(new Fire ())
                    attacker.checkDrop(new Fire ())
                    attacker.checkDrop(new Fire ())
                }
            }, 10)
        }
    }

    onCut (attacker) {
        this.onHit(attacker)
    }

    checkForIntruders () {
        let attacked = false
        let queued = false
        for (let x = -8; x < 8; x++) {
            for (let y = -6; y < 6; y++) {            
                const item = game.checkGrid(this.position.x + x, this.position.y + y)
                if (item && item.name && ["snowsnail", "cactus"].includes(item.name)) {
                    if (attacked && !queued) {
                        queued = true
                        game.setTimer(() => {
                            this.checkForIntruders()
                        }, 45 + utils.dice(45))
                    } else if (!attacked) {
                        attacked = true
                        fireballSpell(this, {
                            x: this.position.x + x,
                            y: this.position.y + y
                        })
                    }
                }
            }
        }
    }

    giveReward () {
        game.givePoints(25, {position: {x: this.workPosition.x + 1, y: this.workPosition.y}})
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
                }, 15)

                game.setTimer(() => {
                    this.requestIndex += 1
                    while (this.requestIndex >= this.requestQueue.length) {
                        this.requestIndex -= this.requestQueue.length
                        this.requestQueue = this.secondRequestQueue
                    }
                    this.request = this.requestQueue[this.requestIndex]
                }, 70)
            })
        }, 45)
    }

    replaceReward () {
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
                if (occupant && occupant.name !== "axe") {
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

    // waitForPlayerToLeave (callback) {
    //     if (utils.distanceBetweenSquares(this.position, game.player.position) > 28) {
    //     // if (utils.distanceBetweenSquares(this.position, game.player.position) > 8) {
    //         callback()
    //     } else {
    //         game.setTimer(() => {
    //             this.waitForPlayerToLeave(callback)
    //         }, 200)
    //     }
    // }
        
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
        this.request = this.requestQueue[this.requestIndex]
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

const makeGolemerWithGlassesSprite = () => {
    const sprite = new Sprite ("golemer-with-glasses/6")
    
    sprite.addClockVersions("golemer-with-glasses")
    return sprite
}

game.constructors[Golemer.name] = Golemer
export { Golemer }