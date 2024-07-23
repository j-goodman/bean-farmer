import { Entity } from './entity.js';
import { Sprite } from './sprite.js';

import { utils } from './utils.js';

class Lightburst extends Entity {
    constructor(x, y, elevation) {
        super(x, y, elevation)
        this.name = "lightburst"
        this.sprite = makeLightburstSprite()
        this.sprite.changeVersion("lightburst")
        this.elevation = "air"
        this.playOverlayAnimation(this.sprite, "lightburst")
        this.overlayHeight = 4
        this.overlayWidth = 4
        this.overlayOffset = {
            x: -170,
            y: -170
        }
        game.setTimer(() => {
            this.die()
        }, 21)
    }
}

const makeLightburstSprite = () => {
    const lightburstSprite = new Sprite ("lightburst/1")

    lightburstSprite.addAnimatedVersion("lightburst", [
        "lightburst/1",
        "lightburst/2",
        "lightburst/3",
        "lightburst/4",
        "lightburst/5",
        "lightburst/6",
        "lightburst/7",
        "lightburst/8",
        "lightburst/9",
        "lightburst/10",
        "lightburst/11",
        "lightburst/12",
        "lightburst/13",
        "lightburst/14",
        "lightburst/15",
        "lightburst/16",
        "lightburst/17",
        "lightburst/18",
        "lightburst/19",
        "lightburst/20",
    ])

    return lightburstSprite
}

game.constructors[Lightburst.name] = Lightburst
export { Lightburst }