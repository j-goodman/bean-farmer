import { Entity } from './entity.js';
import { Sprite } from './sprite.js';
import { utils } from './utils.js';

class GateBlock extends Entity {
    constructor(x, y) {
        super(x, y)
        this.name = "gate block"
        this.immobile = true
        this.sprite = new Sprite ("falling-block/1")
        this.sprite.addAnimatedVersion("fall", [
            "falling-block/1",
            "falling-block/2",
            "falling-block/3",
            "falling-block/3",
            "falling-block/4",
            "falling-block/4",
            "falling-block/5",
            "falling-block/5",
            "falling-block/6",
            "falling-block/6",
            "falling-block/7",
            "falling-block/8",
            "falling-block/8",
            "falling-block/8",
            "falling-block/8",
            "falling-block/8",
            "falling-block/8",
            "falling-block/9",
            "falling-block/10",
            "falling-block/11",
            "falling-block/12",
        ])
    }

    open () {
        this.playAnimationOnce("fall", () => {
            this.die()
            game.givePoints(400, this)
        })
    }
}

game.constructors[GateBlock.name] = GateBlock
export { GateBlock }