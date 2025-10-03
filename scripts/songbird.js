import { Entity } from './entity.js';
import { Sprite } from './sprite.js';

import { game } from './game.js';
import { utils } from './utils.js';

class Songbird extends Entity {
    constructor(x, y) {
        super(x, y)
        this.imageName = "chicken/3"
        this.baseMoveDelay = 5
        this.name = "songbird"
        this.moveDelay = this.baseMoveDelay
        this.baseStrength = 1
        this.strength = this.baseStrength
        this.pushability = 2
        this.sprite = this.makeSongbirdSprite()
        this.direction = "right"
        this.sprite.version = 3
        this.facing = 3
        this.clockDirections = true
        this.animal = true
        this.health = 9
        this.burnability = 3
        this.stomach = []
        this.birthday -= utils.dice(150)
        this.eggs = 3 + utils.dice(3)
    }

    makeSongbirdSprite () {
        const chickenSprite = new Sprite ("chicken/3")
        chickenSprite.addClockVersions("chicken")

        chickenSprite.addAnimatedVersion("flap/3", [
            "chicken/flap/3/1",
            "chicken/flap/3/2",
            "chicken/flap/3/3",
            "chicken/flap/3/3",
            "chicken/flap/3/3",
            "chicken/flap/3/2",
            "chicken/flap/3/1",
        ])
        chickenSprite.addAnimatedVersion("flap/6", [
            "chicken/flap/6/1",
            "chicken/flap/6/2",
            "chicken/flap/6/3",
            "chicken/flap/6/3",
            "chicken/flap/6/3",
            "chicken/flap/6/2",
            "chicken/flap/6/1",
        ])
        chickenSprite.addAnimatedVersion("flap/9", [
            "chicken/flap/9/1",
            "chicken/flap/9/2",
            "chicken/flap/9/3",
            "chicken/flap/9/3",
            "chicken/flap/9/3",
            "chicken/flap/9/2",
            "chicken/flap/9/1",
        ])
        chickenSprite.addAnimatedVersion("flap/12", [
            "chicken/flap/12/1",
            "chicken/flap/12/2",
            "chicken/flap/12/3",
            "chicken/flap/12/3",
            "chicken/flap/12/3",
            "chicken/flap/12/3",
            "chicken/flap/12/2",
            "chicken/flap/12/1",
        ])
        chickenSprite.addAnimatedVersion("peck/3", [
            "chicken/peck/3/1",
            "chicken/peck/3/2",
            "chicken/peck/3/3",
            "chicken/peck/3/4",
            "chicken/peck/3/4",
            "chicken/peck/3/4",
            "chicken/peck/3/4",
            "chicken/peck/3/4",
            "chicken/peck/3/4",
            "chicken/peck/3/3",
            "chicken/peck/3/2",
            "chicken/peck/3/1",
        ])
        chickenSprite.addAnimatedVersion("peck/6", [
            "chicken/peck/6/1",
            "chicken/peck/6/2",
            "chicken/peck/6/3",
            "chicken/peck/6/3",
            "chicken/peck/6/3",
            "chicken/peck/6/3",
            "chicken/peck/6/3",
            "chicken/peck/6/3",
            "chicken/peck/6/2",
            "chicken/peck/6/1",
        ])
        chickenSprite.addAnimatedVersion("peck/9", [
            "chicken/peck/9/1",
            "chicken/peck/9/2",
            "chicken/peck/9/3",
            "chicken/peck/9/4",
            "chicken/peck/9/4",
            "chicken/peck/9/4",
            "chicken/peck/9/4",
            "chicken/peck/9/4",
            "chicken/peck/9/4",
            "chicken/peck/9/3",
            "chicken/peck/9/2",
            "chicken/peck/9/1",
        ])
        chickenSprite.addAnimatedVersion("peck/12", [
            "chicken/peck/12/1",
            "chicken/peck/12/2",
            "chicken/peck/12/3",
            "chicken/peck/12/3",
            "chicken/peck/12/3",
            "chicken/peck/12/3",
            "chicken/peck/12/3",
            "chicken/peck/12/3",
            "chicken/peck/12/3",
            "chicken/peck/12/2",
            "chicken/peck/12/1",
        ])

        return chickenSprite
    }

    flap () {
        this.playAnimationOnce(`flap/${this.facing}`)
        game.setTimer(() => {
            this.jump()
        }, 4)
        game.setTimer(() => {
            this.playAnimationOnce(`flap/${this.facing}`)
        }, 11)

    }

    jump () {
        let jumpNums = []
        const roll = utils.dice(6)
        if (roll > 4) {
            jumpNums = [
                0, -4, -7, -9, -10, -12, -11, -9, -7, -3, 0,
                0, 0, 0, 0, -3, -5, -6, -7, -6, -5, -3, 0,
            ]
        } else if (roll > 2) {
            jumpNums = [
                0, -3, -5, -6, -7, -6, -5, -3, 0,
                0, 0, 0, 0, -4, -7, -9, -10, -12, -12, -11, -9, -7, -5, -3, 0,
            ]
        } else {
            jumpNums = [
                0, 0, 0, 0, -3, -5, -6, -7, -6, -5, -3, 0,
                0, 0, 0, 0, -2, -4, -5, -5, -4, -2, -0, 0,
                0, 0, 0, 0, -3, -5, -6, -7, -6, -5, -3, 0,
            ]
            game.setTimer(() => {
                this.playAnimationOnce(`flap/${this.facing}`)
            }, 21)
        }
        for (let i = 0; i < jumpNums.length; i++) {
            game.setTimer(() => {
                this.spriteOffset.y = jumpNums[i] / 20
            }, i)
        }
    }

    onCut () {
        this.flap()
    }

    onHit () {
        this.flap()
    }
    
    burn () {
        this.flap()
    }

    onMove () {
        this.flap()
    }

    turn (numDirection) {
        this.facing = numDirection
        this.sprite.changeVersion(numDirection)
    }

    update (age) {
        this.frameUpdate()
        const posX = this.position.x
        const posY = this.position.y

        let moveDirection = {x: 0, y: 0}
        if (this.position.x > game.player.position.x) {
            moveDirection.x = 1
        } else if (this.position.x < game.player.position.x) {
            moveDirection.x = -1
        }
        if (this.position.y > game.player.position.y) {
            moveDirection.y = 1
        } else if (this.position.y < game.player.position.y) {
            moveDirection.y = -1
        }
        const success = this.move(moveDirection.x, moveDirection.y)
        if (success) {
            this.facing = utils.directionFromCoordinates(moveDirection.x, moveDirection.y)
            this.turn(this.facing)
        // } else {
            // console.log("Collided.")
        }
    }
}

game.constructors[Songbird.name] = Songbird
export { Songbird }