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
        if (this.spinning) {
            this.imageAngle -= 35
        }
        if (this.movable) {
            this.frameUpdate()
        }
    }

    use (user) {
        const coords = utils.directionToCoordinates(user.direction)
        if (game.checkGrid(user.position.x + coords.x, user.position.y + coords.y)) {
            this.swinging = true
            game.setTimer(() => {
                this.swinging = false
            }, 6)    
            const facing = utils.directionFromCoordinates(coords.x, coords.y)
            const cut = new Cut (user.position.x + coords.x, user.position.y + coords.y)
            cut.setDirection(facing)

            const target = game.checkGrid(user.position.x + coords.x, user.position.y + coords.y)
            if (target && target.onCut) {
                target.onCut(user)
            } else if (target && target.onHit) {
                target.onHit(user)
            }
        } else {
            this.throw(user, coords)
        }
    }
    
    throw (user, coords) {
        this.moveDelay = 2
        this.spinning = true
        user.dropItem()
        for (let i = 0; i < this.range * 2; i++) {
            game.setTimer(() => {
                if (i < this.range) {
                    this.checkForStrike(coords.x, coords.y)
                    const success = this.move(coords.x, coords.y)
                } else {
                    this.checkForStrike(-coords.x, -coords.y)
                    this.move(-coords.x, -coords.y)
                }
            }, this.moveDelay * i)
            if (i === (this.range * 2) - 1) {
                game.setTimer(() => {
                    this.spinning = false
                    this.spritePosition.x = this.position.x
                    this.spritePosition.y = this.position.y
                }, (this.moveDelay * i) + 1)
            }
        }
    }

    checkForStrike (x, y) {
        const target = game.checkGrid(this.position.x + x, this.position.y + y)
        if (this.strikeCooldown <= 0 && target && target.name !== "player") {
            this.strikeCooldown = 20
            game.setTimer(() => {
                if (target.onCut) {
                    target.onCut()
                } else if (target.onHit) {
                    target.onHit()
                }
            }, 3)
        }
    }

    return () {
        // this.walkTo(game.player.position)
    }
}

game.constructors[Boomerang.name] = Boomerang
export { Boomerang }