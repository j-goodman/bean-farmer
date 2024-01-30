import { Sprite } from '../sprite.js';

const makeDragonFlowerSprite = () => {
    const dragonFlowerSprite = new Sprite ("dragon-flower/down")
    
    dragonFlowerSprite.addVersion("down", "woolydragon-flower/down")
    dragonFlowerSprite.addVersion("left", "woolydragon-flower/left")
    dragonFlowerSprite.addVersion("up", "woolydragon-flower/up")
    dragonFlowerSprite.addVersion("right", "woolydragon-flower/right")

    return dragonFlowerSprite
}

export { makeDragonFlowerSprite }