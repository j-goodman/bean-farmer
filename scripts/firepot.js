import { Entity } from './entity.js';
import { Sprite } from './sprite.js';
import { Fire } from './fire.js';
import { utils } from './utils.js';

class Firepot extends Entity {
    constructor (x, y) {
        super(x, y)
        this.imageName = "firepot-unlit"
        this.name = "firepot"
        this.sprite = makeFirepotSprite()
        this.overlayHeight = 2
        this.overlayOffset = {x: -2, y: -120}
        this.pushability = 1.5
        this.burnability = Infinity
        this.breakability = 7
        this.recharge = 0
        this.reset = true
        this.spawnPosition = {x: x, y: y}
        this.playOverlayAnimation(this.sprite, "firepot-fire", true)
        this.lit = true
        this.unlightIfNotInStartArea()
    }

    setVariant (lit) {
        if (lit) {
            this.burn()
        }
        if (lit === "blue") {
            this.sprite = new Sprite ("blue-firepot")
            this.sprite.addAnimatedVersion("blue-fire", [
                "blue-fire/1",
                "blue-fire/2",
                "blue-fire/3",
                "blue-fire/4",
                "blue-fire/5",
                "blue-fire/6",
                "blue-fire/7",
                "blue-fire/8",
                "blue-fire/9",
                "blue-fire/10",
                "blue-fire/11",
                "blue-fire/12",
            ])
            this.playOverlayAnimation(this.sprite, "blue-fire", true)
        }
    }

    burn () {
        this.lit = true
        this.overlayExists = true
        game.checkGrid(
            this.position.x,
            this.position.y,
            true
        ).airOccupant = null
        game.setTimer(() => {
            this.igniteSurroundings()
        }, 32)
    }

    onReset () {
        this.lit = true
        this.overlayExists = true
        this.unlightIfNotInStartArea()
    }

    unlightIfNotInStartArea () {
        if (
            !(this.spawnPosition.x > 0 &&
            this.spawnPosition.x < 16 &&
            this.spawnPosition.y > 0 &&
            this.spawnPosition.y < 20)
        ) {
            this.lit = false
            this.overlayExists = false
        }
    }

    onPush () {
        game.setTimer(() => {
            this.igniteSurroundings()
        }, 6)
    }

    igniteSurroundings () {
        const coords = [
            {x: 0, y: -1},
            {x: 1, y: 0},
            {x: 0, y: 1},
            {x: -1, y: 0}
        ]
        coords.forEach(coord => {
            let item = game.checkGrid(this.position.x + coord.x, this.position.y + coord.y)
            if (item && item.burnability && this.lit && item.name !== "player") {
                if (item.name !== "firepot") {
                    utils.drawSmoke(this.position, 16)
                    game.setTimer(() => {
                        utils.drawSmoke(item.position, 40)
                    }, 12)
                }
                new Fire (this.position.x + coord.x, this.position.y + coord.y, "air")
            }
        })
    }
}

const makeFirepotSprite = () => {
    const firepotSprite = new Sprite ("firepot-unlit")

    firepotSprite.addAnimatedVersion("firepot-fire", [
        "firepot-fire/1",
        "firepot-fire/2",
        "firepot-fire/3",
        "firepot-fire/4",
        "firepot-fire/5",
        "firepot-fire/6",
        "firepot-fire/7",
        "firepot-fire/8",
        "firepot-fire/9",
        "firepot-fire/10",
        "firepot-fire/11",
        "firepot-fire/12",
    ])

    return firepotSprite
}

game.constructors[Firepot.name] = Firepot
export { Firepot }