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

class Square {
    constructor() {
        this.occupant = null
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
        this.speed = (1/10)
        this.strength = 1
        this.pushability = 7
        this.breakability = 7
        this.direction = "down"
        this.movable = true
        this.birthday = game.time
        addToGrid(this, x, y)
    }

    move (x, y) {
        let obstacle = checkGrid(this.position.x + x, this.position.y + y)
        if (!obstacle) {
            addToGrid(null, this.position.x, this.position.y)
            this.position.x += x
            this.position.y += y
            addToGrid(this, this.position.x, this.position.y)
            return true
        } else {
            if (obstacle.pushability <= this.strength && obstacle.pushability < obstacle.breakability) {
                this.push(obstacle, x, y)
            }
            if (obstacle.breakability <= this.strength) {
                obstacle.break(this, x, y)
            }
            return false
        }
    }

    push (obstacle, x, y) {
        obstacle.speed = this.speed
        obstacle.strength = this.strength * 0.75
        let success = obstacle.move(x, y)
        if (success) {
            this.move(x, y)
        }
    }

    break (breaker, x, y) {
        if (this.onBreak) {
            this.onBreak(breaker, x, y)
        }
        this.die()
    }

    update () {
        if (this.movable) {
            this.frameUpdate()
        }
    }

    updateSprite () {
        let image = this.sprite[this.direction]
        if (image) {
            this.imageName = this.sprite[this.direction]
        } else {
            console.error(`Can't find '${this.direction}' sprite for: `, this)
        }
    }

    die () {
        game.grid[this.position.x][this.position.y].occupant = null
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
            this.spritePosition.x += this.speed
        } else if (this.spritePosition.x > this.position.x) {
            this.spritePosition.x -= this.speed
        }

        let yBlock = false
        if (diagonal) {
            if (
                checkGrid(this.position.x - xDirection, this.position.y) ||
                checkGrid(this.position.x, this.position.y - yDirection)
            ) {
                yBlock = true
            }
        }

        if (!yBlock) {
            if (this.spritePosition.y < this.position.y) {
                this.spritePosition.y += this.speed
            } else if (this.spritePosition.y > this.position.y) {
                this.spritePosition.y -= this.speed
            }
        }

        this.spritePosition.x = Math.round(this.spritePosition.x / this.speed) * this.speed
        this.spritePosition.y = Math.round(this.spritePosition.y / this.speed) * this.speed
    }
}

class Player extends Entity {
    constructor(imageName, x, y) {
        super(imageName, x, y)
        this.speed = (1/9)
        this.strength = 3
        this.pushability = 3
        this.sprite = {
            up: "blob-up",
            right: "blob-right",
            down: "blob-down",
            left: "blob-left"
        }
    }

    update () {
        this.frameUpdate()
        // if (this.spritePosition.x !== this.position.x && this.spritePosition.y !== this.position.y) {
        //     this.speed = (1/13)
        // } else {
        //     this.speed = (1/9)
        // }

        const posX = this.position.x
        const posY = this.position.y

        if (this.spritePosition.x === this.position.x &&
            this.spritePosition.y === this.position.y &&
            !this.moveCooldown) {
            if (game.controls.right) {
                this.move(1, 0)
                this.direction = "right"
            } else if (game.controls.left) {
                this.move(-1, 0)
                this.direction = "left"
            }
            if (game.controls.down) {
                this.direction = "down"
                this.move(0, 1)
            } else if (game.controls.up) {
                this.direction = "up"
                this.move(0, -1)
            }
            this.updateSprite()
        }
    }
}

const randomRotate = (direction) => {
    let directions = ["up", "right", "down", "left"]
    let current = directions.indexOf(direction)
    let next = current + ((Math.floor(Math.random() * 2)) ? -1 : 1)
    next = next > 3 ? 0 : next
    next = next < 0 ? 3 : next
    return directions[next]
}

class WoolyPig extends Entity {
    constructor(imageName, x, y) {
        imageName = "wooly-pig-left"
        super(imageName, x, y)
        this.speed = (1/18)
        this.strength = 5
        this.pushability = 5
        this.direction = "left"
        this.moveCooldown = 1
    }

    update (age) {
        this.frameUpdate()
        this.moveCooldown -= this.moveCooldown ? 1 : 0
        const posX = this.position.x
        const posY = this.position.y
        if (!this.moveCooldown) {
            if (!((age + 26) % 150)) {
                this.moveCooldown = 1
                this.direction = randomRotate(this.direction)
                this.imageName = "wooly-pig-" + this.direction
            }

            if (!((age + 1) % 50)) {
                this.moveCooldown = 6
                let x = 0
                let y = 0
                if (this.direction === "left" || this.direction === "right") {
                    x = this.direction === "left" ? -1 : 1
                } else {
                    y = this.direction === "up" ? -1 : 1
                }
                this.move(x, y)
            }
        }
    }
}

const addToGrid = (item, x, y) => {
    if (game.grid[x]) {
        if (!game.grid[x][y]) {
            checkGrid(x, y)
        }
        game.grid[x][y].occupant = item
    } else {
        game.grid[x] = {}
        addToGrid(item, x, y)
    }
}

const checkGrid = (x, y) => {
    if (game.grid[x]) {
        if (!game.grid[x][y]) {
            game.grid[x][y] = new Square ()
        }
        return game.grid[x][y].occupant
    } else {
        game.grid[x] = {}
        checkGrid(x, y)
    }
}

class Boulder extends Entity {
    constructor(imageName, x, y) {
        super(imageName, x, y)
        this.pushability = 2
    }
}

class Ore extends Entity {
    constructor(imageName, x, y) {
        super(imageName, x, y)
        this.pushability = 3
        this.breakability = 2
    }

    onBreak (breaker, x, y) {
        if (breaker) {
            breaker.move(-x, -y)
        }
    }
}

const game = new Game ()
game.canvas = document.getElementsByTagName("canvas")[0]
game.ctx = game.canvas.getContext("2d")

game.player = new Player ("blob-down", 3, 3)
new Entity ("rock", 4, 6)
new Entity ("rock", 5, 6)
new Entity ("rock", 6, 6)
new Entity ("rock", 8, 6)
new Entity ("rock", 9, 6)
new Entity ("rock", 9, 5)
new Entity ("rock", 9, 4)
new Entity ("rock", 9, 2)
new Entity ("rock", 9, 1)
for (let i = 32; i > -46; i--) {
    new Entity ("rock", 9, i)
    if (!Math.floor(Math.random() * 15)) {
        new Entity ("rock", 11, i)
    }
    if (!Math.floor(Math.random() * 12)) {
        new Ore ("ore", 9, i)
    }
    if (!Math.floor(Math.random() * 9)) {
        new Entity ("rock", 8, i)
    }
}

new Boulder ("boulder", 3, 5)
new Boulder ("boulder", 4, 4)
new Boulder ("boulder", 5, 2)
new Boulder ("boulder", 6, 4)
new Boulder ("boulder", 7, 3)

new Ore ("ore", 0, 6)

let firstPig = new WoolyPig ("wooly-pig-left", 13, 2)
let secondPig = new WoolyPig ("wooly-pig-left", 14, 3)
new WoolyPig ("wooly-pig-left", 15, 1)
firstPig.birthday = 0 - (Math.floor(Math.random() * 1000))
secondPig.birthday = 0 - (Math.floor(Math.random() * 1000))

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

addImage("blob-down")
addImage("blob-up")
addImage("blob-left")
addImage("blob-right")
addImage("select-box")
addImage("rock")
addImage("boulder")
addImage("ore")
addImage("wooly-pig-up")
addImage("wooly-pig-right")
addImage("wooly-pig-down")
addImage("wooly-pig-left")

const gameLoop = () => {
    game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);
    
    const width = game.viewport.width
    const height = game.viewport.height
    
    for (let x = game.viewport.origin.x - width; x < game.viewport.origin.x + width; x++) {
        for (let y = game.viewport.origin.y - height; y < game.viewport.origin.y + height; y++) {
            let entity = checkGrid(x, y)
            if (entity) {
                imageName = checkGrid(x, y).imageName
                entity.update(game.time - entity.birthday)
                game.ctx.drawImage(images[imageName], (entity.spritePosition.x - game.viewport.origin.x) * tileSize, (entity.spritePosition.y - game.viewport.origin.y) * tileSize, tileSize, tileSize)
            }
        }
    }

    game.time += 1

    tutorialText()
    checkBounds()
}

const tutorialText = () => {
    if (game.time > 40 && game.time < 200) {
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