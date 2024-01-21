import { Square } from './square.js';

import { setUpGameControls } from './controls.js';

class Game {
    constructor() {
        this.grid = {}
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
        this.time = 0
        this.nextId = 0
        this.timerHash = {}
    }

    assignId() {
        this.nextId += 1
        return this.nextId
    }

    setTimer (event, time) {
        if (!time) {
            console.error("Timer set with no time given.")
            return false
        }
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

game.checkGrid = (x, y) => {
    if (game.grid[x]) {
        if (!game.grid[x][y]) {
            game.grid[x][y] = new Square ()
        }
        return game.grid[x][y].occupant
    } else {
        game.grid[x] = {}
        game.checkGrid(x, y)
    }
}

export { game }