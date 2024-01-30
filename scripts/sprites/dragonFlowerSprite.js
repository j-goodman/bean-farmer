import { Sprite } from '../sprite.js';

const makeDragonFlowerSprite = () => {
    const woolyPigSprite = new Sprite ("dragon-flower/down")
    
    woolyPigSprite.addVersion("down", "woolydragon-flower/down")
    woolyPigSprite.addVersion("left", "woolydragon-flower/left")
    woolyPigSprite.addVersion("up", "woolydragon-flower/up")
    woolyPigSprite.addVersion("right", "woolydragon-flower/right")

    return woolyPigSprite
}

export { makeDragonFlowerSprite }