import { Item } from './item.js';
import { Sprite } from './sprite.js';
import { Cut } from './cut.js';
import { Fire } from './fire.js';

import { utils } from './utils.js';


class BurningSword extends Item {
    constructor(x, y) {
        super(x, y)
        this.sprite = new Sprite ("burning-sword")
        this.name = "burning sword"
        this.pickUpBefore = false
        this.equippedOffsets = {
            up: {
                x: 36,
                y: -30,
                angle: 10
            },
            right: {
                x: 40,
                y: 6,
                angle: -60
            },
            down: {
                x: 60,
                y: 20,
                angle: -80
            },
            left: {
                x: -60,
                y: 6,
                angle: -30
            },
            swing: {
                x: 80,
                y: 100,
                angle: -150
            }
        }
    }

    windupSwing () {
        this.windup = true
        game.setTimer(() => {
            this.windup = false
        }, 5)
    }

    getPickedUp (subject) {
        subject.items.push(this)
        if (!this.pickedUpBefore) {
            game.givePoints(800, this)
            this.pickedUpBefore = true
        }
        this.die()
    }

    use (user) {
        this.swinging = true
        game.setTimer(() => {
            this.swinging = false
        }, 6)
        let x = user.position.x
        let y = user.position.y
        this.position.x = x
        this.position.y = y
        let facing = utils.directionToCoordinates(user.direction)
        let cut = new Cut (x + facing.x, y + facing.y, "air")
        cut.setDirection(user.direction)
        for (let i = 0; i < 3; i++) {
            game.setTimer(() => {
                const fire = new Fire (this.position.x + (facing.x * (i + 2)), this.position.y + (facing.y * (i + 2)), "air")
                fire.loyalty = user.id
            }, 5 * i)
        }
        let target = game.checkGrid(x + facing.x, y + facing.y)

        if (!target) {
            target = game.checkGrid(x + facing.x, y + facing.y, true).groundOccupant
        }

        if (target && target.exists && target.burn) {
            game.setTimer(() => {
                target.burn(this)
            }, 8)
        }

        if (target && target.onCut) {
            target.onCut(user)
        }
    }
}

game.constructors[BurningSword.name] = BurningSword
export { BurningSword }