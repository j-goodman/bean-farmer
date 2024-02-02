import { Sprite } from '../sprite.js';

const makeDragonFlowerSprite = () => {
    const dragonFlowerSprite = new Sprite ("dragon-flower/down")
    
    dragonFlowerSprite.addVersion("down", "dragon-flower/down")
    dragonFlowerSprite.addVersion("left", "dragon-flower/left")
    dragonFlowerSprite.addVersion("up", "dragon-flower/up")
    dragonFlowerSprite.addVersion("right", "dragon-flower/right")
    
    dragonFlowerSprite.addVersion("mouth-open-down", "dragon-flower/mouth-open-down")
    dragonFlowerSprite.addVersion("mouth-open-left", "dragon-flower/mouth-open-left")
    dragonFlowerSprite.addVersion("mouth-open-up", "dragon-flower/mouth-open-up")
    dragonFlowerSprite.addVersion("mouth-open-right", "dragon-flower/mouth-open-right")

    dragonFlowerSprite.addTransition("down", "left", [
        "dragon-flower/down",
        "dragon-flower/left"
    ])
    
    dragonFlowerSprite.addTransition("down", "mouth-open-down", [
        "dragon-flower/down",
        "dragon-flower/mouth-open-down",
    ])

    return dragonFlowerSprite
}

export { makeDragonFlowerSprite }