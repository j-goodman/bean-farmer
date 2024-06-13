import { Item } from './item.js';
import { Sprite } from './sprite.js';
import { Fire } from './fire.js';

import { utils } from './utils.js';

class Bomb extends Item {
    constructor(x, y) {
        super(x, y)
        this.name = "bomb"
        this.sprite = new Sprite ("bomb")
        this.moveDelay = 3
    }
    
    use (user) {
        this.moveDelay = 3
        if (user.checkFacingSquare()) {
            this.position.x = user.position.x
            this.position.y = user.position.y
            this.explode()
            return false
        }
        user.dropItem()
        let direction = utils.directionToCoordinates(user.direction)
        this.move(direction.x, direction.y, () => {
            this.move(direction.x, direction.y, () => {
                this.move(direction.x, direction.y, () => {
                    this.move(direction.x, direction.y, () => {
                        this.move(direction.x, direction.y, () => {
                            this.move(direction.x, direction.y, () => {
                                this.explode()
                            })
                        })
                    })
                })
            })
        })
    }

    explode () {
        const coords = [
            {x: 0, y: -1},
            {x: 1, y: 0},
            {x: 0, y: 1},
            {x: -1, y: 0},
        ]
        this.die()
        new Fire (this.position.x, this.position.y, "air")
        game.setTimer(() => {
            coords.forEach(coord => {
                new Fire (this.position.x + coord.x, this.position.y + coord.y, "air")
                let occupant = game.checkGrid(
                    this.position.x + coord.x, this.position.y + coord.y
                )
                if (occupant) {
                    if (occupant.breakability < 6) {
                        occupant.break()
                    }
                    if (occupant.onHit) {
                        occupant.onHit()
                    }
                }
            })
        }, 4)
    }
}

export { Bomb }