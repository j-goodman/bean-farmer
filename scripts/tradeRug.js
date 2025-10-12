import { Entity } from './entity.js';
import { Sprite } from './sprite.js';

class TradeRug extends Entity {
    constructor (x, y, elevation) {
        super(x, y, elevation)
        this.name = "trade rug"
        this.sprite = makeTradeRugSprite()
        this.elevation = "ground"
        this.pushability = 10
    }

    setVariant (name) {
        if (name === "wizard") {
            this.variant = "wizard"
            this.sprite  = new Sprite ("wizard-rug")
        }
    }
}

const makeTradeRugSprite = () => {
    const TradeRugSprite = new Sprite ("trade-rug")
    return TradeRugSprite
}

game.constructors[TradeRug.name] = TradeRug
export { TradeRug }