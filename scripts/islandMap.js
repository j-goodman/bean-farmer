import { Item } from './item.js';
import { Sprite } from './sprite.js';
import { worldMap } from './worldMap.js';


class IslandMap extends Item {
    constructor(x, y) {
        super(x, y)
        this.sprite = new Sprite ("island-map")
        this.name = "island map"
    }

    use (user) {
        worldMap.open()
    }
}

game.constructors[IslandMap.name] = IslandMap
export { IslandMap }