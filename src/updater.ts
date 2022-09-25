export class Updater {
    stop = false
    elapsed = 0

    run() {
        let updater = (elapsed: number) => {
            if (this.elapsed == elapsed) {
                requestAnimationFrame(updater)
                return
            }

            let delta = 1 / (elapsed - this.elapsed)

            this.elapsed = elapsed
            this.update(delta)

            if (this.stop) return

            requestAnimationFrame(updater)
        }

        requestAnimationFrame(updater)
    }
    update(_delta: number) { }
}