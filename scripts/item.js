import { Entity } from './entity.js';

import { game } from './game.js';

class Item extends Entity {
    constructor(x, y, elevation, dna) {
        super(x, y, elevation, dna)
        this.pushability = 1
        this.spriteOffset.y = .1
        this.spriteAngle = 0
        this.pickupable = true
        this.pickedUp = false
        this.swinging = false
        this.ghost = {
            angle: 0,
            offset: {
                x: 0,
                y: 0
            }
        }
        if (this.onDrop) {
            this.onDrop()
        }
    }

    onDrop (x, y) {
        this.spriteOffset = {
            x: 0, y: 0
        }
        this.idle()
    }

    onPush (x, y) {
        this.idle()
    }

    holdUpdate (holder) {
        if (holder.direction === "right") {
            this.ghost.offset.x = 14 + 75
            this.ghost.offset.y = 6
            this.ghost.angle = 0
        } else if (holder.direction === "left") {
            this.ghost.offset.x = -14 - 75
            this.ghost.offset.y = 6
            this.ghost.angle = 0
        } else if (holder.direction === "down") {
            this.ghost.offset.x = 60
            this.ghost.offset.y = -20 + 75
            this.ghost.angle = -70
        } else if (holder.direction === "up") {
            this.ghost.offset.x = 75
            this.ghost.offset.y = 20 - 75
            this.ghost.angle = 100
        }
        
        if (this.swinging) {
            this.ghost.angle -= 150
            this.ghost.offset.y += 100
            if (holder.direction === "left") {
                this.ghost.offset.x += 80
            } else {
                this.ghost.offset.x -= 80
            }
        }

        const ghostFrames = 5

        let diff = 0
        diff = Math.abs(this.ghost.angle - this.spriteAngle)
        if (this.ghost.angle > this.spriteAngle) {
            this.spriteAngle += diff / ghostFrames
        } else if (this.ghost.angle < this.spriteAngle) {
            this.spriteAngle -= diff / ghostFrames
        }

        diff = Math.abs(this.ghost.offset.x - this.spriteOffset.x)
        if (this.ghost.offset.x > this.spriteOffset.x) {
            this.spriteOffset.x += diff / ghostFrames
        } else if (this.ghost.offset.x < this.spriteOffset.x) {
            this.spriteOffset.x -= diff / ghostFrames
        }

        diff = Math.abs(this.ghost.offset.y - this.spriteOffset.y)
        if (this.ghost.offset.y > this.spriteOffset.y) {
            this.spriteOffset.y += diff / ghostFrames
        } else if (this.ghost.offset.y < this.spriteOffset.y) {
            this.spriteOffset.y -= diff / ghostFrames
        }
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
        subject.items.push(this)
        this.die()
    }
}

export { Item }