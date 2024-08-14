import { Item } from './item.js';
import { Sprite } from './sprite.js';
import { SnowSnail } from './snowSnail.js';

import { utils } from './utils.js';

class SnailEgg extends Item {
    constructor(x, y) {
        super(x, y)
        this.name = "snail egg"
        this.sprite = new Sprite ("snail-egg")
        this.hatchAge = 2750 + utils.dice(500)
        this.sprite.addAnimatedVersion("hatch", [
            "snail-egg-hatch/1",
            "snail-egg-hatch/2",
            "snail-egg-hatch/3",
            "snail-egg-hatch/4",
            "snail-egg-hatch/5",
            "snail-egg-hatch/6",
            "snail-egg-hatch/7",
            "snail-egg-hatch/8",
            "snail-egg-hatch/9",
            "snail-egg-hatch/10",
            "snail-egg-hatch/11",
            "snail-egg-hatch/12",
            "snail-egg-hatch/13",
            "snail-egg-hatch/14",
            "snail-egg-hatch/15",
            "snail-egg-hatch/16",
            "snail-egg-hatch/17",
            "snail-egg-hatch/18",
        ])
    }

    update (age) {
        if (age > this.hatchAge && !this.hatched) {
            this.hatched = true
            this.hatch()
        }
        if (this.movable) {
            this.frameUpdate()
        }
    }

    hatch () {
        this.pickupable = false
        game.setTimer(() => {
            new SnowSnail (this.position.x, this.position.y)
        }, 16)
        this.playAnimationOnce("hatch", () => {
            this.die()
        })
    }
}

game.constructors[SnailEgg.name] = SnailEgg
export { SnailEgg }