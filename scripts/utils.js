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

utils.angleBetweenSquares = (square1, square2, inDegrees) => {
    const dx = square2.x - square1.x;
    const dy = square2.y - square1.y;
    
    let angleRad = Math.atan2(dy, dx);
    let angleDeg = (angleRad * 180) / Math.PI;

    if (angleDeg < 0) {
        angleDeg += 360;
    }

    if (inDegrees) {
        return angleDeg
    } else {
        return utils.degreesToAngle(angleDeg)
    }
}

utils.degreesToAngle = (angleDeg) => {
    if (angleDeg > 225 && angleDeg < 315) {
        return "up"
    } else if (angleDeg >= 315 || angleDeg <= 45) {
        return "right"
    } else if (angleDeg > 45 && angleDeg < 135) {
        return "down"
    } else if (angleDeg >= 135 && angleDeg <= 225) {
        return "left"
    }
}

utils.degreesToClock = (angleDeg) => {
    let num = Math.round(angleDeg / 30) + 3
    if (num > 12) {
        num -= 12
    }
    return num
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

utils.shuffleArray = (array) => {
    let currentIndex = array.length;
    
    while (currentIndex != 0) {    
        let randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array
}

utils.drawEquipped = (entity) => {
    game.setTimer(() => {
        const tileSize = game.tileSize
        const item = entity.equipped
        if (!item) {
            return false
        }
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

utils.addLineBreaks = (text) => {
    const maxLength = 36
    const words = text.split(/\s+/) // Split by spaces
    let currentLine = ''
    const lines = []

    for (let i = 0; i < words.length; i++) {
        if (currentLine.length + words[i].length <= maxLength) {
            // Add the word to the current line
            if (currentLine !== '') {
                currentLine += ' '
            }
            currentLine += words[i]
        } else {
            // Push the current line to the lines array
            lines.push(currentLine)
            // Start a new line with the current word
            currentLine = words[i]
        }
    }

    // Push the last line
    if (currentLine !== '') {
        lines.push(currentLine)
    }

    return lines;
};

utils.isInViewport = (position) => {
    const golemX = position.x;
    const golemY = position.y;
    
    const viewportXStart = game.viewport.origin.x;
    const viewportYStart = game.viewport.origin.y;
    const viewportXEnd = viewportXStart + game.viewport.width;
    const viewportYEnd = viewportYStart + game.viewport.height;
    
    const isXWithin = golemX >= viewportXStart && golemX <= viewportXEnd;
    const isYWithin = golemY >= viewportYStart && golemY <= viewportYEnd;
    
    return isXWithin && isYWithin;
}

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