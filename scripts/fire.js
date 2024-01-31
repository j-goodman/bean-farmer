import { Entity } from './entity.js';
import { Sprite } from './sprite.js';

import { utils } from './utils.js';

class Fire extends Entity {
    constructor(x, y, elevation) {
        super(x, y, elevation)
        this.name = "fire"
        this.fuel = 7 + utils.dice(5)
        this.sprite = makeFireSprite()
        this.igniting = true
        this.playAnimationOnce("ignite", () => {
            this.igniting = false
        })
    }

    update (age) {
        this.frameUpdate()
        if (!this.igniting) {
            this.sprite.frame += 1
            if (this.sprite.frame >= this.sprite.versions["fire-loop"].length) {
                this.sprite.frame = 0
            }
            this.sprite.image = this.sprite.versions["fire-loop"][this.sprite.frame]
        }
        if (!(age % 5)) {
            this.burn()
        }
    }

    burn () {
        this.fuel -= 1
        let entity = game.checkGrid(this.position.x, this.position.y)
        if (entity) {
            if (entity.burnable) {
                entity.burn()
                this.fuel += 3
            } else {
                this.fuel -= 3
            }
        }
        if (this.fuel <= 0) {
            this.die()
        }
    }
}

const makeFireSprite = () => {
    const fireSprite = new Sprite ("fire/0")

    fireSprite.addAnimatedVersion("ignite", [
        "fire/0",
        "fire/0",
        "fire/0",
        "fire/0",
        "fire/0"
    ])

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
        "fire/1",
        "fire/1",
        "fire/1",
        "fire/1",
        "fire/1",
        "fire/1",
        "fire/1",
        "fire/1",
        "fire/1",
        "fire/1",
    ])

    return fireSprite
}

export { Fire }