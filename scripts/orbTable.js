import { Entity } from './entity.js';
import { Sprite } from './sprite.js';

class OrbTable extends Entity {
    constructor (x, y) {
        super(x, y)
        this.sprite = makeOrbTableSprite()
        this.sprite.version = "lit"
        this.name = "orb table"
        this.pushability = 10
        // this.breakability = 5
        // this.burnability = 20
        this.immobile = true
    }

    update (age) {
        if (game.time % 25 === 0) {
            let lit = false;
            const coords = [
                {x: 1, y: 0},
                {x: -1, y: 0},
                {x: 0, y: 1},
                {x: 0, y: -1}
            ]

            coords.forEach(coord => {
                const neighbor = game.checkGrid(
                    this.position.x + coord.x,
                    this.position.y + coord.y,
                )
                if (neighbor && neighbor.name === "golemer") {
                    lit = true
                    this.sprite.changeVersion("unlit")
                }
            })

            if (!lit) {
                this.sprite.changeVersion("lit")
            }
        }

    }
}

const makeOrbTableSprite = () => {
    const orbTableSprite = new Sprite ("orb-table-lit")
    orbTableSprite.addVersion("unlit", "orb-table-unlit")
    orbTableSprite.addVersion("lit", "orb-table-lit")

    orbTableSprite.addTransition("unlit", "lit", [
        "orb-table-transition/1",
        "orb-table-transition/2",
        "orb-table-transition/3",
        "orb-table-transition/4"
    ])

    return orbTableSprite
}

export { OrbTable }