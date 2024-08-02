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
        this.slidable = false
        this.spinning = false
        this.strikeCooldown = 0
        this.moveDelay = 3
        this.imageAngle = 0
    }

    update (age) {
        this.strikeCooldown -= 1
        this.frameUpdate()
        if (this.spinning) {
            this.imageAngle += 13
        }
    }

    use (user) {
        const coords = utils.directionToCoordinates(user.direction)
        this.throw(user, coords)
    }

    checkForCatch () {
        if (this.exists && game.player.exists && utils.distanceBetweenSquares(this.position, game.player.position) < 2) {
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
        this.moveDelay = 2
        this.elevation = "air"
        user.dropItem()
        this.spinning = true
        this.moveToAir()
        for (let i = 0; i < (this.range * 2) + 1; i++) {
            game.setTimer(() => {
                if (this.exists && i < this.range) {
                    this.checkForStrike(coords.x, coords.y)
                    this.moveThroughAir(coords.x, coords.y)
                } else {
                    this.checkForStrike(-coords.x, -coords.y)
                    this.moveThroughAir(-coords.x, -coords.y)
                    this.checkForCatch()
                }
            }, this.moveDelay * i)
            if (i === (this.range * 2)) {
                let repeat = () => {
                    this.spinning = false
                    this.elevation = null
                    if (this.exists && !this.checkForCatch()) {
                        console.log("Drop.")
                        this.imageAngle = 0
                        const success = this.moveFromAir()
                        if (!success) {
                            this.moveThroughAir(-coords.x, -coords.y, () => {
                                const success = this.moveFromAir()
                                if (!success) {
                                    repeat()
                                }
                            })
                        }
                    }
                }
                game.setTimer(repeat, (this.moveDelay * i) + 1)
            }
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