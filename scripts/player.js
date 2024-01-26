import { Entity } from './entity.js';
import { Sprite } from './sprite.js';

import { game } from './game.js';

class Player extends Entity {
    constructor(imageName, x, y) {
        super(imageName, x, y)
        this.name = "player"
        this.baseMoveDelay = 6
        this.moveDelay = this.baseMoveDelay
        this.baseStrength = 3
        this.strength = this.baseStrength
        this.pushability = 3
        this.sprite = makePlayerSprite()
        this.sprite.version = "down"
        this.health = 4
        this.animal = true
        this.updateQueue = []
    }

    onHit (subject) {
        this.health -= 1
        game.displayHealth = 300
    }

    update () {
        this.frameUpdate()
        if (this.spritePosition.x !== this.position.x && this.spritePosition.y !== this.position.y) {
            // if diagonal:
            this.moveDelay = Math.floor(this.baseMoveDelay * 1.65)
        } else {
            this.moveDelay = this.baseMoveDelay
        }

        while (this.updateQueue.length) {
            this.updateQueue.shift()()
        }

        const posX = this.position.x
        const posY = this.position.y

        if (this.spritePosition.x === this.position.x &&
            this.spritePosition.y === this.position.y) {
            if (game.controls.right) {
                this.direction = "right"
                this.updateQueue.push(() => {
                    this.move(1, 0)
                })
            } else if (game.controls.left) {
                this.direction = "left"
                this.updateQueue.push(() => {
                    this.move(-1, 0)
                })
            }
            if (game.controls.down) {
                this.direction = "down"
                this.updateQueue.push(() => {
                    this.move(0, 1)
                })
            } else if (game.controls.up) {
                this.direction = "up"
                this.updateQueue.push(() => {
                    this.move(0, -1)
                })
            }
            this.updateSprite()
        }
    }
}

const makePlayerSprite = () => {
    const playerSprite = new Sprite ("blob-down")

    playerSprite.addVersion("down", "blob-down")
    playerSprite.addVersion("left", "blob-left")
    playerSprite.addVersion("up", "blob-up")
    playerSprite.addVersion("right", "blob-right")

    playerSprite.addTransition("down", "right", [
        "blob-down-right-1",
        "blob-down-right-2"
    ])

    playerSprite.addTransition("right", "up", [
        "blob-right-up-1",
        "blob-right-up-2"
    ])

    playerSprite.addTransition("up", "left", [
        "blob-left-up-2",
        "blob-left-up-1"
    ])

    playerSprite.addTransition("left", "down", [
        "blob-down-left-2",
        "blob-down-left-1"
    ])

    playerSprite.addTransition("left", "right", [
        "blob-down-left-2",
        "blob-down-left-1",
        "blob-down-right-1",
        "blob-down-right-2"
    ])

    playerSprite.addTransition("up", "down", [
        "blob-right-up-2",
        "blob-right-up-1",
        "blob-down-right-2",
        "blob-down-right-1"
    ])
    return playerSprite
}

export { Player }