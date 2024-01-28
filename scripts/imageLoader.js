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
    addImage("rock")
    addImage("corn-pink")
    
    // items
    addImage("emerald")
    addImage("sulfur-crystal")

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

    // chirons
    addImage("cursor")
    addImage("heart")
    addImage("item-screen/item-screen")
    addImage("chirons/item-pick-up")
    addImage("chirons/item-screen-open")
    addImage("chirons/f-key")

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
}

export { imageLoader }