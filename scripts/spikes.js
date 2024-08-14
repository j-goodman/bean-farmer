import { Entity } from './entity.js';
import { Sprite } from './sprite.js';
import { utils } from './utils.js';

class Spikes extends Entity {
    constructor(x, y) {
        super(x, y)
        this.name = "spikes"
        this.up = false
        this.sprite = new Sprite ("spikes/12")
        this.sprite.addVersion("up", "spikes/1")
        this.sprite.addVersion("down", "spikes/12")
        this.sprite.changeVersion("down")
        this.sprite.addTransition("up", "down", [
            "spikes/1",
            "spikes/2",
            "spikes/3",
            "spikes/4",
            "spikes/5",
            "spikes/6",
            "spikes/7",
            "spikes/8",
            "spikes/9",
            "spikes/10",
            "spikes/11",
            "spikes/12",
        ])
        game.setTimer(() => {
            this.moveToGround()
        }, 60)
    }

    update (age) {
        this.frameUpdate()
        if (this.cooldown > 0) {
            this.cooldown -= 1
        }
        if (this.up && age % 30 === 0) {
            const obstacle = game.checkGrid(this.position.x, this.position.y)
            if (obstacle) {
                this.onTouch(obstacle)
            }
        }
    }

    goUp () {
        const obstacle = game.checkGrid(this.position.x, this.position.y)
        if (obstacle && obstacle.name === "rock") {
            return false
        }

        this.sprite.changeVersion("up")
        this.up = true
        this.moveFromGround()

        if (obstacle) {
            this.onTouch(obstacle)
            if (obstacle.pickupable) {
                const baseStrength = obstacle.strength
                obstacle.strength = 5
                let moveDirection = {x: 1, y: 0}
                if (utils.dice(5) === 5) {
                    moveDirection = {x: 0, y: 1}
                }
                if (utils.dice(6) === 6) {
                    moveDirection = {x: 0, y: -1}
                }
                if (utils.dice(7) === 7) {
                    moveDirection = {x: -1, y: 0}
                }
                obstacle.move(moveDirection.x, moveDirection.y, () => {
                    obstacle.strength = baseStrength
                })
                if (obstacle.idle) {
                    obstacle.idle()
                }
            }
        }
    }

    onTouch (subject) {
        if (!subject || !this.up || this.cooldown > 0) {
            return false
        }
        if (subject.onHit) {
            this.cooldown = 15
            subject.onHit()
            subject.onHit()
        } else if (subject.onCut) {
            this.cooldown = 15
            subject.onCut()
        } else if (subject.onBreak) {
            subject.onBreak()
        }
    }

    goDown () {
        this.sprite.changeVersion("down")
        game.setTimer(() => {
            this.up = false
            this.moveToGround()
        }, 9)
    }
}

game.constructors[Spikes.name] = Spikes
export { Spikes }