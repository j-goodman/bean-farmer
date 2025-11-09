import { Feature } from "./feature.js";
import { Sprite } from "./sprite.js";

class ReanimationRoom extends Feature {
    constructor(x, y) {
        super(x, y)
        this.blocks = [
            {x: 0, y: 0},
            {x: 1, y: -1},
            {x: 2, y: -1},
            {x: 3, y: -1},
            {x: 4, y: 0},
            {x: 0, y: 4},
            {x: 4, y: 4},
            {x: 1, y: 5},
            {x: 3, y: 5},
        ]
        this.sprite = new Sprite ("empty")
        this.overlayExists = true
        this.underlayExists = true
        this.name = "feature"

        this.pushability = 10
        this.breakability = 7
        
        this.overlayCycle = 0
        this.overlayLoop = true
        this.overlayHeight = 7
        this.overlayWidth = 7
        this.overlayOffset = {
            x: -115,
            y: -114
        }

        this.overlay = ["reanimation-room/foreground"]
        this.groundImage = ["reanimation-room/background"]
    }
}

export { ReanimationRoom }