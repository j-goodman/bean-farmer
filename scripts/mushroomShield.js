import { Entity } from './entity.js';
import { Sprite } from './sprite.js';

class MushroomShield extends Entity {
    constructor(x, y, elevation) {
        super(x, y, elevation)
        this.sprite = new Sprite ("mushroom-shield")
        this.duration = 30 * 11
        game.player.shielded = this.duration
        this.name = "mushroom shield"
        this.initializeShieldUpdate()
    }

    initializeShieldUpdate () {
        for (let i = 0; i < this.duration; i++) {
            game.setTimer(() => {
                this.checkVisibility()
            }, i)
        }
    }

    checkVisibility () {
        if (
            game.checkGrid(this.position.x, this.position.y, true).airOccupant !== this
        ) {
            game.addToGrid(this, this.position.x, this.position.y, this.elevation)
        }
    }
    
    update (age) {
        this.frameUpdate()
        if (age < this.duration) {
            if (this.position.x > game.player.position.x) {
                this.moveThroughAir(-1, 0)
            } else if (this.position.x < game.player.position.x) {
                this.moveThroughAir(1, 0)
            }

            if (this.position.y > game.player.position.y) {
                this.moveThroughAir(0, -1)
            } else if (this.position.y < game.player.position.y) {
                this.moveThroughAir(0, 1)
            }
            console.log(this.exists)

            this.elevation = "air"
            this.moveDelay = game.player.moveDelay
        }

        if (age > this.duration) {
            this.die()
        }
    }
}

game.constructors[MushroomShield.name] = MushroomShield
export { MushroomShield }