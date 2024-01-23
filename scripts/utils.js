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

export { utils }