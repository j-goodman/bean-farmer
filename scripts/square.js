class Square {
    constructor(plain=false) {
        this.occupant = null
        this.groundOccupant = null
        this.airOccupant = null
        this.soilHealth = Math.random() / 50
        this.soilToxicity = .36 + (Math.random() / 13)
        this.frozenness = 0
        if (plain) {
            this.soilHealth = 0
            this.soilToxicity = .2 + (Math.random() / 60)
        }
    }
}

export { Square }