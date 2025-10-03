import { Item } from './item.js';
import { Sprite } from './sprite.js';

class GoldMedal extends Item {
    constructor(x, y) {
        super(x, y)
        this.name = "gold medal"
        this.sprite = new Sprite ("gold-medal/8")
        this.charge = 8
    }
    
    use (user) {
        if (this.charge < 8) {
            return false
        } else {
            this.charge = 0
            this.sprite = new Sprite (`gold-medal/${this.charge}`)
        }
        const previousMoveDelay = user.baseMoveDelay
        const duration = 60
        user.baseMoveDelay = Math.floor(previousMoveDelay / 2) + 1
        
        const drawSigil = (length) => {
            for (let i = 0; i <= length; i++) {
                game.setTimer(() => {
                    game.ctx.drawImage(game.images["lightning-sigil"], (game.player.spritePosition.x + game.player.spriteOffset.x - game.viewport.origin.x) * game.tileSize, (game.player.spritePosition.y + game.player.spriteOffset.y - game.viewport.origin.y - 1.25) * game.tileSize, game.tileSize, game.tileSize)
                }, i)
            }
        }
        drawSigil(90)

        for (let i = 1; i <= 8; i++) {
            game.setTimer(() => {
                this.charge += 1
                if (this.charge >= 0 && this.charge <= 8) {
                    this.sprite = new Sprite (`gold-medal/${this.charge}`)
                }
            }, 30 * 15 * i)
        }
        
        game.setTimer(() => {
            drawSigil(15)
            game.setTimer(() => {
                drawSigil(15)
            }, 30)
            game.setTimer(() => {
                drawSigil(15)
            }, 60)
        }, 30 * (duration - 3))

        game.setTimer(() => {
            user.baseMoveDelay = previousMoveDelay
        }, 30 * duration)
    }
}

game.constructors[GoldMedal.name] = GoldMedal
export { GoldMedal }