import { pigCave } from './worldCards/pig-cave.js'

let worldBuilder = {}

worldBuilder.build = () => {
    worldBuilder.cards.forEach(card => {
        card.addToWorld(0, 0)
    })
}

worldBuilder.cards = [
    pigCave
]

export { worldBuilder }