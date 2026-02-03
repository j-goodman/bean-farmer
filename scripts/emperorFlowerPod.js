import { Plant } from './plant.js';
import { DragonFlowerSeed } from './dragonFlowerSeed.js';
import { makeEmperorFlowerPodSprite } from './emperorFlowerSprites.js';

import { game } from './game.js';
import { utils } from './utils.js';

class EmperorFlowerPod extends Plant {
    constructor(x, y) {
        super(x, y)
        this.baseMoveDelay = 18
        this.name = "emperor flower pod"
        this.moveDelay = this.baseMoveDelay
        this.sprite = makeEmperorFlowerPodSprite()
        this.immobile = true
        this.overlayExists = false
        this.overlay = ["emperor-flower-crown"]
        this.overlayCycle = 0
        this.overlayLoop = true
        this.unfreezable = true
        this.overlayHeight = 3
        this.overlayWidth = 3
        this.breakability = 5
        this.closed = true
        this.enemy = null
        this.flower = null
        this.poisonImmune = true
        this.attackPosition = structuredClone(this.position)
        this.lastTwoEnemyPositions = []
        this.overlayOffset = {
            x: -123,
            y: -97
        }
        this.playAnimationOnce("emerge")
    }

    onDeath () {
        if (!this.closed) {
            this.flower.open()
        }
        if (!this.barren) {
            this.checkDrop(new DragonFlowerSeed (this.position.x, this.position.y))
        }
    }

    open () {
        this.overlayOffset = {
            x: -123,
            y: -97
        }
        for (let i = 1; i <= 5; i++) {
            game.setTimer(() => {
                game.ctx.drawImage(game.images[`emperor-flower-retract/${6 - i}`],
                    (this.position.x - game.viewport.origin.x) * game.tileSize + this.overlayOffset.x,
                    (this.position.y - game.viewport.origin.y) * game.tileSize + this.overlayOffset.y
                )
            }, i)
        }
        game.setTimer(() => {
            this.closed = false
            this.sprite.changeVersion("open")
        }, 5)
    }

    close () {
        for (let i = 1; i <= 5; i++) {
            game.setTimer(() => {
                game.ctx.drawImage(game.images[`emperor-flower-retract/${i}`],
                    (this.position.x - game.viewport.origin.x) * game.tileSize + this.overlayOffset.x,
                    (this.position.y - game.viewport.origin.y) * game.tileSize + this.overlayOffset.y
                )
            }, i)
        }
        game.setTimer(() => {
            this.closed = true
            this.sprite.changeVersion("closed")
        }, 4)
    }

    update (age) {
        this.frameUpdate()
        if (this.closed) {
            this.overlayExists = false
            if (this.sprite.version !== "closed") {
                this.sprite.changeVersion("closed")
            }
        } else {
            this.overlayExists = true
            if (this.sprite.version !== "open") {
                this.sprite.changeVersion("open")
            }
        }
        if (!this.closed && age % 3 === 0) {
            if (
                !this.flower ||
                (this.flower && this.flower.activePod !== this)
            ) {
                this.close()
            }
        }
        if (age % (30 * 7) === 0) {
            const self = game.checkGrid(this.position.x, this.position.y)
            if (!self || !self.id || (self.id !== this.id)) {
                console.log("Removing pod.")
                this.die()
            }
        }
    }

    onCut (cutter) {
        if (!this.closed) {
            this.die()
        }
    }

    poisonSpray () {
        this.playOverlayAnimation(this.sprite, "poison-attack")
    }

    onHit (hitter) {
        this.onCut(hitter)
    }
}

game.constructors[EmperorFlowerPod.name] = EmperorFlowerPod
export { EmperorFlowerPod }