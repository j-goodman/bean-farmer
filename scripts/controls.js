import { itemScreen } from "./itemScreen.js"

const setUpGameControls = () => {
    const controls = {}
    controls.left = false
    controls.right = false
    controls.up = false
    controls.down = false

    window.addEventListener("keydown", event => {
        if (event.key === "d" || event.key === "D") {
            controls.right = true
        }
        if (event.key === "a" || event.key === "A") {
            controls.left = true
        }
        if (event.key === "s" || event.key === "S") {
            controls.down = true
        }
        if (event.key === "w" || event.key === "W") {
            controls.up = true
        }
        if (event.key === "f" || event.key === "F") {
            controls.action = true
            if (controls.closeModal) {
                controls.closeModal()
            }
            game.player.actionButton()
        }
        if (
            event.key === "Enter" ||
            event.key === "i" ||
            event.key === "e"
        ) {
            if (itemScreen.isOpen) {
                itemScreen.close()
            } else {
                itemScreen.open()
                game.tutorial.items.menu = 0
            }
        }
        if (
            itemScreen.isOpen &&
            ["w", "a", "s", "d", "f"].includes(event.key)
        ) {
            itemScreen.keyPress(event.key)
        }
    });

    controls.closeModal = false
    
    window.addEventListener("keyup", event => {
        if (event.key === "d" || event.key === "D") {
            controls.right = false
        }
        if (event.key === "a" || event.key === "A") {
            controls.left = false
        }
        if (event.key === "s" || event.key === "S") {
            controls.down = false
        }
        if (event.key === "w" || event.key === "W") {
            controls.up = false
        }
        if (event.key === "f" || event.key === "F") {
            controls.action = false
        }
    });
    
    return controls
}

export { setUpGameControls }