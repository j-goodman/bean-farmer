import { Square } from './square.js';

import { setUpGameControls } from './controls.js';

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
            }
        }
        this.controls = setUpGameControls()
        this.paused = true
        this.displayHealth = 0
        this.time = 0
        this.nextId = 0
        this.tileSize = 120
        this.timerHash = {}
        this.prevailingWind = "right"
        this.tutorial = {
            items: {
                pickup: 3,
                menu: 1,
                menuNavigation: 2,
                equip: 3,
            }
        }
    }

    assignId() {
        this.nextId += 1
        return this.nextId
    }

    setTimer (event, time) {
        if (!time && time !== 0) {
            console.error("Timer set with no time given.")
            return false
        }
        time = time === 0 ? 1 : time
        let deadline = this.time + time
        this.timerHash[deadline] = this.timerHash[deadline] ? this.timerHash[deadline] : []
        this.timerHash[deadline].push(event)
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
            game.ctx.drawImage(game.images["heart"], x, 10)
            x -= 124
        }
        game.ctx.globalAlpha = 1
    }
}

const game = new Game ()
game.canvas = document.getElementsByTagName("canvas")[0]
game.ctx = game.canvas.getContext("2d")

game.play = () => {
    if (game.paused) {
        game.interval = setInterval(game.loop, 30)
        game.paused = false
    }
}
game.pause = () => {
    game.paused = true
    game.player.adjacentItem = null
    clearInterval(game.interval)
}

game.addToGrid = (item, x, y, elevation) => {
    if (game.grid[x]) {
        if (!game.grid[x][y]) {
            game.checkGrid(x, y)
        }
        if (!elevation) {
            game.grid[x][y].occupant = item
        } else if (elevation === "air") {
            game.grid[x][y].airOccupant = item
            if (item) { item.elevation = "air" }
        } else if (elevation === "ground") {
            game.grid[x][y].groundOccupant = item
            if (ground) { item.elevation = "ground" }
        }
    } else {
        game.grid[x] = {}
        game.addToGrid(item, x, y)
    }
}

game.checkGrid = (x, y, square=false) => {
    if (game.grid[x]) {
        if (!game.grid[x][y]) {
            game.grid[x][y] = new Square ()
        }
        return square ? game.grid[x][y] : game.grid[x][y].occupant
    } else {
        game.grid[x] = {}
        return game.checkGrid(x, y, square)
    }
}

game.checkBounds = () => {
    if (game.player.position.x >= game.viewport.newOrigin.x + game.viewport.width) {
        game.viewport.newOrigin.x += game.viewport.width
    }
    if (game.player.position.x < game.viewport.newOrigin.x) {
        game.viewport.newOrigin.x -= game.viewport.width
    }
    if (game.player.position.y >= game.viewport.newOrigin.y + game.viewport.height) {
        game.viewport.newOrigin.y += game.viewport.height
    }
    if (game.player.position.y < game.viewport.newOrigin.y) {
        game.viewport.newOrigin.y -= game.viewport.height
    }

    if (game.viewport.origin.x < game.viewport.newOrigin.x) {
        game.viewport.origin.x += 1
        game.updateWorldGrid()
    }
    if (game.viewport.origin.x > game.viewport.newOrigin.x) {
        game.viewport.origin.x -= 1
        game.updateWorldGrid()
    }
    if (game.viewport.origin.y < game.viewport.newOrigin.y) {
        game.viewport.origin.y += 1
        game.updateWorldGrid()
    }
    if (game.viewport.origin.y > game.viewport.newOrigin.y) {
        game.viewport.origin.y -= 1
        game.updateWorldGrid()
    }
}

window.game = game
export { game }