import { Fence } from './fence.js';
import { Item } from './item.js';
import { Sprite } from './sprite.js';

import { utils } from './utils.js';

class FencePost extends Item {
    constructor(x, y) {
        super(x, y)
        this.sprite = new Sprite ("fencepost")
        this.burnability = 4
        this.name = "fence post"
    }

    onDrop () {
        this.die()
        const fence = new Fence (this.position.x, this.position.y)
        game.setTimer(() => {
            fence.connectNeighbors()
        }, 0)
    }
}

game.constructors[FencePost.name] = FencePost
export { FencePost }