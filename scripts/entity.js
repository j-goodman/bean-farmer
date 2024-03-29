import { Sprite } from './sprite.js';

import { game } from './game.js';
import { utils } from './utils.js';

class Entity {
    constructor (x, y, elevation, dna) {
        this.position = {
            x: x,
            y: y
        }
        this.spritePosition = {
            x: x,
            y: y
        }
        this.spriteOffset = {
            x: 0,
            y: 0
        }
        this.exists = true
        this.baseMoveDelay = 12
        this.moveDelay = this.baseMoveDelay
        this.baseStrength = 1
        this.strength = this.baseStrength
        this.elevation = elevation
        this.pushability = 7
        this.breakability = 9
        this.direction = "down"
        this.movable = true
        this.birthday = game.time
        this.id = game.assignId()
        if (dna) {
            this.dna = JSON.parse(JSON.stringify(dna));
        } else {
            this.dna = {}
        }
        game.setTimer(() => {
            this.createSelf(x, y)
        }, 0)
    }
    
    createSelf (x, y) {
        game.addToGrid(this, x, y, this.elevation)
    }

    move (x, y, callback) {
        if (!this.exists) {
            return false
        }
        let obstacle = game.checkGrid(this.position.x + x, this.position.y + y)
        if (!obstacle) {
            game.addToGrid(null, this.position.x, this.position.y)
            this.position.x += x
            this.position.y += y
            game.addToGrid(this, this.position.x, this.position.y)
            if (callback) {
                game.setTimer(() => callback(), this.moveDelay)
            }
            return true
        } else {
            if (obstacle.onTouch) { obstacle.onTouch(this) }
            if (obstacle.pushability <= this.strength && obstacle.pushability < obstacle.breakability) {
                this.push(obstacle, x, y)
                if (callback) {
                    game.setTimer(() => callback(), this.moveDelay)
                }
            } else {
                if (callback) { callback() }
            }
            return false
        }
    }

    moveThroughAir (x, y) {
        game.addToGrid(null, this.position.x, this.position.y, "air")
        this.position.x += x
        this.position.y += y
        game.addToGrid(this, this.position.x, this.position.y, "air")
    }

    push (obstacle, x, y) {
        obstacle.strength = this.strength * 0.75
        obstacle.moveDelay = this.moveDelay
        let success = obstacle.move(x, y, () => {
            obstacle.moveDelay = obstacle.baseMoveDelay
            obstacle.strength = obstacle.baseStrength
        })
        if (success) {
            if (obstacle.onPush) { obstacle.onPush(x, y) }
            this.move(x, y)
        }
    }

    moveToGround () {
        console.log("Move to ground.")
        console.log(this)
        const square = game.checkGrid(this.position.x, this.position.y, true)
        if (square.occupant === this) {
            square.occupant = null
        }
        square.groundOccupant = this
    }

    moveFromGround () {
        const square = game.checkGrid(this.position.x, this.position.y, true)
        this.elevation = null
        if (!square.occupant) {
            square.groundOccupant = null
            square.occupant = this
            return true
        } else {
            return false
        }
    }

    hit (obstacle) {
        if (obstacle.onHit) {
            obstacle.onHit(this)
        }
        if (obstacle.breakability <= this.strength) {
            obstacle.break(this)
        }
    }

    break (breaker, x, y) {
        if (this.onBreak) {
            this.onBreak(breaker, x, y)
        } else {
            this.die()
        }
    }

    update () {
        if (!this.elevation) {
            if (this.exists && game.checkGrid(this.position.x, this.position.y) !== this) {
                console.log("Object missing from grid, adding.")
                console.log(this)
                game.addToGrid(this, this.position.x, this.position.y)
            }
        } else {
            if (this.exists && game.checkGrid(this.position.x, this.position.y, true)[`${this.elevation}Occupant`] !== this) {
                game.addToGrid(this, this.position.x, this.position.y, this.elevation)
            }
        }
        if (this.movable) {
            this.frameUpdate()
        }
    }

    update4DirectionSprite () {
        this.sprite.changeVersion(this.direction)
    }

    die () {
        this.exists = false
        if (this.elevation === "ground") {
            game.grid[this.position.x][this.position.y].groundOccupant = null
        } else if (this.elevation === "air") {
            game.grid[this.position.x][this.position.y].airOccupant = null
        } else {
            game.grid[this.position.x][this.position.y].occupant = null
        }

        if (this.pipeConnection) {
            this.connectNeighbors()
        }
        
        if (this.onDeath) { this.onDeath() }
    }

    checkDrop (item) {
        game.setTimer(() => {
            if (game.checkGrid(item.position.x, item.position.y) === item) {
                return true
            } else {
                const directions = ["up", "right", "down", "left"]
                for (let i = 0; i < 4; i++) {
                    console.log(`Trying ${directions[i]}.`)
                    const offset = utils.directionToCoordinates(directions[i])
                    if (!game.checkGrid(
                        this.position.x + offset.x,
                        this.position.y + offset.y
                    )) {
                        item.position.x = this.position.x + offset.x
                        item.position.y = this.position.y + offset.y
                        item.spritePosition.x = item.position.x
                        item.spritePosition.y = item.position.y
                        game.addToGrid(item, item.position.x, item.position.y)
                        break
                    }
                }   
            }
        }, 0)
    }

    redistributeSoilToxicity () {
        let sum = 0
        let count = 0
        let squares = []
        for (let x = this.position.x - 2; x < this.position.x + 3; x++) {
            for (let y = this.position.y - 2; y < this.position.y + 3; y++) {
                const distance = utils.distanceBetweenSquares({x: this.position.x, y: this.position.y}, {x: x, y: y})
                if (distance <= 2.5) {
                    const square = game.checkGrid(x, y, true)
                    sum += game.checkGrid(x, y, true).soilToxicity
                    count += 1
                    squares.push(square)
                }
            }
        }
        const mean = sum / count
        squares.forEach(square => {
            const roll = utils.dice(3)
            if (roll === 1) {
                square.soilToxicity = (square.soilToxicity + square.soilToxicity + mean) / 3
            } else if (roll === 2) {
                square.soilToxicity = (square.soilToxicity + square.soilToxicity + square.soilToxicity + square.soilToxicity + mean) / 5
            }
        })
    }
    
    redistributeSoilHealth () {
        let sum = 0
        let count = 0
        let squares = []
        let range = 2
        if (utils.dice(3) === 3) {
            range = utils.dice(5)
        }
        for (let x = this.position.x - range; x <= this.position.x + range; x++) {
            for (let y = this.position.y - range; y <= this.position.y + range; y++) {
                const distance = utils.distanceBetweenSquares({x: this.position.x, y: this.position.y}, {x: x, y: y})
                if (distance <= range + 0.5) {
                    const square = game.checkGrid(x, y, true)
                    sum += game.checkGrid(x, y, true).soilHealth
                    count += 1
                    squares.push(square)
                }
            }
        }
        const mean = sum / count
        squares.forEach(square => {
            const roll = utils.dice(2)
            if (roll === 1) {
                square.soilHealth = (square.soilHealth + mean) / 2
            } else if (roll === 2) {
                square.soilHealth = (square.soilHealth + square.soilHealth + mean) / 3
            }
        })
    }

    frameUpdate () {
        let diagonal = this.spritePosition.x !== this.position.x && this.spritePosition.y !== this.position.y
        let xDirection = 0
        let yDirection = 0

        if (diagonal) {
            xDirection = this.spritePosition.x < this.position.x ? 1 : -1
            yDirection = this.spritePosition.y < this.position.y ? 1 : -1
            xDirection = this.spritePosition.x === this.position.x ? 0 : xDirection
            yDirection = this.spritePosition.y === this.position.y ? 0 : yDirection
        }
        
        if (this.spritePosition.x < this.position.x) {
            this.spritePosition.x += (1 / this.moveDelay)
        } else if (this.spritePosition.x > this.position.x) {
            this.spritePosition.x -= (1 / this.moveDelay)
        }

        if (this.spritePosition.y < this.position.y) {
            this.spritePosition.y += (1 / this.moveDelay)
        } else if (this.spritePosition.y > this.position.y) {
            this.spritePosition.y -= (1 / this.moveDelay)
        }

        if (
            this.position.x !== this.spritePosition.x ||
            this.position.y !== this.spritePosition.y
        ) {
            this.checkForSpriteCollisions()
        }

        this.spritePosition.x = Math.round(this.spritePosition.x / (1 / this.moveDelay)) * (1 / this.moveDelay)
        this.spritePosition.y = Math.round(this.spritePosition.y / (1 / this.moveDelay)) * (1 / this.moveDelay)
    }

    playAnimationOnce (version, callback) {
        let current = this.sprite.version
        this.sprite.changeVersion(version)
        this.sprite.onAnimationFinish = () => {
            this.sprite.changeVersion(current)
            this.update4DirectionSprite()
            if (callback) { callback() }
        }
    }

    playOverlayAnimation (sprite, version) {
        this.overlayExists = true
        this.overlayCycle = 0
        this.overlay = sprite.versions[version]
    }

    checkForSpriteCollisions () {
        let min = {
            x: Math.floor(this.spritePosition.x) - 1,
            y: Math.floor(this.spritePosition.y) - 1
        }
        let max = {
            x: Math.ceil(this.spritePosition.x) + 1,
            y: Math.ceil(this.spritePosition.y) + 1
        }

        let entities = []
        for (let x = min.x; x <= max.x; x++) {
            for (let y = min.y; y <= max.y; y++) {
                let occupant = game.checkGrid(x, y)
                if (occupant) {
                    entities.push(occupant)
                }
            }
        }

        for (let a = 0; a < entities.length - 1; a++) {
            for (let b = a + 1; b < entities.length; b++) {
                let eA = entities[a]
                let eB = entities[b]
                let collide = utils.checkForSpriteCollision(eA, eB)
                if (collide.x === -1) {
                    eA.spritePosition.x -= (1 / eA.moveDelay)
                    eB.spritePosition.x += (1 / eB.moveDelay)
                }
                if (collide.x === 1) {
                    eA.spritePosition.x += (1 / eA.moveDelay)
                    eB.spritePosition.x -= (1 / eB.moveDelay)
                }
                if (collide.y === -1) {
                    eA.spritePosition.y -= (1 / eA.moveDelay)
                    eB.spritePosition.y += (1 / eB.moveDelay)
                }
                if (collide.y === 1) {
                    eA.spritePosition.y += (1 / eA.moveDelay)
                    eB.spritePosition.y -= (1 / eB.moveDelay)
                }
            }
        }
    }
    
    burn () {
        game.checkGrid(this.position.x, this.position.y, true).soilHealth += 0.05
        this.redistributeSoilHealth()
        if (this.onHit) { this.onHit() }
        if (!this.animal) {
            this.burnability -= 1
            if (this.burnability <= 0) {
                this.die()
            }
        }
    }

    pipeConnect () {
        let directions = [
            {x: 0, y: -1},
            {x: 1, y: 0},
            {x: 0, y: 1},
            {x: -1, y: 0},
        ]
        let directionNames = ["U", "R", "D", "L"]
        let spriteName = ""
        directions.forEach((coord, i) => {
            const neighbor = game.checkGrid(
                this.position.x + coord.x,
                this.position.y + coord.y
            )
            if (neighbor && neighbor.name === this.name) {
                spriteName += directionNames[i]
            }
        })
        if (
            spriteName === "URDL" &&
            this.sprite.versions["URDL2"] &&
            (this.position.x - this.position.y) % 4 === 0
            && (this.position.x + this.position.y) % 3 !== 0
        ) {
            spriteName = "URDL2"
        }
        if (
            spriteName === "URDL" &&
            this.sprite.versions["URDL2"] &&
            (this.position.x + this.position.y) % 3 === 0
        ) {
            spriteName = "URDL3"
        }
        if (spriteName === "") { spriteName = "X" }
        this.sprite.changeVersion(spriteName)
    }

    connectNeighbors () {
        let directions = [
            {x: 0, y: -1},
            {x: 1, y: 0},
            {x: 0, y: 1},
            {x: -1, y: 0},
        ]
        directions.forEach((coord, i) => {
            const neighbor = game.checkGrid(
                this.position.x + coord.x,
                this.position.y + coord.y
            )
            if (neighbor && neighbor.name === this.name) {
                neighbor.pipeConnect()
            }
        })
    }
}

export { Entity }