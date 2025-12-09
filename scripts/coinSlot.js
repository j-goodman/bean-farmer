import { Entity } from './entity.js';
import { Sprite } from './sprite.js';

class CoinSlot extends Entity {
    constructor(x, y) {
        super(x, y)
        this.sprite = new Sprite ("penny-slot")
        this.name = "penny slot"
        this.breakability = 7
        this.immobile = true
        this.numberOfPenniesSeeking = 100
        game.setTimer(() => {
            this.findDoor()
        }, 16)
    }

    findDoor () {
        for (let x = -1; x <= 1; x++) {
            for (let y = -1; y <= 1; y++) {
                let item = game.checkGrid(this.position.x + x, this.position.y + y)
                if (item && item.lockedDoor) {
                    this.door = item
                }
            }
        }
    }

    interaction (subject) {
        if (!subject) { return false }
        const item = subject.equipped
        let pennies = 0
        if (item && item.name === "key") {
            this.bounce()
        }
        if (item && item.name === "penny") {
            if (subject.items) {
                subject.items.forEach(item => {
                    if (item.name === "penny") {
                        pennies += 1
                    }
                })
            }
            if (pennies < this.numberOfPenniesSeeking) {
                this.bounce()
                for (let i = 0; i < 60; i++) {
                    game.setTimer(() => {
                        game.ctx.fillStyle = "#4a481b"
                        game.ctx.fillText(
                            pennies,
                            (this.spritePosition.x - game.viewport.origin.x) * game.tileSize + game.tileSize / 2,
                            (this.spritePosition.y - 1 + this.spriteOffset.y - game.viewport.origin.y) * game.tileSize + game.tileSize / 2
                        )
                    }, i)
                }
            } else {
                if (subject.items) {
                    subject.equipped = null
                    pennies = this.numberOfPenniesSeeking
                    subject.items.forEach(item => {
                        if (item.name === "penny" && pennies > 0) {
                            subject.removeFromInventory(item)
                            pennies -= 1
                        }
                    })
                }
                game.givePoints(100, this)
                if (this.door) { this.door.unlock() }
            }
        }
    }

    bounce () {
        let bounceNums = [
            0, .3, .6, 0, -.6, 0, .6, .3, -.3, -.3, 0,
        ]
        for (let i = 0; i < bounceNums.length; i++) {
            game.setTimer(() => {
                this.spriteOffset.y = bounceNums[i] / 20
            }, i)
        }
    }
}

game.constructors[CoinSlot.name] = CoinSlot
export { CoinSlot }