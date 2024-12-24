import { Entity } from './entity.js';
import { Sprite } from './sprite.js';

import { IceSheet } from './iceSheet.js';
import { IceBlast } from './iceBlast.js';
import { SnailEgg } from './snailEgg.js';

import { game } from './game.js';
import { utils } from './utils.js';

class SnowSnail extends Entity {
    constructor(x, y) {
        super(x, y)
        this.imageName = "snow-snail"
        this.baseMoveDelay = 19
        this.name = "snowsnail"
        this.moveDelay = this.baseMoveDelay
        this.baseStrength = 4
        this.strength = this.baseStrength
        this.spawnPosition = {
            x: this.position.x,
            y: this.position.y
        }
        this.pushability = 4
        this.clockDirections = true
        this.sprite = makeSnowSnailSprite()
        this.sprite.version = "3"
        this.direction = "right"
        this.animal = true
        this.mood = "idle"
        this.health = 5
        this.cooldown = 10
        this.curled = false
        this.birthday -= utils.dice(112)
        this.unfreezable = true
        this.range = 4 + utils.dice(5)
        this.burnability = 3
        this.checkCoords = [
            {x: 0, y: 0},
            {x: 0, y: -1},
            {x: 1, y: -1},
            {x: 1, y: 0},
            {x: 1, y: 1},
            {x: 0, y: 1},
            {x: -1, y: 1},
            {x: -1, y: 0},
            {x: -1, y: -1},
        ]
    }

    onMove () {
        game.setTimer(() => {
            let ice = new IceSheet (this.position.x, this.position.y, "ground")
            this.freezeAir()
        }, 12)
    }

    checkForRange () {
        if (utils.distanceBetweenSquares(this.spawnPosition, this.position) > this.range) {
            this.mood = "walking"
            this.walkTo(this.spawnPosition, () => {
                this.mood = "idle"
            })
        }
    }

    spreadIce () {
        let ditch = 0
        let destination = {
            x: this.position.x,
            y: this.position.y
        }
        
        this.moveDelay = this.baseMoveDelay

        while (ditch < 5 && (
            game.checkGrid(destination.x, destination.y) ||
            (
                game.checkGrid(destination.x, destination.y, true).floorOccupant &&
                game.checkGrid(destination.x, destination.y, true).floorOccupant.name === "ice sheet"
            )
        )) {
            destination = {
                x: this.position.x + utils.dice(13) - 7,
                y: this.position.y + utils.dice(13) - 7
            }
            ditch += 1
        }

        this.mood = "walking"
        this.walkTo({x: destination.x, y: destination.y}, () => {
            this.mood = "idle"
            this.iceAdjacent()
        })
    }

    overcrowdingCheck () {
        let snailCount = 0
        const ground = game.checkGrid(this.position.x, this.position.y, true).groundOccupant
        if (ground && ground.name === "stone floor") {
            this.breakAndDie()
        }
        utils.checkAdjacents(this, item => {
            if (item.name === "snowsnail" || item.name === "snail egg") {
                snailCount += 1
            }
        })
        if (snailCount > 1) {
            this.breakAndDie()
        }
    }

    iceAdjacent () {
        const coords = [
            {x: 0, y: -1},
            {x: 1, y: 0},
            {x: 0, y: 1},
            {x: -1, y: 0},
        ]
        for (let i = 0; i < coords.length; i++) {
            const coord = coords[i];
            if (
                !(game.checkGrid(
                    this.position.x + coord.x,
                    this.position.y + coord.y,
                    true
                ).groundOccupant)
            ) {
                this.move(coord.x, coord.y)
                this.facing = utils.directionFromCoordinates(coord.x, coord.y)
                this.sprite.changeVersion(utils.directionToClock(this.facing))
                return true
            }
        }
        return false
    }

    update (age) {
        this.frameUpdate()
        if (this.cooldown > 0) {
            this.cooldown -= 1
        }
        if (this.curled && this.sprite.version !== "curled") {
            this.sprite.changeVersion("curled")
        }
        if (this.mood === "idle" && age % 112 === 0) {
            this.spreadIce()
        }
        if (age % 251 === 0) {
            this.checkForRange()
        }
        if (age % 12 === 0) {
            this.check()
        }
        if (age % 1799 === 0) {
            this.overcrowdingCheck()
        }
        if (age % 1800 === 0) {
            this.immobilized = false
            this.curled = false
            this.mood = "idle"
            this.currentAction = null
            if (age > 1800 && utils.dice(9) === 9) {
                this.walkTo(this.spawnPosition, () => {
                    this.mood = "idle"
                })
                game.setTimer(() => {
                    if (this.exists) {
                        this.checkDrop(new SnailEgg ())
                    }
                }, 300)
            }
            if (age >= 21600 && utils.distanceBetweenSquares(this.position, game.player.position) > 14) {
                this.breakAndDie()
            }
        }

    }

    onCut () {
        this.onHit()
    }

    onHit () {
        if (!this.curled) {
            this.breakAndDie()
        }
    }

    burn () {
        this.burnability -= 1
        if (this.burnability <= 0) {
            this.breakAndDie()
        }
    }

    breakAndDie () {
        this.playAnimationOnce("break", () => {
            this.die()
        })
    }

    onDeath () {
        const age = game.time - this.birthday
        if (age > 900 && utils.dice(5) !== 5) {
            this.checkDrop(new SnailEgg (this.position.x, this.position.y))
        } else {
            new IceBlast (this.position.x, this.position.y)
        }
    }

    checkForNeighbors () {
        const coords = this.checkCoords
        for (let i = 0; i < coords.length; i++) {
            const coord = coords[i];
            const entity = game.checkGrid(
                this.position.x + coord.x,
                this.position.y + coord.y,
            )
            if (entity && entity.name !== this.name && (entity.animal || entity.plant)) {
                return true
            }
        }
        return false
    }

    check () {
        if (
            !this.curled &&
            this.cooldown <= 0
        ) {
            if (
                game.player && (
                    utils.distanceBetweenSquares(this.position, game.player.position) < 3 ||
                    this.checkForNeighbors()
                )
            ) {
                if (utils.dice(2) === 2) {
                    this.curl()
                }
            }
        }
    }

    flee () {
        const coords = [
            {x: 0, y: -1},
            {x: 1, y: 0},
            {x: 0, y: 1},
            {x: -1, y: 0},
        ]
        const direction = coords[Math.floor(Math.random() * coords.length)]
        this.move(direction.x, direction.y)
    }

    quiver () {
        let jumpNums = [0, -2, -3, -2, 0, -2, -4, -2, 0, -2, -3, -1, 0, 0, 0]
        for (let i = 0; i < jumpNums.length; i++) {
            game.setTimer(() => {
                this.spriteOffset.y = jumpNums[i] / 20
            }, i)
        }
    }

    curl () {
        this.curled = true
        this.immobilized = true
        this.currentAction = null
        this.sprite.changeVersion("curled")
        
        const coords = this.checkCoords
        for (let i = 0; i < coords.length; i++) {
            const coord = coords[i];
            game.setTimer(() => {
                new IceBlast (this.position.x + coord.x, this.position.y + coord.y)
            }, i * 4)
        }
        game.setTimer(() => {
            this.quiver()
        }, 55)
        game.setTimer(() => {
            this.cooldown = 90
            this.immobilized = false
            this.curled = false
            this.sprite.changeVersion("3")
            this.flee()
            this.mood = "idle"
        }, 75)
    }
}

const makeSnowSnailSprite = () => {
    const snowSnailSprite = new Sprite ("snow-snail/3")

    snowSnailSprite.addClockVersions("snow-snail")

    snowSnailSprite.addVersion("curled", "snow-snail/shell")

    snowSnailSprite.addTransition("3", "curled", [
        "snow-snail/retract/right-1",
        "snow-snail/retract/right-2",
        "snow-snail/retract/right-3"
    ])

    snowSnailSprite.addTransition("6", "curled", [
        "snow-snail/retract/down-1",
        "snow-snail/retract/down-2",
        "snow-snail/retract/down-3"
    ])

    snowSnailSprite.addTransition("9", "curled", [
        "snow-snail/retract/left-1",
        "snow-snail/retract/left-2",
        "snow-snail/retract/left-3"
    ])

    snowSnailSprite.addTransition("12", "curled", [
        "snow-snail/retract/up-1",
        "snow-snail/retract/up-2",
        "snow-snail/retract/up-3"
    ])

    snowSnailSprite.addAnimatedVersion("break", [
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
        "snow-golem-burst/13",
    ])

    return snowSnailSprite
}

game.constructors[SnowSnail.name] = SnowSnail
export { SnowSnail }