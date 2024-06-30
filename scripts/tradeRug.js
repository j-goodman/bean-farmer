import { Entity } from './entity.js';
import { Sprite } from './sprite.js';

class TradeRug extends Entity {
    constructor (x, y, elevation) {
        super(x, y, elevation)
        this.name = "trade rug"
        this.sprite = makeTradeRugSprite()
        this.elevation = "ground"
        this.pushability = 10
        this.breakability = 10
    }
}

const makeTradeRugSprite = () => {
    const TradeRugSprite = new Sprite ("trade-rug")
    return TradeRugSprite
}

game.constructors[TradeRug.name] = TradeRug
export { TradeRug }