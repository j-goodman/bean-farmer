import { Entity } from './entity.js';
import { Sprite } from './sprite.js';

class Brick extends Entity {
    constructor(x, y) {
        super(x, y)
        this.sprite = makeBrickSprite()
        this.name = "brick"
        this.sprite.version = "down"
        this.pipeConnection = true
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

const makeBrickSprite = () => {
    const brickSprite = new Sprite ("brick")

    brickSprite.addVersion("down", "brick")

    brickSprite.addURDLVersions("red-brick")
    brickSprite.addVersion("fill", "red-brick/fill")
    brickSprite.addVersion("URDL2", "red-brick/URDL")
    brickSprite.addVersion("URDL3", "red-brick/URDL")

    return brickSprite
}

game.constructors[Brick.name] = Brick
export { Brick }