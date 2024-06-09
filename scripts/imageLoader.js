const addURDLImages = (addImage, folder) => {
    addImage(`${folder}/URDL`)
    addImage(`${folder}/RDL`)
    addImage(`${folder}/UDL`)
    addImage(`${folder}/URL`)
    addImage(`${folder}/URD`)
    addImage(`${folder}/DL`)
    addImage(`${folder}/RD`)
    addImage(`${folder}/RL`)
    addImage(`${folder}/UD`)
    addImage(`${folder}/UL`)
    addImage(`${folder}/UR`)
    addImage(`${folder}/U`)
    addImage(`${folder}/R`)
    addImage(`${folder}/D`)
    addImage(`${folder}/L`)
    addImage(`${folder}/X`)
}

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
    addImage("sign")
    addImage("blank")
    addImage("firepot-unlit")
    addImage("firepot-lit")
    addImage("crate")
    addImage("cauldron")
    addImage("orb-table-unlit")
    addImage("orb-table-lit")
    addImage("bookshelf")
    addImage("locked-door")
    addImage("floor-tile/floor-tile-1")
    addImage("floor-tile/floor-tile-2")

    for (let i = 1; i <= 4; i++) {
        addImage(`orb-table-transition/${i}`)
    }
    
    // rocks
    addURDLImages(addImage, "rock-connections")
    addImage("rock-connections/URDL2")
    addImage("rock-connections/URDL3")
    
    // bricks
    addURDLImages(addImage, "red-brick")
    addImage("red-brick/fill")
    
    // items
    addImage("emerald")
    addImage("ruby")
    addImage("sapphire")
    addImage("hatchet")
    addImage("sulfur-crystal")

    // people
    // addImage("golemer-up")
    // addImage("golemer-right")
    // addImage("golemer-down")
    // addImage("golemer-left")

    // golemer
    for (let i = 1; i <= 12; i++) {
        addImage(`golemer/${i}`)
    }

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
    
    for (let i = 1; i <= 19; i++) {
        addImage(`dragon-flower/sprout/${i}`)
    }

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

    for (let i = 1; i <= 12; i++) {
        addImage(`firepot-fire/${i}`)
    }

    for (let i = 1; i <= 4; i++) {
        addImage(`locked-door/${i}`)
    }
    
    addImage(`locked-door/overlay`)

    // chirons
    addImage("cursor")
    addImage("heart")
    addImage("sign-text-background")
    addImage("item-screen/item-screen")
    addImage("item-screen/item-cursor")
    addImage("chirons/item-cursor-guide")
    addImage("chirons/item-pick-up")
    addImage("chirons/item-screen-open")
    addImage("chirons/item-equip")
    addImage("chirons/f-key")
    addImage("speech-bubble")
    
    // plants
    addImage("wild-onion/sprout-1")
    addImage("wild-onion/sprout-2")
    addImage("wild-onion/sprout-3")
    addImage("wild-onion/sprout-4")
    addImage("wild-onion/seed")
    addImage("wild-onion/bulb")
    addImage("wild-corn")
    addImage("wild-corn-seed")
    addImage("wild-corn-item")
    addImage("grass/sprout")
    addImage("grass/dead")
    addImage("grass/corngrass")
    addImage("grass/seed")
    addImage("grass/tile-1")
    addImage("grass/tile-2")
    addImage("grass/tile-3")
    addImage("grass/tile-4")
    addImage("mushroom")
    addImage("mushroom-item")

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

    for (let i = 1; i <= 29; i++) {
        addImage(`blob-spawn/${i}`)
    }

    for (let i = 0; i <= 31; i++) {
        addImage(`fire/${i}`)
    }

    for (let i = 0; i <= 9; i++) {
        addImage(`fire-ignite/${i}`)
    }
}

export { imageLoader }