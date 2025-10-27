import { Plant } from './plant.js';
import { DragonFlowerSeed } from './dragonFlowerSeed.js';

import { game } from './game.js';
import { utils } from './utils.js';
import { PoisonCloud } from './poisonCloud.js';
import { EmperorFlowerPod } from './emperorFlowerPod.js';
import { makeEmperorFlowerSprite } from './emperorFlowerSprites.js';

class EmperorFlower extends Plant {
    constructor(x, y) {
        super(x, y)
        this.baseMoveDelay = 18
        this.range = 5
        this.pods = []
        this.name = "emperor flower"
        this.moveDelay = this.baseMoveDelay
        this.baseStrength = 5
        this.unfreezable = true
        this.strength = this.baseStrength
        this.pushability = 10
        this.sprite = makeEmperorFlowerSprite()
        this.poisonImmune = true
        this.immobile = true
        this.overlayExists = true
        this.overlay = ["emperor-flower-crown"]
        this.overlayCycle = 0
        this.overlayLoop = true
        this.overlayHeight = 3
        this.overlayWidth = 3
        this.lastRetreatedAge = 0
        this.closed = false
        this.enemy = null
        this.closeCooldown = 30
        this.attackPosition = structuredClone(this.position)
        this.lastTwoEnemyPositions = []
        this.activePod = null
        this.face = "A"
        this.birthday -= utils.dice(60)
        this.overlayOffset = {
            x: -120,
            y: -120
        }
        game.setTimer(() => {
            this.checkProximity()
        }, 90)
    }

    update (age) {
        this.frameUpdate()
        if (this.closeCooldown > 0) {
            this.closeCooldown -= 1
        }

        if (this.closed && this.activePod) {
            this.overlayExists = false
            this.attackPosition = this.activePod.position
        } else {
            if (this.closed && !this.activePod) {
                this.open()
            }
            this.overlayExists = true
            this.attackPosition = this.position
            if (this.activePod) {
                this.activePod.close()
                this.activePod = null
            }
        }

        if (!this.enemy && !this.closed) {
            if (age % (30 * 2) === 0) {
                if (utils.dice(3) === 3) {
                    this.playAnimationOnce("blink")
                    if (utils.dice(2) === 2) {
                        game.setTimer(() => {
                            this.playAnimationOnce("blink")
                        }, 12 + utils.dice(14))
                    }
                }
            }
            if ((age + 26) % (30 * 4) === 0) {
                if (utils.dice(2) === 2) {
                    this.playAnimationOnce("eye-dart")
                }
            }
        }

        if (!this.closed) {
            if (this.sprite.version === "closed") {
                this.face = "A"
                this.sprite.changeVersion(this.face)
            }
        }

        if (age % 3 === 0) {
            if (
                !this.closed && this.closeCooldown <= 0 && this.checkIfVulnerable()
                && this.pods.length > 0
            ) {
                this.close()
            }
        }

        if (age % 19 === 0) {
            if (this.closed && this.sprite.version !== "closed") {
                if (this.sprite.version !== "A") {
                    this.sprite.changeVersion("A")
                    game.setTimer(() => {
                        this.sprite.changeVersion("closed")
                    }, 6)
                } else {
                    this.sprite.changeVersion("closed")
                }
            }
            if (!this.closed) {
                this.overlayOffset = {
                    x: -120,
                    y: -120
                }
            }
        }

        if (age % (30 * 9) === 0 && this.enemy) {
            this.accelerateGrowth()
            game.setTimer(() => {
                utils.smoothSoil(this.attackPosition, 3 + utils.dice(12))
            }, 6 + utils.dice(16))
        }
        if (age % 29 === 0) {
            if (this.lastRetreatedAge + (30 * 10) < game.time) {
                this.open()
            }
            if (this.closed && (!this.activePod || !this.activePod.exists)) {
                this.open()
            }
        }
        if (age % (30 * 6) === 0) {
            this.defend()
        }
        if (!this.enemy && age % 30 === 0) {
            this.seekEnemies()
        }
        if (age % (30 * 19) === 0) {
            if (this.pods.length < 3) {
                this.createPod()
            }
        }
        if (this.pods.length > 0 && age % (5) === 0) {
            this.pods = this.pods.filter(pod => {
                return pod.exists
            })
        }
        if (this.enemy && age % (30 * 8) === 0) {
            if (utils.distanceBetweenSquares(this.position, this.enemy.position) > this.range * 2) {
                this.enemy = null
            }
            if (this.enemy && !this.enemy.exists) {
                this.enemy = null
            } else {
                if (!this.closed) {
                    game.setTimer(() => {
                        const newFace = ["A", "B", "B", "B", "C", "C", "C"][Math.floor(Math.random() * 7)]
                        if (newFace !== this.face) {
                            this.face = newFace
                            this.sprite.changeVersion(newFace)
                        }
                    }, 14 + utils.dice(7))
                }
                this.poisonSpray(this.aimAtEnemy())
            }
        }
        if (this.enemy && age % 6 === 0) {
            if (
                this.lastTwoEnemyPositions.length < 2 ||
                !(this.lastTwoEnemyPositions[this.lastTwoEnemyPositions.length - 1].x === this.enemy.x &&
                this.lastTwoEnemyPositions[this.lastTwoEnemyPositions.length - 1].y === thie.enemy.y)
            ) {
                if (this.enemy && this.enemy.exists) {
                    this.lastTwoEnemyPositions.push({x: this.enemy.position.x, y: this.enemy.position.y})
                    if (this.lastTwoEnemyPositions.length > 2) {
                        this.lastTwoEnemyPositions.shift()
                    }
                }
            }
        }
    }
    
    aimAtEnemy () {
        if (!this.enemy) {
            return this.position
        }
        let target = null
        if (this.lastTwoEnemyPositions[1]) {
            const xDiff = this.lastTwoEnemyPositions[1].x - this.lastTwoEnemyPositions[0].x
            const yDiff = this.lastTwoEnemyPositions[1].y - this.lastTwoEnemyPositions[0].y
            target = {
                x: this.enemy.position.x + xDiff * 8,
                y: this.enemy.position.y + yDiff * 8,
            }
        } else {
            target = {x: this.enemy.position.x, y: this.enemy.position.y}
        }
        return target
    }

    createPod () {
        const emptyCoords = []
        for (let x = -this.range; x < this.range; x++) {
            for (let y = -this.range; y < this.range; y++) {
                const distance = utils.distanceBetweenSquares({x: 0, y: 0}, {x: x, y: y})
                if (distance < this.range && distance > 2) {
                    const square = game.checkGrid(this.position.x + x, this.position.y + y, true)
                    if (!square.occupant && !square.groundOccupant) {
                        emptyCoords.push({
                            x: this.position.x + x,
                            y: this.position.y + y
                        })
                    }
                }
            }
        }
        if (emptyCoords.length < 1) {
            return false
        }
        const coords = emptyCoords[Math.floor(Math.random() * emptyCoords.length)]
        const pod = new EmperorFlowerPod (coords.x, coords.y)
        pod.flower = this
        this.pods.push(pod)
    }

    accelerateGrowth () {
        let coords = utils.adjacentCoords
        coords.forEach(offset => {
            const item = game.checkGrid(this.attackPosition.x + offset.x, this.attackPosition.y + offset.y)
            if (item && item.name === "dragonflower sprout") {
                for (let i = 0; i < 20 + utils.dice(50); i++) {
                    game.setTimer(() => {
                        item.birthday -= 100
                    }, i)
                }
            }
        })
    }

    close () {
        if (this.pods.length === 0) {
            return false
        }
        this.sprite.changeVersion("A")

        for (let i = 1; i <= 5; i++) {
            game.setTimer(() => {
                game.ctx.drawImage(game.images[`emperor-flower-retract/${i}`],
                    (this.position.x - game.viewport.origin.x) * game.tileSize + this.overlayOffset.x,
                    (this.position.y - game.viewport.origin.y) * game.tileSize + this.overlayOffset.y
                )
            }, i)
        }
        
        const pod = this.pods[Math.floor(Math.random() * this.pods.length)]
        this.activePod = pod
        pod.open()
        
        this.closeCooldown = 5
        this.lastRetreatedAge = game.time
        this.closed = true

        game.setTimer(() => {
            this.sprite.changeVersion("closed")
        }, 5)
    }
    
    open () {
        game.setTimer(() => {
            this.face = "A"
            this.sprite.changeVersion(this.face)
        }, 1)
        game.setTimer(() => {
            this.closed = false
            this.pods.forEach(pod => {
                if (!pod.closed) {
                    pod.close()
                }
            })
            this.closeCooldown = 5
        }, 5)
        for (let i = 1; i <= 5; i++) {
            game.setTimer(() => {
                game.ctx.drawImage(game.images[`emperor-flower-retract/${6 - i}`],
                    (this.position.x - game.viewport.origin.x) * game.tileSize + this.overlayOffset.x,
                    (this.position.y - game.viewport.origin.y) * game.tileSize + this.overlayOffset.y
                )
            }, i)
        }
    }

    onDeath () {
        this.checkDrop(new DragonFlowerSeed (this.position.x, this.position.y))
        this.pods.forEach(pod => {
            if (utils.dice (2) === 2) {
                pod.barren = true
            }
            pod.die()
        })
        const range = Math.floor(this.range * 1.35)
        for (let x = -range; x < range; x++) {
            for (let y = -range; y < range; y++) {
                const item = game.checkGrid(this.position.x + x, this.position.y + y)
                const distance = utils.distanceBetweenSquares({x: 0, y: 0}, {x: x, y: y})
                if (distance <= range && item && item.name && item.name.includes("dragon") && item.onHit) {
                    game.setTimer(() => {
                        if (utils.dice(3) !== 3) {
                            item.barren = true
                        }
                        item.onHit()
                    }, Math.floor(distance * 2) + utils.dice(6))
                }
            }
        }
    }

    checkIfVulnerable () {
        let coords = utils.adjacentCoords
        let vulnerable = false
        coords.forEach(offset => {
            const item = game.checkGrid(this.position.x + offset.x, this.position.y + offset.y)
            if (!item || !item.name.includes("flower")) {
                vulnerable = true
            }
        })
        return vulnerable
    }

    poisonSpray (target) {
        if (this.closed && this.activePod) {
            this.activePod.playOverlayAnimation(this.sprite, "poison-attack")
            game.setTimer(() => {
                if (this.activePod) {
                    this.activePod.overlay = ["emperor-flower-crown"]
                    this.activePod.overlayCycle = 0
                    this.activePod.overlayLoop = true
                }
            }, 89)
        } else {
            this.playOverlayAnimation(this.sprite, "poison-attack")
            game.setTimer(() => {
                this.overlay = ["emperor-flower-crown"]
                this.overlayCycle = 0
                this.overlayLoop = true
            }, 89)
        }
        game.setTimer(() => {
            if (this.closeCooldown > 0) {
                return false
            }
            const focalPoints = []
            const poisonPoints = []
            focalPoints.push(target)
            focalPoints.push({
                x: Math.round((this.attackPosition.x + target.x) / 2),
                y: Math.round((this.attackPosition.y + target.y) / 2)
            })
            focalPoints.push({
                x: Math.round((this.attackPosition.x + target.x * 3) / 4),
                y: Math.round((this.attackPosition.y + target.y * 3) / 4)
            })
            focalPoints.push({
                x: Math.round((this.attackPosition.x * 3 + target.x) / 4),
                y: Math.round((this.attackPosition.y * 3 + target.y) / 4)
            })
            const powers = []
            focalPoints.forEach((focalPoint, index) => {
                let power = powers[index]
                for (let x = -2; x <= 2; x++) {
                    for (let y = -2; y <= 2; y++) {
                        if (utils.distanceBetweenSquares({x: 0, y: 0}, {x: x, y: y}) < 2) {
                            poisonPoints.push({
                                x: focalPoint.x + x,
                                y: focalPoint.y + y,
                            })
                        }
                    }
                }
            })
            poisonPoints.forEach(point => {
                const distance = utils.distanceBetweenSquares(this.attackPosition, point)
                game.setTimer(() => {
                    if (distance > 1 && distance <= this.range * 1.5) {
                        const item = game.checkGrid(point.x, point.y)
                        if (utils.dice(3) === 3 || !(item && item.name && item.name.includes("flower"))) {
                            new PoisonCloud (point.x, point.y, "air")
                        }
                    }
                }, Math.floor((distance - 1) * 5) + utils.dice(8))
            })
        }, 31)
    }

    onCut (cutter) {
        if (!this.closed) {
            this.die()
            if (cutter && cutter.name === "player") {
                game.givePoints(360, this)
            }
        }
    }
    
    checkProximity () {
        let count = 0
        for (let x = -5; x <= 5; x++) {
            for (let y = -3; y <= 3; y++) {
                const item = game.checkGrid(this.position.x + x, this.position.y + y)
                if (item && item.name === "emperor flower") {
                    count += 1
                }
            }
        }
        if (count > 1) {
            if (utils.dice(4) === 4) {
                this.die()
            } else {
                game.setTimer(() => {
                    this.checkProximity()
                }, 15)
            }
        }
    }

    seekEnemies () {
        for (let x = -this.range; x < this.range; x++) {
            for (let y = -this.range; y < this.range; y++) {
                const distance = utils.distanceBetweenSquares({x: 0, y: 0}, {x: x, y: y})
                if (distance <= this.range) {
                    const item = game.checkGrid(this.position.x + x, this.position.y + y)
                    if (
                        item && item.dragonFlowerKillCount &&
                        item.dragonFlowerKillCount > 2
                    ) {
                        this.enemy = item
                    }
                }
            }
        }
    }

    defend () {
        let coords = utils.adjacentCoords
        coords.forEach(offset => {
            if (!game.checkGrid(this.position.x + offset.x, this.position.y + offset.y)) {
                game.setTimer(() => {
                    game.addToGrid(new DragonFlowerSeed (this.position.x + offset.x, this.position.y + offset.y))
                }, utils.dice(30))
            }
        })

    }
}

game.constructors[EmperorFlower.name] = EmperorFlower
export { EmperorFlower }