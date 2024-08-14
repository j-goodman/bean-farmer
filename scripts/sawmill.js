import { Entity } from './entity.js';
import { FencePost } from './fencePost.js';
import { Sprite } from './sprite.js';

class Sawmill extends Entity {
    constructor (x, y) {
        super(x, y)
        this.sprite = makeSawmillSprite()
        this.sprite.version = "0"
        this.name = "sawmill"
        this.golemer = null
        this.loadLevel = 0
        this.overstock = 0
        this.pushability = 10
        this.immobile = true
    }

    interaction (subject) {
        const item = subject.equipped
        this.checkOverstock()
        if (item && item.name === "wood") {
            subject.removeFromInventory(item)
            subject.equipped = null
            subject.checkStackRefill(item)
            this.loadLevel += 1
            if (this.loadLevel >= 1) {
                this.loadLevel -= 1
                const success = this.checkForSpace()
                this.checkDrop(new FencePost (this.position.x, this.position.y))
                this.playAnimationOnce("spin")
                if (!success) {
                    this.overstock += 1
                }
            }
        } else {
            this.bounce()
        }
    }

    checkForSpace () {
        const coords = [
            {x: 0, y: -1},
            {x: 1, y: 0},
            {x: 0, y: 1},
            {x: -1, y: 0}
        ]
        let spaceExists = false
        for (const coord of coords) {
            if (!game.checkGrid(this.position.x + coord.x, this.position.y + coord.y)) {
                spaceExists = true
            }
        }
        return spaceExists
    }

    checkOverstock () {
        if (this.overstock > 0) {
            if (this.checkForSpace()) {
                const fencepost = new FencePost (this.position.x, this.position.y)
                this.checkDrop(fencepost)
                this.overstock -= 1
                if (this.overstock < 0) {
                    this.overstock = 0
                }
            }
            game.setTimer(() => {
                this.checkOverstock()
            }, 150)
        }
    }

    bounce () {
        let bounceNums = [
            0, .3, .6, 0, -.6, 0, .6, .3, -.3, -.3, 0,
        ]
        for (let i = 0; i < bounceNums.length; i++) {
            game.setTimer(() => {
                this.spriteOffset.y = bounceNums[i] / 20
            }, i)
        }
    }
}

const makeSawmillSprite = () => {
    const sawmillSprite = new Sprite ("sawmill/1")

    sawmillSprite.addAnimatedVersion("spin", [
        "sawmill/1",
        "sawmill/2",
        "sawmill/3",
        "sawmill/4",
        "sawmill/4",
        "sawmill/5",
        "sawmill/5",
        "sawmill/6",
        "sawmill/6",
        "sawmill/7",
        "sawmill/8",
        "sawmill/9",
        "sawmill/10",
        "sawmill/11",
        "sawmill/12",
        "sawmill/13",
        "sawmill/14",
        "sawmill/15",
        "sawmill/16",
    ])

    return sawmillSprite
}

game.constructors[Sawmill.name] = Sawmill
export { Sawmill }