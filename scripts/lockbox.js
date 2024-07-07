import { Entity } from './entity.js';
import { Sprite } from './sprite.js';

class Lockbox extends Entity {
    constructor(x, y) {
        super(x, y)
        this.imageName = "lockbox"
        this.spawnPosition = {x: x, y: y}
        this.sprite = new Sprite (this.imageName)
        console.log("Lockbox.")
    }

    update () {
        if (game.player.equipped && game.player.equipped.name === "key") {
            this.interaction = this.unlock
        } else {
            this.interaction = null
        }
    }

    unlock (subject) {
        if (subject.equipped && subject.equipped.name === "key") {
            if (subject.removeFromInventory) {
                subject.removeFromInventory(subject.equipped)
            }
            subject.equipped.die()
            this.die()
        }
    }
}

game.constructors[Lockbox.name] = Lockbox
export { Lockbox }