import { Entity } from './entity.js';

import { game } from './game.js';

class Item extends Entity {
    constructor(x, y) {
        super(x, y)
        this.pushability = 1
        this.spriteOffset.y = .1
        this.pickupable = true
    }

    onPush (x, y) {
        this.idle()
    }

    idle () {
        let jumpNums = [0, -2, -3, -3, -2, 0, -1, 0, -2, -3, -3, -2, 0]
        for (let i = 0; i < jumpNums.length; i++) {
            game.setTimer(() => {
                this.spriteOffset.y = (jumpNums[i] / 30) + .1
            }, i)
        }
    }

    getPickedUp (subject) {
        console.log("Added to inventory:", this)
        subject.items.push(this)
        this.die()
    }
}

export { Item }