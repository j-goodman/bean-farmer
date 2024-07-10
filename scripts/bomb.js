import { Item } from './item.js';
import { Sprite } from './sprite.js';
import { Fire } from './fire.js';

import { utils } from './utils.js';

class Bomb extends Item {
    constructor(x, y) {
        super(x, y)
        this.name = "bomb"
        this.sprite = new Sprite ("bomb")
        this.extraTraction = true
        this.slidable = false
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
        this.direction = utils.directionToCoordinates(user.direction)
        const range = 9
        for (let i = 0; i < range; i++) {
            game.setTimer(() => {
                const success = this.move(this.direction.x, this.direction.y)
                if (!success && this.exists) {
                    const obstacle = game.checkGrid(
                        this.position.x + this.direction.x,
                        this.position.y + this.direction.y
                    )
                    if (obstacle && obstacle.bombCheck) {
                        obstacle.bombCheck(this)
                    } else {
                        this.explode()
                    }
                }
            }, i * this.moveDelay)
            game.setTimer(() => {
                if (this.exists) {
                    this.explode()
                }
            }, range * this.moveDelay)
        }
    }

    onHit () {
        this.explode()
    }

    onCut () {
        this.explode()
    }

    burn () {
        this.explode()
    }

    explode () {
        const coords = [
            {x: 0, y: 0},
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

game.constructors[Bomb.name] = Bomb
export { Bomb }