import { Entity } from './entity.js';
import { Sprite } from './sprite.js';

class Cauldron extends Entity {
    constructor (x, y) {
        super(x, y)
        this.sprite = makeCauldronSprite()
        this.sprite.version = "unlit"
        this.name = "cauldron"
        this.golemer = null
        this.pushability = 10
        this.overlayHeight = 2
        this.overlayOffset = {x: -2, y: -120}
        // this.breakability = 5
        // this.burnability = 20
        this.immobile = true
    }

    smoke () {
        this.playOverlayAnimation(this.sprite, "smoke")
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
                        if (item && item.name === this.golemer.request.name) {
                            this.smoke()
                            game.player.removeFromInventory(item)
                            game.player.equipped = null
                            this.golemer.giveReward()
                            this.interaction = null
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

    cauldronSprite.addAnimatedVersion("smoke", [
        "cauldron-smoke/1",
        "cauldron-smoke/2",
        "cauldron-smoke/3",
        "cauldron-smoke/4",
        "cauldron-smoke/5",
        "cauldron-smoke/6",
        "cauldron-smoke/7",
        "cauldron-smoke/8",
        "cauldron-smoke/9",
        "cauldron-smoke/10",
        "cauldron-smoke/11",
        "cauldron-smoke/12",
        "cauldron-smoke/13",
        "cauldron-smoke/14",
        "cauldron-smoke/15",
        "cauldron-smoke/16",
        "cauldron-smoke/17",
        "cauldron-smoke/18",
        "cauldron-smoke/19",
        "cauldron-smoke/20",
        "cauldron-smoke/21",
        "cauldron-smoke/22",
        "cauldron-smoke/23",
        "cauldron-smoke/24",
        "cauldron-smoke/25",
        "cauldron-smoke/26",
        "cauldron-smoke/27",
        "cauldron-smoke/28",
        "cauldron-smoke/29",
        "cauldron-smoke/30",
        "cauldron-smoke/31",
        "cauldron-smoke/32",
        "cauldron-smoke/33",
        "cauldron-smoke/34",
        "cauldron-smoke/35",
        "cauldron-smoke/36",
        "cauldron-smoke/37",
        "cauldron-smoke/38",
        "cauldron-smoke/39",
        "cauldron-smoke/40",
        "cauldron-smoke/41",
        "cauldron-smoke/42",
        "cauldron-smoke/43",
        "cauldron-smoke/44",
        "cauldron-smoke/45",
        "cauldron-smoke/46",
        "cauldron-smoke/47",
        "cauldron-smoke/48",
        "cauldron-smoke/49",
        "cauldron-smoke/50",
        "cauldron-smoke/51",
        "cauldron-smoke/52",
        "cauldron-smoke/53",
        "cauldron-smoke/54",
        "cauldron-smoke/55",
        "cauldron-smoke/56",
        "cauldron-smoke/57",
        "cauldron-smoke/58",
    ])

    return cauldronSprite
}

game.constructors[Cauldron.name] = Cauldron
export { Cauldron }