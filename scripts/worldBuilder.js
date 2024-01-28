import { pigCave } from './worldCards/pig-cave.js'
import { flowerCave } from './worldCards/flower-cave.js'

let worldBuilder = {}

worldBuilder.build = () => {
    worldBuilder.cards.forEach((card, i) => {
        card.addToWorld(0, i * 18)
    })
}

worldBuilder.cards = [
    pigCave,
    flowerCave,
]

export { worldBuilder }