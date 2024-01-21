import { game } from './game.js';

class Entity {
    constructor (imageName, x, y) {
        this.position = {
            x: x,
            y: y
        }
        this.spritePosition = {
            x: x,
            y: y
        }
        this.imageName = imageName
        this.baseMoveDelay = 12
        this.moveDelay = this.baseMoveDelay
        this.baseStrength = 1
        this.strength = this.baseStrength
        this.pushability = 7
        this.breakability = 7
        this.direction = "down"
        this.movable = true
        this.birthday = game.time
        this.id = game.assignId()
        game.addToGrid(this, x, y)
    }

    move (x, y, callback) {
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
            if (obstacle.pushability <= this.strength && obstacle.pushability < obstacle.breakability) {
                this.push(obstacle, x, y)
                if (callback) {
                    game.setTimer(() => callback(), this.moveDelay)
                }
            } else {
                if (callback) { callback() }
            }
            if (obstacle.breakability <= this.strength) {
                obstacle.break(this, x, y)
            }
            return false
        }
    }

    push (obstacle, x, y) {
        obstacle.strength = this.strength * 0.75
        obstacle.moveDelay = this.moveDelay
        // console.log(`${this.id} pushing ${obstacle.id}.`)
        // console.log(`obstacle.moveDelay = ${obstacle.moveDelay}.`)
        let success = obstacle.move(x, y, () => {
            obstacle.moveDelay = obstacle.baseMoveDelay
            obstacle.strength = obstacle.baseStrength
            // console.log(`Push complete.`)
            // console.log(`obstacle.moveDelay = ${obstacle.moveDelay}.`)
        })
        if (success) {
            this.move(x, y)
        }
    }

    break (breaker, x, y) {
        if (this.onBreak) {
            this.onBreak(breaker, x, y)
        }
        this.die()
    }

    update () {
        if (this.movable) {
            this.frameUpdate()
        }
    }

    updateSprite () {
        let image = this.sprite[this.direction]
        if (image) {
            this.imageName = this.sprite[this.direction]
        } else {
            console.error(`Can't find '${this.direction}' sprite for: `, this)
        }
    }

    die () {
        game.grid[this.position.x][this.position.y].occupant = null
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

        let yBlock = false
        if (diagonal) {
            if (
                game.checkGrid(this.position.x - xDirection, this.position.y) ||
                game.checkGrid(this.position.x, this.position.y - yDirection)
            ) {
                yBlock = true
            }
        }

        if (!yBlock) {
            if (this.spritePosition.y < this.position.y) {
                this.spritePosition.y += (1 / this.moveDelay)
            } else if (this.spritePosition.y > this.position.y) {
                this.spritePosition.y -= (1 / this.moveDelay)
            }
        }

        this.spritePosition.x = Math.round(this.spritePosition.x / (1 / this.moveDelay)) * (1 / this.moveDelay)
        this.spritePosition.y = Math.round(this.spritePosition.y / (1 / this.moveDelay)) * (1 / this.moveDelay)
    }
}

export { Entity }