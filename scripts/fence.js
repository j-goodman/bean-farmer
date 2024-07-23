import { Entity } from './entity.js';
import { FencePost } from './fencePost.js';
import { Sprite } from './sprite.js';
import { utils } from './utils.js';

class Fence extends Entity {
    constructor(x, y) {
        super(x, y)
        this.sprite = makeFenceSprite()
        this.name = "fence"
        this.sprite.version = "down"
        this.pipeConnection = true
        this.pushability = 10
        this.breakability = 5
        this.burnability = 7
        this.immobile = true
    }

    onCut () {
        this.die()
    }

    burn () {
        if (utils.dice(4) === 4) {
            game.checkGrid(this.position.x, this.position.y, true).airOccupant = null
        }
        this.cleanSoil(3, "soilHealth", 1)
        if (this.onHit) { this.onHit() }
        this.burnability -= 1
        if (this.burnability <= 0) {
            this.die()
        }
    }
    
    onDeath () {
        this.checkDrop(new FencePost (this.position.x, this.position.y))
    }
}

const makeFenceSprite = () => {
    const fenceSprite = new Sprite ("fence/X")

    fenceSprite.addVersion("down", "fence/X")

    fenceSprite.addURDLVersions("fence")

    return fenceSprite
}

game.constructors[Fence.name] = Fence
export { Fence }