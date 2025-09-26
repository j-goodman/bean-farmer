import { Entity } from './entity.js';
import { Sprite } from './sprite.js';

import { utils } from './utils.js';

class Rock extends Entity {
    constructor(x, y) {
        super(x, y)
        this.sprite = makeRockSprite()
        this.name = "rock"
        this.sprite.version = "down"
        this.pipeConnection = true
        this.pushability = 10
        this.breakability = 5
        this.immobile = true
    }

    onBreak () {
        this.playAnimationOnce("break", () => {
            if (utils.isInViewport(this.position)) {
                game.givePoints(1, this)
            }
            this.die()
        })
    }
}

const makeRockSprite = () => {
    const rockSprite = new Sprite ("rock")

    rockSprite.addVersion("down", "rock")

    rockSprite.addURDLVersions("rock-connections")
    rockSprite.addVersion("URDL2", "rock-connections/URDL2")
    rockSprite.addVersion("URDL3", "rock-connections/URDL3")

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

game.constructors[Rock.name] = Rock
export { Rock }