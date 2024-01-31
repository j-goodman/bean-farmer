import { Plant } from './plant.js';
import { Fire } from './fire.js';

import { makeDragonFlowerSprite } from './sprites/dragonFlowerSprite.js';

import { game } from './game.js';
import { utils } from './utils.js';

class DragonFlower extends Plant {
    constructor(x, y) {
        super(x, y)
        this.imageName = "dragon-flower/down"
        this.baseMoveDelay = 18
        this.name = "dragon flower"
        this.moveDelay = this.baseMoveDelay
        this.baseStrength = 5
        this.strength = this.baseStrength
        this.pushability = 10
        this.sprite = makeDragonFlowerSprite()
        this.attackCooldown = 0
        this.sprite.version = "down"
        this.direction = "down"
        this.update4DirectionSprite()
    }

    update (age) {
        this.frameUpdate()

        if (this.attackCooldown <= 0) {
            this.senseNearby()
        }

        this.attackCooldown = this.attackCooldown > 0 ?
        this.attackCooldown - 1 : this.attackCooldown

        if (!(age % 60)) { // about 1200
            this.direction = {
                down: "left",
                left: "up",
                up: "right",
                right: "down"
            }[this.direction]
        }
        this.update4DirectionSprite()
    }

    senseNearby () {
        const range = 3
        const coords = [
            {x: 0, y: 1},
            {x: 0, y: -1},
            {x: 1, y: 0},
            {x: -1, y: 0},
        ]
        coords.forEach(coord => {
            for (let i = 0; i <= range; i++) {
                const x = this.position.x + (coord.x * i)
                const y = this.position.y + (coord.y * i)
                const entity = game.checkGrid(x, y)
                if (entity) {
                    i = range
                    if (entity.animal) {
                        this.attackCooldown = 90
                        this.attack(coord.x, coord.y)
                    }
                }
            }
        })
    }

    attack (x, y) {
        let fireball = {x: this.position.x, y: this.position.y, age: 0}
        let fireballAction = () => {
            if (fireball.age === 0 || fireball.age === 2) {
                fireball.x += x
                fireball.y += y
            } else if (fireball.age === 1) {
                let newCoords = utils.rotateByCoordinates({x: x, y: y}, 45)
                fireball.x += newCoords.x
                fireball.y += newCoords.y
            } else if (fireball.age === 3) {
                let newCoords = utils.rotateByCoordinates({x: x, y: y}, -90)
                fireball.x += newCoords.x
                fireball.y += newCoords.y
            }
            fireball.age += 1
            new Fire (fireball.x, fireball.y, "air")
            if (fireball.age < 4) {
                game.setTimer(fireballAction, 3)
            }
        }
        fireballAction()
    }
}

export { DragonFlower }