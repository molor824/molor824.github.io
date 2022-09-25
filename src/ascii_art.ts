import { Updater } from "./updater.js"

export class AsciiArt extends Updater {
    paragraph
    width
    height

    constructor(paragraph: HTMLParagraphElement, width: number, height: number) {
        super()

        this.paragraph = paragraph
        this.width = width
        this.height = height
    }

    update(delta: number) {
        this.paragraph.textContent = ''

        let text = ''

        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                text += '#'
            }
            text += '\n'
        }

        this.paragraph.innerText = text
    }
}