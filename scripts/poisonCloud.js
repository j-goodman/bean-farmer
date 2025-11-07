import { Entity } from './entity.js';
import { Sprite } from './sprite.js';

import { utils } from './utils.js';

class PoisonCloud extends Entity {
    constructor(x, y, elevation) {
        super(x, y, elevation)
        this.name = "poison cloud"
        this.source = null
        this.sprite = makePoisonCloudSprite()
        this.kills = ["grass", "tree", "chicken", "wild onion sprout", "cactus"]
        this.playAnimationOnce("cloud", () => {
            this.die()
        })
    }

    update (age) {
        this.frameUpdate()
        let entity = game.checkGrid(this.position.x, this.position.y)
        if (!entity) {
            entity = game.checkGrid(this.position.x, this.position.y, true).groundOccupant
        }
        if (entity && entity.onHit && (entity.animal || entity.plant) && !entity.poisonImmune && age % 19 === 0) {
            if (this.kills.includes(entity.name)) {
                entity.die()
            }
            entity.onHit()
            this.die()
        }
    }
}

const makePoisonCloudSprite = () => {
    const poisonCloudSprite = new Sprite ("poison-cloud/1")

    poisonCloudSprite.addAnimatedVersion("cloud", [
        "poison-cloud/1", "poison-cloud/2", "poison-cloud/3", "poison-cloud/4", "poison-cloud/5",
        "poison-cloud/6", "poison-cloud/7", "poison-cloud/8", "poison-cloud/9", "poison-cloud/10", "poison-cloud/11",
        "poison-cloud/12", "poison-cloud/13", "poison-cloud/14", "poison-cloud/15", "poison-cloud/16", "poison-cloud/17",
        "poison-cloud/18", "poison-cloud/19", "poison-cloud/20", "poison-cloud/21", "poison-cloud/22", "poison-cloud/23",
        "poison-cloud/24", "poison-cloud/25", "poison-cloud/26", "poison-cloud/27", "poison-cloud/28", "poison-cloud/29",
        "poison-cloud/30", "poison-cloud/31", "poison-cloud/32"
    ])

    return poisonCloudSprite
}

game.constructors[PoisonCloud.name] = PoisonCloud
export { PoisonCloud }