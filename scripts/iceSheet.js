import { Entity } from './entity.js';
import { Sprite } from './sprite.js';
import { utils } from './utils.js';

class IceSheet extends Entity {
    constructor(x, y, elevation) {
        super(x, y, elevation)
        this.name = "ice sheet"
        this.imageName = "ice-sheet/X"
        this.elevation = "ground"
        this.pipeConnection = true
        this.slippery = true
        this.sprite = new Sprite (this.imageName)
        this.burnability = -1
        this.sprite.addURDLVersions("ice-sheet")
        game.setTimer(() => {
            this.connectNeighbors()
        }, 0)
    }

    update (age) {
        if (age > 10800) {
            if (utils.dice(120) === 120) {
                this.die()
            }
        }
    }

    burn (fire) {
        this.die()
    }
}

game.constructors[IceSheet.name] = IceSheet
export { IceSheet }