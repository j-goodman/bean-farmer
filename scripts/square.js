class Square {
    constructor() {
        this.occupant = null
        this.groundOccupant = null
        this.airOccupant = null
        this.soilHealth = Math.random() / 3
        this.soilToxicity = Math.random() / 4
    }
}

export { Square }