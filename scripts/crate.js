import { Entity } from './entity.js';
import { Sprite } from './sprite.js';
import { WildOnion } from './wildOnion/wildOnion.js';
import { MushroomItem } from './mushroomItem.js';
import { SulfurCrystal } from './sulfurCrystal.js';
import { WildCornItem } from './wildCornItem.js';
import { ItemStack } from './itemStack.js';
import { Wood } from './wood.js';
import { Bomb } from './bomb.js';
import { WildOnionSeed } from './wildOnion/wildOnionSeed.js';

class Crate extends Entity {
    constructor(x, y) {
        super(x, y)
        this.imageName = "crate"
        this.sprite = new Sprite (this.imageName)
        this.pushability = 1.5
        this.burnability = 4
        this.breakability = 5
    }

    onCut () {
        this.die()
    }

    onDeath () {
        const drops = [
            WildOnion,
            WildOnion,
            SulfurCrystal,
            Bomb,
            Bomb,
            ItemStack,
        ]
        const DropItem = drops[Math.floor(Math.random() * drops.length)]
        let drop = null
        if (DropItem.name === "ItemStack") {
            drop = new ItemStack (
                this.position.x,
                this.position.y,
                Bomb,
                "bomb",
                3
            )
        } else {
            drop = new DropItem (this.position.x, this.position.y)
        }
        this.checkDrop(drop)
    }
}

game.constructors[Crate.name] = Crate
export { Crate }