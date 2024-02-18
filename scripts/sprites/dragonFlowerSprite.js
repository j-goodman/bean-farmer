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
        "dragon-flower/down-right-1",
        "dragon-flower/down-right-2",
        "dragon-flower/down-right-3",
        "dragon-flower/down-right-1",
        "dragon-flower/down-left-2",
        "dragon-flower/down-left-4",
        "dragon-flower/down-left-5",
    ])

    dragonFlowerSprite.addTransition("down", "right", [
        "dragon-flower/down-left-1",
        "dragon-flower/down-left-2",
        "dragon-flower/down-right-1",
        "dragon-flower/down-right-3",
        "dragon-flower/down-right-4",
        "dragon-flower/down-right-5",
    ])

    dragonFlowerSprite.addTransition("right", "up", [
        "dragon-flower/right-up-1",
        "dragon-flower/right-up-2",
        "dragon-flower/right-up-3",
        "dragon-flower/right-up-4",
        "dragon-flower/right-up-5",
    ])

    dragonFlowerSprite.addTransition("left", "up", [
        "dragon-flower/left-up-1",
        "dragon-flower/left-up-2",
        "dragon-flower/left-up-3",
        "dragon-flower/left-up-4",
        "dragon-flower/left-up-5",
    ])

    dragonFlowerSprite.addTransition("down", "up", [
        "dragon-flower/down-left-1",
        "dragon-flower/down-left-2",
        "dragon-flower/down-left-3",
        "dragon-flower/down-left-4",
        "dragon-flower/left-up-2",
        "dragon-flower/left-up-3",
        "dragon-flower/left-up-4",
        "dragon-flower/left-up-5",
    ])

    dragonFlowerSprite.addTransition("left", "right", [
        "dragon-flower/down-left-5",
        "dragon-flower/down-left-4",
        "dragon-flower/down-left-3",
        "dragon-flower/down-left-2",
        "dragon-flower/down-right-2",
        "dragon-flower/down-right-3",
        "dragon-flower/down-right-4",
        "dragon-flower/down-right-5",
    ])
    
    dragonFlowerSprite.addTransition("down", "mouth-open-down", [
        "dragon-flower/mouth-open-down-1",
        "dragon-flower/mouth-open-down-2",
        "dragon-flower/mouth-open-down-3",
        "dragon-flower/mouth-open-down-4",
        "dragon-flower/mouth-open-down-5",
    ])
    
    dragonFlowerSprite.addTransition("up", "mouth-open-up", [
        "dragon-flower/mouth-open-up-1",
    ])
    
    dragonFlowerSprite.addTransition("right", "mouth-open-right", [
        "dragon-flower/mouth-open-right-1",
        "dragon-flower/mouth-open-right-2",
        "dragon-flower/mouth-open-right-3"
    ])
    
    dragonFlowerSprite.addTransition("left", "mouth-open-left", [
        "dragon-flower/mouth-open-left-1",
        "dragon-flower/mouth-open-left-2",
        "dragon-flower/mouth-open-left-3"
    ])

    return dragonFlowerSprite
}

export { makeDragonFlowerSprite }