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
        this.clockDirections = true
        this.sprite = makeSnowSnailSprite()
        this.sprite.version = "3"
        this.direction = "right"
        this.animal = true
        this.mood = "idle"
        this.fear = 0
        this.defending = false
        this.targetPositions = []
        this.target = null
        this.defending = false
        this.health = 5
        // this.update4DirectionSprite()
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

        if (age % 7 === 0 && this.mood === "defensive") {
            if (!this.target) {
                this.mood = "idle"
                return false
            }
            this.targetPositions.push(this.target.position)
            if (this.targetPositions.length > 2) {
                this.targetPositions.shift()
            }
            // if (!this.defending) {
            //     this.defend()
            // }
        }
    }

    check () {
        if (utils.distanceBetweenSquares(this.position, game.player.position) < 3) {
            // this.mood = "defensive"
            this.target = game.player
            this.fear = 3
        } else {
            this.fear -= 1
            if (this.fear < 1) {
                this.mood = "idle"
            }
        }
    }

    defend () {
        console.log("Defend.")
        this.defending = true
        this.sprite.changeVersion("defending")
        this.immobilized = true
        game.setTimer(() => {
            this.immobilized = false
            this.mood = "idle"
        }, 90)
    }
}

const makeSnowSnailSprite = () => {
    const snowSnailSprite = new Sprite ("snow-snail/6")

    snowSnailSprite.addClockVersions("snow-snail")

    snowSnailSprite.addVersion("defending", "snow-snail/shell")

    return snowSnailSprite
}

game.constructors[SnowSnail.name] = SnowSnail
export { SnowSnail }