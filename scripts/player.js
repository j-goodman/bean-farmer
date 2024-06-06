import { Entity } from './entity.js';

import { game } from './game.js';
import { utils } from './utils.js';
import { chiron } from './chiron.js';
import { makePlayerSprite } from './sprites/playerSprite.js';

game.playerCount = 0

class Player extends Entity {
    constructor(x, y) {
        super(x, y)
        game.playerCount += 1
        console.log("Player count: ", game.playerCount)
        this.name = "player"
        this.spawnPosition = {x: x, y: y}
        this.imageName = "blob-right"
        this.baseMoveDelay = 6
        this.moveDelay = this.baseMoveDelay
        this.baseStrength = 3
        this.strength = this.baseStrength
        this.pushability = 3
        this.sprite = makePlayerSprite()
        this.direction = "down"
        this.sprite.version = this.direction
        this.maxHealth = 4
        this.health = this.maxHealth
        this.animal = true
        this.updateQueue = []
        this.items = []
        this.itemLimit = 24
        this.burnability = 1
        this.actionCooldown = 0
        this.equipped = null

        this.playAnimationOnce("spawn")
    }

    checkForItems () {
        const coordinates = [
            {x: 0, y: -1},
            {x: 1, y: 0},
            {x: 0, y: 1},
            {x: -1, y: 0}
        ]
        this.adjacentItem = false
        coordinates.forEach(coord => {
            let item = game.checkGrid(this.position.x + coord.x, this.position.y + coord.y)
            if (item && (item.pickupable || item.pluckable || item.interaction)) {
                this.drawCursor(coord.x, coord.y)
                if (game.tutorial.items.pickup > 0) {
                    if (game.tutorial.items.pickup > 2) {
                        chiron.itemPickupLong(this.position.x + coord.x, this.position.y + coord.y)
                    } else {
                        chiron.itemPickup(this.position.x + coord.x, this.position.y + coord.y)
                    }
                }
                this.adjacentItem = item
            }
        })
    }

    checkFacingSquare () {
        let { x, y } = utils.directionToCoordinates(this.direction)
        return game.checkGrid(this.position.x + x, this.position.y + y)
    }

    actionButton () {
        if (this.actionCooldown > 0) {
            return false
        }
        this.actionCooldown = 18
        if (this.adjacentItem) {
            if (this.adjacentItem.interaction) {
                this.adjacentItem.interaction()
            } else {
                this.pickUpItem(this.adjacentItem)
            }
        }
        if (!game.paused && !this.adjacentItem && this.actionCooldown > 0) {
            if (this.equipped && this.equipped.use) {
                this.equipped.use(this)
            } else if (this.equipped && !this.checkFacingSquare()) {
                this.dropItem()
            }
        }
    }

    dropItem () {
        let { x, y } = utils.directionToCoordinates(this.direction)
        x += this.position.x
        y += this.position.y
        this.removeFromInventory(this.equipped)
        this.equipped.position.x = this.equipped.spritePosition.x = x
        this.equipped.position.y = this.equipped.spritePosition.y = y
        game.addToGrid(this.equipped, x, y)
        this.equipped.pickedUp = false
        this.equipped.exists = true
        if (this.equipped.onDrop) {
            this.equipped.onDrop()
        }
        this.equipped = null
    }

    removeFromInventory (itemToRemove) {
        this.items = this.items.filter(item => {
            return item.id !== itemToRemove.id
        })
    }

    pickUpItem (item) {
        if (item.pluckable) {
            item.getPlucked(this)
        }
        if (this.items.length >= this.itemLimit) {
            return false
        }
        if (game.tutorial.items.pickup > 2) {
            game.setTimer(() => {
                chiron.openItemScreen()
            }, 60)
        }
        item.pickedUp = true
        game.tutorial.items.pickup = 
        game.tutorial.items.pickup > 0 ?
        game.tutorial.items.pickup - 1 :
        game.tutorial.items.pickup
        if (item.pickupable) {
            item.getPickedUp(this)
        }
    }

    drawCursor (x, y) {
        game.ctx.drawImage(game.images["cursor"], (this.position.x + x - game.viewport.origin.x) * game.tileSize, (this.position.y + y - game.viewport.origin.y) * game.tileSize, game.tileSize, game.tileSize)
    }

    burn () {
        if (this.onHit) { this.onHit() }
    }

    onHit (subject) {
        this.health -= 1
        game.displayHealth = 300
        
        if (this.health > 0) {
            this.playOverlayAnimation(this.sprite, "bubbles")
            if (this.direction !== "up") {
                this.playAnimationOnce("hurt")
            }
            for (let i = 0; i < 100; i++) {
                game.setTimer(() => {
                    game.ctx.globalAlpha = (100 - i) / 100;
                    if (i < 10) {
                        game.ctx.globalAlpha = i / 10;
                    }
                    if (game.player.health <= 0) {
                        game.ctx.globalAlpha = 0;
                    }
                    game.ctx.drawImage(game.images["blob-red-flash"], (this.spritePosition.x + this.spriteOffset.x - game.viewport.origin.x) * game.tileSize, (this.spritePosition.y + this.spriteOffset.y - game.viewport.origin.y) * game.tileSize, game.tileSize, game.tileSize)
                    game.ctx.globalAlpha = 1;
                }, i)
            }
        }

        if (this.health === 0) {
            this.health = -1
            this.playAnimationOnce("killed")
            game.setTimer(() => {
                this.die()
                game.setTimer(() => {
                    this.respawn()
                }, 80)
            }, 9)
        }
    }

    checkEdgePeek (x, y) {
        let onEdge = false
        let direction = {x: 0, y: 0}
        if (this.position.x === game.viewport.origin.x && x === -1) {
            onEdge = true
        } else if (this.position.x === game.viewport.origin.x + game.viewport.width - 1 && x === 1) {
            onEdge = true
        }
        if (this.position.y === game.viewport.origin.y && y === -1) {
            onEdge = true
        } else if (this.position.y === game.viewport.origin.y + game.viewport.height - 1 && y === 1) {
            onEdge = true
        }
        if (this.onMove) {
            return false
        }
        if (onEdge) {
            direction = {x: x, y: y}
            game.viewport.newOrigin.x += direction.x
            game.viewport.newOrigin.y += direction.y
            this.onMove = () => {
                game.setTimer(() => {
                    game.viewport.newOrigin.x -= direction.x
                    game.viewport.newOrigin.y -= direction.y
                }, Math.round(this.moveDelay))
                this.onMove = null
            }
        }
    }
    
    respawn (i = 0) {
        if (game.golemer) {
            if (
                !utils.isInViewport(game.golemer.spawnPosition) ||
                (
                    game.golemer.position.x === game.golemer.spawnPosition.x &&
                    game.golemer.position.y === game.golemer.spawnPosition.y
                ) || (
                    utils.distanceBetweenSquares(game.golemer.position, game.golemer.spawnPosition > 20)
                )
            ) {
                game.golemer.teleport(game.golemer.spawnPosition.x, game.golemer.spawnPosition.y)
            } else {
                game.setTimer(() => {
                    if (game.player.health <= 0) {
                        game.golemer.teleport(game.golemer.spawnPosition.x, game.golemer.spawnPosition.y)
                        game.player.respawn()
                    }
                }, 400)
                game.golemer.walkTo(game.golemer.spawnPosition, () => {
                    game.golemer.facing = "right"
                    game.golemer.sprite.changeVersion(game.golemer.facing)
                    game.player.respawn()
                })
                return false;
            }
            this.playAnimationOnce("spawn")
            game.golemer.walkToWork()
        }

        this.exists = true
        this.position.x = this.spritePosition.x = this.spawnPosition.x
        this.position.y = this.spritePosition.y = this.spawnPosition.y
        
        this.health = this.maxHealth
        
        let obstacle = game.checkGrid(this.position.x, this.position.y)
        if (obstacle) {
            const directions = [
                {x: 0, y: -1}, {x: 1, y: 0}, {x: -1, y: 0}, {x: 0, y: 1}
            ]
            if (i < directions.length) {
                let success = obstacle.move(directions[i].x, directions[i].y)
                if (!success) {
                    i++
                }
            } else {
                game.addToGrid(null, this.position.x, this.position.y)
            }
            game.setTimer(() => {
                this.respawn(i)
            }, 5)
        } else {
            game.addToGrid(this, this.position.x, this.position.y)
        }
    }

    update () {
        this.frameUpdate()
        this.checkForItems()

        if (this.exists && game.checkGrid(this.position.x, this.position.y) !== this) {
            console.log("Object missing from grid, adding...")
            console.log(this)
            game.checkGrid(this.position.x, this.position.y, true).occupant = false
            game.addToGrid(this, this.position.x, this.position.y)
        }

        const diagonal = this.spritePosition.x !== this.position.x && this.spritePosition.y !== this.position.y
        this.actionCooldown = this.actionCooldown > 0 ? this.actionCooldown - 1 : 0
        if (diagonal) {
            this.moveDelay = Math.floor(this.baseMoveDelay * 1.65)
        } else {
            this.moveDelay = this.baseMoveDelay
        }

        while (this.updateQueue.length) {
            this.updateQueue.shift()()
        }

        const posX = this.position.x
        const posY = this.position.y

        if (this.equipped && this.equipped.holdUpdate) {
            this.equipped.holdUpdate(this)
        }

        if (this.spritePosition.x === this.position.x &&
            this.spritePosition.y === this.position.y) {
            if (game.controls.right) {
                this.direction = "right"
                this.updateQueue.push(() => {
                    this.move(1, 0)
                })
            } else if (game.controls.left) {
                this.direction = "left"
                this.updateQueue.push(() => {
                    this.move(-1, 0)
                })
            }
            if (game.controls.down) {
                this.direction = "down"
                this.updateQueue.push(() => {
                    this.move(0, 1)
                })
            } else if (game.controls.up) {
                this.direction = "up"
                this.updateQueue.push(() => {
                    this.move(0, -1)
                })
            }

            this.update4DirectionSprite()
        }
    }
}

export { Player }