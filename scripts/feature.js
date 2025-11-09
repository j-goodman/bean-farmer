import { Brick } from "./brick.js";
import { Entity } from "./entity.js";
import { Sprite } from "./sprite.js";

class Feature extends Entity {
    constructor(x, y, elevation) {
        super(x, y, elevation)
        this.position = {x: x, y: y}
        this.breakability = 7
        this.immobile = true
        game.setTimer(() => {
            this.addBlocks()
        }, 1)
        this.subBlocks = []
    }

    drawAction () {
        if (!this.overlayOffset) {
            this.overlayOffset = {x: 0, y: 0}
        }
        if (!this.groundImage) {
            console.log("None.")
            return false
        }
        game.ctx.drawImage(
            game.images[this.groundImage],
            ((this.spritePosition.x + this.spriteOffset.x - game.viewport.origin.x) * game.tileSize) + this.overlayOffset.x,
            ((this.spritePosition.y + this.spriteOffset.y - game.viewport.origin.y) * game.tileSize) + this.overlayOffset.y,
            game.tileSize * this.overlayWidth,
            game.tileSize * this.overlayHeight
        )
    }

    addBlocks () {
        if (this.blocks) {
            this.blocks.forEach(block => {
                const brick = new Brick (this.position.x + block.x, this.position.y + block.y)
                brick.onDeath = () => {
                    if (this.exists) {
                        this.die()
                    }
                }
                brick.sprite = new Sprite ("empty")
                this.subBlocks.push(brick)
            })
        }
    }

    onDeath () {
        this.subBlocks.forEach(block => {
            if (block.exists) {
                block.die()
            }
        })
    }
}

export { Feature }