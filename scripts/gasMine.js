import { Entity } from './entity.js';
import { Sprite } from './sprite.js';
import { MeteorCrystal } from './meteorCrystal.js';

import { game } from './game.js';
import { utils } from './utils.js';
import { poisonAttack } from './poisonAttack.js';

class GasMine extends Entity {
    constructor(x, y) {
        super(x, y)
        this.baseMoveDelay = 10
        this.name = "gas mine"
        this.moveDelay = this.baseMoveDelay
        this.breakability = 6
        this.strength = this.baseStrength
        this.spawnPosition = {
            x: this.position.x,
            y: this.position.y
        }
        this.pushability = 4
        this.sprite = makeGasMineSprite()
        this.sightDistance = 7
        this.cooldown = 12
    }
    
    update (age) {
        this.frameUpdate()
        this.cooldown = this.cooldown <= 0 ? 0 : this.cooldown - 1
        const directions = [
            {x: 1, y: 0},
            {x: -1, y: 0},
            {x: 0, y: 1},
            {x: 0, y: -1},
        ]
        directions.forEach(direction => {
            for (let distance = 1; distance <= this.sightDistance; distance++) {
                let item = game.checkGrid(this.position.x + (direction.x * distance), this.position.y + (direction.y * distance))
                if (item) {
                    distance = this.sightDistance + 1
                }
                if (this.cooldown === 0 && item && item.animal) {
                    this.playAnimationOnce("activate")
                    game.setTimer(() => {
                        poisonAttack(this, 99 + utils.dice(2), 10)
                        this.cooldown = 120
                    }, 12)
                }
            }
        })
    }

    onBreak () {
        this.die()
    }

    onDeath () {
        this.checkDrop(new MeteorCrystal ())
    }
}

const makeGasMineSprite = () => {
    const gasMineSprite = new Sprite ("gas-mine/1")

    gasMineSprite.addAnimatedVersion("activate", [
        "gas-mine/1",
        "gas-mine/2",
        "gas-mine/3",
        "gas-mine/4",
        "gas-mine/5",
        "gas-mine/6",
        "gas-mine/7",
        "gas-mine/8",
        "gas-mine/9",
        "gas-mine/10",
        "gas-mine/11",
        "gas-mine/12",
        "gas-mine/13",
        "gas-mine/14",
        "gas-mine/15",
        "gas-mine/16",
        "gas-mine/17",
        "gas-mine/18",
        "gas-mine/19",
        "gas-mine/20",
        "gas-mine/21",
        "gas-mine/22",
        "gas-mine/23",
        "gas-mine/24",
        "gas-mine/25",
        "gas-mine/26",
        "gas-mine/27",
    ])

    return gasMineSprite
}

game.constructors[GasMine.name] = GasMine
export { GasMine }