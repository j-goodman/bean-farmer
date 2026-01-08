class Square {
    constructor(plain=false) {
        this.occupant = null
        this.groundOccupant = null
        this.airOccupant = null
        this.soilHealth = Math.random() / 50
        this.soilToxicity = .38 + (Math.random() / 20)
        this.frozenness = 0
        if (plain) {
            this.soilHealth = 0
            this.soilToxicity = 1.96 + (Math.random() / 25)
        }
    }
}

export { Square }