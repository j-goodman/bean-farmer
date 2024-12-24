import { Item } from './item.js';
import { Sprite } from './sprite.js';

const tileSize = game.tileSize

class ItemStack extends Item {
    constructor(x, y, ItemConstructor, imageName, count) {
        super(x, y, ItemConstructor, imageName, count)
        this.name = "item stack"
        this.count = count
        this.ItemConstructor = ItemConstructor
        this.sprite = new Sprite (imageName)
        this.imageName = imageName
        this.pickupable = false
        this.elevation = null
        this.overlayOffset = {
            x: tileSize * .8,
            y: tileSize * .85
        }
        if (imageName === "bomb") {
            this.burnability = 2
        }
    }

    interaction (subject) {
        for (let index = 0; index < this.count; index++) {
            subject.items.push(
                new this.ItemConstructor ()
            )
        }
        this.die()
    }

    burn () {
        if (this.imageName === "bomb") {
            this.die()
        }
    }

    overlayMethod () {
        game.ctx.fillStyle = "#56cefd";
        game.ctx.font = "60px Pangolin"
        game.ctx.fillText(
            this.count,
            (this.spritePosition.x + this.spriteOffset.x - game.viewport.origin.x) * tileSize + this.overlayOffset.x,
            (this.spritePosition.y + this.spriteOffset.y - game.viewport.origin.y) * tileSize + this.overlayOffset.y
        )
        game.ctx.font = "80px Pangolin"
    }
}

game.constructors[ItemStack.name] = ItemStack
export { ItemStack }