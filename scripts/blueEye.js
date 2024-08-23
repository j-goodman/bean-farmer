import { Entity } from './entity.js';
import { Sprite } from './sprite.js';

import { IceBlast } from './iceBlast.js';
import { Fire } from './fire.js';
import { Lightburst } from './lightburst.js';

import { MeteorCrystal } from './meteorCrystal.js';
import { Key } from './key.js';

import { utils } from './utils.js'
import { CrystalKey } from './crystalKey.js';
import { SnowGolem } from './snowGolem.js';
import { RockGolem } from './rockGolem.js';

class BlueEye extends Entity {
    constructor(x, y) {
        super(x, y)
        this.sprite = makeBlueEyeSprite()
        this.name = "blue eye"
        this.baseMoveDelay = 9
        this.moveDelay = this.baseMoveDelay
        this.animal = true
        this.spawnPosition = {x: x, y: y}
        this.clockDirections = true
        this.currentAction = null
        this.immobile = true
        this.unfreezable = true
        this.damageLevel = 1

        this.overlayExists = true
        this.overlay = ["big-meteor-crystal-1"]
        this.overlayCycle = 0
        this.overlayLoop = true
        this.overlayHeight = 2
        this.overlayWidth = 1.5
        this.hitCooldown = 0
        this.overlayOffset = {
            x: -34,
            y: -60
        }

        this.target = {x: this.position.x, y: this.position.y}
        this.birthday -= utils.dice(120)
        this.timeQuirk = utils.dice(30)

        this.facing = "6"
        this.firingIceBeam = false
        this.lastTwoPositions = []

        this.poisonSoil()

        this.pushability = 10
    }

    poisonSoil () {
        for (let i = 70; i >= 0; i -= 9) {            
            this.cleanSoil(i, "soilToxicity", 1)
        }
    }

    setVariant (name) {
        if (name === "red") {
            this.variant = "red"
            const redEyeSprite = new Sprite ("red-eye/12")
            redEyeSprite.addClockVersions("red-eye")
            this.sprite = redEyeSprite
        }
    }

    onHit () {
        if (this.hitCooldown <= 0) {
            this.hitCooldown = 25
            this.damageLevel += 1
            this.checkDrop(new MeteorCrystal (this.position.x, this.position.y))
            this.checkDrop(new MeteorCrystal (this.position.x, this.position.y))
            this.checkDrop(new MeteorCrystal (this.position.x, this.position.y))
            this.checkDrop(new MeteorCrystal (this.position.x, this.position.y))
            if (this.damageLevel > 4) {
                if (this.variant === "red") {
                    game.setTimer(() => {
                        this.castRockGolems()
                    }, 20)
                    game.setTimer(() => {
                        this.castRockGolems()
                    }, 50)
                    game.setTimer(() => {
                        this.castRockGolems()
                    }, 57)
                    game.setTimer(() => {
                        this.castRockGolems()
                    }, 70)
                } else {
                    game.setTimer(() => {
                        this.castSnowGolems()
                    }, 20)
                    game.setTimer(() => {
                        this.castSnowGolems()
                    }, 50)
                }
                this.bombCheck = (bomb) => {
                    bomb.direction.x *= -1
                    bomb.direction.y *= -1
                }
            }
        }
    }

    onCut () {
        if (this.damageLevel > 4 && !this.dying) {
            this.dying = true
            this.overlayHeight = 3
            this.overlayWidth = 1.5
            this.overlayOffset = {x: -30, y: -120}
            this.facing = 12
            new Lightburst (this.position.x, this.position.y)
            this.jump()
            game.setTimer(() => {
                this.die()
            }, 1)
        }
    }

    onDeath () {
        if (this.spawnPosition.x > 80) {
            this.secureDrop(new CrystalKey (this.position.x, this.position.y))
        } else {
            this.secureDrop(new Key (this.position.x, this.position.y))
        }
        this.cleanSoil(35, "soilToxicity", -1)
        this.cleanSoil(25, "soilToxicity", -1)
        this.cleanSoil(11, "soilToxicity", -1)
        this.cleanSoil(10, "soilToxicity", -1)
        this.cleanSoil(9, "soilToxicity", -1)
        this.cleanSoil(8, "soilToxicity", -1)
        this.cleanSoil(7, "soilToxicity", -1)
        this.cleanSoil(6, "soilToxicity", -1)
        this.cleanSoil(5, "soilToxicity", -1)
        this.cleanSoil(4, "soilToxicity", -1)
        this.cleanSoil(3, "soilToxicity", -1)
        this.cleanSoil(2, "soilToxicity", -1)
    }

    castSnowGolems () {
        const coords = [
            {x: -1, y: 1},
            {x: -1, y: 2},
            {x: 1, y: 1},
            {x: 2, y: 0},
            {x: 2, y: -1},
            {x: 0, y: -2},
            {x: 1, y: -2},
        ]
        for (let i = 0; i < 7; i++) {
            game.setTimer(() => {
                let lightburst = new Lightburst (
                    this.position.x,
                    this.position.y - i
                )
                lightburst.spriteOffset.x = (utils.dice(20) - 10) / 5
                lightburst.spriteOffset.y = ((utils.dice(20) - 10) / 10) + i
                if (utils.dice(5) !== 5) {
                    let golem = new SnowGolem (this.position.x + coords[i].x, this.position.y + coords[i].y)
                    golem.target = game.player
                }
            }, i * 5)
        }
    }

    castRockGolems () {
        const searchRadius = 6
        const rocks = []
        const rockHash = {}

        let cursor = {x: this.position.x, y: this.position.y}
        cursor.x -= searchRadius
        cursor.y -= searchRadius
        for (let x = 0; x < searchRadius * 2; x++) {
            for (let y = 0; y < searchRadius * 2; y++) {
                let entity = game.checkGrid(cursor.x, cursor.y)
                if (entity && entity.name === "rock" && !rockHash[entity.id]) {
                    rocks.push(entity)
                    rockHash[entity.id] = true
                }
                cursor.y += 1
            }
            cursor.y = this.position.y - searchRadius
            cursor.x += 1
        }

        let count = 1 + utils.dice(2)
        for (let i = 0; i < count; i++) {
            const rock = rocks[Math.floor(Math.random() * rocks.length)]
            game.setTimer(() => {
                if (rock && rock.exists) {
                    rock.die()
                    new Lightburst (rock.position.x, rock.position.y)
                    const golem = new RockGolem (rock.position.x, rock.position.y)
                    
                    golem.defaultFacing = [
                        "up", "right", "down", "left"
                    ][Math.floor(Math.random() * 4)]

                    console.log("New rock golem:")
                    console.log(golem.defaultFacing)

                    golem.target = game.player
                }
            }, 15 * i)
        }

    }

    update (age) {
        this.frameUpdate()
        if (this.hitCooldown > 0) {
            this.hitCooldown -= 1
        }
        if (age % 6 === 0) {
            this.checkForPlayer()
            if (
                this.lastTwoPositions.length < 2 ||
                !(this.lastTwoPositions[this.lastTwoPositions.length - 1].x === game.player.x &&
                this.lastTwoPositions[this.lastTwoPositions.length - 1].y === game.player.y)
            ) {
                if (game.player) {
                    this.lastTwoPositions.push({x: game.player.position.x, y: game.player.position.y})
                    if (this.lastTwoPositions.length > 2) {
                        this.lastTwoPositions.shift()
                    }
                }
            }
            if (this.damageLevel >= 1 && this.damageLevel <= 4) {
                this.overlay = [`big-meteor-crystal-${this.damageLevel}`]
            } else if (this.damageLevel > 4 && !this.dying) {
                this.immobile = false
                this.overlayExists = false
                this.overlay = null
            }
        }

        if (age % (30 * 60) === 0) {
            if (this.hitCooldown <= 0 && this.damageLevel < 5 && this.damageLevel > 1) {
                this.damageLevel -= 1
            }
        }

        if (this.damageLevel > 1 && (age) % (30 * 33 + this.timeQuirk) === 0) {
            if (this.variant === "red") {
                this.castRockGolems()
                game.setTimer(() => {
                    this.castRockGolems()
                }, 50)
            } else {
                this.castSnowGolems()
            }
        }

        if (!this.immobile && age % 9 === 0) {
            let moveDirection = {x: 0, y: 0}
            if (this.position.x > game.player.position.x) {
                moveDirection.x = 1
            } else if (this.position.x < game.player.position.x) {
                moveDirection.x = -1
            }
            if (this.position.y > game.player.position.y) {
                moveDirection.y = 1
            } else if (this.position.y < game.player.position.y) {
                moveDirection.y = -1
            }
            const success = this.move(moveDirection.x, moveDirection.y)
            if (success) {
                this.facing = utils.directionFromCoordinates(moveDirection.x, moveDirection.y)
                this.direction = this.facing
                this.sprite.changeVersion(this.facing)
            }
        }
        
        if (age % (145 + this.timeQuirk) === 0) {
            this.iceBeam(this.aimAtTarget())
        }

        if (this.firingIceBeam) {
            this.drawIceBeam()
        }
    }

    aimAtTarget () {
        if (this.lastTwoPositions[1]) {
            const xDiff = this.lastTwoPositions[1].x - this.lastTwoPositions[0].x
            const yDiff = this.lastTwoPositions[1].y - this.lastTwoPositions[0].y
            this.target = {
                x: game.player.position.x + xDiff * 4,
                y: game.player.position.y + yDiff * 4,
            }
        } else {
            this.target = {x: game.player.position.x, y: game.player.position.y}
        }
        return this.target
    }

    jump () {
        let jumpNums = [
            0, -3, -5, -6, -7, -7, -6, -5, -3, 0,
            0, -3, -5, -6, -7, -6, -5, -3, 0
        ]
        for (let i = 0; i < jumpNums.length; i++) {
            game.setTimer(() => {
                this.spriteOffset.y = jumpNums[i] / 20
            }, i)
        }
    }

    onMove () {
        this.jump()
    }

    iceBeam (aim) {
        if (utils.distanceBetweenSquares(this.position, aim) > 11) {
            return false
        }

        this.readyingIceBeam = true

        new Lightburst (this.position.x, this.position.y)

        game.setTimer(() => {
            this.firingIceBeam = {x: aim.x, y: aim.y}
            game.setTimer(() => {
                this.iceBeamExplosion(aim)
            }, 5)
            game.setTimer(() => {
                this.firingIceBeam = false
                this.readyingIceBeam = false
            }, 8)
        }, 20)
    }

    iceBeamExplosion (position) {
        let Blast = IceBlast
        if (this.variant === "red") {
            Blast = Fire
        }

        new Blast(position.x, position.y, "air")

        game.setTimer(() => {
            new Blast(position.x - 1, position.y, "air")
            new Blast(position.x + 1, position.y, "air")
            new Blast(position.x, position.y - 1, "air")
            new Blast(position.x, position.y + 1, "air")
        }, 4)
        game.setTimer(() => {
            new Blast(position.x - 1, position.y - 1, "air")
            new Blast(position.x - 1, position.y + 1, "air")
            new Blast(position.x + 1, position.y + 1, "air")
            new Blast(position.x + 1, position.y - 1, "air")
        }, 8)
        game.setTimer(() => {
            new Blast(position.x - 2, position.y - 1, "air")
            new Blast(position.x - 2, position.y, "air")
            new Blast(position.x - 2, position.y + 1, "air")
            
            new Blast(position.x - 1, position.y - 2, "air")
            new Blast(position.x, position.y - 2, "air")
            new Blast(position.x + 1, position.y - 2, "air")

            new Blast(position.x + 2, position.y - 1, "air")
            new Blast(position.x + 2, position.y, "air")
            new Blast(position.x + 2, position.y + 1, "air")
            
            new Blast(position.x - 1, position.y + 2, "air")
            new Blast(position.x, position.y + 2, "air")
            new Blast(position.x + 1, position.y + 2, "air")
        }, 12)
    }

    drawIceBeam () {
        game.setTimer(() => {
            const ctx = game.ctx
            const tileSize = game.tileSize
            const target = game.player
            ctx.beginPath()
            ctx.strokeStyle = "rgba(255,255,255,.65)";
            if (this.variant === "red") {
                ctx.strokeStyle = "rgba(255,225,120,.65)";
            }
            ctx.lineCap = "round";
            ctx.lineWidth = 8;
            ctx.moveTo(
                (this.spritePosition.x + this.spriteOffset.x - game.viewport.origin.x) * tileSize + (tileSize / 2),
                (this.spritePosition.y + this.spriteOffset.y - game.viewport.origin.y) * tileSize + (tileSize / 2),
            )
            ctx.lineTo(
                (this.target.x - game.viewport.origin.x) * tileSize + (tileSize / 2), (this.target.y - game.viewport.origin.y) * tileSize + (tileSize / 2),
            )
            ctx.stroke()

            ctx.fillStyle = "rgba(245,215,255,.65)";
            ctx.beginPath();
            ctx.arc(
                (this.target.x - game.viewport.origin.x) * tileSize + (tileSize / 2),
                (this.target.y - game.viewport.origin.y) * tileSize + (tileSize / 2),
                utils.dice(120),
                0, 2 * Math.PI
            );
            ctx.fill();
        }, 0)
    }
}

const makeBlueEyeSprite = () => {
    const blueEyeSprite = new Sprite ("blue-eye/12")    
    blueEyeSprite.addClockVersions("blue-eye")

    return blueEyeSprite
}

game.constructors[BlueEye.name] = BlueEye
export { BlueEye }