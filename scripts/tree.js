import { Plant } from './plant.js';
import { Sprite } from './sprite.js';
import { Wood } from './wood.js';
import { Stump } from './stump.js';

import { utils } from './utils.js';
import { Pinecone } from './pinecone.js';
import { Birchpod } from './birchpod.js';

class Tree extends Plant {
    constructor(x, y, variant="pine") {
        super(x, y)
        this.sprite = makeTreeSprite()
        this.name = "tree"
        this.variant = variant
        this.pushability = 10
        this.breakability = 5
        this.burnability = 13
        this.immobile = true
        this.unfreezable = true
        this.overlayExists = true
        this.overlay = [`${this.variant}-tree`]
        this.maturityAge = 30 * 60 * 20
        this.maturityAge += utils.dice(30 * 60 * 4) - 1
        this.maturity = 0
        if (game.time < 25) {
            this.birthday -= utils.dice(30)
            if (utils.dice(7) > 3) {
                this.maturity = 3
            } else {
                this.maturity = 2
            }
            this.cleanse()
        }
        if (x === -20 && (y === 19 || y === 16)) {
            this.maturity = 3
        }
        this.setSprite()
        this.overlayCycle = 0
        this.overlayLoop = true
        this.overlayHeight = 4.5
        this.overlayWidth = 2.7
        this.overlayOffset = {
            x: -96,
            y: -422
        }
    }

    update (age) {
        if (this.maturity < 3) {
            if (age % 39 === 0 && !utils.isInViewport(this.position)) {
                if (age > Math.floor((this.maturityAge / 3) * (this.maturity + 1))) {
                    this.maturity += 1
                    this.cleanse()
                }
                this.setSprite()
            }
        }
    }

    cleanse () {
        for (let i = 0; i < 8; i++) {
            game.setTimer(() => {
                this.cleanSoil(utils.dice(8), "soilHealth", 1)
                this.cleanSoil(utils.dice(3) + utils.dice(3))
            }, i * (utils.dice(120)))
        }
        game.setTimer(9 * 60, () => {
            utils.smoothSoil(this.position, utils.dice(7))
        })
    }
    
    onCut (cutter) {
        this.cutter = cutter
        this.die()
    }

    burn () {
        this.cleanSoil(3, "soilHealth", 1)
        this.burnability -= 1
        if (this.burnability <= 0 && !this.burnedDown) {
            this.throwSparks()
            this.burnedDown = true
            game.setTimer(() => {
                this.die()
            }, (this.maturity > 2 ? 50 : 15) + utils.dice(20))
        }
    }

    setSprite () {
        if (!["pine", "birch"].includes(this.variant)) {
            console.log("Tree error.")
            return false
        }
        if (this.maturity >= 3) {
            this.sprite = this.variant === "birch" ? new Sprite (`birch-stump`) : new Sprite (`stump`)
            this.overlay = [`${this.variant}-tree`]
        } else if (this.maturity === 2) {
            this.sprite = new Sprite (`${this.variant}-sprout-square`)
            this.overlay = [`${this.variant}-sapling-mature`]
        } else if (this.maturity === 1) {
            this.sprite = new Sprite (`${this.variant}-sprout-square`)
            this.overlay = [`${this.variant}-sapling-young`]
        } else if (this.maturity <= 0) {
            this.sprite = new Sprite (`${this.variant}-sprout-square`)
            this.overlay = [`${this.variant}-sprout`]
        }
    }

    throwSparks () {
        let xOffset = 0
        let yOffset = 0
        let direction = "left"
        let erraticness = 200
        let size = 90
        if (this.maturity < 2) {
            size = 12
        } else if (this.maturity < 3) {
            size = 45
        }
        for (let i = 0; i < size; i++) {
            game.setTimer(() => {
                erraticness -= 2
                yOffset -= utils.dice(11)
                if (utils.dice(9) === 9) {
                    direction = direction === "right" ? "left" : "right"
                }
                xOffset += direction === "right" ? utils.dice(Math.ceil(size / 10)) : -utils.dice(Math.ceil(size / 10))
                if (utils.dice(size) > i) {
                    utils.drawSmoke({
                        x: this.position.x,
                        y: this.position.y
                    }, 100 - i, {
                        x: xOffset + utils.dice(erraticness) - Math.round(erraticness / 2),
                        y: yOffset
                    })
                }
            }, i)
        }
    }
    
    onDeath (cutter) {
        if (this.maturity > 1) {
            let stump = new Stump (this.position.x, this.position.y)
            this.checkDrop(stump)
            if (this.variant === "birch") {
                stump.variant = "birch"
                stump.sprite = this.sprite
            }
        }
        game.setTimer(() => {
            this.dropWood(this.cutter)
        }, 1)
        game.setTimer(() => {
            this.dropSeeds()
        }, 4)
    }

    dropSeeds (double=false) {
        const random = utils.dice(8)
        if (random === 1) {
            return false
        }
        if (this.variant === "pine") {
            const drop = new Pinecone (this.position.x, this.position.y)
            this.checkDrop(drop)
        } else if (this.variant === "birch") {
            const drop = new Birchpod (this.position.x, this.position.y)
            this.checkDrop(drop)
        }
        if (!double && this.maturity > 0 && random > 4) {
            game.setTimer(() => {
                this.dropSeeds(true)
            }, 8 + utils.dice(7))
        }
    }
    
    dropWood (cutter) {
        let height = this.maturity + 1
        let fallDirection = null
        if (cutter) {
            fallDirection = {
                x: this.position.x - cutter.position.x,
                y: this.position.y - cutter.position.y,
            }
        } else {
            fallDirection = [
                {x: 0, y: 1},
                {x: 0, y: -1},
                {x: 1, y: 0},
                {x: -1, y: 0},
            ][Math.floor(Math.random() * 4)]
        }
        const direction = utils.directionFromCoordinates(fallDirection.x, fallDirection.y)
        for (let distance = 1; distance <= height; distance++) {
            game.setTimer(() => {
                const offset = {x: fallDirection.x * distance, y: fallDirection.y * distance}
                const drop = new Wood (this.position.x + offset.x, this.position.y + offset.y)
                if (this.variant === "birch") {
                    drop.sprite = new Sprite ("birch-wood")
                }
                this.checkDrop(drop)
            }, (distance - 1) * 2)
        }
    }
    
    setVariant (name) {
        if (name === "birch") {
            this.variant = "birch"
            this.overlay = ["birch-tree"]
            this.sprite = new Sprite ("birch-stump")
        }
    }
}

const makeTreeSprite = () => {
    const stumpSprite = new Sprite ("stump")
    stumpSprite.addVersion("down", "stump")

    return stumpSprite
}

game.constructors[Tree.name] = Tree
export { Tree }