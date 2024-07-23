import { Item } from './item.js';
import { Sprite } from './sprite.js';
import { Fire } from './fire.js';

import { utils } from './utils.js';

class PowderBomb extends Item {
    constructor(x, y) {
        super(x, y)
        this.name = "powder bomb"
        this.sprite = new Sprite ("powder-bomb")
        this.extraTraction = true
        this.slidable = false
        this.burnability = -1
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
        
        
        this.die()
        new Fire (this.position.x, this.position.y, "air")
        game.setTimer(() => {
            for (let x = -11; x <= 11; x++) {
                for (let y = -11; y <= 11; y++) {
                    const distance = utils.distanceBetweenSquares({x: 0, y: 0}, {x: x, y: y})
                    if (distance < 7) {
                        game.setTimer(() => {
                            if (utils.dice(17) === 17) {
                                this.cleanSoil(utils.dice(23), "soilToxicity", 1)
                            }
                            const coord = {x: x, y: y};
                            new Fire (this.position.x + coord.x, this.position.y + coord.y, "air")
                            if (distance < 6) {
                                let occupant = game.checkGrid(
                                    this.position.x + coord.x, this.position.y + coord.y
                                )
                                if (occupant && utils.dice(6) !== 6) {
                                    if (occupant.breakability < 6) {
                                        occupant.break()
                                    }
                                    if (occupant.onHit) {
                                        occupant.onHit()
                                    }
                                }
                            }
                        }, (Math.round(distance) * 5) + utils.dice(15))
                    }
                }    
            }
        }, 4)
    }
}

game.constructors[PowderBomb.name] = PowderBomb
export { PowderBomb }