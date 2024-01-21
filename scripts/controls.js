const setUpGameControls = () => {
    const controls = {}
    controls.left = false
    controls.right = false
    controls.up = false
    controls.down = false

    window.addEventListener("keydown", event => {
        if (event.key === "d") {
            controls.right = true
        }
        if (event.key === "a") {
            controls.left = true
        }
        if (event.key === "s") {
            controls.down = true
        }
        if (event.key === "w") {
            controls.up = true
        }
    });
    
    window.addEventListener("keyup", event => {
        if (event.key === "d") {
            controls.right = false
        }
        if (event.key === "a") {
            controls.left = false
        }
        if (event.key === "s") {
            controls.down = false
        }
        if (event.key === "w") {
            controls.up = false
        }
    });
    return controls
}

export { setUpGameControls }