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

    onDrop (x, y) {
        if (
            game.player && game.player.items.map(item => { return item.name }).includes("hatchet")
        ) {
            this.die()
            const fence = new Fence (this.position.x, this.position.y)
            game.setTimer(() => {
                fence.connectNeighbors()
            }, 0)
        } else {
            this.spriteOffset = {
                x: 0, y: 0
            }
            this.idle()
        }
    }
}

game.constructors[FencePost.name] = FencePost
export { FencePost }