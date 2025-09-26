import { BoneShards } from './boneShards.js';
import { Entity } from './entity.js';
import { Sprite } from './sprite.js';
import { utils } from './utils.js';

class Tomb extends Entity {
    constructor(x, y) {
        super(x, y)
        this.sprite = new Sprite ("tomb")
        this.name = "tomb"
        this.drop = true
        this.sprite.version = "down"
        this.pushability = 10
        this.breakability = 5
        this.immobile = true
        this.brokenSprite = new Sprite ("cracked-tomb")
        this.damage = 0
        this.text = "Herein is the king."

        this.sprite.addAnimatedVersion("break", [
            "rock-break/1",
            "rock-break/2",
            "rock-break/3",
            "rock-break/4",
            "rock-break/5",
            "rock-break/6",
            "rock-break/7",
            "rock-break/8",
            "rock-break/9",
            "rock-break/10",
            "rock-break/11",
            "rock-break/12",
        ])
    }

    onBreak () {
        if (this.damage > 0) {
            // this.playAnimationOnce("break", () => {
                this.die()
            // })
            if (this.drop) {
                if (utils.distanceBetweenSquares(this.position, game.player.position) < 7.5) {
                    game.givePoints(13, this)
                }
                const bones = new BoneShards (this.position.x, this.position.y)
                bones.setVariant("human")
                this.checkDrop(bones)
            }
        } else {
            this.damage += 1
            this.sprite = this.brokenSprite
            this.connectNeighbors()
        }
    }

    interaction () {
        this.open()
    }

    open () {
        game.ctx.drawImage(game.images["stone-sign-text-background"], 0, 0, game.canvas.width, game.canvas.height)
        game.pause()
        game.controls.closeModal = () => {
            this.close()
            game.controls.closeModal = false
        }
        game.ctx.fillStyle = "#898290"
        game.ctx.font = "80px Pangolin"
        const textLines = utils.addLineBreaks(this.text)
        game.ctx.textAlign = "left"
        textLines.forEach((line, i) => {
            game.ctx.fillText(line, 360, 400 + 100 * i)
        })
    }

    close () {
        game.play()
    }
}

game.constructors[Tomb.name] = Tomb
export { Tomb }