import { Entity } from './entity.js';
import { Sprite } from './sprite.js';

import { game } from './game.js';

class WoolyPigCarcass extends Entity {
    constructor(x, y) {
        super(x, y)
        this.imageName = "wooly-pig-carcass/1"
        this.sprite = new Sprite (this.imageName)
        this.sprite.addVersion("skeleton", "wooly-pig-carcass/2")
        this.pushability = 2
        for (let i = 0; i <= 7; i++) {
            game.setTimer(() => {
                this.fertilizeSoil()
            }, 500 * i)
        }
        game.setTimer(() => {
            this.sprite.changeVersion("skeleton")
        }, 5000)
    }

    fertilizeSoil () {
        [
            {x: 0, y: 0},
            {x: 1, y: 0},
            {x: -1, y: 0},
            {x: 0, y: 1},
            {x: 0, y: -1}
        ].forEach(coords => {
            const square = game.checkGrid(this.position.x + coords.x, this.position.y + coords.y, true)
            square.soilHealth += 0.18
            this.redistributeSoilHealth()
        })
    }
}

export { WoolyPigCarcass }