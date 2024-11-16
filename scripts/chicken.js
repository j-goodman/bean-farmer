import { Entity } from './entity.js';
import { ChickenCarcass } from './chickenCarcass.js';
import { Sprite } from './sprite.js';

import { game } from './game.js';
import { utils } from './utils.js';
import { Egg } from './egg.js';

class Chicken extends Entity {
    constructor(x, y) {
        super(x, y)
        this.imageName = "chicken/3"
        this.baseMoveDelay = 15
        this.name = "chicken"
        this.moveDelay = this.baseMoveDelay
        this.baseStrength = 1
        this.strength = this.baseStrength
        this.pushability = 2
        this.sprite = this.makeChickenSprite()
        this.direction = "right"
        this.sprite.version = 3
        this.facing = 3
        this.clockDirections = true
        this.animal = true
        this.health = 9
        this.burnability = 3
        this.stomach = []
        this.birthday -= utils.dice(150)
        this.eggs = 3 + utils.dice(3)
    }

    makeChickenSprite () {
        const chickenSprite = new Sprite ("chicken/3")
        chickenSprite.addClockVersions("chicken")

        chickenSprite.addAnimatedVersion("flap/3", [
            "chicken/flap/3/1",
            "chicken/flap/3/2",
            "chicken/flap/3/3",
            "chicken/flap/3/3",
            "chicken/flap/3/3",
            "chicken/flap/3/2",
            "chicken/flap/3/1",
        ])
        chickenSprite.addAnimatedVersion("flap/6", [
            "chicken/flap/6/1",
            "chicken/flap/6/2",
            "chicken/flap/6/3",
            "chicken/flap/6/3",
            "chicken/flap/6/3",
            "chicken/flap/6/2",
            "chicken/flap/6/1",
        ])
        chickenSprite.addAnimatedVersion("flap/9", [
            "chicken/flap/9/1",
            "chicken/flap/9/2",
            "chicken/flap/9/3",
            "chicken/flap/9/3",
            "chicken/flap/9/3",
            "chicken/flap/9/2",
            "chicken/flap/9/1",
        ])
        chickenSprite.addAnimatedVersion("flap/12", [
            "chicken/flap/12/1",
            "chicken/flap/12/2",
            "chicken/flap/12/3",
            "chicken/flap/12/3",
            "chicken/flap/12/3",
            "chicken/flap/12/3",
            "chicken/flap/12/2",
            "chicken/flap/12/1",
        ])
        chickenSprite.addAnimatedVersion("peck/3", [
            "chicken/peck/3/1",
            "chicken/peck/3/2",
            "chicken/peck/3/3",
            "chicken/peck/3/4",
            "chicken/peck/3/4",
            "chicken/peck/3/4",
            "chicken/peck/3/4",
            "chicken/peck/3/4",
            "chicken/peck/3/4",
            "chicken/peck/3/3",
            "chicken/peck/3/2",
            "chicken/peck/3/1",
        ])
        chickenSprite.addAnimatedVersion("peck/6", [
            "chicken/peck/6/1",
            "chicken/peck/6/2",
            "chicken/peck/6/3",
            "chicken/peck/6/3",
            "chicken/peck/6/3",
            "chicken/peck/6/3",
            "chicken/peck/6/3",
            "chicken/peck/6/3",
            "chicken/peck/6/2",
            "chicken/peck/6/1",
        ])
        chickenSprite.addAnimatedVersion("peck/9", [
            "chicken/peck/9/1",
            "chicken/peck/9/2",
            "chicken/peck/9/3",
            "chicken/peck/9/4",
            "chicken/peck/9/4",
            "chicken/peck/9/4",
            "chicken/peck/9/4",
            "chicken/peck/9/4",
            "chicken/peck/9/4",
            "chicken/peck/9/3",
            "chicken/peck/9/2",
            "chicken/peck/9/1",
        ])
        chickenSprite.addAnimatedVersion("peck/12", [
            "chicken/peck/12/1",
            "chicken/peck/12/2",
            "chicken/peck/12/3",
            "chicken/peck/12/3",
            "chicken/peck/12/3",
            "chicken/peck/12/3",
            "chicken/peck/12/3",
            "chicken/peck/12/3",
            "chicken/peck/12/3",
            "chicken/peck/12/2",
            "chicken/peck/12/1",
        ])

        return chickenSprite
    }

    checkForGrass () {
        let found = false
        const coords = utils.adjacentCoords
        for (let i = 0; i < coords.length; i++) {
            const coord = coords[i];
            let item = game.checkGrid(this.position.x + coord.x, this.position.y + coord.y, true).groundOccupant
            if (!item) {
                item = game.checkGrid(this.position.x + coord.x, this.position.y + coord.y)
            }
            if (item && (item.name === "grass" || item.name === "grass seed" || item.name === "wild onion seed")) {
                found = true
                let xDiff = this.position.x - item.position.x
                let yDiff = this.position.y - item.position.y
                if (yDiff === 1) {
                    this.facing = 12
                } else if (yDiff === -1) {
                    this.facing = 6
                } else if (xDiff === -1) {
                    this.facing = 3
                } else if (xDiff === 1) {
                    this.facing = 9
                }
                this.turn(this.facing)
                game.setTimer(() => {
                    this.playAnimationOnce(`peck/${this.facing}`, () => {
                            if (item.name === "grass") {
                                if (utils.dice(3) === 3) {
                                    item.onCut()
                                }
                            } else {
                                this.eat(item)
                            }
                            this.stepForward()
                        })
                }, 4)
                break
            }

            if (!found) {
                this.checkAhead()
            }
        }
    }

    layEgg () {
        this.eggs -= 1
        let egg = null
        if (this.eggs > 0) {
            egg = new Egg ()
            this.flap()

            if (this.stomach.length >= 4) {
                this.stomach.pop()
                this.stomach.pop()
                this.stomach.pop()
                this.stomach.pop()
                egg.fertilize()
            }
        }

        if (egg) {
            this.checkDrop(egg)
        }
        if (this.eggs <= -1) {
            this.die()
        }
    }

    checkAhead () {
        const range = 8
        let found = null
        let coords = {x: 0, y: 0}
        let spotlight = {x: this.position.x, y: this.position.y}
        if (this.facing === 3) {
            coords.x = 1
        } else if (this.facing === 6) {
            coords.y = 1
        } else if (this.facing === 9) {
            coords.x = -1
        } else if (this.facing === 12) {
            coords.y = -1
        }
        let success = false
        let distance = 0
        for (let i = 1; i < range; i++) {
            spotlight.x += coords.x
            spotlight.y += coords.y
            distance += 1
            let item = game.checkGrid(spotlight.x, spotlight.y, true).groundOccupant
            if (!item) {
                item = game.checkGrid(spotlight.x, spotlight.y)
            }
            if (item && ["grass", "grass seed", "wild onion seed"].includes(item.name)) {
                success = true
                // for (let move = 1; move < 3; move++) {
                    // game.setTimer(() => {
                        this.stepForward()
                    // }, (move + 1) * (this.moveDelay + 1))
                // }
                break
            }
        }
        return success
    }

    eat (item) {
        this.stomach.push(item)
        item.die()
    }

    flap () {
        this.playAnimationOnce(`flap/${this.facing}`)
        game.setTimer(() => {
            this.jump()
        }, 4)
        game.setTimer(() => {
            this.playAnimationOnce(`flap/${this.facing}`)
        }, 11)

    }

    jump () {
        let jumpNums = []
        const roll = utils.dice(6)
        if (roll > 4) {
            jumpNums = [
                0, -4, -7, -9, -10, -12, -11, -9, -7, -3, 0,
                0, 0, 0, 0, -3, -5, -6, -7, -6, -5, -3, 0,
            ]
        } else if (roll > 2) {
            jumpNums = [
                0, -3, -5, -6, -7, -6, -5, -3, 0,
                0, 0, 0, 0, -4, -7, -9, -10, -12, -12, -11, -9, -7, -5, -3, 0,
            ]
        } else {
            jumpNums = [
                0, 0, 0, 0, -3, -5, -6, -7, -6, -5, -3, 0,
                0, 0, 0, 0, -2, -4, -5, -5, -4, -2, -0, 0,
                0, 0, 0, 0, -3, -5, -6, -7, -6, -5, -3, 0,
            ]
            game.setTimer(() => {
                this.playAnimationOnce(`flap/${this.facing}`)
            }, 21)
        }
        for (let i = 0; i < jumpNums.length; i++) {
            game.setTimer(() => {
                this.spriteOffset.y = jumpNums[i] / 20
            }, i)
        }
    }

    onDeath () {
        game.addToGrid(new ChickenCarcass (this.position.x, this.position.y))
    }

    onCut () {
        this.health -= 5
        this.flap()
        if (this.health <= 0) {
            this.die()
        }
    }

    onHit () {
        this.health -= 1
        this.flap()
        if (this.health <= 0) {
            this.die()
        }
    }

    burn () {
        this.health -= 1
        if (this.health <= 0) {
            this.die()
        }
    }

    lookAround () {
        const directions = [3, 6, 9, 12]
        let max = utils.dice(4)
        for (let i = 0; i < max; i++) {
            game.setTimer(() => {
                let dir = this.facing
                dir += 3
                if (dir > 12) {
                    dir = 3
                }
                this.turn(dir)
            }, Math.round((i * 35) * (utils.dice(10) + 15) / 25))
        }
        game.setTimer(() => {
            this.stepForward()
        }, (max * 36))
    }
    
    stepForward () {
        let x = 0
        let y = 0
        if (this.facing === 9 || this.facing === 3) {
            x = this.facing === 9 ? -1 : 1
        } else {
            y = this.facing === 12 ? -1 : 1
        }
        this.move(x, y)
    }

    onMove () {
        this.flap()
    }

    turn (numDirection) {
        this.sprite.changeVersion(numDirection)
        this.facing = numDirection
    }

    update (age) {
        this.frameUpdate()
        const posX = this.position.x
        const posY = this.position.y

        if (age % (30 * 8) === 0) {
            this.lookAround()
        } else if (age % (30 * 2) === 0) {
            this.checkForGrass()
        }

        if (age % (30 * 35) === 0) {
            if (utils.dice(3) === 3) {
                this.layEgg()
            }
        }

    }
}

game.constructors[Chicken.name] = Chicken
export { Chicken }