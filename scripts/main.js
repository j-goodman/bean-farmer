import { Player } from './player.js'

import { game } from './game.js';
import { utils } from './utils.js';
import { temporaryWorldSetup } from './temporaryWorldSetup.js'
import { worldBuilder } from './worldBuilder.js'
import { imageLoader } from './imageLoader.js'
import { intro } from './intro.js';

// temporaryWorldSetup()
worldBuilder.build()

const tileSize = game.tileSize

// Set canvas size
game.canvas.width = game.viewport.width * tileSize
game.canvas.height = game.viewport.height * tileSize

const fullscreenButton = document.getElementById("fullscreen-button")
game.audioTag = document.getElementById("audio-tag")
const saveButton = document.getElementById("save-button")
const loadButton = document.getElementById("load-button")

fullscreenButton.onclick = () => {
    if(game.canvas.webkitRequestFullScreen) {
        game.canvas.webkitRequestFullScreen();
    } else {
        game.canvas.mozRequestFullScreen();
    }            
}

function getAllProperties(obj) {
    let props = [];
    let currentObj = obj;
    do {
      props = props.concat(Object.getOwnPropertyNames(currentObj));
    } while ((currentObj = Object.getPrototypeOf(currentObj)));
    return props;
}

const methodReplacer = (key, value, checkedHash = {}) => {
    if (typeof value === "object" && value !== null && value.id) {
        value.constructorName = value.constructor.name
        return value
    } else {
        return value
    }
}

saveButton.onclick = () => {
    const saveGame = JSON.stringify(game, (key, value) => methodReplacer(key, value));
    const blob = new Blob([saveGame], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)

    const a = document.createElement('a')
    a.style.display = 'none'
    a.href = url
    a.download = 'bean-farmer-save.json'

    document.body.appendChild(a)
    a.click()

    document.body.removeChild(a)
    URL.revokeObjectURL(url)
}

const loadGameGrid = (loadGame) => {
    game.grid = {}
    game.timerHash = {}
    game.player = null
    game.nextId = loadGame.nextId
    game.prevailingWind = loadGame.prevailingWind
    game.time = loadGame.time
    game.world = loadGame.world

    for (let x in loadGame.grid) {
        x = parseInt(x)
        for (let y in loadGame.grid[x]) {
            y = parseInt(y)
            if (loadGame.grid[x]) {
                let square = loadGame.grid[x][y]
                if (square) {
                    let entity = square.occupant
                    if (entity) {
                        const Constructor = game.constructors[entity.constructorName]
                        const newEntity = new Constructor (x, y, entity.elevation, entity.dna)
                        if (newEntity.pipeConnection) {
                            game.setTimer(() => {
                                newEntity.connectNeighbors()
                            }, 0)
                        }
                        if (entity.spawnPosition) {
                            newEntity.spawnPosition = entity.spawnPosition
                        }
                        // if (entity.name === "golemer") {
                        //     game.golemer = newEntity
                        // }
                        if (entity.name === "player") {                            
                            newEntity.health = entity.health
                            newEntity.maxHealth = entity.maxHealth
                            newEntity.direction = entity.direction
                            newEntity.sprite.changeVersion(newEntity.direction)
                            
                            entity.items.forEach(item => {
                                const ItemConstructor = game.constructors[item.constructorName]
                                const newItem = new ItemConstructor (item.position.x, item.position.y, item.elevation, item.dna)
                                game.setTimer(() => {
                                    newEntity.pickUpItem(newItem)
                                    if (entity.equipped && item.id === entity.equipped.id) {
                                        newEntity.equipped = newItem
                                    }
                                }, 0)
                            })

                            game.player = newEntity
                        } else {
                            for (const key in entity) {
                                if (["boolean", "number", "string"].includes(typeof entity[key])) {
                                    newEntity[key] = entity[key]
                                }
                            }
                        }
                    }

                    let groundEntity = square.groundOccupant
                    if (groundEntity) {
                        const Constructor = game.constructors[groundEntity.constructorName]
                        const newEntity = new Constructor (x, y, groundEntity.elevation, groundEntity.dna)
                    }
                    
                    let airEntity = square.airOccupant
                    if (airEntity) {
                        const Constructor = game.constructors[airEntity.constructorName]
                        const newEntity = new Constructor (x, y, airEntity.elevation, airEntity.dna)
                    }
                }
            }
        }
    }
}

loadButton.onclick = () => {
    window.game.pause()

    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.json'
    input.style.display = 'none'

    input.onchange = (event) => {
        const file = event.target.files[0]
        
        if (!file) {
            return false
        }
        
        const reader = new FileReader()
        
        reader.onload = (e) => {
            let loadGame = null
            try {
                const contents = e.target.result
                loadGame = JSON.parse(contents)
            } catch (error) {
                console.error('Error reading the file:', error)
                alert('Error loading file.')
            }
            if (loadGame) {
                loadGameGrid(loadGame)
                setTimeout(() => {
                    window.game.play()
                }, 500)
            }
        }

        reader.readAsText(file)
    }

    document.body.appendChild(input)
    input.click()
    input.remove()
}

// const deserializeObject = (object) => {
//     for (const key in object) {
//         if (Object.hasOwnProperty.call(object, key)) {
//             if (typeof object[key] === "undefined") { // <-- check if it was a function
//                 console.log("Function:")
//                 console.log(key)
//             }
//             if (typeof object[key] === "object") {
//                 deserializeObject(object[key])
//             }
//         }
//     }

//     // grid
//     // golemer
//     // reload images
//     // player
//     // resetHash (clear?)
//     // timerHash (clear?)
// }

if (fullscreenButton) {
    fullscreenButton.style.top = (canvas.getBoundingClientRect().y + 25) + "px"
    fullscreenButton.style.right = (
        window.innerWidth -
        canvas.getBoundingClientRect().x -
        canvas.getBoundingClientRect().width +
        25
    ) + "px"
}

let totalImages = 0
let loadedImages = 0

const addImage = (name) => {
    const img = new Image()
    img.src = `./assets/${name}.png`
    totalImages += 1
    game.images[name] = img
    img.onload = () => {
        loadedImages += 1
        checkImageLoad()
    }
}

imageLoader(addImage)

class Color {
    constructor (red, green, blue) {
        this.red = red
        this.green = green
        this.blue = blue
    }

    mixIn(amount, newColor) {
        amount = Math.max(0, Math.min(amount, 1))
        
        this.red = Math.round(this.red * (1 - amount) + newColor.red * amount)
        this.green = Math.round(this.green * (1 - amount) + newColor.green * amount)
        this.blue = Math.round(this.blue * (1 - amount) + newColor.blue * amount)
        
        this.red = Math.max(0, Math.min(255, this.red))
        this.green = Math.max(0, Math.min(255, this.green))
        this.blue = Math.max(0, Math.min(255, this.blue))
    }

    rgb () {
        return `rgb(${this.red},${this.green},${this.blue})`
    }

    rgba (alpha) {
        return `rgb(${this.red},${this.green},${this.blue},${alpha})`
    }
}

game.loop = () => {
    game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height)
    
    const width = game.viewport.width
    const height = game.viewport.height

    let updateHash = {}
    // updateHash[game.player.id] = game.player

    // base color:
    // const baseColor = new Color(190, 170, 95)
    // const baseColor = new Color(200, 180, 80)
    const baseColor = new Color(210, 190, 90)
    // const baseColor = new Color(255, 255, 255)
    const healthySoil = new Color(80, 130, 50)
    const toxicSoil = new Color(60, 45, 90)
    const snowySoil = new Color(230, 245, 255)
    game.ctx.fillStyle = baseColor.rgb()
    // game.ctx.fillStyle = `rgb(210,190,110)`
    // game.ctx.fillStyle = `rgb(220,200,130)`
    // game.ctx.fillStyle = `rgb(160,150,85)`

    game.ctx.fillRect(0, 0, tileSize * game.viewport.width, tileSize * game.viewport.height)

    for (let x = Math.round(game.viewport.origin.x - 1); x < Math.round(game.viewport.origin.x) + width + 2; x++) {
        for (let y = Math.round(game.viewport.origin.y - 1); y < Math.round(game.viewport.origin.y) + height + 2; y++) {
            let square = game.checkGrid(x, y, true)
            const tileColor = new Color (baseColor.red, baseColor.green, baseColor.blue)
            if (!square) {
                continue;
            }
            tileColor.mixIn(square.soilHealth / 1.25, healthySoil)
            tileColor.mixIn(square.soilToxicity / 1.25, toxicSoil)
            tileColor.mixIn(square.frozenness / 1.25, snowySoil)

            game.ctx.fillStyle = tileColor.rgb()
            game.ctx.fillRect((x - game.viewport.origin.x) * tileSize, (y - game.viewport.origin.y) * tileSize, tileSize, tileSize)
        }
    }

    let groundDrawQueue = []
    let airDrawQueue = []
    let drawQueue = []
    
    for (let x = Math.round(game.viewport.origin.x) - width * 3; x < Math.round(game.viewport.origin.x) + width * 6; x++) {
        for (let y = Math.round(game.viewport.origin.y) - height * 3; y < Math.round(game.viewport.origin.y) + height * 6; y++) {
            let square = game.checkGrid(x, y, true)
            let entity = square.occupant
            let groundEntity = square.groundOccupant
            let airEntity = square.airOccupant
            
            if (square.frozenness) {
                game.setTimer(() => {
                    game.ctx.fillStyle = `rgba(230,245,255,${square.frozenness})` // frost
                    game.ctx.fillRect((x - game.viewport.origin.x) * tileSize, (y - game.viewport.origin.y) * tileSize, tileSize, tileSize)
                }, 0)
                if (square.frozenness > 1) {
                    square.frozenness = 1    
                } else if (square.frozenness < 0) {
                    square.frozenness = 0
                }
                if (square.frozenness > .65) {
                    square.frozenness -= .01
                } else if (square.frozenness > .5 && (game.time % 40 === 0)) {
                    square.frozenness -= .01
                } else if (game.time % 200 === 0) {
                    square.frozenness -= .01
                }
            }

            if (entity) {
                if (updateHash[entity.id]) {
                    console.log("Doubled entities.")
                    console.log(x, y)
                    // console.log("1")
                    console.log(entity.name)
                    // console.log(entity.id)
                    // console.log(entity.position)
                    // console.log("2")
                    // console.log(updateHash[entity.id].name)
                    // console.log(updateHash[entity.id].id)
                    // console.log(updateHash[entity.id].position)
                }
                updateHash[entity.id] = entity
                drawQueue.push({
                    entity: entity,
                    x: x,
                    y: y
                })
                if (entity.reset) {
                    game.resetHash[entity.id] = entity
                }
            }
            if (groundEntity) {
                updateHash[groundEntity.id] = groundEntity
                groundDrawQueue.push({
                    entity: groundEntity,
                    x: x,
                    y: y
                })
            }
            if (airEntity) {
                updateHash[airEntity.id] = airEntity
                airDrawQueue.push({
                    entity: airEntity,
                    x: x,
                    y: y
                })
            }
        }
    }

    groundDrawQueue.forEach(entry => {
        drawEntity(entry.entity, entry.x, entry.y)
    })
    
    drawQueue.forEach(entry => {
        drawEntity(entry.entity, entry.x, entry.y)
    })

    airDrawQueue.forEach(entry => {
        drawEntity(entry.entity, entry.x, entry.y)
    })

    if (game.displayHealth > 0) {
        game.setTimer(() => {
            game.drawHealth()
        }, 0)
    }

    game.checkTimer()
    game.time += 1
    game.displayHealth = game.displayHealth > 0 ?
    game.displayHealth - 1 : game.displayHealth

    for (const id in updateHash) {
        let entity = updateHash[id]
        if (entity.update) {
            entity.update(game.time - entity.birthday)
        }
    }

    game.setTimer(() => {
        tutorialText()
    }, 30 * 9)
    if (game.player) {
        game.checkBounds()
    }
}

const tutorialText = () => {
    let text = "Use the W, A, S, and D keys to move."
    if (game.time > 40 && game.time < 30 * 17) {
        game.ctx.font = "80px Pangolin";
        game.ctx.textAlign = "center"
        game.ctx.fillStyle = "#56cefd";
        game.ctx.fillText(text, canvas.width / 2, canvas.height / 2.2);
    }
}

const checkImageLoad = () => {
    if (loadedImages === totalImages) {
        intro()
    }
}

const drawEntity = (entity, x, y) => {
    const sprite = entity.sprite
    let imageName = sprite.image
    if (entity.name === "fire" && entity.fuel <= 1) {
        game.ctx.globalAlpha = .5 + Math.random() / 3
    }
    if (entity.immobile) {
        entity.spritePosition = {
            x: entity.position.x, y: entity.position.y
        }
    }
    try {
        if (!imageName) {
            imageName = sprite.defaultImage
        }
        if (entity.imageAngle) {
            utils.drawRotatedImage(game.images[imageName], (entity.spritePosition.x + entity.spriteOffset.x - game.viewport.origin.x) * tileSize, (entity.spritePosition.y + entity.spriteOffset.y - game.viewport.origin.y) * tileSize, tileSize, tileSize, entity.imageAngle)
        } else {
            game.ctx.drawImage(game.images[imageName], (entity.spritePosition.x + entity.spriteOffset.x - game.viewport.origin.x) * tileSize, (entity.spritePosition.y + entity.spriteOffset.y - game.viewport.origin.y) * tileSize, tileSize, tileSize)
        }
        if (sprite.overlay) {
            let expansionFactor = 2
            let fillOffset = 1
            if (entity.lockable) {
                expansionFactor = 1
                fillOffset = 0
            }
            if (!entity.overlayOffset) {
                entity.overlayOffset = {x: 0, y: 0}
            }
            game.setTimer(() => {
                if (!sprite.overlay) {
                    return false
                }
                game.ctx.drawImage(
                    game.images[sprite.overlay],
                    ((entity.spritePosition.x - fillOffset + entity.spriteOffset.x - game.viewport.origin.x) * tileSize) + entity.overlayOffset.x,
                    ((entity.spritePosition.y - fillOffset + entity.spriteOffset.y - game.viewport.origin.y) * tileSize) + entity.overlayOffset.y,
                    tileSize * expansionFactor,
                    tileSize * expansionFactor
                )
            }, 0, true)
        }
    } catch {
        console.error(`Image error:`, imageName)
        console.log(entity)
        console.log(entity.sprite)
        console.log("entity.sprite.version:", entity.sprite.version)
        console.log(game.images[imageName])
    }
    game.ctx.globalAlpha = 1
    game.setTimer(() => {
        if (entity.overlayExists) {
            if (!entity.overlayHeight) {
                entity.overlayHeight = 1
            }
            if (!entity.overlayWidth) {
                entity.overlayWidth = 1
            }
            if (!entity.overlayOffset) {
                entity.overlayOffset = {x: 0, y: 0}
            }
            game.ctx.drawImage(
                game.images[entity.overlay[entity.overlayCycle]],
                (entity.spritePosition.x + entity.spriteOffset.x - game.viewport.origin.x) * tileSize + entity.overlayOffset.x,
                (entity.spritePosition.y + entity.spriteOffset.y - game.viewport.origin.y) * tileSize + entity.overlayOffset.y,
                tileSize * entity.overlayWidth,
                tileSize * entity.overlayHeight
            )
            entity.overlayCycle += 1
            if (entity.overlayCycle >= entity.overlay.length) {
                if (entity.overlayLoop) {
                    entity.overlayCycle = 0
                } else {
                    entity.overlayExists = false
                }
            }
        }
    }, 0)
    if (entity.overlayMethod && typeof entity.overlayMethod === "function") {
        entity.overlayMethod()
    }
    if (entity.equipped) {
        utils.drawEquipped(entity)
    }
    if (Array.isArray(sprite.versions[sprite.version])) {
        sprite.frame += 1 // Should be based on frame rate multiplier
        sprite.image = sprite.versions[sprite.version][sprite.frame]
        if (sprite.frame >= sprite.versions[sprite.version].length) {
            sprite.frame = 0
            if (sprite.onAnimationFinish) {
                sprite.inTransition = false
                sprite.onAnimationFinish()
                sprite.onAnimationFinish = null
            }
        }
    }
}