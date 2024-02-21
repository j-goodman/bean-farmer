import { Item } from './item.js';
import { Sprite } from './sprite.js';

class Ruby extends Item {
    constructor(x, y) {
        super(x, y)
        this.sprite = new Sprite ("ruby")
        this.name = "ruby"
    }
}

export { Ruby }