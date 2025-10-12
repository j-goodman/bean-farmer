import { Entity } from './entity.js';
import { Sprite } from './sprite.js';

class Brick extends Entity {
    constructor(x, y) {
        super(x, y)
        this.sprite = makeBrickSprite()
        this.name = "brick"
        this.pipeConnection = true
        this.pushability = 10
        this.breakability = 6
        this.immobile = true
    }

    onBreak () {
        this.die()
    }

    onDeath () {
        game.givePoints(3, this)
    }

    setVariant (name) {
        if (name === "dark") {
            this.variant = "dark"
            this.sprite  = new Sprite ("dark-brick/X")
            this.name = "dark brick"
            this.sprite.addURDLVersions("dark-brick")
        }
    }
}


const makeBrickSprite = () => {
    const brickSprite = new Sprite ("brick")

    brickSprite.addURDLVersions("red-brick")
    brickSprite.addVersion("fill", "red-brick/fill")
    brickSprite.addVersion("URDL2", "red-brick/URDL")
    brickSprite.addVersion("URDL3", "red-brick/URDL")

    return brickSprite
}

game.constructors[Brick.name] = Brick
export { Brick }