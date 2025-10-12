import { Entity } from './entity.js';
import { Sprite } from './sprite.js';
import { worldMap } from './worldMap.js';

class MapTable extends Entity {
    constructor(x, y) {
        super(x, y)
        this.sprite = new Sprite ("map-table")
        this.name = "map table"
        this.breakability = 7
        this.immobile = true
    }

    interaction () {
        if (this.position.x > 86) {
            worldMap.open(90)
        } else {
            worldMap.open()
        }
    }
}

game.constructors[MapTable.name] = MapTable
export { MapTable }