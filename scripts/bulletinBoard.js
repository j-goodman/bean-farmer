import { Entity } from './entity.js';
import { Sprite } from './sprite.js';

class BulletinBoard extends Entity {
    constructor(x, y) {
        super(x, y)
        this.sprite = makeStoneWallSprite()
        this.name = "stone wall"
        this.pipeConnection = true
        this.breakability = 7
        this.immobile = true
        this.overlay = ["wall-display"]
        this.overlayCycle = 0
        this.overlayLoop = true
        this.overlayExists = true
        this.overlayOffset = {
            x: 0,
            y: 0
        }
    }

    interaction () {
        this.open()
    }

    open () {
        if (!game.player.exists) {
            return null
        }
        game.pause()
        game.ctx.drawImage(game.images["bulletin-board"], 0, 0, game.canvas.width, game.canvas.height)
        setTimeout(() => {
            game.display = this
        }, 15)
    }

    close () {
        game.display = null
        game.play()
    }
}

const makeStoneWallSprite = () => {
    const wallSprite = new Sprite ("stone-wall/X")
    wallSprite.addURDLVersions("stone-wall")
    return wallSprite
}

game.constructors[BulletinBoard.name] = BulletinBoard
export { BulletinBoard }