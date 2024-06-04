import { Entity } from './entity.js';
import { Sprite } from './sprite.js';

class LockedDoor extends Entity {
    constructor(x, y) {
        super(x, y)
        this.sprite = makeLockedDoorSprite()
        this.name = "brick"
        this.sprite.version = "down"
        this.pushability = 10
        this.breakability = 6
        this.immobile = true
    }

    onBreak () {
        this.playAnimationOnce("break", () => {
            this.die()
        })
    }
}

const makeLockedDoorSprite = () => {
    const lockedDoorSprite = new Sprite ("locked-door")
    lockedDoorSprite.addVersion("down", "locked-door")

    return lockedDoorSprite
}

export { LockedDoor }