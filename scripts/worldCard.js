import { Entity } from './entity.js';

class WorldCard {
    constructor(grid, key) {
        this.grid = grid
        this.key = key
        this.addToWorld()
    }

    addToWorld (xOrigin, yOrigin) {
        for (let y = 0; y < this.grid.length; y++) {
            for (let x = 0; x < this.grid[0].length; x++) {
                let Ent = this.key[this.grid[y][x]]
                if (Ent) {
                    let newEnt = new Ent (xOrigin + x, yOrigin + y)
                    if (newEnt.name === "player") {
                        game.player = newEnt
                    }
                }
            }
        }
        this.pipeConnections(xOrigin, yOrigin)
    }

    pipeConnections (xOrigin, yOrigin) {
        for (let y = -1; y < this.grid.length + 1; y++) {
            for (let x = -1; x < this.grid[0].length + 1; x++) {
                const entity = game.checkGrid(x + xOrigin, y + yOrigin)
                if (entity && entity.pipeConnection) {
                    entity.pipeConnect()
                }
            }
        }
    }
}

export { WorldCard }