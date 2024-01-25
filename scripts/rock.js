import { Entity } from './entity.js';
import { Sprite } from './sprite.js';

class Rock extends Entity {
    constructor(imageName, x, y) {
        super(imageName, x, y)
        this.sprite = makeRockSprite()
        this.sprite.version = "down"
        this.pushability = 10
        this.breakability = 5
    }

    onBreak () {
        this.playAnimationOnce("break", () => {
            this.die()
        })
    }
}

const makeRockSprite = () => {
    const rockSprite = new Sprite ("rock")

    rockSprite.addVersion("down", "rock")

    rockSprite.addAnimatedVersion("break", [
        "ore",
        "ore",
        "ore",
        "rock",
        "rock",
        "rock",
        "ore",
        "ore",
        "ore",
    ])

    return rockSprite
}


export { Rock }