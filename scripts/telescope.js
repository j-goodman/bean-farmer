import { Item } from './item.js';
import { Sprite } from './sprite.js';

import { utils } from './utils.js';


class Telescope extends Item {
    constructor(x, y) {
        super(x, y)
        this.sprite = new Sprite ("telescope")
        this.name = "telescope"
        this.equippedOffsets = {
            up: {
                x: 40,
                y: -50,
                angle: 45
            },
            right: {
                x: 80,
                y: -6,
                angle: -30
            },
            down: {
                x: 45,
                y: 42,
                angle: -110
            },
            left: {
                x: -14 - 75,
                y: -6,
                angle: -30
            },
            swing: {
                x: 12,
                y: -40,
                angle: 70
            }
        }
    }

    use (user) {
        this.raise()
        if (this.raised) {
            const direction = utils.directionToCoordinates(user.direction)
            let speed = 3
            if (game.controls.action > 20) {
                speed = 2
            }
            game.viewport.manual = true
            game.viewport.newOrigin.x += direction.x * speed
            game.viewport.newOrigin.y += direction.y * speed
        } else {
            game.viewport.newOrigin = {
                x: Math.round(game.player.position.x / game.viewport.width) * game.viewport.width,
                y: Math.round(game.player.position.y / game.viewport.height) * game.viewport.height,
            }
        }
    }
    
    raise () {
        this.swinging = true
        this.raised = true
        this.checkForLower()
    }
    
    checkForLower () {
        game.setTimer(() => {
            if (game.controls.action <= 0) {
                this.lower()
            } else {
                this.checkForLower()
            }
        }, 10)
    }
    
    lower () {
        this.swinging = false
        this.raised = false
        game.viewport.manual = false
    }
}

game.constructors[Telescope.name] = Telescope
export { Telescope }