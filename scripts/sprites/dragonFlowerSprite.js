import { Sprite } from '../sprite.js';

const makeDragonFlowerSprite = () => {
    const dragonFlowerSprite = new Sprite ("dragon-flower/down")
    
    dragonFlowerSprite.addVersion("down", "dragon-flower/down")
    dragonFlowerSprite.addVersion("left", "dragon-flower/left")
    dragonFlowerSprite.addVersion("up", "dragon-flower/up")
    dragonFlowerSprite.addVersion("right", "dragon-flower/right")

    return dragonFlowerSprite
}

export { makeDragonFlowerSprite }