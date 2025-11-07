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

    setDefaultEquippedOffsets = () => {
        this.equippedOffsets = {
            up: {
                x: -50,
                y: -20,
                angle: 20
            },
            right: {
                x: 50,
                y: 25,
                angle: 60
            },
            down: {
                x: -30,
                y: 44,
                angle: -60
            },
            left: {
                x: -60,
                y: 20,
                angle: -10
            },
            swing: {
                x: -30,
                y: 60,
                angle: -150
            }
        }
    }

    holdUpdate (holder) {
        if (this.holdAction) {
            this.holdAction(holder)
        }
        if (!this.equippedOffsets) {
            this.setDefaultEquippedOffsets()
        }
        if (holder.direction === "right") {
            this.ghost.offset.x = this.equippedOffsets.right.x
            this.ghost.offset.y = this.equippedOffsets.right.y
            this.ghost.angle = this.equippedOffsets.right.angle
        } else if (holder.direction === "left") {
            this.ghost.offset.x = this.equippedOffsets.left.x
            this.ghost.offset.y = this.equippedOffsets.left.y
            this.ghost.angle = this.equippedOffsets.left.angle
        } else if (holder.direction === "down") {
            this.ghost.offset.x = this.equippedOffsets.down.x
            this.ghost.offset.y = this.equippedOffsets.down.y
            this.ghost.angle = this.equippedOffsets.down.angle
        } else if (holder.direction === "up") {
            this.ghost.offset.x = this.equippedOffsets.up.x
            this.ghost.offset.y = this.equippedOffsets.up.y
            this.ghost.angle = this.equippedOffsets.up.angle
        }
        
        if (this.swinging) {
            this.ghost.angle += this.equippedOffsets.swing.angle
            this.ghost.offset.y += this.equippedOffsets.swing.y
            if (holder.direction === "left") {
                this.ghost.offset.x += this.equippedOffsets.swing.x
            } else {
                this.ghost.offset.x -= this.equippedOffsets.swing.x
            }
        }
        
        if (this.windup) {
            this.ghost.angle -= (this.equippedOffsets.swing.angle * .65)
            this.ghost.offset.y -= (this.equippedOffsets.swing.y * .65)
            if (holder.direction === "left") {
                this.ghost.offset.x -= (this.equippedOffsets.swing.x * .65)
            } else {
                this.ghost.offset.x += (this.equippedOffsets.swing.x * .65)
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

game.constructors[Item.name] = Item
export { Item }