import { Entity } from './entity.js';
import { Sprite } from './sprite.js';

class CrystalLockbox extends Entity {
    constructor(x, y) {
        super(x, y)
        this.imageName = "crystal-lockbox/1"
        this.spawnPosition = {x: x, y: y}
        this.sprite = new Sprite (this.imageName)
        this.sprite.addAnimatedVersion("open", [
            "crystal-lockbox/1",
            "crystal-lockbox/2",
            "crystal-lockbox/3",
            "crystal-lockbox/4",
            "crystal-lockbox/5",
            "crystal-lockbox/6",
            "crystal-lockbox/7",
            "crystal-lockbox/8",
            "crystal-lockbox/9",
            "crystal-lockbox/10",
            "crystal-lockbox/11",
            "crystal-lockbox/12",
            "crystal-lockbox/13",
            "crystal-lockbox/14",
            "crystal-lockbox/15",
            "crystal-lockbox/16"
        ])
        // console.log("Crystal lock.")
    }

    update () {
        if (game.player.equipped && game.player.equipped.name === "crystal key") {
            this.interaction = this.unlock
        } else {
            this.interaction = null
        }
    }

    unlock (subject) {
        if (subject.equipped && subject.equipped.name === "crystal key") {
            if (subject.removeFromInventory) {
                subject.removeFromInventory(subject.equipped)
            }
            this.playAnimationOnce("open", () => {
                game.givePoints(500, this)
                this.die()
            })
            subject.equipped.die()
        }
    }
}

game.constructors[CrystalLockbox.name] = CrystalLockbox
export { CrystalLockbox }