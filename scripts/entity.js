import { Sprite } from './sprite.js';
import { makeIceBlockSprite } from './sprites/iceBlockSprite.js';

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
        if (
            (x || x === 0) &&
            (y || y === 0)
        ) {
            game.addToGrid(this, x, y, this.elevation)
        }
    }

    move (x, y, callback, override) {
        if (!this.exists || this.immobilized) {
            return false
        }

        let obstacle = game.checkGrid(this.position.x + x, this.position.y + y)
        
        let floor = null

        if (this.slidable) {
            floor = game.checkGrid(
                this.position.x,
                this.position.y,
                true
            ).groundOccupant
        }

        if (!this.extraTraction && this.sliding && floor && floor.slippery && !override) {
            return false
        }

        if (!obstacle) {
            game.addToGrid(null, this.position.x, this.position.y)
            this.position.x += x
            this.position.y += y
            game.addToGrid(this, this.position.x, this.position.y)
            if (callback) {
                game.setTimer(() => callback(), this.moveDelay)
            }
            if (this.onMove) {
                this.onMove()
            }

            floor = game.checkGrid(
                this.position.x,
                this.position.y,
                true
            ).groundOccupant

            if (!(this.slidable)) {
                floor = null
            }

            if (!this.extraTraction && floor && floor.slippery) {
                this.sliding = true
                game.setTimer(() => {
                    const success = this.move(x, y, null, true)
                    this.moveDelay = Math.ceil(this.baseMoveDelay / 2)
                    if (!success) {
                        this.sliding = false
                        this.moveDelay = this.baseMoveDelay
                    }
                }, this.moveDelay)
            } else if (this.slidable) {
                this.sliding = false
                this.moveDelay = this.baseMoveDelay
            }
            return true
        } else {
            if (obstacle.onTouch) { obstacle.onTouch(this) }
            if (obstacle.pushability <= this.strength && obstacle.pushability < obstacle.breakability) {
                const success = this.push(obstacle, x, y)
                if (callback) {
                    game.setTimer(() => callback(), this.moveDelay)
                }
            } else {
                if (callback) { callback() }
            }
            return false
        }
    }

    teleport (targetPosition) {
        if (!targetPosition) {
            targetPosition = this.spawnPosition
        }
        if (this.onTeleport) {
            this.onTeleport()
        }
        game.checkGrid(this.position.x, this.position.y, true).occupant = null
        this.position.x = this.spritePosition.x = targetPosition.x
        this.position.y = this.spritePosition.y = targetPosition.y
        game.checkGrid(this.position.x, this.position.y, true).occupant = this
    }

    moveThroughAir (x, y, callback) {
        game.addToGrid(null, this.position.x, this.position.y, "air")
        this.position.x += x
        this.position.y += y
        game.addToGrid(this, this.position.x, this.position.y, "air")
        if (callback) {
            game.setTimer(() => callback(), this.moveDelay)
        }
    }

    drawSpeechBubble (icon) {
        const tileSize = game.tileSize
        game.ctx.drawImage(
            game.images["speech-bubble"],
            (this.spritePosition.x + this.spriteOffset.x - game.viewport.origin.x) * tileSize - 97,
            (this.spritePosition.y + this.spriteOffset.y - game.viewport.origin.y) * tileSize - 226,
            tileSize * 1.65,
            tileSize * 1.65
        )
        game.ctx.drawImage(
            game.images[icon],
            (this.spritePosition.x + this.spriteOffset.x - game.viewport.origin.x) * tileSize - 54,
            (this.spritePosition.y + (this.spriteOffset.y * 1.5) - game.viewport.origin.y) * tileSize - 216,
            tileSize * .9,
            tileSize * .9
        )
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
            if (!game.checkGrid(this.position.x + x, this.position.y + y)) {
                this.move(x, y)
            }
        }
        return success
    }

    moveToGround () {
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

    moveToAir () {
        const square = game.checkGrid(this.position.x, this.position.y, true)
        if (square.occupant === this) {
            square.occupant = null
        }
        this.elevation = "air"
        square.airOccupant = this
    }

    moveFromAir () {
        const square = game.checkGrid(this.position.x, this.position.y, true)
        this.elevation = null
        if (!square.occupant) {
            square.airOccupant = null
            square.occupant = this
            console.log("Dropped.")
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
            if (this.name === "player" && this.exists && game.checkGrid(this.position.x, this.position.y) !== this) {
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
        const square = game.checkGrid(this.position.x, this.position.y, true)
        if (this.elevation === "ground") {
            square.groundOccupant = null
        } else if (this.elevation === "air") {
            square.airOccupant = null
        } else {
            const occupant = square.occupant
            if (occupant && occupant.id === this.id) {
                square.occupant = null
            }
            if (game.player && game.player.equipped && game.player.equipped.id === this.id) {
                game.player.removeFromInventory(this)
                game.player.equipped = null
            }
        }

        if (this.pipeConnection) {
            game.setTimer(() => {
                this.connectNeighbors()
            }, 0)
        }
        
        if (this.onDeath) { this.onDeath() }
    }

    checkDrop (item, preferredDirection, offset) {
        game.setTimer(() => {
            let position = item.position
            if (offset) {
                position.x += offset.x
                position.y += offset.y
            }
            if (game.checkGrid(position.x, position.y) === item) {
                return true
            } else {
                let directions = ["up", "right", "down", "left"]
                if (preferredDirection && directions.includes(preferredDirection)) {
                    directions.unshift(preferredDirection)
                }
                for (let i = 0; i < 4; i++) {
                    // console.log(`Trying ${directions[i]}.`)
                    const offset = utils.directionToCoordinates(directions[i])
                    if (!game.checkGrid(
                        this.position.x + offset.x,
                        this.position.y + offset.y
                    )) {
                        position.x = this.position.x + offset.x
                        position.y = this.position.y + offset.y
                        item.spritePosition.x = position.x
                        item.spritePosition.y = position.y
                        game.addToGrid(item, position.x, position.y)
                        break
                    }
                }
            }
        }, 0)
    }

    secureDrop (item) {
        const inventoryIds = () => {
            return game.player.items.map(eachItem => {
                return eachItem.id
            })
        }
        game.setTimer(() => {
            if (game.checkGrid(item.position.x, item.position.y) === item) {
                return true
            } else {
                if (!inventoryIds().includes(item.id)) {
                    game.checkGrid(item.position.x, item.position.y, true).occupant = item
                }
            }
        }, 0)
        game.setTimer(() => {
            if (game.checkGrid(item.position.x, item.position.y) === item || inventoryIds().includes(item.id)) {
                return true
            } else {
                if (game.checkGrid(item.position.x, item.position.y)) {
                    game.setTimer(() => {
                        this.secureDrop(item)
                    }, 90)
                } else {
                    game.checkGrid(item.position.x, item.position.y, true).occupant = item
                }
            }
        }, 60)
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
                        power / 800 : power / 400

                        neighbor[attribute] += (adjustedPower) * direction * (utils.dice(3) / 2)

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

    freezeAir (xOrigin, yOrigin, direction=1) {
        if (xOrigin === undefined || yOrigin === undefined) {
            xOrigin = this.position.x
            yOrigin = this.position.y
        }
        if (utils.dice(2) === 2) {
            xOrigin += (utils.dice(9) - 5)
            yOrigin += (utils.dice(9) - 5)
        }
        let frost = utils.dice(12) / 800
        const square = game.checkGrid(xOrigin, yOrigin, true)
        if (square.frozenness < .75) {
            square.frozenness += frost * direction
        } else {
            return false
        }
        const frostRadius = 8 + utils.dice(5)
        let cursor = {x: xOrigin, y: yOrigin}
        cursor.x -= frostRadius
        cursor.y -= frostRadius
        for (let x = 0; x < frostRadius * 2; x++) {
            for (let y = 0; y < frostRadius * 2; y++) {
                let subSquare = game.checkGrid(cursor.x, cursor.y, true)
                let distance = utils.distanceBetweenSquares(cursor, {x: xOrigin, y: yOrigin})
                if (distance < 1) {
                    distance = 1
                }
                const power = 1 / distance
                subSquare.frozenness += frost * power * direction
                cursor.y += 1
            }
            cursor.y = yOrigin - frostRadius
            cursor.x += 1
        }
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
            this.overheat = 0
            this.checkForSpriteCollisions()
        }

        // if (
        //     Math.abs(this.position.x - this.spritePosition.x) > 1.95 ||
        //     Math.abs(this.position.y - this.spritePosition.y) > 1.95
        // ) {
        //     console.log("Resetting disconnected sprite:", this.name)
        //     this.spritePosition.x = this.position.x
        //     this.spritePosition.y = this.position.y
        // }

        this.spritePosition.x = Math.round(this.spritePosition.x / (1 / this.moveDelay)) * (1 / this.moveDelay)
        this.spritePosition.y = Math.round(this.spritePosition.y / (1 / this.moveDelay)) * (1 / this.moveDelay)
    }

    playAnimationOnce (version, callback) {
        let current = this.sprite.version
        this.sprite.changeVersion(version)
        this.sprite.onAnimationFinish = () => {
            this.sprite.changeVersion(current)
            if (this.clockDirections) {
                this.sprite.changeVersion(this.facing)
            } else {
                this.update4DirectionSprite()
            }
            if (callback) { callback() }
        }
    }

    playOverlayAnimation (sprite, version, loop=false) {
        this.overlayExists = true
        this.overlay = sprite.versions[version]
        if (loop) {
            this.overlayCycle = Math.floor(Math.random() * (this.overlay.length - 1))
        } else {
            this.overlayCycle = 0
        }
        this.overlayLoop = loop
    }

    findPath (target, scan=false) {
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

        let scanEntities = []

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
                    if (isFull && scan) {
                        scanEntities.push(game.checkGrid(newX, newY))
                    }
                    if (isFull) { return false }
                    const isInBounds = (
                        newX > bounds.origin.x &&
                        newY > bounds.origin.y &&
                        newX < bounds.vertex.x &&
                        newY < bounds.vertex.y
                    )
                    const isUnchecked = !checkedSquares[`${newX},${newY}`]
                    checkedSquares[`${newX},${newY}`] = true
                    if (isInBounds && isUnchecked) {
                        if (!isFull) {
                            emptyNeighbors.push(
                                new SearchNode (this, newX, newY)
                            )
                        }
                    }
                })
                return emptyNeighbors
            }
        }

        let checkedSquares = {}
        let unresolvedNodes = []
        
        let originNode = new SearchNode (false, origin.x, origin.y)
        unresolvedNodes.push(originNode)

        while (!found && unresolvedNodes.length > 0) {
            let newUnresolvedNodes = []
            for (const node of unresolvedNodes) {
                let result = node.resolve(newUnresolvedNodes)
                if (result && !scan) {
                    return result
                }
                if (!node.resolved) {
                    newUnresolvedNodes
                }
            }
            unresolvedNodes = newUnresolvedNodes
        }
        if (scan) {
            return scanEntities
        }
        if (unresolvedNodes.length === 0 && !found) {
            if (this.mood === "walking") {
                this.mood = "idle"
            }
            this.currentAction = null
            return false
        }
    }

    walkTo (target, callback) {
        if (this.currentAction && this.currentAction !== `Walking to ${target.x}, ${target.y}.`) {
            return false
        }
        this.currentWalk = "walk:" + this.id + ":" + game.time
        this.currentAction = `Walking to ${target.x}, ${target.y}.`
        let path = this.findPath(target)
        this.currentDestination = target
        this.walkToCallback = callback

        if (path) {
            this.pathIndex = 0
            this.walkAlongPath(path, target, callback, this.currentWalk)
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
                alternateFound = true
                this.walkTo(target, callback)
            }
            if (!path) {
                game.setTimer(() => {
                    this.walkTo(target, callback)
                }, 120)
            }
        }
    }
    
    walkAlongPath (path, target, callback, walkId) {
        if (this.currentAction !== `Walking to ${target.x}, ${target.y}.`) {
            // console.log("Prevented from accepting second path.")
            // console.log("current action:", this.currentAction)
            // console.log("target:", target)
            return false
        }
        if (walkId !== this.currentWalk) {
            // console.log(this.name + " prevented from accepting second path.")
            // console.log("walkId:", walkId)
            // console.log("this.currentWalk", this.currentWalk)
            // console.log("target:", target)
            this.pathIndex = 0
            return false
        }
        if (!path || !path[this.pathIndex]) {
            // console.log("Insufficient pathing input.")
            // console.log(path, target)
            this.pathIndex = 0
            if (this.mood === "walking") {
                this.mood = "idle"
            }
            this.currentAction = null
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
            if (this.clockDirections) {
                const clockDirs = {
                    "up": 12,
                    "right": 3,
                    "down": 6,
                    "left": 9
                }
                this.facing = utils.directionFromCoordinates(nextMove.x, nextMove.y)
                if (!this.immobilized) {
                    this.sprite.changeVersion(clockDirs[this.facing])
                }
            } else {
                this.facing = utils.directionFromCoordinates(nextMove.x, nextMove.y)
                if (this.sprite.versions.up && !this.immobilized) {
                    this.sprite.changeVersion(this.facing)
                }
            }
            this.move(nextMove.x, nextMove.y, () => {
                if (this.currentDestination && this.currentDestination.x === target.x && this.currentDestination.y === target.y) {
                    if (!(this.position.x === target.x && this.position.y === target.y)) {
                        this.pathIndex += 1
                        if (utils.dice(7) === 7) {
                            this.walkTo(target, callback)
                        } else {
                            this.walkAlongPath(path, target, callback, walkId)
                        }
                    } else {
                        if (this.walkToCallback) {
                            this.walkToCallback()
                            this.pathIndex = 0
                            this.walkToCallback = null
                            this.currentAction = null
                        }
                    }
                }
            })
        }
    }

    checkForSpriteCollisions () {
        this.overheat += 1
        if (this.overheat > 1) {
            console.log("!", this.overheat)
        }
        if (this.overheat > 90) {
            this.spritePosition.x = this.position.x
            this.spritePosition.y = this.position.y
        }
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
                let collision = false
                if (collide.x === -1) {
                    eA.spritePosition.x -= (1 / eA.moveDelay)
                    eB.spritePosition.x += (1 / eB.moveDelay)
                    collision = true
                }
                if (collide.x === 1) {
                    eA.spritePosition.x += (1 / eA.moveDelay)
                    eB.spritePosition.x -= (1 / eB.moveDelay)
                    collision = true
                }
                if (collide.y === -1) {
                    eA.spritePosition.y -= (1 / eA.moveDelay)
                    eB.spritePosition.y += (1 / eB.moveDelay)
                    collision = true
                }
                if (collide.y === 1) {
                    eA.spritePosition.y += (1 / eA.moveDelay)
                    eB.spritePosition.y -= (1 / eB.moveDelay)
                    collision = true
                }
                if (
                    (collision && game.time % 379 === 0 && !eA.immobile && !eB.immobile)
                ) {
                    eA.spritePosition.x = eA.position.x;
                    eA.spritePosition.y = eA.position.y;
                    eB.spritePosition.x = eB.position.x;
                    eB.spritePosition.y = eB.position.y;
                }
            }
        }
    }

    checkFacingSquare () {
        if (this.direction) {
            let { x, y } = utils.directionToCoordinates(this.direction)
            return game.checkGrid(this.position.x + x, this.position.y + y)
        } else if (this.facing) {
            let { x, y } = utils.directionToCoordinates(this.facing)
            return game.checkGrid(this.position.x + x, this.position.y + y)
        } else {
            return false
        }
    }
    
    burn () {
        this.cleanSoil(3, "soilHealth", 1)
        if (this.onHit) { this.onHit() }
        if (!this.animal) {
            this.burnability -= 1
            if (this.burnability <= 0) {
                this.die()
            }
        }
    }

    freeze () {
        if (this.unfreezable || this.frozen) {
            return false
        }
        this.overlayOffset = {
            x: game.tileSize / 2,
            y: game.tileSize / 2
        }
        const iceBlockSprite = makeIceBlockSprite()
        this.sprite.overlay = "ice-block"
        this.frozen = true
        this.immobilized = true
        game.setTimer(() => {
            this.overlayOffset = {
                x: 0,
                y: 0
            }
            this.frozen = false
            this.immobilized = false
            if (this.mood === "walking" && this.currentWalk) {
                this.mood = "idle"
                this.currentAction = null
                this.currentWalk = null
            }
            this.sprite.overlay = false
            if (this.onHit) {
                this.onHit()
            }
        }, 90)
    }

    checkForPlayer () {
        if (game.player && utils.distanceBetweenSquares(this.position, game.player.position) < 6) {
            if (this.hasRequest) {
                this.checkForRequest()
            }
            const angle = utils.angleBetweenSquares(this.position, game.player.position, true)
            const direction = utils.degreesToAngle(angle)
            this.facing = direction
            const clockDir = utils.degreesToClock(angle)
            this.sprite.changeVersion(clockDir)
            return true
        } else {
            return false
        }
    }

    checkForRequest () {
        if (!this.hasRequest) {
            return false
        }
        let scannedItems = this.findPath({x: this.position.x + 2, y: this.position.y}, true)
        scannedItems.forEach(item => {
            if (
                (item && item.name === this.request.name) ||
                (item && this.secondRequest && item.name === this.secondRequest.name) ||
                (item && this.thirdRequest && item.name === this.thirdRequest.name) ||
                (item.name === "player" && item.equipped && item.equipped.name === this.request.name) ||
                (item.name === "player" && item.equipped && this.secondRequest && item.equipped.name === this.secondRequest.name) ||
                (item.name === "player" && item.equipped && this.thirdRequest && item.equipped.name === this.thirdRequest.name)
            ) {
                this.mood = "found item"
                this.interaction = null
                this.talking = true
                this.jump()
            }
        })
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
            let neighbor = game.checkGrid(
                this.position.x + coord.x,
                this.position.y + coord.y
            )
            if (this.elevation) {
                neighbor = game.checkGrid(
                    this.position.x + coord.x,
                    this.position.y + coord.y,
                    true
                )[`${this.elevation}Occupant`]
            }
            if (!neighbor) {
                neighbor = game.checkGrid(
                    this.position.x + coord.x,
                    this.position.y + coord.y,
                    true
                ).groundOccupant
            }
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
        if (
            spriteName.includes("U") &&
            spriteName.includes("R") &&
            spriteName.includes("D") &&
            spriteName.includes("L") &&
            this.name === "ocean"
        ) {
            const occupantOne = game.checkGrid(this.position.x - 1, this.position.y - 1)
            const occupantTwo = game.checkGrid(this.position.x + 1, this.position.y + 1)
            if (
                occupantOne &&
                occupantTwo &&
                occupantOne.name === "ocean" &&
                occupantTwo.name === "ocean"
            ) {
                this.sprite.overlay = "ocean/fill"
            }
        }
    }

    connectNeighbors () {
        let directions = [
            {x: 0, y: 0},
            {x: 0, y: -1},
            {x: 1, y: 0},
            {x: 0, y: 1},
            {x: -1, y: 0},
        ]
        directions.forEach((coord, i) => {
            let neighbor = game.checkGrid(
                this.position.x + coord.x,
                this.position.y + coord.y,
            )
            if (this.elevation) {
                neighbor = game.checkGrid(
                    this.position.x + coord.x,
                    this.position.y + coord.y,
                    true
                )[`${this.elevation}Occupant`]
            }
            if (neighbor && neighbor.pipeConnection && neighbor.name === this.name) {
                neighbor.pipeConnect()
            }
        })
    }
}

game.constructors[Entity.name] = Entity
export { Entity }