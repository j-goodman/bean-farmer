import { Entity } from './entity.js';
import { Sprite } from './sprite.js';

import { utils } from './utils.js';

class IceBlast extends Entity {
    constructor(x, y, elevation) {
        super(x, y, elevation)
        this.name = "ice blast"
        this.sprite = makeIceBlastSprite()
        this.sprite.changeVersion("ice-blast")
        this.elevation = "air"
        this.freezeAir(x, y)
        game.setTimer(() => {
            this.die()
        }, 24)
    }

    update () {
        const entity = game.checkGrid(this.position.x, this.position.y)
        if (entity && (entity.animal || entity.plant)) {
            entity.freeze()
        }
    }
}

const makeIceBlastSprite = () => {
    const iceBlastSprite = new Sprite ("ice-blast/1")

    iceBlastSprite.addAnimatedVersion("ice-blast", [
        "ice-blast/1", "ice-blast/2", "ice-blast/3", "ice-blast/4", "ice-blast/5",
        "ice-blast/6", "ice-blast/7", "ice-blast/8", "ice-blast/9", "ice-blast/10", "ice-blast/11",
        "ice-blast/12", "ice-blast/13", "ice-blast/14", "ice-blast/15", "ice-blast/16", "ice-blast/17",
        "ice-blast/18", "ice-blast/19", "ice-blast/20", "ice-blast/21", "ice-blast/22",
    ])

    return iceBlastSprite
}

game.constructors[IceBlast.name] = IceBlast
export { IceBlast }