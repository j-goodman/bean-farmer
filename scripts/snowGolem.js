import { Entity } from './entity.js';
import { IceBlade } from './iceBlade.js';
import { Sprite } from './sprite.js';

import { utils } from './utils.js'
import { Wood } from './wood.js';

class SnowGolem extends Entity {
    constructor(x, y) {
        super(x, y)
        this.sprite = makeSnowGolemSprite()
        this.name = "snow golem"
        this.baseMoveDelay = 10
        this.moveDelay = this.baseMoveDelay
        this.burnability = 2
        this.spawnPosition = {x: x, y: y}
        this.clockDirections = true
        this.strength = 2
        this.birthday -= utils.dice(45)
        this.hitCooldown = 0

        this.facing = "6"
        this.items = {
            sword: new IceBlade (x, y),
        }
        this.equipped = this.items.sword
        
        this.playAnimationOnce("spawn")

        this.pushability = 2
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

    update (age) {
        this.frameUpdate()
        if (this.hitCooldown > 0) {
            this.hitCooldown -= 1
        }

        if (!this.charging && age % 9 === 0) {
            this.strafeTarget(this.target)
        }

        if (age > (30 * 60 * 3)) { // max 3 minute life span
            if (utils.dice(30) === 30) {
                this.exists = false
                this.playAnimationOnce("burst", () => {
                    this.die()
                })
            }
        }

        if (!this.charging && age % 11 === 0) {
            if (this.target) {
                if (utils.dice(3) !== 3) {
                    this.faceTarget(this.target)
                }
            }
            utils.checkAdjacents(this, (entity) => {
                if (entity === this.target) {
                    this.charge(this.target)
                }
                if (entity.name === "snow golem") {
                    this.move(
                        // x and y switched for a side-stepping motion
                        this.position.y - entity.position.y,
                        this.position.x - entity.position.x
                    )
                }
            })
        }

        if (age % (30 * 60) === 0) {
            this.moveDelay = this.baseMoveDelay
            this.charging = false
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
        if (distance > 2) {
            if (utils.dice(5) === 5 && this.hitCooldown <= 0) {
                this.charge(this.target)
            } else {
                this.move(moveDirection.x, moveDirection.y)
            }
        } else {
            this.move(-moveDirection.x, -moveDirection.y)
        }
    }

    charge (target) {
        if (!target) {
            return false
        }

        this.charging = true
        this.moveDelay = 6
        
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

        this.move(coords.x, coords.y, () => {
            this.move(coords.x, coords.y, () => {
                this.move(coords.x, coords.y, () => {
                    this.move(coords.x, coords.y, () => {
                        this.strike()
                        this.move(coords.x, coords.y, () => {
                            game.setTimer(() => {
                                this.move(-coords.x, -coords.y)
                            }, this.moveDelay)
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
        if (!target) {
            return false
        }
        const diff = {
            x: this.target.position.x - this.position.x,
            y: this.target.position.y - this.position.y
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
        this.burnability -= 1
        if (this.exists && this.burnability <= 0) {
            this.exists = false
            this.playAnimationOnce("burst", () => {
                this.die()
            })
        }
    }

    onCut (subject) {
        this.onHit(subject)
    }

    onHit (subject) {
        this.hitCooldown = 45
        if (subject && this.equipped && this.equipped.takeHit) {
            const diff = {
                x: subject.position.x - this.position.x,
                y: subject.position.y - this.position.y
            }
            const attackDirection = utils.directionFromCoordinates(diff.x, diff.y)
            if (attackDirection === this.direction) {
                this.moveDelay = 4
                this.move(-diff.x, -diff.y, () => {
                    this.moveDelay = this.baseMoveDelay
                })
                this.equipped.takeHit()
            } else {
                this.takeDamage()
            }
        } else {
            this.takeDamage()
        }
    }

    strike () {
        const coords = utils.directionToCoordinates(this.direction)
        if (this.equipped && this.equipped.windupSwing) {
            this.equipped.windupSwing()
        }
        game.setTimer(() => {
            if (this.exists && this.equipped.use) {
                this.equipped.use(this)
                this.move(-coords.x, -coords.y)
            }
        }, 5)
    }

    takeDamage () {
        this.exists = false
        this.playAnimationOnce("burst", () => {
            this.die()
        })
    }

    onDeath () {
        if (utils.dice(7) === 7) {
            this.checkDrop(new IceBlade (this.position.x, this.position.y))
        }
    }
}

const makeSnowGolemSprite = () => {
    let snowGolemSprite = null

    snowGolemSprite = new Sprite (`snow-golem/6`)
    snowGolemSprite.addClockVersions(`snow-golem`)

    snowGolemSprite.addAnimatedVersion("spawn", [
        "snow-golem-spawn/1",
        "snow-golem-spawn/2",
        "snow-golem-spawn/3",
        "snow-golem-spawn/4",
        "snow-golem-spawn/5",
        "snow-golem-spawn/6",
        "snow-golem-spawn/7",
        "snow-golem-spawn/8",
    ])

    snowGolemSprite.addAnimatedVersion("burst", [
        "snow-golem-burst/1",
        "snow-golem-burst/2",
        "snow-golem-burst/3",
        "snow-golem-burst/4",
        "snow-golem-burst/5",
        "snow-golem-burst/6",
        "snow-golem-burst/7",
        "snow-golem-burst/8",
        "snow-golem-burst/9",
        "snow-golem-burst/10",
        "snow-golem-burst/11",
        "snow-golem-burst/12",
        "snow-golem-burst/13"
    ])

    return snowGolemSprite
}

game.constructors[SnowGolem.name] = SnowGolem
export { SnowGolem }