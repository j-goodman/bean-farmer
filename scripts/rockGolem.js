import { Entity } from './entity.js';
import { Sprite } from './sprite.js';

import { StoneBlade } from './stoneBlade.js';
import { SmokyQuartz } from './smokyQuartz.js';

import { game } from './game.js';
import { utils } from './utils.js';
import { SulfurCrystal } from './sulfurCrystal.js';

class RockGolem extends Entity {
    constructor(x, y) {
        super(x, y)
        this.imageName = "rock-golem/6"
        this.baseMoveDelay = 10
        this.name = "rock golem"
        this.moveDelay = this.baseMoveDelay
        this.baseStrength = 5
        this.breakability = 5
        this.strength = this.baseStrength
        this.spawnPosition = {
            x: this.position.x,
            y: this.position.y
        }
        this.pushability = 4
        // this.clockDirections = true
        this.sprite = makeRockGolemSprite()
        this.sprite.version = "6"
        this.defaultFacing = "down"
        this.facing = this.defaultFacing
        this.direction = this.defaultFacing
        this.equipped = new StoneBlade ()
        this.sightDistance = 7
        this.cooldown = 0
        this.timeSinceMove = 0
        this.birthday -= utils.dice(112)
        this.target = null
        this.sleep()
        game.setTimer(() => {
            this.checkIfCornered()
        }, 60)

    }

    update (age) {
        this.frameUpdate()
        this.cooldown -= 1
        this.timeSinceMove += 1

        if (age % 4 === 0) {
            if (this.target) {
                this.checkTargetDistance()
            } else {
                this.checkForTargets()
            }
        }

        if (age % 16000 === 0) {
            this.target = null
            this.returnHome()
            this.moveDelay = 14
        }

        if (age % 900 === 0) {
            if (!this.target && !(
                this.position.x === this.spawnPosition.x &&
                this.position.y === this.spawnPosition.y
            )) {
                this.currentAction = false
                this.currentWalk = null
                this.currentDestination = null
                const reverses = {
                    up: "down",
                    right: "left",
                    down: "up",
                    left: "right"
                }
                this.facing = reverses[this.facing]
                this.sprite.changeVersion(this.facing)
                this.returnHome()
            }
        }

        if (age % 1200 === 0) {
            // failsafe reset every 40 seconds.
            if (
                this.position.x !== this.spawnPosition.x &&
                this.position.y !== this.spawnPosition.y &&
                utils.distanceBetweenSquares(this.position, game.player.position) > 16
            ) {
                this.teleport()
                this.target = null
                this.facing = this.defaultFacing
                this.sprite.changeVersion(this.facing)
                this.direction = this.facing
            }
        }

        if (this.target) {
            const target = this.target
            this.breakability = 5

            if (!target.exists || !target.position) {
                this.target = null
                this.returnHome()
                this.moveDelay = 20
            }
            if (
                this.position.x === this.spritePosition.x &&
                this.position.y === this.spritePosition.y
            ) {
                let moveDirection = {x: 0, y: 0}
                if (age % 2 === 0) {
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
                this.slashCheck()
                const success = this.move(moveDirection.x, moveDirection.y)
                if (success) {
                    this.facing = utils.directionFromCoordinates(moveDirection.x, moveDirection.y)
                    this.direction = this.facing
                    this.sprite.changeVersion(this.facing)
                    this.timeSinceMove = 0
                }
            }
        }

        if (this.equipped && this.equipped.holdUpdate) {
            this.equipped.holdUpdate(this)
        }
    }

    awaken () {
        this.moveDelay = this.baseMoveDelay
        this.breakability = 5
        this.equipped.equippedOffsets.down = {
            x: 60,
            y: 20,
            angle: -80
        }
    }

    sleep () {
        this.facing = this.defaultFacing
        this.direction = this.facing
        this.breakability = 7
        this.spritePosition.x = this.position.x
        this.spritePosition.y = this.position.y
        this.sprite.changeVersion(this.facing)
        this.equipped.equippedOffsets.down = {
            x: 4,
            y: 0,
            angle: -1
        }
    }
    
    checkForTargets () {
        let scope = {x: this.position.x, y: this.position.y}
        const coords = utils.directionToCoordinates(this.facing)
        if (!coords) {
            return false
        }
                
        for (let i = 0; i < this.sightDistance; i++) {
            scope.x += coords.x
            scope.y += coords.y
            const entity = game.checkGrid(scope.x, scope.y)
            if (entity && entity.name !== this.name && (entity.animal || entity.plant)) {
                this.awaken()
                game.setTimer(() => {
                    this.awaken()
                    this.target = entity
                }, 10)
            } else if (entity && !entity.pickupable) {
                return false
            }
        }
    }

    onCut (subject) {
        this.awaken()
        if (!this.target) {
            this.target = subject
        }
    }

    checkTargetDistance () {
        if (!this.target || !this.target.position) {
            return false
        }
        const distance = utils.distanceBetweenSquares(this.position, this.target.position)
        if (distance > 19) {
            this.target = null
            this.returnHome()
        }
    }

    returnHome () {
        this.walkTo(this.spawnPosition, () => {
            this.sleep()
        })
    }

    checkIfCornered () {
        if (this.checkFacingSquare()) {
            this.defaultFacing = "up"
            this.facing = this.defaultFacing
            this.direction = this.defaultFacing
            this.sprite.changeVersion(this.facing)
            game.setTimer(() => {
                if (this.checkFacingSquare()) {
                    this.defaultFacing = "down"
                    this.facing = this.defaultFacing
                    this.direction = this.defaultFacing
                    this.sprite.changeVersion(this.facing)
                }
            }, 60)
        }
    }

    slashCheck () {
        const coords = [
            {x: 0, y: -1},
            {x: 1, y: 0},
            {x: 0, y: 1},
            {x: -1, y: 0},
        ]
        for (let i = 0; i < coords.length; i++) {
            const coord = coords[i];
            const entity = game.checkGrid(
                this.position.x + coord.x,
                this.position.y + coord.y
            )
            if (entity && (entity.animal || entity.plant)) {
                this.facing = utils.directionFromCoordinates(coord.x, coord.y)
                this.sprite.changeVersion(this.facing)
                this.slash()
            }
        }
    }

    slash () {
        if (this.cooldown <= 0 && this.equipped && this.equipped.use) {
            this.direction = this.facing
            this.equipped.use(this)
            this.cooldown = 45
        }
    }

    deflect () {
        if (this.equipped && this.equipped.deflect) {
            this.direction = this.facing
            this.equipped.deflect(this)
            this.cooldown = 45
        }
    }
    
    onBreak () {
        this.playAnimationOnce("break", () => {
            this.die()
        })
    }

    onDeath () {
        let Drop = SulfurCrystal
        if (utils.distanceBetweenSquares(this.position, game.player.position) < 16) {
            game.givePoints(70, this)
        }
        if (utils.dice(2) === 2) {
            Drop = SmokyQuartz
        }
        this.checkDrop(new Drop ())
    }
}

const makeRockGolemSprite = () => {
    const rockGolemSprite = new Sprite ("rock-golem/6")

    rockGolemSprite.addVersion("down", "rock-golem/6")
    rockGolemSprite.addVersion("right", "rock-golem/3")
    rockGolemSprite.addVersion("left", "rock-golem/9")
    rockGolemSprite.addVersion("up", "rock-golem/12")
    
    rockGolemSprite.addTransition("down", "right", [
        "rock-golem/6",
        "rock-golem/5",
        "rock-golem/5",
        "rock-golem/4",
        "rock-golem/4",
        "rock-golem/3"
    ])
    
    rockGolemSprite.addTransition("right", "up", [
        "rock-golem/3",
        "rock-golem/2",
        "rock-golem/2",
        "rock-golem/1",
        "rock-golem/1",
        "rock-golem/12"
    ])
    
    rockGolemSprite.addTransition("left", "up", [
        "rock-golem/9",
        "rock-golem/10",
        "rock-golem/10",
        "rock-golem/11",
        "rock-golem/11",
        "rock-golem/12"
    ])
    
    rockGolemSprite.addTransition("down", "left", [
        "rock-golem/6",
        "rock-golem/7",
        "rock-golem/7",
        "rock-golem/8",
        "rock-golem/8",
        "rock-golem/9"
    ])
    
    rockGolemSprite.addTransition("left", "right", [
        "rock-golem/9",
        "rock-golem/8",
        "rock-golem/8",
        "rock-golem/7",
        "rock-golem/6",
        "rock-golem/5",
        "rock-golem/4",
        "rock-golem/4",
        "rock-golem/3",
    ])
    
    rockGolemSprite.addTransition("up", "down", [
        "rock-golem/12",
        "rock-golem/11",
        "rock-golem/11",
        "rock-golem/10",
        "rock-golem/9",
        "rock-golem/8",
        "rock-golem/7",
        "rock-golem/7",
        "rock-golem/6",
    ])
    
    rockGolemSprite.addAnimatedVersion("break", [
        "rock-break/1",
        "rock-break/2",
        "rock-break/3",
        "rock-break/4",
        "rock-break/5",
        "rock-break/6",
        "rock-break/7",
        "rock-break/8",
        "rock-break/9",
        "rock-break/10",
        "rock-break/11",
        "rock-break/12",
    ])

    return rockGolemSprite
}

game.constructors[RockGolem.name] = RockGolem
export { RockGolem }