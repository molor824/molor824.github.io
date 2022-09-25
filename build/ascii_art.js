import { Updater } from "./updater.js";
export class AsciiArt extends Updater {
    constructor(paragraph, width, height) {
        super();
        this.paragraph = paragraph;
        this.width = width;
        this.height = height;
    }
    update(delta) {
        this.paragraph.textContent = '';
        let text = '';
        for (let y = 0; y < this.height; y++) {
            for (let x = 0; x < this.width; x++) {
                text += '#';
            }
            text += '\n';
        }
        this.paragraph.innerText = text;
    }
}
