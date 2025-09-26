import { Entity } from './entity.js';
import { Sprite } from './sprite.js';

import { wizardScreen } from './wizardScreen.js';
import { utils } from './utils.js'

class Wizard extends Entity {
    constructor(x, y) {
        super(x, y)
        this.sprite = new Sprite ("wizard")
        this.baseMoveDelay = 20
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

    interaction () {
        this.open()
        let positions = [
            this.spawnPosition,
            this.idleOne,
            this.idleTwo,
            this.idleThree,
        ]
        game.setTimer(() => {
            this.walkTo(positions[Math.floor(Math.random() * 4)], () => {
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
}

game.constructors[Wizard.name] = Wizard
export { Wizard }