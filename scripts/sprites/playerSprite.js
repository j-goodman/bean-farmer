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

    playerSprite.addAnimatedVersion("spawn", [
        "blob-spawn/1",
        "blob-spawn/2",
        "blob-spawn/3",
        "blob-spawn/4",
        "blob-spawn/5",
        "blob-spawn/6",
        "blob-spawn/7",
        "blob-spawn/8",
        "blob-spawn/9",
        "blob-spawn/10",
        "blob-spawn/11",
        "blob-spawn/5",
        "blob-spawn/6",
        "blob-spawn/7",
        "blob-spawn/8",
        "blob-spawn/9",
        "blob-spawn/10",
        "blob-spawn/11",
        "blob-spawn/12",
        "blob-spawn/13",
        "blob-spawn/14",
        "blob-spawn/15",
        "blob-spawn/16",
        "blob-spawn/17",
        "blob-spawn/18",
        "blob-spawn/19",
        "blob-spawn/20",
        "blob-spawn/21",
        "blob-spawn/22",
        "blob-spawn/23",
        "blob-spawn/24",
        "blob-spawn/25",
        "blob-spawn/26",
        "blob-spawn/27",
        "blob-spawn/28",
        "blob-spawn/29"
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

    playerSprite.addAnimatedVersion("sparks", [
        "point-cards/spark/0",
        "point-cards/spark/1",
        "point-cards/spark/2",
        "point-cards/spark/3",
        "point-cards/spark/4",
        "point-cards/spark/5",
        "point-cards/spark/6",
        "point-cards/spark/7",
        "point-cards/spark/8",
        "point-cards/spark/9"
    ])

    playerSprite.addAnimatedVersion("killed", [
        "blob-killed/1",
        "blob-killed/2",
        "blob-killed/3",
        "blob-killed/4",
        "blob-killed/5",
        "blob-killed/6",
        "blob-killed/7",
        "blob-killed/8",
        "blob-killed/9",
        "blob-killed/10",
    ])

    return playerSprite
}

export { makePlayerSprite }