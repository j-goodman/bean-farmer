import { Entity } from './entity.js';
import { Sprite } from './sprite.js';
import { utils } from './utils.js';

class EyeStatue extends Entity {
    constructor(x, y) {
        super(x, y)
        this.name = "eye statue"
        this.immobile = true
        this.sprite = new Sprite ("eye-statues/green/1")
        this.open = false
        this.birthday -= utils.dice(10)
    }

    update (age) {
        this.frameUpdate()

        if (age % 45 === 0) {
            this.checkForGems()
        }

        if (this.open && age % 90 === 0) {
            this.checkToOpenGates()
        }
    }

    setVariant (color) {
        this.color = color
        if (!["red", "green", "blue"].includes(color)) {
            return false
        }
        this.sprite = new Sprite (`eye-statues/${color}/1`)
        this.sprite.addVersion("shut", `eye-statues/${color}/1`)
        this.sprite.addVersion("open", `eye-statues/${color}/12`)
        this.seeking = {
            red: "ruby",
            green: "emerald",
            blue: "sapphire"
        }[color]

        this.sprite.addTransition("shut", "open", [
            `eye-statues/${color}/1`,
            `eye-statues/${color}/2`,
            `eye-statues/${color}/3`,
            `eye-statues/${color}/4`,
            `eye-statues/${color}/5`,
            `eye-statues/${color}/6`,
            `eye-statues/${color}/7`,
            `eye-statues/${color}/8`,
            `eye-statues/${color}/9`,
            `eye-statues/${color}/10`,
            `eye-statues/${color}/11`,
            `eye-statues/${color}/12`,
        ])
    }

    checkToOpenGates () {
        const searchRadius = 5
        const openEyes = []
        const gates = []
        let cursor = {x: this.position.x, y: this.position.y}
        cursor.x -= searchRadius
        cursor.y -= searchRadius
        for (let x = 0; x < searchRadius * 2; x++) {            
            for (let y = 0; y < searchRadius * 2; y++) {
                const entity = game.checkGrid(cursor.x, cursor.y)
                if (entity && entity.name === "gate block") {
                    gates.push(entity)
                }
                if (entity && entity.name === "eye statue" && entity.open) {
                    openEyes.push(entity.color)
                }
                cursor.y += 1
            }
            cursor.y = this.position.y - searchRadius
            cursor.x += 1
        }
        
        if (
            openEyes.includes("red") &&
            openEyes.includes("green") &&
            openEyes.includes("blue")
        ) {
            gates.forEach(gate => {
                game.setTimer(() => {
                    gate.open()
                }, utils.dice(90))
            })
        }
        
    }

    checkForGems () {
        let cursor = {x: this.position.x, y: this.position.y}
        let found = false
        for (let i = 0; i < 5; i++) {
            cursor.y += 1
            const entity = game.checkGrid(cursor.x, cursor.y)
            if (entity && (
                entity.name === this.seeking ||
                entity.equipped && entity.equipped.name === this.seeking
            )) {
                this.open = true
                found = true
                this.sprite.changeVersion("open")
            }
            if (entity && !entity.pickupable) {
                i = 5
            }
        }
        if (!found) {
            this.open = false
            this.sprite.changeVersion("shut")
        }
    }
}

game.constructors[EyeStatue.name] = EyeStatue
export { EyeStatue }