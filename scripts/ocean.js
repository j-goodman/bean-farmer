import { Entity } from './entity.js';
import { Sprite } from './sprite.js';

class Ocean extends Entity {
    constructor(x, y) {
        super(x, y)
        this.sprite = makeOceanSprite()
        this.name = "ocean"
        this.sprite.version = "down"
        this.pipeConnection = true
        this.pushability = 10
        this.breakability = 10
        this.immobile = true
    }
}

const makeOceanSprite = () => {
    const oceanSprite = new Sprite ("ocean")

    oceanSprite.addVersion("down", "ocean")
    oceanSprite.addURDLVersions("ocean")
    oceanSprite.addVersion("fill", "ocean/fill")

    return oceanSprite
}

game.constructors[Ocean.name] = Ocean
export { Ocean }