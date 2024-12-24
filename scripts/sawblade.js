import { Entity } from './entity.js';
import { SawbladeTrack } from './sawbladeTrack.js';
import { Sprite } from './sprite.js';
import { utils } from './utils.js';

class Sawblade extends Entity {
    constructor(x, y) {
        super(x, y)
        this.sprite = makeSawbladeSprite()
        this.name = "sawblade"
        this.moveDelay = 5
        new SawbladeTrack (
            this.position.x,
            this.position.y,
            "ground"
        )
        this.strength = 9
        this.direction = {x: 1, y: 0}
    }

    update (age) {
        this.frameUpdate()

        
        if (age % 20 === 0) {
            this.playAnimationOnce("spin")
        }
        
        if (age < 120) {
            return false
        }

        if (age % this.moveDelay === 0) {
            let obstacle = game.checkGrid(this.position.x + this.direction.x, this.position.y + this.direction.y)
            if (obstacle) {
                if (obstacle.onCut) {
                    obstacle.onCut()
                    if (utils.dice(6) === 6) {
                        this.direction.x *= -1
                    }
                } else if (obstacle.pickupable) { 
                    const success = obstacle.move(0, this.direction.x)
                    if (!success) {
                        this.push(obstacle, this.direction.x, this.direction.y)
                        this.direction.x *= -1
                    }
                } else if (!(obstacle.pushability && obstacle.pushability < 5 && utils.dice(3) === 3)) {
                    this.direction.x *= -1
                } else {
                    const success = this.push(obstacle, this.direction.x, this.direction.y)
                    this.direction.x *= -1
                }
            }
            this.move(this.direction.x, this.direction.y)
        }
    }

    onTouch (subject) {
        if (game.time % 6 === 0 && subject && subject.onCut) {
            subject.onCut()
        }
    }
}

const makeSawbladeSprite = () => {
    const sawbladeSprite = new Sprite ("sawblade/1")

    sawbladeSprite.addAnimatedVersion("spin", [
        "sawblade/1", "sawblade/2", "sawblade/3", "sawblade/4", "sawblade/5",
        "sawblade/6", "sawblade/7", "sawblade/8", "sawblade/9", "sawblade/10",
        "sawblade/11", "sawblade/12", "sawblade/13", "sawblade/14", "sawblade/15",
        "sawblade/16", "sawblade/17", "sawblade/18", "sawblade/19", "sawblade/20",
    ])

    return sawbladeSprite
}

game.constructors[Sawblade.name] = Sawblade
export { Sawblade }