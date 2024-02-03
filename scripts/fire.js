import { Entity } from './entity.js';
import { Sprite } from './sprite.js';

import { utils } from './utils.js';

class Fire extends Entity {
    constructor(x, y, elevation) {
        super(x, y, elevation)
        this.name = "fire"
        this.fuel = 2
        this.fuelSource = null
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
        if (this.fuelSource) {
            let x = this.fuelSource.position.x - this.position.x
            let y = this.fuelSource.position.y - this.position.y
            this.moveThroughAir(x, y)
        }
        let entity = game.checkGrid(this.position.x, this.position.y)
        if (entity) {
            if (entity.burnability) {
                this.fuelSource = entity
                this.moveDelay = entity.moveDelay
            } else {
                this.fuel -= 4
            }
        }
        if (!(age % 30)) {
            this.burn()
        }
    }

    burn () {
        this.fuel -= 1
        if (this.fuelSource) {
            this.fuelSource.burn()
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