import { Entity } from './entity.js';
import { Sprite } from './sprite.js';
import { BoneShards } from './boneShards.js';

import { game } from './game.js';

class WoolyPigCarcass extends Entity {
    constructor(x, y) {
        super(x, y)
        this.imageName = "wooly-pig-carcass/1"
        this.sprite = new Sprite (this.imageName)
        this.sprite.addVersion("skeleton", "wooly-pig-carcass/2")
        this.breakability = 6
        this.pushability = 2
        for (let i = 0; i <= 7; i++) {
            game.setTimer(() => {
                this.fertilizeSoil()
            }, 500 * i)
        }
        game.setTimer(() => {
            this.sprite.changeVersion("skeleton")
            this.breakability = 5
        }, 5000)
    }

    fertilizeSoil () {
        this.cleanSoil(7, "soilHealth", 1)
    }

    onDeath () {
        this.checkDrop(new BoneShards ())
    }
}

game.constructors[WoolyPigCarcass.name] = WoolyPigCarcass
export { WoolyPigCarcass }