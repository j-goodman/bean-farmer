import { Entity } from './entity.js';
import { Sprite } from './sprite.js';
import { SulfurCrystal } from './sulfurCrystal.js';

import { game } from './game.js';


class Ore extends Entity {
    constructor(x, y) {
        super(x, y)
        this.name = "ore"
        this.imageName = "ore"
        this.sprite = makeOreSprite()
        this.pushability = 3
        this.breakability = 2
    }

    onBreak () {
        this.playAnimationOnce("break", () => {
            this.die()
            let em = new SulfurCrystal (this.position.x, this.position.y)
        })
    }
}

const makeOreSprite = () => {
    const oreSprite = new Sprite ("ore")

    oreSprite.addVersion("down", "ore")

    oreSprite.addAnimatedVersion("break", [
        "ore-broken",
        "ore-broken",
    ])

    return oreSprite
}

export { Ore }