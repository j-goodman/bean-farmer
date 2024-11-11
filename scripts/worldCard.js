import { Entity } from './entity.js';
import { utils } from './utils.js';

class WorldCard {
    constructor(grid, key) {
        this.grid = grid
        this.key = key
        this.entities = []
        this.variants = []
    }

    addToWorld (xOrigin, yOrigin) {
        let signCount = 0
        if (!this.noRotate) {
            if (!this.rotateOnlyVertically && utils.dice(2) === 2) {
                this.grid = utils.invertMatrix(this.grid, "horizontal")
            }
            if (!this.rotateOnlyHorizontally && utils.dice(2) === 2) {
                this.grid = utils.invertMatrix(this.grid, "vertical")
                if (this.signs) {
                    this.signs = this.signs.reverse()
                }
            }
        }
        for (let y = 0; y < this.grid.length; y++) {
            for (let x = 0; x < this.grid[0].length; x++) {
                let Ent = this.key[this.grid[y][x]]

                let obstruction = game.checkGrid(xOrigin + x, yOrigin + y)
                if (obstruction) {
                    obstruction.die()
                }
                if (Ent) {
                    let newEnt = new Ent (xOrigin + x, yOrigin + y)
                    this.entities.push(newEnt)
                    if (newEnt.name === "sign" || newEnt.name === "bookshelf") {
                        newEnt.text = this.signs[signCount]
                        signCount += 1
                    }
                    if (newEnt.name === "golemer") {
                        console.log("Golemer!")
                    }
                    if (newEnt.name === "player" && !game.player) {
                        game.player = newEnt
                    }
                }
                if (this.floor) {
                    if (
                        !this.floorBounds ||
                        (
                            x > this.floorBounds[0].x &&
                            y > this.floorBounds[0].y &&
                            x < this.floorBounds[1].x &&
                            y < this.floorBounds[1].y
                        )
                    ) {
                        const floor = new this.floor (xOrigin + x, yOrigin + y, "ground")
                    }
                }            
            }
        }
        game.setTimer(() => {
            this.pipeConnections(xOrigin, yOrigin)
        }, 0)
        this.assignVariants(this.variantsAll)
    }

    pipeConnections (xOrigin, yOrigin) {
        for (let y = -1; y < this.grid.length + 1; y++) {
            for (let x = -1; x < this.grid[0].length + 1; x++) {
                let entity = game.checkGrid(x + xOrigin, y + yOrigin)
                if (entity && entity.pipeConnection) {
                    entity.pipeConnect()
                }

                const elevations = ["ground", "air"]
                for (const elevation of elevations) {
                    entity = game.checkGrid(x + xOrigin, y + yOrigin, true)[`${elevation}Occupant`]

                    if (entity && entity.pipeConnection) {
                        entity.pipeConnect()
                    }
                }
            }
        }
    }

    writeSigns (messages) {
        this.signs = messages
    }

    setVariants (name, variants, all=false) {
        this.variants.push({name: name, variants: variants})
        this.variantsAll = all
    }

    assignVariants (all=false) {
        this.variants.forEach(variant => {
            let variantIndex = 0
            this.entities.forEach(entity => {
                if (entity.name === variant.name) {
                    entity.setVariant(variant.variants[variantIndex])
                    if (!all) {
                        variantIndex += 1
                    }
                }
            })
        })
    }
    
    lightFirepots () {
        game.setTimer(() => {
            this.entities.forEach(entity => {
                if (entity.name === "firepot") {
                    entity.burn()
                }
            })
        }, 60)
    }

    addGroundItems (GroundItem, overItemName) {
        game.setTimer(() => {
            this.entities.forEach(entity => {
                if (entity.name === overItemName) {
                    new GroundItem (entity.position.x, entity.position.y, "ground")
                }
            })
        }, 0)
    }
}

game.constructors[WorldCard.name] = WorldCard
export { WorldCard }