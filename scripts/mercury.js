import { Entity } from './entity.js';
import { Sprite } from './sprite.js';

import { IceSheet } from './iceSheet.js';
import { IceBlast } from './iceBlast.js';
import { SnailEgg } from './snailEgg.js';

import { game } from './game.js';
import { utils } from './utils.js';
import { Fire } from './fire.js';

class Mercury extends Entity {
    constructor(x, y) {
        super(x, y)
        this.imageName = "ground-snail"
        this.baseMoveDelay = 5
        this.name = "mercury"
        this.moveDelay = this.baseMoveDelay
        this.baseStrength = 4
        this.strength = this.baseStrength
        this.cooldown = 0
        this.unfreezable = true
        this.spawnPosition = {
            x: this.position.x,
            y: this.position.y
        }
        this.pushability = 4
        this.clockDirections = true
        this.sprite = makeMercurySprite()
        this.sprite.version = "3"
        this.direction = "right"
        this.animal = true
        this.mood = "idle"
        this.health = 500
        this.birthday -= utils.dice(112)
        this.burnability = 3
        this.curled = false
        this.currentFlag = "green"
        this.curlTime = 50
        this.losses = 0
        game.setTimer(() => {
            this.findFlags()
        }, 15)
        game.setTimer(() => {
            this.activateFlags()
        }, 30)
    }

    update (age) {
        this.frameUpdate()
        if (this.cooldown > 0) {
            this.cooldown -= 1
        }

        if (age % (30 * 5) === 0) {
            this.moveDelay = this.baseMoveDelay
        }

        if (this.mood === "idle" && !this.racing && !this.curled && age % (45) === 0 && utils.dice(3) === 3) {
            this.facing = [3, 4, 7, 9, 11][Math.floor(Math.random() * 5)]
            this.sprite.changeVersion(this.facing)
        }

        if (this.racing) {
            utils.checkAdjacents(this.finish, item => {
                if (item.name === this.name) {
                    this.win = true
                    this.racing = false
                }
                if (item.name === this.opponent.name) {
                    this.win = false
                    this.racing = false
                }
            })
        }

        if (age % 180 === 0 && !this.racing && !this.flagsActivated) {
            this.mood = "idle"
        }

        if (age % 90 === 0 && this.racing && !this.currentAction && this.finish) {
            this.flagsActivated = false
            this.walkTo(this.finish.position, () => {
                this.mood = "idle"
                this.racing = false
            })
        }

        if (age % (30 * 44) === 0 && !this.flagsActivated && !this.racing && this.losses < 2) {
            console.log("Mercury failsafe.")
            this.immobilized = false
            this.currentAction = null
            if (this.losses === 0) {
                this.baseMoveDelay = 5
                this.walkTo(this.greenFlag.position, () => {
                    this.activateFlags()
                    this.mood = "idle"
                })
            } else {
                this.baseMoveDelay = 4
                this.walkTo(this.redFlag.position, () => {
                    this.activateFlags("red")
                    this.mood = "idle"
                })
            }
        }

        if (age % (30 * 50) === 0 && this.losses > 1) {
            if (this.position.x > 0) {
                this.walkTo({x: 68, y: -8}, () => {
                    this.mood = "idle"
                })
            } else {
                this.walkTo({x: -77, y: -44}, () => {
                    this.mood = "idle"
                })
            }
        }

        if (this.mood === "idle" && age % 97 === 0 && this.losses > 1 && utils.dice(2) > 1) {
            if (utils.dice(2) > 1) {
                this.move(Math.round((Math.random() * 2) - 1), Math.round((Math.random() * 2) - 1))
                this.facing = utils.dice(12)
                this.sprite.changeVersion(this.facing)
            }
        }
    }f

    activateFlags (color) {
        let start = null
        let finish = null
        if (!this.redFlag || !this.greenFlag) {
            console.log("Missing mercury flag.", this.redFlag, this.greenFlag)
            return null
        }
        this.flagsActivated = true
        if (color === "red") {
            start = this.redFlag
            finish = this.greenFlag
        } else {
            start = this.greenFlag
            finish = this.redFlag
        }
        start.interaction = (challenger) => {
            if (this.curled) {
                this.curlCallback = () => {
                    this.race(start, finish, challenger)
                }
            } else {
                this.race(start, finish, challenger)
            }
        }
    }

    onCut () {
        this.onHit()
    }

    onHit () {
        if (!this.curled && this.cooldown <= 0) {
            if (this.racing) {
                this.curlCallback = () => {
                    this.walkTo(this.finish.position, () => {
                        this.mood = "idle"
                        this.racing = false
                    })
                }
            }
            this.curl()
        }
    }

    findFlags () {
        const range = 24
        for (let x = -range; x < range; x++) {
            for (let y = -range; y < range; y++) {
                const item = game.checkGrid(this.position.x + x, this.position.y + y)
                if (item && item.name === "red flag") {
                    this.redFlag = item
                } else if (item && item.name === "green flag") {
                    this.greenFlag = item
                } else if (item && item.lockedDoor && item.owner === "mercury") {
                    this.lockedDoor = item
                } else if (item && item.name === "sign" && item.text.includes("fastest snail")) {
                    this.sign = item
                }
            }
        }
    }

    breakAndDie () {
        this.playAnimationOnce("break", () => {
            this.die()
        })
    }

    quiver () {
        let jumpNums = [0, -2, -3, -2, 0, -2, -4, -2, 0, -2, -3, -1, 0, 0, 0]
        for (let i = 0; i < jumpNums.length; i++) {
            game.setTimer(() => {
                this.spriteOffset.y = jumpNums[i] / 20
            }, i)
        }
    }

    jump () {
        let jumpNums = [
            1, 2, 0, -4, -7, -9, -10, -9, -7, -4, 1, 0, 0, 0,
            1, -4, -7, -9, -10, -9, -7, -4, 1, 0, 0, 0
        ]
        for (let i = 0; i < jumpNums.length; i++) {
            game.setTimer(() => {
                this.spriteOffset.y = jumpNums[i] / 20
            }, i)
        }
    }

    curl () {
        this.curled = true
        this.immobilized = true
        this.sprite.changeVersion("curled")
        
        if (this.curlTime > 20) {
            game.setTimer(() => {
                this.quiver()
            }, this.curlTime - 20)
        }

        game.setTimer(() => {
            this.cooldown = 45
            this.immobilized = false
            this.curled = false
            this.sprite.changeVersion("3")
            if (this.curlCallback) {
                this.curlCallback()
                this.curlCallback = null
            }
        }, this.curlTime)
    }

    race (start, finish, opponent) {
        this.racing = true
        this.finish = finish
        this.opponent = opponent
        start.interaction = null
        this.flagsActivated = false
        this.walkTo(finish.position, () => {
            this.mood = "idle"
            this.racing = false
            if (this.win) {
                for (let i = 0; i < 7; i++) {
                    game.setTimer(() => { this.jump() }, i * 50)
                }            
                game.setTimer(() => {
                    this.moveDelay = 12
                    this.curlCallback = () => {
                        this.walkTo(start.position, () => {
                            this.moveDelay = this.baseMoveDelay
                            if (this.losses > 0) {
                                this.activateFlags("red")
                            } else {
                                this.activateFlags()
                            }
                            this.mood = "idle"
                        })
                    }
                    this.curl()
                }, 400)
            } else {
                game.givePoints(250, this.finish)
                this.losses += 1
                if (this.losses <= 1) {
                    this.quiver()
                    game.setTimer(() => { this.facing = 3; this.sprite.changeVersion(this.facing)}, 50)
                    game.setTimer(() => { this.facing = 9; this.sprite.changeVersion(this.facing)}, 65)
                    game.setTimer(() => { this.facing = 3; this.sprite.changeVersion(this.facing)}, 80)
                    game.setTimer(() => { this.facing = 9; this.sprite.changeVersion(this.facing)}, 95)
                    game.setTimer(() => {
                        this.curl()
                    }, 130)
                    game.setTimer(() => {
                        this.activateFlags("red")
                        this.baseMoveDelay = 4
                        this.moveDelay = this.baseMoveDelay
                        this.curlTime = 16
                        this.sign.text = `
                                I am extremely fast snail, only ever lost one race! Beat me red to green if you want my treasures. —M
                        `
                    }, 160)
                } else {
                    game.givePoints(500, this.finish)
                    this.quiver
                    this.curlTime = 160
                    game.setTimer(() => {
                        this.curl()
                    }, 60)
                    game.setTimer(() => {
                        this.curlTime = 36
                        this.lockedDoor.unlock()
                        this.sign.text = `
                                I am not fastest snail anymore since blue round snail beat me. I am going away for training. —M
                        `
                    }, 250)
                }
            }
        })
    }
}

const makeMercurySprite = () => {
    const groundSnailSprite = new Sprite ("ground-snail/3")

    groundSnailSprite.addClockVersions("ground-snail")

    groundSnailSprite.addVersion("curled", "ground-snail/shell")

    groundSnailSprite.addTransition("3", "curled", [
        "ground-snail/retract/right-1",
        "ground-snail/retract/right-2",
        "ground-snail/retract/right-3"
    ])

    groundSnailSprite.addTransition("6", "curled", [
        "ground-snail/retract/down-1",
        "ground-snail/retract/down-2",
        "ground-snail/retract/down-3"
    ])

    groundSnailSprite.addTransition("9", "curled", [
        "ground-snail/retract/left-1",
        "ground-snail/retract/left-2",
        "ground-snail/retract/left-3"
    ])

    groundSnailSprite.addTransition("12", "curled", [
        "ground-snail/retract/up-1",
        "ground-snail/retract/up-2",
        "ground-snail/retract/up-3"
    ])

    groundSnailSprite.addAnimatedVersion("break", [
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

    return groundSnailSprite
}

game.constructors[Mercury.name] = Mercury
export { Mercury }