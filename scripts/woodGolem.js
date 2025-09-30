import { Entity } from './entity.js';
import { Hatchet } from './hatchet.js';
import { Shield } from './shield.js';
import { Sprite } from './sprite.js';

import { utils } from './utils.js'
import { Wood } from './wood.js';

class WoodGolem extends Entity {
    constructor(x, y) {
        super(x, y)
        this.sprite = makeWoodGolemSprite()
        this.stumpedSprite = makeWoodGolemSprite("stumped")
        this.name = "wood golem"
        this.baseMoveDelay = 11
        this.moveDelay = this.baseMoveDelay
        this.burnability = 8
        this.spawnPosition = {x: x, y: y}
        this.clockDirections = true
        this.strength = 3
        this.birthday -= utils.dice(45)
        this.hitCooldown = 0
        this.shieldHeat = 0
        this.unfreezable = true

        this.stumped = false

        this.facing = "6"
        this.plant = true
        this.items = {
            shield: new Shield (x, y),
            axe: new Hatchet (x, y),
        }
        this.items.axe.sprite = new Sprite ("gold-axe")
        this.equipped = this.items.shield

        this.pushability = 2.5
    }

    jump () {
        let jumpNums = [
            0, -3, -5, -6, -7, -6, -5, -3, 0,
            0, -3, -5, -6, -6, -5, -3, 0
        ]
        for (let i = 0; i < jumpNums.length; i++) {
            game.setTimer(() => {
                this.spriteOffset.y = jumpNums[i] / 20
            }, i)
        }
    }

    checkForTargets () {
        const targetList = ["player", "dragon flower", "snowsnail", "grass", "golemer", "cactus", "mushroom"]
        const range = 14

        for (let x = 0 - Math.floor(range / 2); x <= Math.floor(range / 2); x++) {
            for (let y = 0 - Math.ceil(range / 2); y <= Math.floor(range / 2); y++) {
                if (utils.distanceBetweenSquares(this.position, {
                    x: this.position.x + x, y: this.position.y + y
                }) <= 7) {
                    const entity = game.checkGrid(this.position.x + x, this.position.y + y)
                    if (entity && targetList.includes(entity.name)) {
                        if (!this.target || (
                            utils.distanceBetweenSquares(entity.position, this.position) < 
                            utils.distanceBetweenSquares(this.target, this.position)
                        ))
                        this.target = entity
                    }
                }
            }
        }
    }

    update (age) {
        this.frameUpdate()
        
        if (this.hitCooldown > 0) {
            this.hitCooldown -= 1
        }
        if (this.shieldHeat > 0) {
            this.shieldHeat -= 1
        }

        if (this.target && !this.target.exists) {
            this.target = null
        }

        if (this.target && !this.charging && age % 9 === 0) {
            this.strafeTarget(this.target)
            if (this.target && this.hitCooldown > 0 && utils.dice(21) === 21) {
                this.equip(this.items.axe)
                game.setTimer(() => {
                    this.equip(this.items.shield)
                }, 18 + utils.dice(12))
            }
        }

        if (this.target && age % (30 * 10) === 0) {
            if (utils.distanceBetweenSquares(this.position, this.target.position) > 25) {
                this.target = null
            }
        }

        if (!this.target && age % 120 === 0) {
            this.checkForTargets()
        }

        if (this.target && !this.charging && age % 5 === 0) {
            if (this.target) {
                if (utils.dice(5) === 5) {
                    this.faceTarget(this.target)
                }
            }
            utils.checkAdjacents(this, (entity) => {
                if (entity === this.target) {
                    if (utils.dice(4) === 4 && this.hitCooldown <= 0) {
                        this.strike()
                    } else {
                        this.move(
                            entity.position.x - this.position.x,
                            entity.position.y - this.position.y
                        )
                    }
                }
                if (entity.name === "wood golem") {
                    this.move(
                        // x and y switched for a side-stepping motion
                        this.position.y - entity.position.y,
                        this.position.x - entity.position.x
                    )
                }
            })
        }

        if (this.target && !this.charging && age % (30 * 30) === 0) {
            if (utils.dice(6) === 6) {
                this.walkTo(this.target.position)
            }
        }

        if (age % (30 * 60) === 0) {
            this.moveDelay = this.baseMoveDelay
            this.charging = false
        }

        if (age % (30 * 60 * 3) === 0) {
            this.moveDelay = this.baseMoveDelay
            this.charging = false
            this.target = null
        }

        if (this.equipped && this.equipped.holdUpdate) {
            this.equipped.holdUpdate(this)
        }
    }

    strafeTarget (target) {
        if (!target) {
            return false
        }
        
        let moveDirection = {x: 0, y: 0}
        if (game.time % 2 === 0) {
            if (this.position.x > target.position.x) {
                moveDirection.x = -1
            } else if (this.position.x < target.position.x) {
                moveDirection.x = 1
            }
        } else {
            if (this.position.y > target.position.y) {
                moveDirection.y = -1
            } else if (this.position.y < target.position.y) {
                moveDirection.y = 1
            }
        }
        
        const distance = utils.distanceBetweenSquares(this.position, target.position)
        if (distance > 3) {
            if (utils.dice(3) === 3 && this.hitCooldown <= 0) {
                this.charge(this.target)
            } else {
                this.move(moveDirection.x, moveDirection.y)
            }
        } else {
            if (utils.dice(3) !== 3) {
                this.move(-moveDirection.x, -moveDirection.y)
            }
        }
    }

    bombCheck (bomb) {
        if (this.equipped.deflect) {
            bomb.direction.x *= -1
            bomb.direction.y *= -1
            this.equipped.deflect()
        } else {
            bomb.explode()
        }
    }

    charge (target) {
        this.charging = true
        this.moveDelay = 5
        
        game.setTimer(() => {
            this.charging = false
            this.moveDelay = this.baseMoveDelay
        }, 80)

        const diff = {
            x: target.position.x - this.position.x,
            y: target.position.y - this.position.y
        }

        let coords = {x: 0, y: 0}
        if (diff.x > 0) {
            coords.x = 1
        } else if (diff.x < 0) {
            coords.x = -1
        }

        if (diff.y > 0) {
            coords.y = 1
        } else if (diff.y < 0) {
            coords.y = -1
        }

        if (!(coords.x === 0 || coords.y === 0)) {
            return false
        }

        this.equip(this.items.axe)
        this.move(coords.x, coords.y, () => {
            this.move(coords.x, coords.y, () => {
                this.move(coords.x, coords.y, () => {
                    this.move(coords.x, coords.y, () => {
                        this.move(coords.x, coords.y, () => {
                            if (this.exists && this.equipped.use) {
                                if (utils.distanceBetweenSquares(this.position, target.position) < 3) {
                                    this.equipped.use(this)
                                }
                                this.move(-coords.x, -coords.y)
                            }
                            this.equip(this.items.shield)
                            this.moveDelay = this.baseMoveDelay
                            this.charging = false
                        })
                    })
                })
            })
        })

    }

    equip (item) {
        this.equipped = item
        item.spriteOffset = {x: 0, y: 0}
    }

    face (number) {
        this.facing = number
        this.sprite.changeVersion(this.facing)
        if (this.equipped.clockDirections) {
            this.equipped.facing = this.facing
            this.equipped.sprite.changeVersion(this.equipped.facing)
        }
        if (this.facing === 3) {
            this.direction = "right"
        } else if (this.facing === 6) {
            this.direction = "down"
        } else if (this.facing === 9) {
            this.direction = "left"
        } else if (this.facing === 12) {
            this.direction = "up"
        }
    }

    faceTarget (target) {
        if (!target || !this) {
            return false
        }

        const diff = {
            x: target.position.x - this.position.x,
            y: target.position.y - this.position.y
        }

        if (diff.y < 0) {
            this.face(12)
        } else if (diff.y > 0) {
            this.face(6)
        } else if (diff.x < 0) {
            this.face(9)
        } else if (diff.x > 0) {
            this.face(3)
        }
    }

    burn () {
        this.jump()
        if (utils.dice(3) === 3) {
            game.checkGrid(this.position.x, this.position.y, true).airOccupant = null
        }
        this.cleanSoil(utils.dice(7), "soilHealth", 1)
        this.burnability -= 1
        if (this.burnability <= 0) {
            this.die()
        }
    }

    reverseDirection () {
        this.direction = {
            "up": "down",
            "right": "left",
            "down": "up",
            "left": "right"
        }[this.direction]
        if (!this.direction) {
            this.direction = "down"
        }
        if (this.facing && this.facing !== 0) {
            this.facing = 6
        }
        this.facing += 6
        if (this.facing > 12) {
            this.facing -= 12
        }
        this.face(this.facing)
        this.charging = true
        game.setTimer(() => {
            this.charging = false
        }, 6)
        this.sprite.changeVersion(this.facing)
    }

    onCut (subject) {
        this.onHit(subject)
    }

    onHit (subject) {
        if (this.hitCooldown > 0) {
            return false
        }
        this.hitCooldown = 15
        if (subject && this.equipped && this.equipped.takeHit) {
            const diff = {
                x: subject.position.x - this.position.x,
                y: subject.position.y - this.position.y
            }
            let attackDirection = utils.directionFromCoordinates(diff.x, diff.y)
            if (subject && subject.name === "boomerang" && attackDirection !== this.direction && this.equipped.name === "shield") {
                this.reverseDirection()
                game.setTimer(() => {
                    this.faceTarget(subject)
                }, 6)
                attackDirection = utils.directionFromCoordinates(diff.x, diff.y)
            }
            if (attackDirection === this.direction || (subject && subject.name === "boomerang" && this.equipped.name === "shield")) {
                this.moveDelay = 4
                this.move(-diff.x, -diff.y, () => {
                    this.moveDelay = this.baseMoveDelay
                })
                this.shieldHeat += 90
                this.equipped.takeHit()
                if (this.shieldHeat > 250) {
                    this.move(diff.y, diff.x)
                }
            } else {
                this.takeDamage(subject)
            }
        } else {
            this.takeDamage(subject)
        }
    }

    strike () {
        const coords = utils.directionToCoordinates(this.direction)
        this.equip(this.items.axe)
        game.setTimer(() => {
            this.items.axe.windupSwing()
        }, 3)
        game.setTimer(() => {
            if (this.exists && this.equipped.use) {
                this.equipped.use(this)
                this.move(-coords.x, -coords.y)
            }
        }, 7)
        game.setTimer(() => {
            this.equip(this.items.shield)
        }, 13 + utils.dice(10))
    }

    takeDamage (subject) {
        if (this.stumped) {
            if (subject && subject.name == "player") {
                game.givePoints(55, this)
            }
            this.die()
        } else {
            this.stumped = true
            if (subject && subject.name == "player") {
                game.givePoints(5, this)
            }
            this.sprite = this.stumpedSprite
            this.checkDrop(new Wood (this.position.x, this.position.y))
            this.checkDrop(new Wood (this.position.x, this.position.y))
        }
    }

    onDeath () {
        this.checkDrop(new Shield (this.position.x, this.position.y))
        this.checkDrop(new Wood (this.position.x, this.position.y))
    }
}

const makeWoodGolemSprite = (subfolder=false) => {
    let woodGolemSprite = null
    if (subfolder) {
        woodGolemSprite = new Sprite (`wood-golem/${subfolder}/6`)
        woodGolemSprite.addClockVersions(`wood-golem/${subfolder}`)
    } else {
        woodGolemSprite = new Sprite (`wood-golem/6`)
        woodGolemSprite.addClockVersions(`wood-golem`)
    }
    return woodGolemSprite
}

game.constructors[WoodGolem.name] = WoodGolem
export { WoodGolem }