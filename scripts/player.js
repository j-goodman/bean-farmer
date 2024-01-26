import { Entity } from './entity.js';
import { Sprite } from './sprite.js';

import { game } from './game.js';

class Player extends Entity {
    constructor(imageName, x, y) {
        super(imageName, x, y)
        this.name = "player"
        this.baseMoveDelay = 6
        this.moveDelay = this.baseMoveDelay
        this.baseStrength = 3
        this.strength = this.baseStrength
        this.pushability = 3
        this.sprite = makePlayerSprite()
        this.sprite.version = "down"
        this.health = 4
        this.animal = true
        this.updateQueue = []
    }

    onHit (subject) {
        this.health -= 1
        game.displayHealth = 300
        this.playOverlayAnimation(this.sprite, "bubbles")
        for (let i = 0; i < 100; i++) {
            game.setTimer(() => {
                game.ctx.globalAlpha = (100 - i) / 100;
                if (i < 10) {
                    game.ctx.globalAlpha = i / 10;
                }
                game.ctx.drawImage(game.images["blob-red-flash"], (this.spritePosition.x + this.spriteOffset.x - game.viewport.origin.x) * game.tileSize, (this.spritePosition.y + this.spriteOffset.y - game.viewport.origin.y) * game.tileSize, game.tileSize, game.tileSize)
                game.ctx.globalAlpha = 1;
            }, i)
        }
    }

    update () {
        this.frameUpdate()
        if (this.spritePosition.x !== this.position.x && this.spritePosition.y !== this.position.y) {
            // if diagonal:
            this.moveDelay = Math.floor(this.baseMoveDelay * 1.65)
        } else {
            this.moveDelay = this.baseMoveDelay
        }

        while (this.updateQueue.length) {
            this.updateQueue.shift()()
        }

        const posX = this.position.x
        const posY = this.position.y

        if (this.spritePosition.x === this.position.x &&
            this.spritePosition.y === this.position.y) {
            if (game.controls.right) {
                this.direction = "right"
                this.updateQueue.push(() => {
                    this.move(1, 0)
                })
            } else if (game.controls.left) {
                this.direction = "left"
                this.updateQueue.push(() => {
                    this.move(-1, 0)
                })
            }
            if (game.controls.down) {
                this.direction = "down"
                this.updateQueue.push(() => {
                    this.move(0, 1)
                })
            } else if (game.controls.up) {
                this.direction = "up"
                this.updateQueue.push(() => {
                    this.move(0, -1)
                })
            }
            this.updateSprite()
        }
    }
}

const makePlayerSprite = () => {
    const playerSprite = new Sprite ("blob-down")

    playerSprite.addVersion("down", "blob-down")
    playerSprite.addVersion("left", "blob-left")
    playerSprite.addVersion("up", "blob-up")
    playerSprite.addVersion("right", "blob-right")

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

export { Player }