class Square {
    constructor() {
        this.occupant = null
        this.groundOccupant = null
        this.airOccupant = null
        this.soilHealth = Math.random() / 50
        this.soilToxicity = .36 + (Math.random() / 13)
        this.frozenness = 0
    }
}

export { Square }