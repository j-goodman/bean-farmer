import { Entity } from './entity.js';
import { Sprite } from './sprite.js';

class Scarecrow extends Entity {
    constructor(x, y) {
        super(x, y)
        this.sprite = new Sprite ("scarecrow")
        this.name = "scarecrow"
        this.pushability = 10
        this.breakability = 7
        this.immobile = true
        game.setTimer(() => {
            console.log("Scarecrow.")
            this.breakability = 6
        }, 30 * 60 * 9)
    }
}

game.constructors[Scarecrow.name] = Scarecrow
export { Scarecrow }