import { Entity } from './entity.js';

import { game } from './game.js';

class Player extends Entity {
    constructor(imageName, x, y) {
        super(imageName, x, y)
        this.baseMoveDelay = 6
        this.moveDelay = this.baseMoveDelay
        this.baseStrength = 3
        this.strength = this.baseStrength
        this.pushability = 3
        this.sprite = {
            up: "blob-up",
            right: "blob-right",
            down: "blob-down",
            left: "blob-left"
        }
        this.updateQueue = []
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

export { Player }