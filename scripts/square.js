class Square {
    constructor() {
        this.occupant = null
        this.groundOccupant = null
        this.airOccupant = null
        // this.soilHealth = Math.random() / 13
        this.soilHealth = Math.random() / 30
        // this.soilToxicity = Math.random() / 6
        this.soilToxicity = .29 + (Math.random() / 25)
        // this.soilToxicity = .5 + (Math.random() / 40)
        this.frozenness = 0
    }
}

export { Square }