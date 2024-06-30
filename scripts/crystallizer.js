import { Entity } from './entity.js';
import { Sprite } from './sprite.js';
import { SulfurCrystal } from './sulfurCrystal.js';

class Crystallizer extends Entity {
    constructor (x, y) {
        super(x, y)
        this.sprite = makeCrystallizerSprite()
        this.sprite.version = "0"
        this.name = "crystallizer"
        this.golemer = null
        this.loadLevel = 0
        this.overstock = 0
        this.pushability = 10
        this.immobile = true
    }

    interaction (subject) {
        const item = subject.equipped
        this.checkOverstock()
        if (item && item.name === "dragonflower seed") {
            subject.removeFromInventory(item)
            subject.equipped = null
            subject.checkStackRefill(item)
            this.loadLevel += 1
            if (this.loadLevel >= 2) {
                this.loadLevel -= 2
                const success = this.checkForSpace()
                this.checkDrop(new SulfurCrystal ())
                if (!success) {
                    this.overstock += 1
                }
            }
            if (this.loadLevel > 0) {
                this.sprite.changeVersion(1)
                this.sprite.changeVersion(3)
            } else {
                this.sprite.changeVersion(0)
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
                this.checkDrop(new SulfurCrystal ())
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

const makeCrystallizerSprite = () => {
    const crystallizerSprite = new Sprite ("crystallizer/0")
    crystallizerSprite.addVersion("0", "crystallizer/0")
    crystallizerSprite.addVersion("1", "crystallizer/1")
    crystallizerSprite.addVersion("2", "crystallizer/2")
    crystallizerSprite.addVersion("3", "crystallizer/3")

    crystallizerSprite.addTransition("1", "3", [
        "crystallizer/1",
        "crystallizer/1",
        "crystallizer/1",
        "crystallizer/2",
        "crystallizer/2",
        "crystallizer/2",
    ])

    crystallizerSprite.addTransition("3", "0", [
        "crystallizer/3",
        "crystallizer/3",
        "crystallizer/3",
        "crystallizer/3",
        "crystallizer/3",
        "crystallizer/3",
        "crystallizer/4",
        "crystallizer/4",
        "crystallizer/5",
        "crystallizer/5",
    ])

    return crystallizerSprite
}

game.constructors[Crystallizer.name] = Crystallizer
export { Crystallizer }