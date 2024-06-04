import { Sprite } from './sprite.js';

import { game } from './game.js';
import { utils } from './utils.js';

class Entity {
    constructor (x, y, elevation, dna) {
        this.position = {
            x: x,
            y: y
        }
        this.spritePosition = {
            x: x,
            y: y
        }
        this.spriteOffset = {
            x: 0,
            y: 0
        }
        this.exists = true
        this.baseMoveDelay = 12
        this.moveDelay = this.baseMoveDelay
        this.baseStrength = 1
        this.strength = this.baseStrength
        this.elevation = elevation
        this.pushability = 7
        this.breakability = 9
        this.direction = "down"
        this.movable = true
        this.birthday = game.time
        this.id = game.assignId()
        if (dna) {
            this.dna = JSON.parse(JSON.stringify(dna));
        } else {
            this.dna = {}
        }
        game.setTimer(() => {
            this.createSelf(x, y)
        }, 0)
    }
    
    createSelf (x, y) {
        game.addToGrid(this, x, y, this.elevation)
    }

    move (x, y, callback) {
        if (!this.exists) {
            return false
        }
        let obstacle = game.checkGrid(this.position.x + x, this.position.y + y)
        if (!obstacle) {
            game.addToGrid(null, this.position.x, this.position.y)
            this.position.x += x
            this.position.y += y
            game.addToGrid(this, this.position.x, this.position.y)
            if (callback) {
                game.setTimer(() => callback(), this.moveDelay)
            }
            return true
        } else {
            if (obstacle.onTouch) { obstacle.onTouch(this) }
            if (obstacle.pushability <= this.strength && obstacle.pushability < obstacle.breakability) {
                this.push(obstacle, x, y)
                if (callback) {
                    game.setTimer(() => callback(), this.moveDelay)
                }
            } else {
                if (callback) { callback() }
            }
            return false
        }
    }

    teleport (x, y) {
        if (this.onTeleport) {
            this.onTeleport()
        }
        game.checkGrid(this.position.x, this.position.y, true).occupant = null
        this.position.x = this.spritePosition.x = this.spawnPosition.x
        this.position.y = this.spritePosition.y = this.spawnPosition.y
        game.checkGrid(this.position.x, this.position.y, true).occupant = this
    }

    moveThroughAir (x, y) {
        game.addToGrid(null, this.position.x, this.position.y, "air")
        this.position.x += x
        this.position.y += y
        game.addToGrid(this, this.position.x, this.position.y, "air")
    }

    push (obstacle, x, y) {
        obstacle.strength = this.strength * 0.75
        obstacle.moveDelay = this.moveDelay
        let success = obstacle.move(x, y, () => {
            obstacle.moveDelay = obstacle.baseMoveDelay
            obstacle.strength = obstacle.baseStrength
        })
        if (success) {
            if (obstacle.onPush) { obstacle.onPush(x, y) }
            this.move(x, y)
        }
    }

    moveToGround () {
        console.log("Move to ground.")
        console.log(this)
        const square = game.checkGrid(this.position.x, this.position.y, true)
        if (square.occupant === this) {
            square.occupant = null
        }
        square.groundOccupant = this
    }

    moveFromGround () {
        const square = game.checkGrid(this.position.x, this.position.y, true)
        this.elevation = null
        if (!square.occupant) {
            square.groundOccupant = null
            square.occupant = this
            return true
        } else {
            return false
        }
    }

    hit (obstacle) {
        if (obstacle.onHit) {
            obstacle.onHit(this)
        }
        if (obstacle.breakability <= this.strength) {
            obstacle.break(this)
        }
    }

    break (breaker, x, y) {
        if (this.onBreak) {
            this.onBreak(breaker, x, y)
        } else {
            this.die()
        }
    }

    update () {
        if (!this.elevation) {
            if (this.exists && game.checkGrid(this.position.x, this.position.y) !== this) {
                console.log("Object missing from grid, adding.")
                console.log(this)
                game.addToGrid(this, this.position.x, this.position.y)
            }
        } else {
            if (this.exists && game.checkGrid(this.position.x, this.position.y, true)[`${this.elevation}Occupant`] !== this) {
                game.addToGrid(this, this.position.x, this.position.y, this.elevation)
            }
        }
        if (this.movable) {
            this.frameUpdate()
        }
    }

    update4DirectionSprite () {
        this.sprite.changeVersion(this.direction)
    }

    die () {
        this.exists = false
        if (this.elevation === "ground") {
            game.grid[this.position.x][this.position.y].groundOccupant = null
        } else if (this.elevation === "air") {
            game.grid[this.position.x][this.position.y].airOccupant = null
        } else {
            game.grid[this.position.x][this.position.y].occupant = null
        }

        if (this.pipeConnection) {
            this.connectNeighbors()
        }
        
        if (this.onDeath) { this.onDeath() }
    }

    checkDrop (item) {
        game.setTimer(() => {
            if (game.checkGrid(item.position.x, item.position.y) === item) {
                return true
            } else {
                const directions = ["up", "right", "down", "left"]
                for (let i = 0; i < 4; i++) {
                    console.log(`Trying ${directions[i]}.`)
                    const offset = utils.directionToCoordinates(directions[i])
                    if (!game.checkGrid(
                        this.position.x + offset.x,
                        this.position.y + offset.y
                    )) {
                        item.position.x = this.position.x + offset.x
                        item.position.y = this.position.y + offset.y
                        item.spritePosition.x = item.position.x
                        item.spritePosition.y = item.position.y
                        game.addToGrid(item, item.position.x, item.position.y)
                        break
                    }
                }   
            }
        }, 0)
    }

    cleanSoil (power = 6, attribute = "soilToxicity", direction = -1) {
        const square = game.checkGrid(this.position.x, this.position.y, true)
        let checkedSquares = {}

        const cleanNeighbors = (power, x, y) => {
            game.setTimer(() => {
                
                if (power <= 0) {
                    return false
                }
                
                let coords = [
                    {x: 0, y: 0},
                    {x: 0, y: -1},
                    {x: 1, y: 0},
                    {x: 0, y: 1},
                    {x: -1, y: 0}
                ]
                
                coords.forEach((coord) => {
                    if (!checkedSquares[`${x + coord.x},${y + coord.y}`]) {
                        let neighbor = game.checkGrid(x + coord.x, y + coord.y, true)
                        checkedSquares[`${x + coord.x},${y + coord.y}`] = true
                        const adjustedPower = attribute === "soilToxicity" ?
                        power / 400 : power / 200

                        neighbor[attribute] += (adjustedPower) * direction

                        if (direction === -1) {
                            if (neighbor[attribute] < 0) {
                                neighbor[attribute] = 0
                            }
                        } else {
                            if (neighbor[attribute] > 1) {
                                neighbor[attribute] = 1
                            }
                        }

                        cleanNeighbors(power - 1, x + coord.x, y + coord.y)
                    }
                })
            }, 1)
        }
        
        cleanNeighbors(power, this.position.x, this.position.y)
    }

    frameUpdate () {
        let diagonal = this.spritePosition.x !== this.position.x && this.spritePosition.y !== this.position.y
        let xDirection = 0
        let yDirection = 0

        if (diagonal) {
            xDirection = this.spritePosition.x < this.position.x ? 1 : -1
            yDirection = this.spritePosition.y < this.position.y ? 1 : -1
            xDirection = this.spritePosition.x === this.position.x ? 0 : xDirection
            yDirection = this.spritePosition.y === this.position.y ? 0 : yDirection
        }
        
        if (this.spritePosition.x < this.position.x) {
            this.spritePosition.x += (1 / this.moveDelay)
        } else if (this.spritePosition.x > this.position.x) {
            this.spritePosition.x -= (1 / this.moveDelay)
        }

        if (this.spritePosition.y < this.position.y) {
            this.spritePosition.y += (1 / this.moveDelay)
        } else if (this.spritePosition.y > this.position.y) {
            this.spritePosition.y -= (1 / this.moveDelay)
        }

        if (
            this.position.x !== this.spritePosition.x ||
            this.position.y !== this.spritePosition.y
        ) {
            this.checkForSpriteCollisions()
        }

        this.spritePosition.x = Math.round(this.spritePosition.x / (1 / this.moveDelay)) * (1 / this.moveDelay)
        this.spritePosition.y = Math.round(this.spritePosition.y / (1 / this.moveDelay)) * (1 / this.moveDelay)
    }

    playAnimationOnce (version, callback) {
        let current = this.sprite.version
        this.sprite.changeVersion(version)
        this.sprite.onAnimationFinish = () => {
            this.sprite.changeVersion(current)
            this.update4DirectionSprite()
            if (callback) { callback() }
        }
    }

    playOverlayAnimation (sprite, version, loop=false) {
        this.overlayExists = true
        this.overlay = sprite.versions[version]
        this.overlayCycle = Math.floor(Math.random() * (this.overlay.length - 1))
        this.overlayLoop = loop
    }

    findPath (target) {
        const origin = this.position
        let found = false
        const bounds = {
            origin: {
                x: 0,
                y: 0,
            },
            vertex: {
                x: 1,
                y: 1,
            }
        }
        bounds.origin.x = Math.min(origin.x, target.x)
        bounds.origin.y = Math.min(origin.y, target.y)
        bounds.vertex.x = Math.max(origin.x, target.x)
        bounds.vertex.y = Math.max(origin.y, target.y)
        const size = {
            x: bounds.vertex.x - bounds.origin.x,
            y: bounds.vertex.y - bounds.origin.y,
        }
        bounds.origin.x -= 18
        bounds.vertex.x += 18
        bounds.origin.y -= 18
        bounds.vertex.y += 18

        class SearchNode {
            constructor (prevNode, x, y) {
                this.prevNode = prevNode
                this.position = {x: x, y: y}
                this.resolved = false
            }

            resolve (unresolved) {
                if (this.position.x === target.x && this.position.y === target.y) {
                    let currentNode = this
                    let nodeList = []
                    while (currentNode.prevNode) {
                        // draw corn:
                        // const tileSize = game.tileSize
                        // game.ctx.drawImage(game.images["wild-corn"], (currentNode.position.x - game.viewport.origin.x) * tileSize, (currentNode.position.y - game.viewport.origin.y) * tileSize, tileSize, tileSize)

                        nodeList.unshift(currentNode)
                        currentNode = currentNode.prevNode
                    }
                    found = true
                    return nodeList
                }
                const empties = this.getEmptyNeighbors()
                empties.forEach(neighbor => {
                    unresolved.push(neighbor)
                })
                this.resolved = true
            }

            getEmptyNeighbors () {
                let emptyNeighbors = []
                let offsets = [
                    {x: -1, y: 0},
                    {x: 1, y: 0},
                    {x: 0, y: -1},
                    {x: 0, y: 1},
                ]
                offsets.forEach(offset => {
                    const newX = this.position.x + offset.x
                    const newY = this.position.y + offset.y
                    const isFull = game.checkGrid(newX, newY)
                    if (isFull) { return false }
                    const isInBounds = (
                        newX > bounds.origin.x &&
                        newY > bounds.origin.y &&
                        newX < bounds.vertex.x &&
                        newY < bounds.vertex.y
                    )
                    const isUnchecked = !checkedSquares[`${newX},${newY}`]
                    checkedSquares[`${newX},${newY}`] = true
                    if (!isFull && isInBounds && isUnchecked) {
                        emptyNeighbors.push(
                            new SearchNode (this, newX, newY)
                        )
                    }
                })
                return emptyNeighbors
            }
        }

        let checkedSquares = {}
        let unresolvedNodes = []

        let originNode = new SearchNode (false, origin.x, origin.y)
        unresolvedNodes.push(originNode)

        // let count = 0
        while (!found && unresolvedNodes.length > 0) {
            // count += 1
            let newUnresolvedNodes = []
            for (const node of unresolvedNodes) {
                // draw rubies:
                // const tileSize = game.tileSize
                // game.ctx.drawImage(game.images["ruby"], (node.position.x - game.viewport.origin.x) * tileSize, (node.position.y - game.viewport.origin.y) * tileSize, tileSize, tileSize)
                let result = node.resolve(newUnresolvedNodes)
                if (result) {
                    return result
                }
                if (!node.resolved) {
                    newUnresolvedNodes
                }
            }
            unresolvedNodes = newUnresolvedNodes
        }
        if (unresolvedNodes.length === 0 && !found) {
            console.log("No path found.")
        }
    }

    walkTo (target, callback) {
        let path = this.findPath(target)
        this.currentDestination = target
        this.walkToCallback = callback

        if (path) {
            this.pathIndex = 0
            this.walkAlongPath(path, target, callback)
        } else {
            let alternateFound = false
            const offsets = [
                {x: 1, y: 0},
                {x: -1, y: 0},
                {x: 0, y: 1},
                {x: 0, y: -1},
            ]
            for (const offset of offsets) {
                if (!game.checkGrid(target.x + offset.x, target.y + offset.y)) {
                    path = this.findPath({
                        x: target.x + offset.x,
                        y: target.y + offset.y
                    })
                    if (path) {
                        target = {
                            x: target.x + offset.x,
                            y: target.y + offset.y
                        }
                    }
                }
            }
            if (path) {
                this.walkTo(target, callback)
            }
            if (!path) {
                game.setTimer(() => {
                    this.walkTo(target, callback)
                }, 120)
            }
        }
    }
    
    walkAlongPath (path, target, callback) {
        if (!path || !path[this.pathIndex]) {
            console.log("Insufficient pathing input.")
            return false
        }
        const nextMove = {
            x: path[this.pathIndex].position.x - this.position.x,
            y: path[this.pathIndex].position.y - this.position.y,
        }
        let obstacle = game.checkGrid(path[this.pathIndex].position.x, path[this.pathIndex].position.y)
        if (obstacle) {
            game.setTimer(() => {
                this.walkTo(target, callback)
            }, 20)
        } else {
            this.facing = utils.directionFromCoordinates(nextMove.x, nextMove.y)
            if (this.sprite.versions.up) {
                this.sprite.changeVersion(this.facing)
            }
            this.move(nextMove.x, nextMove.y, () => {
                if (this.currentDestination && this.currentDestination.x === target.x && this.currentDestination.y === target.y) {
                    if (!(this.position.x === target.x && this.position.y === target.y)) {
                        this.pathIndex += 1
                        if (utils.dice(7) === 7) {
                            this.walkTo(target, callback)
                        } else {
                            this.walkAlongPath(path, target, callback)
                        }
                    } else {
                        if (this.walkToCallback) {
                            this.walkToCallback()
                            this.walkToCallback = null
                        }
                    }
                }
            })
        }
    }

    checkForSpriteCollisions () {
        let min = {
            x: Math.floor(this.spritePosition.x) - 1,
            y: Math.floor(this.spritePosition.y) - 1
        }
        let max = {
            x: Math.ceil(this.spritePosition.x) + 1,
            y: Math.ceil(this.spritePosition.y) + 1
        }

        let entities = []
        for (let x = min.x; x <= max.x; x++) {
            for (let y = min.y; y <= max.y; y++) {
                let occupant = game.checkGrid(x, y)
                if (occupant) {
                    entities.push(occupant)
                }
            }
        }

        for (let a = 0; a < entities.length - 1; a++) {
            for (let b = a + 1; b < entities.length; b++) {
                let eA = entities[a]
                let eB = entities[b]
                let collide = utils.checkForSpriteCollision(eA, eB)
                if (collide.x === -1) {
                    eA.spritePosition.x -= (1 / eA.moveDelay)
                    eB.spritePosition.x += (1 / eB.moveDelay)
                }
                if (collide.x === 1) {
                    eA.spritePosition.x += (1 / eA.moveDelay)
                    eB.spritePosition.x -= (1 / eB.moveDelay)
                }
                if (collide.y === -1) {
                    eA.spritePosition.y -= (1 / eA.moveDelay)
                    eB.spritePosition.y += (1 / eB.moveDelay)
                }
                if (collide.y === 1) {
                    eA.spritePosition.y += (1 / eA.moveDelay)
                    eB.spritePosition.y -= (1 / eB.moveDelay)
                }
            }
        }
    }
    
    burn () {
        this.cleanSoil(1, "soilHealth", 1)
        if (this.onHit) { this.onHit() }
        if (!this.animal) {
            this.burnability -= 1
            if (this.burnability <= 0) {
                this.die()
            }
        }
    }

    pipeConnect () {
        let directions = [
            {x: 0, y: -1},
            {x: 1, y: 0},
            {x: 0, y: 1},
            {x: -1, y: 0},
        ]
        let directionNames = ["U", "R", "D", "L"]
        let spriteName = ""
        directions.forEach((coord, i) => {
            const neighbor = game.checkGrid(
                this.position.x + coord.x,
                this.position.y + coord.y
            )
            if (neighbor && neighbor.name === this.name) {
                spriteName += directionNames[i]
            }
        })
        if (
            spriteName === "URDL" &&
            this.sprite.versions["URDL2"] &&
            (this.position.x - this.position.y) % 4 === 0
            && (this.position.x + this.position.y) % 3 !== 0
        ) {
            spriteName = "URDL2"
        }
        if (
            spriteName === "URDL" &&
            this.sprite.versions["URDL2"] &&
            (this.position.x + this.position.y) % 3 === 0
        ) {
            spriteName = "URDL3"
        }
        if (spriteName === "") { spriteName = "X" }
        this.sprite.changeVersion(spriteName)
        if (spriteName.includes("U") && spriteName.includes("L") && this.name === "brick") {
            const occupant = game.checkGrid(this.position.x - 1, this.position.y - 1)
            if (occupant && occupant.name === "brick") {
                this.sprite.overlay = "red-brick/fill"
            }
        }
    }

    connectNeighbors () {
        let directions = [
            {x: 0, y: -1},
            {x: 1, y: 0},
            {x: 0, y: 1},
            {x: -1, y: 0},
        ]
        directions.forEach((coord, i) => {
            const neighbor = game.checkGrid(
                this.position.x + coord.x,
                this.position.y + coord.y
            )
            if (neighbor && neighbor.name === this.name) {
                neighbor.pipeConnect()
            }
        })
    }
}

export { Entity }