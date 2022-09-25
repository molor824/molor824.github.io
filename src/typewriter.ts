import { SuperCall } from "../node_modules/typescript/lib/typescript"
import { Updater } from "./updater.js"

export class Typewriter extends Updater {
    element
    text
    delay
    crntDelay = 0
    crntIndex = 0

    constructor(element: HTMLElement, delay: number = 0.15) {
        super()

        this.element = element
        this.text = element.innerText
        this.delay = delay

        element.innerText = ''
    }

    update(delta: number) {
        if (this.crntDelay > 0) this.crntDelay -= delta
        else if (this.crntIndex < this.text.length) {
            this.crntDelay += this.delay
            this.crntIndex++

            this.element.innerText = this.text.substring(0, this.crntIndex)
        }
        else this.stop = true
    }
}