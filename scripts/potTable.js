import { Entity } from './entity.js';
import { Sprite } from './sprite.js';

class PotTable extends Entity {
    constructor(x, y) {
        super(x, y)
        this.sprite = new Sprite ("pot-table")
        this.name = "table"
        this.pushability = 2
        this.breakability = 6
        this.immobile = true
    }
}

game.constructors[PotTable.name] = PotTable
export { PotTable }