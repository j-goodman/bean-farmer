import { Item } from './item.js';
import { Sprite } from './sprite.js';

import { utils } from './utils.js';
import { Chicken } from './chicken.js';

class Egg extends Item {
    constructor(x, y) {
        super(x, y)
        this.name = "egg"
        this.sprite = new Sprite ("chicken/egg")
        this.hatchAge = 1300 + utils.dice(1300)
        this.burnability = 1
    }

    fertilize () {
        this.sprite = new Sprite ("chicken/fertilized-egg")
        this.sprite.addAnimatedVersion("hatch", [
            "chicken/hatch/1",
            "chicken/hatch/2",
            "chicken/hatch/3",
            "chicken/hatch/4",
            "chicken/hatch/5",
            "chicken/hatch/6",
            "chicken/hatch/7",
            "chicken/hatch/8",
        ])
        this.name = "fertilized egg"
        this.fertilized = true
    }

    cook () {
        this.sprite = new Sprite ("chicken/cooked-egg")
        this.name = "cooked egg"
        this.food = true
        this.use = (user) => {
            if (user.health >= user.maxHealth + 1) {
                game.displayHealth = 120
                if (!user.checkFacingSquare()) {
                    user.dropItem()
                }
            } else {
                user.health += 1
                user.equipped = null
                user.removeFromInventory(this)
                if (user.name === "player") {
                    game.displayHealth = 150
                }
                this.die()
            }
        }
    }

    update (age) {
        if (age > this.hatchAge && !this.hatched) {
            if (this.fertilized) {
                this.hatched = true
                this.hatch()
            } else if (age % (30 * 60 * 3) === 0) {
                this.die()
            }
        }
        if (this.movable) {
            this.frameUpdate()
        }
    }

    burn () {
        this.cook()
        this.burnability -= 1
    }

    hatch () {
        this.pickupable = false
        this.playAnimationOnce("hatch", () => {
            this.die()
            new Chicken (this.position.x, this.position.y)
        })
    }
}

game.constructors[Egg.name] = Egg
export { Egg }