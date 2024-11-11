import { Item } from './item.js';
import { Sprite } from './sprite.js';
import { Cut } from './cut.js';

import { utils } from './utils.js';

class Boomerang extends Item {
    constructor(x, y) {
        super(x, y)
        this.name = "boomerang"
        this.sprite = new Sprite ("boomerang")
        this.extraTraction = true
        this.range = 7
        this.timeSinceThrow = 0
        this.slidable = false
        this.spinning = false
        this.strikeCooldown = 0
        this.moveDelay = 2
        this.imageAngle = 0
    }

    update (age) {
        this.strikeCooldown -= 1
        this.timeSinceThrow += 1
        this.frameUpdate()
        if (this.spinning) {
            this.imageAngle += 19
        }
    }

    use (user) {
        const coords = utils.directionToCoordinates(user.direction)
        this.throw(user, coords)
    }

    checkForCatch () {
        if (this.exists && game.player.exists && (
            utils.distanceBetweenSquares(this.position, game.player.position) < 2 ||
            this.timeSinceThrow > 27
        )) {
            const square = game.checkGrid(this.position.x, this.position.y, true)
            this.imageAngle = 0
            game.player.pickUpItem(this)
            square.airOccupant = null
            return true
        } else {
            return false
        }
    }
    
    throw (user, coords) {
        const range = 7
        user.dropItem(this)
        this.spinning = true
        this.moveDelay = 3
        for (let i = 0; i <= range * 2; i++) {
            game.setTimer(() => {
                if (i < range) {
                    this.move(coords.x, coords.y)
                } else {
                    this.move(coords.x * -1, coords.y * -1)
                }
                if (i === range * 2) {
                    this.spinning = false
                }
                this.checkForStrike(coords.x, coords.y)
            }, i * this.moveDelay)
        }
    }

    checkForStrike (x, y) {
        const target = game.checkGrid(this.position.x + x, this.position.y + y)
        if (this.strikeCooldown <= 0 && target && target.name !== "player") {
            game.setTimer(() => {
                if (this.strikeCooldown <= 0 && target.onCut) {
                    this.strikeCooldown = 25
                    target.onCut(this)
                }
            }, 3)
            game.setTimer(() => {
                this.strikeCooldown = 0
            }, 26)
        }
    }
}

game.constructors[Boomerang.name] = Boomerang
export { Boomerang }