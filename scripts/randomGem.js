import { Emerald } from './emerald.js';
import { Item } from './item.js';
import { Ruby } from './ruby.js';
import { Sapphire } from './sapphire.js';
import { Sprite } from './sprite.js';
import { utils } from './utils.js';

class RandomGem extends Item {
    constructor(x, y) {
        super(x, y)
        this.sprite = new Sprite ("diamond")
        this.name = "random gem"
        const randomNum = (Math.floor(x / 12) + Math.floor(y / 12))
        if (randomNum % 3 === 0) {
            this.likely = Emerald
        } else if ((randomNum + 1) % 3 === 0) {
            this.likely = Ruby
        } else {
            this.likely = Sapphire
        }
        if (utils.dice(5) === 5) {
            this.likely = [Emerald, Ruby, Sapphire][Math.floor(Math.random() * 3)]
        }
    }

    update (age) {
        this.frameUpdate()
        this.die()
        new this.likely (this.position.x, this.position.y)
    }
}

game.constructors[RandomGem.name] = RandomGem
export { RandomGem }