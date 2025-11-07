import { PoisonCloud } from "./poisonCloud.js"
import { utils } from "./utils.js"

const nodes = {}
let totalVolume = 0

const poisonAttack = (user, volume=32, slowness=0) => {
    if (!user) {
        return false
    }
    totalVolume = volume
    addPoisonToAdjacentSquares(user.position, addPoisonToAdjacentSquares, slowness)
}

const addPoisonToAdjacentSquares = (position, callback, slowness=0) => {
    for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
            const square = game.checkGrid(position.x + x, position.y + y, true)
            if (
                (!square.occupant || square.occupant.animal) &&
                !square.airOccupant &&
                (x || y) && (!x || !y)
            ) {
                new PoisonCloud (position.x + x, position.y + y, "air")
                totalVolume -= 1
                if (callback && totalVolume > 0) {
                    game.setTimer(() => {
                        callback({
                            x: position.x + x,
                            y: position.y + y
                        }, callback, slowness)
                    }, utils.dice(4) + 1 + utils.dice(slowness))
                }
            }
        }
    }
}

export { poisonAttack }