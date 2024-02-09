import { Plant } from './plant.js';
import { Fire } from './fire.js';

import { makeDragonFlowerSprite } from './sprites/dragonFlowerSprite.js';

import { game } from './game.js';
import { utils } from './utils.js';

class DragonFlower extends Plant {
    constructor(x, y) {
        super(x, y)
        this.baseMoveDelay = 18
        this.name = "dragon flower"
        this.moveDelay = this.baseMoveDelay
        this.baseStrength = 5
        this.strength = this.baseStrength
        this.mouthOpen = false
        this.pushability = 10
        this.sprite = makeDragonFlowerSprite()
        this.attackCooldown = 0
        this.direction = "down"
        this.sprite.version = this.direction
        this.birthday -= utils.dice(300)
        game.setTimer(() => {
            this.direction = ["up", "right", "down", "left"][utils.dice(4) - 1]
            this.update4DirectionSprite()
        }, 1)
    }

    update (age) {
        this.frameUpdate()

        if (this.attackCooldown <= 0) {
            this.senseNearby()
        }

        this.attackCooldown = this.attackCooldown > 0 ?
        this.attackCooldown - 1 : this.attackCooldown

        if (!(age % 400) && !this.mouthOpen) {
            this.direction = {
                down: "left",
                left: "up",
                up: "right",
                right: "down"
            }[this.direction]
        }

        if (!this.mouthOpen) {
            this.sprite.changeVersion(this.direction)
        } else if (
            this.sprite.version !== this.direction &&
            this.sprite.version !== `mouth-open-${this.direction}`
        ) {
            this.sprite.changeVersion(this.direction)
        } else {
            this.sprite.changeVersion(`${this.mouthOpen ? "mouth-open-" : ""}${this.direction}`)
        }
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
            for (let i = 1; i <= range; i++) {
                const x = this.position.x + (coord.x * i)
                const y = this.position.y + (coord.y * i)
                const entity = game.checkGrid(x, y)
                if (entity) {
                    if (entity.animal) {
                        this.attackCooldown = 120
                        this.mouthOpen = true
                        game.setTimer(() => {
                            this.mouthOpen = false
                        }, 40)
                        this.attack(coord.x, coord.y)
                    }
                    break
                }
            }
        })
    }

    attack (x, y) {
        let fireball = {x: this.position.x, y: this.position.y, age: 0}
        let newDirection = utils.directionFromCoordinates(x, y)
        if (this.direction !== newDirection) {
            this.direction = newDirection
            game.setTimer(() => {
                this.attack(x, y)
            }, 3)
            return false
        }
        let fireballAction = () => {
            new Fire (fireball.x, fireball.y, "air")
            if (fireball.age === 0 || fireball.age === 2) {
                fireball.x += x
                fireball.y += y
            } else if (fireball.age === 1) {
                let newCoords = utils.rotateByCoordinates({x: x, y: y}, -45)
                fireball.x += newCoords.x
                fireball.y += newCoords.y
            } else if (fireball.age === 3) {
                let newCoords = utils.rotateByCoordinates({x: x, y: y}, 90)
                fireball.x += newCoords.x
                fireball.y += newCoords.y
            }
            fireball.age += 1
            if (fireball.age < 5) {
                game.setTimer(fireballAction, 3)
            }
        }
        fireballAction()
    }
}

export { DragonFlower }