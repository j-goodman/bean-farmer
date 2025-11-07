import { Item } from './item.js';
import { Sprite } from './sprite.js';

import { utils } from './utils.js';


class OceanDryer extends Item {
    constructor(x, y) {
        super(x, y)
        this.sprite = new Sprite ("oceandryer")
        this.name = "oceandryer"
        this.radius = 4
    }

    holdAction (user) {
        game.displayPoints = 30
        for (let x = -this.radius; x <= this.radius; x++) {            
            for (let y = -this.radius; y <= this.radius; y++) {
                const distance = utils.distanceBetweenSquares({x: 0, y: 0}, {x: x, y: y})
                if (distance <= this.radius) {
                    const item = game.checkGrid(user.position.x + x, user.position.y + y)
                    if (item && item.name === "ocean" && game.points > 0) {
                        utils.drawSmoke(user.position, utils.dice(8))
                        utils.drawSmoke({x: user.position.x + x, y: user.position.y + y}, utils.dice(8))
                        if (
                            utils.dice(200) === 200 ||
                            (distance < 3 && utils.dice(20) === 20)
                        ) {
                            utils.drawSmoke({x: user.position.x + x, y: user.position.y + y}, utils.dice(150))
                            game.points -= utils.dice(2)
                            item.die()
                        }
                    }
                }
            }
        }
    }
}

game.constructors[OceanDryer.name] = OceanDryer
export { OceanDryer }