import { Golemer } from './golemer.js'
import { setUpGameControls } from './controls.js';

const intro = () => {
    game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height)
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
            game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height)
            game.started = true
            for (let i = 0; i <= 90; i++) {
                setTimeout(() => {
                    game.ctx.clearRect(0, 0, game.canvas.width, game.canvas.height)
                    if (i >= 0 && i <= 74) {
                        game.ctx.drawImage(game.images[`opening-scene/scene${i.toString().padStart(2, '0')}`], 0, 0, game.canvas.width, game.canvas.height)
                    }
                }, i * 60)
            }

            setTimeout(() => {
                game.ctx.save()
                game.canvas.style.opacity = 0
            }, (85) * 60)
            
            
            setTimeout(() => {
                game.play()
                game.setTimer(() => {
                    console.log("Opacity")
                    game.canvas.style.transition = "opacity 1.5s"
                    game.canvas.style.opacity = 1
                    game.controls = setUpGameControls()
                }, 0)
                new Golemer (2, 15)
            }, (90) * 60)

            setTimeout(() => {
                game.ctx.scale(1.9, 1.9)
            }, (90) * 60)
            
            setTimeout(() => {
                let scale = 1
                let speed = 0
                scale *= 1.9
                for (let i = 0; i <= 180; i++) {
                    setTimeout(() => {
                        speed = speed >= 1 ? 1 : speed + .004
                        if (scale > 1) {
                            game.ctx.scale(
                                (1 - (.01 * speed)), (1 - (.01 * speed))
                            )
                            scale *= (1 - (.01 * speed))
                        }
                        if (i === 180) {
                            game.ctx.restore()
                        }
                    }, i * 30)
                }
            }, (136) * 60)
        }
    })
}

export { intro }