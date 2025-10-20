import { Plant } from './plant.js';
import { Fire } from './fire.js';
import { DragonFlowerSeed } from './dragonFlowerSeed.js';

import { makeDragonFlowerSprite } from './sprites/dragonFlowerSprite.js';

import { game } from './game.js';
import { utils } from './utils.js';
import { EmperorFlower } from './emperorFlower.js';

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
        this.moveOffset = utils.dice(13)
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

        if (!(age % (75 + this.moveOffset)) && !this.mouthOpen) {
            this.direction = {
                down: "left",
                left: "up",
                up: "right",
                right: "down"
            }[this.direction]
        }

        if (age % (30 * 7) === 0 && !utils.isInViewport(this.position)) {
            let count = 0
            utils.adjacentCoords.forEach(coords => {
                const item = game.checkGrid(this.position.x + coords.x, this.position.y + coords.y)
                if (item && item.name && item.name.includes("dragon")) {
                    count += 1
                }
            })
            if (count >= 4) {
                this.barren = true
                this.die()
                new EmperorFlower (this.position.x, this.position.y)
            }
        }

        if (age % (30 * 25) === 0) {
            if (
                utils.dice(4) === 4 &&
                game.time > (60 * 30 * 8) &&
                game.checkGrid(this.position.x, this.position.y, true).soilToxicity > .5
            ) {
                this.onHit()
            }
        }

        if (age % (30 * 6) === 0) {
            if (utils.dice(11 === 11)) {
                if (this.neighborCount() > 23) {
                    this.barren = true
                    this.die()
                }
            }
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

    neighborCount () {
        let count = 0
        for (let x = -3; x <= 3; x++) {
            for (let y = -3; y <= 3; y++) {
                const item = game.checkGrid(
                    this.position.x + x,
                    this.position.y + y
                )
                if (
                    item &&
                    (
                        item.name === "dragon flower" ||
                        item.name === "dragonflower sprout"
                    )
                ) {
                    count += 1
                }
            }
        }
        return count
    }

    onCut (cutter) {
        this.attack()
        if (cutter) {
            cutter.dragonFlowerKillCount =
            cutter.dragonFlowerKillCount ?
            cutter.dragonFlowerKillCount + 1 : 1
            if (cutter.name === "player") {
                game.givePoints(10, this)
            }
        }
        this.die()
    }

    onHit (hitter) {
        if (hitter) {
            hitter.dragonFlowerKillCount =
            hitter.dragonFlowerKillCount ?
            hitter.dragonFlowerKillCount + 1 : 1
        }
        this.attack()
        this.die()
    }

    senseNearby () {
        const range = 3
        const coords = utils.adjacentCoords
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
                    if (!entity.pickupable) {
                        break
                    }
                }
            }
        })
    }

    onDeath () {
        if (this.barren) {
            return false
        }
        this.checkDrop(new DragonFlowerSeed (this.position.x, this.position.y))
        let coords = [
            {x: 1, y: 0},
            {x: -1, y: 0},
            {x: 0, y: 1},
            {x: 0, y: -1},
        ]
        coords.forEach(offset => {
            if (!game.checkGrid(this.position.x + offset.x, this.position.y + offset.y)) {
                game.addToGrid(new DragonFlowerSeed (this.position.x + offset.x, this.position.y + offset.y))
            }
        })
    }

    attack (x, y) {
        if (this.exists) {
            utils.drawSmoke(this.position, 13)
        }
        let newDirection = utils.directionFromCoordinates(x, y)
        if (this.direction !== newDirection) {
            this.direction = newDirection
            game.setTimer(() => {
                this.attack(x, y)
            }, 5)
            return false
        }
        game.setTimer(() => {
            let fireball = {x: this.position.x, y: this.position.y, age: 0}
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
        }, 5)
    }
}

game.constructors[DragonFlower.name] = DragonFlower
export { DragonFlower }