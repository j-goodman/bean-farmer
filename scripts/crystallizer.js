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
        this.pushability = 10
        this.immobile = true
    }

    interaction (subject) {
        if (subject.equipped && subject.equipped.name === "dragonflower seed") {
            subject.removeFromInventory(subject.equipped)
            subject.equipped = null
            this.loadLevel += 1
            if (this.loadLevel > 3) {
                this.loadLevel = 0
                this.checkDrop(new SulfurCrystal ())
            }
            this.sprite.changeVersion(this.loadLevel)
        } else {
            this.bounce()
        }
    }

    bounce () {
        let bounceNums = [
            0, 1, 3, 3, 0, -2, 0, 3, 1, -1, -1, 0
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

    crystallizerSprite.addTransition("3", "0", [
        "crystallizer/4",
        "crystallizer/4",
        "crystallizer/4",
        "crystallizer/5",
        "crystallizer/4",
        "crystallizer/5",
        "crystallizer/5",
    ])

    return crystallizerSprite
}

export { Crystallizer }