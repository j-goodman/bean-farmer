import { Entity } from './entity.js';
import { Sprite } from './sprite.js';

class LockedDoor extends Entity {
    constructor(x, y, elevation=null, unlocked=false) {
        super(x, y, elevation)
        this.sprite = makeLockedDoorSprite()
        this.name = "brick"
        this.elevation = elevation
        this.locked = true
        this.lockable = true
        if (unlocked) {
            this.sprite.version = "unlocked"
            this.locked = false
        } else {
            this.sprite.version = "locked"
        }
        this.pushability = 10
        this.breakability = 6
        this.immobile = true
    }

    unlock () {
        let groundOccupant = game.checkGrid(this.position.x, this.position.y, true).groundOccupant
        if (groundOccupant) {
            groundOccupant.die()
        }
        let newDoor = new LockedDoor (this.position.x, this.position.y, "ground")
        game.setTimer(() => {
            this.die()
        }, 0)
        newDoor.locked = false
        newDoor.sprite.changeVersion("unlocked")
        game.setTimer(() => {
            newDoor.sprite.overlay = "locked-door/overlay"
        }, 7)
    }
    
    lock () {
        let newDoor = new LockedDoor (this.position.x, this.position.y, null, true)
        game.setTimer(() => {
            newDoor.sprite.changeVersion("locked")
            newDoor.locked = true
            game.checkGrid(this.position.x, this.position.y, true).groundOccupant.die()
        }, 0)
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