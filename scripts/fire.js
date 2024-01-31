import { Entity } from './entity.js';
import { Sprite } from './sprite.js';

class Fire extends Entity {
    constructor(x, y, elevation) {
        super(x, y, elevation)
        this.name = "fire"
        this.sprite = makeFireSprite()
        this.playAnimationOnce("fire-loop", () => {
            this.sprite.image = "fire/0"
        })
    }

    update (age) {
        this.frameUpdate()
        this.sprite.frame += 1
        if (this.sprite.frame >= this.sprite.versions["fire-loop"].length) {
            this.sprite.frame = 0
        }
        this.sprite.image = this.sprite.versions["fire-loop"][this.sprite.frame]
    }
}

const makeFireSprite = () => {
    const fireSprite = new Sprite ("fire/0")

    fireSprite.addAnimatedVersion("fire-loop", [
        "fire/0",
        "fire/0",
        "fire/0",
        "fire/0",
        "fire/0",
        "fire/0",
        "fire/0",
        "fire/0",
        "fire/0",
        "fire/0",
        "ore",
        "ore",
        "ore",
    ])

    return fireSprite
}

export { Fire }