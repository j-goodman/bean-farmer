const imageLoader = (addImage) => {
    // blob
    addImage("blob-down")
    addImage("blob-down-left-1")
    addImage("blob-down-left-2")
    addImage("blob-left")
    addImage("blob-left-up-1")
    addImage("blob-left-up-2")
    addImage("blob-up")
    addImage("blob-right-up-2")
    addImage("blob-right-up-1")
    addImage("blob-right")
    addImage("blob-down-right-2")
    addImage("blob-down-right-1")
    addImage("blob-hurt-1")
    addImage("blob-hurt-2")
    addImage("blob-red-flash")

    // terrain
    addImage("boulder")
    addImage("ore")
    addImage("ore-broken")
    addImage("rock")
    addImage("stump")
    addImage("wood")
    addImage("corn-pink")
    addImage("blank")

    // rocks
    addImage("rock-connections/URDL")
    addImage("rock-connections/URDL2")
    addImage("rock-connections/URDL3")
    addImage("rock-connections/RDL")
    addImage("rock-connections/UDL")
    addImage("rock-connections/URL")
    addImage("rock-connections/URD")
    addImage("rock-connections/DL")
    addImage("rock-connections/RD")
    addImage("rock-connections/RL")
    addImage("rock-connections/UD")
    addImage("rock-connections/UL")
    addImage("rock-connections/UR")
    addImage("rock-connections/U")
    addImage("rock-connections/R")
    addImage("rock-connections/D")
    addImage("rock-connections/L")
    addImage("rock-connections/X")
    
    // items
    addImage("emerald")
    addImage("ruby")
    addImage("sapphire")
    addImage("hatchet")
    addImage("sulfur-crystal")

    // cuts
    for (let i = 1; i <= 7; i++) {
        addImage(`cut/up-${i}`)
    }
    for (let i = 1; i <= 7; i++) {
        addImage(`cut/down-${i}`)
    }
    for (let i = 1; i <= 7; i++) {
        addImage(`cut/left-${i}`)
    }
    for (let i = 1; i <= 7; i++) {
        addImage(`cut/right-${i}`)
    }

    // wooly pig
    addImage("wooly-pig-up")
    addImage("wooly-pig-left-up-0")
    addImage("wooly-pig-left-up-1")
    addImage("wooly-pig-left-up-2")
    addImage("wooly-pig-left-up-3")
    addImage("wooly-pig-left-up-4")
    addImage("wooly-pig-right")
    addImage("wooly-pig-right-up-0")
    addImage("wooly-pig-right-up-1")
    addImage("wooly-pig-right-up-2")
    addImage("wooly-pig-right-up-3")
    addImage("wooly-pig-right-up-4")
    addImage("wooly-pig-down-right-1")
    addImage("wooly-pig-down-right-2")
    addImage("wooly-pig-down-right-3")
    addImage("wooly-pig-down")
    addImage("wooly-pig-left")
    addImage("wooly-pig-down-left-1")
    addImage("wooly-pig-down-left-2")
    addImage("wooly-pig-down-left-3")
    addImage("wooly-pig-carcass/1")
    addImage("wooly-pig-carcass/2")
    
    // dragon flower
    addImage("dragon-flower/down")
    addImage("dragon-flower/up")
    addImage("dragon-flower/left")
    addImage("dragon-flower/right")
    addImage("dragon-flower/mouth-open-down")
    addImage("dragon-flower/mouth-open-up-1")
    addImage("dragon-flower/mouth-open-up")
    addImage("dragon-flower/mouth-open-left")
    addImage("dragon-flower/mouth-open-right")
    addImage("dragon-flower/mouth-open-left-1")
    addImage("dragon-flower/mouth-open-left-2")
    addImage("dragon-flower/mouth-open-left-3")
    addImage("dragon-flower/mouth-open-right-1")
    addImage("dragon-flower/mouth-open-right-2")
    addImage("dragon-flower/mouth-open-right-3")
    addImage("dragon-flower/seed")
    addImage("dragon-flower/sprout/1")

    for (let i = 1; i <= 5; i++) {
        addImage(`dragon-flower/mouth-open-down-${i}`)
    }

    for (let i = 1; i <= 5; i++) {
        addImage(`dragon-flower/down-left-${i}`)
    }

    for (let i = 1; i <= 5; i++) {
        addImage(`dragon-flower/down-right-${i}`)
    }

    for (let i = 1; i <= 5; i++) {
        addImage(`dragon-flower/left-up-${i}`)
    }

    for (let i = 1; i <= 5; i++) {
        addImage(`dragon-flower/right-up-${i}`)
    }

    // chirons
    addImage("cursor")
    addImage("heart")
    addImage("item-screen/item-screen")
    addImage("item-screen/item-cursor")
    addImage("chirons/item-cursor-guide")
    addImage("chirons/item-pick-up")
    addImage("chirons/item-screen-open")
    addImage("chirons/item-equip")
    addImage("chirons/f-key")
    
    // plants
    addImage("wild-onion/sprout-1")
    addImage("wild-onion/sprout-2")
    addImage("wild-onion/sprout-3")
    addImage("wild-onion/sprout-4")
    addImage("wild-onion/seed")
    addImage("wild-onion/bulb")
    addImage("grass/sprout")
    addImage("grass/dead")
    addImage("grass/corngrass")
    addImage("grass/seed")
    addImage("grass/tile-1")
    addImage("grass/tile-2")
    addImage("grass/tile-3")
    addImage("grass/tile-4")


    for (let i = 1; i <= 10; i++) {
        addImage(`wooly-pig-attack-right/${i}`)
    }
    
    for (let i = 1; i <= 10; i++) {
        addImage(`wooly-pig-attack-left/${i}`)
    }
    
    for (let i = 1; i <= 10; i++) {
        addImage(`wooly-pig-attack-up/${i}`)
    }
    
    for (let i = 1; i <= 11; i++) {
        addImage(`wooly-pig-attack-down/${i}`)
    }
    
    for (let i = 1; i <= 12; i++) {
        addImage(`rock-break/${i}`)
    }
    
    for (let i = 0; i <= 10; i++) {
        addImage(`heart-burst/${i}`)
    }
    
    for (let i = 1; i <= 14; i++) {
        addImage(`blob-bubbles/${i}`)
    }

    for (let i = 1; i <= 10; i++) {
        addImage(`blob-killed/${i}`)
    }

    for (let i = 0; i <= 31; i++) {
        addImage(`fire/${i}`)
    }

    for (let i = 0; i <= 9; i++) {
        addImage(`fire-ignite/${i}`)
    }
}

export { imageLoader }