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
        }
    }
}

class Entity {
    constructor(x, y) {
        this.position = {
            x: x,
            y: y
        }
        this.imageName = "red-ball"
        addToGrid(this, x, y)
    }
}

const addToGrid = (item, x, y) => {
    if (game.grid[x]) {
        game.grid[x][y] = item
    } else {
        game.grid[x] = {}
        addToGrid(item, x, y)
    }
}

const checkGrid = (x, y) => {
    if (game.grid[x]) {
        return game.grid[x][y]
    } else {
        game.grid[x] = {}
        checkGrid()
    }
}

const game = new Game ()
game.canvas = document.getElementsByTagName("canvas")[0]
game.ctx = game.canvas.getContext("2d")
game.player = new Entity (3, 3)

const tileSize = 32

// Set canvas size
game.canvas.width = game.viewport.width * tileSize
game.canvas.height = game.viewport.height * tileSize

const images = {}
let totalImages = 0
let loadedImages = 0

const addImage = (name) => {
    const img = new Image()
    img.src = `./assets/${name}.png`
    totalImages += 1
    images[name] = img
    img.onload = () => {
        loadedImages += 1
        checkImageLoad()
    }
}

addImage("red-ball")
addImage("select-box")

const gameLoop = () => {
    drawGrid()
}

const drawGrid = () => {
    for (let x = 0; x < game.viewport.width; x++) {
        for (let y = 0; y < game.viewport.height; y++) {
            let imageName = "select-box"
            if (checkGrid(x, y) && checkGrid(x, y).imageName) {
                imageName = checkGrid(x, y).imageName
            }
            game.ctx.drawImage(images[imageName], x * tileSize, y * tileSize, tileSize, tileSize)
        }
    }
}

const checkImageLoad = () => {
    if (loadedImages === totalImages) {
        setInterval(gameLoop, 30)
    }
}