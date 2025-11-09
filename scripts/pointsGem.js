import { Item } from './item.js';
import { Sprite } from './sprite.js';
import { utils } from './utils.js';

class PointsGem extends Item {
    constructor(x, y) {
        super(x, y)
        this.name = "gem"
        this.sprite = new Sprite ("small-gem")
    }

    interaction() {
        game.givePoints(1200, this)
        utils.drawSparks(game.player.position, 150)
        utils.drawSparks(game.player.position, 120)
        utils.drawSparks(game.player.position, 90)
        utils.drawSparks(game.player.position, 60)
        utils.drawSparks(game.player.position, 30)
        utils.drawSparks(game.player.position, 10)
        this.die()
    }
}

game.constructors[PointsGem.name] = PointsGem
export { PointsGem }