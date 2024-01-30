import { Entity } from './entity.js';

import { utils } from './utils.js'

class Plant extends Entity {
    constructor(x, y) {
        super(x, y)
    }

    cleanSoil () {
        const square = game.checkGrid(this.position.x, this.position.y, true)
        square.soilToxicity *= 0.9
        this.redistributeSoilToxicity()
    }

    redistributeSoilToxicity () {
        let sum = 0
        let count = 0
        let squares = []
        for (let x = this.position.x - 2; x < this.position.x + 3; x++) {
            for (let y = this.position.y - 2; y < this.position.y + 3; y++) {
                const distance = utils.distanceBetweenSquares({x: this.position.x, y: this.position.y}, {x: x, y: y})
                if (distance <= 2.5) {
                    const square = game.checkGrid(x, y, true)
                    sum += game.checkGrid(x, y, true).soilToxicity
                    count += 1
                    squares.push(square)
                }
            }
        }
        const mean = sum / count
        squares.forEach(square => {
            const roll = utils.dice(3)
            if (roll === 1) {
                square.soilToxicity = (square.soilToxicity + square.soilToxicity + mean) / 3
            } else if (roll === 2) {
                square.soilToxicity = (square.soilToxicity + square.soilToxicity + square.soilToxicity + square.soilToxicity + mean) / 5
            }
        })
    }
}

export { Plant }