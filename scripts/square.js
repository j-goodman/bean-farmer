class Square {
    constructor() {
        this.occupant = null
        this.groundOccupant = null
        this.airOccupant = null
        this.soilHealth = Math.random() / 13
        this.soilToxicity = Math.random() / 6
    }
}

export { Square }