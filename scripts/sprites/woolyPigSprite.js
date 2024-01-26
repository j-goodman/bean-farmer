import { Sprite } from '../sprite.js';

const makeWoolyPigSprite = () => {
    const woolyPigSprite = new Sprite ("wooly-pig-up")
    
    woolyPigSprite.addVersion("down", "wooly-pig-down")
    woolyPigSprite.addVersion("left", "wooly-pig-left")
    woolyPigSprite.addVersion("up", "wooly-pig-up")
    woolyPigSprite.addVersion("right", "wooly-pig-right")
    
    woolyPigSprite.addTransition("down", "right", [
        "wooly-pig-down-right-1",
        "wooly-pig-down-right-2",
        "wooly-pig-down-right-3"
    ])
    
    woolyPigSprite.addTransition("right", "up", [
        "wooly-pig-right-up-0",
        "wooly-pig-right-up-1",
        "wooly-pig-right-up-2",
        "wooly-pig-right-up-3",
        "wooly-pig-right-up-4"
    ])
    
    woolyPigSprite.addTransition("left", "up", [
        "wooly-pig-left-up-0",
        "wooly-pig-left-up-1",
        "wooly-pig-left-up-2",
        "wooly-pig-left-up-3",
        "wooly-pig-left-up-4"
    ])
    
    woolyPigSprite.addTransition("down", "left", [
        "wooly-pig-down-left-1",
        "wooly-pig-down-left-2",
        "wooly-pig-down-left-3"
    ])
    
    woolyPigSprite.addTransition("left", "right", [
        "wooly-pig-down-left-3",
        "wooly-pig-down-left-2",
        "wooly-pig-down",
        "wooly-pig-down-right-2",
        "wooly-pig-down-right-3"
    ])
    
    woolyPigSprite.addTransition("up", "down", [
        "wooly-pig-right-up-3",
        "wooly-pig-right-up-2",
        "wooly-pig-right",
        "wooly-pig-down-right-2",
        "wooly-pig-down-right-1"
    ])

    woolyPigSprite.addAnimatedVersion("attack-right", [
        "wooly-pig-attack-right/1",
        "wooly-pig-attack-right/2",
        "wooly-pig-attack-right/3",
        "wooly-pig-attack-right/4",
        "wooly-pig-attack-right/4",
        "wooly-pig-attack-right/5",
        "wooly-pig-attack-right/5",
        "wooly-pig-attack-right/6",
        "wooly-pig-attack-right/6",
        "wooly-pig-attack-right/7",
        "wooly-pig-attack-right/8",
        "wooly-pig-attack-right/9",
        "wooly-pig-attack-right/10",
    ])

    woolyPigSprite.addAnimatedVersion("attack-left", [
        "wooly-pig-attack-left/1",
        "wooly-pig-attack-left/2",
        "wooly-pig-attack-left/3",
        "wooly-pig-attack-left/4",
        "wooly-pig-attack-left/4",
        "wooly-pig-attack-left/5",
        "wooly-pig-attack-left/5",
        "wooly-pig-attack-left/6",
        "wooly-pig-attack-left/6",
        "wooly-pig-attack-left/7",
        "wooly-pig-attack-left/8",
        "wooly-pig-attack-left/9",
        "wooly-pig-attack-left/10",
    ])

    woolyPigSprite.addAnimatedVersion("attack-up", [
        "wooly-pig-attack-up/1",
        "wooly-pig-attack-up/2",
        "wooly-pig-attack-up/3",
        "wooly-pig-attack-up/4",
        "wooly-pig-attack-up/5",
        "wooly-pig-attack-up/6",
        "wooly-pig-attack-up/7",
        "wooly-pig-attack-up/8",
        "wooly-pig-attack-up/9",
        "wooly-pig-attack-up/10",
    ])

    woolyPigSprite.addAnimatedVersion("attack-down", [
        "wooly-pig-attack-down/1",
        "wooly-pig-attack-down/2",
        "wooly-pig-attack-down/3",
        "wooly-pig-attack-down/4",
        "wooly-pig-attack-down/5",
        "wooly-pig-attack-down/5",
        "wooly-pig-attack-down/6",
        "wooly-pig-attack-down/6",
        "wooly-pig-attack-down/7",
        "wooly-pig-attack-down/8",
        "wooly-pig-attack-down/9",
        "wooly-pig-attack-down/10",
        "wooly-pig-attack-down/11",
    ])

    return woolyPigSprite
}

export { makeWoolyPigSprite }