import { Item } from './item.js';
import { Sprite } from './sprite.js';
import { Fire } from './fire.js';

import { utils } from './utils.js';

class AtomBomb extends Item {
    constructor(x, y) {
        super(x, y)
        this.name = "atom bomb"
        this.sprite = new Sprite ("atom-bomb")
        this.extraTraction = true
        this.slidable = false
        this.moveDelay = 4
        this.power = 0.79
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
        const range = 100
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

    explode () {
        this.die()
        game.hieroglyphs = true
        game.points += 1
        game.displayPoints = 750
        game.setTimer(() => {
            game.hieroglyphs = false
            game.setTimer(() => {
                game.hieroglyphs = true
            }, 10 * (utils.dice(6)))
            game.setTimer(() => {
                game.hieroglyphs = false
            }, 10 * 7)
            game.setTimer(() => {
                game.hieroglyphs = true
            }, 30 * (utils.dice(6)))
            game.setTimer(() => {
                game.hieroglyphs = false
            }, 30 * 10)
        }, 30 * (15 + utils.dice(10)))
        new Fire (this.position.x, this.position.y, "air")
        game.setTimer(() => {
            utils.smoothSoil(this.position, Math.floor(36 * this.power))
        }, 30 * 7)
        game.setTimer(() => {
            utils.smoothSoil(this.position, Math.floor(18 * this.power))
        }, 30 * 10)
        game.setTimer(() => {
            utils.smoothSoil(this.position, Math.floor(4 * this.power))
        }, 30 * 13)
        game.setTimer(() => {
            for (let x = -Math.floor(100 * this.power); x <= Math.floor(100 * this.power); x++) {
                for (let y = -Math.floor(100 * this.power); y <= Math.floor(100 * this.power); y++) {
                    const distance = utils.distanceBetweenSquares({x: 0, y: 0}, {x: x, y: y})
                    if (distance < Math.floor(100 * this.power)) {
                        game.setTimer(() => {
                            const coord = {x: x, y: y}
                            const square = game.checkGrid(
                                    this.position.x + coord.x, this.position.y + coord.y,
                                    true
                            )
                            for (let i = 0; i < 10; i++) {
                                game.setTimer(() => {
                                    square.soilHealth -= ((Math.floor(100 * this.power)) - distance) / Math.floor(100 * this.power) * .099
                                    square.soilToxicity += ((Math.floor(100 * this.power)) - distance) / Math.floor(100 * this.power) * .099
                                }, (Math.round(distance * 1.45)) + utils.dice(28) + 3)
                            }
                            
                            new Fire (this.position.x + coord.x, this.position.y + coord.y, "air")
                            game.setTimer(() => {
                                new Fire (this.position.x + coord.x, this.position.y + coord.y, "air")
                            }, Math.floor(distance * 13) + utils.dice(30) + utils.dice(24) + 10)

                            let occupant = game.checkGrid(
                                this.position.x + coord.x, this.position.y + coord.y
                            )
                            let mercy = 36
                            mercy = distance < 60 * this.power ? 28 : mercy
                            mercy = distance < 40 * this.power ? 18 : mercy
                            mercy = distance < 20 * this.power ? 11 : mercy
                            mercy = distance < 16 * this.power ? 8 : mercy
                            mercy = distance < 13 * this.power ? 6 : mercy
                            mercy = distance < 10 * this.power ? 1 : mercy
                            if (square.groundOccupant && square.groundOccupant.die && utils.dice(mercy) <= 5 && !square.groundOccupant.unbreakable) {
                                square.groundOccupant.die()
                            }
                            if (occupant && utils.dice(mercy) <= 5) {
                                if (occupant.animal || occupant.plant) {
                                    occupant.die()
                                }
                                let strength = distance < 30 ? 8 : 7
                                strength = distance < 15 ? 9 : strength
                                if (occupant.breakability < strength) {
                                    occupant.break()
                                    if (
                                        utils.dice(7) !== 7 ||
                                        occupant.breakability < (strength - 1)
                                    ) {
                                        occupant.break()
                                    }
                                }
                                if (occupant.onHit) {
                                    occupant.onHit()
                                }
                            }
                        }, (Math.round(distance * 1.95)) + utils.dice(13))
                    }
                }    
            }
        }, 4)
    }
}

game.constructors[AtomBomb.name] = AtomBomb
export { AtomBomb }