import { Entity } from './entity.js';
import { Sprite } from './sprite.js';
import { utils } from './utils.js';

class SpikeController extends Entity {
    constructor(x, y) {
        super(x, y)
        this.name = "spike controller"
        this.sprite = new Sprite ("spike-controller")
        this.spikes = []
        this.spikeHash = {}
        this.birthday -= utils.dice(45)
        game.setTimer(() => {
            this.gatherSpikes()
        }, 30)
        this.breakability = 5
        this.damage = 0
        this.immobile = true
        this.spikeDistance = 1
    }

    gatherSpikes () {
        const searchRadius = 6
        let cursor = {x: this.position.x, y: this.position.y}
        cursor.x -= searchRadius
        cursor.y -= searchRadius
        for (let x = 0; x < searchRadius * 2; x++) {
            for (let y = 0; y < searchRadius * 2; y++) {
                let entity = game.checkGrid(cursor.x, cursor.y)
                if (!entity || entity.name !== "spikes") {
                    entity = game.checkGrid(cursor.x, cursor.y, true).groundOccupant
                }
                if (entity && entity.name === "spikes" && !this.spikeHash[entity.id]) {
                    this.spikes.push(entity)
                    this.spikeHash[entity.id] = true
                }
                cursor.y += 1
            }
            cursor.y = this.position.y - searchRadius
            cursor.x += 1
        }
    }

    setVariant (name) {
        if (name === "simple") {
            this.variant = "simple"
        }
        if (name === "slow") {
            this.variant = "slow"
        }
    }

    onBreak () {
        this.spikes.forEach(spike => {
            if (utils.dice(3) === 3) {
                spike.goUp()
            }
            game.setTimer(() => {
                spike.goDown()
            }, 30 + utils.dice(150)) 
            game.setTimer(() => {
                spike.goUp()
                game.setTimer(() => {
                    spike.goDown()
                }, 450)
            }, 450)
        })
        if (this.damage >= 2) {
            this.die()
        } else {
            this.damage += 1
            this.sprite = new Sprite (`spike-controller-${this.damage}`)
        }
    }

    update (age) {
        const frequency = 45
        if (!this.exists) {
            return false
        }

        if (!this.variant && age % frequency === 0) {
            this.spikes.forEach(spike => {
                const distance = utils.distanceBetweenSquares(this.position, spike.position)
                if (Math.round(distance) === this.spikeDistance) {
                    spike.goUp()
                    game.setTimer(() => {
                        spike.goDown()
                    }, frequency)
                }
            })
            this.spikeDistance += 1
            if (this.spikeDistance > 6) {
                this.spikeDistance = 1
            }
        }

        if (this.variant === "simple" && age % frequency === 0) {
            this.spikes.forEach(spike => {
                if (spike.up) {
                    spike.goDown()
                } else {
                    spike.goUp()
                }
            })
        }

        if (this.variant === "slow" && age % (frequency * 10) === 0) {
            this.spikes.forEach(spike => {
                spike.goDown()
            })
        }

        if (this.variant === "slow" && (age - 60) % (frequency * 10) === 0) {
            this.spikes.forEach(spike => {
                spike.goUp()
            })
        }

        if (age % (frequency * 10) === 0) {
            if (utils.dice(3) === 3) {
                this.gatherSpikes()
            }
        }
    }
}

game.constructors[SpikeController.name] = SpikeController
export { SpikeController }