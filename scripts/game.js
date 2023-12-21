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
    }
}

setUpGameControls = () => {
    controls = {}
    controls.left = false
    controls.right = false
    controls.up = false
    controls.down = false
    window.addEventListener("keydown", event => {
        if (event.key === "d") {
            controls.right = true
        }
        if (event.key === "a") {
            controls.left = true
        }
        if (event.key === "s") {
            controls.down = true
        }
        if (event.key === "w") {
            controls.up = true
        }
    });
    window.addEventListener("keyup", event => {
        if (event.key === "d") {
            controls.right = false
        }
        if (event.key === "a") {
            controls.left = false
        }
        if (event.key === "s") {
            controls.down = false
        }
        if (event.key === "w") {
            controls.up = false
        }
    });
    return controls
}

class Entity {
    constructor (imageName, x, y) {
        this.position = {
            x: x,
            y: y
        }
        this.spritePosition = {
            x: x,
            y: y
        }
        this.imageName = imageName
        this.speed = .1
        this.movable = true
        addToGrid(this, x, y)
    }

    move (x, y) {
        if (!checkGrid(this.position.x + x, this.position.y + y)) {
            addToGrid(null, this.position.x, this.position.y)
            this.position.x += x
            this.position.y += y
            addToGrid(this, this.position.x, this.position.y)
        }
    }

    update () {
        if (this.movable) {
            this.frameUpdate()
        }
    }

    frameUpdate () {
        if (this.spritePosition.x < this.position.x) {
            this.spritePosition.x += this.speed
        } else if (this.spritePosition.x > this.position.x) {
            this.spritePosition.x -= this.speed
        }
        if (this.spritePosition.y < this.position.y) {
            this.spritePosition.y += this.speed
        } else if (this.spritePosition.y > this.position.y) {
            this.spritePosition.y -= this.speed
        }
        this.spritePosition.x = Math.round(this.spritePosition.x / this.speed) * this.speed
        this.spritePosition.y = Math.round(this.spritePosition.y / this.speed) * this.speed
    }
}

class Player extends Entity {
    constructor(imageName, x, y) {
        super(imageName, x, y);
        this.speed = .2
    }

    update () {
        this.frameUpdate()
        if (this.spritePosition.x !== this.position.x && this.spritePosition.y !== this.position.y) {
            this.speed = 0.125
        } else {
            this.speed = 0.2
        }

        const posX = this.position.x
        const posY = this.position.y

        if (this.spritePosition.x === this.position.x &&
            this.spritePosition.y === this.position.y) {
            if (game.controls.right) {
                this.move(1, 0)
            } else if (game.controls.left) {
                this.move(-1, 0)
            }

            if (game.controls.down && !checkGrid(posX, posY + 1)) {
                this.move(0, 1)
            } else if (game.controls.up && !checkGrid(posX, posY - 1)) {
                this.move(0, -1)
            }
        }
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

game.player = new Player ("red-ball", 3, 3)
new Entity ("grey-box", 4, 6)
new Entity ("grey-box", 5, 6)
new Entity ("grey-box", 6, 6)
new Entity ("grey-box", 8, 6)
new Entity ("grey-box", 9, 6)
new Entity ("grey-box", 9, 5)
new Entity ("grey-box", 9, 4)
new Entity ("grey-box", 9, 2)
new Entity ("grey-box", 9, 1)

const tileSize = 120

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
addImage("grey-box")

const gameLoop = () => {
    game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);
    
    const width = game.viewport.width
    const height = game.viewport.height
    
    for (let x = game.viewport.origin.x - width; x < width + width; x++) {
        for (let y = game.viewport.origin.y - height; y < height + height; y++) {
            let entity = checkGrid(x, y)
            if (entity) {
                imageName = checkGrid(x, y).imageName
                game.ctx.drawImage(images[imageName], (entity.spritePosition.x - game.viewport.origin.x) * tileSize, (entity.spritePosition.y - game.viewport.origin.y) * tileSize, tileSize, tileSize)
                entity.update()
            }
        }
    }

    tutorialText()
    checkBounds()

    game.time += 1
}

const tutorialText = () => {
    if (game.time > 60 && game.time < 220) {
        game.ctx.font = "60px Courier";
        game.ctx.fillStyle = "#fff";
        game.ctx.fillText("Use the W, A, S, and D keys to move.", 350, canvas.height / 2.2);
    }
}

const checkBounds = () => {
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
    }
    if (game.viewport.origin.x > game.viewport.newOrigin.x) {
        game.viewport.origin.x -= 1
    }
    if (game.viewport.origin.y < game.viewport.newOrigin.y) {
        game.viewport.origin.y += 1
    }
    if (game.viewport.origin.y > game.viewport.newOrigin.y) {
        game.viewport.origin.y -= 1
    }
}

const checkImageLoad = () => {
    if (loadedImages === totalImages) {
        setInterval(gameLoop, 30)
    }
}