import { Sprite } from './sprite.js';

import { game } from './game.js';
import { utils } from './utils.js';

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
        this.spriteOffset = {
            x: 0,
            y: 0
        }
        this.sprite = new Sprite (imageName)
        this.baseMoveDelay = 12
        this.moveDelay = this.baseMoveDelay
        this.baseStrength = 1
        this.strength = this.baseStrength
        this.pushability = 7
        this.breakability = 9
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
            // if (obstacle.breakability <= this.strength) {
            //     obstacle.break(this, x, y)
            // }
            return false
        }
    }

    push (obstacle, x, y) {
        obstacle.strength = this.strength * 0.75
        obstacle.moveDelay = this.moveDelay
        let success = obstacle.move(x, y, () => {
            obstacle.moveDelay = obstacle.baseMoveDelay
            obstacle.strength = obstacle.baseStrength
        })
        if (success) {
            this.move(x, y)
        }
    }

    hit (obstacle) {
        if (obstacle.onHit) {
            obstacle.onHit()
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
        if (this.movable) {
            this.frameUpdate()
        }
    }

    updateSprite () {
        this.sprite.changeVersion(this.direction)
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

        if (this.spritePosition.y < this.position.y) {
            this.spritePosition.y += (1 / this.moveDelay)
        } else if (this.spritePosition.y > this.position.y) {
            this.spritePosition.y -= (1 / this.moveDelay)
        }
        // }

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
            this.updateSprite()
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
}

export { Entity }