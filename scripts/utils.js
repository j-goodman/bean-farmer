let utils = {}

utils.dice = (sides = 6) => {
    return Math.ceil(Math.random() * sides)
}

utils.randomRotate = (direction) => {
    let directions = ["up", "right", "down", "left"]
    let current = directions.indexOf(direction)
    let next = current + ((Math.floor(Math.random() * 2)) ? -1 : 1)
    next = next > 3 ? 0 : next
    next = next < 0 ? 3 : next
    return directions[next]
}

utils.directionToCoordinates = (direction) => {
    return {
        up: {x: 0, y: -1},
        right: {x: 1, y: 0},
        down: {x: 0, y: 1},
        left: {x: -1, y: 0}
    }[direction]
}

utils.oppositeDirection = (direction) => {
    return {
        up: "down",
        right: "left",
        down: "up",
        left: "right"
    }[direction]
}

utils.checkForSpriteCollision = (a, b) => {
    // Calculate the half-width of the square
    const halfWidth = 1 / 2

    // Calculate the centers of each square
    const centerXA = a.spritePosition.x + halfWidth
    const centerYA = a.spritePosition.y + halfWidth
    const centerXB = b.spritePosition.x + halfWidth
    const centerYB = b.spritePosition.y + halfWidth

    // Calculate the distance between the centers along X and Y axes
    const deltaX = centerXA - centerXB
    const deltaY = centerYA - centerYB

    // Check for overlap
    const overlapX = Math.abs(deltaX) < halfWidth * 1.8
    const overlapY = Math.abs(deltaY) < halfWidth * 1.8

    // If there is overlap along both axes
    if (overlapX && overlapY) {
        // Determine the direction of the collision
        let direction = { x: 0, y: 0 }

        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            direction.x = deltaX > 0 ? 1 : -1
        } else {
            direction.y = deltaY > 0 ? 1 : -1
        }

        return direction
    } else {
        return false
    }
}

export { utils }