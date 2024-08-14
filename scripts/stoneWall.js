import { Entity } from './entity.js';
import { Sprite } from './sprite.js';
import { utils } from './utils.js';

class StoneWall extends Entity {
    constructor(x, y) {
        super(x, y)
        this.sprite = makeStoneWallSprite()
        this.name = "stone wall"
        this.sprite.version = "down"
        this.pipeConnection = true
        this.pushability = 10
        this.breakability = 5
        this.immobile = true
        this.brokenSprite = new Sprite ("stone-wall/broken/X")
        this.brokenSprite.addURDLVersions("stone-wall/broken")
        this.damage = 0
        if (utils.dice(19) === 19) {
            this.onBreak()
        }
    }

    onBreak () {
        if (this.damage > 0) {
            this.die()
        } else {
            this.damage += 1
            this.sprite = this.brokenSprite
            this.connectNeighbors()
        }
    }
}

const makeStoneWallSprite = () => {
    const wallSprite = new Sprite ("stone-wall/X")
    wallSprite.addURDLVersions("stone-wall")
    return wallSprite
}

game.constructors[StoneWall.name] = StoneWall
export { StoneWall }