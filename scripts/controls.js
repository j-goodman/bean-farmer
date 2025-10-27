import { itemScreen } from "./itemScreen.js"
import { wizardScreen } from "./wizardScreen.js"
import { worldMap } from "./worldMap.js"

const setUpGameControls = () => {
    const controls = {}
    controls.left = 0
    controls.right = 0
    controls.up = 0
    controls.down = 0

    const setPlayerDirection = (controls) => {
        if (game.player) {
            if (controls.right > 0 && controls.down > 0) {
                game.player.walking = true
                game.player.walkDirection = "down-right"
            } else if (controls.left > 0 && controls.up > 0) {
                game.player.walking = true
                game.player.walkDirection = "up-left"
            } else if (controls.right > 0 && controls.up > 0) {
                game.player.walking = true
                game.player.walkDirection = "up-right"
            } else if (controls.left > 0 && controls.down > 0) {
                game.player.walking = true
                game.player.walkDirection = "down-left"
            } else if (controls.right > 0) {
                game.player.walking = true
                game.player.walkDirection = "right"
            } else if (controls.down > 0) {
                game.player.walking = true
                game.player.walkDirection = "down"
            } else if (controls.left > 0) {
                game.player.walking = true
                game.player.walkDirection = "left"
            } else if (controls.up > 0) {
                game.player.walking = true
                game.player.walkDirection = "up"
            } else {
                game.player.walking = false
            }
        }
    }

    window.addEventListener("keydown", event => {
        if (event.key === "d" || event.key === "D" || event.key === "ArrowRight") {
            controls.right += 1
        }
        if (event.key === "a" || event.key === "A" || event.key === "ArrowLeft") {
            controls.left += 1
        }
        if (event.key === "s" || event.key === "S" || event.key === "ArrowDown") {
            controls.down += 1
        }
        if (event.key === "w" || event.key === "W" || event.key === "ArrowUp") {
            controls.up += 1
        }
        if (event.key === "f" || event.key === "F") {
            controls.action += 1
            if (controls.closeModal) {
                controls.closeModal()
            }
            game.player.actionButton()
        }
        if (worldMap.isOpen) {
            worldMap.close()
        }

        setPlayerDirection(controls)

        if (game.display) {
            game.display.close()
        }
        
        if (
            event.key === "Enter" ||
            event.key === "i" ||
            event.key === "E" || 
            event.key === "e"
        ) {
            if (itemScreen.isOpen) {
                itemScreen.close()
            } else {
                itemScreen.open()
                game.tutorial.items.menu = 0
            }
            if (wizardScreen.isOpen) {
                wizardScreen.close()
                itemScreen.close()
            }
        }
        if (
            ["w", "a", "s", "d", "f", "W", "A", "S", "D", "F"].includes(event.key)
        ) {
            if (itemScreen.isOpen) {
                itemScreen.keyPress(event.key)
            } else if (wizardScreen.isOpen) {
                wizardScreen.keyPress(event.key)
            }
        }
    });

    controls.closeModal = false
    
    window.addEventListener("keyup", event => {
        if (event.key === "d" || event.key === "D" || event.key === "ArrowRight") {
            controls.right = 0
        }
        if (event.key === "a" || event.key === "A" || event.key === "ArrowLeft") {
            controls.left = 0
        }
        if (event.key === "s" || event.key === "S" || event.key === "ArrowDown") {
            controls.down = 0
        }
        if (event.key === "w" || event.key === "W" || event.key === "ArrowUp") {
            controls.up = 0
        }
        if (event.key === "f" || event.key === "F") {
            controls.action = 0
        }
        setPlayerDirection(controls)
    });
    
    return controls
}

export { setUpGameControls }