import { Item } from './item.js';
import { Sprite } from './sprite.js';
import { Fire } from './fire.js';

import { utils } from './utils.js';


class Lamp extends Item {
    constructor(x, y) {
        super(x, y)
        this.sprite = new Sprite ("lamp")
        this.name = "lamp"
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
        let fire = new Fire (x + facing.x, y + facing.y, "air")
    }
}

game.constructors[Lamp.name] = Lamp
export { Lamp }