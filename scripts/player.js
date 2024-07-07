import { Entity } from './entity.js';
import { Key } from './key.js';
import { ItemStack } from './itemStack.js';

import { game } from './game.js';
import { utils } from './utils.js';
import { chiron } from './chiron.js';
import { makePlayerSprite } from './sprites/playerSprite.js';

game.playerCount = 0

class Player extends Entity {
    constructor(x, y) {
        super(x, y)
        game.playerCount += 1
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
        this.slidable = true
        this.updateQueue = []
        this.items = []
        this.stacks = {}
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

    checkStackRefill (usedItem) {
        for (const item of this.items) {
            if (item.name === usedItem.name) {
                this.equipped = item
                break
            }
        }
    }

    actionButton () {
        if (this.actionCooldown > 0 || this.frozen) {
            return false
        }
        this.actionCooldown = 7
        if (this.adjacentItem) {
            if (this.adjacentItem.interaction) {
                this.adjacentItem.interaction(this)
            } else {
                this.pickUpItem(this.adjacentItem)
                this.actionCooldown = 0
            }
        }
        if (!game.paused && !this.adjacentItem && this.actionCooldown > 0) {
            let item = this.equipped
            if (item && item.use) {
                item.use(this)
                if (this.equipped === null) {
                    this.checkStackRefill(item)
                }
            } else if (item && !this.checkFacingSquare()) {
                this.dropItem()
                this.checkStackRefill(item)
            }
        }
    }

    dropItem () {
        let { x, y } = utils.directionToCoordinates(this.direction)
        x += this.position.x
        y += this.position.y
        const item = this.equipped
        this.equipped.position.x = this.equipped.spritePosition.x = x
        this.equipped.position.y = this.equipped.spritePosition.y = y
        game.addToGrid(this.equipped, x, y)
        const dropped = game.checkGrid(x, y)
        if (dropped && dropped.name === item.name) {
            this.removeFromInventory(this.equipped)
            this.equipped.pickedUp = false
            this.equipped.exists = true
            if (this.equipped.onDrop) {
                this.equipped.onDrop()
            }
            this.equipped = null
        }
    }

    removeFromInventory (itemToRemove) {
        this.items = this.items.filter(item => {
            return item.id !== itemToRemove.id
        })
    }

    // inventorySize () {
    //     let stacks = {}
    //     this.items.forEach(item => {
    //         if (!stacks[item.name]) {
    //             stacks[item.name] = true
    //         }
    //     })
    //     return Object.keys(stacks).length
    // }

    pickUpItem (item) {
        if (item.pluckable) {
            item.getPlucked(this)
        }
        if (Object.keys(this.stacks).length >= this.itemLimit) {
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

        if (item.name === "boomerang") {
            this.equipped = item
        }
    }

    drawCursor (x, y) {
        game.ctx.drawImage(game.images["cursor"], (this.position.x + x - game.viewport.origin.x) * game.tileSize, (this.position.y + y - game.viewport.origin.y) * game.tileSize, game.tileSize, game.tileSize)
    }

    burn () {
        if (this.onHit) { this.onHit() }
    }

    onCut () {
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
            }, 5)
        }
    }

    onDeath () {
        this.equipped = null
        let keyCount = 0
        this.items.forEach(item => {
            if (item.name === "key") {
                this.removeFromInventory(item)
                keyCount += 1
            }
        })
        if (keyCount === 1) {
            this.checkDrop(new Key ())
        } else if (keyCount > 1) {
            this.checkDrop(
                new ItemStack (
                    this.position.x,
                    this.position.y,
                    Key,
                    "key",
                    keyCount
                )
            )
        }
        this.respawn()
        game.setTimer(() => {
            game.viewport.newOrigin = {x: 0, y: 0}
            this.position.x = this.spawnPosition.x
            this.position.y = this.spawnPosition.y
        }, 50)
    }

    // checkEdgePeek (x, y) {
    //     let onEdge = false
    //     let direction = {x: 0, y: 0}
    //     if (this.position.x === game.viewport.origin.x && x === -1) {
    //         onEdge = true
    //     } else if (this.position.x === game.viewport.origin.x + game.viewport.width - 1 && x === 1) {
    //         onEdge = true
    //     }
    //     if (this.position.y === game.viewport.origin.y && y === -1) {
    //         onEdge = true
    //     } else if (this.position.y === game.viewport.origin.y + game.viewport.height - 1 && y === 1) {
    //         onEdge = true
    //     }
    //     if (this.onMove) {
    //         return false
    //     }
    //     if (onEdge) {
    //         direction = {x: x, y: y}
    //         game.viewport.newOrigin.x += direction.x
    //         game.viewport.newOrigin.y += direction.y
    //         this.onMove = () => {
    //             game.setTimer(() => {
    //                 game.viewport.newOrigin.x -= direction.x
    //                 game.viewport.newOrigin.y -= direction.y
    //             }, Math.round(this.moveDelay))
    //             this.onMove = null
    //         }
    //     }
    // }
    
    respawn (i = 0, automatic=false) {
        if (game.golemer && !automatic) {
            if (
                false &&
                !utils.isInViewport(game.golemer.spawnPosition) ||
                (
                    game.golemer.position.x === game.golemer.spawnPosition.x &&
                    game.golemer.position.y === game.golemer.spawnPosition.y
                ) || (
                    utils.distanceBetweenSquares(game.golemer.position, game.golemer.spawnPosition > 20)
                )
            ) {
                // game.golemer.teleport(game.golemer.spawnPosition.x, game.golemer.spawnPosition.y)
            } else {
                game.setTimer(() => {
                    if (!game.player.exists) {
                        console.log("Failsafe.")
                        game.player.respawn(0, true)
                    } else {
                    }
                }, 400)
                let considerGoing = () => {
                    if (game.golemer.currentAction) {
                        game.setTimer(() => {
                            considerGoing()
                        }, 40)
                        return false
                    }
                    const success = game.golemer.walkTo(game.golemer.spawnPosition, () => {
                        game.golemer.facing = "right"
                        game.golemer.sprite.changeVersion("3")
                        game.player.respawn()
                    })
                }
                considerGoing()
                return false;
            }
            this.playAnimationOnce("spawn")
            game.golemer.walkToWork()
        }

        if (this.exists) {
            this.die()
        }
        
        this.exists = true
        this.health = this.maxHealth
        this.position.x = this.spritePosition.x = this.spawnPosition.x
        this.position.y = this.spritePosition.y = this.spawnPosition.y
        this.direction = "down"
        this.equipped = null
        this.playAnimationOnce("spawn")
        
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
                if (automatic) {
                    obstacle.die()
                }
                this.respawn(i)
            }, 5)
        } else {
            game.addToGrid(this, this.position.x, this.position.y)
        }
    }
    
    checkIfMoving () {
        return (
            game.controls.up > 4 ||
            game.controls.right > 4 ||
            game.controls.down > 4 ||
            game.controls.left > 4
        )
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
            this.spritePosition.y === this.position.y &&
            !this.sliding) {
            if (game.controls.right) {
                game.controls.right += 1
                if (
                    game.controls.right > 4 ||
                    this.checkIfMoving() ||
                    this.sprite.image === `blob-right`
                ) {
                    this.updateQueue.push(() => {
                        this.move(1, 0)
                    })
                }
                this.direction = "right"
            } else if (game.controls.left) {
                game.controls.left += 1
                if (
                    game.controls.left > 4 ||
                    this.checkIfMoving() ||
                    this.sprite.image === `blob-left`
                ) {
                    this.updateQueue.push(() => {
                        this.move(-1, 0)
                    })
                }
                this.direction = "left"
            }
            if (game.controls.down) {
                game.controls.down += 1
                if (
                    game.controls.down > 4 ||
                    this.checkIfMoving() ||
                    this.sprite.image === `blob-down`
                ) {
                    this.updateQueue.push(() => {
                        this.move(0, 1)
                    })
                }
                this.direction = "down"
            } else if (game.controls.up) {
                game.controls.up += 1
                if (
                    game.controls.up > 4 ||
                    this.checkIfMoving() ||
                    this.sprite.image === `blob-up`
                ) {
                    this.direction = "up"
                    this.updateQueue.push(() => {
                        this.move(0, -1)
                    })
                }
                this.direction = "up"
            }
            this.update4DirectionSprite()
        } else {
            if (game.controls.right) {
                this.direction = "right"
            } else if (game.controls.left) {
                this.direction = "left"
            }
            if (game.controls.down) {
                this.direction = "down"
            } else if (game.controls.up) {
                this.direction = "up"
            }
            this.update4DirectionSprite()
        }
    }
}

game.constructors[Player.name] = Player
export { Player }