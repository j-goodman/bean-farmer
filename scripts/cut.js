import { Entity } from './entity.js';
import { Sprite } from './sprite.js';

import { utils } from './utils.js';

class Cut extends Entity {
    constructor(x, y, elevation) {
        super(x, y, elevation)
        this.name = "cut"
        this.sprite = makeCutSprite()
    }

    update (age) {
        this.frameUpdate()
        if (age > 6) {
            this.die()
        }
    }

    setDirection (direction) {
        this.direction = direction
        this.playAnimationOnce(direction)
    }
}

const makeCutSprite = () => {
    const cutSprite = new Sprite ("blank")

    cutSprite.addAnimatedVersion("right", [
        "cut/right-1",
        "cut/right-1",
        "cut/right-1",
        "cut/right-1",
        "cut/right-1",
        "cut/right-1",
    ])

    cutSprite.addAnimatedVersion("left", [
        "cut/left-1",
        "cut/left-1",
        "cut/left-1",
        "cut/left-1",
        "cut/left-1",
        "cut/left-1",
    ])

    cutSprite.addAnimatedVersion("up", [
        "cut/up-1",
        "cut/up-1",
        "cut/up-1",
        "cut/up-1",
        "cut/up-1",
        "cut/up-1",
    ])

    cutSprite.addAnimatedVersion("down", [
        "cut/down-1",
        "cut/down-1",
        "cut/down-1",
        "cut/down-1",
        "cut/down-1",
        "cut/down-1",
    ])

    return cutSprite
}

export { Cut }