import { Plant } from './plant.js';
import { DeathsHeadSeed } from './deathsHeadSeed.js';

import { game } from './game.js';
import { utils } from './utils.js';
import { Sprite } from './sprite.js';
import { PoisonCloud } from './poisonCloud.js';

class DeathsHead extends Plant {
    constructor(x, y) {
        super(x, y)
        this.baseMoveDelay = 18
        this.name = "deaths head"
        this.moveDelay = this.baseMoveDelay
        this.baseStrength = 5
        this.strength = this.baseStrength
        this.pushability = 10
        this.sprite = new Sprite (`deathshead/inflate/1`)
        this.sprite.addVersion("deflated", `deathshead/inflate/1`)
        this.sprite.version = "deflated"
        this.sprite.addVersion("inflated", `deathshead/inflate/13`)
        this.sprite.addVersion("ready", `deathshead/burst/8`)
        this.poisonImmune = true
        this.sprite.addTransition("deflated", "inflated", [
            "deathshead/inflate/1",
            "deathshead/inflate/2",
            "deathshead/inflate/3",
            "deathshead/inflate/4",
            "deathshead/inflate/5",
            "deathshead/inflate/6",
            "deathshead/inflate/7",
            "deathshead/inflate/8",
            "deathshead/inflate/9",
            "deathshead/inflate/10",
            "deathshead/inflate/11",
            "deathshead/inflate/12",
            "deathshead/inflate/13",
        ])
        this.sprite.addTransition("inflated", "ready", [
            "deathshead/burst/1",
            "deathshead/burst/2",
            "deathshead/burst/3",
            "deathshead/burst/4",
            "deathshead/burst/5",
            "deathshead/burst/6",
            "deathshead/burst/7",
            "deathshead/burst/8",
        ])
        this.sprite.addAnimatedVersion("burst", [
            "deathshead/burst/8",
            "deathshead/burst/9",
            "deathshead/burst/10",
            "deathshead/burst/11",
            "deathshead/burst/12",
            "deathshead/burst/13",
            "deathshead/burst/14",
            "deathshead/burst/15",
            "deathshead/burst/16",
            "deathshead/burst/17",
            "deathshead/burst/18",
        ])
        this.attackCooldown = 0
        this.birthday -= utils.dice(100)
        game.setTimer(() => {
            this.inflate()
        }, 30 * utils.dice(6))
    }

    update (age) {
        this.frameUpdate()
        if (age % 9 === 0) {
            if (this.inflated) {
                this.checkSurroundings()
            }
        }
    }

    checkSurroundings () {
        const searchRadius = 6
        const targets = []
        const targetHash = {}

        let cursor = {x: this.position.x, y: this.position.y}
        cursor.x -= searchRadius
        cursor.y -= searchRadius
        for (let x = 0; x < searchRadius * 2; x++) {
            for (let y = 0; y < searchRadius * 2; y++) {
                let entity = game.checkGrid(cursor.x, cursor.y)
                if (entity && entity.animal && !targetHash[entity.id]) {
                    targets.push(entity)
                    targetHash[entity.id] = true
                }
                cursor.y += 1
            }
            cursor.y = this.position.y - searchRadius
            cursor.x += 1
        }

        let getReady = false
        let burst = false

        targets.forEach(target => {
            const distance = utils.distanceBetweenSquares(this.position, target.position)
            if (distance <= 4) {
                getReady = true
            }
            if (distance <= 2.5) {
                burst = true
            }
        })
        
        if (burst) {
            this.burst()
        } else if (getReady) {
            this.sprite.changeVersion("ready")
        } else {
            this.sprite.changeVersion("inflated")
        }
    }

    onCut (cutter) {
        this.die()
        if (cutter && cutter.name == "player") {
            game.givePoints(20, this)
        }
    }

    onHit () {
        if (this.inflated) {
            this.burst()
        }
    }

    inflate () {
        this.sprite.changeVersion("inflated")
        game.setTimer(() => {
            this.inflated = true
        }, 14)
    }

    burst () {
        this.inflated = false
        this.playAnimationOnce("burst", () => {
            this.sprite.changeVersion("deflated")
        })
        game.setTimer(() => {
            this.inflate()
        }, 30 * 7)
        
        const searchRadius = 5
        let cursor = {x: this.position.x, y: this.position.y}
        cursor.x -= searchRadius
        cursor.y -= searchRadius
        for (let x = 0; x < searchRadius * 2; x++) {
            cursor.y = this.position.y - searchRadius
            cursor.x += 1
            for (let y = 0; y < searchRadius * 2; y++) {
                const distance = utils.distanceBetweenSquares(this.position, {x: cursor.x, y: cursor.y})
                if (distance <= 3) {
                    const position = {x: cursor.x, y: cursor.y}
                    game.setTimer(() => {
                        new PoisonCloud (position.x, position.y, "air")
                    }, Math.floor(distance) * 12 + utils.dice(16))
                }
                cursor.y += 1
            }
        }
    }

    onDeath () {
        this.checkDrop(new DeathsHeadSeed (this.position.x, this.position.y))
        let coords = [
            {x: 1, y: 0},
            {x: -1, y: 0},
            {x: 0, y: 1},
            {x: 0, y: -1},
        ]
        coords.forEach(offset => {
            if (
                !game.checkGrid(this.position.x + offset.x, this.position.y + offset.y) &&
                utils.dice(5) !== 5
            ) {
                game.addToGrid(new DeathsHeadSeed (this.position.x + offset.x, this.position.y + offset.y))
            }
        })
    }
}

game.constructors[DeathsHead.name] = DeathsHead
export { DeathsHead }