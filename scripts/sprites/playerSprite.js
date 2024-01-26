import { Sprite } from '../sprite.js';

const makePlayerSprite = () => {
    const playerSprite = new Sprite ("blob-down")

    playerSprite.addVersion("down", "blob-down")
    playerSprite.addVersion("left", "blob-left")
    playerSprite.addVersion("up", "blob-up")
    playerSprite.addVersion("right", "blob-right")

    playerSprite.addVersion("up-left", "blob-left-up-2")
    playerSprite.addVersion("up-right", "blob-right-up-2")
    playerSprite.addVersion("down-right", "blob-down-right-2")
    playerSprite.addVersion("down-left", "blob-down-left-2")

    playerSprite.addTransition("down", "right", [
        "blob-down-right-1",
        "blob-down-right-2"
    ])

    playerSprite.addTransition("right", "up", [
        "blob-right-up-1",
        "blob-right-up-2"
    ])

    playerSprite.addTransition("up", "left", [
        "blob-left-up-2",
        "blob-left-up-1"
    ])

    playerSprite.addTransition("left", "down", [
        "blob-down-left-2",
        "blob-down-left-1"
    ])

    playerSprite.addTransition("left", "right", [
        "blob-down-left-2",
        "blob-down-left-1",
        "blob-down-right-1",
        "blob-down-right-2"
    ])

    playerSprite.addTransition("up", "down", [
        "blob-right-up-2",
        "blob-right-up-1",
        "blob-down-right-2",
        "blob-down-right-1"
    ])

    playerSprite.addAnimatedVersion("hurt", [
        "blob-hurt-1",
        "blob-hurt-1",
        "blob-hurt-2",
        "blob-hurt-2",
        "blob-hurt-2",
        "blob-hurt-2",
        "blob-hurt-1",
        "blob-hurt-1",
    ])

    playerSprite.addAnimatedVersion("bubbles", [
        "blob-bubbles/1",
        "blob-bubbles/1",
        "blob-bubbles/2",
        "blob-bubbles/2",
        "blob-bubbles/3",
        "blob-bubbles/3",
        "blob-bubbles/4",
        "blob-bubbles/4",
        "blob-bubbles/5",
        "blob-bubbles/5",
        "blob-bubbles/6",
        "blob-bubbles/6",
        "blob-bubbles/7",
        "blob-bubbles/7",
        "blob-bubbles/8",
        "blob-bubbles/8",
        "blob-bubbles/9",
        "blob-bubbles/9",
        "blob-bubbles/10",
        "blob-bubbles/10",
        "blob-bubbles/11",
        "blob-bubbles/11",
        "blob-bubbles/12",
        "blob-bubbles/12",
        "blob-bubbles/13",
        "blob-bubbles/13",
        "blob-bubbles/14",
        "blob-bubbles/14"
    ])

    return playerSprite
}

export { makePlayerSprite }