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
        this.equippedOffsets = {
            up: {
                x: 0,
                y: -100,
                angle: 0
            },
            right: {
                x: 60,
                y: 6,
                angle: -30
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
                new Fire (this.position.x + (facing.x * (i + 2)), this.position.y + (facing.y * (i + 2)), "air")
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