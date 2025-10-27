import { Entity } from './entity.js';
import { Sprite } from './sprite.js';
import { BoneShards } from './boneShards.js';

import { game } from './game.js';

class ChickenCarcass extends Entity {
    constructor(x, y) {
        super(x, y)
        this.imageName = "chicken/carcass"
        this.name = "chicken carcass"
        this.sprite = new Sprite (this.imageName)
        this.sprite.addVersion("skeleton", "chicken/skeleton")
        this.breakability = 5
        this.pushability = 2
        for (let i = 0; i <= 6; i++) {
            game.setTimer(() => {
                this.fertilizeSoil()
            }, 500 * i)
        }
        game.setTimer(() => {
            this.sprite.changeVersion("skeleton")
            this.skeleton = true
            this.breakability = 5
        }, 5000)
    }

    fertilizeSoil () {
        this.cleanSoil(4, "soilHealth", 1)
    }

    onCut () {
        if (this.skeleton) {
            this.break()
        }
    }

    onDeath () {
        const drop = new BoneShards ()
        drop.sprite = new Sprite ("chicken/bone-shards")
        this.checkDrop(drop)
    }
}

game.constructors[ChickenCarcass.name] = ChickenCarcass
export { ChickenCarcass }