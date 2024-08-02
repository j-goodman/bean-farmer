import { Plant } from './plant.js';
import { Sprite } from './sprite.js';
import { MushroomItem } from './mushroomItem.js';

import { game } from './game.js';
import { utils } from './utils.js';

class Mushroom extends Plant {
    constructor(x, y) {
        super(x, y)
        this.name = "bubble mushroom"
        this.sprite = makeMushroomSprite()
        this.pushability = 10
        this.breakability = 10
        this.burnability = 7
        this.pluckable = true
        
        this.createSelf()
        this.cleanSoil(utils.dice(11), "soilHealth", 1)
        this.cleanSoil(utils.dice(6), "soilToxicity", 1)
        this.cleanSoil(utils.dice(13), "soilToxicity", 1)
    }

    onCut (subject) {
        this.bePlucked()
    }

    update () {
        this.frameUpdate()
        if (game.time % (30 * 60 * 4) === 0) {
            this.reproduce()
        }
    }

    reproduce () {
        const coords = utils.shuffle([
            {x: -2, y: 0},
            {x: -1, y: 2},
            {x: 1, y: -2},
            {x: 2, y: 0},
        ])
        let done = false
        coords.forEach(coord => {
            if (!done && !game.checkGrid(this.position.x + coord.x, this.position.y + coord.y)) {
                done = true
                game.setTimer(() => {
                    if (utils.dice(12) === 12) {
                        coord.y -= 1
                    }
                    if (utils.dice(3) === 3) {
                        new Mushroom (this.position.x + coord.x, this.position.y + coord.y)
                    }
                }, utils.dice(30))
            }
        })
    }

    bePlucked (subject) {
        this.die()
        this.checkDrop(new MushroomItem (this.position.x, this.position.y))
    }
}

const makeMushroomSprite = () => {
    const mushroomSprite = new Sprite ("mushroom")
    return mushroomSprite
}

game.constructors[Mushroom.name] = Mushroom
export { Mushroom }