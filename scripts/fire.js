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
        this.freezeAir(this.position.x, this.position.y, -0.1)
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
        if (!entity) {
            entity = game.checkGrid(this.position.x, this.position.y, true).groundOccupant
        }
        if (entity) {
            if (entity.burnability) {
                if (!this.fuelSource) {
                    this.fuel += entity.burnability
                }
                this.fuelSource = entity
                this.moveDelay = entity.moveDelay
            } else {
                this.fuel -= 4
            }
            if (entity.name === "firepot" && entity.lit === false) {
                entity.burn(this)
            }
        }
        if (!(age % 30)) {
            this.burn()
        }
    }

    burn () {
        if (this.fuel >= 3) {
            let count = 0
            const coordList = [
                {x: 0, y: 1},
                {x: 0, y: -1},
                {x: 1, y: 0},
                {x: -1, y: 0},
                {x: -1, y: -1},
                {x: -1, y: 1},
                {x: 1, y: 1},
                {x: 1, y: -1}
            ]
            coordList.forEach(coords => {
                if (utils.dice(3) === 3) {
                    game.setTimer(() => {
                        if (count < 4) {
                            new Fire (this.position.x + coords.x, this.position.y + coords.y, "air")
                        }
                        const square = game.checkGrid(this.position.x + coords.x, this.position.y + coords.y, true)
                        let item = square.occupant
                        if (!item) {
                            item = square.groundOccupant
                        }
                        if (item && item.burnability && item.name !== "player" && !item.lit) {
                            new Fire (this.position.x + coords.x, this.position.y + coords.y, "air")
                        }
                    }, utils.dice(20))
                }
                count += 1
            })
        }
        this.fuel -= 1
        if (this.fuelSource && this.fuelSource.burn) {
            this.fuelSource.burn(this)
        }
        if (this.fuel <= 0) {
            this.die()
        }
    }
}

const makeFireSprite = () => {
    const fireSprite = new Sprite ("fire/0")

    fireSprite.addAnimatedVersion("ignite", [
        "fire-ignite/0", "fire-ignite/1", "fire-ignite/2", 
        "fire-ignite/3", "fire-ignite/4", "fire-ignite/5", 
        "fire-ignite/6", "fire-ignite/7", "fire-ignite/8",
        "fire-ignite/9" 
    ])

    fireSprite.addAnimatedVersion("fire-loop", [
        "fire/0", "fire/1", "fire/2", "fire/3", "fire/4", "fire/5",
        "fire/6", "fire/7", "fire/8", "fire/9", "fire/10", "fire/11",
        "fire/12", "fire/13", "fire/14", "fire/15", "fire/16", "fire/17",
        "fire/18", "fire/19", "fire/20", "fire/21", "fire/22", "fire/23",
        "fire/24", "fire/25", "fire/26", "fire/27", "fire/28", "fire/29",
        "fire/30", "fire/31"
    ])

    return fireSprite
}

game.constructors[Fire.name] = Fire
export { Fire }