import { Square } from './square.js';

import { setUpGameControls } from './controls.js';

class Game {
    constructor() {
        this.grid = {}
        this.images = {}
        this.viewport = {
            origin: {
                x: 0,
                y: 0
            },
            height: 12,
            width: 16,
            newOrigin: {
                x: 0,
                y: 0
            }
        }
        this.controls = setUpGameControls()
        this.displayHealth = 0
        this.time = 0
        this.nextId = 0
        this.tileSize = 120
        this.timerHash = {}
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

game.addToGrid = (item, x, y) => {
    if (game.grid[x]) {
        if (!game.grid[x][y]) {
            game.checkGrid(x, y)
        }
        game.grid[x][y].occupant = item
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
        game.checkGrid(x, y, square)
    }
}

window.game = game
export { game }