import { AsciiArt } from "./ascii_art.js"
import { Typewriter } from "./typewriter.js"

const introduction = document.getElementById('introduction') as HTMLHeadElement
const explosion = document.getElementById('explosion') as HTMLButtonElement

let ascii = new AsciiArt(document.getElementById('ascii art') as HTMLParagraphElement, 40, 40);

explosion.onclick = (ev) => {
    ascii.run()
}

let typewriter = new Typewriter(introduction)

typewriter.run()