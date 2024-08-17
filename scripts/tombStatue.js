import { Entity } from './entity.js';
import { SnowGolem } from './snowGolem.js';
import { Sprite } from './sprite.js';
import { utils } from './utils.js';

class TombStatue extends Entity {
    constructor(x, y) {
        super(x, y)
        this.name = "tomb statue"
        this.sprite = new Sprite ("tomb-statue/inert")
        this.immobile = true
        this.sightDistance = 8
        this.sprite.addVersion("damage-0", "tomb-statue/eye-light/13")
        this.sprite.addVersion("damage-1", "tomb-statue/damage-1")
        this.sprite.addVersion("damage-2", "tomb-statue/damage-2")
        this.sprite.addTransition("inert", "damage-0", [
            "tomb-statue/eye-light/1",
            "tomb-statue/eye-light/2",
            "tomb-statue/eye-light/3",
            "tomb-statue/eye-light/4",
            "tomb-statue/eye-light/5",
            "tomb-statue/eye-light/6",
            "tomb-statue/eye-light/7",
            "tomb-statue/eye-light/8",
            "tomb-statue/eye-light/9",
            "tomb-statue/eye-light/10",
            "tomb-statue/eye-light/11",
            "tomb-statue/eye-light/12",
            "tomb-statue/eye-light/13"
        ])
        this.sprite.changeVersion("inert")
        this.breakability = 5
        this.damage = 0
        this.active = false
        this.activationTime = false
        this.hitCooldown = 0
    }

    onBreak () {
        if (this.hitCooldown > 0) {
            return false
        } else {
            this.hitCooldown = 30
        }

        if (this.damage >= 2) {
            this.die()
        } else if (this.damage >= 0) {
            this.damage += 1
            this.sprite.changeVersion(`damage-${this.damage}`)
        }
    }
    
    summonGolems () {
        let golems = [
            new SnowGolem (this.position.x + 1, this.position.y + 0),
            new SnowGolem (this.position.x - 1, this.position.y + 0),
            new SnowGolem (this.position.x + 0, this.position.y + 1),
            new SnowGolem (this.position.x + 0, this.position.y - 1),
            new SnowGolem (this.position.x + 0, this.position.y + 4),
            new SnowGolem (this.position.x + 0, this.position.y - 3)
        ]
        golems.forEach(golem => {
            golem.target = this.target
        })
    }

    check () {
        let scope = {x: this.position.x, y: this.position.y}
        const coords = {x: 0, y: 1}
                
        for (let i = 0; i < this.sightDistance; i++) {
            scope.x += coords.x
            scope.y += coords.y
            const entity = game.checkGrid(scope.x, scope.y)
            if (entity && entity.name !== this.name && (entity.animal || entity.plant)) {
                return entity
            } else if (entity && !entity.pickupable) {
                return false
            }
        }
    }

    update (age) {
        if (this.hitCooldown > 0) {
            this.hitCooldown -= 1
        }
        
        const checked = this.check()

        if (age % (6) === 0) {
            if (!this.active && checked) {
                this.target = checked
                this.active = true
                this.activationTime = game.time
                this.summonGolems()
                if (this.damage >= 0 && this.damage <= 2) {
                    this.sprite.changeVersion(`damage-${this.damage}`)
                }
            }
        }
        
        if (age % (30 * 15) === 0) {
            if (this.active && game.time - this.activationTime > 250) {
                if (this.damage > 0) {
                    this.damage -= 1
                    if (this.damage >= 0 && this.damage <= 2) {
                        this.sprite.changeVersion(`damage-${this.damage}`)
                    }
                } else {
                    this.active = false
                    this.sprite.changeVersion(`inert`)
                }
            }
        }
    }
}

game.constructors[TombStatue.name] = TombStatue
export { TombStatue }