import { Entity } from './entity.js';
import { Sprite } from './sprite.js';

class Rock extends Entity {
    constructor(x, y) {
        super(x, y)
        this.sprite = makeRockSprite()
        this.name = "rock"
        this.sprite.version = "down"
        this.pipeConnection = true
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

    rockSprite.addVersion("URDL", "rock-connections/URDL")
    rockSprite.addVersion("URDL2", "rock-connections/URDL2")
    rockSprite.addVersion("URDL3", "rock-connections/URDL3")
    rockSprite.addVersion("RDL", "rock-connections/RDL")
    rockSprite.addVersion("UDL", "rock-connections/UDL")
    rockSprite.addVersion("URL", "rock-connections/URL")
    rockSprite.addVersion("URD", "rock-connections/URD")
    rockSprite.addVersion("DL", "rock-connections/DL")
    rockSprite.addVersion("RD", "rock-connections/RD")
    rockSprite.addVersion("RL", "rock-connections/RL")
    rockSprite.addVersion("UD", "rock-connections/UD")
    rockSprite.addVersion("UL", "rock-connections/UL")
    rockSprite.addVersion("UR", "rock-connections/UR")
    rockSprite.addVersion("U", "rock-connections/U")
    rockSprite.addVersion("R", "rock-connections/R")
    rockSprite.addVersion("D", "rock-connections/D")
    rockSprite.addVersion("L", "rock-connections/L")
    rockSprite.addVersion("X", "rock-connections/X")

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