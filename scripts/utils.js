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

utils.directionFromCoordinates = (x, y) => {
    if (x === 0) {
        if (y === 1) {
            return "down"
        } else if (y === -1) {
            return "up"
        }
    } else if (y === 0) {
        if (x === 1) {
            return "right"
        } else if (x === -1) {
            return "left"
        }
    }
    return null
}

utils.rotateByCoordinates = (coordinates, degrees) => {
    degrees *= -1
    const rotations = [
        { x: 1, y: 0 }, { x: 1, y: -1 }, { x: 0, y: -1 }, { x: -1, y: -1 },
        { x: -1, y: 0 }, { x: -1, y: 1 }, { x: 0, y: 1 }, { x: 1, y: 1 }
    ];

    const index = (rotations.findIndex(rot => rot.x === coordinates.x && rot.y === coordinates.y) + Math.round(degrees / 45) + rotations.length) % rotations.length

    return rotations[index]
}

utils.oppositeDirection = (direction) => {
    return {
        up: "down",
        right: "left",
        down: "up",
        left: "right"
    }[direction]
}

utils.shuffle = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
}

utils.distanceBetweenSquares = (square1, square2) => {
    const dx = square1.x - square2.x;
    const dy = square1.y - square2.y;
    return Math.sqrt(dx * dx + dy * dy);
}

utils.drawEquipped = (entity) => {
    game.setTimer(() => {
        const tileSize = game.tileSize
        const item = entity.equipped
        const angle = item.spriteAngle || 0
        const xOffset = item.spriteOffset.x || 0
        const yOffset = item.spriteOffset.y || 0
        let shrinkBy = tileSize * 0.1
        // let offsetCoords = utils.directionToCoordinates(entity.direction)
        let offsetCoords = {x: 0, y: 0}
        utils.drawRotatedImage(
            game.images[item.sprite.image],
            (((entity.spritePosition.x + entity.spriteOffset.x - game.viewport.origin.x) * tileSize) + offsetCoords.x * 70) + shrinkBy + xOffset,
            (((entity.spritePosition.y + entity.spriteOffset.y - game.viewport.origin.y) * tileSize) + offsetCoords.y * 70) + shrinkBy + yOffset,
            tileSize - (shrinkBy * 2),
            tileSize - (shrinkBy * 2),
            angle,
            entity.direction === "right" || entity.direction === "down"
        )
    }, 0)
}

utils.drawRotatedImage = (image, x, y, width, height, angle, mirrored) => {
    const ctx = game.ctx;
    ctx.save();

    // Translate to the center of the image
    ctx.translate(x + width / 2, y + height / 2);

    // If mirrored is true, flip the canvas horizontally
    if (mirrored) {
        ctx.scale(-1, 1);
    }

    // Rotate the canvas around the center of the image
    ctx.rotate(angle * Math.PI / 180);

    // Draw the rotated image
    ctx.drawImage(image, -width / 2, -height / 2, width, height);

    // Restore the canvas state
    ctx.restore();
};

utils.checkForSpriteCollision = (a, b) => {
    // Calculate the half-width of the square
    const halfWidth = (1 / 2)

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