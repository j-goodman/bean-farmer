import { Plant } from './plant.js';
import { Sprite } from './sprite.js';
import { Wood } from './wood.js';

import { utils } from './utils.js';

class Stump extends Plant {
    constructor(x, y) {
        super(x, y)
        this.sprite = makeStumpSprite()
        this.name = "tree stump"
        this.pushability = 10
        this.breakability = 5
        this.burnability = 20
        this.immobile = true
    }

    onCut () {
        this.die()
    }
    
    onDeath () {
        if (this.burnability > 0) {
            const drop = new Wood (this.position.x, this.position.y)
            game.setTimer(() => {
                this.checkDrop(drop)
            }, 0)
        }
    }

    checkDrop (item) {
        console.log("Drop checking.")
        console.log(
            game.checkGrid(item.position.x, item.position.y)
        )
        console.log(
            item
        )
        if (game.checkGrid(item.position.x, item.position.y) === item) {
            return true
        } else {
            const directions = ["up", "right", "down", "left"]
            for (let i = 0; i < 4; i++) {
                console.log(`Trying ${directions[i]}.`)
                const offset = utils.directionToCoordinates(directions[i])
                if (!game.checkGrid(
                    this.position.x + offset.x,
                    this.position.y + offset.y
                )) {
                    item.position.x = this.position.x + offset.x
                    item.position.y = this.position.y + offset.y
                    item.spritePosition.x = item.position.x
                    item.spritePosition.y = item.position.y
                    game.addToGrid(item, item.position.x, item.position.y)
                    break
                }
            }   
        }
    }
}

const makeStumpSprite = () => {
    const stumpSprite = new Sprite ("stump")
    stumpSprite.addVersion("down", "stump")

    return stumpSprite
}


export { Stump }