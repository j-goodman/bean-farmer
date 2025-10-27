import { Fire } from "./fire.js"
import { utils } from "./utils.js"

const fireballSpell = (user, position) => {
    if (!user || !position) {
        return false
    }
    utils.drawSmoke({x: user.position.x, y: user.position.y - 1}, 26)
    game.setTimer(() => {
        utils.drawSmoke(user.position, 14)
    }, 13)
    if (user.jump) {
        user.jump()
    }
    game.setTimer(() => {
        new Fire (position.x, position.y, "air")
        for (let x = -3; x <= 3; x++) {
            for (let y = -3; y <= 3; y++) {
                const distance = utils.distanceBetweenSquares({x: 0, y: 0}, {x: x, y: y})
                if (distance < 2.75) {
                    game.setTimer(() => {
                        const coord = {x: x, y: y};
                        new Fire (position.x + coord.x, position.y + coord.y, "air")
                    }, (Math.round(distance) * 5) + utils.dice(15))
                }
            }    
        }
    }, 19)
}

export { fireballSpell }