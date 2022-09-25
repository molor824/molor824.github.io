import { Updater } from "./updater.js";
export class Typewriter extends Updater {
    constructor(element, delay = 0.15) {
        super();
        this.crntDelay = 0;
        this.crntIndex = 0;
        this.element = element;
        this.text = element.innerText;
        this.delay = delay;
        element.innerText = '';
    }
    update(delta) {
        if (this.crntDelay > 0)
            this.crntDelay -= delta;
        else if (this.crntIndex < this.text.length) {
            this.crntDelay += this.delay;
            this.crntIndex++;
            this.element.innerText = this.text.substring(0, this.crntIndex);
        }
        else
            this.stop = true;
    }
}
