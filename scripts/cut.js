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
        "cut/right-2",
        "cut/right-3",
        "cut/right-4",
        "cut/right-5",
        "cut/right-6",
        "cut/right-7",
    ])

    cutSprite.addAnimatedVersion("left", [
        "cut/left-1",
        "cut/left-2",
        "cut/left-3",
        "cut/left-4",
        "cut/left-5",
        "cut/left-6",
        "cut/left-7",
    ])

    cutSprite.addAnimatedVersion("up", [
        "cut/up-1",
        "cut/up-2",
        "cut/up-3",
        "cut/up-4",
        "cut/up-5",
        "cut/up-6",
        "cut/up-7",
    ])

    cutSprite.addAnimatedVersion("down", [
        "cut/down-1",
        "cut/down-2",
        "cut/down-3",
        "cut/down-4",
        "cut/down-5",
        "cut/down-6",
        "cut/down-7",
    ])

    return cutSprite
}

game.constructors[Cut.name] = Cut
export { Cut }