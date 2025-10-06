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
        this.cutter = cutter
        this.die()
    }
    
    onDeath (cutter) {
        let stump = new Stump (this.position.x, this.position.y)
        game.setTimer(() => {
            this.dropWood(this.cutter)
        }, 1)
        this.checkDrop(stump)
        if (this.variant === "birch") {
            stump.variant = "birch"
            stump.sprite = this.sprite
        }
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
            fallDirection = [
                {x: 0, y: 1},
                {x: 0, y: -1},
                {x: 1, y: 0},
                {x: -1, y: 0},
            ][Math.floor(Math.random() * 4)]
        }
        const direction = utils.directionFromCoordinates(fallDirection.x, fallDirection.y)
        for (let distance = 1; distance <= height; distance++) {
            game.setTimer(() => {
                const offset = {x: fallDirection.x * distance, y: fallDirection.y * distance}
                const drop = new Wood (this.position.x + offset.x, this.position.y + offset.y)
                if (this.variant === "birch") {
                    drop.sprite = new Sprite ("birch-wood")
                }
                this.checkDrop(drop)
            }, (distance - 1) * 2)
        }
    }
    
    setVariant (name) {
        if (name === "birch") {
            this.variant = "birch"
            this.overlay = ["birch-tree"]
            this.sprite = new Sprite ("birch-stump")
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