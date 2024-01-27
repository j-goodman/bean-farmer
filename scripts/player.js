import { Entity } from './entity.js';

import { game } from './game.js';
import { makePlayerSprite } from './sprites/playerSprite.js';

class Player extends Entity {
    constructor(x, y) {
        super(x, y)
        this.name = "player"
        this.imageName = "blob-right"
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
        this.items = []
    }

    checkForItems () {
        const coordinates = [
            {x: 0, y: -1},
            {x: 1, y: 0},
            {x: 0, y: 1},
            {x: -1, y: 0}
        ]
        coordinates.forEach(coord => {
            let item = game.checkGrid(this.position.x + coord.x, this.position.y + coord.y)
            if (item && item.pickupable) {
                this.drawCursor(coord.x, coord.y)
                if (game.controls.action) {
                    item.getPickedUp(this)
                }
            }
        })
    }

    drawCursor (x, y) {
        game.ctx.drawImage(game.images["cursor"], (this.position.x + x) * game.tileSize, (this.position.y + y) * game.tileSize, game.tileSize, game.tileSize)
    }

    onHit (subject) {
        this.health -= 1
        game.displayHealth = 300
        this.playOverlayAnimation(this.sprite, "bubbles")

        if (this.direction !== "up") {
            this.playAnimationOnce("hurt")
        }

        for (let i = 0; i < 100; i++) {
            game.setTimer(() => {
                game.ctx.globalAlpha = (100 - i) / 100;
                if (i < 10) {
                    game.ctx.globalAlpha = i / 10;
                }
                game.ctx.drawImage(game.images["blob-red-flash"], (this.spritePosition.x + this.spriteOffset.x - game.viewport.origin.x) * game.tileSize, (this.spritePosition.y + this.spriteOffset.y - game.viewport.origin.y) * game.tileSize, game.tileSize, game.tileSize)
                game.ctx.globalAlpha = 1;
            }, i)
        }
    }

    update () {
        this.frameUpdate()
        this.checkForItems()
        const diagonal = this.spritePosition.x !== this.position.x && this.spritePosition.y !== this.position.y
        if (diagonal) {
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

            this.update4DirectionSprite()
        }
    }
}

export { Player }