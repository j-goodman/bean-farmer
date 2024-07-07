import { Entity } from './entity.js';
import { Sprite } from './sprite.js';

class Lockbox extends Entity {
    constructor(x, y) {
        super(x, y)
        this.imageName = "lockbox"
        this.spawnPosition = {x: x, y: y}
        this.sprite = new Sprite (this.imageName)
        this.sprite.addAnimatedVersion("open", [
            "lockbox-open/1",
            "lockbox-open/2",
            "lockbox-open/3",
            "lockbox-open/4",
            "lockbox-open/5",
            "lockbox-open/6",
            "lockbox-open/7",
            "lockbox-open/8",
            "lockbox-open/9",
            "lockbox-open/10",
            "lockbox-open/11",
            "lockbox-open/12",
            "lockbox-open/13",
            "lockbox-open/14",
            "lockbox-open/15",
            "lockbox-open/16"
        ])
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
            this.playAnimationOnce("open", () => {
                this.die()
            })
            subject.equipped.die()
        }
    }
}

game.constructors[Lockbox.name] = Lockbox
export { Lockbox }