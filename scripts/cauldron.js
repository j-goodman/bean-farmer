import { Entity } from './entity.js';
import { Sprite } from './sprite.js';

class Cauldron extends Entity {
    constructor (x, y) {
        super(x, y)
        this.sprite = makeCauldronSprite()
        this.sprite.version = "unlit"
        this.name = "cauldron"
        this.golemer = null
        this.pushabiunlity = 10
        // this.breakability = 5
        // this.burnability = 20
        this.immobile = true
    }

    update (age) {
        if (game.time % 21 === 0) {
            let unlit = false;
            const coords = [
                {x: 1, y: 0},
                {x: -1, y: 0},
                {x: 0, y: 1},
                {x: 0, y: -1}
            ]

            coords.forEach(coord => {
                const neighbor = game.checkGrid(
                    this.position.x + coord.x,
                    this.position.y + coord.y,
                )
                if (neighbor && neighbor.name === "golemer") {
                    unlit = true
                    this.golemer = neighbor
                    this.sprite.changeVersion("lit")
                }
                if (
                    neighbor && neighbor.name === "player" &&
                    this.golemer && neighbor.equipped &&
                    this.golemer.position.x === this.golemer.workPosition.x &&
                    this.golemer.position.y === this.golemer.workPosition.y &&
                    neighbor.equipped.name === this.golemer.request.name
                ) {
                    this.interaction = () => {
                        const item = game.player.equipped
                        console.log("Ready...")
                        if (item && item.name === this.golemer.request.name) {
                            console.log("Success.")
                            console.log(this.golemer)
                            game.player.removeFromInventory(item)
                            game.player.equipped = null
                            this.golemer.giveReward()
                            this.interaction = null
                        } else {
                            console.log("Failed.")
                        }
                    }
                }
            })

            if (!unlit) {
                this.sprite.changeVersion("unlit")
            }
        }

    }
}

const makeCauldronSprite = () => {
    const cauldronSprite = new Sprite ("cauldron")
    cauldronSprite.addVersion("lit", "cauldron")
    cauldronSprite.addVersion("unlit", "cauldron")

    cauldronSprite.addTransition("lit", "unlit", [
        "cauldron",
    ])

    return cauldronSprite
}

export { Cauldron }