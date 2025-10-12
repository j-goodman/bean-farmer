import { Entity } from './entity.js';
import { Sprite } from './sprite.js';

class LockedDoor extends Entity {
    constructor(x, y, elevation=null, unlocked=false) {
        super(x, y, elevation)
        this.sprite = makeLockedDoorSprite()
        this.name = "brick"
        this.lockedDoor = true
        this.elevation = elevation
        this.locked = true
        this.lockable = true
        if (unlocked) {
            this.sprite.version = "unlocked"
            this.locked = false
        } else {
            this.sprite.version = "locked"
        }
        game.setTimer(() => {
            this.connectNeighbors()
        }, 1)
        this.pushability = 10
        this.breakability = 7
        this.immobile = true
    }

    unlock () {
        let groundOccupant = game.checkGrid(this.position.x, this.position.y, true).groundOccupant
        if (groundOccupant) {
            groundOccupant.die()
        }
        this.sprite.changeVersion("unlocked")
        game.setTimer(() => {
            this.moveToGround()
            this.locked = false
            this.sprite.overlay = "locked-door/overlay"
        }, 7)
    }
    
    lock () {
        this.moveFromGround()
        game.setTimer(() => {
            this.sprite.changeVersion("locked")
            this.sprite.overlay = null
            this.locked = true
        }, 0)
    }

    setVariant (owner) {
        this.owner = owner
    }
}

const makeLockedDoorSprite = () => {
    const lockedDoorSprite = new Sprite ("locked-door/4")
    lockedDoorSprite.addVersion("unlocked", "locked-door/1")
    lockedDoorSprite.addVersion("locked", "locked-door/4")
    lockedDoorSprite.addVersion("overlay", "locked-door/overlay")
    lockedDoorSprite.changeVersion("locked")

    lockedDoorSprite.addTransition("unlocked", "locked", [
        "locked-door/1",
        "locked-door/1",
        "locked-door/2",
        "locked-door/3",
        "locked-door/4",
        "locked-door/4",
    ])

    return lockedDoorSprite
}

game.constructors[LockedDoor.name] = LockedDoor
export { LockedDoor }