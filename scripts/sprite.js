import { game } from './game.js';

class Sprite {
    constructor (baseImage) {
        this.image = baseImage
        this.version = null
        this.versions = {}
        this.transitions = {}
        this.inTransition = false
        this.onAnimationFinish = null
        this.overlay = false
        this.frame = 0
    }

    addVersion (name, image) {
        this.versions[name] = image
    }

    addAnimatedVersion (name, images) {
        this.versions[name] = images
    }

    addTransition (from, to, images) {
        if ([from, to].sort()[0] === from) {
            // Forward order.
            this.transitions[`${from}-${to}`] = images
        } else {
            // Reversed order.
            this.transitions[`${to}-${from}`] = images.reverse()
        }
    }

    addURDLVersions (folder) {
        this.addVersion("URDL", `${folder}/URDL`)
        this.addVersion("RDL", `${folder}/RDL`)
        this.addVersion("UDL", `${folder}/UDL`)
        this.addVersion("URL", `${folder}/URL`)
        this.addVersion("URD", `${folder}/URD`)
        this.addVersion("DL", `${folder}/DL`)
        this.addVersion("RD", `${folder}/RD`)
        this.addVersion("RL", `${folder}/RL`)
        this.addVersion("UD", `${folder}/UD`)
        this.addVersion("UL", `${folder}/UL`)
        this.addVersion("UR", `${folder}/UR`)
        this.addVersion("U", `${folder}/U`)
        this.addVersion("R", `${folder}/R`)
        this.addVersion("D", `${folder}/D`)
        this.addVersion("L", `${folder}/L`)
        this.addVersion("X", `${folder}/X`)
    }

    changeVersion (name) {
        if (name === this.version || this.inTransition) {
            return true
        }
        let from = this.version
        let to = name
        let sorted = [to, from].sort()
        let reversed = to === sorted[0]
        let transition = this.transitions[`${sorted[0]}-${sorted[1]}`]
        let frameRateMultiplier = 1
        this.frame = 0
        if (transition) {
            this.inTransition = true
            transition = transition.slice()
            this.version = name
            if (reversed) {
                transition = transition.reverse()
            }
            this.image = transition[0]
            for (let i = 1; i < transition.length; i++) {
                game.setTimer(() => {
                    this.image = transition[i]
                }, i * frameRateMultiplier)
            }
            game.setTimer(() => {
                this.image = this.versions[this.version]
                this.inTransition = false
            }, transition.length * frameRateMultiplier)
        } else {
            this.version = name
            this.image = this.versions[this.version]
        }
        if (Array.isArray(this.versions[name])) {
            this.version = name
            this.inTransition = true
            game.setTimer(() => {
                this.inTransition = false
            }, this.versions[name].length * frameRateMultiplier)
            this.image = this.versions[name][this.frame]
        }
    }
}

export { Sprite }