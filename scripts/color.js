class Color {
    constructor (red, green, blue) {
        this.red = red
        this.green = green
        this.blue = blue
    }

    mixIn(amount, newColor) {
        amount = Math.max(0, Math.min(amount, 1))
        
        this.red = Math.round(this.red * (1 - amount) + newColor.red * amount)
        this.green = Math.round(this.green * (1 - amount) + newColor.green * amount)
        this.blue = Math.round(this.blue * (1 - amount) + newColor.blue * amount)
        
        this.red = Math.max(0, Math.min(255, this.red))
        this.green = Math.max(0, Math.min(255, this.green))
        this.blue = Math.max(0, Math.min(255, this.blue))
    }

    rgb () {
        return `rgb(${this.red},${this.green},${this.blue})`
    }

    rgba (alpha) {
        return `rgb(${this.red},${this.green},${this.blue},${alpha})`
    }
}

export { Color }