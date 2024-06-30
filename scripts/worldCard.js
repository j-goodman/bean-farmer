import { Entity } from './entity.js';

class WorldCard {
    constructor(grid, key) {
        this.grid = grid
        this.key = key
    }

    addToWorld (xOrigin, yOrigin) {
        let signCount = 0
        for (let y = 0; y < this.grid.length; y++) {
            for (let x = 0; x < this.grid[0].length; x++) {
                let Ent = this.key[this.grid[y][x]]
                if (Ent) {
                    let newEnt = new Ent (xOrigin + x, yOrigin + y)
                    if (newEnt.name === "sign" || newEnt.name === "bookshelf") {
                        newEnt.text = this.signs[signCount]
                        signCount += 1
                    }
                    if (newEnt.name === "player" && !game.player) {
                        game.player = newEnt
                    }
                }
                if (this.floor) {
                    const floor = new this.floor (xOrigin + x, yOrigin + y, "ground")
                }            
            }
        }
        game.setTimer(() => {
            this.pipeConnections(xOrigin, yOrigin)
        }, 0)
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
}

game.constructors[WorldCard.name] = WorldCard
export { WorldCard }