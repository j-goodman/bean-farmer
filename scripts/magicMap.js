import { Item } from './item.js';
import { Sprite } from './sprite.js';
import { worldMap } from './worldMap.js';


class MagicMap extends Item {
    constructor(x, y) {
        super(x, y)
        this.sprite = new Sprite ("magic-map")
        this.name = "magic map"
    }

    use (user) {
        worldMap.open(game.player.position.x, game.player.position.y)
    }
}

game.constructors[MagicMap.name] = MagicMap
export { MagicMap }