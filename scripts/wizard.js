import { Entity } from './entity.js';
import { Sprite } from './sprite.js';

import { wizardScreen } from './wizardScreen.js';
import { fireballSpell } from './fireballSpell.js'
import { utils } from './utils.js'

class Wizard extends Entity {
    constructor(x, y) {
        super(x, y)
        this.sprite = new Sprite ("wizard/6")
        this.sprite.addClockVersions("wizard")
        this.clockDirections = true
        this.baseMoveDelay = 17
        this.moveDelay = this.baseMoveDelay
        this.name = "wizard"
        this.textColor = "#73461b"
        this.backgroundImage = "sign-text-background"
        this.tradePosition = {x: this.position.x - 2, y: this.position.y}
        this.spawnPosition = {x: this.position.x, y: this.position.y}
        this.idleOne = {x: this.position.x + 9, y: this.position.y + 3}
        this.idleTwo = {x: this.position.x + 1, y: this.position.y + 6}
        this.idleThree = {x: this.position.x + 2, y: this.position.y}
    }

    update (age) {
        this.frameUpdate()
        if (age % (30 * 17) === 0) {
            this.checkForIntruders()
            if (utils.distanceBetweenSquares(this.position, game.player.position > 3)) {
                this.walkAround()
            }
        }
        if (age % (30 * 9) === 0) {
            this.sprite.changeVersion(`${utils.dice(3) + 4}`)
        }
    }

    interaction () {
        this.open()
        this.walkAround()
    }

    walkAround () {
        let positions = [
            this.spawnPosition,
            {x: this.spawnPosition.x + 1,
             y: this.spawnPosition.y + 1},
            {x: this.spawnPosition.x - 1,
             y: this.spawnPosition.y - 1},
            this.idleOne,
            this.idleTwo,
            this.idleThree,
        ]
        game.setTimer(() => {
            this.walkTo(positions[Math.floor(Math.random() * positions.length)], () => {
                this.mood = "idle"
            })
        }, 15 + utils.dice(120))
    }

    jump () {
        let jumpNums = [
            0, -2, -3, -3, -3, -2, 0, 0, 0, 0, 0,
            0, -2, -3, -3, -3, -3, -3, -2, 0,
        ]
        for (let i = 0; i < jumpNums.length; i++) {
            game.setTimer(() => {
                this.spriteOffset.y = jumpNums[i] / 20
            }, i)
        }
    }

    open () {
        wizardScreen.wizard = this
        wizardScreen.open()
    }

    close () {
        game.play()
    }

    checkForIntruders () {
        let attacked = false
        let queued = false
        for (let x = -6; x < 6; x++) {
            for (let y = -5; y < 5; y++) {            
                const item = game.checkGrid(this.position.x + x, this.position.y + y)
                if (item && item.name && ["snowsnail"].includes(item.name)) {
                    if (attacked && !queued) {
                        queued = true
                        game.setTimer(() => {
                            this.checkForIntruders()
                        }, 45 + utils.dice(45))
                    } else if (!attacked) {
                        attacked = true
                        fireballSpell(this, {
                            x: this.position.x + x,
                            y: this.position.y + y
                        })
                    }
                }
            }
        }
    }
}

game.constructors[Wizard.name] = Wizard
export { Wizard }