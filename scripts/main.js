import { Player } from './player.js'

import { game } from './game.js';
import { utils } from './utils.js';
import { temporaryWorldSetup } from './temporaryWorldSetup.js'
import { worldBuilder } from './worldBuilder.js'
import { imageLoader } from './imageLoader.js'

// temporaryWorldSetup()
worldBuilder.build()

const tileSize = game.tileSize

// Set canvas size
game.canvas.width = game.viewport.width * tileSize
game.canvas.height = game.viewport.height * tileSize

const fullscreenButton = document.getElementById("fullscreen-button")
const saveButton = document.getElementById("save-button")
const loadButton = document.getElementById("load-button")

fullscreenButton.onclick = () => {
    if(game.canvas.webkitRequestFullScreen) {
        game.canvas.webkitRequestFullScreen();
    } else {
        game.canvas.mozRequestFullScreen();
    }            
}

//!
function getAllProperties(obj) {
    let props = [];
    let currentObj = obj;
    do {
      props = props.concat(Object.getOwnPropertyNames(currentObj));
    } while ((currentObj = Object.getPrototypeOf(currentObj)));
    return props;
}

// game.setTimer(() => {
//     console.log("One second of time has passed.")
//     const playerOb = JSON.stringify(game.player, (key, value) => methodReplacer(key, value));
//     console.log("Here it is:")
//     console.log(playerOb)
// }, 30)

const methodReplacer = (key, value, checkedHash = {}) => {
    if (typeof value === "object" && value !== null && value.id) {
        value.constructorName = value.constructor.name
        return value
    } else {
        return value
    }
}
//!
// const methodReplacer = (key, value, visitedObjects = new Set()) => {
//     console.log("Method replacer:", key, value)
//     // Check for circular references
//     if (visitedObjects.has(value)) {
//         return '[Circular Reference]';
//     }
    
//     visitedObjects.add(value);

//     try {
//         if (typeof value === 'object' && value !== null) {
//             // Handle specific cases like DOM nodes or other non-serializable objects
//             if (value instanceof Node) {
//                 return '[DOM Node]';
//             }
//             // Optionally handle other specific cases like CSSStyleSheet or other non-serializable objects
            
//             const newObj = Array.isArray(value) ? [] : {};
//             const allKeys = getAllProperties(value)
//             for (const nestedKey of allKeys) {
//             // for (const nestedKey in value) {
//                 if (value.hasOwnProperty(nestedKey)) {
//                     if (typeof value[nestedKey] === 'function') {
//                         // Serialize function keys by including their key and name
//                         newObj[nestedKey] = {
//                             isFunctionKey: true,
//                             functionName: value[nestedKey].name
//                         };
//                     } else {
//                         // Recursively replace nested properties
//                         newObj[nestedKey] = methodReplacer(nestedKey, value[nestedKey], new Set(visitedObjects));
//                     }
//                 }
//             }
//             return newObj;
//         }
//     } catch (error) {
//         // Handle exceptions (e.g., DOMException)
//         return '[Error: Cannot access property]';
//     }

//     return value; // For primitive values like strings, numbers, etc.
// };
//!

saveButton.onclick = () => {
    // const saveGame = JSON.stringify(game, methodReplacer)
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
};

loadButton.onclick = () => {
    window.game.pause()

    setTimeout(() => {
        window.game.play()
    }, 1000)

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
            try {
                const contents = e.target.result
                let loadGame = JSON.parse(contents)
                window.bog = loadGame
                console.log(loadGame)
                loadGame = deserializeObject(loadGame)
            } catch (error) {
                console.error('Error reading the file:', error)
                alert('Error loading file.')
            }
        }

        reader.readAsText(file)
    }

    document.body.appendChild(input)
    input.click()
    input.remove()
};

// New loading idea:
// Create a new game.
// Assign old game's prevailingWind
// Assign old game's time
// Assign old game's tutorial
// deal with game.grid:
    // go through the whole thing of the old game's grid. Whenever you find anything with a constructorName property, construct a new one and add it to the new grid. Update all of its serialized properties (including id) to the old version's, without changing its functions
    // if it references other game objects (ie, rockGolem with a target), that might be a problem. Maybe that can be handled during serialization, by using an id instead then reconnecting
// deal with game.golemer
// deal with game.player
// game.play()

const deserializeObject = (object) => {
    for (const key in object) {
        if (Object.hasOwnProperty.call(object, key)) {
            if (typeof object[key] === "undefined") { // <-- check if it was a function
                console.log("Function:")
                console.log(key)
            }
            if (typeof object[key] === "object") {
                deserializeObject(object[key])
            }
        }
    }

    // grid
    // golemer
    // reload images
    // player
    // resetHash (clear?)
    // timerHash (clear?)
}

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

game.loop = () => {
    game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height);
    
    const width = game.viewport.width
    const height = game.viewport.height

    let updateHash = {}
    // updateHash[game.player.id] = game.player

    // base color:
    game.ctx.fillStyle = `rgb(190,170,95)`
    // game.ctx.fillStyle = `rgb(210,190,110)`
    // game.ctx.fillStyle = `rgb(220,200,130)`
    // game.ctx.fillStyle = `rgb(160,150,85)`

    game.ctx.fillRect(0, 0, tileSize * game.viewport.width, tileSize * game.viewport.height);

    for (let x = Math.round(game.viewport.origin.x - 1); x < Math.round(game.viewport.origin.x) + width + 2; x++) {
        for (let y = Math.round(game.viewport.origin.y - 1); y < Math.round(game.viewport.origin.y) + height + 2; y++) {
            let square = game.checkGrid(x, y, true)
            if (!square) {
                continue;
            }
            game.ctx.fillStyle = `rgba(90,140,50,${square.soilHealth})` // grass
            game.ctx.fillRect((x - game.viewport.origin.x) * tileSize, (y - game.viewport.origin.y) * tileSize, tileSize, tileSize);
            game.ctx.fillStyle = `rgba(60,45,90,${square.soilToxicity})` // poison
            game.ctx.fillRect((x - game.viewport.origin.x) * tileSize, (y - game.viewport.origin.y) * tileSize, tileSize, tileSize);
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
            if (entity) {
                if (updateHash[entity.id]) {
                    console.log("Doubled entities.")
                    console.log("1")
                    console.log(entity.name)
                    console.log(entity.id)
                    console.log(entity.position)
                    console.log("2")
                    console.log(updateHash[entity.id].name)
                    console.log(updateHash[entity.id].id)
                    console.log(updateHash[entity.id].position)
                    // entity.die()
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

    tutorialText()
    game.checkBounds()
}

const tutorialText = () => {
    let text = "Use the W, A, S, and D keys to move."
    if (game.time > 40 && game.time < 200) {
        game.ctx.font = "80px Pangolin";
        game.ctx.textAlign = "center"
        game.ctx.fillStyle = "#56cefd";
        game.ctx.fillText(text, canvas.width / 2, canvas.height / 2.2);
    }
}

const checkImageLoad = () => {
    if (loadedImages === totalImages) {
        game.play()
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
            }, 0)
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