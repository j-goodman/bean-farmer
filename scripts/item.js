import { Entity } from './entity.js';

import { game } from './game.js';

class Item extends Entity {
    constructor(x, y) {
        super(x, y)
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
            this.ghost.offset.x = 14
            this.ghost.offset.y = 6
            this.ghost.angle = 0
        } else if (holder.direction === "left") {
            this.ghost.offset.x = -14
            this.ghost.offset.y = 6
            this.ghost.angle = 0
        } else if (holder.direction === "down") {
            this.ghost.offset.x = 60
            this.ghost.offset.y = -20
            this.ghost.angle = -70
        } else if (holder.direction === "up") {
            this.ghost.offset.x = 75
            this.ghost.offset.y = 20
            this.ghost.angle = 100
        }
        
        if (this.swinging) {
            this.ghost.angle -= 90
            this.ghost.offset.y += 50
            if (holder.direction === "left") {
                this.ghost.offset.x += 30
            } else {
                this.ghost.offset.x -= 30
            }
        }

        const ghostSpeed = 12

        if (Math.abs(this.ghost.angle - this.spriteAngle) < ghostSpeed * 2) {
            this.spriteAngle = this.ghost.angle
        }
        if (this.ghost.angle > this.spriteAngle) {
            this.spriteAngle += ghostSpeed * 2
        } else if (this.ghost.angle < this.spriteAngle) {
            this.spriteAngle -= ghostSpeed * 2
        }

        if (Math.abs(this.ghost.offset.x - this.spriteOffset.x) < ghostSpeed) {
            this.spriteOffset.x = this.ghost.offset.x
        }
        if (this.ghost.offset.x > this.spriteOffset.x) {
            this.spriteOffset.x += ghostSpeed
        } else if (this.ghost.offset.x < this.spriteOffset.x) {
            this.spriteOffset.x -= ghostSpeed
        }

        if (Math.abs(this.ghost.offset.y - this.spriteOffset.y) < ghostSpeed) {
            this.spriteOffset.y = this.ghost.offset.y
        }
        if (this.ghost.offset.y > this.spriteOffset.y) {
            this.spriteOffset.y += ghostSpeed
        } else if (this.ghost.offset.y < this.spriteOffset.y) {
            this.spriteOffset.y -= ghostSpeed
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