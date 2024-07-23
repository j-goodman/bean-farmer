import { Plant } from './plant.js';
import { Sprite } from './sprite.js';
import { Wood } from './wood.js';
import { Stump } from './stump.js';

import { utils } from './utils.js';

class Tree extends Plant {
    constructor(x, y) {
        super(x, y)
        this.sprite = makeTreeSprite()
        this.name = "tree"
        this.pushability = 10
        this.breakability = 5
        this.burnability = 5
        this.immobile = true
        this.unfreezable = true
        this.overlayExists = true
        this.overlay = ["pine-tree"]
        this.overlayCycle = 0
        this.overlayLoop = true
        this.overlayHeight = 4.5
        this.overlayWidth = 2.7
        this.overlayOffset = {
            x: -96,
            y: -422
        }
    }

    onCut (cutter) {
        game.setTimer(() => {
            this.dropWood(cutter)
        }, 1)
        this.die()
    }

    onDeath () {
        this.checkDrop(new Stump (this.position.x, this.position.y))
    }
    
    dropWood (cutter) {
        let height = 4
        let fallDirection = null
        if (cutter) {
            fallDirection = {
                x: this.position.x - cutter.position.x,
                y: this.position.y - cutter.position.y,
            }
        } else {
            fallDirection = {x: 0, y: 1}
        }
        const direction = utils.directionFromCoordinates(fallDirection.x, fallDirection.y)
        for (let distance = 0; distance <= height; distance++) {
            const offset = {x: fallDirection.x * distance, y: fallDirection.y * distance}
            const drop = new Wood (this.position.x, this.position.y)
            this.checkDrop(drop, direction, offset)
        }
    }
}

const makeTreeSprite = () => {
    const stumpSprite = new Sprite ("stump")
    stumpSprite.addVersion("down", "stump")

    return stumpSprite
}

game.constructors[Tree.name] = Tree
export { Tree }