import { Item } from './item.js';
import { Sprite } from './sprite.js';
import { utils } from './utils.js';

class Diamond extends Item {
    constructor(x, y) {
        super(x, y)
        this.sprite = new Sprite ("diamond")
        this.name = "diamond"
    }

    use (target) {
        const targetX = target.position.x
        const targetY = target.position.y
        utils.drawSmoke({x: targetX, y: targetY}, 150)
        game.setTimer(() => {
            utils.drawSmoke(target.position, 150)
        }, 60)
        game.setTimer(() => {
            target.teleport({x: -39, y: -68})
            target.equipped = null
            target.removeFromInventory(this)
            this.spritePosition = this.position = {
                x: targetX,
                y: targetY
            }
            this.spriteOffset = {
                x: 0,
                y: 0
            }
            game.checkGrid(targetX, targetY, true).occupant = this
            this.pickedUp = false
            this.exists = true
            if (this.onDrop) {
                this.onDrop()
            }
        }, 12)
    }
}

game.constructors[Diamond.name] = Diamond
export { Diamond }