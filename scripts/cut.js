import { Entity } from './entity.js';
import { Sprite } from './sprite.js';

import { utils } from './utils.js';

class Cut extends Entity {
    constructor(x, y, elevation) {
        super(x, y, elevation)
        this.name = "cut"
        this.sprite = makeCutSprite()
    }

    update (age) {
        this.frameUpdate()
        if (age > 6) {
            this.die()
        }
    }
}

const makeCutSprite = () => {
    const cutSprite = new Sprite ("corn-pink")
    return cutSprite
}

export { Cut }