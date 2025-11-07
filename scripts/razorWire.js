import { Entity } from './entity.js';
import { Sprite } from './sprite.js';

class RazorWire extends Entity {
    constructor(x, y) {
        super(x, y)
        this.sprite = makeBrickSprite()
        this.name = "razor wire wall"
        this.pipeConnection = true
        this.pushability = 10
        this.breakability = 6
        this.immobile = true
    }

    onBreak () {
        this.die()
    }

    onTouch (subject) {
        if (game.time % 23 === 0 && subject && subject.onHit) {
            subject.onHit()
        }
    }
}


const makeBrickSprite = () => {
    const brickSprite = new Sprite ("razor-wire/X")
    brickSprite.addURDLVersions("razor-wire")
    return brickSprite
}

game.constructors[RazorWire.name] = RazorWire
export { RazorWire }