import { Entity } from './entity.js';
import { Sprite } from './sprite.js';

class SawbladeTrack extends Entity {
    constructor(x, y) {
        super(x, y)
        this.sprite = makeSawbladeTrackSprite()
        this.name = "sawblade track"
        this.elevation = "ground"
        this.immobile = true
        this.unbreakable = true
        game.setTimer(() => {
            game.checkGrid(x, y, true).groundOccupant = this
            this.checkPosition()
        }, 30)
    }

    checkPosition () {
        let left = game.checkGrid(this.position.x - 1, this.position.y, true).groundOccupant
        let right = game.checkGrid(this.position.x + 1, this.position.y, true).groundOccupant
        if (!left || left.name !== "sawblade track") {
            this.sprite.changeVersion("left-end")
            game.setTimer(() => {
                this.moveFromGround()
                this.overlayExists = false
            }, 60)
        }
        if (!right || right.name !== "sawblade track") {
            this.sprite.changeVersion("right-end")
            game.setTimer(() => {
                this.moveFromGround()
                this.overlayExists = false
            }, 60)
        }
    }
}

const makeSawbladeTrackSprite = () => {
    const sawbladeTrackSprite = new Sprite ("sawblade/track-middle-back")
    sawbladeTrackSprite.addVersion("left-end", "sawblade/track-left")
    sawbladeTrackSprite.addVersion("right-end", "sawblade/track-right")
    sawbladeTrackSprite.addVersion("front", "sawblade/track-middle-front")
    return sawbladeTrackSprite
}

game.constructors[SawbladeTrack.name] = SawbladeTrack
export { SawbladeTrack }