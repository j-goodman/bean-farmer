import { Entity } from './entity.js';
import { Sprite } from './sprite.js';

import { IceSheet } from './iceSheet.js';

import { game } from './game.js';
import { utils } from './utils.js';

class SnowSnail extends Entity {
    constructor(x, y) {
        super(x, y)
        this.imageName = "snow-snail"
        this.baseMoveDelay = 19
        this.name = "snow snail"
        this.moveDelay = this.baseMoveDelay
        this.baseStrength = 4
        this.strength = this.baseStrength
        this.spawnPosition = {
            x: this.position.x,
            y: this.position.y
        }
        this.pushability = 4
        this.sprite = makeSnowSnailSprite()
        this.sprite.version = "right"
        this.direction = "right"
        this.animal = true
        this.mood = "idle"
        this.anger = 0
        this.charging = false
        this.targetPositions = []
        this.target = null
        this.attacking = false
        this.health = 5
        this.update4DirectionSprite()
        this.birthday -= utils.dice(112)
        this.range = 4 + utils.dice(5)
    }

    onMove () {
        game.setTimer(() => {
            let ice = new IceSheet (this.position.x, this.position.y, "ground")
            game.setTimer(() => {
                ice.die()
            }, 10800 + utils.dice(150))
        }, 12)
    }

    checkForRange () {
        if (utils.distanceBetweenSquares(this.spawnPosition, this.position) > this.range) {
            this.mood = "walking"
            console.log("Better start back.")
            this.walkTo(this.spawnPosition, () => {
                this.mood = "idle"
            })
        }
    }

    spreadIce () {
        let ditch = 0
        let destination = {
            x: this.position.x,
            y: this.position.y
        }
        while (ditch < 5 && (
            game.checkGrid(destination.x, destination.y) ||
            (
                game.checkGrid(destination.x, destination.y, true).floorOccupant &&
                game.checkGrid(destination.x, destination.y, true).floorOccupant.name === "ice sheet"
            )
        )) {
            destination = {
                x: this.position.x + utils.dice(13) - 7,
                y: this.position.y + utils.dice(13) - 7
            }
            ditch += 1
        }

        this.mood = "walking"
        this.walkTo({x: destination.x, y: destination.y}, () => {
            this.mood = "idle"
            // game.setTimer(() => {
                // Check for a non-icy adjacent square and move to it if there is one
            // }, 30)
        })
    }

    update (age) {
        this.frameUpdate()
        if (this.mood === "idle" && age % 112 === 0) {
            this.spreadIce()
        }
        if (age % 251 === 0) {
            this.checkForRange()
        }
        if (age % 28 === 0) {
            this.check()
        }
        if (age % 1800 === 0) {
            this.mood = "idle"
        }
        if (age % 7 === 0 && this.mood === "hostile") {
            if (!this.target) {
                this.mood = "idle"
                return false
            }
            this.targetPositions.push(this.target.position)
            if (this.targetPositions.length > 2) {
                this.targetPositions.shift()
            }
            if (!this.attacking) {
                this.attack()
            }
        }
    }

    check () {
        // if (utils.distanceBetweenSquares(this.position, game.player.position) < 3) {
        //     this.mood = "hostile"
        //     this.target = game.player
        //     this.anger = 3
        // } else {
        //     this.anger -= 1
        //     if (this.anger < 1) {
        //         this.mood = "idle"
        //     }
        // }
    }

    attack () {
        this.attacking = true
        this.sprite.changeVersion("charging")
        game.setTimer(() => {
            console.log(`Striking at ${this.target.name}!`)
        }, 20)
    }
}

const makeSnowSnailSprite = () => {
    const snowSnailSprite = new Sprite ("snow-snail")

    snowSnailSprite.addVersion("down", "snow-snail")
    snowSnailSprite.addVersion("left", "snow-snail")
    snowSnailSprite.addVersion("up", "snow-snail")
    snowSnailSprite.addVersion("right", "snow-snail")

    snowSnailSprite.addVersion("charging", "rock-connections/X")

    return snowSnailSprite
}

export { SnowSnail }