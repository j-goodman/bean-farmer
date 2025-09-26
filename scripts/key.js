import { Item } from './item.js';
import { Sprite } from './sprite.js';

class Key extends Item {
    constructor(x, y) {
        super(x, y)
        this.name = "key"
        this.sprite = new Sprite ("key")
    }
}

game.constructors[Key.name] = Key
export { Key }