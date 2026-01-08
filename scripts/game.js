import { Square } from './square.js';

import { utils } from './utils.js';

class Game {
    constructor() {
        this.grid = {}
        this.images = {}
        this.viewport = {
            origin: {
                x: 0,
                y: 12
            },
            height: 12,
            width: 16,
            newOrigin: {
                x: 0,
                y: 0
            },
            speed: {
                x: 0,
                y: 0
            },
            accel: {
                x: 0,
                y: 0
            },
        }
        this.paused = true
        this.displayHealth = 0
        this.displayPoints = 0
        this.time = 0
        this.nextId = 1
        this.tileSize = 120
        this.timerHash = {}
        this.resetHash = {}
        this.snailCount = 0
        this.pennyCount = 0
        this.points = 0
        this.pointCounter = 0
        this.prevailingWind = "right"
        this.defaultFlowerColor = utils.dice(36)
        this.detailedErrors = true
        this.constructors = {}
        this.tutorial = {
            items: {
                pickup: 3,
                menu: 1,
                menuNavigation: 2,
                equip: 1,
            }
        }
        this.constructors["Square"] = Square
    }

    assignId() {
        this.nextId += 1
        return this.nextId
    }

    setTimer (event, time, upfront=false) {
        if (!time && time !== 0) {
            console.error("Timer set with no time given.")
            console.log(event)
            return false
        }
        time = time === 0 ? 1 : time
        let deadline = this.time + time
        this.timerHash[deadline] = this.timerHash[deadline] ? this.timerHash[deadline] : []
        if (!upfront) {
            this.timerHash[deadline].push(event)
        } else {
            this.timerHash[deadline].unshift(event)
        }
    }

    checkTimer () {
        if (this.timerHash[this.time]) {
            this.timerHash[this.time].forEach(event => event())
            delete this.timerHash[this.time]
        }
    }

    drawHealth () {
        let x = game.canvas.width - 140
        if (game.displayHealth > 288) {
            let i = 10 - (game.displayHealth - 289)
            if (i >= 0 && i <= 10) {
                game.ctx.drawImage(game.images[`heart-burst/${i}`], 1780 - (124 * game.player.health), 10)
            }
        }
        if (game.displayHealth < 30) {
            game.ctx.globalAlpha = game.displayHealth / 30
        }
        for (let i = 1; i <= game.player.health; i++) {
            if (game.player.newHeart && i === game.player.health) {
                game.ctx.drawImage(game.images[`heart-fill/${31 - game.player.newHeart}`], x, 10)
            } else if (game.player.heartBeat && i === game.player.health) {
                game.ctx.drawImage(game.images[`heart-beat/${11 - game.player.heartBeat}`], x, 10)
            } else {
                game.ctx.drawImage(game.images["heart"], x, 10)
            }
            x -= 124
        }
        if (game.player.newHeart > 0) {
            game.player.newHeart -= 1
        }
        if (game.player.heartBeat > 0) {
            game.player.heartBeat -= 1
        }
        game.ctx.globalAlpha = 1
    }
    
    drawPoints () {
        let x = 40
        if (game.points < 0) { game.points = 0 }
        if (game.pointCounter < 0) { game.pointCounter = 0 }
        let difference = game.points - game.pointCounter
        if (game.pointCounter < game.points) {
            if (game.time % 2 == 0) {
                game.pointCounter += 1
            }
            if (difference > 7 && game.time % 3 == 0) {
                game.pointCounter += 1
            }
            if (difference > 20) {
                game.pointCounter += 1
            }
            if (difference > 40) {
                game.pointCounter += 3
            }
            if (difference > 300) {
                game.pointCounter += 7
            }
        }
        if (game.pointCounter > game.points) {
            game.pointCounter -= 1
        }
        if (game.pointCounter > game.points + 180) {
            game.pointCounter -= 2
        }
        if (game.pointCounter > game.points + 300) {
            game.pointCounter -= 18
        }
        let string = game.pointCounter.toString().padStart(4, 'X');
        if (game.displayPoints < 30) {
            game.ctx.globalAlpha = game.displayPoints / 30
        }
        game.ctx.drawImage(game.images["point-cards/gem"], x, 56)
        if (
            (game.pointCounter < 10000 &&
            !game.hieroglyphs &&
            (
                game.player.exists ||
                Math.floor(game.time / 60) % 8 !== 0
            )) || game.pointCounter == 0
        ) {
            game.ctx.drawImage(game.images[`point-cards/${string[0]}`], x + 90, 30)
            game.ctx.drawImage(game.images[`point-cards/${string[1]}`], x + 180, 30)
            game.ctx.drawImage(game.images[`point-cards/${string[2]}`], x + 270, 30)
            game.ctx.drawImage(game.images[`point-cards/${string[3]}`], x + 360, 30)
        } else {
            const symbols = [
                "egret", "egret", "egret", "egret",
                "ox", "feather",
                "feather", "feather", "ox",
                "goddess", "goddess", "saturn",
                "crown", "feather",
                "egret", "goddess", "egret", "egret",
                "ox", "moon", "ox",
                "feather", "feather", "feather",
                "goddess", "goddess", "goddess", "saturn",
                "thorn", "perthro", "perthro",
                "fehu", "pentagram", "ox",
                "perthro", "pentagram",
                "moon", "hand", "two-crows", "thorn", "fehu", "saturn", "sun"
            ]
            let randomSymbol = (index) => {return symbols[index]}
            game.ctx.drawImage(game.images[`point-cards/${
                string[0] === "X" ? "X" :
                randomSymbol(
                    (Math.floor(game.time / 93)) % symbols.length
                )
            }`], x + 90, 30)
            game.ctx.drawImage(game.images[`point-cards/${
                string[1] === "X" ? "X" :
                randomSymbol(
                    (Math.floor(game.time / 47)) % symbols.length
                )
            }`], x + 180, 30)
            game.ctx.drawImage(game.images[`point-cards/${randomSymbol(
                (Math.floor(game.time / 23)) % symbols.length
            )}`], x + 270, 30)
            game.ctx.drawImage(game.images[`point-cards/${randomSymbol(
                (Math.floor(game.time / 12)) % symbols.length
            )}`], x + 360, 30)
        }
        game.ctx.globalAlpha = 1
    }

    givePoints (number, item) {
        if (game.time < 300) {
            return false
        }
        if (item && item.position.x && item.position.y) {
            utils.drawSparks(item.position, number)
        } else {
            utils.drawSparks(game.player.position, number)
        }
        if (game.displayPoints > 0) {
            game.displayPoints = 500
            if (number < -300) {
                game.displayPoints = 750
            }
            game.points += number
            if (game.points < 0) {
                game.points = 0
            }
        } else {
            game.displayPoints = 500
            game.setTimer(() => {
                game.points += number
            }, 11)
        }
        if (number > 300) {
            game.displayPoints += number
        }
    }
}

let game = new Game ()
game.canvas = document.getElementsByTagName("canvas")[0]
game.ctx = game.canvas.getContext("2d")

game.play = () => {
    if (game.paused) {
        game.interval = setInterval(game.loop, 30)
        if (game.player) {
            game.player.spritePosition.x = game.player.position.x
            game.player.spritePosition.y = game.player.position.y
        }
        game.paused = false
    }
}

game.pause = () => {
    game.paused = true
    if (game.player) {
        game.player.adjacentItems = []
    }
    clearInterval(game.interval)
}

game.addToGrid = (item, x, y, elevation) => {
    if (game.grid[x]) {
        if (!game.grid[x][y]) {
            game.checkGrid(x, y)
        }
        if (!elevation) {
            let occupant = game.checkGrid(x, y)
            if (occupant && item) {
                let itemName = item
                if (item && item.name) {
                    itemName = item.name
                }
                // console.error(`Could not add ${itemName} to grid at ${x}, ${y}, already occupied by ${occupant.name}`)
                // console.log("Occupant:", occupant)
            } else {
                game.grid[x][y].occupant = item
            }
        } else if (elevation === "air") {
            game.grid[x][y].airOccupant = item
            if (item) { item.elevation = "air" }
        } else if (elevation === "ground") {
            game.grid[x][y].groundOccupant = item
            if (item) { item.elevation = "ground" }
        }
    } else {
        game.grid[x] = {}
        game.addToGrid(item, x, y)
    }
}

game.checkGrid = (x, y, square=false) => {
    if (game.grid[x]) {
        if (!game.grid[x][y]) {
            const distance = utils.distanceBetweenSquares(
                {x: 12, y: 17},
                {x: x, y: y}
            )
            game.grid[x][y] = new Square (
                distance >= 102 || (distance >= 100 && utils.dice(3) === 3)
            )
        }
        return square ? game.grid[x][y] : game.grid[x][y].occupant
    } else {
        game.grid[x] = {}
        return game.checkGrid(x, y, square)
    }
}

game.checkBounds = () => {
    if (!game.viewport.manual) {
        if (game.player.position.x >= game.viewport.newOrigin.x + game.viewport.width) {
            game.viewport.newOrigin.x += game.viewport.width
            game.updateResets()
        }
        if (game.player.position.x < game.viewport.newOrigin.x) {
            game.viewport.newOrigin.x -= game.viewport.width
            game.updateResets()
        }
        if (game.player.position.y >= game.viewport.newOrigin.y + game.viewport.height) {
            game.viewport.newOrigin.y += game.viewport.height
            game.updateResets()
        }
        if (game.player.position.y < game.viewport.newOrigin.y) {
            game.viewport.newOrigin.y -= game.viewport.height
            game.updateResets()
        }
    
        // console.log("x:", game.player.position.x - Math.round(game.viewport.origin.x))
        // console.log("y:", game.player.position.y - Math.round(game.viewport.origin.y))
    
        const roundedOrigin = {
            x: Math.round(game.viewport.origin.x / game.viewport.width) * game.viewport.width,
            y: Math.round(game.viewport.origin.y / game.viewport.height) * game.viewport.height
        }
    
        const playerDiff = {
            x: game.player.position.x - roundedOrigin.x,
            y: game.player.position.y - roundedOrigin.y
        }
    
        let noEdge = {
            x: true,
            y: true
        }
    
        if (playerDiff.x < 3) {
            noEdge.x = false
            game.viewport.newOrigin.x = roundedOrigin.x - (3 - playerDiff.x) * 1.5
            if (playerDiff.x < 0) {
                game.viewport.newOrigin.x -= game.viewport.width
            }
        }
        
        if (playerDiff.x > game.viewport.width - 4) {
            noEdge.x = false
            game.viewport.newOrigin.x = (roundedOrigin.x + (4 - (game.viewport.width - playerDiff.x)) * 1.5)
            if (playerDiff.x >= game.viewport.width) {
                game.viewport.newOrigin.x += game.viewport.width
            }
        }
    
        if (playerDiff.y < 2) {
            noEdge.y = false
            game.viewport.newOrigin.y = roundedOrigin.y - (2 - playerDiff.y) * 1.25
        }
        
        if (playerDiff.y > game.viewport.height - 3) {
            noEdge.y = false
            game.viewport.newOrigin.y = (roundedOrigin.y + (3 - (game.viewport.height - playerDiff.y)) * 1.25)
        }
        
        if (noEdge.x) {
            game.viewport.newOrigin.x = roundedOrigin.x
        }
    
        if (noEdge.y) {
            game.viewport.newOrigin.y = roundedOrigin.y
        }
    }

    const xDiff = Math.abs(game.viewport.origin.x - game.viewport.newOrigin.x)
    const yDiff = Math.abs(game.viewport.origin.y - game.viewport.newOrigin.y)

    if (game.viewport.origin.x < game.viewport.newOrigin.x) {
        game.viewport.accel.x = .04
    }
    if (game.viewport.origin.x > game.viewport.newOrigin.x) {
        game.viewport.accel.x = -.04
    }
    if (game.viewport.origin.y < game.viewport.newOrigin.y) {
        game.viewport.accel.y = .04
    }
    if (game.viewport.origin.y > game.viewport.newOrigin.y) {
        game.viewport.accel.y = -.04
    }

    game.viewport.speed.x += game.viewport.accel.x
    game.viewport.speed.y += game.viewport.accel.y

    if (xDiff < 5) {
        game.viewport.speed.x *= 0.85
    }

    if (yDiff < 5) {
        game.viewport.speed.y *= 0.85
    }

    if (game.viewport.speed.x > 5) {
        game.viewport.speed.x = 5
    } else if (game.viewport.speed.x < -5) {
        game.viewport.speed.x = -5
    }

    if (game.viewport.speed.y > 5) {
        game.viewport.speed.y = 5
    } else if (game.viewport.speed.y < -5) {
        game.viewport.speed.y = -5
    }

    game.viewport.origin.x += game.viewport.speed.x
    game.viewport.origin.y += game.viewport.speed.y

    if (xDiff < .2) {
        game.viewport.origin.x = game.viewport.newOrigin.x
        game.viewport.accel.x = 0
        game.viewport.speed.x = 0
    }
    
    if (yDiff < .2) {
        game.viewport.origin.y = game.viewport.newOrigin.y
        game.viewport.accel.y = 0
        game.viewport.speed.y = 0
    }
}

window.game = game
export { game }