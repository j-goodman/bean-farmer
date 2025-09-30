import { itemScreen } from "./itemScreen.js"
import { wizardScreen } from "./wizardScreen.js"
import { worldMap } from "./worldMap.js"

const setUpGameControls = () => {
    const controls = {}
    controls.left = 0
    controls.right = 0
    controls.up = 0
    controls.down = 0

    window.addEventListener("keydown", event => {
        if (event.key === "d" || event.key === "D") {
            controls.right += 1
        }
        if (event.key === "a" || event.key === "A") {
            controls.left += 1
        }
        if (event.key === "s" || event.key === "S") {
            controls.down += 1
        }
        if (event.key === "w" || event.key === "W") {
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
        if (event.key === "d" || event.key === "D") {
            controls.right = 0
        }
        if (event.key === "a" || event.key === "A") {
            controls.left = 0
        }
        if (event.key === "s" || event.key === "S") {
            controls.down = 0
        }
        if (event.key === "w" || event.key === "W") {
            controls.up = 0
        }
        if (event.key === "f" || event.key === "F") {
            controls.action = 0
        }
    });
    
    return controls
}

export { setUpGameControls }