import { Entity } from './entity.js';
import { Sprite } from './sprite.js';

class Rock extends Entity {
    constructor(x, y) {
        super(x, y)
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
        "rock-break/1",
        "rock-break/2",
        "rock-break/3",
        "rock-break/4",
        "rock-break/5",
        "rock-break/6",
        "rock-break/7",
        "rock-break/8",
        "rock-break/9",
        "rock-break/10",
        "rock-break/11",
        "rock-break/12",
    ])

    return rockSprite
}


export { Rock }