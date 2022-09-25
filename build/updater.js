export class Updater {
    constructor() {
        this.stop = false;
        this.elapsed = 0;
    }
    run() {
        let updater = (elapsed) => {
            if (this.elapsed == elapsed) {
                requestAnimationFrame(updater);
                return;
            }
            let delta = 1 / (elapsed - this.elapsed);
            this.elapsed = elapsed;
            this.update(delta);
            if (this.stop)
                return;
            requestAnimationFrame(updater);
        };
        requestAnimationFrame(updater);
    }
    update(_delta) { }
}
