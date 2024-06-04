import { Entity } from './entity.js';
import { Sprite } from './sprite.js';
import { Wood } from './wood.js';

import { utils } from './utils.js'

class Golemer extends Entity {
    constructor(x, y) {
        super(x, y)
        this.sprite = makeGolemerSprite()
        this.name = "golemer"
        this.baseMoveDelay = 17
        this.moveDelay = this.baseMoveDelay
        this.animal = true
        game.golemer = this
        this.spawnPosition = {x: x, y: y}

        this.pushability = 10
        this.text = "Ahoj, blobb."
        this.dialogueQueue = [
            "Welcome, slime golem. I created you to go into the caves and fetch me mushrooms.",
            "I'm too old to go into the caves anymore, it's dangerous.",
            "Go, and leave me to my business. The caves are that way, to the left. You'll see a sign that I left for you.",
            "Go, and leave me to my business.",
            "Go, and leave me to my business. The caves are that way, to the left. You'll see a sign that I left for you.",
            "Go, and leave me to my business.",
        ]
        this.dialogueIndex = 0
        this.walkToWork()
    }
    
    // interaction () {
        //     this.talk()
    // }
        
    walkToWork () {
        setTimeout(() => {
            this.walkTo({x: 11, y: 21}, () => {
                this.facing = "right"
                this.sprite.changeVersion(this.facing)
            })
        }, 1200 + utils.dice(400))
    }

    talk () {
        game.ctx.drawImage(game.images["sign-text-background"], 0, 0, game.canvas.width, game.canvas.height)
        game.pause()
        this.text = this.dialogueQueue[this.dialogueIndex]
        this.dialogueIndex += 1
        if (this.dialogueIndex >= this.dialogueQueue.length) {
            this.dialogueIndex = 0
        }
        game.controls.closeModal = () => {
            this.close()
            game.controls.closeModal = false
        }
        game.ctx.fillStyle = "#73461b"
        game.ctx.font = "80px Atkinson Hyperlegible"
        const textLines = utils.addLineBreaks(this.text)
        game.ctx.textAlign = "left"
        textLines.forEach((line, i) => {
            game.ctx.fillText(line, 360, 400 + 100 * i)
        })
    }

    close () {
        game.play()
    }
}

const makeGolemerSprite = () => {
    const golemerSprite = new Sprite ("golemer-right")
    golemerSprite.addVersion("up", "golemer-up")
    golemerSprite.addVersion("right", "golemer-right")
    golemerSprite.addVersion("down", "golemer-down")
    golemerSprite.addVersion("left", "golemer-left")

    return golemerSprite
}


export { Golemer }