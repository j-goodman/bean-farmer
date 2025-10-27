import { Sprite } from './sprite.js';
import { utils } from './utils.js';

const makeSkeletonSprite = () => {
    const sprite = new Sprite ("skeleton/legs/down/middle");

    ["arms", "legs"].forEach(bodyPart => {
        ["down", "down-right", "right", "up-right", "up", "up-left", "left", "down-left"].forEach(direction => {
            ["left-leg", "right-leg", "middle"].forEach(position => {
                sprite.addVersion(`skeleton/${bodyPart}/${direction}/${position}`, `skeleton/${bodyPart}/${direction}/${position}`)
            })
        })
    })

    sprite.looseness = 1

    sprite.addAnimatedVersion("rise", [
        "skeleton/bone-drop/2",
        "skeleton/bone-drop/2",
        "skeleton/bone-drop/1",
        "skeleton/bone-drop/2",
        "skeleton/bone-drop/3",
        "skeleton/bone-drop/4",
        "skeleton/bone-drop/5",
        "skeleton/bone-drop/6",
        "skeleton/bone-drop/7",
        "skeleton/bone-drop/8",
        "skeleton/bone-drop/9",
        "skeleton/bone-drop/10",
        "skeleton/rise/1",
        "skeleton/rise/1",
        "skeleton/rise/1",
        "skeleton/rise/1",
        "skeleton/rise/1",
        "skeleton/rise/1",
        "skeleton/rise/1",
        "skeleton/rise/1",
        "skeleton/rise/2",
        "skeleton/rise/3",
        "skeleton/rise/4",
        "skeleton/rise/5",
        "skeleton/rise/4",
        "skeleton/rise/3",
        "skeleton/rise/2",
        "skeleton/rise/1",
        "skeleton/rise/2",
        "skeleton/rise/4",
        "skeleton/rise/6",
        "skeleton/rise/7",
        "skeleton/rise/8",
        "skeleton/rise/9",
        "skeleton/rise/10",
        "skeleton/rise/11",
        "skeleton/rise/12",
        "skeleton/rise/13",
        "skeleton/rise/14",
        "skeleton/rise/15",
        "skeleton/rise/16",
        "skeleton/rise/17",
        "skeleton/rise/18",
        "skeleton/rise/19",
        "skeleton/rise/20",
        "skeleton/rise/21",
        "skeleton/rise/22",
        "skeleton/rise/23",
        "skeleton/rise/24",
        "skeleton/rise/25",
        "skeleton/rise/26",
        "skeleton/rise/27",
    ])

    sprite.spriteUpdate = player => {
        if (player.sprite.version === "rise") {
            return false
        }
        if (player.walking) {
            if (game.time % Math.ceil(player.moveDelay / 2) === 0) {
                player.walkPosition += 1
                if (player.walkPosition > 3) {
                    player.walkPosition -= 4
                }
            }
            const walkPosition = ["middle", "left-leg", "middle", "right-leg"][player.walkPosition]
            const newSprite = `skeleton/legs/${player.walkDirection}/${walkPosition}`
            player.sprite.version = newSprite
            player.sprite.image = newSprite
        } else {
            const newSprite = `skeleton/legs/${player.walkDirection}/middle`
            player.sprite.version = newSprite
            player.sprite.image = newSprite
        }
        if (player.sprite.looseness > 0) {
            player.sprite.looseness /= (1.1)
        }
        if (player.sprite.looseness < .1) {
            player.sprite.looseness = 0
        }
        switch (player.walkDirection) {
            case "up":
                player.targetHeadPosition = 12
                break;
            case "up-right":
                player.targetHeadPosition = 2
                break;
            case "right":
                player.targetHeadPosition = 3
                break;
            case "down-right":
                player.targetHeadPosition = 4
                break;
            case "down":
                player.targetHeadPosition = 6
                break;
            case "down-left":
                player.targetHeadPosition = 8
                break;
            case "left":
                player.targetHeadPosition = 9
                break;
            case "up-left":
                player.targetHeadPosition = 10
                break;
        }
        if (
            Math.abs(player.targetHeadPosition - player.headPosition) >
            Math.abs((player.targetHeadPosition + 12) - player.headPosition)
        ) {
            player.targetHeadPosition += 12
        }
        if (player.headPosition < player.targetHeadPosition) {
            player.headTorque += .25
        } else if (player.headPosition > player.targetHeadPosition) {
            player.headTorque -= .25
        } else {
            if (player.headTorque < 0) { player.headTorque += .25 }
            if (player.headTorque > 0) { player.headTorque -= .25 }
        }
        if (player.headTorque > 1) { player.headTorque = 1 }
        if (player.headTorque < -1) { player.headTorque = -1 }
        if (utils.dice(4) === 4) {
            if (player.headTorque > .25) { player.headTorque -= .25 }
            if (player.headTorque < -.25) { player.headTorque += .25 }
        }
        if (game.time % Math.ceil((1.25 - Math.abs(player.headTorque)) * 4) === 0) {
            if (player.headTorque > 0) { player.headPosition += 1 }
            if (player.headTorque < 0) { player.headPosition -= 1 }
        }
        while (player.headPosition > 12) {
            player.headPosition -= 12
        }
        while (player.headPosition < 1) {
            player.headPosition += 12
        }
    }

    sprite.drawExtended = player => {
        if (player.sprite.version === "rise") {
            return false
        }
        let walkPosition = ["middle", "left-leg", "middle", "right-leg"][player.walkPosition]
        if (!player.walking) {
            walkPosition = "middle"
        }
        const armsImageName = `skeleton/arms/${player.walkDirection}/${walkPosition}`
        const drawArms = () => {
            game.ctx.drawImage(
                game.images[`${armsImageName}`],
                (player.spritePosition.x - game.viewport.origin.x) * game.tileSize + player.spriteOffset.x,
                (player.spritePosition.y - game.viewport.origin.y) * game.tileSize + player.spriteOffset.y - player.sprite.looseness
            )
        }
        if (player.headPosition > 2 && player.headPosition < 10) {
            drawArms()
        }
        const skullImageName = `skeleton/skull/${player.headPosition}`
        try {
            game.ctx.drawImage(game.images[`${skullImageName}`],
                (player.spritePosition.x - game.viewport.origin.x) * game.tileSize + player.spriteOffset.x + (player.walkDirection === "left" ? -4 : 0) + (player.walkDirection === "right" ? 4 : 0),
                (player.spritePosition.y - game.viewport.origin.y) * game.tileSize + player.spriteOffset.y - (player.sprite.looseness * 2) - 7
            )
        } catch {
            console.log(skullImageName)
        }
        if (!(player.headPosition > 2 && player.headPosition < 10)) {
            drawArms()
        }
    }

    sprite.playHurt = target => {
        const volume = 4 + utils.dice(8)
        target.headTorque += utils.dice(2) === 2 ? 1 : -1
        target.targetHeadPosition += 6
        for (let i = 0; i < volume; i++) {
            game.setTimer(() => {
                target.sprite.looseness += ((volume - i) * 2)
            }, i)
        }
    }

    return sprite
}

export { makeSkeletonSprite }