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
    addImage("trade-rug")
    addImage("crystallizer/0")
    addImage("crystallizer/1")
    addImage("crystallizer/2")
    addImage("crystallizer/3")
    addImage("crystallizer/4")
    addImage("crystallizer/5")
    addImage("pine-tree")
    addImage("cactus")
    addImage("cactus-sprout")
    addImage("prickly-pear")
    addImage("left-rib")
    addImage("right-rib")

    for (let i = 1; i <= 4; i++) {
        addImage(`orb-table-transition/${i}`)
    }

    for (let i = 1; i <= 16; i++) {
        addImage(`sawmill/${i}`)
    }
    
    // rocks
    addURDLImages(addImage, "rock-connections")
    addImage("rock-connections/URDL2")
    addImage("rock-connections/URDL3")
    
    // stone wall
    addURDLImages(addImage, "stone-wall")
    addURDLImages(addImage, "stone-wall/broken")
    
    // fence
    addURDLImages(addImage, "fence")
    addImage("fencepost")
    
    // ice
    addURDLImages(addImage, "ice-sheet")
    
    // ocean
    addURDLImages(addImage, "ocean")
    addImage("ocean/fill")
    
    // bricks
    addImage("brick")
    addURDLImages(addImage, "red-brick")
    addImage("red-brick/fill")
    addURDLImages(addImage, "dark-brick")
    
    // items
    addImage("emerald")
    addImage("ruby")
    addImage("sapphire")
    addImage("hatchet")
    addImage("key")
    addImage("sulfur-crystal")
    addImage("smoky-quartz")
    addImage("bomb")
    addImage("powder-bomb")
    addImage("boomerang")
    addImage("telescope")
    addImage("lamp")
    addImage("magic-cup")
    addImage("burning-sword")

    addImage("lockbox")
    for (let i = 1; i <= 16; i++) {
        addImage(`lockbox-open/${i}`)
    }

    addImage("tomb")
    addImage("cracked-tomb")
    addImage("floor-slab")
    addImage("human-bones")
    
    addImage("tomb-statue/inert")
    addImage("tomb-statue/damage-1")
    addImage("tomb-statue/damage-2")
    for (let i = 1; i <= 13; i++) {
        addImage(`tomb-statue/eye-light/${i}`)
    }

    for (let i = 1; i <= 12; i++) {
        addImage(`eye-statues/red/${i}`)
    }

    for (let i = 1; i <= 12; i++) {
        addImage(`eye-statues/green/${i}`)
    }

    for (let i = 1; i <= 12; i++) {
        addImage(`eye-statues/blue/${i}`)
    }

    for (let i = 1; i <= 12; i++) {
        addImage(`falling-block/${i}`)
    }
    
    addImage("crystal-key")
    for (let i = 1; i <= 16; i++) {
        addImage(`crystal-lockbox/${i}`)
    }

    // people
    // golemer
    for (let i = 1; i <= 12; i++) {
        addImage(`golemer/${i}`)
    }
    // bommaker
    for (let i = 1; i <= 12; i++) {
        addImage(`bommaker/${i}`)
    }

    for (let i = 1; i <= 29; i++) {
        addImage(`cauldron-smoke/${i}`)
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
    addImage("bone-shards")
    
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
    addImage("red-onion/sprout-1")
    addImage("red-onion/sprout-2")
    addImage("red-onion/sprout-3")
    addImage("red-onion/sprout-4")
    addImage("red-onion/seed")
    addImage("red-onion/bulb")
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
    addImage("mushroom-shield")
    addImage("mushroom-shield-2")
    addImage("pig-lily")
    addImage("pig-lily-item")
    addImage("lily-seed")

    // spikes
    addImage(`spike-controller`)
    addImage(`spike-controller-1`)
    addImage(`spike-controller-2`)
    for (let i = 1; i <= 12; i++) {
        addImage(`spikes/${i}`)
    }

    // rock golem
    for (let i = 1; i <= 12; i++) {
        addImage(`rock-golem/${i}`)
    }
    addImage(`rock-golem/dormant`)
    addImage(`rock-golem/stone-blade`)

    // wood golem
    for (let i = 1; i <= 12; i++) {
        addImage(`wood-golem/${i}`)
    }
    for (let i = 1; i <= 12; i++) {
        addImage(`wood-golem/stumped/${i}`)
    }
    for (let i = 1; i <= 12; i++) {
        addImage(`shield/${i}`)
    }
    addImage(`gold-axe`)

    // snow golem
    for (let i = 1; i <= 12; i++) {
        addImage(`snow-golem/${i}`)
    }
    for (let i = 1; i <= 13; i++) {
        addImage(`snow-golem-burst/${i}`)
    }
    for (let i = 1; i <= 8; i++) {
        addImage(`snow-golem-spawn/${i}`)
    }
    addImage(`ice-blade`)
    
    // meteor crash
    addImage(`big-meteor-crystal-1`)
    addImage(`big-meteor-crystal-2`)
    addImage(`big-meteor-crystal-3`)
    addImage(`big-meteor-crystal-4`)
    addImage(`medium-meteor-ore`)
    addImage(`small-meteor-ore`)
    addImage(`meteor-crystal`)
    
    for (let i = 1; i <= 12; i++) {
        addImage(`blue-eye/${i}`)
    }
    
    for (let i = 1; i <= 12; i++) {
        addImage(`red-eye/${i}`)
    }
    
    for (let i = 1; i <= 20; i++) {
        addImage(`lightburst/${i}`)
    }
    
    // snow snail
    for (let i = 1; i <= 12; i++) {
        addImage(`snow-snail/${i}`)
    }
    for (let i = 1; i <= 18; i++) {
        addImage(`snail-egg-hatch/${i}`)
    }
    addImage(`snow-snail/shell`)
    addImage(`snail-egg`)
    for (let i = 1; i <= 3; i++) {
        addImage(`snow-snail/retract/up-${i}`)
    }
    for (let i = 1; i <= 3; i++) {
        addImage(`snow-snail/retract/right-${i}`)
    }
    for (let i = 1; i <= 3; i++) {
        addImage(`snow-snail/retract/down-${i}`)
    }
    for (let i = 1; i <= 3; i++) {
        addImage(`snow-snail/retract/left-${i}`)
    }

    // ice blast
    for (let i = 1; i <= 22; i++) {
        addImage(`ice-blast/${i}`)
    }
    
    // ice block
    addImage(`ice-block`)
    for (let i = 1; i <= 24; i++) {
        addImage(`ice-block-break/${i}`)
    }

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