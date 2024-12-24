import { Entity } from './entity.js';
import { Sprite } from './sprite.js';
import { utils } from './utils.js';

class BrokenSaw extends Entity {
    constructor(x, y) {
        super(x, y)
        this.sprite = new Sprite ("broken-saw")
        this.name = "broken saw"
        this.pushability = 10
        this.breakability = 6
        this.immobile = true
        game.setTimer(() => {
            const floor = game.checkGrid(this.position.x, this.position.y, true).groundOccupant
            if (floor && floor.name === "wood floor") {
                floor.die()
            }
            this.breakFloor()
        }, 30)
    }
    
    onBreak () {
        this.die()
    }
    
    onTouch (subject) {
        if (game.time % 16 === 0 && subject && subject.onCut) {
            subject.onCut()
        }
    }

    breakFloor () {
        const breaking = 6
        for (let i = 0; i < breaking; i++) {
            const x = utils.dice(7) - 4
            const y = utils.dice(3) - 2
            const floor = game.checkGrid(this.position.x + x, this.position.y + y, true).groundOccupant
            if (floor && floor.name === "wood floor") {
                floor.die()
            }
        }
    }

    
}

game.constructors[BrokenSaw.name] = BrokenSaw
export { BrokenSaw }