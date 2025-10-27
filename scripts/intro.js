import { Golemer } from './golemer.js'
import { setUpGameControls } from './controls.js';

const intro = () => {
    game.ctx.drawImage(game.images["gardenworld/1"], 0, 0, game.canvas.width, game.canvas.height)
    game.ctx.drawImage(game.images["gardenworld/press-any-key"], 0, -60, game.canvas.width, game.canvas.height)
    game.pause()
    game.started = false
    let decay = 1
    const decayInterval = setInterval(() => {
        decay += 1
        if (decay > 9) {
            decay = 9
        }
        game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height)
        game.ctx.drawImage(game.images[`gardenworld/${decay}`], 0, 0, game.canvas.width, game.canvas.height)
        game.ctx.drawImage(game.images["gardenworld/press-any-key"], 0, -60, game.canvas.width, game.canvas.height)
    }, 3200)

    document.addEventListener("keydown", () => {
        clearInterval(decayInterval)

        // game.audioTag.play()

        game.ctx.font = "80px Pangolin";
        game.ctx.textAlign = "center"
        game.ctx.fillStyle = "#56cefd";
        game.ctx.fillText(".", -100, -100);
            if (!game.started) {
            game.started = true
            game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height)
            game.ctx.drawImage(game.images["intro-text/1"], 0, 0, game.canvas.width, game.canvas.height)
            setTimeout(() => {
                game.ctx.drawImage(game.images["intro-text/2"], 0, 0, game.canvas.width, game.canvas.height)
            }, 3000 * 0.8)
            setTimeout(() => {
                game.canvas.style.transition = "opacity 1.5s"
                game.canvas.style.opacity = 0
            }, 6200 * 0.8)
            setTimeout(() => {
                game.play()
                game.setTimer(() => {
                    game.canvas.style.opacity = 1
                    game.controls = setUpGameControls()
                }, 0)
                new Golemer (2, 15)
            }, 7700 * 0.8)
        }
    })
}

export { intro }